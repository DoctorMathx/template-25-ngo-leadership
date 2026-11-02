import { Photo } from "./photo";
import { cn } from "@/lib/utils";

/** Editorial page header: big sentence-case headline, optional full-bleed B&W image below. */
export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
  children,
  dark,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section className={cn(dark ? "bg-ink on-dark" : "bg-white")}>
      <div className="container-x pt-16 pb-14 md:pt-24 md:pb-20">
        <div className="eyebrow fade-up">{eyebrow}</div>
        <h1 className="display-lg mt-6 max-w-5xl fade-up delay-1">{title}</h1>
        {lede && <p className="lede mt-7 max-w-2xl fade-up delay-2">{lede}</p>}
        {children && <div className="mt-9 fade-up delay-3">{children}</div>}
      </div>
      {image && (
        <div className="container-x pb-4">
          <Photo src={image} alt={imageAlt ?? ""} priority className="aspect-[16/9] md:aspect-[21/9]" sizes="(min-width:1320px) 1320px, 100vw" kenburns />
        </div>
      )}
    </section>
  );
}
