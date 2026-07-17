import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartDrawer from "@/components/CartDrawer";
import ContactContent from "@/components/ContactContent";

export const metadata = {
  title: "Contacto | Dual Ingeniería - Ingeniería Eléctrica en Lima",
  description:
    "Contáctanos para solicitar una cotización de proyectos eléctricos. Estamos en Lima, Perú. Respondemos en menos de 24 horas.",
  openGraph: {
    title: "Contacto | Dual Ingeniería",
    description: "Solicita tu cotización de ingeniería eléctrica. Respondemos en 24 horas.",
  },
};

export default function ContactoPage() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main>
        <ContactContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
