"use client";

import { useState, useEffect } from "react";

/**
 * Detección de viewport móvil con hidratación SSR segura.
 *
 * Devuelve `null` durante SSR y el primer render de cliente (valor
 * desconocido), y `true`/`false` tras el montaje. El `null` inicial cumple
 * dos funciones: evita el mismatch de hidratación Y evita montar el árbol
 * 3D en el primer render móvil — si arrancara en `false`, next/dynamic
 * comenzaría a descargar el chunk de Three.js antes del desmontaje,
 * anulando el ahorro de bundle en gama baja.
 */
export default function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
