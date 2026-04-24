import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
export const dynamic = 'force-dynamic';

// One-time seeder: POST /api/seed-bids  x-setup-secret: bluecollarbids-setup-2024
// Inserts realistic sample federal bids so the dashboard has live-looking data.
// Once a real SAM.gov ingestion cron is set up this won't be needed.

const SECRET = 'bluecollarbids-setup-2024';

// SAM.gov search URLs by NAICS — "View" opens live search results for that trade
const SAM_SEARCH = (naics: string) =>
  `https://sam.gov/search/?keywords=&index=opp&is_active=true&naics=${naics}`;

const SAMPLE_BIDS = [
  {
    notice_id: 'W9126G24R0072',
    title: 'Electrical Systems Maintenance and Repair – Fort Bliss Military Installation',
    agency: 'Dept. of the Army – MICC Fort Bliss',
    naics_code: '238210',
    set_aside: 'SDVOSB',
    response_deadline: futureDateStr(14),
    posted_date: pastDateStr(5),
    place_of_performance_state: 'TX',
    place_of_performance_city: 'El Paso',
    contract_type: 'Firm Fixed Price',
    ui_link: SAM_SEARCH('238210'),
    active: true,
  },
  {
    notice_id: 'VA25800R0148',
    title: 'HVAC Replacement and Air Handling Unit Upgrade – VA Medical Center Phoenix',
    agency: 'Dept. of Veterans Affairs – Phoenix VAMC',
    naics_code: '238220',
    set_aside: 'Total Small Business',
    response_deadline: futureDateStr(7),
    posted_date: pastDateStr(8),
    place_of_performance_state: 'AZ',
    place_of_performance_city: 'Phoenix',
    contract_type: 'Firm Fixed Price',
    ui_link: SAM_SEARCH('238220'),
    active: true,
  },
  {
    notice_id: 'N6247324R4301',
    title: 'Concrete Pavement Repair and Restoration – Naval Air Station North Island',
    agency: 'NAVFAC Southwest',
    naics_code: '238110',
    set_aside: '8(a)',
    response_deadline: futureDateStr(21),
    posted_date: pastDateStr(3),
    place_of_performance_state: 'CA',
    place_of_performance_city: 'San Diego',
    contract_type: 'Firm Fixed Price',
    ui_link: SAM_SEARCH('238110'),
    active: true,
  },
  {
    notice_id: 'GS11P24LAC0004',
    title: 'Structural Steel Repairs and Roofing – Federal Courthouse Dallas',
    agency: 'GSA – Public Buildings Service Region 7',
    naics_code: '238120',
    set_aside: 'HUBZone',
    response_deadline: futureDateStr(10),
    posted_date: pastDateStr(7),
    place_of_performance_state: 'TX',
    place_of_performance_city: 'Dallas',
    contract_type: 'Indefinite Delivery',
    ui_link: SAM_SEARCH('238120'),
    active: true,
  },
  {
    notice_id: '70CDCR24R00014',
    title: 'Interior Painting and Surface Preparation – DHS Multiple Facilities',
    agency: 'Dept. of Homeland Security – FPS',
    naics_code: '238320',
    set_aside: 'WOSB',
    response_deadline: futureDateStr(5),
    posted_date: pastDateStr(10),
    place_of_performance_state: 'DC',
    place_of_performance_city: 'Washington',
    contract_type: 'Firm Fixed Price',
    ui_link: SAM_SEARCH('238320'),
    active: true,
  },
  {
    notice_id: 'W912DY24R0039',
    title: 'Site Preparation and Grading – Army Reserve Training Complex Phase II',
    agency: 'US Army Corps of Engineers – Louisville District',
    naics_code: '238910',
    set_aside: 'SBA',
    response_deadline: futureDateStr(18),
    posted_date: pastDateStr(2),
    place_of_performance_state: 'KY',
    place_of_performance_city: 'Louisville',
    contract_type: 'Firm Fixed Price',
    ui_link: SAM_SEARCH('238910'),
    active: true,
  },
  {
    notice_id: '70B04C24R00007',
    title: 'Flooring Replacement – Border Patrol Stations Tucson Sector',
    agency: 'CBP – Facilities Management Office',
    naics_code: '238330',
    set_aside: 'Total Small Business',
    response_deadline: futureDateStr(9),
    posted_date: pastDateStr(6),
    place_of_performance_state: 'AZ',
    place_of_performance_city: 'Tucson',
    contract_type: 'Firm Fixed Price',
    ui_link: SAM_SEARCH('238330'),
    active: true,
  },
  {
    notice_id: 'GS07P24LAC0011',
    title: 'Drywall and Interior Carpentry Renovation – Social Security Administration Building',
    agency: 'GSA Region 7 – Kansas City',
    naics_code: '238310',
    set_aside: null,
    response_deadline: futureDateStr(12),
    posted_date: pastDateStr(4),
    place_of_performance_state: 'MO',
    place_of_performance_city: 'Kansas City',
    contract_type: 'Firm Fixed Price',
    ui_link: SAM_SEARCH('238310'),
    active: true,
  },
  {
    notice_id: 'W9124L24R0023',
    title: 'Carpentry and Millwork – Barracks Renovation Fort Campbell',
    agency: 'Dept. of the Army – Directorate of Public Works',
    naics_code: '238350',
    set_aside: 'SDVOSB',
    response_deadline: futureDateStr(16),
    posted_date: pastDateStr(1),
    place_of_performance_state: 'TN',
    place_of_performance_city: 'Fort Campbell',
    contract_type: 'Indefinite Delivery',
    ui_link: SAM_SEARCH('238350'),
    active: true,
  },
  {
    notice_id: 'FA301524R0019',
    title: 'Commercial Construction – New Fitness Center Eglin Air Force Base',
    agency: 'AFCEC – Air Force Civil Engineer Center',
    naics_code: '236220',
    set_aside: 'Total Small Business',
    response_deadline: futureDateStr(30),
    posted_date: pastDateStr(3),
    place_of_performance_state: 'FL',
    place_of_performance_city: 'Eglin AFB',
    contract_type: 'Design-Build',
    ui_link: SAM_SEARCH('236220'),
    active: true,
  },
  {
    notice_id: 'W91151H24R0044',
    title: 'Electrical Upgrades – Power Distribution Modernization Fort Hood',
    agency: 'Dept. of the Army – USACE Fort Worth',
    naics_code: '238210',
    set_aside: 'HUBZone',
    response_deadline: futureDateStr(22),
    posted_date: pastDateStr(9),
    place_of_performance_state: 'TX',
    place_of_performance_city: 'Killeen',
    contract_type: 'Firm Fixed Price',
    ui_link: SAM_SEARCH('238210'),
    active: true,
  },
  {
    notice_id: 'VA25019R0214',
    title: 'Plumbing Systems Replacement – VA Long Beach Healthcare System',
    agency: 'Dept. of Veterans Affairs – Long Beach VAMC',
    naics_code: '238220',
    set_aside: '8(a)',
    response_deadline: futureDateStr(11),
    posted_date: pastDateStr(6),
    place_of_performance_state: 'CA',
    place_of_performance_city: 'Long Beach',
    contract_type: 'Firm Fixed Price',
    ui_link: SAM_SEARCH('238220'),
    active: true,
  },
];

function futureDateStr(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

function pastDateStr(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split('T')[0];
}

export async function POST(req: NextRequest) {
  if (req.headers.get('x-setup-secret') !== SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const db = supabaseAdmin();

  const { data, error } = await db
    .from('bids')
    .upsert(SAMPLE_BIDS, { onConflict: 'notice_id' })
    .select('notice_id');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, inserted: data?.length ?? 0, ids: data?.map(r => r.notice_id) });
}
