"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { primaryNav, overlayNav } from "@/mock/navigation";
import { siteConfig } from "@/lib/site-config";
import { founder } from "@/mock/founder";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const root = overlayRef.current;
    root?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !root) return;
      const els = Array.from(root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <div className="bg-ink on-dark">
        <div className="container-x flex items-center justify-center sm:justify-between gap-4 min-h-[40px] text-[13px]">
          <p className="text-on-dark-muted truncate">{siteConfig.announcement.text}</p>
          <Link href={siteConfig.announcement.href} className="hidden sm:inline-flex items-center gap-1.5 font-semibold text-white hover:text-[color:var(--accent-on-dark)] min-h-[40px]">
            {siteConfig.announcement.cta} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-line">
        <div className="container-x flex items-center justify-between gap-3 sm:gap-6 h-[76px]">
          <Logo />
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {primaryNav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={cn("relative inline-flex items-center min-h-[44px] text-[14.5px] font-medium hover:text-[color:var(--accent)]", isActive(l.href) && "after:absolute after:left-0 after:right-0 after:bottom-2 after:h-px after:bg-current")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link href="/donate" className="btn btn-accent btn-sm hidden sm:inline-flex">Donate</Link>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="inline-flex items-center gap-3 min-h-[44px] px-2 -mr-2 text-[14.5px] font-medium hover:text-[color:var(--accent)]"
            >
              <span>Menu</span>
              <span aria-hidden="true" className="flex flex-col gap-[6px] w-6">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-2/3 bg-current self-end" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="site-menu"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] bg-ink on-dark overflow-y-auto overlay-in"
        >
          <div className="container-x flex items-center justify-between h-[76px] border-b border-dark">
            <Logo light onClick={() => setOpen(false)} />
            <button data-autofocus type="button" onClick={close} className="inline-flex items-center gap-3 min-h-[44px] px-2 -mr-2 text-[14.5px] font-medium text-white hover:text-[color:var(--accent-on-dark)]">
              Close <X className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <div className="container-x py-12 md:py-16 grid lg:grid-cols-12 gap-12">
            <nav aria-label="Site" className="lg:col-span-8 grid sm:grid-cols-3 gap-10">
              {overlayNav.map((g, gi) => (
                <div key={g.title} className="rise" style={{ animationDelay: `${gi * 70}ms` }}>
                  <div className="eyebrow">{g.title}</div>
                  <ul className="mt-6 space-y-1">
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive(l.href) ? "page" : undefined}
                          className={cn("block py-1.5 font-display text-[1.7rem] md:text-[2rem] leading-tight font-medium tracking-[-0.035em] text-white hover:text-[color:var(--accent-on-dark)]", isActive(l.href) && "text-[color:var(--accent-on-dark)]")}
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
            <aside className="lg:col-span-4 lg:border-l border-dark lg:pl-10 rise" style={{ animationDelay: "220ms" }}>
              <blockquote className="font-display text-2xl leading-snug tracking-[-0.03em] text-white">“{founder.quotes[0].text}”</blockquote>
              <p className="mt-4 text-[13.5px] text-on-dark-muted">— {founder.name}, Founder</p>
              <div className="mt-10 flex flex-col gap-3">
                <Link href="/donate" onClick={() => setOpen(false)} className="btn btn-accent btn-lg">Donate</Link>
                <Link href="/leaders/apply" onClick={() => setOpen(false)} className="btn btn-outline-light btn-lg">Apply to a programme</Link>
              </div>
              <p className="mt-10 text-[13px] text-on-dark-muted">{siteConfig.brand.email}<br />{siteConfig.brand.phone}</p>
            </aside>
          </div>
        </div>
      )}
    </>
  );
}
