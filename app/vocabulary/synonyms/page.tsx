'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Shuffle, RotateCw } from 'lucide-react';
import { vocabularyData } from '@/lib/vocabularyData';

export default function SynonymsPage() {
    const synonyms: Record<string, string[]> = {
        'Happy': ['Joyful', 'Cheerful', 'Delighted', 'Content'],
        'Sad': ['Unhappy', 'Sorrowful', 'Melancholy', 'Dejected'],
        'Big': ['Large', 'Huge', 'Enormous', 'Massive'],
        'Small': ['Tiny', 'Little', 'Minute', 'Petite'],
        'Fast': ['Quick', 'Rapid', 'Swift', 'Speedy'],
        'Slow': ['Sluggish', 'Leisurely', 'Gradual', 'Unhurried'],
    };

    const words = Object.keys(synonyms);
    const [currentWord, setCurrentWord] = useState(words[0]);
    const [selected, setSelected] = useState<string[]>([]);
    const [score, setScore] = useState(0);

    const allOptions = [...synonyms[currentWord], 'Wrong1', 'Wrong2', 'Wrong3'].sort(() => Math.random() - 0.5);

    const handleSelect = (option: string) => {
        if (synonyms[currentWord].includes(option)) {
            if (!selected.includes(option)) {
                setSelected([...selected, option]);
                setScore(s => s + 1);
            }
        }
    };

    const nextWord = () => {
        const currentIndex = words.indexOf(currentWord);
        const nextIndex = (currentIndex + 1) % words.length;
        setCurrentWord(words[nextIndex]);
        setSelected([]);
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-6 pt-28">
            <div className="max-w-2xl mx-auto">
                <Link href="/vocabulary" className="flex items-center text-primary hover:text-primary/80 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Vocabulary
                </Link>

                <div className="text-center mb-12">
                    <Shuffle size={64} className="mx-auto mb-4 text-primary" />
                    <h1 className="text-4xl font-bold mb-2">Synonyms & Antonyms</h1>
                    <p className="text-muted-foreground">Find words with similar meanings</p>
                </div>

                <div className="bg-card p-8 rounded-2xl border border-border shadow-xl">
                    <div className="text-center mb-8">
                        <div className="text-sm text-muted-foreground mb-4">Score: {score}</div>
                        <h2 className="text-5xl font-bold mb-4 text-primary">{currentWord}</h2>
                        <p className="text-muted-foreground">Select all synonyms</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {allOptions.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSelect(option)}
                                className={`p-4 rounded-xl font-bold transition-all ${selected.includes(option)
                                        ? 'bg-green-500 text-white'
                                        : synonyms[currentWord].includes(option)
                                            ? 'bg-secondary hover:bg-secondary/80'
                                            : 'bg-secondary hover:bg-secondary/80'
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    <div className="text-center mb-4">
                        <div className="text-sm text-muted-foreground">
                            Found {selected.length} of {synonyms[currentWord].length} synonyms
                        </div>
                    </div>

                    <button
                        onClick={nextWord}
                        className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 flex items-center justify-center gap-2"
                    >
                        <RotateCw size={20} />
                        Next Word
                    </button>
                </div>
            </div>
        </div>
    );
}
