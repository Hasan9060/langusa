"use client";

import Image from "next/image";
import { useState } from "react";
import { PlayCircle, ChevronDown, ChevronUp } from "lucide-react";

const playlist = [
  {
    type: "Chapter",
    chapter: "Chapter 1: Democratic Citizenship",
    videos: [
      { title: "Explanation of Chapter", videoId: "fpd5NLFfdLA" },
      { title: "Solved exercises with questions/answers", videoId: "hgsuqe5eMvk" },
      { title: "JS History", videoId: "1vMFZbP8-fY" },
    ],
  },
  {
    type: "Chapter",
    chapter: "Chapter 2: Once more to lake",
    videos: [
      { title: "Explanation to Chapter", videoId: "qKDzwLL7m3Q" },
      { title: "Explanation to Chapter", videoId: "jrNN0UkBYa8" },
      { title: "Solved exercise with question answers", videoId: "DRYuwIUUbik" },
      { title: "Solved exercise compare & contrast", videoId: "PVBCJ5rVF0I" },
      { title: "Solved exercise", videoId: "mOhLZRfMVMU" },
      { title: "Animated video with Urdu translation", videoId: "bVPl9UjNQx8" },
    ],
  },
  {
    type: "Chapter",
    chapter: "Chapter 3: The Necklace",
    videos: [
        { title: " Solved exercise", videoId: "Y5etg3fON0o" },
    ],
  },
  {
    type: "Poem",
    poem: "Poem: The Abbot of Canterbury",
    videos: [
      { title: "An animated explanation", videoId: "2Fj97Pwq0Uc" },
    ],
  },
  {
    type: "Prose",
    prose: "Prose: Upon Westminster Bridge",
    videos: [
         {title:" solved exercises" ,videoId:"5tRYiYF_W6g"},
    ], // Empty section
  },
];

export default function YouTubePlaylistPage() {
  const [activeType, setActiveType] = useState("Chapter");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredPlaylist = playlist.filter(item => item.type === activeType);

  return (
   <div className="pt-24 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Banner Section */}
      <div className="relative w-full h-60 sm:h-72 flex items-center justify-center" style={{ backgroundImage: 'url(/Images/xibanner.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div className="absolute inset-0 bg-black/30" />
  <div className="relative z-10 text-center text-white px-4">
    <h1 className="text-3xl sm:text-4xl font-bold mb-2">XI Video Playlist</h1>
    <p className="text-sm sm:text-base text-gray-200">
      A curated collection of educational videos for Class XI students Karachi Board.
    </p>
  </div>
</div>

      {/* Type Buttons */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap gap-3 justify-center">
        {["Chapter", "Poem", "Prose"].map(type => (
          <button
            key={type}
            onClick={() => { setActiveType(type); setOpenIndex(null); }}
            className={`px-6 py-2 rounded-xl font-semibold transition-colors ${
              activeType === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-300 dark:hover:bg-blue-700"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-4">
        {filteredPlaylist.map((item, index) => {
          const title = item.chapter || item.poem || item.prose;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left bg-gradient-to-r from-blue-100 to-white dark:from-gray-700 dark:to-gray-800 hover:from-blue-200 dark:hover:from-gray-600 transition-colors"
              >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
                  {title}
                </h2>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                )}
              </button>

              {openIndex === index && (
                <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-transparent">
                  {item.videos.length > 0 ? (
                    item.videos.map((video: any, i: number) => <VideoItem key={i} video={video} />)
                  ) : (
                    <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                      No videos available for this section.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VideoItem({ video }: { video: any }) {
  const videoId = video.videoId || video.videoid;
  if (!videoId) return null;

  return (
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
    >
      <div className="relative w-36 h-20 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={video.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
          <PlayCircle className="w-10 h-10 text-white" />
        </div>
      </div>
      <div>
        <h3 className="font-medium text-gray-800 dark:text-gray-100 text-sm sm:text-base">
          {video.title}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Watch on YouTube</p>
      </div>
    </a>
  );
}
