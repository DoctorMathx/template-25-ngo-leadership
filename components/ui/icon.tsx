import { BookOpen, Building2, Compass, Globe, GraduationCap, Handshake, Landmark, Lightbulb, Megaphone, Sprout, Users, Vote } from "lucide-react";
import type { IconName } from "@/lib/types";

const MAP = { compass: Compass, landmark: Landmark, users: Users, megaphone: Megaphone, lightbulb: Lightbulb, graduation: GraduationCap, handshake: Handshake, vote: Vote, book: BookOpen, globe: Globe, sprout: Sprout, building: Building2 } as const;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const C = MAP[name];
  return <C className={className ?? "w-6 h-6"} strokeWidth={1.25} aria-hidden="true" />;
}
