import type { Story } from "@/lib/types";
import { photo } from "./images";

export const stories: Story[] = [
  {
    slug: "the-classroom-with-one-window",
    title: "The classroom with one window",
    excerpt: "Our founder returns to Gidan Madi, where she taught as a 22-year-old, and meets the student who now runs the school.",
    category: "From the founder",
    date: "2026-10-12",
    readMins: 7,
    author: "Adaeze Okafor",
    image: photo("classroom"),
    body: [
      "The road to Gidan Madi is paved now. In 1991 it took me four hours from Sokoto on the back of a pickup; this time it took ninety minutes, and I spent most of them trying to remember the names of my students.",
      "I need not have worried. Halima Yusuf remembered all of them. She was fourteen when I taught her government, sitting in the second row under the only window that opened. Today she chairs the Gidan Madi Mothers’ Association, which runs evening classes for 230 girls who had left school, and she is a graduate of our Community Leaders Programme.",
      "She showed me the classroom. It has four windows now, and a solar panel, and a shelf of books with a hand-written lending register. ‘We didn’t wait for the school to come,’ she told me. ‘We became the school.’",
      "I have given many speeches about leadership. None of them were as good as that sentence.",
    ],
    quote: { text: "We didn’t wait for the school to come. We became the school.", by: "Halima Yusuf, Community Leaders Programme ’25" },
  },
  {
    slug: "topping-out-democracy-hall",
    title: "Topping out: the roof goes on Democracy Hall",
    excerpt: "Three hundred workers, fellows and neighbours watched the final truss lifted into place in Enugu.",
    category: "Civic Centre",
    date: "2026-09-26",
    readMins: 4,
    author: "Ifeoma Uzor, Capital Campaign Director",
    image: photo("constructionSite"),
    body: [
      "At 10:42 on a Saturday morning, a crane lifted the last steel truss over the roof of Democracy Hall. Below, three hundred people — site workers in orange, Torchbearers in school uniform, neighbours from Nike Lake Road — applauded as the welders made it fast.",
      "Topping out marks the end of the structural phase. Next come the laterite façade screens, the glazing, and the interiors: library shelving from a joinery workshop in Awka, seating for 600, and eight studios for young leaders.",
      "We are now 64% of the way to our ₦18.5 billion goal. Thank you to all 3,412 founding supporters — and especially to the 2,100 who gave less than ₦1 million each.",
    ],
  },
  {
    slug: "wardwatch-and-the-1900-projects",
    title: "WardWatch and the 1,900 projects",
    excerpt: "How a 2024 fellow built a tool that lets citizens photograph, verify and track every constituency project in six states.",
    category: "Fellows",
    date: "2026-08-30",
    readMins: 6,
    author: "Zara Mensah, Fellow ’25",
    image: photo("teamLaptop"),
    body: [
      "Oluwatobi Adeyemi’s commitment project began with a spreadsheet and a question: what happened to the boreholes, classrooms and streetlights promised in the federal budget?",
      "Two years later, WardWatch maps 1,900 constituency projects across Lagos, Ogun, Oyo, Enugu, Kano and Plateau. Volunteers visit each site, photograph it and record whether it exists, is finished, or is abandoned. Legislators now cite the data in committee hearings.",
      "‘The fellowship didn’t give me the idea,’ Tobi says. ‘It gave me fifty-three people who told me the idea was good enough to quit my job for.’",
    ],
    quote: { text: "It gave me fifty-three people who told me the idea was good enough to quit my job for.", by: "Oluwatobi Adeyemi, Fellow ’24" },
  },
  {
    slug: "ready-to-vote-first-100-town-halls",
    title: "Ready to Vote: the first 100 town halls",
    excerpt: "Candidates from five parties have agreed to answer young people’s questions — unscripted — before the 2027 elections.",
    category: "Civic life",
    date: "2026-10-28",
    readMins: 5,
    author: "Seun Oladipo, Community Leaders ’24",
    image: photo("eventHall"),
    body: [
      "The rules are simple. Candidates get two minutes to introduce themselves. Then the microphone belongs to the audience — and the audience is under 30.",
      "Our first 100 Ready to Vote town halls are scheduled across 29 states between November and January. Every one is non-partisan, recorded and published in full, with plain-language summaries in English, Hausa, Igbo, Yoruba and Pidgin.",
      "If you’d like to volunteer — as a moderator, timekeeper or note-taker — sign up on our Get Involved page.",
    ],
  },
  {
    slug: "2026-leaders-africa-cohort-announced",
    title: "Meet the 2026 Leaders Africa cohort",
    excerpt: "Fifty-four fellows from seventeen countries — a midwife, a county climate officer, an open-data engineer and a head teacher among them.",
    category: "News",
    date: "2026-04-15",
    readMins: 3,
    author: "Fellowships team",
    image: photo("audienceDark"),
    body: [
      "This year 3,812 people applied for 54 places — our most competitive year yet. The 2026 cohort includes fellows from 17 countries, 52% of them women, with an average of nine years of leadership experience.",
      "They will meet for the first time in Abuja in June, and for the last time at the new Okafor Civic Centre in Enugu in 2027.",
    ],
  },
  {
    slug: "why-we-publish-our-mistakes",
    title: "Why we publish our mistakes",
    excerpt: "Our 2025 learning report includes three programmes that didn’t work. Here’s what we changed.",
    category: "News",
    date: "2026-06-03",
    readMins: 5,
    author: "Dr. Kelechi Ume, Director of Learning",
    image: photo("meeting"),
    body: [
      "Foundations are very good at publishing success. We think we owe our donors, and the young people we serve, the full picture.",
      "In 2025, our online-only mentoring pilot in Lagos had a 46% drop-out rate. Our first attempt at state-level placement fellowships in two states stalled when budgets were frozen. And our community radio series reached fewer listeners than we projected.",
      "In each case, we’ve written up what happened and what we changed — blended in-person mentoring, co-funding agreements signed before recruitment, and partnering with existing stations rather than buying airtime.",
    ],
  },
];

export const getStory = (slug: string) => stories.find((s) => s.slug === slug);
