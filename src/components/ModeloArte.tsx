import type { ModeloUniforme } from "@/lib/types";

const CUERPO =
  "M60 40 L80 31 Q100 50 120 31 L140 40 L170 63 L152 90 L137 79 L137 169 Q100 177 63 169 L63 79 L48 90 L30 63 Z";

/** Vista previa dibujada, para los modelos que todavía no tienen foto. */
export function ModeloArte({ modelo }: { modelo: ModeloUniforme }) {
  const [principal, secundario, detalle] = modelo.colores ?? ["#1e293b", "#94a3b8", "#f8fafc"];
  const idRecorte = `recorte-${modelo.slug}`;
  const idDegradado = `degradado-${modelo.slug}`;

  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" role="presentation">
      <defs>
        <clipPath id={idRecorte}>
          <path d={CUERPO} />
        </clipPath>
        <linearGradient id={idDegradado} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={principal} />
          <stop offset="100%" stopColor={secundario} />
        </linearGradient>
      </defs>

      <path d={CUERPO} fill={modelo.patron === "degradado" ? `url(#${idDegradado})` : principal} />

      <g clipPath={`url(#${idRecorte})`}>
        {modelo.patron === "rayas" &&
          [0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={40 + i * 18} y="20" width="5" height="170" fill={secundario} />
          ))}
        {modelo.patron === "bloques" && (
          <rect x="0" y="104" width="200" height="96" fill={secundario} />
        )}
      </g>

      {/* Cuello y puños siempre en el color de detalle */}
      <path d="M80 31 Q100 50 120 31 L112 27 Q100 38 88 27 Z" fill={detalle} />
      <path d="M152 90 L137 79 L133 86 L148 97 Z" fill={detalle} />
      <path d="M48 90 L63 79 L67 86 L52 97 Z" fill={detalle} />

      <text
        x="100"
        y="128"
        textAnchor="middle"
        fontSize="48"
        fontWeight="800"
        fill={detalle}
        fontFamily="var(--font-display), sans-serif"
      >
        09
      </text>
    </svg>
  );
}
