import React from 'react';
import { Mail, Phone, GraduationCap, Gift, Rocket, Instagram, Youtube, Facebook } from 'lucide-react';
import { siteConfig } from '@/data/siteData';

export default function TopBar() {
  return (
    <div className="bg-brand-blue text-white text-xs py-2 overflow-hidden border-b border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left Contact Info (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center gap-6 shrink-0">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-1.5 hover:text-brand-orange-light transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-brand-orange-light" />
            <span>{siteConfig.email}</span>
          </a>
          <a
            href={`tel:${siteConfig.phone2.replace(/[^0-9+]/g, '')}`}
            className="inline-flex items-center gap-1.5 hover:text-brand-orange-light transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-orange-light" />
            <span>{siteConfig.phone2}</span>
          </a>
        </div>

        {/* Center Marquee Announcement */}
        <div className="flex-1 overflow-hidden relative mask-fade">
          <div className="animate-marquee font-medium">
            <span className="inline-flex items-center gap-2 mr-8">
              <GraduationCap className="w-3.5 h-3.5 text-brand-orange-light" />
              Admission Open! Call Helpline: {siteConfig.phone1}
            </span>
            <span className="inline-flex items-center gap-2 mr-8">
              <Gift className="w-3.5 h-3.5 text-brand-orange-light" />
              Grand Opening Special — Exclusive Discounts for First 10 Students!
            </span>
            <span className="inline-flex items-center gap-2 mr-8">
              <Rocket className="w-3.5 h-3.5 text-brand-orange-light" />
              New AI Marketing Batch Starting Soon — Reserve Your Free Demo!
            </span>
            <span className="inline-flex items-center gap-2 mr-8">
              <GraduationCap className="w-3.5 h-3.5 text-brand-orange-light" />
              Admission Open! Call Helpline: {siteConfig.phone1}
            </span>
            <span className="inline-flex items-center gap-2 mr-8">
              <Gift className="w-3.5 h-3.5 text-brand-orange-light" />
              Grand Opening Special — Exclusive Discounts for First 10 Students!
            </span>
          </div>
        </div>

        {/* Right Social Icons */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-all"
          >
            <Instagram className="w-3.5 h-3.5" />
          </a>
          <a
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-all"
          >
            <Youtube className="w-3.5 h-3.5" />
          </a>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-all"
          >
            <Facebook className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
