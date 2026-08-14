import type { LearningModule, QuizQuestion } from '@/types';
import { compareVisual, processVisual, cycleVisual } from './visualKit';

const marketingTools = compareVisual('Praxismarketing wirkt an vielen Kontaktpunkten', [
  { title: 'Persönlicher Kontakt', lines: ['Freundlichkeit', 'klare Kommunikation', 'Verlässlichkeit', 'Mund-zu-Mund-Empfehlung', 'Patientenzufriedenheit'] },
  { title: 'Außenauftritt', lines: ['Praxishomepage', 'Informationsmaterial', 'sachliche Werbung', 'Praxisräume', 'einheitliches Erscheinungsbild'] },
  { title: 'Patientenbindung', lines: ['Online-Termine', 'Rezeptservice', 'Recall', 'Informationsangebote', 'verlässliche Erreichbarkeit'] },
]);

const igelTypes = compareVisual('Leistungsarten rund um IGeL einordnen', [
  { title: 'Grundleistung', lines: ['Leistung der gesetzlichen Krankenversicherung', 'muss medizinisch notwendig und im Leistungskatalog enthalten sein', 'keine private Zusatzrechnung für dieselbe Kassenleistung'] },
  { title: 'Ermessensleistung', lines: ['Kassen können freiwillig zusätzliche Leistungen anbieten', 'Umfang kann sich je Krankenkasse unterscheiden', 'vorher Kostenübernahme klären'] },
  { title: 'IGeL', lines: ['nicht regulär von der GKV übernommen', 'Patient zahlt selbst', 'vorher informieren und schriftlich vereinbaren', 'Abrechnung nach GOÄ'] },
]);

const postProcess = processVisual('Postbearbeitung in der Praxis', [
  { title: 'Eingang prüfen', text: 'Adressat, Praxispost oder Privatpost und Dringlichkeit erkennen' },
  { title: 'Bearbeiten', text: 'Praxispost öffnen, Vollständigkeit prüfen, Eingang kennzeichnen und sortieren' },
  { title: 'Weiterleiten', text: 'an zuständige Person geben und Datenschutz beachten' },
  { title: 'Ausgang prüfen', text: 'Unterschriften, Reihenfolge und Anlagen kontrollieren' },
  { title: 'Versenden', text: 'geeignete Versandart wählen, korrekt adressieren und frankieren' },
], 'Privatpost bleibt ungeöffnet und wird an den Adressaten weitergegeben.');

const qmCycle = cycleVisual('Qualitätsmanagement in der Praxis', [
  { title: 'Erkennen', text: 'Probleme und Risiken erfassen' },
  { title: 'Planen', text: 'Ziele und Standards festlegen' },
  { title: 'Umsetzen', text: 'Abläufe verbindlich anwenden' },
  { title: 'Prüfen', text: 'Ergebnisse und Fehler auswerten' },
  { title: 'Verbessern', text: 'Maßnahmen anpassen und sichern' },
]);

const appointmentSystems = compareVisual('Drei Systeme der Terminorganisation', [
  { title: 'Offene Sprechstunde', lines: ['ohne festen Einzeltermin', 'flexibel für Patienten', 'Wartezeiten schwer planbar', 'Belastung kann stark schwanken'] },
  { title: 'Halboffene Sprechstunde', lines: ['Mischung aus Termin- und Akutzeiten', 'mehr Steuerung als offene Sprechstunde', 'Puffer für Unvorhergesehenes nötig'] },
  { title: 'Bestellsystem', lines: ['feste Termine', 'Kapazität besser planbar', 'weniger Wartezeit bei guter Planung', 'Verspätungen wirken auf Folgetermine'] },
]);

const ciVisual = compareVisual('Corporate Identity: drei Bereiche wirken zusammen', [
  { title: 'Corporate Culture', lines: ['Werte und Umgang im Team', 'Führungsverhalten', 'Patientenorientierung', 'Praxisphilosophie'] },
  { title: 'Corporate Design', lines: ['Logo und Farben', 'Schrift und Formulare', 'Kleidung und Räume', 'Wiedererkennung'] },
  { title: 'Corporate Communication', lines: ['Telefon und Empfang', 'Website und Schreiben', 'interne Kommunikation', 'einheitlicher Sprachstil'] },
]);

const organisationFlow = processVisual('Von Aufgaben zur funktionierenden Praxisorganisation', [
  { title: 'Aufgabenanalyse', text: 'Gesamtaufgabe in Teilaufgaben zerlegen' },
  { title: 'Aufgabensynthese', text: 'zusammengehörige Aufgaben sinnvoll bündeln' },
  { title: 'Stellen bilden', text: 'Verantwortung, Befugnisse und Vertretung zuordnen' },
  { title: 'Abläufe festlegen', text: 'Reihenfolge, Ort, Zeit und Zuständigkeit beschreiben' },
  { title: 'Dokumentieren', text: 'Stellenbeschreibung, Checkliste oder Flowchart aktuell halten' },
], 'Aufbauorganisation beantwortet „Wer macht was?“ – Ablauforganisation „Wie läuft es ab?“.');

const checklistFlow = compareVisual('Checkliste oder Flowchart?', [
  { title: 'Checkliste', lines: ['prüft Vollständigkeit', 'ideal für wiederkehrende Kontrollen', 'senkt Vergessensfehler', 'hilft bei Einarbeitung', 'Beispiel: Notfallkoffer'] },
  { title: 'Flowchart', lines: ['zeigt Reihenfolge und Entscheidungen', 'Start/Ende und Prozessschritte', 'Abzweigungen bei Ja/Nein', 'macht komplexe Abläufe sichtbar', 'Beispiel: Patientenaufnahme'] },
]);

const complaintFlow = processVisual('Beschwerde professionell bearbeiten', [
  { title: 'Zuhören', text: 'ruhig bleiben, ausreden lassen und Anliegen ernst nehmen' },
  { title: 'Klären', text: 'Sachverhalt mit offenen Fragen konkretisieren' },
  { title: 'Lösung anbieten', text: 'im eigenen Kompetenzrahmen handeln oder zuständige Person holen' },
  { title: 'Dokumentieren', text: 'relevante Beschwerde nachvollziehbar festhalten' },
  { title: 'Verbessern', text: 'Ursache im Team auswerten und Wiederholung verhindern' },
], 'Eine Beschwerde ist auch eine Information darüber, wo ein Praxisablauf verbessert werden kann.');

const sourceQuestions: Omit<QuizQuestion, 'id'>[] = [
  { question: 'Welche Ziele nennt die Unterlage für Praxismarketing?', type: 'multiple', options: [{id:'a',text:'Patientenorientierung',correct:true},{id:'b',text:'Patientenzufriedenheit',correct:true},{id:'c',text:'Empfehlungsmarketing',correct:true},{id:'d',text:'möglichst lange Wartezeiten'}], explanation: 'Praxismarketing soll die Praxis patientenorientiert, vertrauenswürdig und empfehlenswert machen.', points: 3 },
  { question: 'Welche Maßnahmen gehören in der Unterlage zu den Instrumenten des Praxismarketings?', type: 'multiple', options: [{id:'a',text:'freundlicher Umgang',correct:true},{id:'b',text:'Praxishomepage',correct:true},{id:'c',text:'Recall',correct:true},{id:'d',text:'Online-Termine',correct:true}], explanation: 'Marketing umfasst weit mehr als Werbung und beginnt bei der gesamten Patientenreise.', points: 4 },
  { question: 'Welche Aussage zur Werbung entspricht dem Lernprinzip der Unterlage?', type: 'single', options: [{id:'a',text:'Sachliche Information ist zulässig; irreführende oder marktschreierische Aussagen sind problematisch.',correct:true},{id:'b',text:'Ärzte dürfen jede beliebige Werbeaussage verwenden.'},{id:'c',text:'Eine Homepage ist grundsätzlich verboten.'},{id:'d',text:'Nur Preiswerbung ist erlaubt.'}], explanation: 'Die Unterlage trennt sachliche Information von unzulässiger beziehungsweise irreführender Werbung.', points: 2 },
  { question: 'Wofür steht IGeL?', type: 'single', options: [{id:'a',text:'Individuelle Gesundheitsleistungen',correct:true},{id:'b',text:'Internes Gesundheitslabor'},{id:'c',text:'Internetgebühr für Leistungen'},{id:'d',text:'Individueller Gemeinschaftsleistungskatalog'}], explanation: 'IGeL sind individuell vereinbarte ärztliche Leistungen außerhalb des regulären GKV-Leistungskatalogs.', points: 2 },
  { question: 'Was muss vor einer IGeL-Leistung organisatorisch geklärt werden?', type: 'multiple', options: [{id:'a',text:'welche Leistung vereinbart wird',correct:true},{id:'b',text:'Kosten beziehungsweise Honorar',correct:true},{id:'c',text:'Hinweis auf Selbstzahlung',correct:true},{id:'d',text:'schriftliche Vereinbarung nach Praxisvorgabe',correct:true}], explanation: 'Der Patient soll vor der Durchführung wissen, was gemacht wird und welche Kosten entstehen.', points: 4 },
  { question: 'Wie wird eine IGeL nach der Unterlage vergütet?', type: 'single', options: [{id:'a',text:'nach GOÄ',correct:true},{id:'b',text:'immer kostenlos'},{id:'c',text:'nur mit Bargeld'},{id:'d',text:'über eine Postgebühr'}], explanation: 'Die Unterlage ordnet die private Vergütung der GOÄ zu.', points: 2 },
  { question: 'Wie wird Privatpost in der eingehenden Post behandelt?', type: 'single', options: [{id:'a',text:'ungeöffnet an den Adressaten weiterleiten',correct:true},{id:'b',text:'immer öffnen und kopieren'},{id:'c',text:'sofort vernichten'},{id:'d',text:'im Wartezimmer auslegen'}], explanation: 'Privatpost ist von der normalen Praxispost zu unterscheiden.', points: 2 },
  { question: 'Was wird bei der Ausgangspost vor dem Versand geprüft?', type: 'multiple', options: [{id:'a',text:'Unterschriften',correct:true},{id:'b',text:'richtige Reihenfolge',correct:true},{id:'c',text:'Vollständigkeit der Anlagen',correct:true},{id:'d',text:'passende Versandart',correct:true}], explanation: 'Diese Kontrollen verhindern unvollständige oder falsch versandte Schreiben.', points: 4 },
  { question: 'Welche Zusatzleistung der Post dokumentiert nur den Einwurf in den Briefkasten?', type: 'single', options: [{id:'a',text:'Einwurf-Einschreiben',correct:true},{id:'b',text:'Eigenhändig'},{id:'c',text:'Expressbrief'},{id:'d',text:'Postkarte'}], explanation: 'Beim Einwurf-Einschreiben wird der Einwurf dokumentiert.', points: 2 },
  { question: 'Was bedeutet Qualität im QM-Kontext der Unterlage?', type: 'single', options: [{id:'a',text:'Bedürfnisse beziehungsweise Anforderungen des Patienten zuverlässig erfüllen',correct:true},{id:'b',text:'möglichst viele Formulare drucken'},{id:'c',text:'jede Arbeit doppelt machen'},{id:'d',text:'nur schöne Räume haben'}], explanation: 'Qualität bezieht sich auf zuverlässige, sichere und patientenorientierte Prozesse.', points: 2 },
  { question: 'Welche Ziele nennt die Unterlage für Qualitätsmanagement?', type: 'multiple', options: [{id:'a',text:'stabile Prozesse sicherstellen',correct:true},{id:'b',text:'Fehler verhindern',correct:true},{id:'c',text:'kontinuierliche Verbesserung',correct:true},{id:'d',text:'Beschwerden ignorieren'}], explanation: 'QM soll Abläufe beherrschbar machen und systematisch verbessern.', points: 3 },
  { question: 'Wofür steht PDCA?', type: 'single', options: [{id:'a',text:'Plan – Do – Check – Act',correct:true},{id:'b',text:'Patient – Diagnose – Code – Abrechnung'},{id:'c',text:'Post – Daten – Checkliste – Archiv'},{id:'d',text:'Plan – Delete – Copy – Add'}], explanation: 'PDCA beschreibt den kontinuierlichen Verbesserungszyklus.', points: 2 },
  { question: 'Welche Hilfsmittel können Praxisabläufe standardisieren?', type: 'multiple', options: [{id:'a',text:'Arbeitsanweisungen',correct:true},{id:'b',text:'Flowcharts',correct:true},{id:'c',text:'Checklisten',correct:true},{id:'d',text:'Organigramme',correct:true}], explanation: 'Die Unterlage nennt diese Instrumente ausdrücklich zur Beschreibung und Standardisierung.', points: 4 },
  { question: 'Welche Faktoren gehören zum Praxisklima?', type: 'multiple', options: [{id:'a',text:'Umgang im Team',correct:true},{id:'b',text:'Umfeld und Räumlichkeiten',correct:true},{id:'c',text:'Atmosphäre',correct:true},{id:'d',text:'nur die Außentemperatur'}], explanation: 'Praxisklima entsteht aus menschlichen und räumlichen Faktoren.', points: 3 },
  { question: 'Warum werden in einem Terminplan Pufferzeiten vorgesehen?', type: 'single', options: [{id:'a',text:'für Notfälle, Verzögerungen und unvorhergesehene Ereignisse',correct:true},{id:'b',text:'damit alle Patienten länger warten'},{id:'c',text:'um keine Termine mehr zu vergeben'},{id:'d',text:'nur für Postsendungen'}], explanation: 'Pufferzeiten verhindern, dass kleine Verzögerungen den gesamten Tagesplan kippen.', points: 2 },
  { question: 'Welches Terminmodell arbeitet überwiegend mit festen Einzelterminen?', type: 'single', options: [{id:'a',text:'Bestellsystem',correct:true},{id:'b',text:'offene Sprechstunde'},{id:'c',text:'Briefkastenmodell'},{id:'d',text:'Praxismarketing'}], explanation: 'Beim Bestellsystem werden Patienten zu geplanten Zeiten bestellt.', points: 2 },
  { question: 'Was ist ein Vorteil einer offenen Sprechstunde?', type: 'single', options: [{id:'a',text:'Patienten können ohne vorherigen Einzeltermin kommen.',correct:true},{id:'b',text:'Wartezeit ist immer exakt null.'},{id:'c',text:'Es gibt keine Akutpatienten.'},{id:'d',text:'Kapazität ist immer perfekt vorhersehbar.'}], explanation: 'Die Flexibilität ist hoch, dafür sind Wartezeiten und Auslastung schwerer zu planen.', points: 2 },
  { question: 'Welche drei Bereiche gehören zur Corporate Identity?', type: 'multiple', options: [{id:'a',text:'Corporate Culture',correct:true},{id:'b',text:'Corporate Design',correct:true},{id:'c',text:'Corporate Communication',correct:true},{id:'d',text:'Corporate Diagnosis'}], explanation: 'Die Unterlage gliedert CI in Kultur, Design und Kommunikation.', points: 3 },
  { question: 'Was bedeutet Recall in einer Arztpraxis?', type: 'single', options: [{id:'a',text:'Patienten an vereinbarte Vorsorge-, Kontroll- oder Nachsorgetermine erinnern',correct:true},{id:'b',text:'Rechnungen löschen'},{id:'c',text:'Post ungeöffnet zurücksenden'},{id:'d',text:'Mitarbeiter kündigen'}], explanation: 'Recall unterstützt Patientenbindung und Versorgung durch Erinnerungen.', points: 2 },
  { question: 'Was ist die Aufbauorganisation?', type: 'single', options: [{id:'a',text:'Zuordnung von Aufgaben, Stellen, Verantwortung und Weisungswegen',correct:true},{id:'b',text:'nur die Reihenfolge eines einzelnen Arbeitsablaufs'},{id:'c',text:'Werbung auf der Homepage'},{id:'d',text:'Postfrankierung'}], explanation: 'Die Aufbauorganisation beschreibt die Struktur einer Praxis.', points: 2 },
  { question: 'Was ist die Ablauforganisation?', type: 'single', options: [{id:'a',text:'Gestaltung der zeitlichen und sachlichen Reihenfolge von Arbeitsabläufen',correct:true},{id:'b',text:'Festlegung des Praxislogos'},{id:'c',text:'nur die Personalauswahl'},{id:'d',text:'nur die Gehaltsabrechnung'}], explanation: 'Ablauforganisation beschreibt, wie Arbeitsschritte nacheinander stattfinden.', points: 2 },
  { question: 'Was geschieht bei der Aufgabenanalyse?', type: 'single', options: [{id:'a',text:'Eine Gesamtaufgabe wird in Teilaufgaben zerlegt.',correct:true},{id:'b',text:'Alle Aufgaben werden gestrichen.'},{id:'c',text:'Nur das Logo wird bewertet.'},{id:'d',text:'Post wird frankiert.'}], explanation: 'Die Analyse zerlegt, die Synthese bündelt anschließend Teilaufgaben.', points: 2 },
  { question: 'Was gehört in eine Stellenbeschreibung?', type: 'multiple', options: [{id:'a',text:'Aufgaben',correct:true},{id:'b',text:'Verantwortung und Befugnisse',correct:true},{id:'c',text:'Unterstellung und Vertretung',correct:true},{id:'d',text:'erforderliche Qualifikationen',correct:true}], explanation: 'Eine Stellenbeschreibung macht Zuständigkeiten transparent.', points: 4 },
  { question: 'Wozu dient eine Checkliste?', type: 'single', options: [{id:'a',text:'Vollständigkeit wiederkehrender Arbeitsschritte sicherstellen',correct:true},{id:'b',text:'nur Werbung gestalten'},{id:'c',text:'Diagnosen automatisch stellen'},{id:'d',text:'jede Verantwortung abschaffen'}], explanation: 'Checklisten reduzieren Vergessensfehler und vereinheitlichen Abläufe.', points: 2 },
  { question: 'Wozu dient ein Flowchart?', type: 'single', options: [{id:'a',text:'Prozessschritte und Entscheidungen grafisch darstellen',correct:true},{id:'b',text:'nur Preise auflisten'},{id:'c',text:'Puls messen'},{id:'d',text:'Urlaubsansprüche berechnen'}], explanation: 'Flowcharts machen Abläufe und Verzweigungen übersichtlich.', points: 2 },
  { question: 'Wie sollte eine MFA auf eine Beschwerde reagieren?', type: 'multiple', options: [{id:'a',text:'ruhig und höflich zuhören',correct:true},{id:'b',text:'Anliegen klären und dokumentieren',correct:true},{id:'c',text:'im Kompetenzrahmen Lösung anbieten oder zuständige Person hinzuziehen',correct:true},{id:'d',text:'Patienten sofort widersprechen'}], explanation: 'Professionelles Beschwerdemanagement nimmt Anliegen ernst und nutzt sie zur Verbesserung.', points: 3 },
  { question: 'Welchen Nutzen können Serviceleistungen für eine Praxis haben?', type: 'multiple', options: [{id:'a',text:'Patientenorientierung verbessern',correct:true},{id:'b',text:'Abläufe erleichtern',correct:true},{id:'c',text:'Patientenbindung stärken',correct:true},{id:'d',text:'Datenschutz überflüssig machen'}], explanation: 'Service soll den Patientenkontakt erleichtern, ohne fachliche, rechtliche oder datenschutzrechtliche Vorgaben zu umgehen.', points: 3 },
];

export function expandLf7FromPdf(module: LearningModule): LearningModule {
  if (module.id !== 'lf7' || module.topics.some(topic => topic.id === 'lf7-pdf-marketing')) return module;
  const startId = Math.max(0, ...module.questions.map(question => question.id)) + 1;
  const questions: QuizQuestion[] = sourceQuestions.map((question, index) => ({ ...question, id: startId + index }));

  return {
    ...module,
    description: 'Vollständiger Lernkurs zu Praxismarketing, IGeL, Postbearbeitung, Qualitäts- und Zeitmanagement, Corporate Identity, Praxisorganisation, Checklisten, Flowcharts, Service und Beschwerdemanagement. Die Inhalte der hochgeladenen LF7-Unterlage sind als verständliche Lernschritte und Prüfungsaufgaben integriert.',
    topics: [
      ...module.topics,
      {
        id: 'lf7-pdf-marketing',
        title: '9. Praxismarketing vollständig: vom ersten Kontakt bis zum Recall',
        content: [
          { type: 'image', src: marketingTools, alt: 'Instrumente des Praxismarketings', caption: 'Marketing entsteht an jedem Kontaktpunkt und nicht nur durch klassische Werbung.' },
          { type: 'text', text: 'Die Unterlage nennt Patientenorientierung, Patientenzufriedenheit und Empfehlungsmarketing als zentrale Ziele. Dazu gehören Freundlichkeit, verständliche Kommunikation, ein professioneller Außenauftritt, eine gute Praxishomepage, Online-Termine beziehungsweise Rezeptservices, Recall und weitere Informationsangebote.' },
          { type: 'heading', title: 'Werbung sachlich gestalten' },
          { type: 'table', headers: ['Eher zulässig im Sinne der Unterlage', 'Problematisch beziehungsweise unzulässig'], rows: [['sachliche Informationen über Leistungen und Organisation','irreführende oder falsche Aussagen'],['Praxishomepage und Informationsmaterial','marktschreierische Anpreisung'],['Flyer, Hinweise und Veranstaltungen im zulässigen Rahmen','vorgetäuschte Qualifikationen'],['kleine geeignete Werbemittel','unzulässige vergleichende oder unangemessen preisbezogene Werbung']] },
          { type: 'warning', title: 'Werberecht ist aktuell zu prüfen', text: 'Die PDF vermittelt prüfungsbezogene Grundregeln. Im Praxisalltag gelten die jeweils aktuellen berufsrechtlichen und heilmittelwerberechtlichen Vorgaben.' },
        ],
      },
      {
        id: 'lf7-pdf-igel',
        title: '10. IGeL, Grund- und Ermessensleistungen sicher unterscheiden',
        content: [
          { type: 'image', src: igelTypes, alt: 'Vergleich von Grundleistung, Ermessensleistung und IGeL', caption: 'Vor jeder privaten Leistung muss klar sein, warum die GKV sie nicht regulär übernimmt.' },
          { type: 'text', text: 'Der Gemeinsame Bundesausschuss legt maßgeblich fest, welche Leistungen zum regulären Leistungskatalog der gesetzlichen Krankenversicherung gehören. Zusätzlich können Krankenkassen freiwillige Satzungs- oder Ermessensleistungen anbieten. IGeL sind davon zu unterscheiden und werden vom Patienten selbst bezahlt.' },
          { type: 'heading', title: 'Patientenvereinbarung vor der Leistung' },
          { type: 'list', items: ['konkrete Leistung benennen', 'GOÄ-Nummer beziehungsweise Abrechnungsgrundlage angeben', 'Steigerungsfaktor beziehungsweise Honorar nachvollziehbar darstellen', 'deutlich machen, dass die Behandlung auf Wunsch erfolgt', 'Hinweis, dass die Krankenkasse die Kosten nicht regulär übernimmt', 'schriftliche Vereinbarung vor der Durchführung nach Praxisvorgabe abschließen'] },
          { type: 'info', title: 'Präventiv oder kurativ?', text: 'Präventive Leistungen sollen Erkrankungen vorbeugen beziehungsweise früh erkennen. Kurative Leistungen dienen der Diagnostik und Behandlung bereits bestehender Beschwerden oder Erkrankungen.' },
        ],
      },
      {
        id: 'lf7-pdf-post',
        title: '11. Postbearbeitung und Versandarten',
        content: [
          { type: 'image', src: postProcess, alt: 'Ablauf der Postbearbeitung', caption: 'Eingang und Ausgang folgen festen Prüfschritten.' },
          { type: 'heading', title: 'Eingehende Post' },
          { type: 'text', text: 'Praxispost wird nach den internen Regeln geöffnet, auf Vollständigkeit geprüft, mit einem Eingangshinweis versehen, nach Wichtigkeit sortiert und an die zuständige Person weitergeleitet. Privatpost wird ungeöffnet an den Adressaten gegeben.' },
          { type: 'heading', title: 'Ausgehende Post' },
          { type: 'text', text: 'Vor dem Versand werden Unterschriften, Reihenfolge der Blätter und Vollständigkeit der Anlagen geprüft. Danach werden Schreiben passend gefaltet, in geeignete Umschläge verpackt, nach Versandart sortiert und korrekt frankiert.' },
          { type: 'table', headers: ['Versandart aus der Unterlage', 'Kernidee'], rows: [['Einschreiben','Nachweis über die Einlieferung beziehungsweise Zustellung je Variante'],['Einwurf-Einschreiben','Einwurf in den Briefkasten wird dokumentiert'],['Übergabe-Einschreiben','Übergabe wird bestätigt'],['Eigenhändig','nur an den benannten Empfänger beziehungsweise Berechtigten'],['Express','beschleunigte Beförderung']] },
        ],
      },
      {
        id: 'lf7-pdf-qm',
        title: '12. Qualitätsmanagement komplett: Ziele, Standards und PDCA',
        content: [
          { type: 'image', src: qmCycle, alt: 'Qualitätsmanagement als Verbesserungskreislauf', caption: 'QM endet nicht mit einer Checkliste, sondern überprüft und verbessert Prozesse fortlaufend.' },
          { type: 'text', text: 'Qualitätsmanagement beginnt beim ersten Patientenkontakt und reicht bis zu Nachsorge und Recall. Mängel können aus unklarer Praxisorganisation, Personalführung oder einem schlechten Betriebsklima entstehen und zu Fehlern, Demotivation und Patientenverlust führen.' },
          { type: 'heading', title: 'Ziele des QM' },
          { type: 'list', items: ['stabile und nachvollziehbare Prozesse sicherstellen', 'Fehler und Risiken möglichst vermeiden', 'Zuständigkeiten klären', 'einheitliche Standards schaffen', 'Ergebnisse kontrollieren und kontinuierlich verbessern'] },
          { type: 'heading', title: 'Standards und Verfahren' },
          { type: 'text', text: 'Die Unterlage nennt ISO-Normen sowie QM-Verfahren wie QEP und KTQ. Für die praktische Prüfung ist vor allem das Prinzip wichtig: Abläufe werden erfasst, beschrieben, standardisiert, allen Mitarbeitenden zugänglich gemacht und regelmäßig überprüft.' },
          { type: 'definition', term: 'PDCA', definition: 'Plan = planen, Do = durchführen, Check = Ergebnis überprüfen, Act = Standard anpassen beziehungsweise Verbesserung sichern.' },
        ],
      },
      {
        id: 'lf7-pdf-zeit',
        title: '13. Zeitmanagement, Urlaubs- und Terminplanung',
        content: [
          { type: 'heading', title: 'Zeitplanung braucht Reserve' },
          { type: 'text', text: 'Ein realistischer Praxisplan enthält nicht nur geplante Termine, sondern auch Zeit für Telefonate, Dokumentation, Akutpatienten, Notfälle und Verzögerungen. Reserve- beziehungsweise Pufferzeiten verhindern, dass ein ungeplantes Ereignis den gesamten Tagesablauf blockiert.' },
          { type: 'heading', title: 'Urlaubsplanung' },
          { type: 'text', text: 'Urlaubspläne sollen frühzeitig erstellt werden. Wünsche der Mitarbeitenden, ausreichende Personalbesetzung und betriebliche Erfordernisse müssen miteinander abgestimmt werden. Die PDF enthält dazu arbeitsrechtliche Merksätze für das Prüfungstraining.' },
          { type: 'warning', title: 'Arbeitsrecht aktuell prüfen', text: 'Konkrete Urlaubsfristen und Übertragungsregeln können von Gesetz, Tarifvertrag, Arbeitsvertrag und aktueller Rechtsprechung abhängen. Im echten Arbeitsverhältnis deshalb nicht nur nach einer alten Lernunterlage entscheiden.' },
          { type: 'image', src: appointmentSystems, alt: 'Vergleich verschiedener Sprechstunden- und Bestellsysteme', caption: 'Jedes System hat Vorteile und organisatorische Nachteile.' },
          { type: 'info', title: 'Terminplanung', text: 'Ziel ist eine schnelle, zuverlässige Patientenversorgung bei sinnvoller Auslastung von Personal und Räumen. Dazu gehören Behandlungsdauer, Dringlichkeit, Telefonzeiten und Puffer.' },
        ],
      },
      {
        id: 'lf7-pdf-ci-recall',
        title: '14. Corporate Identity und Recall',
        content: [
          { type: 'image', src: ciVisual, alt: 'Corporate Culture, Design und Communication', caption: 'Ein glaubwürdiges Praxisbild entsteht nur, wenn Verhalten, Gestaltung und Kommunikation zusammenpassen.' },
          { type: 'text', text: 'Corporate Identity beschreibt das gemeinsame Erscheinungsbild und Selbstverständnis einer Praxis. Corporate Culture umfasst Werte und Verhalten, Corporate Design die sichtbare Gestaltung und Corporate Communication die interne und externe Kommunikation.' },
          { type: 'heading', title: 'Recall als Erinnerungsservice' },
          { type: 'text', text: 'Recall bedeutet, Patienten an vereinbarte Vorsorge-, Kontroll- oder Nachsorgetermine zu erinnern. Voraussetzung ist ein datenschutzgerechter, dokumentierter Ablauf und die notwendige Einwilligung beziehungsweise Rechtsgrundlage nach den Praxisvorgaben.' },
          { type: 'info', title: 'Warum Recall organisatorisch wichtig ist', text: 'Ein Recall kann Versorgung, Termintreue und Patientenbindung verbessern. Er muss aber zuverlässig gepflegt werden: falsche oder doppelte Erinnerungen wirken unprofessionell.' },
        ],
      },
      {
        id: 'lf7-pdf-organisation',
        title: '15. Aufbau- und Ablauforganisation mit Stellenbeschreibung',
        content: [
          { type: 'image', src: organisationFlow, alt: 'Aufgabenanalyse, Aufgabensynthese und Ablauforganisation', caption: 'Aus einer Gesamtaufgabe entstehen Teilaufgaben, Stellen und standardisierte Prozesse.' },
          { type: 'definition', term: 'Aufgabenanalyse', definition: 'Eine Gesamtaufgabe wird nach sinnvollen Kriterien in einzelne Teilaufgaben zerlegt.' },
          { type: 'definition', term: 'Aufgabensynthese', definition: 'Zusammengehörige Teilaufgaben werden wieder zu Aufgabenkomplexen beziehungsweise Stellen gebündelt.' },
          { type: 'heading', title: 'Stellenbeschreibung' },
          { type: 'list', items: ['Bezeichnung der Stelle', 'Aufgaben und Arbeitsbereiche', 'Verantwortung und Befugnisse', 'Unterstellung und Weisungsbeziehungen', 'Vertretungsregelung', 'fachliche und persönliche Anforderungen'] },
          { type: 'heading', title: 'Einlinien- und Mehrliniensystem' },
          { type: 'text', text: 'Beim Einliniensystem erhält eine Stelle Weisungen grundsätzlich von einer übergeordneten Stelle; Verantwortungswege sind klar, aber Entscheidungen können länger dauern. Beim Mehrliniensystem können mehrere fachlich zuständige Stellen Weisungen geben; das kann schneller sein, birgt aber Konfliktrisiken.' },
          { type: 'heading', title: 'Ablauforganisation' },
          { type: 'text', text: 'Ablauforganisation beschreibt, in welcher Reihenfolge, zu welcher Zeit, an welchem Ort und durch wen einzelne Arbeitsschritte erfolgen. Gute Ablaufbeschreibungen sind verständlich, widerspruchsfrei, vollständig und aktuell.' },
        ],
      },
      {
        id: 'lf7-pdf-checklists',
        title: '16. Checklisten und Flowcharts richtig einsetzen',
        content: [
          { type: 'image', src: checklistFlow, alt: 'Vergleich Checkliste und Flowchart', caption: 'Checklisten sichern Vollständigkeit, Flowcharts zeigen Reihenfolge und Entscheidungen.' },
          { type: 'heading', title: 'Typische Checklisten aus der Unterlage' },
          { type: 'list', items: ['Materialbeschaffung und Lagerkontrolle', 'Einweisung neuer Mitarbeitender', 'Kontrolle von Notfallausrüstung', 'Geräte- und Hygienekontrollen', 'Patientenaufnahme', 'Terminorganisation', 'Beschwerdeerfassung'] },
          { type: 'heading', title: 'Flowchart-Symbole verstehen' },
          { type: 'table', headers: ['Symbolidee', 'Bedeutung'], rows: [['Start / Ende','Beginn oder Abschluss eines Prozesses'],['Prozess','konkreter Arbeitsschritt'],['Entscheidung','Verzweigung, häufig Ja/Nein'],['Dokument','Dokument wird erstellt, geprüft oder benötigt'],['Pfeil','zeigt die Ablaufrichtung']] },
          { type: 'info', title: 'Nutzen', text: 'Standardisierte Hilfsmittel sparen Zeit, reduzieren Fehler und Informationsverluste und erleichtern die Einarbeitung.' },
        ],
      },
      {
        id: 'lf7-pdf-service-beschwerde',
        title: '17. Serviceleistungen und Beschwerdemanagement',
        content: [
          { type: 'heading', title: 'Serviceangebote' },
          { type: 'text', text: 'Die Unterlage nennt unter anderem Telefon- und Adressservice, Rezept- oder Überweisungsservice, geeignete Postservices sowie weitere organisatorische Hilfen. Entscheidend ist, dass Service den Praxisalltag erleichtert, ohne Datenschutz, Schweigepflicht oder medizinische Zuständigkeiten zu verletzen.' },
          { type: 'image', src: complaintFlow, alt: 'Ablauf professionellen Beschwerdemanagements', caption: 'Zuhören, klären, lösen, dokumentieren und anschließend aus dem Fall lernen.' },
          { type: 'heading', title: 'Beschwerden als Qualitätsinformation' },
          { type: 'text', text: 'Beschwerden werden ruhig, höflich und möglichst ohne Rechtfertigungsreflex angenommen. Der Sachverhalt wird geklärt und dokumentiert. Wenn ein Fehler vorliegt, sollte er intern offen ausgewertet werden. Wiederkehrende Beschwerden zeigen häufig einen systematischen Schwachpunkt im Ablauf.' },
          { type: 'info', title: 'Praxisbeispiel', text: 'Ein Patient beschwert sich über lange Wartezeit trotz Termin. Statt nur zu entschuldigen, wird geprüft: War die Terminlänge realistisch? Gab es Akutpatienten? Fehlen Pufferzeiten? Wurde über die Verzögerung informiert? Daraus kann eine konkrete QM-Maßnahme entstehen.' },
        ],
      },
    ],
    questions: [...module.questions, ...questions],
  };
}
