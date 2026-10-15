import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useContent } from "../editable";

type Mode = "light" | "dark";

function current(): Mode {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Light or dark. The page starts in whatever the visitor's system asks for
 * (index.html applies a stored choice before the first paint); this switch
 * overrides it and remembers the choice.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<Mode>(() => (typeof window === "undefined" ? "light" : current()));
  const toLight = useContent("nav.theme.toLight");
  const toDark = useContent("nav.theme.toDark");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setMode(current());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const flip = () => {
    const next: Mode = mode === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: the choice lasts for this page only */
    }
    setMode(next);
  };

  // An icon, not a word: a sun to go light, a moon to go dark. The words are
  // its label, for screen readers and the tooltip.
  const label = mode === "dark" ? toLight : toDark;
  return (
    <button
      type="button"
      onClick={flip}
      aria-pressed={mode === "dark"}
      aria-label={label}
      title={label}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-pill)] text-ink transition-colors hover:bg-surface ${className}`}
    >
      {mode === "dark" ? <Sun aria-hidden="true" size={20} strokeWidth={1.75} /> : <Moon aria-hidden="true" size={20} strokeWidth={1.75} />}
    </button>
  );
}
