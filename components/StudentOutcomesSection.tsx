import React from 'react';
import Link from 'next/link';
import { Award, CheckCircle2, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { studentCaseStudies } from '@/data/siteData';

export default function StudentOutcomesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="student-outcomes">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange-pale px-3.5 py-1 rounded-full">
          <Award className="w-3.5 h-3.5" />
          Practical Student Projects
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
          Student Outcomes &amp; <span className="text-brand-blue">Live Project Work</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          At Digi Vidyarthi, students build real, verifiable digital marketing assets &mdash; from ranking local businesses to launching multi-channel campaigns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {studentCaseStudies.map((cs) => (
          <div
            key={cs.title}
            className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:shadow-card hover:border-brand-blue/30 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-pale px-3 py-1 rounded-full">
                  {cs.focus}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {cs.student}
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-slate-900 leading-snug">
                {cs.title}
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {cs.results}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-700">Project Deliverables:</div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {cs.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <Link
                  href="/contact?inquiry=student-portfolio"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-brand-orange transition-colors"
                >
                  <span>Request Student Portfolio Samples</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
