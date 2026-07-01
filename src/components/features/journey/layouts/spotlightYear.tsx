'use client';
import { JourneyYear } from '@/lib/data';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import Link from 'next/link';

export function SpotlightYear({ data }: { data: JourneyYear }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div ref={containerRef} className="relative py-28 text-center">
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0 opacity-20">
        <Image src={data.photos[0].src} alt="" fill className="scale-110 object-cover blur-3xl" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-4xl px-2">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="kicker inline-block rounded-full border px-4 py-1.5"
          style={{ borderColor: 'var(--line)', color: 'var(--cyan)' }}
        >
          {data.year} — spotlight
        </motion.span>

        <motion.h3
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="font-editorial mt-6 text-5xl leading-[0.95] text-[#ECECF2] md:text-8xl"
        >
          {data.title}
        </motion.h3>

        <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-[#a9a9b6] md:text-2xl">
          {data.description}
        </p>

        <div className="mt-14 grid gap-6 text-left md:grid-cols-2">
          {data.milestones.map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="group rounded-2xl border p-8 transition-colors"
              style={{ borderColor: 'var(--line)', background: 'var(--ink-2)' }}
            >
              <h4 className="font-editorial text-2xl text-[#ECECF2] transition-colors group-hover:text-[color:var(--cyan)]" style={{ ['--cyan' as string]: 'var(--cyan)' }}>
                {m.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#a9a9b6]">{m.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link href={`/my-journey/${data.slug}`} className="rounded-full px-6 py-3 font-sans text-sm font-semibold text-[#0b0b12] transition-transform hover:-translate-y-0.5" style={{ background: 'var(--cyan)' }}>
            Read the full story
          </Link>
          {data.achievements[0]?.link && (
            <a href={data.achievements[0].link} className="rounded-full border px-6 py-3 font-sans text-sm font-semibold text-[#ECECF2] transition-colors hover:border-[color:var(--cyan)]" style={{ borderColor: 'var(--line)' }}>
              {data.achievements[0].linkText || 'View achievement'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
