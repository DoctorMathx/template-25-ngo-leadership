import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { programmes, getProgramme } from "@/mock/programmes";
import { getLeaderProgramme } from "@/mock/leaders";
import { campaigns } from "@/mock/campaigns";
import { PageHero } from "@/components/ui/page-hero";
import { LeaderProgrammeCard, CampaignCard } from "@/components/ui/cards";
import { formatNaira } from "@/lib/utils";

export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) return { title: "Programme not found" };
  return { title: p.name, description: p.summary, openGraph: { images: [p.image] } };
}

export default async function ProgrammePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProgramme(slug);
  if (!p) notFound();
  const related = p.related.map(getLeaderProgramme).filter((x) => !!x);
  const relatedCampaigns = campaigns.filter((c) => c.programme === p.slug);

  return (
    <>
      <PageHero eyebrow={`Programme · ${p.short}`} title={p.name} lede={p.summary} image={p.image} imageAlt="" />

      <section className="bg-white">
        <div className="container-x">
          <dl className="grid md:grid-cols-3 border-b border-line">
            {p.outcomes.map((o, i) => (
              <div key={o.label} className={`py-10 ${i > 0 ? "md:border-l md:pl-8 border-t md:border-t-0 border-line" : ""}`}>
                <dd className="font-display text-5xl font-medium tracking-[-0.05em] tabular">{o.value}</dd>
                <dt className="mt-2 text-[14.5px] text-muted max-w-xs">{o.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="eyebrow">The problem</div>
            <p className="mt-6 font-display text-2xl md:text-3xl tracking-[-0.03em] leading-snug">{p.problem}</p>
          </div>
          <div className="lg:col-span-7">
            <div className="eyebrow">Our approach</div>
            <ol className="mt-6 border-t border-line">
              {p.approach.map((a, i) => (
                <li key={a} className="grid grid-cols-[48px_1fr] gap-4 py-5 border-b border-line text-[16px]">
                  <span className="font-display text-sm tabular text-muted pt-0.5">{String(i + 1).padStart(2, "0")}</span>{a}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[14px] text-muted">Where: {p.regions.join(" · ")}</p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-stone">
          <div className="container-x">
            <h2 className="display-md">Related leaders programmes</h2>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((r) => <LeaderProgrammeCard key={r.slug} p={r} />)}
            </div>
          </div>
        </section>
      )}

      {relatedCampaigns.length > 0 && (
        <section className="section bg-white">
          <div className="container-x">
            <h2 className="display-md">Current appeals</h2>
            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCampaigns.map((c) => <CampaignCard key={c.slug} c={c} />)}
            </div>
          </div>
        </section>
      )}

      <section className="bg-ink on-dark section">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-end">
          <h2 className="display-md text-white lg:col-span-8">{p.costLine}</h2>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link href={`/donate?programme=${p.slug}&amount=${p.suggestedAmount}`} className="btn btn-accent btn-lg">Give {formatNaira(p.suggestedAmount)}</Link>
            <Link href={`/donate?programme=${p.slug}&frequency=monthly`} className="btn btn-outline-light btn-lg">Give monthly</Link>
          </div>
        </div>
      </section>
    </>
  );
}
