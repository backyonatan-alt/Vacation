import confetti from "canvas-confetti";

// פיצוץ קונפטי קטן בצבעי הנופש כשמסמנים משימה
export function celebrate(x = 0.5, y = 0.5) {
  const colors = ["#ffd166", "#22c9d2", "#ff9f43", "#ff5f5f", "#10b981", "#7c5cff"];
  confetti({
    particleCount: 70,
    spread: 70,
    startVelocity: 32,
    origin: { x, y },
    colors,
    scalar: 0.9,
    ticks: 160,
  });
}

// פיצוץ גדול (לכשהספירה מגיעה ל-0 / כל המשימות הושלמו)
export function bigCelebrate() {
  const colors = ["#ffd166", "#22c9d2", "#ff9f43", "#ff5f5f", "#10b981", "#7c5cff"];
  const end = Date.now() + 1200;
  (function frame() {
    confetti({ particleCount: 6, angle: 60, spread: 75, origin: { x: 0, y: 0.7 }, colors });
    confetti({ particleCount: 6, angle: 120, spread: 75, origin: { x: 1, y: 0.7 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
