'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Trophy } from 'lucide-react';
import { vocabularyData } from '@/lib/vocabularyData';

export default function ChallengesPage() {
    const [currentChallenge, setCurrentChallenge] = useState(0);
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState<number[]>([]);

    const challenges = [
        {
            title: 'Speed Round',
            description: 'Answer 10 questions in 60 seconds',
            icon: '⚡',
            difficulty: 'Easy',
            points: 50
        },
        {
            title: 'Perfect Match',
            description: 'Get 5 correct answers in a row',
            icon: '🎯',
            difficulty: 'Medium',
            points: 100
        },
        {
            title: 'Master Challenge',
            description: 'Score 100% on advanced words',
            icon: '👑',
            difficulty: 'Hard',
            points: 200
        },
        {
            title: 'Word Marathon',
            description: 'Learn 50 new words',
            icon: '🏃',
            difficulty: 'Medium',
            points: 150
        },
        {
            title: 'Category Expert',
            description: 'Master all words in one category',
            icon: '📚',
            difficulty: 'Hard',
            points: 180
        },
    ];

    const completeChallenge = (index: number) => {
        if (!completed.includes(index)) {
            setCompleted([...completed, index]);
            setScore(s => s + challenges[index].points);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-6 pt-28">
            <div className="max-w-4xl mx-auto">
                <Link href="/vocabulary" className="flex items-center text-primary hover:text-primary/80 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Vocabulary
                </Link>

                <div className="text-center mb-12">
                    <Target size={64} className="mx-auto mb-4 text-primary" />
                    <h1 className="text-4xl font-bold mb-2">Daily Challenges</h1>
                    <p className="text-muted-foreground">Complete challenges to earn points</p>
                </div>

                <div className="bg-card p-6 rounded-2xl border border-border shadow-xl mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-2xl font-bold">Your Score</h3>
                            <p className="text-muted-foreground">Total points earned</p>
                        </div>
                        <div className="text-5xl font-bold text-primary">{score}</div>
                    </div>
                </div>

                <div className="grid gap-6">
                    {challenges.map((challenge, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-card p-6 rounded-2xl border-2 transition-all ${completed.includes(index)
                                    ? 'border-green-500 bg-green-500/10'
                                    : 'border-border hover:border-primary/50'
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className="text-5xl">{challenge.icon}</div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2">{challenge.title}</h3>
                                        <p className="text-muted-foreground mb-4">{challenge.description}</p>
                                        <div className="flex gap-2">
                                            <span className={`px-3 py-1 rounded-full text-sm ${challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-500' :
                                                    challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
                                                        'bg-red-500/20 text-red-500'
                                                }`}>
                                                {challenge.difficulty}
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
                                                {challenge.points} pts
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {completed.includes(index) ? (
                                    <div className="flex items-center gap-2 text-green-500">
                                        <Trophy size={24} />
                                        <span className="font-bold">Completed!</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => completeChallenge(index)}
                                        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90"
                                    >
                                        Start
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
