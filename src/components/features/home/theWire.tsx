'use client';

import { useEffect, useState } from 'react';
import { getCurrentTimeUTC7 } from '@/lib/utils/client-rate-limiter';

// The issue "went to press" here — drives the open-days counter.
const PUBLISHED = new Date('2026-06-01T00:00:00+07:00');

// Live-flavored dispatches, then the tech stack — the wire scrolls both.
const DISPATCHES = [
  'NOW LEARNING · 汉字 HSK 3',
  'AI TRADER · paper-traded · proving edge',
  'LAST SHIPPED · NovelGit',
  'DESK · Jakarta, ID',
  'AI Agents', 'Automation', 'RAG', 'Claude', 'MCP',
  'Python', 'TypeScript', 'Next.js', 'Supabase', 'Vector DBs',
];

/**
 * "The Wire" — a live newsroom band under the masthead. A pinned LIVE tag with
 * the real Jakarta clock and a running "issue open" counter, then a scrolling
 * feed of dispatches. It's the heartbeat that makes the issue feel published.
 */
export function TheWire() {
  const [clock, setClock] = useState('');
  const [openDays, setOpenDays] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      setClock(getCurrentTimeUTC7());
      setOpenDays(Math.max(0, Math.floor((Date.now() - PUBLISHED.getTime()) / 86_400_000)));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      aria-label="Live dispatches"
      className="grain relative flex items-stretch overflow-hidden border-y"
      style={{ borderColor: 'var(--line)', background: 'var(--ink-2)' }}
    >
      {/* Pinned LIVE readout */}
      <div
        className="z-10 flex shrink-0 items-center gap-3 border-r px-5 py-3"
        style={{ borderColor: 'var(--line)', background: 'var(--ink-2)' }}
      >
        <span className="flex items-center gap-2">
          <span className="live-dot h-2 w-2 rounded-full" style={{ background: 'var(--fuchsia)' }} />
          <span className="kicker" style={{ color: 'var(--fuchsia)' }}>Live</span>
        </span>
        <span className="kicker tabular-nums" style={{ color: '#ECECF2' }}>
          {clock || '—'}
        </span>
        <span className="kicker hidden sm:inline" style={{ color: 'var(--hush)' }}>
          Issue open · {openDays ?? '—'}d
        </span>
      </div>

      {/* Scrolling dispatch feed */}
      <div className="marquee min-w-0 flex-1 self-center py-3">
        <div className="marquee-track">
          {[...DISPATCHES, ...DISPATCHES].map((d, i) => (
            <span
              key={i}
              className="kicker mx-6 inline-flex items-center gap-6"
              style={{ color: i % 3 === 0 ? 'var(--cyan)' : 'var(--hush)' }}
            >
              {d}
              <span style={{ color: 'var(--ink-3)' }}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
