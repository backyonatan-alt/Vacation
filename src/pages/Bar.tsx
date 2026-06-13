import { BAR, BAR_TOTAL, BAR_NOTE, BAR_DIFF, COCKTAILS } from "../data/trip";
import { Card, Chip } from "../components/ui";

export function Bar() {
  const totalBottles = BAR.reduce((s, g) => s + g.items.reduce((a, i) => a + i.qty, 0), 0);

  return (
    <div className="space-y-5">
      <header className="px-1 pt-1 text-white drop-shadow">
        <h1 className="font-display text-3xl font-extrabold">הבר של הנופש 🍹</h1>
        <p className="font-medium opacity-95">הזמנה סופית · אושרה ונמסרה</p>
      </header>

      {/* סיכום */}
      <Card className="p-5 text-center">
        <div className="font-display text-sm font-semibold text-aperol">סה״כ הזמנת האלכוהול</div>
        <div className="font-display my-1 text-5xl font-extrabold text-melon">{BAR_TOTAL}</div>
        <div className="flex justify-center gap-2 text-sm">
          <Chip className="bg-cream text-ink">🍾 {totalBottles} בקבוקים</Chip>
          <Chip className="bg-emerald-100 text-emerald-700">✓ נמסר</Chip>
        </div>
        <p className="mt-3 rounded-2xl bg-cream p-3 text-sm font-medium leading-relaxed text-ink-soft">
          {BAR_NOTE}
        </p>
      </Card>

      {/* תפריט הקוקטיילים */}
      <section className="space-y-2">
        <h2 className="font-display px-1 text-xl font-bold text-white drop-shadow">מה נמזוג? 🧉</h2>
        <Card className="flex flex-wrap gap-2 p-4">
          {COCKTAILS.map((c) => (
            <Chip key={c.name} className="bg-aperol/10 text-aperol">
              <span>{c.emoji}</span>
              <span className="font-bold">{c.name}</span>
            </Chip>
          ))}
        </Card>
      </section>

      {/* רשימת ההזמנה */}
      {BAR.map((g) => (
        <section key={g.label} className="space-y-2">
          <h2 className="font-display flex items-center gap-2 px-1 text-xl font-bold text-white drop-shadow">
            <span>{g.emoji}</span>
            {g.label}
          </h2>
          <Card className="divide-y divide-cream p-1">
            {g.items.map((it) => (
              <div key={it.name} className="flex items-center gap-3 p-3">
                <span className="text-2xl">{it.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-ink">{it.name}</div>
                  {it.note && <div className="text-xs font-medium text-aperol">↳ {it.note}</div>}
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-pool">×{it.qty}</div>
                  <div className="text-xs font-medium text-ink-soft">{it.price}</div>
                </div>
              </div>
            ))}
          </Card>
        </section>
      ))}

      {/* דיף בין הגרסאות */}
      <Card tint="bg-violet-50" className="flex gap-3 p-4">
        <span className="text-2xl">📝</span>
        <p className="text-sm font-medium leading-relaxed text-violet-900">{BAR_DIFF}</p>
      </Card>

      {/* בדיחה */}
      <p className="px-3 pb-2 text-center text-sm font-medium italic text-white/90 drop-shadow">
        “מנסיוני, 2 אפרולים עפים תוך 4 שעות” — תום 🍊
      </p>
    </div>
  );
}
