import type { LearningModule, QuizOption } from '@/types';

type Patch = {
  question?: string;
  correct: string[];
  wrong: string[];
  explanation?: string;
};

const patches: Record<string, Patch> = {
  // Lernfeld 1
  'lf1:2': { correct: ['Patienten empfangen', 'Praxisorganisation', 'Bei Untersuchungen und Behandlungen assistieren'], wrong: ['Eigenständig ärztliche Diagnosen stellen', 'Arzneimittel ohne ärztliche Anordnung verordnen'] },
  'lf1:14': { question: 'Welche Aussage zur TRBA 250 trifft zu?', correct: ['Sie konkretisiert Schutzmaßnahmen bei biologischen Arbeitsstoffen im Gesundheitsdienst.'], wrong: ['Sie regelt die privatärztliche Abrechnung nach GOÄ.', 'Sie legt die Preise verschreibungspflichtiger Arzneimittel fest.', 'Sie ersetzt das Infektionsschutzgesetz vollständig.', 'Sie enthält die tariflichen Gehälter Medizinischer Fachangestellter.'] },
  'lf1:17': { question: 'Welche Verhaltensweisen gehören zu professioneller Teamkommunikation?', correct: ['Klare Übergaben durchführen.', 'Bei unklaren Aufträgen gezielt nachfragen.', 'Wichtige Informationen nachvollziehbar dokumentieren.', 'Fehler und Beinahe-Fehler sachlich ansprechen.'], wrong: ['Unklare Informationen selbst interpretieren, damit keine Rückfrage nötig ist.'] },

  // Lernfeld 2
  'lf2:1': { correct: ['Identität des Patienten klären.', 'Das Anliegen strukturiert erfassen.', 'Diskretion und Datenschutz beachten.', 'Akute Warnzeichen erkennen und bei Bedarf weitergeben.'], wrong: ['Diagnosen und Befunde gut hörbar am Empfang wiederholen.'] },
  'lf2:9': { correct: ['Befunde nachvollziehbar festhalten.', 'Durchgeführte Therapien und Maßnahmen dokumentieren.', 'Einwilligungen und relevante Aufklärung dokumentieren.', 'Nachträgliche Änderungen nachvollziehbar kenntlich machen.'], wrong: ['Fehlerhafte Einträge so überschreiben, dass die ursprüngliche Angabe nicht mehr erkennbar ist.'] },
  'lf2:12': { correct: ['Medizinische Dringlichkeit berücksichtigen.', 'Die voraussichtlich benötigte Zeit einplanen.', 'Benötigte Räume, Geräte oder Personal berücksichtigen.', 'Erforderliche Vorbereitung des Patienten einplanen.'], wrong: ['Termine ausschließlich nach der Reihenfolge eingehender Anrufe vergeben.'] },
  'lf2:14': { correct: ['Bildschirmsperren konsequent nutzen.', 'Sichtschutz gegenüber Warte- und Durchgangsbereichen beachten.', 'Persönliche Benutzerzugänge verwenden.', 'Bildschirme so positionieren, dass Unbefugte nicht mitlesen können.'], wrong: ['Passwörter gut sichtbar am Arbeitsplatz hinterlegen, damit das Team schneller zugreifen kann.'] },

  // Lernfeld 3
  'lf3:2': { question: 'Welche Übertragungswege von Krankheitserregern sind möglich?', correct: ['Kontakt- beziehungsweise Schmierübertragung.', 'Tröpfchen- beziehungsweise Aerosolübertragung.', 'Fäkal-orale Übertragung.', 'Übertragung über Blut beziehungsweise kontaminierte scharfe Instrumente.'], wrong: ['Übertragung ohne jeden Kontakt, Erreger oder Übertragungsmedium.'] },
  'lf3:3': { question: 'Welche Maßnahmen können eine Infektionskette unterbrechen?', correct: ['Konsequente Händehygiene.', 'Geeignete Reinigung und Desinfektion.', 'Situationsgerechte persönliche Schutzausrüstung.', 'Impfprävention, wenn eine wirksame Impfung verfügbar ist.'], wrong: ['Dasselbe Paar kontaminierter Handschuhe bei mehreren Patienten weitertragen.'] },
  'lf3:4': { correct: ['Reinigung entfernt vor allem Verunreinigungen; Desinfektion reduziert beziehungsweise inaktiviert Erreger so weit, dass keine Infektionsgefährdung mehr zu erwarten ist.'], wrong: ['Reinigung und Desinfektion bezeichnen dasselbe Verfahren.', 'Eine Reinigung führt grundsätzlich zu Sterilität.', 'Desinfektion dient nur dazu, sichtbaren Staub zu entfernen.', 'Jede Desinfektion beseitigt automatisch alle vermehrungsfähigen Mikroorganismen einschließlich Sporen.'] },
  'lf3:7': { question: 'Welche Punkte müssen bei der Anwendung eines Desinfektionsmittels beachtet werden?', correct: ['Vorgeschriebene Einwirkzeit.', 'Richtige Konzentration beziehungsweise gebrauchsfertige Anwendung.', 'Passender Wirkungsbereich.', 'Herstellerangaben.', 'Materialverträglichkeit und Arbeitsschutz.'], wrong: [] },
  'lf3:11': { question: 'Welche Schritte sind nach einer relevanten Nadelstichverletzung sinnvoll?', correct: ['Sofortige lokale Erstmaßnahmen durchführen.', 'Die Exposition unverzüglich melden.', 'Das Infektionsrisiko medizinisch bewerten lassen.', 'Den Arbeitsunfall dokumentieren.', 'Notwendige PEP beziehungsweise Nachkontrollen zeitnah fachlich prüfen lassen.'], wrong: [] },

  // Lernfeld 4
  'lf4:2': { correct: ['Fremdanamnese'], wrong: ['Eigenanamnese', 'Sozialanamnese', 'Familienanamnese', 'Medikamentenanamnese'] },
  'lf4:3': { correct: ['Was führt Sie heute zu uns?'], wrong: ['Haben Sie Fieber?', 'Ist der Schmerz stechend?', 'Nehmen Sie Blutverdünner ein?', 'Sind Sie gegen Penicillin allergisch?'] },
  'lf4:5': { correct: ['Palpation'], wrong: ['Inspektion', 'Perkussion', 'Auskultation', 'Sonografie'] },
  'lf4:6': { correct: ['Auskultation'], wrong: ['Palpation', 'Perkussion', 'Inspektion', 'Sonografie'] },
  'lf4:7': { correct: ['Kugelgelenk'], wrong: ['Scharniergelenk', 'Sattelgelenk', 'Eigelenk', 'Radgelenk'] },
  'lf4:8': { correct: ['Skelettmuskeln'], wrong: ['Knochen', 'Gelenkknorpel', 'Bänder', 'Gelenkkapseln'] },
  'lf4:9': { correct: ['Gonarthrose'], wrong: ['Coxarthrose', 'Omarthrose', 'Rhizarthrose', 'Spondylarthrose'] },
  'lf4:11': { correct: ['Diaphyse'], wrong: ['Epiphyse', 'Metaphyse', 'Periost', 'Spongiosa'] },
  'lf4:15': { correct: ['zum Körperstamm hin'], wrong: ['vom Körperstamm weg', 'zur Körpermitte hin', 'zur Körperseite hin', 'rückenwärts'] },
  'lf4:17': { correct: ['Kyphose'], wrong: ['Lordose', 'Skoliose', 'Hyperlordose', 'Neutralstellung ohne physiologische Krümmung'] },
  'lf4:19': { correct: ['subkutan'], wrong: ['intramuskulär', 'intravenös', 'oral', 'intradermal'] },
  'lf4:21': { question: 'Welche der folgenden Punkte gehören zur 6-R-Regel der Medikamentengabe?', correct: ['Richtiger Patient.', 'Richtiges Arzneimittel.', 'Richtige Dosis.', 'Richtige Applikationsart.'], wrong: ['Richtige Zimmernummer.'] },

  // Lernfeld 5
  'lf5:1': { correct: ['linke Herzhälfte'], wrong: ['rechte Herzhälfte', 'rechter Ventrikel', 'linker Vorhof allein', 'beide Herzhälften ausschließlich in die Lunge'] },
  'lf5:2': { correct: ['Körper → rechtes Herz → Lunge → linkes Herz → Körper'], wrong: ['Körper → linkes Herz → Lunge → rechtes Herz → Körper', 'Körper → rechtes Herz → linkes Herz → Lunge → Körper', 'Lunge → rechtes Herz → Körper → linkes Herz → Lunge', 'Körper → Lunge → rechtes Herz → linkes Herz → Körper'] },
  'lf5:3': { correct: ['weil sie Blut vom Herzen wegführt'], wrong: ['weil Arterien grundsätzlich sauerstoffreiches Blut führen', 'weil sie Blut immer zum Herzen hinführt', 'weil nur Gefäße mit Venenklappen Arterien heißen', 'weil die Bezeichnung nach der Blutfarbe vergeben wird'] },
  'lf5:6': { question: 'Welche Faktoren können den Puls vorübergehend erhöhen?', correct: ['Körperliche Anstrengung.', 'Fieber.', 'Aufregung oder Stress.', 'Flüssigkeitsmangel.'], wrong: ['Tiefe körperliche Ruhe beziehungsweise Schlaf.'] },
  'lf5:9': { correct: ['Alveolen'], wrong: ['Trachea', 'Hauptbronchien', 'Nasenhöhle', 'Pleuraspalt'] },
  'lf5:10': { correct: ['Sauerstoff diffundiert aus den Alveolen ins Blut; Kohlendioxid nimmt überwiegend den umgekehrten Weg.'], wrong: ['Sauerstoff diffundiert aus dem Blut in die Alveolen und Kohlendioxid ins Blut.', 'Sauerstoff und Kohlendioxid diffundieren beide nur aus dem Blut in die Alveolen.', 'Beide Gase bleiben während der Atmung vollständig in den Alveolen.', 'Der Gasaustausch erfolgt über Herzklappen statt über die Alveolar-Kapillar-Membran.'] },
  'lf5:13': { correct: ['Gebührenordnung für Ärzte'], wrong: ['Gebührenordnung für ärztliche Leistungen', 'Gesetzliche Ordnung ärztlicher Gebühren', 'Gebührenordnung für Apotheken', 'Gesamtordnung für ärztliche Abrechnung'] },
  'lf5:16': { correct: ['Bis zum Schwellenwert liegt bei vielen Leistungen die Regelspanne; eine Überschreitung muss nachvollziehbar begründet werden.'], wrong: ['Der Schwellenwert ist bei jeder GOÄ-Leistung automatisch der absolute Höchstsatz.', 'Der Wert 2,3 gilt ausschließlich für Laborleistungen des Abschnitts M.', 'Der Schwellenwert bezeichnet die Punktzahl einer Leistung.', 'Der Schwellenwert ist ein fester Zuschlag von 2,30 Euro auf jede Rechnung.'] },
  'lf5:20': { correct: ['Das rechte Herz pumpt sauerstoffarmes Blut zur Lunge; das linke Herz verteilt sauerstoffreiches Blut im Körper.'], wrong: ['Das linke Herz pumpt sauerstoffarmes Blut zur Lunge und das rechte Herz sauerstoffreiches Blut in den Körper.', 'Die Lunge pumpt das Blut aktiv durch die Aorta in den Körperkreislauf.', 'Der Gasaustausch findet überwiegend in den großen Herzkranzgefäßen statt.', 'Beide Herzhälften pumpen ihr Blut direkt in denselben Kreislaufabschnitt.'] },

  // Lernfeld 6
  'lf6:3': { correct: ['First Expired – First Out'], wrong: ['First In – First Out', 'First Entered – First Ordered', 'Fast Expired – Fast Open', 'First Empty – First Out'] },
  'lf6:4': { correct: ['Ablauf 09/2026'], wrong: ['Ablauf 02/2027', 'Ablauf 11/2027', 'Die zuletzt gelieferte Packung unabhängig vom Verfallsdatum', 'Die größte Packung unabhängig vom Verfallsdatum'] },
  'lf6:5': { question: 'Welche Schritte sind bei einer dokumentierten Kühlschrankabweichung sinnvoll?', correct: ['Abweichung und Messwert dokumentieren.', 'Betroffene Präparate bis zur Klärung sichern.', 'Vorgaben und Herstellerinformationen zur Verwendbarkeit prüfen.', 'Dauer und Ausmaß der Temperaturabweichung berücksichtigen.'], wrong: ['Den auffälligen Messwert löschen und die Präparate ohne weitere Prüfung verwenden.'] },
  'lf6:7': { correct: ['Für die Abgabe darf die BtM-Verschreibung bei Vorlage grundsätzlich nicht vor mehr als sieben Tagen ausgefertigt worden sein.'], wrong: ['Sie bleibt für die Abgabe grundsätzlich 14 Tage gültig.', 'Sie bleibt für die Abgabe grundsätzlich 28 Tage gültig.', 'Das Ausstellungsdatum spielt für die Abgabe keine Rolle.', 'Die MFA kann eine abgelaufene Verschreibung selbst durch ein neues Datum verlängern.'] },
  'lf6:9': { correct: ['durch zwei übereinstimmende Willenserklärungen – Angebot und Annahme'], wrong: ['bereits durch ein Angebot ohne Annahme', 'erst durch die vollständige Bezahlung des Kaufpreises', 'nur durch eine notarielle Beurkundung', 'durch Schweigen des Empfängers in jedem Fall'] },
  'lf6:13': { question: 'Welche Ziele gehören zu einer guten Lagerhaltung in der Arztpraxis?', correct: ['Versorgungssicherheit gewährleisten.', 'Verfall und unnötige Verluste vermeiden.', 'Unnötige Kapitalbindung reduzieren.', 'Vorgeschriebene Lagerbedingungen einhalten.'], wrong: ['Möglichst große Mengen unabhängig von Bedarf und Haltbarkeit dauerhaft bevorraten.'] },
  'lf6:16': { correct: ['Kapital × Zinssatz × Tage / (100 × 360)'], wrong: ['Kapital × Zinssatz × Tage / (100 × 365)', 'Kapital × Zinssatz × Tage / 360', 'Kapital + Zinssatz × Tage / 100', 'Kapital × Tage / Zinssatz'] },

  // Lernfeld 7
  'lf7:3': { correct: ['Individuelle Gesundheitsleistungen'], wrong: ['Integrierte Gesundheitsleistungen', 'Individuelle Gebührenleistungen', 'Interne Gesundheitsleistungen', 'Indikationsgebundene Leistungen'] },
  'lf7:4': { question: 'Was sollte vor einer IGeL-Leistung geklärt sein?', correct: ['Welche konkrete Leistung angeboten wird.', 'Welche Kosten entstehen.', 'Dass die Entscheidung freiwillig ist.', 'Welche Informationen zu Nutzen, Risiken und gegebenenfalls Alternativen relevant sind.'], wrong: ['Die Kosten müssen erst nach der Durchführung mitgeteilt werden.'] },
  'lf7:7': { correct: ['Plan – Do – Check – Act'], wrong: ['Plan – Check – Do – Act', 'Do – Plan – Check – Act', 'Check – Plan – Do – Act', 'Plan – Do – Act – Check'] },
  'lf7:12': { question: 'Welche Inhalte gehören typischerweise in eine Stellenbeschreibung?', correct: ['Aufgaben.', 'Verantwortlichkeiten.', 'Erforderliche Qualifikationen.', 'Zuständigkeiten beziehungsweise Einordnung der Stelle.'], wrong: ['Private Vorlieben der Stelleninhaberin oder des Stelleninhabers.'] },
  'lf7:13': { correct: ['Bis Ende Oktober sollen 90 % der Laborbefunde am selben Arbeitstag ärztlich gesichtet sein.'], wrong: ['Die Wartezeiten sollen irgendwann besser werden.', 'Befunde sollen künftig schneller bearbeitet werden.', 'Das Team soll sich bei der Bearbeitung mehr bemühen.', 'Fehler sollen nach Möglichkeit vermieden werden.'] },
  'lf7:14': { correct: ['DO'], wrong: ['PLAN', 'CHECK', 'ACT', 'SMART'] },
  'lf7:15': { correct: ['CHECK'], wrong: ['PLAN', 'DO', 'ACT', 'SMART'] },

  // Lernfeld 8
  'lf8:1': { correct: ['Niere → Harnleiter → Harnblase → Harnröhre'], wrong: ['Niere → Harnblase → Harnleiter → Harnröhre', 'Harnblase → Harnleiter → Niere → Harnröhre', 'Niere → Harnröhre → Harnblase → Harnleiter', 'Harnröhre → Harnblase → Harnleiter → Niere'] },
  'lf8:2': { correct: ['Niere'], wrong: ['Nierenbecken', 'Harnleiter', 'Harnblase', 'Harnröhre'] },
  'lf8:5': { correct: ['eine deutlich erhöhte Urinmenge von meist mehr als etwa 2,5 Litern pro Tag'], wrong: ['häufiges Wasserlassen kleiner Mengen bei normaler Tagesurinmenge', 'eine Urinmenge unter etwa 100 ml pro Tag', 'vorwiegend nächtliches Wasserlassen', 'schmerzhaftes Wasserlassen bei normaler Urinmenge'] },
  'lf8:7': { correct: ['Die erste Urinportion kurz ablaufen lassen und anschließend die mittlere Portion in ein geeignetes Gefäß auffangen.'], wrong: ['Ausschließlich die ersten Tropfen auffangen.', 'Für jede Untersuchung grundsätzlich den gesamten Urin über 24 Stunden sammeln.', 'Mittelstrahlurin kann nur über einen Katheter gewonnen werden.', 'Nur die letzte Urinportion am Ende der Miktion auffangen.'] },
  'lf8:8': { correct: ['28 Tage sind ein häufig verwendetes Lernmodell; individuelle Zykluslängen und der Eisprungzeitpunkt können variieren.'], wrong: ['Jeder Menstruationszyklus dauert exakt 28 Tage.', 'Der Eisprung findet bei jeder Person immer exakt an Zyklustag 14 statt.', 'Die Lutealphase fehlt bei einem normalen Zyklus.', 'Die Menstruationsblutung dauert bei jedem Zyklus exakt 14 Tage.'] },
  'lf8:11': { correct: ['Eröffnungsphase', 'Austreibungsphase', 'Nachgeburtsphase'], wrong: ['Ovulationsphase', 'Lutealphase'] },
  'lf8:16': { question: 'Welche Hormone beziehungsweise hormonellen Funktionen sind mit der Niere verbunden?', correct: ['Erythropoetin.', 'Renin.', 'Aktivierung von Vitamin D zu Calcitriol.'], wrong: ['Insulin wird überwiegend in der Niere gebildet.', 'Thyroxin wird in der Niere produziert.'] },
  'lf8:18': { question: 'Gegen welche der folgenden sexuell übertragbaren Virusinfektionen gibt es eine Impfung?', correct: ['HPV', 'Hepatitis B'], wrong: ['Hepatitis C', 'HIV', 'Herpes genitalis'] },

  // Lernfeld 9
  'lf9:1': { correct: ['Kohlenhydrate', 'Proteine', 'Fette'], wrong: ['Vitamine', 'Mineralstoffe'] },
  'lf9:2': { correct: ['Aminosäuren'], wrong: ['Monosaccharide', 'Fettsäuren', 'Nukleotide', 'Mineralstoffe'] },
  'lf9:3': { correct: ['Amylase'], wrong: ['Pepsin', 'Lipase', 'Trypsin', 'Laktase'] },
  'lf9:4': { correct: ['Dünndarm'], wrong: ['Magen', 'Dickdarm', 'Speiseröhre', 'Mundhöhle'] },
  'lf9:5': { correct: ['Galle speichern und konzentrieren'], wrong: ['Galle bilden', 'Insulin bilden', 'Verdauungsenzyme bilden', 'Stuhl speichern'] },
  'lf9:6': { correct: ['Sonografie'], wrong: ['Computertomografie', 'Magnetresonanztomografie', 'Gastroskopie', 'Röntgenaufnahme'] },
  'lf9:7': { correct: ['Gastroskopie'], wrong: ['Abdomensonografie', 'Koloskopie', 'Computertomografie des Abdomens', 'Abdomen-Röntgen'] },
  'lf9:8': { question: 'Welcher Laborwert ist bei Verdacht auf eine akute Pankreatitis besonders typisch?', correct: ['Lipase'], wrong: ['ALT', 'GGT', 'TSH', 'Kreatinin'] },
  'lf9:9': { correct: ['Blut, das mit bloßem Auge nicht sichtbar ist.'], wrong: ['Frisches, sichtbar hellrotes Blut.', 'Geronnenes Blut in einem sichtbaren Blutkoagel.', 'Eine bakterielle Verunreinigung einer Probe.', 'Blut, das ausschließlich im Urin nachgewiesen werden kann.'] },
  'lf9:10': { correct: ['Laktase'], wrong: ['Amylase', 'Lipase', 'Pepsin', 'Trypsin'] },
  'lf9:11': { correct: ['Rückfluss von Mageninhalt in die Speiseröhre'], wrong: ['Entzündung der Magenschleimhaut', 'Tiefer Gewebsdefekt der Magen- oder Duodenalschleimhaut', 'Entzündung von Divertikeln', 'Abflussbehinderung im Gallengang'] },
  'lf9:12': { correct: ['Ein Ulkus ist ein tiefer reichender Gewebsdefekt; eine Gastritis bezeichnet eine Entzündung der Magenschleimhaut.'], wrong: ['Eine Gastritis reicht grundsätzlich tiefer ins Gewebe als ein Ulkus.', 'Gastritis und Ulkus sind lediglich zwei Begriffe für dieselbe Veränderung.', 'Ein Ulkus entsteht immer durch eine bakterielle Infektion.', 'Eine Gastritis betrifft ausschließlich den Dickdarm.'] },
  'lf9:13': { correct: ['Entzündung vorhandener Divertikel'], wrong: ['Nicht entzündete Divertikel ohne Beschwerden', 'Entzündung des Wurmfortsatzes', 'Entzündung der Bauchspeicheldrüse', 'Entzündung der Gallenblase'] },
  'lf9:14': { correct: ['Wurmfortsatz (Appendix vermiformis)'], wrong: ['gesamter Blinddarm unabhängig vom Wurmfortsatz', 'Gallenblase', 'Bauchspeicheldrüse', 'Bauchfell'] },
  'lf9:16': { correct: ['Er kann in Nachbargewebe invasiv einwachsen und Metastasen bilden.'], wrong: ['Er bleibt definitionsgemäß immer lokal begrenzt.', 'Er kann keine Lymph- oder Blutgefäße infiltrieren.', 'Er ist grundsätzlich vollständig von einer Kapsel umgeben.', 'Er bildet niemals Tochtergeschwülste.'] },
  'lf9:17': { correct: ['Fernmetastasen'], wrong: ['Lokale Ausdehnung des Primärtumors', 'Befall regionaler Lymphknoten', 'Histologisches Grading', 'Resektionsstatus'] },
  'lf9:20': { question: 'Welche Komplikationen können durch Gallensteine entstehen?', correct: ['Cholezystitis.', 'Akute Pankreatitis.', 'Verschlussikterus.', 'Cholangitis.'], wrong: ['Gastritis als direkte typische Folge eines Gallengangverschlusses.'] },
  'lf9:21': { question: 'Welche Aufgaben übernimmt die Leber?', correct: ['Galle bilden.', 'Nährstoffe verarbeiten und speichern.', 'Eiweiße einschließlich Gerinnungsfaktoren bilden.', 'Viele körperfremde und körpereigene Stoffe um- beziehungsweise abbauen.'], wrong: ['Insulin als wichtigstes blutzuckersenkendes Hormon produzieren.'] },
  'lf9:22': { question: 'Gegen welche Formen der Virushepatitis gibt es in Deutschland etablierte Impfungen?', correct: ['Hepatitis A', 'Hepatitis B'], wrong: ['Hepatitis C', 'Hepatitis E als reguläre Standardimpfung in Deutschland', 'Autoimmunhepatitis'] },
  'lf9:23': { correct: ['Funktionsfähiges Lebergewebe wird zunehmend durch fibrotisches beziehungsweise narbiges Gewebe ersetzt.'], wrong: ['Es liegt lediglich eine vorübergehende Fetteinlagerung ohne Fibrose vor.', 'Die Gallenblase verschließt akut den Ductus choledochus.', 'Das Pankreas entzündet sich ohne Veränderung der Leber.', 'Die Leber vergrößert ihre Zahl funktionsfähiger Hepatozyten dauerhaft.'] },
  'lf9:24': { correct: ['Körpergewicht in kg / Körpergröße in m²'], wrong: ['Körpergewicht in kg / Körpergröße in m', 'Körpergröße in m² / Körpergewicht in kg', 'Körpergewicht in kg × Körpergröße in m²', 'Körpergewicht in kg / Lebensalter in Jahren'] },
  'lf9:26': { correct: ['LDL transportiert Cholesterin von der Leber zu Geweben; hohe LDL-Werte können Gefäßablagerungen fördern.'], wrong: ['LDL übernimmt vor allem den Rücktransport von Cholesterin aus Geweben zur Leber.', 'LDL ist ein Verdauungsenzym für Nahrungsfette.', 'LDL ist ein Hormon zur Senkung des Blutzuckers.', 'LDL ist ein Gerinnungsfaktor des Blutplasmas.'] },
  'lf9:27': { correct: ['Ablagerung von Uratkristallen im Gelenk'], wrong: ['Ablagerung von Cholesterinkristallen in den Koronararterien', 'Calciumoxalatkristalle im Nierenbecken', 'Bilirubinsteine in der Gallenblase', 'Eine bakterielle Gelenkinfektion ohne Harnsäurebeteiligung'] },
  'lf9:28': { correct: ['Insulin fördert die Aufnahme und Speicherung von Glukose und senkt dadurch den Blutzucker.'], wrong: ['Insulin mobilisiert Glykogen und erhöht dadurch den Blutzucker.', 'Insulin wird in der Gallenblase gebildet und steuert den Gallefluss.', 'Insulin steigert hauptsächlich die Glukoseneubildung in der Leber.', 'Insulin ist ein Verdauungsenzym des Magens.'] },
  'lf9:29': { correct: ['Glukagon erhöht den Blutzucker, unter anderem durch Mobilisierung von Energiereserven.'], wrong: ['Glukagon senkt den Blutzucker durch verstärkte Glukoseaufnahme in Muskel- und Fettzellen.', 'Glukagon ist ein Verdauungsenzym des Magens.', 'Glukagon ist ein Gerinnungsfaktor.', 'Glukagon ist Bestandteil der Gallenflüssigkeit.'] },
  'lf9:30': { correct: ['Autoimmunbedingte Zerstörung der insulinproduzierenden Betazellen'], wrong: ['Primäre Insulinresistenz bei weiterhin ausreichender Insulinproduktion', 'Adipositas als alleinige unmittelbare Ursache', 'Schwangerschaftshormone als typische Dauerursache', 'Überproduktion von Glukagon bei intakten Betazellen'] },
  'lf9:31': { correct: ['Körperzellen reagieren vermindert auf vorhandenes Insulin.'], wrong: ['Es ist von Beginn an überhaupt kein Insulin im Körper vorhanden.', 'Körperzellen reagieren stärker als normal auf Insulin.', 'Die Bauchspeicheldrüse kann kein Glukagon mehr bilden.', 'Die Niere scheidet Glukose unabhängig vom Blutzucker vollständig aus.'] },
  'lf9:32': { correct: ['Bei deutlich erhöhtem Blutzucker kann Glukose im Urin Wasser osmotisch mitziehen und so die Urinmenge erhöhen.'], wrong: ['Hyperglykämie blockiert die Filtration in den Nieren vollständig.', 'Bei Hyperglykämie wird grundsätzlich kein Wasser mehr über die Niere ausgeschieden.', 'Polyurie entsteht ausschließlich durch eine erhöhte Gallenproduktion.', 'Der erhöhte Blutzucker senkt automatisch die glomeruläre Filtration auf null.'] },
  'lf9:33': { correct: ['die längerfristige Blutzuckerbelastung der vergangenen Wochen bis Monate'], wrong: ['den aktuellen kapillären Blutzucker in diesem Moment', 'die Konzentration von Insulin im Blut', 'die Filtrationsleistung der Niere', 'die Blutgerinnungszeit'] },
  'lf9:34': { correct: ['oraler Glukosetoleranztest (OGTT)'], wrong: ['HbA1c-Bestimmung', 'ein einzelner Nüchternblutzuckerwert', 'Urin-Teststreifen allein', 'Bestimmung der Insulinkonzentration ohne Glukosebelastung'] },
  'lf9:35': { correct: ['Glukose', 'Ketonkörper', 'Albumin'], wrong: ['Nitrit als typischer Diabetes-Langzeitmarker', 'Bilirubin als Standardmarker der Blutzuckereinstellung'] },
  'lf9:37': { correct: ['Koronare Herzkrankheit beziehungsweise Herzinfarkt', 'periphere arterielle Verschlusskrankheit', 'Schlaganfall'], wrong: ['Diabetische Retinopathie', 'Diabetische Nephropathie'] },
  'lf9:38': { correct: ['Neuropathie kann Schmerzen und Warnsignale vermindern.', 'Durchblutungsstörungen können die Wundheilung verschlechtern.', 'Kleine Verletzungen können lange unbemerkt bleiben.'], wrong: ['Wunden heilen bei Diabetes grundsätzlich schneller als bei Stoffwechselgesunden.', 'Ein diabetischer Fuß entsteht ausschließlich durch eine Pilzinfektion.'] },
  'lf9:39': { correct: ['ausgeprägter Flüssigkeitsmangel beziehungsweise Austrocknung'], wrong: ['Flüssigkeitsüberschuss mit generalisierten Ödemen', 'Unterzuckerung', 'Flüssigkeitsansammlung im Bauchraum', 'Entzündung des Bauchfells'] },
  'lf9:40': { correct: ['Schluckstörung beziehungsweise erschwertes Schlucken'], wrong: ['schmerzhaftes Schlucken (Odynophagie)', 'Verdauungsbeschwerden im Oberbauch (Dyspepsie)', 'Durchfall', 'Verstopfung'] },
  'lf9:41': { correct: ['Entzündung des Bauchfells'], wrong: ['Entzündung der Magenschleimhaut', 'Entzündung der Bauchspeicheldrüse', 'Entzündung der Gallenblase', 'Entzündung des Nierenbeckens'] },
  'lf9:42': { correct: ['Mund → Speiseröhre → Magen → Dünndarm → Dickdarm → Enddarm'], wrong: ['Mund → Magen → Speiseröhre → Dünndarm → Dickdarm → Enddarm', 'Mund → Speiseröhre → Dünndarm → Magen → Dickdarm → Enddarm', 'Mund → Speiseröhre → Magen → Dickdarm → Dünndarm → Enddarm', 'Mund → Rachen → Dickdarm → Magen → Dünndarm → Enddarm'] },
  'lf9:43': { correct: ['Divertikulitis → Perforation → Peritonitis'], wrong: ['Divertikulitis → Peritonitis → erst danach Perforation', 'Divertikulitis → Reflux → Peritonitis', 'Divertikulitis → Pankreatitis → Gallenstein', 'Divertikulitis → Hypoglykämie → Peritonitis'] },
  'lf9:44': { correct: ['Starke Bauchschmerzen mit Abwehrspannung und Kreislaufbeeinträchtigung.'], wrong: ['Leichtes Sodbrennen nach einer üppigen Mahlzeit ohne weitere Beschwerden.', 'Seit Monaten unveränderte leichte Blähungen bei stabilem Allgemeinzustand.', 'Einmaliger weicher Stuhl ohne Schmerzen oder Kreislaufveränderung.', 'Kurzzeitiges Hungergefühl vor einer Mahlzeit.'] },
  'lf9:45': { correct: ['Purine → Harnsäure → Uratkristalle → Gelenkentzündung'], wrong: ['Purine → Harnsäure → Calciumoxalatkristalle → Gelenkentzündung', 'Glukose → Harnsäure → Uratkristalle → Gelenkentzündung', 'Purine → Cholesterin → Uratkristalle → Gelenkentzündung', 'Purine → Harnsäure → Uratkristalle → Magenschleimhautentzündung'] },
  'lf9:46': { correct: ['Insulinresistenz kann über längere Zeit bestehen; später kann die Insulinproduktion zusätzlich nachlassen.'], wrong: ['Bei Typ 2 besteht von Beginn an immer ein absoluter Insulinmangel.', 'Typ-2-Diabetes beginnt grundsätzlich abrupt im Kindesalter.', 'Menschen mit Typ 2 benötigen niemals Insulin.', 'Genetische Veranlagung und Lebensstilfaktoren spielen bei Typ 2 keine Rolle.'] },
  'lf9:47': { correct: ['zu niedriger Blutzucker'], wrong: ['zu hoher Blutzucker', 'langfristig erhöhter HbA1c', 'Glukose im Urin bei Hyperglykämie', 'diabetische Ketoazidose'] },
  'lf9:49': { correct: ['Eine einzelne Mahlzeit beeinflusst den HbA1c deutlich weniger als einen aktuellen Blutzuckerwert.'], wrong: ['Der HbA1c zeigt ausschließlich den Blutzucker der letzten fünf Minuten.', 'Der HbA1c steigt und fällt innerhalb weniger Minuten parallel zu jeder Mahlzeit.', 'Der HbA1c misst direkt die Insulinkonzentration.', 'Der HbA1c ist ausschließlich ein Marker der Nierenfunktion.'] },
  'lf9:50': { question: 'Welche Aussagen beschreiben den roten Faden von Lernfeld 9?', correct: ['Verdauung zerlegt Nahrung in resorbierbare Bestandteile.', 'Der Dünndarm ist ein zentraler Ort der Nährstoffresorption.', 'Organfunktionen von Leber, Galle und Pankreas erklären viele typische Krankheitsbilder.', 'Stoffwechsel und Diabetes verbinden Nährstoffverwertung mit Diagnostik und Folgeerkrankungen.'], wrong: ['Die elektrische Erregungsleitung des Herzens ist das zentrale Hauptthema von Lernfeld 9.'] },

  // Lernfeld 10
  'lf10:1': { question: 'Welche Funktionen erfüllt die Haut?', correct: ['Schutzbarriere.', 'Temperaturregulation.', 'Sinneswahrnehmung.', 'Beteiligung an der Vitamin-D-Bildung.'], wrong: ['Aktives Pumpen des Blutes in den Körperkreislauf.'] },
  'lf10:2': { question: 'Welche Aussagen passen zu einer Stichwunde?', correct: ['Die Tiefe kann trotz kleiner Hautöffnung schwer einzuschätzen sein.', 'Tiefe Strukturen können verletzt sein, auch wenn äußerlich wenig zu sehen ist.'], wrong: ['Stichwunden sind grundsätzlich nur oberflächlich.', 'Bei kleiner Eintrittsstelle besteht grundsätzlich kein Infektionsrisiko.', 'Eine ärztliche Beurteilung ist nur nötig, wenn ein Fremdkörper sichtbar stecken bleibt.'] },
  'lf10:3': { question: 'Welche fünf klassischen Entzündungszeichen werden beschrieben?', correct: ['Rötung (Rubor).', 'Überwärmung (Calor).', 'Schwellung (Tumor).', 'Schmerz (Dolor).', 'Funktionsverlust beziehungsweise Funktionseinschränkung (Functio laesa).'], wrong: [] },
  'lf10:4': { correct: ['wenn eine Wunde trotz geeigneter Behandlung innerhalb von etwa 4 bis 12 Wochen nicht abheilt'], wrong: ['bereits nach 24 Stunden ohne vollständigen Wundverschluss', 'grundsätzlich nach exakt einer Woche', 'erst nach mindestens sechs Monaten', 'nur wenn die Wunde seit mehr als einem Jahr besteht'] },
  'lf10:5': { question: 'Welche Merkmale gehören zu einer strukturierten Wundbeurteilung?', correct: ['Größe und Tiefe.', 'Lokalisation und Wundrand.', 'Sekret beziehungsweise Exsudat und Blutung.', 'Schmerz und Entzündungszeichen.'], wrong: ['Haarfarbe des Patienten.'] },
  'lf10:7': { question: 'Welche Punkte gehören zur Sicherheitsprüfung vor einem kleinen Eingriff?', correct: ['Patient eindeutig identifizieren.', 'Geplanten Eingriff und Eingriffsstelle prüfen.', 'Allergien und relevante Medikamente berücksichtigen.', 'Material und Einwilligung prüfen.', 'Erforderliche Hygiene- und Sterilitätsbedingungen sicherstellen.'], wrong: [] },
  'lf10:8': { correct: ['örtliche Schmerzausschaltung in einem begrenzten Bereich'], wrong: ['medikamentöse Beruhigung ohne gezielte Schmerzausschaltung', 'vollständige Bewusstlosigkeit durch Allgemeinanästhesie', 'rein mechanische Ruhigstellung des Körperteils', 'örtliche Hautdesinfektion ohne Anästhetikum'] },
  'lf10:10': { correct: ['Basalzellkarzinom', 'Plattenepithelkarzinom'], wrong: ['Malignes Melanom', 'Aktinische Keratose', 'Benigner melanozytärer Nävus'] },
  'lf10:14': { question: 'Welche Situationen können nach einem Arbeitsunfall eine Vorstellung beim Durchgangsarzt erforderlich machen?', correct: ['Arbeitsunfähigkeit über den Unfalltag hinaus.', 'Voraussichtliche Behandlungsdauer von mehr als einer Woche.', 'Erforderliche Heil- oder Hilfsmittel.', 'Wiedererkrankung aufgrund von Unfallfolgen.'], wrong: ['Eine Bagatellverletzung, die am Unfalltag abschließend versorgt ist und keine weitere Behandlung erfordert.'] },

  // Lernfeld 11
  'lf11:3': { correct: ['grundsätzlich alle drei Jahre'], wrong: ['jährlich', 'alle zwei Jahre', 'alle fünf Jahre', 'nur einmal im Leben'] },
  'lf11:4': { question: 'Welche Bestandteile gehören grundsätzlich zum Check-up?', correct: ['Anamnese und Risikoprofil.', 'Körperliche Untersuchung.', 'Alters- beziehungsweise risikogerechte Laboruntersuchungen nach Programm.', 'Beratung zu Befunden und Risiken.'], wrong: ['Obligatorische Ganzkörper-CT bei allen Versicherten.'] },
  'lf11:5': { correct: ['50 Jahre'], wrong: ['45 Jahre', '55 Jahre', '60 Jahre', '65 Jahre'] },
  'lf11:6': { question: 'Welche regulären Optionen gehören ab 50 zur Darmkrebsfrüherkennung im GKV-Programm?', correct: ['Koloskopie entsprechend dem Früherkennungsprogramm.', 'iFOBT in den vorgesehenen Intervallen als Alternative.'], wrong: ['Jährliche Gastroskopie als Standardverfahren.', 'Abdomensonografie als alleinige Darmkrebsvorsorge.', 'CT-Kolonografie als regulärer Standard für alle Versicherten.'] },
  'lf11:7': { correct: ['50 bis 75 Jahre'], wrong: ['45 bis 69 Jahre', '50 bis 69 Jahre', '55 bis 75 Jahre', 'ab 40 Jahren ohne obere Altersgrenze'] },
  'lf11:10': { question: 'Welche Schritte gehören zu einem sicheren Impfmanagement?', correct: ['Impfstatus prüfen.', 'Aktuelle Empfehlung und Indikation prüfen.', 'Impfstoff, Verfallsdatum und Lagerbedingungen kontrollieren.', 'Durchführung vollständig dokumentieren.'], wrong: ['Chargennummer und Produktangaben bei der Dokumentation bewusst weglassen.'] },
  'lf11:12': { question: 'Was ist bei einer IGeL besonders wichtig?', correct: ['Freiwillige Entscheidung.', 'Kosten vor der Durchführung transparent machen.', 'Verständlich über die angebotene Leistung informieren.', 'Vereinbarung beziehungsweise Einwilligung vor der Leistung klären.'], wrong: ['Den Patienten durch Zeitdruck zur sofortigen Entscheidung bewegen.'] },
  'lf11:15': { question: 'Was können Selbsthilfegruppen sinnvoll leisten?', correct: ['Erfahrungsaustausch.', 'Gegenseitige Unterstützung.', 'Alltagsnahe Bewältigungsstrategien.', 'Orientierung zu weiteren seriösen Hilfsangeboten.'], wrong: ['Ärztliche Diagnostik und Therapie grundsätzlich vollständig ersetzen.'] },
  'lf11:17': { correct: ['Beschwerden werden diagnostisch abgeklärt und nicht bis zum nächsten regulären Screeningtermin aufgeschoben.'], wrong: ['Bei Beschwerden wird grundsätzlich bis zum nächsten Recall gewartet.', 'Screening ersetzt bei vorhandenen Symptomen jede diagnostische Abklärung.', 'Die MFA stellt bei Beschwerden selbstständig die endgültige Diagnose.', 'Beschwerden spielen für die Entscheidung über weitere Abklärung keine Rolle.'] },
  'lf11:18': { question: 'Welche Aussagen unterscheiden Prävention und Früherkennung richtig?', correct: ['Prävention ist der übergeordnete Begriff für Maßnahmen zur Verhinderung beziehungsweise Verringerung gesundheitlicher Risiken und Folgen.', 'Früherkennung soll Erkrankungen oder Vorstufen möglichst früh entdecken.', 'Früherkennung wird überwiegend der Sekundärprävention zugeordnet.'], wrong: ['Früherkennung bedeutet ausschließlich Rehabilitation nach bereits eingetretenen Folgeschäden.', 'Prävention findet grundsätzlich erst nach gesicherter Erkrankung statt.'] },

  // Lernfeld 12
  'lf12:1': { correct: ['Eigene Stärken, Interessen, Erfahrungen und die berufliche Ausgangslage klären.'], wrong: ['Sofort irgendeine Weiterbildung buchen, bevor ein Ziel feststeht.', 'Nur das mögliche Gehalt betrachten und Tätigkeitsinhalte ausblenden.', 'Zuerst kündigen und erst danach berufliche Optionen prüfen.', 'Ausschließlich nach dem kürzesten Bildungsangebot auswählen.'] },
  'lf12:2': { question: 'Welche Unterlagen gehören typischerweise zu einer vollständigen Bewerbung?', correct: ['Anschreiben beziehungsweise Motivationsschreiben, wenn verlangt oder sinnvoll.', 'Tabellarischer Lebenslauf.', 'Relevante Schul-, Ausbildungs- und Arbeitszeugnisse.'], wrong: ['Private Chatverläufe mit früheren Kolleginnen und Kollegen.', 'Vollständige interne Patientenunterlagen aus dem bisherigen Betrieb.'] },
  'lf12:3': { question: 'Was sollte für ein Vorstellungsgespräch vorbereitet werden?', correct: ['Eigene Motivation für die Stelle.', 'Der eigene Lebenslauf und passende Beispiele aus bisherigen Erfahrungen.', 'Informationen über Arbeitgeber und Stelle.', 'Eigene Fragen an den Arbeitgeber.', 'Rahmenbedingungen wie möglicher Eintrittstermin oder Gehaltsvorstellung, wenn sie im Gespräch relevant werden.'], wrong: [] },
  'lf12:4': { correct: ['wenn Tarifbindung besteht oder der Tarifvertrag wirksam in den Arbeitsvertrag einbezogen wurde'], wrong: ['automatisch in jeder deutschen Arztpraxis unabhängig vom Arbeitsvertrag', 'nur in Krankenhäusern, aber niemals in Arztpraxen', 'nur wenn die beschäftigte Person Mitglied einer Krankenkasse ist', 'erst ab zehn Jahren Betriebszugehörigkeit'] },
  'lf12:5': { correct: ['29 Arbeitstage'], wrong: ['28 Arbeitstage', '30 Arbeitstage', '31 Arbeitstage unabhängig vom Alter', '24 Arbeitstage'] },
  'lf12:6': { correct: ['Ein qualifiziertes Arbeitszeugnis enthält zusätzlich zur Art und Dauer der Tätigkeit auch Angaben zu Leistung und Verhalten.'], wrong: ['Ein qualifiziertes Zeugnis nennt ausschließlich Art und Dauer der Beschäftigung.', 'Ein qualifiziertes Zeugnis ist eine Gehaltsabrechnung mit Tätigkeitsbeschreibung.', 'Leistung und Verhalten dürfen in einem qualifizierten Zeugnis grundsätzlich nicht erwähnt werden.', 'Ein qualifiziertes Zeugnis besteht nur aus einer Tätigkeitsliste ohne Bewertung.'] },
  'lf12:7': { correct: ['8 Stunden'], wrong: ['6 Stunden', '10 Stunden als allgemeiner Grundsatz ohne Ausgleich', '12 Stunden', '14 Stunden'] },
  'lf12:8': { correct: ['30 Minuten'], wrong: ['15 Minuten', '45 Minuten', '60 Minuten', 'keine Pause'] },
  'lf12:9': { correct: ['11 Stunden'], wrong: ['8 Stunden', '9 Stunden', '10 Stunden', '12 Stunden als allgemeiner gesetzlicher Grundsatz'] },
  'lf12:10': { correct: ['bis zu 6 Wochen'], wrong: ['bis zu 2 Wochen', 'bis zu 4 Wochen', 'bis zu 8 Wochen als allgemeiner Grundsatz', 'immer bis zur vollständigen Genesung ohne zeitliche Begrenzung'] },
  'lf12:12': { correct: ['Entgelt vor den ausgewiesenen gesetzlichen und individuellen Abzügen'], wrong: ['Auszahlungsbetrag nach allen Abzügen', 'Arbeitgeberbrutto einschließlich aller zusätzlichen Arbeitgeberkosten', 'ausschließlich der vertragliche Grundlohn ohne weitere Entgeltbestandteile', 'nur der steuerpflichtige Teil des Entgelts unabhängig von anderen Bruttobestandteilen'] },
  'lf12:13': { correct: ['weil sich gesetzliche Beitragssätze und Grenzwerte ändern können'], wrong: ['weil Sozialversicherungsbeiträge nach Ausbildungsende nicht mehr gelten', 'weil nur Steuersätze veränderlich sind, Sozialversicherungsbeiträge aber nie', 'weil ausschließlich Arbeitgeber aktuelle Beitragssätze kennen müssen', 'weil frühere gesetzliche Werte automatisch für alle späteren Jahre fortgelten'] },
  'lf12:14': { correct: ['gesetzliche Rentenversicherung', 'betriebliche Altersversorgung', 'private Altersvorsorge'], wrong: ['Arbeitslosenversicherung', 'Pflegeversicherung'] },
  'lf12:15': { question: 'Welche Punkte sollte man bei einer Weiterbildung vergleichen?', correct: ['Ziel und anerkannter Abschluss.', 'Zulassungs- und Teilnahmevoraussetzungen.', 'Zeitaufwand.', 'Kosten und Fördermöglichkeiten.', 'Beruflicher Nutzen für das eigene Ziel.'], wrong: [] },
  'lf12:17': { question: 'Welche Reaktionen auf anhaltende Arbeitsüberlastung sind professionell?', correct: ['Kapazitätsprobleme früh ansprechen.', 'Aufgaben nach Dringlichkeit und Patientensicherheit priorisieren.', 'Zuständigkeiten und Unterstützung im Team klären.'], wrong: ['Fehler und Beinahe-Fehler verschweigen, solange noch kein Schaden entstanden ist.', 'Pausen dauerhaft auslassen, um die Arbeitsmenge zu kompensieren.'] },
  'lf12:18': { question: 'Welche Aussagen unterscheiden gesetzlichen Mindesturlaub und tariflichen Urlaub richtig?', correct: ['Das Gesetz legt einen Mindestschutz fest.', 'Ein anwendbarer Tarifvertrag kann einen höheren Urlaubsanspruch vorsehen.', 'Welcher tarifliche Anspruch gilt, hängt von Tarifbindung beziehungsweise wirksamer vertraglicher Einbeziehung ab.'], wrong: ['Ein Tarifvertrag darf den gesetzlichen Mindesturlaub beliebig unterschreiten.', 'Bei Tarifbindung entfällt der gesetzliche Mindestschutz vollständig.'] },
};

function optionList(correct: string[], wrong: string[], seed: number): QuizOption[] {
  const entries = [
    ...correct.map(text => ({ text, correct: true })),
    ...wrong.map(text => ({ text, correct: false })),
  ];
  if (entries.length !== 5) throw new Error(`Question quality patch must contain exactly five options; got ${entries.length}.`);
  const shift = Math.abs(seed) % entries.length;
  const rotated = [...entries.slice(shift), ...entries.slice(0, shift)];
  return rotated.map((entry, index) => ({ id: String.fromCharCode(97 + index), ...entry }));
}

export function polishQuestionContent(module: LearningModule): LearningModule {
  return {
    ...module,
    questions: module.questions.map(question => {
      const patch = patches[`${module.id}:${question.id}`];
      if (!patch) return question;
      return {
        ...question,
        question: patch.question || question.question,
        type: patch.correct.length > 1 ? 'multiple' : 'single',
        options: optionList(patch.correct, patch.wrong, module.number * 100 + question.id),
        correctAnswer: undefined,
        explanation: patch.explanation || question.explanation,
      };
    }),
  };
}
