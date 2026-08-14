import type { LearningModule, QuizOption, QuizQuestion, TopicContent } from '@/types';

function naturalize(value?: string) {
  if (!value) return value;

  return value
    .replace(/PDF[- ]?Erweiterung\s*:?\s*/gi, '')
    .replace(/Erweiterung aus (?:der )?PDF\s*:?\s*/gi, '')
    .replace(/aus der hochgeladenen (?:PDF|Unterlage|Lernunterlage)/gi, '')
    .replace(/aus der (?:PDF|Unterlage|Lernunterlage)/gi, '')
    .replace(/in der (?:PDF|Unterlage|Lernunterlage)/gi, 'hier')
    .replace(/laut (?:PDF|Unterlage|Lernunterlage)/gi, 'hier')
    .replace(/nach der (?:PDF|Unterlage|Lernunterlage)/gi, 'hier')
    .replace(/die (?:PDF|Unterlage|Lernunterlage) nennt/gi, 'wichtig sind')
    .replace(/die (?:PDF|Unterlage|Lernunterlage) ordnet/gi, 'eingeordnet wird')
    .replace(/entspricht der (?:PDF|Unterlage|Lernunterlage)/gi, 'ist richtig')
    .replace(/im hochgeladenen Lernmaterial/gi, 'in diesem Lernfeld')
    .replace(/die zusätzlichen Lern- und Übungsunterlagen sind vollständig als/gi, 'die Inhalte werden zusätzlich mit')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([,.!?;:])/g, '$1')
    .trim();
}

function answerText(question: QuizQuestion) {
  if ((question.type === 'single' || question.type === 'multiple') && question.options?.length) {
    const correct = question.options.filter(option => option.correct).map(option => option.text);
    if (correct.length) return correct.join(' · ');
  }

  if (Array.isArray(question.correctAnswer)) return question.correctAnswer.join(' · ');
  if (typeof question.correctAnswer === 'string' && question.correctAnswer.trim()) {
    return question.correctAnswer
      .split(',')
      .map(part => part.trim())
      .filter(Boolean)
      .join(' · ');
  }

  return question.explanation;
}

function unique<T>(values: T[]) {
  return Array.from(new Set(values));
}

function makeOptions(correct: string, pool: string[], seed: number): QuizOption[] {
  const candidates = unique(pool)
    .filter(value => value && value !== correct)
    .filter(value => value.length <= 180);

  const distractors: string[] = [];
  for (let offset = 0; offset < candidates.length && distractors.length < 3; offset += 1) {
    const value = candidates[(seed + offset * 3) % candidates.length];
    if (value && !distractors.includes(value)) distractors.push(value);
  }

  const fallbacks = [
    'Keine der genannten Aussagen trifft zu.',
    'Das lässt sich aus diesem Thema so nicht ableiten.',
    'Nur der erste Teil der Aussage wäre richtig.',
  ];
  for (const fallback of fallbacks) {
    if (distractors.length >= 3) break;
    if (fallback !== correct && !distractors.includes(fallback)) distractors.push(fallback);
  }

  const entries = [
    { text: correct, correct: true },
    ...distractors.slice(0, 3).map(text => ({ text, correct: false })),
  ];

  const shift = seed % entries.length;
  const rotated = [...entries.slice(shift), ...entries.slice(0, shift)];
  return rotated.map((entry, index) => ({ id: String.fromCharCode(97 + index), ...entry }));
}

function reduceWriting(module: LearningModule) {
  const pool = module.questions.map(answerText).map(value => naturalize(value) || value).filter(Boolean);
  let keptTextQuestion = false;

  return module.questions.map((question, index): QuizQuestion => {
    const normalized: QuizQuestion = {
      ...question,
      question: naturalize(question.question) || question.question,
      explanation: naturalize(question.explanation) || question.explanation,
      options: question.options?.map(option => ({ ...option, text: naturalize(option.text) || option.text })),
    };

    if (normalized.type !== 'text') return normalized;

    // Eine offene Formulierungsaufgabe pro Lernfeld bleibt bewusst erhalten.
    if (!keptTextQuestion) {
      keptTextQuestion = true;
      return normalized;
    }

    const correct = naturalize(answerText(normalized)) || answerText(normalized);
    return {
      id: normalized.id,
      question: normalized.question,
      type: 'single',
      options: makeOptions(correct, pool, index + module.number * 7),
      explanation: normalized.explanation,
      points: normalized.points,
    };
  });
}

function cleanBlock(block: TopicContent): TopicContent {
  return {
    ...block,
    title: naturalize(block.title),
    text: naturalize(block.text),
    term: naturalize(block.term),
    definition: naturalize(block.definition),
    caption: naturalize(block.caption),
    headers: block.headers?.map(value => naturalize(value) || value),
    rows: block.rows?.map(row => row.map(value => naturalize(value) || value)),
    items: block.items?.map(value => naturalize(value) || value),
  };
}

export function makeLearningMoreEngaging(module: LearningModule): LearningModule {
  return {
    ...module,
    title: naturalize(module.title) || module.title,
    subtitle: naturalize(module.subtitle) || module.subtitle,
    description: naturalize(module.description) || module.description,
    topics: module.topics.map(topic => ({
      ...topic,
      title: naturalize(topic.title) || topic.title,
      content: topic.content.map(cleanBlock),
    })),
    questions: reduceWriting(module),
  };
}
