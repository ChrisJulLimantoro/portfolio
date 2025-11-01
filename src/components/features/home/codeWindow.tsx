'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CodeSnippet {
  filename: string;
  imports: string[];
  body: string[];
}

interface CodeWindowProps {
  snippets: CodeSnippet[];
  typingSpeed?: number;
  lineDelay?: number;
  snippetDelay?: number;
  width?: string;
  height?: string;
}

export function CodeWindow({
  snippets,
  typingSpeed = 28,
  lineDelay = 120,
  snippetDelay = 2000,
  width = '640px',
  height = '380px',
}: CodeWindowProps) {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [fileDisplay, setFileDisplay] = useState('');
  const [completedLines, setCompletedLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timers = useRef<number[]>([]);

  const clearAllTimers = () => {
    timers.current.forEach((id) => clearTimeout(id));
    timers.current = [];
  };

  useEffect(() => {
    if (!snippets || snippets.length === 0) return;
    let fIdx = 0;
    const snippet = snippets[snippetIndex];
    clearAllTimers();

    // Reset states for new snippet
    setCompletedLines([]);
    setCurrentLineText('');
    setFileDisplay('~');
    setIsTyping(true);

    /* --- Step 1: Type filename --- */
    const name = snippet.filename ?? '';

    const typeFilename = () => {
      // ✅ stop cleanly
      if (fIdx >= name.length) {
        const t = window.setTimeout(startTypingCode, 300);
        timers.current.push(t);
        return;
      }

      // ✅ type exactly one character
      setFileDisplay((prev) => prev + name.charAt(fIdx));

      fIdx++;

      // ✅ schedule next only *after* increment
      const t = window.setTimeout(typeFilename, typingSpeed);
      timers.current.push(t);
    };

    /* --- Step 2: Type lines sequentially --- */
    const startTypingCode = () => {
      const lines = [...(snippet.imports || []), '', ...(snippet.body || [])];

      const typeLine = (idx: number) => {
        if (idx >= lines.length) {
          setIsTyping(false);
          const t = window.setTimeout(() => {
            setSnippetIndex((prev) => (prev + 1) % snippets.length);
          }, snippetDelay);
          timers.current.push(t);
          return;
        }

        const line = lines[idx];
        if (line === '') {
          const t = window.setTimeout(() => {
            setCompletedLines((p) => [...p, '']);
            typeLine(idx + 1);
          }, lineDelay);
          timers.current.push(t);
          return;
        }

        let cPos = 0;
        const tick = () => {
          setCurrentLineText(line.slice(0, cPos + 1));
          cPos++;

          if (cPos < line.length) {
            const t = window.setTimeout(tick, typingSpeed);
            timers.current.push(t);
          } else {
            const t = window.setTimeout(() => {
              setCompletedLines((p) => [...p, line]);
              setCurrentLineText('');
              const tNext = window.setTimeout(
                () => typeLine(idx + 1),
                lineDelay
              );
              timers.current.push(tNext);
            }, 80);
            timers.current.push(t);
          }
        };
        tick();
      };

      typeLine(0);
    };

    typeFilename();

    return () => clearAllTimers();
  }, [snippetIndex, snippets, typingSpeed, lineDelay, snippetDelay]);

  const snippet = snippets[snippetIndex];

  return (
    <div
      className="relative rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 shadow-2xl backdrop-blur-sm overflow-hidden"
      style={{ width, height }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/50 bg-slate-900/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>

        <div className="text-slate-400 text-sm ml-4 font-mono flex items-center">
          <span>{fileDisplay}</span>
          {isTyping && fileDisplay.length < snippet.filename.length && (
            <motion.span
              className="inline-block w-2 h-4 bg-emerald-400 ml-[2px]"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </div>
      </div>

      {/* Code area (scrollable) */}
      <div className="p-6 font-mono text-sm text-slate-300 overflow-y-auto h-[calc(100%-48px)] scrollbar-thin scrollbar-thumb-slate-700/60 scrollbar-track-transparent">
        {completedLines.map((line, idx) => (
          <div
            key={idx}
            className="whitespace-pre leading-relaxed"
            dangerouslySetInnerHTML={{ __html: colorize(line) }}
          />
        ))}

        {/* Active typing line + cursor */}
        {currentLineText && (
          <div className="whitespace-pre leading-relaxed flex items-center">
            <div
              dangerouslySetInnerHTML={{ __html: colorize(currentLineText) }}
            />
            <motion.span
              className="inline-block w-2 h-5 bg-emerald-400 ml-[1px]"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </div>
        )}
      </div>

      {/* Glows */}
      <motion.div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ---------------------
   syntax highlighting
   --------------------- */
function colorize(code: string) {
  if (!code) return '';

  let c = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  c = c.replace(
    /\b(import|from|const|await|return|async|true|false|export|new)\b|('[^']*'|"[^"]*")|\b\d+\b|\b[A-Z][A-Za-z0-9_]*\b/g,
    (match, kw, str) => {
      if (kw) return `<span class="text-purple-400">${kw}</span>`;
      if (str) return `<span class="text-emerald-400">${str}</span>`;
      if (/^\d+$/.test(match))
        return `<span class="text-yellow-400">${match}</span>`;
      if (/^[A-Z]/.test(match))
        return `<span class="text-cyan-400">${match}</span>`;
      return match;
    }
  );

  return c;
}
