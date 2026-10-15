import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * A section that fades and rises a little as it enters the viewport — the
 * house style's one reveal, used everywhere instead of being written out
 * each time. `prefers-reduced-motion` shows it settled, with no motion.
 */
export default function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      id={id}
      className={className}
      initial={reduced ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.section>
  );
}
