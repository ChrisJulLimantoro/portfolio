'use client';

import { motion } from 'framer-motion';
import { Terminal, GitBranch } from 'lucide-react';

const SKILLS = [
  'codereview', 'command-development', 'creative-ui', 'deep-research',
  'find-skills', 'frontend-design', 'graphify', 'hook-development',
  'plugin-settings', 'plugin-structure', 'pr-comment', 'pr-feedback',
  'pr-review', 'skill-creator', 'skill-development', 'weekly-report',
];

const TOOLS = ['Claude Code', 'Codex', 'Cursor', 'OpenCode', 'Hermes'];

/** "index" variant — the my-skills toolkit, as a terminal-flavored index. */
export function IndexDetail({ accent = '#c6f24e' }: { accent?: string }) {
  return (
    <section className="mt-16">
      <div className="mb-6 border-t pt-6" style={{ borderColor: 'var(--line)' }}>
        <span className="kicker" style={{ color: accent }}>Inside the repo</span>
        <h2 className="font-editorial mt-2 text-4xl text-[#ECECF2]">The toolkit</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Skills index, terminal-flavored */}
        <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--line)', background: 'var(--ink-2)' }}>
          <div className="flex items-center gap-2 border-b px-4 py-2.5" style={{ borderColor: 'var(--line)' }}>
            <Terminal size={15} style={{ color: accent }} />
            <span className="font-sans text-xs" style={{ color: 'var(--hush)' }}>~/my-skills $ skills --list</span>
          </div>
          <ol className="grid grid-cols-1 gap-x-6 p-5 sm:grid-cols-2">
            {SKILLS.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (i % 7) * 0.04 }}
                className="flex items-baseline gap-3 border-b py-2.5 font-sans text-sm"
                style={{ borderColor: 'color-mix(in srgb, var(--line) 60%, transparent)' }}
              >
                <span className="text-xs tabular-nums" style={{ color: accent }}>{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[#ECECF2]">{s}</span>
                <span className="ml-auto font-sans text-[10px] uppercase tracking-wider" style={{ color: 'var(--hush)' }}>SKILL.md</span>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Sync targets */}
        <div className="rounded-2xl border p-6" style={{ borderColor: 'var(--line)', background: `radial-gradient(120% 120% at 30% 10%, ${accent}1f, transparent 60%), var(--ink-2)` }}>
          <div className="flex items-center gap-2">
            <GitBranch size={16} style={{ color: accent }} />
            <span className="kicker" style={{ color: 'var(--hush)' }}>Synced to · one source</span>
          </div>
          <p className="font-editorial mt-3 text-2xl text-[#ECECF2]">Edit once, everywhere.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {TOOLS.map((t) => (
              <span key={t} className="rounded-full border px-3 py-1.5 font-sans text-sm text-[#ECECF2]" style={{ borderColor: 'var(--line)' }}>
                {t}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[#a9a9b6]">
            Each skill is authored once in <code className="text-[#ECECF2]">SKILL.md</code> and wired into every tool via symlinks — four read the format natively.
          </p>
        </div>
      </div>
    </section>
  );
}
