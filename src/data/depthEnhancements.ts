import type { LearningModule, LearningTopic, TopicContent } from '@/types';
import { compareVisual, cycleVisual, processVisual } from './visualKit';

type Section = {
  title: string;
  text: string;
  extra?: TopicContent[];
  exercises: string[];
};

function depthTopic(moduleId: string, title: string, visual: string, visualCaption: string, sections: Section[]): LearningTopic {
  const content: TopicContent[] = [
    { type: 'image', src: visual, alt: title, caption: visualCaption },
  ];

  sections.forEach(section => {
    content.push({ type: 'heading', title: section.title });
    content.push({ type: 'text', text: section.text });
    if (section.extra) content.push(...section.extra);
    content.push({ type: 'heading', title: 'Übungen' });
    content.push({ type: 'list', items: section.exercises });
  });

  return {
    id: `${moduleId}-praxis-vertiefung`,
    title: 'Vertiefung: Zusammenhänge verstehen und anwenden',
    content,
  };
}

const visuals: Record<string, string> = {
  lf1: processVisual('Professionell handeln: vom Auftrag zur sicheren Durchführung', [
    { title: 'Auftrag verstehen', text: 'Was soll gemacht werden und warum?' },
    { title: 'Kompetenz prüfen', text: 'Darf und kann ich die Aufgabe sicher übernehmen?' },
    { title: 'Sicher durchführen', text: 'Hygiene, Datenschutz und Patientensicherheit beachten.' },
    { title: 'Rückmelden', text: 'Auffälligkeiten, Fehler und offene Fragen weitergeben.' },
    { title: 'Dokumentieren', text: 'Wesentliche Informationen nachvollziehbar festhalten.' },
  ], 'Professionelles Arbeiten bedeutet: verstehen · prüfen · durchführen · rückmelden · dokumentieren'),
  lf2: processVisual('Patientenweg in der Arztpraxis', [
    { title: 'Kontakt', text: 'Telefon, online oder persönlich: Anliegen erkennen.' },
    { title: 'Aufnahme', text: 'Identität, Daten, Dringlichkeit und Termin klären.' },
    { title: 'Begleitung', text: 'Orientierung geben, Wartezeit erklären, Informationen weitergeben.' },
    { title: 'Behandlung', text: 'Unterlagen und Informationen vollständig verfügbar machen.' },
    { title: 'Abschluss', text: 'Folgetermin, Hinweise, Dokumentation und Verabschiedung.' },
  ]),
  lf3: cycleVisual('Infektionskette gezielt unterbrechen', [
    { title: 'Erreger', text: 'Keime erkennen und Übertragung verhindern' },
    { title: 'Reservoir', text: 'Quelle und kontaminierte Bereiche beachten' },
    { title: 'Austritt', text: 'Sekrete, Blut und Tröpfchen sicher handhaben' },
    { title: 'Übertragung', text: 'Hände, Flächen, Instrumente und Luftwege' },
    { title: 'Eintritt', text: 'Schleimhaut, Wunde, Stich oder Atemwege' },
    { title: 'Empfänger', text: 'Schutz besonders gefährdeter Personen' },
  ]),
  lf4: processVisual('Von der Beschwerde zur sicheren Handlung', [
    { title: 'Beschwerde', text: 'Patient schildert subjektive Symptome.' },
    { title: 'Anamnese', text: 'Offen beginnen und gezielt nachfragen.' },
    { title: 'Befund', text: 'Beobachten, messen, untersuchen und dokumentieren.' },
    { title: 'Einordnung', text: 'Informationen ärztlich zusammenführen lassen.' },
    { title: 'Maßnahme', text: 'Behandlung, Arzneimittel oder weitere Diagnostik sicher begleiten.' },
  ]),
  lf5: processVisual('Notfallsituation in der Praxis', [
    { title: 'Erkennen', text: 'Situation, Bewusstsein und Atmung rasch erfassen.' },
    { title: 'Hilfe holen', text: 'Team alarmieren und Rettungsdienst nach Lage veranlassen.' },
    { title: 'Priorisieren', text: 'Lebensbedrohliche Probleme zuerst behandeln.' },
    { title: 'Maßnahmen', text: 'Im eigenen Kompetenzbereich nach Standard handeln.' },
    { title: 'Übergabe', text: 'Verlauf, Werte und Maßnahmen strukturiert weitergeben.' },
  ]),
  lf6: processVisual('Materialwirtschaft als Kreislauf', [
    { title: 'Bedarf', text: 'Verbrauch und Mindestbestand beobachten.' },
    { title: 'Bestellen', text: 'Menge, Preis, Lieferzeit und Qualität vergleichen.' },
    { title: 'Wareneingang', text: 'Lieferung, Zustand und Dokumente prüfen.' },
    { title: 'Lagern', text: 'Hygiene, Temperatur und Verfallsdaten beachten.' },
    { title: 'Verbrauchen', text: 'Bestände dokumentieren und rechtzeitig nachbestellen.' },
  ]),
  lf7: cycleVisual('Qualität entsteht im ganzen Praxisablauf', [
    { title: 'Planen', text: 'Ziel und Ablauf festlegen' },
    { title: 'Durchführen', text: 'Standard im Alltag anwenden' },
    { title: 'Prüfen', text: 'Ergebnis und Abweichungen erfassen' },
    { title: 'Verbessern', text: 'Ursachen bearbeiten und Standard anpassen' },
    { title: 'Kommunizieren', text: 'Team und Patienten verständlich informieren' },
  ]),
  lf8: cycleVisual('Regelkreise im Körper', [
    { title: 'Reiz', text: 'Körperwert verändert sich' },
    { title: 'Sensor', text: 'Veränderung wird erfasst' },
    { title: 'Steuerung', text: 'Nerven oder Hormone geben Signal' },
    { title: 'Zielorgan', text: 'Organ reagiert auf das Signal' },
    { title: 'Rückkopplung', text: 'Wert nähert sich dem Zielbereich' },
  ]),
  lf9: processVisual('Vom Essen zum Stoffwechsel', [
    { title: 'Aufnahme', text: 'Nährstoffe gelangen mit der Nahrung in den Verdauungstrakt.' },
    { title: 'Zerlegung', text: 'Mechanische und chemische Verdauung macht Bestandteile resorbierbar.' },
    { title: 'Resorption', text: 'Nährstoffe gelangen vor allem im Dünndarm in Blut oder Lymphe.' },
    { title: 'Verarbeitung', text: 'Leber und Körperzellen speichern, umbauen und nutzen Nährstoffe.' },
    { title: 'Regulation', text: 'Hormone wie Insulin helfen, Stoffwechselwerte zu steuern.' },
  ]),
  lf10: processVisual('Hautverletzung: von der Barriere zur Heilung', [
    { title: 'Barriere gestört', text: 'Hautschutz ist unterbrochen, Blutung und Keime werden relevant.' },
    { title: 'Beurteilen', text: 'Tiefe, Wundart, Verschmutzung, Blutung und Umgebung prüfen.' },
    { title: 'Versorgen', text: 'Hygienisch arbeiten und geeigneten Verband vorbereiten.' },
    { title: 'Heilen', text: 'Reinigung, Granulation, Epithelisierung und Umbau beobachten.' },
    { title: 'Kontrollieren', text: 'Infektionszeichen, Durchblutung und Verlauf dokumentieren.' },
  ]),
  lf11: compareVisual('Prävention: drei Ebenen mit unterschiedlichem Ziel', [
    { title: 'Primär', lines: ['Krankheit möglichst verhindern', 'Risikofaktoren reduzieren', 'Gesundheit erhalten', 'Beispiel: Impfungen'] },
    { title: 'Sekundär', lines: ['früh erkennen', 'Vorsorge und Screening', 'Vorstufen entdecken', 'früh behandeln'] },
    { title: 'Tertiär', lines: ['Folgen begrenzen', 'Rückfälle verhindern', 'Rehabilitation unterstützen', 'Lebensqualität erhalten'] },
  ]),
  lf12: processVisual('Beruflicher Weg nach der Ausbildung', [
    { title: 'Arbeitsverhältnis', text: 'Vertrag, Pflichten, Vergütung und Zusammenarbeit verstehen.' },
    { title: 'Entwicklung', text: 'Erfahrung sammeln und Kompetenzen gezielt ausbauen.' },
    { title: 'Bewerbung', text: 'Unterlagen auf Stelle und Praxis abstimmen.' },
    { title: 'Gespräch', text: 'Fachlich, strukturiert und authentisch auftreten.' },
    { title: 'Weiterbildung', text: 'Fortbildung, Spezialisierung und Karrierewege planen.' },
  ]),
};

const topics: Record<string, LearningTopic> = {
  lf1: depthTopic('lf1', 'Berufliche Verantwortung vertiefen', visuals.lf1, 'Jede Aufgabe wird erst verstanden und auf Zuständigkeit geprüft, bevor sie sicher ausgeführt und dokumentiert wird.', [
    {
      title: 'Auftrag, Kompetenz und Delegation unterscheiden',
      text: 'Im Praxisalltag reicht es nicht, eine Aufgabe technisch ausführen zu können. Vorher muss klar sein, wer die Aufgabe angeordnet hat, ob sie delegierbar ist, ob die eigene Qualifikation und Einweisung ausreichen und wann ärztliche Rücksprache nötig ist. Gerade bei neuen oder unerwarteten Situationen schützt eine kurze Rückfrage Patient und Team vor vermeidbaren Fehlern.',
      extra: [{ type: 'info', title: 'Praxisbezug', text: 'Ein professionelles „Ich kläre das kurz ab“ ist kein Zeichen von Unsicherheit, sondern von Verantwortungsbewusstsein.' }],
      exercises: ['Nenne drei Fragen, die du dir vor einer unbekannten Aufgabe stellst.', 'Erkläre den Unterschied zwischen „Aufgabe bekommen“ und „Aufgabe sicher übernehmen können“.'],
    },
    {
      title: 'Institutionen nicht nur auswendig lernen',
      text: 'Ärztekammer, Kassenärztliche Vereinigung, Krankenkassen und andere Institutionen erfüllen unterschiedliche Funktionen. Hilfreich ist eine Dreierfrage: Wer vertritt oder organisiert? Wer finanziert? Wer setzt Regeln oder Standards? So lassen sich Institutionen auch in unbekannten Prüfungsfällen besser zuordnen.',
      exercises: ['Ordne Ärztekammer, KV und Krankenkasse jeweils einer Hauptaufgabe zu.', 'Warum ist es sinnvoller, Funktionen zu verstehen als nur Namen zu lernen?'],
    },
    {
      title: 'Arbeitsschutz als tägliche Routine',
      text: 'Arbeitsschutz ist kein einzelnes Kapitel, sondern steckt in vielen Alltagshandlungen: sichere Entsorgung von Kanülen, ergonomisches Arbeiten, persönliche Schutzausrüstung, Umgang mit Gefahrstoffen und klare Meldewege bei Zwischenfällen. Gute Schutzmaßnahmen werden möglichst vor einer Verletzung organisiert.',
      exercises: ['Nenne vier typische Gefährdungen in einer Arztpraxis.', 'Formuliere zu zwei Gefährdungen jeweils eine konkrete Schutzmaßnahme.'],
    },
  ]),
  lf2: depthTopic('lf2', 'Patientenaufnahme und Kommunikation vertiefen', visuals.lf2, 'Der Patientenweg zeigt, wie Kommunikation, Organisation, Datenschutz und Dringlichkeit zusammenhängen.', [
    {
      title: 'Ein Anliegen richtig erfassen',
      text: 'Am Empfang muss aus wenigen Informationen ein strukturierter nächster Schritt entstehen. Dafür werden zunächst Identität und Anliegen geklärt. Danach werden relevante Informationen gesammelt, ohne eine ärztliche Diagnose vorwegzunehmen. Bei möglichen Warnzeichen wird nicht einfach ein später Termin vergeben, sondern nach Praxisstandard medizinisch rückgekoppelt.',
      exercises: ['Welche Informationen brauchst du mindestens, bevor du ein telefonisches Anliegen weitergibst?', 'Warum sollte eine MFA am Telefon keine Diagnose versprechen?'],
    },
    {
      title: 'Schwierige Gespräche deeskalieren',
      text: 'Unzufriedene Patienten brauchen zuerst das Gefühl, gehört zu werden. Sachlich helfen kurze Schritte: ausreden lassen, Anliegen zusammenfassen, konkrete Lösungsmöglichkeiten nennen und Grenzen ruhig erklären. Lautstärke oder Vorwürfe werden nicht mit Gegenangriff beantwortet. Bei Bedrohungen gelten die Sicherheitsregeln der Praxis.',
      extra: [{ type: 'list', items: ['ruhige Stimme und kurze Sätze', 'Problem in eigenen Worten zusammenfassen', 'keine Schuldzuweisungen', 'realistische nächste Schritte anbieten', 'bei Eskalation Unterstützung holen'] }],
      exercises: ['Formuliere eine professionelle Antwort auf „Ich warte hier schon ewig!“.', 'Nenne zwei Formulierungen, die eine Situation eher verschärfen würden.'],
    },
    {
      title: 'Datenschutz beginnt am Empfang',
      text: 'Am Empfang treffen Gespräch, Bildschirm, Telefon und Wartebereich aufeinander. Deshalb muss verhindert werden, dass Unbeteiligte Diagnosen, Kontaktdaten oder andere sensible Informationen mitlesen oder mithören. Auch scheinbar harmlose Auskünfte über Anwesenheit oder Termine können personenbezogen sein.',
      exercises: ['Nenne drei typische Datenschutzrisiken am Empfang.', 'Wie würdest du reagieren, wenn ein Angehöriger ohne Vollmacht nach einem Befund fragt?'],
    },
  ]),
  lf3: depthTopic('lf3', 'Hygiene und Infektionsschutz vertiefen', visuals.lf3, 'Infektionsschutz wird leichter, wenn jede Maßnahme als Unterbrechung einer Übertragungskette verstanden wird.', [
    {
      title: 'Die Infektionskette als Denkmodell',
      text: 'Eine Infektion entsteht nicht nur durch das Vorhandensein eines Erregers. Es braucht eine Quelle, einen Austrittsweg, eine Übertragungsmöglichkeit, eine Eintrittspforte und einen empfänglichen Menschen. Händehygiene, Schutzkleidung, Flächendesinfektion, Aufbereitung und Impfungen setzen an unterschiedlichen Stellen dieser Kette an.',
      exercises: ['Beschreibe eine mögliche Infektionskette bei einer Blutentnahme.', 'An welchen zwei Stellen kann Händehygiene diese Kette unterbrechen?'],
    },
    {
      title: 'Reinigung, Desinfektion und Sterilisation trennen',
      text: 'Reinigung entfernt sichtbare Verschmutzungen und reduziert Keime mechanisch. Desinfektion soll die Zahl vermehrungsfähiger Mikroorganismen so weit reduzieren, dass von dem Gegenstand oder Bereich keine relevante Infektionsgefahr mehr ausgeht. Sterilisation zielt auf Sterilität und ist für entsprechend aufzubereitende Medizinprodukte Teil eines validierten Gesamtprozesses.',
      exercises: ['Erkläre die drei Begriffe jeweils in einem Satz.', 'Warum reicht „sieht sauber aus“ bei einem kritischen Instrument nicht aus?'],
    },
    {
      title: 'Nadelstichverletzung: sofort strukturiert handeln',
      text: 'Nach einer Stich- oder Schnittverletzung zählt ein festgelegter Ablauf: Sofortmaßnahmen nach Praxisstandard, unverzügliche Meldung, medizinische Risikobewertung, notwendige Diagnostik beziehungsweise Prophylaxe und vollständige Dokumentation. Entscheidend ist, den Vorfall nicht zu bagatellisieren oder bis zum Feierabend zu warten.',
      extra: [{ type: 'warning', title: 'Sicherheit', text: 'Konkrete Sofortmaßnahmen und weitere Schritte richten sich nach dem aktuellen Hygiene- und Expositionsplan der Einrichtung.' }],
      exercises: ['Warum ist eine schnelle Meldung nach einer Nadelstichverletzung wichtig?', 'Welche Informationen sollten für die weitere Beurteilung dokumentiert werden?'],
    },
  ]),
  lf4: depthTopic('lf4', 'Anamnese, Anatomie und Arzneimittelsicherheit vertiefen', visuals.lf4, 'Beschwerde, Anamnese, Befund und sichere Maßnahmen sind einzelne Schritte, die logisch aufeinander aufbauen.', [
    {
      title: 'Symptom, Zeichen, Befund und Diagnose auseinanderhalten',
      text: 'Ein Symptom ist zunächst das, was ein Patient wahrnimmt und berichtet. Ein objektives Zeichen oder Befund kann beobachtet, ertastet oder gemessen werden. Erst die ärztliche Zusammenschau aus Anamnese, Untersuchung und gegebenenfalls weiterer Diagnostik führt zur Diagnose. Diese Unterscheidung verhindert, dass Beobachtungen vorschnell als Diagnose dokumentiert werden.',
      exercises: ['Ordne „Schmerz 7/10“, „Knie geschwollen“ und „Gonarthrose“ den Begriffen Symptom, Befund und Diagnose zu.', 'Formuliere einen neutralen Dokumentationssatz für ein gerötetes, geschwollenes Knie.'],
    },
    {
      title: 'Gelenk, Knochen und Muskel als Funktionseinheit',
      text: 'Bewegung entsteht nicht durch ein einzelnes Organ. Muskeln erzeugen Kraft, Sehnen übertragen sie auf Knochen, Gelenke führen die Bewegung und Bänder stabilisieren. Gelenkknorpel und Gelenkflüssigkeit reduzieren Reibung. Deshalb können Beschwerden an einer Stelle durch mehrere Strukturen beeinflusst werden.',
      exercises: ['Erkläre den Weg der Muskelkraft bis zur Bewegung eines Knochens.', 'Welche Rolle spielen Knorpel und Bänder im Gelenk?'],
    },
    {
      title: 'Arzneimittelsicherheit beginnt vor der Gabe',
      text: 'Eine sichere Gabe bedeutet mehr als die richtige Tablette aus einer Packung zu nehmen. Verordnung, Patient, Präparat, Dosis, Zeitpunkt, Applikationsweg, relevante Allergien, Besonderheiten des Präparats und Dokumentation müssen zusammenpassen. Bei einer Abweichung wird der Prozess unterbrochen und geklärt.',
      exercises: ['Nenne fünf Punkte, die du vor einer Medikamentengabe kontrollierst.', 'Was tust du, wenn Packungsname und Anordnung nicht übereinstimmen?'],
    },
  ]),
  lf5: depthTopic('lf5', 'Vitalzeichen und Notfallsituationen vertiefen', visuals.lf5, 'Im Notfall werden Probleme nach ihrer Dringlichkeit geordnet und Informationen strukturiert weitergegeben.', [
    {
      title: 'Vitalwerte immer im Zusammenhang beurteilen',
      text: 'Puls, Blutdruck, Atmung, Bewusstseinslage und Hautzeichen liefern gemeinsam ein Bild. Ein einzelner Wert kann durch Belastung, Angst, Schmerz, Fieber oder Medikamente beeinflusst sein. Deshalb werden Messbedingungen, Beschwerden und Verlauf mitbeobachtet und dokumentiert.',
      exercises: ['Warum ist ein einzelner erhöhter Puls noch keine Diagnose?', 'Welche zusätzlichen Beobachtungen würdest du bei Schwindel dokumentieren?'],
    },
    {
      title: 'Atemnot ist ein Symptom, keine fertige Diagnose',
      text: 'Atemnot kann viele Ursachen haben. Für die MFA ist zunächst entscheidend, die Dringlichkeit zu erkennen, den Patienten nicht unnötig zu belasten, Hilfe zu organisieren, Vitalfunktionen zu erfassen und Veränderungen sofort weiterzugeben. Eine strukturierte Beobachtung ist wichtiger als Spekulation über die Ursache.',
      exercises: ['Welche vier Beobachtungen sind bei Atemnot besonders wichtig?', 'Warum sollte ein akut kurzatmiger Patient nicht allein in einen Nebenraum geschickt werden?'],
    },
    {
      title: 'Notfallübergabe kurz und vollständig',
      text: 'Bei einer Übergabe an Arzt oder Rettungsdienst helfen feste Kategorien: Wer ist betroffen? Was ist passiert? Welche Beschwerden und Vitalwerte liegen vor? Welche Maßnahmen wurden bereits durchgeführt? Wie hat sich der Zustand verändert? Dadurch gehen unter Zeitdruck weniger Informationen verloren.',
      exercises: ['Formuliere eine 30-Sekunden-Übergabe für einen Patienten mit Kollaps im Wartezimmer.', 'Welche Information darf in einer Notfallübergabe auf keinen Fall fehlen?'],
    },
  ]),
  lf6: depthTopic('lf6', 'Wirtschaftliches Handeln in der Praxis vertiefen', visuals.lf6, 'Materialwirtschaft verbindet Versorgungssicherheit, Kosten, Lagerung und Dokumentation.', [
    {
      title: 'Nicht zu viel und nicht zu wenig bestellen',
      text: 'Zu geringe Bestände gefährden Arbeitsabläufe. Zu hohe Bestände binden Geld, brauchen Lagerplatz und erhöhen das Risiko, dass Produkte verfallen. Gute Materialwirtschaft beobachtet Verbrauch, Lieferzeiten, Mindestbestände und besondere Bedarfsspitzen.',
      exercises: ['Welche Folgen kann ein zu hoher Lagerbestand haben?', 'Welche Informationen brauchst du, um einen sinnvollen Mindestbestand festzulegen?'],
    },
    {
      title: 'Wareneingang ist eine Qualitätskontrolle',
      text: 'Eine Lieferung wird nicht ungeprüft ins Lager gestellt. Menge, Produkt, Unversehrtheit, Lieferdokumente und bei empfindlichen Waren erforderliche Transportbedingungen müssen zum Auftrag passen. Abweichungen werden nachvollziehbar dokumentiert und geklärt.',
      exercises: ['Nenne vier Punkte einer Wareneingangskontrolle.', 'Was würdest du tun, wenn eine Packung beschädigt angeliefert wird?'],
    },
    {
      title: 'Wirtschaftlichkeit ohne Qualitätsverlust',
      text: 'Wirtschaftlich arbeiten bedeutet nicht automatisch, immer die billigste Lösung zu wählen. Entscheidend ist das Verhältnis aus notwendiger Qualität, Sicherheit, Verfügbarkeit, Folgekosten und Preis. Ein günstiges Produkt, das häufig ausfällt oder ungeeignet ist, kann insgesamt teurer sein.',
      exercises: ['Nenne zwei Kriterien außer dem Preis, die bei einer Bestellung wichtig sind.', 'Erkläre mit einem Beispiel den Unterschied zwischen billig und wirtschaftlich.'],
    },
  ]),
  lf7: depthTopic('lf7', 'Praxisorganisation und Qualitätsmanagement vertiefen', visuals.lf7, 'Qualität wird nicht am Ende kontrolliert, sondern im gesamten Ablauf geplant, geprüft und verbessert.', [
    {
      title: 'Abläufe aus Sicht des Patienten betrachten',
      text: 'Ein organisatorisch guter Prozess verbindet medizinische Notwendigkeit mit verständlicher Orientierung. Wartezeiten, doppelte Datenerfassung, unklare Zuständigkeiten oder fehlende Unterlagen sind Hinweise auf Prozessprobleme. Wer den gesamten Patientenweg betrachtet, erkennt Ursachen besser als bei der Betrachtung einzelner Arbeitsplätze.',
      exercises: ['Zeichne den Patientenweg von Terminvereinbarung bis Verabschiedung.', 'Markiere zwei Stellen, an denen häufig Wartezeit entstehen kann.'],
    },
    {
      title: 'Fehleranalyse statt Schuldfrage',
      text: 'Bei Qualitätsproblemen ist die Frage „Warum konnte das passieren?“ meist hilfreicher als „Wer war schuld?“. Ursachen können unklare Zuständigkeiten, fehlende Standards, schlechte Übergaben, Materialprobleme oder eine ungeeignete Terminstruktur sein. Maßnahmen sollten an der Ursache ansetzen und anschließend überprüft werden.',
      exercises: ['Ein Laborzettel wird wiederholt nicht rechtzeitig zugeordnet. Nenne drei mögliche Systemursachen.', 'Wie würdest du prüfen, ob eine Verbesserungsmaßnahme funktioniert?'],
    },
    {
      title: 'IGeL professionell kommunizieren',
      text: 'Bei Selbstzahlerleistungen braucht der Patient transparente Informationen zu Inhalt, Kosten und Alternativen. Druck oder eine Vermischung mit medizinisch notwendigen Leistungen ist unprofessionell. Gute Kommunikation ermöglicht eine informierte Entscheidung und dokumentiert Vereinbarungen nachvollziehbar.',
      exercises: ['Welche Informationen sollte ein Patient vor einer Selbstzahlerleistung erhalten?', 'Formuliere einen neutralen Satz, wenn ein Patient eine IGeL ablehnt.'],
    },
  ]),
  lf8: depthTopic('lf8', 'Niere, Hormone und Fortpflanzung vertiefen', visuals.lf8, 'Viele Funktionen von Niere und Hormonsystem lassen sich als Regelkreise verstehen.', [
    {
      title: 'Niere als Filter und Regler',
      text: 'Die Niere bildet nicht einfach nur Urin. Sie filtriert Blut, holt benötigte Stoffe und Wasser gezielt zurück und scheidet andere Stoffe aus. Dadurch ist sie an Flüssigkeits-, Elektrolyt- und Säure-Basen-Haushalt beteiligt. Urinmenge und Zusammensetzung sind deshalb das Ergebnis mehrerer Regulationsschritte.',
      exercises: ['Warum wäre „Die Niere filtert alles einfach aus“ fachlich zu kurz?', 'Nenne drei Körperhaushalte, an deren Regulation die Niere beteiligt ist.'],
    },
    {
      title: 'Hormone wirken nur an passenden Zielzellen',
      text: 'Hormone werden über das Blut verteilt, wirken aber nur dort, wo passende Rezeptoren vorhanden sind. Viele Hormonsysteme funktionieren mit Rückkopplung: Steigt oder sinkt ein Wert, verändert der Körper die Hormonausschüttung und versucht den Zielbereich wiederherzustellen.',
      exercises: ['Erkläre das Schlüssel-Schloss-Prinzip mit Hormon und Rezeptor.', 'Was bedeutet negative Rückkopplung in einem Regelkreis?'],
    },
    {
      title: 'Zyklus und Schwangerschaft als zeitliche Abläufe',
      text: 'Menstruationszyklus und Schwangerschaft werden leichter verständlich, wenn Veränderungen zeitlich geordnet werden. Hormone, Gebärmutterschleimhaut, Eisprung und mögliche Befruchtung hängen zusammen. In der Praxis ist wichtig, Fachbegriffe korrekt zu verwenden und sensible Themen wertfrei zu kommunizieren.',
      exercises: ['Ordne Follikelreifung, Eisprung und Gelbkörperphase zeitlich.', 'Warum ist wertfreie Sprache bei Fragen zu Sexualität und Verhütung besonders wichtig?'],
    },
  ]),
  lf9: depthTopic('lf9', 'Verdauung und Stoffwechsel vertiefen', visuals.lf9, 'Verdauung und Stoffwechsel werden verständlicher, wenn der Weg eines Nährstoffs vom Essen bis zur Körperzelle verfolgt wird.', [
    {
      title: 'Verdauung ist Zerlegung plus Aufnahme',
      text: 'Große Nahrungsbestandteile müssen so verändert werden, dass sie die Darmwand passieren können. Mechanische Zerkleinerung vergrößert die Oberfläche. Enzyme spalten Kohlenhydrate, Eiweiße und Fette in kleinere Bestandteile. Erst danach können diese überwiegend über den Dünndarm aufgenommen und im Körper weitertransportiert werden.',
      exercises: ['Erkläre den Unterschied zwischen Verdauung und Resorption.', 'Warum hilft mechanische Zerkleinerung der chemischen Verdauung?'],
    },
    {
      title: 'Leber, Galle und Pankreas arbeiten zusammen',
      text: 'Die Leber verarbeitet und speichert zahlreiche Stoffe und bildet Galle. Galle unterstützt die Fettverdauung. Das Pankreas liefert Verdauungsenzyme und hat zusätzlich eine hormonelle Funktion bei der Blutzuckerregulation. Dadurch verbindet dieses Organsystem Verdauung und Stoffwechsel besonders deutlich.',
      exercises: ['Welche Aufgabe hat Galle bei der Fettverdauung?', 'Nenne je eine Verdauungs- und eine Hormonfunktion des Pankreas.'],
    },
    {
      title: 'Diabetes als Störung eines Regelkreises',
      text: 'Nach einer Mahlzeit steigt Glukose im Blut. Insulin fördert die Aufnahme und Speicherung von Glukose. Bei Diabetes ist dieser Regelmechanismus gestört, allerdings bei Typ 1 und Typ 2 aus unterschiedlichen Gründen. Für das Verständnis sind deshalb Ursache, Insulinwirkung, typische Symptome und Langzeitfolgen getrennt zu lernen.',
      exercises: ['Beschreibe den normalen Weg des Blutzuckers nach einer kohlenhydratreichen Mahlzeit.', 'Erkläre den Grundunterschied zwischen Typ-1- und Typ-2-Diabetes.'],
    },
  ]),
  lf10: depthTopic('lf10', 'Haut, Wunden und kleine Chirurgie vertiefen', visuals.lf10, 'Die Vertiefung verbindet Hautbarriere, Wundbeurteilung, Heilung und sichere Assistenz.', [
    {
      title: 'Hautschichten funktionell verstehen',
      text: 'Oberhaut, Lederhaut und Unterhaut unterscheiden sich nicht nur im Aufbau, sondern auch in ihrer Funktion. Die Oberhaut bildet die äußere Barriere. In der Lederhaut liegen unter anderem Gefäße, Nerven, Rezeptoren sowie Hautanhangsgebilde. Die Unterhaut enthält lockeres Binde- und Fettgewebe und trägt zu Polsterung und Wärmeisolation bei. Je tiefer eine Verletzung reicht, desto mehr Strukturen können betroffen sein.',
      exercises: ['Ordne Barriere, Gefäße/Nerven und Fettpolster den drei Hautschichten zu.', 'Warum können tiefere Wunden stärker bluten als sehr oberflächliche Verletzungen?'],
    },
    {
      title: 'Primäre und sekundäre Wundheilung unterscheiden',
      text: 'Bei einer primären Wundheilung liegen geeignete Wundränder nah beieinander und können unter passenden Bedingungen direkt zusammenheilen. Bei einer sekundären Heilung bleibt ein größerer Gewebedefekt offen und wird schrittweise mit Granulationsgewebe aufgefüllt und anschließend epithelialisiert. Wundart, Verschmutzung, Durchblutung und Infektion beeinflussen den Verlauf.',
      exercises: ['Erkläre primäre und sekundäre Wundheilung in eigenen Worten.', 'Welche Faktoren können eine Wundheilung verzögern?'],
    },
    {
      title: 'Steriles Feld, Instrumente und Verband zusammen denken',
      text: 'Bei kleinen chirurgischen Eingriffen muss die sterile Arbeitszone geschützt bleiben. Instrumente werden so vorbereitet und angereicht, dass sterile Teile nicht kontaminiert werden. Anschließend schützt ein geeigneter Verband die Wunde und ermöglicht Kontrolle. Der sichere Ablauf umfasst Vorbereitung, Assistenz, Entsorgung, Aufbereitung und Dokumentation.',
      extra: [{ type: 'info', title: 'Aus der Lernfeld-Unterlage', text: 'Instrumente, Verbände, Wundheilung und Hautdrüsen gehören ausdrücklich zu den vorgesehenen Themen von Lernfeld 10.' }],
      exercises: ['Nenne drei Situationen, durch die ein steriles Feld kontaminiert werden könnte.', 'Welche Informationen gehören nach einem Verbandwechsel in die Dokumentation?'],
    },
  ]),
  lf11: depthTopic('lf11', 'Prävention, Beratung und chronische Erkrankungen vertiefen', visuals.lf11, 'Die drei Präventionsebenen helfen, sehr unterschiedliche Vorsorge- und Unterstützungsangebote einzuordnen.', [
    {
      title: 'Screening und Diagnostik unterscheiden',
      text: 'Früherkennungsuntersuchungen richten sich an Menschen ohne bekannte entsprechende Diagnose und sollen Erkrankungen oder Vorstufen möglichst früh entdecken. Ein auffälliges Screening-Ergebnis ist noch keine endgültige Diagnose. Danach können gezielte diagnostische Untersuchungen folgen. Diese Unterscheidung ist wichtig, damit Patienten Ergebnisse nicht vorschnell als sichere Erkrankung verstehen.',
      exercises: ['Erkläre den Unterschied zwischen Screening und Diagnostik.', 'Warum sollte ein auffälliges Screening-Ergebnis verständlich, aber nicht dramatisierend erklärt werden?'],
    },
    {
      title: 'Präventionsberatung konkret machen',
      text: 'Allgemeine Sätze wie „Sie müssen gesünder leben“ helfen wenig. Beratung wird konkreter, wenn ein realistisches Ziel vereinbart wird: zum Beispiel Bewegung steigern, Rauchstopp vorbereiten, Impftermin planen oder eine Vorsorge wahrnehmen. Die MFA kann Informationen strukturieren, Motivation fördern und passende Angebote vermitteln.',
      exercises: ['Formuliere aus „mehr bewegen“ ein konkreteres Ziel.', 'Nenne zwei Gründe, warum kleine erreichbare Ziele oft sinnvoller sind als sehr große Veränderungen.'],
    },
    {
      title: 'Psychische, neurologische und soziale Aspekte ernst nehmen',
      text: 'Lernfeld 11 umfasst neben Prävention auch psychosomatische Beschwerden, Suchterkrankungen sowie Demenz und Morbus Parkinson. In der Praxis steht nicht die vorschnelle Bewertung im Vordergrund, sondern respektvolle Kommunikation, Beobachtung, Unterstützung bei Orientierung und Organisation sowie die Weitergabe relevanter Veränderungen an den Arzt.',
      extra: [{ type: 'info', title: 'Praxisbezug', text: 'Bei kognitiven oder motorischen Einschränkungen helfen klare Sprache, ausreichend Zeit und eine sichere Umgebung.' }],
      exercises: ['Nenne drei Kommunikationshilfen bei einem Patienten mit kognitiver Einschränkung.', 'Warum ist eine Suchterkrankung nicht mit „fehlender Disziplin“ gleichzusetzen?'],
    },
  ]),
  lf12: depthTopic('lf12', 'Arbeitswelt, Bewerbung und berufliche Entwicklung vertiefen', visuals.lf12, 'Arbeitsvertrag, Bewerbung, Gehaltsabrechnung und Weiterbildung gehören zu einem zusammenhängenden beruflichen Entwicklungsweg.', [
    {
      title: 'Arbeitsvertrag und Beendigung systematisch prüfen',
      text: 'Ein Arbeitsverhältnis enthält gegenseitige Rechte und Pflichten. Bei Änderungen oder Beendigung müssen unter anderem Vertragsform, Fristen, Nachweise und der konkrete Beendigungsgrund getrennt betrachtet werden. Aufhebungsvertrag, ordentliche Kündigung und außerordentliche Kündigung sind unterschiedliche Wege und dürfen nicht miteinander vermischt werden.',
      exercises: ['Erkläre den Unterschied zwischen Kündigung und Aufhebungsvertrag.', 'Welche Vertragsangaben würdest du vor einer Unterschrift besonders prüfen?'],
    },
    {
      title: 'Bewerbungsunterlagen als Gesamtsystem',
      text: 'Anschreiben, Lebenslauf und Nachweise sollen dieselbe berufliche Geschichte erzählen. Das Anschreiben begründet Motivation und Passung, der Lebenslauf zeigt Stationen und Qualifikationen übersichtlich und Zeugnisse oder Bescheinigungen belegen wichtige Angaben. Gute Bewerbungen werden an die konkrete Stelle angepasst statt nur allgemein verschickt.',
      exercises: ['Welche drei Fragen sollte ein Anschreiben beantworten?', 'Nenne fünf Inhalte, die in einen übersichtlichen Lebenslauf gehören.'],
    },
    {
      title: 'Lohnabrechnung verstehen statt nur Netto ablesen',
      text: 'Eine Gehaltsabrechnung zeigt, wie sich Bruttovergütung, steuerliche Abzüge, Sozialversicherungsbeiträge und weitere Positionen zum Auszahlungsbetrag zusammensetzen. Für den beruflichen Alltag ist wichtig, typische Positionen zu erkennen und Unstimmigkeiten gezielt nachfragen zu können.',
      exercises: ['Erkläre Brutto und Netto in einem Satz.', 'Welche Arten von Abzügen können zwischen Brutto und Auszahlungsbetrag liegen?'],
    },
    {
      title: 'Fortbildung als planbarer Karriereweg',
      text: 'Berufliche Entwicklung beginnt mit der Frage, welche Aufgaben künftig übernommen werden sollen. Daraus lassen sich passende Fortbildungen auswählen, zum Beispiel in Praxisorganisation, Abrechnung, Qualitätsmanagement oder medizinischen Schwerpunkten. Entscheidend ist die Verbindung aus Interesse, Nutzen für die Praxis und langfristigem beruflichem Ziel.',
      exercises: ['Nenne zwei Bereiche, in denen sich eine MFA spezialisieren kann.', 'Formuliere ein berufliches Ziel und eine dazu passende Fortbildungsrichtung.'],
    },
  ]),
};

export function enhanceDepth(module: LearningModule): LearningModule {
  const topic = topics[module.id];
  if (!topic || module.topics.some(existing => existing.id === topic.id)) return module;
  return { ...module, topics: [...module.topics, topic] };
}
