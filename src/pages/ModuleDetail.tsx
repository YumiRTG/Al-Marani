import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  PenLine,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Trophy,
  RotateCcw,
  ArrowRight,
  Check,
} from 'lucide-react';
import type { LearningModule, LearningTopic, QuizQuestion } from '@/types';

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

const difficultyMap: Record<string, { label: string; color: string; bg: string }> = {
  easy: { label: 'Einfach', color: 'text-[#16A34A]', bg: 'bg-[#DCFCE7]' },
  medium: { label: 'Mittel', color: 'text-[#D97706]', bg: 'bg-[#FEF3C7]' },
  advanced: { label: 'Fortgeschritten', color: 'text-[#DC2626]', bg: 'bg-[#FEE2E2]' },
};

function getGrade(percentage: number) {
  if (percentage >= 91) return { grade: 1, label: 'Sehr gut', color: 'bg-[#DCFCE7] text-[#16A34A]' };
  if (percentage >= 81) return { grade: 2, label: 'Gut', color: 'bg-[#CCFBF1] text-[#0F766E]' };
  if (percentage >= 67) return { grade: 3, label: 'Befriedigend', color: 'bg-[#E0F2FE] text-[#0369A1]' };
  if (percentage >= 50) return { grade: 4, label: 'Ausreichend', color: 'bg-[#FEF3C7] text-[#D97706]' };
  return { grade: 5, label: 'Mangelhaft', color: 'bg-[#FEE2E2] text-[#DC2626]' };
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
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set([module.topics[0]?.id || '']));
  const [quizState, setQuizState] = useState<QuizState>('answering');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | string[]>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Set<number>>(new Set());
  const [correctQuestions, setCorrectQuestions] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);

  const currentQuestion = module.questions[currentQuestionIndex];
  const totalPoints = module.questions.reduce((sum: number, q: QuizQuestion) => sum + q.points, 0);

  const toggleTopic = useCallback((topicId: string) => {
    setExpandedTopics(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  }, []);

  const handleSelectAnswer = useCallback((questionId: number, answer: string | string[]) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  }, []);

  const handleCheckAnswer = useCallback(() => {
    const q = currentQuestion;
    const answer = selectedAnswers[q.id];
    if (!answer) return;

    let isCorrect = false;
    if (q.type === 'single' && q.options) {
      const correctOption = q.options.find((o: { correct?: boolean }) => o.correct);
      isCorrect = answer === correctOption?.id;
    } else if (q.type === 'multiple' && q.options) {
      const correctIds = q.options.filter((o: { correct?: boolean }) => o.correct).map((o: { id: string }) => o.id).sort();
      const selectedIds = (answer as string[]).sort();
      isCorrect = JSON.stringify(correctIds) === JSON.stringify(selectedIds);
    } else if (q.type === 'text' && q.correctAnswer) {
      const answerStr = answer as string;
      const userText = answerStr.toLowerCase().trim();
      const correctStr = q.correctAnswer as string;
      const keywords = correctStr.toLowerCase().split(',');
      isCorrect = keywords.some((k: string) => userText.includes(k.trim()));
    }

    setCheckedQuestions(prev => new Set(prev).add(q.id));
    if (isCorrect) {
      setCorrectQuestions(prev => new Set(prev).add(q.id));
      setScore(prev => prev + q.points);
    }
    setQuizState('revealed');
  }, [currentQuestion, selectedAnswers]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < module.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuizState('answering');
    } else {
      setQuizState('results');
      const newProgress = Math.min(100, Math.round((checkedQuestions.size / module.questions.length) * 100));
      onUpdateProgress(module.id, newProgress);
    }
  }, [currentQuestionIndex, module.questions.length, module.id, checkedQuestions.size, onUpdateProgress]);

  const handlePrevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      setQuizState(checkedQuestions.has(module.questions[newIndex].id) ? 'revealed' : 'answering');
    }
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

  const nextModule = allModules.find((m: LearningModule) => m.number === module.number + 1);

  return (
    <div className="min-h-screen bg-[#F4F7F9]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F4F7F9]/90 backdrop-blur-lg border-b border-[#E2E8F0]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-[#CCFBF1] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#0D9488]" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#5A6270]">Dashboard</span>
            <ChevronRight className="w-4 h-4 text-[#5A6270]" />
            <span className="text-sm font-semibold text-[#1A1D2B]">Lernfeld {module.number}</span>
          </div>
        </div>
      </header>

      <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-6">
        {/* Module Hero */}
        <motion.div
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
            <img
              src={module.heroImage}
              alt={module.title}
              className="w-full sm:w-48 h-32 object-cover rounded-xl"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-[#1A1D2B]">{module.title}</h1>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${difficultyMap[module.difficulty].bg} ${difficultyMap[module.difficulty].color}`}>
                  {difficultyMap[module.difficulty].label}
                </span>
              </div>
              <p className="text-sm text-[#5A6270] mb-4">{module.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#5A6270]">Fortschritt:</span>
                <div className="flex-1 max-w-[200px] h-2 bg-[#E0F2FE] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, #0D9488, #38BDF8)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${currentProgress}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <span className="text-xs font-semibold text-[#1A1D2B]">{Math.round(currentProgress)}%</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4 p-1 bg-[#F4F7F9] rounded-xl w-fit">
            <button
              onClick={() => setActiveTab('learn')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'learn'
                  ? 'bg-[#0D9488] text-white shadow-sm'
                  : 'text-[#5A6270] hover:text-[#1A1D2B]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Lernmaterial
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'quiz'
                  ? 'bg-[#0D9488] text-white shadow-sm'
                  : 'text-[#5A6270] hover:text-[#1A1D2B]'
              }`}
            >
              <PenLine className="w-4 h-4" />
              Übungen ({module.questions.length})
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'learn' ? (
            <LearningContent
              key="learn"
              topics={module.topics}
              expandedTopics={expandedTopics}
              onToggleTopic={toggleTopic}
            />
          ) : (
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
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Learning Content ─── */
function LearningContent({
  topics,
  expandedTopics,
  onToggleTopic,
}: {
  topics: LearningTopic[];
  expandedTopics: Set<string>;
  onToggleTopic: (id: string) => void;
}) {
  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {topics.map((topic, i) => {
        const isExpanded = expandedTopics.has(topic.id);
        return (
          <motion.div
            key={topic.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <button
              className="w-full flex items-center justify-between p-5 text-left hover:bg-[#F0F5F3] transition-colors"
              onClick={() => onToggleTopic(topic.id)}
            >
              <h3 className="font-semibold text-[#1A1D2B]">{topic.title}</h3>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-[#5A6270]" />
              </motion.div>
            </button>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 border-l-4 border-[#0D9488] ml-5">
                    <TopicRenderer content={topic.content} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function TopicRenderer({ content }: { content: LearningTopic['content'] }) {
  return (
    <div className="space-y-4">
      {content.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return <h4 key={i} className="font-semibold text-[#1A1D2B] text-base mt-4">{block.title}</h4>;
          case 'text':
            return <p key={i} className="text-sm text-[#5A6270] leading-relaxed">{block.text}</p>;
          case 'info':
            return (
              <div key={i} className="bg-[#E0F2FE] border-l-4 border-[#38BDF8] rounded-lg p-4">
                <div className="font-semibold text-[#0369A1] text-sm mb-1">{block.title}</div>
                <div className="text-sm text-[#5A6270]">{block.text}</div>
              </div>
            );
          case 'warning':
            return (
              <div key={i} className="bg-[#FEF3C7] border-l-4 border-[#D97706] rounded-lg p-4">
                <div className="font-semibold text-[#D97706] text-sm mb-1">{block.title}</div>
                <div className="text-sm text-[#5A6270]">{block.text}</div>
              </div>
            );
          case 'table':
            return (
              <div key={i} className="overflow-x-auto">
                <table className="w-full text-sm border border-[#E2E8F0] rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#CCFBF1]">
                      {block.headers?.map((h, j) => (
                        <th key={j} className="text-left px-3 py-2 font-semibold text-[#0F766E] text-xs">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows?.map((row, j) => (
                      <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>
                        {row.map((cell, k) => (
                          <td key={k} className="px-3 py-2 text-[#5A6270] text-xs">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'list':
            return (
              <ul key={i} className="space-y-2">
                {block.items?.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-[#5A6270]">
                    <span className="w-2 h-2 rounded-full bg-[#0D9488] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case 'definition':
            return (
              <div key={i} className="bg-[#F0F5F3] rounded-lg p-4">
                <span className="font-semibold text-[#1A1D2B] text-sm">{block.term}: </span>
                <span className="text-sm text-[#5A6270]">{block.definition}</span>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/* ─── Quiz Content ─── */
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

function QuizContent({
  questions,
  quizState,
  currentQuestionIndex,
  selectedAnswers,
  checkedQuestions,
  correctQuestions,
  score,
  totalPoints,
  onSelectAnswer,
  onCheckAnswer,
  onNextQuestion,
  onPrevQuestion,
  onRestartQuiz,
  onJumpToQuestion,
  nextModule,
  onOpenModule,
}: QuizContentProps) {
  if (quizState === 'results') {
    const percentage = Math.round((score / totalPoints) * 100);
    const grade = getGrade(percentage);

    return (
      <motion.div
        className="max-w-[600px] mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          {/* Score Circle */}
          <div className="w-28 h-28 rounded-full mx-auto mb-4 flex flex-col items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0D9488, #38BDF8)', boxShadow: '0 4px 20px rgba(13,148,136,0.25)' }}
          >
            <Trophy className="w-8 h-8 text-white mb-1" />
            <span className="text-2xl font-bold text-white font-mono">{percentage}%</span>
          </div>

          <h2 className="text-xl font-bold text-[#1A1D2B] mb-1">
            {score} von {totalPoints} Punkten
          </h2>
          <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mt-2 mb-4 ${grade.color}`}>
            Note {grade.grade} – {grade.label}
          </div>

          <p className="text-sm text-[#5A6270] mb-6">
            {percentage >= 80
              ? 'Hervorragend! Du hast das Lernfeld sehr gut beherrscht!'
              : percentage >= 60
              ? 'Gut gemacht! Mit etwas mehr Übung wirst du noch besser.'
              : 'Nicht aufgeben! Lies dir das Lernmaterial noch einmal durch und versuche es erneut.'}
          </p>

          {/* Question Review */}
          <div className="text-left mb-6">
            <h3 className="text-sm font-semibold text-[#1A1D2B] mb-3">Fragenübersicht:</h3>
            <div className="grid grid-cols-6 gap-2">
              {questions.map((q, i) => {
                const isCorrect = correctQuestions.has(q.id);
                const isChecked = checkedQuestions.has(q.id);
                return (
                  <div
                    key={q.id}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-semibold ${
                      isCorrect ? 'bg-[#DCFCE7] text-[#16A34A]' : isChecked ? 'bg-[#FEE2E2] text-[#DC2626]' : 'bg-[#F4F7F9] text-[#5A6270]'
                    }`}
                  >
                    {isCorrect ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onRestartQuiz}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#0D9488] text-[#0D9488] rounded-xl font-medium hover:bg-[#CCFBF1] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Noch einmal versuchen
            </button>
            {nextModule && (
              <button
                onClick={() => onOpenModule(nextModule.id)}
                className="flex items-center justify-center gap-2 px-6 py-3 text-white rounded-xl font-medium transition-all hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #0D9488, #38BDF8)' }}
              >
                Nächstes Lernfeld
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  const q = questions[currentQuestionIndex];
  const hasAnswer = selectedAnswers[q.id] !== undefined &&
    (typeof selectedAnswers[q.id] === 'string' ? (selectedAnswers[q.id] as string).length > 0 : (selectedAnswers[q.id] as string[]).length > 0);
  const isRevealed = quizState === 'revealed';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Progress Dots */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4 flex items-center gap-3 flex-wrap">
        {questions.map((question, i) => {
          const status = correctQuestions.has(question.id) ? 'correct' : checkedQuestions.has(question.id) ? 'incorrect' : 'unanswered';
          return (
            <button
              key={question.id}
              onClick={() => onJumpToQuestion(i)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                i === currentQuestionIndex
                  ? 'ring-2 ring-[#0D9488] ring-offset-1'
                  : ''
              } ${
                status === 'correct' ? 'bg-[#DCFCE7] text-[#16A34A]' :
                status === 'incorrect' ? 'bg-[#FEE2E2] text-[#DC2626]' :
                'bg-[#F4F7F9] text-[#5A6270]'
              }`}
            >
              {i + 1}
            </button>
          );
        })}
        <div className="ml-auto text-sm font-medium text-[#5A6270]">
          {score} / {totalPoints} Pkte
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          className="bg-white rounded-2xl p-6 shadow-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <div className="text-xs font-medium text-[#0D9488] uppercase tracking-wider mb-2">
            Frage {currentQuestionIndex + 1} von {questions.length} ({q.points} Punkte)
          </div>
          <h3 className="text-base font-semibold text-[#1A1D2B] mb-5">{q.question}</h3>

          {/* Single Choice */}
          {q.type === 'single' && q.options && (
            <div className="space-y-2.5 mb-6">
              {q.options.map(opt => {
                const sel = selectedAnswers[q.id] as string;
                const isSelected = sel === opt.id;
                const isCorrectOption = opt.correct;
                let borderColor = 'border-[#E2E8F0]';
                let bgColor = 'bg-white';

                if (isRevealed) {
                  if (isCorrectOption) {
                    borderColor = 'border-[#16A34A]';
                    bgColor = 'bg-[#DCFCE7]';
                  } else if (isSelected && !isCorrectOption) {
                    borderColor = 'border-[#DC2626]';
                    bgColor = 'bg-[#FEE2E2]';
                  }
                } else if (isSelected) {
                  borderColor = 'border-[#0D9488]';
                  bgColor = 'bg-[#CCFBF1]';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => !isRevealed && onSelectAnswer(q.id, opt.id)}
                    disabled={isRevealed}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 ${borderColor} ${bgColor} transition-all ${
                      !isRevealed ? 'hover:border-[#0D9488] cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? (isRevealed && !isCorrectOption ? 'border-[#DC2626] bg-[#DC2626]' : 'border-[#0D9488] bg-[#0D9488]') : 'border-[#E2E8F0]'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm text-[#1A1D2B]">{opt.text}</span>
                    {isRevealed && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-[#16A34A] ml-auto shrink-0" />}
                    {isRevealed && isSelected && !isCorrectOption && <XCircle className="w-5 h-5 text-[#DC2626] ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Multiple Choice */}
          {q.type === 'multiple' && q.options && (
            <div className="space-y-2.5 mb-6">
              {q.options.map(opt => {
                const selected = (selectedAnswers[q.id] as string[]) || [];
                const isSelected = selected.includes(opt.id);
                const isCorrectOption = opt.correct;
                let borderColor = 'border-[#E2E8F0]';
                let bgColor = 'bg-white';

                if (isRevealed) {
                  if (isCorrectOption) {
                    borderColor = 'border-[#16A34A]';
                    bgColor = 'bg-[#DCFCE7]';
                  } else if (isSelected && !isCorrectOption) {
                    borderColor = 'border-[#DC2626]';
                    bgColor = 'bg-[#FEE2E2]';
                  }
                } else if (isSelected) {
                  borderColor = 'border-[#0D9488]';
                  bgColor = 'bg-[#CCFBF1]';
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      if (isRevealed) return;
                      const current = ((selectedAnswers[q.id] as string[]) || []);
                      const next = current.includes(opt.id)
                        ? current.filter(id => id !== opt.id)
                        : [...current, opt.id];
                      onSelectAnswer(q.id, next);
                    }}
                    disabled={isRevealed}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 ${borderColor} ${bgColor} transition-all ${
                      !isRevealed ? 'hover:border-[#0D9488] cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? (isRevealed && !isCorrectOption ? 'border-[#DC2626] bg-[#DC2626]' : 'border-[#0D9488] bg-[#0D9488]') : 'border-[#E2E8F0]'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm text-[#1A1D2B]">{opt.text}</span>
                    {isRevealed && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-[#16A34A] ml-auto shrink-0" />}
                    {isRevealed && isSelected && !isCorrectOption && <XCircle className="w-5 h-5 text-[#DC2626] ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Text Input */}
          {q.type === 'text' && (
            <div className="mb-6">
              <textarea
                value={(selectedAnswers[q.id] as string) || ''}
                onChange={e => !isRevealed && onSelectAnswer(q.id, e.target.value)}
                disabled={isRevealed}
                placeholder="Gib deine Antwort hier ein..."
                className="w-full p-4 bg-[#F4F7F9] border-2 border-[#E2E8F0] rounded-xl text-sm text-[#1A1D2B] focus:border-[#0D9488] focus:outline-none resize-none disabled:opacity-60"
                rows={4}
              />
            </div>
          )}

          {/* Explanation */}
          {isRevealed && (
            <motion.div
              className="bg-[#E0F2FE] rounded-xl p-4 mb-6 flex items-start gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Lightbulb className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-[#0369A1] text-sm mb-1">Erklärung</div>
                <div className="text-sm text-[#5A6270]">{q.explanation}</div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={onPrevQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-5 py-2.5 text-sm font-medium text-[#5A6270] hover:text-[#1A1D2B] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Zurück
            </button>

            {!isRevealed ? (
              <button
                onClick={onCheckAnswer}
                disabled={!hasAnswer}
                className="px-6 py-2.5 bg-[#0D9488] text-white text-sm font-medium rounded-xl hover:bg-[#0F766E] disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-[1.02]"
              >
                Antwort prüfen
              </button>
            ) : (
              <button
                onClick={onNextQuestion}
                className="px-6 py-2.5 text-white text-sm font-medium rounded-xl hover:scale-[1.02] transition-all"
                style={{ background: 'linear-gradient(135deg, #0D9488, #38BDF8)' }}
              >
                {currentQuestionIndex < questions.length - 1 ? 'Weiter' : 'Ergebnis anzeigen'}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
