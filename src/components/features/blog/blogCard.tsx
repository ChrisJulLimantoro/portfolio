'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/lib/data';

interface BlogCardProps {
  post: BlogPost;
  delay?: number;
}

export function BlogCard({ post, delay = 0 }: BlogCardProps) {
  const { id, title, excerpt, date, readTime, tags, heroImage, category } = post;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <Link href={`/blog/${id}`} className="group">
        <Card className="border-slate-700/50 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/20 bg-slate-800/50 backdrop-blur-sm cursor-pointer h-full flex flex-col overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={heroImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
            
            {/* Category badge */}
            <div className="absolute top-3 right-3 px-3 py-1 bg-cyan-500/90 backdrop-blur-sm rounded-full">
              <span className="text-white font-medium text-xs">{category}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
              {title}
            </h3>

            <p className="text-slate-400 mb-4 flex-1 line-clamp-3">{excerpt}</p>

            <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
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
              {tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-slate-700/50 text-slate-300 border-0 text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
