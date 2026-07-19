import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="relative min-h-screen bg-navy-950 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Dot grid + glow ambiente, coherente con los heroes del sitio */}
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" aria-hidden />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(194,133,94,0.07) 0%, transparent 65%)" }}
          aria-hidden
        />

        <div className="relative">
          <span
            className="block text-[10rem] md:text-[14rem] font-bold leading-none select-none"
            style={{ color: "rgba(194,133,94,0.12)" }}
            aria-hidden
          >
            404
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white -mt-10 md:-mt-16 mb-4">
            Página no encontrada
          </h1>
          <p className="text-white/45 max-w-md mx-auto mb-9 leading-relaxed">
            La página que buscas no existe o ha sido movida. Verifica la URL o
            regresa al inicio.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-copper hover:bg-copper-dark text-white text-sm font-semibold py-3.5 px-8 rounded-xl shadow-lg shadow-copper/25 transition-colors duration-300"
            >
              Volver al Inicio
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 text-sm font-semibold text-copper-light py-3.5 px-8 rounded-xl border border-copper/40 hover:bg-copper/10 hover:border-copper/70 transition-all duration-300"
            >
              Contactar
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
