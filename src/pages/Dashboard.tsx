import { TRIP, KITCHEN_NOTE, QUOTES, TASKS, CHAT_STATS, type Task } from "../data/trip";
import { useCountdown, useWeather, weatherEmoji } from "../lib/hooks";
import { Card } from "../components/ui";
import { Reminders } from "../components/Reminders";
import { PhotoWall } from "../components/PhotoWall";
import type { TabId } from "../components/BottomNav";

function Countdown() {
  const t = useCountdown(TRIP.startISO);
  if (t.done) {
    return (
      <div className="text-center">
        <div className="font-display text-4xl font-bold text-melon">אנחנו בנופש! 🎉</div>
        <div className="mt-1 text-ink-soft">תיהנו, רצינים</div>
      </div>
    );
  }
  const units = [
    { v: t.days, l: "ימים" },
    { v: t.hours, l: "שעות" },
    { v: t.minutes, l: "דק׳" },
    { v: t.seconds, l: "שנ׳" },
  ];
  return (
    <div className="text-center">
      <div className="font-display text-lg font-semibold text-aperol">עוד</div>
      <div className="font-display my-1 text-7xl font-extrabold leading-none text-melon tabular-nums">
        {t.days}
      </div>
      <div className="font-display text-2xl font-bold text-ink">ימים לרצינות!</div>
      <div className="mt-3 flex justify-center gap-2">
        {units.slice(1).map((u) => (
          <div key={u.l} className="rounded-2xl bg-cream px-3 py-1.5 text-center">
            <div className="font-display text-xl font-bold text-ink tabular-nums">
              {String(u.v).padStart(2, "0")}
            </div>
            <div className="text-[10px] font-medium text-ink-soft">{u.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeatherStrip() {
  const { data, error } = useWeather(TRIP.location.lat, TRIP.location.lon);
  // נציג את שלושת ימי הנופש אם הם בטווח התחזית, אחרת את 3 הימים הקרובים
  const tripDays = ["2026-06-18", "2026-06-19", "2026-06-20"];
  const fmt = new Intl.DateTimeFormat("he-IL", { weekday: "short" });
  if (error) return null;
  if (!data) {
    return (
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-16 flex-1 animate-pulse rounded-2xl bg-white/60" />
        ))}
      </div>
    );
  }
  let days = data.filter((d) => tripDays.includes(d.date));
  if (days.length === 0) days = data.slice(0, 3);
  return (
    <div className="flex gap-2">
      {days.slice(0, 3).map((d) => (
        <div key={d.date} className="flex flex-1 items-center justify-between rounded-2xl bg-white/90 px-3 py-2 shadow-sm">
          <span className="text-2xl">{weatherEmoji(d.code)}</span>
          <div className="text-right">
            <div className="text-xs font-semibold text-ink-soft">{fmt.format(new Date(d.date))}</div>
            <div className="font-display text-lg font-bold text-ink tabular-nums">{d.max}°</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Dashboard({
  person,
  doneMap,
  onToggle,
  goTab,
}: {
  person: string | null;
  doneMap: Record<string, boolean>;
  onToggle: (id: string, e: React.MouseEvent) => void;
  goTab: (t: TabId) => void;
}) {
  const isDone = (t: Task) => doneMap[t.id] ?? t.done ?? false;
  const total = TASKS.length;
  const completed = TASKS.filter(isDone).length;
  const pct = Math.round((completed / total) * 100);
  const quote = QUOTES[new Date().getDate() % QUOTES.length];

  // משימות פתוחות שרלוונטיות אליי (אם בחרתי מי אני)
  const myOpen = person
    ? TASKS.filter((t) => !isDone(t) && t.who.includes(person))
    : [];

  return (
    <div className="space-y-4">
      {/* כותרת */}
      <header className="px-1 pt-1 text-white drop-shadow">
        <h1 className="font-display text-3xl font-extrabold">{TRIP.title}</h1>
        <p className="font-medium opacity-95">
          {TRIP.subtitle} · {TRIP.datesLabel}
        </p>
      </header>

      {/* ספירה לאחור */}
      <Card className="animate-pop-in p-5">
        <Countdown />
      </Card>

      {/* מזג אוויר */}
      <WeatherStrip />

      {/* אזהרת מטבח */}
      <Card tint="bg-amber-50" className="flex gap-3 p-4">
        <span className="text-2xl">🍳</span>
        <p className="text-sm font-medium leading-relaxed text-amber-900">
          <span className="font-bold">שימו לב: </span>
          {KITCHEN_NOTE}
        </p>
      </Card>

      {/* התקדמות כללית */}
      <Card className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-display font-bold text-ink">איפה אנחנו עומדים?</span>
          <span className="font-display text-sm font-bold text-mint">
            {completed}/{total} ✓
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-cream">
          <div
            className="h-full rounded-full bg-gradient-to-l from-mint to-pool transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <button
          onClick={() => goTab("tasks")}
          className="mt-3 w-full rounded-2xl bg-pool py-2.5 font-display font-bold text-white active:scale-95"
        >
          לרשימת המשימות ✅
        </button>
      </Card>

      {/* תזכורות ליומן */}
      <Reminders />

      {/* רכילות הקבוצה — טיזר לעמוד הסטטיסטיקות */}
      <button onClick={() => goTab("stats")} className="block w-full text-right active:scale-[0.99]">
        <Card tint="bg-melon/10" className="p-4">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-display text-lg font-bold text-ink">רכילות הקבוצה 📊</span>
            <span className="text-xs font-bold text-pool">לכל הסטטיסטיקות ←</span>
          </div>
          <p className="text-sm font-medium leading-relaxed text-ink-soft">
            👑 מלכת הקבוצה: <span className="font-bold text-ink">{CHAT_STATS.ranking[0].name}</span> עם{" "}
            {CHAT_STATS.ranking[0].count} הודעות · 🌙 ההודעה הכי מאוחרת: 04:42 לפנות בוקר —
            <span className="font-bold text-ink"> "נגמר האפרול"</span> 🍹
          </p>
        </Card>
      </button>

      {/* קיר התמונות */}
      <PhotoWall />

      {/* המשימות שלי */}
      {person && (
        <div className="space-y-2">
          <h2 className="font-display px-1 text-lg font-bold text-white drop-shadow">
            {myOpen.length ? `מה עוד עליי, ${person}? 👀` : `אין עליך כלום, ${person}! 🎉`}
          </h2>
          {myOpen.map((t) => (
            <Card key={t.id} className="flex items-center gap-3 p-3.5">
              <button
                onClick={(e) => onToggle(t.id, e)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-[3px] border-aperol active:scale-90"
                aria-label="סמן כבוצע"
              />
              <span className="text-2xl">{t.emoji}</span>
              <span className="font-semibold text-ink">{t.title}</span>
            </Card>
          ))}
        </div>
      )}

      {/* ציטוט היום */}
      <p className="px-3 pb-2 text-center text-sm font-medium italic text-white/90 drop-shadow">
        “{quote}”
      </p>
    </div>
  );
}
