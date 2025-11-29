'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Book, Filter } from 'lucide-react';
import { vocabularyData, levels, categories, Word } from '@/lib/vocabularyData';

export default function LearnPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLevel, setSelectedLevel] = useState<string>('All');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const filteredWords = vocabularyData.filter(word => {
        const matchesSearch = word.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            word.definition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLevel = selectedLevel === 'All' || word.level === selectedLevel;
        const matchesCategory = selectedCategory === 'All' || word.category === selectedCategory;

        return matchesSearch && matchesLevel && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <Link href="/vocabulary" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Vocabulary
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">Word Library</h1>
                        <p className="text-muted-foreground">Browse our complete collection of vocabulary words.</p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input
                            type="text"
                            placeholder="Search words..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 mr-4 text-muted-foreground">
                        <Filter size={20} />
                        <span className="font-medium">Filters:</span>
                    </div>

                    <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-card border border-border focus:border-primary outline-none cursor-pointer"
                    >
                        <option value="All">All Levels</option>
                        {levels.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 rounded-lg bg-card border border-border focus:border-primary outline-none cursor-pointer"
                    >
                        <option value="All">All Categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                {/* Word Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredWords.length > 0 ? (
                        filteredWords.map((word) => (
                            <motion.div
                                key={word.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-md mb-2 inline-block
                      ${word.level === 'Beginner' ? 'bg-green-500/10 text-green-500' :
                                                word.level === 'Intermediate' ? 'bg-blue-500/10 text-blue-500' :
                                                    'bg-purple-500/10 text-purple-500'}`}>
                                            {word.level}
                                        </span>
                                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{word.term}</h3>
                                    </div>
                                    <button className="text-muted-foreground hover:text-primary">
                                        <Book size={20} />
                                    </button>
                                </div>

                                <p className="text-muted-foreground mb-4 line-clamp-2">{word.definition}</p>

                                <div className="bg-secondary/50 p-3 rounded-lg text-sm italic text-muted-foreground border-l-2 border-primary/50">
                                    "{word.example}"
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-muted-foreground">
                            No words found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
