"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileDonateBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/donate") || pathname.startsWith("/leaders/apply")) return null;
  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-line px-3 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-[1fr_1.3fr] gap-2">
        <Link href="/leaders/apply" className="btn btn-outline">Apply</Link>
        <Link href="/donate" className="btn btn-accent">Donate</Link>
      </div>
    </div>
  );
}
