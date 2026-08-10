'use client';

import { useState, useRef, useEffect, type ComponentPropsWithoutRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, Bot, ChevronDown, Maximize2, ExternalLink, Trash2, AlertTriangle, Clock, CornerDownRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { checkClientRateLimit, incrementQueryCount, syncWithServer, getTimeUntilMidnight, getCurrentTimeUTC7 } from '@/lib/utils/client-rate-limiter';
import { loadChatHistory, saveChatHistory, clearChatHistory as clearStoredHistory, trimToLimit } from '@/lib/utils/chat-history';
import { RATE_LIMIT_CONFIG } from '@/lib/config/rate-limit-config';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const isInternal = (href?: string) => !!href && href.startsWith('/');

/** Pull internal markdown links `[label](/path#anchor)` out of an assistant reply. */
function extractJumps(content: string): { label: string; href: string }[] {
  const out: { label: string; href: string }[] = [];
  const seen = new Set<string>();
  const re = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(content))) {
    if (!seen.has(m[2])) {
      seen.add(m[2]);
      out.push({ label: m[1], href: m[2] });
    }
  }
  return out;
}

export function ChatWidget() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [spotlight, setSpotlight] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl-K opens the palette as a centered spotlight; Esc closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSpotlight(true);
        setIsOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Focus the input whenever the panel opens.
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 80);
  }, [isOpen]);

  // Navigate to a section, smooth-scrolling to the anchor after the route settles.
  const handleJump = (href: string) => {
    setIsOpen(false);
    router.push(href);
    const hash = href.split('#')[1];
    if (hash) {
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 450);
    }
  };
  
  // Rate limiting state
  const [remainingQueries, setRemainingQueries] = useState<number>(RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [rateLimitError, setRateLimitError] = useState<string | null>(null);
  const [timeUntilReset, setTimeUntilReset] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // Load chat history and check rate limit on mount
  useEffect(() => {
    const messages = loadChatHistory();
    setMessages(messages);
    
    // Check client-side rate limit first
    const rateLimit = checkClientRateLimit();
    setRemainingQueries(rateLimit.remaining);
    setIsRateLimited(!rateLimit.allowed);

    // Sync with server to get actual count from Redis
    const fetchServerRateLimit = async () => {
      try {
        // Use dedicated HEAD endpoint to check rate limit without incrementing
        const response = await fetch('/api/chat/head');

        // Read rate limit headers
        const limit = response.headers.get('X-RateLimit-Limit');
        const remaining = response.headers.get('X-RateLimit-Remaining');

        if (limit && remaining) {
          const remainingNum = parseInt(remaining, 10);
          setRemainingQueries(remainingNum);
          setIsRateLimited(remainingNum <= 0);

          // Update localStorage to match server using imported syncWithServer
          syncWithServer(response.headers);
        }
      } catch (error) {
        console.error('Failed to sync with server:', error);
        // Keep client-side values if sync fails
      }
    };

    fetchServerRateLimit();
  }, []);

  // Update time displays every minute
  useEffect(() => {
    const updateTime = () => {
      setTimeUntilReset(getTimeUntilMidnight());
      setCurrentTime(getCurrentTimeUTC7());
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  // Save chat history whenever messages change (with 50 message limit)
  useEffect(() => {
    if (messages.length > 0) {
      const trimmed = trimToLimit(messages);
      saveChatHistory(trimmed);
      if (trimmed.length < messages.length) {
        setMessages(trimmed);
      }
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearHistory = () => {
    setMessages([]);
    clearStoredHistory();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue?.trim() || isLoading) return;

    // Client-side rate limit check
    const rateLimit = checkClientRateLimit();
    if (!rateLimit.allowed) {
      setIsRateLimited(true);
      setRateLimitError(`You've reached your daily limit of ${RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT} questions. Resets at midnight UTC+7.`);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setRateLimitError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      // Handle rate limit error (429)
      if (response.status === 429) {
        const data = await response.json();
        setIsRateLimited(true);
        setRateLimitError(data.message || 'Rate limit exceeded');
        
        // Sync with server
        syncWithServer(response.headers);
        const updatedLimit = checkClientRateLimit();
        setRemainingQueries(updatedLimit.remaining);
        
        // Remove user message since it wasn't processed
        setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
        return;
      }

      // Handle storage full error (503)
      if (response.status === 503) {
        const data = await response.json();
        setRateLimitError(data.message || 'Service temporarily unavailable');
        
        // Remove user message
        setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      // Sync rate limit with server headers
      syncWithServer(response.headers);
      const updatedLimit = checkClientRateLimit();
      setRemainingQueries(updatedLimit.remaining);
      
      // Increment query count
      incrementQueryCount();

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';
      const assistantId = (Date.now() + 1).toString();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          assistantMessage += chunk;

          setMessages((prev) => {
            const filtered = prev.filter((m) => m.id !== assistantId);
            return [
              ...filtered,
              {
                id: assistantId,
                role: 'assistant',
                content: assistantMessage,
              },
            ];
          });
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render the widget on the /chat page
  if (pathname === '/chat') {
    return null;
  }

  const panel = (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl"
      style={{ background: 'color-mix(in srgb, var(--ink) 92%, transparent)', borderColor: 'var(--line)' }}
    >
      {/* Header */}
      <div className="flex flex-col gap-2 border-b p-4" style={{ borderColor: 'var(--line)', background: 'var(--ink-2)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: 'rgba(198,242,78,0.18)', color: 'var(--lime)' }}>
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#ECECF2]">Ask the issue</h3>
              <p className="text-xs" style={{ color: 'var(--hush)' }}>MeBot reads the portfolio for you</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/chat" className="transition-colors hover:text-[color:var(--lime)]" style={{ color: 'var(--hush)' }} title="Open full chat">
              <Maximize2 size={16} />
            </Link>
            {messages.length > 0 && (
              <button onClick={clearHistory} className="transition-colors hover:text-[#ff6b6b]" style={{ color: 'var(--hush)' }} title="Clear chat history">
                <Trash2 size={16} />
              </button>
            )}
            <button onClick={() => setIsOpen(false)} className="transition-colors hover:text-[#ECECF2]" style={{ color: 'var(--hush)' }} title="Close">
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        {/* Rate Limit Info */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5" style={{ color: remainingQueries < RATE_LIMIT_CONFIG.WARNING_THRESHOLD ? 'var(--gold)' : 'var(--hush)' }}>
            <MessageSquare size={12} />
            <span className="font-medium">{remainingQueries}/{RATE_LIMIT_CONFIG.DAILY_QUERY_LIMIT} queries left</span>
          </div>
          <div className="flex items-center gap-3" style={{ color: 'var(--hush)' }}>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{currentTime} UTC+7</span>
            </div>
            <span>•</span>
            <span>Resets in {timeUntilReset}</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto p-4">
        {/* Warning Banner - Low Queries */}
        {remainingQueries > 0 && remainingQueries < RATE_LIMIT_CONFIG.WARNING_THRESHOLD && (
          <div className="flex items-start gap-2 rounded-lg border p-3" style={{ background: 'rgba(255,182,39,0.08)', borderColor: 'rgba(255,182,39,0.3)' }}>
            <AlertTriangle size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--gold)' }} />
            <div className="text-xs" style={{ color: 'var(--gold)' }}>
              <p className="font-medium">Only {remainingQueries} queries remaining today</p>
              <p className="mt-0.5 opacity-70">Resets at midnight UTC+7 ({timeUntilReset})</p>
            </div>
          </div>
        )}

        {/* Error Banner - Rate Limit or Storage */}
        {rateLimitError && (
          <div className="flex items-start gap-2 rounded-lg border p-3" style={{ background: 'rgba(255,107,107,0.08)', borderColor: 'rgba(255,107,107,0.3)' }}>
            <AlertTriangle size={16} className="mt-0.5 shrink-0 text-[#ff6b6b]" />
            <div className="text-xs text-[#ff9b9b]">
              <p className="font-medium">{rateLimitError}</p>
              {isRateLimited && <p className="mt-0.5 opacity-70">Try again after midnight UTC+7</p>}
            </div>
          </div>
        )}

        {messages.length === 0 && (
          <div className="space-y-4 py-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'var(--ink-3)', color: 'var(--lime)' }}>
              <Sparkles size={30} />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-[#ECECF2]">Ask me anything about Julius.</p>
              <p className="px-6 text-xs" style={{ color: 'var(--hush)' }}>His projects, journey, or the tech behind them — I&apos;ll point you to the page.</p>
            </div>

            {/* Suggestions */}
            <div className="flex flex-wrap justify-center gap-2 px-4 pt-4">
              {['What is AI Trader?', 'Tell me about NovelGit', 'Why choose Next.js?'].map((q) => (
                <button
                  key={q}
                  onClick={() => setInputValue(q)}
                  disabled={isRateLimited}
                  className="rounded-full border px-3 py-1.5 text-xs transition-colors hover:border-[color:var(--lime)] hover:text-[color:var(--lime)] disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ borderColor: 'var(--line)', color: 'var(--hush)' }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => {
          const jumps = m.role === 'assistant' ? extractJumps(m.content) : [];
          return (
            <div key={m.id} className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={m.role === 'user' ? { background: 'var(--lime)', color: '#0b0b12' } : { background: 'var(--ink-3)', color: 'var(--hush)' }}
              >
                {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div
                className={`relative max-w-[82%] rounded-2xl px-4 py-2 text-sm ${m.role === 'user' ? 'rounded-tr-sm font-medium' : 'rounded-tl-sm border'}`}
                style={m.role === 'user' ? { background: 'var(--lime)', color: '#0b0b12' } : { background: 'var(--ink-2)', color: '#d6d6de', borderColor: 'var(--line)' }}
              >
                {m.role === 'assistant' ? (
                  <>
                    <div className={`prose prose-invert prose-sm max-w-none
                      prose-p:leading-relaxed prose-p:my-2
                      prose-ul:my-3 prose-ul:list-disc prose-ul:pl-5
                      prose-ol:my-3 prose-ol:list-decimal prose-ol:pl-5
                      prose-li:my-1
                      prose-strong:text-[#c6f24e] prose-strong:font-semibold
                      prose-headings:text-[#ECECF2] prose-headings:font-bold
                      ${expandedMessageId === m.id ? '' : 'line-clamp-6'}`}>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          a: ({ href, children, ...props }) => {
                            if (isInternal(href)) {
                              return (
                                <a
                                  href={href}
                                  onClick={(e) => { e.preventDefault(); handleJump(href!); }}
                                  className="inline-flex items-center gap-1 text-[#c6f24e] underline hover:opacity-80"
                                >
                                  {children}
                                  <CornerDownRight size={12} />
                                </a>
                              );
                            }
                            return (
                              <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#c6f24e] underline hover:opacity-80" {...props}>
                                {children}
                                <ExternalLink size={12} />
                              </a>
                            );
                          },
                          code: ({ inline, ...props }: ComponentPropsWithoutRef<'code'> & { inline?: boolean }) =>
                            inline ? (
                              <code className="rounded px-1 py-0.5 text-[#34e0e0]" style={{ background: 'var(--ink-3)' }} {...props} />
                            ) : (
                              <code className="my-2 block rounded p-2" style={{ background: 'var(--ink-3)' }} {...props} />
                            ),
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                    </div>

                    {/* Jump chips — the navigator */}
                    {jumps.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {jumps.map((j) => (
                          <button
                            key={j.href}
                            onClick={() => handleJump(j.href)}
                            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors hover:bg-[color:var(--lime)] hover:text-[#0b0b12]"
                            style={{ borderColor: 'rgba(198,242,78,0.4)', color: 'var(--lime)' }}
                          >
                            <CornerDownRight size={12} />
                            {j.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {m.content.length > 200 && (
                      <button
                        onClick={() => setExpandedMessageId(expandedMessageId === m.id ? null : m.id)}
                        className="mt-2 flex items-center gap-1 text-xs text-[#34e0e0] hover:opacity-80"
                      >
                        <Maximize2 size={12} />
                        {expandedMessageId === m.id ? 'Show less' : 'Expand'}
                      </button>
                    )}
                  </>
                ) : (
                  <div className="whitespace-pre-wrap">{m.content}</div>
                )}
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: 'var(--ink-3)', color: 'var(--hush)' }}>
              <Bot size={14} />
            </div>
            <div className="flex gap-1 rounded-2xl rounded-tl-sm px-4 py-3" style={{ background: 'var(--ink-2)' }}>
              {[0, 0.2, 0.4].map((d) => (
                <motion.div key={d} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: d }} className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--lime)' }} />
              ))}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t p-4" style={{ borderColor: 'var(--line)', background: 'var(--ink)' }}>
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isRateLimited ? 'Rate limit reached — resets midnight UTC+7' : 'Ask the issue…'}
            disabled={isRateLimited}
            className="w-full rounded-full border py-3 pl-5 pr-12 text-sm text-[#ECECF2] outline-none transition-all placeholder:text-[color:var(--hush)] focus:border-[color:var(--lime)] disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: 'var(--ink-2)', borderColor: 'var(--line)' }}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue?.trim() || isRateLimited}
            className="absolute right-2 rounded-full p-2 text-[#0b0b12] shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:shadow-none"
            style={{ background: 'var(--lime)' }}
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen &&
          (spotlight ? (
            // Centered ⌘K spotlight
            <motion.div
              key="spotlight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onMouseDown={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]"
              style={{ background: 'rgba(6,6,12,0.6)', backdropFilter: 'blur(4px)' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onMouseDown={(e) => e.stopPropagation()}
                className="h-[68vh] max-h-[620px] w-full max-w-2xl"
              >
                {panel}
              </motion.div>
            </motion.div>
          ) : (
            // Corner panel (FAB)
            <div className="fixed bottom-24 right-6 z-50 h-[500px] max-h-[80vh] w-[90vw] md:w-[400px]">
              <motion.div
                key="corner"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="h-full w-full"
              >
                {panel}
              </motion.div>
            </div>
          ))}
      </AnimatePresence>

      {/* FAB Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => { setSpotlight(false); setIsOpen((o) => !o); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full text-[#0b0b12] shadow-2xl transition-shadow"
          style={{ background: 'var(--lime)' }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <MessageSquare size={24} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tooltip hint when closed */}
          {!isOpen && (
            <span
              className="pointer-events-none absolute right-full mr-4 flex items-center gap-2 whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium text-[#ECECF2] opacity-0 transition-opacity group-hover:opacity-100"
              style={{ background: 'var(--ink-2)', borderColor: 'var(--line)' }}
            >
              Ask the issue
              <kbd className="rounded border px-1.5 py-0.5 text-[10px]" style={{ borderColor: 'var(--line)', color: 'var(--hush)' }}>⌘K</kbd>
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
}
