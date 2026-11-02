import type { Metadata } from "next";
import { Suspense } from "react";
import { ApplyClient } from "./apply-client";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply to the Leaders Africa Fellowship, Civic Scholars or the Community Leaders Programme. Five short steps, about 90 minutes.",
};

export default function ApplyPage() {
  return (
    <>
      <section className="bg-white">
        <div className="container-x pt-14 md:pt-20 pb-12 md:pb-16">
          <div className="eyebrow">Applications · 2027 intake</div>
          <h1 className="display-lg mt-5 max-w-4xl">Apply to lead with us.</h1>
          <p className="lede mt-6 max-w-2xl">Five steps, about 90 minutes. You’ll need two referees and three short essays. Your answers stay in this tab while you work — we recommend drafting essays in a document first.</p>
        </div>
      </section>
      <Suspense fallback={<div className="container-x py-24 text-muted">Loading application form…</div>}>
        <ApplyClient />
      </Suspense>
    </>
  );
}
