import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Pledge } from "./pledge";
import { events } from "@/mock/events";
import { pledge } from "@/mock/pledge";
import { EventRow } from "@/components/ui/cards";
import { EventRegister } from "@/components/ui/event-register";
import { SmartForm } from "@/components/ui/smart-form";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { Photo } from "@/components/ui/photo";
import { NIGERIAN_STATES } from "@/lib/states";
import { formatNumber } from "@/lib/utils";
import { photo } from "@/mock/images";

export const metadata: Metadata = {
  title: "Get involved",
  description: "Commit to serve in your community, join a day of service, mentor a young person, fundraise, partner with us, or join the community newsletter.",
};

const stateOptions = NIGERIAN_STATES.map((s) => ({ value: s, label: s })).concat({ value: "Diaspora", label: "Diaspora" });

export default function GetInvolvedPage() {
  const local = events.filter((e) => e.volunteer || e.kind === "Town hall");
  return (
    <>
      <section className="bg-white">
        <div className="container-x pt-14 md:pt-20 pb-12 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <div className="eyebrow fade-up">Get involved</div>
            <h1 className="display-xl mt-6 fade-up delay-1">This is a movement, not a membership.</h1>
          </div>
          <div className="lg:col-span-4 fade-up delay-2">
            <p className="lede">Leadership starts with showing up. Pledge to serve, give a Saturday, mentor a teenager — or bring your company with you.</p>
            <nav aria-label="On this page" className="mt-6 flex flex-col">
              {[["#pledge", "Take the pledge"], ["#days-of-service", "Days of service"], ["#volunteer", "Mentor or volunteer"], ["#fundraise", "Fundraise"], ["#community", "Join the community"]].map(([h, l]) => (
                <a key={h} href={h} className="flex items-center justify-between border-b border-line py-3 min-h-[44px] font-medium hover:text-[color:var(--accent)]">{l} <ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
              ))}
            </nav>
          </div>
        </div>
        <div className="container-x">
          <Photo src={photo("fists", 2000)} alt="Raised fists in a crowd" priority kenburns className="aspect-[16/9] md:aspect-[21/8]" sizes="(min-width:1320px) 1320px, 100vw" />
        </div>
      </section>

      {/* Pledge */}
      <section id="pledge" className="bg-ink on-dark section mt-20 scroll-mt-20" aria-labelledby="pledge-h">
        <div className="container-x">
          <div className="eyebrow"><span className="eyebrow-num">01</span><span aria-hidden="true" className="w-8 h-px bg-current" />The pledge</div>
          <h2 id="pledge-h" className="display-lg text-white mt-5 max-w-4xl">Commit to serve in your community.</h2>
          <p className="lede mt-6 max-w-2xl">Choose one or more commitments. We’ll send you a local guide, invitations to days of service, and a check-in in six months to see how it went.</p>
          <div className="mt-14"><Pledge /></div>
        </div>
      </section>

      {/* Chapters */}
      <section className="section-sm bg-white border-b border-line" aria-labelledby="chapters-h">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 id="chapters-h" className="display-sm">Local chapters</h2>
            <p className="mt-3 text-ink-2">Pledgers meet monthly in seven chapters, organised by volunteers and our alumni.</p>
          </div>
          <ul className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 border-t border-l border-line">
            {pledge.chapters.map((c) => (
              <li key={c.city} className="p-4 border-r border-b border-line">
                <p className="font-semibold text-[14.5px]">{c.city}</p>
                <p className="font-display text-2xl tracking-[-0.04em] tabular mt-2">{formatNumber(c.members)}</p>
                <p className="text-[12px] text-muted">members</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Days of service */}
      <section id="days-of-service" className="section bg-white scroll-mt-20" aria-labelledby="dos-h">
        <div className="container-x">
          <div className="eyebrow"><span className="eyebrow-num">02</span><span aria-hidden="true" className="w-8 h-px bg-current" />Local events & volunteer days</div>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <h2 id="dos-h" className="display-md max-w-2xl">Give a Saturday. Change a street.</h2>
            <Link href="/events" className="link-arrow">All events <ArrowRight className="w-4 h-4" aria-hidden="true" /></Link>
          </div>
          <div className="mt-10 border-t border-line">
            {local.map((e) => <EventRow key={e.slug} e={e} action={<EventRegister e={e} />} />)}
          </div>
        </div>
      </section>

      {/* Volunteer / mentor */}
      <section id="volunteer" className="section bg-stone scroll-mt-20" aria-labelledby="vol-h">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="eyebrow"><span className="eyebrow-num">03</span><span aria-hidden="true" className="w-8 h-px bg-current" />Mentor or volunteer</div>
            <h2 id="vol-h" className="display-md mt-5">Be the person who believed in someone first.</h2>
            <p className="lede mt-6">Torchbearers mentors meet a young person twice a month for two years. You need to be 23+, pass a background check and complete six hours of training. Prefer something shorter? Volunteer at a town hall, a day of service or the Civic Centre.</p>
            <Photo src={photo("kids")} alt="Smiling schoolchildren" className="aspect-[4/3] mt-10" sizes="(min-width:1024px) 520px, 100vw" />
          </div>
          <div className="lg:col-span-7 bg-white border border-line p-6 md:p-10">
            <SmartForm
              submitLabel="Send my application"
              successTitle="Thank you for stepping up."
              successBody="Our volunteer team will call you within five working days to arrange a short interview and your background check."
              fields={[
                { name: "first", label: "First name", required: true, half: true, autoComplete: "given-name" },
                { name: "last", label: "Last name", required: true, half: true, autoComplete: "family-name" },
                { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
                { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, half: true, autoComplete: "tel" },
                { name: "state", label: "State", type: "select", required: true, half: true, options: stateOptions },
                { name: "role", label: "I’d like to", type: "select", required: true, half: true, options: [ { value: "mentor", label: "Mentor a young person (2 years)" }, { value: "dos", label: "Volunteer at days of service" }, { value: "townhall", label: "Moderate or support town halls" }, { value: "skills", label: "Give professional skills" }, { value: "centre", label: "Volunteer at the Civic Centre" } ] },
                { name: "why", label: "Why do you want to volunteer?", type: "textarea", required: true, min: 40, help: "A few sentences is perfect." },
                { name: "age", label: "I am 23 or older and consent to a background check if I mentor under-18s.", type: "checkbox", required: true },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Fundraise + partner */}
      <section id="fundraise" className="section bg-white scroll-mt-20" aria-labelledby="fund-h">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="eyebrow"><span className="eyebrow-num">04</span><span aria-hidden="true" className="w-8 h-px bg-current" />Fundraise</div>
            <h2 id="fund-h" className="display-md mt-5">Turn a birthday, a run or a graduation into a fellowship.</h2>
            <p className="lede mt-6">Set a goal, tell your story and we’ll give you a personal page, a fundraising pack and a thank-you from a fellow you helped fund.</p>
            <div className="mt-10 border-t border-line">
              {[
                { t: "Partner as a company", b: "Fund a programme, sponsor fellows or bring your team to a day of service.", href: "/partnerships" },
                { t: "Name a space", b: "Leave a lasting dedication at the Okafor Civic Centre.", href: "/civic-centre#naming" },
                { t: "Give monthly", b: "Regular gifts let us plan cohorts years ahead.", href: "/donate?frequency=monthly&amount=15000" },
              ].map((r) => (
                <Link key={r.t} href={r.href} className="group flex items-start justify-between gap-6 py-5 border-b border-line">
                  <span><span className="block font-display text-xl font-medium tracking-[-0.02em] group-hover:text-[color:var(--accent)]">{r.t}</span><span className="block text-[14.5px] text-ink-2 mt-1">{r.b}</span></span>
                  <ArrowRight className="w-5 h-5 mt-1 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 border border-line p-6 md:p-10">
            <h3 className="display-sm">Start a fundraiser</h3>
            <SmartForm
              className="mt-8"
              submitLabel="Create my fundraiser"
              successTitle="Your page is on its way."
              successBody="We’ll email your personal fundraising link and starter pack within one working day."
              summaryTemplate="Goal: {goal|naira}"
              fields={[
                { name: "name", label: "Your name", required: true, half: true, autoComplete: "name" },
                { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
                { name: "occasion", label: "Occasion", type: "select", required: true, half: true, options: [ { value: "birthday", label: "Birthday" }, { value: "run", label: "Run, walk or ride" }, { value: "wedding", label: "Wedding or anniversary" }, { value: "memorial", label: "In memory" }, { value: "other", label: "Something else" } ] },
                { name: "goal", label: "Goal (₦)", type: "number", required: true, min: 10000, half: true, placeholder: "250000" },
                { name: "for", label: "Fundraising for", type: "select", required: true, options: [ { value: "fellow", label: "Fund a Fellow" }, { value: "torch", label: "A Thousand New Torchbearers" }, { value: "centre", label: "The Okafor Civic Centre" }, { value: "vote", label: "Ready to Vote 2027" } ] },
                { name: "story", label: "Why this matters to you (optional)", type: "textarea" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Community */}
      <section id="community" className="bg-ink on-dark section scroll-mt-20" aria-labelledby="comm-h">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <div className="eyebrow"><span className="eyebrow-num">05</span><span aria-hidden="true" className="w-8 h-px bg-current" />Join the community</div>
            <h2 id="comm-h" className="display-md text-white mt-5">One letter a month from the people doing the work.</h2>
            <p className="lede mt-6 max-w-xl">Stories from fellows, Civic Centre construction updates, events near you and a note from our founder.</p>
          </div>
          <div className="lg:col-span-5"><NewsletterForm dark withName cta="Join the community" /></div>
        </div>
      </section>
    </>
  );
}
