'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { BlogPost } from '@/lib/data';

type BlogHighlightProps = {
  featuredPost: BlogPost;
  latestPosts: BlogPost[];
};

/**
 * Newspaper-style blog highlight section for homepage
 * Uses multi-column layout with decorative newspaper elements
 */
export function BlogHighlight({ featuredPost, latestPosts }: BlogHighlightProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 px-6 overflow-hidden" ref={ref}>
      {/* Background gradient effects */}
      <motion.div
        className="absolute -top-20 -left-40 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full -z-10"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-40 -right-40 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full -z-10"
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Newspaper-style header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <BookOpen className="text-cyan-400" size={32} />
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </div>
          <h2 className="text-7xl md:text-8xl font-display mb-4 text-white">
            Latest Insights
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Deep dives into software architecture, security, and modern development practices
          </p>
        </motion.div>

        {/* Newspaper columns layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column - Featured article (spans 2 columns) */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Link href={`/blog/${featuredPost.id}`} className="group block">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-500">
                {/* Hero image */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={featuredPost.heroImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  
                  {/* Featured badge */}
                  <div className="absolute top-4 left-4 px-4 py-2 bg-cyan-500/90 backdrop-blur-sm rounded-full">
                    <span className="text-white font-medium text-sm">Featured Article</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {featuredPost.readTime}
                    </span>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs">
                      {featuredPost.category}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    {featuredPost.title}
                  </h3>

                  <p className="text-slate-300 text-lg leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-cyan-400 font-medium group-hover:gap-4 transition-all">
                    Read Full Article
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Right column - Latest posts (vertical timeline) */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent" />
              <span className="text-slate-400 font-medium text-sm uppercase tracking-wider">
                Recent Posts
              </span>
            </div>

            {latestPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <Link href={`/blog/${post.id}`} className="group block">
                  <div className="relative pl-6 pb-6 border-l-2 border-slate-700/50 hover:border-cyan-500/50 transition-colors">
                    {/* Timeline dot */}
                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 bg-cyan-500 rounded-full group-hover:scale-150 transition-transform" />

                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700/50">
                        <Image
                          src={post.heroImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-cyan-500/25 group"
          >
            Explore All Articles
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
