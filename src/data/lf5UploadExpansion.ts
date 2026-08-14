import type { LearningModule, QuizQuestion } from '@/types';
import { compareVisual, processVisual } from './visualKit';

const pulseVisual = compareVisual('Puls: Ruhe, Belastung und Einflussfaktoren', [
  { title: 'Ruhepuls', lines: ['Erwachsene in der Unterlage: 60–80/min', 'Sportler können deutlich niedriger liegen', 'immer Rhythmus und Situation mitbeurteilen'] },
  { title: 'Pulserhöhung', lines: ['körperliche Anstrengung', 'Stress und Aufregung', 'Fieber', 'Schmerzen', 'Schilddrüsenüberfunktion'] },
  { title: 'Pulssenkung', lines: ['Ruhe und Schlaf', 'Entspannung', 'Sportlerherz', 'Schilddrüsenunterfunktion', 'Kühlung'] },
]);

const heartCrossSection = processVisual('Blutweg durch die vier Herzhöhlen', [
  { title: 'Rechter Vorhof', text: 'nimmt sauerstoffarmes Blut aus den Hohlvenen auf' },
  { title: 'Rechte Kammer', text: 'pumpt das Blut über die Lungenarterie zur Lunge' },
  { title: 'Linker Vorhof', text: 'nimmt sauerstoffreiches Blut aus den Lungenvenen auf' },
  { title: 'Linke Kammer', text: 'pumpt das Blut über die Aorta in den Körper' },
], 'Arterie = vom Herzen weg · Vene = zum Herzen hin');

const airwayFunctions = compareVisual('Atemwege: Aufbau und Schutz', [
  { title: 'Obere Atemwege', lines: ['Nasenhöhle und Nasennebenhöhlen', 'Mundhöhle', 'Pharynx', 'Larynx', 'erwärmen, befeuchten, filtern'] },
  { title: 'Untere Atemwege', lines: ['Trachea', 'Hauptbronchien', 'Bronchien', 'Bronchiolen', 'Alveolen als Ort des Gasaustauschs'] },
  { title: 'Schleim-Flimmer-Apparat', lines: ['Becherzellen bilden Schleim', 'Kinozilien bewegen Schleim Richtung Rachen', 'Partikel und Keime werden abtransportiert', 'wichtiger Schutzmechanismus'] },
]);

const goaeFrames = compareVisual('GOÄ-Gebührenrahmen aus der Lernunterlage', [
  { title: 'Großer Rahmen', lines: ['Regelspanne bis 2,3-fach', 'maximal 3,5-fach', 'über 2,3-fach Begründung', 'Schwierigkeit, Zeit, Umstände'] },
  { title: 'Mittlerer Rahmen', lines: ['Abschnitte A, E, O', 'Schwellenwert 1,8-fach', 'maximal 2,5-fach', 'Begründung oberhalb Schwellenwert'] },
  { title: 'Labor', lines: ['Abschnitt M', 'Schwellenwert 1,15-fach', 'maximal 1,3-fach', 'reduzierter Gebührenrahmen'] },
]);

const treatmentCase = processVisual('Behandlungsfall Schritt für Schritt', [
  { title: 'Diagnose prüfen', text: 'geht es um dieselbe Erkrankung?' },
  { title: 'Zeitraum prüfen', text: 'ein Behandlungsfall dauert in der Unterlage einen Monat' },
  { title: 'Leistungen prüfen', text: 'bereits angesetzte Nummern und allgemeine Bestimmungen beachten' },
  { title: 'Neu abrechnen', text: 'neuer Behandlungsfall nach Ablauf des maßgeblichen Zeitraums' },
], 'Nicht nur das Datum ansehen: Erkrankung, Zeitraum und bereits berechnete Leistungen zusammen prüfen.');

const sourceQuestions: Omit<QuizQuestion, 'id'>[] = [
  { question: 'Welche Herzhöhle empfängt das sauerstoffarme Blut aus den Hohlvenen?', type: 'single', options: [{id:'a',text:'rechter Vorhof',correct:true},{id:'b',text:'linker Vorhof'},{id:'c',text:'linke Kammer'},{id:'d',text:'Aorta'}], explanation: 'Das sauerstoffarme Blut aus dem Körper gelangt über die Vena cava in den rechten Vorhof.', points: 2 },
  { question: 'Welche Reihenfolge beschreibt den Weg zur Lunge richtig?', type: 'single', options: [{id:'a',text:'Vena cava → rechter Vorhof → rechte Kammer → Lungenarterie',correct:true},{id:'b',text:'Aorta → linker Vorhof → rechte Kammer → Lungenvene'},{id:'c',text:'Lungenvene → rechter Vorhof → Aorta'},{id:'d',text:'Vena cava → linker Vorhof → Aorta'}], explanation: 'So fließt sauerstoffarmes Blut aus dem Körper zur Lunge.', points: 3 },
  { question: 'Warum ist die linke Herzkammer stärker bemuskelt als die rechte?', type: 'single', options: [{id:'a',text:'Sie muss Blut mit höherem Druck durch den gesamten Körperkreislauf pumpen.',correct:true},{id:'b',text:'Sie enthält immer weniger Blut.'},{id:'c',text:'Sie pumpt nur bis zur Lunge.'},{id:'d',text:'Sie hat keine Herzklappen.'}], explanation: 'Der Körperkreislauf erfordert einen deutlich höheren Pumpdruck als der kurze Lungenkreislauf.', points: 2 },
  { question: 'Was ist die wichtigste Regel zum Unterschied zwischen Arterie und Vene?', type: 'single', options: [{id:'a',text:'Arterien führen immer sauerstoffreiches Blut.'},{id:'b',text:'Venen führen immer sauerstoffarmes Blut.'},{id:'c',text:'Arterien führen vom Herzen weg, Venen zum Herzen hin.',correct:true},{id:'d',text:'Arterien liegen immer oberflächlich.'}], explanation: 'Deshalb ist die Lungenarterie sauerstoffarm und die Lungenvene sauerstoffreich.', points: 2 },
  { question: 'Welche Messstelle wird in der Unterlage am häufigsten für die Pulsmessung genannt?', type: 'single', options: [{id:'a',text:'A. radialis',correct:true},{id:'b',text:'Aorta'},{id:'c',text:'Vena cava'},{id:'d',text:'Lungenvene'}], explanation: 'Die A. radialis liegt oberflächlich am Handgelenk und ist gut tastbar.', points: 2 },
  { question: 'Welche Faktoren können den Puls erhöhen?', type: 'multiple', options: [{id:'a',text:'körperliche Anstrengung',correct:true},{id:'b',text:'Fieber',correct:true},{id:'c',text:'Stress',correct:true},{id:'d',text:'Schmerzen',correct:true}], explanation: 'Alle vier Faktoren sind in der Lernunterlage als pulserhöhend aufgeführt.', points: 4 },
  { question: 'Warum haben gut trainierte Sportler häufig einen niedrigeren Ruhepuls?', type: 'single', options: [{id:'a',text:'Das trainierte Herz kann pro Schlag mehr Blut fördern und muss daher seltener schlagen.',correct:true},{id:'b',text:'Weil Sportler weniger Blut besitzen.'},{id:'c',text:'Weil ihre Arterien keinen Puls haben.'},{id:'d',text:'Weil das Herz im Sport stillsteht.'}], explanation: 'Ein höheres Schlagvolumen erlaubt eine niedrigere Herzfrequenz bei gleicher Förderleistung.', points: 2 },
  { question: 'Was beschreibt der systolische Blutdruck?', type: 'single', options: [{id:'a',text:'Druck während der Herzkontraktion',correct:true},{id:'b',text:'Druck nur während des Schlafs'},{id:'c',text:'Druck in der Lunge'},{id:'d',text:'Pulsfrequenz pro Minute'}], explanation: 'Der systolische Wert ist der erste Wert und entsteht während der Pump-/Kontraktionsphase.', points: 2 },
  { question: 'Was beschreibt der diastolische Blutdruck?', type: 'single', options: [{id:'a',text:'Druck während der Erholungs- und Füllungsphase des Herzens',correct:true},{id:'b',text:'maximalen Belastungspuls'},{id:'c',text:'Sauerstoffgehalt der Alveolen'},{id:'d',text:'Punktwert der GOÄ'}], explanation: 'Der diastolische Wert ist der zweite Blutdruckwert.', points: 2 },
  { question: 'Welche drei Funktionen der oberen Atemwege werden in den Aufgaben besonders verlangt?', type: 'multiple', options: [{id:'a',text:'Erwärmen',correct:true},{id:'b',text:'Befeuchten',correct:true},{id:'c',text:'Filtern',correct:true},{id:'d',text:'Blut bilden'}], explanation: 'Nase und obere Atemwege bereiten die Atemluft durch Erwärmung, Befeuchtung und Filterung auf.', points: 3 },
  { question: 'Wo findet der Gasaustausch statt?', type: 'single', options: [{id:'a',text:'Alveolen',correct:true},{id:'b',text:'Kehlkopf'},{id:'c',text:'Nasenhöhle'},{id:'d',text:'Speiseröhre'}], explanation: 'Die Alveolen sind von Kapillaren umgeben und bilden die Austauschfläche für O₂ und CO₂.', points: 2 },
  { question: 'In welche Richtung diffundiert Sauerstoff beim Gasaustausch?', type: 'single', options: [{id:'a',text:'aus der Alveole in das Blut',correct:true},{id:'b',text:'aus dem Blut in die Alveole'},{id:'c',text:'aus dem Herzen in die Trachea'},{id:'d',text:'aus der Nase in die Vena cava'}], explanation: 'Sauerstoff gelangt aus der eingeatmeten Luft durch die dünne Barriere in das Kapillarblut.', points: 2 },
  { question: 'Warum sind Alveolen- und Kapillarwand sehr dünn?', type: 'single', options: [{id:'a',text:'Damit der Diffusionsweg kurz ist und Gase schnell ausgetauscht werden können.',correct:true},{id:'b',text:'Damit kein Blut fließt.'},{id:'c',text:'Damit Schleim produziert wird.'},{id:'d',text:'Damit die Lunge härter wird.'}], explanation: 'Eine kurze Diffusionsstrecke erleichtert den effizienten Gasaustausch.', points: 2 },
  { question: 'Was tun die Kinozilien des Flimmerepithels?', type: 'single', options: [{id:'a',text:'Sie transportieren den mit Partikeln beladenen Schleim in Richtung Rachen.',correct:true},{id:'b',text:'Sie pumpen Blut.'},{id:'c',text:'Sie bilden rote Blutkörperchen.'},{id:'d',text:'Sie schließen die Herzklappen.'}], explanation: 'Der Schleim-Flimmer-Apparat reinigt die Atemwege.', points: 2 },
  { question: 'Wie lautet die Grundformel einer GOÄ-Berechnung?', type: 'single', options: [{id:'a',text:'Punkte × Punktwert × Steigerungsfaktor',correct:true},{id:'b',text:'Alter × Puls × Blutdruck'},{id:'c',text:'Euro ÷ Minuten'},{id:'d',text:'Punkte + Diagnose'}], explanation: 'Aus Punktzahl, Punktwert und Faktor wird der Gebührenbetrag berechnet.', points: 3 },
  { question: 'Welcher Schwellenwert wird in der Unterlage für den großen Gebührenrahmen genannt?', type: 'single', options: [{id:'a',text:'2,3-fach',correct:true},{id:'b',text:'1,0-fach'},{id:'c',text:'1,15-fach'},{id:'d',text:'5,0-fach'}], explanation: 'Bis 2,3-fach liegt die Regelspanne; darüber ist eine Begründung erforderlich.', points: 2 },
  { question: 'Welche Kriterien können nach der Unterlage einen höheren Steigerungsfaktor begründen?', type: 'multiple', options: [{id:'a',text:'Schwierigkeit',correct:true},{id:'b',text:'Zeitaufwand',correct:true},{id:'c',text:'besondere Umstände bei der Ausführung',correct:true},{id:'d',text:'Lieblingsfarbe des Patienten'}], explanation: 'Die Unterlage nennt Schwierigkeit, Zeitaufwand und Umstände der Ausführung.', points: 3 },
  { question: 'Welchen maximalen Faktor nennt die Unterlage für Laborleistungen des Abschnitts M?', type: 'single', options: [{id:'a',text:'1,3-fach',correct:true},{id:'b',text:'2,3-fach'},{id:'c',text:'3,5-fach'},{id:'d',text:'5,0-fach'}], explanation: 'Für Laborleistungen ist der Gebührenrahmen reduziert.', points: 2 },
  { question: 'Was muss man bei einem Behandlungsfall gemeinsam prüfen?', type: 'multiple', options: [{id:'a',text:'Erkrankung/Diagnose',correct:true},{id:'b',text:'Zeitraum',correct:true},{id:'c',text:'bereits abgerechnete Leistungen',correct:true},{id:'d',text:'Schuhgröße'}], explanation: 'Nur aus diesen Angaben lässt sich beurteilen, welche Leistungen noch angesetzt werden dürfen.', points: 3 },
  { question: 'Welche Aussage zum Behandlungsfall entspricht der Lernunterlage?', type: 'single', options: [{id:'a',text:'Bei derselben Erkrankung wird der Zeitraum von einem Monat betrachtet.',correct:true},{id:'b',text:'Jeder Praxisbesuch ist automatisch ein neuer Behandlungsfall.'},{id:'c',text:'Ein Behandlungsfall dauert immer ein Jahr.'},{id:'d',text:'Die Diagnose spielt keine Rolle.'}], explanation: 'Die Unterlage arbeitet mit einem Monatszeitraum für dieselbe Erkrankung.', points: 2 },
];

export function expandLf5FromUploads(module: LearningModule): LearningModule {
  if (module.id !== 'lf5' || module.topics.some(topic => topic.id === 'lf5-upload-vitalwerte')) return module;
  const startId = Math.max(0, ...module.questions.map(question => question.id)) + 1;
  const questions: QuizQuestion[] = sourceQuestions.map((question, index) => ({ ...question, id: startId + index }));

  return {
    ...module,
    description: 'Umfangreicher Lernkurs mit Herz-Kreislauf-System, Atemwegen, Notfallmanagement und GOÄ. Die zusätzlichen Lern- und Übungsunterlagen sind vollständig als Erklärungen, Schaubilder, Rechenwege, Fallfragen und Musterlösungen eingebaut.',
    topics: [
      ...module.topics,
      {
        id: 'lf5-upload-vitalwerte',
        title: '11. Vitalwerte vertiefen: Puls und Blutdruck sicher beurteilen',
        content: [
          { type: 'heading', title: 'Puls ist mehr als nur eine Zahl' },
          { type: 'text', text: 'Beim Puls werden Frequenz und Rhythmus im Zusammenhang mit der Situation betrachtet. Die Lernunterlage nennt für Erwachsene einen Ruhebereich von 60–80 Schlägen pro Minute. Körperliche Belastung, Stress, Fieber und Schmerzen können die Frequenz erhöhen; Ruhe, Schlaf und ein trainiertes Sportlerherz können sie senken.' },
          { type: 'image', src: pulseVisual, alt: 'Vergleich von Ruhepuls, Pulserhöhung und Pulssenkung', caption: 'Die Einflussfaktoren aus dem Lernmaterial als Übersicht.' },
          { type: 'heading', title: 'Pulsmessung an der A. radialis' },
          { type: 'list', items: ['Patient möglichst ruhig sitzen oder liegen lassen.', 'A. radialis auf der Daumenseite des Handgelenks mit Zeige-, Mittel- und Ringfinger ertasten.', 'Nicht mit dem Daumen messen, weil der eigene Daumenpuls stören kann.', 'Mindestens 30 Sekunden zählen und bei regelmäßigem Puls auf eine Minute hochrechnen.', 'Bei unregelmäßigem Puls eine volle Minute messen und Auffälligkeiten weitergeben.'] },
          { type: 'heading', title: 'Blutdruck lesen' },
          { type: 'text', text: 'Der erste Wert ist der systolische Druck während der Kontraktion des Herzens. Der zweite Wert ist der diastolische Druck während der Erholungs- und Füllungsphase. Die Aufgaben verlangen nicht nur das Ablesen, sondern auch die Begründung, warum dauerhaft erhöhte Werte Gefäße und Organe belasten können.' },
          { type: 'info', title: 'Übungslogik aus den Zusatzaufgaben', text: 'Diagramme werden nicht nur abgelesen. Du sollst Werte vergleichen, Differenzen berechnen und anschließend erklären, warum sich Puls oder Blutdruck unter verschiedenen Bedingungen verändern.' },
        ],
      },
      {
        id: 'lf5-upload-herzanatomie',
        title: '12. Herzquerschnitt und Blutfluss beschreiben',
        content: [
          { type: 'image', src: heartCrossSection, alt: 'Blutfluss durch die vier Herzhöhlen', caption: 'Die vier Herzhöhlen und ihre Aufgabe müssen sicher zugeordnet werden.' },
          { type: 'table', headers: ['Struktur', 'Aufgabe'], rows: [['Rechter Vorhof','nimmt sauerstoffarmes Blut aus den Hohlvenen auf'],['Rechte Kammer','pumpt sauerstoffarmes Blut über die Lungenarterie zur Lunge'],['Linker Vorhof','nimmt sauerstoffreiches Blut aus den Lungenvenen auf'],['Linke Kammer','pumpt sauerstoffreiches Blut über die Aorta in den Körper']] },
          { type: 'heading', title: 'Warum ist die linke Kammer dicker?' },
          { type: 'text', text: 'Die linke Herzkammer muss das Blut gegen einen deutlich höheren Widerstand durch den gesamten Körperkreislauf pumpen. Die rechte Kammer versorgt dagegen nur den nahe gelegenen Lungenkreislauf. Deshalb besitzt die linke Kammer eine kräftigere Muskelschicht.' },
          { type: 'info', title: 'Prüfungsfalle Lungengefäße', text: 'Die Namen richten sich nach der Flussrichtung zum oder vom Herzen. Die Lungenarterie führt sauerstoffarmes Blut vom Herzen zur Lunge; die Lungenvene bringt sauerstoffreiches Blut zum Herzen zurück.' },
        ],
      },
      {
        id: 'lf5-upload-atemwege',
        title: '13. Atemweg, Flimmerepithel und Gasaustausch komplett',
        content: [
          { type: 'image', src: airwayFunctions, alt: 'Obere und untere Atemwege mit Schutzfunktion', caption: 'Der Luftweg und die Schutzfunktionen werden gemeinsam gelernt.' },
          { type: 'heading', title: 'Der Weg der Atemluft' },
          { type: 'text', text: 'Nase beziehungsweise Mund → Rachen (Pharynx) → Kehlkopf (Larynx) → Luftröhre (Trachea) → Hauptbronchien → Bronchien → Bronchiolen → Alveolen. In den Alveolen endet die reine Luftleitung und der eigentliche Gasaustausch beginnt.' },
          { type: 'heading', title: 'Schleim-Flimmer-Apparat' },
          { type: 'text', text: 'Becherzellen bilden Schleim, der Staub, Keime und andere Fremdpartikel bindet. Die Kinozilien bewegen diesen Schleim wellenförmig in Richtung Rachen. Dort kann er abgehustet oder verschluckt werden.' },
          { type: 'heading', title: 'Gasaustausch' },
          { type: 'text', text: 'Sauerstoff diffundiert aus der Alveolenluft in das Blut. Kohlendioxid diffundiert aus dem Blut in die Alveole und wird ausgeatmet. Die sehr dünne Alveolar- und Kapillarwand verkürzt den Diffusionsweg und macht den Austausch effizient.' },
          { type: 'info', title: 'Was die Zusatzaufgaben verlangen', text: 'Nicht nur Begriffe auswendig lernen: Du musst die Funktionen der oberen Atemwege erklären, den Luftweg ordnen, den Gasaustausch in eigenen Worten beschreiben und begründen, warum dünne Wände dafür wichtig sind.' },
        ],
      },
      {
        id: 'lf5-upload-goae',
        title: '14. GOÄ rechnen: Punkte, Faktoren und Gebührenrahmen',
        content: [
          { type: 'heading', title: 'Rechenweg' },
          { type: 'text', text: 'Die Unterlagen rechnen nach dem Schema: Punktzahl × Punktwert × Steigerungsfaktor. Als Lernwert wird ein Punktwert von 5,828 Cent verwendet. Erst wird aus den Punkten der einfache Gebührensatz berechnet, anschließend wird mit dem gewählten Faktor multipliziert.' },
          { type: 'image', src: goaeFrames, alt: 'Vergleich der GOÄ-Gebührenrahmen', caption: 'Großer, mittlerer und Labor-Gebührenrahmen aus dem Lernmaterial.' },
          { type: 'table', headers: ['Rahmen laut Unterlage', 'Schwellenwert', 'Maximaler Faktor'], rows: [['Großer Gebührenrahmen','2,3-fach','3,5-fach'],['Abschnitte A, E, O','1,8-fach','2,5-fach'],['Labor Abschnitt M','1,15-fach','1,3-fach']] },
          { type: 'heading', title: 'Wann braucht man eine Begründung?' },
          { type: 'text', text: 'Wird der jeweilige Schwellenwert überschritten, muss die Steigerung anhand der Schwierigkeit, des Zeitaufwands oder besonderer Umstände bei der Ausführung begründet werden. In den Aufgaben wird genau dieses Prinzip auf Fallbeispiele angewendet.' },
          { type: 'info', title: 'Rechenübung wie in der Unterlage', text: 'Bei mehreren Leistungen können zunächst die Punkte addiert werden. Danach wird die Summe mit Punktwert und Faktor multipliziert. Schreibe den Rechenweg immer sichtbar hin, damit Rundungsfehler nachvollziehbar bleiben.' },
        ],
      },
      {
        id: 'lf5-upload-behandlungsfall',
        title: '15. GOÄ-Behandlungsfälle als Zeitstrahl lösen',
        content: [
          { type: 'image', src: treatmentCase, alt: 'Schritte zur Prüfung eines Behandlungsfalls', caption: 'Diagnose, Zeitraum und bereits abgerechnete Leistungen entscheiden gemeinsam.' },
          { type: 'text', text: 'Die Übungen arbeiten mit mehreren Behandlungsterminen derselben Erkrankung. Entscheidend ist, ob sie noch demselben Behandlungsfall zugeordnet werden und welche Nummern bereits angesetzt wurden. Ein neuer Termin bedeutet also nicht automatisch einen neuen Behandlungsfall.' },
          { type: 'heading', title: 'Arbeitsmethode für Fallfragen' },
          { type: 'list', items: ['Erste Behandlung und Diagnose markieren.', 'Alle Folgetermine auf einem Zeitstrahl eintragen.', 'Prüfen, ob dieselbe Erkrankung vorliegt.', 'Prüfen, ob der maßgebliche Monatszeitraum überschritten ist.', 'Erst danach entscheiden, welche GOÄ-Nummern erneut berechnet werden können.'] },
          { type: 'warning', title: 'Quellenbezogen lernen', text: 'Die Beispiele und Datumsregeln in diesem Abschnitt folgen den hochgeladenen LF5-Unterlagen und dienen dem Prüfungstraining. Bei realer Abrechnung gelten die aktuelle GOÄ und die konkreten allgemeinen Bestimmungen.' },
        ],
      },
    ],
    questions: [...module.questions, ...questions],
  };
}
