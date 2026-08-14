import type { LearningModule, LearningTopic, QuizQuestion, TopicContent } from '@/types';
import { compareVisual, processVisual } from './visualKit';

const svg = (content: string) => `data:image/svg+xml;utf8,${encodeURIComponent(content)}`;

const arthrosisVisual = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="650" viewBox="0 0 1200 650"><rect width="1200" height="650" rx="36" fill="#f8fafc"/><text x="600" y="58" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#0f172a">Arthrose: vom gesunden Gelenk bis Stadium III</text><g font-family="Arial" text-anchor="middle"><g transform="translate(45 125)"><rect width="250" height="390" rx="28" fill="#ecfdf5" stroke="#16a34a" stroke-width="4"/><text x="125" y="48" font-size="24" font-weight="700" fill="#15803d">Gesund</text><path d="M50 105Q125 70 200 105" stroke="#64748b" stroke-width="28" fill="none"/><path d="M50 178Q125 213 200 178" stroke="#64748b" stroke-width="28" fill="none"/><path d="M55 120Q125 90 195 120" stroke="#38bdf8" stroke-width="12" fill="none"/><path d="M55 163Q125 193 195 163" stroke="#38bdf8" stroke-width="12" fill="none"/><text x="125" y="260" font-size="18" fill="#334155">glatte Knorpelflächen</text><text x="125" y="295" font-size="18" fill="#334155">freie Bewegung</text></g><g transform="translate(330 125)"><rect width="250" height="390" rx="28" fill="#fffbeb" stroke="#d97706" stroke-width="4"/><text x="125" y="48" font-size="24" font-weight="700" fill="#b45309">Stadium I</text><path d="M50 105Q125 70 200 105" stroke="#64748b" stroke-width="28" fill="none"/><path d="M50 178Q125 213 200 178" stroke="#64748b" stroke-width="28" fill="none"/><path d="M55 120Q95 104 125 112Q165 95 195 120" stroke="#38bdf8" stroke-width="8" fill="none"/><path d="M55 163Q90 180 125 170Q160 188 195 163" stroke="#38bdf8" stroke-width="8" fill="none"/><text x="125" y="250" font-size="18" fill="#334155">Knorpel verliert</text><text x="125" y="278" font-size="18" fill="#334155">Elastizität</text><text x="125" y="315" font-size="18" fill="#334155">Steifigkeit · Schmerz</text></g><g transform="translate(615 125)"><rect width="250" height="390" rx="28" fill="#fff7ed" stroke="#f97316" stroke-width="4"/><text x="125" y="48" font-size="24" font-weight="700" fill="#c2410c">Stadium II</text><path d="M50 105Q125 70 200 105" stroke="#64748b" stroke-width="28" fill="none"/><path d="M50 178Q125 213 200 178" stroke="#64748b" stroke-width="28" fill="none"/><path d="M55 120L90 112L115 122L145 105L195 120" stroke="#38bdf8" stroke-width="6" fill="none"/><path d="M55 163L90 174L120 162L150 184L195 163" stroke="#38bdf8" stroke-width="6" fill="none"/><circle cx="205" cy="110" r="13" fill="#f97316"/><circle cx="45" cy="175" r="13" fill="#f97316"/><text x="125" y="250" font-size="18" fill="#334155">Knorpelabbau</text><text x="125" y="278" font-size="18" fill="#334155">Randwülste</text><text x="125" y="315" font-size="18" fill="#334155">Reiben · Einschränkung</text></g><g transform="translate(900 125)"><rect width="250" height="390" rx="28" fill="#fef2f2" stroke="#dc2626" stroke-width="4"/><text x="125" y="48" font-size="24" font-weight="700" fill="#b91c1c">Stadium III</text><path d="M50 105Q125 70 200 105" stroke="#64748b" stroke-width="28" fill="none"/><path d="M50 178Q125 213 200 178" stroke="#64748b" stroke-width="28" fill="none"/><path d="M72 118L96 108M142 112L178 120M65 164L100 175M150 178L184 163" stroke="#38bdf8" stroke-width="5"/><circle cx="125" cy="142" r="12" fill="#ef4444"/><circle cx="155" cy="148" r="8" fill="#ef4444"/><text x="125" y="250" font-size="18" fill="#334155">Knorpelfragmente</text><text x="125" y="278" font-size="18" fill="#334155">Blockierung möglich</text><text x="125" y="315" font-size="18" fill="#334155">Ruhe- und Bewegungsschmerz</text></g></g><text x="600" y="585" text-anchor="middle" font-family="Arial" font-size="22" font-weight="700" fill="#475569">Die Stadieneinteilung entspricht der Lernunterlage und dient hier als Prüfungsmodell.</text></svg>`);

const fractureVisual = compareVisual('Frakturarten aus der Lernunterlage', [
  { title: 'Geschlossen', lines: ['Haut bleibt intakt', 'Knochenbruch ohne offene Wunde', 'Infektionsrisiko geringer'] },
  { title: 'Offen', lines: ['Haut/Weichteile verletzt', 'Verbindung nach außen möglich', 'hohes Infektionsrisiko'] },
  { title: 'Grünholz', lines: ['typisch im Kindesalter', 'Knochen nur teilweise gebrochen', 'Periost bleibt teilweise erhalten'] },
  { title: 'Trümmer', lines: ['mehrere Fragmente', 'Unterlage: ab 6 Bruchstücken', 'komplexe Frakturform'] },
]);

const injectionVisual = processVisual('Injektion: sicherer Ablauf', [
  { title: 'Vorbereiten', text: 'Anordnung prüfen, Material bereitstellen, Händehygiene, Medikament kontrollieren.' },
  { title: 'Desinfizieren', text: 'Punktionsstelle wählen, Hautantiseptik nach Produkt und Praxisstandard durchführen.' },
  { title: 'Injizieren', text: 'Geeignete Technik für i.m., s.c. oder i.v. anwenden und Medikament langsam geben.' },
  { title: 'Entsorgen', text: 'Kanüle sofort sicher in den stichfesten Abwurf geben; Material hygienisch entsorgen.' },
  { title: 'Beobachten', text: 'Befinden prüfen, Reaktionen beachten und Gabe vollständig dokumentieren.' },
], 'Patient · Arzneimittel · Dosis · Applikation · Zeitpunkt · Dokumentation prüfen');

const bloodDrawVisual = processVisual('Blutentnahme: von Vorbereitung bis Versand', [
  { title: 'Vorbereiten', text: 'Patient, Auftrag, Röhrchen, Etiketten, Material und besondere Präanalytik prüfen.' },
  { title: 'Entnehmen', text: 'Hygienisch punktieren und Röhrchen in der vorgesehenen Reihenfolge füllen.' },
  { title: 'Mischen', text: 'Antikoagulanz-Röhrchen vorsichtig kippen; Serum entsprechend gerinnen lassen.' },
  { title: 'Zuordnen', text: 'Röhrchen eindeutig beschriften und mit Anforderung/Überweisung abgleichen.' },
  { title: 'Transport', text: 'Lagerungs- und Transportbedingungen des Labors einhalten und sicher versenden.' },
]);

const diagnosticVisual = compareVisual('Bildgebende und endoskopische Diagnostik', [
  { title: 'Sonografie', lines: ['Ultraschallwellen', 'keine ionisierende Strahlung', 'Echtzeitdarstellung'] },
  { title: 'Röntgen / CT', lines: ['Röntgenstrahlung', 'Knochen gut sichtbar', 'CT erzeugt Schnittbilder'] },
  { title: 'MRT', lines: ['starkes Magnetfeld', 'keine Röntgenstrahlung', 'Weichteile gut darstellbar'] },
  { title: 'Endoskopie', lines: ['Kamera/Licht am Endoskop', 'Einblick in Hohlorgane', 'flexibel oder starr'] },
]);

const lowerLimbVisual = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720"><rect width="1200" height="720" rx="36" fill="#f8fafc"/><text x="600" y="56" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#0f172a">Untere Extremität und Knie</text><g transform="translate(130 95)" stroke="#334155" stroke-width="15" fill="none" stroke-linecap="round"><path d="M210 20L210 250"/><circle cx="210" cy="280" r="26" fill="#fde68a" stroke="#d97706" stroke-width="6"/><path d="M185 310L140 565M235 310L260 565"/><path d="M140 565L80 610M260 565L330 610"/></g><g font-family="Arial" font-size="21" fill="#0f172a"><text x="520" y="155" font-weight="700">Femur · Oberschenkelknochen</text><line x1="495" y1="150" x2="355" y2="150" stroke="#64748b" stroke-width="3"/><text x="520" y="255" font-weight="700">Patella · Kniescheibe</text><line x1="495" y1="250" x2="365" y2="375" stroke="#64748b" stroke-width="3"/><text x="520" y="345" font-weight="700">Tibia · Schienbein</text><line x1="495" y1="340" x2="305" y2="480" stroke="#64748b" stroke-width="3"/><text x="520" y="435" font-weight="700">Fibula · Wadenbein</text><line x1="495" y1="430" x2="385" y2="500" stroke="#64748b" stroke-width="3"/><rect x="515" y="500" width="570" height="145" rx="24" fill="#e0f2fe"/><text x="545" y="540" font-weight="700" fill="#0369a1">Knie zusätzlich:</text><text x="545" y="578">Quadrizepssehne · Gelenkknorpel · Meniskus</text><text x="545" y="612">Patellasehne · Seitenband · Femur · Tibia · Fibula</text></g></svg>`);

const footVisual = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="650" viewBox="0 0 1200 650"><rect width="1200" height="650" rx="36" fill="#f8fafc"/><text x="600" y="55" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#0f172a">Fuß: Knochen und Gewölbe</text><g transform="translate(80 135)"><path d="M90 70L180 150L305 160L430 185L560 220L720 260" stroke="#475569" stroke-width="42" fill="none" stroke-linecap="round"/><circle cx="175" cy="150" r="45" fill="#fde68a" stroke="#d97706" stroke-width="5"/><circle cx="280" cy="160" r="38" fill="#e0f2fe" stroke="#0284c7" stroke-width="5"/><circle cx="360" cy="178" r="32" fill="#dcfce7" stroke="#16a34a" stroke-width="5"/><path d="M410 185L515 205M430 210L535 235M455 235L555 265" stroke="#7c3aed" stroke-width="18"/><path d="M525 205L735 225M545 235L755 270M565 265L770 315" stroke="#ef4444" stroke-width="12"/></g><g font-family="Arial" font-size="20"><text x="120" y="430">Talus / Sprungbein</text><text x="120" y="468">Calcaneus / Fersenbein</text><text x="120" y="506">Kahnbein · Keilbeine · Würfelbein</text><text x="620" y="430">Mittelfußknochen / Metatarsus</text><text x="620" y="468">Zehenknochen / Phalangen</text><text x="620" y="506">Längsgewölbe + Quergewölbe</text></g><path d="M170 560Q470 470 790 560" stroke="#0d9488" stroke-width="7" fill="none"/><text x="480" y="610" text-anchor="middle" font-family="Arial" font-size="22" fill="#0f766e">Gewölbe verteilen Belastung und stabilisieren den Fuß.</text></svg>`);

const upperLimbVisual = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="650" viewBox="0 0 1200 650"><rect width="1200" height="650" rx="36" fill="#f8fafc"/><text x="600" y="55" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#0f172a">Schultergürtel, Arm und Hand</text><g transform="translate(80 100)"><path d="M120 70Q230 10 340 70" stroke="#0d9488" stroke-width="22" fill="none"/><path d="M205 90L285 210L145 210Z" fill="#ccfbf1" stroke="#0d9488" stroke-width="5"/><path d="M300 95L330 305" stroke="#475569" stroke-width="28"/><path d="M320 315L285 500M340 315L385 500" stroke="#475569" stroke-width="20"/><g fill="#e0f2fe" stroke="#0284c7" stroke-width="4"><circle cx="335" cy="525" r="20"/><circle cx="375" cy="525" r="20"/><circle cx="415" cy="525" r="20"/></g><path d="M410 525L515 485M415 535L530 530M410 545L520 575" stroke="#7c3aed" stroke-width="13"/></g><g font-family="Arial" font-size="20"><text x="650" y="150">Clavicula · Schlüsselbein</text><text x="650" y="195">Scapula · Schulterblatt</text><text x="650" y="240">Humerus · Oberarmknochen</text><text x="650" y="285">Radius · Speiche</text><text x="650" y="330">Ulna · Elle</text><text x="650" y="375">Handwurzelknochen / Carpus</text><text x="650" y="420">Mittelhandknochen / Metacarpus</text><text x="650" y="465">Fingerknochen / Phalangen</text></g></svg>`);

const thoraxVisual = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="650" viewBox="0 0 1200 650"><rect width="1200" height="650" rx="36" fill="#f8fafc"/><text x="600" y="55" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#0f172a">Brustkorb / Thorax</text><g transform="translate(100 100)" fill="none" stroke="#475569" stroke-width="9"><path d="M250 35V450"/><path d="M250 90Q115 75 80 180Q115 300 250 320M250 90Q385 75 420 180Q385 300 250 320"/><path d="M250 135Q125 125 100 205Q130 315 250 345M250 135Q375 125 400 205Q370 315 250 345"/><path d="M250 180Q145 175 120 230Q150 330 250 370M250 180Q355 175 380 230Q350 330 250 370"/><path d="M250 225Q165 220 145 250Q170 345 250 395M250 225Q335 220 355 250Q330 345 250 395"/><path d="M165 60H335" stroke="#0d9488" stroke-width="15"/><path d="M250 80V390" stroke="#d97706" stroke-width="24"/></g><g font-family="Arial" font-size="20"><text x="650" y="155">Clavicula · Schlüsselbein</text><text x="650" y="200">Sternum · Brustbein</text><text x="650" y="245">Costae · Rippen</text><text x="650" y="290">Rippenknorpel</text><text x="650" y="335">Intercostalraum / ICR</text><text x="650" y="380">2 freie Rippenpaare</text><rect x="630" y="430" width="470" height="120" rx="22" fill="#e0f2fe"/><text x="655" y="470" font-weight="700" fill="#0369a1">Querschnitt:</text><text x="655" y="505">Wirbel · Wirbelkanal · Bandscheibe · Rippe</text><text x="655" y="535">Rippenknorpel · Brustbein</text></g></svg>`);

const pelvisVisual = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="650" viewBox="0 0 1200 650"><rect width="1200" height="650" rx="36" fill="#f8fafc"/><text x="600" y="55" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#0f172a">Becken und Hüftgelenk</text><g transform="translate(70 100)"><path d="M250 40Q85 55 80 220Q115 360 255 350L315 290L375 350Q515 360 550 220Q545 55 380 40L315 130Z" fill="#fef3c7" stroke="#d97706" stroke-width="7"/><circle cx="185" cy="320" r="50" fill="#e0f2fe" stroke="#0284c7" stroke-width="7"/><circle cx="445" cy="320" r="50" fill="#e0f2fe" stroke="#0284c7" stroke-width="7"/><path d="M185 365L150 520M445 365L480 520" stroke="#475569" stroke-width="35"/><path d="M315 115V350" stroke="#7c3aed" stroke-width="16"/></g><g font-family="Arial" font-size="20"><text x="700" y="140">Darmbein / Ilium</text><text x="700" y="182">Kreuzbein / Sacrum</text><text x="700" y="224">Steißbein / Coccyx</text><text x="700" y="266">Schambein · Sitzbein · Symphyse</text><text x="700" y="308">Hüftpfanne / Acetabulum</text><text x="700" y="350">Femurkopf · Femurhals · Femur</text><text x="700" y="392">hyaliner Gelenkknorpel</text><text x="700" y="434">Bänder des Hüftgelenks</text></g></svg>`);

const skullVisual = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700"><rect width="1200" height="700" rx="36" fill="#f8fafc"/><text x="600" y="55" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#0f172a">Schädel: wichtige Knochen und Räume</text><g transform="translate(110 95)"><path d="M300 20Q105 30 70 210Q55 330 165 370L175 515Q260 565 365 515L430 400Q525 350 510 205Q475 35 300 20Z" fill="#fef3c7" stroke="#92400e" stroke-width="7"/><ellipse cx="195" cy="235" rx="62" ry="50" fill="#e0f2fe" stroke="#0284c7" stroke-width="5"/><ellipse cx="385" cy="235" rx="62" ry="50" fill="#e0f2fe" stroke="#0284c7" stroke-width="5"/><path d="M290 260L260 335H325Z" fill="#fff" stroke="#64748b" stroke-width="5"/><path d="M180 405Q295 450 410 405" stroke="#64748b" stroke-width="14" fill="none"/></g><g font-family="Arial" font-size="19"><text x="680" y="125">Stirnbein · Os frontale</text><text x="680" y="160">Scheitelbein · Os parietale</text><text x="680" y="195">Keilbein · Os sphenoidale</text><text x="680" y="230">Schläfenbein · Os temporale</text><text x="680" y="265">Jochbein · Os zygomaticum</text><text x="680" y="300">Nasenbein · Os nasale</text><text x="680" y="335">Pflugscharbein · Vomer</text><text x="680" y="370">Oberkiefer · Maxilla</text><text x="680" y="405">Unterkiefer · Mandibula</text><text x="680" y="440">Augenhöhle · Orbita</text><text x="680" y="475">Warzenfortsatz · Processus mastoideus</text><text x="680" y="510">Kieferhöhle · Sinus maxillaris</text></g></svg>`);

const spineDetailVisual = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="650" viewBox="0 0 1200 650"><rect width="1200" height="650" rx="36" fill="#f8fafc"/><text x="600" y="55" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="#0f172a">Wirbelsäule: Abschnitte und Krümmungen</text><g transform="translate(150 105)"><path d="M180 0Q100 80 175 160Q245 245 170 325Q95 415 190 520" stroke="#475569" stroke-width="32" fill="none" stroke-linecap="round"/><path d="M178 0Q120 55 170 100" stroke="#0d9488" stroke-width="32" fill="none"/><path d="M170 100Q240 185 175 245" stroke="#0284c7" stroke-width="32" fill="none"/><path d="M175 245Q110 335 180 395" stroke="#d97706" stroke-width="32" fill="none"/><path d="M180 395Q235 450 190 505" stroke="#7c3aed" stroke-width="32" fill="none"/></g><g font-family="Arial" font-size="20"><rect x="525" y="110" width="525" height="72" rx="18" fill="#ccfbf1"/><text x="555" y="144" font-weight="700" fill="#0f766e">HWS: 7 Halswirbel (C1–C7)</text><text x="555" y="170">Krümmung: Lordose</text><rect x="525" y="200" width="525" height="72" rx="18" fill="#e0f2fe"/><text x="555" y="234" font-weight="700" fill="#0369a1">BWS: 12 Brustwirbel (Th1–Th12)</text><text x="555" y="260">Krümmung: Kyphose</text><rect x="525" y="290" width="525" height="72" rx="18" fill="#fef3c7"/><text x="555" y="324" font-weight="700" fill="#b45309">LWS: 5 Lendenwirbel (L1–L5)</text><text x="555" y="350">Krümmung: Lordose</text><rect x="525" y="380" width="525" height="72" rx="18" fill="#ede9fe"/><text x="555" y="414" font-weight="700" fill="#6d28d9">Kreuzbein: 5 verschmolzene Wirbel</text><text x="555" y="440">Krümmung: Kyphose</text><rect x="525" y="470" width="525" height="62" rx="18" fill="#fee2e2"/><text x="555" y="508" font-weight="700" fill="#b91c1c">Steißbein / Coccyx</text></g></svg>`);

const drugGroups1: string[][] = [
  ['Analgetika', 'Schmerzmittel'], ['Antiallergika', 'gegen allergische Reaktionen'], ['Antidiabetika', 'blutzuckersenkende Arzneimittel'], ['Antidiarrhoika', 'gegen Durchfall'], ['Antiemetika', 'gegen Übelkeit und Erbrechen'], ['Antihypertonika', 'gegen hohen Blutdruck'], ['Antihypotonika', 'gegen niedrigen Blutdruck'], ['Antikoagulanzien', 'hemmen die Blutgerinnung'], ['Antihelminthika', 'gegen Wurminfektionen'], ['Antiphlogistika', 'entzündungshemmend'], ['Antipyretika', 'fiebersenkend'], ['Antirheumatika', 'gegen rheumatische Beschwerden'], ['Antitussiva', 'gegen Reizhusten'], ['Expektoranzien', 'schleimlösende/hustenlösende Mittel'], ['Carminativa', 'gegen Blähungen'], ['Antibiotika', 'gegen bakterielle Infektionen'], ['Antimykotika', 'gegen Pilzinfektionen'], ['Desinfektionsmittel', 'gegen pathogene Keime auf geeigneten Flächen/Haut je nach Produkt'], ['Diuretika', 'harntreibende Mittel'], ['Geriatrika', 'Begriff der Unterlage für Mittel bei Altersbeschwerden'],
];

const drugGroups2: string[][] = [
  ['Hämostyptika', 'blutstillende Mittel'], ['Kardiaka', 'Herz-Kreislauf-wirksame Mittel'], ['Kontrazeptiva', 'Empfängnisverhütungsmittel'], ['Lokalanästhetika', 'örtliche Betäubungsmittel'], ['Hormone', 'Botenstoffe, die Körperfunktionen regulieren'], ['Serum / Sera', 'enthalten Antikörper; passive Immunisierung'], ['Impfstoffe', 'lösen aktive Immunantwort aus'], ['Laxantia', 'Abführmittel'], ['Cholagoga', 'galleflussfördernde Mittel'], ['Antacida', 'neutralisieren Magensäure'], ['Spasmolytika', 'krampflösende Mittel'], ['Zytostatika', 'hemmen Zellteilung/-wachstum'], ['Dermatika', 'Arzneimittel zur Anwendung an der Haut'], ['Sedativa', 'beruhigende Mittel'], ['Hypnotika', 'Schlafmittel'], ['Antidepressiva', 'Arzneimittel gegen depressive Erkrankungen'], ['Tranquilizer', 'ältere Sammelbezeichnung für angst-/spannungsdämpfende Mittel'], ['Bronchiolytika', 'Begriff der Unterlage; heute meist Bronchodilatatoren/Bronchospasmolytika'],
];

const applicationRows: string[][] = [
  ['nasal', 'in/über die Nase'], ['pulmonal', 'über Lunge/Atemwege'], ['oral / peroral', 'über den Mund'], ['bukkal', 'über die Wangenschleimhaut'], ['sublingual', 'unter die Zunge'], ['intravenös (i.v.)', 'in eine Vene'], ['vaginal', 'in die Scheide'], ['rektal', 'in den Mastdarm'], ['subkutan (s.c.)', 'in das Unterhautfettgewebe'], ['intramuskulär (i.m.)', 'in einen Muskel'], ['otal', 'in/an den Gehörgang'], ['kutan / perkutan / transdermal', 'an bzw. durch die Haut'], ['ophthalmologisch', 'am Auge / an der Bindehaut'], ['systemisch', 'Wirkung im gesamten Körper'], ['lokal', 'örtlich begrenzte Wirkung'],
];

const sourceTests: TopicContent[] = [
  { type: 'heading', title: 'Übungen' },
  { type: 'list', items: [
    'Nenne fünf Anamnesearten und jeweils ein Beispiel.|||Mögliche Lösung: frühere Anamnese – frühere Operation/Krankheit; Medikamentenanamnese – Selbstmedikation; vegetative Anamnese – Schlaf/Appetit; Familienanamnese – familiäre Erkrankungen; soziale Anamnese – Familie/Beruf; psychische Anamnese – seelische Befindlichkeit; Eigen- oder Fremdanamnese.',
    'Übersetze Palpation, Auskultation, Inspektion und Perkussion.|||Palpation = Betasten; Auskultation = Abhören; Inspektion = Betrachten/Beobachten; Perkussion = Beklopfen.',
    'Was bedeuten subjektiv, objektiv, spezifisch, unspezifisch, akut und chronisch?|||Subjektiv = nur vom Patienten wahrnehmbar; objektiv = von anderen feststellbar; spezifisch = charakteristisch für eine bestimmte Erkrankung; unspezifisch = bei vielen Erkrankungen möglich; akut = plötzlich/heftig und eher kurz; chronisch = langandauernd.',
  ] },
];

const pdfTopics: LearningTopic[] = [
  {
    id: 'lf4-pdf-anamnese-komplett',
    title: 'PDF-Erweiterung: Anamnesearten, Symptome & Untersuchung',
    content: [
      { type: 'heading', title: 'Anamnesearten vollständig' },
      { type: 'text', text: 'Die Anamnese sammelt Informationen zur aktuellen Situation und zur Vorgeschichte. In der Unterlage werden mehrere Blickrichtungen unterschieden. Sie ergänzen sich und helfen, Beschwerden im Zusammenhang mit Vorerkrankungen, Medikamenten, Lebenssituation und familiären Risiken einzuordnen.' },
      { type: 'table', headers: ['Anamneseart', 'Worum geht es?', 'Beispiel'], rows: [
        ['Frühere Anamnese', 'frühere Erkrankungen, Operationen und Behandlungen', 'Operation am Knie, frühere Lungenentzündung'],
        ['Medikamentenanamnese', 'aktuelle und selbst eingenommene Arzneimittel', 'Schmerzmittel in Selbstmedikation'],
        ['Vegetative Anamnese', 'körperliche Grundfunktionen', 'Schlaf, Appetit, Stuhlgang, Wasserlassen'],
        ['Familienanamnese', 'Erkrankungen und Risiken in der Familie', 'Diabetes oder Herz-Kreislauf-Erkrankungen in der Familie'],
        ['Soziale Anamnese', 'Lebens- und Arbeitssituation', 'Beruf, Familie, Belastungen'],
        ['Psychische Anamnese', 'seelische Befindlichkeit', 'Ängste, Stimmung, Belastung'],
        ['Eigenanamnese', 'Patient kann Angaben selbst machen', 'Patient berichtet selbst über seine Beschwerden'],
        ['Fremdanamnese', 'Angaben kommen von einer anderen Person', 'Angehöriger berichtet bei Bewusstseinsstörung'],
      ] },
      { type: 'heading', title: 'Symptome richtig einordnen' },
      { type: 'table', headers: ['Begriff', 'Bedeutung', 'Beispiel'], rows: [
        ['subjektiv', 'nur von der betroffenen Person wahrnehmbar', 'Übelkeit, Schmerz, Schwindel'],
        ['objektiv', 'von anderen beobachtbar oder messbar', 'Fieber, Hautveränderung'],
        ['spezifisch', 'für eine Erkrankung besonders charakteristisch', 'typischer Ausschlag bei Scharlach als Beispiel der Unterlage'],
        ['unspezifisch', 'kann bei vielen Erkrankungen vorkommen', 'Kopfschmerz'],
        ['akut', 'plötzlich/heftig, meist kurze Dauer', 'plötzlich einsetzender Schmerz'],
        ['chronisch', 'langandauernd oder wiederkehrend', 'lang bestehende Beschwerden'],
      ] },
      { type: 'heading', title: 'Vier Grundmethoden' },
      { type: 'table', headers: ['Fachbegriff', 'Deutsch', 'Was wird beurteilt?'], rows: [['Inspektion','Betrachten','z. B. Haut, Haltung, Schwellung'],['Palpation','Betasten','z. B. Druckschmerz, Temperatur, Puls'],['Perkussion','Beklopfen','Klopfschall und Grenzen von Organen'],['Auskultation','Abhören','z. B. Herz-, Lungen- oder Darmgeräusche']] },
      ...sourceTests,
    ],
  },
  {
    id: 'lf4-pdf-gelenke-komplett',
    title: 'PDF-Erweiterung: Gelenkaufbau, Gelenktypen & Fachbegriffe',
    content: [
      { type: 'heading', title: 'Gelenkvokabeln' },
      { type: 'table', headers: ['Begriff', 'Bedeutung'], rows: [['Articulatio','Gelenk'],['Synarthrose','unechte Gelenkverbindung / Knochenverbindung'],['Synovia','Gelenkflüssigkeit'],['Synovialis','Gelenkinnenhaut / Synovialmembran'],['proximal','zur Körpermitte bzw. zum Rumpf hin'],['distal','vom Rumpf bzw. von der Körpermitte weg'],['radial','zur Speiche hin'],['ulnar','zur Elle hin'],['superior','oben'],['inferior','unten']] },
      { type: 'heading', title: 'Gelenktypen' },
      { type: 'table', headers: ['Gelenktyp', 'Achsen', 'Beispiel'], rows: [['Kugelgelenk','3','Schulter- und Hüftgelenk'],['Eigelenk / Ellipsoidgelenk','2','Handgelenk'],['Sattelgelenk','2','Daumensattelgelenk'],['Scharniergelenk','1','Ellenbogen- und Fingergelenke'],['Rad-/Drehgelenk','1','Drehverbindung zwischen Speiche und Elle']] },
      { type: 'info', title: 'Anatomische Präzisierung', text: 'Die Unterlage nennt beim Sattelgelenk teilweise „Daumengrundgelenk“. Anatomisch ist das klassische Sattelgelenk das Daumensattelgelenk zwischen großem Vieleckbein und erstem Mittelhandknochen.' },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Welche drei Begriffe beschreiben Gelenk, Gelenkflüssigkeit und Gelenkinnenhaut?|||Articulatio = Gelenk; Synovia = Gelenkflüssigkeit; Synovialis = Gelenkinnenhaut/Synovialmembran.',
        'Ordne Kugel-, Ei-, Sattel-, Scharnier- und Radgelenk nach ihrer Achsenzahl.|||Kugelgelenk 3 Achsen; Eigelenk 2; Sattelgelenk 2; Scharniergelenk 1; Rad-/Drehgelenk 1.',
        'Nenne je ein Beispiel für Kugel-, Eigelenk und Scharniergelenk.|||Kugel: Schulter/Hüfte; Ei: Handgelenk; Scharnier: Ellenbogen/Fingergelenk.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-gelenkverletzungen',
    title: 'PDF-Erweiterung: Luxation, Distorsion & Kontusion',
    content: [
      { type: 'heading', title: 'Drei typische Verletzungsbegriffe' },
      { type: 'table', headers: ['Verletzung', 'Bedeutung', 'Typische Zeichen laut Unterlage', 'Grundprinzip'], rows: [
        ['Luxation', 'Verrenkung / Ausrenkung eines Gelenks', 'Schmerz, Bewegungseinschränkung, Kraftlosigkeit', 'ärztliche Reposition; nicht selbst einrenken'],
        ['Distorsion', 'Zerrung / Verstauchung', 'Schwellung, Bluterguss, Schmerz, Bewegungseinschränkung', 'entlasten, kühlen, komprimieren, hochlagern'],
        ['Kontusion', 'Prellung / Quetschung', 'Schwellung, Bluterguss, Schmerz', 'entlasten, kühlen, ggf. stützen/schonen'],
      ] },
      { type: 'heading', title: 'PECH-Regel aus der Unterlage' },
      { type: 'list', items: ['P = Pause', 'E = Eis / Kühlen', 'C = Compression / Kompression', 'H = Hochlagerung'] },
      { type: 'warning', title: 'Praxis', text: 'Die PECH-Regel ist ein Lernschema der Unterlage. Bei starken Schmerzen, Fehlstellung, Durchblutungs-/Gefühlsstörungen oder Verdacht auf Fraktur/Luxation ist eine ärztliche Beurteilung wichtig.' },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Übersetze Luxation, Distorsion und Kontusion.|||Luxation = Verrenkung/Ausrenkung; Distorsion = Zerrung/Verstauchung; Kontusion = Prellung/Quetschung.',
        'Wofür stehen die Buchstaben PECH?|||Pause, Eis/Kühlen, Compression/Kompression, Hochlagerung.',
        'Warum sollte eine Luxation nicht eigenständig eingerenkt werden?|||Weil Gefäße, Nerven, Knochen und Weichteile verletzt sein können; die Reposition gehört in fachkundige ärztliche Behandlung.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-arthrose-rheuma',
    title: 'PDF-Erweiterung: Arthrose & Rheuma',
    content: [
      { type: 'heading', title: 'Arthrose in drei Stadien' },
      { type: 'image', src: arthrosisVisual, alt: 'Arthrose Stadien I bis III', caption: 'Die Lernunterlage beschreibt drei Stadien vom Elastizitätsverlust des Knorpels bis zu Fragmenten und möglicher Gelenkblockierung.' },
      { type: 'table', headers: ['Stadium', 'Veränderung', 'Beschwerden der Unterlage'], rows: [['I','Knorpel verliert Elastizität, wird spröde und kann splittern','Spannungsgefühl, Steifigkeit, brennende Schmerzen'],['II','Knorpelabbau; Gelenkfläche wird uneben; Randwülste; Gelenk kann sich verdicken','Schmerzen, Bewegungseinschränkung, Reib-/Knirschempfinden'],['III','Knorpelteile können absplittern; Gelenk kann blockieren','Ruhe- und Bewegungsschmerz, zunehmende Einschränkung']] },
      { type: 'heading', title: 'Rheuma als Oberbegriff' },
      { type: 'text', text: 'Die Unterlage verwendet „Rheuma“ als Oberbegriff für schmerzhafte Erkrankungen des Bewegungsapparates. Sie unterscheidet entzündliche Formen von degenerativen Erkrankungen wie der Arthrose.' },
      { type: 'table', headers: ['Form', 'Kernaussage / Beispiel'], rows: [['Rheumatisches Fieber','nach Streptokokkeninfektion; Unterlage nennt hohes Fieber, akute Polyarthritis und Endokarditis'],['Chronische Polyarthritis','Autoimmunerkrankung mit Entzündung der Synovialis und möglichen späteren Knorpelschäden'],['Weichteilrheumatismus','Muskeln, Sehnen, Bänder und Faszien; Beispiele Tendovaginitis und Epicondylitis'],['Degenerativ','Arthrose durch Gewebeverschleiß/degenerative Veränderung']] },
      { type: 'heading', title: 'Arthrosebezeichnungen' },
      { type: 'table', headers: ['Begriff', 'Ort'], rows: [['Coxarthrose','Hüftgelenk'],['Gonarthrose','Kniegelenk'],['Spondylose','Wirbelsäule/Wirbel'],['Omarthrose','Schultergelenk'],['Rhizarthrose','Daumensattelgelenk']] },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Was unterscheidet Stadium I, II und III der Arthrose im Lernmodell?|||I: Elastizitätsverlust/Sprödigkeit des Knorpels; II: stärkerer Knorpelabbau, unebene Fläche und Randwülste; III: Knorpelfragmente und mögliche Blockierung mit stärkeren Beschwerden.',
        'Was bedeuten Coxarthrose, Gonarthrose, Omarthrose und Rhizarthrose?|||Coxarthrose = Hüfte; Gonarthrose = Knie; Omarthrose = Schulter; Rhizarthrose = Daumensattelgelenk.',
        'Nenne drei entzündlich-rheumatische Beispiele aus der Unterlage.|||Rheumatisches Fieber, chronische Polyarthritis und Weichteilrheumatismus.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-knorpel',
    title: 'PDF-Erweiterung: Knorpelgewebe',
    content: [
      { type: 'heading', title: 'Eigenschaften und Zellen' },
      { type: 'text', text: 'Knorpel ist druck- und biegeelastisch. Die Knorpelzellen heißen Chondrozyten. Je nach Faserzusammensetzung und Aufgabe unterscheidet die Unterlage drei Knorpelarten.' },
      { type: 'table', headers: ['Knorpelart', 'Eigenschaft', 'Vorkommen'], rows: [['Hyaliner Knorpel','glatt/gläsern; druckelastisch','Gelenkflächen, Rippenknorpel, Nase, Luftröhre'],['Elastischer Knorpel','sehr biegsam durch elastische Fasern','Ohrmuschel, Kehldeckel'],['Faserknorpel','besonders druckbeständig','Bandscheiben, Menisken']] },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Wie heißen Knorpelzellen?|||Chondrozyten.',
        'Nenne die drei Knorpelarten.|||Hyaliner Knorpel, elastischer Knorpel und Faserknorpel.',
        'Nenne je ein Vorkommen.|||Hyalin z. B. Gelenkfläche/Rippenknorpel; elastisch z. B. Ohrmuschel; Faserknorpel z. B. Bandscheibe oder Meniskus.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-knochengewebe',
    title: 'PDF-Erweiterung: Knochenaufbau & Knochengewebe',
    content: [
      { type: 'heading', title: 'Bestandteile des Knochens' },
      { type: 'table', headers: ['Bestandteil', 'Anteil im Lernmodell', 'Funktion'], rows: [['Knochensalze','ca. 2/3','Calcium-, Phosphat- und Magnesiumsalze geben Festigkeit/Stabilität'],['Kollagene Fasern','ca. 1/3','geben Elastizität und eine gewisse Biegsamkeit']] },
      { type: 'heading', title: 'Zellen und Umbau' },
      { type: 'table', headers: ['Begriff', 'Bedeutung'], rows: [['Osteozyt','reife Knochenzelle'],['Osteoblast','knochenaufbauende Zelle'],['Osteoklast','knochenabbauende Zelle'],['Osteon','Baueinheit der Kompakta mit Knochenlamellen um einen Gefäßkanal']] },
      { type: 'heading', title: 'Röhrenknochen' },
      { type: 'list', items: ['Epiphyse = Knochenende', 'Metaphyse = Übergangs-/Wachstumszone', 'Diaphyse = Knochenschaft', 'Spongiosa = schwammartige Knochenstruktur', 'Kompakta = feste Rindenschicht', 'Markhöhle mit Knochenmark', 'Periost = Knochenhaut mit Gefäßen und Nerven', 'Gelenkflächen sind mit hyalinem Knorpel überzogen'] },
      { type: 'heading', title: 'Kindlicher und erwachsener Knochen' },
      { type: 'text', text: 'Die Unterlage hebt hervor, dass kindlicher Knochen einen höheren Anteil kollagener Fasern und damit mehr Elastizität besitzt. Rotes Knochenmark ist an der Blutbildung beteiligt. Im Laufe des Lebens wird ein Teil davon zu gelbem Fettmark umgewandelt.' },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Welche zwei Hauptanteile nennt die Unterlage für Knochengewebe?|||Etwa 2/3 Knochensalze und 1/3 kollagene Fasern.',
        'Ordne Osteozyt, Osteoblast und Osteoklast zu.|||Osteozyt = reife Knochenzelle; Osteoblast = Knochenaufbau; Osteoklast = Knochenabbau.',
        'Erkläre Epiphyse, Metaphyse und Diaphyse.|||Epiphyse = Knochenende; Metaphyse = Übergangs-/Wachstumszone; Diaphyse = Knochenschaft.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-frakturen',
    title: 'PDF-Erweiterung: Frakturen vollständig',
    content: [
      { type: 'heading', title: 'Definition und Frakturarten' },
      { type: 'definition', term: 'Fraktur', definition: 'Teilweise oder vollständige Unterbrechung der Kontinuität eines Knochens.' },
      { type: 'image', src: fractureVisual, alt: 'Vergleich verschiedener Frakturarten', caption: 'Geschlossen, offen, Grünholz und Trümmerfraktur entsprechend der Einteilung in der Unterlage.' },
      { type: 'warning', title: 'Quellenhinweis zur Trümmerfraktur', text: 'Die Unterlage definiert die Trümmerfraktur als „ab 6 Fragmente“. Diese Zahl wird hier als prüfungsbezogene Quellenangabe geführt und nicht als universelle moderne Definitionsgrenze dargestellt.' },
      { type: 'heading', title: 'Sichere Frakturzeichen in der Unterlage' },
      { type: 'list', items: ['sicht- oder tastbare Fehlstellung/Formveränderung', 'Knochen durchspießt die Haut / offene Fraktur', 'Krepitation bzw. Knirschen bei unphysiologischer Bewegung'] },
      { type: 'warning', title: 'Nicht provozieren', text: 'Abnorme Beweglichkeit oder Krepitation werden nicht absichtlich getestet. Bei Frakturverdacht wird die betroffene Region ruhiggestellt und medizinisch beurteilt.' },
      { type: 'heading', title: 'Komplikationen' },
      { type: 'table', headers: ['Mitbetroffene Struktur', 'Mögliche Folge laut Unterlage'], rows: [['Gelenkflächen','posttraumatische Arthrose'],['Wachstumszonen','Wachstumsstörung'],['Blut-/Lymphgefäße','innere Blutung / Lymphödem'],['Nerven/Muskeln','Gefühlsstörung / Lähmung'],['Organe','z. B. Lungenverletzung'],['Fettmark in Blutgefäßen','Fettembolie'],['Infektion im Knochen','Osteomyelitis']] },
      { type: 'heading', title: 'Behandlung und Diagnostik' },
      { type: 'table', headers: ['Prinzip', 'Beispiele'], rows: [['Reposition','verschobene Knochenteile in anatomisch passende Stellung bringen und fixieren'],['Konservativ','Gips, Schiene, Kunststoff-Hartverband'],['Operativ','Nagelung, Schrauben, Platten, ggf. Endoprothese'],['Diagnostik','Röntgen in zwei Ebenen; je nach Fragestellung CT oder MRT']] },
      { type: 'definition', term: 'Dislokation', definition: 'Fehlstellung bzw. Verschiebung; eine dislozierte Fraktur ist eine verschobene Fraktur.' },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Definiere geschlossene, offene, Grünholz- und Trümmerfraktur.|||Geschlossen = Haut intakt; offen = Haut/Weichteile verletzt mit Verbindung nach außen; Grünholz = unvollständiger Bruch des elastischen kindlichen Knochens mit teilweise erhaltenem Periost; Trümmerfraktur = mehrere Fragmente, in der Unterlage ab 6 Bruchstücken.',
        'Nenne drei sichere Frakturzeichen aus der Unterlage.|||Fehlstellung/Formveränderung, Knochen durch die Haut/offene Fraktur, Krepitation/Knirschen bei unphysiologischer Bewegung.',
        'Nenne je zwei konservative und operative Behandlungen.|||Konservativ z. B. Gips und Schiene; operativ z. B. Schrauben und Platten/Nagelung.',
        'Was bedeutet Dislokation?|||Fehlstellung/Verschiebung; dislozierte Fraktur = verschobene Fraktur.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-bandscheibe-osteoporose',
    title: 'PDF-Erweiterung: Bandscheibenvorfall & Osteoporose',
    content: [
      { type: 'heading', title: 'Bandscheibenvorfall' },
      { type: 'text', text: 'Die Unterlage beschreibt einen Einriss im Faserring der Bandscheibe mit Hervortreten/Vorwölbung von Bandscheibengewebe in Richtung eines benachbarten Spinalnerven. Als mögliche Auslöser werden einseitige Belastung, Fehlstellung und Überlastung genannt.' },
      { type: 'table', headers: ['Bereich', 'häufig genannte Höhen'], rows: [['HWS','C5/C6 und C6/C7'],['LWS','L4/L5 und L5/S1']] },
      { type: 'list', items: ['Rückenschmerz', 'ausstrahlender Schmerz im Versorgungsgebiet des betroffenen Nervs', 'bei Nervenschädigung motorische Ausfälle möglich', 'Paresis = teilweise Lähmung', 'Plegie = vollständige Lähmung', 'MRT ist zur Darstellung von Bandscheiben/Weichteilen besonders geeignet'] },
      { type: 'heading', title: 'Osteoporose' },
      { type: 'definition', term: 'Osteoporose', definition: 'Skeletterkrankung mit verminderter Knochenmasse und erhöhter Bruchneigung.' },
      { type: 'table', headers: ['Bereich', 'Angaben der Unterlage'], rows: [['Risikogruppen/-faktoren','ältere Frauen nach den Wechseljahren; Untergewicht; Nikotin; Cortison'],['Mögliche Zeichen','Rückenschmerzen, Rundrücken, Größenabnahme, Fehl-/Schonhaltung, Spontanfrakturen'],['Diagnostik','Knochendichtemessung / Osteodensitometrie'],['Basismaßnahmen der Unterlage','calciumreiche Ernährung, körperliche Bewegung, ausreichende Vitamin-D-Versorgung']] },
      { type: 'info', title: 'Einordnung', text: 'Die genannten Maßnahmen bilden die Lernunterlage ab, sind aber keine vollständige individuelle Osteoporosebehandlung. Diagnostik und Therapie richten sich nach Risiko, Befunden und ärztlicher Beurteilung.' },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Definiere einen Bandscheibenvorfall nach der Unterlage.|||Einriss/Schädigung des Faserrings mit Hervortreten oder Vorwölbung von Bandscheibengewebe in Richtung eines benachbarten Spinalnerven.',
        'Nenne die häufig genannten Höhen an HWS und LWS.|||HWS: C5/C6 und C6/C7; LWS: L4/L5 und L5/S1.',
        'Was bedeuten Paresis und Plegie?|||Paresis = teilweise Lähmung; Plegie = vollständige Lähmung.',
        'Was ist Osteodensitometrie?|||Knochendichtemessung.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-bewegungsapparat-erkrankungen',
    title: 'PDF-Erweiterung: Bewegungsapparat & weitere Erkrankungen',
    content: [
      { type: 'heading', title: 'Aktiver und passiver Bewegungsapparat' },
      { type: 'table', headers: ['Teil', 'Bestandteile / Aufgabe'], rows: [['Aktiv','Skelettmuskulatur; erzeugt Bewegung und unterstützt die Haltung'],['Passiv','Knochen, Gelenke, Bänder und weitere passive Strukturen; bilden das tragende Gerüst und werden durch Muskeln bewegt'],['ZNS','Gehirn und Rückenmark; steuert und koordiniert Bewegungen'],['PNS','Nerven außerhalb von Gehirn und Rückenmark; verbindet ZNS mit Körperstrukturen']] },
      { type: 'heading', title: 'Wirbelsäulen- und Muskelerkrankungen' },
      { type: 'table', headers: ['Begriff', 'Bedeutung der Unterlage'], rows: [['HWS-/LWS-Syndrom','Funktionsstörung im Bereich von Hals-/Lendenwirbelsäule, z. B. bei Fehlhaltung'],['Lumbago','akuter Kreuzschmerz / „Hexenschuss“'],['Lumbalgie','chronischer Kreuzschmerz'],['Lumboischialgie','Rückenschmerz mit Ausstrahlung entlang des Ischiasbereichs'],['Rachitis','Knochenerweichung/-verformung im Kindesalter bei Vitamin-D-Mangel'],['Osteomalazie','Knochenerweichung beim Erwachsenen'],['Skoliose','Seitwärtskrümmung der Wirbelsäule'],['Hernie','Eingeweidebruch durch eine Lücke/Schwachstelle, z. B. Leisten- oder Nabelhernie'],['Bursitis','Schleimbeutelentzündung'],['Muskelatrophie','Rückbildung von Muskulatur, z. B. bei Inaktivität'],['Myogelose','knotenförmige Muskelverhärtung']] },
      { type: 'heading', title: 'Fußdeformitäten' },
      { type: 'table', headers: ['Begriff', 'Merkmal'], rows: [['Plattfuß','abgesenktes Längs- und Quergewölbe'],['Spreizfuß','abgesenktes Quergewölbe'],['Senkfuß','abgesenktes Längsgewölbe'],['Knickfuß','Fehlstellung im Bereich des Rück-/Sprunggelenks'],['Hohlfuß','übermäßig starkes Längsgewölbe'],['Hallux valgus','Fehlstellung der Großzehe mit typischer Ballenbildung am Großzehengrundgelenk']] },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Was gehört zum aktiven und was zum passiven Bewegungsapparat?|||Aktiv: Skelettmuskulatur; passiv: Knochen, Gelenke, Bänder und andere passive Stütz-/Führungsstrukturen.',
        'Übersetze Lumbago, Lumbalgie, Hernie, Bursitis und Myogelose.|||Lumbago = akuter Kreuzschmerz; Lumbalgie = chronischer Kreuzschmerz; Hernie = Eingeweidebruch; Bursitis = Schleimbeutelentzündung; Myogelose = umschriebene/knotenförmige Muskelverhärtung.',
        'Unterscheide Platt-, Spreiz-, Senk- und Hohlfuß.|||Plattfuß: Längs- und Quergewölbe abgesenkt; Spreizfuß: Quergewölbe abgesenkt; Senkfuß: Längsgewölbe abgesenkt; Hohlfuß: Längsgewölbe überhöht.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-diagnostik',
    title: 'PDF-Erweiterung: Diagnostische Verfahren',
    content: [
      { type: 'heading', title: 'Fünf Verfahren unterscheiden' },
      { type: 'image', src: diagnosticVisual, alt: 'Vergleich Sonografie Röntgen CT MRT Endoskopie', caption: 'Die Verfahren unterscheiden sich vor allem durch physikalisches Prinzip und typische Darstellung.' },
      { type: 'table', headers: ['Verfahren', 'Grundprinzip'], rows: [['Sonografie','nicht hörbare Schallwellen werden im Gewebe unterschiedlich reflektiert'],['Röntgen','Röntgenstrahlen werden von Geweben unterschiedlich stark abgeschwächt/absorbiert'],['CT','Röntgentechnik mit vielen Projektionen und rechnerisch erzeugten Schnittbildern'],['MRT','starkes Magnetfeld und Hochfrequenzimpulse; besonders geeignet für viele Weichteilfragestellungen'],['Endoskopie','direkter Einblick in Hohlorgane mit Licht, Optik/Kamera und flexiblem oder starrem Endoskop']] },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Welches Verfahren arbeitet mit Ultraschall?|||Sonografie.',
        'Welche beiden Verfahren verwenden Röntgenstrahlung?|||Konventionelles Röntgen und CT.',
        'Welches Verfahren ist für Bandscheiben/Weichteile häufig besonders geeignet?|||MRT.',
        'Was ist eine Endoskopie?|||Direkte Betrachtung eines Hohlorgans/Körperraums mit einem Endoskop, Licht und Optik/Kamera.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-arzneimittel-grundlagen',
    title: 'PDF-Erweiterung: Arzneimittel – Definition, Wirkung & Bestandteile',
    content: [
      { type: 'heading', title: 'Definition nach Lernunterlage' },
      { type: 'text', text: 'Arzneimittel sind Stoffe oder Zubereitungen, die am oder im Körper eingesetzt werden, um Krankheiten zu heilen, zu lindern oder zu verhüten, körpereigene Stoffe zu ersetzen, Erreger zu bekämpfen oder Körperfunktionen zu beeinflussen.' },
      { type: 'heading', title: 'Drei Wirkmechanismen der Unterlage' },
      { type: 'table', headers: ['Begriff', 'Lernidee'], rows: [['pharmakologisch','Wirkstoff wirkt über pharmakologische Wechselwirkungen direkt auf Körperfunktionen'],['metabolisch','Wirkung hängt mit Stoffwechselvorgängen bzw. aktiven Abbau-/Umbauprodukten zusammen'],['immunologisch','Arzneimittel löst oder beeinflusst eine Reaktion des Immunsystems']] },
      { type: 'heading', title: 'Wirkstoff und Hilfsstoffe' },
      { type: 'text', text: 'Ein Arzneimittel enthält mindestens einen Wirkstoff und kann Hilfsstoffe enthalten. Hilfsstoffe helfen z. B. beim Füllen, Lösen, Stabilisieren oder Verarbeiten. Der Wirkstoff ist für die beabsichtigte pharmakologische Wirkung entscheidend.' },
      { type: 'warning', title: 'Quellenformulierung richtig einordnen', text: 'Die Unterlage bezeichnet Hilfsstoffe als „Hauptbestandteil“ und Wirkstoff als „Nebenbestandteil“. Das kann sich auf die mengenmäßige Zusammensetzung einzelner Zubereitungen beziehen. Therapeutisch entscheidend ist der Wirkstoff; Hilfsstoffanteile sind je nach Arzneiform sehr unterschiedlich.' },
      { type: 'definition', term: 'Monopräparat', definition: 'Arzneimittel mit einem Wirkstoff.' },
      { type: 'definition', term: 'Kombinationspräparat', definition: 'Arzneimittel mit mehreren Wirkstoffen.' },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Nenne die Arzneimitteldefinition in eigenen Worten.|||Arzneimittel werden am/im Körper eingesetzt, um Krankheiten zu heilen/lindern/verhüten, Stoffe zu ersetzen, Erreger zu bekämpfen oder Körperfunktionen zu beeinflussen.',
        'Nenne die drei Wirkmechanismen aus der Unterlage.|||Pharmakologisch, metabolisch und immunologisch.',
        'Was ist der Unterschied zwischen Wirkstoff und Hilfsstoff?|||Der Wirkstoff vermittelt die beabsichtigte pharmakologische Wirkung; Hilfsstoffe unterstützen Herstellung, Stabilität, Löslichkeit, Form oder Anwendung.',
        'Was ist ein Mono- und was ein Kombinationspräparat?|||Monopräparat = ein Wirkstoff; Kombinationspräparat = mehrere Wirkstoffe.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-applikation',
    title: 'PDF-Erweiterung: Applikationsarten vollständig',
    content: [
      { type: 'heading', title: 'Applikationswege' },
      { type: 'table', headers: ['Applikationsart', 'Bedeutung'], rows: applicationRows },
      { type: 'heading', title: 'Lokal oder systemisch?' },
      { type: 'text', text: '„Lokal“ beschreibt eine vorwiegend örtlich begrenzte Anwendung/Wirkung. „Systemisch“ bedeutet, dass der Wirkstoff nach Aufnahme oder direkter Gabe den Gesamtorganismus erreichen und dort wirken kann. Der Applikationsweg allein entscheidet nicht immer vollständig über das Wirkprofil.' },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Übersetze nasal, pulmonal, bukkal, sublingual und rektal.|||Nasal = über/in die Nase; pulmonal = über Lunge/Atemwege; bukkal = über die Wangenschleimhaut; sublingual = unter die Zunge; rektal = in den Mastdarm.',
        'Übersetze i.v., s.c. und i.m.|||i.v. = intravenös/in die Vene; s.c. = subkutan/in das Unterhautfettgewebe; i.m. = intramuskulär/in den Muskel.',
        'Was ist der Unterschied zwischen lokal und systemisch?|||Lokal = vorwiegend örtlich begrenzt; systemisch = Wirkung bzw. Verteilung im Gesamtorganismus.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-arzneigruppen-1',
    title: 'PDF-Erweiterung: Arzneimittelgruppen 1',
    content: [
      { type: 'heading', title: 'Indikationsgruppen aus der Unterlage' },
      { type: 'table', headers: ['Gruppe', 'Bedeutung'], rows: drugGroups1 },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Was sind Analgetika, Antiemetika, Antipyretika und Antiphlogistika?|||Analgetika = Schmerzmittel; Antiemetika = gegen Übelkeit/Erbrechen; Antipyretika = fiebersenkend; Antiphlogistika = entzündungshemmend.',
        'Was sind Antibiotika, Antimykotika und Antihelminthika?|||Antibiotika = gegen bakterielle Infektionen; Antimykotika = gegen Pilzinfektionen; Antihelminthika = gegen Wurminfektionen.',
        'Was sind Antikoagulanzien und Diuretika?|||Antikoagulanzien hemmen die Blutgerinnung; Diuretika fördern die Harnausscheidung.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-arzneigruppen-2',
    title: 'PDF-Erweiterung: Arzneimittelgruppen 2',
    content: [
      { type: 'heading', title: 'Weitere Indikationsgruppen' },
      { type: 'table', headers: ['Gruppe', 'Bedeutung'], rows: drugGroups2 },
      { type: 'info', title: 'Begriffe im Wandel', text: 'Einige Bezeichnungen der Unterlage sind ältere Sammelbegriffe. Für die Prüfung ist die Zuordnung wichtig; in aktueller Fachsprache können präzisere Bezeichnungen verwendet werden, z. B. Bronchodilatatoren statt „Bronchiolytika“.' },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Was sind Hämostyptika, Lokalanästhetika und Spasmolytika?|||Hämostyptika = blutstillende Mittel; Lokalanästhetika = Mittel zur örtlichen Betäubung; Spasmolytika = krampflösende Mittel.',
        'Unterscheide Serum/Sera und Impfstoffe.|||Sera enthalten fertige Antikörper und stehen für passive Immunisierung; Impfstoffe regen eine aktive Immunantwort an.',
        'Was machen Antacida, Laxantia und Zytostatika?|||Antacida neutralisieren Magensäure; Laxantia wirken abführend; Zytostatika hemmen Zellteilung/-wachstum.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-injektionen',
    title: 'PDF-Erweiterung: Injektionsarten, Delegation & 6-R-Regel',
    content: [
      { type: 'heading', title: 'Injektionsarten aus der Unterlage' },
      { type: 'table', headers: ['Abkürzung / Begriff', 'Ort'], rows: [['i.m. / intramuskulär','in einen Muskel'],['i.v. / intravenös','in eine Vene'],['s.c. / subkutan','in das Unterhautfettgewebe'],['intrakardial','in/ans Herz – hochspezialisierte Notfall-/Sondersituation'],['intralumbal','in den lumbalen Spinal-/Liquorraum – ärztliche Spezialmaßnahme'],['intraarteriell','in eine Arterie'],['intraartikulär','in eine Gelenkhöhle'],['intraossär','in den Knochenmarkraum']] },
      { type: 'heading', title: 'Delegation' },
      { type: 'list', items: ['Auswahlpflicht: geeignete Person auswählen', 'Anleitungspflicht: ausreichende Anleitung/Einweisung gewährleisten', 'Überwachungspflicht: angemessene Kontrolle und Erreichbarkeit sicherstellen'] },
      { type: 'heading', title: '6-R-Regel der PDF-Unterlage' },
      { type: 'list', items: ['richtiger Patient', 'richtiges Medikament', 'richtige Dosierung', 'richtige Applikation', 'richtiger Zeitpunkt', 'richtige Dokumentation'] },
      { type: 'heading', title: 'Intramuskuläre Injektion – Quellenwerte' },
      { type: 'text', text: 'Die Unterlage nennt als Lernwert für i.m.-Injektionen 2–4 ml und eine Ausnahme bis 10 ml sowie Gluteus medius und M. deltoideus als Injektionsregionen. Sie listet außerdem Situationen auf, in denen i.m. nicht verabreicht werden soll, z. B. Gerinnungsstörungen oder lokale Hautschäden.' },
      { type: 'warning', title: 'Praxis statt starre Zahl', text: 'Injektionsvolumen, Injektionsort, Kanülenwahl und Kontraindikationen hängen vom Präparat, Muskel, Alter/Körperbau, Indikation und dem aktuellen Praxisstandard ab. Die Zahlen der Unterlage werden hier als Prüfungsstoff gekennzeichnet, nicht als allgemeine Handlungsanweisung.' },
      { type: 'image', src: injectionVisual, alt: 'Ablauf einer sicheren Injektion', caption: 'Der Ablauf verbindet Medikamentensicherheit, Hygiene, korrekte Technik, Entsorgung, Beobachtung und Dokumentation.' },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Ordne i.m., i.v. und s.c. dem richtigen Gewebe zu.|||i.m. = Muskel; i.v. = Vene; s.c. = Unterhautfettgewebe.',
        'Welche drei Pflichten nennt die Unterlage bei Delegation?|||Auswahlpflicht, Anleitungspflicht und Überwachungspflicht.',
        'Nenne die sechs Punkte der 6-R-Regel der PDF-Unterlage.|||Richtiger Patient, richtiges Medikament, richtige Dosierung, richtige Applikation, richtiger Zeitpunkt, richtige Dokumentation.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-injektion-ablauf',
    title: 'PDF-Erweiterung: Injektion vorbereiten, durchführen & nachbereiten',
    content: [
      { type: 'heading', title: 'Material und Aufziehen' },
      { type: 'list', items: ['Medikament und ärztliche Anordnung prüfen', 'Spritze, passende Kanüle(n), Tupfer, Hautantiseptikum, Pflaster und stichfesten Abwurf vorbereiten', 'Händedesinfektion durchführen', 'Ampulle/Behältnis entsprechend Herstellerangaben sicher öffnen und Arzneimittel aseptisch aufziehen', 'Ampulle/Originalbehältnis bis nach Identitätskontrolle und Gabe aufbewahren', 'bei Wechsel von Aufzieh- zu Injektionskanüle sichere Arbeitstechnik und Needle-Stick-Prävention beachten'] },
      { type: 'warning', title: 'Quellenablauf versus heutige SOP', text: 'Die PDF enthält einzelne konkrete Handgriffe zum Ampullenbrechen und Kanülenwechsel. Für die reale Durchführung gelten aktuelle Arbeitsschutz-, Hygiene-, Hersteller- und Praxisvorgaben; insbesondere werden Kanülen nicht unnötig manuell manipuliert.' },
      { type: 'heading', title: 'Durchführung und Nachsorge' },
      { type: 'list', items: ['Händehygiene und erforderliche Schutzausrüstung', 'Injektionsstelle korrekt auswählen und desinfizieren', 'je nach Injektionsart geeignete Technik anwenden', 'Medikament kontrolliert applizieren', 'Kanüle sicher entfernen und sofort in stichfestem Behälter entsorgen', 'Punktionsstelle versorgen', 'Patient beobachten und nach Befinden fragen', 'Arbeitsplatz hygienisch nachbereiten', 'vollständig dokumentieren'] },
      { type: 'heading', title: 'Komplikationen aus der Unterlage' },
      { type: 'table', headers: ['Situation', 'Mögliche Bedeutung / Reaktion'], rows: [['starker Schmerz beim Einstich','mögliche Nervenreizung/-verletzung; Vorgang stoppen und beurteilen'],['Hinweis auf Gefäßtreffer','Technik nicht einfach fortsetzen; nach Standard neu beurteilen/ansetzen'],['ungewöhnlicher Widerstand','nicht mit Gewalt injizieren; Lage/Technik überprüfen'],['Folgen','Unverträglichkeitsreaktion, Hämatom, Nervenverletzung, Spritzenabszess, Gewebeschädigung']] },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Nenne fünf Materialien für eine Injektion.|||Zum Beispiel Medikament, Spritze, passende Kanüle, Tupfer, Hautantiseptikum, Pflaster, Handschuhe je nach Tätigkeit und stichfester Abwurf.',
        'Was muss nach der Injektion dokumentiert werden?|||Mindestens verabreichtes Arzneimittel/Präparat, Dosis, Applikationsweg/-ort, Zeitpunkt sowie relevante Besonderheiten entsprechend Praxisstandard.',
        'Nenne drei mögliche Komplikationen.|||Zum Beispiel Hämatom, Nervenverletzung, Unverträglichkeitsreaktion, Spritzenabszess oder Gewebeschädigung.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-hautdesinfektion',
    title: 'PDF-Erweiterung: Hautdesinfektion & Infektionsrisiko',
    content: [
      { type: 'heading', title: 'Risikoeinteilung der Lernunterlage' },
      { type: 'table', headers: ['Risikostufe in der Unterlage', 'Beispiele', 'Grundidee'], rows: [['gering','i.v., s.c., i.c. Injektion','Punktionsstelle antiseptisch behandeln und Einwirkzeit einhalten'],['mittel','peripherer Venenkatheter, i.m. Injektion, Blutentnahme','sorgfältige Hautantiseptik mit sterilem Material nach Standard'],['hoch','Punktion von Körperhöhlen, z. B. Gelenkpunktion','erweiterte antiseptische Vorbereitung und besonders strenge Asepsis']] },
      { type: 'warning', title: 'Kontaktzeit nicht auswendig pauschalisieren', text: 'Die PDF nennt konkrete Wisch- und Einwirkzeiten. In der Praxis gelten das verwendete Hautantiseptikum, Herstellerangaben und der aktuelle Hygieneplan. Die Quelle wird als Lernschema abgebildet, ohne daraus eine universelle Einwirkzeit abzuleiten.' },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Welche drei Risikostufen unterscheidet die Unterlage?|||Geringes, mittleres und hohes Infektionsrisiko.',
        'Nenne je ein Beispiel für geringes, mittleres und hohes Risiko.|||Gering z. B. s.c.-Injektion; mittel z. B. i.m.-Injektion oder Blutentnahme; hoch z. B. Gelenkpunktion.',
        'Wovon hängt die erforderliche Einwirkzeit eines Hautantiseptikums ab?|||Vom verwendeten Produkt/Herstellerangaben, dem Eingriff und dem aktuellen Hygiene-/Praxisstandard.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-blutentnahme',
    title: 'PDF-Erweiterung: Blutentnahme & Präanalytik',
    content: [
      { type: 'heading', title: 'Vorbereitung' },
      { type: 'text', text: 'Die PDF enthält zusätzlich zur Injektion einen vollständigen Blutentnahme-Ablauf. Vor der Blutentnahme werden Auftrag, Patient, benötigte Röhrchen, Etiketten, Transportvorgaben und mögliche präanalytische Anforderungen geprüft.' },
      { type: 'image', src: bloodDrawVisual, alt: 'Ablauf Blutentnahme', caption: 'Vorbereitung, Entnahme, korrektes Mischen/Gerinnen, eindeutige Zuordnung und sachgerechter Transport gehören zusammen.' },
      { type: 'heading', title: 'SCHEF-Reihenfolge der Unterlage' },
      { type: 'table', headers: ['Buchstabe', 'Röhrchen'], rows: [['S','Serum'],['C','Citrat'],['H','Heparin'],['E','EDTA'],['F','Fluorid']] },
      { type: 'warning', title: 'Reihenfolge als Quellenwissen', text: 'Die PDF vermittelt die Merkhilfe SCHEF. Für reale Blutentnahmen gelten das verwendete Entnahmesystem, Laborvorgaben und der aktuelle Praxisstandard.' },
      { type: 'heading', title: 'Präanalytik aus der Unterlage' },
      { type: 'list', items: ['bestimmte Laborwerte können eine nüchterne Blutentnahme erfordern', 'Patient soll vor der Entnahme möglichst zur Ruhe kommen', 'Stress und starke körperliche Belastung können Messwerte beeinflussen', 'Serum muss vor Weiterverarbeitung gerinnen; antikoagulierte Röhrchen werden vorsichtig gemischt', 'Röhrchen eindeutig beschriften und Transportbedingungen beachten'] },
      { type: 'info', title: 'Nüchternheit nicht pauschal', text: 'Die PDF nennt für mehrere Parameter pauschal 12 Stunden Nahrungskarenz. Ob Nüchternheit nötig ist, richtet sich in der Praxis nach Fragestellung, Labor und ärztlicher Anordnung.' },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Wofür steht SCHEF?|||Serum, Citrat, Heparin, EDTA, Fluorid.',
        'Warum werden Röhrchen eindeutig mit Patientendaten/Barcode zugeordnet?|||Damit Probe und Auftrag sicher dem richtigen Patienten zugeordnet werden und Verwechslungen verhindert werden.',
        'Nenne drei präanalytische Faktoren, die vor oder nach Blutentnahme wichtig sind.|||Zum Beispiel Nüchternheit je nach Untersuchung, Ruhe/Stress, Röhrchenwahl, korrektes Mischen/Gerinnen, Temperatur und Transportzeit.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-roentgen',
    title: 'PDF-Erweiterung: Röntgen, CT & Strahlenschutz',
    content: [
      { type: 'heading', title: 'Eigenschaften von Röntgenstrahlung' },
      { type: 'list', items: ['energiereiche elektromagnetische Strahlung', 'für das Auge unsichtbar', 'durchdringt Gewebe unterschiedlich stark', 'kann biologische Zellen und Erbgut schädigen', 'daher gilt: nur gerechtfertigt anwenden und Strahlenexposition so gering wie vernünftigerweise möglich halten'] },
      { type: 'heading', title: 'Wie entsteht das Bild?' },
      { type: 'text', text: 'Dichte bzw. stark strahlenabschwächende Strukturen wie Knochen erscheinen auf dem Röntgenbild heller. Luft lässt Röntgenstrahlung stärker passieren und erscheint dunkler. Die Unterlage beschreibt dies noch mit der klassischen Negativfilm-Terminologie.' },
      { type: 'heading', title: 'Kontrastmittel und CT' },
      { type: 'table', headers: ['Begriff', 'Bedeutung'], rows: [['Kontrastmittel','erhöht Kontrast bestimmter Strukturen, damit sie besser sichtbar werden'],['Angiografie','Darstellung von Blutgefäßen'],['Urografie','Darstellung der ableitenden Harnwege/Nierenfunktion je nach Verfahren'],['CT','Röntgenröhre/Detektoren erfassen viele Projektionen; Computer berechnet Schnittbilder']] },
      { type: 'heading', title: 'Strahlenschutz und Dokumentation' },
      { type: 'text', text: 'Die PDF nennt als Voraussetzungen für MFA-Tätigkeiten im Röntgenbereich ärztliche Verantwortung/Aufsicht und regelmäßig zu aktualisierende Kenntnisse. Außerdem enthält sie ältere Lernpunkte wie Röntgenpass und pauschalen Gonadenschutz sowie Aufbewahrungsfristen.' },
      { type: 'warning', title: 'Quelle und heutige Praxis trennen', text: 'Röntgenpass, Abschirmung und konkrete Fristen werden in älteren Lernunterlagen teils anders dargestellt als in aktuellen Regelwerken. Für die reale Praxis sind die jeweils geltenden strahlenschutzrechtlichen Vorgaben und die lokale SOP maßgeblich. Die Quellenangaben bleiben hier für Prüfungsvergleich sichtbar.' },
      { type: 'table', headers: ['Frist aus der Unterlage', 'Quellenangabe'], rows: [['Röntgenuntersuchungen','10 Jahre'],['Behandlung mit Röntgenstrahlen','30 Jahre']] },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Warum erscheinen Knochen im Röntgenbild heller als luftgefüllte Bereiche?|||Knochen schwächt/absorbiert Röntgenstrahlung stärker; weniger Strahlung erreicht den Detektor. Luft schwächt wenig und erscheint daher dunkler.',
        'Was ist eine CT?|||Eine Röntgen-Schnittbildtechnik, bei der Röntgenröhre und Detektoren viele Messungen aus unterschiedlichen Richtungen liefern und ein Computer daraus Schnittbilder rekonstruiert.',
        'Was ist der Zweck eines Kontrastmittels?|||Es erhöht den Kontrast bestimmter Gewebe/Organe/Gefäße, damit sie in der Bildgebung besser erkennbar werden.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-anatomie-richtungen',
    title: 'PDF-Erweiterung: Anatomische Richtungen & Bewegungen',
    content: [
      { type: 'heading', title: 'Körperregionen' },
      { type: 'table', headers: ['Latein', 'Deutsch'], rows: [['Facies','Gesicht'],['Cervix','Hals'],['Thorax','Brustkorb'],['Dorsum','Rücken'],['Abdomen','Bauchraum']] },
      { type: 'heading', title: 'Richtungsbezeichnungen' },
      { type: 'table', headers: ['Begriff', 'Bedeutung'], rows: [['dexter','rechts'],['sinister','links'],['kranial','kopfwärts / nach oben'],['kaudal','steißwärts / nach unten'],['anterior','vorne'],['posterior','hinten'],['ventral','bauchwärts / nach vorne'],['dorsal','rückenwärts / nach hinten'],['medial','zur Körpermitte hin'],['lateral','zur Seite hin'],['superior','oben'],['inferior','unten'],['proximal','rumpfnah'],['distal','rumpffern'],['radial','zur Speiche hin'],['ulnar','zur Elle hin']] },
      { type: 'heading', title: 'Bewegungen' },
      { type: 'table', headers: ['Begriff', 'Bewegung'], rows: [['Abduktion','Abspreizen einer Extremität'],['Adduktion','Heranführen einer Extremität'],['Rotation','Drehung'],['Pronation','Drehung des Unterarms, Handfläche nach unten/hinten je nach Ausgangsstellung'],['Supination','Drehung des Unterarms, Handfläche nach oben/vorne je nach Ausgangsstellung']] },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Übersetze dexter, sinister, kranial, kaudal, medial und lateral.|||dexter = rechts; sinister = links; kranial = kopfwärts; kaudal = steißwärts; medial = zur Mitte; lateral = zur Seite.',
        'Was bedeuten proximal, distal, radial und ulnar?|||proximal = rumpfnah; distal = rumpffern; radial = zur Speiche; ulnar = zur Elle.',
        'Unterscheide Abduktion/Adduktion und Pronation/Supination.|||Abduktion = abspreizen, Adduktion = heranführen; Pronation = Unterarmdrehung mit Handfläche nach unten/hinten, Supination = Gegenbewegung mit Handfläche nach oben/vorne.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-anatomie-knie-bein',
    title: 'PDF-Erweiterung Anatomie: Knie & untere Extremität',
    content: [
      { type: 'heading', title: 'Untere Extremität' },
      { type: 'image', src: lowerLimbVisual, alt: 'Untere Extremität und Knie mit Beschriftungen', caption: 'Femur, Patella, Tibia, Fibula sowie wichtige Knie-Strukturen.' },
      { type: 'table', headers: ['Deutsch', 'Fachbegriff'], rows: [['Oberschenkelknochen','Femur'],['Kniescheibe','Patella'],['Schienbein','Tibia'],['Wadenbein','Fibula'],['Fußwurzel','Tarsus'],['Mittelfuß','Metatarsus'],['Zehenknochen','Phalanges']] },
      { type: 'heading', title: 'Kniegelenk' },
      { type: 'list', items: ['Quadrizepssehne', 'Oberschenkelknochen/Femur', 'Kniescheibe/Patella', 'Gelenkknorpel', 'Meniskus', 'Patellasehne', 'Schienbein/Tibia', 'Wadenbein/Fibula', 'Seiten-/Kollateralband'] },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Ordne Femur, Patella, Tibia und Fibula zu.|||Femur = Oberschenkelknochen; Patella = Kniescheibe; Tibia = Schienbein; Fibula = Wadenbein.',
        'Nenne vier zusätzliche Strukturen des Kniegelenks aus der Unterlage.|||Zum Beispiel Meniskus, Gelenkknorpel, Quadrizepssehne, Patellasehne und Seitenband.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-anatomie-fuss',
    title: 'PDF-Erweiterung Anatomie: Fuß',
    content: [
      { type: 'heading', title: 'Knochen und Gewölbe' },
      { type: 'image', src: footVisual, alt: 'Fußknochen und Fußgewölbe', caption: 'Die PDF verlangt sowohl die großen Fußknochen-Gruppen als auch wichtige Einzelknochen und die beiden Gewölbe.' },
      { type: 'list', items: ['Tibia / Schienbein', 'Fibula / Wadenbein', 'Talus / Sprungbein', 'Calcaneus / Fersenbein', 'Os naviculare / Kahnbein', 'Ossa cuneiformia / Keilbeine', 'Os cuboideum / Würfelbein', 'Metatarsalia / Mittelfußknochen', 'Phalangen / Zehenknochen', 'Längsgewölbe', 'Quergewölbe'] },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Wie heißen Sprungbein und Fersenbein auf Latein?|||Talus und Calcaneus.',
        'Nenne Kahnbein, Keilbeine und Würfelbein.|||Os naviculare = Kahnbein; Ossa cuneiformia = Keilbeine; Os cuboideum = Würfelbein.',
        'Welche zwei Fußgewölbe werden unterschieden?|||Längsgewölbe und Quergewölbe.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-anatomie-schulter-hand',
    title: 'PDF-Erweiterung Anatomie: Schultergürtel, Arm & Hand',
    content: [
      { type: 'heading', title: 'Schulter und Hand' },
      { type: 'image', src: upperLimbVisual, alt: 'Schultergürtel, Arm und Hand', caption: 'Schlüsselbein, Schulterblatt, Oberarmknochen, Elle, Speiche und die Knochen der Hand.' },
      { type: 'table', headers: ['Deutsch', 'Latein'], rows: [['Schlüsselbein','Clavicula'],['Schulterblatt','Scapula'],['Oberarmknochen','Humerus'],['Elle','Ulna'],['Speiche','Radius'],['Handwurzelknochen','Ossa carpi / Carpus'],['Mittelhandknochen','Ossa metacarpi / Metacarpus'],['Fingerknochen','Phalanges']] },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Übersetze Clavicula, Scapula, Humerus, Ulna und Radius.|||Clavicula = Schlüsselbein; Scapula = Schulterblatt; Humerus = Oberarmknochen; Ulna = Elle; Radius = Speiche.',
        'Wie heißen Handwurzel-, Mittelhand- und Fingerknochen?|||Carpus/Ossa carpi, Metacarpus/Ossa metacarpi und Phalanges.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-anatomie-thorax',
    title: 'PDF-Erweiterung Anatomie: Brustkorb',
    content: [
      { type: 'heading', title: 'Thorax von vorne und im Querschnitt' },
      { type: 'image', src: thoraxVisual, alt: 'Brustkorb mit wichtigen Strukturen', caption: 'Sternum, Rippen, Rippenknorpel, Intercostalraum und die Strukturen eines Thoraxquerschnitts.' },
      { type: 'table', headers: ['Begriff', 'Bedeutung'], rows: [['Thorax','Brustkorb'],['Sternum','Brustbein'],['Costae','Rippen'],['Intercostalraum / ICR','Zwischenrippenraum'],['Rippenknorpel','knorpelige Verbindung der Rippen nach ventral'],['Wirbelkanal','Kanal innerhalb der Wirbelsäule für Rückenmark/Strukturen'],['Bandscheibe','Faserknorpelige Struktur zwischen Wirbelkörpern']] },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Übersetze Sternum, Costae und Intercostalraum.|||Sternum = Brustbein; Costae = Rippen; Intercostalraum = Zwischenrippenraum.',
        'Nenne drei Strukturen im Thoraxquerschnitt der Unterlage.|||Zum Beispiel Wirbel, Wirbelkanal, Bandscheibe, Rippe, Rippenknorpel und Sternum.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-anatomie-becken',
    title: 'PDF-Erweiterung Anatomie: Becken & Hüfte',
    content: [
      { type: 'heading', title: 'Becken und Hüftgelenk' },
      { type: 'image', src: pelvisVisual, alt: 'Becken und Hüftgelenk mit Beschriftungen', caption: 'Beckenknochen und das Kugelgelenk der Hüfte werden getrennt, aber zusammenhängend gelernt.' },
      { type: 'table', headers: ['Struktur', 'Begriff'], rows: [['Darmbein','Os ilium'],['Kreuzbein','Os sacrum'],['Steißbein','Os coccygis'],['Schambein','Os pubis'],['Sitzbein','Os ischii'],['Schambeinfuge','Symphysis pubica'],['Hüftpfanne','Acetabulum'],['Oberschenkelkopf','Caput femoris'],['Oberschenkelhals','Collum femoris'],['Oberschenkelknochen','Femur']] },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Nenne Darmbein, Kreuzbein, Schambein und Sitzbein mit Fachbegriff.|||Os ilium, Os sacrum, Os pubis und Os ischii.',
        'Wie heißen Hüftpfanne, Oberschenkelkopf und Oberschenkelhals?|||Acetabulum, Caput femoris und Collum femoris.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-anatomie-wirbelsaeule',
    title: 'PDF-Erweiterung Anatomie: Wirbelsäule',
    content: [
      { type: 'heading', title: 'Abschnitte sicher lernen' },
      { type: 'image', src: spineDetailVisual, alt: 'Wirbelsäule mit Abschnitten und Krümmungen', caption: '7 Hals-, 12 Brust-, 5 Lendenwirbel sowie Kreuzbein und Steißbein.' },
      { type: 'table', headers: ['Abschnitt', 'Anzahl', 'Krümmung'], rows: [['HWS','7 Halswirbel C1–C7','Lordose'],['BWS','12 Brustwirbel Th1–Th12','Kyphose'],['LWS','5 Lendenwirbel L1–L5','Lordose'],['Kreuzbein','5 verschmolzene Sakralwirbel','Kyphose'],['Steißbein','mehrere verschmolzene Steißwirbel','Fortsetzung nach kaudal']] },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Wie viele Wirbel haben HWS, BWS und LWS?|||HWS 7, BWS 12, LWS 5.',
        'Welche Abschnitte sind lordotisch und welche kyphotisch gekrümmt?|||HWS und LWS: Lordose; BWS und Kreuzbein: Kyphose.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-anatomie-schaedel',
    title: 'PDF-Erweiterung Anatomie: Schädel',
    content: [
      { type: 'heading', title: 'Schädelknochen und Räume' },
      { type: 'image', src: skullVisual, alt: 'Schädel mit wichtigen Knochen', caption: 'Die Abbildung enthält sämtliche in der PDF-Lösung beschrifteten Schädelstrukturen.' },
      { type: 'table', headers: ['Deutsch', 'Latein / Fachbegriff'], rows: [['Stirnbein','Os frontale'],['Scheitelbein','Os parietale'],['Keilbein','Os sphenoidale'],['Schläfenbein','Os temporale'],['Jochbein','Os zygomaticum'],['Nasenbein','Os nasale'],['Pflugscharbein','Vomer'],['Oberkiefer','Maxilla'],['Unterkiefer','Mandibula'],['Augenhöhle','Orbita'],['Warzenfortsatz','Processus mastoideus'],['Kieferhöhle','Sinus maxillaris']] },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Übersetze Cranium, Orbita, Maxilla und Mandibula.|||Cranium = Schädel; Orbita = Augenhöhle; Maxilla = Oberkiefer; Mandibula = Unterkiefer.',
        'Nenne Stirnbein, Scheitelbein, Schläfenbein und Jochbein mit Fachbegriff.|||Os frontale, Os parietale, Os temporale, Os zygomaticum.',
        'Was sind Processus mastoideus und Sinus maxillaris?|||Processus mastoideus = Warzenfortsatz; Sinus maxillaris = Kieferhöhle.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-skelett-vokabeln',
    title: 'PDF-Erweiterung: Skelettvokabeln',
    content: [
      { type: 'heading', title: 'Muskel- und Skelettbegriffe' },
      { type: 'table', headers: ['Fachbegriff', 'Bedeutung'], rows: [['Agonisten','gleichgerichtet bzw. in einer Bewegung führend arbeitende Muskeln'],['Antagonisten','Gegenspieler; wirken einer Bewegung entgegen'],['Skelett','Knochengerüst'],['Tonus','Spannungszustand der Muskulatur'],['Cranium','Schädel'],['Orbita','Augenhöhle'],['Maxilla','Oberkiefer'],['Mandibula','Unterkiefer'],['Clavicula','Schlüsselbein'],['Scapula','Schulterblatt'],['Columna vertebralis','Wirbelsäule'],['Thorax','Brustkorb'],['Sternum','Brustbein'],['Costae','Rippen'],['Humerus','Oberarmknochen'],['Ulna','Elle'],['Radius','Speiche']] },
      { type: 'heading', title: 'Übungen' },
      { type: 'list', items: [
        'Was sind Agonist und Antagonist?|||Agonist = Muskel, der eine Bewegung hauptsächlich ausführt; Antagonist = Gegenspieler, der die Gegenbewegung unterstützt/ermöglicht.',
        'Übersetze Cranium, Clavicula, Scapula, Columna vertebralis, Sternum und Costae.|||Schädel, Schlüsselbein, Schulterblatt, Wirbelsäule, Brustbein und Rippen.',
        'Übersetze Humerus, Ulna und Radius.|||Oberarmknochen, Elle und Speiche.',
      ] },
    ],
  },
  {
    id: 'lf4-pdf-originaltest-training',
    title: 'PDF-Erweiterung: Originale Testinhalte trainieren',
    content: [
      { type: 'heading', title: 'Arzneimittel & Erkrankungen' },
      { type: 'list', items: [
        'Nenne die drei Wirkmechanismen.|||Pharmakologisch, metabolisch und immunologisch.',
        'Woraus bestehen Arzneimittel grundsätzlich?|||Aus einem oder mehreren Wirkstoffen und je nach Zubereitung Hilfsstoffen.',
        'Übersetze Lumbago, Lumbalgie, Hernie, Bursitis, Rachitis, Hallux valgus und Myogelose.|||Lumbago = akuter Kreuzschmerz; Lumbalgie = chronischer Kreuzschmerz; Hernie = Eingeweidebruch; Bursitis = Schleimbeutelentzündung; Rachitis = Knochenerweichung/-verformung im Kindesalter; Hallux valgus = Großzehenfehlstellung/Ballenzeh; Myogelose = umschriebene Muskelverhärtung.',
      ] },
      { type: 'heading', title: 'Gelenke & Knorpel' },
      { type: 'list', items: [
        'Nenne fünf Anamnesearten mit je einem Beispiel.|||Zum Beispiel frühere Anamnese–Operation, Medikamentenanamnese–Selbstmedikation, vegetative–Schlaf, soziale–Beruf/Familie, psychische–seelische Befindlichkeit.',
        'Nenne die drei Knorpelarten und je ein Vorkommen.|||Hyalin–Gelenk/Rippenknorpel; elastisch–Ohrmuschel; Faserknorpel–Bandscheibe/Meniskus.',
        'Ordne die Arthrose-Stadien.|||Stadium I: Elastizitätsverlust/Sprödigkeit; Stadium II: Knorpelabbau/Randwülste; Stadium III: Fragmente/Blockierung.',
      ] },
      { type: 'heading', title: 'Knochen & Fraktur' },
      { type: 'list', items: [
        'Nenne die Knochenbestandteile im 2/3-1/3-Lernmodell.|||2/3 Knochensalze; 1/3 kollagene Fasern.',
        'Nenne Osteozyt, Osteoblast, Osteoklast und Osteon mit Bedeutung.|||Osteozyt = Knochenzelle; Osteoblast = Aufbau; Osteoklast = Abbau; Osteon = Baueinheit der Kompakta.',
        'Nenne vier Frakturarten und zwei Komplikationen.|||Geschlossen, offen, Grünholz, Trümmer; mögliche Komplikationen z. B. Gefäß-/Nervenverletzung, Arthrose, Wachstumsstörung, Fettembolie, Osteomyelitis.',
      ] },
    ],
  },
];

const pdfQuestions: QuizQuestion[] = [
  { id: 4101, question: 'Welche Anamnese bezieht sich besonders auf Schlaf und Appetit?', type: 'single', options: [{ id: 'a', text: 'Vegetative Anamnese', correct: true }, { id: 'b', text: 'Familienanamnese' }, { id: 'c', text: 'Fremdanamnese' }, { id: 'd', text: 'Frühere Anamnese' }], explanation: 'Schlaf, Appetit und andere körperliche Grundfunktionen gehören zur vegetativen Anamnese.', points: 2 },
  { id: 4102, question: 'Welche vier Untersuchungsmethoden gehören zusammen?', type: 'multiple', options: [{ id: 'a', text: 'Inspektion', correct: true }, { id: 'b', text: 'Palpation', correct: true }, { id: 'c', text: 'Perkussion', correct: true }, { id: 'd', text: 'Auskultation', correct: true }, { id: 'e', text: 'Reposition' }], explanation: 'Inspektion, Palpation, Perkussion und Auskultation sind die vier Grundmethoden der klinischen Untersuchung.', points: 4 },
  { id: 4103, question: 'Wofür steht die PECH-Regel?', type: 'text', correctAnswer: 'Pause,Eis,Compression,Hochlagerung', explanation: 'P = Pause, E = Eis/Kühlen, C = Compression/Kompression, H = Hochlagerung.', points: 4 },
  { id: 4104, question: 'Welche drei Knorpelarten nennt die Unterlage?', type: 'multiple', options: [{ id: 'a', text: 'Hyaliner Knorpel', correct: true }, { id: 'b', text: 'Elastischer Knorpel', correct: true }, { id: 'c', text: 'Faserknorpel', correct: true }, { id: 'd', text: 'Kompaktknorpel' }], explanation: 'Hyaliner, elastischer und Faserknorpel.', points: 3 },
  { id: 4105, question: 'Was beschreibt Stadium II im Arthrose-Lernmodell?', type: 'single', options: [{ id: 'a', text: 'Vollständig gesundes Gelenk' }, { id: 'b', text: 'Knorpelabbau, unebene Gelenkfläche und Randwülste', correct: true }, { id: 'c', text: 'Nur Muskelatrophie' }, { id: 'd', text: 'Ausschließlich eine Infektion' }], explanation: 'Stadium II wird in der PDF mit deutlicherem Knorpelabbau, unebener Fläche und Randwülsten beschrieben.', points: 2 },
  { id: 4106, question: 'Welche Aussage zu Osteoblasten und Osteoklasten stimmt?', type: 'single', options: [{ id: 'a', text: 'Osteoblasten bauen Knochen auf, Osteoklasten bauen ihn ab', correct: true }, { id: 'b', text: 'Beide sind Knorpelzellen' }, { id: 'c', text: 'Osteoklasten bilden nur Blut' }, { id: 'd', text: 'Osteoblasten sind Gelenkflüssigkeit' }], explanation: 'Osteoblasten sind knochenaufbauend, Osteoklasten knochenabbauend.', points: 2 },
  { id: 4107, question: 'Welche Frakturform kommt typisch bei Kindern vor?', type: 'single', options: [{ id: 'a', text: 'Grünholzfraktur', correct: true }, { id: 'b', text: 'Luxation' }, { id: 'c', text: 'Bursitis' }, { id: 'd', text: 'Osteon' }], explanation: 'Die Grünholzfraktur ist typisch für den elastischeren kindlichen Knochen.', points: 2 },
  { id: 4108, question: 'Welche Begriffe gehören zu sicheren Frakturzeichen aus der Unterlage?', type: 'multiple', options: [{ id: 'a', text: 'Fehlstellung', correct: true }, { id: 'b', text: 'offener Knochenbruch/Knochen durch die Haut', correct: true }, { id: 'c', text: 'Krepitation', correct: true }, { id: 'd', text: 'Appetitverlust' }], explanation: 'Die Unterlage nennt Fehlstellung, offenen Knochenbruch und Krepitation.', points: 3 },
  { id: 4109, question: 'Wo treten Bandscheibenvorfälle laut Unterlage häufig auf?', type: 'multiple', options: [{ id: 'a', text: 'C5/C6 und C6/C7', correct: true }, { id: 'b', text: 'L4/L5 und L5/S1', correct: true }, { id: 'c', text: 'nur im Kreuzbein' }, { id: 'd', text: 'nur im Steißbein' }], explanation: 'Die PDF nennt C5/C6, C6/C7 sowie L4/L5 und L5/S1 als häufige Lokalisationen.', points: 4 },
  { id: 4110, question: 'Was bedeutet Osteodensitometrie?', type: 'single', options: [{ id: 'a', text: 'Knochendichtemessung', correct: true }, { id: 'b', text: 'Gelenkpunktion' }, { id: 'c', text: 'Blutdruckmessung' }, { id: 'd', text: 'Endoskopie' }], explanation: 'Osteodensitometrie bezeichnet die Messung der Knochendichte.', points: 2 },
  { id: 4111, question: 'Was bedeutet Lumbago?', type: 'single', options: [{ id: 'a', text: 'akuter Kreuzschmerz', correct: true }, { id: 'b', text: 'chronischer Kreuzschmerz' }, { id: 'c', text: 'Schleimbeutelentzündung' }, { id: 'd', text: 'Großzehenfehlstellung' }], explanation: 'Lumbago = akuter Kreuzschmerz („Hexenschuss“).', points: 2 },
  { id: 4112, question: 'Welche Verfahren verwenden Röntgenstrahlung?', type: 'multiple', options: [{ id: 'a', text: 'konventionelles Röntgen', correct: true }, { id: 'b', text: 'CT', correct: true }, { id: 'c', text: 'MRT' }, { id: 'd', text: 'Sonografie' }], explanation: 'Röntgen und CT verwenden ionisierende Röntgenstrahlung; MRT und Sonografie nicht.', points: 3 },
  { id: 4113, question: 'Was ist ein Monopräparat?', type: 'single', options: [{ id: 'a', text: 'ein Arzneimittel mit einem Wirkstoff', correct: true }, { id: 'b', text: 'ein Arzneimittel ohne Wirkstoff' }, { id: 'c', text: 'immer ein Impfstoff' }, { id: 'd', text: 'ein Röntgenkontrastmittel' }], explanation: 'Monopräparate enthalten einen Wirkstoff; Kombinationspräparate mehrere.', points: 2 },
  { id: 4114, question: 'Welche drei Wirkmechanismen nennt die PDF?', type: 'multiple', options: [{ id: 'a', text: 'pharmakologisch', correct: true }, { id: 'b', text: 'metabolisch', correct: true }, { id: 'c', text: 'immunologisch', correct: true }, { id: 'd', text: 'mechanisch-radiologisch' }], explanation: 'Pharmakologisch, metabolisch und immunologisch.', points: 3 },
  { id: 4115, question: 'Was bedeutet sublingual?', type: 'single', options: [{ id: 'a', text: 'unter der Zunge', correct: true }, { id: 'b', text: 'unter der Haut' }, { id: 'c', text: 'in die Vene' }, { id: 'd', text: 'in den Muskel' }], explanation: 'Sublingual bedeutet Anwendung unter der Zunge.', points: 2 },
  { id: 4116, question: 'Welche Gruppe wirkt gegen Übelkeit und Erbrechen?', type: 'single', options: [{ id: 'a', text: 'Antiemetika', correct: true }, { id: 'b', text: 'Diuretika' }, { id: 'c', text: 'Laxantia' }, { id: 'd', text: 'Antipyretika' }], explanation: 'Antiemetika werden gegen Übelkeit und Erbrechen eingesetzt.', points: 2 },
  { id: 4117, question: 'Welche Gruppe wirkt fiebersenkend?', type: 'single', options: [{ id: 'a', text: 'Antipyretika', correct: true }, { id: 'b', text: 'Antikoagulanzien' }, { id: 'c', text: 'Antimykotika' }, { id: 'd', text: 'Hypnotika' }], explanation: 'Antipyretika wirken fiebersenkend.', points: 2 },
  { id: 4118, question: 'Was ist der Unterschied zwischen Sera und Impfstoffen im Lernmodell?', type: 'single', options: [{ id: 'a', text: 'Sera liefern fertige Antikörper, Impfstoffe regen eine aktive Immunantwort an', correct: true }, { id: 'b', text: 'Es gibt keinen Unterschied' }, { id: 'c', text: 'Impfstoffe sind immer Antibiotika' }, { id: 'd', text: 'Sera sind Schmerzmittel' }], explanation: 'Sera stehen für passive Immunisierung, Impfstoffe für aktive Immunisierung.', points: 3 },
  { id: 4119, question: 'Welche drei Delegationspflichten nennt die PDF?', type: 'multiple', options: [{ id: 'a', text: 'Auswahlpflicht', correct: true }, { id: 'b', text: 'Anleitungspflicht', correct: true }, { id: 'c', text: 'Überwachungspflicht', correct: true }, { id: 'd', text: 'Urlaubspflicht' }], explanation: 'Auswahl, Anleitung und Überwachung.', points: 3 },
  { id: 4120, question: 'Welche sechs Punkte enthält die 6-R-Regel der PDF?', type: 'multiple', options: [{ id: 'a', text: 'richtiger Patient', correct: true }, { id: 'b', text: 'richtiges Medikament', correct: true }, { id: 'c', text: 'richtige Dosierung', correct: true }, { id: 'd', text: 'richtige Applikation', correct: true }, { id: 'e', text: 'richtiger Zeitpunkt', correct: true }, { id: 'f', text: 'richtige Dokumentation', correct: true }, { id: 'g', text: 'richtige Zimmerfarbe' }], explanation: 'Patient, Medikament, Dosierung, Applikation, Zeitpunkt und Dokumentation.', points: 6 },
  { id: 4121, question: 'Wofür steht die Merkhilfe SCHEF bei der Blutentnahme?', type: 'text', correctAnswer: 'Serum,Citrat,Heparin,EDTA,Fluorid', explanation: 'SCHEF = Serum, Citrat, Heparin, EDTA, Fluorid.', points: 5 },
  { id: 4122, question: 'Warum erscheinen Knochen auf Röntgenbildern relativ hell?', type: 'single', options: [{ id: 'a', text: 'Sie schwächen Röntgenstrahlung stark ab', correct: true }, { id: 'b', text: 'Sie enthalten besonders viel Luft' }, { id: 'c', text: 'Sie erzeugen Ultraschall' }, { id: 'd', text: 'Sie senden sichtbares Licht aus' }], explanation: 'Knochen schwächen Röntgenstrahlung stärker ab, sodass weniger Strahlung den Detektor erreicht.', points: 2 },
  { id: 4123, question: 'Was bedeuten dexter und sinister?', type: 'single', options: [{ id: 'a', text: 'rechts und links', correct: true }, { id: 'b', text: 'oben und unten' }, { id: 'c', text: 'vorne und hinten' }, { id: 'd', text: 'nah und fern' }], explanation: 'dexter = rechts, sinister = links.', points: 2 },
  { id: 4124, question: 'Was bedeutet proximal?', type: 'single', options: [{ id: 'a', text: 'rumpfnah', correct: true }, { id: 'b', text: 'rumpffern' }, { id: 'c', text: 'zur Elle hin' }, { id: 'd', text: 'zur Seite hin' }], explanation: 'Proximal bedeutet zum Rumpf bzw. zum Ursprung einer Extremität hin.', points: 2 },
  { id: 4125, question: 'Welche Knochen gehören zur unteren Extremität?', type: 'multiple', options: [{ id: 'a', text: 'Femur', correct: true }, { id: 'b', text: 'Tibia', correct: true }, { id: 'c', text: 'Fibula', correct: true }, { id: 'd', text: 'Patella', correct: true }, { id: 'e', text: 'Scapula' }], explanation: 'Femur, Tibia, Fibula und Patella gehören zur unteren Extremität bzw. zum Kniebereich.', points: 4 },
  { id: 4126, question: 'Welche Strukturen gehören zum Kniegelenk?', type: 'multiple', options: [{ id: 'a', text: 'Meniskus', correct: true }, { id: 'b', text: 'Patella', correct: true }, { id: 'c', text: 'Patellasehne', correct: true }, { id: 'd', text: 'Gelenkknorpel', correct: true }, { id: 'e', text: 'Maxilla' }], explanation: 'Meniskus, Patella, Patellasehne und Gelenkknorpel sind in der Knieabbildung enthalten.', points: 4 },
  { id: 4127, question: 'Welche Knochen gehören zum Schultergürtel?', type: 'multiple', options: [{ id: 'a', text: 'Clavicula', correct: true }, { id: 'b', text: 'Scapula', correct: true }, { id: 'c', text: 'Tibia' }, { id: 'd', text: 'Patella' }], explanation: 'Clavicula und Scapula bilden wesentliche knöcherne Bestandteile des Schultergürtels.', points: 2 },
  { id: 4128, question: 'Was ist das Sternum?', type: 'single', options: [{ id: 'a', text: 'Brustbein', correct: true }, { id: 'b', text: 'Schulterblatt' }, { id: 'c', text: 'Oberarmknochen' }, { id: 'd', text: 'Unterkiefer' }], explanation: 'Sternum = Brustbein.', points: 2 },
  { id: 4129, question: 'Wie viele Wirbel enthält die HWS?', type: 'single', options: [{ id: 'a', text: '7', correct: true }, { id: 'b', text: '12' }, { id: 'c', text: '5' }, { id: 'd', text: '3' }], explanation: 'Die Halswirbelsäule enthält 7 Halswirbel C1–C7.', points: 2 },
  { id: 4130, question: 'Welche Krümmung haben HWS und LWS?', type: 'single', options: [{ id: 'a', text: 'Lordose', correct: true }, { id: 'b', text: 'Kyphose' }, { id: 'c', text: 'Skoliose' }, { id: 'd', text: 'Luxation' }], explanation: 'HWS und LWS sind physiologisch lordotisch gekrümmt.', points: 2 },
  { id: 4131, question: 'Was ist die Maxilla?', type: 'single', options: [{ id: 'a', text: 'Oberkiefer', correct: true }, { id: 'b', text: 'Unterkiefer' }, { id: 'c', text: 'Augenhöhle' }, { id: 'd', text: 'Schulterblatt' }], explanation: 'Maxilla = Oberkiefer.', points: 2 },
  { id: 4132, question: 'Was ist die Mandibula?', type: 'single', options: [{ id: 'a', text: 'Unterkiefer', correct: true }, { id: 'b', text: 'Oberkiefer' }, { id: 'c', text: 'Keilbein' }, { id: 'd', text: 'Schlüsselbein' }], explanation: 'Mandibula = Unterkiefer.', points: 2 },
  { id: 4133, question: 'Was sind Agonist und Antagonist?', type: 'single', options: [{ id: 'a', text: 'bewegungsführender Muskel und sein Gegenspieler', correct: true }, { id: 'b', text: 'zwei Knochenarten' }, { id: 'c', text: 'zwei Röntgenverfahren' }, { id: 'd', text: 'zwei Knorpelzellen' }], explanation: 'Agonist führt eine Bewegung maßgeblich aus, der Antagonist wirkt als Gegenspieler.', points: 2 },
  { id: 4134, question: 'Was bedeutet Tonus?', type: 'single', options: [{ id: 'a', text: 'Spannungszustand der Muskulatur', correct: true }, { id: 'b', text: 'Knochenbruch' }, { id: 'c', text: 'Gelenkflüssigkeit' }, { id: 'd', text: 'Röntgenkontrast' }], explanation: 'Tonus bezeichnet den Spannungszustand eines Muskels bzw. der Muskulatur.', points: 2 },
  { id: 4135, question: 'Was ist die Orbita?', type: 'single', options: [{ id: 'a', text: 'Augenhöhle', correct: true }, { id: 'b', text: 'Kieferhöhle' }, { id: 'c', text: 'Brustkorb' }, { id: 'd', text: 'Wirbelkanal' }], explanation: 'Orbita = Augenhöhle.', points: 2 },
];

export function expandLf4FromPdf(module: LearningModule): LearningModule {
  if (module.id !== 'lf4') return module;

  const topics = module.topics.filter(topic => !topic.id.startsWith('lf4-pdf-'));
  const questions = module.questions.filter(question => question.id < 4100 || question.id > 4199);

  return {
    ...module,
    title: 'Anamnese, Bewegungsapparat, Arzneimittel & Diagnostik',
    subtitle: 'Komplettkurs: Anamnese, Gelenke, Knochen, Erkrankungen, Arzneimittel, Injektionen, Blutentnahme, Röntgen und Anatomie',
    description: 'Umfassender LF4-Lernkurs mit allen Inhalten der bereitgestellten Lernunterlage: ausführliche Erklärungen, beschriftete Schaubilder, Fachvokabeln, direkte Übungen mit Lösungen und prüfungsnahe Wiederholung.',
    topics: [...topics, ...pdfTopics],
    questions: [...questions, ...pdfQuestions],
  };
}
