'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, Check, X, HelpCircle } from 'lucide-react';
import { vocabularyData, Word } from '@/lib/vocabularyData';

export default function FlashcardsGame() {
    const [cards, setCards] = useState<Word[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [knownCount, setKnownCount] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        // Shuffle cards on mount
        const shuffled = [...vocabularyData].sort(() => Math.random() - 0.5);
        setCards(shuffled);
    }, []);

    const handleNext = (known: boolean) => {
        if (known) setKnownCount(prev => prev + 1);

        setIsFlipped(false);

        if (currentIndex + 1 < cards.length) {
            setTimeout(() => setCurrentIndex(prev => prev + 1), 200);
        } else {
            setIsGameOver(true);
        }
    };

    const restartGame = () => {
        const shuffled = [...vocabularyData].sort(() => Math.random() - 0.5);
        setCards(shuffled);
        setCurrentIndex(0);
        setKnownCount(0);
        setIsGameOver(false);
        setIsFlipped(false);
    };

    if (cards.length === 0) return null;

    const currentCard = cards[currentIndex];
    const progress = ((currentIndex) / cards.length) * 100;

    return (
        <div className="min-h-screen bg-background text-foreground p-6 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-4xl mb-8 flex items-center justify-between">
                <Link href="/vocabulary/games" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Exit Game
                </Link>
                <div className="text-sm font-medium text-muted-foreground">
                    Card {currentIndex + 1} of {cards.length}
                </div>
            </div>

            {!isGameOver ? (
                <div className="w-full max-w-2xl flex flex-col items-center">
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-secondary rounded-full mb-8 overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    {/* Card Container */}
                    <div className="perspective-1000 w-full h-[400px] relative cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
                        <motion.div
                            className="w-full h-full relative preserve-3d transition-all duration-500"
                            animate={{ rotateY: isFlipped ? 180 : 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Front of Card */}
                            <div className="absolute w-full h-full backface-hidden bg-card border border-border rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center hover:shadow-2xl transition-shadow">
                                <span className="absolute top-6 right-6 px-3 py-1 bg-secondary rounded-full text-xs font-medium text-muted-foreground">
                                    {currentCard.category}
                                </span>
                                <span className="absolute top-6 left-6 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                                    {currentCard.level}
                                </span>
                                <h2 className="text-5xl font-bold mb-4">{currentCard.term}</h2>
                                <p className="text-muted-foreground text-sm mt-4 flex items-center gap-2">
                                    <HelpCircle size={14} /> Tap to flip
                                </p>
                            </div>

                            {/* Back of Card */}
                            <div
                                className="absolute w-full h-full backface-hidden bg-gradient-to-br from-primary/5 to-card border border-primary/20 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center"
                                style={{ transform: 'rotateY(180deg)' }}
                            >
                                <h3 className="text-2xl font-bold mb-4 text-primary">{currentCard.term}</h3>
                                <p className="text-xl mb-6 leading-relaxed">"{currentCard.definition}"</p>
                                <div className="bg-background/50 p-4 rounded-xl w-full max-w-md border border-border/50">
                                    <p className="text-muted-foreground italic">
                                        <span className="font-semibold not-italic text-foreground mr-2">Ex:</span>
                                        {currentCard.example}
                                    </p>
                                </div>
                                <div className="mt-6 flex gap-2 flex-wrap justify-center">
                                    {currentCard.synonyms.map(syn => (
                                        <span key={syn} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">
                                            {syn}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-6 mt-10">
                        <button
                            onClick={(e) => { e.stopPropagation(); handleNext(false); }}
                            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all hover:scale-105 active:scale-95"
                        >
                            <X size={24} /> Still Learning
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); handleNext(true); }}
                            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-green-500/10 text-green-500 font-bold hover:bg-green-500 hover:text-white transition-all hover:scale-105 active:scale-95"
                        >
                            <Check size={24} /> I Know It
                        </button>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-card border border-border rounded-3xl p-12 text-center max-w-lg w-full shadow-2xl"
                >
                    <div className="w-20 h-20 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Trophy size={40} />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">Session Complete!</h2>
                    <p className="text-muted-foreground mb-8">Great job practicing your vocabulary.</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-secondary/50 p-4 rounded-xl">
                            <div className="text-3xl font-bold text-primary">{knownCount}</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider">Known</div>
                        </div>
                        <div className="bg-secondary/50 p-4 rounded-xl">
                            <div className="text-3xl font-bold text-muted-foreground">{cards.length - knownCount}</div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider">Learning</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={restartGame}
                            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={18} /> Practice Again
                        </button>
                        <Link href="/vocabulary/games">
                            <button className="w-full py-3 bg-secondary text-secondary-foreground rounded-xl font-bold hover:bg-secondary/80 transition-colors">
                                Choose Another Game
                            </button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

function Trophy({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
    );
}
