'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, CheckCircle2, PhoneCall, Sparkles, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/data/siteData';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

export default function BrochureModal({
  isOpen,
  onClose,
  defaultCourse = 'AI Powered Digital Marketing Course',
}: BrochureModalProps) {
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState(defaultCourse);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setErrorMessage('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save lead locally
      const existingLeads = JSON.parse(localStorage.getItem('dv_brochure_leads') || '[]');
      const newLead = {
        name: name.trim(),
        phone: cleanPhone,
        email: email.trim(),
        course,
        timestamp: new Date().toISOString(),
      };
      existingLeads.push(newLead);
      localStorage.setItem('dv_brochure_leads', JSON.stringify(existingLeads));
    } catch {
      // Ignore storage errors
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Push custom event to dataLayer for GTM / GA4 / Google Ads conversion tracking
      if (typeof window !== 'undefined') {
        const w = window as any;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: 'lead_form_submit',
          form_id: 'brochure-download-form',
          form_name: 'Brochure Download Form',
          course_selected: course,
        });
        w.dataLayer.push({
          event: 'generate_lead',
          form_id: 'brochure-download-form',
          form_name: 'Brochure Download Form',
          course: course,
        });
      }

      // Auto trigger brochure download
      const link = document.createElement('a');
      link.href = '/brochure.pdf';
      link.download = 'Digi-Vidyarthi-Course-Brochure.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setName('');
    setPhone('');
    setEmail('');
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg my-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Header */}
        <div className="bg-gradient-to-r from-[#0B2E7D] via-brand-blue to-[#1A55D4] text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-orange-light text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant PDF Syllabus Download</span>
          </div>

          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
            Download Course Brochure
          </h3>
          <p className="text-white/80 text-xs sm:text-sm mt-1">
            Get complete curriculum details, batch timings, trainer bios, and current fee structure.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-white">
          {isSuccess ? (
            <div className="text-center space-y-5 py-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1.5">
                <h4 className="font-heading font-extrabold text-2xl !text-slate-900 text-slate-900">
                  Brochure Download Started!
                </h4>
                <p className="!text-slate-700 text-slate-700 text-sm font-medium">
                  Thank you, <span className="font-bold !text-slate-950 text-slate-950">{name}</span>. Your syllabus brochure is downloading automatically.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 !text-slate-800 text-slate-800">
                <div className="flex items-center gap-2 !text-brand-blue text-brand-blue font-bold text-sm">
                  <FileText className="w-4 h-4 text-brand-blue shrink-0" />
                  <span>Manual Download Link:</span>
                </div>
                <p className="!text-slate-600 text-slate-600 text-xs">If your download did not start automatically, please click below:</p>
                <a
                  href="/brochure.pdf"
                  download="Digi-Vidyarthi-Course-Brochure.pdf"
                  className="inline-flex items-center gap-2 font-extrabold !text-brand-blue text-brand-blue hover:!text-brand-orange text-sm underline pt-1"
                >
                  <Download className="w-4 h-4 text-brand-orange" />
                  <span>Click here to download brochure (PDF)</span>
                </a>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20Digi%20Vidyarthi,%20I%20just%20downloaded%20the%20brochure%20and%20want%20to%20know%20about%20the%20upcoming%20batch%20discount.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-colors text-center"
                >
                  <span>Inquire on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={handleReset}
                  className="py-3 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-semibold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form
              id="brochure-download-form"
              name="brochure_download_form"
              onSubmit={handleSubmit}
              className="space-y-3.5"
            >
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold !text-slate-800 text-slate-800 uppercase tracking-wider mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none text-sm !text-slate-900 text-slate-900 bg-white placeholder:text-slate-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold !text-slate-800 text-slate-800 uppercase tracking-wider mb-1">
                  Mobile / WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none text-sm !text-slate-900 text-slate-900 bg-white placeholder:text-slate-400 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold !text-slate-800 text-slate-800 uppercase tracking-wider mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none text-sm !text-slate-900 text-slate-900 bg-white placeholder:text-slate-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold !text-slate-800 text-slate-800 uppercase tracking-wider mb-1">
                  Interested Course
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none text-sm !text-slate-900 text-slate-900 transition-all bg-white"
                >
                  <option value="AI Powered Digital Marketing Course">
                    AI Powered Digital Marketing Course (Comprehensive)
                  </option>
                  <option value="AI Tools Course">
                    AI Tools Specialization Course
                  </option>
                  <option value="Capsule Course in Digital Marketing">
                    Capsule Course in Digital Marketing (Compact)
                  </option>
                </select>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-sm shadow-md hover:shadow-orangeGlow hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Preparing Download...</span>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download Brochure (PDF)</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] !text-slate-600 text-slate-600 pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>We respect your privacy. No spam guarantee.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
