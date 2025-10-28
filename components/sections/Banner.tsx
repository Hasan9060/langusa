"use client"

import { useEffect, useState } from "react"
import { useSwipeable } from "react-swipeable"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const slides = [
  {
    image: "/Images/banner/graphicsdesign.jpg",
    title: "Stunning Graphics",
    description: "Stand out with our custom-made graphic design services.",
  },
  {
    image: "/Images/banner/uiux.jpg",
    title: "UI/UX Design",
    description: "Design intuitive digital experiences that captivate and convert.",
  },
  {
    image: "/Images/banner/seo.jpg",
    title: "Search Engine Optimization (SEO)",
    description: "Boost your visibility on Google with our SEO Specialists.",
  },
  {
    image: "/Images/banner/social.jpg",
    title: "Social Media Marketing",
    description: "Engage your audience across platforms with creative and consistent content.",
  },
  {
    image: "/Images/banner/ads.jpg",
    title: "Meta & Google Advertising",
    description: "Maximize ROI with expert-driven paid media strategies.",
  },
  {
    image: "/Images/banner/content.jpg",
    title: "Content Creation & Copywriting",
    description: "Powerful visuals and messaging to captivate your audience.",
  },
  {
    image: "/Images/banner/webiste.jpg",
    title: "Web Design & Development",
    description: "Modern, responsive websites built for performance and elegance.",
  },
  {
    image: "/Images/banner/wordpress.jpg",
    title: "Custom WordPress Websites",
    description: "Tailored WordPress solutions for your business needs.",
  },
  {
    image: "/Images/banner/shopify.jpg",
    title: "Shopify Store Setup",
    description: "Optimized e-commerce setups that drive conversions.",
  },
  {
    image: "/Images/banner/woo.jpg",
    title: "WooCommerce Development",
    description: "Scalable, secure WooCommerce solutions to grow your store.",
  },
  {
    image: "/Images/banner/influencer.jpg",
    title: "Influencer Marketing",
    description: "Partner with influencers to build brand credibility and reach.",
  },
]

export default function Banner() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setIndex((prev) => (prev + 1) % slides.length),
    onSwipedRight: () => setIndex((prev) => (prev - 1 + slides.length) % slides.length),
    trackMouse: true,
  })

  return (
    <section
      className="relative overflow-hidden py-16 px-4 md:px-20 "
      {...swipeHandlers}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Text Section */}
        <div className="space-y-6 text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.h1
              key={slides[index].title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="text-black dark:text-white text-4xl font-bold sm:text-base md:text-4xl max-w-xl mx-auto md:mx-0"
            >
              {slides[index].title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={slides[index].description}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
             className="text-black dark:text-white text-xs sm:text-base md:text-base max-w-xl mx-auto md:mx-0"
            >
              {slides[index].description}
            </motion.p>
          </AnimatePresence>

          <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-all">
            Get Start
          </Button>
        </div>

        {/* Image Section */}
        <div className="relative h-52 md:h-80 w-full rounded-xl overflow-hidden shadow-xl bg-black/10 backdrop-blur-md">
          <Image
            src={slides[index].image}
            alt={slides[index].title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Radial Grid Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#111827_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
    </section>
  )
}
