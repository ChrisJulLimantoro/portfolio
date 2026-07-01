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
      <div className="border-l pl-5" style={{ borderColor: 'var(--line)' }}>
        <span className="kicker mb-4 block" style={{ color: 'var(--gold)' }}>
          In this piece
        </span>
        <nav className="space-y-2.5 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
          {headings.map(({ id, text, level }, i) => (
            <button
              key={id}
              onClick={() => scrollToHeading(id)}
              className={`group flex w-full items-baseline gap-3 text-left text-sm transition-colors ${level === 3 ? 'pl-4' : ''}`}
              style={{ color: activeId === id ? '#ffb627' : 'var(--hush)' }}
            >
              <span className="font-editorial text-xs tabular-nums" style={{ color: activeId === id ? '#ffb627' : 'var(--ink-3)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="group-hover:text-[#ECECF2]">{text}</span>
            </button>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}
