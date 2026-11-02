import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import type { Campaign, EventItem, LeaderProgramme, Programme, Story } from "@/lib/types";
import { formatDate, formatNaira } from "@/lib/utils";
import { Photo } from "./photo";
import { CampaignProgress } from "./progress";
import { Icon } from "./icon";

export function CampaignCard({ c }: { c: Campaign }) {
  return (
    <article className="group card flex flex-col h-full">
      <Link href={`/campaigns/${c.slug}`} className="block" tabIndex={-1} aria-hidden="true">
        <Photo src={c.image} alt="" className="aspect-[3/2]" sizes="(min-width:1024px) 420px, 100vw" imgClassName="photo-reveal group-hover:scale-[1.03]" />
      </Link>
      <div className="p-6 md:p-7 flex flex-col flex-1">
        <div className="eyebrow">{c.kicker}</div>
        <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.03em] leading-tight">
          <Link href={`/campaigns/${c.slug}`} className="hover:text-[color:var(--accent)]">{c.title}</Link>
        </h3>
        <p className="mt-3 text-[15px] text-ink-2 line-clamp-3">{c.summary}</p>
        <div className="mt-auto pt-7">
          <CampaignProgress raised={c.raised} goal={c.goal} donors={c.donors} deadline={c.deadline} title={c.title} />
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href={`/donate?campaign=${c.slug}`} className="btn btn-ink btn-sm">Give now</Link>
            <Link href={c.featuredHref ?? `/campaigns/${c.slug}`} className="btn btn-outline btn-sm">Read more</Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function StoryCard({ s, large }: { s: Story; large?: boolean }) {
  return (
    <article className="group">
      <Link href={`/stories/${s.slug}`} className="block">
        <Photo src={s.image} alt="" className={large ? "aspect-[4/3]" : "aspect-[3/2]"} sizes="(min-width:1024px) 600px, 100vw" imgClassName="photo-reveal group-hover:scale-[1.03]" />
        <div className="mt-5 flex items-center gap-3 text-[12.5px] text-muted">
          <span className="font-semibold uppercase tracking-[.12em] text-[color:var(--ink)]">{s.category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={s.date}>{formatDate(s.date, { day: "numeric", month: "short", year: "numeric" })}</time>
          <span aria-hidden="true">·</span>
          <span>{s.readMins} min read</span>
        </div>
        <h3 className={`mt-3 font-display font-medium tracking-[-0.03em] leading-[1.1] group-hover:text-[color:var(--accent)] ${large ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>{s.title}</h3>
        <p className="mt-3 text-[15px] text-ink-2 line-clamp-2">{s.excerpt}</p>
      </Link>
    </article>
  );
}

export function EventRow({ e, action }: { e: EventItem; action?: React.ReactNode }) {
  const d = new Date(e.date);
  return (
    <article className="grid grid-cols-[72px_1fr] md:grid-cols-[110px_1fr_auto] gap-5 md:gap-8 py-7 border-b border-line items-start">
      <div className="text-center border border-line py-3">
        <div className="text-[11px] font-semibold uppercase tracking-[.14em] text-muted">{d.toLocaleDateString("en-NG", { month: "short" })}</div>
        <div className="font-display text-3xl md:text-4xl font-medium tracking-[-0.04em] tabular">{d.getDate()}</div>
        <div className="text-[11px] text-muted tabular">{d.getFullYear()}</div>
      </div>
      <div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="tag">{e.kind}</span>
          {e.volunteer && <span className="tag tag-accent">Volunteers needed</span>}
        </div>
        <h3 className="mt-3 font-display text-xl md:text-2xl font-medium tracking-[-0.03em]">{e.title}</h3>
        <p className="mt-2 text-[15px] text-ink-2 max-w-2xl">{e.summary}</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[13.5px] text-muted">
          <span className="inline-flex items-center gap-1.5"><CalendarDays className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" /> {e.time}</span>
          <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" /> {e.location}, {e.state}</span>
          <span>{e.price ? formatNaira(e.price) : "Free"} · {e.spotsLeft} places left</span>
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 md:self-center">{action}</div>
    </article>
  );
}

export function ProgrammeCard({ p, index }: { p: Programme; index: number }) {
  return (
    <Link href={`/programmes/${p.slug}`} className="group block border-t border-line pt-6 h-full">
      <div className="flex items-center justify-between">
        <span className="eyebrow-num font-display text-sm tabular">{String(index + 1).padStart(2, "0")}</span>
        <Icon name={p.icon} className="w-6 h-6 text-[color:var(--ink)]" />
      </div>
      <h3 className="mt-8 font-display text-2xl font-medium tracking-[-0.03em] group-hover:text-[color:var(--accent)]">{p.name}</h3>
      <p className="mt-3 text-[15px] text-ink-2">{p.summary}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold min-h-[44px]">Explore <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
    </Link>
  );
}

export function LeaderProgrammeCard({ p }: { p: LeaderProgramme }) {
  return (
    <article className="group relative h-full flex flex-col">
      <Photo src={p.image} alt="" className="aspect-[4/5]" sizes="(min-width:1024px) 320px, 100vw" imgClassName="photo-reveal group-hover:scale-[1.03]">
        <span className="absolute top-4 left-4 tag tag-ink">{p.status}</span>
      </Photo>
      <div className="pt-5 flex-1 flex flex-col">
        <div className="eyebrow">{p.kicker}</div>
        <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.03em] leading-tight">
          <Link href={`/leaders/${p.slug}`} className="after:absolute after:inset-0 group-hover:text-[color:var(--accent)]">{p.name}</Link>
        </h3>
        <p className="mt-3 text-[15px] text-ink-2 line-clamp-3">{p.summary}</p>
        <span className="mt-auto pt-4 inline-flex items-center gap-2 text-[14px] font-semibold min-h-[44px]">
          {p.ages} · {p.duration} <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
