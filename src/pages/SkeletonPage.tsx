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

type Crop = [number, number, number, number];

interface Anchor {
  label: string;
  latin: string;
  x: number;
  y: number;
}

interface Region {
  title: string;
  note?: string;
  image: string;
  sourceWidth: number;
  sourceHeight: number;
  crop: Crop;
  anchors: Anchor[];
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
} as const;

const regions: Region[] = [
  {
    title: 'Hirnschädel – Vorderseite',
    note: 'Keilbein und Siebbein sind von vorne nur teilweise sichtbar.',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [430, 20, 420, 350],
    anchors: [
      { label: 'Stirnbein', latin: 'Os frontale', x: 640, y: 105 },
      { label: 'Scheitelbein', latin: 'Os parietale', x: 705, y: 92 },
      { label: 'Schläfenbein', latin: 'Os temporale', x: 720, y: 205 },
      { label: 'Keilbein', latin: 'Os sphenoidale', x: 695, y: 216 },
      { label: 'Siebbein', latin: 'Os ethmoidale', x: 640, y: 216 },
    ],
  },
  {
    title: 'Hirnschädel – Rückseite',
    image: I.back,
    sourceWidth: 960,
    sourceHeight: 2256,
    crop: [300, 20, 360, 280],
    anchors: [
      { label: 'Scheitelbein', latin: 'Os parietale', x: 530, y: 110 },
      { label: 'Hinterhauptbein', latin: 'Os occipitale', x: 480, y: 175 },
      { label: 'Schläfenbein', latin: 'Os temporale', x: 590, y: 220 },
    ],
  },
  {
    title: 'Gesichtsschädel',
    note: 'Das Gaumenbein liegt weiter innen und ist in dieser Vorderansicht nur eingeschränkt zu sehen.',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [470, 150, 350, 235],
    anchors: [
      { label: 'Nasenbein', latin: 'Os nasale', x: 640, y: 215 },
      { label: 'Oberkiefer', latin: 'Maxilla', x: 610, y: 280 },
      { label: 'Unterkiefer', latin: 'Mandibula', x: 640, y: 340 },
      { label: 'Jochbein', latin: 'Os zygomaticum', x: 720, y: 255 },
      { label: 'Tränenbein', latin: 'Os lacrimale', x: 615, y: 218 },
      { label: 'Untere Nasenmuschel', latin: 'Concha nasalis inferior', x: 640, y: 250 },
      { label: 'Pflugscharbein', latin: 'Vomer', x: 640, y: 265 },
    ],
  },
  {
    title: 'Halswirbelsäule',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [520, 330, 240, 235],
    anchors: [
      { label: 'Atlas', latin: 'C1', x: 640, y: 365 },
      { label: 'Axis', latin: 'C2', x: 640, y: 395 },
      { label: 'Halswirbel C1–C7', latin: 'Vertebrae cervicales', x: 640, y: 475 },
    ],
  },
  {
    title: 'Brustkorb',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [330, 470, 620, 520],
    anchors: [
      { label: 'Brustbein', latin: 'Sternum', x: 640, y: 700 },
      { label: 'Rippen', latin: 'Costae', x: 485, y: 710 },
      { label: 'Brustwirbel', latin: 'Vertebrae thoracicae', x: 640, y: 770 },
    ],
  },
  {
    title: 'Wirbelsäule von hinten',
    image: I.back,
    sourceWidth: 960,
    sourceHeight: 2256,
    crop: [350, 250, 260, 870],
    anchors: [
      { label: 'Halswirbel', latin: 'Vertebrae cervicales', x: 480, y: 320 },
      { label: 'Brustwirbel', latin: 'Vertebrae thoracicae', x: 480, y: 590 },
      { label: 'Lendenwirbel', latin: 'Vertebrae lumbales', x: 480, y: 820 },
      { label: 'Kreuzbein', latin: 'Os sacrum', x: 480, y: 1015 },
      { label: 'Steißbein', latin: 'Os coccygis', x: 480, y: 1080 },
    ],
  },
  {
    title: 'Schultergürtel',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [250, 440, 780, 280],
    anchors: [
      { label: 'Schlüsselbein', latin: 'Clavicula', x: 520, y: 520 },
      { label: 'Schulterblatt', latin: 'Scapula', x: 845, y: 585 },
    ],
  },
  {
    title: 'Oberarm',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [170, 500, 220, 500],
    anchors: [{ label: 'Oberarmknochen', latin: 'Humerus', x: 285, y: 750 }],
  },
  {
    title: 'Unterarm',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [170, 900, 210, 370],
    anchors: [
      { label: 'Speiche', latin: 'Radius', x: 305, y: 1090 },
      { label: 'Elle', latin: 'Ulna', x: 235, y: 1090 },
    ],
  },
  {
    title: 'Handwurzel',
    note: 'Der Erbsenknochen liegt auf der Handflächenseite über dem Dreiecksbein und ist in dieser Ansicht nur teilweise erkennbar.',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [150, 1240, 175, 170],
    anchors: [
      { label: 'Kahnbein', latin: 'Os scaphoideum', x: 270, y: 1295 },
      { label: 'Mondbein', latin: 'Os lunatum', x: 235, y: 1295 },
      { label: 'Dreiecksbein', latin: 'Os triquetrum', x: 200, y: 1305 },
      { label: 'Erbsenbein', latin: 'Os pisiforme', x: 185, y: 1320 },
      { label: 'Großes Vieleckbein', latin: 'Os trapezium', x: 285, y: 1345 },
      { label: 'Kleines Vieleckbein', latin: 'Os trapezoideum', x: 255, y: 1345 },
      { label: 'Kopfbein', latin: 'Os capitatum', x: 225, y: 1350 },
      { label: 'Hakenbein', latin: 'Os hamatum', x: 195, y: 1350 },
    ],
  },
  {
    title: 'Mittelhand und Finger',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [145, 1320, 210, 260],
    anchors: [
      { label: 'Mittelhandknochen I–V', latin: 'Ossa metacarpi', x: 250, y: 1400 },
      { label: 'Grundphalangen', latin: 'Phalanges proximales', x: 245, y: 1470 },
      { label: 'Mittelphalangen', latin: 'Phalanges mediae', x: 245, y: 1515 },
      { label: 'Endphalangen', latin: 'Phalanges distales', x: 245, y: 1560 },
    ],
  },
  {
    title: 'Becken',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [410, 1010, 470, 350],
    anchors: [
      { label: 'Darmbein', latin: 'Os ilium', x: 500, y: 1120 },
      { label: 'Sitzbein', latin: 'Os ischii', x: 530, y: 1290 },
      { label: 'Schambein', latin: 'Os pubis', x: 620, y: 1270 },
      { label: 'Kreuzbein', latin: 'Os sacrum', x: 640, y: 1165 },
    ],
  },
  {
    title: 'Oberschenkel',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [430, 1260, 420, 580],
    anchors: [{ label: 'Oberschenkelknochen', latin: 'Femur', x: 535, y: 1550 }],
  },
  {
    title: 'Knie',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [430, 1740, 420, 285],
    anchors: [
      { label: 'Oberschenkelknochen', latin: 'Femur', x: 535, y: 1785 },
      { label: 'Kniescheibe', latin: 'Patella', x: 535, y: 1860 },
      { label: 'Schienbein', latin: 'Tibia', x: 545, y: 1950 },
    ],
  },
  {
    title: 'Unterschenkel',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [430, 1900, 420, 500],
    anchors: [
      { label: 'Schienbein', latin: 'Tibia', x: 545, y: 2170 },
      { label: 'Wadenbein', latin: 'Fibula', x: 620, y: 2170 },
    ],
  },
  {
    title: 'Fußwurzel',
    note: 'Die kleinen Fußwurzelknochen liegen dicht beieinander. Die Marker zeigen die anatomischen Bereiche im rechten Fuß.',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [610, 2320, 330, 245],
    anchors: [
      { label: 'Sprungbein', latin: 'Talus', x: 690, y: 2385 },
      { label: 'Fersenbein', latin: 'Calcaneus', x: 655, y: 2425 },
      { label: 'Kahnbein', latin: 'Os naviculare', x: 730, y: 2415 },
      { label: 'Würfelbein', latin: 'Os cuboideum', x: 720, y: 2450 },
      { label: 'Mediales Keilbein', latin: 'Os cuneiforme mediale', x: 760, y: 2435 },
      { label: 'Mittleres Keilbein', latin: 'Os cuneiforme intermedium', x: 785, y: 2438 },
      { label: 'Laterales Keilbein', latin: 'Os cuneiforme laterale', x: 810, y: 2445 },
    ],
  },
  {
    title: 'Mittelfuß',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [610, 2380, 330, 180],
    anchors: [{ label: 'Mittelfußknochen I–V', latin: 'Ossa metatarsi', x: 770, y: 2475 }],
  },
  {
    title: 'Zehen',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [650, 2450, 290, 145],
    anchors: [
      { label: 'Grundphalangen', latin: 'Phalanges proximales', x: 795, y: 2510 },
      { label: 'Mittelphalangen', latin: 'Phalanges mediae', x: 835, y: 2535 },
      { label: 'Endphalangen', latin: 'Phalanges distales', x: 865, y: 2555 },
    ],
  },
  {
    title: 'Ferse und hinterer Fuß',
    image: I.back,
    sourceWidth: 960,
    sourceHeight: 2256,
    crop: [380, 2070, 220, 180],
    anchors: [{ label: 'Fersenbein', latin: 'Calcaneus', x: 480, y: 2165 }],
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

function RegionDiagram({ region }: { region: Region }) {
  const [cropX, cropY, cropW, cropH] = region.crop;
  const viewW = 1200;
  const viewH = Math.max(620, 90 + region.anchors.length * 68);
  const imageArea = { x: 20, y: 20, w: 760, h: viewH - 40 };
  const labelX = 820;
  const labelW = 350;
  const scale = Math.min(imageArea.w / cropW, imageArea.h / cropH);
  const cropDrawW = cropW * scale;
  const cropDrawH = cropH * scale;
  const cropLeft = imageArea.x + (imageArea.w - cropDrawW) / 2;
  const cropTop = imageArea.y + (imageArea.h - cropDrawH) / 2;
  const imageX = cropLeft - cropX * scale;
  const imageY = cropTop - cropY * scale;
  const imageWidth = region.sourceWidth * scale;
  const imageHeight = region.sourceHeight * scale;
  const topPadding = 44;
  const usable = viewH - topPadding * 2;
  const step = region.anchors.length > 1 ? usable / (region.anchors.length - 1) : 0;

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg">
      <div className="p-5 pb-3">
        <h3 className="text-xl font-black text-slate-900">{region.title}</h3>
        {region.note && <p className="mt-2 text-sm leading-6 text-amber-700">{region.note}</p>}
      </div>
      <div className="px-4 pb-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="h-auto w-full rounded-2xl border border-slate-200 bg-slate-50" role="img" aria-label={region.title}>
          <defs>
            <clipPath id={`clip-${region.title.replace(/[^a-zA-Z0-9]/g, '-')}`}>
              <rect x={imageArea.x} y={imageArea.y} width={imageArea.w} height={imageArea.h} rx="24" />
            </clipPath>
          </defs>

          <rect x={imageArea.x} y={imageArea.y} width={imageArea.w} height={imageArea.h} rx="24" fill="#ffffff" />
          <image
            href={region.image}
            x={imageX}
            y={imageY}
            width={imageWidth}
            height={imageHeight}
            clipPath={`url(#clip-${region.title.replace(/[^a-zA-Z0-9]/g, '-')})`}
            preserveAspectRatio="none"
          />

          {region.anchors.map((a, index) => {
            const px = cropLeft + (a.x - cropX) * scale;
            const py = cropTop + (a.y - cropY) * scale;
            const labelY = region.anchors.length === 1 ? viewH / 2 : topPadding + index * step;
            const boxH = 54;
            return (
              <g key={`${region.title}-${a.label}`}>
                <polyline
                  points={`${px},${py} ${labelX - 34},${py} ${labelX},${labelY}`}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx={px} cy={py} r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                <rect x={labelX} y={labelY - boxH / 2} width={labelW} height={boxH} rx="14" fill="#ffffff" stroke="#dbe3ee" strokeWidth="2" />
                <text x={labelX + 16} y={labelY - 4} fontSize="18" fontWeight="800" fill="#0f172a">{a.label}</text>
                <text x={labelX + 16} y={labelY + 17} fontSize="14" fill="#64748b">{a.latin}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </article>
  );
}

export function SkeletonPage({ onBack }: Props) {
  const [side, setSide] = useState<Side>('front');
  const [mode, setMode] = useState<Mode>('labeled');

  const main =
    side === 'back'
      ? mode === 'labeled'
        ? I.backLabeled
        : mode === 'numbered'
          ? I.backNumbered
          : I.back
      : mode === 'labeled'
        ? I.frontLabeled
        : mode === 'numbered'
          ? I.frontNumbered
          : I.front;

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
            <p className="mt-5 text-slate-300 leading-7 sm:text-lg">Die Marker werden jetzt aus den Originalkoordinaten der Skelettbilder berechnet. Dadurch bleiben die Pfeile beim Zoomen und auf unterschiedlichen Bildschirmgrößen an derselben anatomischen Stelle.</p>
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
          <p className="mt-2 text-sm text-slate-500">Die Pfeile sind jetzt technisch an die Originalpositionen im Skelettbild gekoppelt und verschieben sich nicht mehr durch den Bildzoom.</p>
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            {regions.map((region) => <RegionDiagram key={region.title} region={region} />)}
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
