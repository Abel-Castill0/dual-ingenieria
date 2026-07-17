"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const accentColors = {
  copper: "bg-copper",
  electric: "bg-electric",
};

export default function PageHero({ 
  title, 
  subtitle, 
  accentColor = "copper", 
  decoration = "line",
  icon 
}) {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      containerRef.current.querySelector("h1"),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    )
    .fromTo(
      lineRef.current,
      { width: 0 },
      { width: "60px", duration: 0.5, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(
      containerRef.current.querySelector("p"),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.3"
    );
  }, { scope: containerRef });

  const accentClass = accentColors[accentColor] || accentColors.copper;

  return (
    <section ref={containerRef} className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-2xl">
          {icon && (
            <div className="mb-6">
              {icon}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-950 leading-tight">
            {title}
          </h1>
          <div className="mt-6">
            <div 
              ref={lineRef}
              className={`h-[3px] ${accentClass} rounded-full`}
            />
          </div>
          {subtitle && (
            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
