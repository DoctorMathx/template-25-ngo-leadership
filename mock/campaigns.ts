import type { Campaign } from "@/lib/types";
import { photo } from "./images";
import { civicCentre } from "./civic-centre";

export const campaigns: Campaign[] = [
  {
    slug: "build-the-civic-centre",
    title: "Build the Okafor Civic Centre",
    kicker: "Capital campaign",
    image: photo("architecture"),
    summary: "Help finish a permanent, public home for young leaders and civic life in Enugu — opening Q4 2027.",
    story: [
      "Structure complete, roof on, and 64% of the way to our goal. The Okafor Civic Centre is no longer a drawing: it is a building, rising on Nike Lake Road, with 1,100 people working on it every day.",
      "What remains is the part that makes it a civic centre rather than a shell — the library shelves and archive, the Democracy Hall seating and sound system, the studios, the public square and the endowment that will keep it all open, free, until 22:00 every night.",
      "Every gift, from a ₦150,000 paver on the Path of Citizens to a named hall, is listed on the Founding Supporters wall. Ten per cent goes straight to the endowment.",
    ],
    raised: civicCentre.campaign.raised,
    goal: civicCentre.campaign.goal,
    donors: civicCentre.campaign.donors,
    deadline: civicCentre.campaign.deadline,
    programme: "civic-engagement",
    budget: civicCentre.campaign.breakdown,
    updates: [
      { date: "2026-09-26", title: "Topping out", body: "The last roof truss of Democracy Hall was lifted into place in front of 300 workers, fellows and neighbours." },
      { date: "2026-06-12", title: "Library shelving ordered", body: "Shelving for 40,000 volumes, made by a joinery workshop in Awka." },
      { date: "2026-03-04", title: "₦10bn milestone", body: "We passed ₦10 billion raised thanks to 2,900 donors — 2,100 of them giving under ₦1 million." },
    ],
    recentDonors: [
      { name: "Chiamaka O.", amount: 1_000_000, when: "2 hours ago", note: "A seat for my late father, who never missed a town hall." },
      { name: "Anonymous", amount: 150_000, when: "5 hours ago" },
      { name: "Leaders Africa Cohort 2025", amount: 25_000_000, when: "Yesterday", note: "Room 14 — for the next cohort." },
      { name: "Obinna I.", amount: 500_000, when: "Yesterday" },
      { name: "Hadiza B.", amount: 150_000, when: "2 days ago" },
    ],
    suggested: [150_000, 500_000, 1_000_000, 5_000_000],
    featuredHref: "/civic-centre",
  },
  {
    slug: "fund-a-fellow",
    title: "Fund a Fellow: the 2027 cohort",
    kicker: "Leaders Africa Fellowship",
    image: photo("eventHall"),
    summary: "Fifty-four extraordinary leaders. Twelve months. One network. Help us fully fund every place in the 2027 cohort.",
    story: [
      "Every year, more than 3,800 people apply for 54 places on the Leaders Africa Fellowship. We would like to say yes to more of them — but first we have to fund the places we have.",
      "A full fellowship costs ₦10 million: three week-long convenings, a mentor, coaching, and a ₦4.5 million grant for a commitment project in the fellow’s own community. Partial gifts are pooled; every ₦1 goes to the cohort.",
    ],
    raised: 386_000_000,
    goal: 540_000_000,
    donors: 1_204,
    deadline: "2027-04-30",
    programme: "leadership-development",
    budget: [
      { label: "Commitment-project grants", amount: 243_000_000 },
      { label: "Convenings: travel, visas & venues", amount: 189_000_000 },
      { label: "Mentoring & coaching", amount: 64_800_000 },
      { label: "Selection & alumni network", amount: 43_200_000 },
    ],
    updates: [
      { date: "2026-10-01", title: "Applications open", body: "We received 1,140 applications in the first month alone." },
      { date: "2026-08-20", title: "Kora Telecom sponsors six fellows", body: "A new three-year commitment from one of our longest-standing partners." },
    ],
    recentDonors: [
      { name: "Tunde A.", amount: 250_000, when: "1 hour ago", note: "Someone sponsored me once. Paying it forward." },
      { name: "Anonymous", amount: 50_000, when: "3 hours ago" },
      { name: "Kofi A. (Fellow ’26)", amount: 100_000, when: "Yesterday" },
      { name: "Funmi B.", amount: 40_000, when: "Yesterday" },
    ],
    suggested: [40_000, 250_000, 1_000_000, 10_000_000],
  },
  {
    slug: "a-thousand-torchbearers",
    title: "A Thousand New Torchbearers",
    kicker: "Youth mentorship",
    image: photo("classroom"),
    summary: "There are 1,000 young people on our mentoring waiting list in Kano and Enugu. Help us train their mentors and match every one of them.",
    story: [
      "Our waiting list is the hardest document we own. Behind each name is a 15-year-old whose head teacher believes they could lead — if someone believed in them first.",
      "₦480,000 funds a match for a year: vetting and training a volunteer mentor, monthly Torch Nights, transport, and a ₦50,000 micro-grant for the mentee’s first community project.",
    ],
    raised: 212_400_000,
    goal: 480_000_000,
    donors: 2_318,
    deadline: "2027-02-28",
    programme: "youth-mentorship",
    budget: [
      { label: "Mentor vetting & training", amount: 168_000_000 },
      { label: "Torch Nights & transport", amount: 144_000_000 },
      { label: "Mentee micro-grants", amount: 50_000_000 },
      { label: "Safeguarding & case support", amount: 118_000_000 },
    ],
    updates: [
      { date: "2026-10-18", title: "212 new matches in Kano", body: "Our largest single training weekend so far, at Bayero University." },
    ],
    recentDonors: [
      { name: "Ngozi E.", amount: 40_000, when: "40 minutes ago", note: "For a girl in Kano who wants to be a judge." },
      { name: "Anonymous", amount: 15_000, when: "2 hours ago" },
      { name: "Ikenna O.", amount: 480_000, when: "Yesterday" },
    ],
    suggested: [15_000, 40_000, 120_000, 480_000],
  },
  {
    slug: "ready-to-vote-2027",
    title: "Ready to Vote 2027",
    kicker: "Civic engagement",
    image: photo("ballot"),
    summary: "Non-partisan voter education and registration for two million first-time voters before the 2027 general elections.",
    story: [
      "Turnout among Nigerians aged 18–24 was below 30% at the last general election. Not because young people don’t care — but because registration is confusing, information is scarce and trust is low.",
      "Ready to Vote is strictly non-partisan. We train student and community volunteers to run registration drives, publish plain-language guides to every candidate’s manifesto, and host town halls where candidates answer young people’s questions.",
    ],
    raised: 61_300_000,
    goal: 150_000_000,
    donors: 3_870,
    deadline: "2027-01-31",
    programme: "civic-engagement",
    budget: [
      { label: "Volunteer training & kits", amount: 54_000_000 },
      { label: "Town halls in 36 states + FCT", amount: 48_000_000 },
      { label: "Plain-language voter guides", amount: 27_000_000 },
      { label: "SMS & radio information line", amount: 21_000_000 },
    ],
    updates: [
      { date: "2026-10-28", title: "First 100 town halls scheduled", body: "Candidates from five parties have confirmed attendance." },
    ],
    recentDonors: [
      { name: "Sola A.", amount: 15_000, when: "12 minutes ago" },
      { name: "Anonymous", amount: 5_000, when: "1 hour ago", note: "My first election. Let’s go." },
      { name: "Mfon U.", amount: 25_000, when: "3 hours ago" },
    ],
    suggested: [5_000, 15_000, 50_000, 150_000],
  },
];

export const getCampaign = (slug: string) => campaigns.find((c) => c.slug === slug);
