"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsMobile from "@/hooks/useIsMobile";
import MobileCircuitBackground from "@/components/MobileCircuitBackground";

gsap.registerPlugin(ScrollTrigger);

// loading: null — la sección ya es navy-950 con imagen de fondo, un fallback
// visual extra sería invisible sobre ese mismo fondo.
const Hero3D = dynamic(() => import("@/components/Hero3D"), {
  ssr: false,
  loading: () => null,
});

export default function HeroSection() {
  const sectionRef  = useRef(null);
  const ctaRef      = useRef(null);
  const progressRef = useRef(0);
  const [sceneOpacity, setSceneOpacity] = useState(1);
  const isMobile = useIsMobile();

  useGSAP(() => {
    if (window.innerWidth <= 768) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=80%",
      pin: true,
      scrub: 0.8,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        setSceneOpacity(1 - self.progress);
      },
    });

    ScrollTrigger.refresh();
    return () => st.kill();
  }, { scope: sectionRef });

  // Entrada del texto: cortina en el titular (mismo patrón que PageHero) +
  // fade/slide escalonado en label, subtítulo, CTAs y stats.
  useGSAP(() => {
    gsap.set(".hs-title", { yPercent: 115 });
    gsap.set(".hs-fade", { y: 28, opacity: 0 });

    gsap.timeline({ delay: 0.2, defaults: { ease: "power4.out" } })
      .to(".hs-label", { y: 0, opacity: 1, duration: 0.5 })
      .to(".hs-title", { yPercent: 0, duration: 1.05 }, "-=0.25")
      .to(".hs-fade", { y: 0, opacity: 1, duration: 0.7, stagger: 0.14 }, "-=0.55");
  }, { scope: sectionRef });

  // Micro-interacción "magnética": el CTA principal sigue al cursor dentro
  // de su propio radio (gsap.quickTo interpola sin recrear tweens en cada
  // evento — el costo por frame es mínimo). Desactivada en touch.
  useGSAP(() => {
    if (!ctaRef.current) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const xTo = gsap.quickTo(ctaRef.current, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(ctaRef.current, "y", { duration: 0.45, ease: "power3" });

    const onMove = (e) => {
      const r = ctaRef.current.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.3);
      yTo((e.clientY - r.top - r.height / 2) * 0.3);
    };
    const onLeave = () => { xTo(0); yTo(0); };

    const el = ctaRef.current;
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      data-dark="true"
      className="relative w-full min-h-[100svh] overflow-hidden bg-[#070d1a]"
    >
      {/* Background image + gradient */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <Image
          src="/images/subestacion.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.10]"
          priority
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#070d1a]/98 via-[#0a1128]/85 to-[#0f1f3d]/70" />
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden />

      {/* Thin copper accent line — top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 0%, #c2855e 50%, transparent 100%)" }}
        aria-hidden
      />

      {/* 3D Scene — solo desktop: isMobile === false (no `!isMobile`, que
          sería true durante el estado null inicial y dispararía la descarga
          del chunk de Three.js también en móviles). */}
      {isMobile === false && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Hero3D progressRef={progressRef} opacity={sceneOpacity} />
        </div>
      )}

      {/* Degradación móvil: circuito SVG estático — cero JS, cero GPU */}
      {isMobile === true && (
        <MobileCircuitBackground className="absolute inset-0 z-0 w-full h-full pointer-events-none opacity-70" />
      )}

      {/* Content */}
      {/* pt-28/32: aunque el contenido es justify-end, en viewports cortos
          (landscape móvil) evita que el H1 alcance la zona del navbar. */}
      <div className="relative z-10 flex flex-col justify-end min-h-[100svh] pt-28 md:pt-32 pb-20 md:pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl lg:max-w-[45%]">

            {/* Label */}
            <div className="hs-label mb-6">
              <span className="section-label-light">Lima, Perú · Desde 2012</span>
            </div>

            {/* Headline — máscara de cortina, mismo patrón que PageHero */}
            <div className="overflow-hidden">
              <h1 className="hs-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.02] tracking-tight">
                Del diseño
                <br />
                <span className="text-gradient-copper">al encendido.</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="hs-fade mt-6 text-[clamp(0.9rem,1.5vw,1.05rem)] text-white/50 max-w-md leading-relaxed">
              Estudios eléctricos, subestaciones y mantenimiento industrial
              para proyectos en Lima y todo el Perú.
            </p>

            {/* CTAs */}
            <div className="hs-fade mt-9 flex flex-wrap gap-3">
              <Link
                ref={ctaRef}
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-xl bg-copper hover:bg-copper-dark shadow-lg shadow-copper/20 hover:shadow-xl hover:shadow-copper/35 transition-[background-color,box-shadow] duration-300 will-change-transform"
              >
                Cotizar Proyecto
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-copper-light rounded-xl border border-copper/40 hover:bg-copper/10 hover:border-copper/70 transition-all duration-300"
              >
                Explorar Servicios
              </Link>
            </div>

            {/* Trust badges */}
            <div className="hs-fade mt-12 flex flex-wrap items-center gap-x-7 gap-y-3">
              {[
                {
                  label: "Ingenieros Colegiados",
                  icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  label: "Normativa CNE · INDECI",
                  icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
                },
                {
                  label: "12+ Años de Experiencia",
                  icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
                },
              ].map((badge) => (
                <span key={badge.label} className="flex items-center gap-2 text-[11px] text-white/35 font-medium tracking-wide">
                  <svg className="w-3.5 h-3.5 text-copper/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={badge.icon} />
                  </svg>
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex flex-col items-center gap-1.5 animate-bounce"
        >
          <span className="text-[9px] text-white/18 tracking-[0.25em] uppercase">scroll</span>
          <svg className="w-3.5 h-3.5 text-white/18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
