import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { founder, founderTimeline } from "@/mock/founder";
import { siteConfig } from "@/lib/site-config";
import { formatDate, cn } from "@/lib/utils";
import { Photo } from "@/components/ui/photo";
import { PullQuote } from "@/components/ui/pull-quote";
import { VideoModal } from "@/components/ui/video-modal";
import { Signature } from "@/components/ui/signature";

export const metadata: Metadata = {
  title: `Our founder, ${founder.name}`,
  description: `${founder.short} Read her letter to the next generation and the timeline of her public service.`,
};

export default function FounderPage() {
  const L = founder.letter;
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="container-x pt-16 md:pt-24 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7 pb-4 lg:pb-16">
            <div className="eyebrow fade-up">Our founder</div>
            <h1 className="display-xl mt-6 fade-up delay-1">{founder.name}</h1>
            <p className="lede mt-8 max-w-xl fade-up delay-2">{founder.short}</p>
            <nav aria-label="On this page" className="mt-10 flex flex-wrap gap-x-8 gap-y-1 fade-up delay-3">
              <a href="#letter" className="link-arrow">The letter</a>
              <a href="#video" className="link-arrow">The film</a>
              <a href="#timeline" className="link-arrow">A life in public service</a>
            </nav>
          </div>
          <div className="lg:col-span-5">
            <Photo src={founder.portrait} alt={`Portrait of ${founder.name}`} priority className="aspect-[4/5]" sizes="(min-width:1024px) 520px, 100vw" />
          </div>
        </div>
      </section>

      {/* Letter */}
      <section id="letter" className="section bg-white scroll-mt-24">
        <article className="container-narrow">
          <div className="flex items-center justify-between gap-4 border-y border-line py-4 text-[13px] text-muted">
            <span className="uppercase tracking-[.16em] font-semibold text-[color:var(--ink)]">A letter</span>
            <time dateTime={L.date}>{siteConfig.brand.city} · {formatDate(L.date)}</time>
          </div>
          <h2 className="display-md mt-12">{L.title}</h2>
          <p className="mt-10 font-display text-xl md:text-2xl tracking-[-0.02em] leading-snug">{L.salutation}</p>
          <div className="prose-civic mt-8">
            {L.body.map((p, i) => <p key={i} className={i === 0 ? "dropcap" : undefined}>{p}</p>)}
          </div>
          <div className="mt-12">
            <p className="text-[1.125rem] text-ink-2">{L.closing}</p>
            <Signature className="w-56 md:w-64 h-auto mt-4 text-[color:var(--ink)]" />
            <p className="mt-2 font-semibold">{founder.honorific} {founder.name}</p>
            <p className="text-[14px] text-muted">{siteConfig.founder.title}, {siteConfig.brand.name}</p>
          </div>
        </article>
      </section>

      {/* Video */}
      <section id="video" className="bg-white pb-20 md:pb-28 scroll-mt-24">
        <div className="container-x">
          <VideoModal poster={founder.video.poster} title={founder.video.title} duration={founder.video.duration} caption={founder.video.caption} />
        </div>
      </section>

      {/* Big quote */}
      <section className="bg-ink on-dark section">
        <div className="container-x">
          <PullQuote text={founder.quotes[2].text} by={founder.name} context={founder.quotes[2].context} />
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="section bg-white scroll-mt-24">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="eyebrow">Timeline</div>
              <h2 className="display-md mt-5">A life in public service.</h2>
              <p className="lede mt-6">Three decades in classrooms, ministries and commissions — and the Foundation that grew out of them.</p>
              <Photo src={founder.working} alt={`${founder.name} at work`} className="aspect-[4/3] mt-10 hidden lg:block" sizes="400px" />
            </div>
          </div>
          <ol className="lg:col-span-8 border-t border-line">
            {founderTimeline.map((t) => (
              <li key={t.year} className="grid grid-cols-[88px_1fr] md:grid-cols-[160px_1fr] gap-6 py-8 border-b border-line">
                <span className={cn("font-display text-3xl md:text-5xl font-medium tracking-[-0.05em] tabular leading-none", t.current ? "text-[color:var(--accent)]" : "")}>{t.year}</span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-medium tracking-[-0.025em]">
                    {t.title}
                    {t.current && <span className="tag tag-accent ml-3 align-middle">Ahead</span>}
                  </h3>
                  <p className="mt-2 text-[15.5px] text-ink-2 max-w-xl">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Biography + values */}
      <section className="section bg-stone">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <div className="eyebrow">Biography</div>
            <div className="prose-civic mt-6">{founder.bio.map((p, i) => <p key={i}>{p}</p>)}</div>
          </div>
          <div className="lg:col-span-6">
            <div className="eyebrow">What she believes</div>
            <ul className="mt-6 border-t border-line">
              {founder.values.map((v, i) => (
                <li key={v.title} className="py-6 border-b border-line grid grid-cols-[48px_1fr] gap-4">
                  <span className="font-display text-sm tabular text-muted pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-xl font-medium tracking-[-0.02em]">{v.title}</h3>
                    <p className="mt-1.5 text-ink-2">{v.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-white">
        <div className="container-x">
          <h2 className="display-lg max-w-4xl">Continue the work.</h2>
          <div className="mt-12 grid md:grid-cols-3 border-t border-line">
            {[
              { k: "Apply", t: "Lead with us", b: "Applications for the 2027 Leaders Africa Fellowship are open until 15 January.", href: "/leaders/apply", cta: "Start an application" },
              { k: "Build", t: "Finish the Civic Centre", b: "Help complete a public home for civic life in Enugu, opening in 2027.", href: "/civic-centre", cta: "See the campaign" },
              { k: "Serve", t: "Take the pledge", b: "Commit to serve in your community and join a growing movement.", href: "/get-involved#pledge", cta: "Commit to serve" },
            ].map((c, i) => (
              <div key={c.k} className={cn("py-10 md:px-8", i > 0 && "border-t md:border-t-0 md:border-l border-line", i === 0 && "md:pl-0")}>
                <div className="eyebrow">{c.k}</div>
                <h3 className="mt-4 font-display text-2xl font-medium tracking-[-0.03em]">{c.t}</h3>
                <p className="mt-3 text-ink-2">{c.b}</p>
                <Link href={c.href} className="link-arrow mt-5">{c.cta} <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
