'use client';

import React, { useState } from 'react';
import { Sparkles, Clock, CheckCircle2, ArrowRight, ShieldCheck, Flame, Gift, Check } from 'lucide-react';
import { siteConfig } from '@/data/siteData';

export default function ScholarshipBanner() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('DV25OFF');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative z-20 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-[#0B1536] to-slate-900 border-2 border-brand-orange/40 shadow-[0_15px_40px_rgba(230,81,0,0.25)] p-6 sm:p-10 text-white overflow-hidden">
        {/* Glowing Ambient Backdrop Accents */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-blue/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Offer Details & Value Proposition */}
          <div className="lg:col-span-7 space-y-4">
            {/* Top Badges */}
            <div className="flex items-center flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/50 text-brand-orange-light text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>Special Varanasi Student Scholarship</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0 animate-bounce" />
                <span>Only 3 Slots Left for Upcoming Batch</span>
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Get Flat <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-red-400">25% Scholarship OFF</span> on AI Digital Marketing Course
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Don't miss out on Varanasi's highest-rated AI-powered digital marketing course. Work on real ad budgets, build live SEO campaigns, and get guaranteed agency mentorship.
            </p>

            {/* Value Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>₹5 Lakh+ Live Client Budgets</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>15+ Global Certifications (Google & Meta)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Small 10-Student Focused Batches</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Placement & Agency Internship</span>
              </div>
            </div>

            {/* Coupon Code Pill */}
            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-dashed border-brand-orange/60">
                <span className="text-xs text-slate-400 font-medium">Coupon Code:</span>
                <span className="font-mono text-base font-bold text-amber-400 tracking-wider">
                  DV25OFF
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="text-xs text-slate-300 hover:text-white underline ml-1 cursor-pointer flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : 'Copy'}
                </button>
              </div>
              <span className="text-xs text-slate-400">
                Applied automatically upon registration
              </span>
            </div>
          </div>

          {/* Right Column: Lead Form or Success Message */}
          <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-700/80 p-6 sm:p-7 shadow-xl">
            {submitted ? (
              <div className="text-center space-y-4 py-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    Registration Confirmed!
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white">
                    25% Scholarship Locked 🎉
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Hamare senior admissions counselor aapko call karke batch timings aur coupon verification confirm karenge.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-dashed border-brand-orange/50 space-y-1 text-center">
                  <div className="text-[11px] text-slate-400 uppercase font-medium">Your Coupon Code</div>
                  <div className="font-mono text-2xl font-extrabold text-amber-400 tracking-widest">DV25OFF</div>
                </div>

                <a
                  href="https://wa.me/919278039576?text=Hi%20Digi%20Vidyarthi%2C%20maine%20website%20se%2025%25%20OFF%20Scholarship%20Coupon%20(DV25OFF)%20claim%20kiya%20hai.%20Upcoming%20batch%20seat%20reserve%20karein."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-heading font-bold text-sm shadow-md transition-all"
                >
                  <span>Chat on WhatsApp to Reserve</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Claim Your 25% Discount
                  </h3>
                  <p className="text-xs text-slate-400">
                    Register below to lock your discount before seats fill up.
                  </p>
                </div>

                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label htmlFor="banner-name" className="block text-[11px] font-semibold text-slate-200 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    id="banner-name"
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Aman Gupta"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-600 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="banner-phone" className="block text-[11px] font-semibold text-slate-200 mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 text-sm font-semibold">
                      +91
                    </span>
                    <input
                      id="banner-phone"
                      type="tel"
                      name="phone"
                      required
                      pattern="[6-9][0-9]{9}"
                      maxLength={10}
                      placeholder="9876543210"
                      className="w-full pl-12 pr-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-600 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="banner-profile" className="block text-[11px] font-semibold text-slate-200 mb-1">
                    Your Profile
                  </label>
                  <select
                    id="banner-profile"
                    name="message"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-600 text-white text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
                  >
                    <option value="12th Pass / Intermediate">12th Pass / Intermediate</option>
                    <option value="College Undergraduate / Graduate">College Undergraduate / Graduate</option>
                    <option value="Working Professional (Career Switch)">Working Professional (Career Switch)</option>
                    <option value="Business Owner / Freelancer">Business Owner / Freelancer</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-brand-orange via-[#FF7A00] to-amber-500 hover:from-brand-orange-dark hover:to-orange-500 text-white font-heading font-extrabold text-sm shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group disabled:opacity-75 cursor-pointer mt-1"
                >
                  {loading ? (
                    <span>Locking 25% Scholarship...</span>
                  ) : (
                    <>
                      <span>Claim 25% Scholarship Seat</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified leads delivered directly to admissions team</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
