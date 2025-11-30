import { Metadata } from 'next';
import AboutUsContent from './AboutUsContent';

export const metadata: Metadata = {
  title: 'About Us - Watch to Lead',
  description: 'Learn about Watch to Lead mission, philosophy, and our experienced team dedicated to transforming English education.',
  openGraph: {
    title: 'About Us - Watch to Lead',
    description: 'Learn about Watch to Lead mission, philosophy, and our experienced team dedicated to transforming English education.',
  },
};

export default function AboutUsPage() {
  return <AboutUsContent />;
}