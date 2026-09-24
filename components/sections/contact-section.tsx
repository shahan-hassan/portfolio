"use client";

import * as React from "react";
import { portfolioData } from "@/lib/data";
import {
  MessageCircle,
  Mail,
  Copy,
  Check,
  ArrowUp,
  ArrowUpRight,
} from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/icons";

export function ContactSection() {
  const [copied, setCopied] = React.useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="pt-20 pb-10 px-4 sm:px-6 md:px-8"
      style={{ borderTop: "1px solid rgba(7,6,7,0.12)" }}
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-16 sm:gap-20">

        {/* Main CTA Block */}
        <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">

          {/* Availability tag */}
          <span
            className="inline-flex items-center px-4 py-1.5 text-[11px] font-sans font-medium uppercase tracking-[0.18em] text-obsidian"
            style={{ background: "#f5f28e", borderRadius: "800px" }}
          >
            Open for Commissions
          </span>

          <h2
            className="font-heading text-5xl sm:text-7xl md:text-8xl uppercase text-obsidian"
            style={{ letterSpacing: "0.02em", lineHeight: 0.94 }}
          >
            LET&apos;S CREATE{" "}
            <span className="text-ember">SOMETHING</span>{" "}
            UNFORGETTABLE
          </h2>

          <p className="text-base sm:text-lg text-obsidian/60 max-w-xl leading-relaxed font-sans font-medium">
            Have a music video, brand commercial, or narrative short film in
            pre-production? Reach out directly via WhatsApp or socials to lock in your timeline.
          </p>

          {/* Contact CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2">
            {/* Primary: Ember pill */}
            <a
              href={portfolioData.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 px-8 h-13 text-sm font-semibold uppercase tracking-wider text-obsidian bg-ember hover:bg-ember/90 active:scale-[0.98] transition-all"
              style={{ borderRadius: "800px", height: "3.25rem" }}
            >
              <MessageCircle className="size-4" />
              <span>Message on WhatsApp</span>
            </a>

            {/* Secondary: Transparent + Obsidian border */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex items-center gap-2.5 px-6 text-sm font-medium uppercase tracking-wider text-obsidian bg-transparent hover:bg-obsidian/6 active:scale-[0.98] transition-all"
              style={{
                borderRadius: "40px",
                border: "1.5px solid #070607",
                height: "3.25rem",
              }}
            >
              {copied ? (
                <>
                  <Check className="size-4 text-ember" />
                  <span className="text-ember font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Mail className="size-4" />
                  <span>{portfolioData.socials.email}</span>
                  <Copy className="size-3.5 text-obsidian/40 ml-0.5" />
                </>
              )}
            </button>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3 mt-4">
            {portfolioData.socials.instagram && (
              <a
                href={portfolioData.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-obsidian transition-all hover:border-ember"
                style={{
                  background: "#f7f6f2",
                  borderRadius: "800px",
                  border: "1px solid rgba(7,6,7,0.1)",
                }}
              >
                <InstagramIcon className="size-4" />
                <span>Instagram</span>
                <ArrowUpRight className="size-3 text-obsidian/40" />
              </a>
            )}
            {portfolioData.socials.youtube && (
              <a
                href={portfolioData.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-obsidian transition-all hover:border-ember"
                style={{
                  background: "#f7f6f2",
                  borderRadius: "800px",
                  border: "1px solid rgba(7,6,7,0.1)",
                }}
              >
                <YoutubeIcon className="size-4" />
                <span>YouTube</span>
                <ArrowUpRight className="size-3 text-obsidian/40" />
              </a>
            )}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-obsidian/45"
          style={{ borderTop: "1px solid rgba(7,6,7,0.1)" }}
        >
          <span>
            &copy; {new Date().getFullYear()} {portfolioData.personal.name}. All rights reserved.
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 text-obsidian/55 hover:text-obsidian transition-colors"
            style={{ borderRadius: "800px" }}
            aria-label="Back to top"
          >
            <ArrowUp className="size-4" />
            <span className="uppercase text-[11px] font-semibold">Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
