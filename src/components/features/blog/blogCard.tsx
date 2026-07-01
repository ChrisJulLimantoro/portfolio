'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { BlogPost } from '@/lib/data';

interface BlogCardProps {
  post: BlogPost;
  delay?: number;
}

/** Editorial blog card (gold "reading room" accent). */
export function BlogCard({ post, delay = 0 }: BlogCardProps) {
  const { id, title, excerpt, date, readTime, heroImage, category } = post;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Link href={`/blog/${id}`} className="group flex h-full flex-col">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl" style={{ background: 'var(--ink-2)' }}>
          <Image
            src={heroImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover opacity-80 grayscale transition-all duration-500 group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
          />
          <span className="absolute left-4 top-4 rounded-full px-3 py-1 font-sans text-xs font-semibold text-[#0b0b12]" style={{ background: 'var(--gold)' }}>
            {category}
          </span>
          <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: 'var(--gold)' }} />
        </div>
        <div className="flex flex-1 flex-col pt-4">
          <div className="flex items-center gap-3">
            <span className="kicker" style={{ color: 'var(--hush)' }}>{date}</span>
            <span className="kicker" style={{ color: 'var(--hush)' }}>· {readTime}</span>
          </div>
          <h3 className="font-editorial mt-2 text-2xl text-[#ECECF2] transition-colors duration-300 group-hover:text-[#ffb627]">
            {title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-[#a9a9b6] line-clamp-2">{excerpt}</p>
          <span className="mt-3 inline-flex items-center gap-1 font-sans text-sm font-semibold transition-all group-hover:gap-2" style={{ color: 'var(--gold)' }}>
            Read <ArrowUpRight size={15} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
