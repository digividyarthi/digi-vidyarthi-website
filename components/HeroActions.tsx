'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PhoneCall, ArrowRight, Download, Sparkles } from 'lucide-react';
import BrochureModal from '@/components/BrochureModal';

export default function HeroActions() {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
        {/* Primary CTA: Book Demo */}
        <Link
          href="/contact"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-base shadow-orangeGlow hover:scale-105 transition-all text-center"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Book Free Demo</span>
        </Link>

        {/* Highlighted CTA: Download Brochure */}
        <button
          type="button"
          onClick={() => setIsBrochureOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white text-brand-blue hover:bg-slate-100 font-heading font-bold text-base shadow-lg hover:scale-105 transition-all text-center group"
        >
          <Download className="w-4 h-4 text-brand-orange group-hover:translate-y-0.5 transition-transform" />
          <span>Download Brochure</span>
        </button>

        {/* Tertiary CTA: View Syllabus */}
        <Link
          href="/courses"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 font-heading font-semibold text-sm transition-all text-center"
        >
          <span>Curriculum</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Brochure Lead Capture Modal */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />
    </>
  );
}
