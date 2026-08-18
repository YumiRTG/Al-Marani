import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  Heart,
  Lightbulb,
  Play,
  RotateCcw,
  Search,
  ShieldAlert,
  Sparkles,
  Star,
  Trophy,
  X,
  Zap,
} from 'lucide-react';

type Choice = {
  text: string;
  correct: boolean;
  feedback: string;
};

type SequenceGame = {
  kind: 'sequence';
  title: string;
  intro: string;
  items: string[];
  success: string;
};

type CaseGame = {
  kind: 'case';
  title: string;
  intro: string;
  rounds: {
    scene: string;
    prompt: string;
    options: Choice[];
  }[];
};

type ErrorGame = {
  kind: 'error';
  title: string;
  intro: string;
  rounds: {
    scene: string;
    prompt: string;
    options: Choice[];
  }[];
};

type MysteryGame = {
  kind: 'mystery';
  title: string;
  intro: string;
  clues: string[];
  options: string[];
  answer: string;
  explanation: string;
};

type BlitzGame = {
  kind: 'blitz';
  title: string;
  intro: string;
  questions: {
    prompt: string;
    options: string[];
    answer: string;
    explanation: string;
  }[];
};

type Game = SequenceGame | CaseGame | ErrorGame | MysteryGame | BlitzGame;

const games: Record<string, Game> = {
  // Lernfeld 1
  vertrag: {
    kind: 'blitz',
    title: 'Azubi-Rechtsblitz',
    intro: 'Vier schnelle Situationen aus dem Ausbildungsverhältnis. Schaffst du eine fehlerfreie Serie?',
    questions: [
      { prompt: 'Wie lange darf die Probezeit in der Berufsausbildung höchstens dauern?', options: ['2 Monate', '4 Monate', '6 Monate'], answer: '4 Monate', explanation: 'Im Lernstoff gilt: mindestens ein, höchstens vier Monate.' },
      { prompt: 'Was passiert bei bestandener Abschlussprüfung grundsätzlich mit dem Ausbildungsverhältnis?', options: ['Es läuft immer bis zum Vertragsdatum weiter', 'Es endet mit Bekanntgabe des Ergebnisses', 'Es verlängert sich automatisch'], answer: 'Es endet mit Bekanntgabe des Ergebnisses', explanation: 'Bei vorzeitig bestandener Abschlussprüfung endet das Ausbildungsverhältnis mit Bekanntgabe des Ergebnisses.' },
      { prompt: 'Wer muss Ausbildungsmittel für die Ausbildung bereitstellen?', options: ['Die Auszubildende allein', 'Der Ausbildungsbetrieb', 'Nur die Berufsschule'], answer: 'Der Ausbildungsbetrieb', explanation: 'Der Ausbildungsbetrieb muss die für die Ausbildung erforderlichen Mittel bereitstellen.' },
      { prompt: 'Was ist bei einer unklaren Arbeitsanweisung richtig?', options: ['Raten und schnell handeln', 'Rückfragen und Auftrag klären', 'Einfach ignorieren'], answer: 'Rückfragen und Auftrag klären', explanation: 'Patientensicherheit und klare Zuständigkeiten gehen vor Tempo.' },
    ],
  },
  verantwortung: {
    kind: 'case',
    title: 'Schweigepflicht-Alarm',
    intro: 'Du sitzt am Empfang. Entscheide in drei kurzen Situationen professionell.',
    rounds: [
      {
        scene: 'Eine Bekannte fragt: „War Frau Müller heute wegen ihrer Diagnose bei euch?“',
        prompt: 'Wie reagierst du?',
        options: [
          { text: 'Bestätigen, aber keine Diagnose nennen', correct: false, feedback: 'Auch die Tatsache, dass jemand Patientin der Praxis ist, kann vertraulich sein.' },
          { text: 'Keine Auskunft geben', correct: true, feedback: 'Richtig. Ohne Einwilligung oder Rechtsgrundlage werden keine Patientendaten bestätigt.' },
          { text: 'Nur sagen, wann sie da war', correct: false, feedback: 'Auch Termin- und Anwesenheitsinformationen sind nicht einfach frei weiterzugeben.' },
        ],
      },
      {
        scene: 'Du verstehst eine ärztliche Anordnung nicht eindeutig.',
        prompt: 'Was ist der sichere nächste Schritt?',
        options: [
          { text: 'Nachfragen, bevor du handelst', correct: true, feedback: 'Genau. Unklare Anordnungen werden geklärt, nicht interpretiert.' },
          { text: 'Die wahrscheinlichste Variante wählen', correct: false, feedback: 'Vermutungen können Patientensicherheit gefährden.' },
          { text: 'Eine Kollegin entscheiden lassen, ohne Rückfrage', correct: false, feedback: 'Die Unklarheit der Anordnung bleibt bestehen und muss geklärt werden.' },
        ],
      },
      {
        scene: 'Du bemerkst einen eigenen Dokumentationsfehler direkt nach der Eingabe.',
        prompt: 'Wie gehst du professionell vor?',
        options: [
          { text: 'Fehler transparent korrigieren und nach Praxisstandard dokumentieren', correct: true, feedback: 'Richtig. Korrekturen müssen nachvollziehbar bleiben.' },
          { text: 'Den Eintrag heimlich löschen', correct: false, feedback: 'Dokumentation muss nachvollziehbar bleiben.' },
          { text: 'Nichts tun, solange niemand fragt', correct: false, feedback: 'Ein erkannter Fehler wird nicht ignoriert.' },
        ],
      },
    ],
  },

  // Lernfeld 2
  kommunikation: {
    kind: 'case',
    title: 'Empfang unter Druck',
    intro: 'Ein voller Tresen, das Telefon klingelt und ein Patient ist verärgert. Wähle die professionellste Reaktion.',
    rounds: [
      {
        scene: 'Ein Patient beschwert sich laut über die Wartezeit.',
        prompt: 'Was hilft zuerst?',
        options: [
          { text: 'Ruhig zuhören und das konkrete Problem klären', correct: true, feedback: 'Genau. Erst verstehen, dann eine realistische Lösung anbieten.' },
          { text: 'Sofort erklären, dass die Praxis nichts dafür kann', correct: false, feedback: 'Rechtfertigung vor dem Zuhören verschärft Konflikte häufig.' },
          { text: 'Den Patienten vor allen anderen zurechtweisen', correct: false, feedback: 'Das verletzt Professionalität und kann eskalieren.' },
        ],
      },
      {
        scene: 'Am Telefon bittet jemand um einen sensiblen Befund.',
        prompt: 'Was muss vor einer Auskunft passieren?',
        options: [
          { text: 'Identität und Berechtigung sicher klären', correct: true, feedback: 'Richtig. Sensible Informationen werden nicht allein aufgrund einer behaupteten Identität weitergegeben.' },
          { text: 'Nur die Telefonnummer ansehen', correct: false, feedback: 'Eine angezeigte Nummer reicht als sichere Identitätsprüfung nicht aus.' },
          { text: 'Den Befund schnell nennen, damit die Leitung frei wird', correct: false, feedback: 'Datenschutz geht vor Geschwindigkeit.' },
        ],
      },
      {
        scene: 'Eine Patientin schildert mehrere Beschwerden durcheinander.',
        prompt: 'Welche Gesprächstechnik hilft?',
        options: [
          { text: 'Kurz zusammenfassen und gezielt nachfragen', correct: true, feedback: 'Aktives Zuhören plus Struktur reduziert Missverständnisse.' },
          { text: 'Unterbrechen und nur Ja/Nein-Fragen stellen', correct: false, feedback: 'Zu frühes Einengen kann wichtige Informationen verlieren.' },
          { text: 'Das Gespräch ohne Zusammenfassung beenden', correct: false, feedback: 'Eine kurze Rückversicherung verbessert die Informationsqualität.' },
        ],
      },
    ],
  },
  datenschutz: {
    kind: 'error',
    title: 'Datenschutz-Fehlerjagd',
    intro: 'In jeder Szene steckt genau ein klarer Datenschutzfehler. Finde ihn.',
    rounds: [
      {
        scene: 'Am Empfang läuft der normale Praxisbetrieb.',
        prompt: 'Was ist hier der Fehler?',
        options: [
          { text: 'Der Bildschirm ist vom Wartebereich aus gut einsehbar.', correct: true, feedback: 'Treffer. Patientendaten müssen vor unberechtigten Blicken geschützt werden.' },
          { text: 'Die MFA sperrt den PC beim Verlassen des Platzes.', correct: false, feedback: 'Das ist eine sinnvolle Schutzmaßnahme.' },
          { text: 'Ausdrucke werden direkt aus dem Drucker genommen.', correct: false, feedback: 'Das reduziert das Risiko, dass sensible Unterlagen offen liegen bleiben.' },
        ],
      },
      {
        scene: 'Im Team werden digitale Zugänge genutzt.',
        prompt: 'Welche Handlung ist unsicher?',
        options: [
          { text: 'Jede Person nutzt ihren eigenen Zugang.', correct: false, feedback: 'Das unterstützt Nachvollziehbarkeit und Zugriffsschutz.' },
          { text: 'Das Team verwendet gemeinsam dasselbe Passwort.', correct: true, feedback: 'Richtig gefunden. Persönliche Zugänge sollten nicht geteilt werden.' },
          { text: 'Der Bildschirm wird bei Abwesenheit gesperrt.', correct: false, feedback: 'Das ist richtig.' },
        ],
      },
    ],
  },

  // Lernfeld 3
  basishygiene: {
    kind: 'error',
    title: 'Hygiene-Alarm',
    intro: 'Finde die Handlung, die eine Infektionskette unnötig offen lässt.',
    rounds: [
      {
        scene: 'Nach Kontakt mit potenziell kontaminiertem Material.',
        prompt: 'Welche Aussage ist falsch?',
        options: [
          { text: 'Handschuhe ersetzen immer die Händedesinfektion.', correct: true, feedback: 'Genau das ist der Fehler. Handschuhe ersetzen Händehygiene nicht.' },
          { text: 'Schutzausrüstung richtet sich nach der Tätigkeit und dem Risiko.', correct: false, feedback: 'Richtiges Vorgehen.' },
          { text: 'Hände müssen vollständig mit Desinfektionsmittel benetzt werden.', correct: false, feedback: 'Richtiges Prinzip.' },
        ],
      },
      {
        scene: 'Einmalhandschuhe wurden bei einer kontaminierenden Tätigkeit getragen.',
        prompt: 'Was wäre der Fehler?',
        options: [
          { text: 'Handschuhe ausziehen und anschließend Händehygiene durchführen.', correct: false, feedback: 'Das ist sinnvoll.' },
          { text: 'Mit denselben Handschuhen direkt zum nächsten Patienten gehen.', correct: true, feedback: 'Treffer. Handschuhe werden indikationsgerecht gewechselt.' },
          { text: 'Kontaminierte Handschuhe sicher entsorgen.', correct: false, feedback: 'Das ist richtig.' },
        ],
      },
    ],
  },
  medizinprodukte: {
    kind: 'sequence',
    title: 'Instrumenten-Race',
    intro: 'Tippe die Schritte in der sinnvollen Reihenfolge an. Ziel: vom benutzten Instrument zur sicheren erneuten Bereitstellung.',
    items: ['Sicher sammeln / transportieren', 'Reinigen', 'Desinfizieren', 'Sauberkeit und Funktion prüfen', 'Falls erforderlich sterilisieren und geschützt lagern'],
    success: 'Stark. Aufbereitung ist ein kontrollierter Prozess und nicht nur „Instrument sauber machen“.',
  },

  // Lernfeld 4
  'anamnese-basics': {
    kind: 'case',
    title: 'Anamnese-Detektiv',
    intro: 'Du führst ein strukturiertes Erstgespräch. Welche Frage bringt dich jeweils sinnvoll weiter?',
    rounds: [
      {
        scene: 'Der Patient sagt: „Ich habe seit heute Schmerzen.“',
        prompt: 'Welche Frage ist als nächstes besonders hilfreich?',
        options: [
          { text: 'Wo genau sind die Schmerzen und wie fühlen sie sich an?', correct: true, feedback: 'Richtig. Lokalisation und Charakter helfen, das Leitsymptom zu strukturieren.' },
          { text: 'Welche Diagnose glauben Sie selbst zu haben?', correct: false, feedback: 'Eine Selbstdiagnose ersetzt keine strukturierte Anamnese.' },
          { text: 'Möchten Sie lieber morgen wiederkommen?', correct: false, feedback: 'Zuerst muss das aktuelle Anliegen geklärt werden.' },
        ],
      },
      {
        scene: 'Du hast Leitsymptom, Beginn und Verlauf erfasst.',
        prompt: 'Was ergänzt eine gute Anamnese?',
        options: [
          { text: 'Relevante Vorerkrankungen, Medikamente und Risiken', correct: true, feedback: 'Genau. Kontextfaktoren können für die weitere Beurteilung wichtig sein.' },
          { text: 'Nur die Postleitzahl', correct: false, feedback: 'Stammdaten sind wichtig, ersetzen aber keine medizinisch relevante Anamnese.' },
          { text: 'Möglichst viele Fachbegriffe ohne Erklärung', correct: false, feedback: 'Kommunikation soll verständlich bleiben.' },
        ],
      },
      {
        scene: 'Das Gespräch ist beendet.',
        prompt: 'Was gehört zum Abschluss?',
        options: [
          { text: 'Wesentliche Angaben kurz, korrekt und nachvollziehbar dokumentieren', correct: true, feedback: 'Richtig. Gute Dokumentation macht Informationen für den weiteren Ablauf nutzbar.' },
          { text: 'Nur das eigene Gedächtnis nutzen', correct: false, feedback: 'Wichtige Informationen müssen dokumentiert werden.' },
          { text: 'Unklare Angaben ergänzen, ohne nachzufragen', correct: false, feedback: 'Unklarheiten werden nicht erfunden.' },
        ],
      },
    ],
  },

  // Lernfeld 5
  'herz-basics': {
    kind: 'sequence',
    title: 'Blutstrom-Race',
    intro: 'Ein Erythrozyt kommt sauerstoffarm aus dem Körper zurück. Tippe seinen Weg bis zurück in den Körper.',
    items: ['Körper', 'Rechtes Herz', 'Lunge', 'Linkes Herz', 'Körperkreislauf'],
    success: 'Perfekt: rechts zur Lunge, links in den Körper. Genau dieser Grundweg trägt viele weitere Herz-Kreislauf-Themen.',
  },
  'kreislauf-puls': {
    kind: 'blitz',
    title: 'Puls oder Blutdruck?',
    intro: 'Vier schnelle Begriffe. Entscheide ohne lange nachzudenken.',
    questions: [
      { prompt: 'Wird in mmHg angegeben.', options: ['Puls', 'Blutdruck'], answer: 'Blutdruck', explanation: 'Der Blutdruck wird in mmHg angegeben.' },
      { prompt: 'Beschreibt die Zahl der tastbaren Druckwellen pro Minute.', options: ['Puls', 'Blutdruck'], answer: 'Puls', explanation: 'Der Puls wird als Frequenz pro Minute erfasst.' },
      { prompt: 'Systolisch und diastolisch gehören zu ...', options: ['Puls', 'Blutdruck'], answer: 'Blutdruck', explanation: 'Systolisch und diastolisch bezeichnen die beiden Blutdruckwerte.' },
      { prompt: 'Rhythmus und Frequenz werden besonders beurteilt bei ...', options: ['Puls', 'Blutdruck'], answer: 'Puls', explanation: 'Beim Puls werden unter anderem Frequenz und Rhythmus beurteilt.' },
    ],
  },

  // Lernfeld 6
  rechtsgeschaefte: {
    kind: 'mystery',
    title: 'Geschäftsfähigkeits-Mystery',
    intro: 'Errate die richtige Altersgruppe. Je weniger Hinweise du brauchst, desto besser.',
    clues: ['Die Person ist minderjährig.', 'Sie ist mindestens sieben Jahre alt.', 'Rechtsgeschäfte können je nach Situation Zustimmung benötigen.'],
    options: ['geschäftsunfähig', 'beschränkt geschäftsfähig', 'voll geschäftsfähig'],
    answer: 'beschränkt geschäftsfähig',
    explanation: 'Im Lernstoff gilt die Altersgruppe 7 bis 17 Jahre grundsätzlich als beschränkt geschäftsfähig.',
  },

  // Lernfeld 7
  igel: {
    kind: 'error',
    title: 'IGeL-Fairness-Check',
    intro: 'Finde die Handlung, die bei einer Selbstzahlerleistung nicht zu einem transparenten Ablauf passt.',
    rounds: [
      {
        scene: 'Eine IGeL soll angeboten werden.',
        prompt: 'Wo steckt der Fehler?',
        options: [
          { text: 'Kosten werden erst nach Durchführung genannt.', correct: true, feedback: 'Treffer. Kosten müssen vor der Leistung transparent sein.' },
          { text: 'Der Patient erhält verständliche Informationen.', correct: false, feedback: 'Das gehört zu einem transparenten Ablauf.' },
          { text: 'Die Vereinbarung wird vor der Leistung nach Praxisvorgabe geklärt.', correct: false, feedback: 'Das ist richtig.' },
        ],
      },
      {
        scene: 'Die Patientin ist unsicher und möchte erst nachdenken.',
        prompt: 'Welche Handlung wäre problematisch?',
        options: [
          { text: 'Sie unter Druck setzen, sofort zuzustimmen.', correct: true, feedback: 'Richtig gefunden. Freiwilligkeit und transparente Information sind entscheidend.' },
          { text: 'Offene Fragen klären lassen.', correct: false, feedback: 'Das ist sinnvoll.' },
          { text: 'Zeit zum Überlegen lassen.', correct: false, feedback: 'Das ist professionell.' },
        ],
      },
    ],
  },
  organisation: {
    kind: 'sequence',
    title: 'Praxisfluss-Sprint',
    intro: 'Ordne einen einfachen Patientenweg in der Praxis.',
    items: ['Termin / Kontakt', 'Anmeldung', 'Wartebereich', 'Behandlung', 'Dokumentation und Abschluss'],
    success: 'Geschafft. Ablauforganisation beschreibt genau solche sinnvollen Reihenfolgen von Arbeitsschritten.',
  },

  // Lernfeld 8
  harnsystem: {
    kind: 'sequence',
    title: 'Urinweg-Sprint',
    intro: 'Tippe den Weg des Urins vom Bildungsort bis zur Ausscheidung.',
    items: ['Niere', 'Harnleiter', 'Harnblase', 'Harnröhre'],
    success: 'Richtig: bilden → transportieren → speichern → ausscheiden.',
  },

  // Lernfeld 9
  'lf9-03-diagnostik': {
    kind: 'case',
    title: 'Diagnostik-Entscheider',
    intro: 'Welche Untersuchung beantwortet die jeweilige Frage am direktesten?',
    rounds: [
      {
        scene: 'Leber und Gallenblase sollen von außen beurteilt werden.',
        prompt: 'Was passt am besten?',
        options: [
          { text: 'Sonografie', correct: true, feedback: 'Richtig. Ultraschall eignet sich zur Beurteilung vieler Bauchorgane von außen.' },
          { text: 'Gastroskopie', correct: false, feedback: 'Die Gastroskopie beurteilt vor allem die Schleimhaut von Speiseröhre, Magen und Duodenum.' },
          { text: 'Nur Stuhltest', correct: false, feedback: 'Ein Stuhltest beantwortet eine andere diagnostische Frage.' },
        ],
      },
      {
        scene: 'Die Magenschleimhaut soll direkt angesehen und eventuell Gewebe entnommen werden.',
        prompt: 'Welche Methode passt?',
        options: [
          { text: 'Gastroskopie', correct: true, feedback: 'Genau. Endoskopie ermöglicht direkte Schleimhautbeurteilung und Biopsien.' },
          { text: 'Sonografie', correct: false, feedback: 'Ultraschall zeigt die Magenschleimhaut nicht direkt wie ein Endoskop.' },
          { text: 'Blutdruckmessung', correct: false, feedback: 'Das beantwortet diese Frage nicht.' },
        ],
      },
      {
        scene: 'Nicht sichtbares Blut im Stuhl soll nachgewiesen werden.',
        prompt: 'Was passt?',
        options: [
          { text: 'Immunologischer Stuhltest', correct: true, feedback: 'Richtig. Okkult bedeutet verborgen, also nicht mit bloßem Auge sichtbar.' },
          { text: 'EKG', correct: false, feedback: 'Ein EKG untersucht die elektrische Herzaktivität.' },
          { text: 'Puls messen', correct: false, feedback: 'Das beantwortet die Frage nach verborgenem Blut nicht.' },
        ],
      },
    ],
  },
  'lf9-04-oberer-gi-trakt': {
    kind: 'mystery',
    title: 'Magen-Darm-Mystery',
    intro: 'Welche Erkrankung wird gesucht? Versuche es mit möglichst wenigen Hinweisen.',
    clues: ['Das Problem liegt nicht primär in einer Entzündung der Magenschleimhaut.', 'Saurer Mageninhalt gelangt zurück in die Speiseröhre.', 'Typisch kann Sodbrennen auftreten.'],
    options: ['Refluxkrankheit', 'Gastritis', 'Ulkus'],
    answer: 'Refluxkrankheit',
    explanation: 'Bei der Refluxkrankheit fließt Mageninhalt in die Speiseröhre zurück.',
  },
  'lf9-06-tumore': {
    kind: 'blitz',
    title: 'TNM-Codeknacker',
    intro: 'Kein Match mehr: Lies den Code und entscheide, welche Aussage stimmt.',
    questions: [
      { prompt: 'Wofür steht T im TNM-System?', options: ['Primärtumor', 'Therapie', 'Tumormarker'], answer: 'Primärtumor', explanation: 'T beschreibt Größe beziehungsweise lokale Ausdehnung des Primärtumors.' },
      { prompt: 'N1 bedeutet grundsätzlich ...', options: ['regionale Lymphknoten sind beteiligt', 'sicher keine Lymphknoten beteiligt', 'Fernmetastasen sind sicher vorhanden'], answer: 'regionale Lymphknoten sind beteiligt', explanation: 'N beschreibt regionale Lymphknoten.' },
      { prompt: 'M0 bedeutet grundsätzlich ...', options: ['keine Fernmetastasen nachgewiesen', 'keinen Primärtumor', 'keine Therapie nötig'], answer: 'keine Fernmetastasen nachgewiesen', explanation: 'M beschreibt Fernmetastasen.' },
      { prompt: 'Eine Lebermetastase eines Darmkarzinoms besteht aus ...', options: ['Darmkrebszellen', 'automatisch Leberkrebszellen', 'nur gesunden Leberzellen'], answer: 'Darmkrebszellen', explanation: 'Metastasen behalten die biologische Herkunft des Primärtumors.' },
      { prompt: 'Welche Therapie wirkt typischerweise lokal?', options: ['Operation', 'jede Tablette automatisch', 'keine Behandlung'], answer: 'Operation', explanation: 'Operationen behandeln einen örtlich definierten Bereich; systemische Medikamente können im ganzen Körper wirken.' },
    ],
  },
  'lf9-08-metabolisch': {
    kind: 'sequence',
    title: 'Gefäß-Kettenreaktion',
    intro: 'Baue die vereinfachte Ursache-Folge-Kette bei dauerhaft ungünstig hohem LDL auf.',
    items: ['LDL dauerhaft erhöht', 'Einlagerungen in der Gefäßwand', 'Plaque entsteht', 'Gefäß wird enger', 'Risiko für Gefäßerkrankungen steigt'],
    success: 'Genau. Stoffwechselthemen werden leichter, wenn du Ursache-Folge-Ketten statt Einzelbegriffe lernst.',
  },
  'lf9-09-diabetes-grundlagen': {
    kind: 'blitz',
    title: 'Insulin-vs.-Glukagon-Blitz',
    intro: 'Baue eine Serie auf. Welches Hormon ist gemeint?',
    questions: [
      { prompt: 'Wird nach einer kohlenhydratreichen Mahlzeit verstärkt ausgeschüttet.', options: ['Insulin', 'Glukagon'], answer: 'Insulin', explanation: 'Insulin reagiert auf den steigenden Blutzucker nach einer Mahlzeit.' },
      { prompt: 'Fördert die Aufnahme von Glukose in viele Körperzellen.', options: ['Insulin', 'Glukagon'], answer: 'Insulin', explanation: 'Insulin unterstützt die Glukoseaufnahme und Speicherung.' },
      { prompt: 'Hilft in Nüchternphasen, Glukose aus Speichern bereitzustellen.', options: ['Insulin', 'Glukagon'], answer: 'Glukagon', explanation: 'Glukagon wirkt als Gegenspieler des Insulins.' },
      { prompt: 'Senkt im Regelkreis den Blutzucker.', options: ['Insulin', 'Glukagon'], answer: 'Insulin', explanation: 'Insulin senkt den Blutzucker.' },
      { prompt: 'Erhöht im Regelkreis den Blutzucker.', options: ['Insulin', 'Glukagon'], answer: 'Glukagon', explanation: 'Glukagon fördert die Bereitstellung von Glukose.' },
    ],
  },
  'lf9-10-diabetes-diagnostik': {
    kind: 'case',
    title: 'Diabetes-Notfallradar',
    intro: 'Erkenne in kurzen Fällen, ob sofortige Aufmerksamkeit nötig ist und welches Problem dahinterstecken könnte.',
    rounds: [
      {
        scene: 'Eine insulinbehandelte Person wirkt plötzlich zittrig, verschwitzt und verwirrt.',
        prompt: 'Was ist besonders zu bedenken?',
        options: [
          { text: 'Hypoglykämie', correct: true, feedback: 'Richtig. Unterzuckerung kann sich unter anderem mit Zittern, Schwitzen und Verwirrtheit zeigen.' },
          { text: 'Nur normale Müdigkeit', correct: false, feedback: 'Die Symptomkombination sollte nicht bagatellisiert werden.' },
          { text: 'Reflux', correct: false, feedback: 'Das passt nicht zum beschriebenen Muster.' },
        ],
      },
      {
        scene: 'Ein junger Mensch mit Typ-1-Diabetes hat starken Durst, häufiges Wasserlassen, Übelkeit und tiefe auffällige Atmung.',
        prompt: 'Welche Entgleisung muss bedacht werden?',
        options: [
          { text: 'Diabetische Ketoazidose', correct: true, feedback: 'Richtig. Das ist ein medizinischer Notfall und erfordert rasche ärztliche Behandlung.' },
          { text: 'Nur leichte Unterzuckerung', correct: false, feedback: 'Die beschriebenen Zeichen passen eher zu einer schweren hyperglykämischen Entgleisung mit Ketoazidose.' },
          { text: 'Laktoseintoleranz', correct: false, feedback: 'Das erklärt das Gesamtbild nicht.' },
        ],
      },
    ],
  },

  // Lernfeld 10
  'haut-wunde': {
    kind: 'case',
    title: 'Wund-Triage',
    intro: 'Welche Beobachtung verändert die Dringlichkeit? Entscheide wie im Praxisalltag.',
    rounds: [
      {
        scene: 'Eine tiefe Stichwunde am Finger. Distal wirkt die Sensibilität verändert.',
        prompt: 'Was ist besonders wichtig?',
        options: [
          { text: 'Ärztliche Beurteilung wegen möglicher tieferer Strukturverletzung', correct: true, feedback: 'Richtig. Bei Stichverletzungen können Nerven, Gefäße oder Sehnen betroffen sein.' },
          { text: 'Nur Pflaster aufkleben und nach Hause schicken', correct: false, feedback: 'Tiefe und Funktionsstörungen müssen abgeklärt werden.' },
          { text: 'Die Sensibilitätsstörung ignorieren', correct: false, feedback: 'Sensibilität gehört zur systematischen Wundbeurteilung.' },
        ],
      },
      {
        scene: 'Eine Wunde wird zunehmend rot, schmerzhaft und eitrig, zusätzlich besteht Fieber.',
        prompt: 'Wie ist das einzuordnen?',
        options: [
          { text: 'Mögliche Infektion, ärztliche Beurteilung erforderlich', correct: true, feedback: 'Genau. Zunehmende lokale Zeichen plus Fieber sind Warnzeichen.' },
          { text: 'Sicher normale Wundheilung', correct: false, feedback: 'Das darf nicht automatisch als normale Heilungsreaktion gewertet werden.' },
          { text: 'Verband für mehrere Wochen ungeprüft lassen', correct: false, feedback: 'Eine auffällige Wunde muss beurteilt werden.' },
        ],
      },
    ],
  },
  'kleine-chirurgie': {
    kind: 'error',
    title: 'OP-Check: Finde den Sicherheitsfehler',
    intro: 'In jeder Szene ist eine Handlung klar unsicher.',
    rounds: [
      {
        scene: 'Vor einem kleinen Eingriff.',
        prompt: 'Wo ist der Fehler?',
        options: [
          { text: 'Identität und Eingriff werden geprüft.', correct: false, feedback: 'Das gehört zur sicheren Vorbereitung.' },
          { text: 'Allergien und relevante Medikamente werden berücksichtigt.', correct: false, feedback: 'Das ist wichtig.' },
          { text: 'Die Lokalisation wird nicht geprüft, weil sie vermutlich bekannt ist.', correct: true, feedback: 'Treffer. Seite und Lokalisation müssen eindeutig geklärt werden.' },
        ],
      },
      {
        scene: 'Nach dem Eingriff wurde Gewebe entnommen.',
        prompt: 'Was wäre der Fehler?',
        options: [
          { text: 'Probe eindeutig beschriften und dokumentieren.', correct: false, feedback: 'Genau so.' },
          { text: 'Probe unbeschriftet neben andere Proben legen.', correct: true, feedback: 'Richtig gefunden. Proben müssen eindeutig zugeordnet werden.' },
          { text: 'Versand nach Praxisvorgabe vorbereiten.', correct: false, feedback: 'Das ist korrekt.' },
        ],
      },
    ],
  },

  // Lernfeld 11
  'praevention-grundlagen': {
    kind: 'blitz',
    title: 'Präventions-Level',
    intro: 'Primär, sekundär oder tertiär? Sammle eine möglichst lange richtige Serie.',
    questions: [
      { prompt: 'Eine Impfung soll eine Erkrankung verhindern.', options: ['Primärprävention', 'Sekundärprävention', 'Tertiärprävention'], answer: 'Primärprävention', explanation: 'Primärprävention setzt vor der Erkrankung an.' },
      { prompt: 'Eine Früherkennungsuntersuchung soll eine Erkrankung möglichst früh entdecken.', options: ['Primärprävention', 'Sekundärprävention', 'Tertiärprävention'], answer: 'Sekundärprävention', explanation: 'Sekundärprävention dient der Früherkennung.' },
      { prompt: 'Rehabilitation soll Folgen einer bestehenden Erkrankung begrenzen.', options: ['Primärprävention', 'Sekundärprävention', 'Tertiärprävention'], answer: 'Tertiärprävention', explanation: 'Tertiärprävention soll Komplikationen und Einschränkungen reduzieren.' },
      { prompt: 'Rauchstopp-Beratung bei noch nicht eingetretener Folgeerkrankung.', options: ['Primärprävention', 'Sekundärprävention', 'Tertiärprävention'], answer: 'Primärprävention', explanation: 'Das Ziel ist, Erkrankungsrisiken zu senken.' },
    ],
  },
  checkup: {
    kind: 'sequence',
    title: 'Check-up-Pfad',
    intro: 'Ordne den vereinfachten Ablauf des Gesundheits-Check-ups.',
    items: ['Anamnese und Risikoprofil', 'Körperliche Untersuchung', 'Passende Laboruntersuchungen', 'Befunde auswerten', 'Beratung und weitere Schritte'],
    success: 'Genau. Der Check-up ist ein Prozess aus Erfassen, Untersuchen, Einordnen und Beraten.',
  },

  // Lernfeld 12
  bewerbung: {
    kind: 'error',
    title: 'Bewerbungs-Scanner',
    intro: 'Eine Bewerbung soll zur Stelle passen. Finde jeweils den schwächsten Schritt.',
    rounds: [
      {
        scene: 'Vor dem Schreiben des Anschreibens.',
        prompt: 'Was wäre der Fehler?',
        options: [
          { text: 'Aufgaben und Anforderungen der Stelle analysieren.', correct: false, feedback: 'Das ist die richtige Grundlage.' },
          { text: 'Muss- und Kann-Anforderungen unterscheiden.', correct: false, feedback: 'Das hilft bei einer passgenauen Bewerbung.' },
          { text: 'Dasselbe Anschreiben unverändert an jede Praxis senden.', correct: true, feedback: 'Treffer. Gute Bewerbungen stellen einen konkreten Bezug zur Stelle her.' },
        ],
      },
      {
        scene: 'Im Vorstellungsgespräch.',
        prompt: 'Was wäre ungeschickt?',
        options: [
          { text: 'Den eigenen Lebenslauf erklären können.', correct: false, feedback: 'Das ist wichtig.' },
          { text: 'Eigene Fragen zu Aufgaben und Einarbeitung vorbereiten.', correct: false, feedback: 'Das zeigt echtes Interesse.' },
          { text: 'Keine Ahnung haben, welche Praxis man besucht.', correct: true, feedback: 'Richtig gefunden. Vorbereitung auf Arbeitgeber und Stelle gehört zum Gespräch.' },
        ],
      },
    ],
  },
  arbeitsvertrag: {
    kind: 'case',
    title: 'Vertrags-Check',
    intro: 'Du vergleichst zwei Stellen. Welche Information solltest du zusätzlich zum Gehalt unbedingt prüfen?',
    rounds: [
      {
        scene: 'Stelle A zahlt etwas mehr, nennt aber die Arbeitszeit nur sehr unklar.',
        prompt: 'Was ist sinnvoll?',
        options: [
          { text: 'Arbeitszeit und Verteilung vor Unterschrift klären', correct: true, feedback: 'Richtig. Arbeitszeit ist ein zentraler Vertragsbestandteil.' },
          { text: 'Nur auf das Monatsnetto schauen', correct: false, feedback: 'Arbeitsbedingungen bestehen aus mehr als dem Auszahlungsbetrag.' },
          { text: 'Unklare Punkte ignorieren', correct: false, feedback: 'Unklare Vertragsbedingungen sollten vor der Unterschrift geklärt werden.' },
        ],
      },
      {
        scene: 'Im Vertrag steht ein Bezug auf einen Tarifvertrag.',
        prompt: 'Was solltest du tun?',
        options: [
          { text: 'Prüfen, welche tariflichen Regelungen dadurch gelten', correct: true, feedback: 'Genau. Tarifbezug kann Entgelt, Urlaub und weitere Bedingungen beeinflussen.' },
          { text: 'Den Hinweis ignorieren', correct: false, feedback: 'Der Tarifbezug kann für die Arbeitsbedingungen wesentlich sein.' },
          { text: 'Davon ausgehen, dass jeder MFA-Tarif automatisch überall gilt', correct: false, feedback: 'Tarifgeltung hängt unter anderem von Tarifbindung oder vertraglicher Bezugnahme ab.' },
        ],
      },
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
  const game = games[topicId];
  if (!game) return null;

  return <RewardGame game={game} storageKey={`medlearn-reward-v2-${moduleId}-${topicId}`} />;
}

function RewardGame({ game, storageKey }: { game: Game; storageKey: string }) {
  const [solved, setSolved] = useState(() => localStorage.getItem(storageKey) === 'done');
  const [started, setStarted] = useState(false);
  const [roundKey, setRoundKey] = useState(0);

  const complete = () => {
    localStorage.setItem(storageKey, 'done');
    setSolved(true);
  };

  const restart = () => {
    setStarted(true);
    setRoundKey(value => value + 1);
  };

  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-violet-50 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-amber-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[.14em] text-amber-700"><Sparkles className="h-4 w-4" /> Bonus freigeschaltet</div>
          <h3 className="mt-1 text-xl font-black text-slate-900">{game.title}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">{game.intro}</p>
        </div>
        <div className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-xs font-black ${solved ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-amber-700 shadow-sm'}`}>
          {solved ? <Trophy className="h-4 w-4" /> : <Star className="h-4 w-4" />}
          {solved ? 'Lernstern verdient' : 'freiwilliger Bonus'}
        </div>
      </div>

      {!started ? (
        <div className="p-5 sm:p-6">
          <button onClick={() => setStarted(true)} className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3.5 text-sm font-black text-white shadow-lg shadow-amber-200 transition hover:-translate-y-0.5">
            <Play className="h-4 w-4" /> Bonus spielen
          </button>
          <p className="mt-3 text-xs text-slate-400">Das Spiel ist freiwillig, zählt nicht zur Note und blockiert den Lernfortschritt nicht.</p>
        </div>
      ) : (
        <div key={roundKey} className="p-5 sm:p-6">
          {game.kind === 'sequence' && <SequencePlay game={game} seed={storageKey} onSolved={complete} />}
          {game.kind === 'case' && <CasePlay game={game} onSolved={complete} />}
          {game.kind === 'error' && <ErrorPlay game={game} onSolved={complete} />}
          {game.kind === 'mystery' && <MysteryPlay game={game} onSolved={complete} />}
          {game.kind === 'blitz' && <BlitzPlay game={game} onSolved={complete} />}
          <div className="mt-5 flex justify-end">
            <button onClick={restart} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50"><RotateCcw className="h-3.5 w-3.5" /> Neu starten</button>
          </div>
        </div>
      )}
    </section>
  );
}

function SequencePlay({ game, seed, onSolved }: { game: SequenceGame; seed: string; onSolved: () => void }) {
  const shuffled = useMemo(() => shuffle(game.items, seed), [game.items, seed]);
  const [chosen, setChosen] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  const remaining = shuffled.filter(item => !chosen.includes(item));
  const correct = chosen.length === game.items.length && chosen.every((item, index) => item === game.items[index]);

  const check = () => {
    setChecked(true);
    if (correct) onSolved();
  };

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-sm font-black text-violet-700"><Zap className="h-4 w-4" /> Tippe in der richtigen Reihenfolge</div>
      <div className="min-h-16 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/60 p-3">
        {chosen.length === 0 ? <p className="py-2 text-center text-sm text-slate-400">Deine Reihenfolge erscheint hier</p> : <div className="flex flex-wrap gap-2">{chosen.map((item, index) => <button key={`${item}-${index}`} onClick={() => { setChecked(false); setChosen(prev => prev.filter((_, i) => i !== index)); }} className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm"><span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-100 text-xs text-violet-700">{index + 1}</span>{item}<X className="h-3.5 w-3.5 text-slate-300" /></button>)}</div>}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{remaining.map(item => <button key={item} onClick={() => { setChecked(false); setChosen(prev => [...prev, item]); }} className="rounded-xl border-2 border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:border-violet-300 hover:bg-violet-50">{item}</button>)}</div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button disabled={chosen.length !== game.items.length} onClick={check} className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-black text-white disabled:opacity-35">Reihenfolge prüfen</button>
        {checked && <div className={`flex items-center gap-2 text-sm font-bold ${correct ? 'text-emerald-700' : 'text-rose-600'}`}>{correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}{correct ? game.success : 'Fast. Nimm die Karten zurück und versuche die Reihenfolge noch einmal.'}</div>}
      </div>
    </div>
  );
}

function CasePlay({ game, onSolved }: { game: CaseGame; onSolved: () => void }) {
  const [round, setRound] = useState(0);
  const [choice, setChoice] = useState<Choice | null>(null);
  const [hearts, setHearts] = useState(3);
  const current = game.rounds[round];

  const choose = (option: Choice) => {
    if (choice?.correct) return;
    setChoice(option);
    if (!option.correct) setHearts(value => Math.max(0, value - 1));
  };

  const next = () => {
    if (!choice?.correct) { setChoice(null); return; }
    if (round === game.rounds.length - 1) { onSolved(); return; }
    setRound(value => value + 1);
    setChoice(null);
  };

  return (
    <div>
      <GameHud icon={<ShieldAlert className="h-4 w-4" />} label={`Fall ${round + 1}/${game.rounds.length}`} hearts={hearts} />
      <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"><p className="text-sm font-semibold leading-6 text-slate-600">{current.scene}</p><p className="mt-3 font-black text-slate-900">{current.prompt}</p></div>
      <div className="mt-4 grid gap-2.5">{current.options.map(option => {
        const selected = choice?.text === option.text;
        const state = selected ? option.correct ? 'border-emerald-400 bg-emerald-50' : 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-white hover:border-teal-300';
        return <button key={option.text} onClick={() => choose(option)} className={`rounded-2xl border-2 p-4 text-left text-sm font-semibold text-slate-700 transition ${state}`}>{option.text}</button>;
      })}</div>
      {choice && <div className={`mt-4 rounded-2xl border p-4 text-sm leading-6 ${choice.correct ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-700'}`}><div className="mb-1 flex items-center gap-2 font-black">{choice.correct ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}{choice.correct ? 'Gute Entscheidung' : 'Noch nicht'}</div>{choice.feedback}</div>}
      {choice && <button onClick={next} className={`mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black text-white ${choice.correct ? 'bg-teal-600' : 'bg-slate-500'}`}>{choice.correct ? round === game.rounds.length - 1 ? 'Fall abschließen' : 'Nächster Fall' : 'Nochmal versuchen'} <ArrowRight className="h-4 w-4" /></button>}
    </div>
  );
}

function ErrorPlay({ game, onSolved }: { game: ErrorGame; onSolved: () => void }) {
  const [round, setRound] = useState(0);
  const [choice, setChoice] = useState<Choice | null>(null);
  const current = game.rounds[round];

  const next = () => {
    if (!choice?.correct) { setChoice(null); return; }
    if (round === game.rounds.length - 1) { onSolved(); return; }
    setRound(value => value + 1);
    setChoice(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2 text-sm font-black text-rose-700"><Search className="h-4 w-4" /> Fehlerjagd {round + 1}/{game.rounds.length}</div><span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">1 Fehler versteckt</span></div>
      <div className="mt-4 rounded-2xl bg-slate-900 p-4 text-sm font-semibold leading-6 text-white sm:p-5">{current.scene}</div>
      <p className="mt-4 font-black text-slate-900">{current.prompt}</p>
      <div className="mt-3 grid gap-2.5">{current.options.map(option => {
        const selected = choice?.text === option.text;
        return <button key={option.text} onClick={() => setChoice(option)} className={`rounded-2xl border-2 p-4 text-left text-sm font-semibold transition ${selected ? option.correct ? 'border-emerald-400 bg-emerald-50 text-emerald-800' : 'border-rose-400 bg-rose-50 text-rose-700' : 'border-slate-200 bg-white text-slate-700 hover:border-rose-300'}`}>{option.text}</button>;
      })}</div>
      {choice && <div className={`mt-4 rounded-xl p-4 text-sm ${choice.correct ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700'}`}>{choice.feedback}</div>}
      {choice && <button onClick={next} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-black text-white">{choice.correct ? round === game.rounds.length - 1 ? 'Fehlerjagd abschließen' : 'Nächste Szene' : 'Nochmal suchen'} <ArrowRight className="h-4 w-4" /></button>}
    </div>
  );
}

function MysteryPlay({ game, onSolved }: { game: MysteryGame; onSolved: () => void }) {
  const [clueIndex, setClueIndex] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const guess = (option: string) => {
    if (done) return;
    if (option === game.answer) {
      setMessage(game.explanation);
      setDone(true);
      onSolved();
    } else if (clueIndex < game.clues.length - 1) {
      setClueIndex(value => value + 1);
      setMessage('Noch nicht. Du bekommst einen weiteren Hinweis.');
    } else {
      setMessage('Noch nicht. Nutze alle Hinweise und versuche es erneut.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2 text-sm font-black text-indigo-700"><Lightbulb className="h-4 w-4" /> Mystery</div><span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">{game.clues.length - clueIndex} mögliche Punkte</span></div>
      <div className="mt-4 space-y-2">{game.clues.slice(0, clueIndex + 1).map((clue, index) => <div key={clue} className="flex gap-3 rounded-2xl border border-indigo-100 bg-indigo-50 p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-xs font-black text-white">{index + 1}</span><p className="text-sm font-semibold leading-6 text-slate-700">{clue}</p></div>)}</div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">{game.options.map(option => <button key={option} onClick={() => guess(option)} disabled={done} className="rounded-2xl border-2 border-slate-200 bg-white p-3 text-sm font-bold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50 disabled:opacity-60">{option}</button>)}</div>
      {message && <div className={`mt-4 rounded-xl p-4 text-sm font-semibold ${done ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>{message}</div>}
    </div>
  );
}

function BlitzPlay({ game, onSolved }: { game: BlitzGame; onSolved: () => void }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [finished, setFinished] = useState(false);
  const current = game.questions[index];
  const correct = selected === current.answer;

  const choose = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === current.answer) {
      setScore(value => value + 1);
      setStreak(value => value + 1);
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    if (index === game.questions.length - 1) {
      const finalScore = score + (selected === current.answer ? 0 : 0);
      const passed = finalScore >= Math.ceil(game.questions.length * 0.6);
      setFinished(true);
      if (passed) onSolved();
      return;
    }
    setIndex(value => value + 1);
    setSelected(null);
  };

  if (finished) {
    const passed = score >= Math.ceil(game.questions.length * 0.6);
    return <div className={`rounded-3xl border p-6 text-center ${passed ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'}`}><Trophy className={`mx-auto h-9 w-9 ${passed ? 'text-emerald-600' : 'text-amber-600'}`} /><div className="mt-3 text-2xl font-black text-slate-900">{score} / {game.questions.length}</div><p className="mt-2 text-sm text-slate-600">{passed ? 'Lernstern verdient. Gute Runde!' : 'Fast geschafft. Starte die Runde noch einmal und hol dir den Lernstern.'}</p></div>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2 text-sm font-black text-orange-700"><Zap className="h-4 w-4" /> Blitz {index + 1}/{game.questions.length}</div><div className="flex gap-2"><span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">Score {score}</span><span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">Serie {streak}</span></div></div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-400 transition-all" style={{ width: `${((index + 1) / game.questions.length) * 100}%` }} /></div>
      <p className="mt-5 text-base font-black leading-7 text-slate-900">{current.prompt}</p>
      <div className="mt-4 grid gap-2.5">{current.options.map(option => {
        const state = selected ? option === current.answer ? 'border-emerald-400 bg-emerald-50' : option === selected ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-white opacity-70' : 'border-slate-200 bg-white hover:border-orange-300';
        return <button key={option} onClick={() => choose(option)} className={`rounded-2xl border-2 p-4 text-left text-sm font-bold text-slate-700 ${state}`}>{option}</button>;
      })}</div>
      {selected && <div className={`mt-4 rounded-xl p-4 text-sm leading-6 ${correct ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-700'}`}><div className="mb-1 font-black">{correct ? 'Richtig!' : `Richtig wäre: ${current.answer}`}</div>{current.explanation}</div>}
      {selected && <button onClick={next} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-black text-white">{index === game.questions.length - 1 ? 'Ergebnis' : 'Weiter'} <ArrowRight className="h-4 w-4" /></button>}
    </div>
  );
}

function GameHud({ icon, label, hearts }: { icon: React.ReactNode; label: string; hearts: number }) {
  return <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2 text-sm font-black text-teal-700">{icon}{label}</div><div className="flex items-center gap-1">{[0, 1, 2].map(index => <Heart key={index} className={`h-4 w-4 ${index < hearts ? 'fill-rose-500 text-rose-500' : 'text-slate-200'}`} />)}</div></div>;
}
