import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Zap, Bell, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AlertMessage {
  id: string;
  title: string;
  desc: string;
  type: 'info' | 'success' | 'warn';
  time: string;
}

interface NotificationCenterProps {
  notifications: AlertMessage[];
  onClose: (id: string) => void;
}

export default function NotificationCenter({ notifications, onClose }: NotificationCenterProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {notifications.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`pointer-events-auto p-4 rounded-xl border shadow-2xl flex items-start space-x-3 backdrop-blur bg-slate-950/95 max-w-sm w-full ${
              msg.type === 'success'
                ? 'border-emerald-500/30 shadow-emerald-950/20'
                : msg.type === 'warn'
                ? 'border-rose-500/30 shadow-rose-950/20'
                : 'border-indigo-500/30 shadow-indigo-950/20'
            }`}
          >
            {/* Left Status Icon */}
            <div className="shrink-0 mt-0.5">
              {msg.type === 'success' ? (
                <div className="p-1 bg-emerald-500/10 rounded">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              ) : msg.type === 'warn' ? (
                <div className="p-1 bg-rose-500/10 rounded">
                  <ShieldCheck className="w-4 h-4 text-rose-400" />
                </div>
              ) : (
                <div className="p-1 bg-indigo-500/10 rounded">
                  <Zap className="w-4 h-4 text-sky-450 text-indigo-400 animate-pulse" />
                </div>
              )}
            </div>

            {/* Title and Detail message */}
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-baseline">
                <h5 className="text-xs font-bold font-mono tracking-tight text-white uppercase">{msg.title}</h5>
                <span className="text-[9px] font-mono text-slate-500">{msg.time}</span>
              </div>
              <p className="text-[11px] text-slate-350 leading-relaxed font-sans">{msg.desc}</p>
            </div>

            {/* Closer Button */}
            <button
              onClick={() => onClose(msg.id)}
              className="text-slate-500 hover:text-white text-xs font-bold leading-none shrink-0"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Simulated real-time streaming comments list generator to show in a sidebar ticker on Home page.
export function LiveAlertTicker() {
  const [tickerItems, setTickerItems] = useState([
    { id: '1', user: 'yusuf_thrifts', action: 'applied radar notifications', item: 'Carhartt active', time: 'Just now' },
    { id: '2', user: 'amelia.b', action: 'secured 1-click booking', item: 'Nirvana Vintage Tee', time: '3m ago' },
    { id: '3', user: 'fadhil_retro', action: 'activated Rp15.000 VIP plan', item: 'Upgrade', time: '5m ago' }
  ]);

  useEffect(() => {
    // Generate new mock actions periodically to keep user interface feel hyperactive
    const interval = setInterval(() => {
      const mockUsers = ['chandra_vntg', 'diana_thrift', 'reza_grails', 'putri_snipz', 'zack_vintage', 'toriq_co'];
      const mockActions = [
        'sniped instant slot', 
        'configured Telegram webhook', 
        'completed early-access check', 
        'locked physical jastip delivery'
      ];
      const mockItems = ['Levi\'s Big E Selvedge', 'Jordan 1 Royal OG', 'Stussy Coach Jacket', 'Nike 94 Crewneck'];
      
      const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      const randomAction = mockActions[Math.floor(Math.random() * mockActions.length)];
      const randomItem = mockItems[Math.floor(Math.random() * mockItems.length)];
      
      const newItem = {
        id: Math.random().toString(),
        user: randomUser,
        action: randomAction,
        item: randomItem,
        time: 'Just now'
      };

      setTickerItems((prev) => [newItem, ...prev.slice(0, 4)]);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-950/60 border border-indigo-950 rounded-xl p-5 space-y-4">
      <div className="flex items-center space-x-2">
        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
        <span className="text-[10px] uppercase font-mono font-bold text-white tracking-widest flex items-center">
          <Bell className="w-3.5 h-3.5 mr-1 text-indigo-400" /> Live Platform Concurrency Activity
        </span>
      </div>

      <div className="space-y-3">
        {tickerItems.map((act) => (
          <div key={act.id} className="text-xs font-mono space-y-1 p-2.5 bg-slate-900/40 rounded border border-indigo-950/40 transition-all">
            <div className="flex justify-between text-[10px] text-slate-500">
              <span className="text-indigo-400 font-bold">@{act.user}</span>
              <span>{act.time}</span>
            </div>
            <p className="text-slate-300">
              {act.action} of <strong className="text-white font-sans font-bold">{act.item}</strong>.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
