'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Search, FolderOpen, Clock, Tag, BookOpen } from 'lucide-react';
import { allBlogs, BlogPost } from '@/data/blogs';

const categories = [
  { key: 'all', label: 'All Posts' },
  { key: 'tips', label: 'Tips & Tricks' },
  { key: 'seo', label: 'SEO' },
  { key: 'social-media', label: 'Social Media' },
  { key: 'google-ads', label: 'Google Ads' },
  { key: 'ai-tools', label: 'AI Tools' },
];

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = useMemo(() => {
    return allBlogs.filter((post) => {
      const matchCat =
        selectedCategory === 'all' || post.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const recentPosts = allBlogs.slice(0, 5);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allBlogs.length };
    allBlogs.forEach((b) => {
      counts[b.category] = (counts[b.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* PAGE HERO */}
      <section className="bg-gradient-to-br from-[#0B2E7D] via-brand-blue to-[#1A55D4] text-white py-16 lg:py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-brand-orange-light text-xs font-semibold uppercase tracking-wider">
            Knowledge Hub
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Digital Marketing &amp; AI <span className="text-brand-orange-light">Blog</span>
          </h1>
          <p className="text-white text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Actionable SEO guides, AI marketing tactics, social media growth playbooks, and career strategies from industry mentors.
          </p>
        </div>
      </section>

      {/* MAIN BLOG SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Posts Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-full font-heading text-xs sm:text-sm font-semibold transition-all ${
                    selectedCategory === cat.key
                      ? 'bg-brand-blue text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label} ({categoryCounts[cat.key] || 0})
                </button>
              ))}
            </div>

            {/* Posts Grid */}
            {filteredBlogs.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">No posts found</h3>
                <p className="text-sm text-slate-500">Try changing your search query or category filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredBlogs.map((post) => (
                  <article
                    key={post.slug}
                    className="flex flex-col rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-card hover:-translate-y-1 transition-all group"
                  >
                    {/* Thumbnail Image */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative block aspect-[5/3] w-full bg-slate-100 overflow-hidden"
                    >
                      <Image
                        src={post.image.startsWith('/') ? post.image : `/${post.image}`}
                        alt={post.alt || post.title}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-brand-orange text-white font-heading font-bold text-xs shadow-md">
                        {post.categoryLabel || post.category}
                      </span>
                    </Link>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2.5">
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                            {post.dateFormatted || post.date}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-brand-orange" />
                            {post.author || 'Digi Vidyarthi'}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-heading font-bold text-lg text-slate-900 line-clamp-2 group-hover:text-brand-blue transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>

                        {/* Excerpt */}
                        <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Read More link */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-brand-blue font-heading font-bold text-xs sm:text-sm group-hover:text-brand-orange transition-colors"
                        >
                          <span>Read Full Article</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Search Box */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-brand-orange" />
                Search Articles
              </h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by topic, SEO, ads..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition-all"
                />
              </div>
            </div>

            {/* Categories Widget */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                <FolderOpen className="w-4 h-4 text-brand-orange" />
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.key}>
                    <button
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`w-full flex items-center justify-between text-xs sm:text-sm py-1.5 px-2 rounded-lg transition-colors ${
                        selectedCategory === cat.key
                          ? 'bg-brand-blue-pale text-brand-blue font-bold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-brand-blue'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {categoryCounts[cat.key] || 0}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts Widget */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                <Clock className="w-4 h-4 text-brand-orange" />
                Recent Posts
              </h3>
              <div className="space-y-3">
                {recentPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="flex items-center gap-3 group py-1"
                  >
                    <div className="relative w-16 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                      <Image
                        src={rp.image.startsWith('/') ? rp.image : `/${rp.image}`}
                        alt={rp.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-semibold text-slate-800 line-clamp-2 group-hover:text-brand-blue transition-colors">
                        {rp.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{rp.dateFormatted || rp.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
