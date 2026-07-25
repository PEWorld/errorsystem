/* ERROR SYSTEM — CRAFT hero */
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- image strip video ---- */
const sv = document.querySelector('.strip video');
if (sv) { sv.src = sv.dataset.src; sv.play().catch(() => {}); }

/* ---- changing headline ----
   Each phrase is exactly 3 lines. Lines never wrap (nowrap) and the
   container reserves 3 lines of height, so cycling can't shift layout. */
const PHRASES = [
  ['WE CRAFT',  'MACHINE-BORN', 'FILM WORLDS'],
  ['WE DIRECT', 'AI LIKE A',    'FILM CREW'],
  ['WE BUILD',  'IMPOSSIBLE',   'BRAND FILMS'],
  ['CAPTURED,', 'NOT',          'RENDERED']
];
const lns = [...document.querySelectorAll('.head .ln')];

function setPhrase(idx) {
  const p = PHRASES[idx];
  if (REDUCED) { lns.forEach((el, i) => el.textContent = p[i]); return; }
  const head = document.getElementById('head');
  lns.forEach((el, i) => setTimeout(() => el.classList.add('is-out'), i * 70));
  setTimeout(() => {
    lns.forEach((el, i) => { el.textContent = p[i]; el.classList.remove('is-out'); el.classList.add('is-pre'); });
    void head.offsetWidth;
    lns.forEach((el, i) => setTimeout(() => el.classList.remove('is-pre'), i * 70));
  }, 520);
}

if (!REDUCED) {
  let idx = 0;
  setInterval(() => { idx = (idx + 1) % PHRASES.length; setPhrase(idx); }, 3600);
}

/* ---- mobile menu toggle ---- */
const burger = document.getElementById('burger');
if (burger) {
  burger.addEventListener('click', () => document.body.classList.toggle('menu-open'));
  document.querySelectorAll('.nav__menu a').forEach(a =>
    a.addEventListener('click', () => document.body.classList.remove('menu-open')));
}

/* ---- REC timecode ---- */
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
