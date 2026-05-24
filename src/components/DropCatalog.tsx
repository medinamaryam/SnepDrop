import React, { useState, useEffect } from 'react';
import { Search, Filter, Lock, Zap, Clock, ShieldCheck, Tag, Info, AlertTriangle, Heart, Check } from 'lucide-react';
import { ThriftDropItem } from '../types';

interface DropCatalogProps {
  isPremium: boolean;
  setIsPremium: (v: boolean) => void;
  drops: ThriftDropItem[];
  onSnipe: (dropId: string, notes: string) => void;
  setCurrentTab: (tab: string) => void;
  wishlist: string[];
  onToggleWishlist: (dropId: string) => void;
  isLoggedIn: boolean;
  onOpenAuth: () => void;
}

export default function DropCatalog({ 
  isPremium, 
  setIsPremium, 
  drops, 
  onSnipe, 
  setCurrentTab, 
  wishlist, 
  onToggleWishlist,
  isLoggedIn,
  onOpenAuth
}: DropCatalogProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [activeSnipeItem, setActiveSnipeItem] = useState<ThriftDropItem | null>(null);

  // Dynamic Payment States for checkout simulation
  const [selectedPayment, setSelectedPayment] = useState<'shopeepay' | 'ovowallet' | 'gopay_qris' | 'bank_transfer'>('gopay_qris');
  const [paymentStep, setPaymentStep] = useState<'details' | 'simulating' | 'receipt'>('details');
  const [simulatedLog, setSimulatedLog] = useState<string>('');
  const [generatedVoucher, setGeneratedVoucher] = useState<string>('');

  // Re-render of current clock to keep countdowns tick perfectly every 1000ms
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'jackets', label: 'Jackets' },
    { id: 'sweaters', label: 'Sweaters & Fleeces' },
    { id: 'pants', label: 'Pants & Denim' },
    { id: 'tees', label: 'Vintage Tees' },
    { id: 'sneakers', label: 'Retro Sneaks' },
    { id: 'blouses', label: 'Vintage Blouses' },
    { id: 'cardigans', label: 'Cardigans & Knits' },
    { id: 'skirts', label: 'Vintage Skirts' }
  ];

  // Helper to compute countdown seconds and eligibility
  const getDropStatus = (item: ThriftDropItem) => {
    const dropDate = new Date(item.dropTime).getTime();
    
    // Premium tier gets a 10-minute (600,000 ms) advantage!
    const earlyAccessMs = 10 * 60 * 1000;
    const userReleaseTime = isPremium ? (dropDate - earlyAccessMs) : dropDate;
    
    const msLeft = userReleaseTime - time;
    const isUnlocked = msLeft <= 0;

    return {
      isUnlocked,
      msLeft: Math.max(0, msLeft),
      publicMsLeft: Math.max(0, dropDate - time),
      premiumAdvantageActive: !isPremium && (time > (dropDate - earlyAccessMs)) && (time < dropDate)
    };
  };

  const formatCountdown = (ms: number) => {
    if (ms <= 0) return '00:00:00';
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  };

  const filteredDrops = drops.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.brand.toLowerCase().includes(search.toLowerCase()) ||
                          item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleOpenSnipeModal = (item: ThriftDropItem) => {
    setActiveSnipeItem(item);
    setBookingNotes('');
    setPaymentStep('details');
    setSimulatedLog('');
    setSelectedPayment('gopay_qris');
  };

  const handleConfirmSnipe = () => {
    if (!activeSnipeItem) return;
    
    setPaymentStep('simulating');
    setSimulatedLog('⚡ Initializing high-stakes Jastip secure connection... (0.01s)');
    
    setTimeout(() => {
      setSimulatedLog('💰 Connecting to virtual wallet point-of-sale terminal...');
    }, 600);
    
    setTimeout(() => {
      setSimulatedLog(`💸 Processed dynamic deduction via Mock ${selectedPayment.toUpperCase()} ledger...`);
    }, 1300);
    
    setTimeout(() => {
      setSimulatedLog('🔒 Physical stock successfully locked! Securing regional courier assignment...');
    }, 1900);

    setTimeout(() => {
      const secureVoucherCode = `SD-SLOT-${Math.floor(100000 + Math.random() * 900000)}`;
      setGeneratedVoucher(secureVoucherCode);
      setPaymentStep('receipt');
      onSnipe(activeSnipeItem.id, `Simulated check via ${selectedPayment}. Notes: ${bookingNotes || 'Thrift Hunt Instant Lock'}`);
    }, 2600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Search & Header Title */}
      <div className="md:flex md:items-center md:justify-between border-b border-indigo-950/40 pb-6 mb-8">
        <div>
          <h2 className="text-2xl font-black text-white font-sans uppercase tracking-tight flex items-center">
            LIVE CURATED CATALOGS
            <span className="ml-2.5 px-2 py-0.5 text-xs bg-indigo-900 border border-indigo-500/30 text-indigo-300 font-mono rounded">
              REAL-TIME SYNC
            </span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">High-stakes thrift battleground. Items claimable via rapid Jastip slots.</p>
        </div>

        {/* Dynamic User tier banner helper */}
        <div className="mt-4 md:mt-0 px-4 py-2 bg-gradient-to-r from-indigo-950/80 to-slate-900 rounded-lg border border-indigo-950/80 flex items-center space-x-3">
          <Clock className="w-4 h-4 text-sky-400" />
          <span className="text-xs text-slate-300">
            {isPremium ? (
              <span className="text-emerald-400 font-bold font-mono">
                ✓ Premium Enabled: 10m Early Access active!
              </span>
            ) : (
              <span className="text-slate-400 font-mono">
                Currently Standard Tier.{' '}
                <button 
                  onClick={() => setCurrentTab('premium')}
                  className="text-indigo-400 hover:text-indigo-300 underline font-bold"
                >
                  Unblock early catalog drops &rarr;
                </button>
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Filter and Query controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Filter Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-slate-950 border border-indigo-950/80 rounded-xl p-5 space-y-6 shadow-xl">
            {/* Search Input Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">Search Inventory</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nike, Carhartt, Detroit, XL..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-indigo-950 text-white rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500"
                />
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              </div>
            </div>

            {/* Category Buttons List grouped with premium Women's fashion emphasis */}
            <div className="space-y-4">
              {/* Unisex & Streetwear Section */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center">
                  <Filter className="w-3.5 h-3.5 mr-1 text-indigo-400" />
                  Streetwear & Unisex
                </label>
                <div className="flex flex-wrap lg:flex-col gap-1">
                  {categories.filter(c => !['blouses', 'cardigans', 'skirts'].includes(c.id)).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-indigo-950 border border-indigo-500/30 text-indigo-300 shadow-md shadow-slate-950/80'
                          : 'bg-transparent text-slate-400 hover:bg-slate-900/50 hover:text-slate-100'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {selectedCategory === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Glowing High-Impact Women's Fashion Categories Section */}
              <div className="space-y-2 bg-gradient-to-r from-purple-950/10 to-indigo-950/20 p-3 rounded-2xl border border-purple-500/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-purple-500/10 rounded-full blur-md" />
                
                <label className="text-[10px] font-black text-[#FBF7F0] font-mono uppercase tracking-wider flex items-center space-x-1">
                  <span>🌸</span>
                  <span className="text-[#FBF7F0]">Women's Retro Vault</span>
                </label>
                
                <div className="flex flex-wrap lg:flex-col gap-1">
                  {categories.filter(c => ['blouses', 'cardigans', 'skirts'].includes(c.id)).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-[#FBF7F0]/20 to-purple-950 border border-purple-500/40 text-[#FBF7F0] shadow-md shadow-[#000]'
                          : 'bg-transparent text-slate-350 hover:bg-purple-950/30 hover:text-purple-200'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {selectedCategory === cat.id ? (
                        <span className="w-2 h-2 rounded-full bg-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
                      ) : (
                        <span className="text-[10px] opacity-40">✧</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Informational Notice about Jastip */}
            <div className="p-4 bg-indigo-950/20 border border-indigo-900/30 rounded-lg space-y-2">
              <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <Info className="w-3 h-3 text-sky-400" /> Jastip Slot Mechanics
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                SnipeDrop partners with top global curators to secure physical vintage items. Once you trigger \"Snipe\", our courier immediately secures the item from the source supplier. You pay premium slot fees of Rp15.000 for early access and direct locks.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Responsive Curation Drops Grid */}
        <div className="lg:col-span-9 relative min-h-[400px]">
          
          {!isLoggedIn ? (
            <>
              {/* Blurred catalog cards grid backdrop */}
              <div className="filter blur-md select-none pointer-events-none opacity-30 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {drops.slice(0, 6).map((item) => (
                  <div key={item.id} className="bg-slate-950 rounded-xl border border-indigo-950/80 overflow-hidden shadow-xl p-4 flex flex-col space-y-4">
                    <div className="h-52 bg-slate-900 rounded-lg" />
                    <div className="h-4 bg-slate-900 w-3/4 rounded" />
                    <div className="h-8 bg-slate-900 rounded" />
                  </div>
                ))}
              </div>

              {/* Locked Authenticated Overlay */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4">
                <div className="bg-gradient-to-b from-[#0a0f24] to-slate-950 border border-indigo-505/30 max-w-lg w-full rounded-2xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  {/* Glowing Lock Logo Display */}
                  <div className="inline-flex p-4 bg-indigo-950/80 border border-indigo-500/30 rounded-full text-[#FBF7F0] shadow-lg animate-pulse">
                    <Lock className="w-8 h-8 stroke-[2.5]" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-sans font-black tracking-tight text-white uppercase">Catalog Access Locked</h3>
                    <p className="text-sm text-white/95 leading-relaxed font-semibold max-w-sm mx-auto">
                      Please login to view active thrift drops in your location.
                    </p>
                    <p className="text-xs text-white/60 max-w-xs mx-auto">
                      Connecting you immediately to the target premium regional curate channels from Jakarta, Bandung, and Tokyo.
                    </p>
                  </div>

                  {/* High action CTA Button */}
                  <button
                    onClick={onOpenAuth}
                    className="w-full bg-[#FBF7F0] hover:bg-white text-slate-950 font-black text-xs py-3.5 px-6 rounded-xl border border-[#FBF7F0]/45 uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
                  >
                    Login / Register Now &rarr;
                  </button>
                </div>
              </div>
            </>
          ) : filteredDrops.length === 0 ? (
            <div className="text-center py-24 bg-slate-950 border border-indigo-950/40 rounded-xl p-8">
              <Search className="w-12 h-12 text-slate-655 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white">No Items Matched Your Search</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">Try refining your keyword query or resetting categories file settings to preview everything.</p>
              <button 
                onClick={() => { setSearch(''); setSelectedCategory('all'); }} 
                className="mt-4 px-4 py-2 bg-indigo-900/60 border border-indigo-500/30 text-indigo-300 text-xs rounded-lg font-mono hover:bg-indigo-900/80 transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDrops.map((item) => {
                const { isUnlocked, msLeft, publicMsLeft, premiumAdvantageActive } = getDropStatus(item);
                
                return (
                  <div 
                    key={item.id}
                    className="relative bg-slate-950 rounded-xl border border-indigo-950/80 overflow-hidden shadow-xl flex flex-col group hover:border-indigo-500/30 transition-all duration-300 hover:translate-y-[-2px]"
                  >
                    {/* Item Image and Badge overlays */}
                    <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Sub-gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
 
                      {/* Top left Condition tag */}
                      <span className="absolute top-3 left-3 bg-slate-900/90 text-[10px] font-mono border border-slate-700/60 text-slate-300 px-2 py-0.5 rounded">
                        {item.condition}
                      </span>
 
                      {/* Heart Wishlist Toggle Button */}
                      <button
                        type="button"
                        onClick={() => onToggleWishlist(item.id)}
                        className="absolute top-3 right-15 bg-slate-950/95 border border-indigo-505/30 hover:border-indigo-400 p-1.5 rounded-full shadow-lg hover:bg-slate-900 transition-colors z-15 cursor-pointer"
                        title="Add to personal watchlist"
                      >
                        <Heart 
                          className={`w-3.5 h-3.5 transition-transform active:scale-95 ${
                            wishlist.includes(item.id) 
                              ? 'fill-[#93c5fd] text-blue-300 drop-shadow-[0_0_10px_rgba(147,197,253,0.9)]' 
                              : 'text-slate-400 hover:text-indigo-300'
                          }`} 
                        />
                      </button>
 
                      {/* Top right size display Tag */}
                      <span className="absolute top-3 right-3 bg-indigo-950 text-[11px] font-mono font-bold text-slate-200 border border-indigo-500/30 px-2 py-0.5 rounded shadow">
                        Size {item.size}
                      </span>
 
                      {/* Bottom Image Left category Tag */}
                      <div className="absolute bottom-3 left-3 flex gap-1 items-center">
                        <span className="bg-slate-950/85 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold text-indigo-300 flex items-center space-x-0.5">
                          <Tag className="w-2.5 h-2.5 text-indigo-400" />
                          <span>{item.brand}</span>
                        </span>
                      </div>
                    </div>
 
                    {/* Card Body and Controls */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                      
                      {/* Title & tags */}
                      <div className="space-y-1.5">
                        <h4 className="text-sm font-bold text-white tracking-tight leading-snug hover:text-indigo-300 cursor-pointer min-h-[40px]">
                          {item.title}
                        </h4>
                        
                        <div className="flex flex-wrap gap-1">
                          {item.tags.map((tag) => (
                            <span key={tag} className="text-[9px] bg-indigo-950/20 text-slate-455 px-1.5 py-0.5 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
 
                      {/* Pricing and real-time release controller */}
                      <div className="pt-2 border-t border-indigo-950/40">
                        <div className="flex justify-between items-baseline">
                          <span className="text-[10px] font-mono uppercase text-slate-400">Price</span>
                          <span className="text-base font-mono font-black text-white hover:text-indigo-400">
                            Rp {item.priceRp.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
 
                      {/* Dynamic timer lock display and Sniping action button */}
                      <div className="space-y-2">
                        {item.isClaimed ? (
                          <div className="w-full bg-slate-900 rounded-lg p-2 border border-rose-950/60 flex items-center justify-between text-xs">
                            <span className="text-rose-400 font-mono flex items-center gap-1 font-bold">
                              ✕ SOLD OUT / SNIPED
                            </span>
                            <span className="text-[9px] font-mono text-slate-500">
                              @{item.claimedByUserId?.substring(5, 12)}...
                            </span>
                          </div>
                        ) : !isUnlocked ? (
                          /* Countdown state active */
                          <div className="w-full bg-indigo-950/30 border border-indigo-900/30 rounded-lg p-2 space-y-1.5">
                            <div className="flex justify-between items-center text-[10px] font-mono">
                              <span className="text-indigo-300 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-sky-400 animate-spin-slow" />
                                {isPremium ? 'YOUR VIP DROP COUNTDOWN:' : 'PUBLIC RELEASING TIMER:'}
                              </span>
                              <span className="text-yellow-400 font-bold">
                                {formatCountdown(msLeft)}
                              </span>
                            </div>
 
                            {/* Alert free users that premium users can buy now! */}
                            {premiumAdvantageActive && (
                              <div className="bg-amber-950/50 border border-amber-500/20 rounded p-1.5 text-[9px] text-amber-300 leading-normal flex items-start space-x-1">
                                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                <span>
                                  <strong>⚠️ Premium Advantage open!</strong> VIP members have already unlocked this item and are currently sniping it.
                                </span>
                              </div>
                            )}
 
                            <button
                              onClick={() => setCurrentTab('premium')}
                              className="w-full text-center py-1.5 bg-slate-900 hover:bg-slate-800 text-[10px] font-mono text-slate-400 hover:text-white rounded border border-indigo-950/80 transition-all flex items-center justify-center space-x-1"
                            >
                              <Lock className="w-2.5 h-2.5 text-indigo-500" />
                              <span>Skip lock for Rp15.000 / month</span>
                            </button>
                          </div>
                        ) : (
                          /* Open for purchase/sniping! */
                          <button
                            onClick={() => handleOpenSnipeModal(item)}
                            className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white py-2 px-4 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-indigo-950/60 uppercase cursor-pointer"
                          >
                            <Zap className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
                            <span>Instant Sniper Button</span>
                          </button>
                        )}
                      </div>
 
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>

      {/* Booking Dialog Drawer Modal with Interactive Payment Simulator (Controlled component) */}
      {activeSnipeItem && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-slate-900 to-indigo-950 border border-[#FBF7F0]/20 max-w-md w-full rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <button 
              onClick={() => setActiveSnipeItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-black z-50 cursor-pointer"
            >
              ✕
            </button>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-400">
                  <Zap className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-left font-sans">
                  <h3 className="text-sm font-black text-white tracking-widest uppercase">SECURE PHYSICAL JASTIP SLOT</h3>
                  <p className="text-[10px] text-[#FBF7F0] font-mono leading-none tracking-wider font-extrabold animate-pulse">INTUITIVE INSTANT PAYMENT SYSTEM</p>
                </div>
              </div>

              {/* Step 1: Details and Payment Selection */}
              {paymentStep === 'details' && (
                <div className="space-y-4">
                  {/* Checkout Item Detail Mini Row */}
                  <div className="flex items-center space-x-3 bg-slate-950/60 border border-indigo-950/80 p-3 rounded-2xl">
                    <img 
                      src={activeSnipeItem.imageUrl} 
                      className="w-14 h-14 object-cover rounded-xl border border-indigo-900/40" 
                      alt="checkout preview"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1 text-left">
                      <h4 className="text-xs font-black text-white leading-tight">{activeSnipeItem.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] text-[#FBF7F0] font-mono font-black bg-indigo-950/80 border border-indigo-500/20 px-2 py-0.5 rounded-md">
                          IDR {activeSnipeItem.priceRp.toLocaleString('id-ID')}
                        </span>
                        <span className="text-[9px] text-[#FBF7F0]/60 font-mono font-medium">Size: {activeSnipeItem.size}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Simulator Selection */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-black text-[#FBF7F0]/85 font-mono uppercase tracking-widest block text-left">
                      Select Virtual Wallet Service
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPayment('gopay_qris')}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedPayment === 'gopay_qris'
                            ? 'bg-slate-900 border-[#FBF7F0] ring-1 ring-[#FBF7F0]/30 text-white'
                            : 'bg-slate-950/30 border-indigo-950 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="flex justify-between items-center bg-transparent">
                          <span className="text-xs font-black text-white">QRIS/Gopay</span>
                          <span className="text-[8px] bg-emerald-500/20 text-emerald-300 font-mono font-extrabold px-1 py-0.5 rounded uppercase animate-pulse">Instant</span>
                        </div>
                        <p className="text-[9px] text-slate-500 font-mono mt-0.5 select-none font-medium">No admin fee</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPayment('shopeepay')}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedPayment === 'shopeepay'
                            ? 'bg-slate-900 border-[#FBF7F0] ring-1 ring-[#FBF7F0]/30 text-white'
                            : 'bg-slate-950/30 border-indigo-950 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="flex justify-between items-center bg-transparent">
                          <span className="text-xs font-black text-white">ShopeePay</span>
                          <span className="text-[8px] bg-indigo-500/20 text-indigo-300 font-mono font-extrabold px-1 py-0.5 rounded uppercase">Direct</span>
                        </div>
                        <p className="text-[9px] text-slate-500 font-mono mt-0.5 select-none font-medium">Bypass queue</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPayment('ovowallet')}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedPayment === 'ovowallet'
                            ? 'bg-slate-900 border-[#FBF7F0] ring-1 ring-[#FBF7F0]/30 text-white'
                            : 'bg-slate-950/30 border-indigo-950 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="flex justify-between items-center bg-transparent">
                          <span className="text-xs font-black text-white">OVO Wallet</span>
                          <span className="text-[8px] bg-purple-500/20 text-purple-300 font-mono font-extrabold px-1 py-0.5 rounded uppercase">VIP Link</span>
                        </div>
                        <p className="text-[9px] text-slate-500 font-mono mt-0.5 select-none font-medium">Pre-logged</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPayment('bank_transfer')}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                          selectedPayment === 'bank_transfer'
                            ? 'bg-slate-900 border-[#FBF7F0] ring-1 ring-[#FBF7F0]/30 text-white'
                            : 'bg-slate-950/30 border-indigo-950 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="flex justify-between items-center bg-transparent">
                          <span className="text-xs font-black text-white">Bank Virtual</span>
                          <span className="text-[8px] bg-[#FBF7F0]/10 border border-[#FBF7F0]/20 text-slate-350 font-mono px-1 py-0.5 rounded uppercase font-bold">Standard</span>
                        </div>
                        <p className="text-[9px] text-slate-500 font-mono mt-0.5 select-none font-medium">Manual confirm</p>
                      </button>
                    </div>
                  </div>

                  {/* Booking Directions form */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-black text-[#FBF7F0]/90 font-mono uppercase tracking-widest block font-bold">Courier Shipping Notes</label>
                    <textarea
                      placeholder="e.g. Please wrap carefully, ship via Instant GoSend/JNE Express ASAP!"
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      className="w-full bg-[#FBF7F0]/5 border border-indigo-950 text-white rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#FBF7F0]/40 h-16 resize-none placeholder-slate-600"
                    />
                  </div>

                  {/* Warning/Commitment Badge */}
                  <div className="p-3 bg-indigo-950/40 border border-[#FBF7F0]/10 rounded-2xl flex items-start space-x-2 text-left">
                    <ShieldCheck className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
                    <p className="text-[9px] text-[#FBF7F0]/65 leading-normal">
                      By proceeding, this dynamic checkout simulates standard API authorization routines using local test ledgers. You keep full ownership simulation inside this session.
                    </p>
                  </div>

                  {/* Action row */}
                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveSnipeItem(null)}
                      className="px-4 py-3 bg-slate-955/20 hover:bg-slate-900 text-xs font-bold font-mono text-slate-400 rounded-xl text-center flex-1 border border-indigo-950 select-none cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmSnipe}
                      className="px-5 py-3 bg-[#FBF7F0] hover:bg-[#FBF7F0]/90 text-slate-955 font-black text-xs rounded-xl text-center flex-1 flex items-center justify-center space-x-1.5 uppercase tracking-wider cursor-pointer transition-all hover:shadow-glow"
                    >
                      <Zap className="w-3.5 h-3.5 text-indigo-950 animate-bounce" />
                      <span>Confirm & pay</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Simulating processing logs */}
              {paymentStep === 'simulating' && (
                <div className="py-8 px-4 flex flex-col items-center justify-center space-y-6 text-center">
                  
                  {/* Glowing spinner */}
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-900/10" />
                    <div className="absolute inset-0 rounded-full border-4 border-t-white border-r-[#FBF7F0]/50 animate-spin" />
                    <div className="absolute inset-2 bg-indigo-950 rounded-full flex items-center justify-center text-xs">
                      ⚡
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-black text-white uppercase tracking-widest font-mono">Bypassing Latency Queue</h4>
                    <p className="text-xs text-slate-400">Verifying secure mock transaction on local blockchain...</p>
                  </div>

                  {/* Terminal Logs readout with Vintage Cream and Deep Navy details */}
                  <div className="w-full bg-slate-950 border border-indigo-950/80 p-3.5 rounded-2xl text-left h-24 flex flex-col justify-end font-mono">
                    <span className="text-[10px] text-slate-500 font-bold block select-none uppercase mb-1">=== SYSTEM TRANSACTION LOGS ===</span>
                    <div className="text-[10px] text-indigo-400 font-bold leading-relaxed whitespace-pre-wrap animate-pulse min-h-[40px]">
                      {simulatedLog}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Success Receipt screen */}
              {paymentStep === 'receipt' && (
                <div className="space-y-4 pt-1">
                  
                  {/* Big success shield badge */}
                  <div className="w-12 h-12 bg-emerald-950/80 border border-emerald-500/45 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner shadow-emerald-900/40">
                    <Check className="w-6 h-6 shrink-0" />
                  </div>

                  <div className="text-center space-y-0.5">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">JASTIP SLOT SECURED!</h3>
                    <p className="text-[10px] text-emerald-400 font-mono">Mock Payment Cleared via {selectedPayment.toUpperCase()}</p>
                  </div>

                  {/* Aesthetic Voucher Receipt Box */}
                  <div className="bg-slate-950 border border-indigo-950 p-4 rounded-2xl text-left space-y-3 relative overflow-hidden font-mono text-[11px]">
                    <div className="absolute right-0 top-0 text-[3rem] font-black text-white/5 font-sans pointer-events-none select-none">
                      PAID
                    </div>

                    <div className="flex justify-between border-b border-indigo-950/60 pb-2">
                      <span className="text-slate-500">BOOKING VOUCHER</span>
                      <span className="font-bold text-[#FBF7F0]">{generatedVoucher}</span>
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span>SECURED ITEM</span>
                      <span className="font-bold text-white max-w-[150px] truncate">{activeSnipeItem.title}</span>
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span>SIZE / BRAND</span>
                      <span className="font-bold text-white capitalize">{activeSnipeItem.size} / {activeSnipeItem.brand}</span>
                    </div>

                    <div className="flex justify-between text-slate-300">
                      <span>SETTLED TOTAL</span>
                      <span className="font-extrabold text-[#FBF7F0]">IDR {activeSnipeItem.priceRp.toLocaleString('id-ID')}</span>
                    </div>

                    <div className="flex justify-between text-[#FBF7F0]/40 text-[9px] pt-1">
                      <span>MOCK TRADING TIME</span>
                      <span>2026-05-24 UTC</span>
                    </div>
                  </div>

                  {/* Virtual PDF Download Action Simulated button */}
                  <button
                    type="button"
                    onClick={() => {
                      alert(`Downloading dynamic receipt receipt_${generatedVoucher}.pdf in testing container...`);
                    }}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-xs font-mono font-bold text-[#FBF7F0] hover:text-white rounded-xl border border-indigo-950 transition-colors cursor-pointer"
                  >
                    📥 Download Cryptographic Ticket
                  </button>

                  {/* Done closing button */}
                  <button
                    type="button"
                    onClick={() => setActiveSnipeItem(null)}
                    className="w-full py-3 bg-[#FBF7F0] hover:bg-[#FBF7F0]/90 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl cursor-pointer"
                  >
                    Dismiss Receipt
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
