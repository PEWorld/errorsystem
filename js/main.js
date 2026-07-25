/* ERROR SYSTEM™ — HUD behaviours v2 */

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Form delivery goes through the serverless proxy at /api/lead so the
   Telegram bot token never touches the client. Set TG_BOT_TOKEN and
   TG_CHAT_ID as environment variables in the Vercel project. */
const LEAD_ENDPOINT = '/api/lead';

/* ============================================================
   CASE DATA
   ============================================================ */
const CASES = {
  morgen: {
    idx: '(01)', cat: '3D LYRIC VIDEO', title: 'MORGENSHTERN',
    desc: 'A burning chrome heart wrapped in steel spikes — a full-CG lyric video world built for the album drop. Every asset modeled, lit and destroyed in-house, cut to the beat so the hook lands before the first bar ends.',
    list: ['Full-CG lyric video', 'Key stills & cover art', 'Vertical cutdowns 9:16'],
    video: 'assets/vid/morgen.mp4', poster: 'assets/poster/morgen.webp',
    thumbs: ['assets/img/morgen-1.webp', 'assets/img/morgen-2.webp', 'assets/img/morgen-3.webp']
  },
  darkpts: {
    idx: '(02)', cat: 'AI FASHION FILM', title: 'DARK PTS',
    desc: 'Crows answer to the hero of this drop. A night-shoot chronicle for a streetwear label — moonlit skies, grounded camera, grain you can feel. Directed and graded to look captured, not rendered.',
    list: ['Hero film 30s', 'Campaign stills', 'Cutdowns 9:16 / 1:1'],
    video: 'assets/vid/darkpts.mp4', poster: 'assets/poster/darkpts.webp'
  },
  sculptor: {
    idx: '(03)', cat: 'AI FASHION FILM', title: 'SCULPTOR',
    desc: 'A creature stitched from a designer’s obsession glides over a neon-drowned city, then cuts back to the atelier where every shape is chased by hand. A dark couture film — rain, candlelight and grit, captured not rendered.',
    list: ['AI fashion film', 'Atelier & city key frames', 'Vertical cutdowns 9:16'],
    video: 'assets/vid/sculptor.mp4', poster: 'assets/poster/sculptor.webp'
  },
  worstwork: {
    idx: '(04)', cat: 'AI CAMPAIGN', title: 'WORST WORK',
    desc: 'A white tracksuit walks through fire and flood without breaking pace. Deadpan apocalypse as a brand statement — one world, six frames, zero gloss.',
    list: ['Campaign film', 'World constellation — 6 frames', 'Social versions'],
    video: 'assets/vid/worstwork.mp4', poster: 'assets/poster/worstwork.webp'
  },
  redking: {
    idx: '(05)', cat: 'CGI CHARACTER FILM', title: 'MORGENSHTERN',
    desc: 'The Red King — a crowned knight in liquid-red armour, sculpted and rendered like jewelry for the artist’s visual universe. The gold is heavy, the plastic is nowhere.',
    list: ['CGI character build', 'Hero loops & renders', 'Scene lighting & grade'],
    video: 'assets/vid/redking.mp4', poster: 'assets/poster/redking.webp'
  },
  numb: {
    idx: '(06)', cat: 'AI FASHION FILM', title: 'NUMB ATELIER',
    desc: 'Backstage of a gothic atelier: lacing, studs and cold morning light. A fashion film that smells of workshop dust instead of showroom polish.',
    list: ['Fashion film', 'Detail macro series', 'Reels edit'],
    video: 'assets/vid/numb.mp4', poster: 'assets/poster/numb.webp'
  },
  wacko: {
    idx: '(07)', cat: 'AI CAMPAIGN', title: 'WACKO MARIA',
    desc: 'Koi, silk and deep water — a slow-burn campaign film where the print comes alive one ripple at a time. Built for a brand that already speaks in patterns.',
    list: ['Campaign film', 'Print-to-motion frames', 'Social cutdowns'],
    video: 'assets/vid/wacko.mp4', poster: 'assets/poster/wacko.webp'
  },
  personsoul: {
    idx: '(08)', cat: 'AI MUSIC FILM', title: 'PERSONSOUL',
    desc: 'A bride stands on a car inside a ring of fire. Single-shot escalation timed to the drop of the track — the kind of frame you retell in five words.',
    list: ['Music film', 'Key frame stills', 'Vertical edit'],
    video: 'assets/vid/personsoul.mp4', poster: 'assets/poster/personsoul.webp'
  },
  micro: {
    idx: '(09)', cat: '3D CHARACTER', title: 'VALKYRIE',
    desc: 'A glitch-scanned valkyrie in white armour — 3D character study pushed through our error pipeline until the render started to breathe.',
    list: ['3D character build', 'Turntable & loops', 'Chromatic glitch pass'],
    video: 'assets/vid/micro.mp4', poster: 'assets/poster/micro.webp'
  },
  marcelo: {
    idx: '(10)', cat: 'AI CAMPAIGN', title: 'MARCELO MIRACLES',
    desc: 'Frozen fur, drifting particles and blue dusk — a tactile AI campaign where every frame is macro-close and impossibly cold.',
    list: ['Campaign film', 'Texture macro series', 'Social versions'],
    video: 'assets/vid/marcelo.mp4', poster: 'assets/poster/marcelo.webp'
  },
  uniz: {
    idx: '(11)', cat: 'AI CAMPAIGN', title: 'UNIZ',
    desc: 'Jet-fire and cold smoke on a rain-soaked lot — two figures step out of the fog like the drop just landed. A high-contrast AI campaign film built for streetwear that wants to feel dangerous.',
    list: ['Campaign film', 'Hero key frames', 'Vertical cutdowns 9:16'],
    video: 'assets/vid/uniz.mp4', poster: 'assets/poster/uniz.webp'
  },
  carphamine: {
    idx: '(12)', cat: 'BRAND IDENTITY', title: 'CARPHAMINE',
    desc: 'Full identity for a Dubai car rental: a chrome logomark built from a racing flag, license-plate system, stationery and a feed that sells speed. Quick. Effortless.',
    list: ['Logomark & identity core', 'License-plate & print kit', 'Social feed design'],
    image: 'assets/img/carphamine-1.webp',
    thumbs: ['assets/img/carphamine-1.webp', 'assets/img/carphamine-2.webp', 'assets/img/carphamine-3.webp', 'assets/img/carphamine-4.webp', 'assets/img/carphamine-5.webp']
  },
  ou74: {
    idx: '(13)', cat: '3D JEWELRY CAMPAIGN', title: 'OU74',
    desc: 'Chrome flora on black fabric — product CGI for a jewelry drop. Pendants modeled to the last scratch and lit like relics, not like catalogue items.',
    list: ['Product CGI renders', 'Campaign key visuals', 'Feed series'],
    image: 'assets/img/ou74-3.webp',
    thumbs: ['assets/img/ou74-3.webp', 'assets/img/ou74-1.webp', 'assets/img/ou74-2.webp', 'assets/img/ou74-4.webp']
  },
  cloth: {
    idx: '(14)', cat: 'APPAREL COLLECTION', title: 'ECLIPSE MODE',
    desc: 'A nine-piece capsule designed end to end: glitch prints, silver embroidery and ERROR 404 across the back. Dark, bold silhouettes — ready to go into eclipse mode.',
    list: ['9-piece collection design', 'Print & embroidery artwork', 'Lookbook layout'],
    image: 'assets/img/cloth-1.webp',
    thumbs: ['assets/img/cloth-1.webp', 'assets/img/cloth-4.webp', 'assets/img/cloth-2.webp', 'assets/img/cloth-3.webp', 'assets/img/cloth-5.webp']
  }
};
const CASE_ORDER = Object.keys(CASES);

/* ============================================================
   BOOT SEQUENCE
   ============================================================ */
const boot = document.getElementById('boot');
const bootlog = document.getElementById('bootlog');
const bootbar = document.getElementById('bootbar');
const LINES = [
  'ERROR_SYSTEM v2.4 — boot',
  'loading worlds ......... <b>OK</b>',
  'calibrating grain ...... <b>OK</b>',
  'hooking second one ..... <b>OK</b>',
  'injecting errors ....... <b>100%</b>'
];
function finishBoot() {
  boot.classList.add('is-done');
  document.documentElement.classList.remove('no-scroll');
  document.body.classList.add('is-booted');
  boot.setAttribute('aria-hidden', 'true');
}
if (REDUCED || sessionStorage.getItem('esBoot')) {
  finishBoot();
} else {
  document.documentElement.classList.add('no-scroll');
  LINES.forEach((line, i) => {
    setTimeout(() => {
      const p = document.createElement('p');
      p.innerHTML = line;
      bootlog.appendChild(p);
      bootbar.style.width = ((i + 1) / LINES.length * 100) + '%';
    }, 160 + i * 190);
  });
  setTimeout(() => {
    sessionStorage.setItem('esBoot', '1');
    finishBoot();
  }, 160 + LINES.length * 190 + 420);
}

/* ============================================================
   NAV + SCROLL PROGRESS
   ============================================================ */
const nav = document.getElementById('nav');
const sprog = document.getElementById('sprog');
let ticking = false;
function onScroll() {
  const sy = scrollY;
  nav.classList.toggle('is-scrolled', sy > 40);
  const doc = document.documentElement;
  sprog.style.width = (sy / (doc.scrollHeight - innerHeight) * 100) + '%';
  ticking = false;
}
addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
}, { passive: true });
onScroll();

/* ============================================================
   MOBILE MENU (burger)
   ============================================================ */
const burger = document.getElementById('burger');
if (burger) {
  const setMenu = open => {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  document.querySelectorAll('#navlinks a, #navlinks .nav__menucta').forEach(el =>
    el.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
}

/* ============================================================
   HERO — changing headline (3 reserved lines, no layout shift)
   ============================================================ */
(function () {
  const head = document.getElementById('heroHead');
  if (!head) return;
  const PHRASES = [
    ['WE CRAFT',  'MACHINE-BORN', 'FILM WORLDS'],
    ['WE DIRECT', 'AI LIKE A',    'FILM CREW'],
    ['WE BUILD',  'IMPOSSIBLE',   'BRAND FILMS'],
    ['CAPTURED,', 'NOT',          'RENDERED']
  ];
  const hlns = [...head.querySelectorAll('.ln')];
  if (REDUCED) return;
  function set(p) {
    hlns.forEach((el, i) => setTimeout(() => el.classList.add('is-out'), i * 70));
    setTimeout(() => {
      hlns.forEach((el, i) => { el.textContent = p[i]; el.classList.remove('is-out'); el.classList.add('is-pre'); });
      void head.offsetWidth;
      hlns.forEach((el, i) => setTimeout(() => el.classList.remove('is-pre'), i * 70));
    }, 520);
  }
  let hi = 0;
  setInterval(() => { hi = (hi + 1) % PHRASES.length; set(PHRASES[hi]); }, 3600);
})();

/* ============================================================
   REC TIMECODE (24fps)
   ============================================================ */
const tc1 = document.getElementById('timecode');
const tc2 = document.getElementById('timecode2');
let frames = 14 * 60 * 24 + 12 * 24 + 21; // 00:14:12:21 like on set
const pad2 = n => String(n).padStart(2, '0');
setInterval(() => {
  frames++;
  const f = frames % 24;
  const s = Math.floor(frames / 24) % 60;
  const m = Math.floor(frames / (24 * 60)) % 60;
  const h = Math.floor(frames / (24 * 3600)) % 24;
  const str = `${pad2(h)}:${pad2(m)}:${pad2(s)}:${pad2(f)}`;
  if (tc1) tc1.textContent = str;
  if (tc2) tc2.textContent = str;
}, 1000 / 24);

/* ============================================================
   TEXT FX — word split + scramble
   ============================================================ */
function splitWords(el) {
  if (REDUCED) return;
  const nodes = [...el.childNodes];
  el.textContent = '';
  let wi = 0;
  nodes.forEach(node => {
    if (node.nodeType === 3) {
      node.textContent.split(/\s+/).filter(Boolean).forEach(word => {
        const outer = document.createElement('span');
        outer.className = 'w';
        const inner = document.createElement('span');
        inner.className = 'wi';
        inner.textContent = word;
        inner.style.setProperty('--wd', (wi++ * 70) + 'ms');
        outer.appendChild(inner);
        el.appendChild(outer);
        el.appendChild(document.createTextNode(' '));
      });
    } else {
      el.appendChild(node);
    }
  });
}
document.querySelectorAll('.display, .contact__title').forEach(splitWords);

const GLYPHS = '█▓▒░<>/\\|=+*#%01';
function scramble(el) {
  if (REDUCED || el.dataset.scrDone) return;
  el.dataset.scrDone = '1';
  const finalText = el.textContent;
  const len = finalText.length;
  let frame = 0;
  const total = 18;
  const timer = setInterval(() => {
    frame++;
    const settled = Math.floor(len * frame / total);
    let out = '';
    for (let i = 0; i < len; i++) {
      const ch = finalText[i];
      out += (i < settled || ch === ' ') ? ch : GLYPHS[Math.random() * GLYPHS.length | 0];
    }
    el.textContent = out;
    if (frame >= total) { el.textContent = finalText; clearInterval(timer); }
  }, 34);
}

/* ============================================================
   REVEAL ON SCROLL (+ stagger, + scramble triggers)
   ============================================================ */
document.querySelectorAll('.work-grid .tile, .proc li, .creed li, .svc__row').forEach((el, i) => {
  el.style.setProperty('--d', (i % 4) * 90 + 'ms');
});
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-in');
      e.target.querySelectorAll('.mono-label').forEach(scramble);
      if (e.target.classList.contains('mono-label')) scramble(e.target);
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* word-reveal for headings that aren't wrapped in .reveal themselves */
const wio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('wr-in'); wio.unobserve(e.target); }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.display, .contact__title').forEach(el => wio.observe(el));

/* ============================================================
   LAZY VIDEO — load + play in view, pause out
   ============================================================ */
/* on Save-Data / slow connections keep posters only, skip video downloads */
const conn = navigator.connection;
const DATA_SAVER = !!(conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '')));
const vio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    const v = e.target;
    if (e.isIntersecting) {
      if (v.dataset.poster && !v.poster) v.poster = v.dataset.poster;
      if (!DATA_SAVER && v.dataset.src && !v.src) v.src = v.dataset.src;
      if (v.src) v.play().catch(() => {});
    } else {
      v.pause();
    }
  });
}, { rootMargin: '240px 0px' });
document.querySelectorAll('video[data-src], video[data-poster]').forEach(v => vio.observe(v));

/* ============================================================
   IDENTITY STRIP — drag to scroll
   ============================================================ */
const strip = document.getElementById('strip');
if (strip) {
  let down = false, moved = false, startX = 0, startL = 0;
  strip.addEventListener('pointerdown', e => {
    down = true; moved = false; startX = e.clientX; startL = strip.scrollLeft;
    strip.classList.add('is-drag');
  });
  strip.addEventListener('pointermove', e => {
    if (!down) return;
    if (Math.abs(e.clientX - startX) > 6) { moved = true; strip.setPointerCapture(e.pointerId); }
    strip.scrollLeft = startL - (e.clientX - startX);
  });
  ['pointerup', 'pointercancel'].forEach(ev =>
    strip.addEventListener(ev, () => { down = false; strip.classList.remove('is-drag'); }));
  /* suppress click-open after a drag */
  strip.addEventListener('click', e => { if (moved) e.stopPropagation(); }, true);
}

/* ============================================================
   STATS COUNT-UP
   ============================================================ */
const sio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    sio.unobserve(e.target);
    const el = e.target, target = +el.dataset.count;
    let cur = 0;
    const step = () => {
      cur += Math.max(1, Math.round(target / 24));
      el.textContent = Math.min(cur, target);
      if (cur < target) requestAnimationFrame(step);
    };
    step();
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(el => sio.observe(el));

/* ============================================================
   TILT — process cards
   ============================================================ */
if (!REDUCED && matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('.proc li').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - .5) * -7;
      const ry = ((e.clientX - r.left) / r.width - .5) * 7;
      el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      el.style.transition = 'transform .08s linear';
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1)';
      el.style.transform = '';
    });
  });
}

/* ============================================================
   CASE MODAL
   ============================================================ */
const modal = document.getElementById('modal');
const mVideo = modal.querySelector('.modal__media video');
const mImg = modal.querySelector('.modal__media img');
const mIdx = document.getElementById('m-idx');
const mCat = document.getElementById('m-cat');
const mTitle = document.getElementById('m-title');
const mDesc = document.getElementById('m-desc');
const mList = document.getElementById('m-list');
const mThumbs = document.getElementById('m-thumbs');
let curCase = null;

function showMedia(kind, src, poster) {
  if (kind === 'video') {
    mImg.hidden = true;
    mVideo.hidden = false;
    if (poster) mVideo.poster = poster;
    mVideo.src = src;
    mVideo.play().catch(() => {});
  } else {
    mVideo.pause(); mVideo.removeAttribute('src');
    mVideo.hidden = true;
    mImg.hidden = false;
    mImg.src = src;
  }
}

function openCase(key, push = true) {
  const c = CASES[key];
  if (!c) return;
  curCase = key;
  mIdx.textContent = c.idx;
  mCat.textContent = c.cat;
  mTitle.textContent = c.title;
  mDesc.textContent = c.desc;
  mList.innerHTML = c.list.map(li => `<li>${li}</li>`).join('');
  mThumbs.innerHTML = '';
  const addThumb = (src, onPick, act) => {
    const t = document.createElement('img');
    t.src = src; t.alt = '';
    if (act) t.classList.add('is-act');
    t.addEventListener('click', () => {
      onPick();
      mThumbs.querySelectorAll('img').forEach(x => x.classList.remove('is-act'));
      t.classList.add('is-act');
    });
    mThumbs.appendChild(t);
  };
  if (c.thumbs) {
    if (c.video) addThumb(c.poster, () => showMedia('video', c.video, c.poster), true);
    c.thumbs.forEach((src, i) =>
      addThumb(src, () => showMedia('image', src), !c.video && i === 0));
  }
  showMedia(c.video ? 'video' : 'image', c.video || c.image, c.poster);
  if (push) {
    modal.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('is-open')));
    document.body.classList.add('modal-open');
  }
}
function closeModal() {
  modal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  mVideo.pause();
  setTimeout(() => { modal.hidden = true; }, 450);
}
function stepCase(dir) {
  const i = CASE_ORDER.indexOf(curCase);
  const next = CASE_ORDER[(i + dir + CASE_ORDER.length) % CASE_ORDER.length];
  openCase(next, false);
}

document.querySelectorAll('[data-case]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    openCase(el.dataset.case);
  });
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCase(el.dataset.case); }
  });
});
modal.querySelectorAll('[data-close]').forEach(el =>
  el.addEventListener('click', () => closeModal()));
document.getElementById('m-prev').addEventListener('click', () => stepCase(-1));
document.getElementById('m-next').addEventListener('click', () => stepCase(1));
addEventListener('keydown', e => {
  if (modal.hidden) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft') stepCase(-1);
  if (e.key === 'ArrowRight') stepCase(1);
});

/* portrait media (e.g. vertical VALKYRIE loop) → contain instead of crop */
const mMediaBox = modal.querySelector('.modal__media');
mVideo.addEventListener('loadedmetadata', () => {
  mMediaBox.classList.toggle('is-portrait', mVideo.videoHeight > mVideo.videoWidth);
});
mImg.addEventListener('load', () => {
  if (!mImg.hidden) mMediaBox.classList.toggle('is-portrait', mImg.naturalHeight > mImg.naturalWidth * 1.15);
});

/* ============================================================
   PROJECT FORM MODAL (UI only — submit is not wired to a backend)
   ============================================================ */
const fmodal = document.getElementById('formodal');
const fform = document.getElementById('fform');
const fdone = document.getElementById('fdone');
const ferr = document.getElementById('ferr');
function openForm() {
  fform.hidden = false;
  fdone.hidden = true;
  ferr.hidden = true;
  fmodal.hidden = false;
  requestAnimationFrame(() => requestAnimationFrame(() => fmodal.classList.add('is-open')));
  document.body.classList.add('modal-open');
  if (typeof ym === 'function') ym(109148384, 'reachGoal', 'form_open');
}
function closeForm() {
  fmodal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  setTimeout(() => { fmodal.hidden = true; }, 450);
}
document.querySelectorAll('[data-form]').forEach(el =>
  el.addEventListener('click', () =>
    setTimeout(openForm, el.hasAttribute('data-close') ? 250 : 0)));
fmodal.querySelectorAll('[data-fclose]').forEach(el =>
  el.addEventListener('click', closeForm));
fform.addEventListener('submit', async e => {
  e.preventDefault();
  ferr.hidden = true;

  const f = fform.elements;
  const name = f.name.value.trim();
  const contact = f.contact.value.trim();
  const brief = f.brief.value.trim();
  const budget = f.budget.value;

  /* honeypot: silently "succeed" for bots */
  if (f.website.value) { fform.hidden = true; fdone.hidden = false; return; }

  /* need at least a way to reply */
  if (!contact) {
    f.contact.closest('.fform__field').classList.add('is-bad');
    f.contact.focus();
    return;
  }

  const btn = fform.querySelector('.fform__submit');
  const label = btn.querySelector('span');
  btn.disabled = true;
  label.textContent = 'SENDING…';

  try {
    const res = await fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, contact, brief, budget, page: location.hostname })
    });
    if (!res.ok) throw new Error('lead ' + res.status);
    fform.reset();
    fform.hidden = true;
    fdone.hidden = false;
    if (typeof ym === 'function') ym(109148384, 'reachGoal', 'signal_sent');
  } catch (err) {
    ferr.hidden = false;
  } finally {
    btn.disabled = false;
    label.textContent = 'Send the signal';
  }
});
fform.querySelectorAll('input, textarea').forEach(el =>
  el.addEventListener('input', () => el.closest('.fform__field')?.classList.remove('is-bad')));
addEventListener('keydown', e => {
  if (!fmodal.hidden && e.key === 'Escape') closeForm();
});

/* ============================================================
   LOCAL TIME
   ============================================================ */
const clock = document.getElementById('clock');
if (clock) setInterval(() => {
  clock.textContent = new Date().toLocaleTimeString('en-GB');
}, 1000);
