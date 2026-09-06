export type Testimonio = {
  /** Quién lo dice. */
  nombre: string;
  /** Equipo, liga o categoría: da contexto sin necesitar apellido. */
  equipo: string;
  texto: string;
  /** Qué le compraron. Sale como pie de la tarjeta. */
  pedido: string;
};

/**
 * TESTIMONIOS DE EJEMPLO — reemplázalos por reseñas reales antes de publicar.
 * Los mejores salen de las respuestas de WhatsApp y de los comentarios de
 * Instagram: pide permiso, copia la frase tal cual y firma con nombre y equipo.
 * Para ocultar la sección por completo, deja el arreglo vacío: []
 */
export const testimonios: Testimonio[] = [
  {
    nombre: "Ricardo M.",
    equipo: "Liga Municipal, categoría libre",
    texto:
      "Pedimos 16 uniformes completos y llegaron antes de lo que nos dijeron. La tela aguanta bien las barridas y los colores no se han despintado en toda la temporada.",
    pedido: "16 casacas, pantalones y gorras",
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
