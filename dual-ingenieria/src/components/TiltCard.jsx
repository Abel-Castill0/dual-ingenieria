"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * Envuelve una tarjeta con un tilt 3D que sigue al cursor.
 * Se desactiva automáticamente en dispositivos táctiles (pointer: coarse).
 * quickTo interpola sin recrear tweens en cada evento de mousemove.
 */
export default function TiltCard({ children, className = "", maxTilt = 7 }) {
  const ref = useRef(null);

  useGSAP(() => {
    if (!ref.current) return;
    gsap.set(ref.current, { transformPerspective: 800 });

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const cfg = { duration: 0.4, ease: "power3" };
    const rotateXTo = gsap.quickTo(ref.current, "rotationX", cfg);
    const rotateYTo = gsap.quickTo(ref.current, "rotationY", cfg);
    // scaleX/scaleY separados: el shorthand "scale" no es reseteable en el
    // revert de useGSAP y GSAP lo advierte en consola durante Fast Refresh.
    const scaleXTo = gsap.quickTo(ref.current, "scaleX", cfg);
    const scaleYTo = gsap.quickTo(ref.current, "scaleY", cfg);

    const handleMouseMove = (e) => {
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateXTo(maxTilt * -py * 2);
      rotateYTo(maxTilt * px * 2);
      scaleXTo(1.02);
      scaleYTo(1.02);
    };

    const handleMouseLeave = () => {
      rotateXTo(0);
      rotateYTo(0);
      scaleXTo(1);
      scaleYTo(1);
    };

    const el = ref.current;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: ref, dependencies: [maxTilt] });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
