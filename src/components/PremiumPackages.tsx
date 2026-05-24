import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, Check, Zap, Bot, BellRing, Navigation, CheckCircle2, ShieldAlert, QrCode, Wallet, Smartphone, ShieldCheck, HelpCircle } from 'lucide-react';

interface PremiumPackagesProps {
  isPremium: boolean;
  setIsPremium: (prem: boolean) => void;
  onShowNotification: (title: string, desc: string, type: 'info' | 'success' | 'warn') => void;
}

export default function PremiumPackages({ isPremium, setIsPremium, onShowNotification }: PremiumPackagesProps) {
  // Config state for Radar Alert channel simulation inputs
  const [telegramHandle, setTelegramHandle] = useState('@my_jastip_handle');
  const [enableBrowserPush, setEnableBrowserPush] = useState(true);
  const [enableTelegramWebhook, setEnableTelegramWebhook] = useState(false);

  // Payment Pop-up simulation states
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'qris' | 'dana' | 'ovo'>('qris');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const premiumFeatures = [
    {
      title: '10-Minute Early Access',
      description: 'Get first look and reservation priority. When rare Carhartt detroits or vintage hoodies drop, secure them 10 full minutes before they become visible to standard accounts.',
      icon: Flame,
      iconColor: 'text-amber-400'
    },
    {
      title: 'Instant Sniper Button',
      description: 'The ultimate competition weapon. Zero-latency 1-click reservations. Bypasses checkout baskets, immediately securing the physical thrift item or jastip slot in milliseconds.',
      icon: Zap,
      iconColor: 'text-emerald-400'
    },
    {
      title: 'Radar Alert Notifications',
      description: 'Direct push synchronization. Sync your Telegram username & chat id to receive private notifications with direct secure links the millisecond a rare item is loaded.',
      icon: Bot,
      iconColor: 'text-sky-400'
    }
  ];

  const handleInitPurchase = () => {
    setSelectedMethod('qris');
    setPhoneNumber('');
    setCheckoutStatus('idle');
    setShowCheckout(true);
  };

  const handleCompleteSimulatedPayment = () => {
    if ((selectedMethod === 'dana' || selectedMethod === 'ovo') && !phoneNumber) {
      onShowNotification('⚠️ Info Missing', 'Please enter your active e-wallet mobile number for push request.', 'warn');
      return;
    }

    setCheckoutStatus('processing');
    
    // Simulate transaction status polling
    setTimeout(() => {
      setCheckoutStatus('success');
      
      setTimeout(() => {
        setIsPremium(true);
        setShowCheckout(false);
        onShowNotification(
          '🎉 VIP Premium Activated!',
          `Successfully processed Rp15.000 invoice via ${selectedMethod.toUpperCase()}. Your 10-minute early drop access is officially live!`,
          'success'
        );
      }, 1500);
    }, 2000);
  };

  const handleUnsubscribe = () => {
    setIsPremium(false);
    onShowNotification(
      'Subscription Suspended',
      'You returned to standard subscription slot limits.',
      'warn'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Title & Introduction header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase font-sans">
          UNLEASH <span className="text-indigo-400">THE SNIPER</span> INSIDE YOU
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          For just the price of a local coffee cup, out-compete thousands of thrift hunters and guarantee your favorite grails.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Dynamic Membership Card controller */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <motion.div
            whileHover={{ y: -4 }}
            className={`relative rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full bg-slate-950 border transition-all ${
              isPremium 
                ? 'border-indigo-400 shadow-2xl shadow-indigo-950/40 bg-[linear-gradient(to_bottom,rgba(99,102,241,0.03),rgba(15,23,42,0.95))]' 
                : 'border-indigo-950 shadow-md bg-slate-950'
            }`}
          >
            {/* Corner status Badge */}
            <div className="absolute top-4 right-4 font-mono text-[9px] font-bold tracking-widest uppercase py-1 px-3.5 rounded-full border bg-slate-900 shadow">
              {isPremium ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
                  ACTIVE MEMBER
                </span>
              ) : (
                <span className="text-slate-400">UNRESTRICTED TRIAL AVAILABLE</span>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold font-mono tracking-widest text-indigo-400 uppercase">MONTHLY VIP ACCESS</p>
                <h3 className="text-2xl font-black text-white mt-1">SnipeDrop Premium</h3>
              </div>

              {/* Price Details Block */}
              <div className="py-4 border-y border-indigo-950 flex items-baseline space-x-2">
                <span className="text-4xl font-extrabold text-white font-mono">Rp 15.000</span>
                <span className="text-slate-400 text-xs font-mono">/ Month (Recurring)</span>
              </div>

              {/* Package included check bullets */}
              <ul className="space-y-3.5 pt-2">
                {premiumFeatures.map((f, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 font-sans leading-relaxed">{f.title}</span>
                  </li>
                ))}
                <li className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300 font-sans leading-relaxed">No automated bot verification delays</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300 font-sans leading-relaxed">Secure 100% moneyback if slots aren&apos;t locked</span>
                </li>
              </ul>
            </div>

            {/* Dynamic Membership Purchase CTAs */}
            <div className="pt-8 space-y-3">
              {!isPremium ? (
                <div>
                  <button
                    onClick={handleInitPurchase}
                    className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white font-black py-4.5 rounded-xl shadow-lg hover:shadow-indigo-950 transition-all font-mono text-sm uppercase cursor-pointer"
                  >
                    🚀 ACTIVATE PREMIUM FOR RP15.000
                  </button>
                  <p className="text-[10px] text-slate-500 text-center font-mono mt-2">Opens localized instant QRIS, DANA, & OVO checkout simulations.</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div className="bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/20 text-center text-xs text-emerald-300 font-semibold flex items-center justify-center space-x-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>VIP Enabled. Enjoy 10-Minute Early Drops!</span>
                  </div>
                  <button
                    onClick={handleUnsubscribe}
                    className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-rose-400 text-slate-400 py-2.5 rounded-lg text-xs font-mono transition-all"
                  >
                    ✕ CANCEL MEMBERSHIP FOR TESTING
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Detailed Features Spotlight & Configurable Radar panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-950 border border-indigo-950 rounded-2xl p-6 md:p-8 space-y-8 shadow-xl">
            <h4 className="text-lg font-bold text-white tracking-tight">FEATURE SPOTLIGHT & ADVANTAGES</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {premiumFeatures.map((feat, i) => (
                <div key={i} className="space-y-3 p-4 bg-slate-900/50 rounded-xl border border-indigo-950/60 hover:border-indigo-500/10 transition-all">
                  <div className="p-2 bg-slate-950 rounded-lg w-fit border border-indigo-950">
                    <feat.icon className={`w-5 h-5 ${feat.iconColor}`} />
                  </div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">{feat.title}</h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{feat.description}</p>
                </div>
              ))}
            </div>

            {/* Simulated Live Radar Alerts Settings Drawer */}
            <div className="pt-6 border-t border-indigo-950 space-y-4">
              <div className="flex items-center space-x-2">
                <BellRing className="w-4 h-4 text-indigo-400 animate-pulse" />
                <span className="text-xs font-bold uppercase text-white tracking-widest font-mono">Radar Alert Telemetry Config</span>
                <span className="text-[9px] bg-sky-950 text-sky-400 border border-sky-900 px-2 rounded-full uppercase">PREMIUM VIP</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Telegram Handle inputs */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">Telegram Alert Destination</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={telegramHandle}
                      onChange={(e) => setTelegramHandle(e.target.value)}
                      disabled={!isPremium}
                      className="w-full bg-slate-900 border border-indigo-950 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-40"
                    />
                  </div>
                </div>

                {/* Sub-toggles push notifications */}
                <div className="flex flex-col justify-end space-y-2">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">Dispatch channels</label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 text-xs text-slate-350 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={enableBrowserPush}
                        onChange={(e) => setEnableBrowserPush(e.target.checked)}
                        disabled={!isPremium}
                        className="rounded border-indigo-950 bg-slate-900 text-indigo-500 accent-indigo-500"
                      />
                      <span>In-App Toast Alerts</span>
                    </label>

                    <label className="flex items-center space-x-2 text-xs text-slate-350 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={enableTelegramWebhook}
                        onChange={(e) => setEnableTelegramWebhook(e.target.checked)}
                        disabled={!isPremium}
                        className="rounded border-indigo-950 bg-slate-900 text-indigo-500 accent-indigo-500"
                      />
                      <span>Webhook Dispatch</span>
                    </label>
                  </div>
                </div>
              </div>

              {!isPremium ? (
                <div className="p-3 bg-indigo-950/20 border border-indigo-900/30 rounded-lg flex items-start space-x-2">
                  <ShieldAlert className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-450 leading-relaxed font-mono">
                    Telegram webhook dispatcher and Radar notifications require an active Premium VIP subscription key. Go premium to integrate the live alerts engine.
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-lg space-y-1.5 font-mono">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-emerald-400 font-bold">✓ DISPATCHING PIPELINE ONLINE</span>
                    <span className="text-slate-400">Status: Listening to catalogs</span>
                  </div>
                  <p className="text-[9px] text-slate-400 leading-normal">
                    Target destination set: <strong className="text-indigo-400">{telegramHandle}</strong>. Our servers will ping you on Telegram and trigger in-app webhook flashes with immediate claim paths whenever items are uploaded.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* PAYMENT GATEWAY INTERACTIVE SIMULATION POPUP */}
      {showCheckout && (
        <div id="simulated-payment-popup" className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-indigo-400/20 rounded-2xl p-6 max-w-md w-full shadow-2xl relative overflow-hidden">
            
            {/* Top Close icon */}
            <button 
              onClick={() => setShowCheckout(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-mono font-bold hover:bg-slate-800 p-1 rounded-md"
            >
              ✕
            </button>

            <div className="space-y-5">
              
              {/* Header Title displaying bill details */}
              <div className="border-b border-indigo-950 pb-3">
                <span className="text-[9px] font-mono bg-indigo-900/60 text-indigo-300 font-extrabold border border-indigo-500/20 px-2 py-0.5 rounded uppercase">
                  Local payment gateway simulation
                </span>
                <h3 className="text-base font-black text-white uppercase mt-1">SnipeDrop VIP Checkouts</h3>
                <div className="flex justify-between items-baseline mt-1 font-mono">
                  <span className="text-[11px] text-slate-400">Total Subscription Invoice:</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">Rp 15.000</span>
                </div>
              </div>

              {checkoutStatus === 'idle' ? (
                <div className="space-y-4">
                  
                  {/* Local Payment Options Selector Tabs */}
                  <label className="text-[10px] font-mono text-slate-450 uppercase tracking-wider block font-bold">Select Local Payment Option</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      id="pay-qris"
                      onClick={() => setSelectedMethod('qris')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                        selectedMethod === 'qris'
                          ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-md'
                          : 'bg-slate-900/30 border-indigo-950/80 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <QrCode className="w-5 h-5 text-indigo-400" />
                      <span className="text-[10px] font-mono font-black">QRIS Code</span>
                    </button>

                    <button
                      type="button"
                      id="pay-dana"
                      onClick={() => setSelectedMethod('dana')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                        selectedMethod === 'dana'
                          ? 'bg-sky-950/60 border-sky-500 text-white shadow-md'
                          : 'bg-slate-900/30 border-indigo-950/80 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Wallet className="w-5 h-5 text-sky-400" />
                      <span className="text-[10px] font-mono font-black">DANA</span>
                    </button>

                    <button
                      type="button"
                      id="pay-ovo"
                      onClick={() => setSelectedMethod('ovo')}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ${
                        selectedMethod === 'ovo'
                          ? 'bg-purple-950/65 border-purple-500 text-white shadow-md'
                          : 'bg-slate-900/30 border-indigo-950/80 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 text-purple-400" />
                      <span className="text-[10px] font-mono font-black">OVO</span>
                    </button>
                  </div>

                  {/* Dynamic checkout panels based on selection */}
                  {selectedMethod === 'qris' && (
                    <div className="bg-slate-900/90 border border-indigo-950 p-4 rounded-xl flex flex-col items-center space-y-3">
                      <div className="p-2.5 bg-white rounded-lg block shadow-lg">
                        {/* High fidelity looking simulated QR code custom render */}
                        <div className="w-32 h-32 bg-slate-100 flex flex-col justify-between p-1.5 border border-slate-350 relative">
                          <div className="flex justify-between">
                            <div className="w-7 h-7 bg-slate-950 rounded-sm" />
                            <div className="w-7 h-7 bg-slate-950 rounded-sm" />
                          </div>
                          {/* Inner custom QR dots aesthetics */}
                          <div className="absolute inset-0 m-12 bg-slate-950/80 p-1 flex items-center justify-center text-center font-mono text-[8px] text-white font-black rounded-sm">
                            SNIPE
                          </div>
                          <div className="flex justify-between items-end">
                            <div className="w-7 h-7 bg-slate-950 rounded-sm" />
                            <div className="w-7 h-7 bg-slate-950/50 rounded-sm flex items-center justify-center font-black text-[6px]">QR</div>
                          </div>
                        </div>
                      </div>
                      <div className="text-center space-y-1">
                        <p className="text-[10px] font-mono text-indigo-300 font-bold">QRIS NATIONAL STANDARD (IDN)</p>
                        <p className="text-[9px] text-slate-400 max-w-xs leading-normal">
                          Scan using GPN-supported banking apps, ShopeePay, GoPay, or LinkAja on your device.
                        </p>
                      </div>
                    </div>
                  )}

                  {(selectedMethod === 'dana' || selectedMethod === 'ovo') && (
                    <div className="bg-slate-900/90 border border-indigo-950 p-4 rounded-xl space-y-3">
                      <div className="space-y-1 text-left">
                        <label className="text-[10px] font-mono text-slate-450 uppercase tracking-widest block font-bold">
                          {selectedMethod.toUpperCase()} Connected Mobile Number
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. 081234567890"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full bg-slate-950 border border-indigo-950 text-white rounded-lg p-2.5 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <p className="text-[9px] text-indigo-300 font-mono italic p-1">
                        * A prompt request invoice of Rp15.000 will be instantly dispatched to your {selectedMethod.toUpperCase()} app ledger.
                      </p>
                    </div>
                  )}

                  {/* Guaranteed Security Badge */}
                  <div className="p-3 bg-indigo-950/30 border border-indigo-900/30 rounded-xl flex items-start space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-slate-400 leading-normal font-sans">
                      Encryption check secured by Sandbox Node Ledger. Double box protection active. Your mock tokens will not clear real-world financial assets.
                    </p>
                  </div>

                  {/* Submit pay buttons */}
                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCheckout(false)}
                      className="px-4 py-2 bg-slate-900 text-slate-400 font-bold font-mono text-xs rounded-lg border border-indigo-950/80 flex-1 hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleCompleteSimulatedPayment}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs uppercase rounded-lg shadow-lg flex-1 font-mono tracking-wider hover:from-emerald-600 cursor-pointer"
                    >
                      ✓ Check Pay
                    </button>
                  </div>
                  
                </div>
              ) : checkoutStatus === 'processing' ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                  {/* Spinner */}
                  <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                  <div className="text-center space-y-1">
                    <p className="text-xs font-bold text-white uppercase font-mono">Calling Gateway Ledger Endpoint...</p>
                    <p className="text-[10px] text-slate-450">Simulating settlement sequence. Standard lock latency check.</p>
                  </div>
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 animate-pulse">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-xs font-black text-emerald-400 uppercase font-mono tracking-widest">TRANSACTION IS COMPLETE</p>
                    <p className="text-[10px] text-slate-400">Ledger balance updated. Backing VIP access key online.</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
