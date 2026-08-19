import type { LearningModule, LearningTopic, QuizQuestion, TopicContent } from '@/types';

type CuratedCheck = {
  question: string;
  correct: string | string[];
  wrong: string[];
  challenge?: boolean;
};

const check = (question: string, correct: string | string[], wrong: string[], challenge = false): CuratedCheck => ({
  question,
  correct,
  wrong,
  challenge,
});

const encode = (item: CuratedCheck) => {
  const correct = (Array.isArray(item.correct) ? item.correct : [item.correct]).join('&&&');
  return [item.question, correct, ...item.wrong].join('|||');
};

const overviewChecks: Record<string, CuratedCheck[]> = {
  'lf9-01-naehrstoffe': [
    check('Welche Aussagen zu den Nährstoffgruppen sind richtig?', [
      'Kohlenhydrate dienen dem Körper vor allem als verfügbare Energiequelle.',
      'Proteine liefern Aminosäuren als Bau- und Funktionsstoffe.',
      'Fette dienen unter anderem als Energiespeicher und sind für die Aufnahme der Vitamine A, D, E und K wichtig.',
    ], ['Vitamine sind die wichtigste direkte Energiequelle des Körpers.', 'Mineralstoffe werden im Körper zu Glukose abgebaut.']),
    check('Welche Aussage zu Vitaminen und Mineralstoffen trifft zu?', 'Sie liefern keine Energie, sind aber für viele Körperfunktionen und Stoffwechselprozesse wichtig.', [
      'Sie liefern mehr Energie als Fette.', 'Sie bestehen grundsätzlich aus Aminosäuren.', 'Sie werden nur für die Verdauung von Stärke benötigt.', 'Sie sind für den Körper grundsätzlich entbehrlich.',
    ]),
  ],
  'lf9-02-verdauungsorgane': [
    check('Welche Zuordnungen zum Verdauungsweg sind richtig?', [
      'Im Mund beginnt die mechanische Zerkleinerung und bereits ein Teil der Kohlenhydratverdauung.',
      'Im Magen wird Nahrung durchmischt und die Proteinverdauung beginnt.',
      'Der Dünndarm ist der wichtigste Ort für Endverdauung und Nährstoffaufnahme.',
      'Der Dickdarm gewinnt vor allem Wasser und Elektrolyte zurück.',
    ], ['Die Speiseröhre ist der Hauptort der Nährstoffaufnahme.', 'Der Enddarm produziert die Gallenflüssigkeit.']),
    check('Wo findet der größte Teil der Nährstoffaufnahme statt?', 'Im Dünndarm.', ['Im Mund.', 'In der Speiseröhre.', 'Im Enddarm.', 'In der Gallenblase.']),
  ],
  'lf9-03-diagnostik': [
    check('Welche Untersuchungsmethoden passen zu den genannten Fragestellungen?', [
      'Sonografie kann Organe von außen mit Schallwellen darstellen.',
      'Gastroskopie ermöglicht die direkte Beurteilung der Schleimhaut und die Entnahme von Gewebeproben.',
      'Laborwerte können Hinweise auf Organfunktion oder Entzündung geben.',
      'Ein Stuhltest kann verborgenes Blut nachweisen.',
    ], ['Ein EKG zeigt die Magenschleimhaut direkt.', 'Eine Gastroskopie arbeitet mit Röntgenstrahlen durch die Bauchdecke.']),
    check('Welche Methode eignet sich besonders, wenn die Magenschleimhaut direkt betrachtet werden soll?', 'Eine Gastroskopie.', ['Eine reine Blutdruckmessung.', 'Ein Hörtest.', 'Eine Spirometrie.', 'Ein EKG.']),
  ],
  'lf9-04-oberer-gi-trakt': [
    check('Welche Zuordnungen sind fachlich richtig?', [
      'Reflux bedeutet Rückfluss von saurem Mageninhalt in die Speiseröhre.',
      'Gastritis ist eine Entzündung der Magenschleimhaut.',
      'Ein Ulkus ist ein tieferer Gewebsdefekt, bei dem auch Blutungen auftreten können.',
      'Bei Laktoseintoleranz fehlt beziehungsweise vermindert sich das Enzym Laktase.',
    ], ['Laktoseintoleranz ist grundsätzlich eine Milcheiweißallergie.', 'Gastritis bedeutet eine Entzündung des Wurmfortsatzes.']),
    check('Welche Aussage unterscheidet Gastritis und Ulkus am besten?', 'Bei einer Gastritis ist vor allem die Magenschleimhaut entzündet; ein Ulkus reicht als Defekt tiefer in das Gewebe.', [
      'Beide Begriffe bedeuten exakt dasselbe.', 'Ein Ulkus betrifft ausschließlich den Dickdarm.', 'Eine Gastritis ist immer eine Krebserkrankung.', 'Ein Ulkus kann grundsätzlich nicht bluten.',
    ]),
  ],
  'lf9-05-unterer-gi-trakt': [
    check('Welche Aussagen zum unteren Magen-Darm-Trakt sind richtig?', [
      'Divertikulose bedeutet, dass Divertikel vorhanden sind, ohne dass sie entzündet sein müssen.',
      'Divertikulitis bedeutet eine Entzündung von Divertikeln.',
      'Bei einer Appendizitis ist typischerweise der Wurmfortsatz entzündet.',
      'Ein akutes Abdomen ist ein Warnkomplex und erfordert eine rasche ärztliche Abklärung.',
    ], ['Divertikulitis ist nur ein anderer Begriff für Reflux.', 'Ein akutes Abdomen ist immer harmlos und kann ohne Abklärung abgewartet werden.']),
    check('Welche Situation ist ein Warnbild und sollte rasch ärztlich beurteilt werden?', 'Starke Bauchschmerzen mit Abwehrspannung und Kreislaufproblemen.', [
      'Leichter Hunger vor dem Mittagessen.', 'Einmaliges Aufstoßen ohne weitere Beschwerden.', 'Normale Darmgeräusche ohne Schmerzen.', 'Kurzzeitiges Völlegefühl nach einer großen Mahlzeit.',
    ]),
  ],
  'lf9-06-tumore': [
    check('Welche Aussagen zu Tumoren und Krebs sind richtig?', [
      'Gutartige Tumoren bilden keine Metastasen.',
      'Bösartige Tumoren können in Nachbargewebe einwachsen und Metastasen bilden.',
      'Das TNM-System beschreibt Primärtumor, regionale Lymphknoten und Fernmetastasen.',
    ], ['Jeder Tumor ist automatisch Krebs.', 'Eine Metastase ist immer der ursprüngliche Entstehungsort der Erkrankung.']),
    check('Welche Aussage zur Krebstherapie trifft zu?', 'Je nach Erkrankung können lokal wirkende und im ganzen Körper wirkende Behandlungen miteinander kombiniert werden.', [
      'Jede Krebserkrankung wird mit genau derselben Therapie behandelt.', 'Eine Operation wirkt immer im gesamten Körper.', 'Eine systemische Behandlung wirkt ausschließlich an einer einzelnen Körperstelle.', 'Das Tumorstadium spielt für die Therapieentscheidung keine Rolle.',
    ]),
  ],
  'lf9-07-leber-galle-pankreas': [
    check('Welche Zuordnungen sind richtig?', [
      'Die Leber bildet Galle und übernimmt zentrale Stoffwechselaufgaben.',
      'Die Gallenblase speichert und konzentriert Galle.',
      'Das Pankreas bildet Verdauungsenzyme und Bicarbonat sowie unter anderem Insulin und Glukagon.',
    ], ['Die Gallenblase produziert Insulin.', 'Die Leber speichert die Nahrung bis zur Defäkation.']),
    check('Warum können Gallensteine eine Pankreatitis begünstigen?', 'Ein Stein kann im gemeinsamen Abflussbereich den Abfluss von Pankreassekret behindern.', [
      'Gallensteine erhöhen direkt den Blutzucker und zerstören dadurch das Pankreas.', 'Ein Stein blockiert grundsätzlich die Luftröhre.', 'Gallensteine lösen ausschließlich eine Gastritis aus.', 'Die Gallenblase wandelt den Stein in Verdauungsenzyme um.',
    ]),
  ],
  'lf9-08-metabolisch': [
    check('Welche Aussagen zu Stoffwechselrisiken sind richtig?', [
      'Zentrale Adipositas erhöht das Stoffwechselrisiko.',
      'Dauerhaft hohes LDL kann Arteriosklerose begünstigen.',
      'Eine Hyperurikämie kann zur Bildung von Uratkristallen und zu Gicht führen.',
    ], ['HDL ist ein Verdauungsenzym des Magens.', 'Gicht entsteht durch einen Mangel an Magensäure.']),
    check('Warum ist die Kombination mehrerer Risikofaktoren besonders ungünstig?', 'Weil sich die Risiken gegenseitig verstärken und dadurch das Herz-Kreislauf-Risiko deutlich steigen kann.', [
      'Weil mehrere Risikofaktoren sich grundsätzlich gegenseitig aufheben.', 'Weil dadurch nur die Verdauung im Magen langsamer wird.', 'Weil ausschließlich die Körpergröße beeinflusst wird.', 'Weil mehrere Risikofaktoren immer zu niedrigen Blutfetten führen.',
    ]),
  ],
  'lf9-09-diabetes-grundlagen': [
    check('Welche Aussagen zur Blutzuckerregulation sind richtig?', [
      'Insulin fördert die Aufnahme und Speicherung von Glukose und senkt dadurch den Blutzucker.',
      'Glukagon fördert in Nüchternphasen die Bereitstellung von Glukose und kann den Blutzucker erhöhen.',
      'Bei Typ-1-Diabetes entsteht durch die Zerstörung der Betazellen ein absoluter Insulinmangel.',
      'Bei Typ-2-Diabetes steht zunächst häufig eine verminderte Wirkung von Insulin an den Körperzellen im Vordergrund.',
    ], ['Insulin und Glukagon senken den Blutzucker immer gleichzeitig.', 'Typ-2-Diabetes beginnt grundsätzlich mit einem vollständigen Fehlen von Insulin.']),
    check('Welche Aussage beschreibt den grundlegenden Unterschied zwischen Typ 1 und Typ 2 am besten?', 'Bei Typ 1 fehlt Insulin durch die Zerstörung der Betazellen; bei Typ 2 reagieren die Zellen zunächst schlechter auf vorhandenes Insulin.', [
      'Bei beiden Formen fehlt von Beginn an immer vollständig Insulin.', 'Typ 1 entsteht ausschließlich durch Bewegungsmangel.', 'Typ 2 betrifft ausschließlich Kinder.', 'Bei Typ 1 reagieren die Zellen lediglich etwas schlechter auf normal vorhandenes Insulin.',
    ]),
  ],
  'lf9-10-diabetes-diagnostik': [
    check('Welche Aussagen zu Diagnostik und Verlauf bei Diabetes sind richtig?', [
      'Der OGTT prüft die Reaktion auf eine definierte Glukosebelastung.',
      'Der HbA1c gibt Hinweise auf die längerfristige Blutzuckerbelastung.',
      'Eine schwere Unter- oder Überzuckerung kann ein medizinischer Notfall sein.',
      'Langfristig können unter anderem Gefäße, Nerven, Augen, Nieren und Füße geschädigt werden.',
    ], ['Der HbA1c zeigt ausschließlich den Blutzucker der letzten fünf Minuten.', 'Ein OGTT dient zur direkten Darstellung der Magenschleimhaut.']),
    check('Welcher Wert beschreibt eher die längerfristige Blutzuckerbelastung als einen einzelnen Moment?', 'Der HbA1c.', ['Der Puls.', 'Die Körpertemperatur.', 'Die GGT allein.', 'Die Atemfrequenz.']),
  ],
};

const topicChecks: Record<string, CuratedCheck[][]> = {
  'lf9-01-naehrstoffe': [
    [
      check('Welche Zuordnungen zu Kohlenhydraten sind richtig?', ['Glukose ist ein Einfachzucker.', 'Laktose ist ein Zweifachzucker.', 'Stärke ist ein Mehrfachzucker.'], ['Stärke wird unverändert durch die Darmwand aufgenommen.', 'Laktose ist ein Protein.']),
      check('Warum muss Stärke vor der Aufnahme verdaut werden?', 'Die großen Stärkemoleküle müssen in kleine, aufnehmbare Zuckerbausteine gespalten werden.', ['Stärke muss zuerst in Aminosäuren umgewandelt werden.', 'Stärke kann nur in der Gallenblase aufgenommen werden.', 'Die Verdauung macht Stärke größer, damit sie die Darmwand passieren kann.', 'Stärke wird ausschließlich im Enddarm aufgenommen.']),
    ],
    [
      check('Welche Aufgaben können Proteine im Körper übernehmen?', ['Sie dienen dem Aufbau und der Erneuerung von Gewebe.', 'Viele Enzyme und Transportproteine bestehen aus Proteinen.', 'Antikörper bestehen aus Proteinen.'], ['Proteine sind der Gallenfarbstoff des Körpers.', 'Proteine dienen ausschließlich als schnelle Zuckerenergie.']),
      check('Was bedeutet „essenziell“ bei einer Aminosäure?', 'Der Körper kann sie nicht in ausreichender Menge selbst herstellen, deshalb muss sie mit der Nahrung aufgenommen werden.', ['Sie kann vom Körper unbegrenzt selbst gebildet werden.', 'Sie wird nur für die Gallenproduktion benötigt.', 'Sie ist immer ein Vitamin.', 'Sie darf nicht mit der Nahrung aufgenommen werden.']),
    ],
    [
      check('Aus welchen Bausteinen besteht ein Triglycerid?', ['Aus einem Glycerolmolekül.', 'Aus drei Fettsäuren.'], ['Aus drei Aminosäuren.', 'Aus einem Molekül Hämoglobin.', 'Nur aus Glukose.']),
      check('Welche Aufgabe hat die Galle bei der Fettverdauung?', 'Sie verteilt große Fettmengen in kleine Tröpfchen und vergrößert damit die Angriffsfläche für die Lipase.', ['Sie ist selbst das wichtigste fettspaltende Enzym.', 'Sie wandelt Fett direkt in Aminosäuren um.', 'Sie wird im Magen gebildet und spaltet dort Proteine.', 'Sie verhindert grundsätzlich die Aufnahme fettlöslicher Vitamine.']),
    ],
    [
      check('Welche Aussagen zu Vitaminen sind richtig?', ['Die Vitamine A, D, E und K sind fettlöslich.', 'Vitamin C und die B-Vitamine sind wasserlöslich.'], ['Alle Vitamine liefern direkt Energie.', 'Vitamin C gehört zu den fettlöslichen Vitaminen.', 'Vitamin D gehört zu den wasserlöslichen B-Vitaminen.']),
      check('Warum ist die Aussage „Vitamine liefern Energie“ falsch?', 'Vitamine unterstützen zahlreiche Körper- und Stoffwechselprozesse, gehören aber nicht zu den energieliefernden Nährstoffen.', ['Vitamine werden ausschließlich zur Energiegewinnung verbrannt.', 'Vitamine bestehen immer aus Fett.', 'Vitamine können vom Körper grundsätzlich nicht genutzt werden.', 'Nur Vitamin C liefert Energie, alle anderen nicht.']),
    ],
    [
      check('Welche Zuordnungen zu Mineralstoffen und Spurenelementen sind richtig?', ['Calcium ist wichtig für Knochen und Zähne.', 'Eisen wird für den Sauerstofftransport im Hämoglobin benötigt.', 'Magnesium ist unter anderem für Muskel- und Nervenfunktion wichtig.', 'Jod wird für die Bildung von Schilddrüsenhormonen benötigt.'], ['Eisen bildet die Magensäure.', 'Jod ist das wichtigste Verdauungsenzym im Dünndarm.']),
      check('Warum kann Eisenmangel zu Müdigkeit beitragen?', 'Wenn zu wenig Eisen für Hämoglobin zur Verfügung steht, kann der Sauerstofftransport beeinträchtigt sein.', ['Eisenmangel führt dazu, dass die Gallenblase keine Galle mehr speichert.', 'Eisen ist ausschließlich für die Verdauung von Fetten zuständig.', 'Eisenmangel erhöht immer unmittelbar den Blutzucker.', 'Eisen bildet die Nervenenden im Dickdarm.']),
    ],
    [
      check('Welche drei Makronährstoffe liefern Energie?', ['Kohlenhydrate.', 'Proteine.', 'Fette.'], ['Vitamine.', 'Mineralstoffe.']),
      check('Wo werden die klein gespaltenen Nährstoffbausteine hauptsächlich aufgenommen?', 'Im Dünndarm.', ['Im Enddarm.', 'In der Speiseröhre.', 'In der Gallenblase.', 'In der Luftröhre.']),
    ],
  ],

  'lf9-02-verdauungsorgane': [
    [
      check('Welche Reihenfolge beschreibt den Weg der Nahrung richtig?', 'Mund → Speiseröhre → Magen → Dünndarm → Dickdarm → Enddarm.', ['Mund → Dickdarm → Magen → Dünndarm → Enddarm.', 'Magen → Mund → Dünndarm → Speiseröhre.', 'Speiseröhre → Mund → Magen → Dickdarm.', 'Mund → Magen → Speiseröhre → Dünndarm → Dickdarm.']),
      check('Was bedeutet Resorption?', 'Kleine, gelöste Nährstoffbausteine werden durch die Darmwand in Blut oder Lymphe aufgenommen.', ['Nahrung wird ausschließlich mechanisch zerkleinert.', 'Stuhl wird im Magen gespeichert.', 'Galle wird in der Speiseröhre produziert.', 'Enzyme werden vollständig aus dem Körper ausgeschieden.']),
    ],
    [
      check('Welche Aufgabe hat die Speichelamylase?', 'Sie beginnt bereits im Mund mit der Spaltung von Stärke.', ['Sie spaltet Proteine im Magen.', 'Sie bildet Galle in der Leber.', 'Sie speichert Stuhl im Mastdarm.', 'Sie senkt als Hormon den Blutzucker.']),
      check('Wozu dient der Kehldeckel beim Schlucken?', 'Er verschließt den Eingang zur Luftröhre, damit Nahrung in Richtung Speiseröhre gelangt.', ['Er produziert Magensäure.', 'Er nimmt die meisten Nährstoffe auf.', 'Er speichert Gallenflüssigkeit.', 'Er bildet Insulin.']),
    ],
    [
      check('Welche Aussagen zum Magen sind richtig?', ['Pepsin beginnt die Proteinverdauung.', 'Salzsäure schafft ein stark saures Milieu.', 'Eine Schleimbarriere schützt die Magenwand vor Selbstschädigung.'], ['Der Magen ist der Hauptort der Nährstoffresorption.', 'Der Magen bildet Insulin.']),
      check('Welche Aufgabe hat der Pylorus?', 'Er gibt den Speisebrei portionsweise aus dem Magen in den Zwölffingerdarm weiter.', ['Er transportiert Nahrung aus dem Mund in die Speiseröhre.', 'Er produziert die Gallenflüssigkeit.', 'Er nimmt Sauerstoff ins Blut auf.', 'Er speichert den Stuhl bis zur Defäkation.']),
    ],
    [
      check('Warum besitzt der Dünndarm Falten, Zotten und Mikrovilli?', 'Sie vergrößern die Oberfläche und ermöglichen dadurch eine besonders effektive Nährstoffaufnahme.', ['Sie verkleinern die Oberfläche, damit weniger Nährstoffe aufgenommen werden.', 'Sie dienen ausschließlich der Speicherung von Stuhl.', 'Sie produzieren die Gallenflüssigkeit.', 'Sie verhindern jede Bewegung des Speisebreis.']),
      check('Welche Abschnitte gehören zum Dünndarm?', ['Duodenum.', 'Jejunum.', 'Ileum.'], ['Sigma.', 'Rektum.']),
    ],
    [
      check('Welche Organ-Funktions-Zuordnungen sind richtig?', ['Die Leber bildet Galle.', 'Die Gallenblase speichert und konzentriert Galle.', 'Das Pankreas liefert Verdauungsenzyme und Bicarbonat.'], ['Die Gallenblase bildet Insulin.', 'Das Pankreas speichert den Stuhl.']),
      check('Welche Aufgabe hat Bicarbonat im Dünndarm?', 'Es hilft, den sauren Speisebrei aus dem Magen zu neutralisieren und schafft damit günstigere Bedingungen für Verdauungsenzyme.', ['Es macht den Speisebrei noch saurer.', 'Es spaltet ausschließlich Proteine.', 'Es wird als Stuhl im Enddarm gespeichert.', 'Es transportiert Sauerstoff im Blut.']),
    ],
    [
      check('Welche Aufgaben übernimmt der Dickdarm vor allem?', ['Er gewinnt Wasser zurück.', 'Er gewinnt Elektrolyte zurück und dickt den Darminhalt ein.'], ['Er ist der Hauptort der Proteinverdauung.', 'Er produziert Insulin.', 'Er bildet die Gallenflüssigkeit.']),
      check('Welche Hauptaufgabe hat der Mastdarm?', 'Er speichert den Stuhl bis zur Defäkation.', ['Er bildet Magensäure.', 'Er resorbiert den größten Teil der Nährstoffe.', 'Er produziert Galle.', 'Er beginnt die Stärkeverdauung.']),
    ],
    [
      check('Welche Enzym-Nährstoff-Zuordnungen sind richtig?', ['Amylase wirkt auf Kohlenhydrate.', 'Pepsin beziehungsweise Proteasen wirken auf Proteine.', 'Lipase wirkt auf Fette.'], ['Lipase spaltet ausschließlich Mineralstoffe.', 'Pepsin ist ein blutzuckersenkendes Hormon.']),
      check('Warum muss Nahrung überhaupt verdaut werden?', 'Große Nährstoffmoleküle müssen in kleine Bausteine zerlegt werden, damit sie über die Darmwand aufgenommen werden können.', ['Nahrung muss verdaut werden, damit alle Nährstoffe größer werden.', 'Verdauung findet nur statt, um Wasser aus dem Körper zu entfernen.', 'Nur Vitamine müssen vor der Aufnahme gespalten werden.', 'Die Verdauung dient ausschließlich der Stuhlspeicherung.']),
    ],
  ],

  'lf9-03-diagnostik': [
    [
      check('Welche Übersetzungen der Fachbegriffe sind richtig?', ['Nausea bedeutet Übelkeit.', 'Emesis bedeutet Erbrechen.', 'Diarrhö bedeutet Durchfall.', 'Obstipation bedeutet Verstopfung.'], ['Exsikkose bedeutet Fieber.', 'Ileus bedeutet Sodbrennen.']),
      check('Welche Aussagen zu Meteorismus und Flatulenz sind richtig?', ['Meteorismus beschreibt einen geblähten beziehungsweise aufgetriebenen Bauch.', 'Flatulenz bezeichnet den vermehrten Abgang von Darmgasen.'], ['Meteorismus bedeutet Darmverschluss.', 'Flatulenz bedeutet Schluckstörung.', 'Beide Begriffe bedeuten eine Entzündung der Magenschleimhaut.']),
    ],
    [
      check('Welche Reihenfolge beschreibt die Entstehung eines Ultraschallbildes richtig?', 'Schallkopf sendet Schallwellen → Gewebe reflektiert → Schallkopf empfängt Echos → Gerät berechnet ein Bild.', ['Gewebe sendet Röntgenstrahlen → Schallkopf speichert sie → Bild entsteht.', 'Kamera wird in den Magen eingeführt → Licht wird reflektiert → Ultraschallbild entsteht.', 'Schallkopf misst nur die Körpertemperatur → Bild entsteht.', 'Blut wird entnommen → Labor berechnet daraus ein Ultraschallbild.']),
      check('Welche Aussagen zur Sonografie stimmen?', ['Sie arbeitet ohne ionisierende Röntgenstrahlung.', 'Der Schallkopf kann Schallwellen senden und zurückkehrende Echos empfangen.', 'Unterschiedliche Gewebe reflektieren Schall unterschiedlich.'], ['Bei jeder Sonografie wird ein Endoskop geschluckt.', 'Luft ist grundsätzlich das am besten darstellbare Medium für Ultraschall.']),
    ],
    [
      check('Welchen Weg nimmt ein Gastroskop bei einer üblichen Magenspiegelung?', 'Mund → Speiseröhre → Magen → Zwölffingerdarm.', ['Mund → Luftröhre → Lunge → Magen.', 'After → Dickdarm → Magen.', 'Nase → Harnblase → Magen.', 'Mund → Dickdarm → Speiseröhre.']),
      check('Welche Möglichkeiten bietet eine Gastroskopie?', ['Die Schleimhaut kann direkt betrachtet werden.', 'Gewebeproben können entnommen werden.', 'Bestimmte Blutungen können endoskopisch behandelt werden.'], ['Die Leber wird dabei von außen mit Schallwellen untersucht.', 'Sie misst ausschließlich den Blutdruck.']),
    ],
    [
      check('Welche Zuordnungen zu Laborwerten sind richtig?', ['Lipase passt besonders zum Pankreas.', 'Bilirubin ist ein Gallenfarbstoff.', 'INR gibt Hinweise auf die Blutgerinnung.', 'GGT wird im Leber- und Galle-Kontext genutzt.'], ['TSH ist der wichtigste Pankreaswert.', 'HbA1c ist ein direkter Ultraschallbefund.']),
      check('Warum werden bei Oberbauchbeschwerden oft mehrere passende Laborwerte gemeinsam betrachtet?', 'Weil unterschiedliche Werte Hinweise auf verschiedene Organe und Funktionen geben und ein einzelner Wert selten die gesamte Ursache erklärt.', ['Weil alle Laborwerte immer exakt dasselbe messen.', 'Weil nur durch viele Werte eine Gastroskopie ersetzt werden kann.', 'Weil ein einzelner Laborwert grundsätzlich nie verändert sein kann.', 'Weil Laborwerte ausschließlich die Körpertemperatur bestimmen.']),
    ],
    [
      check('Was kann ein immunologischer Stuhltest nachweisen?', 'Nicht sichtbares beziehungsweise verborgenes Blut im Stuhl.', ['Den aktuellen Blutdruck.', 'Die Größe der Leber.', 'Die Sauerstoffsättigung.', 'Eine Fraktur des Beckens.']),
      check('Welche Schritte gehören zu einer korrekten Stuhlprobenentnahme?', ['Stuhl wird möglichst sauber aufgefangen.', 'Material wird entsprechend dem Test an mehreren Stellen aufgenommen.', 'Der Probenstab wird anschließend in das vorgesehene Röhrchen zurückgegeben.'], ['Die Probe wird aus dem Toilettenwasser geschöpft.', 'Das Röhrchen wird vor der Probenentnahme mit Leitungswasser gefüllt.']),
    ],
  ],

  'lf9-04-oberer-gi-trakt': [
    [
      check('Welche Aussagen zu einer infektiösen Gastroenteritis sind richtig?', ['Viren können eine Ursache sein.', 'Bakterien können eine Ursache sein.', 'Erbrechen und Durchfall können zu erheblichem Flüssigkeits- und Elektrolytverlust führen.'], ['Eine Gastroenteritis betrifft ausschließlich die Lunge.', 'Flüssigkeitsverlust spielt bei starkem Durchfall keine Rolle.']),
      check('Warum stehen Flüssigkeit und Elektrolyte bei starkem Erbrechen und Durchfall im Vordergrund?', 'Die verlorene Flüssigkeit und Salze müssen ersetzt werden, um eine Austrocknung und Kreislaufprobleme zu verhindern.', ['Damit die Magensäure vollständig entfernt wird.', 'Damit der Blutzucker grundsätzlich auf null sinkt.', 'Weil Elektrolyte die einzige Ursache jeder Infektion sind.', 'Damit kein Stuhl mehr gebildet wird.']),
    ],
    [
      check('Welche Aussagen erklären eine Laktoseintoleranz richtig?', ['Es ist zu wenig Laktase vorhanden.', 'Ungespaltene Laktose gelangt in den Dickdarm.', 'Bakterien verwerten dort Laktose und bilden Gase.', 'Ungespaltener Zucker kann Wasser in den Darm ziehen.'], ['Es handelt sich immer um eine Milcheiweißallergie.', 'Die Beschwerden entstehen durch einen vollständigen Insulinmangel.']),
      check('Welche Beschwerden können bei Laktoseintoleranz auftreten?', ['Blähungen.', 'Bauchschmerzen.', 'Durchfall.'], ['Eine typische Gelbsucht.', 'Eine dauerhafte Bewusstlosigkeit als Leitsymptom.']),
    ],
    [
      check('Wie entsteht Reflux am ehesten?', 'Wenn der Verschluss zwischen Magen und Speiseröhre nicht ausreichend funktioniert, kann saurer Mageninhalt in die Speiseröhre zurückfließen.', ['Wenn der Wurmfortsatz entzündet ist.', 'Wenn die Gallenblase zu viel Insulin produziert.', 'Wenn der Dickdarm vollständig die Proteinverdauung übernimmt.', 'Wenn die Lunge zu wenig Luft enthält.']),
      check('Warum kann häufiger Reflux zu einer Ösophagitis führen?', 'Die Schleimhaut der Speiseröhre ist nicht so gut gegen Magensäure geschützt und kann durch wiederholten Säurekontakt gereizt und entzündet werden.', ['Die Speiseröhre produziert bei Reflux automatisch Gallensteine.', 'Säurekontakt macht die Speiseröhrenschleimhaut grundsätzlich widerstandsfähiger.', 'Eine Ösophagitis entsteht nur durch einen Knochenbruch.', 'Reflux verhindert jeden Kontakt zwischen Säure und Speiseröhre.']),
    ],
    [
      check('Was beschreibt eine Gastritis?', 'Eine Entzündung der Magenschleimhaut.', ['Eine Entzündung des Wurmfortsatzes.', 'Einen tiefen Defekt des gesamten Dickdarms.', 'Einen Gallenstein im Pankreasgang.', 'Eine Unterzuckerung.']),
      check('Welche Beschwerden können bei einer Gastritis auftreten?', ['Oberbauchschmerzen.', 'Übelkeit.', 'Appetitlosigkeit.'], ['Typischerweise eine schmerzlose Unterarmfraktur.', 'Ausschließlich vermehrtes Wasserlassen.']),
    ],
    [
      check('Worin liegt der wichtigste Unterschied zwischen Gastritis und Ulkus?', 'Eine Gastritis ist vor allem eine Entzündung der Magenschleimhaut; ein Ulkus ist ein tieferer Gewebsdefekt.', ['Ein Ulkus betrifft ausschließlich die Speiseröhre.', 'Eine Gastritis ist immer tiefer als ein Ulkus.', 'Beide Begriffe bedeuten exakt dasselbe.', 'Ein Ulkus kann grundsätzlich keine Blutung verursachen.']),
      check('Welche Aussagen zur Gastroskopie bei einem blutenden Ulkus sind richtig?', ['Sie kann die Blutungsquelle direkt sichtbar machen.', 'Bestimmte Blutungen können während der Endoskopie behandelt werden.'], ['Sie kann die Magenschleimhaut grundsätzlich nicht sehen.', 'Sie dient ausschließlich zur Messung des Blutzuckers.', 'Sie ersetzt bei jeder Blutung automatisch alle weiteren Maßnahmen.']),
    ],
  ],

  'lf9-05-unterer-gi-trakt': [
    [
      check('Was beschreibt eine Divertikulose?', 'Es sind Divertikel vorhanden, ohne dass diese automatisch entzündet sein müssen.', ['Alle Divertikel sind akut entzündet.', 'Der Wurmfortsatz ist entzündet.', 'Es liegt immer ein Darmverschluss vor.', 'Es handelt sich um einen Rückfluss von Magensäure.']),
      check('Warum kann eine Divertikulose zufällig entdeckt werden?', 'Sie kann lange ohne oder mit nur geringen Beschwerden bestehen.', ['Sie verursacht immer sofort hohes Fieber.', 'Sie führt grundsätzlich zu einer Bewusstlosigkeit.', 'Sie ist nur während einer Schwangerschaft vorhanden.', 'Sie lässt sich nur über den Blutzucker feststellen.']),
    ],
    [
      check('Welche Aussagen sprechen für eine Divertikulitis?', ['Mindestens ein Divertikel ist entzündet.', 'Fieber kann auftreten.', 'Bei einer Perforation kann eine Peritonitis entstehen.'], ['Eine Divertikulitis bedeutet lediglich beschwerdefreie Divertikel.', 'Sie betrifft ausschließlich die Speiseröhre.']),
      check('Welche Komplikationen können bei einer schweren Divertikulitis auftreten?', ['Perforation mit nachfolgender Peritonitis.', 'Ein Ileus.'], ['Laktoseintoleranz.', 'Reflux als zwingende Folge.', 'Eine Mittelohrentzündung.']),
    ],
    [
      check('Welche Struktur ist bei einer typischen Appendizitis entzündet?', 'Der Wurmfortsatz, die Appendix vermiformis.', ['Die gesamte Leber.', 'Die Gallenblase.', 'Der Mastdarm.', 'Die Speiseröhre.']),
      check('Welcher Schmerzverlauf passt zu einer Appendizitis?', 'Die Schmerzen können zunächst diffus oder um den Nabel beginnen und später in den rechten Unterbauch wandern.', ['Die Schmerzen beginnen immer im linken Arm und wandern zum Ohr.', 'Typisch ist ausschließlich schmerzloser Ikterus.', 'Die Schmerzen bleiben grundsätzlich nur im rechten Oberbauch.', 'Appendizitis verursacht nie Bauchschmerzen.']),
    ],
    [
      check('Welche Zeichen können zu einem akuten Abdomen passen?', ['Starke Bauchschmerzen.', 'Abwehrspannung.', 'Übelkeit oder Erbrechen.', 'Kreislaufstörungen.'], ['Leichter Hunger ohne weitere Beschwerden.', 'Einmaliges Gähnen.']),
      check('Wie sollte eine MFA bei einem möglichen akuten Abdomen reagieren?', 'Warnzeichen erkennen und eine rasche ärztliche beziehungsweise notfallmedizinische Beurteilung veranlassen.', ['Selbstständig eine endgültige Diagnose stellen und die Person nach Hause schicken.', 'Mehrere Stunden ohne Rücksprache abwarten.', 'Nur einen neuen Routinetermin in einigen Monaten vergeben.', 'Das Warnbild ignorieren, solange kein Fieber besteht.']),
    ],
    [
      check('Welche Funktion hat das Hämorrhoidalpolster im Normalzustand?', 'Es unterstützt den Feinverschluss des Analkanals.', ['Es produziert Galle.', 'Es bildet Insulin.', 'Es ist der Hauptort der Nährstoffaufnahme.', 'Es transportiert Nahrung zum Magen.']),
      check('Welche Beschwerden können bei einem Hämorrhoidalleiden auftreten?', ['Juckreiz.', 'Nässen.', 'Ekzeme.', 'Blutungen.'], ['Typischerweise eine Gallenkolik.', 'Eine akute Unterzuckerung als Leitsymptom.']),
    ],
    [
      check('Welche Diagnose passt bei bekannten Divertikeln, neuem linken Unterbauchschmerz, Fieber und Durchfall am besten?', 'Eine Divertikulitis.', ['Eine reine beschwerdefreie Divertikulose.', 'Eine Refluxkrankheit.', 'Eine Hypoglykämie.', 'Eine Laktoseintoleranz ohne weitere Hinweise.']),
      check('Welche Aussagen passen zu hellem Blut am Toilettenpapier und Juckreiz am After?', ['Ein Hämorrhoidalleiden kommt als Ursache infrage.', 'Eine Proktoskopie kann zur direkten Beurteilung des Analkanals eingesetzt werden.'], ['Die Beschwerden beweisen sicher einen Magenulkus.', 'Zur Abklärung wird grundsätzlich nur ein EKG benötigt.', 'Hämorrhoiden befinden sich im Magen.']),
    ],
  ],

  'lf9-07-leber-galle-pankreas': [
    [
      check('Welche Aussagen passen zu einer Gallenkolik?', ['Die Schmerzen können krampfartig oder wellenförmig im rechten Oberbauch auftreten.', 'Ein Stein kann zeitweise einen Gallengang blockieren.'], ['Eine Gallenkolik entsteht grundsätzlich durch Insulinmangel.', 'Sie betrifft typischerweise nur den linken Unterarm.', 'Gallensteine verursachen immer Beschwerden.']),
      check('Welche Komplikationen können mit Gallensteinen zusammenhängen?', ['Cholezystitis.', 'Verschlussikterus.', 'Pankreatitis.'], ['Reflux als zwingende Folge.', 'Laktoseintoleranz.']),
    ],
    [
      check('Warum kann ein Gallenstein eine Pankreatitis begünstigen?', 'Ein Stein kann im gemeinsamen Abflussbereich den Abfluss des Pankreassekrets behindern.', ['Der Stein erhöht direkt die Produktion von Magensäure.', 'Der Stein gelangt in die Lunge und blockiert dort die Atmung.', 'Der Stein wandelt sich in Insulin um.', 'Die Gallenblase beginnt dadurch Proteine zu verdauen.']),
      check('Welche Untersuchungen passen bei Verdacht auf eine durch Gallensteine ausgelöste Pankreatitis?', ['Die Lipase kann als Pankreas-Laborwert bestimmt werden.', 'Eine Sonografie des Oberbauchs kann nach Gallensteinen und Abflussproblemen suchen.'], ['Ein Hörtest ist die wichtigste Untersuchung.', 'Eine Audiometrie zeigt den Gallengang direkt.', 'Nur der HbA1c beweist eine Pankreatitis.']),
    ],
    [
      check('Was ist mit „Selbstverdauung“ bei einer Pankreatitis gemeint?', 'Verdauungsenzyme werden zu früh aktiv beziehungsweise können nicht richtig abfließen und schädigen dadurch Pankreasgewebe.', ['Das Pankreas nimmt Nahrung direkt aus dem Magen auf.', 'Die Bauchspeicheldrüse wird ausschließlich durch Magensäure verdaut.', 'Insulin spaltet das Pankreas in Aminosäuren.', 'Die Gallenblase ersetzt das Pankreas vollständig.']),
      check('Welche Faktoren können eine akute Pankreatitis begünstigen?', ['Gallensteine.', 'Starker Alkoholkonsum.'], ['Eine normale Nahrungsaufnahme.', 'Eine Laktoseintoleranz als alleinige Ursache.', 'Ein unkomplizierter Schnupfen als typische Hauptursache.']),
    ],
    [
      check('Welche Aufgaben übernimmt die Leber?', ['Sie bildet Galle.', 'Sie verarbeitet und speichert Nährstoffe.', 'Sie bildet zahlreiche Eiweiße einschließlich Gerinnungsfaktoren.', 'Sie verändert beziehungsweise entgiftet viele Stoffe.'], ['Sie ist der Hauptspeicherort für Stuhl.', 'Sie beginnt die mechanische Zerkleinerung der Nahrung.']),
      check('Warum kann eine schwere Lebererkrankung den INR beeinflussen?', 'Weil die Leber Gerinnungsfaktoren bildet und eine eingeschränkte Synthese die Blutgerinnung verändern kann.', ['Weil der INR ausschließlich die Nierenfunktion misst.', 'Weil Galle den INR direkt im Magen erzeugt.', 'Weil der INR nur von der Körpergröße abhängt.', 'Weil die Leber bei Erkrankung mehr Sauerstoff über die Lunge aufnimmt.']),
    ],
    [
      check('Welche Faktoren können eine Fettleber begünstigen?', ['Adipositas beziehungsweise ungünstige Stoffwechsellage.', 'Alkoholkonsum.', 'Ausgeprägte Gewichtsschwankungen können im Lernkontext eine Rolle spielen.'], ['Eine normale Atmung.', 'Ein unkomplizierter Knochenbruch.']),
      check('Welche Reihenfolge beschreibt eine mögliche Fortschreitung chronischer Leberschädigung?', 'Fetteinlagerung → Entzündung → Fibrose → Zirrhose.', ['Zirrhose → Fetteinlagerung → gesunde Leber → Entzündung.', 'Entzündung → vollständige Heilung → Fibrose ist immer ausgeschlossen.', 'Fetteinlagerung → Magengeschwür → Reflux → Zirrhose.', 'Fibrose → Blinddarmentzündung → Zirrhose.']),
    ],
    [
      check('Welche Hepatitisformen können durch eine Impfung verhindert werden?', ['Hepatitis A.', 'Hepatitis B.'], ['Hepatitis C.', 'Eine Fettleber.', 'Eine Gallenkolik.']),
      check('Welche Zuordnungen zu Virushepatitis sind richtig?', ['Hepatitis A wird typischerweise fäkal-oral übertragen.', 'Hepatitis B kann über Blut und Körperflüssigkeiten übertragen werden.', 'Hepatitis C wird vor allem über Blut übertragen.'], ['Hepatitis C wird ausschließlich über Tröpfchen beim Sprechen übertragen.', 'Hepatitis A entsteht durch einen absoluten Insulinmangel.']),
    ],
    [
      check('Was passiert bei einer Leberzirrhose?', 'Funktionsfähiges Lebergewebe wird zunehmend durch narbiges Bindegewebe ersetzt und die Organfunktion kann abnehmen.', ['Die Leber wird vollständig zu Muskelgewebe.', 'Es wird lediglich mehr Galle gespeichert, ohne Gewebeveränderung.', 'Die Zirrhose betrifft ausschließlich die Magenschleimhaut.', 'Die Leber vergrößert nur ihre Sauerstoffaufnahme, sonst ändert sich nichts.']),
      check('Welche Zeichen oder Komplikationen können bei einer Leberzirrhose auftreten?', ['Ikterus.', 'Aszites.', 'Spider naevi.', 'Ösophagusvarizen.'], ['Laktoseintoleranz als typisches Zirrhosezeichen.', 'Eine unkomplizierte Myopie.']),
    ],
  ],

  'lf9-08-metabolisch': [
    [
      check('Welche Faktoren gehören zum metabolischen Syndrom beziehungsweise seinem Kernrisikoprofil?', ['Zentrale Adipositas.', 'Arterielle Hypertonie.', 'Ungünstige Blutfette.', 'Gestörter Glukosestoffwechsel beziehungsweise Typ-2-Diabetes.'], ['Laktoseintoleranz.', 'Appendizitis.']),
      check('Warum ist die Kombination mehrerer dieser Faktoren besonders riskant?', 'Die Risikofaktoren können sich gegenseitig verstärken und das Herz-Kreislauf-Risiko deutlich erhöhen.', ['Mehrere Faktoren heben sich grundsätzlich gegenseitig auf.', 'Die Kombination betrifft ausschließlich den Geschmackssinn.', 'Das Risiko sinkt automatisch mit jedem weiteren Faktor.', 'Mehrere Faktoren führen nur zu einer schnelleren Magenentleerung.']),
    ],
    [
      check('Welche Aussagen passen zu 92 kg Körpergewicht bei 1,70 m Körpergröße?', ['Der BMI liegt ungefähr bei 31,8 kg/m².', 'Der Wert liegt im Bereich einer Adipositas.'], ['Der BMI liegt ungefähr bei 18 kg/m².', 'Der Wert entspricht Untergewicht.', 'Der BMI kann ohne Körpergröße berechnet werden.']),
      check('Welche wichtige Grenze hat der BMI?', 'Er unterscheidet nicht zuverlässig zwischen Fett- und Muskelmasse und berücksichtigt die Fettverteilung nur unzureichend.', ['Er misst direkt den Körperfettanteil jedes einzelnen Organs.', 'Er berücksichtigt automatisch die gesamte Muskelmasse korrekt.', 'Er kann ausschließlich bei Kindern berechnet werden.', 'Er ersetzt jede weitere medizinische Risikobewertung.']),
    ],
    [
      check('Welche Erkrankungen oder Risiken können mit Adipositas zusammenhängen?', ['Fettleber.', 'Arteriosklerotische Erkrankungen.', 'Reflux.', 'Arthrose.'], ['Eine Blinddarmentzündung als zwangsläufige Folge.', 'Eine Laktoseintoleranz als direkte Folge.']),
      check('Welche Folge ist eher durch mechanische Mehrbelastung erklärbar?', 'Arthrose.', ['Hyperlipidämie.', 'Insulinresistenz.', 'Fettleber.', 'Erhöhtes LDL.']),
    ],
    [
      check('Welche Aussagen zu LDL und HDL sind richtig?', ['LDL transportiert Cholesterin von der Leber zu Geweben.', 'Dauerhaft hohe LDL-Werte können Ablagerungen in Gefäßwänden begünstigen.', 'HDL ist am Rücktransport von Cholesterin in Richtung Leber beteiligt.'], ['LDL ist ein Verdauungsenzym des Pankreas.', 'HDL ist ein blutzuckersenkendes Hormon.']),
      check('Welche Kette beschreibt den Zusammenhang von hohem LDL und Gefäßerkrankungen am besten?', 'Dauerhaft hohes LDL → Ablagerungen und Plaques → Gefäßverengung → erhöhtes Risiko für KHK, pAVK oder Schlaganfall.', ['Hohes LDL → mehr Magensäure → Reflux → Appendizitis.', 'Hohes LDL → Insulinmangel → Gallenkolik.', 'Hohes LDL → direkte Auflösung aller Plaques.', 'Hohes LDL → ausschließlich bessere Gefäßdurchblutung.']),
    ],
    [
      check('Was ist ein wichtiges Therapieziel bei dauerhaft hohem LDL?', 'Das LDL und damit das Risiko für arteriosklerotische Herz-Kreislauf-Erkrankungen sollen gesenkt werden.', ['Das LDL soll möglichst weiter erhöht werden.', 'Die Therapie soll ausschließlich die Magensäure erhöhen.', 'Das Ziel ist eine vollständige Unterzuckerung.', 'Das LDL spielt für Gefäßerkrankungen grundsätzlich keine Rolle.']),
      check('Warum macht eine medikamentöse Therapie Lebensstilmaßnahmen nicht automatisch überflüssig?', 'Medikamente und Lebensstilmaßnahmen können sich ergänzen und gemeinsam das gesamte Herz-Kreislauf-Risiko beeinflussen.', ['Weil Medikamente grundsätzlich niemals wirken.', 'Weil Ernährung als einzige Maßnahme jede Fettstoffwechselstörung sicher heilt.', 'Weil Bewegung LDL immer sofort auf null senkt.', 'Weil Medikamente ausschließlich den Blutzucker messen.']),
    ],
    [
      check('Welche Reihenfolge erklärt die Entstehung eines Gichtanfalls?', 'Purine → Harnsäure → Uratkristalle → Gelenkentzündung.', ['Harnsäure → Galle → Insulin → Gelenkentzündung.', 'Glukose → Pepsin → Urat → Reflux.', 'Fett → Magensäure → Gicht → Laktase.', 'Purine → Bilirubin → Blinddarmentzündung.']),
      check('Worin unterscheiden sich Hyperurikämie und Gicht?', 'Hyperurikämie bedeutet einen erhöhten Harnsäurespiegel; Gicht beschreibt die durch Uratkristalle ausgelöste Erkrankung mit typischen Entzündungsanfällen.', ['Beide Begriffe bedeuten ausschließlich Magenschleimhautentzündung.', 'Gicht bedeutet nur einen hohen Blutzucker.', 'Hyperurikämie bezeichnet immer eine Gelenkfraktur.', 'Zwischen beiden Begriffen gibt es grundsätzlich keinen Unterschied.']),
    ],
  ],

  'lf9-09-diabetes-grundlagen': [
    [
      check('Welche Reihenfolge beschreibt die Reaktion nach einer kohlenhydratreichen Mahlzeit richtig?', 'Blutzucker steigt → Betazellen geben Insulin ab → Zellen nehmen mehr Glukose auf beziehungsweise speichern sie → Blutzucker sinkt wieder.', ['Insulin steigt → Blutzucker steigt immer weiter → Glukose bleibt ausschließlich im Darm.', 'Blutzucker sinkt → Gallenblase bildet Insulin → Glukose steigt.', 'Glukose gelangt direkt in den Enddarm und wird dort gespeichert.', 'Insulin verhindert jede Aufnahme von Glukose in Körperzellen.']),
      check('Wo kann überschüssige Glukose unter anderem als Glykogen gespeichert werden?', ['In der Leber.', 'In der Muskulatur.'], ['In der Gallenblase.', 'In der Luftröhre.', 'Im Zahnschmelz.']),
    ],
    [
      check('Was geschieht bei fallendem Blutzucker in Bezug auf Glukagon?', 'Alphazellen geben Glukagon ab; dadurch wird unter anderem gespeicherte Glukose mobilisiert und der Blutzucker kann steigen.', ['Glukagon blockiert jede Glukosefreisetzung und senkt den Blutzucker weiter.', 'Glukagon wird ausschließlich in der Gallenblase gebildet.', 'Glukagon spaltet Proteine im Magen.', 'Glukagon ist ein Bestandteil der Magensäure.']),
      check('Welche Aussagen beschreiben Insulin und Glukagon richtig?', ['Insulin senkt den Blutzucker, indem es Aufnahme und Speicherung von Glukose fördert.', 'Glukagon kann den Blutzucker erhöhen, indem es die Bereitstellung von Glukose fördert.'], ['Beide Hormone senken den Blutzucker immer gleichzeitig.', 'Beide Hormone werden ausschließlich im Magen gebildet.', 'Glukagon ist ein Verdauungsenzym.']),
    ],
    [
      check('Welche Kette erklärt Polyurie und Polydipsie bei ausgeprägter Hyperglykämie?', 'Zu viel Glukose im Blut → Glukose im Urin → Wasser wird osmotisch mitgezogen → Urinmenge steigt → Flüssigkeitsverlust verursacht starken Durst.', ['Hyperglykämie → weniger Urin → kein Flüssigkeitsverlust → Durst.', 'Glukose im Blut → Gallensteine → weniger Urin → Durst.', 'Hyperglykämie → Magensäureverlust → Polyurie.', 'Polyurie entsteht ausschließlich durch eine Entzündung des Wurmfortsatzes.']),
      check('Warum kann eine Person trotz starken Trinkens austrocknen?', 'Wenn über den Urin sehr viel Wasser verloren geht, kann der Flüssigkeitsverlust die Trinkmenge übersteigen.', ['Weil Wasser bei Diabetes grundsätzlich nicht aufgenommen werden kann.', 'Weil Insulin das gesamte Trinkwasser im Magen zerstört.', 'Weil Durst die Urinproduktion vollständig stoppt.', 'Weil die Gallenblase das getrunkene Wasser speichert.']),
    ],
    [
      check('Welche Aussage erklärt Diabetes Typ 1 am besten?', 'Eine Autoimmunreaktion zerstört insulinproduzierende Betazellen, sodass ein absoluter Insulinmangel entsteht.', ['Die Körperzellen reagieren lediglich etwas schlechter auf normal vorhandenes Insulin.', 'Die Gallenblase produziert zu wenig Galle.', 'Typ 1 entsteht ausschließlich durch Bewegungsmangel.', 'Es ist immer ausreichend körpereigenes Insulin vorhanden.']),
      check('Welche Beschwerden können bei einem neu auftretenden Typ-1-Diabetes vorkommen?', ['Starker Durst.', 'Häufiges Wasserlassen.', 'Gewichtsverlust.', 'Müdigkeit.'], ['Gallenkolik als typisches Leitsymptom.', 'Chronische Verstopfung als einziges Zeichen.']),
    ],
    [
      check('Was beschreibt Insulinresistenz?', 'Körperzellen reagieren weniger empfindlich auf vorhandenes Insulin, sodass Glukose schlechter aus dem Blut aufgenommen wird.', ['Es wird von Beginn an überhaupt kein Insulin mehr gebildet.', 'Insulin wird zu Galle umgewandelt.', 'Der Körper reagiert stärker als normal auf kleinste Insulinmengen.', 'Insulinresistenz bedeutet eine Entzündung der Bauchspeicheldrüse.']),
      check('Welche Faktoren können das Risiko für Typ-2-Diabetes erhöhen?', ['Genetische Veranlagung.', 'Adipositas.', 'Bewegungsmangel.'], ['Ein akuter Knochenbruch.', 'Eine Laktoseintoleranz als alleiniger Risikofaktor.']),
    ],
    [
      check('Welche Aussagen unterscheiden Typ 1 und Typ 2 richtig?', ['Typ 1 beruht auf einer Autoimmunzerstörung der Betazellen.', 'Bei Typ 1 besteht ein absoluter Insulinmangel.', 'Bei Typ 2 steht zunächst häufig eine Insulinresistenz im Vordergrund.', 'Typ 2 entwickelt sich häufig schleichender als Typ 1.'], ['Bei Typ 2 fehlt von Beginn an immer vollständig Insulin.', 'Typ 1 entsteht ausschließlich durch Adipositas.']),
      check('Warum kann bei Typ-2-Diabetes später trotzdem Insulin notwendig werden?', 'Die Insulinproduktion des Pankreas kann im Verlauf nachlassen, sodass die körpereigene Menge nicht mehr ausreicht.', ['Weil die Gallenblase mit zunehmendem Alter Insulin abbaut.', 'Weil Insulin nur bei Kindern wirken kann.', 'Weil Typ 2 automatisch zu Typ 1 wird.', 'Weil Insulinresistenz bedeutet, dass überhaupt keine Betazellen vorhanden sind.']),
    ],
  ],

  'lf9-10-diabetes-diagnostik': [
    [
      check('Welche Aussagen zu Gestationsdiabetes sind richtig?', ['Er kann während der Schwangerschaft durch eine verminderte Insulinwirkung begünstigt werden.', 'Er kann symptomarm verlaufen.', 'Ein deutlich erhöhtes Glukoseangebot kann ein starkes fetales Wachstum begünstigen.'], ['Er ist grundsätzlich immer sofort an starken Schmerzen erkennbar.', 'Er entsteht durch einen Gallenstein.']),
      check('Warum kann ein Neugeborenes nach der Geburt unterzuckern?', 'Die kindliche Insulinproduktion kann noch an das zuvor hohe mütterliche Glukoseangebot angepasst sein, während die Glukosezufuhr über die Plazenta nach der Geburt plötzlich endet.', ['Weil nach der Geburt keine Betazellen mehr vorhanden sind.', 'Weil jedes Neugeborene grundsätzlich zu viel Galle produziert.', 'Weil Muttermilch immer eine Unterzuckerung auslöst.', 'Weil der HbA1c direkt den Blutzucker des Neugeborenen auf null senkt.']),
    ],
    [
      check('Welche Reihenfolge beschreibt einen OGTT grundsätzlich richtig?', 'Standardisierte Ausgangsbedingungen → definierte Glukoselösung trinken → Blutzucker zu festgelegten Zeitpunkten messen → Reaktion auswerten.', ['Blutzucker einmal beliebig messen → keine Glukose trinken → Ergebnis sofort unabhängig von der Zeit festlegen.', 'Gastroskopie durchführen → Glukose trinken → Ultraschallbild auswerten.', 'Glukose trinken → nur den Puls messen → Diagnose stellen.', 'Stuhlprobe abgeben → Glukose trinken → Gallenblase untersuchen.']),
      check('Warum ist ein OGTT aussagekräftiger als eine beliebige einzelne Blutzuckermessung?', 'Die Reaktion des Körpers auf eine standardisierte Glukosebelastung wird über festgelegte Zeitpunkte verfolgt.', ['Weil ein OGTT die Magenschleimhaut direkt zeigt.', 'Weil beim OGTT niemals Blutwerte gemessen werden.', 'Weil eine einzelne Messung grundsätzlich immer falsch ist.', 'Weil der OGTT ausschließlich die Lebergröße bestimmt.']),
    ],
    [
      check('Welche Aussage beschreibt den HbA1c richtig?', 'Er gibt grob Auskunft über die Blutzuckerbelastung der vergangenen etwa zwei bis drei Monate.', ['Er zeigt ausschließlich den Blutzucker der letzten fünf Minuten.', 'Er misst die aktuelle Herzfrequenz.', 'Er ist ein Wert für die Gallenblasenfüllung.', 'Er reagiert nur auf die unmittelbar vorherige Mahlzeit.']),
      check('Warum schließt ein heute normaler Blutzucker einen erhöhten HbA1c nicht automatisch aus?', 'Ein aktueller Blutzucker ist eine Momentaufnahme, während der HbA1c die längerfristige Belastung widerspiegelt.', ['Beide Werte messen exakt dasselbe Zeitfenster.', 'Der HbA1c wird ausschließlich durch den Blutdruck bestimmt.', 'Ein normaler Momentwert beweist immer normale Werte der vergangenen Monate.', 'Der HbA1c misst nur die Körpertemperatur.']),
    ],
    [
      check('Welche Befunde können im Urin bei Diabetes besonders relevant sein?', ['Glukose.', 'Ketonkörper.', 'Albumin beziehungsweise Mikroalbumin.'], ['Bilirubin ist der einzige relevante Diabetes-Urinbefund.', 'Pollen.']),
      check('Warum ist Mikroalbumin im Diabetes-Kontext wichtig?', 'Es kann ein frühes Zeichen einer diabetischen Nierenschädigung sein.', ['Es zeigt direkt eine Magenschleimhautentzündung.', 'Es beweist eine Gallenkolik.', 'Es misst den aktuellen Puls.', 'Es ist ein Verdauungsenzym.']),
    ],
    [
      check('Welche Kette erklärt eine diabetische Ketoazidose?', 'Starker Insulinmangel → verstärkter Fettabbau → Bildung von Ketonkörpern → Übersäuerung des Körpers.', ['Insulinmangel → weniger Fettabbau → keine Ketone → Übersäuerung.', 'Gallenstein → Glukoseaufnahme → Ketoazidose.', 'Reflux → Ketonkörper → Appendizitis.', 'Insulinmangel → ausschließlich mehr Magensäure → Ketoazidose.']),
      check('Welche Warnzeichen können bei einer Ketoazidose auftreten?', ['Tiefe beziehungsweise auffällige Atmung.', 'Acetongeruch der Atemluft.', 'Übelkeit oder Erbrechen.', 'Bauchschmerzen oder Bewusstseinsstörungen.'], ['Juckreiz am After als typisches Leitsymptom.', 'Eine schmerzlose Myopie.']),
    ],
    [
      check('Welche Symptome können bei einer Hypoglykämie auftreten?', ['Schwitzen.', 'Zittern.', 'Herzklopfen oder Heißhunger.', 'Verwirrtheit bis hin zur Bewusstlosigkeit.'], ['Ikterus als typisches Frühsymptom.', 'Gallenkolik als zwingendes Zeichen.']),
      check('Welche Situationen können eine Hypoglykämie begünstigen?', ['Zu viel Insulin beziehungsweise blutzuckersenkendes Medikament.', 'Zu wenig Kohlenhydrataufnahme.', 'Ungeplante starke körperliche Belastung.'], ['Eine einmalige Gastroskopie.', 'Eine Laktoseintoleranz.']),
    ],
    [
      check('Welche Spätfolgen gehören klassisch zu den Schäden an kleinen Gefäßen?', ['Diabetische Retinopathie.', 'Diabetische Nephropathie.'], ['Diabetische Neuropathie wird als Nervenschädigung separat eingeordnet.', 'Gallensteine.', 'Appendizitis.']),
      check('Warum ist ein diabetischer Fuß besonders gefährlich?', ['Eine Neuropathie kann Schmerzen und Warnsignale vermindern.', 'Durchblutungsstörungen können die Heilung verschlechtern.', 'Kleine Wunden können dadurch lange unbemerkt bleiben.'], ['Wunden heilen bei Diabetes grundsätzlich immer schneller.', 'Der diabetische Fuß entsteht ausschließlich durch Gallensteine.']),
    ],
    [
      check('Warum ist bei Diabetes Typ 1 Insulin unverzichtbar?', 'Durch den absoluten Insulinmangel muss das fehlende Hormon von außen ersetzt werden.', ['Weil Insulin die Gallenflüssigkeit ersetzt.', 'Weil Typ 1 ausschließlich durch zu wenig Bewegung entsteht.', 'Weil Insulin nur die Magensäure neutralisiert.', 'Weil bei Typ 1 grundsätzlich zu viel körpereigenes Insulin vorhanden ist.']),
      check('Welche Aussagen zur Insulin- und Typ-2-Therapie sind richtig?', ['Basal- beziehungsweise Depotinsulin deckt eher den Grundbedarf ab.', 'Schnell wirksames Insulin kann den Bedarf zu Mahlzeiten abdecken.', 'Lebensstilmaßnahmen gehören bei Typ 2 zur Basis der Behandlung.'], ['Jeder Mensch mit Typ 2 benötigt sofort dieselbe Insulindosis.', 'Basalinsulin wird ausschließlich zur Behandlung von Gallensteinen verwendet.']),
    ],
    [
      check('Welche Zuordnungen aus Lernfeld 9 sind richtig?', ['Amylase wirkt auf Kohlenhydrate.', 'Der Dünndarm ist der wichtigste Ort der Nährstoffresorption.', 'Lipase wirkt auf Fette.'], ['Pepsin ist ein blutzuckersenkendes Hormon.', 'Die Gallenblase ist der Hauptort der Proteinaufnahme.']),
      check('Welche Fall-Zuordnungen sind richtig?', ['Wellenförmiger rechter Oberbauchschmerz nach fettreicher Mahlzeit passt zu einer Gallenkolik.', 'Bekannte Divertikel mit neuem linken Unterbauchschmerz und Fieber sprechen für eine Divertikulitis.', 'Anhaltende Dysphagie ist ein Warnzeichen, das bei Erkrankungen der Speiseröhre abgeklärt werden muss.', 'Starker Durst und häufiges Wasserlassen können auf eine ausgeprägte Hyperglykämie hinweisen.'], ['Eine Gallenkolik verursacht typischerweise ausschließlich linken Unterarmschmerz.', 'Dysphagie bedeutet Durchfall.']),
      check('Praxis-Challenge: Eine Person berichtet über starken Durst und häufiges Wasserlassen. Erkläre kurz die mögliche Symptomkette bei hohem Blutzucker und nenne zwei Untersuchungen, die zur weiteren Einordnung beitragen können.', 'Hyperglykämie kann zu Glukosurie, vermehrtem Wasserverlust und damit Polyurie und Durst führen; zur Einordnung können zum Beispiel aktuelle Blutzuckermessung, HbA1c, OGTT oder Urinuntersuchung beitragen.', ['Die Beschwerden beweisen ohne Untersuchung sicher eine bestimmte Diabetesform.', 'Eine Hörprüfung ist die wichtigste Untersuchung.', 'Die Symptome entstehen immer durch Gallensteine.', 'Eine Gastroskopie ersetzt jede Blutzuckermessung.'], true),
    ],
  ],
};

function isPracticeHeading(block: TopicContent) {
  if (block.type !== 'heading' || !block.title) return false;
  const title = block.title.trim();
  return title.startsWith('✍️') || /^(übungen?|aufgaben?|mini[- ]?check|lerncheck|arbeitsauftrag|wiederholung)/i.test(title);
}

function simplifyFinalSimulation(topic: LearningTopic): LearningTopic {
  if (topic.id !== 'lf9-10-diabetes-diagnostik') return topic;
  const start = topic.content.findIndex(block => block.type === 'heading' && block.title?.startsWith('10.9 '));
  if (start < 0) return topic;
  return {
    ...topic,
    content: [
      ...topic.content.slice(0, start),
      topic.content[start],
      { type: 'text', text: 'Zum Abschluss werden die Inhalte aus Verdauung, Oberbauch, Unterbauch, Tumorlehre und Diabetes noch einmal in kurzen Mischfragen zusammengeführt.' },
      { type: 'heading', title: '✍️ Kurz üben – Abschlussmix' },
      { type: 'list', items: [] },
    ],
  };
}

function replacePracticeChecks(topic: LearningTopic): LearningTopic {
  const sets = topicChecks[topic.id];
  if (!sets || topic.id === 'lf9-06-tumore') return topic;

  const content = [...topic.content];
  let practiceIndex = 0;
  for (let index = 0; index < content.length; index += 1) {
    if (!isPracticeHeading(content[index])) continue;
    const next = content[index + 1];
    if (next?.type !== 'list') continue;
    const curated = sets[practiceIndex];
    if (curated) content[index + 1] = { ...next, items: curated.map(encode) };
    practiceIndex += 1;
  }
  return { ...topic, content };
}

function addOverviewChecks(topic: LearningTopic): LearningTopic {
  const curated = overviewChecks[topic.id];
  if (!curated?.length) return topic;
  const firstSection = topic.content.findIndex(block => block.type === 'heading' && !isPracticeHeading(block));
  if (firstSection < 0) return topic;
  return {
    ...topic,
    content: [
      ...topic.content.slice(0, firstSection),
      { type: 'heading', title: '✍️ Kurz üben – Überblick' },
      { type: 'list', items: curated.map(encode) },
      ...topic.content.slice(firstSection),
    ],
  };
}

const finalQuestionOverrides: Record<number, QuizQuestion> = {
  15: {
    id: 15,
    question: 'Welche Untersuchung ermöglicht die direkte Beurteilung des Analkanals bei einem Hämorrhoidalleiden?',
    type: 'single',
    options: [
      { id: 'a', text: 'Proktoskopie', correct: true },
      { id: 'b', text: 'EEG' },
      { id: 'c', text: 'Spirometrie' },
      { id: 'd', text: 'Ergometrie' },
    ],
    explanation: 'Mit einer Proktoskopie kann der Analkanal direkt untersucht werden.',
    points: 2,
  },
  18: {
    id: 18,
    question: 'Welches Warnzeichen passt besonders zu einem Ösophaguskarzinom?',
    type: 'single',
    options: [
      { id: 'a', text: 'Anhaltende Dysphagie beziehungsweise Schluckbeschwerden', correct: true },
      { id: 'b', text: 'Polyurie' },
      { id: 'c', text: 'Pollakisurie' },
      { id: 'd', text: 'Tinnitus' },
    ],
    explanation: 'Anhaltende Schluckbeschwerden müssen bei Erkrankungen der Speiseröhre ärztlich abgeklärt werden.',
    points: 2,
  },
  19: {
    id: 19,
    question: 'Welche Aussagen passen zu einer typischen Gallenkolik?',
    type: 'multiple',
    options: [
      { id: 'a', text: 'Die Schmerzen können krampfartig oder wellenförmig im rechten Oberbauch auftreten.', correct: true },
      { id: 'b', text: 'Ein zeitweise blockierter Gallengang kann die Beschwerden auslösen.', correct: true },
      { id: 'c', text: 'Die Beschwerden entstehen typischerweise durch einen absoluten Insulinmangel.' },
      { id: 'd', text: 'Eine Gallenkolik betrifft typischerweise ausschließlich den linken Unterbauch.' },
    ],
    explanation: 'Eine Gallenkolik entsteht typischerweise durch eine vorübergehende Abflussbehinderung im Gallensystem und verursacht häufig wellenförmige Schmerzen im rechten Oberbauch.',
    points: 3,
  },
  25: {
    id: 25,
    question: 'Welche Faktoren gehören zum metabolischen Syndrom beziehungsweise seinem Kernrisikoprofil?',
    type: 'multiple',
    options: [
      { id: 'a', text: 'Zentrale Adipositas', correct: true },
      { id: 'b', text: 'Arterielle Hypertonie', correct: true },
      { id: 'c', text: 'Fettstoffwechselstörung', correct: true },
      { id: 'd', text: 'Gestörter Glukosestoffwechsel beziehungsweise Typ-2-Diabetes', correct: true },
      { id: 'e', text: 'Laktoseintoleranz' },
    ],
    explanation: 'Beim metabolischen Syndrom treten mehrere kardiometabolische Risikofaktoren gemeinsam auf.',
    points: 4,
  },
  36: {
    id: 36,
    question: 'Welche Spätfolgen gehören klassisch zur diabetischen Mikroangiopathie?',
    type: 'multiple',
    options: [
      { id: 'a', text: 'Diabetische Retinopathie', correct: true },
      { id: 'b', text: 'Diabetische Nephropathie', correct: true },
      { id: 'c', text: 'Diabetische Neuropathie – sie wird als Nervenschädigung separat eingeordnet.' },
      { id: 'd', text: 'Gallensteine' },
    ],
    explanation: 'Retinopathie und Nephropathie sind klassische mikroangiopathische Folgen. Die diabetische Neuropathie ist eine Nervenschädigung und wird separat eingeordnet.',
    points: 3,
  },
  48: {
    id: 48,
    question: 'Welche Symptome können bei einer Hypoglykämie auftreten?',
    type: 'multiple',
    options: [
      { id: 'a', text: 'Schwitzen', correct: true },
      { id: 'b', text: 'Zittern', correct: true },
      { id: 'c', text: 'Verwirrtheit', correct: true },
      { id: 'd', text: 'Bewusstlosigkeit bei schwerer Ausprägung', correct: true },
      { id: 'e', text: 'Ikterus als typisches Frühsymptom' },
    ],
    explanation: 'Eine Unterzuckerung kann sowohl vegetative Symptome als auch neurologische Störungen bis zur Bewusstlosigkeit verursachen.',
    points: 4,
  },
};

export function polishLf9QuestionQuality(module: LearningModule): LearningModule {
  if (module.id !== 'lf9') return module;

  const topics = module.topics
    .filter(topic => topic.id !== 'video-mediathek')
    .map(simplifyFinalSimulation)
    .map(replacePracticeChecks)
    .map(addOverviewChecks);

  return {
    ...module,
    topics,
    questions: module.questions.map(question => finalQuestionOverrides[question.id] || question),
  };
}
