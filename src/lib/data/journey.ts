export type JourneyYear = {
  year: string;
  title: string;
  description: string;
  layout: 'zigzag' | 'gallery' | 'spotlight';
  photos: { src: string; caption?: string; rotate?: string }[];
  milestones: { title: string; description: string }[];
  achievements: { title: string; link?: string; linkText?: string }[];
};

const journeyData: JourneyYear[] = [
  {
    year: '2025',
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
  },
  {
    year: '2024',
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
  },
  {
    year: '2023',
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
  },
  {
    year: '2022',
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
  },
];


export const getJourneyData = () => journeyData;
