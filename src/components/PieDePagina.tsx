import { EspacioBarra } from "@/components/EspacioBarra";
import { Logo } from "@/components/Logo";
import {
  IconoEnlaceExterno,
  IconoFacebook,
  IconoInstagram,
  IconoTienda,
  IconoTikTok,
  IconoWhatsApp,
} from "@/components/iconos";
import { categorias } from "@/data/catalog";
import { negocio } from "@/lib/config";
import { linkWhatsApp } from "@/lib/quote";

export function PieDePagina() {
  return (
    /*
      Sigue en negro justo después del cierre de la página: son un solo bloque
      oscuro separado por una línea, no dos bandas negras con una franja blanca
      de por medio.
    */
    <footer className="border-t border-white/10 bg-tinta text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Logo className="h-16 w-auto" invertido />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            {negocio.tagline} en {negocio.ciudad}. Sublimado full color, bordado y diseño incluido
            para equipos de liga, escuela y torneo.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={linkWhatsApp(`¡Hola ${negocio.nombre}! Quiero cotizar uniformes.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-dorado px-4 py-2.5 text-sm font-semibold text-tinta transition-colors hover:bg-dorado-hover"
            >
              <IconoWhatsApp className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={negocio.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-dorado-claro"
            >
              <IconoInstagram className="h-4 w-4" />
              Instagram
            </a>
            {negocio.facebook && (
              <a
                href={negocio.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-dorado-claro"
              >
                <IconoFacebook className="h-4 w-4" />
                Facebook
              </a>
            )}
            {negocio.tiktok && (
              <a
                href={negocio.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-dorado-claro"
              >
                <IconoTikTok className="h-4 w-4" />
                TikTok
              </a>
            )}
            {negocio.mercadoLibre && (
              <a
                href={negocio.mercadoLibre}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-dorado-claro"
              >
                <IconoTienda className="h-4 w-4" />
                Mercado Libre
                <IconoEnlaceExterno className="h-3 w-3 text-white/50" />
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="etiqueta text-dorado-claro">Catálogo</p>
          <ul className="mt-4 space-y-2 text-sm">
            {categorias.map((categoria) => (
              <li key={categoria.id}>
                <a href="#catalogo" className="text-white/70 transition-colors hover:text-white">
                  {categoria.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="etiqueta text-dorado-claro">Información</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#paquetes" className="text-white/70 transition-colors hover:text-white">
                Paquetes de equipo
              </a>
            </li>
            <li>
              <a href="#preguntas" className="text-white/70 transition-colors hover:text-white">
                Preguntas frecuentes
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto max-w-6xl space-y-2 px-5 py-6 text-center text-xs text-white/50">
          <p>
            Los precios del sitio son estimados y no constituyen una venta en línea. Cada pedido se
            confirma con nosotros.
          </p>
          <p>
            © {new Date().getFullYear()} {negocio.nombre}. Todos los derechos reservados.{" "}
            <span className="whitespace-nowrap">
              Diseñado por{" "}
              <a
                href="https://jrhm.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-dorado-claro transition-colors hover:text-white"
              >
                JRHM.STUDIO
              </a>
            </span>
          </p>
        </div>
      </div>

      <EspacioBarra />
    </footer>
  );
}
