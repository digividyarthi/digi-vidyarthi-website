'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import {
  Play,
  Star,
  Sparkles,
  X,
  ChevronRight,
  CheckCircle2,
  Video,
  Award,
  Maximize2,
  ShieldCheck,
} from 'lucide-react';
import { studentVideos, campusGallery, certificationsGallery } from '@/data/siteData';

export default function VideoTestimonials() {
  const [mounted, setMounted] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<{
    src: string;
    alt: string;
    title: string;
    issuer: string;
    description: string;
    tag?: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="space-y-24 py-6" id="student-success">
      {/* ===== SECTION 1: VIDEO TESTIMONIALS 5-COLUMN COMPACT GRID ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-orange-pale text-brand-orange text-xs font-bold uppercase tracking-wider">
            <Video className="w-3.5 h-3.5" />
            <span>Verified Student Reviews</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Real Stories, Real Placements &mdash; <span className="text-brand-blue">Watch Video Reviews</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Listen directly to students from Varanasi who transformed their skills, started agency careers, or grew their local businesses with Digi Vidyarthi.
          </p>
        </div>

        {/* 5-Column Compact Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {studentVideos.map((video) => {
            const isPlaying = activeVideoId === video.id;
            return (
              <div
                key={video.id}
                className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-blue/50 transition-all duration-300 group"
              >
                {/* Video / Thumbnail Container */}
                <div className="relative aspect-[9/13] w-full bg-slate-900 overflow-hidden">
                  {isPlaying ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                      title={video.alt}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <div
                      onClick={() => setActiveVideoId(video.id)}
                      className="w-full h-full cursor-pointer relative group/thumb"
                      role="button"
                      tabIndex={0}
                      aria-label={`Play video review of ${video.name}`}
                    >
                      <Image
                        src={video.thumbnail || `/images/video-${video.id}.webp`}
                        alt={video.alt}
                        fill
                        loading="lazy"
                        className="object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                      />
                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-white font-bold text-[10px] border border-white/15">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span>5.0 Review</span>
                        </span>
                        <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-md">
                          <Award className="w-3 h-3" />
                        </span>
                      </div>

                      {/* Animated Center Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative flex items-center justify-center">
                          <div className="absolute w-12 h-12 rounded-full bg-brand-orange/40 animate-ping" />
                          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-brand-orange to-[#FF8A3D] text-white flex items-center justify-center shadow-lg group-hover/thumb:scale-110 transition-transform">
                            <Play className="w-4 h-4 fill-white ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Info over Thumbnail */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white pointer-events-none space-y-0.5">
                        <p className="text-[11px] font-semibold text-brand-orange-light flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-brand-orange-light" />
                          <span className="truncate">{video.tagline}</span>
                        </p>
                        <h3 className="font-heading font-bold text-sm text-white leading-tight">
                          {video.name}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Text Content */}
                <div className="p-3.5 bg-white space-y-2 border-t border-slate-100 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-slate-900 font-bold text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{video.role}</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                      &ldquo;{video.review}&rdquo;
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveVideoId(video.id)}
                    className="w-full mt-1 py-1.5 rounded-lg bg-slate-50 hover:bg-brand-blue-pale text-slate-700 hover:text-brand-blue font-heading font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>{isPlaying ? 'Replay Video' : 'Watch Story'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== SECTION 2: CLASSROOM & PRACTICAL TRAINING GALLERY ===== */}
      <div className="bg-slate-50 py-16 border-y border-slate-200/60" id="campus-gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-pale px-3.5 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Life at Digi Vidyarthi
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
              Campus &amp; Practical Training <span className="text-brand-orange">Gallery</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Explore our modern Varanasi learning environment &mdash; live campaign war-rooms, 1-on-1 mentor desks, and interactive smart classroom setups in Paharia.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campusGallery.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-sm hover:shadow-card transition-all"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                  {/* Caption Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-orange text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      Varanasi Campus
                    </span>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/85 text-xs line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== SECTION 3: CERTIFICATION GALLERY (EXACTLY BELOW CLASSROOM GALLERY) ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12" id="certifications-gallery">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange-pale px-3.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Student Achievements
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Internship &amp; Course <span className="text-brand-blue">Certificates</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Congratulations to our student interns! Real credentials awarded upon mastering live SEO campaigns, client advertising funnels, and industry projects at Digi Vidyarthi Varanasi.
          </p>
        </div>

        {/* 5 Certification Image Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificationsGallery.map((cert) => (
            <div
              key={cert.title}
              onClick={() => setSelectedCert(cert)}
              className="group rounded-3xl bg-white border-2 border-slate-200 hover:border-brand-blue shadow-sm hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  fill
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Hover Preview Overlay */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-4 py-2 rounded-full bg-white text-slate-900 font-heading font-bold text-xs shadow-xl flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Click to View Certificate</span>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-brand-blue text-white text-[11px] font-extrabold shadow-md">
                    {cert.tag}
                  </span>
                </div>
              </div>

              {/* Text Information */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between bg-white">
                <div className="space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                    {cert.issuer}
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-slate-900 leading-snug group-hover:text-brand-blue transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-brand-blue font-bold">
                  <span>Verified Credential</span>
                  <span className="inline-flex items-center gap-1 text-brand-orange group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate Modal Lightbox */}
        {selectedCert && mounted && createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
            role="dialog"
            aria-modal="true"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 p-6 sm:p-8 space-y-4 my-auto max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 shrink-0">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                    {selectedCert.issuer}
                  </span>
                  <h3 className="font-heading font-extrabold text-xl text-slate-900">
                    {selectedCert.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex-1 min-h-[300px]">
                <Image
                  src={selectedCert.src}
                  alt={selectedCert.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed shrink-0">
                {selectedCert.description}
              </p>

              <div className="pt-2 flex justify-end shrink-0">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-6 py-2.5 rounded-full bg-brand-blue text-white font-heading font-bold text-xs hover:bg-brand-blue-dark transition-colors"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
}
