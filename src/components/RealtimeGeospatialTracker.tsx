import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Globe, Activity, Radar, TrendingUp, Clock, CheckCircle } from 'lucide-react';

interface RealtimeGeospatialTrackerProps {
  language?: 'ID' | 'EN';
}

interface Marker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  x: number;
  y: number;
  activeDrop: string;
  store: string;
  snipersCount: number;
}

export default function RealtimeGeospatialTracker({ language = 'EN' }: RealtimeGeospatialTrackerProps) {
  const [selectedMarkerId, setSelectedMarkerId] = useState<string>('atm');
  const [simulatedTimer, setSimulatedTimer] = useState<number>(240); // 4 minutes in seconds
  const [lastSnipeLog, setLastSnipeLog] = useState<string>('');
  const [activeTracerPos, setActiveTracerPos] = useState<number>(0);
  const [activeTab, setActiveTab ] = useState<'routes' | 'snipers'>('routes');

  const markers: Marker[] = [
    {
      id: 'atm',
      name: language === 'ID' ? 'Alun-Alun Taman Merdeka' : 'Taman Merdeka Square',
      lat: -2.1241,
      lng: 106.1132,
      x: 480,
      y: 180,
      activeDrop: language === 'ID' ? 'Cargo Vintage - Gerai Pangkalpinang' : 'Vintage Cargo - Pangkalpinang Store',
      store: 'Pangkalpinang Thrift Center',
      snipersCount: 112
    },
    {
      id: 'selindung',
      name: language === 'ID' ? 'Bes Cinema Selindung' : 'Bes Cinema Selindung',
      lat: -2.0911,
      lng: 106.1112,
      x: 220,
      y: 100,
      activeDrop: language === 'ID' ? 'Cargo Pants Vintage Belel' : 'Faded Vintage Cargo Pants',
      store: 'Gerai Retro Selindung',
      snipersCount: 45
    },
    {
      id: 'bintang',
      name: language === 'ID' ? 'Kampung Bintang Hub' : 'Kampung Bintang Hub',
      lat: -2.1288,
      lng: 106.1265,
      x: 620,
      y: 140,
      activeDrop: language === 'ID' ? 'Jaket Woolen Vintage Prada' : 'Vintage Woolen Cardigan Prada',
      store: 'Bintang Vintage Corner',
      snipersCount: 79
    },
    {
      id: 'depati_amir',
      name: language === 'ID' ? 'Bandara Depati Amir' : 'Depati Amir Airport Hub',
      lat: -2.1643,
      lng: 106.1394,
      x: 780,
      y: 320,
      activeDrop: language === 'ID' ? 'Kaos Band Nirvana 1993' : 'Nirvana 1993 Vintage Band Tee',
      store: 'Depati Cargo & Apparel',
      snipersCount: 61
    }
  ];

  const selectedMarker = markers.find(m => m.id === selectedMarkerId) || markers[0];

  // Simulated countdown for the live sniper ETA
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedTimer(prev => {
        if (prev <= 1) return 240;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulated sniper logging feed
  useEffect(() => {
    const interval = setInterval(() => {
      const randomSniper = Math.floor(Math.random() * 900) + 100;
      const randomHub = markers[Math.floor(Math.random() * markers.length)];
      const items = language === 'ID' 
        ? ['Cargo Vintage', 'Oversized Tartan', 'Flannel Uniqlo', 'Kaos Band Nirvana']
        : ['Vintage Cargo', 'Oversized Tartan', 'Flannel Uniqlo', 'Nirvana Vintage Tee'];
      const selectedItem = items[Math.floor(Math.random() * items.length)];
      
      setLastSnipeLog(
        language === 'ID' 
          ? `🎯 Sniper #${randomSniper} mengamankan ${selectedItem} dekat ${randomHub.name}!`
          : `🎯 Sniper #${randomSniper} secured ${selectedItem} near ${randomHub.name}!`
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [language]);

  // Simulated live tracer signal offset
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTracerPos(prev => (prev + 1) % 100);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const dict = {
    title: language === 'ID' ? 'Pelacak Real-time' : 'Real-time Tracker',
    subtitle: language === 'ID' ? 'Pelacakan Geospasial' : 'Geospatial Tracking',
    badgeGeospatial: '✦ GEOSPATIAL ENABLED',
    badgeLive: '● LIVE NOW',
    inProgress: language === 'ID' ? 'Sedang Berjalan' : 'In Progress',
    routingMap: language === 'ID' ? 'Rute Pengiriman / Peta Server' : 'Delivery Route & Server Nodes',
    activeDropping: language === 'ID' ? 'SEDANG DROP' : 'DROPPING NOW',
    liveSniperTracker: language === 'ID' ? 'PENGIRIMAN JASTIP' : 'JASTIP DELIVERY',
    storeOwner: language === 'ID' ? 'Pemilik Toko' : 'Store Owner',
    activeHunter: language === 'ID' ? 'Hunter Aktif' : 'Active Hunters',
    etaText: language === 'ID' ? 'Sisa Waktu' : 'ETA Remaining',
    clickNode: language === 'ID' ? 'Pelacakan rute kurir jastip langsung melintasi Kota Pangkalpinang (Bangka).' : 'Live mapping of jastip courier tracks across Pangkalpinang City (Bangka).',
    liveLogs: language === 'ID' ? 'Log Server Lokal' : 'Local Server Logs'
  };

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  return (
    <section id="realtime-tracker" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-8 sm:-mt-12 mb-16">
      <div className="bg-slate-900/85 border border-indigo-950 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
        
        {/* Decorative backdrop gradients */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-950/60 pb-6 mb-6 text-left">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-950 text-indigo-400 border border-indigo-500/25 text-[11px] font-mono rounded font-bold uppercase tracking-wider">
                {dict.badgeGeospatial}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 text-emerald-400 border border-emerald-500/20 text-[11px] font-mono rounded font-bold uppercase tracking-wide animate-pulse">
                {dict.badgeLive}
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight flex flex-wrap items-baseline gap-2 mt-2">
              <span>{dict.title}</span>
              <span className="text-indigo-500 text-lg font-mono font-normal">[{dict.subtitle}]</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans mt-0.5">
              {dict.clickNode}
            </p>
          </div>

          <div className="flex space-x-2 md:self-end shrink-0">
            <button
              onClick={() => setActiveTab('routes')}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all border ${
                activeTab === 'routes' 
                  ? 'bg-indigo-950 border-indigo-500/30 text-indigo-400' 
                  : 'bg-transparent border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Radar className="w-3.5 h-3.5 inline mr-1.5" />
              {language === 'ID' ? 'KONEKSI AKTIF' : 'ACTIVE SEGMENTS'}
            </button>
            <button
              onClick={() => setActiveTab('snipers')}
              className={`px-3 py-1.5 text-xs font-mono font-bold rounded-lg transition-all border ${
                activeTab === 'snipers' 
                  ? 'bg-indigo-950 border-indigo-500/30 text-indigo-400' 
                  : 'bg-transparent border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5 inline mr-1.5" />
              {language === 'ID' ? 'PETA TELEMETRI' : 'TELEMETRY MAP'}
            </button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Map Container Column */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            
            <div className="relative aspect-[16/9] w-full bg-slate-950/75 border border-indigo-950/80 rounded-xl overflow-hidden shadow-inner flex flex-col justify-between p-4 group select-none">
              
              {/* Radar Sweeper Overlays */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.02)_0%,transparent_70%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />
              <div className="absolute w-full h-[2px] bg-indigo-500/15 top-0 left-0 animate-pulse pointer-events-none" />

              {/* Legend Badge */}
              <div className="absolute top-4 left-4 z-15 bg-slate-900/95 border border-indigo-950/50 rounded-lg p-2.5 backdrop-blur-sm pointer-events-none text-left">
                <span className="text-[9px] font-mono text-slate-400 block uppercase tracking-widest leading-none">
                  {dict.routingMap}
                </span>
                <span className="text-xs font-bold text-[#FBF7F0] font-mono mt-1 block">
                  FASTEST ASIA EDGE PROXY
                </span>
              </div>

              {/* SVG Map Canvas */}
              <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Abstract Archipelago Skeleton Paths */}
                <g opacity="0.10" stroke="#6366F1" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
                  {/* Abstraction of Bangka Coastline contouring Pangkalpinang */}
                  <path d="M 120 40 L 260 20 L 400 30 L 520 80 L 680 120 L 820 190 L 910 280 L 890 350 L 710 370 L 590 360 L 480 340 L 320 280 L 190 190 L 90 110 Z" />
                </g>

                {/* Radar Grid Circles */}
                <g opacity="0.12" stroke="#4F46E5" strokeWidth="1" strokeDasharray="3,3">
                  <circle cx="480" cy="180" r="45" />
                  <circle cx="220" cy="100" r="55" />
                </g>

                {/* SVG Route Paths */}
                <path d="M 220 100 L 480 180" stroke="#4F46E5" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.4" />
                <path d="M 480 180 L 620 140" stroke="#4F46E5" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.4" />
                <path d="M 620 140 L 780 320" stroke="#4F46E5" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.4" />

                {/* Moving Signal Pulse Lines using SVG Gradients */}
                <path d="M 220 100 L 480 180" stroke="url(#grad-selindung-atm)" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                <path d="M 480 180 L 620 140" stroke="url(#grad-atm-bintang)" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                <path d="M 620 140 L 780 320" stroke="url(#grad-bintang-depati)" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

                <defs>
                  <linearGradient id="grad-selindung-atm" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset={`${Math.max(0, activeTracerPos - 15)}%`} stopColor="#4F46E5" stopOpacity="0"/>
                    <stop offset={`${activeTracerPos}%`} stopColor="#10B981" stopOpacity="1"/>
                    <stop offset={`${Math.min(100, activeTracerPos + 15)}%`} stopColor="#4F46E5" stopOpacity="0"/>
                  </linearGradient>
                  
                  <linearGradient id="grad-atm-bintang" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset={`${Math.max(0, 100 - activeTracerPos - 15)}%`} stopColor="#4F46E5" stopOpacity="0"/>
                    <stop offset={`${100 - activeTracerPos}%`} stopColor="#8B5CF6" stopOpacity="1"/>
                    <stop offset={`${Math.min(100, 100 - activeTracerPos + 15)}%`} stopColor="#4F46E5" stopOpacity="0"/>
                  </linearGradient>
                  
                  <linearGradient id="grad-bintang-depati" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset={`${Math.max(0, activeTracerPos - 15)}%`} stopColor="#4F46E5" stopOpacity="0"/>
                    <stop offset={`${activeTracerPos}%`} stopColor="#3B82F6" stopOpacity="1"/>
                    <stop offset={`${Math.min(100, activeTracerPos + 15)}%`} stopColor="#4F46E5" stopOpacity="0"/>
                  </linearGradient>
                </defs>

                {/* Simulated Moving Coordinate Bullets */}
                <circle cx={220 + ((480 - 220) * (activeTracerPos / 100))} cy={100 + ((180 - 100) * (activeTracerPos / 100))} r="4" fill="#10B981" />
                <circle cx={480 + ((620 - 480) * (Math.abs(50 - activeTracerPos) / 50))} cy={180 + ((140 - 180) * (Math.abs(50 - activeTracerPos) / 50))} r="4" fill="#A78BFA" />

                {/* Render Interactive Pinpoint Markers */}
                {markers.map((marker) => {
                  const isSelected = marker.id === selectedMarkerId;
                  return (
                    <g key={marker.id} className="cursor-pointer" onClick={() => setSelectedMarkerId(marker.id)}>
                      {/* Interactive Target Areas */}
                      <circle cx={marker.x} cy={marker.y} r={isSelected ? 22 : 14} className={`stroke-indigo-500/20 fill-transparent stroke-1 ${isSelected ? 'animate-ping' : ''}`} />
                      <circle cx={marker.x} cy={marker.y} r={isSelected ? 11 : 7} className={`transition-all duration-200 ${isSelected ? 'fill-indigo-950/80 stroke-indigo-400 stroke-2' : 'fill-slate-900 stroke-indigo-950/90'}`} />
                      <circle cx={marker.x} cy={marker.y} r="3" className={`transition-all ${isSelected ? 'fill-emerald-400' : 'fill-indigo-450'}`} />
                      
                      {/* Anchor Text Label */}
                      <text x={marker.x} y={marker.y - 15} textAnchor="middle" className={`text-[10px] font-mono font-black select-none pointer-events-none transition-colors ${isSelected ? 'fill-white' : 'fill-slate-500'}`}>
                        {marker.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Real-time Overlay Cards directly on top of visual map container */}
              <div className="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pointer-events-none">
                
                {/* Overlay Card 1: DROPPING NOW / SEDANG DROP */}
                <div className="bg-slate-900/95 border border-indigo-950 p-3 rounded-xl backdrop-blur-md shadow-xl flex items-center gap-3 border-l-4 border-l-emerald-500 pointer-events-auto">
                  <div className="p-2 bg-emerald-950/40 rounded shrink-0">
                    <CheckCircle className="w-4 h-4 text-emerald-400 animate-pulse" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-mono text-emerald-400 block font-bold tracking-widest leading-none">
                      ⚡ {language === 'ID' ? 'SEDANG DROP' : 'DROPPING NOW'}
                    </span>
                    <span className="text-[11px] font-bold text-white block mt-1 truncate">
                      {language === 'ID' ? 'Cargo Vintage - Gerai Pangkalpinang' : 'Vintage Cargo - Pangkalpinang Store'}
                    </span>
                    <span className="text-[9px] text-slate-400 block font-mono">
                      {language === 'ID' ? 'Katalog Terbatas Terverifikasi' : 'Verified Limited Catalog'}
                    </span>
                  </div>
                </div>

                {/* Overlay Card 2: JASTIP DELIVERY / PENGIRIMAN JASTIP */}
                <div className="bg-slate-900/95 border border-indigo-950 p-3 rounded-xl backdrop-blur-md shadow-xl flex items-center gap-3 border-l-4 border-l-indigo-500 pointer-events-auto">
                  <div className="p-2 bg-indigo-950/40 rounded shrink-0">
                    <Navigation className="w-4 h-4 text-indigo-400 animate-bounce" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-mono text-indigo-400 block font-bold tracking-widest leading-none">
                      🧭 {language === 'ID' ? 'PENGIRIMAN JASTIP' : 'JASTIP DELIVERY'}
                    </span>
                    <span className="text-[11px] font-bold text-white block mt-1 truncate">
                      {language === 'ID' ? 'Menuju Alun-Alun Taman Merdeka (ETA: 4 mnt)' : 'Heading to Alun-Alun Taman Merdeka (ETA: 4m)'}
                    </span>
                    <span className="text-[9px] text-slate-400 block font-mono">
                      {language === 'ID' ? 'Sistem Navigasi Kurir Aktif' : 'Courier Navigational System Active'}
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Sub-ticker logs */}
            <div className="bg-slate-950/80 border border-indigo-950/60 rounded-xl p-3.5 flex items-center gap-3 text-left">
              <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-900 border border-indigo-950 rounded font-mono text-[9px] font-bold text-indigo-300 uppercase shrink-0">
                {dict.liveLogs}
              </div>
              <div className="text-xs font-mono text-slate-400 truncate flex-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={lastSnipeLog}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.15 }}
                    className="truncate"
                  >
                    {lastSnipeLog || (language === 'ID' ? '📡 Sinkronisasi server selesai. Menunggu sirkulasi target.' : '📡 Server sync complete. Watching live target queues.')}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Regional Information Card Sidebar */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4 text-left">
            <div className="bg-slate-950/40 border border-indigo-950/85 rounded-xl p-5 space-y-6 h-full flex flex-col justify-between">
              
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-mono text-indigo-400 block uppercase tracking-widest leading-none">
                    Telemetry Focus Region
                  </span>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight mt-1.5">
                    {selectedMarker.name}
                  </h3>
                </div>

                <div className="space-y-3.5 pt-4 border-t border-indigo-950/50">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">
                      {dict.storeOwner}
                    </span>
                    <p className="text-xs font-bold text-[#FBF7F0]">
                      {selectedMarker.store}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">
                      {language === 'ID' ? 'PRODUK PILIHAN' : 'FEATURED ITEM'}
                    </span>
                    <p className="text-xs font-black text-indigo-300">
                      {selectedMarker.activeDrop}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">
                      {dict.activeHunter}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-mono font-bold text-white bg-indigo-950 px-2 py-0.5 rounded border border-indigo-500/20">
                        {selectedMarker.snipersCount}
                      </span>
                      <span className="text-[10px] text-slate-400 font-sans">
                        {language === 'ID' ? 'Hunters Aktif' : 'Active Connections'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cooldown Segment */}
              <div className="pt-4 border-t border-indigo-950/50 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-400">{dict.etaText}</span>
                  <span className="text-emerald-400 font-bold">{formatTime(simulatedTimer)}</span>
                </div>
                
                <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden border border-indigo-950/40">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${(simulatedTimer / 120) * 100}%` }}
                  />
                </div>

                <button
                  onClick={() => {
                    const currentIndex = markers.findIndex(m => m.id === selectedMarkerId);
                    const nextIndex = (currentIndex + 1) % markers.length;
                    setSelectedMarkerId(markers[nextIndex].id);
                  }}
                  className="w-full py-2 bg-indigo-900/20 hover:bg-indigo-900/50 border border-indigo-500/20 text-indigo-300 hover:text-white font-mono font-bold text-[10px] rounded-lg tracking-wider uppercase transition-all duration-200"
                >
                  {language === 'ID' ? 'PINDAH WILAYAH DATA' : 'SELECT NEXT VPS SEGMENT'} &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
