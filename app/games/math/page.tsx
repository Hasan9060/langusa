'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Timer, RefreshCw } from 'lucide-react';

export default function MathGame() {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [op, setOp] = useState('+');
    const [answer, setAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameOver, setGameOver] = useState(false);

    const generateProblem = () => {
        const ops = ['+', '-', '*'];
        const operation = ops[Math.floor(Math.random() * ops.length)];
        const n1 = Math.floor(Math.random() * 12) + 1;
        const n2 = Math.floor(Math.random() * 12) + 1;
        setNum1(n1);
        setNum2(n2);
        setOp(operation);
        setAnswer('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    useEffect(() => {
        if (timeLeft > 0 && !gameOver) {
            const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setGameOver(true);
        }
    }, [timeLeft, gameOver]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let correct = 0;
        switch (op) {
            case '+': correct = num1 + num2; break;
            case '-': correct = num1 - num2; break;
            case '*': correct = num1 * num2; break;
        }

        if (parseInt(answer) === correct) {
            setScore(s => s + 10);
            generateProblem();
        } else {
            // Shake effect or feedback could go here
            setScore(s => Math.max(0, s - 5));
            setAnswer('');
        }
    };

    return (
        <div className="min-h-screen bg-blue-950 text-blue-50 p-6 pt-28">
            <div className="max-w-md mx-auto">
                <Link href="/games" className="flex items-center text-blue-400 hover:text-blue-200 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Games
                </Link>

                <div className="bg-blue-900/50 p-8 rounded-3xl border border-blue-800 shadow-2xl text-center">
                    <div className="flex justify-between items-center mb-8">
                        <div className="text-2xl font-bold text-blue-400">Score: {score}</div>
                        <div className={`flex items-center gap-2 text-xl font-mono ${timeLeft < 10 ? 'text-red-400' : 'text-blue-300'}`}>
                            <Timer size={20} /> {timeLeft}s
                        </div>
                    </div>

                    {!gameOver ? (
                        <>
                            <div className="text-6xl font-bold mb-8 flex justify-center gap-4">
                                <span>{num1}</span>
                                <span className="text-blue-400">{op}</span>
                                <span>{num2}</span>
                                <span>=</span>
                                <span className="text-blue-300">?</span>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <input
                                    type="number"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    className="w-full bg-blue-950 border-2 border-blue-700 rounded-xl p-4 text-center text-3xl font-bold focus:border-blue-400 outline-none mb-4"
                                    autoFocus
                                    placeholder="?"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-colors"
                                >
                                    Submit
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="py-8">
                            <Calculator size={64} className="mx-auto mb-4 text-blue-400" />
                            <h2 className="text-3xl font-bold mb-2">Time's Up!</h2>
                            <p className="text-xl text-blue-300 mb-8">Final Score: {score}</p>
                            <button
                                onClick={() => {
                                    setGameOver(false);
                                    setTimeLeft(30);
                                    setScore(0);
                                    generateProblem();
                                }}
                                className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-colors"
                            >
                                <RefreshCw size={20} /> Play Again
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
