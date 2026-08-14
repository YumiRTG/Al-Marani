import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  PenLine,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ArrowRight,
  Check,
  ExternalLink,
  PlayCircle,
  LockKeyhole,
  ListChecks,
  Clock3,
  CircleCheckBig,
  GraduationCap,
  Lightbulb,
} from 'lucide-react';
import type { LearningModule, LearningTopic, QuizQuestion, TopicContent } from '@/types';
import { MiniCrossword } from '@/components/MiniCrossword';

interface ModuleDetailProps {
  module: LearningModule;
  onBack: () => void;
  onUpdateProgress: (moduleId: string, progress: number) => void;
  currentProgress: number;
  allModules: LearningModule[];
  onOpenModule: (moduleId: string) => void;
}

type Tab = 'learn' | 'quiz';
type QuizState = 'answering' | 'revealed' | 'results';
type PracticeAnswer = string | string[];

type GuidedStep = {
  key: string;
  topicIndex: number;
  stepIndex: number;
  title: string;
  blocks: TopicContent[];
  practiceTitle?: string;
  practiceItems: string[];
};

type QuickCheck = QuizQuestion & { key: string };

type SavedGuidedState = {
  activeKey?: string;
  completed?: string[];
  answers?: Record<string, PracticeAnswer>;
  checked?: string[];
};

const difficultyMap: Record<string, { label: string; color: string; bg: string }> = {
  easy: { label: 'Einfach', color: 'text-[#16A34A]', bg: 'bg-[#DCFCE7]' },
  medium: { label: 'Mittel', color: 'text-[#D97706]', bg: 'bg-[#FEF3C7]' },
  advanced: { label: 'Fortgeschritten', color: 'text-[#DC2626]', bg: 'bg-[#FEE2E2]' },
};

const stopWords = new Set([
  'aber','alle','auch','dann','dass','deine','diesem','dieser','dieses','eine','einem','einen','einer','eines','für','haben','hier','ist','kann','mit','nach','nicht','oder','sind','über','unter','und','vom','von','was','welche','welcher','welches','werden','wird','wurde','zum','zur','thema','teil','richtig','aussage','erkläre','nenne','warum','beim','durch','sowie','sicher','praxis','lernfeld',
]);

function getGrade(percentage: number) {
  if (percentage >= 91) return { grade: 1, label: 'Sehr gut', color: 'bg-[#DCFCE7] text-[#16A34A]' };
  if (percentage >= 81) return { grade: 2, label: 'Gut', color: 'bg-[#CCFBF1] text-[#0F766E]' };
  if (percentage >= 67) return { grade: 3, label: 'Befriedigend', color: 'bg-[#E0F2FE] text-[#0369A1]' };
  if (percentage >= 50) return { grade: 4, label: 'Ausreichend', color: 'bg-[#FEF3C7] text-[#D97706]' };
  return { grade: 5, label: 'Mangelhaft', color: 'bg-[#FEE2E2] text-[#DC2626]' };
}

function isPracticeHeading(block: TopicContent) {
  return block.type === 'heading' && Boolean(block.title?.startsWith('✍️'));
}

function splitTopicIntoSteps(topic: LearningTopic, topicIndex: number): GuidedStep[] {
  const rawSteps: { title: string; blocks: TopicContent[] }[] = [];
  let current: { title: string; blocks: TopicContent[] } | null = null;
  const intro: TopicContent[] = [];

  topic.content.forEach(block => {
    const startsNewPart = block.type === 'heading' && !isPracticeHeading(block);
    if (startsNewPart) {
      if (!current && intro.length) {
        rawSteps.push({ title: 'Einstieg & Überblick', blocks: [...intro] });
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
  else if (intro.length) rawSteps.push({ title: 'Einstieg & Überblick', blocks: intro });

  return rawSteps.map((raw, stepIndex) => {
    const practiceHeadingIndex = raw.blocks.findIndex(isPracticeHeading);
    let practiceTitle: string | undefined;
    let practiceItems: string[] = [];
    let blocks = raw.blocks;

    if (practiceHeadingIndex >= 0) {
      practiceTitle = raw.blocks[practiceHeadingIndex].title;
      const possibleList = raw.blocks[practiceHeadingIndex + 1];
      if (possibleList?.type === 'list') practiceItems = possibleList.items || [];
      blocks = raw.blocks.filter((_, index) => index !== practiceHeadingIndex && index !== practiceHeadingIndex + 1);
    }

    return { key: `${topic.id}::${stepIndex}`, topicIndex, stepIndex, title: raw.title, blocks, practiceTitle, practiceItems };
  });
}

function blockText(block: TopicContent) {
  return [
    block.title,
    block.text,
    block.term,
    block.definition,
    block.caption,
    ...(block.items || []),
    ...(block.headers || []),
    ...(block.rows || []).flat(),
  ].filter(Boolean).join(' ');
}

function keywords(value: string) {
  return new Set(
    value
      .toLowerCase()
      .replace(/[^a-zäöüß0-9\s-]/g, ' ')
      .split(/\s+/)
      .map(word => word.trim())
      .filter(word => word.length >= 4 && !stopWords.has(word)),
  );
}

function questionScore(question: QuizQuestion, haystack: Set<string>) {
  const words = keywords(`${question.question} ${question.explanation} ${question.options?.map(option => option.text).join(' ') || ''}`);
  let score = 0;
  words.forEach(word => { if (haystack.has(word)) score += 1; });
  return score;
}

function parseSolvedPractice(items: string[], stepKey: string): QuickCheck[] {
  const solved = items
    .map(item => item.split('|||').map(part => part.trim()))
    .filter(parts => parts.length >= 2 && parts[0] && parts[1]);

  return solved.slice(0, 2).map((parts, index) => {
    const correct = parts.slice(1).join(' ').trim();
    const distractorPool = solved.map(entry => entry.slice(1).join(' ').trim()).filter(answer => answer !== correct);
    const fallbacks = ['Diese Aussage passt nicht zum beschriebenen Zusammenhang.', 'Keiner der genannten Punkte wäre hier entscheidend.', 'Die Aussage beschreibt einen anderen Lerninhalt.'];
    const options = [correct, ...distractorPool, ...fallbacks].filter((value, i, arr) => value && arr.indexOf(value) === i).slice(0, 4);
    const shift = (index + stepKey.length) % options.length;
    const rotated = [...options.slice(shift), ...options.slice(0, shift)];
    return {
      id: 900000 + index,
      key: `${stepKey}::source::${index}`,
      question: parts[0],
      type: 'single',
      options: rotated.map((text, optionIndex) => ({ id: String.fromCharCode(97 + optionIndex), text, correct: text === correct })),
      explanation: correct,
      points: 1,
    };
  });
}

function buildQuickChecks(step: GuidedStep, questions: QuizQuestion[]): QuickCheck[] {
  const sourceChecks = parseSolvedPractice(step.practiceItems, step.key);
  const eligible = questions.filter(question => (question.type === 'single' || question.type === 'multiple') && question.options?.length);
  if (!eligible.length) return sourceChecks;

  const haystack = keywords(`${step.title} ${step.blocks.map(blockText).join(' ')}`);
  const ranked = eligible
    .map((question, index) => ({ question, score: questionScore(question, haystack), index }))
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const selected: QuickCheck[] = [];
  for (const entry of ranked) {
    if (selected.length >= Math.max(2 - sourceChecks.length, 0)) break;
    selected.push({ ...entry.question, key: `${step.key}::quiz::${entry.question.id}` });
  }

  return [...sourceChecks, ...selected].slice(0, 2);
}

function isCorrectAnswer(question: QuizQuestion, answer: PracticeAnswer | undefined) {
  if (answer === undefined) return false;
  if (question.type === 'single' && question.options) return answer === question.options.find(option => option.correct)?.id;
  if (question.type === 'multiple' && question.options) {
    const correct = question.options.filter(option => option.correct).map(option => option.id).sort();
    const selected = [...((answer as string[]) || [])].sort();
    return JSON.stringify(correct) === JSON.stringify(selected);
  }
  if ((question.type === 'text' || question.type === 'matching') && question.correctAnswer) {
    const value = String(answer).toLowerCase().trim();
    const targets = (Array.isArray(question.correctAnswer) ? question.correctAnswer : String(question.correctAnswer).split(','))
      .map(item => String(item).toLowerCase().trim()).filter(Boolean);
    return targets.some(target => value.includes(target));
  }
  return false;
}

function correctAnswerText(question: QuizQuestion) {
  if ((question.type === 'single' || question.type === 'multiple') && question.options) {
    return question.options.filter(option => option.correct).map(option => option.text).join(' · ');
  }
  if (Array.isArray(question.correctAnswer)) return question.correctAnswer.join(' · ');
  if (typeof question.correctAnswer === 'string') return question.correctAnswer.split(',').map(value => value.trim()).join(' · ');
  return question.explanation;
}

export function ModuleDetail({ module, onBack, onUpdateProgress, allModules, onOpenModule }: ModuleDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>('learn');
  const [quizState, setQuizState] = useState<QuizState>('answering');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | string[]>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Set<number>>(new Set());
  const [correctQuestions, setCorrectQuestions] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);

  const topicSteps = useMemo(() => module.topics.map((topic, topicIndex) => splitTopicIntoSteps(topic, topicIndex)), [module.topics]);
  const allSteps = useMemo(() => topicSteps.flat(), [topicSteps]);
  const [activeStepKey, setActiveStepKey] = useState(allSteps[0]?.key || '');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, PracticeAnswer>>({});
  const [checkedPractice, setCheckedPractice] = useState<Set<string>>(new Set());

  useEffect(() => {
    const first = allSteps[0]?.key || '';
    try {
      const raw = localStorage.getItem(`medlearn-guided-${module.id}`);
      if (!raw) {
        setActiveStepKey(first);
        setCompletedSteps(new Set());
        setPracticeAnswers({});
        setCheckedPractice(new Set());
        return;
      }
      const saved = JSON.parse(raw) as SavedGuidedState;
      const validCompleted = (saved.completed || []).filter(key => allSteps.some(step => step.key === key));
      const maxUnlockedIndex = Math.min(validCompleted.length, Math.max(allSteps.length - 1, 0));
      const requestedIndex = allSteps.findIndex(step => step.key === saved.activeKey);
      const safeIndex = requestedIndex >= 0 && requestedIndex <= maxUnlockedIndex ? requestedIndex : maxUnlockedIndex;
      setCompletedSteps(new Set(validCompleted));
      setPracticeAnswers(saved.answers || {});
      setCheckedPractice(new Set(saved.checked || []));
      setActiveStepKey(allSteps[safeIndex]?.key || first);
    } catch {
      setActiveStepKey(first);
      setCompletedSteps(new Set());
      setPracticeAnswers({});
      setCheckedPractice(new Set());
    }
  }, [module.id, allSteps]);

  useEffect(() => {
    if (!module.id) return;
    const state: SavedGuidedState = {
      activeKey: activeStepKey,
      completed: Array.from(completedSteps),
      answers: practiceAnswers,
      checked: Array.from(checkedPractice),
    };
    localStorage.setItem(`medlearn-guided-${module.id}`, JSON.stringify(state));
  }, [module.id, activeStepKey, completedSteps, practiceAnswers, checkedPractice]);

  const activeLinearIndex = Math.max(0, allSteps.findIndex(step => step.key === activeStepKey));
  const activeStep = allSteps[activeLinearIndex] || allSteps[0];
  const activeTopic = activeStep ? module.topics[activeStep.topicIndex] : module.topics[0];
  const completedCount = completedSteps.size;
  const guidedPercentage = allSteps.length ? Math.round((completedCount / allSteps.length) * 100) : 0;
  const unlockedThrough = Math.min(completedCount, Math.max(allSteps.length - 1, 0));
  const activeChecks = useMemo(() => activeStep ? buildQuickChecks(activeStep, module.questions) : [], [activeStep, module.questions]);
  const canComplete = activeChecks.every(check => checkedPractice.has(check.key));

  const currentQuestion = module.questions[currentQuestionIndex];
  const totalPoints = useMemo(() => module.questions.reduce((sum, question) => sum + question.points, 0), [module.questions]);

  const handleSelectAnswer = useCallback((questionId: number, answer: string | string[]) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  }, []);

  const handleCheckAnswer = useCallback(() => {
    const question = currentQuestion;
    const answer = selectedAnswers[question.id];
    if (answer === undefined || answer === '') return;
    const correct = isCorrectAnswer(question, answer);
    setCheckedQuestions(prev => new Set(prev).add(question.id));
    if (correct && !correctQuestions.has(question.id)) {
      setCorrectQuestions(prev => new Set(prev).add(question.id));
      setScore(prev => prev + question.points);
    }
    setQuizState('revealed');
  }, [currentQuestion, selectedAnswers, correctQuestions]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < module.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuizState(checkedQuestions.has(module.questions[currentQuestionIndex + 1]?.id) ? 'revealed' : 'answering');
      return;
    }
    setQuizState('results');
    onUpdateProgress(module.id, 100);
  }, [currentQuestionIndex, module.questions, module.id, checkedQuestions, onUpdateProgress]);

  const handlePrevQuestion = useCallback(() => {
    if (currentQuestionIndex === 0) return;
    const nextIndex = currentQuestionIndex - 1;
    setCurrentQuestionIndex(nextIndex);
    setQuizState(checkedQuestions.has(module.questions[nextIndex].id) ? 'revealed' : 'answering');
  }, [currentQuestionIndex, checkedQuestions, module.questions]);

  const handleRestartQuiz = useCallback(() => {
    setQuizState('answering');
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setCheckedQuestions(new Set());
    setCorrectQuestions(new Set());
    setScore(0);
  }, []);

  const handleJumpToQuestion = useCallback((index: number) => {
    setCurrentQuestionIndex(index);
    setQuizState(checkedQuestions.has(module.questions[index].id) ? 'revealed' : 'answering');
  }, [checkedQuestions, module.questions]);

  const setPracticeAnswer = useCallback((key: string, value: PracticeAnswer) => {
    setPracticeAnswers(prev => ({ ...prev, [key]: value }));
    setCheckedPractice(prev => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  }, []);

  const checkPractice = useCallback((key: string) => {
    const answer = practiceAnswers[key];
    if (answer === undefined || (typeof answer === 'string' && !answer.trim()) || (Array.isArray(answer) && !answer.length)) return;
    setCheckedPractice(prev => new Set(prev).add(key));
  }, [practiceAnswers]);

  const completeCurrentStep = useCallback(() => {
    if (!activeStep || !canComplete) return;
    setCompletedSteps(prev => {
      const next = new Set(prev);
      next.add(activeStep.key);
      const learningProgress = allSteps.length ? Math.round((next.size / allSteps.length) * 90) : 0;
      onUpdateProgress(module.id, learningProgress);
      return next;
    });
    if (activeLinearIndex < allSteps.length - 1) {
      setActiveStepKey(allSteps[activeLinearIndex + 1].key);
      window.scrollTo({ top: 240, behavior: 'smooth' });
    } else {
      setActiveTab('quiz');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeStep, canComplete, allSteps, activeLinearIndex, module.id, onUpdateProgress]);

  const goToStep = useCallback((index: number) => {
    if (index < 0 || index >= allSteps.length || index > unlockedThrough) return;
    setActiveStepKey(allSteps[index].key);
    window.scrollTo({ top: 240, behavior: 'smooth' });
  }, [allSteps, unlockedThrough]);

  const nextModule = allModules.find(item => item.number === module.number + 1);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#ecfeff_0,_#f4f7f9_36%,_#f8fafc_100%)]">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/70 shadow-[0_1px_20px_rgba(15,118,110,0.06)]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <button onClick={onBack} className="p-2.5 rounded-xl hover:bg-[#CCFBF1] transition-all hover:scale-105"><ArrowLeft className="w-5 h-5 text-[#0D9488]" /></button>
          <span className="hidden sm:inline text-sm text-[#64748B]">MFA Lerncampus</span>
          <ChevronRight className="hidden sm:block w-4 h-4 text-[#94A3B8]" />
          <span className="text-sm font-semibold text-[#1A1D2B]">Lernfeld {module.number}</span>
          <div className="ml-auto flex items-center gap-2 text-xs font-semibold text-[#0F766E] bg-[#CCFBF1] px-3 py-1.5 rounded-full"><CircleCheckBig className="w-4 h-4" /> {guidedPercentage}%</div>
        </div>
      </header>

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <motion.section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0F766E] via-[#0D9488] to-[#0369A1] text-white shadow-[0_24px_60px_rgba(15,118,110,0.18)] mb-7" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <div className="absolute -right-20 -top-24 w-80 h-80 rounded-full bg-white/10 blur-2xl" />
          <div className="relative grid lg:grid-cols-[1.2fr_.8fr] gap-6 p-6 sm:p-9 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-semibold"><GraduationCap className="w-4 h-4" /> Lernfeld {module.number}</span>
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${difficultyMap[module.difficulty]?.bg || 'bg-white/15'} ${difficultyMap[module.difficulty]?.color || 'text-white'}`}>{difficultyMap[module.difficulty]?.label || 'Lernen'}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold leading-tight mb-3">{module.title}</h1>
              <p className="text-white/80 text-sm sm:text-base leading-7 max-w-2xl">{module.subtitle}</p>
              <div className="mt-6 max-w-xl">
                <div className="flex items-center justify-between text-xs text-white/75 mb-2"><span>Fortschritt</span><span>{completedCount} / {allSteps.length}</span></div>
                <div className="h-3 rounded-full bg-white/15 overflow-hidden p-[2px]"><motion.div className="h-full rounded-full bg-gradient-to-r from-[#FDE68A] to-white" animate={{ width: `${guidedPercentage}%` }} /></div>
              </div>
            </div>
            <motion.div className="relative" whileHover={{ y: -4 }}><img src={module.heroImage} alt="" className="relative w-full h-52 sm:h-64 object-cover rounded-3xl border border-white/20 shadow-2xl" /></motion.div>
          </div>
        </motion.section>

        <div className="flex gap-2 mb-6 p-1.5 bg-white/80 backdrop-blur rounded-2xl w-fit shadow-sm border border-white">
          <button onClick={() => setActiveTab('learn')} className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'learn' ? 'bg-[#0D9488] text-white shadow-md' : 'text-[#64748B] hover:bg-[#F0FDFA]'}`}><BookOpen className="w-4 h-4" /> Lernmaterial</button>
          <button onClick={() => setActiveTab('quiz')} className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === 'quiz' ? 'bg-[#0D9488] text-white shadow-md' : 'text-[#64748B] hover:bg-[#F0FDFA]'}`}><PenLine className="w-4 h-4" /> Abschlusstest ({module.questions.length})</button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'learn' && activeStep ? (
            <GuidedLearning
              key={`${module.id}-guided`}
              module={module}
              topicSteps={topicSteps}
              allSteps={allSteps}
              activeStep={activeStep}
              activeTopic={activeTopic}
              activeLinearIndex={activeLinearIndex}
              completedSteps={completedSteps}
              unlockedThrough={unlockedThrough}
              checks={activeChecks}
              practiceAnswers={practiceAnswers}
              checkedPractice={checkedPractice}
              onPracticeAnswer={setPracticeAnswer}
              onCheckPractice={checkPractice}
              onComplete={completeCurrentStep}
              onGoToStep={goToStep}
              canComplete={canComplete}
            />
          ) : activeTab === 'quiz' ? (
            <QuizContent
              key="quiz"
              questions={module.questions}
              quizState={quizState}
              currentQuestionIndex={currentQuestionIndex}
              selectedAnswers={selectedAnswers}
              checkedQuestions={checkedQuestions}
              correctQuestions={correctQuestions}
              score={score}
              totalPoints={totalPoints}
              onSelectAnswer={handleSelectAnswer}
              onCheckAnswer={handleCheckAnswer}
              onNextQuestion={handleNextQuestion}
              onPrevQuestion={handlePrevQuestion}
              onRestartQuiz={handleRestartQuiz}
              onJumpToQuestion={handleJumpToQuestion}
              nextModule={nextModule}
              onOpenModule={onOpenModule}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface GuidedLearningProps {
  module: LearningModule;
  topicSteps: GuidedStep[][];
  allSteps: GuidedStep[];
  activeStep: GuidedStep;
  activeTopic: LearningTopic;
  activeLinearIndex: number;
  completedSteps: Set<string>;
  unlockedThrough: number;
  checks: QuickCheck[];
  practiceAnswers: Record<string, PracticeAnswer>;
  checkedPractice: Set<string>;
  onPracticeAnswer: (key: string, value: PracticeAnswer) => void;
  onCheckPractice: (key: string) => void;
  onComplete: () => void;
  onGoToStep: (index: number) => void;
  canComplete: boolean;
}

function GuidedLearning({ module, topicSteps, allSteps, activeStep, activeTopic, activeLinearIndex, completedSteps, unlockedThrough, checks, practiceAnswers, checkedPractice, onPracticeAnswer, onCheckPractice, onComplete, onGoToStep, canComplete }: GuidedLearningProps) {
  const topicStartIndex = topicSteps.slice(0, activeStep.topicIndex).reduce((sum, steps) => sum + steps.length, 0);
  const activeTopicSteps = topicSteps[activeStep.topicIndex] || [];
  const checkedCount = checks.filter(check => checkedPractice.has(check.key)).length;
  const optionalPrompts = activeStep.practiceItems.filter(item => !item.includes('|||')).slice(0, 1);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid lg:grid-cols-[290px_1fr] gap-6 items-start">
      <aside className="lg:sticky lg:top-24 space-y-4">
        <div className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-sm border border-white">
          <div className="text-xs uppercase tracking-[.16em] font-bold text-[#0D9488] mb-3">Themen</div>
          <div className="space-y-1.5 max-h-[65vh] overflow-y-auto pr-1">
            {module.topics.map((topic, topicIndex) => {
              const steps = topicSteps[topicIndex] || [];
              const start = topicSteps.slice(0, topicIndex).reduce((sum, entry) => sum + entry.length, 0);
              const unlocked = start <= unlockedThrough;
              const done = steps.length > 0 && steps.every(step => completedSteps.has(step.key));
              const current = topicIndex === activeStep.topicIndex;
              return (
                <button key={topic.id} disabled={!unlocked} onClick={() => onGoToStep(Math.min(start, unlockedThrough))} className={`w-full rounded-xl px-3 py-3 text-left transition-all border ${current ? 'bg-[#ECFDF5] border-[#5EEAD4] shadow-sm' : done ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-white border-transparent hover:bg-[#F8FAFC]'} disabled:opacity-45`}>
                  <div className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${done ? 'bg-[#DCFCE7] text-[#16A34A]' : current ? 'bg-[#0D9488] text-white' : 'bg-[#F1F5F9] text-[#64748B]'}`}>{done ? <Check className="w-4 h-4" /> : unlocked ? topicIndex + 1 : <LockKeyhole className="w-3.5 h-3.5" />}</div>
                    <div className="min-w-0"><div className="text-xs font-semibold text-[#1E293B] leading-5 line-clamp-2">{topic.title}</div><div className="text-[11px] text-[#94A3B8] mt-1">{Math.max(steps.length, 1)} Teile</div></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <main className="min-w-0">
        <div className="bg-white/85 backdrop-blur rounded-2xl p-4 sm:p-5 shadow-sm border border-white mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div><div className="text-xs font-bold uppercase tracking-[.14em] text-[#0D9488]">{activeTopic.title}</div><div className="text-sm text-[#64748B] mt-1">Teil {activeStep.stepIndex + 1} von {activeTopicSteps.length}</div></div>
            <div className="flex gap-1.5 flex-wrap">
              {activeTopicSteps.map((step, index) => {
                const linear = topicStartIndex + index;
                const done = completedSteps.has(step.key);
                const unlocked = linear <= unlockedThrough;
                const current = step.key === activeStep.key;
                return <button key={step.key} onClick={() => onGoToStep(linear)} disabled={!unlocked} title={step.title} className={`h-9 min-w-9 px-2.5 rounded-xl text-xs font-bold transition-all ${current ? 'bg-[#0D9488] text-white shadow-md scale-105' : done ? 'bg-[#DCFCE7] text-[#16A34A]' : unlocked ? 'bg-[#F1F5F9] text-[#64748B]' : 'bg-[#F8FAFC] text-[#CBD5E1]'}`}>{done ? <Check className="w-4 h-4 mx-auto" /> : unlocked ? index + 1 : <LockKeyhole className="w-3.5 h-3.5 mx-auto" />}</button>;
              })}
            </div>
          </div>
          <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-[#14B8A6] to-[#38BDF8] rounded-full" animate={{ width: `${((activeStep.stepIndex + 1) / Math.max(activeTopicSteps.length, 1)) * 100}%` }} /></div>
        </div>

        <AnimatePresence mode="wait">
          <motion.article key={activeStep.key} initial={{ opacity: 0, x: 24, scale: .985 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -20, scale: .985 }} transition={{ duration: .28 }} className="bg-white rounded-[28px] shadow-[0_18px_45px_rgba(15,23,42,0.07)] border border-white overflow-hidden">
            <div className="p-5 sm:p-8 border-b border-[#E2E8F0] bg-gradient-to-br from-white to-[#F0FDFA]"><div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#0F766E] mb-3"><BookOpen className="w-4 h-4" /> Lernteil</div><h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] leading-tight">{activeStep.title}</h2></div>
            <div className="p-5 sm:p-8">
              <TopicRenderer content={activeStep.blocks} />

              {checks.length > 0 && (
                <section className="mt-8 rounded-3xl overflow-hidden border-2 border-[#A7F3D0] bg-gradient-to-br from-[#ECFDF5] to-white">
                  <div className="p-5 sm:p-6 bg-[#D1FAE5]/70 border-b border-[#A7F3D0] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-[#047857] font-bold"><ListChecks className="w-5 h-5" /> Schnellcheck</div>
                    <div className="px-3 py-1.5 rounded-full bg-white text-xs font-bold text-[#047857] shadow-sm">{checkedCount}/{checks.length}</div>
                  </div>
                  <div className="p-5 sm:p-6 space-y-5">
                    {checks.map((check, index) => (
                      <QuickCheckCard key={check.key} check={check} index={index} answer={practiceAnswers[check.key]} checked={checkedPractice.has(check.key)} onAnswer={value => onPracticeAnswer(check.key, value)} onCheck={() => onCheckPractice(check.key)} />
                    ))}
                  </div>
                </section>
              )}

              {optionalPrompts.length > 0 && (
                <details className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-600">Praxis-Challenge (optional)</summary>
                  <div className="mt-3 text-sm text-slate-600 leading-6">{optionalPrompts[0]}</div>
                </details>
              )}

              {activeLinearIndex === allSteps.length - 1 && <MiniCrossword module={module} />}

              <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#E2E8F0] pt-6">
                <button onClick={() => onGoToStep(activeLinearIndex - 1)} disabled={activeLinearIndex === 0} className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#CBD5E1] text-sm font-semibold text-[#64748B] disabled:opacity-35 hover:bg-[#F8FAFC]"><ChevronLeft className="w-4 h-4" /> Zurück</button>
                <button onClick={onComplete} disabled={!canComplete} className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#0D9488] to-[#0284C7] text-white text-sm font-bold shadow-lg shadow-[#0D9488]/15 disabled:opacity-40 disabled:shadow-none hover:-translate-y-0.5 transition-all">{activeLinearIndex === allSteps.length - 1 ? 'Zum Abschlusstest' : 'Weiter'}<ArrowRight className="w-4 h-4" /></button>
              </div>
              {!canComplete && checks.length > 0 && <div className="mt-3 text-right text-xs text-[#047857]">Erst beide Antworten prüfen.</div>}
            </div>
          </motion.article>
        </AnimatePresence>
      </main>
    </motion.div>
  );
}

function QuickCheckCard({ check, index, answer, checked, onAnswer, onCheck }: { check: QuickCheck; index: number; answer?: PracticeAnswer; checked: boolean; onAnswer: (value: PracticeAnswer) => void; onCheck: () => void }) {
  const correct = checked ? isCorrectAnswer(check, answer) : false;
  const hasAnswer = answer !== undefined && (typeof answer === 'string' ? answer.trim().length > 0 : answer.length > 0);

  return (
    <motion.div className="rounded-2xl bg-white border border-[#A7F3D0] p-4 sm:p-5 shadow-sm" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .04 }}>
      <div className="flex gap-3 items-start mb-4"><div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${checked ? correct ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEE2E2] text-[#DC2626]' : 'bg-[#D1FAE5] text-[#047857]'}`}>{checked ? correct ? <Check className="w-4 h-4" /> : <XCircle className="w-4 h-4" /> : index + 1}</div><p className="text-sm sm:text-[15px] font-semibold text-[#334155] leading-6">{check.question}</p></div>

      {check.type === 'single' && check.options && <div className="grid gap-2.5">{check.options.map(option => {
        const selected = answer === option.id;
        const good = Boolean(option.correct);
        return <button key={option.id} disabled={checked} onClick={() => onAnswer(option.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left text-sm transition-all ${checked && good ? 'border-emerald-400 bg-emerald-50' : checked && selected && !good ? 'border-rose-400 bg-rose-50' : selected ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-teal-300'}`}><span className={`w-5 h-5 rounded-full border-2 shrink-0 ${selected ? 'border-teal-600 bg-teal-600' : 'border-slate-300'}`} /><span>{option.text}</span>{checked && good && <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto" />}</button>;
      })}</div>}

      {check.type === 'multiple' && check.options && <div className="grid gap-2.5">{check.options.map(option => {
        const selected = ((answer as string[]) || []).includes(option.id);
        const good = Boolean(option.correct);
        return <button key={option.id} disabled={checked} onClick={() => {
          const current = (answer as string[]) || [];
          onAnswer(selected ? current.filter(id => id !== option.id) : [...current, option.id]);
        }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left text-sm transition-all ${checked && good ? 'border-emerald-400 bg-emerald-50' : checked && selected && !good ? 'border-rose-400 bg-rose-50' : selected ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-teal-300'}`}><span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${selected ? 'border-teal-600 bg-teal-600' : 'border-slate-300'}`}>{selected && <Check className="w-3 h-3 text-white" />}</span><span>{option.text}</span></button>;
      })}</div>}

      {!checked ? <div className="mt-4 flex justify-end"><button onClick={onCheck} disabled={!hasAnswer} className="px-4 py-2.5 rounded-xl bg-[#047857] text-white text-sm font-bold disabled:opacity-40">Prüfen</button></div> : <div className={`mt-4 rounded-xl p-4 ${correct ? 'bg-emerald-50' : 'bg-amber-50'}`}><div className="text-sm font-bold text-slate-800">{correct ? 'Richtig' : 'Noch nicht richtig'}</div><div className="text-sm text-slate-600 mt-1"><strong>Richtige Lösung:</strong> {correctAnswerText(check)}</div><div className="text-xs text-slate-500 leading-5 mt-2">{check.explanation}</div></div>}
    </motion.div>
  );
}

function TopicRenderer({ content }: { content: LearningTopic['content'] }) {
  return <div className="space-y-5">{content.map((block, index) => {
    switch (block.type) {
      case 'heading': return <h4 key={index} className="font-bold text-[#0F172A] text-lg sm:text-xl mt-7 first:mt-0">{block.title}</h4>;
      case 'text': return <p key={index} className="text-[15px] sm:text-base text-[#475569] leading-7 sm:leading-8">{block.text}</p>;
      case 'info': return <div key={index} className="bg-gradient-to-br from-[#E0F2FE] to-[#F0FDFA] border border-[#BAE6FD] rounded-2xl p-4 sm:p-5 shadow-sm"><div className="font-bold text-[#0369A1] text-sm mb-1.5">{block.title}</div><div className="text-sm text-[#475569] leading-6">{block.text}</div></div>;
      case 'warning': return <div key={index} className="bg-gradient-to-br from-[#FEF3C7] to-[#FFF7ED] border border-[#FDE68A] rounded-2xl p-4 sm:p-5"><div className="font-bold text-[#B45309] text-sm mb-1.5">{block.title}</div><div className="text-sm text-[#475569] leading-6">{block.text}</div></div>;
      case 'table': return <div key={index} className="overflow-x-auto rounded-2xl border border-[#E2E8F0] shadow-sm"><table className="w-full text-sm"><thead><tr className="bg-gradient-to-r from-[#CCFBF1] to-[#E0F2FE]">{block.headers?.map((header, i) => <th key={i} className="text-left px-4 py-3.5 font-bold text-[#0F766E] text-xs sm:text-sm">{header}</th>)}</tr></thead><tbody>{block.rows?.map((row, rowIndex) => <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3.5 text-[#475569] text-xs sm:text-sm align-top leading-5 sm:leading-6">{cell}</td>)}</tr>)}</tbody></table></div>;
      case 'list': return <ul key={index} className="grid gap-2.5">{block.items?.map((item, i) => <li key={i} className="flex items-start gap-3 text-sm sm:text-[15px] text-[#475569] leading-6 bg-[#F8FAFC] rounded-xl px-3.5 py-3"><span className="w-6 h-6 rounded-lg bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span><span>{item.split('|||')[0]}</span></li>)}</ul>;
      case 'definition': return <div key={index} className="bg-[#F0FDFA] border border-[#99F6E4] rounded-2xl p-4 sm:p-5"><span className="font-bold text-[#0F766E] text-sm">{block.term}: </span><span className="text-sm text-[#475569] leading-6">{block.definition}</span></div>;
      case 'image': return <motion.figure key={index} className="bg-gradient-to-br from-[#F8FAFC] to-white rounded-3xl border border-[#E2E8F0] p-3 sm:p-4 shadow-sm overflow-hidden" initial={{ opacity: 0, scale: .98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-80px' }}><img src={block.src} alt={block.alt || block.title || 'Lernabbildung'} className="w-full max-h-[620px] object-contain rounded-2xl" loading="lazy" />{block.caption && <figcaption className="text-xs sm:text-sm text-[#64748B] mt-3 text-center leading-5 px-2">{block.caption}</figcaption>}</motion.figure>;
      case 'video': return <motion.div key={index} className="rounded-3xl border border-[#BAE6FD] bg-gradient-to-br from-[#F0F9FF] to-white overflow-hidden shadow-sm" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}><div className="p-4 sm:p-5 flex gap-3 items-start"><div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0D9488] to-[#0284C7] text-white flex items-center justify-center shrink-0 shadow-md"><PlayCircle className="w-6 h-6" /></div><div className="min-w-0 flex-1"><div className="font-bold text-[#1A1D2B]">{block.title || 'Lernvideo'}</div><div className="text-xs text-[#64748B] mt-1">{[block.source, block.duration].filter(Boolean).join(' • ')}</div>{block.caption && <p className="text-sm text-[#475569] mt-2 leading-6">{block.caption}</p>}</div></div>{block.embedUrl && <div className="aspect-video bg-black"><iframe src={block.embedUrl} title={block.title || 'Lernvideo'} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" /></div>}{block.url && <a href={block.url} target="_blank" rel="noreferrer" className="m-4 sm:m-5 mt-3 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#7DD3FC] text-[#0369A1] text-sm font-semibold hover:bg-[#E0F2FE] transition-all shadow-sm">Video öffnen <ExternalLink className="w-4 h-4" /></a>}</motion.div>;
      default: return null;
    }
  })}</div>;
}

interface QuizContentProps {
  questions: QuizQuestion[];
  quizState: QuizState;
  currentQuestionIndex: number;
  selectedAnswers: Record<number, string | string[]>;
  checkedQuestions: Set<number>;
  correctQuestions: Set<number>;
  score: number;
  totalPoints: number;
  onSelectAnswer: (id: number, answer: string | string[]) => void;
  onCheckAnswer: () => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onRestartQuiz: () => void;
  onJumpToQuestion: (index: number) => void;
  nextModule: LearningModule | undefined;
  onOpenModule: (id: string) => void;
}

function QuizContent(props: QuizContentProps) {
  const { questions, quizState, currentQuestionIndex, selectedAnswers, checkedQuestions, correctQuestions, score, totalPoints, onSelectAnswer, onCheckAnswer, onNextQuestion, onPrevQuestion, onRestartQuiz, onJumpToQuestion, nextModule, onOpenModule } = props;
  if (!questions.length) return <div className="bg-white rounded-3xl p-8 shadow-sm text-center text-[#64748B]">Keine Abschlussfragen vorhanden.</div>;

  if (quizState === 'results') {
    const percentage = totalPoints ? Math.round((score / totalPoints) * 100) : 0;
    const grade = getGrade(percentage);
    return <motion.div className="max-w-[680px] mx-auto" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}><div className="bg-white rounded-[28px] p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] text-center"><div className="w-28 h-28 rounded-full mx-auto mb-4 flex flex-col items-center justify-center text-white shadow-xl" style={{ background: 'linear-gradient(135deg, #0D9488, #38BDF8)' }}><Trophy className="w-8 h-8 mb-1" /><span className="text-2xl font-bold">{percentage}%</span></div><h2 className="text-xl font-bold text-[#1A1D2B]">{score} von {totalPoints} Punkten</h2><div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mt-3 mb-5 ${grade.color}`}>Note {grade.grade} – {grade.label}</div><div className="grid grid-cols-6 sm:grid-cols-10 gap-2 mb-6">{questions.map((question, i) => <div key={question.id} className={`h-9 rounded-lg flex items-center justify-center text-xs font-semibold ${correctQuestions.has(question.id) ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEE2E2] text-[#DC2626]'}`}>{correctQuestions.has(question.id) ? <Check className="w-4 h-4" /> : i + 1}</div>)}</div><div className="flex flex-col sm:flex-row gap-3 justify-center"><button onClick={onRestartQuiz} className="flex items-center justify-center gap-2 px-5 py-3 border-2 border-[#0D9488] text-[#0D9488] rounded-xl font-medium"><RotateCcw className="w-4 h-4" /> Noch einmal</button>{nextModule && <button onClick={() => onOpenModule(nextModule.id)} className="flex items-center justify-center gap-2 px-5 py-3 bg-[#0D9488] text-white rounded-xl font-medium">Nächstes Lernfeld <ArrowRight className="w-4 h-4" /></button>}</div></div></motion.div>;
  }

  const question = questions[currentQuestionIndex];
  const answer = selectedAnswers[question.id];
  const revealed = quizState === 'revealed';
  const hasAnswer = answer !== undefined && (typeof answer === 'string' ? answer.trim().length > 0 : answer.length > 0);

  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><div className="bg-white rounded-2xl p-4 shadow-sm mb-4 flex items-center gap-2 flex-wrap border border-white">{questions.map((item, i) => {
    const status = correctQuestions.has(item.id) ? 'correct' : checkedQuestions.has(item.id) ? 'incorrect' : 'open';
    return <button key={item.id} onClick={() => onJumpToQuestion(i)} className={`w-8 h-8 rounded-lg text-xs font-semibold ${i === currentQuestionIndex ? 'ring-2 ring-[#0D9488] ring-offset-1' : ''} ${status === 'correct' ? 'bg-[#DCFCE7] text-[#16A34A]' : status === 'incorrect' ? 'bg-[#FEE2E2] text-[#DC2626]' : 'bg-[#F4F7F9] text-[#5A6270]'}`}>{i + 1}</button>;
  })}<span className="ml-auto text-sm font-medium text-[#5A6270]">{score}/{totalPoints}</span></div>

    <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.07)]"><div className="text-xs font-bold text-[#0D9488] uppercase tracking-[.14em] mb-2">Frage {currentQuestionIndex + 1} von {questions.length} • {question.points} Punkte</div><h3 className="text-lg font-bold text-[#1A1D2B] mb-5 leading-7">{question.question}</h3>

      {question.type === 'single' && question.options && <div className="space-y-2.5 mb-6">{question.options.map(option => {
        const selected = answer === option.id;
        const good = Boolean(option.correct);
        return <button key={option.id} disabled={revealed} onClick={() => onSelectAnswer(question.id, option.id)} className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${revealed && good ? 'border-[#16A34A] bg-[#DCFCE7]' : revealed && selected && !good ? 'border-[#DC2626] bg-[#FEE2E2]' : selected ? 'border-[#0D9488] bg-[#CCFBF1]' : 'border-[#E2E8F0] bg-white'} ${!revealed ? 'hover:border-[#0D9488] hover:bg-[#F0FDFA]' : ''}`}><span className={`w-5 h-5 rounded-full border-2 shrink-0 ${selected ? 'border-[#0D9488] bg-[#0D9488]' : 'border-[#CBD5E1]'}`} /><span className="text-sm text-[#1A1D2B]">{option.text}</span>{revealed && good && <CheckCircle2 className="w-5 h-5 text-[#16A34A] ml-auto" />}{revealed && selected && !good && <XCircle className="w-5 h-5 text-[#DC2626] ml-auto" />}</button>;
      })}</div>}

      {question.type === 'multiple' && question.options && <div className="space-y-2.5 mb-6">{question.options.map(option => {
        const selected = ((answer as string[]) || []).includes(option.id);
        const good = Boolean(option.correct);
        return <button key={option.id} disabled={revealed} onClick={() => { const current = (selectedAnswers[question.id] as string[]) || []; onSelectAnswer(question.id, selected ? current.filter(id => id !== option.id) : [...current, option.id]); }} className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${revealed && good ? 'border-[#16A34A] bg-[#DCFCE7]' : revealed && selected && !good ? 'border-[#DC2626] bg-[#FEE2E2]' : selected ? 'border-[#0D9488] bg-[#CCFBF1]' : 'border-[#E2E8F0]'}`}><span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${selected ? 'border-[#0D9488] bg-[#0D9488]' : 'border-[#CBD5E1]'}`}>{selected && <Check className="w-3 h-3 text-white" />}</span><span className="text-sm">{option.text}</span></button>;
      })}</div>}

      {(question.type === 'text' || question.type === 'matching') && <textarea value={(answer as string) || ''} disabled={revealed} onChange={event => onSelectAnswer(question.id, event.target.value)} rows={4} className="w-full mb-6 rounded-xl border-2 border-[#E2E8F0] p-4 text-sm focus:outline-none focus:border-[#0D9488]" placeholder="Kurze Antwort …" />}

      {revealed && <div className={`rounded-xl p-4 mb-5 ${correctQuestions.has(question.id) ? 'bg-[#DCFCE7]' : 'bg-[#FFF7ED]'}`}><div className="font-semibold text-sm text-[#1A1D2B] mb-1">{correctQuestions.has(question.id) ? 'Richtig' : 'Nicht richtig'}</div><p className="text-sm text-[#475569] leading-6"><strong>Richtige Lösung:</strong> {correctAnswerText(question)}</p><p className="text-xs text-[#64748B] leading-5 mt-2 flex gap-1.5"><Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5" /> {question.explanation}</p></div>}

      <div className="flex items-center justify-between gap-3"><button onClick={onPrevQuestion} disabled={currentQuestionIndex === 0} className="px-4 py-2.5 rounded-xl text-sm border border-[#E2E8F0] disabled:opacity-40">Zurück</button>{!revealed ? <button onClick={onCheckAnswer} disabled={!hasAnswer} className="px-5 py-2.5 rounded-xl bg-[#0D9488] text-white text-sm font-semibold disabled:opacity-40">Prüfen</button> : <button onClick={onNextQuestion} className="px-5 py-2.5 rounded-xl bg-[#0D9488] text-white text-sm font-semibold">{currentQuestionIndex === questions.length - 1 ? 'Ergebnis' : 'Weiter'}</button>}</div>
    </div>
  </motion.div>;
}
