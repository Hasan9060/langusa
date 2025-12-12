'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, History, CheckCircle } from 'lucide-react';

const events = [
    { year: 1492, event: 'Columbus discovers America', order: 1 },
    { year: 1776, event: 'American Independence', order: 2 },
    { year: 1914, event: 'World War I begins', order: 3 },
    { year: 1945, event: 'World War II ends', order: 4 },
    { year: 1969, event: 'Moon Landing', order: 5 },
    { year: 2001, event: '9/11 Attacks', order: 6 },
];

export default function HistoryGame() {
    const [items, setItems] = useState([...events].sort(() => Math.random() - 0.5));
    const [draggedItem, setDraggedItem] = useState<typeof events[0] | null>(null);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleDragStart = (item: typeof events[0]) => {
        setDraggedItem(item);
    };

    const handleDrop = (targetItem: typeof events[0]) => {
        if (!draggedItem) return;

        const newItems = [...items];
        const draggedIndex = newItems.findIndex(i => i.year === draggedItem.year);
        const targetIndex = newItems.findIndex(i => i.year === targetItem.year);

        newItems[draggedIndex] = targetItem;
        newItems[targetIndex] = draggedItem;

        setItems(newItems);
        setDraggedItem(null);

        // Check if correct order
        const correct = newItems.every((item, index) => item.order === index + 1);
        setIsCorrect(correct);
    };

    return (
        <div className="min-h-screen bg-amber-950 text-amber-50 p-6 pt-28">
            <div className="max-w-2xl mx-auto">
                <Link href="/games" className="flex items-center text-amber-400 hover:text-amber-200 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Games
                </Link>

                <div className="text-center mb-12">
                    <History size={64} className="mx-auto mb-4 text-amber-400" />
                    <h1 className="text-4xl font-bold mb-2">Timeline Challenge</h1>
                    <p className="text-amber-300">Arrange historical events in chronological order!</p>
                </div>

                <div className="bg-amber-900/50 p-8 rounded-2xl border border-amber-800">
                    <div className="space-y-4">
                        {items.map((item) => (
                            <motion.div
                                key={item.year}
                                draggable
                                onDragStart={() => handleDragStart(item)}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={() => handleDrop(item)}
                                whileHover={{ scale: 1.02 }}
                                className="bg-amber-800 p-4 rounded-xl cursor-move border-2 border-amber-700 hover:border-amber-500 transition-all"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-lg">{item.event}</span>
                                    <span className="text-amber-400 font-mono">{item.year}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {isCorrect && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-8 text-center p-6 bg-green-500/20 rounded-xl border border-green-500/50"
                        >
                            <CheckCircle size={48} className="mx-auto mb-4 text-green-400" />
                            <h2 className="text-2xl font-bold text-green-400 mb-2">Perfect! 🎉</h2>
                            <p className="text-green-300 mb-4">You arranged all events correctly!</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 bg-green-600 text-white rounded-full font-bold hover:bg-green-500"
                            >
                                Play Again
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
