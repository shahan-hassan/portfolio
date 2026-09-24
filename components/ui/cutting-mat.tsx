"use client";

import * as React from "react";
import Link from "next/link";
import { Play, Sparkles } from "lucide-react";

interface CuttingMatProps {
  className?: string;
}

export function CuttingMat({ className = "" }: CuttingMatProps) {
  return (
    <div
      className={`relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto lg:h-full min-h-[340px] sm:min-h-[420px] overflow-hidden select-none group shadow-2xl transition-all ${className}`}
      style={{
        borderRadius: "40px",
        background: "linear-gradient(145deg, #133827 0%, #0d291c 60%, #091e14 100%)",
        border: "3px solid #1c4d37",
        boxShadow: "inset 0 0 40px rgba(0,0,0,0.45), 0 20px 40px -15px rgba(13, 41, 28, 0.4)",
      }}
    >
      {/* ── Authentic SVG Vector Cutting Mat Grid & Marks ── */}
      <svg
        viewBox="0 0 640 480"
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* Subtle noise/grain filter for vinyl texture */}
          <filter id="vinyl-grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.04 0"
            />
          </filter>

          {/* Minor 10mm grid pattern */}
          <pattern
            id="sub-grid"
            width="16"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 16 0 L 0 0 0 16"
              fill="none"
              stroke="rgba(240, 248, 240, 0.08)"
              strokeWidth="0.75"
            />
          </pattern>

          {/* Major 50mm grid pattern */}
          <pattern
            id="main-grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="rgba(245, 252, 245, 0.22)"
              strokeWidth="1.25"
            />
          </pattern>

          {/* Isometric / diagonal angle guides */}
          <pattern
            id="angle-dots"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="1" fill="rgba(245, 252, 245, 0.3)" />
          </pattern>
        </defs>

        {/* Vinyl noise layer */}
        <rect width="640" height="480" filter="url(#vinyl-grain)" />

        {/* Grid layers */}
        <rect x="24" y="24" width="592" height="432" fill="url(#sub-grid)" />
        <rect x="24" y="24" width="592" height="432" fill="url(#main-grid)" />
        <rect x="24" y="24" width="592" height="432" fill="url(#angle-dots)" />

        {/* Outer Mat Border Guide */}
        <rect
          x="24"
          y="24"
          width="592"
          height="432"
          fill="none"
          stroke="rgba(245, 252, 245, 0.45)"
          strokeWidth="1.5"
        />

        {/* ── 45° and 60° Angle Guidelines ── */}
        <g stroke="rgba(245, 252, 245, 0.28)" strokeWidth="1" strokeDasharray="3 3">
          <line x1="24" y1="456" x2="456" y2="24" />
          <line x1="24" y1="240" x2="456" y2="456" />
          <line x1="184" y1="456" x2="616" y2="24" />
          <line x1="24" y1="360" x2="616" y2="120" />
        </g>

        {/* Angle degree labels */}
        <text
          x="120"
          y="370"
          fill="rgba(245, 252, 245, 0.35)"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="bold"
        >
          45°
        </text>
        <text
          x="280"
          y="220"
          fill="rgba(245, 252, 245, 0.35)"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="bold"
        >
          60°
        </text>
        <text
          x="440"
          y="180"
          fill="rgba(245, 252, 245, 0.35)"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="bold"
        >
          30°
        </text>

        {/* ── Concentric Drafting Calibration Circles ── */}
        <g stroke="rgba(245, 252, 245, 0.22)" fill="none" strokeWidth="1">
          <circle cx="320" cy="240" r="40" strokeDasharray="2 2" />
          <circle cx="320" cy="240" r="80" strokeDasharray="4 4" />
          <circle cx="320" cy="240" r="120" />
          {/* Center Crosshair */}
          <line x1="300" y1="240" x2="340" y2="240" stroke="rgba(245, 252, 245, 0.5)" strokeWidth="1.5" />
          <line x1="320" y1="220" x2="320" y2="260" stroke="rgba(245, 252, 245, 0.5)" strokeWidth="1.5" />
        </g>

        {/* ── Millimeter Ruler Tick Marks along Margins ── */}
        {/* Top & Bottom Ticks */}
        {Array.from({ length: 37 }).map((_, i) => {
          const x = 24 + i * 16;
          const isMajor = i % 5 === 0;
          return (
            <g key={`x-ticks-${i}`} stroke="rgba(245, 252, 245, 0.4)" strokeWidth="1">
              {/* Top ticks */}
              <line x1={x} y1="24" x2={x} y2={isMajor ? "14" : "18"} />
              {/* Bottom ticks */}
              <line x1={x} y1="456" x2={x} y2={isMajor ? "466" : "462"} />
              {isMajor && (
                <>
                  <text
                    x={x}
                    y="11"
                    textAnchor="middle"
                    fill="rgba(245, 252, 245, 0.55)"
                    fontSize="7"
                    fontFamily="monospace"
                  >
                    {i * 10}
                  </text>
                  <text
                    x={x}
                    y="475"
                    textAnchor="middle"
                    fill="rgba(245, 252, 245, 0.55)"
                    fontSize="7"
                    fontFamily="monospace"
                  >
                    {i * 10}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Left & Right Ticks */}
        {Array.from({ length: 27 }).map((_, i) => {
          const y = 24 + i * 16;
          const isMajor = i % 5 === 0;
          return (
            <g key={`y-ticks-${i}`} stroke="rgba(245, 252, 245, 0.4)" strokeWidth="1">
              {/* Left ticks */}
              <line x1="24" y1={y} x2={isMajor ? "14" : "18"} y2={y} />
              {/* Right ticks */}
              <line x1="616" y1={y} x2={isMajor ? "626" : "622"} y2={y} />
              {isMajor && (
                <>
                  <text
                    x="10"
                    y={y + 2.5}
                    textAnchor="end"
                    fill="rgba(245, 252, 245, 0.55)"
                    fontSize="7"
                    fontFamily="monospace"
                  >
                    {i * 10}
                  </text>
                  <text
                    x="629"
                    y={y + 2.5}
                    textAnchor="start"
                    fill="rgba(245, 252, 245, 0.55)"
                    fontSize="7"
                    fontFamily="monospace"
                  >
                    {i * 10}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* ── Technical Mat Specifications / Studio Stamp ── */}
        <g transform="translate(36, 420)">
          <text
            x="0"
            y="0"
            fill="rgba(245, 252, 245, 0.65)"
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="0.1em"
          >
            SHAHAN HASSAN · STUDIO CUTTING MAT
          </text>
          <text
            x="0"
            y="14"
            fill="rgba(245, 252, 245, 0.4)"
            fontSize="7"
            fontFamily="monospace"
            letterSpacing="0.15em"
          >
            MODEL NO. 01 · SELF-HEALING NON-GLARE VINYL · 1:1 CALIBRATION
          </text>
        </g>

        {/* Top-Right Stamp */}
        <g transform="translate(500, 48)">
          <rect
            x="0"
            y="0"
            width="100"
            height="22"
            fill="none"
            stroke="rgba(245, 252, 245, 0.3)"
            strokeWidth="0.75"
          />
          <text
            x="50"
            y="14"
            textAnchor="middle"
            fill="rgba(245, 252, 245, 0.55)"
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="0.12em"
          >
            A3 / 600×450 MM
          </text>
        </g>
      </svg>

      {/* ── Studio Tactile Layers on Top of Mat ── */}

      {/* 1. Yellow Masking Tape (Sulfur accent #f5f28e) in Top-Left */}
      <div
        className="absolute top-7 left-6 sm:left-8 px-3.5 py-1.5 z-20 text-[11px] font-mono tracking-wider text-obsidian uppercase font-semibold rotate-[-3deg] shadow-md border-t border-b border-black/15 pointer-events-none select-none"
        style={{
          background: "#f5f28e",
          boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        }}
      >
        <span>CUT 01 // 24 FPS</span>
      </div>

      {/* 2. Interactive Reel Card (Resting on the cutting mat like a physical production slate) */}
      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 z-10">
        <Link
          href="#reel"
          className="group/slate relative flex flex-col items-center gap-3 p-5 sm:p-6 bg-obsidian/85 hover:bg-obsidian backdrop-blur-md text-chalk border border-chalk/15 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
          style={{
            borderRadius: "28px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          {/* Play button with Ember glow */}
          <div
            className="size-14 sm:size-16 flex items-center justify-center text-obsidian bg-ember group-hover/slate:bg-ember/90 shadow-lg transition-transform group-hover/slate:scale-110"
            style={{ borderRadius: "800px" }}
          >
            <Play className="size-6 fill-current ml-0.5" />
          </div>

          <div className="flex flex-col items-center text-center gap-1">
            <span className="font-heading text-lg sm:text-xl uppercase tracking-wider text-chalk flex items-center gap-2">
              <span>WATCH SHOWREEL</span>
              <Sparkles className="size-3.5 text-sulfur" />
            </span>
            <span className="text-[11px] font-mono text-chalk/60 uppercase tracking-widest">
              4K CINEMATIC CUT · 01:45
            </span>
          </div>
        </Link>
      </div>

      {/* 3. Subtle edge vignette to give physical depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(5, 18, 12, 0.6) 100%)",
        }}
      />
    </div>
  );
}
