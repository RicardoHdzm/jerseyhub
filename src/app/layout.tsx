import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";

import { BarraCotizacion } from "@/components/BarraCotizacion";
import { CotizacionProvider } from "@/components/CotizacionProvider";
import { Encabezado } from "@/components/Encabezado";
import { PanelCotizacion } from "@/components/PanelCotizacion";
import { PieDePagina } from "@/components/PieDePagina";
import { negocio } from "@/lib/config";

import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--fuente-display",
});

const cuerpo = Inter({
  subsets: ["latin"],
  variable: "--fuente-cuerpo",
});

export const metadata: Metadata = {
  /*
    Con `metadataBase` las rutas de abajo pueden ir relativas: Next las compone
    con el dominio para dejarlas absolutas, que es como las exigen Facebook,
    WhatsApp y Twitter.
  */
  metadataBase: new URL(negocio.sitio),
  alternates: { canonical: "/" },
  title: {
    default: `${negocio.nombre} — ${negocio.tagline}`,
    template: `%s | ${negocio.nombre}`,
  },
  description:
    `Catálogo de casacas, gorras y pantalones personalizados para equipos de béisbol y softbol en ${negocio.ciudad}. ` +
    "Arma el paquete de tu equipo, mira el precio estimado y mándanos la cotización por WhatsApp.",
  keywords: [
    "casacas personalizadas",
    "jerseys personalizados",
    "uniformes de béisbol",
    "uniformes de softbol",
    "gorras personalizadas",
    "sublimado",
    negocio.ciudad,
  ],
  openGraph: {
    title: `${negocio.nombre} — ${negocio.tagline}`,
    description:
      "Arma el uniforme de tu equipo, mira el precio estimado y mándanos la cotización por WhatsApp.",
    url: "/",
    siteName: negocio.nombre,
    type: "website",
    locale: "es_MX",
    // 1200x630 es la medida que piden Facebook y WhatsApp para la tarjeta ancha.
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: `Logo de ${negocio.nombre}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${negocio.nombre} — ${negocio.tagline}`,
    description:
      "Arma el uniforme de tu equipo, mira el precio estimado y mándanos la cotización por WhatsApp.",
    images: ["/thumbnail.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={`${display.variable} ${cuerpo.variable}`}>
      <body className="min-h-screen">
        <CotizacionProvider>
          <Encabezado />
          {/*
            Sin padding inferior: el espacio para la barra fija de cotización lo
            pone el pie de página, así ese hueco es negro y no una franja gris
            entre el último bloque y el footer.
          */}
          <main>{children}</main>
          <PieDePagina />
          <BarraCotizacion />
          <PanelCotizacion />
        </CotizacionProvider>
      </body>
    </html>
  );
}
