import type { Metadata } from "next";
import { stories } from "@/mock/stories";
import { StoryCard } from "@/components/ui/cards";

export const metadata: Metadata = {
  title: "Stories",
  description: "Letters from our founder, stories from fellows, Civic Centre construction updates and news.",
};

export default function StoriesPage() {
  const [lead, ...rest] = stories;
  return (
    <>
      <section className="bg-white">
        <div className="container-x pt-14 md:pt-20 pb-12">
          <div className="eyebrow">Stories</div>
          <h1 className="display-lg mt-5 max-w-4xl">Notes from the work.</h1>
        </div>
      </section>
      <section className="bg-white pb-24">
        <div className="container-x">
          <div className="border-t border-line pt-10"><StoryCard s={lead} large /></div>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 border-t border-line pt-12">
            {rest.map((s) => <StoryCard key={s.slug} s={s} />)}
          </div>
        </div>
      </section>
    </>
  );
}
