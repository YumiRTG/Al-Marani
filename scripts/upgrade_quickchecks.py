from pathlib import Path

page = Path('src/pages/ModuleDetailV4.tsx')
text = page.read_text(encoding='utf-8')

text = text.replace(
    "type PracticeSource = { question: string; solution: string };\ntype QuickCheck = { question: string; options: QuizOption[]; explanation: string };",
    "type PracticeSource = { question: string; solutions: string[]; distractors?: string[] };\ntype QuickCheck = { question: string; options: QuizOption[]; explanation: string; multiple: boolean };"
)
text = text.replace("  selections?: Record<string, string>;", "  selections?: Record<string, string | string[]>;")
text = text.replace("  const [selections, setSelections] = useState<Record<string, string>>({});", "  const [selections, setSelections] = useState<Record<string, string | string[]>>({});")

old = '''function parsePracticeItem(item: string, blocks: TopicContent[]): PracticeSource {
  const separator = item.indexOf('|||');
  if (separator >= 0) {
    const question = clean(item.slice(0, separator));
    const solution = clean(item.slice(separator + 3));
    return { question, solution: solution || supportText(blocks) };
  }
  return { question: clean(item), solution: supportText(blocks) };
}'''
new = '''function parsePracticeItem(item: string, blocks: TopicContent[]): PracticeSource {
  const parts = item.split('|||').map(clean);
  if (parts.length >= 2) {
    const [question, correctPart, ...distractors] = parts;
    const solutions = correctPart.split('&&&').map(clean).filter(Boolean);
    return { question, solutions: solutions.length ? solutions : [supportText(blocks)], distractors: distractors.filter(Boolean) };
  }
  return { question: clean(item), solutions: [supportText(blocks)] };
}'''
if old not in text:
    raise SystemExit('parsePracticeItem not found')
text = text.replace(old, new, 1)

old = '''function fallbackPractice(title: string, blocks: TopicContent[]): PracticeSource[] {
  const points = learningPoints(blocks);
  const definition = blocks.find(block => block.type === 'definition' && block.term && block.definition);
  if (definition?.term && definition.definition) {
    return [
      { question: `Welche Aussage passt zu „${title}“?`, solution: points[0] || supportText(blocks) },
      { question: `Was beschreibt „${definition.term}“ richtig?`, solution: definition.definition },
    ];
  }
  return [
    { question: `Welche Aussage passt am besten zu „${title}“?`, solution: points[0] || supportText(blocks) },
    { question: 'Welche zweite Kernaussage solltest du dir merken?', solution: points[1] || points[0] || supportText(blocks) },
  ];
}'''
new = '''function fallbackPractice(title: string, blocks: TopicContent[]): PracticeSource[] {
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
}'''
if old not in text:
    raise SystemExit('fallbackPractice not found')
text = text.replace(old, new, 1)

old = '''function buildChecks(sources: PracticeSource[], blocks: TopicContent[], seed: number): QuickCheck[] {
  const fallback = fallbackPractice('diesem Thema', blocks);
  const selected = [...sources.slice(0, 2)];
  while (selected.length < 2) selected.push(fallback[selected.length] || fallback[0]);
  const pool = unique([...learningPoints(blocks), ...sources.map(item => item.solution), ...fallback.map(item => item.solution)]);
  return selected.slice(0, 2).map((source, index) => ({
    question: source.question || 'Welche Aussage ist richtig?',
    options: makeOptions(source.solution, pool, seed + index * 11),
    explanation: source.solution,
  }));
}'''
new = '''function makeQuickCheckOptions(correctValues: string[], seed: number, explicitDistractors: string[] = []): QuizOption[] {
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
}'''
if old not in text:
    raise SystemExit('buildChecks not found')
text = text.replace(old, new, 1)

old = "  const checkCorrect = (step: GuidedStep, index: number) => step.checks[index]?.options.find(option => option.id === selections[checkKey(step, index)])?.correct === true;"
new = '''  const checkCorrect = (step: GuidedStep, index: number) => {
    const check = step.checks[index];
    if (!check) return false;
    const selected = selections[checkKey(step, index)];
    if (!check.multiple) return typeof selected === 'string' && check.options.find(option => option.id === selected)?.correct === true;
    const selectedSet = new Set(Array.isArray(selected) ? selected : []);
    const correctSet = new Set(check.options.filter(option => option.correct).map(option => option.id));
    return selectedSet.size === correctSet.size && [...selectedSet].every(id => correctSet.has(id));
  };'''
if old not in text:
    raise SystemExit('checkCorrect not found')
text = text.replace(old, new, 1)

old = '''  const choosePractice = (step: GuidedStep, index: number, optionId: string) => {
    const key = checkKey(step, index);
    setSelections(previous => ({ ...previous, [key]: optionId }));
    setChecked(previous => {
      const next = new Set(previous);
      next.delete(key);
      return next;
    });
  };'''
new = '''  const choosePractice = (step: GuidedStep, index: number, optionId: string) => {
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
  };'''
if old not in text:
    raise SystemExit('choosePractice not found')
text = text.replace(old, new, 1)

old = '''  const reviewPractice = (step: GuidedStep, index: number) => {
    const key = checkKey(step, index);
    if (!selections[key]) return;
    setChecked(previous => new Set(previous).add(key));
  };'''
new = '''  const reviewPractice = (step: GuidedStep, index: number) => {
    const key = checkKey(step, index);
    const selected = selections[key];
    const hasSelection = Array.isArray(selected) ? selected.length > 0 : Boolean(selected);
    if (!hasSelection) return;
    setChecked(previous => new Set(previous).add(key));
  };'''
if old not in text:
    raise SystemExit('reviewPractice not found')
text = text.replace(old, new, 1)

text = text.replace(
    "                        const correctOption = check.options.find(option => option.correct);",
    "                        const correctOptions = check.options.filter(option => option.correct);\n                        const selectedIds = new Set(Array.isArray(selected) ? selected : selected ? [selected] : []);"
)
text = text.replace("const chosen = selected === option.id;", "const chosen = selectedIds.has(option.id);")
text = text.replace(
    '<p className="text-sm sm:text-base font-semibold text-slate-800 leading-6">{check.question}</p>',
    '<div><p className="text-sm sm:text-base font-semibold text-slate-800 leading-6">{check.question}</p>{check.multiple && <p className="text-xs font-semibold text-violet-600 mt-1">Mehrere Antworten möglich · alle richtigen auswählen</p>}</div>'
)
text = text.replace('rounded-full border-2 shrink-0', 'rounded-md border-2 shrink-0')
text = text.replace('disabled={!selected}', 'disabled={Array.isArray(selected) ? selected.length === 0 : !selected}')
text = text.replace(
    '{!isCorrect && correctOption && <p className="text-sm text-slate-600 mb-2"><strong>Richtige Antwort:</strong> {correctOption.text}</p>}',
    "{!isCorrect && correctOptions.length > 0 && <p className=\"text-sm text-slate-600 mb-2\"><strong>{check.multiple ? 'Richtige Antworten:' : 'Richtige Antwort:'}</strong> {correctOptions.map(option => option.text).join(' · ')}</p>}"
)

page.write_text(text, encoding='utf-8')

lf9 = Path('src/data/lf9Topic6Polish.ts')
data = lf9.read_text(encoding='utf-8')
data = data.replace("type PracticePair = { question: string; solution: string };", "type PracticePair = { question: string; solution: string | string[]; distractors?: string[] };")
old = '''const practice = (title: string, items: PracticePair[]): TopicContent[] => [
  { type: 'heading', title: `✍️ Kurz üben – ${title}` },
  { type: 'list', items: items.map(item => `${item.question}|||${item.solution}`) },
];'''
new = '''const practice = (title: string, items: PracticePair[]): TopicContent[] => [
  { type: 'heading', title: `✍️ Kurz üben – ${title}` },
  { type: 'list', items: items.map(item => [item.question, (Array.isArray(item.solution) ? item.solution : [item.solution]).join('&&&'), ...(item.distractors || [])].join('|||')) },
];'''
if old not in data:
    raise SystemExit('LF9 practice helper not found')
data = data.replace(old, new, 1)

data = data.replace("{ question: 'Wofür stehen T, N und M?', solution: 'T beschreibt den Primärtumor, N die regionalen Lymphknoten und M mögliche Fernmetastasen.' },", "{ question: 'Welche Aussagen zum TNM-System sind richtig?', solution: ['T beschreibt Größe oder örtliche Ausdehnung des Primärtumors.', 'N beschreibt den Befall regionaler Lymphknoten.', 'M beschreibt das Vorliegen von Fernmetastasen.'], distractors: ['T beschreibt ausschließlich Fernmetastasen.', 'N steht für Nebenwirkungen der Therapie.'] },")
data = data.replace("{ question: 'Was bedeutet M0 grundsätzlich?', solution: 'M0 bedeutet, dass keine Fernmetastasen nachgewiesen wurden.' },", "{ question: 'Welche Aussage beschreibt M0 richtig?', solution: 'Es wurden keine Fernmetastasen nachgewiesen.', distractors: ['Fernmetastasen wurden sicher nachgewiesen.', 'Regionale Lymphknoten sind zwingend befallen.', 'Der Primärtumor ist nicht vorhanden.'] },")
data = data.replace("{ question: 'Was sagt das p in einer Angabe wie pT2 aus?', solution: 'Das p zeigt, dass die Einteilung auf einer pathologischen beziehungsweise feingeweblichen Untersuchung beruht.' },", "{ question: 'Wofür steht das vorangestellte p bei einer Angabe wie pT2?', solution: 'Die Einteilung beruht auf einer pathologischen beziehungsweise feingeweblichen Untersuchung.', distractors: ['Die Erkrankung ist grundsätzlich palliativ.', 'Es wurden sicher Fernmetastasen gefunden.', 'Die Einteilung basiert ausschließlich auf einer Blutuntersuchung.'] },")
data = data.replace("{ question: 'Welche zwei Verfahren wirken vor allem lokal?', solution: 'Operation und Strahlentherapie wirken vor allem lokal an einer bestimmten Körperstelle.' },", "{ question: 'Welche Verfahren wirken vor allem lokal?', solution: ['Operation', 'Strahlentherapie'], distractors: ['Systemische Chemotherapie', 'Eine im ganzen Körper wirkende Immuntherapie'] },")
data = data.replace("{ question: 'Was bedeutet „systemische Therapie“?', solution: 'Eine systemische Therapie wirkt über den Blutweg im ganzen Körper und kann Krebszellen an verschiedenen Stellen erreichen.' },", "{ question: 'Was bedeutet „systemisch“ bei einer Krebstherapie?', solution: 'Die Behandlung wirkt über den Blutkreislauf im ganzen Körper und kann dadurch Krebszellen an verschiedenen Stellen erreichen.', distractors: ['Die Behandlung wirkt nur an einer einzigen Körperstelle.', 'Es handelt sich immer ausschließlich um eine Operation.', 'Die Behandlung betrifft nur die Hautoberfläche.'] },")
data = data.replace("{ question: 'Warum erhalten nicht alle Menschen mit Krebs dieselbe Behandlung?', solution: 'Die Behandlung hängt unter anderem von Tumorart, Ausbreitung, Lage, biologischen Eigenschaften und Allgemeinzustand ab.' },", "{ question: 'Welche Faktoren beeinflussen die Wahl der Krebstherapie?', solution: ['Tumorart und Ausbreitung', 'Lage und biologische Eigenschaften der Krebszellen', 'Allgemeinzustand der erkrankten Person'], distractors: ['Nur der Wochentag der Diagnose', 'Ausschließlich die Haarfarbe der erkrankten Person'] },")
data = data.replace("{ question: 'Welche Beschwerden können bei Magenkrebs auftreten?', solution: 'Möglich sind zum Beispiel anhaltende Oberbauchbeschwerden, Übelkeit, Appetitmangel oder Gewichtsverlust.' },", "{ question: 'Welche Beschwerden können bei Magenkrebs auftreten?', solution: ['Anhaltende Oberbauchbeschwerden', 'Übelkeit oder Appetitmangel', 'Unbeabsichtigter Gewichtsverlust'], distractors: ['Jede betroffene Person hat zwingend dieselben Beschwerden.', 'Ein einzelnes Symptom beweist bereits sicher Magenkrebs.'] },")
data = data.replace("{ question: 'Welche Veränderungen können bei Darmkrebs auffallen?', solution: 'Möglich sind zum Beispiel Blut im Stuhl, länger veränderte Stuhlgewohnheiten oder anhaltende Bauchbeschwerden.' },", "{ question: 'Welche Veränderungen können bei Darmkrebs auffallen?', solution: ['Blut im Stuhl', 'Länger veränderte Stuhlgewohnheiten', 'Anhaltende Bauchbeschwerden'], distractors: ['Darmkrebs verursacht grundsätzlich nie Beschwerden.', 'Eine Veränderung beweist ohne weitere Diagnostik sicher die Diagnose.'] },")
data = data.replace("{ question: 'Warum darf ein einzelnes Symptom nicht mit einer sicheren Krebsdiagnose gleichgesetzt werden?', solution: 'Die Beschwerden sind oft unspezifisch und müssen im Gesamtbild ärztlich abgeklärt werden.' },", "{ question: 'Warum reicht ein einzelnes Symptom nicht für eine sichere Krebsdiagnose?', solution: 'Viele Beschwerden sind unspezifisch und müssen zusammen mit weiteren Befunden ärztlich abgeklärt werden.', distractors: ['Ein einzelnes Symptom reicht immer für eine sichere Diagnose.', 'Bei Krebs spielen weitere Untersuchungen grundsätzlich keine Rolle.'] },")

lf9.write_text(data, encoding='utf-8')
