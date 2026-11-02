import type { FinanceSlice } from "@/lib/types";

// FY2025 (year ended 31 December 2025), audited. Operating figures exclude restricted capital-campaign gifts.
export const financialYear = "2025";
export const totalIncome = 4_620_000_000;
export const totalExpenditure = 4_280_000_000;

export const income: FinanceSlice[] = [
  { label: "Foundations & grants", value: 34, shade: "#0A0A0A" },
  { label: "Individual donors", value: 31, shade: "#4A4A4A", note: "71% of individual gifts were under ₦100,000" },
  { label: "Corporate partners", value: 21, shade: "#8A8A8A" },
  { label: "Endowment income", value: 8, shade: "#2F5FE3" },
  { label: "Events", value: 6, shade: "#C8C8C8" },
];

export const expenses: FinanceSlice[] = [
  { label: "Leadership development", value: 38, shade: "#0A0A0A" },
  { label: "Youth mentorship", value: 21, shade: "#3A3A3A" },
  { label: "Civic engagement", value: 15, shade: "#6A6A6A" },
  { label: "Public service & Ideas Lab", value: 10, shade: "#9A9A9A" },
  { label: "Fundraising", value: 9, shade: "#C8C8C8" },
  { label: "Administration & governance", value: 7, shade: "#2F5FE3" },
];

export const perThousand = [
  { amount: 380, label: "Leadership fellowships and training" },
  { amount: 210, label: "Mentoring young people" },
  { amount: 150, label: "Civic engagement and voter education" },
  { amount: 100, label: "Public service placements and research" },
  { amount: 90, label: "Raising the next ₦1,000" },
  { amount: 70, label: "Governance, audit and administration" },
];

export const capitalCampaignNote =
  "Capital-campaign gifts for the Okafor Civic Centre are held in a separate, restricted capital account and reported separately in our audited accounts. 10% of each gift is transferred to the operations endowment.";

export const reports = [
  { year: "2025", title: "Annual Report & Audited Accounts 2025", size: "PDF · 6.8 MB" },
  { year: "2025", title: "Learning Report 2025: what worked, what didn’t", size: "PDF · 2.1 MB" },
  { year: "2025", title: "Civic Centre Capital Account Statement 2025", size: "PDF · 0.9 MB" },
  { year: "2024", title: "Annual Report & Audited Accounts 2024", size: "PDF · 5.4 MB" },
  { year: "2023", title: "Annual Report & Audited Accounts 2023", size: "PDF · 4.2 MB" },
  { year: "2022", title: "Founding Report 2022", size: "PDF · 2.6 MB" },
];

export const governance = [
  { label: "Registration", value: "Incorporated Trustees under Part F, CAMA 2020" },
  { label: "Policies", value: "Safeguarding, conflict of interest, anti-fraud, whistleblowing, data protection (NDPA 2023)" },
  { label: "Board", value: "7 trustees, 5 independent; the founder does not chair the Audit & Risk Committee" },
  { label: "Founder’s pay", value: "Our founder takes no salary, fees or expenses from the Foundation" },
];
