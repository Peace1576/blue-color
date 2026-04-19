'use client';

import { useState } from 'react';

const TRADES = [
  { code: '238210', label: 'Electrical' },
  { code: '238220', label: 'Plumbing & HVAC' },
  { code: '238110', label: 'Concrete' },
  { code: '238320', label: 'Painting' },
  { code: '238350', label: 'Carpentry' },
  { code: '238910', label: 'Site Preparation' },
  { code: '238310', label: 'Drywall' },
  { code: '238330', label: 'Flooring' },
  { code: '236220', label: 'Commercial Build' },
  { code: '238120', label: 'Structural Steel' },
];

const FAQS = [
  {
    q: 'Where does the data come from?',
    a: 'Directly from SAM.gov — the official U.S. federal contracting database maintained by the General Services Administration. We also pull state-level opportunities. Every listing links back to the original government posting.',
  },
  {
    q: 'How often is it updated?',
    a: 'Our scraper runs every 6 hours. New federal opportunities are published daily and you will see them within the same business day.',
  },
  {
    q: 'I am a small contractor. Are these contracts for me?',
    a: 'Yes. A large portion of federal trade contracts are set aside exclusively for small businesses. You can filter by set-aside type — small business, veteran-owned, woman-owned, HUBZone — so you only see contracts you are eligible to bid.',
  },
  {
    q: 'Do I need a SAM.gov registration to bid?',
    a: 'To actually submit a bid to the federal government you will need a SAM.gov entity registration (free). BlueCollar Bids helps you find and track the opportunities — the registration is a one-time step on your end.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel before your next billing date and you will not be charged again. No contracts, no cancellation fees.',
  },
];

export default function LandingPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    } catch {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-gray-950/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold tracking-tight">BlueCollar</span>
            <span className="text-lg font-bold tracking-tight text-orange-500">Bids</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#what-you-get" className="hover:text-white transition-colors">What You Get</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <a
            href="#pricing"
            className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            Get Access
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gray-950/80" />
        <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-40">
          <div className="max-w-2xl">
            <div className="inline-block border border-orange-500/40 text-orange-400 text-xs font-medium px-3 py-1 rounded-full mb-6 tracking-wider uppercase">
              Federal &amp; State Government Contracts
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Find government contracts<br />
              <span className="text-orange-500">before your competitors do</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              We scan SAM.gov and state procurement databases every 6 hours and surface
              only the trade opportunities that match your license — electrical, plumbing,
              HVAC, concrete, painting, and more. Filter by state, set-aside type, and
              deadline. No noise, no wasted time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#how-it-works"
                className="border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-3.5 rounded-lg transition-colors text-center"
              >
                See How It Works
              </a>
              <a
                href="#pricing"
                className="bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-3.5 rounded-lg transition-colors text-center"
              >
                Start for $150 / month
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-white/5 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '10,000+', label: 'Active contracts tracked monthly' },
            { value: '50', label: 'States covered' },
            { value: '10', label: 'Trade NAICS categories' },
            { value: 'Every 6h', label: 'Database refresh rate' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-extrabold text-orange-500">{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
              alt="Construction workers on site"
              className="rounded-xl object-cover w-full h-80"
            />
          </div>
          <div>
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-3">The Problem</p>
            <h2 className="text-3xl font-bold mb-5">
              Government contracts are public.<br />Finding them is not.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              SAM.gov lists every federal trade opportunity in the country — but the
              interface is built for procurement officers, not contractors. Searching it
              manually takes hours. Most tradespeople never check it at all.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              Meanwhile, larger firms with dedicated bid-chasers scoop up small-business
              set-aside contracts that were meant for independent contractors like you.
            </p>
            <p className="text-gray-300 font-medium">
              BlueCollar Bids pulls every relevant posting, filters it to your trade and
              state, and puts it in a clean dashboard you can check in two minutes.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-3">Process</p>
            <h2 className="text-3xl font-bold">How it works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'We scrape SAM.gov every 6 hours',
                desc: 'Our system hits the federal contracting API and pulls every new opportunity across 10 trade NAICS codes. State-level databases are added on a rolling basis.',
              },
              {
                step: '02',
                title: 'You filter to what matters',
                desc: 'Filter by trade category, state, set-aside type (small business, veteran-owned, woman-owned), and response deadline. Save your filters and check back daily in under two minutes.',
              },
              {
                step: '03',
                title: 'You bid before the deadline',
                desc: 'Every listing links directly to the original government posting with full scope of work, submission instructions, and contact details. No middleman, no markup.',
              },
            ].map((s) => (
              <div key={s.step} className="relative bg-gray-950 rounded-xl p-7 border border-white/5">
                <div className="text-5xl font-black text-orange-500/20 mb-4">{s.step}</div>
                <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRADES COVERED ── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-3">Coverage</p>
            <h2 className="text-3xl font-bold mb-5">Every major trade category</h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              We track the 10 NAICS codes that cover the majority of blue-collar federal
              contract work. If your license type is listed below, there are active
              government contracts looking for you right now.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {TRADES.map((t) => (
                <div key={t.code} className="flex items-center gap-2.5 bg-gray-900 rounded-lg px-4 py-2.5 border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  <span className="text-sm text-gray-300">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80"
              alt="Construction site"
              className="rounded-xl object-cover w-full h-48"
            />
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
              alt="Workers on site"
              className="rounded-xl object-cover w-full h-48 mt-6"
            />
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80"
              alt="Construction cranes"
              className="rounded-xl object-cover w-full h-48 -mt-6"
            />
            <img
              src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=600&q=80"
              alt="Building construction"
              className="rounded-xl object-cover w-full h-48"
            />
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ── */}
      <section id="what-you-get" className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-3xl font-bold">What your subscription includes</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Live contract dashboard',
                desc: 'A filtered, sortable table of active opportunities. Updated every 6 hours. No login required after signup.',
              },
              {
                title: 'Trade-specific filtering',
                desc: 'Filter by your NAICS code so you only see contracts that match your license. Electricians see electrical work. Plumbers see plumbing work.',
              },
              {
                title: 'State-by-state filtering',
                desc: 'Working in Arizona? Filter to AZ and see only contracts in your area. Expanding? Switch states instantly.',
              },
              {
                title: 'Set-aside visibility',
                desc: 'See which contracts are reserved for small businesses, veteran-owned, woman-owned, or HUBZone firms. Many of these go unbid.',
              },
              {
                title: 'Deadline tracking',
                desc: 'Every contract shows its response deadline prominently so you can prioritize what to look at first and never miss a submission window.',
              },
              {
                title: 'Direct government links',
                desc: 'Every listing links directly to the original SAM.gov posting. Full scope, attachments, contacts, and submission instructions — no paywalled PDF, no middleman.',
              },
            ].map((f) => (
              <div key={f.title} className="bg-gray-950 rounded-xl p-6 border border-white/5">
                <div className="w-8 h-0.5 bg-orange-500 mb-4" />
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-gray-400 mb-12">
            One contract win more than covers the annual subscription. Most members see
            their first qualifying opportunity within 48 hours.
          </p>

          <div className="bg-gray-900 border border-white/10 rounded-2xl p-8 md:p-10 text-left">
            <div className="flex items-end gap-2 mb-2">
              <span className="text-5xl font-extrabold">$150</span>
              <span className="text-gray-400 pb-2">/ month</span>
            </div>
            <p className="text-gray-400 text-sm mb-8">Cancel anytime. No contracts. No setup fees.</p>

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

            <form onSubmit={handleCheckout} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-gray-950 border border-gray-700 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-400 disabled:opacity-60 text-white font-semibold px-7 py-3.5 rounded-lg transition-colors whitespace-nowrap"
              >
                {loading ? 'Redirecting...' : 'Get Access'}
              </button>
            </form>
            <p className="text-xs text-gray-600 mt-3 text-center">
              Secured by Stripe. You will be taken to a secure checkout page.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 px-6 bg-gray-900">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-3">FAQ</p>
            <h2 className="text-3xl font-bold">Common questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-gray-950 border border-white/5 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-medium hover:bg-white/5 transition-colors"
                >
                  <span>{faq.q}</span>
                  <svg
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-24 px-6">
        <div
          className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590644365607-40c8b5f53de9?w=1200&q=80')" }}
          />
          <div className="absolute inset-0 bg-gray-950/85" />
          <div className="relative px-8 md:px-16 py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start finding contracts today
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              The next federal trade contract in your state will be posted in the next
              few hours. Make sure you see it before your competition does.
            </p>
            <a
              href="#pricing"
              className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Get Access — $150 / month
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold">BlueCollar</span>
            <span className="font-bold text-orange-500">Bids</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#how-it-works" className="hover:text-gray-300 transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-gray-300 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-gray-300 transition-colors">FAQ</a>
            <a href="/dashboard" className="hover:text-gray-300 transition-colors">Dashboard</a>
          </div>
          <p className="text-xs text-gray-600">
            Data sourced from SAM.gov. Not affiliated with the U.S. Government.
          </p>
        </div>
      </footer>
    </main>
  );
}
