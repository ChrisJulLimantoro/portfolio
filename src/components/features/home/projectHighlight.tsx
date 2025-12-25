'use client';
import { ProjectCard } from '@/components/features/project/projectCard';
import { getProjects } from '@/lib/data';
import Link from 'next/link';

/**
 * Project Highlight Section - Server Component
 * This component fetches a subset of projects (e.g., the first 3)
 * from the data source and renders them.
 */
export function ProjectHighlight() {
  // Get featured projects (e.g., first 3)
  const projects = getProjects().slice(0, 3);

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-8xl font-display mb-4 text-white">
            Featured Work
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A selection of my recent innovations in hardware integration, AI systems, and mobile ecosystems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            console.log(project.images[0].src),
            <ProjectCard 
              key={project.title} 
              {...project} 
              image={project.images[0].src} 
              delay={index * 0.1} 
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            href="/project" 
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
          >
            View All Projects
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
