import { portfolioData } from "@/lib/data";
import { Check } from "lucide-react";

export function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12 sm:gap-14">

        {/* Section Header */}
        <div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6"
          style={{ borderBottom: "1px solid rgba(7,6,7,0.12)" }}
        >
          <h2
            className="font-heading text-5xl sm:text-6xl md:text-7xl uppercase text-obsidian"
            style={{ letterSpacing: "0.02em", lineHeight: 0.95 }}
          >
            SERVICES &{" "}
            <span className="text-ember">CAPABILITIES</span>
          </h2>
          <p className="text-sm text-obsidian/55 max-w-md font-sans font-medium">
            Turnkey post-production for record labels, commercial agencies, and discerning creators.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {portfolioData.services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between p-8 sm:p-10"
              style={{
                background: "#f7f6f2",
                borderRadius: "40px",
                border: "1px solid rgba(7,6,7,0.08)",
              }}
            >
              <div className="flex flex-col gap-4">
                <h3
                  className="font-heading text-3xl sm:text-4xl uppercase text-obsidian"
                  style={{ letterSpacing: "0.02em" }}
                >
                  {service.title}
                </h3>

                <p className="text-sm sm:text-base text-obsidian/60 leading-relaxed font-sans">
                  {service.description}
                </p>

                {/* Highlight badge */}
                <div
                  className="px-4 py-2.5 text-xs font-mono text-obsidian/70"
                  style={{
                    background: "#e2e2df",
                    borderRadius: "20px",
                  }}
                >
                  {service.highlight}
                </div>

                {/* Deliverables */}
                <div className="flex flex-col gap-2 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-obsidian/45">
                    Deliverables
                  </span>
                  <ul className="flex flex-col gap-2">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-obsidian/70 font-sans"
                      >
                        <div
                          className="size-4 flex items-center justify-center shrink-0 mt-0.5 text-obsidian"
                          style={{ background: "#f5f28e", borderRadius: "800px" }}
                        >
                          <Check className="size-2.5 stroke-[3]" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-6 mt-2" style={{ borderTop: "1px solid rgba(7,6,7,0.1)" }}>
                <a
                  href={`${portfolioData.socials.whatsapp}?text=Hi%20Shahan,%20I'm%20interested%20in%20"${encodeURIComponent(service.title)}"`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 h-10 text-xs uppercase tracking-wider font-semibold text-obsidian bg-transparent border-[1.5px] border-obsidian/25 hover:bg-ember hover:border-ember active:scale-[0.98] transition-all"
                  style={{ borderRadius: "40px" }}
                >
                  Commission This
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
