'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Languages, RefreshCw, CheckCircle } from 'lucide-react';

const words = [
    { original: "EDUCATION", hint: "Process of receiving or giving systematic instruction" },
    { original: "VOCABULARY", hint: "Body of words used in a particular language" },
    { original: "LEARNING", hint: "Acquisition of knowledge or skills" },
    { original: "STUDENT", hint: "A person who is studying at a school or college" },
    { original: "TEACHER", hint: "A person who teaches, especially in a school" },
    { original: "KNOWLEDGE", hint: "Facts, information, and skills acquired by a person" },
];

export default function EnglishGame() {
    const [currentWord, setCurrentWord] = useState(words[0]);
    const [scrambled, setScrambled] = useState('');
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);

    useEffect(() => {
        nextWord();
    }, []);

    const nextWord = () => {
        const word = words[Math.floor(Math.random() * words.length)];
        setCurrentWord(word);
        setScrambled(word.original.split('').sort(() => Math.random() - 0.5).join(''));
        setInput('');
        setMessage('');
    };

    const checkAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.toUpperCase() === currentWord.original) {
            setMessage('Correct! 🎉');
            setScore(s => s + 10);
            setTimeout(nextWord, 1500);
        } else {
            setMessage('Try again! ❌');
        }
    };

    return (
        <div className="min-h-screen bg-yellow-950 text-yellow-50 p-6 pt-28">
            <div className="max-w-md mx-auto">
                <Link href="/games" className="flex items-center text-yellow-400 hover:text-yellow-200 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Games
                </Link>

                <div className="bg-yellow-900/50 p-8 rounded-3xl border border-yellow-800 shadow-2xl text-center">
                    <Languages size={48} className="mx-auto mb-4 text-yellow-400" />
                    <h1 className="text-3xl font-bold mb-2">Word Scramble</h1>
                    <p className="text-yellow-300 mb-8">Unscramble the letters to find the word.</p>

                    <div className="text-sm font-mono text-yellow-400 mb-2">Score: {score}</div>

                    <motion.div
                        key={scrambled}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl font-bold tracking-widest mb-4 bg-yellow-950/50 p-4 rounded-xl border border-yellow-900"
                    >
                        {scrambled}
                    </motion.div>

                    <p className="text-sm text-yellow-300/70 italic mb-6">Hint: {currentWord.hint}</p>

                    <form onSubmit={checkAnswer}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full bg-yellow-950 border-2 border-yellow-800 rounded-xl p-4 text-center text-2xl font-bold focus:border-yellow-500 outline-none mb-4 uppercase"
                            placeholder="Type answer..."
                        />
                        <button
                            type="submit"
                            className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-4 rounded-xl transition-colors mb-4"
                        >
                            Check Answer
                        </button>
                    </form>

                    {message && (
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className={`font-bold text-lg ${message.includes('Correct') ? 'text-green-400' : 'text-red-400'}`}
                        >
                            {message}
                        </motion.div>
                    )}

                    <button
                        onClick={nextWord}
                        className="mt-6 text-sm text-yellow-400 hover:text-yellow-200 flex items-center justify-center gap-2 mx-auto"
                    >
                        <RefreshCw size={14} /> Skip Word
                    </button>
                </div>
            </div>
        </div>
    );
}
