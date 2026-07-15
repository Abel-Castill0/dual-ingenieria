"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    title: "Calidad",
    desc: "Estándares rigurosos en cada proyecto.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Seguridad",
    desc: "Compromiso con la seguridad total.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
      </svg>
    ),
    title: "Innovación",
    desc: "Soluciones técnicas de vanguardia.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Equipo",
    desc: "Ingenieros altamente calificados.",
  },
];

export default function AboutPreview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".ap-reveal",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power4.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-navy-50/60 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-navy-200 rounded-2xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/images/ingeniero2.jpg"
                alt="Equipo de ingenieros de Dual Ingeniería"
                width={800}
                height={550}
                className="w-full h-[380px] lg:h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <div className="glass-card-dark rounded-2xl p-4">
                  <div className="text-2xl font-bold text-white">12+</div>
                  <div className="text-xs text-navy-300/70">Años de experiencia</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="ap-reveal">
              <div className="h-1 w-14 bg-gradient-to-r from-navy-400 to-copper rounded-full mb-5" />
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 leading-tight">
                Ingeniería que <span className="text-gradient">conecta</span> el futuro
              </h2>
            </div>
            <p className="ap-reveal mt-5 text-base sm:text-lg text-navy-700/70 leading-relaxed">
              En <strong className="text-navy-700">Dual Ingeniería</strong> somos una empresa peruana
              especializada en ingeniería eléctrica. Brindamos soluciones integrales
              para proyectos comerciales, industriales y de infraestructura.
            </p>

            <div className="ap-reveal mt-10 grid grid-cols-2 gap-3">
              {values.map((v) => (
                <div key={v.title} className="flex gap-3 p-3.5 rounded-2xl bg-navy-50/60 border border-navy-100 hover:bg-navy-50 transition-colors duration-300">
                  <div className="mt-0.5 w-9 h-9 rounded-xl bg-gradient-to-br from-navy-500 to-navy-400 flex items-center justify-center text-white flex-shrink-0">
                    {v.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-navy-800 text-sm">{v.title}</div>
                    <div className="text-xs text-navy-500/70 mt-0.5">{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="ap-reveal mt-8">
              <Link
                href="/nosotros"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy-500 hover:text-navy-600 transition-colors"
              >
                Conoce más sobre nosotros
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
