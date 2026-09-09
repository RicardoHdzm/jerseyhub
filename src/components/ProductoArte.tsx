import type { CategoriaId, Producto } from "@/lib/types";

/**
 * Ilustración de respaldo cuando un producto todavía no tiene foto.
 * En cuanto exista `producto.foto`, la tarjeta muestra la imagen real en su lugar.
 */

function Jersey({ color, acento }: { color: string; acento: string }) {
  return (
    <g>
      <path
        d="M60 40 L80 31 Q100 50 120 31 L140 40 L170 63 L152 90 L137 79 L137 169 Q100 177 63 169 L63 79 L48 90 L30 63 Z"
        fill={color}
      />
      <path d="M80 31 Q100 50 120 31 L112 27 Q100 38 88 27 Z" fill={acento} />
      <rect x="63" y="150" width="74" height="7" fill={acento} opacity="0.85" />
      <path
        d="M152 90 L137 79 L133 86 L148 97 Z"
        fill={acento}
        opacity="0.85"
      />
      <path d="M48 90 L63 79 L67 86 L52 97 Z" fill={acento} opacity="0.85" />
      <text
        x="100"
        y="128"
        textAnchor="middle"
        fontSize="52"
        fontWeight="800"
        fill={acento}
        opacity="0.9"
        fontFamily="var(--font-display), sans-serif"
      >
        09
      </text>
    </g>
  );
}

function Pantalon({ color, acento }: { color: string; acento: string }) {
  return (
    <g>
      <path
        d="M62 34 H138 L143 92 L134 178 H108 L100 118 L92 178 H66 L57 92 Z"
        fill={color}
      />
      <rect
        x="60"
        y="28"
        width="80"
        height="15"
        rx="4"
        fill={acento}
        opacity="0.9"
      />
      <rect x="69" y="50" width="5" height="124" fill={acento} opacity="0.5" />
      <rect x="126" y="50" width="5" height="124" fill={acento} opacity="0.5" />
    </g>
  );
}

function Gorra({ color, acento }: { color: string; acento: string }) {
  return (
    <g>
      <path d="M42 124 Q42 50 100 50 Q158 50 158 124 Z" fill={color} />
      <circle cx="100" cy="49" r="6" fill={acento} />
      <path
        d="M100 56 V74"
        stroke={acento}
        strokeWidth="3"
        opacity="0.45"
        fill="none"
      />
      <circle cx="100" cy="97" r="21" fill={acento} />
      <path
        d="M32 124 Q100 112 168 124 Q178 130 172 142 Q100 162 28 142 Q22 130 32 124 Z"
        fill={color}
      />
      <path
        d="M32 124 Q100 112 168 124 L169 130 Q100 118 31 130 Z"
        fill={acento}
        opacity="0.6"
      />
      <text
        x="100"
        y="106"
        textAnchor="middle"
        fontSize="24"
        fontWeight="800"
        fill={color}
        fontFamily="var(--font-display), sans-serif"
      >
        JH
      </text>
    </g>
  );
}

function Pelota({ color, acento }: { color: string; acento: string }) {
  return (
    <g>
      <circle cx="100" cy="104" r="66" fill={acento} />
      <path
        d="M56 56 Q76 104 56 152"
        stroke={color}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M144 56 Q124 104 144 152"
        stroke={color}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} stroke={color} strokeWidth="3" strokeLinecap="round">
          <line x1="62" y1={72 + i * 16} x2="74" y2={66 + i * 16} />
          <line x1="62" y1={72 + i * 16} x2="74" y2={78 + i * 16} />
          <line x1="138" y1={72 + i * 16} x2="126" y2={66 + i * 16} />
          <line x1="138" y1={72 + i * 16} x2="126" y2={78 + i * 16} />
        </g>
      ))}
    </g>
  );
}

const dibujos: Record<CategoriaId, typeof Jersey> = {
  casacas: Jersey,
  pantalones: Pantalon,
  gorras: Gorra,
  accesorios: Pelota,
};

export function ProductoArte({
  producto,
  oscuro = false,
}: {
  producto: Producto;
  /** Sube la intensidad del degradado para las tarjetas sobre fondo negro. */
  oscuro?: boolean;
}) {
  const Dibujo = dibujos[producto.categoria];

  // El degradado va en el contenedor, no en el SVG, para que llene la tarjeta
  // completa aunque la ilustración quede centrada con márgenes.
  const degradado = oscuro
    ? `linear-gradient(140deg, ${producto.color}44 0%, ${producto.color}14 55%, transparent 100%)`
    : `linear-gradient(140deg, ${producto.color}1c 0%, ${producto.color}07 55%, transparent 100%)`;

  return (
    <div
      className="absolute inset-0 grid place-items-center overflow-hidden"
      style={{ background: degradado }}
    >
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        role="img"
        aria-label={`Ilustración de ${producto.nombre}`}
      >
        <Dibujo color={producto.color} acento={producto.colorSecundario} />
      </svg>
    </div>
  );
}
