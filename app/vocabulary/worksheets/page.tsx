'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Download } from 'lucide-react';
import { vocabularyData } from '@/lib/vocabularyData';

export default function WorksheetsPage() {
    const [selectedLevel, setSelectedLevel] = useState<string>('All');
    const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

    const filteredWords = selectedLevel === 'All'
        ? vocabularyData
        : vocabularyData.filter(w => w.level === selectedLevel);

    const generateWorksheet = () => {
        const content = filteredWords.map((word, i) =>
            `${i + 1}. ${word.term}\n   Definition: ${word.definition}\n   Example: ${word.example}\n\n`
        ).join('');

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vocabulary-worksheet-${selectedLevel.toLowerCase()}.txt`;
        a.click();
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-6 pt-28">
            <div className="max-w-4xl mx-auto">
                <Link href="/vocabulary" className="flex items-center text-primary hover:text-primary/80 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Vocabulary
                </Link>

                <div className="text-center mb-12">
                    <FileText size={64} className="mx-auto mb-4 text-primary" />
                    <h1 className="text-4xl font-bold mb-2">Worksheets</h1>
                    <p className="text-muted-foreground">Download printable vocabulary worksheets</p>
                </div>

                <div className="bg-card p-8 rounded-2xl border border-border shadow-xl mb-8">
                    <div className="flex gap-4 mb-6">
                        {levels.map((level) => (
                            <button
                                key={level}
                                onClick={() => setSelectedLevel(level)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedLevel === level
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>

                    <div className="mb-6">
                        <h3 className="font-bold mb-4">Preview ({filteredWords.length} words)</h3>
                        <div className="bg-secondary/50 p-6 rounded-xl max-h-96 overflow-y-auto">
                            {filteredWords.slice(0, 10).map((word, i) => (
                                <div key={word.term} className="mb-4 pb-4 border-b border-border last:border-0">
                                    <div className="font-bold">{i + 1}. {word.term}</div>
                                    <div className="text-sm text-muted-foreground">Definition: {word.definition}</div>
                                    <div className="text-sm text-muted-foreground italic">Example: {word.example}</div>
                                </div>
                            ))}
                            {filteredWords.length > 10 && (
                                <div className="text-center text-muted-foreground">
                                    ... and {filteredWords.length - 10} more words
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={generateWorksheet}
                        className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:bg-primary/90 flex items-center justify-center gap-2"
                    >
                        <Download size={20} />
                        Download Worksheet
                    </button>
                </div>
            </div>
        </div>
    );
}
