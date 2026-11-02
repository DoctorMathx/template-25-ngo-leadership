import Image from "next/image";
import { cn } from "@/lib/utils";

/** Black-and-white photograph in a fixed aspect box (no layout shift). */
export function Photo({
  src,
  alt,
  className,
  sizes = "100vw",
  priority,
  kenburns,
  color,
  imgClassName,
  children,
  as: Tag = "div",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  kenburns?: boolean;
  color?: boolean;
  imgClassName?: string;
  children?: React.ReactNode;
  /** Use "span" when the photo sits inside a <button>. */
  as?: "div" | "span";
}) {
  const positioned = /(^|\s)(absolute|fixed)(\s|$)/.test(className ?? "");
  return (
    <Tag className={cn("block overflow-hidden bg-[#1a1a1a]", !positioned && "relative", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", color ? "photo-color" : "photo", kenburns && "kenburns", imgClassName)}
      />
      {children}
    </Tag>
  );
}
