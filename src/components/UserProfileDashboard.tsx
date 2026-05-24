import React, { useState } from 'react';
import { User, Shield, Crown, Heart, Mail, Calendar, Sparkles, PlusCircle, Trash2, ArrowUpRight, ShoppingBag, Eye, MapPin, UploadCloud, Users, Bell, Package, Clock, TrendingUp, Check } from 'lucide-react';
import { UserProfile, ThriftDropItem } from '../types';

interface UserProfileDashboardProps {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isPremium: boolean;
  setIsPremium: (v: boolean) => void;
  drops: ThriftDropItem[];
  onToggleWishlist: (dropId: string) => void;
  onAddDropItem?: (newItem: ThriftDropItem) => void;
  onShowNotification: (title: string, desc: string, type?: 'info' | 'success' | 'warn') => void;
  setCurrentTab: (tab: string) => void;
}

export default function UserProfileDashboard({
  userProfile,
  setUserProfile,
  isPremium,
  setIsPremium,
  drops,
  onToggleWishlist,
  onAddDropItem,
  onShowNotification,
  setCurrentTab
}: UserProfileDashboardProps) {
  
  // Local state for role quick toggle and mock upload
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(userProfile.fullName);
  const [email, setEmail] = useState(userProfile.email);
  
  // Custom Seller Upload Item state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newCategory, setNewCategory] = useState<'jackets' | 'tees' | 'sweaters' | 'pants' | 'sneakers' | 'blouses' | 'cardigans' | 'skirts'>('blouses');
  const [newSize, setNewSize] = useState('M');
  const [newCondition, setNewCondition] = useState('9.5/10 Excellent Vintage');
  const [newPrice, setNewPrice] = useState('250000');
  const [newImg, setNewImg] = useState('https://images.unsplash.com/photo-1548624149-f7b31568e529?auto=format&fit=crop&q=80&w=600');

  // Scheduler Form states
  const [schedulerBatchName, setSchedulerBatchName] = useState('Tokyo Heavyweight Vintage');
  const [schedulerCategory, setSchedulerCategory] = useState<'Men' | 'Women'>('Men');
  const [schedulerDateTime, setSchedulerDateTime] = useState(() => {
    // Default scheduled time: 3 hours from now
    const defaultTime = new Date(Date.now() + 3 * 60 * 60 * 1000);
    return defaultTime.toISOString().slice(0, 16);
  });

  // Drag-and-drop / select states
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImageName, setUploadedImageName] = useState<string | null>(null);

  // Quick Preset Selection templates
  const PRESETS = [
    {
      name: "Vintage Blouse",
      title: "Chiffon Polka Dot Blouse",
      brand: "Saint Laurent Rive Gauche",
      category: "blouses" as const,
      size: "S",
      condition: "9/10 Mint Vintage",
      price: "320000",
      image: "https://images.unsplash.com/photo-1548624149-f7b31568e529?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Knit Cardigan",
      title: "Oversized Crochet Mohair Cardigan",
      brand: "PRADA Milano",
      category: "cardigans" as const,
      size: "M",
      condition: "9.5/10 Excellent",
      price: "580000",
      image: "https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Tweed Skirt",
      title: "MCM High-Waisted Plaid Skirt",
      brand: "Burberrys Vintage",
      category: "skirts" as const,
      size: "S",
      condition: "9.2/10 Clean",
      price: "420000",
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=600"
    }
  ];

  // Filter drops that user wishlisted
  const wishlistedItems = drops.filter(item => userProfile.wishlist.includes(item.id));

  // Handle save profile attributes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        fullName,
        email
      };
    });
    setIsEditing(false);
    onShowNotification('⚙️ Profile Updated', 'Your profile details have been saved successfully.', 'success');
  };

  // Quick switch role
  const handleToggleRole = (newRole: 'buyer' | 'seller') => {
    setUserProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        role: newRole
      };
    });
    onShowNotification(
      '🔄 Profile Role Swapped',
      `You are now viewing the platform as a ${newRole === 'buyer' ? 'Thrift Hunter' : 'Thrift Store Owner'}!`,
      'info'
    );
  };

  // Drag and Drop event handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileSelected(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    if (!file.type.startsWith('image/')) {
      onShowNotification('⚠️ Invalid File Type', 'Please upload an image file (PNG, JPG, WEBP).', 'warn');
      return;
    }
    const localUrl = URL.createObjectURL(file);
    setNewImg(localUrl);
    setUploadedImageName(file.name);
    onShowNotification('📸 Image Uploaded Successfully', `Linked file "${file.name}" in dynamic local memory.`, 'success');
  };

  const selectPreset = (preset: typeof PRESETS[0]) => {
    setNewTitle(preset.title);
    setNewBrand(preset.brand);
    setNewCategory(preset.category);
    setNewSize(preset.size);
    setNewCondition(preset.condition);
    setNewPrice(preset.price);
    setNewImg(preset.image);
    setUploadedImageName(preset.name);
    onShowNotification('✨ Curation Pattern Selected', `Specs and stock photography for "${preset.name}" pre-filled.`, 'info');
  };

  // Submit Drop Scheduler Form (Triggers actual countdowns on Homepage)
  const handleScheduleCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedulerBatchName) {
      onShowNotification('⚠️ Missing Batch Name', 'Please provide a campaign name for the scheduled drops.', 'warn');
      return;
    }

    const scheduledDate = new Date(schedulerDateTime);
    if (isNaN(scheduledDate.getTime())) {
      onShowNotification('⚠️ Invalid Date', 'Please select a valid upcoming date & time.', 'warn');
      return;
    }

    // Generate 3 imminent dropping items based on category
    const mockCampaignItems = schedulerCategory === 'Men'
      ? [
          {
            title: `${schedulerBatchName}: 1994 Detroit Heavy Canvas Jacket`,
            brand: "Carhartt WIP",
            category: "jackets" as const,
            size: "L",
            condition: "9/10 Distressed Patina",
            priceRp: 1250000,
            imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600"
          },
          {
            title: `${schedulerBatchName}: Cable-Knit Fleece Sweater`,
            brand: "Polo Ralph Lauren",
            category: "sweaters" as const,
            size: "XL",
            condition: "9.5/10 Flawless Knit",
            priceRp: 480000,
            imageUrl: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&q=80&w=600"
          },
          {
            title: `${schedulerBatchName}: 90s baggy Corduroy Denim`,
            brand: "Levi's Silvertab",
            category: "pants" as const,
            size: "34",
            condition: "8.8/10 Vintage Soft",
            priceRp: 390000,
            imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600"
          }
        ]
      : [
          {
            title: `${schedulerBatchName}: Vintage Silk Ruffle Blouse`,
            brand: "Chloé Vintage",
            category: "blouses" as const,
            size: "S",
            condition: "9.6/10 Pristine",
            priceRp: 350000,
            imageUrl: "https://images.unsplash.com/photo-1548624149-f7b31568e529?auto=format&fit=crop&q=80&w=600"
          },
          {
            title: `${schedulerBatchName}: Oversized Mohair Cardigan`,
            brand: "PRADA Milano",
            category: "cardigans" as const,
            size: "M",
            condition: "9.5/10 Excellent Mohair",
            priceRp: 585000,
            imageUrl: "https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&q=80&w=600"
          },
          {
            title: `${schedulerBatchName}: Pleated Tweed Skirt`,
            brand: "Burberrys Vintage",
            category: "skirts" as const,
            size: "S",
            condition: "9.2/10 Heavy Tweed",
            priceRp: 420000,
            imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=600"
          }
        ];

    if (onAddDropItem) {
      mockCampaignItems.forEach((item, index) => {
        onAddDropItem({
          id: `drop_sched_${Date.now()}_${index}`,
          ...item,
          dropTime: scheduledDate.toISOString(),
          isClaimed: false,
          tags: ['Scheduled Campaign', schedulerBatchName, 'Store Owner Curation']
        });
      });
    }

    onShowNotification(
      '📅 Drop Campaign Scheduled LIVE!',
      `Successfully scheduled "${schedulerBatchName}" (${schedulerCategory}) to drop on ${scheduledDate.toLocaleDateString()} at ${scheduledDate.toLocaleTimeString()}. Check homepage for active real-time countdown clocks!`,
      'success'
    );
  };

  // Submit dynamic upload listing (if user profile is Seller manually adding active catalog items)
  const handleCustomUploadItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newBrand) {
      onShowNotification('⚠️ Error Listing Item', 'Product Brand and Title fields are mandatory.', 'warn');
      return;
    }

    const createdItem: ThriftDropItem = {
      id: `drop_custom_${Math.floor(Math.random() * 10000)}`,
      title: newTitle,
      brand: newBrand,
      category: newCategory,
      size: newSize,
      condition: newCondition,
      priceRp: parseFloat(newPrice) || 150000,
      imageUrl: newImg,
      dropTime: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // drops in 15m
      isClaimed: false,
      tags: ['Seller Drop', 'Verified Seller', newBrand.toLowerCase()]
    };

    if (onAddDropItem) {
      onAddDropItem(createdItem);
    }
    
    // Clear state
    setNewTitle('');
    setNewBrand('');
    setUploadedImageName(null);
    setShowAddForm(false);
    onShowNotification(
      '🏪 Drop Listing Dispatched!',
      `Successfully listed "${newTitle}" under ${newCategory} category. It will drop in 15 minutes!`,
      'success'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="profile-container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Grid Row: user profile identity summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-950 border border-indigo-950/80 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
            
            {/* Crown Decoration on premium */}
            {isPremium && (
              <div className="absolute top-4 right-4 flex items-center space-x-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded-full animate-pulse">
                <Crown id="badge-premium-crown" className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>PREMIUM</span>
              </div>
            )}

            {/* Avatar block */}
            <div className="flex flex-col items-center text-center space-y-3 pt-4">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center text-xl font-black text-white shadow-xl relative ${
                isPremium ? 'bg-gradient-to-tr from-amber-500 via-indigo-600 to-indigo-800 ring-2 ring-amber-400' : 'bg-indigo-900 border border-indigo-500/30'
              }`}>
                {userProfile.fullName ? userProfile.fullName.substring(0, 2).toUpperCase() : 'ME'}
                {isPremium && (
                  <span className="absolute -bottom-1 -right-1 bg-amber-500 hover:bg-amber-600 text-slate-950 p-1 rounded-full shadow-lg border border-slate-950">
                    <Crown className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center justify-center gap-1">
                  {userProfile.fullName}
                  {isPremium && <Crown className="w-4 h-4 fill-amber-400 text-amber-400" />}
                </h3>
                <span className="text-xs text-indigo-400 font-mono">@{userProfile.username}</span>
              </div>

              {/* Account Status Badge */}
              <div className="w-full pt-1.5 flex justify-center">
                {isPremium ? (
                  <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[11px] rounded-full font-mono font-bold flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Premium VIP Active</span>
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-slate-900 border border-slate-700/50 text-slate-400 text-[11px] rounded-full font-mono font-semibold flex items-center space-x-1.5">
                    <span>Standard Free account</span>
                  </span>
                )}
              </div>
            </div>

            {/* Details block form / text */}
            <div className="mt-8 pt-6 border-t border-indigo-950/50 space-y-4">
              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase">Interactive Full Name</label>
                    <input 
                      type="text" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-900 border border-indigo-950 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase">Email Address</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-indigo-950 rounded-lg p-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    />
                  </div>
                  <div className="flex space-x-2 pt-1">
                    <button 
                      type="button" 
                      onClick={() => setIsEditing(false)} 
                      className="flex-1 bg-slate-900 text-slate-400 text-xs py-2 rounded-lg border border-indigo-950 font-bold"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-2 rounded-lg border border-indigo-500/30 font-extrabold uppercase font-mono"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-450 font-mono">Status Status</span>
                    <span className="font-bold text-white capitalize flex items-center gap-1">
                      {isPremium ? (
                        <>
                          <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />
                          Premium Plan
                        </>
                      ) : (
                        <span>Standard Core</span>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-slate-450 font-mono">Account Role</span>
                    <span className="font-bold text-indigo-300 font-mono select-none">
                      {userProfile.role === 'buyer' ? 'Thrift Hunter' : 'Store Owner (Seller)'}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-slate-450 font-mono">Email Contact</span>
                    <span className="font-bold text-slate-200">{userProfile.email}</span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span className="text-slate-450 font-mono">Member Since</span>
                    <span className="font-bold text-slate-200 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-slate-450" />
                      2026-05-24
                    </span>
                  </div>

                  {userProfile.location && (
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-450 font-mono">Radar Hub</span>
                      <span className="font-bold text-[#FBF7F0] flex items-center gap-1 font-mono">
                        <MapPin className="w-3 h-3 text-[#FBF7F0]" />
                        {userProfile.location}
                      </span>
                    </div>
                  )}

                  <div className="pt-3 flex space-x-2">
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex-1 text-center py-2 bg-slate-900 hover:bg-slate-800 border border-indigo-950/80 rounded-lg text-xs font-mono text-slate-300 transition-all cursor-pointer"
                    >
                      Edit Profile
                    </button>
                    
                    {!isPremium && (
                      <button 
                        onClick={() => setCurrentTab('premium')}
                        className="flex-1 text-center py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 text-slate-950 font-black rounded-lg text-xs transition-all uppercase tracking-tight flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <Crown className="w-3 h-3 fill-slate-950 text-slate-950 animate-bounce" />
                        <span>Go VIP</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick dashboard profile toggle for 2 roles */}
            <div className="mt-6 pt-5 border-t border-indigo-950/50 space-y-2.5">
              <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest block font-bold">Fast Role Swapping</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleToggleRole('buyer')}
                  className={`py-1.5 rounded text-[10px] font-black transition-all border ${
                    userProfile.role === 'buyer'
                      ? 'bg-indigo-950 border-indigo-500/40 text-white'
                      : 'bg-transparent border-transparent text-slate-450 hover:text-slate-200'
                  }`}
                >
                  Hunter Mode
                </button>
                <button
                  onClick={() => handleToggleRole('seller')}
                  className={`py-1.5 rounded text-[10px] font-black transition-all border ${
                    userProfile.role === 'seller'
                      ? 'bg-indigo-950 border-indigo-500/40 text-white'
                      : 'bg-transparent border-transparent text-slate-450 hover:text-slate-200'
                  }`}
                >
                  Owner Mode
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Grid Row: Custom Workspaces */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* USER SPECIFIC ROLE MODULE */}
          {userProfile.role === 'seller' ? (
            <div className="space-y-8">
              {/* 3. STORE ANALYTICS BENTO GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 border border-indigo-950/80 rounded-2xl p-5 shadow-xl relative overflow-hidden flex items-center justify-between group hover:border-[#FBF7F0]/20 transition-all">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block">Active Subscribed Hunters</span>
                    <span className="text-3xl font-black text-white font-mono tracking-tight flex items-baseline gap-1.5 justify-start">
                      1,412
                      <span className="text-xs font-mono font-medium text-emerald-400 flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" />
                        +8.2%
                      </span>
                    </span>
                    <p className="text-[10px] text-slate-550">Hunters opted-in for notification telemetry</p>
                  </div>
                  <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/25 text-emerald-400">
                    <Users className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-slate-950 border border-indigo-950/80 rounded-2xl p-5 shadow-xl relative overflow-hidden flex items-center justify-between group hover:border-[#FBF7F0]/20 transition-all">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block">Radar Alerts Set for Your Store</span>
                    <span className="text-3xl font-black text-white font-mono tracking-tight flex items-baseline gap-1.5 justify-start">
                      485
                      <span className="text-xs font-mono font-medium text-indigo-400 flex items-center gap-0.5 animate-pulse">
                        ● Live
                      </span>
                    </span>
                    <p className="text-[10px] text-slate-550">Auto-snipe radar watches tuned to your queue</p>
                  </div>
                  <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/25 text-indigo-400">
                    <Bell className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* 1. DROP CAMPAIGN SCHEDULER */}
              <div className="bg-slate-950 border border-indigo-950/80 rounded-2xl p-6 shadow-xl space-y-6">
                <div className="border-b border-indigo-950/50 pb-4 text-left">
                  <h4 className="text-sm font-black text-[#FBF7F0] uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-400 animate-spin-slow animate-spin" style={{ animationDuration: '3s' }} />
                    Drop Campaign Scheduler
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">Schedule the date and time for your next curated batch release to trigger real-time countdown timers across user homepages.</p>
                </div>

                <form onSubmit={handleScheduleCampaign} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wide block font-semibold">Batch Campaign Name</label>
                      <input 
                        type="text" 
                        value={schedulerBatchName}
                        onChange={(e) => setSchedulerBatchName(e.target.value)}
                        placeholder="e.g. Japanese Streetwear Grails"
                        className="w-full bg-slate-900/65 border border-indigo-950 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500" 
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wide block font-semibold">Target Curation Category</label>
                      <select 
                        value={schedulerCategory}
                        onChange={(e) => setSchedulerCategory(e.target.value as any)}
                        className="w-full bg-slate-900/65 border border-indigo-950 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                      >
                        <option value="Men">Men's Apparel & Grails</option>
                        <option value="Women">Women's Premium Curation</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 space-y-1 text-left">
                      <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wide block font-semibold">Scheduled Release Date & Time</label>
                      <input 
                        type="datetime-local" 
                        value={schedulerDateTime}
                        onChange={(e) => setSchedulerDateTime(e.target.value)}
                        className="w-full bg-slate-900/65 border border-indigo-950 text-white rounded-lg p-2.5 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer" 
                      />
                    </div>

                    <div className="md:col-span-4 flex items-end">
                      <button 
                        type="submit"
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase rounded-lg border border-indigo-550/30 font-mono tracking-wider shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                      >
                        ✓ Host Campaign Live
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* 2. PRODUCT UPLOAD SLOT & CATALOG INTAKE ZONE */}
              <div className="bg-slate-950 border border-indigo-950/80 rounded-2xl p-6 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-indigo-950/50 pb-4 text-left font-sans">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-black text-[#FBF7F0] uppercase tracking-wider flex items-center gap-2">
                      <Package className="w-4 h-4 text-indigo-400" />
                      Product Upload & Catalog Intake
                    </h4>
                    <p className="text-xs text-slate-400">Manage, preview, and host custom garments: blouses, cardigans, and skirts.</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="px-4 py-1.5 bg-indigo-950 hover:bg-indigo-900 text-indigo-300 font-bold font-mono text-xs border border-indigo-500/20 rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>{showAddForm ? 'Hide Form' : 'Manual Intake Form'}</span>
                  </button>
                </div>

                {/* Media Upload Slot supporting both Drag-and-Drop + Click */}
                <div className="space-y-4">
                  <span className="text-[11px] font-bold font-mono text-slate-400 uppercase tracking-widest block text-left">Interactive Garment Media Upload Slot</span>
                  
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center space-y-2.5 min-h-[140px] ${
                      dragActive 
                        ? 'border-indigo-400 bg-indigo-950/20 shadow-inner' 
                        : 'border-indigo-950 hover:border-indigo-500/40 bg-slate-900/10 hover:bg-slate-900/30'
                    }`}
                  >
                    <input 
                      type="file"
                      id="file-upload-input"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    
                    <div className="p-3 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-indigo-400">
                      <UploadCloud className="w-6 h-6 animate-pulse" />
                    </div>
                    
                    <div className="space-y-0.5">
                      <p className="text-xs text-white font-bold">
                        {uploadedImageName ? (
                          <span className="text-emerald-400 flex items-center justify-center gap-1">
                            <Check className="w-4 h-4 text-emerald-400" /> Selected: {uploadedImageName}
                          </span>
                        ) : 'Drag and drop garment image, or click to browse'}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono font-medium">JPEG, PNG, or WEBP formats up to 5MB allotment</p>
                    </div>
                  </div>

                  {/* Preset Fast Loading suggestions for store testing */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block text-left">Or Select Quick Design Presets:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {PRESETS.map((preset) => {
                        const isCurrentlySelected = uploadedImageName === preset.name;
                        return (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() => selectPreset(preset)}
                            className={`p-2 bg-slate-900/60 border text-left rounded-lg transition-all focus:outline-none flex flex-col justify-between h-[85px] hover:bg-slate-900 hover:border-indigo-550/40 cursor-pointer ${
                              isCurrentlySelected ? 'border-indigo-500 bg-indigo-950/20 ring-1 ring-indigo-500' : 'border-indigo-950'
                            }`}
                          >
                            <span className="text-[10px] leading-tight font-black text-white block truncate">{preset.name}</span>
                            <span className="text-[9px] text-indigo-400 font-mono leading-none">{preset.brand}</span>
                            <div className="flex justify-between items-center w-full mt-2">
                              <span className="text-[8px] px-1 bg-slate-950 text-slate-400 rounded font-mono uppercase leading-none">{preset.size}</span>
                              <span className="text-[9px] font-black text-emerald-400 font-mono">Rp{(parseInt(preset.price)/1000).toFixed(0)}k</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Form Intake Details (Single listing) */}
                {showAddForm && (
                  <form onSubmit={handleCustomUploadItem} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/40 p-4 rounded-xl border border-indigo-950 space-y-2 md:space-y-0 border-t-2 border-t-indigo-500/20">
                    <h5 className="md:col-span-2 text-xs font-bold text-white uppercase font-mono border-b border-indigo-950 pb-1.5 flex items-center gap-1.5 text-left">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                      Configure Manual Garment Specifications
                    </h5>
                    
                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Product Brand</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Burberry Vintage" 
                        value={newBrand}
                        onChange={(e) => setNewBrand(e.target.value)}
                        className="w-full bg-slate-950 border border-indigo-950 rounded-lg p-2 text-xs text-white focus:outline-none" 
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Garment Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Oversized Mohair Cardigan" 
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-slate-950 border border-indigo-950 rounded-lg p-2 text-xs text-white focus:outline-none" 
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Vintage Category</label>
                      <select 
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                        className="w-full bg-slate-950 border border-indigo-950 rounded-lg p-2 text-xs text-white focus:outline-none cursor-pointer"
                      >
                        <option value="blouses">Vintage Blouse</option>
                        <option value="cardigans">Cardigans</option>
                        <option value="skirts">Skirt</option>
                        <option value="jackets">Jackets</option>
                        <option value="sweaters">Sweaters & Fleeces</option>
                        <option value="pants">Pants & Denim</option>
                        <option value="sneakers">Sneakers</option>
                        <option value="tees">Tees</option>
                      </select>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Size</label>
                      <input 
                        type="text" 
                        placeholder="e.g. M" 
                        value={newSize}
                        onChange={(e) => setNewSize(e.target.value)}
                        className="w-full bg-slate-950 border border-indigo-950 rounded-lg p-2 text-xs text-white focus:outline-none" 
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Price (IDR Rupiah)</label>
                      <input 
                        type="number" 
                        placeholder="e.g. 150000" 
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="w-full bg-slate-950 border border-indigo-950 rounded-lg p-2 text-xs text-white focus:outline-none" 
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Condition Score</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 9.8/10 Vintage" 
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value)}
                        className="w-full bg-slate-950 border border-indigo-950 rounded-lg p-2 text-xs text-white focus:outline-none" 
                      />
                    </div>

                    <div className="space-y-1 md:col-span-2 text-left">
                      <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Garment Image URL</label>
                      <input 
                        type="text" 
                        placeholder="Unsplash placeholder link..." 
                        value={newImg}
                        onChange={(e) => setNewImg(e.target.value)}
                        className="w-full bg-slate-950 border border-indigo-950 rounded-lg p-2 text-xs text-white focus:outline-none font-mono text-[10px]" 
                      />
                    </div>

                    <div className="md:col-span-2 pt-2">
                      <button 
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-indigo-650 to-indigo-800 hover:from-indigo-600 text-white font-black text-xs uppercase rounded-xl border border-indigo-500/30 font-mono tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer shadow-lg shadow-indigo-950/40"
                      >
                        ⚡ Publish Active Drop Listing
                      </button>
                    </div>
                  </form>
                )}

                {/* List of current store owner items (showing all seller's list drops) */}
                <div className="space-y-3.5 pt-2 text-left">
                  <span className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest block">Your Live Curation Drops Inventory</span>
                  <div className="overflow-x-auto rounded-xl border border-indigo-950 bg-slate-900/10">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-900/60 border-b border-indigo-950 text-[10px] text-slate-400 uppercase font-mono font-bold">
                          <th className="p-3">Garment Item</th>
                          <th className="p-3 font-sans">Category</th>
                          <th className="p-3 text-center">Size</th>
                          <th className="p-3">Price Status</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-indigo-950/40 text-xs text-slate-300">
                        {drops.map((d) => (
                          <tr key={d.id} className="hover:bg-indigo-950/20 transition-colors">
                            <td className="p-3 flex items-center space-x-2.5">
                              <img src={d.imageUrl} className="w-8 h-8 rounded-lg object-cover border border-indigo-950 shrink-0" alt="item preview" />
                              <div className="min-w-0">
                                <span className="font-bold text-white block leading-none truncate max-w-[120px] sm:max-w-[170px]">{d.title}</span>
                                <span className="text-[10px] font-mono text-slate-500 block mt-0.5">{d.brand}</span>
                              </div>
                            </td>
                            <td className="p-3 text-indigo-400 capitalize font-mono text-[11px]">{d.category}</td>
                            <td className="p-3 text-center font-mono font-bold text-slate-300">{d.size}</td>
                            <td className="p-3 font-mono font-bold text-white">Rp {d.priceRp.toLocaleString('id-ID')}</td>
                            <td className="p-3">
                              {d.isClaimed ? (
                                <span className="text-[9px] font-bold uppercase font-mono bg-rose-950/40 text-rose-350 border border-rose-500/20 px-2 py-0.5 rounded-full inline-block">Sniped / Sold</span>
                              ) : (
                                <span className="text-[9px] font-bold uppercase font-mono bg-emerald-950/40 text-emerald-350 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 w-max">
                                  <Clock className="w-2.5 h-2.5" /> LiveSoon
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* WISHLIST SECTION WRAPPER */}
          <div className="bg-slate-950 border border-indigo-950/80 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-indigo-950/50 pb-4">
              <div className="space-y-0.5">
                <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  YOUR PERSONAL WISHLIST DROPS
                </h3>
                <p className="text-[11px] text-slate-400 font-mono uppercase">Monitored Items Bookmarked for Sniping</p>
              </div>

              <span className="text-xs bg-rose-950/30 border border-rose-500/20 text-rose-300 font-mono font-black px-2.5 py-1 rounded-full">
                {wishlistedItems.length} BOOKMARKS
              </span>
            </div>

            {wishlistedItems.length === 0 ? (
              <div className="text-center py-14 bg-slate-900/30 border border-indigo-950/40 rounded-xl space-y-3.5 p-4">
                <Heart className="w-10 h-10 text-slate-700 mx-auto" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white uppercase">Your wishlist is currently clean</h4>
                  <p className="text-[11px] text-slate-400 max-w-sm mx-auto leading-normal">
                    Explore live catalogs of premium jackets, sweaters, and women's vintage blouses. Click the Heart button to bookmark items and receive active radar alerts.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentTab('catalog')}
                  className="px-4 py-2 bg-indigo-900/40 hover:bg-indigo-900 text-indigo-300 text-[10px] font-bold font-mono border border-indigo-505/30 rounded uppercase tracking-wider"
                >
                  Explore Drop Catalog &rarr;
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {wishlistedItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex bg-slate-900 border border-indigo-950 rounded-xl overflow-hidden hover:border-indigo-500/20 transition-all group"
                  >
                    <div className="w-24 relative overflow-hidden bg-slate-850 shrink-0">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute top-1 left-1 bg-slate-950/90 text-[8px] font-mono font-black text-slate-300 px-1 py-0.5 rounded">
                        {item.size}
                      </span>
                    </div>

                    <div className="p-3.5 flex-1 flex flex-col justify-between min-w-0">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-indigo-400 font-bold uppercase truncate max-w-[70px]">{item.brand}</span>
                          <span className="text-[8px] font-mono bg-indigo-950 text-slate-400 px-1 rounded-sm capitalize">{item.category}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white truncate leading-tight group-hover:text-indigo-300">
                          {item.title}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-indigo-950/30">
                        <span className="text-[10px] font-mono font-black text-indigo-300 block">Rp {item.priceRp.toLocaleString('id-ID')}</span>
                        <div className="flex items-center space-x-1.5">
                          <button
                            onClick={() => onToggleWishlist(item.id)}
                            className="p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-950/10 rounded transition-colors"
                            title="Remove bookmarked product"
                            id={`remove-wishlist-${item.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setCurrentTab('catalog')}
                            className="p-1 text-slate-500 hover:text-white hover:bg-slate-800 rounded transition-colors"
                            title="Go view in Catalog"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DYNAMIC TELEMETRY RADAR ALERTS TRACKER */}
          <div className="bg-slate-950 border border-indigo-950/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h4 className="text-xs font-bold font-mono text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              VIP Jastip Priority Queuing Network Alerts
            </h4>
            <div className="p-3.5 bg-gradient-to-r from-indigo-950/30 via-slate-900 to-indigo-950/30 rounded-xl border border-indigo-950 flex flex-col md:flex-row justify-between items-center text-xs space-y-3.5 md:space-y-0">
              <div className="space-y-0.5 text-center md:text-left">
                <span className="text-[10px] text-slate-450 font-mono block">LIVE TELEGRAM MONITOR STATUS</span>
                <span className="font-bold text-slate-200 block">
                  {isPremium ? '🟢 Linked via Direct Secured VIP Dispatch Hook' : '🟠 Not Linked of Standard Telemetry'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (isPremium) {
                    onShowNotification('⚙️ Telegram Bot Signal Recalibrated', 'Your Telegram alerts hook signal has been pinged and verified.', 'success');
                  } else {
                    setCurrentTab('premium');
                  }
                }}
                className={`px-4 py-2 text-[10px] font-bold font-mono rounded uppercase tracking-wider transition-all cursor-pointer ${
                  isPremium ? 'bg-indigo-900/40 text-indigo-300 border border-indigo-500/20' : 'bg-emerald-500 text-slate-950'
                }`}
              >
                {isPremium ? 'Ping Dispatch System Signal' : 'Upgrade to turn telemetry on &rarr;'}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
