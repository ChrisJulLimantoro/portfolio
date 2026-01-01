'use client';
import { ProjectCard } from '@/components/features/project/projectCard';
import { getProjects } from '@/lib/data';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Project Highlight Section - Client Component with scroll animations
 */
export function ProjectHighlight() {
  // Get featured projects (e.g., first 3)
  const projects = getProjects().slice(0, 3);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-8xl font-display mb-4 text-white">
            Featured Work
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A selection of my recent innovations in hardware integration, AI systems, and mobile ecosystems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <ProjectCard 
                {...project} 
                image={project.images[0].src} 
                delay={0}
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link 
            href="/project" 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            View All Projects
            <span className="text-xl">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
