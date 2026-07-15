"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import products from "@/lib/products";
import { useCart } from "@/context/CartContext";

gsap.registerPlugin(ScrollTrigger);

export default function StorePreview() {
  const sectionRef = useRef(null);
  const { toggleItem } = useCart();
  const [added, setAdded] = useState({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cp-reveal",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power4.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleAdd = (product) => {
    toggleItem(product);
    setAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [product.id]: false })), 1500);
  };

  const featured = products.slice(0, 4);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-navy-50/40 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="h-1 w-14 bg-gradient-to-r from-navy-400 to-copper rounded-full mb-5" />
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-950 leading-tight">
              Tienda de <span className="text-gradient">Productos</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-navy-600/60">
              Agrega productos y recibe tu cotización por WhatsApp
            </p>
          </div>
          <Link
            href="/tienda"
            className="px-5 py-3 bg-navy-950 text-white font-semibold rounded-2xl hover:bg-navy-800 transition-all duration-300 shadow-lg text-sm"
          >
            Ver Tienda Completa
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((product) => (
            <div
              key={product.id}
              className="cp-reveal group bg-white rounded-2xl border border-navy-100 overflow-hidden hover:shadow-xl hover:shadow-navy-500/5 hover:border-navy-200 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-40 bg-navy-50/40 overflow-hidden">
                <Image
                  src={product.img}
                  alt={`${product.name} - Dual Ingeniería`}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <div className="text-[11px] font-medium text-navy-400 mb-1 uppercase tracking-wider">
                  {product.catName}
                </div>
                <h3 className="text-sm font-semibold text-navy-900 leading-snug mb-2 line-clamp-2">
                  {product.name}
                </h3>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
