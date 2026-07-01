'use client';

import { useEffect, useState } from 'react';

/** Sticky vertical "spine" — scrubs through the years, highlights the active one. */
export function YearScrubber({ years }: { years: string[] }) {
  const [active, setActive] = useState(years[0]);

  useEffect(() => {
    const sections = years
      .map((y) => document.getElementById(`year-${y}`))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id.replace('year-', ''));
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.3, 0.6] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [years]);

  return (
    <nav
      aria-label="Years"
      className="fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-4 xl:flex"
    >
      {years.map((y) => {
        const on = active === y;
        return (
          <a
            key={y}
            href={`#year-${y}`}
            className="group flex items-center gap-3 font-sans text-sm transition-colors"
            style={{ color: on ? 'var(--cyan)' : 'var(--hush)' }}
          >
            <span
              className="h-px transition-all duration-300"
              style={{ width: on ? 28 : 14, background: on ? 'var(--cyan)' : 'var(--ink-3)' }}
            />
            <span className="font-editorial" style={{ opacity: on ? 1 : 0.6 }}>{y}</span>
          </a>
        );
      })}
    </nav>
  );
}
