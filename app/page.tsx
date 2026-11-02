import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import {
  HeroModule,
  FounderNoteModule,
  NumbersModule,
  LeadersModule,
  AlumniModule,
  CivicCentreModule,
  MovementModule,
  ProgrammesModule,
  CampaignsModule,
  StoriesModule,
  EventsModule,
  PartnersModule,
  TransparencyModule,
  CommunityModule,
} from "@/components/home/modules";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}` },
  description: siteConfig.brand.description,
};

// Homepage = an ordered list of modules from siteConfig.home.modules. Reorder or remove keys there.
const MODULE_MAP = {
  hero: HeroModule,
  founderNote: FounderNoteModule,
  numbers: NumbersModule,
  leaders: LeadersModule,
  alumni: AlumniModule,
  civicCentre: CivicCentreModule,
  movement: MovementModule,
  programmes: ProgrammesModule,
  campaigns: CampaignsModule,
  stories: StoriesModule,
  events: EventsModule,
  partners: PartnersModule,
  transparency: TransparencyModule,
  community: CommunityModule,
} as const;

export default function HomePage() {
  return (
    <>
      {siteConfig.home.modules.map((key) => {
        const C = MODULE_MAP[key];
        return C ? <C key={key} /> : null;
      })}
    </>
  );
}
