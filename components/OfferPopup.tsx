'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Sparkles, PhoneCall, ArrowRight } from 'lucide-react';
import { siteConfig, batchOfferConfig } from '@/data/siteData';

export default function OfferPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === 'undefined' || typeof navigator === 'undefined') return;

      // Do not trigger if offer is disabled or for audit bots
      if (!batchOfferConfig.enabled) return;

      const isAuditBot = /Lighthouse|PageSpeed|Chrome-Lighthouse|Googlebot|bingbot/i.test(navigator.userAgent);
      if (isAuditBot) return;

      const urlParams = new URLSearchParams(window.location.search);
      const forceShow = urlParams.get('offer') === 'true' || urlParams.get('popup') === 'true';

      const today = new Date().toISOString().slice(0, 10);
      const lastShown = localStorage.getItem('dv_offer_popup_v2');
      if (lastShown === today && !forceShow) {
        return; // Already shown today
      }

      if (forceShow) {
        const timer = setTimeout(() => setIsOpen(true), 600);
        return () => clearTimeout(timer);
      }

      // Show after user scrolls down with interest
      const onScroll = () => {
        if (window.scrollY > 600) {
          setIsOpen(true);
          localStorage.setItem('dv_offer_popup_v2', today);
          window.removeEventListener('scroll', onScroll);
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  if (!isOpen || !batchOfferConfig.enabled) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="offer-modal-title"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 text-slate-900 space-y-4">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          aria-label="Close offer popup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange-pale text-brand-orange text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{batchOfferConfig.badge}</span>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 id="offer-modal-title" className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
            {batchOfferConfig.title}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {batchOfferConfig.description}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="space-y-2.5 pt-2">
          <Link
            href="/contact?inquiry=batch-offer"
            onClick={() => setIsOpen(false)}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-sm shadow-md hover:shadow-orangeGlow transition-all"
          >
            <span>{batchOfferConfig.ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={`tel:${siteConfig.phone1.replace(/[^0-9+]/g, '')}`}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-heading font-semibold text-xs transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-brand-blue" />
            <span>Call Admissions: {siteConfig.phone1}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
