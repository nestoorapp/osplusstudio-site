// Nestor · Odysseia: uygulamadaki 90 günlük yolculuğun izometrik, döngülü oyun sahnesi.
// Gemi Kalypso'nun adasından İthaka'ya yol alır; her gün 10 drahmi, her ada bir mühür, rütbeler günle gelir.
const asset = (p) => new URL(`assets/nestor/${p}`, import.meta.url).href;

const N = 12;               // deniz N x N kare
const DEPTH = 1.3;          // platform kalınlığı
const SAIL_SECONDS = 26;
const PAUSE = 2.0, FINALE = 4.2, FADE = 0.9;
const DRACHMA_PER_DAY = 10, START_DRACHMA = 40;
const SEA_CENTER = [6, 6];

// Uygulamanın paleti: Homeros'un renk sıfatları (src/theme)
const C = {
  wine: "#2A1424", crest: "#3B1E35", foam: "#5A3452", marble: "#F4E8E4", worn: "#BFA6B6",
  saffron: "#E5A93A", saffronDeep: "#B9821F", athena: "#8DB8A9", ember: "#E0705A", sand: "#E9BC6D",
};

// Sahnenin metinleri, ana sayfada seçilen dile göre (i18n.js). İngilizce ada ve rütbe adları uygulamanın kendi çevirisinden.
const TX = {
  tr: {
    ranks: ["Kazazede", "Tayfa", "Kürekçi", "Dümenci", "Rotacı", "Kaptan", "Evinin efendisi"],
    isles: [
      ["Kalypso'nun adası", "Rahat ama tutsak. Yolculuk burada başlar."],
      ["Kyklops'un mağarası", "Gururla değil, akıl ve cesaretle karşılanır."],
      ["Aiolos'un rüzgârları", "Rüzgârların peşinden koşma; onları yönetmeyi öğren."],
      ["Nausikaa'nın kıyısı", "Kıyıya elinde hiçbir şey olmadan çıktın. Yardımı onurunla iste."],
      ["İthaka", "Evdesin. Hayatının dümeni sende."],
    ],
    locale: "tr-TR", brand: "Nestor · Odysseia", reward: "+10 drahmi", trial: "Ada sınavı", tapSea: "Denize dokun", wave: "Dalga", everyDay: "Her gün", perDay: "10 drahmi",
    start: "Gün 1 · Yolculuk başlıyor", dayRank: (d, r) => `Gün ${d} · Rütbe: ${r}`, lesson: (d) => `Gün ${d} dersi`, lessonSub: (d) => `Gün ${d} / 90 · yaklaşık 15 dakika`,
    drachma: (n) => `${n} drahmi`, seals: (n) => `Mühür ×${n}`, done: "Yolculuk tamamlandı", nextSub: (d) => `Sonraki ada · Gün ${d}`, home: "Evdesin",
  },
  en: {
    ranks: ["Castaway", "Deckhand", "Oarsman", "Helmsman", "Navigator", "Captain", "Master of your house"],
    isles: [
      ["Calypso's Island", "Comfortable, but captive. Here the voyage begins."],
      ["The Cyclops' Cave", "A hard trial, met with wit and nerve, not pride."],
      ["Aeolus' Winds", "Learn to master the winds, not to chase them."],
      ["Nausicaa's Shore", "Washed ashore with nothing. Ask for help, and keep your dignity."],
      ["Ithaca", "You are home. Your life is yours to steer."],
    ],
    locale: "en-US", brand: "Nestor · Odyssey", reward: "+10 drachmas", trial: "Island trial", tapSea: "Tap the sea", wave: "Wave", everyDay: "Every day", perDay: "10 drachmas",
    start: "Day 1 · The voyage begins", dayRank: (d, r) => `Day ${d} · Rank: ${r}`, lesson: (d) => `Day ${d} lesson`, lessonSub: (d) => `Day ${d} / 90 · about 15 minutes`,
    drachma: (n) => `${n} drachmas`, seals: (n) => `Seals ×${n}`, done: "Voyage complete", nextSub: (d) => `Next island · Day ${d}`, home: "You are home",
  },
  de: {
    ranks: ["Schiffbrüchiger", "Matrose", "Ruderer", "Steuermann", "Navigator", "Kapitän", "Herr im eigenen Haus"],
    isles: [
      ["Kalypsos Insel", "Bequem, aber gefangen. Hier beginnt die Reise."],
      ["Die Höhle des Kyklopen", "Eine harte Prüfung, mit Verstand und Mut bestanden, nicht mit Stolz."],
      ["Die Winde des Aiolos", "Lerne, die Winde zu lenken, statt ihnen nachzujagen."],
      ["Nausikaas Küste", "Mit leeren Händen an Land gespült. Bitte um Hilfe und bewahre deine Würde."],
      ["Ithaka", "Du bist zu Hause. Dein Leben steuerst du selbst."],
    ],
    locale: "de-DE", brand: "Nestor · Odyssee", reward: "+10 Drachmen", trial: "Inselprüfung", tapSea: "Aufs Meer tippen", wave: "Welle", everyDay: "Jeden Tag", perDay: "10 Drachmen",
    start: "Tag 1 · Die Reise beginnt", dayRank: (d, r) => `Tag ${d} · Rang: ${r}`, lesson: (d) => `Lektion, Tag ${d}`, lessonSub: (d) => `Tag ${d} / 90 · etwa 15 Minuten`,
    drachma: (n) => `${n} Drachmen`, seals: (n) => `Siegel ×${n}`, done: "Reise abgeschlossen", nextSub: (d) => `Nächste Insel · Tag ${d}`, home: "Du bist zu Hause",
  },
  es: {
    ranks: ["Náufrago", "Marinero", "Remero", "Timonel", "Navegante", "Capitán", "Dueño de tu casa"],
    isles: [
      ["La isla de Calipso", "Cómoda, pero cautiva. Aquí empieza la travesía."],
      ["La cueva del cíclope", "Una prueba dura, que se afronta con ingenio y valor, no con orgullo."],
      ["Los vientos de Eolo", "Aprende a dominar los vientos, no a perseguirlos."],
      ["La playa de Nausícaa", "Llegaste a la orilla sin nada. Pide ayuda con dignidad."],
      ["Ítaca", "Estás en casa. El timón de tu vida es tuyo."],
    ],
    locale: "es-ES", brand: "Nestor · Odisea", reward: "+10 dracmas", trial: "Prueba de isla", tapSea: "Toca el mar", wave: "Ola", everyDay: "Cada día", perDay: "10 dracmas",
    start: "Día 1 · Empieza la travesía", dayRank: (d, r) => `Día ${d} · Rango: ${r}`, lesson: (d) => `Lección del día ${d}`, lessonSub: (d) => `Día ${d} / 90 · unos 15 minutos`,
    drachma: (n) => `${n} dracmas`, seals: (n) => `Sellos ×${n}`, done: "Travesía completada", nextSub: (d) => `Próxima isla · Día ${d}`, home: "Estás en casa",
  },
  pt: {
    ranks: ["Náufrago", "Marujo", "Remador", "Timoneiro", "Navegador", "Capitão", "Dono da sua casa"],
    isles: [
      ["Ilha de Calipso", "Confortável, mas cativo. Aqui começa a viagem."],
      ["A caverna do Ciclope", "Uma prova dura, enfrentada com astúcia e coragem, não com orgulho."],
      ["Os ventos de Éolo", "Aprenda a dominar os ventos, não a persegui-los."],
      ["A praia de Nausícaa", "Você chegou à praia sem nada. Peça ajuda com dignidade."],
      ["Ítaca", "Você está em casa. O leme da sua vida é seu."],
    ],
    locale: "pt-BR", brand: "Nestor · Odisseia", reward: "+10 dracmas", trial: "Prova da ilha", tapSea: "Toque no mar", wave: "Onda", everyDay: "Todo dia", perDay: "10 dracmas",
    start: "Dia 1 · A viagem começa", dayRank: (d, r) => `Dia ${d} · Patente: ${r}`, lesson: (d) => `Lição do dia ${d}`, lessonSub: (d) => `Dia ${d} / 90 · cerca de 15 minutos`,
    drachma: (n) => `${n} dracmas`, seals: (n) => `Selos ×${n}`, done: "Viagem concluída", nextSub: (d) => `Próxima ilha · Dia ${d}`, home: "Você está em casa",
  },
};
// paketli dillerde (lang/<kod>.js) tablo paketten gelir, eksik alanlar İngilizceden tamamlanır
const PK = globalThis.OS_PACK && globalThis.OS_PACK.games && globalThis.OS_PACK.games.nestor;
const T = TX[globalThis.OS_LANG] || (globalThis.OS_LANG && globalThis.OS_LANG !== "tr" ? Object.assign({}, TX.en, PK || {}) : TX.tr);

// Rütbeler ve eşik günleri (src/lib/seals.ts)
const RANKS = [0, 7, 21, 35, 56, 77, 90].map((t, i) => [t, T.ranks[i]]);
const rankAt = (d) => RANKS.filter(([t]) => d >= t).pop()[1];

// Duraklar: uygulamadaki adalardan beşi (src/content/courses/odyssey/voyage.ts)
const ISLES = [
  { id: "ogygia", day: 0, x: 6.4, y: 10.3, r: 1.6, seed: 1 },
  { id: "cyclops", day: 14, x: 10.1, y: 5.3, r: 1.5, seed: 2 },
  { id: "aeolus", day: 28, x: 2.9, y: 7.7, r: 1.35, seed: 3 },
  { id: "scheria", day: 70, x: 6.6, y: 2.1, r: 1.4, seed: 4 },
  { id: "ithaca", day: 90, x: 1.9, y: 2.0, r: 1.6, seed: 5 },
].map((s, i) => ({ ...s, name: T.isles[i][0], meaning: T.isles[i][1] }));

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const seeded = (n) => { const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const smooth = (t) => t * t * (3 - 2 * t);
const fmt = (n) => Math.floor(n).toLocaleString(T.locale);

/* SVG'yi canvas'ta güvenle çizmek için boyut verilir */
async function loadSvg(src) {
  const text = (await fetch(src).then((r) => r.text())).replace("<svg ", '<svg width="200" height="200" ');
  const url = URL.createObjectURL(new Blob([text], { type: "image/svg+xml" }));
  return new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = url; });
}

/* Rota: Catmull-Rom eğrisi, yay uzunluğuyla örneklenir; her durağın yoldaki yeri de verilir */
function buildRoute(pts) {
  const STEPS = 40, out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    for (let s = 0; s < STEPS; s++) {
      const t = s / STEPS, t2 = t * t, t3 = t2 * t;
      out.push([0, 1].map((k) => 0.5 * (2 * p1[k] + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3)));
    }
  }
  out.push(pts[pts.length - 1]);
  const len = [0];
  for (let i = 1; i < out.length; i++) len.push(len[i - 1] + Math.hypot(out[i][0] - out[i - 1][0], out[i][1] - out[i - 1][1]));
  const total = len[len.length - 1];
  const at = (f) => {
    const d = clamp(f, 0, 1) * total;
    let lo = 0, hi = len.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (len[m] < d) lo = m; else hi = m; }
    const a = out[lo], b = out[hi], seg = len[hi] - len[lo] || 1, k = (d - len[lo]) / seg;
    return { x: a[0] + (b[0] - a[0]) * k, y: a[1] + (b[1] - a[1]) * k, dx: (b[0] - a[0]) / seg, dy: (b[1] - a[1]) / seg, i: hi };
  };
  const knots = pts.map((_, i) => len[i * STEPS] / total);
  return { pts: out, total, at, knots };
}

function buildHud(root) {
  const hud = document.createElement("div");
  hud.className = "hud";
  hud.setAttribute("aria-hidden", "true");
  const beads = Array.from({ length: 7 }, (_, i) => {
    const a = ((-90 + ((i + 1) * 360) / 8) * Math.PI) / 180;
    return `<circle cx="${(50 + 40 * Math.cos(a)).toFixed(2)}" cy="${(50 + 40 * Math.sin(a)).toFixed(2)}" r="7"/>`;
  }).join("");
  hud.innerHTML = `
    <div class="g-top">
      <div class="g-card g-quest">
        <span class="ic"><svg viewBox="0 0 40 40" width="62%"><path d="M9 10h17a5 5 0 0 1 5 5v15H14a5 5 0 0 1-5-5z" fill="${C.marble}"/><path d="M13 17h13M13 22h13M13 27h8" stroke="${C.foam}" stroke-width="2" stroke-linecap="round"/></svg></span>
        <span><b data-k="lesson"></b><small data-k="lessonsub"></small><div class="g-bar"><i data-k="lessonbar"></i></div></span>
        <span class="tag">${T.reward}</span>
      </div>
      <div class="g-card g-quest">
        <span class="ic"><svg viewBox="0 0 40 40" width="70%"><path d="M5 27q15-9 30 0q-15 7-30 0z" fill="${C.sand}"/><path d="M11 25q9-14 18 0z" fill="${C.athena}"/><path d="M4 31q4-2 8 0t8 0t8 0t8 0" stroke="${C.worn}" stroke-width="1.6" fill="none"/></svg></span>
        <span><b data-k="nextname"></b><small data-k="nextsub"></small><div class="g-bar"><i data-k="legbar"></i></div></span>
        <span class="tag">${T.trial}</span>
      </div>
    </div>
    <div class="g-right">
      <span class="g-brand">${T.brand}</span>
      <div class="g-ring"><svg viewBox="0 0 100 100">${beads}</svg><b data-k="streak"></b></div>
      <span class="g-pill"><i class="dot"></i><span data-k="drachma"></span></span>
      <span class="g-pill"><i class="dot seal"></i><span data-k="seals"></span></span>
      <span class="g-pill hot" data-k="rank"></span>
    </div>
    <div class="g-card g-player">
      <span class="av"><img src="${asset("argos-happy.svg")}" alt=""></span>
      <span><b>Argos</b><br><span class="chip" data-k="isle"></span><small data-k="meaning"></small></span>
    </div>
    <div class="g-keys">
      <span class="g-key">${T.tapSea} <kbd>${T.wave}</kbd></span>
      <span class="g-key">${T.everyDay} <kbd>${T.perDay}</kbd></span>
    </div>
    <div class="g-toast"><small data-k="tkicker"></small><b data-k="tname"></b><span data-k="ttext"></span></div>`;
  root.appendChild(hud);
  const k = {};
  hud.querySelectorAll("[data-k]").forEach((el) => (k[el.dataset.k] = el));
  k.beads = [...hud.querySelectorAll(".g-ring circle")];
  k.toast = hud.querySelector(".g-toast");
  return k;
}

export async function mountNestorGame(root) {
  const canvas = document.createElement("canvas");
  root.prepend(canvas);
  const ctx = canvas.getContext("2d");
  const ui = buildHud(root);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const argos = { happy: await loadSvg(asset("argos-happy.svg")), wag: await loadSvg(asset("argos-happy-wag.svg")), cheer: await loadSvg(asset("argos-cheer.svg")) };

  /* Her ada için iskele: adadan denizin ortasına doğru; rota iskeleleri birleştirir */
  const isles = ISLES.map((s) => {
    const vx = SEA_CENTER[0] - s.x, vy = SEA_CENTER[1] - s.y, d = Math.hypot(vx, vy) || 1;
    return { ...s, dock: [s.x + (vx / d) * (s.r + 0.75), s.y + (vy / d) * (s.r + 0.75)], nx: vx / d, ny: vy / d };
  });
  const route = buildRoute(isles.map((s) => s.dock));
  isles.forEach((s, i) => (s.at = route.knots[i]));
  const routePath = new Path2D();
  route.pts.forEach(([x, y], i) => (i ? routePath.lineTo(x, y) : routePath.moveTo(x, y)));

  /* Ada kıyısı: düzensiz bir daire */
  const shore = (s, scale) => {
    const p = new Path2D();
    for (let i = 0; i <= 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      const rr = s.r * scale * (1 + 0.1 * Math.sin(3 * a + s.seed * 2) + 0.06 * Math.sin(5 * a + s.seed * 5));
      const x = s.x + Math.cos(a) * rr, y = s.y + Math.sin(a) * rr;
      i ? p.lineTo(x, y) : p.moveTo(x, y);
    }
    p.closePath();
    return p;
  };
  isles.forEach((s) => { s.shallow = shore(s, 1.32); s.sand = shore(s, 1); s.land = shore(s, 0.74); });

  /* Küçük kayalıklar ve dalga parıltıları: rotadan ve adalardan uzak */
  const routeGap = (x, y) => Math.min(...route.pts.map(([rx, ry]) => Math.hypot(rx - x, ry - y)));
  const freeSea = (x, y, gap) => routeGap(x, y) > gap && isles.every((s) => Math.hypot(s.x - x, s.y - y) > s.r * 1.35 + gap * 0.5);
  const rocks = [];
  for (let i = 0, n = 0; n < 5 && i < 300; i++) {
    const x = 0.8 + seeded(i * 2 + 40) * (N - 1.6), y = 0.8 + seeded(i * 2 + 41) * (N - 1.6);
    if (freeSea(x, y, 1.2) && rocks.every((r) => Math.hypot(r.x - x, r.y - y) > 1.5)) { rocks.push({ x, y, s: 0.25 + seeded(i) * 0.2 }); n++; }
  }
  const glints = Array.from({ length: 80 }, (_, i) => ({ x: 0.4 + seeded(i + 100) * (N - 0.8), y: 0.4 + seeded(i + 300) * (N - 0.8), ph: seeded(i + 500) * 6.28 }))
    .filter((g) => isles.every((s) => Math.hypot(s.x - g.x, s.y - g.y) > s.r * 1.2));
  const stars = Array.from({ length: 60 }, (_, i) => ({ x: seeded(i + 700), y: seeded(i + 800) * 0.55, r: 0.6 + seeded(i + 900) * 1.1, ph: seeded(i + 950) * 6.28 }));

  /* Zaman çizelgesi */
  const plan = [{ k: "fadein", d: FADE, from: 0, to: 0 }];
  isles.forEach((s, i) => {
    if (i > 0) plan.push({ k: "sail", d: SAIL_SECONDS * (s.at - isles[i - 1].at), from: isles[i - 1].at, to: s.at });
    const last = i === isles.length - 1;
    plan.push({ k: last ? "finale" : "pause", d: last ? FINALE : PAUSE, from: s.at, to: s.at, stop: i });
  });
  plan.push({ k: "fadeout", d: FADE, from: 1, to: 1 });
  const loopLen = plan.reduce((a, s) => a + s.d, 0);
  const dayAt = (p) => {
    for (let i = 1; i < isles.length; i++) {
      const a = isles[i - 1], b = isles[i];
      if (p <= b.at) return a.day + ((b.day - a.day) * (p - a.at)) / (b.at - a.at || 1);
    }
    return isles[isles.length - 1].day;
  };

  let W = 0, H = 0, dpr = 1, hw = 10, ox0 = 0, oy0 = 0, camX = 0, camY = 0;
  const P = (x, y, z = 0) => [ox0 + camX + (x - y) * hw, oy0 + camY + ((x + y) * hw) / 2 - z * hw];

  function layout() {
    const r = root.getBoundingClientRect();
    W = r.width; H = r.height; dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    const above = 2.6;
    hw = Math.min((W * 0.86) / (2 * N), (H * 0.84) / (N + DEPTH + above));
    ox0 = W / 2;
    oy0 = (H - (N + DEPTH + above) * hw) / 2 + above * hw + H * 0.03;
  }

  const st = { seg: -1, stop: 0, p: 0, day: 0, sailing: false, toastUntil: 0, floats: [], ripples: [], wake: [], wakeT: 0, confetti: [], heading: 1 };
  function reset() { st.floats = []; st.ripples = []; st.wake = []; st.confetti = []; st.stop = 0; st.day = 0; }

  function toast(s, now) {
    const first = s === isles[0];
    ui.tkicker.textContent = first ? T.start : T.dayRank(s.day, rankAt(s.day));
    ui.tname.textContent = s.name;
    ui.ttext.textContent = s.meaning;
    ui.toast.classList.add("show");
    st.toastUntil = now + (s === isles[isles.length - 1] ? FINALE - 0.6 : PAUSE + 0.3);
  }

  /* --- çizim yardımcıları --- */
  const screen = () => ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const world = (lift = 0) => ctx.setTransform(dpr * hw, (dpr * hw) / 2, -dpr * hw, (dpr * hw) / 2, dpr * (ox0 + camX), dpr * (oy0 + camY - lift * hw));
  const poly = (pts, fill) => { ctx.fillStyle = fill; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fill(); };

  /* İzometrik kutu: (cx, cy) merkezli, w x d taban, z yükseklikten h kadar */
  function box(cx, cy, w, d, z, h, top, left, right) {
    const x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - d / 2, y1 = cy + d / 2;
    poly([P(x0, y1, z), P(x1, y1, z), P(x1, y1, z + h), P(x0, y1, z + h)], left);
    poly([P(x1, y0, z), P(x1, y1, z), P(x1, y1, z + h), P(x1, y0, z + h)], right);
    poly([P(x0, y0, z + h), P(x1, y0, z + h), P(x1, y1, z + h), P(x0, y1, z + h)], top);
  }

  function cypress(x, y, h) {
    const [sx, sy] = P(x, y, 0.22);
    ctx.fillStyle = "#5B3A2A"; ctx.fillRect(sx - hw * 0.04, sy - hw * 0.18, hw * 0.08, hw * 0.18);
    ctx.fillStyle = "#2E5446";
    ctx.beginPath(); ctx.ellipse(sx, sy - hw * (0.18 + h / 2), hw * 0.17, hw * h / 2, 0, 0, 7); ctx.fill();
    ctx.fillStyle = "#4C7A63";
    ctx.beginPath(); ctx.ellipse(sx - hw * 0.05, sy - hw * (0.24 + h / 2), hw * 0.07, hw * h * 0.36, 0, 0, 7); ctx.fill();
  }

  function olive(x, y, now) {
    const [sx, sy] = P(x, y, 0.22);
    const sway = Math.sin(now * 1.4 + x) * hw * 0.02;
    ctx.fillStyle = "#6B4A35"; ctx.fillRect(sx - hw * 0.04, sy - hw * 0.32, hw * 0.08, hw * 0.32);
    for (const [dx, dy, r, c] of [[0, -0.5, 0.3, "#6E9C8A"], [-0.18, -0.4, 0.2, "#6E9C8A"], [0.2, -0.42, 0.21, "#6E9C8A"], [-0.07, -0.58, 0.16, C.athena]]) {
      ctx.fillStyle = c; ctx.beginPath(); ctx.arc(sx + dx * hw + sway, sy + dy * hw, r * hw, 0, 7); ctx.fill();
    }
  }

  function drawFeatures(s, now, finale) {
    const z = 0.22;
    if (s.id === "ogygia") {
      cypress(s.x - 0.5, s.y - 0.4, 0.95); cypress(s.x - 0.05, s.y - 0.75, 1.15); olive(s.x + 0.45, s.y + 0.1, now);
      const [fx, fy] = P(s.x + 0.15, s.y + 0.55, z);
      ctx.strokeStyle = C.marble; ctx.lineWidth = Math.max(1, hw * 0.05);
      ctx.beginPath(); ctx.moveTo(fx, fy); ctx.lineTo(fx, fy - hw * 0.8); ctx.stroke();
      ctx.fillStyle = C.saffron;
      const wave = Math.sin(now * 5) * hw * 0.05;
      ctx.beginPath(); ctx.moveTo(fx, fy - hw * 0.8); ctx.lineTo(fx + hw * 0.42, fy - hw * 0.7 + wave); ctx.lineTo(fx, fy - hw * 0.58); ctx.fill();
    } else if (s.id === "cyclops") {
      const [mx, my] = P(s.x - 0.1, s.y - 0.1, z);
      poly([[mx - hw * 1.0, my + hw * 0.1], [mx - hw * 0.15, my - hw * 1.45], [mx + hw * 0.25, my - hw * 1.2], [mx + hw * 0.95, my + hw * 0.15]], "#7D6C78");
      poly([[mx - hw * 1.0, my + hw * 0.1], [mx - hw * 0.15, my - hw * 1.45], [mx - hw * 0.05, my + hw * 0.25]], "#988896");
      ctx.fillStyle = "#1C1219";
      ctx.beginPath(); ctx.ellipse(mx + hw * 0.2, my - hw * 0.05, hw * 0.32, hw * 0.36, 0, Math.PI, 0); ctx.fill();
      const blink = (now % 4) < 0.15 ? 0.15 : 1;
      ctx.fillStyle = C.ember; ctx.beginPath(); ctx.ellipse(mx + hw * 0.2, my - hw * 0.2, hw * 0.07, hw * 0.07 * blink, 0, 0, 7); ctx.fill();
      ctx.fillStyle = "#6A5B66"; ctx.beginPath(); ctx.arc(mx + hw * 0.75, my + hw * 0.05, hw * 0.24, 0, 7); ctx.fill();
    } else if (s.id === "aeolus") {
      box(s.x, s.y, 0.62, 0.62, z, 1.25, "#C9965A", "#A9783E", "#7E5A2E");
      box(s.x, s.y, 0.78, 0.78, z + 1.25, 0.12, "#D9AA6C", "#A9783E", "#7E5A2E");
      const [tx, ty] = P(s.x, s.y, z + 1.6);
      ctx.strokeStyle = "rgba(244,232,228,.7)"; ctx.lineWidth = Math.max(1.2, hw * 0.06); ctx.lineCap = "round";
      for (let i = 0; i < 3; i++) {
        const a0 = now * 2.2 + i * 2.1;
        ctx.beginPath(); ctx.ellipse(tx, ty - hw * 0.1 * i, hw * (0.55 + i * 0.18), hw * (0.2 + i * 0.06), 0, a0, a0 + 2.2); ctx.stroke();
      }
      olive(s.x + 0.55, s.y + 0.35, now);
    } else if (s.id === "scheria") {
      box(s.x - 0.1, s.y - 0.15, 0.9, 0.7, z, 0.55, C.marble, "#D9C9C4", "#BFA6B6");
      box(s.x - 0.1, s.y - 0.15, 1.0, 0.8, z + 0.55, 0.14, "#C9584A", "#B4473A", "#8E3529");
      olive(s.x + 0.6, s.y + 0.35, now); olive(s.x - 0.65, s.y + 0.45, now);
    } else if (s.id === "ithaca") {
      const cx = s.x - 0.15, cy = s.y - 0.15;
      if (finale > 0) {
        const [gx, gy] = P(cx, cy, 1);
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, hw * 3.2);
        g.addColorStop(0, `rgba(229,169,58,${0.55 * finale})`); g.addColorStop(1, "rgba(229,169,58,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(gx, gy, hw * 3.2, 0, 7); ctx.fill();
      }
      box(cx, cy, 1.5, 1.1, z, 0.14, "#FFF6F2", "#D9C9C4", "#BFA6B6");
      const cols = [];
      for (const ix of [-0.6, -0.2, 0.2, 0.6]) for (const iy of [-0.4, 0.4]) cols.push([cx + ix, cy + iy]);
      cols.sort((a, b) => a[0] + a[1] - (b[0] + b[1])).forEach(([x, y]) => box(x, y, 0.13, 0.13, z + 0.14, 0.72, C.marble, "#E8DAD5", "#BFA6B6"));
      box(cx, cy, 1.6, 1.2, z + 0.86, 0.14, "#FFF6F2", "#D9C9C4", "#BFA6B6");
      box(cx, cy, 1.2, 0.8, z + 1.0, 0.12, C.saffron, C.saffronDeep, "#8E6418");
      cypress(s.x + 0.75, s.y - 0.55, 0.9);
    }
  }

  /* Uygulamadaki kadırga (src/components/Ship.tsx): baykuş amblemli safran yelken */
  const SHIP = {
    hull: new Path2D("M -15 2 L 13 2 Q 15 2 17 -3 L 15 6 Q 9 9 -10 9 Q -14 8 -16 4 Z"),
    sail: new Path2D("M -9 -15 L 7 -15 Q 9 -8 7 -1 L -9 -1 Q -7 -8 -9 -15 Z"),
    flag: new Path2D("M -1 -17 L 7 -15.5 L -1 -13.5 Z"),
    owlBrows: new Path2D("M -5 -12 L -3.4 -10.3 M 3 -12 L 1.4 -10.3"),
    beak: new Path2D("M -1.6 -6.4 L -1 -5 L -0.4 -6.4 Z"),
  };
  function drawShip(sx, sy, now) {
    const u = (hw * 2.1) / 33;
    ctx.save();
    ctx.translate(sx, sy + Math.sin(now * 2.6) * hw * 0.05);
    ctx.rotate(Math.sin(now * 2) * 0.05);
    ctx.scale(st.heading * u, u);
    ctx.translate(0, -6);
    ctx.strokeStyle = C.worn; ctx.lineWidth = 0.9; ctx.lineCap = "round";
    const row = st.sailing ? Math.sin(now * 7) * 0.5 : 0;
    for (let i = 0; i < 5; i++) { const x = -10 + i * 5; ctx.beginPath(); ctx.moveTo(x, 6); ctx.lineTo(x - 3 - row * 2, 12); ctx.stroke(); }
    ctx.fillStyle = C.athena; ctx.fill(SHIP.flag);
    ctx.fillStyle = C.marble; ctx.fill(SHIP.hull);
    ctx.fillStyle = C.ember; ctx.fillRect(-14, 4.2, 28, 1.2);
    ctx.strokeStyle = C.marble; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(-1, 2); ctx.lineTo(-1, -17); ctx.stroke();
    ctx.save();
    ctx.translate(-1, -8); ctx.scale(1 + (st.sailing ? 0.06 : 0) * Math.sin(now * 3), 1); ctx.translate(1, 8);
    ctx.fillStyle = C.saffron; ctx.fill(SHIP.sail);
    ctx.strokeStyle = C.wine; ctx.fillStyle = C.wine; ctx.lineWidth = 0.9;
    ctx.stroke(SHIP.owlBrows);
    for (const cx of [-2.8, 0.8]) { ctx.beginPath(); ctx.arc(cx, -8.4, 1.7, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(cx, -8.4, 0.6, 0, 7); ctx.fill(); }
    ctx.fill(SHIP.beak);
    ctx.restore();
    ctx.restore();
  }

  function drawPlatform(now) {
    const L = P(0, N), B = P(N, N), R = P(N, 0), d = DEPTH * hw;
    screen();
    const face = (a, b, c1, c2) => {
      const gr = ctx.createLinearGradient(0, Math.min(a[1], b[1]), 0, Math.max(a[1], b[1]) + d);
      gr.addColorStop(0, c1); gr.addColorStop(1, c2);
      poly([a, b, [b[0], b[1] + d], [a[0], a[1] + d]], gr);
      ctx.strokeStyle = "rgba(244,232,228,.08)"; ctx.lineWidth = Math.max(1, hw * 0.04);
      for (const f of [0.3, 0.55, 0.8]) {
        ctx.beginPath();
        for (let i = 0; i <= 20; i++) {
          const t = i / 20, x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t + d * f + Math.sin(t * 18 + now * 1.5 + f * 4) * hw * 0.04;
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.stroke();
      }
    };
    face(L, B, "#6A3D60", "#2A1424");
    face(B, R, "#552F4C", "#1C1219");

    world();
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, N, N); ctx.clip();
    const sea = ctx.createLinearGradient(0, 0, N, N);
    sea.addColorStop(0, "#5E3457"); sea.addColorStop(1, "#7A4470");
    ctx.fillStyle = sea; ctx.fillRect(0, 0, N, N);
    // şafak ışığı İthaka tarafından gelir
    const dawn = ctx.createRadialGradient(1, 1, 0, 1, 1, N * 0.9);
    dawn.addColorStop(0, `rgba(229,169,58,${0.18 + st.p * 0.22})`); dawn.addColorStop(1, "rgba(229,169,58,0)");
    ctx.fillStyle = dawn; ctx.fillRect(0, 0, N, N);
    // sığ sular
    for (const s of isles) { ctx.fillStyle = "rgba(141,184,169,.22)"; ctx.fill(s.shallow); }
    // rota: kesik çizgi, gidilen kısım dolu
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.setLineDash([0.22, 0.24]); ctx.strokeStyle = "rgba(229,169,58,.55)"; ctx.lineWidth = 0.09; ctx.stroke(routePath); ctx.setLineDash([]);
    const done = route.at(st.p).i;
    if (done > 1) {
      const lit = new Path2D();
      route.pts.slice(0, done + 1).forEach(([x, y], i) => (i ? lit.lineTo(x, y) : lit.moveTo(x, y)));
      ctx.strokeStyle = "rgba(229,169,58,.95)"; ctx.lineWidth = 0.11; ctx.stroke(lit);
    }
    // dümen suyu ve dokunma dalgaları
    for (const w of st.wake) {
      const k = (now - w.t) / 1.6;
      ctx.strokeStyle = `rgba(244,232,228,${0.35 * (1 - k)})`; ctx.lineWidth = 0.05;
      ctx.beginPath(); ctx.ellipse(w.x, w.y, 0.15 + k * 0.5, 0.15 + k * 0.5, 0, 0, 7); ctx.stroke();
    }
    for (const r of st.ripples) {
      const k = (now - r.t) / 1.4;
      for (const off of [0, 0.25]) {
        const kk = clamp(k - off, 0, 1);
        if (kk <= 0) continue;
        ctx.strokeStyle = `rgba(244,232,228,${0.6 * (1 - kk)})`; ctx.lineWidth = 0.06;
        ctx.beginPath(); ctx.ellipse(r.x, r.y, 0.1 + kk * 1.3, 0.1 + kk * 1.3, 0, 0, 7); ctx.stroke();
      }
    }
    ctx.restore();

    // adalar: yar, kumsal, yükseltilmiş kara
    for (const s of isles) {
      world(-0.28); ctx.fillStyle = "#8E6638"; ctx.fill(s.sand);
      world(0); ctx.fillStyle = C.sand; ctx.fill(s.sand);
      world(0.2); ctx.fillStyle = "#5E8A6E"; ctx.fill(s.land);
      world(0.22); ctx.fillStyle = "#79A585"; ctx.fill(s.land);
    }
    for (const r of rocks) {
      world(0); ctx.fillStyle = "#4A2C44"; ctx.beginPath(); ctx.ellipse(r.x + 0.05, r.y + 0.05, r.s, r.s, 0, 0, 7); ctx.fill();
      screen(); const [rx, ry] = P(r.x, r.y);
      poly([[rx - hw * r.s * 1.1, ry], [rx - hw * r.s * 0.3, ry - hw * r.s * 1.3], [rx + hw * r.s * 0.6, ry - hw * r.s * 0.8], [rx + hw * r.s * 1.1, ry]], "#8A7884");
    }

    // dalga parıltıları
    screen();
    ctx.lineCap = "round"; ctx.lineWidth = Math.max(1, hw * 0.05);
    for (const g of glints) {
      const a = Math.max(0, Math.sin(now * 1.3 + g.ph));
      if (a < 0.05) continue;
      const [gx, gy] = P(g.x + Math.sin(now * 0.3 + g.ph) * 0.15, g.y);
      ctx.strokeStyle = `rgba(244,232,228,${0.35 * a})`;
      ctx.beginPath(); ctx.arc(gx, gy - hw * 0.12, hw * 0.16, Math.PI * 0.2, Math.PI * 0.8); ctx.stroke();
    }
  }

  function drawSky(now) {
    screen();
    for (const s of stars) {
      ctx.fillStyle = `rgba(244,232,228,${0.25 + 0.35 * (0.5 + 0.5 * Math.sin(now * 1.7 + s.ph)) * (1 - st.p * 0.6)})`;
      ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, 7); ctx.fill();
    }
    const g = ctx.createRadialGradient(W * 0.5, H * 0.05, 0, W * 0.5, H * 0.05, W * 0.6);
    g.addColorStop(0, `rgba(229,169,58,${0.12 + st.p * 0.2})`); g.addColorStop(1, "rgba(229,169,58,0)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(90,52,82,.55)";
    for (let i = 0; i < 4; i++) {
      const s = hw * (1.1 + seeded(i) * 0.8);
      const x = ((seeded(i + 9) * W + now * (5 + i * 3)) % (W + s * 6)) - s * 3;
      const y = H * (0.1 + seeded(i + 4) * 0.45);
      for (const [dx, dy, r] of [[0, 0, 1], [1.1, 0.2, 0.75], [-1.0, 0.25, 0.7], [0.4, -0.45, 0.65]]) { ctx.beginPath(); ctx.arc(x + dx * s, y + dy * s, r * s, 0, 7); ctx.fill(); }
    }
  }

  function drawGulls(now) {
    ctx.strokeStyle = "rgba(244,232,228,.85)"; ctx.lineWidth = Math.max(1.2, hw * 0.06); ctx.lineCap = "round";
    for (let i = 0; i < 2; i++) {
      const t = ((now + i * 6) % 14) / 9;
      if (t > 1) continue;
      const x = W * (1.05 - t * 1.1), y = H * (0.2 + i * 0.08) + Math.sin(t * 8 + i) * hw * 0.3, f = Math.sin(now * 10 + i) * hw * 0.12, s = hw * 0.3;
      ctx.beginPath(); ctx.moveTo(x - s, y - f); ctx.quadraticCurveTo(x - s * 0.4, y - s * 0.5, x, y); ctx.quadraticCurveTo(x + s * 0.4, y - s * 0.5, x + s, y - f); ctx.stroke();
    }
  }

  function frame(now, dt) {
    const t = now % loopLen;
    let acc = 0, idx = 0;
    while (idx < plan.length - 1 && acc + plan[idx].d <= t) acc += plan[idx++].d;
    const seg = plan[idx], f = clamp((t - acc) / seg.d, 0, 1);
    if (idx < st.seg) reset();
    if (idx !== st.seg && (seg.k === "pause" || seg.k === "finale")) { st.stop = seg.stop; toast(isles[seg.stop], now); }
    st.seg = idx;
    st.sailing = seg.k === "sail";
    st.p = seg.from + (seg.to - seg.from) * (st.sailing ? smooth(f) * 0.3 + f * 0.7 : f);
    if (now > st.toastUntil) ui.toast.classList.remove("show");

    const r = route.at(st.p);
    const [tx, ty] = P(r.x, r.y);
    const heading = r.dx - r.dy;
    if (st.sailing && Math.abs(heading) > 0.15) st.heading = heading > 0 ? 1 : -1;
    const cx = ox0 + camX, cy = oy0 + camY + (N * hw) / 2;
    camX += (-(tx - cx) * 0.2 - camX) * 0.04;
    camY += (-(ty - cy) * 0.16 - camY) * 0.04;

    // günler ilerledikçe drahmi
    const day = dayAt(st.p);
    if (Math.floor(day) > Math.floor(st.day) && seg.k !== "fadeout") {
      for (let d = Math.floor(st.day) + 1; d <= Math.floor(day); d++) st.floats.push({ x: tx + (seeded(d) - 0.5) * hw * 0.6, y: ty - hw * 1.9, t: now });
    }
    st.day = day;
    if (st.sailing && now - st.wakeT > 0.12) { st.wake.push({ x: r.x - r.dx * 0.5, y: r.y - r.dy * 0.5, t: now }); st.wakeT = now; }
    st.wake = st.wake.filter((w) => now - w.t < 1.6);
    st.ripples = st.ripples.filter((w) => now - w.t < 1.7);

    const finale = seg.k === "finale" ? smooth(Math.min(1, f * 3)) : seg.k === "fadeout" ? 1 - f : 0;
    if (seg.k === "finale" && st.confetti.length < 70 && dt > 0) {
      const ith = isles[isles.length - 1], [ix, iy] = P(ith.x, ith.y, 1.4);
      for (let i = 0; i < 2; i++) st.confetti.push({ x: ix + (Math.random() - 0.5) * hw * 3, y: iy - hw * (1 + Math.random()), vx: (Math.random() - 0.5) * hw, vy: -hw * (0.5 + Math.random()), t: now, c: [C.saffron, C.marble, C.athena, C.ember][i + (st.confetti.length % 3)] });
    }

    screen();
    ctx.clearRect(0, 0, W, H);
    drawSky(now);
    drawPlatform(now);

    // derinliğe göre: ada yapıları, Argos ve gemi
    screen();
    const ith = isles[isles.length - 1];
    // Argos iskelenin yanında, geminin kapatmadığı kıyıda bekler
    const argosPos = { x: ith.x + (ith.nx * 0.55 - ith.ny * 0.8) * ith.r * 0.85, y: ith.y + (ith.ny * 0.55 + ith.nx * 0.8) * ith.r * 0.85 };
    const items = [
      ...isles.map((s) => ({ d: s.x + s.y, draw: () => drawFeatures(s, now, s === ith ? finale : 0) })),
      { d: argosPos.x + argosPos.y + 0.5, draw: () => {
        const img = finale > 0 ? argos.cheer : (Math.floor(now * 3) % 2 ? argos.wag : argos.happy);
        const [ax, ay] = P(argosPos.x, argosPos.y, 0.22);
        const jump = finale > 0 ? Math.abs(Math.sin(now * 7)) * hw * 0.35 : 0;
        const s = hw * 1.2;
        ctx.drawImage(img, ax - s / 2, ay - s * 0.95 - jump, s, s);
      } },
      { d: r.x + r.y + 0.3, draw: () => drawShip(tx, ty, now) },
    ].sort((a, b) => a.d - b.d);
    for (const it of items) it.draw();

    // +10 drahmi
    st.floats = st.floats.filter((p) => now - p.t < 1.1);
    ctx.textAlign = "center";
    ctx.font = `700 ${Math.max(12, hw * 0.5)}px "Marcellus", serif`;
    for (const p of st.floats) {
      const k = (now - p.t) / 1.1, y = p.y - k * hw * 1.2;
      ctx.globalAlpha = 1 - k * k;
      ctx.fillStyle = C.saffron; ctx.beginPath(); ctx.arc(p.x - hw * 0.42, y - hw * 0.17, hw * 0.16, 0, 7); ctx.fill();
      ctx.strokeStyle = C.wine; ctx.lineWidth = Math.max(2, hw * 0.1); ctx.strokeText("+10", p.x + hw * 0.08, y);
      ctx.fillStyle = C.marble; ctx.fillText("+10", p.x + hw * 0.08, y);
    }
    ctx.globalAlpha = 1;

    // final konfetisi
    st.confetti = st.confetti.filter((c) => now - c.t < 2.2);
    for (const c of st.confetti) {
      const k = now - c.t;
      ctx.fillStyle = c.c; ctx.globalAlpha = 1 - k / 2.2;
      ctx.save(); ctx.translate(c.x + c.vx * k, c.y + c.vy * k + hw * 1.6 * k * k); ctx.rotate(k * 6 + c.x);
      ctx.fillRect(-hw * 0.07, -hw * 0.04, hw * 0.14, hw * 0.08); ctx.restore();
    }
    ctx.globalAlpha = 1;

    drawGulls(now);
    const fade = seg.k === "fadein" ? 1 - f : seg.k === "fadeout" ? f : 0;
    if (fade > 0) { ctx.fillStyle = `rgba(42,20,36,${fade})`; ctx.fillRect(0, 0, W, H); }

    updateHud();
  }

  const last = {};
  const set = (key, val, fn) => { if (last[key] !== val) { last[key] = val; fn(val); } };
  function updateHud() {
    const day = st.day, whole = Math.floor(day);
    const lessonDay = Math.min(90, whole + 1);
    set("lesson", lessonDay, (d) => { ui.lesson.textContent = T.lesson(d); ui.lessonsub.textContent = T.lessonSub(d); });
    set("lessonbar", Math.round((day - whole) * 20), (v) => (ui.lessonbar.style.width = `${v * 5}%`));
    set("streak", whole, (d) => {
      ui.streak.textContent = d;
      const on = d === 0 ? 0 : ((d - 1) % 7) + 1;
      ui.beads.forEach((b, i) => { b.classList.toggle("on", i < on - 1); b.classList.toggle("last", i === on - 1); });
    });
    set("drachma", whole, (d) => (ui.drachma.textContent = T.drachma(fmt(START_DRACHMA + d * DRACHMA_PER_DAY))));
    set("rank", rankAt(whole), (v) => (ui.rank.textContent = v));
    const cur = isles[st.stop], next = isles[st.stop + 1];
    set("stop", st.stop, () => {
      ui.seals.textContent = T.seals(st.stop);
      ui.isle.textContent = cur.name;
      ui.meaning.textContent = cur.meaning;
      ui.nextname.textContent = next ? next.name : T.done;
      ui.nextsub.textContent = next ? T.nextSub(next.day) : T.home;
    });
    const span = next ? (st.p - cur.at) / (next.at - cur.at) : 1;
    set("legbar", Math.round(span * 50), (v) => (ui.legbar.style.width = `${v * 2}%`));
  }

  let clock = 0;
  layout();
  root.addEventListener("click", (e) => {
    const b = root.getBoundingClientRect();
    const u = (e.clientX - b.left - ox0 - camX) / hw, v = (e.clientY - b.top - oy0 - camY) / (hw / 2);
    const x = (u + v) / 2, y = (v - u) / 2;
    if (x > 0 && y > 0 && x < N && y < N) st.ripples.push({ x, y, t: clock });
  });

  if (reduced) {
    // Hareket azaltma: Aiolos'a varılmış tek bir kare
    plan.length = 0;
    plan.push({ k: "pause", d: 1e9, from: isles[2].at, to: isles[2].at, stop: 2 });
    st.day = isles[2].day;
    const still = () => { st.seg = -1; frame(0, 0); };
    new ResizeObserver(() => { layout(); still(); }).observe(root);
    return;
  }

  new ResizeObserver(layout).observe(root);
  let visible = true, raf = 0, prev = 0;
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf) { prev = 0; raf = requestAnimationFrame(loop); }
  }, { rootMargin: "100px" }).observe(root);
  function loop(ms) {
    raf = 0;
    if (!visible) return;
    const dt = prev ? clamp((ms - prev) / 1000, 0, 0.1) : 0;
    prev = ms;
    clock += dt;
    frame(clock, dt);
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
}

const el = document.getElementById("nestor-game");
if (el) mountNestorGame(el);
