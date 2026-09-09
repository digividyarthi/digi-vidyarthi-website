import React from 'react';
import Link from 'next/link';
import { ArrowRight, Youtube, Facebook, Instagram } from 'lucide-react';
import { siteConfig } from '@/data/siteData';

export default function SocialSidebar() {
  return (
    <div className="hidden lg:flex fixed top-1/2 right-0 -translate-y-1/2 z-40 flex-col shadow-xl rounded-l-xl overflow-hidden">
      {/* Contact CTA */}
      <Link
        href="/contact"
        className="w-11 h-36 bg-brand-orange text-white flex flex-col items-center justify-center gap-2 hover:bg-brand-orange-dark transition-all group"
      >
        <ArrowRight className="w-4 h-4 -rotate-90 group-hover:-translate-y-1 transition-transform" />
        <span className="[writing-mode:vertical-rl] font-heading font-bold text-xs uppercase tracking-wider">
          Contact Us
        </span>
      </Link>

      {/* Social Links */}
      <a
        href={siteConfig.social.youtube}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
        className="w-11 h-11 bg-[#FF0000] text-white flex items-center justify-center hover:brightness-110 transition-all"
      >
        <Youtube className="w-5 h-5" />
      </a>
      <a
        href={siteConfig.social.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="w-11 h-11 bg-[#1877F2] text-white flex items-center justify-center hover:brightness-110 transition-all"
      >
        <Facebook className="w-5 h-5" />
      </a>
      <a
        href={siteConfig.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="w-11 h-11 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center hover:brightness-110 transition-all"
      >
        <Instagram className="w-5 h-5" />
      </a>
    </div>
  );
}
