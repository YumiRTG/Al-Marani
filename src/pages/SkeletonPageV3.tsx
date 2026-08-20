import { useState } from 'react';
import {
  ArrowLeft,
  Bone,
  BookOpen,
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
type Crop = [number, number, number, number];

interface Props {
  onBack: () => void;
}

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
  back:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Human_skeleton_back_no-text_no-color.svg/960px-Human_skeleton_back_no-text_no-color.svg.png',
  front:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Human_skeleton_front_no-text_no-color.svg/1280px-Human_skeleton_front_no-text_no-color.svg.png',
  frontNumbered:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Human_skeleton_front_numbered.svg/1920px-Human_skeleton_front_numbered.svg.png',
} as const;

const regions: Region[] = [
  {
    title: 'Hirnschädel – Vorderseite',
    note: 'Keilbein und Siebbein sind von vorne nur teilweise sichtbar. Der Marker zeigt den sichtbaren Bereich.',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [430, 35, 420, 325],
    anchors: [
      { label: 'Stirnbein', latin: 'Os frontale', x: 640, y: 120 },
      { label: 'Scheitelbein', latin: 'Os parietale', x: 585, y: 78 },
      { label: 'Schläfenbein', latin: 'Os temporale', x: 555, y: 205 },
      { label: 'Keilbein', latin: 'Os sphenoidale', x: 575, y: 190 },
      { label: 'Siebbein', latin: 'Os ethmoidale', x: 640, y: 205 },
    ],
  },
  {
    title: 'Hirnschädel – Rückseite',
    image: I.back,
    sourceWidth: 960,
    sourceHeight: 2256,
    crop: [300, 25, 360, 265],
    anchors: [
      { label: 'Scheitelbein', latin: 'Os parietale', x: 520, y: 105 },
      { label: 'Hinterhauptbein', latin: 'Os occipitale', x: 480, y: 175 },
      { label: 'Schläfenbein', latin: 'Os temporale', x: 555, y: 205 },
    ],
  },
  {
    title: 'Gesichtsschädel',
    note: 'Das Gaumenbein liegt weiter innen und lässt sich in einer reinen Vorderansicht nicht sinnvoll direkt markieren.',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [470, 145, 350, 220],
    anchors: [
      { label: 'Nasenbein', latin: 'Os nasale', x: 640, y: 220 },
      { label: 'Oberkiefer', latin: 'Maxilla', x: 610, y: 280 },
      { label: 'Unterkiefer', latin: 'Mandibula', x: 640, y: 335 },
      { label: 'Jochbein', latin: 'Os zygomaticum', x: 715, y: 250 },
      { label: 'Tränenbein', latin: 'Os lacrimale', x: 615, y: 215 },
      { label: 'Untere Nasenmuschel', latin: 'Concha nasalis inferior', x: 640, y: 248 },
      { label: 'Pflugscharbein', latin: 'Vomer', x: 640, y: 265 },
    ],
  },
  {
    title: 'Halswirbelsäule',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [510, 315, 260, 250],
    anchors: [
      { label: 'Atlas', latin: 'C1', x: 640, y: 360 },
      { label: 'Axis', latin: 'C2', x: 640, y: 392 },
      { label: 'Halswirbel C1–C7', latin: 'Vertebrae cervicales', x: 640, y: 470 },
    ],
  },
  {
    title: 'Brustkorb',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [340, 470, 600, 500],
    anchors: [
      { label: 'Brustbein', latin: 'Sternum', x: 640, y: 690 },
      { label: 'Rippen', latin: 'Costae', x: 500, y: 690 },
      { label: 'Brustwirbel', latin: 'Vertebrae thoracicae', x: 640, y: 760 },
    ],
  },
  {
    title: 'Wirbelsäule von hinten',
    image: I.back,
    sourceWidth: 960,
    sourceHeight: 2256,
    crop: [360, 245, 240, 840],
    anchors: [
      { label: 'Halswirbel', latin: 'Vertebrae cervicales', x: 480, y: 320 },
      { label: 'Brustwirbel', latin: 'Vertebrae thoracicae', x: 480, y: 560 },
      { label: 'Lendenwirbel', latin: 'Vertebrae lumbales', x: 480, y: 820 },
      { label: 'Kreuzbein', latin: 'Os sacrum', x: 480, y: 960 },
      { label: 'Steißbein', latin: 'Os coccygis', x: 480, y: 1040 },
    ],
  },
  {
    title: 'Schultergürtel',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [250, 440, 780, 300],
    anchors: [
      { label: 'Schlüsselbein', latin: 'Clavicula', x: 525, y: 515 },
      { label: 'Schulterblatt', latin: 'Scapula', x: 825, y: 565 },
    ],
  },
  {
    title: 'Oberarm',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [165, 520, 230, 470],
    anchors: [{ label: 'Oberarmknochen', latin: 'Humerus', x: 285, y: 740 }],
  },
  {
    title: 'Unterarm',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [150, 900, 250, 390],
    anchors: [
      { label: 'Speiche', latin: 'Radius', x: 305, y: 1100 },
      { label: 'Elle', latin: 'Ulna', x: 235, y: 1100 },
    ],
  },
  {
    title: 'Handwurzel',
    note: 'Die kleinen Handwurzelknochen liegen sehr dicht beieinander. Die Marker sitzen direkt über dem jeweiligen Bereich.',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [150, 1240, 180, 170],
    anchors: [
      { label: 'Kahnbein', latin: 'Os scaphoideum', x: 270, y: 1295 },
      { label: 'Mondbein', latin: 'Os lunatum', x: 235, y: 1295 },
      { label: 'Dreiecksbein', latin: 'Os triquetrum', x: 205, y: 1305 },
      { label: 'Erbsenbein', latin: 'Os pisiforme', x: 190, y: 1320 },
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
    crop: [145, 1320, 215, 265],
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
    crop: [400, 1000, 490, 380],
    anchors: [
      { label: 'Darmbein', latin: 'Os ilium', x: 505, y: 1090 },
      { label: 'Sitzbein', latin: 'Os ischii', x: 535, y: 1270 },
      { label: 'Schambein', latin: 'Os pubis', x: 615, y: 1260 },
      { label: 'Kreuzbein', latin: 'Os sacrum', x: 640, y: 1150 },
    ],
  },
  {
    title: 'Oberschenkel',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [430, 1240, 430, 620],
    anchors: [{ label: 'Oberschenkelknochen', latin: 'Femur', x: 525, y: 1530 }],
  },
  {
    title: 'Knie',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [430, 1740, 420, 305],
    anchors: [
      { label: 'Oberschenkelknochen', latin: 'Femur', x: 525, y: 1785 },
      { label: 'Kniescheibe', latin: 'Patella', x: 525, y: 1855 },
      { label: 'Schienbein', latin: 'Tibia', x: 530, y: 1940 },
    ],
  },
  {
    title: 'Unterschenkel',
    note: 'Hier ist nur ein Unterschenkel vergrößert, damit Tibia und Fibula deutlich auseinandergehalten werden können.',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [410, 1850, 220, 560],
    anchors: [
      { label: 'Schienbein', latin: 'Tibia', x: 535, y: 2140 },
      { label: 'Wadenbein', latin: 'Fibula', x: 465, y: 2140 },
    ],
  },
  {
    title: 'Fußwurzel – rechter Fuß',
    note: 'Die Marker sitzen direkt auf den sieben Fußwurzelknochen. Der große Zeh liegt in dieser Ansicht rechts.',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [610, 2320, 355, 250],
    anchors: [
      { label: 'Sprungbein', latin: 'Talus', x: 665, y: 2385 },
      { label: 'Fersenbein', latin: 'Calcaneus', x: 680, y: 2420 },
      { label: 'Kahnbein', latin: 'Os naviculare', x: 715, y: 2428 },
      { label: 'Würfelbein', latin: 'Os cuboideum', x: 745, y: 2443 },
      { label: 'Mediales Keilbein', latin: 'Os cuneiforme mediale', x: 805, y: 2448 },
      { label: 'Mittleres Keilbein', latin: 'Os cuneiforme intermedium', x: 778, y: 2448 },
      { label: 'Laterales Keilbein', latin: 'Os cuneiforme laterale', x: 753, y: 2449 },
    ],
  },
  {
    title: 'Mittelfuß – rechter Fuß',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [650, 2415, 315, 155],
    anchors: [
      { label: 'Mittelfußknochen I', latin: 'Os metatarsale I', x: 835, y: 2480 },
      { label: 'Mittelfußknochen II', latin: 'Os metatarsale II', x: 810, y: 2480 },
      { label: 'Mittelfußknochen III', latin: 'Os metatarsale III', x: 780, y: 2480 },
      { label: 'Mittelfußknochen IV', latin: 'Os metatarsale IV', x: 748, y: 2482 },
      { label: 'Mittelfußknochen V', latin: 'Os metatarsale V', x: 715, y: 2484 },
    ],
  },
  {
    title: 'Zehen – rechter Fuß',
    image: I.front,
    sourceWidth: 1280,
    sourceHeight: 2599,
    crop: [690, 2460, 275, 135],
    anchors: [
      { label: 'Grundphalangen', latin: 'Phalanges proximales', x: 790, y: 2505 },
      { label: 'Mittelphalangen', latin: 'Phalanges mediae', x: 835, y: 2528 },
      { label: 'Endphalangen', latin: 'Phalanges distales', x: 880, y: 2548 },
    ],
  },
  {
    title: 'Ferse und hinterer Fuß',
    image: I.back,
    sourceWidth: 960,
    sourceHeight: 2256,
    crop: [330, 2040, 300, 200],
    anchors: [
      { label: 'Sprungbein', latin: 'Talus', x: 430, y: 2110 },
      { label: 'Fersenbein', latin: 'Calcaneus', x: 430, y: 2170 },
    ],
  },
];

const boneGroups = [
  ['Hirnschädel', 'Stirnbein, Scheitelbein, Schläfenbein, Hinterhauptbein, Keilbein, Siebbein'],
  ['Gesichtsschädel', 'Oberkiefer, Unterkiefer, Jochbein, Nasenbein, Tränenbein, Gaumenbein, untere Nasenmuschel, Pflugscharbein'],
  ['Wirbelsäule', 'Atlas, Axis, Halswirbel C1–C7, Brustwirbel T1–T12, Lendenwirbel L1–L5, Kreuzbein, Steißbein'],
  ['Brustkorb', 'Brustbein und 12 Rippenpaare'],
  ['Schultergürtel und Arm', 'Schlüsselbein, Schulterblatt, Humerus, Radius, Ulna'],
  ['Hand', '8 Handwurzelknochen, 5 Mittelhandknochen und Fingerphalangen'],
  ['Becken', 'Darmbein, Sitzbein, Schambein und Kreuzbein'],
  ['Bein', 'Femur, Patella, Tibia und Fibula'],
  ['Fuß', '7 Fußwurzelknochen, 5 Mittelfußknochen und Zehenphalangen'],
] as const;

const videos = [
  {
    title: 'Alle Knochen mit deutschen & medizinischen Fachbegriffen',
    channel: 'Anatomie mit Carina',
    embed: 'https://www.youtube-nocookie.com/embed/EH46yQUsszI',
  },
  {
    title: 'Wirbelsäule zusammengefasst – Anatomie einfach erklärt',
    channel: 'Kenhub – Anatomie des Menschen lernen',
    embed: 'https://www.youtube-nocookie.com/embed/2l1dfJKPhWg',
  },
  {
    title: 'Beckenknochen verständlich erklärt',
    channel: 'Anatomie-Versteher',
    embed: 'https://www.youtube-nocookie.com/embed/WFlfaGoijnY',
  },
] as const;

const backOverview: Anchor[] = [
  { label: 'Hinterhauptbein', latin: 'Os occipitale', x: 480, y: 175 },
  { label: 'Halswirbel', latin: 'Vertebrae cervicales', x: 480, y: 320 },
  { label: 'Schulterblatt', latin: 'Scapula', x: 300, y: 500 },
  { label: 'Rippen', latin: 'Costae', x: 340, y: 620 },
  { label: 'Brustwirbel', latin: 'Vertebrae thoracicae', x: 480, y: 600 },
  { label: 'Lendenwirbel', latin: 'Vertebrae lumbales', x: 480, y: 820 },
  { label: 'Kreuzbein', latin: 'Os sacrum', x: 480, y: 960 },
  { label: 'Steißbein', latin: 'Os coccygis', x: 480, y: 1040 },
  { label: 'Oberarmknochen', latin: 'Humerus', x: 715, y: 610 },
  { label: 'Elle', latin: 'Ulna', x: 740, y: 950 },
  { label: 'Speiche', latin: 'Radius', x: 795, y: 950 },
  { label: 'Handwurzel', latin: 'Ossa carpi', x: 810, y: 1120 },
  { label: 'Oberschenkelknochen', latin: 'Femur', x: 585, y: 1380 },
  { label: 'Schienbein', latin: 'Tibia', x: 535, y: 1810 },
  { label: 'Wadenbein', latin: 'Fibula', x: 605, y: 1810 },
  { label: 'Fersenbein', latin: 'Calcaneus', x: 430, y: 2170 },
];

function MarkerLegend({ items }: { items: Anchor[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
      {items.map((item, index) => (
        <div key={`${item.label}-${item.latin}`} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-teal-600 text-sm font-black text-white">{index + 1}</span>
          <div>
            <div className="font-black text-slate-900">{item.label}</div>
            <div className="text-sm text-slate-500">{item.latin}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RegionDiagram({ region }: { region: Region }) {
  const [cropX, cropY, cropW, cropH] = region.crop;
  const viewW = 820;
  const viewH = 680;
  const pad = 24;
  const scale = Math.min((viewW - pad * 2) / cropW, (viewH - pad * 2) / cropH);
  const drawW = cropW * scale;
  const drawH = cropH * scale;
  const cropLeft = (viewW - drawW) / 2;
  const cropTop = (viewH - drawH) / 2;
  const imageX = cropLeft - cropX * scale;
  const imageY = cropTop - cropY * scale;
  const imageWidth = region.sourceWidth * scale;
  const imageHeight = region.sourceHeight * scale;
  const clipId = `clip-${region.title.replace(/[^a-zA-Z0-9]/g, '-')}`;

  return (
    <article className="overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-xl">
      <div className="p-6 sm:p-8">
        <h3 className="text-2xl font-black text-slate-900">{region.title}</h3>
        {region.note && <p className="mt-2 max-w-4xl text-sm leading-6 text-amber-700">{region.note}</p>}
      </div>

      <div className="grid gap-5 px-5 pb-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,.75fr)] xl:px-8 xl:pb-8">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="h-auto w-full rounded-[24px] border border-slate-200 bg-slate-50" role="img" aria-label={region.title}>
          <defs>
            <clipPath id={clipId}>
              <rect x="0" y="0" width={viewW} height={viewH} rx="24" />
            </clipPath>
          </defs>
          <rect x="0" y="0" width={viewW} height={viewH} rx="24" fill="#ffffff" />
          <image href={region.image} x={imageX} y={imageY} width={imageWidth} height={imageHeight} preserveAspectRatio="none" clipPath={`url(#${clipId})`} />
          {region.anchors.map((anchor, index) => {
            const px = cropLeft + (anchor.x - cropX) * scale;
            const py = cropTop + (anchor.y - cropY) * scale;
            return (
              <g key={`${region.title}-${anchor.label}`}>
                <circle cx={px} cy={py} r="17" fill="#0f766e" stroke="#ffffff" strokeWidth="4" />
                <text x={px} y={py + 6} textAnchor="middle" fontSize="17" fontWeight="900" fill="#ffffff">{index + 1}</text>
              </g>
            );
          })}
        </svg>
        <MarkerLegend items={region.anchors} />
      </div>
    </article>
  );
}

function BackOverview() {
  const viewW = 720;
  const viewH = 920;
  const scale = Math.min(viewW / 960, viewH / 2256);
  const drawW = 960 * scale;
  const drawH = 2256 * scale;
  const x = (viewW - drawW) / 2;
  const y = (viewH - drawH) / 2;

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,.7fr)]">
      <svg viewBox={`0 0 ${viewW} ${viewH}`} className="h-auto w-full rounded-[24px] border border-slate-200 bg-white">
        <image href={I.back} x={x} y={y} width={drawW} height={drawH} preserveAspectRatio="none" />
        {backOverview.map((anchor, index) => {
          const px = x + anchor.x * scale;
          const py = y + anchor.y * scale;
          return (
            <g key={anchor.label}>
              <circle cx={px} cy={py} r="14" fill="#0f766e" stroke="#ffffff" strokeWidth="3" />
              <text x={px} y={py + 5} textAnchor="middle" fontSize="14" fontWeight="900" fill="#ffffff">{index + 1}</text>
            </g>
          );
        })}
      </svg>
      <MarkerLegend items={backOverview} />
    </div>
  );
}

export function SkeletonPageV3({ onBack }: Props) {
  const [side, setSide] = useState<Side>('front');
  const [mode, setMode] = useState<Mode>('labeled');

  const wholeImage = side === 'back' ? I.back : mode === 'numbered' ? I.frontNumbered : mode === 'clean' ? I.front : I.frontLabeled;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_8%_0%,_#fef3c7_0,_#f8fafc_30%,_#dbeafe_100%)] text-slate-900">
      <main className="mx-auto max-w-[1320px] px-4 pt-10 pb-24 sm:px-6">
        <button onClick={onBack} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm">
          <ArrowLeft className="h-4 w-4" /> Zurück zu den Lernfeldern
        </button>

        <section className="mt-7 rounded-[34px] bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-8 text-white shadow-2xl sm:p-11">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-300/15 px-4 py-2 text-xs font-black uppercase tracking-[.16em]">
              <Bone className="h-4 w-4" /> Skelett lernen
            </div>
            <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">
              Die Knochen direkt am Skelett sehen
              <span className="block text-amber-300">und Region für Region lernen.</span>
            </h1>
            <p className="mt-5 max-w-4xl text-slate-300 leading-7 sm:text-lg">
              Die Regionsbilder sind jetzt bewusst groß. Statt langer, fehleranfälliger Pfeile sitzt eine nummerierte Markierung direkt auf dem Knochen. Rechts daneben steht der deutsche und lateinische Name.
            </p>
          </div>
        </section>

        <section className="mt-9 rounded-[32px] bg-white p-6 shadow-xl sm:p-8">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-teal-700">
            <BookOpen className="h-4 w-4" /> Ganzes Skelett
          </div>
          <h2 className="mt-2 text-3xl font-black">Vorder- und Rückseite</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            <button onClick={() => setSide('front')} className={`rounded-xl px-4 py-2 text-sm font-black ${side === 'front' ? 'bg-teal-600 text-white' : 'bg-slate-100'}`}>Vorderseite</button>
            <button onClick={() => setSide('back')} className={`rounded-xl px-4 py-2 text-sm font-black ${side === 'back' ? 'bg-teal-600 text-white' : 'bg-slate-100'}`}>Rückseite</button>
            {side === 'front' && (
              <>
                <button onClick={() => setMode('labeled')} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black ${mode === 'labeled' ? 'bg-amber-500 text-white' : 'bg-slate-100'}`}><Eye className="h-4 w-4" /> Mit Namen</button>
                <button onClick={() => setMode('clean')} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black ${mode === 'clean' ? 'bg-sky-600 text-white' : 'bg-slate-100'}`}><EyeOff className="h-4 w-4" /> Ohne Namen</button>
                <button onClick={() => setMode('numbered')} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black ${mode === 'numbered' ? 'bg-violet-600 text-white' : 'bg-slate-100'}`}><GraduationCap className="h-4 w-4" /> Mit Nummern</button>
                <button onClick={() => { setSide('front'); setMode('labeled'); }} className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-black"><RotateCcw className="h-4 w-4" /> Zurücksetzen</button>
              </>
            )}
          </div>
          <div className="mt-6">
            {side === 'back' ? (
              <BackOverview />
            ) : (
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                <img src={wholeImage} alt="Menschliches Skelett Vorderansicht" className="h-auto w-full" />
              </div>
            )}
          </div>
        </section>

        <section className="mt-11">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-rose-700">
            <Film className="h-4 w-4" /> Lernvideos
          </div>
          <h2 className="mt-2 text-3xl font-black">Deutschsprachige Videos direkt auf der Seite</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {videos.map((video) => (
              <article key={video.embed} className="overflow-hidden rounded-3xl bg-white shadow-lg">
                <div className="aspect-video bg-slate-100">
                  <iframe src={video.embed} title={video.title} className="h-full w-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                </div>
                <div className="p-5">
                  <div className="font-black">{video.title}</div>
                  <div className="mt-1 text-sm text-slate-500">{video.channel}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-11">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-sky-700">
            <MapPinned className="h-4 w-4" /> Regionen
          </div>
          <h2 className="mt-2 text-3xl font-black">Jede Region groß und einzeln</h2>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
            Die Zahl sitzt direkt auf dem Knochen. So musst du keiner langen Linie folgen. Suche die Zahl im Bild und lies rechts den passenden Namen.
          </p>
          <div className="mt-7 grid gap-8">
            {regions.map((region) => (
              <RegionDiagram key={region.title} region={region} />
            ))}
          </div>
        </section>

        <section className="mt-11 rounded-[32px] bg-white p-6 shadow-xl sm:p-8">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-amber-700">
            <Sparkles className="h-4 w-4" /> Überblick
          </div>
          <h2 className="mt-2 text-3xl font-black">Was gehört zu welcher Region?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {boneGroups.map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="font-black">{title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-600">{text}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
