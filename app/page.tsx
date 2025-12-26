import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/Hero';
import ServicesSection from '@/components/sections/Services';

// Dynamically import heavy sections
const TestimonialsSection = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />
});
const DictionaryCard = dynamic(() => import('@/components/sections/DictionaryCard'), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />
});
const Courses = dynamic(() => import('@/components/sections/Courses'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />
});
const Bannerteam = dynamic(() => import('@/components/banners/Bannerteam'), {
  loading: () => <div className="h-64 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />
});
const Ebooks = dynamic(() => import('@/components/banners/movies'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />
});
const NovelBanner = dynamic(() => import('@/components/banners/NovelBanner'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <DictionaryCard />
      <Courses />
      <NovelBanner />
      <Ebooks />
      <Bannerteam />
      <TestimonialsSection />
    </>
  );
}