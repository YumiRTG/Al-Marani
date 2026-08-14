import type { LearningModule } from '@/types';

const svg = (content: string) => `data:image/svg+xml;utf8,${encodeURIComponent(content)}`;

const urinaryPath = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="500" viewBox="0 0 1000 500"><rect width="1000" height="500" rx="32" fill="#f8fafc"/><text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Weg des Urins</text><g font-family="Arial" text-anchor="middle"><ellipse cx="180" cy="210" rx="90" ry="120" fill="#fee2e2" stroke="#ef4444" stroke-width="4"/><text x="180" y="205" font-size="23" font-weight="700">Niere</text><text x="180" y="238" font-size="17">bildet Urin</text><rect x="340" y="145" width="190" height="130" rx="20" fill="#e0f2fe"/><text x="435" y="198" font-size="22" font-weight="700">Harnleiter</text><text x="435" y="232" font-size="17">transportiert</text><ellipse cx="690" cy="215" rx="100" ry="85" fill="#fef3c7" stroke="#d97706" stroke-width="4"/><text x="690" y="208" font-size="22" font-weight="700">Harnblase</text><text x="690" y="240" font-size="17">speichert</text><rect x="835" y="165" width="120" height="100" rx="20" fill="#dcfce7"/><text x="895" y="205" font-size="20" font-weight="700">Harnröhre</text><text x="895" y="235" font-size="16">Ausscheidung</text></g><g stroke="#64748b" stroke-width="5"><path d="M270 210H340M530 210H590M790 215H835"/></g><text x="500" y="410" text-anchor="middle" font-size="23" font-family="Arial" font-weight="700" fill="#0f766e">Niere → Harnleiter → Harnblase → Harnröhre</text></svg>`);

const nephron = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="590" viewBox="0 0 1000 590"><rect width="1000" height="590" rx="32" fill="#f8fafc"/><text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Nephron – vom Blut zum Endharn</text><g font-family="Arial" text-anchor="middle"><circle cx="175" cy="245" r="90" fill="#fee2e2" stroke="#ef4444" stroke-width="4"/><text x="175" y="230" font-size="21" font-weight="700">Glomerulum</text><text x="175" y="260" font-size="16">Filtration</text><rect x="330" y="170" width="220" height="150" rx="25" fill="#e0f2fe"/><text x="440" y="215" font-size="21" font-weight="700">Tubulussystem</text><text x="440" y="250" font-size="16">Rückresorption</text><text x="440" y="278" font-size="16">+ Sekretion</text><path d="M620 155 C760 155 790 245 690 305 C590 365 650 450 805 430" stroke="#0d9488" stroke-width="20" fill="none" stroke-linecap="round"/><text x="760" y="215" font-size="20" font-weight="700">Henle-Schleife</text><rect x="820" y="340" width="130" height="160" rx="20" fill="#dcfce7"/><text x="885" y="400" font-size="20" font-weight="700">Sammelrohr</text><text x="885" y="435" font-size="16">Endharn</text></g><g stroke="#64748b" stroke-width="4"><path d="M265 245H330M550 245H620"/></g><text x="500" y="545" text-anchor="middle" font-size="21" font-family="Arial" fill="#475569">Filtern → Brauchbares zurückholen → zusätzliche Stoffe abgeben → Urin konzentrieren</text></svg>`);

const urineTerms = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="500" viewBox="0 0 1000 500"><rect width="1000" height="500" rx="32" fill="#f8fafc"/><text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Harnmengen – Begriffe visuell</text><g font-family="Arial" text-anchor="middle"><rect x="70" y="145" width="200" height="190" rx="22" fill="#dbeafe"/><text x="170" y="190" font-size="22" font-weight="700">Polyurie</text><text x="170" y="235" font-size="18">viel Urin</text><text x="170" y="275" font-size="19">&gt; 2,5 L/Tag</text><rect x="290" y="145" width="200" height="190" rx="22" fill="#fef3c7"/><text x="390" y="190" font-size="22" font-weight="700">Oligurie</text><text x="390" y="235" font-size="18">wenig Urin</text><text x="390" y="275" font-size="19">&lt; 400 ml/Tag</text><rect x="510" y="145" width="200" height="190" rx="22" fill="#fee2e2"/><text x="610" y="190" font-size="22" font-weight="700">Anurie</text><text x="610" y="235" font-size="18">fast kein Urin</text><text x="610" y="275" font-size="19">&lt; 100 ml/Tag</text><rect x="730" y="145" width="200" height="190" rx="22" fill="#dcfce7"/><text x="830" y="190" font-size="22" font-weight="700">Pollakisurie</text><text x="830" y="235" font-size="18">häufig kleine Mengen</text><text x="830" y="275" font-size="16">Gesamtmenge kann normal sein</text></g></svg>`);

const cycle = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="560" viewBox="0 0 1000 560"><rect width="1000" height="560" rx="32" fill="#f8fafc"/><text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Menstruationszyklus – vereinfachtes Modell</text><g font-family="Arial" text-anchor="middle"><rect x="70" y="155" width="200" height="180" rx="22" fill="#fee2e2"/><text x="170" y="200" font-size="22" font-weight="700">Menstruation</text><text x="170" y="240" font-size="18">Tag 1 startet Zyklus</text><text x="170" y="275" font-size="16">Schleimhaut wird abgestoßen</text><rect x="290" y="155" width="200" height="180" rx="22" fill="#e0f2fe"/><text x="390" y="200" font-size="22" font-weight="700">Follikelphase</text><text x="390" y="240" font-size="18">Eizelle reift</text><text x="390" y="275" font-size="16">Östrogen steigt</text><rect x="510" y="155" width="200" height="180" rx="22" fill="#dcfce7"/><text x="610" y="200" font-size="22" font-weight="700">Ovulation</text><text x="610" y="240" font-size="18">Eisprung</text><text x="610" y="275" font-size="16">Zeitpunkt variiert</text><rect x="730" y="155" width="200" height="180" rx="22" fill="#fef3c7"/><text x="830" y="200" font-size="22" font-weight="700">Lutealphase</text><text x="830" y="240" font-size="18">Gelbkörper</text><text x="830" y="275" font-size="16">Progesteron wichtig</text></g><g stroke="#64748b" stroke-width="4"><path d="M270 245H290M490 245H510M710 245H730"/></g><text x="500" y="430" text-anchor="middle" font-size="21" font-family="Arial" fill="#475569">28 Tage sind ein Lernmodell – normale Zyklen können kürzer oder länger sein.</text></svg>`);

const pregnancy = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="520" viewBox="0 0 1000 520"><rect width="1000" height="520" rx="32" fill="#f8fafc"/><text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Schwangerschaft – drei Trimester</text><g font-family="Arial" text-anchor="middle"><rect x="80" y="150" width="260" height="210" rx="24" fill="#e0f2fe"/><text x="210" y="200" font-size="25" font-weight="700">1. Trimester</text><text x="210" y="245" font-size="20">Woche 1–12</text><text x="210" y="290" font-size="17">Organanlagen entstehen</text><rect x="370" y="150" width="260" height="210" rx="24" fill="#dcfce7"/><text x="500" y="200" font-size="25" font-weight="700">2. Trimester</text><text x="500" y="245" font-size="20">Woche 13–24</text><text x="500" y="290" font-size="17">Wachstum + Bewegung</text><rect x="660" y="150" width="260" height="210" rx="24" fill="#fef3c7"/><text x="790" y="200" font-size="25" font-weight="700">3. Trimester</text><text x="790" y="245" font-size="20">Woche 25–40</text><text x="790" y="290" font-size="17">Reifung + Gewichtszunahme</text></g><text x="500" y="430" text-anchor="middle" font-size="22" font-family="Arial" fill="#475569">Rechnerisch wird eine Schwangerschaft meist mit etwa 40 Wochen ab letzter Menstruation angegeben.</text></svg>`);

const hormoneLock = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="500" viewBox="0 0 1000 500"><rect width="1000" height="500" rx="32" fill="#f8fafc"/><text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Hormone = Botenstoffe mit passendem Rezeptor</text><circle cx="250" cy="240" r="90" fill="#e0f2fe" stroke="#2563eb" stroke-width="4"/><text x="250" y="230" text-anchor="middle" font-size="22" font-family="Arial" font-weight="700">Hormon</text><text x="250" y="262" text-anchor="middle" font-size="17" font-family="Arial">„Botschaft“</text><path d="M340 240H500" stroke="#64748b" stroke-width="7"/><path d="M500 240L470 220M500 240L470 260" stroke="#64748b" stroke-width="7"/><rect x="565" y="125" width="300" height="230" rx="30" fill="#dcfce7" stroke="#16a34a" stroke-width="4"/><text x="715" y="190" text-anchor="middle" font-size="23" font-family="Arial" font-weight="700">Zielzelle</text><rect x="605" y="230" width="80" height="55" rx="15" fill="#fff" stroke="#16a34a" stroke-width="3"/><text x="645" y="265" text-anchor="middle" font-size="17" font-family="Arial">Rezeptor</text><text x="715" y="320" text-anchor="middle" font-size="17" font-family="Arial">Nur passend gebundene Hormone lösen Wirkung aus.</text></svg>`);

const birthPhases = svg(`
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="470" viewBox="0 0 1000 470"><rect width="1000" height="470" rx="32" fill="#f8fafc"/><text x="500" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Geburt – drei Phasen im Überblick</text><g font-family="Arial" text-anchor="middle"><rect x="85" y="150" width="250" height="170" rx="24" fill="#e0f2fe"/><text x="210" y="200" font-size="23" font-weight="700">Eröffnungsphase</text><text x="210" y="245" font-size="17">Muttermund öffnet sich</text><rect x="375" y="150" width="250" height="170" rx="24" fill="#dcfce7"/><text x="500" y="200" font-size="23" font-weight="700">Austreibungsphase</text><text x="500" y="245" font-size="17">Kind wird geboren</text><rect x="665" y="150" width="250" height="170" rx="24" fill="#fef3c7"/><text x="790" y="200" font-size="23" font-weight="700">Nachgeburtsphase</text><text x="790" y="245" font-size="17">Plazenta wird geboren</text></g><g stroke="#64748b" stroke-width="4"><path d="M335 235H375M625 235H665"/></g></svg>`);

export const lf8: LearningModule = {
  id: 'lf8',
  number: 8,
  title: 'Harnorgane, Geschlechtsorgane & Hormone',
  subtitle: 'Niere, Urin, Zyklus, Schwangerschaft, Hormone, Verhütung und STI – Schritt für Schritt',
  description: 'Sehr ausführlicher visueller Lernkurs für Auszubildende ohne Vorwissen. Anatomie wird zuerst als Weg und Funktion erklärt, danach kommen Fachbegriffe, diagnostische Begriffe, Videos und prüfungsnahe Fälle.',
  difficulty: 'advanced',
  icon: 'droplets',
  heroImage: '/images/lf8-hero.jpg',
  topics: [
    {
      id:'harnsystem', title:'1. Harnsystem – erst den Weg verstehen', content:[
        {type:'heading',title:'Warum brauchen wir die Harnorgane?'},
        {type:'text',text:'Die Nieren filtern das Blut, regulieren unter anderem Wasser- und Salzhaushalt und helfen dabei, Abfallstoffe auszuscheiden. Der entstehende Urin wird anschließend nur noch transportiert, gespeichert und ausgeschieden.'},
        {type:'image',src:urinaryPath,alt:'Weg des Urins durch die Harnorgane',caption:'Lernreihenfolge: Niere → Harnleiter → Harnblase → Harnröhre.'},
        {type:'table',headers:['Organ','Hauptaufgabe','Fachbegriff'],rows:[['Niere','Blut filtern, Urin bilden','Ren / Nephros'],['Harnleiter','Urin zur Blase transportieren','Ureter'],['Harnblase','Urin speichern','Vesica urinaria'],['Harnröhre','Urin nach außen leiten','Urethra']]},
        {type:'info',title:'Wichtiger Denkfehler',text:'Die Harnblase bildet keinen Urin. Urin wird in den Nieren gebildet und in der Blase nur gespeichert.'},
        {type:'video',title:'Video: Welche Funktionen haben die Nieren?',text:'Sehr guter Einstieg. Achte neben dem Filtern auf weitere Aufgaben der Niere: Wasser-/Salzhaushalt, Blutdruck und Erythropoetin.',duration:'1:49 Min.',source:'Stiftung Gesundheitswissen',url:'https://www.stiftung-gesundheitswissen.de/mediathek/videos/koerper-wissen/welche-funktionen-haben-die-nieren',embedUrl:'https://www.youtube-nocookie.com/embed/VjRZUBAsXS8'},
      ]
    },
    {
      id:'nephron', title:'2. Nephron und Harnbildung', content:[
        {type:'heading',title:'Das Nephron als Mini-Filtereinheit'},
        {type:'text',text:'Jede Niere besteht aus sehr vielen Nephronen. Ein Nephron enthält ein Nierenkörperchen mit Glomerulum und ein Tubulussystem. Für Anfänger ist wichtiger als jedes Detail: Der Körper filtert zuerst großzügig und holt danach viele wertvolle Stoffe wieder zurück.'},
        {type:'image',src:nephron,alt:'Vereinfachter Aufbau eines Nephrons',caption:'Die drei Schlüsselbegriffe: Filtration – Rückresorption – Sekretion.'},
        {type:'table',headers:['Schritt','Was passiert?','Einfaches Bild'],rows:[['Filtration','Wasser und kleine Stoffe werden aus dem Blut filtriert','Sieb'],['Rückresorption','Brauchbares wird aus dem Tubulus zurück ins Blut geholt','Zurückholen'],['Sekretion','weitere Stoffe werden aktiv in den Tubulus abgegeben','Zusätzlich hinein']]},
        {type:'definition',term:'Primärharn',definition:'Flüssigkeit unmittelbar nach der Filtration. Sie enthält noch viele Stoffe, die der Körper zurückgewinnt.'},
        {type:'definition',term:'Endharn',definition:'Der nach Rückresorption und Sekretion verbleibende Urin, der ausgeschieden wird.'},
        {type:'info',title:'Merksatz',text:'Erst filtern – dann retten – dann fein einstellen.'},
      ]
    },
    {
      id:'urin', title:'3. Urinuntersuchung und Harnmengen', content:[
        {type:'heading',title:'Welche Urinprobe für welche Frage?'},
        {type:'table',headers:['Probe','Wie gewonnen?','Typischer Zweck'],rows:[['Spontanurin','ohne besondere Sammeltechnik','orientierende Untersuchung'],['Morgenurin','erste Morgenportion','stärker konzentriert, z. B. bestimmte Testfragen'],['Mittelstrahlurin','erste Portion verwerfen, mittlere auffangen','Kontamination verringern'],['24-h-Sammelurin','Urin über definierten Zeitraum sammeln','quantitative Bestimmungen'],['Katheterurin','über Katheter aus der Blase','spezielle medizinische Fragestellungen']]},
        {type:'image',src:urineTerms,alt:'Harnmengen Begriffe',caption:'Polyurie, Oligurie und Anurie beziehen sich auf Tagesmengen; Pollakisurie beschreibt häufiges Wasserlassen kleiner Mengen.'},
        {type:'heading',title:'Farbe ist ein Hinweis, keine Diagnose'},
        {type:'text',text:'Urinfarbe kann sich durch Flüssigkeitsmenge, Nahrungsmittel, Medikamente, Blutbestandteile oder Erkrankungen verändern. Eine auffällige Farbe allein beweist keine Diagnose. Deshalb wird sie immer zusammen mit Beschwerden und Laborbefunden bewertet.'},
        {type:'warning',title:'Probe korrekt beschriften',text:'Eine medizinisch perfekte Probe ist wertlos, wenn sie der falschen Person zugeordnet wird. Identität, Entnahmezeit und Probenart nach Praxisstandard sicher dokumentieren.'},
      ]
    },
    {
      id:'weiblich', title:'4. Weibliche Geschlechtsorgane und Zyklus', content:[
        {type:'heading',title:'Organe und ihre Aufgaben'},
        {type:'table',headers:['Organ','Aufgabe'],rows:[['Ovarien','Eizellreifung und Bildung wichtiger Geschlechtshormone'],['Eileiter','Transport der Eizelle; Befruchtung findet häufig hier statt'],['Uterus','Gebärmutter; Ort der Schwangerschaft'],['Zervix','Gebärmutterhals als Übergang zur Vagina'],['Vagina','Verbindung nach außen; Teil des Geburtskanals']]},
        {type:'image',src:cycle,alt:'Vier Phasen des Menstruationszyklus',caption:'Der 28-Tage-Zyklus ist ein Lernmodell. In der Realität ist die Zykluslänge individuell.'},
        {type:'heading',title:'Hormone im Zyklus – sehr vereinfacht'},
        {type:'text',text:'FSH fördert die Follikelreifung. Östrogene unterstützen den Aufbau der Gebärmutterschleimhaut. Ein LH-Anstieg spielt beim Eisprung eine zentrale Rolle. Nach dem Eisprung bildet der Gelbkörper Progesteron, das die Schleimhaut auf eine mögliche Schwangerschaft vorbereitet.'},
        {type:'info',title:'Prüfungsstrategie',text:'Nicht zuerst alle Hormonkurven auswendig lernen. Sichere zuerst: Follikelreifung → Eisprung → Gelbkörperphase → bei ausbleibender Schwangerschaft Menstruation.'},
      ]
    },
    {
      id:'schwangerschaft', title:'5. Schwangerschaft, Geburt und APGAR', content:[
        {type:'image',src:pregnancy,alt:'Drei Trimester der Schwangerschaft',caption:'Die Einteilung hilft, Entwicklung und Vorsorge zeitlich zu ordnen.'},
        {type:'text',text:'Eine Schwangerschaft wird rechnerisch meist ab dem ersten Tag der letzten Menstruation mit ungefähr 40 Wochen angegeben. Die tatsächliche embryonale Entwicklungszeit ist kürzer, weil die Befruchtung typischerweise später stattfindet.'},
        {type:'heading',title:'Naegele-Regel als Rechenhilfe'},
        {type:'info',title:'Formel',text:'Erster Tag der letzten Regel + 7 Tage − 3 Monate + 1 Jahr. Sie liefert einen errechneten Geburtstermin; der tatsächliche Geburtstermin kann abweichen.'},
        {type:'image',src:birthPhases,alt:'Geburtsphasen',caption:'Eröffnungsphase → Austreibungsphase → Nachgeburtsphase.'},
        {type:'heading',title:'APGAR-Score'},
        {type:'table',headers:['Buchstabe','Kriterium'],rows:[['A','Atmung'],['P','Puls'],['G','Grundtonus / Muskeltonus'],['A','Aussehen / Hautfarbe'],['R','Reflexe']]},
        {type:'text',text:'Jedes Kriterium wird typischerweise mit 0, 1 oder 2 Punkten bewertet. Der Score dient der schnellen Beurteilung des Neugeborenen nach der Geburt und wird zu festgelegten Zeitpunkten erhoben.'},
      ]
    },
    {
      id:'maennlich', title:'6. Männliche Geschlechtsorgane', content:[
        {type:'table',headers:['Organ','Aufgabe'],rows:[['Hoden','Bildung von Spermien und Testosteron'],['Nebenhoden','Reifung und Speicherung von Spermien'],['Samenleiter','Transport von Spermien'],['Samenbläschen','Sekretanteil der Samenflüssigkeit'],['Prostata','Sekretanteil; liegt um einen Teil der Harnröhre'],['Penis','Harnausscheidung und Sexualfunktion'],['Skrotum','umgibt die Hoden und unterstützt Temperaturregulation']]},
        {type:'heading',title:'Benigne Prostatahyperplasie'},
        {type:'text',text:'Eine gutartige Vergrößerung der Prostata kann die Harnröhre einengen. Typische Beschwerden können schwacher Harnstrahl, Startschwierigkeiten, Restharngefühl und häufigerer Harndrang sein.'},
        {type:'info',title:'Anatomie hilft beim Verstehen',text:'Weil die Prostata einen Abschnitt der Harnröhre umgibt, kann eine Vergrößerung direkt das Wasserlassen beeinträchtigen.'},
      ]
    },
    {
      id:'hormone', title:'7. Hormonsystem und Verhütung', content:[
        {type:'image',src:hormoneLock,alt:'Schlüssel Schloss Prinzip der Hormone',caption:'Hormone wirken nur an Zellen mit passenden Rezeptoren.'},
        {type:'definition',term:'Hormon',definition:'Körpereigener Botenstoff, der Informationen an Zielzellen übermittelt und dort über passende Rezeptoren Wirkungen auslöst.'},
        {type:'table',headers:['Hormon','Beispielhafte Funktion'],rows:[['Östrogene','Zyklus und Entwicklung weiblicher Geschlechtsmerkmale'],['Progesteron','Vorbereitung und Erhaltung der Gebärmutterschleimhaut'],['Testosteron','Entwicklung männlicher Geschlechtsmerkmale und weitere Funktionen'],['EPO','fördert Bildung roter Blutkörperchen'],['Renin','Teil der Blutdruckregulation'],['ADH','reguliert Wasserrückresorption in der Niere']]},
        {type:'video',title:'Video: Wie funktioniert unser Hormonsystem?',text:'Achte besonders auf Botenstoff, Blutweg, Zielzelle und Rezeptor. Das Video erklärt das Schlüssel-Schloss-Prinzip sehr anschaulich.',duration:'2:29 Min.',source:'Stiftung Gesundheitswissen',url:'https://www.stiftung-gesundheitswissen.de/mediathek/videos/koerper-wissen/das-hormonsystem-so-steuern-hormone-unser-verhalten-und-unsere',embedUrl:'https://www.youtube-nocookie.com/embed/1v6JSZPqOT8'},
        {type:'heading',title:'Verhütungsmethoden ordnen'},
        {type:'table',headers:['Gruppe','Beispiele','Grundidee'],rows:[['Barrieremethoden','Kondom, Diaphragma','Spermien mechanisch am Eintritt hindern'],['Hormonell','Pille, Hormonspirale, Implantat','Zyklus/Hormonwirkung beeinflussen'],['Intrauterin','Kupfer- oder Hormonspirale','Wirkung in der Gebärmutter'],['Sterilisation','Vasektomie, Tubenverschluss','dauerhafte Methode']]},
        {type:'warning',title:'STI-Schutz',text:'Hormonelle Verhütung und Spiralen schützen nicht vor sexuell übertragbaren Infektionen. Kondome können das Übertragungsrisiko vieler STI deutlich senken, bieten aber keinen hundertprozentigen Schutz.'},
      ]
    },
    {
      id:'sti', title:'8. Sexuell übertragbare Infektionen', content:[
        {type:'heading',title:'Warum „Infektion“ wichtiger ist als „Symptom“'},
        {type:'text',text:'Viele sexuell übertragbare Infektionen können zeitweise wenige oder keine Beschwerden verursachen. Deshalb sind Anamnese, Teststrategie, Impfprävention und Schutzmaßnahmen wichtig.'},
        {type:'table',headers:['STI','Erregerart','Wichtig für die Ausbildung'],rows:[['HPV','Virus','bestimmte Typen können Krebs fördern; Impfung verfügbar'],['Hepatitis B','Virus','kann sexuell übertragen werden; Impfung verfügbar'],['HIV','Virus','befällt Zellen des Immunsystems; heute gut behandelbar, aber nicht heilbar'],['Herpes genitalis','Herpes-simplex-Viren','kann wiederkehrende Beschwerden verursachen']]},
        {type:'info',title:'Impfprävention',text:'HPV- und Hepatitis-B-Impfungen sind wichtige Beispiele dafür, dass Prävention bei STI nicht nur aus Barriereschutz besteht.'},
        {type:'warning',title:'Kommunikation in der Praxis',text:'STI-Themen verlangen besonders wertfreie, vertrauliche Kommunikation. Keine moralischen Bewertungen, keine unnötigen Kommentare, Datenschutz konsequent einhalten.'},
      ]
    },
    {
      id:'cases', title:'9. Prüfungsnahe Fälle', content:[
        {type:'heading',title:'Fall A – häufiges Wasserlassen'},
        {type:'text',text:'Ein Patient berichtet, er müsse sehr häufig kleine Mengen Wasser lassen. Welcher Fachbegriff passt? Welche Zusatzfrage hilft zu klären, ob die Tagesgesamtmenge erhöht ist?'},
        {type:'heading',title:'Fall B – Urinprobe'},
        {type:'text',text:'Für eine mikrobiologische Fragestellung soll eine möglichst wenig verunreinigte Probe gewonnen werden. Erkläre das Prinzip des Mittelstrahlurins in eigenen Worten.'},
        {type:'heading',title:'Fall C – Zyklus'},
        {type:'text',text:'Eine Auszubildende sagt: „Der Eisprung ist immer genau an Tag 14.“ Erkläre, warum Tag 14 nur ein vereinfachtes Lernmodell bei einem 28-Tage-Zyklus ist.'},
        {type:'heading',title:'Fall D – Hormone'},
        {type:'text',text:'Warum wirkt ein bestimmtes Hormon nicht einfach auf jede Zelle im Körper? Nutze die Begriffe Zielzelle und Rezeptor.'},
      ]
    },
  ],
  questions:[
    {id:1,question:'Welche Reihenfolge beschreibt den Urinweg korrekt?',type:'single',options:[{id:'a',text:'Niere → Harnleiter → Harnblase → Harnröhre',correct:true},{id:'b',text:'Harnblase → Niere → Harnröhre → Harnleiter'},{id:'c',text:'Niere → Harnblase → Harnleiter → Harnröhre'},{id:'d',text:'Harnröhre → Niere → Harnblase'}],explanation:'Urin entsteht in der Niere, läuft über den Harnleiter in die Blase und über die Harnröhre nach außen.',points:3},
    {id:2,question:'Wo wird Urin gebildet?',type:'single',options:[{id:'a',text:'Harnblase'},{id:'b',text:'Niere',correct:true},{id:'c',text:'Harnröhre'},{id:'d',text:'Prostata'}],explanation:'Die Niere bildet Urin; die Blase speichert ihn.',points:2},
    {id:3,question:'Was passiert bei der glomerulären Filtration?',type:'single',options:[{id:'a',text:'Blutbestandteile werden im Nierenkörperchen filtriert',correct:true},{id:'b',text:'Urin wird in der Blase gespeichert'},{id:'c',text:'Hormone werden im Ureter gebildet'},{id:'d',text:'Spermien werden transportiert'}],explanation:'Die Filtration findet am Nierenkörperchen statt.',points:2},
    {id:4,question:'Was bedeutet Rückresorption?',type:'single',options:[{id:'a',text:'Brauchbare Stoffe werden aus dem Tubulus ins Blut zurückgeholt',correct:true},{id:'b',text:'Blut wird aus der Niere entfernt'},{id:'c',text:'Urin wird aus der Blase zurück in die Niere gedrückt'},{id:'d',text:'Hormone werden ausgeschieden'}],explanation:'Rückresorption rettet wichtige Stoffe und Wasser aus dem Primärharn.',points:2},
    {id:5,question:'Was bedeutet Polyurie?',type:'single',options:[{id:'a',text:'mehr als etwa 2,5 Liter Urin pro Tag',correct:true},{id:'b',text:'unter 100 ml pro Tag'},{id:'c',text:'nur nachts Wasserlassen'},{id:'d',text:'häufig kleine Mengen bei normaler Tagesmenge'}],explanation:'Polyurie beschreibt eine erhöhte Tagesurinmenge.',points:2},
    {id:6,question:'Was bedeutet Pollakisurie?',type:'single',options:[{id:'a',text:'häufiges Wasserlassen kleiner Mengen',correct:true},{id:'b',text:'kein Urin'},{id:'c',text:'mehr als 3 Liter Blut'},{id:'d',text:'Blutdruckanstieg'}],explanation:'Pollakisurie bezieht sich auf die Häufigkeit kleiner Miktionen.',points:2},
    {id:7,question:'Wie wird Mittelstrahlurin grundsätzlich gewonnen?',type:'single',options:[{id:'a',text:'erste Urinportion kurz laufen lassen, mittlere Portion auffangen',correct:true},{id:'b',text:'nur die allererste Tropfenmenge auffangen'},{id:'c',text:'immer 24 Stunden sammeln'},{id:'d',text:'nur über Katheter'}],explanation:'Der Mittelstrahl soll Kontamination durch die äußere Harnröhre reduzieren.',points:2},
    {id:8,question:'Welche Aussage zum 28-Tage-Zyklus ist richtig?',type:'single',options:[{id:'a',text:'Jeder Zyklus dauert exakt 28 Tage'},{id:'b',text:'28 Tage sind ein häufig verwendetes Lernmodell; individuelle Zyklen variieren',correct:true},{id:'c',text:'Ovulation findet immer an Tag 1 statt'},{id:'d',text:'Es gibt keine Lutealphase'}],explanation:'Zykluslängen und Eisprungzeitpunkt können variieren.',points:2},
    {id:9,question:'Welches Hormon ist besonders mit der Gelbkörperphase verbunden?',type:'single',options:[{id:'a',text:'Progesteron',correct:true},{id:'b',text:'Insulin'},{id:'c',text:'Adrenalin'},{id:'d',text:'Thyroxin'}],explanation:'Der Gelbkörper produziert vor allem Progesteron.',points:2},
    {id:10,question:'Wo findet eine Befruchtung häufig statt?',type:'single',options:[{id:'a',text:'im Eileiter',correct:true},{id:'b',text:'in der Harnblase'},{id:'c',text:'im Harnleiter'},{id:'d',text:'in der Prostata'}],explanation:'Die Befruchtung findet typischerweise im Eileiter statt.',points:2},
    {id:11,question:'Welche drei Phasen gehören zur Geburt?',type:'multiple',options:[{id:'a',text:'Eröffnungsphase',correct:true},{id:'b',text:'Austreibungsphase',correct:true},{id:'c',text:'Nachgeburtsphase',correct:true},{id:'d',text:'Filtrationsphase'}],explanation:'Diese drei Phasen strukturieren den Geburtsablauf.',points:3},
    {id:12,question:'Wofür steht das P im APGAR-Score?',type:'single',options:[{id:'a',text:'Puls',correct:true},{id:'b',text:'Progesteron'},{id:'c',text:'Prostata'},{id:'d',text:'Polyurie'}],explanation:'APGAR umfasst Atmung, Puls, Grundtonus, Aussehen und Reflexe.',points:2},
    {id:13,question:'Welche Aufgabe hat die Prostata unter anderem?',type:'single',options:[{id:'a',text:'sie bildet einen Anteil der Samenflüssigkeit',correct:true},{id:'b',text:'sie produziert Urin'},{id:'c',text:'sie speichert Eizellen'},{id:'d',text:'sie filtert Blut'}],explanation:'Die Prostata produziert Sekret für die Samenflüssigkeit.',points:2},
    {id:14,question:'Warum kann eine vergrößerte Prostata das Wasserlassen erschweren?',type:'single',options:[{id:'a',text:'weil sie einen Abschnitt der Harnröhre umgibt',correct:true},{id:'b',text:'weil sie den Harnleiter ersetzt'},{id:'c',text:'weil sie die Niere verschließt'},{id:'d',text:'weil sie die Harnblase bildet'}],explanation:'Die anatomische Lage erklärt die Beschwerden.',points:2},
    {id:15,question:'Wie wirken Hormone zielgerichtet?',type:'single',options:[{id:'a',text:'über passende Rezeptoren an Zielzellen',correct:true},{id:'b',text:'sie wirken immer gleich auf jede Zelle'},{id:'c',text:'nur durch die Harnröhre'},{id:'d',text:'nur mechanisch'}],explanation:'Rezeptoren sorgen für spezifische Hormonwirkungen.',points:2},
    {id:16,question:'Welche Hormone bzw. Botenstoffe werden mit Nierenfunktionen verbunden?',type:'multiple',options:[{id:'a',text:'Erythropoetin',correct:true},{id:'b',text:'Renin',correct:true},{id:'c',text:'Insulin nur aus der Niere'},{id:'d',text:'Melanin'}],explanation:'Die Niere bildet unter anderem EPO und Renin bzw. ist an entsprechenden Regelkreisen beteiligt.',points:3},
    {id:17,question:'Welche Methode kann das Risiko vieler STI reduzieren?',type:'single',options:[{id:'a',text:'Kondom',correct:true},{id:'b',text:'nur die Pille'},{id:'c',text:'nur Hormonspirale'},{id:'d',text:'keine Methode'}],explanation:'Kondome können das Übertragungsrisiko vieler STI deutlich reduzieren.',points:2},
    {id:18,question:'Gegen welche beiden hier behandelten Virusinfektionen gibt es Impfungen?',type:'multiple',options:[{id:'a',text:'HPV',correct:true},{id:'b',text:'Hepatitis B',correct:true},{id:'c',text:'HIV'},{id:'d',text:'Herpes genitalis allgemein'}],explanation:'Impfprävention gibt es unter anderem gegen HPV und Hepatitis B.',points:3},
    {id:19,question:'Erkläre den Unterschied zwischen Primärharn und Endharn.',type:'text',correctAnswer:'filtration,rückresorption,primärharn,endharn',explanation:'Primärharn entsteht nach der Filtration; Endharn bleibt nach Rückresorption und Sekretion übrig.',points:4},
    {id:20,question:'Warum kann ein Hormon nicht einfach auf jede Zelle wirken?',type:'text',correctAnswer:'rezeptor,zielzelle,schlüssel,schloss',explanation:'Nur Zielzellen mit passenden Rezeptoren reagieren auf ein bestimmtes Hormon.',points:4},
  ],
};
