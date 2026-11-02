// Central config — change these values (or swap the whole file) and the template rebrands.
// Brand, founder, organisation, donation settings and homepage modules all live here.

export type HomeModule =
  | "hero"
  | "founderNote"
  | "numbers"
  | "leaders"
  | "alumni"
  | "civicCentre"
  | "movement"
  | "programmes"
  | "campaigns"
  | "stories"
  | "events"
  | "partners"
  | "transparency"
  | "community";

export const siteConfig = {
  brand: {
    name: "The Adaeze Okafor Foundation",
    short: "Okafor Foundation",
    monogram: "AO",
    tagline: "Inspiring, empowering and connecting Africa’s next generation of leaders.",
    description:
      "The Adaeze Okafor Foundation is a founder-led legacy foundation that inspires, empowers and connects the next generation of African leaders — through leadership fellowships, civic engagement, youth mentorship and a new civic centre in Enugu.",
    domain: "okaforfoundation.org",
    email: "hello@okaforfoundation.org",
    applyEmail: "fellowships@okaforfoundation.org",
    partnershipsEmail: "partners@okaforfoundation.org",
    campaignEmail: "civiccentre@okaforfoundation.org",
    phone: "+234 809 555 0127",
    whatsapp: "+234 809 555 0127",
    whatsappLink: "https://wa.me/2348095550127",
    address: "14 Aguiyi Ironsi Street, Maitama, Abuja FCT 904101",
    enuguAddress: "Okafor Civic Centre site office, Nike Lake Road, Enugu 400102",
    city: "Abuja, Nigeria",
    hours: "Mon–Fri, 9:00–17:00 WAT",
    social: {
      instagram: "https://instagram.com/okaforfoundation",
      twitter: "https://x.com/okaforfdn",
      youtube: "https://youtube.com/@okaforfoundation",
      linkedin: "https://linkedin.com/company/okaforfoundation",
    },
  },

  founder: {
    name: "Adaeze Okafor",
    title: "Founder & Chair",
    signoff: "Adaeze",
  },

  org: {
    legalName: "The Adaeze Okafor Foundation (Incorporated Trustees)",
    founded: 2022,
    auditor: "Nwosu, Bello & Partners (Chartered Accountants)",
  },

  announcement: {
    text: "Applications for the 2027 Leaders Africa Fellowship close 15 January.",
    href: "/leaders/apply",
    cta: "Apply now",
  },

  donation: {
    currency: "₦",
    feeRate: 0.015,
    minAmount: 1000,
    bank: {
      bankName: "Access Bank Plc",
      accountName: "The Adaeze Okafor Foundation",
      accountNumber: "1428806153",
      capitalAccountName: "Okafor Foundation — Civic Centre Capital Account",
      capitalAccountNumber: "1428806160",
      usdAccount: "1428806177 (USD domiciliary)",
    },
    ussd: {
      code: "*901*000*1428806153#",
      label: "Access Bank USSD",
      hint: "Dial from any Nigerian line; replace 000 with your amount, e.g. *901*10000*1428806153#",
    },
    frequencies: [
      { id: "one-time", label: "One-time" },
      { id: "monthly", label: "Monthly" },
      { id: "annual", label: "Annual" },
    ],
    presets: [
      { amount: 5000, impact: "buys a full set of civic-education workbooks for one Torchbearers mentee" },
      { amount: 15000, impact: "hosts a young person at a community town hall, with transport and lunch" },
      { amount: 40000, impact: "funds a month of one-to-one mentoring for a 16-year-old in Enugu or Kano" },
      { amount: 100000, impact: "covers a Civic Scholar’s research stipend for their community project" },
      { amount: 250000, impact: "sends one fellow to a week-long Leaders Africa convening" },
      { amount: 1000000, impact: "names a seat in Democracy Hall at the Okafor Civic Centre, Enugu" },
    ],
    receiptNote:
      "The Adaeze Okafor Foundation is a registered non-profit under Part F of CAMA 2020. Donations by companies may be deductible under Section 25 of the Companies Income Tax Act, subject to FIRS conditions. Keep this receipt for your records.",
  },

  home: {
    // Reorder / toggle homepage modules per organisation.
    modules: [
      "hero",
      "founderNote",
      "numbers",
      "leaders",
      "alumni",
      "civicCentre",
      "movement",
      "programmes",
      "campaigns",
      "stories",
      "events",
      "partners",
      "transparency",
      "community",
    ] as HomeModule[],
    heroCta: { label: "Apply to the Fellowship", href: "/leaders/apply" },
    heroCtaSecondary: { label: "Read the founder’s letter", href: "/founder" },
  },
} as const;
