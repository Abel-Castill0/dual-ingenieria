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
  const { totalItems, setShowCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-950/90 backdrop-blur-xl border-b border-navy-800/40 shadow-lg shadow-navy-950/20"
          : "bg-white/5 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logod.webp"
              alt="Dual Ingeniería"
              width={40}
              height={40}
              className="object-contain flex-shrink-0"
              priority
            />
            <div className="hidden sm:block">
              <span
                className={`text-base font-bold block leading-tight transition-colors duration-500 ${
                  scrolled ? "text-white" : "text-white"
                }`}
              >
                Dual Ingeniería
              </span>
              <span
                className={`text-[10px] font-medium block leading-tight tracking-wider uppercase transition-colors duration-500 ${
                  scrolled ? "text-navy-300/70" : "text-white/60"
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
                      ? scrolled
                        ? "text-white bg-white/10"
                        : "text-white bg-white/10"
                      : scrolled
                        ? "text-navy-200/70 hover:text-white hover:bg-white/5"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-navy-300 to-copper rounded-full"
                    />
                  )}
                </Link>
              );
            })}
            <button
              onClick={() => setShowCart(true)}
              className={`ml-3 relative p-2.5 rounded-xl transition-all ${
                scrolled
                  ? "text-navy-200/70 hover:text-white hover:bg-white/5"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Carrito"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-ember text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                  {totalItems}
                </span>
              )}
            </button>
            <Link
              href="/contacto"
              className={`ml-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                scrolled
                  ? "text-white bg-gradient-to-r from-navy-500 to-navy-400 shadow-lg shadow-navy-500/25 hover:shadow-navy-500/40 hover:-translate-y-0.5"
                  : "text-white bg-white/15 backdrop-blur-sm border border-white/20 hover:bg-white/25 hover:-translate-y-0.5"
              }`}
            >
              Cotizar Proyecto
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2 rounded-xl text-white/80 bg-white/10 backdrop-blur-sm"
              aria-label="Carrito"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-ember text-white text-[9px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-white/80 bg-white/10 backdrop-blur-sm"
              aria-label="Menú"
            >
              <div className="flex flex-col gap-1">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-5 h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                  className="block w-5 h-0.5 bg-white rounded-full"
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
            className="lg:hidden border-t border-white/10 bg-navy-950/95 backdrop-blur-xl overflow-hidden"
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
                        ? "text-white bg-white/10"
                        : "text-navy-200/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/contacto"
                className="block px-4 py-3 text-sm font-semibold text-center text-white bg-gradient-to-r from-navy-500 to-navy-400 rounded-xl mt-2"
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
