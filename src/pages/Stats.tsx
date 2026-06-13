import { CHAT_STATS } from "../data/trip";
import { Card } from "../components/ui";

export function Stats() {
  const { totalMessages, ranking, awards, funFacts, isDemo } = CHAT_STATS;
  const max = Math.max(...ranking.map((r) => r.count), 1);
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="space-y-4">
      <header className="px-1 pt-1 text-white drop-shadow">
        <h1 className="font-display text-3xl font-extrabold">סטטיסטיקות הצ׳אט 📊</h1>
        <p className="font-medium opacity-95">מי שולט/ת בקבוצה? 👀</p>
      </header>

      {isDemo ? (
        <Card tint="bg-amber-50" className="flex gap-3 p-4">
          <span className="text-2xl">⚠️</span>
          <p className="text-sm font-medium leading-relaxed text-amber-900">
            <span className="font-bold">נתוני דמו: </span>
            המספרים כאן הם לדוגמה. שלחו ייצוא צ׳אט וואטסאפ (קבוצה ← ייצוא צ׳אט ← ללא מדיה) ונחליף בנתונים אמיתיים.
          </p>
        </Card>
      ) : null}

      {/* סה"כ הודעות */}
      <Card className="p-5 text-center">
        <div className="font-display text-lg font-semibold text-aperol">סה״כ הודעות בקבוצה</div>
        <div className="font-display my-1 text-6xl font-extrabold leading-none text-melon tabular-nums">
          {totalMessages.toLocaleString("he-IL")}
        </div>
        <div className="text-sm font-medium text-ink-soft">ועוד יבואו 💬</div>
      </Card>

      {/* מי כותב הכי הרבה */}
      <section className="space-y-2">
        <h2 className="font-display px-1 text-xl font-bold text-white drop-shadow">מי כותב/ת הכי הרבה? 👑</h2>
        <Card className="space-y-2.5 p-4">
          {ranking.map((r, i) => (
            <div key={r.name} className="flex items-center gap-2">
              <span className="w-6 shrink-0 text-center text-lg">{medals[i] ?? "•"}</span>
              <span className="w-14 shrink-0 text-sm font-bold text-ink">{r.name}</span>
              <div className="h-5 flex-1 overflow-hidden rounded-full bg-cream">
                <div
                  className="flex h-full items-center justify-end rounded-full bg-gradient-to-l from-mint to-pool pl-2 transition-all duration-500"
                  style={{ width: `${Math.max((r.count / max) * 100, 12)}%` }}
                >
                  <span className="text-[10px] font-bold text-white tabular-nums">
                    {r.count.toLocaleString("he-IL")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Card>
      </section>

      {/* פרסים מצחיקים */}
      <section className="space-y-2">
        <h2 className="font-display px-1 text-xl font-bold text-white drop-shadow">פרסי הקבוצה 🏆</h2>
        <div className="grid grid-cols-2 gap-2">
          {awards.map((a) => (
            <Card key={a.title} className="p-3">
              <div className="text-2xl">{a.emoji}</div>
              <div className="font-display text-sm font-bold text-ink">{a.title}</div>
              <div className="font-display text-base font-extrabold text-pool">{a.who}</div>
              <div className="mt-0.5 text-xs font-medium leading-snug text-ink-soft">{a.note}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* עובדות משעשעות */}
      <section className="space-y-2">
        <h2 className="font-display px-1 text-xl font-bold text-white drop-shadow">עובדות משעשעות 🤓</h2>
        <Card className="space-y-2 p-4">
          {funFacts.map((f, i) => (
            <div key={i} className="flex gap-2 text-sm font-medium text-ink">
              <span className="shrink-0">•</span>
              <span>{f}</span>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}
