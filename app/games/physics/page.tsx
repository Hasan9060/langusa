'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Car, Flag, Timer } from 'lucide-react';

const questions = [
    { q: "What is the formula for speed?", options: ["Distance / Time", "Time / Distance", "Distance * Time"], a: 0 },
    { q: "Which is a unit of force?", options: ["Joule", "Newton", "Watt"], a: 1 },
    { q: "What is the acceleration due to gravity on Earth?", options: ["9.8 m/s²", "10.5 m/s²", "8.9 m/s²"], a: 0 },
    { q: "Newton's First Law is also known as?", options: ["Law of Force", "Law of Inertia", "Law of Action-Reaction"], a: 1 },
    { q: "Kinetic energy depends on?", options: ["Height", "Velocity", "Shape"], a: 1 },
];

export default function PhysicsGame() {
    const [position, setPosition] = useState(0);
    const [qIndex, setQIndex] = useState(0);
    const [finished, setFinished] = useState(false);
    const [message, setMessage] = useState('');

    const handleAnswer = (index: number) => {
        if (index === questions[qIndex].a) {
            setPosition(prev => prev + 20);
            setMessage('Correct! Speed Boost! 🚀');
            if (qIndex + 1 < questions.length) {
                setTimeout(() => {
                    setQIndex(prev => prev + 1);
                    setMessage('');
                }, 1000);
            } else {
                setFinished(true);
            }
        } else {
            setMessage('Wrong! Try again. 🛑');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 pt-28">
            <div className="max-w-4xl mx-auto">
                <Link href="/games" className="flex items-center text-slate-400 hover:text-white mb-8">
                    <ArrowLeft className="mr-2" /> Back to Games
                </Link>

                <h1 className="text-4xl font-bold mb-8 text-center text-red-500 italic">SPEED RACER PHYSICS</h1>

                {/* Track */}
                <div className="relative h-32 bg-slate-800 rounded-xl mb-12 border-b-4 border-slate-700 overflow-hidden">
                    <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-600/50 -translate-y-1/2 border-dashed border-t-2 border-slate-500"></div>
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 text-red-500"
                        animate={{ left: `${position}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                    >
                        <Car size={64} />
                    </motion.div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-yellow-500">
                        <Flag size={48} />
                    </div>
                </div>

                {!finished ? (
                    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                        <div className="flex justify-between mb-6 text-slate-400">
                            <span>Question {qIndex + 1}/{questions.length}</span>
                            <span className="text-red-400 font-bold">{message}</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-8">{questions[qIndex].q}</h2>
                        <div className="grid gap-4">
                            {questions[qIndex].options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    className="p-4 bg-slate-700 hover:bg-red-600 rounded-xl transition-colors text-left font-semibold"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center bg-slate-800 p-12 rounded-2xl">
                        <h2 className="text-4xl font-bold text-yellow-500 mb-4">RACE COMPLETE! 🏆</h2>
                        <p className="text-xl text-slate-300 mb-8">You mastered the physics track!</p>
                        <button
                            onClick={() => { setPosition(0); setQIndex(0); setFinished(false); }}
                            className="px-8 py-3 bg-red-600 rounded-full font-bold hover:bg-red-500"
                        >
                            Race Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
