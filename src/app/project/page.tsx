import { ProjectList } from '@/components/features/project/projectList';
import { getProjects } from '@/lib/data';

/**
 * Projects Page - Server Component
 * This page component is a Server Component.
 * It fetches the data (`allProjects`) and passes it down
 * to the `ProjectList` client component, which handles the filtering.
 */
export default function ProjectsPage() {
  // Fetch data on the server
  const allProjects = getProjects();

  return (
    <div className="relative min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/*
          Pass the server-fetched data as props to the Client Component.
          This is the standard pattern: fetch data on server,
          handle interactivity on client.
        */}
        <ProjectList allProjects={allProjects} />
      </div>
    </div>
  );
}
