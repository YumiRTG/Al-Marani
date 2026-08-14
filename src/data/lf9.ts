import type { LearningModule, TopicContent } from '@/types';

const svg = (content: string) => `data:image/svg+xml;utf8,${encodeURIComponent(content)}`;

const practice = (title: string, items: string[]): TopicContent[] => [
  { type: 'heading', title: `✍️ Übung direkt danach – ${title}` },
  { type: 'list', items },
];

const lesson = (number: number, focus: string, goals: string): TopicContent => ({
  type: 'info',
  title: `Doppelstunde ${number} • ca. 120 Minuten`,
  text: `${focus} Lernziel: ${goals}`,
});

const hero = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="520" viewBox="0 0 1200 520"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#0f766e"/><stop offset="1" stop-color="#38bdf8"/></linearGradient></defs><rect width="1200" height="520" fill="#f8fafc"/><circle cx="180" cy="245" r="145" fill="#ccfbf1"/><path d="M150 120 C225 125 275 180 275 245 C275 320 220 375 145 375 C110 375 90 345 100 315 C110 285 140 265 145 235 C151 205 120 175 120 150 C120 132 132 121 150 120Z" fill="#f59e0b" opacity=".9"/><path d="M480 130 C550 90 650 100 705 160 C755 215 745 305 685 355 C625 405 520 390 475 315 C440 255 440 165 480 130Z" fill="#fee2e2" stroke="#ef4444" stroke-width="5"/><rect x="815" y="115" width="285" height="285" rx="35" fill="url(#g)" opacity=".12"/><path d="M865 165 H1045 M865 215 H1015 M865 265 H1050 M865 315 H1000" stroke="#0f766e" stroke-width="18" stroke-linecap="round" opacity=".55"/><text x="600" y="465" text-anchor="middle" font-size="36" font-family="Arial" font-weight="700" fill="#0f172a">Ernährung • Verdauung • Stoffwechsel • Diabetes</text></svg>`);

const nutrients = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Nährstoffe – Funktion, Baustein, Verdauung</text><g font-family="Arial" text-anchor="middle"><circle cx="180" cy="225" r="115" fill="#e0f2fe"/><text x="180" y="195" font-size="24" font-weight="700">Kohlenhydrate</text><text x="180" y="235" font-size="18">Energie</text><text x="180" y="270" font-size="17">→ Glukose</text><circle cx="550" cy="225" r="115" fill="#fee2e2"/><text x="550" y="195" font-size="24" font-weight="700">Proteine</text><text x="550" y="235" font-size="18">Baustoff</text><text x="550" y="270" font-size="17">→ Aminosäuren</text><circle cx="920" cy="225" r="115" fill="#fef3c7"/><text x="920" y="195" font-size="24" font-weight="700">Fette</text><text x="920" y="235" font-size="18">Speicher</text><text x="920" y="270" font-size="17">→ Fettsäuren + Glycerin</text></g><text x="550" y="420" text-anchor="middle" font-size="22" font-family="Arial" fill="#475569">Vitamine und Mineralstoffe liefern keine Energie, sind aber für Regulation und Aufbau unverzichtbar.</text></svg>`);

const digestion = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="500" viewBox="0 0 1100 500"><rect width="1100" height="500" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Weg der Nahrung</text><g font-family="Arial" text-anchor="middle"><rect x="40" y="185" width="150" height="85" rx="18" fill="#ccfbf1"/><text x="115" y="235" font-size="21">Mund</text><rect x="220" y="185" width="160" height="85" rx="18" fill="#e0f2fe"/><text x="300" y="235" font-size="21">Speiseröhre</text><rect x="410" y="185" width="150" height="85" rx="18" fill="#fef3c7"/><text x="485" y="235" font-size="21">Magen</text><rect x="590" y="185" width="150" height="85" rx="18" fill="#dcfce7"/><text x="665" y="235" font-size="21">Dünndarm</text><rect x="770" y="185" width="150" height="85" rx="18" fill="#ede9fe"/><text x="845" y="235" font-size="21">Dickdarm</text><rect x="950" y="185" width="110" height="85" rx="18" fill="#fee2e2"/><text x="1005" y="235" font-size="19">Enddarm</text></g><g stroke="#64748b" stroke-width="4"><path d="M190 227H220M380 227H410M560 227H590M740 227H770M920 227H950"/></g><text x="550" y="365" text-anchor="middle" font-size="24" font-family="Arial" font-weight="700" fill="#0f766e">mechanisch zerkleinern → chemisch spalten → resorbieren → Wasser entziehen → ausscheiden</text></svg>`);

const organTeam = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Leber, Gallenblase und Pankreas</text><ellipse cx="290" cy="235" rx="185" ry="115" fill="#fecaca" stroke="#ef4444" stroke-width="4"/><text x="290" y="220" text-anchor="middle" font-size="27" font-family="Arial" font-weight="700">Leber</text><text x="290" y="260" text-anchor="middle" font-size="18" font-family="Arial">bildet Galle • Stoffwechsel • Speicherung</text><ellipse cx="550" cy="285" rx="75" ry="90" fill="#dcfce7" stroke="#16a34a" stroke-width="4"/><text x="550" y="275" text-anchor="middle" font-size="21" font-family="Arial" font-weight="700">Gallenblase</text><text x="550" y="310" text-anchor="middle" font-size="15" font-family="Arial">speichert Galle</text><path d="M710 205 C820 160 945 185 990 245 C930 320 810 335 700 285Z" fill="#fef3c7" stroke="#d97706" stroke-width="4"/><text x="845" y="245" text-anchor="middle" font-size="25" font-family="Arial" font-weight="700">Pankreas</text><text x="845" y="283" text-anchor="middle" font-size="17" font-family="Arial">Enzyme • Bicarbonat • Insulin/Glukagon</text></svg>`);

const diagnostics = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Diagnostik im Abdomen – jede Methode beantwortet eine andere Frage</text><g font-family="Arial" text-anchor="middle"><rect x="65" y="145" width="220" height="190" rx="24" fill="#e0f2fe"/><text x="175" y="195" font-size="23" font-weight="700">Sonografie</text><text x="175" y="240" font-size="17">Schallwellen</text><text x="175" y="275" font-size="17">Organe von außen</text><rect x="325" y="145" width="220" height="190" rx="24" fill="#dcfce7"/><text x="435" y="195" font-size="23" font-weight="700">Endoskopie</text><text x="435" y="240" font-size="17">Kamera + Licht</text><text x="435" y="275" font-size="17">Schleimhaut direkt</text><rect x="585" y="145" width="220" height="190" rx="24" fill="#fef3c7"/><text x="695" y="195" font-size="23" font-weight="700">Labor</text><text x="695" y="240" font-size="17">Leber / Galle</text><text x="695" y="275" font-size="17">Pankreas / Gerinnung</text><rect x="845" y="145" width="190" height="190" rx="24" fill="#fee2e2"/><text x="940" y="195" font-size="23" font-weight="700">Stuhltest</text><text x="940" y="240" font-size="17">okkultes Blut</text><text x="940" y="275" font-size="17">Probe</text></g></svg>`);

const ulcerReflux = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Oberer Verdauungstrakt – drei unterschiedliche Probleme</text><g font-family="Arial" text-anchor="middle"><rect x="65" y="145" width="300" height="220" rx="25" fill="#e0f2fe"/><text x="215" y="195" font-size="24" font-weight="700">Reflux</text><text x="215" y="240" font-size="17">Mageninhalt fließt</text><text x="215" y="270" font-size="17">in die Speiseröhre zurück</text><rect x="400" y="145" width="300" height="220" rx="25" fill="#fef3c7"/><text x="550" y="195" font-size="24" font-weight="700">Gastritis</text><text x="550" y="240" font-size="17">Entzündung der</text><text x="550" y="270" font-size="17">Magenschleimhaut</text><rect x="735" y="145" width="300" height="220" rx="25" fill="#fee2e2"/><text x="885" y="195" font-size="24" font-weight="700">Ulkus</text><text x="885" y="240" font-size="17">tiefer Gewebsdefekt</text><text x="885" y="270" font-size="17">Blutung möglich</text></g></svg>`);

const lowerGi = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Unterer Verdauungstrakt – typische Prüfungsbilder</text><g font-family="Arial" text-anchor="middle"><rect x="60" y="145" width="235" height="210" rx="24" fill="#ede9fe"/><text x="177" y="195" font-size="22" font-weight="700">Divertikulitis</text><text x="177" y="240" font-size="17">Entzündung</text><text x="177" y="275" font-size="17">Perforation möglich</text><rect x="325" y="145" width="235" height="210" rx="24" fill="#fee2e2"/><text x="442" y="195" font-size="22" font-weight="700">Appendizitis</text><text x="442" y="240" font-size="17">Wurmfortsatz</text><text x="442" y="275" font-size="17">OP häufig nötig</text><rect x="590" y="145" width="235" height="210" rx="24" fill="#fef3c7"/><text x="707" y="195" font-size="22" font-weight="700">Akutes Abdomen</text><text x="707" y="240" font-size="17">Warnbild</text><text x="707" y="275" font-size="17">Notfallabklärung</text><rect x="855" y="145" width="190" height="210" rx="24" fill="#dcfce7"/><text x="950" y="195" font-size="22" font-weight="700">Hämorrhoiden</text><text x="950" y="240" font-size="17">Juckreiz / Blut</text><text x="950" y="275" font-size="17">Proktoskopie</text></g></svg>`);

const cancer = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Krebs verstehen: Verhalten → Stadium → Therapie</text><g font-family="Arial" text-anchor="middle"><rect x="60" y="170" width="200" height="120" rx="22" fill="#fee2e2"/><text x="160" y="215" font-size="22" font-weight="700">Primärtumor</text><text x="160" y="255" font-size="17">Ursprungsort</text><rect x="330" y="170" width="200" height="120" rx="22" fill="#fef3c7"/><text x="430" y="215" font-size="22" font-weight="700">TNM</text><text x="430" y="255" font-size="17">T • N • M</text><rect x="600" y="170" width="200" height="120" rx="22" fill="#e0f2fe"/><text x="700" y="215" font-size="22" font-weight="700">Metastasen</text><text x="700" y="255" font-size="17">Absiedlungen</text><rect x="870" y="170" width="170" height="120" rx="22" fill="#dcfce7"/><text x="955" y="215" font-size="22" font-weight="700">Therapie</text><text x="955" y="255" font-size="17">OP • Strahl • Medikamente</text></g><g stroke="#64748b" stroke-width="4"><path d="M260 230H330M530 230H600M800 230H870"/></g></svg>`);

const liverPath = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Chronische Leberschädigung – möglicher Verlauf</text><g font-family="Arial" text-anchor="middle"><rect x="70" y="170" width="200" height="110" rx="22" fill="#fef3c7"/><text x="170" y="215" font-size="22" font-weight="700">Fettleber</text><text x="170" y="250" font-size="16">Fetteinlagerung</text><rect x="330" y="170" width="200" height="110" rx="22" fill="#fee2e2"/><text x="430" y="215" font-size="22" font-weight="700">Hepatitis</text><text x="430" y="250" font-size="16">Entzündung</text><rect x="590" y="170" width="200" height="110" rx="22" fill="#e0f2fe"/><text x="690" y="215" font-size="22" font-weight="700">Fibrose</text><text x="690" y="250" font-size="16">Narbengewebe</text><rect x="850" y="170" width="180" height="110" rx="22" fill="#ede9fe"/><text x="940" y="215" font-size="22" font-weight="700">Zirrhose</text><text x="940" y="250" font-size="16">Umbau + Funktionsverlust</text></g><g stroke="#64748b" stroke-width="4"><path d="M270 225H330M530 225H590M790 225H850"/></g><text x="550" y="385" text-anchor="middle" font-size="21" font-family="Arial" fill="#475569">Nicht jede Fettleber schreitet so fort – die Grafik zeigt eine mögliche Komplikationskette.</text></svg>`);

const metabolic = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Metabolisches Syndrom – Risikofaktoren verstärken sich</text><circle cx="550" cy="260" r="85" fill="#ccfbf1" stroke="#0d9488" stroke-width="4"/><text x="550" y="250" text-anchor="middle" font-size="21" font-family="Arial" font-weight="700">metabolisches</text><text x="550" y="280" text-anchor="middle" font-size="21" font-family="Arial" font-weight="700">Syndrom</text><g font-family="Arial" text-anchor="middle"><rect x="75" y="120" width="230" height="95" rx="20" fill="#fee2e2"/><text x="190" y="175" font-size="20">Adipositas</text><rect x="795" y="120" width="230" height="95" rx="20" fill="#e0f2fe"/><text x="910" y="175" font-size="20">Hyperlipidämie</text><rect x="75" y="330" width="230" height="95" rx="20" fill="#fef3c7"/><text x="190" y="385" font-size="20">Hypertonie</text><rect x="795" y="330" width="230" height="95" rx="20" fill="#dcfce7"/><text x="910" y="385" font-size="20">Typ-2-Diabetes</text></g><g stroke="#64748b" stroke-width="4"><path d="M305 170L480 225M795 170L620 225M305 380L480 300M795 380L620 300"/></g></svg>`);

const lipidsGout = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Blutfette und Gicht – zwei Stoffwechselketten</text><g font-family="Arial"><rect x="60" y="130" width="460" height="270" rx="26" fill="#e0f2fe"/><text x="290" y="180" text-anchor="middle" font-size="24" font-weight="700">Hyperlipidämie</text><text x="100" y="230" font-size="19">LDL hoch → Ablagerungen → Plaque</text><text x="100" y="275" font-size="19">→ Gefäßverengung → KHK / pAVK / Schlaganfall</text><text x="100" y="330" font-size="18">HDL transportiert Cholesterin zurück Richtung Leber.</text><rect x="580" y="130" width="460" height="270" rx="26" fill="#fef3c7"/><text x="810" y="180" text-anchor="middle" font-size="24" font-weight="700">Gicht</text><text x="620" y="230" font-size="19">Purine → Harnsäure → Uratkristalle</text><text x="620" y="275" font-size="19">→ Gelenkentzündung / Arthritis urica</text><text x="620" y="330" font-size="18">klassisch: Großzehengrundgelenk</text></g></svg>`);

const glucose = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Insulin und Glukagon – Gegenspieler</text><rect x="120" y="160" width="260" height="170" rx="25" fill="#e0f2fe"/><text x="250" y="205" text-anchor="middle" font-size="25" font-family="Arial" font-weight="700">Blutzucker steigt</text><text x="250" y="255" text-anchor="middle" font-size="18" font-family="Arial">nach Mahlzeit</text><rect x="740" y="160" width="260" height="170" rx="25" fill="#fef3c7"/><text x="870" y="205" text-anchor="middle" font-size="25" font-family="Arial" font-weight="700">Blutzucker fällt</text><text x="870" y="255" text-anchor="middle" font-size="18" font-family="Arial">zwischen Mahlzeiten</text><circle cx="550" cy="245" r="105" fill="#dcfce7" stroke="#16a34a" stroke-width="4"/><text x="550" y="225" text-anchor="middle" font-size="22" font-family="Arial" font-weight="700">Pankreas</text><text x="550" y="260" text-anchor="middle" font-size="18" font-family="Arial">Insulin ↓ Blutzucker</text><text x="550" y="292" text-anchor="middle" font-size="18" font-family="Arial">Glukagon ↑ Blutzucker</text><g stroke="#64748b" stroke-width="5"><path d="M380 245H445M655 245H740"/></g></svg>`);

const diabetes = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Diabetes Typ 1 und Typ 2 – Kernunterschied</text><g font-family="Arial"><rect x="80" y="130" width="430" height="260" rx="28" fill="#fee2e2"/><text x="295" y="185" text-anchor="middle" font-size="27" font-weight="700">Typ 1</text><text x="120" y="235" font-size="19">• Autoimmunreaktion</text><text x="120" y="275" font-size="19">• Betazellen werden zerstört</text><text x="120" y="315" font-size="19">• absoluter Insulinmangel</text><text x="120" y="355" font-size="19">• Insulin von Beginn an nötig</text><rect x="590" y="130" width="430" height="260" rx="28" fill="#e0f2fe"/><text x="805" y="185" text-anchor="middle" font-size="27" font-weight="700">Typ 2</text><text x="630" y="235" font-size="19">• Insulin zunächst vorhanden</text><text x="630" y="275" font-size="19">• Zellen reagieren schlechter</text><text x="630" y="315" font-size="19">• Insulinresistenz</text><text x="630" y="355" font-size="19">• später Insulinmangel möglich</text></g></svg>`);

const diabetesComplications = svg(`<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="520" viewBox="0 0 1100 520"><rect width="1100" height="520" rx="30" fill="#f8fafc"/><text x="550" y="55" text-anchor="middle" font-size="30" font-family="Arial" font-weight="700">Diabetesfolgen – nach Gefäßgröße und Organ denken</text><g font-family="Arial" text-anchor="middle"><rect x="80" y="140" width="440" height="260" rx="28" fill="#e0f2fe"/><text x="300" y="190" font-size="25" font-weight="700">Mikroangiopathie</text><text x="300" y="245" font-size="19">Retinopathie → Auge</text><text x="300" y="290" font-size="19">Nephropathie → Niere</text><text x="300" y="335" font-size="19">Neuropathie → Nerven</text><rect x="580" y="140" width="440" height="260" rx="28" fill="#fee2e2"/><text x="800" y="190" font-size="25" font-weight="700">Makroangiopathie</text><text x="800" y="245" font-size="19">KHK / Herzinfarkt</text><text x="800" y="290" font-size="19">pAVK</text><text x="800" y="335" font-size="19">Schlaganfall</text></g></svg>`);

export const lf9: LearningModule = {
  id: 'lf9',
  number: 9,
  title: 'Ernährung, Verdauung & Stoffwechsel',
  subtitle: '10 ausführliche Doppelstunden: Nährstoffe, Verdauung, Diagnostik, Magen-Darm-Erkrankungen, Tumore, Leber/Galle/Pankreas, metabolisches Syndrom und Diabetes',
  description: 'Kompletter Lernfeld-9-Kurs für Auszubildende ohne Vorwissen. Jeder kleine Themenblock enthält zuerst eine ausführliche Erklärung, dann sofort eine kurze Übung. Alle bisher verwendeten Aufgaben und Videos sind integriert und die geplanten Folgestunden wurden zu insgesamt zehn 120-Minuten-Einheiten ausgebaut.',
  difficulty: 'advanced',
  icon: 'stethoscope',
  heroImage: hero,
  topics: [
    {
      id: 'lf9-01-naehrstoffe',
      title: '1. Nährstoffe – Kohlenhydrate, Proteine, Fette, Vitamine & Mineralstoffe',
      content: [
        lesson(1, 'Wir starten ganz vorne und bearbeiten nicht alle Nährstoffe am Stück. Jeder Nährstoff wird erklärt und direkt danach geübt.', 'Die Auszubildende kann Funktion, Bausteine, Lebensmittelbeispiele und Verdauungsprinzipien der wichtigsten Nährstoffgruppen erklären.'),
        { type: 'image', src: nutrients, alt: 'Nährstoffe als Übersicht', caption: 'Die drei Makronährstoffe zuerst nach ihrer Hauptfunktion unterscheiden.' },

        { type: 'heading', title: '1.1 Kohlenhydrate – vom Brot zur Glukose' },
        { type: 'text', text: 'Kohlenhydrate sind eine wichtige Energiequelle. Sie bestehen aus Zuckerbausteinen. Ein Einfachzucker wie Glukose kann direkt aufgenommen werden. Zweifachzucker wie Laktose müssen zunächst gespalten werden. Stärke besteht aus vielen miteinander verbundenen Glukosebausteinen und zählt deshalb zu den Mehrfachzuckern. Verdauungsenzyme zerlegen größere Kohlenhydrate schrittweise, damit die entstehenden kleinen Zuckerbausteine im Dünndarm resorbiert werden können.' },
        { type: 'table', headers: ['Begriff', 'Aufbau', 'Beispiel'], rows: [['Glukose','Einfachzucker','Traubenzucker; Endprodukt vieler KH'],['Laktose','Zweifachzucker','Milchzucker'],['Stärke','Mehrfachzucker','Brot, Kartoffeln, Reis']] },
        ...practice('Kohlenhydrate', [
          'Bisherige Aufgabe: Ordne Glukose = Einfachzucker, Laktose = Zweifachzucker und Stärke = Mehrfachzucker.',
          'Erkläre in einem Satz, warum Stärke vor der Aufnahme verdaut werden muss.',
          'Eine Patientin isst Brot. Beschreibe, welches kleine Molekül aus vielen Stärkeanteilen am Ende entstehen kann.',
          'Markiere: Energiequelle / Baustoff für Antikörper / Gallenfarbstoff. Welche Funktion passt am besten zu Kohlenhydraten?'
        ]),

        { type: 'heading', title: '1.2 Proteine – Baustoffe aus Aminosäuren' },
        { type: 'text', text: 'Proteine bestehen aus Aminosäuren. Der Körper benötigt sie zum Aufbau und zur Erneuerung von Gewebe. Außerdem bestehen zahlreiche Enzyme, Transportproteine, Antikörper und einige Hormone aus Proteinen oder enthalten Proteinbestandteile. Essenzielle Aminosäuren kann der Körper nicht in ausreichender Menge selbst herstellen; sie müssen mit der Nahrung aufgenommen werden. Bei der Verdauung werden Proteine durch Proteasen bis zu kleineren Peptiden und Aminosäuren zerlegt.' },
        { type: 'info', title: 'Merksatz', text: 'Protein = Kette aus Aminosäuren. Verdauung schneidet die Kette in kleine Bausteine.' },
        ...practice('Proteine', [
          'Bisherige Aufgabe: Vervollständige „Proteine bestehen aus …“.',
          'Nenne drei Aufgaben von Proteinen im Körper.',
          'Was bedeutet „essenziell“ bei einer Aminosäure?',
          'Ordne zu: Muskelgewebe / Antikörper / Enzyme / schnelle Zuckerenergie. Welche drei Begriffe passen besonders zum Proteinwissen?'
        ]),

        { type: 'heading', title: '1.3 Fette – Energiespeicher und mehr' },
        { type: 'text', text: 'Fette liefern besonders viel Energie und dienen als langfristiger Energiespeicher. Sie polstern Organe, isolieren gegen Kälte und sind Bestandteil von Zellmembranen. Nahrungsfette liegen häufig als Triglyceride vor. Ein Triglycerid besteht aus einem Glycerinmolekül und drei Fettsäuren. Bei der Fettverdauung verteilt die Galle große Fettmengen in kleine Tröpfchen. Dadurch kann die Lipase besser angreifen. Auch die fettlöslichen Vitamine A, D, E und K benötigen Nahrungsfett für eine gute Aufnahme.' },
        ...practice('Fette', [
          'Bisherige Aufgabe: Aus welchen zwei Bausteinarten besteht ein Triglycerid?',
          'Warum erleichtert Galle die Fettverdauung, obwohl Galle selbst kein Verdauungsenzym ist?',
          'Warum ist Fett für die Aufnahme der Vitamine A, D, E und K wichtig?',
          'Nenne zwei Körperfunktionen von Fett, die nichts mit Energieversorgung zu tun haben.'
        ]),

        { type: 'heading', title: '1.4 Vitamine – fettlöslich oder wasserlöslich?' },
        { type: 'text', text: 'Vitamine liefern keine Energie. Sie werden in kleinen Mengen benötigt und unterstützen zahlreiche Stoffwechselprozesse. Die Vitamine A, D, E und K sind fettlöslich. Vitamin C und die B-Vitamine sind wasserlöslich. Für die Ausbildung ist vor allem wichtig, die beiden Gruppen zu unterscheiden und typische Funktionen zu kennen, ohne jedes einzelne Vitamin bis ins Detail auswendig zu lernen.' },
        { type: 'table', headers: ['Gruppe', 'Vitamine', 'Lernidee'], rows: [['fettlöslich','A, D, E, K','ADEK merken'],['wasserlöslich','B-Gruppe, C','werden anders gespeichert/ausgeschieden']] },
        ...practice('Vitamine', [
          'Bisherige Aufgabe: Bilde eine eigene Eselsbrücke für A-D-E-K.',
          'Ordne Vitamin C und Vitamin D den Gruppen wasserlöslich/fettlöslich zu.',
          'Warum ist der Satz „Vitamine liefern Energie“ falsch?'
        ]),

        { type: 'heading', title: '1.5 Mineralstoffe und Spurenelemente' },
        { type: 'text', text: 'Mineralstoffe und Spurenelemente sind anorganische Stoffe. Sie liefern keine Energie, erfüllen aber wichtige Aufgaben. Calcium ist wichtig für Knochen und Zähne, Magnesium unter anderem für Muskel- und Nervenfunktion, Eisen für den Sauerstofftransport im Hämoglobin und Jod für die Bildung von Schilddrüsenhormonen. Spurenelemente werden nur in sehr kleinen Mengen benötigt.' },
        ...practice('Mineralstoffe', [
          'Bisherige Aufgabe: Ordne Calcium → Knochen/Zähne, Eisen → Sauerstofftransport, Magnesium → Muskeln/Nerven, Jod → Schilddrüse.',
          'Eine Patientin mit Eisenmangel fragt, warum sie müde sein könnte. Stelle den Zusammenhang mit dem Sauerstofftransport her.',
          'Welche zwei Stoffe aus diesem Block liefern keine Energie: Eisen / Stärke / Vitamin C / Fett?'
        ]),

        { type: 'video', title: 'Videoabschluss: Wie funktioniert das Verdauungssystem?', source: 'Stiftung Gesundheitswissen', duration: '2:26 Min.', caption: 'Noch nicht alles auswendig lernen. Beobachte nur, wo Kohlenhydrate, Fette und Eiweiße im Verdauungssystem verarbeitet und aufgenommen werden.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/wie-funktioniert-das-verdauungssystem', embedUrl: 'https://www.youtube-nocookie.com/embed/ZOAaEX0xoTw' },
        ...practice('Video-Check', [
          'Nenne nach dem Video die drei Makronährstoffe.',
          'Wo werden die klein gespaltenen Nährstoffe hauptsächlich aufgenommen?',
          'Welche zwei Verdauungssäfte/Organe helfen laut Video besonders im Dünndarm?'
        ]),
      ],
    },

    {
      id: 'lf9-02-verdauungsorgane',
      title: '2. Verdauungsorgane – Weg, Aufbau und Funktion',
      content: [
        lesson(2, 'Heute wird der Verdauungstrakt Organ für Organ aufgebaut. Nach jedem Organ folgt sofort eine kurze Übung.', 'Die Auszubildende kann den Weg der Nahrung sicher aufsagen und jedem Organ eine Hauptfunktion sowie wichtige Enzyme/Begriffe zuordnen.'),
        { type: 'image', src: digestion, alt: 'Weg der Nahrung', caption: 'Diese Reihenfolge muss am Ende ohne Hilfe sitzen.' },

        { type: 'heading', title: '2.1 Grundidee der Verdauung' },
        { type: 'text', text: 'Verdauung besteht aus mechanischer und chemischer Verarbeitung. Mechanisch bedeutet zum Beispiel Kauen oder Durchmischen. Chemisch bedeutet, dass Enzyme große Nährstoffmoleküle in kleinere Bausteine spalten. Erst kleine, lösliche Bausteine können die Darmwand passieren und in Blut oder Lymphe aufgenommen werden. Dies nennt man Resorption.' },
        ...practice('Grundprinzip', [
          'Bisherige Aufgabe: Bringe Dickdarm – Mund – Magen – Enddarm – Speiseröhre – Dünndarm in die richtige Reihenfolge.',
          'Erkläre den Unterschied zwischen mechanischer Zerkleinerung und chemischer Spaltung.',
          'Was bedeutet Resorption?'
        ]),

        { type: 'heading', title: '2.2 Mund und Speiseröhre' },
        { type: 'text', text: 'Im Mund wird Nahrung gekaut, mit Speichel vermischt und gleitfähig gemacht. Die Speichelamylase beginnt bereits die Spaltung von Stärke. Beim Schlucken verschließt der Kehldeckel den Eingang zur Luftröhre, damit Nahrung in die Speiseröhre gelangt. Die Speiseröhre ist ein Muskelschlauch. Durch wellenförmige Muskelbewegungen, die Peristaltik, wird der Speisebrei zum Magen transportiert.' },
        ...practice('Mund und Schlucken', [
          'Bisherige Aufgabe: Was macht Amylase?',
          'Bisherige Aufgabe: Wozu dient der Kehldeckel?',
          'Bisherige Aufgabe: Wie heißt die Transportbewegung der Speiseröhre?',
          'Warum kann Nahrung auch dann Richtung Magen transportiert werden, wenn der Körper nicht völlig aufrecht steht?'
        ]),

        { type: 'heading', title: '2.3 Magen' },
        { type: 'text', text: 'Der Magen dient als Speicher und Mischorgan. Seine Muskulatur durchmischt den Speisebrei mit Magensaft. Salzsäure schafft ein stark saures Milieu, denaturiert Eiweiße und reduziert viele Keime. Pepsin beginnt die Proteinverdauung. Damit der Magen sich nicht selbst schädigt, schützt eine Schleim-Barriere die Magenwand. Der Pförtner, der Pylorus, gibt den Speisebrei portionsweise in den Zwölffingerdarm ab.' },
        ...practice('Magen', [
          'Bisherige Aufgabe: Richtig oder falsch – Im Magen beginnt die Fettaufnahme.',
          'Bisherige Aufgabe: Richtig oder falsch – Pepsin spaltet Proteine.',
          'Bisherige Aufgabe: Richtig oder falsch – Die Magenschleimhaut schützt vor der Säure.',
          'Welche Funktion hat der Pylorus?'
        ]),

        { type: 'heading', title: '2.4 Dünndarm – Hauptort von Endverdauung und Resorption' },
        { type: 'text', text: 'Der Dünndarm besteht aus Duodenum, Jejunum und Ileum. In den Zwölffingerdarm gelangen Galle und Bauchspeichel. Dort werden Kohlenhydrate, Proteine und Fette weiter zerlegt. Die Oberfläche des Dünndarms ist durch Falten, Zotten und Mikrovilli stark vergrößert. Eine große Oberfläche ermöglicht, dass besonders viele Nährstoffbausteine gleichzeitig aufgenommen werden können.' },
        ...practice('Dünndarm', [
          'Bisherige Aufgabe: Warum besitzt der Dünndarm Falten, Zotten und Mikrovilli?',
          'Bisherige Aufgabe: Erkläre Resorption in eigenen Worten.',
          'Ordne Duodenum, Jejunum und Ileum dem Dünndarm zu.',
          'Warum ist eine große Oberfläche für die Nährstoffaufnahme günstiger als eine glatte Röhre?'
        ]),

        { type: 'image', src: organTeam, alt: 'Leber Gallenblase Pankreas', caption: 'Drei Organe, die im Unterricht oft verwechselt werden: bilden, speichern, Enzyme liefern.' },
        { type: 'heading', title: '2.5 Leber, Gallenblase und Bauchspeicheldrüse' },
        { type: 'text', text: 'Die Leber bildet Gallenflüssigkeit und verarbeitet viele resorbierte Nährstoffe. Sie kann Glukose als Glykogen speichern, bildet wichtige Plasmaproteine und verändert beziehungsweise entgiftet zahlreiche Stoffe. Die Gallenblase bildet die Galle nicht, sondern speichert und konzentriert sie. Bei einer fettreichen Mahlzeit wird Galle in den Dünndarm abgegeben. Das Pankreas besitzt einen exokrinen Anteil mit Verdauungsenzymen und Bicarbonat sowie einen endokrinen Anteil, der unter anderem Insulin und Glukagon bildet.' },
        { type: 'table', headers: ['Organ', 'Hauptaufgabe in der Verdauung', 'Prüfungsbegriff'], rows: [['Leber','bildet Galle; verarbeitet/speichert Nährstoffe','Glykogen'],['Gallenblase','speichert/konzentriert Galle','Fettemulgierung'],['Pankreas','Enzyme + Bicarbonat','Amylase, Proteasen, Lipase']] },
        ...practice('Leber, Galle, Pankreas', [
          'Bisherige Aufgabe: Verbinde Leber → bildet Galle; Gallenblase → speichert Galle; Pankreas → liefert Enzyme und Bicarbonat.',
          'Bisherige Aufgabe: Ordne Amylase → Kohlenhydrate, Protease → Proteine, Lipase → Fette.',
          'Warum ist die Aussage „Die Gallenblase produziert Galle“ falsch?',
          'Wozu dient Bicarbonat im Dünndarm?'
        ]),

        { type: 'heading', title: '2.6 Dickdarm und Enddarm' },
        { type: 'text', text: 'Im Dickdarm werden vor allem Wasser und Elektrolyte zurückgewonnen. Darmbakterien verarbeiten unverdauliche Nahrungsbestandteile und bilden Stoffwechselprodukte. Dadurch wird der Darminhalt zunehmend eingedickt und zum Stuhl geformt. Der Mastdarm speichert Stuhl bis zur Defäkation, der After bildet den Abschluss des Verdauungstrakts.' },
        ...practice('Dickdarm und Enddarm', [
          'Bisherige Aufgabe: Lückentext – Der … entzieht Wasser. Der … speichert den Stuhl. Unverdauliche Pflanzenbestandteile nennt man …',
          'Was wäre eine plausible Folge, wenn im Dickdarm zu wenig Wasser resorbiert wird?',
          'Was ist die Hauptaufgabe des Mastdarms?'
        ]),

        { type: 'video', title: 'Wie funktioniert das Verdauungssystem?', source: 'Stiftung Gesundheitswissen', duration: '2:26 Min.', caption: 'Jetzt das Video ein zweites Mal nutzen: Stoppe nach jedem Organ und nenne die Funktion, bevor das Video sie erklärt.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/wie-funktioniert-das-verdauungssystem', embedUrl: 'https://www.youtube-nocookie.com/embed/ZOAaEX0xoTw' },
        ...practice('Abschlussfall Frühstück', [
          'Bisherige Aufgabe: Eine Patientin isst Vollkornbrot mit Quark, Nüssen und Apfel. Beschreibe den Weg des Frühstücks in 8–10 Sätzen.',
          'Verwende mindestens fünf Organe, zwei Enzyme und die Endbausteine der drei Makronährstoffe.',
          'Bisherige Aufgabe: Formuliere patientengerecht eine kurze Antwort auf „Warum muss Nahrung überhaupt verdaut werden?“'
        ]),
      ],
    },

    {
      id: 'lf9-03-diagnostik',
      title: '3. Diagnostik – Symptome, Sonografie, Gastroskopie, Labor und Stuhltest',
      content: [
        lesson(3, 'Die bisherige Diagnostikstunde wird ausgebaut. Statt sechs Stationen schnell hintereinander behandeln wir heute nur Diagnostik und üben nach jeder Methode sofort.', 'Die Auszubildende kann typische GI-Symptome benennen und begründen, wann Sonografie, Endoskopie, Labor oder Stuhltest sinnvoll sind.'),
        { type: 'image', src: diagnostics, alt: 'Diagnostikübersicht', caption: 'Nicht „welche Untersuchung ist besser?“, sondern „welche Frage soll beantwortet werden?“' },

        { type: 'heading', title: '3.1 Fachbegriffe für Beschwerden' },
        { type: 'table', headers: ['Fachbegriff', 'Bedeutung'], rows: [['Inappetenz','Appetitlosigkeit'],['Nausea','Übelkeit'],['Emesis','Erbrechen'],['Reflux','Rückfluss'],['Meteorismus','aufgetriebener/geblähter Bauch'],['Flatulenz','vermehrter Abgang von Darmgasen'],['Kolik','wellenförmiger starker Schmerz'],['Diarrhö','Durchfall'],['Obstipation','Verstopfung'],['Exsikkose','Austrocknung'],['Ileus','Darmverschluss'],['Peritonitis','Bauchfellentzündung'],['Foetor ex ore','unangenehmer Mundgeruch']] },
        ...practice('Symptomvokabular', [
          'Übersetze Nausea, Emesis, Diarrhö, Obstipation und Exsikkose.',
          'Welche zwei Begriffe beschreiben Gasansammlung/Abgang?',
          'Welcher Begriff ist ein potenzielles Notfallbild: Flatulenz oder Ileus? Begründe.'
        ]),

        { type: 'heading', title: '3.2 Sonografie – Bild aus Echos' },
        { type: 'text', text: 'Beim Ultraschall sendet der Schallkopf Schallwellen in den Körper. Gewebe reflektieren die Schallwellen unterschiedlich. Der Schallkopf empfängt die zurückkehrenden Echos und das Gerät berechnet daraus ein bewegtes Bild. Flüssigkeit, Weichteile, Luft und Knochen erzeugen unterschiedliche Signale. Der große Vorteil ist, dass keine ionisierende Röntgenstrahlung eingesetzt wird.' },
        { type: 'video', title: 'Wie funktioniert Ultraschall?', source: 'Stiftung Gesundheitswissen', duration: '1:11 Min.', caption: 'Beobachtungsauftrag: Schallwelle → Reflexion → Echo → Bild. Achte zusätzlich auf die Darstellung verschiedener Gewebe.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/koerper-wissen/wie-funktioniert-ultraschall' },
        ...practice('Sonografie – bisherige Aufgaben', [
          '[V] Bringe in Reihenfolge: Schallkopf sendet → Gewebe reflektiert → Schallkopf empfängt → Gerät berechnet Bild.',
          '[V] Ergänze: Flüssigkeit erscheint meist …, Luft/Knochen eher …, Weichteile in verschiedenen …tönen.',
          '[V] Warum entstehen unterschiedliche Bildsignale?',
          '[V] Welche Aussagen stimmen: ohne Röntgenstrahlung / grundsätzlich schmerzhaft / Schallkopf sendet und empfängt / Luft immer besonders gut sichtbar?',
          '[T] Eine schwangere Patientin hat Oberbauchbeschwerden. Warum ist Sonografie häufig eine sinnvolle erste Untersuchung?',
          '[T] Vergleiche Sonografie und Gastroskopie in einem Satz.'
        ]),

        { type: 'heading', title: '3.3 Gastroskopie – Schleimhaut direkt ansehen' },
        { type: 'text', text: 'Bei der Gastroskopie wird ein flexibles Endoskop über Mund und Speiseröhre in Magen und Zwölffingerdarm vorgeschoben. Eine Kamera/Lichtquelle ermöglicht die direkte Beurteilung der Schleimhaut. Über Arbeitskanäle können je nach Gerät beispielsweise Gewebeproben entnommen oder Blutungen behandelt werden. Die Lernunterlage nennt als Vorbereitung unter anderem 6–8 Stunden Nüchternheit, Rauchverzicht, Simethicon kurz vorher und lokale Rachenbetäubung.' },
        { type: 'video', title: 'Wie funktioniert eine Magenspiegelung?', source: 'MVZ Landsberg / YouTube', duration: 'Kurzvideo', caption: 'Achte auf Instrument, Untersuchungsweg, untersuchte Organe und diagnostische/therapeutische Möglichkeiten.', url: 'https://www.youtube.com/watch?v=0cXtwoKzx04' },
        ...practice('Gastroskopie – bisherige Aufgaben', [
          '[V] Ordne Mund – Speiseröhre – Magen – Zwölffingerdarm.',
          '[V] Nenne drei Merkmale/Bestandteile eines Gastroskops.',
          '[V] Welche drei Organabschnitte kann man betrachten?',
          '[I] Notiere vier Vorbereitungsmaßnahmen aus der Lernunterlage.',
          '[T] Warum soll der Magen möglichst leer sein?',
          '[T] Bei Verdacht auf ein blutendes Magengeschwür: Nenne eine diagnostische und eine mögliche therapeutische Funktion.',
          '[T] Ordne Sonografie oder Gastroskopie zu: Magenschleimhaut / Leber und Gallenblase von außen / Gewebeprobe / strahlungsfreie Orientierung.'
        ]),

        { type: 'heading', title: '3.4 Labordiagnostik – Werte als Hinweise, nicht als Diagnose allein' },
        { type: 'text', text: 'Laborwerte geben Hinweise auf Organe oder Funktionsbereiche. GOT, GPT und GGT werden in der Unterlage als Leberenzyme geführt. AP kann unter anderem mit Gallenwegen und Knochen zusammenhängen. Bilirubin ist ein Gallenfarbstoff. INR spiegelt die Gerinnung wider und kann bei Lebererkrankungen relevant sein, weil die Leber Gerinnungsfaktoren bildet. Amylase stammt unter anderem aus Speicheldrüsen und Pankreas, Lipase besonders aus dem Pankreas. Referenzbereiche können je nach Labor und Methode variieren; in den bisherigen Schulaufgaben werden die Werte der Lernunterlage verwendet.' },
        { type: 'table', headers: ['Wert', 'Unterlagen-Zuordnung'], rows: [['GOT/GPT','Leber'],['GGT','Leber/Galle-Kontext'],['AP','Gallenwege/Knochen'],['Bilirubin','Gallenfarbstoff'],['INR','Gerinnung'],['Amylase','Parotis/Pankreas'],['Lipase','Pankreas']] },
        ...practice('Labor – bisherige Aufgaben', [
          'Ordne GOT/GPT, GGT, AP, Bilirubin, INR, Amylase und Lipase Leber/Galle/Gerinnung/Pankreas-Parotis zu.',
          'Welche drei Werte werden in der Unterlage ausdrücklich als Leberenzyme bezeichnet?',
          'Welcher Wert ist Gallenfarbstoff? Welcher steht für Gerinnungsstoffproduktion?',
          'Bisherige Aufgabe: Lipase 80 U/L liegt nach dem in der Unterlage genannten Wert <60 U/L darüber oder darunter?',
          'Warum ist es sinnvoll, bei Oberbauchbeschwerden mehrere passende Laborwerte gemeinsam zu betrachten?'
        ]),

        { type: 'heading', title: '3.5 Stuhltest auf okkultes Blut' },
        { type: 'text', text: 'Ein immunologischer Stuhltest kann nicht sichtbares Blut im Stuhl nachweisen. In der bisherigen Lernunterlage wird die Entnahme so geübt: Stuhl auffangen, an mehreren Stellen Material aufnehmen, Probenstab in das Röhrchen zurückgeben und die Probe abgeben. „Okkult“ bedeutet verborgen beziehungsweise mit bloßem Auge nicht sichtbar. Bei sichtbaren Blutquellen kann das Ergebnis schwerer zuzuordnen sein.' },
        { type: 'video', title: 'Darmkrebsvorsorge – Stuhltest oder Darmspiegelung?', source: 'Kassenärztliche Bundesvereinigung', duration: '1:05 Min.', caption: 'Für die bisherige Aufgabe nur auf Zweck und Rolle des Stuhltests achten. Vorsorgeintervalle werden getrennt von der alten Lernunterlage behandelt.', url: 'https://www.kbv.de/video/6425' },
        ...practice('Stuhltest – bisherige Aufgaben', [
          '[V] Wozu dient der Stuhltest in der Darmkrebsvorsorge?',
          '[I] Bringe die Entnahmeschritte in die richtige Reihenfolge.',
          '[I] Was bedeutet „okkultes Blut“?',
          '[I] Nenne die in der Unterlage genannten Situationen, in denen die Probe nicht durchgeführt werden soll.',
          '[T] Muss nach der Lernunterlage vorher eine spezielle Ernährung eingehalten werden?',
          '[T] Warum können blutende Hämorrhoiden die Aussage des Tests erschweren?'
        ]),
      ],
    },

    {
      id: 'lf9-04-oberer-gi-trakt',
      title: '4. Oberer Magen-Darm-Trakt – Infektion, Laktoseintoleranz, Reflux, Gastritis & Ulkus',
      content: [
        lesson(4, 'Die früher sehr volle Erkrankungsstunde wird geteilt. Heute geht es ausschließlich um Infektionen und Erkrankungen des oberen Verdauungstrakts.', 'Die Auszubildende kann Ursache → Mechanismus → Symptom → Diagnostik/Therapieprinzip für fünf häufige Krankheitsbilder erklären.'),
        { type: 'image', src: ulcerReflux, alt: 'Reflux Gastritis Ulkus Vergleich', caption: 'Reflux, Gastritis und Ulkus nicht als Synonyme lernen.' },

        { type: 'heading', title: '4.1 Gastroenteritis – warum Flüssigkeitsverlust gefährlich wird' },
        { type: 'text', text: 'Gastritis betrifft den Magen beziehungsweise die Magenschleimhaut, Enteritis den Dünndarm und Gastroenteritis Magen und Darm. Infektiöse Magen-Darm-Erkrankungen können durch Viren, Bakterien oder Protozoen verursacht werden. Typische Beschwerden der Unterlage sind Übelkeit, Erbrechen, Krämpfe, Durchfall, Fieber sowie Kopf- und Gliederschmerzen. Erbrechen und Durchfall führen zu Verlust von Wasser und Elektrolyten. Bei starkem Verlust kann eine Exsikkose entstehen.' },
        { type: 'video', title: 'Was sind Infektionskrankheiten?', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Achte auf Infektion, Erregergruppen und Übertragungswege.', url: 'https://gesund.bund.de/norovirus' },
        ...practice('Gastroenteritis – bisherige Aufgaben', [
          '[V] Unterschied zwischen Infektion und Infektionskrankheit.',
          '[V] Nenne drei Gruppen von Krankheitserregern.',
          '[I] Ordne Gastritis, Enteritis und Gastroenteritis.',
          '[I] Nenne vier typische Symptome.',
          '[T] Erkläre Erbrechen/Durchfall → Flüssigkeitsverlust → Exsikkose.',
          '[T] In einer Wohngruppe erkranken mehrere Menschen plötzlich mit Erbrechen und Durchfall. Nenne einen wahrscheinlichen Erregertyp und zwei Hygienemaßnahmen.',
          '[T] Warum stehen Flüssigkeit und Salze therapeutisch im Vordergrund?'
        ]),

        { type: 'heading', title: '4.2 Laktoseintoleranz – ein Enzymproblem' },
        { type: 'text', text: 'Laktose ist Milchzucker und besteht aus zwei Zuckerbausteinen. Normalerweise spaltet das Enzym Laktase die Laktose im Dünndarm. Ist zu wenig Laktase vorhanden, bleibt ein Teil ungespalten. Die Laktose gelangt weiter in den Dickdarm, wo Darmbakterien sie verwerten. Dabei entstehen Gase; außerdem zieht ungespaltener Zucker Wasser in den Darm. Dadurch können Blähungen, Bauchschmerzen und Durchfall entstehen.' },
        { type: 'video', title: 'Wie entwickelt sich eine Laktoseintoleranz?', source: 'SRF', duration: 'ca. 1:28 Min.', caption: 'Verfolge Laktose, Laktase und die Vorgänge im Dickdarm.', url: 'https://www.srf.ch/play/tv/srf-videos-zur-kostenlosen-nutzung/video/wissen-fuer-alle---wie-entwickelt-sich-eine-laktoseintoleranz?urn=urn:srf:video:6cdd8648-7bee-4d3a-b00c-c1f19350e4da' },
        ...practice('Laktoseintoleranz – bisherige Aufgaben', [
          '[V] Woraus besteht Laktose und welches Enzym spaltet sie?',
          '[V] Beschreibe den normalen Weg der Laktose im Dünndarm.',
          '[V] Was passiert mit ungespaltener Laktose im Dickdarm?',
          '[V] Nenne drei Beschwerden.',
          '[I] Nenne eine diagnostische und zwei therapeutische Möglichkeiten aus der Unterlage.',
          '[T] Beschwerden nach Milchshake, nicht nach laktosefreien Produkten: Formuliere eine begründete Verdachtsdiagnose.'
        ]),

        { type: 'heading', title: '4.3 Refluxkrankheit – wenn die Barriere nicht dicht hält' },
        { type: 'text', text: 'Zwischen Speiseröhre und Magen liegt ein funktioneller Schließmechanismus. Wenn er nicht ausreichend schließt, kann saurer Mageninhalt in die Speiseröhre zurückfließen. Die Speiseröhre besitzt nicht denselben Säureschutz wie der Magen. Wiederholter Kontakt kann deshalb Sodbrennen und eine Entzündung der Speiseröhre verursachen. Die Unterlage nennt Alter, Übergewicht, Genussmittel und Schwangerschaft als Risikofaktoren sowie Säureblocker wie Pantoprazol und Risikofaktorreduktion als Therapieprinzipien.' },
        { type: 'video', title: 'Was ist die Refluxkrankheit?', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Achte auf Schließmuskel, Rückfluss, Beschwerden und Behandlungsprinzipien.', url: 'https://gesund.bund.de/sodbrennen-refluxkrankheit' },
        ...practice('Reflux – bisherige Aufgaben', [
          '[V] Aufgabe des unteren Speiseröhrenschließmuskels.',
          '[V] Beschreibe in drei Schritten, wie Sodbrennen entsteht.',
          '[V] Nenne drei typische Beschwerden.',
          '[I] Nenne vier Risikofaktoren aus der Unterlage.',
          '[T] Warum kann häufiger Reflux zu einer Ösophagitis führen?',
          '[T] Ordne Lebensstil → Säureblocker → Operation nach Basis/medikamentös/schwere Verläufe.',
          '[T] Brennen hinter dem Brustbein besonders nach großen Mahlzeiten und im Liegen: Verdachtsdiagnose + zwei sinnvolle nächste Schritte.'
        ]),

        { type: 'heading', title: '4.4 Gastritis – Entzündung der Magenschleimhaut' },
        { type: 'text', text: 'Eine Gastritis ist eine Entzündung der Magenschleimhaut. Akute Formen können zum Beispiel durch Schleimhautreizung, Infektionen oder Medikamente begünstigt werden; chronische Formen haben unterschiedliche Ursachen. Für das Lernfeld ist vor allem wichtig: Gastritis betrifft primär die Schleimhautoberfläche und kann Beschwerden wie Oberbauchschmerz, Übelkeit oder Appetitlosigkeit verursachen.' },
        { type: 'video', title: 'Wie entsteht eine Magenschleimhautentzündung?', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Notiere Ursachen, Symptome und den Unterschied zwischen akuter und chronischer Entzündung.', url: 'https://gesund.bund.de/gastritis' },
        ...practice('Gastritis', [
          'Definiere Gastritis in einem Satz.',
          'Nenne drei mögliche Beschwerden.',
          'Warum ist eine Entzündung der Schleimhaut etwas anderes als ein tiefer Gewebsdefekt?'
        ]),

        { type: 'heading', title: '4.5 Ulkuskrankheit – tiefer Defekt und Blutungsgefahr' },
        { type: 'text', text: 'Ein Ulkus ist laut Lernunterlage ein tiefer Gewebsdefekt, der über die oberflächliche Epithelgrenze hinausreicht. Magenulkus heißt Ulcus ventriculi, Zwölffingerdarmulkus Ulcus duodeni. Als Beschwerden nennt die Unterlage Inappetenz, Übelkeit und Erbrechen. Dringt ein Ulkus bis zu einem Blutgefäß vor, kann es zu einer gefährlichen Blutung kommen. Eine Endoskopie kann die Blutungsquelle darstellen und in vielen Situationen zugleich therapeutisch behandeln; bei relevantem Blutverlust können weitere Maßnahmen einschließlich Bluttransfusion notwendig werden.' },
        ...practice('Ulkus – bisherige Aufgaben', [
          'Erkläre den Kernunterschied Gastritis vs. Ulkus.',
          'Übersetze Inappetenz, Ulcus ventriculi und Ulcus duodeni.',
          'Nenne die drei Symptome aus der Unterlage.',
          'Erkläre Gewebsschädigung → Gefäßschädigung → Blutung.',
          'Ordne endoskopische Blutstillung und Bluttransfusion ihrem jeweiligen Ziel zu.',
          'Bisherige Gastroskopie-Transferfrage: Nenne bei einem blutenden Magengeschwür eine diagnostische und eine therapeutische Funktion der Gastroskopie.'
        ]),
      ],
    },

    {
      id: 'lf9-05-unterer-gi-trakt',
      title: '5. Unterer Magen-Darm-Trakt – Divertikel, Appendizitis, akutes Abdomen & Hämorrhoiden',
      content: [
        lesson(5, 'Heute stehen die unteren Darmabschnitte und Notfallzeichen im Mittelpunkt. Jeder Begriff wird erst getrennt gelernt, danach in Fällen kombiniert.', 'Die Auszubildende kann Divertikulose und Divertikulitis sicher unterscheiden, Appendizitis/akutes Abdomen als Warnbilder einordnen und Hämorrhoidalleiden von anderen Blutungsquellen abgrenzen.'),
        { type: 'image', src: lowerGi, alt: 'Unterer Verdauungstrakt Prüfungsbilder', caption: 'Vier Begriffe – vier unterschiedliche Denkwege.' },

        { type: 'heading', title: '5.1 Divertikulose – Ausstülpungen ohne Entzündung' },
        { type: 'text', text: 'Divertikel sind Ausstülpungen der Darmwand, besonders häufig im Dickdarm beziehungsweise Sigma. Die Lernunterlage beschreibt, dass bei erhöhtem Druck Schleimhaut zwischen Muskelfasern nach außen gedrückt werden kann. Sind mehrere Divertikel vorhanden, spricht man von Divertikulose. Sie kann lange ohne Beschwerden bestehen.' },
        ...practice('Divertikulose', [
          'Vervollständige: Divertikulose = …',
          'Erkläre die Entstehung mit den Begriffen Druck, Schleimhaut und Muskelfasern.',
          'Warum kann eine Divertikulose zufällig entdeckt werden?'
        ]),

        { type: 'heading', title: '5.2 Divertikulitis – wenn sich Divertikel entzünden' },
        { type: 'text', text: 'Entzündet sich ein Divertikel, spricht man von Divertikulitis. In der Unterlage werden entzündliche Schwellung, Durchfall und Fieber genannt. Eine schwere Komplikation ist die Perforation: Dann kann Darminhalt in die Bauchhöhle gelangen und eine Peritonitis verursachen. Zusätzlich kann ein Ileus auftreten.' },
        { type: 'video', title: 'Divertikulitis – Schmerzen im Bauch', source: 'SWR / ARD Mediathek', caption: 'Achte auf Beschwerden, Diagnostik und Behandlung. Das Video ist länger und eignet sich gut zum Stoppen in Abschnitten.', url: 'https://www.ardmediathek.de/video/doc-fischer/schmerzen-im-bauch-was-tun-bei-divertikulitis/swr/Y3JpZDovL3N3ci5kZS9hZXgvbzE5NTE4Mzc' },
        ...practice('Divertikulitis – bisherige Aufgaben', [
          'Vervollständige: Divertikulitis = …',
          'Welche Beschwerden sprechen eher für Divertikulitis als für reine Divertikulose?',
          'Erkläre Divertikulitis → Perforation → Peritonitis.',
          'Nenne die in der Unterlage genannten Therapieansätze.',
          'Welche zusätzliche Komplikation außer Perforation nennt die Unterlage?'
        ]),

        { type: 'heading', title: '5.3 Appendizitis – Entzündung des Wurmfortsatzes' },
        { type: 'text', text: 'Bei der sogenannten Blinddarmentzündung ist nicht der gesamte Blinddarm entzündet, sondern meist der Wurmfortsatz, die Appendix vermiformis. Typisch ist ein Schmerzverlauf, bei dem Schmerzen zunächst diffus oder im Oberbauch/Nabelbereich beginnen und später in den rechten Unterbauch wandern können. Eine Perforation ist gefährlich, weil sich Darminhalt und Keime in der Bauchhöhle ausbreiten können. Die Standardtherapie kann die operative Entfernung der Appendix sein.' },
        { type: 'video', title: 'Was passiert bei einer Blinddarmentzündung?', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Unterscheide Blinddarm und Wurmfortsatz; achte auf Schmerzverlauf, Perforation und Behandlung.', url: 'https://gesund.bund.de/blinddarmentzuendung' },
        ...practice('Appendizitis – bisherige Aufgaben', [
          '[V] Was ist anatomisch tatsächlich entzündet?',
          '[V] Beschreibe den typischen Schmerzverlauf.',
          '[V] Warum ist eine Perforation gefährlich?',
          '[V] Wie heißt die operative Entfernung des Wurmfortsatzes?',
          '[I] Warum darf eine plötzliche scheinbare Besserung nach zuvor starken Schmerzen nicht automatisch beruhigen?'
        ]),

        { type: 'heading', title: '5.4 Akutes Abdomen – kein einzelnes Krankheitsbild, sondern ein Warnkomplex' },
        { type: 'text', text: 'Das akute Abdomen beschreibt eine Kombination aus Zeichen, die auf eine potenziell schwere Erkrankung im Bauchraum hinweisen. Die Unterlage nennt starke Bauchschmerzen mit Abwehrspannung, Übelkeit/Erbrechen, veränderte Darmgeräusche beziehungsweise Darmbewegung und Kreislaufstörungen. Die Ursache kann sehr unterschiedlich sein. Deshalb geht es in der Praxis nicht darum, als MFA eine endgültige Diagnose zu stellen, sondern Warnzeichen zu erkennen und eine rasche ärztliche beziehungsweise notfallmedizinische Beurteilung zu ermöglichen.' },
        ...practice('Akutes Abdomen – bisherige Aufgaben', [
          'Nenne vier Zeichen aus der Unterlage.',
          'Bisherige Aufgabe: Eine Person hat zunehmende Bauchschmerzen, Abwehrspannung, Übelkeit und Kreislaufprobleme. Formuliere die angemessene Reaktion in der Praxis.',
          'Warum ist „akutes Abdomen“ eine Arbeits-/Warnbezeichnung und keine einzelne Diagnose?'
        ]),

        { type: 'heading', title: '5.5 Hämorrhoidalleiden' },
        { type: 'text', text: 'Hämorrhoiden sind normale Gefäßpolster am Analkanal und helfen beim Feinverschluss. Von einem Hämorrhoidalleiden spricht man, wenn vergrößerte oder verlagerte Hämorrhoiden Beschwerden verursachen. Die Unterlage nennt Nässen, Juckreiz, Ekzeme und Blutungen. Zur Diagnostik wird die Proktoskopie genannt. Therapieoptionen reichen von lokalen Maßnahmen über verödende/invasive Verfahren bis zur Operation, abhängig vom Befund.' },
        { type: 'video', title: 'Was sind Hämorrhoiden?', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Notiere mindestens drei Beschwerden oder begünstigende Faktoren.', url: 'https://gesund.bund.de/haemorrhoiden' },
        ...practice('Hämorrhoiden – bisherige Aufgaben', [
          '[V] Nenne drei Beschwerden oder begünstigende Faktoren aus dem Video.',
          '[I] Welche Funktion hat das Hämorrhoidalpolster?',
          '[I] Nenne die vier Symptome aus der Unterlage.',
          '[I] Welche Diagnostik nennt die Unterlage?',
          '[T] Ordne Lokaltherapie → Injektion/Verödung → Operation von weniger invasiv bis operativ.'
        ]),

        { type: 'heading', title: '5.6 Großer bisheriger Fall Frau K.' },
        { type: 'text', text: 'Frau K., 62 Jahre, hat seit zwei Tagen zunehmende Schmerzen im linken Unterbauch, Fieber und Durchfall. Vor Monaten wurden beschwerdefreie Divertikel festgestellt. Zusätzlich berichtet sie über gelegentlich helles Blut am Toilettenpapier und Juckreiz am After. Laborwerte von Leber, Galle und Pankreas sollen bestimmt werden; später soll ein Stuhltest erklärt werden.' },
        ...practice('Prüfungsfall Frau K. – alle bisherigen Fragen', [
          'Welche Diagnose passt am besten zu den akuten Unterbauchbeschwerden? Begründe mit drei Informationen.',
          'Wie heißt der Zustand, bei dem Divertikel vorhanden sind, aber keine Beschwerden bestehen?',
          'Welche mögliche Komplikation muss bei einer Perforation beachtet werden?',
          'Welche zweite Erkrankung könnte helles Blut am Toilettenpapier + Juckreiz erklären? Welche Diagnostik nennt die Unterlage?',
          'Nenne je einen Laborwert für Leber, Galle/Gallenfarbstoff und Pankreas.',
          'Erkläre die Stuhlprobenentnahme in vier kurzen Schritten.',
          'Exit: zwei Leberenzyme / okkult / Gastritis vs. Ulkus / Divertikulose vs. Divertikulitis / Diagnostik bei Hämorrhoiden.'
        ]),
      ],
    },

    {
      id: 'lf9-06-tumore',
      title: '6. Tumore & Krebs im Verdauungstrakt',
      content: [
        lesson(6, 'Tumorlehre wird nicht als ein großer Theorieblock behandelt. Wir gehen in der Reihenfolge Zellverhalten → benign/malign → Metastasen → TNM → Therapie → konkrete GI-Tumoren.', 'Die Auszubildende kann benigne und maligne Tumoren unterscheiden, das TNM-System erklären und typische Bezüge zu Ösophagus-, Magen- und kolorektalem Karzinom herstellen.'),
        { type: 'image', src: cancer, alt: 'Krebs Staging Therapie', caption: 'Ein Tumor wird nicht nur nach „Krebs ja/nein“ beurteilt, sondern nach Art, Ausbreitung und Stadium.' },

        { type: 'heading', title: '6.1 Was ist ein Tumor?' },
        { type: 'text', text: 'Ein Tumor ist zunächst eine Gewebsneubildung beziehungsweise Raumforderung. Tumoren können gutartig (benigne) oder bösartig (maligne) sein. Gutartige Tumoren können durch ihre Größe oder Lage trotzdem Beschwerden verursachen. Bösartige Tumoren wachsen häufig invasiv in Nachbargewebe ein und können sich über Lymph- oder Blutwege ausbreiten.' },
        { type: 'table', headers: ['Merkmal', 'Benigne', 'Maligne'], rows: [['Wachstum','häufig verdrängend','häufig invasiv/zerstörend'],['Abgrenzung','oft besser abgegrenzt','kann Gewebegrenzen überschreiten'],['Metastasen','keine','möglich'],['Zellverhalten','ähnlicher zum Ursprungsgewebe','kann stärker entdifferenziert sein']] },
        ...practice('Benign oder malign?', [
          'Sortiere: verdrängendes Wachstum / invasives Wachstum / Metastasen möglich / keine Metastasen.',
          'Warum kann auch ein benigner Hirn- oder Darmtumor Beschwerden verursachen?',
          'Formuliere den Unterschied zwischen „Tumor“ und „Krebs“ in eigenen Worten.'
        ]),

        { type: 'heading', title: '6.2 Wie entsteht Krebs?' },
        { type: 'text', text: 'Krebs entsteht durch Veränderungen im Erbgut von Zellen. Normalerweise kontrollieren Gene Zellteilung, Reparatur und programmierten Zelltod. Häufen sich ungünstige Veränderungen an, können Zellen Wachstumskontrollen umgehen. Risikofaktoren erhöhen Wahrscheinlichkeiten, bedeuten aber nicht, dass zwangsläufig Krebs entsteht. Für das Lernfeld ist der Zusammenhang wichtig: Mutation → gestörte Wachstumskontrolle → Tumorwachstum → mögliche Invasion/Metastasierung.' },
        { type: 'video', title: 'Was ist Krebs?', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Achte auf unkontrolliertes Wachstum, Eindringen in Gewebe und Metastasen.', url: 'https://gesund.bund.de/cup-syndrom' },
        ...practice('Krebsentstehung', [
          'Erkläre Mutation → unkontrollierte Zellteilung → Tumor in drei Sätzen.',
          'Was ist der Unterschied zwischen Risikofaktor und sicherer Ursache?',
          'Warum ist Metastasierung ein Merkmal bösartiger Erkrankung?'
        ]),

        { type: 'heading', title: '6.3 Primärtumor und Metastasen' },
        { type: 'text', text: 'Der Primärtumor ist der ursprüngliche Krebsherd. Lösen sich Tumorzellen, gelangen über Blut oder Lymphe in andere Organe und bilden dort neue Tumorherde, nennt man diese Metastasen. Eine Lebermetastase eines Darmkarzinoms besteht daher biologisch aus Darmkrebszellen und ist nicht automatisch ein primärer Lebertumor.' },
        { type: 'video', title: 'Der Unterschied zwischen Primärtumor und Metastasen', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Erkläre nach dem Video ein eigenes Beispiel, z. B. Darmtumor → Lebermetastase.', url: 'https://gesund.bund.de/darmkrebs' },
        ...practice('Primärtumor/Metastase', [
          'Definiere Primärtumor.',
          'Definiere Metastase.',
          'Warum ist „Lebertumor“ ohne weitere Information noch keine Aussage darüber, ob der Ursprung in der Leber liegt?'
        ]),

        { type: 'heading', title: '6.4 TNM-System' },
        { type: 'text', text: 'Das TNM-System beschreibt die anatomische Ausbreitung vieler Krebserkrankungen. T beschreibt Größe beziehungsweise lokale Ausdehnung des Primärtumors. N beschreibt den Befall regionaler Lymphknoten. M beschreibt Fernmetastasen. Ein vorangestelltes p in pTNM bedeutet, dass die Einteilung auf pathologischen beziehungsweise feingeweblichen Untersuchungen beruht.' },
        { type: 'table', headers: ['Buchstabe', 'Frage'], rows: [['T','Wie groß/ausgedehnt ist der Primärtumor?'],['N','Sind regionale Lymphknoten befallen?'],['M','Gibt es Fernmetastasen?']] },
        ...practice('TNM', [
          'Erkläre T, N und M ohne nachzulesen.',
          'Was bedeutet bei T3 N1 M0 grundsätzlich: Tumor lokal fortgeschritten / Lymphknotenbefall / keine Fernmetastasen?',
          'Was kann das p vor pTNM bedeuten?'
        ]),

        { type: 'heading', title: '6.5 Krebsbehandlung' },
        { type: 'text', text: 'Die Therapie hängt von Tumorart, Stadium, Lage, molekularen Eigenschaften und Allgemeinzustand ab. Die alte Merkhilfe „Stahl – Strahl – Chemie“ erinnert an Operation, Strahlentherapie und medikamentöse systemische Therapie. Moderne Krebstherapie umfasst zusätzlich zum Beispiel zielgerichtete Medikamente und Immuntherapien. Nicht jede Tumorart erhält alle Verfahren.' },
        { type: 'video', title: 'Wie wird Krebs behandelt?', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Ordne die genannten Verfahren in lokal und systemisch wirkende Therapie ein.', url: 'https://gesund.bund.de/seltene-krebsarten' },
        ...practice('Therapie', [
          'Ordne „Stahl – Strahl – Chemie“ den Therapieprinzipien zu.',
          'Welche Verfahren wirken vor allem lokal, welche können im ganzen Körper wirken?',
          'Warum kann die Therapie bei zwei Menschen mit „Krebs“ völlig unterschiedlich sein?'
        ]),

        { type: 'heading', title: '6.6 Ösophagus-, Magen- und kolorektales Karzinom' },
        { type: 'text', text: 'Die Lernunterlage verknüpft das Ösophaguskarzinom besonders mit Alkohol/Nikotin und Dysphagie. Beim Magenkarzinom nennt sie unter anderem chronische Magenveränderungen, Appetitlosigkeit, unspezifische Magenbeschwerden, Gewichtsverlust und Hämatemesis. Beim kolorektalen Karzinom nennt sie Adipositas, fettreiche/ballaststoffarme Ernährung und Rauchen als Risiken sowie die Adenom-Polyp-Dysplasie-Karzinom-Abfolge. Komplikationen können Ileus oder Perforation sein.' },
        ...practice('GI-Tumoren', [
          'Fall Dysphagie + langjähriges Rauchen/Alkohol: Welche Tumorlokalisation muss bedacht werden?',
          'Fall Gewichtsverlust + Hämatemesis + chronische Magenprobleme: Welche Tumorgruppe passt?',
          'Erkläre Adenom/Polyp → Dysplasie → Karzinom.',
          'Nenne zwei Komplikationen eines kolorektalen Karzinoms aus der Unterlage.',
          'Warum kann ein Stoma nach Darmkrebsoperation notwendig werden?'
        ]),
      ],
    },

    {
      id: 'lf9-07-leber-galle-pankreas',
      title: '7. Gallensteine, Pankreatitis, Fettleber, Hepatitis & Zirrhose',
      content: [
        lesson(7, 'Diese Organe werden als zusammenhängendes System behandelt: erst Galle, dann Pankreas, dann Lebererkrankungen.', 'Die Auszubildende kann Cholelithiasis, Pankreatitis, Fettleber, Hepatitis A–C und Leberzirrhose anhand von Mechanismus, Symptomen, Diagnostik und Komplikationen unterscheiden.'),
        { type: 'image', src: organTeam, alt: 'Leber Gallenblase Pankreas', caption: 'Anatomische Nachbarschaft erklärt viele Zusammenhänge.' },

        { type: 'heading', title: '7.1 Gallensteine / Cholelithiasis' },
        { type: 'text', text: 'Gallensteine entstehen, wenn Bestandteile der Gallenflüssigkeit auskristallisieren und Steine bilden. Viele Gallensteine bleiben symptomlos. Blockiert ein Stein zeitweise einen Gallengang, können krampfartige, wellenförmige Schmerzen im rechten Oberbauch auftreten. Die Unterlage nutzt die Merkhilfe 6F: Female, Fair, Fat, Forty, Fertile, Family. Diese Merkhilfe ist ein Lernschema, keine vollständige Risikobewertung.' },
        { type: 'video', title: 'Wie entstehen Gallensteine?', source: 'gesund.bund.de', duration: 'Kurzvideo', caption: 'Achte auf Entstehung, Gallenkolik und mögliche Folgeerkrankungen.', url: 'https://gesund.bund.de/gallensteine' },
        ...practice('Gallensteine', [
          'Erkläre die 6F-Merkliste.',
          'Beschreibe eine Gallenkolik in eigenen Worten.',
          'Warum kann ein Stein symptomlos sein, solange er keinen Abfluss behindert?',
          'Nenne zwei Komplikationen aus der Unterlage: z. B. Cholezystitis und Verschlussikterus.'
        ]),

        { type: 'heading', title: '7.2 Verbindung Gallenstein ↔ Pankreatitis' },
        { type: 'text', text: 'Gallen- und Pankreasgänge münden anatomisch eng beieinander in den Zwölffingerdarm. Ein Stein im gemeinsamen Abflussbereich kann den Abfluss von Pankreassekret behindern und eine Pankreatitis begünstigen. Deshalb werden bei einer akuten Pankreatitis häufig Laborwerte wie Lipase bestimmt und der Oberbauch sonografisch untersucht.' },
        { type: 'video', title: 'Akute Entzündung der Bauchspeicheldrüse', source: 'gesund.bund.de', caption: 'Achte auf Gallensteine, Alkohol, Oberbauchschmerz, Lipase und Sonografie.', url: 'https://gesund.bund.de/entzuendung-der-bauchspeicheldruese' },
        ...practice('Pankreatitis', [
          'Warum kann ein Gallenstein eine Pankreatitis auslösen?',
          'Welcher Laborwert passt besonders zum Pankreas?',
          'Warum ist Sonografie bei Verdacht auf Gallenstein-Ursache sinnvoll?'
        ]),

        { type: 'heading', title: '7.3 Selbstverdauung des Pankreas' },
        { type: 'text', text: 'Verdauungsenzyme des Pankreas sollen normalerweise erst im Darm ihre volle Wirkung entfalten. Werden Enzyme zu früh aktiviert oder kann Sekret nicht richtig abfließen, kann Pankreasgewebe geschädigt werden. Die Lernunterlage beschreibt dies vereinfacht als „Selbstverdauung“. Genannte Ursachen sind unter anderem Gallensteine, Alkohol/Rauchen und Infektionen.' },
        ...practice('Selbstverdauung', [
          'Erkläre „Selbstverdauung“ in zwei Sätzen.',
          'Warum wäre es problematisch, wenn Proteasen bereits im Pankreas aktiv werden?',
          'Nenne zwei Ursachen aus der Lernunterlage.'
        ]),

        { type: 'heading', title: '7.4 Leberfunktionen – Grundlage für Lebererkrankungen' },
        { type: 'text', text: 'Die Leber verarbeitet Nährstoffe aus dem Darm, speichert unter anderem Glykogen, bildet Galle, produziert zahlreiche Eiweiße einschließlich Gerinnungsfaktoren und verändert beziehungsweise entgiftet viele Stoffe. Deshalb können Lebererkrankungen sehr unterschiedliche Folgen haben: Stoffwechselstörungen, Gelbsucht, Gerinnungsprobleme, Flüssigkeitseinlagerungen oder Veränderungen des Hormonstoffwechsels.' },
        { type: 'video', title: 'Welche Funktion hat die Leber?', source: 'Stiftung Gesundheitswissen', duration: '2:04 Min.', caption: 'Notiere mindestens vier Leberfunktionen.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/koerper-wissen/welche-funktion-hat-die-leber', embedUrl: 'https://www.youtube-nocookie.com/embed/xQHJVi0qtV8' },
        ...practice('Leberfunktion', [
          'Nenne vier Funktionen der Leber.',
          'Warum kann eine schwere Lebererkrankung den INR beeinflussen?',
          'Warum kann Bilirubin bei Leber-/Gallenproblemen relevant sein?'
        ]),

        { type: 'image', src: liverPath, alt: 'Fettleber bis Zirrhose', caption: 'Mögliche Fortschreitung chronischer Leberschädigung.' },
        { type: 'heading', title: '7.5 Fettleber' },
        { type: 'text', text: 'Bei einer Fettleber lagert sich vermehrt Fett in Leberzellen ein. Die Lernunterlage nennt unter anderem Adipositas, Gewichtsschwankungen und Alkohol. Früh kann die Erkrankung symptomarm sein. Wichtig ist die Vorstellung, dass eine reine Fetteinlagerung nicht dasselbe wie eine Zirrhose ist, aber bei anhaltender Schädigung Entzündung und Fibrose folgen können.' },
        { type: 'video', title: 'Fettleber', source: 'gesund.bund.de', caption: 'Achte auf Ursachen, häufig fehlende Anfangssymptome und möglichen Verlauf.', url: 'https://gesund.bund.de/nicht-alkoholische-fettleber' },
        ...practice('Fettleber', [
          'Nenne drei Ursachen/Risikofaktoren aus Unterlage oder Video.',
          'Warum wird eine Fettleber oft zufällig entdeckt?',
          'Ordne: Fetteinlagerung / Entzündung / Fibrose / Zirrhose.'
        ]),

        { type: 'heading', title: '7.6 Hepatitis – Leberentzündung mit unterschiedlichen Ursachen' },
        { type: 'text', text: 'Hepatitis bedeutet Leberentzündung. Ursachen können Viren, Alkohol, Autoimmunerkrankungen oder andere Lebererkrankungen sein. Die Unterlage nennt Müdigkeit, Druck im rechten Oberbauch und Ikterus. Chronische Hepatitis kann über Fibrose zur Zirrhose führen.' },
        { type: 'table', headers: ['Virus', 'Typischer Übertragungsweg im Lernstoff', 'Impfung'], rows: [['Hepatitis A','fäkal-oral','ja'],['Hepatitis B','Blut/Körperflüssigkeiten, sexuell, vertikal','ja'],['Hepatitis C','vor allem Blut/parenteral','nein']] },
        ...practice('Virushepatitis', [
          'Vergleiche Hepatitis A, B und C nach Übertragung und Impfmöglichkeit.',
          'Welche beiden Formen sind durch Impfung vermeidbar?',
          'Warum ist Hepatitis B für Beschäftigte im Gesundheitswesen besonders relevant?',
          'Welche Form hat keine Impfung?'
        ]),

        { type: 'heading', title: '7.7 Leberzirrhose – narbiger Umbau' },
        { type: 'text', text: 'Bei der Leberzirrhose wird funktionsfähiges Lebergewebe zunehmend durch narbiges Bindegewebe ersetzt. Dadurch kann Blut schlechter durch die Leber fließen und die Leberfunktion abnehmen. Die Unterlage nennt Ikterus, Lackzunge, Palmarerythem, Spider naevi, Ösophagusvarizen und Aszites. Gefährliche Komplikationen sind unter anderem Varizenblutung und Leberzellkarzinom.' },
        { type: 'video', title: 'Leberzirrhose', source: 'gesund.bund.de', caption: 'Vertiefung: Ursachen, Vernarbung, Komplikationen und Behandlung.', url: 'https://gesund.bund.de/leberzirrhose' },
        ...practice('Zirrhose', [
          'Definiere Zirrhose in einem Satz.',
          'Nenne vier klinische Zeichen aus der Unterlage.',
          'Warum können Ösophagusvarizen lebensgefährlich sein?',
          'Warum kann die Leberfunktion deutlich eingeschränkt sein, auch wenn einzelne Enzymwerte nicht extrem erhöht sind?'
        ]),
      ],
    },

    {
      id: 'lf9-08-metabolisch',
      title: '8. Metabolisches Syndrom – Adipositas, Hyperlipidämie & Gicht',
      content: [
        lesson(8, 'Heute werden die Stoffwechselthemen nicht als isolierte Definitionen gelernt. Wir bauen Ursache-Folge-Ketten und rechnen zwischendurch.', 'Die Auszubildende kann BMI berechnen, metabolisches Syndrom erklären, LDL/HDL unterscheiden, Arteriosklerose ableiten und den Gichtmechanismus erklären.'),
        { type: 'image', src: metabolic, alt: 'Metabolisches Syndrom', caption: 'Mehrere Risikofaktoren treten häufig gemeinsam auf und erhöhen das Gefäßrisiko.' },

        { type: 'heading', title: '8.1 Was bedeutet metabolisches Syndrom?' },
        { type: 'text', text: 'Der Begriff beschreibt eine Kombination mehrerer Stoffwechsel- und Herz-Kreislauf-Risikofaktoren. In der Lernunterlage werden vor allem Übergewicht beziehungsweise zentrale Adipositas, arterielle Hypertonie, ungünstige Blutfette und Typ-2-Diabetes beziehungsweise gestörter Glukosestoffwechsel miteinander verknüpft. Häufig kommt zusätzlich eine Hyperurikämie vor.' },
        ...practice('Metabolisches Syndrom', [
          'Nenne vier zentrale Komponenten.',
          'Warum ist die Kombination riskanter als ein einzelner Faktor?',
          'Baue eine mögliche Kette: Adipositas → Insulinresistenz → Typ-2-Diabetes.'
        ]),

        { type: 'heading', title: '8.2 Adipositas und BMI' },
        { type: 'text', text: 'Der Body-Mass-Index setzt Körpergewicht in Beziehung zur Körpergröße: BMI = kg / m². Die Lernunterlage verwendet >25 kg/m² für Übergewicht und >30 kg/m² für Adipositas. Der BMI ist ein grobes Screeningmaß und unterscheidet nicht zwischen Fett- und Muskelmasse. Zusätzlich kann die Fettverteilung betrachtet werden, weil viszerales Bauchfett metabolisch besonders relevant ist.' },
        { type: 'video', title: 'Was bedeutet Adipositas?', source: 'Stiftung Gesundheitswissen', duration: '2:30 Min.', caption: 'Achte auf BMI, Ursachen und Therapieprinzipien.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/adipositas/was-bedeutet-adipositas', embedUrl: 'https://www.youtube-nocookie.com/embed/xXfyJRLluL4' },
        ...practice('BMI', [
          'Berechne den BMI bei 92 kg und 1,70 m.',
          'Ordne den Wert nach der Lernunterlage ein.',
          'Warum kann der BMI bei sehr muskulösen Personen zu Fehlinterpretationen führen?',
          'Welche zusätzliche Körpermessung kann Hinweise auf zentrale Fettverteilung geben?'
        ]),

        { type: 'heading', title: '8.3 Folgeerkrankungen der Adipositas' },
        { type: 'text', text: 'Die Lernunterlage verknüpft Adipositas unter anderem mit Arteriosklerose, Thrombosen, Gallensteinen, Fettleber, Arthrose, Reflux und Stoffwechselerkrankungen. Wichtig ist nicht, jede Folge einzeln zu memorieren, sondern die Mechanismen zu verstehen: mechanische Mehrbelastung, veränderte Stoffwechselhormone, Insulinresistenz und erhöhte Gefäßrisiken.' },
        { type: 'video', title: 'Wie ungesund ist Adipositas?', source: 'Stiftung Gesundheitswissen', duration: '2:28 Min.', caption: 'Notiere vier mögliche Begleiterkrankungen und ordne sie mechanisch/metabolisch zu.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/adipositas/wie-ungesund-ist-adipositas', embedUrl: 'https://www.youtube-nocookie.com/embed/CW2K3mNEWg0' },
        ...practice('Adipositasfolgen', [
          'Nenne vier Folgeerkrankungen/Risiken.',
          'Warum kann Übergewicht Reflux begünstigen?',
          'Warum passt Fettleber in den Stoffwechselkontext?',
          'Welche Folge ist eher mechanisch: Arthrose oder Hyperlipidämie?'
        ]),

        { type: 'image', src: lipidsGout, alt: 'Blutfette und Gicht', caption: 'Zwei Stoffwechselketten, die sich gut als Pfeildiagramm lernen lassen.' },
        { type: 'heading', title: '8.4 Hyperlipidämie – LDL, HDL und Plaques' },
        { type: 'text', text: 'Cholesterin ist ein notwendiger Körperstoff, wird aber in Lipoproteinen transportiert. LDL transportiert Cholesterin von der Leber zu Geweben. Bei dauerhaft hohen LDL-Werten kann Cholesterin in Gefäßwänden abgelagert werden und zur Plaquebildung beitragen. HDL ist am Rücktransport von Cholesterin Richtung Leber beteiligt. Triglyzeride sind eine weitere wichtige Blutfettgruppe. Ungünstige Blutfette erhöhen das Risiko für arteriosklerotische Erkrankungen wie KHK, pAVK und Schlaganfall.' },
        { type: 'video', title: 'Was ist Cholesterin?', source: 'Stiftung Gesundheitswissen', caption: 'Achte auf LDL, HDL, Leber und Gefäßablagerungen.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/erhoehte-blutfettwerte/was-ist-cholesterin' },
        ...practice('Blutfette', [
          'Erkläre LDL und HDL ohne nur „schlecht/gut“ zu sagen.',
          'Erkläre LDL hoch → Plaque → Gefäßverengung → KHK/pAVK/Schlaganfall.',
          'Was sind Triglyzeride?',
          'Nenne drei Lebensstilmaßnahmen, die Teil einer Behandlung ungünstiger Blutfette sein können.'
        ]),
        { type: 'video', title: 'Wie helfen Statine bei erhöhten Cholesterinwerten?', source: 'Stiftung Gesundheitswissen', caption: 'Vertiefung: Wie beeinflussen Statine die Cholesterinproduktion in der Leber?', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/erhoehte-blutfettwerte/wie-helfen-statine-bei-erhoehten-cholesterinwerten' },
        ...practice('Statine', [
          'Was ist das grundsätzliche Therapieziel bei hohem LDL?',
          'Warum ist Medikamententherapie nicht dasselbe wie „Ernährung ist egal“?'
        ]),

        { type: 'heading', title: '8.5 Hyperurikämie und Gicht' },
        { type: 'text', text: 'Purine sind Bestandteile von Zellen und werden im Körper zu Harnsäure abgebaut. Ist die Harnsäurekonzentration dauerhaft erhöht, können Uratkristalle ausfallen. Lagern sie sich in Gelenken ab, kann eine sehr schmerzhafte akute Entzündung entstehen: Arthritis urica. Klassisch betroffen ist das Großzehengrundgelenk. Die Lernunterlage nutzt >7 mg/dl als Merkwert; aktuelle Informationsquellen verwenden je nach Kontext andere Grenz- beziehungsweise Sättigungswerte, deshalb wird in Schulaufgaben klar zwischen Unterlagenwert und aktueller Praxisinformation unterschieden.' },
        { type: 'video', title: 'Gicht – Ursachen, Verlauf und Behandlung', source: 'gesund.bund.de', caption: 'Achte auf Harnsäure, Kristalle und Gelenkentzündung.', url: 'https://gesund.bund.de/gicht' },
        ...practice('Gicht', [
          'Erkläre Purin → Harnsäure → Uratkristall → Arthritis urica.',
          'Warum ist das Großzehengrundgelenk ein klassischer Prüfungsbezug?',
          'Was ist der Unterschied zwischen Hyperurikämie und Gicht?',
          'Nenne zwei Ansatzpunkte der Behandlung: Harnsäure senken/Risikofaktoren beeinflussen und akute Entzündung behandeln.'
        ]),
      ],
    },

    {
      id: 'lf9-09-diabetes-grundlagen',
      title: '9. Diabetes I – Glukosestoffwechsel, Insulin, Typ 1 & Typ 2',
      content: [
        lesson(9, 'Diabetes wird nicht mit Diagnosewerten begonnen. Erst wird der normale Regelkreis verstanden, dann werden Typ 1 und Typ 2 als Störungen dieses Systems aufgebaut.', 'Die Auszubildende kann Insulin und Glukagon erklären, typische Symptome mechanistisch ableiten und Typ 1 von Typ 2 sicher unterscheiden.'),
        { type: 'image', src: glucose, alt: 'Insulin und Glukagon', caption: 'Erst den Normalzustand lernen – dann Diabetes.' },

        { type: 'heading', title: '9.1 Was passiert nach einer Mahlzeit mit Glukose?' },
        { type: 'text', text: 'Kohlenhydrate werden zu kleinen Zuckerbausteinen verdaut. Glukose gelangt aus dem Dünndarm ins Blut und der Blutzucker steigt. Die Betazellen der Langerhans-Inseln im Pankreas schütten Insulin aus. Insulin ermöglicht beziehungsweise erleichtert vielen Körperzellen die Aufnahme von Glukose und fördert Speicherung, zum Beispiel als Glykogen in Leber und Muskel. Dadurch sinkt der Blutzucker wieder.' },
        { type: 'video', title: 'Wie wird der Blutzucker reguliert?', source: 'Stiftung Gesundheitswissen', duration: '2:21 Min.', caption: 'Achte auf Pankreas, Insulin und Glukoseaufnahme. Zeichne danach den Regelkreis.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/diabetes/wie-wird-der-blutzucker-reguliert', embedUrl: 'https://www.youtube-nocookie.com/embed/LGStk64kHhQ' },
        ...practice('Insulin', [
          'Beschreibe Kohlenhydratmahlzeit → Glukose im Blut → Insulin → Zellaufnahme.',
          'Warum sinkt der Blutzucker nach Insulinausschüttung?',
          'Wo kann überschüssige Glukose gespeichert werden?'
        ]),

        { type: 'heading', title: '9.2 Glukagon – Gegenspieler in Nüchternphasen' },
        { type: 'text', text: 'Zwischen Mahlzeiten oder bei fallendem Blutzucker sorgt der Körper dafür, dass wieder Glukose bereitgestellt wird. Glukagon wird in den Alphazellen des Pankreas gebildet und fördert unter anderem die Freisetzung von Glukose aus Speichern. Dadurch steigt der Blutzucker. Insulin und Glukagon wirken also als Gegenspieler in einem Regelkreis.' },
        ...practice('Glukagon', [
          'Was passiert mit Glukagon, wenn der Blutzucker zu niedrig wird?',
          'Erkläre den Gegensatz Insulin vs. Glukagon in einem Satz.',
          'Warum ist ein Regelkreis sinnvoller als ein Hormon, das immer nur den Blutzucker senkt?'
        ]),

        { type: 'heading', title: '9.3 Warum entstehen Polyurie und Polydipsie?' },
        { type: 'text', text: 'Bei stark erhöhtem Blutzucker kann die Niere nicht mehr die gesamte filtrierte Glukose zurückgewinnen. Glukose erscheint im Urin. Sie bindet osmotisch Wasser, sodass die Urinmenge steigt. Die Patientin oder der Patient verliert Flüssigkeit und entwickelt starken Durst. Die Lernunterlage nutzt dafür eine Nierenschwelle von etwa 180 mg/dl als Lernwert.' },
        ...practice('Symptomkette', [
          'Erkläre Hyperglykämie → Glukosurie → Polyurie → Polydipsie.',
          'Warum kann eine Person trotz starkem Trinken austrocknen?',
          'Welche zwei Symptome sollten dich im Zusammenhang mit Diabetes besonders aufmerksam machen?'
        ]),

        { type: 'image', src: diabetes, alt: 'Typ 1 Typ 2', caption: 'Typ 1 = Insulin fehlt. Typ 2 = Insulin wirkt zunächst schlechter.' },
        { type: 'heading', title: '9.4 Diabetes Typ 1' },
        { type: 'text', text: 'Beim Typ-1-Diabetes zerstört eine Autoimmunreaktion die insulinproduzierenden Betazellen. Dadurch entsteht ein absoluter Insulinmangel. Ohne Insulin kann Glukose nicht ausreichend in viele Körperzellen gelangen, obwohl viel Glukose im Blut vorhanden sein kann. Typische Beschwerden können starker Durst, häufiges Wasserlassen, Müdigkeit, Gewichtsverlust und bei Entgleisung Bauchschmerzen sein. Insulin ist von Beginn an lebensnotwendig.' },
        { type: 'video', title: 'Diabetes Typ 1', source: 'gesund.bund.de', caption: 'Notiere Ursache, Symptome und warum Insulin notwendig ist.', url: 'https://gesund.bund.de/diabetes-typ-1' },
        ...practice('Typ 1', [
          'Warum spricht man von absolutem Insulinmangel?',
          'Warum kann trotz hohem Blutzucker Gewichtsverlust auftreten?',
          'Fall: junger Mensch, starker Durst, Polyurie, Müdigkeit und Gewichtsverlust. Welche Diabetesform ist besonders zu bedenken?'
        ]),

        { type: 'heading', title: '9.5 Diabetes Typ 2' },
        { type: 'text', text: 'Beim Typ-2-Diabetes ist zunächst oft noch Insulin vorhanden. Die Körperzellen reagieren jedoch schlechter darauf: Insulinresistenz. Das Pankreas versucht dies zunächst durch mehr Insulin zu kompensieren. Über Jahre kann die Insulinproduktion nachlassen. Typ 2 entwickelt sich häufig schleichend. Risikofaktoren sind unter anderem genetische Veranlagung, Adipositas und Bewegungsmangel. Beschwerden können Polyurie, Durst, Müdigkeit, Juckreiz oder wiederkehrende Infektionen sein.' },
        { type: 'video', title: 'Was ist Diabetes mellitus Typ 2?', source: 'Stiftung Gesundheitswissen', duration: '3:09 Min.', caption: 'Achte auf Insulinresistenz, schleichenden Verlauf, Beschwerden und Folgeerkrankungen.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/diabetes/was-ist-diabetes-mellitus-typ-2', embedUrl: 'https://www.youtube-nocookie.com/embed/PKmu73E--DQ' },
        ...practice('Typ 2', [
          'Definiere Insulinresistenz.',
          'Warum produziert das Pankreas anfangs oft mehr Insulin?',
          'Fall: ältere Person, Adipositas, schleichender Verlauf, Juckreiz/Mykosen. Welche Diabetesform passt eher?',
          'Warum kann Typ 2 lange unentdeckt bleiben?'
        ]),

        { type: 'heading', title: '9.6 Typ 1 und Typ 2 direkt vergleichen' },
        { type: 'table', headers: ['Merkmal', 'Typ 1', 'Typ 2'], rows: [['Mechanismus','Autoimmunzerstörung der Betazellen','Insulinresistenz, später Insulinmangel möglich'],['Insulin','absoluter Mangel','anfangs vorhanden'],['Beginn','häufig rascher','häufig schleichend'],['Therapieprinzip','Insulin','Lebensstil + Medikamente, ggf. Insulin']] },
        ...practice('Vergleich', [
          'Nenne fünf Unterschiede zwischen Typ 1 und Typ 2.',
          'Warum ist Typ 1 von Beginn an insulinpflichtig?',
          'Warum kann bei Typ 2 später trotzdem Insulin notwendig werden?'
        ]),
      ],
    },

    {
      id: 'lf9-10-diabetes-diagnostik',
      title: '10. Diabetes II – Gestationsdiabetes, Diagnostik, Entgleisungen, Spätfolgen & Therapie',
      content: [
        lesson(10, 'Die letzte Doppelstunde verbindet Diagnostik, Komplikationen und Therapie. Nach jedem Teil folgt sofort eine Übung; am Ende gibt es eine kurze integrierte Prüfungssimulation statt eines langen separaten Aufgabenblocks.', 'Die Auszubildende kann OGTT/HbA1c/Urin erklären, Hypo- und Hyperglykämie unterscheiden, Spätfolgen zuordnen und Grundprinzipien der Diabetesbehandlung beschreiben.'),

        { type: 'heading', title: '10.1 Gestationsdiabetes' },
        { type: 'text', text: 'Während der Schwangerschaft verändern Hormone die Insulinwirkung. Bei entsprechender Veranlagung kann der Blutzucker ansteigen. Schwangerschaftsdiabetes bleibt häufig symptomarm. Mögliche Folgen sind ein besonders starkes fetales Wachstum (Makrosomie) und nach der Geburt eine Unterzuckerung des Neugeborenen, weil dessen Insulinproduktion an den hohen mütterlichen Glukosespiegel angepasst war.' },
        { type: 'video', title: 'Schwangerschaftsdiabetes', source: 'gesund.bund.de', caption: 'Achte auf Risikofaktoren, Screening und Behandlung.', url: 'https://gesund.bund.de/schwangerschaftsdiabetes' },
        ...practice('Gestationsdiabetes', [
          'Warum kann Gestationsdiabetes symptomarm bleiben?',
          'Erkläre, warum der Fetus besonders groß werden kann.',
          'Warum kann das Neugeborene nach der Geburt unterzuckern?'
        ]),

        { type: 'heading', title: '10.2 OGTT – Belastungstest statt Einzelwert' },
        { type: 'text', text: 'Beim oralen Glukosetoleranztest wird nach standardisierten Bedingungen Glukose getrunken und der Blutzucker zu festgelegten Zeitpunkten gemessen. So wird geprüft, wie der Körper mit einer definierten Glukosemenge umgeht. Die exakten Grenzwerte hängen von Fragestellung und aktueller Leitlinie ab. Für Schulaufgaben werden die jeweils vorgegebenen Werte verwendet.' },
        ...practice('OGTT', [
          'Erkläre den Ablauf ohne Zahlen in vier Schritten.',
          'Warum ist ein Belastungstest aussagekräftiger als nur „irgendwann am Tag einmal Blutzucker messen“?',
          'Welche Vorbereitungsbedingungen könnten das Ergebnis verfälschen, wenn sie nicht eingehalten werden?'
        ]),

        { type: 'heading', title: '10.3 HbA1c – Langzeitinformation' },
        { type: 'text', text: 'HbA1c ist Hämoglobin, an das Glukose gebunden ist. Je höher der Blutzucker über längere Zeit, desto mehr Hämoglobin wird verzuckert. Deshalb spiegelt HbA1c grob die Blutzuckerbelastung der vergangenen etwa zwei bis drei Monate wider. Er ist kein unmittelbarer Momentwert und reagiert nicht auf eine einzelne Mahlzeit wie eine aktuelle Blutzuckermessung.' },
        ...practice('HbA1c', [
          'Warum ist HbA1c ein Langzeitwert?',
          'Warum kann ein heute normaler Blutzucker einen über längere Zeit hohen HbA1c nicht automatisch widerlegen?',
          'Bisherige Unterlage: Welchen Zeitraum nannte sie ungefähr?'
        ]),

        { type: 'heading', title: '10.4 Urindiagnostik bei Diabetes' },
        { type: 'text', text: 'Im Urin können Glukose, Ketonkörper und Albumin untersucht werden. Glukose weist auf eine Überschreitung der renalen Rückresorptionskapazität hin. Ketonkörper können besonders bei ausgeprägtem Insulinmangel entstehen. Albumin beziehungsweise Mikroalbumin kann ein frühes Zeichen einer diabetischen Nierenschädigung sein.' },
        ...practice('Urin', [
          'Nenne die drei Stoffgruppen Glukose, Ketone und Albumin.',
          'Warum ist Mikroalbumin relevant?',
          'Welche Verbindung besteht zwischen Insulinmangel und Ketonkörpern?'
        ]),

        { type: 'heading', title: '10.5 Hyperglykämie und Ketoazidose' },
        { type: 'text', text: 'Hyperglykämie bedeutet zu hoher Blutzucker. Bei starkem Insulinmangel, besonders bei Typ 1, kann der Körper vermehrt Fett abbauen. Dabei entstehen Ketonkörper. Sammeln sich saure Ketonkörper an, kann eine diabetische Ketoazidose entstehen. Sie ist ein medizinischer Notfall. Typische Warnzeichen können ausgeprägter Durst, häufiges Wasserlassen, Übelkeit/Erbrechen, Bauchschmerzen, tiefe Atmung, Acetongeruch und Bewusstseinsstörung sein.' },
        ...practice('Hyperglykämie/Ketoazidose', [
          'Erkläre Insulinmangel → Fettabbau → Ketonkörper → Übersäuerung.',
          'Nenne drei Warnzeichen.',
          'Warum passt Bauchschmerz bei einem jungen Menschen auch zu entgleistem Typ-1-Diabetes?'
        ]),

        { type: 'heading', title: '10.6 Hypoglykämie – zu wenig Glukose fürs Gehirn' },
        { type: 'text', text: 'Hypoglykämie bedeutet zu niedriger Blutzucker. Das Gehirn ist stark auf Glukose angewiesen. Deshalb können zunächst Schwitzen, Zittern, Herzklopfen und Heißhunger auftreten; bei stärkerer Unterzuckerung sind Verwirrtheit, Krampfanfälle oder Bewusstlosigkeit möglich. Ursachen können zum Beispiel zu viel blutzuckersenkendes Medikament/Insulin, zu wenig Kohlenhydrataufnahme oder ungeplante starke körperliche Belastung sein.' },
        ...practice('Hypoglykämie', [
          'Nenne vier mögliche Symptome.',
          'Warum ist Bewusstlosigkeit bei Hypoglykämie gefährlich?',
          'Welche drei Auslöser können das Verhältnis von Insulin und verfügbarer Glukose verschieben?'
        ]),

        { type: 'image', src: diabetesComplications, alt: 'Mikro- und Makroangiopathie', caption: 'Spätfolgen nach kleinen und großen Gefäßen ordnen.' },
        { type: 'heading', title: '10.7 Langzeitfolgen – Gefäße, Nerven und Organe' },
        { type: 'text', text: 'Dauerhaft hohe Blutzuckerwerte schädigen Gefäße und Nerven. Mikroangiopathische Folgen betreffen kleine Gefäße, besonders Retina und Niere. Diabetische Neuropathie betrifft Nerven. Makroangiopathische Folgen betreffen größere Arterien und erhöhen das Risiko für KHK/Herzinfarkt, pAVK und Schlaganfall. Beim diabetischen Fuß wirken Neuropathie, Durchblutungsstörung, Druckbelastung und schlechtere Wundheilung zusammen.' },
        ...practice('Spätfolgen', [
          'Ordne Retinopathie, Nephropathie und Neuropathie.',
          'Nenne drei makroangiopathische Folgen.',
          'Warum kann ein diabetischer Fuß wenig schmerzen und trotzdem gefährlich sein?',
          'Warum sind regelmäßige Fußkontrollen sinnvoll?'
        ]),

        { type: 'heading', title: '10.8 Grundprinzipien der Therapie' },
        { type: 'text', text: 'Bei Typ 1 ist Insulin unverzichtbar. In der Insulintherapie können langsam beziehungsweise länger wirkende Basal-/Depotinsuline und schneller wirksame Mahlzeiteninsuline kombiniert werden. Bei Typ 2 gehören Lebensstilmaßnahmen zur Basis; je nach Situation kommen Medikamente wie Metformin und weitere Wirkstoffgruppen hinzu. Manche Menschen mit Typ 2 benötigen später Insulin. Therapieentscheidungen richten sich nach individuellen Zielen, Begleiterkrankungen und aktuellen Leitlinien.' },
        { type: 'video', title: 'Diabetes Typ 2 – wie werden Medikamente ausgewählt?', source: 'Stiftung Gesundheitswissen', duration: '2:35 Min.', caption: 'Achte darauf, warum nicht jeder Mensch sofort dieselbe Medikation erhält und wann Insulin infrage kommen kann.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/diabetes/diabetes-typ-2-wie-werden-medikamente-ausgewaehlt', embedUrl: 'https://www.youtube-nocookie.com/embed/GU5h1xNZJg4' },
        ...practice('Therapie', [
          'Warum braucht Typ 1 Insulin?',
          'Unterscheide Basal-/Depotinsulin und schnell wirksames Insulin nach Aufgabe.',
          'Welche Rolle spielen Lebensstilmaßnahmen bei Typ 2?',
          'Warum kann auch Typ 2 später insulinpflichtig werden?'
        ]),

        { type: 'heading', title: '10.9 Integrierte Prüfungssimulation – in kurzen Etappen' },
        { type: 'text', text: 'Statt 30 Minuten Aufgaben am Stück folgen fünf kurze Fälle. Bearbeite jeweils nur einen Fall und korrigiere direkt danach.' },
        ...practice('Fall 1 – Verdauung', [
          'Ein belegtes Vollkornbrot wird gegessen. Nenne Mund, Magen, Dünndarm und Dickdarm mit je einer Funktion.',
          'Nenne Amylase, Pepsin/Protease und Lipase mit passendem Nährstoff.'
        ]),
        ...practice('Fall 2 – Oberbauch', [
          'Rechter Oberbauchschmerz in Wellen nach fettreicher Mahlzeit: Welche Erkrankung passt?',
          'Welche Untersuchung ist häufig zunächst sinnvoll und welcher Pankreas-Laborwert wäre bei zusätzlichem Pankreatitisverdacht wichtig?'
        ]),
        ...practice('Fall 3 – Unterbauch', [
          'Bekannte Divertikel + linker Unterbauchschmerz + Fieber: Welche Diagnose?',
          'Welche Komplikation droht bei Perforation?'
        ]),
        ...practice('Fall 4 – Tumor', [
          'Dysphagie + Alkohol/Nikotin: Welche Tumorlokalisation ist ein wichtiger Lernfeldbezug?',
          'Erkläre T, N und M.'
        ]),
        ...practice('Fall 5 – Diabetes', [
          'Starker Durst + Polyurie: Erkläre die Symptomkette.',
          'Ordne Typ 1 vs. Typ 2.',
          'Nenne HbA1c, OGTT und Urinuntersuchung mit je einer Aussage.'
        ]),
      ],
    },

    {
      id: 'video-mediathek',
      title: '🎬 Video-Mediathek Lernfeld 9 – alle bisherigen + neue Videos',
      content: [
        { type: 'info', title: 'So werden Videos genutzt', text: 'Vor jedem Video steht eine Beobachtungsfrage. Danach das Video stoppen und den Inhalt in 30–60 Sekunden ohne Text erklären. Videos ersetzen nicht die Erklärungen, sondern machen den Stoff anschaulicher.' },
        { type: 'heading', title: 'Grundlagen & Verdauung' },
        { type: 'video', title: 'Wie funktioniert das Verdauungssystem?', source: 'Stiftung Gesundheitswissen', duration: '2:26 Min.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/wie-funktioniert-das-verdauungssystem', embedUrl: 'https://www.youtube-nocookie.com/embed/ZOAaEX0xoTw', caption: 'Weg der Nahrung und Hauptaufgaben der Organe.' },
        { type: 'heading', title: 'Bisherige Videos aus den ersten drei Unterrichtseinheiten' },
        { type: 'video', title: 'Wie funktioniert Ultraschall?', source: 'Stiftung Gesundheitswissen', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/koerper-wissen/wie-funktioniert-ultraschall', caption: 'Schallwelle → Echo → Bild.' },
        { type: 'video', title: 'Magenspiegelung', source: 'MVZ Landsberg / YouTube', url: 'https://www.youtube.com/watch?v=0cXtwoKzx04', caption: 'Instrument, Weg, Organe und Nutzen.' },
        { type: 'video', title: 'Infektionskrankheiten / Norovirus-Kontext', source: 'gesund.bund.de', url: 'https://gesund.bund.de/norovirus', caption: 'Infektion, Erreger und Übertragung.' },
        { type: 'video', title: 'Laktoseintoleranz', source: 'SRF', url: 'https://www.srf.ch/play/tv/srf-videos-zur-kostenlosen-nutzung/video/wissen-fuer-alle---wie-entwickelt-sich-eine-laktoseintoleranz?urn=urn:srf:video:6cdd8648-7bee-4d3a-b00c-c1f19350e4da', caption: 'Laktase und ungespaltener Milchzucker.' },
        { type: 'video', title: 'Refluxkrankheit', source: 'gesund.bund.de', url: 'https://gesund.bund.de/sodbrennen-refluxkrankheit', caption: 'Sphinkter, Rückfluss und Sodbrennen.' },
        { type: 'video', title: 'Blinddarmentzündung', source: 'gesund.bund.de', url: 'https://gesund.bund.de/blinddarmentzuendung', caption: 'Wurmfortsatz, Schmerzverlauf und Perforation.' },
        { type: 'video', title: 'Gastritis', source: 'gesund.bund.de', url: 'https://gesund.bund.de/gastritis', caption: 'Ursachen und Symptome.' },
        { type: 'video', title: 'Divertikulitis', source: 'SWR / ARD', url: 'https://www.ardmediathek.de/video/doc-fischer/schmerzen-im-bauch-was-tun-bei-divertikulitis/swr/Y3JpZDovL3N3ci5kZS9hZXgvbzE5NTE4Mzc', caption: 'Beschwerden, Diagnostik und Behandlung.' },
        { type: 'video', title: 'Darmkrebsvorsorge – Stuhltest oder Darmspiegelung?', source: 'KBV', duration: '1:05 Min.', url: 'https://www.kbv.de/video/6425', caption: 'Rolle von iFOBT und Koloskopie.' },
        { type: 'video', title: 'Hämorrhoiden', source: 'gesund.bund.de', url: 'https://gesund.bund.de/haemorrhoiden', caption: 'Symptome und Ursachen.' },
        { type: 'heading', title: 'Tumore, Leber, Galle & Pankreas' },
        { type: 'video', title: 'Was ist Krebs?', source: 'gesund.bund.de', url: 'https://gesund.bund.de/cup-syndrom', caption: 'Krebsentstehung und metastatisches Wachstum.' },
        { type: 'video', title: 'Primärtumor und Metastasen', source: 'gesund.bund.de', url: 'https://gesund.bund.de/darmkrebs', caption: 'Ursprungstumor vs. Tochtergeschwülste.' },
        { type: 'video', title: 'Wie wird Krebs behandelt?', source: 'gesund.bund.de', url: 'https://gesund.bund.de/seltene-krebsarten', caption: 'Operation, Bestrahlung und systemische Therapie.' },
        { type: 'video', title: 'Gallensteine', source: 'gesund.bund.de', url: 'https://gesund.bund.de/gallensteine', caption: 'Entstehung, Kolik und Komplikationen.' },
        { type: 'video', title: 'Akute Pankreatitis', source: 'gesund.bund.de', url: 'https://gesund.bund.de/entzuendung-der-bauchspeicheldruese', caption: 'Gallensteine, Alkohol, Lipase und Sonografie.' },
        { type: 'video', title: 'Funktion der Leber', source: 'Stiftung Gesundheitswissen', duration: '2:04 Min.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/koerper-wissen/welche-funktion-hat-die-leber', embedUrl: 'https://www.youtube-nocookie.com/embed/xQHJVi0qtV8', caption: 'Leberfunktionen.' },
        { type: 'video', title: 'Fettleber', source: 'gesund.bund.de', url: 'https://gesund.bund.de/nicht-alkoholische-fettleber', caption: 'Ursachen und Verlauf.' },
        { type: 'video', title: 'Leberzirrhose', source: 'gesund.bund.de', url: 'https://gesund.bund.de/leberzirrhose', caption: 'Vernarbung und Komplikationen.' },
        { type: 'heading', title: 'Metabolisches Syndrom & Diabetes' },
        { type: 'video', title: 'Was bedeutet Adipositas?', source: 'Stiftung Gesundheitswissen', duration: '2:30 Min.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/adipositas/was-bedeutet-adipositas', embedUrl: 'https://www.youtube-nocookie.com/embed/xXfyJRLluL4', caption: 'Definition, BMI, Ursachen.' },
        { type: 'video', title: 'Wie ungesund ist Adipositas?', source: 'Stiftung Gesundheitswissen', duration: '2:28 Min.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/adipositas/wie-ungesund-ist-adipositas', embedUrl: 'https://www.youtube-nocookie.com/embed/CW2K3mNEWg0', caption: 'Begleiterkrankungen.' },
        { type: 'video', title: 'Was ist Cholesterin?', source: 'Stiftung Gesundheitswissen', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/erhoehte-blutfettwerte/was-ist-cholesterin', caption: 'LDL, HDL und Gefäßablagerungen.' },
        { type: 'video', title: 'Wie helfen Statine?', source: 'Stiftung Gesundheitswissen', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/erhoehte-blutfettwerte/wie-helfen-statine-bei-erhoehten-cholesterinwerten', caption: 'LDL-Senkung und Leber.' },
        { type: 'video', title: 'Gicht', source: 'gesund.bund.de', url: 'https://gesund.bund.de/gicht', caption: 'Harnsäurekristalle und Gelenkentzündung.' },
        { type: 'video', title: 'Blutzuckerregulation', source: 'Stiftung Gesundheitswissen', duration: '2:21 Min.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/diabetes/wie-wird-der-blutzucker-reguliert', embedUrl: 'https://www.youtube-nocookie.com/embed/LGStk64kHhQ', caption: 'Insulin und Glukoseaufnahme.' },
        { type: 'video', title: 'Diabetes Typ 1', source: 'gesund.bund.de', url: 'https://gesund.bund.de/diabetes-typ-1', caption: 'Autoimmunprozess und Insulinmangel.' },
        { type: 'video', title: 'Diabetes Typ 2', source: 'Stiftung Gesundheitswissen', duration: '3:09 Min.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/diabetes/was-ist-diabetes-mellitus-typ-2', embedUrl: 'https://www.youtube-nocookie.com/embed/PKmu73E--DQ', caption: 'Insulinresistenz, Symptome und Folgen.' },
        { type: 'video', title: 'Schwangerschaftsdiabetes', source: 'gesund.bund.de', url: 'https://gesund.bund.de/schwangerschaftsdiabetes', caption: 'Screening und Risiken.' },
        { type: 'video', title: 'Diabetes Typ 2 – Medikamentenauswahl', source: 'Stiftung Gesundheitswissen', duration: '2:35 Min.', url: 'https://www.stiftung-gesundheitswissen.de/mediathek/videos/diabetes/diabetes-typ-2-wie-werden-medikamente-ausgewaehlt', embedUrl: 'https://www.youtube-nocookie.com/embed/GU5h1xNZJg4', caption: 'Therapieauswahl und Zeitpunkt für Medikamente/Insulin.' },
      ],
    },
  ],
  questions: [
    { id: 1, question: 'Welche drei Nährstoffgruppen liefern Energie?', type: 'multiple', options: [{id:'a',text:'Kohlenhydrate',correct:true},{id:'b',text:'Proteine',correct:true},{id:'c',text:'Fette',correct:true},{id:'d',text:'Vitamine'}], explanation: 'Kohlenhydrate, Proteine und Fette sind Makronährstoffe mit Energiegehalt.', points: 3 },
    { id: 2, question: 'Woraus bestehen Proteine?', type: 'single', options: [{id:'a',text:'Aminosäuren',correct:true},{id:'b',text:'Mineralstoffen'},{id:'c',text:'Bilirubin'},{id:'d',text:'Glykogen'}], explanation: 'Proteine sind Ketten aus Aminosäuren.', points: 2 },
    { id: 3, question: 'Welches Enzym beginnt im Mund die Stärkeverdauung?', type: 'single', options: [{id:'a',text:'Amylase',correct:true},{id:'b',text:'Pepsin'},{id:'c',text:'Lipase'},{id:'d',text:'Insulin'}], explanation: 'Speichelamylase beginnt die Spaltung von Stärke.', points: 2 },
    { id: 4, question: 'Wo findet der größte Teil der Nährstoffresorption statt?', type: 'single', options: [{id:'a',text:'Dünndarm',correct:true},{id:'b',text:'Speiseröhre'},{id:'c',text:'Mund'},{id:'d',text:'Enddarm'}], explanation: 'Der Dünndarm ist Hauptort der Resorption.', points: 2 },
    { id: 5, question: 'Welche Aufgabe hat die Gallenblase?', type: 'single', options: [{id:'a',text:'Galle speichern und konzentrieren',correct:true},{id:'b',text:'Insulin bilden'},{id:'c',text:'Pepsin bilden'},{id:'d',text:'Stuhl speichern'}], explanation: 'Die Leber bildet Galle; die Gallenblase speichert und konzentriert sie.', points: 2 },
    { id: 6, question: 'Welche Untersuchung arbeitet mit Schallwellen?', type: 'single', options: [{id:'a',text:'Sonografie',correct:true},{id:'b',text:'Gastroskopie'},{id:'c',text:'Proktoskopie'},{id:'d',text:'Stuhltest'}], explanation: 'Ultraschall nutzt Schallwellen und Echos.', points: 2 },
    { id: 7, question: 'Welche Untersuchung betrachtet die Magenschleimhaut direkt?', type: 'single', options: [{id:'a',text:'Gastroskopie',correct:true},{id:'b',text:'Sonografie nur'},{id:'c',text:'EKG'},{id:'d',text:'Audiometrie'}], explanation: 'Die Gastroskopie ermöglicht direkte Schleimhautbeurteilung.', points: 2 },
    { id: 8, question: 'Welcher Laborwert passt besonders zum Pankreas?', type: 'single', options: [{id:'a',text:'Lipase',correct:true},{id:'b',text:'INR'},{id:'c',text:'TSH'},{id:'d',text:'Hb'}], explanation: 'Lipase wird im Pankreas gebildet und ist bei Pankreatitis diagnostisch wichtig.', points: 2 },
    { id: 9, question: 'Was bedeutet „okkultes Blut“?', type: 'single', options: [{id:'a',text:'nicht sichtbar/versteckt',correct:true},{id:'b',text:'sehr hell'},{id:'c',text:'nur venös'},{id:'d',text:'bakteriell'}], explanation: 'Okkult bedeutet verborgen beziehungsweise mit bloßem Auge nicht sichtbar.', points: 2 },
    { id: 10, question: 'Welches Enzym fehlt bei Laktoseintoleranz?', type: 'single', options: [{id:'a',text:'Laktase',correct:true},{id:'b',text:'Pepsin'},{id:'c',text:'Insulin'},{id:'d',text:'GGT'}], explanation: 'Laktase spaltet Milchzucker.', points: 2 },
    { id: 11, question: 'Was beschreibt Reflux?', type: 'single', options: [{id:'a',text:'Rückfluss von Mageninhalt in die Speiseröhre',correct:true},{id:'b',text:'Entzündung des Wurmfortsatzes'},{id:'c',text:'Gallenstein'},{id:'d',text:'Darmverschluss'}], explanation: 'Bei Reflux fließt Mageninhalt zurück in die Speiseröhre.', points: 2 },
    { id: 12, question: 'Was ist der Kernunterschied zwischen Gastritis und Ulkus?', type: 'single', options: [{id:'a',text:'Ulkus ist ein tieferer Gewebsdefekt',correct:true},{id:'b',text:'Gastritis betrifft nur den Dickdarm'},{id:'c',text:'Ulkus ist immer infektiös'},{id:'d',text:'kein Unterschied'}], explanation: 'Das Ulkus reicht tiefer in die Gewebsschichten.', points: 2 },
    { id: 13, question: 'Divertikulitis bedeutet …', type: 'single', options: [{id:'a',text:'entzündete Divertikel',correct:true},{id:'b',text:'Divertikel ohne Entzündung'},{id:'c',text:'Pankreatitis'},{id:'d',text:'Reflux'}], explanation: 'Die Endung -itis weist auf Entzündung hin.', points: 2 },
    { id: 14, question: 'Was ist bei Appendizitis entzündet?', type: 'single', options: [{id:'a',text:'Wurmfortsatz',correct:true},{id:'b',text:'gesamter Blinddarm immer'},{id:'c',text:'Gallenblase'},{id:'d',text:'Leber'}], explanation: 'Typischerweise ist die Appendix vermiformis entzündet.', points: 2 },
    { id: 15, question: 'Welche Diagnostik nennt die Unterlage bei Hämorrhoidalleiden?', type: 'single', options: [{id:'a',text:'Proktoskopie',correct:true},{id:'b',text:'EEG'},{id:'c',text:'Spirometrie'},{id:'d',text:'Ergometrie'}], explanation: 'Genannt wird die Proktoskopie.', points: 2 },
    { id: 16, question: 'Welche Eigenschaft passt zu einem malignen Tumor?', type: 'single', options: [{id:'a',text:'kann invasiv wachsen und metastasieren',correct:true},{id:'b',text:'bildet nie Metastasen'},{id:'c',text:'ist immer harmlos'},{id:'d',text:'bleibt immer lokal'}], explanation: 'Invasion und Metastasierung sind wichtige Merkmale maligner Tumoren.', points: 2 },
    { id: 17, question: 'Wofür steht M im TNM-System?', type: 'single', options: [{id:'a',text:'Fernmetastasen',correct:true},{id:'b',text:'Magen'},{id:'c',text:'Muskel'},{id:'d',text:'Medikament'}], explanation: 'M beschreibt Fernmetastasen.', points: 2 },
    { id: 18, question: 'Welches Symptom passt besonders zum Ösophaguskarzinom im Lernstoff?', type: 'single', options: [{id:'a',text:'Dysphagie',correct:true},{id:'b',text:'Polyurie'},{id:'c',text:'Tinnitus'},{id:'d',text:'Pollakisurie'}], explanation: 'Dysphagie = Schluckstörung.', points: 2 },
    { id: 19, question: 'Welche Merkhilfe nutzt die Unterlage für Gallensteinrisiken?', type: 'single', options: [{id:'a',text:'6F',correct:true},{id:'b',text:'FAST'},{id:'c',text:'ABCDE'},{id:'d',text:'6R'}], explanation: 'Female, Fair, Fat, Forty, Fertile, Family.', points: 2 },
    { id: 20, question: 'Welche Komplikationen können mit Gallensteinen zusammenhängen?', type: 'multiple', options: [{id:'a',text:'Cholezystitis',correct:true},{id:'b',text:'Pankreatitis',correct:true},{id:'c',text:'Verschlussikterus',correct:true},{id:'d',text:'Myopie'}], explanation: 'Gallensteine können Entzündung und Abflussstörungen verursachen.', points: 3 },
    { id: 21, question: 'Welche Funktion hat die Leber?', type: 'multiple', options: [{id:'a',text:'Galle bilden',correct:true},{id:'b',text:'Nährstoffe verarbeiten/speichern',correct:true},{id:'c',text:'Eiweiße bilden',correct:true},{id:'d',text:'Luft filtern'}], explanation: 'Die Leber ist ein zentrales Stoffwechsel- und Syntheseorgan.', points: 3 },
    { id: 22, question: 'Welche Hepatitisformen sind impfpräventabel?', type: 'multiple', options: [{id:'a',text:'Hepatitis A',correct:true},{id:'b',text:'Hepatitis B',correct:true},{id:'c',text:'Hepatitis C'}], explanation: 'Für A und B existieren Impfstoffe.', points: 3 },
    { id: 23, question: 'Was passiert bei einer Leberzirrhose?', type: 'single', options: [{id:'a',text:'funktionsfähiges Gewebe wird zunehmend durch Narben-/Bindegewebe ersetzt',correct:true},{id:'b',text:'Leber wird zu Muskel'},{id:'c',text:'nur Galle wird gespeichert'},{id:'d',text:'keine Gewebeveränderung'}], explanation: 'Zirrhose ist ein narbiger Umbau mit Funktionsverlust.', points: 2 },
    { id: 24, question: 'Wie lautet die BMI-Formel?', type: 'single', options: [{id:'a',text:'kg / m²',correct:true},{id:'b',text:'m / kg²'},{id:'c',text:'kg × m'},{id:'d',text:'kg / Alter'}], explanation: 'BMI = Körpergewicht in kg geteilt durch Körpergröße in m zum Quadrat.', points: 2 },
    { id: 25, question: 'Welche Faktoren gehören zum metabolischen Syndrom?', type: 'multiple', options: [{id:'a',text:'Adipositas',correct:true},{id:'b',text:'Hypertonie',correct:true},{id:'c',text:'Fettstoffwechselstörung',correct:true},{id:'d',text:'Typ-2-Diabetes/gestörter Glukosestoffwechsel',correct:true}], explanation: 'Diese Faktoren treten häufig gemeinsam auf.', points: 4 },
    { id: 26, question: 'Welche Aussage zu LDL ist richtig?', type: 'single', options: [{id:'a',text:'transportiert Cholesterin von der Leber zu Geweben und hohe Werte fördern Ablagerungen',correct:true},{id:'b',text:'ist ein Verdauungsenzym'},{id:'c',text:'ist Insulin'},{id:'d',text:'ist ein Vitamin'}], explanation: 'LDL transportiert Cholesterin und kann bei hohen Werten Arteriosklerose fördern.', points: 2 },
    { id: 27, question: 'Was kann einen Gichtanfall auslösen?', type: 'single', options: [{id:'a',text:'Uratkristalle im Gelenk',correct:true},{id:'b',text:'Gallenfarbstoff'},{id:'c',text:'Pepsin'},{id:'d',text:'zu viel Speichel'}], explanation: 'Uratkristalle können eine akute Gelenkentzündung auslösen.', points: 2 },
    { id: 28, question: 'Welche Wirkung hat Insulin?', type: 'single', options: [{id:'a',text:'fördert Glukoseaufnahme in Zellen und senkt Blutzucker',correct:true},{id:'b',text:'erhöht immer den Blutzucker'},{id:'c',text:'bildet Galle'},{id:'d',text:'spaltet Proteine im Magen'}], explanation: 'Insulin unterstützt Zellaufnahme und Speicherung von Glukose.', points: 2 },
    { id: 29, question: 'Welche Wirkung hat Glukagon?', type: 'single', options: [{id:'a',text:'erhöht Blutzucker durch Mobilisierung von Energiereserven',correct:true},{id:'b',text:'senkt Blutzucker nach jeder Mahlzeit'},{id:'c',text:'ist Magensäure'},{id:'d',text:'ist Antibiotikum'}], explanation: 'Glukagon wirkt als Gegenspieler von Insulin.', points: 2 },
    { id: 30, question: 'Was ist die Hauptursache von Diabetes Typ 1?', type: 'single', options: [{id:'a',text:'Autoimmunzerstörung der Betazellen',correct:true},{id:'b',text:'zu viel Galle'},{id:'c',text:'Divertikel'},{id:'d',text:'nur Bewegungsmangel'}], explanation: 'Typ 1 entsteht durch Autoimmunzerstörung insulinproduzierender Zellen.', points: 2 },
    { id: 31, question: 'Was bedeutet Insulinresistenz?', type: 'single', options: [{id:'a',text:'Zellen reagieren vermindert auf Insulin',correct:true},{id:'b',text:'Insulin wird zu Galle'},{id:'c',text:'Insulin wird im Magen verdaut'},{id:'d',text:'Blutdruck sinkt'}], explanation: 'Insulin ist vorhanden, wirkt aber schlechter.', points: 2 },
    { id: 32, question: 'Warum kann Hyperglykämie zu Polyurie führen?', type: 'single', options: [{id:'a',text:'Glukose im Urin zieht Wasser mit',correct:true},{id:'b',text:'Galle wird ausgeschieden'},{id:'c',text:'Darm nimmt mehr Wasser auf'},{id:'d',text:'Puls sinkt'}], explanation: 'Osmotische Diurese erhöht die Urinmenge.', points: 3 },
    { id: 33, question: 'Was zeigt HbA1c?', type: 'single', options: [{id:'a',text:'längerfristige Blutzuckerbelastung',correct:true},{id:'b',text:'aktuellen Puls'},{id:'c',text:'Gallensteinanzahl'},{id:'d',text:'Lebergröße'}], explanation: 'HbA1c ist ein Langzeitmarker.', points: 2 },
    { id: 34, question: 'Welche Untersuchung prüft Glukosetoleranz?', type: 'single', options: [{id:'a',text:'OGTT',correct:true},{id:'b',text:'EKG'},{id:'c',text:'EEG'},{id:'d',text:'Audiogramm'}], explanation: 'OGTT = oraler Glukosetoleranztest.', points: 2 },
    { id: 35, question: 'Welche Urinbefunde sind im Diabetes-Lernstoff relevant?', type: 'multiple', options: [{id:'a',text:'Glukose',correct:true},{id:'b',text:'Ketone',correct:true},{id:'c',text:'Albumin',correct:true},{id:'d',text:'Pollen'}], explanation: 'Glukose, Ketone und Albumin sind wichtige Lernbegriffe.', points: 3 },
    { id: 36, question: 'Welche Spätfolgen gehören zur Mikroangiopathie?', type: 'multiple', options: [{id:'a',text:'Retinopathie',correct:true},{id:'b',text:'Nephropathie',correct:true},{id:'c',text:'kleingefäßbezogene Nerven-/Gewebeschäden',correct:true},{id:'d',text:'Gallenstein'}], explanation: 'Auge und Niere sind klassische Zielorgane; Neuropathie wird im Diabeteskontext eng mit Gefäß- und Stoffwechselschäden verknüpft.', points: 3 },
    { id: 37, question: 'Welche Folgen gehören eher zur Makroangiopathie?', type: 'multiple', options: [{id:'a',text:'KHK/Herzinfarkt',correct:true},{id:'b',text:'pAVK',correct:true},{id:'c',text:'Schlaganfall',correct:true},{id:'d',text:'Laktoseintoleranz'}], explanation: 'Große Arterien sind betroffen.', points: 3 },
    { id: 38, question: 'Warum ist der diabetische Fuß gefährlich?', type: 'multiple', options: [{id:'a',text:'Neuropathie kann Schmerzen vermindern',correct:true},{id:'b',text:'Durchblutungsstörung verschlechtert Heilung',correct:true},{id:'c',text:'kleine Wunden können unbemerkt bleiben',correct:true},{id:'d',text:'weil immer Gallensteine entstehen'}], explanation: 'Neuropathie und Durchblutungsstörung fördern unbemerkte, schlecht heilende Wunden.', points: 3 },
    { id: 39, question: 'Was bedeutet Exsikkose?', type: 'single', options: [{id:'a',text:'Austrocknung',correct:true},{id:'b',text:'Gallenblasenentzündung'},{id:'c',text:'Schluckstörung'},{id:'d',text:'Leberzirrhose'}], explanation: 'Exsikkose = ausgeprägter Flüssigkeitsmangel.', points: 2 },
    { id: 40, question: 'Was bedeutet Dysphagie?', type: 'single', options: [{id:'a',text:'Schluckstörung',correct:true},{id:'b',text:'Durchfall'},{id:'c',text:'Erbrechen'},{id:'d',text:'Verstopfung'}], explanation: 'Dysphagie bezeichnet Schluckbeschwerden.', points: 2 },
    { id: 41, question: 'Was bedeutet Peritonitis?', type: 'single', options: [{id:'a',text:'Bauchfellentzündung',correct:true},{id:'b',text:'Nierenentzündung'},{id:'c',text:'Gicht'},{id:'d',text:'Reflux'}], explanation: 'Peritonitis = Entzündung des Bauchfells.', points: 2 },
    { id: 42, question: 'Welche Reihenfolge entspricht dem Verdauungsweg?', type: 'single', options: [{id:'a',text:'Mund → Speiseröhre → Magen → Dünndarm → Dickdarm → Enddarm',correct:true},{id:'b',text:'Mund → Dickdarm → Magen → Dünndarm'},{id:'c',text:'Magen → Mund → Dünndarm'},{id:'d',text:'Speiseröhre → Mund → Magen'}], explanation: 'Das ist die anatomische Reihenfolge des Verdauungstrakts.', points: 3 },
    { id: 43, question: 'Welche Kette erklärt eine gefährliche Divertikulitis-Komplikation?', type: 'single', options: [{id:'a',text:'Divertikulitis → Perforation → Peritonitis',correct:true},{id:'b',text:'Divertikulitis → Myopie → Tinnitus'},{id:'c',text:'Divertikulitis → Reflux → Diabetes'},{id:'d',text:'Divertikulitis → Insulin → Galle'}], explanation: 'Eine Perforation kann eine Bauchfellentzündung verursachen.', points: 3 },
    { id: 44, question: 'Welche Kombination ist ein Warnbild für akutes Abdomen?', type: 'single', options: [{id:'a',text:'starke Bauchschmerzen + Abwehrspannung + Kreislaufprobleme',correct:true},{id:'b',text:'leichter Hunger'},{id:'c',text:'einmaliges Aufstoßen'},{id:'d',text:'normale Verdauung'}], explanation: 'Abwehrspannung und Kreislaufstörung sind wichtige Warnzeichen.', points: 3 },
    { id: 45, question: 'Welche Reihenfolge beschreibt Gicht?', type: 'single', options: [{id:'a',text:'Purine → Harnsäure → Uratkristalle → Gelenkentzündung',correct:true},{id:'b',text:'Fett → Galle → Insulin → Gicht'},{id:'c',text:'Protein → Pepsin → Harnstoff → Reflux'},{id:'d',text:'Glukose → Bilirubin → Gicht'}], explanation: 'Das ist die zentrale Gichtkette.', points: 3 },
    { id: 46, question: 'Welche Aussage zu Typ 2 ist richtig?', type: 'single', options: [{id:'a',text:'Insulinresistenz kann lange bestehen, bevor die Insulinproduktion deutlich nachlässt',correct:true},{id:'b',text:'es gibt von Beginn an immer absoluten Insulinmangel'},{id:'c',text:'Typ 2 betrifft nie Erwachsene'},{id:'d',text:'Lebensstil spielt keine Rolle'}], explanation: 'Typ 2 entwickelt sich häufig schleichend über Insulinresistenz.', points: 2 },
    { id: 47, question: 'Was ist eine Hypoglykämie?', type: 'single', options: [{id:'a',text:'zu niedriger Blutzucker',correct:true},{id:'b',text:'zu hoher Bilirubinwert'},{id:'c',text:'Gallenstein'},{id:'d',text:'zu hoher Puls'}], explanation: 'Hypoglykämie = zu niedriger Blutzucker.', points: 2 },
    { id: 48, question: 'Welche Symptome können bei Hypoglykämie auftreten?', type: 'multiple', options: [{id:'a',text:'Schwitzen',correct:true},{id:'b',text:'Zittern',correct:true},{id:'c',text:'Verwirrtheit',correct:true},{id:'d',text:'Bewusstlosigkeit bei schwerer Ausprägung',correct:true}], explanation: 'Unterzuckerung kann autonome und neurologische Symptome verursachen.', points: 4 },
    { id: 49, question: 'Welche Aussage zum HbA1c ist richtig?', type: 'single', options: [{id:'a',text:'er wird von einer einzelnen Mahlzeit viel weniger beeinflusst als ein aktueller Blutzuckerwert',correct:true},{id:'b',text:'er zeigt nur die letzten fünf Minuten'},{id:'c',text:'er ist ein Gallenwert'},{id:'d',text:'er misst Blutdruck'}], explanation: 'HbA1c bildet die längerfristige Blutzuckerbelastung ab.', points: 2 },
    { id: 50, question: 'Erkläre den roten Faden von Lernfeld 9 in einem Satz.', type: 'text', correctAnswer: 'nahrung,verdauung,resorption,stoffwechsel,organe,erkrankungen,diagnostik', explanation: 'Der rote Faden verbindet Nahrungsaufnahme und Verdauung mit Organfunktionen, Stoffwechsel, Diagnostik und typischen Erkrankungen.', points: 4 },
  ],
};
