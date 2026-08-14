import type { LearningModule } from '@/types';

const svg = (content: string) => `data:image/svg+xml;utf8,${encodeURIComponent(content)}`;

const heartFlow = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="560" viewBox="0 0 1000 560">
 <rect width="1000" height="560" rx="32" fill="#f8fafc"/>
 <text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700" fill="#0f172a">Blutweg durch Herz, Lunge und Körper</text>
 <g font-family="Arial" text-anchor="middle">
  <rect x="65" y="185" width="170" height="100" rx="20" fill="#dbeafe" stroke="#2563eb" stroke-width="4"/><text x="150" y="225" font-size="22" font-weight="700">Körper</text><text x="150" y="255" font-size="17">O₂-arm</text>
  <rect x="300" y="120" width="170" height="100" rx="20" fill="#e0f2fe" stroke="#0284c7" stroke-width="4"/><text x="385" y="160" font-size="21" font-weight="700">rechtes Herz</text><text x="385" y="190" font-size="16">Vorhof → Kammer</text>
  <rect x="530" y="185" width="170" height="100" rx="20" fill="#dcfce7" stroke="#16a34a" stroke-width="4"/><text x="615" y="225" font-size="22" font-weight="700">Lunge</text><text x="615" y="255" font-size="17">Gasaustausch</text>
  <rect x="765" y="120" width="170" height="100" rx="20" fill="#fee2e2" stroke="#dc2626" stroke-width="4"/><text x="850" y="160" font-size="21" font-weight="700">linkes Herz</text><text x="850" y="190" font-size="16">Vorhof → Kammer</text>
 </g>
 <g fill="none" stroke="#64748b" stroke-width="5"><path d="M235 235 C270 235 270 170 300 170"/><path d="M470 170 C500 170 500 235 530 235"/><path d="M700 235 C735 235 735 170 765 170"/><path d="M850 220 C850 365 150 365 150 285"/></g>
 <g font-family="Arial" font-size="17" fill="#475569"><text x="245" y="205">Hohlvenen</text><text x="475" y="205">Lungenarterie</text><text x="705" y="205">Lungenvenen</text><text x="500" y="395" text-anchor="middle">Aorta → Körperkreislauf</text></g>
 <text x="500" y="470" text-anchor="middle" font-size="24" font-family="Arial" font-weight="700" fill="#0d9488">Merke: rechts → Lunge, links → Körper</text>
</svg>`);

const pulsePressure = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="520" viewBox="0 0 1000 520">
 <rect width="1000" height="520" rx="32" fill="#f8fafc"/><text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Puls und Blutdruck – nicht dasselbe</text>
 <g font-family="Arial"><rect x="70" y="120" width="390" height="290" rx="24" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/><text x="265" y="170" text-anchor="middle" font-size="25" font-weight="700">Puls</text><text x="105" y="220" font-size="20">• Druckwelle in einer Arterie</text><text x="105" y="260" font-size="20">• Einheit: Schläge/min</text><text x="105" y="300" font-size="20">• tastbar z. B. am Handgelenk</text><text x="105" y="340" font-size="20">• Rhythmus + Frequenz beobachten</text>
 <rect x="540" y="120" width="390" height="290" rx="24" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="735" y="170" text-anchor="middle" font-size="25" font-weight="700">Blutdruck</text><text x="575" y="220" font-size="20">• Druck des Blutes auf Gefäßwand</text><text x="575" y="260" font-size="20">• Einheit: mmHg</text><text x="575" y="300" font-size="20">• systolisch = Herz zieht sich zusammen</text><text x="575" y="340" font-size="20">• diastolisch = Herz entspannt</text></g>
 <text x="500" y="465" text-anchor="middle" font-size="23" font-family="Arial" font-weight="700" fill="#0f766e">Puls zählt Herzschläge – Blutdruck misst Druck.</text></svg>`);

const airwayTree = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="600" viewBox="0 0 1000 600"><rect width="1000" height="600" rx="32" fill="#f8fafc"/><text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Weg der Atemluft</text><g font-family="Arial" text-anchor="middle" font-size="20"><rect x="390" y="90" width="220" height="60" rx="18" fill="#ccfbf1"/><text x="500" y="128">Nase / Mund</text><rect x="390" y="175" width="220" height="60" rx="18" fill="#e0f2fe"/><text x="500" y="213">Rachen + Kehlkopf</text><rect x="390" y="260" width="220" height="60" rx="18" fill="#fef3c7"/><text x="500" y="298">Trachea</text><rect x="165" y="360" width="240" height="70" rx="18" fill="#dcfce7"/><text x="285" y="402">rechter Bronchialbaum</text><rect x="595" y="360" width="240" height="70" rx="18" fill="#dcfce7"/><text x="715" y="402">linker Bronchialbaum</text><circle cx="285" cy="510" r="55" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/><circle cx="715" cy="510" r="55" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/><text x="285" y="518">Alveolen</text><text x="715" y="518">Alveolen</text></g><g stroke="#64748b" stroke-width="4" fill="none"><path d="M500 150V175M500 235V260M500 320V340M500 340L285 360M500 340L715 360M285 430V455M715 430V455"/></g></svg>`);

const alveolus = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="500" viewBox="0 0 1000 500"><rect width="1000" height="500" rx="32" fill="#f8fafc"/><text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Gasaustausch in den Alveolen</text><circle cx="360" cy="260" r="130" fill="#e0f2fe" stroke="#38bdf8" stroke-width="5"/><text x="360" y="260" text-anchor="middle" font-size="28" font-family="Arial" font-weight="700">Alveole</text><path d="M580 135 C740 100 820 180 780 265 C740 350 625 390 565 330 C510 275 520 180 580 135Z" fill="#fee2e2" stroke="#ef4444" stroke-width="5"/><text x="685" y="255" text-anchor="middle" font-size="25" font-family="Arial" font-weight="700">Kapillare</text><path d="M455 210H570" stroke="#16a34a" stroke-width="8"/><path d="M570 300H455" stroke="#f97316" stroke-width="8"/><text x="515" y="190" text-anchor="middle" font-size="22" font-family="Arial" fill="#15803d">O₂ → Blut</text><text x="515" y="335" text-anchor="middle" font-size="22" font-family="Arial" fill="#c2410c">CO₂ → Alveole</text><text x="500" y="450" text-anchor="middle" font-size="23" font-family="Arial" font-weight="700">Diffusion: Teilchen wandern entlang eines Konzentrationsgefälles.</text></svg>`);

const goaeFormula = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="500" viewBox="0 0 1000 500"><rect width="1000" height="500" rx="32" fill="#f8fafc"/><text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">GOÄ – vom Punkt zur Gebühr</text><g font-family="Arial" text-anchor="middle"><rect x="80" y="150" width="220" height="95" rx="20" fill="#ccfbf1"/><text x="190" y="190" font-size="23" font-weight="700">Punktzahl</text><text x="190" y="220" font-size="19">z. B. 80 Punkte</text><text x="350" y="205" font-size="34">×</text><rect x="400" y="150" width="220" height="95" rx="20" fill="#e0f2fe"/><text x="510" y="190" font-size="23" font-weight="700">Punktwert</text><text x="510" y="220" font-size="19">5,82873 Cent</text><text x="670" y="205" font-size="34">×</text><rect x="720" y="150" width="200" height="95" rx="20" fill="#fef3c7"/><text x="820" y="190" font-size="23" font-weight="700">Faktor</text><text x="820" y="220" font-size="19">z. B. 2,3</text><text x="500" y="335" font-size="25" font-weight="700">= berechnete Gebühr</text><text x="500" y="390" font-size="20" fill="#475569">Schwellenwert ≠ automatisch maximaler Satz.</text></g></svg>`);

export const lf5: LearningModule = {
  id: 'lf5',
  number: 5,
  title: 'Herz-Kreislauf-System, Atemwege & GOÄ',
  subtitle: 'Von null an erklärt: Herz, Blutkreislauf, Puls, Blutdruck, Atmung, Gasaustausch und Privatabrechnung',
  description: 'Ausführlicher Lernkurs für Auszubildende ohne Vorwissen. Viele Schaubilder, kurze Videos, Merksätze, Praxisbeispiele und prüfungsnahe Aufgaben bauen das Thema Schritt für Schritt auf.',
  difficulty: 'medium',
  icon: 'heart',
  heroImage: '/images/lf5-hero.jpg',
  topics: [
    {
      id: 'herz-basics',
      title: '1. Das Herz wirklich verstehen',
      content: [
        { type: 'heading', title: 'Was macht das Herz überhaupt?' },
        { type: 'text', text: 'Das Herz ist eine Muskelpumpe. Seine wichtigste Aufgabe ist nicht einfach „Blut bewegen“, sondern zwei Kreisläufe gleichzeitig anzutreiben: den Lungenkreislauf und den Körperkreislauf. So gelangt sauerstoffarmes Blut zur Lunge und sauerstoffreiches Blut anschließend zu den Organen.' },
        { type: 'image', src: heartFlow, alt: 'Schaubild zum Blutweg durch Herz, Lunge und Körper', caption: 'Der komplette Blutweg auf einen Blick. Folge den Pfeilen von Körper → rechtes Herz → Lunge → linkes Herz → Körper.' },
        { type: 'heading', title: 'Vier Herzhöhlen' },
        { type: 'table', headers: ['Herzhöhle', 'Was kommt hinein?', 'Wohin geht es weiter?'], rows: [
          ['Rechter Vorhof', 'sauerstoffarmes Blut aus den Hohlvenen', 'rechte Kammer'],
          ['Rechte Kammer', 'Blut aus dem rechten Vorhof', 'über die Lungenarterie zur Lunge'],
          ['Linker Vorhof', 'sauerstoffreiches Blut aus den Lungenvenen', 'linke Kammer'],
          ['Linke Kammer', 'Blut aus dem linken Vorhof', 'über die Aorta in den Körper'],
        ]},
        { type: 'info', title: 'Der häufigste Denkfehler', text: 'Arterie bedeutet nicht automatisch „sauerstoffreich“. Arterien führen Blut VOM Herzen weg, Venen ZUM Herzen hin. Deshalb transportiert die Lungenarterie sauerstoffarmes Blut und die Lungenvene sauerstoffreiches Blut.' },
        { type: 'heading', title: 'Herzklappen als Ventile' },
        { type: 'text', text: 'Herzklappen sorgen dafür, dass das Blut nur in eine Richtung fließt. Sie öffnen sich, wenn Blut weiterfließen soll, und schließen, damit es nicht zurückströmt. Für die Prüfung reicht zunächst das Prinzip: Klappen = Rückschlagventile.' },
        { type: 'video', title: 'Video: Wie funktioniert das Herz?', text: 'Sehr kurzer Einstieg. Achte beim Anschauen besonders darauf, welche Herzhälfte welchen Kreislauf versorgt.', duration: '1:30 Min.', source: 'Stiftung Gesundheitswissen', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/koerper-wissen/wie-funktioniert-das-herz', embedUrl: 'https://www.youtube-nocookie.com/embed/xfzz1JcZ4cU' },
        { type: 'warning', title: 'Nach dem Video selbst erklären', text: 'Versuche ohne nachzulesen: „Das rechte Herz pumpt …, das linke Herz pumpt …“. Wenn du diesen Satz sicher kannst, hast du den Grundkreislauf verstanden.' },
      ],
    },
    {
      id: 'kreislauf-puls',
      title: '2. Kreislauf, Puls und Blutdruck',
      content: [
        { type: 'heading', title: 'Kleiner und großer Kreislauf' },
        { type: 'definition', term: 'Lungenkreislauf', definition: 'Rechte Herzkammer → Lunge → linker Vorhof. Hier wird das Blut mit Sauerstoff angereichert.' },
        { type: 'definition', term: 'Körperkreislauf', definition: 'Linke Herzkammer → Körper → rechter Vorhof. Hier gibt das Blut Sauerstoff und Nährstoffe an Gewebe ab.' },
        { type: 'heading', title: 'Puls oder Blutdruck?' },
        { type: 'image', src: pulsePressure, alt: 'Vergleich von Puls und Blutdruck', caption: 'Puls = Anzahl/Qualität der Druckwellen. Blutdruck = Druck innerhalb der Arterien.' },
        { type: 'text', text: 'Der Puls entsteht, weil bei jeder Herzkontraktion eine Druckwelle in den Arterien weitergegeben wird. Bei der Pulsmessung beurteilt man vor allem Frequenz, Rhythmus und Tastbarkeit.' },
        { type: 'info', title: 'Prüfungswert aus deinem Lernfeld', text: 'Als Lernwert wird für Erwachsene ein Ruhepuls von etwa 60–80 Schlägen pro Minute verwendet. Situation, Fitness, Fieber, Schmerzen und Stress können den Puls verändern.' },
        { type: 'video', title: 'Video: Puls richtig messen', text: 'Achte darauf, wo die Finger liegen und warum nicht mit dem Daumen gemessen wird.', duration: '1:59 Min.', source: 'Stiftung Gesundheitswissen', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/koerper-wissen/wie-messe-ich-meinen-puls', embedUrl: 'https://www.youtube-nocookie.com/embed/ffmGIlgEA6k' },
        { type: 'heading', title: 'Blutdruck verstehen' },
        { type: 'table', headers: ['Wert', 'Phase des Herzens', 'Bedeutung'], rows: [
          ['systolisch', 'Herz zieht sich zusammen', 'höchster Druck während der Auswurfphase'],
          ['diastolisch', 'Herz entspannt sich', 'niedrigerer Druck zwischen den Herzschlägen'],
        ]},
        { type: 'video', title: 'Video: Blutdruck richtig messen', text: 'Das Video zeigt die praktische Messung. Beobachte Sitzposition, Ruhephase, Manschettenlage und Armposition.', duration: '1:46 Min.', source: 'Stiftung Gesundheitswissen', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/koerper-wissen/wie-messe-ich-meinen-blutdruck', embedUrl: 'https://www.youtube-nocookie.com/embed/fQ8QZSiCEwY' },
        { type: 'list', items: [
          'Vor der Messung kurz zur Ruhe kommen.',
          'Manschette passend am Oberarm anlegen.',
          'Arm entspannt und ungefähr auf Herzhöhe lagern.',
          'Während der Messung nicht sprechen oder bewegen.',
          'Werte korrekt dokumentieren: z. B. 128/78 mmHg.',
        ]},
      ],
    },
    {
      id: 'atemwege-basics',
      title: '3. Atemwege von oben bis unten',
      content: [
        { type: 'heading', title: 'Warum gibt es so viele Abschnitte?' },
        { type: 'text', text: 'Die Atemwege transportieren Luft nicht nur. Die oberen Atemwege filtern, erwärmen und befeuchten die Luft. Die unteren Atemwege leiten sie immer feiner bis zu den Alveolen, wo der eigentliche Gasaustausch stattfindet.' },
        { type: 'image', src: airwayTree, alt: 'Schematischer Weg der Atemluft', caption: 'Lerne den Weg wie eine Route: Nase/Mund → Rachen → Kehlkopf → Trachea → Bronchien → Bronchiolen → Alveolen.' },
        { type: 'table', headers: ['Abschnitt', 'Aufgabe'], rows: [
          ['Nasenhöhle', 'Luft filtern, erwärmen und befeuchten'],
          ['Rachen', 'Verbindungsraum für Atem- und Speiseweg'],
          ['Kehlkopf', 'Stimme und Schutz der tieferen Atemwege'],
          ['Trachea', 'Luftleitung zu den Hauptbronchien'],
          ['Bronchien/Bronchiolen', 'Verteilung der Luft in der Lunge'],
          ['Alveolen', 'Gasaustausch zwischen Luft und Blut'],
        ]},
        { type: 'heading', title: 'Das Flimmerepithel' },
        { type: 'text', text: 'Die Atemwegsschleimhaut besitzt Flimmerhärchen. Schleim bindet Staub und Fremdpartikel, die Härchen transportieren den Schleim Richtung Rachen. Dieses Reinigungsprinzip wird häufig als Schleim-Flimmer-Apparat bezeichnet.' },
        { type: 'info', title: 'Bild im Kopf', text: 'Stell dir das Flimmerepithel wie ein Förderband vor, das Schmutz aus den Atemwegen nach oben transportiert.' },
      ],
    },
    {
      id: 'gasaustausch',
      title: '4. Gasaustausch in den Alveolen',
      content: [
        { type: 'heading', title: 'Der wichtigste Ort der Atmung' },
        { type: 'image', src: alveolus, alt: 'Schaubild des Gasaustauschs in den Alveolen', caption: 'Sauerstoff geht aus der Alveole ins Blut; Kohlendioxid nimmt den Gegenweg.' },
        { type: 'text', text: 'Die Alveolen sind von feinsten Blutgefäßen, den Kapillaren, umgeben. Die sehr dünnen Wände ermöglichen einen kurzen Diffusionsweg. Sauerstoff gelangt aus der eingeatmeten Luft ins Blut. Kohlendioxid gelangt aus dem Blut in die Alveole und wird ausgeatmet.' },
        { type: 'definition', term: 'Diffusion', definition: 'Teilchen bewegen sich ohne aktive Pumpe von einem Bereich höherer Konzentration in einen Bereich niedrigerer Konzentration, bis ein Ausgleich angestrebt wird.' },
        { type: 'video', title: 'Video: Wie funktioniert die Lunge?', text: 'Das Video verbindet Bronchien, Alveolen, Atemmechanik und Gasaustausch. Stoppe danach und zeichne den O₂- und CO₂-Weg aus dem Gedächtnis.', duration: '1:46 Min.', source: 'Stiftung Gesundheitswissen', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/koerper-wissen/wie-funktioniert-die-lunge', embedUrl: 'https://www.youtube-nocookie.com/embed/-CyRvqJR9O0' },
        { type: 'warning', title: 'Prüfungsfalle', text: 'Der Gasaustausch findet nicht in der Trachea und nicht in den großen Bronchien statt, sondern an den Alveolen mit den angrenzenden Kapillaren.' },
      ],
    },
    {
      id: 'goae-basics',
      title: '5. GOÄ – Privatabrechnung ohne Angst',
      content: [
        { type: 'heading', title: 'Wozu dient die GOÄ?' },
        { type: 'text', text: 'Die Gebührenordnung für Ärzte regelt die Vergütung ärztlicher Leistungen außerhalb der vertragsärztlichen Kassenabrechnung, insbesondere bei privatärztlicher Abrechnung. Für die Ausbildung ist wichtig zu verstehen, wie aus einer Leistungsnummer eine Gebühr wird.' },
        { type: 'image', src: goaeFormula, alt: 'Schaubild zur Berechnung einer GOÄ-Gebühr', caption: 'Grundidee: Punktzahl × Punktwert = einfacher Gebührensatz; anschließend wird der zulässige Steigerungsfaktor berücksichtigt.' },
        { type: 'info', title: 'Aktueller Punktwert', text: 'Der gesetzliche Punktwert beträgt 5,82873 Cent. Im ursprünglichen Lernfeld stand gerundet 5,828 Cent. Für Rechnungen immer mit der jeweils geltenden GOÄ arbeiten.' },
        { type: 'heading', title: 'Wichtige Nummern aus deinem Lernfeld' },
        { type: 'table', headers: ['Nr.', 'Leistung', 'Punkte'], rows: [
          ['1', 'Beratung – auch mittels Fernsprecher', '80'],
          ['2', 'z. B. Wiederholungsrezept / bestimmte kurze Verrichtungen ohne Beratung', '60'],
          ['3', 'eingehende Beratung, mindestens 10 Minuten', '150'],
          ['5', 'symptombezogene Untersuchung', '100'],
          ['6', 'vollständige körperliche Untersuchung bestimmter Organsysteme', '160'],
          ['7', 'vollständige Untersuchung bestimmter Organsysteme', '260'],
          ['8', 'Ganzkörperstatus', '300'],
        ]},
        { type: 'heading', title: 'Steigerungsfaktoren' },
        { type: 'table', headers: ['Bereich', 'Schwellenwert', 'oberer Gebührenrahmen'], rows: [
          ['allgemeine Leistungen', '2,3-fach', 'bis 3,5-fach'],
          ['Abschnitte A, E, O', '1,8-fach', 'bis 2,5-fach'],
          ['Labor Abschnitt M / Nr. 437', '1,15-fach', 'bis 1,3-fach'],
        ]},
        { type: 'warning', title: 'Wichtig', text: 'Ein Überschreiten des jeweiligen Schwellenwerts braucht eine nachvollziehbare leistungsbezogene Begründung. „Maximaler Satz“ und „Schwellenwert“ sind nicht dasselbe.' },
        { type: 'heading', title: 'Mini-Rechenweg' },
        { type: 'text', text: 'Beispiel Nr. 1: 80 Punkte × 0,0582873 € = einfacher Gebührensatz. Dieser einfache Gebührensatz wird anschließend mit dem zulässigen Faktor multipliziert. In Prüfungen wird oft der Rechenweg wichtiger bewertet als Kopfrechnen.' },
      ],
    },
    {
      id: 'praxisfaelle',
      title: '6. Praxisfälle zum Verbinden der Themen',
      content: [
        { type: 'heading', title: 'Fall A – „Mein Herz rast“' },
        { type: 'text', text: 'Ein Patient kommt aufgeregt in die Praxis und sagt, sein Herz raste. Er ist gerade drei Stockwerke hochgelaufen. Überlege: Welche Vitalwerte würdest du erfassen? Warum sollte man nicht sofort aus einem erhöhten Puls auf eine Herzerkrankung schließen?' },
        { type: 'info', title: 'Denkweg', text: 'Situation → Ruhephase → Puls/Blutdruck korrekt messen → Beschwerden und Begleitsymptome dokumentieren → ärztlich weitergeben.' },
        { type: 'heading', title: 'Fall B – Atemnot' },
        { type: 'text', text: 'Eine Patientin beschreibt Atemnot. Nutze die Anatomie: Wo muss Sauerstoff am Ende ankommen, bevor er mit dem Blut im Körper verteilt werden kann? Welche Struktur wäre bei einer Störung des eigentlichen Gasaustauschs besonders relevant?' },
        { type: 'heading', title: 'Fall C – GOÄ' },
        { type: 'text', text: 'Bei einer Privatabrechnung sollst du erklären, warum eine Rechnung nicht nur aus „Leistung × Preis“ besteht. Formuliere mit den Begriffen GOÄ-Nummer, Punktzahl, Punktwert und Steigerungsfaktor.' },
      ],
    },
  ],
  questions: [
    { id: 1, question: 'Welche Herzhälfte pumpt Blut in den Körperkreislauf?', type: 'single', options: [{id:'a',text:'rechte Herzhälfte'},{id:'b',text:'linke Herzhälfte',correct:true},{id:'c',text:'beide nur in die Lunge'},{id:'d',text:'nur die Vorhöfe'}], explanation: 'Die linke Kammer pumpt sauerstoffreiches Blut über die Aorta in den Körper.', points: 2 },
    { id: 2, question: 'Welche Reihenfolge beschreibt den Blutweg korrekt?', type: 'single', options: [{id:'a',text:'Körper → rechtes Herz → Lunge → linkes Herz → Körper',correct:true},{id:'b',text:'Körper → linkes Herz → Lunge → rechtes Herz → Körper'},{id:'c',text:'Lunge → rechtes Herz → Körper → linkes Herz'},{id:'d',text:'Körper → Lunge → Körper ohne Herz'}], explanation: 'Der Kreislauf folgt Körper → rechtes Herz → Lunge → linkes Herz → Körper.', points: 3 },
    { id: 3, question: 'Warum ist die Lungenarterie eine Arterie, obwohl sie sauerstoffarmes Blut führt?', type: 'single', options: [{id:'a',text:'weil Arterien immer blau sind'},{id:'b',text:'weil sie Blut vom Herzen wegführt',correct:true},{id:'c',text:'weil sie zur linken Kammer führt'},{id:'d',text:'weil sie eine Klappe besitzt'}], explanation: 'Arterien werden nach der Flussrichtung definiert: vom Herzen weg.', points: 2 },
    { id: 4, question: 'Welche Aufgabe haben Herzklappen?', type: 'single', options: [{id:'a',text:'Sauerstoff produzieren'},{id:'b',text:'Rückstrom des Blutes verhindern',correct:true},{id:'c',text:'Blut filtern'},{id:'d',text:'Puls messen'}], explanation: 'Herzklappen wirken als Ventile und sichern die Flussrichtung.', points: 2 },
    { id: 5, question: 'Was misst der Puls?', type: 'single', options: [{id:'a',text:'den Sauerstoffgehalt der Luft'},{id:'b',text:'die tastbare Druckwelle bzw. Herzschlagfrequenz',correct:true},{id:'c',text:'den Blutzucker'},{id:'d',text:'nur den Blutdruck'}], explanation: 'Der Puls ist die durch Herzschläge ausgelöste Druckwelle in Arterien.', points: 2 },
    { id: 6, question: 'Welche Faktoren können den Puls erhöhen?', type: 'multiple', options: [{id:'a',text:'körperliche Anstrengung',correct:true},{id:'b',text:'Fieber',correct:true},{id:'c',text:'Aufregung',correct:true},{id:'d',text:'tiefer Schlaf'}], explanation: 'Belastung, Fieber und Stress/Aufregung können die Herzfrequenz steigern.', points: 3 },
    { id: 7, question: 'Was ist der systolische Blutdruck?', type: 'single', options: [{id:'a',text:'Druck während der Herzkontraktion',correct:true},{id:'b',text:'Druck nur in den Venen'},{id:'c',text:'niedrigster Druck beim Schlafen'},{id:'d',text:'Puls pro Minute'}], explanation: 'Systole = Kontraktion und Auswurfphase des Herzens.', points: 2 },
    { id: 8, question: 'Nenne zwei Bedingungen für eine saubere Blutdruckmessung.', type: 'text', correctAnswer: 'ruhe,herzhöhe,manschette,nicht sprechen,sitzen', explanation: 'Zum Beispiel: Ruhephase, passende Manschette, Arm auf Herzhöhe, ruhig sitzen und nicht sprechen.', points: 3 },
    { id: 9, question: 'Wo findet der eigentliche Gasaustausch statt?', type: 'single', options: [{id:'a',text:'Nasenhöhle'},{id:'b',text:'Trachea'},{id:'c',text:'Alveolen',correct:true},{id:'d',text:'Kehlkopf'}], explanation: 'An den Alveolen und den angrenzenden Kapillaren werden O₂ und CO₂ ausgetauscht.', points: 2 },
    { id: 10, question: 'Welche Aussage zum Gasaustausch ist richtig?', type: 'single', options: [{id:'a',text:'O₂ gelangt aus dem Blut in die Alveole'},{id:'b',text:'CO₂ gelangt aus der Alveole ins Blut'},{id:'c',text:'O₂ gelangt aus der Alveole ins Blut und CO₂ umgekehrt',correct:true},{id:'d',text:'Beide Gase bleiben in der Alveole'}], explanation: 'Sauerstoff geht ins Blut, Kohlendioxid aus dem Blut in die Alveole.', points: 2 },
    { id: 11, question: 'Was ist die Aufgabe des Flimmerepithels?', type: 'single', options: [{id:'a',text:'Blut pumpen'},{id:'b',text:'Schleim und Fremdpartikel Richtung Rachen transportieren',correct:true},{id:'c',text:'Sauerstoff speichern'},{id:'d',text:'Stimmbänder bewegen'}], explanation: 'Der Schleim-Flimmer-Apparat reinigt die Atemwege.', points: 2 },
    { id: 12, question: 'Bringe die Atemwege in eine sinnvolle Reihenfolge.', type: 'text', correctAnswer: 'nase,rachen,kehlkopf,trachea,bronchien,alveolen', explanation: 'Ein möglicher Weg: Nase/Mund → Rachen → Kehlkopf → Trachea → Bronchien/Bronchiolen → Alveolen.', points: 4 },
    { id: 13, question: 'Wofür steht die Abkürzung GOÄ?', type: 'single', options: [{id:'a',text:'Gesetzliche Ordnung für Ärzte'},{id:'b',text:'Gebührenordnung für Ärzte',correct:true},{id:'c',text:'Gesundheitsordnung für Ärztliche Leistungen'},{id:'d',text:'Gebührenordnung für Apotheken'}], explanation: 'GOÄ = Gebührenordnung für Ärzte.', points: 2 },
    { id: 14, question: 'Wie hoch ist der gesetzliche GOÄ-Punktwert?', type: 'single', options: [{id:'a',text:'5,82873 Cent',correct:true},{id:'b',text:'2,3 Cent'},{id:'c',text:'58,2873 Cent'},{id:'d',text:'1 Euro'}], explanation: 'Der Punktwert beträgt 5,82873 Cent.', points: 2 },
    { id: 15, question: 'Welche drei Größen braucht man grundsätzlich für die GOÄ-Gebührenberechnung?', type: 'multiple', options: [{id:'a',text:'Punktzahl',correct:true},{id:'b',text:'Punktwert',correct:true},{id:'c',text:'Steigerungsfaktor',correct:true},{id:'d',text:'Blutdruck'}], explanation: 'Punktzahl × Punktwert ergibt den einfachen Satz; der Faktor bestimmt die Steigerung.', points: 3 },
    { id: 16, question: 'Was bedeutet der Schwellenwert von 2,3 bei vielen GOÄ-Leistungen?', type: 'single', options: [{id:'a',text:'Er ist immer der absolute Höchstsatz'},{id:'b',text:'Bis dahin liegt die Regelspanne; darüber braucht es eine Begründung',correct:true},{id:'c',text:'Er gilt nur für Labor'},{id:'d',text:'Er ist die Anzahl der Punkte'}], explanation: 'Über dem Schwellenwert muss die Überschreitung nachvollziehbar begründet werden.', points: 3 },
    { id: 17, question: 'Welcher Schwellenwert gilt für Leistungen aus Abschnitt M (Labor)?', type: 'single', options: [{id:'a',text:'2,3'},{id:'b',text:'1,8'},{id:'c',text:'1,15',correct:true},{id:'d',text:'3,5'}], explanation: 'Für Abschnitt M gilt grundsätzlich der Schwellenwert 1,15; der Gebührenrahmen reicht bis 1,3.', points: 2 },
    { id: 18, question: 'Ein Patient kommt direkt nach Treppensteigen mit hohem Puls an. Was ist der beste nächste Schritt?', type: 'single', options: [{id:'a',text:'sofort Herzkrankheit diagnostizieren'},{id:'b',text:'kurz zur Ruhe kommen lassen und korrekt erneut messen',correct:true},{id:'c',text:'Messwert ignorieren'},{id:'d',text:'nur Temperatur messen'}], explanation: 'Belastung beeinflusst den Puls; korrektes Messen unter geeigneten Bedingungen ist wichtig.', points: 2 },
    { id: 19, question: 'Erkläre in einem Satz den Unterschied zwischen kleinem und großem Kreislauf.', type: 'text', correctAnswer: 'lunge,körper,rechts,links', explanation: 'Kleiner Kreislauf: rechtes Herz → Lunge → linkes Herz. Großer Kreislauf: linkes Herz → Körper → rechtes Herz.', points: 4 },
    { id: 20, question: 'Welche Aussage verbindet Herz und Lunge korrekt?', type: 'single', options: [{id:'a',text:'Die Lunge pumpt Blut in die Aorta'},{id:'b',text:'Das rechte Herz bringt O₂-armes Blut zur Lunge, das linke Herz verteilt O₂-reiches Blut im Körper',correct:true},{id:'c',text:'Nur die Vorhöfe treiben den Kreislauf an'},{id:'d',text:'Gasaustausch findet in der Aorta statt'}], explanation: 'Herz und Lunge arbeiten im Lungenkreislauf direkt zusammen.', points: 3 },
  ],
};
