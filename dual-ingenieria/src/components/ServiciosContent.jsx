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
    services.forEach((_, i) => {
      gsap.fromTo(
        `.s-item-${i}`,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power4.out",
          scrollTrigger: { trigger: `.s-item-${i}`, start: "top 82%", once: true },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <>
      <PageHero
        label="Lo que hacemos"
        title="Soluciones eléctricas integrales."
        subtitle="Desde el estudio inicial hasta la puesta en servicio y mantenimiento. Siete especialidades bajo un mismo equipo."
      />

      <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((svc, i) => (
              <div
                key={svc.id}
                className={`s-item-${i} grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  i % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Image */}
                <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-navy-900/15 group">
                    <Image
                      src={svc.img}
                      alt={`${svc.title} - Dual Ingeniería`}
                      width={700}
                      height={480}
                      className="w-full h-[360px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent pointer-events-none" />
                    {/* Service number badge */}
                    <div
                      className="absolute top-5 right-5 w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold"
                      style={{
                        background: "rgba(7,13,26,0.6)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(194,133,94,0.3)",
                        color: "#c2855e",
                      }}
                    >
                      {svc.num}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="section-label mb-5">Servicio {svc.num}</div>
                  <h2 className="text-[clamp(1.5rem,3vw,2.3rem)] font-bold text-navy-950 leading-tight">
                    {svc.title}
                  </h2>
                  <p className="mt-5 text-base text-navy-700/65 leading-relaxed">
                    {svc.fullDesc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 text-xs font-semibold rounded-full"
                        style={{
                          background: "rgba(194,133,94,0.08)",
                          color: "#a06a47",
                          border: "1px solid rgba(194,133,94,0.2)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/contacto"
                      className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                      style={{
                        background: "linear-gradient(135deg, #c2855e, #a06a47)",
                        boxShadow: "0 6px 20px rgba(194,133,94,0.2)",
                      }}
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
