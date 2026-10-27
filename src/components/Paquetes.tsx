"use client";

import { useState, type ReactNode } from "react";

import type { Paquete, PaqueteItem } from "@/lib/types";

import { useCotizacion } from "@/components/CotizacionProvider";
import { SelectorColor } from "@/components/SelectorColor";
import { SelectorGorra } from "@/components/SelectorGorra";
import { SelectorDiseno } from "@/components/SelectorDiseno";
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
  type SeleccionArmador,
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
    paquete,
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
  const pasos: {
    clave: string;
    titulo: string;
    detalle?: string;
    contenido: ReactNode;
  }[] = [
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
      contenido: <SelectorColor pieza="pantalon" productoSlug={pantalonSlug} />,
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

/**
 * Las tarjetas del paso 2. Antes cada una traía su botón de "armar" y el
 * paquete se escogía al final; ahora se escoge aquí y la tarjeta solo
 * selecciona, porque de ella dependen los pasos que vienen abajo.
 *
 * Siguen listando todas las piezas y tachando las que no traen: es la única
 * forma de comparar de un vistazo qué se gana al subir de paquete.
 */
function TarjetasPaquete({ seleccion }: { seleccion: SeleccionArmador }) {
  const { jugadores, paquete, setPaquete, tecnica } = useCotizacion();

  return (
    <div className="grid gap-4 pt-3 sm:grid-cols-2 lg:grid-cols-4">
      {paquetes.map((item) => {
        const activo = paquete === item.slug;
        const porJugador = precioPaquete(item, seleccion);
        const piezasPorJugador = item.items.reduce(
          (s, i) => s + i.porJugador,
          0,
        );
        const piezas = piezasPorJugador * jugadores;
        const total = porJugador * jugadores * (1 - descuentoPara(piezas));
        const Icono = iconosPaquete[item.icono];
        const cabecera = encabezados[item.color];
        const incluidas = new Map(
          item.items.map((i) => [i.segun ?? i.productoSlug, i]),
        );

        return (
          <button
            key={item.slug}
            type="button"
            onClick={() => setPaquete(item.slug)}
            aria-pressed={activo}
            className={`tarjeta sube relative flex flex-col text-left transition-[border-color,translate] duration-200 hover:-translate-y-1 ${
              activo ? "border-dorado" : "hover:border-dorado"
            }`}
          >
            {item.badge && (
              <span className="absolute left-3 top-3 z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-tinta px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
                <IconoEstrella className="h-2.5 w-2.5 text-dorado-claro" />
                {item.badge}
              </span>
            )}
            {activo && (
              <span className="absolute right-3 top-3 z-10 grid h-7 w-7 place-items-center rounded-full bg-dorado text-tinta">
                <IconoCheck className="h-3 w-3" />
              </span>
            )}

            <div
              className={`rounded-t-[15px] px-5 pb-5 pt-8 text-center ${cabecera.fondo} ${cabecera.texto}`}
            >
              <Icono className={`mx-auto h-12 w-12 ${cabecera.icono}`} />
              <h3 className="titulo mt-4 text-2xl leading-none">
                {item.nombre}
              </h3>
              <p className={`mt-2 text-sm leading-snug ${cabecera.detalle}`}>
                {item.descripcion}
              </p>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <p className="etiqueta text-[11px] text-tenue">
                {piezasPorJugador} {piezasPorJugador === 1 ? "pieza" : "piezas"}{" "}
                por jugador
              </p>
              <ul className="mt-3 space-y-1.5 pb-5 text-sm">
                {piezasDeTodos.map(({ clave, item: referencia }) => {
                  const propia = incluidas.get(clave);
                  const producto = productoDeItem(
                    propia ?? referencia,
                    seleccion,
                  );
                  if (!producto) return null;
                  /*
                    La casaca se nombra por el acabado elegido. Mientras no se
                    elige uno va en genérico: el paquete cotiza con el mixto por
                    omisión, pero decir "Casaca mixta" haría parecer que ya se
                    decidió.
                  */
                  const etiqueta =
                    clave === "tecnica"
                      ? tecnica
                        ? producto.nombre
                        : "Casaca"
                      : clave === "gorra"
                        ? "Gorra"
                        : producto.nombre;
                  return (
                    <li
                      key={clave}
                      className={`flex items-start gap-2 ${propia ? "" : "text-tenue/60"}`}
                    >
                      {propia ? (
                        <IconoCheck className="mt-0.5 h-4 w-4 shrink-0 text-tinta" />
                      ) : (
                        <IconoCerrar className="mt-0.5 h-4 w-4 shrink-0 text-linea" />
                      )}
                      <span>
                        {propia &&
                          propia.porJugador > 1 &&
                          `${propia.porJugador}× `}
                        {etiqueta}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto border-t border-linea pt-5">
                <div className="flex items-baseline gap-2">
                  <p className="titulo text-3xl leading-none">
                    {precioMXN(porJugador)}
                  </p>
                  <p className="text-xs text-tenue">por jugador</p>
                </div>
                <p className="mt-2 text-sm">
                  <span className="font-semibold">{precioMXN(total)}</span>
                  <span className="text-tenue">
                    {" "}
                    el equipo · {piezas} piezas
                  </span>
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/**
 * El cierre del armador: lo que costaría ya con todo lo elegido y el botón que
 * lo manda a la cotización. Vive fuera de los pasos numerados porque no es una
 * decisión más, es el final del recorrido.
 */
function Cierre({
  paquete,
  seleccion,
}: {
  paquete: Paquete;
  seleccion: SeleccionArmador;
}) {
  const { jugadores, agregarPaquete } = useCotizacion();
  const porJugador = precioPaquete(paquete, seleccion);
  const piezasPorJugador = paquete.items.reduce((s, i) => s + i.porJugador, 0);
  const piezas = piezasPorJugador * jugadores;
  const total = porJugador * jugadores * (1 - descuentoPara(piezas));

  return (
    <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-dorado/40 bg-white/5 p-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="text-center lg:text-left">
        <p className="etiqueta text-[11px] text-dorado-claro">Tu paquete</p>
        <p className="titulo mt-1 text-3xl leading-none">{paquete.nombre}</p>
        <p className="mt-2 text-sm text-white/70">
          <span className="font-semibold text-white">
            {precioMXN(porJugador)}
          </span>{" "}
          por jugador · {precioMXN(total)} el equipo · {piezas} piezas
        </p>
      </div>

      <button
        type="button"
        onClick={() => agregarPaquete(paquete, jugadores, seleccion)}
        className="shrink-0 rounded-xl bg-dorado px-7 py-4 font-semibold text-tinta transition-colors hover:bg-dorado-hover"
      >
        Armar para {jugadores} {jugadores === 1 ? "jugador" : "jugadores"}
      </button>
    </div>
  );
}
