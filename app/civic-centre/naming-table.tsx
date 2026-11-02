"use client";

import { useState } from "react";
import { namingOpportunities } from "@/mock/civic-centre";
import type { NamingOpportunity } from "@/lib/types";
import { cn, formatNaira, formatNumber } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";
import { SmartForm } from "@/components/ui/smart-form";
import { siteConfig } from "@/lib/site-config";

const ZONES = ["All spaces", "Democracy Hall", "Library & Archive", "Leadership Studios", "Fellows’ Residence", "Grounds"] as const;

export function NamingTable() {
  const [zone, setZone] = useState<(typeof ZONES)[number]>("All spaces");
  const [maxPrice, setMaxPrice] = useState("any");
  const [selected, setSelected] = useState<NamingOpportunity | null>(null);

  const rows = namingOpportunities.filter(
    (n) => (zone === "All spaces" || n.zone === zone) && (maxPrice === "any" || n.price <= Number(maxPrice))
  );

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
        <div role="group" aria-label="Filter by zone" className="flex flex-wrap gap-2">
          {ZONES.map((z) => (
            <button key={z} type="button" aria-pressed={zone === z} onClick={() => setZone(z)} className={cn("min-h-[44px] px-4 text-[14px] font-medium border", zone === z ? "bg-[color:var(--ink)] text-white border-[color:var(--ink)]" : "border-line hover:border-[color:var(--ink)]")}>
              {z}
            </button>
          ))}
        </div>
        <div className="w-full lg:w-56">
          <label htmlFor="naming-budget" className="label">Gift level</label>
          <select id="naming-budget" className="input" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
            <option value="any">Any amount</option>
            <option value="1000000">Up to ₦1m</option>
            <option value="25000000">Up to ₦25m</option>
            <option value="150000000">Up to ₦150m</option>
            <option value="1000000000">Up to ₦1bn</option>
          </select>
        </div>
      </div>

      {/* Stacked cards below md */}
      <ul className="mt-8 md:hidden border-t border-[color:var(--ink)]">
        {rows.map((n) => (
          <li key={n.id} className="border-b border-line py-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-display text-lg font-medium tracking-[-0.02em] break-words">{n.space}</p>
                <p className="text-[13.5px] text-muted mt-0.5">{n.detail}</p>
              </div>
              <p className="shrink-0 font-display text-lg tabular whitespace-nowrap">{formatNaira(n.price)}</p>
            </div>
            <p className="mt-3 text-[13.5px] text-ink-2">{n.zone} · {n.quantity ? `${formatNumber(n.quantity)} left` : "1 available"}</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <span className={cn("tag", n.status === "Available" && "tag-accent", n.status === "Named" && "tag-ink")}>{n.status}</span>
                {n.namedFor && <span className="block text-[12.5px] text-muted mt-1.5">{n.namedFor}</span>}
              </div>
              {n.status === "Available" ? (
                <button type="button" aria-haspopup="dialog" onClick={() => setSelected(n)} className="btn btn-ink btn-sm">
                  Reserve<span className="sr-only"> {n.space}</span>
                </button>
              ) : (
                <button type="button" aria-haspopup="dialog" onClick={() => setSelected(n)} className="btn btn-outline btn-sm">
                  Join waitlist<span className="sr-only"> for {n.space}</span>
                </button>
              )}
            </div>
          </li>
        ))}
        {rows.length === 0 && <li className="py-10 text-center text-muted">No spaces match. Try another zone or gift level.</li>}
      </ul>

      <div className="mt-8 hidden md:block overflow-x-auto border-t border-[color:var(--ink)]">
        <table className="w-full md:min-w-[720px] lg:min-w-[820px] text-left text-[14.5px]">
          <caption className="sr-only">Naming opportunities at the Okafor Civic Centre</caption>
          <thead>
            <tr className="border-b border-line text-[12px] uppercase tracking-[.14em] text-muted">
              <th scope="col" className="py-4 pr-4 font-semibold">Space</th>
              <th scope="col" className="py-4 pr-4 font-semibold">Zone</th>
              <th scope="col" className="py-4 pr-4 font-semibold">Available</th>
              <th scope="col" className="py-4 pr-4 font-semibold text-right">Gift</th>
              <th scope="col" className="py-4 pr-4 font-semibold">Status</th>
              <th scope="col" className="py-4 font-semibold"><span className="sr-only">Action</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((n) => (
              <tr key={n.id} className="border-b border-line align-top">
                <th scope="row" className="py-5 pr-4 font-normal">
                  <span className="block font-display text-lg font-medium tracking-[-0.02em]">{n.space}</span>
                  <span className="block text-[13.5px] text-muted mt-0.5">{n.detail}</span>
                </th>
                <td className="py-5 pr-4 text-ink-2">{n.zone}</td>
                <td className="py-5 pr-4 tabular text-ink-2">{n.quantity ? `${formatNumber(n.quantity)} left` : "1"}</td>
                <td className="py-5 pr-4 text-right font-display text-lg tabular whitespace-nowrap">{formatNaira(n.price)}</td>
                <td className="py-5 pr-4">
                  <span className={cn("tag", n.status === "Available" && "tag-accent", n.status === "Named" && "tag-ink")}>{n.status}</span>
                  {n.namedFor && <span className="block text-[12.5px] text-muted mt-1.5">{n.namedFor}</span>}
                </td>
                <td className="py-4 text-right">
                  {n.status === "Available" ? (
                    <button type="button" aria-haspopup="dialog" onClick={() => setSelected(n)} className="btn btn-ink btn-sm">
                      Reserve<span className="sr-only"> {n.space}</span>
                    </button>
                  ) : (
                    <button type="button" aria-haspopup="dialog" onClick={() => setSelected(n)} className="btn btn-outline btn-sm">
                      Join waitlist<span className="sr-only"> for {n.space}</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={6} className="py-10 text-center text-muted">No spaces match. Try another zone or gift level.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-[13px] text-muted">Pledges can be paid over up to five years. 10% of every naming gift goes to the operations endowment. Prices include engraving and a dedication in the opening programme.</p>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected ? `${selected.status === "Available" ? "Reserve" : "Waitlist"}: ${selected.space}` : "Reserve"}>
        {selected && (
          <div key={selected.id}>
            <div className="border border-line p-4 flex items-center justify-between gap-4 bg-[color:var(--stone)]">
              <div>
                <p className="font-semibold">{selected.space}</p>
                <p className="text-[13px] text-muted">{selected.zone} · {selected.detail}</p>
              </div>
              <p className="font-display text-xl tabular">{formatNaira(selected.price)}</p>
            </div>
            <p className="mt-5 text-[14.5px] text-ink-2">Our capital campaign team will contact you within two working days to confirm availability, the wording of your dedication and a payment schedule. Nothing is charged now.</p>
            <SmartForm
              className="mt-6"
              submitLabel={selected.status === "Available" ? "Send reservation enquiry" : "Join the waitlist"}
              successTitle="Enquiry received."
              successBody={`We’ve held ${selected.space} for 14 days while we contact you. Questions: ${siteConfig.brand.campaignEmail}.`}
              fields={[
                { name: "name", label: "Full name", required: true, half: true, autoComplete: "name" },
                { name: "organisation", label: "Organisation (optional)", half: true, autoComplete: "organization" },
                { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
                { name: "phone", label: "Phone", type: "tel", required: true, half: true, autoComplete: "tel" },
                { name: "dedication", label: "Proposed dedication (optional)", placeholder: "e.g. In memory of Mrs. Grace Okeke, teacher", help: "Up to 60 characters. We’ll confirm the final wording with you." },
                { name: "schedule", label: "Payment preference", type: "select", required: true, half: true, options: [ { value: "once", label: "Single payment" }, { value: "2y", label: "Over 2 years" }, { value: "5y", label: "Over 5 years" } ] },
                { name: "contact", label: "Best time to call", type: "select", half: true, options: [ { value: "am", label: "Morning" }, { value: "pm", label: "Afternoon" }, { value: "eve", label: "Evening" } ] },
                { name: "consent", label: "I understand this is an enquiry and not yet a binding pledge.", type: "checkbox", required: true },
              ]}
            />
          </div>
        )}
      </Modal>
    </>
  );
}
