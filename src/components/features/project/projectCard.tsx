import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  languages: string[];
  frameworks: string[];
  highlights: string[];
  image?: string;
  delay?: number;
}

export function ProjectCard({
  slug,
  title,
  description,
  tags,
  languages,
  frameworks,
  highlights,
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
      <Link href={`/project/${slug}`} className="block h-full group">
        <Card className="overflow-hidden border-slate-700/50 group-hover:border-cyan-500/50 transition-all group-hover:shadow-xl group-hover:shadow-cyan-500/20 bg-slate-800/50 backdrop-blur-sm h-full flex flex-col relative">
          <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-cyan-500/20 p-2 rounded-full backdrop-blur-md border border-cyan-500/30">
              <ArrowUpRight className="text-cyan-400" size={18} />
            </div>
          </div>

          {image && (
            <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden relative">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:opacity-60 group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
            </div>
          )}

          <div className="p-6 flex flex-col flex-1">
            <h3 className="mb-3 text-white group-hover:text-cyan-400 transition-colors">
              {title}
            </h3>
            <p className="text-slate-400 mb-4 flex-1 line-clamp-2">
              {description}
            </p>

            {/* AI Highlight Box */}
            <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20">
              <div className="flex items-start gap-2">
                <Sparkles
                  className="text-cyan-400 mt-0.5 flex-shrink-0"
                  size={16}
                />
                <p className="text-cyan-100 text-sm">{highlights[0]}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {[...languages, ...frameworks, ...tags].slice(0, 6).map((tag) => (
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
      </Link>
    </motion.div>
  );
}
