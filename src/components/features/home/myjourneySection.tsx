'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function MyJourneySection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display font-bold text-6xl md:text-8xl text-white mb-10"
        >
          My Journey
        </motion.h2>

        {/* Decorative Background Blur Effects */}
        <motion.div
          className="absolute -top-10 -left-20 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-20 -right-20 w-80 h-80 bg-emerald-500/20 blur-3xl rounded-full"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Main Content */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">
          {/* Left Photo Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="hidden md:flex flex-col gap-6 relative"
          >
            {[
              {
                src: '/images/IMG_3987.jpg',
                caption: 'Becoming tutor',
                rotate: '-6deg',
              },
              {
                src: '/images/IMG_3982.jpg',
                caption: 'Enjoying College',
                rotate: '4deg',
              },
            ].map((photo, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, rotate: 0 }}
                transition={{ duration: 0.3 }}
                style={{ rotate: photo.rotate }}
                className="bg-white p-2 rounded-xl shadow-lg w-52 flex flex-col items-center"
              >
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
                <p className="font-display text-black text-sm mt-2">
                  {photo.caption}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Center Description */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl z-10 text-center md:text-left"
          >
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
              My journey started{' '}
              <span className="text-cyan-400">three years ago</span>, when I
              wrote my very first line of code. From countless trials and
              errors, late-night debugging, and endless curiosity — I gradually
              evolved from a beginner to a{' '}
              <span className="text-emerald-400">
                professional software engineer
              </span>
              .
              <br />
              <br />
              Today, I create complex, scalable systems while still holding on
              to that same spark that made me fall in love with code in the
              first place.
            </p>

            {/* CTA Button */}
            <motion.a
              href="/my-journey"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 inline-flex items-center justify-center rounded-lg font-display font-bold text-2xl text-white transition-all underline"
            >
              Explore My Journey →
            </motion.a>
          </motion.div>

          {/* Right Photo Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="hidden md:flex flex-col gap-6 relative"
          >
            {[
              {
                src: '/images/FTR00997.jpeg',
                caption: 'Intern @Apple Developer Academy',
                rotate: '5deg',
              },
              {
                src: '/images/IMG_2199.jpg',
                caption: 'Team collaboration',
                rotate: '-5deg',
              },
            ].map((photo, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, rotate: 0 }}
                transition={{ duration: 0.3 }}
                style={{ rotate: photo.rotate }}
                className="bg-white p-2 rounded-xl shadow-lg w-52 flex flex-col items-center"
              >
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  width={400}
                  height={400}
                  className="rounded-lg object-cover"
                />
                <p className="font-display text-black text-sm mt-2">
                  {photo.caption}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
