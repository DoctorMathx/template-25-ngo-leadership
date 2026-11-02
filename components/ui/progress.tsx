import { cn, compactNaira, daysLeft, formatNumber, percent } from "@/lib/utils";

export function ProgressBar({ value, goal, accent, label }: { value: number; goal: number; accent?: boolean; label: string }) {
  const pct = percent(value, goal);
  return (
    <div className={cn("bar", accent && "bar-accent")} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={label}>
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}

export function CampaignProgress({
  raised,
  goal,
  donors,
  deadline,
  accent,
  large,
  title,
}: {
  raised: number;
  goal: number;
  donors: number;
  deadline: string;
  accent?: boolean;
  large?: boolean;
  title: string;
}) {
  const pct = percent(raised, goal);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <span className={cn("font-display font-medium tabular tracking-[-0.03em]", large ? "text-4xl md:text-5xl" : "text-2xl")}>{compactNaira(raised)}</span>
          <span className="text-muted text-[14px] ml-2">of {compactNaira(goal)}</span>
        </div>
        <span className={cn("font-display tabular font-medium", large ? "text-2xl" : "text-lg")}>{pct}%</span>
      </div>
      <div className="mt-4">
        <ProgressBar value={raised} goal={goal} accent={accent} label={`${title}: ${pct}% funded`} />
      </div>
      <dl className="mt-4 flex gap-6 text-[13.5px] text-muted">
        <div><dt className="sr-only">Donors</dt><dd><span className="text-[color:var(--ink)] font-semibold tabular">{formatNumber(donors)}</span> donors</dd></div>
        <div><dt className="sr-only">Days left</dt><dd><span className="text-[color:var(--ink)] font-semibold tabular">{daysLeft(deadline)}</span> days left</dd></div>
      </dl>
    </div>
  );
}
