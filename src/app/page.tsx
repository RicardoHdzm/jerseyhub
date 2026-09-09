import { Catalogo } from "@/components/Catalogo";
import { Hero } from "@/components/Hero";
import { Paquetes } from "@/components/Paquetes";
import { PreguntasFrecuentes } from "@/components/PreguntasFrecuentes";
import { Testimonios } from "@/components/Testimonios";
import { IconoEstrella, IconoWhatsApp } from "@/components/iconos";
import { negocio } from "@/lib/config";
import { linkWhatsApp } from "@/lib/quote";

/**
 * Las secciones alternan entre el blanco del hero y el negro de la marca. El
 * gris de antes se cambió por negro para que el dorado tenga dónde brillar:
 * sobre fondo claro el oro se apaga, sobre negro es donde funciona.
 */
const fondos = {
  papel: {
    seccion: "bg-papel",
    etiqueta: "text-tinta",
    titulo: "text-dorado",
    intro: "text-tenue",
  },
  tinta: {
    seccion: "bg-tinta text-white",
    etiqueta: "text-dorado-claro",
    /* Sobre negro el título se queda en blanco: ahí el dorado ya lo lleva el
       eyebrow, y dos elementos dorados encimados se pelean. */
    titulo: "",
    intro: "text-white/70",
  },
};

function Seccion({
  id,
  etiqueta,
  titulo,
  intro,
  fondo,
  separador = true,
  children,
}: {
  id: string;
  etiqueta: string;
  titulo: string;
  intro?: string;
  fondo: keyof typeof fondos;
  /**
   * La estrella que marca el corte con la sección de arriba. Se apaga en la
   * primera, donde la flecha del hero ya hace ese trabajo.
   */
  separador?: boolean;
  children: React.ReactNode;
}) {
  const tono = fondos[fondo];

  return (
    <section id={id} className={`relative ${tono.seccion}`}>
      {/*
        Va montada sobre el filo, mitad en cada sección. Como la dibuja la
        sección de abajo, se pinta encima de la de arriba sin necesidad de
        z-index.
      */}
      {separador && (
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-dorado text-tinta"
        >
          <IconoEstrella className="h-5 w-5" />
        </span>
      )}
      <div className="mx-auto max-w-6xl px-5 py-16 lg:py-20">
        {/*
          En móvil el encabezado va centrado y en escritorio alineado a la
          izquierda. El contenido de abajo no se toca: centrar listas y tarjetas
          las vuelve difíciles de recorrer con la vista.
        */}
        <div className="text-center lg:text-left">
          <p
            className={`etiqueta flex items-center justify-center gap-2 text-base sm:text-lg lg:justify-start ${tono.etiqueta}`}
          >
            <IconoEstrella className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
            {etiqueta}
          </p>
          <h2 className={`titulo mt-2 text-4xl sm:text-5xl ${tono.titulo}`}>
            {titulo}
          </h2>
          {intro && (
            <p className={`mx-auto mt-3 max-w-2xl lg:mx-0 ${tono.intro}`}>
              {intro}
            </p>
          )}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export default function Inicio() {
  return (
    <>
      <Hero />

      <Seccion
        id="paquetes"
        fondo="tinta"
        separador={false}
        etiqueta="Paquetes de equipo"
        titulo="Arma tu uniforme completo"
        intro="Combinaciones listas con precio por jugador. Agrega una y después ajústala pieza por pieza como quieras."
      >
        <Paquetes />
      </Seccion>

      <Seccion
        id="catalogo"
        fondo="papel"
        etiqueta="Catálogo"
        titulo="Nuestros Productos"
      >
        <Catalogo />
      </Seccion>

      <Seccion
        id="testimonios"
        fondo="tinta"
        etiqueta="Lo que dicen los equipos"
        titulo="Que ya visten JerseyHub"
        intro="Reseñas de equipos que armaron su uniforme con nosotros."
      >
        <Testimonios />
      </Seccion>

      <Seccion
        id="preguntas"
        fondo="papel"
        etiqueta="Preguntas frecuentes"
        titulo="Resolvemos tus dudas"
      >
        <PreguntasFrecuentes />
      </Seccion>

      {/*
        El cierre va a ancho completo y pegado al pie de página: antes era una
        tarjeta negra flotando sobre blanco justo encima del footer negro, y esa
        franja blanca de en medio se leía como un error de maquetado. Ahora el
        negro corre de aquí hasta el final.
      */}
      <section className="bg-tinta text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-16 text-center lg:flex-row lg:items-center lg:justify-between lg:py-20 lg:text-left">
          <div>
            <h2 className="titulo text-4xl sm:text-5xl">¿Estás listo?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70 lg:mx-0">
              Mándanos tu idea, el logo del equipo o una foto de referencia y te
              regresamos una propuesta de diseño sin costo.
            </p>
          </div>
          <a
            href={linkWhatsApp(
              `¡Hola ${negocio.nombre}! Quiero una propuesta de diseño para mi equipo.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 rounded-xl bg-dorado px-7 py-4 font-semibold text-tinta transition-colors hover:bg-dorado-hover"
          >
            <IconoWhatsApp />
            Escribir por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
