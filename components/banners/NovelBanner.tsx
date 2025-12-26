"use client";

import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export default function NovelBanner() {
  return (
    <section className="w-full bg-orange-100 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div>
          <span className="inline-block mb-4 text-sm font-semibold text-green-400">
            Classic Literature
          </span>

          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gray-900 dark:text-white">
            Great Expectations
          </h2>

          <p className="text-lg mb-8 text-gray-900 dark:text-white">
            Explore Charles Dickens’ timeless novel following Pip’s journey
            through ambition, love, and self-discovery.
          </p>

          <Link href="/novel/great-expectations">
            <button className="inline-flex items-center gap-3 px-6 py-3 bg-green-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition">
              <BookOpen size={20} />
              Read Novel
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>

        {/* Simple Book Card */}
        <div className="border border-white/10 rounded-lg p-8 text-center bg-slate-800">
          <h3 className="text-2xl font-serif font-bold text-green-200 mb-2">
            Great Expectations
          </h3>
          <p className="text-sm italic text-gray-300 mb-4">
            Charles Dickens
          </p>
          <div className="w-12 h-1 bg-amber-500 mx-auto mb-4" />
          <p className="text-xs text-gray-400 tracking-widest uppercase">
            XII Class Standard
          </p>
        </div>

      </div>
    </section>
  );
}
