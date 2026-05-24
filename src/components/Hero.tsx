import React from 'react';
import { motion } from 'motion/react';
import { Target, Zap, Clock, Users, Flame, ChevronRight } from 'lucide-react';
import { PLATFORM_STATS } from '../data/mockData';

interface HeroProps {
  setCurrentTab: (tab: string) => void;
  isPremium: boolean;
  setIsPremium: (prem: boolean) => void;
  language?: 'ID' | 'EN';
}

export default function Hero({ setCurrentTab, isPremium, setIsPremium, language = 'ID' }: HeroProps) {
  // Let's create some beautiful design parameters
  // Using high-resolution Unsplash vintage clothing stores with a denim navy blue overlay
  const bgImg = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1920';

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-16 sm:py-24 bg-[#0a0f24]">
      {/* Background Image with Dual Layer Texture Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImg}
          alt="Vintage Thrift Culture"
          className="w-full h-full object-cover scale-105 select-none pointer-events-none opacity-20 mix-blend-luminosity filter blur-[1px]"
          referrerPolicy="no-referrer"
        />
        {/* Textured Denim Blue and Deep Navy Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f24] via-[#0a0f24]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f24] via-indigo-950/80 to-transparent opacity-95" />
        {/* Subtle decorative grid lines to evoke radar search aesthetic */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(251,247,240,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(251,247,240,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Content Form - Vertical Flow with Clean Margins and Spacing Gaps */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center space-y-12">
        {/* Radar Competition Alert Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2.5 px-4.5 py-1.5 bg-indigo-950/90 border border-indigo-500/30 rounded-full text-[#FBF7F0] text-xs font-mono font-bold tracking-wider"
        >
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>LIVE COMPETITION ENGINE SECONDS COUNT</span>
        </motion.div>

        {/* Heading & Subtitle aligned vertically with clear margin gaps */}
        <div className="space-y-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight text-white leading-tight uppercase"
          >
            {language === 'ID' ? (
              <>
                BERBURU THRIFT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBF7F0] via-indigo-200 to-indigo-400">LEBIH PINTAR.</span> <br />
                DAPAT LEBIH CEPAT.
              </>
            ) : (
              <>
                THRIFT SMARTER. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBF7F0] via-indigo-200 to-indigo-400">
                  DROP FASTER.
                </span>
              </>
            )}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed opacity-95 font-medium"
          >
            {language === 'ID' 
              ? 'Rebutan drop baju thrift dan slot Jastip super kompetitif. Berlangganan membuatmu antre lebih depan dari yang lain.'
              : 'Super-competitive thrift drop and Jastip slot booking. Subscribing gets you ahead of the public queue.'}
          </motion.p>
        </div>

        {/* Call to Actions - Vertically and Horizontally Spaced Cleanly */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full max-w-lg pt-4"
        >
          <button
            onClick={() => {
              const trackerElt = document.getElementById('realtime-tracker');
              if (trackerElt) {
                trackerElt.scrollIntoView({ behavior: 'smooth' });
              } else {
                setCurrentTab('catalog');
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#FBF7F0] hover:bg-white text-slate-950 font-black rounded-xl shadow-xl hover:scale-[1.02] transition-all border border-[#FBF7F0] group uppercase tracking-wider text-sm cursor-pointer"
          >
            <span>{language === 'ID' ? 'MASUK KATALOG LIVE' : 'ENTER LIVE CATALOG'}</span>
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
          </button>
          
          {!isPremium ? (
            <button
              onClick={() => setCurrentTab('premium')}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all border border-slate-800/80 uppercase tracking-wider text-xs cursor-pointer"
            >
              <Flame className="w-4 h-4 mr-2 text-amber-400 animate-pulse fill-amber-400" />
              <span>{language === 'ID' ? 'DAFTAR PREMIUM RP15K/BULAN' : 'GO PREMIUM FOR RP15K/MONTH'}</span>
            </button>
          ) : (
            <div className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-extrabold rounded-xl font-mono text-xs uppercase tracking-wider">
              {language === 'ID' ? '★ AKUN VIP: AKTIF & SNIPING!' : '★ VIP ACCOUNT: ACTIVE & SNIPING!'}
            </div>
          )}
        </motion.div>

        {/* Bottom high-impact grid for stats and showcases preview */}
        <div className="w-full mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-t border-indigo-950/60 pt-16">
          
          {/* Stats Column */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-6 grid grid-cols-2 gap-8 text-left"
          >
            <div className="border-l-2 border-[#FBF7F0]/40 pl-5 py-2">
              <p className="text-2xl sm:text-3xl font-mono font-black text-white flex items-center">
                <Users className="w-5 h-5 mr-1.5 text-[#FBF7F0]" />
                {PLATFORM_STATS.activeUsersOnline}
              </p>
              <p className="text-xs text-white/90 font-mono uppercase tracking-wider mt-1 font-semibold">Snipers Online</p>
            </div>
            
            <div className="border-l-2 border-[#FBF7F0]/40 pl-5 py-2">
              <p className="text-2xl sm:text-3xl font-mono font-black text-white flex items-center">
                <Zap className="w-5 h-5 mr-1.5 text-amber-400" />
                {PLATFORM_STATS.averageSnipingTime}
              </p>
              <p className="text-xs text-white/90 font-mono uppercase tracking-wider mt-1 font-semibold">Avg. Sniping Lock</p>
            </div>

            <div className="border-l-2 border-[#FBF7F0]/40 pl-5 py-2">
              <p className="text-2xl sm:text-3xl font-mono font-black text-white flex items-center">
                <Clock className="w-5 h-5 mr-1.5 text-sky-400" />
                10m Early
              </p>
              <p className="text-xs text-white/90 font-mono uppercase tracking-wider mt-1 font-semibold">Premium Advantage</p>
            </div>

            <div className="border-l-2 border-[#FBF7F0]/40 pl-5 py-2">
              <p className="text-2xl sm:text-3xl font-mono font-black text-[#FBF7F0] flex items-center">
                <Target className="w-5 h-5 mr-1.5 text-[#FBF7F0]" />
                Rp15.000
              </p>
              <p className="text-xs text-white/90 font-mono uppercase tracking-wider mt-1 font-semibold">Premium Monthly</p>
            </div>
          </motion.div>

          {/* Showcase card preview */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end w-full">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-sm rounded-2xl bg-gradient-to-b from-indigo-950/80 to-[#0a0f24] border border-indigo-500/20 p-6 shadow-2xl shadow-indigo-950/50 text-left"
            >
              {/* Card Ribbon */}
              <div className="absolute top-4 right-4 bg-[#FBF7F0] text-slate-950 text-[10px] font-mono tracking-wider font-extrabold uppercase py-1 px-3.5 rounded-full shadow-lg">
                PLATFORM DEMO
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">VIP Sniper Dashboard</h3>
                  <p className="text-xs text-white/80">Experience hyperfast drop reservations in real time.</p>
                </div>

                {/* Floating active drop mockup */}
                <div className="p-4 bg-slate-900/90 rounded-xl border border-indigo-950/40 space-y-3">
                  <div className="relative rounded-lg overflow-hidden h-40">
                    <img
                      src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400"
                      alt="Product"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-[#0a0f24]/95 px-2.5 py-1 text-[10px] font-mono font-bold text-[#FBF7F0] border border-[#FBF7F0]/35 rounded">
                      ⏰ DROPPING LIVE SOON
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white leading-tight">Vintage Carhartt Canvas Detroits</h4>
                    <p className="text-xs font-mono text-[#FBF7F0] font-black">IDR 850.000</p>
                  </div>

                  {/* Booking / Lock Action UI Demo */}
                  <div className="pt-2">
                    {isPremium ? (
                      <button 
                        onClick={() => setCurrentTab('catalog')}
                        className="w-full bg-[#FBF7F0] text-[#0a0f24] py-2.5 text-xs font-bold rounded-lg hover:gradient-all transition-all flex items-center justify-center space-x-1.5 uppercase tracking-wider"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-500 animate-bounce fill-amber-500" />
                        <span>Instant Sniper Triggered!</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsPremium(true)}
                        className="w-full bg-[#FBF7F0] text-slate-950 hover:bg-white py-2.5 text-xs font-black rounded-lg text-center font-mono uppercase tracking-wider"
                      >
                        🔒 Locked - UNLOCK VIP
                      </button>
                    )}
                  </div>
                </div>

                {/* Premium benefit badges list */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 bg-indigo-950/30 rounded-lg text-center border border-indigo-900/30">
                    <Clock className="w-4 h-4 mx-auto mb-1 text-sky-450" />
                    <span className="text-[9px] font-mono text-white">10m Early</span>
                  </div>
                  <div className="p-2.5 bg-indigo-950/30 rounded-lg text-center border border-indigo-900/30">
                    <Target className="w-4 h-4 mx-auto mb-1 text-[#FBF7F0]" />
                    <span className="text-[9px] font-mono text-white">1-Click buy</span>
                  </div>
                  <div className="p-2.5 bg-indigo-950/30 rounded-lg text-center border border-indigo-900/30">
                    <Zap className="w-4 h-4 mx-auto mb-1 text-[#FBF7F0]" />
                    <span className="text-[9px] font-mono text-white">Radar Alert</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
