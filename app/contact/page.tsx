'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, Clock } from 'lucide-react';
import { siteConfig } from '@/data/siteData';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* PAGE HERO */}
      <section className="bg-gradient-to-br from-[#0B2E7D] via-brand-blue to-[#1A55D4] text-white py-16 lg:py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-brand-orange-light text-xs font-semibold uppercase tracking-wider">
            Get in Touch
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
            Book Your Free <span className="text-brand-orange-light">Demo Class</span>
          </h1>
          <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about our syllabus, fees, or upcoming batches? Visit our Varanasi center, call our counselors, or fill out the form below.
          </p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-blue-pale text-brand-blue flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">Campus Address</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {siteConfig.address}
              </p>
              <a
                href={siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xs font-semibold text-brand-blue hover:text-brand-orange pt-1"
              >
                View on Google Maps &rarr;
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-orange-pale text-brand-orange flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">Phone Helplines</h3>
              <p className="text-xs sm:text-sm text-slate-600">Call us Monday to Saturday (9 AM – 7 PM):</p>
              <div className="space-y-1 pt-1 text-sm font-semibold text-slate-800">
                <div>
                  <a href={`tel:${siteConfig.phone1.replace(/[^0-9+]/g, '')}`} className="hover:text-brand-blue">
                    {siteConfig.phone1} (Admissions)
                  </a>
                </div>
                <div>
                  <a href={`tel:${siteConfig.phone2.replace(/[^0-9+]/g, '')}`} className="hover:text-brand-blue">
                    {siteConfig.phone2} (Helpline)
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-blue-pale text-brand-blue flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-base text-slate-900">Email Inquiries</h3>
              <p className="text-xs sm:text-sm text-slate-600">Send your queries anytime:</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-block text-sm font-semibold text-brand-blue hover:text-brand-orange"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          {/* Right Lead Capture Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-card p-8 sm:p-10">
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">
              Reserve Your Seat in Next Batch
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Fill in your details to book a free interactive demo class or receive complete course syllabus PDF.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                <h3 className="font-heading font-bold text-lg text-green-900">
                  Thank you! Your demo request has been received.
                </h3>
                <p className="text-sm text-green-700 max-w-md mx-auto">
                  Our admissions counselor will call you shortly at your registered number with batch timings and demo details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Program of Interest
                    </label>
                    <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 bg-white">
                      <option value="foundation">Foundation in Digital Marketing</option>
                      <option value="advanced">Advanced Digital Marketing &amp; AI</option>
                      <option value="mastery">Digital Marketing Mastery Track</option>
                      <option value="seo">Specialized SEO Training</option>
                      <option value="ads">Performance &amp; Meta Ads</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message or Questions (Optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your background, career goal, or batch timing preference..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-sm shadow-orangeGlow hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting...' : 'Confirm Demo Reservation'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* EMBEDDED GOOGLE MAP */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3605.5186000000003!2d83.0023295!3d25.3544304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2f0a8f8c5805%3A0xac07bd1a5e012ee7!2sDigi%20Vidyarthi%20%7C%20Digital%20marketing%20institute%20in%20varanasi!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Digi Vidyarthi Location on Google Maps"
          />
        </div>
      </div>
    </div>
  );
}
