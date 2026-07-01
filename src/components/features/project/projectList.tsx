'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, ArrowUpRight, LayoutGrid, List } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Project } from '@/lib/data';
import { ProjectCard } from './projectCard';
import { accentFor, variantLabel } from './projectAccent';

type ProjectListProps = { allProjects: Project[] };

export function ProjectList({ allProjects }: ProjectListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [frameworkFilter, setFrameworkFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [view, setView] = useState<'index' | 'grid'>('index');
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        q === '' ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tags.some((t) => t.toLowerCase().includes(q)) ||
        project.languages.some((l) => l.toLowerCase().includes(q)) ||
        project.frameworks.some((f) => f.toLowerCase().includes(q)) ||
        project.highlights.some((h) => h.toLowerCase().includes(q));
      const matchesLanguage =
        languageFilter === 'all' || project.languages.includes(languageFilter);
      const matchesFramework =
        frameworkFilter === 'all' || project.frameworks.includes(frameworkFilter);
      const matchesCategory =
        categoryFilter === 'all' || project.category === categoryFilter;
      return matchesSearch && matchesLanguage && matchesFramework && matchesCategory;
    });
  }, [searchQuery, languageFilter, frameworkFilter, categoryFilter, allProjects]);

  const languages = Array.from(new Set(allProjects.flatMap((p) => p.languages)));
  const frameworks = Array.from(new Set(allProjects.flatMap((p) => p.frameworks)));
  const categories = Array.from(new Set(allProjects.map((p) => p.category)));

  const preview =
    filteredProjects.find((p) => p.slug === activeSlug) ?? filteredProjects[0];

  const triggerCls =
    'w-40 bg-[var(--ink-2)] border-[color:var(--line)] text-[#ECECF2]';

  return (
    <div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <span className="kicker" style={{ color: 'var(--fuchsia)' }}>
          The Index — every build
        </span>
        <h1 className="font-editorial mt-3 text-6xl text-[#ECECF2] sm:text-8xl">
          All work
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[#a9a9b6]">
          The full catalogue — agents, automation, apps and experiments. Hover to
          preview, filter to dig, click to open.
        </p>
      </motion.div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8a99]" size={20} />
        <input
          type="text"
          placeholder="Search by name, tech, or topic…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-14 w-full rounded-xl border bg-[var(--ink-2)] pl-12 pr-4 text-[#ECECF2] placeholder:text-[#6b6b78] focus:outline-none focus:ring-2 focus:ring-[#ff3d81]"
          style={{ borderColor: 'var(--line)' }}
        />
      </div>

      {/* Filters + view toggle */}
      <div className="mb-8 flex flex-wrap items-center gap-4 border-b pb-6" style={{ borderColor: 'var(--line)' }}>
        <Select value={languageFilter} onValueChange={setLanguageFilter}>
          <SelectTrigger className={triggerCls}><SelectValue placeholder="Language" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All languages</SelectItem>
            {languages.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={frameworkFilter} onValueChange={setFrameworkFilter}>
          <SelectTrigger className={triggerCls}><SelectValue placeholder="Framework" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All frameworks</SelectItem>
            {frameworks.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className={triggerCls}><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>

        <span className="kicker ml-auto hidden sm:inline" style={{ color: 'var(--hush)' }}>
          {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
        </span>

        {/* View toggle (desktop only — mobile is always cards) */}
        <div className="hidden items-center gap-1 rounded-full border p-1 lg:flex" style={{ borderColor: 'var(--line)' }}>
          {(['index', 'grid'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-xs font-semibold transition-colors"
              style={{
                background: view === v ? 'var(--fuchsia)' : 'transparent',
                color: view === v ? '#0b0b12' : 'var(--hush)',
              }}
            >
              {v === 'index' ? <List size={14} /> : <LayoutGrid size={14} />}
              {v === 'index' ? 'Index' : 'Grid'}
            </button>
          ))}
        </div>
      </div>

      {/* INDEX (master–detail) — desktop, when selected */}
      {view === 'index' && filteredProjects.length > 0 && (
        <div className="hidden gap-12 lg:grid lg:grid-cols-[1.1fr_1fr]">
          {/* Master list */}
          <ol>
            {filteredProjects.map((project) => {
              const accent = accentFor(project);
              const isActive = preview?.slug === project.slug;
              return (
                <li key={project.slug}>
                  <Link
                    href={`/project/${project.slug}`}
                    onMouseEnter={() => setActiveSlug(project.slug)}
                    onFocus={() => setActiveSlug(project.slug)}
                    className="group grid grid-cols-[1fr_auto] items-center gap-4 border-t py-6 transition-colors focus-visible:outline-none"
                    style={{ borderColor: 'var(--line)' }}
                  >
                    <div className="min-w-0">
                      <span className="kicker" style={{ color: accent }}>
                        {variantLabel(project)} · {project.category}
                      </span>
                      <h3
                        className="font-editorial mt-1 text-3xl leading-tight transition-colors duration-200 sm:text-4xl"
                        style={{ color: isActive ? accent : '#ECECF2' }}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <ArrowUpRight
                      size={22}
                      className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      style={{ color: isActive ? accent : 'var(--hush)' }}
                    />
                  </Link>
                </li>
              );
            })}
          </ol>

          {/* Detail preview */}
          <div>
            <div className="sticky top-24">
              <AnimatePresence mode="wait">
                {preview && (
                  <motion.div
                    key={preview.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Preview project={preview} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* GRID — always on mobile; on desktop when toggled */}
      <div className={view === 'grid' ? 'grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3' : 'grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:hidden'}>
        {filteredProjects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="border-t py-20 text-center" style={{ borderColor: 'var(--line)' }}>
          <p className="font-editorial text-3xl text-[#ECECF2]">Nothing matches — yet.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setLanguageFilter('all');
              setFrameworkFilter('all');
              setCategoryFilter('all');
            }}
            className="mt-4 font-sans text-sm font-semibold text-[#ff3d81]"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

function Preview({ project }: { project: Project }) {
  const accent = accentFor(project);
  const cover = project.images[0]?.src;
  return (
    <Link href={`/project/${project.slug}`} className="group block" style={{ ['--accent' as string]: accent }}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--line)', background: 'var(--ink-2)' }}>
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt={project.title} className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]" />
        ) : (
          <div className="flex h-full w-full items-center justify-center" style={{ background: `radial-gradient(120% 120% at 30% 15%, ${accent}2e, transparent 62%), var(--ink-2)` }}>
            <span className="font-editorial text-[8rem] leading-none" style={{ color: accent }}>{project.title.charAt(0)}</span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full px-3 py-1 font-sans text-xs font-semibold text-[#0b0b12]" style={{ background: accent }}>
          {variantLabel(project)}
        </span>
      </div>
      <p className="mt-4 max-w-lg text-[#ECECF2]">{project.description}</p>
      <span className="mt-3 inline-flex items-center gap-1 font-sans text-sm font-semibold transition-all group-hover:gap-2" style={{ color: accent }}>
        Open project <ArrowUpRight size={16} />
      </span>
    </Link>
  );
}
