import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
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
  Sparkles,
  Trophy,
  XCircle,
} from 'lucide-react';
import { MiniCrossword } from '@/components/MiniCrossword';
import type { LearningModule, LearningTopic, QuizOption, QuizQuestion, TopicContent } from '@/types';

interface ModuleDetailProps {
  module: LearningModule;
  onBack: () => void;
  onUpdateProgress: (moduleId: string, progress: number) => void;
  currentProgress: number;
  allModules: LearningModule[];
  onOpenModule: (moduleId: string) => void;
}

type Tab = 'learn' | 'quiz';
type PracticeSource = { question: string; solution: string };
type QuickCheck = { question: string; options: QuizOption[]; explanation: string };
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
  selections?: Record<string, string>;
  checked?: string[];
};

function getGrade(percentage: number) {
  if (percentage >= 91) return { grade: 1, label: 'Sehr gut', color: 'bg-emerald-100 text-emerald-700' };
  if (percentage >= 81) return { grade: 2, label: 'Gut', color: 'bg-teal-100 text-teal-700' };
  if (percentage >= 67) return { grade: 3, label: 'Befriedigend', color: 'bg-sky-100 text-sky-700' };
  if (percentage >= 50) return { grade: 4, label: 'Ausreichend', color: 'bg-amber-100 text-amber-700' };
  return { grade: 5, label: 'Mangelhaft', color: 'bg-rose-100 text-rose-700' };
}

function clean(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function shortAnswer(value: string, max = 170) {
  const normalized = clean(value.replace(/\|\|\|/g, ' '));
  const firstSentence = normalized.split(/(?<=[.!?])\s+/)[0] || normalized;
  if (firstSentence.length <= max) return firstSentence;
  return `${firstSentence.slice(0, max - 1).trim()}…`;
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
    if (block.type === 'text' && block.text) {
      facts.push(...block.text.split(/(?<=[.!?])\s+/).map(clean).filter(Boolean).slice(0, 3));
    }
    if ((block.type === 'info' || block.type === 'warning') && block.text) facts.push(clean(block.text));
    if (block.type === 'definition' && block.term && block.definition) facts.push(`${block.term}: ${clean(block.definition)}`);
    if (block.type === 'list' && block.items?.length) facts.push(...block.items.slice(0, 6).map(item => clean(item.split('|||')[0])));
    if (block.type === 'table' && block.rows?.length) {
      block.rows.slice(0, 5).forEach(row => facts.push(clean(row.join(' – '))));
    }
    if ((block.type === 'image' || block.type === 'video') && block.caption) facts.push(clean(block.caption));
  });
  return unique(facts).slice(0, 10);
}

function supportText(blocks: TopicContent[]) {
  const points = learningPoints(blocks);
  return points[0] || 'Die Kernaussage ergibt sich direkt aus dem gerade gelesenen Lernabschnitt.';
}

function parsePracticeItem(item: string, blocks: TopicContent[]): PracticeSource {
  const separator = item.indexOf('|||');
  if (separator >= 0) {
    const question = clean(item.slice(0, separator));
    const solution = clean(item.slice(separator + 3));
    return { question, solution: solution || supportText(blocks) };
  }
  return { question: clean(item), solution: supportText(blocks) };
}

function fallbackPractice(title: string, blocks: TopicContent[]): PracticeSource[] {
  const points = learningPoints(blocks);
  const definition = blocks.find(block => block.type === 'definition' && block.term && block.definition);
  const first = points[0] || supportText(blocks);
  const second = points[1] || points[0] || supportText(blocks);

  if (definition?.term && definition.definition) {
    return [
      { question: `Welche Aussage passt zu „${title}“?`, solution: first },
      { question: `Was beschreibt „${definition.term}“ richtig?`, solution: definition.definition },
    ];
  }

  return [
    { question: `Welche Aussage passt am besten zu „${title}“?`, solution: first },
    { question: 'Welche zweite Kernaussage solltest du dir merken?', solution: second },
  ];
}

function makeOptions(correctValue: string, pool: string[], seed: number): QuizOption[] {
  const correct = shortAnswer(correctValue);
  const candidates = unique(pool.map(value => shortAnswer(value)))
    .filter(value => value !== correct && value.length >= 8)
    .slice(0, 20);

  const distractors: string[] = [];
  for (let offset = 0; offset < candidates.length && distractors.length < 3; offset += 1) {
    const candidate = candidates[(seed + offset * 3) % candidates.length];
    if (candidate && !distractors.includes(candidate)) distractors.push(candidate);
  }

  const fallbacks = [
    'Diese Aussage gehört nicht zu diesem Lernabschnitt.',
    'Das Gegenteil davon ist in diesem Zusammenhang richtig.',
    'Dafür gibt es hier keine medizinische Bedeutung.',
  ];
  for (const fallback of fallbacks) {
    if (distractors.length >= 3) break;
    if (!distractors.includes(fallback) && fallback !== correct) distractors.push(fallback);
  }

  const entries = [
    { text: correct, correct: true },
    ...distractors.slice(0, 3).map(text => ({ text, correct: false })),
  ];
  const shift = seed % entries.length;
  return [...entries.slice(shift), ...entries.slice(0, shift)].map((entry, index) => ({
    id: String.fromCharCode(97 + index),
    ...entry,
  }));
}

function buildChecks(sources: PracticeSource[], blocks: TopicContent[], seed: number): QuickCheck[] {
  const fallback = fallbackPractice('diesem Thema', blocks);
  const selected = [...sources.slice(0, 2)];
  while (selected.length < 2) selected.push(fallback[selected.length] || fallback[0]);

  const pool = unique([
    ...learningPoints(blocks),
    ...sources.map(source => source.solution),
    ...fallback.map(source => source.solution),
  ]);

  return selected.slice(0, 2).map((source, index) => ({
    question: source.question || 'Welche Aussage ist richtig?',
    options: makeOptions(source.solution, pool, seed + index * 11),
    explanation: source.solution,
  }));
}

function splitTopicIntoSteps(topic: LearningTopic, topicIndex: number): GuidedStep[] {
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
    const rawPracticeItems: string[] = [];
    const hidden = new Set<number>();

    if (practiceHeadingIndex >= 0) {
      hidden.add(practiceHeadingIndex);
      raw.blocks.forEach((block, index) => {
        if (index <= practiceHeadingIndex) return;
        if (block.type === 'list' && block.items?.length) {
          rawPracticeItems.push(...block.items);
          hidden.add(index);
        }
      });
    }

    let blocks = raw.blocks.filter((_, index) => !hidden.has(index));
    if (blocks[0]?.type === 'heading' && blocks[0].title === raw.title) blocks = blocks.slice(1);

    const parsed = rawPracticeItems.map(item => parsePracticeItem(item, blocks));
    const sources = parsed.length ? parsed : fallbackPractice(raw.title, blocks);
    const challenge = parsed[2]?.question || parsed.find(source => source.question.length > 120)?.question;

    return {
      key: `${topic.id}::${stepIndex}`,
      topicIndex,
      stepIndex,
      title: raw.title,
      blocks,
      checks: buildChecks(sources, blocks, topicIndex * 37 + stepIndex * 13 + 5),
      challenge,
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

function normalizeQuizQuestions(questions: QuizQuestion[]) {
  const pool = questions.map(answerText).filter(Boolean);
  let keptOpen = false;
  return questions.map((question, index): QuizQuestion => {
    if (question.type === 'single' || question.type === 'multiple') return question;
    if (question.type === 'text' && !keptOpen) {
      keptOpen = true;
      return question;
    }
    const correct = answerText(question);
    return {
      ...question,
      type: 'single',
      options: makeOptions(correct, pool, index * 9 + 3),
      correctAnswer: undefined,
    };
  });
}

function textAnswerMatches(question: QuizQuestion, answer: string) {
  const source = Array.isArray(question.correctAnswer)
    ? question.correctAnswer.join(',')
    : question.correctAnswer || question.explanation;
  const keywords = source.toLowerCase().split(/[,;·]/).map(word => word.trim()).filter(word => word.length >= 3);
  if (!keywords.length) return answer.trim().length >= 20;
  const normalized = answer.toLowerCase();
  const hits = keywords.filter(keyword => normalized.includes(keyword)).length;
  return hits >= Math.max(1, Math.ceil(keywords.length * 0.5));
}

function isQuizCorrect(question: QuizQuestion, answer: string | string[] | undefined) {
  if (answer === undefined) return false;
  if (question.type === 'single' && question.options) {
    return question.options.find(option => option.id === answer)?.correct === true;
  }
  if (question.type === 'multiple' && question.options) {
    const selected = new Set(Array.isArray(answer) ? answer : []);
    const correct = new Set(question.options.filter(option => option.correct).map(option => option.id));
    return selected.size === correct.size && [...selected].every(id => correct.has(id));
  }
  if (question.type === 'text' && typeof answer === 'string') return textAnswerMatches(question, answer);
  return false;
}

export function ModuleDetail({
  module,
  onBack,
  onUpdateProgress,
  currentProgress,
  allModules,
  onOpenModule,
}: ModuleDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>('learn');
  const topicSteps = useMemo(() => module.topics.map((topic, index) => splitTopicIntoSteps(topic, index)), [module.topics]);
  const allSteps = useMemo(() => topicSteps.flat(), [topicSteps]);
  const quizQuestions = useMemo(() => normalizeQuizQuestions(module.questions), [module.questions]);

  const [activeStepKey, setActiveStepKey] = useState(allSteps[0]?.key || '');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string | string[]>>({});
  const [quizChecked, setQuizChecked] = useState<Set<number>>(new Set());
  const [quizResults, setQuizResults] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const first = allSteps[0]?.key || '';
    try {
      const raw = localStorage.getItem(`medlearn-guided-v3-${module.id}`);
      if (!raw) {
        setActiveStepKey(first);
        setCompletedSteps(new Set());
        setSelections({});
        setChecked(new Set());
        return;
      }
      const saved = JSON.parse(raw) as SavedGuidedState;
      const validCompleted = (saved.completed || []).filter(key => allSteps.some(step => step.key === key));
      const unlocked = Math.min(validCompleted.length, Math.max(allSteps.length - 1, 0));
      const requested = allSteps.findIndex(step => step.key === saved.activeKey);
      const safeIndex = requested >= 0 && requested <= unlocked ? requested : unlocked;
      setActiveStepKey(allSteps[safeIndex]?.key || first);
      setCompletedSteps(new Set(validCompleted));
      setSelections(saved.selections || {});
      setChecked(new Set(saved.checked || []));
    } catch {
      setActiveStepKey(first);
      setCompletedSteps(new Set());
      setSelections({});
      setChecked(new Set());
    }
  }, [module.id, allSteps]);

  useEffect(() => {
    const saved: SavedGuidedState = {
      activeKey: activeStepKey,
      completed: Array.from(completedSteps),
      selections,
      checked: Array.from(checked),
    };
    localStorage.setItem(`medlearn-guided-v3-${module.id}`, JSON.stringify(saved));
  }, [module.id, activeStepKey, completedSteps, selections, checked]);

  const activeIndex = Math.max(0, allSteps.findIndex(step => step.key === activeStepKey));
  const activeStep = allSteps[activeIndex] || allSteps[0];
  const activeTopic = activeStep ? module.topics[activeStep.topicIndex] : module.topics[0];
  const guidedPercentage = allSteps.length ? Math.round((completedSteps.size / allSteps.length) * 100) : 0;
  const unlockedThrough = Math.min(completedSteps.size, Math.max(allSteps.length - 1, 0));
  const quizUnlocked = guidedPercentage >= 100 || currentProgress >= 90;

  const checkKey = (step: GuidedStep, index: number) => `${step.key}::${index}`;
  const checkCorrect = (step: GuidedStep, index: number) => {
    const key = checkKey(step, index);
    const selected = selections[key];
    return step.checks[index]?.options.find(option => option.id === selected)?.correct === true;
  };
  const stepComplete = activeStep?.checks.every((_, index) => checked.has(checkKey(activeStep, index)) && checkCorrect(activeStep, index)) ?? false;

  const choosePractice = useCallback((step: GuidedStep, index: number, optionId: string) => {
    const key = `${step.key}::${index}`;
    setSelections(previous => ({ ...previous, [key]: optionId }));
    setChecked(previous => {
      const next = new Set(previous);
      next.delete(key);
      return next;
    });
  }, []);

  const reviewPractice = useCallback((step: GuidedStep, index: number) => {
    const key = `${step.key}::${index}`;
    if (!selections[key]) return;
    setChecked(previous => new Set(previous).add(key));
  }, [selections]);

  const goToStep = useCallback((index: number) => {
    if (index < 0 || index >= allSteps.length || index > unlockedThrough) return;
    setActiveStepKey(allSteps[index].key);
    setActiveTab('learn');
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }, [allSteps, unlockedThrough]);

  const completeStep = useCallback(() => {
    if (!activeStep || !stepComplete) return;
    setCompletedSteps(previous => {
      const next = new Set(previous);
      next.add(activeStep.key);
      const progress = allSteps.length ? Math.round((next.size / allSteps.length) * 90) : 0;
      onUpdateProgress(module.id, progress);
      return next;
    });
    if (activeIndex < allSteps.length - 1) {
      setActiveStepKey(allSteps[activeIndex + 1].key);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    } else {
      setActiveTab('quiz');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeStep, stepComplete, allSteps, activeIndex, module.id, onUpdateProgress]);

  const selectQuizAnswer = (question: QuizQuestion, value: string) => {
    if (quizChecked.has(question.id)) return;
    if (question.type === 'multiple') {
      const current = (quizAnswers[question.id] as string[]) || [];
      const next = current.includes(value) ? current.filter(item => item !== value) : [...current, value];
      setQuizAnswers(previous => ({ ...previous, [question.id]: next }));
    } else {
      setQuizAnswers(previous => ({ ...previous, [question.id]: value }));
    }
  };

  const checkQuizAnswer = () => {
    const question = quizQuestions[quizIndex];
    if (!question) return;
    const answer = quizAnswers[question.id];
    const hasAnswer = Array.isArray(answer) ? answer.length > 0 : typeof answer === 'string' && answer.trim().length > 0;
    if (!hasAnswer) return;
    const correctAnswer = isQuizCorrect(question, answer);
    setQuizChecked(previous => new Set(previous).add(question.id));
    setQuizResults(previous => ({ ...previous, [question.id]: correctAnswer }));
  };

  const finishQuiz = () => {
    setShowResults(true);
    onUpdateProgress(module.id, 100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextModule = allModules.find(candidate => candidate.number === module.number + 1);
  const quizScore = quizQuestions.reduce((sum, question) => sum + (quizResults[question.id] ? question.points : 0), 0);
  const totalPoints = quizQuestions.reduce((sum, question) => sum + question.points, 0);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#ecfeff_0,_#f4f7f9_38%,_#f8fafc_100%)]">
      <header className="sticky top-0 z-50 bg-white/88 backdrop-blur-xl border-b border-white shadow-sm">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <button onClick={onBack} className="p-2.5 rounded-xl hover:bg-teal-50 transition-colors" aria-label="Zur Übersicht"><ArrowLeft className="w-5 h-5 text-teal-600" /></button>
          <span className="hidden sm:inline text-sm text-slate-500">MFA Lerncampus</span>
          <ChevronRight className="hidden sm:block w-4 h-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-800">Lernfeld {module.number}</span>
          <div className="ml-auto flex items-center gap-2 text-xs font-semibold text-teal-700 bg-teal-100 px-3 py-1.5 rounded-full"><CircleCheckBig className="w-4 h-4" /> {guidedPercentage}%</div>
        </div>
      </header>

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <motion.section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-teal-700 via-teal-600 to-sky-700 text-white shadow-[0_24px_60px_rgba(15,118,110,0.18)] mb-7" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <div className="relative grid lg:grid-cols-[1.18fr_.82fr] gap-6 p-6 sm:p-9 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-semibold mb-4"><GraduationCap className="w-4 h-4" /> Lernfeld {module.number}</div>
              <h1 className="text-2xl sm:text-4xl font-bold leading-tight mb-3">{module.title}</h1>
              <p className="text-white/80 text-sm sm:text-base leading-7 max-w-2xl">{module.subtitle}</p>
              <div className="mt-6 max-w-xl">
                <div className="flex justify-between text-xs text-white/75 mb-2"><span>Lernfortschritt</span><span>{completedSteps.size} / {allSteps.length} Teile</span></div>
                <div className="h-3 rounded-full bg-white/15 overflow-hidden p-[2px]"><motion.div className="h-full rounded-full bg-gradient-to-r from-amber-200 to-white" animate={{ width: `${guidedPercentage}%` }} /></div>
              </div>
            </div>
            <img src={module.heroImage} alt="" className="w-full h-52 sm:h-64 object-cover rounded-3xl border border-white/20 shadow-2xl" />
          </div>
        </motion.section>

        <div className="flex gap-2 mb-6 p-1.5 bg-white/90 rounded-2xl w-fit shadow-sm border border-white">
          <button onClick={() => setActiveTab('learn')} className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold ${activeTab === 'learn' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-500 hover:bg-teal-50'}`}><BookOpen className="w-4 h-4" /> Lernen</button>
          <button onClick={() => quizUnlocked && setActiveTab('quiz')} disabled={!quizUnlocked} className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold ${activeTab === 'quiz' ? 'bg-teal-600 text-white shadow-md' : quizUnlocked ? 'text-slate-500 hover:bg-teal-50' : 'text-slate-400 bg-slate-50 cursor-not-allowed'}`}>{quizUnlocked ? <PenLine className="w-4 h-4" /> : <LockKeyhole className="w-4 h-4" />} Abschlusstest ({quizQuestions.length})</button>
        </div>

        {activeTab === 'learn' && activeStep && (
          <div className="grid lg:grid-cols-[280px_1fr] gap-6 items-start">
            <aside className="lg:sticky lg:top-24 bg-white/90 rounded-2xl p-4 shadow-sm border border-white">
              <div className="text-xs uppercase tracking-[.16em] font-bold text-teal-600 mb-3">Inhalte</div>
              <div className="space-y-1.5 max-h-[68vh] overflow-y-auto pr-1">
                {module.topics.map((topic, topicIndex) => {
                  const steps = topicSteps[topicIndex] || [];
                  const start = topicSteps.slice(0, topicIndex).reduce((sum, entry) => sum + entry.length, 0);
                  const unlocked = start <= unlockedThrough;
                  const done = steps.length > 0 && steps.every(step => completedSteps.has(step.key));
                  const current = topicIndex === activeStep.topicIndex;
                  return (
                    <button key={topic.id} disabled={!unlocked} onClick={() => goToStep(Math.min(start, unlockedThrough))} className={`w-full rounded-xl px-3 py-3 text-left border transition-all ${current ? 'bg-emerald-50 border-teal-300' : done ? 'bg-slate-50 border-slate-200' : 'bg-white border-transparent hover:bg-slate-50'} disabled:opacity-45`}>
                      <div className="flex items-start gap-2.5"><div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${done ? 'bg-emerald-100 text-emerald-600' : current ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{done ? <Check className="w-4 h-4" /> : unlocked ? topicIndex + 1 : <LockKeyhole className="w-3.5 h-3.5" />}</div><div className="min-w-0"><div className="text-xs font-semibold text-slate-800 leading-5 line-clamp-2">{topic.title}</div><div className="text-[11px] text-slate-400 mt-1">{steps.length} Teile</div></div></div>
                    </button>
                  );
                })}
              </div>
            </aside>

            <main className="min-w-0">
              <div className="bg-white/85 rounded-2xl p-4 sm:p-5 shadow-sm border border-white mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div><div className="text-xs font-bold uppercase tracking-[.14em] text-teal-600">{activeTopic.title}</div><div className="text-sm text-slate-500 mt-1">Lernteil {activeIndex + 1} von {allSteps.length}</div></div>
                  <div className="text-xs font-semibold text-slate-500 bg-slate-100 rounded-full px-3 py-1.5">2 kurze Klickfragen danach</div>
                </div>
              </div>

              <motion.article key={activeStep.key} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[28px] shadow-[0_18px_45px_rgba(15,23,42,0.07)] border border-white overflow-hidden">
                <div className="p-5 sm:p-8 border-b border-slate-200 bg-gradient-to-br from-white to-teal-50"><h2 className="text-xl sm:text-2xl font-bold text-slate-900">{activeStep.title}</h2></div>
                <div className="p-5 sm:p-8">
                  <TopicRenderer content={activeStep.blocks} />

                  <section className="mt-8 rounded-3xl overflow-hidden border border-teal-200 bg-gradient-to-br from-teal-50 to-sky-50">
                    <div className="p-5 sm:p-6 border-b border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div><div className="flex items-center gap-2 text-teal-700 font-bold"><ListChecks className="w-5 h-5" /> Kurz-Check</div><p className="text-sm text-slate-500 mt-1">Nur anklicken, prüfen und direkt sehen, warum es richtig oder falsch ist.</p></div>
                      <div className="px-3 py-1.5 rounded-full bg-white text-xs font-bold text-teal-700 shadow-sm">2 Fragen</div>
                    </div>

                    <div className="p-5 sm:p-6 space-y-5">
                      {activeStep.checks.map((check, index) => {
                        const key = checkKey(activeStep, index);
                        const selected = selections[key];
                        const wasChecked = checked.has(key);
                        const isCorrect = checkCorrect(activeStep, index);
                        const correctOption = check.options.find(option => option.correct);
                        return (
                          <div key={key} className="rounded-2xl bg-white border border-teal-100 p-4 sm:p-5 shadow-sm">
                            <div className="flex items-start gap-3 mb-4"><div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold ${wasChecked && isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-teal-100 text-teal-700'}`}>{wasChecked && isCorrect ? <Check className="w-4 h-4" /> : index + 1}</div><p className="text-sm sm:text-base font-semibold text-slate-800 leading-6">{check.question}</p></div>
                            <div className="space-y-2.5">
                              {check.options.map(option => {
                                const chosen = selected === option.id;
                                const showCorrect = wasChecked && option.correct;
                                const showWrong = wasChecked && chosen && !option.correct;
                                return (
                                  <button key={option.id} onClick={() => choosePractice(activeStep, index, option.id)} className={`w-full flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border-2 text-left transition-all ${showCorrect ? 'border-emerald-400 bg-emerald-50' : showWrong ? 'border-rose-400 bg-rose-50' : chosen ? 'border-teal-500 bg-teal-50' : 'border-slate-200 bg-white hover:border-teal-300'}`}>
                                    <span className={`mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 ${chosen ? 'border-teal-600 bg-teal-600' : 'border-slate-300'}`} />
                                    <span className="text-sm text-slate-700 leading-5">{option.text}</span>
                                    {showCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />}
                                    {showWrong && <XCircle className="w-5 h-5 text-rose-500 ml-auto shrink-0" />}
                                  </button>
                                );
                              })}
                            </div>
                            {!wasChecked && <div className="mt-4 flex justify-end"><button onClick={() => reviewPractice(activeStep, index)} disabled={!selected} className="px-4 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-semibold disabled:opacity-35">Prüfen</button></div>}
                            {wasChecked && (
                              <div className={`mt-4 rounded-xl border p-4 ${isCorrect ? 'border-emerald-300 bg-emerald-50' : 'border-rose-300 bg-rose-50'}`}>
                                <div className={`flex items-center gap-2 font-bold text-sm mb-1.5 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>{isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}{isCorrect ? 'Richtig' : 'Nicht richtig'}</div>
                                {!isCorrect && correctOption && <p className="text-sm text-slate-600 mb-2"><strong>Richtige Antwort:</strong> {correctOption.text}</p>}
                                <p className="text-sm text-slate-600 leading-6">{check.explanation}</p>
                                {!isCorrect && <p className="text-xs text-rose-600 mt-2">Wähle eine andere Antwort und prüfe noch einmal.</p>}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {activeStep.challenge && (
                    <details className="mt-5 rounded-2xl border border-violet-200 bg-violet-50 p-4 sm:p-5">
                      <summary className="cursor-pointer font-bold text-violet-700 flex items-center gap-2"><Sparkles className="w-4 h-4" /> Optionale Praxis-Challenge</summary>
                      <p className="text-sm text-slate-600 leading-6 mt-3">{activeStep.challenge}</p>
                      <p className="text-xs text-violet-600 mt-2">Du kannst das mündlich oder auf Papier lösen. Es ist nicht nötig, um weiterzukommen.</p>
                    </details>
                  )}

                  {activeIndex === allSteps.length - 1 && <MiniCrossword module={module} />}

                  <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-200 pt-6">
                    <button onClick={() => goToStep(activeIndex - 1)} disabled={activeIndex === 0} className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-500 disabled:opacity-35 hover:bg-slate-50"><ChevronLeft className="w-4 h-4" /> Zurück</button>
                    <div className="sm:text-right">
                      {!stepComplete && <div className="text-xs text-amber-700 mb-2">Beide Klickfragen richtig beantworten, dann geht es weiter.</div>}
                      <button onClick={completeStep} disabled={!stepComplete} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 text-white text-sm font-bold shadow-lg disabled:opacity-40 disabled:shadow-none">{activeIndex === allSteps.length - 1 ? 'Zum Abschlusstest' : 'Weiter'} <ArrowRight className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </motion.article>
            </main>
          </div>
        )}

        {activeTab === 'quiz' && (
          <QuizArea
            module={module}
            questions={quizQuestions}
            quizIndex={quizIndex}
            quizAnswers={quizAnswers}
            quizChecked={quizChecked}
            quizResults={quizResults}
            showResults={showResults}
            quizScore={quizScore}
            totalPoints={totalPoints}
            onSelect={selectQuizAnswer}
            onText={(question, value) => setQuizAnswers(previous => ({ ...previous, [question.id]: value }))}
            onCheck={checkQuizAnswer}
            onPrev={() => setQuizIndex(index => Math.max(0, index - 1))}
            onNext={() => setQuizIndex(index => Math.min(quizQuestions.length - 1, index + 1))}
            onFinish={finishQuiz}
            onRestart={() => { setQuizIndex(0); setQuizAnswers({}); setQuizChecked(new Set()); setQuizResults({}); setShowResults(false); }}
            nextModule={nextModule}
            onOpenModule={onOpenModule}
          />
        )}
      </div>
    </div>
  );
}

function TopicRenderer({ content }: { content: LearningTopic['content'] }) {
  return (
    <div className="space-y-5">
      {content.map((block, index) => {
        switch (block.type) {
          case 'heading': return <h4 key={index} className="font-bold text-slate-900 text-lg sm:text-xl mt-7 first:mt-0">{block.title}</h4>;
          case 'text': return <p key={index} className="text-[15px] sm:text-base text-slate-600 leading-7 sm:leading-8">{block.text}</p>;
          case 'info': return <div key={index} className="bg-gradient-to-br from-sky-50 to-teal-50 border border-sky-200 rounded-2xl p-4 sm:p-5"><div className="font-bold text-sky-700 text-sm mb-1.5">{block.title}</div><div className="text-sm text-slate-600 leading-6">{block.text}</div></div>;
          case 'warning': return <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 sm:p-5"><div className="font-bold text-amber-700 text-sm mb-1.5">{block.title}</div><div className="text-sm text-slate-600 leading-6">{block.text}</div></div>;
          case 'table': return <div key={index} className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm"><table className="w-full text-sm"><thead><tr className="bg-gradient-to-r from-teal-100 to-sky-100">{block.headers?.map((header, i) => <th key={i} className="text-left px-4 py-3.5 font-bold text-teal-700 text-xs sm:text-sm">{header}</th>)}</tr></thead><tbody>{block.rows?.map((row, rowIndex) => <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3.5 text-slate-600 text-xs sm:text-sm align-top leading-5 sm:leading-6">{cell}</td>)}</tr>)}</tbody></table></div>;
          case 'list': return <ul key={index} className="grid gap-2.5">{block.items?.map((item, i) => <li key={i} className="flex items-start gap-3 text-sm sm:text-[15px] text-slate-600 leading-6 bg-slate-50 rounded-xl px-3.5 py-3"><span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span><span>{item.includes('|||') ? item.split('|||')[0] : item}</span></li>)}</ul>;
          case 'definition': return <div key={index} className="bg-teal-50 border border-teal-200 rounded-2xl p-4 sm:p-5"><span className="font-bold text-teal-700 text-sm">{block.term}: </span><span className="text-sm text-slate-600 leading-6">{block.definition}</span></div>;
          case 'image': return <figure key={index} className="bg-slate-50 rounded-3xl border border-slate-200 p-3 sm:p-4 shadow-sm overflow-hidden"><img src={block.src} alt={block.alt || ''} className="w-full max-h-[560px] object-contain rounded-2xl" loading="lazy" />{block.caption && <figcaption className="text-xs sm:text-sm text-slate-500 mt-3 text-center leading-5 px-2">{block.caption}</figcaption>}</figure>;
          case 'video': return <div key={index} className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white overflow-hidden shadow-sm"><div className="p-4 sm:p-5 flex gap-3 items-start"><div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-600 to-sky-600 text-white flex items-center justify-center shrink-0"><PlayCircle className="w-5 h-5" /></div><div className="min-w-0 flex-1"><div className="font-bold text-slate-900">{block.title || 'Lernvideo'}</div><div className="text-xs text-slate-500 mt-1">{[block.source, block.duration].filter(Boolean).join(' • ')}</div>{block.caption && <p className="text-sm text-slate-600 mt-2 leading-6">{block.caption}</p>}</div></div>{block.embedUrl && <div className="aspect-video bg-black"><iframe src={block.embedUrl} title={block.title || 'Lernvideo'} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" /></div>}{block.url && <a href={block.url} target="_blank" rel="noreferrer" className="m-4 sm:m-5 mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-sky-300 text-sky-700 text-sm font-medium hover:bg-sky-50">Video öffnen <ExternalLink className="w-4 h-4" /></a>}</div>;
          default: return null;
        }
      })}
    </div>
  );
}

interface QuizAreaProps {
  module: LearningModule;
  questions: QuizQuestion[];
  quizIndex: number;
  quizAnswers: Record<number, string | string[]>;
  quizChecked: Set<number>;
  quizResults: Record<number, boolean>;
  showResults: boolean;
  quizScore: number;
  totalPoints: number;
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

function QuizArea({ questions, quizIndex, quizAnswers, quizChecked, quizResults, showResults, quizScore, totalPoints, onSelect, onText, onCheck, onPrev, onNext, onFinish, onRestart, nextModule, onOpenModule }: QuizAreaProps) {
  if (showResults) {
    const percentage = totalPoints ? Math.round((quizScore / totalPoints) * 100) : 0;
    const grade = getGrade(percentage);
    return (
      <motion.div className="max-w-[680px] mx-auto" initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="bg-white rounded-3xl p-8 shadow-sm text-center"><div className="w-28 h-28 rounded-full mx-auto mb-4 flex flex-col items-center justify-center text-white bg-gradient-to-br from-teal-600 to-sky-500"><Trophy className="w-8 h-8 mb-1" /><span className="text-2xl font-bold">{percentage}%</span></div><h2 className="text-xl font-bold text-slate-900">{quizScore} von {totalPoints} Punkten</h2><div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mt-3 mb-5 ${grade.color}`}>Note {grade.grade} – {grade.label}</div><p className="text-sm text-slate-500 mb-6">Im Abschlusstest bleibt bewusst höchstens eine offene Formulierungsaufgabe. Der Rest ist anklickbar.</p><div className="flex flex-col sm:flex-row gap-3 justify-center"><button onClick={onRestart} className="flex items-center justify-center gap-2 px-5 py-3 border-2 border-teal-600 text-teal-700 rounded-xl font-medium"><RotateCcw className="w-4 h-4" /> Wiederholen</button>{nextModule && <button onClick={() => onOpenModule(nextModule.id)} className="flex items-center justify-center gap-2 px-5 py-3 bg-teal-600 text-white rounded-xl font-medium">Nächstes Lernfeld <ArrowRight className="w-4 h-4" /></button>}</div></div>
      </motion.div>
    );
  }

  const question = questions[quizIndex];
  if (!question) return <div className="bg-white rounded-2xl p-6">Für dieses Lernfeld sind noch keine Testfragen hinterlegt.</div>;
  const answer = quizAnswers[question.id];
  const revealed = quizChecked.has(question.id);
  const correct = quizResults[question.id] === true;
  const hasAnswer = Array.isArray(answer) ? answer.length > 0 : typeof answer === 'string' && answer.trim().length > 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[820px] mx-auto">
      <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 flex items-center gap-2 flex-wrap">{questions.map((item, index) => <span key={item.id} className={`w-8 h-8 rounded-lg text-xs font-semibold flex items-center justify-center ${index === quizIndex ? 'ring-2 ring-teal-600 ring-offset-1' : ''} ${quizResults[item.id] === true ? 'bg-emerald-100 text-emerald-600' : quizChecked.has(item.id) ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>{index + 1}</span>)}</div>
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="text-xs font-medium text-teal-600 uppercase tracking-wider mb-2">Frage {quizIndex + 1} von {questions.length} • {question.points} Punkte</div>
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-5">{question.question}</h3>

        {(question.type === 'single' || question.type === 'multiple') && question.options && (
          <div className="space-y-2.5 mb-6">
            {question.options.map(option => {
              const selected = question.type === 'multiple' ? ((answer as string[]) || []).includes(option.id) : answer === option.id;
              const showCorrect = revealed && option.correct;
              const showWrong = revealed && selected && !option.correct;
              return <button key={option.id} disabled={revealed} onClick={() => onSelect(question, option.id)} className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left ${showCorrect ? 'border-emerald-400 bg-emerald-50' : showWrong ? 'border-rose-400 bg-rose-50' : selected ? 'border-teal-500 bg-teal-50' : 'border-slate-200 bg-white'} ${!revealed ? 'hover:border-teal-300' : ''}`}><span className={`mt-0.5 w-5 h-5 shrink-0 ${question.type === 'multiple' ? 'rounded' : 'rounded-full'} border-2 ${selected ? 'border-teal-600 bg-teal-600' : 'border-slate-300'}`}>{question.type === 'multiple' && selected && <Check className="w-3 h-3 text-white m-0.5" />}</span><span className="text-sm text-slate-700 leading-5">{option.text}</span>{showCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" />}{showWrong && <XCircle className="w-5 h-5 text-rose-500 ml-auto shrink-0" />}</button>;
            })}
          </div>
        )}

        {question.type === 'text' && <div className="mb-6"><div className="flex items-center gap-2 text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-200 rounded-xl px-3 py-2 mb-3"><Lightbulb className="w-4 h-4" /> Das ist die eine offene Aufgabe dieses Lernfelds.</div><textarea value={(answer as string) || ''} disabled={revealed} onChange={event => onText(question, event.target.value)} rows={5} className="w-full rounded-xl border-2 border-slate-200 p-4 text-sm focus:outline-none focus:border-teal-500" placeholder="Kurze Antwort in eigenen Worten …" /></div>}

        {revealed && <div className={`rounded-2xl p-5 mb-5 border ${correct ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50 border-amber-300'}`}><div className={`font-bold text-sm flex items-center gap-2 mb-2 ${correct ? 'text-emerald-700' : 'text-amber-700'}`}>{correct ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}{correct ? 'Richtig' : 'Nicht richtig'}</div><p className="text-sm text-slate-600 leading-6">{question.explanation}</p></div>}

        <div className="flex flex-col sm:flex-row gap-3 justify-between pt-2">
          <button onClick={onPrev} disabled={quizIndex === 0} className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 rounded-xl text-sm font-semibold text-slate-500 disabled:opacity-35"><ChevronLeft className="w-4 h-4" /> Zurück</button>
          <div className="flex gap-2">
            {!revealed && <button onClick={onCheck} disabled={!hasAnswer} className="px-5 py-3 rounded-xl bg-teal-600 text-white text-sm font-bold disabled:opacity-35">Prüfen</button>}
            {revealed && quizIndex < questions.length - 1 && <button onClick={onNext} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-600 text-white text-sm font-bold">Nächste Frage <ArrowRight className="w-4 h-4" /></button>}
            {revealed && quizIndex === questions.length - 1 && <button onClick={onFinish} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 text-white text-sm font-bold">Ergebnis <Trophy className="w-4 h-4" /></button>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
