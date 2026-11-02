import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mission, vision, history, team, board } from "@/mock/team";
import { founder } from "@/mock/founder";
import { siteConfig } from "@/lib/site-config";
import { PageHero } from "@/components/ui/page-hero";
import { Portrait } from "@/components/ui/portrait";
import { photo } from "@/mock/images";

export const metadata: Metadata = {
  title: "About us",
  description: "Our mission, vision, values, history, team and board of trustees.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A founder-led foundation, built to outlast its founder."
        lede={`${siteConfig.brand.name} was established in ${siteConfig.org.founded} in Abuja to inspire, empower and connect the next generation of African leaders.`}
        image={photo("conference", 2000)}
        imageAlt="A conference hall with a stage and audience"
      />

      <section className="section bg-white">
        <div className="container-x grid lg:grid-cols-2 gap-12 border-t border-line pt-12">
          <div>
            <div className="eyebrow">Mission</div>
            <p className="mt-5 display-sm">{mission}</p>
          </div>
          <div>
            <div className="eyebrow">Vision</div>
            <p className="mt-5 display-sm">{vision}</p>
          </div>
        </div>
      </section>

      <section className="section bg-stone" aria-labelledby="values-h">
        <div className="container-x">
          <h2 id="values-h" className="display-md">Our values</h2>
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--line)] border border-line">
            {founder.values.map((v, i) => (
              <li key={v.title} className="bg-white p-7">
                <span className="font-display text-sm tabular text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-xl font-medium tracking-[-0.02em]">{v.title}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="history-h">
        <div className="container-x">
          <h2 id="history-h" className="display-md">Our story so far</h2>
          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-10">
            {history.map((h, i) => (
              <li key={h.year} className={`border-t pt-5 ${i === history.length - 1 ? "border-[color:var(--accent)]" : "border-[color:var(--ink)]"}`}>
                <p className="font-display text-3xl font-medium tracking-[-0.04em] tabular">{h.year}</p>
                <h3 className="mt-3 font-semibold">{h.title}</h3>
                <p className="mt-1 text-[14px] text-ink-2">{h.body}</p>
              </li>
            ))}
          </ol>
          <Link href="/founder" className="link-arrow mt-12">Read our founder’s story <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="section bg-white border-t border-line" aria-labelledby="team-h">
        <div className="container-x">
          <h2 id="team-h" className="display-md">Leadership team</h2>
          <ul className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-10">
            {team.map((p) => (
              <li key={p.name}>
                <Portrait name={p.name} initials={p.initials} image={p.image} sizes="220px" />
                <p className="mt-4 font-semibold">{p.name}</p>
                <p className="text-[13.5px] text-muted">{p.role}</p>
                <p className="mt-2 text-[13.5px] text-ink-2">{p.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-stone" aria-labelledby="board-h">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="board-h" className="display-md">Board of trustees</h2>
            <Link href="/transparency" className="link-arrow">Governance & financials <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
          </div>
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
