import { useEffect, useState } from "react";
import { TEAMS, GAMES } from "../data/trip";
import { Card, Chip } from "../components/ui";
import { useLocalState } from "../lib/hooks";
import { celebrate, bigCelebrate } from "../lib/fx";
import { readSharedScores, buildShareURL, shareToWhatsApp, type ScoreState } from "../lib/share";

const MEDALS = ["🥇", "🥈", "🥉"];

export function Games() {
  const [state, setState] = useLocalState<ScoreState>("vhq:scores", { points: {}, log: [] });
  const [activeGame, setActiveGame] = useState(GAMES[0].id);
  const [toast, setToast] = useState<string | null>(null);

  // טעינת טבלה משותפת מה-URL (אם נכנסו דרך לינק שיתוף)
  useEffect(() => {
    const shared = readSharedScores();
    if (shared) {
      setState(shared);
      setToast("נטענה טבלה משותפת 📥");
      setTimeout(() => setToast(null), 2500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const teamName = (id: string) => TEAMS.find((t) => t.id === id)?.name ?? id;
  const gameById = (id: string) => GAMES.find((g) => g.id === id);

  const ranked = [...TEAMS]
    .map((t) => ({ ...t, pts: state.points[t.id] ?? 0 }))
    .sort((a, b) => b.pts - a.pts);
  const maxPts = Math.max(1, ...ranked.map((r) => r.pts));
  const leaderHasPoints = ranked[0]?.pts > 0;

  function award(teamId: string, e: React.MouseEvent) {
    setState((prev) => {
      const points = { ...prev.points, [teamId]: (prev.points[teamId] ?? 0) + 1 };
      const log = [{ team: teamId, game: activeGame, t: Date.now() }, ...prev.log].slice(0, 50);
      return { points, log };
    });
    celebrate(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
  }

  function adjust(teamId: string, delta: number) {
    setState((prev) => {
      const cur = prev.points[teamId] ?? 0;
      return { ...prev, points: { ...prev.points, [teamId]: Math.max(0, cur + delta) } };
    });
  }

  function share() {
    const lines = ranked
      .filter((r) => r.pts > 0)
      .map((r, i) => `${MEDALS[i] ?? "▫️"} ${r.name} — ${r.pts}`)
      .join("\n");
    const text = `🏆 טבלת הנופש הרציני:\n${lines || "עוד לא שיחקנו 🙂"}`;
    const url = buildShareURL(state);
    shareToWhatsApp(text, url);
  }

  function reset() {
    if (confirm("לאפס את כל הטבלה?")) setState({ points: {}, log: [] });
  }

  return (
    <div className="space-y-5">
      <header className="px-1 pt-1 text-white drop-shadow">
        <h1 className="font-display text-3xl font-extrabold">טורניר הנופש 🏆</h1>
        <p className="font-medium opacity-95">מי הזוג האלוף? בחרו משחק וסמנו מי ניצח</p>
      </header>

      {toast && (
        <div className="animate-pop-in rounded-2xl bg-mint px-4 py-2 text-center font-bold text-white">
          {toast}
        </div>
      )}

      {/* בחירת משחק */}
      <Card className="p-4">
        <div className="mb-2 font-display font-bold text-ink">איזה משחק שיחקנו עכשיו?</div>
        <div className="flex flex-wrap gap-2">
          {GAMES.map((g) => (
            <button
              key={g.id}
              onClick={() => setActiveGame(g.id)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition active:scale-95 ${
                activeGame === g.id ? "bg-grape text-white" : "bg-cream text-ink-soft"
              }`}
            >
              {g.emoji} {g.name}
            </button>
          ))}
        </div>
      </Card>

      {/* טבלת המובילים */}
      <section className="space-y-2">
        <h2 className="font-display px-1 text-xl font-bold text-white drop-shadow">הטבלה 📊</h2>
        {ranked.map((r, i) => {
          const isChamp = i === 0 && leaderHasPoints;
          return (
            <Card
              key={r.id}
              tint={isChamp ? "bg-gradient-to-l from-sun/40 to-white" : "bg-white"}
              className="flex items-center gap-3 p-3"
            >
              <div className="w-8 text-center text-2xl">
                {r.pts > 0 && i < 3 ? MEDALS[i] : <span className="text-ink-soft">{i + 1}</span>}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 font-display font-bold text-ink">
                  {r.name}
                  {isChamp && <span className="animate-floaty">👑</span>}
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-cream">
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-aperol to-melon transition-all duration-500"
                    style={{ width: `${(r.pts / maxPts) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => adjust(r.id, -1)}
                  className="grid h-7 w-7 place-items-center rounded-full bg-cream text-ink-soft active:scale-90"
                  aria-label="הורד נקודה"
                >
                  −
                </button>
                <span className="w-7 text-center font-display text-xl font-extrabold text-melon tabular-nums">
                  {r.pts}
                </span>
                <button
                  onClick={(e) => award(r.id, e)}
                  className="rounded-full bg-mint px-3 py-1.5 text-sm font-bold text-white active:scale-90"
                >
                  ניצחו 🎉
                </button>
              </div>
            </Card>
          );
        })}
        <p className="px-1 text-xs text-white/80 drop-shadow">* שמות הזוגות ניתנים לעריכה בקובץ הנתונים.</p>
      </section>

      {/* פעולות */}
      <div className="flex gap-2">
        <button
          onClick={share}
          className="flex-1 rounded-2xl bg-pool py-3 font-display font-bold text-white active:scale-95"
        >
          שתפו טבלה בוואטסאפ 📲
        </button>
        <button
          onClick={reset}
          className="rounded-2xl bg-white px-4 py-3 font-display font-bold text-ink-soft active:scale-95"
        >
          איפוס
        </button>
      </div>

      {/* יומן ניצחונות */}
      {state.log.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-display px-1 text-xl font-bold text-white drop-shadow">יומן ניצחונות 📜</h2>
          <Card className="divide-y divide-cream p-1">
            {state.log.slice(0, 10).map((entry, idx) => {
              const g = gameById(entry.game);
              return (
                <div key={idx} className="flex items-center gap-2 p-2.5 text-sm">
                  <span className="text-lg">{g?.emoji ?? "🎲"}</span>
                  <span className="font-semibold text-ink">{teamName(entry.team)}</span>
                  <span className="text-ink-soft">ניצחו ב{g?.name ?? "משחק"}</span>
                  <Chip className="mr-auto bg-cream text-ink-soft">
                    {new Date(entry.t).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}
                  </Chip>
                </div>
              );
            })}
          </Card>
        </section>
      )}

      {/* כתר אלוף */}
      {leaderHasPoints && (
        <Card tint="bg-gradient-to-l from-sun/50 to-aperol/30" className="p-4 text-center">
          <div className="text-3xl">👑</div>
          <div className="font-display text-lg font-extrabold text-ink">
            אלופי הנופש כרגע: {ranked[0].name}
          </div>
          <button onClick={bigCelebrate} className="mt-1 text-sm font-bold text-aperol">
            לחצו לחגיגה 🎊
          </button>
        </Card>
      )}
    </div>
  );
}
