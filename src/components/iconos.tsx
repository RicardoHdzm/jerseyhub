import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowLeft,
  faArrowRight,
  faBagShopping,
  faBaseball,
  faCheck,
  faChevronDown,
  faCircleHalfStroke,
  faCrown,
  faPenNib,
  faGem,
  faLocationDot,
  faGripVertical,
  faQuoteLeft,
  faMinus,
  faPlus,
  faStore,
  faTrashCan,
  faUpRightFromSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Punto único donde se eligen los iconos del sitio (Font Awesome).
 * Cambiar un icono aquí lo cambia en toda la página.
 *
 * El `autoAddCss = false` va en este archivo, no en el layout: Font Awesome
 * inyecta su hoja de estilos desde el bundle donde se renderizan los iconos, y
 * esa hoja (sin capa de cascada) le gana a las utilidades de tamaño de Tailwind.
 * Los estilos base equivalentes están en globals.css, dentro de `@layer base`.
 */
config.autoAddCss = false;

type Props = { className?: string };

export function IconoWhatsApp({ className = "h-5 w-5" }: Props) {
  return <FontAwesomeIcon icon={faWhatsapp} className={className} />;
}

export function IconoTikTok({ className = "h-5 w-5" }: Props) {
  return <FontAwesomeIcon icon={faTiktok} className={className} />;
}

export function IconoInstagram({ className = "h-5 w-5" }: Props) {
  return <FontAwesomeIcon icon={faInstagram} className={className} />;
}

export function IconoFacebook({ className = "h-5 w-5" }: Props) {
  return <FontAwesomeIcon icon={faFacebookF} className={className} />;
}

export function IconoCheck({ className = "h-4 w-4" }: Props) {
  return <FontAwesomeIcon icon={faCheck} className={className} />;
}

export function IconoCerrar({ className = "h-4 w-4" }: Props) {
  return <FontAwesomeIcon icon={faXmark} className={className} />;
}

export function IconoMas({ className = "h-3 w-3" }: Props) {
  return <FontAwesomeIcon icon={faPlus} className={className} />;
}

export function IconoMenos({ className = "h-3 w-3" }: Props) {
  return <FontAwesomeIcon icon={faMinus} className={className} />;
}

export function IconoFlecha({ className = "h-4 w-4" }: Props) {
  return <FontAwesomeIcon icon={faArrowRight} className={className} />;
}

export function IconoFlechaIzquierda({ className = "h-4 w-4" }: Props) {
  return <FontAwesomeIcon icon={faArrowLeft} className={className} />;
}

export function IconoPelota({ className = "h-6 w-6" }: Props) {
  return <FontAwesomeIcon icon={faBaseball} className={className} />;
}

/*
  La estrella no viene de Font Awesome: es la del logo, medida sobre el
  archivo. Las cinco puntas de la estrella central caen a 72° exactos y la
  proporción entre el radio interior y el exterior es 0.382 —la estrella
  áurea, de puntas largas y esquinas vivas—. La de Font Awesome es más ancha
  y con las uniones redondeadas, así que al repetirla por toda la página se
  notaba que no era la de la marca.
*/
const TRAZO_ESTRELLA =
  "M12 1.15L14.69 9.44L23.41 9.44L16.36 14.56L19.05 22.85L12 17.73L4.95 22.85L7.64 14.56L0.59 9.44L9.31 9.44Z";

export function IconoEstrella({ className = "h-6 w-6" }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={TRAZO_ESTRELLA} />
    </svg>
  );
}

/* Los tres acabados de la casaca: la corona para el más completo, el círculo
   partido para el mixto y la pluma para el más ligero. */
export function IconoCorona({ className = "h-6 w-6" }: Props) {
  return <FontAwesomeIcon icon={faCrown} className={className} />;
}

export function IconoMitades({ className = "h-6 w-6" }: Props) {
  return <FontAwesomeIcon icon={faCircleHalfStroke} className={className} />;
}

export function IconoPluma({ className = "h-6 w-6" }: Props) {
  return <FontAwesomeIcon icon={faPenNib} className={className} />;
}

export function IconoDiamante({ className = "h-6 w-6" }: Props) {
  return <FontAwesomeIcon icon={faGem} className={className} />;
}

export function IconoComillas({ className = "h-5 w-5" }: Props) {
  return <FontAwesomeIcon icon={faQuoteLeft} className={className} />;
}

export function IconoCuadricula({ className = "h-4 w-4" }: Props) {
  return <FontAwesomeIcon icon={faGripVertical} className={className} />;
}

export function IconoUbicacion({ className = "h-4 w-4" }: Props) {
  return <FontAwesomeIcon icon={faLocationDot} className={className} />;
}

export function IconoTienda({ className = "h-4 w-4" }: Props) {
  return <FontAwesomeIcon icon={faStore} className={className} />;
}

export function IconoEnlaceExterno({ className = "h-3 w-3" }: Props) {
  return <FontAwesomeIcon icon={faUpRightFromSquare} className={className} />;
}

export function IconoBote({ className = "h-4 w-4" }: Props) {
  return <FontAwesomeIcon icon={faTrashCan} className={className} />;
}

export function IconoBolsa({ className = "h-4 w-4" }: Props) {
  return <FontAwesomeIcon icon={faBagShopping} className={className} />;
}

export function IconoFlechaAbajo({ className = "h-4 w-4" }: Props) {
  return <FontAwesomeIcon icon={faChevronDown} className={className} />;
}
