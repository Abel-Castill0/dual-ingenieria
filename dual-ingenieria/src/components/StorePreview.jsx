"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import products from "@/lib/products";
import { useCart } from "@/context/CartContext";

gsap.registerPlugin(ScrollTrigger);

export default function StorePreview() {
  const sectionRef  = useRef(null);
  const { toggleItem } = useCart();
  const [added, setAdded] = useState({});

  useGSAP(() => {
    gsap.fromTo(
      ".sp2-reveal",
      { y: 36, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.65, stagger: 0.07, ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 76%" },
      }
    );
  }, { scope: sectionRef });

  const handleAdd = (product) => {
    toggleItem(product);
    setAdded((p) => ({ ...p, [product.id]: true }));
    setTimeout(() => setAdded((p) => ({ ...p, [product.id]: false })), 1600);
  };

  const featured = products.slice(0, 4);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-36 bg-white overflow-hidden">
      {/* Ghost number */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] font-bold leading-none select-none pointer-events-none"
        style={{ color: "rgba(14,31,61,0.025)", lineHeight: 1 }}
        aria-hidden
      >
        04
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="sp2-reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="section-label mb-4 block">Tienda eléctrica</span>
            <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-bold text-navy-950 leading-[1.1] tracking-tight">
              Productos que{" "}
              <span className="text-gradient">llegan a obra</span>
            </h2>
            <p className="mt-3 text-[15px] text-navy-600/65 max-w-sm">
              Cotiza por WhatsApp — sin precios fijos, sin sorpresas.
            </p>
          </div>
          <Link
            href="/tienda"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-navy-700 border border-navy-200 rounded-xl hover:bg-navy-50 hover:border-navy-300 transition-all duration-200"
          >
            Ver tienda completa
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((product) => (
            <div
              key={product.id}
              className="sp2-reveal group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-copper/20 hover:shadow-xl hover:shadow-navy-900/6 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Product image */}
              <div className="relative h-44 bg-gray-50 overflow-hidden">
                <Image
                  src={product.img}
                  alt={`${product.name} – Dual Ingeniería`}
                  fill
                  className="object-contain p-5 group-hover:scale-107 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-navy-400 bg-white/90 px-2 py-1 rounded-lg border border-gray-100">
                    {product.catName}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-navy-900 leading-snug mb-1.5 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-xs text-navy-500/55 leading-relaxed mb-4 line-clamp-2">
                  {product.desc}
                </p>
                <button
                  onClick={() => handleAdd(product)}
                  className={`w-full py-2.5 text-xs font-semibold rounded-xl transition-all duration-300 ${
                    added[product.id]
                      ? "bg-emerald-500 text-white"
                      : "text-white hover:-translate-y-0.5"
                  }`}
                  style={
                    added[product.id]
                      ? {}
                      : { background: "linear-gradient(135deg, #c2855e, #a06a47)" }
                  }
                >
                  {added[product.id] ? "✓ Agregado" : "Agregar a cotización"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
