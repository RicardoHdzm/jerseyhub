"use client";

import Image from "next/image";
import { useEffect } from "react";

import { useCotizacion } from "@/components/CotizacionProvider";
import { ProductoImagen } from "@/components/ProductoImagen";
import { IconoCerrar, IconoTienda } from "@/components/iconos";
import { categorias, getProducto, modelos, productos, tipoDeModelo } from "@/data/catalog";
import { precioMXN } from "@/lib/quote";
import type { Producto } from "@/lib/types";

/**
 * Todo el catálogo de un jalón, agrupado por categoría. Elegir un producto
 * cierra esta vista y abre su configurador.
 */
export function ModalCatalogo({
  onElegir,
  onCerrar,
}: {
  onElegir: (producto: Producto) => void;
  onCerrar: () => void;
}) {
  const { setModelo } = useCotizacion();

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
              Todos los modelos de casaca y las demás prendas. Toca cualquiera para elegir sus
              opciones y agregarla a tu paquete.
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
          {/*
            Las casacas se listan modelo por modelo, no por tipo de tela: al
            cliente le importa ver el diseño de su equipo, y el tipo va de badge.
            Elegir uno lo deja seleccionado y abre su casaca para cotizarla.
          */}
          <section>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3 className="titulo text-2xl">Casacas</h3>
              <span className="text-sm text-tenue">
                Los {modelos.length} modelos que manejamos, en corte caballero y dama
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {modelos.map((item) => {
                const casaca = getProducto(item.casacaSlug);
                if (!casaca) return null;
                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => {
                      setModelo(item.slug);
                      onElegir(casaca);
                    }}
                    title={item.descripcion}
                    className="tarjeta relative overflow-hidden text-left transition-colors hover:border-dorado"
                  >
                    <span className="absolute left-2 top-2 z-10 rounded-full bg-tinta/85 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      {tipoDeModelo(item)}
                    </span>
                    <div className="relative aspect-square bg-white">
                      {item.foto && (
                        <Image
                          src={item.foto}
                          alt={`Modelo ${item.nombre}`}
                          fill
                          sizes="(min-width: 1024px) 240px, 45vw"
                          className="object-contain p-2"
                        />
                      )}
                    </div>
                    <div className="px-3 py-3">
                      <p className="titulo text-lg leading-none">{item.nombre}</p>
                      <p className="mt-2 text-sm font-semibold text-tenue">
                        Desde {precioMXN(casaca.precio)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {categorias.map((categoria) => {
            if (categoria.id === "casacas") return null;
            const deLaCategoria = productos.filter((p) => p.categoria === categoria.id);
            if (deLaCategoria.length === 0) return null;

            return (
              <section key={categoria.id} className="mt-8">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="titulo text-2xl">{categoria.nombre}</h3>
                  {categoria.descripcion && (
                    <span className="text-sm text-tenue">{categoria.descripcion}</span>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {deLaCategoria.map((producto) => (
                    <button
                      key={producto.slug}
                      type="button"
                      onClick={() => onElegir(producto)}
                      className="group tarjeta relative overflow-hidden text-left transition-colors hover:border-dorado"
                    >
                      <div className="relative aspect-square bg-arena">
                        <ProductoImagen
                          producto={producto}
                          sizes="(min-width: 1024px) 240px, 45vw"
                        />
                        {producto.mercadoLibre && (
                          <span
                            title="También se vende por pieza en Mercado Libre"
                            className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full border border-linea bg-papel text-tenue"
                          >
                            <IconoTienda className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                      <div className="px-3 py-3">
                        <p className="titulo text-lg leading-none">{producto.nombre}</p>
                        <p className="mt-2 text-sm font-semibold text-tenue">
                          Desde {precioMXN(producto.precio)}
                        </p>
                      </div>
                    </button>
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
