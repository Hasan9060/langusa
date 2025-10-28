"use client";

import { useState, useEffect, useRef } from "react";
import { Play, X } from "lucide-react";

export default function CinemaPro() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const videos = [
    {
      title: "Mountain Adventure",
      url: "https://www.youtube.com/embed/aOvjSaPFzpc?autoplay=1&modestbranding=1&rel=0&controls=1",
      thumbnail:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    },
    {
      title: "Ocean Waves",
      url: "https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1&modestbranding=1&rel=0&controls=1",
      thumbnail:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop",
    },
    {
      title: "City Time-lapse",
      url: "https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&modestbranding=1&rel=0&controls=1",
      thumbnail:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=300&fit=crop",
    },
  ];

  // Open fullscreen when video is selected
  useEffect(() => {
    if (iframeRef.current && selectedVideo !== null) {
      const iframe = iframeRef.current;
      setTimeout(() => {
        if (iframe.requestFullscreen) iframe.requestFullscreen();
        else if ((iframe as any).webkitRequestFullscreen)
          (iframe as any).webkitRequestFullscreen();
        else if ((iframe as any).mozRequestFullScreen)
          (iframe as any).mozRequestFullScreen();
      }, 300);
    }
  }, [selectedVideo]);

  // Close when pressing ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 max-w-4xl w-full border border-white/20">
        <h1 className="text-4xl font-bold text-center text-white mb-2">
          🎬 Cinema Pro
        </h1>
        <p className="text-center text-white/80 mb-6">
          Premium Video Experience
        </p>

        {/* Video Thumbnail Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {videos.map((video, index) => (
            <div
              key={index}
              className={`relative rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 ${
                selectedVideo === index
                  ? "ring-4 ring-cyan-400 scale-105"
                  : "hover:scale-105 hover:ring-2 hover:ring-white/50"
              }`}
              onClick={() => setSelectedVideo(index)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-24 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedVideo === index ? "bg-cyan-400" : "bg-white/80"
                  }`}
                >
                  <Play
                    size={16}
                    className={
                      selectedVideo === index ? "text-white" : "text-gray-800"
                    }
                  />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-white text-sm font-medium truncate">
                  {video.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Info */}
        <div className="mt-4 text-center">
          {selectedVideo === null ? (
            <>
              <h3 className="text-xl font-bold text-white">
                Choose your movie
              </h3>
              <p className="text-white/60 mt-1">
                No ads • No logos • Pure cinema experience
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-white">
                {videos[selectedVideo].title}
              </h3>
              <p className="text-white/60 mt-1">
                Now Playing • Press ESC to Exit
              </p>
            </>
          )}
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {selectedVideo !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-6 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 z-50"
          >
            <X size={24} />
          </button>

          <iframe
            ref={iframeRef}
            className="w-full h-full"
            src={videos[selectedVideo].url}
            title={videos[selectedVideo].title}
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
