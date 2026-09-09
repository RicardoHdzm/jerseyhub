"use client";

import { useSyncExternalStore } from "react";

import { useCotizacion } from "@/components/CotizacionProvider";
import { Logo } from "@/components/Logo";
import { IconoBolsa } from "@/components/iconos";

const enlaces = [
  { href: "#paquetes", texto: "Paquetes" },
  { href: "#catalogo", texto: "Catálogo" },
  { href: "#testimonios", texto: "Testimonios" },
  { href: "#preguntas", texto: "Preguntas" },
];

/*
  La barra se encoge en cuanto el cliente baja: 80 px de negro fijo se comían
  demasiado del hero, que ahora ocupa la pantalla completa.

  Va con `useSyncExternalStore` y no con `useState` + `useEffect` porque leer
  `window.scrollY` en un efecto es escribir estado dentro del efecto, y eso
  además de estar prohibido por el lint pinta un frame con la barra alta.
*/
function suscribirScroll(alCambiar: () => void) {
  window.addEventListener("scroll", alCambiar, { passive: true });
  return () => window.removeEventListener("scroll", alCambiar);
}

const leerEncogido = () => window.scrollY > 24;
/** En el servidor no hay scroll: la barra siempre arranca alta. */
const leerEncogidoEnServidor = () => false;

export function Encabezado() {
  const { resumen, abrirPanel } = useCotizacion();
  const encogido = useSyncExternalStore(
    suscribirScroll,
    leerEncogido,
    leerEncogidoEnServidor,
  );

  return (
    <header className="sticky top-0 z-40 bg-tinta">
      <div
        className={`mx-auto flex max-w-6xl items-center gap-6 px-5 transition-[height] duration-300 ${
          encogido ? "h-14" : "h-20"
        }`}
      >
        <a href="#inicio" aria-label="Inicio">
          <Logo
            className={`w-auto transition-[height] duration-300 ${
              encogido ? "h-11" : "h-14 sm:h-16"
            }`}
            prioridad
            invertido
          />
        </a>

        <nav className="ml-auto hidden items-center gap-7 text-sm text-white/70 md:flex">
          {enlaces.map((enlace) => (
            <a
              key={enlace.href}
              href={enlace.href}
              className="transition-colors hover:text-white"
            >
              {enlace.texto}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={abrirPanel}
          className="ml-auto flex items-center gap-2 rounded-full bg-dorado px-4 py-2 text-sm font-semibold text-tinta transition-colors hover:bg-dorado-hover md:ml-0"
        >
          <IconoBolsa className="h-3.5 w-3.5 text-tinta/70" />
          <span className="hidden sm:inline">Mi paquete</span>
          {/* El contador se invierte sobre el dorado: relleno negro con la
              cifra en dorado cuando hay piezas, y apenas un velo cuando está
              vacío. */}
          <span
            className={`grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-xs font-bold ${
              resumen.piezas > 0
                ? "bg-tinta text-dorado"
                : "bg-tinta/15 text-tinta/70"
            }`}
          >
            {resumen.piezas}
          </span>
        </button>
      </div>
    </header>
  );
}
