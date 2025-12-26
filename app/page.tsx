import HeroSection from '@/components/sections/Hero';
import ServicesSection from '@/components/sections/Services';
import Courses from '@/components/sections/Courses';
import Bannerteam from '@/components/banners/Bannerteam';
import Ebooks from '@/components/banners/movies';

import NovelBanner from '@/components/banners/NovelBanner';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <Courses />
      <NovelBanner />
      <Ebooks />
      <Bannerteam />
    </>
  );
}