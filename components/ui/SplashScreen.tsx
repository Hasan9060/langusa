'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Sparkles } from 'lucide-react';

export default function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000); // Show for 2 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl"
                >
                    <div className="relative flex items-center justify-center">
                        {/* Outer rotating ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="w-32 h-32 rounded-full border-b-2 border-t-2 border-primary/30"
                        />

                        {/* Inner rotating ring (reverse) */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute w-24 h-24 rounded-full border-r-2 border-l-2 border-purple-500/30"
                        />

                        {/* Center Icon Animation */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: [0.5, 1.1, 1], opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute flex items-center justify-center"
                        >
                            <div className="relative">
                                <GraduationCap size={48} className="text-primary" />
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute -top-1 -right-1"
                                >
                                    <Sparkles size={20} className="text-yellow-500" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Loading Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 flex flex-col items-center gap-2"
                    >
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                            Watch to Lead
                        </h2>
                        <div className="flex items-center gap-1">
                            <span className="text-muted-foreground text-sm font-medium">Preparing your learning journey</span>
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.1 }}
                                className="text-primary text-lg leading-none"
                            >
                                .
                            </motion.span>
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.3 }}
                                className="text-primary text-lg leading-none"
                            >
                                .
                            </motion.span>
                            <motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                                className="text-primary text-lg leading-none"
                            >
                                .
                            </motion.span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
