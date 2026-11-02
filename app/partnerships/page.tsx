import type { Metadata } from "next";
import { Check } from "lucide-react";
import { partners, partnerTiers, grantPrinciples } from "@/mock/partners";
import { PageHero } from "@/components/ui/page-hero";
import { SmartForm } from "@/components/ui/smart-form";
import { PartnerWordmark } from "@/components/ui/partner-wordmark";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { photo } from "@/mock/images";

export const metadata: Metadata = {
  title: "Partnerships & funding",
  description: "For foundations, companies and governments: why partner with us, partnership tiers, current partners, how grant funds are managed, and a proposal enquiry form.",
};

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnerships & funding"
        title="Back a generation, not a project."
        lede="Foundations, companies and governments partner with us to find, train and connect Africa’s most promising leaders — and to build a civic institution that will outlast all of us."
        image={photo("handshake", 2000)}
        imageAlt="Two people shaking hands across a table"
      />

      <section className="section bg-white">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="eyebrow">Why partner</div>
            <h2 className="display-md mt-5">Long-term, measurable, accountable.</h2>
          </div>
          <div className="lg:col-span-8 grid sm:grid-cols-2 border-t border-l border-line">
            {[
              { t: "Talent you can’t find elsewhere", b: "A 1.4% acceptance rate and a network across 31 countries. Partners meet fellows at every convening." },
              { t: "Outcomes, not outputs", b: "We track leaders for five years after the programme — promotions, projects, money raised and lives reached." },
              { t: "A founder with a public record", b: "Three decades of public service, no salary from the Foundation and no party affiliation." },
              { t: "A permanent legacy", b: "Naming opportunities at the Okafor Civic Centre, opening in 2027." },
            ].map((x) => (
              <div key={x.t} className="p-7 border-r border-b border-line">
                <h3 className="font-display text-xl font-medium tracking-[-0.02em]">{x.t}</h3>
                <p className="mt-2 text-ink-2 text-[15px]">{x.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-stone" aria-labelledby="tiers-h">
        <div className="container-x">
          <div className="eyebrow">Ways to partner</div>
          <h2 id="tiers-h" className="display-md mt-5">Partnership tiers</h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--line)] border border-line">
            {partnerTiers.map((t) => (
              <article key={t.id} className={cn("p-7 flex flex-col", t.featured ? "bg-ink on-dark" : "bg-white")}>
                {t.featured && <span className="tag w-fit mb-4">Most common</span>}
                <h3 className={cn("font-display text-2xl font-medium tracking-[-0.03em]", t.featured && "text-white")}>{t.name}</h3>
                <p className={cn("mt-2 font-semibold", t.featured ? "text-white" : "")}>{t.price}</p>
                <p className={cn("mt-3 text-[14.5px]", t.featured ? "text-on-dark-muted" : "text-ink-2")}>{t.blurb}</p>
                <ul className="mt-6 space-y-3 text-[14.5px] flex-1">
                  {t.features.map((f) => <li key={f} className="flex gap-3"><Check className="w-4 h-4 mt-1 shrink-0" aria-hidden="true" />{f}</li>)}
                </ul>
                <a href="#enquire" className={cn("btn mt-8", t.featured ? "btn-white" : "btn-outline")}>Enquire<span className="sr-only"> about {t.name}</span></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm bg-white" aria-labelledby="partners-h">
        <div className="container-x">
          <h2 id="partners-h" className="eyebrow">Current partners</h2>
          <ul className="mt-8 grid grid-cols-2 md:grid-cols-5 border-t border-l border-line">
            {partners.map((p) => (
              <li key={p.name} className="border-r border-b border-line h-32 flex flex-col items-center justify-center gap-2 px-4 text-center">
                <PartnerWordmark p={p} />
                <span className="text-[11.5px] text-muted">{p.type} · since {p.since}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-white border-t border-line" aria-labelledby="grants-h">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="eyebrow">Stewardship</div>
            <h2 id="grants-h" className="display-md mt-5">How grant funds are managed.</h2>
          </div>
          <ol className="lg:col-span-8 border-t border-line">
            {grantPrinciples.map((g, i) => (
              <li key={g.title} className="grid grid-cols-[48px_1fr] gap-4 py-7 border-b border-line">
                <span className="font-display text-sm tabular text-muted pt-1">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-xl font-medium tracking-[-0.02em]">{g.title}</h3>
                  <p className="mt-2 text-ink-2">{g.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="enquire" className="section bg-ink on-dark scroll-mt-20" aria-labelledby="enq-h">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="eyebrow">Proposal enquiry</div>
            <h2 id="enq-h" className="display-md text-white mt-5">Let’s talk.</h2>
            <p className="lede mt-6">Tell us what you’d like to achieve. We’ll reply within three working days with a tailored proposal and, if useful, a call with our founder.</p>
            <p className="mt-8 text-[14px] text-on-dark-muted">{siteConfig.brand.partnershipsEmail}<br />{siteConfig.brand.phone}</p>
          </div>
          <div className="lg:col-span-8">
            <SmartForm
              dark
              submitLabel="Request a proposal"
              successTitle="Thank you — we’ll be in touch."
              successBody="Our partnerships director will reply within three working days with a tailored proposal."
              fields={[
                { name: "name", label: "Your name", required: true, half: true, autoComplete: "name" },
                { name: "title", label: "Job title", half: true, autoComplete: "organization-title" },
                { name: "org", label: "Organisation", required: true, half: true, autoComplete: "organization" },
                { name: "type", label: "Organisation type", type: "select", required: true, half: true, options: [ { value: "foundation", label: "Foundation / trust" }, { value: "corporate", label: "Company" }, { value: "government", label: "Government / public body" }, { value: "multilateral", label: "Multilateral / bilateral" }, { value: "family", label: "Family office / individual" } ] },
                { name: "email", label: "Work email", type: "email", required: true, half: true, autoComplete: "email" },
                { name: "phone", label: "Phone", type: "tel", half: true, autoComplete: "tel" },
                { name: "tier", label: "Interested in", type: "select", required: true, half: true, options: partnerTiers.map((t) => ({ value: t.id, label: `${t.name} (${t.price})` })).concat({ value: "naming", label: "Civic Centre naming opportunity" }) },
                { name: "budget", label: "Indicative budget", type: "select", half: true, options: [ { value: "<10m", label: "Under ₦10m" }, { value: "10-100m", label: "₦10m – ₦100m" }, { value: "100-500m", label: "₦100m – ₦500m" }, { value: "500m+", label: "₦500m+" } ] },
                { name: "goals", label: "What would you like to achieve?", type: "textarea", required: true, min: 30 },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
