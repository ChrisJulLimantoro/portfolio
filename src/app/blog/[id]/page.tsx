import { getBlogPosts, getBlogPostById } from '@/lib/data';
import { BlogPost } from '@/components/features/blog/blogPost';
import { TableOfContents } from '@/components/features/blog/tableOfContents';
import { BlogCard } from '@/components/features/blog/blogCard';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

type BlogPostPageProps = {
  params: {
    id: string;
  };
};

/**
 * Dynamic Blog Post Page - Server Component
 * This page uses the `[id]` in the URL (from `params`) to
 * fetch and render a single blog post.
 */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getBlogPostById(id);

  if (!post) notFound();

  const relatedPosts = getBlogPosts()
    .filter((p) => p.id !== id)
    .slice(0, 2);

  return (
    <div className="relative min-h-screen">
      {/* Hero Image Banner */}
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b12]/50 via-[#0b0b12]/80 to-[#0b0b12]" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-12 w-full">
            <Button
              variant="ghost"
              asChild
              className="mb-6 hover:bg-white/10 text-white/80 hover:text-white backdrop-blur-sm"
            >
              <Link href="/blog">
                <ArrowLeft className="mr-2" size={18} />
                Back to the reading room
              </Link>
            </Button>

            <div className="mb-4">
              <span className="inline-block rounded-full px-3 py-1 font-sans text-xs font-semibold text-[#0b0b12]" style={{ background: 'var(--gold)' }}>
                {post.category}
              </span>
            </div>

            <h1 className="font-editorial text-4xl md:text-7xl text-white mb-6 leading-[0.95] max-w-4xl">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-[#cfcfd8]">
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content with TOC */}
      <div className="relative py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[280px_1fr] gap-12">
            {/* Table of Contents - Left Sidebar */}
            <aside className="hidden lg:block">
              <TableOfContents post={post} />
            </aside>

            {/* Main Content */}
            <article className="min-w-0">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border px-3 py-1 font-sans text-xs text-[#a9a9b6]" style={{ borderColor: 'var(--line)' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* AI Summary Box */}
              <div className="mb-12 rounded-2xl border p-6" style={{ borderColor: 'var(--line)', background: 'rgba(255,182,39,0.06)' }}>
                <div className="flex items-start gap-3 mb-3">
                  <Sparkles className="mt-1 flex-shrink-0" size={20} style={{ color: 'var(--gold)' }} />
                  <h3 className="kicker" style={{ color: 'var(--gold)' }}>TL;DR</h3>
                </div>
                <p className="text-[#cfcfd8] leading-relaxed">{post.aiSummary}</p>
              </div>

              {/* Blog Content */}
              <BlogPost post={post} />

              {/* Related Posts */}
              <div className="mt-16 pt-8 border-t" style={{ borderColor: 'var(--line)' }}>
                <span className="kicker mb-6 block" style={{ color: 'var(--gold)' }}>Keep reading</span>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedPosts.map((related) => (
                    <BlogCard key={related.id} post={related} />
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Optional: Generate static pages for all blog posts at build time
 * This improves performance and SEO.
 */
export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}
