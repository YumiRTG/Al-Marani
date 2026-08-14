import type { LearningModule } from '@/types';

const svg = (content: string) => `data:image/svg+xml;utf8,${encodeURIComponent(content)}`;

const hero = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="520" viewBox="0 0 1200 520"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#0f766e"/><stop offset="1" stop-color="#38bdf8"/></linearGradient></defs><rect width="1200" height="520" fill="#f8fafc"/><circle cx="190" cy="250" r="150" fill="#ccfbf1"/><path d="M155 125 C230 130 280 185 280 250 C280 325 225 380 150 380 C115 380 95 350 105 320 C115 290 145 270 150 240 C156 210 125 180 125 155 C125 137 136 126 155 125Z" fill="#f59e0b" opacity=".9"/><path d="M490 135 C560 90 645 100 700 155 C755 210 750 300 690 350 C625 405 520 390 475 315 C440 255 445 165 490 135Z" fill="#fee2e2" stroke="#ef4444" stroke-width="5"/><path d="M520 185 C565 150 635 150 670 195 C700 235 690 290 650 320 C600 355 535 335 505 290 C480 250 490 210 520 185Z" fill="#fff" opacity=".75"/><rect x="820" y="120" width="270" height="280" rx="35" fill="url(#g)" opacity=".12"/><path d="M870 165 H1035 M870 215 H1010 M870 265 H1045 M870 315 H995" stroke="#0f766e" stroke-width="18" stroke-linecap="round" opacity=".55"/><text x="600" y="465" text-anchor="middle" font-size="36" font-family="Arial" font-weight="700" fill="#0f172a">Ernährung • Verdauung • Stoffwechsel • Diabetes</text></svg>`);

const digestion = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="500" viewBox="0 0 1100 500"><rect width="1100" height="500" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Weg der Nahrung</text><g font-family="Arial" text-anchor="middle"><rect x="45" y="185" width="150" height="85" rx="18" fill="#ccfbf1"/><text x="120" y="235" font-size="21">Mund</text><rect x="225" y="185" width="160" height="85" rx="18" fill="#e0f2fe"/><text x="305" y="235" font-size="21">Speiseröhre</text><rect x="415" y="185" width="150" height="85" rx="18" fill="#fef3c7"/><text x="490" y="235" font-size="21">Magen</text><rect x="595" y="185" width="150" height="85" rx="18" fill="#dcfce7"/><text x="670" y="235" font-size="21">Dünndarm</text><rect x="775" y="185" width="150" height="85" rx="18" fill="#ede9fe"/><text x="850" y="235" font-size="21">Dickdarm</text><rect x="955" y="185" width="110" height="85" rx="18" fill="#fee2e2"/><text x="1010" y="235" font-size="19">Enddarm</text></g><g stroke="#64748b" stroke-width="4"><path d="M195 227H225M385 227H415M565 227H595M745 227H775M925 227H955"/></g><text x="550" y="365" text-anchor="middle" font-size="24" font-family="Arial" font-weight="700" fill="#0f766e">Mund macht klein → Magen mischt sauer → Dünndarm spaltet und nimmt auf → Dickdarm entzieht Wasser</text></svg>`);

const nutrients = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Nährstoffe – zuerst die Funktion merken</text><g font-family="Arial" text-anchor="middle"><circle cx="180" cy="230" r="115" fill="#e0f2fe"/><text x="180" y="210" font-size="24" font-weight="700">Kohlenhydrate</text><text x="180" y="250" font-size="19">schnelle Energie</text><circle cx="550" cy="230" r="115" fill="#fee2e2"/><text x="550" y="210" font-size="24" font-weight="700">Proteine</text><text x="550" y="250" font-size="19">Baustoffe</text><circle cx="920" cy="230" r="115" fill="#fef3c7"/><text x="920" y="210" font-size="24" font-weight="700">Fette</text><text x="920" y="250" font-size="19">Energiespeicher</text></g><text x="550" y="420" text-anchor="middle" font-size="22" font-family="Arial" fill="#475569">Vitamine + Mineralstoffe liefern keine Energie, steuern aber viele Körperfunktionen.</text></svg>`);

const diagnostics = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Diagnostik im Bauchraum</text><g font-family="Arial" text-anchor="middle"><rect x="70" y="145" width="220" height="190" rx="24" fill="#e0f2fe"/><text x="180" y="195" font-size="23" font-weight="700">Sonografie</text><text x="180" y="240" font-size="17">Schallwellen</text><text x="180" y="275" font-size="17">Organe von außen</text><rect x="330" y="145" width="220" height="190" rx="24" fill="#dcfce7"/><text x="440" y="195" font-size="23" font-weight="700">Endoskopie</text><text x="440" y="240" font-size="17">Kamera + Licht</text><text x="440" y="275" font-size="17">Schleimhaut direkt</text><rect x="590" y="145" width="220" height="190" rx="24" fill="#fef3c7"/><text x="700" y="195" font-size="23" font-weight="700">Labor</text><text x="700" y="240" font-size="17">Leber / Galle</text><text x="700" y="275" font-size="17">Pankreas</text><rect x="850" y="145" width="180" height="190" rx="24" fill="#fee2e2"/><text x="940" y="195" font-size="23" font-weight="700">Stuhltest</text><text x="940" y="240" font-size="17">okkultes Blut</text><text x="940" y="275" font-size="17">Probe</text></g></svg>`);

const cancer = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Tumor – Staging – Therapie</text><g font-family="Arial" text-anchor="middle"><rect x="60" y="170" width="200" height="120" rx="22" fill="#fee2e2"/><text x="160" y="215" font-size="22" font-weight="700">Primärtumor</text><text x="160" y="255" font-size="17">lokales Wachstum</text><rect x="330" y="170" width="200" height="120" rx="22" fill="#fef3c7"/><text x="430" y="215" font-size="22" font-weight="700">TNM</text><text x="430" y="255" font-size="17">T • N • M</text><rect x="600" y="170" width="200" height="120" rx="22" fill="#e0f2fe"/><text x="700" y="215" font-size="22" font-weight="700">Metastasen</text><text x="700" y="255" font-size="17">Absiedlungen</text><rect x="870" y="170" width="170" height="120" rx="22" fill="#dcfce7"/><text x="955" y="215" font-size="22" font-weight="700">Therapie</text><text x="955" y="255" font-size="17">OP • Strahl • Medikamente</text></g><g stroke="#64748b" stroke-width="4"><path d="M260 230H330M530 230H600M800 230H870"/></g><text x="550" y="400" text-anchor="middle" font-size="22" font-family="Arial" fill="#475569">Benigne Tumoren verdrängen – maligne Tumoren können invasiv wachsen und metastasieren.</text></svg>`);

const hepatobiliary = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Leber, Galle und Pankreas – ein Team</text><ellipse cx="300" cy="235" rx="190" ry="120" fill="#fecaca" stroke="#ef4444" stroke-width="4"/><text x="300" y="220" text-anchor="middle" font-size="27" font-family="Arial" font-weight="700">Leber</text><text x="300" y="260" text-anchor="middle" font-size="18" font-family="Arial">bildet Galle • Stoffwechsel • Entgiftung</text><ellipse cx="555" cy="290" rx="70" ry="85" fill="#dcfce7" stroke="#16a34a" stroke-width="4"/><text x="555" y="285" text-anchor="middle" font-size="22" font-family="Arial" font-weight="700">Galle</text><text x="555" y="315" text-anchor="middle" font-size="15" font-family="Arial">speichert</text><path d="M720 210 C820 160 940 185 980 245 C930 315 805 335 710 290Z" fill="#fef3c7" stroke="#d97706" stroke-width="4"/><text x="845" y="255" text-anchor="middle" font-size="25" font-family="Arial" font-weight="700">Pankreas</text><text x="845" y="290" text-anchor="middle" font-size="17" font-family="Arial">Enzyme • Bicarbonat • Insulin</text></svg>`);

const metabolic = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Metabolisches Syndrom – Risikofaktoren verstärken sich</text><circle cx="550" cy="260" r="85" fill="#ccfbf1" stroke="#0d9488" stroke-width="4"/><text x="550" y="250" text-anchor="middle" font-size="21" font-family="Arial" font-weight="700">metabolisches</text><text x="550" y="280" text-anchor="middle" font-size="21" font-family="Arial" font-weight="700">Syndrom</text><g font-family="Arial" text-anchor="middle"><rect x="75" y="120" width="230" height="95" rx="20" fill="#fee2e2"/><text x="190" y="175" font-size="20">Adipositas</text><rect x="795" y="120" width="230" height="95" rx="20" fill="#e0f2fe"/><text x="910" y="175" font-size="20">Hyperlipidämie</text><rect x="75" y="330" width="230" height="95" rx="20" fill="#fef3c7"/><text x="190" y="385" font-size="20">Hypertonie</text><rect x="795" y="330" width="230" height="95" rx="20" fill="#dcfce7"/><text x="910" y="385" font-size="20">Typ-2-Diabetes</text></g><g stroke="#64748b" stroke-width="4"><path d="M305 170L480 225M795 170L620 225M305 380L480 300M795 380L620 300"/></g></svg>`);

const glucose = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Insulin und Glukagon – Gegenspieler</text><rect x="120" y="160" width="260" height="170" rx="25" fill="#e0f2fe"/><text x="250" y="205" text-anchor="middle" font-size="25" font-family="Arial" font-weight="700">Blutzucker steigt</text><text x="250" y="255" text-anchor="middle" font-size="18" font-family="Arial">nach Mahlzeit</text><rect x="740" y="160" width="260" height="170" rx="25" fill="#fef3c7"/><text x="870" y="205" text-anchor="middle" font-size="25" font-family="Arial" font-weight="700">Blutzucker fällt</text><text x="870" y="255" text-anchor="middle" font-size="18" font-family="Arial">zwischen Mahlzeiten</text><circle cx="550" cy="245" r="105" fill="#dcfce7" stroke="#16a34a" stroke-width="4"/><text x="550" y="225" text-anchor="middle" font-size="22" font-family="Arial" font-weight="700">Pankreas</text><text x="550" y="260" text-anchor="middle" font-size="18" font-family="Arial">Insulin ↓</text><text x="550" y="292" text-anchor="middle" font-size="18" font-family="Arial">Glukagon ↑</text><g stroke="#64748b" stroke-width="5"><path d="M380 245H445M655 245H740"/></g><text x="550" y="420" text-anchor="middle" font-size="22" font-family="Arial" fill="#475569">Insulin erleichtert Glukoseaufnahme in Zellen • Glukagon mobilisiert gespeicherte Energie.</text></svg>`);

const diabetes = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Diabetes Typ 1 und Typ 2 – Kernunterschied</text><g font-family="Arial"><rect x="80" y="130" width="430" height="260" rx="28" fill="#fee2e2"/><text x="295" y="185" text-anchor="middle" font-size="27" font-weight="700">Typ 1</text><text x="120" y="235" font-size="19">• Autoimmunreaktion</text><text x="120" y="275" font-size="19">• Betazellen werden zerstört</text><text x="120" y="315" font-size="19">• absoluter Insulinmangel</text><text x="120" y="355" font-size="19">• Insulin von Beginn an nötig</text><rect x="590" y="130" width="430" height="260" rx="28" fill="#e0f2fe"/><text x="805" y="185" text-anchor="middle" font-size="27" font-weight="700">Typ 2</text><text x="630" y="235" font-size="19">• Insulin zunächst vorhanden</text><text x="630" y="275" font-size="19">• Zellen reagieren schlechter</text><text x="630" y="315" font-size="19">• Insulinresistenz</text><text x="630" y="355" font-size="19">• später Insulinmangel möglich</text></g></svg>`);

const task = (title: string, items: string[]) => ({ type: 'list' as const, items: items.map((x, i) => `${title} ${i + 1}: ${x}`) });

export const lf9: LearningModule = {
  id: 'lf9',
  number: 9,
  title: 'Ernährung, Verdauung & Stoffwechsel',
  subtitle: 'Nährstoffe, Magen-Darm, Tumore, Leber/Galle/Pankreas, metabolisches Syndrom und Diabetes',
  description: 'Der vollständige Lernfeld-9-Kurs aus den bereits durchgeführten Doppelstunden plus den geplanten Folgestunden. Er enthält die bisherigen Aufgaben, die bisher genutzten Videos, neue Videos, viele Schaubilder, Fallaufgaben und Prüfungstraining.',
  difficulty: 'advanced',
  icon: 'stethoscope',
  heroImage: hero,
  topics: [
    {
      id: 'lf9-stunde1',
      title: 'Stunde 1 – Nährstoffe und Verdauung',
      content: [
        { type: 'info', title: 'Bereits durchgeführt', text: 'Diese Doppelstunde entspricht dem bisherigen Arbeitsheft „Nährstoffe und Verdauung“. Die Aufgaben wurden hier inhaltlich übernommen.' },
        { type: 'image', src: nutrients, alt: 'Nährstoffe und ihre Hauptfunktionen', caption: 'Erst die Hauptfunktion merken, danach Bausteine, Enzyme und Beispiele ergänzen.' },
        { type: 'heading', title: 'Nährstoffe von Grund auf' },
        { type: 'text', text: 'Kohlenhydrate werden bis zu Einfachzuckern wie Glukose gespalten. Proteine bestehen aus Aminosäuren und dienen unter anderem als Baustoffe sowie für Enzyme, Hormone und Antikörper. Fette liefern viel Energie, schützen Organe und sind Bestandteil von Zellmembranen. Vitamine und Mineralstoffe liefern keine Energie, sind aber für zahlreiche Körperfunktionen notwendig.' },
        task('Bisherige Aufgabe', [
          'Einstieg: Beschreibe spontan den Weg eines belegten Brotes vom ersten Bissen bis zur Ausscheidung.',
          'Ordne Glukose = Einfachzucker, Laktose = Zweifachzucker, Stärke = Mehrfachzucker und erkläre, warum Stärke verdaut werden muss.',
          'Vervollständige: Proteine bestehen aus … Nenne drei Aufgaben von Proteinen.',
          'Aus welchen zwei Bausteinarten besteht ein Triglycerid? Warum sind Fette für die Aufnahme der Vitamine A, D, E und K wichtig?',
          'Ordne Calcium, Eisen, Magnesium und Jod ihrer Hauptfunktion zu und bilde eine Eselsbrücke für A-D-E-K.',
        ]),
        { type: 'image', src: digestion, alt: 'Weg der Nahrung', caption: 'Diese Reihenfolge muss ohne Hilfe sitzen.' },
        { type: 'heading', title: 'Verdauungsorgane' },
        { type: 'text', text: 'Im Mund beginnt durch Amylase die Stärkeverdauung. Der Magen speichert und durchmischt den Speisebrei; Pepsin beginnt die Proteinverdauung. Im Dünndarm findet der größte Teil der chemischen Verdauung und Resorption statt. Die Leber bildet Galle, die Gallenblase speichert sie, das Pankreas liefert Enzyme und Bicarbonat. Der Dickdarm entzieht Wasser und formt den Stuhl.' },
        task('Bisherige Aufgabe', [
          'Bringe Dickdarm – Mund – Magen – Enddarm – Speiseröhre – Dünndarm in die richtige Reihenfolge.',
          'Mund und Schlucken: Was macht Amylase? Wozu dient der Kehldeckel? Wie heißt die Transportbewegung der Speiseröhre?',
          'Magen: Richtig oder falsch? Im Magen beginnt die Fettaufnahme. Pepsin spaltet Proteine. Die Magenschleimhaut schützt vor Säure.',
          'Dünndarm: Warum besitzt er Falten, Zotten und Mikrovilli? Was bedeutet Resorption?',
          'Verbinde Leber – bildet Galle; Gallenblase – speichert Galle; Pankreas – Enzyme/Bicarbonat. Ordne Amylase, Protease und Lipase den Nährstoffen zu.',
          'Lückentext: Der … entzieht Wasser. Der … speichert Stuhl. Unverdauliche Pflanzenbestandteile heißen …',
          'Fall Frühstück: Vollkornbrot mit Quark, Nüssen und Apfel. Beschreibe den Weg in 8–10 Sätzen mit mindestens fünf Organen, zwei Enzymen und den Endbausteinen der Makronährstoffe.',
          'Erkläre patientengerecht: Warum muss Nahrung überhaupt verdaut werden?',
        ]),
        { type: 'heading', title: 'Bisheriges Abschlussquiz' },
        { type: 'list', items: [
          'Welche drei Nährstoffgruppen liefern Energie?', 'Woraus bestehen Proteine?', 'Welches Enzym beginnt im Mund die Stärkeverdauung?', 'Welches Enzym beginnt im Magen die Proteinverdauung?', 'Wo findet der größte Teil der Nährstoffaufnahme statt?', 'Welche Aufgabe hat Galle bei der Fettverdauung?', 'Nenne eine Aufgabe der Bauchspeicheldrüse.', 'Was wird im Dickdarm vor allem resorbiert?', 'Nenne die Reihenfolge der Verdauungsorgane vom Mund bis zum Enddarm.', 'Was bedeutet Resorption?'
        ] },
      ],
    },
    {
      id: 'lf9-stunde2',
      title: 'Stunde 2 – Diagnostik und häufige Magen-Darm-Erkrankungen',
      content: [
        { type: 'info', title: 'Bereits durchgeführt', text: 'Die Kennzeichnung bleibt erhalten: [V] = aus dem Video lösbar, [I] = aus dem Lernmaterial lösbar, [T] = Transfer.' },
        { type: 'image', src: diagnostics, alt: 'Diagnostik im Bauchraum', caption: 'Sonografie, Endoskopie, Labor und Stuhltest beantworten unterschiedliche Fragen.' },
        { type: 'video', title: 'Wie funktioniert Ultraschall?', source: 'Stiftung Gesundheitswissen', duration: '1:11 Min.', caption: 'Beobachtungsauftrag: Weg von Schallwelle → Reflexion → Echo → Bild; Unterschiede zwischen Gewebearten beachten.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/koerper-wissen/wie-funktioniert-ultraschall' },
        task('Sonografie', [
          '[V] Bringe die Schritte in Reihenfolge: Schallkopf sendet → Gewebe reflektiert → Schallkopf empfängt → Gerät berechnet Bild.',
          '[V] Ergänze: Flüssigkeit erscheint meist …, Luft/Knochen eher …, Weichteile in verschiedenen …tönen.',
          '[V] Warum entstehen aus verschiedenen Geweben unterschiedliche Bildsignale?',
          '[V] Kreuze die gestützten Aussagen an: ohne Röntgenstrahlung / grundsätzlich schmerzhaft / Schallkopf sendet und empfängt / Luft immer besonders gut sichtbar.',
          '[T] Warum ist Sonografie bei einer schwangeren Patientin mit Oberbauchbeschwerden häufig eine sinnvolle erste Untersuchung?',
          '[T] Vergleiche Sonografie und Gastroskopie in einem Satz.',
        ]),
        { type: 'video', title: 'Wie funktioniert eine Magenspiegelung?', source: 'MVZ Landsberg / YouTube', duration: 'Kurzvideo', caption: 'Beobachte Instrument, Untersuchungsweg, untersuchte Organe und diagnostische/therapeutische Möglichkeiten.', url: 'https://www.youtube.com/watch?v=0cXtwoKzx04' },
        { type: 'info', title: 'Unterlagenbasis Gastroskopie', text: 'Die Unterlage nennt ein flexibles Endoskop mit Lichtquelle; untersucht werden Speiseröhre, Magen und Zwölffingerdarm. Als Vorbereitung nennt sie unter anderem 6–8 Stunden Nüchternheit, Rauchverzicht, Simethicon kurz vorher und lokale Rachenbetäubung.' },
        task('Gastroskopie', [
          '[V] Ordne: Mund – Speiseröhre – Magen – Zwölffingerdarm.', '[V] Nenne drei Merkmale/Bestandteile des Gastroskops.', '[V] Welche drei Organabschnitte werden betrachtet?', '[I] Notiere vier Vorbereitungsmaßnahmen aus der Unterlage.', '[T] Warum soll der Magen möglichst leer sein?', '[T] Bei blutendem Magengeschwür: Nenne eine diagnostische und eine therapeutische Funktion.', '[T] Ordne S oder G zu: Magenschleimhaut / Leber-Gallenblase von außen / Gewebeprobe / strahlungsfreie Orientierung.'
        ]),
        { type: 'video', title: 'Was sind Infektionskrankheiten?', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Achte auf Infektion, Erregergruppen und Übertragungswege.', url: 'https://gesund.bund.de/norovirus' },
        task('Gastroenteritis', [
          '[V] Unterschied Infektion und Infektionskrankheit.', '[V] Nenne drei Erregergruppen.', '[I] Ordne Gastritis, Enteritis und Gastroenteritis.', '[I] Nenne vier typische Symptome.', '[T] Erkläre: Erbrechen/Durchfall → Flüssigkeitsverlust → Exsikkose.', '[T] Wohngruppe mit heftigem Erbrechen/Durchfall: wahrscheinlicher Erregertyp und zwei Hygienemaßnahmen.', '[T] Warum stehen Flüssigkeit und Salze therapeutisch im Vordergrund?'
        ]),
        { type: 'video', title: 'Wie entwickelt sich eine Laktoseintoleranz?', source: 'SRF', duration: 'ca. 1:28 Min.', caption: 'Verfolge Laktose und die Rolle von Laktase.', url: 'https://www.srf.ch/play/tv/srf-videos-zur-kostenlosen-nutzung/video/wissen-fuer-alle---wie-entwickelt-sich-eine-laktoseintoleranz?urn=urn:srf:video:6cdd8648-7bee-4d3a-b00c-c1f19350e4da' },
        task('Laktoseintoleranz', [
          '[V] Woraus besteht Laktose und welches Enzym spaltet sie?', '[V] Beschreibe den normalen Weg der Laktose im Dünndarm.', '[V] Was passiert mit ungespaltener Laktose im Dickdarm?', '[V] Nenne drei Beschwerden.', '[I] Eine Diagnostik und zwei Therapien aus der Unterlage.', '[T] Beschwerden nur nach Milchshake, nicht nach laktosefrei: begründete Verdachtsdiagnose.'
        ]),
        { type: 'video', title: 'Was ist die Refluxkrankheit?', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Achte auf unteren Ösophagussphinkter, Rückfluss, Beschwerden und Therapie.', url: 'https://gesund.bund.de/sodbrennen-refluxkrankheit' },
        task('Reflux', [
          '[V] Aufgabe des unteren Speiseröhrenschließmuskels.', '[V] Beschreibe in drei Schritten, wie Sodbrennen entsteht.', '[V] Nenne drei typische Beschwerden.', '[I] Nenne vier Risikofaktoren aus der Unterlage.', '[T] Warum kann häufiger Reflux eine Ösophagitis verursachen?', '[T] Ordne Lebensstil – Säureblocker – Operation nach Basis/medikamentös/schwere Verläufe.', '[T] Brennen nach großen Mahlzeiten und im Liegen: Verdachtsdiagnose + zwei nächste Schritte.'
        ]),
        { type: 'video', title: 'Was passiert bei einer Blinddarmentzündung?', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Unterscheide Blinddarm und Wurmfortsatz; achte auf Schmerzverlauf, Perforation und Therapie.', url: 'https://gesund.bund.de/blinddarmentzuendung' },
        task('Appendizitis', [
          '[V] Was ist tatsächlich entzündet?', '[V] Beschreibe den typischen Schmerzverlauf.', '[V] Warum ist eine Perforation gefährlich?', '[I] Nenne vier Zeichen eines akuten Abdomens.', '[I] Warum darf eine scheinbare Besserung nach starken Schmerzen nicht beruhigen?', '[V] Wie heißt die operative Entfernung des Wurmfortsatzes?', '[T] Zunehmende Bauchschmerzen + Abwehrspannung + Übelkeit + Kreislaufprobleme: angemessene Reaktion in der Praxis.'
        ]),
        { type: 'heading', title: 'Bisheriger Abschluss' },
        { type: 'list', items: [
          '[T] Ordne Untersuchungen zu: Verdacht auf Gallensteine / anhaltendes Sodbrennen mit Schleimhautverdacht / Verdacht auf Appendizitis.', '[T] Je ein Beispiel für funktionelle Störung, Infektion und akute Entzündung.', '[T] Welche Krankheitsbilder können starken Flüssigkeitsverlust verursachen und warum?', '[T] Formuliere drei Warnzeichen, bei denen nicht abgewartet werden darf.', '[T] Formuliere deinen wichtigsten verstandenen Zusammenhang.'
        ] },
        { type: 'video', title: 'Zusatz: Wie entsteht eine Magenschleimhautentzündung?', source: 'gesund.bund.de', caption: 'Vertiefung zu Gastritis, Ursachen und Symptomen.', url: 'https://gesund.bund.de/gastritis' },
        { type: 'video', title: 'Zusatz: Divertikulitis – Schmerzen im Bauch', source: 'SWR / ARD Mediathek', caption: 'Längere Vertiefung zu Divertikulose, Divertikulitis, Beschwerden und Behandlung.', url: 'https://www.ardmediathek.de/video/doc-fischer/schmerzen-im-bauch-was-tun-bei-divertikulitis/swr/Y3JpZDovL3N3ci5kZS9hZXgvbzE5NTE4Mzc' },
      ],
    },
    {
      id: 'lf9-stunde3',
      title: 'Stunde 3 – Labor, Stuhltest, Ulkus, Divertikel und Hämorrhoiden',
      content: [
        { type: 'info', title: 'Bereits durchgeführt', text: 'Diese Einheit schließt den bisherigen Magen-Darm-Block ab und übernimmt die Aufgaben der dritten Doppelstunde.' },
        { type: 'heading', title: 'Labordiagnostik aus der Unterlage' },
        { type: 'text', text: 'Zugeordnet werden GOT/GPT und GGT zur Leber, AP zu Gallenwegen/Knochen, Bilirubin als Gallenfarbstoff, INR zur Gerinnungsstoffproduktion sowie Amylase/Lipase zum Pankreas bzw. zusätzlich Amylase zur Parotis. Referenzbereiche können laborabhängig sein; in den bisherigen Aufgaben werden bewusst die Werte der Lernunterlage verwendet.' },
        task('Labor', [
          'Ordne GOT/GPT, GGT, AP, Bilirubin, INR, Amylase und Lipase Leber/Galle/Gerinnung/Pankreas-Parotis zu.', 'Welche drei Werte bezeichnet die Unterlage als Leberenzyme?', 'Welcher Wert ist Gallenfarbstoff? Welcher steht für Gerinnungsstoffproduktion?', 'Lipase 80 U/L: über oder unter dem in der Unterlage genannten Normwert?', 'Warum sollte man bei Oberbauchbeschwerden nicht nur einen einzigen Laborwert betrachten?'
        ]),
        { type: 'video', title: 'Diese Möglichkeiten zur Darmkrebsvorsorge gibt es', source: 'KBV', duration: '1:05 Min.', caption: 'Für unsere bisherige Aufgabe nur auf Zweck und Rolle des Stuhltests achten; Entnahmeschritte stammen aus der Lernfeld-Unterlage.', url: 'https://www.kbv.de/video/6425' },
        task('Stuhltest', [
          '[V] Wozu dient der Stuhltest in der Darmkrebsvorsorge?', '[I] Bringe die Entnahmeschritte in richtige Reihenfolge: Auffanghilfe → Stuhl auffangen → an drei Stellen Material aufnehmen → Stift ins Röhrchen → Flüssigkeit im Röhrchen lassen → Probe abgeben.', '[I] Was bedeutet okkultes Blut?', '[I] Nenne vier Situationen, in denen der Test laut Unterlage nicht durchgeführt werden soll.', '[T] Muss laut Unterlage vorher eine besondere Ernährung eingehalten werden?', '[T] Warum können blutende Hämorrhoiden das Ergebnis verfälschen?'
        ]),
        { type: 'heading', title: 'Ulkuskrankheit' },
        { type: 'text', text: 'Die Unterlage grenzt die oberflächliche Gastritis vom tiefen Ulkus ab. Als Symptome nennt sie Inappetenz, Übelkeit und Erbrechen; eine gefährliche Komplikation ist die Blutung. Magenulkus = Ulcus ventriculi, Duodenalulkus = Ulcus duodeni.' },
        task('Ulkus', [
          'Kernunterschied Gastritis vs. Ulkus.', 'Übersetze Inappetenz, Ulcus ventriculi und Ulcus duodeni.', 'Nenne die drei Symptome aus der Unterlage.', 'Erkläre die Kette Gewebsschädigung → Gefäßschädigung → Blutung.', 'Ordne endoskopische Blutstillung und Bluttransfusion ihrem Ziel zu.'
        ]),
        { type: 'heading', title: 'Divertikulose und Divertikulitis' },
        { type: 'text', text: 'Divertikel sind Schleimhautausstülpungen des Dickdarms, häufig im Sigma. Divertikulose = Divertikel vorhanden; Divertikulitis = entzündete Divertikel. Komplikationen der Unterlage: Ileus, Perforation, Peritonitis.' },
        task('Divertikel', [
          'Vervollständige Divertikulose = … / Divertikulitis = …', 'Erkläre die Entstehung mit Druck, Schleimhaut und Muskelfasern.', 'Welche Beschwerden sprechen eher für Divertikulitis?', 'Erkläre Divertikulitis → Perforation → Peritonitis.', 'Nenne die drei Therapieansätze der Unterlage.'
        ]),
        { type: 'video', title: 'Was sind Hämorrhoiden?', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Notiere mindestens drei typische Beschwerden oder begünstigende Faktoren.', url: 'https://gesund.bund.de/haemorrhoiden' },
        task('Hämorrhoiden', [
          '[V] Drei Beschwerden oder begünstigende Faktoren aus dem Video.', '[I] Welche Funktion hat das Hämorrhoidalpolster?', '[I] Nenne Nässen, Juckreiz, Ekzeme und Blutungen.', '[I] Welche Diagnostik nennt die Unterlage?', '[T] Ordne Lokaltherapie → Injektion → Operation von gering invasiv bis operativ.'
        ]),
        { type: 'heading', title: 'Bisheriger Prüfungsfall Frau K.' },
        { type: 'text', text: 'Frau K., 62 Jahre: zwei Tage zunehmende Schmerzen im linken Unterbauch, Fieber und Durchfall; früher bereits beschwerdefreie Divertikel; zusätzlich helles Blut am Toilettenpapier und Juckreiz. Leber-, Galle- und Pankreaswerte werden bestimmt, später soll ein Stuhltest erklärt werden.' },
        { type: 'list', items: [
          '6.1 Welche Diagnose passt zu den akuten Beschwerden? Begründe mit drei Fallinformationen.', '6.2 Wie heißt der Zustand mit Divertikeln ohne Beschwerden?', '6.3 Welche Komplikation ist bei Perforation wichtig?', '6.4 Welche zweite Erkrankung erklärt helles Blut + Juckreiz und welche Diagnostik nennt die Unterlage?', '6.5 Je ein Laborwert für Leber, Galle/Gallenfarbstoff und Pankreas.', '6.6 Erkläre die Stuhlprobenentnahme in vier kurzen Schritten.', 'Exit: zwei Leberenzyme / okkult / Gastritis vs. Ulkus / Divertikulose vs. Divertikulitis / Diagnostik bei Hämorrhoiden.'
        ] },
      ],
    },
    {
      id: 'lf9-stunde4',
      title: 'Stunde 4 – Tumore und Krebs',
      content: [
        { type: 'info', title: 'Geplante nächste Doppelstunde', text: 'Unterlagenbasis: Tumordefinition, benigne/maligne, Krebsentstehung, TNM, Krebstherapie sowie Ösophagus-, Magen- und kolorektales Karzinom.' },
        { type: 'image', src: cancer, alt: 'Tumor Staging Therapie', caption: 'Einfacher Lernweg: erst benign/malign, dann Ausbreitung, danach TNM und Therapie.' },
        { type: 'table', headers: ['Merkmal', 'Benigne', 'Maligne'], rows: [['Wachstum','eher verdrängend','invasiv/zerstörend'],['Abgrenzung','häufig besser abgegrenzt','kann Gewebegrenzen überschreiten'],['Metastasen','nein','möglich'],['Bedeutung','kann trotzdem Beschwerden machen','Krebserkrankung im engeren Sinn']] },
        { type: 'video', title: 'Der Unterschied zwischen Primärtumor und Metastasen', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Achte auf Ursprungstumor und Tochtergeschwülste. Erkläre danach, warum eine Lebermetastase eines Darmtumors nicht automatisch primärer Leberkrebs ist.', url: 'https://gesund.bund.de/darmkrebs' },
        { type: 'heading', title: 'TNM-System' },
        { type: 'definition', term: 'T', definition: 'Ausdehnung/Größe des Primärtumors.' },
        { type: 'definition', term: 'N', definition: 'Befall regionaler Lymphknoten.' },
        { type: 'definition', term: 'M', definition: 'Fernmetastasen.' },
        { type: 'info', title: 'Unterlagenbegriff pTNM', text: 'Das vorangestellte p weist auf eine pathologische Einteilung nach Untersuchung von Operations-/Gewebematerial hin.' },
        { type: 'video', title: 'Wie wird Krebs behandelt?', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Achte auf Operation, Strahlentherapie und medikamentöse Behandlung. Verknüpfe das mit dem Merksatz „Stahl – Strahl – Chemie“ aus der Unterlage.', url: 'https://gesund.bund.de/magenkrebs' },
        { type: 'heading', title: 'Gastrointestinale Tumoren aus der Unterlage' },
        { type: 'table', headers: ['Tumor', 'Schlüsselbegriffe der Unterlage'], rows: [['Ösophaguskarzinom','Alkohol/Nikotin; Dysphagie'],['Magenkarzinom','Prädisposition, Gastritis A/B, Ulkus, Alkohol; Inappetenz, Gewichtsverlust, Hämatemesis'],['Kolorektales Karzinom','Adipositas, fettreiche/ballaststoffarme Kost, Rauchen; Adenom/Polyp → Dysplasie → Karzinom; mögliche Perforation/Ileus']] },
        task('Neue Aufgaben Stunde 4', [
          'Sortiere sechs Eigenschaften in benign oder malign.', 'Erkläre Primärtumor und Metastase mit einem eigenen Beispiel.', 'TNM-Fall: T3 N1 M0 – wofür stehen die drei Buchstaben?', 'Warum kann eine Biopsie oder Operation für die genaue Tumorklassifikation wichtig sein?', 'Ordne „Stahl – Strahl – Chemie“ den Therapieprinzipien zu.', 'Fall Dysphagie + langjähriges Rauchen/Alkohol: Welche Tumorlokalisation muss bedacht werden?', 'Fall Gewichtsverlust + Hämatemesis + chronische Magenprobleme: Welche Diagnosegruppe passt?', 'Erkläre die Adenom-Polyp-Dysplasie-Karzinom-Kette in eigenen Worten.', 'Nenne zwei mögliche Komplikationen eines kolorektalen Karzinoms aus der Unterlage.'
        ]),
      ],
    },
    {
      id: 'lf9-stunde5',
      title: 'Stunde 5 – Galle, Pankreas und Leber',
      content: [
        { type: 'info', title: 'Geplante Doppelstunde', text: 'Unterlagenbasis: Cholelithiasis, Pankreatitis, Fettleber, Hepatitis/Virushepatitis und Leberzirrhose.' },
        { type: 'image', src: hepatobiliary, alt: 'Leber Galle Pankreas', caption: 'Die drei Organe liegen funktionell eng zusammen; Gallensteine können deshalb auch das Pankreas betreffen.' },
        { type: 'video', title: 'Wie entstehen Gallensteine?', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Achte auf Entstehung, Kolik und mögliche Folgen. Danach mit der 6F-Merkliste aus der Unterlage vergleichen.', url: 'https://gesund.bund.de/gallensteine' },
        { type: 'heading', title: 'Cholelithiasis aus der Unterlage' },
        { type: 'text', text: 'Merkliste 6F: Female, Fair, Fat, Forty, Fertile, Family. Viele Gallensteine bleiben asymptomatisch; typisch können wellenförmige/kolikartige Schmerzen im rechten Oberbauch sein. Komplikationen: unter anderem Verschlussikterus und Cholezystitis. Als definitive Therapie nennt die Unterlage die Entfernung der Gallenblase.' },
        { type: 'heading', title: 'Pankreatitis' },
        { type: 'text', text: 'Die Unterlage beschreibt eine Selbstverdauung des Pankreas, wenn Verdauungsenzyme bereits im Organ aktiviert werden. Genannte Ursachen sind Alkohol/Rauchen, Infektionen und Gallensteine.' },
        { type: 'video', title: 'Akute Entzündung der Bauchspeicheldrüse', source: 'gesund.bund.de', duration: 'Artikel mit Video zu Gallensteinen', caption: 'Nutze die Seite zur Vertiefung der Verbindung Gallenstein ↔ Pankreatitis und notiere typische Warnsymptome.', url: 'https://gesund.bund.de/entzuendung-der-bauchspeicheldruese' },
        { type: 'video', title: 'Welche Funktion hat die Leber?', source: 'Stiftung Gesundheitswissen', duration: '2:04 Min.', caption: 'Notiere mindestens vier Leberfunktionen: Stoffwechsel, Speicherung, Galle, Entgiftung/Umwandlung, Eiweißbildung.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/koerper-wissen/welche-funktion-hat-die-leber', embedUrl: 'https://www.youtube-nocookie.com/embed/xQHJVi0qtV8' },
        { type: 'video', title: 'Wie entsteht eine Fettleber?', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Achte auf Ursachen, oft fehlende Anfangssymptome und den möglichen Verlauf über Entzündung/Fibrose zur Zirrhose.', url: 'https://gesund.bund.de/nicht-alkoholische-fettleber' },
        { type: 'heading', title: 'Hepatitis und Zirrhose' },
        { type: 'text', text: 'Die Unterlage nennt als Hepatitisursachen Alkohol, Viren, Autoimmunprozesse und Fettleber. Symptome: Müdigkeit, Druck im rechten Oberbauch und Ikterus. Chronische Hepatitis kann über Fibrose zur Zirrhose und Leberinsuffizienz führen. Bei Zirrhose werden unter anderem Ikterus, Lackzunge, Palmarerythem, Spider naevi, Ösophagusvarizen und Aszites genannt.' },
        { type: 'table', headers: ['Virus', 'Übertragung laut Unterlage', 'Impfung'], rows: [['Hepatitis A','fäkal-oral','ja'],['Hepatitis B','sexuell, vertikal, perkutan/parenteral','ja'],['Hepatitis C','vor allem parenteral; weitere Wege möglich','nein']] },
        { type: 'warning', title: 'Quelle und Aktualität trennen', text: 'Die Tabelle bildet die Lernunterlage ab. Impfempfehlungen, arbeitsmedizinische Vorgaben und konkrete Expositionsmaßnahmen werden im Berufsalltag immer nach aktuellen STIKO-/Praxisvorgaben geprüft.' },
        task('Neue Aufgaben Stunde 5', [
          'Erkläre die 6F-Merkliste.', 'Beschreibe eine Gallenkolik und nenne zwei Komplikationen.', 'Warum kann ein Gallenstein eine Pankreatitis auslösen?', 'Erkläre „Selbstverdauung“ des Pankreas.', 'Nenne vier Leberfunktionen aus Video/Unterlage.', 'Ordne Fettleber → Hepatitis/Entzündung → Fibrose → Zirrhose.', 'Vergleiche Hepatitis A, B und C nach Übertragung und Impfmöglichkeit.', 'Nenne vier sichtbare/klinische Zeichen einer Leberzirrhose.', 'Warum sind Ösophagusvarizen gefährlich?'
        ]),
      ],
    },
    {
      id: 'lf9-stunde6',
      title: 'Stunde 6 – Metabolisches Syndrom, Adipositas, Blutfette und Gicht',
      content: [
        { type: 'image', src: metabolic, alt: 'Metabolisches Syndrom', caption: 'Nicht vier isolierte Erkrankungen lernen, sondern die Wechselwirkungen verstehen.' },
        { type: 'text', text: 'Die Unterlage bündelt Übergewicht/Adipositas, arterielle Hypertonie, Fettstoffwechselstörung, Typ-2-Diabetes und Hyperurikämie/Gicht als zusammenhängenden Stoffwechsel-Risikokomplex.' },
        { type: 'video', title: 'Was bedeutet Adipositas?', source: 'Stiftung Gesundheitswissen', duration: '2:30 Min.', caption: 'Achte auf Definition, BMI, Ursachen und Behandlung. Danach BMI-Formel ohne Hilfe aufschreiben.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/adipositas/was-bedeutet-adipositas', embedUrl: 'https://www.youtube-nocookie.com/embed/xXfyJRLluL4' },
        { type: 'video', title: 'Wie ungesund ist Adipositas?', source: 'Stiftung Gesundheitswissen', duration: '2:28 Min.', caption: 'Notiere vier mögliche Begleiterkrankungen und ordne sie dem metabolischen Syndrom zu.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/adipositas/wie-ungesund-ist-adipositas', embedUrl: 'https://www.youtube-nocookie.com/embed/CW2K3mNEWg0' },
        { type: 'info', title: 'BMI aus der Unterlage', text: 'BMI = Körpergewicht in kg / (Körpergröße in m)². Die Unterlage verwendet >25 kg/m² für Übergewicht und >30 kg/m² für Adipositas und unterscheidet Adipositasgrade.' },
        { type: 'video', title: 'Was ist Cholesterin?', source: 'Stiftung Gesundheitswissen', duration: 'Kurzvideo', caption: 'Achte auf LDL, HDL, Leber und Gefäßablagerungen. Formuliere danach den Unterschied zwischen LDL und HDL ohne „gut/schlecht“ als einzige Erklärung.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/erhoehte-blutfettwerte/was-ist-cholesterin' },
        { type: 'video', title: 'Wie helfen Statine bei erhöhten Cholesterinwerten?', source: 'Stiftung Gesundheitswissen', duration: 'Kurzvideo', caption: 'Vertiefung: Wie senken Statine die körpereigene Cholesterinproduktion?', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/erhoehte-blutfettwerte/wie-helfen-statine-bei-erhoehten-cholesterinwerten' },
        { type: 'heading', title: 'Gicht und Harnsäure' },
        { type: 'text', text: 'Die Unterlage erklärt: Purine werden zu Harnsäure abgebaut; bei Hyperurikämie können sich Uratkristalle ablagern und eine Arthritis urica auslösen, häufig am Großzehengrundgelenk.' },
        { type: 'warning', title: 'Unterlage vs. aktuelle Vertiefung', text: 'Die Unterlage verwendet >7 mg/dl als Hyperurikämie-Merkwert. Aktuelle gesund.bund-Informationen beschreiben erhöhte Harnsäure ab etwa 6,8 mg/dl. Für schulische Aufgaben kennzeichnen wir deshalb ausdrücklich, ob nach Unterlage oder aktueller Vertiefung gefragt wird.' },
        { type: 'video', title: 'Gicht – Ursachen, Verlauf und Behandlung', source: 'gesund.bund.de', duration: 'Artikel/Medien', caption: 'Achte auf Harnsäure, Kristalle und Gelenkentzündung. Erkläre danach die Kette Purin → Harnsäure → Kristall → Gichtanfall.', url: 'https://gesund.bund.de/gicht' },
        task('Neue Aufgaben Stunde 6', [
          'Berechne BMI bei 1,70 m und 92 kg und ordne nach der Lernunterlage ein.', 'Nenne vier Folgeerkrankungen/Risiken einer Adipositas aus Unterlage oder Video.', 'Erkläre zentral vs. peripher verteiltes Fett anhand des Taillenumfangs/WHR-Prinzips.', 'Vergleiche LDL und HDL.', 'Erkläre Plaque → Gefäßverengung → Herzinfarkt/Schlaganfall.', 'Nenne drei nichtmedikamentöse Maßnahmen bei ungünstigen Blutfetten.', 'Erkläre Purin → Harnsäure → Uratkristall → Arthritis urica.', 'Warum ist das Großzehengrundgelenk ein klassischer Prüfungsbezug bei Gicht?', 'Verbinde Adipositas, Typ-2-Diabetes, Hyperlipidämie und Hypertonie in einer Ursache-Folge-Kette.'
        ]),
      ],
    },
    {
      id: 'lf9-stunde7',
      title: 'Stunde 7 – Diabetes I: Glukosestoffwechsel, Insulin, Typ 1 und Typ 2',
      content: [
        { type: 'image', src: glucose, alt: 'Insulin und Glukagon', caption: 'Insulin und Glukagon als Gegenspieler zuerst verstehen – danach die Diabetes-Typen.' },
        { type: 'text', text: 'Die Unterlage beschreibt Insulin als „Zellöffner“: Nach einem Blutzuckeranstieg unterstützt Insulin die Aufnahme von Glukose in Zellen. Glukose kann als Glykogen gespeichert oder bei Überschuss in Fett umgewandelt werden. Glukagon wirkt gegensinnig und erhöht den Blutzucker.' },
        { type: 'video', title: 'Wie wird der Blutzucker reguliert?', source: 'Stiftung Gesundheitswissen', duration: '2:21 Min.', caption: 'Achte auf Pankreas, Insulin und Glukoseaufnahme. Zeichne danach den Regelkreis ohne Vorlage.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/diabetes/wie-wird-der-blutzucker-reguliert', embedUrl: 'https://www.youtube-nocookie.com/embed/LGStk64kHhQ' },
        { type: 'image', src: diabetes, alt: 'Typ 1 und Typ 2 Vergleich', caption: 'Typ 1 = Insulin fehlt. Typ 2 = Insulin wirkt zunächst schlechter.' },
        { type: 'video', title: 'Was ist Diabetes Typ 1?', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Notiere Ursache, typische Symptome und warum Insulin notwendig ist.', url: 'https://gesund.bund.de/diabetes-typ-1' },
        { type: 'video', title: 'Was ist Diabetes Typ 2?', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Notiere Ursache/Insulinresistenz, Risikofaktoren, Symptome und Behandlungsprinzipien.', url: 'https://gesund.bund.de/diabetes-typ-2' },
        { type: 'table', headers: ['Merkmal', 'Typ 1', 'Typ 2'], rows: [['Mechanismus','Autoimmunzerstörung der Betazellen','Insulinresistenz, später Betazellerschöpfung möglich'],['Insulin','absoluter Mangel','zunächst vorhanden, Wirkung vermindert'],['Beginn','häufig jünger/rascher','häufig schleichend'],['Therapieprinzip','Insulin','Lebensstil + Medikamente, ggf. Insulin']] },
        { type: 'heading', title: 'Warum entstehen Polyurie und Polydipsie?' },
        { type: 'text', text: 'Bei stark erhöhtem Blutzucker kann Glukose im Urin erscheinen. Glukose zieht Wasser mit sich: Die Urinmenge steigt (Polyurie), dadurch steigt der Durst (Polydipsie). Die Unterlage nutzt hierfür eine Nierenschwelle von etwa 180 mg/dl als Lernwert.' },
        task('Neue Aufgaben Stunde 7', [
          'Erkläre Insulin und Glukagon als Gegenspieler.', 'Was passiert nach einer kohlenhydratreichen Mahlzeit?', 'Erkläre die Kette Hyperglykämie → Glukosurie → Polyurie → Polydipsie.', 'Vergleiche Typ 1 und Typ 2 in fünf Punkten.', 'Warum ist Typ 1 von Beginn an insulinpflichtig?', 'Was bedeutet Insulinresistenz?', 'Fall Kind/Jugendlicher + starker Durst + häufiges Wasserlassen + Gewichtsverlust/Abgeschlagenheit: Welche Diabetesform ist besonders zu bedenken?', 'Fall älterer Patient + Adipositas + schleichender Verlauf + Mykosen/Pruritus: Welche Diabetesform passt eher?'
        ]),
      ],
    },
    {
      id: 'lf9-stunde8',
      title: 'Stunde 8 – Diabetes II: Diagnostik, Schwangerschaft, Komplikationen und Therapie',
      content: [
        { type: 'info', title: 'Geplante Doppelstunde', text: 'Unterlagenbasis: Gestationsdiabetes, OGTT, HbA1c, Urindiagnostik, Hyper-/Hypoglykämie, Mikro-/Makroangiopathie, diabetischer Fuß und Insulin-/Antidiabetikatherapie.' },
        { type: 'heading', title: 'Gestationsdiabetes' },
        { type: 'text', text: 'Die Unterlage erklärt Schwangerschaftsdiabetes über hormonelle Veränderungen und Veranlagung. Mögliche Folge ist fetale Makrosomie; nach der Geburt kann der Blutzucker des Neugeborenen abfallen. Die Erkrankung kann symptomarm sein und wird unter anderem mit OGTT untersucht.' },
        { type: 'video', title: 'Schwangerschaftsdiabetes', source: 'gesund.bund.de', duration: 'Artikel/Medien', caption: 'Achte auf Risikofaktoren, Screening und Behandlung. Vergleiche danach mit der Lernunterlage.', url: 'https://gesund.bund.de/schwangerschaftsdiabetes' },
        { type: 'heading', title: 'OGTT, HbA1c und Urin' },
        { type: 'text', text: 'OGTT = oraler Glukosetoleranztest: nach standardisierter Glukosegabe werden Blutzuckerwerte zu festgelegten Zeitpunkten gemessen. HbA1c zeigt die längerfristige Blutzuckerbelastung. Die Lernunterlage beschreibt ihn als Langzeitwert der vergangenen etwa 8–10 Wochen; aktuelle Patienteninformationen sprechen meist von ungefähr 2–3 Monaten. Urin kann auf Glukose, Ketone und Albumin untersucht werden; Mikroalbumin kann früh auf diabetische Nierenschädigung hinweisen.' },
        { type: 'heading', title: 'Akute und langfristige Komplikationen' },
        { type: 'table', headers: ['Problem', 'Prinzip'], rows: [['Hyperglykämie/Ketoazidose','zu hoher Blutzucker, bei Typ 1 Gefahr einer Ketoazidose'],['Hypoglykämie','zu niedriger Blutzucker; akute neurologische Gefahr'],['Mikroangiopathie','kleine Gefäße: Retina, Niere, Nerven'],['Makroangiopathie','große Gefäße: Herz, Gehirn, Beine'],['Diabetischer Fuß','Neuropathie + Durchblutungsstörung + Wundheilungsproblem']] },
        { type: 'video', title: 'Diabetes Typ 2 – Diagnostik und Folgen', source: 'gesund.bund.de', duration: 'Video auf der Seite', caption: 'Achte auf HbA1c, Blut-/Urinuntersuchungen und Spätfolgen. Formuliere danach drei Kontrollziele einer Diabetesbetreuung.', url: 'https://gesund.bund.de/diabetes-typ-2' },
        { type: 'heading', title: 'Insulin und orale Antidiabetika aus der Unterlage' },
        { type: 'text', text: 'Die Unterlage unterscheidet Depot-/Basalinsulin und Normal-/schneller wirksames Insulin sowie konventionelle und intensivierte Insulintherapie. Bei Typ 2 nennt sie unter anderem Metformin und Sulfonylharnstoffe als orale Antidiabetika. Konkrete Therapieentscheidungen richten sich in der Praxis nach individueller ärztlicher Verordnung und aktuellen Leitlinien.' },
        task('Neue Aufgaben Stunde 8', [
          'Warum kann Gestationsdiabetes zu fetaler Makrosomie führen?', 'Erkläre den OGTT-Ablauf in eigenen Worten.', 'Was zeigt HbA1c – und warum ist er kein Momentwert?', 'Welche drei Stoffe werden laut Unterlage im Urin kontrolliert?', 'Warum ist Mikroalbumin relevant?', 'Unterscheide Hyperglykämie und Hypoglykämie.', 'Ordne Retinopathie, Nephropathie, Neuropathie und diabetischen Fuß zu.', 'Mikroangiopathie vs. Makroangiopathie: Nenne je zwei Zielorgane/Folgen.', 'Basal-/Depotinsulin vs. schneller wirksames Insulin: Wozu dient welches Prinzip?', 'Warum braucht ein diabetischer Fuß regelmäßige Kontrolle auch bei wenig Schmerzen?'
        ]),
      ],
    },
    {
      id: 'lf9-stunde9',
      title: 'Stunde 9 – Prüfungstraining und Vokabellisten',
      content: [
        { type: 'info', title: 'Geplanter Abschluss', text: 'Die Originalunterlage enthält ab dem hinteren Teil Vokabellisten, Beschriftungsaufgaben und Tests mit Lösungen. Diese Stunde verbindet die Begriffe mit Fällen statt nur isoliertem Auswendiglernen.' },
        { type: 'heading', title: 'Vokabel-Blitzrunde' },
        { type: 'table', headers: ['Begriff', 'Bedeutung'], rows: [['Inappetenz','Appetitlosigkeit'],['Nausea','Übelkeit'],['Emesis','Erbrechen'],['Meteorismus','geblähter Bauch'],['Flatulenz','vermehrter Abgang von Darmgasen'],['Diarrhö','Durchfall'],['Obstipation','Verstopfung'],['Exsikkose','Austrocknung'],['Ileus','Darmverschluss'],['Peritonitis','Bauchfellentzündung']] },
        { type: 'heading', title: 'Großer Mischfall' },
        { type: 'text', text: 'Ein 58-jähriger Patient mit Adipositas und Typ-2-Diabetes berichtet über rechtsseitige Oberbauchkoliken nach fettreichem Essen. Labor zeigt auffällige Gallen-/Leberwerte. Zusätzlich bestehen seit Monaten ungünstige Blutfette. Formuliere einen strukturierten Diagnoseweg und verknüpfe mindestens vier Lernfeld-9-Themen.' },
        { type: 'heading', title: 'Prüfungssimulation' },
        { type: 'list', items: [
          'Nährstoffe: KH/Proteine/Fette + je ein Enzym.', 'Beschrifte den Verdauungsweg und nenne Hauptfunktionen.', 'Diagnostik: Sonografie vs. Gastroskopie vs. Labor vs. Stuhltest.', 'Reflux, Ulkus, Divertikulitis, Appendizitis und Hämorrhoiden anhand von Fällen unterscheiden.', 'Benigne vs. maligne + TNM.', 'Gallensteine, Pankreatitis, Fettleber, Hepatitis, Zirrhose in Ursache-Folge-Ketten.', 'BMI berechnen und metabolisches Syndrom erklären.', 'LDL/HDL und Gichtmechanismus erklären.', 'Typ 1 vs. Typ 2 + Insulin/Glukagon.', 'OGTT, HbA1c, Urin, Hypo-/Hyperglykämie und Spätfolgen.', '30-Sekunden-Erklärung: Was ist der wichtigste Zusammenhang im Lernfeld 9?'
        ] },
        { type: 'warning', title: 'Prüfungstechnik', text: 'Bei Fällen zuerst Schlüsselwörter markieren, dann Organ/System bestimmen, anschließend Ursache → Symptom → Diagnostik → Komplikation → Therapieprinzip ordnen.' },
      ],
    },
    {
      id: 'video-mediathek',
      title: '🎬 Video-Mediathek Lernfeld 9',
      content: [
        { type: 'info', title: 'So nutzt du die Videos', text: 'Vor jedem Video eine Beobachtungsfrage lesen. Danach Video stoppen und den Inhalt in 30–60 Sekunden selbst erklären. Erst anschließend im Text nachsehen.' },
        { type: 'heading', title: 'Bisher eingesetzte Videos' },
        { type: 'video', title: 'Ultraschall', source: 'Stiftung Gesundheitswissen', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/koerper-wissen/wie-funktioniert-ultraschall', caption: 'Schallwelle → Echo → Bild.' },
        { type: 'video', title: 'Magenspiegelung', source: 'MVZ Landsberg / YouTube', url: 'https://www.youtube.com/watch?v=0cXtwoKzx04', caption: 'Instrument, Weg, Organe, Nutzen.' },
        { type: 'video', title: 'Infektionskrankheiten / Norovirus-Kontext', source: 'gesund.bund.de', url: 'https://gesund.bund.de/norovirus', caption: 'Infektion, Erreger, Übertragung.' },
        { type: 'video', title: 'Laktoseintoleranz', source: 'SRF', url: 'https://www.srf.ch/play/tv/srf-videos-zur-kostenlosen-nutzung/video/wissen-fuer-alle---wie-entwickelt-sich-eine-laktoseintoleranz?urn=urn:srf:video:6cdd8648-7bee-4d3a-b00c-c1f19350e4da', caption: 'Laktase und ungespaltener Milchzucker.' },
        { type: 'video', title: 'Refluxkrankheit', source: 'gesund.bund.de', url: 'https://gesund.bund.de/sodbrennen-refluxkrankheit', caption: 'Sphinkter, Rückfluss, Sodbrennen.' },
        { type: 'video', title: 'Blinddarmentzündung', source: 'gesund.bund.de', url: 'https://gesund.bund.de/blinddarmentzuendung', caption: 'Wurmfortsatz, Schmerzverlauf, Perforation.' },
        { type: 'video', title: 'Gastritis', source: 'gesund.bund.de', url: 'https://gesund.bund.de/gastritis', caption: 'Ursachen und Symptome.' },
        { type: 'video', title: 'Divertikulitis', source: 'SWR / ARD', url: 'https://www.ardmediathek.de/video/doc-fischer/schmerzen-im-bauch-was-tun-bei-divertikulitis/swr/Y3JpZDovL3N3ci5kZS9hZXgvbzE5NTE4Mzc', caption: 'Beschwerden und Behandlung.' },
        { type: 'video', title: 'Darmkrebsvorsorge: Stuhltest oder Darmspiegelung', source: 'KBV', duration: '1:05 Min.', url: 'https://www.kbv.de/video/6425', caption: 'Rolle von iFOBT und Koloskopie.' },
        { type: 'video', title: 'Hämorrhoiden', source: 'gesund.bund.de', url: 'https://gesund.bund.de/haemorrhoiden', caption: 'Symptome und Ursachen.' },
        { type: 'heading', title: 'Videos für die geplanten Folgestunden' },
        { type: 'video', title: 'Primärtumor und Metastasen', source: 'gesund.bund.de', url: 'https://gesund.bund.de/darmkrebs', caption: 'Krebsstunde: Primärtumor vs. Absiedlungen.' },
        { type: 'video', title: 'Wie wird Krebs behandelt?', source: 'gesund.bund.de', url: 'https://gesund.bund.de/magenkrebs', caption: 'Operation, Strahlentherapie, medikamentöse Therapie.' },
        { type: 'video', title: 'Gallensteine', source: 'gesund.bund.de', url: 'https://gesund.bund.de/gallensteine', caption: 'Entstehung, Kolik, Komplikationen.' },
        { type: 'video', title: 'Akute Pankreatitis', source: 'gesund.bund.de', url: 'https://gesund.bund.de/entzuendung-der-bauchspeicheldruese', caption: 'Gallensteine/Alkohol und starke Oberbauchschmerzen.' },
        { type: 'video', title: 'Funktion der Leber', source: 'Stiftung Gesundheitswissen', duration: '2:04 Min.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/koerper-wissen/welche-funktion-hat-die-leber', embedUrl: 'https://www.youtube-nocookie.com/embed/xQHJVi0qtV8', caption: 'Leberfunktionen anschaulich.' },
        { type: 'video', title: 'Fettleber', source: 'gesund.bund.de', url: 'https://gesund.bund.de/nicht-alkoholische-fettleber', caption: 'Entstehung und möglicher Verlauf.' },
        { type: 'video', title: 'Adipositas – Definition', source: 'Stiftung Gesundheitswissen', duration: '2:30 Min.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/adipositas/was-bedeutet-adipositas', embedUrl: 'https://www.youtube-nocookie.com/embed/xXfyJRLluL4', caption: 'BMI, Ursachen, Behandlung.' },
        { type: 'video', title: 'Adipositas – Begleiterkrankungen', source: 'Stiftung Gesundheitswissen', duration: '2:28 Min.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/adipositas/wie-ungesund-ist-adipositas', embedUrl: 'https://www.youtube-nocookie.com/embed/CW2K3mNEWg0', caption: 'Risiken und Folgeerkrankungen.' },
        { type: 'video', title: 'Cholesterin', source: 'Stiftung Gesundheitswissen', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/erhoehte-blutfettwerte/was-ist-cholesterin', caption: 'LDL, HDL, Gefäße.' },
        { type: 'video', title: 'Statine', source: 'Stiftung Gesundheitswissen', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/erhoehte-blutfettwerte/wie-helfen-statine-bei-erhoehten-cholesterinwerten', caption: 'Wirkprinzip bei erhöhtem LDL.' },
        { type: 'video', title: 'Gicht', source: 'gesund.bund.de', url: 'https://gesund.bund.de/gicht', caption: 'Harnsäurekristalle und Gelenkentzündung.' },
        { type: 'video', title: 'Blutzuckerregulation', source: 'Stiftung Gesundheitswissen', duration: '2:21 Min.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/diabetes/wie-wird-der-blutzucker-reguliert', embedUrl: 'https://www.youtube-nocookie.com/embed/LGStk64kHhQ', caption: 'Insulin und Glukoseaufnahme.' },
        { type: 'video', title: 'Diabetes Typ 1', source: 'gesund.bund.de', url: 'https://gesund.bund.de/diabetes-typ-1', caption: 'Autoimmunprozess, Symptome, Insulin.' },
        { type: 'video', title: 'Diabetes Typ 2', source: 'gesund.bund.de', url: 'https://gesund.bund.de/diabetes-typ-2', caption: 'Insulinresistenz, Risiken, Diagnostik, Behandlung.' },
        { type: 'video', title: 'Schwangerschaftsdiabetes', source: 'gesund.bund.de', url: 'https://gesund.bund.de/schwangerschaftsdiabetes', caption: 'Screening, Risiken, Behandlung.' },
      ],
    },
  ],
  questions: [
    { id: 1, question: 'Welcher Nährstoff wird bis zu Einfachzuckern wie Glukose gespalten?', type: 'single', options: [{id:'a',text:'Kohlenhydrate',correct:true},{id:'b',text:'Proteine'},{id:'c',text:'Mineralstoffe'},{id:'d',text:'Vitamine'}], explanation: 'Kohlenhydrate werden bei der Verdauung bis zu Einfachzuckern gespalten.', points: 2 },
    { id: 2, question: 'Woraus bestehen Proteine?', type: 'single', options: [{id:'a',text:'Aminosäuren',correct:true},{id:'b',text:'Fettsäuren nur'},{id:'c',text:'Mineralien'},{id:'d',text:'Glykogen'}], explanation: 'Proteine sind aus Aminosäuren aufgebaut.', points: 2 },
    { id: 3, question: 'Welches Enzym beginnt im Mund die Stärkeverdauung?', type: 'single', options: [{id:'a',text:'Amylase',correct:true},{id:'b',text:'Pepsin'},{id:'c',text:'Lipase'},{id:'d',text:'Laktase im Magen'}], explanation: 'Speichelamylase beginnt die Stärkeverdauung.', points: 2 },
    { id: 4, question: 'Wo findet der größte Teil der Nährstoffresorption statt?', type: 'single', options: [{id:'a',text:'Dünndarm',correct:true},{id:'b',text:'Speiseröhre'},{id:'c',text:'Mund'},{id:'d',text:'Enddarm'}], explanation: 'Der Dünndarm ist Hauptort der Resorption.', points: 2 },
    { id: 5, question: 'Welche Untersuchung arbeitet mit Schallwellen?', type: 'single', options: [{id:'a',text:'Sonografie',correct:true},{id:'b',text:'Gastroskopie'},{id:'c',text:'Stuhltest'},{id:'d',text:'Proktoskopie'}], explanation: 'Sonografie nutzt Schallwellen und Echos.', points: 2 },
    { id: 6, question: 'Welche Struktur kann eine Gastroskopie direkt beurteilen?', type: 'single', options: [{id:'a',text:'Magenschleimhaut',correct:true},{id:'b',text:'Knochenmark'},{id:'c',text:'Nierenkörperchen'},{id:'d',text:'Herzklappen'}], explanation: 'Die Gastroskopie betrachtet die Schleimhaut des oberen Verdauungstrakts.', points: 2 },
    { id: 7, question: 'Welches Enzym fehlt bei Laktoseintoleranz?', type: 'single', options: [{id:'a',text:'Laktase',correct:true},{id:'b',text:'Pepsin'},{id:'c',text:'Trypsin immer'},{id:'d',text:'Insulin'}], explanation: 'Laktase spaltet Milchzucker.', points: 2 },
    { id: 8, question: 'Was beschreibt Reflux?', type: 'single', options: [{id:'a',text:'Rückfluss von Mageninhalt in die Speiseröhre',correct:true},{id:'b',text:'Entzündung des Appendix'},{id:'c',text:'Blut im Urin'},{id:'d',text:'Gallensteinbildung'}], explanation: 'Reflux ist der Rückfluss von Mageninhalt in die Speiseröhre.', points: 2 },
    { id: 9, question: 'Was ist bei Appendizitis anatomisch entzündet?', type: 'single', options: [{id:'a',text:'Wurmfortsatz',correct:true},{id:'b',text:'gesamter Dickdarm'},{id:'c',text:'Gallenblase'},{id:'d',text:'Pankreas'}], explanation: 'Die Appendix vermiformis ist entzündet.', points: 2 },
    { id: 10, question: 'Welche Laborwerte werden in der Unterlage als Leberenzyme geführt?', type: 'multiple', options: [{id:'a',text:'GOT',correct:true},{id:'b',text:'GPT',correct:true},{id:'c',text:'GGT',correct:true},{id:'d',text:'Lipase'}], explanation: 'GOT, GPT und GGT werden dort als Leberenzyme zugeordnet.', points: 3 },
    { id: 11, question: 'Was bedeutet „okkult“ beim Stuhltest?', type: 'single', options: [{id:'a',text:'nicht sichtbar/versteckt',correct:true},{id:'b',text:'sehr hell'},{id:'c',text:'bakteriell'},{id:'d',text:'schmerzhaft'}], explanation: 'Okkult bedeutet verborgen bzw. mit bloßem Auge nicht sichtbar.', points: 2 },
    { id: 12, question: 'Was ist der Kernunterschied zwischen Gastritis und Ulkus in der Unterlage?', type: 'single', options: [{id:'a',text:'Ulkus ist ein tieferer Gewebsdefekt',correct:true},{id:'b',text:'Gastritis betrifft nur den Darm'},{id:'c',text:'Ulkus ist immer viral'},{id:'d',text:'kein Unterschied'}], explanation: 'Das Ulkus reicht tiefer über die Epithelgrenze hinaus.', points: 2 },
    { id: 13, question: 'Divertikulitis bedeutet …', type: 'single', options: [{id:'a',text:'entzündete Divertikel',correct:true},{id:'b',text:'nur vorhandene Divertikel ohne Entzündung'},{id:'c',text:'Magenulkus'},{id:'d',text:'Pankreasentzündung'}], explanation: 'Divertikulitis = Entzündung von Divertikeln.', points: 2 },
    { id: 14, question: 'Welche Diagnostik nennt die Unterlage beim Hämorrhoidalleiden?', type: 'single', options: [{id:'a',text:'Proktoskopie',correct:true},{id:'b',text:'EEG'},{id:'c',text:'Spirometrie'},{id:'d',text:'Audiometrie'}], explanation: 'Genannt wird die Proktoskopie.', points: 2 },
    { id: 15, question: 'Welche Eigenschaft passt zu einem malignen Tumor?', type: 'single', options: [{id:'a',text:'kann invasiv wachsen und metastasieren',correct:true},{id:'b',text:'bildet nie Metastasen'},{id:'c',text:'ist immer harmlos'},{id:'d',text:'ist immer scharf abgegrenzt'}], explanation: 'Maligne Tumoren können invasiv wachsen und Metastasen bilden.', points: 2 },
    { id: 16, question: 'Wofür steht M im TNM-System?', type: 'single', options: [{id:'a',text:'Fernmetastasen',correct:true},{id:'b',text:'Magen'},{id:'c',text:'Medikament'},{id:'d',text:'Muskel'}], explanation: 'M beschreibt Fernmetastasen.', points: 2 },
    { id: 17, question: 'Welches Symptom passt laut Unterlage besonders zum Ösophaguskarzinom?', type: 'single', options: [{id:'a',text:'Dysphagie',correct:true},{id:'b',text:'Pollakisurie'},{id:'c',text:'Tinnitus'},{id:'d',text:'Epistaxis'}], explanation: 'Schluckbeschwerden/Dysphagie sind ein wichtiger Bezug.', points: 2 },
    { id: 18, question: 'Welche Merkhilfe nutzt die Unterlage für Gallenstein-Risikofaktoren?', type: 'single', options: [{id:'a',text:'6F',correct:true},{id:'b',text:'6R'},{id:'c',text:'ABCDE'},{id:'d',text:'FAST'}], explanation: 'Female, Fair, Fat, Forty, Fertile, Family.', points: 2 },
    { id: 19, question: 'Welche Komplikation kann ein Gallenstein auslösen?', type: 'multiple', options: [{id:'a',text:'Cholezystitis',correct:true},{id:'b',text:'Pankreatitis',correct:true},{id:'c',text:'Obstruktiver Ikterus',correct:true},{id:'d',text:'Myopie'}], explanation: 'Gallensteine können Gallenwege blockieren, Entzündung und Pankreatitis begünstigen.', points: 3 },
    { id: 20, question: 'Welche Funktion hat die Leber?', type: 'multiple', options: [{id:'a',text:'Galle bilden',correct:true},{id:'b',text:'Stoffwechsel/ Speicherung',correct:true},{id:'c',text:'Eiweiße bilden',correct:true},{id:'d',text:'Luft filtern'}], explanation: 'Die Leber erfüllt zahlreiche Stoffwechsel-, Synthese- und Entgiftungsaufgaben.', points: 3 },
    { id: 21, question: 'Welche Hepatitisformen sind laut Unterlage impfpräventabel?', type: 'multiple', options: [{id:'a',text:'Hepatitis A',correct:true},{id:'b',text:'Hepatitis B',correct:true},{id:'c',text:'Hepatitis C'}], explanation: 'Für A und B gibt es Impfungen; für C nicht.', points: 3 },
    { id: 22, question: 'Was passiert bei einer Leberzirrhose?', type: 'single', options: [{id:'a',text:'funktionsfähiges Gewebe wird durch Narben-/Bindegewebe ersetzt',correct:true},{id:'b',text:'Leber wird zu Muskel'},{id:'c',text:'nur Galle wird gespeichert'},{id:'d',text:'keine Gewebeveränderung'}], explanation: 'Zirrhose bedeutet fortschreitenden narbigen Umbau.', points: 2 },
    { id: 23, question: 'Wie lautet die BMI-Formel?', type: 'single', options: [{id:'a',text:'kg / m²',correct:true},{id:'b',text:'m / kg²'},{id:'c',text:'kg × m'},{id:'d',text:'kg / Alter'}], explanation: 'BMI = Körpergewicht / Körpergröße².', points: 2 },
    { id: 24, question: 'Welche Faktoren gehören zum metabolischen Syndrom?', type: 'multiple', options: [{id:'a',text:'Adipositas',correct:true},{id:'b',text:'Hypertonie',correct:true},{id:'c',text:'Fettstoffwechselstörung',correct:true},{id:'d',text:'Typ-2-Diabetes',correct:true}], explanation: 'Diese Faktoren treten häufig gemeinsam auf und verstärken Risiken.', points: 4 },
    { id: 25, question: 'Welche Aussage zu LDL ist richtig?', type: 'single', options: [{id:'a',text:'LDL transportiert Cholesterin von der Leber zu Geweben; hohe Werte fördern Ablagerungen',correct:true},{id:'b',text:'LDL ist ein Verdauungsenzym'},{id:'c',text:'LDL ist Insulin'},{id:'d',text:'LDL entsteht nur im Darm'}], explanation: 'LDL transportiert Cholesterin und kann bei hohen Werten Arteriosklerose fördern.', points: 2 },
    { id: 26, question: 'Was löst einen Gichtanfall aus?', type: 'single', options: [{id:'a',text:'Uratkristalle im Gelenk',correct:true},{id:'b',text:'zu wenig Speichel'},{id:'c',text:'Vitamin-C-Mangel immer'},{id:'d',text:'Gallenfarbstoff'}], explanation: 'Harnsäure-/Uratkristalle können eine akute Gelenkentzündung auslösen.', points: 2 },
    { id: 27, question: 'Welche Wirkung hat Insulin?', type: 'single', options: [{id:'a',text:'fördert Glukoseaufnahme in Zellen und senkt Blutzucker',correct:true},{id:'b',text:'erhöht Blutzucker immer'},{id:'c',text:'bildet Galle'},{id:'d',text:'spaltet Proteine im Magen'}], explanation: 'Insulin unterstützt die Aufnahme und Speicherung von Glukose.', points: 2 },
    { id: 28, question: 'Welche Wirkung hat Glukagon?', type: 'single', options: [{id:'a',text:'erhöht den Blutzucker durch Mobilisierung von Energiereserven',correct:true},{id:'b',text:'senkt immer den Blutdruck'},{id:'c',text:'ist Magensäure'},{id:'d',text:'ist ein Antibiotikum'}], explanation: 'Glukagon wirkt insulinantagonistisch und hebt den Blutzucker an.', points: 2 },
    { id: 29, question: 'Was ist die Hauptursache des Typ-1-Diabetes?', type: 'single', options: [{id:'a',text:'Autoimmunzerstörung der Betazellen',correct:true},{id:'b',text:'zu viel Galle'},{id:'c',text:'Divertikel'},{id:'d',text:'nur Bewegungsmangel'}], explanation: 'Das Immunsystem zerstört insulinproduzierende Betazellen.', points: 2 },
    { id: 30, question: 'Was bedeutet Insulinresistenz?', type: 'single', options: [{id:'a',text:'Zellen reagieren vermindert auf Insulin',correct:true},{id:'b',text:'Insulin wird zu Galle'},{id:'c',text:'Insulin wird im Magen verdaut'},{id:'d',text:'Blutdruck sinkt'}], explanation: 'Typisch für Typ 2: Insulin ist vorhanden, wirkt aber schlechter.', points: 2 },
    { id: 31, question: 'Warum führt starke Hyperglykämie zu Polyurie?', type: 'single', options: [{id:'a',text:'Glukose im Urin zieht Wasser mit',correct:true},{id:'b',text:'Galle wird ausgeschieden'},{id:'c',text:'Darm nimmt mehr Wasser auf'},{id:'d',text:'Puls sinkt'}], explanation: 'Osmotische Diurese erhöht die Urinmenge.', points: 3 },
    { id: 32, question: 'Was zeigt HbA1c?', type: 'single', options: [{id:'a',text:'längerfristige Blutzuckerbelastung',correct:true},{id:'b',text:'aktuellen Puls'},{id:'c',text:'Gallensteinanzahl'},{id:'d',text:'Lebergröße'}], explanation: 'HbA1c ist ein Langzeitmarker und kein Momentwert.', points: 2 },
    { id: 33, question: 'Welche Untersuchung dient der Glukosetoleranzprüfung?', type: 'single', options: [{id:'a',text:'OGTT',correct:true},{id:'b',text:'EKG'},{id:'c',text:'EEG'},{id:'d',text:'Audiogramm'}], explanation: 'OGTT = oraler Glukosetoleranztest.', points: 2 },
    { id: 34, question: 'Welche Spätfolge gehört zur Mikroangiopathie?', type: 'multiple', options: [{id:'a',text:'Retinopathie',correct:true},{id:'b',text:'Nephropathie',correct:true},{id:'c',text:'Neuropathie/kleingefäßbezogene Folgeschäden im Lernkontext',correct:true},{id:'d',text:'Gallenstein'}], explanation: 'Kleine Gefäße von Augen, Nieren und Nervenstrukturen sind klassische Diabetes-Zielbereiche.', points: 3 },
    { id: 35, question: 'Warum ist der diabetische Fuß gefährlich?', type: 'multiple', options: [{id:'a',text:'Neuropathie kann Schmerzen vermindern',correct:true},{id:'b',text:'Durchblutungsstörung verschlechtert Heilung',correct:true},{id:'c',text:'kleine Wunden können unbemerkt bleiben',correct:true},{id:'d',text:'weil immer Gallensteine entstehen'}], explanation: 'Neuropathie und Durchblutungsstörung begünstigen unbemerkte, schlecht heilende Wunden.', points: 3 },
    { id: 36, question: 'Was ist Exsikkose?', type: 'single', options: [{id:'a',text:'Austrocknung',correct:true},{id:'b',text:'Gallenblasenentzündung'},{id:'c',text:'Schluckstörung'},{id:'d',text:'Leberzirrhose'}], explanation: 'Exsikkose = ausgeprägter Flüssigkeitsmangel/Austrocknung.', points: 2 },
    { id: 37, question: 'Was bedeutet Dysphagie?', type: 'single', options: [{id:'a',text:'Schluckstörung',correct:true},{id:'b',text:'Durchfall'},{id:'c',text:'Erbrechen'},{id:'d',text:'Verstopfung'}], explanation: 'Dysphagie bezeichnet Schluckbeschwerden.', points: 2 },
    { id: 38, question: 'Was bedeutet Peritonitis?', type: 'single', options: [{id:'a',text:'Bauchfellentzündung',correct:true},{id:'b',text:'Nierenentzündung'},{id:'c',text:'Gicht'},{id:'d',text:'Reflux'}], explanation: 'Peritonitis = Entzündung des Bauchfells.', points: 2 },
    { id: 39, question: 'Ordne den Diagnoseweg bei einem Fall sinnvoll.', type: 'text', correctAnswer: 'symptome,anamnese,untersuchung,diagnostik,labor,bildgebung', explanation: 'Erst Beschwerden/Anamnese und Untersuchung strukturieren, danach zielgerichtete Diagnostik wie Labor, Bildgebung oder Endoskopie.', points: 4 },
    { id: 40, question: 'Erkläre in einem Satz den roten Faden von Lernfeld 9.', type: 'text', correctAnswer: 'nahrung,verdauung,stoffwechsel,organe,erkrankungen,diagnostik', explanation: 'Der rote Faden verbindet Nahrungsaufnahme und Verdauung mit Organfunktionen, Stoffwechsel, Diagnostik und typischen Erkrankungen.', points: 4 },
  ],
};
