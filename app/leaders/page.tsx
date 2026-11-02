import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { leaderProgrammes } from "@/mock/leaders";
import { featuredFellows } from "@/mock/alumni";
import { PageHero } from "@/components/ui/page-hero";
import { Photo } from "@/components/ui/photo";
import { Portrait } from "@/components/ui/portrait";
import { cn, formatDate } from "@/lib/utils";
import { photo } from "@/mock/images";

export const metadata: Metadata = {
  title: "Leaders programmes",
  description: "The Leaders Africa Fellowship, Civic Scholars, the Torchbearers Mentorship Alliance and the Community Leaders Programme — find the one that fits you.",
};

export default function LeadersPage() {
  return (
    <>
      <PageHero
        eyebrow="Leaders programmes"
        title="From a first mentor to a seat at the table."
        lede="Four programmes for four stages of a leader’s life. All are free to participants, funded by donors who believe the next generation is ready."
        image={photo("eventHall", 2000)}
        imageAlt="An audience listening to a panel at a leadership convening"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/leaders/apply" className="btn btn-ink btn-lg">Apply now <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
          <Link href="/leaders/alumni" className="btn btn-outline btn-lg">Meet the leaders</Link>
        </div>
      </PageHero>

      <section className="section bg-white">
        <div className="container-x space-y-24 md:space-y-32">
          {leaderProgrammes.map((p, i) => (
            <article key={p.slug} className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className={cn("lg:col-span-6", i % 2 === 1 && "lg:order-2")}>
                <Photo src={p.image} alt="" className="aspect-[4/3]" sizes="(min-width:1024px) 640px, 100vw" />
              </div>
              <div className="lg:col-span-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="eyebrow-num font-display text-sm tabular">{String(i + 1).padStart(2, "0")}</span>
                  <span className={cn("tag", p.status === "Applications open" && "tag-accent")}>{p.status}{p.deadline && p.status === "Applications open" ? ` · closes ${formatDate(p.deadline, { day: "numeric", month: "short" })}` : ""}</span>
                </div>
                <h2 className="display-md mt-5">{p.name}</h2>
                <p className="lede mt-5">{p.summary}</p>
                <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 border-t border-line">
                  {[["Ages", p.ages], ["Duration", p.duration], ["Cohort", p.cohortSize], ["Cost", p.cost]].map(([k, v]) => (
                    <div key={k} className="py-4 pr-3 border-b border-line">
                      <dt className="text-[12px] uppercase tracking-[.14em] text-muted font-semibold">{k}</dt>
                      <dd className="mt-1 text-[14.5px] font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={`/leaders/${p.slug}`} className="btn btn-ink">Explore the programme</Link>
                  {p.applyable ? (
                    <Link href={`/leaders/apply?programme=${p.slug}`} className="btn btn-outline">Apply</Link>
                  ) : (
                    <Link href="/get-involved#volunteer" className="btn btn-outline">Become a mentor</Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-stone">
        <div className="container-x">
          <div className="eyebrow">Compare</div>
          <h2 className="display-md mt-5">Which programme is right for you?</h2>
          <p className="mt-8 text-[13px] text-muted md:hidden" aria-hidden="true">Scroll →</p>
          <div className="mt-3 md:mt-10 overflow-x-auto border border-line bg-white">
            <table className="w-full min-w-[760px] text-left text-[14.5px]">
              <caption className="sr-only">Comparison of leaders programmes</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="p-5 font-semibold">Programme</th>
                  <th scope="col" className="p-5 font-semibold">Who it’s for</th>
                  <th scope="col" className="p-5 font-semibold">Duration</th>
                  <th scope="col" className="p-5 font-semibold">Format</th>
                  <th scope="col" className="p-5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaderProgrammes.map((p) => (
                  <tr key={p.slug} className="border-b border-line last:border-0 align-top">
                    <th scope="row" className="p-5 font-display text-lg font-medium tracking-[-0.02em]"><Link href={`/leaders/${p.slug}`} className="hover:text-[color:var(--accent)]">{p.name}</Link></th>
                    <td className="p-5 text-ink-2">Ages {p.ages}</td>
                    <td className="p-5 text-ink-2">{p.duration}</td>
                    <td className="p-5 text-ink-2">{p.format}</td>
                    <td className="p-5">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-md max-w-2xl">The people who came before you.</h2>
            <Link href="/leaders/alumni" className="link-arrow">Meet all the leaders <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
          </div>
          <ul className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {featuredFellows.map((f) => (
              <li key={f.id}>
                <Link href={`/leaders/alumni?fellow=${f.id}`} className="group block">
                  <Portrait name={f.name} initials={f.initials} image={f.image} sizes="200px" />
                  <div className="mt-3 font-semibold text-[15px] group-hover:text-[color:var(--accent)]">{f.name}</div>
                  <div className="text-[13px] text-muted">{f.role}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
