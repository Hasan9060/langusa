"use client";

import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export default function NovelBanner() {
  return (
    <section className="w-full bg-orange-50 dark:bg-orange-950/20 py-12 md:py-20 px-4 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">

        {/* Text Content */}
        <div className="text-center md:text-left order-2 md:order-1">
          <span className="inline-block mb-3 text-sm font-bold tracking-wider uppercase text-amber-600 dark:text-amber-400">
            Classic Literature
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 text-slate-900 dark:text-white">
            Great Expectations
          </h2>

          <p className="text-base md:text-xl mb-8 leading-relaxed text-slate-600 dark:text-slate-300">
            Explore Charles Dickens’ timeless novel following Pip’s journey
            through ambition, love, and self-discovery.
          </p>

          <Link href="/novel/great-expectations">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold shadow-lg shadow-amber-500/20 transition-all active:scale-95">
              <BookOpen size={20} />
              Read Novel
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>

        {/* Book Card */}
        <div className="flex justify-center order-1 md:order-2">
          <div className="relative group w-full max-w-[400px]">
            <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full scale-75 group-hover:scale-100 transition-transform" />
            <div className="relative rounded-2xl p-8 md:p-12 text-center bg-slate-900 shadow-2xl border-4 border-slate-800 transition-transform md:group-hover:rotate-2">
              <div className="absolute top-0 right-0 p-4">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center shadow-lg">
                  <BookOpen size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-amber-100 mb-2">
                Great Expectations
              </h3>
              <p className="text-base italic text-amber-500/80 mb-6">
                Charles Dickens
              </p>
              <div className="w-16 h-1 bg-amber-600/50 mx-auto mb-6" />
              <p className="text-xs text-slate-400 tracking-[0.2em] uppercase font-bold">
                XII Class Standard
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
