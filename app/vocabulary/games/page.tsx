'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layers, CheckSquare, Zap, ArrowLeft } from 'lucide-react';

const games = [
    {
        id: 'flashcards',
        title: 'Flashcards',
        description: 'Master words one by one with flip cards. Perfect for memorization.',
        icon: Layers,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        border: 'hover:border-blue-500/50',
        href: '/vocabulary/games/flashcards'
    },
    {
        id: 'quiz',
        title: 'Multiple Choice Quiz',
        description: 'Test your knowledge against the clock with multiple choice questions.',
        icon: CheckSquare,
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        border: 'hover:border-green-500/50',
        href: '/vocabulary/games/quiz'
    },
    {
        id: 'matching',
        title: 'Word Match',
        description: 'Connect words with their definitions in this fast-paced puzzle.',
        icon: Zap,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
        border: 'hover:border-purple-500/50',
        href: '/vocabulary/games/matching'
    }
];

export default function GamesPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <Link href="/vocabulary" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Vocabulary
                </Link>

                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Vocabulary Games</h1>
                    <p className="text-xl text-muted-foreground">Choose a game mode to start practicing</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {games.map((game, index) => (
                        <Link href={game.href} key={game.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`h-full p-8 rounded-2xl bg-card border border-border ${game.border} transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer`}
                            >
                                <div className={`w-16 h-16 rounded-2xl ${game.bg} ${game.color} flex items-center justify-center mb-6`}>
                                    <game.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{game.title}</h3>
                                <p className="text-muted-foreground">{game.description}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
