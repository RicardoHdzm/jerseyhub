"use client";

import { useEffect, useMemo } from "react";

import { ProductoImagen } from "@/components/ProductoImagen";
import { AvisoMercadoLibre } from "@/components/AvisoMercadoLibre";
import { AvisoSucursal } from "@/components/AvisoSucursal";
import { IconoCerrar, IconoWhatsApp } from "@/components/iconos";
import { negocio } from "@/lib/config";
import { muestrasDeColor } from "@/data/catalog";
import { linkWhatsApp, precioMXN } from "@/lib/quote";
import type { ModeloUniforme, OpcionValor, Producto } from "@/lib/types";

/**
 * La ficha de una prenda del catálogo.
 *
 * Es una vitrina, no un configurador: muestra la pieza tal cual, sin opciones
 * que elegir. Todo lo que se personaliza —acabado, colores, corte— se decide en
 * el armador de paquetes, y aquí solo se pregunta por la prenda.
 */
export function ModalProducto({
  producto,
  modelo,
  variante,
  onCerrar,
}: {
  producto: Producto;
  /**
   * El diseño concreto, cuando se abrió desde una tarjeta de casaca. Manda
   * sobre el nombre, la foto y el texto: el cliente hizo clic en "Clásico
   * alterno", no en la casaca con la que se produce.
   */
  modelo?: ModeloUniforme;
  /** El color concreto, cuando la ficha es la de una variante de color. */
  variante?: OpcionValor;
  onCerrar: () => void;
}) {
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

  const mensaje = useMemo(() => {
    const partes = [
      `¡Hola ${negocio.nombre}! Me interesa: *${titulo}* (${precioMXN(producto.precio)} por pieza).`,
    ];
    if (variante) partes.push(`Color: ${variante.label}`);
    partes.push("¿Me pasan más información?");
    return partes.join("\n");
  }, [producto.precio, titulo, variante]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="absolute inset-0 bg-black/75" onClick={onCerrar} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-linea bg-papel sm:max-w-4xl sm:rounded-2xl"
      >
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-linea bg-papel/80 text-tenue backdrop-blur transition-colors hover:text-tinta"
        >
          <IconoCerrar className="h-3.5 w-3.5" />
        </button>

        {/*
          El `min-h` de escritorio es para la altura, no para el contenido:
          desde que la ficha no tiene opciones que elegir, el texto no da para
          llenar la caja y el modal salía achatado, con la foto en una franja.
        */}
        <div className="grid flex-1 overflow-y-auto sm:min-h-[460px] sm:grid-cols-[minmax(0,400px)_1fr]">
          <div
            className={`relative aspect-video sm:aspect-auto sm:min-h-full ${
              modelo ? "bg-white" : "bg-arena"
            }`}
          >
            <ProductoImagen
              producto={producto}
              foto={modelo?.foto ?? variante?.foto}
              sizes="(min-width: 640px) 320px, 100vw"
            />
          </div>

          {/*
            Centrado en vertical: la ficha quedó con poco contenido —nombre,
            color y descripción— y anclada arriba se veía abandonada en la mitad
            derecha de la caja.
          */}
          <div className="flex flex-col justify-center p-5 sm:p-6">
            <div>
              <h2 className="titulo text-4xl">{titulo}</h2>
              {variante && (
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold">
                  <span
                    aria-hidden="true"
                    style={{
                      backgroundColor:
                        muestrasDeColor[variante.id] ?? "#9ca3af",
                    }}
                    className="h-4 w-4 rounded-full ring-1 ring-linea"
                  />
                  {variante.label}
                </p>
              )}
              <p className="mt-3 text-sm leading-relaxed text-tenue">
                {modelo?.descripcion ?? producto.descripcion}
              </p>
            </div>

            {(producto.disponibleEnSucursal || producto.mercadoLibre) && (
              <div className="mt-6 space-y-2">
                {producto.disponibleEnSucursal && <AvisoSucursal />}
                {producto.mercadoLibre && (
                  <AvisoMercadoLibre href={producto.mercadoLibre} />
                )}
              </div>
            )}
          </div>
        </div>

        {/*
          El catálogo no alimenta la cotización: es una vitrina. De aquí se
          pregunta directo por la prenda. El paquete del equipo se arma en la
          sección de paquetes.
        */}
        <div className="bg-tinta p-5 text-white">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <p className="text-xs text-white/60">Precio</p>
              <p className="titulo text-3xl leading-none">
                {precioMXN(producto.precio)}
              </p>
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
