import { useEffect, useState, useCallback } from "react";

// ---- ספירה לאחור --------------------------------------------------------
export type TimeLeft = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

export function useCountdown(targetISO: string): TimeLeft {
  const calc = useCallback((): TimeLeft => {
    const diff = new Date(targetISO).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { days, hours, minutes, seconds, done: false };
  }, [targetISO]);

  const [t, setT] = useState<TimeLeft>(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);
  return t;
}

// ---- localStorage state גנרי -------------------------------------------
export function useLocalState<T>(key: string, initial: T): [T, (v: T | ((p: T) => T)) => void] {
  const [val, setVal] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  const set = useCallback(
    (v: T | ((p: T) => T)) => {
      setVal((prev) => {
        const next = typeof v === "function" ? (v as (p: T) => T)(prev) : v;
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {
          /* ignore quota / private mode */
        }
        return next;
      });
    },
    [key],
  );
  return [val, set];
}

// ---- מזג אוויר (Open-Meteo, ללא מפתח) -----------------------------------
export type Weather = { date: string; max: number; min: number; code: number }[];

export function useWeather(lat: number, lon: number): { data: Weather | null; error: boolean } {
  const [data, setData] = useState<Weather | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FJerusalem&forecast_days=16`;
    fetch(url)
      .then((r) => r.json())
      .then((j) => {
        const d = j.daily;
        if (!d) throw new Error("no daily");
        const out: Weather = d.time.map((date: string, i: number) => ({
          date,
          max: Math.round(d.temperature_2m_max[i]),
          min: Math.round(d.temperature_2m_min[i]),
          code: d.weather_code[i],
        }));
        setData(out);
      })
      .catch(() => setError(true));
  }, [lat, lon]);
  return { data, error };
}

// מיפוי קוד מזג אוויר לאימוג'י
export function weatherEmoji(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "🌨️";
  if (code <= 82) return "🌦️";
  if (code <= 99) return "⛈️";
  return "🌡️";
}
