'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, CheckCircle, XCircle, Trophy, AlertCircle } from 'lucide-react';
import { vocabularyData, Word } from '@/lib/vocabularyData';

export default function QuizGame() {
    const [questions, setQuestions] = useState<{ word: Word; options: Word[] }[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isAnswered, setIsAnswered] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        // Generate questions
        const shuffled = [...vocabularyData].sort(() => Math.random() - 0.5);
        const quizQuestions = shuffled.map(word => {
            const distractors = vocabularyData
                .filter(w => w.id !== word.id)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);

            const options = [...distractors, word].sort(() => Math.random() - 0.5);
            return { word, options };
        });
        setQuestions(quizQuestions);
    }, []);

    useEffect(() => {
        if (isAnswered || isGameOver) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleTimeOut();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestionIndex, isAnswered, isGameOver]);

    const handleTimeOut = () => {
        setIsAnswered(true);
        setSelectedOption(null); // No selection
    };

    const handleAnswer = (optionId: string) => {
        if (isAnswered) return;

        setSelectedOption(optionId);
        setIsAnswered(true);

        if (optionId === questions[currentQuestionIndex].word.id) {
            setScore(prev => prev + 100 + (timeLeft * 10)); // Bonus for speed
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(prev => prev + 1);
            setIsAnswered(false);
            setSelectedOption(null);
            setTimeLeft(15);
        } else {
            setIsGameOver(true);
        }
    };

    if (questions.length === 0) return null;

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-background text-foreground p-6 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-green-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-4xl mb-8 flex items-center justify-between">
                <Link href="/vocabulary/games" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Exit Quiz
                </Link>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-card border border-border rounded-full font-mono font-bold text-primary">
                        Score: {score}
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold ${timeLeft < 5 ? 'bg-red-500/10 text-red-500' : 'bg-secondary text-secondary-foreground'}`}>
                        <Clock size={16} /> {timeLeft}s
                    </div>
                </div>
            </div>

            {!isGameOver ? (
                <div className="w-full max-w-2xl">
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-secondary rounded-full mb-8 overflow-hidden">
                        <motion.div
                            className="h-full bg-green-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    {/* Question Card */}
                    <div className="bg-card border border-border rounded-3xl p-8 shadow-xl mb-6 text-center">
                        <span className="inline-block px-3 py-1 bg-secondary rounded-full text-xs font-medium text-muted-foreground mb-4">
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
                            Which word means: <br />
                            <span className="text-primary">"{currentQuestion.word.definition}"</span>?
                        </h2>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQuestion.options.map((option) => {
                            const isSelected = selectedOption === option.id;
                            const isCorrect = option.id === currentQuestion.word.id;

                            let buttonStyle = "bg-card border-border hover:border-primary/50 hover:bg-secondary/50";
                            if (isAnswered) {
                                if (isCorrect) buttonStyle = "bg-green-500/20 border-green-500 text-green-500";
                                else if (isSelected) buttonStyle = "bg-red-500/20 border-red-500 text-red-500";
                                else buttonStyle = "bg-card border-border opacity-50";
                            }

                            return (
                                <button
                                    key={option.id}
                                    onClick={() => handleAnswer(option.id)}
                                    disabled={isAnswered}
                                    className={`p-6 rounded-2xl border-2 text-lg font-bold transition-all duration-200 ${buttonStyle} ${!isAnswered && 'hover:-translate-y-1 hover:shadow-md'}`}
                                >
                                    {option.term}
                                    {isAnswered && isCorrect && <CheckCircle className="inline-block ml-2" size={20} />}
                                    {isAnswered && isSelected && !isCorrect && <XCircle className="inline-block ml-2" size={20} />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Feedback / Next Button */}
                    <AnimatePresence>
                        {isAnswered && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 flex justify-center"
                            >
                                <button
                                    onClick={nextQuestion}
                                    className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg"
                                >
                                    Next Question
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-card border border-border rounded-3xl p-12 text-center max-w-lg w-full shadow-2xl"
                >
                    <div className="w-24 h-24 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Trophy size={48} />
                    </div>
                    <h2 className="text-4xl font-bold mb-2">Quiz Complete!</h2>
                    <p className="text-muted-foreground mb-8">You've tested your vocabulary skills.</p>

                    <div className="bg-secondary/30 p-6 rounded-2xl mb-8 border border-border/50">
                        <div className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Final Score</div>
                        <div className="text-5xl font-black text-primary">{score}</div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link href="/vocabulary/games/quiz">
                            <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                <AlertCircle size={18} /> Try Again
                            </button>
                        </Link>
                        <Link href="/vocabulary/games">
                            <button className="w-full py-3 bg-secondary text-secondary-foreground rounded-xl font-bold hover:bg-secondary/80 transition-colors">
                                Choose Another Game
                            </button>
                        </Link>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
