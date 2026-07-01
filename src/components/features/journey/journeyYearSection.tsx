'use client';
import { JourneyYear } from '@/lib/data';
import { ZigzagYear } from './layouts/zigzagYear';
import { GalleryYear } from './layouts/galleryYear';
import { SpotlightYear } from './layouts/spotlightYear';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function JourneyYearSection({ data }: { data: JourneyYear }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax Year Number Effect
  const yearY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yearOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.1, 0.1, 0]);

  return (
    <section
      id={`year-${data.year}`}
      ref={sectionRef}
      className="relative min-h-screen scroll-mt-24 border-b px-5 py-20 sm:px-8"
      style={{ borderColor: 'var(--line)' }}
    >
      {/* Giant Parallax Year Background */}
      <motion.div
        style={{ y: yearY, opacity: yearOpacity }}
        className="font-editorial pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none text-[22vw] text-[#ECECF2]"
      >
        {data.year}
      </motion.div>

      {/* Content Container (z-10 to stay above background) */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-10 inline-block">
          <span className="kicker" style={{ color: 'var(--cyan)' }}>Chapter</span>
          <h2 className="font-editorial select-none text-8xl text-[#23232f] md:text-9xl">
            {data.year}
          </h2>
        </div>

        {/* Dynamic Layout Rendering */}
        {data.layout === 'zigzag' && <ZigzagYear data={data} />}
        {data.layout === 'gallery' && <GalleryYear data={data} />}
        {data.layout === 'spotlight' && <SpotlightYear data={data} />}
      </div>
    </section>
  );
}
