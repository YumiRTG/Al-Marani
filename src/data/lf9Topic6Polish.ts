import type { LearningModule, TopicContent } from '@/types';

type PracticePair = { question: string; solution: string };

const practice = (title: string, items: PracticePair[]): TopicContent[] => [
  { type: 'heading', title: `✍️ Kurz üben – ${title}` },
  { type: 'list', items: items.map(item => `${item.question}|||${item.solution}`) },
];

const content: TopicContent[] = [
  {
    type: 'info',
    title: 'Darum geht es',
    text: 'In diesem Abschnitt lernst du zuerst die Grundbegriffe und baust darauf Schritt für Schritt auf. Wichtig ist vor allem, Tumor, Krebs, Primärtumor und Metastase nicht miteinander zu verwechseln.',
  },
  {
    type: 'list',
    items: [
      'Tumor bedeutet zunächst: Gewebe wächst ungewöhnlich. Das kann gutartig oder bösartig sein.',
      'Krebs bezeichnet bösartige Tumorerkrankungen, deren Zellen in umliegendes Gewebe eindringen können.',
      'Der Primärtumor ist der Ort, an dem die Krebserkrankung entstanden ist.',
      'Metastasen sind Absiedlungen von Krebszellen an anderen Stellen im Körper.',
      'Das TNM-System beschreibt, wie weit sich eine Krebserkrankung anatomisch ausgebreitet hat.',
    ],
  },

  { type: 'heading', title: '6.1 Tumor ist nicht automatisch Krebs' },
  {
    type: 'text',
    text: 'Ein Tumor ist eine ungewöhnliche Gewebsvermehrung. Entscheidend ist, wie sich dieses Gewebe verhält. Gutartige Tumoren, fachsprachlich benigne Tumoren, bleiben auf ihren Ursprungsort begrenzt und bilden keine Metastasen. Sie können trotzdem Beschwerden verursachen, wenn sie zum Beispiel durch ihre Größe auf andere Strukturen drücken. Bösartige, also maligne Tumoren, können in benachbartes Gewebe einwachsen und es schädigen. Außerdem können sich einzelne Krebszellen lösen und sich an anderen Stellen des Körpers ansiedeln.',
  },
  {
    type: 'table',
    headers: ['Merkmal', 'Gutartig (benigne)', 'Bösartig (maligne)'],
    rows: [
      ['Wachstum', 'meist verdrängend', 'kann in Nachbargewebe einwachsen'],
      ['Abgrenzung', 'oft klarer begrenzt', 'häufig weniger klar begrenzt'],
      ['Metastasen', 'nein', 'möglich'],
      ['Bedeutung', 'kann trotzdem Beschwerden verursachen', 'kann Gewebe zerstören und sich ausbreiten'],
    ],
  },
  ...practice('gutartig oder bösartig?', [
    { question: 'Welche Eigenschaft spricht besonders für einen malignen Tumor?', solution: 'Ein maligner Tumor kann in benachbartes Gewebe einwachsen und Metastasen bilden.' },
    { question: 'Warum kann auch ein gutartiger Tumor Beschwerden verursachen?', solution: 'Ein gutartiger Tumor kann durch seine Größe oder Lage Druck auf umliegende Strukturen ausüben.' },
    { question: 'Warum sind „Tumor“ und „Krebs“ keine Synonyme?', solution: 'Ein Tumor kann gutartig oder bösartig sein; Krebs bezeichnet bösartige Tumorerkrankungen.' },
  ]),

  { type: 'heading', title: '6.2 Wie kann Krebs entstehen?' },
  {
    type: 'text',
    text: 'Körperzellen teilen sich normalerweise nach festen Regeln. Dabei kontrollieren verschiedene Gene unter anderem Zellteilung, Reparatur und das Absterben beschädigter Zellen. Verändern sich solche Steuermechanismen, können sich einzelne Zellen zunehmend der normalen Kontrolle entziehen. Sie teilen sich weiter, obwohl das eigentlich nicht vorgesehen ist. Aus einer solchen Zellgruppe kann sich mit der Zeit ein bösartiger Tumor entwickeln. Risikofaktoren wie Tabakrauch oder bestimmte chronische Entzündungen erhöhen bei einigen Krebsarten die Wahrscheinlichkeit einer Erkrankung, führen aber nicht automatisch zu Krebs.',
  },
  {
    type: 'info',
    title: 'Denk in einer Kette',
    text: 'Veränderung der Zellsteuerung → unkontrolliertes Wachstum → bösartiger Tumor → mögliches Einwachsen in Gewebe → mögliche Metastasen.',
  },
  ...practice('Krebsentstehung', [
    { question: 'Warum bedeutet ein Risikofaktor nicht, dass eine Person sicher Krebs bekommt?', solution: 'Ein Risikofaktor erhöht die Wahrscheinlichkeit einer Erkrankung, führt aber nicht automatisch zu Krebs.' },
    { question: 'Was ist mit „unkontrolliertem Zellwachstum“ gemeint?', solution: 'Zellen teilen sich weiter, obwohl normale Steuermechanismen die Teilung eigentlich begrenzen oder stoppen sollten.' },
    { question: 'Welche Reihenfolge beschreibt die Krebsentstehung vereinfacht richtig?', solution: 'Zellveränderung → unkontrolliertes Wachstum → bösartiger Tumor → mögliches Einwachsen → mögliche Metastasen.' },
  ]),

  { type: 'heading', title: '6.3 Primärtumor und Metastasen – wo hat der Krebs begonnen?' },
  {
    type: 'text',
    text: 'Der Primärtumor ist der ursprüngliche Krebsherd. Von ihm können sich einzelne Krebszellen lösen. Gelangen sie über Blut- oder Lymphbahnen in andere Körperregionen, können sie dort neue Tumorherde bilden. Diese Absiedlungen heißen Metastasen. Wichtig: Eine Lebermetastase eines Darmkrebses besteht aus Darmkrebszellen. Sie ist deshalb nicht dasselbe wie ein Krebs, der ursprünglich in der Leber entstanden ist.',
  },
  {
    type: 'warning',
    title: 'Typische Prüfungsfalle',
    text: '„Tumor in der Leber“ sagt allein noch nicht, wo die Erkrankung begonnen hat. Es kann sich um einen primären Lebertumor oder um eine Metastase einer anderen Krebserkrankung handeln.',
  },
  ...practice('Primärtumor und Metastase', [
    { question: 'Was ist ein Primärtumor?', solution: 'Der Primärtumor ist der ursprüngliche Krebsherd, an dem die Krebserkrankung entstanden ist.' },
    { question: 'Was ist eine Metastase?', solution: 'Eine Metastase ist eine Absiedlung von Krebszellen an einer anderen Stelle im Körper.' },
    { question: 'Warum bleibt eine Lebermetastase eines Darmkarzinoms biologisch Darmkrebs?', solution: 'Weil die Metastase aus Darmkrebszellen besteht, auch wenn sie sich in der Leber befindet.' },
  ]),

  { type: 'heading', title: '6.4 TNM-System – wie weit hat sich die Erkrankung ausgebreitet?' },
  {
    type: 'text',
    text: 'Mit dem TNM-System beschreiben Ärztinnen und Ärzte die anatomische Ausbreitung vieler Krebserkrankungen. T bezieht sich auf den Primärtumor und beschreibt dessen Größe oder örtliche Ausdehnung. N beschreibt, ob regionale Lymphknoten betroffen sind. M zeigt, ob Fernmetastasen nachgewiesen wurden. Die Zahlen hinter T und N geben je nach Tumorart genauere Abstufungen an. Ein vorangestelltes p, zum Beispiel pT, bedeutet, dass die Einteilung auf einer feingeweblichen Untersuchung beruht.',
  },
  {
    type: 'table',
    headers: ['Kürzel', 'Denkfrage'],
    rows: [
      ['T', 'Wie groß oder örtlich ausgedehnt ist der Primärtumor?'],
      ['N', 'Sind regionale Lymphknoten betroffen?'],
      ['M', 'Gibt es Fernmetastasen?'],
    ],
  },
  ...practice('TNM', [
    { question: 'Wofür stehen T, N und M?', solution: 'T beschreibt den Primärtumor, N die regionalen Lymphknoten und M mögliche Fernmetastasen.' },
    { question: 'Was bedeutet M0 grundsätzlich?', solution: 'M0 bedeutet, dass keine Fernmetastasen nachgewiesen wurden.' },
    { question: 'Was sagt das p in einer Angabe wie pT2 aus?', solution: 'Das p zeigt, dass die Einteilung auf einer pathologischen beziehungsweise feingeweblichen Untersuchung beruht.' },
  ]),

  { type: 'video', title: 'Darmkrebs: Wie wird die Diagnose gestellt?', source: 'Stiftung Gesundheitswissen', duration: 'Kurzvideo', caption: 'Achte darauf, wie aus einem Verdacht schrittweise eine gesicherte Diagnose und eine Einschätzung der Ausbreitung wird.', embedUrl: 'https://www.youtube-nocookie.com/embed/xfsoz9Bixig' },

  { type: 'heading', title: '6.5 Krebstherapie – lokal behandeln oder den ganzen Körper erreichen?' },
  {
    type: 'text',
    text: 'Welche Behandlung eingesetzt wird, hängt unter anderem von Tumorart, Ausbreitung, Lage, biologischen Eigenschaften der Krebszellen und dem Allgemeinzustand der erkrankten Person ab. Operation und Strahlentherapie wirken vor allem lokal, also an einer bestimmten Körperstelle. Medikamentöse Therapien können dagegen im ganzen Körper wirken. Dazu gehören je nach Erkrankung beispielsweise Chemotherapie, zielgerichtete Medikamente oder Immuntherapien. Häufig werden mehrere Verfahren miteinander kombiniert.',
  },
  {
    type: 'table',
    headers: ['Therapieprinzip', 'Grundidee'],
    rows: [
      ['Operation', 'Tumorgewebe möglichst vollständig entfernen'],
      ['Strahlentherapie', 'Tumorzellen in einem festgelegten Gebiet schädigen'],
      ['Systemische Medikamente', 'Krebszellen über den Blutweg im Körper erreichen'],
    ],
  },
  ...practice('Therapie verstehen', [
    { question: 'Welche zwei Verfahren wirken vor allem lokal?', solution: 'Operation und Strahlentherapie wirken vor allem lokal an einer bestimmten Körperstelle.' },
    { question: 'Was bedeutet „systemische Therapie“?', solution: 'Eine systemische Therapie wirkt über den Blutweg im ganzen Körper und kann Krebszellen an verschiedenen Stellen erreichen.' },
    { question: 'Warum erhalten nicht alle Menschen mit Krebs dieselbe Behandlung?', solution: 'Die Behandlung hängt unter anderem von Tumorart, Ausbreitung, Lage, biologischen Eigenschaften und Allgemeinzustand ab.' },
  ]),

  { type: 'heading', title: '6.6 Tumoren im Verdauungstrakt – typische Warnzeichen einordnen' },
  {
    type: 'text',
    text: 'Krebserkrankungen im Verdauungstrakt verursachen besonders am Anfang oft keine eindeutigen Beschwerden. Deshalb ist nicht ein einzelnes Symptom entscheidend, sondern das Gesamtbild und die ärztliche Abklärung anhaltender Beschwerden. Beim Speiseröhrenkrebs können länger bestehende Schluckbeschwerden ein Warnsignal sein. Magenkrebs kann sich unter anderem durch anhaltende Oberbauchbeschwerden, Übelkeit, Appetitmangel oder Gewichtsverlust bemerkbar machen. Bei Darmkrebs können zum Beispiel Blut im Stuhl, länger veränderte Stuhlgewohnheiten oder Bauchbeschwerden auftreten. Diese Zeichen beweisen keine Krebserkrankung, sollten bei anhaltendem Auftreten aber abgeklärt werden.',
  },
  {
    type: 'info',
    title: 'Für die MFA wichtig',
    text: 'Die Aufgabe besteht nicht darin, aus einem Symptom selbst eine Krebsdiagnose zu stellen. Wichtig sind genaue Anamnese, das Erkennen von Warnzeichen, eine passende Terminsteuerung und die zuverlässige Vorbereitung weiterer Diagnostik.',
  },
  ...practice('Tumoren im Verdauungstrakt', [
    { question: 'Welches Warnzeichen kann bei einem Ösophaguskarzinom auftreten?', solution: 'Länger bestehende Schluckbeschwerden können ein Warnzeichen für ein Ösophaguskarzinom sein.' },
    { question: 'Welche Beschwerden können bei Magenkrebs auftreten?', solution: 'Möglich sind zum Beispiel anhaltende Oberbauchbeschwerden, Übelkeit, Appetitmangel oder Gewichtsverlust.' },
    { question: 'Welche Veränderungen können bei Darmkrebs auffallen?', solution: 'Möglich sind zum Beispiel Blut im Stuhl, länger veränderte Stuhlgewohnheiten oder anhaltende Bauchbeschwerden.' },
    { question: 'Warum darf ein einzelnes Symptom nicht mit einer sicheren Krebsdiagnose gleichgesetzt werden?', solution: 'Die Beschwerden sind oft unspezifisch und müssen im Gesamtbild ärztlich abgeklärt werden.' },
  ]),
];

export function polishLf9Topic6(module: LearningModule): LearningModule {
  if (module.id !== 'lf9') return module;
  return {
    ...module,
    topics: module.topics.map(topic => topic.id === 'lf9-06-tumore'
      ? { ...topic, title: '6. Tumore und Krebs im Verdauungstrakt – verständlich erklärt', content }
      : topic),
  };
}
