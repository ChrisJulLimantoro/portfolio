'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

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
    { name: 'Work', href: '/project' },
    { name: 'Journey', href: '/my-journey' },
    { name: 'Notes', href: '/blog' },
    { name: 'Ask AI', href: '/chat' },
  ];

  if (pathname === '/chat') return null;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            exit={{ y: -80 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto border-b backdrop-blur-md"
            style={{
              borderColor: 'var(--line)',
              background: 'color-mix(in srgb, var(--ink) 72%, transparent)',
            }}
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
              {/* Masthead logotype */}
              <Link href="/" className="group flex items-baseline gap-2">
                <span className="font-editorial text-2xl tracking-tight text-[#ECECF2]">
                  Julius
                </span>
                <span
                  className="kicker hidden sm:inline"
                  style={{ color: 'var(--hush)' }}
                >
                  Issue Nº01
                </span>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden items-center gap-7 md:flex">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="kicker link-wipe transition-colors"
                      style={{
                        color: active ? 'var(--fuchsia)' : 'var(--hush)',
                      }}
                      onMouseEnter={(e) =>
                        !active && (e.currentTarget.style.color = '#ECECF2')
                      }
                      onMouseLeave={(e) =>
                        !active && (e.currentTarget.style.color = 'var(--hush)')
                      }
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className="text-[#ECECF2] transition-colors hover:text-[var(--fuchsia)] md:hidden"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            {/* Mobile menu */}
            <motion.div
              initial={false}
              animate={{ height: isMenuOpen ? 'auto' : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t md:hidden"
              style={{ borderColor: 'var(--line)' }}
            >
              <div className="flex flex-col px-5 py-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="font-editorial py-3 text-2xl"
                    style={{
                      color:
                        pathname === item.href ? 'var(--fuchsia)' : '#ECECF2',
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
