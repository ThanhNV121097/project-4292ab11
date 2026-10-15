/**
 * Green Lotus's mark: a flagstick on the green, drawn as a lotus petal would
 * be — one simple curved form, in currentColor so it follows the palette and
 * both modes. Used beside the name (Logo.tsx) and as the favicon.
 */
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 5 V24" />
      <path d="M16 6 C16 6 24 7 24 12 C24 15 20 16 16 15 Z" fill="currentColor" stroke="none" />
      <path d="M9 27 C9 23 22 23 23 27" />
    </svg>
  );
}
