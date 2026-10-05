"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Mic, 
  Sparkles,
  FileText, 
  ChevronDown, 
  ChevronUp,
  Quote
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceOfEldersPlayerProps {
  className?: string;
}

export function VoiceOfEldersPlayer({ className }: VoiceOfEldersPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const duration = 284; // 4 minutes 44 seconds

  // Simulate audio playback timing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  };

  const handleSkip = (seconds: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(duration, prev + seconds)));
  };

  return (
    <div
      className={cn(
        "relative rounded-3xl border border-[#B8860B]/40 bg-[#120B0D] text-[#FAF2E8] p-6 sm:p-8 shadow-2xl overflow-hidden select-none font-marathi-body",
        className
      )}
    >
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#800020]/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Top Header Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#332228] pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#800020]/40 border border-[#E5B869]/40 flex items-center justify-center text-[#E5B869]">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#E5B869] tracking-wider uppercase block">
                ज्येष्ठांचे बोल — मौखिक इतिहास (Oral History of Sahitya Niketan)
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white font-marathi-heading">
                “साहित्य निकेतनची स्थापना आणि ८० वर्षांची अखंड ज्ञानसाधना”
              </h3>
            </div>
          </div>

          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-stone-300 shrink-0 self-start sm:self-auto">
            मराठी ध्वनीमुद्रण ({formatTime(duration)})
          </div>
        </div>

        {/* Narrator Profile & Player Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Narrator Card (4 Cols) */}
          <div className="md:col-span-4 flex items-center gap-3.5 bg-black/35 p-3.5 rounded-2xl border border-white/10">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-[#E5B869]/50 shadow-md bg-stone-800">
              <Image
                src="/images/real/library_savarkar_portrait.png"
                alt="ज्येष्ठ विश्वस्त"
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-white text-xs sm:text-sm truncate font-marathi-heading">
                श्री. बापूराव कुलकर्णी
              </h4>
              <p className="text-[11px] text-[#E5B869] truncate">
                ज्येष्ठ वाचक व विश्वस्त (वय ८८ वर्षे)
              </p>
              <p className="text-[10px] text-stone-400 mt-0.5">
                १९५२ सालापासूनचे निरंतर सभासद
              </p>
            </div>
          </div>

          {/* Interactive Sound Scrubber & Waveform (8 Cols) */}
          <div className="md:col-span-8 space-y-3 bg-[#24080C] p-4 rounded-2xl border border-[#3A0F14]">
            {/* Animated Audio Waveform Bars */}
            <div className="flex items-center justify-between gap-1 h-10 px-2 overflow-hidden">
              {Array.from({ length: 36 }).map((_, i) => {
                const progressRatio = currentTime / duration;
                const isPlayed = i / 36 <= progressRatio;
                const randomHeight = 25 + Math.sin(i * 0.7) * 35 + ((i % 4) * 10);

                return (
                  <motion.div
                    key={i}
                    animate={{
                      scaleY: isPlaying ? [1, 1.6, 0.7, 1.3, 1] : 1,
                    }}
                    transition={{
                      duration: 0.6 + (i % 5) * 0.15,
                      repeat: isPlaying ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                    style={{ height: `${randomHeight}%` }}
                    className={cn(
                      "w-1 rounded-full transition-colors origin-center",
                      isPlayed
                        ? "bg-gradient-to-t from-[#800020] to-[#E5B869]"
                        : "bg-white/20"
                    )}
                  />
                );
              })}
            </div>

            {/* Scrubber slider */}
            <div className="space-y-1">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
                className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#E5B869]"
              />
              <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Button Controls */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSkip(-10)}
                  className="p-2 rounded-full hover:bg-white/10 text-stone-300 transition-colors cursor-pointer"
                  title="१० सेकंद मागे"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-11 h-11 rounded-full bg-[#800020] hover:bg-[#66001A] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-[#E5B869]/40"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() => handleSkip(10)}
                  className="p-2 rounded-full hover:bg-white/10 text-stone-300 transition-colors cursor-pointer"
                  title="१० सेकंद पुढे"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full hover:bg-white/10 text-stone-300 transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-[#E5B869] font-bold transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>शब्दरूप</span>
                  {showTranscript ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Marathi Transcript Drawer */}
        <AnimatePresence>
          {showTranscript && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-5 rounded-2xl bg-black/45 border border-white/10 text-xs sm:text-sm text-stone-200 space-y-3 leading-relaxed">
                <div className="flex items-center gap-2 text-[#E5B869] font-bold text-xs">
                  <Quote className="w-4 h-4 rotate-180" />
                  <span>ध्वनीमुद्रणातील मूळ शब्दांकन:</span>
                </div>
                <p>
                  “१९४५ चा तो काळ आठवला की आजही अंगावर रोमांच उभे राहतात. हैदराबाद संस्थानातील निजाम राजवटीचा तो अत्यंत कठीण कालखंड होता. अंबाजोगाईत मराठी भाषेत वाचायला पुस्तक मिळणे म्हणजे स्वातंत्र्यलढ्यासारखेच होते. त्या काळात आमच्या ज्येष्ठांनी—वकील, शिक्षक आणि राष्ट्रभक्तांनी एकत्र येऊन ‘साहित्य निकेतन’ची मुहूर्तमेढ रोवली.”
                </p>
                <p>
                  “सुरुवातीला एका छोट्या खोलीत कंदीलाच्या उजेडात वाचनालय सुरू झाले. स्वातंत्र्यसैनिकांच्या गुप्त बैठका येथे होत. आज ८० वर्षांनंतर जेव्हा मी या वातानुकूलित अभ्यासिकेत २०० हून अधिक तरुण-तरुणींना स्पर्धा परीक्षेचा अभ्यास करताना पाहतो, तेव्हा असे वाटते की आमच्या पिढीने लावलेल्या छोट्याशा ज्ञानरोपट्याचा आज महावृक्ष झाला आहे...”
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
