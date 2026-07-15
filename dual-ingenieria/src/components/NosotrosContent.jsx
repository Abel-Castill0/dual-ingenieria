"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: "Calidad",
    desc: "Mantenemos estándares rigurosos en cada proyecto, con certificaciones y cumplimiento normativo que garantizan resultados de excelencia.",
  },
  {
    title: "Seguridad",
    desc: "La seguridad es nuestra prioridad absoluta. Implementamos protocolos estrictos en todas nuestras operaciones para proteger a nuestro equipo y clientes.",
  },
  {
    title: "Innovación",
    desc: "Adoptamos tecnologías de vanguardia y metodologías modernas para ofrecer soluciones eléctricas eficientes y sostenibles.",
  },
  {
    title: "Compromiso",
    desc: "Nos comprometemos con cada proyecto como si fuera propio, brindando atención personalizada y cumpliendo los plazos establecidos.",
  },
];

const team = [
  {
    name: "Ing. Abel Castillo",
    role: "Gerente General",
    img: "/images/ingeniero.jpg",
    desc: "Ingeniero electricista con más de 15 años de experiencia liderando proyectos de infraestructura eléctrica en el sector industrial y comercial.",
  },
  {
    name: "Ing. María Torres",
    role: "Directora de Proyectos",
    img: "/images/ingeniero2.jpg",
    desc: "Especialista en gestión de proyectos eléctricos de media y alta tensión. Certificada en PMP y normativas internacionales.",
  },
  {
    name: "Ing. Carlos Mendoza",
    role: "Jefe de Mantenimiento",
    img: "/images/ingeniero.jpg",
    desc: "Experto en mantenimiento predictivo y correctivo de subestaciones. Amplia experiencia en termografía y análisis de aceite dieléctrico.",
  },
];

export default function NosotrosContent() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".n-reveal",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power4.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/ingeniero2.jpg"
            alt="Dual Ingeniería - Quiénes somos"
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
              Quiénes <span className="text-gradient">Somos</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-navy-200/70 leading-relaxed">
              Conoce la historia, los valores y el equipo que hacen de Dual Ingeniería
              un referente en ingeniería eléctrica en el Perú.
            </p>
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
            <div>
              <div className="n-reveal">
                <h2 className="text-3xl font-bold text-navy-950 leading-tight">
                  Nuestra <span className="text-gradient">Historia</span>
                </h2>
              </div>
              <p className="n-reveal mt-5 text-base text-navy-700/70 leading-relaxed">
                Dual Ingeniería nació hace más de 12 años con la visión de ofrecer
                servicios de ingeniería eléctrica de alta calidad en el Perú. Desde
                nuestros inicios, nos hemos enfocado en construir relaciones de
                confianza con nuestros clientes, basadas en la transparencia, la
                calidad técnica y el compromiso con los resultados.
              </p>
              <p className="n-reveal mt-4 text-base text-navy-700/70 leading-relaxed">
                Hemos ejecutado más de 200 proyectos exitosos en Lima y provincias,
                abarcando desde pequeñas instalaciones comerciales hasta grandes
                subestaciones industriales. Cada proyecto nos ha permitido crecer
                y perfeccionar nuestra metodología de trabajo.
              </p>
            </div>
            <div className="n-reveal relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-navy-100 rounded-3xl" />
              <Image
                src="/images/industrial2.jpg"
                alt="Proyecto industrial de Dual Ingeniería"
                width={700}
                height={500}
                className="w-full h-[350px] object-cover rounded-3xl shadow-xl relative"
              />
            </div>
          </div>

          <div className="mb-20">
            <div className="n-reveal text-center max-w-xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-navy-950 leading-tight">
                Nuestros <span className="text-gradient">Valores</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((v) => (
                <div key={v.title} className="n-reveal p-6 rounded-3xl bg-navy-50/50 border border-navy-100 hover:bg-navy-50 transition-colors">
                  <h3 className="font-bold text-navy-800 text-lg mb-3">{v.title}</h3>
                  <p className="text-sm text-navy-600/70 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="n-reveal text-center max-w-xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-navy-950 leading-tight">
                Nuestro <span className="text-gradient">Equipo</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((m) => (
                <div key={m.name} className="n-reveal group">
                  <div className="relative h-64 rounded-3xl overflow-hidden mb-4">
                    <Image src={m.img} alt={m.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                  </div>
                  <h3 className="font-bold text-navy-900">{m.name}</h3>
                  <p className="text-xs font-medium text-navy-400 uppercase tracking-wider mt-1">{m.role}</p>
                  <p className="text-sm text-navy-600/70 mt-2 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="n-reveal mt-16 text-center">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-navy-500 to-navy-400 text-white font-semibold rounded-2xl shadow-lg shadow-navy-500/20 hover:shadow-navy-500/35 hover:-translate-y-0.5 transition-all duration-300"
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
