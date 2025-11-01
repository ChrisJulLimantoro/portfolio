import { ProjectCard } from '@/components/features/project/projectCard';
import { getProjects } from '@/lib/data';

/**
 * Project Highlight Section - Server Component
 * This component fetches a subset of projects (e.g., the first 3)
 * from the data source and renders them.
 */
export function ProjectHighlight() {
  // Get featured projects (e.g., first 3)
  const projects = getProjects().slice(0, 3);

  // We add the images back here, as they were in your original
  // ProjectHighlight.tsx but not in the `allProjects` array.
  // In a real app, this image URL would come from your data source.
  const projectsWithImages = projects.map((p, i) => ({
    ...p,
    image: [
      'https://images.unsplash.com/photo-1559990884-5ea6037f5100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjE5Nzk5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1745674684463-62f62cb88d4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2V8ZW58MXx8fHwxNzYxODcyNzQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1761078739233-629de9252840?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzYxOTEwMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ][i],
  }));

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-8xl font-display mb-4 text-white">
            Featured Projects
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Explore some of my recent work in microservices, AI integration, and
            mobile development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsWithImages.map((project, index) => (
            <ProjectCard key={project.title} {...project} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
