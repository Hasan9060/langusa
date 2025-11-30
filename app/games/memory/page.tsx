'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BrainCircuit, RefreshCw } from 'lucide-react';

const icons = ['🍎', '🚗', '🐶', '⚽', '🎸', '✈️', '🌟', '🍕'];

export default function MemoryGame() {
    const [cards, setCards] = useState<{ id: number, content: string, flipped: boolean, matched: boolean }[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const duplicated = [...icons, ...icons];
        const shuffled = duplicated
            .sort(() => Math.random() - 0.5)
            .map((content, index) => ({
                id: index,
                content,
                flipped: false,
                matched: false
            }));

        setCards(shuffled);
        setFlipped([]);
        setMoves(0);
        setMatches(0);
    };

    const handleCardClick = (id: number) => {
        if (flipped.length === 2) return;
        if (cards[id].flipped || cards[id].matched) return;

        const newCards = [...cards];
        newCards[id].flipped = true;
        setCards(newCards);

        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            const [first, second] = newFlipped;

            if (newCards[first].content === newCards[second].content) {
                newCards[first].matched = true;
                newCards[second].matched = true;
                setCards(newCards);
                setMatches(m => m + 1);
                setFlipped([]);
            } else {
                setTimeout(() => {
                    const resetCards = [...cards];
                    resetCards[first].flipped = false;
                    resetCards[second].flipped = false;
                    setCards(resetCards);
                    setFlipped([]);
                }, 1000);
            }
        }
    };

    return (
        <div className="min-h-screen bg-pink-950 text-pink-50 p-6 pt-28">
            <div className="max-w-2xl mx-auto">
                <Link href="/games" className="flex items-center text-pink-400 hover:text-pink-200 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Games
                </Link>

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <BrainCircuit className="text-pink-400" /> Brain Boost
                        </h1>
                        <p className="text-pink-300 text-sm">Find all matching pairs.</p>
                    </div>
                    <div className="text-right">
                        <div className="font-mono text-xl font-bold text-pink-400">Moves: {moves}</div>
                        <div className="text-sm text-pink-300">Matches: {matches}/{icons.length}</div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-8">
                    {cards.map((card) => (
                        <motion.div
                            key={card.id}
                            className="aspect-square relative cursor-pointer perspective-1000"
                            onClick={() => handleCardClick(card.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                className="w-full h-full absolute rounded-xl shadow-lg transition-all duration-500 preserve-3d"
                                animate={{ rotateY: card.flipped ? 180 : 0 }}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Front (Hidden) */}
                                <div className="absolute w-full h-full backface-hidden bg-pink-800 border-2 border-pink-700 rounded-xl flex items-center justify-center">
                                    <BrainCircuit size={32} className="text-pink-900/50" />
                                </div>

                                {/* Back (Revealed) */}
                                <div
                                    className="absolute w-full h-full backface-hidden bg-pink-100 rounded-xl flex items-center justify-center text-4xl border-4 border-pink-400"
                                    style={{ transform: 'rotateY(180deg)' }}
                                >
                                    {card.content}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {matches === icons.length && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center bg-pink-900/50 p-8 rounded-3xl border border-pink-800"
                    >
                        <h2 className="text-3xl font-bold mb-4 text-pink-300">Memory Master! 🧠</h2>
                        <p className="mb-6">You cleared the board in {moves} moves.</p>
                        <button
                            onClick={startNewGame}
                            className="px-8 py-3 bg-pink-600 text-white font-bold rounded-full hover:bg-pink-500 flex items-center gap-2 mx-auto"
                        >
                            <RefreshCw size={20} /> Play Again
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
