import { useState } from "react";
import { PHOTOS, PHOTO_ALBUM_URL } from "../data/trip";
import { Card } from "./ui";

export function PhotoWall() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  if (PHOTOS.length === 0) return null;
  return (
    <section className="space-y-2">
      <h2 className="font-display px-1 text-xl font-bold text-white drop-shadow">קיר התמונות 📸</h2>
      <Card className="p-4">
        <div className="grid grid-cols-2 gap-2">
          {PHOTOS.map((photo, i) => (
            <button
              key={photo.src}
              onClick={() => setLightbox(i)}
              className="group relative aspect-square overflow-hidden rounded-2xl active:scale-[0.98]"
              aria-label={`הגדל תמונה: ${photo.caption}`}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="h-full w-full object-cover transition group-active:brightness-90"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-1.5 text-right text-xs font-bold text-white">
                {photo.caption}
              </span>
            </button>
          ))}
        </div>
        {PHOTO_ALBUM_URL ? (
          <a
            href={PHOTO_ALBUM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block rounded-2xl bg-pool py-3 text-center font-display font-bold text-white active:scale-[0.98]"
          >
            לאלבום המלא 🖼️
          </a>
        ) : null}
      </Card>

      {/* תצוגת תמונה מוגדלת */}
      {lightbox !== null ? (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
        >
          <img
            src={PHOTOS[lightbox].src}
            alt={PHOTOS[lightbox].caption}
            className="max-h-[80vh] max-w-full rounded-2xl object-contain"
          />
          <p className="mt-3 font-display text-lg font-bold text-white drop-shadow">
            {PHOTOS[lightbox].caption}
          </p>
          <button
            onClick={() => setLightbox(null)}
            className="mt-4 rounded-full bg-white/90 px-6 py-2 font-display font-bold text-ink active:scale-[0.97]"
          >
            סגירה ✕
          </button>
        </div>
      ) : null}
    </section>
  );
}
