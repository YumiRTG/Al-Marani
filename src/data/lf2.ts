import type { LearningModule } from '@/types';
import { compareVisual, heroVisual, processVisual, cycleVisual } from './visualKit';

const patientJourney = processVisual('Patientenweg in der Arztpraxis', [
  { title: 'Empfang', text: 'begrüßen, Identität und Anliegen klären' },
  { title: 'Aufnahme', text: 'Versicherung, Daten, Dringlichkeit und Termin prüfen' },
  { title: 'Behandlung', text: 'Informationen bereitstellen und Patienten begleiten' },
  { title: 'Abschluss', text: 'Folgetermin, Verordnung, Hinweise und Dokumentation' },
], 'Jeder Schritt braucht klare Kommunikation und korrekte Daten.');

const communication = compareVisual('Gesprächsführung am Empfang', [
  { title: 'Hilfreich', lines: ['Blickkontakt und Begrüßung', 'aktiv zuhören', 'offen beginnen', 'kurz zusammenfassen', 'ruhig und sachlich bleiben'] },
  { title: 'Ungünstig', lines: ['Patient unterbrechen', 'Fachbegriffe ohne Erklärung', 'vor anderen über Befunde sprechen', 'Vorwürfe und Ironie', 'unklare Zusagen machen'] },
]);

const dataFlow = processVisual('Patientendaten sicher verarbeiten', [
  { title: 'Erheben', text: 'nur erforderliche und richtige Daten aufnehmen' },
  { title: 'Nutzen', text: 'für Behandlung, Organisation und zulässige Abrechnung' },
  { title: 'Schützen', text: 'Zugriffe, Bildschirm, Gespräche und Übertragung sichern' },
  { title: 'Dokumentieren', text: 'vollständig, nachvollziehbar und zeitnah' },
  { title: 'Aufbewahren', text: 'gesetzliche und berufliche Fristen beachten' },
]);

const insurance = cycleVisual('Versorgung und Kostenträger', [
  { title: 'GKV', text: 'gesetzliche Krankenversicherung' },
  { title: 'PKV', text: 'private Krankenversicherung' },
  { title: 'Unfallversicherung', text: 'Arbeits- und Wegeunfälle' },
  { title: 'Selbstzahler', text: 'privat vereinbarte Leistungen' },
  { title: 'Praxis', text: 'prüft Anspruch und rechnet korrekt ab' },
]);

export const lf2: LearningModule = {
  id:'lf2', number:2,
  title:'Patienten empfangen und begleiten',
  subtitle:'Kommunikation, Patientenaufnahme, Behandlungsvertrag, Datenschutz, Terminmanagement, eGK, ePA und Grundlagen der Abrechnung',
  description:'Vom ersten Kontakt bis zur Dokumentation: Patienten professionell empfangen, sicher mit Gesundheitsdaten umgehen und Abläufe verständlich organisieren.',
  difficulty:'easy', icon:'stethoscope',
  heroImage: heroVisual(2, 'Patienten empfangen & begleiten', 'Kommunikation · Datenschutz · Organisation'),
  topics:[
    {
      id:'empfang', title:'1. Der professionelle Patientenempfang', content:[
        {type:'heading',title:'Der erste Eindruck beginnt vor der Behandlung'},
        {type:'text',text:'Am Empfang treffen medizinische Versorgung, Organisation und Kommunikation aufeinander. Eine MFA klärt freundlich und strukturiert, wer der Patient ist, weshalb er kommt, ob ein Termin besteht und ob Hinweise auf eine dringliche Situation vorliegen. Gleichzeitig muss die Privatsphäre anderer Patienten geschützt bleiben.'},
        {type:'image',src:patientJourney,alt:'Patientenweg in der Arztpraxis',caption:'Vom Empfang bis zum Abschluss der Behandlung.'},
        {type:'heading',title:'Identität und Anliegen sicher klären'},
        {type:'list',items:['Patient begrüßen und Namen eindeutig zuordnen','bei neuen Patienten erforderliche Stammdaten aufnehmen','Versicherungsstatus und elektronische Gesundheitskarte prüfen','Anliegen in kurzer Form erfassen','bei akuten Beschwerden Dringlichkeit nach Praxisstandard einschätzen und bei Warnzeichen sofort ärztlich weitergeben','weitere Schritte verständlich erklären']},
        {type:'warning',title:'Diskretion',text:'Diagnosen, Beschwerden und persönliche Daten werden am Empfang nicht unnötig laut wiederholt. Gespräche so führen, dass andere Wartende möglichst wenig mithören.'},
      ]
    },
    {
      id:'kommunikation', title:'2. Gesprächsführung, schwierige Situationen und Telefon', content:[
        {type:'heading',title:'Gute Gesprächsführung ist eine Fachkompetenz'},
        {type:'text',text:'Patienten können krank, ängstlich, gestresst oder verärgert sein. Professionelle Kommunikation bedeutet, Informationen klar zu erfassen und gleichzeitig respektvoll zu bleiben. Offene Fragen eignen sich für den Einstieg, geschlossene Fragen helfen anschließend beim gezielten Klären.'},
        {type:'image',src:communication,alt:'Hilfreiche und ungünstige Gesprächsführung',caption:'Verhalten, das Gespräche erleichtert oder erschwert.'},
        {type:'heading',title:'Aktives Zuhören'},
        {type:'text',text:'Aktives Zuhören bedeutet, aufmerksam zuzuhören, relevante Aussagen aufzugreifen und bei Bedarf in eigenen Worten zusammenzufassen. Dadurch lassen sich Missverständnisse früh erkennen. Aussagen wie „Wenn ich Sie richtig verstanden habe …“ helfen bei der Klärung.'},
        {type:'video',title:'Gesprächsführung',source:'Studyflix',duration:'5:06 Min.',caption:'Achte auf aktives Zuhören, offene Fragen und einen klaren Gesprächsablauf.',url:'https://studyflix.de/jobs/karriere-tipps/gespraechsfuehrung-7024/video'},
        {type:'heading',title:'Konflikte deeskalieren'},
        {type:'text',text:'Bei Beschwerden oder Wartezeitkonflikten zuerst ruhig zuhören und das konkrete Problem herausarbeiten. Nicht provozieren, nicht vor anderen diskutieren und keine Zusagen machen, die nicht eingehalten werden können. Drohungen, Gewalt oder medizinische Notfälle werden nach dem Sicherheits- beziehungsweise Notfallplan der Praxis behandelt.'},
        {type:'video',title:'Konfliktmanagement',source:'Studyflix',duration:'4:58 Min.',caption:'Beobachte, wie Sachebene, Interessen und Lösungsfindung getrennt werden.',url:'https://studyflix.de/jobs/karriere-tipps/konfliktmanagement-3551/video'},
        {type:'heading',title:'Telefonieren in der Arztpraxis'},
        {type:'list',items:['Praxis und eigenen Namen nennen','Identität des Anrufers bei sensiblen Informationen sicher klären','Anliegen strukturieren und Rückfragen stellen','keine medizinische Ferndiagnose durch die MFA','Rückruf und Zuständigkeit eindeutig vereinbaren','wichtige Informationen dokumentieren']},
      ]
    },
    {
      id:'behandlungsvertrag', title:'3. Behandlungsvertrag, Information und Patientenrechte', content:[
        {type:'heading',title:'Rechtlicher Rahmen der Behandlung'},
        {type:'text',text:'Der Behandlungsvertrag ist im Bürgerlichen Gesetzbuch geregelt. Er verpflichtet die Behandelnden zur vereinbarten medizinischen Behandlung nach den fachlichen Standards. Patienten müssen für eine wirksame Einwilligung grundsätzlich verständlich über wesentliche Umstände einer Maßnahme aufgeklärt werden.'},
        {type:'heading',title:'Dokumentation ist Teil der Behandlung'},
        {type:'text',text:'Die Behandlungsakte muss in unmittelbarem zeitlichem Zusammenhang geführt werden. Relevante Anamneseangaben, Diagnosen, Untersuchungen, Befunde, Therapien, Eingriffe, Einwilligungen und Aufklärungen gehören nachvollziehbar in die Dokumentation. Änderungen müssen erkennbar bleiben.'},
        {type:'info',title:'Aufbewahrung',text:'Nach § 630f BGB ist die Behandlungsakte grundsätzlich zehn Jahre nach Abschluss der Behandlung aufzubewahren, soweit nicht andere Vorschriften längere Fristen verlangen.'},
        {type:'heading',title:'Einsicht in die Akte'},
        {type:'text',text:'Patientinnen und Patienten können grundsätzlich unverzüglich Einsicht in ihre vollständige Behandlungsakte verlangen. Die erste Abschrift ist nach geltendem Recht grundsätzlich unentgeltlich. Einschränkungen sind nur in besonderen gesetzlich vorgesehenen Situationen möglich.'},
      ]
    },
    {
      id:'datenschutz', title:'4. Datenschutz und sichere Patientendaten', content:[
        {type:'heading',title:'Gesundheitsdaten sind besonders sensibel'},
        {type:'text',text:'Gesundheitsdaten gehören zu den besonders geschützten personenbezogenen Daten. In der Praxis dürfen sie nur verarbeitet werden, wenn dafür eine Rechtsgrundlage besteht. Zusätzlich gilt die berufliche Schweigepflicht. Datenschutz betrifft nicht nur Computer, sondern auch Papierakten, Telefonate, Ausdrucke, Wartebereiche und Gespräche.'},
        {type:'image',src:dataFlow,alt:'Sicherer Umgang mit Patientendaten',caption:'Daten werden zweckgebunden erhoben, genutzt, geschützt und dokumentiert.'},
        {type:'table',headers:['Risiko','Sichere Lösung'],rows:[['Bildschirm vom Wartebereich einsehbar','Sichtschutz und Bildschirmsperre'],['Befund per Telefon','Identität und Berechtigung prüfen'],['Ausdruck bleibt am Drucker','sofort abholen und sicher ablegen'],['Passwort wird geteilt','persönliche Zugangsdaten nutzen'],['E-Mail mit Gesundheitsdaten','nur freigegebene sichere Verfahren nutzen']]},
        {type:'video',title:'Datenschutz und eHealth',source:'BfDI',caption:'Nutze die eHealth-Übersicht, um zu verstehen, weshalb Gesundheitsdaten besonders geschützt werden.',url:'https://www.bfdi.bund.de/DE/Buerger/Sozialverwaltung/eHealth/eHealth_node.html'},
      ]
    },
    {
      id:'digital', title:'5. eGK, Telematikinfrastruktur, ePA und E-Rezept', content:[
        {type:'heading',title:'Elektronische Gesundheitskarte und Versicherungsdaten'},
        {type:'text',text:'Bei gesetzlich Versicherten dient die elektronische Gesundheitskarte unter anderem dem Nachweis des Versicherungsverhältnisses und dem Versichertenstammdatenmanagement. Die Praxis muss Karten- und Ersatzverfahren korrekt nach den jeweils geltenden Vorgaben anwenden.'},
        {type:'heading',title:'Die ePA ergänzt die Praxisdokumentation'},
        {type:'text',text:'Die elektronische Patientenakte ist eine versichertengeführte Akte in der Telematikinfrastruktur. Sie kann wichtige Behandlungsinformationen institutionsübergreifend verfügbar machen. Sie ersetzt jedoch nicht die eigene vollständige Behandlungsdokumentation im Praxisverwaltungssystem.'},
        {type:'video',title:'ePA kurz erklärt – Videos für Arztpraxen',source:'KBV',caption:'Die KBV zeigt in mehreren Kurzvideos Zugriff, verpflichtende Daten, Patientenwünsche und Dokumentationspflichten.',url:'https://www.kbv.de/praxis/digitalisierung/anwendungen/elektronische-patientenakte/'},
        {type:'video',title:'ePA für alle – Erklärvideos für Praxen',source:'gematik',caption:'Wähle nacheinander die Videos zu Medikationsliste, Suche und Sicherheitsarchitektur.',url:'https://www.gematik.de/anwendungen/epa-fuer-alle/downloadportal-praxen'},
        {type:'heading',title:'E-Rezept'},
        {type:'text',text:'Das E-Rezept übermittelt Verordnungsdaten über die Telematikinfrastruktur. Für die MFA sind korrekte Patientenzuordnung, der Praxisworkflow und der sichere Umgang mit digitalen Zugangsdaten wichtig.'},
        {type:'video',title:'E-Rezept und Datenschutz',source:'BfDI',caption:'Achte auf den digitalen Übertragungsweg und den Schutz der Verordnungsdaten.',url:'https://www.bfdi.bund.de/DE/Buerger/Inhalte/GesundheitSoziales/eHealth/eRezept.html'},
      ]
    },
    {
      id:'versicherung-abrechnung', title:'6. Versicherungsarten und Abrechnungsgrundlagen', content:[
        {type:'heading',title:'Nicht jeder Patient wird gleich abgerechnet'},
        {type:'image',src:insurance,alt:'Kostenträger in der Arztpraxis',caption:'Versicherungsstatus beeinflusst den administrativen Ablauf.'},
        {type:'text',text:'Bei gesetzlich Versicherten werden vertragsärztliche Leistungen grundsätzlich nach dem Einheitlichen Bewertungsmaßstab abgerechnet. Privatärztliche Leistungen richten sich grundsätzlich nach der Gebührenordnung für Ärzte. Arbeits- und Wegeunfälle gehören zur gesetzlichen Unfallversicherung und folgen besonderen Verfahren und der UV-GOÄ.'},
        {type:'heading',title:'EBM – Grundidee'},
        {type:'text',text:'Der EBM ist die verbindliche Abrechnungsgrundlage für vertragsärztliche Leistungen. Leistungen sind bestimmten Gebührenordnungspositionen zugeordnet. Für die Ausbildung ist zunächst wichtig, Leistungen, Voraussetzungen, Dokumentation und Kostenträger korrekt zuzuordnen.'},
        {type:'heading',title:'Terminmanagement'},
        {type:'text',text:'Termine müssen medizinische Dringlichkeit, benötigte Zeit, Ressourcen und Praxisablauf berücksichtigen. Akute Beschwerden werden nicht einfach in die nächste freie Lücke geschoben, wenn Warnzeichen eine sofortige ärztliche Einschätzung erforderlich machen.'},
        {type:'list',items:['Terminart und benötigte Dauer klären','Vorbereitung oder Nüchternheit mitteilen','notwendige Unterlagen nennen','Termin eindeutig bestätigen','Absagen und Änderungen dokumentieren','Recall nur nach geltendem Datenschutz und Praxisregel nutzen']},
      ]
    },
  ],
  questions:[
    {id:1,question:'Was gehört zu einem professionellen Patientenempfang?',type:'multiple',options:[{id:'a',text:'Identität klären',correct:true},{id:'b',text:'Anliegen erfassen',correct:true},{id:'c',text:'Diskretion beachten',correct:true},{id:'d',text:'Diagnose im Wartezimmer laut wiederholen'}],explanation:'Identifikation, Anliegen und Datenschutz gehören zusammen.',points:3},
    {id:2,question:'Wofür eignen sich offene Fragen besonders?',type:'single',options:[{id:'a',text:'für den Gesprächseinstieg',correct:true},{id:'b',text:'nur zum Abrechnen'},{id:'c',text:'nur für Ja/Nein-Antworten'},{id:'d',text:'gar nicht'}],explanation:'Offene Fragen lassen Patienten zunächst frei schildern.',points:2},
    {id:3,question:'Was bedeutet aktives Zuhören?',type:'single',options:[{id:'a',text:'ständig unterbrechen'},{id:'b',text:'aufmerksam zuhören und Aussagen klären bzw. zusammenfassen',correct:true},{id:'c',text:'nur nicken'},{id:'d',text:'Gespräch vermeiden'}],explanation:'Aktives Zuhören verbessert Verständnis und Beziehung.',points:2},
    {id:4,question:'Wie sollte die MFA bei einem Konflikt reagieren?',type:'single',options:[{id:'a',text:'lauter werden'},{id:'b',text:'ruhig bleiben und das konkrete Problem klären',correct:true},{id:'c',text:'Patienten beleidigen'},{id:'d',text:'unmögliche Zusagen machen'}],explanation:'Deeskalation bleibt sachlich und lösungsorientiert.',points:2},
    {id:5,question:'Was ersetzt die ePA nicht?',type:'single',options:[{id:'a',text:'die eigene Behandlungsdokumentation der Praxis',correct:true},{id:'b',text:'eine Papiernotiz'},{id:'c',text:'den Terminplan'},{id:'d',text:'das Wartezimmer'}],explanation:'Die Praxis muss weiterhin vollständig im eigenen System dokumentieren.',points:2},
    {id:6,question:'Welche Daten sind besonders sensibel?',type:'single',options:[{id:'a',text:'Gesundheitsdaten',correct:true},{id:'b',text:'öffentliche Wetterdaten'},{id:'c',text:'Straßennamen allgemein'},{id:'d',text:'Praxisöffnungszeiten'}],explanation:'Gesundheitsdaten genießen besonderen Datenschutz.',points:2},
    {id:7,question:'Was ist bei einem telefonischen Befundwunsch wichtig?',type:'single',options:[{id:'a',text:'sofort jedem Auskunft geben'},{id:'b',text:'Identität und Berechtigung prüfen',correct:true},{id:'c',text:'Befund ins Wartezimmer rufen'},{id:'d',text:'Passwort nennen'}],explanation:'Sensible Daten dürfen nur an berechtigte Personen gelangen.',points:2},
    {id:8,question:'Wie lange ist die Behandlungsakte nach § 630f BGB grundsätzlich aufzubewahren?',type:'single',options:[{id:'a',text:'1 Jahr'},{id:'b',text:'5 Jahre'},{id:'c',text:'10 Jahre',correct:true},{id:'d',text:'immer 50 Jahre'}],explanation:'Grundsatz: zehn Jahre, soweit keine längeren Sonderfristen gelten.',points:2},
    {id:9,question:'Was ist eine Aufgabe der Behandlungsdokumentation?',type:'multiple',options:[{id:'a',text:'Befunde festhalten',correct:true},{id:'b',text:'Therapien dokumentieren',correct:true},{id:'c',text:'Einwilligung/Aufklärung dokumentieren',correct:true},{id:'d',text:'Fehler nachträglich unkenntlich machen'}],explanation:'Die Dokumentation muss nachvollziehbar bleiben.',points:3},
    {id:10,question:'Wofür steht EBM?',type:'single',options:[{id:'a',text:'Einheitlicher Bewertungsmaßstab',correct:true},{id:'b',text:'Elektronische Behandlungsmaschine'},{id:'c',text:'Einfaches Blutmesssystem'},{id:'d',text:'Europäische Behandlungsmappe'}],explanation:'Der EBM ist die Abrechnungsgrundlage in der vertragsärztlichen Versorgung.',points:2},
    {id:11,question:'Welche Abrechnung ist bei einem Arbeitsunfall besonders relevant?',type:'single',options:[{id:'a',text:'gesetzliche Unfallversicherung / UV-GOÄ',correct:true},{id:'b',text:'nur Selbstzahler'},{id:'c',text:'immer EBM ohne weitere Angaben'},{id:'d',text:'keine Abrechnung'}],explanation:'Arbeits- und Wegeunfälle folgen den Regeln der gesetzlichen Unfallversicherung.',points:2},
    {id:12,question:'Was sollte Terminmanagement berücksichtigen?',type:'multiple',options:[{id:'a',text:'medizinische Dringlichkeit',correct:true},{id:'b',text:'benötigte Zeit',correct:true},{id:'c',text:'Ressourcen',correct:true},{id:'d',text:'nur Reihenfolge der Anrufe'}],explanation:'Termine werden medizinisch und organisatorisch geplant.',points:3},
    {id:13,question:'Was ist beim E-Rezept besonders wichtig?',type:'single',options:[{id:'a',text:'korrekte Patientenzuordnung und sicherer digitaler Workflow',correct:true},{id:'b',text:'Passwörter teilen'},{id:'c',text:'Daten offen ausdrucken'},{id:'d',text:'jede Verordnung verändern'}],explanation:'Digitale Prozesse benötigen dieselbe Sorgfalt wie analoge.',points:2},
    {id:14,question:'Was ist bei Gesundheitsdaten am Bildschirm sinnvoll?',type:'multiple',options:[{id:'a',text:'Bildschirmsperre',correct:true},{id:'b',text:'Sichtschutz',correct:true},{id:'c',text:'persönliche Zugänge',correct:true},{id:'d',text:'Passwort auf den Monitor kleben'}],explanation:'Technische und organisatorische Maßnahmen schützen Patientendaten.',points:3},
    {id:15,question:'Nenne zwei Bestandteile eines strukturierten Telefonats in der Praxis.',type:'text',correctAnswer:'name,identität,anliegen,rückfrage,rückruf,dokumentation',explanation:'Zum Beispiel Identität, Anliegen, klare Rückfragen, Rückrufvereinbarung und Dokumentation.',points:3},
    {id:16,question:'Was ist der Unterschied zwischen GKV und PKV im Praxisablauf besonders relevant?',type:'single',options:[{id:'a',text:'Versicherungs- und Abrechnungsweg',correct:true},{id:'b',text:'Menschen werden unterschiedlich höflich behandelt'},{id:'c',text:'PKV-Patienten brauchen keine Dokumentation'},{id:'d',text:'GKV-Patienten haben keine Termine'}],explanation:'Medizinische Professionalität bleibt gleich, der administrative Abrechnungsweg unterscheidet sich.',points:2},
    {id:17,question:'Wann sollte die MFA eine akute Situation ärztlich weitergeben?',type:'single',options:[{id:'a',text:'bei Warnzeichen oder unklarer Dringlichkeit',correct:true},{id:'b',text:'erst am nächsten Tag'},{id:'c',text:'nur wenn der Patient laut ist'},{id:'d',text:'nie'}],explanation:'Medizinische Warnzeichen brauchen eine zeitnahe qualifizierte Einschätzung.',points:2},
    {id:18,question:'Erkläre kurz, warum Datenschutz auch am Empfang wichtig ist.',type:'text',correctAnswer:'gesundheitsdaten,vertraulich,schweigepflicht,privatsphäre',explanation:'Am Empfang werden besonders sensible Gesundheits- und Identitätsdaten verarbeitet.',points:3},
  ]
};
