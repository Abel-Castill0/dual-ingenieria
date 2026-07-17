"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("@/components/HeroScene"), { ssr: false });

const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.25 } },
};

const item = {
  hidden:  { y: 48, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroSection() {
  const sectionRef  = useRef(null);
  const progressRef = useRef(0);
  const [sceneOpacity, setSceneOpacity] = useState(1);

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

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0 hidden md:block pointer-events-none select-none">
        <HeroScene progressRef={progressRef} opacity={sceneOpacity} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end min-h-[100svh] pb-20 md:pb-24 lg:pb-32">
        <motion.div
          className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-xl lg:max-w-[45%]">

            {/* Label */}
            <motion.div variants={item} className="mb-6">
              <span className="section-label-light">Lima, Perú · Desde 2012</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="text-[clamp(2.4rem,7vw,5.5rem)] font-bold text-white leading-[1.03] tracking-tight"
            >
              Del diseño
              <br />
              <span className="text-gradient-copper">al encendido.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={item}
              className="mt-6 text-[clamp(0.9rem,1.5vw,1.05rem)] text-white/50 max-w-md leading-relaxed"
            >
              Especialistas en proyectos eléctricos integrales para industrias,
              infraestructura y obra comercial en Lima y todo el Perú.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-copper/25"
                style={{ background: "linear-gradient(135deg, #c2855e, #a06a47)" }}
              >
                Solicitar Cotización
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/servicios"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white/80 rounded-xl border border-white/15 hover:bg-white/8 hover:text-white hover:border-white/30 transition-all duration-300"
              >
                Ver Servicios
              </Link>
            </motion.div>

            {/* Inline micro-stats */}
            <motion.div
              variants={item}
              className="mt-12 flex items-center gap-6 text-[11px] text-white/25 font-medium tracking-wide"
            >
              {["12+ Años", "200+ Proyectos", "50+ Clientes"].map((stat, i) => (
                <span key={stat} className="flex items-center gap-6">
                  {i > 0 && <span className="w-px h-3 bg-white/15" />}
                  {stat}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
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
