import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn, compactNaira, formatNaira, formatNumber, percent } from "@/lib/utils";
import { Photo } from "@/components/ui/photo";
import { SectionHead } from "@/components/ui/section-head";
import { PullQuote } from "@/components/ui/pull-quote";
import { ProgressBar } from "@/components/ui/progress";
import { CampaignCard, EventRow, LeaderProgrammeCard, ProgrammeCard, StoryCard } from "@/components/ui/cards";
import { Portrait } from "@/components/ui/portrait";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { founder } from "@/mock/founder";
import { headlineStats } from "@/mock/impact";
import { leaderProgrammes } from "@/mock/leaders";
import { featuredFellows } from "@/mock/alumni";
import { civicCentre, milestones } from "@/mock/civic-centre";
import { pledge } from "@/mock/pledge";
import { programmes } from "@/mock/programmes";
import { campaigns } from "@/mock/campaigns";
import { stories } from "@/mock/stories";
import { events } from "@/mock/events";
import { partners } from "@/mock/partners";
import { perThousand } from "@/mock/financials";
import { photo } from "@/mock/images";
import { PartnerWordmark } from "@/components/ui/partner-wordmark";

export function HeroModule() {
  const h = siteConfig.home;
  return (
    <section className="relative bg-ink on-dark overflow-hidden">
      <Photo src={photo("speakerCrowd", 2200)} alt="A young leader addressing a packed hall" priority kenburns className="absolute inset-0" sizes="100vw" />
      <div className="absolute inset-0 shade-b" aria-hidden="true" />
      <div className="absolute inset-0 shade-l opacity-70" aria-hidden="true" />
      <div className="relative container-x min-h-[calc(100svh-116px)] max-h-[960px] flex flex-col justify-end pt-32 pb-14 md:pb-20">
        <div className="eyebrow fade-up">Founded by {founder.name} · Abuja · Est. {siteConfig.org.founded}</div>
        <h1 className="display-xl text-white mt-6 max-w-[14ch] fade-up delay-1">The next generation is ready to lead.</h1>
        <div className="mt-10 grid md:grid-cols-[1fr_auto] gap-8 items-end fade-up delay-2">
          <p className="text-lg md:text-xl text-[#E6E6E6] max-w-xl leading-relaxed">{siteConfig.brand.tagline} Fellowships, mentoring and a new civic centre in Enugu — built for the long term.</p>
          <div className="flex flex-wrap gap-3">
            <Link href={h.heroCta.href} className="btn btn-white btn-lg">{h.heroCta.label} <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
            <Link href={h.heroCtaSecondary.href} className="btn btn-outline-light btn-lg">{h.heroCtaSecondary.label}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FounderNoteModule() {
  return (
    <section className="section bg-white">
      <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5">
          <Photo src={founder.portrait} alt={`Portrait of ${founder.name}`} className="aspect-[4/5]" sizes="(min-width:1024px) 520px, 100vw" />
          <p className="mt-3 text-[13px] text-muted">{founder.name}, Founder & Chair</p>
        </div>
        <div className="lg:col-span-7">
          <div className="eyebrow"><span className="eyebrow-num">01</span><span aria-hidden="true" className="w-8 h-px bg-current" />From our founder</div>
          <PullQuote className="mt-8" text={founder.quotes[0].text} by={founder.name} context={founder.quotes[0].context} />
          <p className="lede mt-10 max-w-xl">{founder.short}</p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/founder" className="link-arrow">Read her letter <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
            <Link href="/founder#video" className="link-arrow">Watch: why I started this</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NumbersModule() {
  return (
    <section className="bg-white border-y border-line">
      <div className="container-x">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {headlineStats.map((s, i) => (
            <div key={s.label} className={cn("py-12 md:py-16 pr-6", i % 2 === 1 && "pl-6 border-l border-line", i >= 2 && "border-t lg:border-t-0 border-line", i === 2 && "lg:border-l lg:pl-8", i % 2 === 1 && "lg:pl-8")}>
              <dd className="font-display text-[clamp(2.6rem,5vw,4.4rem)] font-medium tracking-[-0.05em] leading-none tabular">{s.value}</dd>
              <dt className="mt-4 text-[15px] font-semibold">{s.label}</dt>
              <p className="mt-1 text-[13.5px] text-muted">{s.note}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function LeadersModule() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHead
          index="02"
          eyebrow="Leaders programmes"
          title="We find people already doing the work — and help them go further."
          lede="Four programmes, from a teenager’s first mentor to a fellowship for Africa’s most promising public leaders."
          href="/leaders"
          linkLabel="All programmes"
        />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {leaderProgrammes.map((p) => <LeaderProgrammeCard key={p.slug} p={p} />)}
        </div>
      </div>
    </section>
  );
}

export function AlumniModule() {
  return (
    <section className="section bg-stone">
      <div className="container-x">
        <SectionHead index="03" eyebrow="Meet the leaders" title="162 fellows. 31 countries. One network that answers the phone." href="/leaders/alumni" linkLabel="Meet all the leaders" />
        <ul className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {featuredFellows.map((f) => (
            <li key={f.id} className="group">
              <Link href={`/leaders/alumni?fellow=${f.id}`} className="block">
                <Portrait name={f.name} initials={f.initials} image={f.image} sizes="(min-width:1024px) 200px, 50vw" />
                <div className="mt-3 font-semibold text-[15px] group-hover:text-[color:var(--accent)]">{f.name}</div>
                <div className="text-[13px] text-muted">{f.country} · Cohort {f.cohort}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CivicCentreModule() {
  const c = civicCentre.campaign;
  const pct = percent(c.raised, c.goal);
  const current = milestones.find((m) => m.status === "current");
  return (
    <section className="bg-ink on-dark">
      <Photo src={civicCentre.rendering} alt="Architectural rendering placeholder of the Okafor Civic Centre" className="aspect-[16/9] md:aspect-[21/8]" sizes="100vw">
        <div className="absolute inset-0 shade-b" aria-hidden="true" />
        <div className="absolute left-0 right-0 bottom-0 container-x pb-8">
          <span className="tag tag-ink !bg-white !text-[color:var(--ink)] !border-white">Rendering · Studio Ọkwụ Architects</span>
        </div>
      </Photo>
      <div className="container-x section-sm grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <div className="eyebrow"><span className="eyebrow-num">04</span><span aria-hidden="true" className="w-8 h-px bg-current" />Capital campaign</div>
          <h2 className="display-md text-white mt-5">A permanent home for civic life in Enugu.</h2>
          <p className="lede mt-6 max-w-xl">{civicCentre.vision[1]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/donate?campaign=civic-centre&amount=1000000" className="btn btn-accent btn-lg">Give to the Civic Centre</Link>
            <Link href="/civic-centre" className="btn btn-outline-light btn-lg">Explore the building</Link>
          </div>
        </div>
        <div className="lg:col-span-5 lg:border-l border-dark lg:pl-10">
          <div className="font-display text-[clamp(2.6rem,5vw,4rem)] font-medium tracking-[-0.05em] leading-none text-white tabular">{compactNaira(c.raised)}</div>
          <p className="mt-2 text-on-dark-muted">raised of {compactNaira(c.goal)} · {pct}%</p>
          <div className="mt-6"><ProgressBar value={c.raised} goal={c.goal} label={`Civic Centre capital campaign ${pct}% funded`} /></div>
          <dl className="mt-8 grid grid-cols-2 gap-6 text-[14px]">
            <div><dt className="text-on-dark-muted">Founding supporters</dt><dd className="mt-1 font-display text-2xl text-white tabular">{formatNumber(c.donors)}</dd></div>
            <div><dt className="text-on-dark-muted">Opening</dt><dd className="mt-1 font-display text-2xl text-white">{civicCentre.opening}</dd></div>
          </dl>
          {current && <p className="mt-8 pt-6 border-t border-dark text-[14px] text-on-dark-muted"><span className="text-white font-semibold">Now: {current.title}.</span> {current.body}</p>}
        </div>
      </div>
    </section>
  );
}

export function MovementModule() {
  const pct = percent(pledge.base, pledge.goal);
  return (
    <section className="section bg-white">
      <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6">
          <div className="eyebrow"><span className="eyebrow-num">05</span><span aria-hidden="true" className="w-8 h-px bg-current" />The movement</div>
          <h2 className="display-md mt-5">Commit to serve in your community.</h2>
          <p className="lede mt-6 max-w-lg">Leadership isn’t a title. Join {formatNumber(pledge.base)} people who have pledged to give their time — and help us reach {formatNumber(pledge.goal)} by {pledge.goalBy}.</p>
          <div className="mt-8 max-w-lg">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-5xl font-medium tracking-[-0.05em] tabular">{formatNumber(pledge.base)}</span>
              <span className="text-muted text-[14px]">goal {formatNumber(pledge.goal)}</span>
            </div>
            <div className="mt-4"><ProgressBar value={pledge.base} goal={pledge.goal} accent label={`Pledges: ${pct}% of goal`} /></div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/get-involved#pledge" className="btn btn-ink btn-lg">Take the pledge</Link>
            <Link href="/events" className="btn btn-outline btn-lg">Find a day of service</Link>
          </div>
        </div>
        <div className="lg:col-span-6">
          <Photo src={photo("armsAround")} alt="Young people standing together with arms around each other’s shoulders" className="aspect-[5/4]" sizes="(min-width:1024px) 620px, 100vw" />
          <ul className="mt-6 divide-y divide-[color:var(--line)] border-y border-line" aria-label="Recent pledges">
            {pledge.recent.slice(0, 3).map((r) => (
              <li key={r.name + r.when} className="flex items-center justify-between gap-4 py-3 text-[14px]">
                <span><span className="font-semibold">{r.name}</span> <span className="text-muted">in {r.place}</span> — {r.commitment.toLowerCase()}</span>
                <span className="text-muted text-[12.5px] shrink-0">{r.when}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ProgrammesModule() {
  return (
    <section className="section bg-stone">
      <div className="container-x">
        <SectionHead index="06" eyebrow="What we do" title="Five pillars, one purpose: better leadership for Africa." href="/programmes" linkLabel="All programmes" />
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12">
          {programmes.map((p, i) => <ProgrammeCard key={p.slug} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

export function CampaignsModule() {
  return (
    <section className="section bg-white">
      <div className="container-x">
        <SectionHead index="07" eyebrow="Current appeals" title="Where your gift goes furthest right now." href="/campaigns" linkLabel="All campaigns" />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.slice(1, 4).map((c) => <CampaignCard key={c.slug} c={c} />)}
        </div>
      </div>
    </section>
  );
}

export function StoriesModule() {
  const [lead, ...rest] = stories;
  return (
    <section className="section bg-white border-t border-line">
      <div className="container-x">
        <SectionHead index="08" eyebrow="Stories" title="Notes from the work." href="/stories" linkLabel="All stories" />
        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-7"><StoryCard s={lead} large /></div>
          <div className="lg:col-span-5 grid gap-10">
            {rest.slice(0, 2).map((s) => <StoryCard key={s.slug} s={s} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function EventsModule() {
  return (
    <section className="section bg-stone">
      <div className="container-x">
        <SectionHead index="09" eyebrow="Upcoming" title="Show up. In person." href="/events" linkLabel="All events" />
        <div className="mt-10 border-t border-line">
          {events.slice(0, 3).map((e) => (
            <EventRow key={e.slug} e={e} action={<Link href={`/events#${e.slug}`} className="btn btn-outline btn-sm w-full md:w-auto">{e.volunteer ? "Volunteer" : "Register"}</Link>} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnersModule() {
  return (
    <section className="section-sm bg-white">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="eyebrow">In partnership with</div>
          <Link href="/partnerships" className="link-arrow">Become a partner <ArrowUpRight className="w-4 h-4" aria-hidden="true" /></Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 md:grid-cols-5 border-t border-l border-line">
          {partners.map((p) => (
            <li key={p.name} className="border-r border-b border-line h-28 flex items-center justify-center px-4 text-center">
              <PartnerWordmark p={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function TransparencyModule() {
  return (
    <section className="section bg-white border-t border-line">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="eyebrow"><span className="eyebrow-num">10</span><span aria-hidden="true" className="w-8 h-px bg-current" />Transparency</div>
          <h2 className="display-md mt-5">Of every ₦1,000 you give.</h2>
          <p className="lede mt-6">Audited accounts, a learning report that includes our failures, and a founder who takes no salary.</p>
          <Link href="/transparency" className="link-arrow mt-6">See our finances <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
        </div>
        <ul className="lg:col-span-7 border-t border-line">
          {perThousand.map((r) => (
            <li key={r.label} className="grid grid-cols-[90px_1fr] md:grid-cols-[120px_1fr_200px] gap-4 items-center py-4 border-b border-line">
              <span className="font-display text-2xl md:text-3xl font-medium tracking-[-0.04em] tabular">{formatNaira(r.amount)}</span>
              <span className="text-[15px]">{r.label}</span>
              <span className="hidden md:block bar" aria-hidden="true"><span style={{ width: `${(r.amount / 380) * 100}%` }} /></span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CommunityModule() {
  return (
    <section className="bg-ink on-dark">
      <div className="container-x section grid lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-7">
          <h2 className="display-lg text-white">Africa doesn’t lack leaders. Help us build the ladders.</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/donate" className="btn btn-accent btn-lg">Donate</Link>
            <Link href="/leaders/apply" className="btn btn-outline-light btn-lg">Apply</Link>
            <Link href="/get-involved" className="btn btn-outline-light btn-lg">Get involved</Link>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="eyebrow mb-5">Join the community</div>
          <NewsletterForm dark cta="Join" />
        </div>
      </div>
    </section>
  );
}
