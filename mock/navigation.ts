import type { NavGroup, NavLink } from "@/lib/types";

export const primaryNav: NavLink[] = [
  { label: "Founder", href: "/founder" },
  { label: "Leaders", href: "/leaders" },
  { label: "Civic Centre", href: "/civic-centre" },
  { label: "Get involved", href: "/get-involved" },
];

export const overlayNav: NavGroup[] = [
  {
    title: "Our work",
    links: [
      { label: "Leaders programmes", href: "/leaders", description: "Fellowships, scholars, mentoring" },
      { label: "Meet the leaders", href: "/leaders/alumni" },
      { label: "Programmes", href: "/programmes" },
      { label: "Impact", href: "/impact" },
      { label: "Stories", href: "/stories" },
    ],
  },
  {
    title: "Give & join",
    links: [
      { label: "The Civic Centre", href: "/civic-centre" },
      { label: "Campaigns", href: "/campaigns" },
      { label: "Get involved", href: "/get-involved" },
      { label: "Events", href: "/events" },
      { label: "Partnerships", href: "/partnerships" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our founder", href: "/founder" },
      { label: "About us", href: "/about" },
      { label: "Transparency", href: "/transparency" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const footerNav: NavGroup[] = [
  { title: "Leaders", links: [ { label: "Leaders Africa Fellowship", href: "/leaders/leaders-africa-fellowship" }, { label: "Civic Scholars", href: "/leaders/civic-scholars" }, { label: "Torchbearers", href: "/leaders/torchbearers-mentorship-alliance" }, { label: "Apply", href: "/leaders/apply" }, { label: "Alumni", href: "/leaders/alumni" } ] },
  { title: "Support", links: [ { label: "Donate", href: "/donate" }, { label: "Civic Centre", href: "/civic-centre" }, { label: "Campaigns", href: "/campaigns" }, { label: "Partnerships", href: "/partnerships" }, { label: "Get involved", href: "/get-involved" } ] },
  { title: "Foundation", links: [ { label: "Founder", href: "/founder" }, { label: "About", href: "/about" }, { label: "Programmes", href: "/programmes" }, { label: "Impact", href: "/impact" }, { label: "Transparency", href: "/transparency" } ] },
  { title: "Help", links: [ { label: "Stories", href: "/stories" }, { label: "Events", href: "/events" }, { label: "FAQ", href: "/faq" }, { label: "Contact", href: "/contact" } ] },
];
