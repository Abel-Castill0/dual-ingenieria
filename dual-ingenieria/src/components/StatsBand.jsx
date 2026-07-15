"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "12+", label: "Años de Experiencia" },
  { value: "200+", label: "Proyectos Ejecutados" },
  { value: "50+", label: "Clientes Satisfechos" },
  { value: "100%", label: "Compromiso y Calidad" },
];

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
};

export default function StatsBand() {
  return (
    <section className="bg-[#0c1530] border-y border-navy-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-navy-200 to-copper bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-xs text-navy-400/60 mt-1.5 tracking-wide uppercase">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
