"use client";

import { useEffect, useMemo } from "react";

import { TarjetaCatalogo } from "@/components/TarjetaCatalogo";
import { IconoCerrar } from "@/components/iconos";
import {
  categorias,
  entradasDelCatalogo,
  type EntradaCatalogo,
} from "@/data/catalog";

/**
 * Todo el catálogo de un jalón, agrupado por corte y por tipo de prenda.
 * Elegir una tarjeta cierra esta vista y abre su configurador.
 */
export function ModalCatalogo({
  onElegir,
  onCerrar,
}: {
  onElegir: (entrada: EntradaCatalogo) => void;
  onCerrar: () => void;
}) {
  const entradas = useMemo(() => entradasDelCatalogo(), []);

  useEffect(() => {
    const alPresionar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
    };
    window.addEventListener("keydown", alPresionar);
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", alPresionar);
      document.body.style.overflow = previo;
    };
  }, [onCerrar]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/75" onClick={onCerrar} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Catálogo completo"
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-2xl border border-linea bg-papel sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-linea px-5 py-4 sm:px-6">
          <div>
            <h2 className="titulo text-3xl">Catálogo completo</h2>
            <p className="mt-1 text-sm text-tenue">
              Todos los modelos de casaca y las demás prendas. Toca cualquiera
              para elegir sus opciones y pedir información.
            </p>
          </div>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-linea text-tenue transition-colors hover:text-tinta"
          >
            <IconoCerrar className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {categorias.map((categoria) => {
            const delGrupo = entradas.filter((e) => e.filtro === categoria.id);
            if (delGrupo.length === 0) return null;

            return (
              <section key={categoria.id} className="mt-8 first:mt-0">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="titulo text-2xl">{categoria.nombre}</h3>
                  {categoria.descripcion && (
                    <span className="text-sm text-tenue">
                      {categoria.descripcion}
                    </span>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {delGrupo.map((entrada) => (
                    <TarjetaCatalogo
                      key={entrada.id}
                      entrada={entrada}
                      onAbrir={onElegir}
                      compacta
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
