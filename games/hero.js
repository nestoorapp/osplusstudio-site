const root = document.querySelector(".os-hero");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!root || reduced) {
  root?.classList.add("is-formed");
} else {
  boot(root).catch(() => {
    root.classList.remove("is-running");
    root.classList.add("is-formed");
  });
}

const INK = "#ECEEE8";
const PLUS = "#8095FF";

async function boot(root) {
  const canvas = root.querySelector("canvas");
  const copy = root.querySelector(".os-copy");
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) {
    root.classList.add("is-formed");
    return;
  }

  let fontOk = false;
  try {
    await Promise.race([
      document.fonts.load('800 180px "Bricolage Grotesque"').then(() => { fontOk = true; }),
      new Promise((resolve) => setTimeout(resolve, 1800))
    ]);
  } catch (e) { /* draw with the fallback face */ }

  const mobileQuery = matchMedia("(max-width: 760px)");
  let w = 0;
  let h = 0;
  let size = 3;
  let latticeStep = 3;
  let aimed = false;
  let wasTop = true;
  let particles = [];
  let raf = 0;
  let playing = false;
  let pointer = { x: 0, y: 0, on: false };
  const t0 = performance.now();

  function sample() {
    const mobile = mobileQuery.matches;
    const step = mobile ? 4 : 3;
    const cap = mobile ? 900 : 2400;
    const off = document.createElement("canvas");
    off.width = Math.max(1, Math.round(w));
    off.height = Math.max(1, Math.round(h));
    const g = off.getContext("2d", { willReadFrequently: true });
    const headerH = root.querySelector("header")?.offsetHeight || 72;
    const bandTop = headerH + 12;
    const bandBottom = Math.min(h * 0.58, h - 150);
    const fontSize = Math.max(72, Math.min(w * 0.2, (bandBottom - bandTop) * 0.78, 248));
    const cy = bandTop + (bandBottom - bandTop) * 0.46;
    g.font = `800 ${fontSize}px "Bricolage Grotesque", "Arial Black", sans-serif`;
    g.textBaseline = "middle";
    g.textAlign = "left";
    if ("letterSpacing" in g) g.letterSpacing = "-0.045em";
    const osW = g.measureText("OS").width;
    const plusW = g.measureText("+").width;
    const x0 = (off.width - osW - plusW) / 2;
    g.fillStyle = INK;
    g.fillText("OS", x0, cy);
    g.fillStyle = PLUS;
    g.fillText("+", x0 + osW - fontSize * 0.02, cy);
    root.style.setProperty("--copy-top", Math.round(cy + fontSize * 0.42) + "px");

    const data = g.getImageData(0, 0, off.width, off.height).data;
    // Every glyph is sampled on one regular lattice anchored at the text origin, so the O, S and + stay
    // symmetric. When there are too many points the lattice is widened rather than thinned point by point,
    // which used to leave diagonal stripes in the letters.
    const lattice = (s) => {
      const pts = [];
      const ox = ((Math.round(x0) % s) + s) % s;
      const oy = ((Math.round(cy) % s) + s) % s;
      for (let y = oy; y < off.height; y += s) {
        for (let x = ox; x < off.width; x += s) {
          const i = (y * off.width + x) * 4;
          if (data[i + 3] < 96) continue;
          pts.push({ x, y, plus: data[i + 2] > data[i] + 18 && data[i + 2] > 140 });
        }
      }
      return pts;
    };
    let s = step;
    let pts = lattice(s);
    while (pts.length > cap && s < 14) pts = lattice(++s);
    size = s * 0.82;
    latticeStep = s;
    return pts;
  }

  function rebuild(scatter) {
    const rect = canvas.getBoundingClientRect();
    const nw = Math.round(rect.width);
    const nh = Math.round(rect.height);
    if (nw < 2 || nh < 2) return;
    w = nw;
    h = nh;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const formed = root.classList.contains("is-formed");
    // Particle positions are kept in page coordinates; the canvas is fixed and draws them at y - scrollY.
    particles = sample().map((pt) => ({
      x: scatter && !formed ? Math.random() * w : pt.x,
      y: scatter && !formed ? Math.random() * h + scrollY : pt.y,
      vx: 0,
      vy: 0,
      plus: pt.plus,
      jx: Math.random() * 2 - 1,
      jy: Math.random() * 2 - 1,
      hx: pt.x,
      hy: pt.y
    }));
    aimed = aim();
  }

  // On scroll the logo's pixels fly down and settle on the first product name in the products section.
  // Targets are sampled from that word at its resting place on the page.
  function aim() {
    const word = document.querySelector(".app-word");
    const text = word && word.firstChild;
    if (!text || !particles.length) return false;
    const range = document.createRange();
    range.selectNodeContents(word);
    const box = range.getBoundingClientRect();
    if (box.width < 2) return false;
    // remove the sticky stage's current offset and the reveal animation's slide so the word is at rest
    const sec = word.closest("section");
    const stage = word.closest(".wrap");
    const stuck = sec && stage ? stage.getBoundingClientRect().top - sec.getBoundingClientRect().top : 0;
    const picker = word.parentElement;
    const slide = new DOMMatrixReadOnly(getComputedStyle(picker).transform === "none" ? undefined : getComputedStyle(picker).transform).m42;
    const top = box.top - stuck - slide + scrollY;
    const cs = getComputedStyle(word);
    const pad = 20;
    const off = document.createElement("canvas");
    off.width = Math.max(1, Math.round(w));
    off.height = Math.max(1, Math.round(box.height + pad * 2));
    const g = off.getContext("2d", { willReadFrequently: true });
    g.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    if ("letterSpacing" in g) g.letterSpacing = cs.letterSpacing;
    g.textBaseline = "middle";
    g.fillStyle = "#fff";
    g.fillText(word.textContent, box.left, pad + box.height / 2);
    const data = g.getImageData(0, 0, off.width, off.height).data;
    const s = Math.max(3, Math.round(latticeStep * 0.6));
    const targets = [];
    for (let y = 0; y < off.height; y += s) {
      for (let x = 0; x < off.width; x += s) {
        if (data[(y * off.width + x) * 4 + 3] > 110) targets.push({ x, y: y - pad + top });
      }
    }
    if (targets.length < 20) return false;
    targets.sort((a, b) => a.x - b.x || a.y - b.y);
    const minX = targets[0].x;
    const span = Math.max(1, targets[targets.length - 1].x - minX);
    const order = particles.slice().sort((a, b) => a.hx - b.hx || a.hy - b.hy);
    order.forEach((p, i) => {
      const t = targets[Math.floor((i / order.length) * targets.length)];
      p.ax = t.x;
      p.ay = t.y;
      p.bin = Math.min(3, Math.floor(((t.x - minX) / span) * 4));
    });
    const c1 = word.style.getPropertyValue("--w1") || "#F2A93B";
    const c2 = word.style.getPropertyValue("--w2") || "#FCE6B8";
    wordColors = [0, 1, 2, 3].map((i) => mix(c1, c2, i / 3));
    wordSize = s * 0.86;
    return true;
  }
  let wordColors = [];
  let wordSize = 3;
  function mix(a, b, t) {
    const pa = parseInt(a.trim().slice(1), 16);
    const pb = parseInt(b.trim().slice(1), 16);
    const ch = (v, sh) => (v >> sh) & 255;
    const c = [16, 8, 0].map((sh) => Math.round(ch(pa, sh) + (ch(pb, sh) - ch(pa, sh)) * t));
    return `rgb(${c[0]},${c[1]},${c[2]})`;
  }
  const smooth = (a, b, v) => {
    const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };

  function scrollP() {
    const span = root.offsetHeight || h || 1;
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    const p = y / (span * 0.92);
    return p < 0 ? 0 : p > 1 ? 1 : p;
  }

  function explode(cx, cy) {
    for (const p of particles) {
      const dx = p.x - cx;
      const dy = p.y - cy;
      const d = Math.hypot(dx, dy) || 1;
      const f = 8 + Math.random() * 8;
      p.vx += (dx / d) * f;
      p.vy += (dy / d) * f;
    }
  }

  function frame(now) {
    if (!playing) return;
    const sp = scrollP();
    if (!root.classList.contains("is-formed") && now - t0 > 1650) root.classList.add("is-formed");
    if (root.classList.contains("is-formed") && sp > 0.002) copy.style.opacity = String(Math.max(0, 1 - sp * 1.25));
    else copy.style.removeProperty("opacity");

    // re-measure the product word each time the visitor starts scrolling from the top
    if (sp > 0 && wasTop) aimed = aim();
    wasTop = sp === 0;
    root.classList.toggle("is-moving", sp > 0.01);

    const R = Math.min(86, w * 0.07);
    const R2 = R * R;
    const cx = w * 0.5;
    const k = aimed ? 0.06 : 0.042;
    const damp = 0.86;
    const e = smooth(0.06, 0.9, sp);
    const wob = Math.sin(Math.PI * e);
    for (const p of particles) {
      if (aimed) {
        p.tx = p.hx + (p.ax - p.hx) * e + p.jx * wob * w * 0.2;
        p.ty = p.hy + (p.ay - p.hy) * e + p.jy * wob * h * 0.28;
      } else {
        p.tx = p.hx + (p.hx - cx) * sp * 1.15 + p.jx * sp * w * 0.22;
        p.ty = p.hy + sp * h * 0.9 + p.jy * sp * 70;
      }
      p.vx = (p.vx + (p.tx - p.x) * k) * damp;
      p.vy = (p.vy + (p.ty - p.y) * k) * damp;
      if (pointer.on && sp < 0.2) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R2 && d2 > 1) {
          const d = Math.sqrt(d2);
          const f = (1 - d / R) * 4.2;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }
      if (p.vx > 42) p.vx = 42;
      else if (p.vx < -42) p.vx = -42;
      if (p.vy > 42) p.vy = 42;
      else if (p.vy < -42) p.vy = -42;
      p.x += p.vx;
      p.y += p.vy;
    }

    ctx.clearRect(0, 0, w, h);
    const sy = scrollY;
    // without a target the cloud just fades; with one it stays bright and fades only as it lands on the word
    const alpha = aimed ? 1 - smooth(0.86, 1, sp) : 1 - sp * 0.94;
    const m = aimed ? smooth(0.3, 0.75, e) : 0;
    if (alpha > 0.01) {
      if (m < 1) {
        const sz = size + (wordSize - size) * e;
        ctx.globalAlpha = alpha * (1 - m);
        ctx.fillStyle = INK;
        ctx.beginPath();
        for (const p of particles) if (!p.plus) ctx.rect(p.x, p.y - sy, sz, sz);
        ctx.fill();
        ctx.fillStyle = PLUS;
        ctx.beginPath();
        for (const p of particles) if (p.plus) ctx.rect(p.x, p.y - sy, sz, sz);
        ctx.fill();
      }
      if (m > 0) {
        const sz = size + (wordSize - size) * e;
        ctx.globalAlpha = alpha * m;
        for (let b = 0; b < 4; b++) {
          ctx.fillStyle = wordColors[b];
          ctx.beginPath();
          for (const p of particles) if (p.bin === b) ctx.rect(p.x, p.y - sy, sz, sz);
          ctx.fill();
        }
      }
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  }

  function start() {
    canvas.style.visibility = "visible";
    if (playing) return;
    playing = true;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    playing = false;
    cancelAnimationFrame(raf);
    canvas.style.visibility = "hidden";
  }

  function arm(scatter) {
    rebuild(scatter);
    if (!particles.length) return false;
    root.classList.add("is-running");
    start();
    return true;
  }

  if (!arm(true)) {
    let tries = 0;
    const retry = () => {
      if (arm(!root.classList.contains("is-formed")) || tries++ > 20) return;
      requestAnimationFrame(retry);
    };
    requestAnimationFrame(retry);
  }

  if (!fontOk) {
    document.fonts.ready.then(() => {
      if (!root.isConnected) return;
      arm(!root.classList.contains("is-formed"));
    });
  }

  let resizeTimer = 0;
  addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => rebuild(!root.classList.contains("is-formed")), 140);
  });

  root.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top + scrollY;
    pointer.on = true;
  });
  root.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "touch") return;
    const rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top + scrollY;
    pointer.on = true;
  });
  root.addEventListener("pointerup", (e) => {
    if (e.pointerType === "touch") pointer.on = false;
  });
  root.addEventListener("pointercancel", () => { pointer.on = false; });
  root.addEventListener("pointerleave", () => { pointer.on = false; });
  root.addEventListener("click", (e) => {
    if (e.target.closest("a, button, .os-copy")) return;
    const rect = canvas.getBoundingClientRect();
    explode(e.clientX - rect.left, e.clientY - rect.top + scrollY);
  });
  if (window.visualViewport) {
    visualViewport.addEventListener("resize", () => rebuild(!root.classList.contains("is-formed")));
  }

  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) start();
    else stop();
  });
  io.observe(root);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else if (root.getBoundingClientRect().bottom > 32) start();
  });
}
