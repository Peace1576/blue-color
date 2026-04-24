'use client';

import { useEffect, useState } from 'react';
import { useUser, UserButton } from '@clerk/nextjs';
import { getSupabase } from '@/lib/supabase';
import Link from 'next/link';

interface Bid {
  id: string;
  notice_id: string;
  title: string;
  agency: string;
  naics_code: string;
  set_aside: string | null;
  response_deadline: string | null;
  posted_date: string | null;
  place_of_performance_state: string | null;
  place_of_performance_city: string | null;
  contract_type: string | null;
  ui_link: string | null;
  active: boolean;
}

const NAICS_LABELS: Record<string, string> = {
  '238110': 'Concrete',
  '238120': 'Structural Steel',
  '238210': 'Electrical',
  '238220': 'Plumbing / HVAC',
  '238310': 'Drywall',
  '238320': 'Painting',
  '238330': 'Flooring',
  '238350': 'Carpentry',
  '238910': 'Site Prep',
  '236220': 'Commercial Construction',
};

// Returns days remaining from a deadline string; null if no deadline
function daysRemaining(deadline: string | null): number | null {
  if (!deadline) return null;
  const diff = new Date(deadline).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function DeadlineBadge({ deadline }: { deadline: string | null }) {
  const days = daysRemaining(deadline);
  if (days === null) return <span className="text-gray-600 text-xs">—</span>;
  if (days < 0)
    return (
      <span className="text-xs font-medium text-gray-600">Expired</span>
    );
  const color =
    days <= 2
      ? 'text-red-400 bg-red-500/10'
      : days <= 7
      ? 'text-yellow-400 bg-yellow-500/10'
      : 'text-green-400 bg-green-500/10';
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>
      {days}d left
    </span>
  );
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState<boolean | null>(null);
  const [filter, setFilter] = useState({ naics: '', state: '', setAside: '' });
  const [appliedFilter, setAppliedFilter] = useState({ naics: '', state: '', setAside: '' });

  // Check subscription status
  useEffect(() => {
    if (!isLoaded || !user) return;
    async function checkSub() {
      const supabase = getSupabase();
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) {
        setSubscribed(false);
        return;
      }
      const { data } = await supabase
        .from('subscribers')
        .select('status')
        .eq('email', email)
        .single();
      setSubscribed(data?.status === 'active');
    }
    checkSub();
  }, [isLoaded, user]);

  // Load bids for everyone — subscribers get all results, non-subs get first 10 (we blur the rest)
  useEffect(() => {
    if (!isLoaded || !user || subscribed === null) return;
    async function load() {
      setLoading(true);
      const supabase = getSupabase();
      let query = supabase
        .from('bids')
        .select('*')
        .eq('active', true)
        .order('posted_date', { ascending: false })
        .limit(subscribed ? 200 : 20); // fetch 20 for non-subs so blur still looks populated
      if (appliedFilter.naics) query = query.eq('naics_code', appliedFilter.naics);
      if (appliedFilter.state)
        query = query.eq('place_of_performance_state', appliedFilter.state.toUpperCase());
      if (appliedFilter.setAside) query = query.eq('set_aside', appliedFilter.setAside);
      const { data, error } = await query;
      if (!error && data) setBids(data as Bid[]);
      setLoading(false);
    }
    load();
  }, [appliedFilter, subscribed, isLoaded, user]);

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
          <p className="text-gray-500 text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  // ── Unauthenticated ───────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-6 px-6">
        <div className="text-center space-y-3">
          <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase">
            BlueCollarBids
          </p>
          <h1 className="text-4xl font-bold tracking-tight">Sign in to continue</h1>
          <p className="text-gray-400 max-w-sm mx-auto">
            Access live federal construction bids matched to your trade.
          </p>
        </div>
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-lg shadow-orange-500/20"
        >
          Sign In
        </Link>
        <Link href="/" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
          ← Back to home
        </Link>
      </div>
    );
  }

  const isSubscribed = subscribed === true;
  const visibleBids = isSubscribed ? bids : bids.slice(0, 5);
  const blurredBids = isSubscribed ? [] : bids.slice(5);
  const liveCount = bids.length;
  const displayCount = isSubscribed ? liveCount : '247+';

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-30 border-b border-gray-800 bg-gray-950/90 backdrop-blur-md px-6 py-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 gap-6">
          {/* Logo */}
          <Link href="/" className="shrink-0 text-xl font-bold tracking-tight">
            <span className="text-white">BlueCollar</span>
            <span className="text-orange-500">Bids</span>
          </Link>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            <button className="relative px-4 py-1.5 text-sm font-semibold text-white rounded-lg bg-gray-800 border border-gray-700">
              Live Bids
              <span className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-orange-500 shadow-md shadow-orange-500/50" />
            </button>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Live count badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-semibold">{displayCount} live</span>
            </div>

            {/* Subscribe CTA chip — shown for non-subscribers */}
            {!isSubscribed && (
              <Link
                href="/subscribe"
                className="hidden lg:inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 text-orange-400 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              >
                🔓 Subscribe
              </Link>
            )}

            <UserButton />
          </div>
        </div>
      </header>

      {/* ── SUBSCRIBE NOTIFICATION CARD (top-right sticky, non-subs only) ── */}
      {!isSubscribed && (
        <div
          className="fixed top-20 right-5 z-40 w-64 rounded-2xl shadow-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)',
            boxShadow: '0 8px 32px rgba(234,88,12,0.4)',
          }}
        >
          <div className="p-4">
            <p className="text-white font-bold text-sm mb-0.5">🔓 Unlock Full Access</p>
            <p className="text-orange-100 text-xs mb-3">$150/mo &bull; Cancel anytime</p>
            <Link
              href="/subscribe"
              className="block w-full text-center bg-white text-orange-600 font-bold text-xs py-2 px-4 rounded-xl hover:bg-orange-50 active:bg-orange-100 transition-colors shadow-md"
            >
              Subscribe Now
            </Link>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* ── STATS ROW ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Live Opportunities */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-lg shrink-0">
              📋
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{displayCount}</p>
              <p className="text-gray-500 text-xs mt-0.5">Live Opportunities</p>
            </div>
          </div>

          {/* Trades Covered */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-lg shrink-0">
              🔧
            </div>
            <div>
              <p className="text-2xl font-bold text-white">10</p>
              <p className="text-gray-500 text-xs mt-0.5">Trades Covered</p>
            </div>
          </div>

          {/* Updated */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 text-lg shrink-0">
              🔄
            </div>
            <div>
              <p className="text-2xl font-bold text-white">6h</p>
              <p className="text-gray-500 text-xs mt-0.5">Update Frequency</p>
            </div>
          </div>
        </div>

        {/* ── FILTERS BAR ── */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl px-5 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Trade dropdown */}
            <select
              value={filter.naics}
              onChange={(e) => setFilter((f) => ({ ...f, naics: e.target.value }))}
              className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 cursor-pointer"
            >
              <option value="">All Trades</option>
              {Object.entries(NAICS_LABELS).map(([code, label]) => (
                <option key={code} value={code}>
                  {label}
                </option>
              ))}
            </select>

            {/* State input */}
            <input
              type="text"
              placeholder="State (e.g. AZ)"
              maxLength={2}
              value={filter.state}
              onChange={(e) => setFilter((f) => ({ ...f, state: e.target.value }))}
              className="bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 rounded-xl px-4 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500"
            />

            {/* Set-Aside dropdown */}
            <select
              value={filter.setAside}
              onChange={(e) => setFilter((f) => ({ ...f, setAside: e.target.value }))}
              className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 cursor-pointer"
            >
              <option value="">All Set-Asides</option>
              <option value="SBA">SBA</option>
              <option value="8(a)">8(a)</option>
              <option value="HUBZone">HUBZone</option>
              <option value="SDVOSB">SDVOSB</option>
              <option value="WOSB">WOSB</option>
              <option value="Total Small Business">Total Small Business</option>
            </select>

            {/* Search button */}
            <button
              onClick={() => setAppliedFilter(filter)}
              className="bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors shadow-md shadow-orange-500/20"
            >
              Search
            </button>

            {/* Result count */}
            <span className="text-gray-500 text-sm ml-auto">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border border-gray-600 border-t-orange-500 animate-spin" />
                  Loading…
                </span>
              ) : (
                `${isSubscribed ? bids.length : '247+'} opportunities`
              )}
            </span>
          </div>
        </div>

        {/* ── BIDS TABLE ── */}
        <div className="relative">
          <div className="overflow-x-auto rounded-2xl border border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900 border-b border-gray-800">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Title / Agency
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Trade
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                    Set-Aside
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 bg-gray-950">
                {/* Visible rows */}
                {visibleBids.map((bid) => (
                  <tr
                    key={bid.notice_id}
                    className="group relative hover:bg-gray-900/60 transition-colors"
                  >
                    {/* Left accent border on hover */}
                    <td className="relative px-5 py-4 max-w-xs">
                      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-r" />
                      <p className="font-medium text-white line-clamp-2 leading-snug">
                        {bid.title}
                      </p>
                      <p className="text-gray-500 text-xs mt-1 truncate">{bid.agency}</p>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="bg-orange-500/10 text-orange-400 text-xs font-medium px-2.5 py-1 rounded-full border border-orange-500/20 whitespace-nowrap">
                        {NAICS_LABELS[bid.naics_code] || bid.naics_code}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-400 text-xs hidden lg:table-cell whitespace-nowrap">
                      {[bid.place_of_performance_city, bid.place_of_performance_state]
                        .filter(Boolean)
                        .join(', ') || '—'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <DeadlineBadge deadline={bid.response_deadline} />
                    </td>
                    <td className="px-4 py-4 text-gray-500 text-xs hidden sm:table-cell">
                      {bid.set_aside || '—'}
                    </td>
                    <td className="px-4 py-4 text-right">
                      {bid.ui_link && (
                        <a
                          href={bid.ui_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-500 hover:text-orange-400 text-xs font-semibold whitespace-nowrap transition-colors"
                        >
                          View →
                        </a>
                      )}
                    </td>
                  </tr>
                ))}

                {/* Empty state */}
                {!loading && bids.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center text-gray-600">
                      No bids match your filters. Try adjusting your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ── BLURRED ROWS for non-subscribers ── */}
          {!isSubscribed && blurredBids.length > 0 && (
            <div className="relative mt-px rounded-b-2xl overflow-hidden border border-t-0 border-gray-800">
              {/* Blurred table rows */}
              <div
                className="pointer-events-none select-none"
                style={{ filter: 'blur(4px)', userSelect: 'none' }}
              >
                <table className="w-full text-sm bg-gray-950">
                  <tbody className="divide-y divide-gray-800/60">
                    {blurredBids.map((bid) => (
                      <tr key={bid.notice_id} className="opacity-60">
                        <td className="px-5 py-4 max-w-xs">
                          <p className="font-medium text-white line-clamp-2 leading-snug">
                            {bid.title}
                          </p>
                          <p className="text-gray-500 text-xs mt-1 truncate">{bid.agency}</p>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <span className="bg-orange-500/10 text-orange-400 text-xs font-medium px-2.5 py-1 rounded-full border border-orange-500/20">
                            {NAICS_LABELS[bid.naics_code] || bid.naics_code}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-400 text-xs hidden lg:table-cell">
                          {[bid.place_of_performance_city, bid.place_of_performance_state]
                            .filter(Boolean)
                            .join(', ') || '—'}
                        </td>
                        <td className="px-4 py-4">
                          <DeadlineBadge deadline={bid.response_deadline} />
                        </td>
                        <td className="px-4 py-4 text-gray-500 text-xs hidden sm:table-cell">
                          {bid.set_aside || '—'}
                        </td>
                        <td className="px-4 py-4" />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Overlay with CTA */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(3,7,18,0.1) 0%, rgba(3,7,18,0.92) 40%, rgba(3,7,18,0.98) 100%)',
                }}
              >
                <div className="space-y-1">
                  <p className="text-white font-bold text-lg">
                    {liveCount > 5 ? `+${liveCount - 5} more bids hidden` : 'More bids available'}
                  </p>
                  <p className="text-gray-400 text-sm max-w-sm">
                    Subscribe to unlock all live opportunities updated every 6 hours.
                  </p>
                </div>
                <Link
                  href="/subscribe"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold px-7 py-2.5 rounded-xl transition-colors shadow-xl shadow-orange-500/30 text-sm"
                >
                  🔓 Subscribe for $150/mo
                </Link>
                <p className="text-gray-600 text-xs">No contract. Cancel anytime.</p>
              </div>
            </div>
          )}

          {/* If non-sub and no extra rows to blur, still show upgrade nudge */}
          {!isSubscribed && blurredBids.length === 0 && bids.length >= 5 && (
            <div className="mt-3 rounded-2xl border border-orange-500/20 bg-orange-500/5 px-5 py-4 flex flex-col sm:flex-row items-center gap-4 text-sm">
              <p className="text-gray-300 flex-1">
                You&apos;re seeing a preview.{' '}
                <span className="text-orange-400 font-semibold">247+ live bids</span> are waiting
                for you.
              </p>
              <Link
                href="/subscribe"
                className="shrink-0 bg-orange-500 hover:bg-orange-400 text-white font-bold px-5 py-2 rounded-xl transition-colors text-xs whitespace-nowrap"
              >
                Unlock Full Access →
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
