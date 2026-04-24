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

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState<boolean | null>(null);
  const [filter, setFilter] = useState({ naics: '', state: '' });

  // Check subscription status
  useEffect(() => {
    if (!isLoaded || !user) return;
    async function checkSub() {
      const supabase = getSupabase();
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) { setSubscribed(false); return; }
      const { data } = await supabase
        .from('subscribers')
        .select('status')
        .eq('email', email)
        .single();
      setSubscribed(data?.status === 'active');
    }
    checkSub();
  }, [isLoaded, user]);

  // Load bids only for active subscribers
  useEffect(() => {
    if (!subscribed) return;
    async function load() {
      setLoading(true);
      const supabase = getSupabase();
      let query = supabase
        .from('bids')
        .select('*')
        .eq('active', true)
        .order('posted_date', { ascending: false })
        .limit(200);
      if (filter.naics) query = query.eq('naics_code', filter.naics);
      if (filter.state) query = query.eq('place_of_performance_state', filter.state.toUpperCase());
      const { data, error } = await query;
      if (!error && data) setBids(data as Bid[]);
      setLoading(false);
    }
    load();
  }, [filter, subscribed]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  if (subscribed === false) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-6 px-6">
        <h1 className="text-3xl font-bold">Subscription Required</h1>
        <p className="text-gray-400 text-center max-w-md">
          You need an active BlueCollar Bids subscription to access the dashboard.
        </p>
        <Link
          href="/#pricing"
          className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Get Access — $150 / month
        </Link>
        <Link href="/" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          <span className="text-white">BlueCollar</span>
          <span className="text-orange-500">Bids</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Dashboard</span>
          <UserButton />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={filter.naics}
            onChange={(e) => setFilter((f) => ({ ...f, naics: e.target.value }))}
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
          >
            <option value="">All trades</option>
            {Object.entries(NAICS_LABELS).map(([code, label]) => (
              <option key={code} value={code}>{label}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="State (e.g. AZ)"
            maxLength={2}
            value={filter.state}
            onChange={(e) => setFilter((f) => ({ ...f, state: e.target.value }))}
            className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 w-36"
          />
          <span className="text-gray-500 text-sm self-center">
            {loading ? 'Loading…' : `${bids.length} opportunities`}
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-gray-900 text-gray-400">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Agency</th>
                <th className="px-4 py-3 text-left">Trade</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Deadline</th>
                <th className="px-4 py-3 text-left">Set-Aside</th>
                <th className="px-4 py-3 text-left"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {bids.map((bid) => (
                <tr key={bid.notice_id} className="hover:bg-gray-900/50 transition-colors">
                  <td className="px-4 py-3 max-w-xs">
                    <p className="font-medium line-clamp-2">{bid.title}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs max-w-[160px]">{bid.agency}</td>
                  <td className="px-4 py-3">
                    <span className="bg-orange-500/10 text-orange-400 text-xs px-2 py-0.5 rounded-full">
                      {NAICS_LABELS[bid.naics_code] || bid.naics_code}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {[bid.place_of_performance_city, bid.place_of_performance_state]
                      .filter(Boolean).join(', ') || '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {bid.response_deadline
                      ? new Date(bid.response_deadline).toLocaleDateString()
                      : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{bid.set_aside || '—'}</td>
                  <td className="px-4 py-3">
                    {bid.ui_link && (
                      <a href={bid.ui_link} target="_blank" rel="noopener noreferrer"
                        className="text-orange-500 hover:text-orange-400 text-xs font-medium">
                        View →
                      </a>
                    )}
                  </td>
                </tr>
              ))}
              {!loading && bids.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                    No bids found. Try changing your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
