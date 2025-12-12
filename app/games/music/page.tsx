'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Music, Volume2 } from 'lucide-react';

const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-indigo-500', 'bg-purple-500'];

export default function MusicGame() {
    const [sequence, setSequence] = useState<number[]>([]);
    const [userSequence, setUserSequence] = useState<number[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [score, setScore] = useState(0);

    const playNote = (index: number) => {
        // Visual feedback
        const element = document.getElementById(`note-${index}`);
        if (element) {
            element.classList.add('scale-110');
            setTimeout(() => element.classList.remove('scale-110'), 200);
        }
    };

    const startGame = () => {
        setGameStarted(true);
        setScore(0);
        nextRound();
    };

    const nextRound = () => {
        const newNote = Math.floor(Math.random() * 7);
        const newSequence = [...sequence, newNote];
        setSequence(newSequence);
        setUserSequence([]);
        playSequence(newSequence);
    };

    const playSequence = async (seq: number[]) => {
        setIsPlaying(true);
        for (const note of seq) {
            playNote(note);
            await new Promise(resolve => setTimeout(resolve, 600));
        }
        setIsPlaying(false);
    };

    const handleNoteClick = (index: number) => {
        if (isPlaying) return;

        playNote(index);
        const newUserSequence = [...userSequence, index];
        setUserSequence(newUserSequence);

        if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
            alert(`Game Over! Score: ${score}`);
            setGameStarted(false);
            setSequence([]);
            setUserSequence([]);
            setScore(0);
        } else if (newUserSequence.length === sequence.length) {
            setScore(s => s + 1);
            setTimeout(nextRound, 1000);
        }
    };

    return (
        <div className="min-h-screen bg-violet-950 text-violet-50 p-6 pt-28">
            <div className="max-w-2xl mx-auto">
                <Link href="/games" className="flex items-center text-violet-400 hover:text-violet-200 mb-8">
                    <ArrowLeft className="mr-2" /> Back to Games
                </Link>

                <div className="text-center mb-12">
                    <Music size={64} className="mx-auto mb-4 text-violet-400" />
                    <h1 className="text-4xl font-bold mb-2">Musical Memory</h1>
                    <p className="text-violet-300">Remember and repeat the musical sequence!</p>
                </div>

                <div className="bg-violet-900/50 p-8 rounded-2xl border border-violet-800">
                    {!gameStarted ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4">How to Play</h2>
                            <p className="text-violet-300 mb-8">Watch the sequence, then repeat it by clicking the notes in order!</p>
                            <button
                                onClick={startGame}
                                className="px-8 py-3 bg-violet-600 rounded-full font-bold hover:bg-violet-500"
                            >
                                Start Game
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-8">
                                <div className="text-2xl font-bold text-violet-400">Level: {score + 1}</div>
                                <div className="text-sm text-violet-300 mt-2">
                                    {isPlaying ? 'Watch...' : 'Your turn!'}
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                {notes.map((note, index) => (
                                    <button
                                        key={note}
                                        id={`note-${index}`}
                                        onClick={() => handleNoteClick(index)}
                                        disabled={isPlaying}
                                        className={`${colors[index]} h-32 rounded-xl font-bold text-white text-2xl transition-transform hover:scale-105 disabled:opacity-50`}
                                    >
                                        {note}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
