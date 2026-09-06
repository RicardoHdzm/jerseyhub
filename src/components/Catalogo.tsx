"use client";

import { useMemo, useState } from "react";

import { ModalCatalogo } from "@/components/ModalCatalogo";
import { ModalProducto } from "@/components/ModalProducto";
import { ProductoImagen } from "@/components/ProductoImagen";
import { categorias, productos } from "@/data/catalog";
import { IconoCuadricula, IconoTienda } from "@/components/iconos";
import { precioMXN } from "@/lib/quote";
import type { CategoriaId, Producto } from "@/lib/types";

type Filtro = CategoriaId | "todo";

function TarjetaProducto({
  producto,
  onAbrir,
}: {
  producto: Producto;
  onAbrir: (p: Producto) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onAbrir(producto)}
      className="group tarjeta flex flex-col overflow-hidden text-left transition-colors hover:border-dorado"
    >
      <div className="relative aspect-square overflow-hidden bg-arena">
        <div className="h-full w-full transition-transform duration-300 group-hover:scale-105">
          <ProductoImagen
            producto={producto}
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
          />
        </div>
        {producto.destacado && (
          <span className="absolute left-3 top-3 rounded-full bg-dorado px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-tinta">
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

      {/*
        La tarjeta solo muestra foto, nombre y precio: el detalle del producto
        vive dentro, al abrirlo. Así la cuadrícula se lee de un vistazo y todas
        las tarjetas quedan de la misma altura.
      */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="titulo text-xl leading-tight">{producto.nombre}</h3>
        <div className="mt-4 pt-2">
          <p className="text-[11px] uppercase tracking-wide text-tenue">Desde</p>
          <p className="titulo text-2xl leading-none">{precioMXN(producto.precio)}</p>
        </div>
      </div>
    </button>
  );
}

export function Catalogo() {
  const [filtro, setFiltro] = useState<Filtro>("todo");
  const [abierto, setAbierto] = useState<Producto | null>(null);
  const [verTodo, setVerTodo] = useState(false);

  // Las gorras no se listan aquí: se eligen en el paso 2 del armador.
  const delCatalogo = useMemo(() => productos.filter((p) => !p.soloEnArmador), []);

  const visibles = useMemo(
    () => (filtro === "todo" ? delCatalogo : delCatalogo.filter((p) => p.categoria === filtro)),
    [filtro, delCatalogo],
  );

  // Solo mostramos los filtros que tienen algo detrás.
  const categoriasVisibles = useMemo(
    () => categorias.filter((c) => delCatalogo.some((p) => p.categoria === c.id)),
    [delCatalogo],
  );

  const descripcionFiltro =
    filtro === "todo" ? null : categorias.find((c) => c.id === filtro)?.descripcion;

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {(
          [{ id: "todo", nombre: "Todo" }, ...categoriasVisibles] as {
            id: Filtro;
            nombre: string;
          }[]
        ).map((opcion) => (
          <button
            key={opcion.id}
            type="button"
            onClick={() => setFiltro(opcion.id)}
            aria-pressed={filtro === opcion.id}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              filtro === opcion.id
                ? "border-tinta bg-tinta text-white"
                : "border-linea bg-papel text-tenue hover:border-tenue hover:text-tinta"
            }`}
          >
            {opcion.nombre}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setVerTodo(true)}
          className="ml-auto flex items-center gap-2 rounded-full bg-dorado px-4 py-2 text-sm font-semibold text-tinta transition-colors hover:bg-dorado-hover"
        >
          <IconoCuadricula className="h-3.5 w-3.5" />
          Ver catálogo completo
        </button>
      </div>

      {descripcionFiltro && (
        <p className="mt-4 max-w-2xl text-sm text-tenue">{descripcionFiltro}</p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visibles.map((producto) => (
          <TarjetaProducto key={producto.slug} producto={producto} onAbrir={setAbierto} />
        ))}
      </div>

      {abierto && <ModalProducto producto={abierto} onCerrar={() => setAbierto(null)} />}
      {verTodo && (
        <ModalCatalogo
          onElegir={(producto) => {
            setVerTodo(false);
            setAbierto(producto);
          }}
          onCerrar={() => setVerTodo(false)}
        />
      )}
    </>
  );
}
