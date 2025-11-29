'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Gamepad2, Trophy, Brain, ArrowRight, Star, Sparkles } from 'lucide-react';
import { vocabularyData } from '@/lib/vocabularyData';

export default function VocabularyPage() {
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

                    {/* Word of the Day Card */}
                    <motion.div variants={itemVariants} className="w-full max-w-3xl mx-auto">
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-background border border-border/50 shadow-2xl p-8">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Sparkles size={120} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4 text-primary font-semibold tracking-wider uppercase text-sm">
                                    <Star className="w-4 h-4 fill-current" />
                                    Word of the Day
                                </div>
                                <h2 className="text-5xl font-bold mb-4 text-foreground">{wordOfDay.term}</h2>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                        {wordOfDay.level}
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium">
                                        {wordOfDay.category}
                                    </span>
                                </div>
                                <p className="text-2xl text-muted-foreground mb-6 italic">
                                    "{wordOfDay.definition}"
                                </p>
                                <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-primary">
                                    <p className="text-lg">
                                        <span className="font-semibold mr-2">Example:</span>
                                        {wordOfDay.example}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Main Actions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link href="/vocabulary/learn" className="group">
                            <motion.div
                                variants={itemVariants}
                                className="h-full p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                                    <BookOpen size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Start Learning</h3>
                                <p className="text-muted-foreground mb-6">
                                    Explore curated word lists categorized by difficulty and topic.
                                </p>
                                <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                                    Browse Words <ArrowRight size={16} className="ml-1" />
                                </div>
                            </motion.div>
                        </Link>

                        <Link href="/vocabulary/games" className="group">
                            <motion.div
                                variants={itemVariants}
                                className="h-full p-8 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
                                    <Gamepad2 size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Practice Games</h3>
                                <p className="text-muted-foreground mb-6">
                                    Test your knowledge with Flashcards, Quizzes, and Matching games.
                                </p>
                                <div className="flex items-center text-purple-500 font-medium group-hover:gap-2 transition-all">
                                    Play Now <ArrowRight size={16} className="ml-1" />
                                </div>
                            </motion.div>
                        </Link>

                        <Link href="/vocabulary/progress" className="group">
                            <motion.div
                                variants={itemVariants}
                                className="h-full p-8 rounded-2xl bg-card border border-border hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-6 text-green-500 group-hover:scale-110 transition-transform">
                                    <Trophy size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Your Progress</h3>
                                <p className="text-muted-foreground mb-6">
                                    Track your mastery, view achievements, and see your daily streaks.
                                </p>
                                <div className="flex items-center text-green-500 font-medium group-hover:gap-2 transition-all">
                                    View Stats <ArrowRight size={16} className="ml-1" />
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
