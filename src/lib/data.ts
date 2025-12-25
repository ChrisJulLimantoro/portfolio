// This file stores your application's static data.
// In a real-world app, this data would come from a CMS or database.

// --- PROJECTS ---

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
  // {
  //   slug: 'anony-tweet',
  //   title: 'AnonyTweet',
  //   description:
  //     'A Twitter look-alike social media application built with Flutter, focusing on privacy and seamless user interaction.',
  //   longDescription:
  //     'AnonyTweet is a cross-platform social media application that replicates the core functionality of Twitter while emphasizing user privacy. Developed using Flutter, the app provides a smooth, native-like experience on both iOS and Android. Features include real-time micro-blogging, user interactions, and a sleek dark-themed UI. This project served as a deep dive into Flutter widgets, state management, and building performant mobile interfaces.',
  //   tags: ['Mobile Development', 'Social Media', 'Twitter-Clone'],
  //   languages: ['Dart'],
  //   frameworks: ['Flutter', 'Firebase'],
  //   category: 'Application',
  //   highlights: [
  //     'Cross-platform mobile application with a smooth and responsive Twitter-like interface.',
  //     'Implements real-time updates and seamless user interactions using Flutter.',
  //     'Focuses on privacy-centric social networking features in a modern mobile environment.',
  //   ],
  //   images: [
  //     { src: '', orientation: 'portrait' },
  //     { src: '', orientation: 'portrait' },
  //   ],
  //   links: {
  //     github: 'https://github.com/ChrisJulLimantoro/anony-tweet',
  //   },
  // },
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

// --- BLOG ---

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  aiSummary: string;
  content: string; // Your "markdown" content
};

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable AI Systems: Lessons from Production',
    excerpt:
      'A deep dive into architectural patterns and best practices for deploying AI models at scale in production environments.',
    date: 'October 15, 2025',
    readTime: '8 min read',
    tags: ['AI', 'Architecture', 'Production'],
    aiSummary:
      'This post explores proven strategies for scaling AI systems, including model serving optimization, caching strategies, and distributed inference patterns.',
    content: `
Deploying AI models in production requires careful consideration of performance, scalability, and reliability. In this post, I'll share lessons learned from building and maintaining AI systems that serve millions of requests daily.

## The Challenge of Scale

When an AI model transitions from research to production, it faces entirely new challenges. Response time, throughput, and resource utilization become critical metrics that directly impact user experience and operational costs.

## Key Architectural Patterns

1. Model Serving Layer: Separate your model inference from application logic using a dedicated serving layer like TensorFlow Serving or TorchServe.
2. Intelligent Caching: Implement multi-tier caching strategies to avoid redundant model inference for similar inputs.
3. Async Processing: Use message queues for non-real-time predictions to improve system responsiveness.
4. Load Balancing: Distribute requests across multiple model instances with intelligent routing based on model type and resource availability.

## Monitoring and Observability

Effective monitoring is crucial for AI systems. Track not just traditional metrics like latency and throughput, but also model-specific metrics like prediction confidence, drift detection, and input distribution changes.

## Conclusion

Building production AI systems is as much about software engineering as it is about machine learning. A solid architecture that prioritizes scalability, reliability, and observability will set your AI projects up for long-term success.
    `,
  },
  {
    id: '2',
    title: 'Microservices Architecture: When to Use It and When to Avoid It',
    excerpt:
      'An honest look at microservices architecture, exploring both its benefits and drawbacks based on real-world experience.',
    date: 'September 28, 2025',
    readTime: '10 min read',
    tags: ['Microservices', 'Architecture', 'DevOps'],
    aiSummary:
      'A balanced perspective on microservices adoption, covering organizational readiness, technical complexity, and decision-making frameworks.',
    content: `
Microservices have become incredibly popular, but they're not a silver bullet. Let's explore when this architecture makes sense and when a monolith might be the better choice.

## What Are Microservices?

Microservices architecture structures an application as a collection of loosely coupled, independently deployable services. Each service is focused on a specific business capability.

## When Microservices Make Sense

1. Large Teams: When you have multiple teams working on different parts of the system
2. Different Scaling Needs: When different components have vastly different resource requirements
3. Technology Diversity: When different services benefit from different technology stacks
4. Independent Deployment: When you need to deploy features independently without affecting the entire system

## When to Stick with a Monolith

1. Small Teams: Teams under 10 people often struggle with the overhead of microservices
2. Early Stage Products: When you're still finding product-market fit, the flexibility of a monolith is valuable
3. Limited DevOps Maturity: Microservices require sophisticated deployment and monitoring infrastructure
4. Tight Coupling: When your domain has naturally high coupling, forcing microservices boundaries creates more problems than it solves

## The Middle Ground

Consider a modular monolith as a stepping stone. Build your application with clear module boundaries that could later be extracted into services if needed.

## Conclusion

Choose your architecture based on your organization's needs, team structure, and technical requirements—not based on trends or what sounds impressive.
    `,
  },
  {
    id: '3',
    title: 'The Future of Full-Stack Development: AI-Assisted Coding',
    excerpt:
      'How AI coding assistants are transforming the development workflow and what it means for software engineers.',
    date: 'November 1, 2025',
    readTime: '6 min read',
    tags: ['AI', 'Development', 'Future Tech'],
    aiSummary:
      'Explores the impact of AI coding assistants on developer productivity, code quality, and the evolving role of software engineers.',
    content: `
AI coding assistants like GitHub Copilot, ChatGPT, and specialized tools are fundamentally changing how we write software. Let's explore what this means for developers.

## The Current State

Today's AI assistants can generate boilerplate code, suggest completions, and even write entire functions based on natural language descriptions. They're particularly effective at:

- Writing repetitive code patterns
- Generating test cases
- Translating between programming languages
- Explaining complex code

## Impact on Productivity

Studies show developers using AI assistants complete tasks 55% faster. However, the real value isn't just speed—it's the cognitive load reduction for routine tasks, allowing developers to focus on architectural decisions and complex problem-solving.

## Code Quality Considerations

AI-generated code requires careful review. While it's often syntactically correct, it may not follow best practices, might have security vulnerabilities, or may not align with your project's specific requirements.

## The Evolving Role of Developers

Rather than replacing developers, AI assistants are elevating the role. Future developers will need to excel at:

1. System Design: Understanding how components fit together
2. Prompt Engineering: Effectively communicating with AI tools
3. Code Review: Critically evaluating AI-generated solutions
4. Domain Expertise: Applying business knowledge that AI lacks

## Conclusion

AI coding assistants are powerful tools that enhance developer capabilities. The developers who thrive will be those who effectively combine AI assistance with deep technical knowledge and critical thinking.
    `,
  },
];

export const getBlogPosts = () => blogPosts;

export const getBlogPostById = (id: string) =>
  blogPosts.find((post) => post.id === id);
