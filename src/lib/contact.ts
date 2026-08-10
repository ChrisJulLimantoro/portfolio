export const CONTACT = {
  name: 'Christopher Julius Limantoro',
  email: 'christopherlimantoro@gmail.com',
  github: 'https://github.com/ChrisJulLimantoro',
  linkedin: 'https://linkedin.com/in/christopher-julius-limantoro',
  resume: '/resume.pdf',
} as const;

export const GMAIL_COMPOSE_URL =
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT.email)}`;
