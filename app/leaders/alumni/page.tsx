import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { AlumniClient } from "./alumni-client";
import { fellows, countries } from "@/mock/alumni";

export const metadata: Metadata = {
  title: "Meet the leaders",
  description: "Fellows, scholars and community leaders from across Africa. Filter by cohort year, country and focus.",
};

export default function AlumniPage() {
  return (
    <>
      <section className="bg-white">
        <div className="container-x pt-14 md:pt-20 pb-10 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <div className="eyebrow">Meet the leaders</div>
            <h1 className="display-lg mt-5">They didn’t wait their turn.</h1>
            <p className="lede mt-6 max-w-2xl">Ward councillors and midwives, coders and head teachers, traders’ union secretaries and county climate officers. A selection of our {fellows.length} featured alumni from {countries.length} countries.</p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link href="/leaders/apply" className="btn btn-ink btn-lg">Join them — apply</Link>
          </div>
        </div>
      </section>
      <Suspense fallback={<div className="container-x py-24 text-muted">Loading leaders…</div>}>
        <AlumniClient />
      </Suspense>
    </>
  );
}
