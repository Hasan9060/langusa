import { Metadata } from 'next';
import TeamSection from '@/components/sections/Team';

export const metadata: Metadata = {
  title: 'Our Team - Watch to Lead',
  description: 'Meet the dedicated educators and professionals behind Watch to Lead.',
  openGraph: {
    title: 'Our Team - Watch to Lead',
    description: 'Meet the dedicated educators and professionals behind Watch to Lead.',
  },
};

export default function Team() {
  return (
    <>
      <TeamSection />
    </>
  );
}