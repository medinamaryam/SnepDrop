import React, { useState } from 'react';
import { Crown, Star, BellRing, QrCode, Wallet, Smartphone, ShieldCheck, Heart, User, Sparkles, ArrowRight, Check, CheckCircle2 } from 'lucide-react';

interface IndonesiaThriftShowcaseProps {
  isPremium: boolean;
  setIsPremium: (val: boolean) => void;
  onShowNotification: (title: string, desc: string, type?: 'info' | 'success' | 'warn') => void;
  language?: 'ID' | 'EN';
}

export default function IndonesiaThriftShowcase({
  isPremium,
  setIsPremium,
  onShowNotification,
  language = 'EN',
}: IndonesiaThriftShowcaseProps) {
  // 1. Role Auth State
  const [authRole, setAuthRole] = useState<'buyer' | 'seller' | 'guest'>('buyer');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [isLoggedMock, setIsLoggedMock] = useState(false);

  // 2. Womenswear Catalog Radar States
  const [radarAlerts, setRadarAlerts] = useState<string[]>([]);
  
  const womenswearProducts = [
    {
      id: 'wm_1',
      title: 'Vintage Blouse Ruffly Silk',
      brand: 'Saint Laurent Rive Gauche',
      price: 'Rp 320.000',
      size: 'S',
      condition: 'Mint 9.5/10',
      imageUrl: 'https://images.unsplash.com/photo-1548624149-f7b31568e529?auto=format&fit=crop&q=80&w=600',
      desc: language === 'ID' 
        ? 'Bahan silk premium dengan pattern rumbai vintage klasik. Sangat anggun.' 
        : 'Premium silk fabric with a classic vintage ruffled pattern. Highly elegant.'
    },
    {
      id: 'wm_2',
      title: 'Thrifted Cardigan Crochet Mohair',
      brand: 'PRADA Milano',
      price: 'Rp 580.000',
      size: 'M',
      condition: 'Excellent 9.6/10',
      imageUrl: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&q=80&w=600',
      desc: language === 'ID'
        ? 'Cardigan rajut gembul berbulu lembut khas mohair Italia. Sangat ikonik.'
        : 'Chunky crochet cardigan with soft and cozy Italian mohair wool. Iconic.'
    },
    {
      id: 'wm_3',
      title: 'Retro Skirt Plaid Tweed Flared',
      brand: 'Burberrys Vintage',
      price: 'Rp 420.000',
      size: 'S',
      condition: 'Superb 9.2/10',
      imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=600',
      desc: language === 'ID'
        ? 'Rok sepan bermotif tartan wool premium klasik. Struktur jahitan sangat kokoh.'
        : 'Classic pleated skirt with premium wool tartan print. Sturdy tailored structure.'
    }
  ];

  const handleToggleRadar = (productId: string, title: string) => {
    setRadarAlerts((prev) => {
      const isAlreadySet = prev.includes(productId);
      if (isAlreadySet) {
        onShowNotification(
          language === 'ID' ? '🔕 Radar Alert Dinonaktifkan' : '🔕 Radar Alert Deactivated',
          language === 'ID' 
            ? `Alarm pemantau otomatis untuk '${title}' telah dihapus.` 
            : `Automatic tracking alarm for '${title}' has been removed.`,
          'warn'
        );
        return prev.filter((id) => id !== productId);
      } else {
        onShowNotification(
          language === 'ID' ? '📡 Radar Alert Aktif!' : '📡 Radar Alert Active!',
          language === 'ID' 
            ? `Radar pemantau terpasang untuk '${title}'. Kami akan ping WhatsApp Anda sebelum rilis!`
            : `Tracking radar set for '${title}'. We will ping your WhatsApp before the drop!`,
          'success'
        );
        return [...prev, productId];
      }
    });
  };

  // 3. Simulated Payment States
  const [selectedPayMethod, setSelectedPayMethod] = useState<'qris' | 'dana' | 'ovo'>('qris');
  const [payPhoneNumber, setPayPhoneNumber] = useState('');
  const [payProcessing, setPayProcessing] = useState(false);

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if ((selectedPayMethod === 'dana' || selectedPayMethod === 'ovo') && !payPhoneNumber) {
      onShowNotification(
        language === 'ID' ? '⚠️ Input Dibutuhkan' : '⚠️ Input Required',
        language === 'ID' 
          ? 'Harap masukkan nomor HP E-Wallet Anda untuk mengirimkan push request.'
          : 'Please enter your E-Wallet mobile number to send the push notification request.',
        'warn'
      );
      return;
    }

    setPayProcessing(true);
    setTimeout(() => {
      setPayProcessing(false);
      setIsPremium(true);
      onShowNotification(
        language === 'ID' ? '👑 Premium Mode Aktif!' : '👑 Premium Mode Active!',
        language === 'ID'
          ? `Pembayaran Rp15.000 sukses diproses melalui ${selectedPayMethod.toUpperCase()}. Semua fitur Jastip VIP kini terbuka!`
          : `Payment of Rp15,000 processed successfully via ${selectedPayMethod.toUpperCase()}. All VIP Jastip features are now unlocked!`,
        'success'
      );
    }, 1800);
  };

  // 1b. Mock Auth Submit Handler
  const handleMockAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authRole !== 'guest' && !authEmail) {
      onShowNotification(
        language === 'ID' ? '⚠️ Email Kosong' : '⚠️ Email Empty',
        language === 'ID' ? 'Harap lengkapi email Anda.' : 'Please enter your email.',
        'warn'
      );
      return;
    }
    setIsLoggedMock(true);
    onShowNotification(
      language === 'ID' ? '🔒 Berhasil Masuk' : '🔒 Successfully Signed In',
      language === 'ID'
        ? `Selamat datang! Akun Anda aktif dengan izin akses peran: ${
            authRole === 'buyer' 
              ? 'Pemburu Thrift (Pembeli)' 
              : authRole === 'seller' ? 'Pemilik Toko (Penjual)' : 'Masuk Tanpa Akun'
          }.`
        : `Welcome! Your account is active with the role: ${
            authRole === 'buyer' 
              ? 'Thrift Hunter (Buyer)' 
              : authRole === 'seller' ? 'Store Owner (Seller)' : 'Guest Login'
          }.`,
      'success'
    );
  };

  return (
    <div className="space-y-16 py-12 border-t border-indigo-950/60" id="indonesia-thrift-showcase-root">
      
      {/* SECTION 4: AREA PROFIL PENGGUNA (👑 Quick Dashboard Node Mockup with Premium Indicator) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest leading-none">
                  {language === 'ID' ? 'KOLABORASI RUANG KERJA' : 'INTEGRATED VISUAL WORKSPACE'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                {language === 'ID' ? 'AREA PROFIL & DASBHOR UTAMA' : 'MAIN PROFILE & DASHBOARD AREA'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'ID' 
                  ? 'Akses instan pemantauan status akun dan radar pencarian thrift Anda secara komprehensif.'
                  : 'Instant access to account monitoring and comprehensive thrift radar tracking.'}
              </p>
            </div>

            {/* Premium Mode 👑 Ticket Badge */}
            <div className="flex items-center space-x-4 bg-slate-950/80 border border-indigo-500/30 p-4 rounded-xl shrink-0">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center font-black text-xs text-white ring-2 ring-amber-400">
                  MM
                </div>
                <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 p-0.5 rounded-full text-[8px] border border-slate-950">
                  👑
                </span>
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-xs text-white">Medina Maryam</span>
                  <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 py-0.5 px-2 text-[9px] font-mono font-black rounded-lg leading-none animate-pulse">
                    Premium Mode 👑
                  </span>
                </div>
                <p className="text-[10px] text-slate-450 font-mono mt-1">ID: SD-998142 • {language === 'ID' ? 'Pemburu Thrift' : 'Thrift Hunter'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: FITUR LOGIN/DAFTAR (PILIHAN PERAN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/10 border border-indigo-950 p-6 md:p-10 rounded-3xl relative">
          
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-indigo-950 text-indigo-400 border border-indigo-500/25 rounded text-[10px] font-mono font-bold uppercase">
              🔒 Unified Portal Access
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight">
              {language === 'ID' ? 'FORM LOGIN / DAFTAR AKUN' : 'LOGIN / REGISTER PORTAL'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              {language === 'ID'
                ? 'Segera klaim akses pemantauan rilis eksklusif. Bergabunglah dengan platform tepercaya untuk menyortir pakaian vintage berkualitas langsung ke layar gadget Anda.'
                : 'Claim your exclusive release tracking access. Join the trusted platform to filter quality vintage clothes directly to your device.'}
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <span className="text-indigo-400 text-sm">✓</span>
                <span>{language === 'ID' ? 'Role Terisolasi secara visual tanpa merusak skema internal.' : 'Roles isolated visually without altering internal database schemas.'}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <span className="text-indigo-400 text-sm">✓</span>
                <span>{language === 'ID' ? 'Terintegrasi pengiriman telemetry radar instan via e-mail.' : 'Integrated instant radar telemetry updates sent via email.'}</span>
              </div>
            </div>
          </div>

          {/* Right form widget column */}
          <div className="lg:col-span-7 bg-slate-950 border border-indigo-950 p-6 sm:p-8 rounded-2xl shadow-xl">
            <form onSubmit={handleMockAuthSubmit} className="space-y-5">
              
              {/* Role selector choice */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-300 font-mono uppercase tracking-wider block text-left">
                  {language === 'ID' ? 'PILIH PERAN AKSES' : 'SELECT ACCESS ROLE'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Buyer Card Button */}
                  <button
                    type="button"
                    onClick={() => setAuthRole('buyer')}
                    className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                      authRole === 'buyer'
                        ? 'bg-slate-900 border-[#FBF7F0] text-white ring-1 ring-white/10'
                        : 'bg-slate-950/40 border-indigo-950 hover:border-indigo-500/20 text-slate-450'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-lg">🎯</span>
                      {authRole === 'buyer' && (
                        <span className="text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 px-2 py-0.5 font-mono font-bold rounded">
                          {language === 'ID' ? 'AKTIF' : 'ACTIVE'}
                        </span>
                      )}
                    </div>
                    <div className="mt-3">
                      <h4 className="text-xs font-black text-white uppercase">
                        {language === 'ID' ? 'Pemburu Thrift (Pembeli)' : 'Thrift Hunter (Buyer)'}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1 leading-snug font-sans">
                        {language === 'ID'
                          ? 'Pemesanan Jastip kilat, bookmark item, alarm radar tak terbatas.'
                          : 'Flash Jastip booking, bookmark favorites, setup unlimited radar alerts.'}
                      </p>
                    </div>
                  </button>

                  {/* Seller Card Button */}
                  <button
                    type="button"
                    onClick={() => setAuthRole('seller')}
                    className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                      authRole === 'seller'
                        ? 'bg-slate-900 border-[#FBF7F0] text-white ring-1 ring-white/10'
                        : 'bg-slate-950/40 border-indigo-950 hover:border-indigo-500/20 text-slate-450'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-lg">🏪</span>
                      {authRole === 'seller' && (
                        <span className="text-[9px] bg-purple-500/20 text-purple-300 border border-purple-400/30 px-2 py-0.5 font-mono font-bold rounded">
                          {language === 'ID' ? 'AKTIF' : 'ACTIVE'}
                        </span>
                      )}
                    </div>
                    <div className="mt-3">
                      <h4 className="text-xs font-black text-white uppercase">
                        {language === 'ID' ? 'Pemilik Toko (Penjual)' : 'Store Owner (Seller)'}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1 leading-snug font-sans">
                        {language === 'ID'
                          ? 'Kelola sirkulasi katalog pakaian baru, pantau analitik jastip online.'
                          : 'Manage release schedules for new listings, monitor online buyer requests.'}
                      </p>
                    </div>
                  </button>

                  {/* Guest Card Button */}
                  <button
                    type="button"
                    onClick={() => setAuthRole('guest')}
                    className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                      authRole === 'guest'
                        ? 'bg-slate-900 border-[#FBF7F0] text-white ring-1 ring-white/10'
                        : 'bg-slate-950/40 border-indigo-950 hover:border-indigo-500/20 text-slate-450'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-lg">👥</span>
                      {authRole === 'guest' && (
                        <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 font-mono font-bold rounded">
                          {language === 'ID' ? 'AKTIF' : 'ACTIVE'}
                        </span>
                      )}
                    </div>
                    <div className="mt-3">
                      <h4 className="text-xs font-black text-white uppercase">
                        {language === 'ID' ? 'Masuk Tanpa Akun' : 'Enter as Guest'}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-1 leading-snug font-sans">
                        {language === 'ID'
                          ? 'Jelajahi katalog rilis vintage dan lihat timer aktif secara instan.'
                          : 'Explore vintage listings and view countdown timers instantly.'}
                      </p>
                    </div>
                  </button>

                </div>
              </div>

              {/* Form Input fields */}
              {!isLoggedMock ? (
                <div className="space-y-4">
                  {authRole !== 'guest' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-slate-400 uppercase">
                          {language === 'ID' ? 'Nama Lengkap' : 'Full Name'}
                        </label>
                        <input
                          type="text"
                          placeholder={language === 'ID' ? 'contoh: Medina Maryam' : 'e.g. Medina Maryam'}
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          className="w-full bg-slate-950 border border-indigo-950 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-slate-400 uppercase">
                          {language === 'ID' ? 'Alamat Email' : 'Email Address'}
                        </label>
                        <input
                          type="email"
                          placeholder="medina@gmail.com"
                          value={authEmail}
                          onChange={(e) => setAuthEmail(e.target.value)}
                          className="w-full bg-slate-950 border border-indigo-950 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#FBF7F0] hover:bg-white text-slate-950 font-black text-xs rounded-xl uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    {language === 'ID' 
                      ? `⚡ MASUK SEBAGAI ${authRole === 'buyer' ? 'PEMBURU THRIFT' : authRole === 'seller' ? 'PEMILIK TOKO' : 'TAMU'}`
                      : `⚡ JOIN AS ${authRole === 'buyer' ? 'THRIFT HUNTER' : authRole === 'seller' ? 'STORE OWNER' : 'GUEST'}`}
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-emerald-950/20 border border-emerald-500/20 rounded-xl text-center space-y-2">
                  <div className="w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white uppercase">
                      {language === 'ID' ? 'Akses Terotorisasi Sukses' : 'Authorized Access Successful'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {language === 'ID' ? 'Akun terdaftar sebagai' : 'Account registered as'}{' '}
                      <strong className="text-[#FBF7F0]">
                        {authRole === 'buyer' 
                          ? (language === 'ID' ? 'Pemburu Thrift' : 'Thrift Hunter') 
                          : authRole === 'seller' 
                            ? (language === 'ID' ? 'Pemilik Toko' : 'Store Owner') 
                            : (language === 'ID' ? 'Tamu' : 'Guest')}
                      </strong>
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* SECTION 2: KATALOG PAKAIAN WANITA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          
          {/* Header Title Grid */}
          <div className="md:flex md:items-end md:justify-between text-left">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 bg-rose-950 text-rose-350 border border-rose-500/20 text-[10px] font-mono rounded font-bold uppercase mb-2">
                {language === 'ID' ? '🌸 Katalog Khusus Busana Wanita' : '🌸 Dedicated Womenswear Catalog'}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                {language === 'ID' ? 'KATALOG PAKAIAN WANITA' : 'WOMENSWEAR CATALOG'}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {language === 'ID'
                  ? 'Koleksi vintage eksklusif yang dikurasi khusus untuk wanita. Klik alarm untuk memantau radar jastip secara instan.'
                  : 'Exclusive vintage pieces curated specially for women. Click the alarm button to track instant Jastip radar updates.'}
              </p>
            </div>
          </div>

          {/* Product Grid of Exactly (Vintage Blouse, Thrifted Cardigan, Retro Skirt) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {womenswearProducts.map((prod) => {
              const isAlertOn = radarAlerts.includes(prod.id);
              return (
                <div
                  key={prod.id}
                  className="bg-slate-950 border border-indigo-950 hover:border-indigo-500/30 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1"
                >
                  
                  {/* Image Wrapper */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={prod.imageUrl}
                      alt={prod.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-85" />
                    
                    {/* Size and Condition Badges */}
                    <div className="absolute top-3 left-3 flex space-x-1.5">
                      <span className="bg-slate-900/95 text-[10px] font-mono border border-indigo-950/80 text-slate-300 px-2.5 py-0.5 rounded-lg font-bold">
                        {prod.condition}
                      </span>
                    </div>

                    <span className="absolute top-3 right-3 bg-indigo-950/95 border border-indigo-500/25 px-2 py-0.5 rounded font-mono text-[10px] text-indigo-300 font-black">
                      Size {prod.size}
                    </span>

                    <div className="absolute bottom-3 left-3">
                      <p className="text-[10px] text-rose-450 font-mono font-black uppercase leading-none">{prod.brand}</p>
                      <h4 className="text-sm font-bold text-white mt-1 leading-snug tracking-tight">
                        {prod.title}
                      </h4>
                    </div>
                  </div>

                  {/* Body Specs */}
                  <div className="p-4 space-y-4 flex-grow flex flex-col justify-between text-left">
                    <p className="text-xs text-slate-400 leading-relaxed font-sans min-h-[54px]">
                      {prod.desc}
                    </p>

                    <div className="pt-3 border-t border-indigo-950/20 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest leading-none">
                          {language === 'ID' ? 'Harga Jastip' : 'Jastip Price'}
                        </span>
                        <span className="text-sm font-mono font-black text-[#FBF7F0] mt-1">{prod.price}</span>
                      </div>

                      {/* Pasang Radar Alert Button */}
                      <button
                        type="button"
                        onClick={() => handleToggleRadar(prod.id, prod.title)}
                        className={`px-4 py-2 border rounded-lg font-mono font-bold text-[10px] uppercase transition-all flex items-center space-x-1.5 cursor-pointer ${
                          isAlertOn
                            ? 'bg-rose-950 text-rose-300 border-rose-500/30 shadow'
                            : 'bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border-indigo-500/20'
                        }`}
                      >
                        <BellRing className={`w-3.5 h-3.5 shrink-0 ${isAlertOn ? 'animate-bounce text-rose-400' : 'text-indigo-400'}`} />
                        <span>
                          {isAlertOn 
                            ? (language === 'ID' ? 'Radar Aktif ✓' : 'Radar Active ✓') 
                            : (language === 'ID' ? 'Pasang Radar Alert' : 'Set Radar Alert')}
                        </span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 3: SIMULASI PEMBAYARAN INSTAN (QRIS, DANA, OVO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-950/20 via-slate-950 to-indigo-950/50 border border-indigo-500/10 p-6 md:p-10 rounded-3xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left promo box info */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-3">
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-[9px] font-black tracking-widest px-2.5 py-0.5 rounded uppercase inline-block">
                  INSTANT PAYMENT PORTAL
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                  {language === 'ID' ? 'SIMULASI PEMBAYARAN PREMIUM' : 'ACTIVATE PREMIUM ACCESS NOW'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {language === 'ID' 
                    ? 'Dapatkan diskon potongan VIP, 1-click buy bypass, dan prioritas antrean logistik dengan mengaktifkan SnipeDrop Premium senilai '
                    : 'Get VIP discounts, 1-click buy bypass, and logistics priority access by activating SnipeDrop Premium for '}
                  <strong className="text-white font-mono">Rp15.000 / {language === 'ID' ? 'bulan' : 'month'}</strong>.
                </p>
              </div>

              {/* Perks Checklist */}
              <div className="space-y-2.5">
                <div className="flex items-center space-x-2 text-xs text-slate-350">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>
                    {language === 'ID' ? 'Koneksi instan Settlement Sandbox Gateway.' : 'Instant settlement Sandbox Gateway connection.'}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-350">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>
                    {language === 'ID' ? 'Dukungan otomatisasi invoice multi-channel.' : 'Multi-channel automated invoice integration.'}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-350">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>
                    {language === 'ID' ? 'Moneyback guarantee keamanan 100%.' : '100% security moneyback guarantee safety.'}
                  </span>
                </div>
              </div>

              {isPremium && (
                <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/10 rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <p className="text-[10px] font-mono text-emerald-300 font-bold leading-normal">
                    {language === 'ID' 
                      ? '✓ SUBSCRIPTION PREMIUM SEDANG AKTIF DI LAYAR!' 
                      : '✓ PREMIUM SUBSCRIPTION IS ACTIVE ON SCREEN!'}
                  </p>
                </div>
              )}
            </div>

            {/* Right Interactive Payment widget with QRIS, DANA, OVO */}
            <div className="lg:col-span-7 bg-slate-950/80 border border-indigo-950 p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
              <form onSubmit={handleSimulatePayment} className="space-y-6">
                
                {/* Visual choice selector tabs */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold text-left">
                    {language === 'ID' ? 'Pilih Tombol Pembayaran Instan' : 'Select Instant Payment Method'}
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    
                    {/* QRIS Choice Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPayMethod('qris');
                        onShowNotification('Payment Gate Selected', 'Mode QRIS National diaktifkan untuk checkout.', 'info');
                      }}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                        selectedPayMethod === 'qris'
                          ? 'bg-indigo-950/50 border-indigo-500 text-white shadow-md'
                          : 'bg-slate-900/10 border-indigo-950 text-slate-450 hover:text-slate-200'
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-indigo-400" />
                      <span className="text-[10px] font-mono font-black">QRIS Code</span>
                    </button>

                    {/* DANA Choice Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPayMethod('dana');
                        onShowNotification('Payment Gate Selected', 'E-Wallet DANA terpilih untuk settlement.', 'info');
                      }}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                        selectedPayMethod === 'dana'
                          ? 'bg-sky-950/50 border-sky-500 text-white shadow-md'
                          : 'bg-slate-900/10 border-indigo-950 text-slate-450 hover:text-slate-200'
                      }`}
                    >
                      <Wallet className="w-5 h-5 text-sky-400" />
                      <span className="text-[10px] font-mono font-black">DANA</span>
                    </button>

                    {/* OVO Choice Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPayMethod('ovo');
                        onShowNotification('Payment Gate Selected', 'E-Wallet OVO terpilih untuk settlement.', 'info');
                      }}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                        selectedPayMethod === 'ovo'
                          ? 'bg-purple-950/50 border-purple-500 text-white shadow-md'
                          : 'bg-slate-900/10 border-indigo-950 text-slate-450 hover:text-slate-200'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 text-purple-400" />
                      <span className="text-[10px] font-mono font-black">OVO</span>
                    </button>

                  </div>
                </div>

                {/* Dynamic panel block view based on method */}
                {selectedPayMethod === 'qris' && (
                  <div className="bg-slate-900/60 border border-indigo-950 p-4 rounded-xl flex items-center gap-4 text-left">
                    <div className="bg-white p-1 rounded shadow shrink-0">
                      <div className="w-20 h-20 bg-slate-950 p-1 relative flex flex-col justify-between">
                        <div className="flex justify-between">
                          <div className="w-4 h-4 bg-white rounded-xs" />
                          <div className="w-4 h-4 bg-white rounded-xs" />
                        </div>
                        <div className="absolute inset-0 m-6 bg-indigo-500 rounded-xs flex items-center justify-center text-[5px] text-white font-bold">QRIS</div>
                        <div className="flex justify-between">
                          <div className="w-4 h-4 bg-white rounded-xs" />
                          <div className="w-4 h-4 bg-white/40 rounded-xs" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white font-mono uppercase">GPN QRIS PAYOUT SIMULATOR</h4>
                      <p className="text-[10px] text-slate-400 leading-normal mt-1 leading-snug">
                        {language === 'ID'
                          ? 'Scan QR Code di layar menggunakan GoPay, ShopeePay, DANA, LinkAja, atau aplikasi m-banking nasional Anda.'
                          : 'Scan the QR Code on screen using GoPay, ShopeePay, DANA, LinkAja, or your national banking application.'}
                      </p>
                    </div>
                  </div>
                )}

                {(selectedPayMethod === 'dana' || selectedPayMethod === 'ovo') && (
                  <div className="bg-slate-900/60 border border-indigo-950 p-4 rounded-xl space-y-2 text-left">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                      {language === 'ID' ? 'Nomor HP Terhubung' : 'Connected Mobile Number'} ({selectedPayMethod.toUpperCase()})
                    </label>
                    <input
                      type="tel"
                      placeholder={language === 'ID' ? 'contoh: 081234567890' : 'e.g. +6281234567890'}
                      value={payPhoneNumber}
                      onChange={(e) => setPayPhoneNumber(e.target.value)}
                      className="w-full bg-slate-950 border border-indigo-950 rounded-lg p-2 text-xs font-mono text-white focus:outline-none"
                    />
                    <p className="text-[9px] text-indigo-400 font-mono">
                      {language === 'ID' 
                        ? '* Permintaan pembayaran instan akan secara khusus dikirimkan ke aplikasi Anda.'
                        : '* Instant payment push requests will be sent directly to your mobile app.'}
                    </p>
                  </div>
                )}

                {/* Sandbox Protection */}
                <div className="flex items-start space-x-2.5 p-3.5 bg-indigo-950/20 rounded-xl border border-indigo-500/10 text-left">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-400 font-sans leading-normal">
                    {language === 'ID'
                      ? 'Simulasi Settlement Terenkripsi: Akun Anda tidak akan dikenakan biaya nyata. Ini murni mockup sirkulasi token API Sandbox.'
                      : 'Encrypted Settlement Simulation: Your account will not be charged. This is purely a Sandbox API mockup flow.'}
                  </p>
                </div>

                {/* Pay Trigger Box */}
                <button
                  type="submit"
                  disabled={payProcessing}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:from-emerald-600 active:scale-95 transition-all shadow cursor-pointer disabled:opacity-50"
                >
                  {payProcessing 
                    ? (language === 'ID' ? 'Memproses Invoice ...' : 'Settling Invoice ...') 
                    : (language === 'ID' 
                        ? `✓ BAYAR INSTAN RP 15.000 VIA ${selectedPayMethod.toUpperCase()}`
                        : `✓ INSTANT PAY RP15,000 VIA ${selectedPayMethod.toUpperCase()}`)}
                </button>

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: SECTION TESTIMONI (KOTAK ULASAN REVIEW DARI PEMBELI INDONESIA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          
          <div className="text-center max-w-xl mx-auto space-y-2 text-center">
            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-slate-900 text-indigo-400 border border-indigo-500/20 rounded text-[10px] font-mono font-bold uppercase mx-auto">
              💬 USER REVIEW BOXES
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              {language === 'ID' ? 'ULASAN & REVIEW TERBARU PEMBELI' : 'HUNTERS SUCCESS STORIES'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-450 leading-relaxed">
              {language === 'ID'
                ? 'Dengar langsung dari kolektor busana vintage yang berhasil memanfaatkan teknologi radar alert SnipeDrop.'
                : 'Hear directly from vintage collectors who unlocked premium results using SnipeDrop\'s tracking radar technology.'}
            </p>
          </div>

          {/* Testimonial Review grid boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* Box 1 */}
            <div className="bg-slate-950 border border-indigo-950 hover:border-indigo-500/20 p-5 rounded-2xl relative transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed font-sans">
                  {language === 'ID'
                    ? '"Jastip dapet Vintage Blouse Saint Laurent ga nyampe semenit! Fitur radar alert-nya gokil banget langsung kirim WA pas rilis. Biasanya rebutan di lapak oren susah banget dapet size S. SnipeDrop juara!"'
                    : '"Got a Vintage Saint Laurent Blouse via Jastip in under a minute! The radar alert feature is insane, direct WA ping right when it drops. Sizing has always been hard to fight for, but SnipeDrop wins!"'}
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-3.5 border-t border-indigo-900/20">
                <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center font-mono font-black text-xs text-white uppercase sm:font-bold">
                  AM
                </div>
                <div>
                  <strong className="text-xs text-white block">Amelia Lestari</strong>
                  <span className="text-[9px] font-mono text-indigo-400 block mt-0.5">
                    @amel_vntg • {language === 'ID' ? '5 barang disnipe' : '5 items sniped'}
                  </span>
                </div>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-slate-950 border border-indigo-950 hover:border-indigo-550/20 p-5 rounded-2xl relative transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed font-sans">
                  {language === 'ID'
                    ? '"Sewa server jastip murah meriah cuma Rp15 rebu doang. Kemarin sniped Prada Crochet Cardigan langsung masuk antrean prioritas. Dashboard Premium Mode-nya rapih bangat."'
                    : '"Renting a checkout proxy server for only Rp15k is a steal. Successfully sniped a Prada Crochet Cardigan with express queue priority yesterday. Premium Mode dashboard is incredibly clean."'}
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-3.5 border-t border-indigo-900/20">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-mono font-black text-xs text-white uppercase sm:font-bold">
                  DN
                </div>
                <div>
                  <strong className="text-xs text-white block">Danang Prasetyo</strong>
                  <span className="text-[9px] font-mono text-indigo-400 block mt-0.5">
                    @danang_casuals • {language === 'ID' ? '3 barang disnipe' : '3 items sniped'}
                  </span>
                </div>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-slate-950 border border-indigo-950 hover:border-indigo-550/20 p-5 rounded-2xl relative transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed font-sans">
                  {language === 'ID'
                    ? '"Sebagai pemilik toko vintage, penjadwalan drops di dashboard SnipeDrop sangat mempermudah promosi katalog baju wanita terbaru. Customer pada stay nungguin timer rilis di home!"'
                    : '"As a vintage store owner, scheduling drops on the SnipeDrop dashboard makes marketing new women\'s catalogs effortless. Customers stick around waiting for the release timer!"'}
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-3.5 border-t border-indigo-900/20">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-mono font-black text-xs text-white uppercase sm:font-bold">
                  SK
                </div>
                <div>
                  <strong className="text-xs text-white block">Siska Indah</strong>
                  <span className="text-[9px] font-mono text-indigo-400 block mt-0.5">
                    @siska_thriftshop • {language === 'ID' ? '12 Drops Dijadwalkan' : '12 Drops Scheduled'}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
