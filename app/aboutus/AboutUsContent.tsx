'use client';

import { useRef } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { BookOpen, Users, Award, Globe, Target, Heart } from "lucide-react"

export default function AboutUsContent() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const stats = [
        { number: "3,600+", label: "Students Taught", icon: Users },
        { number: "98%", label: "Success Rate", icon: Award },
        { number: "4+", label: "Years Experience", icon: BookOpen },
    ]

    const courses = [
        {
            level: "Class IX-XII",
            description: "Comprehensive English curriculum aligned with educational boards",
            features: ["Board Exam Preparation", "Literature Analysis", "Writing Skills", "Grammar Mastery"]
        },
        {
            level: "Language Courses",
            description: "English proficiency courses for all levels",
            features: ["Beginner to Advanced", "Business English", "Conversational Practice", "Speaking English"]
        },
        {
            level: "Skill Development",
            description: "Specialized courses for professional growth",
            features: ["Public Speaking", "Creative Writing", "Academic Research", "Professional Communication"]
        }
    ]

    const values = [
        {
            icon: Target,
            title: "Our Mission",
            description: "To make quality English education accessible to every student, empowering them with communication skills for academic and professional success."
        },
        {
            icon: Heart,
            title: "Our Philosophy",
            description: "We believe in student-centered learning where every lesson is tailored to individual needs and learning styles."
        },
        {
            icon: Users,
            title: "Our Approach",
            description: "Interactive, engaging, and practical learning experiences that go beyond textbooks to build real-world communication skills."
        }
    ]

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-28 pb-28 md:pt-40 md:pb-36 bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 dark:from-slate-900 dark:via-green-800 dark:to-black overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        About Us
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8">
                        Transforming English education for students worldwide through innovative teaching methods
                    </p>

                    <nav className="flex justify-center items-center text-sm md:text-base text-white/60">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-2 group">
                            <span>Home</span>
                            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                        </Link>
                        <span className="mx-3 text-white/40">/</span>
                        <span className="text-white font-medium">About Us</span>
                    </nav>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                                Empowering Students Through English
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                                For over 4 years, we have been at the forefront of English education,
                                helping students from Class IX to XII and beyond master the language
                                that opens doors to global opportunities.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                                Our innovative approach combines traditional teaching methods with
                                modern technology, creating an engaging learning environment that
                                fosters confidence and excellence in communication.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="https://www.youtube.com/@watchtoleadenglish/videos"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Videos
                                </Link>
                                <Link
                                    href="/books"
                                    className="border border-gray-300 dark:border-gray-600 hover:border-blue-500 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    ebooks
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative h-96 w-full rounded-2xl overflow-hidden">
                                <Image
                                    src="https://tse2.mm.bing.net/th/id/OIP.SK3n3sjxLKP3BTXvfmJdgwHaE7?w=626&h=417&rs=1&pid=ImgDetMain&o=7&rm=3"
                                    alt="Students learning English"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                        <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 dark:text-white">4+ Years</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Excellence in Education</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {stat.number}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                            Our Educational Philosophy
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            We believe in creating lifelong learners through personalized, engaging,
                            and effective English education.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow">
                                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <value.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                            Our Comprehensive Programs
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            From academic excellence to professional mastery, we offer courses
                            designed for every learning need.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {courses.map((course, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    {course.level}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    {course.description}
                                </p>
                                <ul className="space-y-3">
                                    {course.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
