"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { useCotizacion } from "@/components/CotizacionProvider";
import { RegionLamina } from "@/components/RegionLamina";
import {
  IconoCheck,
  IconoFlecha,
  IconoFlechaIzquierda,
} from "@/components/iconos";
import { getModelo, laminas } from "@/data/catalog";
import type { GeneroModelo } from "@/lib/types";

const cortes: { id: GeneroModelo; label: string }[] = [
  { id: "caballero", label: "Caballero" },
  { id: "dama", label: "Dama" },
];

/** "001 – 010": el rango de códigos de una lámina, para la pestaña. */
function rango(zonas: { slug: string }[]) {
  const numero = (s: string) => s.replace("jh-", "");
  return `${numero(zonas[0].slug)} – ${numero(zonas[zonas.length - 1].slug)}`;
}

/**
 * El paso 2: las nueve hojas del catálogo impreso, enteras, con cada casaca
 * clicable encima.
 *
 * El cliente las quiso sin recortar, así que en vez de una cuadrícula de fotos
 * sueltas se muestra la lámina tal cual y se le ponen botones transparentes
 * encima, uno por prenda, colocados en porcentaje para que cuadren a cualquier
 * tamaño. Son botones de verdad —no un mapa de imagen— así que se recorren con
 * el tabulador y un lector de pantalla los nombra.
 */
export function TableroLaminas() {
  const { modelo, setModelo, corte, setCorte } = useCotizacion();

  // Al volver con un modelo ya elegido, abrimos en la lámina donde está.
  const [hoja, setHoja] = useState(() => {
    const i = laminas.findIndex((l) => l.zonas.some((z) => z.slug === modelo));
    return i < 0 ? 0 : i;
  });

  const lamina = laminas[hoja];
  const elegido = modelo ? getModelo(modelo) : undefined;
  const zonaElegida = useMemo(
    () =>
      laminas
        .flatMap((l) => l.zonas.map((z) => ({ ...z, foto: l.foto })))
        .find((z) => z.slug === modelo),
    [modelo],
  );

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
        <div className="inline-flex rounded-full border border-white/20 bg-white/5 p-1">
          {cortes.map((opcion) => (
            <button
              key={opcion.id}
              type="button"
              onClick={() => setCorte(opcion.id)}
              aria-pressed={corte === opcion.id}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                corte === opcion.id
                  ? "bg-dorado text-tinta"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {opcion.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setHoja((h) => Math.max(0, h - 1))}
            disabled={hoja === 0}
            aria-label="Lámina anterior"
            className="grid h-10 w-10 place-items-center rounded-full bg-dorado text-tinta transition-colors hover:bg-dorado-hover disabled:cursor-not-allowed disabled:opacity-35"
          >
            <IconoFlechaIzquierda className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setHoja((h) => Math.min(laminas.length - 1, h + 1))}
            disabled={hoja === laminas.length - 1}
            aria-label="Lámina siguiente"
            className="grid h-10 w-10 place-items-center rounded-full bg-dorado text-tinta transition-colors hover:bg-dorado-hover disabled:cursor-not-allowed disabled:opacity-35"
          >
            <IconoFlecha className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/*
        Las pestañas van por rango de códigos y no por número de hoja: si el
        cliente trae apuntado un "JH-045", lo que necesita es saber en cuál
        buscarlo.
      */}
      <div
        className="sin-barra -mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1"
        role="tablist"
        aria-label="Láminas del catálogo"
      >
        {laminas.map((l, i) => (
          <button
            key={l.numero}
            type="button"
            role="tab"
            aria-selected={i === hoja}
            onClick={() => setHoja(i)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold tabular-nums transition-colors ${
              i === hoja
                ? "bg-white text-tinta"
                : "bg-white/10 text-white/60 hover:text-white"
            }`}
          >
            {rango(l.zonas)}
          </button>
        ))}
      </div>

      {/*
        La lámina conserva su proporción original para que los porcentajes de
        las zonas cuadren exactos a cualquier ancho.
      */}
      <div className="relative aspect-[1536/1024] overflow-hidden rounded-xl bg-white">
        <Image
          src={lamina.foto}
          alt={`Lámina ${lamina.numero} del catálogo, códigos ${rango(lamina.zonas)}`}
          fill
          sizes="(min-width: 1024px) 900px, 100vw"
          priority={hoja === 0}
          className="object-contain"
        />

        {lamina.zonas.map((zona) => {
          const activo = modelo === zona.slug;
          const m = getModelo(zona.slug);
          const nombre = m?.nombre ?? zona.slug.toUpperCase();
          return (
            <button
              key={zona.slug}
              type="button"
              onClick={() => setModelo(zona.slug)}
              aria-pressed={activo}
              aria-label={m?.color ? `${nombre}, ${m.color}` : nombre}
              style={{
                left: `${zona.x}%`,
                top: `${zona.y}%`,
                width: `${zona.w}%`,
                height: `${zona.h}%`,
              }}
              className={`group absolute rounded-lg outline-none ring-inset transition-all hover:bg-dorado/10 hover:ring-2 hover:ring-dorado focus-visible:bg-dorado/10 focus-visible:ring-2 focus-visible:ring-dorado ${
                activo ? "bg-dorado/10 ring-2 ring-dorado" : ""
              }`}
            >
              {activo && (
                <span className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-dorado text-tinta">
                  <IconoCheck className="h-3 w-3" />
                </span>
              )}
              {/*
                El código ya está impreso en la hoja, pero en móvil la lámina se
                ve a un tercio de su tamaño y ahí no se alcanza a leer. Esta
                etiqueta aparece al apuntar la prenda y en la que quedó elegida.
              */}
              <span
                className={`absolute inset-x-1 bottom-1 truncate rounded bg-tinta/90 px-1.5 py-0.5 text-[10px] font-bold text-white transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 ${
                  activo ? "opacity-100" : "opacity-0"
                }`}
              >
                {nombre}
              </span>
            </button>
          );
        })}
      </div>

      {/*
        Confirmación de lo elegido, ampliada. En móvil la prenda se ve a unos 70
        px dentro de la lámina: sin esto no hay manera de comprobar que se tocó
        la correcta. También es un pedazo de la lámina original, no un recorte.
      */}
      {elegido && zonaElegida && (
        <div className="mt-4 flex items-center gap-4 rounded-xl border border-white/15 bg-white/5 p-3">
          <RegionLamina
            foto={zonaElegida.foto}
            zona={zonaElegida}
            alt={`Casaca ${elegido.nombre}`}
            sizes="140px"
            className="w-24 shrink-0 rounded-lg bg-white sm:w-32"
          />
          <div className="min-w-0">
            <p className="etiqueta text-[11px] text-white/60">Tu elección</p>
            <p className="titulo mt-1 text-2xl leading-none">
              {elegido.nombre}
            </p>
            {elegido.color && (
              <p className="mt-1 text-sm text-white/70">{elegido.color}</p>
            )}
            <button
              type="button"
              onClick={() => setModelo(elegido.slug)}
              className="mt-2 text-xs font-semibold text-dorado-claro underline-offset-2 hover:underline"
            >
              Quitar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
