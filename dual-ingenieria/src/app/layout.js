import { Geist } from "next/font/google";
import "./globals.css";
import ScrollReset from "@/components/ScrollReset";
import ScrollTriggerRefresh from "@/components/ScrollTriggerRefresh";
import { CartProvider } from "@/context/CartContext";
import LenisProvider from "@/components/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Dual Ingeniería | Ingeniería Eléctrica en Lima, Perú",
  description:
    "Especialistas en proyectos eléctricos integrales: estudios, subestaciones, mantenimiento industrial, instalaciones y puesta a tierra en Lima y todo el Perú.",
  keywords: [
    "ingeniería eléctrica", "Lima", "Perú", "subestaciones",
    "mantenimiento industrial", "instalaciones eléctricas",
    "puesta a tierra", "INDECI", "ITSE", "Dual Ingeniería",
    "proyectos eléctricos", "ingenieros Lima", "estudios eléctricos",
  ],
  authors: [{ name: "Dual Ingeniería", url: "https://www.dualingenieria.pe" }],
  metadataBase: new URL("https://www.dualingenieria.pe"),
  openGraph: {
    title: "Dual Ingeniería | Ingeniería Eléctrica en Lima, Perú",
    description:
      "Soluciones integrales en ingeniería eléctrica para proyectos comerciales, industriales y de infraestructura en Lima, Perú.",
    url: "https://www.dualingenieria.pe",
    siteName: "Dual Ingeniería",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dual Ingeniería | Ingeniería Eléctrica",
    description: "Especialistas en proyectos eléctricos integrales en Lima y Perú.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/images/logod.webp",
    apple: "/images/logod.webp",
  },
  other: {
    "geo.region": "PE-LMA",
    "geo.placename": "Lima",
    "geo.position": "-12.046374;-77.042793",
    ICBM: "-12.046374, -77.042793",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${geistSans.variable}`}>
      <head>
        <link rel="canonical" href="https://www.dualingenieria.pe" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-white text-ink">
        <CartProvider>
          <LenisProvider>
            <ScrollReset />
            <ScrollTriggerRefresh />
            {children}
          </LenisProvider>
        </CartProvider>
      </body>
    </html>
  );
}
