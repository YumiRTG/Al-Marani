import type { LearningModule } from '@/types';
import { compareVisual, cycleVisual, heroVisual, processVisual } from './visualKit';

const wound = processVisual('Wundversorgung in der Praxis', [
  { title:'Beurteilen', text:'Wundart, Größe, Tiefe, Blutung, Verschmutzung und Infektionszeichen' },
  { title:'Vorbereiten', text:'Patient, Material, Hygiene, ärztliche Anordnung und Lagerung' },
  { title:'Versorgen', text:'reinigen, assistieren, verbinden und Schmerzen beachten' },
  { title:'Kontrollieren', text:'Durchblutung, Blutung, Verband und Allgemeinzustand' },
  { title:'Dokumentieren', text:'Befund, Maßnahmen, Material, Hinweise und Termin' },
]);

const woundTypes = compareVisual('Akute Wunden unterscheiden', [
  { title:'Schnitt / Stich', lines:['scharfe Gewalteinwirkung','Tiefe oft schwer einzuschätzen','Gefäße, Nerven oder Sehnen möglich','Tetanusschutz beachten'] },
  { title:'Schürfung', lines:['oberflächliche Hautschichten','oft verschmutzt','Reinigung wichtig','große Flächen können schmerzen'] },
  { title:'Platz / Riss', lines:['stumpfe oder ziehende Gewalt','unregelmäßige Wundränder','Gewebeschädigung möglich','ärztliche Beurteilung'] },
]);

const surgery = processVisual('Kleiner chirurgischer Eingriff', [
  { title:'Vorher', text:'Identität, Eingriff, Einwilligung, Allergien, Medikation und Material prüfen' },
  { title:'Aseptisch vorbereiten', text:'Raum, Instrumente, Hautantiseptik und sterile Materialien' },
  { title:'Assistieren', text:'Material anreichen, Übersicht halten, Patient beobachten' },
  { title:'Nachsorge', text:'Wunde/Verband, Kreislauf, Schmerz und Verhalten erklären' },
  { title:'Abschluss', text:'Probenversand, Aufbereitung, Entsorgung, Dokumentation und Abrechnung' },
]);

const healing = cycleVisual('Phasen der Wundheilung', [
  { title:'Reinigung', text:'Blutstillung und Entzündungsreaktion' },
  { title:'Granulation', text:'neues Gewebe und Gefäße entstehen' },
  { title:'Epithelisierung', text:'Wundoberfläche schließt sich' },
  { title:'Remodelling', text:'Narbe wird über längere Zeit umgebaut' },
]);

const skinTumor = compareVisual('Hauttumoren – Grundunterschiede', [
  { title:'Basalzellkarzinom', lines:['heller Hautkrebs','häufig UV-exponierte Stellen','wächst lokal zerstörend','metastasiert nur selten'] },
  { title:'Plattenepithelkarzinom', lines:['heller Hautkrebs','häufig an Sonnenterrassen','kann verhornte/ulzerierte Läsion sein','Metastasen möglich'] },
  { title:'Malignes Melanom', lines:['schwarzer Hautkrebs','kann früh metastasieren','auffällige Pigmentläsion möglich','frühe Erkennung besonders wichtig'] },
]);

export const lf10: LearningModule = {
  id:'lf10', number:10,
  title:'Patienten bei kleinen chirurgischen Behandlungen begleiten und Wunden versorgen',
  subtitle:'Wundarten, Wundheilung, kleine Eingriffe, Lokalanästhesie, Hygiene, Hauttumoren, Arbeitsunfälle und D-Arzt-Verfahren',
  description:'Vom ersten Wundbefund bis zur Nachsorge: kleine chirurgische Behandlungen sicher vorbereiten, assistieren und dokumentieren.',
  difficulty:'medium', icon:'stethoscope',
  heroImage:heroVisual(10,'Kleine Chirurgie & Wunden','Vorbereiten · assistieren · versorgen · dokumentieren'),
  topics:[
    {
      id:'haut-wunde', title:'1. Haut, Wundarten und Wundbeurteilung', content:[
        {type:'heading',title:'Die Haut ist Schutzorgan und Sinnesorgan'},
        {type:'text',text:'Die Haut schützt vor mechanischen und chemischen Einflüssen, Krankheitserregern und Flüssigkeitsverlust. Sie beteiligt sich an Temperaturregulation und Sinneswahrnehmung. Wird die Hautbarriere verletzt, steigt das Risiko für Blutverlust, Schmerzen, Infektionen und Schädigung tieferer Strukturen.'},
        {type:'heading',title:'Wunden nach Ursache unterscheiden'},
        {type:'image',src:woundTypes,alt:'Akute Wundarten',caption:'Wundform und Verletzungsmechanismus geben Hinweise auf mögliche Risiken.'},
        {type:'table',headers:['Wundart','Typische Besonderheit'],rows:[['Schnittwunde','glatte Wundränder, Blutung je nach verletztem Gefäß'],['Stichwunde','kleine Eintrittsstelle, Tiefe und Fremdkörperrisiko beachten'],['Schürfwunde','oberflächlich, häufig verschmutzt und schmerzhaft'],['Platzwunde','stumpfe Gewalt, unregelmäßige Wundränder'],['Bisswunde','hohes Infektionsrisiko; ärztliche Beurteilung wichtig'],['Verbrennung/Verbrühung','thermische Gewebeschädigung; Ausdehnung und Tiefe beurteilen']]},
        {type:'heading',title:'Wundbeurteilung systematisch'},
        {type:'list',items:['Lokalisation und Ursache','Größe und Tiefe','Wundränder und Wundgrund','Blutung und Sekret','Verschmutzung oder Fremdkörper','Schmerz','Durchblutung, Motorik und Sensibilität distal der Verletzung','Infektionszeichen und Allgemeinzustand','Tetanus-Impfschutz nach ärztlichem/Praxisstandard klären']},
        {type:'video',title:'Schürfwunde behandeln',source:'Stiftung Gesundheitswissen',duration:'1:50 Min.',caption:'Achte auf Wundbeurteilung, Händehygiene, Reinigung, Verband und Warnzeichen.',url:'https://www.stiftung-gesundheitswissen.de/mediathek/videos/schuerfwunde-behandeln-erste-hilfe-fuer-kinder-erwachsene',embedUrl:'https://www.youtube-nocookie.com/embed/v705JMbdEp0'},
      ]
    },
    {
      id:'wundheilung', title:'2. Wundheilung, chronische Wunden und Infektionszeichen', content:[
        {type:'heading',title:'Wundheilung läuft in überlappenden Phasen'},
        {type:'image',src:healing,alt:'Wundheilungsphasen',caption:'Die Phasen überschneiden sich und können durch Erkrankungen oder Infektionen gestört werden.'},
        {type:'text',text:'Nach der Blutstillung räumt die Entzündungsreaktion Zellreste und Keime auf. Anschließend entsteht Granulationsgewebe mit neuen Gefäßen. Von den Wundrändern wächst Epithel über die Oberfläche. Die Narbe wird danach über Wochen und Monate umgebaut und belastbarer, erreicht aber nicht immer die ursprüngliche Gewebefestigkeit.'},
        {type:'heading',title:'Entzündungszeichen richtig einordnen'},
        {type:'text',text:'Rötung, Überwärmung, Schwellung, Schmerz und Funktionsstörung sind klassische Entzündungszeichen. Eine normale frühe Heilungsreaktion muss von einer zunehmenden Infektion unterschieden werden. Eiter, fortschreitende Rötung, Fieber, zunehmender Schmerz oder Allgemeinzustandsverschlechterung erfordern ärztliche Beurteilung.'},
        {type:'video',title:'Was ist eine Entzündung?',source:'Stiftung Gesundheitswissen',caption:'Ordne Rötung, Wärme, Schwellung, Schmerz und Funktionsstörung den Vorgängen im Gewebe zu.',url:'https://www.stiftung-gesundheitswissen.de/mediathek/videos/koerper-wissen/was-ist-eine-entzuendung'},
        {type:'heading',title:'Chronische Wunden'},
        {type:'text',text:'Eine Wunde kann chronisch werden, wenn Grunderkrankungen oder lokale Faktoren die Heilung stören. gesund.bund.de beschreibt Wunden als chronisch, wenn sie trotz Behandlung innerhalb von vier bis zwölf Wochen nicht abheilen. Häufige Zusammenhänge sind venöse oder arterielle Durchblutungsstörungen, Diabetes und anhaltender Druck.'},
        {type:'video',title:'Chronische Wunden – Ursachen und Behandlung',source:'gesund.bund.de',caption:'Achte darauf, warum die Behandlung der Ursache ebenso wichtig ist wie der Verband.',url:'https://gesund.bund.de/chronische-wunden'},
      ]
    },
    {
      id:'wundversorgung', title:'3. Wundversorgung und Verbände', content:[
        {type:'heading',title:'Wundversorgung folgt einem festen Ablauf'},
        {type:'image',src:wound,alt:'Ablauf Wundversorgung',caption:'Beurteilen, vorbereiten, versorgen, kontrollieren und dokumentieren.'},
        {type:'text',text:'Welche Wundreinigung, Antiseptik und Wundauflage geeignet ist, hängt von Wundart, Heilungsphase, Sekretmenge, Infektionsrisiko und ärztlicher Anordnung ab. Eine Wundauflage soll die Wunde schützen und ein geeignetes Heilungsmilieu unterstützen, ohne neu gebildetes Gewebe beim Wechsel unnötig zu verletzen.'},
        {type:'heading',title:'Verbandwechsel vorbereiten'},
        {type:'list',items:['ärztliche Anordnung und Wunddokumentation prüfen','Patient informieren und schmerzarm lagern','Material vollständig vorbereiten','Händehygiene und erforderliche Schutzkleidung','alten Verband sauber entfernen und Wunde beurteilen','aseptische Arbeitsschritte beachten','neuen Verband sicher fixieren','Entsorgung und Händehygiene','Befund und Material dokumentieren']},
        {type:'warning',title:'Aseptisches Arbeiten',text:'Saubere und sterile Bereiche nicht vermischen. Ein steril gewordener Gegenstand bleibt nur steril, solange seine Sterilität erhalten bleibt.'},
      ]
    },
    {
      id:'kleine-chirurgie', title:'4. Kleine chirurgische Eingriffe vorbereiten und assistieren', content:[
        {type:'heading',title:'Vorbereitung verhindert Fehler'},
        {type:'image',src:surgery,alt:'Ablauf kleiner chirurgischer Eingriff',caption:'Die MFA begleitet den Prozess vor, während und nach dem Eingriff.'},
        {type:'text',text:'Vor einem ambulanten Eingriff müssen Patient, geplanter Eingriff, Seite beziehungsweise Lokalisation, Einwilligung, relevante Allergien, Medikamente und benötigte Materialien eindeutig geklärt sein. Sterile Instrumente und Materialien werden erst so vorbereitet, dass ihre Sterilität nicht gefährdet wird.'},
        {type:'heading',title:'Während des Eingriffs'},
        {type:'list',items:['Patient beobachten und ansprechbar begleiten','steriles Arbeiten unterstützen','Instrumente und Material nach Anforderung anreichen','Zähl- und Sicherheitsregeln der Praxis einhalten','auffällige Blutung, Kreislaufreaktion oder Beschwerden sofort mitteilen','Proben eindeutig zuordnen und sichern']},
        {type:'heading',title:'Nach dem Eingriff'},
        {type:'text',text:'Wunde und Verband werden kontrolliert. Der Patient erhält verständliche Hinweise zu Schonung, Verband, Schmerzen, Warnzeichen und dem nächsten Termin. Entnommenes Gewebe wird eindeutig beschriftet, korrekt dokumentiert und nach Vorgabe an die Pathologie versandt.'},
      ]
    },
    {
      id:'lokalanaesthesie', title:'5. Lokalanästhesie und Patientensicherheit', content:[
        {type:'heading',title:'Örtliche Betäubung'},
        {type:'text',text:'Bei einer Lokalanästhesie wird die Schmerzempfindung in einem begrenzten Körperbereich ausgeschaltet, während der Patient grundsätzlich bei Bewusstsein bleibt. Je nach Eingriff gibt es unterschiedliche Formen der örtlichen Betäubung. Auswahl, Wirkstoff, Dosis und Durchführung liegen in ärztlicher Verantwortung.'},
        {type:'table',headers:['Vor der Anwendung','Während/Nach der Anwendung'],rows:[['Allergien und frühere Reaktionen erfragen','Patient auf Beschwerden beobachten'],['ärztliche Anordnung und Präparat prüfen','Kreislauf und Allgemeinzustand beachten'],['richtigen Patienten und Eingriff prüfen','ungewöhnliche neurologische oder systemische Symptome sofort melden'],['Notfallausrüstung nach Praxisstandard verfügbar','Wirkung und Verlauf dokumentieren']]},
        {type:'video',title:'Lokalanästhesie – Begriff und Grundprinzip',source:'gesund.bund.de',caption:'Verstehe den Unterschied zwischen örtlicher Betäubung und einer Narkose.',url:'https://gesund.bund.de/glossar/lokalanaesthesie'},
        {type:'warning',title:'Keine Dosis auswendig übertragen',text:'Dosierungsgrenzen hängen vom Wirkstoff, Präparat, Patienten und Verfahren ab. Maßgeblich sind ärztliche Anordnung und aktuelle Fachinformation.'},
      ]
    },
    {
      id:'hauttumoren', title:'6. Hauttumoren und Gewebeproben', content:[
        {type:'heading',title:'Hautveränderungen werden histologisch gesichert'},
        {type:'image',src:skinTumor,alt:'Basalzellkarzinom Plattenepithelkarzinom Melanom',caption:'Grundbegriffe zur Einordnung häufiger Hautkrebsformen.'},
        {type:'text',text:'Eine auffällige Hautveränderung lässt sich nicht allein durch eine schematische Abbildung sicher diagnostizieren. Bei Verdacht kann Gewebe entnommen und histologisch untersucht werden. Die Probe muss eindeutig Patient, Entnahmestelle und Auftrag zugeordnet werden.'},
        {type:'heading',title:'Weißer und schwarzer Hautkrebs'},
        {type:'text',text:'Zum hellen Hautkrebs zählen vor allem Basalzellkarzinom und Plattenepithelkarzinom. Basalzellkarzinome metastasieren nur selten, können aber lokal Gewebe zerstören. Plattenepithelkarzinome können metastasieren. Das maligne Melanom kann früh über Lymph- und Blutwege streuen und muss besonders früh erkannt und behandelt werden.'},
        {type:'video',title:'Weißer Hautkrebs',source:'gesund.bund.de',caption:'Achte auf Risikofaktoren, typische Körperstellen und Behandlungsprinzipien.',url:'https://gesund.bund.de/weisser-hautkrebs'},
        {type:'video',title:'Schwarzer Hautkrebs',source:'gesund.bund.de',caption:'Vergleiche Melanom, weißen Hautkrebs und die Bedeutung von Metastasen.',url:'https://gesund.bund.de/schwarzer-hautkrebs'},
      ]
    },
    {
      id:'arbeitsunfall', title:'7. Arbeits- und Wegeunfälle, D-Arzt und UV-GOÄ', content:[
        {type:'heading',title:'Arbeitsunfälle folgen einem besonderen Verfahren'},
        {type:'text',text:'Bei Arbeits- und Wegeunfällen ist die gesetzliche Unfallversicherung zuständig. Die Praxis erfasst deshalb Unfalltag, Unfallhergang, Arbeitgeber beziehungsweise Unfallbetrieb und weitere für das Verfahren benötigte Angaben. Leistungen werden nach den Regeln der Unfallversicherung und der UV-GOÄ abgerechnet.'},
        {type:'heading',title:'Wann zum Durchgangsarzt?'},
        {type:'text',text:'Nach den aktuellen DGUV-Regeln ist eine Vorstellung beim Durchgangsarzt unter anderem erforderlich, wenn die Unfallverletzung über den Unfalltag hinaus zur Arbeitsunfähigkeit führt, die Behandlung voraussichtlich länger als eine Woche dauert, Heil- oder Hilfsmittel notwendig sind oder eine Wiedererkrankung wegen Unfallfolgen vorliegt.'},
        {type:'video',title:'Kurz- und Erklärfilm zum D-Arzt-Verfahren',source:'Deutsche Gesetzliche Unfallversicherung',caption:'Achte darauf, welche Rolle der Durchgangsarzt im Heilverfahren übernimmt.',url:'https://www.dguv.de/landesverbaende/de/med_reha/d-arzt-verfahren/index.jsp'},
        {type:'info',title:'Aktuell',text:'Die UV-GOÄ wurde zum 1. Juli 2026 umfangreich geändert. Für konkrete Abrechnungen immer die aktuell gültige Fassung und die Arbeitshinweise der Unfallversicherungsträger verwenden.'},
      ]
    },
  ],
  questions:[
    {id:1,question:'Welche Aufgabe hat die Haut?',type:'multiple',options:[{id:'a',text:'Schutzbarriere',correct:true},{id:'b',text:'Temperaturregulation',correct:true},{id:'c',text:'Sinneswahrnehmung',correct:true},{id:'d',text:'Blut pumpen'}],explanation:'Die Haut hat Schutz-, Regulations- und Sinnesfunktionen.',points:3},
    {id:2,question:'Was ist für eine Stichwunde typisch?',type:'single',options:[{id:'a',text:'Tiefe kann schwer einzuschätzen sein',correct:true},{id:'b',text:'immer nur oberflächlich'},{id:'c',text:'nie Infektionsrisiko'},{id:'d',text:'keine ärztliche Beurteilung nötig'}],explanation:'Eine kleine Eintrittsstelle kann eine tiefe Verletzung verbergen.',points:2},
    {id:3,question:'Welche Zeichen können auf eine Entzündung hinweisen?',type:'multiple',options:[{id:'a',text:'Rötung',correct:true},{id:'b',text:'Wärme',correct:true},{id:'c',text:'Schwellung',correct:true},{id:'d',text:'Schmerz',correct:true}],explanation:'Das sind klassische Entzündungszeichen.',points:4},
    {id:4,question:'Wann spricht gesund.bund.de bei ausbleibender Heilung von einer chronischen Wunde?',type:'single',options:[{id:'a',text:'nach wenigen Stunden'},{id:'b',text:'wenn sie trotz Behandlung innerhalb von etwa 4 bis 12 Wochen nicht abheilt',correct:true},{id:'c',text:'erst nach 10 Jahren'},{id:'d',text:'jede Schnittwunde ist chronisch'}],explanation:'Chronische Wunden heilen über längere Zeit nicht regelgerecht ab.',points:2},
    {id:5,question:'Was gehört zur Wundbeurteilung?',type:'multiple',options:[{id:'a',text:'Größe und Tiefe',correct:true},{id:'b',text:'Sekret und Blutung',correct:true},{id:'c',text:'Schmerz',correct:true},{id:'d',text:'nur Haarfarbe'}],explanation:'Wundbefund wird systematisch erhoben.',points:3},
    {id:6,question:'Was ist beim sterilen Arbeiten wichtig?',type:'single',options:[{id:'a',text:'sterile und unsterile Bereiche nicht vermischen',correct:true},{id:'b',text:'steriles Material beliebig berühren'},{id:'c',text:'Handschuhe nie wechseln'},{id:'d',text:'Verpackung egal'}],explanation:'Sterilität muss während des gesamten Vorgangs erhalten bleiben.',points:2},
    {id:7,question:'Was ist vor einem kleinen Eingriff zu prüfen?',type:'multiple',options:[{id:'a',text:'Patient und Eingriff',correct:true},{id:'b',text:'Allergien/Medikamente',correct:true},{id:'c',text:'Material',correct:true},{id:'d',text:'Einwilligung',correct:true}],explanation:'Sicherheitsprüfung beginnt vor dem Eingriff.',points:4},
    {id:8,question:'Was ist eine Lokalanästhesie?',type:'single',options:[{id:'a',text:'örtliche Schmerzausschaltung in einem begrenzten Bereich',correct:true},{id:'b',text:'immer Vollnarkose'},{id:'c',text:'ein Verband'},{id:'d',text:'eine Diagnose'}],explanation:'Lokalanästhesie wirkt lokal beziehungsweise regional begrenzt.',points:2},
    {id:9,question:'Wer entscheidet über Wirkstoff und Dosis der Lokalanästhesie?',type:'single',options:[{id:'a',text:'ärztlich nach Präparat und Situation',correct:true},{id:'b',text:'Patient nach Gefühl'},{id:'c',text:'MFA frei ohne Anordnung'},{id:'d',text:'Krankenkasse am Telefon'}],explanation:'Arzneimittelwahl und Dosierung sind ärztlich zu verantworten.',points:2},
    {id:10,question:'Welche Form gehört zum hellen Hautkrebs?',type:'multiple',options:[{id:'a',text:'Basalzellkarzinom',correct:true},{id:'b',text:'Plattenepithelkarzinom',correct:true},{id:'c',text:'Melanom'},{id:'d',text:'Hämatom'}],explanation:'Basal- und Plattenepithelkarzinom werden als heller Hautkrebs bezeichnet.',points:3},
    {id:11,question:'Welche Hautkrebsform kann vergleichsweise früh metastasieren?',type:'single',options:[{id:'a',text:'malignes Melanom',correct:true},{id:'b',text:'jede Narbe'},{id:'c',text:'Schürfwunde'},{id:'d',text:'Warze immer'}],explanation:'Das Melanom hat ein relevantes frühes Metastasierungsrisiko.',points:2},
    {id:12,question:'Was ist bei einer Gewebeprobe besonders wichtig?',type:'single',options:[{id:'a',text:'eindeutige Patient- und Entnahmestellenzuordnung',correct:true},{id:'b',text:'unbeschriftet versenden'},{id:'c',text:'mit anderen Proben mischen'},{id:'d',text:'Auftrag weglassen'}],explanation:'Verwechslung von Gewebeproben muss ausgeschlossen werden.',points:2},
    {id:13,question:'Was ist ein Wegeunfall?',type:'single',options:[{id:'a',text:'ein Unfall im Zusammenhang mit dem versicherten Weg zur oder von der Arbeit unter den gesetzlichen Voraussetzungen',correct:true},{id:'b',text:'jeder private Urlaubsunfall'},{id:'c',text:'nur ein Unfall in der Praxis'},{id:'d',text:'eine Krankheit'}],explanation:'Wegeunfälle gehören grundsätzlich zur gesetzlichen Unfallversicherung, wenn die Voraussetzungen erfüllt sind.',points:2},
    {id:14,question:'Wann ist eine D-Arzt-Vorstellung typischerweise erforderlich?',type:'multiple',options:[{id:'a',text:'Arbeitsunfähigkeit über Unfalltag hinaus',correct:true},{id:'b',text:'Behandlung voraussichtlich länger als eine Woche',correct:true},{id:'c',text:'Heil- oder Hilfsmittel erforderlich',correct:true},{id:'d',text:'Wiedererkrankung wegen Unfallfolgen',correct:true}],explanation:'Diese Kriterien nennt die DGUV.',points:4},
    {id:15,question:'Welche Gebührenordnung ist bei Leistungen der gesetzlichen Unfallversicherung wichtig?',type:'single',options:[{id:'a',text:'UV-GOÄ',correct:true},{id:'b',text:'nur EBM'},{id:'c',text:'StVO'},{id:'d',text:'BBiG'}],explanation:'Unfallversicherungsleistungen werden nach UV-GOÄ abgerechnet.',points:2},
    {id:16,question:'Nenne zwei Punkte der Wunddokumentation.',type:'text',correctAnswer:'größe,tiefe,lokalisation,sekret,blutung,schmerz,verband,material,maßnahme',explanation:'Befund, Maßnahmen und verwendetes Material gehören nachvollziehbar dokumentiert.',points:3},
    {id:17,question:'Was ist bei stärker werdender Rötung, Eiter und Fieber nach einem Eingriff richtig?',type:'single',options:[{id:'a',text:'ärztliche Beurteilung veranlassen',correct:true},{id:'b',text:'ignorieren'},{id:'c',text:'Verband für Wochen nicht öffnen'},{id:'d',text:'Patient allein diagnostizieren lassen'}],explanation:'Zunehmende Infektionszeichen müssen ärztlich beurteilt werden.',points:2},
    {id:18,question:'Warum wird der Tetanusschutz bei Wunden berücksichtigt?',type:'text',correctAnswer:'tetanus,impfschutz,wunde,infektion',explanation:'Wunden können Eintrittspforten für Tetanuserreger sein; der Impfschutz wird nach aktuellen Empfehlungen beurteilt.',points:3},
  ]
};
