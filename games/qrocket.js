// QRoket · Masada sipariş: izometrik, sürekli dönen bir restoran sahnesi.
// Misafir masadaki QR'ı okutur, AI garsonla kendi dilinde konuşur, sipariş mutfağa gider,
// garson servis eder, hesap masada ödenir ve her ödemede QR-roket havalanır.
const N = 9;                // zemin N x N kare
const DEPTH = 0.8;          // zemin kalınlığı
const WALL = 3.0;           // duvar yüksekliği
const CYCLE = 16;           // bir masanın sipariş → ödeme döngüsü (sn)
const GAP = 4;              // masalar arası faz farkı: garson aynı anda tek masaya gider

const C = {
  ink: "#1E2433", soft: "#535B6B", cream: "#FBF8F3", paper: "#FFFFFF", orange: "#EE7A3A", orangeDeep: "#C95A22",
  brass: "#D9A441", sage: "#3E8A5E", tomato: "#D2553F", sky: "#2F7FA8",
};

// Sahnenin metinleri, ana sayfada seçilen dile göre (i18n.js). Yemek adları ve misafir sohbetleri her dilde aynı kalır.
const TX = {
  tr: {
    locale: "tr-TR", brand: "QRoket · Masada sipariş", payTag: "Masada ödeme", langs: "Çok dilli", waiter: "AI garson", order: "Sipariş", scan: "QR'ı okut", launch: "Roketi fırlat", tap: "Dokun",
    board: "FİYAT LİSTESİ · sürüm 14", cover: "Kuver", none: "yok", table: (n) => `Masa ${n}`, split: (n) => `${n} kişiye bölündü`, tip: (v) => `bahşiş ${v} ₺`,
    closed: (n) => `Masa ${n} · hesap masada kapandı`, paid: (v) => `${v} ₺ ödendi`, revenue: (v) => `Ciro ${v} ₺`, tips: (v) => `Bahşiş ${v} ₺`,
    states: ["mutfakta", "servise çıktı", "masada"], took: "AI garson aldı",
  },
  en: {
    locale: "en-US", brand: "QRoket · Order at the table", payTag: "Pay at the table", langs: "Multilingual", waiter: "AI waiter", order: "Order", scan: "Scan the QR", launch: "Launch a rocket", tap: "Tap",
    board: "PRICE LIST · version 14", cover: "Cover charge", none: "none", table: (n) => `Table ${n}`, split: (n) => `split ${n} ways`, tip: (v) => `tip ${v} ₺`,
    closed: (n) => `Table ${n} · bill settled at the table`, paid: (v) => `${v} ₺ paid`, revenue: (v) => `Sales ${v} ₺`, tips: (v) => `Tips ${v} ₺`,
    states: ["in the kitchen", "on its way", "served"], took: "taken by the AI waiter",
  },
  de: {
    locale: "de-DE", brand: "QRoket · Bestellen am Tisch", payTag: "Zahlen am Tisch", langs: "Mehrsprachig", waiter: "KI-Kellner", order: "Bestellen", scan: "QR scannen", launch: "Rakete starten", tap: "Tippen",
    board: "PREISLISTE · Version 14", cover: "Gedeck", none: "keins", table: (n) => `Tisch ${n}`, split: (n) => `auf ${n} Personen geteilt`, tip: (v) => `Trinkgeld ${v} ₺`,
    closed: (n) => `Tisch ${n} · am Tisch bezahlt`, paid: (v) => `${v} ₺ bezahlt`, revenue: (v) => `Umsatz ${v} ₺`, tips: (v) => `Trinkgeld ${v} ₺`,
    states: ["in der Küche", "unterwegs", "serviert"], took: "vom KI-Kellner aufgenommen",
  },
  es: {
    locale: "es-ES", brand: "QRoket · Pide en la mesa", payTag: "Paga en la mesa", langs: "Multilingüe", waiter: "Camarero IA", order: "Pedir", scan: "Escanea el QR", launch: "Lanza un cohete", tap: "Toca",
    board: "LISTA DE PRECIOS · versión 14", cover: "Cubierto", none: "no", table: (n) => `Mesa ${n}`, split: (n) => `dividida entre ${n}`, tip: (v) => `propina ${v} ₺`,
    closed: (n) => `Mesa ${n} · cuenta cerrada en la mesa`, paid: (v) => `${v} ₺ pagados`, revenue: (v) => `Ventas ${v} ₺`, tips: (v) => `Propinas ${v} ₺`,
    states: ["en la cocina", "en camino", "servido"], took: "tomado por el camarero IA",
  },
  pt: {
    locale: "pt-BR", brand: "QRoket · Peça na mesa", payTag: "Pague na mesa", langs: "Multilíngue", waiter: "Garçom de IA", order: "Pedir", scan: "Escaneie o QR", launch: "Lance um foguete", tap: "Toque",
    board: "TABELA DE PREÇOS · versão 14", cover: "Couvert", none: "não", table: (n) => `Mesa ${n}`, split: (n) => `dividida por ${n}`, tip: (v) => `gorjeta ${v} ₺`,
    closed: (n) => `Mesa ${n} · conta fechada na mesa`, paid: (v) => `${v} ₺ pagos`, revenue: (v) => `Vendas ${v} ₺`, tips: (v) => `Gorjetas ${v} ₺`,
    states: ["na cozinha", "a caminho", "servido"], took: "anotado pelo garçom de IA",
  },
};
// paketli dillerde (lang/<kod>.js) tablo paketten gelir, eksik alanlar İngilizceden tamamlanır
const PK = globalThis.OS_PACK && globalThis.OS_PACK.games && globalThis.OS_PACK.games.qrocket;
const T = TX[globalThis.OS_LANG] || (globalThis.OS_LANG && globalThis.OS_LANG !== "tr" ? Object.assign({}, TX.en, PK || {}) : TX.tr);
// qroket.com'daki örnek sohbetlerden: soru, AI garsonun cevabı ve sipariş
const LANGS = [
  { code: "TR", name: "Türkçe", q: "Glutensiz ne var?", a: "Mercimek çorbası glutensiz.", item: "Mercimek çorbası", price: 155 },
  { code: "EN", name: "English", q: "Is it spicy?", a: "Mildly. Shall I order it?", item: "İskender", price: 420 },
  { code: "DE", name: "Deutsch", q: "Nussallergie", a: "Ohne Nüsse: Izgara köfte.", item: "Izgara köfte", price: 380 },
  { code: "AR", name: "العربية", q: "طبق نباتي؟", a: "نعم، شوربة العدس", item: "Mercimek çorbası", price: 155, rtl: true },
  { code: "RU", name: "Русский", q: "Что посоветуете?", a: "Попробуйте искендер!", item: "İskender", price: 420 },
];

const TABLES = [
  { no: 4, x: 4.1, y: 2.9 }, { no: 7, x: 7.2, y: 3.0 }, { no: 9, x: 7.3, y: 6.6 }, { no: 12, x: 4.3, y: 6.4 },
];

const SHIRTS = ["#EE7A3A", "#2F7FA8", "#3E8A5E", "#D2553F", "#7A5CA8", "#E0B04A", "#4A5A78", "#C98D5B"];
const SKINS = ["#F1C7A5", "#D9A07A", "#A86F4C", "#7A4E32", "#F6D5BC"];
const HAIRS = ["#2B1D14", "#5A3A22", "#C9A15A", "#1E1E1E", "#8C4A2F"];

// Logo: QR modüllerinden oluşan, havalanan roket
const ROCKET = [
  ".......b.......", "......bbb......", ".....bbbbb.....", "....ppppppp....", "...ppp...ppp...",
  "..ppppppppppp..", "..dddpppppddd..", "..dpdpppppdpd..", "..dddpppppddd..", ".ppppppppppppp.",
  ".ppppppppppppp.", ".ppppppppppppp.", ".ppbbbbbbbbbbp.", "ppp.ppppppp.ppp", "bb..ppp.ppp..bb",
  "....bb...bb....", "....b.....b....",
];
const ROCKET_TONE = { b: C.orange, p: "#F6F2EA", d: C.ink };

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const seeded = (n) => { const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); };
const smooth = (t) => t * t * (3 - 2 * t);
const fmt = (n) => Math.round(n).toLocaleString(T.locale);
const mod = (a, n) => ((a % n) + n) % n;
// Bir olay anı (e) son karede geçildi mi? Döngü başa sardığında da doğru çalışır.
const crossed = (prev, cur, e) => (cur >= prev ? prev < e && e <= cur : e > prev || e <= cur);

function buildHud(root) {
  const hud = document.createElement("div");
  hud.className = "hud";
  hud.setAttribute("aria-hidden", "true");
  const beads = TABLES.map((_, i) => {
    const a = ((-45 + i * 90) * Math.PI) / 180;
    return `<circle cx="${(50 + 34 * Math.cos(a)).toFixed(2)}" cy="${(50 + 34 * Math.sin(a)).toFixed(2)}" r="9"/>`;
  }).join("");
  const qr = `<svg viewBox="0 0 32 32" width="64%" aria-hidden="true"><rect x="1" y="1" width="30" height="30" rx="8" fill="#12332A" stroke="#E5482F" stroke-width="1.6"/><rect x="15.15" y="3.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="13.15" y="5.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="15.15" y="5.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="17.15" y="5.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="11.15" y="7.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="13.15" y="7.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="15.15" y="7.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="17.15" y="7.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="19.15" y="7.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="11.15" y="9.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="19.15" y="9.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="11.15" y="11.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="19.15" y="11.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="11.15" y="13.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="19.15" y="13.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="11.15" y="15.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="13.15" y="15.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="15.15" y="15.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="17.15" y="15.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="19.15" y="15.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="11.15" y="17.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="15.15" y="17.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="19.15" y="17.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="9.15" y="19.15" width="1.7" height="1.7" fill="#E5482F"/><rect x="11.15" y="19.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="13.15" y="19.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="17.15" y="19.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="19.15" y="19.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="21.15" y="19.15" width="1.7" height="1.7" fill="#E5482F"/><rect x="9.15" y="21.15" width="1.7" height="1.7" fill="#E5482F"/><rect x="11.15" y="21.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="13.15" y="21.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="15.15" y="21.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="17.15" y="21.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="19.15" y="21.15" width="1.7" height="1.7" fill="#F4EEE2"/><rect x="21.15" y="21.15" width="1.7" height="1.7" fill="#E5482F"/><rect x="9.15" y="23.15" width="1.7" height="1.7" fill="#E5482F"/><rect x="21.15" y="23.15" width="1.7" height="1.7" fill="#E5482F"/><rect x="13.15" y="25.15" width="1.7" height="1.7" fill="#F2B33D"/><rect x="17.15" y="25.15" width="1.7" height="1.7" fill="#F2B33D"/><rect x="15.15" y="27.15" width="1.7" height="1.7" fill="#E5482F"/><rect x="13.15" y="9.15" width="5.7" height="5.7" fill="#F4EEE2"/><rect x="14.1" y="10.1" width="3.8" height="3.8" fill="#12332A"/><rect x="15.05" y="11.05" width="1.9" height="1.9" fill="#E5482F"/></svg>`;
  hud.innerHTML = `
    <div class="g-top">
      <div class="g-card g-quest">
        <span class="ic">${qr}</span>
        <span><b data-k="order"></b><small data-k="ordersub"></small><div class="g-bar"><i data-k="orderbar"></i></div></span>
        <span class="tag" data-k="ordertag"></span>
      </div>
      <div class="g-card g-quest">
        <span class="ic"><svg viewBox="0 0 32 32" width="60%"><rect x="3" y="7" width="26" height="18" rx="3" fill="${C.ink}"/><rect x="3" y="11" width="26" height="3.5" fill="${C.orange}"/><rect x="7" y="18" width="8" height="2.5" rx="1" fill="#fff"/></svg></span>
        <span><b data-k="pay"></b><small data-k="paysub"></small><div class="g-bar"><i data-k="paybar"></i></div></span>
        <span class="tag">${T.payTag}</span>
      </div>
    </div>
    <div class="g-right">
      <span class="g-brand">${T.brand}</span>
      <div class="g-ring"><svg viewBox="0 0 100 100">${beads}</svg><b data-k="orders"></b></div>
      <span class="g-pill"><i class="dot"></i><span data-k="revenue"></span></span>
      <span class="g-pill"><i class="dot tip"></i><span data-k="tips"></span></span>
      <span class="g-pill hot">${T.langs}</span>
    </div>
    <div class="g-card g-player">
      <span class="av">${qr}</span>
      <span><b>${T.waiter}</b><br><span class="chip" data-k="lang"></span><small data-k="said"></small></span>
    </div>
    <div class="g-keys">
      <span class="g-key">${T.order} <kbd>${T.scan}</kbd></span>
      <span class="g-key">${T.launch} <kbd>${T.tap}</kbd></span>
    </div>
    <div class="g-toast"><small data-k="tkicker"></small><b data-k="tname"></b><span data-k="ttext"></span></div>`;
  root.appendChild(hud);
  const k = {};
  hud.querySelectorAll("[data-k]").forEach((el) => (k[el.dataset.k] = el));
  k.beads = [...hud.querySelectorAll(".g-ring circle")];
  k.toast = hud.querySelector(".g-toast");
  return k;
}

export function mountQrocketGame(root) {
  const canvas = document.createElement("canvas");
  root.prepend(canvas);
  const ctx = canvas.getContext("2d");
  const ui = buildHud(root);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const PASS = { x: 1.5, y: 4.7 };          // tezgâhtaki servis noktası
  const WAITER_HOME = { x: 2.5, y: 5.0 };
  const tables = TABLES.map((t, i) => ({
    ...t, i,
    seats: [
      { x: t.x - 0.1, y: t.y - 1.0, back: [0, -1] },
      { x: t.x + 1.0, y: t.y - 0.05, back: [1, 0] },
    ],
    guests: [0, 1].map((g) => ({ shirt: SHIRTS[(i * 3 + g * 5) % SHIRTS.length], skin: SKINS[(i * 2 + g) % SKINS.length], hair: HAIRS[(i + g * 2) % HAIRS.length] })),
    approach: { x: t.x - 1.15, y: t.y + 0.35 },
    prev: 0,
  }));

  /* Masanın döngüdeki yeri ve o turun dili / siparişi */
  const phaseOf = (t, now) => mod(now - t.i * GAP, CYCLE);
  const cycleOf = (t, now) => Math.floor((now - t.i * GAP) / CYCLE);
  const orderOf = (t, cyc) => {
    const lang = LANGS[mod(t.i + cyc, LANGS.length)];
    const qty = 2 + mod(cyc + t.i, 2);
    const total = lang.price * qty + 60 * qty;
    return { lang, qty, total, tip: Math.round(total * 0.1 / 10) * 10, split: qty };
  };

  let W = 0, H = 0, dpr = 1, hw = 10, ox = 0, oy = 0;
  const P = (x, y, z = 0) => [ox + (x - y) * hw, oy + ((x + y) * hw) / 2 - z * hw];

  function layout() {
    const r = root.getBoundingClientRect();
    W = r.width; H = r.height; dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    const above = WALL + 0.4;
    hw = Math.min((W * 0.88) / (2 * N), (H * 0.86) / (N + DEPTH + above));
    ox = W / 2;
    oy = (H - (N + DEPTH + above) * hw) / 2 + above * hw + H * 0.04;
  }

  const st = { orders: 126, revenue: 18240, tips: 1320, rockets: [], smoke: [], floats: [], toastUntil: 0, lastOrder: null, lastPay: null, speaking: null };

  /* --- çizim yardımcıları --- */
  const screen = () => ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const world = (lift = 0) => ctx.setTransform(dpr * hw, (dpr * hw) / 2, -dpr * hw, (dpr * hw) / 2, dpr * ox, dpr * (oy - lift * hw));
  // Sağ duvar (y = 0) düzlemi: (x, -z) koordinatlarıyla çizilir
  const rightWall = () => ctx.setTransform(dpr * hw, (dpr * hw) / 2, 0, dpr * hw, dpr * ox, dpr * oy);
  const poly = (pts, fill) => { ctx.fillStyle = fill; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fill(); };
  function box(cx, cy, w, d, z, h, top, left, right) {
    const x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - d / 2, y1 = cy + d / 2;
    poly([P(x0, y1, z), P(x1, y1, z), P(x1, y1, z + h), P(x0, y1, z + h)], left);
    poly([P(x1, y0, z), P(x1, y1, z), P(x1, y1, z + h), P(x1, y0, z + h)], right);
    poly([P(x0, y0, z + h), P(x1, y0, z + h), P(x1, y1, z + h), P(x0, y1, z + h)], top);
  }
  function roundRect(x, y, w, h, r, fill) { ctx.fillStyle = fill; ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill(); }

  function drawRocketPixels(x, y, s, flame, now) {
    // (x, y): roketin alt orta noktası, s: piksel boyu
    const rows = ROCKET.length, cols = ROCKET[0].length;
    const x0 = x - (cols * s) / 2, y0 = y - rows * s;
    ROCKET.forEach((row, r) => [...row].forEach((ch, c) => {
      if (ch === ".") return;
      ctx.fillStyle = ROCKET_TONE[ch];
      ctx.fillRect(x0 + c * s, y0 + r * s, s * 0.86, s * 0.86);
    }));
    if (!flame) return;
    for (let i = 0; i < 9; i++) {
      const fx = x - s * 2 + (i % 5) * s, fy = y + s * (1 + Math.floor(i / 5)) + seeded(i + Math.floor(now * 20)) * s * 1.5;
      ctx.fillStyle = i % 3 === 0 ? "#FFE08A" : i % 3 === 1 ? C.orange : C.brass;
      ctx.fillRect(fx, fy, s * 0.86, s * 0.86);
    }
  }

  function drawRoom(now) {
    const d = DEPTH * hw;
    screen();
    // zemin kalınlığı
    const L = P(0, N), B = P(N, N), R = P(N, 0);
    poly([L, B, [B[0], B[1] + d], [L[0], L[1] + d]], "#9C6A43");
    poly([B, R, [R[0], R[1] + d], [B[0], B[1] + d]], "#7E5233");

    // ahşap zemin, mutfak önünde karo
    world();
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, N, N); ctx.clip();
    for (let i = 0; i < N * 2; i++) { ctx.fillStyle = i % 2 ? "#D7A574" : "#CF9B69"; ctx.fillRect(0, i * 0.5, N, 0.5); }
    ctx.strokeStyle = "rgba(90,55,30,.18)"; ctx.lineWidth = 0.02;
    for (let i = 0; i < N * 2; i++) for (let j = 0; j < 4; j++) { const x = mod(j * 3 + i * 1.3, N); ctx.beginPath(); ctx.moveTo(x, i * 0.5); ctx.lineTo(x, i * 0.5 + 0.5); ctx.stroke(); }
    for (let x = 0; x < 3; x++) for (let y = 0; y < 11; y++) { ctx.fillStyle = (x + y) % 2 ? "#F3E7D3" : "#E4CBA6"; ctx.fillRect(x * 0.8, 1.4 + y * 0.6, 0.8, 0.6); }
    // masaların altında sıcak ışık
    for (const t of tables) {
      const g = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, 2.2);
      g.addColorStop(0, "rgba(255,214,150,.35)"); g.addColorStop(1, "rgba(255,214,150,0)");
      ctx.fillStyle = g; ctx.fillRect(t.x - 2.2, t.y - 2.2, 4.4, 4.4);
    }
    ctx.restore();

    // duvarlar
    screen();
    const lw = [P(0, 0, 0), P(0, N, 0), P(0, N, WALL), P(0, 0, WALL)];
    const rw = [P(0, 0, 0), P(N, 0, 0), P(N, 0, WALL), P(0, 0, WALL)];
    poly(lw, "#EADCC6"); poly(rw, "#F3E7D5");
    poly([P(0, 0, 0), P(0, N, 0), P(0, N, 1.0), P(0, 0, 1.0)], "#4F7F63");
    poly([P(0, 0, 0), P(N, 0, 0), P(N, 0, 1.0), P(0, 0, 1.0)], "#5E8F72");
    poly([P(0, 0, 1.0), P(0, N, 1.0), P(0, N, 1.08), P(0, 0, 1.08)], "#E7D8BE");
    poly([P(0, 0, 1.0), P(N, 0, 1.0), P(N, 0, 1.08), P(0, 0, 1.08)], "#FFF6E8");
    poly([P(0, 0, WALL), P(0, N, WALL), P(0, N, WALL + 0.1), P(0, 0, WALL + 0.1)], "#C9A57E");
    poly([P(0, 0, WALL), P(N, 0, WALL), P(N, 0, WALL + 0.1), P(0, 0, WALL + 0.1)], "#D9B892");

    const windowQ = (pts) => {
      const g = ctx.createLinearGradient(0, pts[3][1], 0, pts[0][1]);
      g.addColorStop(0, "#BFDDED"); g.addColorStop(1, "#F8E3C8");
      poly(pts, "#FFF8EE");
      const inset = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
      const c = pts.map((p, i) => inset(p, pts[(i + 2) % 4], 0.06));
      poly(c, g);
      ctx.strokeStyle = "#FFF8EE"; ctx.lineWidth = Math.max(1.5, hw * 0.07);
      const m1 = inset(c[0], c[1], 0.5), m2 = inset(c[3], c[2], 0.5), m3 = inset(c[0], c[3], 0.5), m4 = inset(c[1], c[2], 0.5);
      ctx.beginPath(); ctx.moveTo(...m1); ctx.lineTo(...m2); ctx.moveTo(...m3); ctx.lineTo(...m4); ctx.stroke();
    };
    windowQ([P(0.4, 0, 1.35), P(1.7, 0, 1.35), P(1.7, 0, 2.65), P(0.4, 0, 2.65)]);
    windowQ([P(7.8, 0, 1.35), P(8.7, 0, 1.35), P(8.7, 0, 2.65), P(7.8, 0, 2.65)]);
    windowQ([P(0, 2.3, 1.45), P(0, 3.6, 1.45), P(0, 3.6, 2.65), P(0, 2.3, 2.65)]);
    windowQ([P(0, 5.8, 1.45), P(0, 7.1, 1.45), P(0, 7.1, 2.65), P(0, 5.8, 2.65)]);

    // duvardaki neon logo: QR-roket
    rightWall();
    const s = 0.12, lx = 2.95, top = 2.92;
    ctx.save();
    ctx.shadowColor = "rgba(238,122,58,.9)"; ctx.shadowBlur = hw * 0.5 * (0.85 + 0.15 * Math.sin(now * 3));
    ROCKET.forEach((row, r) => [...row].forEach((ch, c) => {
      if (ch === ".") return;
      ctx.fillStyle = ROCKET_TONE[ch];
      ctx.fillRect(lx - (15 * s) / 2 + c * s, -(top - r * s), s * 0.86, s * 0.86);
    }));
    ctx.restore();
    ctx.fillStyle = C.ink; ctx.font = `${0.19}px "Young Serif", Georgia, serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("QRoket", lx, -(top - 10.85 * s));
    // yasal fiyat listesi panosu
    roundRect(4.4, -2.8, 3.1, 1.55, 0.08, C.ink);
    ctx.textAlign = "left"; ctx.fillStyle = C.orange; ctx.font = `600 0.14px "IBM Plex Mono", monospace`;
    ctx.fillText(T.board, 4.58, -2.6);
    const rows = [["Mercimek çorbası", "155 ₺"], ["İskender", "420 ₺"], ["Izgara köfte", "380 ₺"], ["Ayran", "60 ₺"], [T.cover, T.none]];
    ctx.font = `0.15px "Figtree", sans-serif`;
    rows.forEach(([n, p], i) => {
      const y = -2.36 + i * 0.22;
      ctx.fillStyle = "#F6F2EA"; ctx.textAlign = "left"; ctx.fillText(n, 4.58, y);
      ctx.textAlign = "right"; ctx.fillStyle = i === 0 && Math.sin(now * 2) > 0 ? C.orange : "#F6F2EA"; ctx.fillText(p, 7.32, y);
    });
    ctx.textBaseline = "alphabetic";
  }

  /* --- insanlar ve eşyalar --- */
  function person(x, y, z, look, o = {}) {
    const [sx, sy] = P(x, y, z);
    const u = hw;
    const bob = o.walk ? -Math.abs(Math.sin(o.walk)) * u * 0.06 : 0;
    ctx.save();
    ctx.translate(sx, sy + bob);
    if (o.standing) {
      ctx.fillStyle = "#2B2F3A";
      const sw = o.walk ? Math.sin(o.walk) * u * 0.06 : 0;
      ctx.fillRect(-u * 0.13 + sw, -u * 0.5, u * 0.1, u * 0.5); ctx.fillRect(u * 0.03 - sw, -u * 0.5, u * 0.1, u * 0.5);
      roundRect(-u * 0.21, -u * 1.1, u * 0.42, u * 0.66, u * 0.12, look.shirt);
      if (o.apron) roundRect(-u * 0.17, -u * 0.8, u * 0.34, u * 0.5, u * 0.05, "#FFFFFF");
      ctx.translate(0, -u * 1.1);
    } else {
      roundRect(-u * 0.22, -u * 0.55, u * 0.44, u * 0.55, u * 0.14, look.shirt);
      ctx.translate(0, -u * 0.55);
    }
    ctx.fillStyle = look.skin; ctx.beginPath(); ctx.arc(0, -u * 0.17, u * 0.19, 0, 7); ctx.fill();
    ctx.fillStyle = look.hair; ctx.beginPath(); ctx.arc(0, -u * 0.21, u * 0.2, Math.PI * 1.05, Math.PI * 1.95); ctx.fill();
    if (o.hat) { roundRect(-u * 0.17, -u * 0.62, u * 0.34, u * 0.3, u * 0.08, "#FFFFFF"); ctx.fillStyle = "#FFFFFF"; ctx.beginPath(); ctx.arc(0, -u * 0.6, u * 0.2, 0, 7); ctx.fill(); }
    if (o.phone) {
      const dir = o.phone.dir;
      ctx.save(); ctx.translate(dir * u * 0.2, u * 0.22); ctx.rotate(dir * -0.2);
      roundRect(-u * 0.08, -u * 0.13, u * 0.16, u * 0.26, u * 0.03, C.ink);
      roundRect(-u * 0.065, -u * 0.11, u * 0.13, u * 0.21, u * 0.02, o.phone.screen);
      if (o.phone.mark) { ctx.fillStyle = o.phone.markColor; ctx.font = `800 ${u * 0.14}px Figtree, sans-serif`; ctx.textAlign = "center"; ctx.fillText(o.phone.mark, 0, u * 0.04); }
      ctx.restore();
      ctx.fillStyle = look.skin; ctx.beginPath(); ctx.arc(dir * u * 0.2, u * 0.33, u * 0.06, 0, 7); ctx.fill();
    }
    if (o.tray) {
      ctx.fillStyle = "#C9CED8"; ctx.beginPath(); ctx.ellipse(u * 0.3, u * 0.45, u * 0.3, u * 0.08, 0, 0, 7); ctx.fill();
      const g = ctx.createLinearGradient(u * 0.08, 0, u * 0.52, 0);
      g.addColorStop(0, "#8D93A3"); g.addColorStop(0.4, "#F3F2FA"); g.addColorStop(1, "#8D93A3");
      ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(u * 0.3, u * 0.42, u * 0.22, u * 0.2, 0, Math.PI, 0); ctx.fill();
      ctx.fillStyle = "#8D93A3"; ctx.beginPath(); ctx.arc(u * 0.3, u * 0.2, u * 0.035, 0, 7); ctx.fill();
    }
    ctx.restore();
  }

  function chair(x, y, back) {
    box(x, y, 0.46, 0.46, 0.4, 0.07, "#B47A4C", "#8A5A3C", "#7A4E33");
    for (const [dx, dy] of [[-0.18, 0.18], [0.18, 0.18], [0.18, -0.18]]) box(x + dx, y + dy, 0.05, 0.05, 0, 0.4, "#6B4430", "#6B4430", "#5A3726");
    return () => box(x + back[0] * 0.22, y + back[1] * 0.22, back[0] ? 0.06 : 0.46, back[1] ? 0.06 : 0.46, 0.47, 0.5, "#B47A4C", "#8A5A3C", "#7A4E33");
  }

  function qrStand(sx, sy, glow) {
    const u = hw;
    if (glow > 0) { ctx.fillStyle = `rgba(238,122,58,${0.35 * glow})`; ctx.beginPath(); ctx.arc(sx, sy - u * 0.25, u * 0.38, 0, 7); ctx.fill(); }
    roundRect(sx - u * 0.17, sy - u * 0.46, u * 0.34, u * 0.42, u * 0.04, "#FFFFFF");
    ctx.strokeStyle = C.orange; ctx.lineWidth = Math.max(1, u * 0.03); ctx.strokeRect(sx - u * 0.17, sy - u * 0.46, u * 0.34, u * 0.42);
    const q = u * 0.075;
    for (const [dx, dy] of [[-0.13, -0.41], [0.03, -0.41], [-0.13, -0.24]]) { ctx.fillStyle = C.ink; ctx.fillRect(sx + dx * u, sy + dy * u, q * 1.3, q * 1.3); }
    for (let i = 0; i < 6; i++) { ctx.fillStyle = i % 2 ? C.orange : C.ink; ctx.fillRect(sx + (0.02 + (i % 3) * 0.04) * u, sy + (-0.24 + Math.floor(i / 3) * 0.05) * u, q * 0.45, q * 0.45); }
  }

  function plate(sx, sy, food) {
    ctx.fillStyle = "#FFFFFF"; ctx.beginPath(); ctx.ellipse(sx, sy, hw * 0.2, hw * 0.1, 0, 0, 7); ctx.fill();
    ctx.fillStyle = food; ctx.beginPath(); ctx.ellipse(sx, sy - hw * 0.02, hw * 0.12, hw * 0.06, 0, 0, 7); ctx.fill();
  }

  function bubble(x, y, text, o = {}) {
    const fs = Math.max(10, hw * 0.3);
    ctx.font = `${o.bold ? 700 : 600} ${fs}px Figtree, sans-serif`;
    ctx.direction = o.rtl ? "rtl" : "ltr";
    const w = ctx.measureText(text).width + fs * 1.3 + (o.badge ? fs * 1.6 : 0), h = fs * 1.9;
    const bx = clamp(x - w / 2, 6, W - w - 6), by = y - h - fs * 0.6;
    ctx.globalAlpha = o.alpha ?? 1;
    ctx.fillStyle = "rgba(30,36,51,.18)"; ctx.beginPath(); ctx.roundRect(bx, by + 3, w, h, h / 2); ctx.fill();
    roundRect(bx, by, w, h, h / 2, o.bg || "#FFFFFF");
    ctx.beginPath(); ctx.moveTo(x - fs * 0.4, by + h - 1); ctx.lineTo(x, by + h + fs * 0.55); ctx.lineTo(x + fs * 0.3, by + h - 1); ctx.fill();
    let tx = bx + fs * 0.65;
    if (o.badge) {
      roundRect(tx, by + h / 2 - fs * 0.62, fs * 1.3, fs * 1.24, fs * 0.3, o.badgeBg);
      ctx.fillStyle = o.badgeFg; ctx.font = `800 ${fs * 0.62}px "IBM Plex Mono", monospace`; ctx.textAlign = "center"; ctx.direction = "ltr";
      ctx.fillText(o.badge, tx + fs * 0.65, by + h / 2 + fs * 0.22);
      tx += fs * 1.6;
      ctx.font = `${o.bold ? 700 : 600} ${fs}px Figtree, sans-serif`; ctx.direction = o.rtl ? "rtl" : "ltr";
    }
    ctx.fillStyle = o.fg || C.ink; ctx.textAlign = o.rtl ? "right" : "left";
    ctx.fillText(text, o.rtl ? bx + w - fs * 0.65 : tx, by + h / 2 + fs * 0.35);
    ctx.globalAlpha = 1; ctx.direction = "ltr"; ctx.textAlign = "left";
  }

  /* Bir masanın tamamı: arka sandalye ve misafir, masa, öndeki sandalye ve misafir */
  function tableItems(t, now) {
    const ph = phaseOf(t, now), cyc = cycleOf(t, now), ord = orderOf(t, cyc);
    const items = [];
    const screenState = (g) => {
      if (ph < 1.2 && g === 0) return { screen: "#FFF3E8", mark: "QR", markColor: C.orange };
      if (ph < 4.6 && g === 0) return { screen: "#FFF3E8", mark: ord.lang.code, markColor: C.ink };
      if (ph >= 12.8 && ph < 14.4) return { screen: "#E5F4EA", mark: "✓", markColor: C.sage };
      return { screen: "#39415A", mark: "", markColor: "" };
    };
    t.seats.forEach((s, g) => {
      const dir = s.back[0] ? -1 : 1;
      items.push({ d: s.x + s.y, draw: () => {
        const backRest = chair(s.x, s.y, s.back);
        if (g === 0) backRest();
        person(s.x, s.y, 0.47, t.guests[g], { phone: { dir, ...screenState(g) } });
        if (g === 1) backRest();
      } });
    });
    items.push({ d: t.x + t.y, draw: () => {
      box(t.x, t.y, 0.12, 0.12, 0, 0.72, "#5A3A28", "#5A3A28", "#4A2E1E");
      world(0.66); ctx.fillStyle = "#A86F42"; ctx.beginPath(); ctx.ellipse(t.x, t.y, 0.68, 0.68, 0, 0, 7); ctx.fill();
      world(0.72); ctx.fillStyle = "#E2AE78"; ctx.beginPath(); ctx.ellipse(t.x, t.y, 0.68, 0.68, 0, 0, 7); ctx.fill();
      screen();
      const [cx, cy] = P(t.x, t.y, 0.72);
      if (ph >= 8.4 && ph < 14.4) { plate(cx - hw * 0.32, cy + hw * 0.05, ord.lang.item === "İskender" ? "#B5532E" : ord.lang.item === "Izgara köfte" ? "#7A4A2E" : "#E09A3A"); plate(cx + hw * 0.3, cy + hw * 0.08, "#E8D9A8"); }
      qrStand(cx, cy, ph < 1.2 ? 0.6 + 0.4 * Math.sin(now * 12) : 0);
      // okutma ışını
      if (ph < 1.2) {
        const s = t.seats[0], [px, py] = P(s.x, s.y, 0.47);
        ctx.strokeStyle = C.orange; ctx.lineWidth = Math.max(1.5, hw * 0.05); ctx.setLineDash([hw * 0.12, hw * 0.1]); ctx.lineDashOffset = -now * hw;
        ctx.beginPath(); ctx.moveTo(px + hw * 0.2, py - hw * 0.35); ctx.lineTo(cx, cy - hw * 0.3); ctx.stroke(); ctx.setLineDash([]);
      }
    } });
    return items;
  }

  function overlays(t, now) {
    const ph = phaseOf(t, now), cyc = cycleOf(t, now), ord = orderOf(t, cyc);
    const s = t.seats[0], [hx, hy] = P(s.x, s.y, 1.45), [cx, cy] = P(t.x, t.y, 1.6);
    const fade = (a, b) => clamp(Math.min((ph - a) / 0.25, (b - ph) / 0.25), 0, 1);
    if (ph >= 1.2 && ph < 2.5) bubble(hx, hy, ord.lang.q, { rtl: ord.lang.rtl, alpha: fade(1.2, 2.5), badge: ord.lang.code, badgeBg: "#F3EEE6", badgeFg: C.ink });
    if (ph >= 2.4 && ph < 3.7) bubble(cx, cy, ord.lang.a, { rtl: ord.lang.rtl, alpha: fade(2.4, 3.7), bg: C.orange, fg: "#FFFFFF", badge: "AI", badgeBg: "#FFFFFF", badgeFg: C.orange, bold: true });
    // sipariş fişi mutfağa uçar
    if (ph >= 3.6 && ph < 4.6) {
      const k = smooth((ph - 3.6) / 1.0), [ax, ay] = P(t.x, t.y, 1.2), [bx, by] = P(PASS.x, PASS.y, 1.4);
      const x = ax + (bx - ax) * k, y = ay + (by - ay) * k - Math.sin(k * Math.PI) * hw * 1.6;
      ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(k * 9) * 0.3);
      roundRect(-hw * 0.24, -hw * 0.3, hw * 0.48, hw * 0.6, hw * 0.04, "#FFFFFF");
      ctx.fillStyle = C.orange; ctx.fillRect(-hw * 0.24, -hw * 0.3, hw * 0.48, hw * 0.1);
      ctx.fillStyle = "#C9CED8"; for (let i = 0; i < 3; i++) ctx.fillRect(-hw * 0.16, -hw * 0.1 + i * hw * 0.12, hw * 0.32 - i * hw * 0.06, hw * 0.04);
      ctx.restore();
    }
    // ödeme
    if (ph >= 12.8 && ph < 14.3) bubble(cx, cy, `${fmt(ord.total)} ₺ · ${T.split(ord.split)}`, { alpha: fade(12.8, 14.3), bg: C.sage, fg: "#FFFFFF", badge: "✓", badgeBg: "#FFFFFF", badgeFg: C.sage, bold: true });
  }

  function drawCounter(now, ringAge) {
    const cx = PASS.x, cy = PASS.y;
    box(cx, cy, 1.0, 5.8, 0, 1.0, "#F6F2EA", "#8A5A3C", "#A06A45");
    poly([P(cx + 0.5, cy - 2.9, 0.86), P(cx + 0.5, cy + 2.9, 0.86), P(cx + 0.5, cy + 2.9, 0.94), P(cx + 0.5, cy - 2.9, 0.94)], C.orange);
    // tencereler ve buhar
    for (const py of [2.5, 6.9]) {
      const [px, pyy] = P(cx, py, 1.0);
      roundRect(px - hw * 0.28, pyy - hw * 0.38, hw * 0.56, hw * 0.38, hw * 0.06, "#3A3F4C");
      ctx.fillStyle = "#5A6070"; ctx.beginPath(); ctx.ellipse(px, pyy - hw * 0.38, hw * 0.28, hw * 0.09, 0, 0, 7); ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.lineWidth = Math.max(1.2, hw * 0.05); ctx.lineCap = "round";
      for (let i = 0; i < 3; i++) {
        const k = mod(now * 0.6 + i / 3, 1);
        ctx.globalAlpha = 1 - k;
        ctx.beginPath();
        for (let j = 0; j <= 8; j++) { const yy = pyy - hw * (0.5 + k * 1.1) - j * hw * 0.06, xx = px + (i - 1) * hw * 0.14 + Math.sin(j * 0.9 + now * 3 + i) * hw * 0.05; j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    // servis zili
    const [bx, by] = P(cx, cy + 0.7, 1.0);
    const wob = ringAge < 0.6 ? Math.sin(ringAge * 40) * 0.15 * (1 - ringAge / 0.6) : 0;
    ctx.save(); ctx.translate(bx, by); ctx.rotate(wob);
    ctx.fillStyle = "#4A3524"; ctx.beginPath(); ctx.ellipse(0, 0, hw * 0.24, hw * 0.07, 0, 0, 7); ctx.fill();
    const g = ctx.createLinearGradient(-hw * 0.2, 0, hw * 0.2, 0);
    g.addColorStop(0, "#8A6420"); g.addColorStop(0.4, "#F2CF7E"); g.addColorStop(1, "#7A5518");
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, -hw * 0.02, hw * 0.2, hw * 0.2, 0, Math.PI, 0); ctx.fill();
    ctx.fillStyle = "#A8792B"; ctx.fillRect(-hw * 0.03, -hw * 0.3, hw * 0.06, hw * 0.09);
    ctx.restore();
    if (ringAge < 0.6) {
      ctx.strokeStyle = `rgba(217,164,65,${1 - ringAge / 0.6})`; ctx.lineWidth = Math.max(1.5, hw * 0.05);
      for (const r of [0.35, 0.55]) { ctx.beginPath(); ctx.arc(bx, by - hw * 0.12, hw * (r + ringAge * 0.4), -2.4, -0.75); ctx.stroke(); }
    }
  }

  function plant(x, y) {
    box(x, y, 0.5, 0.5, 0, 0.45, "#D2553F", "#B5432F", "#93351F");
    const [sx, sy] = P(x, y, 0.45);
    for (const [dx, dy, r, c] of [[0, -0.42, 0.34, "#3E8A5E"], [-0.22, -0.25, 0.24, "#2F7049"], [0.24, -0.28, 0.25, "#2F7049"], [-0.06, -0.62, 0.2, "#5DAA78"]]) {
      ctx.fillStyle = c; ctx.beginPath(); ctx.arc(sx + dx * hw, sy + dy * hw, r * hw, 0, 7); ctx.fill();
    }
  }

  function frame(now) {
    // olaylar: sipariş, zil, ödeme
    let ringAt = -10;
    for (const t of tables) {
      const ph = phaseOf(t, now), cyc = cycleOf(t, now), ord = orderOf(t, cyc);
      if (crossed(t.prev, ph, 3.6)) { st.orders += 1; st.lastOrder = { t, ord, no: st.orders }; }
      if (crossed(t.prev, ph, 13.2)) {
        st.revenue += ord.total; st.tips += ord.tip; st.lastPay = { t, ord };
        const [rx, ry] = P(t.x, t.y, 0.9);
        st.rockets.push({ x: rx, y: ry, t: now });
        ui.tkicker.textContent = T.closed(t.no);
        ui.tname.textContent = T.paid(fmt(ord.total));
        ui.ttext.textContent = `${T.split(ord.split)} · ${T.tip(fmt(ord.tip))}`;
        ui.toast.classList.add("show"); st.toastUntil = now + 2.4;
      }
      if (ph >= 1.2 && ph < 3.7) st.speaking = ord;
      if (ph >= 6.6 && ph < 7.3) ringAt = now - (ph - 6.6);
      t.prev = ph;
    }
    if (now > st.toastUntil) ui.toast.classList.remove("show");

    screen();
    ctx.clearRect(0, 0, W, H);
    drawRoom(now);

    // garson: sırası gelen masaya servis
    let waiter = { ...WAITER_HOME, walk: 0, tray: false };
    for (const t of tables) {
      const ph = phaseOf(t, now);
      if (ph < 7.0 || ph >= 9.8) continue;
      const a = WAITER_HOME, b = t.approach;
      const k = ph < 8.2 ? smooth((ph - 7.0) / 1.2) : ph < 8.6 ? 1 : 1 - smooth((ph - 8.6) / 1.2);
      waiter = { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k, walk: ph < 8.2 || ph >= 8.6 ? now * 12 : 0, tray: ph < 8.4 };
    }
    const dishReady = tables.some((t) => { const ph = phaseOf(t, now); return ph >= 6.6 && ph < 7.0; });

    screen();
    const items = [
      { d: PASS.x + PASS.y, draw: () => {
        drawCounter(now, now - ringAt);
        if (dishReady) { const [px, py] = P(PASS.x, PASS.y, 1.0); plate(px, py, "#B5532E"); }
      } },
      { d: 0.45 + 3.6, draw: () => person(0.45, 3.6, 0, { shirt: "#FFFFFF", skin: SKINS[1], hair: HAIRS[0] }, { standing: true, hat: true, walk: now * 3 }) },
      { d: waiter.x + waiter.y, draw: () => person(waiter.x, waiter.y, 0, { shirt: C.ink, skin: SKINS[4], hair: HAIRS[1] }, { standing: true, apron: true, walk: waiter.walk, tray: waiter.tray }) },
      { d: 8.4 + 0.7, draw: () => plant(8.4, 0.7) },
      { d: 0.7 + 8.4, draw: () => plant(0.7, 8.4) },
      ...tables.flatMap((t) => tableItems(t, now)),
    ].sort((a, b) => a.d - b.d);
    for (const it of items) it.draw();

    // balonlar ve fişler
    screen();
    for (const t of tables) overlays(t, now);

    // havalanan QR-roketler ve dumanları
    st.rockets = st.rockets.filter((r) => now - r.t < 2.4);
    for (const r of st.rockets) {
      const k = (now - r.t) / 2.4, y = r.y - Math.pow(k, 1.7) * (r.y + hw * 3), x = r.x + Math.sin(k * 6) * hw * 0.15;
      if (seeded(Math.floor(now * 30) + r.x) > 0.4) st.smoke.push({ x: x + (Math.random() - 0.5) * hw * 0.3, y: y + hw * 0.3, t: now });
      drawRocketPixels(x, y, hw * 0.055, true, now);
    }
    st.smoke = st.smoke.filter((p) => now - p.t < 1.0);
    for (const p of st.smoke) {
      const k = (now - p.t) / 1.0;
      ctx.fillStyle = `rgba(246,242,234,${0.6 * (1 - k)})`; ctx.beginPath(); ctx.arc(p.x, p.y + k * hw * 0.4, hw * (0.08 + k * 0.22), 0, 7); ctx.fill();
    }

    updateHud(now);
  }

  const last = {};
  const set = (key, val, fn) => { if (last[key] !== val) { last[key] = val; fn(val); } };
  const STATE_COLORS = { scan: C.orange, chat: C.orange, kitchen: C.brass, serve: C.sky, eat: C.sage, pay: C.tomato, idle: "#E7DED1" };
  function stateOf(ph) {
    if (ph < 1.2) return "scan";
    if (ph < 3.7) return "chat";
    if (ph < 7.0) return "kitchen";
    if (ph < 8.6) return "serve";
    if (ph < 12.8) return "eat";
    if (ph < 14.4) return "pay";
    return "idle";
  }
  function updateHud(now) {
    tables.forEach((t, i) => set(`bead${i}`, stateOf(phaseOf(t, now)), (s) => (ui.beads[i].style.fill = STATE_COLORS[s])));
    set("orders", st.orders, (v) => (ui.orders.textContent = v));
    set("revenue", st.revenue, (v) => (ui.revenue.textContent = T.revenue(fmt(v))));
    set("tips", st.tips, (v) => (ui.tips.textContent = T.tips(fmt(v))));
    const lo = st.lastOrder;
    if (lo) {
      const ph = phaseOf(lo.t, now);
      const state = T.states[ph < 7.0 ? 0 : ph < 8.6 ? 1 : 2];
      set("order", lo.no, () => { ui.order.textContent = `${T.table(lo.t.no)} · ${lo.ord.qty} × ${lo.ord.lang.item}`; ui.ordertag.textContent = `#${lo.no}`; });
      set("ordersub", state, (v) => (ui.ordersub.textContent = `${lo.ord.lang.code} · ${T.took} · ${v}`));
      set("orderbar", Math.round(clamp((ph - 3.6) / 5.0, 0, 1) * 20), (v) => (ui.orderbar.style.width = `${v * 5}%`));
    }
    const lp = st.lastPay;
    if (lp) {
      const ph = phaseOf(lp.t, now);
      set("pay", lp.t.no * 1e6 + lp.ord.total, () => { ui.pay.textContent = `${T.table(lp.t.no)} · ${fmt(lp.ord.total)} ₺`; ui.paysub.textContent = `${T.split(lp.ord.split)} · ${T.tip(fmt(lp.ord.tip))}`; });
      set("paybar", Math.round(clamp((ph - 12.8) / 0.6, 0, 1) * 10), (v) => (ui.paybar.style.width = `${v * 10}%`));
    }
    const sp = st.speaking;
    if (sp) set("lang", sp.lang.code + sp.lang.q, () => { ui.lang.textContent = sp.lang.name; ui.said.textContent = `“${sp.lang.q}”`; });
  }

  let clock = 0;
  layout();
  // Başlangıçta göstergeler boş kalmasın: ilk sipariş ve ödeme hazır
  tables.forEach((t) => (t.prev = phaseOf(t, 0)));
  st.lastOrder = { t: tables[0], ord: orderOf(tables[0], -1), no: st.orders };
  st.lastPay = { t: tables[1], ord: orderOf(tables[1], -1) };
  st.speaking = orderOf(tables[0], 0);

  root.addEventListener("click", (e) => {
    const b = root.getBoundingClientRect();
    st.rockets.push({ x: e.clientX - b.left, y: e.clientY - b.top, t: clock });
  });

  if (reduced) {
    // Hareket azaltma: ödeme ve roket anında tek kare
    const still = () => { clock = 13.6; tables.forEach((t) => (t.prev = phaseOf(t, 13.0))); frame(clock); };
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
    frame(clock);
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
}

const el = document.getElementById("qrocket-game");
if (el) mountQrocketGame(el);
