"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote, Star, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    content: "This platform is brilliant for upskilling on your own schedule. I was looking for a refresher in data analysis fundamentals, and the Watch to Lead course was perfect. I especially loved the weekly live Q&A sessions with the instructors—it was like having a personal tutor without the high cost.",
    author: "Zain Malik",
    image: "/Images/testimonials/student1.jpeg",
    rating: 4,
  },
  {
    content: "I enrolled in the 'Creative Writing for Beginners' series, and it has genuinely sparked my passion again. The videos are high-quality, and the assignments are engaging. The best part is the active and supportive community forum where I could share my work and get constructive criticism from fellow learners. A fantastic, supportive environment!",
    author: "Fatima Javed",
    image: "/Images/testimonials/student2.jpeg",
    rating: 5,
  },
  {
    content: "The Speaking course was a game changer. I used to dread presentations, but now I feel confident and articulate. The most valuable part was the one-on-one personalized feedback on my practice speeches. Highly recommend for anyone looking to truly overcome stage fright",
    author: "Arsh",
    image: "https://cdn.pixabay.com/photo/2021/04/11/05/50/boy-6168779_1280.jpg",
    rating: 3,
  },
  {
    content: "I have done English course though watch to lead & literally I can really speak English so well and frequently.one of the best feature I like the most about daily vocalbury words . Thank you so much WTL for this amazing platform.",
    author: "Ayesha Asif",
    image: "/Images/testimonials/student3.jpeg",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const nextTestimonial = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95
    })
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_1px)] dark:bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(120,119,198,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(120,119,198,0.1),transparent)]" />
        
        {/* Animated floating elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-10 w-6 h-6 bg-blue-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-20 w-8 h-8 bg-purple-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, -25, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-1/4 w-4 h-4 bg-cyan-400/20 rounded-full blur-xl"
        />
      </div>

      <div className="container px-4 mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium mb-6">
            <Sparkles size={16} />
            Trusted by Thousands
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold font-jakarta mb-6 bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Voices of Success
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Discover how our students transformed their English skills and achieved their dreams
          </p>
          
          <div className="flex justify-center">
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          </div>
        </motion.div>

        {/* Main Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[500px]">
                
                {/* Testimonial Content */}
                <div className="col-span-3 p-8 lg:p-12 flex flex-col justify-center relative">
                  {/* Quote Icon Background */}
                  <div className="absolute top-8 right-8 opacity-5">
                    <Quote className="h-32 w-32 text-blue-500" />
                  </div>

                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={activeIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                        scale: { duration: 0.2 }
                      }}
                      className="relative"
                    >
                      {/* Stars Rating */}
                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: i * 0.1, type: "spring" }}
                          >
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-medium">
                        {testimonials[activeIndex].content}
                      </p>

                      {/* Author Info */}
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <p className="font-bold text-gray-900 dark:text-white text-lg">
                            {testimonials[activeIndex].author}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Student
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      {/* Progress Dots */}
                      <div className="flex gap-2">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToTestimonial(index)}
                            className={cn(
                              "w-3 h-3 rounded-full transition-all duration-300",
                              index === activeIndex 
                                ? "bg-gradient-to-r from-green-500 to-green-500 scale-125" 
                                : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                            )}
                          />
                        ))}
                      </div>
                      
                      <span className="text-sm text-muted-foreground">
                        {activeIndex + 1} / {testimonials.length}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={prevTestimonial}
                        className="rounded-xl border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group"
                      >
                        <ChevronLeft className="h-4 w-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={nextTestimonial}
                        className="rounded-xl border-gray-300 dark:border-gray-600 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 group"
                      >
                        <ChevronRight className="h-4 w-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Image Section */}
                <div className="col-span-2 relative hidden lg:block overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 z-10" />
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].author}
                        fill
                        className="object-cover"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      
                      {/* Floating Info Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <Image
                              src={testimonials[activeIndex].image}
                              alt={testimonials[activeIndex].author}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 dark:text-white">
                              {testimonials[activeIndex].author}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Student
                            </p>
                            <div className="flex gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Image */}
          <div className="flex lg:hidden justify-center mt-8">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-32 h-32"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl relative">
                <Image
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].author}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-200/50 animate-ping" />
            </motion.div>
          </div>
        </motion.div>

        
      </div>
    </section>
  )
}