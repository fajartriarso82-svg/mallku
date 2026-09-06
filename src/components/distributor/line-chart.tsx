"use client";

// Grafik garis sederhana (SVG murni) — tanpa library eksternal

interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  formatValue?: (v: number) => string;
}

export function LineChart({ data, height = 220, formatValue }: LineChartProps) {
  const width = 720;
  const padX = 8;
  const padTop = 16;
  const padBottom = 26;

  if (data.length === 0) return null;

  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;

  const innerH = height - padTop - padBottom;
  const stepX = data.length > 1 ? (width - padX * 2) / (data.length - 1) : 0;

  const pts = data.map((d, i) => ({
    x: padX + i * stepX,
    y: padTop + innerH - ((d.value - min) / range) * innerH,
    ...d,
  }));

  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const area = `${path} L${pts[pts.length - 1].x.toFixed(1)},${(padTop + innerH).toFixed(
    1
  )} L${pts[0].x.toFixed(1)},${(padTop + innerH).toFixed(1)} Z`;

  const labelEvery = Math.ceil(data.length / 8);

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Grafik penjualan">
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#009ee2" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#009ee2" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Garis grid horizontal */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const y = padTop + innerH - t * innerH;
          return (
            <line
              key={t}
              x1={padX}
              x2={width - padX}
              y1={y}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth="1"
              strokeDasharray={t === 0 ? "0" : "4 4"}
            />
          );
        })}
        <path d={area} fill="url(#chartFill)" />
        <path d={path} fill="none" stroke="#009ee2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => (
          <g key={i}>
            {i % labelEvery === 0 && (
              <text x={p.x} y={height - 8} textAnchor="middle" className="fill-slate-400 text-[10px]">
                {p.label}
              </text>
            )}
            <circle cx={p.x} cy={p.y} r="3" fill="#fff" stroke="#009ee2" strokeWidth="2">
              <title>{`${p.label}: ${formatValue ? formatValue(p.value) : p.value.toLocaleString("id-ID")}`}</title>
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
