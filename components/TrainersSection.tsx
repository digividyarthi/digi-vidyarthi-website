import React from 'react';
import Image from 'next/image';
import { UserCheck, Award, Briefcase, Linkedin } from 'lucide-react';
import { trainers } from '@/data/siteData';

export default function TrainersSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="trainers">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-pale px-3.5 py-1 rounded-full">
          <UserCheck className="w-3.5 h-3.5" />
          Verified Industry Mentors
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
          Meet Your <span className="text-brand-orange">Trainers</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Learn directly from experienced practitioners in Varanasi who guide your practical live projects and campaign execution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {trainers.map((trainer) => (
          <div
            key={trainer.name}
            className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-card hover:border-brand-blue/40 transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              {/* Photo Placeholder Container */}
              <div className="relative w-28 h-28 mx-auto sm:mx-0 rounded-2xl overflow-hidden border-2 border-brand-orange/30 shadow-sm bg-slate-900">
                <Image
                  src={trainer.imagePlaceholder}
                  alt={trainer.imageAlt}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange-pale text-brand-orange text-xs font-bold uppercase tracking-wider mb-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>{trainer.experience}</span>
                </div>
                <h3 className="font-heading font-bold text-2xl text-slate-900">
                  {trainer.name}
                </h3>
                <p className="text-brand-blue font-semibold text-sm">
                  {trainer.role}
                </p>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">
                {trainer.bio}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-brand-orange" />
                Varanasi Campus Trainer
              </span>
              {trainer.linkedIn ? (
                <a
                  href={trainer.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brand-blue hover:text-brand-orange font-semibold transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn Profile
                </a>
              ) : (
                <span className="text-slate-400 italic">LinkedIn profile available on request</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
