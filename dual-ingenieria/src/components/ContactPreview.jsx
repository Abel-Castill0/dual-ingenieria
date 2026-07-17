"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const serviceOptions = [
  "Cotización de Proyecto Eléctrico",
  "Mantenimiento de Subestación",
  "Instalaciones Industriales",
  "Instalaciones Comerciales",
  "Sistemas de Puesta a Tierra",
  "Estudios Eléctricos Especializados",
  "Observaciones INDECI / ITSE",
  "Otro",
];

export default function ContactPreview() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  useGSAP(() => {
    gsap.fromTo(
      ".ct-reveal",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power4.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
    );
  }, { scope: sectionRef });

  const sanitize = (str) => str.replace(/[<>]/g, "").replace(/javascript:/gi, "").replace(/on\w+=/gi, "").trim();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Requerido";
    if (!form.email.trim()) e.email = "Requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email inválido";
    if (!form.phone.trim()) e.phone = "Requerido";
    if (!form.type) e.type = "Selecciona una opción";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const msg = `Hola,%20soy%20${encodeURIComponent(sanitize(form.name))}%0AEmail:%20${encodeURIComponent(sanitize(form.email))}%0ATel:%20${encodeURIComponent(sanitize(form.phone))}%0AConsulta:%20${encodeURIComponent(sanitize(form.type))}%0A%0A${encodeURIComponent(sanitize(form.message))}`;
    window.open(`https://api.whatsapp.com/send/?phone=51973042657&text=${msg}`, "_blank");
    setSent(true);
    setForm({ name: "", email: "", phone: "", type: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const update = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-navy-50/40 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-14">
          <div className="lg:w-5/12">
            <div className="ct-reveal">
              <div className="h-1 w-14 bg-gradient-to-r from-navy-400 to-copper rounded-full mb-5" />
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 leading-tight">
                Contáctanos para tu <span className="text-gradient">proyecto</span>
              </h2>
            </div>
            <p className="ct-reveal mt-5 text-base sm:text-lg text-gray-600 leading-relaxed">
                Cuéntanos sobre tu proyecto y te enviaremos una cotización personalizada.
            </p>

            <div className="ct-reveal mt-10 space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-navy-50/60 border border-navy-100">
                <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-navy-400">Email Proyectos</div>
                  <div className="text-sm font-semibold text-navy-800 mt-0.5">proyectos@dualingenieria.com</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-navy-50/60 border border-navy-100">
                <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-electric" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-navy-400">Ubicación</div>
                  <div className="text-sm font-semibold text-navy-800 mt-0.5">Lima, Perú</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-7/12 ct-reveal">
            <form onSubmit={handleSubmit} className="bg-navy-50/60 border border-navy-100 rounded-3xl p-6 sm:p-8 space-y-5" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="hcName" className="block text-xs font-medium text-navy-600 mb-1.5">Nombre *</label>
                  <input id="hcName" type="text" value={form.name} onChange={update("name")} className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl text-navy-900 placeholder-navy-400/50 focus:outline-none focus:border-navy-400 transition-colors text-sm" placeholder="Juan Pérez" maxLength={100} />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="hcEmail" className="block text-xs font-medium text-navy-600 mb-1.5">Email *</label>
                  <input id="hcEmail" type="email" value={form.email} onChange={update("email")} className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl text-navy-900 placeholder-navy-400/50 focus:outline-none focus:border-navy-400 transition-colors text-sm" placeholder="correo@ejemplo.com" maxLength={200} />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="hcPhone" className="block text-xs font-medium text-navy-600 mb-1.5">Teléfono *</label>
                  <input id="hcPhone" type="tel" value={form.phone} onChange={update("phone")} className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl text-navy-900 placeholder-navy-400/50 focus:outline-none focus:border-navy-400 transition-colors text-sm" placeholder="+51 999 999 999" maxLength={20} />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="hcType" className="block text-xs font-medium text-navy-600 mb-1.5">Tipo de Consulta *</label>
                  <select id="hcType" value={form.type} onChange={update("type")} className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl text-navy-900 focus:outline-none focus:border-navy-400 transition-colors text-sm">
                    <option value="">Selecciona...</option>
                    {serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="hcMsg" className="block text-xs font-medium text-navy-600 mb-1.5">Mensaje</label>
                <textarea id="hcMsg" rows={3} value={form.message} onChange={update("message")} className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl text-navy-900 placeholder-navy-400/50 focus:outline-none focus:border-navy-400 transition-colors text-sm resize-none" placeholder="Cuéntanos sobre tu proyecto..." maxLength={2000} />
              </div>

              <button type="submit" className="w-full py-3.5 bg-electric text-white font-semibold rounded-2xl shadow-lg shadow-electric/20 hover:bg-electric-dark hover:shadow-electric/30 hover:-translate-y-0.5 transition-all duration-300 text-sm">
                {sent ? "¡Mensaje Enviado!" : "Enviar Cotización"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
