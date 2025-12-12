'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Search } from 'lucide-react';
import { vocabularyData } from '@/lib/vocabularyData';

export default function CategoriesPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedLevel, setSelectedLevel] = useState<string>('All');

    const categories = ['All', ...Array.from(new Set(vocabularyData.map(w => w.category)))];
    const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

    const filteredWords = vocabularyData.filter(word => {
        const categoryMatch = selectedCategory === 'All' || word.category === selectedCategory;
        const levelMatch = selectedLevel === 'All' || word.level === selectedLevel;
        return categoryMatch && levelMatch;
    });

    const getCategoryCount = (category: string) => {
        return vocabularyData.filter(w => w.category === category).length;
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-6 pt-28">
            <div className="max-w-6xl mx-auto">
                <Link href="/vocabulary" className="flex items-center text-primary hover:text-primary/80 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Vocabulary
                </Link>

                <div className="text-center mb-12">
                    <Filter size={64} className="mx-auto mb-4 text-primary" />
                    <h1 className="text-4xl font-bold mb-2">Categories</h1>
                    <p className="text-muted-foreground">Browse words by category and level</p>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="md:col-span-1 bg-card p-6 rounded-2xl border border-border h-fit">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Filter size={20} />
                            Filters
                        </h3>

                        <div className="mb-6">
                            <h4 className="text-sm font-medium mb-2 text-muted-foreground">Category</h4>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory === category
                                                ? 'bg-primary text-primary-foreground'
                                                : 'hover:bg-secondary'
                                            }`}
                                    >
                                        {category}
                                        {category !== 'All' && (
                                            <span className="float-right text-sm opacity-70">
                                                {getCategoryCount(category)}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium mb-2 text-muted-foreground">Level</h4>
                            <div className="space-y-2">
                                {levels.map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setSelectedLevel(level)}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedLevel === level
                                                ? 'bg-primary text-primary-foreground'
                                                : 'hover:bg-secondary'
                                            }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <div className="mb-4 text-sm text-muted-foreground">
                            Showing {filteredWords.length} words
                        </div>
                        <div className="grid gap-4">
                            {filteredWords.map((word) => (
                                <motion.div
                                    key={word.term}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
                                >
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
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
