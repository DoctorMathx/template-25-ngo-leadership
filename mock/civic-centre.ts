import type { Milestone, NamingOpportunity, SupporterTier } from "@/lib/types";
import { photo } from "./images";

export const civicCentre = {
  name: "The Okafor Civic Centre",
  place: "Nike Lake Road, Enugu",
  architect: "Studio Ọkwụ Architects (Enugu & Lisbon)",
  site: "4.2 hectares",
  floorArea: "11,800 m²",
  opening: "Q4 2027",
  hero: photo("architecture", 2000),
  rendering: photo("civicBuilding", 2000),
  gallery: [
    { src: photo("constructionSite", 1400), alt: "Engineers walking the first-floor deck of the civic centre", caption: "First-floor deck, February 2026" },
    { src: photo("rebar", 1400), alt: "Builders tying reinforcement bars on site", caption: "Reinforcement for Democracy Hall, April 2026" },
    { src: photo("blueprint", 1400), alt: "Architect marking up blueprints", caption: "Design review with Studio Ọkwụ" },
  ],
  vision: [
    "Enugu has always been a city of ideas — of coal miners who organised, of writers who argued, of students who marched. The Okafor Civic Centre will give those ideas a permanent home.",
    "Designed around a central public square open to everyone, the centre will house a 600-seat Democracy Hall for debates, town halls and graduations; a civic library and the Archive of Public Service; studios where young leaders can work, record and build; and a residence for visiting fellows. It will be free to enter, open late, and built to last a century.",
  ],
  principles: [
    { title: "Open to everyone", body: "A public square at the centre, no ticket required. Free Wi-Fi, shade and seating, open until 22:00." },
    { title: "Built to last", body: "Laterite-tinted concrete, deep overhangs and cross-ventilation to keep running costs — and carbon — low." },
    { title: "Made in Enugu", body: "Over 70% of construction spend goes to firms and workers from the South-East. 1,100 jobs on site." },
    { title: "Endowed from day one", body: "10% of every capital gift goes to an operations endowment so the doors stay open." },
  ],
  spaces: [
    { name: "Democracy Hall", detail: "600 seats · debates, town halls, graduations" },
    { name: "Civic Library", detail: "40,000 volumes · open until 22:00" },
    { name: "Archive of Public Service", detail: "Papers, oral histories and a permanent exhibition" },
    { name: "Leadership Studios", detail: "Eight studios for fellows, start-ups and media" },
    { name: "Fellows’ Residence", detail: "40 rooms for visiting fellows and scholars" },
    { name: "The Square & Amphitheatre", detail: "Open-air stage for 1,500 people" },
  ],
  campaign: {
    goal: 18_500_000_000,
    raised: 11_840_000_000,
    donors: 3_412,
    deadline: "2027-09-30",
    endowmentShare: 0.1,
    breakdown: [
      { label: "Construction & materials", amount: 12_400_000_000 },
      { label: "Fit-out, library & archive", amount: 2_600_000_000 },
      { label: "Operations endowment", amount: 1_850_000_000 },
      { label: "Landscape & public square", amount: 950_000_000 },
      { label: "Design, permits & supervision", amount: 700_000_000 },
    ],
  },
};

export const milestones: Milestone[] = [
  { date: "Jun 2023", title: "Site secured", body: "4.2 hectares on Nike Lake Road acquired with a gift from the founder and the Enugu State Government’s land allocation.", status: "done" },
  { date: "Feb 2024", title: "Design competition", body: "Studio Ọkwụ Architects selected from 46 entries by a public jury including students.", status: "done" },
  { date: "Mar 2025", title: "Ground-breaking", body: "Four thousand people attend. The first foundation stone is laid by a Torchbearers mentee.", status: "done" },
  { date: "Dec 2025", title: "Foundations complete", body: "Piling and foundations finished on schedule and 3% under budget.", status: "done" },
  { date: "Sep 2026", title: "Topping out", body: "The roof of Democracy Hall is in place. Structure complete.", status: "done" },
  { date: "Q1 2027", title: "Façade & interiors", body: "Laterite screens, glazing, library shelving and studio fit-out.", status: "current" },
  { date: "Q3 2027", title: "Landscape & public square", body: "Planting 300 indigenous trees and building the amphitheatre.", status: "next" },
  { date: "Q4 2027", title: "Doors open", body: "Opening week of debates, concerts and the first fellows’ graduation.", status: "next" },
];

export const namingOpportunities: NamingOpportunity[] = [
  { id: "democracy-hall", space: "Democracy Hall", zone: "Democracy Hall", detail: "600-seat auditorium, the heart of the centre", price: 2_500_000_000, status: "Reserved" },
  { id: "civic-library", space: "The Civic Library", zone: "Library & Archive", detail: "Two-storey reading room, 40,000 volumes", price: 1_200_000_000, status: "Available" },
  { id: "fellows-residence", space: "Fellows’ Residence", zone: "Fellows’ Residence", detail: "40-room residence for visiting leaders", price: 1_500_000_000, status: "Available" },
  { id: "archive", space: "Archive of Public Service", zone: "Library & Archive", detail: "Climate-controlled archive and permanent exhibition", price: 900_000_000, status: "Named", namedFor: "The Nwachukwu Family" },
  { id: "amphitheatre", space: "The Amphitheatre", zone: "Grounds", detail: "Open-air stage for 1,500 people", price: 600_000_000, status: "Available" },
  { id: "public-square", space: "The Public Square", zone: "Grounds", detail: "Shaded civic plaza at the centre of the site", price: 750_000_000, status: "Reserved" },
  { id: "studios", space: "Leadership Studio", zone: "Leadership Studios", detail: "Co-working, recording and media studios", price: 150_000_000, status: "Available", quantity: 5 },
  { id: "seminar-rooms", space: "Seminar Room", zone: "Leadership Studios", detail: "24-seat seminar rooms with hybrid AV", price: 60_000_000, status: "Available", quantity: 7 },
  { id: "residence-rooms", space: "Fellow’s Room", zone: "Fellows’ Residence", detail: "A residence room, named for a mentor or loved one", price: 25_000_000, status: "Available", quantity: 28 },
  { id: "reading-carrels", space: "Reading Carrel", zone: "Library & Archive", detail: "A study desk in the Civic Library", price: 5_000_000, status: "Available", quantity: 64 },
  { id: "hall-seats", space: "Democracy Hall Seat", zone: "Democracy Hall", detail: "Engraved plaque on a seat in Democracy Hall", price: 1_000_000, status: "Available", quantity: 412 },
  { id: "grove-trees", space: "Founders’ Grove Tree", zone: "Grounds", detail: "An indigenous tree with a dedication stone", price: 500_000, status: "Available", quantity: 186 },
  { id: "citizens-path", space: "Path of Citizens Paver", zone: "Grounds", detail: "An engraved paver on the path into the square", price: 150_000, status: "Available", quantity: 2_140 },
];

export const supporterTiers: SupporterTier[] = [
  {
    id: "cornerstone",
    name: "Cornerstone",
    min: 500_000_000,
    names: ["The Nwachukwu Family", "Meridian Trust Bank", "Enugu State Government", "Sahel Futures Fund", "An anonymous family in Abuja"],
  },
  {
    id: "pillar",
    name: "Pillar",
    min: 100_000_000,
    names: ["Kora Telecom", "Lumen Energy", "The Ifeanyi & Ngozi Udeh Trust", "Northgate Foundation", "Harmattan Media Group", "Chief & Lady Obiora Nnaji", "Ọnụ Capital Partners", "Coal City Rotary Clubs"],
  },
  {
    id: "builder",
    name: "Builder",
    min: 10_000_000,
    names: ["Dr. Ama Ofori", "Babatunde & Sade Akinola", "The Class of 1990, UNN", "Ekene Okafor-Hughes", "Nsukka Old Girls’ Association", "Kelechi Ume", "Fatima & Musa Danjuma", "Tega Okorodudu", "The Civic Scholars Alumni", "Adaobi Chukwu", "Ikenna Obi", "Zainab Lawal", "Two anonymous donors"],
  },
  {
    id: "friend",
    name: "Founding Friend",
    min: 1_000_000,
    names: ["Amaka Nwosu", "Chinedu Agu", "Bisi Olatunji", "Ngozi Eze", "Yusuf Abdullahi", "Ebere Okeke", "Funmi Bakare", "Obinna Ilo", "Hadiza Bello", "Tunde Bakare", "Chiamaka Okafor", "Kunle Ajayi", "Mfon Udo", "Ijeoma Nnadi", "Sola Adewale", "Ifeoma Uzor", "The Ozo family", "Leaders Africa Cohort 2024", "and 1,920 more"],
  },
];
