import type { TimelineEntry } from "@/lib/types";
import { photo } from "./images";

// Adaeze Okafor is a fictional person. Replace with your founder's own words and history.
export const founder = {
  name: "Adaeze Okafor",
  honorific: "Dr.",
  born: "Nsukka, Enugu State",
  portrait: photo("founder", 1400),
  working: photo("founderWork", 1400),
  short:
    "A teacher, civil servant and former Chair of the National Civic Service Commission, Adaeze Okafor spent three decades in public life before founding the Foundation in 2022.",
  bio: [
    "Adaeze Okafor grew up in Nsukka, the second of six children of a primary-school headmistress and a court clerk. She learned early that institutions are only as good as the people who show up for them — and that most people are never asked.",
    "After a national-service year teaching in a rural secondary school in Sokoto State, she joined the federal civil service as an administrative officer. Over twenty-five years she rose through youth policy, served as Enugu State’s Commissioner for Education, and chaired the National Civic Service Commission, where she led the reform that put 1.2 million young Nigerians through structured community placements.",
    "She left public office in 2021 with one conviction: that Africa does not lack leaders, it lacks the ladders that let them climb. The Foundation is her attempt to build those ladders — and to leave them standing long after she is gone.",
  ],
  letter: {
    title: "A letter to the next generation",
    date: "2026-09-01",
    salutation: "To every young person who has ever been told to wait their turn,",
    body: [
      "I was twenty-two when I stood in front of my first classroom in Gidan Madi. There were sixty-one students, eleven textbooks and one window that opened. I remember thinking that someone, somewhere, had decided this was good enough. It took me years to understand that the someone was all of us — and that the only way to change a decision is to be in the room where it is made.",
      "I spent the next three decades in those rooms. I sat on panels and in budget hearings, in village squares and in the Federal Executive Council chamber. I learned that public service is mostly unglamorous: it is reading the annex, returning the call, visiting the school after the cameras have gone. And I learned that the most powerful word in any democracy is not ‘vote’ or ‘law’ — it is ‘we’.",
      "When I left office, people asked what I would do next. The honest answer is that I wanted to give away what had been given to me: a mentor who believed in me before I believed in myself, a network of people who answered my letters, and a place to practise leadership before it counted. Most young Africans never receive any of those three things. This Foundation exists to change that.",
      "So here is my invitation. If you are already leading — running a youth association, a clinic, a startup, a ward committee — apply to our programmes. If you are not sure you are a leader yet, find someone younger than you and become their mentor; you will discover that you are. And if you are in a position to give, help us finish the civic centre in Enugu: a building where a girl from Gidan Madi can walk in, sit down at the same table as a minister, and be heard.",
      "None of this is quick. Institutions take a generation to build and a single season to neglect. But I have seen what happens when young people are trusted with real responsibility. They do not wait their turn. They make one.",
    ],
    closing: "With hope, and with work still to do,",
  },
  quotes: [
    { text: "Africa does not lack leaders. It lacks the ladders that let them climb.", context: "Founding address, Abuja, 2022" },
    { text: "The most powerful word in any democracy is not ‘vote’ or ‘law’. It is ‘we’.", context: "Letter to the next generation" },
    { text: "Leadership is mostly unglamorous. It is reading the annex, returning the call, and visiting the school after the cameras have gone.", context: "Leaders Africa Forum, 2025" },
  ],
  video: {
    title: "Why I started this Foundation",
    duration: "4:12",
    poster: photo("speakerCrowd", 1800),
    caption: "Adaeze Okafor at the Leaders Africa Forum, Abuja, 2025.",
  },
  values: [
    { title: "Serve first", body: "Leadership is something you do for others before it is something you are." },
    { title: "Build institutions, not idols", body: "We invest in systems and networks that outlast any one person — including our founder." },
    { title: "Trust young people with real work", body: "Responsibility is the curriculum. Our fellows lead projects with budgets, deadlines and consequences." },
    { title: "Show the receipts", body: "We publish our finances, our outcomes and our mistakes." },
  ],
};

export const founderTimeline: TimelineEntry[] = [
  { year: "1968", title: "Born in Nsukka", body: "Second of six children; her mother runs the town’s first girls’ reading club from the family veranda." },
  { year: "1990", title: "Graduates in Political Science", body: "First-class degree from the University of Nigeria, Nsukka. Leads the student union’s campaign for a campus health centre." },
  { year: "1991", title: "National service in Sokoto State", body: "Teaches government and English at a rural secondary school in Gidan Madi — the year she calls her real education." },
  { year: "1996", title: "Joins the federal civil service", body: "Administrative Officer, Federal Ministry of Youth Development. Drafts her first youth-policy memo by hand." },
  { year: "2004", title: "Director, Youth Policy", body: "Designs the national youth-volunteering framework adopted by 22 states." },
  { year: "2011", title: "Commissioner for Education, Enugu State", body: "Reopens 140 rural schools and introduces student parliaments in every public secondary school." },
  { year: "2015", title: "Chair, National Civic Service Commission", body: "Leads the reform that places 1.2 million young Nigerians in structured community-service roles." },
  { year: "2021", title: "Leaves public office", body: "Declines a further appointment to focus on the next generation." },
  { year: "2022", title: "Founds the Foundation", body: "Launches with a personal gift of her pension lump sum and the support of 40 founding donors." },
  { year: "2024", title: "First Leaders Africa cohort", body: "Fifty-four fellows from fourteen countries convene in Abuja." },
  { year: "2025", title: "Breaks ground in Enugu", body: "Construction begins on the Okafor Civic Centre on Nike Lake Road." },
  { year: "2027", title: "The Civic Centre opens", body: "A permanent home for young leaders, public debate and the archive of public service.", current: true },
];
