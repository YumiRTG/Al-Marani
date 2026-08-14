import { useMemo, useState } from 'react';
import { CheckCircle2, Lightbulb, Puzzle, RotateCcw, XCircle } from 'lucide-react';
import type { LearningModule } from '@/types';

type Entry = { answer: string; display: string; clue: string };
type Placed = Entry & { row: number; col: number; dir: 'across' | 'down'; number: number };

type Cell = { char: string; entries: number[]; number?: number };

const normalize = (value: string) => value
  .toUpperCase()
  .replace(/Ä/g, 'AE')
  .replace(/Ö/g, 'OE')
  .replace(/Ü/g, 'UE')
  .replace(/ß/g, 'SS')
  .replace(/[^A-Z]/g, '');

function collectEntries(module: LearningModule): Entry[] {
  const entries: Entry[] = [];

  module.topics.forEach(topic => topic.content.forEach(block => {
    if (block.type === 'definition' && block.term && block.definition) {
      const answer = normalize(block.term);
      if (answer.length >= 4 && answer.length <= 16) entries.push({ answer, display: block.term, clue: block.definition });
    }
  }));

  module.questions.forEach(question => {
    if (question.type !== 'single' || !question.options) return;
    const correct = question.options.find(option => option.correct)?.text;
    if (!correct) return;
    const answer = normalize(correct);
    const wordCount = correct.trim().split(/\s+/).length;
    if (answer.length >= 4 && answer.length <= 16 && wordCount <= 2) entries.push({ answer, display: correct, clue: question.question });
  });

  const seen = new Set<string>();
  return entries.filter(entry => {
    if (seen.has(entry.answer)) return false;
    seen.add(entry.answer);
    return true;
  }).slice(0, 8);
}

function canPlace(grid: Map<string, Cell>, word: string, row: number, col: number, dir: 'across' | 'down') {
  for (let i = 0; i < word.length; i += 1) {
    const r = row + (dir === 'down' ? i : 0);
    const c = col + (dir === 'across' ? i : 0);
    if (r < 0 || c < 0 || r >= 17 || c >= 17) return false;
    const existing = grid.get(`${r}:${c}`);
    if (existing && existing.char !== word[i]) return false;
  }
  return true;
}

function buildLayout(source: Entry[]) {
  const grid = new Map<string, Cell>();
  const placed: Placed[] = [];

  const place = (entry: Entry, row: number, col: number, dir: 'across' | 'down') => {
    const number = placed.length + 1;
    const next: Placed = { ...entry, row, col, dir, number };
    placed.push(next);
    for (let i = 0; i < entry.answer.length; i += 1) {
      const r = row + (dir === 'down' ? i : 0);
      const c = col + (dir === 'across' ? i : 0);
      const key = `${r}:${c}`;
      const existing = grid.get(key);
      grid.set(key, { char: entry.answer[i], entries: [...(existing?.entries || []), number], number: i === 0 ? number : existing?.number });
    }
  };

  if (!source.length) return { placed, grid };
  const first = source[0];
  place(first, 8, Math.max(0, Math.floor((17 - first.answer.length) / 2)), 'across');

  source.slice(1).forEach(entry => {
    let done = false;
    for (const existing of placed) {
      if (done) break;
      for (let i = 0; i < entry.answer.length && !done; i += 1) {
        for (let j = 0; j < existing.answer.length && !done; j += 1) {
          if (entry.answer[i] !== existing.answer[j]) continue;
          const dir = existing.dir === 'across' ? 'down' : 'across';
          const crossingRow = existing.row + (existing.dir === 'down' ? j : 0);
          const crossingCol = existing.col + (existing.dir === 'across' ? j : 0);
          const row = crossingRow - (dir === 'down' ? i : 0);
          const col = crossingCol - (dir === 'across' ? i : 0);
          if (canPlace(grid, entry.answer, row, col, dir)) {
            place(entry, row, col, dir);
            done = true;
          }
        }
      }
    }
  });

  return { placed: placed.slice(0, 6), grid };
}

export function MiniCrossword({ module }: { module: LearningModule }) {
  const source = useMemo(() => collectEntries(module), [module]);
  const { placed, grid } = useMemo(() => buildLayout(source), [source]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  if (placed.length < 3) return null;

  const rows = Array.from(grid.keys()).map(key => Number(key.split(':')[0]));
  const cols = Array.from(grid.keys()).map(key => Number(key.split(':')[1]));
  const minRow = Math.min(...rows);
  const maxRow = Math.max(...rows);
  const minCol = Math.min(...cols);
  const maxCol = Math.max(...cols);

  const cellValue = (row: number, col: number) => {
    const cell = grid.get(`${row}:${col}`);
    if (!cell) return '';
    for (const entryNumber of cell.entries) {
      const entry = placed.find(item => item.number === entryNumber);
      if (!entry) continue;
      const index = entry.dir === 'across' ? col - entry.col : row - entry.row;
      const typed = normalize(answers[entryNumber] || '');
      if (typed[index]) return typed[index];
    }
    return '';
  };

  const solved = placed.filter(entry => normalize(answers[entry.number] || '') === entry.answer).length;

  return (
    <section className="mt-8 rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-cyan-50 overflow-hidden shadow-sm">
      <div className="p-5 sm:p-6 border-b border-violet-100 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-violet-700"><Puzzle className="w-5 h-5" /> Mini-Kreuzworträtsel</div>
          <p className="text-sm text-slate-500 mt-1">Zum Abschluss noch ein paar zentrale Begriffe. Kurze Wörter reichen.</p>
        </div>
        <div className="text-xs font-bold text-violet-700 bg-white rounded-full px-3 py-1.5 shadow-sm">{solved}/{placed.length}</div>
      </div>

      <div className="grid xl:grid-cols-[auto_1fr] gap-6 p-5 sm:p-6 items-start">
        <div className="overflow-auto">
          <div className="inline-grid gap-0.5 bg-slate-300 p-0.5 rounded-xl" style={{ gridTemplateColumns: `repeat(${maxCol - minCol + 1}, 32px)` }}>
            {Array.from({ length: (maxRow - minRow + 1) * (maxCol - minCol + 1) }).map((_, index) => {
              const width = maxCol - minCol + 1;
              const row = minRow + Math.floor(index / width);
              const col = minCol + (index % width);
              const cell = grid.get(`${row}:${col}`);
              if (!cell) return <div key={`${row}-${col}`} className="w-8 h-8 bg-slate-800" />;
              const value = cellValue(row, col);
              return (
                <div key={`${row}-${col}`} className="relative w-8 h-8 bg-white flex items-center justify-center font-bold text-sm text-slate-800">
                  {cell.number && <span className="absolute left-0.5 top-0 text-[8px] leading-none text-slate-400">{cell.number}</span>}
                  {value}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          {placed.map(entry => {
            const value = answers[entry.number] || '';
            const isCorrect = normalize(value) === entry.answer;
            return (
              <div key={entry.number} className="rounded-2xl bg-white border border-slate-200 p-4">
                <div className="flex items-start gap-2 mb-2">
                  <span className="w-6 h-6 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold shrink-0">{entry.number}</span>
                  <p className="text-sm text-slate-600 leading-5">{entry.clue}</p>
                </div>
                <div className="flex gap-2">
                  <input
                    value={value}
                    onChange={event => { setChecked(false); setAnswers(prev => ({ ...prev, [entry.number]: event.target.value })); }}
                    className={`flex-1 min-w-0 rounded-xl border-2 px-3 py-2 text-sm font-semibold uppercase outline-none ${checked ? isCorrect ? 'border-emerald-300 bg-emerald-50' : 'border-rose-300 bg-rose-50' : 'border-slate-200 focus:border-violet-400'}`}
                    placeholder={`${entry.answer.length} Buchstaben`}
                  />
                  {checked && (isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-2" /> : <XCircle className="w-5 h-5 text-rose-500 mt-2" />)}
                </div>
                {checked && !isCorrect && <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5"><Lightbulb className="w-3.5 h-3.5" /> Lösung: <strong>{entry.display}</strong></div>}
              </div>
            );
          })}
          <div className="flex gap-2 justify-end pt-1">
            <button onClick={() => { setAnswers({}); setChecked(false); }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-500"><RotateCcw className="w-4 h-4" /> Neu</button>
            <button onClick={() => setChecked(true)} className="px-4 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-bold">Lösungen prüfen</button>
          </div>
        </div>
      </div>
    </section>
  );
}
