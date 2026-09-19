'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IndianRupee, Clock, ArrowRight, PhoneCall, Sparkles, Zap, Tag, Gift } from 'lucide-react';
import { siteConfig } from '@/data/siteData';
import OfferModal from '@/components/OfferModal';

interface FeeDurationSectionProps {
  headingLevel?: 'h2' | 'h3';
  showBackground?: boolean;
}

export default function FeeDurationSection({ headingLevel = 'h2', showBackground = true }: FeeDurationSectionProps) {
  const HeadingTag = headingLevel;
  const [isOfferOpen, setIsOfferOpen] = useState(false);

  return (
    <section className={showBackground ? 'bg-slate-50 py-16 border-y border-slate-200/60' : 'py-8'} id="fees-duration">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200 shadow-md p-8 sm:p-12 space-y-8 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          {/* Section Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white text-xs font-extrabold uppercase tracking-wider shadow-md animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>🔥 Special Batch Offer Active &bull; Limited Seats</span>
            </div>
            
            <HeadingTag className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900">
              Course Fee &amp; <span className="text-brand-orange">Duration</span>
            </HeadingTag>
            
            <p className="text-slate-800 font-medium text-base sm:text-lg leading-relaxed bg-brand-blue-pale/40 p-4 rounded-2xl border border-brand-blue/10">
              &ldquo;{siteConfig.feeDurationStatement}&rdquo;
            </p>
          </div>

          {/* POP-OUT CARDS (PRICING & DURATION) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 relative z-10">
            {/* Pop-out Duration Card */}
            <div className="relative p-7 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border-2 border-brand-blue/30 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-xs uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-brand-orange" />
                  <span>Overall Duration</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-blue-pale text-brand-blue font-bold text-[11px]">
                  Flexible Batches
                </span>
              </div>
              
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {siteConfig.overallDuration}
              </div>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Fast-track capsule formats to comprehensive agency-level specializations. Morning, afternoon &amp; weekend practical classroom slots in Paharia.
              </p>
            </div>

            {/* Pop-out Fee Card with Offer Badge */}
            <div className="relative p-7 rounded-3xl bg-gradient-to-br from-amber-50/50 via-white to-orange-50/60 border-2 border-brand-orange shadow-lg hover:shadow-orangeGlow hover:-translate-y-1 transition-all duration-300 space-y-3 ring-2 ring-brand-orange/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-brand-orange font-bold text-xs uppercase tracking-wider">
                  <IndianRupee className="w-4 h-4 text-brand-orange" />
                  <span>Transparent Fee Range</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-extrabold text-[11px] shadow-sm">
                  ⚡ Offer Badge
                </span>
              </div>
              
              <div className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">
                {siteConfig.overallFeeRange}
              </div>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Comprehensive practical training including live campaign budgets, AI tools worth ₹45K+, and certification. Flexible 0% EMI installments available.
              </p>
            </div>
          </div>

          {/* Action CTAs & Offer Pop-up Trigger */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-slate-100 relative z-10">
            <button
              type="button"
              onClick={() => setIsOfferOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-sm shadow-md hover:shadow-orangeGlow hover:-translate-y-0.5 transition-all text-center"
            >
              <Gift className="w-4 h-4" />
              <span>Check Current Batch Offer</span>
            </button>
            
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-heading font-semibold text-sm border border-slate-200 transition-all text-center"
            >
              <PhoneCall className="w-4 h-4 text-brand-blue" />
              <span>Book Free Demo Class</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Offer Pop-up */}
      <OfferModal isOpen={isOfferOpen} onClose={() => setIsOfferOpen(false)} />
    </section>
  );
}

