"use client";

import * as React from "react";
import { portfolioData } from "@/lib/data";

export function AboutSection() {
  const tools = [
    "DaVinci Resolve Studio",
    "Adobe After Effects",
    "Adobe Premiere Pro",
    "Adobe Photoshop",
    "Adobe Illustrator",
    "Topaz Video AI",
    "Sound Design & Foley",
  ];

  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-14 sm:gap-18">

        {/* Section Header */}
        <div
          className="flex flex-col gap-2 pb-6"
          style={{ borderBottom: "1px solid rgba(7,6,7,0.12)" }}
        >
          <h2
            className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase text-obsidian"
            style={{ letterSpacing: "0.02em", lineHeight: 0.95 }}
          >
            METHOD &{" "}
            <span className="text-ember">DISCIPLINE</span>
          </h2>
          <p className="text-sm text-obsidian/55 max-w-md font-sans font-medium">
            Every frame serves the emotion. Every sound effect anchors the illusion.
          </p>
        </div>

        {/* Narrative + Standout Quote Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Bio + Toolkit */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h3
              className="font-heading text-3xl sm:text-4xl uppercase text-obsidian"
              style={{ letterSpacing: "0.02em" }}
            >
              Bridging Graphic Design with Kinetic Cinema
            </h3>

            <p className="text-base sm:text-lg text-obsidian/65 leading-relaxed font-sans">
              Video editing and videography crafted with perceptual rhythm and architectural pacing.
              With deep mastery in Adobe After Effects and DaVinci Resolve Studio,
              I treat every sequence with compositional balance, kinetic tension,
              and ruthless elimination of dead frames.
            </p>

            <p className="text-sm sm:text-base text-obsidian/55 leading-relaxed font-sans">
              Whether sculpting high-retention short-form reels with custom motion graphics
              and speed ramps, or crafting commercial brand films and cultural events
              that demand theater-ready DaVinci color grading, I engineer complete post-production
              workflows from camera media to final master.
            </p>

            {/* Toolkit */}
            <div className="flex flex-col gap-3 pt-6" style={{ borderTop: "1px solid rgba(7,6,7,0.1)" }}>
              <span className="text-xs font-mono uppercase tracking-wider text-obsidian/50">
                Post-Production Arsenal
              </span>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3.5 py-1.5 text-xs font-sans font-medium text-obsidian transition-colors hover:border-ember"
                    style={{
                      background: "#f7f6f2",
                      borderRadius: "800px",
                      border: "1px solid rgba(7,6,7,0.12)",
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Standout Philosophy Card — Green Cutting Mat surface */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              className="relative flex flex-col justify-between gap-8 p-8 sm:p-10 overflow-hidden select-none group shadow-2xl h-full min-h-[380px]"
              style={{
                borderRadius: "40px",
                background: "linear-gradient(145deg, #133827 0%, #0d291c 60%, #091e14 100%)",
                border: "3px solid #1c4d37",
                boxShadow: "inset 0 0 40px rgba(0,0,0,0.45), 0 20px 40px -15px rgba(13, 41, 28, 0.4)",
              }}
            >
              {/* ── Vector Cutting Mat Grid & Calibration Marks ── */}
              <svg
                viewBox="0 0 500 400"
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <defs>
                  {/* Minor 10mm grid pattern */}
                  <pattern
                    id="sub-grid-philo"
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
                    id="main-grid-philo"
                    width="80"
                    height="80"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 80 0 L 0 0 0 80"
                      fill="none"
                      stroke="rgba(245, 252, 245, 0.2)"
                      strokeWidth="1.2"
                    />
                  </pattern>

                  {/* Isometric dots */}
                  <pattern
                    id="angle-dots-philo"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="20" cy="20" r="1" fill="rgba(245, 252, 245, 0.25)" />
                  </pattern>
                </defs>

                {/* Grid layers */}
                <rect x="20" y="20" width="460" height="360" fill="url(#sub-grid-philo)" />
                <rect x="20" y="20" width="460" height="360" fill="url(#main-grid-philo)" />
                <rect x="20" y="20" width="460" height="360" fill="url(#angle-dots-philo)" />

                {/* Outer Mat Border Guide */}
                <rect
                  x="20"
                  y="20"
                  width="460"
                  height="360"
                  fill="none"
                  stroke="rgba(245, 252, 245, 0.35)"
                  strokeWidth="1.5"
                />

                {/* Diagonal 45° Guidelines */}
                <g stroke="rgba(245, 252, 245, 0.2)" strokeWidth="1" strokeDasharray="3 3">
                  <line x1="20" y1="380" x2="380" y2="20" />
                  <line x1="20" y1="200" x2="380" y2="380" />
                  <line x1="120" y1="380" x2="480" y2="20" />
                </g>

                {/* Calibration Concentric Circles in corner */}
                <g stroke="rgba(245, 252, 245, 0.18)" fill="none" strokeWidth="1">
                  <circle cx="410" cy="90" r="30" strokeDasharray="2 2" />
                  <circle cx="410" cy="90" r="60" />
                  <line x1="395" y1="90" x2="425" y2="90" stroke="rgba(245, 252, 245, 0.4)" strokeWidth="1" />
                  <line x1="410" y1="75" x2="410" y2="105" stroke="rgba(245, 252, 245, 0.4)" strokeWidth="1" />
                </g>

                {/* Technical studio stamp */}
                <g transform="translate(30, 370)">
                  <text
                    x="0"
                    y="0"
                    fill="rgba(245, 252, 245, 0.4)"
                    fontSize="7"
                    fontFamily="monospace"
                    letterSpacing="0.12em"
                  >
                    CUTTING MAT · SPEC 02 // NON-GLARE VINYL
                  </text>
                </g>
              </svg>

              {/* Edge vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(5, 18, 12, 0.55) 100%)",
                }}
              />

              {/* Yellow Masking Tape Tag */}
              <div
                className="relative z-10 self-start px-3.5 py-1.5 text-[11px] font-mono tracking-wider text-obsidian uppercase font-semibold rotate-[-2deg] shadow-md border-t border-b border-black/15 pointer-events-none select-none"
                style={{
                  background: "#f5f28e",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                }}
              >
                <span>POST PHILOSOPHY // 01</span>
              </div>

              {/* Standout Quote */}
              <blockquote
                className="relative z-10 font-heading text-2xl sm:text-3xl uppercase leading-tight text-chalk"
                style={{ letterSpacing: "0.02em" }}
              >
                &ldquo;If the viewer notices the cut, you lost their trance.
                If the cut makes their pulse quicken, you made art.&rdquo;
              </blockquote>

              {/* Credits & Metas */}
              <div
                className="relative z-10 flex flex-col gap-1 pt-4 text-xs font-mono text-chalk/70"
                style={{ borderTop: "1px solid rgba(245,252,245,0.2)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-chalk tracking-wider">SHAHAN HASSAN</span>
                  <span className="text-[10px] text-sulfur tracking-widest font-mono">24 FPS · CUT</span>
                </div>
                <span className="text-[11px] text-chalk/50 tracking-wider">EDITOR · COLORIST · MOTION DESIGNER</span>
              </div>
            </div>
          </div>
        </div>

        {/* Production Workflow — 4 cards, no numbered slop labels */}
        <div className="flex flex-col gap-6">
          <span className="text-xs font-mono uppercase tracking-wider text-obsidian/50">
            Production Lifecycle
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {portfolioData.workflow.map((item) => (
              <div
                key={item.step}
                className="flex flex-col justify-between p-6 sm:p-8 transition-all duration-300"
                style={{
                  background: "#f7f6f2",
                  borderRadius: "40px",
                  border: "1px solid rgba(7,6,7,0.08)",
                }}
              >
                <span
                  className="font-heading text-6xl text-ember"
                  style={{ letterSpacing: "0.02em", lineHeight: 1 }}
                >
                  {item.step}
                </span>
                <div className="flex flex-col gap-2 mt-6">
                  <h4
                    className="font-heading text-lg uppercase text-obsidian"
                    style={{ letterSpacing: "0.02em" }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-obsidian/55 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
