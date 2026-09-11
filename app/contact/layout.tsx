import type { Metadata } from 'next';
import { siteConfig } from '@/data/siteData';

export const metadata: Metadata = {
  title: 'Contact Digi Vidyarthi | Digital Marketing Institute in Varanasi',
  description:
    'Contact Digi Vidyarthi at Ashok Vihar Colony Phase-I, Paharia, Varanasi. Call +91-9278027950 / +91-9278039576 or book a free demo class for our practical digital marketing courses.',
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
