'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, RotateCcw } from 'lucide-react';

export default function LogicGame() {
    // 3x3 grid, true = on, false = off
    const [grid, setGrid] = useState(Array(9).fill(false));
    const [moves, setMoves] = useState(0);

    const toggle = (index: number) => {
        const newGrid = [...grid];
        const size = 3;
        const row = Math.floor(index / size);
        const col = index % size;

        // Toggle clicked and neighbors
        const indices = [
            index, // center
            row > 0 ? index - size : null, // up
            row < size - 1 ? index + size : null, // down
            col > 0 ? index - 1 : null, // left
            col < size - 1 ? index + 1 : null // right
        ];

        indices.forEach(i => {
            if (i !== null) newGrid[i] = !newGrid[i];
        });

        setGrid(newGrid);
        setMoves(m => m + 1);
    };

    const isWin = grid.every(cell => cell === true);

    const reset = () => {
        setGrid(Array(9).fill(false));
        setMoves(0);
    };

    return (
        <div className="min-h-screen bg-indigo-950 text-indigo-50 p-6 pt-28">
            <div className="max-w-md mx-auto">
                <Link href="/games" className="flex items-center text-indigo-400 hover:text-indigo-200 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Games
                </Link>

                <div className="text-center mb-8">
                    <Lightbulb size={48} className={`mx-auto mb-4 ${isWin ? 'text-yellow-400' : 'text-indigo-400'}`} />
                    <h1 className="text-3xl font-bold mb-2">Lights On</h1>
                    <p className="text-indigo-300">Turn all the lights ON. Clicking a light toggles it and its neighbors.</p>
                </div>

                <div className="flex justify-between items-center mb-6 px-4">
                    <div className="font-mono text-xl">Moves: {moves}</div>
                    <button onClick={reset} className="p-2 bg-indigo-800 rounded-lg hover:bg-indigo-700">
                        <RotateCcw size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-4 bg-indigo-900 p-6 rounded-2xl shadow-xl">
                    {grid.map((isOn, i) => (
                        <motion.button
                            key={i}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => !isWin && toggle(i)}
                            className={`aspect-square rounded-xl transition-all duration-300 shadow-lg
                ${isOn
                                    ? 'bg-yellow-400 shadow-yellow-400/50'
                                    : 'bg-indigo-800 shadow-indigo-950'}
              `}
                        />
                    ))}
                </div>

                {isWin && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 text-center p-6 bg-green-500/20 rounded-xl border border-green-500/50"
                    >
                        <h2 className="text-2xl font-bold text-green-400 mb-2">Puzzle Solved!</h2>
                        <p>You did it in {moves} moves.</p>
                        <button
                            onClick={reset}
                            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full font-bold hover:bg-green-500"
                        >
                            Play Again
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
