'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, Bot, ChevronDown, Maximize2, ExternalLink, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    const savedTimestamp = localStorage.getItem('chatHistoryTimestamp');
    
    if (savedMessages && savedTimestamp) {
      try {
        const timestamp = parseInt(savedTimestamp, 10);
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        
        // Check if chat history is older than 24 hours
        if (now - timestamp < twentyFourHours) {
          setMessages(JSON.parse(savedMessages));
        } else {
          // Clear expired chat history
          localStorage.removeItem('chatHistory');
          localStorage.removeItem('chatHistoryTimestamp');
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
      localStorage.setItem('chatHistoryTimestamp', Date.now().toString());
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem('chatHistory');
    localStorage.removeItem('chatHistoryTimestamp');
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue?.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

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

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

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

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto mb-4 w-[90vw] md:w-[400px] h-[500px] max-h-[80vh] bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">Ask MeBot</h3>
                  <p className="text-xs text-slate-400">Ask everything about Julius!</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/chat"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                  title="Open full chat"
                >
                  <Maximize2 size={16} />
                </Link>
                {messages.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="text-slate-400 hover:text-red-400 transition-colors"
                    title="Clear chat history"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {messages.length === 0 && (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-full mx-auto flex items-center justify-center text-slate-600">
                    <MessageSquare size={32} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-300 text-sm font-medium">Hello! I&apos;m Julius&apos;s AI Assistant.</p>
                    <p className="text-slate-500 text-xs px-6">Ask me about his projects, journey, thesis, or technical skills.</p>
                  </div>

                  {/* Suggestions */}
                  <div className="flex flex-wrap justify-center gap-2 px-4 pt-4">
                    {['What is Batavia?', 'Tell me about RandL', 'Why choose Next.js?'].map((q) => (
                      <button
                        key={q}
                        onClick={() => setInputValue(q)}
                        className="text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex items-start gap-3 ${
                    m.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      m.role === 'user' ? 'bg-cyan-500 text-black' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2 text-sm max-w-[80%] shadow-sm relative group ${
                      m.role === 'user'
                        ? 'bg-cyan-500 text-slate-900 rounded-tr-sm font-medium'
                        : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700/50'
                    }`}
                  >
                    {m.role === 'assistant' ? (
                      <>
                        <div className={`prose prose-invert prose-sm max-w-none 
                          prose-p:leading-relaxed prose-p:my-2 
                          prose-ul:my-3 prose-ul:list-disc prose-ul:pl-5
                          prose-ol:my-3 prose-ol:list-decimal prose-ol:pl-5
                          prose-li:my-1 prose-li:text-slate-200
                          prose-strong:text-cyan-300 prose-strong:font-semibold
                          prose-headings:text-slate-100 prose-headings:font-bold
                          ${expandedMessageId === m.id ? '' : 'line-clamp-6'}`}>
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              a: ({ node, href, children, ...props }) => {
                                const isInternal = href?.startsWith('/');
                                if (isInternal) {
                                  return (
                                    <Link
                                      href={href || '#'}
                                      className="text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-1"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {children}
                                      <ExternalLink size={12} />
                                    </Link>
                                  );
                                }
                                return (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-400 hover:text-cyan-300 underline"
                                    {...props}
                                  >
                                    {children}
                                  </a>
                                );
                              },
                              code: ({ inline, ...props }: any) => (
                                inline ? 
                                  <code className="bg-slate-700 px-1 py-0.5 rounded text-cyan-300" {...props} /> :
                                  <code className="block bg-slate-700 p-2 rounded my-2" {...props} />
                              ),
                            }}
                          >
                            {m.content}
                          </ReactMarkdown>
                        </div>
                        {m.content.length > 200 && (
                          <button
                            onClick={() => setExpandedMessageId(expandedMessageId === m.id ? null : m.id)}
                            className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
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
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-500 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 bg-slate-900 border-t border-slate-800">
              <div className="relative flex items-center">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your question..."
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-full pl-5 pr-12 py-3 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue?.trim()}
                  className="absolute right-2 p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white shadow-lg disabled:opacity-50 disabled:shadow-none hover:shadow-cyan-500/20 transition-all transform hover:scale-105 active:scale-95"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Toggle */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="pointer-events-auto w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-2xl flex items-center justify-center hover:shadow-cyan-500/30 transition-shadow relative group"
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
          <span className="absolute right-full mr-4 bg-slate-800 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700 pointer-events-none">
            Ask about my journey!
          </span>
        )}
      </motion.button>
    </div>
  );
}
