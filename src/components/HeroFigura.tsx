"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Cuánto se corre la figura, en px, del centro a cada extremo de la pantalla.
 * Es a propósito casi imperceptible: quien lo note, que lo note; nadie debería
 * ver a la figura persiguiendo el cursor.
 */
const AMPLITUD_X = 4;
const AMPLITUD_Y = 2.5;

/**
 * El jugador del hero: un recorte con fondo transparente sobre un panel oscuro.
 *
 * Es cliente sólo por el seguimiento del cursor. El resto del hero se queda
 * como componente de servidor.
 */
export function HeroFigura() {
  const capa = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = capa.current;
    if (!el) return;

    // Sólo con mouse: en una pantalla táctil no hay cursor al que seguir, y
    // quien pidió menos movimiento no quiere que la figura persiga nada.
    const conMouse = window.matchMedia("(hover: hover) and (pointer: fine)");
    const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!conMouse.matches || menosMovimiento.matches) return;

    let cuadro = 0;
    let x = 0;
    let y = 0;

    const pintar = () => {
      cuadro = 0;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    };

    const alMover = (evento: PointerEvent) => {
      x = (evento.clientX / window.innerWidth - 0.5) * 2 * AMPLITUD_X;
      y = (evento.clientY / window.innerHeight - 0.5) * 2 * AMPLITUD_Y;
      // Un repintado por cuadro: pointermove dispara muchas más veces de las
      // que la pantalla alcanza a dibujar.
      if (!cuadro) cuadro = requestAnimationFrame(pintar);
    };

    window.addEventListener("pointermove", alMover, { passive: true });
    return () => {
      window.removeEventListener("pointermove", alMover);
      if (cuadro) cancelAnimationFrame(cuadro);
    };
  }, []);

  return (
    /*
      El recorte tiene fondo transparente, así que necesita algo detrás: sin
      panel el jugador quedaba flotando en el blanco. El panel arranca más abajo
      que la imagen a propósito, para que la gorra y el guante salgan por encima
      del borde — es lo que le da profundidad y hace que el recorte se lea como
      decisión y no como una foto pegada.

      El `max-h` es para las pantallas bajas: con el hero a pantalla completa, el
      4/5 de la imagen crecería más que el alto disponible y empujaría los datos
      fuera de vista.
    */
    <div className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-h-[calc(100svh-14rem)]">
      <div aria-hidden="true" className="panel-hero absolute inset-x-0 -bottom-4 top-[15%]" />

      <div className="relative aspect-4/5">
        {/*
          El desplazamiento va en esta capa y no en la imagen porque la imagen
          ya trae su propio `transform` (el `scale`), y un `transform` en línea
          lo pisaría. La transición es la que suaviza el seguimiento: sin ella
          la figura se pega al cursor y se siente nerviosa.
        */}
        <div
          ref={capa}
          className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
        >
          <Image
            src="/hero/hero-render-03.png"
            alt="Jugador de béisbol con el uniforme completo: casaca, gorra y pantalón"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 90vw"
            /*
              El recorte trae parte de su ancho en transparencia, así que dentro
              de la columna la figura se veía chica. El `scale` con origen abajo
              la agranda sin despegarla de la línea del piso.
            */
            className="object-contain object-bottom lg:origin-bottom lg:scale-110"
          />
        </div>
      </div>
    </div>
  );
}
