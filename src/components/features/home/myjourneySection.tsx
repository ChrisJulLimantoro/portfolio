'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getJourneyData } from '@/lib/data';

export function MyJourneySection() {
  const years = getJourneyData();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section head */}
        <div
          className="mb-12 flex flex-wrap items-end justify-between gap-4 border-b pb-5"
          style={{ borderColor: 'var(--line)' }}
        >
          <div>
            <span className="kicker" style={{ color: 'var(--cyan)' }}>
              The Timeline
            </span>
            <h2 className="font-editorial mt-3 text-5xl text-[#ECECF2] sm:text-7xl">
              How I got here
            </h2>
          </div>
          <Link href="/my-journey" className="kicker link-wipe pb-1 text-[#ECECF2]">
            Full story →
          </Link>
        </div>

        {/* Numbered spine — years are genuinely sequential */}
        <ol>
          {years.map((year, i) => (
            <motion.li
              key={year.slug}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08 }}
            >
              <Link
                href={`/my-journey/${year.slug}`}
                className="group grid grid-cols-[auto_1fr] items-start gap-x-5 border-t py-7 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34e0e0] sm:grid-cols-[auto_1fr_auto] sm:gap-x-10"
                style={{ borderColor: 'var(--line)' }}
              >
                {/* Year, oversized */}
                <span className="font-editorial text-3xl leading-none text-[#34e0e0] transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-5xl">
                  {year.year}
                </span>

                {/* Content */}
                <div className="min-w-0">
                  <h3 className="font-editorial text-2xl text-[#ECECF2] transition-colors duration-300 group-hover:text-[#ffb627] sm:text-4xl">
                    {year.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#a9a9b6] sm:text-base">
                    {year.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                    {year.milestones.slice(0, 3).map((m) => (
                      <span
                        key={m.title}
                        className="kicker"
                        style={{ color: 'var(--hush)' }}
                      >
                        {m.title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover-preview photo (desktop) */}
                {year.photos[0] && (
                  <div className="relative hidden h-24 w-32 shrink-0 overflow-hidden rounded sm:block">
                    <Image
                      src={year.photos[0].src}
                      alt={year.photos[0].caption || year.title}
                      fill
                      sizes="128px"
                      className="object-cover opacity-0 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </div>
                )}
              </Link>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
