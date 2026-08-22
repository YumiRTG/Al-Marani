import { getCuratedDistractors } from './questionDistractorOverrides';
import type { LearningModule, LearningTopic, QuizQuestion, TopicContent } from '@/types';

function correctAnswerText(question: QuizQuestion) {
  if ((question.type === 'single' || question.type === 'multiple') && question.options?.length) {
    const correct = question.options.filter(option => option.correct).map(option => option.text);
    if (correct.length) return correct.join('&&&');
  }

  if (question.explanation?.trim()) return question.explanation.trim();
  if (Array.isArray(question.correctAnswer)) return question.correctAnswer.join(' · ');
  if (typeof question.correctAnswer === 'string' && question.correctAnswer.trim()) {
    return question.correctAnswer.split(',').map(part => part.trim()).filter(Boolean).join(' · ');
  }

  return 'Die richtige Antwort ergibt sich aus dem Lerninhalt.';
}

function displayCorrectAnswer(question: QuizQuestion) {
  return correctAnswerText(question).split('&&&').join(' · ');
}

function wrongAnswerTexts(moduleId: string, question: QuizQuestion) {
  const curated = getCuratedDistractors(moduleId, question.id);
  if (curated?.length) return curated;
  return (question.options || [])
    .filter(option => !option.correct)
    .map(option => option.text.trim())
    .filter(Boolean);
}

function encodePracticeQuestion(moduleId: string, question: QuizQuestion) {
  const parts = [question.question, correctAnswerText(question), ...wrongAnswerTexts(moduleId, question)];
  return parts.join('|||');
}

function summarizeTopic(topic: LearningTopic) {
  const facts: string[] = [];

  topic.content.forEach(block => {
    if (block.type === 'definition' && block.term && block.definition) facts.push(`${block.term}: ${block.definition}`);
    if ((block.type === 'info' || block.type === 'warning') && block.text) facts.push(block.text);
    if (block.type === 'table' && block.rows?.length) {
      block.rows.slice(0, 5).forEach(row => facts.push(row.join(': ')));
    }
    if (block.type === 'list' && block.items?.length) facts.push(...block.items.slice(0, 6));
  });

  return facts.filter(Boolean).slice(0, 8);
}

function enrichTopic(topic: LearningTopic): LearningTopic {
  const summary = summarizeTopic(topic);
  if (!summary.length) return topic;

  const alreadyHasSummary = topic.content.some(block => block.type === 'info' && block.title === 'Kernwissen dieses Themas');
  if (alreadyHasSummary) return topic;

  const summaryBlocks: TopicContent[] = [
    { type: 'heading', title: 'Kernwissen dieses Themas' },
    { type: 'info', title: 'Das solltest du vor den Übungen wissen', text: 'Die folgenden Punkte fassen die wichtigsten Angaben dieses Themas zusammen. Nutze sie als Orientierung, bevor du die Aufgaben bearbeitest.' },
    { type: 'list', items: summary },
  ];

  return { ...topic, content: [...topic.content, ...summaryBlocks] };
}

function buildQuizCoverageTopic(module: LearningModule): LearningTopic | null {
  if (!module.questions.length) return null;

  const content: TopicContent[] = [
    { type: 'info', title: 'Wiederholung vor dem Abschlusstest', text: 'Hier stehen die prüfungsrelevanten Kernaussagen noch einmal vollständig. Jede Frage im Abschlusstest lässt sich mit den Lerninhalten und dieser Wiederholung beantworten.' },
  ];

  for (let start = 0; start < module.questions.length; start += 4) {
    const group = module.questions.slice(start, start + 4);
    const number = Math.floor(start / 4) + 1;

    content.push({ type: 'heading', title: `Prüfungswissen ${number}` });
    content.push({
      type: 'table',
      headers: ['Frage', 'Richtige Kernaussage', 'Begründung'],
      rows: group.map(question => [question.question, displayCorrectAnswer(question), question.explanation]),
    });
    content.push({ type: 'heading', title: 'Übungen' });
    content.push({
      type: 'list',
      items: group.map(question => encodePracticeQuestion(module.id, question)),
    });
  }

  return {
    id: `${module.id}-pruefungswissen`,
    title: 'Wiederholung und Prüfungssicherheit',
    content,
  };
}

export function ensureLearningCoverage(module: LearningModule): LearningModule {
  const topics = module.topics
    .filter(topic => topic.id !== `${module.id}-pruefungswissen`)
    .map(enrichTopic);

  const quizCoverage = buildQuizCoverageTopic(module);
  if (quizCoverage) topics.push(quizCoverage);

  return { ...module, topics };
}
