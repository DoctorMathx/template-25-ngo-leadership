import { programmes } from "@/mock/programmes";
import { campaigns } from "@/mock/campaigns";
import { leaderProgrammes } from "@/mock/leaders";

export type DesignationGroup = { group: string; options: { value: string; label: string }[] };

export const designationGroups: DesignationGroup[] = [
  { group: "Where it’s needed most", options: [{ value: "general", label: "General fund — where it’s needed most" }] },
  { group: "Capital campaign", options: [{ value: "capital", label: "Okafor Civic Centre — capital campaign" }] },
  { group: "Campaigns", options: campaigns.filter((c) => c.slug !== "build-the-civic-centre").map((c) => ({ value: `campaign:${c.slug}`, label: c.title })) },
  { group: "Programmes", options: programmes.map((p) => ({ value: `programme:${p.slug}`, label: p.name })) },
  { group: "Leaders programmes", options: leaderProgrammes.map((p) => ({ value: `leaders:${p.slug}`, label: p.name })) },
];

const ALL = designationGroups.flatMap((g) => g.options);

export function designationLabel(value: string | null | undefined) {
  return ALL.find((o) => o.value === value)?.label ?? "General fund — where it’s needed most";
}

export function isValidDesignation(value: string | null | undefined): value is string {
  return !!value && ALL.some((o) => o.value === value);
}

/** Map a ?campaign= slug (including the civic-centre alias) to a designation value. */
export function campaignToDesignation(slug: string | null | undefined) {
  if (!slug) return null;
  if (slug === "civic-centre" || slug === "capital" || slug === "build-the-civic-centre") return "capital";
  const v = `campaign:${slug}`;
  return isValidDesignation(v) ? v : null;
}
