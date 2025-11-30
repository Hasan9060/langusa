'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { coursesData } from '@/lib/coursesData';

export default function CoursePage({ params }: { params: { slug: string } }) {
    const [activeTab, setActiveTab] = useState('OVERVIEW');
    const slug = params.slug;
    const course = coursesData[slug as keyof typeof coursesData];

    if (!course) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 font-sans pt-20 transition-colors duration-300">
            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2">
                            {/* Course Title and Tags */}
                            <div className="mb-8">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                    {course.title}
                                </h1>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {course.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 pt-6"></div>
                            </div>

                            {/* Tabs */}
                            <div className="mb-2">
                                <div className="flex border-b border-gray-200 dark:border-gray-700">
                                    <button
                                        className={`px-4 py-2 font-medium ${activeTab === 'OVERVIEW'
                                                ? 'text-green-500 border-b-2 border-green-500'
                                                : 'text-gray-500 dark:text-gray-400'
                                            }`}
                                        onClick={() => setActiveTab('OVERVIEW')}
                                    >
                                        OVERVIEW
                                    </button>
                                    <button
                                        className={`px-4 py-2 font-medium ${activeTab === 'CONTENT'
                                                ? 'text-green-500 border-b-2 border-green-500'
                                                : 'text-gray-500 dark:text-gray-400'
                                            }`}
                                        onClick={() => setActiveTab('CONTENT')}
                                    >
                                        CONTENT
                                    </button>
                                </div>

                                {/* Tab Content */}
                                {activeTab === 'OVERVIEW' && (
                                    <div className="py-6 space-y-8">
                                        {/* About Course */}
                                        <section>
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                                {course.about.heading}
                                            </h2>
                                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg transition-colors duration-300">
                                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                                    {course.about.description}
                                                </p>
                                                <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                                                    Course Highlights:
                                                </p>
                                                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                                                    {course.about.highlights.map((highlight, index) => (
                                                        <li key={index}>{highlight}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </section>

                                        {/* Key Features */}
                                        <section>
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="flex items-start">
                                                    <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg mr-4">
                                                        <svg
                                                            className="w-6 h-6 text-green-500 dark:text-green-200"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M8.5 13.5l2.5 3 3.5-4.5 4.5 6H5m16 1V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-gray-900 dark:text-white">
                                                            {course.features.access}
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-300">
                                                            {course.features.accessDesc}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Bonus Features */}
                                        <section>
                                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                                Additional Benefits
                                            </h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {course.benefits.map((benefit, index) => (
                                                    <div key={index} className="flex items-start">
                                                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mr-4">
                                                            <svg
                                                                className="w-5 h-5 text-gray-700 dark:text-gray-300"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-gray-900 dark:text-white">
                                                                {benefit.title}
                                                            </h3>
                                                            <p className="text-gray-600 dark:text-gray-300">
                                                                {benefit.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                )}

                                {activeTab === 'CONTENT' && (
                                    <div className="py-6">
                                        <p className="text-gray-600 dark:text-gray-300">
                                            All course modules and lessons will be displayed here.
                                        </p>
                                    </div>
                                )}
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        About Course Creator
                                    </h2>
                                    <div className="flex items-start">
                                        <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
                                            <Image
                                                src={course.creator.image}
                                                alt={course.creator.name}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                {course.creator.name}
                                            </h3>
                                            <p className="text-gray-600 font-medium">
                                                {course.creator.role}
                                            </p>
                                            <p className="text-gray-500 text-sm mt-1">
                                                <span>{course.creator.students}</span>
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-1">
                            <div className="top-24 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden transition-colors duration-300 sticky">
                                <div className="w-full bg-gray-200 dark:bg-gray-700">
                                    <Image
                                        src={course.card.image}
                                        alt={course.card.title}
                                        width={400}
                                        height={200}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                        {course.card.title}
                                    </h3>

                                    <div className="flex items-center mb-4">
                                        <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 mr-2">
                                            <span className="text-black dark:text-white">RS</span>{' '}
                                            {course.card.price}
                                        </div>
                                        <div className="text-lg text-red-500 line-through mr-2">
                                            RS {course.card.originalPrice}
                                        </div>
                                        <div className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
                                            {course.card.discountLabel}
                                        </div>
                                    </div>

                                    <a
                                        href={course.card.enrollLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-green-500 dark:bg-green-600 text-white py-3 rounded-lg font-medium text-center hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
                                    >
                                        Enroll Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
