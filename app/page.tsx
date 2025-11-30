import HeroSection from '@/components/sections/Hero';
import ServicesSection from '@/components/sections/Services';
import TestimonialsSection from '@/components/sections/Testimonials';
import DictionaryCard from '@/components/sections/DictionaryCard';
import Courses from '@/components/sections/Courses';
import Bannerteam from '@/components/banners/Bannerteam';
import Ebooks from '@/components/banners/movies';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <DictionaryCard />
      <Courses />
      <Ebooks />
      <Bannerteam />
      <TestimonialsSection />
    </>
  );
}