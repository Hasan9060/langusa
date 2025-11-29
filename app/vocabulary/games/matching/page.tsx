'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw, Zap } from 'lucide-react';
import { vocabularyData, Word } from '@/lib/vocabularyData';

interface MatchItem {
    id: string;
    content: string;
    type: 'term' | 'definition';
    matched: boolean;
    wordId: string;
}

export default function MatchingGame() {
    const [items, setItems] = useState<MatchItem[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [matches, setMatches] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        // Pick 5 random words
        const gameWords = [...vocabularyData]
            .sort(() => Math.random() - 0.5)
            .slice(0, 5);

        const terms: MatchItem[] = gameWords.map(w => ({
            id: `term-${w.id}`,
            content: w.term,
            type: 'term',
            matched: false,
            wordId: w.id
        }));

        const definitions: MatchItem[] = gameWords.map(w => ({
            id: `def-${w.id}`,
            content: w.definition,
            type: 'definition',
            matched: false,
            wordId: w.id
        }));

        // Combine and shuffle
        const allItems = [...terms, ...definitions].sort(() => Math.random() - 0.5);

        setItems(allItems);
        setMatches(0);
        setAttempts(0);
        setIsGameOver(false);
        setSelectedId(null);
    };

    const handleItemClick = (id: string) => {
        if (selectedId === id) {
            setSelectedId(null); // Deselect
            return;
        }

        if (!selectedId) {
            setSelectedId(id); // Select first item
            return;
        }

        // Two items selected, check match
        const item1 = items.find(i => i.id === selectedId);
        const item2 = items.find(i => i.id === id);

        if (!item1 || !item2) return;

        setAttempts(prev => prev + 1);

        if (item1.wordId === item2.wordId && item1.type !== item2.type) {
            // Match found
            const newItems = items.map(i =>
                (i.id === item1.id || i.id === item2.id) ? { ...i, matched: true } : i
            );
            setItems(newItems);
            setMatches(prev => {
                const newMatches = prev + 1;
                if (newMatches === 5) {
                    setTimeout(() => setIsGameOver(true), 500);
                }
                return newMatches;
            });
        } else {
            // Mismatch - visual feedback could be added here
        }

        setSelectedId(null);
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-6 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-5xl mb-8 flex items-center justify-between">
                <Link href="/vocabulary/games" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Exit Game
                </Link>
                <div className="flex items-center gap-6">
                    <div className="text-center">
                        <div className="text-xs text-muted-foreground uppercase font-bold">Matches</div>
                        <div className="text-2xl font-bold text-primary">{matches}/5</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-muted-foreground uppercase font-bold">Attempts</div>
                        <div className="text-2xl font-bold">{attempts}</div>
                    </div>
                </div>
            </div>

            {!isGameOver ? (
                <div className="w-full max-w-5xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <AnimatePresence>
                            {items.map((item) => {
                                if (item.matched) return null; // Remove matched items

                                const isSelected = selectedId === item.id;
                                const isTerm = item.type === 'term';

                                return (
                                    <motion.button
                                        key={item.id}
                                        layout
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0, opacity: 0 }}
                                        onClick={() => handleItemClick(item.id)}
                                        className={`
                      p-4 rounded-xl border-2 font-medium text-sm md:text-base min-h-[100px] flex items-center justify-center text-center shadow-sm transition-all
                      ${isSelected
                                                ? 'border-primary bg-primary/10 text-primary scale-105 shadow-lg z-10'
                                                : 'border-border bg-card hover:border-primary/50 hover:bg-secondary/50'}
                      ${isTerm ? 'font-bold text-lg' : 'italic text-muted-foreground'}
                    `}
                                    >
                                        {item.content}
                                    </motion.button>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-card border border-border rounded-3xl p-12 text-center max-w-lg w-full shadow-2xl"
                >
                    <div className="w-24 h-24 bg-purple-500/20 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Zap size={48} />
                    </div>
                    <h2 className="text-4xl font-bold mb-2">All Matched!</h2>
                    <p className="text-muted-foreground mb-8">You cleared the board in {attempts} attempts.</p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={startNewGame}
                            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            <RefreshCw size={18} /> Play Again
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
