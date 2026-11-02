import type { Metadata } from "next";
import { Suspense } from "react";
import { DonateClient } from "./donate-client";

export const metadata: Metadata = {
  title: "Donate",
  description: "Give once, monthly or annually to train Africa’s next generation of leaders and build the Okafor Civic Centre. Card, bank transfer or USSD.",
};

export default function DonatePage() {
  return (
    <>
      <section className="bg-white">
        <div className="container-x pt-14 md:pt-20 pb-12 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <div className="eyebrow">Donate</div>
            <h1 className="display-lg mt-5">Invest in the next generation.</h1>
          </div>
          <ul className="lg:col-span-4 text-[14px] text-ink-2 border-t border-line">
            <li className="py-3 border-b border-line">Secure, encrypted payment · instant receipt</li>
            <li className="py-3 border-b border-line">84% spent directly on programmes</li>
            <li className="py-3 border-b border-line">Registered not-for-profit · audited annually</li>
          </ul>
        </div>
      </section>
      <Suspense fallback={<div className="container-x py-24 text-muted">Loading donation form…</div>}>
        <DonateClient />
      </Suspense>
    </>
  );
}
