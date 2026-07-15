"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function ServiceCard3D({ service, index = 0 }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handleMouse = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative rounded-3xl overflow-hidden border border-navy-800/40 bg-navy-900/30 hover:bg-navy-900/50 transition-colors duration-500"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={service.img}
          alt={`${service.title} - Servicio de Dual Ingeniería`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent" />
        <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-navy-500/15 backdrop-blur-sm border border-navy-400/20 flex items-center justify-center text-sm font-bold text-navy-300">
          {service.num}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-white leading-snug mb-3">
          {service.title}
        </h3>
        <p className="text-sm text-navy-300/60 leading-relaxed mb-4 line-clamp-3">
          {service.desc}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-medium text-navy-300 bg-navy-800/40 rounded-full border border-navy-700/20"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href="/contacto"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-300 hover:text-white transition-colors"
        >
          Solicitar
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
