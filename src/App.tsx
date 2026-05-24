import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DropCatalog from './components/DropCatalog';
import PremiumPackages from './components/PremiumPackages';
import AboutUs from './components/AboutUs';
import NotificationCenter, { LiveAlertTicker } from './components/NotificationCenter';
import AuthModal from './components/AuthModal';
import UserProfileDashboard from './components/UserProfileDashboard';
import AiChatbot from './components/AiChatbot';
import IndonesiaThriftShowcase from './components/IndonesiaThriftShowcase';
import RealtimeGeospatialTracker from './components/RealtimeGeospatialTracker';
import { MOCK_DROPS, MOCK_TESTIMONIALS, PLATFORM_STATS } from './data/mockData';
import { ThriftDropItem, UserProfile } from './types';
import { Target, Zap, Clock, ShieldAlert, HeartHandshake, Flame, Star, BellRing, Heart } from 'lucide-react';

interface AlertMessage {
  id: string;
  title: string;
  desc: string;
  type: 'info' | 'success' | 'warn';
  time: string;
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [language, setLanguage] = useState<'ID' | 'EN'>('EN');
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);
  
  // Manage catalog state so sniped items remain secured across tabs
  const [drops, setDrops] = useState<ThriftDropItem[]>(MOCK_DROPS);

  // User Authentication profile state
  const [userProfile, setUserProfile] = useState<UserProfile | null>({
    id: 'user_medina',
    username: 'thrift_hunter_medina',
    fullName: 'Medina Maryam',
    email: 'medina.maryam300905@gmail.com',
    role: 'buyer',
    wishlist: ['drop_1', 'drop_w1'], // Preloaded Vintage Carhartt and Silk Blouse
    createdAt: new Date().toISOString()
  });

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  // Wishlist bookmark modification handler
  const handleToggleWishlist = (dropId: string) => {
    if (!userProfile) {
      setAuthModalOpen(true);
      handlePushNotification(
        '🔑 Auth Required',
        'Please log in or create an account to start wishlisting exclusive thrift drops!',
        'warn'
      );
      return;
    }

    setUserProfile((prev) => {
      if (!prev) return null;
      const isAlreadyWishlisted = prev.wishlist.includes(dropId);
      let updatedList: string[];

      if (isAlreadyWishlisted) {
        updatedList = prev.wishlist.filter(id => id !== dropId);
        handlePushNotification(
          '💔 Removed Wishlist Bookmark',
          'Item was removed from your personal monitoring dashboard.',
          'warn'
        );
      } else {
        updatedList = [...prev.wishlist, dropId];
        handlePushNotification(
          '❤️ Added to Snipe Wishlist',
          'Item secured into your priority radar alarms monitoring tracker!',
          'success'
        );
      }

      return {
        ...prev,
        wishlist: updatedList
      };
    });
  };

  const handleAddCustomDropItem = (newItem: ThriftDropItem) => {
    setDrops((prev) => [newItem, ...prev]);
  };

  // Gate check hook: if guest attempts to view catalog tab, raise the login modal
  useEffect(() => {
    if (currentTab === 'catalog' && !userProfile) {
      setAuthModalOpen(true);
      handlePushNotification(
        '🔒 Authentication Gate',
        'Please login to view active thrift drops in your location.',
        'warn'
      );
    }
  }, [currentTab, userProfile]);
  
  // Real-time notifications state
  const [notifications, setNotifications] = useState<AlertMessage[]>([
    {
      id: 'init_1',
      title: '📡 Radar Alerts Connected',
      desc: 'Listing monitors synced cleanly at server edge.',
      type: 'info',
      time: '1m ago'
    }
  ]);

  // Handle toaster pushes safely
  const handlePushNotification = (title: string, desc: string, type: 'info' | 'success' | 'warn' = 'info') => {
    const newMsg: AlertMessage = {
      id: Math.random().toString(),
      title,
      desc,
      type,
      time: 'Just now'
    };
    setNotifications((prev) => [newMsg, ...prev.slice(0, 3)]);
  };

  const handleCloseNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Simulated live peer sniper notifications popping in to construct active hyper-competitive ambiance
  useEffect(() => {
    const peers = ['budi_vntg', 'nissa_curates', 'faisal.thrift', 'amalia_snipes', 'grail_hunter99', 'reza_casuals'];
    const peerItems = [
      'Vintage Nike Single Stitch Crewneck', 
      '1992 Carhartt Detroit Canvas Jacket', 
      'Retro Jordan 1 High Bred',
      'Patagonia Snap-T Fleece',
      'Nirvana Insecticide Band Tee'
    ];

    const interval = setTimeout(() => {
      // Choose random actions
      const randomPeer = peers[Math.floor(Math.random() * peers.length)];
      const randomItem = peerItems[Math.floor(Math.random() * peerItems.length)];
      
      handlePushNotification(
        '🔥 PEER SNIPER SUCCESS',
        `@${randomPeer} just locked a high-demand Jastip slot for '${randomItem}' 10m early!`,
        'info'
      );
    }, 12000); // Send first peer alert after 12 seconds

    return () => clearTimeout(interval);
  }, [currentTab]);

  // Periodic random background radar warning checks
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPremium) {
        const products = ['Jordan 1 Breds', 'Vintage Levi\'s Corduroys', 'Harley Davidson Tees', 'Carhartt Hoodies'];
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        
        handlePushNotification(
          '🛎️ RADAR DISPATCH AGENT',
          `SnipeDrop Radar: 3 new buyers searching for '${randomProduct}' slots. Instant Sniper is primed.`,
          'success'
        );
      }
    }, 45000); // every 45s if premium is open

    return () => clearInterval(interval);
  }, [isPremium]);

  // Handle transactional lock / snipe action!
  const handleSnipeBooking = (dropId: string, notes: string) => {
    // Generate simulated order reference ids
    const secureCode = `SD-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Update drops global list
    setDrops((prev) =>
      prev.map((item) => {
        if (item.id === dropId) {
          return {
            ...item,
            isClaimed: true,
            claimedByUserId: 'Current User (You)',
            claimedAt: new Date().toISOString()
          };
        }
        return item;
      })
    );

    const targetItem = drops.find(d => d.id === dropId);
    if (targetItem) {
      handlePushNotification(
        '🎯 CONGRATULATIONS! SLOT SECURED',
        `Successfully locked Jastip slot for '${targetItem.title}'! Booking code ${secureCode} generated. Our courier in the source territory has secured the physical garment. Confirmation text dispatched to WhatsApp.`,
        'success'
      );
    }
  };

  // Extract the closest upcoming active drops specifically for homepage countdowns
  const getHomepageActiveDrops = () => {
    const timeNow = Date.now();
    
    // Filter out items that are already claimed/sold, and sort by chronological order
    const unclaimed = drops.filter(d => !d.isClaimed);
    
    return unclaimed
      .sort((a, b) => {
        const timeA = new Date(a.dropTime).getTime();
        const timeB = new Date(b.dropTime).getTime();
        return timeA - timeB;
      })
      .slice(0, 3); // list top 3 imminent drops
  };

  const activeHomepageDrops = getHomepageActiveDrops();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-white">
      
      {/* Universal branding sticky header */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        isPremium={isPremium} 
        setIsPremium={setIsPremium} 
        userProfile={userProfile}
        onLogout={() => {
          setUserProfile(null);
          setCurrentTab('home');
          handlePushNotification('🔓 Session Closed', 'You have been safely signed out.', 'info');
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
        language={language}
        setLanguage={setLanguage}
        onShowNotification={handlePushNotification}
      />

      {/* Main Tab Controller Routing */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <div className="space-y-16 pb-20">
            {/* Landing Hero */}
            <Hero 
              setCurrentTab={setCurrentTab} 
              isPremium={isPremium} 
              setIsPremium={setIsPremium} 
              language={language}
            />

            {/* Real-time Geospatial Tracker (Advanced Routing Map Section) */}
            <RealtimeGeospatialTracker language={language} />

            {/* SECTION 2: Live Countdown active thrift drops (Homepage feature request) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="md:flex md:items-end md:justify-between mb-8">
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 bg-indigo-950 text-indigo-400 border border-indigo-500/20 text-[10px] font-mono rounded font-bold uppercase mb-2">
                    <Clock className="w-3.5 h-3.5 animate-spin-slow" />
                    <span>Real-time Active Countdowns</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    HIGH-DEMAND IMMINENT DROPS
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">These catalog items are launching next. Premium VIP gets a massive 10m early access sniping head start!</p>
                </div>
                <button
                  onClick={() => setCurrentTab('catalog')}
                  className="mt-4 md:mt-0 px-5 py-2 bg-indigo-900/40 hover:bg-indigo-900 border border-indigo-500/30 text-indigo-300 font-bold font-mono rounded-lg text-xs transition-all flex items-center space-x-1 uppercase"
                >
                  <span>Go to Catalog</span>
                  <span>&rarr;</span>
                </button>
              </div>

              {/* Countdown items mini-catalog row of 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {activeHomepageDrops.map(item => {
                  const dropDate = new Date(item.dropTime).getTime();
                  // VIP advantage
                  const earlyAccessMs = 10 * 60 * 1000;
                  const targetTime = isPremium ? (dropDate - earlyAccessMs) : dropDate;
                  const msLeft = Math.max(0, targetTime - Date.now());
                  const isUnlocked = msLeft <= 0;

                  return (
                    <div 
                      key={item.id}
                      onClick={() => setCurrentTab('catalog')}
                      className="group relative bg-slate-950 border border-indigo-950 rounded-xl overflow-hidden hover:border-indigo-500/30 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-slate-950 flex flex-col justify-between"
                    >
                      {/* Thumbnail wrapper */}
                      <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                        
                        {/* Status overlays in thumbnail */}
                        <div className="absolute top-3 left-3 flex space-x-1">
                          <span className="bg-slate-900/90 text-[10px] font-mono border border-slate-700/60 text-slate-300 px-2 py-0.5 rounded">
                            {item.condition}
                          </span>
                        </div>

                        {/* Interactive Wishlist Heart toggle with stopPropagation */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleWishlist(item.id);
                          }}
                          className="absolute top-3 right-14 bg-slate-950/90 border border-indigo-500/30 hover:border-indigo-400 p-1.5 rounded-full shadow hover:bg-indigo-950 transition-all z-10 cursor-pointer"
                          title="Save to watchlist"
                        >
                          <Heart 
                            className={`w-3 h-3 transition-transform active:scale-90 ${
                              userProfile?.wishlist.includes(item.id) 
                                ? 'fill-[#bfdbfe] text-blue-300 drop-shadow-[0_0_8px_rgba(147,197,253,0.8)]' 
                                : 'text-slate-350 hover:text-blue-300'
                            }`} 
                          />
                        </button>

                        <span className="absolute top-3 right-3 bg-indigo-950/95 text-[10px] font-mono font-bold text-slate-200 border border-indigo-500/30 px-2 py-0.5 rounded shadow">
                          Size {item.size}
                        </span>

                        {/* Relative active counter on thumbnail center */}
                        <div className="absolute bottom-3 left-3 right-3 p-2 bg-slate-950/90 rounded border border-indigo-900/35 backdrop-blur flex justify-between items-center">
                          <span className="text-[9px] font-mono text-slate-400">
                            {isPremium ? '★ VIP LOCKDOWN IN:' : 'PUBLIC LOCK IN:'}
                          </span>
                          <span className={`text-[11px] font-mono font-bold ${isUnlocked ? 'text-emerald-400 animate-pulse' : 'text-yellow-400'}`}>
                            {isUnlocked ? 'AVAILABLE TO SNIPE!' : formatCountdownInMinutes(msLeft)}
                          </span>
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-4 space-y-4 flex-grow flex flex-col justify-between">
                        <div>
                          <p className="text-[10px] font-mono text-indigo-400 font-extrabold uppercase leading-none">{item.brand}</p>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-white mt-1 leading-normal tracking-tight line-clamp-2 min-h-[38px]">
                            {item.title}
                          </h4>
                        </div>

                        <div className="pt-2 border-t border-indigo-950/30 flex justify-between items-baseline">
                          <span className="text-[10px] font-mono text-slate-500 uppercase">Jastip pricing</span>
                          <span className="text-xs sm:text-sm font-mono font-bold text-indigo-300">
                            Rp {item.priceRp.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 3: Deep Feature breakdown bento layout and real-time feed ticker */}
            <section className="bg-slate-900/30 border-y border-indigo-950/50 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left explanation column */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 bg-indigo-950 text-indigo-400 border border-indigo-500/20 text-[10px] font-mono rounded font-bold uppercase">
                      <Zap className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{language === 'ID' ? 'KEUNTUNGAN PLATFORM' : 'THE PLATFORM BENEFITS'}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                      {language === 'ID' ? 'KEMAMPUAN SNIPING MODERN' : 'ADVANCED SNIPING CAPABILITIES'}
                    </h3>
                    <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                      {language === 'ID'
                        ? 'Ucapkan selamat tingal pada loading spinner yang bikin frustrasi atau kehilangan barang vintage karena kalah cepat dari bot. SnipeDrop menyatukan antrean khusus, peringatan notifikasi cepat, dan reservasi instan untuk memberikan Anda keunggulan kompetitif.'
                        : 'Say goodbye to frustrating loading spinners or losing vintage items to bots. SnipeDrop incorporates custom queuing, push alert integration, and early reservation channels to give you the competitive edge.'}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-4.5 bg-slate-950 border border-indigo-950 rounded-xl space-y-2">
                        <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
                        <h4 className="text-xs font-bold text-white uppercase">
                          {language === 'ID' ? 'Akses Awal 10 Menit' : '10-Min Early Access'}
                        </h4>
                        <p className="text-[11px] text-slate-450 leading-relaxed font-sans">
                          {language === 'ID'
                            ? 'Lihat barang pilihan terkurasi tepat 10 menit sebelum rilis umum. Ambil sela waktu krusial untuk bersiap dan klaim checkout instan.'
                            : 'View curated items exactly 10 minutes before launch. Gain crucial time to plan and trigger purchases instantly.'}
                        </p>
                      </div>

                      <div className="p-4.5 bg-slate-950 border border-indigo-950 rounded-xl space-y-2">
                        <Zap className="w-5 h-5 text-emerald-500 animate-bounce" />
                        <h4 className="text-xs font-bold text-white uppercase">
                          {language === 'ID' ? 'Tombol Instant Sniper' : 'Instant Sniper Button'}
                        </h4>
                        <p className="text-[11px] text-slate-450 leading-relaxed font-sans">
                          {language === 'ID'
                            ? 'Lewati proses keranjang belanja yang lama. Kunci slot pemesanan Jastip fisik Anda dengan satu sentuhan klik cepat.'
                            : 'Skip shopping cart processes. Secure physical Jastip booking locks with a single mouse click or touch tap.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right live feed actions logger column (Conquering speed requirement) */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white uppercase font-sans tracking-wide">
                        {language === 'ID' ? 'Telemetry Monitor Radar Notifikasi' : 'Radar Alert Telemetry Monitor'}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {language === 'ID' ? 'Status sinkronisasi real-time sirkulasi slot teraman.' : 'Live system sync status reports of current secure bookings.'}
                      </p>
                    </div>
                    <LiveAlertTicker />
                  </div>

                </div>
              </div>
            </section>

            {/* SECTION 4: User Testimonials Section (Homepage requirement) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-xl mx-auto space-y-2.5 mb-10">
                <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-indigo-950 text-indigo-400 border border-indigo-500/25 rounded text-[10px] font-mono font-bold uppercase">
                  <Star className="w-3 h-3 text-amber-400 mr-1" />
                  {language === 'ID' ? 'Ceritas Sukses Para Hunters' : 'Hunters Success Stories'}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  {language === 'ID' ? 'ULASAN & REVIEW TERBARU PEMBELI' : 'SUCCESSFUL SNIPER STORIES'}
                </h3>
                <p className="text-sm text-slate-400">
                  {language === 'ID'
                    ? 'Dengar langsung dambaan para hunter dan kolektor vintage yang mengamankan buruannya dengan aman.'
                    : 'Read reviews from collectors and sellers securing holy grails across Indonesia safely.'}
                </p>
              </div>

              {/* Testimonials grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_TESTIMONIALS.map((t) => {
                  let translatedReview = t.review;
                  if (language === 'EN') {
                    if (t.id === 't1') {
                      translatedReview = "Insane! SnipeDrop premium is absolutely worth it. Thanks to the 10-minute early access, I successfully secured my dream Carhartt Detroit Jacket before millions of other Jastip hunters got to fight for it!";
                    } else if (t.id === 't2') {
                      translatedReview = "The Radar Alert feature is incredibly accurate! I got a direct Telegram ping the second the vintage Nike jacket I was watching dropped. A single click of the Instant Sniper secured my checkout instantly!";
                    } else if (t.id === 't3') {
                      translatedReview = "I was hesitant about subscribing for Rp15k/month, but my Jastip slots have been fully booked all week. Clean dashboard, honest real-time stock updates. Highly recommended for sellers and collectors!";
                    }
                  }
                  return (
                    <div 
                      key={t.id}
                      className="p-6 bg-slate-950 border border-indigo-950 rounded-2xl relative shadow-lg flex flex-col justify-between space-y-4 hover:border-indigo-500/20 transition-all cursor-default"
                    >
                      <div className="space-y-3.5">
                        {/* Rating Stars row */}
                        <div className="flex space-x-1">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>

                        {/* Review details */}
                        <p className="text-xs text-slate-300 leading-relaxed font-sans italic">
                          &ldquo;{translatedReview}&rdquo;
                        </p>
                      </div>

                      {/* Review Author detail */}
                      <div className="flex items-center space-x-3 pt-4 border-t border-indigo-950/40">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md ${t.avatarBgColor}`}>
                          {t.avatar}
                        </div>
                        <div>
                          <strong className="block text-xs font-bold text-slate-100">{t.name}</strong>
                          <span className="block text-[10px] text-indigo-400 font-mono">
                            @{t.username} • {t.itemsSniped} {language === 'ID' ? 'snipes berhasil' : 'snipes claimed'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* SECTION 5: Fast track pricing banner Rp15.000 (Homepage requirement) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-950 to-indigo-900/40 border border-indigo-500/20 p-8 md:p-12 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-indigo-950/10 pointer-events-none filter blur shadow" />
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  <div className="lg:col-span-8 space-y-3">
                    <span className="px-2.5 py-0.5 bg-indigo-900 border border-indigo-500/30 text-indigo-300 font-mono text-[9px] font-bold rounded uppercase">
                      {language === 'ID' ? 'HAK ISTIMEWA EKSKLUSIF TERBATAS' : 'LIMITED EXCLUSIVE PRIVILEGES'}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
                      {language === 'ID' ? 'BUKA SEMUA COOLDOWN TERBATAS HARI INI' : 'UNLOCK ALL LIMITED COOLDOWNS TODAY'}
                    </h3>
                    <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
                      {language === 'ID'
                        ? 'Dapatkan tampilan katalog akses awal, kontrol tombol sniper super cepat tanpa delay, dan pemberitahuan channel Telegram kustom seharga Rp15.000 / bulan.'
                        : 'Gain early-access catalog views, zero-latency 1-click buy sniper controls, and custom Telegram channel updates for only Rp15.000 / month.'}
                    </p>
                  </div>

                  <div className="lg:col-span-4 text-left lg:text-right flex flex-col justify-end space-y-3">
                    <div>
                      <span className="text-3xl font-black text-white font-mono">Rp15.000 </span>
                      <span className="text-xs text-slate-400 font-mono">/ {language === 'ID' ? 'bulan' : 'month'}</span>
                    </div>
                    <button
                      onClick={() => setCurrentTab('premium')}
                      className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-lg border border-indigo-500/30 text-center uppercase tracking-wider transition-all cursor-pointer font-mono"
                    >
                      {language === 'ID' ? '★ Kunci Keuntungan VIP' : '★ Secure VIP Advantage'}
                    </button>
                  </div>

                </div>
              </div>
            </section>

            {/* SECTION 6: Indonesia Interactive Features (Showcase Requirement) */}
            <IndonesiaThriftShowcase 
              isPremium={isPremium} 
              setIsPremium={setIsPremium} 
              onShowNotification={handlePushNotification} 
              language={language}
            />

          </div>
        )}

        {currentTab === 'catalog' && (
          <DropCatalog 
            isPremium={isPremium} 
            setIsPremium={setIsPremium}
            drops={drops}
            onSnipe={handleSnipeBooking}
            setCurrentTab={setCurrentTab}
            wishlist={userProfile ? userProfile.wishlist : []}
            onToggleWishlist={handleToggleWishlist}
            isLoggedIn={userProfile !== null}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}

        {currentTab === 'profile' && userProfile && (
          <UserProfileDashboard 
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            isPremium={isPremium} 
            setIsPremium={setIsPremium}
            drops={drops}
            onToggleWishlist={handleToggleWishlist}
            onAddDropItem={handleAddCustomDropItem}
            onShowNotification={handlePushNotification}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'premium' && (
          <PremiumPackages 
            isPremium={isPremium} 
            setIsPremium={setIsPremium}
            onShowNotification={handlePushNotification}
          />
        )}

        {currentTab === 'about' && (
          <AboutUs 
            onShowNotification={handlePushNotification}
          />
        )}
      </main>

      {/* Persistent global notification overlay toasts */}
      <NotificationCenter 
        notifications={notifications} 
        onClose={handleCloseNotification} 
      />

      {/* Dynamic Authorization Portal Modal Popup */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        onLoginSuccess={(newProfile) => {
          setUserProfile(newProfile);
          setIsPremium(newProfile.role === 'buyer'); 
          setCurrentTab('profile'); 
          handlePushNotification(
            '⚡ Session Restored', 
            `Welcome back @${newProfile.username}! Initialized system controls with role ${newProfile.role === 'buyer' ? 'Thrift Hunter' : 'Store Seller'}.`, 
            'success'
          );
        }}
      />

      {/* Floating AI Customer Service Assistant */}
      <AiChatbot />

      {/* Aesthetic rich footer */}
      <footer className="bg-slate-950 border-t border-indigo-950/70 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Upper footer grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-indigo-950/50">
            
            {/* Column 1: SNIPEDROP Title & Info */}
            <div className="md:col-span-4 space-y-4 text-left">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-indigo-400" />
                <span className="text-lg font-black tracking-widest text-[#FBF7F0] font-mono">SNIPEDROP</span>
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-sm">
                {language === 'ID'
                  ? 'Platform Jastip & Drop Hunter terpadu pertama di Indonesia. Membantu kolektor menyortir pakaian vintage, retro, dan streetwear kurasi secara kilat dengan presisi tinggi dan transparansi 100%.'
                  : 'The first integrated Jastip & Drop Hunter platform in Indonesia. Helping collectors filter vintage, retro, and curated streetwear lightning-fast with high precision and 100% transparency.'}
              </p>
              <div className="pt-2 text-xs text-indigo-400/80 font-mono">
                <span>EST. 2026 • Curated with Pride</span>
              </div>
            </div>

            {/* Column 2: LAYANAN */}
            <div className="md:col-span-2 space-y-3 text-left">
              <h4 className="text-xs font-black font-mono text-[#FBF7F0] uppercase tracking-wider">
                {language === 'ID' ? 'LAYANAN' : 'SERVICES'}
              </h4>
              <ul className="space-y-2 text-xs text-slate-450 font-sans">
                <li><span className="hover:text-white transition-colors cursor-pointer block">{language === 'ID' ? 'Katalog Drop' : 'Drop Catalog'}</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer block">{language === 'ID' ? 'Hunting Premium' : 'Premium Hunting'}</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer block">{language === 'ID' ? 'Slot Jastip' : 'Jastip Slot'}</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer block">{language === 'ID' ? 'Radar Alert' : 'Radar Alert'}</span></li>
              </ul>
            </div>

            {/* Column 3: PERUSAHAAN */}
            <div className="md:col-span-2 space-y-3 text-left">
              <h4 className="text-xs font-black font-mono text-[#FBF7F0] uppercase tracking-wider">
                {language === 'ID' ? 'PERUSAHAAN' : 'COMPANY'}
              </h4>
              <ul className="space-y-2 text-xs text-slate-450 font-sans">
                <li><span className="hover:text-white transition-colors cursor-pointer block" onClick={() => setCurrentTab('about')}>{language === 'ID' ? 'Tentang Kami' : 'About Us'}</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer block">{language === 'ID' ? 'Syarat & Ketentuan' : 'Terms & Conditions'}</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer block">{language === 'ID' ? 'Kebijakan Privasi' : 'Privacy Policy'}</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer block">{language === 'ID' ? 'Kontak' : 'Contact'}</span></li>
              </ul>
            </div>

             {/* Column 4: NEWSLETTER input form */}
            <div className="md:col-span-4 space-y-3 text-left">
              <h4 className="text-xs font-black font-mono text-[#FBF7F0] uppercase tracking-wider">NEWSLETTER</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                {language === 'ID'
                  ? 'Dapatkan update info kilat drops pakaian vintage terhangat sebelum diposting ke umum.'
                  : 'Get instant notification updates on the hottest vintage drops before they are published to the public queue.'}
              </p>
              {newsletterSuccess ? (
                <div className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg text-xs font-mono font-bold animate-pulse">
                  {language === 'ID'
                    ? 'Berhasil! Kamu akan menerima notifikasi drop harian.'
                    : 'Success! You will now receive daily drop alerts.'}
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const input = form.querySelector('input') as HTMLInputElement;
                    if (input && input.value) {
                      handlePushNotification(
                        language === 'ID' ? '📧 Terdaftar!' : '📧 Registered!',
                        language === 'ID'
                          ? 'Berhasil! Kamu akan menerima notifikasi drop harian.'
                          : 'Success! You will now receive daily drop alerts.',
                        'success'
                      );
                      input.value = '';
                      setNewsletterSuccess(true);
                      setTimeout(() => setNewsletterSuccess(false), 5000);
                    }
                  }}
                  className="flex items-center space-x-2 pt-1"
                >
                  <input
                    type="email"
                    placeholder={language === 'ID' ? 'email@contoh.com' : 'email@example.com'}
                    required
                    className="bg-slate-900 border border-indigo-950 hover:border-indigo-500/20 text-xs text-white rounded-lg p-2.5 flex-grow focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans placeholder-slate-600 font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-[#FBF7F0] hover:bg-white text-slate-950 font-black text-xs font-mono px-4 py-2.5 rounded-lg uppercase tracking-wider hover:shadow-glow transition-all cursor-pointer"
                  >
                    {language === 'ID' ? 'GABUNG' : 'JOIN'}
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Lower copyright bar */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs font-mono text-slate-500">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center md:text-left">
              <span>&copy; 2026 SNIPEDROP JASTIP Platform Co. All rights reserved.</span>
              <div className="flex items-center gap-2 text-[10px] bg-slate-900/40 px-2.5 py-1 rounded border border-indigo-950/30">
                <button
                  type="button"
                  onClick={() => setLanguage('ID')}
                  className={`transition-colors font-extrabold tracking-wider ${language === 'ID' ? 'text-indigo-400 font-black' : 'text-slate-500 hover:text-slate-350'}`}
                >
                  ID
                </button>
                <span className="text-slate-700">|</span>
                <button
                  type="button"
                  onClick={() => setLanguage('EN')}
                  className={`transition-colors font-extrabold tracking-wider ${language === 'EN' ? 'text-indigo-400 font-black' : 'text-slate-500 hover:text-slate-350'}`}
                >
                  EN
                </button>
              </div>
            </div>
            <div className="flex space-x-4 items-center">
              <span className="text-[10px] text-emerald-400 animate-pulse flex items-center bg-emerald-950/20 border border-emerald-500/20 px-2 py-0.5 rounded">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5 animate-ping" />
                CENTRAL SERVER LIVE
              </span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Timer helper functions
function formatCountdownInMinutes(ms: number) {
  if (ms <= 0) return '00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
}
