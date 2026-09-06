"use client";

import { useEffect, useMemo, useState } from "react";

import { useCotizacion } from "@/components/CotizacionProvider";
import { ProductoImagen } from "@/components/ProductoImagen";
import { AvisoMercadoLibre } from "@/components/AvisoMercadoLibre";
import { IconoCerrar, IconoCheck, IconoWhatsApp } from "@/components/iconos";
import { getModelo, modelos } from "@/data/catalog";
import { negocio } from "@/lib/config";
import {
  etiquetasOpciones,
  linkWhatsApp,
  opcionesPorDefecto,
  precioMXN,
  precioUnitario,
} from "@/lib/quote";
import type { Producto } from "@/lib/types";

export function ModalProducto({
  producto,
  onCerrar,
}: {
  producto: Producto;
  onCerrar: () => void;
}) {
  const { modelo, setModelo } = useCotizacion();
  const [opciones, setOpciones] = useState(() => opcionesPorDefecto(producto));

  // Los modelos que se producen con esta casaca. En el resto de los productos
  // queda vacío y el selector ni siquiera aparece.
  const modelosDisponibles = useMemo(
    () => modelos.filter((m) => m.casacaSlug === producto.slug),
    [producto.slug],
  );
  const modeloActivo = modelosDisponibles.some((m) => m.slug === modelo) ? modelo : "";

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

  const unitario = precioUnitario(producto, opciones);

  // Si alguna opción elegida trae foto propia (los colores, por ejemplo), esa
  // manda sobre la foto general del producto.
  const fotoVariante = useMemo(() => {
    // El modelo elegido manda sobre todo: es la foto de lo que se va a producir.
    const fotoModelo = modeloActivo ? getModelo(modeloActivo)?.foto : undefined;
    if (fotoModelo) return fotoModelo;
    for (const opcion of producto.opciones) {
      const valor = opcion.valores.find((v) => v.id === opciones[opcion.id]);
      if (valor?.foto) return valor.foto;
    }
    return undefined;
  }, [producto, opciones, modeloActivo]);

  // El mensaje llega al chat con la prenda y lo que el cliente ya configuró,
  // para que no tenga que volver a explicarlo.
  const mensaje = useMemo(() => {
    const partes = [
      `¡Hola ${negocio.nombre}! Me interesa: *${producto.nombre}* (${precioMXN(unitario)} por pieza).`,
    ];
    const nombreDelModelo = modeloActivo ? getModelo(modeloActivo)?.nombre : undefined;
    if (nombreDelModelo) partes.push(`Modelo: ${nombreDelModelo}`);
    const detalle = etiquetasOpciones(producto, opciones);
    if (detalle.length > 0) partes.push(detalle.join(" · "));
    partes.push("¿Me pasan más información?");
    return partes.join("\n");
  }, [producto, opciones, unitario, modeloActivo]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/75" onClick={onCerrar} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={producto.nombre}
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-linea bg-papel sm:rounded-2xl"
      >
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-linea bg-papel/80 text-tenue backdrop-blur transition-colors hover:text-tinta"
        >
          <IconoCerrar className="h-3.5 w-3.5" />
        </button>

        <div className="grid flex-1 overflow-y-auto sm:grid-cols-[minmax(0,320px)_1fr]">
          <div className="relative aspect-video bg-arena sm:aspect-auto sm:min-h-full">
            <ProductoImagen
              producto={producto}
              foto={fotoVariante}
              sizes="(min-width: 640px) 320px, 100vw"
            />
          </div>

          <div className="flex flex-col gap-5 p-5 sm:p-6">
            <div>
              <p className="etiqueta text-tinta">Desde {precioMXN(producto.precio)} por pieza</p>
              <h2 className="titulo mt-1 text-3xl">{producto.nombre}</h2>
              <p className="mt-2 text-sm leading-relaxed text-tenue">{producto.descripcion}</p>
            </div>

            <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-tenue">
              {producto.incluye.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <IconoCheck className="h-3.5 w-3.5 text-tinta" />
                  {item}
                </li>
              ))}
            </ul>

            {producto.mercadoLibre && <AvisoMercadoLibre href={producto.mercadoLibre} />}

            {modelosDisponibles.length > 0 && (
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-tenue">
                  Modelo del equipo
                </span>
                {/*
                  Elegir aquí es lo mismo que elegir en el paso 1 del armador:
                  el modelo del uniforme es uno solo para toda la cotización.
                */}
                <select
                  value={modeloActivo}
                  onChange={(e) => setModelo(e.target.value)}
                  className="w-full rounded-lg border border-linea bg-arena px-3 py-2.5 text-sm outline-none focus:border-tinta"
                >
                  <option value="">Sin modelo definido</option>
                  {modelosDisponibles.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.nombre}
                    </option>
                  ))}
                </select>
                <span className="mt-1.5 block text-xs text-tenue">
                  {modeloActivo
                    ? "También queda elegido en el paso 1 del armador."
                    : "Opcional: si no eliges, definimos el diseño cuando nos escribas."}
                </span>
              </label>
            )}

            {producto.opciones.map((opcion) => (
              <fieldset key={opcion.id}>
                <legend className="mb-2 text-xs font-semibold uppercase tracking-wider text-tenue">
                  {opcion.label}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {opcion.valores.map((valor) => {
                    const activo = opciones[opcion.id] === valor.id;
                    return (
                      <button
                        key={valor.id}
                        type="button"
                        onClick={() => setOpciones((o) => ({ ...o, [opcion.id]: valor.id }))}
                        aria-pressed={activo}
                        className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                          activo
                            ? "border-tinta bg-tinta/5 text-tinta"
                            : "border-linea bg-arena text-tenue hover:border-tenue"
                        }`}
                      >
                        {valor.label}
                        {valor.extra ? (
                          <span className="ml-1.5 text-xs text-tinta">
                            {valor.extra > 0 ? "+" : "−"}
                            {precioMXN(Math.abs(valor.extra))}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
                {opcion.ayuda && <p className="mt-1.5 text-xs text-tenue">{opcion.ayuda}</p>}
              </fieldset>
            ))}
          </div>
        </div>

        {/*
          El catálogo no alimenta la cotización: es una vitrina. De aquí se
          pregunta directo con la prenda y sus opciones ya escritas.
          El paquete del equipo se arma en la sección de paquetes.
        */}
        <div className="bg-tinta p-5 text-white">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <p className="text-xs text-white/60">Precio por pieza</p>
              <p className="titulo text-3xl leading-none">{precioMXN(unitario)}</p>
            </div>

            <a
              href={linkWhatsApp(mensaje)}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex w-full items-center justify-center gap-2 rounded-xl bg-dorado px-6 py-3.5 font-semibold text-tinta transition-colors hover:bg-dorado-hover sm:w-auto"
            >
              <IconoWhatsApp />
              Preguntar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
