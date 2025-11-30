'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, Check, X } from 'lucide-react';

const questions = [
    { q: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], a: 2 },
    { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], a: 1 },
    { q: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Rhino"], a: 1 },
    { q: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], a: 1 },
    { q: "What is H2O commonly known as?", options: ["Salt", "Sugar", "Water", "Air"], a: 2 },
];

export default function QuizGame() {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selected, setSelected] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswer = (index: number) => {
        if (isAnswered) return;
        setSelected(index);
        setIsAnswered(true);

        if (index === questions[current].a) {
            setScore(s => s + 1);
        }

        setTimeout(() => {
            if (current + 1 < questions.length) {
                setCurrent(c => c + 1);
                setSelected(null);
                setIsAnswered(false);
            } else {
                setShowResult(true);
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-purple-950 text-purple-50 p-6 pt-28">
            <div className="max-w-2xl mx-auto">
                <Link href="/games" className="flex items-center text-purple-400 hover:text-purple-200 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Games
                </Link>

                {!showResult ? (
                    <div className="bg-purple-900/50 p-8 rounded-3xl border border-purple-800 shadow-xl">
                        <div className="flex justify-between mb-6 text-purple-300 uppercase tracking-wider text-sm font-bold">
                            <span>Question {current + 1}/{questions.length}</span>
                            <span>Score: {score}</span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold mb-8">{questions[current].q}</h2>

                        <div className="grid gap-4">
                            {questions[current].options.map((opt, i) => {
                                let bg = "bg-purple-800 hover:bg-purple-700";
                                if (isAnswered) {
                                    if (i === questions[current].a) bg = "bg-green-600";
                                    else if (i === selected) bg = "bg-red-600";
                                    else bg = "bg-purple-800 opacity-50";
                                }

                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(i)}
                                        disabled={isAnswered}
                                        className={`p-4 rounded-xl text-left font-semibold transition-all ${bg}`}
                                    >
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="text-center bg-purple-900/50 p-12 rounded-3xl border border-purple-800">
                        <Trophy size={64} className="mx-auto mb-6 text-yellow-400" />
                        <h2 className="text-4xl font-bold mb-4">Quiz Completed!</h2>
                        <p className="text-2xl mb-8">You scored {score} out of {questions.length}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-500 transition-colors"
                        >
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
