"use client";

/*
  ─── EMAILJS SETUP (3 pasos) ────────────────────────────────────────────────
  1. Crea cuenta en https://www.emailjs.com (plan gratuito: 200 emails/mes)
  2. Crea un Email Service (Gmail / SMTP) y un Email Template con estas variables:
       {{from_name}}, {{from_email}}, {{phone}}, {{type}}, {{message}}
  3. Crea el archivo .env.local en la raíz del proyecto con:
       NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
       NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
       NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
  ─────────────────────────────────────────────────────────────────────────────
*/

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || "YOUR_SERVICE_ID";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || "YOUR_PUBLIC_KEY";

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

const schema = yup.object({
  name: yup.string().trim().required("Requerido").min(2, "Muy corto"),
  email: yup.string().trim().required("Requerido").email("Email inválido"),
  phone: yup.string().trim().required("Requerido").min(6, "Teléfono inválido"),
  type: yup.string().required("Selecciona una opción"),
  message: yup.string().max(2000, "Máximo 2000 caracteres"),
}).required();

const inputCls =
  "w-full bg-transparent border-0 border-b border-white/20 focus:border-copper focus:outline-none text-white placeholder-white/30 text-sm py-3 px-0 transition-colors duration-200";

const sanitize = (s = "") =>
  s.replace(/[<>]/g, "").replace(/javascript:/gi, "").replace(/on\w+=/gi, "").trim();

export default function ContactPreview() {
  const sectionRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "", phone: "", type: "", message: "" },
  });

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

  const onSubmit = async (data) => {
    setStatus("sending");

    const safe = {
      name: sanitize(data.name),
      email: sanitize(data.email),
      phone: sanitize(data.phone),
      type: sanitize(data.type),
      message: sanitize(data.message),
    };

    // ── EmailJS send ──────────────────────────────────────────────────────
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: safe.name,
          from_email: safe.email,
          phone: safe.phone,
          type: safe.type,
          message: safe.message || "Sin descripción adicional.",
        },
        PUBLIC_KEY
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }

    // ── WhatsApp send (canal de respaldo, siempre se dispara) ─────────────
    const msg =
      `Hola,%20soy%20${encodeURIComponent(safe.name)}` +
      `%0AEmail:%20${encodeURIComponent(safe.email)}` +
      `%0ATel:%20${encodeURIComponent(safe.phone)}` +
      `%0AConsulta:%20${encodeURIComponent(safe.type)}` +
      (safe.message ? `%0A%0A${encodeURIComponent(safe.message)}` : "");
    window.open(`https://api.whatsapp.com/send/?phone=51973042657&text=${msg}`, "_blank", "noopener,noreferrer");

    reset();
    setTimeout(() => setStatus("idle"), 6000);
  };

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
              onSubmit={handleSubmit(onSubmit)}
              className="bg-navy-900/50 border border-navy-800/60 rounded-3xl p-6 sm:p-8 space-y-6 backdrop-blur-sm"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Nombre *" error={errors.name?.message}>
                  <input id="cpName" type="text" {...register("name")}
                    className={inputCls} placeholder="Juan Pérez" maxLength={100} />
                </Field>
                <Field label="Email *" error={errors.email?.message}>
                  <input id="cpEmail" type="email" {...register("email")}
                    className={inputCls} placeholder="correo@empresa.com" maxLength={200} />
                </Field>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Teléfono *" error={errors.phone?.message}>
                  <input id="cpPhone" type="tel" {...register("phone")}
                    className={inputCls} placeholder="+51 999 999 999" maxLength={20} />
                </Field>
                <Field label="Tipo de consulta *" error={errors.type?.message}>
                  <select id="cpType" {...register("type")}
                    className={`${inputCls} cursor-pointer`}>
                    <option value="" className="bg-navy-900">Selecciona...</option>
                    {serviceOptions.map((o) => <option key={o} value={o} className="bg-navy-900">{o}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Mensaje" error={errors.message?.message}>
                <textarea id="cpMsg" rows={3} {...register("message")}
                  className={`${inputCls} resize-none`}
                  placeholder="Cuéntanos sobre tu proyecto, ubicación, alcance..." maxLength={2000} />
              </Field>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 flex items-center justify-center gap-2 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-copper/20 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
                style={{
                  background:
                    status === "success" ? "#10b981"
                    : status === "error" ? "#ef4444"
                    : "linear-gradient(135deg, #c2855e, #a06a47)",
                }}
              >
                {status === "sending" && (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {status === "success" && (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                )}
                {status === "sending" ? "Enviando..."
                  : status === "success" ? "¡Mensaje enviado correctamente!"
                  : status === "error" ? "Error — reintenta"
                  : "Enviar Cotización"}
              </button>

              <p className="text-[11px] text-navy-500 text-center">
                Tu información es tratada con confidencialidad. Se envía por email y WhatsApp.
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
