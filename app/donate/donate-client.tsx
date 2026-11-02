"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Building2, CreditCard, Hash, Landmark, Lock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn, EMAIL_RE, formatNaira, parsePositiveInt, PHONE_RE } from "@/lib/utils";
import { shortCode } from "@/lib/hash";
import { campaignToDesignation, designationGroups, designationLabel, isValidDesignation } from "@/lib/designations";
import { CopyButton } from "@/components/ui/copy-button";

type Frequency = "one-time" | "monthly" | "annual";
type Method = "card" | "bank" | "ussd";

const D = siteConfig.donation;
const FREQ_SUFFIX: Record<Frequency, string> = { "one-time": "", monthly: "/month", annual: "/year" };

export function DonateClient() {
  const sp = useSearchParams();
  const router = useRouter();

  // ---- Prefill from query params: ?amount=&campaign=&frequency=&designation=&programme= ----
  const qAmount = parsePositiveInt(sp.get("amount"));
  const qFreq = sp.get("frequency");
  const qDesignation = sp.get("designation");
  const qProgramme = sp.get("programme");
  const initialDesignation = isValidDesignation(qDesignation)
    ? qDesignation
    : campaignToDesignation(sp.get("campaign")) ??
      (qProgramme && isValidDesignation(`programme:${qProgramme}`) ? `programme:${qProgramme}` : "general");

  const presetAmounts = D.presets.map((p) => p.amount) as number[];
  const [frequency, setFrequency] = useState<Frequency>(qFreq === "monthly" || qFreq === "annual" || qFreq === "one-time" ? qFreq : "one-time");
  const [amount, setAmount] = useState<number | null>(qAmount ?? 40000);
  const [custom, setCustom] = useState(qAmount && !presetAmounts.includes(qAmount) ? String(qAmount) : "");
  const [designation, setDesignation] = useState(initialDesignation);
  const [coverFees, setCoverFees] = useState(true);
  const [tribute, setTribute] = useState(false);
  const [tributeType, setTributeType] = useState<"honour" | "memory">("honour");
  const [tributeName, setTributeName] = useState("");
  const [tributeNotify, setTributeNotify] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [donor, setDonor] = useState({ first: "", last: "", email: "", phone: "", updates: true });
  const [method, setMethod] = useState<Method>("card");
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvc: "" });
  const [bankConfirmed, setBankConfirmed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const isCapital = designation === "capital";
  const fee = amount && coverFees ? Math.ceil(amount * D.feeRate) : 0;
  const total = (amount ?? 0) + fee;
  const placeholderRef = "AOF-XXXXXX";
  const reference = donor.email && amount ? `AOF-${shortCode(`${donor.email}|${amount}|${frequency}`)}` : placeholderRef;
  const accountNumber = isCapital ? D.bank.capitalAccountNumber : D.bank.accountNumber;
  const accountName = isCapital ? D.bank.capitalAccountName : D.bank.accountName;
  const ussdCode = D.ussd.code.replace("*000*", `*${total || "AMOUNT"}*`).replace(D.bank.accountNumber, accountNumber);
  const presetImpact = D.presets.find((p) => p.amount === amount)?.impact;

  const onCustom = (v: string) => {
    setCustom(v);
    const cleaned = v.replace(/[,\s₦]/g, "");
    if (!cleaned) return setAmount(null);
    setAmount(/^\d+$/.test(cleaned) && parseInt(cleaned, 10) > 0 ? parseInt(cleaned, 10) : null);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!amount) e.amount = custom ? "Amount must be a positive whole number of naira." : "Choose or enter an amount.";
    else if (amount < D.minAmount) e.amount = `The minimum gift is ${formatNaira(D.minAmount)}.`;
    else if (amount > 500_000_000) e.amount = "For gifts above ₦500m please contact our partnerships team.";
    if (!donor.first.trim()) e.first = "First name is required.";
    if (!donor.last.trim()) e.last = "Last name is required.";
    if (!EMAIL_RE.test(donor.email.trim())) e.email = "Enter a valid email for your receipt.";
    if (donor.phone && !PHONE_RE.test(donor.phone)) e.phone = "Enter a valid phone number.";
    if (tribute && !tributeName.trim()) e.tributeName = "Who is this gift dedicated to?";
    if (tributeNotify && !EMAIL_RE.test(tributeNotify)) e.tributeNotify = "Enter a valid email or leave blank.";
    if (method === "card") {
      const digits = card.number.replace(/\s/g, "");
      if (!card.name.trim()) e.cardName = "Name on card is required.";
      if (!/^\d{16,19}$/.test(digits)) e.cardNumber = "Enter a valid 16–19 digit card number.";
      const m = card.expiry.match(/^(\d{2})\s*\/\s*(\d{2})$/);
      if (!m || +m[1] < 1 || +m[1] > 12) e.cardExpiry = "Use MM/YY.";
      else if (new Date(2000 + +m[2], +m[1], 0) < new Date()) e.cardExpiry = "This card has expired.";
      if (!/^\d{3,4}$/.test(card.cvc)) e.cardCvc = "3 or 4 digits.";
    }
    if (method === "bank" && !bankConfirmed) e.bank = "Please confirm you’ll use the reference above.";
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.querySelector<HTMLElement>(`[data-field="${Object.keys(e)[0]}"]`)?.focus();
      return;
    }
    setSubmitting(true);
    const ref = `AOF-${shortCode(`${donor.email}|${total}|${Date.now()}`, 8)}`;
    const p = new URLSearchParams({
      ref,
      amount: String(total),
      gift: String(amount),
      fee: String(fee),
      frequency,
      designation,
      method,
      name: anonymous ? "Anonymous" : donor.first.trim(),
    });
    if (tribute) {
      p.set("tribute", tributeType);
      p.set("tributeName", tributeName.trim());
    }
    setTimeout(() => router.push(`/donate/thank-you?${p.toString()}`), 600);
  };

  const err = (k: string) => (errors[k] ? <p id={`${k}-err`} className="field-error">{errors[k]}</p> : null);
  const aria = (k: string) => ({
    "data-field": k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  return (
    <section className="bg-stone py-10 md:py-16">
      <form noValidate onSubmit={submit} className="container-x grid lg:grid-cols-[1.55fr_1fr] gap-8 items-start">
        <div className="min-w-0 space-y-6">
          {isCapital && (
            <div className="bg-ink on-dark p-6 flex gap-4 items-start">
              <Landmark className="w-6 h-6 shrink-0 mt-0.5" strokeWidth={1.25} aria-hidden="true" />
              <div className="text-[14.5px]">
                <p className="font-display text-lg text-white">You’re giving to the Okafor Civic Centre capital campaign.</p>
                <p className="text-on-dark-muted mt-1">Gifts of {formatNaira(1_000_000)} or more are carved on the Founding Supporters wall. Want a named space? <Link href="/civic-centre#naming" className="link">See naming opportunities</Link>.</p>
              </div>
            </div>
          )}

          {/* Amount */}
          <fieldset className="card p-5 sm:p-6 md:p-9">
            <legend className="sr-only">Gift amount and frequency</legend>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="display-sm">Your gift</h2>
              <div className="inline-flex border border-[color:var(--ink)]" role="radiogroup" aria-label="Frequency">
                {D.frequencies.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    role="radio"
                    aria-checked={frequency === f.id}
                    onClick={() => setFrequency(f.id as Frequency)}
                    className={cn("px-3 sm:px-4 min-h-[44px] text-[14px] font-semibold transition-colors", frequency === f.id ? "bg-[color:var(--ink)] text-white" : "hover:bg-[color:var(--stone)]")}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            {frequency !== "one-time" && (
              <p className="mt-4 text-[14px] text-ink-2">{frequency === "monthly" ? "Monthly" : "Annual"} gifts let us commit to young people years ahead. Change or cancel any time by email or WhatsApp.</p>
            )}
            <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 border-t border-l border-line" role="group" aria-label="Preset amounts">
              {D.presets.map((p) => {
                const active = amount === p.amount && !custom;
                return (
                  <button
                    key={p.amount}
                    type="button"
                    aria-pressed={active}
                    onClick={() => { setAmount(p.amount); setCustom(""); }}
                    className={cn("min-w-0 border-r border-b border-line px-3 sm:px-4 py-5 text-left min-h-[72px] transition-colors", active ? "bg-[color:var(--ink)] text-white" : "bg-white hover:bg-[color:var(--stone)]")}
                  >
                    <span className="font-display text-[1.15rem] sm:text-2xl font-medium tracking-[-0.03em] tabular">{formatNaira(p.amount)}</span>
                    <span className={cn("text-[12px] ml-1", active ? "text-[#CFCFCF]" : "text-muted")}>{FREQ_SUFFIX[frequency]}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-6">
              <label htmlFor="custom-amount" className="label">Other amount (₦)</label>
              <div className="relative max-w-xs">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-muted" aria-hidden="true">₦</span>
                <input id="custom-amount" inputMode="numeric" className="input !pl-9" placeholder="e.g. 75000" value={custom} onChange={(e) => onCustom(e.target.value)} {...aria("amount")} />
              </div>
              {err("amount")}
            </div>
            <p className="mt-6 border-l-2 border-[color:var(--ink)] pl-4 text-[15px] text-ink-2" aria-live="polite">
              {amount ? (
                presetImpact ? <><strong className="text-[color:var(--ink)]">{formatNaira(amount)}</strong> {presetImpact}.</> : <><strong className="text-[color:var(--ink)]">{formatNaira(amount)}</strong> helps a young African leader take their next step — in a classroom, a town hall or a fellowship convening.</>
              ) : "Choose an amount to see what it makes possible."}
            </p>
          </fieldset>

          {/* Designation */}
          <fieldset className="card p-5 sm:p-6 md:p-9 space-y-5">
            <legend className="sr-only">Designation and options</legend>
            <h2 className="display-sm">Where should it go?</h2>
            <div>
              <label htmlFor="designation" className="label">Designation</label>
              <select id="designation" className="input" value={designation} onChange={(e) => setDesignation(e.target.value)}>
                {designationGroups.map((g) => (
                  <optgroup key={g.group} label={g.group}>
                    {g.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </optgroup>
                ))}
              </select>
              <p className="help">Restricted gifts are spent only on the purpose you choose.</p>
            </div>
            <Check2 id="fees" checked={coverFees} onChange={setCoverFees} label={<>Cover the {(D.feeRate * 100).toFixed(1)}% processing fee{amount ? <> (+{formatNaira(Math.ceil(amount * D.feeRate))})</> : null} so 100% of my gift goes to the work</>} />
            <Check2 id="anon" checked={anonymous} onChange={setAnonymous} label="Give anonymously — don’t show my name on donor lists or the supporters wall" />
            <Check2 id="tribute" checked={tribute} onChange={setTribute} label="Dedicate this gift in honour or memory of someone" />
            {tribute && (
              <div className="grid sm:grid-cols-2 gap-4 sm:pl-8">
                <div className="sm:col-span-2 inline-flex border border-[color:var(--ink)] w-fit" role="radiogroup" aria-label="Tribute type">
                  {(["honour", "memory"] as const).map((t) => (
                    <button key={t} type="button" role="radio" aria-checked={tributeType === t} onClick={() => setTributeType(t)} className={cn("px-4 min-h-[44px] text-[14px] font-semibold", tributeType === t ? "bg-[color:var(--ink)] text-white" : "")}>
                      In {t} of
                    </button>
                  ))}
                </div>
                <div>
                  <label htmlFor="tributeName" className="label">Their name *</label>
                  <input id="tributeName" className="input" value={tributeName} onChange={(e) => setTributeName(e.target.value)} {...aria("tributeName")} />
                  {err("tributeName")}
                </div>
                <div>
                  <label htmlFor="tributeNotify" className="label">Notify someone (email, optional)</label>
                  <input id="tributeNotify" type="email" className="input" value={tributeNotify} onChange={(e) => setTributeNotify(e.target.value)} {...aria("tributeNotify")} />
                  {err("tributeNotify")}
                </div>
              </div>
            )}
          </fieldset>

          {/* Donor */}
          <fieldset className="card p-5 sm:p-6 md:p-9">
            <legend className="sr-only">Your details</legend>
            <h2 className="display-sm">Your details</h2>
            <div className="mt-6 grid sm:grid-cols-2 gap-5">
              <Field id="first" label="First name *" value={donor.first} onChange={(v) => setDonor({ ...donor, first: v })} aria={aria("first")} err={err("first")} autoComplete="given-name" />
              <Field id="last" label="Last name *" value={donor.last} onChange={(v) => setDonor({ ...donor, last: v })} aria={aria("last")} err={err("last")} autoComplete="family-name" />
              <Field id="email" type="email" label="Email (for your receipt) *" value={donor.email} onChange={(v) => setDonor({ ...donor, email: v })} aria={aria("email")} err={err("email")} autoComplete="email" />
              <Field id="phone" type="tel" label="Phone / WhatsApp" value={donor.phone} onChange={(v) => setDonor({ ...donor, phone: v })} aria={aria("phone")} err={err("phone")} autoComplete="tel" placeholder="+234…" />
            </div>
            <div className="mt-4">
              <Check2 id="updates" checked={donor.updates} onChange={(v) => setDonor({ ...donor, updates: v })} label="Send me the monthly letter with stories from fellows and Civic Centre updates" />
            </div>
          </fieldset>

          {/* Payment */}
          <fieldset className="card p-5 sm:p-6 md:p-9">
            <legend className="sr-only">Payment method</legend>
            <h2 className="display-sm">Payment</h2>
            <div className="mt-6 grid grid-cols-3 border border-[color:var(--ink)]" role="tablist" aria-label="Payment method">
              {([
                { id: "card", label: "Card", icon: CreditCard },
                { id: "bank", label: "Bank transfer", icon: Building2 },
                { id: "ussd", label: "USSD", icon: Hash },
              ] as const).map((m, i) => (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  id={`tab-${m.id}`}
                  aria-selected={method === m.id}
                  aria-controls={`panel-${m.id}`}
                  onClick={() => setMethod(m.id)}
                  className={cn("flex flex-col sm:flex-row items-center justify-center gap-2 min-h-[56px] px-2 text-[14px] font-semibold transition-colors", i > 0 && "border-l border-[color:var(--ink)]", method === m.id ? "bg-[color:var(--ink)] text-white" : "hover:bg-[color:var(--stone)]")}
                >
                  <m.icon className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
                  {m.label}
                </button>
              ))}
            </div>

            {method === "card" && (
              <div id="panel-card" role="tabpanel" aria-labelledby="tab-card" className="mt-7 grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <Field id="cardName" label="Name on card *" value={card.name} onChange={(v) => setCard({ ...card, name: v })} aria={aria("cardName")} err={err("cardName")} autoComplete="cc-name" />
                </div>
                <div className="sm:col-span-2">
                  <Field id="cardNumber" label="Card number *" inputMode="numeric" value={card.number} onChange={(v) => setCard({ ...card, number: v.replace(/[^\d]/g, "").slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ") })} aria={aria("cardNumber")} err={err("cardNumber")} autoComplete="cc-number" placeholder="5399 0000 0000 0000" />
                </div>
                <Field id="cardExpiry" label="Expiry (MM/YY) *" inputMode="numeric" value={card.expiry} onChange={(v) => { const d = v.replace(/[^\d]/g, "").slice(0, 4); setCard({ ...card, expiry: d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d }); }} aria={aria("cardExpiry")} err={err("cardExpiry")} autoComplete="cc-exp" placeholder="08/28" />
                <Field id="cardCvc" label="CVC *" inputMode="numeric" value={card.cvc} onChange={(v) => setCard({ ...card, cvc: v.replace(/[^\d]/g, "").slice(0, 4) })} aria={aria("cardCvc")} err={err("cardCvc")} autoComplete="cc-csc" placeholder="123" />
                <p className="sm:col-span-2 text-[13px] text-muted flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" /> Demo template — no card is charged. Verve, Mastercard and Visa accepted.</p>
              </div>
            )}

            {method === "bank" && (
              <div id="panel-bank" role="tabpanel" aria-labelledby="tab-bank" className="mt-7">
                <dl className="border border-line divide-y divide-[color:var(--line)]">
                  {[
                    { k: "Bank", v: D.bank.bankName },
                    { k: "Account name", v: accountName },
                    { k: "Account number", v: accountNumber, copy: true },
                    { k: "Amount", v: total ? formatNaira(total) : "—" },
                    { k: "Reference", v: reference, copy: reference !== placeholderRef },
                  ].map((r) => (
                    <div key={r.k} className="flex items-center justify-between gap-3 px-4 min-h-[56px] text-[14.5px]">
                      <dt className="text-muted">{r.k}</dt>
                      <dd className="flex items-center gap-1">
                        <span className="font-semibold tabular text-right">{r.v}</span>
                        {r.copy && <CopyButton text={r.v} label={r.k.toLowerCase()} className="-mr-2 hover:text-[color:var(--accent)]" />}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-[13px] text-muted">
                  {reference === placeholderRef ? "Enter your email above to generate your unique reference." : "Use this reference so we can match your transfer and send your receipt."} International donors: {D.bank.usdAccount}.
                </p>
                <div className="mt-4">
                  <Check2 id="bank" checked={bankConfirmed} onChange={setBankConfirmed} label="I’ll make the transfer using the reference above" />
                  {err("bank")}
                </div>
              </div>
            )}

            {method === "ussd" && (
              <div id="panel-ussd" role="tabpanel" aria-labelledby="tab-ussd" className="mt-7 border border-line p-6 text-center">
                <p className="text-[13px] text-muted">{D.ussd.label} — dial</p>
                <p className="mt-2 font-display text-2xl sm:text-3xl font-medium tracking-[-0.02em] break-all">{ussdCode}</p>
                <CopyButton text={ussdCode} label="USSD code" className="btn btn-outline btn-sm mt-4">Copy code</CopyButton>
                <p className="mt-4 text-[13px] text-muted max-w-md mx-auto">{D.ussd.hint}. Use reference <strong className="text-[color:var(--ink)]">{reference}</strong> when prompted.</p>
              </div>
            )}
          </fieldset>
        </div>

        {/* Sticky summary */}
        <aside className="min-w-0 lg:sticky lg:top-28 space-y-4">
          <div className="bg-ink on-dark p-6 md:p-8" aria-live="polite">
            <div className="eyebrow">Summary</div>
            <dl className="mt-6 space-y-3 text-[14.5px]">
              <Row k="Gift" v={amount ? `${formatNaira(amount)}${FREQ_SUFFIX[frequency]}` : "—"} />
              <Row k="Frequency" v={D.frequencies.find((f) => f.id === frequency)!.label} />
              <Row k="Designation" v={designationLabel(designation)} />
              {coverFees && amount ? <Row k="Processing fee" v={`+${formatNaira(fee)}`} /> : null}
              {tribute && tributeName && <Row k={`In ${tributeType} of`} v={tributeName} />}
              {anonymous && <Row k="Visibility" v="Anonymous" />}
            </dl>
            <div className="mt-6 pt-6 border-t border-dark flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className="font-semibold text-white">Total{frequency !== "one-time" && <span className="text-on-dark-muted font-normal"> {FREQ_SUFFIX[frequency]}</span>}</span>
              <span className="font-display text-3xl sm:text-4xl font-medium tracking-[-0.04em] text-white tabular">{total ? formatNaira(total) : "₦0"}</span>
            </div>
            <button type="submit" className="btn btn-accent btn-lg w-full mt-7" disabled={submitting}>
              {submitting ? "Processing…" : method === "card" ? <>Donate {total ? formatNaira(total) : ""} <Lock className="w-4 h-4" aria-hidden="true" /></> : "Confirm my gift"}
            </button>
            {Object.keys(errors).length > 0 && <p role="alert" className="mt-3 text-[13px] text-[#FF9C8F]">Please fix {Object.keys(errors).length} highlighted {Object.keys(errors).length === 1 ? "field" : "fields"}.</p>}
            <p className="mt-5 text-[12px] text-on-dark-muted leading-relaxed">{D.receiptNote}</p>
          </div>
          <div className="card p-5 text-[14px] text-ink-2">
            Giving ₦10m or more, or from a company? <Link href="/partnerships" className="link">Talk to our partnerships team</Link> about restricted gifts, fellowship sponsorship and naming.
          </div>
        </aside>
      </form>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-on-dark-muted shrink-0">{k}</dt>
      <dd className="text-white text-right font-medium">{v}</dd>
    </div>
  );
}

function Check2({ id, checked, onChange, label }: { id: string; checked: boolean; onChange: (v: boolean) => void; label: React.ReactNode }) {
  return (
    <label htmlFor={`cb-${id}`} className="flex items-start gap-3 text-[14.5px] text-ink-2 cursor-pointer min-h-[44px]">
      <input id={`cb-${id}`} data-field={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="check" />
      <span>{label}</span>
    </label>
  );
}

function Field({ id, label, value, onChange, type = "text", aria, err, autoComplete, placeholder, inputMode }: {
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
