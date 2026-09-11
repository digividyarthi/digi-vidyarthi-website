import type { Metadata } from 'next';
import { siteConfig } from '@/data/siteData';

export const metadata: Metadata = {
  title: 'Digital Marketing & AI Blog | Digi Vidyarthi Varanasi',
  description:
    'Practical digital marketing tips, SEO strategies, Google Ads guides, and AI marketing insights from the trainers at Digi Vidyarthi in Varanasi.',
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
