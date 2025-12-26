'use client';
import { JourneyYear } from '@/lib/data';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Trophy } from 'lucide-react';
import Link from 'next/link';

export function ZigzagYear({ data }: { data: JourneyYear }) {
  return (
    <div className="py-20 relative">
      {/* Year Title */}
      <h3 className="text-4xl md:text-6xl font-display font-bold text-white mb-12 text-center">
        {data.title}
      </h3>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Milestones & Achievements */}
        <div className="space-y-12 order-2 md:order-1">
          <div className="space-y-8">
            {data.milestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-6 border-l-2 border-slate-700"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-500" />
                <h4 className="text-xl font-bold text-white mb-2">
                  {milestone.title}
                </h4>
                <p className="text-slate-400">{milestone.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Achievements Section */}
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-4 text-emerald-400">
              <Trophy size={20} />
              <span className="font-bold uppercase tracking-wider text-sm">
                Achievements
              </span>
            </div>
            <div className="space-y-4">
              {data.achievements.map((ach, idx) => (
                <div key={idx} className="flex justify-between items-center group">
                  <span className="text-slate-200 font-medium">{ach.title}</span>
                  {ach.link && (
                    <Link
                      href={ach.link}
                      className="text-sm text-cyan-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {ach.linkText || 'View'} <ArrowUpRight size={14} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Photos Stack */}
        <div className="relative h-[500px] order-1 md:order-2 perspective-1000">
          {data.photos.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, rotate: 0, y: 50 }}
              whileInView={{ opacity: 1, rotate: photo.rotate || '0deg', y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="absolute top-1/4 left-10 md:left-20 w-64 md:w-80 p-2 bg-white shadow-2xl rounded-xl transform hover:z-10 transition-all duration-300 hover:scale-105 hover:rotate-0"
              style={{
                zIndex: idx,
                marginLeft: idx * 20,
                marginTop: idx * -30,
              }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src={photo.src}
                  alt={photo.caption || 'Journey photo'}
                  fill
                  className="object-cover"
                />
              </div>
              {photo.caption && (
                <p className="mt-2 text-center text-slate-800 font-handwriting text-sm">
                  {photo.caption}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
