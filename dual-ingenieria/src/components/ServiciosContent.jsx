"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger);

export default function ServiciosContent() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".s-reveal",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power4.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Servicios de ingeniería eléctrica - Dual Ingeniería"
            fill
            className="object-cover opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-950/85 to-navy-900/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="h-1 w-14 bg-gradient-to-r from-navy-400 to-copper rounded-full mb-5" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Servicios de <span className="text-gradient">Ingeniería Eléctrica</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-navy-200/70 leading-relaxed">
              Ofrecemos soluciones integrales para cada etapa de tu proyecto eléctrico,
              desde el estudio inicial hasta la puesta en servicio y mantenimiento.
            </p>
          </div>
        </div>
      </section>

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
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-xs font-medium text-navy-500 bg-navy-50 rounded-full border border-navy-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link
                      href="/contacto"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-navy-950 text-white font-semibold rounded-2xl hover:bg-navy-800 transition-all duration-300 text-sm shadow-lg"
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
