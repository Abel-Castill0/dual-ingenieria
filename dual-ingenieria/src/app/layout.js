import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dual Ingeniería | Ingeniería Eléctrica en Lima, Perú",
  description:
    "Especialistas en proyectos eléctricos integrales: estudios, subestaciones, mantenimiento industrial, instalaciones, puesta a tierra y más en Lima y todo Perú.",
  keywords: [
    "ingeniería eléctrica", "Lima", "Perú", "subestaciones",
    "mantenimiento industrial", "instalaciones eléctricas",
    "puesta a tierra", "INDECI", "ITSE", "Dual Ingeniería",
    "proyectos eléctricos", "ingenieros en Lima",
  ],
  authors: [{ name: "Dual Ingeniería", url: "https://dualingenieria.com" }],
  metadataBase: new URL("https://dualingenieria.com"),
  openGraph: {
    title: "Dual Ingeniería | Ingeniería Eléctrica en Lima, Perú",
    description:
      "Soluciones integrales en ingeniería eléctrica para proyectos comerciales, industriales y de infraestructura.",
    url: "https://dualingenieria.com",
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

import ScrollReset from "@/components/ScrollReset";

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${geistSans.variable}`}>
      <head>
        <link rel="canonical" href="https://dualingenieria.com" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-surf text-ink">
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
