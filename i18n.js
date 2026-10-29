/* Ana sayfanın çevirileri. Sayfa Türkçe yazılır; seçilen dil başka ise bu dosya, diğer betikler çalışmadan önce
   metinleri değiştirir. İngilizce ve Almanca PAGE tablosunda, İspanyolca ve Portekizce ESPT tablosunda durur.
   Diğer diller (ru, ar, pl, nl, fr, it, fa) lang/<kod>.js paketlerindedir ve yalnızca o dil seçilince yüklenir.
   Dil seçimi, yön ve yazı tipleri lang-core.js'te. Çevirisi olmayan metin İngilizce gösterilir. */
(function () {
  var OSL = window.OSL;
  if (OSL.needPack("lang/", document.currentScript.src)) return;
  var lang = OSL.lang, PACK = window.OS_PACK || {};

  /* Betiklerin ürettiği kısa metinler */
  var STRINGS = {
    en: {
      copied: "Copied", copy: "Copy address", selected: "Selected, press Ctrl+C to copy",
      sections: "Sections", products: "Products", principles: "Principles", team: "Team", contact: "Contact",
      eggs: "Hidden pluses", egg: "Hidden plus", winTitle: "A <span>+</span>1 for everything!", winText: "You found all five hidden pluses.",
      language: "Language"
    },
    de: {
      copied: "Kopiert", copy: "Adresse kopieren", selected: "Markiert, mit Strg+C kopieren",
      sections: "Abschnitte", products: "Produkte", principles: "Prinzipien", team: "Team", contact: "Kontakt",
      eggs: "Versteckte Plus", egg: "Verstecktes Plus", winTitle: "Für alles ein <span>+</span>1!", winText: "Sie haben alle fünf versteckten Plus gefunden.",
      language: "Sprache"
    },
    es: {
      copied: "Copiado", copy: "Copiar dirección", selected: "Seleccionado, pulsa Ctrl+C para copiar",
      sections: "Secciones", products: "Productos", principles: "Principios", team: "Equipo", contact: "Contacto",
      eggs: "Signos + ocultos", egg: "Signo + oculto", winTitle: "¡Un <span>+</span>1 para todo!", winText: "Has encontrado los cinco signos + ocultos.",
      language: "Idioma"
    },
    pt: {
      copied: "Copiado", copy: "Copiar endereço", selected: "Selecionado, pressione Ctrl+C para copiar",
      sections: "Seções", products: "Produtos", principles: "Princípios", team: "Equipe", contact: "Contato",
      eggs: "Sinais + escondidos", egg: "Sinal + escondido", winTitle: "Um <span>+</span>1 para tudo!", winText: "Você encontrou os cinco sinais + escondidos.",
      language: "Idioma"
    }
  };
  window.OS_LANG = lang;
  window.OS_T = function (key, fallback) {
    if (lang === "tr") return fallback;
    return (STRINGS[lang] && STRINGS[lang][key]) || (PACK.strings && PACK.strings[key]) || STRINGS.en[key] || fallback;
  };

  /* Sayfadaki metinler: [seçici, özellik ("html" ya da öznitelik adı), İngilizce, Almanca] */
  var PAGE = [
    ['meta[name="description"]', "content",
      "A two-person software studio in Istanbul. A +1 for everything: we use AI to take everyday work, hobbies and life one step further.",
      "Ein zweiköpfiges Softwarestudio in Istanbul. Für alles ein +1: Mit KI bringen wir Alltag, Hobbys und Leben einen Schritt weiter."],
    ["header.top .top-nav", "aria-label", "On this page", "Auf dieser Seite"],
    ['header.top .top-nav a[href="#urunler"]', "html", "Products", "Produkte"],
    ['header.top .top-nav a[href="#ekip"]', "html", "Team", "Team"],
    ['header.top .top-nav a[href="#iletisim"]', "html", "Contact", "Kontakt"],
    [".os-copy h1", "html", "A two-person software studio in Istanbul.", "Ein zweiköpfiges Softwarestudio in Istanbul."],
    [".os-copy .os-tagline", "html", "A <span>+</span>1 for everything.", "Für alles ein <span>+</span>1."],
    [".band-row.thin", "html",
      '<span class="band-item"><span>Built with the field</span><span class="p">+</span><span>We don\'t sell data</span><span class="p">+</span><span>Multilingual</span><span class="p">+</span><span>Istanbul</span><span class="p">+</span><span>Düsseldorf</span><span class="p">+</span><span>Hamburg</span><span class="p">+</span></span>',
      '<span class="band-item"><span>Mit der Praxis entwickelt</span><span class="p">+</span><span>Wir verkaufen keine Daten</span><span class="p">+</span><span>Mehrsprachig</span><span class="p">+</span><span>Istanbul</span><span class="p">+</span><span>Düsseldorf</span><span class="p">+</span><span>Hamburg</span><span class="p">+</span></span>'],

    ["#urunler .eyebrow", "html", "<b>+</b>Products", "<b>+</b>Produkte"],
    ["#urunler .app-picker", "aria-label", "Apps", "Apps"],
    ["#panel-muslimplus .app-line", "html",
      '<i></i>Dhikr becomes a journey.<span class="app-status">App Store · Google Play</span>',
      '<i></i>Dhikr wird zur Reise.<span class="app-status">App Store · Google Play</span>'],
    ["#zikir-game", "aria-label",
      "MuslimPlus dhikr journey: as the traveler walks from Safa to the Kaaba every dhikr is counted, and every 100 dhikrs plant a tree along the road.",
      "MuslimPlus-Dhikr-Reise: Auf dem Weg von Safa zur Kaaba wird jedes Dhikr gezählt, alle 100 Dhikr wird ein Baum am Weg gepflanzt."],
    ["#panel-muslimplus .app-note", "html",
      '<span>Each completed daily dhikr goal moves the traveler one stop ahead, and every 100 dhikrs plant a tree along the way.</span><a href="muslimplus/">Discover MuslimPlus →</a>',
      '<span>Jedes erreichte tägliche Dhikr-Ziel bringt den Reisenden eine Station weiter, alle 100 Dhikr wird ein Baum gepflanzt.</span><a href="muslimplus/">MuslimPlus entdecken →</a>'],
    ["#panel-qrocket .app-line", "html",
      '<i></i>Ordering and paying, right at the table.<span class="app-status">Piloting in 8 restaurants · Tekirdağ, Balıkesir, Istanbul</span>',
      '<i></i>Bestellen und bezahlen direkt am Tisch.<span class="app-status">Pilot in 8 Restaurants · Tekirdağ, Balıkesir, Istanbul</span>'],
    ["#qrocket-game", "aria-label",
      "QRoket restaurant: guests scan the QR code on the table, order by talking to the AI waiter in their own language, the waiter serves, the bill is split and paid at the table, and a QR rocket takes off with every payment.",
      "QRoket-Restaurant: Gäste scannen den QR-Code am Tisch, bestellen im Gespräch mit dem KI-Kellner in ihrer Sprache, der Kellner serviert, die Rechnung wird am Tisch geteilt und bezahlt, und bei jeder Zahlung startet eine QR-Rakete."],
    ["#panel-qrocket .app-note", "html",
      '<span>Guests scan the QR code, talk to the AI waiter in their own language and confirm the order; the bill is split and paid at the table.</span><a href="qrocket/">Discover QRoket →</a>',
      '<span>Gäste scannen den QR-Code, sprechen mit dem KI-Kellner in ihrer Sprache und bestätigen die Bestellung; die Rechnung wird am Tisch geteilt und bezahlt.</span><a href="qrocket/">QRoket entdecken →</a>'],
    ["#panel-nestor .app-line", "html",
      '<i></i>Ninety days, one Odyssey.<span class="app-status">App Store · Google Play</span>',
      '<i></i>Neunzig Tage, eine Odyssee.<span class="app-status">App Store · Google Play</span>'],
    ["#nestor-game", "aria-label",
      "Nestor journey: the ship sails from Calypso's island to Ithaca, earning 10 drachmas a day, with a seal and a new rank on every island; Argos waits in Ithaca.",
      "Nestor-Reise: Das Schiff segelt von Kalypsos Insel nach Ithaka, verdient täglich 10 Drachmen, auf jeder Insel gibt es ein Siegel und einen neuen Rang; auf Ithaka wartet Argos."],
    ["#panel-nestor .app-note", "html",
      '<span>Each day\'s fifteen-minute lesson moves the ship one day forward; every island is a test and a seal, and Argos waits in Ithaca at the end.</span><a href="nestor/">Discover Nestor →</a>',
      '<span>Die tägliche Lektion von fünfzehn Minuten bringt das Schiff einen Tag voran; jede Insel ist eine Prüfung und ein Siegel, und am Ende wartet Argos auf Ithaka.</span><a href="nestor/">Nestor entdecken →</a>'],

    ["#ilkeler .eyebrow", "html", "<b>+</b>Principles", "<b>+</b>Prinzipien"],
    ["#ilkeler .sec-head h2", "html", "The <em>three rules</em> we build by", "Drei <em>Regeln</em>, nach denen wir entwickeln"],
    [".principles li:nth-child(1) h3", "html", "We build with the field", "Wir entwickeln mit der Praxis"],
    [".principles li:nth-child(1) p", "html",
      "We shape products not at a desk but through pilots with real businesses.",
      "Wir formen Produkte nicht am Schreibtisch, sondern in Pilotprojekten mit echten Unternehmen."],
    [".principles li:nth-child(2) h3", "html", "We don't sell data", "Wir verkaufen keine Daten"],
    [".principles li:nth-child(2) p", "html",
      "We only process the data a product needs to work, and we sell none of it to third parties.",
      "Wir verarbeiten nur die Daten, die ein Produkt zum Funktionieren braucht, und verkaufen nichts davon an Dritte."],
    [".principles li:nth-child(3) h3", "html", "We build multilingual", "Wir bauen mehrsprachig"],
    [".principles li:nth-child(3) p", "html",
      "We design our products in more than one language from day one, with local and international users in mind.",
      "Wir gestalten unsere Produkte von Anfang an in mehreren Sprachen, für einheimische und internationale Nutzer zugleich."],

    ["#ekip .eyebrow", "html", "<b>+</b>Team", "<b>+</b>Team"],
    ["#ekip .sec-head h2", "html", "Who <em>are we?</em>", "Wer <em>sind wir?</em>"],
    ["#ekip .book", "aria-label", "The team's story", "Die Geschichte des Teams"],
    ["#ekip .cover", "aria-label", "Open the book and read the team's story", "Buch öffnen und die Geschichte des Teams lesen"],
    ["#ekip .cover-front small", "html", "Hover or tap to open", "Zum Öffnen darauf verweilen oder tippen"],
    ["#ch-1", "html", "First co-founder: from Düsseldorf to Istanbul", "Erste Mitgründung: von Düsseldorf nach Istanbul"],
    ["#ch-2", "html", "Second co-founder: from Hamburg to Istanbul", "Zweite Mitgründung: von Hamburg nach Istanbul"],
    ['[aria-labelledby="ch-1"] .story', "aria-label", "Read the first chapter", "Erstes Kapitel lesen"],
    ['[aria-labelledby="ch-2"] .story', "aria-label", "Read the second chapter", "Zweites Kapitel lesen"],
    ['[aria-labelledby="ch-1"] .story-text', "html",
      '<p class="lead"><span class="dropcap">O</span>ver many years, software consulting and ERP were home turf. In Türkiye and abroad, the work led to corporate companies that each ran by their own rules. Scattered processes were brought into one order, and the gears from purchasing to accounting learned to turn in step.</p>' +
      "<p>For a while the road led to the banks of the Rhine, to Düsseldorf, where work and life showed a different rhythm. Still, the compass kept pointing the same way. Back in Türkiye, the decision was made to continue both career and life here, and to pour all that experience into products of our own rather than other people's systems.</p>" +
      '<div class="satchel"><b>Areas of expertise</b><ul><li>Enterprise software consulting</li><li>ERP systems</li><li>Business process analysis</li><li>Enterprise integrations</li></ul></div>',
      '<p class="lead"><span class="dropcap">O</span>b in der Türkei oder im Ausland: Viele Jahre lang drehte sich alles um Softwareberatung und ERP. Für Konzerne, die jeweils nach eigenen Regeln funktionieren, wurden verstreute Prozesse in eine Ordnung gebracht, damit die Zahnräder vom Einkauf bis zur Buchhaltung ineinandergreifen.</p>' +
      "<p>Eine Zeit lang führte der Weg an den Rhein, nach Düsseldorf, wo Arbeit und Leben einen anderen Rhythmus zeigten. Doch der Kompass zeigte immer in dieselbe Richtung. Zurück in der Türkei fiel die Entscheidung, Karriere und Leben hier fortzusetzen und die gesammelte Erfahrung nicht mehr in fremde Systeme, sondern in eigene Produkte zu stecken.</p>" +
      '<div class="satchel"><b>Fachgebiete</b><ul><li>Beratung für Unternehmenssoftware</li><li>ERP-Systeme</li><li>Geschäftsprozessanalyse</li><li>Unternehmensintegrationen</li></ul></div>'],
    ['[aria-labelledby="ch-2"] .story-text', "html",
      '<p class="lead"><span class="dropcap">S</span>martphone screens are where this journey began, in Türkiye. Building mobile apps across very different industries, every new sector brought a new problem, and each one became an app that fits in the palm of a hand.</p>' +
      "<p>Then the route turned north, to Hamburg. The port city's never-stopping pace brought years in software development and consulting, and the lesson that asking the right question is as much a craft as writing good code. After returning to Türkiye came long years of supporting corporate clients at home and abroad, until the road finally led to the city it had always been heading for: Istanbul.</p>" +
      '<div class="satchel"><b>Areas of expertise</b><ul><li>Mobile app development</li><li>Software development</li><li>Technical consulting</li><li>Enterprise projects</li></ul></div>',
      '<p class="lead"><span class="dropcap">S</span>martphone-Bildschirme standen am Anfang dieser Reise, in der Türkei. In der Entwicklung mobiler Apps ging es durch ganz unterschiedliche Branchen; jedes neue Problem wurde zu einer App, die in eine Hand passt.</p>' +
      "<p>Dann ging die Route nach Norden, nach Hamburg. Im nie stillstehenden Takt der Hafenstadt folgten Jahre in Softwareentwicklung und Beratung und die Erkenntnis, dass die richtige Frage zu stellen ebenso ein Handwerk ist wie guter Code. Zurück in der Türkei kamen viele Jahre Unterstützung für Unternehmen im In- und Ausland hinzu, bis der Weg schließlich in die Stadt führte, auf die er immer zugelaufen war: Istanbul.</p>" +
      '<div class="satchel"><b>Fachgebiete</b><ul><li>Entwicklung mobiler Apps</li><li>Softwareentwicklung</li><li>Technische Beratung</li><li>Unternehmensprojekte</li></ul></div>'],
    [".story-cover small", "html", "Hover or tap to read", "Zum Lesen darauf verweilen oder tippen"],
    [".book-end", "html",
      '<span class="seal" aria-hidden="true">OS<span>+</span></span>Two different careers met in <strong>Istanbul</strong> with one goal: turning what we learned on enterprise projects into products people use every day. OS+studio was born from that partnership.',
      '<span class="seal" aria-hidden="true">OS<span>+</span></span>Zwei verschiedene Karrieren trafen sich in <strong>Istanbul</strong> mit einem Ziel: die Erfahrung aus Unternehmensprojekten in Produkte zu verwandeln, die Menschen jeden Tag nutzen. Aus dieser Partnerschaft entstand OS+studio.'],

    ["#iletisim .eyebrow", "html", "<b>+</b>Contact", "<b>+</b>Kontakt"],
    ["#iletisim h2", "html",
      '<span class="sr-only">Got an idea?</span><span aria-hidden="true">Got <span class="swap"><span class="on">an idea</span><span>a project</span><span>a question</span><span>a suggestion</span></span>?</span> <em>Write to us.</em>',
      '<span class="sr-only">Sie haben eine Idee?</span><span aria-hidden="true">Sie haben <span class="swap"><span class="on">eine Idee</span><span>ein Projekt</span><span>eine Frage</span><span>einen Vorschlag</span></span>?</span> <em>Schreiben Sie uns.</em>'],
    ["#iletisim .cta > p", "html",
      "For the QRoket pilot program, content partnerships or questions about our products. We usually reply within a few business days.",
      "Für das QRoket-Pilotprogramm, Content-Partnerschaften oder Fragen zu unseren Produkten. Wir antworten in der Regel innerhalb weniger Werktage."],
    ["#copy", "html", "Copy address", "Adresse kopieren"],
    ['#iletisim .btn.ghost', "html", 'Send an email <span class="arrow" aria-hidden="true">→</span>', 'E-Mail senden <span class="arrow" aria-hidden="true">→</span>'],

    ["footer > div > p", "html", "A +1 for everything. From Istanbul, with AI.", "Für alles ein +1. Aus Istanbul, mit KI."],
    ["footer nav", "aria-label", "Footer", "Fußzeile"],
    ['footer nav a[href="#urunler"]', "html", "Products", "Produkte"],
    ['footer nav a[href="#ilkeler"]', "html", "Principles", "Prinzipien"],
    ['footer nav a[href="#ekip"]', "html", "Team", "Team"],
    ['footer nav a[href="#iletisim"]', "html", "Contact", "Kontakt"],
    ['footer nav a[href="gizlilik.html"]', "html", "Privacy policy", "Datenschutz"],
    ["footer .copy", "html", "© 2026 OSplusstudio<br>Istanbul", "© 2026 OSplusstudio<br>Istanbul"]
  ];

  /* İspanyolca ve Portekizce: yukarıdaki satırlarla aynı seçiciler, "seçici|özellik" anahtarıyla [es, pt] */
  var SATCHEL = function (title, items) { return '<div class="satchel"><b>' + title + "</b><ul><li>" + items.join("</li><li>") + "</li></ul></div>"; };
  var ESPT = {
    'meta[name="description"]|content': [
      "Un estudio de software de dos personas en Estambul. Un +1 para todo: usamos la IA para llevar el trabajo diario, las aficiones y la vida un paso más allá.",
      "Um estúdio de software de duas pessoas em Istambul. Um +1 para tudo: usamos IA para levar o trabalho do dia a dia, os hobbies e a vida um passo adiante."],
    "header.top .top-nav|aria-label": ["En esta página", "Nesta página"],
    'header.top .top-nav a[href="#urunler"]|html': ["Productos", "Produtos"],
    'header.top .top-nav a[href="#ekip"]|html': ["Equipo", "Equipe"],
    'header.top .top-nav a[href="#iletisim"]|html': ["Contacto", "Contato"],
    ".os-copy h1|html": ["Un estudio de software de dos personas en Estambul.", "Um estúdio de software de duas pessoas em Istambul."],
    ".os-copy .os-tagline|html": ["Un <span>+</span>1 para todo.", "Um <span>+</span>1 para tudo."],
    ".band-row.thin|html": [
      '<span class="band-item"><span>Junto al terreno</span><span class="p">+</span><span>No vendemos datos</span><span class="p">+</span><span>Multilingüe</span><span class="p">+</span><span>Estambul</span><span class="p">+</span><span>Düsseldorf</span><span class="p">+</span><span>Hamburgo</span><span class="p">+</span></span>',
      '<span class="band-item"><span>Feito junto com o campo</span><span class="p">+</span><span>Não vendemos dados</span><span class="p">+</span><span>Multilíngue</span><span class="p">+</span><span>Istambul</span><span class="p">+</span><span>Düsseldorf</span><span class="p">+</span><span>Hamburgo</span><span class="p">+</span></span>'],

    "#urunler .eyebrow|html": ["<b>+</b>Productos", "<b>+</b>Produtos"],
    "#urunler .app-picker|aria-label": ["Apps", "Apps"],
    "#panel-muslimplus .app-line|html": [
      '<i></i>El dhikr se convierte en un viaje.<span class="app-status">App Store · Google Play</span>',
      '<i></i>O dhikr vira uma jornada.<span class="app-status">App Store · Google Play</span>'],
    "#zikir-game|aria-label": [
      "Viaje de dhikr de MuslimPlus: mientras el viajero camina de Safa a la Kaaba se cuenta cada dhikr, y cada 100 dhikr se planta un árbol en el camino.",
      "Jornada de dhikr do MuslimPlus: enquanto o viajante caminha de Safa até a Caaba, cada dhikr é contado, e a cada 100 dhikr uma árvore é plantada no caminho."],
    "#panel-muslimplus .app-note|html": [
      '<span>Cada meta diaria de dhikr cumplida lleva al viajero una parada más allá, y cada 100 dhikr se planta un árbol en el camino.</span><a href="muslimplus/">Conoce MuslimPlus →</a>',
      '<span>Cada meta diária de dhikr cumprida leva o viajante a uma parada adiante, e a cada 100 dhikr uma árvore é plantada no caminho.</span><a href="muslimplus/">Conheça o MuslimPlus →</a>'],
    "#panel-qrocket .app-line|html": [
      '<i></i>Pedir y pagar, en la mesa.<span class="app-status">Piloto en 8 restaurantes · Tekirdağ, Balıkesir, Estambul</span>',
      '<i></i>Pedir e pagar, na mesa.<span class="app-status">Piloto em 8 restaurantes · Tekirdağ, Balıkesir, Istambul</span>'],
    "#qrocket-game|aria-label": [
      "Restaurante QRoket: los clientes escanean el QR de la mesa, piden hablando con el camarero IA en su idioma, el camarero sirve, la cuenta se divide y se paga en la mesa, y con cada pago despega un cohete QR.",
      "Restaurante QRoket: os clientes escaneiam o QR da mesa, fazem o pedido conversando com o garçom de IA no próprio idioma, o garçom serve, a conta é dividida e paga na mesa, e a cada pagamento um foguete QR decola."],
    "#panel-qrocket .app-note|html": [
      '<span>El cliente escanea el QR, habla con el camarero IA en su idioma y confirma el pedido; la cuenta se divide y se paga en la mesa.</span><a href="qrocket/">Conoce QRoket →</a>',
      '<span>O cliente escaneia o QR, conversa com o garçom de IA no próprio idioma e confirma o pedido; a conta é dividida e paga na mesa.</span><a href="qrocket/">Conheça o QRoket →</a>'],
    "#panel-nestor .app-line|html": [
      '<i></i>Noventa días, una Odisea.<span class="app-status">App Store · Google Play</span>',
      '<i></i>Noventa dias, uma Odisseia.<span class="app-status">App Store · Google Play</span>'],
    "#nestor-game|aria-label": [
      "Viaje de Nestor: el barco navega de la isla de Calipso a Ítaca, gana 10 dracmas al día y en cada isla recibe un sello y un nuevo rango; en Ítaca espera Argos.",
      "Jornada do Nestor: o navio vai da ilha de Calipso a Ítaca, ganha 10 dracmas por dia e, em cada ilha, um selo e uma nova patente; em Ítaca, Argos espera."],
    "#panel-nestor .app-note|html": [
      '<span>La lección diaria de quince minutos lleva el barco un día más allá; cada isla es una prueba y un sello, y al final del camino Argos espera en Ítaca.</span><a href="nestor/?lang=es">Conoce Nestor →</a>',
      '<span>A lição diária de quinze minutos leva o navio um dia adiante; cada ilha é uma prova e um selo, e no fim do caminho Argos espera em Ítaca.</span><a href="nestor/?lang=pt">Conheça o Nestor →</a>'],

    "#ilkeler .eyebrow|html": ["<b>+</b>Principios", "<b>+</b>Princípios"],
    "#ilkeler .sec-head h2|html": ["Las <em>tres reglas</em> con las que construimos", "As <em>três regras</em> que seguimos ao construir"],
    ".principles li:nth-child(1) h3|html": ["Construimos junto al terreno", "Construímos junto com o campo"],
    ".principles li:nth-child(1) p|html": [
      "No damos forma a los productos desde un escritorio, sino con pilotos en negocios reales.",
      "Não moldamos produtos numa mesa de escritório, mas em pilotos com negócios reais."],
    ".principles li:nth-child(2) h3|html": ["No vendemos datos", "Não vendemos dados"],
    ".principles li:nth-child(2) p|html": [
      "Solo procesamos los datos que un producto necesita para funcionar, y no vendemos ninguno a terceros.",
      "Só processamos os dados de que um produto precisa para funcionar, e não vendemos nenhum deles a terceiros."],
    ".principles li:nth-child(3) h3|html": ["Construimos en varios idiomas", "Construímos em vários idiomas"],
    ".principles li:nth-child(3) p|html": [
      "Diseñamos nuestros productos en más de un idioma desde el primer día, pensando a la vez en usuarios locales e internacionales.",
      "Desenhamos nossos produtos em mais de um idioma desde o primeiro dia, pensando ao mesmo tempo em usuários locais e estrangeiros."],

    "#ekip .eyebrow|html": ["<b>+</b>Equipo", "<b>+</b>Equipe"],
    "#ekip .sec-head h2|html": ["¿Quiénes <em>somos?</em>", "Quem <em>somos?</em>"],
    "#ekip .book|aria-label": ["La historia del equipo", "A história da equipe"],
    "#ekip .cover|aria-label": ["Abre el libro y lee la historia del equipo", "Abra o livro e leia a história da equipe"],
    "#ekip .cover-front small|html": ["Mantén el cursor encima o toca para abrir", "Passe o cursor ou toque para abrir"],
    "#ch-1|html": ["Primera historia: de Düsseldorf a Estambul", "Primeira história: de Düsseldorf a Istambul"],
    "#ch-2|html": ["Segunda historia: de Hamburgo a Estambul", "Segunda história: de Hamburgo a Istambul"],
    '[aria-labelledby="ch-1"] .story|aria-label': ["Leer el primer capítulo", "Ler o primeiro capítulo"],
    '[aria-labelledby="ch-2"] .story|aria-label': ["Leer el segundo capítulo", "Ler o segundo capítulo"],
    '[aria-labelledby="ch-1"] .story-text|html': [
      '<p class="lead"><span class="dropcap">O</span>ficio de muchos años: la consultoría de software y el ERP. Dentro y fuera de Turquía, el trabajo llevó a empresas que funcionaban cada una con sus propias reglas. Los procesos dispersos se reunieron en un solo orden, y los engranajes, de las compras a la contabilidad, aprendieron a girar al unísono.</p>' +
      "<p>Durante un tiempo el camino llevó a orillas del Rin, a Düsseldorf, donde el trabajo y la vida mostraron otro ritmo. Aun así, la brújula siguió señalando la misma dirección. De vuelta en Turquía llegó la decisión de seguir aquí con la carrera y con la vida, y de volcar toda esa experiencia ya no en sistemas ajenos, sino en productos propios.</p>" +
      SATCHEL("Áreas de especialidad", ["Consultoría de software empresarial", "Sistemas ERP", "Análisis de procesos de negocio", "Integraciones empresariales"]),
      '<p class="lead"><span class="dropcap">O</span>s anos de consultoria de software e ERP foram muitos. Dentro e fora da Turquia, o trabalho levou a empresas que funcionavam cada uma com suas próprias regras. Processos dispersos foram reunidos numa só ordem, e as engrenagens, das compras à contabilidade, aprenderam a girar em sintonia.</p>' +
      "<p>Por um tempo, o caminho levou às margens do Reno, a Düsseldorf, onde o trabalho e a vida mostraram outro ritmo. Ainda assim, a bússola continuou apontando para o mesmo lado. De volta à Turquia veio a decisão de seguir aqui com a carreira e com a vida, e de colocar toda essa experiência não mais em sistemas alheios, mas em produtos próprios.</p>" +
      SATCHEL("Áreas de atuação", ["Consultoria em software corporativo", "Sistemas ERP", "Análise de processos de negócio", "Integrações corporativas"])],
    '[aria-labelledby="ch-2"] .story-text|html': [
      '<p class="lead"><span class="dropcap">S</span>obre las pantallas de los teléfonos empezó este viaje, en Turquía. Desarrollando apps móviles en sectores muy distintos, cada sector nuevo traía un problema nuevo, y cada uno se convirtió en una app que cabe en la palma de la mano.</p>' +
      "<p>Luego el rumbo giró al norte, hacia Hamburgo. El ritmo incesante de la ciudad portuaria trajo años de desarrollo de software y consultoría, y la lección de que hacer la pregunta correcta es tanto un oficio como escribir buen código. Tras volver a Turquía llegaron largos años de apoyo a empresas dentro y fuera del país, hasta que el camino llevó por fin a la ciudad hacia la que siempre se dirigía: Estambul.</p>" +
      SATCHEL("Áreas de especialidad", ["Desarrollo de apps móviles", "Desarrollo de software", "Consultoría técnica", "Proyectos empresariales"]),
      '<p class="lead"><span class="dropcap">S</span>obre as telas de celular começou esta jornada, na Turquia. Criando apps móveis em setores muito diferentes, cada setor novo trazia um problema novo, e cada um virou um app que cabe na palma da mão.</p>' +
      "<p>Depois, a rota virou para o norte, rumo a Hamburgo. O ritmo incessante da cidade portuária trouxe anos de desenvolvimento de software e consultoria, e a lição de que fazer a pergunta certa é um ofício tanto quanto escrever um bom código. Depois da volta à Turquia vieram longos anos de apoio a empresas no país e no exterior, até que o caminho levou finalmente à cidade para onde sempre seguia: Istambul.</p>" +
      SATCHEL("Áreas de atuação", ["Desenvolvimento de apps móveis", "Desenvolvimento de software", "Consultoria técnica", "Projetos corporativos"])],
    ".story-cover small|html": ["Mantén el cursor encima o toca para leer", "Passe o cursor ou toque para ler"],
    ".book-end|html": [
      '<span class="seal" aria-hidden="true">OS<span>+</span></span>Dos carreras distintas se encontraron en <strong>Estambul</strong> con un mismo objetivo: convertir lo aprendido en proyectos empresariales en productos que la gente usa cada día. De esa alianza nació OS+studio.',
      '<span class="seal" aria-hidden="true">OS<span>+</span></span>Duas carreiras diferentes se encontraram em <strong>Istambul</strong> com um só objetivo: transformar o que aprendemos em projetos corporativos em produtos que as pessoas usam todos os dias. Dessa parceria nasceu o OS+studio.'],

    "#iletisim .eyebrow|html": ["<b>+</b>Contacto", "<b>+</b>Contato"],
    "#iletisim h2|html": [
      '<span class="sr-only">¿Tienes una idea?</span><span aria-hidden="true">¿Tienes <span class="swap"><span class="on">una idea</span><span>un proyecto</span><span>una pregunta</span><span>una sugerencia</span></span>?</span> <em>Escríbenos.</em>',
      '<span class="sr-only">Tem uma ideia?</span><span aria-hidden="true">Tem <span class="swap"><span class="on">uma ideia</span><span>um projeto</span><span>uma pergunta</span><span>uma sugestão</span></span>?</span> <em>Escreva para nós.</em>'],
    "#iletisim .cta > p|html": [
      "Para el programa piloto de QRoket, colaboraciones de contenido o preguntas sobre nuestros productos. Solemos responder en pocos días hábiles.",
      "Para o programa piloto do QRoket, parcerias de conteúdo ou dúvidas sobre nossos produtos. Costumamos responder em poucos dias úteis."],
    "#copy|html": ["Copiar dirección", "Copiar endereço"],
    "#iletisim .btn.ghost|html": ['Enviar un correo <span class="arrow" aria-hidden="true">→</span>', 'Enviar e-mail <span class="arrow" aria-hidden="true">→</span>'],

    "footer > div > p|html": ["Un +1 para todo. Desde Estambul, con IA.", "Um +1 para tudo. De Istambul, com IA."],
    "footer nav|aria-label": ["Pie de página", "Rodapé"],
    'footer nav a[href="#urunler"]|html': ["Productos", "Produtos"],
    'footer nav a[href="#ilkeler"]|html': ["Principios", "Princípios"],
    'footer nav a[href="#ekip"]|html': ["Equipo", "Equipe"],
    'footer nav a[href="#iletisim"]|html': ["Contacto", "Contato"],
    'footer nav a[href="gizlilik.html"]|html': ["Política de privacidad", "Política de privacidade"],
    "footer .copy|html": ["© 2026 OSplusstudio<br>Estambul", "© 2026 OSplusstudio<br>Istambul"]
  };

  if (lang !== "tr") {
    var col = lang === "en" ? 2 : lang === "de" ? 3 : -1, extra = lang === "es" ? 0 : lang === "pt" ? 1 : -1;
    PAGE.forEach(function (row) {
      var key = row[0] + "|" + row[1], text;
      if (col > 0) text = row[col];
      else if (extra >= 0) text = (ESPT[key] || [])[extra];
      else text = PACK.page && PACK.page[OSL.qid(key)];
      // çevirisi olmayan satır, Türkçeye düşmek yerine İngilizce gösterilir
      if (text === undefined) text = row[2];
      document.querySelectorAll(row[0]).forEach(function (el) {
        if (row[1] === "html") el.innerHTML = text;
        else el.setAttribute(row[1], text);
      });
    });
  }

  /* Dil seçici: üst menünün yanında açılır liste */
  var header = document.querySelector("header.top");
  if (header) {
    var right = document.createElement("div");
    right.className = "right";
    var nav = header.querySelector(".top-nav");
    if (nav) right.appendChild(nav);
    right.appendChild(OSL.picker(window.OS_T("language", "Dil")));
    header.appendChild(right);
  }
})();
