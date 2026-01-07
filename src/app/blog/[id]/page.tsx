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
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 pb-12 w-full">
            <Button
              variant="ghost"
              asChild
              className="mb-6 hover:bg-white/10 text-white/80 hover:text-white backdrop-blur-sm"
            >
              <Link href="/blog">
                <ArrowLeft className="mr-2" size={18} />
                Back to Blog
              </Link>
            </Button>

            <div className="mb-4">
              <Badge className="bg-cyan-500/90 text-white border-0 mb-4">
                {post.category}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-slate-300">
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
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-slate-700/50 text-slate-300 border-0"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* AI Summary Box */}
              <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 backdrop-blur-sm">
                <div className="flex items-start gap-3 mb-3">
                  <Sparkles
                    className="text-cyan-400 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <h3 className="text-xl font-semibold text-cyan-100">TL;DR</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">{post.aiSummary}</p>
              </div>

              {/* Blog Content */}
              <BlogPost post={post} />

              {/* Related Posts */}
              <div className="mt-16 pt-8 border-t border-slate-700/50">
                <h3 className="text-3xl font-display font-bold mb-6 text-white">
                  Related Articles
                </h3>
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
