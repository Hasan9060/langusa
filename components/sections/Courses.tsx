"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, useInView, PanInfo } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const courses = [
  {
    title: "English Language Course",
    description:
      "Enhance your English skills with our comprehensive language course designed for all levels.",
    image: "/Images/courses/course1.png",
    link: "/courses/spoken-english",
    color: "from-blue-500 to-cyan-500",
    bgColor:
      "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/20",
  },
  {
    title: "Python Programming Course",
    description:
      "Learn Python from scratch and build real-world applications with hands-on projects.",
    image: "/Images/courses/course2.png",
    link: "/courses/python-programming",
    color: "from-purple-500 to-pink-500",
    bgColor:
      "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/20",
  },
  {
    title: "Website Development (Full-Stack)",
    description:
      "Master full-stack web development with modern technologies and real-world projects.",
    image: "/Images/courses/course3.png",
    link: "/courses/website-development",
    color: "from-green-500 to-emerald-500",
    bgColor:
      "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/20",
  },
]

export default function CoursesSection() {
  const ref = useRef(null)
  useInView(ref, { once: true })
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleCourses = courses

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % visibleCourses.length)
  }, [visibleCourses.length])

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + visibleCourses.length) % visibleCourses.length
    )
  }, [visibleCourses.length])

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (Math.abs(info.offset.x) > 60) {
      info.offset.x > 0 ? handlePrev() : handleNext()
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const timer = setInterval(handleNext, 6000)
      return () => clearInterval(timer)
    }
  }, [handleNext])

  const getCardStyle = (index: number) => {
    const total = visibleCourses.length
    const position = (index - currentIndex + total) % total

    if (position === 0)
      return {
        transform: "translateX(0) scale(1) translateZ(50px)",
        zIndex: 30,
        opacity: 1,
      }

    if (position === 1)
      return {
        transform:
          "translateX(220px) scale(0.85) rotateY(-10deg) translateZ(-60px)",
        zIndex: 20,
        opacity: 0.7,
      }

    if (position === total - 1)
      return {
        transform:
          "translateX(-220px) scale(0.85) rotateY(10deg) translateZ(-60px)",
        zIndex: 20,
        opacity: 0.7,
      }

    return {
      transform: "scale(0.6) translateZ(-200px)",
      zIndex: 10,
      opacity: 0,
    }
  }

  return (
    <section
      id="courses"
      className="py-10 sm:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30"
    >
      <div ref={ref} className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium mb-6">
            <Sparkles size={18} /> Popular Courses
          </div>

          <h2 className="text-5xl font-black text-green-500">
            Master New Skills
          </h2>
        </div>

        {/* 📱 MOBILE CAROUSEL */}
        <div className="block md:hidden">
          <div className="relative h-[500px] flex items-center justify-center perspective-[1000px]">
            {visibleCourses.map((course, index) => {
              const style = getCardStyle(index)
              if (style.opacity === 0) return null

              return (
                <motion.div
                  key={course.title}
                  className="absolute"
                  style={style}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                >
                  <Card
                    className={cn(
                      "w-[280px] h-[420px] border-0 rounded-2xl shadow-2xl overflow-hidden",
                      course.bgColor
                    )}
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <CardContent className="p-5 flex flex-col h-[220px]">
                      <CardTitle className="text-lg font-bold mb-2">
                        {course.title}
                      </CardTitle>

                      <CardDescription className="text-sm mb-4 flex-grow">
                        {course.description}
                      </CardDescription>

                      <Link href={course.link}>
                        <Button
                          className={cn(
                            "w-full text-white bg-gradient-to-r",
                            course.color
                          )}
                        >
                          Enroll Now <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}

            <button
              onClick={handlePrev}
              className="absolute left-2 z-30 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 z-30 w-9 h-9 bg-white/80 rounded-full flex items-center justify-center shadow"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* 🖥 DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleCourses.map((course, index) => (
            <Card
              key={course.title}
              className={cn(
                "relative overflow-hidden border-0 shadow-xl rounded-3xl",
                course.bgColor
              )}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardContent className="p-6">
                <CardTitle className="text-xl font-bold mb-2">
                  {course.title}
                </CardTitle>

                <CardDescription className="mb-4">
                  {course.description}
                </CardDescription>

                <Link href={course.link}>
                  <Button
                    className={cn(
                      "w-full text-white bg-gradient-to-r",
                      course.color
                    )}
                  >
                    Enroll Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>

              {index < 2 && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-xs font-bold text-white flex items-center gap-1">
                  <TrendingUp size={12} /> Popular
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
