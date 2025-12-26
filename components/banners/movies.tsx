"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

export default function MoviesBanner() {
  return (
    <section className="w-full bg-pink-50 dark:bg-pink-950/20 py-12 md:py-20 px-4 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">

        {/* Left Content */}
        <div className="text-center md:text-left order-2 md:order-1">
          <span className="inline-block mb-3 text-sm font-bold tracking-wider uppercase text-pink-600 dark:text-pink-400">
            Learn Through Entertainment
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 text-slate-900 dark:text-white">
            Movies
          </h2>

          <p className="text-base md:text-xl mb-8 leading-relaxed text-slate-600 dark:text-slate-300">
            Improve your English skills by watching movies. Learn vocabulary,
            listening, and comprehension through engaging stories.
          </p>

          <Link href="/video">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl font-bold shadow-lg shadow-pink-500/20 transition-all active:scale-95">
              <Play size={20} fill="currentColor" />
              Watch Movies
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex justify-center order-1 md:order-2">
          <div className="relative group w-full max-w-[500px]">
            <div className="absolute inset-0 bg-pink-500/20 blur-2xl rounded-full scale-75 group-hover:scale-100 transition-transform" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 transition-transform md:group-hover:-rotate-2">
              <Image
                src="https://miro.medium.com/v2/resize:fit:1200/1*j7sVQDpOCvrI3XrN4_8m6w.png"
                alt="Movies for learning"
                width={500}
                height={300}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
