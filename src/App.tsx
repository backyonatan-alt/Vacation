import { useState } from "react";
import { BottomNav, type TabId } from "./components/BottomNav";
import { Dashboard } from "./pages/Dashboard";
import { Tasks } from "./pages/Tasks";
import { Games } from "./pages/Games";
import { Bar } from "./pages/Bar";
import { Area } from "./pages/Area";
import { More } from "./pages/More";
import { useLocalState } from "./lib/hooks";
import { celebrate, bigCelebrate } from "./lib/fx";
import { TASKS } from "./data/trip";

export default function App() {
  const [tab, setTab] = useState<TabId>("home");
  const [person, setPerson] = useLocalState<string | null>("vhq:person", null);
  const [doneMap, setDoneMap] = useLocalState<Record<string, boolean>>("vhq:done", {});
  const [twoPly, setTwoPly] = useLocalState<boolean>("vhq:2ply", true);

  const isDone = (id: string) => {
    const def = TASKS.find((t) => t.id === id)?.done ?? false;
    return doneMap[id] ?? def;
  };

  const toggle = (id: string, e: React.MouseEvent) => {
    const next = !isDone(id);
    setDoneMap((prev) => ({ ...prev, [id]: next }));
    if (next) {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      celebrate(x, y);
      // אם אחרי הסימון הזה הכל בוצע — חגיגה גדולה
      const allDone = TASKS.every((t) => (t.id === id ? true : (doneMap[t.id] ?? t.done ?? false)));
      if (allDone) setTimeout(bigCelebrate, 200);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
      {/* תוכן גלילה */}
      <main className="flex-1 px-4 pb-32 pt-[max(12px,env(safe-area-inset-top))]">
        {tab === "home" && (
          <Dashboard person={person} doneMap={doneMap} onToggle={toggle} goTab={setTab} />
        )}
        {tab === "tasks" && <Tasks doneMap={doneMap} onToggle={toggle} />}
        {tab === "games" && <Games />}
        {tab === "bar" && <Bar />}
        {tab === "area" && <Area />}
        {tab === "more" && (
          <More person={person} setPerson={setPerson} twoPly={twoPly} setTwoPly={setTwoPly} />
        )}
      </main>

      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
