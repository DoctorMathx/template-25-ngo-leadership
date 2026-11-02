"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accessible modal built on the native <dialog> element:
 * focus is trapped and restored by the browser, Esc closes, backdrop click closes.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  size = "md",
  dark,
  hideTitle,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "md" | "lg" | "xl";
  dark?: boolean;
  hideTitle?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={cn(
        "m-auto w-[calc(100%-1.5rem)] max-h-[calc(100dvh-1.5rem)] p-0 overflow-y-auto",
        size === "md" && "max-w-xl",
        size === "lg" && "max-w-3xl",
        size === "xl" && "max-w-5xl",
        dark ? "bg-[color:var(--ink)] text-white on-dark" : "bg-white text-[color:var(--ink)]"
      )}
    >
      {open && (
        <div className="relative">
          <div className={cn("sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-7 h-16 border-b", dark ? "bg-[color:var(--ink)] border-dark" : "bg-white border-line")}>
            <h2 id={titleId} className={cn("font-display text-lg font-medium tracking-[-0.02em] truncate", hideTitle && "sr-only")}>{title}</h2>
            <button type="button" onClick={onClose} className="ml-auto w-11 h-11 -mr-2 flex items-center justify-center hover:opacity-70" aria-label="Close dialog">
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
          <div className="px-5 sm:px-7 py-6 sm:py-8">{children}</div>
        </div>
      )}
    </dialog>
  );
}
