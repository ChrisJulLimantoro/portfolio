// This will be your About page. Create a folder named 'about' inside 'app'
// and place this file inside it. Next.js will automatically create the /about route.
'use client';

import React from 'react';

const AboutPage: React.FC = () => (
  <div className="p-4 flex flex-col items-center text-center">
    <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">
      About Me
    </h2>
    <p className="max-w-3xl text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
      I'm a developer and researcher passionate about the intersection of
      artificial intelligence and human-computer interaction. My work focuses on
      creating intelligent, beautiful, and performant digital experiences that
      feel intuitive and alive.
    </p>
  </div>
);

export default AboutPage;
