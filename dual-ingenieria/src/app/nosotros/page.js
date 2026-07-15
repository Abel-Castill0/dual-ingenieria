import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartDrawer from "@/components/CartDrawer";
import NosotrosContent from "@/components/NosotrosContent";

export const metadata = {
  title: "Nosotros | Dual Ingeniería - Ingeniería Eléctrica en Lima",
  description:
    "Conoce a Dual Ingeniería, empresa peruana especializada en ingeniería eléctrica. Nuestra misión, visión, valores y equipo de profesionales en Lima, Perú.",
  openGraph: {
    title: "Nosotros | Dual Ingeniería",
    description: "Empresa peruana de ingeniería eléctrica con más de 12 años de experiencia.",
  },
};

export default function NosotrosPage() {
  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      <main>
        <NosotrosContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </CartProvider>
  );
}
