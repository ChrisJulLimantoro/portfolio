'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { BlogPost } from '@/lib/data/blog';

type TOCItem = {
  id: string;
  text: string;
  level: number;
};

type TableOfContentsProps = {
  post: BlogPost;
};

/**
 * Table of Contents Component
 * Extracts headings from blog sections and creates a scrollable navigation
 */
export function TableOfContents({ post }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from sections
    const toc: TOCItem[] = post.sections.map((section) => ({
      id: section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      text: section.title,
      level: section.level || 2,
    }));

    setHeadings(toc);
  }, [post]);

  useEffect(() => {
    // Track which heading is currently in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    // Observe all headings
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky top-24 hidden lg:block"
    >
      <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
        <h3 className="text-lg font-display font-bold text-white mb-4">
          Table of Contents
        </h3>
        <nav className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
          {headings.map(({ id, text, level }) => (
            <button
              key={id}
              onClick={() => scrollToHeading(id)}
              className={`
                block w-full text-left text-sm transition-all
                ${level === 3 ? 'pl-4' : ''}
                ${
                  activeId === id
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-300'
                }
              `}
            >
              {text}
            </button>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}
