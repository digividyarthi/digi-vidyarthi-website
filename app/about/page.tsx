import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Target, Eye, Sparkles, CheckCircle2, ArrowRight, PhoneCall, Award, Users, BookOpen } from 'lucide-react';
import { siteConfig } from '@/data/siteData';
import TrainersSection from '@/components/TrainersSection';

export const metadata = {
  title: 'About Digi Vidyarthi | Digital Marketing Institute in Varanasi',
  description:
    'Learn about Digi Vidyarthi, the practical digital marketing institute in Varanasi. Discover our verified mentors Aryan Rai & Rishitesh Kumar, smart classroom training, and agency curriculum.',
  alternates: {
    canonical: 'https://digividyarthi.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* PAGE HERO */}
      <section className="bg-gradient-to-br from-[#0B2E7D] via-brand-blue to-[#1A55D4] text-white py-16 lg:py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-brand-orange-light text-xs font-semibold uppercase tracking-wider">
            Our Story &amp; Philosophy
          </span>
          {/* Exactly One H1 */}
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Empowering Varanasi with <span className="text-brand-orange-light">Practical</span> Digital Education
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Digi Vidyarthi was established to bridge the gap between traditional textbook theory and real agency marketing requirements in Varanasi.
          </p>
        </div>
      </section>

      {/* CORE ABOUT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-100">
              <Image
                src="/images/gallery-1.webp"
                alt="Digi Vidyarthi practical digital marketing classroom in Paharia Varanasi"
                width={600}
                height={500}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-pale px-3.5 py-1 rounded-full">
              Who We Are
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              We Don&apos;t Teach Theory. <br />
              <span className="text-brand-blue">We Train Marketers.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Located in Ashok Vihar Colony Phase-I, Paharia, Varanasi, Digi Vidyarthi is dedicated to practical, hands-on digital skills training. We recognized that students graduating from colleges often lacked the practical execution experience needed to manage real Google Ads campaigns, run technical SEO audits, or build conversion-focused websites.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our training methodology gives every learner hands-on exposure to live campaign assignments, real ad workflows, and modern AI automation tools so that they are prepared to handle real-world challenges with confidence.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-semibold">Practical Training Focus</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-semibold">Experienced Mentors</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-semibold">Small Batch Sizes</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 font-semibold">Placement Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEET YOUR TRAINERS */}
      <TrainersSection />

      {/* MISSION & VISION */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue-pale text-brand-blue flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                To provide high-quality, practical digital marketing and AI education in Varanasi, helping students, working professionals, and local entrepreneurs build marketable skills for long-term career and business growth.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange-pale text-brand-orange flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                To be Varanasi&apos;s most reliable practical learning institute, known for transparent fees, genuine student outcomes, and curriculum that adapts rapidly to modern industry tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CAMPUS PHOTO GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-extrabold text-slate-900">
            Life at <span className="text-brand-blue">Digi Vidyarthi</span>
          </h2>
          <p className="text-slate-600 text-sm">
            Interactive sessions, campaign analysis labs, and mentorship at our Varanasi center in Paharia.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { src: 'gallery-1.webp', alt: 'Digi Vidyarthi interactive smart classroom training in Varanasi' },
            { src: 'gallery-2.webp', alt: 'Students analyzing SEO and Google Ads campaigns in Varanasi lab' },
            { src: 'gallery-3.webp', alt: 'Trainer providing 1-on-1 digital marketing guidance to a student' },
            { src: 'gallery-4.webp', alt: 'Hands-on AI marketing tools workshop at Digi Vidyarthi Varanasi campus' },
            { src: 'gallery-5.webp', alt: 'Small batch digital marketing learning session in Paharia Varanasi' },
            { src: 'gallery-6.webp', alt: 'Student digital marketing project presentation at Digi Vidyarthi' },
          ].map((item, i) => (
            <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 group">
              <Image
                src={`/images/${item.src}`}
                alt={item.alt}
                width={400}
                height={300}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-brand-blue to-[#0B2E7D] text-white p-8 sm:p-12 text-center space-y-4 shadow-xl">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            Want to Experience Our Teaching Style?
          </h2>
          <p className="text-white/90 text-sm sm:text-base max-w-lg mx-auto">
            Book a free, interactive demo class at our Varanasi campus in Paharia.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-sm shadow-md hover:scale-105 transition-all"
            >
              <span>View our digital marketing programmes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-brand-blue border border-white/30 font-heading font-bold text-sm transition-all"
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
