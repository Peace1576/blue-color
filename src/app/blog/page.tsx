import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

export const revalidate = 3600;

export const metadata = {
  title: 'Government Contracting for Trades — BlueCollar Bids Blog',
  description: 'Guides, tips, and insights for electricians, plumbers, HVAC, and construction contractors looking to win government contracts.',
};

interface Post {
  slug: string;
  title: string;
  meta_description: string;
  target_keyword: string;
  created_at: string;
}

async function getPosts(): Promise<Post[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data } = await supabase
    .from('posts')
    .select('slug, title, meta_description, target_keyword, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(50);
  return (data as Post[]) || [];
}

export default async function BlogIndex() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-white/5 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/">
            <span className="font-bold">BlueCollar</span>
            <span className="font-bold text-orange-500">Bids</span>
          </Link>
          <Link href="/#pricing" className="text-sm text-orange-500 hover:text-orange-400 transition-colors">
            Get Access — $150/mo
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-3">Resources</p>
          <h1 className="text-4xl font-bold mb-4">Government Contracting for Trades</h1>
          <p className="text-gray-400 text-lg">
            Practical guides for electricians, plumbers, HVAC technicians, and construction
            contractors on finding and winning federal and state government contracts.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-gray-500">No posts published yet. Check back soon.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <article className="bg-gray-900 border border-white/5 rounded-xl p-6 hover:border-orange-500/30 transition-colors">
                  <p className="text-xs text-orange-500 uppercase tracking-wider mb-2">
                    {post.target_keyword}
                  </p>
                  <h2 className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    {post.meta_description}
                  </p>
                  <p className="text-xs text-gray-600">
                    {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>

      <footer className="border-t border-white/5 py-8 px-6 text-center text-xs text-gray-600">
        <Link href="/" className="hover:text-gray-400 transition-colors">BlueCollarBid.online</Link>
        {' '}&mdash; Data sourced from SAM.gov. Not affiliated with the U.S. Government.
      </footer>
    </main>
  );
}
