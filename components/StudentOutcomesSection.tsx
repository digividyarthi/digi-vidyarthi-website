import React from 'react';
import Link from 'next/link';
import { Award, CheckCircle2, FileText, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { studentCaseStudies } from '@/data/siteData';

export default function StudentOutcomesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="student-outcomes">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange-pale px-4 py-1.5 rounded-full">
          <Award className="w-3.5 h-3.5" />
          Practical Student Projects
        </span>
        
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Student Outcomes &amp; <span className="text-brand-blue">Live Project Work</span>
        </h2>
        
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          At Digi Vidyarthi, students build real, verifiable digital marketing assets &mdash; from ranking local Varanasi businesses on Google Maps to launching multi-channel paid campaigns.
        </p>
      </div>

      {/* Cards Grid with Generous Spacing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
        {studentCaseStudies.map((cs) => (
          <div
            key={cs.title}
            className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-8 sm:p-9 flex flex-col justify-between space-y-8 hover:shadow-card hover:border-brand-blue/40 transition-all group"
          >
            {/* Top Content Block */}
            <div className="space-y-5">
              {/* Category & Student Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-pale px-3.5 py-1 rounded-full">
                  {cs.focus}
                </span>
                <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-3 py-1 rounded-full">
                  {cs.student}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 leading-snug group-hover:text-brand-blue transition-colors">
                {cs.title}
              </h3>

              {/* Results Story */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {cs.results}
              </p>
            </div>

            {/* Bottom Deliverables Block with Clean Spacing */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-brand-orange" />
                <span>Project Deliverables:</span>
              </div>

              {/* Deliverable Items with breathing room */}
              <ul className="space-y-2.5">
                {cs.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm font-medium text-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              {/* Action Link */}
              <div className="pt-3">
                <Link
                  href="/contact?inquiry=student-portfolio"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-blue hover:text-brand-orange transition-colors"
                >
                  <span>Request Student Portfolio Samples</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

