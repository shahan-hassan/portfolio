"use client";

import * as React from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { portfolioData } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/** Helper function to smoothly ramp audio volume */
function fadeAudio(
  video: HTMLVideoElement,
  from: number,
  to: number,
  durationMs: number,
  onComplete?: () => void
) {
  const startTime = performance.now();
  const step = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / durationMs);
    const currentVolume = from + (to - from) * progress;
    if (video) {
      video.volume = Math.max(0, Math.min(1, currentVolume));
    }
    if (progress < 1) {
      requestAnimationFrame(step);
    } else if (onComplete) {
      onComplete();
    }
  };
  requestAnimationFrame(step);
}

/** Cinematic directional slide & whip variants */
const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    scale: 0.94,
    opacity: 0.5,
  }),
  center: {
    x: "0%",
    scale: 1,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 280, damping: 30 },
      scale: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.3 },
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    scale: 0.94,
    opacity: 0.2,
    transition: {
      x: { type: "spring", stiffness: 280, damping: 30 },
      scale: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
      opacity: { duration: 0.3 },
    },
  }),
};

export function ShowreelSection() {
  const [currentClipIndex, setCurrentClipIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const activeClip = portfolioData.projects[currentClipIndex] || portfolioData.projects[0];

  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isFadingOutRef = React.useRef(false);

  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  // Jump to specific cut with directional awareness
  const goToClip = React.useCallback(
    (newIndex: number, forcedDir?: number) => {
      const dir =
        forcedDir !== undefined
          ? forcedDir
          : newIndex >= currentClipIndex
          ? 1
          : -1;
      setDirection(dir);
      setCurrentClipIndex(newIndex);
      setIsPlaying(true);
    },
    [currentClipIndex]
  );

  // Next / Previous clip handlers: instant cut trigger without freeze delay
  const handleNextClip = React.useCallback(() => {
    const nextIdx = (currentClipIndex + 1) % portfolioData.projects.length;
    const video = videoRef.current;
    if (video && !isMuted) {
      fadeAudio(video, video.volume, 0, 160);
    }
    goToClip(nextIdx, 1);
  }, [currentClipIndex, isMuted, goToClip]);

  const handlePrevClip = React.useCallback(() => {
    const prevIdx =
      currentClipIndex === 0
        ? portfolioData.projects.length - 1
        : currentClipIndex - 1;
    const video = videoRef.current;
    if (video && !isMuted) {
      fadeAudio(video, video.volume, 0, 160);
    }
    goToClip(prevIdx, -1);
  }, [currentClipIndex, isMuted, goToClip]);

  // Play video on mount and on clip change with smooth audio fade-in
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setProgress(0);
    isFadingOutRef.current = false;
    video.currentTime = 0;
    video.muted = isMuted;

    // Smooth audio fade-in when unmuted
    if (!isMuted) {
      video.volume = 0;
      fadeAudio(video, 0, 1, 400);
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch((err: unknown) => {
          const isAbort = err instanceof Error && err.name === "AbortError";
          if (!isAbort && video.paused) {
            setIsPlaying(false);
          }
        });
    }
  }, [currentClipIndex, isMuted]);

  // 60fps/120fps smooth progress tracking via requestAnimationFrame loop + predictive cutover before freeze
  React.useEffect(() => {
    let animFrameId: number;
    let hasCutOver = false;

    const tick = () => {
      const video = videoRef.current;
      if (video) {
        // Guarantee synchronization: if video is actually playing frames in the DOM, never show pause overlay
        const isActuallyPlaying = !video.paused && !video.ended && video.readyState > 1;
        if (isActuallyPlaying && !isPlaying) {
          setIsPlaying(true);
        }

        if (video.duration && !video.paused) {
          const pct = (video.currentTime / video.duration) * 100;
          setProgress(pct);

          const timeRemaining = video.duration - video.currentTime;

          // Smooth audio fade-out ~450ms before video ends
          if (!isMuted && timeRemaining <= 0.45 && !isFadingOutRef.current) {
            isFadingOutRef.current = true;
            fadeAudio(video, video.volume, 0, 380);
          }

          // Trigger next cut ~200ms before video naturally halts on last frame
          // This ensures the outgoing clip is still actively moving when it slides away
          if (timeRemaining <= 0.22 && !hasCutOver) {
            hasCutOver = true;
            handleNextClip();
            return;
          }
        }
      }
      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameId);
  }, [currentClipIndex, isMuted, isPlaying, handleNextClip]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) {
      videoRef.current.volume = 0;
      fadeAudio(videoRef.current, 0, 1, 350);
    }
  };

  const toggleFullscreen = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  };

  return (
    <section id="reel" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
      {/* Hidden video preloader to ensure instant frame rendering on transition */}
      <div className="hidden" aria-hidden="true">
        {portfolioData.projects.map((proj) => (
          <video
            key={`preload-${proj.id}`}
            src={proj.videoUrl}
            preload="auto"
            muted
            playsInline
          />
        ))}
      </div>

      <div className="max-w-[1280px] mx-auto flex flex-col gap-8 sm:gap-10">

        {/* Section Header */}
        <div className="flex flex-col gap-2 pb-6" style={{ borderBottom: "1px solid rgba(7,6,7,0.12)" }}>
          <div className="flex items-center gap-3">
            <h2
              className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase text-obsidian"
              style={{ letterSpacing: "0.02em", lineHeight: 0.95 }}
            >
              SHOWREEL
            </h2>
            <span
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-obsidian font-semibold"
              style={{ background: "#f5f28e", borderRadius: "800px" }}
            >
              <span className="size-2 rounded-full bg-ember animate-ping" />
              7-Cut Continuous Reel
            </span>
          </div>
          <p className="text-sm text-obsidian/55 max-w-lg font-sans font-medium">
            Continuous multi-genre showreel. Autoplays through all recent commercial, kinetic reel, and event masters.
          </p>
        </div>

        {/* Video Canvas — 16:9 Theater Stage */}
        <div
          ref={containerRef}
          onClick={togglePlay}
          className="group relative w-full aspect-video overflow-hidden bg-black select-none cursor-pointer shadow-2xl"
          style={{
            borderRadius: "40px",
            border: "1px solid rgba(7,6,7,0.15)",
          }}
        >
          {/* ── Cinematic Moving Transitions between cuts ── */}
          <AnimatePresence custom={direction} mode="popLayout" initial={false}>
            <motion.div
              key={activeClip.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
            >
              {/* Ambient blur backdrop for 9:16 portrait videos */}
              {activeClip.aspect === "portrait" && (
                <video
                  src={activeClip.videoUrl}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-35 scale-110 pointer-events-none"
                  aria-hidden="true"
                />
              )}

              {/* Master Video */}
              <video
                ref={(el) => {
                  if (el) {
                    videoRef.current = el;
                  }
                }}
                src={activeClip.videoUrl}
                autoPlay
                muted={isMuted}
                playsInline
                onEnded={handleNextClip}
                onPlay={(e) => {
                  if (e.currentTarget === videoRef.current) {
                    setIsPlaying(true);
                  }
                }}
                onPause={(e) => {
                  // Ignore pause events fired by unmounting or exiting video elements
                  if (e.currentTarget === videoRef.current) {
                    setIsPlaying(false);
                  }
                }}
                className={`w-full h-full relative z-10 ${
                  activeClip.aspect === "portrait" ? "object-contain" : "object-cover"
                }`}
              />
            </motion.div>
          </AnimatePresence>

          {/* ── Anamorphic Film Shutter Wipe Flare Streak ── */}
          <motion.div
            key={`flare-${activeClip.id}`}
            initial={{ x: direction > 0 ? "100%" : "-100%", opacity: 0.85 }}
            animate={{ x: direction > 0 ? "-100%" : "100%", opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 w-36 pointer-events-none z-20 bg-gradient-to-r from-transparent via-ember/70 to-transparent blur-xl mix-blend-screen"
          />

          {/* ── Film Frame Flash Pulse on Cut Change ── */}
          <motion.div
            key={`flash-${activeClip.id}`}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 bg-white/20 mix-blend-screen pointer-events-none z-20"
          />

          {/* ── Top Story-Style Segmented Progress Bars (7 Cuts using shadcn Progress) ── */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 z-30 flex items-center gap-1.5 pointer-events-auto">
            {portfolioData.projects.map((proj, idx) => {
              const isPassed = idx < currentClipIndex;
              const isCurrent = idx === currentClipIndex;
              const val = isPassed ? 100 : isCurrent ? progress : 0;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToClip(idx);
                  }}
                  className="group/seg relative py-2 -my-2 flex-1 cursor-pointer focus:outline-none"
                  aria-label={`Jump to Cut ${idx + 1}: ${proj.title}`}
                >
                  <Progress
                    value={val}
                    className="w-full"
                    trackClassName="h-1 sm:h-1.5 bg-white/30 group-hover/seg:bg-white/50 rounded-full overflow-hidden transition-colors"
                    indicatorClassName="h-full bg-ember rounded-full will-change-transform"
                  />
                </button>
              );
            })}
          </div>

          {/* ── Top Header Strip: Active Cut Info + Prev/Next Controls ── */}
          <div className="absolute top-8 sm:top-9 inset-x-4 sm:inset-x-8 z-30 flex items-center justify-between gap-3 pointer-events-none">
            <div className="flex items-center gap-2 sm:gap-3 truncate">
              <motion.span
                key={`badge-${activeClip.id}`}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="px-2.5 py-0.5 text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-obsidian shrink-0 shadow-md"
                style={{ background: "#f5f28e", borderRadius: "800px" }}
              >
                CUT {String(currentClipIndex + 1).padStart(2, "0")} / {String(portfolioData.projects.length).padStart(2, "0")}
              </motion.span>
              <motion.span
                key={`title-${activeClip.id}`}
                initial={{ y: direction > 0 ? 8 : -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-xs sm:text-sm font-heading uppercase text-chalk tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] truncate"
              >
                {activeClip.title}
              </motion.span>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1.5 pointer-events-auto shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevClip();
                }}
                className="p-1.5 sm:p-2 rounded-full bg-obsidian/60 hover:bg-obsidian/90 text-chalk backdrop-blur-md border border-chalk/20 transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                aria-label="Previous Cut"
              >
                <ChevronLeft className="size-3.5 sm:size-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextClip();
                }}
                className="p-1.5 sm:p-2 rounded-full bg-obsidian/60 hover:bg-obsidian/90 text-chalk backdrop-blur-md border border-chalk/20 transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                aria-label="Next Cut"
              >
                <ChevronRight className="size-3.5 sm:size-4" />
              </button>
            </div>
          </div>

          {/* Pause overlay icon — only shows if user manually pauses */}
          {!isPlaying && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-obsidian/40 backdrop-blur-[2px]">
              <div
                className="size-16 sm:size-20 flex items-center justify-center text-chalk bg-obsidian/75 backdrop-blur-md border border-chalk/20 shadow-2xl transition-transform hover:scale-110"
                style={{ borderRadius: "800px" }}
              >
                <Play className="size-8 fill-ember text-ember ml-1 drop-shadow-[0_2px_12px_rgba(252,80,0,0.6)]" />
              </div>
            </div>
          )}

          {/* ── Bottom Controls Bar ── */}
          <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-30 flex items-center justify-between text-chalk text-xs bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-auto">
            <div className="flex items-center gap-3">
              {/* Prominent Audio Toggle Pill */}
              <button
                type="button"
                onClick={toggleMute}
                className={`group flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-xl backdrop-blur-md cursor-pointer ${
                  isMuted
                    ? "bg-ember text-obsidian hover:bg-ember/90 shadow-[0_4px_20px_rgba(252,80,0,0.4)] animate-pulse hover:animate-none"
                    : "bg-obsidian/75 text-chalk hover:bg-obsidian border border-chalk/20"
                }`}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="size-3.5 sm:size-4 shrink-0" />
                    <span>Tap for Sound</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="size-3.5 sm:size-4 shrink-0 text-ember" />
                    <span>Sound On</span>
                  </>
                )}
              </button>

              <span className="font-mono text-xs text-chalk/60 hidden sm:inline-block">
                {activeClip.duration} · {activeClip.categoryLabel}
              </span>
            </div>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-2 rounded-full hover:bg-chalk/10 transition-colors text-chalk/80 hover:text-chalk cursor-pointer"
              aria-label="Toggle Fullscreen"
            >
              <Maximize2 className="size-4 sm:size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
