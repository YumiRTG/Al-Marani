import { useState } from 'react';
import { Bone, Film } from 'lucide-react';
import { SkeletonPage as ExistingSkeletonPage } from './SkeletonPage';

interface Props {
  onBack: () => void;
}

type View = 'front' | 'back';

const FRONT_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Human_skeleton_front_de.svg/1280px-Human_skeleton_front_de.svg.png';
const BACK_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Human_skeleton_back_no-text_no-color.svg/960px-Human_skeleton_back_no-text_no-color.svg.png';

const backLabels = [
  { label: 'Hinterhauptbein', latin: 'Os occipitale', point: [50, 7], side: 'left', top: 5 },
  { label: 'Halswirbel', latin: 'Vertebrae cervicales', point: [50, 16], side: 'left', top: 12 },
  { label: 'Schulterblatt', latin: 'Scapula', point: [39, 27], side: 'left', top: 19 },
  { label: 'Rippen', latin: 'Costae', point: [39, 34], side: 'left', top: 26 },
  { label: 'Brustwirbel', latin: 'Vertebrae thoracicae', point: [50, 36], side: 'left', top: 33 },
  { label: 'Lendenwirbel', latin: 'Vertebrae lumbales', point: [50, 49], side: 'left', top: 40 },
  { label: 'Kreuzbein', latin: 'Os sacrum', point: [50, 57], side: 'left', top: 47 },
  { label: 'Steißbein', latin: 'Os coccygis', point: [50, 62], side: 'left', top: 54 },
  { label: 'Oberarmknochen', latin: 'Humerus', point: [72, 30], side: 'right', top: 8 },
  { label: 'Elle', latin: 'Ulna', point: [76, 43], side: 'right', top: 16 },
  { label: 'Speiche', latin: 'Radius', point: [81, 44], side: 'right', top: 24 },
  { label: 'Handwurzelknochen', latin: 'Ossa carpi', point: [84, 56], side: 'right', top: 32 },
  { label: 'Mittelhandknochen', latin: 'Ossa metacarpi', point: [86, 62], side: 'right', top: 40 },
  { label: 'Fingerknochen', latin: 'Phalanges manus', point: [89, 68], side: 'right', top: 48 },
  { label: 'Oberschenkelknochen', latin: 'Femur', point: [59, 72], side: 'right', top: 61 },
  { label: 'Schienbein', latin: 'Tibia', point: [55, 86], side: 'right', top: 71 },
  { label: 'Wadenbein', latin: 'Fibula', point: [62, 86], side: 'right', top: 81 },
  { label: 'Fersenbein', latin: 'Calcaneus', point: [58, 97], side: 'right', top: 92 },
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

function BackLabeled() {
  return (
    <div className="relative h-[980px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
      <img
        src={BACK_IMAGE}
        alt="Menschliches Skelett Rückansicht"
        className="absolute left-1/2 top-0 h-full -translate-x-1/2 object-contain"
      />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {backLabels.map((item) => {
          const x2 = item.side === 'left' ? 23 : 77;
          return (
            <g key={item.label}>
              <line
                x1={item.point[0]}
                y1={item.point[1]}
                x2={x2}
                y2={item.top}
                stroke="#0f766e"
                strokeWidth="0.32"
              />
              <circle
                cx={item.point[0]}
                cy={item.point[1]}
                r="0.7"
                fill="#0f766e"
                stroke="white"
                strokeWidth="0.18"
              />
            </g>
          );
        })}
      </svg>

      {backLabels.map((item) => (
        <div
          key={item.label}
          className={`absolute w-[22%] -translate-y-1/2 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-sm ${
            item.side === 'left' ? 'left-[1%]' : 'right-[1%]'
          }`}
          style={{ top: `${item.top}%` }}
        >
          <div className="text-[12px] font-black leading-4 text-slate-900">{item.label}</div>
          <div className="text-[10px] leading-3 text-slate-500">{item.latin}</div>
        </div>
      ))}
    </div>
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
          Nutze zuerst die Vorderansicht und wechsle danach auf die Rückseite. Auf der Rückseite stehen die wichtigsten Knochen ebenfalls direkt am Bild mit deutschem und lateinischem Namen.
        </p>

        <div className="mt-5 inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-1">
          <button
            onClick={() => setView('front')}
            className={`rounded-xl px-4 py-2 text-sm font-black ${view === 'front' ? 'bg-teal-600 text-white' : 'text-slate-600'}`}
          >
            Vorderseite
          </button>
          <button
            onClick={() => setView('back')}
            className={`rounded-xl px-4 py-2 text-sm font-black ${view === 'back' ? 'bg-teal-600 text-white' : 'text-slate-600'}`}
          >
            Rückseite
          </button>
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
          <div className="rounded-2xl bg-teal-50 p-4">
            <strong>Vorne:</strong> Brustbein, Rippen, Becken, Patella sowie Arm- und Beinknochen lassen sich gut verfolgen.
          </div>
          <div className="rounded-2xl bg-sky-50 p-4">
            <strong>Hinten:</strong> Schulterblätter, Wirbelsäule, Kreuzbein und die Rückseite der Extremitäten sind besonders gut sichtbar.
          </div>
          <div className="rounded-2xl bg-amber-50 p-4">
            <strong>Tipp:</strong> Sprich den deutschen und den lateinischen Namen direkt nacheinander aus.
          </div>
        </div>
      </div>
    </section>
  );
}

function EmbeddedVideos() {
  return (
    <section className="mx-auto max-w-[1320px] px-4 pt-10 sm:px-6">
      <div className="rounded-[34px] bg-white p-6 shadow-xl sm:p-8">
        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-rose-700">
          <Film className="h-4 w-4" /> Lernvideos
        </div>
        <h2 className="mt-2 text-3xl font-black">Deutschsprachige Videos direkt eingebettet</h2>
        <p className="mt-2 text-sm text-slate-600">
          Die Videos laufen direkt auf dieser Seite. Das erste Video geht das komplette Skelett mit deutschen und medizinischen Fachbegriffen durch; die anderen beiden vertiefen Wirbelsäule und Becken.
        </p>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {videos.map((video) => (
            <article key={video.embed} className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg">
              <div className="aspect-video bg-slate-100">
                <iframe
                  src={video.embed}
                  title={video.title}
                  className="h-full w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="p-5">
                <h3 className="font-black text-slate-900">{video.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{video.channel}</p>
              </div>
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
