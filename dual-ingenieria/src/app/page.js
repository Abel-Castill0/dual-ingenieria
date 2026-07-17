import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBand from "@/components/StatsBand";
import AboutPreview from "@/components/AboutPreview";
import ServicesPreview from "@/components/ServicesPreview";
import StorePreview from "@/components/StorePreview";
import ContactPreview from "@/components/ContactPreview";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main>
        <HeroSection />
        <StatsBand />
        <AboutPreview />
        <ServicesPreview />
        <StorePreview />
        <ContactPreview />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
