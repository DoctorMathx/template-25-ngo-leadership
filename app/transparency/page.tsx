import type { Metadata } from "next";
import { Download } from "lucide-react";
import { income, expenses, perThousand, reports, governance, totalIncome, totalExpenditure, financialYear, capitalCampaignNote } from "@/mock/financials";
import { board } from "@/mock/team";
import { siteConfig } from "@/lib/site-config";
import { compactNaira, formatNaira } from "@/lib/utils";
import { Donut } from "@/components/ui/donut";

export const metadata: Metadata = {
  title: "Transparency & financials",
  description: "Audited income and expenditure, what happens to every ₦1,000, annual reports, registration, governance and our board of trustees.",
};

export default function TransparencyPage() {
  const o = siteConfig.org;
  return (
    <>
      <section className="bg-white">
        <div className="container-x pt-14 md:pt-20 pb-12">
          <div className="eyebrow">Transparency</div>
          <h1 className="display-lg mt-5 max-w-4xl">Show the receipts.</h1>
          <p className="lede mt-6 max-w-2xl">We publish audited accounts, a learning report that includes what didn’t work, and the founder’s pay — which is zero.</p>
          <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 border-t border-line">
            {[
              ["Income FY" + financialYear, compactNaira(totalIncome)],
              ["Expenditure FY" + financialYear, compactNaira(totalExpenditure)],
              ["Spent on programmes", "84%"],
              ["Founder’s salary", "₦0"],
            ].map(([k, v], i) => (
              <div key={k} className={`py-8 ${i > 0 ? "md:border-l md:pl-8 border-line" : ""} ${i % 2 === 1 ? "border-l pl-6 border-line" : ""}`}>
                <dd className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.05em] tabular">{v}</dd>
                <dt className="mt-2 text-[14px] text-muted">{k.replace("FY", " FY")}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section bg-stone" aria-labelledby="money-h">
        <div className="container-x">
          <h2 id="money-h" className="display-md">Where the money comes from — and goes.</h2>
          <p className="mt-3 text-muted">Financial year {financialYear}, audited by {o.auditor}. Operating funds only.</p>
          <div className="mt-12 grid lg:grid-cols-2 gap-6">
            <div className="card p-7 md:p-9"><Donut data={income} label="Income" centre={compactNaira(totalIncome)} sub="total income" /></div>
            <div className="card p-7 md:p-9"><Donut data={expenses} label="Expenditure" centre={compactNaira(totalExpenditure)} sub="total spent" /></div>
          </div>
          <p className="mt-6 text-[14px] text-ink-2 max-w-3xl">{capitalCampaignNote}</p>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="k-h">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 id="k-h" className="display-md">Of every ₦1,000 you give.</h2>
          </div>
          <div className="lg:col-span-8">
            <div className="flex h-14 w-full" role="img" aria-label={perThousand.map((p) => `${formatNaira(p.amount)} ${p.label}`).join("; ")}>
              {perThousand.map((p, i) => (
                <span key={p.label} style={{ width: `${p.amount / 10}%`, background: ["#0A0A0A", "#333", "#5C5C5C", "#858585", "#B0B0B0", "#2F5FE3"][i] }} className="border-r border-white last:border-0" />
              ))}
            </div>
            <ul className="mt-8 border-t border-line">
              {perThousand.map((p, i) => (
                <li key={p.label} className="grid grid-cols-[18px_96px_1fr] gap-4 items-center py-4 border-b border-line">
                  <span aria-hidden="true" className="w-3 h-3" style={{ background: ["#0A0A0A", "#333", "#5C5C5C", "#858585", "#B0B0B0", "#2F5FE3"][i] }} />
                  <span className="font-display text-2xl tracking-[-0.04em] tabular">{formatNaira(p.amount)}</span>
                  <span>{p.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-white border-t border-line" aria-labelledby="reports-h">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 id="reports-h" className="display-md">Annual reports</h2>
          </div>
          <ul className="lg:col-span-8 border-t border-line">
            {reports.map((r) => (
              <li key={r.title}>
                <a href="#" className="group grid grid-cols-[64px_1fr_auto] gap-4 items-center py-5 border-b border-line min-h-[44px]">
                  <span className="font-display text-lg tabular text-muted">{r.year}</span>
                  <span><span className="block font-medium group-hover:text-[color:var(--accent)]">{r.title}</span><span className="text-[13px] text-muted">{r.size}</span></span>
                  <Download className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-stone" aria-labelledby="gov-h">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 id="gov-h" className="display-md">Registration & governance</h2>
          </div>
          <dl className="lg:col-span-8 border-t border-line">
            {[
              ["Legal name", o.legalName],
              ["Auditor", o.auditor],
              ...governance.map((g) => [g.label, g.value]),
            ].map(([k, v]) => (
              <div key={k} className="grid sm:grid-cols-[200px_1fr] gap-1 sm:gap-6 py-4 border-b border-line">
                <dt className="text-muted">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="board-h">
        <div className="container-x">
          <h2 id="board-h" className="display-md">Board of trustees</h2>
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {board.map((b) => (
              <li key={b.name} className="border-t border-[color:var(--ink)] pt-5">
                <p className="font-display text-xl font-medium tracking-[-0.02em]">{b.name}</p>
                <p className="text-[14px] font-semibold mt-1">{b.role}</p>
                <p className="text-[14px] text-muted mt-2">{b.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
