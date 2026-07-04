export type ProjectImage = {
  src: string;
  orientation: 'landscape' | 'portrait' | 'square';
};

/**
 * Detail-page layout for a project. Mirrors the journey's per-year layouts so
 * project detail pages are "variatif":
 *  - gallery: screenshot bento + lightbox (default)
 *  - live:    embeds the running site in a browser frame
 *  - agent:   an interactive agent/pipeline panel (AI Trader)
 *  - index:   a skills/tools index (my-skills)
 */
export type ProjectVariant = 'gallery' | 'live' | 'agent' | 'index';

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
  variant?: ProjectVariant;
  links?: {
    github?: string;
    live?: string;
    appStore?: string;
  };
};

const allProjects: Project[] = [
  {
    slug: 'ai-trader',
    title: 'AI Trader',
    description:
      'An agentic system for crypto perpetual futures — it screens the market, scores every setup eight ways, and knows when not to trade.',
    longDescription:
      'AI Trader (repo: trade-with-me) is a multi-stage agentic system for crypto perpetual futures. It streams the Binance Futures universe into a TimescaleDB store, runs each candidate through a fleet of eight narrow analyzers, and only advances a signal once a decision gate confirms a proven edge. Claude sits in the loop across tiers (Haiku, Sonnet, Opus) to assist analysis, and a learning layer scores outcomes to tune the next pass. By design it never executes a live order — every signal is paper-traded until the system earns its way past go/no-go milestones.',
    tags: ['AI Agent', 'Automation', 'Trading', 'LLM', 'Crypto', 'Backtesting'],
    languages: ['Python'],
    frameworks: ['TimescaleDB', 'FastAPI', 'Docker', 'MCP'],
    category: 'AI / Automation',
    variant: 'agent',
    highlights: [
      'Eight narrow analyzers score each setup from every angle before a decision gate lets it through.',
      'Claude is tiered by use case (Haiku / Sonnet / Opus) to balance cost against depth of analysis.',
      'Paper-traded only — a learning layer must prove an edge before the system advances a single signal.',
    ],
    images: [],
    links: {
      github: 'https://github.com/ChrisJulLimantoro/trade-with-me',
    },
  },
  {
    slug: 'novelgit',
    title: 'NovelGit',
    description:
      'A self-hosted writing studio where manuscripts live as Markdown in GitHub — and an AI layer reads them back to you.',
    longDescription:
      'NovelGit is a published, self-hosted studio for fiction writers. Manuscripts are stored as plain Markdown in a GitHub repository, so every chapter has version control, while the app layers a full novel-management experience on top: a TipTap editor with GitHub sync, structured per-novel lore with semantic search, and an automatically generated "Global Bible" that keeps a running summary of plot, characters, and threads. Its dual-RAG chat combines lore, manuscript excerpts, and the Global Bible to answer questions in context, with pluggable embedding providers and graceful degradation when keys are missing.',
    tags: ['AI', 'RAG', 'Writing', 'Automation', 'Embeddings'],
    languages: ['TypeScript'],
    frameworks: ['Next.js', 'React', 'TipTap', 'Groq', 'Gemini'],
    category: 'AI / Writing',
    variant: 'live',
    highlights: [
      'Dual-RAG chat blends lore, manuscript excerpts, and an auto-generated Global Bible for context-aware answers.',
      'Automated chapter distillation keeps the story summary current as you write.',
      'Manuscripts stay as Markdown in GitHub — full version control, with the app layered on top.',
    ],
    images: [],
    links: {
      live: 'https://novelgit.vercel.app',
      github: 'https://github.com/ChrisJulLimantoro/novelgit',
    },
  },
  {
    slug: 'chinese-learner',
    title: 'Chinese Learner',
    description:
      'A spaced-repetition app for Mandarin where an AI writes every lesson card and grades my typed answers by meaning.',
    longDescription:
      'Chinese Learner is the spaced-repetition app I built to learn Mandarin HSK vocabulary. Instead of multiple choice, it asks for free-text answers and grades them semantically with an LLM — accepting synonyms and giving real feedback. The first time you meet a word, an LLM generates its lesson card: meanings, example sentences, character breakdowns, and mnemonics. A Leitner five-box system resurfaces words at optimal intervals across HSK 1–6, and progress syncs across devices. It ships as a full Next.js + Supabase web app, with a local-only Docker build on a separate branch.',
    tags: ['AI', 'SRS', 'Language', 'Education', 'Automation'],
    languages: ['TypeScript'],
    frameworks: ['Next.js', 'Supabase'],
    category: 'AI / Education',
    variant: 'live',
    highlights: [
      'LLM-generated lesson cards — meanings, example sentences, character breakdowns, and mnemonics.',
      'AI grades free-text answers by meaning, accepting synonyms instead of exact matches.',
      'A Leitner five-box system schedules every word along the forgetting curve across HSK 1–6.',
    ],
    images: [],
    links: {
      live: 'https://chinese-learner-blue.vercel.app',
      github: 'https://github.com/ChrisJulLimantoro/chinese-learner',
    },
  },
  {
    slug: 'my-skills',
    title: 'my-skills',
    description:
      'One source of truth for reusable AI-agent skills — edited once, synced across five different coding tools.',
    longDescription:
      'my-skills is the repository behind every skill and tool I reuse. Skills are authored once in `skills/<name>/SKILL.md` and made available globally across Claude Code, Codex, Cursor, OpenCode, and Hermes — four of the five read the same SKILL.md format natively, and a setup script wires the rest via symlinks. It ships with 16 built-in skills (deep research, code review, PR review, frontend design, knowledge-graph building, weekly reporting, and more), a scaffolder for new ones, and both per-project and machine-wide installation. It turns multi-step agent workflows into a single trigger phrase or slash command.',
    tags: ['AI Agents', 'Automation', 'Tooling', 'Developer Experience'],
    languages: ['Shell', 'Python'],
    frameworks: ['Make'],
    category: 'AI / Tooling',
    variant: 'index',
    highlights: [
      'A single source of truth — edit a skill once, it syncs to all five tools via symlinks.',
      '16 built-in skills, from deep research to PR review, plus a scaffolder for new ones.',
      'Triggers as a phrase or slash command, so complex agent workflows run without copy-paste.',
    ],
    images: [],
    links: {
      github: 'https://github.com/ChrisJulLimantoro/my-skills',
    },
  },
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
