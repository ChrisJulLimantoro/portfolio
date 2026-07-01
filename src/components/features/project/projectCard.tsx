'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/data';
import { accentFor, variantLabel } from './projectAccent';

/** Editorial project card: screenshot when present, designed accent cover when not. */
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const accent = accentFor(project);
  const cover = project.images[0]?.src;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
    >
      <Link
        href={`/project/${project.slug}`}
        className="group relative flex flex-col overflow-hidden focus-visible:outline-none focus-visible:ring-2"
        style={{ ['--accent' as string]: accent }}
      >
        <div className="relative aspect-[16/11] w-full overflow-hidden" style={{ background: 'var(--ink-2)' }}>
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt={project.title}
              className="h-full w-full object-cover opacity-70 grayscale transition-all duration-500 ease-out group-hover:scale-[1.04] group-hover:opacity-100 group-hover:grayscale-0"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]"
              style={{ background: `radial-gradient(120% 120% at 25% 15%, ${accent}26, transparent 60%), var(--ink-2)` }}
            >
              <span className="font-editorial text-7xl sm:text-8xl" style={{ color: accent }}>
                {project.title.charAt(0)}
              </span>
            </div>
          )}
          <div
            className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full text-[#0b0b12] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
            style={{ background: accent }}
          >
            <ArrowUpRight size={20} />
          </div>
          <span className="absolute left-4 top-4 rounded-full px-2.5 py-1 font-sans text-[11px] font-semibold text-[#0b0b12]" style={{ background: accent }}>
            {variantLabel(project)}
          </span>
          <span
            className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
            style={{ background: accent }}
          />
        </div>

        <div className="pt-4">
          <span className="kicker" style={{ color: accent }}>
            {project.category}
          </span>
          <h3 className="font-editorial mt-2 text-3xl text-[#ECECF2] transition-colors duration-300 group-hover:text-[color:var(--accent)]">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#a9a9b6] line-clamp-2">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            {[...project.languages, ...project.frameworks].slice(0, 4).map((t) => (
              <span key={t} className="kicker" style={{ color: 'var(--hush)' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
