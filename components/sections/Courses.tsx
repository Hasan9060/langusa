"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, useInView, PanInfo } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import {
  Star,
  Clock,
  Users,
  Sparkles,
  ArrowRight,
  PlayCircle,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import Image from 'next/image';
import { cn } from "@/lib/utils"

const courses = [
  {
    title: "English Language Course",
    description: "Enhance your English skills with our comprehensive language course designed for all levels.",
    image: "/Images/courses/course1.png",
    link: "/courses/spoken-english",
    level: "Beginner",
    duration: "8 weeks",
    students: "1.2k",
    rating: 4.9,
    features: ["Daily Practice", "Live Sessions", "Certificate"],
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/20"
  },
  {
    title: "Python Programming Course",
    description: "Learn Python from scratch and build real-world applications with hands-on projects.",
    image: "/Images/courses/course2.png",
    link: "/courses/python-programming",
    level: "Intermediate",
    duration: "10 weeks",
    students: "2.4k",
    rating: 4.8,
    features: ["Coding Exercises", "Project Based", "Mentor Support"],
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/20"
  },
  {
    title: "Website Development (Full-Stack)",
    description: "Master full-stack web development with modern technologies and real-world projects.",
    image: "/Images/courses/course3.png",
    link: "/courses/website-development",
    level: "Advanced",
    duration: "12 weeks",
    students: "3.1k",
    rating: 4.9,
    features: ["Full Stack", "Portfolio Ready", "Career Guidance"],
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/20"
  },
  {
    title: "UI/UX Design Course",
    description: "Design beautiful interfaces and amazing user experiences with industry-standard tools.",
    image: "/Images/courses/course4.png",
    link: "/courses/ui-ux-design",
    level: "Beginner",
    duration: "6 weeks",
    students: "1.8k",
    rating: 4.7,
    features: ["Design Tools", "Real Projects", "Expert Feedback"],
    color: "from-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/20"
  },
  {
    title: "Agentic AI Course",
    description: "Explore the world of Agentic AI and build intelligent applications with cutting-edge technology.",
    image: "/Images/courses/course5.jpeg",
    link: "/courses/agentic-ai",
    level: "Advanced",
    duration: "14 weeks",
    students: "900",
    rating: 4.9,
    features: ["AI Projects", "Research Focus", "Future Skills"],
    color: "from-indigo-500 to-violet-500",
    bgColor: "bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/20"
  },
]

export default function CoursesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startX, setStartX] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const visibleCourses = courses

  const handleTouchStart = (e: React.TouchEvent) => setStartX(e.touches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? handleNext() : handlePrev()
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset } = info
    if (Math.abs(offset.x) > 50) offset.x > 0 ? handlePrev() : handleNext()
  }

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % visibleCourses.length)
  }, [visibleCourses.length])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + visibleCourses.length) % visibleCourses.length)
  }, [visibleCourses.length])

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768 && isInView) {
      const timer = setInterval(handleNext, 6000)
      return () => clearInterval(timer)
    }
  }, [handleNext, isInView])

  // 🎮 3D Gaming Style Transform
  const getCardStyle = (index: number) => {
    const total = visibleCourses.length
    const position = (index - currentIndex + total) % total

    if (position === 0) {
      return {
        transform: "translateX(0px) scale(1) translateZ(50px)",
        zIndex: 30,
        opacity: 1,
      }
    } else if (position === 1) {
      return {
        transform: "translateX(220px) scale(0.85) rotateY(-10deg) translateZ(-60px)",
        zIndex: 20,
        opacity: 0.7,
      }
    } else if (position === total - 1) {
      return {
        transform: "translateX(-220px) scale(0.85) rotateY(10deg) translateZ(-60px)",
        zIndex: 20,
        opacity: 0.7,
      }
    } else {
      return {
        transform: "translateX(0px) scale(0.6) translateZ(-200px)",
        zIndex: 10,
        opacity: 0,
      }
    }
  }

  return (
    <section id="courses" className="py-10 sm:py-20 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container px-4 mx-auto relative z-10" ref={ref}>
        {/* Header with Amazing Animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold mb-6 shadow-xl"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={18} />
            </motion.div>
            Popular Courses
          </motion.div>

          {/* Main Title with Gradient */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            Master New Skills
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Transform your career with courses designed by industry experts. Learn at your own pace with hands-on projects.
          </motion.p>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 text-center"
          >
            <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                9.2k+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Students</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                5+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Courses</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} className="flex flex-col items-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                4.8★
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 🎮 Mobile 3D Carousel */}
        <div className="block md:hidden">
          <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
            <div
              ref={containerRef}
              className="relative w-full h-full flex items-center justify-center perspective-[1000px]"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {visibleCourses.map((course, index) => {
                const style = getCardStyle(index)
                if (style.opacity === 0) return null // hide others

                return (
                  <motion.div
                    key={index}
                    className="absolute transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
                    style={style}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card className={cn("w-[280px] h-[420px] overflow-hidden border-0 rounded-2xl shadow-2xl", course.bgColor)}>
                      <div className="relative h-40 overflow-hidden">
                        <Image src={course.image} alt={course.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      </div>

                      <CardContent className="p-5 flex flex-col h-[220px]">
                        <CardTitle className="text-lg font-bold mb-2">{course.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 flex-grow">
                          {course.description}
                        </CardDescription>

                        <Link href={course.link} passHref className="mt-auto">
                          <Button
                            className={cn(
                              "w-full rounded-lg py-3 text-sm font-semibold text-white bg-gradient-to-r shadow-lg",
                              course.color
                            )}
                          >
                            Enroll Now
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Navigation Arrows */}
            <button onClick={handlePrev} className="absolute left-2 z-30 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center shadow-lg border">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={handleNext} className="absolute right-2 z-30 w-8 h-8 rounded-full bg-white/80 dark:bg-gray-800/80 flex items-center justify-center shadow-lg border">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 🖥 Desktop Grid (Unchanged) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleCourses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={cn("h-full relative overflow-hidden border-0 shadow-xl rounded-3xl", course.bgColor)}>
                <div className="relative h-48 overflow-hidden">
                  <Image src={course.image} alt={course.title} width={400} height={200} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <CardContent className="p-6">
                  <CardTitle className="text-xl font-bold mb-2">{course.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {course.description}
                  </CardDescription>
                  <Link href={course.link} passHref>
                    <Button
                      className={cn("w-full rounded-xl py-5 font-semibold text-white bg-gradient-to-r shadow-lg", course.color)}
                    >
                      Enroll Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>

                {index < 2 && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full">
                      <TrendingUp className="w-3 h-3 text-white" />
                      <span className="text-xs font-bold text-white">Popular</span>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
