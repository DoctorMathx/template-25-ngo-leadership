"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Photo } from "./photo";
import { Modal } from "./modal";
import { cn } from "@/lib/utils";

/** Poster image with a play button that opens an accessible modal with an embed placeholder. */
export function VideoModal({ poster, title, duration, caption, className }: { poster: string; title: string; duration: string; caption?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <figure className={className}>
      <button type="button" onClick={() => setOpen(true)} className="group relative block w-full text-left" aria-haspopup="dialog" aria-label={`Play video: ${title} (${duration})`}>
        <Photo as="span" src={poster} alt="" className="aspect-video" sizes="(min-width:1320px) 1200px, 100vw" imgClassName="transition-transform duration-[1.4s] group-hover:scale-[1.03]">
          <span className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" aria-hidden="true" />
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white text-[color:var(--ink)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Play className="w-7 h-7 ml-1" fill="currentColor" strokeWidth={0} />
            </span>
          </span>
          <span className="absolute left-5 bottom-5 md:left-8 md:bottom-7 text-white" aria-hidden="true">
            <span className="block font-display text-xl md:text-3xl font-medium tracking-[-0.03em]">{title}</span>
            <span className="block text-[13px] opacity-80 mt-1 tabular">{duration}</span>
          </span>
        </Photo>
      </button>
      {caption && <figcaption className="mt-3 text-[13px] text-muted">{caption}</figcaption>}
      <Modal open={open} onClose={() => setOpen(false)} title={title} size="xl" dark>
        <div className={cn("aspect-video w-full border border-dashed border-[#4A4A4A] flex flex-col items-center justify-center text-center p-6")}>
          <Play className="w-10 h-10 text-on-dark-muted" strokeWidth={1} aria-hidden="true" />
          <p className="mt-4 font-display text-xl text-white">Embed your video here</p>
          <p className="mt-2 text-[14px] text-on-dark-muted max-w-md">
            Replace this placeholder in <code className="text-white">components/ui/video-modal.tsx</code> with a YouTube or Vimeo iframe, or a self-hosted &lt;video&gt; with captions.
          </p>
        </div>
        {caption && <p className="mt-4 text-[13px] text-on-dark-muted">{caption}</p>}
      </Modal>
    </figure>
  );
}
