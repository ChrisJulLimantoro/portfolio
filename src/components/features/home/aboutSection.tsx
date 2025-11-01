'use client'; // This component MUST be a client component for `motion`

import { motion } from 'framer-motion';
import { Brain, Cloud, Code2, Cpu, Smartphone } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const skills = [
  { icon: Brain, label: 'AI Integration', color: 'text-cyan-400' },
  { icon: Code2, label: 'Backend / Microservices', color: 'text-emerald-400' },
  { icon: Cloud, label: 'Frontend Development', color: 'text-cyan-400' },
  { icon: Smartphone, label: 'Swift Mobile Design', color: 'text-emerald-400' },
  { icon: Cpu, label: 'Full-Stack', color: 'text-cyan-400' },
];

export function AboutSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-display font-bold text-8xl mb-12 text-center text-white">
            About Me
          </h2>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-end"
            ></motion.div>

            {/* Right Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <p className="text-slate-300 text-lg leading-relaxed">
                  I'm a passionate Full-Stack Developer with 3+ years of
                  experience building modern, scalable applications. I
                  specialize in{' '}
                  <span className="text-cyan-400 font-medium">
                    backend microservices
                  </span>
                  ,{' '}
                  <span className="text-emerald-400 font-medium">
                    frontend development
                  </span>
                  ,{' '}
                  <span className="text-cyan-400 font-medium">
                    Swift mobile design
                  </span>
                  , and{' '}
                  <span className="text-emerald-400 font-medium">
                    AI integration
                  </span>
                  .
                </p>

                <p className="text-slate-400 leading-relaxed">
                  My expertise lies in crafting clean, maintainable code and
                  building systems that seamlessly integrate cutting-edge AI
                  capabilities with robust backend architectures. I believe in
                  creating solutions that are both powerful and elegant.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
                  <div className="text-cyan-400 mb-1">3+</div>
                  <div className="text-slate-400">Years</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
                  <div className="text-emerald-400 mb-1">20+</div>
                  <div className="text-slate-400">Projects</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
                  <div className="text-cyan-400 mb-1">4+</div>
                  <div className="text-slate-400">Specializations</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20 group"
            >
              <skill.icon
                className={`mb-3 ${skill.color} group-hover:scale-110 transition-transform`}
                size={32}
                strokeWidth={1.5}
              />
              <span className="text-center text-slate-300 text-sm">
                {skill.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
