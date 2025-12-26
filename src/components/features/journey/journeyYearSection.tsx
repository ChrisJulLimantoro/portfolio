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
    <section ref={sectionRef} className="relative min-h-screen py-20 px-6 border-b border-slate-900/50">
      
      {/* Giant Parallax Year Background */}
      <motion.div 
        style={{ y: yearY, opacity: yearOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-bold text-white pointer-events-none select-none z-0"
      >
        {data.year}
      </motion.div>

      {/* Content Container (z-10 to stay above background) */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="inline-block mb-10">
            <h2 className="text-8xl md:text-9xl font-display font-bold text-slate-800 select-none">
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
