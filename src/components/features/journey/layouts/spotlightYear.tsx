'use client';
import { JourneyYear } from '@/lib/data';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
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
    <div ref={containerRef} className="py-32 relative text-center">
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 opacity-20 pointer-events-none"
      >
         <Image 
            src={data.photos[0].src} 
            alt="Background" 
            fill 
            className="object-cover blur-3xl scale-110" 
         />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-sm font-bold mb-6"
        >
            {data.year} Highlight
        </motion.span>
        
        <motion.h3 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-8xl font-display font-bold text-white mb-8 leading-tight"
        >
          {data.title}
        </motion.h3>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-16 max-w-2xl mx-auto leading-relaxed">
            {data.description}
        </p>

        {/* Milestones as Big Cards */}
        <div className="grid md:grid-cols-2 gap-6 text-left">
            {data.milestones.map((m, i) => (
                <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-slate-900/80 backdrop-blur-md p-8 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-colors group"
                >
                    <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{m.title}</h4>
                    <p className="text-slate-400">{m.description}</p>
                </motion.div>
            ))}
        </div>

        {/* Achievements Buttons */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
             {data.achievements.map((ach, i) => (
                 ach.link ? (
                    <Link
                        key={i}
                        href={ach.link}
                        className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors"
                    >
                        {ach.linkText || ach.title} <ArrowUpRight size={18} />
                    </Link>
                 ) : (
                    <div key={i} className="px-6 py-3 rounded-full border border-slate-700 text-slate-300 font-medium">
                        {ach.title}
                    </div>
                 )
             ))}
        </div>
      </div>
    </div>
  );
}
