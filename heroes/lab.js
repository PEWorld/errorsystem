/* ERROR SYSTEM — HERO LAB switcher */
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const stages = [...document.querySelectorAll('.stage')];
const btns = [...document.querySelectorAll('.switch button')];

/* ---- build poster wall (stage 05) ---- */
const WALL_IMGS = [
  '../assets/poster/morgen.webp','../assets/poster/redking.webp','../assets/img/ou74-3.webp',
  '../assets/poster/darkpts.webp','../assets/img/cloth-1.webp','../assets/poster/wacko.webp',
  '../assets/img/carphamine-1.webp','../assets/poster/personsoul.webp','../assets/img/ou74-1.webp',
  '../assets/poster/marcelo.webp','../assets/img/cloth-4.webp','../assets/poster/numb.webp',
  '../assets/img/morgen-2.webp','../assets/poster/micro.webp','../assets/img/carphamine-5.webp'
];
const wall = document.getElementById('wall');
if (wall) {
  const cols = 5;
  for (let c = 0; c < cols; c++) {
    const col = document.createElement('div');
    col.className = 'col ' + (c % 2 ? 'down' : 'up');
    col.style.animationDelay = (-c * 3) + 's';
    // pick a rotating slice, duplicate for seamless loop
    const slice = [];
    for (let i = 0; i < 4; i++) slice.push(WALL_IMGS[(c * 3 + i) % WALL_IMGS.length]);
    [...slice, ...slice].forEach(src => {
      const img = document.createElement('img');
      img.loading = 'lazy'; img.dataset.src = src; img.alt = '';
      col.appendChild(img);
    });
    wall.appendChild(col);
  }
}

/* ---- typed effect (stage 02) ---- */
const typedEl = document.getElementById('typed');
const PHRASES = ['WE DIRECT AI LIKE A FILM CREW.', 'WE BUILD CGI LIKE SCULPTURE.', 'CAPTURED, NOT RENDERED.'];
let typeTimer = null;
function runTyped() {
  if (!typedEl || REDUCED) { if (typedEl) typedEl.textContent = PHRASES[0]; return; }
  let p = 0, i = 0, deleting = false;
  clearTimeout(typeTimer);
  (function tick() {
    const word = PHRASES[p];
    typedEl.textContent = word.slice(0, i);
    if (!deleting && i < word.length) { i++; typeTimer = setTimeout(tick, 46); }
    else if (!deleting && i === word.length) { deleting = true; typeTimer = setTimeout(tick, 1500); }
    else if (deleting && i > 0) { i--; typeTimer = setTimeout(tick, 24); }
    else { deleting = false; p = (p + 1) % PHRASES.length; typeTimer = setTimeout(tick, 260); }
  })();
}
function stopTyped() { clearTimeout(typeTimer); }

/* ---- activate a stage ---- */
function go(n) {
  document.body.dataset.hero = n;
  stages.forEach(s => {
    const active = +s.dataset.h === n;
    s.classList.toggle('on', active);
    s.querySelectorAll('video[data-src]').forEach(v => {
      if (active) { if (!v.src) v.src = v.dataset.src; v.play().catch(() => {}); }
      else v.pause();
    });
    if (active) s.querySelectorAll('img[data-src]').forEach(img => { if (!img.src) img.src = img.dataset.src; });
  });
  btns.forEach(b => b.classList.toggle('on', +b.dataset.go === n));
  n === 2 ? runTyped() : stopTyped();
}
btns.forEach(b => b.addEventListener('click', () => go(+b.dataset.go)));
addEventListener('keydown', e => {
  if (e.key >= '1' && e.key <= '5') go(+e.key);
  if (e.key === 'ArrowRight') go((+document.body.dataset.hero % 5) + 1);
  if (e.key === 'ArrowLeft') go(((+document.body.dataset.hero + 3) % 5) + 1);
});

go(1);
