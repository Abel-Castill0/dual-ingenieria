"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const links = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Tienda", href: "/tienda" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const { totalItems, setShowCart } = useCart();
  const isHomePage = pathname === "/";
  const isOverHero = isHomePage && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detectar sección actual con fondo oscuro
  useEffect(() => {
    if (!isHomePage) {
      setIsDarkBackground(false);
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          const isDark = section.dataset.dark === 'true';
          setIsDarkBackground(isDark);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar secciones con fondo oscuro
    const darkSections = document.querySelectorAll('[data-dark="true"]');
    darkSections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [isHomePage]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isOverHero || isDarkBackground
          ? "bg-transparent"
          : "bg-white/90 backdrop-blur-md border-b border-gray-200/60 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logod.webp"
              alt="Dual Ingeniería"
              width={48}
              height={48}
              className="object-contain flex-shrink-0 h-12 w-auto md:h-14 md:w-auto"
              priority
            />
            <div className="hidden sm:block">
              <span
                className={`text-xl md:text-2xl font-bold block leading-tight tracking-tight transition-colors duration-300 ${
                  isOverHero || isDarkBackground ? "text-white" : "text-navy-950"
                }`}
              >
                Dual Ingeniería
              </span>
              <span
                className={`text-[10px] md:text-xs font-medium block leading-tight tracking-[0.2em] uppercase transition-colors duration-300 ${
                  isOverHero || isDarkBackground ? "text-white/60" : "text-navy-400"
                }`}
              >
                Ingeniería Eléctrica
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? isOverHero || isDarkBackground
                        ? "text-white bg-white/10"
                        : "text-electric bg-electric/10"
                      : isOverHero || isDarkBackground
                        ? "text-white/70 hover:text-white hover:bg-white/10"
                        : "text-navy-500/70 hover:text-navy-950 hover:bg-navy-50"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-electric to-copper rounded-full"
                    />
                  )}
                </Link>
              );
            })}
            <button
              onClick={() => setShowCart(true)}
              className={`ml-3 relative p-2.5 rounded-xl transition-all ${
                isOverHero || isDarkBackground
                  ? "text-white/70 hover:text-white hover:bg-white/10"
                  : "text-navy-500/70 hover:text-navy-950 hover:bg-navy-50"
              }`}
              aria-label="Carrito"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-copper text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                  {totalItems}
                </span>
              )}
            </button>
            <Link
              href="/contacto"
              className={`ml-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                isOverHero || isDarkBackground
                  ? "text-white bg-white/15 backdrop-blur-sm border border-white/20 hover:bg-white/25 hover:-translate-y-0.5"
                  : "bg-electric text-white shadow-lg shadow-electric/20 hover:bg-electric-dark hover:shadow-electric/30 hover:-translate-y-0.5"
              }`}
            >
              Cotizar Proyecto
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setShowCart(true)}
              className={`relative p-2 rounded-xl ${
                isOverHero || isDarkBackground
                  ? "text-white/80 bg-white/10 backdrop-blur-sm"
                  : "text-navy-500/80 bg-navy-50"
              }`}
              aria-label="Carrito"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-copper text-white text-[9px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-xl ${
                isOverHero || isDarkBackground
                  ? "text-white/80 bg-white/10 backdrop-blur-sm"
                  : "text-navy-500/80 bg-navy-50"
              }`}
              aria-label="Menú"
            >
              <div className="flex flex-col gap-1">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  className={`block w-5 h-0.5 ${isOverHero || isDarkBackground ? "bg-white" : "bg-navy-600"} rounded-full`}
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className={`block w-5 h-0.5 ${isOverHero || isDarkBackground ? "bg-white" : "bg-navy-600"} rounded-full`}
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  className={`block w-5 h-0.5 ${isOverHero || isDarkBackground ? "bg-white" : "bg-navy-600"} rounded-full`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`lg:hidden border-t overflow-hidden ${
              isOverHero || isDarkBackground
                ? "border-white/10 bg-navy-950/95 backdrop-blur-xl"
                : "border-gray-200 bg-white/95 backdrop-blur-xl"
            }`}
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                      isActive
                        ? isOverHero || isDarkBackground
                          ? "text-white bg-white/10"
                          : "text-electric bg-electric/10"
                        : isOverHero || isDarkBackground
                          ? "text-white/70 hover:text-white hover:bg-white/10"
                          : "text-navy-500/70 hover:text-navy-950 hover:bg-navy-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/contacto"
                className="block px-4 py-3 text-sm font-semibold text-center text-white bg-electric rounded-xl mt-2"
              >
                Solicitar Cotización
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
