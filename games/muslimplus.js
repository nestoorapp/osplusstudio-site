// MuslimPlus · Zikir Yolculuğu: uygulamadaki zikir haritasının izometrik, döngülü oyun sahnesi.
// Yolcu duraklar arasında yürür, her çekilen zikir +1 sayar, her 100 zikirde yola bir ağaç dikilir.
const asset = (p) => new URL(`assets/muslimplus/${p}`, import.meta.url).href;

const N = 12;               // ada N x N kare
const DEPTH = 1.5;          // adanın toprak kalınlığı (kare yarı genişliği cinsinden)
const RATE = 15;            // saniyede çekilen zikir
const TREE_EVERY = 100;     // uygulamadaki kural: her 100 zikirde bir ağaç
const START_TOTAL = 1130;
const WALK_SECONDS = 26;
const PAUSE = 1.8, FINALE = 3.8, FADE = 0.9;
const TESBIH = 33;

// Dünya koordinatları (0–N). Yol önden arkaya kıvrılır, duraklar yolun dış kıvrımlarında durur.
const ROAD = [[10, 10], [10.5, 5.5], [4.75, 8.75], [6.75, 2.75], [3, 3]];

// Sahnenin metinleri, ana sayfada seçilen dile göre (i18n.js): [ad, tema, açılış cümlesi, harita]
const TX = {
  tr: {
    stops: [
      ["Safâ", "Başlangıç, arınma", "Yolculuk başladı.", "Safâ Yolu"],
      ["Merve", "Gayret, devamlılık", "İlk adımı attın, şimdi devam et.", "Safâ Yolu"],
      ["Kevser", "Bolluk, nimet", "Yolculuğun bereketleniyor.", "Sular"],
      ["Sidra Bahçesi", "Manevi yükseliş", "Sidra’nın gölgesine vardın.", "Sidra"],
      ["Beytü’l-Harâm", "Merkez, yön", "Merkeze ulaştın.", "Merkez"],
    ],
    locale: "tr-TR", brand: "MuslimPlus · Zikir Yolculuğu", traveler: "Yolcu", pull: "Zikir çek", tap: "Dokun", every: "Her 100 zikir", tree: "1 ağaç",
    level: (n) => `Seviye ${n}`, round: (v) => `33'lük tesbih · ${v}. tur`, total: (v) => `Zikir ${v}`, trees: (v) => `Ağaç ×${v}`,
    done: "Yolculuk tamamlandı", next: (t) => `Sonraki durak · ${t}`, again: "Yeni bir yol başlıyor",
  },
  en: {
    stops: [
      ["Safa", "Beginning, purification", "The journey has begun.", "Safa Road"],
      ["Marwa", "Effort, steadiness", "You took the first step; now keep going.", "Safa Road"],
      ["Kawthar", "Abundance, blessing", "Your journey grows richer.", "Waters"],
      ["Garden of Sidra", "Spiritual ascent", "You reached the shade of the Sidra.", "Sidra"],
      ["Bayt al-Haram", "Center, direction", "You reached the center.", "Center"],
    ],
    locale: "en-US", brand: "MuslimPlus · Dhikr Journey", traveler: "Traveler", pull: "Say dhikr", tap: "Tap", every: "Every 100 dhikrs", tree: "1 tree",
    level: (n) => `Level ${n}`, round: (v) => `33-bead tasbih · round ${v}`, total: (v) => `Dhikr ${v}`, trees: (v) => `Trees ×${v}`,
    done: "Journey complete", next: (t) => `Next stop · ${t}`, again: "A new road begins",
  },
  de: {
    stops: [
      ["Safa", "Anfang, Reinigung", "Die Reise hat begonnen.", "Weg von Safa"],
      ["Marwa", "Mühe, Beständigkeit", "Der erste Schritt ist getan, jetzt geht es weiter.", "Weg von Safa"],
      ["Kauthar", "Fülle, Segen", "Deine Reise wird reicher.", "Gewässer"],
      ["Garten der Sidra", "Geistiger Aufstieg", "Du hast den Schatten der Sidra erreicht.", "Sidra"],
      ["Bait al-Haram", "Mitte, Richtung", "Du hast die Mitte erreicht.", "Mitte"],
    ],
    locale: "de-DE", brand: "MuslimPlus · Dhikr-Reise", traveler: "Reisender", pull: "Dhikr sprechen", tap: "Tippen", every: "Alle 100 Dhikr", tree: "1 Baum",
    level: (n) => `Stufe ${n}`, round: (v) => `Tasbih mit 33 Perlen · Runde ${v}`, total: (v) => `Dhikr ${v}`, trees: (v) => `Bäume ×${v}`,
    done: "Reise abgeschlossen", next: (t) => `Nächste Station · ${t}`, again: "Ein neuer Weg beginnt",
  },
  es: {
    stops: [
      ["Safa", "Inicio, purificación", "El viaje ha comenzado.", "Camino de Safa"],
      ["Marwa", "Esfuerzo, constancia", "Diste el primer paso; ahora sigue.", "Camino de Safa"],
      ["Kawthar", "Abundancia, bendición", "Tu viaje se vuelve más rico.", "Aguas"],
      ["Jardín de Sidra", "Ascenso espiritual", "Llegaste a la sombra de la Sidra.", "Sidra"],
      ["Bayt al-Haram", "Centro, dirección", "Llegaste al centro.", "Centro"],
    ],
    locale: "es-ES", brand: "MuslimPlus · Viaje de dhikr", traveler: "Viajero", pull: "Haz dhikr", tap: "Toca", every: "Cada 100 dhikr", tree: "1 árbol",
    level: (n) => `Nivel ${n}`, round: (v) => `Tasbih de 33 cuentas · vuelta ${v}`, total: (v) => `Dhikr ${v}`, trees: (v) => `Árboles ×${v}`,
    done: "Viaje completado", next: (t) => `Próxima parada · ${t}`, again: "Empieza un nuevo camino",
  },
  pt: {
    stops: [
      ["Safa", "Início, purificação", "A jornada começou.", "Caminho de Safa"],
      ["Marwa", "Esforço, constância", "Você deu o primeiro passo; agora continue.", "Caminho de Safa"],
      ["Kawthar", "Abundância, bênção", "Sua jornada fica mais rica.", "Águas"],
      ["Jardim de Sidra", "Ascensão espiritual", "Você chegou à sombra da Sidra.", "Sidra"],
      ["Bayt al-Haram", "Centro, direção", "Você chegou ao centro.", "Centro"],
    ],
    locale: "pt-BR", brand: "MuslimPlus · Jornada de dhikr", traveler: "Viajante", pull: "Faça dhikr", tap: "Toque", every: "A cada 100 dhikr", tree: "1 árvore",
    level: (n) => `Nível ${n}`, round: (v) => `Tasbih de 33 contas · volta ${v}`, total: (v) => `Dhikr ${v}`, trees: (v) => `Árvores ×${v}`,
    done: "Jornada concluída", next: (t) => `Próxima parada · ${t}`, again: "Um novo caminho começa",
  },
};
// paketli dillerde (lang/<kod>.js) tablo paketten gelir, eksik alanlar İngilizceden tamamlanır
const PK = globalThis.OS_PACK && globalThis.OS_PACK.games && globalThis.OS_PACK.games.muslimplus;
const T = TX[globalThis.OS_LANG] || (globalThis.OS_LANG && globalThis.OS_LANG !== "tr" ? Object.assign({}, TX.en, PK || {}) : TX.tr);
const STOPS = [
  { img: "landmarks/safa.png", level: 1, x: 7.6, y: 11.0, w: 3.0, ay: 0.82 },
  { img: "landmarks/merve.png", level: 2, x: 10.9, y: 3.1, w: 3.2, ay: 0.78 },
  { img: "landmarks/kevser.png", level: 11, x: 2.1, y: 9.9, w: 3.4, ay: 0.8 },
  { img: "landmarks/sidra.png", level: 16, x: 8.6, y: 1.5, w: 3.3, ay: 0.84 },
  { img: "landmarks/beytul-haram.png", level: 19, x: 1.5, y: 1.5, w: 2.7, ay: 0.86 },
].map((s, i) => ({ ...s, name: T.stops[i][0], theme: T.stops[i][1], unlock: T.stops[i][2], map: T.stops[i][3] }));

const DECOR = [
  { img: "decor/bush.png", w: 1.5, ay: 0.9, n: 6 },
  { img: "decor/flowers.png", w: 1.1, ay: 0.92, n: 6 },
  { img: "decor/rocks.png", w: 1.4, ay: 0.88, n: 3 },
  { img: "decor/pond.png", w: 2.3, ay: 0.72, n: 1 },
];

const TREE_PALETTE = [["#2F8F4E", "#46B465"], ["#3C9A3F", "#6CC25A"], ["#2E7D5B", "#4FAE84"], ["#E58FB0", "#F5B8CF"]];

const fmt = (n) => Math.floor(n).toLocaleString(T.locale);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const seeded = (n) => { const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const easeOutBack = (t) => { const c = 1.7; return 1 + (c + 1) * (t - 1) ** 3 + c * (t - 1) ** 2; };
const smooth = (t) => t * t * (3 - 2 * t);

function loadImage(src) {
  return new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; });
}

/* Yol: Catmull-Rom eğrisi, yay uzunluğuyla örneklenir */
function buildRoad(pts) {
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    for (let s = 0; s < 40; s++) {
      const t = s / 40, t2 = t * t, t3 = t2 * t;
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
    const dx = (b[0] - a[0]) / seg, dy = (b[1] - a[1]) / seg;
    return { x: a[0] + (b[0] - a[0]) * k, y: a[1] + (b[1] - a[1]) * k, dx, dy, i: hi };
  };
  // Bir noktaya yolun en yakın olduğu yer (0–1)
  const nearest = (x, y) => {
    let best = 0;
    out.forEach(([px, py], i) => { if (Math.hypot(px - x, py - y) < Math.hypot(out[best][0] - x, out[best][1] - y)) best = i; });
    return len[best] / total;
  };
  return { pts: out, total, at, nearest };
}

function buildHud(root) {
  const hud = document.createElement("div");
  hud.className = "hud";
  hud.setAttribute("aria-hidden", "true");
  const beads = Array.from({ length: TESBIH }, (_, i) => {
    const a = ((-90 + ((i + 1) * 360) / (TESBIH + 1)) * Math.PI) / 180;
    return `<circle cx="${(50 + 41 * Math.cos(a)).toFixed(2)}" cy="${(50 + 41 * Math.sin(a)).toFixed(2)}" r="3.7"/>`;
  }).join("");
  hud.innerHTML = `
    <div class="g-top">
      <div class="g-card g-quest">
        <span class="ic"><svg viewBox="0 0 40 40" width="70%"><circle cx="20" cy="18" r="11" fill="none" stroke="#7A4A2B" stroke-width="2.5" stroke-dasharray="1 4.2" stroke-linecap="round"/><circle cx="20" cy="31" r="3.4" fill="#F2C14E"/><path d="M20 34v4" stroke="#7A4A2B" stroke-width="2"/></svg></span>
        <span><b>Sübhânallah</b><small data-k="round"></small><div class="g-bar"><i data-k="beadbar"></i></div></span>
        <span class="tag" data-k="beadtag"></span>
      </div>
      <div class="g-card g-quest">
        <span class="ic"><img data-k="nextimg" alt=""></span>
        <span><b data-k="nextname"></b><small data-k="nextsub"></small><div class="g-bar"><i data-k="roadbar"></i></div></span>
        <span class="tag" data-k="nexttag"></span>
      </div>
    </div>
    <div class="g-right">
      <span class="g-brand">${T.brand}</span>
      <div class="g-ring"><svg viewBox="0 0 100 100"><circle class="imame" cx="50" cy="9" r="5.2"/>${beads}</svg><b data-k="beadnum"></b></div>
      <span class="g-pill"><i class="dot"></i><span data-k="total"></span></span>
      <span class="g-pill"><i class="dot tree"></i><span data-k="trees"></span></span>
      <span class="g-pill hot" data-k="level"></span>
    </div>
    <div class="g-card g-player">
      <span class="av"><img src="${asset("traveler.png")}" alt=""></span>
      <span><b>${T.traveler}</b><br><span class="chip" data-k="map"></span><small data-k="theme"></small></span>
    </div>
    <div class="g-keys">
      <span class="g-key">${T.pull} <kbd>${T.tap}</kbd></span>
      <span class="g-key">${T.every} <kbd>${T.tree}</kbd></span>
    </div>
    <div class="g-toast"><small data-k="tlevel"></small><b data-k="tname"></b><span data-k="ttext"></span></div>`;
  root.appendChild(hud);
  const k = {};
  hud.querySelectorAll("[data-k]").forEach((el) => (k[el.dataset.k] = el));
  k.beads = [...hud.querySelectorAll(".g-ring circle:not(.imame)")];
  k.toast = hud.querySelector(".g-toast");
  return k;
}

export async function mountZikirGame(root) {
  const canvas = document.createElement("canvas");
  root.prepend(canvas);
  const ctx = canvas.getContext("2d");
  const ui = buildHud(root);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const srcs = ["grass-tile.jpg", "traveler.png", "decor/bird.png", "decor/butterfly.png", ...STOPS.map((s) => s.img), ...DECOR.map((d) => d.img)];
  const imgs = {};
  await Promise.all(srcs.map(async (s) => (imgs[s] = await loadImage(asset(s)))));

  const road = buildRoad(ROAD);
  const roadPath = new Path2D();
  road.pts.forEach(([x, y], i) => (i ? roadPath.lineTo(x, y) : roadPath.moveTo(x, y)));

  const roadGap = (x, y) => Math.min(...road.pts.map(([rx, ry]) => Math.hypot(rx - x, ry - y)));
  /* Yolun yanında, yola değmeyen ilk boş yer (önce istenen taraf) */
  const beside = (f, side, from, to, gap, edge, free = () => true) => {
    const r = road.at(f);
    for (let off = from; off <= to; off += 0.1) {
      for (const s of [side, -side]) {
        const x = r.x - r.dy * off * s, y = r.y + r.dx * off * s;
        if (x > edge && y > edge && x < N - edge && y < N - edge && roadGap(x, y) >= gap && free(x, y)) return { x, y };
      }
    }
    return null;
  };
  const clear = (list) => (x, y) => list().every((o) => Math.hypot(o.x - x, o.y - y) > (o.w || 1.2) * 0.45 + 0.5);

  /* Yolcu her durağın yoldaki en yakın noktasında mola verir; ilk durak başta, son durak sonda */
  const stops = STOPS.map((s, i) => ({ ...s, at: i === 0 ? 0 : i === STOPS.length - 1 ? 1 : road.nearest(s.x, s.y) }));

  /* Süsler: yoldan ve duraklardan uzak, sabit tohumla dağıtılır */
  const decor = [];
  let seed = 7;
  for (const d of DECOR) {
    for (let placed = 0, tries = 0; placed < d.n && tries < 400; tries++) {
      const x = 0.9 + seeded(seed++) * (N - 1.8), y = 0.9 + seeded(seed++) * (N - 1.8);
      const nearRoad = road.pts.some(([rx, ry]) => Math.hypot(rx - x, ry - y) < 1.25 + d.w * 0.3);
      const nearOther = [...stops, ...decor].some((o) => Math.hypot(o.x - x, o.y - y) < (o.w || 1) * 0.55 + d.w * 0.55);
      if (nearRoad || nearOther) continue;
      decor.push({ ...d, x, y });
      placed++;
    }
  }
  const treeSpot = clear(() => [...stops, ...decor, ...st.trees]);
  const flowers = decor.filter((d) => d.img === "decor/flowers.png");

  /* Zaman çizelgesi: giriş, duraklar arası yürüyüş ve molalar, final, kararma */
  const plan = [{ k: "fadein", d: FADE, from: 0, to: 0 }];
  stops.forEach((s, i) => {
    if (i > 0) plan.push({ k: "walk", d: (WALK_SECONDS * (s.at - stops[i - 1].at)), from: stops[i - 1].at, to: s.at });
    plan.push({ k: i === stops.length - 1 ? "finale" : "pause", d: i === stops.length - 1 ? FINALE : PAUSE, from: s.at, to: s.at, stop: i });
  });
  plan.push({ k: "fadeout", d: FADE, from: 1, to: 1 });
  const loopLen = plan.reduce((a, s) => a + s.d, 0);

  let W = 0, H = 0, dpr = 1, hw = 10, ox0 = 0, oy0 = 0, camX = 0, camY = 0;
  let grass = null;
  const P = (x, y) => [ox0 + camX + (x - y) * hw, oy0 + camY + ((x + y) * hw) / 2];

  function layout() {
    const r = root.getBoundingClientRect();
    W = r.width; H = r.height; dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    const above = 3.4;
    hw = Math.min((W * 0.86) / (2 * N), (H * 0.84) / (N + DEPTH + above));
    ox0 = W / 2;
    oy0 = (H - (N + DEPTH + above) * hw) / 2 + above * hw + H * 0.03;
    grass = ctx.createPattern(imgs["grass-tile.jpg"], "repeat");
    grass.setTransform(new DOMMatrix().scale(3.2 / 512));
  }

  /* Oyun durumu */
  const st = { total: START_TOTAL, carry: 0, trees: [], fx: [], floats: [], seg: -1, stop: 0, p: 0, walking: false, toastUntil: 0, side: 1 };
  function reset() { st.total = START_TOTAL; st.carry = 0; st.trees = []; st.fx = []; st.floats = []; st.stop = 0; }

  function tap(now, sx, sy, n = 1) {
    for (let i = 0; i < n; i++) {
      const before = Math.floor(st.total / TREE_EVERY);
      st.total += 1;
      if (Math.floor(st.total / TREE_EVERY) > before) plantTree(now);
    }
    if (sx !== undefined) st.floats.push({ x: sx + (Math.random() - 0.5) * hw * 0.8, y: sy, born: now });
  }

  function plantTree(now) {
    st.side = -st.side;
    const pos = beside(Math.max(0, st.p - 0.03), st.side, 1.0, 2.6, 0.95, 0.7, treeSpot);
    if (!pos) return;
    const { x, y } = pos;
    st.trees.push({ x, y, born: now, pal: TREE_PALETTE[st.trees.length % TREE_PALETTE.length], s: 0.9 + seeded(st.trees.length + 3) * 0.3 });
    for (let i = 0; i < 14; i++) st.fx.push({ x, y, a: (i / 14) * Math.PI * 2, born: now, sp: 0.6 + seeded(i + now) * 0.6 });
  }

  function toast(s, now) {
    ui.tlevel.textContent = `${T.level(s.level)} · ${s.map}`;
    ui.tname.textContent = s.name;
    ui.ttext.textContent = s.unlock;
    ui.toast.classList.add("show");
    st.toastUntil = now + (s === stops[stops.length - 1] ? FINALE - 0.6 : PAUSE + 0.4);
  }

  /* --- çizim yardımcıları --- */
  const screen = () => ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const world = () => ctx.setTransform(dpr * hw, (dpr * hw) / 2, -dpr * hw, (dpr * hw) / 2, dpr * (ox0 + camX), dpr * (oy0 + camY));

  function sprite(img, x, y, w, ay, o = {}) {
    const [sx, sy] = P(x, y);
    const pw = w * hw, ph = (pw * img.height) / img.width;
    ctx.save();
    ctx.translate(sx, sy + (o.lift || 0));
    if (o.rot) ctx.rotate(o.rot);
    ctx.scale((o.flip ? -1 : 1) * (o.sx || 1), o.sy || 1);
    if (o.alpha !== undefined) ctx.globalAlpha = o.alpha;
    ctx.drawImage(img, -pw / 2, -ph * ay, pw, ph);
    ctx.restore();
  }

  function drawTree(t, now) {
    const g = easeOutBack(clamp((now - t.born) / 0.7, 0, 1));
    if (g <= 0) return;
    const [sx, sy] = P(t.x, t.y);
    const u = hw * t.s * g;
    const sway = Math.sin(now * 1.6 + t.x) * 0.03;
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(sway);
    ctx.fillStyle = "#7A4A2B";
    ctx.beginPath(); ctx.roundRect(-0.09 * u, -0.8 * u, 0.18 * u, 0.8 * u, 0.06 * u); ctx.fill();
    const [dark, light] = t.pal;
    ctx.fillStyle = dark;
    for (const [cx, cy, r] of [[0, -1.12, 0.55], [-0.36, -0.86, 0.38], [0.38, -0.9, 0.4]]) { ctx.beginPath(); ctx.arc(cx * u, cy * u, r * u, 0, 7); ctx.fill(); }
    ctx.fillStyle = light;
    for (const [cx, cy, r] of [[-0.14, -1.26, 0.3], [0.26, -1.0, 0.18], [-0.38, -0.92, 0.16]]) { ctx.beginPath(); ctx.arc(cx * u, cy * u, r * u, 0, 7); ctx.fill(); }
    ctx.restore();
  }

  function drawIsland(now) {
    const L = P(0, N), B = P(N, N), R = P(N, 0), d = DEPTH * hw, lip = 0.3 * hw;
    screen();
    // yan yüzler: çim kenarı + toprak katmanları
    const face = (a, b, c1, c2) => {
      const gr = ctx.createLinearGradient(0, a[1], 0, a[1] + d + Math.abs(b[1] - a[1]));
      gr.addColorStop(0, c1); gr.addColorStop(1, c2);
      ctx.fillStyle = gr;
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(b[0], b[1] + d); ctx.lineTo(a[0], a[1] + d); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#6FAE3F";
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(b[0], b[1] + lip); ctx.lineTo(a[0], a[1] + lip); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "rgba(60,35,15,.18)"; ctx.lineWidth = Math.max(1, hw * 0.05);
      for (const f of [0.45, 0.72]) { ctx.beginPath(); ctx.moveTo(a[0], a[1] + d * f); ctx.lineTo(b[0], b[1] + d * f); ctx.stroke(); }
    };
    face(L, B, "#A9774A", "#7C5233");
    face(B, R, "#8C5E3A", "#5F3E25");
    ctx.fillStyle = "rgba(255,255,255,.18)";
    ctx.fillRect(B[0] - 1, B[1], 2, d);

    // üst yüz: çim dokusu, sıcak ton ve kenar gölgesi
    world();
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, N, N); ctx.clip();
    ctx.fillStyle = grass; ctx.fillRect(0, 0, N, N);
    ctx.fillStyle = "rgba(255,186,110,0.16)"; ctx.fillRect(0, 0, N, N);
    const vg = ctx.createRadialGradient(N / 2, N / 2, N * 0.2, N / 2, N / 2, N * 0.75);
    vg.addColorStop(0, "rgba(255,250,220,.18)"); vg.addColorStop(1, "rgba(30,60,10,.28)");
    ctx.fillStyle = vg; ctx.fillRect(0, 0, N, N);

    // yol: kenar, dolgu, yürünen kısım ve taşlar
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.strokeStyle = "#C49A5E"; ctx.lineWidth = 1.05; ctx.stroke(roadPath);
    ctx.strokeStyle = "#EBD3A0"; ctx.lineWidth = 0.82; ctx.stroke(roadPath);
    const done = road.at(st.p).i;
    if (done > 1) {
      const lit = new Path2D();
      road.pts.slice(0, done + 1).forEach(([x, y], i) => (i ? lit.lineTo(x, y) : lit.moveTo(x, y)));
      ctx.strokeStyle = "rgba(255,236,170,.9)"; ctx.lineWidth = 0.5; ctx.stroke(lit);
    }
    ctx.setLineDash([0.02, 0.62]); ctx.strokeStyle = "#D2B27A"; ctx.lineWidth = 0.2; ctx.stroke(roadPath); ctx.setLineDash([]);

    // zemin gölgeleri
    ctx.fillStyle = "rgba(25,50,10,.22)";
    for (const o of [...stops, ...decor]) { ctx.beginPath(); ctx.ellipse(o.x + 0.15, o.y + 0.15, o.w * 0.36, o.w * 0.36, 0, 0, 7); ctx.fill(); }
    for (const t of st.trees) { ctx.beginPath(); ctx.ellipse(t.x + 0.2, t.y + 0.2, 0.55 * t.s * clamp((now - t.born) / 0.7, 0, 1), 0.55 * t.s, 0, 0, 7); ctx.fill(); }
    const tr = road.at(st.p);
    ctx.beginPath(); ctx.ellipse(tr.x + 0.1, tr.y + 0.1, 0.42, 0.42, 0, 0, 7); ctx.fill();
    ctx.restore();
  }

  function drawClouds(now) {
    screen();
    ctx.fillStyle = "rgba(255,255,255,.55)";
    for (let i = 0; i < 4; i++) {
      const s = hw * (1.2 + seeded(i) * 0.8);
      const x = ((seeded(i + 9) * W + now * (6 + i * 3)) % (W + s * 6)) - s * 3;
      const y = H * (0.08 + seeded(i + 4) * 0.5);
      for (const [dx, dy, r] of [[0, 0, 1], [1.1, 0.2, 0.75], [-1.0, 0.25, 0.7], [0.4, -0.45, 0.65]]) { ctx.beginPath(); ctx.arc(x + dx * s, y + dy * s, r * s, 0, 7); ctx.fill(); }
    }
  }

  function drawGlow(now, strength) {
    if (strength <= 0) return;
    const k = stops[stops.length - 1];
    const [sx, sy] = P(k.x, k.y);
    const cy = sy - hw * 1.2;
    screen();
    ctx.save();
    ctx.globalAlpha = strength;
    const g = ctx.createRadialGradient(sx, cy, 0, sx, cy, hw * 4.2);
    g.addColorStop(0, "rgba(255,230,140,.85)"); g.addColorStop(1, "rgba(255,230,140,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, cy, hw * 4.2, 0, 7); ctx.fill();
    ctx.translate(sx, cy); ctx.rotate(now * 0.25);
    ctx.fillStyle = "rgba(255,240,190,.35)";
    for (let i = 0; i < 12; i++) { ctx.rotate((Math.PI * 2) / 12); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(hw * 4, -hw * 0.28); ctx.lineTo(hw * 4, hw * 0.28); ctx.fill(); }
    ctx.restore();
  }

  function frame(now, dt) {
    // döngüdeki konum
    const t = now % loopLen;
    let acc = 0, idx = 0;
    while (idx < plan.length - 1 && acc + plan[idx].d <= t) acc += plan[idx++].d;
    const seg = plan[idx], f = clamp((t - acc) / seg.d, 0, 1);
    if (idx < st.seg) reset();
    if (idx !== st.seg && (seg.k === "pause" || seg.k === "finale")) { st.stop = seg.stop; toast(stops[seg.stop], now); }
    st.seg = idx;
    st.walking = seg.k === "walk";
    st.p = seg.from + (seg.to - seg.from) * (st.walking ? smooth(f) * 0.15 + f * 0.85 : f);
    if (now > st.toastUntil) ui.toast.classList.remove("show");

    const r = road.at(st.p);
    const [tx, ty] = P(r.x, r.y);
    // kamera yolcuyu hafifçe izler
    const cx = ox0 + camX, cy = oy0 + camY + (N * hw) / 2;
    camX += ((-(tx - cx) * 0.22) - camX) * 0.04;
    camY += ((-(ty - cy) * 0.18) - camY) * 0.04;

    // zikir sayacı
    if (seg.k !== "fadein" && seg.k !== "fadeout") {
      st.carry += RATE * dt;
      const n = Math.floor(st.carry);
      if (n > 0) { st.carry -= n; tap(now, tx, ty - hw * 2.1, n); }
    }

    screen();
    ctx.clearRect(0, 0, W, H);
    drawClouds(now);
    drawIsland(now);
    drawGlow(now, seg.k === "finale" ? smooth(Math.min(1, f * 3)) : seg.k === "fadeout" ? 1 - f : 0);

    // derinliğe göre sıralı nesneler
    screen();
    const heading = r.dx - r.dy;
    const items = [
      ...stops.map((s) => ({ d: s.x + s.y, draw: () => sprite(imgs[s.img], s.x, s.y, s.w, s.ay) })),
      ...decor.map((o) => ({ d: o.x + o.y, draw: () => sprite(imgs[o.img], o.x, o.y, o.w, o.ay) })),
      ...st.trees.map((tr) => ({ d: tr.x + tr.y, draw: () => drawTree(tr, now) })),
      { d: r.x + r.y + 0.01, draw: () => {
        const step = st.walking ? now * 9 : now * 2;
        sprite(imgs["traveler.png"], r.x, r.y, 0.92, 0.97, {
          flip: heading < -0.05,
          lift: st.walking ? -Math.abs(Math.sin(step)) * hw * 0.12 : 0,
          rot: st.walking ? Math.sin(step) * 0.05 : 0,
          sy: st.walking ? 1 : 1 + Math.sin(step) * 0.012,
        });
      } },
    ].sort((a, b) => a.d - b.d);
    for (const it of items) it.draw();

    // ağaç dikilince ışık parçacıkları
    st.fx = st.fx.filter((p) => now - p.born < 0.9);
    for (const p of st.fx) {
      const k = (now - p.born) / 0.9, [sx, sy] = P(p.x, p.y);
      ctx.fillStyle = `rgba(255,226,120,${1 - k})`;
      const d = hw * (0.4 + k * 1.4 * p.sp);
      ctx.beginPath(); ctx.arc(sx + Math.cos(p.a) * d, sy - hw * 0.8 + Math.sin(p.a) * d * 0.6 - k * hw * 0.6, hw * 0.09 * (1 - k * 0.5), 0, 7); ctx.fill();
    }

    // +1 yazıları
    st.floats = st.floats.filter((p) => now - p.born < 0.9);
    ctx.font = `800 ${Math.max(13, hw * 0.6)}px "Bricolage Grotesque", sans-serif`;
    ctx.textAlign = "center";
    ctx.lineWidth = Math.max(2, hw * 0.1);
    for (const p of st.floats) {
      const k = (now - p.born) / 0.9;
      ctx.globalAlpha = 1 - k * k;
      ctx.strokeStyle = "#7A4A2B"; ctx.strokeText("+1", p.x, p.y - k * hw * 1.4);
      ctx.fillStyle = "#FFE08A"; ctx.fillText("+1", p.x, p.y - k * hw * 1.4);
    }
    ctx.globalAlpha = 1;

    // kelebekler ve kuş
    flowers.slice(0, 2).forEach((fl, i) => {
      const x = fl.x + Math.sin(now * 0.7 + i * 2) * 1.1, y = fl.y + Math.cos(now * 0.5 + i) * 0.9;
      sprite(imgs["decor/butterfly.png"], x, y, 0.5, 0.5, { lift: -hw * (1.3 + Math.sin(now * 2.4 + i) * 0.25), sx: 0.35 + Math.abs(Math.sin(now * 16 + i)) * 0.65 });
    });
    const bt = (now % 13) / 7;
    if (bt < 1) {
      const bird = imgs["decor/bird.png"], bw = hw * 1.15;
      ctx.save();
      ctx.translate(-bw + bt * (W + bw * 2), H * 0.16 + Math.sin(bt * 9) * hw * 0.3);
      ctx.scale(-1, 0.75 + Math.sin(now * 13) * 0.25);
      ctx.drawImage(bird, -bw / 2, -bw / 2, bw, (bw * bird.height) / bird.width);
      ctx.restore();
    }

    // döngü geçişi
    const fade = seg.k === "fadein" ? 1 - f : seg.k === "fadeout" ? f : 0;
    if (fade > 0) { ctx.fillStyle = `rgba(251,227,196,${fade})`; ctx.fillRect(0, 0, W, H); }

    updateHud(r);
  }

  const last = {};
  const set = (key, val, fn) => { if (last[key] !== val) { last[key] = val; fn(val); } };
  function updateHud() {
    const total = st.total;
    const done = ((total - 1) % TESBIH) + 1;
    const round = Math.floor((total - 1) / TESBIH) % 3 + 1;
    set("done", done, (d) => {
      ui.beads.forEach((b, i) => { b.classList.toggle("on", i < d - 1); b.classList.toggle("last", i === d - 1); });
      ui.beadnum.textContent = d;
      ui.beadtag.textContent = `${d}/${TESBIH}`;
      ui.beadbar.style.width = `${(d / TESBIH) * 100}%`;
    });
    set("round", round, (v) => (ui.round.textContent = T.round(v)));
    set("total", total, (v) => (ui.total.textContent = T.total(fmt(v))));
    set("trees", Math.floor(total / TREE_EVERY), (v) => (ui.trees.textContent = T.trees(v)));
    const cur = stops[st.stop], next = stops[st.stop + 1];
    set("stop", st.stop, () => {
      ui.level.textContent = T.level(cur.level);
      ui.map.textContent = cur.map;
      ui.theme.textContent = `${cur.name} · ${cur.theme}`;
      ui.nextimg.src = asset((next || cur).img);
      ui.nextname.textContent = next ? next.name : T.done;
      ui.nextsub.textContent = next ? T.next(next.theme) : T.again;
      ui.nexttag.textContent = T.level((next || cur).level);
    });
    const span = next ? (st.p - cur.at) / (next.at - cur.at) : 1;
    set("roadbar", Math.round(span * 50), (v) => (ui.roadbar.style.width = `${v * 2}%`));
  }

  let clock = 0;
  layout();
  root.addEventListener("click", (e) => {
    const r = root.getBoundingClientRect();
    tap(clock, e.clientX - r.left, e.clientY - r.top);
  });

  if (reduced) {
    // Hareket azaltma: Kevser durağında, birkaç ağaç dikilmiş tek bir kare
    plan.length = 0;
    plan.push({ k: "pause", d: 1e9, from: 0.6, to: 0.6, stop: 2 });
    st.total = 1388;
    for (const [i, p] of [0.18, 0.4, 0.62].entries()) {
      const pos = beside(p, i % 2 ? 1 : -1, 1.0, 2.6, 0.95, 0.7, treeSpot);
      if (pos) st.trees.push({ ...pos, born: -10, pal: TREE_PALETTE[i], s: 1 });
    }
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

const el = document.getElementById("zikir-game");
if (el) mountZikirGame(el);
