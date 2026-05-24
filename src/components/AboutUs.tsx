import React from 'react';
import { Cpu, Landmark } from 'lucide-react';

interface AboutUsProps {
  onShowNotification: (title: string, desc: string, type: 'info' | 'success' | 'warn') => void;
}

export default function AboutUs({ onShowNotification }: AboutUsProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Story copy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-1 px-3 py-1 bg-indigo-950/80 border border-indigo-500/30 rounded text-xs font-mono text-indigo-400">
            <Landmark className="w-3.5 h-3.5" />
            <span>THE ORIGIN STORY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            WHY WE BUILT <br />
            <span className="text-indigo-400">SNIPEDROP</span> JASTIP
          </h2>

          <div className="space-y-4 text-slate-400 text-sm leading-relaxed font-sans">
            <p>
              In the fast-paced world of vintage streetwear, seconds matter. Rare 90s Carhartt canvas workwear, double-stitched band tees, and archival tech jackets sell out in single moments. Traditional curators post on Instagram, leaving thousands of buyers refreshing comment sections in vain, resulting in bidding chaos and vendor headaches.
            </p>
            <p>
              <strong>SnipeDrop was conceptualized to solve this bottleneck.</strong> We aggregate the premium inventory from curated global vintage vendors under a unified slot booking engine. Using high-speed transactional logic and instant SMS or Telegram push dispatch alerts, we bridge the gap between collectors and sellers cleanly.
            </p>
            <p>
              By offering our premium advantage at a friendly Rp15.000 entry point, we equalize the playing field, making sure premium collector grails end up in the hands of passionate humans rather than script bots.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-indigo-950 text-center">
              <p className="text-2xl font-mono font-bold text-indigo-400">0.82s</p>
              <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase">Avg Secure Speed</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-indigo-950 text-center">
              <p className="text-2xl font-mono font-bold text-emerald-400">Rp15K</p>
              <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase">Monthly VIP Fee</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-indigo-950 text-center">
              <p className="text-2xl font-mono font-bold text-sky-400">100%</p>
              <p className="text-[10px] text-slate-500 font-mono mt-1 uppercase">Legit Verified</p>
            </div>
          </div>
        </div>

        {/* Story Illustration Graphic */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden border border-indigo-950 shadow-2xl h-80 lg:h-96">
            <img 
              src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=1000"
              alt="Vintage denim culture racks"
              className="w-full h-full object-cover filter brightness-75 scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-950/90 border border-indigo-500/20 rounded-xl backdrop-blur">
              <p className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" /> PRO PLATFORM METRICS
              </p>
              <p className="text-[11px] text-slate-450 leading-relaxed mt-1">
                Combining lightning server response times, relational indexing, and clean atomic locks to prevent double-billing in high concurrency drops.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
