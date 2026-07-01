'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ArrowUpRight } from 'lucide-react';
import { BrowserFrame } from '@/components/ui/browserFrame';

/** "live" variant — embeds the running site in a browser frame, click to zoom. */
export function LiveDetail({ url, title, accent = '#34e0e0' }: { url: string; title: string; accent?: string }) {
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    document.body.style.overflow = zoom ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [zoom]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoom(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="mt-16">
      <div className="mb-6 flex items-end justify-between gap-3 border-t pt-6" style={{ borderColor: 'var(--line)' }}>
        <div>
          <span className="kicker" style={{ color: accent }}>Live &amp; running</span>
          <h2 className="font-editorial mt-2 text-4xl text-[#ECECF2]">Try it right here</h2>
        </div>
        <a href={url} target="_blank" rel="noopener noreferrer" className="kicker link-wipe pb-1 hidden sm:inline" style={{ color: accent }}>
          Open in a tab ↗
        </a>
      </div>

      <BrowserFrame url={url} title={title} accent={accent} onEnlarge={() => setZoom(true)}>
        <button onClick={() => setZoom(true)} className="group relative block w-full cursor-zoom-in" aria-label={`Enlarge the live ${title} preview`}>
          <iframe src={url} title={`${title} live preview`} loading="lazy" className="pointer-events-none h-[460px] w-full bg-white sm:h-[600px]" />
          <span className="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#0b0b12]/85 px-4 py-2 font-sans text-sm font-semibold text-[#ECECF2] backdrop-blur">
              <Maximize2 size={15} /> Click to enlarge
            </span>
          </span>
        </button>
      </BrowserFrame>
      <p className="kicker mt-3" style={{ color: 'var(--hush)' }}>
        Live embed of {url.replace('https://', '')} — fully interactive
      </p>

      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
            style={{ background: 'rgba(5,5,10,0.85)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
          >
            <motion.div
              className="w-full max-w-6xl"
              initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <BrowserFrame url={url} title={title} accent={accent}>
                <iframe src={url} title={`${title} live (enlarged)`} className="h-[78vh] w-full bg-white" />
              </BrowserFrame>
              <div className="mt-3 flex items-center justify-between">
                <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-sans text-sm font-semibold" style={{ color: accent }}>
                  Open in a new tab <ArrowUpRight size={15} />
                </a>
                <button onClick={() => setZoom(false)} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-sm text-[#ECECF2] transition-colors hover:border-[#ff3d81]" style={{ borderColor: 'var(--line)' }}>
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
