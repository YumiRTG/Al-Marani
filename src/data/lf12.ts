import type { LearningModule } from '@/types';
import { compareVisual, cycleVisual, heroVisual, processVisual } from './visualKit';

const career = processVisual('Berufliche Entwicklung planen', [
  { title:'Standort', text:'Was kann ich bereits? Welche Aufgaben liegen mir?' },
  { title:'Ziel', text:'Fachgebiet, Verantwortung, Arbeitszeit und Entwicklung festlegen' },
  { title:'Qualifikation', text:'Fortbildung, Weiterbildung oder Studium vergleichen' },
  { title:'Umsetzung', text:'Zeit, Kosten, Förderung und Arbeitgebergespräch planen' },
  { title:'Überprüfen', text:'Ziele regelmäßig an neue Erfahrungen anpassen' },
], 'Berufliche Entwicklung ist ein fortlaufender Prozess.');

const contract = processVisual('Vom Stellenangebot zum Arbeitsverhältnis', [
  { title:'Stelle prüfen', text:'Aufgaben, Stunden, Ort, Verantwortung und Anforderungen' },
  { title:'Bewerben', text:'Anschreiben, Lebenslauf, Zeugnisse und Qualifikationen' },
  { title:'Gespräch', text:'Motivation, Erfahrung, Arbeitsbedingungen und Fragen klären' },
  { title:'Vertrag prüfen', text:'Entgelt, Arbeitszeit, Urlaub, Probezeit, Kündigung und Tarifbezug' },
  { title:'Start', text:'Einarbeitung, Zuständigkeiten, Datenschutz und Arbeitsschutz' },
]);

const worklaw = compareVisual('Gesetzlicher Mindestschutz und Tarifvertrag', [
  { title:'Gesetz', lines:['Arbeitszeit und Ruhezeiten','bezahlter Mindesturlaub','Entgeltfortzahlung bei Krankheit','Kündigungs- und Schutzvorschriften','Anspruch auf Arbeitszeugnis'] },
  { title:'Tarif / Vertrag', lines:['kann günstigere Arbeitsbedingungen regeln','MFA-Tarife nicht allgemeinverbindlich','Geltung bei Tarifbindung oder vertraglicher Bezugnahme','Entgeltgruppen und Berufsjahre','zusätzliche Urlaubs-/Sonderregelungen möglich'] },
]);

const social = cycleVisual('Fünf Zweige der Sozialversicherung', [
  { title:'Kranken', text:'Behandlung und Krankengeld' },
  { title:'Pflege', text:'Absicherung bei Pflegebedürftigkeit' },
  { title:'Rente', text:'Alter, Erwerbsminderung und Reha' },
  { title:'Arbeitslosigkeit', text:'Arbeitsförderung und Arbeitslosengeld' },
  { title:'Unfall', text:'Arbeits- und Wegeunfälle, Berufskrankheiten' },
]);

const payroll = processVisual('Vom Brutto zum Auszahlungsbetrag', [
  { title:'Bruttoentgelt', text:'vertragliches Arbeitsentgelt plus ggf. Zuschläge' },
  { title:'Steuern', text:'Lohnsteuer und ggf. weitere steuerliche Abzüge' },
  { title:'Sozialversicherung', text:'Arbeitnehmeranteile zu KV, PV, RV und AV' },
  { title:'Weitere Positionen', text:'z. B. bAV, Sachbezüge oder individuelle Abzüge' },
  { title:'Netto/Auszahlung', text:'Betrag nach den ausgewiesenen Abzügen' },
], 'Eine Entgeltabrechnung wird Position für Position geprüft, nicht nur am Nettobetrag.');

const retirement = compareVisual('Drei Säulen der Altersvorsorge', [
  { title:'Gesetzlich', lines:['gesetzliche Rentenversicherung','Pflichtversicherung für viele Beschäftigte','Alters- und Erwerbsminderungsschutz','Rehabilitation als weitere Leistung'] },
  { title:'Betrieblich', lines:['Altersversorgung über Arbeitgeber','Entgeltumwandlung möglich','bei MFA eigener Tarifvertrag möglich','Vertragsbedingungen prüfen'] },
  { title:'Privat', lines:['individuelle zusätzliche Vorsorge','Kosten, Risiko und Flexibilität vergleichen','langfristige Planung','keine pauschale Lösung für alle'] },
]);

const stress = cycleVisual('Selbstmanagement im Berufsalltag', [
  { title:'Priorisieren', text:'wichtig und dringend unterscheiden' },
  { title:'Kommunizieren', text:'Kapazitätsprobleme früh ansprechen' },
  { title:'Pausen', text:'Erholung und gesetzliche Regeln beachten' },
  { title:'Grenzen', text:'Zuständigkeiten und Belastbarkeit kennen' },
  { title:'Reflektieren', text:'Fehler und Stressauslöser auswerten' },
]);

export const lf12: LearningModule = {
  id:'lf12', number:12,
  title:'Berufliche Perspektiven entwickeln',
  subtitle:'Arbeitsvertrag, Tarif, Arbeitszeit, Urlaub, Krankheit, Arbeitszeugnis, Sozialversicherung, Entgeltabrechnung, Altersvorsorge, Bewerbung, Weiterbildung und Selbstmanagement',
  description:'Der Übergang von Ausbildung zu Berufsleben: Arbeitsbedingungen verstehen, Gehaltsabrechnungen prüfen, Bewerbungen professionell gestalten und die eigene Entwicklung planen.',
  difficulty:'medium', icon:'briefcase',
  heroImage:heroVisual(12,'Berufliche Perspektiven','Arbeitsrecht · Karriere · Finanzen · Weiterbildung'),
  topics:[
    {
      id:'perspektiven', title:'1. Eigene Stärken und berufliche Ziele entwickeln', content:[
        {type:'heading',title:'Nach der Ausbildung beginnt die berufliche Entwicklung erst richtig'},
        {type:'text',text:'MFA können in Haus- und Facharztpraxen, Medizinischen Versorgungszentren, Kliniken, betriebsärztlichen Diensten und weiteren Einrichtungen tätig werden. Berufliche Entwicklung kann fachliche Spezialisierung, Praxisorganisation, Qualitätsmanagement, Abrechnung, Studien- oder Fortbildungswege oder einen Wechsel in andere Bereiche des Gesundheitswesens bedeuten.'},
        {type:'image',src:career,alt:'Berufliche Entwicklung planen',caption:'Ziele werden aus den eigenen Stärken, Interessen und Rahmenbedingungen entwickelt.'},
        {type:'heading',title:'Kompetenzprofil statt nur Jobtitel'},
        {type:'list',items:['medizinische Assistenz und Patientensicherheit','Kommunikation und Patientenbetreuung','Hygiene und Qualitätsmanagement','Praxisorganisation und Terminsteuerung','Abrechnung und Verwaltung','digitale Anwendungen und Datenschutz','Teamarbeit und Anleitung','fachgebietsspezifische Kenntnisse']},
        {type:'video',title:'Berufsberatung im Erwerbsleben',source:'Bundesagentur für Arbeit',caption:'Informiere dich über Beratung zu Weiterbildung, beruflichem Aufstieg, Wiedereinstieg und Berufswechsel.',url:'https://www.arbeitsagentur.de/karriere-und-weiterbildung/berufsberatung-im-erwerbsleben'},
      ]
    },
    {
      id:'bewerbung', title:'2. Stellenanalyse, Bewerbung und Vorstellungsgespräch', content:[
        {type:'heading',title:'Eine gute Bewerbung beginnt mit der Stellenanalyse'},
        {type:'image',src:contract,alt:'Vom Stellenangebot zum Arbeitsverhältnis',caption:'Jeder Schritt baut auf dem vorherigen auf.'},
        {type:'text',text:'Vor dem Anschreiben wird die Stellenanzeige zerlegt: Welche Aufgaben sind zentral? Welche Qualifikationen werden verlangt? Was ist Muss- und was Kann-Anforderung? Gute Bewerbungsunterlagen zeigen konkret, welche bisherigen Erfahrungen zu diesen Anforderungen passen.'},
        {type:'heading',title:'Bewerbungsunterlagen'},
        {type:'table',headers:['Dokument','Zweck'],rows:[['Anschreiben','Motivation und passgenaue Verbindung zwischen Stelle und eigener Erfahrung'],['Lebenslauf','übersichtlicher beruflicher und schulischer Verlauf mit relevanten Kenntnissen'],['Zeugnisse/Bescheinigungen','Qualifikationen und bisherige Leistungen belegen'],['weitere Anlagen','nur wenn relevant oder gefordert']]},
        {type:'video',title:'Bewerbungsunterlagen: Das gehört rein',source:'Bundesagentur für Arbeit',caption:'Im Video werden Anschreiben, Lebenslauf und Zeugnisse als zentrale Bewerbungsunterlagen erklärt.',url:'https://www.arbeitsagentur.de/bildung/bewerbung/bewerbungsunterlagen'},
        {type:'heading',title:'Vorstellungsgespräch'},
        {type:'text',text:'Im Gespräch sollte die Bewerberin ihren Lebenslauf frei erklären, die Motivation für genau diese Praxis begründen und eigene Fragen vorbereiten. Sinnvolle Fragen betreffen zum Beispiel Einarbeitung, Aufgaben, Team, Arbeitszeit, Fortbildung, Zuständigkeiten und Entwicklungsmöglichkeiten.'},
        {type:'video',title:'Das Vorstellungsgespräch: Alles, was du wissen musst',source:'Bundesagentur für Arbeit',caption:'Achte auf die Phasen Begrüßung, Fragen, eigene Fragen und Verabschiedung.',url:'https://www.arbeitsagentur.de/bildung/bewerbung/bewerbungsgespraech'},
      ]
    },
    {
      id:'arbeitsvertrag', title:'3. Arbeitsvertrag, Tarifvertrag und Arbeitszeugnis', content:[
        {type:'heading',title:'Arbeitsbedingungen nicht nur über das Gehalt beurteilen'},
        {type:'image',src:worklaw,alt:'Gesetzlicher Schutz und Tarifvertrag',caption:'Gesetze setzen Mindeststandards; Tarif- und Arbeitsverträge können weitere Bedingungen regeln.'},
        {type:'heading',title:'Wichtige Vertragsinhalte'},
        {type:'list',items:['Tätigkeit und Arbeitsort','Beginn und gegebenenfalls Befristung','Arbeitszeit und Verteilung','Entgelt, Zuschläge und Fälligkeit','Probezeit','Urlaub','Kündigungsfristen','Hinweis auf anwendbare Tarifverträge/Betriebsvereinbarungen','Fortbildungs- oder Zusatzvereinbarungen, wenn vorhanden']},
        {type:'heading',title:'MFA-Tarifverträge'},
        {type:'text',text:'Für MFA werden bundesweite Tarifverträge zwischen der Arbeitsgemeinschaft ärztlicher Arbeitgeberinnen und Arbeitgeber von Medizinischen Fachangestellten (AAA) und dem Verband medizinischer Fachberufe (vmf) geschlossen. Sie sind nicht allgemeinverbindlich. Sie gelten unmittelbar bei entsprechender Tarifbindung oder wenn im Arbeitsvertrag auf sie Bezug genommen wird.'},
        {type:'info',title:'Stand 2026',text:'Der aktuelle Gehalts- und Manteltarifvertrag gilt seit 1. Januar 2025. Die Gehaltstabelle enthält 2026 weitere Steigerungen. Der tarifliche Urlaub beträgt nach der aktuellen Vereinbarung 29 Arbeitstage beziehungsweise 31 Arbeitstage nach Vollendung des 55. Lebensjahres.'},
        {type:'video',title:'MFA-Tarife',source:'Bundesärztekammer',caption:'Öffne Gehalts-, Mantel- und bAV-Tarif und prüfe, wann ein Tarifvertrag tatsächlich auf ein Arbeitsverhältnis anwendbar ist.',url:'https://www.bundesaerztekammer.de/themen/gesundheitsfachberufe/mfa-tarife'},
        {type:'heading',title:'Arbeitszeugnis'},
        {type:'text',text:'Nach § 109 Gewerbeordnung besteht bei Beendigung des Arbeitsverhältnisses Anspruch auf ein schriftliches Zeugnis. Das einfache Zeugnis nennt Art und Dauer der Tätigkeit. Auf Verlangen umfasst ein qualifiziertes Zeugnis zusätzlich Leistung und Verhalten. Das Zeugnis muss klar und verständlich formuliert sein und darf keine versteckten Merkmale enthalten, die eine andere Aussage transportieren sollen.'},
      ]
    },
    {
      id:'arbeitsrecht', title:'4. Arbeitszeit, Pausen, Urlaub und Krankheit', content:[
        {type:'heading',title:'Arbeitszeitgesetz für erwachsene Beschäftigte'},
        {type:'table',headers:['Regel','Gesetzlicher Grundsatz'],rows:[['Werktägliche Arbeitszeit','8 Stunden; Verlängerung bis 10 Stunden mit vorgeschriebenem Ausgleich möglich'],['Pause bei >6 bis 9 Stunden','mindestens 30 Minuten'],['Pause bei >9 Stunden','mindestens 45 Minuten'],['Pausenabschnitt','mindestens 15 Minuten'],['Ruhezeit nach Arbeitsende','grundsätzlich mindestens 11 Stunden']]},
        {type:'text',text:'Tarifverträge und besondere gesetzliche Ausnahmen können innerhalb des rechtlichen Rahmens abweichende Regelungen ermöglichen. Bei mehreren Arbeitsverhältnissen werden Arbeitszeiten nach dem Arbeitszeitgesetz grundsätzlich zusammengerechnet.'},
        {type:'heading',title:'Urlaub'},
        {type:'text',text:'Das Bundesurlaubsgesetz garantiert jährlich mindestens 24 Werktage Erholungsurlaub. Da das Gesetz von einer Sechs-Tage-Woche ausgeht, entspricht dies bei einer regelmäßigen Fünf-Tage-Woche rechnerisch 20 Arbeitstagen. Tarif- oder Arbeitsvertrag können einen höheren Anspruch geben.'},
        {type:'heading',title:'Entgeltfortzahlung im Krankheitsfall'},
        {type:'text',text:'Bei unverschuldeter Arbeitsunfähigkeit besteht nach vierwöchiger ununterbrochener Dauer des Arbeitsverhältnisses grundsätzlich Anspruch auf Entgeltfortzahlung durch den Arbeitgeber bis zu sechs Wochen. Bei wiederholter Erkrankung gelten zusätzliche Regeln, insbesondere wenn dieselbe Krankheit erneut zur Arbeitsunfähigkeit führt.'},
        {type:'warning',title:'Krankmeldung und Nachweis'},
        {type:'text',text:'Arbeitsunfähigkeit muss dem Arbeitgeber unverzüglich mitgeteilt werden. Welche Nachweise wann erforderlich sind, richtet sich nach Gesetz, elektronischem AU-Verfahren und den betrieblichen Regelungen. Die Mitteilungspflicht verschwindet durch die eAU nicht.'},
      ]
    },
    {
      id:'sozialversicherung', title:'5. Sozialversicherung und Absicherung', content:[
        {type:'heading',title:'Sozialversicherung schützt unterschiedliche Lebensrisiken'},
        {type:'image',src:social,alt:'Fünf Zweige der Sozialversicherung',caption:'Kranken-, Pflege-, Renten-, Arbeitslosen- und Unfallversicherung erfüllen unterschiedliche Aufgaben.'},
        {type:'table',headers:['Zweig','Beispiele für Leistungen'],rows:[['Krankenversicherung','medizinische Behandlung und unter Voraussetzungen Krankengeld'],['Pflegeversicherung','Leistungen bei Pflegebedürftigkeit'],['Rentenversicherung','Altersrente, Erwerbsminderungsrente, Rehabilitation'],['Arbeitslosenversicherung/Arbeitsförderung','Arbeitslosengeld, Vermittlung und Förderleistungen'],['Unfallversicherung','Arbeits-/Wegeunfälle, Berufskrankheiten, Rehabilitation']]},
        {type:'heading',title:'Solidarprinzip'},
        {type:'text',text:'Die Sozialversicherung verteilt bestimmte Lebensrisiken auf eine Versichertengemeinschaft. Die Finanzierung und konkrete Beitragshöhe unterscheiden sich je Versicherungszweig und können sich gesetzlich verändern. Deshalb werden für konkrete Abrechnungen aktuelle Beitragssätze verwendet und nicht aus einem alten Lernzettel übernommen.'},
        {type:'video',title:'Unsere Sozialversicherung',source:'Deutsche Rentenversicherung',caption:'Die kostenlose DRV-Unterrichtsbroschüre erklärt alle fünf Zweige mit Grafiken und Beispielen.',url:'https://www.deutsche-rentenversicherung.de/SharedDocs/Downloads/DE/Broschueren/national/unsere_sozialversicherung.html'},
      ]
    },
    {
      id:'entgelt', title:'6. Entgeltabrechnung, Steuern und persönliche Finanzen', content:[
        {type:'heading',title:'Brutto ist nicht Netto'},
        {type:'image',src:payroll,alt:'Vom Brutto zum Netto',caption:'Eine Gehaltsabrechnung zeigt Entgeltbestandteile, gesetzliche Abzüge und den Auszahlungsbetrag.'},
        {type:'heading',title:'Was auf der Abrechnung geprüft wird'},
        {type:'list',items:['Abrechnungsmonat und persönliche Daten','Bruttoentgelt und gegebenenfalls Zuschläge','Steuermerkmale und steuerliche Abzüge','Sozialversicherungsbeiträge','Arbeitszeit-/Fehlzeitbezug, soweit ausgewiesen','betriebliche Altersversorgung oder weitere vereinbarte Positionen','Netto und tatsächlicher Auszahlungsbetrag']},
        {type:'warning',title:'Steuer- und Beitragssätze ändern sich',text:'Für Übungen kann ein vorgegebener Satz verwendet werden. Im echten Berufsleben immer mit aktuellen gesetzlichen Werten und der konkreten Abrechnung arbeiten.'},
        {type:'heading',title:'Bankkonto, Rücklagen und Kredite'},
        {type:'text',text:'Ein Girokonto dient dem laufenden Zahlungsverkehr. Rücklagen helfen, unerwartete Ausgaben ohne teuren Kredit zu bewältigen. Bei Krediten werden nicht nur Monatsrate, sondern effektiver Jahreszins, Gesamtkosten, Laufzeit und Kündigungsbedingungen verglichen. Dispokredite sind flexibel, können aber hohe Zinsen verursachen.'},
      ]
    },
    {
      id:'vorsorge', title:'7. Altersvorsorge und betriebliche Altersversorgung', content:[
        {type:'heading',title:'Altersvorsorge besteht aus mehreren Bausteinen'},
        {type:'image',src:retirement,alt:'Drei Säulen der Altersvorsorge',caption:'Gesetzliche, betriebliche und private Vorsorge können sich ergänzen.'},
        {type:'video',title:'Die drei Säulen der Altersvorsorge',source:'Deutsche Rentenversicherung',caption:'Das Erklärvideo zeigt, wie gesetzliche Rente, Betriebsrente und private Vorsorge zusammenspielen.',url:'https://www.deutsche-rentenversicherung.de/SharedDocs/Videos/DE/Traeger/Westfalen/rentenblicker_video.html'},
        {type:'heading',title:'Betriebliche Altersversorgung bei MFA'},
        {type:'text',text:'Für MFA existiert ein eigener Tarifvertrag zur betrieblichen Altersversorgung und Entgeltumwandlung. Ob und in welchem Umfang dieser im konkreten Arbeitsverhältnis gilt, hängt von Tarifbindung beziehungsweise vertraglicher Einbeziehung und den individuellen Voraussetzungen ab.'},
        {type:'info',title:'Berufsanfänger früh informieren',text:'Die Deutsche Rentenversicherung weist darauf hin, dass gesetzliche Rentenversicherung nicht nur Altersrente umfasst, sondern unter anderem auch Rehabilitation und Schutz bei Erwerbsminderung. Ergänzende Vorsorge sollte anhand persönlicher Ziele, Kosten und Risiken geprüft werden.'},
      ]
    },
    {
      id:'weiterbildung-stress', title:'8. Weiterbildung, Selbstmanagement und gesundes Arbeiten', content:[
        {type:'heading',title:'Lebenslanges Lernen gehört zum Gesundheitsberuf'},
        {type:'text',text:'Medizin, Digitalisierung, Abrechnung und rechtliche Vorgaben verändern sich. Fortbildungen halten vorhandenes Wissen aktuell; umfangreichere Weiterbildungen können neue Aufgaben- und Verantwortungsbereiche eröffnen. Bei der Auswahl werden Ziel, anerkannter Abschluss, Zeitaufwand, Kosten, Förderung und Nutzen für die gewünschte Tätigkeit verglichen.'},
        {type:'video',title:'Berufsberatung im Erwerbsleben',source:'Bundesagentur für Arbeit',caption:'Nutze die Beratung und mein NOW zur Suche nach Weiterbildung, Förderung und beruflichen Entwicklungsmöglichkeiten.',url:'https://www.arbeitsagentur.de/karriere-und-weiterbildung/berufsberatung-im-erwerbsleben'},
        {type:'image',src:stress,alt:'Selbstmanagement im Berufsalltag',caption:'Gute Selbstorganisation schützt vor Fehlern und dauerhafter Überlastung.'},
        {type:'heading',title:'Stress erkennen und professionell reagieren'},
        {type:'text',text:'Kurzfristiger Stress kann Aufmerksamkeit erhöhen, dauerhafte Überlastung kann Gesundheit und Arbeitsqualität beeinträchtigen. Warnzeichen können zum Beispiel Schlafprobleme, Gereiztheit, Konzentrationsabfall, ständige Erschöpfung oder häufige Fehler sein. Belastung sollte frühzeitig angesprochen und organisatorisch bearbeitet werden.'},
        {type:'list',items:['realistische Prioritäten setzen','Pausen und Erholung ernst nehmen','Unterbrechungen bündeln, wenn möglich','Aufgaben und Zuständigkeiten klar verteilen','bei Überlastung rechtzeitig kommunizieren','Fortbildung und Einarbeitung für neue Aufgaben einfordern','professionelle Hilfe nutzen, wenn Belastung dauerhaft gesundheitlich beeinträchtigt']},
      ]
    },
  ],
  questions:[
    {id:1,question:'Was ist der erste Schritt einer beruflichen Entwicklungsplanung?',type:'single',options:[{id:'a',text:'eigene Stärken, Interessen und Ausgangslage klären',correct:true},{id:'b',text:'zufällig irgendeine Weiterbildung buchen'},{id:'c',text:'nur Gehalt ansehen'},{id:'d',text:'nichts verändern'}],explanation:'Ein sinnvolles Ziel braucht eine klare Ausgangslage.',points:2},
    {id:2,question:'Welche Unterlagen gehören typischerweise in eine Bewerbung?',type:'multiple',options:[{id:'a',text:'Anschreiben',correct:true},{id:'b',text:'Lebenslauf',correct:true},{id:'c',text:'relevante Zeugnisse',correct:true},{id:'d',text:'private Chatverläufe'}],explanation:'Diese Unterlagen bilden die klassische Bewerbung.',points:3},
    {id:3,question:'Was sollte man für ein Vorstellungsgespräch vorbereiten?',type:'multiple',options:[{id:'a',text:'eigene Motivation',correct:true},{id:'b',text:'Lebenslauf',correct:true},{id:'c',text:'Informationen zum Arbeitgeber',correct:true},{id:'d',text:'eigene Fragen',correct:true}],explanation:'Vorbereitung macht Antworten konkreter und zeigt echtes Interesse.',points:4},
    {id:4,question:'Wann gelten die bundesweiten MFA-Tarifverträge zwingend beziehungsweise vertraglich?',type:'single',options:[{id:'a',text:'immer für jede Praxis automatisch'},{id:'b',text:'bei Tarifbindung oder entsprechender Bezugnahme im Arbeitsvertrag',correct:true},{id:'c',text:'nie'},{id:'d',text:'nur im Krankenhaus'}],explanation:'Die MFA-Tarifverträge sind nicht allgemeinverbindlich.',points:2},
    {id:5,question:'Wie hoch ist der tarifliche Urlaubsanspruch nach aktueller MFA-Tarifregelung grundsätzlich?',type:'single',options:[{id:'a',text:'10 Arbeitstage'},{id:'b',text:'29 Arbeitstage',correct:true},{id:'c',text:'100 Arbeitstage'},{id:'d',text:'kein Urlaub'}],explanation:'Aktuell sind tariflich grundsätzlich 29 Arbeitstage vorgesehen; ab Vollendung 55 Jahre 31.',points:2},
    {id:6,question:'Was ist ein qualifiziertes Arbeitszeugnis?',type:'single',options:[{id:'a',text:'es enthält zusätzlich Angaben zu Leistung und Verhalten',correct:true},{id:'b',text:'es nennt nur die Adresse'},{id:'c',text:'es ist eine Gehaltsabrechnung'},{id:'d',text:'es ist geheim codiert erlaubt'}],explanation:'§ 109 GewO unterscheidet einfaches und qualifiziertes Zeugnis.',points:2},
    {id:7,question:'Wie lange beträgt die werktägliche Arbeitszeit nach ArbZG grundsätzlich?',type:'single',options:[{id:'a',text:'8 Stunden',correct:true},{id:'b',text:'14 Stunden'},{id:'c',text:'3 Stunden'},{id:'d',text:'unbegrenzt'}],explanation:'Grundsatz sind acht Stunden; bis zehn mit Ausgleich möglich.',points:2},
    {id:8,question:'Welche Pause ist bei mehr als 6 bis 9 Stunden Arbeit mindestens vorgesehen?',type:'single',options:[{id:'a',text:'15 Minuten'},{id:'b',text:'30 Minuten',correct:true},{id:'c',text:'90 Minuten'},{id:'d',text:'keine'}],explanation:'§ 4 ArbZG: mindestens 30 Minuten.',points:2},
    {id:9,question:'Wie lange beträgt die tägliche Ruhezeit grundsätzlich?',type:'single',options:[{id:'a',text:'5 Stunden'},{id:'b',text:'11 Stunden',correct:true},{id:'c',text:'2 Stunden'},{id:'d',text:'keine'}],explanation:'§ 5 ArbZG: grundsätzlich elf Stunden.',points:2},
    {id:10,question:'Wie lange besteht bei unverschuldeter Krankheit grundsätzlich Entgeltfortzahlung durch den Arbeitgeber?',type:'single',options:[{id:'a',text:'bis zu 6 Wochen',correct:true},{id:'b',text:'immer 2 Jahre'},{id:'c',text:'nur 1 Tag'},{id:'d',text:'nie'}],explanation:'Nach EntgFG grundsätzlich bis sechs Wochen, wenn die Voraussetzungen erfüllt sind.',points:2},
    {id:11,question:'Welche fünf Zweige gehören zur Sozialversicherung?',type:'multiple',options:[{id:'a',text:'Krankenversicherung',correct:true},{id:'b',text:'Pflegeversicherung',correct:true},{id:'c',text:'Rentenversicherung',correct:true},{id:'d',text:'Arbeitslosenversicherung',correct:true},{id:'e',text:'Unfallversicherung',correct:true}],explanation:'Diese fünf Zweige decken unterschiedliche soziale Risiken ab.',points:5},
    {id:12,question:'Was bedeutet Bruttoentgelt?',type:'single',options:[{id:'a',text:'Entgelt vor den ausgewiesenen gesetzlichen und individuellen Abzügen',correct:true},{id:'b',text:'Betrag nach allen Abzügen'},{id:'c',text:'nur Trinkgeld'},{id:'d',text:'Urlaubstage'}],explanation:'Vom Brutto werden unter anderem Steuern und Sozialbeiträge abgezogen.',points:2},
    {id:13,question:'Warum sollten Beitragssätze nicht aus einem alten Lernzettel übernommen werden?',type:'single',options:[{id:'a',text:'sie können sich gesetzlich ändern',correct:true},{id:'b',text:'sie existieren nicht'},{id:'c',text:'nur Arbeitgeber zahlen alles'},{id:'d',text:'Zahlen sind verboten'}],explanation:'Steuer- und Sozialversicherungswerte sind zeitabhängig.',points:2},
    {id:14,question:'Welche drei Säulen der Altersvorsorge werden häufig unterschieden?',type:'multiple',options:[{id:'a',text:'gesetzliche Rente',correct:true},{id:'b',text:'betriebliche Altersvorsorge',correct:true},{id:'c',text:'private Vorsorge',correct:true},{id:'d',text:'Urlaubsplan'}],explanation:'Diese drei Bausteine können sich ergänzen.',points:3},
    {id:15,question:'Was ist bei einer Weiterbildung sinnvoll zu vergleichen?',type:'multiple',options:[{id:'a',text:'Ziel und Anerkennung',correct:true},{id:'b',text:'Zeitaufwand',correct:true},{id:'c',text:'Kosten/Förderung',correct:true},{id:'d',text:'beruflicher Nutzen',correct:true}],explanation:'Weiterbildung sollte zum geplanten Berufsweg passen.',points:4},
    {id:16,question:'Nenne zwei mögliche Warnzeichen dauerhafter Überlastung.',type:'text',correctAnswer:'schlaf,erschöpfung,gereizt,konzentration,fehler,stress',explanation:'Beispiele sind Schlafprobleme, Erschöpfung, Gereiztheit oder Konzentrationsprobleme.',points:3},
    {id:17,question:'Was ist bei Arbeitsüberlastung professionell?',type:'single',options:[{id:'a',text:'Kapazitätsprobleme früh kommunizieren und priorisieren',correct:true},{id:'b',text:'Fehler verheimlichen'},{id:'c',text:'Pausen dauerhaft auslassen'},{id:'d',text:'jede Aufgabe gleichzeitig beginnen'}],explanation:'Klare Prioritäten und Kommunikation schützen Team und Patienten.',points:2},
    {id:18,question:'Erkläre kurz den Unterschied zwischen gesetzlichem Mindesturlaub und tariflichem Urlaub.',type:'text',correctAnswer:'gesetz,mindest,tarif,mehr,günstiger,vertrag',explanation:'Das Gesetz setzt einen Mindestanspruch; ein anwendbarer Tarif- oder Arbeitsvertrag kann einen höheren Anspruch geben.',points:3},
  ]
};
