'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Shapes, RotateCw } from 'lucide-react';

const shapes = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠'];

export default function PatternGame() {
    const [grid, setGrid] = useState(Array(25).fill(null));
    const [pattern, setPattern] = useState<number[]>([]);
    const [level, setLevel] = useState(1);
    const [showPattern, setShowPattern] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    const generatePattern = () => {
        const patternLength = 3 + level;
        const newPattern: number[] = [];
        for (let i = 0; i < patternLength; i++) {
            newPattern.push(Math.floor(Math.random() * 25));
        }
        setPattern(newPattern);
        setShowPattern(true);

        setTimeout(() => {
            setShowPattern(false);
        }, 2000 + level * 500);
    };

    const startGame = () => {
        setGameStarted(true);
        setGrid(Array(25).fill(null));
        setLevel(1);
        generatePattern();
    };

    const handleCellClick = (index: number) => {
        if (showPattern) return;

        const newGrid = [...grid];
        const currentShape = shapes[Math.floor(Math.random() * shapes.length)];
        newGrid[index] = currentShape;
        setGrid(newGrid);

        // Check if pattern matches
        const filledCells = newGrid.map((cell, i) => cell !== null ? i : -1).filter(i => i !== -1);

        if (filledCells.length === pattern.length) {
            const isCorrect = filledCells.every((cell, i) => cell === pattern[i]);

            if (isCorrect) {
                setTimeout(() => {
                    setLevel(l => l + 1);
                    setGrid(Array(25).fill(null));
                    generatePattern();
                }, 1000);
            } else {
                alert(`Game Over! You reached level ${level}`);
                setGameStarted(false);
            }
        }
    };

    const reset = () => {
        setGrid(Array(25).fill(null));
    };

    return (
        <div className="min-h-screen bg-rose-950 text-rose-50 p-6 pt-28">
            <div className="max-w-2xl mx-auto">
                <Link href="/games" className="flex items-center text-rose-400 hover:text-rose-200 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Games
                </Link>

                <div className="text-center mb-12">
                    <Shapes size={64} className="mx-auto mb-4 text-rose-400" />
                    <h1 className="text-4xl font-bold mb-2">Pattern Memory</h1>
                    <p className="text-rose-300">Remember the pattern and recreate it!</p>
                </div>

                {!gameStarted ? (
                    <div className="text-center bg-rose-900/50 p-12 rounded-2xl border border-rose-800">
                        <h2 className="text-2xl font-bold mb-4">How to Play</h2>
                        <p className="text-rose-300 mb-8">Watch the pattern, then click the same cells to recreate it!</p>
                        <button
                            onClick={startGame}
                            className="px-8 py-3 bg-rose-600 rounded-full font-bold hover:bg-rose-500"
                        >
                            Start Game
                        </button>
                    </div>
                ) : (
                    <div className="bg-rose-900/50 p-8 rounded-2xl border border-rose-800">
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-2xl font-bold text-rose-400">Level: {level}</div>
                            <button onClick={reset} className="p-2 bg-rose-800 rounded-lg hover:bg-rose-700">
                                <RotateCw size={20} />
                            </button>
                        </div>

                        {showPattern && (
                            <div className="text-center mb-4 text-yellow-400 font-bold text-lg animate-pulse">
                                Watch the pattern!
                            </div>
                        )}

                        <div className="grid grid-cols-5 gap-2 bg-rose-950 p-4 rounded-xl">
                            {grid.map((cell, i) => (
                                <motion.button
                                    key={i}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleCellClick(i)}
                                    className={`aspect-square rounded-lg text-4xl flex items-center justify-center transition-all ${showPattern && pattern.includes(i)
                                            ? 'bg-yellow-500'
                                            : 'bg-rose-800 hover:bg-rose-700'
                                        }`}
                                >
                                    {cell}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
