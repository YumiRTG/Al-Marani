import type { LearningModule, LearningTopic, QuizQuestion, TopicContent } from '@/types';

const stopWords = new Set([
  'aber','alle','auch','auf','aus','bei','der','die','das','dem','den','des','ein','eine','einer','einem','einen','für','hat','haben','ist','sind','war','waren','mit','nicht','oder','und','von','vor','was','wie','welche','welcher','welches','wird','werden','zu','zum','zur','im','in','am','an','beim','sich','nur','eher','dazu','dabei','durch','nach','als','bzw','beziehungsweise','richtig','aussage','aussagen','beschreibt','bedeutet','passt','besten','thema','lernabschnitt','solltest','merken',
]);

function clean(value = '') {
  return value.replace(/\s+/g, ' ').trim();
}

function normalize(value = '') {
  return clean(value)
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, ' ');
}

function stem(token: string) {
  let value = token;
  if (value.length > 7 && /(ungen|ische|ischer|ischen|licher|lichen)$/.test(value)) value = value.replace(/(ungen|ische|ischer|ischen|licher|lichen)$/, '');
  if (value.length > 6 && /(ern|em|er|en|es)$/.test(value)) value = value.replace(/(ern|em|er|en|es)$/, '');
  if (value.length > 5 && /(e|n|s)$/.test(value)) value = value.replace(/(e|n|s)$/, '');
  return value;
}

function tokens(value = '') {
  return new Set(
    normalize(value)
      .split(/\s+/)
      .filter(Boolean)
      .map(stem)
      .filter(token => token.length >= 3 && !stopWords.has(token)),
  );
}

function hits(left: Set<string>, right: Set<string>) {
  let count = 0;
  left.forEach(token => { if (right.has(token)) count += 1; });
  return count;
}

function isPracticeHeading(block: TopicContent) {
  if (block.type !== 'heading' || !block.title) return false;
  const title = block.title.trim();
  return title.startsWith('✍️') || /^(übungen?|aufgaben?|mini[- ]?check|lerncheck|arbeitsauftrag|wiederholung)/i.test(title);
}

function isContentHeading(block: TopicContent) {
  return block.type === 'heading' && !isPracticeHeading(block);
}

function blockText(block: TopicContent) {
  if (block.type === 'text' || block.type === 'info' || block.type === 'warning') return `${block.title || ''} ${block.text || ''}`;
  if (block.type === 'definition') return `${block.term || ''} ${block.definition || ''}`;
  if (block.type === 'list') return (block.items || []).map(item => item.split('|||')[0]).join(' ');
  if (block.type === 'table') return `${(block.headers || []).join(' ')} ${(block.rows || []).flat().join(' ')}`;
  if (block.type === 'image' || block.type === 'video') return `${block.title || ''} ${block.caption || ''}`;
  return block.title || '';
}

function segmentBody(blocks: TopicContent[]) {
  return blocks.filter(block => !isPracticeHeading(block)).map(blockText).join(' ');
}

function questionText(question: QuizQuestion) {
  const options = (question.options || []).map(option => option.text).join(' ');
  return `${question.question} ${question.explanation} ${options}`;
}

function scoreQuestion(title: string, body: string, topicBody: string, question: QuizQuestion) {
  const titleTokens = tokens(title);
  const bodyTokens = tokens(body);
  const topicTokens = tokens(topicBody);
  const qTokens = tokens(question.question);
  const allTokens = tokens(questionText(question));

  const titleQuestionHits = hits(titleTokens, qTokens);
  const bodyQuestionHits = hits(bodyTokens, qTokens);
  const bodyAllHits = hits(bodyTokens, allTokens);
  const topicQuestionHits = hits(topicTokens, qTokens);

  const score = titleQuestionHits * 22 + bodyQuestionHits * 9 + bodyAllHits * 2 + topicQuestionHits * 2;
  const strong = titleQuestionHits >= 2 || bodyQuestionHits >= 2 || (bodyQuestionHits >= 1 && bodyAllHits >= 4);
  const topicRelevant = topicQuestionHits >= 2 || hits(topicTokens, allTokens) >= 5;
  return { score, strong, topicRelevant };
}

function encodeQuestion(question: QuizQuestion) {
  const options = question.options || [];
  const correct = options.filter(option => option.correct).map(option => clean(option.text));
  const wrong = options.filter(option => !option.correct).map(option => clean(option.text));
  if (!correct.length || correct.length + wrong.length < 5) return null;
  return [question.question, correct.join('&&&'), ...wrong].join('|||');
}

function statementFromRow(row: string[]) {
  return row.filter(Boolean).join(' – ');
}

function localFallback(title: string, blocks: TopicContent[], offset: number) {
  const table = blocks.find(block => block.type === 'table' && (block.rows || []).length >= 3);
  if (table?.rows && table.rows.length >= 3) {
    const rows = table.rows.filter(row => row.length >= 2 && row[0] && row[1]);
    if (rows.length >= 3) {
      const start = offset % rows.length;
      const r1 = rows[start % rows.length];
      const r2 = rows[(start + 1) % rows.length];
      const r3 = rows[(start + 2) % rows.length];
      const correct = [statementFromRow(r1), statementFromRow(r2), statementFromRow(r3)];
      const wrong = [
        statementFromRow([r1[0], ...r2.slice(1)]),
        statementFromRow([r2[0], ...r3.slice(1)]),
      ];
      return [`Welche Zuordnungen zu „${title}“ sind fachlich richtig?`, correct.join('&&&'), ...wrong].join('|||');
    }
  }

  const definitions = blocks.filter(block => block.type === 'definition' && block.term && block.definition);
  if (definitions.length >= 3) {
    const start = offset % definitions.length;
    const d1 = definitions[start % definitions.length];
    const d2 = definitions[(start + 1) % definitions.length];
    const d3 = definitions[(start + 2) % definitions.length];
    const correct = [
      `${d1.term}: ${d1.definition}`,
      `${d2.term}: ${d2.definition}`,
      `${d3.term}: ${d3.definition}`,
    ];
    const wrong = [
      `${d1.term}: ${d2.definition}`,
      `${d2.term}: ${d3.definition}`,
    ];
    return [`Welche Begriffszuordnungen zu „${title}“ stimmen?`, correct.join('&&&'), ...wrong].join('|||');
  }

  const facts: string[] = [];
  blocks.forEach(block => {
    if (block.type === 'text' && block.text) facts.push(...block.text.split(/(?<=[.!?])\s+/));
    if ((block.type === 'info' || block.type === 'warning') && block.text) facts.push(block.text);
    if (block.type === 'list') facts.push(...(block.items || []).map(item => item.split('|||')[0]));
  });
  const uniqueFacts = Array.from(new Set(facts.map(clean).filter(value => value.length >= 18))).slice(0, 5);
  if (uniqueFacts.length >= 5) {
    return [`Welche Aussagen fassen „${title}“ korrekt zusammen?`, uniqueFacts.join('&&&')].join('|||');
  }
  return null;
}

function chooseChecks(title: string, blocks: TopicContent[], topicBody: string, questions: QuizQuestion[]) {
  const body = segmentBody(blocks);
  const ranked = questions
    .map(question => ({ question, ...scoreQuestion(title, body, topicBody, question) }))
    .sort((a, b) => b.score - a.score);

  const picked: QuizQuestion[] = [];
  const add = (question: QuizQuestion) => {
    if (!picked.some(item => item.id === question.id) && encodeQuestion(question)) picked.push(question);
  };

  ranked.filter(item => item.strong).forEach(item => { if (picked.length < 2) add(item.question); });
  ranked.filter(item => item.topicRelevant).forEach(item => { if (picked.length < 2) add(item.question); });

  const encoded = picked.slice(0, 2).map(encodeQuestion).filter((value): value is string => Boolean(value));
  let offset = 0;
  while (encoded.length < 2 && offset < 3) {
    const fallback = localFallback(title, blocks, offset);
    if (fallback && !encoded.includes(fallback)) encoded.push(fallback);
    offset += 1;
  }

  if (encoded.length === 1) encoded.push(encoded[0]);
  return encoded.slice(0, 2);
}

function rebuildSegment(title: string, blocks: TopicContent[], topicBody: string, questions: QuizQuestion[]) {
  const practiceIndex = blocks.findIndex(isPracticeHeading);
  const visible = practiceIndex >= 0 ? blocks.slice(0, practiceIndex) : blocks;
  const checks = chooseChecks(title, visible, topicBody, questions);
  if (!checks.length) return blocks;

  return [
    ...visible,
    { type: 'heading', title: '✍️ Kurz üben – verstehen statt raten' } as TopicContent,
    { type: 'list', items: checks } as TopicContent,
  ];
}

function polishTopic(topic: LearningTopic, questions: QuizQuestion[]) {
  // Lernfeld 9 besitzt bereits vollständig manuell kuratierte Kurz-Checks.
  const topicBody = topic.content.map(blockText).join(' ');
  const segments: { title: string; blocks: TopicContent[] }[] = [];
  let current: { title: string; blocks: TopicContent[] } = { title: 'Überblick', blocks: [] };

  topic.content.forEach(block => {
    if (isContentHeading(block)) {
      if (current.blocks.length) segments.push(current);
      current = { title: block.title || topic.title, blocks: [block] };
    } else {
      current.blocks.push(block);
    }
  });
  if (current.blocks.length) segments.push(current);

  const content = segments.flatMap(segment => {
    const heading = segment.blocks[0];
    if (heading?.type === 'heading' && !isPracticeHeading(heading)) {
      return [heading, ...rebuildSegment(segment.title, segment.blocks.slice(1), topicBody, questions)];
    }
    return rebuildSegment(segment.title, segment.blocks, topicBody, questions);
  });

  return { ...topic, content };
}

export function makeQuickChecksThoughtful(module: LearningModule): LearningModule {
  if (module.id === 'lf9') return module;
  return {
    ...module,
    topics: module.topics.map(topic => polishTopic(topic, module.questions)),
  };
}
