"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import products, { categories } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import PageHero from "@/components/PageHero";
import TiltCard from "@/components/TiltCard";

gsap.registerPlugin(ScrollTrigger);

export default function StoreContent() {
  const [activeCat, setActiveCat] = useState("all");
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const sectionRef = useRef(null);
  const { toggleItem } = useCart();
  const [added, setAdded] = useState({});

  const filtered = activeCat === "all" ? products : products.filter((p) => p.cat === activeCat);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        ".c-reveal",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power4.out", scrollTrigger: { trigger: sectionRef.current, start: "top 85%" } }
      );
    });

    // Móvil: productos estáticos y visibles — sin stagger ni ScrollTrigger.
    mm.add("(max-width: 767px)", () => {
      gsap.set(".c-reveal", { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  const handleAdd = (product) => {
    toggleItem(product);
    setAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [product.id]: false })), 1500);
  };

  return (
    <>
      <PageHero
        label="Catálogo"
        title="Productos Eléctricos."
        subtitle="Agrega los productos que necesitas y recibe tu cotización personalizada por WhatsApp en minutos."
      />

      <section ref={sectionRef} className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Sidebar */}
            <aside className="lg:w-60 flex-shrink-0">
              {/* Mobile toggle */}
              <button
                onClick={() => setMobileCatOpen(!mobileCatOpen)}
                className="lg:hidden w-full px-4 py-3 rounded-xl text-sm font-medium text-navy-800 flex items-center justify-between mb-4"
                style={{ background: "rgba(14,31,61,0.05)", border: "1px solid rgba(14,31,61,0.08)" }}
              >
                {categories.find((c) => c.id === activeCat)?.name || "Categorías"}
                <svg
                  className={`w-4 h-4 text-navy-500 transition-transform ${mobileCatOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`space-y-1 ${mobileCatOpen ? "block" : "hidden"} lg:block`}>
                {categories.map((cat) => {
                  const isActive = activeCat === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCat(cat.id); setMobileCatOpen(false); }}
                      className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                      style={
                        isActive
                          ? {
                              background: "linear-gradient(135deg, #c2855e, #a06a47)",
                              color: "#fff",
                              boxShadow: "0 4px 14px rgba(194,133,94,0.3)",
                            }
                          : {
                              color: "rgba(10,25,41,0.6)",
                            }
                      }
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {filtered.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.22 }}
                    >
                      <TiltCard className="c-reveal group flex flex-col rounded-2xl overflow-hidden transition-[box-shadow] duration-300 hover:shadow-xl hover:shadow-navy-500/8 h-full"
                        >
                        <div style={{ border: "1px solid rgba(14,31,61,0.08)", background: "#fff", borderRadius: "1rem", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
                          {/* Image */}
                          <div
                            className="relative h-40 overflow-hidden flex-shrink-0"
                            style={{ background: "rgba(14,31,61,0.03)" }}
                          >
                            <Image
                              src={product.img}
                              alt={`${product.name} - Producto Dual Ingeniería`}
                              fill
                              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                          </div>

                          {/* Body */}
                          <div className="p-4 flex flex-col flex-1">
                            <div
                              className="text-[10px] font-semibold uppercase tracking-wider mb-1.5"
                              style={{ color: "#c2855e" }}
                            >
                              {product.catName}
                            </div>
                            <h2 className="text-sm font-semibold text-navy-900 leading-snug mb-2 line-clamp-2">
                              {product.name}
                            </h2>
                            <p className="text-xs text-navy-500/60 leading-relaxed line-clamp-2 flex-1">
                              {product.desc}
                            </p>
                            <button
                              onClick={() => handleAdd(product)}
                              className={`mt-3 w-full py-2 text-xs font-semibold rounded-xl transition-all duration-300 ${
                                added[product.id]
                                  ? "bg-emerald-500 text-white"
                                  : "copper-shimmer-btn text-white"
                              }`}
                            >
                              {added[product.id] ? "✓ Agregado" : "Agregar a Cotización"}
                            </button>
                          </div>
                        </div>
                      </TiltCard>
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
