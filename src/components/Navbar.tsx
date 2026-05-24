import React from 'react';
import { Target, Shield, CreditCard, Flame, Menu, X, Users, User, LogIn, LogOut, Globe } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isPremium: boolean;
  setIsPremium: (prem: boolean) => void;
  userProfile: UserProfile | null;
  onLogout: () => void;
  onOpenAuth: () => void;
  language: 'ID' | 'EN';
  setLanguage: (lang: 'ID' | 'EN') => void;
  onShowNotification?: (title: string, desc: string, type?: 'info' | 'success' | 'warn') => void;
}

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  isPremium, 
  setIsPremium,
  userProfile,
  onLogout,
  onOpenAuth,
  language,
  setLanguage,
  onShowNotification
}: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { id: 'home', label: language === 'ID' ? 'BERANDA' : 'HOME' },
    { id: 'catalog', label: language === 'ID' ? 'KATALOG DROP' : 'DROP CATALOG' },
    { id: 'premium', label: language === 'ID' ? 'PREMIUM' : 'PREMIUM' },
    { id: 'about', label: language === 'ID' ? 'TENTANG KAMI' : 'ABOUT US' }
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/90 border-b border-indigo-950/80 shadow-xl px-4 sm:px-6 lg:px-8 py-2 md:py-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between md:h-20 h-16 gap-4">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer space-x-3 group shrink-0"
            onClick={() => setCurrentTab('home')}
          >
            <div className="relative p-2.5 bg-indigo-900/60 border border-indigo-500/30 rounded-xl group-hover:scale-105 transition-all">
              <Target className="w-5 h-5 text-[#FBF7F0] group-hover:text-white" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FBF7F0] rounded-full animate-ping" />
            </div>
            <div>
              <span className="font-black text-2xl tracking-tighter text-white flex items-center">
                SNIPE<span className="text-[#FBF7F0] ml-0.5">DROP</span>
              </span>
              <p className="text-[10px] text-white/90 font-mono tracking-widest leading-none">REAL-TIME THRIFT</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 mx-4">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-white/10 text-white border-b-2 border-[#FBF7F0]'
                      : 'text-white/80 hover:text-white hover:bg-slate-900/40'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            {userProfile && (
              <button
                onClick={() => setCurrentTab('profile')}
                className={`px-4 py-2.5 rounded-lg font-black text-sm transition-all duration-200 ${
                  currentTab === 'profile'
                    ? 'bg-white/10 text-white border-b-2 border-[#FBF7F0]'
                    : 'text-white/80 hover:text-white hover:bg-slate-900/40'
                }`}
              >
                {language === 'ID' ? 'DASHBOARD SAYA' : 'MY DASHBOARD'}
              </button>
            )}
          </div>

          {/* User Tier Status + Auth Controls */}
          <div className="hidden md:flex items-center space-x-4 shrink-0">
            
            {/* Language Selection Toggle */}
            <div className="flex items-center bg-slate-900 rounded-full p-1 border border-indigo-950/80 text-xs font-mono font-bold">
              <span className="p-1 px-1.5 text-slate-500">
                <Globe className="w-3.5 h-3.5" />
              </span>
              <button
                type="button"
                onClick={() => {
                  setLanguage('ID');
                  onShowNotification?.('Bahasa Diubah', 'Aplikasi sekarang menggunakan Bahasa Indonesia.', 'info');
                }}
                className={`px-2.5 py-0.5 rounded-full text-[10px] transition-all duration-200 ${
                  language === 'ID'
                    ? 'bg-[#FBF7F0] text-slate-950 shadow-md font-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => {
                  setLanguage('EN');
                  onShowNotification?.('Language Switched', 'Application matches English locale.', 'info');
                }}
                className={`px-2.5 py-0.5 rounded-full text-[10px] transition-all duration-200 ${
                  language === 'EN'
                    ? 'bg-[#FBF7F0] text-slate-950 shadow-md font-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <div className="flex items-center bg-slate-900 rounded-full p-1 border border-indigo-950">
              <button
                onClick={() => setIsPremium(false)}
                className={`px-3 py-1 text-xs rounded-full font-semibold transition-all duration-200 ${
                  !isPremium
                    ? 'bg-slate-800 text-white shadow-sm border border-slate-700/50'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Free Tier
              </button>
              <button
                onClick={() => setIsPremium(true)}
                className={`relative px-3 py-1 text-xs rounded-full font-extrabold transition-all duration-250 flex items-center space-x-1 ${
                  isPremium
                    ? 'bg-[#FBF7F0] text-slate-950 shadow-xl border border-[#FBF7F0]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <Flame className={`w-3 h-3 ${isPremium ? 'text-amber-600' : 'text-amber-400'} animate-pulse`} />
                <span>Premium VIP</span>
              </button>
            </div>

            {/* Authentic User Authenticate state logic */}
            {userProfile ? (
              <div className="flex items-center space-x-3 bg-slate-900/90 border border-indigo-500/30 hover:border-[#FBF7F0]/40 px-3 py-1.5 rounded-2xl transition-all shadow-md shadow-[#000]/60">
                <div 
                  className="flex items-center space-x-2 cursor-pointer hover:opacity-90 group"
                  onClick={() => setCurrentTab('profile')}
                  title="View Profile Dashboard"
                >
                  {/* Glowing user avatar initials badge with Vintage Cream highlight */}
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FBF7F0] via-indigo-300 to-indigo-550 text-slate-950 flex items-center justify-center font-black text-xs shadow-inner ring-1 ring-white/50 relative overflow-hidden group-hover:scale-105 transition-transform duration-200">
                    <span className="relative z-10 text-slate-950 font-black">
                      {userProfile.fullName ? userProfile.fullName.substring(0,2).toUpperCase() : 'ME'}
                    </span>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  {/* Role and status indicators */}
                  <div className="flex flex-col text-left">
                    <span className="text-xs text-[#FBF7F0] font-sans font-black tracking-tight leading-none group-hover:text-white transition-colors">
                      {userProfile.fullName.split(' ')[0]}
                    </span>
                    
                    {/* Role Pill Flag */}
                    <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider mt-1 ${
                      userProfile.role === 'buyer' 
                        ? 'bg-blue-950/90 text-blue-300 border border-blue-500/30' 
                        : 'bg-purple-950/90 text-purple-300 border border-purple-500/30'
                    }`}>
                      {userProfile.role === 'buyer' ? '🎯 Thrift Sniper' : '🏪 Store Owner'}
                    </span>
                  </div>
                </div>
                
                <div className="h-6 w-[1px] bg-indigo-950" />

                <button
                  onClick={onLogout}
                  className="text-slate-400 hover:text-rose-400 p-1 rounded-lg transition-colors"
                  title="Sign out of account"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-[#FBF7F0] hover:bg-[#FBF7F0]/90 text-slate-950 border border-[#FBF7F0]/40 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-md hover:scale-102 transition-all flex items-center space-x-1.5 z-10 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Login / Join</span>
              </button>
            )}

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Quick Mobile Auth Badge */}
            {userProfile ? (
              <div 
                className="w-7 h-7 rounded-full bg-indigo-700 text-white flex items-center justify-center font-bold text-xs ring-1 ring-indigo-500/50"
                onClick={() => setCurrentTab('profile')}
              >
                {userProfile.fullName ? userProfile.fullName.substring(0, 2).toUpperCase() : 'ME'}
              </div>
            ) : (
              <span 
                onClick={onOpenAuth}
                className="text-[10px] px-2.5 py-1 rounded bg-indigo-900 text-white font-mono uppercase font-bold cursor-pointer"
              >
                JOIN
              </span>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white hover:bg-slate-900 p-2 rounded-lg"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Open Drawer/Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-indigo-950/60 py-3 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-indigo-900/30 text-white border-l-4 border-indigo-400 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {userProfile && (
            <button
              onClick={() => {
                setCurrentTab('profile');
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-bold text-sm transition-all ${
                currentTab === 'profile'
                  ? 'bg-rose-950/30 text-rose-300 border-l-4 border-rose-500'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              {language === 'ID' ? 'Dashboard Profil Saya' : 'My Profile Dashboard'}
            </button>
          )}
          
          <div className="pt-2 border-t border-indigo-950/60 space-y-3">
            <p className="text-[10px] text-slate-500 font-mono uppercase px-4 mb-0.5">Language / Bahasa:</p>
            <div className="grid grid-cols-2 gap-2 px-4">
              <button
                type="button"
                onClick={() => {
                  setLanguage('ID');
                  setIsOpen(false);
                  onShowNotification?.('Bahasa Diubah', 'Aplikasi menggunakan Bahasa Indonesia.', 'info');
                }}
                className={`py-1.5 text-xs font-semibold rounded-md ${
                  language === 'ID' ? 'bg-[#FBF7F0] text-slate-950 font-black' : 'bg-slate-900/50 text-slate-400'
                }`}
              >
                Indonesia (ID)
              </button>
              <button
                type="button"
                onClick={() => {
                  setLanguage('EN');
                  setIsOpen(false);
                  onShowNotification?.('Language Switched', 'Application set to English.', 'info');
                }}
                className={`py-1.5 text-xs font-semibold rounded-md ${
                  language === 'EN' ? 'bg-[#FBF7F0] text-slate-950 font-black' : 'bg-slate-900/50 text-slate-400'
                }`}
              >
                English (EN)
              </button>
            </div>

            <p className="text-[10px] text-slate-500 font-mono uppercase px-4 mb-0.5">Trial membership:</p>
            <div className="grid grid-cols-2 gap-2 px-4">
              <button
                onClick={() => {
                  setIsPremium(false);
                  setIsOpen(false);
                }}
                className={`py-1.5 text-xs font-semibold rounded-md ${
                  !isPremium ? 'bg-slate-800 text-white' : 'bg-slate-900/50 text-slate-400'
                }`}
              >
                Free Tier
              </button>
              <button
                onClick={() => {
                  setIsPremium(true);
                  setIsOpen(false);
                }}
                className={`py-1.5 text-xs font-bold rounded-md flex items-center justify-center space-x-1 ${
                  isPremium ? 'bg-indigo-600 text-white' : 'bg-slate-900/50 text-slate-400'
                }`}
              >
                <Flame className="w-3 h-3 text-amber-400" />
                <span>Premium VIP</span>
              </button>
            </div>

            {userProfile && (
              <div className="px-4 pt-1">
                <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="w-full py-2 bg-rose-950/50 text-rose-450 hover:bg-rose-900 hover:text-white transition-all text-xs font-bold rounded-lg border border-rose-900/30 flex items-center justify-center space-x-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out of @{userProfile.username}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
