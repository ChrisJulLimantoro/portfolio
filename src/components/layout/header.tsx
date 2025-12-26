'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Ensure this code only runs on the client — but DOM structure remains the same SSR-side
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;

      if (delta > 5 && currentY > 100) setVisible(false);
      else if (delta < -10) setVisible(true);

      setLastScrollY(currentY);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setVisible(true), 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/project' },
    { name: 'Journey', href: '/my-journey' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.nav
            key="floating-nav"
            initial={{ opacity: 0, y: -30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="px-6 py-3 rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-lg shadow-lg shadow-cyan-500/5 flex items-center gap-6"
          >
            {/* Brand */}
            <div className="border-r border-slate-700 pr-4">
              <a
                href="/"
                className="text-2xl font-display font-semibold tracking-wide bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
              >
                Julius
              </a>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`transition-colors font-medium ${
                    pathname === item.href
                      ? 'text-cyan-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-cyan-400 hover:bg-slate-800/50"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile Menu (always rendered for consistent SSR DOM) */}
      <motion.div
        initial={false}
        animate={{
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden md:hidden mt-2 rounded-2xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-xl shadow-lg shadow-cyan-500/10"
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`block py-2 text-center ${
              pathname === item.href
                ? 'text-cyan-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {item.name}
          </a>
        ))}
      </motion.div>
    </div>
  );
}
