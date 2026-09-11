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
  ExternalLink,
  MapPin,
  Clock,
  IndianRupee,
} from 'lucide-react';
import { verifiedCourses, faqs, gbpReviews, siteConfig } from '@/data/siteData';
import BatchOfferBanner from '@/components/BatchOfferBanner';
import TrainersSection from '@/components/TrainersSection';
import FeeDurationSection from '@/components/FeeDurationSection';
import StudentOutcomesSection from '@/components/StudentOutcomesSection';
import CampusContactSection from '@/components/CampusContactSection';
import VideoTestimonials from '@/components/VideoTestimonials';

export const metadata = {
  title: 'Best Digital Marketing Institute in Varanasi | Digi Vidyarthi',
  description:
    'Digi Vidyarthi is the best digital marketing institute in Varanasi offering practical classroom training, live projects, AI tools, and career guidance in Paharia.',
  alternates: {
    canonical: 'https://digividyarthi.com',
  },
};

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B2E7D] via-brand-blue to-[#1A55D4] text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Background Glowing Ambient Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-brand-orange-light">
                <Sparkles className="w-4 h-4 text-brand-orange-light" />
                <span>Paharia, Varanasi Campus &bull; Practical Training &bull; AI Tools</span>
              </div>

              {/* Exact Single H1 */}
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
                Best Digital Marketing Institute in Varanasi
              </h1>

              {/* Above-the-fold Copy with natural keyword mentions */}
              <p className="text-base sm:text-lg text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Learn practical digital marketing with hands-on live projects and modern AI marketing tools at our Varanasi classroom location in Paharia. Work directly on SEO campaigns, Google Ads, Meta Ads Manager, and content strategies with personalized trainer guidance and free demo classes.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-base shadow-orangeGlow hover:scale-105 transition-all text-center"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Book Free Demo</span>
                </Link>
                <Link
                  href="/courses"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-brand-blue border border-white/30 font-heading font-bold text-base transition-all text-center"
                >
                  <span>View Course Curriculum</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Factual Trust Indicators */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/15">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-orange-light">Live</div>
                  <div className="text-xs sm:text-sm text-white/80">Practical Projects</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-orange-light">4.9 ★</div>
                  <div className="text-xs sm:text-sm text-white/80">Google Rating</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-orange-light">Paharia</div>
                  <div className="text-xs sm:text-sm text-white/80">Varanasi Center</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-orange-light">Dedicated</div>
                  <div className="text-xs sm:text-sm text-white/80">Placement Support</div>
                </div>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Floating AI Badge */}
                <div className="absolute -top-4 left-0 z-20 bg-white text-slate-800 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2.5 font-heading font-bold text-xs">
                  <div className="w-7 h-7 rounded-xl bg-brand-blue-pale text-brand-blue flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span>Practical AI Tools</span>
                </div>

                {/* Floating SEO Badge */}
                <div className="absolute -bottom-4 right-0 z-20 bg-white text-slate-800 px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 font-heading font-bold text-xs">
                  <div className="w-7 h-7 rounded-xl bg-green-100 text-green-700 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span>Live Project Training</span>
                </div>

                {/* Main Hero Visual Image */}
                <div className="relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md p-3 border border-white/20 shadow-2xl">
                  <Image
                    src="/images/hero-mentor.webp"
                    alt="Practical digital marketing mentorship session at Digi Vidyarthi in Varanasi"
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

      {/* ===== EDITABLE BATCH OFFER BANNER ===== */}
      <BatchOfferBanner />

      {/* ===== VALUE PROPOSITION SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange-pale px-3.5 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5" />
            Hands-On Learning
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            Why Choose Digi Vidyarthi as Your <span className="text-brand-blue">Digital Marketing Institute</span> in Varanasi?
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Rather than relying solely on lecture slides, our courses emphasize immediate application. Students learn by planning real search strategies, building responsive WordPress web pages, and executing paid advertising campaigns using industry-standard tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-brand-blue/30 hover:shadow-card transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-blue-pale text-brand-blue flex items-center justify-center font-bold text-xl">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">AI Marketing Workflows</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Incorporate modern AI tools like ChatGPT, Claude, Midjourney, and Canva Magic Studio into everyday marketing tasks for faster research, copy drafting, and visual ideation.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-brand-orange/30 hover:shadow-card transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange-pale text-brand-orange flex items-center justify-center font-bold text-xl">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Live Campaign Practice</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Set up real ad groups, target specific audiences in Meta Ads Manager and Google Ads, analyze keyword traffic in SEMrush, and interpret conversions in Google Analytics 4.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-brand-blue/30 hover:shadow-card transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-blue-pale text-brand-blue flex items-center justify-center font-bold text-xl">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Placement &amp; Freelance Support</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every student creates a verified project portfolio demonstrating completed assignments. We assist with resume optimization, mock interviews, and career navigation.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMMES SECTION (EXACT THREE COURSES) ===== */}
      <section className="bg-slate-50 py-20 border-y border-slate-200/60" id="programmes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-pale px-3.5 py-1 rounded-full">
              <BookOpen className="w-3.5 h-3.5" />
              Verified Programmes
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
              Explore Our <span className="text-brand-orange">Digital Marketing Programmes</span> in Varanasi
            </h2>
            <p className="text-slate-600 text-base">
              Choose from focused capsule training to comprehensive AI-powered digital marketing courses designed for students, freelancers, and professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {verifiedCourses.map((course) => (
              <div
                key={course.id}
                className={`flex flex-col p-8 rounded-3xl bg-white border transition-all ${
                  course.popular
                    ? 'border-brand-blue shadow-glow relative ring-2 ring-brand-blue'
                    : 'border-slate-200 hover:shadow-card'
                }`}
              >
                {course.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    ★ Comprehensive Track
                  </span>
                )}

                <div className="space-y-2 mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-pale px-3 py-1 rounded-full inline-block">
                    {course.badge}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900">{course.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{course.tagline}</p>
                </div>

                <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-800">Duration: </span>
                    <span>{course.duration}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">Fee Range: </span>
                    <span>{course.fee}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6 flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Key Modules:
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    {(course.keyModules || (course.modules ? course.modules.slice(0, 6) : [])).map((mod) => (
                      <li key={mod} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                  {course.modules && course.modules.length > 6 && (
                    <p className="text-[11px] text-brand-blue font-semibold pt-1">
                      + {course.modules.length - 6} more core modules in syllabus
                    </p>
                  )}
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <Link
                    href="/contact"
                    className={`w-full py-3 rounded-full text-center font-heading font-bold text-sm block transition-all ${
                      course.popular
                        ? 'bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white shadow-md hover:shadow-orangeGlow'
                        : 'bg-brand-blue-pale text-brand-blue hover:bg-brand-blue hover:text-white'
                    }`}
                  >
                    Book Free Demo
                  </Link>
                  <Link
                    href="/contact?inquiry=fees"
                    className="w-full py-2.5 text-center text-xs font-semibold text-slate-600 hover:text-brand-blue block transition-colors"
                  >
                    Get Current Fee Structure &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <p className="text-slate-600 text-sm mb-3">
              Want to see detailed syllabi for each course?
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 font-heading font-bold text-brand-blue hover:text-brand-orange transition-colors text-base"
            >
              <span>Explore our digital marketing course in Varanasi syllabus</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== COURSE FEE AND DURATION SECTION ===== */}
      <FeeDurationSection />

      {/* ===== MEET YOUR TRAINERS SECTION ===== */}
      <TrainersSection />

      {/* ===== STUDENT OUTCOMES & PROJECT EXAMPLES ===== */}
      <StudentOutcomesSection />

      {/* ===== STUDENT VIDEO REVIEWS & CAMPUS GALLERY ===== */}
      <VideoTestimonials />

      {/* ===== GOOGLE VERIFIED REVIEWS ===== */}
      <section className="bg-slate-50 py-20 border-y border-slate-200/60" id="google-reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-700">
              <span className="text-amber-500">★★★★★</span>
              <span>{siteConfig.gbpRating} / 5 Rating on Google Business Profile</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
              What Students Say About Our <span className="text-brand-blue">Varanasi Training</span>
            </h2>
            <p className="text-slate-600 text-base">
              Feedback from students who attended classroom training at our Paharia, Varanasi campus.
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
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-blue to-brand-blue-light text-white flex items-center justify-center font-bold text-sm">
                      {rev.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{rev.name}</h4>
                      <p className="text-slate-400 text-xs">{rev.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <a
              href={siteConfig.gbpReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-brand-orange transition-colors"
            >
              <span>View Digi Vidyarthi reviews on Google Business Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== FAQS SECTION ===== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="faqs">
        <div className="text-center space-y-3 mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange-pale px-3.5 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            Frequently Asked <span className="text-brand-blue">Questions</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Everything you need to know about our fees, durations, beginner suitability, trainers, and demo class booking.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
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

      {/* ===== CAMPUS LOCATION & EMBEDDED MAP SECTION ===== */}
      <CampusContactSection />

      {/* ===== FINAL CALL TO ACTION ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl bg-gradient-to-r from-brand-blue to-[#0B2E7D] text-white p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl space-y-6">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold max-w-2xl mx-auto text-white">
            Ready to Start Your Digital Marketing Career in Varanasi?
          </h2>
          <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Visit our campus in Paharia or reserve your seat for an upcoming free interactive demo class. Experience practical learning with live projects firsthand.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-sm shadow-orangeGlow hover:scale-105 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Free Demo Class</span>
            </Link>
            <Link
              href="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-brand-blue border border-white/30 font-heading font-bold text-sm transition-all"
            >
              <span>View our digital marketing programmes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
