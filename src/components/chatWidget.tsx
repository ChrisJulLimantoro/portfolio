'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';

// Define a type for the structure of a chat message
interface Message {
  sender: 'AI' | 'You';
  text: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'AI',
      text: "Hello. I'm a custom AI assistant. How can I provide information about Jane Doe's work today?",
    },
  ]);
  const [input, setInput] = useState<string>('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;
    const userMessage: Message = { sender: 'You', text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');

    setMessages((prev) => [...prev, { sender: 'AI', text: '...' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentInput }),
      });
      const data: { response: string } = await response.json();

      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          sender: 'AI',
          text: data.response,
        };
        return newMessages;
      });
    } catch (error) {
      console.error('Chat API error:', error);
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          sender: 'AI',
          text: "Sorry, I'm having trouble connecting.",
        };
        return newMessages;
      });
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110"
      >
        <svg
          className="w-8 h-8 text-gray-700 dark:text-gray-300"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.81 12.56C16.81 14.77 15.01 16.56 12.81 16.56C12.33 16.56 11.88 16.47 11.47 16.32L10.03 17.76C9.65 18.14 9 17.89 9 17.33V15.7C7.96 15.06 7.19 13.91 7.19 12.56C7.19 10.35 8.99 8.56 11.19 8.56C12.4 8.56 13.5 9.03 14.28 9.81C15.06 10.59 15.53 11.69 15.53 12.89C15.53 12.89 15.53 12.89 15.53 12.9C15.91 12.81 16.34 12.63 16.81 12.56Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M18 9C19.66 9 21 10.34 21 12C21 13.66 19.66 15 18 15C17.7 15 17.41 14.97 17.12 14.91C17.58 14.15 17.81 13.26 17.81 12.29V12.26C17.81 11.23 17.56 10.29 17.07 9.5C17.35 9.18 17.66 9 18 9Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-96 h-[32rem] bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="p-4 text-center font-semibold text-gray-800 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
            AI Assistant
          </div>
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 ${msg.sender === 'AI' ? 'justify-start' : 'justify-end'}`}
              >
                {msg.sender === 'AI' && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0"></div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-xs text-left ${msg.sender === 'AI' ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none' : 'bg-blue-600 text-white rounded-br-none'}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question..."
              className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
