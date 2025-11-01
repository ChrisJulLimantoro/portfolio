import { BlogList } from '@/components/features/blog/blogList';
import { getBlogPosts } from '@/lib/data';

/**
 * Blog Page - Server Component
 * This page fetches all blog posts and passes them to the
 * `BlogList` component to be rendered.
 */
export default function BlogPage() {
  const blogPosts = getBlogPosts();

  return (
    <div className="relative min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <BlogList blogPosts={blogPosts} />
      </div>
    </div>
  );
}
