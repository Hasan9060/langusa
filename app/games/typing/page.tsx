'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Zap } from 'lucide-react';

export default function TypingGame() {
    const sentences = [
        "The quick brown fox jumps over the lazy dog",
        "Practice makes perfect in everything you do",
        "Learning to type fast improves productivity",
        "Education is the key to success in life",
    ];

    const [currentSentence, setCurrentSentence] = useState('');
    const [input, setInput] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const [score, setScore] = useState(0);
    const [wpm, setWpm] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (gameStarted && !gameOver) {
            setCurrentSentence(sentences[Math.floor(Math.random() * sentences.length)]);
        }
    }, [gameStarted, score]);

    useEffect(() => {
        if (gameStarted && timeLeft > 0 && !gameOver) {
            const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setGameOver(true);
        }
    }, [gameStarted, timeLeft, gameOver]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInput(value);

        if (value === currentSentence) {
            const words = currentSentence.split(' ').length;
            setScore(s => s + words);
            setWpm(Math.round((score + words) / ((60 - timeLeft) / 60)));
            setInput('');
            setCurrentSentence(sentences[Math.floor(Math.random() * sentences.length)]);
        }
    };

    return (
        <div className="min-h-screen bg-emerald-950 text-emerald-50 p-6 pt-28">
            <div className="max-w-3xl mx-auto">
                <Link href="/games" className="flex items-center text-emerald-400 hover:text-emerald-200 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Games
                </Link>

                <div className="text-center mb-12">
                    <Zap size={64} className="mx-auto mb-4 text-emerald-400" />
                    <h1 className="text-4xl font-bold mb-2">Speed Typing</h1>
                    <p className="text-emerald-300">Type as fast as you can!</p>
                </div>

                {!gameStarted ? (
                    <div className="text-center bg-emerald-900/50 p-12 rounded-2xl border border-emerald-800">
                        <h2 className="text-2xl font-bold mb-4">Ready to test your typing speed?</h2>
                        <p className="text-emerald-300 mb-8">You have 60 seconds. Type the sentences as fast as you can!</p>
                        <button
                            onClick={() => setGameStarted(true)}
                            className="px-8 py-3 bg-emerald-600 rounded-full font-bold hover:bg-emerald-500"
                        >
                            Start Game
                        </button>
                    </div>
                ) : !gameOver ? (
                    <div className="bg-emerald-900/50 p-8 rounded-2xl border border-emerald-800">
                        <div className="flex justify-between mb-6">
                            <div className="flex items-center gap-2 text-emerald-300">
                                <Clock size={20} />
                                <span className="font-mono text-xl">{timeLeft}s</span>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-emerald-400">WPM: {wpm}</div>
                                <div className="text-sm text-emerald-400">Words: {score}</div>
                            </div>
                        </div>

                        <div className="bg-emerald-950/50 p-6 rounded-xl mb-6 text-center">
                            <p className="text-2xl font-mono">{currentSentence}</p>
                        </div>

                        <input
                            type="text"
                            value={input}
                            onChange={handleInput}
                            className="w-full bg-emerald-950 border-2 border-emerald-700 rounded-xl p-4 text-xl font-mono focus:border-emerald-500 outline-none"
                            placeholder="Start typing..."
                            autoFocus
                        />
                    </div>
                ) : (
                    <div className="text-center bg-emerald-900/50 p-12 rounded-2xl border border-emerald-800">
                        <h2 className="text-4xl font-bold text-yellow-400 mb-4">Time's Up! ⚡</h2>
                        <div className="text-2xl mb-2">Words Typed: {score}</div>
                        <div className="text-3xl font-bold text-emerald-400 mb-8">WPM: {wpm}</div>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-emerald-600 rounded-full font-bold hover:bg-emerald-500"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
