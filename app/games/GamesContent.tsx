'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Car,
    FlaskConical,
    Calculator,
    Languages,
    Trophy,
    Puzzle,
    Microscope,
    BrainCircuit,
    ArrowRight,
    Gamepad2,
    Globe,
    Zap,
    History,
    Music,
    Shapes,
    Binary,
    Dna,
    Palette
} from 'lucide-react';

const games = [
    {
        id: 'physics',
        title: 'Physics Racer',
        description: 'Answer motion and speed questions to boost your car to the finish line!',
        icon: Car,
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        href: '/games/physics'
    },
    {
        id: 'chemistry',
        title: 'Element Match',
        description: 'Master the periodic table by matching elements to their symbols.',
        icon: FlaskConical,
        color: 'text-teal-500',
        bg: 'bg-teal-500/10',
        href: '/games/chemistry'
    },
    {
        id: 'math',
        title: 'Number Ninja',
        description: 'Slice through arithmetic challenges against the clock.',
        icon: Calculator,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        href: '/games/math'
    },
    {
        id: 'english',
        title: 'Word Scramble',
        description: 'Unscramble letters to form correct English words.',
        icon: Languages,
        color: 'text-yellow-500',
        bg: 'bg-yellow-500/10',
        href: '/games/english'
    },
    {
        id: 'quiz',
        title: 'Knowledge Quest',
        description: 'Test your general knowledge across various subjects.',
        icon: Trophy,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
        href: '/games/quiz'
    },
    {
        id: 'logic',
        title: 'Logic Lab',
        description: 'Solve brain-teasing puzzles to unlock the next level.',
        icon: Puzzle,
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10',
        href: '/games/logic'
    },
    {
        id: 'science',
        title: 'Reaction Lab',
        description: 'Mix virtual chemicals and observe the reactions.',
        icon: Microscope,
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        href: '/games/science'
    },
    {
        id: 'memory',
        title: 'Brain Boost',
        description: 'Test and improve your memory with card matching.',
        icon: BrainCircuit,
        color: 'text-pink-500',
        bg: 'bg-pink-500/10',
        href: '/games/memory'
    },
    {
        id: 'geography',
        title: 'Geography Master',
        description: 'Match countries with their capitals around the world!',
        icon: Globe,
        color: 'text-sky-500',
        bg: 'bg-sky-500/10',
        href: '/games/geography'
    },
    {
        id: 'typing',
        title: 'Speed Typing',
        description: 'Test your typing speed and accuracy in this fast-paced challenge!',
        icon: Zap,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        href: '/games/typing'
    },
    {
        id: 'history',
        title: 'Timeline Challenge',
        description: 'Arrange historical events in the correct chronological order.',
        icon: History,
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        href: '/games/history'
    },
    {
        id: 'music',
        title: 'Musical Memory',
        description: 'Remember and repeat musical sequences in this Simon-style game!',
        icon: Music,
        color: 'text-violet-500',
        bg: 'bg-violet-500/10',
        href: '/games/music'
    },
    {
        id: 'pattern',
        title: 'Pattern Memory',
        description: 'Watch the pattern and recreate it from memory!',
        icon: Shapes,
        color: 'text-rose-500',
        bg: 'bg-rose-500/10',
        href: '/games/pattern'
    },
    {
        id: 'binary',
        title: 'Binary Challenge',
        description: 'Convert decimal numbers to binary and master computer math!',
        icon: Binary,
        color: 'text-cyan-500',
        bg: 'bg-cyan-500/10',
        href: '/games/binary'
    },
    {
        id: 'biology',
        title: 'Biology Quiz',
        description: 'Classify organisms into their correct biological kingdoms!',
        icon: Dna,
        color: 'text-lime-500',
        bg: 'bg-lime-500/10',
        href: '/games/biology'
    },
    {
        id: 'art',
        title: 'Color Mixer',
        description: 'Mix primary colors to create beautiful new colors!',
        icon: Palette,
        color: 'text-fuchsia-500',
        bg: 'bg-fuchsia-500/10',
        href: '/games/art'
    }
];

export default function GamesContent() {
    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12 pt-28 md:pt-28">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary mb-6"
                    >
                        <Gamepad2 size={40} />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
                    >
                        Educational Games
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Learn while you play! Explore our collection of interactive games designed to make studying fun.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {games.map((game, index) => (
                        <Link href={game.href} key={game.id} className="group">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                            >
                                <div className={`w-14 h-14 rounded-xl ${game.bg} ${game.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <game.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{game.title}</h3>
                                <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                                    {game.description}
                                </p>
                                <div className={`flex items-center text-sm font-medium ${game.color} opacity-80 group-hover:opacity-100 group-hover:gap-2 transition-all`}>
                                    Play Now <ArrowRight size={16} className="ml-1" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
