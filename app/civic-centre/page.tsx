import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HardHat } from "lucide-react";
import { civicCentre, milestones, supporterTiers } from "@/mock/civic-centre";
import { getCampaign } from "@/mock/campaigns";
import { founder } from "@/mock/founder";
import { compactNaira, cn, daysLeft, formatNaira, formatNumber, percent } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { Photo } from "@/components/ui/photo";
import { ProgressBar } from "@/components/ui/progress";
import { PullQuote } from "@/components/ui/pull-quote";
import { NamingTable } from "./naming-table";

export const metadata: Metadata = {
  title: "The Okafor Civic Centre — capital campaign",
  description: "A permanent, public home for young leaders and civic life in Enugu. See the vision, building milestones, campaign progress, naming opportunities and our founding supporters.",
  openGraph: { images: [civicCentre.hero] },
};

export default function CivicCentrePage() {
  const c = civicCentre.campaign;
  const pct = percent(c.raised, c.goal);
  const campaign = getCampaign("build-the-civic-centre")!;
  const maxBudget = Math.max(...c.breakdown.map((b) => b.amount));

  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink on-dark overflow-hidden">
        <Photo src={civicCentre.hero} alt="Architectural rendering placeholder of the civic centre’s white façade" priority kenburns className="absolute inset-0" sizes="100vw" />
        <div className="absolute inset-0 shade-b" aria-hidden="true" />
        <div className="absolute inset-0 shade-l opacity-80" aria-hidden="true" />
        <div className="relative container-x min-h-[78svh] flex flex-col justify-end pt-32 pb-14 md:pb-20">
          <div className="eyebrow fade-up">Capital campaign · {civicCentre.place}</div>
          <h1 className="display-xl text-white mt-6 max-w-[16ch] fade-up delay-1">A home for civic life.</h1>
          <p className="mt-8 text-lg md:text-xl text-[#E6E6E6] max-w-2xl fade-up delay-2">The Okafor Civic Centre will open in {civicCentre.opening}: a public square, a 600-seat Democracy Hall, a civic library and archive, studios and a residence for young leaders. Free to enter, open late, built to last a century.</p>
          <div className="mt-10 flex flex-wrap gap-3 fade-up delay-3">
            <Link href="/donate?campaign=civic-centre&amount=1000000" className="btn btn-accent btn-lg">Give to the campaign</Link>
            <a href="#naming" className="btn btn-outline-light btn-lg">Naming opportunities</a>
          </div>
        </div>
      </section>

      {/* Progress band */}
      <section className="bg-white border-b border-line" aria-labelledby="progress-h">
        <div className="container-x py-12 md:py-16 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7 min-w-0">
            <h2 id="progress-h" className="eyebrow">Capital campaign progress</h2>
            <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-display text-[clamp(2.6rem,7vw,6rem)] font-medium tracking-[-0.055em] leading-none tabular">{compactNaira(c.raised)}</span>
              <span className="text-lg text-muted">raised of {compactNaira(c.goal)}</span>
            </div>
            <div className="mt-6"><ProgressBar value={c.raised} goal={c.goal} accent label={`Capital campaign ${pct}% funded`} /></div>
            <div className="mt-2 flex justify-between text-[13px] text-muted tabular"><span>₦0</span><span>{pct}%</span><span>{compactNaira(c.goal)}</span></div>
          </div>
          <dl className="lg:col-span-5 grid grid-cols-3 border-t lg:border-t-0 lg:border-l border-line lg:pl-10 pt-6 lg:pt-0 gap-3 sm:gap-4 min-w-0">
            <div className="min-w-0"><dt className="text-[12.5px] sm:text-[13px] text-muted">Founding supporters</dt><dd className="mt-1 font-display text-[1.4rem] sm:text-3xl tracking-[-0.04em] tabular">{formatNumber(c.donors)}</dd></div>
            <div className="min-w-0"><dt className="text-[12.5px] sm:text-[13px] text-muted">Still to raise</dt><dd className="mt-1 font-display text-[1.4rem] sm:text-3xl tracking-[-0.04em] tabular">{compactNaira(c.goal - c.raised)}</dd></div>
            <div className="min-w-0"><dt className="text-[12.5px] sm:text-[13px] text-muted">Days left</dt><dd className="mt-1 font-display text-[1.4rem] sm:text-3xl tracking-[-0.04em] tabular">{daysLeft(c.deadline)}</dd></div>
          </dl>
        </div>
      </section>

      {/* Vision */}
      <section className="section bg-white">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="eyebrow"><span className="eyebrow-num">01</span><span aria-hidden="true" className="w-8 h-px bg-current" />The vision</div>
            <h2 className="display-md mt-5">Enugu has always been a city of ideas. Now they have a home.</h2>
          </div>
          <div className="lg:col-span-7 prose-civic">
            {civicCentre.vision.map((p, i) => <p key={i} className={i === 0 ? "dropcap" : undefined}>{p}</p>)}
          </div>
        </div>
        <div className="container-x mt-16 grid sm:grid-cols-2 lg:grid-cols-4 border-t border-line">
          {civicCentre.principles.map((p, i) => (
            <div key={p.title} className={cn("pt-8 pb-4 sm:pr-8", i > 0 && "lg:border-l lg:pl-8 border-line")}>
              <h3 className="font-display text-xl font-medium tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-2 text-[15px] text-ink-2">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rendering */}
      <section className="bg-stone section" aria-labelledby="rendering-h">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="eyebrow"><span className="eyebrow-num">02</span><span aria-hidden="true" className="w-8 h-px bg-current" />The building</div>
              <h2 id="rendering-h" className="display-md mt-5">Designed by {civicCentre.architect.split(" (")[0]}.</h2>
            </div>
            <dl className="flex flex-wrap gap-x-8 gap-y-3 text-[14px]">
              <div><dt className="text-muted">Site</dt><dd className="font-semibold">{civicCentre.site}</dd></div>
              <div><dt className="text-muted">Floor area</dt><dd className="font-semibold">{civicCentre.floorArea}</dd></div>
              <div><dt className="text-muted">Opens</dt><dd className="font-semibold">{civicCentre.opening}</dd></div>
            </dl>
          </div>
          <figure className="mt-10">
            <Photo src={civicCentre.rendering} alt="Architectural rendering placeholder: a modern glass and metal civic building at dusk" className="aspect-[16/9]" sizes="(min-width:1320px) 1240px, 100vw">
              <span className="absolute top-4 left-4 tag !bg-white">Rendering placeholder</span>
            </Photo>
            <figcaption className="mt-3 text-[13px] text-muted">Replace with your architect’s rendering. Image shown is a stand-in photograph.</figcaption>
          </figure>
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-line bg-white">
            {civicCentre.spaces.map((s, i) => (
              <li key={s.name} className="p-6 md:p-7 border-r border-b border-line">
                <span className="font-display text-sm tabular text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-xl font-medium tracking-[-0.02em]">{s.name}</h3>
                <p className="mt-1 text-[14.5px] text-ink-2">{s.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Milestones */}
      <section className="section bg-white" aria-labelledby="milestones-h">
        <div className="container-x">
          <div className="eyebrow"><span className="eyebrow-num">03</span><span aria-hidden="true" className="w-8 h-px bg-current" />Building milestones</div>
          <h2 id="milestones-h" className="display-md mt-5 max-w-3xl">From empty site to open doors.</h2>
          <ol className="mt-14 grid md:grid-cols-4 gap-x-6 gap-y-10">
            {milestones.map((m) => (
              <li key={m.title} className="relative">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "w-3.5 h-3.5 rounded-full border shrink-0",
                      m.status === "done" && "bg-[color:var(--ink)] border-[color:var(--ink)]",
                      m.status === "current" && "bg-[color:var(--accent)] border-[color:var(--accent)] ring-4 ring-[color:var(--accent-soft)]",
                      m.status === "next" && "bg-white border-[#9A9A9A]"
                    )}
                  />
                  <span className={cn("h-px flex-1", m.status === "next" ? "bg-[color:var(--line)]" : "bg-[color:var(--ink)]")} aria-hidden="true" />
                </div>
                <p className="mt-5 text-[13px] font-semibold tabular">{m.date} <span className="sr-only">— {m.status === "done" ? "completed" : m.status === "current" ? "in progress" : "upcoming"}</span>{m.status === "current" && <span className="tag tag-accent ml-2" aria-hidden="true">Now</span>}</p>
                <h3 className={cn("mt-2 font-display text-xl font-medium tracking-[-0.02em]", m.status === "next" && "text-ink-2")}>{m.title}</h3>
                <p className="mt-2 text-[14.5px] text-muted">{m.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {civicCentre.gallery.map((g) => (
              <figure key={g.src}>
                <Photo src={g.src} alt={g.alt} className="aspect-[4/3]" sizes="(min-width:1024px) 420px, 100vw" />
                <figcaption className="mt-3 text-[13px] text-muted">{g.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4 border border-line p-6">
            <HardHat className="w-6 h-6" strokeWidth={1.25} aria-hidden="true" />
            <p className="flex-1 min-w-[240px] text-[15px]">See it for yourself. Join a monthly hard-hat tour with the architects.</p>
            <Link href="/events#civic-centre-hard-hat-tour" className="btn btn-outline btn-sm">Book a site tour</Link>
          </div>
        </div>
      </section>

      {/* Use of funds + donate */}
      <section className="bg-ink on-dark section" aria-labelledby="funds-h">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <div className="eyebrow"><span className="eyebrow-num">04</span><span aria-hidden="true" className="w-8 h-px bg-current" />Use of funds</div>
            <h2 id="funds-h" className="display-md text-white mt-5">Every naira, accounted for.</h2>
            <p className="lede mt-6">Capital gifts are held in a separate, restricted account at {siteConfig.donation.bank.bankName}, audited annually, with {Math.round(c.endowmentShare * 100)}% of each gift transferred to the operations endowment.</p>
            <ul className="mt-10 space-y-5">
              {c.breakdown.map((b) => (
                <li key={b.label}>
                  <div className="flex justify-between gap-4 text-[14.5px]"><span>{b.label}</span><span className="font-semibold tabular text-white">{compactNaira(b.amount)}</span></div>
                  <div className="bar mt-2" aria-hidden="true"><span style={{ width: `${(b.amount / maxBudget) * 100}%` }} /></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:border-l border-dark lg:pl-12">
            <h3 className="display-sm text-white">Give to the capital campaign</h3>
            <p className="mt-3 text-on-dark-muted">Choose an amount — your gift is designated to the Civic Centre automatically.</p>
            <ul className="mt-8 border-t border-dark">
              {[
                { amount: 150_000, label: "An engraved paver on the Path of Citizens" },
                { amount: 500_000, label: "A tree in the Founders’ Grove" },
                { amount: 1_000_000, label: "A named seat in Democracy Hall" },
                { amount: 5_000_000, label: "A reading carrel in the Civic Library" },
              ].map((o) => (
                <li key={o.amount} className="border-b border-dark">
                  <Link href={`/donate?campaign=civic-centre&amount=${o.amount}`} className="group flex items-center justify-between gap-6 py-5 min-h-[44px]">
                    <span><span className="block font-display text-2xl text-white tabular tracking-[-0.03em]">{formatNaira(o.amount)}</span><span className="text-[14px] text-on-dark-muted">{o.label}</span></span>
                    <ArrowRight className="w-5 h-5 text-white transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/donate?campaign=civic-centre" className="btn btn-accent btn-lg">Give any amount</Link>
              <Link href={`/campaigns/${campaign.slug}`} className="btn btn-outline-light btn-lg">Campaign updates</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Naming */}
      <section id="naming" className="section bg-white scroll-mt-20" aria-labelledby="naming-h">
        <div className="container-x">
          <div className="eyebrow"><span className="eyebrow-num">05</span><span aria-hidden="true" className="w-8 h-px bg-current" />Naming opportunities</div>
          <div className="mt-5 grid lg:grid-cols-12 gap-8 items-end">
            <h2 id="naming-h" className="display-md lg:col-span-7">Put a name on the building — for a century.</h2>
            <p className="lede lg:col-span-5">Honour a teacher, a parent, a company or a cause. From a ₦150,000 paver to Democracy Hall itself.</p>
          </div>
          <div className="mt-12"><NamingTable /></div>
        </div>
      </section>

      {/* Founding Supporters */}
      <section className="section bg-stone" aria-labelledby="wall-h">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <div className="eyebrow"><span className="eyebrow-num">06</span><span aria-hidden="true" className="w-8 h-px bg-current" />Founding Supporters</div>
              <h2 id="wall-h" className="display-md mt-5">The people building it with us.</h2>
            </div>
            <p className="lg:col-span-5 text-ink-2">Every founding supporter who gives ₦1 million or more will be carved into the stone wall at the entrance to the public square. Gifts of any size are listed in the opening-day programme.</p>
          </div>
          <div className="mt-14 space-y-14">
            {supporterTiers.map((t) => (
              <div key={t.id} className="grid lg:grid-cols-12 gap-6 border-t border-[color:var(--ink)] pt-6">
                <div className="lg:col-span-3">
                  <h3 className="font-display text-2xl font-medium tracking-[-0.03em]">{t.name}</h3>
                  <p className="text-[13.5px] text-muted mt-1">{compactNaira(t.min)} and above</p>
                </div>
                <ul className={cn("lg:col-span-9 grid gap-x-8 gap-y-3", t.id === "cornerstone" ? "sm:grid-cols-2" : "sm:grid-cols-2 md:grid-cols-3")}>
                  {t.names.map((n) => (
                    <li key={n} className={cn(t.id === "cornerstone" ? "font-display text-2xl md:text-3xl tracking-[-0.03em]" : t.id === "pillar" ? "font-display text-xl tracking-[-0.02em]" : "text-[15px]", n.startsWith("and ") && "text-muted italic")}>{n}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap gap-3">
            <Link href="/donate?campaign=civic-centre&amount=1000000" className="btn btn-ink btn-lg">Add your name — from ₦1,000,000</Link>
            <a href="#naming" className="btn btn-outline btn-lg">Reserve a named space</a>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <PullQuote text="I want a girl from Gidan Madi to walk in, sit at the same table as a minister, and be heard." by={founder.name} context="On the Civic Centre" size="md" />
          <p className="mt-10 text-[14px] text-muted">Questions about the campaign or a major gift? Email <a className="link" href={`mailto:${siteConfig.brand.campaignEmail}`}>{siteConfig.brand.campaignEmail}</a> or call {siteConfig.brand.phone}.</p>
        </div>
      </section>
    </>
  );
}
