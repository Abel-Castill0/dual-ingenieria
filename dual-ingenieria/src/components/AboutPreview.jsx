"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: "Precisión técnica",
    desc: "Normativa NEC, IEC y estándares peruanos en cada proyecto.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Seguridad ante todo",
    desc: "Cumplimiento de INDECI, ITSE y normas de seguridad eléctrica.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Equipo certificado",
    desc: "Ingenieros colegiados y técnicos con amplia experiencia de campo.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
];

export default function AboutPreview() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".ap-reveal",
      { y: 44, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.75, stagger: 0.14, ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-36 bg-white overflow-hidden">
      {/* Ghost number decorative */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] font-bold leading-none select-none pointer-events-none"
        style={{ color: "rgba(14,31,61,0.03)", lineHeight: 1 }}
        aria-hidden
      >
        02
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image column */}
          <div className="ap-reveal relative order-2 lg:order-1">
            {/* Corner accent */}
            <div className="absolute -top-5 -left-5 w-16 h-16 border-2 border-copper/30 rounded-2xl pointer-events-none" />
            <div className="absolute -bottom-5 -right-5 w-10 h-10 border border-copper/20 rounded-xl pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-navy-900/15">
              <Image
                src="/images/ingeniero2.jpg"
                alt="Equipo de Dual Ingeniería en campo"
                width={800}
                height={560}
                className="w-full h-[380px] lg:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 glass-card-light rounded-2xl px-5 py-4">
                <div
                  className="text-3xl font-bold leading-none"
                  style={{ background: "linear-gradient(120deg, #c2855e, #d9a882)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                >
                  12+
                </div>
                <div className="text-xs font-semibold text-navy-700 mt-0.5 tracking-wide">
                  Años de experiencia
                </div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="order-1 lg:order-2">
            <div className="ap-reveal mb-6">
              <span className="section-label">Quiénes somos</span>
            </div>

            <h2 className="ap-reveal text-[clamp(1.9rem,4vw,3rem)] font-bold text-navy-950 leading-[1.1] tracking-tight">
              Ingeniería eléctrica
              <br />
              <span className="text-gradient">que no falla.</span>
            </h2>

            {/* Mission block with copper left border */}
            <div className="ap-reveal mt-7 pl-5 border-l-2 border-copper/60">
              <p className="text-base text-navy-700/75 leading-relaxed">
                En <strong className="text-navy-800">Dual Ingeniería</strong> somos una empresa peruana especializada
                en proyectos eléctricos integrales. Desde el estudio y diseño hasta la
                instalación, puesta en marcha y mantenimiento — cubrimos cada etapa con
                rigosidad técnica y compromiso total.
              </p>
            </div>

            {/* Pillars */}
            <div className="ap-reveal mt-10 space-y-4">
              {pillars.map((p) => (
                <div key={p.title} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "rgba(194,133,94,0.1)", color: "#c2855e" }}>
                    {p.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-navy-900">{p.title}</div>
                    <div className="text-sm text-navy-600/65 mt-0.5 leading-relaxed">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="ap-reveal mt-10">
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 text-sm font-semibold text-copper hover:text-copper-dark transition-colors group"
              >
                Conoce nuestra historia
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
