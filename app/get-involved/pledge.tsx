"use client";

import { useId, useState } from "react";
import { Check, Share2 } from "lucide-react";
import { pledge } from "@/mock/pledge";
import { NIGERIAN_STATES } from "@/lib/states";
import { cn, EMAIL_RE, formatNumber, percent } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

type Recent = { name: string; place: string; commitment: string; when: string };

export function Pledge() {
  const uid = useId();
  const [count, setCount] = useState(pledge.base);
  const [recent, setRecent] = useState<Recent[]>(pledge.recent);
  const [form, setForm] = useState({ name: "", email: "", state: "", commitments: [] as string[], publicName: true });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<{ number: number } | null>(null);
  const [shared, setShared] = useState(false);
  const pct = percent(count, pledge.goal);

  const toggle = (id: string) =>
    setForm((f) => ({ ...f, commitments: f.commitments.includes(id) ? f.commitments.filter((c) => c !== id) : [...f.commitments, id] }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!form.name.trim()) er.name = "Your first name is required.";
    if (!EMAIL_RE.test(form.email.trim())) er.email = "Enter a valid email address.";
    if (!form.state) er.state = "Choose where you’ll serve.";
    if (!form.commitments.length) er.commitments = "Choose at least one commitment.";
    setErrors(er);
    if (Object.keys(er).length) {
      document.getElementById(`${uid}-${Object.keys(er)[0]}`)?.focus();
      return;
    }
    const n = count + 1;
    setCount(n);
    const first = pledge.commitments.find((c) => c.id === form.commitments[0])!.label;
    setRecent((r) => [{ name: form.publicName ? form.name.trim().split(" ")[0] : "Someone", place: form.state.replace(" (Abuja)", ""), commitment: first.split(" — ")[0].replace(" this year", "").replace(" in my community", ""), when: "just now" }, ...r].slice(0, 6));
    setDone({ number: n });
  };

  const share = async () => {
    const text = `I’ve committed to serve in my community with ${siteConfig.brand.name}. Join me:`;
    const url = `https://${siteConfig.brand.domain}/get-involved#pledge`;
    try {
      if (navigator.share) await navigator.share({ text, url });
      else await navigator.clipboard.writeText(`${text} ${url}`);
    } catch {
      /* cancelled */
    }
    setShared(true);
  };

  return (
    <div className="grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5">
        <div aria-live="polite">
          <p className="font-display text-[clamp(3.6rem,8vw,7rem)] font-medium tracking-[-0.06em] leading-none tabular text-white">{formatNumber(count)}</p>
          <p className="mt-3 text-on-dark-muted">people have committed to serve · goal {formatNumber(pledge.goal)} by {pledge.goalBy}</p>
        </div>
        <div className="mt-6 bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={`Pledges: ${pct}% of goal`}><span style={{ width: `${pct}%` }} /></div>
        <h3 className="mt-12 eyebrow">Latest pledges</h3>
        <ul className="mt-4 border-t border-dark">
          {recent.map((r, i) => (
            <li key={`${r.name}-${r.when}-${i}`} className={cn("flex items-center justify-between gap-4 py-3 border-b border-dark text-[14px]", i === 0 && r.when === "just now" && "rise")}>
              <span className="text-on-dark"><span className="font-semibold text-white">{r.name}</span> <span className="text-on-dark-muted">· {r.place}</span><br /><span className="text-on-dark-muted">{r.commitment}</span></span>
              <span className="text-[12.5px] text-on-dark-muted shrink-0">{r.when}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-7 lg:border-l border-dark lg:pl-12">
        {done ? (
          <div role="status" className="rise">
            <div className="border border-white p-8 md:p-10">
              <p className="eyebrow">Pledge No. {formatNumber(done.number)}</p>
              <p className="mt-6 display-sm text-white">I, {form.name.trim()}, commit to serve my community in {form.state}.</p>
              <ul className="mt-6 space-y-2 text-on-dark">
                {form.commitments.map((id) => (
                  <li key={id} className="flex gap-3"><Check className="w-4 h-4 mt-1 shrink-0" aria-hidden="true" />{pledge.commitments.find((c) => c.id === id)!.label}</li>
                ))}
              </ul>
              <p className="mt-8 text-[13px] text-on-dark-muted">{siteConfig.brand.name} · {new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
            <p className="mt-6 text-on-dark-muted">Thank you. We’ve emailed you a local service guide for {form.state} and invitations to upcoming days of service.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={share} className="btn btn-white"><Share2 className="w-4 h-4" aria-hidden="true" /> {shared ? "Thanks for sharing" : "Share your pledge"}</button>
              <a href="#days-of-service" className="btn btn-outline-light">Find a day of service</a>
            </div>
          </div>
        ) : (
          <form noValidate onSubmit={submit} className="space-y-6">
            <fieldset>
              <legend className="label !text-[15px]">I commit to… *</legend>
              <div className="mt-2 space-y-1" id={`${uid}-commitments`} tabIndex={-1}>
                {pledge.commitments.map((c) => (
                  <label key={c.id} className="flex items-start gap-3 py-2.5 border-b border-dark cursor-pointer min-h-[44px] text-[15.5px] text-white">
                    <input type="checkbox" className="check !accent-white" checked={form.commitments.includes(c.id)} onChange={() => toggle(c.id)} />
                    {c.label}
                  </label>
                ))}
              </div>
              {errors.commitments && <p className="field-error">{errors.commitments}</p>}
            </fieldset>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor={`${uid}-name`} className="label">First name *</label>
                <input id={`${uid}-name`} className="input" autoComplete="given-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? `${uid}-name-err` : undefined} />
                {errors.name && <p id={`${uid}-name-err`} className="field-error">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor={`${uid}-email`} className="label">Email *</label>
                <input id={`${uid}-email`} type="email" className="input" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? `${uid}-email-err` : undefined} />
                {errors.email && <p id={`${uid}-email-err`} className="field-error">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor={`${uid}-state`} className="label">Where *</label>
                <select id={`${uid}-state`} className="input [&>option]:text-black" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} aria-invalid={errors.state ? true : undefined} aria-describedby={errors.state ? `${uid}-state-err` : undefined}>
                  <option value="">State…</option>
                  {NIGERIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                  <option>Diaspora</option>
                </select>
                {errors.state && <p id={`${uid}-state-err`} className="field-error">{errors.state}</p>}
              </div>
            </div>
            <label className="flex items-start gap-3 text-[14.5px] text-on-dark cursor-pointer min-h-[44px]">
              <input type="checkbox" className="check !accent-white" checked={form.publicName} onChange={(e) => setForm({ ...form, publicName: e.target.checked })} />
              Show my first name and state on the public pledge wall
            </label>
            <button type="submit" className="btn btn-white btn-lg">Commit to serve</button>
          </form>
        )}
      </div>
    </div>
  );
}
