import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  ExternalLink,
  GraduationCap,
  Lightbulb,
  ListChecks,
  LockKeyhole,
  PenLine,
  PlayCircle,
  RotateCcw,
  SkipForward,
  Sparkles,
  Trophy,
  XCircle,
} from 'lucide-react';
import { MiniCrossword } from '@/components/MiniCrossword';
import { LearningRewardGame } from '@/components/LearningRewardGame';
import { buildFiveOptions } from '@/utils/questionOptions';
import type { LearningModule, LearningResult, LearningTopic, QuizOption, QuizQuestion, TopicContent } from '@/types';

interface ModuleDetailProps {
  module: LearningModule;
  onBack: () => void;
  onUpdateProgress: (moduleId: string, progress: number) => void;
  onUpdateResult: (moduleId: string, result: LearningResult) => void;
  currentProgress: number;
  allModules: LearningModule[];
  onOpenModule: (moduleId: string) => void;
}

type Tab = 'learn' | 'control';
type PracticeSource = { question: string; solutions: string[]; distractors?: string[] };
type QuickCheck = { question: string; options: QuizOption[]; explanation: string; multiple: boolean };
type GuidedStep = {
  key: string;
  topicIndex: number;
  stepIndex: number;
  title: string;
  blocks: TopicContent[];
  checks: QuickCheck[];
  challenge?: string;
};

type SavedGuidedState = {
  activeKey?: string;
  completed?: string[];
  skipped?: string[];
  selections?: Record<string, string | string[]>;
  checked?: string[];
};

function getGrade(percentage: number) {
  if (percentage >= 92) return { grade: 1, label: 'Sehr gut', className: 'bg-emerald-100 text-emerald-700' };
  if (percentage >= 81) return { grade: 2, label: 'Gut', className: 'bg-teal-100 text-teal-700' };
  if (percentage >= 67) return { grade: 3, label: 'Befriedigend', className: 'bg-sky-100 text-sky-700' };
  if (percentage >= 50) return { grade: 4, label: 'Ausreichend', className: 'bg-amber-100 text-amber-700' };
  return { grade: 5, label: 'Mangelhaft', className: 'bg-rose-100 text-rose-700' };
}

function clean(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function shortAnswer(value: string, max = 170) {
  const normalized = clean(value.replace(/\|\|\|/g, ' '));
  const firstSentence = normalized.split(/(?<=[.!?])\s+/)[0] || normalized;
  return firstSentence.length <= max ? firstSentence : `${firstSentence.slice(0, max - 1).trim()}…`;
}

function unique(values: string[]) {
  return Array.from(new Set(values.map(clean).filter(Boolean)));
}

function isPracticeHeading(block: TopicContent) {
  if (block.type !== 'heading' || !block.title) return false;
  const title = block.title.trim();
  return title.startsWith('✍️') || /^(übungen?|aufgaben?|mini[- ]?check|lerncheck|arbeitsauftrag|wiederholung)/i.test(title);
}

function learningPoints(blocks: TopicContent[]) {
  const facts: string[] = [];
  blocks.forEach(block => {
    if (block.type === 'text' && block.text) facts.push(...block.text.split(/(?<=[.!?])\s+/).map(clean).filter(Boolean).slice(0, 3));
    if ((block.type === 'info' || block.type === 'warning') && block.text) facts.push(clean(block.text));
    if (block.type === 'definition' && block.term && block.definition) facts.push(`${block.term}: ${clean(block.definition)}`);
    if (block.type === 'list' && block.items?.length) facts.push(...block.items.slice(0, 6).map(item => clean(item.split('|||')[0])));
    if (block.type === 'table' && block.rows?.length) block.rows.slice(0, 5).forEach(row => facts.push(clean(row.join(' – '))));
    if ((block.type === 'image' || block.type === 'video') && block.caption) facts.push(clean(block.caption));
  });
  return unique(facts).slice(0, 12);
}

function supportText(blocks: TopicContent[]) {
  return learningPoints(blocks)[0] || 'Die Kernaussage ergibt sich direkt aus dem Lernabschnitt.';
}

function parsePracticeItem(item: string, blocks: TopicContent[]): PracticeSource {
  const parts = item.split('|||').map(clean);
  if (parts.length >= 2) {
    const [question, correctPart, ...distractors] = parts;
    const solutions = correctPart.split('&&&').map(clean).filter(Boolean);
    return { question, solutions: solutions.length ? solutions : [supportText(blocks)], distractors: distractors.filter(Boolean) };
  }
  return { question: clean(item), solutions: [supportText(blocks)] };
}

function fallbackPractice(title: string, blocks: TopicContent[]): PracticeSource[] {
  const points = learningPoints(blocks);
  const definition = blocks.find(block => block.type === 'definition' && block.term && block.definition);
  if (definition?.term && definition.definition) {
    return [
      { question: `Welche Aussage passt zu „${title}“?`, solutions: [points[0] || supportText(blocks)] },
      { question: `Was beschreibt „${definition.term}“ richtig?`, solutions: [definition.definition] },
    ];
  }
  return [
    { question: `Welche Aussage passt am besten zu „${title}“?`, solutions: [points[0] || supportText(blocks)] },
    { question: 'Welche zweite Kernaussage solltest du dir merken?', solutions: [points[1] || points[0] || supportText(blocks)] },
  ];
}

function makeQuickCheckOptions(
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

function splitTopicIntoSteps(topic: LearningTopic, topicIndex: number, questionBank: QuizQuestion[]): GuidedStep[] {
  const rawSteps: { title: string; blocks: TopicContent[] }[] = [];
  let current: { title: string; blocks: TopicContent[] } | null = null;
  const intro: TopicContent[] = [];

  topic.content.forEach(block => {
    const startsNewPart = block.type === 'heading' && !isPracticeHeading(block);
    if (startsNewPart) {
      if (!current && intro.length) {
        rawSteps.push({ title: 'Überblick', blocks: [...intro] });
        intro.length = 0;
      }
      if (current) rawSteps.push(current);
      current = { title: block.title || 'Lernabschnitt', blocks: [block] };
      return;
    }
    if (current) current.blocks.push(block);
    else intro.push(block);
  });

  if (current) rawSteps.push(current);
  else if (intro.length) rawSteps.push({ title: topic.title, blocks: intro });

  return rawSteps.map((raw, stepIndex) => {
    const practiceHeadingIndex = raw.blocks.findIndex(isPracticeHeading);
    const practiceItems: string[] = [];
    const hidden = new Set<number>();
    if (practiceHeadingIndex >= 0) {
      hidden.add(practiceHeadingIndex);
      raw.blocks.forEach((block, index) => {
        if (index > practiceHeadingIndex && block.type === 'list' && block.items?.length) {
          practiceItems.push(...block.items);
          hidden.add(index);
        }
      });
    }
    let blocks = raw.blocks.filter((_, index) => !hidden.has(index));
    if (blocks[0]?.type === 'heading' && blocks[0].title === raw.title) blocks = blocks.slice(1);
    const parsed = practiceItems.map(item => parsePracticeItem(item, blocks));
    const sources = parsed.length ? parsed : fallbackPractice(raw.title, blocks);
    return {
      key: `${topic.id}::${stepIndex}`,
      topicIndex,
      stepIndex,
      title: raw.title,
      blocks,
      checks: buildChecks(sources, blocks, topicIndex * 37 + stepIndex * 13 + 5, questionBank),
      challenge: parsed[2]?.question || parsed.find(item => item.question.length > 120)?.question,
    };
  });
}

function answerText(question: QuizQuestion) {
  if ((question.type === 'single' || question.type === 'multiple') && question.options?.length) {
    const correct = question.options.filter(option => option.correct).map(option => option.text);
    if (correct.length) return correct.join(' · ');
  }
  if (Array.isArray(question.correctAnswer)) return question.correctAnswer.join(' · ');
  if (typeof question.correctAnswer === 'string' && question.correctAnswer.trim()) return question.correctAnswer;
  return question.explanation;
}

function normalizeFinalQuestions(module: LearningModule): QuizQuestion[] {
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
}

function textAnswerMatches(question: QuizQuestion, answer: string) {
  const source = Array.isArray(question.correctAnswer) ? question.correctAnswer.join(',') : question.correctAnswer || question.explanation;
  const keywords = source.toLowerCase().split(/[,;·]/).map(value => value.trim()).filter(value => value.length >= 3);
  if (!keywords.length) return answer.trim().length >= 18;
  const normalized = answer.toLowerCase();
  const hits = keywords.filter(keyword => normalized.includes(keyword)).length;
  return hits >= Math.max(1, Math.ceil(keywords.length * 0.5));
}

function isQuestionCorrect(question: QuizQuestion, answer: string | string[] | undefined) {
  if (answer === undefined) return false;
  if (question.type === 'single' && question.options) return question.options.find(option => option.id === answer)?.correct === true;
  if (question.type === 'multiple' && question.options) {
    const selected = new Set(Array.isArray(answer) ? answer : []);
    const correct = new Set(question.options.filter(option => option.correct).map(option => option.id));
    return selected.size === correct.size && [...selected].every(id => correct.has(id));
  }
  if (question.type === 'text' && typeof answer === 'string') return textAnswerMatches(question, answer);
  return false;
}

export function ModuleDetail({ module, onBack, onUpdateProgress, onUpdateResult, currentProgress, allModules, onOpenModule }: ModuleDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>('learn');
  const topicSteps = useMemo(() => module.topics.map((topic, index) => splitTopicIntoSteps(topic, index, module.questions)), [module.topics, module.questions]);
  const allSteps = useMemo(() => topicSteps.flat(), [topicSteps]);
  const controlQuestions = useMemo(() => normalizeFinalQuestions(module), [module]);

  const [activeStepKey, setActiveStepKey] = useState(allSteps[0]?.key || '');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [skippedSteps, setSkippedSteps] = useState<Set<string>>(new Set());
  const [selections, setSelections] = useState<Record<string, string | string[]>>({});
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const [controlIndex, setControlIndex] = useState(0);
  const [controlAnswers, setControlAnswers] = useState<Record<number, string | string[]>>({});
  const [controlChecked, setControlChecked] = useState<Set<number>>(new Set());
  const [controlResults, setControlResults] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const first = allSteps[0]?.key || '';
    try {
      const raw = localStorage.getItem(`medlearn-guided-v4-${module.id}`);
      if (!raw) {
        setActiveStepKey(first);
        setCompletedSteps(new Set());
        setSkippedSteps(new Set());
        setSelections({});
        setChecked(new Set());
        return;
      }
      const saved = JSON.parse(raw) as SavedGuidedState;
      const validCompleted = (saved.completed || []).filter(key => allSteps.some(step => step.key === key));
      const validSkipped = (saved.skipped || []).filter(key => allSteps.some(step => step.key === key));
      const resolved = new Set([...validCompleted, ...validSkipped]);
      const unlocked = Math.min(resolved.size, Math.max(allSteps.length - 1, 0));
      const requested = allSteps.findIndex(step => step.key === saved.activeKey);
      const safeIndex = requested >= 0 && requested <= unlocked ? requested : unlocked;
      setActiveStepKey(allSteps[safeIndex]?.key || first);
      setCompletedSteps(new Set(validCompleted));
      setSkippedSteps(new Set(validSkipped));
      setSelections(saved.selections || {});
      setChecked(new Set(saved.checked || []));
    } catch {
      setActiveStepKey(first);
      setCompletedSteps(new Set());
      setSkippedSteps(new Set());
      setSelections({});
      setChecked(new Set());
    }
  }, [module.id, allSteps]);

  useEffect(() => {
    const state: SavedGuidedState = {
      activeKey: activeStepKey,
      completed: Array.from(completedSteps),
      skipped: Array.from(skippedSteps),
      selections,
      checked: Array.from(checked),
    };
    localStorage.setItem(`medlearn-guided-v4-${module.id}`, JSON.stringify(state));
  }, [module.id, activeStepKey, completedSteps, skippedSteps, selections, checked]);

  const resolvedKeys = useMemo(() => new Set([...completedSteps, ...skippedSteps]), [completedSteps, skippedSteps]);
  const activeIndex = Math.max(0, allSteps.findIndex(step => step.key === activeStepKey));
  const activeStep = allSteps[activeIndex] || allSteps[0];
  const activeTopic = activeStep ? module.topics[activeStep.topicIndex] : module.topics[0];
  const learningPercentage = allSteps.length ? Math.round((resolvedKeys.size / allSteps.length) * 100) : 0;
  const unlockedThrough = Math.min(resolvedKeys.size, Math.max(allSteps.length - 1, 0));
  const controlUnlocked = learningPercentage >= 100 || currentProgress >= 90;

  const checkKey = (step: GuidedStep, index: number) => `${step.key}::${index}`;
  const checkCorrect = (step: GuidedStep, index: number) => {
    const check = step.checks[index];
    if (!check) return false;
    const selected = selections[checkKey(step, index)];
    if (!check.multiple) return typeof selected === 'string' && check.options.find(option => option.id === selected)?.correct === true;
    const selectedSet = new Set(Array.isArray(selected) ? selected : []);
    const correctSet = new Set(check.options.filter(option => option.correct).map(option => option.id));
    return selectedSet.size === correctSet.size && [...selectedSet].every(id => correctSet.has(id));
  };
  const stepComplete = activeStep?.checks.every((_, index) => checked.has(checkKey(activeStep, index)) && checkCorrect(activeStep, index)) ?? false;

  const goToStep = useCallback((index: number) => {
    if (index < 0 || index >= allSteps.length || index > unlockedThrough) return;
    setActiveStepKey(allSteps[index].key);
    setActiveTab('learn');
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }, [allSteps, unlockedThrough]);

  const jumpToTopic = useCallback((topicIndex: number) => {
    const startIndex = topicSteps.slice(0, topicIndex).reduce((sum, steps) => sum + steps.length, 0);
    if (startIndex < 0 || startIndex >= allSteps.length) return;

    const nextSkipped = new Set(skippedSteps);
    allSteps.slice(0, startIndex).forEach(step => {
      if (!completedSteps.has(step.key)) nextSkipped.add(step.key);
    });

    setSkippedSteps(nextSkipped);
    const resolved = new Set([...completedSteps, ...nextSkipped]);
    const progress = allSteps.length ? Math.round((resolved.size / allSteps.length) * 90) : 0;
    onUpdateProgress(module.id, progress);
    setActiveStepKey(allSteps[startIndex].key);
    setActiveTab('learn');
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }, [topicSteps, allSteps, skippedSteps, completedSteps, module.id, onUpdateProgress]);

  const choosePractice = (step: GuidedStep, index: number, optionId: string) => {
    const key = checkKey(step, index);
    const check = step.checks[index];
    setSelections(previous => {
      if (!check?.multiple) return { ...previous, [key]: optionId };
      const current = Array.isArray(previous[key]) ? previous[key] as string[] : [];
      const next = current.includes(optionId) ? current.filter(item => item !== optionId) : [...current, optionId];
      return { ...previous, [key]: next };
    });
    setChecked(previous => {
      const next = new Set(previous);
      next.delete(key);
      return next;
    });
  };

  const reviewPractice = (step: GuidedStep, index: number) => {
    const key = checkKey(step, index);
    const selected = selections[key];
    const hasSelection = Array.isArray(selected) ? selected.length > 0 : Boolean(selected);
    if (!hasSelection) return;
    setChecked(previous => new Set(previous).add(key));
  };

  const advanceAfterResolve = (resolved: Set<string>) => {
    const progress = allSteps.length ? Math.round((resolved.size / allSteps.length) * 90) : 0;
    onUpdateProgress(module.id, progress);
    if (activeIndex < allSteps.length - 1) {
      setActiveStepKey(allSteps[activeIndex + 1].key);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    } else {
      setActiveTab('control');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const completeStep = () => {
    if (!activeStep || !stepComplete) return;
    const nextCompleted = new Set(completedSteps).add(activeStep.key);
    const nextSkipped = new Set(skippedSteps);
    nextSkipped.delete(activeStep.key);
    setCompletedSteps(nextCompleted);
    setSkippedSteps(nextSkipped);
    advanceAfterResolve(new Set([...nextCompleted, ...nextSkipped]));
  };

  const skipStep = () => {
    if (!activeStep) return;
    const nextSkipped = new Set(skippedSteps).add(activeStep.key);
    const nextCompleted = new Set(completedSteps);
    nextCompleted.delete(activeStep.key);
    setSkippedSteps(nextSkipped);
    setCompletedSteps(nextCompleted);
    advanceAfterResolve(new Set([...nextCompleted, ...nextSkipped]));
  };

  const currentQuestion = controlQuestions[controlIndex];
  const controlAnswer = currentQuestion ? controlAnswers[currentQuestion.id] : undefined;
  const controlRevealed = currentQuestion ? controlChecked.has(currentQuestion.id) : false;

  const selectControlAnswer = (question: QuizQuestion, optionId: string) => {
    if (controlChecked.has(question.id)) return;
    if (question.type === 'multiple') {
      const current = (controlAnswers[question.id] as string[]) || [];
      const next = current.includes(optionId) ? current.filter(item => item !== optionId) : [...current, optionId];
      setControlAnswers(previous => ({ ...previous, [question.id]: next }));
    } else {
      setControlAnswers(previous => ({ ...previous, [question.id]: optionId }));
    }
  };

  const checkControlAnswer = () => {
    if (!currentQuestion) return;
    const answer = controlAnswers[currentQuestion.id];
    const hasAnswer = Array.isArray(answer) ? answer.length > 0 : typeof answer === 'string' && answer.trim().length > 0;
    if (!hasAnswer) return;
    const correct = isQuestionCorrect(currentQuestion, answer);
    setControlChecked(previous => new Set(previous).add(currentQuestion.id));
    setControlResults(previous => ({ ...previous, [currentQuestion.id]: correct }));
  };

  const totalPoints = controlQuestions.reduce((sum, question) => sum + question.points, 0);
  const score = controlQuestions.reduce((sum, question) => sum + (controlResults[question.id] ? question.points : 0), 0);
  const percentage = totalPoints ? Math.round((score / totalPoints) * 100) : 0;
  const grade = getGrade(percentage);

  const finishControl = () => {
    const result: LearningResult = {
      score,
      total: totalPoints,
      percentage,
      grade: grade.grade,
      completedAt: new Date().toISOString(),
    };
    onUpdateProgress(module.id, 100);
    onUpdateResult(module.id, result);
    setShowResult(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextModule = allModules.find(candidate => candidate.number === module.number + 1);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#ecfeff_0,_#f4f7f9_38%,_#f8fafc_100%)]">
      <header className="sticky top-0 z-50 bg-white/88 backdrop-blur-xl border-b border-white shadow-sm">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <button onClick={onBack} className="p-2.5 rounded-xl hover:bg-teal-50" aria-label="Zur Übersicht"><ArrowLeft className="w-5 h-5 text-teal-600" /></button>
          <span className="hidden sm:inline text-sm text-slate-500">MFA Lerncampus</span><ChevronRight className="hidden sm:block w-4 h-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-800">Lernfeld {module.number}</span>
          <div className="ml-auto flex items-center gap-2 text-xs font-semibold text-teal-700 bg-teal-100 px-3 py-1.5 rounded-full"><CircleCheckBig className="w-4 h-4" /> {learningPercentage}%</div>
        </div>
      </header>

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <motion.section className="overflow-hidden rounded-[28px] bg-gradient-to-br from-teal-700 via-teal-600 to-sky-700 text-white shadow-[0_24px_60px_rgba(15,118,110,0.18)] mb-7" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid lg:grid-cols-[1.18fr_.82fr] gap-6 p-6 sm:p-9 items-center">
            <div><div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-semibold mb-4"><GraduationCap className="w-4 h-4" /> Lernfeld {module.number}</div><h1 className="text-2xl sm:text-4xl font-bold leading-tight mb-3">{module.title}</h1><p className="text-white/80 text-sm sm:text-base leading-7 max-w-2xl">{module.subtitle}</p><div className="mt-6 max-w-xl"><div className="flex justify-between text-xs text-white/75 mb-2"><span>Lernweg</span><span>{resolvedKeys.size} / {allSteps.length} Teile · {skippedSteps.size} übersprungen</span></div><div className="h-3 rounded-full bg-white/15 overflow-hidden p-[2px]"><motion.div className="h-full rounded-full bg-gradient-to-r from-amber-200 to-white" animate={{ width: `${learningPercentage}%` }} /></div></div></div>
            <img src={module.heroImage} alt="" className="w-full h-52 sm:h-64 object-cover rounded-3xl border border-white/20 shadow-2xl" />
          </div>
        </motion.section>

        <div className="flex gap-2 mb-6 p-1.5 bg-white/90 rounded-2xl w-fit shadow-sm border border-white">
          <button onClick={() => setActiveTab('learn')} className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold ${activeTab === 'learn' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-500 hover:bg-teal-50'}`}><BookOpen className="w-4 h-4" /> Lernen</button>
          <button onClick={() => controlUnlocked && setActiveTab('control')} disabled={!controlUnlocked} className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold ${activeTab === 'control' ? 'bg-violet-600 text-white shadow-md' : controlUnlocked ? 'text-violet-700 hover:bg-violet-50' : 'text-slate-400 bg-slate-50 cursor-not-allowed'}`}>{controlUnlocked ? <Award className="w-4 h-4" /> : <LockKeyhole className="w-4 h-4" />} Lernkontrolle ({controlQuestions.length})</button>
        </div>

        {activeTab === 'learn' && activeStep && (
          <div className="grid lg:grid-cols-[280px_1fr] gap-6 items-start">
            <aside className="lg:sticky lg:top-24 bg-white/90 rounded-2xl p-4 shadow-sm border border-white">
              <div className="text-xs uppercase tracking-[.16em] font-bold text-teal-600 mb-2">Inhalte</div>
              <p className="text-[11px] leading-4 text-slate-400 mb-3">Schon weiter? Klicke direkt auf das Thema, bei dem du einsteigen möchtest. Alles davor wird automatisch übersprungen.</p>
              <div className="space-y-1.5 max-h-[68vh] overflow-y-auto pr-1">
                {module.topics.map((topic, topicIndex) => {
                  const steps = topicSteps[topicIndex] || [];
                  const start = topicSteps.slice(0, topicIndex).reduce((sum, entry) => sum + entry.length, 0);
                  const unlocked = start <= unlockedThrough;
                  const done = steps.length > 0 && steps.every(step => completedSteps.has(step.key));
                  const skipped = steps.length > 0 && steps.every(step => skippedSteps.has(step.key));
                  const current = topicIndex === activeStep.topicIndex;
                  const handleTopicClick = () => unlocked ? goToStep(start) : jumpToTopic(topicIndex);
                  return <button key={topic.id} onClick={handleTopicClick} className={`w-full rounded-xl px-3 py-3 text-left border transition-all ${current ? 'bg-emerald-50 border-teal-300' : skipped ? 'bg-amber-50 border-amber-200' : done ? 'bg-slate-50 border-slate-200' : unlocked ? 'bg-white border-transparent hover:bg-slate-50' : 'bg-white border-slate-100 hover:border-teal-300 hover:bg-teal-50'}`}><div className="flex items-start gap-2.5"><div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${skipped ? 'bg-amber-100 text-amber-700' : done ? 'bg-emerald-100 text-emerald-600' : current ? 'bg-teal-600 text-white' : unlocked ? 'bg-slate-100 text-slate-500' : 'bg-teal-50 text-teal-600'}`}>{skipped ? <SkipForward className="w-3.5 h-3.5" /> : done ? <Check className="w-4 h-4" /> : unlocked ? topicIndex + 1 : <SkipForward className="w-3.5 h-3.5" />}</div><div className="min-w-0"><div className={`text-xs font-semibold leading-5 line-clamp-2 ${unlocked || current ? 'text-slate-800' : 'text-slate-600'}`}>{topic.title}</div><div className={`text-[11px] mt-1 ${!unlocked ? 'text-teal-600 font-semibold' : 'text-slate-400'}`}>{skipped ? 'übersprungen' : !unlocked ? `Hier einsteigen · ${steps.length} Teile` : `${steps.length} Teile`}</div></div></div></button>;
                })}
              </div>
            </aside>

            <main className="min-w-0">
              <div className="bg-white/85 rounded-2xl p-4 sm:p-5 shadow-sm border border-white mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div><div className="text-xs font-bold uppercase tracking-[.14em] text-teal-600">{activeTopic.title}</div><div className="text-sm text-slate-500 mt-1">Lernteil {activeIndex + 1} von {allSteps.length}</div></div><div className="text-xs font-semibold text-slate-500 bg-slate-100 rounded-full px-3 py-1.5">2 Klickfragen · Überspringen möglich</div></div>
              <motion.article key={activeStep.key} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[28px] shadow-[0_18px_45px_rgba(15,23,42,0.07)] border border-white overflow-hidden">
                <div className="p-5 sm:p-8 border-b border-slate-200 bg-gradient-to-br from-white to-teal-50"><h2 className="text-xl sm:text-2xl font-bold text-slate-900">{activeStep.title}</h2></div>
                <div className="p-5 sm:p-8">
                  <TopicRenderer content={activeStep.blocks} />
                  <section className="mt-8 rounded-3xl overflow-hidden border border-teal-200 bg-gradient-to-br from-teal-50 to-sky-50">
                    <div className="p-5 sm:p-6 border-b border-teal-200 flex justify-between gap-3"><div><div className="flex items-center gap-2 text-teal-700 font-bold"><ListChecks className="w-5 h-5" /> Kurz-Check</div><p className="text-sm text-slate-500 mt-1">Anklicken, prüfen und direkt sehen, warum es richtig oder falsch ist.</p></div><div className="px-3 py-1.5 rounded-full bg-white text-xs font-bold text-teal-700 shadow-sm h-fit">2 Fragen</div></div>
                    <div className="p-5 sm:p-6 space-y-5">
                      {activeStep.checks.map((check, index) => {
                        const key = checkKey(activeStep, index);
                        const selected = selections[key];
                        const wasChecked = checked.has(key);
                        const isCorrect = checkCorrect(activeStep, index);
                        const correctOptions = check.options.filter(option => option.correct);
                        const selectedIds = new Set(Array.isArray(selected) ? selected : selected ? [selected] : []);
                        return <div key={key} className="rounded-2xl bg-white border border-teal-100 p-4 sm:p-5 shadow-sm"><div className="flex items-start gap-3 mb-4"><div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold ${wasChecked && isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-teal-100 text-teal-700'}`}>{wasChecked && isCorrect ? <Check className="w-4 h-4" /> : index + 1}</div><div><p className="text-sm sm:text-base font-semibold text-slate-800 leading-6">{check.question}</p>{check.multiple && <p className="text-xs font-semibold text-violet-600 mt-1">Mehrfachauswahl · je nach Frage können 2–5 Antworten richtig sein · alle richtigen auswählen</p>}</div></div><div className="space-y-2.5">{check.options.map(option => { const chosen = selectedIds.has(option.id); const showCorrect = wasChecked && option.correct; const showWrong = wasChecked && chosen && !option.correct; return <button key={option.id} onClick={() => choosePractice(activeStep, index, option.id)} className={`w-full flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border-2 text-left ${showCorrect ? 'border-emerald-400 bg-emerald-50' : showWrong ? 'border-rose-400 bg-rose-50' : chosen ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-teal-300'}`}><span className={`mt-0.5 w-5 h-5 rounded-md border-2 shrink-0 ${chosen ? 'border-teal-600 bg-teal-600' : 'border-slate-300'}`} /><span className="text-sm text-slate-700 leading-5">{option.text}</span>{showCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />}{showWrong && <XCircle className="w-5 h-5 text-rose-500 ml-auto shrink-0" />}</button>; })}</div>{!wasChecked && <div className="mt-4 flex justify-end"><button onClick={() => reviewPractice(activeStep, index)} disabled={Array.isArray(selected) ? selected.length === 0 : !selected} className="px-4 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-semibold disabled:opacity-35">Prüfen</button></div>}{wasChecked && <div className={`mt-4 rounded-xl border p-4 ${isCorrect ? 'border-emerald-300 bg-emerald-50' : 'border-rose-300 bg-rose-50'}`}><div className={`flex items-center gap-2 font-bold text-sm mb-1.5 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>{isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}{isCorrect ? 'Richtig' : 'Nicht richtig'}</div>{!isCorrect && correctOptions.length > 0 && <p className="text-sm text-slate-600 mb-2"><strong>{check.multiple ? 'Richtige Antworten:' : 'Richtige Antwort:'}</strong> {correctOptions.map(option => option.text).join(' · ')}</p>}<p className="text-sm text-slate-600 leading-6">{check.explanation}</p></div>}</div>;
                      })}
                    </div>
                  </section>

                  {activeStep.challenge && <details className="mt-5 rounded-2xl border border-violet-200 bg-violet-50 p-4 sm:p-5"><summary className="cursor-pointer font-bold text-violet-700 flex items-center gap-2"><Sparkles className="w-4 h-4" /> Optionale Praxis-Challenge</summary><p className="text-sm text-slate-600 leading-6 mt-3">{activeStep.challenge}</p><p className="text-xs text-violet-600 mt-2">Mündlich oder auf Papier reicht. Die Challenge ist freiwillig.</p></details>}
                  {stepComplete && activeStep.stepIndex === (topicSteps[activeStep.topicIndex]?.length || 0) - 1 && <LearningRewardGame moduleId={module.id} topicId={activeTopic.id} />}
                  {activeIndex === allSteps.length - 1 && <MiniCrossword module={module} />}

                  <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-200 pt-6">
                    <button onClick={() => goToStep(activeIndex - 1)} disabled={activeIndex === 0} className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-500 disabled:opacity-35"><ChevronLeft className="w-4 h-4" /> Zurück</button>
                    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                      <button onClick={skipStep} className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-amber-300 bg-amber-50 text-amber-700 text-sm font-bold"><SkipForward className="w-4 h-4" /> Inhalt überspringen</button>
                      <button onClick={completeStep} disabled={!stepComplete} className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 text-white text-sm font-bold shadow-lg disabled:opacity-40 disabled:shadow-none">{activeIndex === allSteps.length - 1 ? 'Zur Lernkontrolle' : 'Weiter'} <ArrowRight className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </motion.article>
            </main>
          </div>
        )}

        {activeTab === 'control' && (
          <FinalControl
            module={module}
            questions={controlQuestions}
            index={controlIndex}
            answers={controlAnswers}
            checked={controlChecked}
            results={controlResults}
            showResult={showResult}
            score={score}
            total={totalPoints}
            percentage={percentage}
            grade={grade}
            skippedCount={skippedSteps.size}
            onSelect={selectControlAnswer}
            onText={(question, value) => setControlAnswers(previous => ({ ...previous, [question.id]: value }))}
            onCheck={checkControlAnswer}
            onPrev={() => setControlIndex(value => Math.max(0, value - 1))}
            onNext={() => setControlIndex(value => Math.min(controlQuestions.length - 1, value + 1))}
            onFinish={finishControl}
            onRestart={() => { setControlIndex(0); setControlAnswers({}); setControlChecked(new Set()); setControlResults({}); setShowResult(false); }}
            nextModule={nextModule}
            onOpenModule={onOpenModule}
          />
        )}
      </div>
    </div>
  );
}

function TopicRenderer({ content }: { content: LearningTopic['content'] }) {
  return <div className="space-y-5">{content.map((block, index) => {
    switch (block.type) {
      case 'heading': return <h4 key={index} className="font-bold text-slate-900 text-lg sm:text-xl mt-7 first:mt-0">{block.title}</h4>;
      case 'text': return <p key={index} className="text-[15px] sm:text-base text-slate-600 leading-7 sm:leading-8">{block.text}</p>;
      case 'info': return <div key={index} className="bg-gradient-to-br from-sky-50 to-teal-50 border border-sky-200 rounded-2xl p-4 sm:p-5"><div className="font-bold text-sky-700 text-sm mb-1.5">{block.title}</div><div className="text-sm text-slate-600 leading-6">{block.text}</div></div>;
      case 'warning': return <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 sm:p-5"><div className="font-bold text-amber-700 text-sm mb-1.5">{block.title}</div><div className="text-sm text-slate-600 leading-6">{block.text}</div></div>;
      case 'table': return <div key={index} className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm"><table className="w-full text-sm"><thead><tr className="bg-gradient-to-r from-teal-100 to-sky-100">{block.headers?.map((header, i) => <th key={i} className="text-left px-4 py-3.5 font-bold text-teal-700 text-xs sm:text-sm">{header}</th>)}</tr></thead><tbody>{block.rows?.map((row, rowIndex) => <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3.5 text-slate-600 text-xs sm:text-sm align-top leading-5 sm:leading-6">{cell}</td>)}</tr>)}</tbody></table></div>;
      case 'list': return <ul key={index} className="grid gap-2.5">{block.items?.map((item, i) => <li key={i} className="flex items-start gap-3 text-sm sm:text-[15px] text-slate-600 leading-6 bg-slate-50 rounded-xl px-3.5 py-3"><span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span><span>{item.includes('|||') ? item.split('|||')[0] : item}</span></li>)}</ul>;
      case 'definition': return <div key={index} className="bg-teal-50 border border-teal-200 rounded-2xl p-4 sm:p-5"><span className="font-bold text-teal-700 text-sm">{block.term}: </span><span className="text-sm text-slate-600 leading-6">{block.definition}</span></div>;
      case 'image': return <figure key={index} className="bg-slate-50 rounded-3xl border border-slate-200 p-3 sm:p-4 shadow-sm overflow-hidden"><img src={block.src} alt={block.alt || ''} className="w-full max-h-[560px] object-contain rounded-2xl" loading="lazy" />{block.caption && <figcaption className="text-xs sm:text-sm text-slate-500 mt-3 text-center leading-5 px-2">{block.caption}</figcaption>}</figure>;
      case 'video': return <div key={index} className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white overflow-hidden shadow-sm"><div className="p-4 sm:p-5 flex gap-3 items-start"><div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-600 to-sky-600 text-white flex items-center justify-center shrink-0"><PlayCircle className="w-5 h-5" /></div><div><div className="font-bold text-slate-900">{block.title || 'Lernvideo'}</div><div className="text-xs text-slate-500 mt-1">{[block.source, block.duration].filter(Boolean).join(' • ')}</div>{block.caption && <p className="text-sm text-slate-600 mt-2 leading-6">{block.caption}</p>}</div></div>{block.embedUrl && <div className="aspect-video bg-black"><iframe src={block.embedUrl} title={block.title || 'Lernvideo'} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" /></div>}{block.url && <a href={block.url} target="_blank" rel="noreferrer" className="m-4 sm:m-5 mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-sky-300 text-sky-700 text-sm font-medium">Video öffnen <ExternalLink className="w-4 h-4" /></a>}</div>;
      default: return null;
    }
  })}</div>;
}

interface FinalControlProps {
  module: LearningModule;
  questions: QuizQuestion[];
  index: number;
  answers: Record<number, string | string[]>;
  checked: Set<number>;
  results: Record<number, boolean>;
  showResult: boolean;
  score: number;
  total: number;
  percentage: number;
  grade: ReturnType<typeof getGrade>;
  skippedCount: number;
  onSelect: (question: QuizQuestion, value: string) => void;
  onText: (question: QuizQuestion, value: string) => void;
  onCheck: () => void;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
  onRestart: () => void;
  nextModule?: LearningModule;
  onOpenModule: (id: string) => void;
}

function FinalControl({ module, questions, index, answers, checked, results, showResult, score, total, percentage, grade, skippedCount, onSelect, onText, onCheck, onPrev, onNext, onFinish, onRestart, nextModule, onOpenModule }: FinalControlProps) {
  if (showResult) {
    return <motion.div className="max-w-[720px] mx-auto" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }}><div className="bg-white rounded-[32px] p-7 sm:p-10 shadow-[0_24px_60px_rgba(15,23,42,.1)] text-center"><div className="w-24 h-24 rounded-[28px] mx-auto mb-5 flex items-center justify-center text-white bg-gradient-to-br from-violet-600 to-teal-500 shadow-xl"><Trophy className="w-11 h-11" /></div><div className="text-xs uppercase tracking-[.18em] font-black text-violet-600">Lernfeld {module.number} abgeschlossen</div><h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">Dein Ergebnis</h2><div className="grid grid-cols-3 gap-3 mt-7"><div className="rounded-2xl bg-slate-50 p-4"><div className="text-2xl font-black text-slate-900">{score}/{total}</div><div className="text-xs text-slate-500 mt-1">Punkte</div></div><div className="rounded-2xl bg-slate-50 p-4"><div className="text-2xl font-black text-slate-900">{percentage}%</div><div className="text-xs text-slate-500 mt-1">Ergebnis</div></div><div className="rounded-2xl bg-slate-50 p-4"><div className="text-2xl font-black text-slate-900">{grade.grade}</div><div className="text-xs text-slate-500 mt-1">Note</div></div></div><div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black mt-5 ${grade.className}`}><Award className="w-4 h-4" /> Note {grade.grade} · {grade.label}</div><p className="text-sm text-slate-500 leading-6 mt-5">Die Lernkontrolle umfasst das gesamte Lernfeld. {skippedCount > 0 ? `Du hattest ${skippedCount} Lernteil${skippedCount === 1 ? '' : 'e'} übersprungen. Die Lernkontrolle zeigt dir trotzdem, wie sicher das Gesamtwissen sitzt.` : 'Du hast alle Lernteile bearbeitet.'}</p><div className="flex flex-col sm:flex-row gap-3 justify-center mt-7"><button onClick={onRestart} className="inline-flex items-center justify-center gap-2 px-5 py-3 border-2 border-violet-500 text-violet-700 rounded-xl font-bold"><RotateCcw className="w-4 h-4" /> Lernkontrolle wiederholen</button>{nextModule && <button onClick={() => onOpenModule(nextModule.id)} className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-600 to-sky-600 text-white rounded-xl font-bold">Nächstes Lernfeld <ArrowRight className="w-4 h-4" /></button>}</div></div></motion.div>;
  }

  const question = questions[index];
  if (!question) return <div className="bg-white rounded-2xl p-6">Für dieses Lernfeld sind noch keine Fragen hinterlegt.</div>;
  const answer = answers[question.id];
  const revealed = checked.has(question.id);
  const correct = results[question.id] === true;
  const hasAnswer = Array.isArray(answer) ? answer.length > 0 : typeof answer === 'string' && answer.trim().length > 0;

  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[850px] mx-auto"><div className="rounded-3xl bg-gradient-to-r from-violet-600 to-teal-600 text-white p-5 sm:p-6 mb-5 shadow-lg"><div className="flex items-center gap-2 text-xs uppercase tracking-[.16em] font-bold text-white/75"><Award className="w-4 h-4" /> Komplette Lernkontrolle</div><h2 className="text-xl sm:text-2xl font-black mt-2">Lernfeld {module.number}: Wissen aus dem gesamten Lernfeld</h2><p className="text-sm text-white/80 mt-2">{questions.length} Aufgaben · jeweils 5 Antwortmöglichkeiten · Punkte und Schulnote am Ende</p></div><div className="bg-white rounded-2xl p-4 shadow-sm mb-4 flex items-center gap-2 flex-wrap">{questions.map((item, questionIndex) => <span key={item.id} className={`w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center ${questionIndex === index ? 'ring-2 ring-violet-600 ring-offset-1' : ''} ${results[item.id] === true ? 'bg-emerald-100 text-emerald-600' : checked.has(item.id) ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>{questionIndex + 1}</span>)}<span className="ml-auto text-xs font-bold text-slate-500">{score} / {total} Pkt.</span></div><div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm"><div className="text-xs font-medium text-violet-600 uppercase tracking-wider mb-2">Aufgabe {index + 1} von {questions.length} · {question.points} Punkte</div><h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3">{question.question}</h3>{question.type === 'multiple' && <div className="mb-5 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-xs font-bold text-violet-700">Mehrfachauswahl: Je nach Frage können 2–5 Antworten richtig sein. Wähle alle richtigen Antworten aus.</div>}{(question.type === 'single' || question.type === 'multiple') && question.options && <div className="space-y-2.5 mb-6">{question.options.map(option => { const selected = question.type === 'multiple' ? ((answer as string[]) || []).includes(option.id) : answer === option.id; const showCorrect = revealed && option.correct; const showWrong = revealed && selected && !option.correct; return <button key={option.id} disabled={revealed} onClick={() => onSelect(question, option.id)} className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left ${showCorrect ? 'border-emerald-400 bg-emerald-50' : showWrong ? 'border-rose-400 bg-rose-50' : selected ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-violet-300'}`}><span className={`mt-0.5 w-5 h-5 shrink-0 ${question.type === 'multiple' ? 'rounded' : 'rounded-full'} border-2 ${selected ? 'border-violet-600 bg-violet-600' : 'border-slate-300'}`}>{question.type === 'multiple' && selected && <Check className="w-3 h-3 text-white m-0.5" />}</span><span className="text-sm text-slate-700 leading-5">{option.text}</span>{showCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto" />}{showWrong && <XCircle className="w-5 h-5 text-rose-500 ml-auto" />}</button>; })}</div>}{question.type === 'text' && <div className="mb-6"><div className="flex items-center gap-2 text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-200 rounded-xl px-3 py-2 mb-3"><Lightbulb className="w-4 h-4" /> Die einzige offene Formulierungsaufgabe dieser Lernkontrolle.</div><textarea value={(answer as string) || ''} disabled={revealed} onChange={event => onText(question, event.target.value)} rows={5} className="w-full rounded-xl border-2 border-slate-200 p-4 text-sm focus:outline-none focus:border-violet-500" placeholder="Kurze Antwort in eigenen Worten …" /></div>}{revealed && <div className={`rounded-2xl p-5 mb-5 border ${correct ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'}`}><div className={`font-bold text-sm flex items-center gap-2 mb-2 ${correct ? 'text-emerald-700' : 'text-amber-700'}`}>{correct ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}{correct ? 'Richtig' : 'Nicht richtig'}</div><p className="text-sm text-slate-600 leading-6">{question.explanation}</p></div>}<div className="flex flex-col sm:flex-row gap-3 justify-between pt-2"><button onClick={onPrev} disabled={index === 0} className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 rounded-xl text-sm font-semibold text-slate-500 disabled:opacity-35"><ChevronLeft className="w-4 h-4" /> Zurück</button><div className="flex gap-2">{!revealed && <button onClick={onCheck} disabled={!hasAnswer} className="px-5 py-3 rounded-xl bg-violet-600 text-white text-sm font-bold disabled:opacity-35">Antwort prüfen</button>}{revealed && index < questions.length - 1 && <button onClick={onNext} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white text-sm font-bold">Nächste Aufgabe <ArrowRight className="w-4 h-4" /></button>}{revealed && index === questions.length - 1 && <button onClick={onFinish} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-teal-600 text-white text-sm font-bold">Punktzahl & Note <Trophy className="w-4 h-4" /></button>}</div></div></div></motion.div>;
}
