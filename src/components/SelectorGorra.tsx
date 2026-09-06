"use client";

import { useCotizacion } from "@/components/CotizacionProvider";
import { ProductoImagen } from "@/components/ProductoImagen";
import { IconoCheck } from "@/components/iconos";
import { getProducto } from "@/data/catalog";

/**
 * Las dos gorras entre las que se elige en el paso 2. Si agregas otra al
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
            onClick={() => setGorra(opcion.slug)}
            aria-pressed={activo}
            className={`tarjeta relative flex items-center gap-4 p-4 text-left transition-colors ${
              activo ? "border-dorado" : "hover:border-dorado"
            }`}
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white">
              <ProductoImagen producto={producto} sizes="80px" />
            </div>
            <p className="titulo text-2xl leading-none">{opcion.titulo}</p>
            {activo && (
              <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-dorado text-tinta">
                <IconoCheck className="h-3 w-3" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
