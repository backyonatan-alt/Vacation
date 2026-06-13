// ============================================================================
//  כל התוכן של הנופש במקום אחד. רוצים לעדכן? פשוט ערכו את הקובץ הזה.
//  All trip content lives here — edit this file to update the site.
// ============================================================================

export const TRIP = {
  title: "מטה הנופש הרציני",
  subtitle: "בית אלפא · אירוח כפרי",
  // יעד הספירה לאחור — צ'ק-אין יום חמישי 18.6.2026 בשעה 15:00
  startISO: "2026-06-18T15:00:00+03:00",
  endISO: "2026-06-20T15:00:00+03:00",
  datesLabel: "18–20.6",
  location: {
    name: "בית אלפא – אירוח כפרי",
    area: "עמק המעיינות",
    lat: 32.5167,
    lon: 35.4333,
    site: "https://beitalfa.co.il",
  },
  checkIn: "צ׳ק-אין: יום חמישי 15:00–17:00 במשרדי הקבלה",
  checkInLate: "אחרי 17:00 — מול התורן בטלפון 052-594-2071",
  checkOut: "צ׳ק-אאוט: עד 11:00 בחול / עד 15:00 בשבת",
  rooms: "7 חדרי ברוש (סטנדרטיים) — 3 קרקע + 4 קומה שנייה",
  perks: ["🏊 בריכה ומשחקייה בקיבוץ", "🍳 ארוחת בוקר כלולה", "🔥 עמדות על האש מחוץ לחדרים"],
};

// ---- אזהרת המטבח (אין מטבח משותף!) ---------------------------------------
export const KITCHEN_NOTE =
  "אין מטבח משותף! בכל חדר יש מקרר קטן, מיקרוגל, קומקום, כיור וסט כלים. " +
  "אפשר להשתמש בעמדות גריל מחוץ לחדרים. כדאי להביא קערות גדולות ואולי שולחן מתקפל.";

// ---- אנשים (לבחירת \"מי אני\" בדף הבית) -------------------------------------
export const PEOPLE = [
  "נופר", "תום", "סתיו", "בר", "שיר", "אביב", "נדב", "אוהד",
  "ענבר", "יונתן", "שובל", "דן", "אלון",
];

// ---- חדרים (קומה עליונה / תחתונה) ----------------------------------------
export type Room = { who: string; floor: "up" | "down"; kids?: boolean };
export const ROOMS: Room[] = [
  { who: "סתיו ותום", floor: "up" },
  { who: "מאליק ונופר", floor: "up" },
  { who: "ענבר ויונתן", floor: "up" },
  { who: "בר ובן זקן", floor: "up" },
  { who: "אביב, נדב + נאיה", floor: "down", kids: true },
  { who: "שיש + ילדים", floor: "down", kids: true },
  { who: "אוהד ושיר", floor: "down", kids: true },
];

// ---- משימות / מי מביא מה --------------------------------------------------
export type Task = {
  id: string;
  emoji: string;
  title: string;
  who: string;
  cat: "food" | "gear" | "drinks" | "games" | "admin";
  done?: boolean; // ברירת מחדל; הסימון נשמר אצל כל אחד במכשיר
};

export const TASK_CATEGORIES: Record<Task["cat"], { label: string; emoji: string; tint: string }> = {
  food: { label: "אוכל", emoji: "🍽️", tint: "bg-orange-50" },
  gear: { label: "ציוד וכלים", emoji: "🧺", tint: "bg-cyan-50" },
  drinks: { label: "שתייה ובר", emoji: "🍹", tint: "bg-rose-50" },
  games: { label: "משחקים וכיף", emoji: "🎲", tint: "bg-violet-50" },
  admin: { label: "אדמיניסטרציה", emoji: "🧾", tint: "bg-emerald-50" },
};

export const TASKS: Task[] = [
  // אוכל
  { id: "thu-dinner", emoji: "🥗", title: "ארוחת ערב חמישי — כל אחד מביא מנה אחת", who: "כולם (לפי הטבלה)", cat: "food" },
  { id: "fri-bbq-meat", emoji: "🥩", title: "בשרים לעל האש — קנייה מיפו", who: "דן", cat: "food" },
  { id: "fri-fish", emoji: "🐟", title: "דגים: 2 דניס, 2 לברק, פילה סלמון", who: "דן (הוזמן)", cat: "food", done: true },
  { id: "bakery", emoji: "🥐", title: "מאפייה + גבינות טבעוניות", who: "נופר", cat: "food" },
  { id: "soft-drinks", emoji: "🥤", title: "שתייה קלה + גבינת שמנת", who: "שיש", cat: "food" },
  { id: "kids-food", emoji: "🧁", title: "חטיף לילדים (קאפקייקס/פנקייקים)", who: "אביב / שיש", cat: "food" },

  // ציוד וכלים
  { id: "bowls", emoji: "🥣", title: "2–3 קערות גדולות לסלטים/על האש", who: "מי מתנדב?", cat: "gear" },
  { id: "table", emoji: "🪑", title: "שולחן מתקפל (בבדיקה מול בית אלפא)", who: "מי מתנדב?", cat: "gear" },
  { id: "ninja", emoji: "🧊", title: "נינג'ה למרגריטות קפואות", who: "תום", cat: "gear", done: true },

  // שתייה ובר
  { id: "alcohol", emoji: "🍾", title: "הזמנת האלכוהול — יצאה ונמסרה!", who: "תום", cat: "drinks", done: true },
  { id: "mixers", emoji: "🛒", title: "מיקסרים מהסופר: קרח, סודה, טוניק, אשכוליות, לימונים, סירופ אגבה", who: "להשלים", cat: "drinks" },

  // משחקים
  { id: "alias", emoji: "🗣️", title: "אליאס", who: "בר", cat: "games", done: true },
  { id: "hitster", emoji: "🎵", title: "היטסטר", who: "יונתן", cat: "games", done: true },
  { id: "codenames", emoji: "🕵️", title: "שם קוד", who: "נופר", cat: "games", done: true },
  { id: "kids-games", emoji: "🖍️", title: "קשקושים/משחקים לילדים", who: "אביב", cat: "games", done: true },

  // אדמיניסטרציה
  { id: "credit", emoji: "💳", title: "כל זוג מעביר פרטי אשראי לבית אלפא", who: "כל זוג", cat: "admin", done: true },
  { id: "splitwise", emoji: "💸", title: "להצטרף ל-Splitwise (אחד מכל זוג מספיק)", who: "כל זוג", cat: "admin" },
];

// ---- הזמנת האלכוהול (גרסה סופית v2, סה\"כ ₪1,421.20) -----------------------
export type Drink = { name: string; qty: number; price: string; emoji: string; note?: string };
export type DrinkGroup = { label: string; emoji: string; items: Drink[] };

export const BAR: DrinkGroup[] = [
  {
    label: "אלכוהול חריף",
    emoji: "🥃",
    items: [
      { name: "ג'ין בומביי ספייר 1 ליטר 40%", qty: 2, price: "₪238", emoji: "🍸" },
      { name: "ערק עלית 40% 700 מ\"ל", qty: 1, price: "₪64.90", emoji: "🥂" },
      { name: "פטרון סילבר טקילה 1 ליטר", qty: 1, price: "₪199", emoji: "🌵" },
      { name: "מזקל ורדה", qty: 1, price: "₪149", emoji: "🔥" },
    ],
  },
  {
    label: "אפרול ומבעבע",
    emoji: "🍊",
    items: [
      { name: "אפרול 1 ליטר", qty: 3, price: "₪194.70", emoji: "🧡", note: "ירד מ-4 ל-3 לפי הפידבק" },
      { name: "פרוסקו אקסטרא דריי 750", qty: 2, price: "₪236", emoji: "🥂", note: "כמות קוצצה" },
    ],
  },
  {
    label: "בירות",
    emoji: "🍺",
    items: [
      { name: "קורונה 355 מ\"ל", qty: 6, price: "₪31.86", emoji: "🍺" },
      { name: "סטלה ארטואה", qty: 6, price: "₪29.88", emoji: "🍺" },
      { name: "פאולנר בירת חיטה 330", qty: 4, price: "₪44", emoji: "🍺" },
      { name: "לף בראון 330", qty: 6, price: "₪45", emoji: "🍺" },
    ],
  },
  {
    label: "יין",
    emoji: "🍷",
    items: [
      { name: "עולם לבן — שרדונה", qty: 3, price: "₪135", emoji: "🥂" },
      { name: "עולם ורוד — רוזה", qty: 1, price: "₪45", emoji: "🌸" },
      { name: "עולם אדום — קברנה סוביניון", qty: 1, price: "₪45", emoji: "🍷" },
    ],
  },
];

export const BAR_TOTAL = "₪1,421.20";
export const BAR_NOTE =
  "המחיר עוד לא כולל קרח ומיקסרים (סודה, טוניק, אשכוליות, לימונים, אגבה) — צפי תוספת ~₪250, " +
  "כך שהמחיר לבן אדם צפוי להיות בסביבות ₪200.";
export const BAR_DIFF = "שינויים מהגרסה הראשונה: אפרול 4→3, פרוסקו קוצץ בחצי. סה\"כ ירד מ-₪1,586 ל-₪1,421.";

// תפריט הקוקטיילים שיהיו (לפי הסקרים)
export const COCKTAILS = [
  { name: "אפרול שפריץ", emoji: "🍹" },
  { name: "מרגריטות (קפואות בנינג'ה)", emoji: "🧊" },
  { name: "מזקליטות", emoji: "🔥" },
  { name: "ג'ין טוניק", emoji: "🍸" },
  { name: "ערק אשכוליות/לימונים", emoji: "🍋" },
  { name: "דאקירי", emoji: "🍓" },
];

// ---- אטרקציות באזור (עמק המעיינות) ----------------------------------------
export type Activity = {
  name: string;
  emoji: string;
  desc: string;
  tags: string[];
  drive: string; // זמן נסיעה משוער מבית אלפא
  waze: string;
};

export const ACTIVITIES: Activity[] = [
  {
    name: "גן השלושה (הסחנה)",
    emoji: "💦",
    desc: "בריכות רחצה טבעיות במים חמימים כל השנה. אחד המקומות היפים בארץ. כניסה על בסיס מקום פנוי — כדאי להקדים!",
    tags: ["👶 ידידותי לילדים", "💦 מים", "🌿 טבע"],
    drive: "~5 דק'",
    waze: "https://waze.com/ul?q=גן%20השלושה%20הסחנה",
  },
  {
    name: "גן לאומי בית אלפא",
    emoji: "🏛️",
    desc: "פסיפס בית הכנסת המפורסם מהמאה ה-6 עם גלגל המזלות — אחד היפים שהתגלו בישראל. ממש ליד החדרים.",
    tags: ["🏛️ תרבות", "👶 קצר וקליל"],
    drive: "~3 דק'",
    waze: "https://waze.com/ul?q=גן%20לאומי%20בית%20אלפא",
  },
  {
    name: "גן לאומי בית שאן",
    emoji: "🏟️",
    desc: "חורבות העיר הרומית-ביזנטית המרשימות. בקיץ יש גם את \"לילות שאן\" — חוויה לילית קסומה עם מיצג.",
    tags: ["🏛️ תרבות", "🌙 גם בלילה"],
    drive: "~12 דק'",
    waze: "https://waze.com/ul?q=גן%20לאומי%20בית%20שאן",
  },
  {
    name: "פארק המעיינות / נחל קיבוצים",
    emoji: "🚣",
    desc: "מסלולי מים ומעיינות לכל המשפחה, אפשר גם באופניים/רכב גולף. עין מודע ועין שוקק מצוינים לילדים.",
    tags: ["👶 ידידותי לילדים", "💦 מים", "🥾 מסלול"],
    drive: "~15 דק'",
    waze: "https://waze.com/ul?q=פארק%20המעיינות",
  },
  {
    name: "גן גארו",
    emoji: "🦘",
    desc: "פארק חיות אוסטרלי — קנגורו, ולבי וקואלות. ניצחון בטוח עם הפעוטות.",
    tags: ["👶 ידידותי לילדים", "🦘 חיות"],
    drive: "~20 דק'",
    waze: "https://waze.com/ul?q=גן%20גארו",
  },
  {
    name: "כוכב הירדן (בלוויר)",
    emoji: "🏰",
    desc: "מצודה צלבנית עם נוף עוצר נשימה לעמק הירדן. שקיעה מומלצת.",
    tags: ["🏛️ תרבות", "🌅 נוף"],
    drive: "~25 דק'",
    waze: "https://waze.com/ul?q=כוכב%20הירדן%20בלוויר",
  },
];

// ---- לינקים חשובים --------------------------------------------------------
export type LinkItem = { label: string; sub: string; emoji: string; href: string };
export const LINKS: LinkItem[] = [
  {
    label: "טבלת הקניות (Google Sheets)",
    sub: "אוכל · על האש · ציוד · קניות — מי מביא מה",
    emoji: "📊",
    href: "https://docs.google.com/spreadsheets/d/1nUVzWZttfq-F0nI6CvrFGQUl43iO-KgX-dVi9NoNKuY/edit?usp=sharing",
  },
  {
    label: "Splitwise — חלוקת הוצאות",
    sub: "מספיק שאחד מכל זוג יצטרף",
    emoji: "💸",
    href: "https://www.splitwise.com/join/u7W9ivgHdrV+d22mg?v=e",
  },
  {
    label: "אתר בית אלפא",
    sub: "להתרשם מהמקום",
    emoji: "🏡",
    href: "https://beitalfa.co.il",
  },
  {
    label: "ניווט לבית אלפא (Waze)",
    sub: "עמק המעיינות",
    emoji: "🧭",
    href: "https://waze.com/ul?q=בית%20אלפא%20אירוח%20כפרי",
  },
  {
    label: "התקשרו לבית אלפא",
    sub: "04-6533026",
    emoji: "☎️",
    href: "tel:046533026",
  },
  {
    label: "התורן (אחרי 17:00)",
    sub: "052-594-2071",
    emoji: "🌙",
    href: "tel:0525942071",
  },
];

// ---- משחקים וטבלת ניצחונות -----------------------------------------------
// הזוגות שמתחרים. ערכו את השמות כרצונכם.
export const TEAMS: { id: string; name: string }[] = [
  { id: "t1", name: "תום וסתיו" },
  { id: "t2", name: "נופר ומאליק" },
  { id: "t3", name: "ענבר ויונתן" },
  { id: "t4", name: "בר ובן זקן" },
  { id: "t5", name: "אביב ונדב" },
  { id: "t6", name: "אוהד ושיר" },
  { id: "t7", name: "שובל ובן/בת הזוג" },
];

export const GAMES: { id: string; name: string; emoji: string }[] = [
  { id: "alias", name: "אליאס", emoji: "🗣️" },
  { id: "hitster", name: "היטסטר", emoji: "🎵" },
  { id: "codenames", name: "שם קוד", emoji: "🕵️" },
  { id: "social", name: "משחק חברתי", emoji: "🎭" },
  { id: "other", name: "אחר", emoji: "🎲" },
];

// ---- לוח זמנים ליומן (קבצי ICS) ------------------------------------------
export type TripEvent = {
  id: string;
  title: string;
  startISO: string;
  durationMin: number;
  desc?: string;
  location?: string;
};
export const EVENTS: TripEvent[] = [
  { id: "pack", title: "🧳 לארוז להכל!", startISO: "2026-06-17T20:00:00+03:00", durationMin: 30, desc: "תזכורת לארוז ערב לפני" },
  { id: "depart", title: "🏖️ יוצאים לבית אלפא", startISO: "2026-06-18T13:00:00+03:00", durationMin: 60, desc: "צ׳ק-אין מ-15:00", location: "בית אלפא, עמק המעיינות" },
  { id: "checkin", title: "🔑 צ׳ק-אין בית אלפא", startISO: "2026-06-18T15:00:00+03:00", durationMin: 60, location: "בית אלפא, עמק המעיינות" },
  { id: "bbq", title: "🔥 על האש", startISO: "2026-06-19T18:00:00+03:00", durationMin: 180 },
  { id: "checkout", title: "👋 צ׳ק-אאוט", startISO: "2026-06-20T14:00:00+03:00", durationMin: 30, desc: "עד 15:00 בשבת" },
];

// ---- טרמפים ושיירה (תבנית — עדכנו את הנהגים והמקומות) ---------------------
export type Car = { driver: string; from: string; seatsFree: number; departure: string };
export const CARS: Car[] = [
  { driver: "נדב ואביב", from: "המרכז", seatsFree: 0, departure: "חמישי בבוקר" },
  { driver: "מלאו כאן 🙂", from: "—", seatsFree: 2, departure: "—" },
];

// ---- מה לארוז (צ׳ק-ליסט אישי, נשמר אצלכם במכשיר) -------------------------
export const PACKING: { label: string; emoji: string; items: string[] }[] = [
  { label: "בריכה ושמש", emoji: "🏊", items: ["בגדי ים", "מגבות (גם לסחנה)", "כפכפים", "קרם הגנה", "כובע ומשקפי שמש"] },
  { label: "ילדים ותינוקות", emoji: "👶", items: ["חיתולים ומגבונים", "בקבוקים/אוכל", "עגלה", "כובע לילד", "צעצועי בריכה"] },
  { label: "כללי", emoji: "🧴", items: ["פיג'מה ובגדים", "כלי רחצה", "תרופות אישיות", "מטען וכבל", "רמקול בלוטות'"] },
  { label: "לנופש הרציני", emoji: "🍹", items: ["מה שאתם מביאים (ראו משימות)", "משחק קופסה אם סומנתם", "מצב רוח טוב 👑"] },
];

// ---- קיר התמונות --------------------------------------------------------
// תמונות מהחבר'ה. רוצים להוסיף? שימו קובץ ב-src/assets/photos והוסיפו שורה כאן.
import balconyFlags from "../assets/photos/balcony-flags.jpg";
import purimParade from "../assets/photos/purim-parade.jpg";
import poolParty from "../assets/photos/pool-party.jpg";
import desertCamp from "../assets/photos/desert-camp.jpg";

export const PHOTOS: { src: string; caption: string }[] = [
  { src: balconyFlags, caption: "החבר'ה במרפסת 🇮🇱" },
  { src: poolParty, caption: "מסיבת בריכה 🍹" },
  { src: purimParade, caption: "פורים בשדרות 🎩" },
  { src: desertCamp, caption: "טיול במדבר 🏜️" },
];

// אופציונלי: לינק לאלבום מלא ב-Google Photos. ריק = לא מוצג.
export const PHOTO_ALBUM_URL = ""; // הדביקו כאן לינק ל-Google Photos / אלבום משותף

// ---- ביצים מוסתרות / בדיחות פנימיות --------------------------------------
export const QUOTES = [
  "טראמפ קיפל את המלחמה לא בגלל המונדיאל אלא בגלל הנופש הרציני 👑",
  "שום דבר לא יהרוס לנו את הנופש, חמודים ❤️",
  "האלכוהול הכי חשוב — שאר הדברים יסתדרו 🍹",
  "מגה רצינות 👑",
  "מי מביא את המנגל? *שלוש הודעות אחר כך* טוב, אני מביא 🔥",
  "אני 5 דקות משם — *מגיע אחרי שעה* 🚗",
  "סגרנו? סגרנו. *פותחים את הדיון מחדש* 🔁",
  "תכף עולה סקר 📊",
];

// ---- סטטיסטיקות צ׳אט הוואטסאפ --------------------------------------------
// ⚠️ נתוני דמו! שלחו ייצוא צ׳אט (קבוצה → ייצוא צ׳אט → ללא מדיה) ונחליף במספרים אמיתיים.
export type ChatAward = { emoji: string; title: string; who: string; note: string };
export const CHAT_STATS = {
  isDemo: true,
  totalMessages: 14238,
  // מי כותב הכי הרבה — ממוין מהגבוה לנמוך
  ranking: [
    { name: "בר", count: 2840 },
    { name: "יונתן", count: 2410 },
    { name: "נופר", count: 1980 },
    { name: "אוהד", count: 1560 },
    { name: "שיר", count: 1320 },
    { name: "סתיו", count: 1115 },
    { name: "תום", count: 880 },
    { name: "אלון", count: 760 },
  ] as { name: string; count: number }[],
  // פרסים מצחיקים
  awards: [
    { emoji: "👑", title: "מלך/ת הקבוצה", who: "בר", note: "כותב/ת יותר מכולם — בהפרש ניכר" },
    { emoji: "📊", title: "שר/ת הסקרים", who: "יונתן", note: "פותח/ת סקר על כל החלטה" },
    { emoji: "🌙", title: "פרס ינשוף הלילה", who: "אוהד", note: "ההודעות הכי מאוחרות (03:14)" },
    { emoji: "😂", title: "מלך/ת האימוג'ים", who: "נופר", note: "הכי הרבה 😂 בקבוצה" },
    { emoji: "👻", title: "פרס הרוח", who: "אלון", note: "קורא/ת הכל, כותב/ת הכי פחות" },
    { emoji: "🔁", title: "פותח/ת דיונים", who: "שיר", note: "\"רגע, אבל מה לגבי...\"" },
  ] as ChatAward[],
  // עובדות משעשעות
  funFacts: [
    "המילה שחוזרת הכי הרבה: \"רצינות\" — 213 פעמים 👑",
    "האימוג'י הכי נפוץ: 😂 (1,042 פעמים)",
    "היום הכי פעיל: יום חמישי בערב — לפני נסיעות",
    "37 סקרים נפתחו. 4 הגיעו להחלטה סופית.",
    "ההודעה הכי מאוחרת אי פעם: 03:14 לפנות בוקר 🦉",
  ],
};
