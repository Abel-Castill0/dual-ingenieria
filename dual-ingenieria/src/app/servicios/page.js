import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartDrawer from "@/components/CartDrawer";
import ServiciosContent from "@/components/ServiciosContent";

export const metadata = {
  title: "Servicios | Dual Ingeniería - Ingeniería Eléctrica en Lima",
  description:
    "Servicios de ingeniería eléctrica: estudios eléctricos, subestaciones, mantenimiento industrial, redes, instalaciones, puesta a tierra y normativas INDECI/ITSE.",
  openGraph: {
    title: "Servicios | Dual Ingeniería",
    description: "Soluciones integrales en ingeniería eléctrica para proyectos comerciales e industriales.",
  },
};

export default function ServiciosPage() {
  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      <main>
        <ServiciosContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </CartProvider>
  );
}
