"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { services } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPreview() {
  const sectionRef = useRef(null);
  const prevRef    = useRef(null);
  const nextRef    = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".sp-head",
      { y: 36, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" } }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f8f9fb 0%, #ffffff 100%)" }}
    >
      {/* Ghost number */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 text-[20rem] font-bold leading-none select-none pointer-events-none"
        style={{ color: "rgba(14,31,61,0.025)", lineHeight: 1 }}
        aria-hidden
      >
        03
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="sp-head mb-14">
          <span className="section-label mb-4 block">Nuestros servicios</span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-bold text-navy-950 leading-[1.1] tracking-tight max-w-lg">
              Soluciones eléctricas{" "}
              <span className="text-gradient">de principio a fin</span>
            </h2>
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-600 hover:text-copper transition-colors shrink-0 group"
            >
              Ver todos los servicios
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Swiper */}
        <div className="sp-head relative">
          <Swiper
            modules={[EffectCoverflow, Navigation, Autoplay]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 180,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              if (typeof swiper.params.navigation !== "boolean") {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            loop
            className="w-full !overflow-visible"
          >
            {services.map((svc) => (
              <SwiperSlide key={svc.id} className="swiper-slide-service">
                <ServiceCard svc={svc} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation */}
          <div className="flex items-center justify-center gap-3 mt-10">
            <button ref={prevRef} className="swiper-nav-btn" aria-label="Servicio anterior">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <Link
              href="/servicios"
              className="px-6 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-copper/20"
              style={{ background: "linear-gradient(135deg, #c2855e, #a06a47)" }}
            >
              Ver todos
            </Link>
            <button ref={nextRef} className="swiper-nav-btn" aria-label="Servicio siguiente">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ svc }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-navy-900 border border-navy-800/50 hover:border-copper/30 transition-all duration-500 hover:shadow-2xl hover:shadow-navy-950/30 select-none">
      {/* Copper top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] z-10"
        style={{ background: "linear-gradient(90deg, transparent, #c2855e, transparent)" }}
        aria-hidden
      />

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={svc.img}
          alt={`${svc.title} – Dual Ingeniería`}
          fill
          sizes="(max-width: 640px) 85vw, 400px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />

        {/* Service number badge */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-navy-950/60 backdrop-blur-sm border border-navy-700/30 flex items-center justify-center text-[11px] font-bold text-copper-light">
          {svc.num}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-base font-bold text-white leading-snug mb-2 group-hover:text-copper-light transition-colors duration-300">
          {svc.title}
        </h3>
        <p className="text-[13px] text-navy-300/55 leading-relaxed mb-4 line-clamp-2">
          {svc.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {svc.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[10px] font-medium text-navy-300/70 bg-navy-800/50 rounded-full border border-navy-700/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href="/contacto"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-copper-light hover:text-copper transition-colors"
        >
          Solicitar servicio
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
