'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Gamepad2, Trophy, Brain, ArrowRight, Star, Sparkles, Mic, BookMarked, Pencil, FileText, Shuffle, Layers, Filter, Target } from 'lucide-react';
import { vocabularyData } from '@/lib/vocabularyData';

export default function VocabularyContent() {
    const [wordOfDay, setWordOfDay] = useState(vocabularyData[0]);

    useEffect(() => {
        // Simple random word for now, could be date-based in real app
        const randomIndex = Math.floor(Math.random() * vocabularyData.length);
        setWordOfDay(vocabularyData[randomIndex]);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="pt-28 min-h-screen bg-background text-foreground p-6 md:p-12 md:pt-28">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="space-y-12"
                >
                    {/* Header Section */}
                    <div className="text-center space-y-4">
                        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                            Vocabulary Builder
                        </motion.h1>
                        <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Master new words, challenge yourself with games, and track your journey to fluency.
                        </motion.p>
                    </div>

                    {/* Word of the Day Card - Beautiful & Amazing */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full max-w-4xl mx-auto"
                    >
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 p-1 shadow-2xl">
                            {/* Animated Background Gradient */}
                            <motion.div
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-[length:200%_100%]"
                            />

                            {/* Inner Card */}
                            <div className="relative bg-background/95 backdrop-blur-xl rounded-3xl p-8 md:p-12">
                                {/* Floating Sparkles */}
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 5, 0],
                                        opacity: [0.3, 0.6, 0.3],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute top-4 right-4 text-yellow-400"
                                >
                                    <Sparkles size={80} />
                                </motion.div>

                                {/* Floating Stars */}
                                <motion.div
                                    animate={{
                                        y: [0, -15, 0],
                                        rotate: [0, -10, 0],
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }}
                                    className="absolute bottom-8 left-8 text-purple-400 opacity-30"
                                >
                                    <Star size={60} className="fill-current" />
                                </motion.div>

                                <div className="relative z-10">
                                    {/* Badge */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                        className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg"
                                    >
                                        <motion.div
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Star className="w-5 h-5 fill-white text-white" />
                                        </motion.div>
                                        <span className="text-white font-bold tracking-wider uppercase text-sm">
                                            Word of the Day
                                        </span>
                                    </motion.div>

                                    {/* Word */}
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent"
                                    >
                                        {wordOfDay.term}
                                    </motion.h2>

                                    {/* Tags */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="flex items-center gap-3 mb-8"
                                    >
                                        <motion.span
                                            whileHover={{ scale: 1.1 }}
                                            className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white text-sm font-bold shadow-lg"
                                        >
                                            {wordOfDay.level}
                                        </motion.span>
                                        <motion.span
                                            whileHover={{ scale: 1.1 }}
                                            className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-bold shadow-lg"
                                        >
                                            {wordOfDay.category}
                                        </motion.span>
                                    </motion.div>

                                    {/* Definition */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="mb-8"
                                    >
                                        <div className="relative">
                                            <div className="absolute -left-4 top-0 text-6xl text-purple-300 opacity-30 font-serif">"</div>
                                            <p className="text-2xl md:text-3xl text-foreground font-medium italic pl-8">
                                                {wordOfDay.definition}
                                            </p>
                                            <div className="absolute -right-4 bottom-0 text-6xl text-purple-300 opacity-30 font-serif">"</div>
                                        </div>
                                    </motion.div>

                                    {/* Example */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-6 border-l-4 border-gradient-to-b from-purple-500 to-blue-500"
                                    >
                                        <motion.div
                                            animate={{
                                                x: ['-100%', '100%'],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        />
                                        <p className="text-lg md:text-xl relative z-10">
                                            <span className="font-bold text-purple-600 dark:text-purple-400 mr-2">
                                                Example:
                                            </span>
                                            <span className="text-foreground">
                                                {wordOfDay.example}
                                            </span>
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Actions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link href="/vocabulary/learn" className="group">
                            <motion.div
                                variants={itemVariants}
                                className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500 group-hover:scale-110 transition-transform">
                                    <BookOpen size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Start Learning</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Explore curated word lists
                                </p>
                                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                                    Browse <ArrowRight size={14} className="ml-1" />
                                </div>
                            </motion.div>
                        </Link>

                        <Link href="/vocabulary/games" className="group">
                            <motion.div
                                variants={itemVariants}
                                className="h-full p-6 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 text-purple-500 group-hover:scale-110 transition-transform">
                                    <Gamepad2 size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Practice Games</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Flashcards, Quizzes & More
                                </p>
                                <div className="flex items-center text-purple-500 font-medium text-sm group-hover:gap-2 transition-all">
                                    Play <ArrowRight size={14} className="ml-1" />
                                </div>
                            </motion.div>
                        </Link>

                        <Link href="/vocabulary/progress" className="group">
                            <motion.div
                                variants={itemVariants}
                                className="h-full p-6 rounded-2xl bg-card border border-border hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 text-green-500 group-hover:scale-110 transition-transform">
                                    <Trophy size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Your Progress</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Track achievements & streaks
                                </p>
                                <div className="flex items-center text-green-500 font-medium text-sm group-hover:gap-2 transition-all">
                                    View <ArrowRight size={14} className="ml-1" />
                                </div>
                            </motion.div>
                        </Link>

                        <Link href="/vocabulary/pronunciation" className="group">
                            <motion.div
                                variants={itemVariants}
                                className="h-full p-6 rounded-2xl bg-card border border-border hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4 text-pink-500 group-hover:scale-110 transition-transform">
                                    <Mic size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Pronunciation</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Listen & practice speaking
                                </p>
                                <div className="flex items-center text-pink-500 font-medium text-sm group-hover:gap-2 transition-all">
                                    Practice <ArrowRight size={14} className="ml-1" />
                                </div>
                            </motion.div>
                        </Link>

                        <Link href="/vocabulary/favorites" className="group">
                            <motion.div
                                variants={itemVariants}
                                className="h-full p-6 rounded-2xl bg-card border border-border hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-4 text-yellow-500 group-hover:scale-110 transition-transform">
                                    <BookMarked size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Favorites</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Save & review your words
                                </p>
                                <div className="flex items-center text-yellow-500 font-medium text-sm group-hover:gap-2 transition-all">
                                    View <ArrowRight size={14} className="ml-1" />
                                </div>
                            </motion.div>
                        </Link>

                        <Link href="/vocabulary/spelling" className="group">
                            <motion.div
                                variants={itemVariants}
                                className="h-full p-6 rounded-2xl bg-card border border-border hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 text-orange-500 group-hover:scale-110 transition-transform">
                                    <Pencil size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Spelling</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Test your spelling skills
                                </p>
                                <div className="flex items-center text-orange-500 font-medium text-sm group-hover:gap-2 transition-all">
                                    Practice <ArrowRight size={14} className="ml-1" />
                                </div>
                            </motion.div>
                        </Link>

                        <Link href="/vocabulary/worksheets" className="group">
                            <motion.div
                                variants={itemVariants}
                                className="h-full p-6 rounded-2xl bg-card border border-border hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 text-cyan-500 group-hover:scale-110 transition-transform">
                                    <FileText size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Worksheets</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Download printable sheets
                                </p>
                                <div className="flex items-center text-cyan-500 font-medium text-sm group-hover:gap-2 transition-all">
                                    Download <ArrowRight size={14} className="ml-1" />
                                </div>
                            </motion.div>
                        </Link>

                        <Link href="/vocabulary/synonyms" className="group">
                            <motion.div
                                variants={itemVariants}
                                className="h-full p-6 rounded-2xl bg-card border border-border hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4 text-indigo-500 group-hover:scale-110 transition-transform">
                                    <Shuffle size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Synonyms</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Find similar meanings
                                </p>
                                <div className="flex items-center text-indigo-500 font-medium text-sm group-hover:gap-2 transition-all">
                                    Explore <ArrowRight size={14} className="ml-1" />
                                </div>
                            </motion.div>
                        </Link>

                        <Link href="/vocabulary/context" className="group">
                            <motion.div
                                variants={itemVariants}
                                className="h-full p-6 rounded-2xl bg-card border border-border hover:border-teal-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4 text-teal-500 group-hover:scale-110 transition-transform">
                                    <Layers size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Context Clues</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Fill in the blanks
                                </p>
                                <div className="flex items-center text-teal-500 font-medium text-sm group-hover:gap-2 transition-all">
                                    Practice <ArrowRight size={14} className="ml-1" />
                                </div>
                            </motion.div>
                        </Link>

                        <Link href="/vocabulary/dictionary" className="group">
                            <motion.div
                                variants={itemVariants}
                                className="h-full p-6 rounded-2xl bg-card border border-border hover:border-rose-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center mb-4 text-rose-500 group-hover:scale-110 transition-transform">
                                    <BookOpen size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Dictionary</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Search all words
                                </p>
                                <div className="flex items-center text-rose-500 font-medium text-sm group-hover:gap-2 transition-all">
                                    Search <ArrowRight size={14} className="ml-1" />
                                </div>
                            </motion.div>
                        </Link>

                        <Link href="/vocabulary/challenges" className="group">
                            <motion.div
                                variants={itemVariants}
                                className="h-full p-6 rounded-2xl bg-card border border-border hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 text-amber-500 group-hover:scale-110 transition-transform">
                                    <Target size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Challenges</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Daily vocabulary tasks
                                </p>
                                <div className="flex items-center text-amber-500 font-medium text-sm group-hover:gap-2 transition-all">
                                    Start <ArrowRight size={14} className="ml-1" />
                                </div>
                            </motion.div>
                        </Link>

                        <Link href="/vocabulary/categories" className="group">
                            <motion.div
                                variants={itemVariants}
                                className="h-full p-6 rounded-2xl bg-card border border-border hover:border-lime-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-lime-500/10 flex items-center justify-center mb-4 text-lime-500 group-hover:scale-110 transition-transform">
                                    <Filter size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Categories</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Browse by topic & level
                                </p>
                                <div className="flex items-center text-lime-500 font-medium text-sm group-hover:gap-2 transition-all">
                                    Browse <ArrowRight size={14} className="ml-1" />
                                </div>
                            </motion.div>
                        </Link>
                    </div>

                    {/* Quick Challenge Teaser */}
                    <motion.div variants={itemVariants} className="rounded-2xl bg-gradient-to-r from-indigo-900 to-purple-900 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-20">
                            <Brain size={150} />
                        </div>
                        <div className="relative z-10 max-w-2xl">
                            <h3 className="text-3xl font-bold mb-4">Ready for a quick challenge?</h3>
                            <p className="text-indigo-100 mb-8 text-lg">
                                Take a 2-minute speed quiz to test your current vocabulary level.
                            </p>
                            <Link href="/vocabulary/games/quiz">
                                <button className="bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-lg">
                                    Start Speed Quiz
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
