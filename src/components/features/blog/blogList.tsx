'use client'; // Client component for motion and AnimatePresence

import { motion, AnimatePresence } from 'framer-motion';
import { BlogCard } from './blogCard';
import { BlogPost as BlogPostType } from '@/lib/data';

type BlogListProps = {
  blogPosts: BlogPostType[];
};

/**
 * This component renders the list view of the blog page.
 * It's a client component to handle the motion animations.
 */
export function BlogList({ blogPosts }: BlogListProps) {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <motion.div
      key="blog-overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-16">
        <h1 className="font-display font-bold text-6xl md:text-8xl text-white mb-6">Blog</h1>
        <p className="text-slate-400 mb-4 max-w-3xl mx-auto text-lg">
          Thoughts on software architecture, AI systems, security, and full-stack
          development. Insights from building production systems at scale.
        </p>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl font-display text-white mb-8 flex items-center gap-3">
            <span className="text-cyan-400">★</span> Featured Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} delay={index * 0.1} />
            ))}
          </div>
        </div>
      )}

      {/* All Posts */}
      <h2 className="text-3xl font-display text-white mb-8">All Articles</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} delay={index * 0.1} />
        ))}
      </div>
    </motion.div>
  );
}
