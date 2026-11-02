"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Copy, Download, Printer, Share2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { formatNaira, parsePositiveInt } from "@/lib/utils";
import { designationLabel } from "@/lib/designations";
import { founder } from "@/mock/founder";
import { Signature } from "@/components/ui/signature";

const METHOD: Record<string, string> = { card: "Card", bank: "Bank transfer", ussd: "USSD" };
const FREQ: Record<string, string> = { "one-time": "One-time", monthly: "Monthly", annual: "Annual" };

export function ThankYouClient() {
  const sp = useSearchParams();
  const [copied, setCopied] = useState(false);
  const total = parsePositiveInt(sp.get("amount"));
  const gift = parsePositiveInt(sp.get("gift")) ?? total;
  const fee = parsePositiveInt(sp.get("fee")) ?? 0;
  const ref = (sp.get("ref") ?? "").replace(/[^A-Z0-9-]/gi, "").slice(0, 20) || "AOF-PENDING";
  const frequency = sp.get("frequency") ?? "one-time";
  const method = sp.get("method") ?? "card";
  const name = (sp.get("name") ?? "").replace(/[<>]/g, "").slice(0, 40) || "friend";
  const designation = sp.get("designation");
  const tribute = sp.get("tribute");
  const tributeName = sp.get("tributeName")?.slice(0, 48);
  const isCapital = designation === "capital";
  const date = new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });

  if (!total) {
    return (
      <section className="section bg-white">
        <div className="container-narrow text-center">
          <h1 className="display-md">No donation found</h1>
          <p className="lede mt-5">This receipt link is missing details. If you’ve just given, check your email for your receipt — or start a new gift below.</p>
          <Link href="/donate" className="btn btn-ink btn-lg mt-8">Go to donate</Link>
        </div>
      </section>
    );
  }

  const shareText = `I just backed ${siteConfig.brand.name} — investing in Africa’s next generation of leaders. Join me:`;
  const shareUrl = `https://${siteConfig.brand.domain}${isCapital ? "/civic-centre" : "/donate"}`;
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(`${shareText} ${shareUrl}`); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const share = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try { await navigator.share({ title: siteConfig.brand.name, text: shareText, url: shareUrl }); return; } catch { /* cancelled */ }
    }
    copyLink();
  };

  return (
    <>
      <section className="bg-ink on-dark">
        <div className="container-x pt-20 pb-16 md:pt-28 md:pb-20">
          <span className="w-14 h-14 border border-white flex items-center justify-center fade-up"><Check className="w-6 h-6" aria-hidden="true" /></span>
          <h1 className="display-xl text-white mt-8 max-w-4xl fade-up delay-1">Thank you, {name}.</h1>
          <p className="lede mt-6 max-w-xl fade-up delay-2">
            {method === "card" ? "Your gift is confirmed. A young leader somewhere is about to get a yes." : "We’ve logged your pledge. As soon as your transfer lands we’ll email your official receipt."}
          </p>
        </div>
      </section>

      <section className="section-sm bg-stone">
        <div className="container-x grid lg:grid-cols-[1.25fr_1fr] gap-8 items-start">
          <div className="space-y-6">
            <div className="card p-6 md:p-9 print-area">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="eyebrow">Donation receipt</div>
                  <p className="mt-3 font-display text-2xl font-medium tracking-[-0.02em]">{siteConfig.org.legalName}</p>
                  <p className="text-[13px] text-muted mt-1">Registered not-for-profit · {siteConfig.brand.address}</p>
                </div>
                <span className={method === "card" ? "tag tag-ink shrink-0" : "tag shrink-0"}>{method === "card" ? "Paid" : "Pending transfer"}</span>
              </div>
              <dl className="mt-7 divide-y divide-[color:var(--line)] border-y border-line text-[14.5px]">
                {[
                  ["Reference", ref],
                  ["Date", date],
                  ["Donation", formatNaira(gift ?? total)],
                  ...(fee ? [["Processing fee covered", formatNaira(fee)]] : []),
                  ["Total", `${formatNaira(total)}${frequency === "monthly" ? " / month" : frequency === "annual" ? " / year" : ""}`],
                  ["Frequency", FREQ[frequency] ?? "One-time"],
                  ["Designation", designationLabel(designation)],
                  ["Payment method", METHOD[method] ?? "Card"],
                  ...(tribute && tributeName ? [[`In ${tribute === "memory" ? "memory" : "honour"} of`, tributeName]] : []),
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-3.5">
                    <dt className="text-muted">{k}</dt>
                    <dd className="font-medium text-right tabular">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 text-[12.5px] text-muted leading-relaxed">{siteConfig.donation.receiptNote}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <button type="button" onClick={() => window.print()} className="btn btn-outline btn-sm"><Printer className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" /> Print receipt</button>
                <a href="#" className="btn btn-outline btn-sm"><Download className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" /> Download PDF</a>
              </div>
            </div>

            <div className="card p-6 md:p-9">
              <p className="text-[15.5px] leading-relaxed text-ink-2">“Every gift to this Foundation is a vote of confidence in someone who has not yet been given one. Thank you for casting yours.”</p>
              <Signature className="w-40 h-auto mt-5" />
              <p className="text-[14px] font-semibold mt-1">{founder.name}</p>
              <p className="text-[13px] text-muted">Founder & Chair</p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="bg-ink on-dark p-6 md:p-8">
              <h2 className="display-sm text-white">Multiply your gift</h2>
              <p className="mt-2 text-[14.5px] text-on-dark-muted">Share the cause — no amounts are shown.</p>
              <div className="mt-6 grid grid-cols-2 gap-2">
                <button type="button" onClick={share} className="btn btn-white">{copied ? <><Check className="w-4 h-4" aria-hidden="true" /> Copied</> : <><Share2 className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" /> Share</>}</button>
                <a className="btn btn-outline-light" target="_blank" rel="noreferrer" href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}>WhatsApp</a>
                <a className="btn btn-outline-light" target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}>X / Twitter</a>
                <button type="button" className="btn btn-outline-light" onClick={copyLink}><Copy className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" /> Link</button>
              </div>
              <p className="sr-only" aria-live="polite">{copied ? "Link copied" : ""}</p>
            </div>
            <div className="card p-6 md:p-8">
              <h2 className="display-sm">What happens next</h2>
              <ol className="mt-5 border-t border-line">
                {[
                  "Your receipt arrives by email within a few minutes.",
                  isCapital ? "Your name is added to the Founding Supporters list (unless you chose to give anonymously)." : "Your gift is allocated to the designation you chose within 7 days.",
                  isCapital ? "You’ll be invited to a hard-hat tour and the opening week in 2027." : "You’ll receive a story from a fellow or mentee your gift supports.",
                  frequency !== "one-time" ? "You can change or cancel your regular gift any time by email or WhatsApp." : "Consider a monthly gift — it lets us commit to young people years ahead.",
                ].map((t, i) => (
                  <li key={i} className="grid grid-cols-[36px_1fr] gap-2 py-3.5 border-b border-line text-[14.5px] text-ink-2">
                    <span className="tabular text-muted">{String(i + 1).padStart(2, "0")}</span>{t}
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-col gap-2">
                <Link href="/get-involved#pledge" className="btn btn-ink">Take the pledge to serve <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
                <Link href={isCapital ? "/civic-centre" : "/leaders/alumni"} className="btn btn-outline">{isCapital ? "Back to the Civic Centre" : "Meet the leaders you support"}</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
