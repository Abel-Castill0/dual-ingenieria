"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/products";
import ServiceCard3D from "./ServiceCard3D";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPreview() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".sp-title",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power4.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
    );
  }, { scope: sectionRef });

  const featured = services.slice(0, 3);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-navy-50/40 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sp-title text-center max-w-2xl mx-auto mb-14">
          <div className="h-1 w-14 bg-gradient-to-r from-navy-400 to-copper rounded-full mx-auto mb-5" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-950 leading-tight">
            Servicios de <span className="text-gradient">Ingeniería Eléctrica</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Soluciones integrales para cada etapa de tu proyecto
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((svc, i) => (
            <ServiceCard3D key={svc.id} service={svc} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-electric text-white font-semibold rounded-2xl shadow-lg shadow-electric/20 hover:bg-electric-dark hover:shadow-electric/30 hover:-translate-y-0.5 transition-all duration-300 text-sm"
          >
            Ver Todos los Servicios
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
