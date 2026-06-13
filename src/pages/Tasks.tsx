import { TASKS, TASK_CATEGORIES, PACKING, type Task } from "../data/trip";
import { Card, Chip } from "../components/ui";
import { useLocalState } from "../lib/hooks";

function PackingSection() {
  const [checked, setChecked] = useLocalState<Record<string, boolean>>("vhq:packing", {});
  const toggle = (k: string) => setChecked((p) => ({ ...p, [k]: !p[k] }));
  return (
    <section className="space-y-3">
      <header className="px-1 text-white drop-shadow">
        <h2 className="font-display text-2xl font-extrabold">מה לארוז? 🧳</h2>
        <p className="text-sm font-medium opacity-95">צ׳ק-ליסט אישי — נשמר רק אצלכם</p>
      </header>
      {PACKING.map((g) => (
        <Card key={g.label} className="p-4">
          <div className="mb-2 font-display flex items-center gap-2 font-bold text-ink">
            <span>{g.emoji}</span>
            {g.label}
          </div>
          <div className="space-y-1">
            {g.items.map((item) => {
              const key = `${g.label}:${item}`;
              const on = checked[key];
              return (
                <button
                  key={key}
                  onClick={() => toggle(key)}
                  className="flex w-full items-center gap-3 rounded-2xl py-1.5 text-right active:scale-[0.99]"
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border-[3px] transition ${
                      on ? "border-mint bg-mint text-white" : "border-ink-soft/30"
                    }`}
                  >
                    {on && <span className="text-sm leading-none">✓</span>}
                  </span>
                  <span className={`font-medium text-ink ${on ? "line-through opacity-50" : ""}`}>
                    {item}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>
      ))}
    </section>
  );
}

export function Tasks({
  doneMap,
  onToggle,
}: {
  doneMap: Record<string, boolean>;
  onToggle: (id: string, e: React.MouseEvent) => void;
}) {
  const isDone = (t: Task) => doneMap[t.id] ?? t.done ?? false;
  const cats = Object.keys(TASK_CATEGORIES) as Task["cat"][];

  return (
    <div className="space-y-5">
      <header className="px-1 pt-1 text-white drop-shadow">
        <h1 className="font-display text-3xl font-extrabold">מה עוד חסר לנו?! ✅</h1>
        <p className="font-medium opacity-95">סימון נשמר אצלך במכשיר · האמת הרשמית בטבלת הקניות</p>
      </header>

      {cats.map((cat) => {
        const meta = TASK_CATEGORIES[cat];
        const items = TASKS.filter((t) => t.cat === cat);
        if (!items.length) return null;
        return (
          <section key={cat} className="space-y-2">
            <h2 className="font-display flex items-center gap-2 px-1 text-xl font-bold text-white drop-shadow">
              <span>{meta.emoji}</span>
              {meta.label}
            </h2>
            {items.map((t) => {
              const done = isDone(t);
              return (
                <Card key={t.id} tint={meta.tint} className="flex items-center gap-3 p-3.5">
                  <button
                    onClick={(e) => onToggle(t.id, e)}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-[3px] transition-all active:scale-90 ${
                      done ? "border-mint bg-mint text-white" : "border-ink-soft/40"
                    }`}
                    aria-label={done ? "בוטל" : "סמן כבוצע"}
                  >
                    {done && <span className="text-lg leading-none">✓</span>}
                  </button>
                  <span className="text-2xl">{t.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className={`font-semibold text-ink ${done ? "line-through opacity-50" : ""}`}>
                      {t.title}
                    </div>
                    <Chip className="mt-0.5 bg-white/70 text-ink-soft">👤 {t.who}</Chip>
                  </div>
                </Card>
              );
            })}
          </section>
        );
      })}

      <PackingSection />
    </div>
  );
}
