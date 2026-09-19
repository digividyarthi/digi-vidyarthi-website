import React from 'react';
import Image from 'next/image';
import { UserCheck, Award, Briefcase, Linkedin, CheckCircle2, Sparkles } from 'lucide-react';
import { trainers } from '@/data/siteData';

export default function TrainersSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="trainers">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-pale px-3.5 py-1 rounded-full">
          <UserCheck className="w-3.5 h-3.5" />
          Verified Industry Mentors
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
          Meet Your <span className="text-brand-orange">Trainers</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Learn directly from experienced practitioners in Varanasi who guide your practical live projects, client audits, and campaign execution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {trainers.map((trainer) => (
          <div
            key={trainer.name}
            className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-card hover:border-brand-blue/40 transition-all flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-5">
              {/* Photo & Identity Row */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                {/* Photo Container */}
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-brand-orange/40 shadow-md bg-slate-100 shrink-0 group-hover:border-brand-orange transition-colors">
                  <Image
                    src={trainer.image || trainer.imagePlaceholder}
                    alt={trainer.imageAlt}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Name, Role & Experience */}
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange-pale text-brand-orange text-xs font-bold uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5" />
                    <span>{trainer.experience}</span>
                  </div>
                  
                  <h3 className="font-heading font-extrabold text-2xl text-slate-900 pt-0.5">
                    {trainer.name}
                  </h3>
                  
                  <p className="text-brand-blue font-semibold text-sm">
                    {trainer.role}
                  </p>

                  <div className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>Active Classroom Mentor</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-slate-600 text-sm leading-relaxed pt-1">
                {trainer.bio}
              </p>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-brand-orange" />
                <span>Paharia Campus, Varanasi</span>
              </span>
              {trainer.linkedIn ? (
                <a
                  href={trainer.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brand-blue hover:text-brand-orange font-semibold transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" /> <span>LinkedIn Profile</span>
                </a>
              ) : (
                <span className="text-slate-400 italic">Verified Mentor</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

