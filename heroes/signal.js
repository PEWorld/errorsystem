/* ERROR SYSTEM — SIGNAL hero */
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- lazy-load + play the face video ---- */
const fv = document.querySelector('.face__vid');
if (fv) {
  fv.src = fv.dataset.src;
  fv.play().catch(() => {});
}

/* ---- changing block: typing loop ---- */
const typedEl = document.getElementById('typed');
const PHRASES = [
  'WORLDS THAT SHOULDN’T EXIST',
  'CAPTURED, NOT RENDERED',
  'A HOOK IN SECOND ONE',
  'THE SYSTEM HAS A FACE'
];
if (typedEl) {
  if (REDUCED) {
    typedEl.textContent = PHRASES[0];
  } else {
    let p = 0, i = 0, deleting = false;
    (function tick() {
      const word = PHRASES[p];
      typedEl.textContent = word.slice(0, i);
      let wait;
      if (!deleting && i < word.length) { i++; wait = 52; }
      else if (!deleting && i === word.length) { deleting = true; wait = 1700; }
      else if (deleting && i > 0) { i--; wait = 26; }
      else { deleting = false; p = (p + 1) % PHRASES.length; wait = 320; }
      setTimeout(tick, wait);
    })();
  }
}

/* ---- REC timecode (24fps) ---- */
const tc = document.getElementById('tc');
if (tc) {
  let frames = 14 * 60 * 24 + 12 * 24 + 21;
  const pad = n => String(n).padStart(2, '0');
  setInterval(() => {
    frames++;
    const f = frames % 24, s = Math.floor(frames / 24) % 60,
          m = Math.floor(frames / (24 * 60)) % 60, h = Math.floor(frames / (24 * 3600)) % 24;
    tc.textContent = `${pad(h)}:${pad(m)}:${pad(s)}:${pad(f)}`;
  }, 1000 / 24);
}

/* ---- burger is a placeholder toggle for the preview ---- */
document.querySelector('.burger')?.addEventListener('click', () => {
  alert('Mobile menu — wired when this hero ships into the site.');
});
