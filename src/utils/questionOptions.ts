import type { LearningModule, QuizOption, QuizQuestion } from '@/types';

const stopWords = new Set([
  'aber', 'alle', 'auch', 'auf', 'aus', 'bei', 'der', 'die', 'das', 'dem', 'den', 'des', 'ein', 'eine', 'einer', 'einem', 'einen',
  'für', 'hat', 'haben', 'ist', 'kann', 'können', 'mit', 'nicht', 'oder', 'sind', 'und', 'von', 'vor', 'was', 'warum', 'welche',
  'welcher', 'welches', 'wie', 'wird', 'werden', 'zu', 'zum', 'zur', 'dass', 'im', 'in', 'am', 'an', 'einem', 'einen', 'einer',
  'beim', 'beziehungsweise', 'gehört', 'gehören', 'richtig', 'aussage', 'aussagen', 'trifft', 'zutreffend', 'beschreibt', 'bedeutet',
]);

const badOptionPatterns = [
  /gehört nicht zu diesem lernabschnitt/i,
  /widerspricht dem .*lernabschnitt/i,
  /hat hier keine fachliche bedeutung/i,
  /lässt sich aus dem lernstoff nicht ableiten/i,
  /lässt sich aus dem lerninhalt nicht ableiten/i,
  /der .*zusammenhang gilt genau umgekehrt/i,
  /das gegenteil davon wäre .* richtig/i,
  /fachbegriffe können hier beliebig gleichgesetzt werden/i,
  /keine der beschriebenen fachlichen aussagen/i,
  /kommt in (diesem|dem) lernfeld nicht vor/i,
  /kommt in (diesem|dem) thema nicht vor/i,
];

type OptionStyle = 'numeric' | 'short' | 'sentence';

function clean(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function normalize(value: string) {
  return clean(value)
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, ' ');
}

function tokens(value: string) {
  return new Set(
    normalize(value)
      .split(/\s+/)
      .filter(token => token.length >= 3 && !stopWords.has(token)),
  );
}

function isBadOption(value: string) {
  const text = clean(value);
  return !text || badOptionPatterns.some(pattern => pattern.test(text));
}

function unique(values: string[]) {
  const seen = new Set<string>();
  return values.filter(value => {
    const key = normalize(value);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function correctTexts(question: QuizQuestion) {
  if (question.options?.length) return question.options.filter(option => option.correct).map(option => clean(option.text));
  if (Array.isArray(question.correctAnswer)) return question.correctAnswer.map(clean).filter(Boolean);
  if (typeof question.correctAnswer === 'string' && question.correctAnswer.trim()) return [clean(question.correctAnswer)];
  return question.explanation ? [clean(question.explanation)] : [];
}

function overlap(a: Set<string>, b: Set<string>) {
  let hits = 0;
  a.forEach(token => { if (b.has(token)) hits += 1; });
  return hits;
}

function optionStyle(value: string): OptionStyle {
  const text = clean(value);
  if (/^(?:ca\.\s*)?\d+(?:[.,]\d+)?(?:\s*(?:-|bis)\s*\d+(?:[.,]\d+)?)?(?:\s*(?:minuten?|stunden?|tage?|wochen?|monate?|jahre?|%|mmhg|mg\/dl|mmol\/l))?\.?$/i.test(text)) return 'numeric';
  if (text.split(/\s+/).length <= 6 && text.length <= 58 && !/[.!?].+\S/.test(text)) return 'short';
  return 'sentence';
}

function preferredStyle(correct: string[], explicit: string[]): OptionStyle {
  const samples = [...correct, ...explicit].filter(Boolean);
  const counts: Record<OptionStyle, number> = { numeric: 0, short: 0, sentence: 0 };
  samples.forEach(value => { counts[optionStyle(value)] += 1; });
  return (Object.entries(counts) as [OptionStyle, number][]).sort((a, b) => b[1] - a[1])[0]?.[0] || 'sentence';
}

function candidateScore(questionText: string, correct: string[], sourceQuestion: QuizQuestion, optionText: string, style: OptionStyle) {
  const currentQuestionTokens = tokens(questionText);
  const currentContextTokens = tokens(`${questionText} ${correct.join(' ')}`);
  const sourceTokens = tokens(sourceQuestion.question);
  const optionTokens = tokens(optionText);
  const exactQuestionBonus = normalize(questionText) === normalize(sourceQuestion.question) ? 180 : 0;
  const styleBonus = optionStyle(optionText) === style ? 18 : 0;
  return exactQuestionBonus
    + styleBonus
    + overlap(currentQuestionTokens, sourceTokens) * 14
    + overlap(currentContextTokens, optionTokens) * 6
    + overlap(sourceTokens, optionTokens) * 2;
}

function numericNearMisses(correct: string[]) {
  const results: string[] = [];
  correct.forEach(value => {
    const matches = [...value.matchAll(/\b\d+(?:[.,]\d+)?\b/g)];
    if (matches.length !== 1) return;
    const raw = matches[0][0];
    const number = Number(raw.replace(',', '.'));
    if (!Number.isFinite(number)) return;
    const deltas = number <= 5 ? [1, 2] : number <= 20 ? [2, 4] : number <= 100 ? [5, 10] : [10, 20];
    deltas.forEach(delta => {
      [number - delta, number + delta].forEach(candidate => {
        if (candidate < 0 || candidate === number) return;
        const replacement = Number.isInteger(number) ? String(Math.round(candidate)) : candidate.toFixed(1).replace('.', ',');
        results.push(value.replace(raw, replacement));
      });
    });
  });
  return results;
}

export function logicalDistractorsForQuestion(
  questionText: string,
  correct: string[],
  questions: QuizQuestion[],
  count: number,
  explicit: string[] = [],
) {
  const correctKeys = new Set(correct.map(normalize));
  const used = new Set<string>();
  const result: string[] = [];
  const style = preferredStyle(correct, explicit);

  const push = (value: string) => {
    const text = clean(value);
    const key = normalize(text);
    if (!key || correctKeys.has(key) || used.has(key) || isBadOption(text)) return;
    used.add(key);
    result.push(text);
  };

  explicit.forEach(push);

  if (result.length < count && style === 'numeric') {
    numericNearMisses(correct).forEach(value => {
      if (result.length < count) push(value);
    });
  }

  if (result.length < count) {
    const ranked = questions.flatMap(sourceQuestion =>
      (sourceQuestion.options || [])
        .filter(option => !option.correct && !isBadOption(option.text))
        .map(option => ({
          text: clean(option.text),
          score: candidateScore(questionText, correct, sourceQuestion, option.text, style),
        })),
    ).sort((a, b) => b.score - a.score);

    ranked.forEach(candidate => {
      if (result.length < count) push(candidate.text);
    });
  }

  if (result.length < count) numericNearMisses(correct).forEach(push);

  if (result.length < count) {
    const remainingWrong = questions.flatMap(question =>
      (question.options || []).filter(option => !option.correct && !isBadOption(option.text)).map(option => option.text),
    );
    remainingWrong.forEach(value => {
      if (result.length < count) push(value);
    });
  }

  return result.slice(0, count);
}

export function buildFiveOptions(
  questionText: string,
  correct: string[],
  questions: QuizQuestion[],
  seed = 0,
  explicitDistractors: string[] = [],
): QuizOption[] {
  const normalizedCorrect = unique(correct.map(clean).filter(Boolean));
  const correctLimited = normalizedCorrect.slice(0, 5);
  const neededWrong = Math.max(0, 5 - correctLimited.length);
  const wrong = logicalDistractorsForQuestion(questionText, correctLimited, questions, neededWrong, explicitDistractors);
  const entries = [
    ...correctLimited.map(text => ({ text, correct: true })),
    ...wrong.map(text => ({ text, correct: false })),
  ];

  const shift = entries.length ? Math.abs(seed) % entries.length : 0;
  const rotated = [...entries.slice(shift), ...entries.slice(0, shift)].slice(0, 5);
  return rotated.map((entry, index) => ({ id: String.fromCharCode(97 + index), ...entry }));
}

export function polishQuestionOptions(module: LearningModule): LearningModule {
  const originalQuestions = module.questions;
  const questions = originalQuestions.map((question, index): QuizQuestion => {
    if (question.type !== 'single' && question.type !== 'multiple') return question;

    const correct = correctTexts(question);
    const existingWrong = (question.options || [])
      .filter(option => !option.correct && !isBadOption(option.text))
      .map(option => option.text);
    const options = buildFiveOptions(question.question, correct, originalQuestions, module.number * 101 + index * 17, existingWrong);
    const multiple = options.filter(option => option.correct).length > 1;

    return {
      ...question,
      type: multiple ? 'multiple' : 'single',
      options,
    };
  });

  return { ...module, questions };
}
