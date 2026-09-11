import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Award,
  Layers,
  Clock,
  IndianRupee,
  HelpCircle,
  Bot,
  Zap,
} from 'lucide-react';
import { verifiedCourses, faqs, siteConfig } from '@/data/siteData';
import FeeDurationSection from '@/components/FeeDurationSection';
import BatchOfferBanner from '@/components/BatchOfferBanner';

export const metadata = {
  title: 'Best Digital Marketing Course in Varanasi | Digi Vidyarthi',
  description:
    'Explore practical digital marketing courses in Varanasi ranging from ₹10,000 to ₹50,000 (2 to 6 months). AI Tools, AI Powered Digital Marketing, and Capsule Course with live projects.',
  alternates: {
    canonical: 'https://digividyarthi.com/courses',
  },
};

export default function CoursesPage() {
  const capsuleCourse = verifiedCourses.find(
    (c) => c.id === 'capsule-course-in-digital-marketing'
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* ===== PAGE HERO ===== */}
      <section className="bg-gradient-to-br from-[#0B2E7D] via-brand-blue to-[#1A55D4] text-white py-16 lg:py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-brand-orange-light text-xs font-semibold uppercase tracking-wider">
            Practical Classroom Programmes
          </span>

          {/* Exactly One H1 */}
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Best Digital Marketing Course in Varanasi
          </h1>

          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Hands-on digital marketing training with real client assignments, live campaigns, and modern AI tools. Offered by{' '}
            <Link
              href="/"
              className="text-brand-orange-light underline font-semibold hover:text-white transition-colors"
            >
              Digi Vidyarthi digital marketing institute in Varanasi
            </Link>{' '}
            at our Paharia campus.
          </p>
        </div>
      </section>

      {/* ===== BATCH ADMISSION OFFER ===== */}
      <BatchOfferBanner />

      {/* ===== THREE VERIFIED PROGRAMME CARDS ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="all-courses">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange-pale px-3.5 py-1 rounded-full">
            Program Tracks
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            Select Your <span className="text-brand-blue">Training Track</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We offer three distinct practical learning tracks designed to meet the goals of beginners, business owners, freelancers, and career-focused marketers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {verifiedCourses.map((course) => (
            <div
              key={course.id}
              id={course.id}
              className={`flex flex-col p-8 rounded-3xl bg-white border transition-all ${
                course.popular
                  ? 'border-brand-blue shadow-glow ring-2 ring-brand-blue relative'
                  : 'border-slate-200 hover:shadow-card'
              }`}
            >
              {course.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  ★ Most Comprehensive
                </span>
              )}

              <div className="space-y-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-pale px-3 py-1 rounded-full inline-block">
                  {course.badge}
                </span>
                <h3 className="text-2xl font-bold text-slate-900">{course.name}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{course.tagline}</p>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">
                {course.summary}
              </p>

              {/* Editable Duration & Fee with overall range */}
              <div className="space-y-2.5 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800">Duration: </span>
                    <span>{course.duration}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <IndianRupee className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800">Fee Range: </span>
                    <span>{course.fee}</span>
                  </div>
                </div>
              </div>

              {/* Key Modules List */}
              <div className="space-y-2 mb-8 flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Key Course Modules:
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {(course.keyModules || (course.modules ? course.modules.slice(0, 7) : [])).map((mod) => (
                    <li key={mod} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
                {course.modules && course.modules.length > 7 && (
                  <p className="text-[11px] text-brand-blue font-semibold pt-1">
                    + {course.modules.length - 7} additional core modules covered
                  </p>
                )}
              </div>

              {/* CTAs */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100">
                <Link
                  href="/contact"
                  className={`w-full py-3.5 rounded-full text-center font-heading font-bold text-sm block transition-all ${
                    course.popular
                      ? 'bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white shadow-md hover:shadow-orangeGlow'
                      : 'bg-brand-blue-pale text-brand-blue hover:bg-brand-blue hover:text-white'
                  }`}
                >
                  Book Free Demo
                </Link>
                <Link
                  href="/contact?inquiry=fee-structure"
                  className="w-full py-2.5 rounded-full text-center text-xs font-semibold text-slate-700 hover:text-brand-blue block transition-colors"
                >
                  Get Current Fee Structure &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== DEDICATED CAPSULE COURSE SECTION ===== */}
      {capsuleCourse && (
        <section
          className="bg-white py-16 border-y border-slate-200/80"
          id="capsule-course"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-orange-pale text-brand-orange text-xs font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                Featured Compact Programme
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
                {capsuleCourse.heading || 'Capsule Digital Marketing Course in Varanasi'}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {capsuleCourse.summary}
              </p>
            </div>

            {/* 14 Core Modules Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  Curriculum: 14 Core Digital Marketing Modules
                </h3>
                <span className="text-xs text-slate-500 italic">
                  Covering all core digital marketing modules
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {capsuleCourse.modules?.map((moduleName, index) => (
                  <div
                    key={moduleName}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-blue/40 hover:bg-white hover:shadow-sm transition-all space-y-2"
                  >
                    <div className="w-7 h-7 rounded-lg bg-brand-blue-pale text-brand-blue font-bold text-xs flex items-center justify-center">
                      {index + 1}
                    </div>
                    <h4 className="font-semibold text-sm text-slate-900 leading-snug">
                      {moduleName}
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcome Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-blue-pale/70 to-slate-50 border border-brand-blue/20 space-y-3">
              <div className="flex items-center gap-2 text-brand-blue font-bold text-sm">
                <Award className="w-5 h-5 text-brand-orange" />
                <span>Learning Outcome</span>
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {capsuleCourse.outcome}
              </p>
              <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue text-white font-heading font-bold text-xs hover:bg-brand-blue-dark transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Book Free Demo for Capsule Course</span>
                </Link>
                <Link
                  href="/contact?inquiry=capsule-fee"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-brand-blue transition-colors"
                >
                  <span>Get Current Fee Structure</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== COURSE FEE & DURATION SECTION ===== */}
      <FeeDurationSection />

      {/* ===== COURSE FAQS ===== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="course-faqs">
        <div className="text-center space-y-2">
          <h2 className="font-heading text-3xl font-extrabold text-slate-900">
            Course <span className="text-brand-blue">FAQs</span>
          </h2>
          <p className="text-slate-600 text-sm">
            Common questions regarding admissions, batch schedules, duration, and certificates.
          </p>
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

      {/* ===== BOTTOM ENROLLMENT CTA ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-brand-blue to-[#0B2E7D] text-white p-8 sm:p-12 text-center space-y-4 shadow-xl">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            Reserve Your Free Demo Class Today
          </h2>
          <p className="text-white/90 text-sm sm:text-base max-w-lg mx-auto">
            Experience our practical, live-project training at our Paharia, Varanasi campus. Small batch sizes for dedicated mentor attention.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-sm shadow-orangeGlow hover:scale-105 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Free Demo Now</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-heading font-semibold text-sm border border-white/20 transition-all"
            >
              <span>Back to Digi Vidyarthi digital marketing institute in Varanasi</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
