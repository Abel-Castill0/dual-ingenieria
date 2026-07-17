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
  "Cotización de Productos",
  "Otro",
];

const inputCls =
  "w-full px-4 py-3.5 bg-navy-800/60 border border-navy-700/50 rounded-xl text-white placeholder-navy-400/50 focus:outline-none focus:border-copper/50 focus:bg-navy-800/80 transition-all duration-200 text-sm";

export default function ContactPreview() {
  const sectionRef = useRef(null);
  const [form, setForm]   = useState({ name: "", email: "", phone: "", type: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent]   = useState(false);

  useGSAP(() => {
    gsap.fromTo(
      ".ct-reveal",
      { y: 36, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      }
    );
  }, { scope: sectionRef });

  const sanitize = (s) =>
    s.replace(/[<>]/g, "").replace(/javascript:/gi, "").replace(/on\w+=/gi, "").trim();

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Requerido";
    if (!form.email.trim()) e.email = "Requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email inválido";
    if (!form.phone.trim()) e.phone = "Requerido";
    if (!form.type)         e.type  = "Selecciona una opción";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const msg = `Hola,%20soy%20${encodeURIComponent(sanitize(form.name))}%0AEmail:%20${encodeURIComponent(sanitize(form.email))}%0ATel:%20${encodeURIComponent(sanitize(form.phone))}%0AConsulta:%20${encodeURIComponent(sanitize(form.type))}%0A%0A${encodeURIComponent(sanitize(form.message))}`;
    window.open(`https://api.whatsapp.com/send/?phone=51973042657&text=${msg}`, "_blank", "noopener,noreferrer");
    setSent(true);
    setForm({ name: "", email: "", phone: "", type: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const update = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  return (
    <section
      ref={sectionRef}
      data-dark="true"
      className="relative py-24 lg:py-36 bg-navy-950 overflow-hidden"
    >
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(194,133,94,0.06) 0%, transparent 70%)" }}
        aria-hidden />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(30,78,138,0.12) 0%, transparent 70%)" }}
        aria-hidden />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid pointer-events-none" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">

          {/* Left info panel */}
          <div className="lg:col-span-2">
            <div className="ct-reveal">
              <span className="section-label-light mb-5 block">Hablemos</span>
              <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-bold text-white leading-[1.1] tracking-tight">
                Tu proyecto
                <br />
                <span className="text-gradient-copper">empieza aquí.</span>
              </h2>
              <p className="mt-5 text-[15px] text-navy-300/60 leading-relaxed">
                Cuéntanos qué necesitas y te enviamos una propuesta personalizada sin costo.
              </p>
            </div>

            {/* Contact info */}
            <div className="ct-reveal mt-10 space-y-5">
              <ContactItem
                icon={
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                }
                label="WhatsApp directo"
                value="+51 973 042 657"
                href="https://api.whatsapp.com/send/?phone=51973042657&text=Hola,%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto"
              />
              <ContactItem
                icon={
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                }
                label="Correo proyectos"
                value="proyectos@dualingenieria.pe"
                href="mailto:proyectos@dualingenieria.pe"
              />
              <ContactItem
                icon={
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                }
                label="Operaciones"
                value="Lima, Perú"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 ct-reveal">
            <form
              onSubmit={handleSubmit}
              className="bg-navy-900/50 border border-navy-800/60 rounded-3xl p-6 sm:p-8 space-y-5 backdrop-blur-sm"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nombre *" error={errors.name}>
                  <input id="cpName" type="text" value={form.name} onChange={update("name")}
                    className={inputCls} placeholder="Juan Pérez" maxLength={100} />
                </Field>
                <Field label="Email *" error={errors.email}>
                  <input id="cpEmail" type="email" value={form.email} onChange={update("email")}
                    className={inputCls} placeholder="correo@empresa.com" maxLength={200} />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Teléfono *" error={errors.phone}>
                  <input id="cpPhone" type="tel" value={form.phone} onChange={update("phone")}
                    className={inputCls} placeholder="+51 999 999 999" maxLength={20} />
                </Field>
                <Field label="Tipo de consulta *" error={errors.type}>
                  <select id="cpType" value={form.type} onChange={update("type")}
                    className={`${inputCls} cursor-pointer`}>
                    <option value="">Selecciona...</option>
                    {serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Mensaje" error={null}>
                <textarea id="cpMsg" rows={4} value={form.message} onChange={update("message")}
                  className={`${inputCls} resize-none`}
                  placeholder="Cuéntanos sobre tu proyecto, ubicación, alcance..." maxLength={2000} />
              </Field>

              <button
                type="submit"
                className="w-full py-4 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-copper/20 active:translate-y-0"
                style={{ background: sent ? "#10b981" : "linear-gradient(135deg, #c2855e, #a06a47)" }}
              >
                {sent ? "¡Mensaje enviado correctamente!" : "Enviar por WhatsApp →"}
              </button>

              <p className="text-[11px] text-navy-500 text-center">
                Tu información es tratada con confidencialidad.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-navy-400 tracking-wide uppercase mb-2">
        {label}
      </label>
      {children}
      {error && <p className="text-[11px] text-red-400 mt-1.5">{error}</p>}
    </div>
  );
}

function ContactItem({ icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-navy-900/40 border border-navy-800/40 hover:border-copper/20 transition-all duration-200 group">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "rgba(194,133,94,0.12)", color: "#c2855e" }}>
        {icon}
      </div>
      <div>
        <div className="text-[10px] font-semibold text-navy-500 uppercase tracking-wider">{label}</div>
        <div className="text-sm font-semibold text-navy-200 group-hover:text-copper-light transition-colors mt-0.5">
          {value}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return content;
}
