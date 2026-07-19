const sectors = [
  "Industria Manufacturera",
  "Minería y Energía",
  "Retail y Comercio",
  "Inmobiliario Corporativo",
  "Logística y Almacenes",
  "Salud y Educación",
  "Infraestructura Pública",
];

/**
 * Marquee de sectores atendidos — CSS puro (animación de transform,
 * compositable, cero JS por frame). La lista se duplica para el loop
 * infinito sin salto: cuando la primera copia sale del viewport, la
 * segunda está exactamente en su lugar.
 */
export default function TrustBar() {
  const row = sectors.map((s, i) => (
    <span key={i} className="flex items-center gap-8 shrink-0">
      <span
        className="text-[11px] uppercase tracking-[0.22em] text-navy-400/60 whitespace-nowrap"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {s}
      </span>
      <span className="w-1 h-1 rounded-full bg-copper/40 shrink-0" aria-hidden />
    </span>
  ));

  return (
    <section className="relative bg-white border-b border-navy-950/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">

        {/* Normativa — fija, no scrollea */}
        <p className="shrink-0 text-[11px] font-semibold text-navy-600/70 tracking-wide whitespace-nowrap flex items-center gap-2">
          <span className="w-4 h-px bg-copper" aria-hidden />
          Proyectos ejecutados bajo normativas CNE e INDECI
        </p>

        {/* Marquee */}
        <div
          className="relative flex-1 w-full overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="marquee-track flex items-center gap-8 w-max">
            {row}
            {row}
          </div>
        </div>
      </div>
    </section>
  );
}
