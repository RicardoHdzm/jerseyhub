"use client";

import { useCotizacion } from "@/components/CotizacionProvider";
import { ModeloArte } from "@/components/ModeloArte";
import { IconoCheck } from "@/components/iconos";
import { basesLisas } from "@/data/catalog";

/**
 * Las bases lisas de la casaca personalizada: el color de partida sobre el que
 * va el logo del equipo.
 *
 * No son los diseños del catálogo —esos tienen su propio tablero— y por eso no
 * llevan foto: lo que se elige aquí es el color de la prenda, no un dibujo. La
 * ilustración la pinta `ModeloArte` con los tonos del modelo.
 */
export function SelectorBase() {
  const { modelo, setModelo } = useCotizacion();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {basesLisas.map((base) => {
        const activo = modelo === base.slug;
        return (
          <button
            key={base.slug}
            type="button"
            onClick={() => setModelo(base.slug)}
            aria-pressed={activo}
            className={`tarjeta relative flex flex-col overflow-hidden transition-colors ${
              activo ? "border-dorado" : "hover:border-dorado"
            }`}
          >
            <div className="relative aspect-square bg-arena">
              <ModeloArte modelo={base} />
            </div>
            {activo && (
              <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-dorado text-tinta">
                <IconoCheck className="h-3 w-3" />
              </span>
            )}
            <p className="titulo px-3 py-2 text-lg leading-none">
              {base.nombre}
            </p>
          </button>
        );
      })}
    </div>
  );
}
