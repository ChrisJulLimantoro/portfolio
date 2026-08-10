import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { CONTACT, GMAIL_COMPOSE_URL } from '@/lib/contact';

const socials = [
  { Icon: Github, href: CONTACT.github, label: 'GitHub' },
  {
    Icon: Linkedin,
    href: CONTACT.linkedin,
    label: 'LinkedIn',
  },
  { Icon: Mail, href: GMAIL_COMPOSE_URL, label: 'Email' },
  { Icon: FileText, href: CONTACT.resume, label: 'Resume' },
];

export function Footer() {
  return (
    <footer
      className="relative mt-12 border-t px-5 py-16 sm:px-8"
      style={{ borderColor: 'var(--line)' }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Big editorial signoff */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="kicker" style={{ color: 'var(--gold)' }}>
              Let&apos;s build something
            </span>
            <a
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-editorial link-wipe mt-3 block text-5xl text-[#ECECF2] sm:text-7xl"
            >
              Say hello →
            </a>
          </div>
          <p className="font-display text-2xl" style={{ color: 'var(--hush)' }}>
            thanks for scrolling this far ✋🏼
          </p>
        </div>

        {/* Bottom row */}
        <div
          className="mt-14 flex flex-col items-start justify-between gap-6 border-t pt-6 sm:flex-row sm:items-center"
          style={{ borderColor: 'var(--line)' }}
        >
          <p className="kicker" style={{ color: 'var(--hush)' }}>
            © 2026 Christopher Julius — Issue Nº01
          </p>
          <div className="flex items-center gap-5">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="text-[#a9a9b6] transition-colors hover:text-[#ff3d81]"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
