import type { LearningModule } from '@/types';

const svg = (content: string) => `data:image/svg+xml;utf8,${encodeURIComponent(content)}`;

const patientJourney = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="500" viewBox="0 0 1000 500"><rect width="1000" height="500" rx="32" fill="#f8fafc"/><text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Patientenreise in der Praxis</text><g font-family="Arial" text-anchor="middle"><rect x="55" y="165" width="160" height="105" rx="20" fill="#ccfbf1"/><text x="135" y="205" font-size="20" font-weight="700">Kontakt</text><text x="135" y="237" font-size="16">Telefon / Online</text><rect x="250" y="165" width="160" height="105" rx="20" fill="#e0f2fe"/><text x="330" y="205" font-size="20" font-weight="700">Empfang</text><text x="330" y="237" font-size="16">freundlich + klar</text><rect x="445" y="165" width="160" height="105" rx="20" fill="#fef3c7"/><text x="525" y="205" font-size="20" font-weight="700">Behandlung</text><text x="525" y="237" font-size="16">Organisation</text><rect x="640" y="165" width="160" height="105" rx="20" fill="#dcfce7"/><text x="720" y="205" font-size="20" font-weight="700">Abschluss</text><text x="720" y="237" font-size="16">Info / Termin</text><rect x="835" y="165" width="120" height="105" rx="20" fill="#ede9fe"/><text x="895" y="205" font-size="20" font-weight="700">Recall</text><text x="895" y="237" font-size="16">Erinnerung</text></g><g stroke="#64748b" stroke-width="4"><path d="M215 217H250M410 217H445M605 217H640M800 217H835"/></g><text x="500" y="385" text-anchor="middle" font-size="23" font-family="Arial" font-weight="700" fill="#0f766e">Marketing beginnt nicht beim Flyer – sondern bei jedem Kontakt.</text></svg>`);

const igelFlow = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="520" viewBox="0 0 1000 520"><rect width="1000" height="520" rx="32" fill="#f8fafc"/><text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">IGeL: transparenter Ablauf</text><g font-family="Arial" text-anchor="middle"><rect x="60" y="170" width="180" height="110" rx="20" fill="#e0f2fe"/><text x="150" y="210" font-size="20" font-weight="700">Wunsch / Angebot</text><text x="150" y="242" font-size="16">medizinisch erklären</text><rect x="285" y="170" width="180" height="110" rx="20" fill="#fef3c7"/><text x="375" y="210" font-size="20" font-weight="700">Kosten klären</text><text x="375" y="242" font-size="16">vorher informieren</text><rect x="510" y="170" width="180" height="110" rx="20" fill="#dcfce7"/><text x="600" y="210" font-size="20" font-weight="700">Vereinbarung</text><text x="600" y="242" font-size="16">schriftlich</text><rect x="735" y="170" width="205" height="110" rx="20" fill="#ede9fe"/><text x="837" y="210" font-size="20" font-weight="700">Leistung + Rechnung</text><text x="837" y="242" font-size="16">GOÄ-basiert</text></g><g stroke="#64748b" stroke-width="4"><path d="M240 225H285M465 225H510M690 225H735"/></g><text x="500" y="385" text-anchor="middle" font-size="22" font-family="Arial" fill="#475569">Patienten dürfen nicht erst nach der Leistung von Kosten überrascht werden.</text></svg>`);

const orgChart = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="540" viewBox="0 0 1000 540"><rect width="1000" height="540" rx="32" fill="#f8fafc"/><text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Aufbauorganisation = Wer? • Ablauforganisation = Wie?</text><g font-family="Arial" text-anchor="middle"><rect x="110" y="130" width="330" height="310" rx="24" fill="#e0f2fe"/><text x="275" y="175" font-size="25" font-weight="700">Aufbauorganisation</text><rect x="195" y="215" width="160" height="60" rx="15" fill="#fff"/><text x="275" y="252" font-size="18">Praxisleitung</text><rect x="135" y="330" width="120" height="55" rx="15" fill="#fff"/><text x="195" y="365" font-size="17">MFA Team</text><rect x="295" y="330" width="120" height="55" rx="15" fill="#fff"/><text x="355" y="365" font-size="17">Abrechnung</text><path d="M275 275V310M275 310H195V330M275 310H355V330" stroke="#64748b" stroke-width="3" fill="none"/><rect x="560" y="130" width="330" height="310" rx="24" fill="#dcfce7"/><text x="725" y="175" font-size="25" font-weight="700">Ablauforganisation</text><text x="725" y="235" font-size="19">Termin → Anmeldung</text><text x="725" y="285" font-size="19">→ Wartezeit → Behandlung</text><text x="725" y="335" font-size="19">→ Dokumentation → Abschluss</text><text x="725" y="385" font-size="19">→ Recall / Nachsorge</text></g></svg>`);

const pdca = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="590" viewBox="0 0 1000 590"><rect width="1000" height="590" rx="32" fill="#f8fafc"/><text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">PDCA – Verbesserung als Kreislauf</text><g font-family="Arial" text-anchor="middle"><circle cx="500" cy="300" r="85" fill="#fff" stroke="#0d9488" stroke-width="5"/><text x="500" y="292" font-size="24" font-weight="700">Qualität</text><text x="500" y="325" font-size="18">immer weiter verbessern</text><rect x="390" y="95" width="220" height="90" rx="20" fill="#e0f2fe"/><text x="500" y="135" font-size="23" font-weight="700">PLAN</text><text x="500" y="162" font-size="16">Ziel + Maßnahme planen</text><rect x="715" y="255" width="220" height="90" rx="20" fill="#dcfce7"/><text x="825" y="295" font-size="23" font-weight="700">DO</text><text x="825" y="322" font-size="16">umsetzen</text><rect x="390" y="420" width="220" height="90" rx="20" fill="#fef3c7"/><text x="500" y="460" font-size="23" font-weight="700">CHECK</text><text x="500" y="487" font-size="16">Ergebnis prüfen</text><rect x="65" y="255" width="220" height="90" rx="20" fill="#fee2e2"/><text x="175" y="295" font-size="23" font-weight="700">ACT</text><text x="175" y="322" font-size="16">anpassen / sichern</text></g><path d="M610 140 C725 150 790 200 810 250M825 345 C800 410 700 455 615 465M385 465 C300 450 200 405 175 350M175 250 C205 180 300 145 385 140" stroke="#64748b" stroke-width="5" fill="none"/></svg>`);

const postFlow = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="500" viewBox="0 0 1000 500"><rect width="1000" height="500" rx="32" fill="#f8fafc"/><text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Postbearbeitung – immer mit Datenschutz</text><g font-family="Arial" text-anchor="middle"><rect x="70" y="170" width="180" height="105" rx="20" fill="#ccfbf1"/><text x="160" y="210" font-size="20" font-weight="700">Empfangen</text><text x="160" y="242" font-size="16">Adressat prüfen</text><rect x="290" y="170" width="180" height="105" rx="20" fill="#e0f2fe"/><text x="380" y="210" font-size="20" font-weight="700">Sortieren</text><text x="380" y="242" font-size="16">Priorität / Zuständigkeit</text><rect x="510" y="170" width="180" height="105" rx="20" fill="#fef3c7"/><text x="600" y="210" font-size="20" font-weight="700">Bearbeiten</text><text x="600" y="242" font-size="16">vollständig dokumentieren</text><rect x="730" y="170" width="200" height="105" rx="20" fill="#dcfce7"/><text x="830" y="210" font-size="20" font-weight="700">Weiterleiten</text><text x="830" y="242" font-size="16">nur an Berechtigte</text></g><g stroke="#64748b" stroke-width="4"><path d="M250 222H290M470 222H510M690 222H730"/></g><text x="500" y="385" text-anchor="middle" font-size="22" font-family="Arial" fill="#475569">Medizinische Informationen sind besonders schützenswert.</text></svg>`);

export const lf7: LearningModule = {
  id: 'lf7',
  number: 7,
  title: 'Organisation, Marketing, IGeL & Qualitätsmanagement',
  subtitle: 'Praxisabläufe, Patientenerlebnis, Selbstzahlerleistungen, Post und QM – visuell und verständlich',
  description: 'Ausführlicher Kurs für Auszubildende ohne Vorwissen. Viele Schaubilder, Praxisfälle, Merksätze und offizielle Vertiefungsquellen zeigen nicht nur Begriffe, sondern wie sie im Praxisalltag zusammenhängen.',
  difficulty: 'medium',
  icon: 'megaphone',
  heroImage: '/images/lf7-hero.jpg',
  topics: [
    {
      id:'marketing', title:'1. Praxismarketing beginnt beim Patientenkontakt', content:[
        {type:'heading',title:'Was ist Praxismarketing?'},
        {type:'text',text:'Praxismarketing bedeutet nicht nur Werbung. Es umfasst alle Maßnahmen, mit denen eine Praxis ihr Leistungsangebot verständlich darstellt, Vertrauen aufbaut und eine gute Patientenbindung unterstützt. Für MFAs ist besonders wichtig: Viele Marketingeffekte entstehen durch Kommunikation, Organisation und Verlässlichkeit.'},
        {type:'image',src:patientJourney,alt:'Patientenreise durch die Praxis',caption:'Jeder Kontaktpunkt beeinflusst, wie eine Praxis wahrgenommen wird.'},
        {type:'heading',title:'Interne und externe Wirkung'},
        {type:'table',headers:['Bereich','Beispiele','Wirkung'],rows:[['Kommunikation','Telefon, Empfang, Erklärungen','Vertrauen und Orientierung'],['Organisation','Wartezeiten, Terminplanung, Rückrufe','Zuverlässigkeit'],['Außenauftritt','Website, Beschilderung, Informationsmaterial','Wiedererkennung'],['Recall','Erinnerung an vereinbarte Vorsorge/Nachsorge','Patientenbindung und Versorgung']]},
        {type:'info',title:'Corporate Identity',text:'Corporate Identity bedeutet ein einheitliches Auftreten der Praxis. Dazu können Logo, Farben, Sprache, Kleidung und Verhaltensgrundsätze gehören.'},
        {type:'warning',title:'Werbung im Gesundheitswesen',text:'Werbung für ärztliche Leistungen unterliegt berufs- und heilmittelwerberechtlichen Grenzen. Für die Prüfung ist wichtig: sachliche Information ist etwas anderes als irreführende, anpreisende oder unzulässige Werbung. Im Berufsalltag immer aktuelle Vorgaben der zuständigen Kammer beachten.'},
      ]
    },
    {
      id:'igel', title:'2. IGeL – Selbstzahlerleistungen sauber erklären', content:[
        {type:'heading',title:'Was bedeutet IGeL?'},
        {type:'text',text:'IGeL steht für Individuelle Gesundheitsleistungen. Gemeint sind ärztliche Leistungen, die nicht zum regulären Leistungsumfang der gesetzlichen Krankenversicherung gehören und deshalb grundsätzlich privat bezahlt werden, wenn Patient und Arzt sie vereinbaren.'},
        {type:'image',src:igelFlow,alt:'Ablauf einer IGeL-Leistung',caption:'Wichtig ist Transparenz vor der Leistung: Nutzen, Alternativen und Kosten müssen nachvollziehbar besprochen werden.'},
        {type:'heading',title:'Was die MFA organisatorisch beachten sollte'},
        {type:'list',items:['Patienten nicht unter Druck setzen.','Kosten vor Durchführung transparent machen.','Schriftliche Vereinbarung vor der Leistung nach Praxisvorgabe sicherstellen.','Leistung und Rechnung nachvollziehbar dokumentieren.','Medizinische Nutzen-Risiko-Aufklärung nicht eigenmächtig anstelle des Arztes übernehmen.']},
        {type:'info',title:'Merksatz',text:'Erst informieren und vereinbaren – dann durchführen – danach korrekt abrechnen.'},
        {type:'video',title:'Vertiefung: IGeL verstehen',text:'Suche dir einen kurzen Überblick zu IGeL und notiere danach: Was zahlt die GKV? Was zahlt der Patient? Welche Rolle spielt die schriftliche Vereinbarung?',source:'Lernvideo-Suche',url:'https://www.youtube.com/results?search_query=IGeL+Leistungen+einfach+erkl%C3%A4rt'},
      ]
    },
    {
      id:'organisation', title:'3. Aufbau- und Ablauforganisation', content:[
        {type:'image',src:orgChart,alt:'Vergleich Aufbauorganisation und Ablauforganisation',caption:'Aufbau = Struktur und Verantwortlichkeiten. Ablauf = Reihenfolge der Arbeitsschritte.'},
        {type:'definition',term:'Aufbauorganisation',definition:'Regelt Rollen, Zuständigkeiten, Hierarchien und Verantwortlichkeiten: Wer macht was und wer entscheidet?'},
        {type:'definition',term:'Ablauforganisation',definition:'Regelt Arbeitsprozesse: In welcher Reihenfolge, zu welchem Zeitpunkt und mit welchen Informationen werden Aufgaben erledigt?'},
        {type:'heading',title:'Stellenbeschreibung'},
        {type:'list',items:['Bezeichnung der Stelle','Aufgaben und Verantwortungsbereiche','Vertretungsregelung','notwendige Kenntnisse/Qualifikationen','Zusammenarbeit und Berichtslinien']},
        {type:'info',title:'Praxisbeispiel',text:'Wenn unklar ist, wer Befunde kontrolliert, ist das ein Problem der Zuständigkeit. Wenn klar ist, wer kontrolliert, aber Befunde trotzdem im falschen Arbeitsschritt liegen bleiben, ist es eher ein Ablaufproblem.'},
      ]
    },
    {
      id:'post', title:'4. Post, Dokumente und vertrauliche Informationen', content:[
        {type:'image',src:postFlow,alt:'Ablauf der Postbearbeitung',caption:'Bei Praxispost kommt neben Organisation immer Datenschutz hinzu.'},
        {type:'heading',title:'Eingehende Post'},
        {type:'list',items:['Adressat und Vertraulichkeit prüfen.','Nach Praxisregel öffnen bzw. ungeöffnet weitergeben.','Eingang und Fristen beachten.','Nach Dringlichkeit/Zuständigkeit sortieren.','An berechtigte Personen weiterleiten und notwendige Schritte dokumentieren.']},
        {type:'heading',title:'Ausgehende Post'},
        {type:'list',items:['Empfänger und Anschrift prüfen.','Unterschriften und Anlagen prüfen.','Datenschutzgerechten Versandweg wählen.','Frist und Versandnachweis bei wichtigen Schreiben beachten.']},
        {type:'warning',title:'Gesundheitsdaten',text:'Befunde, Diagnosen und andere Gesundheitsinformationen sind besonders sensibel. Ein Brief an die falsche Person ist nicht nur ein Organisationsfehler, sondern kann ein Datenschutzproblem sein.'},
      ]
    },
    {
      id:'qm', title:'5. Qualitätsmanagement und PDCA', content:[
        {type:'heading',title:'Warum gibt es QM?'},
        {type:'text',text:'Qualitätsmanagement soll Abläufe planbar, sicher und verbesserbar machen. Es geht nicht darum, möglichst viele Ordner zu füllen, sondern Fehlerquellen zu erkennen, Verantwortlichkeiten zu klären und Qualität systematisch weiterzuentwickeln.'},
        {type:'image',src:pdca,alt:'PDCA Kreislauf',caption:'PDCA ist kein einmaliges Projekt. Nach ACT beginnt die nächste Verbesserungsrunde.'},
        {type:'table',headers:['Phase','Leitfrage','Praxisbeispiel'],rows:[['PLAN','Was soll besser werden?','Wartezeit reduzieren'],['DO','Was setzen wir um?','neue Terminblöcke testen'],['CHECK','Hat es funktioniert?','Wartezeiten vergleichen'],['ACT','Was übernehmen/ändern wir?','gute Lösung standardisieren']]},
        {type:'info',title:'Aktueller Praxisbezug',text:'Die QM-Richtlinie des Gemeinsamen Bundesausschusses beschreibt Anforderungen an ein einrichtungsinternes Qualitätsmanagement. Die KBV nennt den PDCA-Zyklus ausdrücklich als Methode zur systematischen Verbesserung.'},
        {type:'video',title:'Offizielle Vertiefung: Qualitätsmanagement in der Praxis',text:'Nutze die KBV-Seite als Vertiefungsquelle. Suche dort besonders den Abschnitt Plan-Do-Check-Act und übertrage ihn auf einen eigenen Praxisablauf.',source:'KBV',url:'https://www.kbv.de/praxis/qualitaet/qualitaetsmanagement'},
        {type:'heading',title:'Fehler- und Risikomanagement'},
        {type:'text',text:'Fehler sollten nicht nur einzelnen Personen zugeschrieben werden. Im QM wird untersucht, warum ein Fehler möglich war: War eine Anleitung unklar? Fehlte eine Kontrolle? War der Ablauf zu kompliziert? Ziel ist, Wiederholungen zu verhindern.'},
        {type:'info',title:'SMART-Ziele',text:'Ein gutes Qualitätsziel sollte konkret und überprüfbar sein. Beispiel: „Bis Ende Oktober sollen 90 % der Laborbefunde am selben Arbeitstag ärztlich gesichtet sein“ ist prüfbarer als „Befunde schneller bearbeiten“.'},
      ]
    },
    {
      id:'cases', title:'6. Praxisfälle zum Anwenden', content:[
        {type:'heading',title:'Fall A – lange Wartezeiten'},
        {type:'text',text:'Patienten beschweren sich über lange Wartezeiten. Formuliere einen vollständigen PDCA-Zyklus: PLAN = Ziel und Ursache klären, DO = eine Maßnahme testen, CHECK = Wartezeiten messen, ACT = Entscheidung treffen.'},
        {type:'heading',title:'Fall B – IGeL am Empfang'},
        {type:'text',text:'Eine Patientin erfährt erst nach einer Zusatzuntersuchung, dass sie die Kosten selbst tragen soll. Erkläre, an welcher Stelle der Ablauf verbessert werden muss und warum Transparenz vor der Leistung wichtig ist.'},
        {type:'heading',title:'Fall C – Befund landet falsch'},
        {type:'text',text:'Ein wichtiger Befund wird versehentlich in das falsche Fach gelegt. Ordne: Aufbauproblem, Ablaufproblem oder beides? Welche QM-Maßnahme könnte verhindern, dass so etwas wieder passiert?'},
      ]
    },
  ],
  questions:[
    {id:1,question:'Was beschreibt Praxismarketing am besten?',type:'single',options:[{id:'a',text:'nur bezahlte Werbung'},{id:'b',text:'alle Maßnahmen, die Außenwirkung, Vertrauen und Patientenbindung beeinflussen',correct:true},{id:'c',text:'nur das Praxislogo'},{id:'d',text:'nur den Umsatz'}],explanation:'Praxismarketing umfasst deutlich mehr als Werbung.',points:2},
    {id:2,question:'Was ist ein Recall?',type:'single',options:[{id:'a',text:'eine Erinnerung an vereinbarte Termine/Vorsorge',correct:true},{id:'b',text:'eine Kündigung'},{id:'c',text:'eine Rechnung'},{id:'d',text:'eine Diagnose'}],explanation:'Recall-Systeme erinnern Patienten an fällige Leistungen oder Termine.',points:2},
    {id:3,question:'Wofür steht IGeL?',type:'single',options:[{id:'a',text:'Individuelle Gesundheitsleistungen',correct:true},{id:'b',text:'Interne Gesetzesliste'},{id:'c',text:'Integrierte Gesundheits-Laborwerte'},{id:'d',text:'Impf-Gesetzliche Leistung'}],explanation:'IGeL = Individuelle Gesundheitsleistungen.',points:2},
    {id:4,question:'Was sollte vor einer IGeL-Leistung geklärt sein?',type:'multiple',options:[{id:'a',text:'Kosten',correct:true},{id:'b',text:'Vereinbarung',correct:true},{id:'c',text:'welche Leistung gemeint ist',correct:true},{id:'d',text:'Überraschungsrechnung erst danach'}],explanation:'Transparenz und Vereinbarung gehören vor die Leistung.',points:3},
    {id:5,question:'Was zeigt die Aufbauorganisation?',type:'single',options:[{id:'a',text:'Wer wofür zuständig ist',correct:true},{id:'b',text:'nur die Uhrzeit'},{id:'c',text:'nur die Postgebühr'},{id:'d',text:'den Blutdruck'}],explanation:'Aufbauorganisation beschreibt Struktur und Zuständigkeit.',points:2},
    {id:6,question:'Was zeigt die Ablauforganisation?',type:'single',options:[{id:'a',text:'Wie Prozesse nacheinander ablaufen',correct:true},{id:'b',text:'nur die Hierarchie'},{id:'c',text:'nur das Organigramm'},{id:'d',text:'nur die Gehaltsstufe'}],explanation:'Ablauforganisation beschreibt Prozesse.',points:2},
    {id:7,question:'Welche Reihenfolge ist beim PDCA-Zyklus korrekt?',type:'single',options:[{id:'a',text:'Plan – Do – Check – Act',correct:true},{id:'b',text:'Do – Plan – Act – Check'},{id:'c',text:'Check – Act – Plan – Stop'},{id:'d',text:'Plan – Act – Do – End'}],explanation:'PDCA = Plan, Do, Check, Act.',points:2},
    {id:8,question:'Was passiert in CHECK?',type:'single',options:[{id:'a',text:'Ergebnis wird überprüft',correct:true},{id:'b',text:'Maßnahme wird ohne Prüfung beendet'},{id:'c',text:'nur geplant'},{id:'d',text:'nur Werbung gemacht'}],explanation:'CHECK prüft, ob das Ziel erreicht wurde.',points:2},
    {id:9,question:'Was passiert in ACT?',type:'single',options:[{id:'a',text:'Erkenntnisse werden in Verbesserung/Standard überführt',correct:true},{id:'b',text:'es wird nur gemessen'},{id:'c',text:'es wird nur geplant'},{id:'d',text:'es wird nichts geändert'}],explanation:'ACT bedeutet anpassen, verbessern und gute Lösungen sichern.',points:2},
    {id:10,question:'Welche Aussage zu QM ist richtig?',type:'single',options:[{id:'a',text:'QM ist einmalig'},{id:'b',text:'QM ist ein kontinuierlicher Verbesserungsprozess',correct:true},{id:'c',text:'QM betrifft nur Ärzte'},{id:'d',text:'QM dient nur Werbung'}],explanation:'QM wird fortlaufend weiterentwickelt.',points:2},
    {id:11,question:'Warum ist falsche Weiterleitung eines Befundes kritisch?',type:'multiple',options:[{id:'a',text:'Versorgungsablauf kann gestört werden',correct:true},{id:'b',text:'Gesundheitsdaten können unberechtigt offengelegt werden',correct:true},{id:'c',text:'Fristen können verloren gehen',correct:true},{id:'d',text:'es ist immer bedeutungslos'}],explanation:'Organisation und Datenschutz hängen bei Praxispost eng zusammen.',points:3},
    {id:12,question:'Was gehört in eine Stellenbeschreibung?',type:'multiple',options:[{id:'a',text:'Aufgaben',correct:true},{id:'b',text:'Verantwortlichkeiten',correct:true},{id:'c',text:'Qualifikationen',correct:true},{id:'d',text:'private Lieblingsmusik'}],explanation:'Eine Stellenbeschreibung konkretisiert Rolle und Anforderungen.',points:3},
    {id:13,question:'Was ist ein gutes SMART-nahes Qualitätsziel?',type:'single',options:[{id:'a',text:'Alles soll besser werden'},{id:'b',text:'Bis Ende Oktober werden 90 % der Befunde am selben Tag gesichtet',correct:true},{id:'c',text:'Irgendwann weniger Fehler'},{id:'d',text:'Mitarbeitende sollen sich bemühen'}],explanation:'Ein Ziel sollte konkret und messbar sein.',points:3},
    {id:14,question:'Eine Praxis testet neue Terminblöcke. Welche PDCA-Phase ist das?',type:'single',options:[{id:'a',text:'PLAN'},{id:'b',text:'DO',correct:true},{id:'c',text:'CHECK'},{id:'d',text:'ACT'}],explanation:'DO = geplante Maßnahme umsetzen.',points:2},
    {id:15,question:'Die Praxis vergleicht Wartezeiten vor und nach einer Maßnahme. Welche Phase?',type:'single',options:[{id:'a',text:'PLAN'},{id:'b',text:'DO'},{id:'c',text:'CHECK',correct:true},{id:'d',text:'ACT'}],explanation:'CHECK = Ergebnis messen und bewerten.',points:2},
    {id:16,question:'Erkläre den Unterschied zwischen Aufbau- und Ablauforganisation.',type:'text',correctAnswer:'wer,wie,zuständigkeit,prozess',explanation:'Aufbau = wer was macht; Ablauf = wie die Arbeitsschritte ablaufen.',points:4},
    {id:17,question:'Nenne zwei Kontaktpunkte, an denen Patientenzufriedenheit beeinflusst wird.',type:'text',correctAnswer:'telefon,empfang,wartezeit,behandlung,termin,recall',explanation:'Zum Beispiel Telefon, Empfang, Terminvergabe, Wartezeit, Behandlung, Abschluss und Recall.',points:3},
    {id:18,question:'Was ist bei einem Fehler im QM der sinnvollste Ansatz?',type:'single',options:[{id:'a',text:'nur Schuldige suchen'},{id:'b',text:'Ursachen im System und Ablauf analysieren und Verbesserungen ableiten',correct:true},{id:'c',text:'Fehler verstecken'},{id:'d',text:'Dokumentation löschen'}],explanation:'Fehlermanagement soll aus Fehlern lernen und Wiederholungen verhindern.',points:3},
  ],
};
