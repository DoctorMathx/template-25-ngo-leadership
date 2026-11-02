export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { title: string; links: NavLink[] };

export type IconName =
  | "compass"
  | "landmark"
  | "users"
  | "megaphone"
  | "lightbulb"
  | "graduation"
  | "handshake"
  | "vote"
  | "book"
  | "globe"
  | "sprout"
  | "building";

export type TimelineEntry = { year: string; title: string; body: string; current?: boolean };

export type LeaderProgramme = {
  slug: string;
  name: string;
  short: string;
  kicker: string;
  image: string;
  summary: string;
  intro: string[];
  duration: string;
  format: string;
  cohortSize: string;
  ages: string;
  cost: string;
  status: "Applications open" | "Opens soon" | "Rolling" | "Closed";
  deadline?: string;
  facts: { label: string; value: string }[];
  eligibility: string[];
  timeline: { date: string; label: string; detail: string }[];
  curriculum: { title: string; body: string }[];
  benefits: string[];
  applyable: boolean;
  sponsorAmount: number;
  sponsorLine: string;
};

export type Fellow = {
  id: string;
  name: string;
  country: string;
  city: string;
  cohort: number;
  programme: string; // leader programme slug
  focus: Focus;
  role: string;
  image?: string;
  initials: string;
  bio: string;
  project: string;
  quote: string;
};

export type Focus =
  | "Public service"
  | "Civic tech"
  | "Education"
  | "Health"
  | "Climate"
  | "Enterprise"
  | "Media"
  | "Justice";

export type Programme = {
  slug: string;
  name: string;
  short: string;
  icon: IconName;
  image: string;
  summary: string;
  problem: string;
  approach: string[];
  outcomes: { value: string; label: string }[];
  regions: string[];
  related: string[]; // leader programme slugs
  costLine: string;
  suggestedAmount: number;
};

export type CampaignUpdate = { date: string; title: string; body: string };
export type Donor = { name: string; amount: number; when: string; note?: string };

export type Campaign = {
  slug: string;
  title: string;
  kicker: string;
  image: string;
  summary: string;
  story: string[];
  raised: number;
  goal: number;
  donors: number;
  deadline: string;
  programme: string;
  budget: { label: string; amount: number }[];
  updates: CampaignUpdate[];
  recentDonors: Donor[];
  suggested: number[];
  featuredHref?: string;
};

export type Story = {
  slug: string;
  title: string;
  excerpt: string;
  category: "From the founder" | "Fellows" | "Civic life" | "Civic Centre" | "News";
  date: string;
  readMins: number;
  author: string;
  image: string;
  body: string[];
  quote?: { text: string; by: string };
};

export type EventItem = {
  slug: string;
  title: string;
  kind: "Forum" | "Day of service" | "Town hall" | "Info session" | "Site tour" | "Fundraiser";
  date: string;
  time: string;
  location: string;
  state: string;
  image: string;
  summary: string;
  spotsLeft: number;
  price: number; // 0 = free
  volunteer?: boolean;
};

export type Partner = { name: string; type: string; since: number; style: "serif" | "mono" | "caps" | "slab" | "light" };

export type PartnerTier = {
  id: string;
  name: string;
  price: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};

export type Person = { name: string; role: string; bio: string; image?: string; initials: string };

export type Faq = { q: string; a: string; group: string };

export type FinanceSlice = { label: string; value: number; shade: string; note?: string };

export type NamingOpportunity = {
  id: string;
  space: string;
  zone: "Democracy Hall" | "Library & Archive" | "Leadership Studios" | "Fellows’ Residence" | "Grounds";
  detail: string;
  price: number;
  status: "Available" | "Reserved" | "Named";
  quantity?: number;
  namedFor?: string;
};

export type Milestone = { date: string; title: string; body: string; status: "done" | "current" | "next" };

export type SupporterTier = { id: string; name: string; min: number; names: string[] };
