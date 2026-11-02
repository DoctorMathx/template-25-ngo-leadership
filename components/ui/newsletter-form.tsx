"use client";

import { useId, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn, EMAIL_RE } from "@/lib/utils";

export function NewsletterForm({ dark, cta = "Join", withName }: { dark?: boolean; cta?: string; withName?: boolean }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  if (done)
    return (
      <p role="status" className={cn("flex items-start gap-3 text-[15px]", dark ? "text-white" : "text-[color:var(--ink)]")}>
        <Check className="w-5 h-5 mt-0.5 shrink-0" aria-hidden="true" />
        <span>Welcome{name ? `, ${name.split(" ")[0]}` : ""}. Check your inbox for a note from our founder — and your first monthly letter on the 1st.</span>
      </p>
    );

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!EMAIL_RE.test(email.trim())) return setError("Enter a valid email address.");
        setError("");
        setDone(true);
      }}
      className="w-full"
    >
      <div className={cn("flex flex-col gap-3", withName ? "" : "sm:flex-row")}>
        {withName && (
          <div>
            <label htmlFor={`${id}-name`} className="label">First name</label>
            <input id={`${id}-name`} className="input" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}
        <div className="flex-1">
          <label htmlFor={`${id}-email`} className={withName ? "label" : "sr-only"}>Email address</label>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-err` : undefined}
          />
        </div>
        <button type="submit" className={cn("btn", dark ? "btn-white" : "btn-ink", withName && "w-full sm:w-auto sm:self-start")}>
          {cta} <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
      {error && <p id={`${id}-err`} className="field-error">{error}</p>}
      <p className={cn("mt-3 text-[12.5px]", dark ? "text-on-dark-muted" : "text-muted")}>One letter a month. No spam; unsubscribe in one click.</p>
    </form>
  );
}
