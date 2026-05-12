/* ═══════════════════════════════════════════════════
   WAKITOKYS — app.js
   Audio player + visualizer + carousel + reveals + lyrics + egg
   ═══════════════════════════════════════════════════ */

const TRACKS = [
  { num: '01', name: 'Música',      src: 'assets/audio/musica.mp3',      dur: '3:42', mood: 'Cósmica · Pop rock' },
  { num: '02', name: 'China',       src: 'assets/audio/china.mp3',       dur: '4:10', mood: 'Patagónica · Indie folk' },
  { num: '03', name: 'Noganoma',    src: 'assets/audio/noganoma.mp3',    dur: '5:08', mood: 'Hip hop · Funk · Crítica' },
  { num: '04', name: 'Trance',      src: 'assets/audio/trance.mp3',      dur: '3:55', mood: 'Hipnótica · Rap' },
  { num: '05', name: 'El Día',      src: 'assets/audio/el-dia.mp3',      dur: '3:30', mood: 'Tormenta · Pop' },
  { num: '06', name: 'Insomnio',    src: 'assets/audio/insomnio.mp3',    dur: '4:22', mood: 'Nocturna · Rap' },
  { num: '07', name: 'Cayendo',     src: 'assets/audio/cayendo.mp3',     dur: '4:15', mood: 'Reflexiva · Soul' },
  { num: '08', name: 'Hipnotizadx', src: 'assets/audio/hipnotizadx.mp3', dur: '3:18', mood: 'Picante · Funk' },
];

const CREDITOS = [
  { rol: 'Producción · dirección musical · mezcla y master', nombre: 'Gabriel Biuso',         ig: 'gbiuso' },
  { rol: 'Voces y bajo',                  nombre: 'Luciano Campodónico',  ig: 'lucianocampodonico' },
  { rol: 'Trompeta y voces',              nombre: 'Ramón Ferreri',        ig: 'ramondelbarco' },
  { rol: 'Teclados y sintetizadores',     nombre: 'Julián Cosenza',       ig: 'piwom' },
  { rol: 'Batería',                       nombre: 'Agustín Morán Fus',    ig: 'thewailord' },
  { rol: 'Guitarras',                     nombre: 'Federico Rodríguez',   ig: 'fede.apellido' },
  { rol: 'Percusión',                     nombre: 'Emilio García',               ig: 'boxy_emilio' },
  { rol: 'Voces y coros',                 nombre: 'Carolina Rodríguez',   ig: 'carito_chicharra' },
  { rol: 'Voces y coros',                 nombre: 'Andy Jud',             ig: 'andyjud.b' },
  { rol: 'Drum Doctor',                   nombre: 'Jonny Dona',           ig: 'jonnydona' },
];

/* ─── render carousel cards ─── */
const carouselTrack = document.getElementById('carousel-track');
TRACKS.forEach((t, i) => {
  const card = document.createElement('div');
  card.className = 'track-card reveal';
  card.dataset.idx = i;
  card.innerHTML = `
    <div class="tc-top">
      <span class="tc-num">${t.num}</span>
      <span class="tc-dur">${t.dur}</span>
    </div>
    <div class="tc-mid"><span class="tc-title">${t.name}</span></div>
    <div class="tc-wave" aria-hidden="true">
      ${Array.from({length: 22}, () => '<span class="b"></span>').join('')}
    </div>
    <div class="tc-bottom">
      <button class="tc-letras" data-letras="${i}">letras <span class="arr">→</span></button>
      <button class="tc-action" aria-label="play ${t.name}">
        <span class="tc-mood-mini" style="font-size:9px;letter-spacing:.25em;color:var(--gray-300);text-transform:uppercase;">${t.mood.split(' · ')[0]}</span>
        <span class="tc-play"><svg width="11" height="12" viewBox="0 0 11 12"><path d="M1 1l9 5-9 5V1z"/></svg></span>
      </button>
    </div>`;
  carouselTrack.appendChild(card);
});

/* dots */
const dotsWrap = document.getElementById('carousel-dots');
TRACKS.forEach((_, i) => {
  const d = document.createElement('span'); d.className = 'd'; if (i===0) d.classList.add('on');
  dotsWrap.appendChild(d);
});
const counter = document.getElementById('carousel-counter');
function setCounter(i){ counter.textContent = `${String(i+1).padStart(2,'0')} / ${String(TRACKS.length).padStart(2,'0')} · ${TRACKS[i].mood}`; }
setCounter(0);

/* carousel snap detection */
const trackCards = [...document.querySelectorAll('.track-card')];
let activeCardIdx = 0;
function updateActiveCard() {
  const cw = carouselTrack.clientWidth;
  const center = carouselTrack.scrollLeft + cw / 2;
  let closest = 0, closestDist = Infinity;
  trackCards.forEach((c, i) => {
    const cx = c.offsetLeft + c.offsetWidth / 2;
    const d = Math.abs(cx - center);
    if (d < closestDist) { closestDist = d; closest = i; }
  });
  if (closest !== activeCardIdx) {
    activeCardIdx = closest;
    document.querySelectorAll('.carousel-dots .d').forEach((d, i) => d.classList.toggle('on', i===closest));
    setCounter(closest);
  }
}
carouselTrack.addEventListener('scroll', () => requestAnimationFrame(updateActiveCard), { passive: true });

/* card click → play */
trackCards.forEach((card, i) => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('[data-letras]')) return;
    load(i);
  });
});

/* ─── render credits ─── */
const credWrap = document.getElementById('creditos-wrap');
CREDITOS.forEach(c => {
  const card = document.createElement('div');
  card.className = 'cred-card reveal';
  card.innerHTML = `
    <div class="cred-inner">
      <div class="cred-face cred-front">
        <span class="rol">${c.rol}</span>
        <span class="nombre">${c.nombre}</span>
        <span class="tap">Tap → IG</span>
      </div>
      <div class="cred-face cred-back">
        <span class="ig-eye">Instagram</span>
        <span class="ig-handle">@${c.ig}</span>
        <a class="ig-link" href="https://instagram.com/${c.ig}" target="_blank" rel="noopener">
          Abrir <span>↗</span>
        </a>
      </div>
    </div>`;
  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    card.classList.toggle('flip');
  });
  credWrap.appendChild(card);
});

/* ─── intro enter ─── */
function enter(){
  document.getElementById('intro').classList.add('out');
  document.getElementById('main').classList.add('on');
  // try to unlock audio context with first user gesture
  try { ensureAudioCtx(); } catch(e){}
}
window.enter = enter;
// fallback touch para el botón en móvil
document.addEventListener('DOMContentLoaded', () => {
  const cta = document.querySelector('.intro-cta');
  if (cta) {
    cta.addEventListener('touchstart', (e) => { e.stopPropagation(); }, { passive: true });
    cta.addEventListener('touchend', (e) => { e.preventDefault(); e.stopPropagation(); enter(); }, { passive: false });
    cta.addEventListener('click', () => { enter(); });
  }
});

/* ─── audio player ─── */
const PREVIEW_LIMIT = null; // sin límite
const FADE_START = null; // sin fade
const aud = document.getElementById('aud');
const bar = document.getElementById('player-bar');
let curIdx = -1, playing = false, raf = null, fadeTimer = null;

let actx = null, source = null, analyser = null, dataArr = null;
function ensureAudioCtx() {
  if (actx) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  actx = new AC();
  source = actx.createMediaElementSource(aud);
  analyser = actx.createAnalyser();
  analyser.fftSize = 64;
  source.connect(analyser);
  analyser.connect(actx.destination);
  dataArr = new Uint8Array(analyser.frequencyBinCount);
}

function load(i) {
  if (curIdx === i) { playing ? pause() : play(); return; }
  stopFade();
  aud.pause();
  trackCards.forEach(c => c.classList.remove('active','playing'));
  trackCards[i].classList.add('active');
  curIdx = i;
  aud.src = TRACKS[i].src;
  aud.currentTime = 0; aud.volume = 1;
  document.getElementById('pb-name').textContent = TRACKS[i].name;
  document.getElementById('pb-meta').innerHTML = `<span class="live-dot"></span> Preview · ${TRACKS[i].mood}`;
  document.getElementById('pb-cover').style.backgroundImage = "url('assets/img/cover.jpg')";
  bar.classList.add('on');
  /* scroll active card into center on programmatic load */
  const c = trackCards[i];
  carouselTrack.scrollTo({ left: c.offsetLeft - (carouselTrack.clientWidth - c.offsetWidth)/2, behavior: 'smooth' });
  play();
}
function play() {
  ensureAudioCtx();
  if (actx && actx.state === 'suspended') actx.resume();
  aud.play().then(() => {
    playing = true; uiUpdate();
    if (curIdx >= 0) trackCards[curIdx].classList.add('playing');
    tick(); drawViz();
  }).catch(err => {
    /* probably no audio file yet — keep UI in playing-attempted state but flag */
    console.warn('audio failed', err);
    playing = true; uiUpdate();
    if (curIdx >= 0) trackCards[curIdx].classList.add('playing');
    fakeWaveAnim();
  });
}
function pause() {
  aud.pause(); playing = false; uiUpdate();
  if (curIdx >= 0) trackCards[curIdx].classList.remove('playing');
  cancelAnimationFrame(raf);
}
function toggle() { if (curIdx < 0) { load(0); return; } playing ? pause() : play(); }
function prev() { load(curIdx <= 0 ? TRACKS.length - 1 : curIdx - 1); }
function next() { load(curIdx >= TRACKS.length - 1 ? 0 : curIdx + 1); }
window.toggle = toggle; window.prev = prev; window.next = next;

function uiUpdate() {
  document.getElementById('ic-play').style.display  = playing ? 'none' : 'block';
  document.getElementById('ic-pause').style.display = playing ? 'block' : 'none';
}

function tick() {
  const c = aud.currentTime;
  const dur = aud.duration || 0;
  document.getElementById('pb-fill').style.width = (dur > 0 ? Math.min(c/dur, 1)*100 : 0) + '%';
  document.getElementById('pb-cur').textContent = fmt(c);
  document.getElementById('pb-total').textContent = fmt(dur);
  if (playing) raf = requestAnimationFrame(tick);
}
function stopFade() { if (fadeTimer) { clearInterval(fadeTimer); fadeTimer = null; } }
function fmt(s) { return Math.floor(s/60) + ':' + Math.floor(s%60).toString().padStart(2,'0'); }

document.getElementById('pb-progress').addEventListener('click', (e) => {
  if (curIdx < 0) return;
  const r = e.currentTarget.getBoundingClientRect();
  aud.currentTime = (e.clientX - r.left)/r.width * (aud.duration || 0);
  aud.volume = 1; stopFade(); if (!playing) play();
});

aud.addEventListener('ended', () => {
  stopFade(); playing = false; uiUpdate();
  if (curIdx >= 0) trackCards[curIdx].classList.remove('playing');
});

/* ─── visualizer (canvas + per-card bars) ─── */
const canvas = document.getElementById('viz');
const cctx = canvas.getContext('2d');
function resizeViz(){ canvas.width = canvas.clientWidth * devicePixelRatio; canvas.height = canvas.clientHeight * devicePixelRatio; }
window.addEventListener('resize', resizeViz); resizeViz();

function drawViz() {
  if (!playing) return;
  if (analyser) {
    analyser.getByteFrequencyData(dataArr);
    cctx.clearRect(0,0,canvas.width,canvas.height);
    const bars = 36;
    const w = canvas.width / bars;
    for (let i = 0; i < bars; i++) {
      const v = dataArr[i % dataArr.length] / 255;
      const h = Math.max(1, v * canvas.height);
      cctx.fillStyle = '#fff';
      cctx.fillRect(i*w + w*0.15, canvas.height - h, w*0.7, h);
    }
    /* update active card bars too */
    if (curIdx >= 0) {
      const cardBars = trackCards[curIdx].querySelectorAll('.tc-wave .b');
      cardBars.forEach((b, j) => {
        const v = dataArr[j % dataArr.length] / 255;
        b.style.height = Math.max(8, v * 100) + '%';
      });
    }
  }
  raf = requestAnimationFrame(drawViz);
}

function fakeWaveAnim() {
  /* fallback when no audio file: animate bars randomly */
  if (!playing) return;
  cctx.clearRect(0,0,canvas.width,canvas.height);
  const bars = 36;
  const w = canvas.width / bars;
  for (let i = 0; i < bars; i++) {
    const v = (Math.sin(Date.now()*0.005 + i*0.3) + 1) * 0.4 + Math.random()*0.2;
    const h = Math.max(2, v * canvas.height);
    cctx.fillStyle = '#fff';
    cctx.fillRect(i*w + w*0.15, canvas.height - h, w*0.7, h);
  }
  if (curIdx >= 0) {
    const cardBars = trackCards[curIdx].querySelectorAll('.tc-wave .b');
    cardBars.forEach((b, j) => {
      const v = (Math.sin(Date.now()*0.006 + j*0.4) + 1) * 0.4 + Math.random()*0.2;
      b.style.height = Math.max(8, v * 100) + '%';
    });
  }
  raf = requestAnimationFrame(fakeWaveAnim);
}

/* ─── lyrics modal ─── */
const lyricsModal = document.getElementById('lyrics-modal');
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-letras]');
  if (!btn) return;
  e.stopPropagation();
  const i = +btn.dataset.letras;
  const t = TRACKS[i];
  document.getElementById('lm-num').textContent = t.num;
  document.getElementById('lm-title').textContent = t.name;
  document.getElementById('lm-mood').textContent = t.mood;
  document.getElementById('lm-body').innerHTML = (window.LYRICS && window.LYRICS[t.name]) || '<em>Letra próximamente.</em>';
  lyricsModal.classList.add('on');
  document.body.style.overflow = 'hidden';
});
document.getElementById('lm-close').addEventListener('click', () => {
  lyricsModal.classList.remove('on');
  document.body.style.overflow = '';
});
lyricsModal.addEventListener('click', (e) => {
  if (e.target === lyricsModal) {
    lyricsModal.classList.remove('on');
    document.body.style.overflow = '';
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    lyricsModal.classList.remove('on');
    document.getElementById('egg-modal').classList.remove('on');
    document.body.style.overflow = '';
  }
});

/* ─── scroll reveals (IntersectionObserver) ─── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      if (e.target.hasAttribute('data-once')) io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => { el.setAttribute('data-once',''); io.observe(el); });

/* ─── parallax band photo ─── */



/* ─── cursor / touch trail ─── */
let trailLast = 0;
function spawnDot(x, y){
  const now = performance.now();
  if (now - trailLast < 26) return;
  trailLast = now;
  const dot = document.createElement('div');
  dot.className = 'trail-dot';
  dot.style.left = x + 'px';
  dot.style.top = y + 'px';
  document.body.appendChild(dot);
  setTimeout(() => dot.remove(), 800);
}
window.addEventListener('mousemove', e => spawnDot(e.clientX, e.clientY), { passive: true });
window.addEventListener('touchmove', e => {
  const t = e.touches[0]; if (t) spawnDot(t.clientX, t.clientY);
}, { passive: true });

/* ─── easter egg: tap logo 5x or konami arrows ─── */
let logoTaps = 0, logoTapsTimer = null;
const eggModal = document.getElementById('egg-modal');
function openEgg(){ eggModal.classList.add('on'); }
function closeEgg(){ eggModal.classList.remove('on'); }
window.closeEgg = closeEgg;

document.querySelectorAll('.hero-wkty, .footer-wkty, .footer-egg, [data-egg-trigger]').forEach(el => {
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => {
    logoTaps++;
    clearTimeout(logoTapsTimer);
    logoTapsTimer = setTimeout(() => logoTaps = 0, 1400);
    if (logoTaps >= 5) { logoTaps = 0; openEgg(); }
  });
});

/* konami */
const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
document.addEventListener('keydown', (e) => {
  if (e.key === konami[konamiIdx]) {
    konamiIdx++;
    if (konamiIdx === konami.length) { openEgg(); konamiIdx = 0; }
  } else { konamiIdx = (e.key === konami[0]) ? 1 : 0; }
});

/* ─── space toggles play ─── */
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !e.target.closest('input, textarea, button')) {
    e.preventDefault(); toggle();
  }
  if (e.key === 'ArrowRight' && !e.target.closest('input, textarea')) {
    if (curIdx >= 0) next();
  }
  if (e.key === 'ArrowLeft' && !e.target.closest('input, textarea')) {
    if (curIdx >= 0) prev();
  }
});

/* ─── viewport vh fix for mobile ─── */
function setVH(){ document.documentElement.style.setProperty('--vh', (innerHeight*0.01) + 'px'); }
setVH(); window.addEventListener('resize', setVH);
