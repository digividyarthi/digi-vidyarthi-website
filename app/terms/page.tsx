import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { siteConfig } from '@/data/siteData';

export const metadata = {
  title: 'Terms & Conditions | Digi Vidyarthi Varanasi',
  description: 'Terms and Conditions of Digi Vidyarthi — Varanasi leading digital marketing institute. Read the rules for using our website and enrolling in our courses.',
  alternates: {
    canonical: 'https://digividyarthi.com/terms',
  },
};

export default function TermsPage() {
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
            <FileText className="w-3.5 h-3.5" />
            <span>Institute Guidelines</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Last updated: January 2025
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            By accessing or using <Link href="/" className="text-brand-blue font-semibold hover:underline">digividyarthi.com</Link> and the training services of Digi Vidyarthi, you agree to be bound by these Terms &amp; Conditions.
          </p>

          <h2 className="font-heading font-bold text-xl text-slate-900 pt-2">
            1. About the Institute
          </h2>
          <p>
            Digi Vidyarthi is a practical digital marketing institute located at Ashok Vihar Colony Phase-I, Paharia, Varanasi, Uttar Pradesh 221007, providing training in SEO, Performance Marketing, Meta Ads, Google Ads, Content Strategy, and AI Tools.
          </p>

          <h2 className="font-heading font-bold text-xl text-slate-900 pt-2">
            2. Course Enrollment
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Course fees, schedules, and curriculum inclusions are communicated clearly prior to enrollment.</li>
            <li>Admission is confirmed upon receipt of enrollment confirmation and batch seat reservation.</li>
            <li>Free demo classes carry zero fee and zero payment obligation.</li>
          </ul>

          <h2 className="font-heading font-bold text-xl text-slate-900 pt-2">
            3. Intellectual Property
          </h2>
          <p>
            All course materials, presentations, proprietary workflows, and website content are the intellectual property of Digi Vidyarthi. Commercial reproduction without consent is prohibited.
          </p>

          <h2 className="font-heading font-bold text-xl text-slate-900 pt-2">
            4. Contact
          </h2>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-1 text-sm not-italic">
            <div className="font-bold text-slate-900">{siteConfig.name}</div>
            <div>{siteConfig.address}</div>
            <div>Email: <a href={`mailto:${siteConfig.email}`} className="text-brand-blue font-semibold">{siteConfig.email}</a></div>
            <div>Phone: <a href={`tel:${siteConfig.phone1}`} className="text-brand-blue font-semibold">{siteConfig.phone1}</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}
