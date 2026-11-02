import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { campaigns, getCampaign } from "@/mock/campaigns";
import { getProgramme } from "@/mock/programmes";
import { Photo } from "@/components/ui/photo";
import { CampaignProgress } from "@/components/ui/progress";
import { compactNaira, formatDate, formatNaira } from "@/lib/utils";

export function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCampaign(slug);
  if (!c) return { title: "Campaign not found" };
  return { title: c.title, description: c.summary, openGraph: { images: [c.image] } };
}

export default async function CampaignPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCampaign(slug);
  if (!c) notFound();
  const programme = getProgramme(c.programme);
  const total = c.budget.reduce((s, b) => s + b.amount, 0);
  const donateBase = c.slug === "build-the-civic-centre" ? "/donate?campaign=civic-centre" : `/donate?campaign=${c.slug}`;

  return (
    <>
      <section className="bg-white">
        <div className="container-x pt-14 md:pt-20 pb-10">
          <nav aria-label="Breadcrumb" className="text-[13px] text-muted"><Link href="/campaigns" className="hover:underline underline-offset-4">Campaigns</Link> <span aria-hidden="true">/</span> <span aria-current="page">{c.kicker}</span></nav>
          <h1 className="display-lg mt-6 max-w-4xl">{c.title}</h1>
          <p className="lede mt-6 max-w-2xl">{c.summary}</p>
        </div>
        <div className="container-x">
          <Photo src={c.image} alt="" priority kenburns className="aspect-[16/9] md:aspect-[21/8]" sizes="(min-width:1320px) 1320px, 100vw" />
        </div>
      </section>

      <section className="section-sm bg-white">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <div className="prose-civic">{c.story.map((p, i) => <p key={i} className={i === 0 ? "dropcap" : undefined}>{p}</p>)}</div>

            <h2 className="display-sm mt-16">How the money is used</h2>
            <ul className="mt-6 border-t border-line">
              {c.budget.map((b) => (
                <li key={b.label} className="py-4 border-b border-line">
                  <div className="flex justify-between gap-4 text-[15px]"><span>{b.label}</span><span className="font-semibold tabular">{compactNaira(b.amount)} · {Math.round((b.amount / total) * 100)}%</span></div>
                  <div className="bar mt-2" aria-hidden="true"><span style={{ width: `${(b.amount / total) * 100}%` }} /></div>
                </li>
              ))}
            </ul>

            <h2 className="display-sm mt-16">Updates</h2>
            <ol className="mt-6 border-l border-[color:var(--ink)] pl-6 space-y-8">
              {c.updates.map((u) => (
                <li key={u.date} className="relative">
                  <span aria-hidden="true" className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 bg-[color:var(--ink)] rounded-full" />
                  <time dateTime={u.date} className="text-[13px] text-muted">{formatDate(u.date)}</time>
                  <h3 className="mt-1 font-display text-xl font-medium tracking-[-0.02em]">{u.title}</h3>
                  <p className="mt-1 text-ink-2">{u.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="border border-line p-5 sm:p-7">
                <CampaignProgress raised={c.raised} goal={c.goal} donors={c.donors} deadline={c.deadline} large accent title={c.title} />
                <div className="mt-7 grid grid-cols-2 gap-2">
                  {c.suggested.map((a) => (
                    <Link key={a} href={`${donateBase}&amount=${a}`} className="btn btn-outline min-w-0 !px-2 sm:!px-4 tabular">{formatNaira(a)}</Link>
                  ))}
                </div>
                <Link href={donateBase} className="btn btn-accent btn-lg w-full mt-3">Give now</Link>
                {programme && <p className="mt-4 text-[13px] text-muted">Part of our <Link href={`/programmes/${programme.slug}`} className="link">{programme.name}</Link> work.</p>}
                {c.featuredHref && <Link href={c.featuredHref} className="link-arrow mt-2">Explore the Civic Centre</Link>}
              </div>
              <div className="border border-line p-5 sm:p-7">
                <h2 className="eyebrow">Recent supporters</h2>
                <ul className="mt-4 divide-y divide-[color:var(--line)]">
                  {c.recentDonors.map((d, i) => (
                    <li key={i} className="py-3.5">
                      <div className="flex justify-between gap-4 text-[14.5px]"><span className="font-semibold">{d.name}</span><span className="tabular">{formatNaira(d.amount)}</span></div>
                      {d.note && <p className="text-[13.5px] text-ink-2 mt-1 italic">“{d.note}”</p>}
                      <p className="text-[12px] text-muted mt-0.5">{d.when}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
