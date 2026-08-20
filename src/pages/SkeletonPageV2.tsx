import { useState } from 'react';
import { Bone, Film } from 'lucide-react';
import { SkeletonPage as ExistingSkeletonPage } from './SkeletonPage';

interface Props {
  onBack: () => void;
}

type View = 'front' | 'back';

interface BackLabel {
  label: string;
  latin: string;
  x: number;
  y: number;
  side: 'left' | 'right';
}

const FRONT_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Human_skeleton_front_de.svg/1280px-Human_skeleton_front_de.svg.png';
const BACK_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Human_skeleton_back_no-text_no-color.svg/960px-Human_skeleton_back_no-text_no-color.svg.png';

const backLabels: BackLabel[] = [
  { label: 'Hinterhauptbein', latin: 'Os occipitale', x: 480, y: 175, side: 'left' },
  { label: 'Halswirbel', latin: 'Vertebrae cervicales', x: 480, y: 320, side: 'left' },
  { label: 'Schulterblatt', latin: 'Scapula', x: 300, y: 500, side: 'left' },
  { label: 'Rippen', latin: 'Costae', x: 340, y: 620, side: 'left' },
  { label: 'Brustwirbel', latin: 'Vertebrae thoracicae', x: 480, y: 600, side: 'left' },
  { label: 'Lendenwirbel', latin: 'Vertebrae lumbales', x: 480, y: 820, side: 'left' },
  { label: 'Kreuzbein', latin: 'Os sacrum', x: 480, y: 1015, side: 'left' },
  { label: 'Steißbein', latin: 'Os coccygis', x: 480, y: 1080, side: 'left' },
  { label: 'Oberarmknochen', latin: 'Humerus', x: 715, y: 610, side: 'right' },
  { label: 'Elle', latin: 'Ulna', x: 740, y: 950, side: 'right' },
  { label: 'Speiche', latin: 'Radius', x: 795, y: 950, side: 'right' },
  { label: 'Handwurzelknochen', latin: 'Ossa carpi', x: 810, y: 1120, side: 'right' },
  { label: 'Mittelhandknochen', latin: 'Ossa metacarpi', x: 835, y: 1195, side: 'right' },
  { label: 'Fingerknochen', latin: 'Phalanges manus', x: 855, y: 1270, side: 'right' },
  { label: 'Oberschenkelknochen', latin: 'Femur', x: 585, y: 1380, side: 'right' },
  { label: 'Schienbein', latin: 'Tibia', x: 535, y: 1810, side: 'right' },
  { label: 'Wadenbein', latin: 'Fibula', x: 605, y: 1810, side: 'right' },
  { label: 'Fersenbein', latin: 'Calcaneus', x: 540, y: 2165, side: 'right' },
];

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

function BackLabeled() {
  const viewW = 1400;
  const viewH = 1000;
  const sourceW = 960;
  const sourceH = 2256;
  const imageArea = { x: 380, y: 20, w: 640, h: 960 };
  const scale = Math.min(imageArea.w / sourceW, imageArea.h / sourceH);
  const drawW = sourceW * scale;
  const drawH = sourceH * scale;
  const imageX = imageArea.x + (imageArea.w - drawW) / 2;
  const imageY = imageArea.y + (imageArea.h - drawH) / 2;
  const leftLabels = backLabels.filter((x) => x.side === 'left');
  const rightLabels = backLabels.filter((x) => x.side === 'right');

  const labelY = (index: number, count: number) => {
    const top = 72;
    const bottom = 928;
    if (count <= 1) return (top + bottom) / 2;
    return top + (index * (bottom - top)) / (count - 1);
  };

  return (
    <svg viewBox={`0 0 ${viewW} ${viewH}`} className="h-auto w-full rounded-3xl border border-slate-200 bg-slate-50" role="img" aria-label="Rückseite des menschlichen Skeletts mit Beschriftungen">
      <rect x="0" y="0" width={viewW} height={viewH} fill="#f8fafc" />
      <image href={BACK_IMAGE} x={imageX} y={imageY} width={drawW} height={drawH} preserveAspectRatio="none" />

      {leftLabels.map((item, index) => {
        const px = imageX + item.x * scale;
        const py = imageY + item.y * scale;
        const ly = labelY(index, leftLabels.length);
        return (
          <g key={item.label}>
            <polyline points={`${px},${py} 340,${py} 330,${ly}`} fill="none" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={px} cy={py} r="7" fill="#0f766e" stroke="white" strokeWidth="2" />
            <rect x="20" y={ly - 27} width="310" height="54" rx="14" fill="white" stroke="#dbe3ee" strokeWidth="2" />
            <text x="36" y={ly - 4} fontSize="18" fontWeight="800" fill="#0f172a">{item.label}</text>
            <text x="36" y={ly + 17} fontSize="14" fill="#64748b">{item.latin}</text>
          </g>
        );
      })}

      {rightLabels.map((item, index) => {
        const px = imageX + item.x * scale;
        const py = imageY + item.y * scale;
        const ly = labelY(index, rightLabels.length);
        return (
          <g key={item.label}>
            <polyline points={`${px},${py} 1060,${py} 1070,${ly}`} fill="none" stroke="#0f766e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={px} cy={py} r="7" fill="#0f766e" stroke="white" strokeWidth="2" />
            <rect x="1070" y={ly - 27} width="310" height="54" rx="14" fill="white" stroke="#dbe3ee" strokeWidth="2" />
            <text x="1086" y={ly - 4} fontSize="18" fontWeight="800" fill="#0f172a">{item.label}</text>
            <text x="1086" y={ly + 17} fontSize="14" fill="#64748b">{item.latin}</text>
          </g>
        );
      })}
    </svg>
  );
}

function TopOverview() {
  const [view, setView] = useState<View>('front');

  return (
    <section className="mx-auto max-w-[1320px] px-4 pt-10 sm:px-6">
      <div className="rounded-[34px] bg-white p-6 shadow-xl sm:p-8">
        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-teal-700">
          <Bone className="h-4 w-4" /> Skelett – Vorder- und Rückseite
        </div>
        <h2 className="mt-2 text-3xl font-black">Beide Ansichten direkt am Anfang</h2>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
          Die Rückseite wird jetzt aus den Originalkoordinaten des Skelettbildes beschriftet. Dadurch bleiben die Marker direkt am richtigen Knochen und verschieben sich nicht mehr durch unterschiedliche Bildschirmgrößen.
        </p>

        <div className="mt-5 inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-1">
          <button onClick={() => setView('front')} className={`rounded-xl px-4 py-2 text-sm font-black ${view === 'front' ? 'bg-teal-600 text-white' : 'text-slate-600'}`}>Vorderseite</button>
          <button onClick={() => setView('back')} className={`rounded-xl px-4 py-2 text-sm font-black ${view === 'back' ? 'bg-teal-600 text-white' : 'text-slate-600'}`}>Rückseite</button>
        </div>

        <div className="mt-6">
          {view === 'front' ? (
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              <img src={FRONT_IMAGE} alt="Menschliches Skelett Vorderansicht beschriftet" className="h-auto w-full" />
            </div>
          ) : (
            <BackLabeled />
          )}
        </div>

        <div className="mt-5 grid gap-3 text-sm leading-6 md:grid-cols-3">
          <div className="rounded-2xl bg-teal-50 p-4"><strong>Vorne:</strong> Brustbein, Rippen, Becken, Patella sowie Arm- und Beinknochen lassen sich gut verfolgen.</div>
          <div className="rounded-2xl bg-sky-50 p-4"><strong>Hinten:</strong> Schulterblätter, Wirbelsäule, Kreuzbein und die Rückseite der Extremitäten sind besonders gut sichtbar.</div>
          <div className="rounded-2xl bg-amber-50 p-4"><strong>Tipp:</strong> Sprich den deutschen und den lateinischen Namen direkt nacheinander aus.</div>
        </div>
      </div>
    </section>
  );
}

function EmbeddedVideos() {
  return (
    <section className="mx-auto max-w-[1320px] px-4 pt-10 sm:px-6">
      <div className="rounded-[34px] bg-white p-6 shadow-xl sm:p-8">
        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-rose-700"><Film className="h-4 w-4" /> Lernvideos</div>
        <h2 className="mt-2 text-3xl font-black">Deutschsprachige Videos direkt eingebettet</h2>
        <p className="mt-2 text-sm text-slate-600">Die Videos laufen direkt auf dieser Seite und ergänzen die Bilder.</p>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {videos.map((video) => (
            <article key={video.embed} className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg">
              <div className="aspect-video bg-slate-100">
                <iframe src={video.embed} title={video.title} className="h-full w-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
              </div>
              <div className="p-5"><h3 className="font-black text-slate-900">{video.title}</h3><p className="mt-1 text-sm text-slate-500">{video.channel}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SkeletonPageV2({ onBack }: Props) {
  return (
    <div className="bg-[radial-gradient(circle_at_8%_0%,_#fef3c7_0,_#f8fafc_30%,_#dbeafe_100%)]">
      <TopOverview />
      <EmbeddedVideos />
      <ExistingSkeletonPage onBack={onBack} />
    </div>
  );
}
