"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <div className="border-t border-line">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={`${uid}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-start justify-between gap-6 py-6 text-left min-h-[44px] group"
              >
                <span className="font-display text-lg md:text-xl font-medium tracking-[-0.02em] group-hover:text-[color:var(--accent)]">{f.q}</span>
                <Plus className={cn("w-5 h-5 mt-1 shrink-0 transition-transform duration-300", isOpen && "rotate-45")} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </h3>
            <div id={`${uid}-a${i}`} role="region" aria-labelledby={`${uid}-q${i}`} hidden={!isOpen} className="pb-7 pr-10 text-ink-2 leading-relaxed max-w-3xl">
              {f.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
