import type { LearningModule, TopicContent } from '@/types';

const topicTitles: Record<string, string> = {
  'lf9-01-naehrstoffe': '1. Nährstoffe – Kohlenhydrate, Proteine, Fette, Vitamine und Mineralstoffe',
  'lf9-02-verdauungsorgane': '2. Verdauungsorgane – Weg der Nahrung, Aufbau und Funktion',
  'lf9-03-diagnostik': '3. Diagnostik – Beschwerden erkennen und Untersuchungen verstehen',
  'lf9-04-oberer-gi-trakt': '4. Oberer Magen-Darm-Trakt – Reflux, Gastritis, Ulkus und Unverträglichkeiten',
  'lf9-05-unterer-gi-trakt': '5. Unterer Magen-Darm-Trakt – Divertikulitis, Appendizitis und Warnzeichen',
  'lf9-06-tumore': '6. Tumore und Krebs im Verdauungstrakt',
  'lf9-07-leber-galle-pankreas': '7. Leber, Galle und Pankreas – wichtige Erkrankungen verstehen',
  'lf9-08-metabolisch': '8. Stoffwechselerkrankungen – Adipositas, Blutfette und Gicht',
  'lf9-09-diabetes-grundlagen': '9. Diabetes – Blutzuckerregulation, Insulin, Typ 1 und Typ 2',
  'lf9-10-diabetes-diagnostik': '10. Diabetes – Diagnostik, Entgleisungen, Spätfolgen und Therapie',
};

function learnerText(value?: string) {
  if (!value) return value;

  return value
    .replace(/^\s*\[(?:V|I|T)\]\s*/gi, '')
    .replace(/\bBisherige Aufgabe:\s*/gi, '')
    .replace(/\bBisherige Unterlage:\s*/gi, '')
    .replace(/\bbisherige(?:n|r|s)?\s+Aufgaben?\b/gi, 'Übungen')
    .replace(/\bbisherige(?:n|r|s)?\s+Fall\b/gi, 'Fall')
    .replace(/\bbisherige(?:n|r|s)?\s+Gastroskopie-Transferfrage\b/gi, 'Transferfrage zur Gastroskopie')
    .replace(/\bDie Lernunterlage nennt\b/gi, 'Typisch sind')
    .replace(/\bDie Unterlage nennt\b/gi, 'Typisch sind')
    .replace(/\bDer Lernstoff nennt\b/gi, 'Typisch sind')
    .replace(/\bDie Lernunterlage beschreibt\b/gi, 'Typisch ist')
    .replace(/\bDie Unterlage beschreibt\b/gi, 'Typisch ist')
    .replace(/\bDie Lernunterlage nutzt\b/gi, 'Als Lernhilfe dient')
    .replace(/\bDie Unterlage nutzt\b/gi, 'Als Lernhilfe dient')
    .replace(/\bDer Lernstoff nutzt\b/gi, 'Als Lernhilfe dient')
    .replace(/\bin der Lernunterlage\b/gi, 'hier')
    .replace(/\baus der Lernunterlage\b/gi, 'hier')
    .replace(/\bin der Unterlage\b/gi, 'hier')
    .replace(/\baus der Unterlage\b/gi, 'hier')
    .replace(/\bim Lernstoff\b/gi, 'hier')
    .replace(/\baus dem Lernstoff\b/gi, 'hier')
    .replace(/\bUnterlagenwert\b/gi, 'Lernwert')
    .replace(/\bLernunterlage\b/gi, 'Lerninhalt')
    .replace(/\bUnterlage\b/gi, 'Lerninhalt')
    .replace(/\bGlycerin\b/g, 'Glycerol')
    .replace(/\s+([,.!?;:])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function polishBlock(block: TopicContent): TopicContent {
  return {
    ...block,
    title: learnerText(block.title),
    text: learnerText(block.text),
    term: learnerText(block.term),
    definition: learnerText(block.definition),
    caption: learnerText(block.caption),
    headers: block.headers?.map(value => learnerText(value) || value),
    rows: block.rows?.map(row => row.map(value => learnerText(value) || value)),
    items: block.items?.map(value => learnerText(value) || value),
  };
}

export function finalPolishLf9(module: LearningModule): LearningModule {
  if (module.id !== 'lf9') return module;

  return {
    ...module,
    title: 'Ernährung, Verdauung und Stoffwechsel',
    topics: module.topics.map(topic => ({
      ...topic,
      title: topicTitles[topic.id] || learnerText(topic.title) || topic.title,
      content: topic.content.map(polishBlock),
    })),
    questions: module.questions.map(question => ({
      ...question,
      question: learnerText(question.question) || question.question,
      explanation: learnerText(question.explanation) || question.explanation,
      options: question.options?.map(option => ({ ...option, text: learnerText(option.text) || option.text })),
    })),
  };
}
