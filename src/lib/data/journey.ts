export type StoryBlock = 
  | { type: 'text'; content: string; align?: 'left' | 'center' }
  | { type: 'image-grid'; images: { src: string; caption?: string }[] }
  | { type: 'stats'; items: { label: string; value: string }[] }
  | { type: 'quote'; text: string; author?: string };

export type JourneyYear = {
  year: string;
  slug: string;
  title: string;
  description: string;
  layout: 'zigzag' | 'gallery' | 'spotlight';
  photos: { src: string; caption?: string; rotate?: string }[];
  milestones: { title: string; description: string }[];
  achievements: { title: string; link?: string; linkText?: string }[];
  story: StoryBlock[];
};

const journeyData: JourneyYear[] = [
  {
    year: '2025',
    slug: '2025-breakthrough',
    title: 'The Breakthrough Year',
    description:
      'The culmination of years of effort — academic excellence, elite program selection, and the start of my professional career.',
    layout: 'gallery',
    photos: [
      { src: '/images/IMG_0538.jpeg', caption: 'Graduation & Career Start', rotate: '0deg' },
    ],
    milestones: [
      {
        title: 'Top Graduate',
        description:
          'Graduated as one of the top students in my class and completed my thesis with outstanding results.',
      },
      {
        title: 'Apple R&D Program (Second Year)',
        description:
          'Selected as one of only 8 teams for Apple’s advanced R&D (RnL) second-year program.',
      },
      {
        title: 'First Official Job',
        description:
          'Joined GDP Labs as a Software Engineer, marking the true start of my professional career.',
      },
    ],
    achievements: [
      { title: 'Graduated with Honors' },
      { title: 'Selected for Apple Advanced Program' },
      { title: 'Joined GDP Labs' },
    ],
    story: [
      {
        type: 'text',
        content: `2025 was the year where everything clicked. After four years of grinding through university assignments, hackathons, and late-night coding sessions, I finally crossed the finish line. But it wasn't just about graduating; it was about **how** I finished.`,
      },
      {
        type: 'text',
        content: `My thesis on **Logamas**, a multi-tenant gold merchant management system, pushed me to my limits, but it paid off. But even before graduation, opportunities were already knocking. While I was deep in thesis preparation, I received an offer to join **Apple's RnL program** — a direct continuation of my work at the Academy with **RandL** context.`,
      },
      {
        type: 'stats',
        items: [
          { label: 'GPA', value: '3.98' },
          { label: 'Thesis Score', value: 'A' },
          { label: 'Offers', value: '3' },
        ],
      },
      {
        type: 'text',
        content: `Graduating as one of the top students, I faced a pivotal choice: pursue my next degree immediately or start my professional career. I decided to garner my experience first.`,
      },
      {
        type: 'quote',
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
      },
      {
        type: 'text',
        content: `To maximize this opportunity, I accepted an offer at **GDP Labs** to hone my engineering craft at scale, while strictly dedicating my "second shift" to **Apple's RnL program**, a highly exclusive research initiative selected from the top Academy graduates.`,
      },
    ],
  },
  {
    year: '2024',
    slug: '2024-professional-discovery',
    title: 'The Professional Discovery',
    description:
      'A pivotal year of professional exposure, self-discovery, and real-world industry experience.',
    layout: 'zigzag',
    photos: [
      { src: '/images/FTR00997.jpeg', caption: 'Apple Developer Academy', rotate: '0deg' },
    ],
    milestones: [
      {
        title: 'Apple Developer Academy Intern',
        description:
          'Completed a full-year internship learning professional teamwork, leadership, public speaking, and product development.',
      },
      {
        title: 'Career Direction Clarity',
        description:
          'Discovered the kind of engineer and career path I want to pursue.',
      },
      {
        title: 'First Freelance Work',
        description:
          'Started working as a freelancer, delivering real solutions to real clients.',
      },
    ],
    achievements: [
      { title: 'Completed Apple Developer Academy Program' },
      { title: 'Began Freelance Career' },
    ],
    story: [],
  },
  {
    year: '2023',
    slug: '2023-leadership-awakening',
    title: 'The Leadership Awakening',
    description:
      'Curiosity pushed me beyond being a team member into leadership roles. This year shaped my ability to lead, plan, and execute.',
    layout: 'gallery',
    photos: [
      { src: '/images/IMG_3982.jpg', caption: 'Leading & Learning', rotate: '1deg' },
    ],
    milestones: [
      {
        title: 'Leadership Roles',
        description:
          'Served as Vice Team Leader in BEM and Captain of Welcome Grateful Generation.',
      },
      {
        title: 'People & Process Management',
        description:
          'Learned how to groom talent, manage expectations, and align execution with planning.',
      },
      {
        title: 'Exploration Beyond Web',
        description:
          'Started building personal mini-projects, exploring AI and emerging technologies.',
      },
    ],
    achievements: [
      { title: 'First Experience Leading Teams' },
      { title: 'Personal Project Exploration' },
    ],
    story: [],
  },
  {
    year: '2022',
    slug: '2022-foundation-year',
    title: 'The Foundation Year',
    description:
      'The year I became serious about my university life and personal growth. Real learning began outside the classroom through hands-on organizational experience.',
    layout: 'spotlight',
    photos: [
      { src: '/images/IMG_3985.jpg', caption: 'Early University Days', rotate: '-2deg' },
    ],
    milestones: [
      {
        title: 'Organizational Involvement',
        description:
          'Actively involved in Welcome Grateful Generation and BEM as part of the IT department.',
      },
      {
        title: 'Learning Beyond Classes',
        description:
          'Discovered that real-world practice and teamwork taught me more than lectures alone.',
      },
    ],
    achievements: [
      { title: 'Built Strong Practical Foundations' },
    ],
    story: [],
  },
];


export const getJourneyData = () => journeyData;

export const getJourneyBySlug = (slug: string) =>
  journeyData.find((year) => year.slug === slug);
