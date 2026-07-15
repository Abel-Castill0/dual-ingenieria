"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
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
  "Cotización de Productos",
  "Otro",
];

export default function ContactContent() {
  const sectionRef = useRef(null);
  const [form, setForm] = useState({ name: "", empresa: "", email: "", phone: "", type: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".co-reveal",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power4.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

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
    const msg =
      `Hola,%20soy%20${encodeURIComponent(sanitize(form.name))}` +
      `%20de%20${encodeURIComponent(sanitize(form.empresa) || "mi empresa")}` +
      `%0AEmail:%20${encodeURIComponent(sanitize(form.email))}` +
      `%0ATel:%20${encodeURIComponent(sanitize(form.phone))}` +
      `%0AConsulta:%20${encodeURIComponent(sanitize(form.type))}` +
      `%0A%0A${encodeURIComponent(sanitize(form.message))}`;
    window.open(`https://api.whatsapp.com/send/?phone=51973042657&text=${msg}`, "_blank");
    setSent(true);
    setForm({ name: "", empresa: "", email: "", phone: "", type: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const update = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  return (
    <>
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/tendido.jpg"
            alt="Contacto - Dual Ingeniería"
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
              Contáctanos para tu <span className="text-gradient">proyecto</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-navy-200/70 leading-relaxed">
              Cuéntanos sobre tu proyecto y te enviaremos una cotización personalizada
              en las próximas 24 horas.
            </p>
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="co-reveal">
                <h2 className="text-2xl font-bold text-navy-950 mb-2">Información de Contacto</h2>
                <p className="text-sm text-navy-600/70">Estamos disponibles para atender tu consulta.</p>
              </div>

              {[
                { label: "Email Proyectos", value: "proyectos@dualingenieria.com", sub: "Consultas técnicas y propuestas" },
                { label: "Teléfono", value: "+51 973 042 657", sub: "Lun - Vie, 8:00 am - 6:00 pm" },
                { label: "Ubicación", value: "Lima, Perú", sub: "Atendemos proyectos en todo Lima y provincias" },
              ].map((info) => (
                <div key={info.label} className="co-reveal flex items-start gap-4 p-4 rounded-2xl bg-navy-50/60 border border-navy-100">
                  <div className="w-10 h-10 rounded-xl bg-navy-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-navy-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={
                        info.label === "Email Proyectos"
                          ? "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                          : info.label === "Teléfono"
                            ? "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                            : "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      } />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-navy-400">{info.label}</div>
                    <div className="text-sm font-semibold text-navy-800 mt-0.5">{info.value}</div>
                    <div className="text-xs text-navy-500/70 mt-0.5">{info.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3 co-reveal">
              <form onSubmit={handleSubmit} className="bg-navy-50/60 border border-navy-100 rounded-3xl p-6 sm:p-8 space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="coName" className="block text-xs font-medium text-navy-600 mb-1.5">Nombre *</label>
                    <input id="coName" type="text" value={form.name} onChange={update("name")} className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl text-navy-900 placeholder-navy-400/50 focus:outline-none focus:border-navy-400 transition-colors text-sm" placeholder="Juan Pérez" maxLength={100} />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="coEmpresa" className="block text-xs font-medium text-navy-600 mb-1.5">Empresa</label>
                    <input id="coEmpresa" type="text" value={form.empresa} onChange={update("empresa")} className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl text-navy-900 placeholder-navy-400/50 focus:outline-none focus:border-navy-400 transition-colors text-sm" placeholder="Mi Empresa SAC" maxLength={100} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="coEmail" className="block text-xs font-medium text-navy-600 mb-1.5">Email *</label>
                    <input id="coEmail" type="email" value={form.email} onChange={update("email")} className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl text-navy-900 placeholder-navy-400/50 focus:outline-none focus:border-navy-400 transition-colors text-sm" placeholder="correo@ejemplo.com" maxLength={200} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="coPhone" className="block text-xs font-medium text-navy-600 mb-1.5">Teléfono *</label>
                    <input id="coPhone" type="tel" value={form.phone} onChange={update("phone")} className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl text-navy-900 placeholder-navy-400/50 focus:outline-none focus:border-navy-400 transition-colors text-sm" placeholder="+51 999 999 999" maxLength={20} />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="coType" className="block text-xs font-medium text-navy-600 mb-1.5">Tipo de Consulta *</label>
                  <select id="coType" value={form.type} onChange={update("type")} className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl text-navy-900 focus:outline-none focus:border-navy-400 transition-colors text-sm">
                    <option value="">Selecciona una opción...</option>
                    {serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
                </div>

                <div>
                  <label htmlFor="coMsg" className="block text-xs font-medium text-navy-600 mb-1.5">Descripción del Proyecto</label>
                  <textarea id="coMsg" rows={4} value={form.message} onChange={update("message")} className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl text-navy-900 placeholder-navy-400/50 focus:outline-none focus:border-navy-400 transition-colors text-sm resize-none" placeholder="Cuéntanos sobre tu proyecto en detalle..." maxLength={2000} />
                </div>

                <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-navy-500 to-navy-400 text-white font-semibold rounded-2xl shadow-lg shadow-navy-500/20 hover:shadow-navy-500/35 hover:-translate-y-0.5 transition-all duration-300 text-sm">
                  {sent ? "✓ Mensaje Enviado" : "Enviar Cotización"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
