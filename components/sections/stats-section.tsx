import * as React from "react";
import { portfolioData } from "@/lib/data";

export function StatsSection() {
  const stats = portfolioData.stats;

  return (
    <section className="px-4 sm:px-6 md:px-8 pb-10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const isFeatured = idx === 0;
          return (
            <div
              key={stat.label}
              className="flex flex-col justify-between p-8 sm:p-10"
              style={{
                background: isFeatured ? "#fc5000" : "#f7f6f2",
                borderRadius: "40px",
                border: "1px solid rgba(7,6,7,0.08)",
              }}
            >
              {/* Label */}
              <span
                className="text-xs font-sans font-medium uppercase tracking-wider"
                style={{ color: isFeatured ? "rgba(7,6,7,0.65)" : "rgba(7,6,7,0.5)" }}
              >
                {stat.label}
              </span>

              {/* Metric */}
              <div className="flex flex-col gap-1 mt-6">
                <div
                  className="font-heading leading-none"
                  style={{
                    fontSize: "clamp(56px, 6vw, 80px)",
                    letterSpacing: "0.02em",
                    color: isFeatured ? "#070607" : "#070607",
                    lineHeight: 1.05,
                  }}
                >
                  {stat.value}
                </div>
                <p
                  className="text-xs font-sans mt-1"
                  style={{ color: isFeatured ? "rgba(7,6,7,0.65)" : "rgba(7,6,7,0.5)" }}
                >
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
