import { getBlogPosts, getBlogPostById } from '@/lib/data';
import { BlogPost } from '@/components/features/blog/blogPost';
import { BlogCard } from '@/components/features/blog/blogCard';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
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
export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostById(params.id);

  // Handle case where post isn't found
  if (!post) {
    notFound(); // Triggers the 404 page
  }

  // Get other posts for "Related" section
  const relatedPosts = getBlogPosts()
    .filter((p) => p.id !== params.id)
    .slice(0, 2);

  return (
    <div className="relative min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          asChild
          className="mb-8 hover:bg-slate-800/50 text-slate-400 hover:text-white"
        >
          <Link href="/blog">
            <ArrowLeft className="mr-2" size={18} />
            Back to Blog
          </Link>
        </Button>

        <article className="max-w-4xl mx-auto">
          <h1 className="mb-6 text-white">{post.title}</h1>

          <div className="flex items-center gap-4 mb-8 text-slate-400">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

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
              <h3 className="text-cyan-100">AI Summary</h3>
            </div>
            <p className="text-cyan-200">{post.aiSummary}</p>
          </div>

          {/* Article Content */}
          <BlogPost content={post.content} />

          {/* Related Posts */}
          <div className="mt-16 pt-8 border-t border-slate-800/50">
            <h3 className="mb-6 text-white">Related Posts</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <BlogCard key={related.id} post={related} />
              ))}
            </div>
          </div>
        </article>
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
