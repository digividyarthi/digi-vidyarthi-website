'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Clock, CheckCircle2, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

export default function OfferPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 59); // 15 min countdown
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Frequency capping: 1 time per device per day (or force via ?offer=true)
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const forceShow = urlParams.get('offer') === 'true' || urlParams.get('popup') === 'true';

      const today = new Date().toISOString().slice(0, 10);
      const lastShown = localStorage.getItem('dv_offer_popup_v1');
      if (lastShown === today && !forceShow) {
        return; // Already shown today
      }

      // Smooth trigger after 2.5s (or 800ms if force preview)
      const delay = forceShow ? 800 : 2500;
      const timer = setTimeout(() => {
        setIsOpen(true);
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      }, delay);

      return () => clearTimeout(timer);
    } catch {
      // localStorage may fail in private browsing
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Clean, Smooth Fireworks Confetti Burst
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;
      gravity: number;
    };

    let particles: Particle[] = [];
    const colors = ['#E65100', '#FF8A3D', '#FBBF24', '#38BDF8', '#FFFFFF'];

    function createBurst(x: number, y: number, count = 30) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.5 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          gravity: 0.08,
        });
      }
    }

    // Launch gentle celebration bursts
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.32;
    createBurst(centerX - 140, centerY, 35);
    createBurst(centerX + 140, centerY, 35);

    const burstTimer = setTimeout(() => {
      createBurst(centerX, centerY - 40, 40);
    }, 400);

    function render() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(render);
      }
    }

    render();

    return () => {
      clearTimeout(burstTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 250);

    try {
      const today = new Date().toISOString().slice(0, 10);
      localStorage.setItem('dv_offer_popup_v1', today);
    } catch {
      // Ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('course', 'Scholarship-25');

    try {
      await fetch('/contact.php', {
        method: 'POST',
        body: formData,
      });
      setSubmitted(true);
      try {
        const today = new Date().toISOString().slice(0, 10);
        localStorage.setItem('dv_offer_popup_v1', today);
      } catch {
        // Ignore
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const formatMinutes = Math.floor(timeLeft / 60);
  const formatSeconds = timeLeft % 60;
  const formattedTime = `${String(formatMinutes).padStart(2, '0')}:${String(formatSeconds).padStart(2, '0')}`;

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Soft Fireworks Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10"
      />

      {/* Smooth, Clean Modal Box */}
      <div
        className={`relative z-20 w-full max-w-lg bg-slate-900/95 border border-slate-700/70 text-white rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(230,81,0,0.2)] overflow-hidden transition-all duration-300 ease-out transform ${
          isAnimating ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'
        }`}
      >
        {/* Subtle Top Accent Line */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-brand-orange to-red-500" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close offer popup"
          className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          /* SUCCESS SCREEN */
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                Registration Successful!
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                25% Scholarship Locked! 🎉
              </h3>
              <p className="text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
                Aapka coupon code save ho gaya hai. Digi Vidyarthi career counseling team aapko turant call karegi.
              </p>
            </div>

            {/* Clean Coupon Code Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-dashed border-brand-orange/50 space-y-1.5 max-w-xs mx-auto">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                Your Exclusive Scholarship Coupon
              </p>
              <div className="font-mono text-2xl sm:text-3xl font-extrabold tracking-widest text-amber-400">
                DV25OFF
              </div>
              <p className="text-[11px] text-slate-400">
                Valid for AI Digital Marketing Courses
              </p>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="pt-1 space-y-3 max-w-xs mx-auto">
              <a
                href="https://wa.me/919278039576?text=Hi%20Digi%20Vidyarthi%2C%20maine%20website%20se%2025%25%20OFF%20Scholarship%20Coupon%20(DV25OFF)%20claim%20kiya%20hai.%20Mujhe%20upcoming%20batch%20seat%20reserve%20krni%20hai."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-heading font-bold text-sm shadow-md transition-all"
              >
                <span>Claim Directly on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleClose}
                className="text-xs text-slate-400 hover:text-white underline transition-colors"
              >
                Continue Browsing Website
              </button>
            </div>
          </div>
        ) : (
          /* FORM & OFFER VIEW */
          <div className="p-6 sm:p-8 space-y-4">
            {/* Top Badge & Timer */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 text-brand-orange-light text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Special Varanasi Student Offer</span>
              </div>

              {/* Clean Timer */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-300 text-xs font-medium">
                <Clock className="w-3.5 h-3.5 text-red-400" />
                <span>Ends in: <strong className="text-white font-mono">{formattedTime}</strong></span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h2 className="font-heading text-2xl sm:text-[26px] font-extrabold tracking-tight text-white leading-tight">
                Get Flat <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-brand-orange">25% Scholarship OFF</span> on AI Digital Marketing Course
              </h2>
              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                Varanasi's premier practical training program with live client ad budgets, Google/Meta certifications, and 100% placement support.
              </p>
            </div>

            {/* Clean Feature Pills */}
            <div className="grid grid-cols-2 gap-2 text-[12px] text-slate-200 bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Live Client Budgets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>15+ Global Certifications</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Small 10-Student Batches</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Placement Assistance</span>
              </div>
            </div>

            {/* Lead Form */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label htmlFor="popup-name" className="block text-[11px] font-semibold text-slate-200 mb-1">
                  Your Full Name *
                </label>
                <input
                  id="popup-name"
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-600 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                />
              </div>

              <div>
                <label htmlFor="popup-phone" className="block text-[11px] font-semibold text-slate-200 mb-1">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 text-sm font-semibold">
                    +91
                  </span>
                  <input
                    id="popup-phone"
                    type="tel"
                    name="phone"
                    required
                    pattern="[6-9][0-9]{9}"
                    maxLength={10}
                    placeholder="9876543210"
                    className="w-full pl-12 pr-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-600 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="popup-profile" className="block text-[11px] font-semibold text-slate-200 mb-1">
                  Your Qualification / Profile
                </label>
                <select
                  id="popup-profile"
                  name="message"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-600 text-white text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                >
                  <option value="12th Pass / Intermediate">12th Pass / Intermediate</option>
                  <option value="College Undergraduate / Graduate">College Undergraduate / Graduate</option>
                  <option value="Working Professional (Career Switch)">Working Professional (Career Switch)</option>
                  <option value="Business Owner / Freelancer">Business Owner / Freelancer</option>
                </select>
              </div>

              {/* Scarcity Line */}
              <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-medium">
                <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>Only 3 scholarship seats left for the upcoming batch today!</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-brand-orange via-[#FF7A00] to-amber-500 hover:from-brand-orange-dark hover:to-orange-500 text-white font-heading font-bold text-sm sm:text-base shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group disabled:opacity-75 cursor-pointer mt-1"
              >
                {loading ? (
                  <span>Securing Your 25% OFF...</span>
                ) : (
                  <>
                    <span>Claim 25% Discount Coupon</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1 pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Privacy Protected. No spam guaranteed.</span>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
