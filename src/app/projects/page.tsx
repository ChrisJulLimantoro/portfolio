// This will be your Projects page. Create a folder named 'projects' inside 'app'
// and place this file inside it. Next.js will automatically create the /projects route.
'use client';

import React from 'react';

// Define the types for the props of the ProjectCard component
interface ProjectCardProps {
  title: string;
  description: string;
  imgSrc: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imgSrc }) => (
  <div className="group relative overflow-hidden rounded-lg">
    <img
      src={imgSrc}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    <div className="absolute bottom-0 left-0 p-6">
      <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </div>
);

const ProjectsPage: React.FC = () => (
  <div className="p-4 flex flex-col items-center">
    <h2 className="text-5xl font-bold text-gray-900 mb-16">Selected Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
      <ProjectCard
        title="Custom-Trained LLM"
        description="The AI assistant on this site."
        imgSrc="https://placehold.co/600x400/1e232e/f8f9fa?text=AI"
      />
      <ProjectCard
        title="Neural Image Synthesis"
        description="Generative art application."
        imgSrc="https://placehold.co/600x400/4A5568/f8f9fa?text=Art"
      />
      <ProjectCard
        title="Predictive Analytics Engine"
        description="Real-time data dashboard."
        imgSrc="https://placehold.co/600x400/161a21/f8f9fa?text=Data"
      />
    </div>
  </div>
);

export default ProjectsPage;
