"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/products";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

export default function ServiciosContent() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".s-reveal",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power4.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
    );
  }, { scope: sectionRef });

  return (
    <>
      <PageHero
        title="Nuestros Servicios"
        subtitle="Ofrecemos soluciones integrales para cada etapa de tu proyecto eléctrico, desde el estudio inicial hasta la puesta en servicio y mantenimiento."
        accentColor="electric"
        decoration="line"
      />

      <section ref={sectionRef} className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((svc, i) => (
              <div
                key={svc.id}
                className={`s-reveal grid lg:grid-cols-2 gap-10 items-center ${
                  i % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="relative rounded-3xl overflow-hidden shadow-xl group">
                    <Image
                      src={svc.img}
                      alt={`${svc.title} - Dual Ingeniería`}
                      width={700}
                      height={480}
                      className="w-full h-[340px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-navy-500/15 backdrop-blur-sm border border-navy-400/20 flex items-center justify-center text-sm font-bold text-navy-300">
                      {svc.num}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/30 to-transparent pointer-events-none" />
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-navy-950 leading-tight">
                    {svc.title}
                  </h2>
                  <p className="mt-4 text-base text-navy-700/70 leading-relaxed">
                    {svc.fullDesc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {svc.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 text-xs font-medium text-navy-500 bg-navy-50 rounded-full border border-navy-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/contacto"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-electric text-white font-semibold rounded-2xl hover:bg-electric-dark transition-all duration-300 text-sm shadow-lg shadow-electric/20"
                    >
                      Solicitar este Servicio
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
