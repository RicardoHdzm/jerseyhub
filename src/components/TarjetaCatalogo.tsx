"use client";

import { ProductoImagen } from "@/components/ProductoImagen";
import { IconoEstrella, IconoTienda } from "@/components/iconos";
import type { EntradaCatalogo } from "@/data/catalog";
import { precioMXN } from "@/lib/quote";

/**
 * Una tarjeta del catálogo, la misma en la cuadrícula y en el catálogo
 * completo. Muestra foto, nombre y precio: el detalle vive dentro, al abrirla,
 * y así todas quedan de la misma altura.
 *
 * En las casacas la foto y el nombre son los del modelo —"Clásico alterno"—
 * mientras que el precio sale del producto con el que se produce.
 */
export function TarjetaCatalogo({
  entrada,
  onAbrir,
  compacta = false,
}: {
  entrada: EntradaCatalogo;
  onAbrir: (entrada: EntradaCatalogo) => void;
  /** La del catálogo completo, con menos aire y tipografía más chica. */
  compacta?: boolean;
}) {
  const { producto, modelo, nombre, foto, variante, destacado } = entrada;

  return (
    <button
      type="button"
      onClick={() => onAbrir(entrada)}
      title={modelo?.descripcion ?? producto.descripcion}
      className={`group tarjeta flex flex-col overflow-hidden text-left transition-[border-color,translate] duration-200 hover:-translate-y-1 hover:border-dorado ${
        compacta ? "" : "aparece"
      }`}
    >
      {/*
        Los modelos van sobre blanco y las prendas sueltas sobre arena: las
        fotos de casaca vienen recortadas sobre blanco y sobre el beige se les
        notaría el recorte.
      */}
      <div
        className={`relative aspect-square overflow-hidden ${modelo ? "bg-white" : "bg-arena"}`}
      >
        <div className="h-full w-full transition-transform duration-300 group-hover:scale-105">
          <ProductoImagen
            producto={producto}
            foto={foto}
            sizes="(min-width: 1024px) 280px, 45vw"
          />
        </div>
        {destacado && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-dorado px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-tinta">
            <IconoEstrella className="h-2.5 w-2.5" />
            Popular
          </span>
        )}
        {producto.mercadoLibre && (
          <span
            title="También se vende por pieza en Mercado Libre"
            className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full border border-linea bg-papel text-tenue"
          >
            <IconoTienda className="h-3 w-3" />
          </span>
        )}
      </div>

      <div className={`flex flex-1 flex-col ${compacta ? "px-3 py-3" : "p-4"}`}>
        <h3
          className={`titulo leading-tight ${compacta ? "text-lg" : "text-xl"}`}
        >
          {nombre}
        </h3>
        {variante && (
          <p className="mt-1 text-xs text-tenue">{variante.label}</p>
        )}
        <div className={compacta ? "mt-2" : "mt-4 pt-2"}>
          <p className="text-[11px] uppercase tracking-wide text-tenue">
            Desde
          </p>
          <p
            className={`titulo leading-none ${compacta ? "text-xl" : "text-2xl"}`}
          >
            {precioMXN(producto.precio)}
          </p>
        </div>
      </div>
    </button>
  );
}
