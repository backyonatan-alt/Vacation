export type TabId = "home" | "tasks" | "games" | "bar" | "area" | "stats" | "more";

const TABS: { id: TabId; label: string; emoji: string }[] = [
  { id: "home", label: "בית", emoji: "🏖️" },
  { id: "tasks", label: "משימות", emoji: "✅" },
  { id: "games", label: "טורניר", emoji: "🏆" },
  { id: "bar", label: "בר", emoji: "🍹" },
  { id: "area", label: "אזור", emoji: "🗺️" },
  { id: "stats", label: "צ׳אט", emoji: "📊" },
  { id: "more", label: "עוד", emoji: "🔗" },
];

export function BottomNav({ active, onChange }: { active: TabId; onChange: (t: TabId) => void }) {
  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center pb-[max(12px,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto mx-3 flex w-full max-w-md items-stretch justify-around gap-1 rounded-[28px] bg-white/95 p-1.5 shadow-[0_12px_30px_-8px_rgba(40,56,79,0.45)] backdrop-blur">
        {TABS.map((t) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              aria-current={on ? "page" : undefined}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-[20px] py-2 text-[11px] font-bold transition-all duration-200 ${
                on ? "bg-pool text-white scale-105" : "text-ink-soft active:scale-95"
              }`}
            >
              <span className={`text-xl leading-none ${on ? "animate-wiggle" : ""}`}>{t.emoji}</span>
              {t.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
