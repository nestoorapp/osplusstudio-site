/* Nestor page in the app's four languages. The page is written in English; when another language is chosen
   this file swaps the texts before the page script runs. Island names, meanings, ranks, painting titles and the
   slogan come from the app's own locales (src/i18n/locales). Order: ?lang= link, saved choice, browser language. */
(function () {
  var LANGS = ["en", "es", "pt", "tr"];
  function pick() {
    var q = (location.search.match(/[?&]lang=(en|es|pt|tr)\b/) || [])[1];
    if (q) { try { localStorage.setItem("nestor-lang", q); } catch (e) {} return q; }
    try { var s = localStorage.getItem("nestor-lang"); if (LANGS.indexOf(s) > -1) return s; } catch (e) {}
    var n = (navigator.language || "en").toLowerCase().slice(0, 2);
    return LANGS.indexOf(n) > -1 ? n : "en";
  }
  var lang = pick();
  document.documentElement.lang = lang;

  /* The thirteen islands: [name, meaning, painting title] */
  var ISLES = {
    tr: [
      ["Kalypso'nun adası", "Rahat ama tutsak. Yolculuk burada başlar: önce kendi köşeni düzene sok.", "Odysseus ve Kalypso"],
      ["Lotusyiyenler", "Yolunu unutturan zevkler. Tadına bak ve yoluna devam et.", "Lotusyiyenlerin ülkesi"],
      ["Kyklops'un mağarası", "Zor bir sınav: gururla değil, akıl ve cesaretle karşılanır.", "Ulysses, Polyphemos ile alay ediyor"],
      ["Sirenler", "Kendini direğe bağla. Şarkı tatlıyken de disiplin dayanır.", "Ulysses ve Sirenler"],
      ["Aiolos'un rüzgârları", "Rüzgârların peşinden koşma; onları yönetmeyi öğren.", "Aiolos, Ulysses'e rüzgâr tulumunu veriyor"],
      ["Kirke'nin adası", "İnsanı hayvana çeviren şey ve ona direnen berrak akıl.", "Ulysses, Khryseis'i babasına geri veriyor"],
      ["Skylla ile Kharybdis", "İki tehlike arasında rotanı seç ve bedelini kabul et.", "Kharybdis ve Skylla"],
      ["Güneş'in sığırları", "Dokunulmaması gereken tek bir şey ve açken bile ondan uzak durmanın sabrı.", "Buğunun içinden doğan güneş"],
      ["Hades'in eşiği", "Yaşlı kâhine yolu sor ve zor kısmını da dinle.", "Teiresias, Odysseus'a geleceği bildiriyor"],
      ["Gölgeler diyarı", "Ölüler neyin önemli olduğunu anlatır. Ölümle, geçmişle ve kendinle yüzleş.", "Ölüler adası"],
      ["Nausikaa'nın kıyısı", "Kıyıya elinde hiçbir şey olmadan çıktın. Yardımı onurunla iste.", "Nausikaa"],
      ["Alkinoos'un sarayı", "Şölende yolculuğunun hikâyesi anlatılır. Onu dürüstçe anlat.", "Ulysses, Alkinoos'un sarayında"],
      ["İthaka", "Evdesin. Hayatının dümeni sende.", "Odysseus'un dönüşü"]
    ],
    es: [
      ["La isla de Calipso", "Cómoda, pero cautiva. Aquí empieza la travesía: pon en orden tu propio rincón.", "Odiseo y Calipso"],
      ["Los lotófagos", "Placeres que hacen olvidar el camino. Pruébalos y sigue navegando.", "La tierra de los lotófagos"],
      ["La cueva del cíclope", "Una prueba dura, que se afronta con ingenio y valor, no con orgullo.", "Ulises se burla de Polifemo"],
      ["Las sirenas", "Átate al mástil. La disciplina resiste aunque el canto sea dulce.", "Ulises y las sirenas"],
      ["Los vientos de Eolo", "Aprende a dominar los vientos, no a perseguirlos.", "Eolo entrega a Ulises el odre de los vientos"],
      ["La isla de Circe", "Lo que convierte a las personas en bestias, y la mente clara que lo resiste.", "Ulises devuelve a Criseida a su padre"],
      ["Escila y Caribdis", "Elige tu rumbo entre dos peligros y acepta su precio.", "Caribdis y Escila"],
      ["Las vacas del Sol", "Una sola cosa prohibida, y la paciencia de no tocarla aunque tengas hambre.", "El sol naciente entre la bruma"],
      ["El umbral del Hades", "Pregunta el camino al viejo adivino y escucha también la parte difícil.", "Tiresias predice el futuro a Odiseo"],
      ["El país de las sombras", "Los muertos hablan de lo que importa. Enfréntate a la muerte, al pasado y a ti mismo.", "La isla de los muertos"],
      ["La playa de Nausícaa", "Llegaste a la orilla sin nada. Pide ayuda con dignidad.", "Nausícaa"],
      ["El palacio de Alcínoo", "En el banquete, la historia de tu viaje. Cuéntala con verdad.", "Ulises en la corte de Alcínoo"],
      ["Ítaca", "Estás en casa. El timón de tu vida es tuyo.", "El regreso de Odiseo"]
    ],
    pt: [
      ["Ilha de Calipso", "Confortável, mas cativo. Aqui começa a viagem: ponha em ordem o seu canto.", "Odisseu e Calipso"],
      ["Os Lotófagos", "Prazeres que fazem esquecer o caminho. Prove-os e siga navegando.", "Terra dos Lotófagos"],
      ["A caverna do Ciclope", "Uma prova dura, enfrentada com astúcia e coragem, não com orgulho.", "Ulisses zombando de Polifemo"],
      ["As Sereias", "Amarre-se ao mastro. A disciplina segura mesmo quando o canto é doce.", "Ulisses e as Sereias"],
      ["Os ventos de Éolo", "Aprenda a dominar os ventos, não a persegui-los.", "Éolo entrega a Ulisses o odre dos ventos"],
      ["A ilha de Circe", "O que transforma pessoas em bichos, e a mente clara que resiste a isso.", "Ulisses devolve Criseida ao pai"],
      ["Cila e Caríbdis", "Escolha seu rumo entre dois perigos e aceite o preço.", "Caríbdis e Cila"],
      ["O gado do Sol", "Uma única coisa proibida, e a paciência de não tocá-la mesmo com fome.", "O sol nascendo através do vapor"],
      ["O limiar do Hades", "Pergunte o caminho ao velho adivinho e ouça também a parte difícil.", "Tirésias prediz o futuro a Odisseu"],
      ["A terra das sombras", "Os mortos falam do que importa. Encare a morte, o passado e a si mesmo.", "A ilha dos mortos"],
      ["A praia de Nausícaa", "Você chegou à praia sem nada. Peça ajuda com dignidade.", "Nausícaa"],
      ["O palácio de Alcínoo", "No banquete, a história da sua viagem. Conte-a com verdade.", "Ulisses na corte de Alcínoo"],
      ["Ítaca", "Você está em casa. O leme da sua vida é seu.", "O regresso de Odisseu"]
    ]
  };

  /* Strings the page script builds itself */
  var STR = {
    tr: { start: "1. gün · Yolculuğun başladığı yer", days: function (a, b) { return a + "–" + b + ". günler"; },
      lines: ["Hav! Seni görmek güzel.", "On beş dakika mı? Beklerim.", "Yirmi yıl hiçbir şey.", "İthaka, geliyoruz!"],
      invalid: "Lütfen geçerli bir e-posta adresi gir.", sending: "Gönderiliyor…", ok: "Teşekkürler. Haberi Argos getirecek.", fail: "Bir sorun oldu. Lütfen biraz sonra tekrar dene.", language: "Dil" },
    es: { start: "Día 1 · Donde empiezas", days: function (a, b) { return "Días " + a + "–" + b; },
      lines: ["¡Guau! Qué alegría verte.", "¿Quince minutos? Te espero.", "Veinte años no son nada.", "¡Ítaca, allá vamos!"],
      invalid: "Introduce una dirección de correo válida.", sending: "Enviando…", ok: "Gracias. Argos te traerá la noticia.", fail: "Algo salió mal. Inténtalo de nuevo en un momento.", language: "Idioma" },
    pt: { start: "Dia 1 · Onde você começa", days: function (a, b) { return "Dias " + a + "–" + b; },
      lines: ["Au au! Que bom ver você.", "Quinze minutos? Eu espero.", "Vinte anos não são nada.", "Ítaca, lá vamos nós!"],
      invalid: "Digite um endereço de e-mail válido.", sending: "Enviando…", ok: "Obrigado. O Argos vai trazer a novidade.", fail: "Algo deu errado. Tente de novo daqui a pouco.", language: "Idioma" }
  };

  window.NESTOR_I18N = {
    lang: lang,
    isles: ISLES[lang] || null,
    t: function (k, f) { return (STR[lang] && STR[lang][k]) || f; }
  };

  /* Page texts: [selector, "html" or attribute, tr, es, pt] */
  var R = function (d, n) { return '<span class="d">' + d + "</span><h3>" + n + "</h3>"; };
  var STEP = function (n, h, p, note) { return '<span class="n">' + n + "</span><h3>" + h + "</h3><p>" + p + '</p><span class="note">' + note + "</span>"; };
  var PAGE = [
    ['meta[name="description"]', "content",
      "Batı'nın bilgeliğinden günde on beş dakika: oku, anla, onunla bir şey yap. Kalypso'nun adasından İthaka'ya 90 günlük bir yolculuk. App Store ve Google Play'de.",
      "Quince minutos al día de la sabiduría de Occidente: léela, entiéndela y haz algo con ella. Una travesía de 90 días de la isla de Calipso a Ítaca. En App Store y Google Play.",
      "Quinze minutos por dia da sabedoria do Ocidente: leia, entenda e faça algo com ela. Uma viagem de 90 dias da ilha de Calipso a Ítaca. Na App Store e no Google Play."],
    ['.nav a[href="#day"]', "html", "Bir gün", "Un día", "Um dia"],
    ['.nav a[href="#voyage"]', "html", "Yolculuk", "La travesía", "A viagem"],
    ['.nav a[href="support.html"]', "html", "Destek", "Ayuda", "Suporte"],
    [".nav a.cta", "html", "Uygulamayı indir", "Descarga la app", "Baixe o app"],
    [".hero .kicker", "html", "Daha iyi bir hayat için felsefe", "Filosofía para vivir mejor", "Filosofia para uma vida melhor"],
    ["#hero-title", "html", "Doksan gün sonra <em>aynı insan</em> olmayacaksın.", "Dentro de noventa días, no serás <em>la misma persona.</em>", "Daqui a noventa dias, você não será <em>a mesma pessoa.</em>"],
    [".hero .lead", "html",
      "Günde on beş dakika: yaşamış en bilge insanlardan gerçek bir metin oku, onu yazan kişiyle tanış, ne anladığını sına ve bugün onunla küçük bir şey yap.",
      "Quince minutos al día: lee un texto real de las personas más sabias que han existido, conoce a quien lo escribió, comprueba lo que has entendido y haz hoy una pequeña cosa con ello.",
      "Quinze minutos por dia: leia um texto real das pessoas mais sábias que já viveram, conheça quem o escreveu, confira o que você entendeu e faça hoje uma pequena coisa com isso."],
    ['.store[title="App Store"] small', "html", "Hemen indir", "Descárgalo en el", "Baixar na"],
    ['.store[title="Google Play"] small', "html", "Hemen edin", "Disponible en", "Disponível no"],
    [".hero .meta", "html", "<b>English</b>, <b>Español</b>, <b>Português</b> ve <b>Türkçe</b> dillerinde.", "En <b>English</b>, <b>Español</b>, <b>Português</b> y <b>Türkçe</b>.", "Em <b>English</b>, <b>Español</b>, <b>Português</b> e <b>Türkçe</b>."],
    [".hero-phone img", "alt", "Nestor'un ana ekranı: Kürekçi rütbesi, 22 günlük seri, yolculuk haritası ve günün dersi.", "La pantalla de inicio de Nestor: el rango Remero, una racha de 22 días, el mapa de la travesía y la lección del día.", "A tela inicial do Nestor: a patente Remador, uma sequência de 22 dias, o mapa da viagem e a lição do dia."],
    [".badge-float.a", "html", "<b>90</b> günde İthaka'ya", "<b>90</b> días hasta Ítaca", "<b>90</b> dias até Ítaca"],
    [".badge-float.b", "html", "<b>15</b> dakika, her gün", "<b>15</b> minutos al día", "<b>15</b> minutos por dia"],
    [".scroll-cue", "html", '<i aria-hidden="true"></i>Yelken aç', '<i aria-hidden="true"></i>Zarpa', '<i aria-hidden="true"></i>Zarpe'],
    [".voices", "aria-label", "Yolculukta okuduğun yazarlardan bazıları", "Algunos de los autores que lees en la travesía", "Alguns dos autores que você lê na viagem"],

    ["#day .kicker", "html", "Nestor'la bir gün", "Un día con Nestor", "Um dia com Nestor"],
    ["#day h2", "html", "Oku, anla, onunla bir şey yap.", "Léelo, entiéndelo y haz algo con ello.", "Leia, entenda e faça algo com isso."],
    ["#day .head p:last-child", "html", "Her günün aynı bir düzeni var ve hiçbir şey yazmak zorunda değilsin.", "Todos los días tienen la misma forma, y no hace falta escribir nada.", "Todo dia tem a mesma forma, e você não precisa digitar nada."],
    [".day-steps li:nth-child(1)", "html",
      STEP("Önce", "Gerçek metni oku", "Batı felsefesinden ya da edebiyatından bir pasaj, kelimesi kelimesine; eski ya da zor kelimeler dokununca açıklanır. Ardından onu yazan kişinin hikâyesi: ne zaman, nerede ve neden yazdığı.", "Telifsiz çeviriler, kaynaklarıyla"),
      STEP("Primero", "Lee el texto real", "Un pasaje de filosofía o literatura occidental, palabra por palabra, con las palabras antiguas o difíciles explicadas al tocarlas. Después, la historia de quien lo escribió: cuándo, dónde y por qué.", "Traducciones de dominio público, con su fuente"),
      STEP("Primeiro", "Leia o texto real", "Um trecho de filosofia ou literatura ocidental, palavra por palavra, com as palavras antigas ou difíceis explicadas ao tocar. Depois, a história de quem o escreveu: quando, onde e por quê.", "Traduções em domínio público, com a fonte")],
    [".day-steps li:nth-child(2)", "html",
      STEP("Sonra", "Ne anladığını sına", "Metnin gerçekte ne söylediğine dair birkaç soru, kısa öğretici kartlar ve bir test. Kaçırdığın sorular Nestor'un haftalık tekrarında geri gelir.", "Dokun ve cevapla, hiç yazma"),
      STEP("Luego", "Comprueba lo que entendiste", "Unas preguntas sobre lo que dice realmente el pasaje, unas tarjetas breves y un test. Las preguntas que falles vuelven en el repaso semanal de Nestor.", "Toca para responder, nunca escribas"),
      STEP("Depois", "Confira o que você entendeu", "Algumas perguntas sobre o que o trecho realmente diz, cartões curtos e um teste. As perguntas que você errar voltam na revisão semanal do Nestor.", "Toque para responder, nunca digite")],
    [".day-steps li:nth-child(3)", "html",
      STEP("Bugün", "Onunla bir şey yap", "Bugün için somut bir görev; fikir sayfada kalmasın. Akşam da uyumadan önce düşünmen için birkaç soru.", "Yaklaşık on beş dakika"),
      STEP("Hoy", "Haz algo con ello", "Una tarea concreta para hoy, para que la idea salga de la página. Por la noche, unas preguntas para pensar antes de dormir.", "Unos quince minutos"),
      STEP("Hoje", "Faça algo com isso", "Uma tarefa concreta para hoje, para a ideia sair da página. À noite, algumas perguntas para pensar antes de dormir.", "Cerca de quinze minutos")],
    [".day-steps li:nth-child(4)", "html",
      STEP("Her gün", "Bir gün daha yaklaş", "Günü bitirdiğinde gemin yol alır. Kesene drahmiler dolar, Argos sevinir ve her yedi derste yeni bir adaya varırsın.", "Doksan gün, on üç ada"),
      STEP("Cada día", "Navega un día más cerca", "Termina el día y tu barco avanza. Las dracmas llenan tu bolsa, Argos lo celebra y cada siete lecciones llegas a una isla nueva.", "Noventa días, trece islas"),
      STEP("Todo dia", "Navegue um dia mais perto", "Termine o dia e seu navio avança. As dracmas enchem sua bolsa, Argos comemora e a cada sete lições você chega a uma nova ilha.", "Noventa dias, treze ilhas")],

    ["#voyage .kicker", "html", "Yolculuk", "La travesía", "A viagem"],
    ["#voyage-title", "html", "Kalypso'nun adasından İthaka'ya.", "De la isla de Calipso a Ítaca.", "Da ilha de Calipso a Ítaca."],
    ["#voyage .head p:last-child", "html",
      "Doksan günün bir Odysseia: her hafta bir ada, her birinin kendi dersi, tablosu ve sınavı. Nestor öğütler. Dümen sende.",
      "Tus noventa días son una Odisea: una isla por semana, cada una con su lección, su cuadro y su prueba. Nestor aconseja. Tú llevas el timón.",
      "Seus noventa dias são uma Odisseia: uma ilha por semana, cada uma com sua lição, sua pintura e sua prova. Nestor aconselha. Você conduz."],
    [".chart-hud span", "html", "/ 13 ada", "de 13 islas", "de 13 ilhas"],

    ["#ranks .kicker", "html", "Rütbeler ve mühürler", "Rangos y sellos", "Patentes e selos"],
    ["#ranks h2", "html", "Kazazedelikten evinin efendisi olmaya.", "De náufrago a dueño de tu casa.", "De náufrago a dono da sua casa."],
    ["#ranks .head p:last-child", "html",
      "Rütben, sürdürdüğün günlerle yükselir. Her ada bir sınavla biter; geçersen adanın mührünü kazanırsın.",
      "Tu rango sube con los días que mantienes. Cada isla termina con una prueba, y superarla te da el sello de la isla.",
      "Sua patente sobe com os dias que você mantém. Cada ilha termina com uma prova, e passar nela rende o selo da ilha."],
    [".ranks li:nth-child(1)", "html", R("0. gün", "Kazazede"), R("Día 0", "Náufrago"), R("Dia 0", "Náufrago")],
    [".ranks li:nth-child(2)", "html", R("7. gün", "Tayfa"), R("Día 7", "Marinero"), R("Dia 7", "Marujo")],
    [".ranks li:nth-child(3)", "html", R("21. gün", "Kürekçi"), R("Día 21", "Remero"), R("Dia 21", "Remador")],
    [".ranks li:nth-child(4)", "html", R("35. gün", "Dümenci"), R("Día 35", "Timonel"), R("Dia 35", "Timoneiro")],
    [".ranks li:nth-child(5)", "html", R("56. gün", "Rotacı"), R("Día 56", "Navegante"), R("Dia 56", "Navegador")],
    [".ranks li:nth-child(6)", "html", R("77. gün", "Kaptan"), R("Día 77", "Capitán"), R("Dia 77", "Capitão")],
    [".ranks li:nth-child(7)", "html", R("90. gün", "Evinin efendisi"), R("Día 90", "Dueño de tu casa"), R("Dia 90", "Dono da sua casa")],
    [".trial-row .tcard:nth-child(1) h3", "html", "Ada sınavları", "Pruebas de isla", "Provas das ilhas"],
    [".trial-row .tcard:nth-child(1) p", "html",
      "Bir adanın yedi gününü bitirdiğinde sınavı açılır: o haftadan altı soru. Geçersen ada mühürlenir.",
      "Cuando terminas los siete días de una isla, se abre su prueba: seis preguntas de esa semana. Si la superas, la isla queda sellada.",
      "Quando você termina os sete dias de uma ilha, a prova dela abre: seis perguntas daquela semana. Passe e a ilha fica selada."],
    [".trial-row .tcard:nth-child(2) h3", "html", "Drahmiler", "Dracmas", "Dracmas"],
    [".trial-row .tcard:nth-child(2) p", "html",
      "Bitirdiğin her gün keseni doldurur. Pazarda harcayıp gemini yeni yelkenler ve amblemlerle donat.",
      "Cada día terminado llena tu bolsa. Gástalas en el mercado para vestir tu barco con velas y emblemas nuevos.",
      "Cada dia concluído enche sua bolsa. Gaste no mercado para enfeitar seu navio com velas e emblemas novos."],
    [".trial-row .tcard:nth-child(3) h3", "html", "Nestor'un tekrarı", "El repaso de Nestor", "A revisão do Nestor"],
    [".trial-row .tcard:nth-child(3) p", "html",
      "Her hafta kaçırdığın sorular geri gelir; böylece okudukların aklında kalır.",
      "Cada semana vuelven las preguntas que fallaste, para que lo que lees se quede contigo.",
      "Toda semana, as perguntas que você errou voltam, para que o que você lê fique com você."],

    [".argos-art", "aria-label", "Argos'u sev", "Acaricia a Argos", "Fazer carinho no Argos"],
    ["#argos .kicker", "html", "Yol arkadaşın", "Tu compañero", "Seu companheiro"],
    ["#argos h2", "html", "Argos seni bekliyor.", "Argos te espera.", "Argos espera por você."],
    ["#argos .argos > div > p:nth-of-type(2)", "html",
      "Odysseus'un sadık köpeği, sahibinin eve dönmesini yirmi yıl bekledi. Nestor'da her gün sana eşlik eder, bitirdiğinde sevinir, işin bitince de kestirir.",
      "El perro fiel de Odiseo esperó veinte años a que volviera a casa. En Nestor te acompaña cada día, lo celebra cuando terminas y se echa una siesta cuando acabas.",
      "O cão fiel de Odisseu esperou vinte anos pela volta do dono. No Nestor, ele faz companhia todos os dias, comemora quando você termina e tira uma soneca quando acaba."],
    ["#argos .argos > div > p:nth-of-type(3)", "html",
      "Asla azarlamaz. Her yedinci ders bir liman günü kazandırır; hayat araya girdiğinde serin bozulmaz.",
      "Nunca te regaña. Cada siete lecciones ganas un día de puerto, así que cuando la vida se interpone, tu racha sigue.",
      "Ele nunca dá bronca. A cada sete lições você ganha um dia de porto, então, quando a vida atrapalha, sua sequência continua."],
    [".harbor", "aria-label", "Altı ders ve bir liman günü", "Seis lecciones y un día de puerto", "Seis lições e um dia de porto"],
    [".harbor i.h", "title", "Liman günü", "Día de puerto", "Dia de porto"],

    ["#honest .kicker", "html", "Özenle yapıldı", "Hecho con cuidado", "Feito com cuidado"],
    ["#honest h2", "html", "Ne olduğu konusunda dürüst.", "Honesto sobre lo que es.", "Honesto sobre o que é."],
    ["ul.honest li:nth-child(1)", "html",
      "<h3>Gerçek metinler</h3><p>Her pasaj, telifsiz bir çeviriden kelimesi kelimesine alınır; kaynağı derste gösterilir.</p>",
      "<h3>Textos reales</h3><p>Cada pasaje se cita palabra por palabra de una traducción de dominio público, con su fuente en la lección.</p>",
      "<h3>Textos reais</h3><p>Cada trecho é citado palavra por palavra de uma tradução em domínio público, com a fonte na lição.</p>"],
    ["ul.honest li:nth-child(2)", "html",
      "<h3>Gerçek tablolar</h3><p>Tablolar her dersin içinden geçer. Hepsi kamu malıdır; ressamı, yılı ve koleksiyonu belirtilir.</p>",
      "<h3>Cuadros reales</h3><p>Los cuadros recorren todas las lecciones. Todos son de dominio público, con su autor, año y colección.</p>",
      "<h3>Pinturas reais</h3><p>As pinturas atravessam todas as lições. Todas estão em domínio público, com artista, ano e acervo indicados.</p>"],
    ["ul.honest li:nth-child(3)", "html",
      "<h3>Verilerin sende kalır</h3><p>Hesap yok, sunucu yok. İlerlemen, notların ve ayarların telefonunda kalır.</p>",
      "<h3>Tus datos son tuyos</h3><p>Sin cuentas ni servidores. Tu progreso, tus notas y tus ajustes se quedan en tu teléfono.</p>",
      "<h3>Seus dados são seus</h3><p>Sem contas e sem servidores. Seu progresso, suas notas e suas configurações ficam no seu celular.</p>"],
    [".art-strip", "aria-label", "Yolculuktaki tablolardan bazıları", "Algunos cuadros de la travesía", "Algumas pinturas da viagem"],

    ["#get h2", "html", "Gemin limanda seni bekliyor.", "Tu barco te espera en el puerto.", "Seu navio espera no porto."],
    ["#get .join > div > p", "html",
      "Nestor'u indirmek ücretsiz. Bugün Kalypso'nun adasından başla ve doksan gün sonra nerede olduğuna bak.",
      "Descargar Nestor es gratis. Empieza hoy en la isla de Calipso y mira dónde estás dentro de noventa días.",
      "Baixar o Nestor é grátis. Comece hoje na ilha de Calipso e veja onde você estará em noventa dias."],
    ["#get .langs", "aria-label", "Uygulamanın dilleri", "Idiomas de la app", "Idiomas do app"],
    ["#waitlist h3", "html", "Yeni yolculuklardan haberdar ol", "Entérate de nuevas travesías", "Saiba das novas viagens"],
    ["#waitlist h3 + p", "html",
      "E-postanı bırak; yeni bir kurs ya da dil yola çıktığında yazalım. Başka hiçbir şey göndermeyiz.",
      "Déjanos tu correo y te escribiremos cuando zarpe un curso o idioma nuevo. Nada más.",
      "Deixe seu e-mail e escreveremos quando um novo curso ou idioma zarpar. Nada mais."],
    ['label[for="w-email"]', "html", "E-posta", "Correo electrónico", "E-mail"],
    ["#w-email", "placeholder", "sen@ornek.com", "tu@ejemplo.com", "voce@exemplo.com"],
    ['label[for="w-lang"]', "html", "Tercih ettiğin dil", "Idioma preferido", "Idioma preferido"],
    ['#waitlist button[type="submit"]', "html", "Haber ver", "Avísame", "Quero saber"],
    ["#waitlist p.fine:last-child", "html",
      'E-postanı yalnızca bu haber için kullanırız. <a href="privacy.html">Gizlilik Politikamıza</a> bakabilirsin.',
      'Solo usamos tu correo para enviarte esa noticia. Consulta nuestra <a href="privacy.html">Política de privacidad</a>.',
      'Usamos seu e-mail só para enviar essa novidade. Veja nossa <a href="privacy.html">Política de Privacidade</a>.'],

    ["footer .motto", "html", "Nestor öğütler. Dümen sende.", "Nestor aconseja. Tú llevas el timón.", "Nestor aconselha. Você conduz."],
    ['footer a[href="support.html"]', "html", "Destek", "Ayuda", "Suporte"],
    ['footer a[href="privacy.html"]', "html", "Gizlilik", "Privacidad", "Privacidade"],
    ['footer a[href="../index.html"]', "html", "Bir OSplusstudio ürünü", "Un producto de OSplusstudio", "Um produto OSplusstudio"]
  ];

  var col = { tr: 2, es: 3, pt: 4 }[lang];
  if (col) {
    PAGE.forEach(function (row) {
      document.querySelectorAll(row[0]).forEach(function (el) {
        if (row[1] === "html") el.innerHTML = row[col];
        else el.setAttribute(row[1], row[col]);
      });
    });
  }

  /* language switcher, before the "Get the app" button */
  var nav = document.querySelector(".nav nav"), cta = nav && nav.querySelector(".cta");
  if (nav) {
    var box = document.createElement("span");
    box.className = "lang";
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", window.NESTOR_I18N.t("language", "Language"));
    LANGS.forEach(function (l) {
      var a = document.createElement("a");
      a.href = "?lang=" + l + location.hash;
      a.lang = l;
      a.textContent = l.toUpperCase();
      if (l === lang) a.setAttribute("aria-current", "true");
      box.appendChild(a);
    });
    nav.insertBefore(box, cta);
  }
})();
