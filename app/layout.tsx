import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import SocialSidebar from '@/components/SocialSidebar';
import OfferPopup from '@/components/OfferPopup';
import { siteConfig, verifiedCourses } from '@/data/siteData';

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
    default: 'Best Digital Marketing Institute in Varanasi | Digi Vidyarthi',
    template: '%s',
  },
  description:
    'Digi Vidyarthi is the best digital marketing institute in Varanasi offering practical classroom training, live projects, AI tools, and career guidance in Paharia.',
  verification: {
    google: siteConfig.googleVerification,
  },
  keywords: [
    'best digital marketing institute in varanasi',
    'best digital marketing course in varanasi',
    'digital marketing institute in varanasi',
    'digital marketing course in varanasi',
    'digital marketing course fees in varanasi',
    'practical digital marketing training varanasi',
    'ai marketing institute varanasi',
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
    title: 'Best Digital Marketing Institute in Varanasi | Digi Vidyarthi',
    description:
      'Practical digital marketing training with live projects, AI marketing tools, and mentor support at Digi Vidyarthi in Paharia, Varanasi.',
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
    title: 'Best Digital Marketing Institute in Varanasi | Digi Vidyarthi',
    description:
      'Practical digital marketing institute in Varanasi. Live projects, AI marketing tools, and classroom training in Paharia.',
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
  // Global JSON-LD Schemas (Organization, LocalBusiness, WebSite, Courses)
  const schemas: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': ['EducationalOrganization', 'LocalBusiness'],
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/images/logo.webp`,
      image: siteConfig.ogImage,
      description:
        'Practical digital marketing training institute in Varanasi providing classroom instruction, live campaign assignments, and AI marketing tools.',
      telephone: [siteConfig.phone1, siteConfig.phone2],
      email: siteConfig.email,
      priceRange: '₹10,000 - ₹50,000',
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
      name: siteConfig.name,
      description: siteConfig.tagline,
      publisher: {
        '@id': `${siteConfig.url}/#organization`,
      },
    },
    ...verifiedCourses.map((course) => ({
      '@context': 'https://schema.org',
      '@type': 'Course',
      '@id': `${siteConfig.url}/courses#${course.id}`,
      name: course.name,
      description: course.summary,
      provider: {
        '@id': `${siteConfig.url}/#organization`,
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'INR',
        lowPrice: 10000,
        highPrice: 50000,
        offerCount: 1,
        url: `${siteConfig.url}/courses`,
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'Onsite',
        duration: 'P2M/P6M',
        location: {
          '@type': 'Place',
          name: 'Digi Vidyarthi Varanasi Campus',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '9238+VR9, Ashok Vihar Colony Phase-I, Paharia',
            addressLocality: 'Varanasi',
            addressRegion: 'Uttar Pradesh',
            postalCode: '221007',
            addressCountry: 'IN',
          },
        },
      },
    })),
  ];

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="preload" as="image" href="/images/hero-mentor.webp" type="image/webp" fetchPriority="high" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
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
        <OfferPopup />
      </body>
    </html>
  );
}
