import type { LearningModule } from '@/types';
import { compareVisual, cycleVisual, heroVisual, processVisual } from './visualKit';

const prevention = compareVisual('Prävention: drei Ebenen', [
  { title:'Primärprävention', lines:['Krankheit verhindern','Risikofaktoren senken','Impfungen','Bewegung, Ernährung, Rauchstopp'] },
  { title:'Sekundärprävention', lines:['Krankheit früh erkennen','Früherkennungsuntersuchungen','Screeningprogramme','Behandlung früh ermöglichen'] },
  { title:'Tertiärprävention', lines:['Folgen einer Erkrankung begrenzen','Rückfälle vermeiden','Rehabilitation','Selbstmanagement unterstützen'] },
]);

const checkup = processVisual('Gesundheits-Check-up', [
  { title:'Anamnese', text:'Beschwerden, familiäre Risiken, Rauchen, Bewegung, Gewicht und Impfstatus' },
  { title:'Untersuchung', text:'Ganzkörperstatus und Blutdruck' },
  { title:'Labor', text:'alters- und risikogerecht Blut- und Urinuntersuchungen' },
  { title:'Auswertung', text:'Befunde und individuelles Risikoprofil einordnen' },
  { title:'Beratung', text:'Prävention, Behandlung und weitere Schritte besprechen' },
], '18–34 einmalig · ab 35 grundsätzlich alle drei Jahre');

const cancer = processVisual('Krebsfrüherkennung: wichtige Programme', [
  { title:'Darm', text:'ab 50: Koloskopie oder iFOBT nach aktuellem Programm' },
  { title:'Gebärmutterhals', text:'ab 20: altersabhängiges organisiertes Screening' },
  { title:'Brust', text:'Mammographie 50–75 alle zwei Jahre' },
  { title:'Haut', text:'ab 35 alle zwei Jahre' },
  { title:'Lunge', text:'seit April 2026 für anspruchsberechtigte starke Raucher 50–75' },
], 'Ansprüche und Intervalle werden nach den aktuellen G-BA-Richtlinien geprüft.');

const vaccineFlow = processVisual('Impfmanagement in der Praxis', [
  { title:'Status prüfen', text:'Impfpass, Alter, Vorerkrankungen, Schwangerschaft, Beruf und Reiseanlass' },
  { title:'Empfehlung prüfen', text:'aktuelle STIKO-Empfehlung und Schutzimpfungs-Richtlinie verwenden' },
  { title:'Aufklären', text:'Nutzen, mögliche Reaktionen, Kontraindikationen und offene Fragen' },
  { title:'Durchführen', text:'Identität, Impfstoff, Lagerung, Dosis, Applikation und Hygiene sichern' },
  { title:'Dokumentieren', text:'Impfung, Charge, Datum und erforderliche Angaben vollständig festhalten' },
]);

const behavior = cycleVisual('Gesundheitsverhalten beeinflusst viele Risiken', [
  { title:'Bewegung', text:'Herz, Stoffwechsel und Mobilität' },
  { title:'Ernährung', text:'Energie- und Nährstoffbalance' },
  { title:'Nikotin', text:'zentrale vermeidbare Gesundheitsgefahr' },
  { title:'Alkohol', text:'gesundheitliche Risiken reduzieren' },
  { title:'Stress', text:'Erholung und psychische Gesundheit' },
  { title:'Schlaf', text:'Regeneration und Leistungsfähigkeit' },
]);

const igel = compareVisual('GKV-Leistung und IGeL unterscheiden', [
  { title:'GKV-Leistung', lines:['Anspruch nach gesetzlichen Regeln','medizinische Voraussetzungen prüfen','Abrechnung über vorgesehenen GKV-Weg','Patient über Ablauf informieren'] },
  { title:'IGeL', lines:['keine reguläre GKV-Leistung in dieser Situation','vorher verständlich informieren','schriftliche Vereinbarung/Kosten beachten','Nutzen und mögliche Nachteile sachlich erklären'] },
]);

const reha = processVisual('Von Behandlung zu Rehabilitation und Teilhabe', [
  { title:'Bedarf erkennen', text:'gesundheitliche Einschränkungen und Teilhaberisiken erfassen' },
  { title:'Beraten', text:'geeignete Anlaufstellen und Reha-Möglichkeiten erklären' },
  { title:'Beantragen', text:'Formulare, Befunde und ärztliche Angaben zusammenstellen' },
  { title:'Durchführen', text:'medizinische oder berufliche Rehabilitation' },
  { title:'Nachsorge', text:'Ergebnisse in weitere Behandlung und Alltag übertragen' },
], 'Grundprinzip der Rentenversicherung: Rehabilitation kann Erwerbsfähigkeit erhalten.');

export const lf11: LearningModule = {
  id:'lf11', number:11,
  title:'Patienten bei der Prävention begleiten',
  subtitle:'Präventionsformen, Gesundheits-Check-up, Krebsfrüherkennung, Impfmanagement, Gesundheitsberatung, IGeL, Recall, Rehabilitation und Selbsthilfe',
  description:'Prävention systematisch verstehen: Risiken erkennen, Patienten verständlich informieren, Früherkennung organisieren und gesundheitsförderndes Verhalten unterstützen.',
  difficulty:'medium', icon:'heart',
  heroImage:heroVisual(11,'Prävention & Früherkennung','Risiken erkennen · vorbeugen · früh entdecken'),
  topics:[
    {
      id:'praevention-grundlagen', title:'1. Prävention und Gesundheitsförderung', content:[
        {type:'heading',title:'Prävention beginnt vor der Krankheit'},
        {type:'text',text:'Prävention umfasst Maßnahmen, die Krankheiten verhindern, früh erkennen oder deren Folgen begrenzen sollen. Gesundheitsförderung richtet den Blick zusätzlich darauf, Menschen zu befähigen, ihre Gesundheit im Alltag aktiv zu stärken. In der Arztpraxis gehören Beratung, Impfungen, Früherkennungsuntersuchungen, Recall und Unterstützung bei Lebensstiländerungen zu den typischen präventiven Aufgaben.'},
        {type:'image',src:prevention,alt:'Primär Sekundär Tertiärprävention',caption:'Die Präventionsformen unterscheiden sich nach dem Zeitpunkt im Krankheitsverlauf.'},
        {type:'heading',title:'Primär-, Sekundär- und Tertiärprävention'},
        {type:'definition',term:'Primärprävention',definition:'setzt vor einer Erkrankung an und soll das Erkrankungsrisiko senken, zum Beispiel durch Impfungen, Bewegung oder Rauchstopp.'},
        {type:'definition',term:'Sekundärprävention',definition:'soll Erkrankungen oder Vorstufen möglichst früh erkennen, bevor schwere Folgen entstehen.'},
        {type:'definition',term:'Tertiärprävention',definition:'soll bei bestehender Erkrankung Komplikationen, Rückfälle oder dauerhafte Einschränkungen reduzieren.'},
        {type:'heading',title:'Risikofaktoren und Ressourcen'},
        {type:'image',src:behavior,alt:'Gesundheitsverhalten und Risikofaktoren',caption:'Mehrere Lebensbereiche wirken gleichzeitig auf Gesundheit und Krankheitsrisiko.'},
        {type:'text',text:'Bei Präventionsgesprächen werden Risikofaktoren nicht moralisch bewertet. Ziel ist, gemeinsam realistische Veränderungen zu finden. Neben Risiken werden Ressourcen berücksichtigt: soziale Unterstützung, vorhandene Bewegung, Motivation, Gesundheitswissen und erreichbare Ziele.'},
      ]
    },
    {
      id:'checkup', title:'2. Gesundheits-Check-up und Risikoprofil', content:[
        {type:'heading',title:'Der Check-up sucht nach Risiken und häufigen Erkrankungen'},
        {type:'image',src:checkup,alt:'Ablauf Gesundheits Check-up',caption:'Der Check-up verbindet Anamnese, Untersuchung, Labor und Beratung.'},
        {type:'text',text:'Nach dem Stand des Bundesgesundheitsministeriums vom März 2026 haben gesetzlich Versicherte von 18 bis 34 Jahren einmalig Anspruch auf den Gesundheits-Check-up. Ab 35 Jahren besteht der Anspruch grundsätzlich alle drei Jahre. Er dient insbesondere der Erfassung von Risiken und der Früherkennung von Herz-Kreislauf-Erkrankungen, Diabetes mellitus und Nierenerkrankungen.'},
        {type:'heading',title:'Was wird untersucht?'},
        {type:'table',headers:['Bereich','Inhalt'],rows:[['Anamnese','Beschwerden, familiäre Risiken und persönliches Risikoprofil; Impfstatus prüfen'],['Körperliche Untersuchung','Ganzkörperstatus einschließlich Blutdruck'],['Blutlabor','ab 35 Lipidprofil und Glukose; 18–34 bei entsprechendem Risikoprofil'],['Urin','ab 35 unter anderem Eiweiß, Glukose, Blutbestandteile und Nitrit'],['Beratung','Befunde, Risikofaktoren und gegebenenfalls Präventionsempfehlung']]},
        {type:'info',title:'Zusätzliche einmalige Untersuchung ab 35',text:'Im Rahmen des Check-ups besteht einmalig Anspruch auf ein Screening auf Hepatitis B und Hepatitis C.'},
        {type:'video',title:'Gesundheits-Check-up',source:'Bundesgesundheitsministerium',caption:'Gehe den Ablauf auf der aktuellen Übersichtsseite durch und ordne jeden Bestandteil der Grafik oben zu.',url:'https://www.bundesgesundheitsministerium.de/checkup'},
      ]
    },
    {
      id:'krebsfrueherkennung', title:'3. Krebsfrüherkennung aktuell organisieren', content:[
        {type:'heading',title:'Früherkennung ist kein allgemeiner „Krebstest“'},
        {type:'text',text:'Für verschiedene Krebsarten gibt es unterschiedliche Untersuchungen, Zielgruppen und Intervalle. Die MFA muss deshalb Alter, Geschlecht beziehungsweise Organsituation, Risikoprofil und aktuelle Richtlinie prüfen. Screening richtet sich an grundsätzlich beschwerdefreie Personen; Beschwerden werden diagnostisch abgeklärt und nicht auf den nächsten Vorsorgetermin verschoben.'},
        {type:'image',src:cancer,alt:'Übersicht Krebsfrüherkennungsprogramme',caption:'Ausgewählte aktuelle GKV-Angebote nach G-BA-Stand 2026.'},
        {type:'heading',title:'Darmkrebsfrüherkennung'},
        {type:'text',text:'Seit April 2025 gelten für Frauen und Männer ab 50 Jahren die gleichen Angebote: maximal zwei Früherkennungs-Koloskopien im Abstand von zehn Jahren oder alternativ ein immunologischer Test auf verborgenes Blut im Stuhl (iFOBT) alle zwei Jahre. Ein auffälliger Stuhltest wird durch Koloskopie abgeklärt.'},
        {type:'video',title:'Diese Möglichkeiten zur Darmkrebsvorsorge gibt es',source:'KBV',duration:'1:05 Min.',caption:'Vergleiche Koloskopie und iFOBT und notiere das aktuelle Mindestalter.',url:'https://www.kbv.de/video/6425'},
        {type:'video',title:'Darmkrebsvorsorge: Krebs verhindern, bevor er entsteht',source:'KBV',duration:'4:55 Min.',caption:'Achte auf Polypen, Vorsorgekoloskopie und die Bedeutung der frühen Entfernung von Vorstufen.',url:'https://www.kbv.de/praxis/patientenversorgung/praevention/darmkrebsfrueherkennung'},
        {type:'heading',title:'Gebärmutterhalskrebs'},
        {type:'text',text:'Frauen von 20 bis 34 Jahren haben im organisierten Programm jährlich Anspruch auf zytologischen Abstrich und klinische Untersuchung. Ab 35 erfolgt alle drei Jahre eine Kombinationsuntersuchung aus Zytologie und HPV-Test; die jährliche klinische gynäkologische Untersuchung bleibt nach den Richtlinien bestehen. Einladungen erfolgen im organisierten Programm bis 65, der Untersuchungsanspruch kann darüber hinaus bestehen.'},
        {type:'heading',title:'Brust-, Haut- und Prostatakrebs'},
        {type:'table',headers:['Früherkennung','Aktueller Grundanspruch'],rows:[['Mammographie-Screening','Frauen 50–75, alle zwei Jahre'],['klinische Brustuntersuchung','Frauen ab 30 jährlich'],['Hautkrebs-Screening','Frauen und Männer ab 35 alle zwei Jahre'],['Krebsfrüherkennung beim Mann','Männer ab 45 jährlich; unter anderem Anamnese und Untersuchung von Prostata/Genitale/Lymphknoten nach Richtlinie']]},
        {type:'warning',title:'Mammographie: Altersgrenze nicht vorwegnehmen',text:'Der G-BA hat 2026 ein Verfahren zur möglichen Absenkung der unteren Altersgrenze auf 45 eingeleitet. Aktuell gilt das reguläre Mammographie-Screening weiterhin für 50- bis 75-Jährige.'},
        {type:'heading',title:'Neu seit April 2026: Lungenkrebs-Früherkennung'},
        {type:'text',text:'Für aktive und ehemalige starke Raucherinnen und Raucher im Alter von 50 bis 75 Jahren gibt es seit April 2026 unter den festgelegten Voraussetzungen ein jährliches Angebot zur Früherkennung mit Niedrigdosis-CT. Die Anspruchsberechtigung muss anhand der aktuellen Kriterien geprüft werden.'},
        {type:'video',title:'Lungenkrebs-Früherkennung für Raucherinnen und Raucher',source:'Gemeinsamer Bundesausschuss',caption:'Lies den Ablauf und erkläre, weshalb das Screening nur für eine genau definierte Risikogruppe vorgesehen ist.',url:'https://www.g-ba.de/themen/methodenbewertung/erwachsene/krebsfrueherkennung/lungenkrebs-screening/'},
      ]
    },
    {
      id:'impfmanagement', title:'4. Impfungen und Impfmanagement', content:[
        {type:'heading',title:'Impfberatung braucht immer den aktuellen Stand'},
        {type:'text',text:'Impfempfehlungen werden regelmäßig angepasst. Deshalb werden in der Praxis keine alten auswendig gelernten Tabellen als Dauerwissen behandelt. Für konkrete Entscheidungen werden die aktuell veröffentlichten STIKO-Empfehlungen und die Schutzimpfungs-Richtlinie herangezogen.'},
        {type:'image',src:vaccineFlow,alt:'Ablauf Impfmanagement',caption:'Vom Prüfen des Impfstatus bis zur vollständigen Dokumentation.'},
        {type:'heading',title:'Standard-, Indikations- und berufliche Impfungen'},
        {type:'text',text:'Die STIKO unterscheidet unter anderem Standardimpfungen für definierte Altersgruppen und Indikationsimpfungen bei besonderen gesundheitlichen, beruflichen oder epidemiologischen Risiken. Eine Impflücke wird anhand Alter, Vorgeschichte und vorhandener Dokumentation beurteilt.'},
        {type:'video',title:'HPV: Impfung schützt Mädchen und Jungen',source:'KBV',duration:'1:36 Min.',caption:'Achte darauf, gegen welche Krebsarten die HPV-Impfung einen Beitrag zur Prävention leisten kann.',url:'https://www.kbv.de/praxis/patientenversorgung/praevention/hpv-schutzimpfung'},
        {type:'video',title:'STIKO-App für medizinisches Fachpersonal',source:'Robert Koch-Institut',caption:'Sieh dir an, wie aktuelle Empfehlungen, Fachinformationen und Wissenschecks im Praxisalltag nachgeschlagen werden können.',url:'https://www.rki.de/DE/Themen/Infektionskrankheiten/Impfen/Staendige-Impfkommission/STIKO-App/stiko-app-node.html'},
        {type:'warning',title:'Keinen veralteten Impfkalender auswendig weiterverwenden',text:'Vor Beratung und Durchführung immer den aktuellen STIKO-Stand prüfen. Empfehlungen können sich zwischen zwei Prüfungsjahrgängen ändern.'},
      ]
    },
    {
      id:'beratung', title:'5. Gesundheitsberatung und Motivation', content:[
        {type:'heading',title:'Beratung soll informieren und befähigen'},
        {type:'text',text:'Präventionsberatung funktioniert besser, wenn Patienten nicht nur Verbote hören. Ein gutes Gespräch erkundet Motivation, Vorwissen, Hindernisse und ein realistisches nächstes Ziel. Die Entscheidung bleibt beim Patienten; die Praxis informiert verständlich über Nutzen, Risiken und Unterstützungsangebote.'},
        {type:'heading',title:'Einfaches Beratungsschema'},
        {type:'list',items:['offen fragen: Was möchten Sie verändern?','Vorwissen und Motivation klären','eine kleine konkrete Veränderung vereinbaren','Hindernisse und Unterstützung besprechen','Informationen in verständlicher Sprache geben','Rückfrage: Was nehmen Sie aus dem Gespräch mit?','bei Bedarf Folgetermin oder Recall vereinbaren']},
        {type:'heading',title:'Bewegung, Ernährung, Sucht und Stress'},
        {type:'text',text:'Die MFA kann gesundheitsfördernde Informationen und ärztliche Empfehlungen unterstützen, ohne individuelle Therapie außerhalb ihrer Kompetenz selbst festzulegen. Bei auffälligem Essverhalten, Suchtproblemen, psychischer Belastung oder medizinischen Risiken werden geeignete ärztliche beziehungsweise spezialisierte Angebote einbezogen.'},
        {type:'info',title:'Präventionsempfehlung im Check-up',text:'Wenn medizinisch angezeigt, kann im Rahmen des Check-ups eine Präventionsempfehlung für verhaltensbezogene Angebote wie Bewegung, Ernährung, Stressbewältigung oder Suchtmittelkonsum ausgestellt werden.'},
      ]
    },
    {
      id:'igel-recall', title:'6. IGeL, Recall und transparente Kosteninformation', content:[
        {type:'heading',title:'Selbstzahlerleistung ist nicht dasselbe wie Vorsorgepflicht'},
        {type:'image',src:igel,alt:'GKV Leistung und IGeL',caption:'Vor einer Selbstzahlerleistung müssen Leistungsart und Kosten transparent sein.'},
        {type:'text',text:'Individuelle Gesundheitsleistungen (IGeL) sind ärztliche Leistungen, die in der jeweiligen Situation nicht zum regulären Leistungskatalog der gesetzlichen Krankenversicherung gehören und vom Patienten selbst bezahlt werden. Vor der Durchführung muss klar sein, welche Leistung angeboten wird, was sie kostet und dass die Entscheidung freiwillig ist.'},
        {type:'video',title:'IGeL versus GKV',source:'IGeL-Monitor / Medizinischer Dienst Bund',caption:'Achte auf den Unterschied zwischen GKV-Leistung, Selbstzahlerleistung und evidenzbasierter Nutzenbewertung.',url:'https://www.igel-monitor.de/'},
        {type:'heading',title:'Recall-System'},
        {type:'text',text:'Ein Recall erinnert mit Einwilligung beziehungsweise geeigneter Rechtsgrundlage an geplante Kontrollen oder Präventionsangebote. Das System braucht korrekte Patientendaten, definierte Zuständigkeiten und Datenschutz. Ein Recall ersetzt keine individuelle medizinische Dringlichkeitseinschätzung.'},
        {type:'list',items:['Zielgruppe und Intervall nach aktuellem Standard definieren','Kontaktdaten und Kommunikationsweg korrekt hinterlegen','Datenschutz und Patientenwunsch berücksichtigen','Erinnerung dokumentieren','Rückmeldung und Termin sauber nachverfolgen']},
      ]
    },
    {
      id:'reha-selbsthilfe', title:'7. Rehabilitation, Teilhabe und Selbsthilfe', content:[
        {type:'heading',title:'Prävention endet nicht mit der Diagnose'},
        {type:'image',src:reha,alt:'Rehabilitation und Teilhabe',caption:'Rehabilitation soll Gesundheit, Alltag und Erwerbsfähigkeit möglichst erhalten oder wiederherstellen.'},
        {type:'text',text:'Rehabilitation unterstützt Menschen nach Erkrankung oder bei drohender dauerhafter Einschränkung. Je nach Situation kommen medizinische Rehabilitation oder Leistungen zur Teilhabe am Arbeitsleben infrage. Die Deutsche Rentenversicherung beschreibt den Grundsatz „Reha vor Rente“: Erwerbsfähigkeit soll nach Möglichkeit erhalten oder wiederhergestellt werden.'},
        {type:'heading',title:'Selbsthilfe'},
        {type:'text',text:'Selbsthilfegruppen ergänzen professionelle Versorgung durch Erfahrungsaustausch, gegenseitige Unterstützung und alltagsnahe Bewältigungsstrategien. Die Praxis kann auf seriöse Selbsthilfe-Kontaktstellen und indikationsbezogene Gruppen hinweisen.'},
        {type:'video',title:'Was ist Selbsthilfe?',source:'gesund.bund.de',caption:'Achte darauf, welche Unterstützung Selbsthilfe bieten kann und wo ihre Grenzen gegenüber professioneller Behandlung liegen.',url:'https://gesund.bund.de/wege-im-gesundheitswesen/erwachsenenleben/behinderung-und-teilhabe/selbsthilfe-und-beratung'},
        {type:'video',title:'Berufliche Rehabilitation',source:'Deutsche Rentenversicherung',caption:'Ordne Aus- und Weiterbildung, Arbeitsplatzsicherung und berufliche Teilhabe als mögliche Leistungen ein.',url:'https://www.deutsche-rentenversicherung.de/DRV/DE/Reha/Berufliche-Reha/berufliche-reha.html'},
      ]
    },
  ],
  questions:[
    {id:1,question:'Was ist Primärprävention?',type:'single',options:[{id:'a',text:'Krankheiten vor ihrem Auftreten verhindern oder Risiken senken',correct:true},{id:'b',text:'nur Rehabilitation'},{id:'c',text:'nur Diagnostik bei Beschwerden'},{id:'d',text:'Abrechnung'}],explanation:'Primärprävention setzt vor einer Erkrankung an.',points:2},
    {id:2,question:'Welche Maßnahme gehört zur Sekundärprävention?',type:'single',options:[{id:'a',text:'Krebsfrüherkennung',correct:true},{id:'b',text:'Reha nach Schlaganfall'},{id:'c',text:'Wundverband'},{id:'d',text:'Lagerbestellung'}],explanation:'Sekundärprävention sucht Erkrankungen oder Vorstufen früh.',points:2},
    {id:3,question:'Wie oft besteht der Check-up-Anspruch ab 35 grundsätzlich?',type:'single',options:[{id:'a',text:'monatlich'},{id:'b',text:'alle drei Jahre',correct:true},{id:'c',text:'alle zehn Jahre'},{id:'d',text:'nie'}],explanation:'Ab 35 grundsätzlich alle drei Jahre.',points:2},
    {id:4,question:'Was gehört zum Check-up?',type:'multiple',options:[{id:'a',text:'Anamnese/Risikoprofil',correct:true},{id:'b',text:'körperliche Untersuchung',correct:true},{id:'c',text:'alters-/risikogerechtes Labor',correct:true},{id:'d',text:'Beratung',correct:true}],explanation:'Der Check-up verbindet diese Bestandteile.',points:4},
    {id:5,question:'Ab welchem Alter gilt das aktuelle Darmkrebs-Screening für Frauen und Männer?',type:'single',options:[{id:'a',text:'30'},{id:'b',text:'40'},{id:'c',text:'50',correct:true},{id:'d',text:'75'}],explanation:'Seit April 2025 gelten gleiche Angebote ab 50.',points:2},
    {id:6,question:'Welche Optionen gibt es ab 50 zur Darmkrebsfrüherkennung?',type:'multiple',options:[{id:'a',text:'Koloskopie nach Programm',correct:true},{id:'b',text:'iFOBT alle zwei Jahre als Alternative',correct:true},{id:'c',text:'nur Röntgen'},{id:'d',text:'nur Ultraschall'}],explanation:'Aktuell stehen Koloskopie oder alternativ regelmäßiger iFOBT zur Verfügung.',points:3},
    {id:7,question:'Für welches Alter gilt aktuell das Mammographie-Screening?',type:'single',options:[{id:'a',text:'20–30'},{id:'b',text:'50–75',correct:true},{id:'c',text:'ab 18 unbegrenzt jährlich'},{id:'d',text:'nur ab 80'}],explanation:'Aktuell 50 bis 75, alle zwei Jahre.',points:2},
    {id:8,question:'Was ist seit April 2026 neu in der GKV-Krebsfrüherkennung?',type:'single',options:[{id:'a',text:'Lungenkrebs-Screening für definierte starke Raucher 50–75',correct:true},{id:'b',text:'Mammographie für alle Kinder'},{id:'c',text:'tägliche Koloskopie'},{id:'d',text:'keine Neuerung'}],explanation:'Das Lungenkrebs-Screening mit Niedrigdosis-CT wurde neu eingeführt.',points:2},
    {id:9,question:'Warum soll ein Impfkalender immer aktuell geprüft werden?',type:'single',options:[{id:'a',text:'Empfehlungen können geändert werden',correct:true},{id:'b',text:'Impfungen haben keine Regeln'},{id:'c',text:'nur wegen der Farbe'},{id:'d',text:'STIKO existiert nicht'}],explanation:'STIKO-Empfehlungen werden regelmäßig fortgeschrieben.',points:2},
    {id:10,question:'Was gehört zum Impfmanagement?',type:'multiple',options:[{id:'a',text:'Impfstatus prüfen',correct:true},{id:'b',text:'aktuelle Empfehlung prüfen',correct:true},{id:'c',text:'korrekt dokumentieren',correct:true},{id:'d',text:'Charge ignorieren'}],explanation:'Sichere Impfung beginnt vor der Injektion und endet mit Dokumentation.',points:3},
    {id:11,question:'Was ist eine IGeL?',type:'single',options:[{id:'a',text:'eine Selbstzahlerleistung außerhalb des regulären GKV-Leistungskatalogs in der konkreten Situation',correct:true},{id:'b',text:'immer eine Notfallleistung'},{id:'c',text:'eine Krankenkasse'},{id:'d',text:'eine Impfung'}],explanation:'IGeL werden privat bezahlt und benötigen transparente Information.',points:2},
    {id:12,question:'Was ist bei IGeL besonders wichtig?',type:'multiple',options:[{id:'a',text:'Freiwilligkeit',correct:true},{id:'b',text:'Kosten vorher transparent machen',correct:true},{id:'c',text:'verständlich informieren',correct:true},{id:'d',text:'Patient unter Druck setzen'}],explanation:'Selbstzahlerleistungen erfordern eine informierte freiwillige Entscheidung.',points:3},
    {id:13,question:'Was ist ein Recall?',type:'single',options:[{id:'a',text:'ein organisiertes Erinnerungssystem',correct:true},{id:'b',text:'eine Diagnose'},{id:'c',text:'eine Operation'},{id:'d',text:'ein Laborwert'}],explanation:'Recall erinnert an geplante Kontrollen oder Präventionsangebote.',points:2},
    {id:14,question:'Was ist der Grundsatz „Reha vor Rente“?',type:'single',options:[{id:'a',text:'Erwerbsfähigkeit soll möglichst erhalten oder wiederhergestellt werden',correct:true},{id:'b',text:'Reha ist immer verboten'},{id:'c',text:'Rente wird immer sofort gezahlt'},{id:'d',text:'nur Urlaub ist gemeint'}],explanation:'Rehabilitation kann helfen, Teilhabe und Erwerbsfähigkeit zu sichern.',points:2},
    {id:15,question:'Was können Selbsthilfegruppen bieten?',type:'multiple',options:[{id:'a',text:'Erfahrungsaustausch',correct:true},{id:'b',text:'gegenseitige Unterstützung',correct:true},{id:'c',text:'Alltagsstrategien',correct:true},{id:'d',text:'automatisch ärztliche Behandlung ersetzen'}],explanation:'Selbsthilfe ergänzt, ersetzt aber professionelle Behandlung nicht automatisch.',points:3},
    {id:16,question:'Nenne zwei veränderbare Gesundheitsrisiken.',type:'text',correctAnswer:'rauchen,nikotin,bewegung,ernährung,alkohol,stress,schlaf,übergewicht',explanation:'Beispiele sind Rauchen, Bewegungsmangel, Ernährung, Alkohol oder Stress.',points:3},
    {id:17,question:'Welche Aussage zu Screening bei Beschwerden ist richtig?',type:'single',options:[{id:'a',text:'Beschwerden werden diagnostisch abgeklärt und nicht auf den nächsten Screeningtermin verschoben',correct:true},{id:'b',text:'man wartet immer bis zum nächsten Recall'},{id:'c',text:'Beschwerden sind bei Prävention irrelevant'},{id:'d',text:'MFA stellt selbst die Diagnose'}],explanation:'Screening ist grundsätzlich für beschwerdefreie Zielgruppen; Beschwerden brauchen Diagnostik.',points:2},
    {id:18,question:'Erkläre den Unterschied zwischen Prävention und Früherkennung kurz.',type:'text',correctAnswer:'verhindern,risiko,früh,erkennen,sekundär',explanation:'Prävention ist der Oberbegriff; Früherkennung ist vor allem Sekundärprävention.',points:3},
  ]
};
