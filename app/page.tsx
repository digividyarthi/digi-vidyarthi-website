import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  Bot,
  Zap,
  Target,
  Users,
  Briefcase,
  Award,
  BookOpen,
  TrendingUp,
  PhoneCall,
  ChevronRight,
} from 'lucide-react';
import { courseModules, courseTiers, faqs, gbpReviews, siteConfig } from '@/data/siteData';

export const metadata = {
  title: 'Best Digital Marketing Institute in Varanasi | Digi Vidyarthi',
  description:
    'Varanasi #1 AI-powered digital marketing training institute. Learn SEO, Google Ads, Meta Ads, and AI marketing tools with live client projects and 100% placement support.',
  alternates: {
    canonical: 'https://digividyarthi.com',
  },
};

export default function HomePage() {
  return (
    <div className="space-y-20 sm:space-y-28">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B2E7D] via-brand-blue to-[#1A55D4] text-white pt-12 pb-24 lg:pt-20 lg:pb-32">
        {/* Background Glowing Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-brand-orange-light">
                <Sparkles className="w-4 h-4 text-brand-orange-light" />
                <span>AI-Powered &bull; 100% Practical &bull; Career-Focused</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
                Varanasi&apos;s Leading{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA040] via-brand-orange to-[#FF7A00]">
                  Digital Marketing
                </span>{' '}
                &amp; AI Education Platform
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Transform from beginner to high-income marketer with real client ad budgets, live SEO ranking projects, and modern AI automation tools. No boring theory — only practical results.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-base shadow-orangeGlow hover:scale-105 transition-all"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-brand-blue border border-white/30 font-heading font-bold text-base transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Book Free Demo</span>
                </Link>
              </div>

              {/* Trust Indicators / Stats */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/15">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-orange-light">1,000+</div>
                  <div className="text-xs sm:text-sm text-white/75">Students Trained</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-orange-light">4.9 ★</div>
                  <div className="text-xs sm:text-sm text-white/75">Google Rating</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-orange-light">100%</div>
                  <div className="text-xs sm:text-sm text-white/75">Live Projects</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-orange-light">40+</div>
                  <div className="text-xs sm:text-sm text-white/75">Hiring Partners</div>
                </div>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Floating AI Badge */}
                <div className="absolute -top-4 left-0 z-20 bg-white text-slate-800 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 font-heading font-bold text-xs animate-float">
                  <div className="w-7 h-7 rounded-xl bg-brand-blue-pale text-brand-blue flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span>AI Prompt Workflows</span>
                </div>

                {/* Floating SEO Badge */}
                <div className="absolute -bottom-4 right-0 z-20 bg-white text-slate-800 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 font-heading font-bold text-xs animate-float [animation-delay:1.5s]">
                  <div className="w-7 h-7 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span>Google #1 Ranking Case Studies</span>
                </div>

                {/* Main Hero Visual Image */}
                <div className="relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md p-3 border border-white/20 shadow-2xl">
                  <Image
                    src="/images/hero-mentor.webp"
                    alt="Digi Vidyarthi Practical Training Mentorship"
                    width={520}
                    height={520}
                    className="w-full h-auto rounded-2xl object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY AI-FIRST SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange-pale px-3.5 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5" />
            The AI Advantage
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            Why Learn <span className="text-brand-blue">AI-First</span> Digital Marketing?
          </h2>
          <p className="text-slate-600 text-base">
            Traditional marketing courses teach how things were done 5 years ago. At Digi Vidyarthi, you master the exact AI agent workflows top agencies use today to 10x campaign output.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-brand-blue/30 hover:shadow-glow transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-blue-pale text-brand-blue flex items-center justify-center font-bold text-xl">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Direct AI Tools, Don&apos;t Fear Them</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Learn how to use ChatGPT, Claude, Midjourney, and automated scripts for programmatic SEO, high-converting ad copy, and video scripts in minutes.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-brand-orange/30 hover:shadow-orangeGlow transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange-pale text-brand-orange flex items-center justify-center font-bold text-xl">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Real Client Ad Budgets</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              No theoretical simulations. You will launch and optimize live campaigns on Meta Ads Manager and Google Ads with actual marketing spend.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-brand-blue/30 hover:shadow-glow transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-blue-pale text-brand-blue flex items-center justify-center font-bold text-xl">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Portfolio &amp; Career Placement</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Graduate with a live portfolio showcasing ranking websites and client ROAS case studies. We connect you directly with hiring agencies across India.
            </p>
          </div>
        </div>
      </section>

      {/* ===== COURSES & LEARNING PATHS ===== */}
      <section className="bg-slate-50 py-20 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-pale px-3.5 py-1 rounded-full">
              <BookOpen className="w-3.5 h-3.5" />
              Structured Tracks
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
              Choose Your <span className="text-brand-orange">Career Path</span>
            </h2>
            <p className="text-slate-600 text-base">
              Whether you are a college student, career switcher, or business owner, we have the right program for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {courseTiers.map((tier, idx) => (
              <div
                key={tier.name}
                className={`flex flex-col p-8 rounded-3xl bg-white border transition-all ${
                  tier.popular
                    ? 'border-brand-blue shadow-glow relative ring-2 ring-brand-blue'
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
                  className={`w-full py-3 rounded-full text-center font-heading font-bold text-sm transition-all ${
                    tier.popular
                      ? 'bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white shadow-md hover:shadow-orangeGlow'
                      : 'bg-brand-blue-pale text-brand-blue hover:bg-brand-blue hover:text-white'
                  }`}
                >
                  Enroll / Book Demo
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 font-heading font-bold text-brand-blue hover:text-brand-orange transition-colors text-base"
            >
              <span>View Full Module-by-Module Syllabus</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 10+ CORE MODULES GRID ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange-pale px-3.5 py-1 rounded-full">
            <Award className="w-3.5 h-3.5" />
            Comprehensive Skillset
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            10+ Industry Modules <span className="text-brand-blue">You Will Master</span>
          </h2>
          <p className="text-slate-600 text-base">
            Every module is designed to give you marketable skills that companies and freelance clients actively pay for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courseModules.map((mod) => (
            <div
              key={mod.title}
              className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-brand-blue/30 hover:shadow-card transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-blue-pale text-brand-blue flex items-center justify-center font-bold group-hover:bg-brand-orange-pale group-hover:text-brand-orange transition-colors">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {mod.highlight}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-brand-blue transition-colors">
                {mod.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== GOOGLE VERIFIED REVIEWS ===== */}
      <section className="bg-slate-50 py-20 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-700">
              <span className="text-amber-500">★★★★★</span>
              <span>4.9 / 5 on Google Business Profile</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
              What Our <span className="text-brand-blue">Students Say</span>
            </h2>
            <p className="text-slate-600 text-base">
              Real career transformations from real students who learned digital marketing at our Varanasi campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gbpReviews.map((rev) => (
              <div
                key={rev.name}
                className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-card transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm italic leading-relaxed">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-blue to-brand-blue-light text-white flex items-center justify-center font-bold text-sm">
                    {rev.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{rev.name}</h4>
                    <p className="text-slate-400 text-xs">{rev.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQS SECTION ===== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange-pale px-3.5 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            Frequently Asked <span className="text-brand-blue">Questions</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to know about our courses, fees, batch timings, and placement assistance.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details
              key={faq.q}
              className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-brand-blue/30 shadow-sm transition-all"
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

      {/* ===== FINAL CALL TO ACTION ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl bg-gradient-to-r from-brand-blue to-[#0B2E7D] text-white p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl space-y-6">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
            Ready to Build a High-Paying Digital Marketing Career?
          </h2>
          <p className="text-white/85 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Join the upcoming batch at Digi Vidyarthi Varanasi. Book your free interactive demo class today and experience practical learning firsthand.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-sm shadow-orangeGlow hover:scale-105 transition-all"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-brand-blue border border-white/30 font-heading font-bold text-sm transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Free Demo</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
