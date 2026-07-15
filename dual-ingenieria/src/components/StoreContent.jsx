"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import products, { categories } from "@/lib/products";
import { useCart } from "@/context/CartContext";

gsap.registerPlugin(ScrollTrigger);

export default function StoreContent() {
  const [activeCat, setActiveCat] = useState("all");
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const sectionRef = useRef(null);
  const { toggleItem } = useCart();
  const [added, setAdded] = useState({});

  const filtered = activeCat === "all" ? products : products.filter((p) => p.cat === activeCat);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".c-reveal",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power4.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleAdd = (product) => {
    toggleItem(product);
    setAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [product.id]: false })), 1500);
  };

  return (
    <>
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/subestacion.jpg"
            alt="Tienda de productos eléctricos - Dual Ingeniería"
            fill
            className="object-cover opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950/95 via-navy-950/85 to-navy-900/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="h-1 w-14 bg-gradient-to-r from-navy-400 to-copper rounded-full mb-5" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Tienda de <span className="text-gradient">Productos</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-navy-200/70 leading-relaxed">
              Agrega los productos que necesitas y recibe tu cotización personalizada
              por WhatsApp en minutos.
            </p>
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-56 flex-shrink-0">
              <button
                onClick={() => setMobileCatOpen(!mobileCatOpen)}
                className="lg:hidden w-full px-4 py-3 bg-navy-50 rounded-xl text-sm font-medium text-navy-800 flex items-center justify-between mb-4"
              >
                {categories.find((c) => c.id === activeCat)?.name || "Categorías"}
                <svg className={`w-4 h-4 text-navy-500 transition-transform ${mobileCatOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`space-y-1 ${mobileCatOpen ? "block" : "hidden"} lg:block`}>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setActiveCat(cat.id); setMobileCatOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeCat === cat.id
                        ? "bg-navy-500 text-white shadow-md"
                        : "text-navy-600/70 hover:bg-navy-50 hover:text-navy-700"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {filtered.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      className="c-reveal group bg-white rounded-2xl border border-navy-100 overflow-hidden hover:shadow-xl hover:shadow-navy-500/5 hover:border-navy-200 hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative h-40 bg-navy-50/40 overflow-hidden">
                        <Image
                          src={product.img}
                          alt={`${product.name} - Producto Dual Ingeniería`}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 50vw, 25vw"
                        />
                      </div>
                      <div className="p-4">
                        <div className="text-[11px] font-medium text-navy-400 mb-1 uppercase tracking-wider">
                          {product.catName}
                        </div>
                        <h2 className="text-sm font-semibold text-navy-900 leading-snug mb-2 line-clamp-2">
                          {product.name}
                        </h2>
                        <p className="text-xs text-navy-500/60 leading-relaxed mb-3 line-clamp-2">
                          {product.desc}
                        </p>
                        <button
                          onClick={() => handleAdd(product)}
                          className={`w-full py-2 text-xs font-semibold rounded-xl transition-all duration-300 ${
                            added[product.id]
                              ? "bg-emerald-500 text-white"
                              : "bg-navy-50 text-navy-600 hover:bg-navy-500 hover:text-white"
                          }`}
                        >
                          {added[product.id] ? "✓ Agregado" : "Agregar a Cotización"}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
