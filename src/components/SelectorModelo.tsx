"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

import { useCotizacion } from "@/components/CotizacionProvider";
import { ModeloArte } from "@/components/ModeloArte";
import {
  IconoCheck,
  IconoFlecha,
  IconoFlechaIzquierda,
} from "@/components/iconos";
import { getModelo, modelos } from "@/data/catalog";
import type { GeneroModelo } from "@/lib/types";

const generos: { id: GeneroModelo; label: string }[] = [
  { id: "caballero", label: "Caballero" },
  { id: "dama", label: "Dama" },
];

export function SelectorModelo() {
  const { modelo, setModelo } = useCotizacion();

  // Si el cliente vuelve con un modelo ya elegido, abrimos en su mismo corte.
  const [genero, setGenero] = useState<GeneroModelo>(
    () => getModelo(modelo)?.genero ?? "caballero",
  );
  const pista = useRef<HTMLDivElement>(null);

  const visibles = useMemo(
    () => modelos.filter((m) => m.genero === genero),
    [genero],
  );

  const desplazar = (direccion: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    el.scrollBy({ left: direccion * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const cambiarGenero = (nuevo: GeneroModelo) => {
    setGenero(nuevo);
    pista.current?.scrollTo({ left: 0 });
  };

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
        <div className="inline-flex rounded-full border border-white/20 bg-white/5 p-1">
          {generos.map((opcion) => (
            <button
              key={opcion.id}
              type="button"
              onClick={() => cambiarGenero(opcion.id)}
              aria-pressed={genero === opcion.id}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                genero === opcion.id
                  ? "bg-dorado text-tinta"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {opcion.label}
            </button>
          ))}
        </div>

        <div className="ml-auto hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => desplazar(-1)}
            aria-label="Ver modelos anteriores"
            className="grid h-10 w-10 place-items-center rounded-full bg-dorado text-tinta transition-colors hover:bg-dorado-hover"
          >
            <IconoFlechaIzquierda className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => desplazar(1)}
            aria-label="Ver más modelos"
            className="grid h-10 w-10 place-items-center rounded-full bg-dorado text-tinta transition-colors hover:bg-dorado-hover"
          >
            <IconoFlecha className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/*
        Una sola fila que se desplaza en horizontal: la sección no crece de alto
        aunque se agreguen modelos. En móvil se arrastra con el dedo; en
        escritorio, además, con las flechas de arriba.
      */}
      <div
        ref={pista}
        className="sin-barra flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1"
      >
        {visibles.map((item) => {
          const activo = modelo === item.slug;
          return (
            <button
              key={item.slug}
              type="button"
              onClick={() => setModelo(item.slug)}
              aria-pressed={activo}
              title={item.descripcion}
              /*
                El ancho sale de cuántas tarjetas queremos ver a la vez: 2 en
                móvil, 3 en tableta y 4 en escritorio, descontando los 0.75rem
                de separación entre ellas.
              */
              className={`tarjeta relative shrink-0 grow-0 basis-[calc((100%-0.75rem)/2)] snap-start overflow-hidden text-left transition-colors sm:basis-[calc((100%-1.5rem)/3)] lg:basis-[calc((100%-2.25rem)/4)] ${
                activo ? "border-dorado" : "hover:border-dorado"
              }`}
            >
              <div className="relative aspect-square bg-white">
                {item.foto ? (
                  <Image
                    src={item.foto}
                    alt={`Modelo ${item.nombre}`}
                    fill
                    sizes="(min-width: 1024px) 260px, (min-width: 640px) 30vw, 45vw"
                    className="object-contain p-2"
                  />
                ) : (
                  <ModeloArte modelo={item} />
                )}
              </div>
              {activo && (
                <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-dorado text-tinta">
                  <IconoCheck className="h-3 w-3" />
                </span>
              )}
              <p className="titulo px-3 py-2 text-lg leading-none">
                {item.nombre}
              </p>
            </button>
          );
        })}
      </div>
    </>
  );
}
