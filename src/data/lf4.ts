import type { LearningModule } from '@/types';

const svg = (content: string) => `data:image/svg+xml;utf8,${encodeURIComponent(content)}`;

const anamnesisDiagram = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="420" viewBox="0 0 1000 420">
  <rect width="1000" height="420" rx="32" fill="#f8fafc"/>
  <text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700" fill="#0f172a">So läuft eine Anamnese ab</text>
  <g font-family="Arial" font-size="21" text-anchor="middle">
    <rect x="55" y="145" width="150" height="95" rx="18" fill="#ccfbf1" stroke="#0d9488" stroke-width="3"/><text x="130" y="187" fill="#0f172a">1. Begrüßen</text><text x="130" y="215" fill="#475569">Identität prüfen</text>
    <rect x="255" y="145" width="150" height="95" rx="18" fill="#e0f2fe" stroke="#38bdf8" stroke-width="3"/><text x="330" y="187" fill="#0f172a">2. Leitsymptom</text><text x="330" y="215" fill="#475569">„Was führt Sie her?“</text>
    <rect x="455" y="145" width="150" height="95" rx="18" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="530" y="187" fill="#0f172a">3. Nachfragen</text><text x="530" y="215" fill="#475569">seit wann, wo, wie?</text>
    <rect x="655" y="145" width="150" height="95" rx="18" fill="#ede9fe" stroke="#8b5cf6" stroke-width="3"/><text x="730" y="187" fill="#0f172a">4. Risiken</text><text x="730" y="215" fill="#475569">Vorerkrankungen</text>
    <rect x="830" y="145" width="120" height="95" rx="18" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="890" y="187" fill="#0f172a">5. Doku</text><text x="890" y="215" fill="#475569">kurz &amp; klar</text>
  </g>
  <g stroke="#64748b" stroke-width="4" fill="none"><path d="M205 192 H248"/><path d="M405 192 H448"/><path d="M605 192 H648"/><path d="M805 192 H823"/></g>
  <text x="500" y="330" text-anchor="middle" font-size="25" font-family="Arial" font-weight="700" fill="#0d9488">Merksatz: Erst zuhören – dann gezielt nachfragen – dann dokumentieren.</text>
</svg>`);

const examDiagram = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="500" viewBox="0 0 1000 500">
  <rect width="1000" height="500" rx="32" fill="#f8fafc"/>
  <text x="500" y="60" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700" fill="#0f172a">Die 4 Grundmethoden der Untersuchung</text>
  <g font-family="Arial" text-anchor="middle">
   <g transform="translate(70 120)"><circle cx="110" cy="80" r="65" fill="#ccfbf1" stroke="#0d9488" stroke-width="4"/><text x="110" y="72" font-size="26" font-weight="700">👁</text><text x="110" y="110" font-size="22" font-weight="700">Inspektion</text><text x="110" y="190" font-size="20">ansehen</text></g>
   <g transform="translate(290 120)"><circle cx="110" cy="80" r="65" fill="#e0f2fe" stroke="#38bdf8" stroke-width="4"/><text x="110" y="72" font-size="26" font-weight="700">✋</text><text x="110" y="110" font-size="22" font-weight="700">Palpation</text><text x="110" y="190" font-size="20">abtasten</text></g>
   <g transform="translate(510 120)"><circle cx="110" cy="80" r="65" fill="#fef3c7" stroke="#d97706" stroke-width="4"/><text x="110" y="72" font-size="26" font-weight="700">☝</text><text x="110" y="110" font-size="22" font-weight="700">Perkussion</text><text x="110" y="190" font-size="20">abklopfen</text></g>
   <g transform="translate(730 120)"><circle cx="110" cy="80" r="65" fill="#ede9fe" stroke="#8b5cf6" stroke-width="4"/><text x="110" y="72" font-size="26" font-weight="700">🩺</text><text x="110" y="110" font-size="22" font-weight="700">Auskultation</text><text x="110" y="190" font-size="20">abhören</text></g>
  </g>
  <text x="500" y="425" text-anchor="middle" font-size="25" font-family="Arial" font-weight="700" fill="#334155">sehen – fühlen – klopfen – hören</text>
</svg>`);

const jointDiagram = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="520" viewBox="0 0 1000 520">
 <rect width="1000" height="520" rx="32" fill="#f8fafc"/>
 <text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Gelenktypen – je mehr Achsen, desto mehr Bewegungen</text>
 <g font-family="Arial" text-anchor="middle" font-size="20">
  <g transform="translate(60 120)"><circle cx="90" cy="80" r="60" fill="#ccfbf1" stroke="#0d9488" stroke-width="4"/><circle cx="90" cy="80" r="24" fill="#0d9488"/><text x="90" y="175" font-weight="700">Kugelgelenk</text><text x="90" y="205">3 Achsen</text><text x="90" y="235">z. B. Hüfte</text></g>
  <g transform="translate(245 120)"><ellipse cx="90" cy="80" rx="65" ry="48" fill="#e0f2fe" stroke="#38bdf8" stroke-width="4"/><text x="90" y="175" font-weight="700">Eigelenk</text><text x="90" y="205">2 Achsen</text></g>
  <g transform="translate(430 120)"><path d="M25 95 Q90 20 155 95 Q90 155 25 95Z" fill="#fef3c7" stroke="#d97706" stroke-width="4"/><text x="90" y="175" font-weight="700">Sattelgelenk</text><text x="90" y="205">2 Achsen</text></g>
  <g transform="translate(615 120)"><rect x="35" y="35" width="110" height="90" rx="35" fill="#dcfce7" stroke="#16a34a" stroke-width="4"/><line x1="90" y1="20" x2="90" y2="140" stroke="#16a34a" stroke-width="5"/><text x="90" y="175" font-weight="700">Scharnier</text><text x="90" y="205">1 Achse</text><text x="90" y="235">z. B. Ellbogen</text></g>
  <g transform="translate(800 120)"><circle cx="90" cy="80" r="55" fill="#ede9fe" stroke="#8b5cf6" stroke-width="4"/><line x1="90" y1="15" x2="90" y2="145" stroke="#8b5cf6" stroke-width="5"/><text x="90" y="175" font-weight="700">Radgelenk</text><text x="90" y="205">Drehung</text></g>
 </g>
 <text x="500" y="440" text-anchor="middle" font-size="24" font-family="Arial" fill="#475569">Die Form des Gelenks bestimmt, welche Bewegung möglich ist.</text>
</svg>`);

const boneDiagram = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620">
 <rect width="900" height="620" rx="32" fill="#f8fafc"/>
 <text x="450" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Aufbau eines langen Röhrenknochens</text>
 <g transform="translate(350 100)"><path d="M100 20 C45 20 35 80 55 125 L75 190 L75 400 L55 465 C35 510 45 565 100 565 C155 565 165 510 145 465 L125 400 L125 190 L145 125 C165 80 155 20 100 20Z" fill="#fde68a" stroke="#b45309" stroke-width="5"/><rect x="88" y="190" width="24" height="210" rx="12" fill="#fca5a5"/><text x="230" y="65" font-size="22" font-family="Arial">Epiphyse = Knochenende</text><line x1="145" y1="70" x2="215" y2="70" stroke="#64748b" stroke-width="3"/><text x="230" y="155" font-size="22" font-family="Arial">Metaphyse = Übergang</text><line x1="135" y1="155" x2="215" y2="155" stroke="#64748b" stroke-width="3"/><text x="230" y="300" font-size="22" font-family="Arial">Diaphyse = Schaft</text><line x1="125" y1="295" x2="215" y2="295" stroke="#64748b" stroke-width="3"/><text x="230" y="390" font-size="22" font-family="Arial">Markhöhle</text><line x1="110" y1="380" x2="215" y2="380" stroke="#64748b" stroke-width="3"/><text x="230" y="505" font-size="22" font-family="Arial">Periost = Knochenhaut</text><line x1="145" y1="500" x2="215" y2="500" stroke="#64748b" stroke-width="3"/></g>
</svg>`);

const spineDiagram = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620">
 <rect width="900" height="620" rx="32" fill="#f8fafc"/><text x="450" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Wirbelsäule – 5 Abschnitte</text>
 <g font-family="Arial" font-size="24"><rect x="330" y="100" width="210" height="80" rx="18" fill="#ccfbf1"/><text x="435" y="147" text-anchor="middle">HWS: 7</text><rect x="330" y="190" width="210" height="135" rx="18" fill="#e0f2fe"/><text x="435" y="262" text-anchor="middle">BWS: 12</text><rect x="330" y="335" width="210" height="95" rx="18" fill="#fef3c7"/><text x="435" y="390" text-anchor="middle">LWS: 5</text><rect x="330" y="440" width="210" height="70" rx="18" fill="#dcfce7"/><text x="435" y="483" text-anchor="middle">Kreuzbein: 5</text><rect x="330" y="520" width="210" height="55" rx="18" fill="#ede9fe"/><text x="435" y="555" text-anchor="middle">Steißbein: 3–4</text></g>
 <text x="120" y="150" font-size="22" font-family="Arial">Lordose</text><text x="650" y="260" font-size="22" font-family="Arial">Kyphose</text><text x="120" y="390" font-size="22" font-family="Arial">Lordose</text><text x="650" y="485" font-size="22" font-family="Arial">Kyphose</text>
</svg>`);

const medicationDiagram = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="520" viewBox="0 0 1000 520"><rect width="1000" height="520" rx="32" fill="#f8fafc"/><text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">6-R-Regel: vor jeder Medikamentengabe prüfen</text><g font-family="Arial" font-size="22" text-anchor="middle"><rect x="80" y="115" width="250" height="90" rx="18" fill="#ccfbf1"/><text x="205" y="168">richtiger Patient</text><rect x="375" y="115" width="250" height="90" rx="18" fill="#e0f2fe"/><text x="500" y="168">richtiges Arzneimittel</text><rect x="670" y="115" width="250" height="90" rx="18" fill="#fef3c7"/><text x="795" y="168">richtige Dosis</text><rect x="80" y="250" width="250" height="90" rx="18" fill="#dcfce7"/><text x="205" y="303">richtige Zeit</text><rect x="375" y="250" width="250" height="90" rx="18" fill="#ede9fe"/><text x="500" y="303">richtige Applikation</text><rect x="670" y="250" width="250" height="90" rx="18" fill="#fee2e2"/><text x="795" y="303">richtige Dauer</text></g><text x="500" y="425" text-anchor="middle" font-size="24" font-family="Arial" font-weight="700" fill="#0d9488">Nicht auswendig „abarbeiten“ – aktiv vergleichen und dokumentieren.</text></svg>`);

export const lf4: LearningModule = {
  id: 'lf4',
  number: 4,
  title: 'Anamnese, Bewegungsapparat & Arzneimittel',
  subtitle: 'Von null an erklärt: Patientenbefragung, Untersuchung, Gelenke, Knochen, Wirbelsäule und sichere Medikamentengabe',
  description: 'Sehr ausführlicher Lernkurs für Auszubildende ohne Vorwissen. Jeder Abschnitt beginnt einfach, baut Fachbegriffe schrittweise auf und enthält Merksätze, Schaubilder, Videos, Praxisbeispiele und Prüfungsfragen.',
  difficulty: 'easy',
  icon: 'bone',
  heroImage: '/images/lf4-hero.jpg',
  topics: [
    {
      id: 'anamnese-basics',
      title: '1. Anamnese von Grund auf verstehen',
      content: [
        { type: 'heading', title: 'Was bedeutet Anamnese überhaupt?' },
        { type: 'text', text: 'Anamnese bedeutet: Die Krankengeschichte und die aktuellen Beschwerden eines Patienten werden systematisch erfragt. Bevor untersucht, Blut abgenommen oder eine Diagnose gestellt wird, muss zuerst verstanden werden, was das Problem ist. Eine gute Anamnese ist deshalb keine lockere Unterhaltung, sondern ein gezieltes medizinisches Gespräch.' },
        { type: 'info', title: 'Für Einsteiger', text: 'Stell dir vor, du bist Detektiv: Der Patient liefert Hinweise. Deine Aufgabe ist es, die Hinweise in eine sinnvolle Reihenfolge zu bringen. Du fragst zuerst offen, dann immer genauer.' },
        { type: 'image', src: anamnesisDiagram, alt: 'Ablauf einer Anamnese', caption: 'Eigene Lern-Grafik: vom Erstkontakt bis zur Dokumentation.' },
        { type: 'heading', title: 'Offene und geschlossene Fragen' },
        { type: 'table', headers: ['Frageart', 'Beispiel', 'Wann sinnvoll?'], rows: [
          ['Offen', '„Was führt Sie heute zu uns?“', 'Zu Beginn: Patient frei erzählen lassen'],
          ['Geschlossen', '„Ist der Schmerz stechend?“', 'Später: Details klären'],
          ['Skalenfrage', '„Wie stark ist der Schmerz von 0 bis 10?“', 'Beschwerden messbarer machen'],
        ]},
        { type: 'heading', title: 'Wichtige Anamnesearten' },
        { type: 'definition', term: 'Eigenanamnese', definition: 'Der Patient kann selbst Auskunft geben und schildert seine Beschwerden.' },
        { type: 'definition', term: 'Fremdanamnese', definition: 'Informationen kommen von Angehörigen oder Begleitpersonen, z. B. bei Bewusstlosigkeit, Demenz oder kleinen Kindern.' },
        { type: 'definition', term: 'Familienanamnese', definition: 'Frage nach Erkrankungen in der Familie, z. B. Herzinfarkt, Diabetes oder erbliche Erkrankungen.' },
        { type: 'definition', term: 'Sozialanamnese', definition: 'Lebensumstände: Beruf, Wohnen, Unterstützung, Nikotin, Alkohol, Belastungen.' },
        { type: 'definition', term: 'Medikamentenanamnese', definition: 'Welche Medikamente nimmt der Patient? In welcher Dosis? Regelmäßig oder bei Bedarf?' },
        { type: 'definition', term: 'Allergieanamnese', definition: 'Welche Allergien oder Unverträglichkeiten bestehen? Besonders wichtig vor Medikamentengabe.' },
        { type: 'heading', title: 'Ein einfaches Frageschema bei Schmerzen' },
        { type: 'list', items: [
          'Wo genau tut es weh?', 'Seit wann besteht der Schmerz?', 'Wie hat er begonnen: plötzlich oder langsam?', 'Wie fühlt er sich an: stechend, dumpf, brennend, ziehend?', 'Wie stark ist er von 0 bis 10?', 'Was macht ihn besser oder schlimmer?', 'Gibt es Begleitsymptome wie Fieber, Schwellung, Taubheit oder Übelkeit?'
        ]},
        { type: 'warning', title: 'Typischer Anfängerfehler', text: 'Nicht sofort zehn Ja/Nein-Fragen hintereinander stellen. Erst erzählen lassen, dann gezielt strukturieren.' },
      ],
    },
    {
      id: 'symptome-untersuchung',
      title: '2. Symptome & körperliche Untersuchung',
      content: [
        { type: 'heading', title: 'Subjektiv oder objektiv?' },
        { type: 'text', text: 'Subjektive Symptome kann nur der Patient selbst wahrnehmen, zum Beispiel Schmerz oder Übelkeit. Objektive Befunde können andere Personen feststellen oder messen, zum Beispiel eine Schwellung, Hautrötung oder Fieber.' },
        { type: 'table', headers: ['Aussage/Befund', 'Einordnung', 'Warum?'], rows: [
          ['„Mein Knie tut weh.“', 'subjektiv', 'Schmerz wird persönlich empfunden'],
          ['Knie ist sichtbar geschwollen', 'objektiv', 'von außen feststellbar'],
          ['Temperatur 39,0 °C', 'objektiv', 'messbarer Wert'],
          ['„Mir ist schwindelig.“', 'subjektiv', 'Patientenempfindung'],
        ]},
        { type: 'image', src: examDiagram, alt: 'Vier Untersuchungsmethoden', caption: 'Merke die Reihenfolge als: sehen – fühlen – klopfen – hören.' },
        { type: 'definition', term: 'Inspektion', definition: 'Ansehen. Man achtet z. B. auf Hautfarbe, Haltung, Schwellung, Wunden oder Asymmetrie.' },
        { type: 'definition', term: 'Palpation', definition: 'Abtasten. Man prüft z. B. Druckschmerz, Temperatur, Puls, Schwellung oder Verhärtung.' },
        { type: 'definition', term: 'Perkussion', definition: 'Abklopfen. Der entstehende Schall gibt Hinweise darauf, was sich unter der Oberfläche befindet.' },
        { type: 'definition', term: 'Auskultation', definition: 'Abhören, meist mit dem Stethoskop. Typisch bei Herz, Lunge und Darm.' },
        { type: 'video', title: 'Praxisvideo: Klinische Untersuchung der Lunge', url: 'https://www.youtube.com/watch?v=aJezmHSMLog', embedUrl: 'https://www.youtube-nocookie.com/embed/aJezmHSMLog', source: 'AMBOSS', caption: 'Beobachte besonders Inspektion, Perkussion und Auskultation. Du musst noch nicht alle Lungenbefunde verstehen.' },
        { type: 'info', title: 'Video-Aufgabe', text: 'Notiere beim Anschauen drei Dinge: 1) Was wird nur angesehen? 2) Wo wird geklopft? 3) Wann kommt das Stethoskop zum Einsatz?' },
      ],
    },
    {
      id: 'gelenke-arthrose',
      title: '3. Gelenke, Bewegungsapparat & Arthrose',
      content: [
        { type: 'heading', title: 'Warum haben wir Gelenke?' },
        { type: 'text', text: 'Knochen sind stabil, aber allein kaum beweglich. Gelenke verbinden Knochen so miteinander, dass kontrollierte Bewegung möglich wird. Welche Bewegungen ein Gelenk kann, hängt vor allem von seiner Form ab.' },
        { type: 'image', src: jointDiagram, alt: 'Gelenktypen', caption: 'Eigene Übersicht: Gelenkform, Achsen und typische Beispiele.' },
        { type: 'table', headers: ['Gelenktyp', 'Achsen', 'Typische Bewegung', 'Beispiel'], rows: [
          ['Kugelgelenk', '3', 'Beugen, Strecken, Abspreizen, Heranführen, Drehen', 'Hüfte, Schulter'],
          ['Eigelenk', '2', 'Beugen/Strecken und Seitbewegung', 'Handgelenk'],
          ['Sattelgelenk', '2', 'Beugen/Strecken und Seitbewegung', 'Daumensattelgelenk'],
          ['Scharniergelenk', '1', 'Beugen und Strecken', 'Ellbogen'],
          ['Rad-/Drehgelenk', 'v. a. Rotation', 'Drehbewegung', 'Unterarm'],
        ]},
        { type: 'heading', title: 'Aktiver und passiver Bewegungsapparat' },
        { type: 'text', text: 'Der aktive Bewegungsapparat erzeugt Bewegung: dazu gehören vor allem die Skelettmuskeln. Der passive Bewegungsapparat bildet das Gerüst und führt die Bewegung: Knochen, Gelenke, Knorpel und Bänder.' },
        { type: 'info', title: 'Bild im Kopf', text: 'Muskel = Motor. Knochen und Gelenke = Hebel und Gelenkmechanik. Ohne Motor keine aktive Bewegung, ohne Gerüst kann der Motor nichts sinnvoll bewegen.' },
        { type: 'heading', title: 'Arthrose – was passiert im Gelenk?' },
        { type: 'text', text: 'Arthrose ist eine degenerative Gelenkerkrankung. Vereinfacht gesagt wird der Gelenkknorpel geschädigt. Der Knorpel sorgt normalerweise dafür, dass Gelenkflächen glatt gegeneinander gleiten und Belastungen abgefedert werden. Wird er dünner und unregelmäßiger, nimmt die Reibung zu und das Gelenk kann schmerzen und steifer werden.' },
        { type: 'definition', term: 'Gonarthrose', definition: 'Arthrose des Kniegelenks.' },
        { type: 'definition', term: 'Coxarthrose', definition: 'Arthrose des Hüftgelenks.' },
        { type: 'table', headers: ['Stadium im Lernfeld', 'Vereinfachte Beschreibung'], rows: [
          ['I', 'leichte Gelenkspaltverschmälerung, oft wenig Beschwerden'],
          ['II', 'deutlichere Verschmälerung, beginnende knöcherne Veränderungen'],
          ['III', 'Gelenkspalt stark reduziert/aufgehoben, deutliche Veränderungen und Beschwerden'],
        ]},
        { type: 'video', title: 'Arthrose verständlich erklärt', url: 'https://www.youtube.com/watch?v=l04DGtWKStY', embedUrl: 'https://www.youtube-nocookie.com/embed/l04DGtWKStY', source: 'Lernvideo', caption: 'Nutze das Video für Grundverständnis: Knorpel, Schmerzen, Verlauf und Diagnostik. Die konkrete Stadieneinteilung lernst du aus dem Text oben.' },
      ],
    },
    {
      id: 'knochen-frakturen',
      title: '4. Knochenaufbau & Frakturen – sehr ausführlich',
      content: [
        { type: 'heading', title: 'Ein Knochen ist lebendes Gewebe' },
        { type: 'text', text: 'Knochen wirken hart und „tot“, sind aber lebendes, gut durchblutetes Gewebe. Sie werden ständig umgebaut, können wachsen und nach einem Bruch heilen. Außerdem speichern sie Mineralstoffe und schützen Organe.' },
        { type: 'image', src: boneDiagram, alt: 'Aufbau eines Röhrenknochens', caption: 'Eigene Lern-Grafik: Epiphyse, Metaphyse, Diaphyse, Markhöhle und Periost.' },
        { type: 'definition', term: 'Epiphyse', definition: 'Knochenende. Hier liegt viel Spongiosa; bei gelenkbildenden Knochen liegt außen Gelenkknorpel.' },
        { type: 'definition', term: 'Metaphyse', definition: 'Übergangszone zwischen Knochenende und Knochenschaft; bei wachsenden Menschen wichtig für das Längenwachstum.' },
        { type: 'definition', term: 'Diaphyse', definition: 'Schaft eines langen Röhrenknochens; besonders stabil durch die kompakte Knochenschicht.' },
        { type: 'definition', term: 'Periost', definition: 'Knochenhaut. Sie ist schmerzempfindlich, enthält Gefäße und Nerven und ist wichtig für Versorgung und Heilung.' },
        { type: 'definition', term: 'Spongiosa', definition: 'Schwammartig aufgebautes Knochengewebe mit Knochenbälkchen. Stabil bei relativ geringem Gewicht.' },
        { type: 'definition', term: 'Kompakta', definition: 'Dichte Außenschicht des Knochens, die hohe Stabilität gibt.' },
        { type: 'heading', title: 'Fraktur = Knochenbruch' },
        { type: 'table', headers: ['Frakturform', 'Einfach erklärt'], rows: [
          ['geschlossene Fraktur', 'Knochen gebrochen, Haut darüber geschlossen'],
          ['offene Fraktur', 'Verbindung zwischen Bruch und Außenwelt; hohes Infektionsrisiko'],
          ['Grünholzfraktur', 'unvollständiger Bruch bei Kindern; Knochen biegt/birst teilweise'],
          ['Trümmerfraktur', 'Knochen in mehrere Fragmente zerbrochen'],
        ]},
        { type: 'heading', title: 'Sichere und unsichere Frakturzeichen' },
        { type: 'warning', title: 'Sichere Frakturzeichen', text: 'Fehlstellung, abnorme Beweglichkeit, sichtbare Knochenfragmente bei offener Fraktur und Knochenreiben/Krepitation. Nicht absichtlich provozieren!' },
        { type: 'info', title: 'Unsichere Frakturzeichen', text: 'Schmerz, Schwellung, Hämatom und Funktionsverlust passen zu einer Fraktur, können aber auch bei anderen Verletzungen auftreten.' },
        { type: 'heading', title: 'Erste Hilfe bei vermuteter Fraktur' },
        { type: 'list', items: ['Betroffenen beruhigen und Bewegung vermeiden', 'verletzten Körperteil möglichst in vorgefundener Position ruhigstellen', 'bei offener Fraktur Wunde steril abdecken', 'Durchblutung, Motorik und Sensibilität beobachten', 'bei schwerer Verletzung Notruf bzw. ärztliche Versorgung veranlassen'] },
        { type: 'video', title: 'Zusatzvideo: Knochen und Frakturen suchen/vertiefen', url: 'https://www.youtube.com/results?search_query=Knochen+Aufbau+Fraktur+Anatomie+deutsch', source: 'YouTube-Lernsuche', caption: 'Nutze ein kurzes Anatomie-Lernvideo als Wiederholung. Vergleiche die genannten Begriffe mit der Grafik oben.' },
      ],
    },
    {
      id: 'anatomie-wirbelsaeule',
      title: '5. Anatomische Richtungsbegriffe & Wirbelsäule',
      content: [
        { type: 'heading', title: 'Warum Richtungsbegriffe?' },
        { type: 'text', text: 'In der Medizin reicht „da hinten links“ nicht. Anatomische Richtungsbegriffe beschreiben eindeutig, wo etwas liegt. Sie funktionieren unabhängig davon, wie der Patient gerade steht oder sitzt.' },
        { type: 'table', headers: ['Begriff', 'Bedeutung', 'Eselsbrücke'], rows: [
          ['proximal', 'zum Körperstamm hin', 'proximity = Nähe'], ['distal', 'vom Körperstamm weg', 'Distanz = weiter weg'], ['medial', 'zur Körpermitte', 'Medianlinie'], ['lateral', 'zur Seite', 'lateral = seitlich'], ['ventral', 'bauchwärts/vorne', 'Venter = Bauch'], ['dorsal', 'rückenwärts/hinten', 'Dorsum = Rücken'], ['radial', 'zur Speiche/Daumenseite', 'Radius'], ['ulnar', 'zur Elle/Kleinfingerseite', 'Ulna'],
        ]},
        { type: 'image', src: spineDiagram, alt: 'Abschnitte der Wirbelsäule', caption: 'Eigene Lern-Grafik: Abschnitte und typische Krümmungen.' },
        { type: 'heading', title: 'Aufgaben der Wirbelsäule' },
        { type: 'list', items: ['trägt und stabilisiert den Körper', 'ermöglicht Beweglichkeit des Rumpfes', 'federt Belastungen ab', 'schützt Rückenmark und Nervenstrukturen', 'dient Muskeln und Bändern als Ansatz'] },
        { type: 'table', headers: ['Abschnitt', 'Wirbelzahl', 'Krümmung'], rows: [
          ['HWS', '7', 'Lordose'], ['BWS', '12', 'Kyphose'], ['LWS', '5', 'Lordose'], ['Kreuzbein', '5 verwachsene Wirbel', 'Kyphose'], ['Steißbein', 'meist 3–4 Wirbel', 'Fortsetzung der unteren Krümmung'],
        ]},
        { type: 'info', title: 'Lordose vs. Kyphose', text: 'Lordose = nach vorne gerichtete Krümmung, Kyphose = nach hinten gerichtete Krümmung. Zusammen entsteht die typische Doppel-S-Form.' },
        { type: 'video', title: 'Wie funktioniert die Wirbelsäule?', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/koerper-wissen/wie-funktioniert-die-wirbelsaeule', embedUrl: 'https://www.youtube-nocookie.com/embed/E10UbX7Y2sE', duration: '1:55', source: 'Stiftung Gesundheitswissen', caption: 'Sehr gut für Anfänger: Abschnitte, Doppel-S-Form, Bandscheiben und Schutz des Rückenmarks.' },
        { type: 'info', title: 'Video-Aufgabe', text: 'Beantworte danach ohne Nachschauen: Warum ist die Wirbelsäule nicht einfach gerade? Welche Funktion haben Bandscheiben? Was verläuft im Wirbelkanal?' },
      ],
    },
    {
      id: 'arzneimittel-basics',
      title: '6. Arzneimittel – Grundlagen ohne Vorwissen',
      content: [
        { type: 'heading', title: 'Was ist ein Arzneimittel?' },
        { type: 'text', text: 'Arzneimittel werden eingesetzt, um Krankheiten vorzubeugen, zu erkennen, Beschwerden zu behandeln oder fehlende körpereigene Stoffe zu ersetzen. Für die MFA ist nicht nur der Name wichtig: entscheidend sind Wirkung, Dosis, Applikationsweg, Zeitpunkt, mögliche Nebenwirkungen und sichere Dokumentation.' },
        { type: 'heading', title: 'Vier Funktionen aus deinem Lernfeld' },
        { type: 'table', headers: ['Funktion', 'Bedeutung', 'Beispiel'], rows: [
          ['Prophylaxe', 'Krankheit verhindern', 'Impfstoff'], ['Therapie', 'Krankheit/Beschwerden behandeln', 'Antibiotikum bei bakterieller Infektion'], ['Diagnostik', 'Untersuchung ermöglichen/verbessern', 'Kontrastmittel'], ['Substitution', 'fehlenden Stoff ersetzen', 'Insulin'],
        ]},
        { type: 'heading', title: 'Wichtige Arzneimittelgruppen' },
        { type: 'definition', term: 'Analgetika', definition: 'Schmerzmittel.' },
        { type: 'definition', term: 'Antipyretika', definition: 'Fiebersenkende Medikamente.' },
        { type: 'definition', term: 'Antiphlogistika', definition: 'Entzündungshemmende Medikamente.' },
        { type: 'definition', term: 'Antibiotika', definition: 'Arzneimittel gegen bakterielle Infektionen. Sie wirken nicht gegen gewöhnliche Virusinfektionen.' },
        { type: 'image', src: medicationDiagram, alt: 'Sechs-R-Regel der Medikamentengabe', caption: 'Eigene Lern-Grafik: die sechs Prüfungen vor einer Medikamentengabe.' },
        { type: 'heading', title: 'Applikationswege' },
        { type: 'table', headers: ['Abkürzung', 'Bedeutung', 'Beispiel'], rows: [
          ['p.o./oral', 'durch den Mund', 'Tablette'], ['s.c.', 'subkutan = unter die Haut', 'z. B. Insulin'], ['i.m.', 'intramuskulär = in den Muskel', 'viele Impfungen'], ['i.v.', 'intravenös = in die Vene', 'Medikament direkt in Blutbahn'], ['rektal', 'über den Enddarm', 'Zäpfchen'], ['nasal', 'über die Nase', 'Nasenspray'],
        ]},
        { type: 'warning', title: 'Sicherheit', text: 'Die Applikationsart darf nicht eigenmächtig verändert werden. Eine Tablette, die oral verordnet ist, ist nicht automatisch für andere Wege geeignet.' },
        { type: 'video', title: 'Praxisvideo: intramuskuläre Impfinjektion', url: 'https://www.impfakademie.de/impfmanagement/videos/impfung-injizieren/', source: 'Impfakademie', caption: 'Beobachte Vorbereitung, Einstichstelle, Hygiene und sichere Durchführung. Das Video zeigt die i.m.-Technik.' },
      ],
    },
    {
      id: 'injektionen-sicherheit',
      title: '7. Injektionen & Medikamentensicherheit',
      content: [
        { type: 'heading', title: 'Was bedeutet Injektion?' },
        { type: 'text', text: 'Bei einer Injektion wird ein Arzneimittel mit Kanüle und Spritze in Gewebe oder ein Gefäß eingebracht. Je nach Ziel wird ein anderer Applikationsweg gewählt. Für Auszubildende ist zuerst wichtig, die Wege sicher zu unterscheiden und die hygienischen sowie organisatorischen Grundregeln zu verstehen.' },
        { type: 'table', headers: ['Weg', 'Wohin?', 'Typischer Punkt'], rows: [
          ['s.c.', 'Unterhautfettgewebe', 'relativ langsame Aufnahme'], ['i.m.', 'Muskel', 'größere Durchblutung als subkutan'], ['i.v.', 'Vene', 'direkt in Blutbahn, schnelle Wirkung'],
        ]},
        { type: 'heading', title: 'Vorbereitung – immer systematisch' },
        { type: 'list', items: ['ärztliche Anordnung/Verordnung prüfen', 'Patient eindeutig identifizieren', 'Allergien und Kontraindikationen beachten', 'Arzneimittel, Dosis, Verfallsdatum und Unversehrtheit prüfen', 'Händehygiene und Material vorbereiten', 'Patient informieren', 'richtige Applikationsstelle wählen', 'nach Durchführung entsorgen und dokumentieren'] },
        { type: 'info', title: 'Maximalvolumen aus deinem Lernfeld', text: 'Im bisherigen Lernfeld-Datensatz ist für i.m.-Injektionen ein Maximalvolumen von 5 mL angegeben. In der Praxis hängt das verträgliche Volumen zusätzlich von Muskel, Patient, Arzneimittel und Fachinformation ab.' },
        { type: 'video', title: 'Subkutane Injektion – Einführung', url: 'https://seimeister.de/subkutane-injektion-einfuhrung-pflege-kanal_92f526fa1.html', source: 'Pflege Kanal', caption: 'Einsteigerfreundliche Einführung. Konzentriere dich zunächst darauf, was „subkutan“ bedeutet und welche Materialien vorbereitet werden.' },
        { type: 'heading', title: 'Mini-Fall' },
        { type: 'text', text: 'Eine Patientin soll ein Medikament s.c. erhalten. Auf dem vorbereiteten Tablett liegt jedoch ein Präparat mit anderem Namen als in der Anordnung. Was tust du? → Nicht verabreichen. Vorgang stoppen, Anordnung und Präparat erneut prüfen und Unklarheit klären. Genau dafür ist die 6-R-Regel da.' },
        { type: 'warning', title: 'Prüfungsrelevant', text: 'Bei Medikationsfehlern zählt Sicherheit vor Tempo. Im Zweifel stoppen und klären, statt „wird schon stimmen“.' },
      ],
    },
  ],
  questions: [
    { id: 1, question: 'Was ist eine Anamnese?', type: 'single', options: [{ id: 'a', text: 'Eine Röntgenaufnahme' }, { id: 'b', text: 'Die systematische Erhebung der Krankengeschichte', correct: true }, { id: 'c', text: 'Nur die Medikamentenliste' }, { id: 'd', text: 'Eine Blutuntersuchung' }], explanation: 'Anamnese bedeutet systematische Erhebung von Beschwerden, Vorgeschichte und relevanten Patientendaten.', points: 2 },
    { id: 2, question: 'Ein Angehöriger berichtet für einen bewusstlosen Patienten. Welche Anamneseart?', type: 'single', options: [{ id: 'a', text: 'Eigenanamnese' }, { id: 'b', text: 'Fremdanamnese', correct: true }, { id: 'c', text: 'Sozialanamnese' }, { id: 'd', text: 'Familienanamnese' }], explanation: 'Informationen kommen von einer anderen Person: Fremdanamnese.', points: 2 },
    { id: 3, question: 'Welche Frage ist eine offene Frage?', type: 'single', options: [{ id: 'a', text: 'Haben Sie Fieber?' }, { id: 'b', text: 'Ist der Schmerz stechend?' }, { id: 'c', text: 'Was führt Sie heute zu uns?', correct: true }, { id: 'd', text: 'Seit drei Tagen?' }], explanation: 'Offene Fragen geben Raum für eine freie Antwort.', points: 2 },
    { id: 4, question: '„Mein Knie tut weh“ ist ...', type: 'single', options: [{ id: 'a', text: 'ein objektiver Befund' }, { id: 'b', text: 'ein subjektives Symptom', correct: true }, { id: 'c', text: 'eine Diagnose' }, { id: 'd', text: 'eine Laboruntersuchung' }], explanation: 'Schmerz ist eine persönliche Empfindung und damit subjektiv.', points: 2 },
    { id: 5, question: 'Welche Methode bedeutet Abtasten?', type: 'single', options: [{ id: 'a', text: 'Inspektion' }, { id: 'b', text: 'Palpation', correct: true }, { id: 'c', text: 'Perkussion' }, { id: 'd', text: 'Auskultation' }], explanation: 'Palpation = Abtasten mit den Händen.', points: 2 },
    { id: 6, question: 'Welche Methode nutzt typischerweise ein Stethoskop?', type: 'single', options: [{ id: 'a', text: 'Auskultation', correct: true }, { id: 'b', text: 'Perkussion' }, { id: 'c', text: 'Inspektion' }, { id: 'd', text: 'Palpation' }], explanation: 'Auskultation bedeutet Abhören.', points: 2 },
    { id: 7, question: 'Welcher Gelenktyp hat drei Bewegungsachsen?', type: 'single', options: [{ id: 'a', text: 'Scharniergelenk' }, { id: 'b', text: 'Kugelgelenk', correct: true }, { id: 'c', text: 'Sattelgelenk' }, { id: 'd', text: 'Radgelenk' }], explanation: 'Das Kugelgelenk erlaubt Bewegungen um drei Achsen.', points: 2 },
    { id: 8, question: 'Was gehört zum aktiven Bewegungsapparat?', type: 'single', options: [{ id: 'a', text: 'Skelettmuskeln', correct: true }, { id: 'b', text: 'Gelenkknorpel' }, { id: 'c', text: 'Bänder' }, { id: 'd', text: 'Knochen' }], explanation: 'Muskeln erzeugen aktiv Bewegung durch Kontraktion.', points: 2 },
    { id: 9, question: 'Wie heißt eine Arthrose des Kniegelenks?', type: 'single', options: [{ id: 'a', text: 'Coxarthrose' }, { id: 'b', text: 'Gonarthrose', correct: true }, { id: 'c', text: 'Skoliose' }, { id: 'd', text: 'Kyphose' }], explanation: 'Gon = Knie. Gonarthrose = Kniearthrose.', points: 2 },
    { id: 10, question: 'Welche Struktur wird bei Arthrose vor allem geschädigt?', type: 'single', options: [{ id: 'a', text: 'Gelenkknorpel', correct: true }, { id: 'b', text: 'Haut' }, { id: 'c', text: 'Lunge' }, { id: 'd', text: 'Hornhaut' }], explanation: 'Arthrose betrifft insbesondere den Gelenkknorpel und später weitere Gelenkstrukturen.', points: 2 },
    { id: 11, question: 'Wie heißt der Schaft eines langen Röhrenknochens?', type: 'single', options: [{ id: 'a', text: 'Epiphyse' }, { id: 'b', text: 'Diaphyse', correct: true }, { id: 'c', text: 'Periost' }, { id: 'd', text: 'Metaphyse' }], explanation: 'Diaphyse = Knochenschaft.', points: 2 },
    { id: 12, question: 'Was ist das Periost?', type: 'single', options: [{ id: 'a', text: 'Knochenhaut', correct: true }, { id: 'b', text: 'Gelenkflüssigkeit' }, { id: 'c', text: 'Muskel' }, { id: 'd', text: 'Band' }], explanation: 'Periost = Knochenhaut, reich an Nerven und Gefäßen.', points: 2 },
    { id: 13, question: 'Welche Aussage beschreibt eine offene Fraktur?', type: 'single', options: [{ id: 'a', text: 'Die Haut ist sicher geschlossen' }, { id: 'b', text: 'Es besteht eine Verbindung des Bruchs zur Außenwelt', correct: true }, { id: 'c', text: 'Sie kommt nur bei Kindern vor' }, { id: 'd', text: 'Es gibt keinen Knochenbruch' }], explanation: 'Bei der offenen Fraktur besteht eine offene Verletzung mit erhöhtem Infektionsrisiko.', points: 2 },
    { id: 14, question: 'Welches ist ein sicheres Frakturzeichen?', type: 'single', options: [{ id: 'a', text: 'leichte Müdigkeit' }, { id: 'b', text: 'abnorme Beweglichkeit', correct: true }, { id: 'c', text: 'Schnupfen' }, { id: 'd', text: 'Übelkeit' }], explanation: 'Abnorme Beweglichkeit gehört zu den sicheren Frakturzeichen.', points: 2 },
    { id: 15, question: 'Was bedeutet proximal?', type: 'single', options: [{ id: 'a', text: 'vom Körperstamm weg' }, { id: 'b', text: 'zum Körperstamm hin', correct: true }, { id: 'c', text: 'zur Seite' }, { id: 'd', text: 'zum Rücken' }], explanation: 'Proximal = näher zum Körperstamm.', points: 2 },
    { id: 16, question: 'Wie viele Wirbel hat die Halswirbelsäule?', type: 'single', options: [{ id: 'a', text: '5' }, { id: 'b', text: '7', correct: true }, { id: 'c', text: '12' }, { id: 'd', text: '18' }], explanation: 'Die HWS besteht aus 7 Halswirbeln.', points: 2 },
    { id: 17, question: 'Welche Krümmung besitzt die Brustwirbelsäule?', type: 'single', options: [{ id: 'a', text: 'Kyphose', correct: true }, { id: 'b', text: 'Lordose' }, { id: 'c', text: 'keine Krümmung' }, { id: 'd', text: 'Radialstellung' }], explanation: 'Die BWS ist physiologisch kyphotisch gekrümmt.', points: 2 },
    { id: 18, question: 'Welche Arzneimittelfunktion passt zu einer Impfung?', type: 'single', options: [{ id: 'a', text: 'Prophylaxe', correct: true }, { id: 'b', text: 'Substitution' }, { id: 'c', text: 'Diagnostik' }, { id: 'd', text: 'Palpation' }], explanation: 'Impfungen dienen der Vorbeugung, also Prophylaxe.', points: 2 },
    { id: 19, question: 'Was bedeutet s.c.?', type: 'single', options: [{ id: 'a', text: 'intravenös' }, { id: 'b', text: 'subkutan', correct: true }, { id: 'c', text: 'intramuskulär' }, { id: 'd', text: 'oral' }], explanation: 's.c. = subkutan = unter die Haut.', points: 2 },
    { id: 20, question: 'Was bedeutet i.m.?', type: 'single', options: [{ id: 'a', text: 'in den Muskel', correct: true }, { id: 'b', text: 'unter die Haut' }, { id: 'c', text: 'in den Mund' }, { id: 'd', text: 'in den Darm' }], explanation: 'i.m. = intramuskulär.', points: 2 },
    { id: 21, question: 'Welche Punkte gehören zur 6-R-Regel?', type: 'multiple', options: [{ id: 'a', text: 'richtiger Patient', correct: true }, { id: 'b', text: 'richtiges Arzneimittel', correct: true }, { id: 'c', text: 'richtige Dosis', correct: true }, { id: 'd', text: 'beliebige Applikationsart' }, { id: 'e', text: 'richtige Zeit', correct: true }], explanation: 'Patient, Arzneimittel, Dosis, Zeit, Applikationsart und Dauer müssen stimmen.', points: 4 },
    { id: 22, question: 'Was sind Analgetika?', type: 'single', options: [{ id: 'a', text: 'Schmerzmittel', correct: true }, { id: 'b', text: 'nur Impfstoffe' }, { id: 'c', text: 'Kontrastmittel' }, { id: 'd', text: 'Verbände' }], explanation: 'Analgetika lindern Schmerzen.', points: 2 },
    { id: 23, question: 'Du bemerkst vor der Gabe einen anderen Medikamentennamen als in der Anordnung. Was ist richtig?', type: 'single', options: [{ id: 'a', text: 'trotzdem verabreichen' }, { id: 'b', text: 'stoppen, prüfen und Unklarheit klären', correct: true }, { id: 'c', text: 'Patient entscheiden lassen' }, { id: 'd', text: 'Etikett entfernen' }], explanation: 'Bei Unklarheiten wird nicht verabreicht. Sicherheit hat Vorrang.', points: 3 },
    { id: 24, question: 'Erkläre in einem Satz den Unterschied zwischen aktivem und passivem Bewegungsapparat.', type: 'text', correctAnswer: 'muskeln,aktiv,passiv,knochen,gelenke', explanation: 'Aktiv erzeugen Muskeln Bewegung; passive Strukturen wie Knochen, Gelenke, Knorpel und Bänder bilden und führen das Gerüst.', points: 4 },
  ],
};
