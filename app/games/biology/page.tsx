'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Dna, RefreshCw } from 'lucide-react';

const organisms = [
    { name: 'Human', kingdom: 'Animalia', type: 'Mammal' },
    { name: 'Oak Tree', kingdom: 'Plantae', type: 'Plant' },
    { name: 'Mushroom', kingdom: 'Fungi', type: 'Fungus' },
    { name: 'E. coli', kingdom: 'Bacteria', type: 'Bacteria' },
    { name: 'Eagle', kingdom: 'Animalia', type: 'Bird' },
    { name: 'Rose', kingdom: 'Plantae', type: 'Plant' },
    { name: 'Yeast', kingdom: 'Fungi', type: 'Fungus' },
    { name: 'Dolphin', kingdom: 'Animalia', type: 'Mammal' },
];

export default function BiologyGame() {
    const [current, setCurrent] = useState(organisms[0]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (timeLeft > 0 && !gameOver) {
            const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setGameOver(true);
        }
    }, [timeLeft, gameOver]);

    const handleAnswer = (kingdom: string) => {
        if (kingdom === current.kingdom) {
            setScore(s => s + 10);
            nextOrganism();
        }
    };

    const nextOrganism = () => {
        setCurrent(organisms[Math.floor(Math.random() * organisms.length)]);
    };

    return (
        <div className="min-h-screen bg-lime-950 text-lime-50 p-6 pt-28">
            <div className="max-w-2xl mx-auto">
                <Link href="/games" className="flex items-center text-lime-400 hover:text-lime-200 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Games
                </Link>

                <div className="text-center mb-12">
                    <Dna size={64} className="mx-auto mb-4 text-lime-400" />
                    <h1 className="text-4xl font-bold mb-2">Biology Quiz</h1>
                    <p className="text-lime-300">Classify organisms into their kingdoms!</p>
                </div>

                {!gameOver ? (
                    <div className="bg-lime-900/50 p-8 rounded-2xl border border-lime-800">
                        <div className="flex justify-between mb-6">
                            <div className="text-2xl font-bold text-lime-400">Score: {score}</div>
                            <div className="text-xl font-mono text-lime-400">{timeLeft}s</div>
                        </div>

                        <div className="text-center mb-8">
                            <div className="text-5xl mb-4">🧬</div>
                            <h2 className="text-3xl font-bold mb-2">{current.name}</h2>
                            <p className="text-lime-300">Which kingdom does it belong to?</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {['Animalia', 'Plantae', 'Fungi', 'Bacteria'].map((kingdom) => (
                                <button
                                    key={kingdom}
                                    onClick={() => handleAnswer(kingdom)}
                                    className="p-4 bg-lime-800 hover:bg-lime-700 rounded-xl font-bold transition-colors"
                                >
                                    {kingdom}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center bg-lime-900/50 p-12 rounded-2xl border border-lime-800">
                        <h2 className="text-4xl font-bold text-yellow-400 mb-4">Time's Up! 🧬</h2>
                        <p className="text-2xl mb-8">Final Score: {score}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-lime-600 rounded-full font-bold hover:bg-lime-500 flex items-center gap-2 mx-auto"
                        >
                            <RefreshCw size={20} /> Play Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
