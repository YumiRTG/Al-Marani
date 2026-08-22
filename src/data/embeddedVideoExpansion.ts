import type { LearningModule, TopicContent } from '@/types';

type VideoRule = {
  keywords: string[];
  video: TopicContent;
};

const embed = (title: string, source: string, id: string, caption: string, duration?: string): TopicContent => ({
  type: 'video',
  title,
  source,
  duration,
  caption,
  url: `https://www.youtube.com/watch?v=${id}`,
  embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
});

const rules: Record<string, VideoRule[]> = {
  lf1: [
    { keywords: ['ausbildung', 'berufsbild'], video: embed('Duale Ausbildung – Betrieb und Berufsschule verstehen', 'Studyflix', 'M7oH-N6RpuA', 'Achte darauf, welche Aufgaben Betrieb und Berufsschule übernehmen und warum beide Lernorte zusammengehören.') },
    { keywords: ['jugend', 'arbeitsschutz', 'schutzrechte'], video: embed('Jugendarbeitsschutzgesetz – Arbeitszeit, Pausen und Schutz', 'Berufskolleg Hückeswagen', 'j56oB4Z8a2c', 'Notiere beim Anschauen Höchstarbeitszeit, Pausen und Ruhezeit. Vergleiche die Regeln anschließend mit erwachsenen Beschäftigten.') },
  ],
  lf2: [
    { keywords: ['kommunikation', 'empfang', 'gespräch'], video: embed('Beim Arzt die richtigen Fragen stellen und Antworten verstehen', 'Stiftung Gesundheitswissen', 'XLDRx5A3n8A', 'Beobachte, wie offene Fragen, Nachfragen und Zusammenfassen ein verständliches Gespräch unterstützen.') },
    { keywords: ['datenschutz', 'daten'], video: embed('Datenschutz einfach erklärt', 'explainity', 'ORS3qXnDQR0', 'Übertrage die Grundideen direkt auf Patientendaten am Empfang, Telefon und Bildschirm.') },
    { keywords: ['digital', 'epa', 'e-rezept'], video: embed('Warum Datenschutz wichtig ist', 'Medienberatung NRW', 'eO7p5_3bVu4', 'Achte auf Zweckbindung, Zugriff und Schutz persönlicher Daten und übertrage das auf digitale Gesundheitsdaten.') },
  ],
  lf3: [
    { keywords: ['infektion', 'hygiene'], video: embed('Was ist eine Entzündung?', 'Stiftung Gesundheitswissen', 'urC11dKhvP0', 'Unterscheide Entzündung und Infektion und notiere die typischen Entzündungszeichen.') },
    { keywords: ['impf', 'infektionskrank'], video: embed('Wie funktioniert eine Impfung?', 'Stiftung Gesundheitswissen', 'zRs8TMDVHPg', 'Achte auf Antigen, Immunantwort und Gedächtniszellen. Verknüpfe das mit Impfprävention in der Praxis.') },
    { keywords: ['infektion', 'antibiot'], video: embed('Was sind Antibiotika?', 'Stiftung Gesundheitswissen', 'QX-E4LOPJzY', 'Prüfe: Gegen welche Erreger helfen Antibiotika, gegen welche nicht und warum ist korrekte Einnahme wichtig?') },
  ],
  lf4: [
    { keywords: ['arthrose', 'bewegungsapparat'], video: embed('Arthrose – was kann Beschwerden lindern?', 'Stiftung Gesundheitswissen', 'hiJV3Pi4gj8', 'Ordne Bewegung, Gewichtsmanagement und weitere Maßnahmen den Behandlungszielen zu.', '2:47 Min.') },
    { keywords: ['arthrose', 'knie'], video: embed('Kniearthrose – Ziele der Behandlung', 'Stiftung Gesundheitswissen', 'PS1iucWi9qY', 'Achte auf Schmerzreduktion, Beweglichkeit und die Rolle konservativer Maßnahmen.', '1:19 Min.') },
    { keywords: ['arzneimittel', 'medikament'], video: embed('Verschreibungspflichtig, apothekenpflichtig oder freiverkäuflich?', 'Stiftung Gesundheitswissen', 'dm83l3NUOoE', 'Ordne die drei Kategorien und überlege, was sie für Beratung und Abgabe bedeuten.', '2:29 Min.') },
  ],
  lf5: [
    { keywords: ['blutdruck', 'vital'], video: embed('Was ist der Blutdruck?', 'Stiftung Gesundheitswissen', 'InL4b0w7_7I', 'Erkläre nach dem Video systolischen und diastolischen Wert in eigenen Worten.', '2:29 Min.') },
    { keywords: ['herz', 'kreislauf'], video: embed('Was ist die koronare Herzkrankheit?', 'Stiftung Gesundheitswissen', '5dRj3iDsgis', 'Verknüpfe Herzkranzgefäße, Sauerstoffmangel, Angina pectoris und Herzinfarkt.', '2:52 Min.') },
    { keywords: ['blutdruck', 'hyperton'], video: embed('Was ist Hypertonie?', 'Stiftung Gesundheitswissen', 'adXEW4BlGFY', 'Notiere Risikofaktoren und Folgen und verbinde sie mit einer korrekten Blutdruckmessung.', '2:54 Min.') },
  ],
  lf6: [
    { keywords: ['kaufvertrag', 'vertrag'], video: embed('Wie kommt ein Kaufvertrag zustande?', 'Die Merkhilfe Wirtschaft', 'g7j4NkgtiNo', 'Achte auf Angebot und Annahme und übertrage den Ablauf auf eine Materialbestellung der Praxis.') },
    { keywords: ['zahlung', 'sepa', 'zahlungsverkehr'], video: embed('SEPA-Lastschrift und Zahlungsverkehr', 'Deutsche Bundesbank / Lernvideo', 'TLUR2LHB3Lo', 'Unterscheide Überweisung und Lastschrift danach nach Auftraggeber, Mandat und Ablauf.') },
  ],
  lf7: [
    { keywords: ['organisation', 'aufbau', 'ablauf'], video: embed('Aufbau- und Ablauforganisation einfach erklärt', 'Studyflix / Eduty', 'dbuB2SVjgTI', 'Übertrage Aufbau = wer ist zuständig? und Ablauf = wie läuft es? auf eine Arztpraxis.') },
    { keywords: ['qualität', 'pdca', 'qm'], video: embed('PDCA-Zyklus – Verbesserungen systematisch prüfen', 'Lernvideo', '0s73-nXrnT8', 'Nutze als Beispiel lange Wartezeiten: Plan → Do → Check → Act.') },
  ],
  lf8: [
    { keywords: ['niere', 'urin', 'harn'], video: embed('Welche Funktionen haben die Nieren?', 'Stiftung Gesundheitswissen', 'VjRZUBAsXS8', 'Achte auf Filtration, Rückresorption, Ausscheidung und hormonelle Aufgaben der Niere.', '1:49 Min.') },
    { keywords: ['hormon'], video: embed('Wie funktioniert unser Hormonsystem?', 'Stiftung Gesundheitswissen', '1v6JSZPqOT8', 'Erkläre danach Botenstoff, Zielzelle und Rezeptor mit dem Schlüssel-Schloss-Prinzip.', '2:29 Min.') },
    { keywords: ['hormon', 'stoffwechsel'], video: embed('Wie wird der Blutzucker reguliert?', 'Stiftung Gesundheitswissen', 'LGStk64kHhQ', 'Beobachte die Wirkung von Insulin als konkretes Beispiel eines hormonellen Regelkreises.', '2:21 Min.') },
  ],
  lf9: [
    { keywords: ['leber', 'galle', 'pankreas'], video: embed('Welche Funktion hat die Leber?', 'Stiftung Gesundheitswissen', 'xQHJVi0qtV8', 'Notiere mindestens vier Leberfunktionen und leite daraus mögliche Folgen einer schweren Lebererkrankung ab.', '2:04 Min.') },
    { keywords: ['metabol', 'stoffwechsel'], video: embed('Was bedeutet Adipositas?', 'Stiftung Gesundheitswissen', 'xXfyJRLluL4', 'Achte auf BMI, Fettverteilung und das Zusammenspiel mit metabolischen Risiken.', '2:30 Min.') },
    { keywords: ['diabetes', 'blutzucker'], video: embed('Wie wird der Blutzucker reguliert?', 'Stiftung Gesundheitswissen', 'LGStk64kHhQ', 'Ordne Insulin, Glukoseaufnahme und Blutzuckersenkung zu einem Regelkreis.', '2:21 Min.') },
    { keywords: ['diabetes'], video: embed('Diabetes Typ 2 – Entstehung und Folgen', 'Stiftung Gesundheitswissen', 'PKmu73E--DQ', 'Achte besonders auf Insulinresistenz, schleichenden Verlauf und Folgeerkrankungen.', '3:09 Min.') },
  ],
  lf10: [
    { keywords: ['wunde', 'haut'], video: embed('Schürfwunde richtig versorgen', 'Stiftung Gesundheitswissen', 'v705JMbdEp0', 'Beobachte Reinigung, Schutz der Wunde und Warnzeichen, bei denen ärztlich beurteilt werden sollte.') },
    { keywords: ['entzündung', 'wunde', 'haut'], video: embed('Was ist eine Entzündung?', 'Stiftung Gesundheitswissen', 'urC11dKhvP0', 'Ordne Rötung, Wärme, Schwellung, Schmerz und Funktionsstörung ein und grenze sie von einer sicheren Infektionsdiagnose ab.') },
  ],
  lf11: [
    { keywords: ['prävention', 'vorsorge'], video: embed('Was ist Prävention?', 'Stiftung Gesundheitswissen', 'EMUNw8zyRZY', 'Unterscheide Primär-, Sekundär- und Tertiärprävention anhand eigener Beispiele.') },
    { keywords: ['impf'], video: embed('Wie funktioniert eine Impfung?', 'Stiftung Gesundheitswissen', 'zRs8TMDVHPg', 'Achte auf Immunantwort und Gedächtniszellen und übertrage das auf Impfmanagement in der Praxis.') },
    { keywords: ['impf'], video: embed('Von Grundimmunisierung bis Booster', 'Stiftung Gesundheitswissen', 'CoxUb_Cx7JI', 'Ordne Grundimmunisierung, Auffrischung und individuellen Impfstatus ein.') },
  ],
  lf12: [
    { keywords: ['sozialversicherung', 'versicherung'], video: embed('Gesetzliche Sozialversicherung einfach erklärt', 'explainity', '3OwjPK2hRj8', 'Ordne Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung den abgesicherten Risiken zu.') },
    { keywords: ['stress', 'selbstmanagement', 'gesund'], video: embed('Stress – was passiert im Körper?', 'Stiftung Gesundheitswissen', '6GKQrn1OcAI', 'Verbinde körperliche Stressreaktion mit Warnzeichen dauerhafter Überlastung und sinnvollen Gegenmaßnahmen.', '2:10 Min.') },
  ],
};

function normalized(value = '') {
  return value.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
}

function matches(title: string, keywords: string[]) {
  const value = normalized(title);
  return keywords.some(keyword => value.includes(normalized(keyword)));
}

export function addEmbeddedVideosEverywhere(module: LearningModule): LearningModule {
  const moduleRules = rules[module.id] || [];
  const topics = module.topics
    .filter(topic => topic.id !== 'video-mediathek')
    .map(topic => ({
      ...topic,
      // Reine Link-Karten werden entfernt. Lernvideos sollen direkt auf der Lernseite laufen.
      content: topic.content.filter(block => block.type !== 'video' || Boolean(block.embedUrl)),
    }));

  if (!moduleRules.length || !topics.length) return { ...module, topics };

  const seen = new Set(
    topics.flatMap(topic => topic.content)
      .filter(block => block.type === 'video' && block.embedUrl)
      .map(block => block.embedUrl as string),
  );

  moduleRules.forEach(rule => {
    if (rule.video.embedUrl && seen.has(rule.video.embedUrl)) return;
    let index = topics.findIndex(topic => matches(topic.title, rule.keywords));
    if (index < 0) index = 0;
    topics[index] = { ...topics[index], content: [...topics[index].content, rule.video] };
    if (rule.video.embedUrl) seen.add(rule.video.embedUrl);
  });

  return { ...module, topics };
}
