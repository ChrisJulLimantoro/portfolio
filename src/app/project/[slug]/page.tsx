import { getProjectBySlug, getProjects } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Github, ExternalLink, ArrowLeft, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { ProjectGallery } from '@/components/features/project/projectGallery';

/**
 * Project Detail Page - Server Component
 * Fetches project data based on the slug and renders the detail view.
 */
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/project"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>

        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-start">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-3 mb-8">
              {[...project.languages, ...project.frameworks, ...project.tags].map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-slate-800/80 text-cyan-100 border-slate-700/50 py-1.5 px-4 text-sm"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              {project.longDescription}
            </p>

            <div className="flex flex-wrap gap-4">
              {project.links?.github || project.links?.live || project.links?.appStore ? (
                <>
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-full border border-slate-700 transition-all hover:scale-105"
                    >
                      <Github size={20} />
                      <span>View Source</span>
                    </a>
                  )}
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-full border border-slate-700 transition-all hover:scale-105"
                    >
                      <ExternalLink size={20} />
                      <span>View Page</span>
                    </a>
                  )}
                  {project.links?.appStore && (
                    <a
                      href={project.links.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded-full transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105 font-medium"
                    >
                      <Smartphone size={20} />
                      <span>Download Now</span>
                    </a>
                  )}
                </>
              ) : (
                <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
                  <p className="text-slate-400 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-pulse" />
                    This project is private or currently unpublished. Only documentation and gallery results are displayed.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Project Highlights Section */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-8 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-cyan-500/20 p-2 rounded-lg">
                  <Sparkles className="text-cyan-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">Project Highlights</h3>
              </div>
              <div className="space-y-6">
                {project.highlights.map((highlight, index) => (
                  <div key={index} className="flex gap-3">
                    <p className="text-slate-300 text-lg leading-relaxed italic">
                      "{highlight}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fluid Bento Gallery Design with Lightbox */}
        <ProjectGallery images={project.images} title={project.title} />

        {/* Next Project Teaser */}
        <div className="mt-32 pt-16 border-t border-slate-800/50">
            <p className="text-slate-500 mb-4 font-medium uppercase tracking-widest text-sm">Next Project</p>
            {(() => {
              const projects = getProjects();
              const currentIdx = projects.findIndex(p => p.slug === slug);
              const nextProject = projects[(currentIdx + 1) % projects.length];
              
              return (
                <Link 
                  href={`/project/${nextProject.slug}`}
                  className="group inline-flex items-center gap-4 py-4"
                >
                    <h3 className="text-4xl md:text-5xl font-bold text-slate-400 group-hover:text-white transition-colors underline decoration-slate-800 underline-offset-8 group-hover:decoration-cyan-500 transition-all">
                      {nextProject.title}
                    </h3>
                </Link>
              );
            })()}
        </div>
      </div>
    </div>
  );
}

// Generate static params for better performance
export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
