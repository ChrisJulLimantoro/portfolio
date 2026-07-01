import { Project, ProjectVariant } from '@/lib/data';

/** Per-variant accent so each project (and its detail page) reads distinctly. */
export const ACCENT_HEX = {
  fuchsia: '#ff3d81',
  gold: '#ffb627',
  cyan: '#34e0e0',
  lime: '#c6f24e',
} as const;

export type AccentKey = keyof typeof ACCENT_HEX;

const VARIANT_ACCENT: Record<ProjectVariant, AccentKey> = {
  agent: 'fuchsia',
  live: 'cyan',
  index: 'lime',
  gallery: 'gold',
};

const VARIANT_LABEL: Record<ProjectVariant, string> = {
  agent: 'Agent',
  live: 'Live',
  index: 'Toolkit',
  gallery: 'Case study',
};

export const accentKeyFor = (p: Project): AccentKey =>
  VARIANT_ACCENT[p.variant ?? 'gallery'];

export const accentFor = (p: Project): string => ACCENT_HEX[accentKeyFor(p)];

export const variantLabel = (p: Project): string =>
  VARIANT_LABEL[p.variant ?? 'gallery'];
