"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const links = [
  { label: "Inicio",    href: "/" },
  { label: "Nosotros",  href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Tienda",    href: "/tienda" },
  { label: "Contacto",  href: "/contacto" },
];

/**
 * Badge del carrito con "pop + glow" cobre. El re-montaje por `key`
 * re-ejecuta los keyframes; `popKey` solo se incrementa cuando el
 * contador SUBE, así quitar items no dispara la animación.
 */
function CartBadge({ count, className = "" }) {
  const prevCount = useRef(count);
  const [popKey, setPopKey] = useState(0);

  useEffect(() => {
    if (count > prevCount.current) setPopKey((k) => k + 1);
    prevCount.current = count;
  }, [count]);

  if (count <= 0) return null;

  return (
    <motion.span
      key={popKey}
      initial={{ scale: 1 }}
      animate={{
        scale: [1, 1.4, 1],
        boxShadow: [
          "0 0 0px rgba(194, 133, 94, 0)",
          "0 0 12px rgba(194, 133, 94, 0.6)",
          "0 0 0px rgba(194, 133, 94, 0)",
        ],
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`bg-copper text-white font-bold rounded-full flex items-center justify-center absolute ${className}`}
    >
      {count}
    </motion.span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled]           = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [readProgress, setReadProgress]   = useState(0);
  const { totalItems, setShowCart } = useCart();

  const isHomePage  = pathname === "/";
  const isOverHero  = isHomePage && !scrolled;
  const isLight     = !(isOverHero || isDarkBackground);

  /* ── scroll + progress ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const total    = document.body.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setReadProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── dark-section detection ── */
  useEffect(() => {
    if (!isHomePage) { setIsDarkBackground(false); return; }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setIsDarkBackground(e.target.dataset.dark === "true");
        });
      },
      { root: null, rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    document.querySelectorAll("[data-dark='true']").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHomePage]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] transition-[width] duration-100 ease-linear"
        style={{
          width: `${readProgress}%`,
          background: "linear-gradient(90deg, #c2855e, #d9a882)",
        }}
        aria-hidden
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isLight
            ? "bg-white/92 backdrop-blur-md border-b border-gray-200/50 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/images/logod.webp"
                alt="Dual Ingeniería"
                width={48}
                height={48}
                className="object-contain h-11 w-auto md:h-12"
                priority
              />
              <div className="hidden sm:block">
                <span className={`text-xl font-bold block leading-tight tracking-tight transition-colors duration-300 ${isLight ? "text-navy-950" : "text-white"}`}>
                  Dual Ingeniería
                </span>
                <span className={`text-[9px] font-semibold block leading-tight tracking-[0.22em] uppercase transition-colors duration-300 ${isLight ? "text-copper" : "text-copper-light"}`}>
                  Ingeniería Eléctrica
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? isLight
                          ? "text-navy-900 bg-navy-50"
                          : "text-white bg-white/10"
                        : isLight
                          ? "text-navy-600 hover:text-navy-900 hover:bg-navy-50"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0.5 left-4 right-4 h-[1.5px] rounded-full"
                        style={{ background: "linear-gradient(90deg, #c2855e, #d9a882)" }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* Cart */}
              <button
                onClick={() => setShowCart(true)}
                aria-label={`Carrito${totalItems > 0 ? `, ${totalItems} item${totalItems > 1 ? "s" : ""}` : ""}`}
                className={`ml-3 relative p-2.5 rounded-xl transition-all ${
                  isLight
                    ? "text-navy-600 hover:text-navy-900 hover:bg-navy-50"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <CartBadge count={totalItems} className="-top-2 -right-2 w-5 h-5 text-xs" />
              </button>

              {/* CTA */}
              <Link
                href="/contacto"
                className={`ml-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                  isLight
                    ? "bg-navy-950 text-white hover:bg-navy-800 hover:-translate-y-0.5 shadow-lg shadow-navy-950/20"
                    : "bg-copper text-white hover:bg-copper-dark hover:-translate-y-0.5 shadow-lg shadow-copper/30"
                }`}
              >
                Cotizar Proyecto
              </Link>
            </nav>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setShowCart(true)}
                aria-label="Carrito"
                className={`relative p-2 rounded-xl ${
                  isLight ? "text-navy-600 bg-navy-50" : "text-white/80 bg-white/10"
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <CartBadge count={totalItems} className="-top-1.5 -right-1.5 w-4 h-4 text-[9px]" />
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menú de navegación"
                aria-expanded={mobileOpen}
                className={`p-2 rounded-xl ${
                  isLight ? "text-navy-600 bg-navy-50" : "text-white/80 bg-white/10"
                }`}
              >
                <div className="flex flex-col gap-[5px]">
                  <motion.span
                    animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    className={`block w-5 h-[1.5px] rounded-full ${isLight ? "bg-navy-700" : "bg-white"}`}
                  />
                  <motion.span
                    animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                    className={`block w-5 h-[1.5px] rounded-full ${isLight ? "bg-navy-700" : "bg-white"}`}
                  />
                  <motion.span
                    animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    className={`block w-5 h-[1.5px] rounded-full ${isLight ? "bg-navy-700" : "bg-white"}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden border-t overflow-hidden ${
                isLight
                  ? "border-gray-100 bg-white/96 backdrop-blur-xl"
                  : "border-white/10 bg-navy-950/96 backdrop-blur-xl"
              }`}
            >
              <div className="px-4 py-4 space-y-1">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                        isActive
                          ? isLight
                            ? "text-navy-900 bg-navy-50 font-semibold"
                            : "text-white bg-white/10 font-semibold"
                          : isLight
                            ? "text-navy-600 hover:text-navy-900 hover:bg-navy-50"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-copper flex-shrink-0" />
                      )}
                      {link.label}
                    </Link>
                  );
                })}
                <div className="pt-2 pb-1">
                  <Link
                    href="/contacto"
                    className="block px-4 py-3 text-sm font-semibold text-center text-white rounded-xl"
                    style={{ background: "linear-gradient(135deg, #c2855e, #a06a47)" }}
                  >
                    Solicitar Cotización
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
