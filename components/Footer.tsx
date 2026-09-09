import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Instagram, Youtube, Facebook, Linkedin, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/siteData';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <Image
                src={siteConfig.logo}
                alt="Digi Vidyarthi"
                width={96}
                height={108}
                className="h-12 w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]"
              />
              <span className="font-heading font-extrabold text-2xl tracking-tight leading-none flex items-center">
                <span className="text-white">Digi</span>
                <span className="text-brand-orange ml-1.5">Vidyarthi</span>
              </span>
            </Link>
            <p className="text-slate-200 text-sm leading-relaxed max-w-sm">
              Varanasi's leading AI-powered digital marketing institute. Empowering students, professionals, and entrepreneurs with 100% practical, project-based digital marketing training.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white hover:bg-brand-blue transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white hover:bg-[#E1306C] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white hover:bg-[#FF0000] transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white hover:bg-[#0A66C2] transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Course Programs */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-brand-orange">
              Programs
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/courses" className="hover:text-brand-orange-light transition-colors">
                  Foundation in Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-brand-orange-light transition-colors">
                  Advanced Digital Marketing & AI
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-brand-orange-light transition-colors">
                  Digital Marketing Mastery Track
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-brand-orange-light transition-colors">
                  Performance & Meta Ads
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-brand-orange-light transition-colors">
                  Technical & Local SEO
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-brand-orange">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-brand-orange-light transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-orange-light transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-brand-orange-light transition-colors">
                  Explore Programs
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-brand-orange-light transition-colors">
                  AI Marketing Tools
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-orange-light transition-colors">
                  Digital Marketing Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-orange-light transition-colors">
                  Book Free Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div>
            <h4 className="font-heading font-bold text-white text-base mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-8 after:h-0.5 after:bg-brand-orange">
              Campus Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-1" />
                <span className="text-slate-200 leading-relaxed text-xs">
                  {siteConfig.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <a href={`tel:${siteConfig.phone1.replace(/[^0-9+]/g, '')}`} className="text-slate-200 hover:text-white transition-colors">
                  {siteConfig.phone1}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <a href={`tel:${siteConfig.phone2.replace(/[^0-9+]/g, '')}`} className="text-slate-200 hover:text-white transition-colors">
                  {siteConfig.phone2}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="text-slate-200 hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & SEO footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300 border-t border-slate-800/80">
          <p>
            &copy; {new Date().getFullYear()} Digi Vidyarthi. All rights reserved. |{' '}
            <Link href="/llms.txt" className="underline text-slate-300 hover:text-white">
              AI-Readable Info (llms.txt)
            </Link>
          </p>
          <p className="text-slate-200 font-medium">
            Best Digital Marketing Institute in Varanasi, UP
          </p>
        </div>
      </div>
    </footer>
  );
}
