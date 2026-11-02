"use client";

import { useState } from "react";
import type { EventItem } from "@/lib/types";
import { formatDate, formatNaira } from "@/lib/utils";
import { Modal } from "./modal";
import { SmartForm } from "./smart-form";

export function EventRegister({ e, className = "btn btn-outline btn-sm w-full md:w-auto" }: { e: EventItem; className?: string }) {
  const [open, setOpen] = useState(false);
  const label = e.volunteer ? "Volunteer" : e.price ? "Buy a seat" : "Register";
  return (
    <>
      <button type="button" aria-haspopup="dialog" onClick={() => setOpen(true)} className={className}>
        {label}<span className="sr-only"> for {e.title}</span>
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title={e.title}>
        <p className="text-[14.5px] text-ink-2">{formatDate(e.date)} · {e.time} · {e.location}, {e.state}</p>
        <p className="mt-1 text-[14px] text-muted">{e.price ? `${formatNaira(e.price)} per seat — we’ll send payment details by email.` : "Free"} · {e.spotsLeft} places left</p>
        <SmartForm
          className="mt-6"
          submitLabel={label}
          successTitle={e.volunteer ? "You’re on the team." : "You’re registered."}
          successBody={`We’ve emailed your confirmation for ${e.title}. You’ll get a reminder by WhatsApp two days before.`}
          fields={[
            { name: "name", label: "Full name", required: true, half: true, autoComplete: "name" },
            { name: "email", label: "Email", type: "email", required: true, half: true, autoComplete: "email" },
            { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, half: true, autoComplete: "tel" },
            { name: "group", label: e.price ? "Seats" : "Group size", type: "number", required: true, min: 1, max: Math.min(10, e.spotsLeft), half: true, defaultValue: "1" },
            ...(e.volunteer
              ? [{ name: "role", label: "I’d like to help with", type: "select" as const, options: [ { value: "build", label: "Painting & repairs" }, { value: "books", label: "Books & reading" }, { value: "voter", label: "Voter-registration desk" }, { value: "any", label: "Anything useful" } ] }]
              : []),
            { name: "access", label: "Accessibility needs (optional)", type: "textarea" },
          ]}
        />
      </Modal>
    </>
  );
}
