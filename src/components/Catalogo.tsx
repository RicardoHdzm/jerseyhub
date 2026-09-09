"use client";

import { useMemo, useState } from "react";

import { ModalCatalogo } from "@/components/ModalCatalogo";
import { ModalProducto } from "@/components/ModalProducto";
import { TarjetaCatalogo } from "@/components/TarjetaCatalogo";
import { IconoCuadricula } from "@/components/iconos";
import {
  categorias,
  entradasDelCatalogo,
  muestraDelCatalogo,
  type EntradaCatalogo,
} from "@/data/catalog";
import type { FiltroCatalogo } from "@/lib/types";

type Filtro = FiltroCatalogo | "todo";

/** Cuántas tarjetas se ven sin abrir el catálogo completo. */
const TOPE = 12;

export function Catalogo() {
  const [filtro, setFiltro] = useState<Filtro>("todo");
  const [abierta, setAbierta] = useState<EntradaCatalogo | null>(null);
  const [verTodo, setVerTodo] = useState(false);

  const entradas = useMemo(() => entradasDelCatalogo(), []);

  /*
    En "Todo" se muestra una muestra pareja de cada filtro, no las primeras 12:
    con 17 casacas, cortar en seco dejaría fuera pantalones, gorras y
    accesorios. Con un filtro activo caben todas sin llegar al tope.
  */
  const visibles = useMemo(
    () =>
      filtro === "todo"
        ? muestraDelCatalogo(entradas, TOPE)
        : entradas.filter((e) => e.filtro === filtro).slice(0, TOPE),
    [filtro, entradas],
  );

  const ocultas = useMemo(
    () =>
      (filtro === "todo"
        ? entradas
        : entradas.filter((e) => e.filtro === filtro)
      ).length - visibles.length,
    [filtro, entradas, visibles],
  );

  // Solo mostramos los filtros que tienen algo detrás.
  const filtrosVisibles = useMemo(
    () => categorias.filter((c) => entradas.some((e) => e.filtro === c.id)),
    [entradas],
  );

  const descripcionFiltro =
    filtro === "todo"
      ? null
      : categorias.find((c) => c.id === filtro)?.descripcion;

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
        {(
          [{ id: "todo", nombre: "Todo" }, ...filtrosVisibles] as {
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
          className="flex items-center gap-2 rounded-full bg-dorado px-4 py-2 text-sm font-semibold text-tinta transition-colors hover:bg-dorado-hover lg:ml-auto"
        >
          <IconoCuadricula className="h-3.5 w-3.5" />
          Ver catálogo completo
        </button>
      </div>

      {descripcionFiltro && (
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-tenue lg:mx-0 lg:text-left">
          {descripcionFiltro}
        </p>
      )}

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {visibles.map((entrada) => (
          <TarjetaCatalogo
            key={entrada.id}
            entrada={entrada}
            onAbrir={setAbierta}
          />
        ))}
      </div>

      {ocultas > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setVerTodo(true)}
            className="rounded-full border border-linea px-5 py-2 text-sm font-semibold text-tenue transition-colors hover:border-dorado hover:text-tinta"
          >
            Mostrar más
          </button>
        </div>
      )}

      {abierta && (
        <ModalProducto
          producto={abierta.producto}
          modelo={abierta.modelo}
          variante={abierta.variante}
          onCerrar={() => setAbierta(null)}
        />
      )}
      {verTodo && (
        <ModalCatalogo
          onElegir={(entrada) => {
            setVerTodo(false);
            setAbierta(entrada);
          }}
          onCerrar={() => setVerTodo(false)}
        />
      )}
    </>
  );
}
