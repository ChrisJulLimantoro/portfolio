import { ProjectList } from '@/components/features/project/projectList';
import { getProjects } from '@/lib/data';

/** Projects index — editorial "The Index" room (fuchsia-led). */
export default function ProjectsPage() {
  const allProjects = getProjects();

  return (
    <div className="relative min-h-screen px-5 pb-24 pt-28 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <ProjectList allProjects={allProjects} />
      </div>
    </div>
  );
}
