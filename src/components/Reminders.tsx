import { EVENTS } from "../data/trip";
import { downloadICS } from "../lib/ics";
import { Card } from "./ui";

// כרטיס "הוסיפו ליומן" — מוריד קובץ ICS שהטלפון פותח ביומן ומזכיר אוטומטית
export function Reminders() {
  const fmt = new Intl.DateTimeFormat("he-IL", {
    weekday: "short",
    day: "numeric",
    month: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <Card className="p-4">
      <div className="mb-1 flex items-center justify-between">
        <span className="font-display font-bold text-ink">📅 תזכורות ליומן</span>
        <button
          onClick={() => downloadICS(EVENTS, "beit-alfa-2026.ics")}
          className="rounded-full bg-pool px-3 py-1.5 text-sm font-bold text-white active:scale-95"
        >
          הוסיפו הכל
        </button>
      </div>
      <p className="mb-3 text-sm text-ink-soft">
        מורידים ליומן (Google/Apple) ומקבלים התראה שעה לפני כל אירוע.
      </p>
      <div className="space-y-1.5">
        {EVENTS.map((e) => (
          <button
            key={e.id}
            onClick={() => downloadICS([e], `${e.id}-beit-alfa.ics`)}
            className="flex w-full items-center gap-2 rounded-2xl bg-cream px-3 py-2 text-right active:scale-[0.98]"
          >
            <span className="font-semibold text-ink">{e.title}</span>
            <span className="mr-auto text-xs font-medium text-ink-soft">
              {fmt.format(new Date(e.startISO))}
            </span>
            <span className="text-pool">＋</span>
          </button>
        ))}
      </div>
    </Card>
  );
}
