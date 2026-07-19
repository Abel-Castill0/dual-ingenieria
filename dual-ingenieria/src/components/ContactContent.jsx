"use client";

/*
  ─── EMAILJS SETUP (3 pasos) ────────────────────────────────────────────────
  1. Crea cuenta en https://www.emailjs.com (plan gratuito: 200 emails/mes)
  2. Crea un Email Service (Gmail / SMTP) y un Email Template con estas variables:
       {{from_name}}, {{from_email}}, {{phone}}, {{empresa}}, {{type}}, {{message}}, {{to_email}}
  3. Crea el archivo .env.local en la raíz del proyecto con:
       NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxxx
       NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxxx
       NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
  ─────────────────────────────────────────────────────────────────────────────
*/

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageHero from "@/components/PageHero";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

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
  name: yup.string().trim().required("Requerido").min(3, "Mínimo 3 caracteres"),
  empresa: yup.string().trim().max(100),
  email: yup.string().trim().required("Requerido").email("Email inválido"),
  phone: yup
    .string()
    .trim()
    .required("Requerido")
    .test("phone-digits", "Ingresa un teléfono válido de 9 dígitos", (v) => {
      const digits = (v || "").replace(/\D/g, "");
      return digits.length === 9 || (digits.length === 11 && digits.startsWith("51"));
    }),
  type: yup.string().required("Selecciona una opción"),
  message: yup.string().trim().required("Requerido").min(10, "Mínimo 10 caracteres").max(2000),
}).required();

const sanitize = (s = "") =>
  s.replace(/[<>]/g, "").replace(/javascript:/gi, "").replace(/on\w+=/gi, "").trim();

const inputCls =
  "w-full px-4 py-3 rounded-xl bg-navy-800/50 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-copper transition-colors duration-200";

const contactInfo = [
  {
    label: "Email Proyectos",
    value: "proyectos@dualingenieria.pe",
    sub: "Consultas técnicas y propuestas",
    icon: "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75",
  },
  {
    label: "Teléfono",
    value: "+51 973 042 657",
    sub: "Lun - Vie, 8:00 am - 6:00 pm",
    icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
  },
  {
    label: "Ubicación",
    value: "Lima, Perú",
    sub: "Proyectos en todo Lima y provincias",
    icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
  },
];

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold mb-1.5 text-white/45">
        {label}
      </label>
      {children}
      {error && <p className="fade-in-error text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}

export default function ContactContent() {
  const sectionRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // null | "success" | "error"

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", empresa: "", email: "", phone: "", type: "", message: "" },
  });

  // Toast auto-dismiss a los 6s, con cleanup si el estado cambia antes.
  useEffect(() => {
    if (!status) return;
    const t = setTimeout(() => setStatus(null), 6000);
    return () => clearTimeout(t);
  }, [status]);

  useGSAP(() => {
    gsap.fromTo(
      ".co-reveal",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power4.out", scrollTrigger: { trigger: sectionRef.current, start: "top 78%" } }
    );
  }, { scope: sectionRef });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setStatus(null);

    const safe = {
      name: sanitize(data.name),
      empresa: sanitize(data.empresa),
      email: sanitize(data.email),
      phone: sanitize(data.phone),
      type: sanitize(data.type),
      message: sanitize(data.message),
    };

    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: safe.name,
          from_email: safe.email,
          phone: safe.phone,
          empresa: safe.empresa || "—",
          type: safe.type,
          message: safe.message,
          to_email: "proyectos@dualingenieria.pe",
        },
        PUBLIC_KEY
      );
      setStatus("success");
      reset();

      // Canal de respaldo: solo si el email salió bien, para no perder el lead
      // silenciosamente si EmailJS falla (en ese caso el toast pide reintentar).
      const msg =
        `Hola,%20soy%20${encodeURIComponent(safe.name)}` +
        (safe.empresa ? `%20de%20${encodeURIComponent(safe.empresa)}` : "") +
        `%0AEmail:%20${encodeURIComponent(safe.email)}` +
        `%0ATel:%20${encodeURIComponent(safe.phone)}` +
        `%0AConsulta:%20${encodeURIComponent(safe.type)}` +
        `%0A%0A${encodeURIComponent(safe.message)}`;
      window.open(`https://wa.me/51973042657?text=${msg}`, "_blank", "noopener,noreferrer");
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        label="Hablemos"
        title="Cotiza tu proyecto eléctrico."
        subtitle="Cuéntanos sobre tu proyecto y te enviaremos una propuesta personalizada en las próximas 24 horas."
      />

      <section
        ref={sectionRef}
        data-dark="true"
        className="relative py-16 md:py-24 lg:py-28 bg-navy-950 overflow-hidden"
      >
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" aria-hidden />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top right, rgba(0,149,213,0.05) 0%, transparent 65%)" }}
          aria-hidden
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">

            {/* Info de contacto */}
            <div className="lg:col-span-2 space-y-5">
              <div className="co-reveal">
                <h2 className="text-xl font-bold text-white">Información de Contacto</h2>
                <p className="text-sm mt-1 text-white/35">Estamos disponibles para atender tu consulta.</p>
              </div>

              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="co-reveal flex items-start gap-4 p-4 rounded-2xl bg-navy-800/50 border border-white/5"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-copper/15 text-copper">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={info.icon} />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-white/30">{info.label}</div>
                    <div className="text-sm font-semibold text-white mt-0.5">{info.value}</div>
                    <div className="text-xs mt-0.5 text-white/35">{info.sub}</div>
                  </div>
                </div>
              ))}

              <a
                className="co-reveal flex items-center gap-3 px-5 py-4 rounded-2xl font-semibold text-white text-sm bg-[#25D366] shadow-lg shadow-[#25D366]/25 transition-transform duration-200 hover:-translate-y-0.5"
                href="https://wa.me/51973042657?text=Hola,%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.543 5.875L0 24l6.311-1.513A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.567 9.567 0 01-4.894-1.347l-.35-.209-3.624.868.9-3.52-.228-.362A9.537 9.537 0 012.4 12C2.4 6.7 6.7 2.4 12 2.4S21.6 6.7 21.6 12 17.3 21.6 12 21.6z" />
                </svg>
                Chatear por WhatsApp
              </a>
            </div>

            {/* Formulario */}
            <div className="lg:col-span-3 co-reveal">
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="rounded-3xl p-5 sm:p-8 space-y-5 bg-navy-800/40 border border-white/5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field id="coName" label="Nombre *" error={errors.name?.message}>
                    <input id="coName" type="text" {...register("name")} className={inputCls} placeholder="Juan Pérez" maxLength={100} />
                  </Field>
                  <Field id="coEmpresa" label="Empresa" error={errors.empresa?.message}>
                    <input id="coEmpresa" type="text" {...register("empresa")} className={inputCls} placeholder="Mi Empresa SAC" maxLength={100} />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field id="coEmail" label="Email *" error={errors.email?.message}>
                    <input id="coEmail" type="email" {...register("email")} className={inputCls} placeholder="correo@ejemplo.com" maxLength={200} />
                  </Field>
                  <Field id="coPhone" label="Teléfono *" error={errors.phone?.message}>
                    <input id="coPhone" type="tel" {...register("phone")} className={inputCls} placeholder="999 999 999" maxLength={20} />
                  </Field>
                </div>

                <Field id="coType" label="Tipo de Consulta *" error={errors.type?.message}>
                  <select id="coType" {...register("type")} className={`${inputCls} cursor-pointer appearance-none`}>
                    <option value="" className="bg-navy-900">Selecciona una opción...</option>
                    {serviceOptions.map((o) => <option key={o} value={o} className="bg-navy-900">{o}</option>)}
                  </select>
                </Field>

                <Field id="coMsg" label="Descripción del Proyecto *" error={errors.message?.message}>
                  <textarea id="coMsg" rows={4} {...register("message")} className={`${inputCls} resize-none`} placeholder="Cuéntanos sobre tu proyecto en detalle..." maxLength={2000} />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold text-white rounded-2xl bg-copper hover:bg-copper-dark shadow-lg shadow-copper/25 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    "Enviar Mensaje"
                  )}
                </button>

                {status === "success" && (
                  <div className="fade-in-error flex items-start gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25" role="status">
                    <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-emerald-300">Mensaje enviado. Nos pondremos en contacto pronto.</p>
                  </div>
                )}

                {status === "error" && (
                  <div className="fade-in-error flex items-start gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/25" role="alert">
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <p className="text-sm text-red-300">
                      Error al enviar. Intenta de nuevo o escríbenos directamente a proyectos@dualingenieria.pe.
                    </p>
                  </div>
                )}

                <p className="text-[11px] text-center text-white/25">
                  Tu mensaje se envía por email y WhatsApp de forma simultánea.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
