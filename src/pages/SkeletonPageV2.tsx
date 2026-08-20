import { Bone, Film } from 'lucide-react';
import { SkeletonPage as ExistingSkeletonPage } from './SkeletonPage';

interface Props {
  onBack: () => void;
}

const BACK_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Human_skeleton_back_no-text_no-color.svg/960px-Human_skeleton_back_no-text_no-color.svg.png';

const backLabels = [
  { label: 'Hinterhauptbein', latin: 'Os occipitale', point: [50, 8], side: 'left', top: 6 },
  { label: 'Halswirbel', latin: 'Vertebrae cervicales', point: [50, 18], side: 'left', top: 13 },
  { label: 'Schulterblatt', latin: 'Scapula', point: [38, 28], side: 'left', top: 20 },
  { label: 'Rippen', latin: 'Costae', point: [37, 34], side: 'left', top: 27 },
  { label: 'Brustwirbel', latin: 'Vertebrae thoracicae', point: [50, 36], side: 'left', top: 34 },
  { label: 'Lendenwirbel', latin: 'Vertebrae lumbales', point: [50, 49], side: 'left', top: 41 },
  { label: 'Kreuzbein', latin: 'Os sacrum', point: [50, 57], side: 'left', top: 48 },
  { label: 'Steißbein', latin: 'Os coccygis', point: [50, 62], side: 'left', top: 55 },
  { label: 'Oberarmknochen', latin: 'Humerus', point: [72, 30], side: 'right', top: 15 },
  { label: 'Elle', latin: 'Ulna', point: [76, 43], side: 'right', top: 23 },
  { label: 'Speiche', latin: 'Radius', point: [81, 44], side: 'right', top: 31 },
  { label: 'Handwurzelknochen', latin: 'Ossa carpi', point: [84, 56], side: 'right', top: 39 },
  { label: 'Mittelhandknochen', latin: 'Ossa metacarpi', point: [86, 62], side: 'right', top: 47 },
  { label: 'Fingerknochen', latin: 'Phalanges manus', point: [89, 68], side: 'right', top: 55 },
  { label: 'Oberschenkelknochen', latin: 'Femur', point: [59, 72], side: 'right', top: 66 },
  { label: 'Schienbein', latin: 'Tibia', point: [55, 86], side: 'right', top: 76 },
  { label: 'Wadenbein', latin: 'Fibula', point: [62, 86], side: 'right', top: 84 },
  { label: 'Fersenbein', latin: 'Calcaneus', point: [58, 97], side: 'right', top: 93 },
] as const;

const videos = [
  {
    title: 'Das Skelett des Menschen – Aufbau & Funktion',
    channel: 'Biologie – sofatutor',
    embed: 'https://www.youtube.com/embed/W2FL30vKnzk',
  },
  {
    title: 'Skelettsystem – Anatomie des Menschen',
    channel: 'Kenhub – Anatomie des Menschen lernen',
    embed: 'https://www.youtube.com/embed/SjS6yXcH1lk',
  },
  {
    title: 'Die Handwurzelknochen einfach erklärt',
    channel: 'Medizin Helden',
    embed: 'https://www.youtube.com/embed/erAcpwxlBiA',
  },
] as const;

function LabeledBackOverview() {
  return (
    <section className="mx-auto max-w-[1320px] px-4 pt-10 sm:px-6">
      <div className="rounded-[34px] bg-white p-6 shadow-xl sm:p-8">
        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-teal-700">
          <Bone className="h-4 w-4" /> Rückansicht
        </div>
        <h2 className="mt-2 text-3xl font-black">Rückseite des Skeletts – mit Namen und Lage</h2>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
          Von hinten erkennst du besonders gut Schulterblätter, die gesamte Wirbelsäule, Kreuzbein und Steißbein sowie die Rückseite von Armen und Beinen. Die Linien führen dich direkt von der Bezeichnung zu der Stelle am Skelett.
        </p>

        <div className="relative mt-6 h-[980px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
          <img
            src={BACK_IMAGE}
            alt="Menschliches Skelett Rückansicht"
            className="absolute left-1/2 top-0 h-full -translate-x-1/2 object-contain"
          />

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {backLabels.map((item) => {
              const x2 = item.side === 'left' ? 22 : 78;
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
              className={`absolute w-[21%] -translate-y-1/2 rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-sm ${
                item.side === 'left' ? 'left-[1.5%]' : 'right-[1.5%]'
              }`}
              style={{ top: `${item.top}%` }}
            >
              <div className="text-[12px] font-black leading-4 text-slate-900">{item.label}</div>
              <div className="text-[10px] leading-3 text-slate-500">{item.latin}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-3 text-sm leading-6 md:grid-cols-3">
          <div className="rounded-2xl bg-teal-50 p-4">
            <strong>Schulter:</strong> Von hinten ist das Schulterblatt besonders deutlich sichtbar.
          </div>
          <div className="rounded-2xl bg-sky-50 p-4">
            <strong>Wirbelsäule:</strong> Folge Hals-, Brust- und Lendenwirbeln bis zu Kreuzbein und Steißbein.
          </div>
          <div className="rounded-2xl bg-amber-50 p-4">
            <strong>Beine:</strong> Femur, Tibia, Fibula und Fersenbein lassen sich auch von hinten gut zuordnen.
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
        <h2 className="mt-2 text-3xl font-black">Deutschsprachige Videos direkt auf der Lernseite</h2>
        <p className="mt-2 text-sm text-slate-600">
          Die Videos kannst du direkt hier starten. Sie ergänzen die Bilder und helfen dir dabei, die Knochen räumlich besser zu verstehen.
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
      <LabeledBackOverview />
      <EmbeddedVideos />
      <ExistingSkeletonPage onBack={onBack} />
    </div>
  );
}
