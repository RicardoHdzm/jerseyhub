"use client";

import { useEffect, useMemo, useState } from "react";

import { ProductoImagen } from "@/components/ProductoImagen";
import { AvisoMercadoLibre } from "@/components/AvisoMercadoLibre";
import { IconoCerrar, IconoCheck, IconoWhatsApp } from "@/components/iconos";
import { negocio } from "@/lib/config";
import {
  etiquetasOpciones,
  linkWhatsApp,
  opcionesPorDefecto,
  precioMXN,
  precioUnitario,
} from "@/lib/quote";
import type { ModeloUniforme, Producto } from "@/lib/types";

export function ModalProducto({
  producto,
  modelo,
  onCerrar,
}: {
  producto: Producto;
  /**
   * El diseño concreto, cuando se abrió desde una tarjeta de casaca. Manda
   * sobre el nombre y la foto: el cliente hizo clic en "Clásico alterno", no
   * en "Casaca bordada".
   */
  modelo?: ModeloUniforme;
  onCerrar: () => void;
}) {
  const [opciones, setOpciones] = useState(() => opcionesPorDefecto(producto));
  const titulo = modelo?.nombre ?? producto.nombre;

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
    // La foto del modelo manda: es la de lo que se va a producir.
    if (modelo?.foto) return modelo.foto;
    for (const opcion of producto.opciones) {
      const valor = opcion.valores.find((v) => v.id === opciones[opcion.id]);
      if (valor?.foto) return valor.foto;
    }
    return undefined;
  }, [producto, opciones, modelo]);

  // El mensaje llega al chat con la prenda y lo que el cliente ya configuró,
  // para que no tenga que volver a explicarlo.
  const mensaje = useMemo(() => {
    const partes = [
      `¡Hola ${negocio.nombre}! Me interesa: *${titulo}* (${precioMXN(unitario)} por pieza).`,
    ];
    if (modelo) partes.push(`Se produce como: ${producto.nombre}`);
    const detalle = etiquetasOpciones(producto, opciones);
    if (detalle.length > 0) partes.push(detalle.join(" · "));
    partes.push("¿Me pasan más información?");
    return partes.join("\n");
  }, [producto, opciones, unitario, modelo, titulo]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/75" onClick={onCerrar} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
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
              <h2 className="titulo mt-1 text-3xl">{titulo}</h2>
              {modelo && (
                <p className="mt-1 text-sm font-semibold text-tenue">
                  Se produce como {producto.nombre}
                </p>
              )}
              <p className="mt-2 text-sm leading-relaxed text-tenue">
                {modelo?.descripcion ?? producto.descripcion}
              </p>
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
