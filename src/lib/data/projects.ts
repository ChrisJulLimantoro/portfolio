export type ProjectImage = {
  src: string;
  orientation: 'landscape' | 'portrait' | 'square';
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  languages: string[];
  frameworks: string[];
  category: string;
  highlights: string[];
  images: ProjectImage[];
  links?: {
    github?: string;
    live?: string;
    appStore?: string;
  };
};

const allProjects: Project[] = [
  {
    slug: 'randl',
    title: 'RandL',
    description:
      'Empowering drummers through technology. RandL is an iOS app that combines custom Arduino hardware with interactive lessons to master drum rudiments.',
    longDescription:
      'RandL is a revolutionary educational platform developed as a collaborative effort by a team of six passionate creators. It bridges the gap between traditional practice and digital precision by integrating a custom-crafted Arduino drum pad with an intuitive SwiftUI application. Designed specifically to teach the "Fundamentals of Rudiments," RandL provides a tactile and interactive learning experience that helps drummers of all levels build solid technical foundations. This project showcases the perfect synergy between hardware engineering, mobile development, and educational design.',
    tags: ['iOS', 'Arduino', 'IoT', 'Machine Learning', 'Education'],
    languages: ['Swift', 'C++'],
    frameworks: ['SwiftUI', 'Combine'],
    category: 'Application',
    highlights: [
      'Implements real-time rhythm analysis and gesture recognition to provide instant corrective feedback.',
      'Features a custom-crafted Arduino drum pad integrated seamlessly with the iOS application.',
      'Designed to teach the "Fundamentals of Rudiments" through a tactile and interactive experience.',
    ],
    images: [
      { src: '/images/randl/web.png', orientation: 'landscape' },
      { src: '/images/randl/onboard.png', orientation: 'portrait' },
      { src: '/images/randl/result.png', orientation: 'landscape' },
      { src: '/images/randl/module.png', orientation: 'portrait' },
      { src: '/images/randl/history.png', orientation: 'portrait' },
      { src: '/images/randl/training.png', orientation: 'landscape' },
    ],
    links: {
      live: 'https://randlpad.com',
      appStore: 'https://apps.apple.com/app/randl',
    },
  },
  {
    slug: 'batavia',
    title: 'Batavia',
    description:
      'Preserving Indonesian cultural heritage through a digital showcase and global batik marketplace.',
    longDescription:
      'Batavia is a web-based platform developed by my team and me during a 3-day hackathon, aimed at cultivating and enhancing Indonesia’s cultural legacy through technology. The project focuses on showcasing Indonesia’s finest batik and cultural elements in a modern, visually engaging website. Beyond cultural storytelling, Batavia integrates a marketplace feature that allows users to browse batik products from various regions, making Indonesian heritage more accessible to a global audience. Despite the limited development time, the project demonstrates strong collaboration, rapid ideation, and the ability to translate cultural values into a functional digital experience.',
    tags: ['3D-Hackathon', 'Web Development', 'Culture', 'Batik', 'Marketplace', 'Indonesia'],
    languages: ['PHP', 'JavaScript'],
    frameworks: ['Laravel', 'Tailwind CSS'],
    category: 'Website',
    highlights: [
      'Developed as a complete hackathon project within a strict 3-day timeframe.',
      'Combines cultural storytelling with a marketplace to promote Indonesian batik globally.',
      'Designed to cultivate appreciation for Indonesian cultural heritage through a modern web experience.',
    ],
    images: [
      { src: '/images/batavia/home.png', orientation: 'landscape' },
      { src: '/images/batavia/home-2.png', orientation: 'landscape' },
      { src: '/images/batavia/home-3.png', orientation: 'landscape' },
      { src: '/images/batavia/madura.png', orientation: 'portrait' },
    ],
    links: {
      github: 'https://github.com/ChrisJulLimantoro/PDA_Batavia',
    },
  },
  {
    slug: 'portfolio-blog',
    title: 'Portfolio & Blog',
    description:
      'A lifetime project to enhance my portfolio as well as blog to share my story and learning throughout my process being a Software Developer.',
    longDescription:
      'This portfolio website is more than just a showcase; it is a living document of my journey as a software developer. Built with a focus on clean aesthetics and smooth user experience, it integrates a blog where I share technical insights, project post-mortems, and personal growth stories. The project is continuously evolving, serving as both a professional landing page and a creative outlet for my thoughts on technology and lifelong learning.',
    tags: ['Personal', 'Web Development', 'Blog', 'Portfolio'],
    languages: ['TypeScript', 'JavaScript'],
    frameworks: ['Next.js', 'Framer Motion'],
    category: 'Website',
    highlights: [
      'Serving as a central hub for my professional portfolio and technical blog.',
      'Designed with modern aesthetics and smooth animations for an engaging user experience.',
      'A lifetime project that evolves alongside my career and technical expertise.',
    ],
    images: [
      { src: '/images/portfolio/home.png', orientation: 'landscape' }, 
      { src: '/images/portfolio/journey.png', orientation: 'portrait' }, 
      { src: '/images/portfolio/blog.png', orientation: 'portrait' },
      { src: '/images/portfolio/projects.png', orientation: 'landscape'},
      { src: '/images/portfolio/showcase.png', orientation: 'portrait' },
      { src: '/images/portfolio/list.png', orientation: 'landscape' },
    ],
    links: {
      github: 'https://github.com/ChrisJulLimantoro/portfolio',
      live: 'https://portfolio-chris-julius.vercel.app',
    },
  },
  {
    slug: 'otterator',
    title: 'Otterator',
    description:
      'Master the art of public speaking with AI. Otterator provides a personalized practice environment to refine your intonation, pacing, and storytelling.',
    longDescription:
      'Otterator is an AI-driven educational platform designed to transform how individuals prepare for presentations. By leveraging advanced speech analysis, it creates tailored study sessions that go beyond mere script writing. The app focuses on the core pillars of effective storytelling: intonation, strategic pauses, and speech speed. Otterator acts as a private coach, helping users to independently practice and gain the confidence needed to deliver impactful presentations that resonate with their audience.',
    tags: ['AI-Powered', 'Public Speaking', 'Education', 'Speech Analysis', 'Storytelling', 'iOS'],
    languages: ['Swift'],
    frameworks: ['SwiftUI', 'CoreML', 'AVFoundation'],
    category: 'AI / Education',
    highlights: [
      'Analyzes speech patterns in real-time to provide feedback on intonation, pauses, and speed.',
      'Generates personalized study sessions based on the user\'s specific presentation goals.',
      'Empowers users to practice independently and refine their storytelling skills without needing a live audience.',
    ],
    images: [
      { src: '/images/otterator/panel.webp', orientation: 'landscape' },
      { src: '/images/otterator/design.png', orientation: 'square' },
      { src: '/images/otterator/icon.png', orientation: 'square' },
    ],
    links: {
      github: 'https://github.com/ChrisJulLimantoro/Otterator',
    },
  },
  {
    slug: 'food-gpt',
    title: 'FoodGPT',
    description:
      'Personalized AI food recommendation system that understands your cravings. Get suggestions based on trends, your mood, and consumption history.',
    longDescription:
      'FoodGPT is an experimental, AI-driven platform designed to solve the "what to eat" dilemma. It features a sophisticated chatbot interface that leverages Large Language Models to provide conversational food recommendations. By analyzing current food trends, the user\'s emotional state (mood), and past purchase history, FoodGPT offers highly personalized suggestions that feel truly intuitive. This project is currently in an active development phase, focusing on fine-tuning specialized datasets to improve recommendation accuracy and conversational flow.',
    tags: ['AI', 'Machine Learning', 'Data Science', 'Experimental', 'Fun'],
    languages: ['Python', 'Dart'],
    frameworks: ['PyTorch', 'Flutter', 'Flask'],
    category: 'AI / Fun Project',
    highlights: [
      'Interactive GPT-powered chatbot for natural, conversational food discovery.',
      'Dynamic recommendation engine factoring in real-time trends and user mood.',
      'Currently in development: Training custom datasets for hyper-local food knowledge.',
    ],
    images: [
      { src: '/images/food-gpt/new-1.png', orientation: 'portrait' },
      { src: '/images/food-gpt/history-1.png', orientation: 'portrait' },
      { src: '/images/food-gpt/history-2.png', orientation: 'portrait' },
    ],
    links: {},
  },
  {
    slug: 'bharatikafest-2024',
    title: 'Bharatikafest 2024',
    description:
      'Official registration and management platform for Petra Christian University\'s most prestigious art competition.',
    longDescription:
      'Bharatikafest 2024 is a comprehensive web solution designed to host Indonesia\'s premier student art competition. The platform streamlined the entire lifecycle of the festival, from participant onboarding to the submission of digital artworks. It featured a dedicated admin dashboard for competition management, automated participant verification, and a secure asset repository for high-resolution uploads. The project was built to ensure stability during peak traffic periods while maintaining a premium aesthetic that aligned with the festival\'s artistic identity.',
    tags: ['Art Festival', 'Competition', 'Petra Christian University', 'Registration System'],
    languages: ['PHP', 'JavaScript'],
    frameworks: ['Laravel', 'Tailwind CSS'],
    category: 'Website',
    highlights: [
      'Engineered a scalable registration system handling thousands of student entries simultaneously.',
      'Developed a robust asset management module for high-resolution artwork uploads and competition tracking.',
      'Created a premium, responsive interface that prioritized both artistic expression and user efficiency.',
    ],
    images: [
      { src: '/images/bharatikafest/judges.png', orientation: 'landscape' },
      { src: '/images/bharatikafest/timeline.png', orientation: 'landscape' },
    ],
    links: {},
  },
];

export const getProjects = () => allProjects;

export const getProjectBySlug = (slug: string) =>
  allProjects.find((project) => project.slug === slug);
