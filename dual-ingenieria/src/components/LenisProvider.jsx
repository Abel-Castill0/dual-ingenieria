"use client";

import { useEffect } from "react";

export default function LenisProvider({ children }) {
  useEffect(() => {
    let lenis;

    async function init() {
      const { default: Lenis } = await import("lenis");
      const { default: gsap }  = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.6,
        infinite: false,
      });

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }

    init();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return children;
}
