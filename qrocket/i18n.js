/* QRoket sayfasının İngilizce, Almanca, İspanyolca ve Portekizce metinleri.
   Sayfa Türkçe yazılır. Bu dosya, sayfanın betikleri çalışmadan önce her öğenin Türkçe içeriğini sözlükte arar ve
   bulursa seçilen dildeki karşılığıyla değiştirir. Misafir sohbetleri bilerek çok dilli kalır.
   Dil seçimi ana sayfayla ortaktır (osplus-lang): ?lang= bağlantısı, kayıtlı seçim, tarayıcı dili. */
(function () {
  /* Dil seçimi, yön ve yazı tipleri ../lang-core.js'te. Bu dosyadaki diziler [en, de, es, pt] sırasındadır;
     diğer diller (ru, ar, pl, nl, fr, it, fa) lang/<kod>.js paketlerinde, Türkçe metnin kısa anahtarıyla durur.
     Çevirisi olmayan metin İngilizce gösterilir. */
  var OSL = window.OSL;
  if (OSL.needPack("lang/", document.currentScript.src)) return;
  var lang = OSL.lang, PACK = window.OS_PACK || {};
  var OLD = ["en", "de", "es", "pt"], col = OLD.indexOf(lang);
  // bir sözlük satırının seçilen dildeki karşılığı: eski dillerde sütun, yenilerde paket, yoksa İngilizce
  function pickVal(row, part, key) {
    if (col >= 0) return row[col];
    var p = PACK[part] && PACK[part][key];
    return p != null ? p : row[0];
  }

  /* betiklerin kendi ürettiği metinler: [en, de, es, pt] */
  var S = {
    answering: ["Table 12 · answering", "Tisch 12 · antwortet", "Mesa 12 · respondiendo", "Mesa 12 · respondendo"],
    listening: ["Table 12 · listening", "Tisch 12 · hört zu", "Mesa 12 · escuchando", "Mesa 12 · ouvindo"],
    langLabel: ["language", "Sprache", "idioma", "idioma"],
    source: ["source: the venue's menu", "Quelle: Speisekarte des Lokals", "fuente: la carta del local", "fonte: o cardápio da casa"],
    noName: ["Please enter your name.", "Bitte geben Sie Ihren Namen ein.", "Escribe tu nombre, por favor.", "Digite seu nome, por favor."],
    badEmail: ["Please enter a valid email address.", "Bitte geben Sie eine gültige E-Mail-Adresse ein.", "Introduce una dirección de correo válida.", "Digite um endereço de e-mail válido."],
    sending: ["Sending…", "Wird gesendet…", "Enviando…", "Enviando…"],
    sent: ["Thank you, your application has reached us. We'll write to you soon.", "Danke, Ihre Bewerbung ist bei uns angekommen. Wir melden uns bald.", "Gracias, hemos recibido tu solicitud. Te escribiremos pronto.", "Obrigado, recebemos sua inscrição. Em breve vamos escrever para você."],
    failed: ["Could not send. Please write to info@osplusstudio.com.", "Senden fehlgeschlagen. Bitte schreiben Sie an info@osplusstudio.com.", "No se pudo enviar. Escríbenos a info@osplusstudio.com.", "Não foi possível enviar. Escreva para info@osplusstudio.com."],
    mailOpened: ["Your email app has opened with the details filled in; just press send. If it didn't open, write to info@osplusstudio.com.", "Ihr E-Mail-Programm wurde mit den ausgefüllten Angaben geöffnet; Sie müssen nur noch senden. Falls nicht, schreiben Sie an info@osplusstudio.com.", "Se abrió tu aplicación de correo con los datos rellenados; solo tienes que enviarlo. Si no se abrió, escribe a info@osplusstudio.com.", "Seu aplicativo de e-mail abriu com os dados preenchidos; é só enviar. Se não abriu, escreva para info@osplusstudio.com."],
    table: ["TABLE 12", "TISCH 12", "MESA 12", "MESA 12"],
    language: ["Language", "Sprache", "Idioma", "Idioma"],
    /* mekân sahnelerindeki sipariş kartı */
    tableWord: ["Table", "Tisch", "Mesa", "Mesa"],
    scanned: ["QR scanned", "QR gescannt", "QR escaneado", "QR escaneado"],
    waiterReady: ["AI waiter ready", "KI-Kellner bereit", "camarero IA listo", "garçom IA pronto"],
    order: ["Order", "Bestellung", "Pedido", "Pedido"],
    toBar: ["sent to the bar", "an die Bar gesendet", "enviado a la barra", "enviado ao bar"],
    toKitchen: ["sent to the kitchen", "an die Küche gesendet", "enviado a cocina", "enviado à cozinha"],
    toBarista: ["sent to the barista", "an den Barista gesendet", "enviado al barista", "enviado ao barista"],
    toTab: ["added to the tab", "zur Rechnung hinzugefügt", "añadido a la cuenta", "adicionado à conta"],
    split: ["Bill split", "Rechnung geteilt", "Cuenta dividida", "Conta dividida"],
    total: ["Total", "Gesamt", "Total", "Total"],
    left: ["Remaining", "Offen", "Pendiente", "Restante"],
    people: ["people", "Personen", "personas", "pessoas"],
    toShowcase: ["sent to the counter", "an die Vitrine gesendet", "enviado al mostrador", "enviado ao balcão"],
    sunbed: ["Sunbed", "Liege", "Tumbona", "Espreguiçadeira"],
    room: ["Room", "Zimmer", "Habitación", "Quarto"],
    /* canlı menü */
    itemsFound: ["items found", "Gerichte erkannt", "platos detectados", "itens encontrados"],
    priceUpdated: ["Price updated from the panel", "Preis im Panel aktualisiert", "Precio actualizado desde el panel", "Preço atualizado pelo painel"]
  };
  window.QR_I18N = { lang: lang, locale: OSL.locale, t: function (k, f) { return lang !== "tr" && S[k] ? pickVal(S[k], "S", k) : f; } };

  /* sayfa metinleri: Türkçe içerik → [en, de, es, pt] */
  var D = {
    // mekânlar: yeni üç mekân
    'Bardan beach bara. <span class="holo">Her mekâna kendi garsonu.</span>': ['From bar to beach bar. <span class="holo">A waiter for every venue.</span>', 'Von der Bar bis zur Beach-Bar. <span class="holo">Jedem Lokal sein eigener Kellner.</span>', 'Del bar al chiringuito. <span class="holo">Cada local con su camarero.</span>', 'Do bar ao beach bar. <span class="holo">Cada local com seu garçom.</span>'],
    "Pastane": ["Bakery", "Konditorei", "Pastelería", "Confeitaria"],
    "Pizzacı": ["Pizzeria", "Pizzeria", "Pizzería", "Pizzaria"],
    "Beach bar": ["Beach bar", "Beach-Bar", "Chiringuito", "Beach bar"],
    "Pastane · öğleden sonra": ["Bakery · afternoon", "Konditorei · Nachmittag", "Pastelería · tarde", "Confeitaria · tarde"],
    "Pizzacı · akşam": ["Pizzeria · evening", "Pizzeria · Abend", "Pizzería · noche", "Pizzaria · noite"],
    "Beach bar · gün batımı": ["Beach bar · sunset", "Beach-Bar · Sonnenuntergang", "Chiringuito · atardecer", "Beach bar · pôr do sol"],
    "Pizza ve burger": ["Pizza and burgers", "Pizza und Burger", "Pizza y hamburguesas", "Pizza e hambúrguer"],
    "Otel ve beach bar": ["Hotel and beach bar", "Hotel und Beach-Bar", "Hotel y chiringuito", "Hotel e beach bar"],
    "Vitrin <em>telefonda</em>, çay masada.": ["The display case <em>on the phone</em>, tea at the table.", "Die Vitrine <em>auf dem Handy</em>, der Tee am Tisch.", "La vitrina <em>en el móvil</em>, el té en la mesa.", "A vitrine <em>no celular</em>, o chá na mesa."],
    "Misafir vitrindeki tatlıyı sohbetle sorar, alerjenini öğrenir, çayıyla birlikte masasına ya da paket olarak ister. Günün tazeleri menüde öne çıkar.": ["Guests ask about the cakes in the display case, check allergens and order with their tea, at the table or to take away. Today's fresh bakes are featured on the menu.", "Gäste fragen nach dem Kuchen in der Vitrine, prüfen Allergene und bestellen mit Tee an den Tisch oder zum Mitnehmen. Das Frische des Tages steht oben.", "El cliente pregunta por los pasteles de la vitrina, consulta alérgenos y pide con su té, en la mesa o para llevar. Lo recién horneado del día se destaca.", "O cliente pergunta pelos doces da vitrine, confere alérgenos e pede com o chá, na mesa ou para viagem. As novidades do dia ficam em destaque."],
    "Vitrindeki ürün sohbetle sorulur": ["Ask about the display case in chat", "Vitrine per Chat erfragen", "Pregunta por la vitrina en el chat", "Pergunte pela vitrine no chat"],
    "Masaya ya da paket sipariş": ["Order to the table or to go", "Am Tisch oder zum Mitnehmen", "A la mesa o para llevar", "Na mesa ou para viagem"],
    "Alerjen ve glutensiz filtresi": ["Allergen and gluten-free filter", "Allergen- und glutenfrei-Filter", "Filtro de alérgenos y sin gluten", "Filtro de alérgenos e sem glúten"],
    "Günün tazeleri menüde öne çıkar": ["Today's fresh bakes are featured", "Frisches des Tages wird hervorgehoben", "Lo recién hecho del día se destaca", "As novidades do dia ficam em destaque"],
    "Ekstra peynir, soğansız: <em>tek mesajda</em>.": ["Extra cheese, no onions: <em>in one message</em>.", "Extra Käse, ohne Zwiebeln: <em>in einer Nachricht</em>.", "Extra de queso, sin cebolla: <em>en un mensaje</em>.", "Queijo extra, sem cebola: <em>numa mensagem</em>."],
    "Yoğun akşamda en çok zaman alan şey malzeme seçimi. Misafir ekstrasını, çıkarılacak malzemeyi ve alerjenini sohbetle söyler; mutfağa net bir fiş düşer.": ["On a busy night, toppings take the most time. Guests state extras, what to leave out and allergens in chat; the kitchen gets a clear ticket.", "Am vollen Abend kosten Zutatenwünsche die meiste Zeit. Gäste nennen Extras, Weglassungen und Allergene im Chat; die Küche bekommt einen klaren Bon.", "En una noche llena, los ingredientes son lo que más tiempo lleva. El cliente indica extras, lo que quita y sus alérgenos en el chat; cocina recibe un ticket claro.", "Numa noite cheia, os ingredientes são o que mais toma tempo. O cliente diz extras, o que tirar e alérgenos no chat; a cozinha recebe um pedido claro."],
    "Ekstra ve çıkarılacak malzeme sohbetle": ["Extras and removals in chat", "Extras und Weglassungen per Chat", "Extras y sin ingredientes en el chat", "Extras e retiradas no chat"],
    "Alerjen ve vejetaryen filtresi": ["Allergen and vegetarian filter", "Allergen- und Vegetarisch-Filter", "Filtro de alérgenos y vegetariano", "Filtro de alérgenos e vegetariano"],
    "Mutfağa net, Türkçe fiş": ["A clear ticket for the kitchen, in Turkish", "Klarer Bon auf Türkisch für die Küche", "Ticket claro para cocina, en turco", "Pedido claro para a cozinha, em turco"],
    "Masa ve paket sipariş birlikte": ["Table and takeaway orders together", "Tisch- und Mitnahmebestellungen zusammen", "Pedidos en mesa y para llevar juntos", "Pedidos na mesa e para viagem juntos"],
    "Şezlongdan sipariş, <em>misafirin dilinde</em>.": ["Orders from the sunbed, <em>in the guest's language</em>.", "Bestellen von der Liege, <em>in der Sprache des Gastes</em>.", "Pedidos desde la tumbona, <em>en el idioma del cliente</em>.", "Pedidos da espreguiçadeira, <em>no idioma do cliente</em>."],
    "Turist misafir şezlong ya da oda numarasındaki QR'ı okutur, kendi dilinde sipariş verir; içecek doğrudan bulunduğu yere gelir, tutar oda hesabına eklenebilir.": ["Tourists scan the QR on their sunbed or room number and order in their own language; drinks come straight to them, and the amount can go on the room bill.", "Touristen scannen den QR an der Liege oder Zimmernummer und bestellen in ihrer Sprache; Getränke kommen direkt zu ihnen, der Betrag kann aufs Zimmer gehen.", "El turista escanea el QR de su tumbona o habitación y pide en su idioma; la bebida llega donde está y el importe puede cargarse a la habitación.", "O turista escaneia o QR da espreguiçadeira ou do quarto e pede no seu idioma; a bebida chega até ele e o valor pode ir para a conta do quarto."],
    "Şezlong ve oda numarasına sipariş": ["Orders to sunbed and room numbers", "Bestellungen an Liege und Zimmer", "Pedidos a tumbona y habitación", "Pedidos para espreguiçadeira e quarto"],
    "Turist misafirle kendi dilinde": ["With tourists in their own language", "Mit Touristen in ihrer Sprache", "Con turistas en su idioma", "Com turistas no idioma deles"],
    "Tutar oda hesabına eklenir": ["Charged to the room bill", "Auf die Zimmerrechnung gebucht", "Se carga a la habitación", "Lançado na conta do quarto"],
    "Havuz başında garson çağırma": ["Call a waiter at the pool", "Kellner am Pool rufen", "Llamar al camarero en la piscina", "Chamar o garçom na piscina"],
    // garson için
    "Garson için": ["For your waiters", "Für Ihr Servicepersonal", "Para tus camareros", "Para seus garçons"],
    'Garsonunuz koşmaz, <span class="holo">ağırlar.</span>': ['Your waiters stop running <span class="holo">and start hosting.</span>', 'Ihr Personal rennt nicht, <span class="holo">es bewirtet.</span>', 'Tu camarero no corre, <span class="holo">atiende.</span>', 'Seu garçom não corre, <span class="holo">recebe.</span>'],
    "Menüyü anlatmak, siparişi not almak, hesabı getirmek ve \"garson!\" çağrıları QRoket'e geçer. Garson zamanını servise ve misafirle ilgilenmeye ayırır.": [
      'Explaining the menu, taking orders, bringing the bill and "waiter!" calls move to QRoket. Your staff spend their time serving and looking after guests.',
      'Karte erklären, Bestellungen aufnehmen, Rechnung bringen und „Hallo!“-Rufe übernimmt QRoket. Ihr Personal kümmert sich um Service und Gäste.',
      'Explicar la carta, tomar nota, llevar la cuenta y las llamadas de "¡camarero!" pasan a QRoket. Tu equipo dedica su tiempo a servir y atender.',
      'Explicar o cardápio, anotar pedidos, levar a conta e os chamados de "garçom!" passam para o QRoket. Sua equipe dedica o tempo a servir e cuidar dos clientes.'],
    "<span class=\"wt-chip\">QRoket'siz</span><b>Bir akşam servisi</b>": ['<span class="wt-chip">Without QRoket</span><b>An evening service</b>', '<span class="wt-chip">Ohne QRoket</span><b>Ein Abendservice</b>', '<span class="wt-chip">Sin QRoket</span><b>Un servicio de noche</b>', '<span class="wt-chip">Sem QRoket</span><b>Um serviço da noite</b>'],
    "<span class=\"wt-chip ok\">QRoket'li</span><b>Aynı akşam</b>": ['<span class="wt-chip ok">With QRoket</span><b>The same evening</b>', '<span class="wt-chip ok">Mit QRoket</span><b>Derselbe Abend</b>', '<span class="wt-chip ok">Con QRoket</span><b>La misma noche</b>', '<span class="wt-chip ok">Com QRoket</span><b>A mesma noite</b>'],
    "Yürünen yol": ["Distance walked", "Gelaufene Strecke", "Distancia recorrida", "Distância percorrida"],
    "Masaya gidiş": ["Trips to tables", "Gänge zum Tisch", "Viajes a la mesa", "Idas à mesa"],
    "Tekrarlanan sorular": ["Repeated questions", "Wiederholte Fragen", "Preguntas repetidas", "Perguntas repetidas"],
    "Örnek gösterimdir.": ["Illustrative example.", "Beispielhafte Darstellung.", "Ejemplo ilustrativo.", "Exemplo ilustrativo."],
    "Menüyü ve alerjenleri anlatmak": ["Explaining the menu and allergens", "Karte und Allergene erklären", "Explicar la carta y los alérgenos", "Explicar o cardápio e os alérgenos"],
    "AI garson menünüzden cevaplar": ["The AI waiter answers from your menu", "Der KI-Kellner antwortet aus Ihrer Karte", "El camarero IA responde desde tu carta", "O garçom IA responde a partir do seu cardápio"],
    "Siparişi not almak": ["Writing down orders", "Bestellungen notieren", "Tomar nota del pedido", "Anotar o pedido"],
    "Onaylı sipariş mutfağa Türkçe düşer": ["Confirmed orders reach the kitchen in Turkish", "Bestätigte Bestellungen kommen auf Türkisch in der Küche an", "El pedido confirmado llega a cocina en turco", "O pedido confirmado chega à cozinha em turco"],
    "Hesabı getirmek ve bölmek": ["Bringing and splitting the bill", "Rechnung bringen und teilen", "Llevar y dividir la cuenta", "Levar e dividir a conta"],
    "Misafir masada öder": ["Guests pay at the table", "Gäste zahlen am Tisch", "El cliente paga en la mesa", "O cliente paga na mesa"],
    '"Garson!" çağrılarına koşmak': ['Running to "waiter!" calls', 'Auf „Hallo!“-Rufe rennen', 'Correr a cada "¡camarero!"', 'Correr a cada "garçom!"'],
    "Garson yalnızca gerektiğinde çağrılır": ["Staff are called only when needed", "Personal wird nur bei Bedarf gerufen", "Solo se llama al camarero cuando hace falta", "O garçom só é chamado quando necessário"],
    "Ekibinizin yükünü hafifletin.": ["Lighten your team's load.", "Entlasten Sie Ihr Team.", "Aligera la carga de tu equipo.", "Alivie a carga da sua equipe."],
    // pilot kartı, başvuru adımları, nasıl çalışır
    '<i class="dot" aria-hidden="true"></i>Pilot programı · Faz 1': ['<i class="dot" aria-hidden="true"></i>Pilot programme · Phase 1', '<i class="dot" aria-hidden="true"></i>Pilotprogramm · Phase 1', '<i class="dot" aria-hidden="true"></i>Programa piloto · Fase 1', '<i class="dot" aria-hidden="true"></i>Programa piloto · Fase 1'],
    "8 restoran pilotta. Sıradaki siz olun.": ["8 restaurants in the pilot. You could be next.", "8 Restaurants im Pilot. Sie könnten die Nächsten sein.", "8 restaurantes en el piloto. El siguiente puedes ser tú.", "8 restaurantes no piloto. O próximo pode ser você."],
    "Pilot işletmelere erken erişim": ["Early access for pilot venues", "Früher Zugang für Pilotbetriebe", "Acceso anticipado para locales piloto", "Acesso antecipado para locais piloto"],
    "Kurulumda birebir destek": ["One-to-one help with setup", "Persönliche Hilfe bei der Einrichtung", "Ayuda personal en la instalación", "Ajuda individual na instalação"],
    "Hedef: 30 dakikada canlı menü": ["Goal: a live menu in 30 minutes", "Ziel: live Speisekarte in 30 Minuten", "Objetivo: carta en vivo en 30 minutos", "Meta: cardápio no ar em 30 minutos"],
    "Başvurun →": ["Apply →", "Bewerben →", "Solicitar →", "Inscrever-se →"],
    "Formu doldurun": ["Fill in the form", "Formular ausfüllen", "Rellena el formulario", "Preencha o formulário"],
    "Bir dakikanızı alır.": ["It takes a minute.", "Dauert eine Minute.", "Te lleva un minuto.", "Leva um minuto."],
    "Size dönüyoruz": ["We get back to you", "Wir melden uns", "Te contactamos", "Entramos em contato"],
    "Genelde birkaç iş günü içinde arıyoruz.": ["Usually within a few working days.", "Meist innerhalb weniger Werktage.", "Normalmente en pocos días laborables.", "Normalmente em poucos dias úteis."],
    "Menünüz canlıya geçer": ["Your menu goes live", "Ihre Karte geht live", "Tu carta sale en vivo", "Seu cardápio entra no ar"],
    "Kurulumda birebir destek; hedef 30 dakika.": ["One-to-one setup help; goal 30 minutes.", "Persönliche Hilfe beim Einrichten; Ziel 30 Minuten.", "Ayuda personal en la instalación; objetivo 30 minutos.", "Ajuda individual na instalação; meta de 30 minutos."],
    "Nasıl çalışır": ["How it works", "So funktioniert's", "Cómo funciona", "Como funciona"],
    'Menüden hesaba, <span class="holo">altı adımda.</span>': ['From menu to bill, <span class="holo">in six steps.</span>', 'Von der Karte zur Rechnung, <span class="holo">in sechs Schritten.</span>', 'De la carta a la cuenta, <span class="holo">en seis pasos.</span>', 'Do cardápio à conta, <span class="holo">em seis passos.</span>'],
    "Kurulumdan masada kapanan hesaba kadar QRoket'in işletmenizde nasıl çalıştığı.": ["How QRoket works in your venue, from setup to the bill closed at the table.", "Wie QRoket in Ihrem Lokal funktioniert, von der Einrichtung bis zur Rechnung am Tisch.", "Cómo funciona QRoket en tu local, desde la instalación hasta la cuenta cerrada en la mesa.", "Como o QRoket funciona no seu local, da instalação à conta fechada na mesa."],
    "Menünüzün fotoğrafını çekin": ["Take a photo of your menu", "Fotografieren Sie Ihre Karte", "Haz una foto de tu carta", "Tire uma foto do seu cardápio"],
    "Ürün, fiyat ve kategoriler ayrıştırılır. Hedef: 30 dakikada canlı menü.": ["Dishes, prices and categories are extracted. Goal: a live menu in 30 minutes.", "Gerichte, Preise und Kategorien werden erkannt. Ziel: live Karte in 30 Minuten.", "Se extraen platos, precios y categorías. Objetivo: carta en vivo en 30 minutos.", "Pratos, preços e categorias são extraídos. Meta: cardápio no ar em 30 minutos."],
    "QR masaya konur": ["The QR goes on the table", "Der QR kommt auf den Tisch", "El QR va a la mesa", "O QR vai para a mesa"],
    "Masa standı ve basılı fiyat listesi panelden hazır çıkar.": ["Table stands and the printed price list come ready from the panel.", "Tischaufsteller und gedruckte Preisliste kommen fertig aus dem Panel.", "Los soportes de mesa y la lista de precios impresa salen listos del panel.", "Displays de mesa e a tabela de preços impressa saem prontos do painel."],
    "Misafir kendi dilinde sorar": ["Guests ask in their own language", "Gäste fragen in ihrer Sprache", "El cliente pregunta en su idioma", "O cliente pergunta no seu idioma"],
    "Sipariş mutfağa Türkçe düşer": ["The order reaches the kitchen in Turkish", "Die Bestellung kommt auf Türkisch in der Küche an", "El pedido llega a cocina en turco", "O pedido chega à cozinha em turco"],
    "Misafir onaylamadan gitmez; mutfak net bir fiş görür.": ["Nothing is sent until the guest confirms; the kitchen sees a clear ticket.", "Nichts geht raus, bevor der Gast bestätigt; die Küche sieht einen klaren Bon.", "No sale nada hasta que el cliente confirma; cocina ve un ticket claro.", "Nada sai antes de o cliente confirmar; a cozinha vê um pedido claro."],
    "Hesap masada kapanır": ["The bill closes at the table", "Die Rechnung wird am Tisch beglichen", "La cuenta se cierra en la mesa", "A conta fecha na mesa"],
    "Herkes kendi payını öder, bahşiş isteğe bağlı.": ["Everyone pays their share; tipping is optional.", "Jeder zahlt seinen Anteil; Trinkgeld ist freiwillig.", "Cada uno paga su parte; la propina es opcional.", "Cada um paga a sua parte; a gorjeta é opcional."],
    "Faz 2": ["Phase 2", "Phase 2", "Fase 2", "Fase 2"],
    "Panelden yönetin": ["Manage it from the panel", "Steuern Sie alles im Panel", "Gestiona desde el panel", "Gerencie pelo painel"],
    "Fiyat, vitrin ve misafirlerin sorduğu her şey tek ekranda.": ["Prices, the showcase and everything guests ask, on one screen.", "Preise, Schaufenster und alle Gästefragen auf einem Bildschirm.", "Precios, escaparate y todo lo que preguntan los clientes en una sola pantalla.", "Preços, vitrine e tudo o que os clientes perguntam numa só tela."],
    "Kendi mekânınızda görmek ister misiniz?": ["Want to see it in your own venue?", "Möchten Sie es in Ihrem Lokal sehen?", "¿Quieres verlo en tu propio local?", "Quer ver no seu próprio local?"],
    "Pilot işletme olun →": ["Become a pilot venue →", "Pilotbetrieb werden →", "Sé un local piloto →", "Seja um local piloto →"],
    // menü vitrini
    "Menü vitrini": ["Menu showcase", "Karten-Schaufenster", "Escaparate de la carta", "Vitrine do cardápio"],
    'Menünüz, <span class="holo">sizin vitrininiz.</span>': [
      'Your menu, <span class="holo">your showcase.</span>',
      'Ihre Karte, <span class="holo">Ihr Schaufenster.</span>',
      'Tu carta, <span class="holo">tu escaparate.</span>',
      'Seu cardápio, <span class="holo">sua vitrine.</span>'],
    "En çok tercih edilenler siparişlerden kendiliğinden çıkar; şefin önerisi, eşleştirmeler ve mutlu saat panelden tek dokunuşla açılır. Misafir menüyü sizin öne çıkardığınız gibi görür.": [
      "Best-sellers come straight from your orders; the chef's pick, pairings and happy hour switch on with one tap in the panel. Guests see the menu the way you choose to feature it.",
      "Bestseller ergeben sich automatisch aus den Bestellungen; Empfehlung des Chefs, Kombinationen und Happy Hour schalten Sie im Panel mit einem Tipp ein. Gäste sehen die Karte so, wie Sie sie hervorheben.",
      "Los más pedidos salen solos de los pedidos; la sugerencia del chef, los maridajes y la hora feliz se activan con un toque en el panel. El cliente ve la carta tal como tú la destacas.",
      "Os mais pedidos saem direto dos pedidos; a sugestão do chef, as combinações e o happy hour se ativam com um toque no painel. O cliente vê o cardápio do jeito que você destaca."],
    "İşletme paneli": ["Venue panel", "Lokal-Panel", "Panel del local", "Painel do local"],
    "<i></i>Canlı": ["<i></i>Live", "<i></i>Live", "<i></i>En vivo", "<i></i>Ao vivo"],
    "En çok tercih edilenler": ["Best-sellers", "Bestseller", "Los más pedidos", "Os mais pedidos"],
    "Siparişlerden otomatik": ["Automatic from orders", "Automatisch aus Bestellungen", "Automático según los pedidos", "Automático pelos pedidos"],
    "Şefin önerisi": ["Chef's pick", "Empfehlung des Chefs", "Sugerencia del chef", "Sugestão do chef"],
    "Öne çıkan tabak": ["Featured dish", "Hervorgehobenes Gericht", "Plato destacado", "Prato em destaque"],
    "Birlikte iyi gider": ["Goes well with", "Passt gut zu", "Combina bien con", "Combina bem com"],
    "Yanına öneri": ["Suggested pairing", "Passende Empfehlung", "Sugerencia para acompañar", "Sugestão para acompanhar"],
    "Mutlu saat": ["Happy hour", "Happy Hour", "Hora feliz", "Happy hour"],
    "17:00–19:00 · %15 indirim": ["17:00–19:00 · 15% off", "17:00–19:00 · 15 % Rabatt", "17:00–19:00 · 15 % de descuento", "17:00–19:00 · 15% de desconto"],
    "Sıralamayı öne al": ["Move to the top", "Nach oben setzen", "Subir en la lista", "Levar para o topo"],
    "Künefe en üstte": ["Künefe first", "Künefe ganz oben", "Künefe arriba", "Künefe no topo"],
    // canlı menü
    "Canlı menü": ["Live menu", "Lebendige Speisekarte", "Carta viva", "Cardápio vivo"],
    'Kâğıttaki menünüz <span class="holo">canlanıyor.</span>': [
      'Your paper menu <span class="holo">comes alive.</span>',
      'Ihre Papierkarte <span class="holo">wird lebendig.</span>',
      'Tu carta de papel <span class="holo">cobra vida.</span>',
      'Seu cardápio de papel <span class="holo">ganha vida.</span>'],
    "Mevcut menünüzün fotoğrafını çekin; ürünler, fiyatlar ve kategoriler ayrıştırılır. Aynı menü misafirin telefonunda hareketli, çok dilli ve alerjen bilgili hale gelir.": [
      "Take a photo of your current menu; dishes, prices and categories are extracted. The same menu becomes animated, multilingual and allergen-aware on the guest's phone.",
      "Fotografieren Sie Ihre aktuelle Karte; Gerichte, Preise und Kategorien werden erkannt. Auf dem Handy des Gastes wird dieselbe Karte animiert, mehrsprachig und mit Allergenangaben.",
      "Haz una foto de tu carta actual; se extraen platos, precios y categorías. La misma carta cobra movimiento en el móvil del cliente, en varios idiomas y con alérgenos.",
      "Tire uma foto do seu cardápio atual; pratos, preços e categorias são extraídos. O mesmo cardápio ganha movimento no celular do cliente, em vários idiomas e com alérgenos."],
    "<b>01</b>Fotoğrafını çekin": ["<b>01</b>Take a photo", "<b>01</b>Foto machen", "<b>01</b>Haz una foto", "<b>01</b>Tire uma foto"],
    "<b>02</b>Ürünler ayrıştırılır": ["<b>02</b>Dishes are extracted", "<b>02</b>Gerichte werden erkannt", "<b>02</b>Se extraen los platos", "<b>02</b>Os pratos são extraídos"],
    "<b>03</b>Menü canlanır": ["<b>03</b>The menu comes alive", "<b>03</b>Die Karte wird lebendig", "<b>03</b>La carta cobra vida", "<b>03</b>O cardápio ganha vida"],
    // menü ve açılış
    "Mekânlar": ["Venues", "Lokale", "Locales", "Espaços"],
    "Pilot": ["Pilot", "Pilot", "Piloto", "Piloto"],
    "Ürün": ["Product", "Produkt", "Producto", "Produto"],
    "Yol haritası": ["Roadmap", "Roadmap", "Hoja de ruta", "Roteiro"],
    "Pilot olun": ["Join the pilot", "Pilot werden", "Únete al piloto", "Seja piloto"],
    '<i class="dot" aria-hidden="true"></i>8 restoranda pilotta · Tekirdağ, Balıkesir, İstanbul': [
      '<i class="dot" aria-hidden="true"></i>Piloting in 8 restaurants · Tekirdağ, Balıkesir, Istanbul',
      '<i class="dot" aria-hidden="true"></i>Pilot in 8 Restaurants · Tekirdağ, Balıkesir, Istanbul',
      '<i class="dot" aria-hidden="true"></i>Piloto en 8 restaurantes · Tekirdağ, Balıkesir, Estambul',
      '<i class="dot" aria-hidden="true"></i>Piloto em 8 restaurantes · Tekirdağ, Balıkesir, Istambul'],
    "Menünüz yasaya uygun.": ["Your menu is compliant.", "Ihre Speisekarte ist gesetzeskonform.", "Tu carta cumple la ley.", "Seu cardápio está dentro da lei."],
    "Hesap masada kapanıyor.": ["The bill is settled at the table.", "Die Rechnung wird am Tisch beglichen.", "La cuenta se cierra en la mesa.", "A conta fecha na mesa."],
    "QRoket; restoran, kafe, bar ve pub'lar için yapay zekâlı bir QR platformu. Fiyat listenizi kurala uygun tutar, misafirle kendi dilinde konuşur, siparişi alır ve masayı hızlı döndürür. Şu an Tekirdağ, Balıkesir ve İstanbul'da 8 restoranda pilot olarak kullanılıyor.": [
      "QRoket is an AI-powered QR platform for restaurants, cafés, bars and pubs. It keeps your price list compliant, talks to guests in their own language, takes the order and turns tables faster. It is currently piloting in 8 restaurants in Tekirdağ, Balıkesir and Istanbul.",
      "QRoket ist eine KI-gestützte QR-Plattform für Restaurants, Cafés, Bars und Pubs. Sie hält Ihre Preisliste regelkonform, spricht mit Gästen in ihrer Sprache, nimmt die Bestellung auf und bringt Tische schneller wieder frei. Derzeit läuft sie als Pilot in 8 Restaurants in Tekirdağ, Balıkesir und Istanbul.",
      "QRoket es una plataforma QR con IA para restaurantes, cafeterías, bares y pubs. Mantiene tu lista de precios conforme a la norma, habla con los clientes en su idioma, toma el pedido y hace que las mesas roten más rápido. Hoy funciona como piloto en 8 restaurantes de Tekirdağ, Balıkesir y Estambul.",
      "QRoket é uma plataforma QR com IA para restaurantes, cafés, bares e pubs. Mantém sua tabela de preços dentro das regras, conversa com o cliente no idioma dele, anota o pedido e faz as mesas girarem mais rápido. Hoje está em piloto em 8 restaurantes de Tekirdağ, Balıkesir e Istambul."],
    "Pilot işletme olun": ["Become a pilot venue", "Pilotbetrieb werden", "Sé un local piloto", "Seja um estabelecimento piloto"],
    "Canlı demoyu deneyin": ["Try the live demo", "Live-Demo testen", "Prueba la demo", "Experimente a demo"],
    "DURUM": ["STATUS", "STATUS", "ESTADO", "STATUS"],
    '<span class="bar" aria-hidden="true"><i></i></span>Faz 1 · pilotta': [
      '<span class="bar" aria-hidden="true"><i></i></span>Phase 1 · in pilot', '<span class="bar" aria-hidden="true"><i></i></span>Phase 1 · im Pilot',
      '<span class="bar" aria-hidden="true"><i></i></span>Fase 1 · en piloto', '<span class="bar" aria-hidden="true"><i></i></span>Fase 1 · em piloto'],
    "PİLOT": ["PILOT", "PILOT", "PILOTO", "PILOTO"],
    "8 restoran": ["8 restaurants", "8 Restaurants", "8 restaurantes", "8 restaurantes"],
    "ŞEHİRLER": ["CITIES", "STÄDTE", "CIUDADES", "CIDADES"],
    "Tekirdağ · Balıkesir · İstanbul": ["Tekirdağ · Balıkesir · Istanbul", "Tekirdağ · Balıkesir · Istanbul", "Tekirdağ · Balıkesir · Estambul", "Tekirdağ · Balıkesir · Istambul"],
    "Kaydırın, roket kalksın": ["Scroll to launch", "Scrollen zum Start", "Desliza para despegar", "Role para decolar"],

    // canlı demo
    "Canlı demo": ["Live demo", "Live-Demo", "Demo en vivo", "Demo ao vivo"],
    'Misafir sorar. <span class="holo">Garson menünüzden</span> cevaplar.': [
      'The guest asks. <span class="holo">The waiter answers</span> from your menu.',
      'Der Gast fragt. <span class="holo">Der Kellner antwortet</span> aus Ihrer Speisekarte.',
      'El cliente pregunta. <span class="holo">El camarero responde</span> con tu carta.',
      'O cliente pergunta. <span class="holo">O garçom responde</span> com o seu cardápio.'],
    "Masadaki QR'ı okutan misafir, menüyü gezmek yerine kendi dilinde soru sorar. AI garson yalnızca işletmenin girdiği menü verisinden cevap verir; bilmediğini uydurmaz, gerektiğinde personeli çağırır.": [
      "A guest who scans the table's QR code asks in their own language instead of scrolling through the menu. The AI waiter answers only from the menu data the venue entered; it never makes things up and calls the staff when needed.",
      "Wer den QR-Code am Tisch scannt, fragt in der eigenen Sprache, statt durch die Karte zu blättern. Der KI-Kellner antwortet nur aus den Menüdaten des Lokals, erfindet nichts und ruft bei Bedarf das Personal.",
      "El cliente que escanea el QR de la mesa pregunta en su idioma en lugar de recorrer la carta. El camarero IA responde solo con los datos que el local ha introducido; no se inventa nada y avisa al personal cuando hace falta.",
      "O cliente que escaneia o QR da mesa pergunta no próprio idioma em vez de percorrer o cardápio. O garçom de IA responde só com os dados que a casa cadastrou; não inventa nada e chama a equipe quando precisa."],
    '<b>Menüden</b><span>Alerjen, içerik ve fiyat işletmenin verisinden</span>': [
      '<b>From the menu</b><span>Allergens, ingredients and prices from the venue\'s own data</span>',
      '<b>Aus der Karte</b><span>Allergene, Zutaten und Preise aus den Daten des Lokals</span>',
      '<b>De la carta</b><span>Alérgenos, ingredientes y precios de los datos del local</span>',
      '<b>Do cardápio</b><span>Alérgenos, ingredientes e preços dos dados da casa</span>'],
    '<b>Onaylı</b><span>Sipariş, misafir onaylamadan mutfağa gitmez</span>': [
      '<b>Confirmed</b><span>No order reaches the kitchen until the guest confirms it</span>',
      '<b>Bestätigt</b><span>Keine Bestellung geht ohne Bestätigung des Gastes in die Küche</span>',
      '<b>Confirmado</b><span>Ningún pedido llega a cocina sin que el cliente lo confirme</span>',
      '<b>Confirmado</b><span>Nenhum pedido vai para a cozinha sem a confirmação do cliente</span>'],
    "QRoket AI garson": ["QRoket AI waiter", "QRoket KI-Kellner", "Camarero IA de QRoket", "Garçom de IA QRoket"],
    "Masa 12 · dinliyor": ["Table 12 · listening", "Tisch 12 · hört zu", "Mesa 12 · escuchando", "Mesa 12 · ouvindo"],
    "Menü hakkında bir şey sorun…": ["Ask something about the menu…", "Fragen Sie etwas zur Karte…", "Pregunta algo sobre la carta…", "Pergunte algo sobre o cardápio…"],
    "Örnek sohbet. Bir soruya dokunun, AI garson cevaplasın.": ["Sample chat. Tap a question and the AI waiter answers.", "Beispielgespräch. Tippen Sie auf eine Frage, der KI-Kellner antwortet.", "Conversación de ejemplo. Toca una pregunta y el camarero IA responde.", "Conversa de exemplo. Toque numa pergunta e o garçom de IA responde."],

    // pilot
    'Masa başında değil, <span class="holo">gerçek serviste</span> gelişiyor.': [
      'Built in <span class="holo">real service,</span> not at a desk.',
      'Entwickelt im <span class="holo">echten Service,</span> nicht am Schreibtisch.',
      'Crece en el <span class="holo">servicio real,</span> no en un escritorio.',
      'Evolui no <span class="holo">serviço real,</span> não numa mesa de escritório.'],
    "QRoket şu an Tekirdağ, Balıkesir ve İstanbul'daki pilot restoranlarda kullanılıyor. Servis sırasında gördüğümüz her takılma ve misafirlerin sorduğu her soru doğrudan ürüne dönüyor.": [
      "QRoket is in use today at pilot restaurants in Tekirdağ, Balıkesir and Istanbul. Every hiccup we see during service and every question guests ask goes straight back into the product.",
      "QRoket ist heute in Pilotrestaurants in Tekirdağ, Balıkesir und Istanbul im Einsatz. Jeder Stolperstein im Service und jede Frage der Gäste fließt direkt ins Produkt zurück.",
      "QRoket ya se usa en restaurantes piloto de Tekirdağ, Balıkesir y Estambul. Cada tropiezo que vemos durante el servicio y cada pregunta de los clientes vuelve directamente al producto.",
      "O QRoket já é usado em restaurantes piloto de Tekirdağ, Balıkesir e Istambul. Cada tropeço que vemos durante o serviço e cada pergunta dos clientes volta direto para o produto."],
    '<b class="count" data-to="8">0</b><span>pilot restoran</span>': [
      '<b class="count" data-to="8">0</b><span>pilot restaurants</span>', '<b class="count" data-to="8">0</b><span>Pilotrestaurants</span>',
      '<b class="count" data-to="8">0</b><span>restaurantes piloto</span>', '<b class="count" data-to="8">0</b><span>restaurantes piloto</span>'],
    '<b class="count" data-to="3">0</b><span>şehir</span>': [
      '<b class="count" data-to="3">0</b><span>cities</span>', '<b class="count" data-to="3">0</b><span>Städte</span>',
      '<b class="count" data-to="3">0</b><span>ciudades</span>', '<b class="count" data-to="3">0</b><span>cidades</span>'],
    "KARADENİZ": ["BLACK SEA", "SCHWARZES MEER", "MAR NEGRO", "MAR NEGRO"],
    "EGE": ["AEGEAN", "ÄGÄIS", "EGEO", "EGEU"],
    "İstanbul": ["Istanbul", "Istanbul", "Estambul", "Istambul"],
    "Şematik harita": ["Schematic map", "Schematische Karte", "Mapa esquemático", "Mapa esquemático"],

    // mekânlar
    "Mekânınıza göre": ["Made for your venue", "Für Ihr Lokal", "Para tu local", "Para o seu espaço"],
    'Bar, restoran, kafe, pub. <span class="holo">Her birine kendi garsonu.</span>': [
      'Bar, restaurant, café, pub. <span class="holo">A waiter for each.</span>',
      'Bar, Restaurant, Café, Pub. <span class="holo">Für jedes ein eigener Kellner.</span>',
      'Bar, restaurante, cafetería, pub. <span class="holo">Cada uno con su camarero.</span>',
      'Bar, restaurante, café, pub. <span class="holo">Cada um com seu garçom.</span>'],
    "Platform aynı, garson mekânınızı tanır. Kokteyl tarifini de, latte'nin sütünü de, masanın açık hesabını da sizin menünüzden bilir.": [
      "Same platform, but the waiter knows your venue. It knows the cocktail recipe, the milk in the latte and the table's open tab, all from your menu.",
      "Dieselbe Plattform, doch der Kellner kennt Ihr Lokal: das Cocktailrezept, die Milch im Latte und die offene Rechnung am Tisch, alles aus Ihrer Karte.",
      "La plataforma es la misma, pero el camarero conoce tu local: la receta del cóctel, la leche del latte y la cuenta abierta de la mesa, todo desde tu carta.",
      "A plataforma é a mesma, mas o garçom conhece o seu espaço: a receita do drinque, o leite do latte e a conta aberta da mesa, tudo a partir do seu cardápio."],
    "Bar · gece": ["Bar · night", "Bar · nachts", "Bar · noche", "Bar · noite"],
    "Restoran": ["Restaurant", "Restaurant", "Restaurante", "Restaurante"],
    "Kafe": ["Café", "Café", "Cafetería", "Café"],
    "Kokteyli anlatan, <em>siparişi alan</em> garson.": ["A waiter who explains the cocktail <em>and takes the order.</em>", "Ein Kellner, der den Cocktail erklärt <em>und die Bestellung aufnimmt.</em>", "Un camarero que explica el cóctel <em>y toma el pedido.</em>", "Um garçom que explica o drinque <em>e anota o pedido.</em>"],
    "Gece kalabalığında misafir garson beklemez. AI garson kokteyllerin içeriğini menüdeki tarifinizden anlatır, siparişi alır ve hesabı arkadaş grubu içinde böler.": [
      "In the late-night crowd, guests don't wait for a waiter. The AI waiter explains each cocktail from your recipe, takes the order and splits the bill within the group.",
      "Im nächtlichen Gedränge wartet niemand auf den Kellner. Der KI-Kellner erklärt jeden Cocktail nach Ihrem Rezept, nimmt die Bestellung auf und teilt die Rechnung in der Gruppe.",
      "Con la barra llena, nadie espera al camarero. El camarero IA explica cada cóctel según tu receta, toma el pedido y divide la cuenta entre el grupo.",
      "Com o bar cheio, ninguém espera o garçom. O garçom de IA explica cada drinque pela sua receita, anota o pedido e divide a conta entre o grupo."],
    "dil: English": ["language: English", "Sprache: English", "idioma: English", "idioma: English"],
    "dil: Türkçe": ["language: Türkçe", "Sprache: Türkçe", "idioma: Türkçe", "idioma: Türkçe"],
    "dil: Deutsch": ["language: Deutsch", "Sprache: Deutsch", "idioma: Deutsch", "idioma: Deutsch"],
    "kaynak: işletmenin menüsü": ["source: the venue's menu", "Quelle: Speisekarte des Lokals", "fuente: la carta del local", "fonte: o cardápio da casa"],
    "Kokteyl içeriği ve alerjenler menüden": ["Cocktail ingredients and allergens from the menu", "Cocktailzutaten und Allergene aus der Karte", "Ingredientes y alérgenos de los cócteles, de la carta", "Ingredientes e alérgenos dos drinques, do cardápio"],
    "Gece yoğunluğunda garson çağırma": ["Call the waiter in the late rush", "Kellner rufen im Nachtbetrieb", "Llamar al camarero en plena noche", "Chamar o garçom no pico da noite"],
    "Arkadaş grubunda ürün ürün hesap bölme": ["Split the bill item by item in a group", "Rechnung in der Gruppe nach Positionen teilen", "Dividir la cuenta por productos en grupo", "Dividir a conta por item no grupo"],
    "Fiyat listesi ve kuver kuralı tek panelde": ["Price list and cover-charge rule in one panel", "Preisliste und Gedeckregel in einem Panel", "Lista de precios y regla del cubierto en un solo panel", "Tabela de preços e regra do couvert num só painel"],
    "Restoran · masa 12": ["Restaurant · table 12", "Restaurant · Tisch 12", "Restaurante · mesa 12", "Restaurante · mesa 12"],
    "Masaya servisli restoranın <em>dil bilen</em> garsonu.": ["The <em>multilingual</em> waiter for table-service restaurants.", "Der <em>mehrsprachige</em> Kellner für Restaurants mit Tischservice.", "El camarero <em>que habla idiomas</em> para restaurantes con servicio en mesa.", "O garçom <em>que fala idiomas</em> para restaurantes com serviço à mesa."],
    "Çok dilli menü danışmanı": ["Multilingual menu advisor", "Mehrsprachige Menüberatung", "Asesor de carta multilingüe", "Consultor de cardápio multilíngue"],
    "Alerjen ve diyet filtresi": ["Allergen and diet filter", "Allergen- und Diätfilter", "Filtro de alérgenos y dietas", "Filtro de alérgenos e dietas"],
    "Mutfağa Türkçe, standart ürün adıyla": ["To the kitchen in Turkish, with standard item names", "In die Küche auf Türkisch, mit Standardnamen", "A cocina en turco, con nombres estándar", "Para a cozinha em turco, com nomes padrão"],
    "Hesap masada kapanır": ["The bill closes at the table", "Die Rechnung schließt am Tisch", "La cuenta se cierra en la mesa", "A conta fecha na mesa"],
    "Kafe · sabah": ["Café · morning", "Café · morgens", "Cafetería · mañana", "Café · manhã"],
    "Sıra yok, <em>kasa önünde</em> kalabalık yok.": ["No queue, no crowd <em>at the counter.</em>", "Keine Schlange, kein Gedränge <em>an der Kasse.</em>", "Sin colas ni aglomeraciones <em>en la caja.</em>", "Sem fila, sem aperto <em>no caixa.</em>"],
    "Yoğun saatlerdeki sipariş darboğazı biter. Misafir oturduğu yerden QR ile sipariş verir, süt ve şeker tercihini sohbetle söyler; barista ekranında net bir fiş görür.": [
      "The rush-hour ordering bottleneck is gone. Guests order by QR from their seat and say how they want the milk and sugar in the chat; the barista sees a clear ticket on screen.",
      "Der Bestellstau zur Stoßzeit ist vorbei. Gäste bestellen per QR vom Platz aus und nennen Milch- und Zuckerwunsch im Chat; die Barista sieht einen klaren Bon auf dem Bildschirm.",
      "Se acaba el atasco de pedidos en hora punta. El cliente pide por QR desde su asiento y dice cómo quiere la leche y el azúcar en el chat; el barista ve un ticket claro en pantalla.",
      "Acaba o gargalo de pedidos no horário de pico. O cliente pede pelo QR do próprio lugar e diz no chat como quer o leite e o açúcar; o barista vê um pedido claro na tela."],
    "Oturduğu yerden QR ile sipariş": ["Order by QR from your seat", "Per QR vom Platz bestellen", "Pedir por QR desde el asiento", "Pedido pelo QR do próprio lugar"],
    "Süt, şurup, şeker tercihi sohbetle": ["Milk, syrup and sugar choices by chat", "Milch, Sirup und Zucker per Chat", "Leche, sirope y azúcar por chat", "Leite, xarope e açúcar pelo chat"],
    "Barista ekranında net fiş": ["A clear ticket on the barista's screen", "Klarer Bon auf dem Barista-Bildschirm", "Ticket claro en la pantalla del barista", "Pedido claro na tela do barista"],
    "Fotoğraftan 30 dakikada menü": ["A menu in 30 minutes from a photo", "Karte in 30 Minuten aus einem Foto", "Carta en 30 minutos a partir de una foto", "Cardápio em 30 minutos a partir de uma foto"],
    "Pub · maç gecesi": ["Pub · match night", "Pub · Spielabend", "Pub · noche de partido", "Pub · noite de jogo"],
    "Masanın hesabı açık, <em>grup hesabı</em> tek dokunuşla bölünür.": ["The table's tab stays open; <em>the group bill</em> splits with one tap.", "Die Tischrechnung bleibt offen; <em>die Gruppenrechnung</em> wird mit einem Tipp geteilt.", "La cuenta de la mesa sigue abierta; <em>la cuenta del grupo</em> se divide con un toque.", "A conta da mesa fica aberta; <em>a conta do grupo</em> se divide com um toque."],
    "Maç gecesi masalar kalabalık, siparişler peş peşe gelir. Masanın açık hesabı QR'da canlı görünür; yeni tur sohbetle istenir, ayrılan herkes kendi payını öder.": [
      "On match night the tables are packed and orders keep coming. The table's open tab is live on the QR; a new round is one message away, and anyone leaving pays their own share.",
      "Am Spielabend sind die Tische voll und die Bestellungen kommen Schlag auf Schlag. Die offene Rechnung ist live im QR; eine neue Runde ist eine Nachricht entfernt, und wer geht, zahlt seinen Anteil.",
      "En noche de partido las mesas están llenas y los pedidos no paran. La cuenta abierta de la mesa se ve en directo en el QR; otra ronda se pide con un mensaje y quien se va paga su parte.",
      "Em noite de jogo as mesas lotam e os pedidos não param. A conta aberta da mesa aparece ao vivo no QR; uma nova rodada sai com uma mensagem, e quem vai embora paga a sua parte."],
    "Masanın açık hesabı QR'da canlı": ["The table's open tab live on the QR", "Offene Tischrechnung live im QR", "Cuenta abierta de la mesa en directo en el QR", "Conta aberta da mesa ao vivo no QR"],
    "Yeni tur için tek mesaj": ["One message for a new round", "Eine Nachricht für die nächste Runde", "Un mensaje para otra ronda", "Uma mensagem para mais uma rodada"],
    "Ürün ürün veya eşit hesap bölme": ["Split item by item or evenly", "Nach Positionen oder gleichmäßig teilen", "Dividir por productos o a partes iguales", "Dividir por item ou em partes iguais"],
    "Yoğun saatte garson çağırma": ["Call the waiter at peak time", "Kellner rufen zur Stoßzeit", "Llamar al camarero en hora punta", "Chamar o garçom no horário de pico"],

    // neden şimdi
    "Neden şimdi": ["Why now", "Warum jetzt", "Por qué ahora", "Por que agora"],
    "Kurallar değişti. Masadaki QR artık yalnız başına yetmiyor.": ["In Türkiye the rules have changed. A QR code on the table is no longer enough on its own.", "In der Türkei haben sich die Regeln geändert. Ein QR-Code auf dem Tisch reicht allein nicht mehr.", "En Turquía las reglas han cambiado. Un QR en la mesa ya no basta por sí solo.", "Na Turquia as regras mudaram. Um QR na mesa já não basta sozinho."],
    "Kural": ["Rule", "Regel", "Norma", "Regra"],
    "Sadece QR menü yetmiyor": ["A QR menu alone is not enough", "Ein reines QR-Menü reicht nicht", "Solo una carta QR no basta", "Só um cardápio QR não basta"],
    "Ticaret Bakanlığı yalnızca QR ile sunulan menüyü yasakladı ve denetimleri sıklaştırdı. Basılı fiyat listesi ve listede olmayan ek ücret yasağı artık sıkı takipte.": [
      "Türkiye's Ministry of Trade has banned menus offered only by QR and stepped up inspections. Printed price lists and the ban on unlisted extra charges are now strictly enforced.",
      "Das türkische Handelsministerium hat reine QR-Speisekarten verboten und die Kontrollen verschärft. Gedruckte Preislisten und das Verbot nicht aufgeführter Zusatzgebühren werden jetzt streng überwacht.",
      "El Ministerio de Comercio de Turquía prohibió las cartas que solo se ofrecen por QR y aumentó las inspecciones. La lista de precios impresa y la prohibición de cargos no listados se vigilan ahora de cerca.",
      "O Ministério do Comércio da Turquia proibiu cardápios oferecidos só por QR e aumentou a fiscalização. A tabela de preços impressa e a proibição de cobranças fora da lista agora são vigiadas de perto."],
    "Yükümlülük": ["Obligation", "Pflicht", "Obligación", "Obrigação"],
    "Fiyatlar Bakanlığa bildirilecek": ["Prices will be reported to the Ministry", "Preise werden dem Ministerium gemeldet", "Los precios se comunicarán al Ministerio", "Os preços serão informados ao Ministério"],
    "Kriterlere uyan işletmeler fiyat listelerini elektronik olarak Bakanlığa aktarmakla yükümlü olacak. Menü verisini bugünden düzenli tutan işletme hazır olur.": [
      "Businesses that meet the criteria will have to send their price lists to the Ministry electronically. A venue that keeps its menu data in order today will be ready.",
      "Betriebe, die die Kriterien erfüllen, müssen ihre Preislisten künftig elektronisch an das Ministerium übermitteln. Wer seine Menüdaten schon heute pflegt, ist vorbereitet.",
      "Los negocios que cumplan los criterios tendrán que enviar sus listas de precios al Ministerio por vía electrónica. El local que ya mantiene ordenados sus datos de carta estará listo.",
      "Os estabelecimentos que se enquadrarem terão de enviar suas tabelas de preços ao Ministério por meio eletrônico. A casa que já mantém os dados do cardápio em ordem estará pronta."],
    "Fırsat": ["Opportunity", "Chance", "Oportunidad", "Oportunidade"],
    "AI ile sipariş daha yeni başlıyor": ["Ordering with AI is just getting started", "Bestellen mit KI steht erst am Anfang", "Pedir con IA apenas está empezando", "Pedir com IA está só começando"],
    "Misafirle kendi dilinde konuşan ve sipariş alan işletme sayısı hâlâ çok az. Turist trafiği olan bölgelerde bu fark doğrudan masaya yansıyor.": [
      "Very few venues yet talk to guests in their own language and take orders that way. In areas with tourist traffic, that difference shows up right at the table.",
      "Noch sehr wenige Lokale sprechen Gäste in ihrer Sprache an und nehmen so Bestellungen auf. In Gegenden mit vielen Touristen zeigt sich dieser Unterschied direkt am Tisch.",
      "Todavía muy pocos locales hablan con el cliente en su idioma y toman así el pedido. En zonas con turismo esa diferencia se nota directamente en la mesa.",
      "Ainda são muito poucas as casas que falam com o cliente no idioma dele e anotam o pedido assim. Em áreas com turistas essa diferença aparece direto na mesa."],

    // tek fiyat
    "Tek veri kaynağı": ["One source of truth", "Eine Datenquelle", "Una sola fuente de datos", "Uma única fonte de dados"],
    'Fiyatı bir kez değiştirin. <span class="holo">Her yer aynı anda</span> güncellensin.': [
      'Change the price once. <span class="holo">Everything updates</span> at the same time.',
      'Preis einmal ändern. <span class="holo">Alles aktualisiert sich</span> gleichzeitig.',
      'Cambia el precio una vez. <span class="holo">Todo se actualiza</span> a la vez.',
      'Mude o preço uma vez. <span class="holo">Tudo se atualiza</span> ao mesmo tempo.'],
    "Enflasyon ortamında fiyat sık değişiyor. QRoket'te fiyat panelde bir kez girilir; menü, AI garson, basılı liste ve bildirim aynı veriden beslenir.": [
      "With high inflation, prices change often. In QRoket a price is entered once in the panel; the menu, the AI waiter, the printed list and the report all draw on the same data.",
      "Bei hoher Inflation ändern sich Preise oft. In QRoket wird ein Preis einmal im Panel eingegeben; Karte, KI-Kellner, gedruckte Liste und Meldung nutzen dieselben Daten.",
      "Con inflación alta, los precios cambian a menudo. En QRoket el precio se introduce una vez en el panel; la carta, el camarero IA, la lista impresa y la declaración usan los mismos datos.",
      "Com inflação alta, os preços mudam com frequência. No QRoket o preço é lançado uma vez no painel; cardápio, garçom de IA, tabela impressa e declaração usam os mesmos dados."],
    "İşletme paneli · fiyat değişikliği": ["Venue panel · price change", "Betriebspanel · Preisänderung", "Panel del local · cambio de precio", "Painel da casa · mudança de preço"],
    "Değişiklik geçmişi kim, ne zaman, eski ve yeni fiyatla saklanır. Denetimde elinizde kayıt olur.": [
      "The change history is kept: who, when, old price and new. You have a record ready for any inspection.",
      "Der Änderungsverlauf wird gespeichert: wer, wann, alter und neuer Preis. Bei einer Kontrolle haben Sie den Nachweis.",
      "Se guarda el historial de cambios: quién, cuándo, precio antiguo y nuevo. En una inspección tienes el registro a mano.",
      "O histórico fica salvo: quem, quando, preço antigo e novo. Na fiscalização você tem o registro em mãos."],
    '<span>QR menü</span><span class="tick">güncellendi</span>': [
      '<span>QR menu</span><span class="tick">updated</span>', '<span>QR-Menü</span><span class="tick">aktualisiert</span>',
      '<span>Carta QR</span><span class="tick">actualizada</span>', '<span>Cardápio QR</span><span class="tick">atualizado</span>'],
    '<span>AI garson</span><span class="tick">yeni fiyatı okuyor</span>': [
      '<span>AI waiter</span><span class="tick">reads the new price</span>', '<span>KI-Kellner</span><span class="tick">kennt den neuen Preis</span>',
      '<span>Camarero IA</span><span class="tick">lee el nuevo precio</span>', '<span>Garçom de IA</span><span class="tick">já lê o novo preço</span>'],
    '<span>Basılı fiyat listesi</span><span class="tick">yeniden basım uyarısı</span>': [
      '<span>Printed price list</span><span class="tick">reprint reminder</span>', '<span>Gedruckte Preisliste</span><span class="tick">Hinweis zum Neudruck</span>',
      '<span>Lista de precios impresa</span><span class="tick">aviso de reimpresión</span>', '<span>Tabela de preços impressa</span><span class="tick">aviso de reimpressão</span>'],
    '<span>Kapı önü dijital pano</span><span class="tick">güncellendi</span>': [
      '<span>Digital board at the door</span><span class="tick">updated</span>', '<span>Digitale Tafel am Eingang</span><span class="tick">aktualisiert</span>',
      '<span>Pantalla digital de la entrada</span><span class="tick">actualizada</span>', '<span>Painel digital na porta</span><span class="tick">atualizado</span>'],
    '<span>Bakanlık bildirimi</span><span class="tick">gönderime hazır</span>': [
      '<span>Report to the Ministry</span><span class="tick">ready to send</span>', '<span>Meldung an das Ministerium</span><span class="tick">versandbereit</span>',
      '<span>Declaración al Ministerio</span><span class="tick">lista para enviar</span>', '<span>Declaração ao Ministério</span><span class="tick">pronta para envio</span>'],

    // modüller
    "Platform": ["Platform", "Plattform", "Plataforma", "Plataforma"],
    "Beş modül, tek ekran": ["Five modules, one screen", "Fünf Module, ein Bildschirm", "Cinco módulos, una pantalla", "Cinco módulos, uma tela"],
    "Modül<b>01</b>": ["Module<b>01</b>", "Modul<b>01</b>", "Módulo<b>01</b>", "Módulo<b>01</b>"],
    "Modül<b>02</b>": ["Module<b>02</b>", "Modul<b>02</b>", "Módulo<b>02</b>", "Módulo<b>02</b>"],
    "Modül<b>03</b>": ["Module<b>03</b>", "Modul<b>03</b>", "Módulo<b>03</b>", "Módulo<b>03</b>"],
    "Modül<b>04</b>": ["Module<b>04</b>", "Modul<b>04</b>", "Módulo<b>04</b>", "Módulo<b>04</b>"],
    "Modül<b>05</b>": ["Module<b>05</b>", "Modul<b>05</b>", "Módulo<b>05</b>", "Módulo<b>05</b>"],
    "Uyum ve mali entegrasyon": ["Compliance and fiscal integration", "Regelkonformität und Fiskalanbindung", "Cumplimiento e integración fiscal", "Conformidade e integração fiscal"],
    "Basılı fiyat listesi, ek ücret kontrolü ve Bakanlık bildirimi tek yerden. Sipariş ve ödeme, mevcut entegratörünüz ve ÖKC/POS sağlayıcınız üzerinden doğru mali belgeye bağlanır.": [
      "Printed price list, extra-charge checks and the Ministry report in one place. Orders and payments are tied to the right fiscal document through your existing integrator and cash-register/POS provider.",
      "Gedruckte Preisliste, Kontrolle von Zusatzgebühren und Ministeriumsmeldung an einem Ort. Bestellung und Zahlung werden über Ihren bestehenden Integrator und Kassen-/POS-Anbieter mit dem richtigen Fiskalbeleg verknüpft.",
      "Lista de precios impresa, control de cargos extra y declaración al Ministerio en un solo lugar. Pedidos y pagos se vinculan al documento fiscal correcto a través de tu integrador y tu proveedor de caja/TPV actuales.",
      "Tabela de preços impressa, controle de cobranças extras e declaração ao Ministério num só lugar. Pedidos e pagamentos se ligam ao documento fiscal correto pelo seu integrador e provedor de caixa/POS atuais."],
    "A4, A5, masa standı PDF": ["A4, A5, table-stand PDF", "A4, A5, Tischaufsteller als PDF", "PDF A4, A5 y expositor de mesa", "PDF A4, A5 e display de mesa"],
    "Kuver kontrolü": ["Cover-charge check", "Gedeck-Kontrolle", "Control del cubierto", "Controle de couvert"],
    "Fiyat geçmişi": ["Price history", "Preisverlauf", "Historial de precios", "Histórico de preços"],
    "e-Adisyon / e-arşiv": ["e-Adisyon / e-archive", "e-Adisyon / E-Archiv", "e-Adisyon / archivo electrónico", "e-Adisyon / arquivo eletrônico"],
    '<b>FİYAT LİSTESİ</b><span class="muted">sürüm 14</span>': [
      '<b>PRICE LIST</b><span class="muted">version 14</span>', '<b>PREISLISTE</b><span class="muted">Version 14</span>',
      '<b>LISTA DE PRECIOS</b><span class="muted">versión 14</span>', '<b>TABELA DE PREÇOS</b><span class="muted">versão 14</span>'],
    "<span>Kuver</span><span>yok</span>": ["<span>Cover charge</span><span>none</span>", "<span>Gedeck</span><span>keins</span>", "<span>Cubierto</span><span>no</span>", "<span>Couvert</span><span>não</span>"],
    "Basım: 08.10.2026": ["Printed: 08.10.2026", "Gedruckt: 08.10.2026", "Impreso: 08.10.2026", "Impresso: 08.10.2026"],
    "AI garson": ["AI waiter", "KI-Kellner", "Camarero IA", "Garçom de IA"],
    "Misafir menüyü gezmek yerine soru sorar. Garson yalnızca işletmenin girdiği menü verisinden cevap verir, bilmediğini uydurmaz ve personeli çağırır. Sipariş, misafir onaylamadan mutfağa gitmez.": [
      "Instead of browsing the menu, the guest asks. The waiter answers only from the menu data the venue entered, never makes things up and calls the staff. No order reaches the kitchen until the guest confirms it.",
      "Statt durch die Karte zu blättern, fragt der Gast. Der Kellner antwortet nur aus den Menüdaten des Lokals, erfindet nichts und ruft das Personal. Keine Bestellung geht ohne Bestätigung des Gastes in die Küche.",
      "En lugar de recorrer la carta, el cliente pregunta. El camarero responde solo con los datos del local, no se inventa nada y llama al personal. Ningún pedido llega a cocina sin la confirmación del cliente.",
      "Em vez de percorrer o cardápio, o cliente pergunta. O garçom responde só com os dados da casa, não inventa nada e chama a equipe. Nenhum pedido vai para a cozinha sem a confirmação do cliente."],
    "Menü danışmanı": ["Menu advisor", "Menüberatung", "Asesor de carta", "Consultor de cardápio"],
    "Sohbetle sipariş": ["Ordering by chat", "Bestellen per Chat", "Pedido por chat", "Pedido pelo chat"],
    "Ölçülü öneri": ["Measured suggestions", "Maßvolle Empfehlungen", "Sugerencias moderadas", "Sugestões na medida"],
    '<span class="muted">misafir</span><span>Deutsch</span>': ['<span class="muted">guest</span><span>Deutsch</span>', '<span class="muted">Gast</span><span>Deutsch</span>', '<span class="muted">cliente</span><span>Deutsch</span>', '<span class="muted">cliente</span><span>Deutsch</span>'],
    '<span class="muted">niyet</span><span class="ai">sipariş · glutensiz</span>': [
      '<span class="muted">intent</span><span class="ai">order · gluten-free</span>', '<span class="muted">Absicht</span><span class="ai">Bestellung · glutenfrei</span>',
      '<span class="muted">intención</span><span class="ai">pedido · sin gluten</span>', '<span class="muted">intenção</span><span class="ai">pedido · sem glúten</span>'],
    '<span class="muted">mutfağa</span><span>Türkçe</span>': ['<span class="muted">to kitchen</span><span>Türkçe</span>', '<span class="muted">an Küche</span><span>Türkçe</span>', '<span class="muted">a cocina</span><span>Türkçe</span>', '<span class="muted">para a cozinha</span><span>Türkçe</span>'],
    "<span>Not</span><span>ekmeksiz</span>": ["<span>Note</span><span>no bread</span>", "<span>Notiz</span><span>ohne Brot</span>", "<span>Nota</span><span>sin pan</span>", "<span>Obs.</span><span>sem pão</span>"],
    "Masada ödeme, hesap bölme, bahşiş": ["Pay at the table, split the bill, tip", "Zahlen am Tisch, Rechnung teilen, Trinkgeld", "Pago en la mesa, cuenta dividida, propina", "Pagamento na mesa, conta dividida, gorjeta"],
    "Masadaki herkes aynı QR'ı okutup kendi payını öder, kalan tutar canlı güncellenir. Para akışı lisanslı ödeme kuruluşu üzerinden geçer. Nakit ve mevcut POS her zaman açık.": [
      "Everyone at the table scans the same QR and pays their share; the remaining amount updates live. Money flows through a licensed payment institution. Cash and your existing POS always remain an option.",
      "Alle am Tisch scannen denselben QR-Code und zahlen ihren Anteil; der Restbetrag aktualisiert sich live. Das Geld läuft über ein lizenziertes Zahlungsinstitut. Bargeld und Ihre bestehende Kasse bleiben immer möglich.",
      "Todos en la mesa escanean el mismo QR y pagan su parte; el importe pendiente se actualiza en directo. El dinero pasa por una entidad de pago autorizada. El efectivo y tu TPV actual siguen disponibles.",
      "Todos na mesa escaneiam o mesmo QR e pagam a sua parte; o valor restante se atualiza ao vivo. O dinheiro passa por uma instituição de pagamento licenciada. Dinheiro e o seu POS atual continuam disponíveis."],
    "Eşit veya ürün ürün bölme": ["Split evenly or item by item", "Gleichmäßig oder nach Positionen teilen", "Dividir a partes iguales o por productos", "Dividir igualmente ou por item"],
    "İsteğe bağlı bahşiş": ["Optional tip", "Optionales Trinkgeld", "Propina opcional", "Gorjeta opcional"],
    "<b>MASA 12</b><span>1.240 ₺</span>": ["<b>TABLE 12</b><span>1.240 ₺</span>", "<b>TISCH 12</b><span>1.240 ₺</span>", "<b>MESA 12</b><span>1.240 ₺</span>", "<b>MESA 12</b><span>1.240 ₺</span>"],
    "<span>Ayşe · çorba, kahve</span><span>470 ₺</span>": ["<span>Ayşe · soup, coffee</span><span>470 ₺</span>", "<span>Ayşe · Suppe, Kaffee</span><span>470 ₺</span>", "<span>Ayşe · sopa, café</span><span>470 ₺</span>", "<span>Ayşe · sopa, café</span><span>470 ₺</span>"],
    "<span>Mert · eşit pay</span><span>335 ₺</span>": ["<span>Mert · equal share</span><span>335 ₺</span>", "<span>Mert · gleicher Anteil</span><span>335 ₺</span>", "<span>Mert · parte igual</span><span>335 ₺</span>", "<span>Mert · parte igual</span><span>335 ₺</span>"],
    "<span>Kalan</span><span>435 ₺</span>": ["<span>Remaining</span><span>435 ₺</span>", "<span>Offen</span><span>435 ₺</span>", "<span>Pendiente</span><span>435 ₺</span>", "<span>Restante</span><span>435 ₺</span>"],
    "Geri bildirim ve itibar": ["Feedback and reputation", "Feedback und Reputation", "Opiniones y reputación", "Feedback e reputação"],
    "Ödemeden sonra 15 saniyelik kısa anket. Puanı ne olursa olsun herkese aynı Google yorum daveti gösterilir; düşük puan gelince personel, misafir hâlâ mekândayken haberdar olur.": [
      "A 15-second survey after payment. Everyone sees the same Google review invitation whatever their score; when a low score comes in, the staff hear about it while the guest is still there.",
      "Eine 15-sekündige Umfrage nach der Zahlung. Alle erhalten unabhängig von der Bewertung dieselbe Google-Einladung; bei einer schlechten Bewertung erfährt das Personal davon, solange der Gast noch da ist.",
      "Una encuesta de 15 segundos tras el pago. Todos ven la misma invitación a reseñar en Google, sea cual sea su nota; si llega una nota baja, el personal se entera mientras el cliente sigue en el local.",
      "Uma pesquisa de 15 segundos depois do pagamento. Todos veem o mesmo convite para avaliar no Google, seja qual for a nota; quando chega uma nota baixa, a equipe fica sabendo enquanto o cliente ainda está na casa."],
    "Misafirin dilinde anket": ["Survey in the guest's language", "Umfrage in der Sprache des Gastes", "Encuesta en el idioma del cliente", "Pesquisa no idioma do cliente"],
    "Anlık uyarı": ["Instant alert", "Sofortige Warnung", "Alerta al instante", "Alerta imediato"],
    "Haftalık AI özeti": ["Weekly AI summary", "Wöchentliche KI-Zusammenfassung", "Resumen semanal con IA", "Resumo semanal com IA"],
    "Servis hızı": ["Speed of service", "Servicetempo", "Rapidez del servicio", "Rapidez do serviço"],
    "Google'da yorum bırak": ["Leave a Google review", "Google-Bewertung schreiben", "Deja una reseña en Google", "Avalie no Google"],
    "Herkese aynı davet": ["Same invitation for everyone", "Dieselbe Einladung für alle", "La misma invitación para todos", "O mesmo convite para todos"],
    "İşletme paneli ve AI analiz": ["Venue panel and AI insights", "Betriebspanel und KI-Analyse", "Panel del local y análisis con IA", "Painel da casa e análise com IA"],
    "Kâğıt menünüzün fotoğrafını çekin; ürün, kategori ve fiyat çıkarılır, siz onaylarsınız. Hedef 30 dakikada canlı menü. Sonra panel size misafirlerin ne sorduğunu ve neyi bulamadığını gösterir.": [
      "Take a photo of your paper menu; items, categories and prices are extracted and you approve them. The goal is a live menu in 30 minutes. Then the panel shows you what guests ask about and what they couldn't find.",
      "Fotografieren Sie Ihre Papierkarte; Gerichte, Kategorien und Preise werden ausgelesen und Sie bestätigen sie. Ziel: eine Live-Karte in 30 Minuten. Danach zeigt das Panel, wonach Gäste fragen und was sie nicht finden.",
      "Haz una foto de tu carta en papel; se extraen productos, categorías y precios y tú los apruebas. El objetivo: carta en línea en 30 minutos. Después, el panel te muestra qué preguntan los clientes y qué no encontraron.",
      "Tire uma foto do seu cardápio de papel; itens, categorias e preços são extraídos e você aprova. A meta é um cardápio no ar em 30 minutos. Depois, o painel mostra o que os clientes perguntam e o que não encontraram."],
    "Fotoğraftan kurulum": ["Setup from a photo", "Einrichtung per Foto", "Alta a partir de una foto", "Configuração a partir de foto"],
    "Mutfak ve garson ekranı": ["Kitchen and waiter screens", "Küchen- und Kellnerbildschirm", "Pantalla de cocina y camareros", "Tela da cozinha e dos garçons"],
    "Planlı fiyat değişikliği": ["Scheduled price changes", "Geplante Preisänderungen", "Cambios de precio programados", "Mudanças de preço agendadas"],
    "Bu ay AI garsona sorulan": ["Asked to the AI waiter this month", "Diesen Monat den KI-Kellner gefragt", "Preguntado al camarero IA este mes", "Perguntado ao garçom de IA este mês"],
    '<span>Vegan seçenek</span><span class="ai">12 kez</span>': ['<span>Vegan option</span><span class="ai">12 times</span>', '<span>Vegane Option</span><span class="ai">12-mal</span>', '<span>Opción vegana</span><span class="ai">12 veces</span>', '<span>Opção vegana</span><span class="ai">12 vezes</span>'],
    '<span>Glutensiz tatlı</span><span class="ai">7 kez</span>': ['<span>Gluten-free dessert</span><span class="ai">7 times</span>', '<span>Glutenfreies Dessert</span><span class="ai">7-mal</span>', '<span>Postre sin gluten</span><span class="ai">7 veces</span>', '<span>Sobremesa sem glúten</span><span class="ai">7 vezes</span>'],

    // yol haritası
    "Önce uyum ve AI garson. Sonra ödeme.": ["Compliance and the AI waiter first. Then payments.", "Zuerst Regelkonformität und KI-Kellner. Dann Zahlungen.", "Primero cumplimiento y camarero IA. Después, pagos.", "Primeiro conformidade e garçom de IA. Depois, pagamentos."],
    "Pilotta önce uyum modülünün ve AI garsonun değerini kanıtlıyoruz. Entegrasyon yükü en ağır parça olan ödeme ikinci fazda geliyor.": [
      "In the pilot we first prove the value of the compliance module and the AI waiter. Payments, the part with the heaviest integration load, come in the second phase.",
      "Im Pilot beweisen wir zuerst den Nutzen des Compliance-Moduls und des KI-Kellners. Zahlungen, der Teil mit dem größten Integrationsaufwand, folgen in der zweiten Phase.",
      "En el piloto demostramos primero el valor del módulo de cumplimiento y del camarero IA. Los pagos, la parte con más carga de integración, llegan en la segunda fase.",
      "No piloto provamos primeiro o valor do módulo de conformidade e do garçom de IA. Os pagamentos, a parte com mais trabalho de integração, chegam na segunda fase."],
    "Faz 1 · Pilot": ["Phase 1 · Pilot", "Phase 1 · Pilot", "Fase 1 · Piloto", "Fase 1 · Piloto"],
    "Pilotta · 8 restoran": ["In pilot · 8 restaurants", "Im Pilot · 8 Restaurants", "En piloto · 8 restaurantes", "Em piloto · 8 restaurantes"],
    "QR menü ve fotoğraftan kurulum": ["QR menu and setup from a photo", "QR-Menü und Einrichtung per Foto", "Carta QR y alta a partir de una foto", "Cardápio QR e configuração por foto"],
    "Basılı fiyat listesi üretici": ["Printed price list generator", "Generator für gedruckte Preislisten", "Generador de listas de precios impresas", "Gerador de tabela de preços impressa"],
    "Ek ücret kontrolü": ["Extra-charge checks", "Kontrolle von Zusatzgebühren", "Control de cargos extra", "Controle de cobranças extras"],
    "AI garson: menü, alerjen, sohbetle sipariş": ["AI waiter: menu, allergens, ordering by chat", "KI-Kellner: Karte, Allergene, Bestellen per Chat", "Camarero IA: carta, alérgenos, pedido por chat", "Garçom de IA: cardápio, alérgenos, pedido pelo chat"],
    "Garson çağırma": ["Calling the waiter", "Kellner rufen", "Llamar al camarero", "Chamar o garçom"],
    "Faz 2 · Ödeme": ["Phase 2 · Payments", "Phase 2 · Zahlungen", "Fase 2 · Pagos", "Fase 2 · Pagamentos"],
    "Sırada": ["Next", "Als Nächstes", "Siguiente", "Próxima"],
    "Masada ödeme": ["Pay at the table", "Zahlen am Tisch", "Pago en la mesa", "Pagamento na mesa"],
    "Hesap bölme ve bahşiş": ["Bill splitting and tips", "Rechnung teilen und Trinkgeld", "Cuenta dividida y propina", "Divisão da conta e gorjeta"],
    "Saat bazlı fiyat": ["Time-based pricing", "Zeitabhängige Preise", "Precios por franja horaria", "Preço por horário"],
    "Maliyete göre fiyat önerisi": ["Cost-based price suggestions", "Preisvorschläge nach Kosten", "Sugerencia de precios según costes", "Sugestão de preço pelo custo"],
    "Faz 3 · Ağ": ["Phase 3 · Network", "Phase 3 · Netzwerk", "Fase 3 · Red", "Fase 3 · Rede"],
    "Sonra": ["Later", "Später", "Después", "Depois"],
    "Misafir uygulaması ve puan": ["Guest app and points", "Gäste-App und Punkte", "App para clientes y puntos", "App do cliente e pontos"],
    "Kayıtlı alerjen profili": ["Saved allergen profile", "Gespeichertes Allergieprofil", "Perfil de alérgenos guardado", "Perfil de alérgenos salvo"],
    "Çoklu şube fiyat yönetimi": ["Multi-branch price management", "Preisverwaltung für mehrere Filialen", "Gestión de precios multisede", "Gestão de preços para várias unidades"],

    // katılım
    '<span>8 restoran</span><span class="holo">pilotta.</span>': [
      '<span>8 restaurants</span><span class="holo">in pilot.</span>', '<span>8 Restaurants</span><span class="holo">im Pilot.</span>',
      '<span>8 restaurantes</span><span class="holo">en piloto.</span>', '<span>8 restaurantes</span><span class="holo">em piloto.</span>'],
    "Sıradaki siz olun.": ["Be the next one.", "Werden Sie der Nächste.", "Sé el siguiente.", "Seja o próximo."],
    "QRoket, Tekirdağ, Balıkesir ve İstanbul'daki 8 pilot restoranla birlikte gelişiyor. Masaya servisli bir restoran ya da kafe işletiyorsanız, özellikle turist trafiği olan bir bölgedeyseniz, sizi de pilot programına almak isteriz.": [
      "QRoket grows together with 8 pilot restaurants in Tekirdağ, Balıkesir and Istanbul. If you run a table-service restaurant or café, especially in an area with tourist traffic, we'd like to bring you into the pilot programme too.",
      "QRoket wächst gemeinsam mit 8 Pilotrestaurants in Tekirdağ, Balıkesir und Istanbul. Wenn Sie ein Restaurant oder Café mit Tischservice betreiben, besonders in einer Gegend mit Touristen, nehmen wir Sie gern ins Pilotprogramm auf.",
      "QRoket crece junto a 8 restaurantes piloto en Tekirdağ, Balıkesir y Estambul. Si tienes un restaurante o cafetería con servicio en mesa, sobre todo en una zona turística, nos gustaría sumarte también al programa piloto.",
      "O QRoket evolui junto com 8 restaurantes piloto em Tekirdağ, Balıkesir e Istambul. Se você tem um restaurante ou café com serviço à mesa, principalmente numa área com turistas, queremos trazer você também para o programa piloto."],
    'QRoket, <b style="color:var(--fg);font-weight:700">osplusstudio</b> tarafından geliştiriliyor. Yatırımcı veya iş ortağıysanız da formu doldurun, size dönelim.': [
      'QRoket is developed by <b style="color:var(--fg);font-weight:700">osplusstudio</b>. If you are an investor or a partner, fill in the form too and we\'ll get back to you.',
      'QRoket wird von <b style="color:var(--fg);font-weight:700">osplusstudio</b> entwickelt. Wenn Sie Investor oder Partner sind, füllen Sie das Formular ebenfalls aus, wir melden uns.',
      'QRoket lo desarrolla <b style="color:var(--fg);font-weight:700">osplusstudio</b>. Si eres inversor o socio, rellena también el formulario y te responderemos.',
      'O QRoket é desenvolvido pela <b style="color:var(--fg);font-weight:700">osplusstudio</b>. Se você é investidor ou parceiro, preencha o formulário também e retornaremos.'],
    "<span>→</span><span>Pilot işletmelere erken erişim</span>": ["<span>→</span><span>Early access for pilot venues</span>", "<span>→</span><span>Früher Zugang für Pilotbetriebe</span>", "<span>→</span><span>Acceso anticipado para locales piloto</span>", "<span>→</span><span>Acesso antecipado para casas piloto</span>"],
    "<span>→</span><span>Kurulumda birebir destek</span>": ["<span>→</span><span>One-to-one help with setup</span>", "<span>→</span><span>Persönliche Hilfe bei der Einrichtung</span>", "<span>→</span><span>Ayuda personal en la puesta en marcha</span>", "<span>→</span><span>Ajuda individual na configuração</span>"],
    "<span>→</span><span>Ürüne doğrudan geri bildirim</span>": ["<span>→</span><span>Direct feedback into the product</span>", "<span>→</span><span>Direktes Feedback ins Produkt</span>", "<span>→</span><span>Tus comentarios van directos al producto</span>", "<span>→</span><span>Seu feedback vai direto para o produto</span>"],
    "Pilot programına katılın": ["Join the pilot programme", "Am Pilotprogramm teilnehmen", "Únete al programa piloto", "Participe do programa piloto"],
    "Adınız": ["Your name", "Ihr Name", "Tu nombre", "Seu nome"],
    "İşletme adı": ["Business name", "Name des Betriebs", "Nombre del local", "Nome do estabelecimento"],
    "E-posta": ["Email", "E-Mail", "Correo electrónico", "E-mail"],
    "Telefon": ["Phone", "Telefon", "Teléfono", "Telefone"],
    "Siz kimsiniz?": ["Who are you?", "Wer sind Sie?", "¿Quién eres?", "Quem é você?"],
    "Restoran / kafe işletmecisi": ["Restaurant / café owner", "Restaurant-/Café-Betreiber", "Dueño de restaurante / cafetería", "Dono de restaurante / café"],
    "Yatırımcı": ["Investor", "Investor", "Inversor", "Investidor"],
    "İş ortağı / entegratör": ["Partner / integrator", "Partner / Integrator", "Socio / integrador", "Parceiro / integrador"],
    "Diğer": ["Other", "Andere", "Otro", "Outro"],
    "Başvur": ["Apply", "Bewerben", "Enviar solicitud", "Inscrever-se"],
    'Bilgileriniz yalnızca QRoket hakkında sizinle iletişim kurmak için kullanılır ve üçüncü kişilerle paylaşılmaz. Ayrıntılar: <a href="gizlilik.html">Gizlilik Politikası</a>.': [
      'Your details are used only to contact you about QRoket and are never shared with third parties. Details: <a href="gizlilik.html">Privacy Policy</a> (in Turkish).',
      'Ihre Angaben werden nur verwendet, um Sie zu QRoket zu kontaktieren, und nicht an Dritte weitergegeben. Details: <a href="gizlilik.html">Datenschutzerklärung</a> (auf Türkisch).',
      'Tus datos solo se usan para contactarte sobre QRoket y no se comparten con terceros. Detalles: <a href="gizlilik.html">Política de privacidad</a> (en turco).',
      'Seus dados são usados só para entrar em contato sobre o QRoket e não são compartilhados com terceiros. Detalhes: <a href="gizlilik.html">Política de Privacidade</a> (em turco).'],
    '© 2026 QRoket · <b style="color:var(--fg);font-weight:600">osplusstudio</b> tarafından geliştirilmektedir': [
      '© 2026 QRoket · developed by <b style="color:var(--fg);font-weight:600">osplusstudio</b>',
      '© 2026 QRoket · entwickelt von <b style="color:var(--fg);font-weight:600">osplusstudio</b>',
      '© 2026 QRoket · desarrollado por <b style="color:var(--fg);font-weight:600">osplusstudio</b>',
      '© 2026 QRoket · desenvolvido pela <b style="color:var(--fg);font-weight:600">osplusstudio</b>'],
    "Gizlilik Politikası": ["Privacy Policy", "Datenschutz", "Política de privacidad", "Política de Privacidade"],
    "Bunu boş bırakın": ["Leave this empty", "Bitte leer lassen", "Deja esto vacío", "Deixe isto em branco"],
    /* 5 dil kaldırıldı, modül özetleri */
    "Garsonunuz <span class=\"holo\" style=\"display:inline\">misafirin dilini</span> konuşuyor.": ["Your waiter speaks <span class=\"holo\" style=\"display:inline\">your guests' language.</span>", "Ihr Kellner spricht <span class=\"holo\" style=\"display:inline\">die Sprache Ihrer Gäste.</span>", "Tu camarero habla <span class=\"holo\" style=\"display:inline\">el idioma de tus clientes.</span>", "Seu garçom fala <span class=\"holo\" style=\"display:inline\">o idioma dos seus clientes.</span>"],
    "<b>Çok dilli</b><span>Misafir kendi dilinde sorar, kendi dilinde cevap alır</span>": ["<b>Multilingual</b><span>Guests ask in their own language and get the answer in it</span>", "<b>Mehrsprachig</b><span>Gäste fragen in ihrer Sprache und bekommen die Antwort darin</span>", "<b>Multilingüe</b><span>El cliente pregunta en su idioma y recibe la respuesta en él</span>", "<b>Multilíngue</b><span>O cliente pergunta no próprio idioma e recebe a resposta nele</span>"],
    "AI garson yalnızca sizin menünüzden, misafirin dilinde cevap verir.": ["The AI waiter answers only from your menu, in the guest's language.", "Der KI-Kellner antwortet nur aus Ihrer Karte, in der Sprache des Gastes.", "El camarero IA responde solo desde tu carta, en el idioma del cliente.", "O garçom de IA responde só a partir do seu cardápio, no idioma do cliente."],
    "<b class=\"count\" data-to=\"30\">0</b><span>dk · canlı menü hedefi</span>": ["<b class=\"count\" data-to=\"30\">0</b><span>min · live menu target</span>", "<b class=\"count\" data-to=\"30\">0</b><span>Min. · Ziel bis zur Live-Karte</span>", "<b class=\"count\" data-to=\"30\">0</b><span>min · objetivo de carta en vivo</span>", "<b class=\"count\" data-to=\"30\">0</b><span>min · meta de cardápio no ar</span>"],
    "QR menü sadece giriş kapısı; asıl değer arkasındaki beş modülde.": ["The QR menu is just the front door; the real value lies in the five modules behind it.", "Die QR-Karte ist nur die Eingangstür; der eigentliche Wert steckt in den fünf Modulen dahinter.", "La carta QR es solo la puerta de entrada; el valor real está en los cinco módulos que hay detrás.", "O cardápio QR é só a porta de entrada; o valor real está nos cinco módulos por trás."],
    "Basılı fiyat listesi ve Bakanlık bildirimi tek yerden.": ["Printed price list and Ministry reporting in one place.", "Gedruckte Preisliste und Meldung ans Ministerium an einem Ort.", "Lista de precios impresa y notificación al Ministerio en un solo lugar.", "Lista de preços impressa e envio ao Ministério num só lugar."],
    "Misafir sorar; sipariş onaylanmadan mutfağa gitmez.": ["Guests ask; no order reaches the kitchen until it's confirmed.", "Gäste fragen; keine Bestellung geht ohne Bestätigung in die Küche.", "El cliente pregunta; ningún pedido llega a cocina sin confirmarse.", "O cliente pergunta; nenhum pedido vai à cozinha sem confirmação."],
    "Herkes kendi payını aynı QR'dan öder.": ["Everyone pays their own share from the same QR.", "Alle zahlen ihren Anteil über denselben QR-Code.", "Cada uno paga su parte desde el mismo QR.", "Cada um paga sua parte pelo mesmo QR."],
    "Ödemeden sonra kısa anket, düşük puanda anlık uyarı.": ["A short survey after payment, an instant alert on low scores.", "Kurze Umfrage nach dem Zahlen, sofortige Warnung bei niedriger Bewertung.", "Encuesta breve tras el pago y aviso inmediato ante una nota baja.", "Pesquisa curta após o pagamento e alerta imediato em nota baixa."],
    "Fotoğraftan menü kurulumu; misafirin sorduğu her şey tek ekranda.": ["Menu setup from a photo; everything guests ask about on one screen.", "Karte per Foto einrichten; alles, wonach Gäste fragen, auf einem Bildschirm.", "Carta creada a partir de una foto; todo lo que preguntan los clientes en una pantalla.", "Cardápio montado a partir de uma foto; tudo o que os clientes perguntam numa só tela."],
    "Detay": ["Details", "Details", "Detalles", "Detalhes"],
    "Turist bölgesinde misafirler pek çok farklı dilde sorabilir. AI garson menüyü anlatır, alerjen sorusuna cevap verir, paylaşımlık öneri yapar ve onaylanan siparişi mutfağa Türkçe düşürür.": ["In tourist areas, guests may ask in many different languages. The AI waiter explains the menu, answers allergen questions, suggests dishes to share and sends the confirmed order to the kitchen in Turkish.", "In Touristengebieten fragen Gäste in vielen verschiedenen Sprachen. Der KI-Kellner erklärt die Karte, beantwortet Allergiefragen, schlägt Gerichte zum Teilen vor und schickt die bestätigte Bestellung auf Türkisch in die Küche.", "En zonas turísticas, los clientes pueden preguntar en muchos idiomas distintos. El camarero IA explica la carta, responde sobre alérgenos, sugiere platos para compartir y manda el pedido confirmado a cocina en turco.", "Em regiões turísticas, os clientes podem perguntar em muitos idiomas diferentes. O garçom de IA explica o cardápio, responde sobre alérgenos, sugere pratos para dividir e manda o pedido confirmado para a cozinha em turco."],
    /* kayıtlar bölümü */
    "Kayıtlarınız": ["Your records", "Ihre Aufzeichnungen", "Tus registros", "Seus registros"],
    "Geçmişiniz <span class=\"holo\">kaybolmaz.</span>": ["Your history <span class=\"holo\">never gets lost.</span>", "Ihre Historie <span class=\"holo\">geht nicht verloren.</span>", "Tu historial <span class=\"holo\">no se pierde.</span>", "Seu histórico <span class=\"holo\">não se perde.</span>"],
    "Denetimde ya da bir anlaşmazlıkta aradığınız kayıt panelde hazır.": ["Whether for an inspection or a dispute, the record you need is ready in the panel.", "Ob Kontrolle oder Streitfall: Der gesuchte Eintrag liegt im Panel bereit.", "Ante una inspección o una reclamación, el registro que buscas está listo en el panel.", "Numa fiscalização ou numa contestação, o registro que você procura está pronto no painel."],
    "Her fiyat değişikliği": ["Every price change", "Jede Preisänderung", "Cada cambio de precio", "Cada mudança de preço"],
    "Her değişiklik kim, ne zaman, eski ve yeni fiyatla kaydedilir.": ["Every change is recorded with who made it, when, and the old and new price.", "Jede Änderung wird mit Person, Zeitpunkt sowie altem und neuem Preis gespeichert.", "Cada cambio se guarda con quién lo hizo, cuándo, y el precio anterior y el nuevo.", "Cada mudança é registrada com quem fez, quando, e o preço antigo e o novo."],
    "Fiyat listesi sürümleri": ["Price list versions", "Versionen der Preisliste", "Versiones de la lista de precios", "Versões da lista de preços"],
    "Masaya konan her liste": ["Every list on the table", "Jede Liste auf dem Tisch", "Cada lista en la mesa", "Cada lista na mesa"],
    "Masaya konan her listenin tarihi ve içeriği saklanır; eski bir listeyi istediğiniz an yeniden basarsınız.": ["The date and content of every list placed on the table are kept; reprint an old list whenever you need.", "Datum und Inhalt jeder ausgelegten Liste werden gespeichert; eine alte Liste drucken Sie jederzeit neu.", "Se guardan la fecha y el contenido de cada lista puesta en la mesa; puedes reimprimir una lista antigua cuando quieras.", "A data e o conteúdo de cada lista colocada na mesa ficam guardados; reimprima uma lista antiga quando quiser."],
    "sürüm 14 · 08.10.2026": ["version 14 · 08.10.2026", "Version 14 · 08.10.2026", "versión 14 · 08.10.2026", "versão 14 · 08.10.2026"],
    "Sipariş ve adisyon": ["Orders and bills", "Bestellungen und Rechnungen", "Pedidos y cuentas", "Pedidos e contas"],
    "Her sipariş, her masa": ["Every order, every table", "Jede Bestellung, jeder Tisch", "Cada pedido, cada mesa", "Cada pedido, cada mesa"],
    "Her siparişin masası, ürünleri, saati ve misafir onayı kaydedilir.": ["Each order's table, items, time and guest confirmation are recorded.", "Tisch, Positionen, Uhrzeit und Bestätigung des Gastes werden für jede Bestellung gespeichert.", "De cada pedido se guardan la mesa, los productos, la hora y la confirmación del cliente.", "De cada pedido ficam registrados a mesa, os itens, o horário e a confirmação do cliente."],
    "Masa 12 · 21:14 · onaylandı": ["Table 12 · 21:14 · confirmed", "Tisch 12 · 21:14 · bestätigt", "Mesa 12 · 21:14 · confirmado", "Mesa 12 · 21:14 · confirmado"],
    "Kayıtlar silinmez; istediğiniz an Excel veya PDF olarak dışa aktarırsınız. Yasal saklama süreleri VUK'a göre 5, TTK'ya göre 10 yıldır. Fiş ve e-Arşiv gibi mali belgeler ÖKC'nizde ve entegratörünüzde saklanır.": ["Records are never deleted; export them as Excel or PDF whenever you like. Legal retention periods in Türkiye are 5 years under the Tax Procedure Law (VUK) and 10 years under the Commercial Code (TTK). Fiscal documents such as receipts and e-Archive invoices are kept by your cash register (ÖKC) and your integrator.", "Einträge werden nicht gelöscht; Sie exportieren sie jederzeit als Excel oder PDF. Die gesetzlichen Aufbewahrungsfristen in der Türkei betragen 5 Jahre nach der Abgabenordnung (VUK) und 10 Jahre nach dem Handelsgesetzbuch (TTK). Steuerbelege wie Kassenbons und e-Archiv-Rechnungen werden in Ihrer Registrierkasse (ÖKC) und bei Ihrem Integrator aufbewahrt.", "Los registros no se borran; expórtalos en Excel o PDF cuando quieras. En Turquía los plazos legales de conservación son de 5 años según la Ley de Procedimiento Tributario (VUK) y de 10 años según el Código de Comercio (TTK). Los documentos fiscales, como tiques y facturas e-Archivo, se conservan en tu caja registradora (ÖKC) y en tu integrador.", "Os registros não são apagados; exporte-os em Excel ou PDF quando quiser. Na Turquia, os prazos legais de guarda são de 5 anos pela Lei de Procedimento Tributário (VUK) e de 10 anos pelo Código Comercial (TTK). Documentos fiscais, como cupons e notas e-Arquivo, ficam na sua caixa registradora (ÖKC) e no seu integrador."]
  };

  /* öznitelikler: Türkçe değer → [en, de, es, pt] */
  var A = {
    "Vitrinden bir dilim pasta tabağa alınıyor, ince belli bardağa çay dolduruluyor": ["A slice of cake is taken from the display case and tea is poured into a tulip glass", "Ein Stück Kuchen kommt aus der Vitrine, Tee wird ins Tulpenglas gegossen", "Se saca una porción de tarta de la vitrina y se sirve té en un vaso de tulipán", "Uma fatia de bolo sai da vitrine e o chá é servido no copo de tulipa"],
    "Taş fırından kürekle pizza çıkıyor, peynir uzuyor, ızgarada burger köftesi cızırdıyor": ["A pizza comes out of the stone oven on a peel, the cheese stretches, a burger patty sizzles on the grill", "Eine Pizza kommt aus dem Steinofen, der Käse zieht Fäden, ein Burger brutzelt auf dem Grill", "Una pizza sale del horno de piedra, el queso se estira y una hamburguesa chisporrotea en la plancha", "Uma pizza sai do forno a lenha, o queijo estica e um hambúrguer chia na chapa"],
    "Gün batımında beach bar: garson şezlong 14'e tepsiyle iki mojito getiriyor": ["Beach bar at sunset: a waiter brings two mojitos to sunbed 14", "Beach-Bar bei Sonnenuntergang: ein Kellner bringt zwei Mojitos zu Liege 14", "Chiringuito al atardecer: un camarero lleva dos mojitos a la tumbona 14", "Beach bar ao pôr do sol: um garçom leva dois mojitos à espreguiçadeira 14"],
    "Basılı menünün fotoğrafı çekiliyor; ürünler ayrıştırılıp telefondaki hareketli, çok dilli menüye taşınıyor": ["A photo is taken of the printed menu; the dishes are extracted and moved into an animated, multilingual menu on the phone", "Die gedruckte Karte wird fotografiert; die Gerichte werden erkannt und in eine animierte, mehrsprachige Karte auf dem Handy übertragen", "Se fotografía la carta impresa; los platos se extraen y pasan a una carta animada y multilingüe en el móvil", "O cardápio impresso é fotografado; os pratos são extraídos e levados para um cardápio animado e multilíngue no celular"],
    "QRoket: restoran ve kafeler için yasaya uygun QR menü, çok dilli AI garson ve masada ödeme. Tekirdağ, Balıkesir ve İstanbul'da 8 restoranda pilotta.": [
      "QRoket: compliant QR menus, a multilingual AI waiter and pay-at-the-table for restaurants and cafés. Piloting in 8 restaurants in Tekirdağ, Balıkesir and Istanbul.",
      "QRoket: regelkonforme QR-Menüs, ein mehrsprachiger KI-Kellner und Zahlen am Tisch für Restaurants und Cafés. Pilot in 8 Restaurants in Tekirdağ, Balıkesir und Istanbul.",
      "QRoket: carta QR conforme a la ley, camarero IA multilingüe y pago en la mesa para restaurantes y cafeterías. Piloto en 8 restaurantes de Tekirdağ, Balıkesir y Estambul.",
      "QRoket: cardápio QR dentro da lei, garçom de IA multilíngue e pagamento na mesa para restaurantes e cafés. Piloto em 8 restaurantes de Tekirdağ, Balıkesir e Istambul."],
    "QRoket ana sayfa": ["QRoket home", "QRoket Startseite", "Inicio de QRoket", "Início do QRoket"],
    "Sayfa içi": ["On this page", "Auf dieser Seite", "En esta página", "Nesta página"],
    "AI garson canlı demo": ["AI waiter live demo", "Live-Demo des KI-Kellners", "Demo en vivo del camarero IA", "Demo ao vivo do garçom de IA"],
    "Diller": ["Languages", "Sprachen", "Idiomas", "Idiomas"],
    "Örnek sorular": ["Sample questions", "Beispielfragen", "Preguntas de ejemplo", "Perguntas de exemplo"],
    "Marmara bölgesinin şematik haritası: Tekirdağ, İstanbul ve Balıkesir işaretli": ["Schematic map of the Marmara region with Tekirdağ, Istanbul and Balıkesir marked", "Schematische Karte der Marmararegion mit Tekirdağ, Istanbul und Balıkesir", "Mapa esquemático de la región de Mármara con Tekirdağ, Estambul y Balıkesir", "Mapa esquemático da região de Mármara com Tekirdağ, Istambul e Balıkesir"],
    "Mekân türü": ["Venue type", "Art des Lokals", "Tipo de local", "Tipo de espaço"],
    "Şişe tezgâhtaki bardağa içki dolduruyor": ["A bottle pours a drink into a glass on the bar", "Eine Flasche gießt einen Drink ins Glas an der Bar", "Una botella sirve una bebida en un vaso de la barra", "Uma garrafa serve uma bebida num copo no balcão"],
    "Servis kapağı kalkıyor, tabaktaki yemekten buhar yükseliyor": ["The cloche lifts and steam rises from the plate", "Die Cloche hebt sich, vom Teller steigt Dampf auf", "Se levanta la campana y sale vapor del plato", "A cloche se levanta e sai vapor do prato"],
    "Barista cam bardağa kahve dolduruyor": ["A barista pours coffee into a glass", "Eine Barista gießt Kaffee in ein Glas", "Un barista sirve café en un vaso", "Um barista serve café num copo"],
    "Musluktan bira bardağına bira dolduruluyor, köpük yükseliyor": ["Beer pours from the tap into a glass as the foam rises", "Bier fließt aus dem Zapfhahn ins Glas, der Schaum steigt", "Sale cerveza del grifo al vaso y sube la espuma", "A cerveja sai da torneira para o copo e a espuma sobe"],
    "Örnek basılı fiyat listesi": ["Sample printed price list", "Beispiel einer gedruckten Preisliste", "Ejemplo de lista de precios impresa", "Exemplo de tabela de preços impressa"],
    "Örnek: misafir dili ve mutfağa düşen sipariş": ["Example: the guest's language and the order sent to the kitchen", "Beispiel: Sprache des Gastes und Bestellung an die Küche", "Ejemplo: idioma del cliente y pedido enviado a cocina", "Exemplo: idioma do cliente e pedido enviado à cozinha"],
    "Örnek hesap bölme": ["Sample bill split", "Beispiel für geteilte Rechnung", "Ejemplo de cuenta dividida", "Exemplo de conta dividida"],
    "Örnek değerlendirme ekranı": ["Sample rating screen", "Beispiel eines Bewertungsbildschirms", "Ejemplo de pantalla de valoración", "Exemplo de tela de avaliação"],
    "Örnek panel içgörüsü": ["Sample panel insight", "Beispiel einer Panel-Auswertung", "Ejemplo de información del panel", "Exemplo de insight do painel"]
  };

  function norm(s) { return s.replace(/\s+/g, " ").trim(); }
  // misafir sohbetleri ve demo verisi çok dilli kalır
  var SKIP = ".msg,.chips,#transcript,.nolang,script,style";

  if (lang !== "tr") {
    // 1) öğe düzeyi: içeriği sözlükte olan öğeyi bütün olarak çevir
    var done = [];
    document.body.querySelectorAll("*").forEach(function (el) {
      if (el.closest(SKIP)) return;
      for (var i = 0; i < done.length; i++) if (done[i].contains(el)) return;
      var k = norm(el.innerHTML), hit = D[k];
      if (hit) { el.innerHTML = pickVal(hit, "D", OSL.qid(k)); done.push(el); }
    });
    // 2) metin düzeyi: simge ve yazının yan yana durduğu düğmeler için
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var n, list = [];
    while ((n = walker.nextNode())) list.push(n);
    list.forEach(function (t) {
      if (!t.parentElement || t.parentElement.closest(SKIP)) return;
      var key = norm(t.textContent), hit = key && D[key], val = hit && pickVal(hit, "D", OSL.qid(key));
      if (val && val.indexOf("<") < 0) t.textContent = t.textContent.replace(key, val);
    });
    // 3) öznitelikler
    document.querySelectorAll("[aria-label],[placeholder],[alt],[title],meta[name=description]").forEach(function (el) {
      ["aria-label", "placeholder", "alt", "title", "content"].forEach(function (a) {
        var v = el.getAttribute(a), hit = v && A[v];
        if (hit) el.setAttribute(a, pickVal(hit, "A", OSL.qid(v)));
      });
    });
  }

  /* dil seçici: menüde "Pilot olun" düğmesinin önünde */
  var links = document.querySelector(".nav-links"), cta = links && links.querySelector(".btn");
  if (links) links.insertBefore(OSL.picker(window.QR_I18N.t("language", "Dil")), cta);
})();
