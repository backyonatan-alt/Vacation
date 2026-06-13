import type { TripEvent } from "../data/trip";

function toICSDate(iso: string): string {
  // המרה ל-UTC בפורמט YYYYMMDDTHHMMSSZ
  const d = new Date(iso);
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

function vevent(e: TripEvent): string {
  const start = new Date(e.startISO);
  const end = new Date(start.getTime() + e.durationMin * 60000);
  return [
    "BEGIN:VEVENT",
    `UID:${e.id}-beitalfa-2026@vacation-hq`,
    `DTSTAMP:${toICSDate(new Date().toISOString())}`,
    `DTSTART:${toICSDate(start.toISOString())}`,
    `DTEND:${toICSDate(end.toISOString())}`,
    `SUMMARY:${esc(e.title)}`,
    e.desc ? `DESCRIPTION:${esc(e.desc)}` : "",
    e.location ? `LOCATION:${esc(e.location)}` : "",
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${esc(e.title)}`,
    "END:VALARM",
    "END:VEVENT",
  ]
    .filter(Boolean)
    .join("\r\n");
}

export function buildICS(events: TripEvent[]): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Serious Vacation HQ//Beit Alfa 2026//HE",
    "CALSCALE:GREGORIAN",
    "X-WR-CALNAME:נופש רציני בבית אלפא",
    ...events.map(vevent),
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadICS(events: TripEvent[], filename = "beit-alfa.ics") {
  const blob = new Blob([buildICS(events)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
