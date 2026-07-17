"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: 12, suffix: "+", label: "Años de experiencia", sub: "Desde 2012" },
  { num: 200, suffix: "+", label: "Proyectos ejecutados", sub: "Industrial · Comercial" },
  { num: 50, suffix: "+", label: "Clientes satisfechos", sub: "Lima y provincias" },
  { num: 100, suffix: "%", label: "Compromiso total", sub: "En cada proyecto" },
];

function Counter({ num, suffix, id }) {
  const ref = useRef(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: num,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onUpdate() {
        el.textContent = Math.floor(obj.val) + suffix;
      },
    });
  }, { scope: ref, dependencies: [num, suffix] });

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

export default function StatsBand() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".sb-item",
      { y: 24, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-dark="true"
      className="relative bg-navy-950 overflow-hidden"
    >
      {/* Subtle copper gradient top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(194,133,94,0.4), transparent)" }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(194,133,94,0.2), transparent)" }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-18">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`sb-item flex flex-col items-center text-center px-4 py-6 md:py-8 ${
                i < stats.length - 1 ? "border-r border-navy-800/40" : ""
              }`}
            >
              <div
                className="text-[clamp(2.2rem,4.5vw,3.25rem)] font-bold leading-none tabular-nums"
                style={{ background: "linear-gradient(120deg, #a3c9f0 0%, #c2855e 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                <Counter num={s.num} suffix={s.suffix} id={s.label} />
              </div>
              <div className="mt-3 text-[13px] font-semibold text-white/80 leading-tight">
                {s.label}
              </div>
              <div className="mt-1 text-[10px] font-medium text-navy-400 tracking-wide uppercase">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
