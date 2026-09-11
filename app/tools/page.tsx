import React from 'react';
import Link from 'next/link';
import { Bot, Wand2, Image as ImageIcon, Sparkles, BarChart3, Zap, Search, ArrowRight, PhoneCall, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'AI Digital Marketing Tools & Workflows | Digi Vidyarthi Varanasi',
  description:
    'Master essential AI tools including ChatGPT, Claude, Midjourney, Canva AI, and SEMrush with hands-on practical training at Digi Vidyarthi in Varanasi.',
  alternates: {
    canonical: 'https://digividyarthi.com/tools',
  },
};

const aiToolsList = [
  {
    name: 'ChatGPT & Claude',
    category: 'Content & Copywriting',
    desc: 'Advanced prompt engineering for SEO articles, persuasive ad copy, video scripts, and marketing funnels.',
    icon: Bot,
    badge: 'Core Skill',
  },
  {
    name: 'Canva AI & Magic Studio',
    category: 'Visual Design',
    desc: 'Text-to-image generation, automated background removal, brand kits, and multi-format social resizing.',
    icon: Wand2,
    badge: 'Design',
  },
  {
    name: 'Midjourney & DALL-E 3',
    category: 'Visual Design',
    desc: 'Create photorealistic ad creatives, product mockups, and eye-catching concept visuals with precision prompts.',
    icon: ImageIcon,
    badge: 'Creative',
  },
  {
    name: 'SEMrush & Ahrefs',
    category: 'SEO & Research',
    desc: 'AI-driven keyword discovery, competitor backlink audits, ranking trackers, and technical site health checks.',
    icon: Search,
    badge: 'High Demand',
  },
  {
    name: 'Google Analytics 4 & Looker',
    category: 'Analytics & Tracking',
    desc: 'Predictive customer insights, conversion attribution modeling, UTM tagging, and executive dashboards.',
    icon: BarChart3,
    badge: 'Data',
  },
  {
    name: 'Zapier & Make.com',
    category: 'Automation',
    desc: 'Connect Meta lead forms directly to WhatsApp, Google Sheets, and email CRMs with zero coding.',
    icon: Zap,
    badge: 'Efficiency',
  },
  {
    name: 'Synthesia & HeyGen',
    category: 'AI Video',
    desc: 'Generate human-like AI presenter videos and UGC video ads in 40+ languages without video equipment.',
    icon: Sparkles,
    badge: 'Video',
  },
  {
    name: 'Grammarly & QuillBot',
    category: 'Content & Copywriting',
    desc: 'Refine brand tone, improve readability, and eliminate grammatical errors in high-ticket client communications.',
    icon: CheckCircle2,
    badge: 'Copy',
  },
];

export default function ToolsPage() {
  return (
    <div className="space-y-20 pb-16">
      {/* PAGE HERO */}
      <section className="bg-gradient-to-br from-[#0B2E7D] via-brand-blue to-[#1A55D4] text-white py-16 lg:py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-brand-orange-light text-xs font-semibold uppercase tracking-wider">
            Hands-on Tool Training
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            AI <span className="text-brand-orange-light">Tools</span> for Digital Marketing
          </h1>
          <p className="text-white text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Don&apos;t compete with artificial intelligence — lead it. Master the exact AI toolkit that gives modern marketers 10x speed and client results.
          </p>
        </div>
      </section>

      {/* TOOLS DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            Industry AI Tools <span className="text-brand-blue">Covered in Our Courses</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Every student gets hands-on practice, verified workflows, and ready-to-use prompt libraries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiToolsList.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.name}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-brand-blue/40 hover:shadow-card transition-all space-y-3 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-brand-blue-pale text-brand-blue flex items-center justify-center group-hover:bg-brand-orange-pale group-hover:text-brand-orange transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange bg-brand-orange-pale px-2.5 py-0.5 rounded-full">
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-brand-blue transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{tool.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>{tool.category}</span>
                  <span className="text-brand-blue font-semibold">Included</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-brand-blue to-[#0B2E7D] text-white p-8 sm:p-12 text-center space-y-4 shadow-xl">
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            Learn These AI Workflows with Real Live Projects
          </h2>
          <p className="text-white text-sm sm:text-base max-w-lg mx-auto">
            Experience our interactive, tool-integrated practical training at Digi Vidyarthi Varanasi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-brand-orange to-[#FF7A00] text-white font-heading font-bold text-sm shadow-md"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-brand-blue border border-white/30 font-heading font-bold text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book Free Demo</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
