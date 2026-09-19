import React from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { siteConfig } from '@/data/siteData';

export const metadata = {
  title: 'Refund Policy | Digi Vidyarthi Varanasi',
  description: 'Refund Policy of Digi Vidyarthi — Learn the rules for course fee refunds at our digital marketing institute in Varanasi.',
  alternates: {
    canonical: 'https://digividyarthi.com/refund-policy',
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-orange transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="space-y-3 border-b border-slate-100 pb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue-pale text-brand-blue text-xs font-bold uppercase tracking-wider">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Admissions Policy</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            Refund Policy
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Last updated: January 2025
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            This Refund Policy applies to all training enrollments at Digi Vidyarthi, Varanasi.
          </p>

          <h2 className="font-heading font-bold text-xl text-slate-900 pt-2">
            1. Free Demo Classes
          </h2>
          <p>
            Our free interactive demo class is completely complimentary. No registration fee, no obligation.
          </p>

          <h2 className="font-heading font-bold text-xl text-slate-900 pt-2">
            2. Course Enrollments
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Before Batch Starts:</strong> Full refund (minus standard gateway charges) if requested 7 days before batch commencement.</li>
            <li><strong>Within First Week:</strong> Up to 50% refund if requested within the first 7 calendar days.</li>
            <li><strong>Batch Rescheduling:</strong> Students may transfer their enrollment to an upcoming batch slot at zero extra charge with prior notice.</li>
          </ul>

          <h2 className="font-heading font-bold text-xl text-slate-900 pt-2">
            3. Contact for Inquiries
          </h2>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-1 text-sm not-italic">
            <div className="font-bold text-slate-900">{siteConfig.name} Admissions Desk</div>
            <div>{siteConfig.address}</div>
            <div>Email: <a href={`mailto:${siteConfig.email}`} className="text-brand-blue font-semibold">{siteConfig.email}</a></div>
            <div>Helpline: <a href={`tel:${siteConfig.phone1}`} className="text-brand-blue font-semibold">{siteConfig.phone1}</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}
