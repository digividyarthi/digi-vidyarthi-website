import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Calendar, User, ArrowLeft, Tag, Share2, MessageSquare, BookOpen, Clock } from 'lucide-react';
import { allBlogs, getBlogBySlug, getAllBlogSlugs, getRelatedBlogs } from '@/data/blogs';
import { siteConfig } from '@/data/siteData';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found | Digi Vidyarthi' };
  }

  const postUrl = `${siteConfig.url}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith('http')
    ? post.image
    : `${siteConfig.url}${post.image.startsWith('/') ? post.image : `/${post.image}`}`;

  return {
    title: `${post.title} | Digi Vidyarthi Blog`,
    description: post.excerpt || post.title,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: 'article',
      url: postUrl,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author || 'Digi Vidyarthi'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.alt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedBlogs(post.slug, 2);

  // Format content, extract H2s and H3s for Table of Contents, and inject anchor IDs
  function processBlogContent(rawContent: string) {
    let content = rawContent || '';

    // 1. If plain text without any HTML tags was saved, convert to paragraphs
    if (!/<[a-z][\s\S]*>/i.test(content)) {
      content = content
        .split(/\r?\n\r?\n/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => `<p>${p.replace(/\r?\n/g, '<br/>')}</p>`)
        .join('');
    }

    // 2. Normalize standalone <p><strong>Heading</strong></p> into <h2> or <h3>
    content = content.replace(
      /<p(?:\s+[^>]*)?>\s*<(?:strong|b)>\s*([^<]{3,120}?)\s*<\/(?:strong|b)>\s*<\/p>/gi,
      (match, text) => {
        const t = text.trim();
        if (/^about the author/i.test(t) || /^contact digi vidyarthi/i.test(t) || /^source:/i.test(t) || /^note:/i.test(t)) {
          return `<p class="author-note"><strong>${t}</strong></p>`;
        }
        if (/^\d+\.\s+/i.test(t)) {
          return `<h2>${t}</h2>`;
        }
        if (/\?$/.test(t)) {
          return `<h3>${t}</h3>`;
        }
        if (t.length <= 75 && !/[.:;,!]$/.test(t)) {
          return `<h2>${t}</h2>`;
        }
        return `<h3>${t}</h3>`;
      }
    );

    // 3. Remove duplicate table of contents text inside content
    content = content.replace(/<p>\s*<(?:strong|b)>\s*Table of Contents\s*<\/(?:strong|b)>\s*<\/p>/gi, '');

    // 4. Ensure tables are responsive
    content = content.replace(/<table(?!\s+class)/gi, '<table class="blog-table"');
    if (!content.includes('table-responsive') && content.includes('<table')) {
      content = content.replace(/(<table[\s\S]*?<\/table>)/gi, '<div class="table-responsive my-6">$1</div>');
    }

    // 5. Extract headings and inject anchor IDs
    let headIndex = 0;
    const headingsList: Array<{ level: string; text: string; anchorId: string }> = [];

    content = content.replace(
      /<h([23])([^>]*)>(.*?)<\/h\1>/gi,
      (match, level, attrs, innerText) => {
        const text = innerText.replace(/<\/?[^>]+(>|$)/g, '').trim();
        const anchorId = `section-${headIndex++}`;
        headingsList.push({ level, text, anchorId });

        const cleanAttrs = attrs.replace(/\s*id=["'][^"']*["']/gi, '').trim();
        return `<h${level} id="${anchorId}" ${cleanAttrs}>${innerText}</h${level}>`;
      }
    );

    return { processedContent: content, headings: headingsList };
  }

  const { processedContent, headings } = processBlogContent(post.content);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image.startsWith('http')
      ? post.image
      : `${siteConfig.url}${post.image.startsWith('/') ? post.image : `/${post.image}`}`,
    author: {
      '@type': 'Organization',
      name: post.author || 'Digi Vidyarthi',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Digi Vidyarthi',
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.webp`,
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.slug}`,
    },
  };

  return (
    <div className="space-y-12 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* BREADCRUMB & BACK LINK */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs sm:text-sm text-slate-500">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-blue hover:text-brand-orange transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <Link href="/" className="hover:text-slate-800">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-slate-800">Blog</Link>
            <span>/</span>
            <span className="text-slate-700 font-medium truncate max-w-xs">{post.categoryLabel || post.category}</span>
          </div>
        </div>
      </div>

      {/* ARTICLE WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sticky Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
            {headings.length > 0 && (
              <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-brand-blue flex items-center gap-2 pb-2 border-b border-slate-200">
                  <BookOpen className="w-4 h-4 text-brand-orange" />
                  Table of Contents
                </h3>
                <nav className="space-y-1.5 text-xs">
                  {headings.map((h) => (
                    <a
                      key={h.anchorId}
                      href={`#${h.anchorId}`}
                      className={`block py-1 hover:text-brand-orange transition-colors ${
                        h.level === '3'
                          ? 'pl-4 text-slate-500 hover:text-brand-orange'
                          : 'text-slate-700 font-semibold'
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Quick Demo CTA Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white space-y-3 shadow-lg">
              <h4 className="font-heading font-bold text-base text-white">Want to Learn This Practically?</h4>
              <p className="text-white text-xs leading-relaxed">
                Join our next digital marketing batch in Varanasi with live ad campaigns and 1-on-1 mentorship.
              </p>
              <Link
                href="/contact"
                className="inline-block w-full py-2.5 rounded-full bg-brand-orange text-white text-center font-heading font-bold text-xs shadow-md hover:bg-brand-orange-dark transition-all"
              >
                Book Free Demo
              </Link>
            </div>
          </aside>

          {/* Main Article Content */}
          <article className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10 space-y-8">
            {/* Header Area */}
            <div className="space-y-4 border-b border-slate-100 pb-6">
              <span className="px-3.5 py-1 rounded-full bg-brand-orange-pale text-brand-orange font-heading font-bold text-xs uppercase tracking-wider">
                {post.categoryLabel || post.category}
              </span>

              <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                  Last Updated: {post.dateFormatted || post.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand-orange" />
                  {post.author || 'Digi Vidyarthi'}
                </span>
              </div>
            </div>

            {/* Featured Hero Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-md">
              <Image
                src={post.image.startsWith('/') ? post.image : `/${post.image}`}
                alt={post.alt || post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Article Body HTML */}
            <div
              className="blog-content max-w-none"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-brand-orange" />
                  Related Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium hover:bg-brand-blue-pale hover:text-brand-blue transition-colors cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts */}
            {related.length > 0 && (
              <div className="pt-8 border-t border-slate-100 space-y-4">
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  Recommended Reading
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {related.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/blog/${rel.slug}`}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-brand-blue/30 hover:shadow-sm transition-all flex flex-col justify-between group"
                    >
                      <h4 className="font-heading font-bold text-sm text-slate-800 line-clamp-2 group-hover:text-brand-blue transition-colors">
                        {rel.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 mt-2">
                        {rel.dateFormatted || rel.date}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}
