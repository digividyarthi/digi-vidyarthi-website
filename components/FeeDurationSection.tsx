import React from 'react';
import Link from 'next/link';
import { IndianRupee, Clock, ArrowRight, PhoneCall, HelpCircle, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/data/siteData';

interface FeeDurationSectionProps {
  headingLevel?: 'h2' | 'h3';
  showBackground?: boolean;
}

export default function FeeDurationSection({ headingLevel = 'h2', showBackground = true }: FeeDurationSectionProps) {
  const HeadingTag = headingLevel;

  return (
    <section className={showBackground ? 'bg-slate-50 py-16 border-y border-slate-200/60' : 'py-8'} id="fees-duration">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-8 sm:p-12 space-y-6">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-blue-pale text-brand-blue text-xs font-bold uppercase tracking-wider">
              <IndianRupee className="w-3.5 h-3.5" />
              Transparent Pricing &amp; Timeline
            </span>
            <HeadingTag className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900">
              Course Fee &amp; <span className="text-brand-orange">Duration</span>
            </HeadingTag>
            <p className="text-slate-800 font-medium text-base sm:text-lg leading-relaxed bg-brand-blue-pale/40 p-4 rounded-2xl border border-brand-blue/10">
              &ldquo;{siteConfig.feeDurationStatement}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center gap-2 text-brand-blue font-bold text-sm">
                <Clock className="w-4 h-4 text-brand-orange" />
                <span>Overall Duration</span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">
                {siteConfig.overallDuration}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Options include fast-track capsule formats to comprehensive agency-level career specializations with flexible morning and evening batches.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center gap-2 text-brand-blue font-bold text-sm">
                <IndianRupee className="w-4 h-4 text-brand-orange" />
                <span>Overall Fee Range</span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">
                {siteConfig.overallFeeRange}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transparent course fees based on your selected programme track, inclusive of live campaign access, software tools, and certification. Flexible installments available.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-slate-100">
            <Link
              href="/contact?inquiry=fee-structure"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-sm shadow-md hover:shadow-orangeGlow hover:-translate-y-0.5 transition-all text-center"
            >
              <span>Get Current Fee Structure</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
    </section>
  );
}
