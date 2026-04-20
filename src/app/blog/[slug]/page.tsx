import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

interface Post {
  slug: string;
  title: string;
  meta_description: string;
  content: string;
  target_keyword: string;
  created_at: string;
}

async function getPost(slug: string): Promise<Post | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  return data as Post | null;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Not Found' };
  return {
    title: `${post.title} — BlueCollar Bids`,
    description: post.meta_description,
  };
}

// Minimal markdown renderer (bold, headings, paragraphs, lists)
function renderMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-white mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-white mt-10 mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-gray-300">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="space-y-1 my-4">$&</ul>')
    .replace(/\n\n/g, '</p><p class="text-gray-300 leading-relaxed my-4">')
    .replace(/^(?!<[hul])(.+)$/gm, '<p class="text-gray-300 leading-relaxed my-4">$1</p>');
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-white/5 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/">
            <span className="font-bold">BlueCollar</span>
            <span className="font-bold text-orange-500">Bids</span>
          </Link>
          <Link href="/#pricing" className="text-sm text-orange-500 hover:text-orange-400 transition-colors">
            Get Access — $150/mo
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-300 transition-colors mb-8 inline-block">
          &larr; All articles
        </Link>

        <p className="text-orange-500 text-xs font-semibold uppercase tracking-wider mb-3">
          {post.target_keyword}
        </p>
        <h1 className="text-4xl font-extrabold leading-tight mb-4">{post.title}</h1>
        <p className="text-gray-400 text-lg mb-6">{post.meta_description}</p>
        <p className="text-xs text-gray-600 mb-10 pb-10 border-b border-white/5">
          Published {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* CTA */}
        <div className="mt-16 bg-gray-900 border border-orange-500/20 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">Ready to find contracts in your trade?</h3>
          <p className="text-gray-400 text-sm mb-6">
            BlueCollar Bids scans SAM.gov every 6 hours and shows you only the opportunities
            that match your license and state.
          </p>
          <Link
            href="/#pricing"
            className="inline-block bg-orange-500 hover:bg-orange-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Get Access — $150 / month
          </Link>
        </div>
      </article>

      <footer className="border-t border-white/5 py-8 px-6 text-center text-xs text-gray-600">
        <Link href="/" className="hover:text-gray-400 transition-colors">BlueCollarBid.online</Link>
        {' '}&mdash; Data sourced from SAM.gov. Not affiliated with the U.S. Government.
      </footer>
    </main>
  );
}
