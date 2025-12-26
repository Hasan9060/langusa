"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

export default function MoviesBanner() {
  return (
    <section className="w-full bg-pink-100 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="text-center md:text-left">
          <span className="inline-block mb-4 text-sm font-semibold text-green-400">
            Learn Through Entertainment
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Movies
          </h2>

          <p className="text-lg mb-8 leading-relaxed text-gray-900 dark:text-white">
            Improve your English skills by watching movies. Learn vocabulary,
            listening, and comprehension through engaging stories.
          </p>

          <Link href="/video">
            <button className="inline-flex items-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition">
              <Play size={20} />
              Watch Movies
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <div className="rounded-lg overflow-hidden border border-white/10 bg-slate-800">
            <Image
              src="https://miro.medium.com/v2/resize:fit:1200/1*j7sVQDpOCvrI3XrN4_8m6w.png"
              alt="Movies for learning"
              width={500}
              height={300}
              className="object-cover"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
