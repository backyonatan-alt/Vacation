import type { ReactNode } from "react";

// כרטיס לבן מעוגל עם צל רך — אבן הבניין של ה-Pool Party Pop
export function Card({
  children,
  className = "",
  tint = "bg-white",
}: {
  children: ReactNode;
  className?: string;
  tint?: string;
}) {
  return (
    <div
      className={`rounded-3xl ${tint} shadow-[0_10px_30px_-12px_rgba(40,56,79,0.35)] ${className}`}
    >
      {children}
    </div>
  );
}

// כותרת מקטע עם אימוג'י
export function SectionTitle({ emoji, children }: { emoji: string; children: ReactNode }) {
  return (
    <h2 className="font-display flex items-center gap-2 px-1 text-2xl font-bold text-ink">
      <span className="text-2xl">{emoji}</span>
      {children}
    </h2>
  );
}

// תווית קטנה (chip)
export function Chip({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${className}`}
    >
      {children}
    </span>
  );
}
