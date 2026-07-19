"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    num: "01",
    title: "Calidad",
    desc: "Estándares rigurosos en cada proyecto, con certificaciones y cumplimiento normativo que garantizan resultados de excelencia técnica.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Seguridad",
    desc: "La seguridad es nuestra prioridad absoluta. Protocolos estrictos en todas nuestras operaciones para proteger equipo y clientes.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Innovación",
    desc: "Adoptamos tecnologías de vanguardia y metodologías modernas para ofrecer soluciones eléctricas eficientes y sostenibles.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Compromiso",
    desc: "Nos comprometemos con cada proyecto como si fuera propio, brindando atención personalizada y cumpliendo los plazos pactados.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
  },
];

const team = [
  {
    name: "Ing. Abel Castillo",
    role: "Gerente General",
    img: "/images/ingeniero.webp",
    desc: "Ingeniero electricista con más de 15 años de experiencia liderando proyectos de infraestructura eléctrica en el sector industrial y comercial.",
  },
  {
    name: "Ing. María Torres",
    role: "Directora de Proyectos",
    img: "/images/ingeniero.webp",
    desc: "Especialista en gestión de proyectos eléctricos de media y alta tensión. Certificada en PMP y normativas internacionales.",
  },
  {
    name: "Ing. Carlos Mendoza",
    role: "Jefe de Mantenimiento",
    img: "/images/ingeniero.webp",
    desc: "Experto en mantenimiento predictivo y correctivo de subestaciones. Amplia experiencia en termografía y análisis de aceite dieléctrico.",
  },
];

export default function NosotrosContent() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".n-reveal",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.09,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      }
    );
  }, { scope: sectionRef });

  return (
    <>
      <PageHero
        label="Quiénes somos"
        title="Impulsando el futuro eléctrico del Perú."
        subtitle="Conoce la historia, los valores y el equipo que hacen de Dual Ingeniería un referente en ingeniería eléctrica."
      />

      <section ref={sectionRef} className="py-12 md:py-20 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Historia */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
            <div>
              <div className="n-reveal section-label mb-5">Nuestra Historia</div>
              <h2 className="n-reveal text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-navy-950 leading-tight">
                Más de 12 años construyendo <span style={{ color: "#c2855e" }}>confianza</span> y resultados.
              </h2>
              <div
                className="n-reveal mt-6 pl-5 text-base text-navy-700/65 leading-relaxed"
                style={{ borderLeft: "2px solid rgba(194,133,94,0.55)" }}
              >
                Dual Ingeniería nació con la visión de ofrecer servicios de ingeniería eléctrica de alta calidad en el Perú. Desde nuestros inicios, nos hemos enfocado en construir relaciones de confianza con nuestros clientes, basadas en la transparencia, la calidad técnica y el compromiso con los resultados.
              </div>
              <p className="n-reveal mt-4 text-base text-navy-700/65 leading-relaxed">
                Hemos ejecutado más de 200 proyectos exitosos en Lima y provincias, desde pequeñas instalaciones comerciales hasta grandes subestaciones industriales. Cada proyecto nos ha permitido crecer y perfeccionar nuestra metodología de trabajo.
              </p>
            </div>

            <div className="n-reveal relative">
              {/* Corner accent */}
              <div
                className="absolute -top-5 -left-5 w-16 h-16"
                style={{ border: "2px solid rgba(194,133,94,0.25)", borderRadius: "12px" }}
                aria-hidden
              />
              <div
                className="absolute -bottom-5 -right-5 w-16 h-16"
                style={{ border: "2px solid rgba(194,133,94,0.15)", borderRadius: "12px" }}
                aria-hidden
              />
              <Image
                src="/images/industrial2.webp"
                alt="Proyecto industrial de Dual Ingeniería"
                width={700}
                height={500}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-[380px] object-cover rounded-3xl shadow-2xl shadow-navy-900/20 relative"
              />
              {/* Stat chip */}
              <div
                className="absolute bottom-6 left-6 px-4 py-3 rounded-2xl backdrop-blur-sm"
                style={{ background: "rgba(7,13,26,0.75)", border: "1px solid rgba(194,133,94,0.2)" }}
              >
                <div className="text-2xl font-bold text-white">200+</div>
                <div className="text-[11px] text-white/50 uppercase tracking-wider mt-0.5">Proyectos ejecutados</div>
              </div>
            </div>
          </div>

          {/* Valores */}
          <div className="mb-28">
            <div className="n-reveal text-center mb-14">
              <div className="section-label justify-center mb-4">Nuestros Valores</div>
              <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-bold text-navy-950">
                Los principios que guían cada proyecto.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="n-reveal group relative p-6 rounded-3xl border transition-all duration-300 hover:shadow-lg hover:shadow-navy-500/5 hover:-translate-y-1"
                  style={{ background: "rgba(7,13,26,0.02)", border: "1px solid rgba(14,31,61,0.08)" }}
                >
                  {/* Ghost number */}
                  <div
                    className="absolute top-4 right-5 text-5xl font-black select-none pointer-events-none"
                    style={{ color: "rgba(14,31,61,0.035)", lineHeight: 1 }}
                    aria-hidden
                  >
                    {v.num}
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors"
                    style={{ background: "rgba(194,133,94,0.12)", color: "#c2855e" }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="font-bold text-navy-900 text-lg mb-2">{v.title}</h3>
                  <p className="text-sm text-navy-600/65 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Equipo */}
          <div>
            <div className="n-reveal text-center mb-14">
              <div className="section-label justify-center mb-4">Nuestro Equipo</div>
              <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-bold text-navy-950">
                Profesionales certificados a tu servicio.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {team.map((m) => (
                <div key={m.name} className="n-reveal group">
                  <div className="relative h-72 rounded-3xl overflow-hidden mb-5">
                    <Image
                      src={m.img}
                      alt={m.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/10 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="text-base font-bold text-white leading-tight">{m.name}</div>
                      <div
                        className="text-[11px] font-semibold uppercase tracking-[0.15em] mt-1"
                        style={{ color: "#c2855e" }}
                      >
                        {m.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-navy-600/65 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="n-reveal mt-20 text-center">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #c2855e, #a06a47)", boxShadow: "0 8px 24px rgba(194,133,94,0.25)" }}
            >
              Trabaja con Nosotros
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
