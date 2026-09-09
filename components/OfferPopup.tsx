'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Clock, CheckCircle2, Gift, Send, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { siteConfig } from '@/data/siteData';

export default function OfferPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 59); // 15 minute countdown
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Frequency capping: 1 time per device per day
  useEffect(() => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const lastShown = localStorage.getItem('dv_offer_popup_v1');
      if (lastShown === today) {
        return; // Already shown today
      }

      // Show after 3.5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3500);

      return () => clearTimeout(timer);
    } catch {
      // localStorage may fail in private mode
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

  // Fireworks / Confetti Particle Engine
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
    const colors = ['#E65100', '#FF8A3D', '#FFD54F', '#1149C6', '#38BDF8', '#FFFFFF', '#F43F5E'];

    function createFirework(x: number, y: number) {
      const count = 45;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          gravity: 0.12,
        });
      }
    }

    // Launch bursts
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.35;
    createFirework(centerX - 160, centerY);
    createFirework(centerX + 160, centerY);

    const burstTimer1 = setTimeout(() => {
      createFirework(centerX, centerY - 60);
    }, 600);

    const burstTimer2 = setTimeout(() => {
      createFirework(centerX - 100, centerY + 80);
      createFirework(centerX + 100, centerY + 80);
    }, 1200);

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
        ctx.globalAlpha = p.alpha;
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
      clearTimeout(burstTimer1);
      clearTimeout(burstTimer2);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      {/* Fireworks Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10"
      />

      {/* Modal Container */}
      <div className="relative z-20 w-full max-w-xl bg-gradient-to-b from-slate-900 via-slate-900 to-[#0A1128] text-white rounded-3xl border-2 border-brand-orange/40 shadow-[0_0_50px_rgba(230,81,0,0.35)] overflow-hidden my-auto">
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-brand-orange to-red-500 animate-pulse" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close offer popup"
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* SUCCESS SCREEN */
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                Registration Successful!
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                25% Scholarship Locked! 🎉
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                Aapka coupon code save ho gaya hai. Hamare senior career counselor aapko turant call karenge.
              </p>
            </div>

            {/* Coupon Code Card */}
            <div className="p-5 rounded-2xl bg-white/5 border border-dashed border-brand-orange/60 space-y-2 max-w-sm mx-auto">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Your Exclusive Scholarship Coupon
              </p>
              <div className="font-mono text-3xl font-extrabold tracking-widest text-amber-400 selection:bg-amber-400 selection:text-black">
                DV25OFF
              </div>
              <p className="text-[11px] text-slate-400">
                Valid for Foundation, Advanced & Mastery Digital Marketing Programs
              </p>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="pt-2 space-y-3 max-w-sm mx-auto">
              <a
                href="https://wa.me/919278039576?text=Hi%20Digi%20Vidyarthi%2C%20maine%20website%20se%2025%25%20OFF%20Scholarship%20Coupon%20(DV25OFF)%20claim%20kiya%20hai.%20Mujhe%20upcoming%20batch%20seat%20reserve%20krni%20hai."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-heading font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all"
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
          <div className="p-6 sm:p-8 space-y-5">
            {/* Top Badge & Fireworks Icon */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange-light text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Special Varanasi Student Offer</span>
              </div>

              {/* Countdown Timer */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span>Ends in: <strong className="text-white font-mono">{formattedTime}</strong></span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-1.5">
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Get Flat <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-red-400">25% Scholarship OFF</span> on AI Marketing Course
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                100% Practical Training in Varanasi with live client budgets, Google/Meta certifications, and placement assistance.
              </p>
            </div>

            {/* Value Bullets */}
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-200 bg-white/5 p-3 rounded-2xl border border-white/10">
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
                <span>100% Placement Support</span>
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
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  WhatsApp / Phone Number *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    pattern="[6-9][0-9]{9}"
                    maxLength={10}
                    placeholder="9876543210"
                    className="w-full pl-12 pr-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Your Current Qualification / Profile
                </label>
                <select
                  name="message"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                >
                  <option value="12th Pass / Intermediate">12th Pass / Intermediate Student</option>
                  <option value="College Undergraduate / Graduate">College Undergraduate / Graduate</option>
                  <option value="Working Professional (Job Switch)">Working Professional (Career Switch)</option>
                  <option value="Business Owner / Freelancer">Business Owner / Freelancer</option>
                </select>
              </div>

              {/* Scarcity Notice */}
              <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-medium pt-1">
                <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0 animate-bounce" />
                <span>Only 3 scholarship slots left for the upcoming batch today!</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-orange via-[#FF7A00] to-amber-500 hover:from-brand-orange-dark hover:to-orange-500 text-white font-heading font-extrabold text-sm sm:text-base shadow-[0_4px_20px_rgba(230,81,0,0.4)] hover:shadow-[0_6px_25px_rgba(230,81,0,0.6)] transition-all flex items-center justify-center gap-2 group disabled:opacity-75 cursor-pointer mt-2"
              >
                {loading ? (
                  <span>Securing Your 25% OFF...</span>
                ) : (
                  <>
                    <span>Claim My 25% Discount Now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
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
