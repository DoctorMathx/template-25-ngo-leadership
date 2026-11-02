"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { fellows, cohorts, countries, focuses } from "@/mock/alumni";
import { getLeaderProgramme, leaderProgrammes } from "@/mock/leaders";
import { Portrait } from "@/components/ui/portrait";
import { Modal } from "@/components/ui/modal";
import type { Fellow } from "@/lib/types";

export function AlumniClient() {
  const sp = useSearchParams();
  const [cohort, setCohort] = useState("all");
  const [country, setCountry] = useState("all");
  const [focus, setFocus] = useState("all");
  const [programme, setProgramme] = useState("all");
  const [q, setQ] = useState("");
  const [activeId, setActiveId] = useState<string | null>(() => {
    const id = sp.get("fellow");
    return id && fellows.some((f) => f.id === id) ? id : null;
  });

  const list = useMemo(
    () =>
      fellows.filter(
        (f) =>
          (cohort === "all" || String(f.cohort) === cohort) &&
          (country === "all" || f.country === country) &&
          (focus === "all" || f.focus === focus) &&
          (programme === "all" || f.programme === programme) &&
          (!q.trim() || `${f.name} ${f.role} ${f.city}`.toLowerCase().includes(q.trim().toLowerCase()))
      ),
    [cohort, country, focus, programme, q]
  );
  const active = fellows.find((f) => f.id === activeId) ?? null;
  const filtered = cohort !== "all" || country !== "all" || focus !== "all" || programme !== "all" || q.trim() !== "";

  return (
    <section className="bg-white pb-24">
      <div className="container-x">
        <div className="sticky top-[76px] z-20 bg-white/95 backdrop-blur-sm border-y border-line py-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-end">
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="alumni-q" className="label">Search</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
                <input id="alumni-q" type="search" className="input !pl-10" placeholder="Name, role, city" value={q} onChange={(e) => setQ(e.target.value)} />
              </div>
            </div>
            <Select id="f-cohort" label="Cohort year" value={cohort} onChange={setCohort} options={cohorts.map((c) => ({ value: String(c), label: String(c) }))} />
            <Select id="f-country" label="Country" value={country} onChange={setCountry} options={countries.map((c) => ({ value: c, label: c }))} />
            <Select id="f-focus" label="Focus" value={focus} onChange={setFocus} options={focuses.map((c) => ({ value: c, label: c }))} />
            <Select id="f-prog" label="Programme" value={programme} onChange={setProgramme} options={leaderProgrammes.filter((p) => fellows.some((f) => f.programme === p.slug)).map((p) => ({ value: p.slug, label: p.short }))} />
          </div>
          <div className="mt-3 flex items-center justify-between gap-4 text-[13.5px]">
            <p aria-live="polite" className="text-muted"><span className="font-semibold text-[color:var(--ink)] tabular">{list.length}</span> of {fellows.length} leaders</p>
            {filtered && (
              <button type="button" className="font-semibold underline underline-offset-4 min-h-[44px] hover:text-[color:var(--accent)]" onClick={() => { setCohort("all"); setCountry("all"); setFocus("all"); setProgramme("all"); setQ(""); }}>
                Clear filters
              </button>
            )}
          </div>
        </div>

        {list.length === 0 ? (
          <div className="py-24 text-center">
            <p className="display-sm">No leaders match those filters.</p>
            <p className="text-muted mt-3">Try a different country or cohort year.</p>
          </div>
        ) : (
          <ul className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
            {list.map((f) => (
              <li key={f.id}>
                <button type="button" onClick={() => setActiveId(f.id)} aria-haspopup="dialog" className="group block w-full text-left">
                  <Portrait as="span" name={f.name} initials={f.initials} image={f.image} sizes="(min-width:1024px) 300px, 50vw" />
                  <span className="mt-4 flex items-center justify-between gap-3">
                    <span className="font-display text-lg md:text-xl font-medium tracking-[-0.02em] group-hover:text-[color:var(--accent)]">{f.name}</span>
                    <span className="text-[12px] tabular text-muted shrink-0">’{String(f.cohort).slice(2)}</span>
                  </span>
                  <span className="block text-[13.5px] text-ink-2 mt-1 line-clamp-2">{f.role}</span>
                  <span className="mt-2 flex flex-wrap gap-x-3 text-[12.5px] text-muted">
                    <span className="inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" aria-hidden="true" />{f.country}</span>
                    <span>{f.focus}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal open={!!active} onClose={() => setActiveId(null)} title={active?.name ?? "Leader profile"} size="lg">
        {active && <Profile f={active} />}
      </Modal>
    </section>
  );
}

function Profile({ f }: { f: Fellow }) {
  const p = getLeaderProgramme(f.programme);
  return (
    <div className="grid sm:grid-cols-[220px_1fr] gap-7">
      <Portrait name={f.name} initials={f.initials} image={f.image} sizes="240px" />
      <div>
        <p className="text-[13px] uppercase tracking-[.14em] font-semibold text-muted">{p?.name} · Cohort {f.cohort}</p>
        <p className="mt-2 font-display text-3xl font-medium tracking-[-0.03em]">{f.name}</p>
        <p className="mt-1 text-ink-2">{f.role}</p>
        <p className="mt-1 text-[14px] text-muted">{f.city}, {f.country} · {f.focus}</p>
        <p className="mt-5 text-[15.5px] leading-relaxed">{f.bio}</p>
        <div className="mt-5 border-l-2 border-[color:var(--ink)] pl-4">
          <p className="text-[12px] uppercase tracking-[.14em] font-semibold text-muted">Commitment project</p>
          <p className="mt-1 text-[15px]">{f.project}</p>
        </div>
        <blockquote className="mt-6 font-display text-xl tracking-[-0.02em] leading-snug">“{f.quote}”</blockquote>
        {p && (
          <Link href={`/leaders/${p.slug}`} className="link-arrow mt-5">About {p.short} <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
        )}
      </div>
    </div>
  );
}

function Select({ id, label, value, onChange, options }: { id: string; label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <select id={id} className="input" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="all">All</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
