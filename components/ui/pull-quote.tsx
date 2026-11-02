import { cn } from "@/lib/utils";

export function PullQuote({ text, by, context, className, size = "lg" }: { text: string; by: string; context?: string; className?: string; size?: "md" | "lg" }) {
  return (
    <figure className={cn("max-w-5xl", className)}>
      <span aria-hidden="true" className="block font-display text-[5rem] leading-[.6] text-[color:var(--accent)] select-none">“</span>
      <blockquote className={cn("font-display font-medium tracking-[-0.035em] mt-4", size === "lg" ? "text-[clamp(1.9rem,4.4vw,3.9rem)] leading-[1.06]" : "text-[clamp(1.5rem,2.8vw,2.3rem)] leading-[1.15]")}>
        {text}
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4 text-[14px]">
        <span aria-hidden="true" className="w-10 h-px bg-current" />
        <span><span className="font-semibold">{by}</span>{context && <span className="opacity-70"> · {context}</span>}</span>
      </figcaption>
    </figure>
  );
}
