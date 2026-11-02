import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { leaderProgrammes, getLeaderProgramme } from "@/mock/leaders";
import { fellows } from "@/mock/alumni";
import { Photo } from "@/components/ui/photo";
import { Portrait } from "@/components/ui/portrait";
import { cn, formatDate, formatNaira, daysLeft } from "@/lib/utils";

export function generateStaticParams() {
  return leaderProgrammes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getLeaderProgramme(slug);
  if (!p) return { title: "Programme not found" };
  return { title: p.name, description: p.summary, openGraph: { images: [p.image] } };
}

export default async function LeaderProgrammePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getLeaderProgramme(slug);
  if (!p) notFound();
  const alumni = fellows.filter((f) => f.programme === p.slug).slice(0, 4);
  const applyHref = p.applyable ? `/leaders/apply?programme=${p.slug}` : "/get-involved#volunteer";

  return (
    <>
      <section className="bg-white">
        <div className="container-x pt-14 md:pt-20 pb-12">
          <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
            <Link href="/leaders" className="hover:text-[color:var(--ink)] underline-offset-4 hover:underline">Leaders programmes</Link> <span aria-hidden="true">/</span> <span aria-current="page">{p.short}</span>
          </nav>
          <div className="mt-8 grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <div className="eyebrow fade-up">{p.kicker}</div>
              <h1 className="display-lg mt-5 fade-up delay-1">{p.name}</h1>
              <p className="lede mt-6 max-w-2xl fade-up delay-2">{p.summary}</p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 fade-up delay-3">
              <span className={cn("tag w-fit", p.status === "Applications open" && "tag-accent")}>
                {p.status}{p.deadline && p.status === "Applications open" ? ` · ${daysLeft(p.deadline)} days left` : ""}
              </span>
              <Link href={applyHref} className="btn btn-ink btn-lg">{p.applyable ? "Apply now" : "Become a mentor"} <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
              {p.deadline && <p className="text-[13px] text-muted">Deadline: {formatDate(p.deadline)}, 23:59 WAT</p>}
            </div>
          </div>
        </div>
        <div className="container-x">
          <Photo src={p.image} alt="" priority kenburns className="aspect-[16/9] md:aspect-[21/8]" sizes="(min-width:1320px) 1320px, 100vw" />
        </div>
      </section>

      <section className="bg-white">
        <div className="container-x">
          <dl className="grid grid-cols-2 lg:grid-cols-4 border-b border-line">
            {p.facts.map((f, i) => (
              <div key={f.label} className={cn("py-10 pr-4", i > 0 && "lg:border-l lg:pl-8 border-line", i % 2 === 1 && "border-l pl-6 border-line")}>
                <dd className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.05em] tabular">{f.value}</dd>
                <dt className="mt-2 text-[14px] text-muted">{f.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <div className="eyebrow">About the programme</div>
            <div className="prose-civic mt-6">{p.intro.map((t, i) => <p key={i}>{t}</p>)}</div>

            <h2 id="eligibility" className="display-sm mt-16">Who can apply</h2>
            <ul className="mt-6 border-t border-line">
              {p.eligibility.map((e) => (
                <li key={e} className="flex gap-4 py-4 border-b border-line text-[15.5px]">
                  <Check className="w-5 h-5 mt-0.5 shrink-0" strokeWidth={1.5} aria-hidden="true" /> {e}
                </li>
              ))}
            </ul>
          </div>
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 border border-line p-7 md:p-8">
              <h2 className="eyebrow">At a glance</h2>
              <dl className="mt-5 divide-y divide-[color:var(--line)] text-[14.5px]">
                {[["Ages", p.ages], ["Duration", p.duration], ["Format", p.format], ["Cohort", p.cohortSize], ["Cost", p.cost]].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-3"><dt className="text-muted">{k}</dt><dd className="text-right font-medium">{v}</dd></div>
                ))}
              </dl>
              <h3 className="mt-8 font-semibold">What you receive</h3>
              <ul className="mt-3 space-y-2 text-[14.5px] text-ink-2">
                {p.benefits.map((b) => <li key={b} className="flex gap-3"><span aria-hidden="true" className="mt-2.5 w-3 h-px bg-current shrink-0" />{b}</li>)}
              </ul>
              <Link href={applyHref} className="btn btn-ink w-full mt-8">{p.applyable ? "Start your application" : "Apply to mentor"}</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-stone">
        <div className="container-x">
          <div className="eyebrow">Timeline</div>
          <h2 className="display-md mt-5">Key dates</h2>
          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {p.timeline.map((t, i) => (
              <li key={t.label} className="border-t border-[color:var(--ink)] pt-5">
                <div className="flex items-center justify-between text-[13px] text-muted"><span className="tabular">{String(i + 1).padStart(2, "0")}</span><span className="font-semibold text-[color:var(--ink)]">{t.date}</span></div>
                <h3 className="mt-4 font-display text-xl font-medium tracking-[-0.02em]">{t.label}</h3>
                {t.detail && <p className="mt-2 text-[14.5px] text-ink-2">{t.detail}</p>}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <div className="eyebrow">Curriculum</div>
          <h2 className="display-md mt-5">What you’ll learn — and do.</h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
            {p.curriculum.map((c, i) => (
              <div key={c.title} className="p-7 md:p-8 border-r border-b border-line">
                <span className="font-display text-sm tabular text-muted">Module {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-2xl font-medium tracking-[-0.03em]">{c.title}</h3>
                <p className="mt-3 text-[15px] text-ink-2">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {alumni.length > 0 && (
        <section className="section bg-white border-t border-line">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="eyebrow">Alumni</div>
                <h2 className="display-md mt-5">Leaders from this programme</h2>
              </div>
              <Link href="/leaders/alumni" className="link-arrow">See all alumni <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
            </div>
            <ul className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {alumni.map((f) => (
                <li key={f.id}>
                  <Link href={`/leaders/alumni?fellow=${f.id}`} className="group block">
                    <Portrait name={f.name} initials={f.initials} image={f.image} />
                    <div className="mt-4 font-semibold group-hover:text-[color:var(--accent)]">{f.name}</div>
                    <div className="text-[13.5px] text-muted">{f.role} · {f.country}</div>
                    <p className="mt-3 text-[14.5px] text-ink-2 italic">“{f.quote}”</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-ink on-dark section">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="eyebrow">Sponsor a place</div>
            <h2 className="display-md text-white mt-5">{p.sponsorLine}</h2>
            <p className="lede mt-5 max-w-xl">Gifts of any size are pooled. Sponsors of a full place meet the participant they support and receive their project report.</p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link href={`/donate?designation=leaders:${p.slug}&amount=${p.sponsorAmount}`} className="btn btn-accent btn-lg">Sponsor for {formatNaira(p.sponsorAmount)}</Link>
            <Link href={`/donate?designation=leaders:${p.slug}`} className="btn btn-outline-light btn-lg">Give any amount</Link>
          </div>
        </div>
      </section>
    </>
  );
}
