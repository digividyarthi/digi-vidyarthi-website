import React from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle2, ArrowRight, PhoneCall, Sparkles, ShieldCheck, Award, HelpCircle } from 'lucide-react';
import { courseModules, courseTiers, faqs } from '@/data/siteData';

export const metadata = {
  title: 'Best Digital Marketing Course in Varanasi | Digi Vidyarthi',
  description:
    'Enroll in Varanasi top-rated digital marketing course with 100% practical training. Master SEO, Google Ads, Meta Ads, WordPress, Canva, and AI marketing tools.',
  alternates: {
    canonical: 'https://digividyarthi.com/courses',
  },
};

export default function CoursesPage() {
  return (
    <div className="space-y-20 pb-16">
      {/* PAGE HERO */}
      <section className="bg-gradient-to-br from-[#0B2E7D] via-brand-blue to-[#1A55D4] text-white py-16 lg:py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-brand-orange-light text-xs font-semibold uppercase tracking-wider">
            Industry-Recognized Curriculum
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
            Best Digital Marketing <span className="text-brand-orange-light">Course</span> in Varanasi
          </h1>
          <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From beginner fundamentals to advanced performance marketing and AI automation. Learn through live client projects with dedicated 1-on-1 mentorship.
          </p>
        </div>
      </section>

      {/* LEARNING TIERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange-pale px-3.5 py-1 rounded-full">
            Program Tiers
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            Select the Right Program <span className="text-brand-blue">for Your Goals</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            All programs include live classroom practical training, access to premium marketing tools, and recognized certifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {courseTiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col p-8 rounded-3xl bg-white border transition-all ${
                tier.popular
                  ? 'border-brand-blue shadow-glow ring-2 ring-brand-blue relative'
                  : 'border-slate-200 hover:shadow-card'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  ★ Most Popular
                </span>
              )}

              <div className="space-y-2 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-pale px-3 py-1 rounded-full inline-block">
                  {tier.badge}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{tier.tagline}</p>
              </div>

              <ul className="space-y-3 text-sm text-slate-600 mb-8 flex-1">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`w-full py-3.5 rounded-full text-center font-heading font-bold text-sm transition-all ${
                  tier.popular
                    ? 'bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white shadow-md hover:shadow-orangeGlow'
                    : 'bg-brand-blue-pale text-brand-blue hover:bg-brand-blue hover:text-white'
                }`}
              >
                Enroll / Book Free Demo
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 10+ DETAILED MODULES */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-pale px-3.5 py-1 rounded-full">
              Full Curriculum
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
              Complete Module-by-Module <span className="text-brand-orange">Breakdown</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Every topic is taught through practical assignments. You will build live campaign assets for every module.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseModules.map((mod, i) => (
              <div
                key={mod.title}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-blue/40 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-blue-pale text-brand-blue flex items-center justify-center font-extrabold text-base">
                  {i + 1}
                </div>
                <h3 className="font-bold text-slate-900 text-base">{mod.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="font-heading text-3xl font-extrabold text-slate-900">
            Course <span className="text-brand-blue">FAQs</span>
          </h2>
          <p className="text-slate-600 text-sm">Got questions about admissions, fees, or class schedules?</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-sm transition-all"
            >
              <summary className="font-heading font-bold text-base text-slate-800 cursor-pointer flex items-center justify-between list-none">
                <span>{faq.q}</span>
                <span className="text-brand-orange transition-transform duration-200 group-open:rotate-45 text-xl font-bold">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-brand-blue to-[#0B2E7D] text-white p-8 sm:p-12 text-center space-y-4 shadow-xl">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
            Reserve Your Free Demo Class Today
          </h2>
          <p className="text-white/85 text-sm sm:text-base max-w-lg mx-auto">
            Experience our interactive, live-project training. Seats are limited to 15 students per batch.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-sm shadow-orangeGlow hover:scale-105 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Free Demo Now</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
