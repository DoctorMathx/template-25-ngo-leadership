import Link from "next/link";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { footerNav } from "@/mock/navigation";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const b = siteConfig.brand;
  const o = siteConfig.org;
  const socials = [
    { href: b.social.instagram, label: "Instagram", Icon: Instagram },
    { href: b.social.twitter, label: "X (Twitter)", Icon: Twitter },
    { href: b.social.youtube, label: "YouTube", Icon: Youtube },
    { href: b.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  ];
  return (
    <footer className="bg-ink on-dark pb-24 sm:pb-0">
      <div className="container-x pt-20 pb-12 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-5">
          <Logo light />
          <p className="mt-8 display-sm text-white max-w-md">Join a movement of people who show up for their communities.</p>
          <div className="mt-8 max-w-md">
            <NewsletterForm dark cta="Join the community" />
          </div>
        </div>
        <nav aria-label="Footer" className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerNav.map((g) => (
            <div key={g.title}>
              <div className="eyebrow">{g.title}</div>
              <ul className="mt-5 space-y-1">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex items-center min-h-[40px] text-[14.5px] text-on-dark hover:text-[color:var(--accent-on-dark)]">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="container-x py-8 border-t border-dark grid md:grid-cols-[1fr_auto] gap-6 items-center text-[13px] text-on-dark-muted">
        <div className="space-y-1">
          <p>{o.legalName} · Registered not-for-profit · Audited annually</p>
          <p>{b.address} · {b.email} · {b.phone}</p>
          <p>© {new Date().getFullYear()} {b.name}. Strictly non-partisan. All people and organisations shown are fictional.</p>
        </div>
        <ul className="flex gap-1">
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="w-11 h-11 flex items-center justify-center border border-dark text-white hover:bg-white hover:text-[color:var(--ink)]">
                <Icon className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
