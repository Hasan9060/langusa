'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Palette, Sparkles } from 'lucide-react';

const colorMixing: Record<string, { result: string, color: string }> = {
    'Red+Blue': { result: 'Purple', color: '#a855f7' },
    'Blue+Red': { result: 'Purple', color: '#a855f7' },
    'Red+Yellow': { result: 'Orange', color: '#f97316' },
    'Yellow+Red': { result: 'Orange', color: '#f97316' },
    'Blue+Yellow': { result: 'Green', color: '#22c55e' },
    'Yellow+Blue': { result: 'Green', color: '#22c55e' },
};

const baseColors = [
    { name: 'Red', color: '#ef4444' },
    { name: 'Blue', color: '#3b82f6' },
    { name: 'Yellow', color: '#eab308' },
];

export default function ArtGame() {
    const [selected, setSelected] = useState<string[]>([]);
    const [result, setResult] = useState<{ name: string, color: string } | null>(null);
    const [score, setScore] = useState(0);

    const handleColorSelect = (color: string) => {
        if (selected.length < 2 && !selected.includes(color)) {
            const newSelected = [...selected, color];
            setSelected(newSelected);

            if (newSelected.length === 2) {
                const key = newSelected.join('+');
                const mix = colorMixing[key];
                if (mix) {
                    setResult({ name: mix.result, color: mix.color });
                    setScore(s => s + 10);
                } else {
                    setResult({ name: 'Brown', color: '#78350f' });
                }
            }
        }
    };

    const reset = () => {
        setSelected([]);
        setResult(null);
    };

    return (
        <div className="min-h-screen bg-fuchsia-950 text-fuchsia-50 p-6 pt-28">
            <div className="max-w-2xl mx-auto">
                <Link href="/games" className="flex items-center text-fuchsia-400 hover:text-fuchsia-200 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Games
                </Link>

                <div className="text-center mb-12">
                    <Palette size={64} className="mx-auto mb-4 text-fuchsia-400" />
                    <h1 className="text-4xl font-bold mb-2">Color Mixer</h1>
                    <p className="text-fuchsia-300">Mix colors to create new ones!</p>
                </div>

                <div className="bg-fuchsia-900/50 p-8 rounded-2xl border border-fuchsia-800">
                    <div className="text-center mb-8">
                        <div className="text-2xl font-bold text-fuchsia-400 mb-4">Score: {score}</div>
                        <p className="text-fuchsia-300">Select two colors to mix</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                        {baseColors.map((color) => (
                            <button
                                key={color.name}
                                onClick={() => handleColorSelect(color.name)}
                                disabled={selected.includes(color.name)}
                                className={`h-24 rounded-xl font-bold text-white text-xl transition-all ${selected.includes(color.name) ? 'ring-4 ring-white scale-105' : 'hover:scale-105'
                                    }`}
                                style={{ backgroundColor: color.color }}
                            >
                                {color.name}
                            </button>
                        ))}
                    </div>

                    {result && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-center mb-6"
                        >
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full" style={{ backgroundColor: baseColors.find(c => c.name === selected[0])?.color }} />
                                <Sparkles className="text-yellow-400" />
                                <div className="w-16 h-16 rounded-full" style={{ backgroundColor: baseColors.find(c => c.name === selected[1])?.color }} />
                                <span className="text-2xl">=</span>
                                <div className="w-24 h-24 rounded-full border-4 border-white" style={{ backgroundColor: result.color }} />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">{result.name}!</h3>
                        </motion.div>
                    )}

                    <button
                        onClick={reset}
                        className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-4 rounded-xl transition-colors"
                    >
                        Mix Again
                    </button>
                </div>
            </div>
        </div>
    );
}
