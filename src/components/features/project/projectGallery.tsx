'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ProjectImage } from '@/lib/data';

interface ProjectGalleryProps {
  images: (string | ProjectImage)[];
  title: string;
}

type Orientation = 'landscape' | 'portrait' | 'square';

interface GalleryItem {
  src: string;
  orientation: Orientation;
  originalIndex: number;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [detectedOrientations, setDetectedOrientations] = useState<Record<string, Orientation>>({});

  // Detect image orientations for string-only images or missing metadata
  useEffect(() => {
    const detectMissingOrientations = async () => {
      const pendingDetections = images.filter(img => typeof img === 'string');
      
      const results = await Promise.all(
        pendingDetections.map((img) => {
          const url = typeof img === 'string' ? img : (img as ProjectImage).src;
          return new Promise<{ url: string, orientation: Orientation }>((resolve) => {
            const img = new Image();
            img.onload = () => {
              const ratio = img.naturalWidth / img.naturalHeight;
              let orientation: Orientation = 'square';
              if (ratio > 1.2) orientation = 'landscape';
              else if (ratio < 0.8) orientation = 'portrait';
              resolve({ url, orientation });
            };
            img.onerror = () => resolve({ url, orientation: 'landscape' });
            img.src = url;
          });
        })
      );

      const nextOrientations = { ...detectedOrientations };
      results.forEach(res => {
        nextOrientations[res.url] = res.orientation;
      });
      setDetectedOrientations(nextOrientations);
    };

    detectMissingOrientations();
  }, [images]);

  // Derived items with orientations
  const processedItems = useMemo<GalleryItem[]>(() => {
    return images.map((img, index) => {
      if (typeof img === 'string') {
        return {
          src: img,
          orientation: detectedOrientations[img] || 'landscape', // Default to landscape while loading
          originalIndex: index
        };
      }
      return {
        src: img.src,
        orientation: img.orientation,
        originalIndex: index
      };
    });
  }, [images, detectedOrientations]);

  /**
   * Layout Engine: Rearranges items to satisfy Bento Grid logic.
   * Bento rules:
   * 1 Landscape can be replaced by 2 Portraits side-by-side (col-span 1 each).
   * 1 Portrait can be replaced by 2 Landscapes on top of each other (row-span 1 each).
   * 
   * We'll try to group items into 4-column blocks.
   */
  const rearrangedItems = useMemo<GalleryItem[]>(() => {
    const portraitPool = processedItems.filter(item => item.orientation === 'portrait');
    const landscapePool = processedItems.filter(item => item.orientation === 'landscape');
    const squarePool = processedItems.filter(item => item.orientation === 'square');
    
    const result: GalleryItem[] = [];
    const usedIndices = new Set<number>();

    // 1. Pick a Hero (first image usually)
    if (processedItems.length > 0) {
      const hero = processedItems[0];
      result.push(hero);
      usedIndices.add(hero.originalIndex);
    }

    // 2. Fill the rest by trying to balance orientations
    // Strategy: Look for pairs or triplets that fit well together.
    const remaining = processedItems.slice(1);
    
    // Simplistic but effective bento rearrangement:
    // We try to pair portraits together so they can share a row or col block.
    // We try to pack landscapes so they don't leave awkward gaps.
    
    const sorted = [...remaining].sort((a, b) => {
      // Group same orientations together to make them easier to pair in CSS grid
      if (a.orientation === b.orientation) return 0;
      if (a.orientation === 'portrait') return -1;
      return 1;
    });

    result.push(...sorted);

    return result.slice(0, 6); // Limit to 6 for bento
  }, [processedItems]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
  }, [images.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleClose, handleNext, handlePrev]);

  // Generate grid classes based on orientation and position
  const getGridClasses = (index: number, orientation: Orientation) => {
    let baseClasses = "relative overflow-hidden rounded-3xl border border-slate-800 group shadow-2xl cursor-pointer bg-slate-900 min-h-[200px]";
    
    // Hero item (usually first)
    if (index === 0) {
      if (orientation === 'landscape') return baseClasses + " md:col-span-3 md:row-span-2";
      if (orientation === 'portrait') return baseClasses + " md:col-span-2 md:row-span-3";
      return baseClasses + " md:col-span-2 md:row-span-2";
    }

    // Subsequent items
    if (orientation === 'portrait') {
      return baseClasses + " md:col-span-1 md:row-span-2";
    } else if (orientation === 'landscape') {
      return baseClasses + " md:col-span-2 md:row-span-1";
    } else {
      // Square
      return baseClasses + " md:col-span-1 md:row-span-1";
    }
  };

  return (
    <section className="mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <h2 className="text-3xl font-bold text-white text-center md:text-left">Project Showcase</h2>
        <p className="text-slate-500 text-sm font-medium uppercase tracking-widest bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
          {images.length} {images.length === 1 ? 'Shot' : 'Shots'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-4 grid-flow-dense">
        {rearrangedItems.map((item, index) => {
          return (
            <motion.div 
              key={item.originalIndex} 
              className={getGridClasses(index, item.orientation)}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 0.99 }}
              onClick={() => setSelectedIndex(item.originalIndex)}
            >
              <img
                src={item.src}
                alt={`${title} screenshot ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <div className="flex items-center gap-2 text-white font-medium text-lg transform translateY(20px) group-hover:translateY(0) transition-transform duration-500">
                  <Maximize2 size={20} className="text-cyan-400" />
                  <span>Enlarge View</span>
                </div>
              </div>
              <div className="absolute inset-0 border-[1px] border-white/5 rounded-3xl pointer-events-none" />
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12"
            onClick={handleClose}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-[110] p-3 rounded-full bg-slate-800/50 text-white hover:bg-slate-700 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-[110] p-4 rounded-full bg-slate-800/30 text-white hover:bg-slate-700 transition-all hover:scale-110"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-[110] p-4 rounded-full bg-slate-800/30 text-white hover:bg-slate-700 transition-all hover:scale-110"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const currentImg = images[selectedIndex];
                const src = typeof currentImg === 'string' ? currentImg : currentImg.src;
                return (
                  <img
                    src={src}
                    alt={`${title} large view`}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl border border-white/10"
                  />
                );
              })()}
              
              {/* Caption */}
              <div className="absolute -bottom-8 left-0 right-0 text-center">
                <p className="text-slate-400 text-sm font-medium">
                  {selectedIndex + 1} / {images.length} — {title}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
