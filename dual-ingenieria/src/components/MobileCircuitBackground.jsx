const COPPER = "#C2855E";

/**
 * Fondo estático de circuito eléctrico para el Hero en móvil.
 * SVG inline (<2KB), sin animación ni JS en runtime: cero costo de CPU/GPU
 * en gama baja. Trazado estilo PCB/diagrama unifilar con quiebres a 45°,
 * nodos en terminales y anillos concéntricos de profundidad — eco visual
 * del tablero 3D que ven los usuarios de desktop.
 */
export default function MobileCircuitBackground({ className = "" }) {
  return (
    <svg
      viewBox="0 0 720 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <rect width="720" height="900" fill="#0A1128" />

      {/* Anillos concéntricos de profundidad */}
      <g fill="none" stroke={COPPER}>
        <circle cx="540" cy="290" r="150" strokeWidth="1" opacity="0.08" />
        <circle cx="540" cy="290" r="220" strokeWidth="1" opacity="0.05" />
        <circle cx="120" cy="740" r="130" strokeWidth="1" opacity="0.06" />
      </g>

      {/* Pistas del circuito — quiebres a 45° estilo PCB */}
      <g
        fill="none"
        stroke={COPPER}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.18"
      >
        <path d="M0 120 H240 L300 180 H480" />
        <path d="M720 210 H560 L500 270 H380 L330 320 V460" />
        <path d="M0 380 H150 L210 440 V600 L260 650 H420" />
        <path d="M720 520 H580 L520 580 V700" />
        <path d="M90 900 V780 L140 730 H280 L340 670 V560" />
        <path d="M480 900 V820 L540 760 H660" />
        <path d="M600 0 V90 L540 150 H420" />
        <path d="M160 0 V70 L220 130 V240" />
      </g>

      {/* Nodos en terminales e intersecciones */}
      <g fill={COPPER} opacity="0.3">
        <circle cx="480" cy="180" r="3" />
        <circle cx="380" cy="270" r="2.5" />
        <circle cx="330" cy="460" r="3" />
        <circle cx="420" cy="650" r="3" />
        <circle cx="520" cy="700" r="2.5" />
        <circle cx="340" cy="560" r="2.5" />
        <circle cx="660" cy="760" r="3" />
        <circle cx="420" cy="150" r="2.5" />
        <circle cx="220" cy="240" r="3" />
        <circle cx="150" cy="380" r="2.5" />
      </g>

      {/* Pads cuadrados — acento de tablero */}
      <g fill="none" stroke={COPPER} strokeWidth="1" opacity="0.22">
        <rect x="472" y="172" width="16" height="16" rx="2" />
        <rect x="322" y="452" width="16" height="16" rx="2" />
        <rect x="212" y="232" width="16" height="16" rx="2" />
      </g>
    </svg>
  );
}
