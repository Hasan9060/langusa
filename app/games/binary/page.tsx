'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Binary, CheckCircle } from 'lucide-react';

export default function BinaryGame() {
    const [decimal, setDecimal] = useState(Math.floor(Math.random() * 256));
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const decimalToBinary = (num: number) => {
        return num.toString(2).padStart(8, '0');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const correctBinary = decimalToBinary(decimal);

        if (input === correctBinary) {
            setScore(s => s + 1);
            setFeedback('Correct! 🎉');
            setTimeout(() => {
                setDecimal(Math.floor(Math.random() * 256));
                setInput('');
                setFeedback('');
            }, 1000);
        } else {
            setFeedback(`Wrong! Correct answer: ${correctBinary}`);
            setTimeout(() => setFeedback(''), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-cyan-950 text-cyan-50 p-6 pt-28">
            <div className="max-w-2xl mx-auto">
                <Link href="/games" className="flex items-center text-cyan-400 hover:text-cyan-200 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Games
                </Link>

                <div className="text-center mb-12">
                    <Binary size={64} className="mx-auto mb-4 text-cyan-400" />
                    <h1 className="text-4xl font-bold mb-2">Binary Challenge</h1>
                    <p className="text-cyan-300">Convert decimal numbers to binary!</p>
                </div>

                <div className="bg-cyan-900/50 p-8 rounded-2xl border border-cyan-800">
                    <div className="text-center mb-8">
                        <div className="text-sm text-cyan-400 mb-2">Score: {score}</div>
                        <div className="text-6xl font-bold text-cyan-400 mb-4">{decimal}</div>
                        <p className="text-cyan-300">Convert to Binary (8 bits)</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value.replace(/[^01]/g, ''))}
                            maxLength={8}
                            className="w-full bg-cyan-950 border-2 border-cyan-700 rounded-xl p-4 text-center text-3xl font-mono focus:border-cyan-500 outline-none"
                            placeholder="00000000"
                            autoFocus
                        />

                        <button
                            type="submit"
                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-xl transition-colors"
                        >
                            Check Answer
                        </button>
                    </form>

                    {feedback && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-6 text-center font-bold text-lg ${feedback.includes('Correct') ? 'text-green-400' : 'text-red-400'
                                }`}
                        >
                            {feedback}
                        </motion.div>
                    )}

                    <div className="mt-8 p-4 bg-cyan-950/50 rounded-xl">
                        <h3 className="font-bold mb-2 text-cyan-400">Quick Reference:</h3>
                        <div className="grid grid-cols-4 gap-2 text-sm font-mono">
                            <div>1 = 0001</div>
                            <div>2 = 0010</div>
                            <div>4 = 0100</div>
                            <div>8 = 1000</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
