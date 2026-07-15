import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartDrawer from "@/components/CartDrawer";
import StoreContent from "@/components/StoreContent";

export const metadata = {
  title: "Tienda de Productos | Dual Ingeniería - Material Eléctrico",
  description:
    "Tienda de productos eléctricos: interruptores, bandejas portacables, conductores, equipos de protección, puesta a tierra, tableros y tuberías. Cotiza por WhatsApp.",
  openGraph: {
    title: "Tienda de Productos | Dual Ingeniería",
    description: "Material eléctrico de alta calidad. Cotiza y recibe tu presupuesto por WhatsApp.",
  },
};

export default function TiendaPage() {
  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      <main>
        <StoreContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </CartProvider>
  );
}
