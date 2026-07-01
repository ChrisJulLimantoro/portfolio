'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BlogCard } from './blogCard';
import { BlogPost as BlogPostType } from '@/lib/data';

type BlogListProps = { blogPosts: BlogPostType[] };

/** The reading room (gold-led): featured spreads + a numbered article index. */
export function BlogList({ blogPosts }: BlogListProps) {
  const featuredPosts = blogPosts.filter((p) => p.featured);
  const regularPosts = blogPosts.filter((p) => !p.featured);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-12 border-b pb-10" style={{ borderColor: 'var(--line)' }}>
        <span className="kicker" style={{ color: 'var(--gold)' }}>
          The Reading Room — field notes
        </span>
        <h1 className="font-editorial mt-3 text-6xl text-[#ECECF2] sm:text-8xl">
          Writing
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[#a9a9b6]">
          Notes from building production systems — software architecture, AI,
          security, and the occasional rabbit hole.
        </p>
      </div>

      {/* Featured */}
      {featuredPosts.length > 0 && (
        <div className="mb-16">
          <span className="kicker mb-6 block" style={{ color: 'var(--gold)' }}>Featured</span>
          <div className="grid gap-10 md:grid-cols-2">
            {featuredPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} delay={i * 0.1} />
            ))}
          </div>
        </div>
      )}

      {/* Numbered index */}
      <span className="kicker mb-2 block" style={{ color: 'var(--hush)' }}>The index — everything</span>
      <ol>
        {regularPosts.map((post, i) => (
          <motion.li
            key={post.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: (i % 8) * 0.05 }}
          >
            <Link
              href={`/blog/${post.id}`}
              className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-5 border-t py-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb627] sm:gap-8"
              style={{ borderColor: 'var(--line)' }}
            >
              <span className="font-editorial text-xl tabular-nums" style={{ color: 'var(--gold)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="kicker" style={{ color: 'var(--gold)' }}>{post.category}</span>
                  <span className="kicker" style={{ color: 'var(--hush)' }}>{post.date} · {post.readTime}</span>
                </div>
                <h3 className="font-editorial mt-1 text-2xl text-[#ECECF2] transition-colors duration-200 group-hover:text-[#ffb627] sm:text-3xl">
                  {post.title}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-[#a9a9b6] line-clamp-1">{post.excerpt}</p>
              </div>
              <ArrowUpRight size={22} className="shrink-0 self-center text-[#a9a9b6] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
}
