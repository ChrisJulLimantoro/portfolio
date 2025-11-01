import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Footer Component - Server Component
 * This is a simple, static component that doesn't need interactivity.
 * It's a Server Component by default.
 */
export function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-slate-800/50 hover:text-cyan-400 text-slate-400"
              asChild
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-slate-800/50 hover:text-cyan-400 text-slate-400"
              asChild
            >
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-slate-800/50 hover:text-cyan-400 text-slate-400"
              asChild
            >
              <a href="mailto:contact@example.com" aria-label="Email">
                <Mail size={20} />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-slate-800/50 hover:text-cyan-400 text-slate-400"
              asChild
            >
              {/* NOTE: This file needs to be in the /public folder (e.g., /public/resume.pdf) */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Resume"
              >
                <FileText size={20} />
              </a>
            </Button>
          </div>

          {/* Copyright */}
          <p className="text-slate-500">
            © 2025 Christopher Julius. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
