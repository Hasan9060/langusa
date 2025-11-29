"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bot,
  BookOpen,
  Library,
  GraduationCap,
  ClipboardCheck,
  Gamepad2,
  Users2,
  Rocket,
  Notebook,
  ArrowRight,
  Sparkles as SparklesIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    id: 1,
    icon: Bot,
    title: "AI Chatbot Tutor",
    description:
      "Practice English conversations anytime with our intelligent AI tutor that adapts to your learning style.",
    color: "from-blue-500 to-cyan-500",
    bgColor:
      "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/20",
    borderColor: "border-blue-200/50 dark:border-blue-700/30",
   link: "https://ai-assisstant-ochre.vercel.app/",
  },
  {
    id: 2,
    icon: Library,
    title: "eBooks",
    description:
      "Access our growing library of e-books and PDFs to improve your reading and grammar skills.",
    color: "from-emerald-500 to-green-500",
    bgColor:
      "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/20",
    borderColor: "border-emerald-200/50 dark:border-emerald-700/30",
    link: "/books",
  },
  {
    id: 3,
    icon: BookOpen,
    title: "Vocabulary Builder",
    description:
      "Learn new words daily with fun quizzes and contextual examples that boost your fluency naturally.",
    color: "from-purple-500 to-pink-500",
    bgColor:
      "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/20",
    borderColor: "border-purple-200/50 dark:border-purple-700/30",
    link: "/vocabulary",
  },
  {
    id: 4,
    icon: GraduationCap,
    title: "Past & Preparation Papers ",
    description:
      "Get access to a wide range of past papers and preparation materials.",
    color: "from-red-500 to-orange-500",
    bgColor:
      "bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/20",
    borderColor: "border-red-200/50 dark:border-red-700/30",
    link: "https://www.youtube.com/@watchtoleadenglish",
    comingSoon: true,
  },
  {
    id: 5,
    icon: ClipboardCheck,
    title: "Daily Quizzes",
    description:
      "Sharpen your English through bite-sized quizzes and fun challenges updated every single day.",
    color: "from-indigo-500 to-violet-500",
    bgColor:
      "bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/20",
    borderColor: "border-indigo-200/50 dark:border-indigo-700/30",
    comingSoon: true,
  },
  {
    id: 6,
    icon: Users2,
    title: "Learning Community",
    description:
      "Join fellow English learners, share progress, and stay motivated on your journey to fluency.",
    color: "from-rose-500 to-pink-500",
    bgColor:
      "bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/20",
    borderColor: "border-rose-200/50 dark:border-rose-700/30",
    comingSoon: true,
    link: "/community",
  },
   {
    id: 7,
    icon: Notebook,
    title: "Notes & Guess Papers",
    description:
      "All subject notes and guess papers to aid your exam preparation.",
    color: "from-blue-500 to-red-500",
    bgColor:
      "bg-gradient-to-br from-purple-50 to-purple-50 dark:from-purple-950/30 dark:to-purple-950/20",
    borderColor: "border-red-200/50 dark:border-red-700/30",
    link: "https://www.youtube.com/@watchtoleadenglish",
    comingSoon: true,
  },
   {
    id: 8,
    icon:  Gamepad2,
    title: "Games & Activities",
    description:
      "Get access to a wide range of past papers and preparation materials.",
    color: "from-green-500 to-pink-500",
    bgColor:
      "bg-gradient-to-br from-amber-50 to-amber-50 dark:from-amber-950/30 dark:to-amber-950/20",
    borderColor: "border-red-200/50 dark:border-red-700/30",
    link: "https://www.youtube.com/@watchtoleadenglish",
    comingSoon: true,
  },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [showAll, setShowAll] = useState(false)
  const visibleServices = showAll ? services : services.slice(0, 3)

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_1px)] dark:bg-black">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br dark:bg-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),transparent)]" />

        <div className="absolute top-1/4 left-10 w-4 h-4 bg-blue-400/20 rounded-full blur-xl animate-float" />
        <div className="absolute top-1/3 right-20 w-6 h-6 bg-purple-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/4 left-20 w-5 h-5 bg-cyan-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: "4s" }} />
        <div className="absolute bottom-1/3 right-10 w-3 h-3 bg-pink-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container px-4 mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium mb-6">
            <SparklesIcon size={16} />
            Comprehensive Learning Platform
          </div>

          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold font-jakarta mb-4">
            Everything You Need to Learn!
          </h2>

          <p className="text-xs sm:text-lg text-muted-foreground mb-8 leading-relaxed">
            Transform your English skills with our complete suite of interactive tools,
            engaging content, and supportive community all designed for real progress.
          </p>

          <div className="flex justify-center">
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          </div>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <Card
                className={cn(
                  "h-full group relative overflow-hidden border-0 shadow-lg transition-all duration-500 rounded-3xl",
                  service.bgColor,
                  service.borderColor,
                  service.comingSoon
                    ? "opacity-70 pointer-events-none select-none"
                    : "hover:shadow-2xl"
                )}
              >
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-lg",
                        service.color,
                        "group-hover:scale-110 transition-transform duration-300"
                      )}
                    >
                      <service.icon size={28} className="text-white" />
                    </div>
                    <motion.div whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400 }}>
                      <ArrowRight
                        size={20}
                        className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300"
                      />
                    </motion.div>
                  </div>

                  <CardTitle className="text-xl font-jakarta font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    {service.title}
                  </CardTitle>

                  {service.comingSoon && (
                    <div className="pt-28 absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-0">
                      <span className="text-white text-lg font-semibold px-4 py-2 rounded-full bg-green-500 ">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="relative z-10">
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-6">
                    {service.description}
                  </CardDescription>

                  {!service.comingSoon && (
                    <Link href={service.link || "#"}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="group/btn relative overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-transparent rounded-xl px-6 py-2 transition-all duration-300"
                      >
                        <span className="relative z-10 font-semibold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-white bg-clip-text text-transparent group-hover/btn:text-white transition-all duration-300">
                          Explore Now
                        </span>
                        <div
                          className={cn(
                            "absolute inset-0 bg-gradient-to-r rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300",
                            service.color
                          )}
                        />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Show More / Less Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button
            onClick={() => setShowAll(!showAll)}
            size="lg"
            className="relative overflow-hidden group bg-gradient-to-r from-green-600 to-green-600 text-white font-semibold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
          >
            <Rocket className="mr-2 h-5 w-5 group-hover:rotate-45 transition-transform duration-300" />
            {showAll ? "Show Less" : "Explore All Features"}
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </Button>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
