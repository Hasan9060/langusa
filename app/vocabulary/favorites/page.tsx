'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookMarked, Star } from 'lucide-react';
import { vocabularyData } from '@/lib/vocabularyData';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<typeof vocabularyData>([]);
    const [allWords] = useState(vocabularyData);

    const toggleFavorite = (word: typeof vocabularyData[0]) => {
        if (favorites.find(f => f.term === word.term)) {
            setFavorites(favorites.filter(f => f.term !== word.term));
        } else {
            setFavorites([...favorites, word]);
        }
    };

    const isFavorite = (term: string) => favorites.some(f => f.term === term);

    return (
        <div className="min-h-screen bg-background text-foreground p-6 pt-28">
            <div className="max-w-4xl mx-auto">
                <Link href="/vocabulary" className="flex items-center text-primary hover:text-primary/80 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Vocabulary
                </Link>

                <div className="text-center mb-12">
                    <BookMarked size={64} className="mx-auto mb-4 text-primary" />
                    <h1 className="text-4xl font-bold mb-2">My Favorites</h1>
                    <p className="text-muted-foreground">Save and review your favorite words</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Saved Words ({favorites.length})</h2>
                    {favorites.length === 0 ? (
                        <div className="text-center p-12 bg-card rounded-xl border border-border">
                            <p className="text-muted-foreground">No favorites yet. Start adding words below!</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {favorites.map((word) => (
                                <div key={word.term} className="bg-card p-6 rounded-xl border border-border">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold mb-2">{word.term}</h3>
                                            <p className="text-muted-foreground mb-2">{word.definition}</p>
                                            <p className="text-sm italic text-muted-foreground">{word.example}</p>
                                        </div>
                                        <button
                                            onClick={() => toggleFavorite(word)}
                                            className="p-2 hover:bg-secondary rounded-lg"
                                        >
                                            <Star className="fill-yellow-500 text-yellow-500" size={24} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">All Words</h2>
                    <div className="grid gap-4">
                        {allWords.map((word) => (
                            <div key={word.term} className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-2">{word.term}</h3>
                                        <p className="text-muted-foreground text-sm">{word.definition}</p>
                                    </div>
                                    <button
                                        onClick={() => toggleFavorite(word)}
                                        className="p-2 hover:bg-secondary rounded-lg"
                                    >
                                        <Star
                                            className={isFavorite(word.term) ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}
                                            size={20}
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
