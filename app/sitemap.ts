import type { MetadataRoute } from "next";
import { programmes } from "@/mock/programmes";
import { leaderProgrammes } from "@/mock/leaders";
import { campaigns } from "@/mock/campaigns";
import { stories } from "@/mock/stories";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://template-25-ngo-leadership.vercel.app").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = ["", "/founder", "/leaders", "/leaders/apply", "/leaders/alumni", "/civic-centre", "/get-involved", "/donate", "/campaigns", "/partnerships", "/transparency", "/programmes", "/impact", "/stories", "/events", "/about", "/contact", "/faq"];
  return [
    ...statics.map((p) => ({ url: `${siteUrl}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...leaderProgrammes.map((p) => ({ url: `${siteUrl}/leaders/${p.slug}`, lastModified: now })),
    ...programmes.map((p) => ({ url: `${siteUrl}/programmes/${p.slug}`, lastModified: now })),
    ...campaigns.map((c) => ({ url: `${siteUrl}/campaigns/${c.slug}`, lastModified: now })),
    ...stories.map((s) => ({ url: `${siteUrl}/stories/${s.slug}`, lastModified: new Date(s.date) })),
  ];
}
