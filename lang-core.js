/* Ana sayfa ve QRoket'in ortak dil altyapısı: dili seçer, sayfa yönünü ve yazı tiplerini ayarlar,
   yeni dillerin paketini yükler ve menüdeki açılır dil seçiciyi kurar.
   Dil sırası: ?lang= bağlantısı, kayıtlı seçim (osplus-lang), tarayıcı dili, en son İngilizce. */
(function () {
  var LANGS = ["tr", "en", "de", "es", "pt", "ru", "ar", "pl", "nl", "fr", "it", "fa"];
  var NAMES = { tr: "Türkçe", en: "English", de: "Deutsch", es: "Español", pt: "Português", ru: "Русский", ar: "العربية", pl: "Polski", nl: "Nederlands", fr: "Français", it: "Italiano", fa: "فارسی" };
  var LOCALE = { tr: "tr-TR", en: "en-US", de: "de-DE", es: "es-ES", pt: "pt-BR", ru: "ru-RU", ar: "ar-u-nu-latn", pl: "pl-PL", nl: "nl-NL", fr: "fr-FR", it: "it-IT", fa: "fa-IR-u-nu-latn" };
  // bu dillerin metinleri ayrı paketlerde: yalnızca o dil seçilince indirilir
  var PACKED = { ru: 1, ar: 1, pl: 1, nl: 1, fr: 1, it: 1, fa: 1 };
  var RTL = { ar: 1, fa: 1 };

  function pick() {
    var q = (location.search.match(new RegExp("[?&]lang=(" + LANGS.join("|") + ")\\b")) || [])[1];
    if (q) { try { localStorage.setItem("osplus-lang", q); } catch (e) {} return q; }
    try { var s = localStorage.getItem("osplus-lang"); if (LANGS.indexOf(s) > -1) return s; } catch (e) {}
    var n = (navigator.language || "tr").toLowerCase().slice(0, 2);
    return LANGS.indexOf(n) > -1 ? n : "en";
  }
  // paketlerde her metnin anahtarı: Türkçe metnin kısa özeti (FNV-1a, 36 tabanında)
  function qid(s) { var h = 0x811c9dc5; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(36); }

  var lang = pick(), root = document.documentElement;
  root.lang = lang;
  root.dir = RTL[lang] ? "rtl" : "ltr";

  // Kiril ve Arap harfleri için yazı tipleri, yalnızca gerektiğinde
  var FONTS = { ru: "family=PT+Serif:wght@400;700&family=Manrope:wght@400;500;600;700;800", ar: "family=Vazirmatn:wght@400;500;600;700;800", fa: "family=Vazirmatn:wght@400;500;600;700;800" };
  if (FONTS[lang]) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?" + FONTS[lang] + "&display=swap";
    document.head.appendChild(link);
  }

  // seçici ve sağdan sola yazım için ortak stiller
  var css = document.createElement("style");
  css.textContent =
    ".lang-pick{position:relative}" +
    ".lang-btn{display:inline-flex;align-items:center;gap:6px;font:600 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.06em;color:var(--fg,#ECEEE8);background:rgba(255,255,255,.04);border:1px solid rgba(236,230,218,.18);border-radius:99px;padding:8px 11px;cursor:pointer}" +
    ".lang-btn:hover{border-color:rgba(236,230,218,.36)}" +
    ".lang-btn .caret{width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid currentColor;transition:transform .2s}" +
    ".lang-btn[aria-expanded=true] .caret{transform:rotate(180deg)}" +
    ".lang-menu{position:absolute;inset-inline-end:0;top:calc(100% + 8px);z-index:90;min-width:190px;margin:0;padding:6px;list-style:none;border-radius:16px;background:rgba(22,25,34,.97);box-shadow:0 24px 50px -20px rgba(0,0,0,.85),inset 0 0 0 1px rgba(236,230,218,.14);display:grid;grid-template-columns:1fr 1fr;gap:2px}" +
    ".lang-menu[hidden]{display:none}" +
    ".lang-menu a{display:flex;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:10px;text-decoration:none;color:var(--fg,#ECEEE8);font-size:14px;line-height:1.2;white-space:nowrap}" +
    ".lang-menu a small{font:500 10px/1.2 ui-monospace,monospace;opacity:.55}" +
    ".lang-menu a:hover,.lang-menu a:focus-visible{background:rgba(255,255,255,.08);outline:none}" +
    ".lang-menu a[aria-current=true]{background:var(--fg,#ECEEE8);color:var(--bg,#12141C)}" +
    "@media (max-width:520px){.lang-menu{position:fixed;inset-inline:12px;top:64px;min-width:0}}" +
    "html[dir=rtl] body,html[dir=rtl] body *{letter-spacing:0!important}" +
    "html:is(:lang(ar),:lang(fa)) body,html:is(:lang(ar),:lang(fa)) body *{font-family:\"Vazirmatn\",system-ui,\"Segoe UI\",Tahoma,sans-serif!important}";
  document.head.appendChild(css);

  window.OSL = {
    lang: lang,
    langs: LANGS,
    locale: LOCALE[lang],
    rtl: !!RTL[lang],
    packed: !!PACKED[lang],
    qid: qid,
    // yeni bir dil seçiliyse paketini yükleyip çağıran dosyayı yeniden çalıştırır; true dönerse çağıran durmalı
    needPack: function (dir, self) {
      if (!PACKED[lang] || window.OS_PACK || window.__osPackTried) return false;
      window.__osPackTried = true;
      document.write('<script src="' + dir + lang + '.js?v=5"><\/script><script src="' + self + '"><\/script>');
      return true;
    },
    // menüdeki açılır dil seçici
    picker: function (label) {
      var wrap = document.createElement("div"), btn = document.createElement("button"), menu = document.createElement("ul");
      wrap.className = "lang-pick";
      btn.type = "button";
      btn.className = "lang-btn";
      btn.setAttribute("aria-haspopup", "true");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", label + ": " + NAMES[lang]);
      btn.innerHTML = lang.toUpperCase() + '<span class="caret" aria-hidden="true"></span>';
      menu.className = "lang-menu";
      menu.hidden = true;
      menu.setAttribute("aria-label", label);
      LANGS.forEach(function (l) {
        var li = document.createElement("li"), a = document.createElement("a");
        a.href = "?lang=" + l + location.hash;
        a.lang = l;
        a.hreflang = l;
        if (RTL[l]) a.dir = "rtl";
        a.innerHTML = "<span></span><small>" + l.toUpperCase() + "</small>";
        a.firstChild.textContent = NAMES[l];
        if (l === lang) a.setAttribute("aria-current", "true");
        li.appendChild(a);
        menu.appendChild(li);
      });
      var items = menu.querySelectorAll("a");
      function open(focusCurrent) {
        menu.hidden = false;
        btn.setAttribute("aria-expanded", "true");
        if (focusCurrent) (menu.querySelector("[aria-current]") || items[0]).focus();
      }
      function close(refocus) {
        if (menu.hidden) return;
        menu.hidden = true;
        btn.setAttribute("aria-expanded", "false");
        if (refocus) btn.focus();
      }
      btn.addEventListener("click", function () { menu.hidden ? open(false) : close(false); });
      btn.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); open(true); }
      });
      menu.addEventListener("keydown", function (e) {
        var list = [].slice.call(items), i = list.indexOf(document.activeElement);
        if (e.key === "Escape") { e.preventDefault(); close(true); }
        else if (e.key === "ArrowDown") { e.preventDefault(); list[(i + 1) % list.length].focus(); }
        else if (e.key === "ArrowUp") { e.preventDefault(); list[(i - 1 + list.length) % list.length].focus(); }
        else if (e.key === "Home") { e.preventDefault(); list[0].focus(); }
        else if (e.key === "End") { e.preventDefault(); list[list.length - 1].focus(); }
        else if (e.key === "Tab") close(false);
      });
      document.addEventListener("click", function (e) { if (!wrap.contains(e.target)) close(false); });
      wrap.appendChild(btn);
      wrap.appendChild(menu);
      return wrap;
    }
  };
})();
