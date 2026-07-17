"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "12+", label: "Años de Experiencia" },
  { value: "200+", label: "Proyectos Ejecutados" },
  { value: "50+", label: "Clientes Satisfechos" },
  { value: "100%", label: "Compromiso y Calidad" },
];

export default function StatsBand() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".sb-item",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power4.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} data-dark="true" className="bg-[#0c1530] border-y border-navy-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="sb-item text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-navy-200 to-copper bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-xs text-navy-400/60 mt-1.5 tracking-wide uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
