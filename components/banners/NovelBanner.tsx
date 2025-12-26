"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, ArrowRight, Book } from "lucide-react";

export default function NovelBanner() {
  return (
    <section className="relative w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-20 px-6 md:px-16 overflow-hidden">
      
      {/* Subtle static background glow (NO animation) */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-2xl" />

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <Sparkles size={16} className="text-amber-400" />
            <span className="text-white text-sm font-medium">
              Classic Literature
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-amber-100 via-white to-cyan-100 bg-clip-text text-transparent">
            Great Expectations
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Dive into Charles Dickens's masterpiece. Follow Pip's journey of
            growth, love, and ambition in this interactive XII Book Novel.
          </p>

          <Link href="/novel/great-expectations">
            <button className="group px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full font-bold text-lg shadow-xl hover:scale-105 transition-transform flex items-center gap-3 mx-auto md:mx-0">
              <BookOpen size={22} />
              Read Novel
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>

        {/* Book Cover */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-[3/4] hover:scale-[1.02] transition-transform">

            {/* Soft glow (static) */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-cyan-500/30 rounded-lg blur-xl" />

            <div className="relative h-full w-full rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-slate-800 flex flex-col items-center justify-center p-8 text-center">
              <div className="absolute inset-0 bg-[url('https://tse1.mm.bing.net/th/id/OIP.kioaQwxImsisnVZGF5wbHwHaL2')] bg-cover opacity-20" />

              <div className="relative z-10 border-2 border-amber-500/40 w-full h-full flex flex-col items-center justify-center p-6">
                <h3 className="text-3xl font-serif font-bold text-amber-100 mb-2">
                  Great Expectations
                </h3>
                <p className="text-sm italic text-cyan-200 mb-6">
                  Charles Dickens
                </p>
                <div className="w-14 h-1 bg-amber-500/50 mb-6" />
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  XII Class Standard
                </p>
              </div>
            </div>

            {/* Static floating badge (no animation) */}
            <div className="absolute -top-5 -right-5 w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <Book size={28} className="text-white" />
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
