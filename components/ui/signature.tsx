/** A hand-drawn style signature mark (decorative). Replace with an SVG of your founder's real signature. */
export function Signature({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 110" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 82c18-6 34-34 44-58 4-10 7-12 6 0-2 22-6 44-4 56 8-20 20-34 30-32 6 2-6 28 0 30 8 2 14-22 22-24 6-2 2 20 8 22 8 2 12-24 20-22 4 1 0 16 6 18 10 2 22-30 34-30 8 0-8 26 2 28 12 2 30-26 44-26 10 0-4 18 6 20 14 2 34-16 52-18" />
      <path d="M40 60c40-8 120-12 220-6" strokeWidth="1.4" opacity=".7" />
      <path d="M236 30c-4 10-6 30-2 40" strokeWidth="1.8" />
    </svg>
  );
}
