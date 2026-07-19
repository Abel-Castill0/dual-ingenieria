"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function PageHero({ title, subtitle, label }) {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.set(".ph-title", { yPercent: 110 });
    gsap.set(".ph-sub, .ph-label", { y: 16, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(".ph-line", { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.out" })
      .to(".ph-label", { y: 0, opacity: 1, duration: 0.45 }, "-=0.25")
      .to(".ph-title", { yPercent: 0, duration: 0.95 }, "-=0.2")
      .to(".ph-sub", { y: 0, opacity: 1, duration: 0.55 }, "-=0.5");
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      data-dark="true"
      className="relative bg-navy-950 overflow-hidden"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" aria-hidden />

      {/* Ambient glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(194,133,94,0.06) 0%, transparent 65%)" }}
        aria-hidden
      />

      {/* Copper top rule */}
      <div
        className="ph-line absolute top-0 left-0 right-0 h-[2px] origin-left"
        style={{ background: "linear-gradient(90deg, transparent 0%, #c2855e 40%, transparent 100%)" }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-24">
        {label && (
          <div className="ph-label section-label mb-5">{label}</div>
        )}
        {/* Máscara de revelado: overflow-hidden recorta el título mientras sube desde abajo */}
        <div className="overflow-hidden">
          <h1 className="ph-title text-[clamp(2.2rem,6vw,4.5rem)] font-bold text-white leading-[1.06] tracking-tight max-w-3xl">
            {title}
          </h1>
        </div>
        {subtitle && (
          <p className="ph-sub mt-5 text-[clamp(0.9rem,1.4vw,1.05rem)] text-white/45 max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
