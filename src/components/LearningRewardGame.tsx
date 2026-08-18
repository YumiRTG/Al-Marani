import { useMemo, useState } from 'react';
import { Check, CircleHelp, RotateCcw, Sparkles, Star, Trophy, X } from 'lucide-react';

type SequenceGame = {
  kind: 'sequence';
  title: string;
  intro: string;
  items: string[];
};

type QuizGame = {
  kind: 'quiz';
  title: string;
  intro: string;
  questions: { prompt: string; options: string[]; answer: string }[];
};

type MatchGame = {
  kind: 'match';
  title: string;
  intro: string;
  pairs: { term: string; meaning: string }[];
};

type Game = SequenceGame | QuizGame | MatchGame;

const games: Record<string, Game> = {
  'lf9-02-verdauungsorgane': {
    kind: 'sequence',
    title: 'Verdauungs-Express',
    intro: 'Bringe den Weg der Nahrung in die richtige Reihenfolge.',
    items: ['Mund', 'Speiseröhre', 'Magen', 'Dünndarm', 'Dickdarm', 'Enddarm'],
  },
  'lf9-04-oberer-gi-trakt': {
    kind: 'quiz',
    title: 'Krankheits-Detektiv',
    intro: 'Welche Erkrankung passt am besten zur Beschreibung?',
    questions: [
      { prompt: 'Saurer Mageninhalt fließt in die Speiseröhre zurück.', options: ['Reflux', 'Gastritis', 'Ulkus'], answer: 'Reflux' },
      { prompt: 'Die Magenschleimhaut ist entzündet.', options: ['Reflux', 'Gastritis', 'Ulkus'], answer: 'Gastritis' },
      { prompt: 'Es besteht ein tieferer Gewebsdefekt mit möglicher Blutungsgefahr.', options: ['Reflux', 'Gastritis', 'Ulkus'], answer: 'Ulkus' },
    ],
  },
  'lf9-06-tumore': {
    kind: 'match',
    title: 'Onkologie-Match',
    intro: 'Verbinde die Fachbegriffe mit ihrer Bedeutung. Das Spiel ist freiwillig und zählt nicht zur Note.',
    pairs: [
      { term: 'T', meaning: 'Größe und lokale Ausdehnung des Primärtumors' },
      { term: 'N', meaning: 'Befall regionaler Lymphknoten' },
      { term: 'M', meaning: 'Vorhandensein von Fernmetastasen' },
      { term: 'Primärtumor', meaning: 'Ort, an dem die Krebserkrankung entstanden ist' },
      { term: 'Metastase', meaning: 'Absiedlung von Krebszellen an einer anderen Stelle im Körper' },
    ],
  },
  'lf9-08-metabolisch': {
    kind: 'sequence',
    title: 'Gefäß-Kettenreaktion',
    intro: 'Ordne die vereinfachte Ursache-Folge-Kette bei dauerhaft ungünstig hohem LDL.',
    items: ['LDL dauerhaft erhöht', 'Einlagerungen in der Gefäßwand', 'Plaque entsteht', 'Gefäß wird enger', 'Risiko für Gefäßerkrankungen steigt'],
  },
  'lf9-09-diabetes-grundlagen': {
    kind: 'quiz',
    title: 'Insulin vs. Glukagon',
    intro: 'Entscheide blitzschnell, welches Hormon gemeint ist.',
    questions: [
      { prompt: 'Wird nach einer kohlenhydratreichen Mahlzeit verstärkt ausgeschüttet.', options: ['Insulin', 'Glukagon'], answer: 'Insulin' },
      { prompt: 'Fördert die Aufnahme von Glukose in viele Körperzellen.', options: ['Insulin', 'Glukagon'], answer: 'Insulin' },
      { prompt: 'Hilft in Nüchternphasen, Glukose aus Speichern bereitzustellen.', options: ['Insulin', 'Glukagon'], answer: 'Glukagon' },
      { prompt: 'Senkt im Regelkreis den Blutzucker.', options: ['Insulin', 'Glukagon'], answer: 'Insulin' },
      { prompt: 'Erhöht im Regelkreis den Blutzucker.', options: ['Insulin', 'Glukagon'], answer: 'Glukagon' },
    ],
  },
};

function shuffle<T>(items: T[], seed: string) {
  const result = [...items];
  let value = Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0) || 1;
  for (let index = result.length - 1; index > 0; index -= 1) {
    value = (value * 9301 + 49297) % 233280;
    const next = Math.floor((value / 233280) * (index + 1));
    [result[index], result[next]] = [result[next], result[index]];
  }
  return result;
}

export function LearningRewardGame({ moduleId, topicId }: { moduleId: string; topicId: string }) {
  const game = moduleId === 'lf9' ? games[topicId] : undefined;
  if (!game) return null;

  return <RewardGame game={game} storageKey={`medlearn-reward-${moduleId}-${topicId}`} />;
}

function RewardGame({ game, storageKey }: { game: Game; storageKey: string }) {
  const [solved, setSolved] = useState(() => localStorage.getItem(storageKey) === 'done');

  const complete = () => {
    localStorage.setItem(storageKey, 'done');
    setSolved(true);
  };

  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-violet-50 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-amber-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[.14em] text-amber-700"><Sparkles className="h-4 w-4" /> Bonus freigeschaltet</div>
          <h3 className="mt-1 text-xl font-black text-slate-900">{game.title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-500">{game.intro}</p>
        </div>
        <div className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-xs font-black ${solved ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-amber-700 shadow-sm'}`}>
          {solved ? <Trophy className="h-4 w-4" /> : <Star className="h-4 w-4" />}
          {solved ? 'Lernstern verdient' : 'freiwilliger Bonus'}
        </div>
      </div>
      <div className="p-5 sm:p-6">
        {game.kind === 'sequence' && <SequencePlay game={game} onSolved={complete} />}
        {game.kind === 'quiz' && <QuizPlay game={game} onSolved={complete} />}
        {game.kind === 'match' && <MatchPlay game={game} onSolved={complete} />}
      </div>
    </section>
  );
}

function SequencePlay({ game, onSolved }: { game: SequenceGame; onSolved: () => void }) {
  const source = useMemo(() => shuffle(game.items, game.title), [game]);
  const [available, setAvailable] = useState(source);
  const [chosen, setChosen] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const correct = chosen.length === game.items.length && chosen.every((item, index) => item === game.items[index]);

  const reset = () => { setAvailable(source); setChosen([]); setChecked(false); };
  const check = () => { setChecked(true); if (correct) onSolved(); };

  return <div>
    <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
      <div className="mb-3 text-xs font-bold uppercase tracking-[.12em] text-slate-400">Deine Reihenfolge</div>
      <div className="flex min-h-14 flex-wrap gap-2">
        {chosen.length === 0 && <span className="text-sm text-slate-400">Klicke unten die Schritte in der richtigen Reihenfolge an.</span>}
        {chosen.map((item, index) => <button key={`${item}-${index}`} onClick={() => { setAvailable(prev => [...prev, item]); setChosen(prev => prev.filter((_, i) => i !== index)); setChecked(false); }} className="rounded-xl bg-teal-600 px-3 py-2 text-sm font-bold text-white"><span className="mr-1.5 opacity-70">{index + 1}.</span>{item}</button>)}
      </div>
    </div>
    <div className="mt-3 flex flex-wrap gap-2">{available.map((item, index) => <button key={`${item}-${index}`} onClick={() => { setChosen(prev => [...prev, item]); setAvailable(prev => prev.filter((_, i) => i !== index)); setChecked(false); }} className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-teal-300">{item}</button>)}</div>
    {checked && <Feedback correct={correct} text={correct ? 'Perfekt. Die Kette sitzt.' : 'Fast. Prüfe die Reihenfolge noch einmal und verschiebe die Schritte.'} />}
    <div className="mt-4 flex justify-end gap-2"><button onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-500"><RotateCcw className="h-4 w-4" /> Neu</button><button onClick={check} disabled={chosen.length !== game.items.length} className="rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-black text-white disabled:opacity-35">Reihenfolge prüfen</button></div>
  </div>;
}

function QuizPlay({ game, onSolved }: { game: QuizGame; onSolved: () => void }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const score = game.questions.filter((question, index) => answers[index] === question.answer).length;
  const correct = score === game.questions.length;
  const check = () => { setChecked(true); if (correct) onSolved(); };

  return <div className="space-y-3">
    {game.questions.map((question, index) => <div key={question.prompt} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="mb-3 flex items-start gap-2"><CircleHelp className="mt-0.5 h-5 w-5 shrink-0 text-violet-500" /><p className="text-sm font-semibold leading-6 text-slate-800">{question.prompt}</p></div><div className="flex flex-wrap gap-2">{question.options.map(option => { const selected = answers[index] === option; const right = checked && option === question.answer; const wrong = checked && selected && option !== question.answer; return <button key={option} onClick={() => { setAnswers(prev => ({ ...prev, [index]: option })); setChecked(false); }} className={`rounded-xl border-2 px-3 py-2 text-sm font-bold ${right ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : wrong ? 'border-rose-400 bg-rose-50 text-rose-700' : selected ? 'border-violet-500 bg-violet-50 text-violet-700' : 'border-slate-200 text-slate-600'}`}>{option}</button>; })}</div></div>)}
    {checked && <Feedback correct={correct} text={correct ? `${score}/${game.questions.length} richtig. Bonus geschafft!` : `${score}/${game.questions.length} richtig. Korrigiere die markierten Antworten und versuche es nochmal.`} />}
    <div className="flex justify-end"><button onClick={check} disabled={Object.keys(answers).length !== game.questions.length} className="rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-black text-white disabled:opacity-35">Bonus prüfen</button></div>
  </div>;
}

function MatchPlay({ game, onSolved }: { game: MatchGame; onSolved: () => void }) {
  const meanings = useMemo(() => shuffle(game.pairs.map(pair => pair.meaning), game.title), [game]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const score = game.pairs.filter(pair => answers[pair.term] === pair.meaning).length;
  const correct = score === game.pairs.length;
  const check = () => { setChecked(true); if (correct) onSolved(); };

  return <div className="space-y-3">
    {game.pairs.map(pair => { const selected = answers[pair.term] || ''; const isRight = checked && selected === pair.meaning; const isWrong = checked && !!selected && selected !== pair.meaning; return <div key={pair.term} className={`grid gap-3 rounded-2xl border-2 bg-white p-4 sm:grid-cols-[150px_1fr] sm:items-center ${isRight ? 'border-emerald-300' : isWrong ? 'border-rose-300' : 'border-slate-200'}`}><div className="font-black text-violet-700">{pair.term}</div><select value={selected} onChange={event => { setAnswers(prev => ({ ...prev, [pair.term]: event.target.value })); setChecked(false); }} className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-400"><option value="">Bedeutung auswählen …</option>{meanings.map(meaning => <option key={meaning} value={meaning}>{meaning}</option>)}</select></div>; })}
    {checked && <Feedback correct={correct} text={correct ? 'Alles richtig. TNM und Metastasen sitzen.' : `${score}/${game.pairs.length} Zuordnungen stimmen. Die roten Karten noch einmal prüfen.`} />}
    <div className="flex justify-end"><button onClick={check} disabled={Object.keys(answers).length !== game.pairs.length} className="rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-black text-white disabled:opacity-35">Zuordnung prüfen</button></div>
  </div>;
}

function Feedback({ correct, text }: { correct: boolean; text: string }) {
  return <div className={`mt-4 flex items-start gap-2 rounded-2xl border p-4 text-sm font-semibold ${correct ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-rose-300 bg-rose-50 text-rose-700'}`}>{correct ? <Check className="mt-0.5 h-5 w-5 shrink-0" /> : <X className="mt-0.5 h-5 w-5 shrink-0" />}<span>{text}</span></div>;
}
