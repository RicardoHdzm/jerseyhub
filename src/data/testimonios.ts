export type Testimonio = {
  /** Quién lo dice. */
  nombre: string;
  /** Equipo, liga o categoría: da contexto sin necesitar apellido. */
  equipo: string;
  texto: string;
  /** Qué le compraron. Sale como pie de la tarjeta. */
  pedido: string;
  /**
   * De 1 a 5 estrellas. Es opcional y por omisión son 5, que es lo que trae
   * una reseña que la persona quiso dejar; si alguna vez llega una de 4,
   * ponla aquí en lugar de omitir la reseña.
   */
  calificacion?: 1 | 2 | 3 | 4 | 5;
};

/**
 * TESTIMONIOS DE EJEMPLO — reemplázalos por reseñas reales antes de publicar.
 * Los mejores salen de las respuestas de WhatsApp y de los comentarios de
 * Instagram: pide permiso, copia la frase tal cual y firma con nombre y equipo.
 * Para ocultar la sección por completo, deja el arreglo vacío: []
 */
export const testimonios: Testimonio[] = [
  {
    nombre: "Ricardo H.",
    equipo: "Caimanes de Villas, Liga Valle Alto",
    texto:
      "Buscábamos actualizar nuestro uniforme despues de casi 3 años y el resultado nos encantó. La personalización total del diseño y la calidad de los materiales superaron nuestras expectativas.",
    pedido: "Paquete Básico para 20 jugadores",
  },
  {
    nombre: "Ana Sofía R.",
    equipo: "Softbol femenil, Culiacán",
    texto:
      "Nos hicieron el corte de dama y se nota la diferencia, ya no traemos la casaca guanga. Nos mandaron el boceto y le movimos tres veces hasta que quedó como lo queríamos.",
    pedido: "14 casacas corte dama y pantalones",
  },
  {
    nombre: "Jorge V.",
    equipo: "Equipo infantil sub-12",
    texto:
      "Traía la idea del uniforme de mi equipo favorito y me lo sacaron igualito, con el nombre de cada niño. Los papás quedaron encantados y ya vamos por las sudaderas.",
    pedido: "12 casacas bordadas con nombre y número",
  },
];
