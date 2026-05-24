import React, { useState } from 'react';
import { Shield, Mail, Lock, User, UserCheck, Eye, EyeOff, MapPin, Navigation, X } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

const NESTED_LOCATIONS: Record<string, string[]> = {
  Indonesia: [
    'Bangka Belitung (Pangkalpinang Hub) [Set as Default]',
    'Jakarta Global Hub',
    'Bandung Vintage Market'
  ],
  Japan: [
    'Tokyo Harajuku Radar',
    'Kyoto Vintage Vault'
  ],
  Netherlands: [
    'Amsterdam Europe Hub'
  ],
  'United Kingdom': [
    'London Soho District'
  ]
};

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Indonesia');
  const [selectedRegion, setSelectedRegion] = useState('Bangka Belitung (Pangkalpinang Hub) [Set as Default]');
  const [isDetecting, setIsDetecting] = useState(false);

  if (!isOpen) return null;

  const handleDetectLocation = () => {
    setIsDetecting(true);
    setError('');
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setIsDetecting(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const latStr = latitude.toFixed(4);
        const lonStr = longitude.toFixed(4);
        
        // Match approximate real regions or display a elegant custom location
        let guessedCountry = 'Indonesia';
        let guessedHub = 'Bangka Belitung (Pangkalpinang Hub) [Set as Default]';
        
        if (latitude > -6.5 && latitude < -5.9) {
          guessedCountry = 'Indonesia';
          guessedHub = 'Jakarta Global Hub';
        } else if (latitude > 34 && latitude < 36) {
          guessedCountry = 'Japan';
          guessedHub = 'Tokyo Harajuku Radar';
        } else if (latitude > 50 && latitude < 53) {
          guessedCountry = 'Netherlands';
          guessedHub = 'Amsterdam Europe Hub';
        } else if (latitude > 51 && latitude < 53) {
          guessedCountry = 'United Kingdom';
          guessedHub = 'London Soho District';
        }

        setSelectedCountry(guessedCountry);
        setSelectedRegion(guessedHub);
        setIsDetecting(false);
      },
      (err) => {
        console.error(err);
        setError('Location permission denied or timed out. Please choose a hub from the menu manually.');
        setIsDetecting(false);
      },
      { timeout: 7000 }
    );
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    const regions = NESTED_LOCATIONS[country];
    if (regions && regions.length > 0) {
      setSelectedRegion(regions[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please provide a valid email address.');
      return;
    }
    
    if (!password || password.length < 5) {
      setError('Password must be at least 5 characters.');
      return;
    }

    if (!isLogin && !username) {
      setError('Please provide an elegant username.');
      return;
    }

    const calculatedUsername = isLogin ? (email.split('@')[0] || 'thrift_hunter') : username;
    const calculatedFullName = isLogin ? (calculatedUsername.charAt(0).toUpperCase() + calculatedUsername.slice(1)) : fullName;

    const mockProfile: UserProfile = {
      id: `user_mock_${Math.floor(Math.random() * 10000)}`,
      username: calculatedUsername.toLowerCase().replace(/\s+/g, '_'),
      fullName: calculatedFullName || 'Premium Hunter',
      email: email,
      role: role,
      wishlist: ['drop_1', 'drop_w1'], // Preloaded interesting drops
      createdAt: new Date().toISOString(),
      location: `${selectedRegion}, ${selectedCountry}`
    };

    onLoginSuccess(mockProfile);
    onClose();
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 overflow-y-auto flex items-center justify-center p-4 py-8">
      <div 
        id="auth-modal-content" 
        className="bg-gradient-to-b from-indigo-950 to-slate-950 border border-indigo-500/20 max-w-md w-full rounded-2xl p-6 md:p-8 pt-10 md:pt-12 shadow-2xl relative overflow-hidden my-auto"
      >
        {/* Glow backdrop visual decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button 
          id="close-auth-modal"
          onClick={onClose}
          aria-label="Close authentication form"
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-900/90 hover:bg-slate-800 p-2 rounded-xl border border-indigo-950 hover:border-indigo-500/30 transition-all cursor-pointer group hover:scale-105 active:scale-95"
        >
          <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
        </button>

        <div className="space-y-6">
          {/* Header Title with security logo */}
          <div className="text-center space-y-1.5">
            <div className="inline-flex p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20 mb-1">
              <Shield className="w-5.5 h-5.5 text-[#FBF7F0]" />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              {isLogin ? 'Welcome Back Hunter' : 'Daftar Snipe Account'}
            </h3>
            <p className="text-xs text-white/70">
              {isLogin ? 'Access your high speed Jastip control center' : 'Secure instant location-based sniping advantages today'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* 1. Toggle options for 2 user roles with enhanced styled card buttons */}
            <div className="space-y-2">
              <label className="text-xs font-black text-[#FBF7F0] font-mono uppercase tracking-wider block text-left">
                Choose Access Clearance Role
              </label>
              <div className="grid grid-cols-2 gap-3.5">
                {/* Buyer Role Card */}
                <button
                  type="button"
                  id="role-buyer-btn"
                  onClick={() => setRole('buyer')}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                    role === 'buyer'
                      ? 'bg-slate-900 border-[#FBF7F0] text-white shadow-lg shadow-indigo-950/50 scale-[1.02]'
                      : 'bg-slate-950/40 border-indigo-950 hover:bg-slate-900/60 hover:border-indigo-500/20 text-slate-400'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xl">🎯</span>
                    {role === 'buyer' && (
                      <span className="text-[8px] bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 font-mono font-bold px-1.5 py-0.5 rounded uppercase">Active</span>
                    )}
                  </div>
                  <h4 className="text-xs font-black tracking-wide uppercase mt-3 text-white">Thrift Hunter</h4>
                  <p className="text-[9px] text-slate-400 leading-normal mt-1">
                    Book premium Jastip slots & lock vintage items instantly.
                  </p>
                  
                  {role === 'buyer' && (
                    <div className="absolute bottom-0 right-0 left-0 h-[2px] bg-gradient-to-r from-teal-400 to-indigo-500" />
                  )}
                </button>

                {/* Seller Role Card */}
                <button
                  type="button"
                  id="role-seller-btn"
                  onClick={() => setRole('seller')}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                    role === 'seller'
                      ? 'bg-slate-900 border-[#FBF7F0] text-white shadow-lg shadow-indigo-950/50 scale-[1.02]'
                      : 'bg-slate-950/40 border-indigo-950 hover:bg-slate-900/60 hover:border-indigo-500/20 text-slate-400'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xl">🏪</span>
                    {role === 'seller' && (
                      <span className="text-[8px] bg-indigo-505/20 border border-indigo-455/35 text-indigo-300 font-mono font-bold px-1.5 py-0.5 rounded uppercase font-bold">Active</span>
                    )}
                  </div>
                  <h4 className="text-xs font-black tracking-wide uppercase mt-3 text-white">Store Seller</h4>
                  <p className="text-[9px] text-slate-400 leading-normal mt-1">
                    Schedule drop campaigns & monitor catalog queue intake.
                  </p>
                  
                  {role === 'seller' && (
                    <div className="absolute bottom-0 right-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-[#FBF7F0]" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-xs p-2.5 bg-rose-950/40 border border-rose-500/20 text-rose-300 rounded-lg text-left">
                ⚠️ {error}
              </div>
            )}

            {/* Register specific fields */}
            {!isLogin && (
              <>
                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-slate-400 font-mono uppercase">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Medina Maryam"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-950 border border-indigo-950 text-white rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-xs font-semibold text-slate-400 font-mono uppercase">Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. hunter_pro"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-slate-950 border border-indigo-950 text-white rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <UserCheck className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              </>
            )}

            {/* Common fields */}
            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-slate-400 font-mono uppercase">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-indigo-950 text-white rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-slate-400 font-mono uppercase">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-indigo-950 text-white rounded-lg pl-9 pr-10 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Geolocation Detection / Selection Block */}
            <div className="space-y-3 p-3 bg-slate-900/60 rounded-xl border border-indigo-950/80 text-left">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FBF7F0]" />
                  Verify Hub Location
                </label>
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={isDetecting}
                  className="text-[10px] font-mono text-[#FBF7F0] hover:text-white underline font-bold flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                >
                  <Navigation className={`w-3 h-3 ${isDetecting ? 'animate-spin' : ''}`} />
                  {isDetecting ? 'Detecting...' : 'Auto-Detect'}
                </button>
              </div>

              {/* Two-tier Nested Dropdown Grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">Country</span>
                  <select
                    value={selectedCountry}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full bg-slate-950 border border-indigo-950 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-505 cursor-pointer"
                  >
                    {Object.keys(NESTED_LOCATIONS).map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">Hub Region</span>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full bg-slate-950 border border-indigo-950 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-505 cursor-pointer"
                  >
                    {(NESTED_LOCATIONS[selectedCountry] || []).map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 font-mono tracking-tight leading-tight">
                Current hunting radar: <span className="text-[#FBF7F0] font-bold">{selectedRegion}, {selectedCountry}</span>
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#FBF7F0] hover:bg-white text-slate-950 font-black text-xs py-3 rounded-xl border border-[#FBF7F0]/20 uppercase tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              {isLogin ? '⚡ Log In Snipe Account' : '✨ Register New Profile'}
            </button>
          </form>

          {/* Toggle between Login and Register */}
          <div className="text-center pt-4 border-t border-indigo-950/60">
            <span className="text-xs text-white/70">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                type="button"
                id="toggle-auth-mode"
                onClick={() => setIsLogin(!isLogin)} 
                className="text-[#FBF7F0] hover:text-white font-bold underline cursor-pointer transition-colors ml-1"
              >
                {isLogin ? 'Register here' : 'Login'}
              </button>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
