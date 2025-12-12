'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, CheckCircle, XCircle } from 'lucide-react';

const countries = [
    { name: 'France', capital: 'Paris', flag: '🇫🇷' },
    { name: 'Japan', capital: 'Tokyo', flag: '🇯🇵' },
    { name: 'Brazil', capital: 'Brasília', flag: '🇧🇷' },
    { name: 'Egypt', capital: 'Cairo', flag: '🇪🇬' },
    { name: 'Australia', capital: 'Canberra', flag: '🇦🇺' },
    { name: 'Canada', capital: 'Ottawa', flag: '🇨🇦' },
    { name: 'India', capital: 'New Delhi', flag: '🇮🇳' },
    { name: 'Germany', capital: 'Berlin', flag: '🇩🇪' },
];

export default function GeographyGame() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [options, setOptions] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        generateOptions();
    }, [currentIndex]);

    const generateOptions = () => {
        const correct = countries[currentIndex].capital;
        const wrong = countries
            .filter((_, i) => i !== currentIndex)
            .map(c => c.capital)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        setOptions([correct, ...wrong].sort(() => Math.random() - 0.5));
    };

    const handleAnswer = (answer: string) => {
        if (answer === countries[currentIndex].capital) {
            setScore(s => s + 10);
            setFeedback('Correct! 🎉');
        } else {
            setFeedback(`Wrong! It's ${countries[currentIndex].capital}`);
        }

        setTimeout(() => {
            setFeedback('');
            if (currentIndex + 1 < countries.length) {
                setCurrentIndex(i => i + 1);
            } else {
                setGameOver(true);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-blue-950 text-blue-50 p-6 pt-28">
            <div className="max-w-2xl mx-auto">
                <Link href="/games" className="flex items-center text-blue-400 hover:text-blue-200 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Games
                </Link>

                <div className="text-center mb-12">
                    <Globe size={64} className="mx-auto mb-4 text-blue-400" />
                    <h1 className="text-4xl font-bold mb-2">Geography Master</h1>
                    <p className="text-blue-300">Match countries with their capitals!</p>
                </div>

                {!gameOver ? (
                    <div className="bg-blue-900/50 p-8 rounded-2xl border border-blue-800">
                        <div className="flex justify-between mb-6 text-blue-300">
                            <span>Question {currentIndex + 1}/{countries.length}</span>
                            <span className="font-bold text-blue-400">Score: {score}</span>
                        </div>

                        <div className="text-center mb-8">
                            <div className="text-6xl mb-4">{countries[currentIndex].flag}</div>
                            <h2 className="text-3xl font-bold mb-2">{countries[currentIndex].name}</h2>
                            <p className="text-blue-300">What is the capital?</p>
                        </div>

                        {feedback && (
                            <div className={`text-center mb-4 font-bold text-lg ${feedback.includes('Correct') ? 'text-green-400' : 'text-red-400'}`}>
                                {feedback}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            {options.map((option, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(option)}
                                    disabled={!!feedback}
                                    className="p-4 bg-blue-800 hover:bg-blue-700 rounded-xl font-semibold transition-colors disabled:opacity-50"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center bg-blue-900/50 p-12 rounded-2xl border border-blue-800">
                        <h2 className="text-4xl font-bold text-yellow-400 mb-4">Game Complete! 🌍</h2>
                        <p className="text-2xl mb-8">Final Score: {score}/{countries.length * 10}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-blue-600 rounded-full font-bold hover:bg-blue-500"
                        >
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
