import type { LearningModule } from '@/types';
import { compareVisual, cycleVisual, heroVisual, processVisual } from './visualKit';

const infectionChain = processVisual('Infektionskette', [
  { title:'Erreger', text:'Bakterien, Viren, Pilze oder Parasiten' },
  { title:'Quelle', text:'Mensch, Material, Fläche oder Umwelt' },
  { title:'Austritt', text:'z. B. Sekret, Blut, Stuhl oder Tröpfchen' },
  { title:'Übertragung', text:'Kontakt, Tröpfchen, Aerosol, Blut oder fäkal-oral' },
  { title:'Eintritt', text:'Schleimhaut, Atemwege, Wunde oder Stichverletzung' },
], 'Hygiene unterbricht die Infektionskette an möglichst vielen Stellen.');

const hygiene = compareVisual('Reinigung, Desinfektion und Sterilisation', [
  { title:'Reinigung', lines:['sichtbaren Schmutz entfernen','Keimzahl wird reduziert','keine sichere Inaktivierung aller Erreger','Grundlage weiterer Aufbereitung'] },
  { title:'Desinfektion', lines:['Keime gezielt inaktivieren/reduzieren','Infektionsgefahr soll nicht mehr bestehen','Einwirkzeit und Konzentration beachten','Hände, Flächen oder Medizinprodukte je nach Verfahren'] },
  { title:'Sterilisation', lines:['Ziel: Sterilität','auch widerstandsfähige vermehrungsfähige Mikroorganismen erfassen','nur geeignete Verfahren und Produkte','Teil validierter Aufbereitung'] },
]);

const handFlow = processVisual('Händehygiene in der Praxis', [
  { title:'Indikation erkennen', text:'vor aseptischer Tätigkeit, nach Kontamination und nach Patientenkontakt nach Hygienestandard' },
  { title:'Hände trocken', text:'Schmuck vermeiden, Haut intakt halten, Produkt richtig dosieren' },
  { title:'Einreiben', text:'alle Handflächen, Fingerzwischenräume, Daumen und Fingerspitzen benetzen' },
  { title:'Einwirkzeit', text:'Herstellerangaben vollständig einhalten' },
  { title:'Handschuhe', text:'ersetzen die Händedesinfektion nicht' },
]);

const exposure = processVisual('Vorgehen nach Stich- oder Schnittverletzung', [
  { title:'Sofortmaßnahme', text:'Wunde nach Praxisstandard versorgen und desinfizieren' },
  { title:'Melden', text:'unverzüglich verantwortliche Stelle informieren' },
  { title:'Risiko klären', text:'Art der Exposition, Material und möglicher Indexpatient' },
  { title:'Medizinisch bewerten', text:'Hepatitis-B-Schutz, HIV-PEP und Diagnostik zeitkritisch prüfen' },
  { title:'Dokumentieren', text:'Arbeitsunfall, Verlauf und Nachkontrollen festhalten' },
], 'Nicht abwarten: berufliche Expositionen werden sofort abgeklärt.');

const hygieneCycle = cycleVisual('Hygiene als Qualitätskreislauf', [
  { title:'Plan', text:'Hygieneplan und Zuständigkeiten' },
  { title:'Umsetzen', text:'Standardmaßnahmen anwenden' },
  { title:'Prüfen', text:'Beobachten, dokumentieren, kontrollieren' },
  { title:'Verbessern', text:'Fehlerquellen beseitigen' },
]);

export const lf3: LearningModule = {
  id:'lf3', number:3,
  title:'Praxishygiene und Schutz vor Infektionskrankheiten organisieren',
  subtitle:'Infektionswege, Händehygiene, Desinfektion, Sterilisation, Medizinprodukte, Impfungen, Nadelstichverletzung und Hygieneplan',
  description:'Hygiene von Grund auf: Wie Infektionen entstehen, wie Übertragung verhindert wird und wie Materialien, Flächen und Medizinprodukte sicher behandelt werden.',
  difficulty:'medium', icon:'droplets',
  heroImage:heroVisual(3,'Praxishygiene & Infektionsschutz','Infektionsketten erkennen und sicher unterbrechen'),
  topics:[
    {
      id:'infektionslehre', title:'1. Erreger, Infektion und Übertragungswege', content:[
        {type:'heading',title:'Was ist eine Infektion?'},
        {type:'text',text:'Bei einer Infektion dringen vermehrungsfähige Krankheitserreger in einen Organismus ein, vermehren sich oder lösen eine Reaktion aus. Eine Kontamination bedeutet zunächst nur, dass Erreger oder potenziell infektiöses Material auf einer Oberfläche, Haut oder einem Gegenstand vorhanden sind. Nicht jede Kontamination führt automatisch zu einer Infektion.'},
        {type:'image',src:infectionChain,alt:'Infektionskette',caption:'Eine Infektion braucht mehrere aufeinanderfolgende Schritte.'},
        {type:'heading',title:'Wichtige Erregergruppen'},
        {type:'table',headers:['Gruppe','Beispiele','Grundprinzip'],rows:[['Bakterien','z. B. Staphylokokken, Streptokokken','lebende Zellen; manche sind mit Antibiotika behandelbar'],['Viren','z. B. Influenza, Hepatitis B, Norovirus','benötigen Wirtszellen zur Vermehrung; Antibiotika wirken nicht'],['Pilze','z. B. Candida, Dermatophyten','können Haut, Schleimhäute oder innere Organe betreffen'],['Parasiten','z. B. Skabiesmilben','leben zeitweise oder dauerhaft auf/in einem Wirt']]},
        {type:'heading',title:'Übertragungswege unterscheiden'},
        {type:'definition',term:'Kontakt-/Schmierübertragung',definition:'Erreger werden direkt oder über Hände und Gegenstände weitergegeben.'},
        {type:'definition',term:'Tröpfchen',definition:'größere respiratorische Partikel gelangen auf kurze Distanz auf Schleimhäute.'},
        {type:'definition',term:'Aerosole',definition:'kleinere Partikel können länger in der Luft verbleiben und eingeatmet werden.'},
        {type:'definition',term:'fäkal-oral',definition:'Erreger aus dem Stuhl gelangen über Hände, Gegenstände, Lebensmittel oder Wasser zum Mund.'},
        {type:'definition',term:'parenteral/blutübertragen',definition:'Erreger gelangen unter Umgehung intakter Haut in Gewebe oder Blut, z. B. durch Stichverletzung.'},
        {type:'video',title:'Wie Krankheitserreger über die Hände weitergegeben werden',source:'Bundesinstitut für Öffentliche Gesundheit',caption:'Beobachte im Film, an welchen Stellen die Übertragungskette unterbrochen werden kann.',url:'https://www.infektionsschutz.de/mediathek/hygiene-materialien/filme-zur-hygiene/filme-zur-uebertragung-von-krankheitserregern-im-alltag/'},
      ]
    },
    {
      id:'basishygiene', title:'2. Basishygiene, Händedesinfektion und persönliche Schutzausrüstung', content:[
        {type:'heading',title:'Basishygiene gilt bei jedem Patienten'},
        {type:'text',text:'Basishygiene wird unabhängig davon angewendet, ob eine Infektion bekannt ist. Sie umfasst unter anderem konsequente Händehygiene, situationsgerechte persönliche Schutzausrüstung, sicheren Umgang mit scharfen Instrumenten, Reinigung und Desinfektion sowie korrekte Aufbereitung von Medizinprodukten.'},
        {type:'image',src:handFlow,alt:'Ablauf Händehygiene',caption:'Händedesinfektion wird bewusst und vollständig durchgeführt.'},
        {type:'heading',title:'Händedesinfektion oder Händewaschen?'},
        {type:'text',text:'Im medizinischen Alltag ist die hygienische Händedesinfektion für viele Situationen die zentrale Maßnahme. Händewaschen entfernt vor allem Schmutz und ist zusätzlich bei sichtbarer Verschmutzung oder in besonderen Situationen nötig. Häufiges unnötiges Waschen kann die Haut belasten. Welche Maßnahme erforderlich ist, richtet sich nach Hygienestandard und Erregersituation.'},
        {type:'warning',title:'Handschuhe sind keine sauberen Hände',text:'Einmalhandschuhe können beschädigt oder beim Ausziehen kontaminierend sein. Sie ersetzen die Händedesinfektion nicht. Handschuhe werden indikationsgerecht gewechselt und nicht zwischen verschiedenen Tätigkeiten „weitergetragen“.'},
        {type:'video',title:'Richtig Händewaschen',source:'Bundesinstitut für Öffentliche Gesundheit',caption:'Nutze das Video für Technik und Übertragungsverständnis. In der medizinischen Praxis kommt zusätzlich die hygienische Händedesinfektion nach den professionellen Standards hinzu.',url:'https://www.infektionsschutz.de/mediathek/filme/filme-zum-richtigen-haendewaschen/'},
        {type:'video',title:'Hygiene im Krankheitsfall',source:'Bundesinstitut für Öffentliche Gesundheit',caption:'Achte auf Hustenetikette, Handkontakt, Flächen und Schutz anderer Personen.',url:'https://www.infektionsschutz.de/mediathek/hygiene-materialien/filme-zur-hygiene/filme-zu-hygiene-im-krankheitsfall/'},
        {type:'heading',title:'Persönliche Schutzausrüstung'},
        {type:'table',headers:['Schutz','Wann grundsätzlich relevant?'],rows:[['Einmalhandschuhe','erwarteter Kontakt mit Blut, Sekreten, Schleimhaut oder kontaminiertem Material'],['Schutzkittel/Schürze','Kontaminationsgefahr für Kleidung/Haut'],['Mund-Nasen-Schutz/Atemschutz','abhängig von Erreger, Tätigkeit und Übertragungsweg'],['Schutzbrille/Visier','Spritzgefahr für Augen und Gesicht']]},
      ]
    },
    {
      id:'desinfektion', title:'3. Reinigung, Desinfektion und Sterilisation', content:[
        {type:'heading',title:'Die Begriffe sind nicht austauschbar'},
        {type:'image',src:hygiene,alt:'Reinigung Desinfektion Sterilisation',caption:'Drei unterschiedliche Ziele der Aufbereitung.'},
        {type:'text',text:'Reinigung entfernt Verunreinigungen. Desinfektion soll einen Zustand herstellen, von dem keine Infektionsgefährdung mehr ausgeht. Sterilisation ist ein weitergehendes Verfahren mit dem Ziel steriler Medizinprodukte. Welche Schritte nötig sind, hängt von der Nutzung und Risikoklasse des Medizinprodukts ab.'},
        {type:'heading',title:'Desinfektionsmittel richtig anwenden'},
        {type:'list',items:['geeignetes Mittel und erforderlichen Wirkungsbereich auswählen','korrekte Konzentration beziehungsweise gebrauchsfertige Lösung verwenden','Fläche vollständig benetzen oder vorgesehenes Verfahren einhalten','Einwirkzeit beachten','Herstellerangaben, Arbeitsschutz und Materialverträglichkeit beachten','Lösungen nicht eigenmächtig mischen']},
        {type:'info',title:'Flächendesinfektion',text:'Patientennahe und häufig berührte Flächen werden nach dem Hygieneplan und abhängig vom Kontaminationsrisiko gereinigt beziehungsweise desinfiziert. Sichtbare Kontamination mit potenziell infektiösem Material erfordert eine gezielte sichere Aufbereitung.'},
        {type:'video',title:'Übertragung über Hände und Gegenstände',source:'Bundesinstitut für Öffentliche Gesundheit',caption:'Achte darauf, wie unbelebte Gegenstände Teil einer Übertragungskette werden können.',url:'https://www.infektionsschutz.de/mediathek/hygiene-materialien/filme-zur-hygiene/filme-zur-uebertragung-von-krankheitserregern-im-alltag/'},
      ]
    },
    {
      id:'medizinprodukte', title:'4. Medizinprodukte sicher aufbereiten', content:[
        {type:'heading',title:'Aufbereitung ist ein kontrollierter Prozess'},
        {type:'text',text:'Wiederverwendbare Medizinprodukte werden so aufbereitet, dass sie für die nächste Anwendung sicher sind und ihre Funktion erhalten bleibt. Grundlage sind die Risikobewertung, Herstellerinformationen, geeignete validierte Verfahren und die geltenden Hygiene- und Medizinprodukterecht-Vorgaben.'},
        {type:'process',title:''} as any,
        {type:'image',src:processVisual('Typischer Aufbereitungsweg',[
          {title:'Sammeln',text:'sicherer Transport kontaminierter Instrumente'},
          {title:'Reinigen',text:'Verunreinigungen vollständig entfernen'},
          {title:'Desinfizieren',text:'geeignetes validiertes Verfahren'},
          {title:'Prüfen',text:'Sauberkeit, Funktion und Unversehrtheit'},
          {title:'Sterilisieren/Lagern',text:'wenn erforderlich, anschließend geschützt bereitstellen'},
        ]),alt:'Aufbereitungsweg Medizinprodukte',caption:'Der genaue Ablauf richtet sich nach Risikoeinstufung und Herstellerangaben.'},
        {type:'heading',title:'Warum Dokumentation wichtig ist'},
        {type:'text',text:'Aufbereitungsprozesse müssen nachvollziehbar sein. Dazu gehören je nach Verfahren Chargen- oder Prozessdaten, Freigabe und Kontrollen. Ein Instrument wird nicht verwendet, wenn Sauberkeit, Funktion, Verpackung oder Prozessfreigabe zweifelhaft sind.'},
        {type:'warning',title:'Einweg ist Einweg',text:'Produkte zur einmaligen Verwendung werden nicht einfach aus Kostengründen erneut eingesetzt. Kennzeichnung, Herstellerangaben und rechtliche Vorgaben sind verbindlich.'},
      ]
    },
    {
      id:'infektionskrankheiten', title:'5. Infektionskrankheiten, Impfungen und Meldepflicht', content:[
        {type:'heading',title:'Meldepflicht ist gesetzlich geregelt'},
        {type:'text',text:'Das Infektionsschutzgesetz enthält Meldepflichten für bestimmte Krankheiten, Verdachtsfälle, Todesfälle und Erregernachweise. Für die MFA ist wichtig, dass nicht „nach Gefühl“ gemeldet wird: Die Praxis arbeitet nach den gesetzlichen Vorgaben und den ärztlich festgelegten Abläufen. Meldungen müssen fristgerecht und mit den vorgesehenen Angaben erfolgen.'},
        {type:'heading',title:'Impfungen schützen Patienten und Personal'},
        {type:'text',text:'Im Gesundheitsdienst können berufliche Expositionen auftreten. Impfangebote richten sich nach der Gefährdungsbeurteilung und den aktuellen STIKO-Empfehlungen. Besonders relevant ist bei möglichem Kontakt mit Blut oder Körperflüssigkeiten ein zuverlässiger Hepatitis-B-Schutz.'},
        {type:'info',title:'Hepatitis B im Gesundheitsdienst',text:'Für medizinisches Personal mit Expositionsrisiko wird ein frühzeitiger Hepatitis-B-Impfschutz empfohlen. Ob und wann eine serologische Kontrolle notwendig ist, richtet sich nach der aktuellen STIKO-Empfehlung und der arbeitsmedizinischen Situation.'},
        {type:'video',title:'Filme zum Infektionsschutz',source:'Bundesinstitut für Öffentliche Gesundheit',caption:'Wähle die Filme zu Händehygiene, Husten/Niesen und Übertragungswegen und ordne sie den Infektionsketten zu.',url:'https://www.infektionsschutz.de/mediathek/hygiene-materialien/filme-zur-hygiene/'},
      ]
    },
    {
      id:'nadelstich', title:'6. Nadelstichverletzung und berufliche Exposition', content:[
        {type:'heading',title:'Eine Nadelstichverletzung ist ein Arbeitsunfall'},
        {type:'text',text:'Bei einer Verletzung mit einer gebrauchten Kanüle oder einem kontaminierten scharfen Instrument besteht je nach Situation ein Risiko für blutübertragbare Infektionen. Entscheidend ist das sofortige strukturierte Vorgehen. Eine mögliche HIV-Postexpositionsprophylaxe ist zeitkritisch und muss fachlich bewertet werden.'},
        {type:'image',src:exposure,alt:'Vorgehen nach Nadelstichverletzung',caption:'Sofort handeln, melden, Risiko bewerten und Nachsorge sichern.'},
        {type:'heading',title:'HBV, HCV und HIV unterscheiden'},
        {type:'table',headers:['Erreger','Wichtiger Punkt nach Exposition'],rows:[['Hepatitis B','Impfstatus und Antikörperschutz prüfen; je nach Situation weitere Maßnahmen'],['Hepatitis C','keine etablierte medikamentöse PEP; gezielte Diagnostik und Nachkontrollen'],['HIV','Indikation für PEP schnellstmöglich ärztlich/fachlich prüfen']]},
        {type:'warning',title:'Nicht warten',text:'Eine potenziell relevante berufliche Exposition wird sofort gemeldet und medizinisch beurteilt. Nicht bis zum nächsten Arbeitstag warten.'},
      ]
    },
    {
      id:'hygieneplan', title:'7. Hygieneplan, Abfall und Qualitätsmanagement', content:[
        {type:'heading',title:'Der Hygieneplan übersetzt Regeln in den Praxisalltag'},
        {type:'image',src:hygieneCycle,alt:'Hygiene Qualitätskreislauf',caption:'Hygiene muss geplant, umgesetzt, kontrolliert und verbessert werden.'},
        {type:'text',text:'Der Hygieneplan legt praxisbezogen fest, welche Maßnahmen wann, womit, wie und durch wen durchgeführt werden. Er wird an die tatsächlichen Tätigkeiten angepasst. Schulungen und regelmäßige Überprüfung sorgen dafür, dass die Regeln nicht nur auf Papier stehen.'},
        {type:'heading',title:'Abfall sicher trennen'},
        {type:'text',text:'Abfälle werden nach Art und Gefährdung getrennt. Spitze und scharfe Gegenstände gehören unmittelbar nach Gebrauch in geeignete stich- und bruchfeste Abwurfbehälter. Kontaminierte oder besonders gefährliche Abfälle werden nach den dafür geltenden Regeln entsorgt.'},
        {type:'list',items:['Kanülen nicht unnötig manipulieren','Abwurfbehälter nicht überfüllen','Abfälle nicht mit der Hand nachsortieren','Gefahrstoff- und Hygienevorgaben beachten','Unfälle und Beinahe-Unfälle zur Verbesserung nutzen']},
        {type:'info',title:'Aktueller Arbeitsschutz',text:'Für biologische Arbeitsstoffe im Gesundheitsdienst ist die TRBA 250 in der Ausgabe November 2025 mit Änderung vom 14.11.2025 eine zentrale aktuelle technische Regel.'},
      ]
    },
  ],
  questions:[
    {id:1,question:'Was ist eine Kontamination?',type:'single',options:[{id:'a',text:'automatisch eine Erkrankung'},{id:'b',text:'das Vorhandensein potenziell infektiösen Materials auf einer Oberfläche oder Person',correct:true},{id:'c',text:'eine Impfung'},{id:'d',text:'Sterilisation'}],explanation:'Kontamination bedeutet zunächst Verunreinigung; sie führt nicht zwingend zur Infektion.',points:2},
    {id:2,question:'Welche Übertragungswege gibt es?',type:'multiple',options:[{id:'a',text:'Kontakt/Schmier',correct:true},{id:'b',text:'Tröpfchen/Aerosol',correct:true},{id:'c',text:'fäkal-oral',correct:true},{id:'d',text:'blutübertragen',correct:true}],explanation:'Infektionen können auf unterschiedlichen Wegen übertragen werden.',points:4},
    {id:3,question:'Welche Maßnahme unterbricht eine Infektionskette?',type:'multiple',options:[{id:'a',text:'Händehygiene',correct:true},{id:'b',text:'geeignete Desinfektion',correct:true},{id:'c',text:'Schutzausrüstung',correct:true},{id:'d',text:'kontaminierte Handschuhe weitertragen'}],explanation:'Mehrere Schutzmaßnahmen können die Übertragung unterbrechen.',points:3},
    {id:4,question:'Was ist der Unterschied zwischen Reinigung und Desinfektion?',type:'single',options:[{id:'a',text:'kein Unterschied'},{id:'b',text:'Reinigung entfernt Schmutz; Desinfektion reduziert/inaktiviert Erreger bis keine Infektionsgefährdung mehr zu erwarten ist',correct:true},{id:'c',text:'Reinigung sterilisiert immer'},{id:'d',text:'Desinfektion entfernt nur Staub'}],explanation:'Die Ziele der Verfahren unterscheiden sich.',points:3},
    {id:5,question:'Was ist das Ziel einer Sterilisation?',type:'single',options:[{id:'a',text:'nur sichtbare Sauberkeit'},{id:'b',text:'Sterilität des geeigneten Medizinprodukts',correct:true},{id:'c',text:'Geruch verbessern'},{id:'d',text:'Farbe ändern'}],explanation:'Sterilisation ist ein besonders weitgehendes Aufbereitungsverfahren.',points:2},
    {id:6,question:'Ersetzen Einmalhandschuhe die Händedesinfektion?',type:'single',options:[{id:'a',text:'ja immer'},{id:'b',text:'nein',correct:true},{id:'c',text:'nur montags'},{id:'d',text:'nur im Winter'}],explanation:'Handschuhe sind eine zusätzliche Barriere, kein Ersatz für Händehygiene.',points:2},
    {id:7,question:'Was muss bei Desinfektionsmitteln beachtet werden?',type:'multiple',options:[{id:'a',text:'Einwirkzeit',correct:true},{id:'b',text:'Konzentration',correct:true},{id:'c',text:'Wirkungsbereich',correct:true},{id:'d',text:'Herstellerangaben',correct:true}],explanation:'Wirksamkeit hängt von korrekter Anwendung ab.',points:4},
    {id:8,question:'Was ist bei einem beschädigten oder zweifelhaft aufbereiteten Instrument richtig?',type:'single',options:[{id:'a',text:'trotzdem verwenden'},{id:'b',text:'nicht verwenden und Aufbereitung/Freigabe klären',correct:true},{id:'c',text:'nur abwischen'},{id:'d',text:'dem Patienten geben'}],explanation:'Medizinprodukte müssen sicher und funktionsfähig sein.',points:2},
    {id:9,question:'Wo sind viele gesetzliche Meldepflichten zu Infektionskrankheiten geregelt?',type:'single',options:[{id:'a',text:'Infektionsschutzgesetz',correct:true},{id:'b',text:'Straßenverkehrsordnung'},{id:'c',text:'GOÄ'},{id:'d',text:'Mietrecht'}],explanation:'Das IfSG regelt unter anderem Meldepflichten.',points:2},
    {id:10,question:'Welche Impfung ist für Personal mit möglichem Blutkontakt besonders relevant?',type:'single',options:[{id:'a',text:'Hepatitis B',correct:true},{id:'b',text:'nur Reiseimpfungen'},{id:'c',text:'keine'},{id:'d',text:'ausschließlich Tollwut'}],explanation:'Hepatitis B ist bei beruflichem Blutkontakt besonders wichtig.',points:2},
    {id:11,question:'Was ist nach einer Nadelstichverletzung richtig?',type:'multiple',options:[{id:'a',text:'sofort melden',correct:true},{id:'b',text:'medizinisch bewerten lassen',correct:true},{id:'c',text:'Arbeitsunfall dokumentieren',correct:true},{id:'d',text:'bis nächste Woche warten'}],explanation:'Berufliche Expositionen werden umgehend behandelt und dokumentiert.',points:3},
    {id:12,question:'Gibt es für Hepatitis C eine etablierte medikamentöse PEP?',type:'single',options:[{id:'a',text:'ja immer'},{id:'b',text:'nein; Diagnostik und Nachkontrollen sind entscheidend',correct:true},{id:'c',text:'nur mit Antibiotika'},{id:'d',text:'nur mit Impfstoff'}],explanation:'Für HCV besteht keine etablierte PEP.',points:2},
    {id:13,question:'Warum ist eine mögliche HIV-PEP zeitkritisch?',type:'single',options:[{id:'a',text:'weil ihre Indikation schnell fachlich geprüft und sie ggf. früh begonnen werden muss',correct:true},{id:'b',text:'weil sie nur ein Verband ist'},{id:'c',text:'weil HIV ein Bakterium ist'},{id:'d',text:'sie ist nie zeitkritisch'}],explanation:'Nach relevanter Exposition ist schnelle medizinische Bewertung erforderlich.',points:2},
    {id:14,question:'Wohin gehören gebrauchte Kanülen?',type:'single',options:[{id:'a',text:'in einen geeigneten stich- und bruchfesten Abwurfbehälter',correct:true},{id:'b',text:'lose in den Papierkorb'},{id:'c',text:'in die Kitteltasche'},{id:'d',text:'auf den Tisch'}],explanation:'Sicherer Abwurf verhindert Stichverletzungen.',points:2},
    {id:15,question:'Was regelt ein Hygieneplan?',type:'single',options:[{id:'a',text:'praxisbezogene Hygienemaßnahmen und Zuständigkeiten',correct:true},{id:'b',text:'nur Urlaubszeiten'},{id:'c',text:'private Termine'},{id:'d',text:'nur Rechnungen'}],explanation:'Der Hygieneplan konkretisiert die Hygienemaßnahmen der Einrichtung.',points:2},
    {id:16,question:'Nenne zwei Beispiele für persönliche Schutzausrüstung.',type:'text',correctAnswer:'handschuhe,kittel,schürze,maske,atemschutz,schutzbrille,visier',explanation:'Je nach Risiko werden Handschuhe, Schutzkleidung, Atem-/Mund-Nasen-Schutz und Augenschutz eingesetzt.',points:3},
    {id:17,question:'Was ist die TRBA 250?',type:'single',options:[{id:'a',text:'Technische Regel für biologische Arbeitsstoffe im Gesundheitsdienst',correct:true},{id:'b',text:'eine Krankenversicherung'},{id:'c',text:'eine Impfdosis'},{id:'d',text:'eine Wundart'}],explanation:'Sie konkretisiert Arbeitsschutz bei biologischen Arbeitsstoffen.',points:2},
    {id:18,question:'Erkläre in einem Satz, warum Hygiene ein Qualitätsmanagement-Thema ist.',type:'text',correctAnswer:'planen,standard,kontrolle,verbessern,sicherheit',explanation:'Hygiene braucht Standards, Umsetzung, Kontrolle und kontinuierliche Verbesserung.',points:3},
  ]
};
