# 🏖️ מטה הנופש הרציני — Serious Vacation HQ

אפליקציית-ווב (PWA) שמרכזת את **כל** מה שצריך לנופש בית אלפא (18–20.6) במקום אחד:
ספירה לאחור, מזג אוויר, רשימת משימות "מי מביא מה", הזמנת הבר, מדריך אטרקציות לאזור,
ולינקים לטבלת הקניות / Splitwise / ניווט — בעיצוב **Pool Party Pop**, עברית מימין-לשמאל,
ו-**mobile-first**. אפשר להתקין למסך הבית כמו אפליקציה אמיתית.

## הפעלה מקומית

```bash
npm install
npm run dev      # http://localhost:5173
```

## בנייה

```bash
npm run build    # יוצר dist/
npm run preview  # תצוגה מקדימה של ה-build
```

## פריסה (GitHub Pages)

יש workflow מוכן ב-`.github/workflows/deploy.yml` שבונה ומפרסם אוטומטית בכל push ל-branch.
ב-Settings → Pages, בחרו מקור **GitHub Actions**. כתובת האתר תהיה:
`https://<user>.github.io/Vacation/`.

> פורסים לדומיין אחר / Netlify? הריצו עם `DEPLOY_BASE=/ npm run build` כדי לבטל את ה-base.

## עריכת תוכן

כל התוכן (משימות, בר, אטרקציות, לינקים, חדרים, אנשים) נמצא בקובץ אחד:
**`src/data/trip.ts`** — עורכים שם, ה-build מתעדכן. אין צורך לגעת בקוד ה-UI.

## ארכיטקטורה

- **Vite + React + TypeScript + Tailwind v4** — קל ומהיר.
- **ללא שרת / ללא בסיס נתונים** — סטטי לחלוטין. סימוני המשימות נשמרים ב-`localStorage`
  אצל כל אחד במכשיר; טבלת הגוגל-שיטס נשארת ה"אמת" המשותפת.
- **PWA** (`vite-plugin-pwa`) — עובד אופליין וניתן להתקנה.
- **מזג אוויר** מ-Open-Meteo (ללא מפתח API).
- **קונפטי** 🎉 בכל סימון משימה (`canvas-confetti`).

נבנה באהבה לרצינים 👑
