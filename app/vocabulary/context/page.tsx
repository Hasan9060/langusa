'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Layers, CheckCircle } from 'lucide-react';

const sentences = [
    { text: 'The cat sat on the mat', blanks: ['cat', 'sat', 'mat'] },
    { text: 'She walks to school every day', blanks: ['walks', 'school', 'day'] },
    { text: 'The sun rises in the east', blanks: ['sun', 'rises', 'east'] },
    { text: 'Birds fly in the sky', blanks: ['Birds', 'fly', 'sky'] },
];

export default function ContextPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [score, setScore] = useState(0);

    const current = sentences[currentIndex];
    const words = current.text.split(' ');

    const handleSubmit = () => {
        let correct = 0;
        current.blanks.forEach((blank, i) => {
            if (answers[i]?.toLowerCase() === blank.toLowerCase()) {
                correct++;
            }
        });

        if (correct === current.blanks.length) {
            setScore(s => s + 1);
            setTimeout(() => {
                if (currentIndex + 1 < sentences.length) {
                    setCurrentIndex(i => i + 1);
                    setAnswers({});
                }
            }, 1000);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-6 pt-28">
            <div className="max-w-2xl mx-auto">
                <Link href="/vocabulary" className="flex items-center text-primary hover:text-primary/80 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Vocabulary
                </Link>

                <div className="text-center mb-12">
                    <Layers size={64} className="mx-auto mb-4 text-primary" />
                    <h1 className="text-4xl font-bold mb-2">Context Clues</h1>
                    <p className="text-muted-foreground">Fill in the missing words</p>
                </div>

                <div className="bg-card p-8 rounded-2xl border border-border shadow-xl">
                    <div className="text-center mb-8">
                        <div className="text-sm text-muted-foreground mb-4">
                            Sentence {currentIndex + 1}/{sentences.length} | Score: {score}
                        </div>

                        <div className="bg-secondary/50 p-6 rounded-xl mb-6">
                            <div className="text-2xl flex flex-wrap gap-2 justify-center">
                                {words.map((word, i) => {
                                    const blankIndex = current.blanks.indexOf(word);
                                    if (blankIndex !== -1) {
                                        return (
                                            <input
                                                key={i}
                                                type="text"
                                                value={answers[blankIndex] || ''}
                                                onChange={(e) => setAnswers({ ...answers, [blankIndex]: e.target.value })}
                                                className="w-32 px-2 py-1 border-b-2 border-primary bg-transparent text-center focus:outline-none"
                                                placeholder="____"
                                            />
                                        );
                                    }
                                    return <span key={i}>{word}</span>;
                                })}
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90"
                        >
                            Check Answer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
