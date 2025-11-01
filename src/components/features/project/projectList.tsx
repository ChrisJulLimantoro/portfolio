'use client'; // This component MUST be a client component for filters

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ProjectCard } from './projectCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Project } from '@/lib/data'; // Import the type

type ProjectListProps = {
  allProjects: Project[]; // Receive projects as a prop
};

export function ProjectList({ allProjects }: ProjectListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [frameworkFilter, setFrameworkFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        project.aiHighlight.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLanguage =
        languageFilter === 'all' || project.language === languageFilter;
      const matchesFramework =
        frameworkFilter === 'all' || project.framework === frameworkFilter;
      const matchesCategory =
        categoryFilter === 'all' || project.category === categoryFilter;

      return (
        matchesSearch && matchesLanguage && matchesFramework && matchesCategory
      );
    });
  }, [
    searchQuery,
    languageFilter,
    frameworkFilter,
    categoryFilter,
    allProjects,
  ]);

  // Derive filters from the *full* list of projects
  const languages = Array.from(new Set(allProjects.map((p) => p.language)));
  const frameworks = Array.from(new Set(allProjects.map((p) => p.framework)));
  const categories = Array.from(new Set(allProjects.map((p) => p.category)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="mb-6 text-white">All Projects</h1>
      <p className="text-slate-400 mb-12 max-w-3xl text-lg">
        Browse through all my projects and repositories. Use the search and
        filters to find specific technologies or topics.
      </p>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <Input
            type="text"
            placeholder="Search by repository name, topic, or AI summary..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 bg-slate-800/50 backdrop-blur-sm border-slate-700/50 text-white placeholder:text-slate-500 focus:border-cyan-500/50"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-12 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-slate-400" />
          <span className="text-slate-400">Filters:</span>
        </div>

        <Select value={languageFilter} onValueChange={setLanguageFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={frameworkFilter} onValueChange={setFrameworkFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Framework" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Frameworks</SelectItem>
            {frameworks.map((fw) => (
              <SelectItem key={fw} value={fw}>
                {fw}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {(languageFilter !== 'all' ||
          frameworkFilter !== 'all' ||
          categoryFilter !== 'all') && (
          <button
            onClick={() => {
              setLanguageFilter('all');
              setFrameworkFilter('all');
              setCategoryFilter('all');
            }}
            className="text-cyan-400 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <Badge
          variant="secondary"
          className="bg-slate-800/50 text-slate-300 border-slate-700/50"
        >
          {filteredProjects.length}{' '}
          {filteredProjects.length === 1 ? 'project' : 'projects'} found
        </Badge>
      </div>

      {/* Project Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.title} {...project} delay={index * 0.05} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-500">
            No projects found matching your criteria. Try adjusting your
            filters.
          </p>
        </div>
      )}
    </motion.div>
  );
}
