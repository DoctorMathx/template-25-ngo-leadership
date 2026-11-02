import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionHead({
  index,
  eyebrow,
  title,
  lede,
  href,
  linkLabel,
  className,
  as: As = "h2",
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  href?: string;
  linkLabel?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("grid lg:grid-cols-12 gap-6 lg:gap-10 items-end", className)}>
      <div className="lg:col-span-8">
        <div className="eyebrow">
          {index && <span className="eyebrow-num">{index}</span>}
          {index && <span aria-hidden="true" className="w-8 h-px bg-current" />}
          {eyebrow}
        </div>
        <As className="display-md mt-5 max-w-3xl">{title}</As>
        {lede && <p className="lede mt-5 max-w-2xl">{lede}</p>}
      </div>
      {href && (
        <div className="lg:col-span-4 lg:text-right">
          <Link href={href} className="link-arrow">
            {linkLabel ?? "See all"} <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}
