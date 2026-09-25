'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
      <div className="relative rounded-3xl bg-slate-950 border-2 border-brand-orange/40 shadow-card p-6 sm:p-8 text-white overflow-hidden">
        {/* Classroom Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/batch-banner-bg.jpg"
            alt="Digi Vidyarthi Classroom Training Batch"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-[75%_25%] sm:object-[center_28%] pointer-events-none select-none scale-[1.02]"
            priority
          />
          {/* Low transparency overlay: faces remain vividly clear on the right while ensuring solid readability on the text column */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 via-50% to-slate-950/30 sm:from-slate-950/95 sm:via-slate-950/78 sm:to-slate-950/20" />
          <div className="absolute inset-0 bg-[#07112c]/30 mix-blend-multiply" />
        </div>

        {/* Subtle Background Glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Offer Details */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/25 backdrop-blur-sm border border-brand-orange/60 text-brand-orange-light text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{config.badge}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/70 backdrop-blur-sm border border-white/20 text-slate-200 text-xs font-medium shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-brand-orange-light" />
                <span>Schedule: {config.startDate} &ndash; {config.endDate}</span>
              </span>
            </div>

            <h2 className="font-heading text-xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
              {config.title}
            </h2>

            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-2xl font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              {config.description}
            </p>

            {config.couponCode && (
              <div className="pt-1 flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-dashed border-brand-orange/60 shadow-sm">
                  <span className="text-xs text-slate-300 font-medium">Reference Code:</span>
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
                <span className="text-xs text-slate-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                  Mention during demo booking for current batch structure.
                </span>
              </div>
            )}
          </div>

          {/* Right Column: CTA Buttons */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <Link
              href={config.ctaLink}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-sm shadow-lg hover:shadow-orangeGlow hover:-translate-y-0.5 transition-all text-center"
            >
              <span>{config.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900/70 hover:bg-slate-900/90 backdrop-blur-md text-white font-heading font-semibold text-sm border border-white/25 hover:border-white/40 transition-all text-center shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-brand-orange-light" />
              <span>Book Free Demo Class</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
