import type { LearningModule, QuizQuestion } from '@/types';
import { compareVisual, processVisual, cycleVisual } from './visualKit';

const emergencyFlow = processVisual('Erste Schritte bei einem medizinischen Notfall', [
  { title: 'Sicherheit', text: 'Eigenschutz, Umgebung und mögliche Gefahren beachten' },
  { title: 'Reaktion', text: 'ansprechen, Bewusstsein prüfen und Hilfe organisieren' },
  { title: 'Atmung', text: 'Atemwege öffnen und normale Atmung höchstens 10 Sekunden beurteilen' },
  { title: 'Notruf', text: '112 veranlassen und Praxis-Notfallteam aktivieren' },
  { title: 'Maßnahmen', text: 'je nach Befund stabile Seitenlage oder Wiederbelebung/AED' },
], 'Bei Unsicherheit über Lebensgefahr: Notruf 112.');

const bls = processVisual('Kreislaufstillstand beim Erwachsenen', [
  { title: 'Prüfen', text: 'keine Reaktion und keine normale Atmung beziehungsweise Zweifel daran' },
  { title: 'Rufen', text: '112 und AED organisieren; weitere Helfende einbeziehen' },
  { title: 'Drücken', text: 'sofort mit hochwertiger Herzdruckmassage beginnen' },
  { title: '30 : 2', text: '30 Kompressionen und 2 Beatmungen, wenn entsprechend geschult und möglich' },
  { title: 'AED', text: 'Gerät anschließen, Sprachanweisungen folgen und Unterbrechungen minimieren' },
], 'Fortführen, bis professionelle Hilfe übernimmt oder wieder normale Atmung einsetzt.');

const unconscious = compareVisual('Bewusstlosigkeit: Atmung entscheidet', [
  { title: 'Normale Atmung', lines: ['Atemwege freihalten', 'stabile Seitenlage', 'Notruf 112', 'fortlaufend Atmung und Bewusstsein kontrollieren', 'Wärmeerhalt und Betreuung'] },
  { title: 'Keine normale Atmung', lines: ['Kreislaufstillstand annehmen', 'Notruf 112 / AED', 'sofort Wiederbelebung', 'Unterbrechungen kurz halten', 'AED-Anweisungen befolgen'] },
]);

const warningSigns = compareVisual('Typische Notfallbilder erkennen', [
  { title: 'Herz / Kreislauf', lines: ['starker Brustschmerz', 'Atemnot', 'kalter Schweiß', 'Kollaps oder Bewusstlosigkeit', 'auffällige Hautfarbe'] },
  { title: 'Atmung / Allergie', lines: ['schwere Atemnot', 'pfeifende Atmung', 'Schwellung im Mund-/Halsbereich', 'rasche Kreislaufprobleme', 'ausgedehnte allergische Reaktion'] },
  { title: 'Neurologisch / Stoffwechsel', lines: ['Lähmung oder Sprachstörung', 'Krampfanfall', 'Verwirrtheit', 'starke Unterzuckerungszeichen', 'Bewusstseinsstörung'] },
]);

const practiceEmergency = cycleVisual('Notfallmanagement in der Praxis', [
  { title: 'Team', text: 'Rollen und Rufwege festlegen' },
  { title: 'Material', text: 'Notfallausrüstung kontrollieren' },
  { title: 'Training', text: 'Wiederbelebung regelmäßig üben' },
  { title: 'Dokumentation', text: 'Notfall und Maßnahmen festhalten' },
  { title: 'Auswertung', text: 'Ablauf nachbesprechen und verbessern' },
]);

const extraQuestions: QuizQuestion[] = [
  { id: 21, question: 'Eine Person reagiert nicht und atmet nicht normal. Was ist richtig?', type: 'single', options: [{id:'a',text:'erst 15 Minuten beobachten'},{id:'b',text:'Notruf/AED organisieren und sofort mit Wiederbelebung beginnen',correct:true},{id:'c',text:'nur Wasser geben'},{id:'d',text:'allein lassen'}], explanation: 'Keine Reaktion plus keine normale Atmung bedeutet: Kreislaufstillstand annehmen und unverzüglich handeln.', points: 3 },
  { id: 22, question: 'Wie lange wird die Atmung bei einer bewusstlosen Person höchstens kontrolliert?', type: 'single', options: [{id:'a',text:'10 Sekunden',correct:true},{id:'b',text:'2 Minuten'},{id:'c',text:'10 Minuten'},{id:'d',text:'30 Minuten'}], explanation: 'Die Atemkontrolle soll nicht unnötig verzögern und dauert höchstens etwa 10 Sekunden.', points: 2 },
  { id: 23, question: 'Welche Aussage zum AED ist richtig?', type: 'single', options: [{id:'a',text:'Nur Ärztinnen dürfen ihn berühren.'},{id:'b',text:'Anschließen und den Sprachanweisungen folgen; Wiederbelebung möglichst wenig unterbrechen.',correct:true},{id:'c',text:'Er ersetzt den Notruf.'},{id:'d',text:'Während er geholt wird, soll eine einzelne helfende Person die Wiederbelebung lange unterbrechen.'}], explanation: 'Der AED ergänzt die Wiederbelebung und führt durch klare Anweisungen.', points: 2 },
  { id: 24, question: 'Was ist bei Bewusstlosigkeit mit normaler Atmung wichtig?', type: 'multiple', options: [{id:'a',text:'stabile Seitenlage',correct:true},{id:'b',text:'Notruf 112',correct:true},{id:'c',text:'Atmung weiter beobachten',correct:true},{id:'d',text:'Essen einflößen'}], explanation: 'Atemwege müssen frei bleiben, der Rettungsdienst wird alarmiert und die Atmung wird weiter kontrolliert.', points: 3 },
  { id: 25, question: 'Welche Zeichen können auf einen lebensbedrohlichen Notfall hinweisen?', type: 'multiple', options: [{id:'a',text:'starker Brustschmerz und Atemnot',correct:true},{id:'b',text:'plötzliche Lähmung oder Sprachstörung',correct:true},{id:'c',text:'Bewusstlosigkeit',correct:true},{id:'d',text:'allergischer Schock',correct:true}], explanation: 'Diese Situationen gehören zu den typischen Gründen für den Notruf 112.', points: 4 },
  { id: 26, question: 'Was ist bei einem epileptischen Anfall grundsätzlich wichtig?', type: 'single', options: [{id:'a',text:'Betroffenen festhalten und etwas in den Mund stecken'},{id:'b',text:'vor Verletzungen schützen, Ruhe bewahren und bei langem/seriellem Anfall 112 rufen',correct:true},{id:'c',text:'sofort Essen geben'},{id:'d',text:'Anfall absichtlich stoppen'}], explanation: 'Schutz vor Verletzungen steht im Vordergrund; ein Anfall über 5 Minuten oder mehrere kurz hintereinander erfordern den Rettungsdienst.', points: 3 },
  { id: 27, question: 'Welche Symptome können bei einer ausgeprägten Hypoglykämie auftreten?', type: 'multiple', options: [{id:'a',text:'Schwitzen und Zittern',correct:true},{id:'b',text:'Verwirrtheit',correct:true},{id:'c',text:'Sprachprobleme',correct:true},{id:'d',text:'Bewusstlosigkeit',correct:true}], explanation: 'Unterzuckerung kann vegetative und neurologische Symptome bis zur Bewusstlosigkeit verursachen.', points: 4 },
  { id: 28, question: 'Was ist bei schwerer Atemnot oder einem starken Asthmaanfall richtig?', type: 'single', options: [{id:'a',text:'bei möglicher Lebensgefahr 112 veranlassen und nach Notfallplan handeln',correct:true},{id:'b',text:'Patient allein nach Hause schicken'},{id:'c',text:'Atemnot ignorieren'},{id:'d',text:'nur Termin für nächste Woche geben'}], explanation: 'Schwere Atemnot und starke Asthmaanfälle sind mögliche Notfälle.', points: 2 },
  { id: 29, question: 'Warum wird Notfalltraining in der Praxis regelmäßig wiederholt?', type: 'single', options: [{id:'a',text:'damit Rollen, Material und lebensrettende Abläufe im Ernstfall schnell funktionieren',correct:true},{id:'b',text:'nur für Dekoration'},{id:'c',text:'weil Dokumentation verboten ist'},{id:'d',text:'damit niemand 112 anruft'}], explanation: 'Seltene kritische Situationen müssen praktisch geübt werden, damit das Team koordiniert reagiert.', points: 2 },
  { id: 30, question: 'Nenne die drei einfachen Schritte der Wiederbelebungsbotschaft.', type: 'text', correctAnswer: 'prüfen,rufen,drücken', explanation: 'Prüfen – Rufen – Drücken ist die einfache Merkhilfe für einen Kreislaufstillstand.', points: 3 },
];

export function enhanceLf5(module: LearningModule): LearningModule {
  if (module.id !== 'lf5' || module.topics.some(topic => topic.id === 'notfall-grundlagen')) return module;
  return {
    ...module,
    title: 'Herz-Kreislauf, Atemwege, Notfälle & GOÄ',
    subtitle: 'Herz und Atmung verstehen, Vitalwerte beurteilen, Notfälle erkennen, Wiederbelebung und AED sicher einordnen sowie Grundlagen der Privatabrechnung',
    description: 'Herz-Kreislauf- und Atemwegsgrundlagen werden direkt mit dem Notfallmanagement der Arztpraxis verbunden. Kurze Videos, klare Algorithmen und Übungen bereiten auf typische Zwischenfälle vor.',
    topics: [
      ...module.topics,
      {
        id: 'notfall-grundlagen',
        title: '7. Notfall erkennen und strukturiert handeln',
        content: [
          { type: 'heading', title: 'Ein Notfall braucht einen klaren Ablauf' },
          { type: 'text', text: 'In einer Notfallsituation werden zuerst Eigenschutz und Umgebung beachtet. Danach wird geprüft, ob die Person reagiert und normal atmet. Lebensbedrohliche Symptome, Bewusstlosigkeit oder Zweifel an einer normalen Atmung erfordern sofortige Hilfe, Alarmierung und die passenden Basismaßnahmen. Die MFA arbeitet dabei nach dem Notfallplan der Praxis und innerhalb ihrer Qualifikation.' },
          { type: 'image', src: emergencyFlow, alt: 'Erste Schritte bei einem medizinischen Notfall', caption: 'Sicherheit, Reaktion und Atmung bestimmen die nächsten Schritte.' },
          { type: 'image', src: warningSigns, alt: 'Warnzeichen verschiedener Notfälle', caption: 'Notfälle können sich über Kreislauf, Atmung oder neurologische Auffälligkeiten zeigen.' },
          { type: 'video', title: 'Wann muss ich den Notruf wählen?', source: 'gesund.bund.de / Stiftung Gesundheitswissen', caption: 'Achte auf Atemnot, Bewusstlosigkeit, Herzinfarkt- und Schlaganfallzeichen sowie allergischen Schock.', url: 'https://gesund.bund.de/wege-im-gesundheitswesen/erwachsenenleben/alter/notfaelle/notruf-und-notaufnahme' },
          { type: 'warning', title: 'Notruf 112', text: 'Bei schweren Krankheitszeichen, Bewusstlosigkeit, schwerer Atemnot oder wenn Lebensgefahr nicht sicher ausgeschlossen werden kann, wird der Notruf veranlasst.' },
        ],
      },
      {
        id: 'bewusstlosigkeit-reanimation',
        title: '8. Bewusstlosigkeit, Wiederbelebung und AED',
        content: [
          { type: 'heading', title: 'Bewusstlosigkeit: normale Atmung oder Kreislaufstillstand?' },
          { type: 'image', src: unconscious, alt: 'Bewusstlosigkeit mit und ohne normale Atmung', caption: 'Die Atmung entscheidet über stabile Seitenlage oder Wiederbelebung.' },
          { type: 'text', text: 'Bei Bewusstlosigkeit werden die Atemwege geöffnet und die Atmung durch Sehen, Hören und Fühlen höchstens zehn Sekunden kontrolliert. Ist normale Atmung vorhanden, wird die Person stabil gelagert, der Notruf veranlasst und fortlaufend beobachtet. Fehlt normale Atmung oder bestehen Zweifel, wird von einem Kreislaufstillstand ausgegangen.' },
          { type: 'video', title: 'Bewusstlosigkeit – richtig reagieren', source: 'Deutsches Rotes Kreuz', caption: 'Beobachte Ansprechen, Atemkontrolle, stabile Seitenlage und erneute Kontrolle.', url: 'https://www.drk.de/hilfe-in-deutschland/erste-hilfe/atmung/atemkontrolle/' },
          { type: 'heading', title: 'Herz-Lungen-Wiederbelebung' },
          { type: 'image', src: bls, alt: 'Wiederbelebung beim Erwachsenen', caption: 'Aktueller Grundablauf: Kreislaufstillstand erkennen, alarmieren, drücken/beatmen und AED einsetzen.' },
          { type: 'text', text: 'Bei einem erwachsenen Menschen ohne normale Atmung werden Notruf und AED organisiert und sofort Wiederbelebungsmaßnahmen begonnen. Das klassische Verhältnis beträgt 30 Herzdruckmassagen zu 2 Beatmungen. Der AED wird angeschlossen, sobald er verfügbar ist; seinen Sprachanweisungen wird gefolgt. Unterbrechungen der Herzdruckmassage werden möglichst kurz gehalten.' },
          { type: 'video', title: 'Herz-Lungen-Wiederbelebung', source: 'Deutsches Rotes Kreuz', caption: 'Das DRK zeigt Atemkontrolle, Herzdruckmassage, Beatmung und AED-Einsatz.', url: 'https://www.drk.de/hilfe-in-deutschland/erste-hilfe/herz-lungen-wiederbelebung/' },
          { type: 'video', title: 'Reanimationsleitlinien 2025 und Überlebenskette', source: 'German Resuscitation Council (GRC)', caption: 'Nutze die aktuellen Poster und das Video zur Überlebenskette als Lernstandard für Wiederbelebung.', url: 'https://www.grc-org.de/wissenschaft/leitlinien' },
        ],
      },
      {
        id: 'typische-zwischenfaelle',
        title: '9. Typische Zwischenfälle in der Arztpraxis',
        content: [
          { type: 'heading', title: 'Synkope und Bewusstseinsstörung' },
          { type: 'text', text: 'Ein kurzer Kreislaufkollaps kann harmlos sein, muss aber von gefährlichen Ursachen unterschieden werden. Reaktion, Atmung, Kreislaufzeichen, Beschwerden und Verlauf werden rasch erfasst. Bei Bewusstlosigkeit, fehlender normaler Atmung oder anderen Warnzeichen wird sofort nach Notfallalgorithmus gehandelt.' },
          { type: 'heading', title: 'Anaphylaxie' },
          { type: 'text', text: 'Eine schwere allergische Reaktion kann Haut- und Schleimhautreaktionen, Atemnot und starke Kreislaufprobleme verursachen. Ein allergischer Schock ist ein Notfall. Das Praxisteam alarmiert unverzüglich und arbeitet den ärztlich festgelegten Notfallstandard einschließlich bereitgehaltener Notfallmedikation ab.' },
          { type: 'heading', title: 'Asthmaanfall und schwere Atemnot' },
          { type: 'text', text: 'Asthma kann anfallsartig zu pfeifender Atmung, Husten und Atemnot führen. Schwere Atemnot oder ein starker Asthmaanfall kann lebensbedrohlich sein. Der Patient wird nicht allein gelassen; ärztliche Hilfe und bei schwerem Verlauf der Rettungsdienst werden organisiert.' },
          { type: 'video', title: 'Was ist Asthma?', source: 'gesund.bund.de', caption: 'Achte auf verengte Atemwege, typische Beschwerden und die Bedeutung eines Notfallplans.', url: 'https://gesund.bund.de/asthma' },
          { type: 'heading', title: 'Hypoglykämie' },
          { type: 'text', text: 'Eine Unterzuckerung kann sich unter anderem durch Schwitzen, Zittern, Heißhunger, Unruhe, Verwirrtheit oder Sprachstörungen zeigen und bis zur Bewusstlosigkeit führen. Bewusstseinslage und Schluckfähigkeit sind entscheidend für das weitere Vorgehen; bewusstlosen Personen wird nichts zu essen oder zu trinken eingeflößt.' },
          { type: 'heading', title: 'Krampfanfall' },
          { type: 'text', text: 'Während eines epileptischen Anfalls wird die Person vor Verletzungen geschützt, ohne sie gewaltsam festzuhalten oder Gegenstände in den Mund zu stecken. Dauert ein Anfall länger als fünf Minuten oder treten mehrere Anfälle kurz hintereinander auf, ist der Rettungsdienst zu alarmieren.' },
          { type: 'video', title: 'Epilepsie: Was tun bei einem Anfall?', source: 'gesund.bund.de', caption: 'Achte auf Verletzungsschutz und die Kriterien für den Notruf.', url: 'https://gesund.bund.de/epilepsie' },
        ],
      },
      {
        id: 'notfallorganisation',
        title: '10. Notfallausrüstung, Training und Teamorganisation',
        content: [
          { type: 'heading', title: 'Notfallkompetenz ist Teamarbeit' },
          { type: 'image', src: practiceEmergency, alt: 'Notfallmanagement als Qualitätskreislauf', caption: 'Materialkontrolle und Training gehören ebenso dazu wie der eigentliche Notfall.' },
          { type: 'text', text: 'Notfälle sind selten und gerade deshalb müssen Abläufe trainiert sein. Jede Praxis braucht klare Zuständigkeiten, einen verlässlichen Notrufweg, regelmäßig kontrollierte Notfallausrüstung und ein Team, das die Basismaßnahmen praktisch übt.' },
          { type: 'list', items: ['Notfallnummern und Praxisadresse gut sichtbar bereithalten', 'AED und Notfallmaterial nach Praxisstandard kontrollieren', 'Verfallsdaten und Funktionsfähigkeit regelmäßig prüfen', 'Rollen im Team festlegen: Patient, Notruf, Material, Dokumentation', 'Wiederbelebung praktisch trainieren', 'nach einem Notfall Ablauf und Verbesserungsmöglichkeiten besprechen'] },
          { type: 'video', title: 'Reanimationstraining 2026 – Materialien', source: 'German Resuscitation Council (GRC)', caption: 'Nutze Poster und Trainingsmaterialien für praktische Wiederholungen im Unterricht.', url: 'https://www.grc-org.de/medien/infomaterialien-downloads' },
        ],
      },
    ],
    questions: [...module.questions, ...extraQuestions],
  };
}
