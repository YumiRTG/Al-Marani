import { ArrowLeft, Bone, Film, Image as ImageIcon, Layers3 } from 'lucide-react';

interface Props {
  onBack: () => void;
}

type LegendRow = [string, string, string?];

interface Panel {
  title: string;
  subtitle: string;
  image: string;
  legend?: LegendRow[];
  note?: string;
  sourceUrl: string;
  sourceLabel: string;
  imageClassName?: string;
}

const IMG = {
  fullFrontDe:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Human_skeleton_front_de.svg/1280px-Human_skeleton_front_de.svg.png',
  fullBackEn:
    'https://upload.wikimedia.org/wikipedia/commons/4/4e/Human_skeleton_back_en.svg',
  skullFrontNumbered:
    'https://upload.wikimedia.org/wikipedia/commons/1/12/Human_skull_front_bones_numbered.svg',
  cranialLateral:
    'https://upload.wikimedia.org/wikipedia/commons/8/8b/Cranial_bones_en.svg',
  spineGerman:
    'https://upload.wikimedia.org/wikipedia/commons/d/d6/Gray_111_-_Vertebral_column-coloured_labels.png',
  thoracicGif:
    'https://upload.wikimedia.org/wikipedia/commons/b/b7/Thoracic_Cage_with_Spine_-_Anatomy.gif',
  arm:
    'https://upload.wikimedia.org/wikipedia/commons/4/49/Human_arm_bones_diagram.svg',
  upperLimb:
    'https://upload.wikimedia.org/wikipedia/commons/f/fc/Upper_Limb_Bones.svg',
  handGerman:
    'https://upload.wikimedia.org/wikipedia/commons/2/2e/Menschliche_Handknochen_deutsch.svg',
  carpal:
    'https://upload.wikimedia.org/wikipedia/commons/b/b7/Carpal_bones.svg',
  pelvis:
    'https://upload.wikimedia.org/wikipedia/commons/f/ff/Skeletal_pelvis-pubis.svg',
  leg:
    'https://upload.wikimedia.org/wikipedia/commons/7/7e/Human_leg_bones_labeled.svg',
  footLatin:
    'https://upload.wikimedia.org/wikipedia/commons/0/07/Ospied-la.svg',
  footDorsal:
    'https://upload.wikimedia.org/wikipedia/commons/3/3e/202110_Dorsal_view_of_bones_of_right_foot.svg',
} as const;

const backLegend: LegendRow[] = [
  ['Occipital bone', 'Hinterhauptbein', 'Os occipitale'],
  ['Cervical vertebrae', 'Halswirbel', 'Vertebrae cervicales'],
  ['Scapula', 'Schulterblatt', 'Scapula'],
  ['Ribs', 'Rippen', 'Costae'],
  ['Thoracic vertebrae', 'Brustwirbel', 'Vertebrae thoracicae'],
  ['Lumbar vertebrae', 'Lendenwirbel', 'Vertebrae lumbales'],
  ['Sacrum', 'Kreuzbein', 'Os sacrum'],
  ['Coccyx', 'Steißbein', 'Os coccygis'],
  ['Humerus', 'Oberarmknochen', 'Humerus'],
  ['Radius', 'Speiche', 'Radius'],
  ['Ulna', 'Elle', 'Ulna'],
  ['Carpals', 'Handwurzelknochen', 'Ossa carpi'],
  ['Metacarpals', 'Mittelhandknochen', 'Ossa metacarpi'],
  ['Phalanges', 'Fingerknochen', 'Phalanges manus'],
  ['Femur', 'Oberschenkelknochen', 'Femur'],
  ['Tibia', 'Schienbein', 'Tibia'],
  ['Fibula', 'Wadenbein', 'Fibula'],
  ['Calcaneus', 'Fersenbein', 'Calcaneus'],
];

const skullLegend: LegendRow[] = [
  ['1', 'Stirnbein', 'Os frontale'],
  ['2', 'Nasenbein', 'Os nasale'],
  ['3', 'Scheitelbein', 'Os parietale'],
  ['4', 'Schläfenbein', 'Os temporale'],
  ['5', 'Keilbein', 'Os sphenoidale'],
  ['6', 'Tränenbein', 'Os lacrimale'],
  ['7', 'Jochbein', 'Os zygomaticum'],
  ['8 oben', 'Siebbein', 'Os ethmoidale'],
  ['8 unten', 'Pflugscharbein', 'Vomer'],
  ['9', 'Oberkiefer', 'Maxilla'],
  ['10', 'Unterkiefer', 'Mandibula'],
];

const carpalLegend: LegendRow[] = [
  ['A', 'Kahnbein', 'Os scaphoideum'],
  ['B', 'Mondbein', 'Os lunatum'],
  ['C', 'Dreiecksbein', 'Os triquetrum'],
  ['D', 'Erbsenbein', 'Os pisiforme'],
  ['E', 'Großes Vieleckbein', 'Os trapezium'],
  ['F', 'Kleines Vieleckbein', 'Os trapezoideum'],
  ['G', 'Kopfbein', 'Os capitatum'],
  ['H', 'Hakenbein', 'Os hamatum'],
  ['1', 'Speiche', 'Radius'],
  ['2', 'Elle', 'Ulna'],
  ['3', 'Mittelhand', 'Ossa metacarpi'],
];

const pelvisLegend: LegendRow[] = [
  ['1', 'Kreuzbein', 'Os sacrum'],
  ['2', 'Darmbein', 'Os ilium'],
  ['3', 'Sitzbein', 'Os ischii'],
  ['4', 'Schambein', 'Os pubis'],
  ['5', 'Schambeinfuge', 'Symphysis pubica'],
  ['6', 'Hüftpfanne', 'Acetabulum'],
  ['7', 'Foramen obturatum', 'Foramen obturatum'],
  ['8', 'Steißbein', 'Os coccygis'],
];

const panels: Panel[] = [
  {
    title: 'Schädel von vorne – nummeriert',
    subtitle: 'Die Nummern sind Bestandteil der Originalgrafik. Dadurch gibt es hier keine verschobenen Marker.',
    image: IMG.skullFrontNumbered,
    legend: skullLegend,
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Human_skull_front_bones_numbered.svg',
    sourceLabel: 'Wikimedia Commons – Human skull front bones numbered.svg',
  },
  {
    title: 'Hirnschädel von der Seite',
    subtitle: 'Die farblich hervorgehobenen Knochen stammen direkt aus einer anatomischen Originalgrafik.',
    image: IMG.cranialLateral,
    legend: [
      ['Frontal', 'Stirnbein', 'Os frontale'],
      ['Parietal', 'Scheitelbein', 'Os parietale'],
      ['Temporal', 'Schläfenbein', 'Os temporale'],
      ['Occipital', 'Hinterhauptbein', 'Os occipitale'],
      ['Sphenoid', 'Keilbein', 'Os sphenoidale'],
      ['Ethmoid', 'Siebbein', 'Os ethmoidale'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cranial_bones_en.svg',
    sourceLabel: 'Wikimedia Commons – Cranial bones en.svg',
  },
  {
    title: 'Wirbelsäule',
    subtitle: 'Diese Grafik ist bereits nach Wirbelsäulenabschnitten beschriftet und farblich gegliedert.',
    image: IMG.spineGerman,
    legend: [
      ['HWS', 'Halswirbelsäule', 'Vertebrae cervicales'],
      ['BWS', 'Brustwirbelsäule', 'Vertebrae thoracicae'],
      ['LWS', 'Lendenwirbelsäule', 'Vertebrae lumbales'],
      ['Sakrum', 'Kreuzbein', 'Os sacrum'],
      ['Coccyx', 'Steißbein', 'Os coccygis'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gray_111_-_Vertebral_column-coloured_labels.png',
    sourceLabel: 'Wikimedia Commons – Gray 111 vertebral column coloured labels',
    imageClassName: 'max-h-[760px] w-auto',
  },
  {
    title: 'Brustkorb mit Wirbelsäule',
    subtitle: 'Eine rotierende anatomische Originaldarstellung ohne nachträglich gesetzte Punkte.',
    image: IMG.thoracicGif,
    legend: [
      ['', 'Brustbein', 'Sternum'],
      ['', 'Rippen', 'Costae'],
      ['', 'Brustwirbel', 'Vertebrae thoracicae'],
      ['', 'Rippenknorpel', 'Cartilagines costales'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Thoracic_Cage_with_Spine_-_Anatomy.gif',
    sourceLabel: 'Wikimedia Commons – Thoracic Cage with Spine – Anatomy.gif',
  },
  {
    title: 'Schulter, Oberarm und Unterarm',
    subtitle: 'Die Grafik zeigt die Lage von Humerus, Radius und Ulna in Supination und Pronation.',
    image: IMG.arm,
    legend: [
      ['', 'Schulterblatt', 'Scapula'],
      ['', 'Oberarmknochen', 'Humerus'],
      ['', 'Speiche', 'Radius'],
      ['', 'Elle', 'Ulna'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Human_arm_bones_diagram.svg',
    sourceLabel: 'Wikimedia Commons – Human arm bones diagram.svg',
  },
  {
    title: 'Obere Extremität im Überblick',
    subtitle: 'Eine eigene anatomische Darstellung von Schlüsselbein, Schulterblatt, Arm, Unterarm und Hand.',
    image: IMG.upperLimb,
    legend: [
      ['', 'Schlüsselbein', 'Clavicula'],
      ['', 'Schulterblatt', 'Scapula'],
      ['', 'Oberarmknochen', 'Humerus'],
      ['', 'Speiche', 'Radius'],
      ['', 'Elle', 'Ulna'],
      ['', 'Handknochen', 'Ossa manus'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Upper_Limb_Bones.svg',
    sourceLabel: 'Wikimedia Commons – Upper Limb Bones.svg',
  },
  {
    title: 'Hand – deutsche Beschriftung',
    subtitle: 'Die Beschriftung ist direkt in der Grafik enthalten und verschiebt sich nicht.',
    image: IMG.handGerman,
    legend: [
      ['1', 'Endphalangen', 'Phalanges distales'],
      ['2', 'Mittelphalangen', 'Phalanges mediae'],
      ['3', 'Grundphalangen', 'Phalanges proximales'],
      ['4', 'Mittelhandknochen', 'Ossa metacarpi'],
      ['5', 'Handwurzelknochen', 'Ossa carpi'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Menschliche_Handknochen_deutsch.svg',
    sourceLabel: 'Wikimedia Commons – Menschliche Handknochen deutsch.svg',
  },
  {
    title: 'Handwurzel – alle acht Knochen',
    subtitle: 'A–H sind Bestandteil der Originalgrafik. Die Legende rechts übersetzt sie direkt ins Deutsche und Lateinische.',
    image: IMG.carpal,
    legend: carpalLegend,
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Carpal_bones.svg',
    sourceLabel: 'Wikimedia Commons – Carpal bones.svg',
  },
  {
    title: 'Becken – nummerierte Originalgrafik',
    subtitle: 'Die Nummern stehen bereits in der Anatomiegrafik. So ist die Zuordnung eindeutig.',
    image: IMG.pelvis,
    legend: pelvisLegend,
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Skeletal_pelvis-pubis.svg',
    sourceLabel: 'Wikimedia Commons – Skeletal pelvis-pubis.svg',
  },
  {
    title: 'Bein – beschriftete Übersicht',
    subtitle: 'Die Beschriftung ist Teil der Originaldatei und zeigt Femur, Patella, Tibia und Fibula direkt am Bein.',
    image: IMG.leg,
    legend: [
      ['', 'Oberschenkelknochen', 'Femur'],
      ['', 'Kniescheibe', 'Patella'],
      ['', 'Schienbein', 'Tibia'],
      ['', 'Wadenbein', 'Fibula'],
      ['', 'Fußwurzel', 'Ossa tarsi'],
      ['', 'Mittelfuß', 'Ossa metatarsi'],
      ['', 'Zehenknochen', 'Phalanges pedis'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Human_leg_bones_labeled.svg',
    sourceLabel: 'Wikimedia Commons – Human leg bones labeled.svg',
  },
  {
    title: 'Fuß – lateinisch beschriftet',
    subtitle: 'Hier stehen die anatomischen Bezeichnungen direkt im Bild. Rechts findest du die deutschen Entsprechungen.',
    image: IMG.footLatin,
    legend: [
      ['', 'Sprungbein', 'Talus'],
      ['', 'Fersenbein', 'Calcaneus'],
      ['', 'Kahnbein', 'Os naviculare'],
      ['', 'Würfelbein', 'Os cuboideum'],
      ['', 'Mediales Keilbein', 'Os cuneiforme mediale'],
      ['', 'Mittleres Keilbein', 'Os cuneiforme intermedium'],
      ['', 'Laterales Keilbein', 'Os cuneiforme laterale'],
      ['', 'Mittelfußknochen', 'Ossa metatarsi'],
      ['', 'Zehenknochen', 'Phalanges pedis'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ospied-la.svg',
    sourceLabel: 'Wikimedia Commons – Ospied-la.svg',
  },
  {
    title: 'Fuß – dorsale Ansicht ohne künstliche Marker',
    subtitle: 'Diese hochauflösende Originalgrafik zeigt die Form und Lage der Fußknochen von oben.',
    image: IMG.footDorsal,
    legend: [
      ['', 'Fußwurzel', 'Ossa tarsi'],
      ['', 'Mittelfuß', 'Ossa metatarsi'],
      ['', 'Zehen', 'Phalanges pedis'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:202110_Dorsal_view_of_bones_of_right_foot.svg',
    sourceLabel: 'Wikimedia Commons – Dorsal view of bones of right foot.svg',
  },
];

const videos = [
  {
    title: 'Alle Knochen mit deutschen & medizinischen Fachbegriffen',
    channel: 'Anatomie mit Carina',
    embed: 'https://www.youtube-nocookie.com/embed/EH46yQUsszI',
  },
  {
    title: 'Wirbelsäule zusammengefasst – Anatomie einfach erklärt',
    channel: 'Kenhub',
    embed: 'https://www.youtube-nocookie.com/embed/2l1dfJKPhWg',
  },
  {
    title: 'Beckenknochen verständlich erklärt',
    channel: 'Anatomie-Versteher',
    embed: 'https://www.youtube-nocookie.com/embed/WFlfaGoijnY',
  },
] as const;

function Legend({ rows }: { rows: LegendRow[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
      {rows.map(([key, de, latin]) => (
        <div key={`${key}-${de}-${latin}`} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <div className="flex items-start gap-3">
            {key ? (
              <span className="grid min-h-8 min-w-8 place-items-center rounded-lg bg-teal-600 px-2 text-xs font-black text-white">
                {key}
              </span>
            ) : null}
            <div>
              <div className="font-black text-slate-900">{de}</div>
              {latin ? <div className="mt-0.5 text-sm italic text-slate-500">{latin}</div> : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PanelCard({ panel }: { panel: Panel }) {
  return (
    <article className="overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-xl">
      <div className="p-6 sm:p-8">
        <h3 className="text-2xl font-black text-slate-900">{panel.title}</h3>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">{panel.subtitle}</p>
        {panel.note ? <p className="mt-2 text-sm text-amber-700">{panel.note}</p> : null}
      </div>

      <div className={`grid gap-5 px-5 pb-6 sm:px-8 sm:pb-8 ${panel.legend ? 'xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,.65fr)]' : ''}`}>
        <div className="grid min-h-[420px] place-items-center overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 sm:p-6">
          <img
            src={panel.image}
            alt={panel.title}
            loading="lazy"
            className={`max-h-[760px] max-w-full object-contain ${panel.imageClassName ?? ''}`}
          />
        </div>
        {panel.legend ? <Legend rows={panel.legend} /> : null}
      </div>

      <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-400 sm:px-8">
        Bildquelle: <a href={panel.sourceUrl} target="_blank" rel="noreferrer" className="underline">{panel.sourceLabel}</a>
      </div>
    </article>
  );
}

export function SkeletonPageV5({ onBack }: Props) {
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
              Knochen lernen, ohne dass Marker verrutschen
              <span className="block text-amber-300">mit anatomischen Originalgrafiken.</span>
            </h1>
            <p className="mt-5 max-w-4xl text-slate-300 leading-7 sm:text-lg">
              Die selbst gesetzten Punkte und Pfeile habe ich entfernt. Die Zuordnung erfolgt jetzt über Beschriftungen, Nummern, Buchstaben oder Farbcodes, die bereits Bestandteil der anatomischen Originalgrafik sind. Dadurch kann sich beim Vergrößern oder auf anderen Bildschirmgrößen nichts mehr verschieben.
            </p>
          </div>
        </section>

        <section className="mt-9 grid gap-6 lg:grid-cols-2">
          <article className="overflow-hidden rounded-[30px] bg-white shadow-xl">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-black sm:text-3xl">Vorderseite – deutsch beschriftet</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Die Linien und Namen sind direkt in der Originalgrafik enthalten.</p>
            </div>
            <div className="p-5 pt-0 sm:p-8 sm:pt-0">
              <img src={IMG.fullFrontDe} alt="Menschliches Skelett Vorderseite deutsch beschriftet" className="h-auto w-full rounded-2xl border border-slate-200 bg-white" />
            </div>
          </article>

          <article className="overflow-hidden rounded-[30px] bg-white shadow-xl">
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-black sm:text-3xl">Rückseite – Originalbeschriftung + Übersetzung</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Auch hier stammen die Pfeile direkt aus der anatomischen Originalgrafik. Rechts darunter findest du die deutschen und lateinischen Begriffe.</p>
            </div>
            <div className="grid gap-5 p-5 pt-0 sm:p-8 sm:pt-0 xl:grid-cols-[1fr_.8fr]">
              <img src={IMG.fullBackEn} alt="Menschliches Skelett Rückseite beschriftet" className="h-auto w-full rounded-2xl border border-slate-200 bg-white" />
              <Legend rows={backLegend} />
            </div>
          </article>
        </section>

        <section className="mt-11">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-sky-700">
            <Layers3 className="h-4 w-4" /> Anatomische Regionen
          </div>
          <h2 className="mt-2 text-3xl font-black">Jede Region mit einer verlässlichen Originalgrafik</h2>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
            In diesem Bereich gibt es keine frei platzierten Punkte mehr. Wenn eine Grafik Nummern oder Buchstaben verwendet, gehören diese zur Originaldatei und bleiben deshalb immer am richtigen Knochen.
          </p>
          <div className="mt-7 grid gap-8">
            {panels.map((panel) => (
              <PanelCard key={panel.title} panel={panel} />
            ))}
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
                  <div className="font-black">{video.title}</div>
                  <div className="mt-1 text-sm text-slate-500">{video.channel}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-11 rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-teal-700">
            <ImageIcon className="h-4 w-4" /> Warum diese Version zuverlässiger ist
          </div>
          <p className="mt-3 max-w-5xl text-sm leading-7 text-slate-600">
            Vorher lagen unsere Marker als eigene Ebene über den Bildern. Schon kleine Abweichungen bei Bildgröße, Ausschnitt oder Seitenverhältnis konnten die Punkte sichtbar verschieben. In dieser Version stammen die anatomischen Markierungen direkt aus den jeweiligen Bilddateien. Deshalb verändert Responsive Design nur die Größe des kompletten Bildes – nicht die Position der Beschriftung relativ zum Knochen.
          </p>
        </section>
      </main>
    </div>
  );
}
