'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Bot, Trash2, Copy, Check, X, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    const savedTimestamp = localStorage.getItem('chatHistoryTimestamp');
    
    if (savedMessages && savedTimestamp) {
      try {
        const timestamp = parseInt(savedTimestamp, 10);
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;
        
        if (now - timestamp < twentyFourHours) {
          setMessages(JSON.parse(savedMessages));
        } else {
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all chat history?')) {
      setMessages([]);
      localStorage.removeItem('chatHistory');
      localStorage.removeItem('chatHistoryTimestamp');
    }
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const copyMessage = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Ask MeBot</h1>
                <p className="text-xs text-slate-400">Ask anything about Julius</p>
              </div>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
              Clear History
            </button>
          )}
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {messages.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-slate-800/50 rounded-full mx-auto flex items-center justify-center text-slate-600 mb-6">
                <Sparkles size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-200 mb-2">
                Hello! I&apos;m Julius&apos;s AI Assistant
              </h2>
              <p className="text-slate-400 mb-8">
                Ask me about his projects, journey, thesis, or technical skills.
              </p>
              <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                {['What is Batavia?', 'Tell me about RandL', 'Why choose Next.js?', 'How can I contact you?'].map((q) => (
                  <button
                    key={q}
                    onClick={() => setInputValue(q)}
                    className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <div className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div
                      className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        m.role === 'user'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`flex items-center gap-2 mb-2 ${m.role === 'user' ? 'justify-end' : ''}`}>
                        <span className="text-sm font-medium text-slate-300">
                          {m.role === 'user' ? 'You' : 'MeBot'}
                        </span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => copyMessage(m.content, m.id)}
                            className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                            title="Copy message"
                          >
                            {copiedId === m.id ? <Check size={14} /> : <Copy size={14} />}
                          </button>
                          <button
                            onClick={() => deleteMessage(m.id)}
                            className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-red-400 transition-colors"
                            title="Delete message"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          m.role === 'user'
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white ml-auto max-w-2xl'
                            : 'bg-slate-800/50 text-slate-200 border border-slate-700/50'
                        }`}
                      >
                        {m.role === 'assistant' ? (
                          <div className="prose prose-invert prose-sm max-w-none 
                            prose-p:leading-relaxed prose-p:my-2 
                            prose-ul:my-3 prose-ul:list-disc prose-ul:pl-5
                            prose-ol:my-3 prose-ol:list-decimal prose-ol:pl-5
                            prose-li:my-1 prose-li:text-slate-200
                            prose-strong:text-cyan-300 prose-strong:font-semibold
                            prose-headings:text-slate-100 prose-headings:font-bold">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                a: ({ href, children, ...props }) => {
                                  const isInternal = href?.startsWith('/');
                                  if (isInternal) {
                                    return (
                                      <Link
                                        href={href || '#'}
                                        className="text-cyan-400 hover:text-cyan-300 underline"
                                      >
                                        {children}
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
                                    <code className="bg-slate-700 px-1.5 py-0.5 rounded text-cyan-300 text-xs" {...props} /> :
                                    <code className="block bg-slate-700 p-3 rounded my-2 text-xs" {...props} />
                                ),
                              }}
                            >
                              {m.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap">{m.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center">
                    <Bot size={20} />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-slate-300 mb-2 block">MeBot</span>
                    <div className="bg-slate-800/50 rounded-2xl px-4 py-3 border border-slate-700/50 flex gap-1">
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-slate-500 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-slate-500 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-slate-500 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input Area */}
      <footer className="sticky bottom-0 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="relative">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about Julius..."
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-2xl pl-6 pr-14 py-4 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-600"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue?.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white shadow-lg disabled:opacity-50 disabled:shadow-none hover:shadow-cyan-500/20 transition-all transform hover:scale-105 active:scale-95"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}
