"use client";

import { useCotizacion } from "@/components/CotizacionProvider";
import { IconoCheck } from "@/components/iconos";
import { getProducto, tecnicas } from "@/data/catalog";

export function SelectorTecnica() {
  const { tecnica, setTecnica } = useCotizacion();

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {tecnicas.map(({ slug, titulo }) => {
        const producto = getProducto(slug);
        if (!producto) return null;
        const activo = tecnica === slug;

        return (
          <button
            key={slug}
            type="button"
            onClick={() => setTecnica(slug)}
            aria-pressed={activo}
            className={`tarjeta relative flex flex-col p-5 text-left transition-colors ${
              activo ? "border-dorado" : "hover:border-dorado"
            }`}
          >
            {/*
              Sin precio a propósito: el cliente elige acabado, no costo. La
              diferencia se ve ya sumada en la tarjeta del paquete, abajo.
            */}
            <p className="titulo pr-8 text-2xl leading-none">{titulo}</p>
            <p className="mt-2 text-sm leading-relaxed text-tenue">{producto.descripcion}</p>
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
