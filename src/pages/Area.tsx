import { ACTIVITIES, TRIP } from "../data/trip";
import { Card, Chip } from "../components/ui";

export function Area() {
  return (
    <div className="space-y-4">
      <header className="px-1 pt-1 text-white drop-shadow">
        <h1 className="font-display text-3xl font-extrabold">מה עושים באזור? 🗺️</h1>
        <p className="font-medium opacity-95">{TRIP.location.area} · הכל במרחק נסיעה קצר</p>
      </header>

      {ACTIVITIES.map((a) => (
        <Card key={a.name} className="overflow-hidden">
          <div className="flex items-start gap-3 p-4">
            <span className="text-4xl">{a.emoji}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-ink">{a.name}</h3>
                <Chip className="shrink-0 bg-pool/10 text-pool">🚗 {a.drive}</Chip>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{a.desc}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {a.tags.map((t) => (
                  <Chip key={t} className="bg-cream text-ink-soft">
                    {t}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
          <a
            href={a.waze}
            target="_blank"
            rel="noreferrer"
            className="block bg-pool/10 py-2.5 text-center font-display font-bold text-pool active:bg-pool/20"
          >
            ניווט ב-Waze 🧭
          </a>
        </Card>
      ))}

      <Card tint="bg-cyan-50" className="flex gap-3 p-4">
        <span className="text-2xl">💡</span>
        <p className="text-sm font-medium leading-relaxed text-cyan-900">
          טיפ: גן השלושה והבריכה מתמלאים מהר בקיץ — שווה להקדים בבוקר. בית הכנסת העתיק של בית אלפא
          ממש ליד, מושלם לסיבוב קצר עם הילדים.
        </p>
      </Card>
    </div>
  );
}
