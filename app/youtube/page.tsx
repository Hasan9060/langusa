"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function SyllabusSelectionPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const syllabus = [
    {
      name: "Class XI",
      description:
        "XI grade topics with videos, interactive exercises, and detailed explanations.",
      link: "/youtube/xivideo",
      color: "from-blue-500 to-indigo-600",
      hoverColor: "from-blue-600 to-indigo-700",
      icon: "📚",
    },
    {
      name: "Class XII",
      description:
        "XII grade topics with videos, interactive exercises, and detailed explanations.",
      link: "/youtube/xiivideo",
      color: "from-green-500 to-teal-600",
      hoverColor: "from-green-600 to-teal-700",
      icon: "🎓",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
    hover: {
      y: -10,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    }
  };

  const floatAnimation = {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  };

  return (
    <div className="pt-28 min-h-screen relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 flex flex-col items-center justify-center px-4 py-8 sm:py-12 md:py-28 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-10 right-10 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-20 w-20 h-20 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 sm:mb-16 md:mb-20 z-10"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-green-500 dark:text-yellow-500 bg-clip-text">
          Select Your Class
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Select your grade to access video lessons.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl w-full z-10"
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
            <Link href={item.link} className="block">
              <div
                className={`relative bg-gradient-to-br ${item.color} rounded-3xl shadow-2xl overflow-hidden cursor-pointer group h-full`}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, white 10%, transparent 20%), radial-gradient(circle at 75% 75%, white 5%, transparent 20%)`,
                      backgroundSize: "50px 50px"
                    }}
                  ></div>
                </div>

                {/* Floating icon */}
                <motion.div
                  className="absolute -top-4 -right-4 text-6xl opacity-20"
                  animate={hoveredCard === index ? floatAnimation : { y: 0 }}
                >
                  {item.icon}
                </motion.div>

                 <div className="relative z-10 flex flex-col items-center justify-center p-6 sm:p-8 h-full">
                  <motion.div
                    className="w-28 h-28 sm:w-32 sm:h-32 bg-white/90 rounded-full flex items-center justify-center mb-6 shadow-2xl"
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      {item.name.split(" ")[1]}
                    </span>
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-3 text-center">
                    {item.name}
                  </h3>

                  <p className="text-center text-white/90 font-medium mb-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  <div className="absolute -inset-full group-hover:inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 group-hover:skew-x-12 transition-all duration-700 ease-in-out"></div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
