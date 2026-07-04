'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, RotateCcw, Check, Sparkles } from 'lucide-react';

/**
 * Interactive "play" section: a tiny spaced-repetition lesson, the same loop
 * powering my personal project Chinese Learner. Vocab is themed around what I
 * build — agents, automation, AI — so the toy doubles as the pitch.
 */

type Card = {
  hanzi: string;
  pinyin: string;
  meaning: string;
  mnemonic: string;
  hsk: number;
};

const DECK: Card[] = [
  {
    hanzi: '机器人',
    pinyin: 'jīqìrén',
    meaning: 'robot / bot',
    mnemonic: '机器 (machine) + 人 (person) = a machine-person. My kind of people.',
    hsk: 4,
  },
  {
    hanzi: '自动',
    pinyin: 'zìdòng',
    meaning: 'automatic',
    mnemonic: '自 (self) + 动 (move) — it moves by itself. Automation in two strokes.',
    hsk: 3,
  },
  {
    hanzi: '人工智能',
    pinyin: 'réngōng zhìnéng',
    meaning: 'artificial intelligence',
    mnemonic: '人工 (man-made) + 智能 (intelligence). The thing I point at problems.',
    hsk: 6,
  },
  {
    hanzi: '学',
    pinyin: 'xué',
    meaning: 'to learn / study',
    mnemonic: 'A child (子) under a roof, soaking up knowledge.',
    hsk: 1,
  },
  {
    hanzi: '龙',
    pinyin: 'lóng',
    meaning: 'dragon',
    mnemonic: 'The auspicious beast — also slang for someone seriously good.',
    hsk: 5,
  },
  {
    hanzi: '朋友',
    pinyin: 'péngyou',
    meaning: 'friend',
    mnemonic: 'Two 月 standing side by side. Better together.',
    hsk: 1,
  },
];

export function ChineseLearner() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [mastered, setMastered] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);

  const card = DECK[index];

  const next = () => {
    setRevealed(false);
    setIndex((i) => (i + 1) % DECK.length);
  };
  const gotIt = () => {
    const s = streak + 1;
    setStreak(s);
    setBest((b) => Math.max(b, s));
    setMastered((m) => m + 1);
    next();
  };
  const again = () => {
    setStreak(0);
    next();
  };

  return (
    <section id="chinese-learner" className="relative scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section head */}
        <div
          className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b pb-5"
          style={{ borderColor: 'var(--line)' }}
        >
          <div>
            <span className="kicker" style={{ color: 'var(--lime)' }}>
              Personal Lab — now playing<span className="caret" aria-hidden />
            </span>
            <h2 className="font-editorial mt-3 text-5xl text-[#ECECF2] sm:text-7xl">
              学 — I&apos;m learning Chinese
            </h2>
          </div>
          <span className="font-display text-2xl" style={{ color: 'var(--hush)' }}>
            your turn — try a card ↓
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Pitch */}
          <div>
            <p className="text-lg leading-relaxed text-[#ECECF2]">
              I build <strong className="text-[#ff3d81]">AI agents &amp; automations</strong> for
              a living — so I turned one on myself.{' '}
              <strong className="text-[#ffb627]">Chinese Learner</strong> is my
              personal project: a spaced-repetition engine where an AI writes the
              lesson cards, grades my typed answers by meaning (not spelling), and
              schedules every word along the forgetting curve.
            </p>
            <ul className="mt-6 space-y-2">
              {[
                'AI-generated lessons + mnemonics for every character',
                'AI grading that accepts synonyms, not just exact matches',
                'SRS scheduling: 8h → 1d → 3d → 7d → 21d across HSK 1–6',
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-[#a9a9b6]">
                  <Sparkles size={16} className="mt-0.5 shrink-0 text-[#34e0e0]" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://chinese-learner-blue.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#ff3d81] px-6 py-3 font-sans text-sm font-semibold text-[#0b0b12] transition-colors hover:bg-[#ffb627] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b12] focus-visible:ring-[#ffb627]"
              >
                Try it live
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://github.com/ChrisJulLimantoro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-sans text-sm font-semibold text-[#ECECF2] transition-colors hover:border-[#34e0e0]"
                style={{ borderColor: 'var(--line)' }}
              >
                <Github size={18} /> Source
              </a>
            </div>
          </div>

          {/* Playable card */}
          <div className="flex flex-col items-center gap-6">
            <div
              className="relative w-full max-w-md cursor-pointer select-none [perspective:1400px]"
              onClick={() => !revealed && setRevealed(true)}
              role="button"
              tabIndex={0}
              aria-label="Flashcard, click to reveal the answer"
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !revealed) {
                  e.preventDefault();
                  setRevealed(true);
                }
              }}
            >
              <motion.div
                className="relative h-80 w-full [transform-style:preserve-3d]"
                animate={{ rotateY: revealed ? 180 : 0 }}
                transition={reduce ? { duration: 0 } : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border [backface-visibility:hidden]"
                  style={{
                    borderColor: 'var(--line)',
                    background:
                      'radial-gradient(120% 120% at 30% 10%, rgba(255,61,129,0.18), transparent 60%), var(--ink-2)',
                  }}
                >
                  <span className="kicker absolute left-5 top-5" style={{ color: 'var(--gold)' }}>
                    HSK {card.hsk}
                  </span>
                  <span className="font-editorial text-[7rem] leading-none text-[#ECECF2]">
                    {card.hanzi}
                  </span>
                  <span className="kicker mt-6" style={{ color: 'var(--hush)' }}>
                    click to reveal
                  </span>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 flex flex-col justify-center gap-3 rounded-2xl border p-7 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  style={{
                    borderColor: 'var(--line)',
                    background:
                      'radial-gradient(120% 120% at 70% 10%, rgba(52,224,224,0.16), transparent 60%), var(--ink-2)',
                  }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-editorial text-5xl text-[#ff3d81]">{card.hanzi}</span>
                    <span className="font-display text-3xl text-[#34e0e0]">{card.pinyin}</span>
                  </div>
                  <p className="text-xl font-semibold text-[#ECECF2]">{card.meaning}</p>
                  <p className="text-sm leading-relaxed text-[#a9a9b6]">{card.mnemonic}</p>
                </div>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex w-full max-w-md items-center justify-between gap-3">
              <AnimatePresence mode="wait" initial={false}>
                {!revealed ? (
                  <motion.button
                    key="reveal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setRevealed(true)}
                    className="w-full rounded-full border py-3 font-sans text-sm font-semibold text-[#ECECF2] transition-colors hover:border-[#34e0e0]"
                    style={{ borderColor: 'var(--line)' }}
                  >
                    Reveal answer
                  </motion.button>
                ) : (
                  <motion.div
                    key="grade"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex w-full gap-3"
                  >
                    <button
                      onClick={again}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border py-3 font-sans text-sm font-semibold text-[#a9a9b6] transition-colors hover:border-[#ff3d81] hover:text-[#ff3d81]"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      <RotateCcw size={16} /> Again
                    </button>
                    <button
                      onClick={gotIt}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#34e0e0] py-3 font-sans text-sm font-semibold text-[#0b0b12] transition-colors hover:bg-[#c6f24e]"
                    >
                      <Check size={16} /> Got it
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Live stats — mimics the real SRS dashboard */}
            <div className="flex w-full max-w-md justify-between rounded-xl border px-6 py-4" style={{ borderColor: 'var(--line)' }}>
              {[
                { v: mastered, l: 'mastered' },
                { v: streak, l: 'streak' },
                { v: best, l: 'best streak' },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-editorial text-3xl text-[#ffb627]">{s.v}</div>
                  <div className="kicker mt-1" style={{ color: 'var(--hush)' }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
