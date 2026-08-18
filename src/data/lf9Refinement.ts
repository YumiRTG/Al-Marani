import type { LearningModule, TopicContent } from '@/types';

type VideoBlock = TopicContent & { type: 'video' };

const embedded = (title: string, source: string, duration: string, caption: string, id: string): VideoBlock => ({
  type: 'video',
  title,
  source,
  duration,
  caption,
  embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
});

const topicMedia: Record<string, VideoBlock[]> = {
  'lf9-01-naehrstoffe': [
    embedded('Wie funktioniert das Verdauungssystem?', 'Stiftung Gesundheitswissen', '2:26 Min.', 'Achte darauf, wie Kohlenhydrate, Fette und Eiweiße zerlegt werden und wo die Nährstoffbausteine anschließend aufgenommen werden.', 'ZOAaEX0xoTw'),
  ],
  'lf9-02-verdauungsorgane': [
    embedded('Verdauung vom Mund bis zum Dickdarm', 'Stiftung Gesundheitswissen', '2:26 Min.', 'Stoppe gedanklich bei Mund, Magen, Dünndarm und Dickdarm und nenne jeweils die wichtigste Aufgabe des Organs.', 'ZOAaEX0xoTw'),
  ],
  'lf9-03-diagnostik': [
    embedded('Wie funktioniert Ultraschall?', 'Stiftung Gesundheitswissen', '1:11 Min.', 'Merke dir die Kette: Schallwelle → Reflexion → Echo → Bild. Überlege anschließend, warum Flüssigkeit, Luft und Weichteile unterschiedlich aussehen.', 'kVJ9_goljNs'),
    embedded('Wie funktioniert eine Magenspiegelung?', 'MVZ Landsberg', 'Kurzvideo', 'Verfolge den Weg des Gastroskops und achte darauf, was diagnostisch gesehen und was während der Untersuchung zusätzlich gemacht werden kann.', '0cXtwoKzx04'),
  ],
  'lf9-04-oberer-gi-trakt': [
    embedded('Was ist die Refluxkrankheit?', 'gesund.bund.de', 'Kurzvideo', 'Achte auf den unteren Speiseröhrenschließmuskel, den Rückfluss von Magensaft und die Entstehung von Sodbrennen.', '1cXn-LwSa0E'),
    embedded('Wie entsteht eine Magenschleimhautentzündung?', 'gesund.bund.de', 'Kurzvideo', 'Vergleiche nach dem Video Reflux, Gastritis und Ulkus: Wo liegt jeweils das eigentliche Problem?', '-XzRwarxlHk'),
  ],
  'lf9-05-unterer-gi-trakt': [
    embedded('Was passiert bei einer Blinddarmentzündung?', 'gesund.bund.de', 'Kurzvideo', 'Achte auf Wurmfortsatz, typischen Schmerzverlauf und Warnzeichen einer möglichen Perforation.', 'NhDTe6mJ_-Y'),
    embedded('Was ist eine Entzündung?', 'Stiftung Gesundheitswissen', '2:01 Min.', 'Nutze das Video als Grundlage für Divertikulitis, Appendizitis und Peritonitis: Welche typischen Entzündungszeichen lassen sich übertragen?', 'urC11dKhvP0'),
  ],
  'lf9-06-tumore': [
    embedded('Darmkrebs: Wie wird die Diagnose gestellt?', 'Stiftung Gesundheitswissen', 'Kurzvideo', 'Verbinde Vorsorge und Diagnostik mit den Begriffen Polyp, Gewebeprobe, Histologie und Tumorstadium.', 'xfsoz9Bixig'),
  ],
  'lf9-07-leber-galle-pankreas': [
    embedded('Wie entstehen Gallensteine?', 'gesund.bund.de', 'Kurzvideo', 'Achte auf Gallenblase, Gallengang, Kolik und den Zusammenhang zwischen Abflussstörung und Beschwerden.', 'eKsar6fOo28'),
    embedded('Welche Funktion hat die Leber?', 'Stiftung Gesundheitswissen', '2:04 Min.', 'Merke dir mindestens vier Leberfunktionen und leite daraus ab, warum eine schwere Lebererkrankung so viele unterschiedliche Folgen haben kann.', 'xQHJVi0qtV8'),
  ],
  'lf9-08-metabolisch': [
    embedded('Was bedeutet Adipositas?', 'Stiftung Gesundheitswissen', '2:30 Min.', 'Achte auf BMI, Grenzen des BMI und den Zusammenhang zwischen Adipositas und Folgeerkrankungen.', 'xXfyJRLluL4'),
    embedded('Was ist Hyperlipidämie?', 'Stiftung Gesundheitswissen', '3:03 Min.', 'Unterscheide Hypercholesterinämie und Hypertriglyzeridämie und verknüpfe erhöhte Blutfette mit Arteriosklerose.', 'nu0nY6VpxN4'),
    embedded('Was ist Cholesterin?', 'Stiftung Gesundheitswissen', '2:56 Min.', 'Konzentriere dich auf LDL und HDL: Wohin transportieren sie Cholesterin und warum ist ein dauerhaft hohes LDL problematisch?', '6IhgTDNtm94'),
  ],
  'lf9-09-diabetes-grundlagen': [
    embedded('Wie wird der Blutzucker reguliert?', 'Stiftung Gesundheitswissen', '2:21 Min.', 'Beobachte den Regelkreis nach einer Mahlzeit: Glukose steigt → Insulin wird ausgeschüttet → Glukose gelangt in die Zellen.', 'LGStk64kHhQ'),
    embedded('Was ist Diabetes mellitus Typ 2?', 'Stiftung Gesundheitswissen', '3:09 Min.', 'Achte besonders auf Insulinresistenz, schleichenden Verlauf und die Verbindung zu Gefäß- und Nervenschäden.', 'PKmu73E--DQ'),
  ],
  'lf9-10-diabetes-diagnostik': [
    embedded('Was ist Diabetes mellitus Typ 2?', 'Stiftung Gesundheitswissen', '3:09 Min.', 'Nutze das Video als Gesamtwiederholung: Symptome, Insulinresistenz, Diagnostik und Folgeerkrankungen.', 'PKmu73E--DQ'),
    embedded('Diabetes Typ 2: Medikamente auswählen', 'Stiftung Gesundheitswissen', '2:35 Min.', 'Achte darauf, warum die Therapie individuell gewählt wird und weshalb nicht jeder Mensch dieselbe Medikamentenkombination erhält.', 'GU5h1xNZJg4'),
    embedded('Diabetes Typ 2 mit gesundem Lebensstil behandeln', 'Stiftung Gesundheitswissen', '4:16 Min.', 'Übertrage das Video auf die MFA-Praxis: Welche alltagstauglichen Veränderungen können Patientinnen und Patienten langfristig unterstützen?', 'wLSkMKzcVfw'),
  ],
};

const overviews: Record<string, { text: string; items: string[] }> = {
  'lf9-01-naehrstoffe': {
    text: 'Hier entsteht das Fundament für das gesamte Lernfeld. Erst wenn klar ist, aus welchen Bausteinen Nahrung besteht und wofür der Körper sie braucht, lassen sich Verdauung und Stoffwechsel wirklich verstehen.',
    items: ['Kohlenhydrate → vor allem schnelle bzw. verfügbare Energie', 'Proteine → Aminosäuren als Bau- und Funktionsstoffe', 'Fette → Energiespeicher, Zellmembranen und Aufnahme der Vitamine A, D, E, K', 'Vitamine und Mineralstoffe liefern keine Energie, steuern aber viele Körperfunktionen'],
  },
  'lf9-02-verdauungsorgane': {
    text: 'Lerne den Verdauungstrakt als zusammenhängenden Weg. Bei jedem Organ sind drei Fragen entscheidend: Was kommt hinein? Was passiert dort? Was geht anschließend weiter?',
    items: ['Mund startet Zerkleinerung und Kohlenhydratverdauung', 'Magen mischt, säuert an und beginnt Proteinverdauung', 'Dünndarm ist Hauptort von Endverdauung und Resorption', 'Dickdarm gewinnt vor allem Wasser und Elektrolyte zurück'],
  },
  'lf9-03-diagnostik': {
    text: 'Diagnostik wird leichter, wenn du nicht Untersuchungen auswendig lernst, sondern die Frage dahinter verstehst: Soll ein Organ von außen beurteilt, eine Schleimhaut direkt angesehen, ein Laborhinweis gemessen oder verborgenes Blut nachgewiesen werden?',
    items: ['Sonografie → Organstruktur von außen', 'Gastroskopie → Schleimhaut direkt sehen und Proben entnehmen', 'Labor → Hinweise auf Organfunktion und Entzündung', 'Stuhltest → unter anderem verborgenes Blut nachweisen'],
  },
  'lf9-04-oberer-gi-trakt': {
    text: 'Bei Erkrankungen des oberen Verdauungstrakts hilft immer dieselbe Denkfolge: Ursache → betroffene Struktur → Mechanismus → typische Beschwerden → Diagnostik → Behandlungsprinzip.',
    items: ['Reflux = saurer Rückfluss in die Speiseröhre', 'Gastritis = Entzündung der Magenschleimhaut', 'Ulkus = tieferer Gewebsdefekt mit möglicher Blutung', 'Laktoseintoleranz = zu wenig Laktase, nicht automatisch eine Milcheiweißallergie'],
  },
  'lf9-05-unterer-gi-trakt': {
    text: 'Hier steht das Erkennen von Unterschieden und Warnzeichen im Mittelpunkt. Besonders wichtig ist, harmlose oder chronische Befunde von akuten entzündlichen Situationen zu trennen.',
    items: ['Divertikulose = Divertikel vorhanden', 'Divertikulitis = Divertikel entzündet', 'Appendizitis betrifft den Wurmfortsatz', 'Akutes Abdomen ist ein Warnkomplex und verlangt rasche ärztliche Abklärung'],
  },
  'lf9-06-tumore': {
    text: 'Tumorlehre wird verständlicher, wenn du vier Ebenen trennst: Zellverhalten, Ausbreitung, Stadium und Therapie. Danach lassen sich konkrete Tumorarten besser einordnen.',
    items: ['Benigne Tumoren metastasieren nicht', 'Maligne Tumoren können invasiv wachsen und metastasieren', 'TNM beschreibt Primärtumor, Lymphknoten und Fernmetastasen', 'Therapie kann lokal oder systemisch wirken'],
  },
  'lf9-07-leber-galle-pankreas': {
    text: 'Leber, Gallenwege und Pankreas liegen funktionell eng zusammen. Deshalb können Abflussstörungen, Entzündungen und Stoffwechselprobleme mehrere dieser Bereiche gleichzeitig betreffen.',
    items: ['Leber bildet Galle und übernimmt zentrale Stoffwechselaufgaben', 'Gallenblase speichert und konzentriert Galle', 'Pankreas liefert Verdauungsenzyme und bildet Insulin/Glukagon', 'Gallensteine können bei ungünstiger Lage eine Pankreatitis begünstigen'],
  },
  'lf9-08-metabolisch': {
    text: 'Beim metabolischen Syndrom wirken mehrere Risiken zusammen. Statt einzelne Begriffe isoliert zu lernen, baust du Ursache-Folge-Ketten bis zu Gefäßschäden und Folgeerkrankungen.',
    items: ['Adipositas und zentrale Fettverteilung erhöhen das Stoffwechselrisiko', 'Hohes LDL begünstigt Arteriosklerose', 'Hyperurikämie kann zu Uratkristallen und Gicht führen', 'Mehrere Risikofaktoren zusammen erhöhen das Herz-Kreislauf-Risiko besonders stark'],
  },
  'lf9-09-diabetes-grundlagen': {
    text: 'Diabetes wird über den normalen Blutzucker-Regelkreis verständlich. Erst Insulin und Glukagon verstehen, dann Typ 1 und Typ 2 vergleichen.',
    items: ['Insulin senkt den Blutzucker und fördert die Glukoseaufnahme', 'Glukagon stellt in Nüchternphasen Glukose bereit', 'Typ 1 = absoluter Insulinmangel durch Autoimmunreaktion', 'Typ 2 = zunächst vor allem Insulinresistenz, später kann Insulinmangel hinzukommen'],
  },
  'lf9-10-diabetes-diagnostik': {
    text: 'Zum Abschluss wird Diabetes als komplettes Praxis-Thema zusammengeführt: erkennen, messen, akute Entgleisungen unterscheiden, Spätfolgen verstehen und Therapieprinzipien zuordnen.',
    items: ['OGTT zeigt die Reaktion auf eine definierte Glukosebelastung', 'HbA1c beschreibt die längerfristige Blutzuckerbelastung', 'Hypoglykämie und schwere Hyperglykämie können Notfälle sein', 'Langfristig sind besonders Gefäße, Nerven, Augen, Nieren und Füße gefährdet'],
  },
};

function polish(value?: string) {
  if (!value) return value;
  return value
    .replace(/^\s*\[(?:V|I|T)\]\s*/i, '')
    .replace(/^\s*Bisherige Aufgabe:\s*/i, '')
    .replace(/^\s*Bisherige Unterlage:\s*/i, '')
    .replace(/\bbisherige(?:n|r|s)? Lernunterlage\b/gi, 'Lernstoff')
    .replace(/\bLernunterlage\b/gi, 'Lernstoff')
    .replace(/\baus der Unterlage\b/gi, 'aus dem Lernstoff')
    .replace(/\bin der Unterlage\b/gi, 'im Lernstoff')
    .replace(/\bdie Unterlage nennt\b/gi, 'wichtig sind')
    .replace(/\bUnterlagen-Zuordnung\b/gi, 'fachliche Zuordnung')
    .replace(/\bGlycerinmolekül\b/g, 'Glycerolmolekül')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function polishBlock(block: TopicContent): TopicContent | null {
  if (block.type === 'video') return null;
  return {
    ...block,
    title: polish(block.title),
    text: polish(block.text),
    term: polish(block.term),
    definition: polish(block.definition),
    caption: polish(block.caption),
    headers: block.headers?.map(item => polish(item) || item),
    rows: block.rows?.map(row => row.map(item => polish(item) || item)),
    items: block.items?.map(item => polish(item) || item),
  };
}

export function refineLf9(module: LearningModule): LearningModule {
  if (module.id !== 'lf9') return module;

  return {
    ...module,
    subtitle: 'Nährstoffe, Verdauung, Diagnostik, Magen-Darm-Erkrankungen, Tumore, Leber/Galle/Pankreas, Stoffwechsel und Diabetes – verständlich aufgebaut mit direkten Lernvideos.',
    description: 'Lernfeld 9 führt Schritt für Schritt vom Grundwissen zur klinischen Anwendung. Jeder Themenbereich beginnt mit einem klaren Überblick, enthält verständliche Erklärungen, direkt eingebettete Videos und kurze Wissenschecks. Fachbegriffe werden immer mit ihrer praktischen Bedeutung verknüpft.',
    topics: module.topics.map(topic => {
      const overview = overviews[topic.id];
      const cleaned = topic.content.map(polishBlock).filter((block): block is TopicContent => block !== null);
      const withoutOldLesson = cleaned.filter((block, index) => !(index === 0 && block.type === 'info' && block.title?.startsWith('Doppelstunde')));
      const intro: TopicContent[] = overview ? [
        { type: 'info', title: 'Darum geht es', text: overview.text },
        { type: 'list', items: overview.items },
        ...(topicMedia[topic.id] || []),
      ] : (topicMedia[topic.id] || []);

      return {
        ...topic,
        title: polish(topic.title) || topic.title,
        content: [...intro, ...withoutOldLesson],
      };
    }),
    questions: module.questions.map(question => ({
      ...question,
      question: polish(question.question) || question.question,
      explanation: polish(question.explanation) || question.explanation,
      options: question.options?.map(option => ({ ...option, text: polish(option.text) || option.text })),
    })),
  };
}
