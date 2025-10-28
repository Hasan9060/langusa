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
import { cn } from "@/lib/utils"

const courses = [
  {
    title: "English Language Course",
    description: "Enhance your English skills with our comprehensive language course designed for all levels.",
    image: "/images/courses/course1.png",
    link: "/courses/spokenenglish",
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
    image: "/images/courses/course2.png",
    link: "/courses/pythonprogramming",
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
    image: "/images/courses/course3.png",
    link: "/courses/books",
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
    image: "/images/courses/course4.png",
    link: "/courses/uiux",
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
    image: "/images/courses/course5.jpeg",
    link: "/courses/quizzes",
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
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      const timer = setInterval(handleNext, 6000)
      return () => clearInterval(timer)
    }
  }, [handleNext])

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
    <section id="courses" className="py-10 sm:py-16 relative overflow-hidden bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] dark:bg-black">
      <div className="container px-4 mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium mb-4">
            <Sparkles size={16} />
            Popular Courses
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Master New Skills
          </h2>
          <p className="text-sm sm:text-lg text-muted-foreground">
            Transform your career with courses designed by industry experts. Learn at your own pace with hands-on projects.
          </p>
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
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
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
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
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
