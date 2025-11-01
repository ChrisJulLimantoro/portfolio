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
  return (
    <motion.div
      key="blog-overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="mb-6 text-white">Blog</h1>
      <p className="text-slate-400 mb-12 max-w-3xl text-lg">
        Thoughts on software architecture, AI systems, and full-stack
        development. Insights from building production systems at scale.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <BlogCard key={post.id} post={post} delay={index * 0.1} />
        ))}
      </div>
    </motion.div>
  );
}
