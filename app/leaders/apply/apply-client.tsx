"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Pencil } from "lucide-react";
import { applyableProgrammes, getLeaderProgramme } from "@/mock/leaders";
import { focuses } from "@/mock/alumni";
import { siteConfig } from "@/lib/site-config";
import { cn, EMAIL_RE, PHONE_RE, formatDate } from "@/lib/utils";
import { shortCode } from "@/lib/hash";

const STEPS = ["Personal details", "Leadership experience", "Essays", "References", "Review & submit"] as const;

const COUNTRIES = ["Nigeria", "Ghana", "Kenya", "South Africa", "Senegal", "Ethiopia", "Uganda", "Rwanda", "Tanzania", "Côte d’Ivoire", "Cameroon", "Sierra Leone", "Liberia", "The Gambia", "Zambia", "Zimbabwe", "Malawi", "Egypt", "Morocco", "Other African country"];

const ESSAYS = [
  { id: "essay1", q: "Tell us about a moment when you led others through a difficult situation. What did you do, and what did you learn?", min: 400, max: 2000 },
  { id: "essay2", q: "What is the most important problem in your community, and what is your plan to address it over the next three years?", min: 400, max: 2000 },
  { id: "essay3", q: "Who has invested in your leadership, and how will you invest in someone else’s?", min: 200, max: 1200 },
] as const;

// Age windows checked against 1 June of the programme year.
const AGE_RULES: Record<string, { min: number; max?: number }> = {
  "leaders-africa-fellowship": { min: 25, max: 40 },
  "civic-scholars": { min: 18, max: 24 },
  "community-leaders-programme": { min: 21 },
};

type Ref = { name: string; email: string; relationship: string; organisation: string };
type Form = {
  programme: string;
  first: string;
  last: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  country: string;
  city: string;
  role: string;
  organisation: string;
  focus: string;
  years: string;
  experience: string;
  link: string;
  essay1: string;
  essay2: string;
  essay3: string;
  ref1: Ref;
  ref2: Ref;
  truthful: boolean;
  privacy: boolean;
};

const emptyRef: Ref = { name: "", email: "", relationship: "", organisation: "" };

function ageOn(dob: string, on: Date) {
  const d = new Date(dob);
  let a = on.getFullYear() - d.getFullYear();
  const m = on.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && on.getDate() < d.getDate())) a--;
  return a;
}

export function ApplyClient() {
  const sp = useSearchParams();
  const qp = sp.get("programme");
  const initialProgramme = applyableProgrammes.some((p) => p.slug === qp) ? (qp as string) : applyableProgrammes[0].slug;

  const [step, setStep] = useState(0);
  const [f, setF] = useState<Form>({
    programme: initialProgramme,
    first: "", last: "", email: "", phone: "", dob: "", gender: "", country: "Nigeria", city: "",
    role: "", organisation: "", focus: "", years: "", experience: "", link: "",
    essay1: "", essay2: "", essay3: "",
    ref1: { ...emptyRef }, ref2: { ...emptyRef },
    truthful: false, privacy: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const programme = getLeaderProgramme(f.programme)!;
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((prev) => ({ ...prev, [k]: v }));
  const setRef = (which: "ref1" | "ref2", k: keyof Ref, v: string) => setF((prev) => ({ ...prev, [which]: { ...prev[which], [k]: v } }));

  const validateStep = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!f.first.trim()) e.first = "First name is required.";
      if (!f.last.trim()) e.last = "Last name is required.";
      if (!EMAIL_RE.test(f.email.trim())) e.email = "Enter a valid email address.";
      if (!PHONE_RE.test(f.phone.trim())) e.phone = "Enter a valid phone number, e.g. +234 803 000 0000.";
      if (!f.dob) e.dob = "Date of birth is required.";
      else {
        const rule = AGE_RULES[f.programme];
        const age = ageOn(f.dob, new Date("2027-06-01"));
        if (Number.isNaN(age)) e.dob = "Enter a valid date.";
        else if (rule && (age < rule.min || (rule.max !== undefined && age > rule.max)))
          e.dob = `${programme.name} is for applicants aged ${programme.ages} on 1 June 2027 — you would be ${age}.`;
      }
      if (!f.country) e.country = "Select your country.";
      if (!f.city.trim()) e.city = "City or town is required.";
    }
    if (s === 1) {
      if (!f.role.trim()) e.role = "Your current role is required.";
      if (!f.organisation.trim()) e.organisation = "Organisation or community is required.";
      if (!f.focus) e.focus = "Choose the area that best describes your work.";
      if (!/^\d{1,2}$/.test(f.years.trim())) e.years = "Enter a whole number of years.";
      else if (f.programme === "leaders-africa-fellowship" && parseInt(f.years, 10) < 5) e.years = "The Fellowship requires at least five years of leadership experience.";
      if (f.experience.trim().length < 150) e.experience = `Please write at least 150 characters (${f.experience.trim().length} so far).`;
      if (f.link && !/^https?:\/\/\S+\.\S+/.test(f.link.trim())) e.link = "Enter a full URL starting with https://, or leave blank.";
    }
    if (s === 2) {
      for (const q of ESSAYS) {
        const len = f[q.id].trim().length;
        if (len < q.min) e[q.id] = `Please write at least ${q.min} characters (${len} so far).`;
      }
    }
    if (s === 3) {
      (["ref1", "ref2"] as const).forEach((r, i) => {
        const ref = f[r];
        if (!ref.name.trim()) e[`${r}.name`] = `Referee ${i + 1}: name is required.`;
        if (!EMAIL_RE.test(ref.email.trim())) e[`${r}.email`] = `Referee ${i + 1}: enter a valid email.`;
        else if (ref.email.trim().toLowerCase() === f.email.trim().toLowerCase()) e[`${r}.email`] = "A referee can’t use your own email address.";
        if (!ref.relationship) e[`${r}.relationship`] = `Referee ${i + 1}: choose a relationship.`;
      });
      if (!e["ref2.email"] && f.ref1.email.trim() && f.ref1.email.trim().toLowerCase() === f.ref2.email.trim().toLowerCase())
        e["ref2.email"] = "Your two referees must be different people.";
    }
    if (s === 4) {
      if (!f.truthful) e.truthful = "Please confirm your application is accurate.";
      if (!f.privacy) e.privacy = "Please agree to how we’ll use your data.";
    }
    return e;
  };

  const goTo = (s: number) => {
    setStep(s);
    setErrors({});
    requestAnimationFrame(() => {
      headingRef.current?.focus();
      headingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const next = () => {
    const e = validateStep(step);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      document.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }
    if (step < STEPS.length - 1) return goTo(step + 1);
    setSending(true);
    const id = `AOF-2027-${shortCode(`${f.email}|${f.programme}|${f.phone}|${f.dob}`, 6)}`;
    setTimeout(() => {
      setSubmitted(id);
      setSending(false);
      requestAnimationFrame(() => headingRef.current?.focus());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  };

  const err = (k: string) => (errors[k] ? <p id={`${k}-err`} className="field-error">{errors[k]}</p> : null);
  const aria = (k: string) => ({
    "data-field": k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  if (submitted) {
    return (
      <section className="section bg-white">
        <div className="container-narrow" role="status">
          <span className="w-14 h-14 border border-[color:var(--ink)] flex items-center justify-center"><Check className="w-6 h-6" aria-hidden="true" /></span>
          <h2 ref={headingRef} tabIndex={-1} className="display-md mt-8 outline-none">Thank you, {f.first.trim()}. Your application is in.</h2>
          <p className="lede mt-6">We’ve sent a confirmation to <strong className="text-[color:var(--ink)]">{f.email.trim()}</strong> and invited your two referees to submit their letters.</p>
          <dl className="mt-10 border-y border-line divide-y divide-[color:var(--line)] text-[15px]">
            {[
              ["Application ID", submitted],
              ["Programme", programme.name],
              ["Submitted", formatDate(new Date().toISOString())],
              ["Referees", `${f.ref1.name.trim()} and ${f.ref2.name.trim()}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-4"><dt className="text-muted">{k}</dt><dd className="font-semibold text-right tabular">{v}</dd></div>
            ))}
          </dl>
          <h3 className="display-sm mt-14">What happens next</h3>
          <ol className="mt-6 border-t border-line">
            {programme.timeline.slice(1, 5).map((t, i) => (
              <li key={t.label} className="grid grid-cols-[40px_140px_1fr] gap-4 py-4 border-b border-line text-[15px]">
                <span className="tabular text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-semibold">{t.date}</span>
                <span>{t.label}{t.detail ? <span className="text-muted"> — {t.detail}</span> : null}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/leaders/alumni" className="btn btn-ink">Meet past fellows</Link>
            <Link href="/events" className="btn btn-outline">Join an info session</Link>
          </div>
          <p className="mt-8 text-[13px] text-muted">Questions? Email {siteConfig.brand.applyEmail} quoting your application ID.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pb-24">
      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Step rail */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="text-[13px] text-muted">Step {step + 1} of {STEPS.length}</p>
            <div className="bar mt-3" aria-hidden="true"><span style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} /></div>
            <ol className="mt-6 hidden lg:block border-t border-line">
              {STEPS.map((s, i) => (
                <li key={s} className="border-b border-line">
                  <button
                    type="button"
                    disabled={i > step}
                    onClick={() => i < step && goTo(i)}
                    aria-current={i === step ? "step" : undefined}
                    className={cn("w-full flex items-center gap-3 py-3.5 text-left text-[14.5px] min-h-[44px] disabled:cursor-default", i === step ? "font-semibold" : i < step ? "text-ink-2 hover:text-[color:var(--accent)]" : "text-muted")}
                  >
                    <span className={cn("w-7 h-7 flex items-center justify-center text-[12px] border tabular", i < step ? "bg-[color:var(--ink)] text-white border-[color:var(--ink)]" : i === step ? "border-[color:var(--ink)]" : "border-line")}>
                      {i < step ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : i + 1}
                    </span>
                    {s}
                    {i < step && <span className="sr-only">(completed)</span>}
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-8 hidden lg:block text-[13.5px] text-ink-2 border-l-2 border-[color:var(--accent)] pl-4">
              Applying for <strong>{programme.name}</strong>{programme.deadline ? <> · closes {formatDate(programme.deadline)}</> : null}.
            </div>
          </div>
        </aside>

        {/* Form */}
        <form noValidate onSubmit={(e) => { e.preventDefault(); next(); }} className="lg:col-span-9 max-w-3xl">
          <h2 ref={headingRef} tabIndex={-1} className="display-sm outline-none scroll-mt-28">
            <span className="text-muted tabular mr-3">{String(step + 1).padStart(2, "0")}</span>{STEPS[step]}
          </h2>

          {step === 0 && (
            <div className="mt-8 space-y-8">
              <fieldset>
                <legend className="label">Programme *</legend>
                <div className="grid sm:grid-cols-3 gap-3 mt-1">
                  {applyableProgrammes.map((p) => (
                    <label key={p.slug} className={cn("relative border p-4 cursor-pointer min-h-[96px] flex flex-col transition-colors", f.programme === p.slug ? "border-[color:var(--ink)] bg-[color:var(--stone)]" : "border-line hover:border-[#9A9A9A]")}>
                      <input type="radio" name="programme" value={p.slug} checked={f.programme === p.slug} onChange={() => set("programme", p.slug)} className="sr-only peer" />
                      <span className="font-semibold text-[15px]">{p.name}</span>
                      <span className="text-[13px] text-muted mt-1">Ages {p.ages} · {p.duration}</span>
                      {f.programme === p.slug && <Check className="absolute top-3 right-3 w-4 h-4" aria-hidden="true" />}
                      <span className="absolute inset-0 pointer-events-none peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[color:var(--accent)] peer-focus-visible:outline-offset-2" aria-hidden="true" />
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="grid sm:grid-cols-2 gap-5">
                <TextField id="first" label="First name *" value={f.first} onChange={(v) => set("first", v)} aria={aria("first")} err={err("first")} autoComplete="given-name" />
                <TextField id="last" label="Last name *" value={f.last} onChange={(v) => set("last", v)} aria={aria("last")} err={err("last")} autoComplete="family-name" />
                <TextField id="email" type="email" label="Email *" value={f.email} onChange={(v) => set("email", v)} aria={aria("email")} err={err("email")} autoComplete="email" />
                <TextField id="phone" type="tel" label="Phone / WhatsApp *" value={f.phone} onChange={(v) => set("phone", v)} aria={aria("phone")} err={err("phone")} autoComplete="tel" placeholder="+234…" />
                <TextField id="dob" type="date" label="Date of birth *" value={f.dob} onChange={(v) => set("dob", v)} aria={aria("dob")} err={err("dob")} autoComplete="bday" />
                <div>
                  <label htmlFor="gender" className="label">Gender (optional)</label>
                  <select id="gender" className="input" value={f.gender} onChange={(e) => set("gender", e.target.value)}>
                    <option value="">Prefer not to say</option>
                    <option>Woman</option>
                    <option>Man</option>
                    <option>Self-describe</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="country" className="label">Country of residence *</label>
                  <select id="country" className="input" value={f.country} onChange={(e) => set("country", e.target.value)} {...aria("country")}>
                    <option value="">Select…</option>
                    {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                  {err("country")}
                </div>
                <TextField id="city" label="City or town *" value={f.city} onChange={(v) => set("city", v)} aria={aria("city")} err={err("city")} autoComplete="address-level2" />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              <TextField id="role" label="Current role or title *" value={f.role} onChange={(v) => set("role", v)} aria={aria("role")} err={err("role")} autoComplete="organization-title" />
              <TextField id="organisation" label="Organisation or community *" value={f.organisation} onChange={(v) => set("organisation", v)} aria={aria("organisation")} err={err("organisation")} autoComplete="organization" />
              <div>
                <label htmlFor="focus" className="label">Main area of work *</label>
                <select id="focus" className="input" value={f.focus} onChange={(e) => set("focus", e.target.value)} {...aria("focus")}>
                  <option value="">Select…</option>
                  {focuses.map((x) => <option key={x}>{x}</option>)}
                </select>
                {err("focus")}
              </div>
              <TextField id="years" label="Years of leadership experience *" inputMode="numeric" value={f.years} onChange={(v) => set("years", v.replace(/[^\d]/g, "").slice(0, 2))} aria={aria("years")} err={err("years")} />
              <div className="sm:col-span-2">
                <CountedTextarea id="experience" label="Describe your most significant leadership roles *" hint="Roles, responsibilities, the size of teams or budgets, and results. Minimum 150 characters." value={f.experience} onChange={(v) => set("experience", v)} max={1200} min={150} aria={aria("experience")} err={err("experience")} rows={6} />
              </div>
              <div className="sm:col-span-2">
                <TextField id="link" type="url" label="LinkedIn or website (optional)" value={f.link} onChange={(v) => set("link", v)} aria={aria("link")} err={err("link")} placeholder="https://" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mt-8 space-y-10">
              <p className="text-ink-2 max-w-2xl">Write in your own voice — we read every word. We recommend drafting in a document first. There are no right answers; we are looking for honesty, clarity and evidence.</p>
              {ESSAYS.map((q, i) => (
                <CountedTextarea key={q.id} id={q.id} label={`${i + 1}. ${q.q} *`} value={f[q.id]} onChange={(v) => set(q.id, v)} max={q.max} min={q.min} aria={aria(q.id)} err={err(q.id)} rows={9} hint={`${q.min}–${q.max} characters.`} />
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="mt-8 space-y-10">
              <p className="text-ink-2 max-w-2xl">Choose two people who have seen you lead — ideally one who supervised you and one who you served. We’ll email them a short form after you submit. Family members are not eligible.</p>
              {(["ref1", "ref2"] as const).map((r, i) => (
                <fieldset key={r} className="border-t border-line pt-6">
                  <legend className="font-display text-xl font-medium tracking-[-0.02em] pr-4">Referee {i + 1}</legend>
                  <div className="mt-4 grid sm:grid-cols-2 gap-5">
                    <TextField id={`${r}.name`} label="Full name *" value={f[r].name} onChange={(v) => setRef(r, "name", v)} aria={aria(`${r}.name`)} err={err(`${r}.name`)} />
                    <TextField id={`${r}.email`} type="email" label="Email *" value={f[r].email} onChange={(v) => setRef(r, "email", v)} aria={aria(`${r}.email`)} err={err(`${r}.email`)} />
                    <div>
                      <label htmlFor={`${r}.relationship`} className="label">Relationship *</label>
                      <select id={`${r}.relationship`} className="input" value={f[r].relationship} onChange={(e) => setRef(r, "relationship", e.target.value)} {...aria(`${r}.relationship`)}>
                        <option value="">Select…</option>
                        <option>Current or former supervisor</option>
                        <option>Colleague or peer</option>
                        <option>Community member I serve</option>
                        <option>Mentor or teacher</option>
                        <option>Board member or funder</option>
                      </select>
                      {err(`${r}.relationship`)}
                    </div>
                    <TextField id={`${r}.organisation`} label="Organisation (optional)" value={f[r].organisation} onChange={(v) => setRef(r, "organisation", v)} aria={aria(`${r}.organisation`)} err={null} />
                  </div>
                </fieldset>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="mt-8 space-y-8">
              <ReviewBlock title="Personal details" onEdit={() => goTo(0)} rows={[
                ["Programme", programme.name],
                ["Name", `${f.first} ${f.last}`],
                ["Email", f.email],
                ["Phone", f.phone],
                ["Date of birth", f.dob ? formatDate(f.dob) : "—"],
                ["Location", `${f.city}, ${f.country}`],
              ]} />
              <ReviewBlock title="Leadership experience" onEdit={() => goTo(1)} rows={[
                ["Role", `${f.role}, ${f.organisation}`],
                ["Area", f.focus],
                ["Experience", `${f.years} years`],
                ["Summary", f.experience],
                ...(f.link ? [["Link", f.link] as [string, string]] : []),
              ]} />
              <ReviewBlock title="Essays" onEdit={() => goTo(2)} rows={ESSAYS.map((q, i) => [`Essay ${i + 1}`, `${f[q.id].trim().length} characters — “${f[q.id].trim().slice(0, 120)}${f[q.id].trim().length > 120 ? "…" : ""}”`])} />
              <ReviewBlock title="References" onEdit={() => goTo(3)} rows={[
                ["Referee 1", `${f.ref1.name} · ${f.ref1.relationship} · ${f.ref1.email}`],
                ["Referee 2", `${f.ref2.name} · ${f.ref2.relationship} · ${f.ref2.email}`],
              ]} />
              <div className="space-y-2 border-t border-line pt-6">
                <label className="flex items-start gap-3 text-[15px] cursor-pointer min-h-[44px]">
                  <input type="checkbox" className="check" checked={f.truthful} onChange={(e) => set("truthful", e.target.checked)} {...aria("truthful")} />
                  <span>I confirm that everything in this application is true and my own work.</span>
                </label>
                {err("truthful")}
                <label className="flex items-start gap-3 text-[15px] cursor-pointer min-h-[44px]">
                  <input type="checkbox" className="check" checked={f.privacy} onChange={(e) => set("privacy", e.target.checked)} {...aria("privacy")} />
                  <span>I agree that the Foundation may store and process my data for selection, in line with the Nigeria Data Protection Act 2023, and contact my referees.</span>
                </label>
                {err("privacy")}
              </div>
            </div>
          )}

          <div className="mt-12 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
            {step > 0 ? (
              <button type="button" onClick={() => goTo(step - 1)} className="btn btn-outline"><ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back</button>
            ) : <span />}
            <div className="flex items-center gap-4">
              {Object.keys(errors).length > 0 && <p role="alert" className="text-[13.5px] text-[color:var(--danger)]">Please fix {Object.keys(errors).length} {Object.keys(errors).length === 1 ? "field" : "fields"}.</p>}
              <button type="submit" className="btn btn-ink btn-lg" disabled={sending}>
                {step === STEPS.length - 1 ? (sending ? "Submitting…" : "Submit application") : <>Continue <ArrowRight className="w-4 h-4" aria-hidden="true" /></>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

function TextField({ id, label, value, onChange, type = "text", aria, err, autoComplete, placeholder, inputMode }: {
  id: string; label: string; value: string; onChange: (v: string) => void; type?: string; aria: Record<string, unknown>; err: React.ReactNode; autoComplete?: string; placeholder?: string; inputMode?: "numeric" | "text";
}) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <input id={id} type={type} className="input" value={value} onChange={(e) => onChange(e.target.value)} autoComplete={autoComplete} placeholder={placeholder} inputMode={inputMode} {...aria} />
      {err}
    </div>
  );
}

function CountedTextarea({ id, label, hint, value, onChange, max, min, aria, err, rows = 6 }: {
  id: string; label: string; hint?: string; value: string; onChange: (v: string) => void; max: number; min: number; aria: Record<string, unknown>; err: React.ReactNode; rows?: number;
}) {
  const len = value.trim().length;
  const describedBy = [aria["aria-describedby"], `${id}-count`, hint ? `${id}-hint` : null].filter(Boolean).join(" ");
  const near = value.length >= max * 0.9;
  return (
    <div>
      <label htmlFor={id} className="label !text-[15px] leading-snug">{label}</label>
      {hint && <p id={`${id}-hint`} className="help !mt-0 mb-2">{hint}</p>}
      <textarea id={id} rows={rows} maxLength={max} className="input" value={value} onChange={(e) => onChange(e.target.value)} {...aria} aria-describedby={describedBy} />
      <div className="mt-2 flex items-center justify-between gap-4 text-[12.5px]">
        <div className="flex-1">{err}</div>
        <p id={`${id}-count`} className={cn("tabular shrink-0", near ? "text-[color:var(--danger)] font-semibold" : len >= min ? "text-[color:var(--success)]" : "text-muted")} aria-live={near ? "polite" : "off"}>
          {value.length.toLocaleString("en-NG")} / {max.toLocaleString("en-NG")} characters{len < min ? ` · ${min - len} more needed` : ""}
        </p>
      </div>
    </div>
  );
}

function ReviewBlock({ title, rows, onEdit }: { title: string; rows: (string[] | [string, string])[]; onEdit: () => void }) {
  return (
    <div className="border border-line">
      <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-line bg-[color:var(--stone)]">
        <h3 className="font-semibold">{title}</h3>
        <button type="button" onClick={onEdit} className="inline-flex items-center gap-1.5 text-[14px] font-semibold min-h-[44px] hover:text-[color:var(--accent)]">
          <Pencil className="w-3.5 h-3.5" aria-hidden="true" /> Edit <span className="sr-only">{title}</span>
        </button>
      </div>
      <dl className="divide-y divide-[color:var(--line)] text-[14.5px]">
        {rows.map(([k, v]) => (
          <div key={k} className="grid sm:grid-cols-[160px_1fr] gap-1 sm:gap-6 px-5 py-3">
            <dt className="text-muted">{k}</dt>
            <dd className="break-words whitespace-pre-line">{v || "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
