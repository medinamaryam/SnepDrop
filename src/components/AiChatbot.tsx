import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Clock, Sparkles, Check } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  time: string;
}

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hello! I am your AI Assistant at SnipeDrop. 🎯 Need help securing custom regional thrift drops or checking out via Jastip slots? Let me know!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggestions list for rapid firing single-click user answers
  const suggestions = [
    "What is Premium VIP?",
    "How does Jastip work?",
    "How fast is the Instant Sniper?",
    "Where do the drops come from?"
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Structure the history correctly
      const chatHistory = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          chatHistory: chatHistory
        })
      });

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: 'assistant',
        text: data.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.warn('AI support assistant network fallback active:', error);
      
      // Resilient local simulation if backend network is unreachable
      setTimeout(() => {
        const fallbackText = `I am currently operating in high-speed offline mode. For full remote AI answers, ensure server.ts is compiling. \n\n**Quick Answer**: SnipeDrop offers physical thrift curation spots from Japan and Indonesia. For only *Rp15.000*, you can skip queues completely! Let me know if you want me to help you navigate there.`;
        setMessages(prev => [
          ...prev,
          {
            id: Math.random().toString(),
            role: 'assistant',
            text: fallbackText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 700);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Small floating action toggle trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-2xl border border-indigo-400/30 flex items-center justify-center transition-all duration-300 hover:scale-105 group relative cursor-pointer"
          title="Open Customer Support Assistant"
          id="toggle-chatbot-button"
        >
          <MessageSquare className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500"></span>
          </span>
          <div className="absolute right-14 bg-slate-950 text-indigo-300 text-[11px] font-mono border border-indigo-500/20 px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg select-none pointer-events-none">
            SnipeDrop AI Assistant Live
          </div>
        </button>
      )}

      {/* Embedded Chat Bubble window Container */}
      {isOpen && (
        <div 
          className="bg-[#070b1e] border border-indigo-500/30 rounded-2xl w-80 sm:w-96 h-[480px] shadow-2xl flex flex-col justify-between overflow-hidden relative"
          id="assistant-chat-container"
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-slate-950 to-indigo-950 p-4 border-b border-indigo-500/20 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 bg-indigo-550/20 border border-indigo-500/30 rounded-lg text-indigo-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white text-xs font-black tracking-tight uppercase flex items-center gap-1.5">
                  SnipeDrop AI Assistant
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </h4>
                <div className="flex items-center space-x-1 mt-0.5">
                  <span className="text-[10px] font-mono text-indigo-300">Curator Support Bot</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white bg-slate-900/60 p-1.5 rounded-lg border border-indigo-950 transition-colors"
              title="Minimize chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Dialog Viewport scrollable */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/20 scrollbar-thin scrollbar-thumb-indigo-950">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-900 text-slate-200 rounded-tl-none border border-indigo-950'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-500 font-mono mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="bg-slate-900 border border-indigo-950 rounded-2xl rounded-tl-none px-3.5 py-2.5 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-[9px] text-slate-500 font-mono mt-1">Synergy diagnostics active...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Click Recommendation Chips */}
          <div className="px-4 py-2 border-t border-indigo-950 bg-slate-950 flex flex-wrap gap-1.5 max-h-24 overflow-y-auto shrink-0 scrollbar-none">
            {suggestions.map((s, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(s)}
                className="text-[10px] bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-500/20 text-indigo-300 font-mono py-1 px-2 rounded-full cursor-pointer transition-colors active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Form Input submit panel */}
          <form 
            onSubmit={handleFormSubmit}
            className="p-3 bg-slate-950 border-t border-indigo-950/80 flex items-center space-x-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Ask SnipeDrop AI Support..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-slate-900 border border-indigo-950 text-white rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="bg-indigo-600 hover:bg-indigo-505 disabled:opacity-40 text-white p-2 rounded-xl border border-indigo-500/30 transition-colors flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
