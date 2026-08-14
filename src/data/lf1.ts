import type { LearningModule } from '@/types';
import { compareVisual, heroVisual, processVisual, cycleVisual } from './visualKit';

const dual = processVisual('Die duale MFA-Ausbildung', [
  { title: 'Arztpraxis', text: 'praktische Fertigkeiten, Arbeitsabläufe, Patientenbetreuung' },
  { title: 'Berufsschule', text: 'Fachwissen, Lernfelder, wirtschaftliche und rechtliche Grundlagen' },
  { title: 'Ärztekammer', text: 'zuständige Stelle für Ausbildungsvertrag, Beratung und Prüfung' },
  { title: 'Abschluss', text: 'berufliche Handlungsfähigkeit als Medizinische Fachangestellte' },
], 'Betrieb und Berufsschule ergänzen sich während der Ausbildung.');

const rights = compareVisual('Ausbildung: Rechte und Pflichten', [
  { title: 'Auszubildende', lines: ['lernen und mitarbeiten', 'Berufsschule besuchen', 'sorgfältig arbeiten', 'Schweigepflicht beachten', 'Ausbildungsnachweise führen'] },
  { title: 'Ausbildungsbetrieb', lines: ['Ausbildungsziel vermitteln', 'nur geeignete Aufgaben', 'Ausbildungsmittel bereitstellen', 'für Schule und Prüfung freistellen', 'Arbeitsschutz gewährleisten'] },
]);

const institutions = cycleVisual('Wer wirkt im Gesundheitswesen zusammen?', [
  { title: 'Praxis', text: 'ambulante Versorgung' },
  { title: 'Krankenkassen', text: 'Versicherung und Finanzierung' },
  { title: 'KV / KBV', text: 'vertragsärztliche Versorgung' },
  { title: 'Ärztekammer', text: 'Berufsrecht und MFA-Ausbildung' },
  { title: 'G-BA', text: 'Richtlinien der GKV' },
]);

export const lf1: LearningModule = {
  id: 'lf1', number: 1,
  title: 'Im Beruf und Gesundheitswesen orientieren',
  subtitle: 'MFA-Berufsbild, duale Ausbildung, Ausbildungsvertrag, Arbeitsrecht, Arbeitsschutz und Strukturen des Gesundheitswesens',
  description: 'Grundlagen für den Einstieg in die MFA-Ausbildung: Wer macht was, welche Rechte und Pflichten gelten und wie ist die Arztpraxis in das Gesundheitswesen eingebunden?',
  difficulty: 'easy', icon: 'briefcase',
  heroImage: heroVisual(1, 'Beruf & Gesundheitswesen', 'Orientierung für den Start in die MFA-Ausbildung'),
  topics: [
    {
      id: 'berufsbild', title: '1. Der MFA-Beruf und die duale Ausbildung', content: [
        { type: 'heading', title: 'Was macht eine MFA?' },
        { type: 'text', text: 'Medizinische Fachangestellte verbinden medizinische Assistenz, Patientenbetreuung und Praxisorganisation. Typische Aufgaben reichen von Anmeldung und Terminmanagement über Hygiene, Dokumentation und Abrechnung bis zur Assistenz bei Untersuchungen und Behandlungen. Entscheidend ist, dass medizinische, organisatorische und kommunikative Aufgaben ineinandergreifen.' },
        { type: 'image', src: dual, alt: 'Duale MFA Ausbildung', caption: 'Die Ausbildung findet an mehreren Lernorten statt.' },
        { type: 'heading', title: 'Betrieb und Schule haben unterschiedliche Aufgaben' },
        { type: 'text', text: 'In der Praxis werden Fertigkeiten unter realen Arbeitsbedingungen eingeübt. Die Berufsschule ordnet diese Erfahrungen fachlich ein und vermittelt zusätzlich rechtliche, wirtschaftliche und medizinische Grundlagen. Der Rahmenlehrplan ist in Lernfelder gegliedert, die berufliche Situationen miteinander verbinden.' },
        { type: 'video', title: 'Die duale Berufsausbildung in Deutschland', source: 'Bundesinstitut für Berufsbildung (BIBB)', caption: 'Achte auf die Rollen von Betrieb, Berufsschule und zuständiger Stelle.', url: 'https://www.bibb.de/' },
        { type: 'info', title: 'Merke', text: 'Eine Ausbildung ist keine normale Hilfstätigkeit. Alle übertragenen Aufgaben müssen dem Ausbildungszweck dienen und dem Ausbildungsstand entsprechen.' },
      ]
    },
    {
      id: 'vertrag', title: '2. Ausbildungsvertrag, Probezeit und Beendigung', content: [
        { type: 'heading', title: 'Der Ausbildungsvertrag schafft den rechtlichen Rahmen' },
        { type: 'text', text: 'Vor Beginn der Ausbildung werden die wesentlichen Bedingungen festgehalten. Dazu gehören unter anderem Ausbildungsziel und Gliederung, Beginn und Dauer, Ausbildungsstätte, tägliche Ausbildungszeit, Probezeit, Vergütung, Urlaub, Kündigungsbedingungen und Hinweise auf anwendbare Tarifverträge oder Betriebsvereinbarungen.' },
        { type: 'image', src: rights, alt: 'Rechte und Pflichten in der Ausbildung', caption: 'Ausbildung funktioniert nur, wenn beide Seiten ihre Aufgaben erfüllen.' },
        { type: 'heading', title: 'Probezeit' },
        { type: 'text', text: 'Nach § 20 BBiG muss die Probezeit mindestens einen und darf höchstens vier Monate dauern. In dieser Zeit prüfen beide Seiten, ob Beruf, Betrieb und Zusammenarbeit passen. Während der Probezeit kann das Ausbildungsverhältnis ohne Einhalten einer Kündigungsfrist gekündigt werden.' },
        { type: 'heading', title: 'Nach der Probezeit' },
        { type: 'text', text: 'Nach der Probezeit gelten strengere Regeln. Eine Kündigung aus wichtigem Grund kann fristlos erfolgen. Auszubildende können außerdem mit einer Frist von vier Wochen kündigen, wenn sie die Berufsausbildung aufgeben oder sich für einen anderen Beruf ausbilden lassen wollen. Das Ausbildungsverhältnis endet normalerweise mit Ablauf der Ausbildungsdauer oder bei vorzeitig bestandener Abschlussprüfung mit Bekanntgabe des Ergebnisses.' },
        { type: 'video', title: 'Ausbildungsvertrag – das steht drin', source: 'Studyflix', duration: '4:41 Min.', caption: 'Prüfe beim Anschauen, welche Vertragsbestandteile du bereits erklären kannst.', url: 'https://studyflix.de/ausbildung/karriere-ausbildung/ausbildungsvertrag-4788/video' },
        { type: 'video', title: 'Rechte und Pflichten als Azubi', source: 'Studyflix', duration: '5:04 Min.', caption: 'Ordne die Aussagen aus dem Video danach der Auszubildenden- oder Arbeitgeberseite zu.', url: 'https://studyflix.de/ausbildung/karriere-ausbildung/rechte-und-pflichten-als-azubi-4792/video' },
      ]
    },
    {
      id: 'jugendarbeitsschutz', title: '3. Jugendarbeitsschutz und Mutterschutz', content: [
        { type: 'heading', title: 'Besonderer Schutz für Minderjährige' },
        { type: 'text', text: 'Für Jugendliche von 15 bis unter 18 Jahren gilt das Jugendarbeitsschutzgesetz. Es begrenzt Arbeitszeiten, schreibt Pausen und Freizeit vor und enthält besondere Regeln für Berufsschule, gefährliche Arbeiten sowie Wochenend- und Feiertagsarbeit.' },
        { type: 'table', headers: ['Regel für Jugendliche', 'Grundsatz'], rows: [
          ['Arbeitszeit', 'höchstens 8 Stunden täglich und 40 Stunden wöchentlich'],
          ['Pause bei > 4,5 bis 6 Stunden', 'mindestens 30 Minuten'],
          ['Pause bei > 6 Stunden', 'mindestens 60 Minuten'],
          ['Einzelne Ruhepause', 'mindestens 15 Minuten'],
          ['Tägliche Freizeit', 'mindestens 12 Stunden ununterbrochen'],
          ['Arbeitswoche', 'grundsätzlich 5 Tage'],
        ] },
        { type: 'heading', title: 'Mutterschutz in Ausbildung und Beruf' },
        { type: 'text', text: 'Das Mutterschutzgesetz gilt auch in der Ausbildung. Eine Gefährdungsbeurteilung und geeignete Schutzmaßnahmen sind besonders wichtig, weil in Arztpraxen biologische Arbeitsstoffe, Gefahrstoffe, körperliche Belastungen oder Infektionsrisiken vorkommen können. Für volljährige Schwangere und Stillende gilt grundsätzlich eine Grenze von 8,5 Stunden täglich und 90 Stunden in der Doppelwoche sowie mindestens 11 Stunden Ruhezeit.' },
        { type: 'warning', title: 'Praxisregel', text: 'Schwangerschaft bedeutet nicht automatisch Beschäftigungsverbot. Zuerst werden Gefährdungen beurteilt und Arbeitsbedingungen angepasst. Entscheidend ist der Schutz von Mutter und Kind.' },
        { type: 'video', title: 'Rechte und Pflichten in der Ausbildung – einfach erklärt', source: 'Bundesagentur für Arbeit', caption: 'Der Beitrag enthält auch einen Hör-/Medienteil zu besonderen Schutzrechten junger Auszubildender.', url: 'https://www.arbeitsagentur.de/bildung/einfach-erklaert/rechte-pflichten-ausbildung-einfach' },
      ]
    },
    {
      id: 'verantwortung', title: '4. Verantwortung, Schweigepflicht und Haftung', content: [
        { type: 'heading', title: 'MFA arbeiten mit besonders vertraulichen Informationen' },
        { type: 'text', text: 'Schon die Tatsache, dass eine Person Patientin oder Patient einer Praxis ist, kann vertraulich sein. Diagnosen, Befunde, Medikamente, Gespräche und persönliche Daten dürfen nicht unbefugt weitergegeben werden. Die Schweigepflicht gilt auch gegenüber Bekannten und Familienangehörigen des Patienten, wenn keine Einwilligung oder andere Rechtsgrundlage vorliegt.' },
        { type: 'heading', title: 'Delegation bedeutet nicht: alles selbst entscheiden' },
        { type: 'text', text: 'Ärztliche Tätigkeiten können teilweise an qualifiziertes Personal delegiert werden. Die MFA muss aber innerhalb ihrer Ausbildung, Einweisung und konkreten Beauftragung handeln. Bei Unsicherheit, fehlender Kompetenz oder einer unerwarteten Situation wird die Tätigkeit gestoppt und ärztlich geklärt.' },
        { type: 'table', headers: ['Situation', 'Richtiges Vorgehen'], rows: [
          ['Bekannte fragt nach Diagnose eines Patienten', 'keine Auskunft geben'],
          ['Unklare ärztliche Anordnung', 'nicht raten, sondern nachfragen'],
          ['Fehler bemerkt', 'sofort sichern, melden und korrekt dokumentieren'],
          ['Patientendaten am Bildschirm sichtbar', 'Zugriff und Sichtschutz beachten'],
        ] },
        { type: 'warning', title: 'Merke', text: 'Patientensicherheit geht vor Tempo. Eine unklare Situation wird nicht durch Vermuten gelöst.' },
      ]
    },
    {
      id: 'gesundheitswesen', title: '5. Die Arztpraxis im Gesundheitswesen', content: [
        { type: 'heading', title: 'Viele Institutionen arbeiten zusammen' },
        { type: 'image', src: institutions, alt: 'Institutionen im Gesundheitswesen', caption: 'Die ambulante Praxis ist Teil eines größeren Versorgungssystems.' },
        { type: 'text', text: 'Ärztekammern übernehmen berufsrechtliche Aufgaben und sind bei der MFA-Ausbildung zuständige Stellen. Kassenärztliche Vereinigungen organisieren die vertragsärztliche Versorgung in den Regionen. Krankenkassen finanzieren Leistungen ihrer Versicherten nach den gesetzlichen Regeln. Der Gemeinsame Bundesausschuss legt in Richtlinien wichtige Einzelheiten der GKV-Versorgung fest.' },
        { type: 'heading', title: 'Die Praxis als Dienstleistungsunternehmen' },
        { type: 'text', text: 'Eine Arztpraxis muss medizinische Qualität und Wirtschaftlichkeit gleichzeitig sichern. Räume, Personal, Material, Terminplanung, Datenschutz, Abrechnung und Qualitätsmanagement verursachen Aufwand. Gute Organisation schafft deshalb nicht nur Komfort, sondern trägt unmittelbar zur sicheren Versorgung bei.' },
        { type: 'info', title: 'Prüfungsdenken', text: 'Nicht jede Institution macht dasselbe. Ärztekammer und Kassenärztliche Vereinigung werden häufig verwechselt. Die Ärztekammer hat unter anderem Berufs- und Ausbildungsaufgaben; die KV ist zentral für die vertragsärztliche GKV-Versorgung.' },
      ]
    },
    {
      id: 'arbeitsschutz-team', title: '6. Arbeitsschutz, Team und professionelle Kommunikation', content: [
        { type: 'heading', title: 'Arbeitsschutz beginnt vor dem Unfall' },
        { type: 'text', text: 'Gefährdungen werden systematisch erkannt und reduziert. In einer Praxis zählen dazu unter anderem Stich- und Schnittverletzungen, Infektionsgefahren, Gefahrstoffe, Stolperstellen, ergonomische Belastungen und psychische Beanspruchung. Für Tätigkeiten mit biologischen Arbeitsstoffen im Gesundheitsdienst ist die TRBA 250 eine zentrale technische Regel.' },
        { type: 'heading', title: 'Kommunikation im Team' },
        { type: 'text', text: 'Klare Übergaben, Rückfragen und dokumentierte Zuständigkeiten verhindern Fehler. Professionell bedeutet: sachlich bleiben, konkrete Beobachtungen nennen, keine Schuldzuweisungen und wichtige Informationen rechtzeitig weitergeben.' },
        { type: 'list', items: ['Auftrag vollständig verstehen', 'bei Unklarheiten sofort rückfragen', 'wesentliche Informationen dokumentieren', 'Fehler und Beinahe-Fehler offen für Sicherheitsverbesserungen nutzen', 'respektvoll und patientenorientiert kommunizieren'] },
        { type: 'video', title: 'Ausbildung – Unterrichtsmaterial und Medien', source: 'Bundesagentur für Arbeit', caption: 'Nutze die Medien zu Ausbildung, Rechten und Pflichten als Wiederholung.', url: 'https://www.arbeitsagentur.de/bildung/lehrende-und-beratende/lb-ausbildung' },
      ]
    },
  ],
  questions: [
    { id:1, question:'Welche Aussage beschreibt die duale Ausbildung richtig?', type:'single', options:[{id:'a',text:'Sie findet nur in der Berufsschule statt.'},{id:'b',text:'Betrieb und Berufsschule ergänzen sich.',correct:true},{id:'c',text:'Sie besteht nur aus Praxisarbeit.'},{id:'d',text:'Es gibt keine zuständige Stelle.'}], explanation:'Duale Ausbildung verbindet betriebliche Praxis und Berufsschule.', points:2 },
    { id:2, question:'Welche Aufgabe gehört typischerweise zum MFA-Beruf?', type:'multiple', options:[{id:'a',text:'Patienten empfangen',correct:true},{id:'b',text:'Praxisorganisation',correct:true},{id:'c',text:'bei Untersuchungen assistieren',correct:true},{id:'d',text:'eigenständig ärztliche Diagnosen stellen'}], explanation:'MFA assistieren und organisieren, stellen aber nicht eigenständig ärztliche Diagnosen.', points:3 },
    { id:3, question:'Wie lange dauert die Probezeit nach BBiG?', type:'single', options:[{id:'a',text:'genau 6 Monate'},{id:'b',text:'1 bis 4 Monate',correct:true},{id:'c',text:'höchstens 2 Wochen'},{id:'d',text:'immer 12 Monate'}], explanation:'§ 20 BBiG: mindestens ein, höchstens vier Monate.', points:2 },
    { id:4, question:'Was gehört in den Ausbildungsvertrag?', type:'multiple', options:[{id:'a',text:'Ausbildungsdauer',correct:true},{id:'b',text:'Probezeit',correct:true},{id:'c',text:'Vergütung',correct:true},{id:'d',text:'private Freizeitplanung'}], explanation:'Die wesentlichen Ausbildungsbedingungen werden festgehalten.', points:3 },
    { id:5, question:'Wie viele Stunden darf ein Jugendlicher grundsätzlich höchstens täglich arbeiten?', type:'single', options:[{id:'a',text:'6'},{id:'b',text:'8',correct:true},{id:'c',text:'10'},{id:'d',text:'12'}], explanation:'Grundsatz nach § 8 JArbSchG: 8 Stunden täglich.', points:2 },
    { id:6, question:'Welche Mindestpause gilt für Jugendliche bei mehr als 6 Stunden Arbeit?', type:'single', options:[{id:'a',text:'15 Minuten'},{id:'b',text:'30 Minuten'},{id:'c',text:'60 Minuten',correct:true},{id:'d',text:'keine'}], explanation:'Bei mehr als 6 Stunden sind mindestens 60 Minuten Pause vorgesehen.', points:2 },
    { id:7, question:'Wie lange muss die tägliche Freizeit Jugendlicher mindestens sein?', type:'single', options:[{id:'a',text:'8 Stunden'},{id:'b',text:'10 Stunden'},{id:'c',text:'12 Stunden',correct:true},{id:'d',text:'24 Stunden'}], explanation:'Das JArbSchG verlangt mindestens 12 Stunden ununterbrochene Freizeit.', points:2 },
    { id:8, question:'Welche Aussage zum Mutterschutz ist richtig?', type:'single', options:[{id:'a',text:'Schwangerschaft führt immer sofort zu einem Beschäftigungsverbot.'},{id:'b',text:'Gefährdungen müssen beurteilt und Schutzmaßnahmen getroffen werden.',correct:true},{id:'c',text:'Mutterschutz gilt nicht für Auszubildende.'},{id:'d',text:'Arbeitsschutz spielt keine Rolle.'}], explanation:'Zuerst stehen Gefährdungsbeurteilung und geeignete Schutzmaßnahmen.', points:2 },
    { id:9, question:'Eine Freundin fragt, weshalb ihr Nachbar in der Praxis war. Was ist richtig?', type:'single', options:[{id:'a',text:'kurz erzählen'},{id:'b',text:'keine Auskunft geben',correct:true},{id:'c',text:'nur die Diagnose nennen'},{id:'d',text:'die Akte zeigen'}], explanation:'Patienteninformationen unterliegen der Vertraulichkeit.', points:2 },
    { id:10, question:'Was ist bei einer unklaren ärztlichen Anordnung zu tun?', type:'single', options:[{id:'a',text:'raten'},{id:'b',text:'nachfragen und klären',correct:true},{id:'c',text:'immer ausführen'},{id:'d',text:'Patient entscheiden lassen'}], explanation:'Unklare Anordnungen werden geklärt.', points:2 },
    { id:11, question:'Welche Institution ist zentral für die vertragsärztliche Versorgung in der Region?', type:'single', options:[{id:'a',text:'Kassenärztliche Vereinigung',correct:true},{id:'b',text:'Feuerwehr'},{id:'c',text:'Finanzamt'},{id:'d',text:'Schulamt'}], explanation:'Die KVen organisieren die vertragsärztliche Versorgung.', points:2 },
    { id:12, question:'Welche Institution hat wichtige Aufgaben bei MFA-Ausbildung und Berufsrecht?', type:'single', options:[{id:'a',text:'Ärztekammer',correct:true},{id:'b',text:'Krankenkasse'},{id:'c',text:'Rettungsleitstelle'},{id:'d',text:'Apotheke'}], explanation:'Die Ärztekammer ist zuständige Stelle für die MFA-Ausbildung.', points:2 },
    { id:13, question:'Nenne zwei typische Gefährdungen am Arbeitsplatz Arztpraxis.', type:'text', correctAnswer:'infektion,nadelstich,stich,schnitt,gefahrstoff,sturz,ergonomie,psychisch', explanation:'Beispiele sind Infektionsrisiken, Stichverletzungen, Gefahrstoffe, Stolperstellen oder ergonomische Belastung.', points:3 },
    { id:14, question:'Was ist die TRBA 250?', type:'single', options:[{id:'a',text:'eine technische Regel zu biologischen Arbeitsstoffen im Gesundheitsdienst',correct:true},{id:'b',text:'eine Gebührenordnung'},{id:'c',text:'ein Impfstoff'},{id:'d',text:'eine Diagnose'}], explanation:'Die TRBA 250 konkretisiert Schutzmaßnahmen bei biologischen Arbeitsstoffen im Gesundheitsdienst.', points:2 },
    { id:15, question:'Was ist bei einem bemerkten Fehler zuerst wichtig?', type:'single', options:[{id:'a',text:'verheimlichen'},{id:'b',text:'Patientensicherheit sichern und den Fehler melden',correct:true},{id:'c',text:'Akte löschen'},{id:'d',text:'niemandem etwas sagen'}], explanation:'Sicherheit und transparente Klärung haben Vorrang.', points:2 },
    { id:16, question:'Warum ist eine gute Praxisorganisation medizinisch relevant?', type:'single', options:[{id:'a',text:'nur wegen schöner Räume'},{id:'b',text:'sie reduziert Fehler und unterstützt sichere Versorgung',correct:true},{id:'c',text:'sie ersetzt ärztliche Entscheidungen'},{id:'d',text:'sie ist nur für Werbung wichtig'}], explanation:'Organisation beeinflusst Informationsfluss, Termine, Hygiene und Sicherheit.', points:2 },
    { id:17, question:'Was bedeutet professionelle Teamkommunikation?', type:'multiple', options:[{id:'a',text:'klare Übergaben',correct:true},{id:'b',text:'bei Unklarheiten rückfragen',correct:true},{id:'c',text:'wichtige Informationen dokumentieren',correct:true},{id:'d',text:'Fehler verschweigen'}], explanation:'Klare, sachliche und rechtzeitige Kommunikation reduziert Risiken.', points:3 },
    { id:18, question:'Erkläre kurz, warum Ausbildung mehr ist als normale Mitarbeit.', type:'text', correctAnswer:'lernen,ausbildungsziel,kenntnisse,fertigkeiten,ausbildungszweck', explanation:'Die Tätigkeit muss dem Erwerb beruflicher Handlungsfähigkeit und dem Ausbildungsziel dienen.', points:3 },
  ]
};
