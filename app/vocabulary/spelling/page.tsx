'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Pencil, CheckCircle } from 'lucide-react';
import { vocabularyData } from '@/lib/vocabularyData';

export default function SpellingPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [input, setInput] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [score, setScore] = useState(0);

    const currentWord = vocabularyData[currentIndex];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (input.toLowerCase() === currentWord.term.toLowerCase()) {
            setScore(s => s + 1);
            setFeedback('Correct! ✓');
            setTimeout(() => {
                if (currentIndex + 1 < vocabularyData.length) {
                    setCurrentIndex(i => i + 1);
                    setInput('');
                    setFeedback('');
                    setShowHint(false);
                }
            }, 1500);
        } else {
            setFeedback('Try again!');
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-6 pt-28">
            <div className="max-w-2xl mx-auto">
                <Link href="/vocabulary" className="flex items-center text-primary hover:text-primary/80 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Vocabulary
                </Link>

                <div className="text-center mb-12">
                    <Pencil size={64} className="mx-auto mb-4 text-primary" />
                    <h1 className="text-4xl font-bold mb-2">Spelling Practice</h1>
                    <p className="text-muted-foreground">Test your spelling skills</p>
                </div>

                <div className="bg-card p-8 rounded-2xl border border-border shadow-xl">
                    <div className="flex justify-between mb-6 text-sm">
                        <span>Word {currentIndex + 1}/{vocabularyData.length}</span>
                        <span className="font-bold text-primary">Score: {score}</span>
                    </div>

                    <div className="bg-secondary/50 p-6 rounded-xl mb-6 text-center">
                        <p className="text-lg mb-4">{currentWord.definition}</p>
                        <p className="text-sm italic text-muted-foreground mb-4">{currentWord.example}</p>

                        {showHint && (
                            <div className="text-2xl font-mono tracking-widest text-primary">
                                {currentWord.term.split('').map((char, i) => (
                                    <span key={i}>{i === 0 || i === currentWord.term.length - 1 ? char : '_'}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full bg-background border-2 border-border rounded-xl p-4 text-center text-2xl focus:border-primary outline-none"
                            placeholder="Type the word..."
                            autoFocus
                        />

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setShowHint(!showHint)}
                                className="flex-1 bg-secondary text-secondary-foreground py-3 rounded-xl font-bold hover:bg-secondary/80"
                            >
                                {showHint ? 'Hide' : 'Show'} Hint
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90"
                            >
                                Check
                            </button>
                        </div>
                    </form>

                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-4 text-center font-bold text-lg ${feedback.includes('Correct') ? 'text-green-500' : 'text-red-500'
                                }`}
                        >
                            {feedback}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
