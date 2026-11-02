import type { Partner } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Styled text "logo" for a fictional partner — swap for real SVG logos in production. */
export function PartnerWordmark({ p, dark }: { p: Partner; dark?: boolean }) {
  const styles: Record<Partner["style"], string> = {
    serif: "font-serif italic text-[19px] tracking-[-0.01em]",
    caps: "uppercase text-[12.5px] font-semibold tracking-[.22em]",
    slab: "font-display text-[19px] font-semibold tracking-[-0.04em]",
    light: "font-display text-[19px] font-normal tracking-[-0.02em] lowercase",
    mono: "font-mono text-[14px] tracking-tight",
  };
  return <span className={cn(styles[p.style], dark ? "text-on-dark" : "text-[#4D4D4D]")}>{p.name}</span>;
}
