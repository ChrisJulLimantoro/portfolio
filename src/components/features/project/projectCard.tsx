'use client'; // This component MUST be a client component for `motion`

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  aiHighlight: string;
  image?: string;
  delay?: number;
}

export function ProjectCard({
  title,
  description,
  tags,
  aiHighlight,
  image,
  delay = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
    >
      <Card className="overflow-hidden border-slate-700/50 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/20 bg-slate-800/50 backdrop-blur-sm h-full flex flex-col">
        {image && (
          <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
            />
          </div>
        )}

        <div className="p-6 flex flex-col flex-1">
          <h3 className="mb-3 text-white">{title}</h3>
          <p className="text-slate-400 mb-4 flex-1">{description}</p>

          {/* AI Highlight Box */}
          <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20">
            <div className="flex items-start gap-2">
              <Sparkles
                className="text-cyan-400 mt-0.5 flex-shrink-0"
                size={16}
              />
              <p className="text-cyan-100">{aiHighlight}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-slate-700/50 text-slate-300 border-0 hover:bg-slate-700 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
