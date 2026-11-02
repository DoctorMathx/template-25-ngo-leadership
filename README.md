# The Adaeze Okafor Foundation — FinStore NGO Template 25 (Leadership & Civic Legacy)

A premium website template for founder-led legacy foundations, leadership institutes and civic organisations. The fictional
brand is **The Adaeze Okafor Foundation** (HQ Abuja), set up by a former public servant to inspire, empower and connect
the next generation of African leaders through fellowships, civic engagement, youth mentorship (the *Torchbearers
Mentorship Alliance*) and a flagship **civic centre being built in Enugu**.

Design language: **"clean monochrome civic"** — white and near-black (`#0A0A0A`), large black-and-white photography
(CSS grayscale; a hint of colour returns on hover), one restrained civic-blue accent (`#2F5FE3`, AA on white) reserved for
links, focus and the Donate CTA, Inter Tight headlines with tight tracking in sentence case, Inter body, 1px hairlines,
square cards with no shadows, oversized founder pull quotes, a slow CSS Ken Burns zoom on hero imagery (disabled for
reduced motion) and an understated header with a full-screen overlay menu.

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and **Tailwind CSS v4**. No backend: every form is
fully interactive client-side and sends nothing, and every payment is simulated. All people and organisations are fictional.

## Pages

| Route | What it does |
| --- | --- |
| `/` | Data-driven homepage (modules below) |
| `/founder` | Long-form editorial: hero portrait, personal letter with drop cap and signature, video poster + play button opening an accessible modal ("embed your video here"), oversized pull quote, timeline of public service, biography and values, "continue the work" CTAs |
| `/leaders` | Leaders programmes index: four programmes, comparison table, alumni teaser |
| `/leaders/[slug]` | Leaders Africa Fellowship · Civic Scholars · Torchbearers Mentorship Alliance · Community Leaders Programme — facts, eligibility, key-dates timeline, curriculum, benefits, alumni, "sponsor a place" donate CTA |
| `/leaders/apply` | Multi-step application: personal details (with age-eligibility check per programme), leadership experience, three essays with live character counters, two references (validated, must differ from applicant and each other), review with edit links + consents → confirmation with application ID and next steps. Prefill with `?programme=` |
| `/leaders/alumni` | "Meet the leaders": searchable grid filtered by cohort year, country, focus and programme; profile modal. Deep-link with `?fellow=<id>` |
| `/civic-centre` | Capital campaign: vision, principles, rendering placeholder, spaces, building-milestones timeline, ₦ raised vs goal, use of funds, gift-level donate links prefilled to the capital campaign, **naming opportunities table** (filter by zone / gift level; "Reserve" or "Join waitlist" opens an enquiry modal), **Founding Supporters wall** |
| `/get-involved` | Movement page: **"Commit to serve" pledge** (live counter, commitments, pledge card, share), local chapters, days of service / town halls with RSVP modals, mentor/volunteer form, fundraiser form, "Join the community" newsletter |
| `/donate` | One-time/monthly/annual, preset amounts with impact lines, custom amount, designation (general / capital campaign / campaign / programme / leaders programme), cover-fees, tribute, anonymous, donor details, Card / Bank transfer (copyable account + reference; capital gifts show the restricted capital account) / USSD, sticky summary. Prefill: `?amount=&campaign=&frequency=&designation=&programme=` (`campaign=civic-centre` → capital campaign) |
| `/donate/thank-you` | Receipt (reference, amount, fee, frequency, designation, date, tax note), print, share, next steps, founder's thank-you |
| `/campaigns`, `/campaigns/[slug]` | Appeals with raised vs goal, %, donors, days left; story, use of funds, updates, recent donors, prefilled donate buttons |
| `/partnerships` | Why partner, tiers, current partners (styled text logos), how grant funds are managed, proposal enquiry form |
| `/transparency` | Income + expenditure SVG donuts, "of every ₦1,000", annual reports, registration & governance, board of trustees |
| `/programmes`, `/programmes/[slug]` | Five pillars: leadership development, civic engagement, youth mentorship, public service pipeline, Civic Ideas Lab |
| `/impact` | Headline numbers, growth by year, outcomes tracked, reach by region, methodology |
| `/stories`, `/stories/[slug]` | Founder letters, fellow stories, Civic Centre updates, news |
| `/events` | All events with registration / volunteer / ticket modals |
| `/about` | Mission, vision, values, history, team, board |
| `/contact` | Contact form, both offices, map placeholder |
| `/faq` | Grouped accordion: giving, tax & receipts, the Civic Centre, fellowships, volunteering |

Also included: `opengraph-image`, `twitter-image`, `sitemap.xml`, `robots.txt` and a custom 404.

## Home modules

`siteConfig.home.modules` in `lib/site-config.ts` controls the homepage. Reorder or remove entries:

`hero` · `founderNote` · `numbers` · `leaders` · `alumni` · `civicCentre` · `movement` · `programmes` · `campaigns` ·
`stories` · `events` · `partners` · `transparency` · `community`

## Customising

| What | Where |
| --- | --- |
| Brand, founder name, contacts, legal name & auditor, bank + capital account, USSD, presets & impact lines, fee rate, announcement bar, hero CTAs, home modules | `lib/site-config.ts` |
| Founder bio, letter, quotes, video poster, values, public-service timeline | `mock/founder.ts` |
| Leaders programmes (eligibility, timeline, curriculum, benefits, sponsor amount) | `mock/leaders.ts` |
| Alumni / fellows (cohort, country, focus, bio, project, quote, portrait) | `mock/alumni.ts` |
| Civic centre: vision, spaces, campaign goal/raised, milestones, naming opportunities, Founding Supporters | `mock/civic-centre.ts` |
| Pledge counter base/goal, commitments, recent pledges, chapters | `mock/pledge.ts` |
| Campaigns | `mock/campaigns.ts` (the capital campaign reads its numbers from `civic-centre.ts`) |
| Programmes · Stories · Events | `mock/programmes.ts` · `mock/stories.ts` · `mock/events.ts` |
| Partners, tiers, grant principles | `mock/partners.ts` |
| Financials, reports, governance | `mock/financials.ts` |
| Team, board, history, mission/vision | `mock/team.ts` |
| FAQs · Navigation · Images | `mock/faqs.ts` · `mock/navigation.ts` · `mock/images.ts` |
| Donation designations | `lib/designations.ts` |
| Design tokens (ink, stone, line, accent) and utilities (`.photo`, `.kenburns`, `.btn-*`, `.display-*`) | `app/globals.css` |
| Video embed | replace the placeholder in `components/ui/video-modal.tsx` |
| Signature | replace the SVG path in `components/ui/signature.tsx` |

To show a photo in colour, pass `color` to `<Photo>`; everything else is black and white by design.

Fonts are Inter Tight (display) and Inter (body) via `next/font/google`. The only environment variable is
`NEXT_PUBLIC_SITE_URL` (used for `metadataBase`, sitemap and robots).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

Images are Unsplash placeholders (shown in grayscale) — replace with your own photography, with consent.
