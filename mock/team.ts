import type { Person } from "@/lib/types";
import { photo } from "./images";

export const mission =
  "To inspire, empower and connect the next generation of African leaders — and to give them the training, mentors, networks and public spaces to serve their communities well.";
export const vision = "An Africa governed by people who were trusted with responsibility early, and who passed that trust on.";

export const history = [
  { year: "2022", title: "Founded in Abuja", body: "Launched with the founder’s pension lump sum and 40 founding donors." },
  { year: "2023", title: "Torchbearers begins", body: "First 410 mentoring matches in Enugu public schools." },
  { year: "2024", title: "Leaders Africa Fellowship", body: "Our first cohort of 54 fellows from 14 countries." },
  { year: "2025", title: "Ground broken in Enugu", body: "Construction begins on the Okafor Civic Centre." },
  { year: "2026", title: "Ready to Vote", body: "The largest non-partisan youth voter-education drive in our history." },
  { year: "2027", title: "Doors open", body: "The Okafor Civic Centre opens to the public." },
];

export const team: Person[] = [
  { name: "Adaeze Okafor", role: "Founder & Chair", initials: "AO", image: photo("founder", 700), bio: "Former Chair of the National Civic Service Commission. Takes no salary from the Foundation." },
  { name: "Dr. Kelechi Ume", role: "Chief Executive", initials: "KU", image: photo("pChidi", 700), bio: "Previously director of a pan-African governance programme; leads strategy and our 64-person team." },
  { name: "Ifeoma Uzor", role: "Capital Campaign Director", initials: "IU", image: photo("pAdwoa", 700), bio: "Leads the ₦18.5bn campaign for the Okafor Civic Centre." },
  { name: "Musa Danladi", role: "Director, Fellowships", initials: "MD", image: photo("pKwame", 700), bio: "Runs selection and convenings for the Leaders Africa Fellowship and Civic Scholars." },
  { name: "Chioma Okeke", role: "Director, Torchbearers", initials: "CO", image: photo("pEsi", 700), bio: "A former head teacher who built our safeguarding-first mentoring model." },
  { name: "Tunde Bakare", role: "Finance Director, FCA", initials: "TB", image: photo("pIbrahim", 700), bio: "Chartered accountant; oversees restricted funds and the capital account." },
];

export const board: Person[] = [
  { name: "Adaeze Okafor", role: "Chair", initials: "AO", bio: "Founder." },
  { name: "Justice Ngozi Achor (rtd.)", role: "Vice-Chair", initials: "NA", bio: "Retired Justice of the Court of Appeal." },
  { name: "Mallam Sani Lawal", role: "Trustee; Chair, Audit & Risk", initials: "SL", bio: "Former Accountant-General of a northern state; FCA." },
  { name: "Prof. Ama Ofori", role: "Trustee", initials: "AO", bio: "Professor of Public Policy, Accra; author on African civil services." },
  { name: "Ebere Nnaji", role: "Trustee", initials: "EN", bio: "Managing Partner at a Lagos law firm; governance specialist." },
  { name: "Amarachi Eze", role: "Trustee (alumni seat)", initials: "AE", bio: "Leaders Africa Fellow ’24, elected by alumni." },
  { name: "Dr. Yusuf Abdullahi", role: "Trustee", initials: "YA", bio: "Paediatrician and founder of a Kano children’s hospital." },
];
