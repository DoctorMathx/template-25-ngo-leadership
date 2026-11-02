import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stories, getStory } from "@/mock/stories";
import { Photo } from "@/components/ui/photo";
import { PullQuote } from "@/components/ui/pull-quote";
import { StoryCard } from "@/components/ui/cards";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) return { title: "Story not found" };
  return { title: s.title, description: s.excerpt, openGraph: { type: "article", images: [s.image] } };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getStory(slug);
  if (!s) notFound();
  const more = stories.filter((x) => x.slug !== s.slug).slice(0, 3);
  const [first, ...restBody] = s.body;
  return (
    <>
      <article>
        <header className="bg-white">
          <div className="container-narrow pt-14 md:pt-20 pb-10">
            <nav aria-label="Breadcrumb" className="text-[13px] text-muted"><Link href="/stories" className="hover:underline underline-offset-4">Stories</Link> <span aria-hidden="true">/</span> {s.category}</nav>
            <h1 className="display-md mt-6">{s.title}</h1>
            <p className="lede mt-5">{s.excerpt}</p>
            <p className="mt-6 text-[14px] text-muted">By <span className="text-[color:var(--ink)] font-semibold">{s.author}</span> · <time dateTime={s.date}>{formatDate(s.date)}</time> · {s.readMins} min read</p>
          </div>
          <div className="container-x">
            <Photo src={s.image} alt="" priority className="aspect-[16/9] md:aspect-[21/9]" sizes="(min-width:1320px) 1320px, 100vw" />
          </div>
        </header>
        <div className="container-narrow section-sm prose-civic">
          <p className="dropcap">{first}</p>
          {restBody.slice(0, 1).map((p, i) => <p key={i}>{p}</p>)}
        </div>
        {s.quote && (
          <div className="container-x pb-10">
            <PullQuote text={s.quote.text} by={s.quote.by} size="md" />
          </div>
        )}
        {restBody.length > 1 && (
          <div className="container-narrow pb-16 prose-civic">
            {restBody.slice(1).map((p, i) => <p key={i}>{p}</p>)}
          </div>
        )}
      </article>
      <section className="section-sm bg-stone">
        <div className="container-x">
          <h2 className="display-sm">More stories</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {more.map((m) => <StoryCard key={m.slug} s={m} />)}
          </div>
        </div>
      </section>
    </>
  );
}
