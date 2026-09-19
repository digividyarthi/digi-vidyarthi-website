'use client';

import React, { useEffect } from 'react';
import { X, Sparkles, IndianRupee, Clock, CheckCircle2, PhoneCall, ArrowRight, ShieldCheck, Zap, Gift } from 'lucide-react';
import { siteConfig, batchOfferConfig } from '@/data/siteData';

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OfferModal({ isOpen, onClose }: OfferModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-brand-orange/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Banner */}
        <div className="bg-gradient-to-r from-brand-orange via-[#FF7A00] to-[#E05300] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Limited Time Admission Offer</span>
          </div>

          <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Upcoming Batch Discount
          </h3>
          <p className="text-white/90 text-xs sm:text-sm mt-1">
            Special fee benefits available for early registrations in our Varanasi classroom cohort.
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Highlight Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-brand-blue-pale/50 border border-brand-blue/20 text-center space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-blue">Fee Range</div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900">{siteConfig.overallFeeRange}</div>
              <div className="text-[11px] text-slate-500">EMI from ₹3,500/mo</div>
            </div>

            <div className="p-4 rounded-2xl bg-brand-orange-pale/50 border border-brand-orange/20 text-center space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-orange">Duration</div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900">{siteConfig.overallDuration}</div>
              <div className="text-[11px] text-slate-500">Weekday & Weekend</div>
            </div>
          </div>

          {/* Offer Inclusions */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-brand-orange" />
              <span>What&apos;s Included In This Offer:</span>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Special Batch Discount:</strong> Up to 25%-30% off for verified early seat reservations.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Free AI Tools Access:</strong> ChatGPT Plus, Canva Pro, Semrush demo &amp; tools worth ₹45,000+.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>0% Interest Installment:</strong> Flexible monthly payment plans for students and freelancers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>100% Free Demo Class:</strong> Attend 1 day live class with mentor Aryan Rai before paying any fees.</span>
              </li>
            </ul>
          </div>

          {/* CTAs */}
          <div className="space-y-3 pt-2">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20Digi%20Vidyarthi,%20I%20want%20to%20claim%20the%20Special%20Batch%20Offer%20for%20Digital%20Marketing%20Course.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-sm shadow-md hover:shadow-orangeGlow hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-center"
            >
              <span>Claim Offer on WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/contact"
              className="w-full py-3 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-heading font-semibold text-xs flex items-center justify-center gap-2 transition-colors text-center"
            >
              <PhoneCall className="w-3.5 h-3.5 text-brand-blue" />
              <span>Book Free Demo Class in Paharia</span>
            </a>
          </div>

          <div className="text-center text-[11px] text-slate-400">
            * Limited to the first 15 students per batch. Terms &amp; Conditions apply.
          </div>
        </div>
      </div>
    </div>
  );
}
