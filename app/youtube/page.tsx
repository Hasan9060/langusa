"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function SyllabusSelectionPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const syllabus = [
      {
      name: "Class IX",
      link: "/youtube/xiivideo",
      color: "from-blue-400 to-blue-600",
      hoverColor: "from-green-600 to-teal-700",
      comingSoon: true,
    },
     {
      name: "Class X",
      link: "/youtube/xivideo",
      color: "from-red-800 to-red-500",
      hoverColor: "from-blue-600 to-indigo-700",
      comingSoon: true,
    },
    {
      name: "Class XI",
      link: "/youtube/xivideo",
      color: "from-purple-500 to-indigo-600",
      hoverColor: "from-blue-600 to-indigo-700",
    },
    {
      name: "Class XII",
      link: "/youtube/xiivideo",
      color: "from-green-500 to-teal-600",
      hoverColor: "from-green-600 to-teal-700",
    },
    {
      name: "ADS",
      link: "/youtube/adsvideo",
      color: "from-yellow-500 to-orange-600",
      hoverColor: "from-yellow-600 to-orange-700",
      comingSoon: true,
    },
    {
      name: "ADC",
      link: "/youtube/adcvideo",
      color: "from-purple-500 to-pink-600",
      hoverColor: "from-purple-600 to-pink-700",
      comingSoon: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    hover: {
      y: -10,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-24 sm:pt-32 px-4 py-10 overflow-hidden dark:bg-gray-900 bg-gray-50">
      {/* Background Blobs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-20 right-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-20 w-32 h-32 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10 z-10"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-green-600 dark:text-yellow-400">
          Select Your Class
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
          Choose your syllabus to access structured video lessons.
        </p>
      </motion.div>

      {/* Card Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-8 max-w-3xl w-full z-10"
      >
        {syllabus.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
            className="relative w-full"
          >
            <Link
              href={item.comingSoon ? "#" : item.link}
              className="block focus:outline-none"
            >
              <div
                className={`relative bg-gradient-to-br ${item.color} rounded-3xl shadow-lg overflow-hidden h-full transition-transform duration-300 hover:scale-[1.03]`}
              >
                {/* Subtle Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 25% 25%, white 10%, transparent 20%), radial-gradient(circle at 75% 75%, white 5%, transparent 20%)",
                      backgroundSize: "50px 50px",
                    }}
                  />
                </div>

                {/* Floating Effect */}
                <motion.div
                  className="absolute -top-4 -right-4 text-6xl opacity-30"
                  animate={hoveredCard === index ? floatAnimation : { y: 0 }}
                />

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center justify-center p-6 sm:p-8 h-full">
                  <motion.div
                    className="w-24 h-24 sm:w-28 sm:h-28 bg-white/90 rounded-full flex items-center justify-center mb-5 shadow-lg"
                    whileHover={{
                      scale: 1.1,
                      rotate: 4,
                      transition: { type: 'spring', stiffness: 250 },
                    }}
                  >
                    <span className="text-4xl sm:text-5xl font-bold text-gray-700">
                      {item.name.replace("Class ", "")}
                    </span>
                  </motion.div>

                  <h3 className="text-2xl font-semibold text-white text-center tracking-wide">
                    {item.name}
                  </h3>
                </div>

                {/* Coming Soon Overlay */}
                {item.comingSoon && (
                  <div className="absolute z-10 inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-3xl">
                    <span className="text-white text-lg font-semibold px-4 py-2 rounded-full bg-green-500">
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
