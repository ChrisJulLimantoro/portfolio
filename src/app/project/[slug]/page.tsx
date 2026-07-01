import { getProjectBySlug, getProjects } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Github, ExternalLink, ArrowLeft, ArrowUpRight, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { ProjectGallery } from '@/components/features/project/projectGallery';
import { LiveDetail } from '@/components/features/project/detail/liveDetail';
import { AgentDetail } from '@/components/features/project/detail/agentDetail';
import { IndexDetail } from '@/components/features/project/detail/indexDetail';
import { accentFor, variantLabel } from '@/components/features/project/projectAccent';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const accent = accentFor(project);
  const variant = project.variant ?? 'gallery';

  return (
    <div className="relative min-h-screen px-5 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back */}
        <Link
          href="/project"
          className="link-wipe group mb-10 inline-flex items-center gap-2 font-sans text-sm text-[#a9a9b6] transition-colors hover:text-[#ECECF2]"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          Back to the index
        </Link>

        {/* Header */}
        <div className="border-b pb-10" style={{ borderColor: 'var(--line)' }}>
          <span className="kicker" style={{ color: accent }}>
            {variantLabel(project)} · {project.category}
          </span>
          <h1 className="font-editorial mt-3 text-6xl text-[#ECECF2] sm:text-8xl">
            {project.title}
          </h1>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
            <div>
              <p className="text-lg leading-relaxed text-[#ECECF2]">{project.longDescription}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[...project.languages, ...project.frameworks, ...project.tags].map((t) => (
                  <span key={t} className="rounded-full border px-3 py-1 font-sans text-xs text-[#a9a9b6]" style={{ borderColor: 'var(--line)' }}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.links?.live && (
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer"
                     className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-sm font-semibold text-[#0b0b12] transition-transform hover:-translate-y-0.5"
                     style={{ background: accent }}>
                    <ExternalLink size={18} /> Visit live
                  </a>
                )}
                {project.links?.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-sans text-sm font-semibold text-[#ECECF2] transition-colors hover:border-[color:var(--accent)]"
                     style={{ borderColor: 'var(--line)', ['--accent' as string]: accent }}>
                    <Github size={18} /> Source
                  </a>
                )}
                {project.links?.appStore && (
                  <a href={project.links.appStore} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-sans text-sm font-semibold text-[#ECECF2] transition-colors hover:border-[color:var(--accent)]"
                     style={{ borderColor: 'var(--line)', ['--accent' as string]: accent }}>
                    <Smartphone size={18} /> App Store
                  </a>
                )}
                {!project.links?.github && !project.links?.live && !project.links?.appStore && (
                  <p className="text-sm text-[#a9a9b6]">Private project — documentation only.</p>
                )}
              </div>
            </div>

            {/* Highlights */}
            <ul className="space-y-4">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 border-l-2 pl-4" style={{ borderColor: accent }}>
                  <p className="text-sm leading-relaxed text-[#cfcfd8]">{h}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Variatif body */}
        {variant === 'gallery' && project.images.length > 0 && (
          <ProjectGallery images={project.images} title={project.title} accent={accent} />
        )}
        {variant === 'live' && project.links?.live && (
          <LiveDetail url={project.links.live} title={project.title} accent={accent} />
        )}
        {variant === 'agent' && <AgentDetail accent={accent} />}
        {variant === 'index' && <IndexDetail accent={accent} />}

        {/* Next project */}
        <div className="mt-28 border-t pt-10" style={{ borderColor: 'var(--line)' }}>
          <span className="kicker" style={{ color: 'var(--hush)' }}>Next in the issue</span>
          {(() => {
            const projects = getProjects();
            const idx = projects.findIndex((p) => p.slug === slug);
            const next = projects[(idx + 1) % projects.length];
            const nextAccent = accentFor(next);
            return (
              <Link href={`/project/${next.slug}`} className="group mt-3 flex items-center justify-between gap-4">
                <h3 className="font-editorial text-4xl text-[#6b6b78] transition-colors duration-300 group-hover:text-[#ECECF2] sm:text-6xl">
                  {next.title}
                </h3>
                <ArrowUpRight size={36} className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" style={{ color: nextAccent }} />
              </Link>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}
