import type { Metadata } from "next";
import Link from "next/link";
import { campaigns } from "@/mock/campaigns";
import { CampaignCard } from "@/components/ui/cards";
import { Photo } from "@/components/ui/photo";
import { CampaignProgress } from "@/components/ui/progress";

export const metadata: Metadata = {
  title: "Campaigns",
  description: "Current appeals: the Okafor Civic Centre capital campaign, Fund a Fellow, A Thousand New Torchbearers and Ready to Vote 2027.",
};

export default function CampaignsPage() {
  const [lead, ...rest] = campaigns;
  return (
    <>
      <section className="bg-white">
        <div className="container-x pt-14 md:pt-20 pb-12">
          <div className="eyebrow">Campaigns</div>
          <h1 className="display-lg mt-5 max-w-4xl">Where your gift goes furthest, right now.</h1>
          <p className="lede mt-6 max-w-2xl">Every campaign is restricted: gifts are spent only on its purpose, and progress is updated weekly.</p>
        </div>
      </section>
      <section className="bg-white pb-16">
        <div className="container-x">
          <article className="grid lg:grid-cols-12 border border-line">
            <Photo src={lead.image} alt="" className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[460px]" sizes="(min-width:1024px) 760px, 100vw" />
            <div className="lg:col-span-5 p-7 md:p-10 flex flex-col">
              <span className="tag tag-ink w-fit">{lead.kicker}</span>
              <h2 className="display-sm mt-5"><Link href={`/campaigns/${lead.slug}`} className="hover:text-[color:var(--accent)]">{lead.title}</Link></h2>
              <p className="mt-4 text-ink-2">{lead.summary}</p>
              <div className="mt-auto pt-8">
                <CampaignProgress raised={lead.raised} goal={lead.goal} donors={lead.donors} deadline={lead.deadline} accent large title={lead.title} />
                <div className="mt-7 flex flex-wrap gap-2">
                  <Link href="/donate?campaign=civic-centre" className="btn btn-accent">Give to the campaign</Link>
                  <Link href="/civic-centre" className="btn btn-outline">See the building</Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <section className="bg-stone section-sm">
        <div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((c) => <CampaignCard key={c.slug} c={c} />)}
        </div>
      </section>
    </>
  );
}
