'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Microscope, RefreshCw } from 'lucide-react';

const colors = [
    { name: 'Red', hex: '#ef4444' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Yellow', hex: '#eab308' },
    { name: 'White', hex: '#ffffff' },
];

const recipes: Record<string, { name: string, hex: string }> = {
    'Red+Blue': { name: 'Purple', hex: '#a855f7' },
    'Blue+Red': { name: 'Purple', hex: '#a855f7' },
    'Red+Yellow': { name: 'Orange', hex: '#f97316' },
    'Yellow+Red': { name: 'Orange', hex: '#f97316' },
    'Blue+Yellow': { name: 'Green', hex: '#22c55e' },
    'Yellow+Blue': { name: 'Green', hex: '#22c55e' },
    'Red+White': { name: 'Pink', hex: '#ec4899' },
    'White+Red': { name: 'Pink', hex: '#ec4899' },
};

export default function ScienceGame() {
    const [beaker1, setBeaker1] = useState<typeof colors[0] | null>(null);
    const [beaker2, setBeaker2] = useState<typeof colors[0] | null>(null);
    const [result, setResult] = useState<{ name: string, hex: string } | null>(null);

    const addColor = (color: typeof colors[0]) => {
        if (!beaker1) setBeaker1(color);
        else if (!beaker2) setBeaker2(color);
    };

    const mix = () => {
        if (beaker1 && beaker2) {
            const key = `${beaker1.name}+${beaker2.name}`;
            const res = recipes[key] || { name: 'Muddy Brown', hex: '#78350f' };
            setResult(res);
        }
    };

    const reset = () => {
        setBeaker1(null);
        setBeaker2(null);
        setResult(null);
    };

    return (
        <div className="min-h-screen bg-green-950 text-green-50 p-6 pt-28">
            <div className="max-w-2xl mx-auto">
                <Link href="/games" className="flex items-center text-green-400 hover:text-green-200 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Games
                </Link>

                <div className="text-center mb-12">
                    <Microscope size={48} className="mx-auto mb-4 text-green-400" />
                    <h1 className="text-3xl font-bold mb-2">Reaction Lab</h1>
                    <p className="text-green-300">Mix two colors to discover a new compound.</p>
                </div>

                {/* Lab Table */}
                <div className="bg-green-900/50 p-8 rounded-3xl border border-green-800 shadow-xl mb-8 relative overflow-hidden">
                    <div className="flex justify-center items-end gap-8 h-48 mb-8">
                        {/* Beaker 1 */}
                        <div className="text-center">
                            <div className="w-20 h-24 border-b-4 border-x-4 border-white/20 rounded-b-xl relative overflow-hidden bg-white/5">
                                {beaker1 && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: '80%' }}
                                        className="absolute bottom-0 w-full"
                                        style={{ backgroundColor: beaker1.hex }}
                                    />
                                )}
                            </div>
                            <div className="mt-2 font-mono text-sm">{beaker1?.name || 'Empty'}</div>
                        </div>

                        <div className="text-2xl font-bold text-green-400 mb-8">+</div>

                        {/* Beaker 2 */}
                        <div className="text-center">
                            <div className="w-20 h-24 border-b-4 border-x-4 border-white/20 rounded-b-xl relative overflow-hidden bg-white/5">
                                {beaker2 && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: '80%' }}
                                        className="absolute bottom-0 w-full"
                                        style={{ backgroundColor: beaker2.hex }}
                                    />
                                )}
                            </div>
                            <div className="mt-2 font-mono text-sm">{beaker2?.name || 'Empty'}</div>
                        </div>

                        <div className="text-2xl font-bold text-green-400 mb-8">=</div>

                        {/* Result Flask */}
                        <div className="text-center">
                            <div className="w-24 h-32 border-b-4 border-x-4 border-white/20 rounded-full relative overflow-hidden bg-white/5 flex items-center justify-center">
                                {result && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-full h-full absolute top-0 left-0"
                                        style={{ backgroundColor: result.hex }}
                                    />
                                )}
                            </div>
                            <div className="mt-2 font-bold text-lg">{result?.name || '?'}</div>
                        </div>
                    </div>

                    {!result ? (
                        <div className="flex justify-center gap-4">
                            {colors.map(c => (
                                <button
                                    key={c.name}
                                    onClick={() => addColor(c)}
                                    disabled={!!beaker2}
                                    className="w-12 h-12 rounded-full border-2 border-white/20 shadow-lg hover:scale-110 transition-transform"
                                    style={{ backgroundColor: c.hex }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center">
                            <button
                                onClick={reset}
                                className="px-6 py-2 bg-green-600 text-white rounded-full font-bold hover:bg-green-500 flex items-center gap-2 mx-auto"
                            >
                                <RefreshCw size={16} /> Reset Experiment
                            </button>
                        </div>
                    )}

                    {beaker1 && beaker2 && !result && (
                        <div className="text-center mt-8">
                            <button
                                onClick={mix}
                                className="px-8 py-3 bg-green-500 text-green-950 font-bold rounded-xl hover:bg-green-400 animate-pulse"
                            >
                                MIX CHEMICALS
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
