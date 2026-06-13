// שיתוף טבלת הניצחונות דרך קישור — בלי שרת.
// מקודדים את המצב ל-hash בכתובת; מי שפותח את הלינק רואה את אותה טבלה.

export type ScoreState = {
  points: Record<string, number>;
  log: { team: string; game: string; t: number }[];
};

export function encodeScores(state: ScoreState): string {
  try {
    const json = JSON.stringify(state);
    return btoa(unescape(encodeURIComponent(json)));
  } catch {
    return "";
  }
}

export function decodeScores(raw: string): ScoreState | null {
  try {
    const json = decodeURIComponent(escape(atob(raw)));
    const obj = JSON.parse(json);
    if (obj && typeof obj === "object" && obj.points) return obj as ScoreState;
    return null;
  } catch {
    return null;
  }
}

// קוראים מצב משותף מה-URL (אם קיים) ומנקים את ה-hash
export function readSharedScores(): ScoreState | null {
  const m = window.location.hash.match(/scores=([^&]+)/);
  if (!m) return null;
  const state = decodeScores(m[1]);
  history.replaceState(null, "", window.location.pathname + window.location.search);
  return state;
}

export function buildShareURL(state: ScoreState): string {
  const base = window.location.origin + window.location.pathname;
  return `${base}#scores=${encodeScores(state)}`;
}

export function shareToWhatsApp(text: string, url: string) {
  const msg = encodeURIComponent(`${text}\n${url}`);
  window.open(`https://wa.me/?text=${msg}`, "_blank");
}
