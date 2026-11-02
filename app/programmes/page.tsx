import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programmes } from "@/mock/programmes";
import { Photo } from "@/components/ui/photo";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Programmes",
  description: "Leadership development, civic engagement, youth mentorship, the public service pipeline and the Civic Ideas Lab.",
};

export default function ProgrammesPage() {
  return (
    <>
      <section className="bg-white">
        <div className="container-x pt-14 md:pt-20 pb-12">
          <div className="eyebrow">Programmes</div>
          <h1 className="display-lg mt-5 max-w-4xl">Five pillars. One purpose.</h1>
          <p className="lede mt-6 max-w-2xl">Everything we do serves a single idea: that Africa’s future depends on leaders who were trusted with responsibility early.</p>
        </div>
      </section>
      <section className="bg-white pb-24">
        <div className="container-x border-t border-line">
          {programmes.map((p, i) => (
            <article key={p.slug} className="group grid md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 border-b border-line items-center">
              <div className="md:col-span-1 font-display text-sm tabular text-muted">{String(i + 1).padStart(2, "0")}</div>
              <div className="md:col-span-6">
                <Icon name={p.icon} className="w-7 h-7" />
                <h2 className="display-sm mt-5"><Link href={`/programmes/${p.slug}`} className="hover:text-[color:var(--accent)]">{p.name}</Link></h2>
                <p className="mt-3 text-ink-2 max-w-xl">{p.summary}</p>
                <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
                  {p.outcomes.slice(0, 2).map((o) => (
                    <div key={o.label}><dd className="font-display text-3xl tracking-[-0.04em] tabular">{o.value}</dd><dt className="text-[13px] text-muted max-w-[200px]">{o.label}</dt></div>
                  ))}
                </dl>
                <Link href={`/programmes/${p.slug}`} className="link-arrow mt-6">Explore <span className="sr-only">{p.name}</span><ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
              </div>
              <div className="md:col-span-5">
                <Photo src={p.image} alt="" className="aspect-[4/3]" sizes="(min-width:768px) 520px, 100vw" imgClassName="photo-reveal group-hover:scale-[1.02]" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
