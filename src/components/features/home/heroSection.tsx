'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, Sparkles, BookOpen } from 'lucide-react';
import { CodeWindow } from './codeWindow';
import { useState, useEffect } from 'react';

export function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler);
      else mq.removeListener(handler);
    };
  }, []);
  const desktopSnippets = [
    {
      filename: '~/portfolio/services.ts',
      imports: ["import { Microservice, AI } from '@backend/core';"],
      body: [
        'const buildService = async () => {',
        '  const service = await Microservice.create({',
        "    api: 'REST',",
        '    ai: AI.integrate(),',
        '    scalable: true',
        '  });',
        '  return service;',
        '}',
      ],
    },
    {
      filename: '~/portfolio/frontend.tsx',
      imports: ["import { NextUI, Motion } from '@frontend/ui';"],
      body: [
        'export const UI = () => {',
        '  return <NextUI animate={Motion.smooth} />;',
        '};',
      ],
    },
    {
      filename: '~/portfolio/application.swift',
      imports: ['import SwiftUI', 'import SwiftData'],
      body: [
        'struct MyView : View {',
        '  @Binding private var achievementList: [string]',
        '  var body : some View {',
        '    PortfolioComponent(achievement: achievementList)',
        '      .opacity(0.8)',
        '  }',
        '}',
      ],
    },
  ];

  const mobileSnippets = [
    {
      filename: '~/mobile/services.ts',
      imports: ["import { AI } from '@core/ai';"],
      body: ["const ai = AI.integrate('mobile');"],
    },
    {
      filename: '~/mobile/ui.tsx',
      imports: ["import { NextUI } from '@frontend/ui';"],
      body: ['<NextUI minimal />'],
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Column - Text Content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-white leading-tight text-4xl font-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Hi,{'   '}
              <span className="font-display text-7xl text-cyan-100 mr-2">
                Julius
              </span>{' '}
              here{' '}
              <motion.span
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: 'easeInOut',
                }}
                style={{ display: 'inline-block', transformOrigin: '70% 70%' }}
              >
                ✋🏼
              </motion.span>
            </motion.h1>
            <motion.h1
              className="mb-6 text-white leading-tight text-lg font-sans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              just a kid trying to navigate his way through tech world
            </motion.h1>
            <motion.div
              className="flex flex-wrap gap-6 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20 flex items-center justify-center">
                  <Code2 className="text-cyan-400" size={20} />
                </div>
                <div>
                  <div className="text-white">3+ Years</div>
                  <div className="text-slate-500">Experience</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center">
                  <Sparkles className="text-emerald-400" size={20} />
                </div>
                <div>
                  <div className="text-white">25+ Projects</div>
                  <div className="text-slate-500">Delivered</div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                onClick={() => {
                  window.location.href = '/project';
                }}
                className="bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white border-0 shadow-lg shadow-cyan-500/25 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  View Projects
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  window.location.href = '/blog';
                }}
                className="border-slate-700 bg-cyan-500 hover:border-cyan-300 hover:bg-cyan-400 text-white hover:text-white group"
              >
                <BookOpen
                  className="mr-2 group-hover:scale-110 transition-transform"
                  size={18}
                />
                Read My Diary
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column - Visual Elements */}
        <CodeWindow
          snippets={isMobile ? mobileSnippets : desktopSnippets}
          typingSpeed={26}
          snippetDelay={2500}
        />
      </div>
    </section>
  );
}
