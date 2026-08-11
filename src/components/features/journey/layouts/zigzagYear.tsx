'use client';
import { JourneyYear } from '@/lib/data';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Trophy } from 'lucide-react';

export function ZigzagYear({ data }: { data: JourneyYear }) {
  return (
    <div className="relative py-16">
      <h3 className="font-editorial mb-12 text-4xl text-[#ECECF2] md:text-6xl">
        {data.title}
      </h3>

      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* Milestones & achievements */}
        <div className="order-2 space-y-12 md:order-1">
          <div className="space-y-8">
            {data.milestones.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative border-l-2 pl-6"
                style={{ borderColor: 'var(--line)' }}
              >
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full" style={{ background: 'var(--cyan)' }} />
                <h4 className="font-editorial text-xl text-[#ECECF2]">{milestone.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-[#a9a9b6]">{milestone.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="rounded-2xl border p-6" style={{ borderColor: 'var(--line)', background: 'var(--ink-2)' }}>
            <div className="mb-4 flex items-center gap-2" style={{ color: 'var(--gold)' }}>
              <Trophy size={18} />
              <span className="kicker">Achievements</span>
            </div>
            <div className="space-y-3">
              {data.achievements.map((ach, idx) => (
                <div key={idx} className="group flex items-center justify-between gap-3">
                  <span className="text-[#ECECF2]">{ach.title}</span>
                  {ach.link && (
                    <Link href={ach.link} className="flex items-center gap-1 text-sm opacity-0 transition-opacity group-hover:opacity-100" style={{ color: 'var(--cyan)' }}>
                      {ach.linkText || 'View'} <ArrowUpRight size={14} />
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <Link href={`/my-journey/${data.slug}`} className="link-wipe mt-6 inline-block font-sans text-sm font-semibold" style={{ color: 'var(--cyan)' }}>
              Read the full story →
            </Link>
          </div>
        </div>

        {/* Photo stack — white frames as deliberate print contrast */}
        <div className="relative order-1 h-[340px] md:order-2 md:h-[500px]">
          {data.photos.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0, rotate: photo.rotate || '0deg' }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="absolute left-1/2 top-[8%] w-56 -translate-x-1/2 rounded-xl bg-white p-2 shadow-2xl transition-all duration-300 hover:z-10 hover:rotate-0 hover:scale-105 md:left-20 md:top-1/4 md:w-80 md:translate-x-0"
              style={{ zIndex: idx, marginLeft: idx * 20, marginTop: idx * -30 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image src={photo.src} alt={photo.caption || 'Journey photo'} fill className="object-cover" />
              </div>
              {photo.caption && (
                <p className="font-display mt-2 text-center text-lg text-[#0b0b12]">{photo.caption}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
