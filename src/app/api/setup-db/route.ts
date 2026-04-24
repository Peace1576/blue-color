import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

// One-time DB setup endpoint — creates tables if they don't exist.
// Protected by a static secret.  Call once after deploy then ignore.
// POST /api/setup-db   x-setup-secret: bluecollarbids-setup-2024

const SETUP_SECRET = 'bluecollarbids-setup-2024';

export async function POST(req: NextRequest) {
  if (req.headers.get('x-setup-secret') !== SETUP_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'Missing env vars' }, { status: 500 });
  }

  const SQL = `
    CREATE TABLE IF NOT EXISTS public.subscribers (
      id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email                  text UNIQUE NOT NULL,
      stripe_customer_id     text,
      stripe_subscription_id text,
      status                 text NOT NULL DEFAULT 'pending',
      subscribed_at          timestamptz,
      created_at             timestamptz NOT NULL DEFAULT now()
    );

    CREATE TABLE IF NOT EXISTS public.bids (
      id                         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      notice_id                  text UNIQUE NOT NULL,
      title                      text NOT NULL,
      agency                     text NOT NULL,
      naics_code                 text NOT NULL,
      set_aside                  text,
      response_deadline          text,
      posted_date                text,
      place_of_performance_state text,
      place_of_performance_city  text,
      contract_type              text,
      ui_link                    text,
      active                     boolean NOT NULL DEFAULT true,
      created_at                 timestamptz NOT NULL DEFAULT now(),
      updated_at                 timestamptz NOT NULL DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS bids_active_posted_idx ON public.bids (active, posted_date DESC);

    ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='bids' AND policyname='anon_read_bids') THEN
        CREATE POLICY anon_read_bids ON public.bids FOR SELECT USING (active = true);
      END IF;
    END $$;

    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='subscribers' AND policyname='service_role_subscribers') THEN
        CREATE POLICY service_role_subscribers ON public.subscribers USING (true);
      END IF;
    END $$;
  `;

  // Supabase Management API — run raw SQL
  const ref = supabaseUrl.replace('https://', '').replace('.supabase.co', '');
  const mgmtResp = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Management API uses a personal access token, not the service role key.
      // We try with the service role key; if it fails we return the SQL for manual execution.
      'Authorization': `Bearer ${serviceKey}`,
    },
    body: JSON.stringify({ query: SQL }),
  });

  if (mgmtResp.ok) {
    const data = await mgmtResp.json();
    return NextResponse.json({ success: true, data });
  }

  // Fallback: return the SQL so it can be copy-pasted into Supabase SQL editor
  return NextResponse.json({
    success: false,
    message: 'Automatic migration failed — copy the SQL below into Supabase SQL Editor and run it.',
    sql: SQL,
  });
}

// GET returns the SQL for easy copy-paste
export async function GET(req: NextRequest) {
  if (req.headers.get('x-setup-secret') !== SETUP_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return NextResponse.json({
    message: 'Copy this SQL into the Supabase SQL editor to create the tables.',
    sql: `CREATE TABLE IF NOT EXISTS public.subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text NOT NULL DEFAULT 'pending',
  subscribed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notice_id text UNIQUE NOT NULL,
  title text NOT NULL,
  agency text NOT NULL,
  naics_code text NOT NULL,
  set_aside text,
  response_deadline text,
  posted_date text,
  place_of_performance_state text,
  place_of_performance_city text,
  contract_type text,
  ui_link text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS bids_active_posted_idx ON public.bids (active, posted_date DESC);
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY anon_read_bids ON public.bids FOR SELECT USING (active = true);
CREATE POLICY service_role_subscribers ON public.subscribers USING (true);`,
  });
}
