"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import { portfolioData } from "@/lib/data";
import { MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string | null>(null);

  const isProgrammaticScrollRef = React.useRef(false);
  const scrollLockTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const updateActiveSection = React.useCallback(() => {
    if (typeof window === "undefined" || isProgrammaticScrollRef.current) return;

    // If near bottom of the document, activate the contact section
    const scrollBottom = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollBottom >= documentHeight - 100) {
      setActiveSection("#contact");
      return;
    }

    const sections = portfolioData.navigation
      .map((item) => ({
        href: item.href,
        el: document.getElementById(item.href.replace("#", "")),
      }))
      .filter((s): s is { href: string; el: HTMLElement } => s.el !== null);

    if (sections.length === 0) return;

    // If above the first section (e.g. within Hero or Stats), no pill is active
    const firstSectionTop = sections[0].el.getBoundingClientRect().top;
    if (firstSectionTop > 300) {
      setActiveSection(null);
      return;
    }

    // Find the last section whose top has scrolled past the 200px threshold
    let currentActive: string | null = null;
    for (const { href, el } of sections) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 200) {
        currentActive = href;
      }
    }

    setActiveSection(currentActive);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
    updateActiveSection();
  });

  React.useEffect(() => {
    const handleResize = () => updateActiveSection();
    window.addEventListener("resize", handleResize);
    const frameId = requestAnimationFrame(updateActiveSection);

    // If the user manually scrolls with wheel/touch, immediately release the programmatic scroll lock
    const handleManualInterrupt = () => {
      if (isProgrammaticScrollRef.current) {
        isProgrammaticScrollRef.current = false;
        if (scrollLockTimerRef.current) {
          clearTimeout(scrollLockTimerRef.current);
        }
        updateActiveSection();
      }
    };

    window.addEventListener("wheel", handleManualInterrupt, { passive: true });
    window.addEventListener("touchmove", handleManualInterrupt, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleManualInterrupt);
      window.removeEventListener("touchmove", handleManualInterrupt);
      cancelAnimationFrame(frameId);
      if (scrollLockTimerRef.current) {
        clearTimeout(scrollLockTimerRef.current);
      }
    };
  }, [updateActiveSection]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setActiveSection(href);
    setMobileMenuOpen(false);

    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      isProgrammaticScrollRef.current = true;
      if (scrollLockTimerRef.current) {
        clearTimeout(scrollLockTimerRef.current);
      }

      // Smooth scroll directly to the section with proper header offset
      const headerOffset = 80;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL hash cleanly without Next.js router scroll interference
      window.history.pushState(null, "", href);

      // Release the lock after smooth scroll animation completes
      scrollLockTimerRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
        updateActiveSection();
      }, 850);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveSection(null);
    setMobileMenuOpen(false);

    isProgrammaticScrollRef.current = true;
    if (scrollLockTimerRef.current) {
      clearTimeout(scrollLockTimerRef.current);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(null, "", "/");

    scrollLockTimerRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      updateActiveSection();
    }, 850);
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 px-4 sm:px-6 md:px-8 pt-5 sm:pt-6 pointer-events-none transition-all duration-300",
        scrolled && "pt-3 sm:pt-4"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">

        {/* Brand Lockup */}
        <Link
          href="/"
          scroll={false}
          onClick={handleLogoClick}
          className="flex items-center gap-3 px-4 py-2 rounded-full bg-limestone border border-obsidian/10 transition-colors hover:border-ember/40"
          style={{ borderRadius: "800px" }}
        >
          <span className="font-heading text-base tracking-[0.02em] uppercase leading-none text-obsidian">
            SHAHAN
          </span>
          <span className="text-ember font-heading text-base tracking-[0.02em] uppercase leading-none">
            HASSAN
          </span>
        </Link>

        {/* Desktop Nav Pill */}
        <nav
          className="hidden md:flex items-center gap-0.5 px-2 py-1.5"
          style={{
            background: "#f7f6f2",
            borderRadius: "800px",
            border: "1px solid rgba(7,6,7,0.1)",
          }}
        >
          {portfolioData.navigation.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                scroll={false}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "relative px-4 py-1.5 text-[13px] font-sans font-medium tracking-wide transition-colors",
                  isActive
                    ? "text-obsidian font-semibold"
                    : "text-obsidian/75 hover:text-obsidian hover:bg-pumice/50"
                )}
                style={{ borderRadius: "800px" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-[0_1px_3px_rgba(7,6,7,0.08)] border border-obsidian/5"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Social Icons */}
          <div
            className="hidden lg:flex items-center gap-0.5 px-2 py-1.5"
            style={{
              background: "#f7f6f2",
              borderRadius: "800px",
              border: "1px solid rgba(7,6,7,0.1)",
            }}
          >
            <a
              href={portfolioData.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-obsidian/60 hover:text-ember transition-colors"
              style={{ borderRadius: "800px" }}
              aria-label="Instagram"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={portfolioData.socials.youtube}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-obsidian/60 hover:text-ember transition-colors"
              style={{ borderRadius: "800px" }}
              aria-label="YouTube"
            >
              <YoutubeIcon className="size-4" />
            </a>
          </div>

          {/* Inquire CTA — Ember pill with Obsidian text */}
          <a
            href={portfolioData.socials.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 h-9 text-xs uppercase tracking-wider font-semibold text-obsidian bg-ember transition-colors hover:bg-ember/90 active:scale-[0.98]"
            style={{ borderRadius: "800px" }}
          >
            <MessageCircle className="size-3.5" />
            <span>Inquire</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden size-9 flex items-center justify-center text-obsidian bg-limestone border border-obsidian/10 hover:border-ember/40 transition-colors"
            style={{ borderRadius: "800px" }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="size-4" />
            ) : (
              <Menu className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 p-3 rounded-lg border pointer-events-auto flex flex-col gap-1"
            style={{
              background: "#f7f6f2",
              border: "1px solid rgba(7,6,7,0.1)",
            }}
          >
            {portfolioData.navigation.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  scroll={false}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium uppercase tracking-wider transition-colors",
                    isActive
                      ? "bg-white text-obsidian font-semibold shadow-xs"
                      : "text-obsidian/80 hover:bg-pumice hover:text-obsidian"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {isActive && (
                      <span className="size-1.5 rounded-full bg-ember" />
                    )}
                    {item.label}
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "size-4 transition-colors",
                      isActive ? "text-ember" : "text-obsidian/40"
                    )}
                  />
                </Link>
              );
            })}

            <div className="pt-2 border-t border-obsidian/10 flex items-center justify-between px-2">
              <span className="text-xs text-obsidian/50 uppercase tracking-wider">
                Socials
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={portfolioData.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-pumice text-obsidian hover:text-ember transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="size-4" />
                </a>
                <a
                  href={portfolioData.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-pumice text-obsidian hover:text-ember transition-colors"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="size-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
