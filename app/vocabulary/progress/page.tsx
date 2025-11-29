'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Target, Flame, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
    { name: 'Mon', words: 12 },
    { name: 'Tue', words: 19 },
    { name: 'Wed', words: 8 },
    { name: 'Thu', words: 24 },
    { name: 'Fri', words: 15 },
    { name: 'Sat', words: 30 },
    { name: 'Sun', words: 20 },
];

export default function ProgressPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <Link href="/vocabulary" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" /> Back to Vocabulary
                </Link>

                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Your Progress</h1>
                    <p className="text-muted-foreground">Track your learning journey and achievements.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatsCard
                        title="Total Words Learned"
                        value="128"
                        icon={Target}
                        color="text-blue-500"
                        bg="bg-blue-500/10"
                    />
                    <StatsCard
                        title="Current Streak"
                        value="7 Days"
                        icon={Flame}
                        color="text-orange-500"
                        bg="bg-orange-500/10"
                    />
                    <StatsCard
                        title="Quiz Accuracy"
                        value="85%"
                        icon={Trophy}
                        color="text-yellow-500"
                        bg="bg-yellow-500/10"
                    />
                    <StatsCard
                        title="Study Time"
                        value="4.5 Hrs"
                        icon={Calendar}
                        color="text-purple-500"
                        bg="bg-purple-500/10"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Chart Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 bg-card border border-border rounded-2xl p-8 shadow-sm"
                    >
                        <h3 className="text-xl font-bold mb-6">Weekly Activity</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="words" radius={[4, 4, 0, 0]}>
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 5 ? 'hsl(var(--primary))' : 'hsl(var(--muted))'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Recent Achievements */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-card border border-border rounded-2xl p-8 shadow-sm"
                    >
                        <h3 className="text-xl font-bold mb-6">Recent Achievements</h3>
                        <div className="space-y-6">
                            <AchievementItem
                                title="First Steps"
                                desc="Learned your first 10 words"
                                date="2 days ago"
                                icon={Target}
                                color="bg-blue-500"
                            />
                            <AchievementItem
                                title="Quiz Master"
                                desc="Scored 100% on a quiz"
                                date="Yesterday"
                                icon={Trophy}
                                color="bg-yellow-500"
                            />
                            <AchievementItem
                                title="Week Warrior"
                                desc="7 day login streak"
                                date="Today"
                                icon={Flame}
                                color="bg-orange-500"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon: Icon, color, bg }: any) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-card border border-border rounded-xl p-6 shadow-sm"
        >
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${bg} ${color}`}>
                    <Icon size={24} />
                </div>
            </div>
            <div className="text-3xl font-bold mb-1">{value}</div>
            <div className="text-sm text-muted-foreground">{title}</div>
        </motion.div>
    );
}

function AchievementItem({ title, desc, date, icon: Icon, color }: any) {
    return (
        <div className="flex items-start gap-4">
            <div className={`p-2 rounded-full ${color} text-white mt-1`}>
                <Icon size={16} />
            </div>
            <div>
                <h4 className="font-bold">{title}</h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
                <p className="text-xs text-muted-foreground mt-1">{date}</p>
            </div>
        </div>
    );
}
