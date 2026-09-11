import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/siteData';

export default function CampusContactSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="campus-location">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange bg-brand-orange-pale px-3.5 py-1 rounded-full">
          <MapPin className="w-3.5 h-3.5" />
          Visit Our Campus
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
          Campus Location &amp; <span className="text-brand-blue">Contact</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Conveniently located in Paharia, Varanasi. Drop in for counseling, check out our smart classroom setup, or attend a free demo class.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Address & Contact Card */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-brand-blue-pale px-3 py-1 rounded-full inline-block">
                Paharia, Varanasi Center
              </span>
              <h3 className="font-heading font-bold text-xl text-slate-900">
                Digi Vidyarthi Classroom &amp; Office
              </h3>
            </div>

            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block text-xs uppercase tracking-wider mb-0.5">
                    Official Address
                  </span>
                  <p className="text-slate-700 leading-relaxed text-sm">
                    {siteConfig.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block text-xs uppercase tracking-wider mb-0.5">
                    Click-to-Call Phone Helplines
                  </span>
                  <div className="space-y-1">
                    <div>
                      <a
                        href={`tel:${siteConfig.phone1.replace(/[^0-9+]/g, '')}`}
                        className="text-brand-blue font-bold hover:text-brand-orange transition-colors"
                      >
                        {siteConfig.phone1} (Admissions)
                      </a>
                    </div>
                    <div>
                      <a
                        href={`tel:${siteConfig.phone2.replace(/[^0-9+]/g, '')}`}
                        className="text-brand-blue font-bold hover:text-brand-orange transition-colors"
                      >
                        {siteConfig.phone2} (Helpline)
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block text-xs uppercase tracking-wider mb-0.5">
                    Email Inquiries
                  </span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-slate-700 hover:text-brand-blue transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block text-xs uppercase tracking-wider mb-0.5">
                    Operating Hours
                  </span>
                  <p className="text-slate-700">
                    Monday &ndash; Saturday: 9:00 AM &ndash; 7:00 PM (Sunday Closed)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-xs shadow-md hover:shadow-orangeGlow transition-all text-center"
            >
              <span>Book Free Demo Class</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-heading font-semibold text-xs border border-slate-200 transition-all text-center"
            >
              <span>Google Maps &rarr;</span>
            </a>
          </div>
        </div>

        {/* Right Embedded Google Map */}
        <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200 shadow-sm min-h-[380px] bg-slate-100 relative">
          <iframe
            src={siteConfig.googleMapsEmbed}
            title="Digi Vidyarthi Digital Marketing Institute in Varanasi Location Map"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '380px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full min-h-[380px]"
          />
        </div>
      </div>
    </section>
  );
}
