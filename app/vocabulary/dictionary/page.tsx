'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { vocabularyData } from '@/lib/vocabularyData';

export default function DictionaryPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const filteredWords = vocabularyData.filter(word =>
        word.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        word.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredWords.length / itemsPerPage);
    const displayedWords = filteredWords.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <div className="min-h-screen bg-background text-foreground p-6 pt-28">
            <div className="max-w-4xl mx-auto">
                <Link href="/vocabulary" className="flex items-center text-primary hover:text-primary/80 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Vocabulary
                </Link>

                <div className="text-center mb-12">
                    <BookOpen size={64} className="mx-auto mb-4 text-primary" />
                    <h1 className="text-4xl font-bold mb-2">Vocabulary Dictionary</h1>
                    <p className="text-muted-foreground">Search and explore all words</p>
                </div>

                <div className="mb-8">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(0);
                        }}
                        placeholder="Search words or definitions..."
                        className="w-full bg-card border-2 border-border rounded-xl p-4 focus:border-primary outline-none"
                    />
                </div>

                <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
                    <div className="divide-y divide-border">
                        {displayedWords.map((word) => (
                            <div key={word.term} className="p-6 hover:bg-secondary/50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-2xl font-bold">{word.term}</h3>
                                    <div className="flex gap-2">
                                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                                            {word.level}
                                        </span>
                                        <span className="px-2 py-1 rounded-full bg-secondary text-xs">
                                            {word.category}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-muted-foreground mb-2">{word.definition}</p>
                                <p className="text-sm italic text-muted-foreground">{word.example}</p>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-between items-center p-4 bg-secondary/50">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                                disabled={currentPage === 0}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={20} />
                                Previous
                            </button>
                            <span className="text-sm text-muted-foreground">
                                Page {currentPage + 1} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                                disabled={currentPage === totalPages - 1}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
