import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import SocialSidebar from '@/components/SocialSidebar';
import { siteConfig } from '@/data/siteData';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Digi Vidyarthi | Best Digital Marketing Institute in Varanasi',
    template: '%s | Digi Vidyarthi Varanasi',
  },
  description:
    'Join Digi Vidyarthi, the premier AI-powered digital marketing institute in Varanasi. 100% practical training in SEO, Google Ads, Meta Ads, and AI tools with live projects and career support.',
  verification: {
    google: siteConfig.googleVerification,
  },
  keywords: [
    'best digital marketing institute in varanasi',
    'digital marketing course in varanasi',
    'digital marketing institute in varanasi',
    'best digital marketing courses in varanasi',
    'digital marketing fees in varanasi',
    'seo course in varanasi',
    'ai digital marketing institute',
    'Digi Vidyarthi',
  ],
  authors: [{ name: 'Digi Vidyarthi', url: siteConfig.url }],
  creator: 'Digi Vidyarthi',
  publisher: 'Digi Vidyarthi',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Digi Vidyarthi | Best Digital Marketing Institute in Varanasi',
    description:
      'Transform your career with practical digital marketing and AI tools training in Varanasi. Live projects, agency mentorship, and placement support.',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Digi Vidyarthi - Digital Marketing Institute in Varanasi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digi Vidyarthi | Best Digital Marketing Institute in Varanasi',
    description:
      'Varanasi leading practical AI-powered digital marketing institute with 100% live projects and placement assistance.',
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: '/images/logo.webp',
    apple: '/images/logo.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global JSON-LD Schema (Organization, WebSite, Breadcrumbs)
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': ['EducationalOrganization', 'LocalBusiness'],
      '@id': `${siteConfig.url}/#organization`,
      name: 'Digi Vidyarthi',
      url: siteConfig.url,
      logo: `${siteConfig.url}/images/logo.webp`,
      image: siteConfig.ogImage,
      description:
        'Premier AI-powered digital marketing institute in Varanasi providing practical training, live projects, and placement assistance.',
      telephone: siteConfig.phone1,
      email: siteConfig.email,
      priceRange: '₹₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '9238+VR9, Ashok Vihar Colony Phase-I, Paharia',
        addressLocality: 'Varanasi',
        addressRegion: 'Uttar Pradesh',
        postalCode: '221007',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 25.3544304,
        longitude: 83.0049044,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '19:00',
      },
      sameAs: [
        siteConfig.social.instagram,
        siteConfig.social.youtube,
        siteConfig.social.facebook,
        siteConfig.social.linkedin,
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: 'Digi Vidyarthi',
      description: siteConfig.tagline,
      publisher: {
        '@id': `${siteConfig.url}/#organization`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteConfig.url,
        },
      ],
    },
  ];

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        {schemas.map((schema, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="font-body min-h-screen flex flex-col">
        <TopBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <SocialSidebar />
      </body>
    </html>
  );
}
