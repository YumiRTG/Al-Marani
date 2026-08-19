import type { LearningModule, LearningTopic, TopicContent } from '@/types';

const stopWords = new Set([
  'aber', 'auch', 'auf', 'aus', 'bei', 'der', 'die', 'das', 'dem', 'den', 'des', 'ein', 'eine', 'einer', 'einem', 'einen',
  'für', 'hat', 'haben', 'ist', 'kann', 'können', 'mit', 'nicht', 'oder', 'sind', 'und', 'von', 'vor', 'was', 'warum', 'welche',
  'welcher', 'welches', 'wie', 'wird', 'werden', 'zu', 'zum', 'zur', 'dass', 'du', 'dir', 'man', 'sich', 'im', 'in', 'am', 'an',
]);

function clean(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s-]/g, ' ');
}

function tokens(value: string) {
  return new Set(
    normalize(value)
      .split(/\s+/)
      .map(token => token.trim())
      .filter(token => token.length >= 3 && !stopWords.has(token)),
  );
}

function firstSentence(value: string, max = 210) {
  const text = clean(value);
  const sentence = text.split(/(?<=[.!?])\s+/)[0] || text;
  return sentence.length <= max ? sentence : `${sentence.slice(0, max - 1).trim()}…`;
}

function isPracticeHeading(block: TopicContent) {
  if (block.type !== 'heading' || !block.title) return false;
  const title = block.title.trim();
  return title.startsWith('✍️') || /^(übungen?|aufgaben?|mini[- ]?check|lerncheck|arbeitsauftrag|wiederholung)/i.test(title);
}

function factsFrom(blocks: TopicContent[]) {
  const facts: string[] = [];

  blocks.forEach(block => {
    if (block.type === 'text' && block.text) {
      facts.push(...block.text.split(/(?<=[.!?])\s+/).map(firstSentence));
    }
    if ((block.type === 'info' || block.type === 'warning') && block.text) facts.push(firstSentence(block.text));
    if (block.type === 'definition' && block.term && block.definition) facts.push(firstSentence(`${block.term}: ${block.definition}`));
    if (block.type === 'list' && block.items?.length) {
      block.items.forEach(item => facts.push(firstSentence(item.split('|||')[0])));
    }
    if (block.type === 'table' && block.rows?.length) {
      block.rows.forEach(row => facts.push(firstSentence(row.join(' – '))));
    }
    if ((block.type === 'image' || block.type === 'video') && block.caption) facts.push(firstSentence(block.caption));
  });

  return Array.from(new Set(facts.map(clean).filter(fact => fact.length >= 12)));
}

function score(question: string, fact: string) {
  const questionTokens = tokens(question);
  const factTokens = tokens(fact);
  let value = 0;

  questionTokens.forEach(token => {
    if (factTokens.has(token)) value += 5;
    else if ([...factTokens].some(candidate => candidate.startsWith(token) || token.startsWith(candidate))) value += 2;
  });

  const normalizedQuestion = normalize(question);
  const normalizedFact = normalize(fact);
  if (normalizedQuestion.includes('warum') && /weil|durch|deshalb|dadurch|wenn/.test(normalizedFact)) value += 2;
  if (normalizedQuestion.includes('was bedeutet') && fact.includes(':')) value += 3;
  return value;
}

function chooseFact(question: string, facts: string[], used: Set<string>, fallbackIndex: number) {
  const available = facts.filter(fact => !used.has(fact));
  if (!available.length) return facts[fallbackIndex % Math.max(facts.length, 1)] || 'Die Antwort ergibt sich aus der Kernaussage dieses Lernabschnitts.';

  return available
    .map((fact, index) => ({ fact, index, score: score(question, fact) }))
    .sort((a, b) => b.score - a.score || a.index - b.index)[0].fact;
}

function enrichTopic(topic: LearningTopic): LearningTopic {
  const content = [...topic.content];
  let segment: TopicContent[] = [];

  for (let index = 0; index < content.length; index += 1) {
    const block = content[index];

    if (block.type === 'heading' && !isPracticeHeading(block)) {
      segment = [];
      continue;
    }

    if (isPracticeHeading(block)) {
      const next = content[index + 1];
      if (next?.type !== 'list' || !next.items?.length) continue;

      const facts = factsFrom(segment);
      if (!facts.length) continue;

      const used = new Set<string>();
      const items = next.items.map((item, itemIndex) => {
        if (item.includes('|||')) {
          const solution = clean(item.slice(item.indexOf('|||') + 3));
          if (solution) used.add(firstSentence(solution));
          return item;
        }

        const solution = chooseFact(item, facts, used, itemIndex);
        used.add(solution);
        return `${clean(item)}|||${solution}`;
      });

      content[index + 1] = { ...next, items };
      continue;
    }

    segment.push(block);
  }

  return { ...topic, content };
}

export function ensureLf9DistinctQuickChecks(module: LearningModule): LearningModule {
  if (module.id !== 'lf9') return module;
  return { ...module, topics: module.topics.map(enrichTopic) };
}
