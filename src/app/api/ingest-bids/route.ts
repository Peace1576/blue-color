import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
export const dynamic = 'force-dynamic';

// Called by Vercel Cron every 6 hours (see vercel.json).
// Also callable manually: POST /api/ingest-bids  x-ingest-secret: bluecollarbids-ingest
// Fetches live SAM.gov opportunities for all 10 trade NAICS codes and upserts to Supabase.

const INGEST_SECRET = process.env.INGEST_SECRET ?? 'bluecollarbids-ingest';

const NAICS_CODES = [
  '238110', // Concrete
  '238120', // Structural Steel
  '238210', // Electrical
  '238220', // Plumbing / HVAC
  '238310', // Drywall
  '238320', // Painting
  '238330', // Flooring
  '238350', // Carpentry
  '238910', // Site Prep
  '236220', // Commercial Construction
];

interface SamOpportunity {
  noticeId: string;
  title: string;
  fullParentPathName?: string;
  department?: string;
  subTier?: string;
  naicsCode?: string;
  typeOfSetAsideDescription?: string;
  responseDeadLine?: string;
  postedDate?: string;
  placeOfPerformance?: {
    state?: { code?: string };
    city?: { name?: string };
  };
  contractType?: string;
  uiLink?: string;
  active?: boolean;
}

async function fetchSamBids(naics: string, apiKey: string): Promise<SamOpportunity[]> {
  // Fetch active opportunities posted in the last 30 days
  const today = new Date();
  const from = new Date(today);
  from.setDate(from.getDate() - 30);

  const fmt = (d: Date) =>
    `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;

  const params = new URLSearchParams({
    api_key: apiKey,
    limit: '25',
    offset: '0',
    postedFrom: fmt(from),
    postedTo: fmt(today),
    naics,
    active: 'true',
  });

  const url = `https://api.sam.gov/opportunities/v2/search?${params}`;
  const resp = await fetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 0 },
  });

  if (!resp.ok) {
    console.error(`SAM.gov fetch failed for NAICS ${naics}: ${resp.status} ${resp.statusText}`);
    return [];
  }

  const json = await resp.json();
  return (json?.opportunitiesData ?? []) as SamOpportunity[];
}

function mapToRow(opp: SamOpportunity) {
  // Agency: use the deepest path segment from fullParentPathName
  const agencyParts = (opp.fullParentPathName ?? '').split('.');
  const agency = agencyParts[agencyParts.length - 1]?.trim() ||
    agencyParts[0]?.trim() ||
    'Federal Agency';

  return {
    notice_id: opp.noticeId,
    title: opp.title ?? 'Untitled Opportunity',
    agency,
    naics_code: opp.naicsCode ?? '',
    set_aside: opp.typeOfSetAsideDescription ?? null,
    response_deadline: opp.responseDeadLine
      ? opp.responseDeadLine.split('T')[0]
      : null,
    posted_date: opp.postedDate ?? null,
    place_of_performance_state: opp.placeOfPerformance?.state?.code ?? null,
    place_of_performance_city: opp.placeOfPerformance?.city?.name ?? null,
    contract_type: opp.contractType ?? null,
    ui_link: opp.uiLink ?? null,
    active: true,
    updated_at: new Date().toISOString(),
  };
}

export async function POST(req: NextRequest) {
  // Auth: Vercel Cron sends Authorization: Bearer <CRON_SECRET>, we also accept x-ingest-secret
  const authHeader = req.headers.get('authorization');
  const ingestHeader = req.headers.get('x-ingest-secret');
  const cronSecret = process.env.CRON_SECRET;

  const validCron = cronSecret && authHeader === `Bearer ${cronSecret}`;
  const validManual = ingestHeader === INGEST_SECRET;

  if (!validCron && !validManual) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.SAM_GOV_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'SAM_GOV_API_KEY not set' }, { status: 500 });
  }

  const db = supabaseAdmin();
  const results: Record<string, number> = {};
  let totalUpserted = 0;
  const errors: string[] = [];

  for (const naics of NAICS_CODES) {
    try {
      const opps = await fetchSamBids(naics, apiKey);
      if (opps.length === 0) {
        results[naics] = 0;
        continue;
      }

      const rows = opps.map(mapToRow).filter(r => r.notice_id && r.title);

      const { data, error } = await db
        .from('bids')
        .upsert(rows, { onConflict: 'notice_id' })
        .select('notice_id');

      if (error) {
        errors.push(`NAICS ${naics}: ${error.message}`);
        results[naics] = 0;
      } else {
        results[naics] = data?.length ?? 0;
        totalUpserted += data?.length ?? 0;
      }
    } catch (err: any) {
      errors.push(`NAICS ${naics}: ${err.message}`);
      results[naics] = 0;
    }
  }

  // Mark old bids inactive (posted > 90 days ago with expired deadlines)
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 90);
  await db
    .from('bids')
    .update({ active: false })
    .lt('response_deadline', cutoff.toISOString().split('T')[0])
    .eq('active', true);

  return NextResponse.json({
    success: true,
    totalUpserted,
    byNaics: results,
    errors: errors.length ? errors : undefined,
    timestamp: new Date().toISOString(),
  });
}

// GET: health check — returns last run stats without auth
export async function GET() {
  const db = supabaseAdmin();
  const { count } = await db
    .from('bids')
    .select('*', { count: 'exact', head: true })
    .eq('active', true);

  return NextResponse.json({
    activeBids: count ?? 0,
    timestamp: new Date().toISOString(),
  });
}
