'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import Link from 'next/link';

export default function SubscribePage() {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      // Not signed in — stop the spinner so the page renders
      setChecking(false);
      return;
    }
    async function checkSub() {
      const supabase = getSupabase();
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) { setChecking(false); return; }
      const { data } = await supabase
        .from('subscribers')
        .select('status')
        .eq('email', email)
        .single();
      if (data?.status === 'active') {
        window.location.href = '/dashboard';
      } else {
        setChecking(false);
      }
    }
    checkSub();
  }, [isLoaded, user]);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      setLoading(false);
    }
  }

  if (!isLoaded || checking) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-6 py-16">
      <div className="mb-8 text-center">
        <Link href="/">
          <span className="text-2xl font-bold text-white">BlueCollar</span>
          <span className="text-2xl font-bold text-orange-500">Bids</span>
        </Link>
      </div>

      <div className="w-full max-w-lg bg-gray-900 border border-white/10 rounded-2xl p-8 md:p-10">
        <div className="mb-6">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-2">One step away</p>
          <h1 className="text-3xl font-bold">Activate your subscription</h1>
          <p className="text-gray-400 text-sm mt-2">
            Signed in as <span className="text-white">{user?.primaryEmailAddress?.emailAddress}</span>
          </p>
        </div>

        <div className="flex items-end gap-2 mb-2">
          <span className="text-5xl font-extrabold">$150</span>
          <span className="text-gray-400 pb-2">/ month</span>
        </div>
        <p className="text-gray-400 text-sm mb-8">Cancel anytime. No long-term commitment. No setup fees.</p>

        <ul className="space-y-3 mb-10">
          {[
            'Full access to the live bids dashboard',
            '10 trade NAICS categories covered',
            'Filter by state, set-aside type, and deadline',
            'Updated every 6 hours from SAM.gov',
            'Direct links to original government postings',
            'Unlimited searches and filters',
            'Cancel anytime — no questions asked',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
              <svg className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-bold py-4 rounded-lg transition-colors text-lg"
        >
          {loading ? 'Redirecting to checkout…' : 'Subscribe Now — $150 / month'}
        </button>

        <p className="text-xs text-gray-600 mt-3 text-center">
          Secured by Stripe. You will be taken to a secure checkout page.
        </p>
      </div>
    </div>
  );
}
