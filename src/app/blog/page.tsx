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
    <div className="relative min-h-screen px-5 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <BlogList blogPosts={blogPosts} />
      </div>
    </div>
  );
}
