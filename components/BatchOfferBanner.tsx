'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, Tag, ArrowRight, Check, PhoneCall } from 'lucide-react';
import { batchOfferConfig } from '@/data/siteData';

interface BatchOfferBannerProps {
  customConfig?: typeof batchOfferConfig;
}

export default function BatchOfferBanner({ customConfig }: BatchOfferBannerProps) {
  const config = customConfig || batchOfferConfig;
  const [copied, setCopied] = useState(false);

  // If offer is disabled by owner, render nothing
  if (!config.enabled) {
    return null;
  }

  const handleCopyCode = () => {
    if (config.couponCode) {
      navigator.clipboard.writeText(config.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="relative z-20 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-[#0B1536] to-slate-900 border-2 border-brand-orange/40 shadow-card p-6 sm:p-8 text-white overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Offer Details */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/20 border border-brand-orange/50 text-brand-orange-light text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{config.badge}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-slate-300 text-xs font-medium">
                <Calendar className="w-3.5 h-3.5 text-brand-orange-light" />
                <span>Schedule: {config.startDate} &ndash; {config.endDate}</span>
              </span>
            </div>

            <h2 className="font-heading text-xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              {config.title}
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
              {config.description}
            </p>

            {config.couponCode && (
              <div className="pt-1 flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-dashed border-brand-orange/50">
                  <span className="text-xs text-slate-400 font-medium">Reference Code:</span>
                  <span className="font-mono text-sm font-bold text-amber-400 tracking-wider">
                    {config.couponCode}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="ml-1 text-[11px] font-semibold text-brand-orange-light hover:text-white transition-colors"
                    aria-label="Copy reference code"
                  >
                    {copied ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <Check className="w-3 h-3" /> Copied
                      </span>
                    ) : (
                      'Copy'
                    )}
                  </button>
                </div>
                <span className="text-xs text-slate-400">
                  Mention during demo booking for current batch structure.
                </span>
              </div>
            )}
          </div>

          {/* Right Column: CTA Buttons */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <Link
              href={config.ctaLink}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-sm shadow-md hover:shadow-orangeGlow hover:-translate-y-0.5 transition-all text-center"
            >
              <span>{config.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-heading font-semibold text-sm border border-white/20 transition-all text-center"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Free Demo Class</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
