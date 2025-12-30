'use client';
import { JourneyYear } from '@/lib/data';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function GalleryYear({ data }: { data: JourneyYear }) {
  return (
    <div className="py-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h3 className="text-4xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
          {data.title}
        </h3>
        <p className="text-slate-400 text-lg">{data.description}</p>
      </div>

      {/* Masonry-ish Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
        {/* Large Featured Photo */}
        <motion.div
          className="md:col-span-8 relative h-80 md:h-[500px] rounded-3xl overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Image
            src={data.photos[0].src}
            alt="Main highlight"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100" />
          <div className="absolute bottom-6 left-6 max-w-md">
            <h4 className="text-white font-bold text-2xl mb-2">Highlights</h4>
            <div className="flex flex-wrap gap-2">
              {data.milestones.map((m, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm text-white border border-white/10"
                >
                  {m.title}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Side Stack */}
        <div className="md:col-span-4 flex flex-col gap-6">
            {/* Stats / Summary Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-800/50 h-full flex flex-col justify-center"
          >
            <h4 className="text-xl font-display font-bold text-white mb-6">Key Achievements</h4>
            <div className="space-y-6">
              {data.achievements.map((ach, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/30">
                   <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 shrink-0" />
                   <div>
                     <p className="text-slate-200 font-medium">{ach.title}</p>
                     {ach.link && (
                       <a href={ach.link} className="text-xs text-cyan-400 hover:underline mt-1 block">
                          {ach.linkText || 'Learn more ->'}
                       </a>
                     )}
                   </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
               <Link 
                 href={`/my-journey/${data.slug}`}
                 className="block w-full py-3 text-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-sm font-medium"
               >
                 View Full Year Story
               </Link>
            </div>
          </motion.div>

            {/* Secondary Photo */}
            {data.photos[1] && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="relative h-48 rounded-3xl overflow-hidden"
                >
                    <Image src={data.photos[1].src} alt="Second highlight" fill className="object-cover" />
                </motion.div>
            )}
        </div>
      
        {/* Bottom Row Photos */}
        {data.photos.slice(2).map((photo, i) => (
             <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="md:col-span-4 relative h-64 rounded-3xl overflow-hidden"
            >
                <Image src={photo.src} alt={photo.caption || ''} fill className="object-cover" />
                {photo.caption && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white font-medium">{photo.caption}</p>
                    </div>
                )}
            </motion.div>
        ))}
      </div>
    </div>
  );
}
