import type { LearningModule, LearningTopic, TopicContent } from '@/types';

const topicTitleOverrides: Record<string, Record<string, string>> = {
  lf4: {
    'anamnese-basics': '1. Anamnese – Beschwerden systematisch erfassen',
    'symptome-untersuchung': '2. Symptome und körperliche Untersuchung',
    'gelenke-arthrose': '3. Gelenke, Bewegungsapparat und Arthrose',
    'knochen-frakturen': '4. Knochenaufbau und Frakturen',
    'anatomie-wirbelsaeule': '5. Anatomische Richtungsbegriffe und Wirbelsäule',
    'arzneimittel-basics': '6. Arzneimittel – Grundlagen und sichere Anwendung',
    'injektionen-sicherheit': '7. Injektionen und Medikamentensicherheit',
  },
  lf5: {
    'herz-basics': '1. Herz – Aufbau und Blutfluss verstehen',
    'atemwege-basics': '3. Atemwege – von Nase bis Alveolen',
    'goae-basics': '5. GOÄ – Grundlagen der Privatabrechnung',
  },
  lf6: {
    'praxisfaelle': '7. Praxisfälle zum Anwenden',
  },
  lf8: {
    'harnsystem': '1. Harnsystem – Aufbau und Weg des Urins',
  },
  lf9: {
    'video-mediathek': '🎬 Video-Mediathek Lernfeld 9',
  },
};

const moduleCopyOverrides: Record<string, Partial<Pick<LearningModule, 'title' | 'subtitle' | 'description'>>> = {
  lf4: {
    subtitle: 'Anamnese, körperliche Untersuchung, Bewegungsapparat und sichere Arzneimittelanwendung',
    description: 'Der Lernkurs baut Anamnese, Untersuchung, Bewegungsapparat und Arzneimittel Schritt für Schritt auf. Schaubilder, kurze Videos, Praxisbeispiele und Prüfungsfragen verbinden Grundlagen mit typischen Situationen aus der Arztpraxis.',
  },
  lf5: {
    subtitle: 'Herz, Blutkreislauf, Puls, Blutdruck, Atmung, Gasaustausch und Grundlagen der Privatabrechnung',
    description: 'Herz-Kreislauf-System, Atmung und GOÄ werden schrittweise erklärt und mit Schaubildern, Videos, Praxisbeispielen und prüfungsnahen Aufgaben verbunden.',
  },
  lf6: {
    subtitle: 'Rechtsgeschäfte, Lagerhaltung, Entsorgung, Betäubungsmittel, Medizinprodukte und Zahlungsverkehr verständlich erklärt',
    description: 'Wirtschaftliche und rechtliche Grundlagen werden zuerst an typischen Praxissituationen erklärt und anschließend mit den passenden Fachbegriffen verknüpft.',
  },
  lf7: {
    description: 'Praxisorganisation, Marketing, IGeL, Postbearbeitung und Qualitätsmanagement werden anhand typischer Abläufe und Praxisfälle miteinander verknüpft.',
  },
  lf8: {
    description: 'Der Lernkurs verbindet Harnorgane, Geschlechtsorgane, Schwangerschaft, Hormone, Verhütung und STI mit klaren Schaubildern, Fachbegriffen und prüfungsnahen Fällen.',
  },
};

function cleanWording(value?: string) {
  if (!value) return value;

  return value
    .replace(/\bBisherige Aufgabe:\s*/gi, '')
    .replace(/\bbisherige Aufgaben\b/gi, 'Übungen')
    .replace(/\bbisherigen Aufgaben\b/gi, 'Übungen')
    .replace(/\bbisheriger Fall\b/gi, 'Fall')
    .replace(/\bbisherige Fallaufgabe\b/gi, 'Fallaufgabe')
    .replace(/\balle bisherigen \+ neue Videos\b/gi, 'Lernvideos')
    .replace(/\bDie Lernunterlage nennt\b/gi, 'Wichtig sind')
    .replace(/\bDie Unterlage nennt\b/gi, 'Wichtig sind')
    .replace(/\bDie Lernunterlage beschreibt\b/gi, 'Beschrieben wird')
    .replace(/\bDie Unterlage beschreibt\b/gi, 'Beschrieben wird')
    .replace(/\bDie Lernunterlage nutzt\b/gi, 'Als Lernhilfe dient')
    .replace(/\bDie Unterlage nutzt\b/gi, 'Als Lernhilfe dient')
    .replace(/\b[Ll]aut Lernunterlage\b/g, 'für diesen Lernabschnitt')
    .replace(/\b[Ll]aut Unterlage\b/g, 'für diesen Lernabschnitt')
    .replace(/\bin der Lernunterlage\b/gi, 'im Lerninhalt')
    .replace(/\baus der Lernunterlage\b/gi, 'aus dem Lerninhalt')
    .replace(/\bin der Unterlage\b/gi, 'im Lerninhalt')
    .replace(/\baus der Unterlage\b/gi, 'aus dem Lerninhalt')
    .replace(/\bDie Lernunterlage\b/g, 'Der Lerninhalt')
    .replace(/\bDie Unterlage\b/g, 'Der Lerninhalt')
    .replace(/\bder Lernunterlage\b/gi, 'des Lerninhalts')
    .replace(/\bder Unterlage\b/gi, 'des Lerninhalts')
    .replace(/\bLernunterlage\b/gi, 'Lerninhalt')
    .replace(/\bUnterlagenwert\b/gi, 'Lernwert')
    .replace(/\s+([,.!?;:])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function cleanTitle(value?: string) {
  const cleaned = cleanWording(value);
  return cleaned?.replace(/\s&\s/g, ' und ');
}

function polishBlock(block: TopicContent): TopicContent | null {
  // A search-results page is not a learning video. Keep real direct resources and embedded videos,
  // but remove old placeholder searches that send learners away from the course.
  if (
    block.type === 'video' &&
    (block.source === 'Lernvideo-Suche' || block.url?.includes('youtube.com/results'))
  ) {
    return null;
  }

  return {
    ...block,
    title: cleanTitle(block.title),
    text: cleanWording(block.text),
    term: cleanWording(block.term),
    definition: cleanWording(block.definition),
    caption: cleanWording(block.caption),
    headers: block.headers?.map(item => cleanWording(item) || item),
    rows: block.rows?.map(row => row.map(item => cleanWording(item) || item)),
    items: block.items?.map(item => cleanWording(item) || item),
  };
}

function sentenceParts(text: string) {
  return text.match(/[^.!?]+(?:[.!?]+|$)/g)?.map(part => part.trim()).filter(Boolean) || [text];
}

function splitLongText(block: TopicContent): TopicContent[] {
  if (block.type !== 'text' || !block.text) return [block];
  const words = block.text.trim().split(/\s+/).length;
  if (words < 55) return [block];

  const sentences = sentenceParts(block.text);
  if (sentences.length < 2) return [block];

  const totalWords = sentences.reduce((sum, sentence) => sum + sentence.split(/\s+/).length, 0);
  let running = 0;
  let splitAt = 1;
  for (let index = 0; index < sentences.length - 1; index += 1) {
    running += sentences[index].split(/\s+/).length;
    splitAt = index + 1;
    if (running >= totalWords / 2) break;
  }

  const first = sentences.slice(0, splitAt).join(' ');
  const second = sentences.slice(splitAt).join(' ');
  if (!first || !second) return [block];

  return [
    { ...block, text: first },
    { type: 'text', text: second },
  ];
}

function polishTopic(moduleId: string, topic: LearningTopic): LearningTopic {
  const content = topic.content
    .map(polishBlock)
    .filter((block): block is TopicContent => Boolean(block))
    .flatMap(splitLongText);

  return {
    ...topic,
    title: topicTitleOverrides[moduleId]?.[topic.id] || cleanTitle(topic.title) || topic.title,
    content,
  };
}

export function finalReadabilityPolish(module: LearningModule): LearningModule {
  const copy = moduleCopyOverrides[module.id] || {};

  return {
    ...module,
    ...copy,
    title: cleanTitle(copy.title || module.title) || module.title,
    subtitle: cleanWording(copy.subtitle || module.subtitle) || module.subtitle,
    description: cleanWording(copy.description || module.description) || module.description,
    topics: module.topics.map(topic => polishTopic(module.id, topic)),
    questions: module.questions.map(question => ({
      ...question,
      question: cleanWording(question.question) || question.question,
      explanation: cleanWording(question.explanation) || question.explanation,
      options: question.options?.map(option => ({
        ...option,
        text: cleanWording(option.text) || option.text,
      })),
    })),
  };
}
