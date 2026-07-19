import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollReset from "@/components/ScrollReset";
import ScrollTriggerRefresh from "@/components/ScrollTriggerRefresh";
import { CartProvider } from "@/context/CartContext";
import LenisProvider from "@/components/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
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

// Schema.org LocalBusiness/ProfessionalService — habilita rich results
// (panel de negocio, breadcrumbs de búsqueda) para "ingeniería eléctrica Lima".
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Dual Ingeniería",
  image: "https://www.dualingenieria.pe/images/logod.webp",
  url: "https://www.dualingenieria.pe",
  telephone: "+51973042657",
  email: "proyectos@dualingenieria.pe",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lima",
    addressCountry: "PE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -12.046374,
    longitude: -77.042793,
  },
  areaServed: {
    "@type": "Country",
    name: "Perú",
  },
  serviceType: [
    "Estudios Eléctricos Especializados",
    "Subestaciones Eléctricas",
    "Mantenimiento Eléctrico Industrial",
    "Redes Eléctricas y Tendidos",
    "Instalaciones Comerciales e Industriales",
    "Sistemas de Puesta a Tierra",
    "Levantamiento de Observaciones INDECI e ITSE",
  ],
  sameAs: [
    "https://api.whatsapp.com/send/?phone=51973042657",
    "https://www.linkedin.com/company/dual-ingenieria",
    "https://www.instagram.com/dualingenieria",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="canonical" href="https://www.dualingenieria.pe" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
