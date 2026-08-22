from pathlib import Path

path = Path('src/pages/ModuleDetailV4.tsx')
text = path.read_text(encoding='utf-8')

anchor = "import { LearningRewardGame } from '@/components/LearningRewardGame';\n"
insert = "import { LearningRewardGame } from '@/components/LearningRewardGame';\nimport { buildFiveOptions } from '@/utils/questionOptions';\n"
if "buildFiveOptions" not in text:
    if anchor not in text:
        raise SystemExit('import anchor missing')
    text = text.replace(anchor, insert, 1)

old = '''function makeQuickCheckOptions(correctValues: string[], seed: number, explicitDistractors: string[] = []): QuizOption[] {
  const correct = unique(correctValues.map(value => shortAnswer(value))).filter(Boolean);
  const fallbackDistractors = [
    'Diese Aussage widerspricht dem im Lernabschnitt beschriebenen Zusammenhang.',
    'Die genannten Fachbegriffe können hier beliebig gleichgesetzt werden.',
    'Der im Lernabschnitt erklärte Zusammenhang gilt genau umgekehrt.',
    'Diese Aussage lässt sich aus dem Lernstoff nicht ableiten.',
  ];
  const distractors = unique([...explicitDistractors.map(value => shortAnswer(value)), ...fallbackDistractors])
    .filter(value => !correct.includes(value) && value.length >= 5);
  const wrongCount = Math.max(2, 5 - correct.length);
  const entries = [
    ...correct.map(text => ({ text, correct: true })),
    ...distractors.slice(0, wrongCount).map(text => ({ text, correct: false })),
  ];
  const shift = entries.length ? seed % entries.length : 0;
  return [...entries.slice(shift), ...entries.slice(0, shift)].map((entry, index) => ({ id: String.fromCharCode(97 + index), ...entry }));
}

function buildChecks(sources: PracticeSource[], blocks: TopicContent[], seed: number): QuickCheck[] {
  const fallback = fallbackPractice('diesem Thema', blocks);
  const selected = [...sources.slice(0, 2)];
  while (selected.length < 2) selected.push(fallback[selected.length] || fallback[0]);
  return selected.slice(0, 2).map((source, index) => ({
    question: source.question || 'Welche Aussage ist richtig?',
    options: makeQuickCheckOptions(source.solutions, seed + index * 11, source.distractors),
    explanation: source.solutions.join(' · '),
    multiple: source.solutions.length > 1,
  }));
}

function splitTopicIntoSteps(topic: LearningTopic, topicIndex: number): GuidedStep[] {'''
new = '''function makeQuickCheckOptions(
  questionText: string,
  correctValues: string[],
  seed: number,
  explicitDistractors: string[] = [],
  questionBank: QuizQuestion[] = [],
): QuizOption[] {
  const correct = unique(correctValues.map(value => shortAnswer(value))).filter(Boolean);
  return buildFiveOptions(questionText, correct, questionBank, seed, explicitDistractors);
}

function buildChecks(sources: PracticeSource[], blocks: TopicContent[], seed: number, questionBank: QuizQuestion[]): QuickCheck[] {
  const fallback = fallbackPractice('diesem Thema', blocks);
  const selected = [...sources.slice(0, 2)];
  while (selected.length < 2) selected.push(fallback[selected.length] || fallback[0]);
  return selected.slice(0, 2).map((source, index) => ({
    question: source.question || 'Welche Aussage ist richtig?',
    options: makeQuickCheckOptions(source.question, source.solutions, seed + index * 11, source.distractors, questionBank),
    explanation: source.solutions.join(' · '),
    multiple: source.solutions.length > 1,
  }));
}

function splitTopicIntoSteps(topic: LearningTopic, topicIndex: number, questionBank: QuizQuestion[]): GuidedStep[] {'''
if old not in text:
    raise SystemExit('quick-check block not found')
text = text.replace(old, new, 1)

old_call = "      checks: buildChecks(sources, blocks, topicIndex * 37 + stepIndex * 13 + 5),"
new_call = "      checks: buildChecks(sources, blocks, topicIndex * 37 + stepIndex * 13 + 5, questionBank),"
if old_call not in text:
    raise SystemExit('buildChecks call missing')
text = text.replace(old_call, new_call, 1)

old_topics = "  const topicSteps = useMemo(() => module.topics.map((topic, index) => splitTopicIntoSteps(topic, index)), [module.topics]);"
new_topics = "  const topicSteps = useMemo(() => module.topics.map((topic, index) => splitTopicIntoSteps(topic, index, module.questions)), [module.topics, module.questions]);"
if old_topics not in text:
    raise SystemExit('topicSteps line missing')
text = text.replace(old_topics, new_topics, 1)

old_normalize = '''function normalizeFinalQuestions(module: LearningModule): QuizQuestion[] {
  const pool = module.questions.map(answerText).filter(Boolean);
  let keptOpen = false;
  return module.questions.map((question, index) => {
    if (question.type === 'single' || question.type === 'multiple') return { ...question, id: 20000 + index };
    if (question.type === 'text' && !keptOpen) {
      keptOpen = true;
      return { ...question, id: 20000 + index };
    }
    const correct = answerText(question);
    return {
      ...question,
      id: 20000 + index,
      type: 'single' as const,
      options: makeOptions(correct, pool, index * 9 + module.number * 7),
      correctAnswer: undefined,
    };
  });
}'''
new_normalize = '''function normalizeFinalQuestions(module: LearningModule): QuizQuestion[] {
  let keptOpen = false;
  return module.questions.map((question, index) => {
    if (question.type === 'single' || question.type === 'multiple') return { ...question, id: 20000 + index };
    if (question.type === 'text' && !keptOpen) {
      keptOpen = true;
      return { ...question, id: 20000 + index };
    }
    const correct = answerText(question);
    return {
      ...question,
      id: 20000 + index,
      type: 'single' as const,
      options: buildFiveOptions(question.question, [correct], module.questions, index * 9 + module.number * 7),
      correctAnswer: undefined,
    };
  });
}'''
if old_normalize not in text:
    raise SystemExit('normalizeFinalQuestions block missing')
text = text.replace(old_normalize, new_normalize, 1)

path.write_text(text, encoding='utf-8')
