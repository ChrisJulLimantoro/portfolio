'use client';

import { StoryBlock } from '@/lib/data';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface StoryRendererProps {
  blocks: StoryBlock[];
}

export function StoryRenderer({ blocks }: StoryRendererProps) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-12 px-5 py-12 sm:px-8 md:gap-16">
      {blocks.map((block, index) => (
        <BlockItem key={index} block={block} index={index} />
      ))}
    </div>
  );
}

function BlockItem({ block, index }: { block: StoryBlock; index: number }) {
  const initial = { opacity: 0, y: 30 };
  const whileInView = { opacity: 1, y: 0 };
  const transition = { duration: 0.6, delay: index * 0.05 };

  switch (block.type) {
    case 'text':
      return (
        <motion.div
          initial={initial}
          whileInView={whileInView}
          transition={transition}
          viewport={{ once: true }}
          className={`text-lg leading-relaxed text-[#cfcfd8] ${block.align === 'center' ? 'text-center' : 'text-left'}`}
        >
          <p
            dangerouslySetInnerHTML={{
              __html: block.content.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#34e0e0]">$1</strong>'),
            }}
          />
        </motion.div>
      );

    case 'image-grid':
      return (
        <motion.div initial={initial} whileInView={whileInView} transition={transition} viewport={{ once: true }} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {block.images.map((img, i) => (
            <div key={i} className="relative aspect-video overflow-hidden rounded-2xl border shadow-lg" style={{ borderColor: 'var(--line)' }}>
              <Image src={img.src} alt={img.caption || 'Journey image'} fill className="object-cover transition-transform duration-500 hover:scale-105" />
              {img.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-[#0b0b12]/70 p-2 text-center text-xs text-[#cfcfd8] backdrop-blur-sm">{img.caption}</div>
              )}
            </div>
          ))}
        </motion.div>
      );

    case 'stats':
      return (
        <motion.div initial={initial} whileInView={whileInView} transition={transition} viewport={{ once: true }} className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {block.items.map((item, i) => (
            <div key={i} className="flex flex-col items-center rounded-2xl border p-6 text-center" style={{ borderColor: 'var(--line)', background: 'var(--ink-2)' }}>
              <span className="font-editorial text-4xl" style={{ color: i % 2 === 0 ? 'var(--cyan)' : 'var(--gold)' }}>{item.value}</span>
              <span className="kicker mt-2" style={{ color: 'var(--hush)' }}>{item.label}</span>
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
          className="font-display border-l-2 py-2 pl-6 text-2xl leading-snug md:text-3xl"
          style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
        >
          “{block.text}”
          {block.author && (
            <footer className="mt-3 font-sans text-sm font-semibold not-italic" style={{ color: 'var(--hush)' }}>— {block.author}</footer>
          )}
        </motion.blockquote>
      );

    case 'list':
      return (
        <motion.ul initial={initial} whileInView={whileInView} transition={transition} viewport={{ once: true }} className="space-y-4 rounded-2xl border p-6" style={{ borderColor: 'var(--line)', background: 'var(--ink-2)' }}>
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-lg text-[#cfcfd8]">
              <span className="mt-1" style={{ color: 'var(--cyan)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </span>
              <span dangerouslySetInnerHTML={{ __html: item.text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#ECECF2]">$1</strong>') }} />
            </li>
          ))}
        </motion.ul>
      );

    default:
      return null;
  }
}
