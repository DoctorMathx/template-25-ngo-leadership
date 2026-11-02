import type { FinanceSlice } from "@/lib/types";

/** Pure-SVG donut chart with a legend. */
export function Donut({ data, label, centre, sub }: { data: FinanceSlice[]; label: string; centre: string; sub: string }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  const total = data.reduce((s, d) => s + d.value, 0);
  const segs = data.map((d, i) => {
    const len = (d.value / total) * c;
    const offset = data.slice(0, i).reduce((s, x) => s + (x.value / total) * c, 0);
    return { d, len, offset };
  });
  return (
    <figure className="grid sm:grid-cols-[220px_1fr] gap-8 items-center">
      <div className="relative w-full max-w-[220px] aspect-square mx-auto">
        <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90" role="img" aria-label={`${label}: ${data.map((d) => `${d.label} ${d.value}%`).join(", ")}`}>
          <circle cx="90" cy="90" r={r} fill="none" stroke="var(--line)" strokeWidth="18" />
          {segs.map(({ d, len, offset }) => (
            <circle key={d.label} cx="90" cy="90" r={r} fill="none" stroke={d.shade} strokeWidth="18" strokeDasharray={`${len - 1.5} ${c - len + 1.5}`} strokeDashoffset={-offset} />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-display text-2xl font-medium tracking-[-0.03em]">{centre}</span>
          <span className="text-[12px] text-muted mt-1">{sub}</span>
        </div>
      </div>
      <figcaption className="min-w-0">
        <div className="eyebrow mb-4">{label}</div>
        <ul className="space-y-3">
          {data.map((d) => (
            <li key={d.label} className="flex items-start gap-3 text-[14.5px]">
              <span className="w-3 h-3 mt-1.5 shrink-0" style={{ background: d.shade, outline: d.shade === "#C8C8C8" ? "1px solid #9A9A9A" : undefined }} aria-hidden="true" />
              <span className="flex-1">
                <span className="flex justify-between gap-4"><span>{d.label}</span><span className="font-semibold tabular">{d.value}%</span></span>
                {d.note && <span className="block text-[12.5px] text-muted mt-0.5">{d.note}</span>}
              </span>
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
