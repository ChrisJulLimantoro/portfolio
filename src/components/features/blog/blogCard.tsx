'use client'; // This component MUST be a client component for `motion`

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/lib/data';

interface BlogCardProps {
  post: BlogPost;
  delay?: number;
}

export function BlogCard({ post, delay = 0 }: BlogCardProps) {
  const { id, title, excerpt, date, readTime, tags } = post;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link href={`/blog/${id}`}>
        <Card className="p-6 border-slate-700/50 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/20 bg-slate-800/50 backdrop-blur-sm cursor-pointer h-full flex flex-col">
          <h3 className="mb-3 text-white hover:text-cyan-400 transition-colors">
            {title}
          </h3>

          <p className="text-slate-400 mb-4 flex-1">{excerpt}</p>

          <div className="flex items-center gap-4 mb-4 text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{readTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-slate-700/50 text-slate-300 border-0"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
