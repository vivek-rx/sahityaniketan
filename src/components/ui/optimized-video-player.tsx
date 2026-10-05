"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Volume2, Film } from "lucide-react";
import { BLUR_PLACEHOLDER } from "@/lib/image-utils";
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from "@/components/ui/video-player";

interface OptimizedVideoPlayerProps {
  videoUrl?: string;
  youtubeId?: string;
  thumbnailUrl: string;
  title: string;
  className?: string;
  autoPlayOnVisible?: boolean;
}

export function OptimizedVideoPlayer({
  videoUrl,
  youtubeId,
  thumbnailUrl,
  title,
  className = "",
  autoPlayOnVisible = false,
}: OptimizedVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver: Only load video stream when visible in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (autoPlayOnVisible) {
              setIsPlaying(true);
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [autoPlayOnVisible]);

  // Extract clean YouTube embed URL
  const getEmbedUrl = () => {
    if (youtubeId) {
      return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
    }
    if (videoUrl) {
      if (videoUrl.includes("youtube.com/watch?v=")) {
        const id = videoUrl.split("v=")[1]?.split("&")[0];
        return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
      }
      if (videoUrl.includes("youtu.be/")) {
        const id = videoUrl.split("youtu.be/")[1]?.split("?")[0];
        return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
      }
      return videoUrl;
    }
    return "";
  };

  const embedUrl = getEmbedUrl();
  const isDirectVideo = videoUrl?.endsWith(".mp4") || videoUrl?.endsWith(".webm") || videoUrl?.endsWith(".m3u8");

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl bg-slate-950 border border-gray-200 dark:border-slate-800 shadow-md ${className}`}
    >
      {!isPlaying ? (
        <div className="relative w-full h-full min-h-[220px] group cursor-pointer" onClick={() => setIsPlaying(true)}>
          {/* Thumbnail First with Blur Placeholder */}
          <Image
            src={thumbnailUrl || "/images/real/library_cupboards.png"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            loading="lazy"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Play Button Icon with Pulse Ring */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <div className="relative flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-[#ED6923] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Play className="h-8 w-8 fill-current ml-1" />
              </div>
              <span className="absolute -inset-2 rounded-full border-2 border-amber-300/60 animate-ping pointer-events-none" />
            </div>

            <span className="mt-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-white font-marathi-body border border-white/20">
              व्हिडिओ पहा (Watch Video)
            </span>
          </div>

          {/* Bottom Title */}
          <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold truncate font-marathi-body">
            {title}
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full min-h-[240px] bg-black">
          {isDirectVideo ? (
            <video
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="w-full h-full object-contain"
            >
              <source src={videoUrl} type="video/webm" />
              <source src={videoUrl} type="video/mp4" />
              तुमचा ब्राउझर व्हिडिओ प्लेबॅकला सपोर्ट करत नाही.
            </video>
          ) : (
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="w-full h-full absolute inset-0 border-0"
            />
          )}
        </div>
      )}
    </div>
  );
}
