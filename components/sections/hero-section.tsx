"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { portfolioData } from "@/lib/data";
import { Play, ArrowRight } from "lucide-react";
import { CuttingMat } from "@/components/ui/cutting-mat";


/* ─── Hero Section ───────────────────────────────────────────────────────── */
export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const fade = (delay: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: "easeOut" as const },
        };

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center pt-20 sm:pt-24 pb-10 px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_540px] gap-8 lg:gap-12 items-center">

        {/* ── Left: Copy Column ────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">

          {/* Availability tag — Sulfur pill */}
          <motion.div {...fade(0)}>
            <span
              className="inline-flex items-center px-4 py-1.5 text-[11px] font-sans font-medium uppercase tracking-[0.18em] text-obsidian"
              style={{
                background: "#f5f28e",
                borderRadius: "800px",
              }}
            >
              {portfolioData.personal.badge}
            </span>
          </motion.div>

          {/* Monumental display headline */}
          <motion.div {...fade(0.07)} className="flex flex-col">
            <h1
              className="font-heading uppercase leading-none text-obsidian"
              style={{
                fontSize: "clamp(64px, 10vw, 160px)",
                letterSpacing: "0.02em",
                lineHeight: 0.94,
              }}
            >
              SHAHAN
            </h1>
            <h1
              className="font-heading uppercase leading-none text-ember"
              style={{
                fontSize: "clamp(64px, 10vw, 160px)",
                letterSpacing: "0.02em",
                lineHeight: 0.94,
              }}
            >
              HASSAN
            </h1>
          </motion.div>

          {/* Role */}
          <motion.div {...fade(0.14)} className="flex flex-col gap-3 pt-4 border-t border-obsidian/12">
            <p
              className="font-heading text-xl sm:text-2xl md:text-3xl uppercase tracking-wider text-obsidian"
            >
              {portfolioData.personal.role}
            </p>
            <p className="text-sm sm:text-base text-obsidian/60 leading-relaxed max-w-[50ch] font-medium">
              {portfolioData.personal.bio}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div {...fade(0.2)} className="flex flex-wrap items-center gap-3 mt-2">
            {/* Primary: Ember pill with Obsidian text */}
            <Link
              href="#reel"
              className="flex items-center gap-2.5 px-6 h-12 text-sm font-semibold uppercase tracking-wider text-obsidian bg-ember hover:bg-ember/90 active:scale-[0.98] transition-all"
              style={{ borderRadius: "800px" }}
            >
              <Play className="size-4 fill-current" />
              <span>Watch Reel</span>
            </Link>

            {/* Secondary: transparent + 1.5px Obsidian border */}
            <Link
              href="#works"
              className="flex items-center gap-2.5 px-6 h-12 text-sm font-medium uppercase tracking-wider text-obsidian bg-transparent hover:bg-obsidian/6 active:scale-[0.98] transition-all"
              style={{
                borderRadius: "40px",
                border: "1.5px solid #070607",
              }}
            >
              <span>Explore Works</span>
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>

        {/* ── Right: Studio Craft Green Cutting Mat ───────────────────────── */}
        <motion.div
          {...(shouldReduceMotion
            ? {}
            : {
                initial: { opacity: 0, scale: 0.96 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.8, delay: 0.15, ease: "easeOut" as const },
              })}
          className="w-full lg:h-[480px] xl:h-[520px]"
        >
          <CuttingMat />
        </motion.div>
      </div>
    </section>
  );
}
