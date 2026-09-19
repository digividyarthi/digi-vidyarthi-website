import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import { siteConfig } from '@/data/siteData';

export const metadata = {
  title: 'Privacy Policy | Digi Vidyarthi Varanasi',
  description: 'Learn how Digi Vidyarthi collects, uses, and protects your personal data on our digital marketing institute website in Varanasi.',
  alternates: {
    canonical: 'https://digividyarthi.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
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
            <Shield className="w-3.5 h-3.5" />
            <span>Legal &amp; Privacy</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Last updated: January 2025
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed space-y-6">
          <p>
            Digi Vidyarthi (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website{' '}
            <Link href="/" className="text-brand-blue font-semibold hover:underline">
              digividyarthi.com
            </Link>{' '}
            &mdash; Varanasi&apos;s leading practical digital marketing institute. This page explains what personal data we collect, why we collect it, and what your rights are.
          </p>

          <h2 className="font-heading font-bold text-xl text-slate-900 pt-2">
            1. Information We Collect
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Contact form &amp; Brochure data:</strong> Name, phone number, email address, course interest, and any message you send.</li>
            <li><strong>Analytics data:</strong> Anonymized page views, device type, and referral information.</li>
            <li><strong>Cookies:</strong> Functional cookies to remember UI preferences.</li>
          </ul>

          <h2 className="font-heading font-bold text-xl text-slate-900 pt-2">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To respond to your enquiries about courses, free demo classes, and admissions.</li>
            <li>To deliver curriculum brochures and syllabus documents you request.</li>
            <li>To provide timely updates regarding upcoming batch schedules.</li>
            <li>To improve website performance and user experience.</li>
          </ul>

          <h2 className="font-heading font-bold text-xl text-slate-900 pt-2">
            3. Data Protection Guarantee
          </h2>
          <p>
            We strictly do <strong>not</strong> sell, rent, or trade your personal information with third-party telemarketers or advertisers.
          </p>

          <h2 className="font-heading font-bold text-xl text-slate-900 pt-2">
            4. Campus Contact Details
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
