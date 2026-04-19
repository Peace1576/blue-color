'use client';

import { useState } from 'react';

export default function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-orange-500">BlueCollar Bids</span>
        <span className="text-sm text-gray-400">$150/month · Cancel anytime</span>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center max-w-3xl mx-auto">
        <div className="inline-block bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm px-3 py-1 rounded-full mb-6">
          Updated every 6 hours from SAM.gov
        </div>
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Government contracts <br />
          <span className="text-orange-500">built for your trade</span>
        </h1>
        <p className="text-lg text-gray-400 mb-10">
          We scrape every federal and state opportunity matching your NAICS code —
          electrical, plumbing, HVAC, concrete, painting, and more — and surface
          only the ones that fit. No noise, no subscriptions to 10 different sites.
        </p>

        {/* Checkout form */}
        <form onSubmit={handleCheckout} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
          >
            {loading ? 'Redirecting…' : 'Start for $150/mo'}
          </button>
        </form>
        <p className="text-xs text-gray-600 mt-3">Powered by Stripe · Cancel anytime</p>
      </section>

      {/* Features */}
      <section className="border-t border-gray-800 py-20 px-6">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: '⚡',
              title: 'Real-time SAM.gov data',
              desc: 'Pulled directly from the federal contracting database every 6 hours.',
            },
            {
              icon: '🎯',
              title: 'Trade-specific NAICS filters',
              desc: 'Only see contracts that match your license — electrical, plumbing, HVAC, and more.',
            },
            {
              icon: '📍',
              title: 'Filter by state & set-aside',
              desc: 'Surface small-business set-asides in your area before your competitors notice them.',
            },
          ].map((f) => (
            <div key={f.title} className="bg-gray-900 rounded-xl p-6">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-800 py-6 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} BlueCollar Bids
      </footer>
    </main>
  );
}
