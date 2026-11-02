import type { Partner, PartnerTier } from "@/lib/types";

// Fictional partners rendered as styled text "logos".
export const partners: Partner[] = [
  { name: "Meridian Trust Bank", type: "Founding partner", since: 2022, style: "serif" },
  { name: "Sahel Futures Fund", type: "Foundation", since: 2022, style: "caps" },
  { name: "Kora Telecom", type: "Corporate", since: 2023, style: "slab" },
  { name: "Northgate Foundation", type: "Foundation", since: 2023, style: "light" },
  { name: "Lumen Energy", type: "Corporate", since: 2024, style: "mono" },
  { name: "Pan-African Civic Fund", type: "Multilateral", since: 2024, style: "caps" },
  { name: "Harmattan Media", type: "In-kind media", since: 2024, style: "serif" },
  { name: "Ọnụ Capital", type: "Corporate", since: 2025, style: "light" },
  { name: "Enugu State Government", type: "Public partner", since: 2023, style: "slab" },
  { name: "Coal City Rotary", type: "Community", since: 2025, style: "mono" },
];

export const partnerTiers: PartnerTier[] = [
  {
    id: "founding",
    name: "Founding Partner",
    price: "₦500m+ over 3 years",
    blurb: "Shape the Foundation’s strategy and the Civic Centre with us.",
    features: [
      "Seat on the Partners’ Council, meeting twice a year with the founder and trustees",
      "Naming opportunity at the Okafor Civic Centre",
      "Co-designed programme with bespoke impact reporting",
      "Recognition on the Founding Supporters wall",
    ],
  },
  {
    id: "programme",
    name: "Programme Partner",
    price: "₦100m – ₦500m",
    blurb: "Fund a whole programme, a state or a theme.",
    features: [
      "Restricted funding for a programme of your choice",
      "Quarterly data and annual audited programme statement",
      "Fellows and mentees as speakers at your events",
      "Staff volunteering days",
    ],
    featured: true,
  },
  {
    id: "fellowship",
    name: "Fellowship Sponsor",
    price: "₦10m per fellow",
    blurb: "Sponsor named fellows in the Leaders Africa Fellowship.",
    features: [
      "Meet ‘your’ fellows at a convening",
      "Fellow’s commitment-project report",
      "Recognition in the cohort announcement",
    ],
  },
  {
    id: "community",
    name: "Community Partner",
    price: "In-kind or under ₦10m",
    blurb: "Venues, media, data, transport or professional skills.",
    features: [
      "Employee mentoring through Torchbearers",
      "Day of Service team volunteering",
      "Recognition on our website and annual report",
    ],
  },
];

export const grantPrinciples = [
  { title: "Restricted means restricted", body: "Grant funds sit in programme-coded ledgers and are spent only on the agreed purpose. Unspent balances are returned or re-allocated with your written consent." },
  { title: "Independent audit", body: "Annual accounts are audited by Nwosu, Bello & Partners and filed with the CAC. Grants above ₦100m receive a separate programme audit." },
  { title: "Reporting you can use", body: "Quarterly narrative and financial reports, a shared outcomes dashboard and an annual learning report — including what didn’t work." },
  { title: "Safeguarding & integrity", body: "Board-approved safeguarding, anti-fraud and whistleblowing policies. Every adult who works with under-18s is background-checked." },
];
