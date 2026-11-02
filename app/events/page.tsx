import type { Metadata } from "next";
import { events } from "@/mock/events";
import { EventRow } from "@/components/ui/cards";
import { EventRegister } from "@/components/ui/event-register";
import { PageHero } from "@/components/ui/page-hero";
import { photo } from "@/mock/images";

export const metadata: Metadata = {
  title: "Events",
  description: "Days of service, Ready to Vote town halls, fellowship info sessions, Civic Centre hard-hat tours, the Founders’ Dinner and the Leaders Africa Forum.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Show up. In person."
        lede="Days of service, town halls, info sessions, site tours and our annual forum. Most events are free."
        image={photo("audienceDark", 2000)}
        imageAlt="An audience seated in a darkened auditorium"
      />
      <section className="section-sm bg-white">
        <div className="container-x border-t border-line">
          {events.map((e) => (
            <div key={e.slug} id={e.slug} className="scroll-mt-28">
              <EventRow e={e} action={<EventRegister e={e} />} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
