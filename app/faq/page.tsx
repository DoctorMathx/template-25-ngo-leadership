import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/mock/faqs";
import { FaqAccordion } from "@/components/ui/faq-accordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about giving, tax and receipts, the Civic Centre, fellowships and volunteering.",
};

export default function FaqPage() {
  const groups = Array.from(new Set(faqs.map((f) => f.group)));
  return (
    <>
      <section className="bg-white">
        <div className="container-x pt-14 md:pt-20 pb-12">
          <div className="eyebrow">FAQ</div>
          <h1 className="display-lg mt-5">Questions, answered.</h1>
          <nav aria-label="FAQ sections" className="mt-8 flex flex-wrap gap-2">
            {groups.map((g) => <a key={g} href={`#${g.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="min-h-[44px] inline-flex items-center px-4 border border-line hover:border-[color:var(--ink)] text-[14px] font-medium">{g}</a>)}
          </nav>
        </div>
      </section>
      <section className="bg-white pb-24">
        <div className="container-x space-y-16">
          {groups.map((g) => (
            <div key={g} id={g.toLowerCase().replace(/[^a-z]+/g, "-")} className="grid lg:grid-cols-12 gap-8 scroll-mt-28">
              <h2 className="lg:col-span-4 display-sm">{g}</h2>
              <div className="lg:col-span-8"><FaqAccordion items={faqs.filter((f) => f.group === g)} /></div>
            </div>
          ))}
          <p className="text-ink-2">Still have a question? <Link href="/contact" className="link">Contact us</Link>.</p>
        </div>
      </section>
    </>
  );
}
