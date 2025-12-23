"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, ArrowRight, Book } from "lucide-react";

export default function NovelBanner() {
    return (
        <section className="relative w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-20 px-6 md:px-16 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
                />
            </div>

            <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                {/* Left: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 text-center md:text-left z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
                    >
                        <Sparkles size={16} className="text-amber-400" />
                        <span className="text-white text-sm font-medium">Classic Literature</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-amber-100 via-white to-cyan-100 bg-clip-text text-transparent"
                    >
                        Great Expectations
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed font-light"
                    >
                        Dive into Charles Dickens's masterpiece. Follow Pip's journey of growth, love, and ambition in this interactive XII Book Novel experience.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <Link href="/novel/great-expectations">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 flex items-center gap-3 mx-auto md:mx-0"
                            >
                                <BookOpen size={24} className="group-hover:scale-110 transition-transform" />
                                Read Novel
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Right: Image with Animation */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 flex justify-center relative z-10"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative w-full max-w-md aspect-[3/4]"
                    >
                        {/* Glowing effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-cyan-500 rounded-lg blur-xl opacity-30 animate-pulse" />

                        {/* Book Cover Representation */}
                        <div className="relative h-full w-full rounded-lg overflow-hidden shadow-2xl border-2 border-white/10 bg-slate-800 flex flex-col items-center justify-center p-8 text-center">
                            {/* Since we don't have a specific book cover image, we'll design a nice CSS cover or use a generic one. 
                   Ideally, we'd use a real image, but for now I'll make a styled 'cover' */}
                            <div className="absolute inset-0 bg-[url('https://tse1.mm.bing.net/th/id/OIP.kioaQwxImsisnVZGF5wbHwHaL2?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3')] bg-cover opacity-20"></div>
                            <div className="relative z-10 border-4 border-double border-amber-500/50 w-full h-full flex flex-col items-center justify-center p-6">
                                <h3 className="text-3xl font-serif font-bold text-amber-100 mb-2">Great Expectations</h3>
                                <p className="text-sm font-serif italic text-cyan-200 mb-8">Charles Dickens</p>
                                <div className="w-16 h-1 bg-amber-500/50 mb-8"></div>
                                <p className="text-xs text-gray-400 uppercase tracking-widest">XII Class Standard</p>
                            </div>
                        </div>

                        {/* Floating icon */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 5, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl mb-4"
                        >
                            <Book size={32} className="text-white" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
