import { useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  PenLine,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ArrowRight,
  Check,
  ExternalLink,
  PlayCircle,
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
  const totalPoints = useMemo(() => module.questions.reduce((sum, q) => sum + q.points, 0), [module.questions]);

  const toggleTopic = useCallback((topicId: string) => {
    setExpandedTopics(prev => {
      const next = new Set(prev);
      next.has(topicId) ? next.delete(topicId) : next.add(topicId);
      return next;
    });
  }, []);

  const handleSelectAnswer = useCallback((questionId: number, answer: string | string[]) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  }, []);

  const handleCheckAnswer = useCallback(() => {
    const q = currentQuestion;
    const answer = selectedAnswers[q.id];
    if (answer === undefined || answer === '') return;

    let isCorrect = false;
    if (q.type === 'single' && q.options) {
      isCorrect = answer === q.options.find(o => o.correct)?.id;
    } else if (q.type === 'multiple' && q.options) {
      const correctIds = q.options.filter(o => o.correct).map(o => o.id).sort();
      const selectedIds = [...(answer as string[])].sort();
      isCorrect = JSON.stringify(correctIds) === JSON.stringify(selectedIds);
    } else if (q.type === 'text' && q.correctAnswer) {
      const userText = (answer as string).toLowerCase().trim();
      const keywords = (q.correctAnswer as string).toLowerCase().split(',').map(k => k.trim());
      isCorrect = keywords.some(k => userText.includes(k));
    }

    setCheckedQuestions(prev => new Set(prev).add(q.id));
    if (isCorrect && !correctQuestions.has(q.id)) {
      setCorrectQuestions(prev => new Set(prev).add(q.id));
      setScore(prev => prev + q.points);
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
    const newIndex = currentQuestionIndex - 1;
    setCurrentQuestionIndex(newIndex);
    setQuizState(checkedQuestions.has(module.questions[newIndex].id) ? 'revealed' : 'answering');
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

  const nextModule = allModules.find(m => m.number === module.number + 1);

  return (
    <div className="min-h-screen bg-[#F4F7F9]">
      <header className="sticky top-0 z-50 bg-[#F4F7F9]/90 backdrop-blur-lg border-b border-[#E2E8F0]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <button onClick={onBack} className="p-2 rounded-lg hover:bg-[#CCFBF1] transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#0D9488]" />
          </button>
          <span className="text-sm text-[#5A6270]">Dashboard</span>
          <ChevronRight className="w-4 h-4 text-[#5A6270]" />
          <span className="text-sm font-semibold text-[#1A1D2B]">Lernfeld {module.number}</span>
        </div>
      </header>

      <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-6">
        <motion.div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
            <img src={module.heroImage} alt={module.title} className="w-full sm:w-48 h-32 object-cover rounded-xl" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-[#1A1D2B]">{module.title}</h1>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${difficultyMap[module.difficulty].bg} ${difficultyMap[module.difficulty].color}`}>
                  {difficultyMap[module.difficulty].label}
                </span>
              </div>
              <p className="text-sm text-[#5A6270] mb-2">{module.subtitle}</p>
              <p className="text-sm text-[#5A6270] mb-4">{module.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#5A6270]">Fortschritt:</span>
                <div className="flex-1 max-w-[220px] h-2 bg-[#E0F2FE] rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #0D9488, #38BDF8)' }} initial={{ width: 0 }} animate={{ width: `${currentProgress}%` }} />
                </div>
                <span className="text-xs font-semibold text-[#1A1D2B]">{Math.round(currentProgress)}%</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-5 p-1 bg-[#F4F7F9] rounded-xl w-fit">
            <button onClick={() => setActiveTab('learn')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'learn' ? 'bg-[#0D9488] text-white shadow-sm' : 'text-[#5A6270]'}`}>
              <BookOpen className="w-4 h-4" /> Lernmaterial
            </button>
            <button onClick={() => setActiveTab('quiz')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'quiz' ? 'bg-[#0D9488] text-white shadow-sm' : 'text-[#5A6270]'}`}>
              <PenLine className="w-4 h-4" /> Übungen ({module.questions.length})
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === 'learn' ? (
            <LearningContent key="learn" topics={module.topics} expandedTopics={expandedTopics} onToggleTopic={toggleTopic} />
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

function LearningContent({ topics, expandedTopics, onToggleTopic }: { topics: LearningTopic[]; expandedTopics: Set<string>; onToggleTopic: (id: string) => void }) {
  return (
    <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {topics.map((topic, i) => {
        const isExpanded = expandedTopics.has(topic.id);
        return (
          <motion.div key={topic.id} className="bg-white rounded-2xl shadow-sm overflow-hidden" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.035 }}>
            <button className="w-full flex items-center justify-between p-5 text-left hover:bg-[#F0F5F3] transition-colors" onClick={() => onToggleTopic(topic.id)}>
              <h3 className="font-semibold text-[#1A1D2B]">{topic.title}</h3>
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}><ChevronDown className="w-5 h-5 text-[#5A6270]" /></motion.div>
            </button>
            <AnimatePresence>
              {isExpanded && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="px-5 pb-6 border-l-4 border-[#0D9488] ml-5"><TopicRenderer content={topic.content} /></div>
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
            return <h4 key={i} className="font-semibold text-[#1A1D2B] text-lg mt-6">{block.title}</h4>;
          case 'text':
            return <p key={i} className="text-[15px] text-[#475569] leading-7">{block.text}</p>;
          case 'info':
            return <div key={i} className="bg-[#E0F2FE] border-l-4 border-[#38BDF8] rounded-lg p-4"><div className="font-semibold text-[#0369A1] text-sm mb-1">{block.title}</div><div className="text-sm text-[#475569] leading-6">{block.text}</div></div>;
          case 'warning':
            return <div key={i} className="bg-[#FEF3C7] border-l-4 border-[#D97706] rounded-lg p-4"><div className="font-semibold text-[#B45309] text-sm mb-1">{block.title}</div><div className="text-sm text-[#475569] leading-6">{block.text}</div></div>;
          case 'table':
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
                <table className="w-full text-sm">
                  <thead><tr className="bg-[#CCFBF1]">{block.headers?.map((h, j) => <th key={j} className="text-left px-3 py-3 font-semibold text-[#0F766E] text-xs">{h}</th>)}</tr></thead>
                  <tbody>{block.rows?.map((row, j) => <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'}>{row.map((cell, k) => <td key={k} className="px-3 py-3 text-[#475569] text-xs align-top leading-5">{cell}</td>)}</tr>)}</tbody>
                </table>
              </div>
            );
          case 'list':
            return <ul key={i} className="space-y-2">{block.items?.map((item, j) => <li key={j} className="flex items-start gap-2 text-sm text-[#475569] leading-6"><span className="w-2 h-2 rounded-full bg-[#0D9488] mt-2 shrink-0" /><span>{item}</span></li>)}</ul>;
          case 'definition':
            return <div key={i} className="bg-[#F0F5F3] rounded-lg p-4"><span className="font-semibold text-[#1A1D2B] text-sm">{block.term}: </span><span className="text-sm text-[#475569] leading-6">{block.definition}</span></div>;
          case 'image':
            return (
              <figure key={i} className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-3 sm:p-4">
                <img src={block.src} alt={block.alt || block.title || 'Lernabbildung'} className="w-full max-h-[520px] object-contain rounded-xl" loading="lazy" />
                {block.caption && <figcaption className="text-xs text-[#64748B] mt-3 text-center leading-5">{block.caption}</figcaption>}
              </figure>
            );
          case 'video':
            return (
              <div key={i} className="rounded-2xl border border-[#BAE6FD] bg-[#F0F9FF] overflow-hidden">
                <div className="p-4 sm:p-5 flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-xl bg-[#0D9488] text-white flex items-center justify-center shrink-0"><PlayCircle className="w-5 h-5" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-[#1A1D2B]">{block.title || 'Lernvideo'}</div>
                    <div className="text-xs text-[#64748B] mt-1">{[block.source, block.duration].filter(Boolean).join(' • ')}</div>
                    {block.caption && <p className="text-sm text-[#475569] mt-2 leading-6">{block.caption}</p>}
                  </div>
                </div>
                {block.embedUrl && (
                  <div className="aspect-video bg-black">
                    <iframe src={block.embedUrl} title={block.title || 'Lernvideo'} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
                  </div>
                )}
                {block.url && (
                  <a href={block.url} target="_blank" rel="noreferrer" className="m-4 sm:m-5 mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#7DD3FC] text-[#0369A1] text-sm font-medium hover:bg-[#E0F2FE] transition-colors">
                    Video / Quelle öffnen <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
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
  const {
    questions, quizState, currentQuestionIndex, selectedAnswers, checkedQuestions, correctQuestions, score, totalPoints,
    onSelectAnswer, onCheckAnswer, onNextQuestion, onPrevQuestion, onRestartQuiz, onJumpToQuestion, nextModule, onOpenModule,
  } = props;

  if (quizState === 'results') {
    const percentage = Math.round((score / totalPoints) * 100);
    const grade = getGrade(percentage);
    return (
      <motion.div className="max-w-[620px] mx-auto" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <div className="w-28 h-28 rounded-full mx-auto mb-4 flex flex-col items-center justify-center text-white" style={{ background: 'linear-gradient(135deg, #0D9488, #38BDF8)' }}>
            <Trophy className="w-8 h-8 mb-1" /><span className="text-2xl font-bold">{percentage}%</span>
          </div>
          <h2 className="text-xl font-bold text-[#1A1D2B]">{score} von {totalPoints} Punkten</h2>
          <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mt-3 mb-5 ${grade.color}`}>Note {grade.grade} – {grade.label}</div>
          <p className="text-sm text-[#5A6270] mb-6">{percentage >= 80 ? 'Sehr stark. Die Grundlagen sitzen.' : percentage >= 60 ? 'Gute Basis. Wiederhole die falsch beantworteten Themen.' : 'Arbeite die Lernabschnitte noch einmal durch und nutze besonders Bilder und Videos.'}</p>
          <div className="grid grid-cols-8 gap-2 mb-6">{questions.map((q, i) => <div key={q.id} className={`h-9 rounded-lg flex items-center justify-center text-xs font-semibold ${correctQuestions.has(q.id) ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEE2E2] text-[#DC2626]'}`}>{correctQuestions.has(q.id) ? <Check className="w-4 h-4" /> : i + 1}</div>)}</div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={onRestartQuiz} className="flex items-center justify-center gap-2 px-5 py-3 border-2 border-[#0D9488] text-[#0D9488] rounded-xl font-medium"><RotateCcw className="w-4 h-4" /> Noch einmal</button>
            {nextModule && <button onClick={() => onOpenModule(nextModule.id)} className="flex items-center justify-center gap-2 px-5 py-3 bg-[#0D9488] text-white rounded-xl font-medium">Nächstes Lernfeld <ArrowRight className="w-4 h-4" /></button>}
          </div>
        </div>
      </motion.div>
    );
  }

  const q = questions[currentQuestionIndex];
  const answer = selectedAnswers[q.id];
  const isRevealed = quizState === 'revealed';
  const hasAnswer = answer !== undefined && (typeof answer === 'string' ? answer.trim().length > 0 : answer.length > 0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4 flex items-center gap-2 flex-wrap">
        {questions.map((question, i) => {
          const status = correctQuestions.has(question.id) ? 'correct' : checkedQuestions.has(question.id) ? 'incorrect' : 'open';
          return <button key={question.id} onClick={() => onJumpToQuestion(i)} className={`w-8 h-8 rounded-lg text-xs font-semibold ${i === currentQuestionIndex ? 'ring-2 ring-[#0D9488] ring-offset-1' : ''} ${status === 'correct' ? 'bg-[#DCFCE7] text-[#16A34A]' : status === 'incorrect' ? 'bg-[#FEE2E2] text-[#DC2626]' : 'bg-[#F4F7F9] text-[#5A6270]'}`}>{i + 1}</button>;
        })}
        <span className="ml-auto text-sm font-medium text-[#5A6270]">{score} / {totalPoints} Pkte</span>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="text-xs font-medium text-[#0D9488] uppercase tracking-wider mb-2">Frage {currentQuestionIndex + 1} von {questions.length} • {q.points} Punkte</div>
        <h3 className="text-base font-semibold text-[#1A1D2B] mb-5">{q.question}</h3>

        {q.type === 'single' && q.options && (
          <div className="space-y-2.5 mb-6">{q.options.map(opt => {
            const selected = answer === opt.id;
            const good = Boolean(opt.correct);
            return <button key={opt.id} disabled={isRevealed} onClick={() => onSelectAnswer(q.id, opt.id)} className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left ${isRevealed && good ? 'border-[#16A34A] bg-[#DCFCE7]' : isRevealed && selected && !good ? 'border-[#DC2626] bg-[#FEE2E2]' : selected ? 'border-[#0D9488] bg-[#CCFBF1]' : 'border-[#E2E8F0] bg-white'} ${!isRevealed ? 'hover:border-[#0D9488]' : ''}`}>
              <span className={`w-5 h-5 rounded-full border-2 shrink-0 ${selected ? 'border-[#0D9488] bg-[#0D9488]' : 'border-[#CBD5E1]'}`} />
              <span className="text-sm text-[#1A1D2B]">{opt.text}</span>
              {isRevealed && good && <CheckCircle2 className="w-5 h-5 text-[#16A34A] ml-auto" />}
              {isRevealed && selected && !good && <XCircle className="w-5 h-5 text-[#DC2626] ml-auto" />}
            </button>;
          })}</div>
        )}

        {q.type === 'multiple' && q.options && (
          <div className="space-y-2.5 mb-6">{q.options.map(opt => {
            const selected = ((answer as string[]) || []).includes(opt.id);
            const good = Boolean(opt.correct);
            return <button key={opt.id} disabled={isRevealed} onClick={() => {
              const current = (selectedAnswers[q.id] as string[]) || [];
              onSelectAnswer(q.id, selected ? current.filter(id => id !== opt.id) : [...current, opt.id]);
            }} className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left ${isRevealed && good ? 'border-[#16A34A] bg-[#DCFCE7]' : isRevealed && selected && !good ? 'border-[#DC2626] bg-[#FEE2E2]' : selected ? 'border-[#0D9488] bg-[#CCFBF1]' : 'border-[#E2E8F0]'}`}>
              <span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${selected ? 'border-[#0D9488] bg-[#0D9488]' : 'border-[#CBD5E1]'}`}>{selected && <Check className="w-3 h-3 text-white" />}</span>
              <span className="text-sm">{opt.text}</span>
            </button>;
          })}</div>
        )}

        {q.type === 'text' && (
          <textarea value={(answer as string) || ''} disabled={isRevealed} onChange={e => onSelectAnswer(q.id, e.target.value)} rows={5} className="w-full mb-6 rounded-xl border-2 border-[#E2E8F0] p-4 text-sm focus:outline-none focus:border-[#0D9488]" placeholder="Antwort in eigenen Worten …" />
        )}

        {isRevealed && (
          <div className={`rounded-xl p-4 mb-5 ${correctQuestions.has(q.id) ? 'bg-[#DCFCE7]' : 'bg-[#FFF7ED]'}`}>
            <div className="font-semibold text-sm text-[#1A1D2B] mb-1">Erklärung</div>
            <p className="text-sm text-[#475569] leading-6">{q.explanation}</p>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <button onClick={onPrevQuestion} disabled={currentQuestionIndex === 0} className="px-4 py-2 rounded-xl text-sm border border-[#E2E8F0] disabled:opacity-40">Zurück</button>
          {!isRevealed ? <button onClick={onCheckAnswer} disabled={!hasAnswer} className="px-5 py-2.5 rounded-xl bg-[#0D9488] text-white text-sm font-medium disabled:opacity-40">Antwort prüfen</button> : <button onClick={onNextQuestion} className="px-5 py-2.5 rounded-xl bg-[#0D9488] text-white text-sm font-medium">{currentQuestionIndex === questions.length - 1 ? 'Ergebnis' : 'Weiter'}</button>}
        </div>
      </div>
    </motion.div>
  );
}
