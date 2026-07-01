import { Maximize2, Sparkles } from 'lucide-react';

/**
 * A browser-window chrome (rounded tab + URL chip) wrapping live site embeds.
 * Shared by the homepage NovelGit feature and the "live" project detail variant.
 */
export function BrowserFrame({
  url,
  title,
  children,
  onEnlarge,
  accent = '#34e0e0',
}: {
  url: string;
  title: string;
  children: React.ReactNode;
  onEnlarge?: () => void;
  accent?: string;
}) {
  return (
    <div
      className="overflow-hidden rounded-xl border shadow-2xl"
      style={{ borderColor: 'var(--ink-3)', background: 'var(--ink-2)' }}
    >
      {/* Tab + toolbar */}
      <div
        className="flex items-center gap-3 border-b px-3 py-2"
        style={{ borderColor: 'var(--line)' }}
      >
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div
          className="ml-1 flex items-center gap-2 truncate rounded-t-lg border border-b-0 px-3 py-1.5 text-xs"
          style={{
            borderColor: 'var(--line)',
            background: 'var(--ink)',
            color: 'var(--hush)',
          }}
        >
          <Sparkles size={11} style={{ color: accent }} />
          {title}
        </div>
        <div
          className="hidden flex-1 truncate rounded-full px-3 py-1 font-sans text-xs sm:block"
          style={{ background: 'var(--ink)', color: 'var(--hush)' }}
        >
          {url}
        </div>
        {onEnlarge && (
          <button
            onClick={onEnlarge}
            aria-label="Enlarge preview"
            className="ml-auto flex h-7 w-7 items-center justify-center rounded-md text-[#a9a9b6] transition-colors hover:bg-white/5 hover:text-[#34e0e0] sm:ml-0"
          >
            <Maximize2 size={15} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
