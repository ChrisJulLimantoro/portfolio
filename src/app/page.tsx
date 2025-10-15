'use client';

import React from 'react';

const HomePage: React.FC = () => (
  <div className="h-[calc(100vh-6rem)] flex items-center p-4">
    <div className="max-w-7xl mx-auto">
      <p className="text-lg text-blue-600 dark:text-blue-300 font-semibold mb-2">
        CHRISTOPHER JULIUS LIMANTORO
      </p>
      <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white leading-tight">
        Software Engineer <br />
        AI Engineer
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
        I design and build intelligent, human-centered digital experiences that
        are performant, elegant, and solve real-world problems.
      </p>
    </div>
  </div>
);

export default HomePage;
