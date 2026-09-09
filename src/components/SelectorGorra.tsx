"use client";

import { useCotizacion } from "@/components/CotizacionProvider";
import { ProductoImagen } from "@/components/ProductoImagen";
import { IconoCerrar, IconoCheck } from "@/components/iconos";
import { getProducto } from "@/data/catalog";

/**
 * Las dos gorras entre las que se elige en el paso 4. Si agregas otra al
 * catálogo y quieres que aparezca aquí, basta con sumar su slug.
 */
const opciones = [
  { slug: "gorra-bordada-6-paneles", titulo: "Algodón" },
  { slug: "gorra-drifit", titulo: "Dry-fit" },
];

export function SelectorGorra() {
  const { gorra, setGorra } = useCotizacion();

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {opciones.map((opcion) => {
        const producto = getProducto(opcion.slug);
        if (!producto) return null;
        const activo = gorra === opcion.slug;

        return (
          <button
            key={opcion.slug}
            type="button"
            /*
              Volver a tocar la gorra elegida la desmarca. Quitarla no deja el
              paquete sin gorra: la cotización se va a la del paquete, que es
              justo lo que quiere quien todavía no se decide entre las dos.
            */
            onClick={() => setGorra(activo ? "" : opcion.slug)}
            aria-pressed={activo}
            title={
              activo ? "Tócala de nuevo para quitar la selección" : undefined
            }
            className={`tarjeta group relative flex items-center gap-4 p-4 text-left transition-colors ${
              activo ? "border-dorado" : "hover:border-dorado"
            }`}
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white">
              <ProductoImagen producto={producto} sizes="80px" />
            </div>
            <p className="titulo text-2xl leading-none">{opcion.titulo}</p>
            {activo && (
              /*
                La palomita se vuelve una cruz al pasar el cursor: es lo que
                avisa que la tarjeta se puede desmarcar. En táctil no hay hover
                y se queda la palomita, pero el toque desmarca igual.
              */
              <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-dorado text-tinta">
                <IconoCheck className="h-3 w-3 group-hover:hidden" />
                <IconoCerrar className="hidden h-3 w-3 group-hover:block" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
