"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Rancho } from "next/font/google";

const rancho = Rancho({
  weight: "400",
  subsets: ["latin"],
});

const heroImages = ["/Images/hero/hero-image.png"];

const funFacts = [
  "Small steps lead to mastery.",
  "Read 20 min daily, grow your mind.",
  "Mistakes mean you're learning.",
  "Curiosity fuels lifelong learning.",
  "Knowledge compounds like interest.",
  "Asking questions shows intelligence.",
  "Challenges make your brain stronger.",
  "Write notes to remember better.",
  "Consistency beats cramming.",
  "Teach to learn faster.",
];

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const factInterval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 9000);
    return () => clearInterval(factInterval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center pt-24 overflow-hidden">
      {/* Floating background dots */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-3 h-3 bg-pink-600 dark:bg-yellow-600 rounded-full opacity-80 blur-sm animate-float",
              i % 3 === 0 && "w-4 h-4 opacity-40",
              i % 5 === 0 && "opacity-50 blur-md"
            )}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          />
        ))}

        {/* Gradient overlays */}
        <div className="absolute top-0 right-0 w-full h-[90%] bg-gradient-to-bl from-indigo-500/10 via-green-500/5 to-transparent rounded-bl-[100px]" />
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-bl from-indigo-500/10 via-green-500/5 to-transparent rounded-tr-[100px]" />
      </div>

      {/* Release bar */}
      <div className="w-full bg-red-700 text-white text-sm font-medium text-center py-1 px-2 truncate">
       Version 1.0 was launched! — Version 2.0 is on the way!
      </div>

      {/* Fun fact bar */}
      <div className="w-full bg-green-500 text-white text-sm font-medium text-center py-1 px-2 truncate transition-all">
        {funFacts[factIndex]}
      </div>

      {/* Main container */}
      <div className="container px-4 mx-auto flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6">
          {/* Left section */}
          <div
            className={cn(
              "flex flex-col justify-center transition-all duration-1000 transform",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              "text-center lg:text-left items-center lg:items-start"
            )}
          >
            <div className="mt-10 lg:mt-6 inline-flex items-center space-x-2 rounded-full px-3 py-1 text-sm bg-primary/10 text-primary mb-6 w-fit mx-auto lg:mx-0">
              <span>Your Journey to Fluent English Starts Here.</span>
            </div>

            <h1
              className={`${rancho.className} text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-3xl mx-auto lg:mx-0`}
            >
              Learn English online and improve your skills through our high-quality{" "}
              <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                courses{" "}
                <span className="text-black dark:text-white">and</span> resources.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Everything you find here has been specially created by Watch to Lead.
            </p>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
              <Link href="/about">
                <Button
                  size="lg"
                  className="group w-full sm:w-auto flex justify-center items-center"
                >
                  About Us
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href="https://www.youtube.com/@watchtoleadenglish" target="_blank">
                <Button
                  className="relative w-14 h-14 sm:w-20 sm:h-11 rounded-full text-primary shadow-lg flex items-center justify-center group hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: "#74a350" }}
                >
                  <span className="absolute inset-0 rounded-full animate-ping bg-white/20"></span>
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 z-10"
                    fill="white"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 4l10 6-10 6V4z" />
                  </svg>
                </Button>
              </Link>
            </div>

            {/* Reviews */}
            <div className="mt-12 flex items-center space-x-6">
              <div className="flex -space-x-2">
                {["JD", "MS", "AK", "TW"].map((name, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-muted/80 border-2 border-background flex items-center justify-center text-xs font-medium"
                  >
                    {name}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">4.9/5</span> from 200+ reviews
                </p>
              </div>
            </div>
          </div>

          {/* Right image section */}
          <div
            className={cn(
              "hidden relative sm:flex items-center justify-center transition-all duration-1000 transform",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="relative w-full md:aspect-[4/3]">
              {heroImages.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt={`Slide ${i}`}
                  fill
                  priority={i === 0}
                  className="object-contain transition-opacity duration-1000"
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />

              {/* Floating info card */}
              <div className="absolute -bottom-6 -left-6 md:bottom-8 md:left-8 bg-background/80 backdrop-blur-md rounded-lg p-4 z-20 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-500/10 rounded-full p-3">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-green-500"
                    >
                      <path
                        d="M9.16 10.87C9.06 10.86 8.94 10.86 8.83 10.87C6.45 10.79 4.56 8.84 4.56 6.44C4.56 3.99 6.54 2 9 2C11.45 2 13.44 3.99 13.44 6.44C13.43 8.84 11.54 10.79 9.16 10.87Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.41 4C18.35 4 19.91 5.57 19.91 7.5C19.91 9.39 18.41 10.93 16.54 11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Connect with Students</p>
                    <p className="text-2xl font-bold">4k+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
