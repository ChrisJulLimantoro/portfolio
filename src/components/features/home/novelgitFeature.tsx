'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, Maximize2, X, Sparkles } from 'lucide-react';
import { getNovelgit } from '@/lib/data';
import { BrowserFrame } from '@/components/ui/browserFrame';

export function NovelgitFeature() {
  const n = getNovelgit();
  const [zoom, setZoom] = useState(false);

  // Lock scroll while the zoom modal is open.
  useEffect(() => {
    document.body.style.overflow = zoom ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [zoom]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoom(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="novelgit" className="relative scroll-mt-24 px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Masthead — styled like a feature article */}
        <div
          className="mb-6 flex flex-wrap items-center justify-between gap-3 border-y py-2"
          style={{ borderColor: 'var(--line)' }}
        >
          <span className="kicker" style={{ color: 'var(--gold)' }}>
            The Feature — published &amp; live
          </span>
          <span className="kicker" style={{ color: 'var(--hush)' }}>
            By Julius · AI Automation
          </span>
        </div>

        <h2 className="font-editorial max-w-4xl text-5xl text-[#ECECF2] sm:text-7xl">
          NovelGit turns a folder of chapters into a co-writer.
        </h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:items-start">
          {/* Article column */}
          <article className="max-w-prose">
            <p className="text-lg leading-relaxed text-[#ECECF2]">
              <span className="font-editorial float-left mr-3 text-6xl leading-[0.8] text-[#ff3d81]">
                {n.intro.charAt(0)}
              </span>
              {n.intro.slice(1)}
            </p>

            <blockquote
              className="my-8 border-l-2 pl-5 font-display text-2xl leading-snug text-[#ffb627]"
              style={{ borderColor: 'var(--gold)' }}
            >
              “{n.pullQuote}”
            </blockquote>

            <ul className="space-y-2">
              {n.capabilities.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 text-sm text-[#a9a9b6]"
                >
                  <Sparkles size={15} className="mt-0.5 shrink-0 text-[#34e0e0]" />
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {n.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border px-3 py-1 font-sans text-xs text-[#a9a9b6]"
                  style={{ borderColor: 'var(--line)' }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={n.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#ff3d81] px-6 py-3 font-sans text-sm font-semibold text-[#0b0b12] transition-colors hover:bg-[#ffb627] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b12] focus-visible:ring-[#ffb627]"
              >
                Open live site
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href={n.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-sans text-sm font-semibold text-[#ECECF2] transition-colors hover:border-[#34e0e0]"
                style={{ borderColor: 'var(--line)' }}
              >
                <Github size={18} /> Source
              </a>
            </div>
          </article>

          {/* Live preview column */}
          <div>
            <BrowserFrame
              url={n.live}
              title="NovelGit — live"
              onEnlarge={() => setZoom(true)}
            >
              <button
                onClick={() => setZoom(true)}
                className="group relative block w-full cursor-zoom-in"
                aria-label="Enlarge the live NovelGit preview"
              >
                <iframe
                  src={n.live}
                  title="NovelGit live preview"
                  loading="lazy"
                  className="pointer-events-none h-[420px] w-full bg-white sm:h-[520px]"
                />
                <span className="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0b0b12]/85 px-4 py-2 font-sans text-sm font-semibold text-[#ECECF2] backdrop-blur">
                    <Maximize2 size={15} /> Click to enlarge
                  </span>
                </span>
              </button>
            </BrowserFrame>
            <p className="kicker mt-3" style={{ color: 'var(--hush)' }}>
              Live embed of {n.live.replace('https://', '')} — click to interact
            </p>
          </div>
        </div>
      </div>

      {/* Zoom modal */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
            style={{ background: 'rgba(5,5,10,0.85)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
          >
            <motion.div
              className="w-full max-w-6xl"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <BrowserFrame url={getNovelgit().live} title="NovelGit — live">
                <iframe
                  src={getNovelgit().live}
                  title="NovelGit live (enlarged)"
                  className="h-[78vh] w-full bg-white"
                />
              </BrowserFrame>
              <div className="mt-3 flex items-center justify-between">
                <a
                  href={getNovelgit().live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#34e0e0]"
                >
                  Open in a new tab <ArrowUpRight size={15} />
                </a>
                <button
                  onClick={() => setZoom(false)}
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-sm text-[#ECECF2] transition-colors hover:border-[#ff3d81]"
                  style={{ borderColor: 'var(--line)' }}
                >
                  <X size={15} /> Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
