import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer data-dark="true" className="bg-navy-950 border-t border-navy-800/50 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logod.webp"
                alt="Dual Ingeniería"
                width={38}
                height={38}
                className="object-contain"
              />
              <div>
                <span className="text-base font-bold text-white block leading-tight">
                  Dual Ingeniería
                </span>
                <span className="text-[10px] font-medium text-navy-400 block leading-tight tracking-wider uppercase">
                  Ingeniería Eléctrica
                </span>
              </div>
            </Link>
            <p className="text-sm text-navy-300/60 leading-relaxed max-w-xs">
              Ingeniería Eléctrica · Montajes · Proyectos Integrales
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-navy-200 uppercase tracking-widest mb-5">
              Servicios
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Estudios Eléctricos", href: "/servicios" },
                { label: "Subestaciones", href: "/servicios" },
                { label: "Mantenimiento Industrial", href: "/servicios" },
                { label: "Puesta a Tierra", href: "/servicios" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-navy-300/50 hover:text-navy-200 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-navy-200 uppercase tracking-widest mb-5">
              Productos
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Tienda Completa", href: "/tienda" },
                { label: "Conductores Eléctricos", href: "/tienda" },
                { label: "Equipos de Protección", href: "/tienda" },
                { label: "Tableros Eléctricos", href: "/tienda" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-navy-300/50 hover:text-navy-200 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-navy-200 uppercase tracking-widest mb-5">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+51973042657" className="text-sm text-navy-300/50 hover:text-navy-200 transition-colors">
                  +51 973 042 657
                </a>
              </li>
              <li>
                <a href="mailto:proyectos@dualingenieria.com" className="text-sm text-navy-300/50 hover:text-navy-200 transition-colors">
                  proyectos@dualingenieria.com
                </a>
              </li>
              <li className="text-sm text-navy-300/50">Lima, Perú</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-navy-800/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-navy-500/50">
            © {new Date().getFullYear()} Dual Ingeniería. Todos los derechos reservados.
          </p>
          <p className="text-xs text-navy-500/30">
            Desarrollado por{" "}
            <a
              href="https://portafolio-henna-mu.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper hover:text-copper-light hover:underline transition-all duration-200"
            >
              Abel Castillo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
