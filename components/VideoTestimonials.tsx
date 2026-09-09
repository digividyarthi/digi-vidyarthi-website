'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Star, Sparkles, X, ChevronRight, CheckCircle2, Video, Award } from 'lucide-react';
import { studentVideos, campusGallery } from '@/data/siteData';

export default function VideoTestimonials() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <section className="space-y-20 py-6" id="student-success">
      {/* ===== SECTION 1: VIDEO TESTIMONIALS ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange-pale px-3.5 py-1 rounded-full">
            <Video className="w-3.5 h-3.5" />
            Verified Student Reviews
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            Real Stories, Real Placements — <span className="text-brand-blue">Watch Video Reviews</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Listen directly to students from Varanasi who transformed their skills, started agency careers, or grew their businesses with Digi Vidyarthi.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {studentVideos.map((video) => {
            const isPlaying = activeVideoId === video.id;
            return (
              <div
                key={video.id}
                className="flex flex-col justify-between rounded-3xl bg-white border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-blue/40 transition-all group"
              >
                {/* Video / Thumbnail Container */}
                <div className="relative aspect-[9/14] w-full bg-slate-900 overflow-hidden">
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
                        src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.alt}
                        fill
                        className="object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-bold text-[10px] border border-white/10">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          5.0 Review
                        </span>
                        <span className="w-7 h-7 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-md">
                          <Award className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      {/* Animated Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative flex items-center justify-center">
                          <div className="absolute w-14 h-14 rounded-full bg-brand-orange/40 animate-ping" />
                          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-orange to-[#FF8A3D] text-white flex items-center justify-center shadow-xl group-hover/thumb:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Info over Thumbnail */}
                      <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                        <p className="text-xs font-semibold text-brand-orange-light flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-brand-orange-light" />
                          {video.tagline}
                        </p>
                        <h3 className="font-heading font-bold text-base text-white leading-snug">
                          {video.name}
                        </h3>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Text Footer */}
                <div className="p-4 bg-white space-y-2 border-t border-slate-100 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-slate-800 font-bold text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                      <span>{video.role}</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-1.5 leading-relaxed line-clamp-3">
                      &ldquo;{video.review}&rdquo;
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveVideoId(video.id)}
                    className="w-full mt-2 py-2 rounded-xl bg-slate-50 hover:bg-brand-blue-pale text-slate-700 hover:text-brand-blue font-heading font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>{isPlaying ? 'Replay Video' : 'Watch Story'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== SECTION 2: CLASSROOM & PRACTICAL TRAINING GALLERY ===== */}
      <div className="bg-slate-50 py-16 border-y border-slate-200/60">
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
              Explore our modern Varanasi learning environment — live campaign war-rooms, 1-on-1 mentor desks, and interactive workshops.
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
    </section>
  );
}
