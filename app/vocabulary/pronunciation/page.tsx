'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Mic, Volume2, CheckCircle, XCircle } from 'lucide-react';
import { vocabularyData } from '@/lib/vocabularyData';

export default function PronunciationPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isListening, setIsListening] = useState(false);

    const currentWord = vocabularyData[currentIndex];

    const speakWord = () => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(currentWord.term);
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleNext = () => {
        if (currentIndex + 1 < vocabularyData.length) {
            setCurrentIndex(i => i + 1);
        } else {
            setCurrentIndex(0);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-6 pt-28">
            <div className="max-w-2xl mx-auto">
                <Link href="/vocabulary" className="flex items-center text-primary hover:text-primary/80 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Vocabulary
                </Link>

                <div className="text-center mb-12">
                    <Mic size={64} className="mx-auto mb-4 text-primary" />
                    <h1 className="text-4xl font-bold mb-2">Pronunciation Practice</h1>
                    <p className="text-muted-foreground">Listen and practice speaking words correctly</p>
                </div>

                <div className="bg-card p-8 rounded-2xl border border-border shadow-xl">
                    <div className="text-center mb-8">
                        <div className="text-sm text-muted-foreground mb-2">
                            Word {currentIndex + 1} of {vocabularyData.length}
                        </div>
                        <h2 className="text-5xl font-bold mb-6 text-primary">{currentWord.term}</h2>

                        <button
                            onClick={speakWord}
                            className="mb-6 p-4 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
                        >
                            <Volume2 size={32} className="text-primary" />
                        </button>

                        <div className="bg-secondary/50 p-6 rounded-xl mb-6">
                            <p className="text-lg mb-2">{currentWord.definition}</p>
                            <p className="text-sm text-muted-foreground italic">{currentWord.example}</p>
                        </div>

                        <div className="flex gap-2 justify-center mb-4">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                                {currentWord.level}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                                {currentWord.category}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={handleNext}
                            className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
                        >
                            Next Word
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
