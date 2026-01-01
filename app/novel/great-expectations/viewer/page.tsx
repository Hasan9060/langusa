"use client";

import { useEffect } from "react";
import { ArrowLeft, Shield } from "lucide-react";

export default function NovelFullscreenPage() {
    useEffect(() => {
        // Basic protection for the viewer container
        const kill = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        window.addEventListener("contextmenu", kill, true);

        return () => {
            window.removeEventListener("contextmenu", kill, true);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-slate-950 flex flex-col z-[9999] overflow-hidden select-none">
            {/* Header */}
            <div className="h-16 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-[100] relative">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => window.close()}
                        className="p-2 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="h-8 w-[1px] bg-white/10 mx-2" />
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-amber-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">XII</div>
                        <div>
                            <h1 className="text-white font-bold text-sm tracking-tight uppercase">Great Expectations - Study Notes</h1>
                            <p className="text-amber-500 text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1">
                                <Shield size={10} /> Secure Educational Portal
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className="hidden md:flex px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-full border border-green-500/20 uppercase tracking-widest">
                        Interactive Mode
                    </span>
                    <button
                        onClick={() => window.close()}
                        className="bg-white hover:bg-slate-200 text-black text-[10px] font-black px-6 py-2 rounded uppercase transition-all shadow-lg active:scale-95"
                    >
                        Exit Notes
                    </button>
                </div>
            </div>

            {/* THE FLIPBOOK AREA */}
            <div className="flex-1 relative bg-[#1a1a1a]">
                <iframe
                    src="https://heyzine.com/flip-book/0dd83f31a5.html"
                    className="w-full h-full border-none"
                    allowFullScreen
                ></iframe>

                {/* Thin protection layer at top to prevent right-click on frame header */}
                <div className="absolute top-0 left-0 w-full h-1 z-50 pointer-events-auto" onContextMenu={(e) => e.preventDefault()} />
            </div>

            <style jsx global>{`
                body {
                    background: black !important;
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}
