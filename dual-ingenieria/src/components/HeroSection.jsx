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

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const childVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroSection() {
  const sectionRef = useRef(null);
  const [sceneOpacity, setSceneOpacity] = useState(1);
  const progressRef = useRef(0);
  const stRef = useRef(null);

  useGSAP(() => {
    if (window.innerWidth <= 768) return;

    stRef.current = ScrollTrigger.create({
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

    return () => {
      if (stRef.current) stRef.current.kill();
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100svh] overflow-hidden bg-[#0a1128]"
    >
      <div className="absolute inset-0 pointer-events-none select-none">
        <Image
          src="/images/subestacion.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.12]"
          priority
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1128]/95 via-[#0a1128]/80 to-[#0a1128]/90" />
      </div>

      <div className="absolute inset-0 z-0 hidden md:block pointer-events-none select-none">
        <HeroScene
          progressRef={progressRef}
          opacity={sceneOpacity}
        />
      </div>

      <div className="relative z-10 flex items-end min-h-[100svh] pb-16 md:pb-20 lg:pb-28">
        <motion.div
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-lg lg:max-w-[40%]">
            <motion.h1
              variants={childVariants}
              className="text-[clamp(1.75rem,5vw,3.5rem)] font-bold text-white leading-[1.1] tracking-tight"
            >
              Ingeniería Eléctrica de Alto Rendimiento
            </motion.h1>

            <motion.p
              variants={childVariants}
              className="mt-4 text-sm sm:text-base text-white/50 max-w-md leading-relaxed"
            >
              Diseñamos, construimos y mantenemos la infraestructura eléctrica
              que impulsa tu negocio en Perú.
            </motion.p>

            <motion.div variants={childVariants} className="mt-8">
              <Link
                href="/contacto"
                className="inline-block px-8 py-3.5 border border-copper/50 text-copper font-semibold rounded-2xl hover:bg-copper/10 hover:border-copper transition-all duration-300 text-sm sm:text-base"
              >
                Solicitar Cotización
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col items-center gap-2 animate-bounce"
          >
            <span className="text-[10px] text-white/20 tracking-[0.2em] uppercase">
              Scroll
            </span>
            <svg
              className="w-4 h-4 text-white/20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
