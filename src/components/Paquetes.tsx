"use client";

import { useState, type ReactNode } from "react";

import type { PaqueteItem } from "@/lib/types";

import { useCotizacion } from "@/components/CotizacionProvider";
import { SelectorColor } from "@/components/SelectorColor";
import { SelectorGorra } from "@/components/SelectorGorra";
import { TableroLaminas } from "@/components/TableroLaminas";
import { SelectorTecnica } from "@/components/SelectorTecnica";
import {
  IconoCasaca,
  IconoCerrar,
  IconoCheck,
  IconoDiamante,
  IconoEstrella,
  IconoMas,
  IconoMenos,
  IconoPelota,
} from "@/components/iconos";
import {
  getProducto,
  nombreModelo,
  paquetes,
  tituloTecnica,
} from "@/data/catalog";
import { minimoUniformes } from "@/lib/config";
import {
  descuentoPara,
  precioMXN,
  precioPaquete,
  productoDeItem,
} from "@/lib/quote";

const encabezados = {
  tinta: {
    fondo: "bg-tinta",
    texto: "text-white",
    icono: "text-white",
    detalle: "text-white/70",
  },
  dorado: {
    fondo: "bg-dorado",
    texto: "text-tinta",
    icono: "text-tinta",
    detalle: "text-tinta/75",
  },
};

/**
 * Todas las piezas que aparecen en algún paquete, ordenadas por el paquete más
 * completo. Las tres tarjetas listan estas mismas filas y tachan en gris las
 * que su paquete no trae: así quedan del mismo alto (antes el básico, con dos
 * piezas, dejaba un hueco muerto arriba del precio) y de paso se ve de un
 * vistazo qué se gana al subir de paquete.
 */
const piezasDeTodos: { clave: string; item: PaqueteItem }[] = (() => {
  const vistas = new Map<string, PaqueteItem>();
  for (const paquete of [...paquetes].sort(
    (a, b) => b.items.length - a.items.length,
  )) {
    for (const item of paquete.items) {
      const clave = item.segun ?? item.productoSlug;
      if (!vistas.has(clave)) vistas.set(clave, item);
    }
  }
  return [...vistas].map(([clave, item]) => ({ clave, item }));
})();

const iconosPaquete = {
  casaca: IconoCasaca,
  pelota: IconoPelota,
  estrella: IconoEstrella,
  diamante: IconoDiamante,
};

/**
 * Un paso del armador. Da por hecho que va sobre la banda negra: el número en
 * dorado y el detalle en blanco tenue solo funcionan ahí.
 */
function Paso({
  numero,
  titulo,
  detalle,
  children,
}: {
  numero: number;
  titulo: string;
  detalle?: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-8 first:mt-0">
      <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-center lg:justify-start lg:text-left">
        <span className="titulo text-2xl text-dorado-claro">{numero}.</span>
        <h3 className="titulo text-2xl">{titulo}</h3>
        {detalle && <span className="text-sm text-white/60">{detalle}</span>}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

/**
 * El contador de jugadores del paso 1.
 *
 * Mientras se escribe, el campo guarda su propio texto en `borrador` y no pasa
 * por el recorte del mínimo y el máximo. Si recortara en cada tecla sería
 * imposible teclear un número: al borrar el 12 el valor rebota al mínimo, el
 * dígito nuevo se pega detrás y el 12X resultante se recorta a 60. El recorte
 * se aplica al salir del campo, que es cuando ya hay un número completo.
 */
function ContadorJugadores() {
  const { jugadores, setJugadores } = useCotizacion();
  const [borrador, setBorrador] = useState<string | null>(null);

  // Con `borrador` en null el campo muestra el valor de la cotización; en
  // cuanto se escribe, muestra lo tecleado. Así no hace falta un efecto que
  // sincronice los dos.
  const confirmar = () => {
    if (borrador !== null) setJugadores(Number(borrador));
    setBorrador(null);
  };

  const ajustar = (delta: number) => {
    setBorrador(null);
    setJugadores(jugadores + delta);
  };

  return (
    <div className="mx-auto flex w-fit items-center rounded-lg border border-white/20 bg-white/5 text-white lg:mx-0">
      <button
        type="button"
        onClick={() => ajustar(-1)}
        aria-label="Un jugador menos"
        className="h-9 w-9 text-lg text-white/60 transition-colors hover:text-dorado"
      >
        <IconoMenos className="h-3 w-3" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={minimoUniformes}
        max={60}
        value={borrador ?? jugadores}
        onChange={(e) => setBorrador(e.target.value)}
        onBlur={confirmar}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.currentTarget.blur();
        }}
        aria-label="Número de jugadores"
        className="w-14 bg-transparent text-center font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={() => ajustar(1)}
        aria-label="Un jugador más"
        className="h-9 w-9 text-lg text-white/60 transition-colors hover:text-dorado"
      >
        <IconoMas className="h-3 w-3" />
      </button>
    </div>
  );
}

/** Las piezas que trae un paquete, por la misma clave que usa `piezasDeTodos`. */
function clavesDe(paquete: Paquete): Set<string> {
  return new Set(paquete.items.map((i) => i.segun ?? i.productoSlug));
}

export function Paquetes() {
  const {
    jugadores,
    agregarPaquete,
    paquete,
    setPaquete,
    origenDiseno,
    modelo,
    corte,
    tecnica,
    gorra,
    colores,
  } = useCotizacion();

  const elegido = paquetes.find((p) => p.slug === paquete);
  const trae = elegido ? clavesDe(elegido) : new Set<string>();

  const tecnicaElegida = tecnica ? tituloTecnica(tecnica) : undefined;
  const gorraElegida = gorra ? getProducto(gorra)?.nombre : undefined;
  const seleccion = { modelo, corte, tecnica, gorra, colores };

  /*
    De qué producto salen los colores de cada paso. La gorra y el pantalón
    cambian con lo que se eligió antes —el tipo de gorra y el corte de la
    casaca—, así que los círculos tienen que preguntarle al producto que quedó
    seleccionado, no a uno fijo.
  */
  const gorraSlug = gorra || "gorra-bordada-6-paneles";
  const pantalonSlug = corte === "dama" ? "pantalon-dama" : "pantalon-clasico";
  const pantalonNombre = getProducto(pantalonSlug)?.nombre ?? "";

  const disenoElegido =
    origenDiseno === "personalizado"
      ? "Diseño personalizado"
      : origenDiseno === "catalogo"
        ? (nombreModelo(modelo, corte) ?? "Falta señalar cuál del catálogo")
        : undefined;

  /*
    Los pasos se arman en una lista y se numeran al pintarlos. Del 5 en
    adelante dependen del paquete: el Estrella pregunta por el pantalón pero no
    por calcetas ni cinturón, porque no los trae. Numerarlos a mano se rompería
    en cuanto el paquete cambie.
  */
  const pasos: { clave: string; titulo: string; detalle?: string; contenido: ReactNode }[] =
    [
      {
        clave: "jugadores",
        titulo: "¿Cuántos jugadores son?",
        contenido: <ContadorJugadores />,
      },
      {
        clave: "paquete",
        titulo: "Escoge tu paquete",
        detalle: elegido
          ? `Elegiste: ${elegido.nombre}`
          : `Precios para ${jugadores} ${jugadores === 1 ? "jugador" : "jugadores"}`,
        contenido: <TarjetasPaquete seleccion={seleccion} />,
      },
      {
        clave: "diseno",
        titulo: "Elige la casaca",
        detalle: disenoElegido ?? "Personalizada o del catálogo",
        contenido: <SelectorDiseno />,
      },
      {
        clave: "acabado",
        titulo: "Elige el acabado de la casaca",
        detalle: tecnicaElegida
          ? `Elegiste: ${tecnicaElegida}`
          : "Bordado, mixto o DTF textil",
        contenido: <SelectorTecnica />,
      },
    ];

  if (trae.has("gorra")) {
    pasos.push({
      clave: "gorra",
      titulo: "Elige la gorra",
      detalle: gorraElegida ? `Elegiste: ${gorraElegida}` : "Algodón o dry-fit",
      contenido: (
        <>
          <SelectorGorra />
          <div className="mt-5">
            <p className="etiqueta text-[11px] text-white/60">
              Color de la gorra
            </p>
            <div className="mt-3">
              <SelectorColor pieza="gorra" productoSlug={gorraSlug} />
            </div>
          </div>
        </>
      ),
    });
  }

  if (trae.has("pantalon")) {
    pasos.push({
      clave: "pantalon",
      titulo: "Elige el color del pantalón",
      detalle: pantalonNombre,
      contenido: (
        <SelectorColor pieza="pantalon" productoSlug={pantalonSlug} />
      ),
    });
  }

  if (trae.has("calcetas-sublimadas")) {
    pasos.push({
      clave: "calcetas",
      titulo: "Elige el color de las calcetas",
      contenido: (
        <SelectorColor pieza="calcetas" productoSlug="calcetas-sublimadas" />
      ),
    });
  }

  if (trae.has("cinturon-beisbol")) {
    pasos.push({
      clave: "cinturon",
      titulo: "Elige el color del cinturón",
      contenido: (
        <SelectorColor pieza="cinturon" productoSlug="cinturon-beisbol" />
      ),
    });
  }

  return (
    <>
      {pasos.map((paso, i) => (
        <Paso
          key={paso.clave}
          numero={i + 1}
          titulo={paso.titulo}
          detalle={paso.detalle}
        >
          {paso.contenido}
        </Paso>
      ))}

      {elegido && <Cierre paquete={elegido} seleccion={seleccion} />}
    </>
  );
}
