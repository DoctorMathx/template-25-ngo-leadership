import { Photo } from "./photo";
import { cn } from "@/lib/utils";

/** A portrait photo, or a typographic monogram tile when no photo is supplied. */
export function Portrait({ name, initials, image, className, sizes = "(min-width:1024px) 300px, 50vw", as = "div" }: { name: string; initials: string; image?: string; className?: string; sizes?: string; as?: "div" | "span" }) {
  if (image) return <Photo as={as} src={image} alt={`Portrait of ${name}`} className={cn("aspect-[4/5]", className)} sizes={sizes} imgClassName="photo-reveal" />;
  const Tag = as;
  return (
    <Tag className={cn("aspect-[4/5] bg-[color:var(--stone)] border border-line flex items-end p-5 w-full", className)} role="img" aria-label={`Monogram for ${name}`}>
      <span aria-hidden="true" className="font-display text-[clamp(3rem,7vw,5rem)] font-medium tracking-[-0.06em] leading-none text-[#BDBDBD]">{initials}</span>
    </Tag>
  );
}
