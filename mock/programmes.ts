import type { Programme } from "@/lib/types";
import { photo } from "./images";

export const programmes: Programme[] = [
  {
    slug: "leadership-development",
    name: "Leadership development",
    short: "Leadership",
    icon: "compass",
    image: photo("speakerCrowd"),
    summary: "Fellowships and training that turn people already doing the work into leaders who can change systems.",
    problem:
      "Africa has the youngest population on earth, but the average age of its heads of government is over 60. Talented young leaders exist in every community — what they lack is training, mentors, capital and a network that opens doors.",
    approach: [
      "Select for character and track record, not credentials — 41% of our fellows did not attend university abroad.",
      "Teach with practitioners: former permanent secretaries, mayors, judges, founders and organisers.",
      "Fund real projects with real budgets so leadership is practised, not just discussed.",
      "Keep the network alive for life — alumni convenings, peer circles and a residency at the Civic Centre.",
    ],
    outcomes: [
      { value: "1,650", label: "leaders trained since 2022" },
      { value: "86%", label: "of fellows promoted or scaled their work within two years" },
      { value: "₦1.9bn", label: "raised by alumni projects after the fellowship" },
    ],
    regions: ["Pan-African", "Abuja", "Enugu", "Nairobi", "Accra"],
    related: ["leaders-africa-fellowship", "civic-scholars", "community-leaders-programme"],
    costLine: "₦250,000 sends one fellow to a week-long convening.",
    suggestedAmount: 250_000,
  },
  {
    slug: "civic-engagement",
    name: "Civic engagement & democracy",
    short: "Civic engagement",
    icon: "vote",
    image: photo("ballot"),
    summary: "Non-partisan work that helps citizens — especially young ones — understand, join and shape public decisions.",
    problem:
      "Most Nigerians have never seen their local government budget, never met their councillor and have little trust that participation changes anything. Disengagement becomes a self-fulfilling prophecy.",
    approach: [
      "Ready to Vote: registration drives and plain-language voter guides — strictly non-partisan.",
      "Town halls where young people question candidates and office-holders directly.",
      "Citizen’s guides to state and LGA budgets, published within 30 days of each budget.",
      "Student parliaments in public secondary schools, run with state ministries of education.",
    ],
    outcomes: [
      { value: "412,000", label: "first-time voters registered" },
      { value: "640", label: "town halls hosted in 29 states" },
      { value: "18", label: "state budgets translated into plain language" },
    ],
    regions: ["All 36 states + FCT"],
    related: ["community-leaders-programme"],
    costLine: "₦15,000 hosts a young person at a town hall.",
    suggestedAmount: 15_000,
  },
  {
    slug: "youth-mentorship",
    name: "Youth mentorship",
    short: "Mentorship",
    icon: "users",
    image: photo("classroom"),
    summary: "The Torchbearers Mentorship Alliance pairs young people aged 14–19 with a trusted adult for at least two years.",
    problem:
      "Young people with a mentor are far more likely to finish school, go on to higher education and volunteer in their communities. Yet very few teenagers in public schools have access to one.",
    approach: [
      "Recruit, vet and train volunteer mentors — with safeguarding at the centre.",
      "Match on interests, location and goals; meet twice a month for at least two years.",
      "Monthly Torch Nights with guest speakers from public life.",
      "Micro-grants so every mentee leads a small community project.",
    ],
    outcomes: [
      { value: "3,860", label: "active mentoring matches" },
      { value: "92%", label: "of mentees in higher education or work after school" },
      { value: "112", label: "partner schools in four states" },
    ],
    regions: ["Enugu", "Kano", "Lagos", "FCT"],
    related: ["torchbearers-mentorship-alliance"],
    costLine: "₦40,000 funds a month of mentoring for one young person.",
    suggestedAmount: 40_000,
  },
  {
    slug: "public-service-pipeline",
    name: "Public service pipeline",
    short: "Public service",
    icon: "landmark",
    image: photo("boardroom"),
    summary: "Placements and fellowships that bring talented young professionals into government — and help them stay.",
    problem:
      "Many of the brightest young Africans never consider public service: it seems closed, slow and unrewarding. Meanwhile, governments struggle to recruit the analysts, engineers and managers they need.",
    approach: [
      "Two-year placements of young professionals in state ministries, co-funded with government.",
      "A mentoring circle for every placement, led by a senior civil servant.",
      "Research and advocacy on civil-service recruitment and pay reform.",
    ],
    outcomes: [
      { value: "146", label: "young professionals placed in government" },
      { value: "78%", label: "stayed in public service after their placement" },
      { value: "9", label: "partner state governments" },
    ],
    regions: ["Enugu", "Kaduna", "Ondo", "Plateau", "Ebonyi", "Rivers", "Kano", "Ogun", "FCT"],
    related: ["civic-scholars"],
    costLine: "₦100,000 covers a placement fellow’s training week.",
    suggestedAmount: 100_000,
  },
  {
    slug: "civic-ideas-lab",
    name: "Civic Ideas Lab",
    short: "Ideas Lab",
    icon: "lightbulb",
    image: photo("workshop"),
    summary: "Research, convenings and the Archive of Public Service — documenting what works in African governance.",
    problem:
      "African public-service innovations are rarely written down, and the people who led them retire without passing on what they learned. Each generation starts from scratch.",
    approach: [
      "Oral-history interviews with retired public servants — 300 recorded so far.",
      "Case studies of successful reforms, written for practitioners and taught in our programmes.",
      "The annual Leaders Africa Forum, bringing fellows together with heads of agencies.",
    ],
    outcomes: [
      { value: "300", label: "oral histories recorded" },
      { value: "42", label: "published case studies" },
      { value: "2,400", label: "attendees at the 2025 Leaders Africa Forum" },
    ],
    regions: ["Abuja", "Enugu"],
    related: ["leaders-africa-fellowship"],
    costLine: "₦75,000 records and transcribes one oral history.",
    suggestedAmount: 75_000,
  },
];

export const getProgramme = (slug: string) => programmes.find((p) => p.slug === slug);
