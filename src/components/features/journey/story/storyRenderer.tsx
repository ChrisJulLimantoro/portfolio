'use client';

import { StoryBlock } from '@/lib/data';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface StoryRendererProps {
  blocks: StoryBlock[];
}

export function StoryRenderer({ blocks }: StoryRendererProps) {
  return (
    <div className="flex flex-col gap-12 md:gap-16 max-w-3xl mx-auto py-12 px-6">
      {blocks.map((block, index) => (
        <BlockItem key={index} block={block} index={index} />
      ))}
    </div>
  );
}

function BlockItem({ block, index }: { block: StoryBlock; index: number }) {
  const initial = { opacity: 0, y: 30 };
  const whileInView = { opacity: 1, y: 0 };
  const transition = { duration: 0.6, delay: index * 0.1 };

  switch (block.type) {
    case 'text':
      return (
        <motion.div
          initial={initial}
          whileInView={whileInView}
          transition={transition}
          viewport={{ once: true }}
          className={`prose prose-invert prose-lg max-w-none text-slate-300 ${
            block.align === 'center' ? 'text-center' : 'text-left'
          }`}
        >
          <p dangerouslySetInnerHTML={{ 
            __html: block.content
             .replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-400 font-semibold">$1</strong>')
            }} 
          />
        </motion.div>
      );

    case 'image-grid':
      return (
        <motion.div
          initial={initial}
          whileInView={whileInView}
          transition={transition}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {block.images.map((img, i) => (
            <div key={i} className="relative aspect-video rounded-2xl overflow-hidden border border-slate-700/50 shadow-lg">
              <Image
                src={img.src}
                alt={img.caption || 'Journey image'}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2 text-xs text-center text-slate-300">
                  {img.caption}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      );

    case 'stats':
      return (
        <motion.div
          initial={initial}
          whileInView={whileInView}
          transition={transition}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 my-4"
        >
          {block.items.map((item, i) => (
            <div key={i} className="flex flex-col items-center p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
              <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {item.value}
              </span>
              <span className="text-sm font-medium text-slate-400 mt-2 uppercase tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      );

    case 'quote':
      return (
        <motion.blockquote
          initial={initial}
          whileInView={whileInView}
          transition={transition}
          viewport={{ once: true }}
          className="relative border-l-4 border-cyan-500 pl-6 py-2 my-8 italic text-xl md:text-2xl font-light text-slate-200 bg-slate-900/30 rounded-r-xl"
        >
          "{block.text}"
          {block.author && (
            <footer className="mt-4 text-sm font-semibold text-cyan-400 not-italic">
              — {block.author}
            </footer>
          )}
        </motion.blockquote>
      );

    case 'list':
      return (
        <motion.ul
          initial={initial}
          whileInView={whileInView}
          transition={transition}
          viewport={{ once: true }}
          className="space-y-4 my-8 bg-slate-900/40 p-6 rounded-2xl border border-slate-800"
        >
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-lg text-slate-300">
               <span className="text-cyan-400 mt-1">
                 {/* Simple check icon if no icon provided */}
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
               </span>
               <span dangerouslySetInnerHTML={{ 
                  __html: item.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') 
               }} />
            </li>
          ))}
        </motion.ul>
      );

    default:
      return null;
  }
}
