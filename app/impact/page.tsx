import type { Metadata } from "next";
import Link from "next/link";
import { headlineStats, outcomes, yearly, reach } from "@/mock/impact";
import { formatNumber } from "@/lib/utils";
import { PullQuote } from "@/components/ui/pull-quote";
import { fellows } from "@/mock/alumni";

export const metadata: Metadata = {
  title: "Impact",
  description: "Leaders trained, young people mentored, voters registered and the outcomes we track for five years after every programme.",
};

export default function ImpactPage() {
  const maxM = Math.max(...yearly.map((y) => y.mentees));
  const maxL = Math.max(...yearly.map((y) => y.leaders));
  const quoteFellow = fellows[1];
  return (
    <>
      <section className="bg-white">
        <div className="container-x pt-14 md:pt-20 pb-12">
          <div className="eyebrow">Impact</div>
          <h1 className="display-lg mt-5 max-w-4xl">We measure leaders by what they do next.</h1>
          <p className="lede mt-6 max-w-2xl">We follow every fellow, scholar and mentee for five years after their programme — and publish what we find, good and bad.</p>
        </div>
        <div className="container-x">
          <dl className="grid grid-cols-2 lg:grid-cols-4 border-y border-line">
            {headlineStats.map((s, i) => (
              <div key={s.label} className={`py-10 ${i % 2 === 1 ? "border-l pl-6 border-line" : ""} ${i === 2 ? "lg:border-l lg:pl-8 border-line border-t lg:border-t-0" : ""} ${i === 3 ? "border-t lg:border-t-0 lg:pl-8" : ""} ${i === 1 ? "lg:pl-8" : ""}`}>
                <dd className="font-display text-[clamp(2.4rem,5vw,4rem)] font-medium tracking-[-0.05em] leading-none tabular">{s.value}</dd>
                <dt className="mt-3 font-semibold text-[15px]">{s.label}</dt>
                <p className="text-[13px] text-muted mt-1">{s.note}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="growth-h">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 id="growth-h" className="display-md">Growing every year.</h2>
            <p className="mt-4 text-ink-2">Leaders trained (all programmes) and active mentoring matches, by year.</p>
            <div className="mt-6 flex gap-6 text-[13.5px]">
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-[color:var(--ink)]" aria-hidden="true" />Mentees</span>
              <span className="flex items-center gap-2"><span className="w-3 h-3 bg-[color:var(--accent)]" aria-hidden="true" />Leaders trained</span>
            </div>
          </div>
          <div className="lg:col-span-8">
            <table className="w-full text-[14px]">
              <caption className="sr-only">Leaders trained and mentees by year</caption>
              <thead className="sr-only"><tr><th scope="col">Year</th><th scope="col">Mentees</th><th scope="col">Leaders trained</th></tr></thead>
              <tbody>
                {yearly.map((y) => (
                  <tr key={y.year} className="border-b border-line">
                    <th scope="row" className="py-4 pr-4 w-16 text-left font-display font-medium tabular">{y.year}</th>
                    <td className="py-4">
                      <div className="flex items-center gap-3"><span className="h-3 bg-[color:var(--ink)]" style={{ width: `${(y.mentees / maxM) * 80}%` }} aria-hidden="true" /><span className="tabular">{formatNumber(y.mentees)}</span></div>
                      <div className="flex items-center gap-3 mt-1.5"><span className="h-3 bg-[color:var(--accent)]" style={{ width: `${(y.leaders / maxL) * 30}%` }} aria-hidden="true" /><span className="tabular text-muted">{formatNumber(y.leaders)}</span></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-[12.5px] text-muted">Bars are scaled separately for each series.</p>
          </div>
        </div>
      </section>

      <section className="section bg-stone" aria-labelledby="outcomes-h">
        <div className="container-x">
          <h2 id="outcomes-h" className="display-md">Outcomes we track</h2>
          <ul className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-line bg-white">
            {outcomes.map((o) => (
              <li key={o.label} className="p-8 border-r border-b border-line">
                <p className="font-display text-5xl font-medium tracking-[-0.05em] tabular">{o.value}</p>
                <p className="mt-3 text-ink-2">{o.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="reach-h">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 id="reach-h" className="display-md">Where our leaders come from</h2>
            <p className="mt-4 text-ink-2">Share of all programme participants since 2022.</p>
          </div>
          <ul className="lg:col-span-8 border-t border-line">
            {reach.map((r) => (
              <li key={r.region} className="grid grid-cols-[1fr_56px] md:grid-cols-[260px_1fr_56px] gap-4 items-center py-4 border-b border-line">
                <span>{r.region}</span>
                <span className="hidden md:block bar" aria-hidden="true"><span style={{ width: `${(r.share / 34) * 100}%` }} /></span>
                <span className="text-right font-semibold tabular">{r.share}%</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-ink on-dark">
        <div className="container-x">
          <PullQuote text={quoteFellow.quote} by={quoteFellow.name} context={`${quoteFellow.role}, Fellow ’${String(quoteFellow.cohort).slice(2)}`} size="md" />
          <div className="mt-12 grid md:grid-cols-2 gap-8 border-t border-dark pt-10">
            <div>
              <h2 className="display-sm text-white">Methodology</h2>
              <p className="mt-3 text-on-dark-muted">Participants complete surveys at entry, exit and every year for five years. Outcomes are verified against public records or employer confirmation where possible, and reviewed by an independent evaluator every two years. Our full methodology is in the annual Learning Report.</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end md:items-end">
              <Link href="/transparency" className="btn btn-white">Read the reports</Link>
              <Link href="/stories" className="btn btn-outline-light">Read the stories</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
