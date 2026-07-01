'use client';
import { JourneyYear } from '@/lib/data';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export function GalleryYear({ data }: { data: JourneyYear }) {
  return (
    <div className="py-16">
      <div className="mb-12 max-w-3xl">
        <h3 className="font-editorial text-4xl text-[#ECECF2] md:text-7xl">{data.title}</h3>
        <p className="mt-4 text-lg text-[#a9a9b6]">{data.description}</p>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Featured photo */}
        <motion.div
          className="group relative h-80 overflow-hidden rounded-2xl md:col-span-8 md:h-[500px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Image src={data.photos[0].src} alt="Highlight" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b12] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 max-w-md">
            <span className="kicker" style={{ color: 'var(--cyan)' }}>Highlights</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.milestones.map((m, i) => (
                <span key={i} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-md">
                  {m.title}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Side stack */}
        <div className="flex flex-col gap-6 md:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex h-full flex-col justify-center rounded-2xl border p-8"
            style={{ borderColor: 'var(--line)', background: 'var(--ink-2)' }}
          >
            <span className="kicker" style={{ color: 'var(--gold)' }}>Key achievements</span>
            <div className="mt-5 space-y-4">
              {data.achievements.map((ach, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--cyan)' }} />
                  <div>
                    <p className="text-[#ECECF2]">{ach.title}</p>
                    {ach.link && (
                      <a href={ach.link} className="mt-1 block text-xs hover:underline" style={{ color: 'var(--cyan)' }}>
                        {ach.linkText || 'Learn more →'}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Link href={`/my-journey/${data.slug}`} className="mt-8 block w-full rounded-xl border py-3 text-center font-sans text-sm font-medium text-[#ECECF2] transition-colors hover:border-[color:var(--cyan)]" style={{ borderColor: 'var(--line)' }}>
              Read the full year
            </Link>
          </motion.div>

          {data.photos[1] && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative h-48 overflow-hidden rounded-2xl">
              <Image src={data.photos[1].src} alt="Highlight" fill className="object-cover" />
            </motion.div>
          )}
        </div>

        {/* Bottom row */}
        {data.photos.slice(2).map((photo, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative h-64 overflow-hidden rounded-2xl md:col-span-4">
            <Image src={photo.src} alt={photo.caption || ''} fill className="object-cover" />
            {photo.caption && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0b0b12]/40 opacity-0 transition-opacity hover:opacity-100">
                <p className="font-display text-2xl text-white">{photo.caption}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
