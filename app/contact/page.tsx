import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { SmartForm } from "@/components/ui/smart-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact The Adaeze Okafor Foundation in Abuja and at the Civic Centre site office in Enugu.",
};

export default function ContactPage() {
  const b = siteConfig.brand;
  return (
    <>
      <section className="bg-white">
        <div className="container-x pt-14 md:pt-20 pb-12">
          <div className="eyebrow">Contact</div>
          <h1 className="display-lg mt-5">Get in touch.</h1>
        </div>
      </section>
      <section className="bg-white pb-24">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <ul className="border-t border-line">
              {[
                { Icon: MapPin, k: "Head office", v: b.address },
                { Icon: MapPin, k: "Civic Centre site office", v: b.enuguAddress },
                { Icon: Phone, k: "Phone", v: b.phone, href: `tel:${b.phone.replace(/\s/g, "")}` },
                { Icon: MessageCircle, k: "WhatsApp", v: b.whatsapp, href: b.whatsappLink },
                { Icon: Mail, k: "General", v: b.email, href: `mailto:${b.email}` },
                { Icon: Mail, k: "Fellowships", v: b.applyEmail, href: `mailto:${b.applyEmail}` },
                { Icon: Mail, k: "Partnerships", v: b.partnershipsEmail, href: `mailto:${b.partnershipsEmail}` },
                { Icon: Mail, k: "Capital campaign", v: b.campaignEmail, href: `mailto:${b.campaignEmail}` },
              ].map(({ Icon, k, v, href }) => (
                <li key={k} className="grid grid-cols-[28px_1fr] gap-3 py-4 border-b border-line">
                  <Icon className="w-5 h-5 mt-0.5" strokeWidth={1.25} aria-hidden="true" />
                  <div>
                    <p className="text-[13px] text-muted">{k}</p>
                    {href ? <a href={href} className="font-medium hover:text-[color:var(--accent)] break-words">{v}</a> : <p className="font-medium">{v}</p>}
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[14px] text-muted">{b.hours}</p>
            <div className="mt-8 aspect-[4/3] bg-[color:var(--stone)] border border-line flex items-center justify-center text-center p-6" role="img" aria-label="Map placeholder showing our Maitama, Abuja office">
              <div>
                <MapPin className="w-8 h-8 mx-auto" strokeWidth={1} aria-hidden="true" />
                <p className="mt-3 font-display text-lg">Maitama, Abuja</p>
                <p className="text-[13px] text-muted mt-1">Embed your map here</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 border border-line p-6 md:p-10">
            <h2 className="display-sm">Send us a message</h2>
            <SmartForm
              className="mt-8"
              submitLabel="Send message"
              fields={[
                { name: "name", label: "Full name", required: true, half: true, autoComplete: "name" },
                { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
                { name: "phone", label: "Phone (optional)", type: "tel", half: true, autoComplete: "tel" },
                { name: "topic", label: "Topic", type: "select", required: true, half: true, options: [ { value: "general", label: "General enquiry" }, { value: "apply", label: "Applications & fellowships" }, { value: "donation", label: "Donations & receipts" }, { value: "centre", label: "Civic Centre & naming" }, { value: "media", label: "Media & speaking requests" }, { value: "partner", label: "Partnerships" } ] },
                { name: "message", label: "Message", type: "textarea", required: true, min: 20 },
                { name: "consent", label: "I agree to be contacted about my enquiry.", type: "checkbox", required: true },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
