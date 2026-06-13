import { LINKS, ROOMS, PEOPLE, TRIP, CARS, PHOTO_ALBUM_URL } from "../data/trip";
import { Card, Chip } from "../components/ui";

export function More({
  person,
  setPerson,
  twoPly,
  setTwoPly,
}: {
  person: string | null;
  setPerson: (p: string | null) => void;
  twoPly: boolean;
  setTwoPly: (v: boolean | ((p: boolean) => boolean)) => void;
}) {
  return (
    <div className="space-y-5">
      <header className="px-1 pt-1 text-white drop-shadow">
        <h1 className="font-display text-3xl font-extrabold">לינקים ועוד 🔗</h1>
      </header>

      {/* מי אני */}
      <Card className="p-4">
        <div className="mb-2 font-display font-bold text-ink">מי אני? 👤</div>
        <p className="mb-3 text-sm text-ink-soft">בחרו את עצמכם ודף הבית יראה לכם רק את המשימות שלכם.</p>
        <div className="flex flex-wrap gap-2">
          {PEOPLE.map((p) => (
            <button
              key={p}
              onClick={() => setPerson(person === p ? null : p)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition active:scale-95 ${
                person === p ? "bg-pool text-white" : "bg-cream text-ink-soft"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </Card>

      {/* לינקים */}
      <section className="space-y-2">
        {LINKS.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="block active:scale-[0.98]">
            <Card className="flex items-center gap-3 p-4">
              <span className="text-3xl">{l.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="font-display font-bold text-ink">{l.label}</div>
                <div className="truncate text-sm text-ink-soft">{l.sub}</div>
              </div>
              <span className="text-xl text-ink-soft">←</span>
            </Card>
          </a>
        ))}
      </section>

      {/* פרטי הנופש */}
      <section className="space-y-2">
        <h2 className="font-display px-1 text-xl font-bold text-white drop-shadow">פרטי הנופש 🏡</h2>
        <Card className="space-y-2 p-4 text-sm">
          {[TRIP.checkIn, TRIP.checkInLate, TRIP.checkOut, TRIP.rooms].map((line) => (
            <div key={line} className="flex gap-2 text-ink">
              <span className="text-pool">•</span>
              <span className="font-medium">{line}</span>
            </div>
          ))}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {TRIP.perks.map((p) => (
              <Chip key={p} className="bg-cream text-ink-soft">
                {p}
              </Chip>
            ))}
          </div>
        </Card>
      </section>

      {/* לוח החדרים */}
      <section className="space-y-2">
        <h2 className="font-display px-1 text-xl font-bold text-white drop-shadow">לוח החדרים 🛏️</h2>
        <div className="grid grid-cols-2 gap-2">
          <Card tint="bg-sky-50" className="p-3">
            <div className="mb-2 font-display font-bold text-sky-700">⬆️ קומה שנייה</div>
            {ROOMS.filter((r) => r.floor === "up").map((r) => (
              <div key={r.who} className="py-0.5 text-sm font-medium text-ink">
                {r.who} {r.kids ? "👶" : ""}
              </div>
            ))}
          </Card>
          <Card tint="bg-orange-50" className="p-3">
            <div className="mb-2 font-display font-bold text-orange-700">⬇️ קומת קרקע</div>
            {ROOMS.filter((r) => r.floor === "down").map((r) => (
              <div key={r.who} className="py-0.5 text-sm font-medium text-ink">
                {r.who} {r.kids ? "👶" : ""}
              </div>
            ))}
          </Card>
        </div>
        <p className="px-1 text-xs text-white/80 drop-shadow">* החלוקה אקראית וניתנת לשינוי — תיאמו בקבוצה.</p>
      </section>

      {/* טרמפים ושיירה */}
      <section className="space-y-2">
        <h2 className="font-display px-1 text-xl font-bold text-white drop-shadow">טרמפים ושיירה 🚗</h2>
        {CARS.map((c, i) => (
          <Card key={i} className="flex items-center gap-3 p-4">
            <span className="text-3xl">🚙</span>
            <div className="min-w-0 flex-1">
              <div className="font-display font-bold text-ink">{c.driver}</div>
              <div className="text-sm text-ink-soft">
                מ{c.from} · יוצאים {c.departure}
              </div>
            </div>
            <Chip className={c.seatsFree > 0 ? "bg-mint/15 text-mint" : "bg-cream text-ink-soft"}>
              {c.seatsFree > 0 ? `${c.seatsFree} מקומות פנויים` : "מלא"}
            </Chip>
          </Card>
        ))}
        <a
          href="https://wa.me/?text=%D7%9E%D7%99%20%D7%A6%D7%A8%D7%99%D7%9A%2F%D7%9E%D7%A6%D7%99%D7%A2%20%D7%98%D7%A8%D7%9E%D7%A4%20%D7%9C%D7%91%D7%99%D7%AA%20%D7%90%D7%9C%D7%A4%D7%90%3F%20%F0%9F%9A%97"
          target="_blank"
          rel="noreferrer"
          className="block rounded-2xl bg-white py-2.5 text-center font-display font-bold text-pool active:scale-[0.98]"
        >
          תאמו טרמפ בקבוצה 📲
        </a>
      </section>

      {/* קיר התמונות */}
      <section className="space-y-2">
        <h2 className="font-display px-1 text-xl font-bold text-white drop-shadow">קיר התמונות 📸</h2>
        <Card className="p-4">
          {PHOTO_ALBUM_URL ? (
            <a
              href={PHOTO_ALBUM_URL}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl bg-pool py-3 text-center font-display font-bold text-white active:scale-[0.98]"
            >
              לאלבום המשותף 🖼️
            </a>
          ) : (
            <div className="text-center">
              <div className="mb-2 flex justify-center gap-1 text-3xl">
                <span>🏖️</span>
                <span>🍹</span>
                <span>👶</span>
                <span>🌅</span>
                <span>👑</span>
              </div>
              <p className="text-sm font-medium text-ink-soft">
                פתחו אלבום Google Photos משותף והדביקו את הלינק ב-<code className="rounded bg-cream px-1">PHOTO_ALBUM_URL</code> —
                וכאן יופיע כפתור לכל התמונות מהנופש.
              </p>
            </div>
          )}
        </Card>
      </section>

      {/* ביצה מוסתרת: נייר טואלט */}
      <Card className="flex items-center justify-between p-4">
        <div>
          <div className="font-display font-bold text-ink">🧻 מצב נייר טואלט</div>
          <div className="text-sm text-ink-soft">
            {twoPly ? "שתי שכבות — יונתן מאושר" : "שלוש שכבות — \"לא מרגישים כלום\""}
          </div>
        </div>
        <button
          onClick={() => setTwoPly((v) => !v)}
          className={`relative h-8 w-14 rounded-full transition ${twoPly ? "bg-mint" : "bg-ink-soft/40"}`}
          aria-label="החלף מצב נייר טואלט"
        >
          <span
            className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${
              twoPly ? "right-1" : "right-7"
            }`}
          />
        </button>
      </Card>

      <p className="pb-2 text-center text-xs font-medium text-white/80 drop-shadow">
        נבנה באהבה לרצינים · בית אלפא 2026 🏖️
      </p>
    </div>
  );
}
