import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Estudios Eléctricos",    href: "/servicios" },
  { label: "Subestaciones",          href: "/servicios" },
  { label: "Mantenimiento",          href: "/servicios" },
  { label: "Puesta a Tierra",        href: "/servicios" },
  { label: "Instalaciones",          href: "/servicios" },
  { label: "INDECI / ITSE",          href: "/servicios" },
];

const companyLinks = [
  { label: "Quiénes somos", href: "/nosotros" },
  { label: "Nuestro equipo", href: "/nosotros" },
  { label: "Valores",        href: "/nosotros" },
  { label: "Contacto",       href: "/contacto" },
];

const storeLinks = [
  { label: "Tienda completa",         href: "/tienda" },
  { label: "Conductores Eléctricos",  href: "/tienda" },
  { label: "Equipos de Protección",   href: "/tienda" },
  { label: "Tableros Eléctricos",     href: "/tienda" },
  { label: "Tuberías y Bandejas",     href: "/tienda" },
];

export default function Footer() {
  return (
    <footer data-dark="true" className="relative bg-navy-950 overflow-hidden">
      {/* Copper top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(194,133,94,0.5) 50%, transparent 100%)" }}
        aria-hidden
      />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" aria-hidden />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(194,133,94,0.05) 0%, transparent 70%)" }}
        aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1.4fr] gap-10 lg:gap-8 mb-14">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <Image
                src="/images/logod.webp"
                alt="Dual Ingeniería"
                width={77}
                height={40}
                className="object-contain h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div>
                <span className="text-base font-bold text-white block leading-tight">Dual Ingeniería</span>
                <span
                  className="text-[9px] font-semibold block leading-tight tracking-[0.2em] uppercase"
                  style={{ color: "#c2855e" }}
                >
                  Ingeniería Eléctrica
                </span>
              </div>
            </Link>
            <p className="text-[13px] text-navy-400/65 leading-relaxed max-w-[220px]">
              Del diseño al encendido. Proyectos eléctricos integrales en Lima y todo el Perú.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-7">
              <SocialLink href="https://api.whatsapp.com/send/?phone=51973042657" label="WhatsApp">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.543 5.875L0 24l6.311-1.513A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.567 9.567 0 01-4.894-1.347l-.35-.209-3.624.868.9-3.52-.228-.362A9.537 9.537 0 012.4 12C2.4 6.7 6.7 2.4 12 2.4S21.6 6.7 21.6 12 17.3 21.6 12 21.6z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/company/dual-ingenieria" label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://www.instagram.com/dualingenieria" label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </SocialLink>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-[10px] font-bold text-navy-200/60 uppercase tracking-[0.18em] mb-5">
              Servicios
            </h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-[13px] text-navy-400/55 hover:text-navy-200 transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-[10px] font-bold text-navy-200/60 uppercase tracking-[0.18em] mb-5">
              Empresa
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-[13px] text-navy-400/55 hover:text-navy-200 transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="text-[10px] font-bold text-navy-200/60 uppercase tracking-[0.18em] mb-5">
              Tienda
            </h4>
            <ul className="space-y-3">
              {storeLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-[13px] text-navy-400/55 hover:text-navy-200 transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-[10px] font-bold text-navy-200/60 uppercase tracking-[0.18em] mb-5">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li>
                <div className="text-[10px] text-navy-600 uppercase tracking-wider mb-1">Teléfono</div>
                <a href="tel:+51973042657"
                  className="text-[13px] font-semibold text-navy-300/70 hover:text-copper-light transition-colors">
                  +51 973 042 657
                </a>
              </li>
              <li>
                <div className="text-[10px] text-navy-600 uppercase tracking-wider mb-1">Email</div>
                <a href="mailto:proyectos@dualingenieria.pe"
                  className="text-[13px] font-semibold text-navy-300/70 hover:text-copper-light transition-colors break-all">
                  proyectos@dualingenieria.pe
                </a>
              </li>
              <li>
                <div className="text-[10px] text-navy-600 uppercase tracking-wider mb-1">Sede</div>
                <span className="text-[13px] text-navy-400/55">Lima, Perú</span>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send/?phone=51973042657&text=Hola,%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 px-4 py-2.5 text-xs font-semibold text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: "#25D366" }}
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.543 5.875L0 24l6.311-1.513A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.567 9.567 0 01-4.894-1.347l-.35-.209-3.624.868.9-3.52-.228-.362A9.537 9.537 0 012.4 12C2.4 6.7 6.7 2.4 12 2.4S21.6 6.7 21.6 12 17.3 21.6 12 21.6z"/>
                  </svg>
                  Chatear ahora
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(14,31,61,0.8)" }}
        >
          <p className="text-[11px] text-navy-600/60 text-center sm:text-left">
            © {new Date().getFullYear()} Dual Ingeniería S.A.C. Todos los derechos reservados.
          </p>
          <p className="text-[11px] text-navy-600/40">
            Desarrollado por{" "}
            <a
              href="https://portafolio-henna-mu.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper/70 hover:text-copper transition-colors"
            >
              Abel Castillo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-xl flex items-center justify-center text-navy-400/60 border border-navy-800/60 hover:border-copper/30 hover:text-copper-light hover:bg-navy-900 transition-all duration-200"
    >
      {children}
    </a>
  );
}
