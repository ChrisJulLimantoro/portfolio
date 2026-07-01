'use client';

import { usePathname } from 'next/navigation';

/**
 * Inter-page interaction (CSS-driven, so content is never gated on JS):
 * a thin accent bar sweeps across the top — tinted to the destination area,
 * each page its own "room" — and the new content fades + rises in. The template
 * remounts on every navigation, so the CSS animations replay. Even if an
 * animation never runs, the default state is fully visible. Reduced-motion safe.
 */
const AREA_ACCENT: Record<string, string> = {
  '': '#ff3d81',
  project: '#ff3d81',
  'my-journey': '#34e0e0',
  blog: '#ffb627',
  chat: '#c6f24e',
};

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const seg = pathname.split('/')[1] ?? '';
  const accent = AREA_ACCENT[seg] ?? '#ff3d81';

  return (
    <>
      <div aria-hidden className="page-bar" style={{ background: accent }} />
      <div className="page-enter">{children}</div>
    </>
  );
}
