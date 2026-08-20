import { useState } from 'react';
import {
  ArrowLeft,
  Bone,
  Eye,
  EyeOff,
  Film,
  GraduationCap,
  MapPinned,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

type Mode = 'labeled' | 'clean' | 'numbered';
type Side = 'front' | 'back';

interface Props {
  onBack: () => void;
}

interface Callout {
  label: string;
  latin?: string;
  point: [number, number];
  labelY: number;
}

interface Region {
  title: string;
  intro: string;
  image: string;
  backgroundSize: string;
  backgroundPosition: string;
  callouts: Callout[];
}

const I = {
  frontLabeled:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Human_skeleton_front_de.svg/1280px-Human_skeleton_front_de.svg.png',
  backLabeled:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Human_skeleton_back_no-text_no-color.svg/960px-Human_skeleton_back_no-text_no-color.svg.png',
  front:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Human_skeleton_front_no-text_no-color.svg/1280px-Human_skeleton_front_no-text_no-color.svg.png',
  back:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Human_skeleton_back_no-text_no-color.svg/960px-Human_skeleton_back_no-text_no-color.svg.png',
  frontNumbered:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Human_skeleton_front_numbered.svg/1920px-Human_skeleton_front_numbered.svg.png',
  backNumbered:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Human_skeleton_back_no-text_no-color.svg/960px-Human_skeleton_back_no-text_no-color.svg.png',
};

const regions: Region[] = [
  {
    title: 'Hirnschädel',
    intro: 'Die Pfeile zeigen dir direkt, wo die einzelnen Knochen am Schädel liegen.',
    image: I.front,
    backgroundSize: '185% auto',
    backgroundPosition: '48% 4%',
    callouts: [
      { label: 'Stirnbein', latin: 'Os frontale', point: [31, 25], labelY: 12 },
      { label: 'Scheitelbein', latin: 'Os parietale', point: [40, 14], labelY: 27 },
      { label: 'Schläfenbein', latin: 'Os temporale', point: [49, 39], labelY: 42 },
      { label: 'Hinterhauptbein', latin: 'Os occipitale', point: [40, 56], labelY: 57 },
      { label: 'Keilbein', latin: 'Os sphenoidale', point: [44, 45], labelY: 72 },
      { label: 'Siebbein', latin: 'Os ethmoidale', point: [39, 47], labelY: 87 },
    ],
  },
  {
    title: 'Gesichtsschädel',
    intro: 'Hier kannst du Kiefer, Nasenbereich und Jochbein direkt am Gesichtsschädel zuordnen.',
    image: I.front,
    backgroundSize: '195% auto',
    backgroundPosition: '50% 10%',
    callouts: [
      { label: 'Nasenbein', latin: 'Os nasale', point: [40, 40], labelY: 8 },
      { label: 'Oberkiefer', latin: 'Maxilla', point: [38, 53], labelY: 20 },
      { label: 'Unterkiefer', latin: 'Mandibula', point: [44, 70], labelY: 32 },
      { label: 'Jochbein', latin: 'Os zygomaticum', point: [51, 49], labelY: 44 },
      { label: 'Tränenbein', latin: 'Os lacrimale', point: [43, 44], labelY: 56 },
      { label: 'Gaumenbein', latin: 'Os palatinum', point: [40, 59], labelY: 68 },
      { label: 'Untere Nasenmuschel', latin: 'Concha nasalis inferior', point: [42, 50], labelY: 80 },
      { label: 'Pflugscharbein', latin: 'Vomer', point: [40, 55], labelY: 92 },
    ],
  },
  {
    title: 'Halswirbelsäule',
    intro: 'Atlas und Axis sind die ersten beiden Halswirbel. Die Pfeile zeigen ihre Lage direkt unter dem Schädel.',
    image: I.front,
    backgroundSize: '205% auto',
    backgroundPosition: '50% 19%',
    callouts: [
      { label: 'Atlas', latin: 'C1', point: [42, 27], labelY: 25 },
      { label: 'Axis', latin: 'C2', point: [42, 36], labelY: 48 },
      { label: 'Halswirbel C1–C7', latin: 'Vertebrae cervicales', point: [42, 53], labelY: 73 },
    ],
  },
  {
    title: 'Brustkorb',
    intro: 'Brustbein und Rippen schützen Herz und Lunge. Die Brustwirbel liegen hinten in der Mitte.',
    image: I.front,
    backgroundSize: '155% auto',
    backgroundPosition: '50% 31%',
    callouts: [
      { label: 'Brustbein', latin: 'Sternum', point: [41, 46], labelY: 25 },
      { label: 'Rippen', latin: 'Costae', point: [30, 45], labelY: 50 },
      { label: 'Brustwirbel', latin: 'Vertebrae thoracicae', point: [42, 50], labelY: 75 },
    ],
  },
  {
    title: 'Wirbelsäule von hinten',
    intro: 'Von hinten kannst du die Abschnitte der Wirbelsäule besonders gut von oben nach unten verfolgen.',
    image: I.back,
    backgroundSize: '145% auto',
    backgroundPosition: '50% 42%',
    callouts: [
      { label: 'Halswirbel', latin: 'Vertebrae cervicales', point: [41, 17], labelY: 12 },
      { label: 'Brustwirbel', latin: 'Vertebrae thoracicae', point: [41, 37], labelY: 30 },
      { label: 'Lendenwirbel', latin: 'Vertebrae lumbales', point: [41, 58], labelY: 49 },
      { label: 'Kreuzbein', latin: 'Os sacrum', point: [41, 72], labelY: 68 },
      { label: 'Steißbein', latin: 'Os coccygis', point: [41, 79], labelY: 86 },
    ],
  },
  {
    title: 'Schultergürtel',
    intro: 'Schlüsselbein und Schulterblatt verbinden die obere Extremität mit dem Rumpf.',
    image: I.front,
    backgroundSize: '175% auto',
    backgroundPosition: '50% 27%',
    callouts: [
      { label: 'Schlüsselbein', latin: 'Clavicula', point: [33, 28], labelY: 35 },
      { label: 'Schulterblatt', latin: 'Scapula', point: [49, 38], labelY: 65 },
    ],
  },
  {
    title: 'Oberarm',
    intro: 'Im Oberarm liegt nur ein Knochen: der Humerus.',
    image: I.front,
    backgroundSize: '220% auto',
    backgroundPosition: '8% 38%',
    callouts: [{ label: 'Oberarmknochen', latin: 'Humerus', point: [31, 49], labelY: 50 }],
  },
  {
    title: 'Unterarm',
    intro: 'Im Unterarm liegen Radius und Ulna nebeneinander. Der Radius liegt auf der Daumenseite.',
    image: I.front,
    backgroundSize: '225% auto',
    backgroundPosition: '7% 51%',
    callouts: [
      { label: 'Speiche', latin: 'Radius', point: [27, 45], labelY: 37 },
      { label: 'Elle', latin: 'Ulna', point: [34, 48], labelY: 64 },
    ],
  },
  {
    title: 'Handwurzel',
    intro: 'Die acht Handwurzelknochen liegen dicht zusammen. Die Pfeile helfen dir, sie einzeln zu erkennen.',
    image: I.front,
    backgroundSize: '260% auto',
    backgroundPosition: '7% 61%',
    callouts: [
      { label: 'Kahnbein', latin: 'Os scaphoideum', point: [23, 37], labelY: 8 },
      { label: 'Mondbein', latin: 'Os lunatum', point: [28, 37], labelY: 20 },
      { label: 'Dreiecksbein', latin: 'Os triquetrum', point: [33, 39], labelY: 32 },
      { label: 'Erbsenbein', latin: 'Os pisiforme', point: [36, 42], labelY: 44 },
      { label: 'Großes Vieleckbein', latin: 'Os trapezium', point: [23, 49], labelY: 56 },
      { label: 'Kleines Vieleckbein', latin: 'Os trapezoideum', point: [28, 49], labelY: 68 },
      { label: 'Kopfbein', latin: 'Os capitatum', point: [33, 50], labelY: 80 },
      { label: 'Hakenbein', latin: 'Os hamatum', point: [38, 50], labelY: 92 },
    ],
  },
  {
    title: 'Mittelhand und Finger',
    intro: 'Von der Handwurzel geht es über die Mittelhand bis zu den einzelnen Fingergliedern.',
    image: I.front,
    backgroundSize: '250% auto',
    backgroundPosition: '7% 65%',
    callouts: [
      { label: 'Mittelhandknochen I–V', latin: 'Ossa metacarpi', point: [30, 43], labelY: 20 },
      { label: 'Grundphalangen', latin: 'Phalanges proximales', point: [31, 55], labelY: 42 },
      { label: 'Mittelphalangen', latin: 'Phalanges mediae', point: [31, 67], labelY: 64 },
      { label: 'Endphalangen', latin: 'Phalanges distales', point: [31, 80], labelY: 84 },
    ],
  },
  {
    title: 'Becken',
    intro: 'Im Becken kannst du Darmbein, Sitzbein und Schambein als Anteile des Hüftbeins unterscheiden.',
    image: I.front,
    backgroundSize: '175% auto',
    backgroundPosition: '50% 57%',
    callouts: [
      { label: 'Hüftbein', latin: 'Os coxae', point: [29, 42], labelY: 12 },
      { label: 'Darmbein', latin: 'Os ilium', point: [27, 34], labelY: 30 },
      { label: 'Sitzbein', latin: 'Os ischii', point: [31, 58], labelY: 48 },
      { label: 'Schambein', latin: 'Os pubis', point: [39, 53], labelY: 66 },
      { label: 'Kreuzbein', latin: 'Os sacrum', point: [42, 42], labelY: 84 },
    ],
  },
  {
    title: 'Oberschenkel',
    intro: 'Der Femur ist der größte Knochen des menschlichen Körpers.',
    image: I.front,
    backgroundSize: '175% auto',
    backgroundPosition: '50% 69%',
    callouts: [{ label: 'Oberschenkelknochen', latin: 'Femur', point: [35, 52], labelY: 50 }],
  },
  {
    title: 'Knie',
    intro: 'Am Knie treffen Femur und Tibia aufeinander. Vorne liegt die Kniescheibe.',
    image: I.front,
    backgroundSize: '240% auto',
    backgroundPosition: '50% 78%',
    callouts: [
      { label: 'Oberschenkelknochen', latin: 'Femur', point: [34, 31], labelY: 25 },
      { label: 'Kniescheibe', latin: 'Patella', point: [36, 50], labelY: 50 },
      { label: 'Schienbein', latin: 'Tibia', point: [37, 69], labelY: 75 },
    ],
  },
  {
    title: 'Unterschenkel',
    intro: 'Tibia und Fibula verlaufen parallel. Die Tibia ist deutlich kräftiger.',
    image: I.front,
    backgroundSize: '175% auto',
    backgroundPosition: '50% 88%',
    callouts: [
      { label: 'Schienbein', latin: 'Tibia', point: [36, 49], labelY: 38 },
      { label: 'Wadenbein', latin: 'Fibula', point: [45, 49], labelY: 64 },
    ],
  },
  {
    title: 'Fußwurzel',
    intro: 'Die sieben Fußwurzelknochen bilden den hinteren Teil des Fußes.',
    image: I.front,
    backgroundSize: '190% auto',
    backgroundPosition: '50% 97%',
    callouts: [
      { label: 'Sprungbein', latin: 'Talus', point: [38, 34], labelY: 10 },
      { label: 'Fersenbein', latin: 'Calcaneus', point: [29, 48], labelY: 23 },
      { label: 'Kahnbein', latin: 'Os naviculare', point: [48, 44], labelY: 36 },
      { label: 'Würfelbein', latin: 'Os cuboideum', point: [54, 56], labelY: 49 },
      { label: 'Keilbein medial', latin: 'Os cuneiforme mediale', point: [49, 48], labelY: 62 },
      { label: 'Keilbein intermedium', latin: 'Os cuneiforme intermedium', point: [53, 47], labelY: 75 },
      { label: 'Keilbein lateral', latin: 'Os cuneiforme laterale', point: [57, 48], labelY: 88 },
    ],
  },
  {
    title: 'Mittelfuß',
    intro: 'Die fünf Mittelfußknochen liegen zwischen Fußwurzel und Zehen.',
    image: I.front,
    backgroundSize: '200% auto',
    backgroundPosition: '50% 99%',
    callouts: [{ label: 'Mittelfußknochen I–V', latin: 'Ossa metatarsi', point: [43, 55], labelY: 50 }],
  },
  {
    title: 'Zehen',
    intro: 'Die Zehen bestehen aus Grund-, Mittel- und Endphalangen. Die Großzehe besitzt keine Mittelphalanx.',
    image: I.front,
    backgroundSize: '220% auto',
    backgroundPosition: '50% 100%',
    callouts: [
      { label: 'Grundphalangen', latin: 'Phalanges proximales', point: [40, 58], labelY: 25 },
      { label: 'Mittelphalangen', latin: 'Phalanges mediae', point: [43, 70], labelY: 50 },
      { label: 'Endphalangen', latin: 'Phalanges distales', point: [45, 82], labelY: 75 },
    ],
  },
  {
    title: 'Ferse und hinterer Fuß',
    intro: 'Von hinten ist besonders das Fersenbein gut zu erkennen.',
    image: I.back,
    backgroundSize: '205% auto',
    backgroundPosition: '50% 99%',
    callouts: [
      { label: 'Fersenbein', latin: 'Calcaneus', point: [36, 65], labelY: 42 },
      { label: 'Fußwurzelknochen', latin: 'Ossa tarsi', point: [42, 47], labelY: 66 },
    ],
  },
];

const groups = [
  ['Hirnschädel – 8', [['Stirnbein', 'Os frontale', '1'], ['Scheitelbein', 'Os parietale', '2'], ['Schläfenbein', 'Os temporale', '2'], ['Hinterhauptbein', 'Os occipitale', '1'], ['Keilbein', 'Os sphenoidale', '1'], ['Siebbein', 'Os ethmoidale', '1']]],
  ['Gesichtsschädel – 14', [['Oberkiefer', 'Maxilla', '2'], ['Unterkiefer', 'Mandibula', '1'], ['Jochbein', 'Os zygomaticum', '2'], ['Nasenbein', 'Os nasale', '2'], ['Tränenbein', 'Os lacrimale', '2'], ['Gaumenbein', 'Os palatinum', '2'], ['Untere Nasenmuschel', 'Concha nasalis inferior', '2'], ['Pflugscharbein', 'Vomer', '1']]],
  ['Gehörknöchelchen + Zungenbein – 7', [['Hammer', 'Malleus', '2'], ['Amboss', 'Incus', '2'], ['Steigbügel', 'Stapes', '2'], ['Zungenbein', 'Os hyoideum', '1']]],
  ['Wirbelsäule – 26', [['Halswirbel C1–C7', 'Vertebrae cervicales', '7'], ['Atlas', 'C1', '1 von 7'], ['Axis', 'C2', '1 von 7'], ['Brustwirbel T1–T12', 'Vertebrae thoracicae', '12'], ['Lendenwirbel L1–L5', 'Vertebrae lumbales', '5'], ['Kreuzbein', 'Os sacrum', '1'], ['Steißbein', 'Os coccygis', '1']]],
  ['Brustkorb – 25', [['Brustbein', 'Sternum', '1'], ['Rippen rechts 1–12', 'Costae dextrae', '12'], ['Rippen links 1–12', 'Costae sinistrae', '12']]],
  ['Schultergürtel – 4', [['Schlüsselbein', 'Clavicula', '2'], ['Schulterblatt', 'Scapula', '2']]],
  ['Arme und Hände – 60', [['Oberarmknochen', 'Humerus', '2'], ['Speiche', 'Radius', '2'], ['Elle', 'Ulna', '2'], ['Handwurzelknochen', 'Ossa carpi', '16'], ['Mittelhandknochen I–V', 'Ossa metacarpi', '10'], ['Grundphalangen', 'Phalanges proximales manus', '10'], ['Mittelphalangen', 'Phalanges mediae manus', '8'], ['Endphalangen', 'Phalanges distales manus', '10']]],
  ['Handwurzel – 8 pro Hand', [['Kahnbein', 'Os scaphoideum', '2 gesamt'], ['Mondbein', 'Os lunatum', '2'], ['Dreiecksbein', 'Os triquetrum', '2'], ['Erbsenbein', 'Os pisiforme', '2'], ['Großes Vieleckbein', 'Os trapezium', '2'], ['Kleines Vieleckbein', 'Os trapezoideum', '2'], ['Kopfbein', 'Os capitatum', '2'], ['Hakenbein', 'Os hamatum', '2']]],
  ['Beckengürtel – 2 Hüftbeine', [['Hüftbein', 'Os coxae', '2'], ['Darmbein', 'Os ilium', 'Anteil'], ['Sitzbein', 'Os ischii', 'Anteil'], ['Schambein', 'Os pubis', 'Anteil']]],
  ['Beine und Füße – 60', [['Oberschenkelknochen', 'Femur', '2'], ['Kniescheibe', 'Patella', '2'], ['Schienbein', 'Tibia', '2'], ['Wadenbein', 'Fibula', '2'], ['Fußwurzelknochen', 'Ossa tarsi', '14'], ['Mittelfußknochen I–V', 'Ossa metatarsi', '10'], ['Grundphalangen', 'Phalanges proximales pedis', '10'], ['Mittelphalangen', 'Phalanges mediae pedis', '8'], ['Endphalangen', 'Phalanges distales pedis', '10']]],
  ['Fußwurzel – 7 pro Fuß', [['Sprungbein', 'Talus', '2 gesamt'], ['Fersenbein', 'Calcaneus', '2'], ['Kahnbein des Fußes', 'Os naviculare', '2'], ['Würfelbein', 'Os cuboideum', '2'], ['Mediales Keilbein', 'Os cuneiforme mediale', '2'], ['Mittleres Keilbein', 'Os cuneiforme intermedium', '2'], ['Laterales Keilbein', 'Os cuneiforme laterale', '2']]],
] as const;

const resources = [
  ['Studyflix – Skelett (Mensch)', 'Deutschsprachiges Erklärvideo zum menschlichen Skelett.', 'https://studyflix.de/biologie/skelett-mensch-3262/video'],
  ['Studyflix – Knochen', 'Deutschsprachiges Video zu Aufbau, Arten und Funktion von Knochen.', 'https://studyflix.de/biologie/knochen-3279/video'],
  ['Aufbau des Muskel-Skelettsystems', 'Weiterer deutschsprachiger Überblick.', 'https://www.arbeitsschutzfilm.de/mediathek/aufbau-des-muskel-skelettsystems-video_689346a4d.html'],
] as const;

function RegionCard({ region }: { region: Region }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg">
      <div className="p-5 pb-3">
        <h3 className="text-xl font-black">{region.title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">{region.intro}</p>
      </div>
      <div className="px-4 pb-5">
        <div className="relative h-[500px] overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50">
          <div
            className="absolute inset-y-0 left-0 w-[60%]"
            style={{
              backgroundImage: `url(${region.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: region.backgroundSize,
              backgroundPosition: region.backgroundPosition,
            }}
          />
          <div className="absolute inset-y-0 right-0 w-[40%] bg-white/95" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {region.callouts.map((c) => (
              <g key={c.label}>
                <line x1={c.point[0]} y1={c.point[1]} x2="63" y2={c.labelY} stroke="#f59e0b" strokeWidth="0.45" />
                <circle cx={c.point[0]} cy={c.point[1]} r="0.9" fill="#f59e0b" stroke="white" strokeWidth="0.2" />
              </g>
            ))}
          </svg>
          {region.callouts.map((c) => (
            <div
              key={c.label}
              className="absolute right-[2.5%] w-[34%] -translate-y-1/2 rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-sm"
              style={{ top: `${c.labelY}%` }}
            >
              <div className="text-[13px] font-black leading-4 text-slate-900">{c.label}</div>
              {c.latin && <div className="mt-0.5 text-[11px] leading-3 text-slate-500">{c.latin}</div>}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export function SkeletonPage({ onBack }: Props) {
  const [side, setSide] = useState<Side>('front');
  const [mode, setMode] = useState<Mode>('labeled');

  const main = side === 'back'
    ? mode === 'labeled' ? I.backLabeled : mode === 'numbered' ? I.backNumbered : I.back
    : mode === 'labeled' ? I.frontLabeled : mode === 'numbered' ? I.frontNumbered : I.front;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_8%_0%,_#fef3c7_0,_#f8fafc_30%,_#dbeafe_100%)] text-slate-900">
      <main className="mx-auto max-w-[1320px] px-4 pt-10 pb-24 sm:px-6">
        <button onClick={onBack} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm">
          <ArrowLeft className="h-4 w-4" /> Zurück zu den Lernfeldern
        </button>

        <section className="mt-7 rounded-[34px] bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-8 text-white shadow-2xl sm:p-11">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-300/15 px-4 py-2 text-xs font-black uppercase tracking-[.16em]"><Bone className="h-4 w-4" /> Skelett lernen</div>
            <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">Schau dir die Knochen direkt am Skelett an <span className="block text-amber-300">und lerne sie Schritt für Schritt.</span></h1>
            <p className="mt-5 text-slate-300 leading-7 sm:text-lg">Fang oben beim Schädel an und arbeite dich über Wirbelsäule und Brustkorb zu Arm, Hand, Becken, Bein und Fuß. Bei den Regionsbildern zeigen dir Pfeile direkt, wo der jeweilige Knochen liegt.</p>
          </div>
        </section>

        <section className="mt-9 rounded-[30px] bg-white p-6 shadow-xl sm:p-8">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-teal-700"><Sparkles className="h-4 w-4" /> So kannst du lernen</div>
          <div className="mt-4 grid gap-3 text-sm leading-6 md:grid-cols-3">
            <div className="rounded-2xl bg-amber-50 p-4">Erst <strong>mit Namen</strong> ansehen und die Begriffe laut mitsprechen.</div>
            <div className="rounded-2xl bg-teal-50 p-4">Dann <strong>ohne Namen</strong> ansehen und selbst benennen.</div>
            <div className="rounded-2xl bg-sky-50 p-4">Zum Schluss <strong>mit Nummern</strong> kontrollieren.</div>
          </div>
        </section>

        <section className="mt-9 overflow-hidden rounded-[32px] bg-white shadow-xl">
          <div className="border-b border-slate-100 p-6 sm:p-8"><h2 className="text-2xl font-black sm:text-3xl">Das ganze Skelett</h2></div>
          <div className="grid gap-5 p-5 lg:grid-cols-[230px_1fr]">
            <aside className="space-y-3">
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
                <button onClick={() => setSide('front')} className={`rounded-xl p-3 font-bold ${side === 'front' ? 'bg-teal-600 text-white' : 'bg-slate-50'}`}>Vorne</button>
                <button onClick={() => setSide('back')} className={`rounded-xl p-3 font-bold ${side === 'back' ? 'bg-teal-600 text-white' : 'bg-slate-50'}`}>Hinten</button>
              </div>
              <button onClick={() => setMode('labeled')} className={`flex w-full gap-2 rounded-xl p-3 font-bold ${mode === 'labeled' ? 'bg-amber-500 text-white' : 'bg-slate-50'}`}><Eye className="h-4 w-4" /> Mit Namen</button>
              <button onClick={() => setMode('clean')} className={`flex w-full gap-2 rounded-xl p-3 font-bold ${mode === 'clean' ? 'bg-sky-600 text-white' : 'bg-slate-50'}`}><EyeOff className="h-4 w-4" /> Ohne Namen</button>
              <button onClick={() => { setSide('front'); setMode('numbered'); }} className={`flex w-full gap-2 rounded-xl p-3 font-bold ${mode === 'numbered' ? 'bg-violet-600 text-white' : 'bg-slate-50'}`}><GraduationCap className="h-4 w-4" /> Mit Nummern</button>
              <button onClick={() => { setSide('front'); setMode('labeled'); }} className="flex w-full gap-2 rounded-xl bg-slate-50 p-3 font-bold"><RotateCcw className="h-4 w-4" /> Zurücksetzen</button>
            </aside>
            <div className="overflow-hidden rounded-2xl border border-slate-200"><img src={main} alt="Skelett" className="h-auto w-full" /></div>
          </div>
        </section>

        <section className="mt-11">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-sky-700"><MapPinned className="h-4 w-4" /> Regionen</div>
          <h2 className="mt-2 text-3xl font-black">Jede Region noch einmal als eigenes Bild</h2>
          <p className="mt-2 text-sm text-slate-500">Jetzt steht der Name nicht mehr nur unter dem Bild: Jeder Knochen wird mit einer Linie direkt im Bild markiert.</p>
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            {regions.map((region) => <RegionCard key={region.title} region={region} />)}
          </div>
        </section>

        <section className="mt-11">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-amber-700"><Bone className="h-4 w-4" /> Alle Knochen</div>
          <h2 className="mt-2 text-3xl font-black">Alle Knochen nach Regionen</h2>
          <p className="mt-2 text-sm text-slate-500">Hier kannst du die Namen danach noch einmal systematisch wiederholen.</p>
          <div className="mt-6 grid gap-5">
            {groups.map(([title, items]) => (
              <article key={title} className="rounded-3xl bg-white p-6 shadow-lg">
                <h3 className="text-xl font-black">{title}</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {items.map(([de, la, n]) => (
                    <div key={de + la} className="flex justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div><div className="font-black">{de}</div><div className="text-sm italic text-slate-500">{la}</div></div>
                      <span className="h-fit rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-black">{n}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-3 rounded-3xl bg-gradient-to-r from-teal-700 to-sky-700 p-6 text-sm font-bold text-white sm:grid-cols-4">
            <div>Axialskelett: 80</div><div>Schultergürtel + Arme: 64</div><div>Beckengürtel + Beine: 62</div><div>Gesamt: 206</div>
          </div>
        </section>

        <section className="mt-11">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-rose-700"><Film className="h-4 w-4" /> Zusatzmaterial</div>
          <h2 className="mt-2 text-3xl font-black">Deutschsprachige Videos und Erklärungen</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {resources.map(([t, d, u]) => (
              <article key={t} className="rounded-3xl bg-white p-6 shadow-lg"><h3 className="text-lg font-black">{t}</h3><p className="mt-2 text-sm text-slate-600">{d}</p><a href={u} target="_blank" rel="noreferrer" className="mt-4 inline-block rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-bold text-white">Öffnen</a></article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
