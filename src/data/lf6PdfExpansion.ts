import type { LearningModule, QuizQuestion } from '@/types';
import { compareVisual, processVisual } from './visualKit';

const legalForms = compareVisual('Rechtsgeschäfte sicher unterscheiden', [
  { title: 'Einseitig', lines: ['eine Willenserklärung genügt', 'z. B. Kündigung, Testament, Mahnung', 'kann empfangsbedürftig sein'] },
  { title: 'Zweiseitig', lines: ['mindestens zwei passende Willenserklärungen', 'typisch: Verträge', 'Angebot + Annahme'] },
  { title: 'Wirksamkeit', lines: ['nichtig = von Anfang an unwirksam', 'anfechtbar = zunächst wirksam', 'Zugang kann entscheidend sein'] },
]);

const procurementCalc = processVisual('Angebotsvergleich aus der Unterlage', [
  { title: 'Listeneinkaufspreis', text: 'Ausgangspunkt des Angebots' },
  { title: 'Rabatt abziehen', text: 'ergibt Zieleinkaufspreis' },
  { title: 'Skonto abziehen', text: 'ergibt Bareinkaufspreis' },
  { title: 'Bezugskosten addieren', text: 'Fracht, Porto, Verpackung usw.' },
  { title: 'MwSt. addieren', text: 'ergibt Rechnungsbetrag' },
], 'Nicht der Listenpreis allein entscheidet, sondern der Bezugspreis beziehungsweise Endpreis.');

const disruptions = compareVisual('Kaufvertragsstörungen', [
  { title: 'Mangelhafte Lieferung', lines: ['offener, versteckter, arglistiger Mangel', 'Falschlieferung, Qualitäts-, Mengen- oder Montagemangel', 'Nacherfüllung und weitere Rechte prüfen'] },
  { title: 'Lieferungsverzug', lines: ['Fälligkeit beachten', 'mit oder ohne kalendermäßig bestimmten Termin', 'Verschulden und mögliche Rechte prüfen'] },
  { title: 'Annahme-/Zahlungsverzug', lines: ['Käufer nimmt Ware nicht an', 'oder Zahlung bleibt aus', 'Mahnung, Frist und Folgen unterscheiden'] },
]);

const paymentTypes = compareVisual('Zahlungsverkehr: bar, halbbar, unbar', [
  { title: 'Barzahlung', lines: ['beide Seiten ohne Konto möglich', 'Bargeld direkt übergeben', 'Quittung als Zahlungsnachweis'] },
  { title: 'Halbbare Zahlung', lines: ['nur eine Seite benötigt ein Konto', 'Zahlschein', 'Barscheck laut Unterlage'] },
  { title: 'Unbare Zahlung', lines: ['beide Seiten nutzen Konten', 'Überweisung', 'Dauerauftrag', 'Lastschrift', 'Kartenzahlung / Onlinebanking'] },
]);

const qualityStock = processVisual('Lagerhaltung in der Arztpraxis', [
  { title: 'Bedarf', text: 'Verbrauch und Mindestbestand kennen' },
  { title: 'Beschaffen', text: 'Lieferzeit, Preis und Qualität vergleichen' },
  { title: 'Lagern', text: 'zugriffssicher, trocken, temperaturgerecht' },
  { title: 'FEFO', text: 'frühestes Verfallsdatum zuerst verwenden' },
  { title: 'Kontrollieren', text: 'Bestand, Verfall und Temperatur dokumentieren' },
], 'Ziel: Versorgung sichern, ohne unnötig Kapital und Lagerfläche zu binden.');

const sourceQuestions: Omit<QuizQuestion, 'id'>[] = [
  { question: 'Was bedeutet Rechtsfähigkeit?', type: 'single', options: [{id:'a',text:'Fähigkeit, Träger von Rechten und Pflichten zu sein',correct:true},{id:'b',text:'Fähigkeit, jede Rechnung zu bezahlen'},{id:'c',text:'nur Verträge kündigen zu können'},{id:'d',text:'eine Praxis eröffnen zu dürfen'}], explanation: 'Rechtsfähigkeit beschreibt die Fähigkeit, Rechte und Pflichten zu haben.', points: 2 },
  { question: 'Welche Altersgruppe ist beschränkt geschäftsfähig?', type: 'single', options: [{id:'a',text:'7 bis 17 Jahre',correct:true},{id:'b',text:'0 bis 6 Jahre'},{id:'c',text:'ab 18 Jahre'},{id:'d',text:'nur 16 bis 17 Jahre'}], explanation: 'Die Unterlage ordnet 7- bis 17-Jährige der beschränkten Geschäftsfähigkeit zu.', points: 2 },
  { question: 'Welche Beispiele nennt die Unterlage für einseitige Rechtsgeschäfte?', type: 'multiple', options: [{id:'a',text:'Kündigung',correct:true},{id:'b',text:'Testament',correct:true},{id:'c',text:'Mahnung',correct:true},{id:'d',text:'Kaufvertrag'}], explanation: 'Einseitige Rechtsgeschäfte benötigen eine Willenserklärung.', points: 3 },
  { question: 'Was ist ein zweiseitiges Rechtsgeschäft?', type: 'single', options: [{id:'a',text:'Ein Rechtsgeschäft mit übereinstimmenden Willenserklärungen von mindestens zwei Personen',correct:true},{id:'b',text:'Ein Testament'},{id:'c',text:'Eine Mahnung'},{id:'d',text:'Eine Quittung'}], explanation: 'Verträge entstehen typischerweise durch zwei übereinstimmende Willenserklärungen.', points: 2 },
  { question: 'Was bedeutet FEFO?', type: 'single', options: [{id:'a',text:'First Expired – First Out',correct:true},{id:'b',text:'First Entered – First Ordered'},{id:'c',text:'Fast Expensive – Fast Out'},{id:'d',text:'Final Entry – Final Order'}], explanation: 'Produkte mit dem frühesten Verfallsdatum werden zuerst verwendet.', points: 2 },
  { question: 'Welche Punkte gehören laut Unterlage zur Kühlschranklagerung?', type: 'multiple', options: [{id:'a',text:'Temperatur regelmäßig ablesen und dokumentieren',correct:true},{id:'b',text:'Lebensmittel und Arzneimittel zusammen lagern'},{id:'c',text:'Kühlschrank nach Hygieneplan reinigen',correct:true},{id:'d',text:'Temperatur mit geeignetem Thermometer kontrollieren',correct:true}], explanation: 'Lebensmittel sollen nicht gemeinsam mit Arzneimitteln gelagert werden.', points: 3 },
  { question: 'Welche Ziele verfolgt Lagerhaltung?', type: 'multiple', options: [{id:'a',text:'Engpässe vermeiden',correct:true},{id:'b',text:'Versorgung sichern',correct:true},{id:'c',text:'Beschaffungs- und Lagerkosten begrenzen',correct:true},{id:'d',text:'möglichst viel Kapital binden'}], explanation: 'Die Unterlage betont Versorgungssicherheit bei möglichst geringer Kapitalbindung und Lagerkosten.', points: 3 },
  { question: 'Welche Abfälle müssen besonders sicher gesammelt werden?', type: 'multiple', options: [{id:'a',text:'Kanülen und Spritzen mit Verletzungsgefahr',correct:true},{id:'b',text:'infektiöse Abfälle',correct:true},{id:'c',text:'gefährliche Chemikalienreste',correct:true},{id:'d',text:'sauberes Papier immer als Sondermüll'}], explanation: 'Spitze/scharfe, infektiöse und gefährliche chemische Abfälle benötigen besondere Entsorgungswege.', points: 3 },
  { question: 'Welche Dokumente nennt die Unterlage im Zusammenhang mit Medizinprodukten?', type: 'multiple', options: [{id:'a',text:'Medizinproduktebuch',correct:true},{id:'b',text:'Bestandsverzeichnis',correct:true},{id:'c',text:'Dokumentation sicherheitstechnischer Kontrollen',correct:true},{id:'d',text:'Urlaubsplan'}], explanation: 'Diese Unterlagen dienen der Rückverfolgbarkeit, Einweisung und Kontrolle bestimmter Medizinprodukte.', points: 3 },
  { question: 'Was ist der Zweck der Buchführung?', type: 'multiple', options: [{id:'a',text:'Geldvorgänge geordnet dokumentieren',correct:true},{id:'b',text:'Überblick über Vermögens- und Finanzlage schaffen',correct:true},{id:'c',text:'Beweismittel bei Streitigkeiten liefern',correct:true},{id:'d',text:'Belege ungeordnet sammeln'}], explanation: 'Die Unterlage nennt Steuerermittlung, Überblick und Beweisfunktion als Zwecke.', points: 3 },
  { question: 'Welche Belegarten werden unterschieden?', type: 'multiple', options: [{id:'a',text:'natürliche Belege',correct:true},{id:'b',text:'künstliche Belege',correct:true},{id:'c',text:'interne und externe Belege',correct:true},{id:'d',text:'medizinische Diagnosen'}], explanation: 'Rechnungen, Quittungen, Ersatzbelege sowie interne und externe Belege werden unterschieden.', points: 3 },
  { question: 'Welches Formular nennt die Unterlage für Sprechstundenbedarf?', type: 'single', options: [{id:'a',text:'Muster 16a',correct:true},{id:'b',text:'Muster 1'},{id:'c',text:'AU-Bescheinigung'},{id:'d',text:'Privatrezept'}], explanation: 'Im hochgeladenen Lernmaterial wird Muster 16a als Sprechstundenbedarfsrezept behandelt.', points: 2 },
  { question: 'Welche Aussage zum Angebot ist richtig?', type: 'single', options: [{id:'a',text:'Ein persönliches Angebot kann verbindlich oder unverbindlich sein.',correct:true},{id:'b',text:'Jede Werbung ist automatisch ein verbindliches Angebot.'},{id:'c',text:'Angebote enthalten nie Lieferbedingungen.'},{id:'d',text:'Ein Angebot darf keinen Preis enthalten.'}], explanation: 'Die Unterlage unterscheidet Angebot an die Allgemeinheit und persönliches Angebot sowie verbindliche/unverbindliche Formen.', points: 2 },
  { question: 'Welche Angaben gehören laut Unterlage in ein ausführliches Angebot?', type: 'multiple', options: [{id:'a',text:'Beschreibung der Ware',correct:true},{id:'b',text:'Preis',correct:true},{id:'c',text:'Zahlungs- und Lieferbedingungen',correct:true},{id:'d',text:'Gerichtsstand beziehungsweise rechtliche Bedingungen',correct:true}], explanation: 'Diese Punkte helfen dem Käufer, Angebote vollständig zu vergleichen.', points: 4 },
  { question: 'Wie beginnt der Angebotsvergleich rechnerisch?', type: 'single', options: [{id:'a',text:'mit dem Listeneinkaufspreis',correct:true},{id:'b',text:'mit dem Skonto'},{id:'c',text:'mit der Quittung'},{id:'d',text:'mit dem Girokonto'}], explanation: 'Vom Listeneinkaufspreis werden Preisnachlässe abgezogen und Bezugskosten addiert.', points: 2 },
  { question: 'Welche Preisnachlässe nennt die Unterlage?', type: 'multiple', options: [{id:'a',text:'Skonto',correct:true},{id:'b',text:'Bonus',correct:true},{id:'c',text:'Rabatt',correct:true},{id:'d',text:'Verzugszinsen'}], explanation: 'Skonto, Bonus und Rabatt werden als Formen von Preisnachlässen behandelt.', points: 3 },
  { question: 'Welche Pflichten hat der Verkäufer aus einem Kaufvertrag?', type: 'multiple', options: [{id:'a',text:'mangelfreie Ware übergeben',correct:true},{id:'b',text:'Eigentum übertragen',correct:true},{id:'c',text:'Ware annehmen'},{id:'d',text:'Kaufpreis bezahlen'}], explanation: 'Annahme und Bezahlung gehören zu den Pflichten des Käufers.', points: 2 },
  { question: 'Welche Störungen können beim Kaufvertrag auftreten?', type: 'multiple', options: [{id:'a',text:'mangelhafte Lieferung',correct:true},{id:'b',text:'Lieferungsverzug',correct:true},{id:'c',text:'Annahmeverzug',correct:true},{id:'d',text:'Zahlungsverzug',correct:true}], explanation: 'Alle vier Störungen stehen in der Übersicht des Lernfelds.', points: 4 },
  { question: 'Was ist eine mangelhafte Lieferung?', type: 'single', options: [{id:'a',text:'Die Ware entspricht nicht der geschuldeten Beschaffenheit oder Menge.',correct:true},{id:'b',text:'Der Käufer bezahlt zu früh.'},{id:'c',text:'Die Praxis erhält eine Quittung.'},{id:'d',text:'Der Verkäufer sendet eine Mahnung.'}], explanation: 'Mängel können Qualität, Menge, Art oder Montage betreffen.', points: 2 },
  { question: 'Was bedeutet Lieferungsverzug?', type: 'single', options: [{id:'a',text:'Eine fällige Lieferung erfolgt nicht rechtzeitig.',correct:true},{id:'b',text:'Der Käufer nimmt Ware nicht an.'},{id:'c',text:'Die Zahlung ist zu hoch.'},{id:'d',text:'Ein Angebot ist unverbindlich.'}], explanation: 'Beim Lieferungsverzug bleibt die geschuldete Lieferung trotz Fälligkeit aus.', points: 2 },
  { question: 'Was bedeutet Annahmeverzug?', type: 'single', options: [{id:'a',text:'Der Käufer nimmt eine ordnungsgemäß angebotene fällige Leistung nicht an.',correct:true},{id:'b',text:'Der Verkäufer liefert zu spät.'},{id:'c',text:'Die Bank sperrt ein Konto.'},{id:'d',text:'Die Ware ist mangelhaft.'}], explanation: 'Die Unterlage behandelt Annahmeverzug als Störung auf Käuferseite.', points: 2 },
  { question: 'Welche Zahlungsform ist unbar?', type: 'multiple', options: [{id:'a',text:'Überweisung',correct:true},{id:'b',text:'Dauerauftrag',correct:true},{id:'c',text:'Lastschrift',correct:true},{id:'d',text:'Barzahlung'}], explanation: 'Bei unbaren Zahlungen werden Konten auf beiden Seiten genutzt.', points: 3 },
  { question: 'Wer stößt bei einer Überweisung die Zahlung an?', type: 'single', options: [{id:'a',text:'der Zahlungspflichtige',correct:true},{id:'b',text:'immer der Zahlungsempfänger'},{id:'c',text:'die Post'},{id:'d',text:'der Arzt automatisch'}], explanation: 'Die Überweisung ist ein Auftrag des Zahlers an seine Bank.', points: 2 },
  { question: 'Was ist ein Dauerauftrag?', type: 'single', options: [{id:'a',text:'Auftrag an die Bank, einen festen Betrag regelmäßig zu festgelegten Terminen zu überweisen',correct:true},{id:'b',text:'ein einmaliger Bargeldbeleg'},{id:'c',text:'eine Kreditkarte'},{id:'d',text:'eine Mahnung'}], explanation: 'Daueraufträge eignen sich für wiederkehrende Zahlungen.', points: 2 },
  { question: 'Was ist das Prinzip einer Lastschrift?', type: 'single', options: [{id:'a',text:'Der Zahlungsempfänger zieht mit Ermächtigung/Mandat einen Betrag vom Konto ein.',correct:true},{id:'b',text:'Der Zahler übergibt Bargeld.'},{id:'c',text:'Die Bank schenkt Geld.'},{id:'d',text:'Der Patient schreibt eine Quittung.'}], explanation: 'Anders als bei der Überweisung initiiert der Empfänger den Einzug.', points: 2 },
  { question: 'Wofür stehen IBAN und BIC?', type: 'multiple', options: [{id:'a',text:'IBAN = internationale Bankkontonummer',correct:true},{id:'b',text:'BIC = internationaler Bank-/Institutskenncode',correct:true},{id:'c',text:'IBAN = Versicherungsnummer'},{id:'d',text:'BIC = Rezeptnummer'}], explanation: 'Beide Begriffe werden im Abschnitt zum SEPA-Zahlungsverkehr erklärt.', points: 2 },
  { question: 'Welche Aussage zu AGB ist richtig?', type: 'single', options: [{id:'a',text:'AGB sind vorformulierte Bedingungen für viele Verträge und müssen wirksam einbezogen werden.',correct:true},{id:'b',text:'AGB ersetzen immer jedes Gesetz.'},{id:'c',text:'AGB gelten geheim.'},{id:'d',text:'AGB sind nur für Barzahlungen gedacht.'}], explanation: 'Die Unterlage erklärt Voraussetzungen der Einbeziehung und unzulässige Klauseln.', points: 2 },
];

export function expandLf6FromPdf(module: LearningModule): LearningModule {
  if (module.id !== 'lf6' || module.topics.some(topic => topic.id === 'lf6-pdf-recht')) return module;
  const startId = Math.max(0, ...module.questions.map(question => question.id)) + 1;
  const questions: QuizQuestion[] = sourceQuestions.map((question, index) => ({ ...question, id: startId + index }));

  return {
    ...module,
    description: 'Vollständiger Lernkurs zu Rechtsgeschäften, Beschaffung, Lagerhaltung, Ökologie, Medizinprodukten, Sprechstundenbedarf, Kaufverträgen und Zahlungsverkehr. Die Inhalte der hochgeladenen LF6-Unterlage sind als Lernschritte, Tabellen, Schaubilder, Fälle und Prüfungsfragen integriert.',
    topics: [
      ...module.topics,
      {
        id: 'lf6-pdf-recht',
        title: '9. Rechtsgeschäfte vollständig: Form, Art, Zugang und Wirksamkeit',
        content: [
          { type: 'image', src: legalForms, alt: 'Einseitige und zweiseitige Rechtsgeschäfte', caption: 'Rechtsgeschäfte werden nach Zahl der Willenserklärungen und ihrer Wirksamkeit unterschieden.' },
          { type: 'text', text: 'Rechtsgeschäfte entstehen durch rechtswirksame Willenserklärungen. Eine Willenserklärung kann ausdrücklich, schriftlich, mündlich, elektronisch oder durch schlüssiges Handeln erfolgen. In manchen Fällen kann auch Schweigen rechtlich bewertet werden, wobei die konkrete gesetzliche Situation entscheidend ist.' },
          { type: 'table', headers: ['Begriff', 'Kernaussage'], rows: [['Einseitiges Rechtsgeschäft','eine Willenserklärung genügt'],['Zweiseitiges Rechtsgeschäft','mindestens zwei übereinstimmende Willenserklärungen'],['Empfangsbedürftig','wird grundsätzlich mit Zugang beim Empfänger wirksam'],['Nicht empfangsbedürftig','kann bereits mit Abgabe der Erklärung wirksam werden'],['Nichtig','von Anfang an ohne die beabsichtigte Rechtswirkung'],['Anfechtbar','zunächst wirksam, kann durch wirksame Anfechtung rückwirkend beseitigt werden']] },
          { type: 'heading', title: 'Rechtsfähigkeit und Geschäftsfähigkeit' },
          { type: 'text', text: 'Rechtsfähigkeit bedeutet, Träger von Rechten und Pflichten sein zu können. Geschäftsfähigkeit bedeutet, Rechtsgeschäfte selbst wirksam vornehmen zu können. Die Unterlage unterscheidet Geschäftsunfähigkeit unter 7 Jahren, beschränkte Geschäftsfähigkeit von 7 bis 17 Jahren und volle Geschäftsfähigkeit ab 18 Jahren.' },
          { type: 'info', title: 'Prüfungsstrategie', text: 'Bei Minderjährigen zuerst Alter bestimmen, dann prüfen, ob Zustimmung nötig ist oder eine gesetzliche Ausnahme greift.' },
        ],
      },
      {
        id: 'lf6-pdf-lager-buch',
        title: '10. Lagerhaltung, Arzneimittelbestand, Bestandsverzeichnis und Buchführung',
        content: [
          { type: 'image', src: qualityStock, alt: 'Kreislauf der Lagerhaltung', caption: 'Bedarf, Beschaffung, richtige Lagerung, FEFO und Kontrolle gehören zusammen.' },
          { type: 'list', items: ['Arzneimittel für Patienten unzugänglich aufbewahren.', 'Vor UV-Licht, Frost, Feuchtigkeit und Wärme schützen.', 'FEFO-Prinzip anwenden.', 'Kühlschranktemperatur kontrollieren und dokumentieren.', 'Arzneimittel nicht mit Lebensmitteln lagern.', 'Verfallene Präparate nicht mehr verwenden und regelgerecht entsorgen.'] },
          { type: 'heading', title: 'Bestandsverzeichnis und Abschreibung' },
          { type: 'text', text: 'Die Unterlage behandelt Anlagegüter, Bestandsverzeichnis und die Absetzung für Abnutzung (AfA). Bei länger genutzten Anlagegütern wird der Anschaffungswert nicht immer in einem einzigen Jahr als Aufwand betrachtet, sondern über die angenommene Nutzungsdauer verteilt.' },
          { type: 'heading', title: 'Buchführung und Belege' },
          { type: 'text', text: 'Buchführung ist die geordnete, lückenlose Aufzeichnung der Geldvorgänge einer Praxis. Belege sollen chronologisch geordnet sein und Angaben wie Datum, Betrag, Zahlungsgrund sowie Beteiligte enthalten. Die Unterlage unterscheidet natürliche, künstliche, interne und externe Belege.' },
        ],
      },
      {
        id: 'lf6-pdf-oekologie-medizinprodukte',
        title: '11. Ökologie, Müllentsorgung und Medizinprodukte',
        content: [
          { type: 'heading', title: 'Müll vermeiden, bevor er entsorgt werden muss' },
          { type: 'list', items: ['Mehrwegverpackungen bevorzugen.', 'Verpackungsmaterial trennen und recyceln.', 'Papierverbrauch reduzieren und Papier/Pappe getrennt sammeln.', 'Toner und geeignete Materialien wiederverwenden beziehungsweise fachgerecht zurückgeben.', 'Langlebige Produkte bevorzugen.'] },
          { type: 'heading', title: 'Abfall nach Risiko trennen' },
          { type: 'table', headers: ['Kategorie', 'Beispiele aus der Unterlage'], rows: [['Unproblematischer Müll','Glas, Papier, Restmüll nach örtlicher Trennung'],['Besondere Anforderungen','Wundverbände, Einwegartikel, gebrauchte Handschuhe'],['Spitz/scharf','Spritzen und Kanülen in geeignete stichfeste Sammelbehälter'],['Infektiös','Abfälle mit meldepflichtigen beziehungsweise relevanten Erregern nach besonderem Entsorgungsweg'],['Gefährliche Stoffe','Arzneimittelreste, Desinfektionsmittelreste, Batterien, bestimmte chemische Abfälle']] },
          { type: 'heading', title: 'Medizinprodukte dokumentieren' },
          { type: 'text', text: 'Die Unterlage behandelt Medizinproduktebuch, Bestandsverzeichnis, Einweisungen, Funktionsprüfungen und sicherheitstechnische Kontrollen. Dabei werden Gerätebezeichnung, verantwortliche Personen, Prüfungen, Störungen und Fristen nachvollziehbar dokumentiert.' },
          { type: 'warning', title: 'Aktueller Rechtsrahmen', text: 'Die hochgeladene Unterlage verwendet teils ältere Gesetzesbezeichnungen. Für den Praxisalltag gelten die jeweils aktuellen Vorgaben, insbesondere MPDG und MPBetreibV. Die Lernpunkte zu Dokumentation, Einweisung und Kontrollen bleiben prüfungsrelevant.' },
        ],
      },
      {
        id: 'lf6-pdf-btm-sprechstundenbedarf',
        title: '12. BtM-Rezept und Sprechstundenbedarf',
        content: [
          { type: 'heading', title: 'BtM-Rezept' },
          { type: 'text', text: 'Die Unterlage beschreibt das Betäubungsmittelrezept als besonders kontrolliertes Rezeptformular mit mehreren Teilen, personenbezogener BtM-Nummer des Arztes, besonderen Kennzeichnungen und Aufbewahrungsanforderungen. Fehlerhafte Formulare müssen kenntlich gemacht und entsprechend der Vorgaben dokumentiert werden.' },
          { type: 'table', headers: ['Kennzeichen aus der Unterlage', 'Bedeutung'], rows: [['A','Überschreitung einer vorgesehenen Höchstmenge'],['N','Notfallverschreibung'],['S','Substitutionsmittelverschreibung'],['SZ','Zweitagesdosis']] },
          { type: 'heading', title: 'Sprechstundenbedarf' },
          { type: 'text', text: 'Sprechstundenbedarf umfasst Arznei-, Verband- und andere Materialien, die bei mehr als einem Patienten eingesetzt werden und zur vertragsärztlichen Versorgung gehören. Die Unterlage behandelt dazu Muster 16a sowie die Positivliste des jeweils zuständigen KV-Bereichs.' },
          { type: 'warning', title: 'Quellenwissen und aktuelle Praxis trennen', text: 'Fristen, Formulare und regionale Sprechstundenbedarfsvereinbarungen können sich ändern. Für echte Verordnungen immer die aktuell gültigen Vorgaben der zuständigen KV und Behörden verwenden.' },
        ],
      },
      {
        id: 'lf6-pdf-angebot',
        title: '13. Angebot, Angebotsvergleich und Preisnachlässe',
        content: [
          { type: 'heading', title: 'Angebot an die Allgemeinheit oder persönliches Angebot?' },
          { type: 'text', text: 'Kataloge, Prospekte, Anzeigen oder Webseiten werden in der Unterlage als unverbindliche Aufforderungen zur Abgabe eines Angebots eingeordnet. Ein persönliches Angebot kann dagegen verbindlich oder ausdrücklich unverbindlich sein und sollte Ware, Preis, Zahlungs- und Lieferbedingungen sowie weitere Vertragsbedingungen eindeutig beschreiben.' },
          { type: 'image', src: procurementCalc, alt: 'Rechenschema für einen Angebotsvergleich', caption: 'Rabatt und Skonto senken den Preis, Bezugskosten erhöhen ihn.' },
          { type: 'heading', title: 'Preisnachlässe' },
          { type: 'table', headers: ['Nachlass', 'Erklärung'], rows: [['Skonto','Nachlass bei schneller beziehungsweise fristgerechter Zahlung'],['Bonus','nachträglicher Nachlass bei bestimmten Umsatzbedingungen'],['Rabatt','Preisnachlass, z. B. Mengen-, Treue-, Sonder- oder Personalrabatt']] },
          { type: 'info', title: 'Vergleichsregel', text: 'Nicht nur den Listenpreis vergleichen. Entscheidend ist der Preis nach Nachlässen und Bezugskosten sowie gegebenenfalls der gesamte Rechnungsbetrag.' },
        ],
      },
      {
        id: 'lf6-pdf-kaufvertrag',
        title: '14. Kaufvertrag und Leistungsstörungen',
        content: [
          { type: 'heading', title: 'Pflichten aus dem Kaufvertrag' },
          { type: 'table', headers: ['Verkäufer', 'Käufer'], rows: [['mangelfreie Ware übergeben','Ware annehmen'],['Eigentum übertragen','Kaufpreis zahlen']] },
          { type: 'image', src: disruptions, alt: 'Übersicht der Kaufvertragsstörungen', caption: 'Mangelhafte Lieferung, Lieferungsverzug, Annahmeverzug und Zahlungsverzug werden getrennt geprüft.' },
          { type: 'heading', title: 'Mangelhafte Lieferung' },
          { type: 'text', text: 'Die Unterlage unterscheidet offene, versteckte und arglistig verschwiegene Mängel sowie Falschlieferung, Qualitäts-, Mengen- und Montagemängel. Käuferrechte werden stufenweise geprüft: zunächst Nacherfüllung, anschließend je nach Voraussetzungen weitere Rechte wie Rücktritt, Minderung oder Schadensersatz.' },
          { type: 'heading', title: 'Verzug' },
          { type: 'text', text: 'Bei Lieferungs- und Zahlungsverzug sind Fälligkeit, vereinbarter Termin, Mahnung beziehungsweise Frist und das Verschulden zu prüfen. Annahmeverzug liegt auf Käuferseite, wenn eine ordnungsgemäß angebotene fällige Leistung nicht angenommen wird.' },
          { type: 'warning', title: 'Fristen nicht blind auswendig anwenden', text: 'Die Unterlage enthält typische Verjährungs- und Verzugsregeln für das Prüfungstraining. Im Praxisalltag muss bei echten Rechtsfällen die aktuelle Gesetzeslage und der konkrete Vertrag geprüft werden.' },
        ],
      },
      {
        id: 'lf6-pdf-zahlungsverkehr',
        title: '15. Zahlungsverkehr komplett: Quittung, Überweisung, Lastschrift, Karte und Konto',
        content: [
          { type: 'image', src: paymentTypes, alt: 'Barer, halbbarer und unbarer Zahlungsverkehr', caption: 'Die Unterlage sortiert Zahlungsarten danach, ob und wie viele Konten beteiligt sind.' },
          { type: 'heading', title: 'Quittung' },
          { type: 'text', text: 'Eine Quittung bestätigt eine Barzahlung. Typische Angaben sind Betrag in Zahlen und Worten, Name des Zahlungspflichtigen, Zahlungsgrund, Empfangsbestätigung, Ort und Datum, Unterschrift, Quittungsnummer und gegebenenfalls Buchungsvermerke.' },
          { type: 'heading', title: 'Unbare Zahlungen' },
          { type: 'table', headers: ['Verfahren', 'Grundprinzip'], rows: [['Überweisung','Zahler beauftragt seine Bank mit einer Einzelzahlung'],['Dauerauftrag','Zahler veranlasst regelmäßige Zahlungen zu festen Terminen'],['Lastschrift','Empfänger zieht mit Mandat/Ermächtigung ein'],['Onlinebanking','elektronischer Kontozugang mit Authentifizierung'],['Kredit-/Girokarte','Kartenzahlung am Terminal beziehungsweise im Onlinehandel']] },
          { type: 'heading', title: 'Girokonto, Girocard und SEPA' },
          { type: 'text', text: 'Das Girokonto dient Ein- und Auszahlungen sowie Überweisungen, Daueraufträgen und Lastschriften. Die Unterlage behandelt außerdem Girocard, POS/POZ, Kreditkarte, SEPA, IBAN und BIC sowie das Überziehen des Girokontos mit Dispositionskredit und Zinsen.' },
          { type: 'warning', title: 'Zahlungsdienste ändern sich', text: 'Einzelne in älteren Lernunterlagen genannte Onlinedienste wie paydirekt/giropay können inzwischen verändert oder eingestellt sein. Für die Prüfung den Quellenbegriff kennen, für die Praxis aktuelle Zahlungsdienste verwenden.' },
        ],
      },
      {
        id: 'lf6-pdf-agb',
        title: '16. AGB und Vertragsbedingungen',
        content: [
          { type: 'heading', title: 'Warum gibt es AGB?' },
          { type: 'text', text: 'Allgemeine Geschäftsbedingungen fassen vorformulierte Vertragsbedingungen für viele gleichartige Geschäfte zusammen. Damit sie Bestandteil eines Vertrages werden, muss auf sie hingewiesen werden und der Vertragspartner muss eine zumutbare Möglichkeit haben, ihren Inhalt zur Kenntnis zu nehmen.' },
          { type: 'heading', title: 'Klauseln beurteilen' },
          { type: 'text', text: 'Die Unterlage unterscheidet ausdrücklich verbotene und problematische beziehungsweise überraschende Klauseln. Kerngedanke: AGB dürfen Vertragspartner nicht unangemessen benachteiligen und gesetzliche Schutzregeln nicht beliebig ausschalten.' },
          { type: 'info', title: 'Prüfungstipp', text: 'Bei AGB-Fragen zuerst prüfen: wirksam einbezogen? verständlich? überraschend oder unangemessen benachteiligend?' },
        ],
      },
    ],
    questions: [...module.questions, ...questions],
  };
}
