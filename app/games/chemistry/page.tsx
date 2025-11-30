'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, FlaskConical, Check, X } from 'lucide-react';

const elements = [
    { name: 'Hydrogen', symbol: 'H' },
    { name: 'Helium', symbol: 'He' },
    { name: 'Carbon', symbol: 'C' },
    { name: 'Oxygen', symbol: 'O' },
    { name: 'Gold', symbol: 'Au' },
    { name: 'Silver', symbol: 'Ag' },
    { name: 'Iron', symbol: 'Fe' },
    { name: 'Sodium', symbol: 'Na' },
];

export default function ChemistryGame() {
    const [items, setItems] = useState([...elements].sort(() => Math.random() - 0.5));
    const [selected, setSelected] = useState<string | null>(null);
    const [matched, setMatched] = useState<string[]>([]);

    const handleSelect = (val: string) => {
        if (!selected) {
            setSelected(val);
        } else {
            const isMatch = elements.some(e =>
                (e.name === selected && e.symbol === val) ||
                (e.name === val && e.symbol === selected)
            );

            if (isMatch) {
                setMatched(prev => [...prev, selected, val]);
            }
            setSelected(null);
        }
    };

    // Prepare grid items (names and symbols mixed)
    const gridItems = React.useMemo(() => {
        const all = elements.flatMap(e => [
            { id: e.name, val: e.name, type: 'name' },
            { id: e.symbol, val: e.symbol, type: 'symbol' }
        ]);
        return all.sort(() => Math.random() - 0.5);
    }, []);

    return (
        <div className="min-h-screen bg-teal-950 text-teal-50 p-6 pt-28">
            <div className="max-w-4xl mx-auto">
                <Link href="/games" className="flex items-center text-teal-400 hover:text-teal-200 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Games
                </Link>

                <div className="text-center mb-12">
                    <FlaskConical size={64} className="mx-auto mb-4 text-teal-400" />
                    <h1 className="text-4xl font-bold mb-2">Element Match</h1>
                    <p className="text-teal-300">Pair the element name with its chemical symbol.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {gridItems.map((item) => {
                        const isMatched = matched.includes(item.val);
                        const isSelected = selected === item.val;

                        if (isMatched) return <div key={item.id} className="h-24" />; // Placeholder

                        return (
                            <motion.button
                                key={item.id}
                                layout
                                onClick={() => handleSelect(item.val)}
                                className={`h-24 rounded-xl text-xl font-bold border-2 transition-all
                  ${isSelected
                                        ? 'bg-teal-500 text-white border-teal-400 scale-105 shadow-lg'
                                        : 'bg-teal-900/50 border-teal-800 hover:border-teal-500 hover:bg-teal-900'}
                `}
                            >
                                {item.val}
                            </motion.button>
                        );
                    })}
                </div>

                {matched.length === elements.length * 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mt-12 p-8 bg-teal-900 rounded-2xl border border-teal-700"
                    >
                        <h2 className="text-3xl font-bold mb-4">Reaction Complete! 🧪</h2>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-teal-500 text-teal-950 font-bold rounded-full hover:bg-teal-400"
                        >
                            Play Again
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
