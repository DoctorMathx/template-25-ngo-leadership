import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Logo({ light, className, onClick }: { light?: boolean; className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className={cn("group inline-flex min-w-0 items-center gap-2.5 sm:gap-3 min-h-[44px]", className)} aria-label={`${siteConfig.brand.name} — home`}>
      <span
        aria-hidden="true"
        className={cn(
          "w-10 h-10 shrink-0 flex items-center justify-center font-display text-[15px] font-semibold tracking-[-0.04em] border",
          light ? "border-white text-white" : "border-[color:var(--ink)] text-[color:var(--ink)]"
        )}
      >
        {siteConfig.brand.monogram}
      </span>
      <span className={cn("min-w-0 leading-[1.05] font-display text-[14px] sm:text-[15px] font-medium tracking-[-0.02em]", light ? "text-white" : "text-[color:var(--ink)]")}>
        <span className="block text-[11px] font-normal tracking-[0.02em] opacity-70">The</span>
        Adaeze Okafor Foundation
      </span>
    </Link>
  );
}
