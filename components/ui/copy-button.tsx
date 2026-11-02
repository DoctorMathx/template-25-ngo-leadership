"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({ text, label, className, children }: { text: string; label: string; className?: string; children?: React.ReactNode }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={cn("inline-flex items-center justify-center gap-2 min-w-[44px] min-h-[44px]", className)}
      aria-label={children ? undefined : `Copy ${label}`}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          /* clipboard unavailable — still show feedback */
        }
        setDone(true);
        setTimeout(() => setDone(false), 1800);
      }}
    >
      {done ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />}
      {children && <span>{done ? "Copied" : children}</span>}
      <span className="sr-only" aria-live="polite">{done ? `${label} copied` : ""}</span>
    </button>
  );
}
