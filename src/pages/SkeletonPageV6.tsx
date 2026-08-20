import { ArrowLeft, Bone, BookOpen, Film, Languages, Layers3 } from 'lucide-react';

interface Props {
  onBack: () => void;
}

type LegendRow = [de: string, latin: string, original?: string];

interface Panel {
  title: string;
  subtitle: string;
  image: string;
  legend: LegendRow[];
  sourceUrl: string;
  sourceLabel: string;
  imageClassName?: string;
  tip?: string;
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
  ['Hinterhauptbein', 'Os occipitale', 'Occipital bone'],
  ['Halswirbel', 'Vertebrae cervicales', 'Cervical vertebrae'],
  ['Schulterblatt', 'Scapula', 'Scapula'],
  ['Rippen', 'Costae', 'Ribs'],
  ['Brustwirbel', 'Vertebrae thoracicae', 'Thoracic vertebrae'],
  ['Lendenwirbel', 'Vertebrae lumbales', 'Lumbar vertebrae'],
  ['Kreuzbein', 'Os sacrum', 'Sacrum'],
  ['Steißbein', 'Os coccygis', 'Coccyx'],
  ['Oberarmknochen', 'Humerus', 'Humerus'],
  ['Speiche', 'Radius', 'Radius'],
  ['Elle', 'Ulna', 'Ulna'],
  ['Handwurzelknochen', 'Ossa carpi', 'Carpals'],
  ['Mittelhandknochen', 'Ossa metacarpi', 'Metacarpals'],
  ['Fingerknochen', 'Phalanges manus', 'Phalanges'],
  ['Oberschenkelknochen', 'Femur', 'Femur'],
  ['Schienbein', 'Tibia', 'Tibia'],
  ['Wadenbein', 'Fibula', 'Fibula'],
  ['Fersenbein', 'Calcaneus', 'Calcaneus'],
];

const panels: Panel[] = [
  {
    title: 'Schädel von vorne – nummeriert',
    subtitle: 'Lerne zuerst den deutschen Begriff. Die Nummer im Bild hilft dir, den Knochen sicher wiederzufinden.',
    image: IMG.skullFrontNumbered,
    legend: [
      ['Stirnbein', 'Os frontale', '1'],
      ['Nasenbein', 'Os nasale', '2'],
      ['Scheitelbein', 'Os parietale', '3'],
      ['Schläfenbein', 'Os temporale', '4'],
      ['Keilbein', 'Os sphenoidale', '5'],
      ['Tränenbein', 'Os lacrimale', '6'],
      ['Jochbein', 'Os zygomaticum', '7'],
      ['Siebbein', 'Os ethmoidale', '8 oben'],
      ['Pflugscharbein', 'Vomer', '8 unten'],
      ['Oberkiefer', 'Maxilla', '9'],
      ['Unterkiefer', 'Mandibula', '10'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Human_skull_front_bones_numbered.svg',
    sourceLabel: 'Wikimedia Commons – Human skull front bones numbered.svg',
    tip: 'Sprich zuerst „Stirnbein“, danach „Os frontale“ und suche dann die 1 im Bild.',
  },
  {
    title: 'Hirnschädel von der Seite',
    subtitle: 'Die Grafik ist englisch beschriftet. Rechts steht deshalb jeder wichtige Begriff zuerst auf Deutsch und danach auf Latein.',
    image: IMG.cranialLateral,
    legend: [
      ['Stirnbein', 'Os frontale', 'Frontal'],
      ['Scheitelbein', 'Os parietale', 'Parietal'],
      ['Schläfenbein', 'Os temporale', 'Temporal'],
      ['Hinterhauptbein', 'Os occipitale', 'Occipital'],
      ['Keilbein', 'Os sphenoidale', 'Sphenoid'],
      ['Siebbein', 'Os ethmoidale', 'Ethmoid'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Cranial_bones_en.svg',
    sourceLabel: 'Wikimedia Commons – Cranial bones en.svg',
  },
  {
    title: 'Wirbelsäule',
    subtitle: 'Die Wirbelsäule lernst du am einfachsten nach ihren Abschnitten.',
    image: IMG.spineGerman,
    legend: [
      ['Halswirbelsäule', 'Vertebrae cervicales', 'HWS'],
      ['Brustwirbelsäule', 'Vertebrae thoracicae', 'BWS'],
      ['Lendenwirbelsäule', 'Vertebrae lumbales', 'LWS'],
      ['Kreuzbein', 'Os sacrum', 'Sakrum'],
      ['Steißbein', 'Os coccygis', 'Coccyx'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gray_111_-_Vertebral_column-coloured_labels.png',
    sourceLabel: 'Wikimedia Commons – Gray 111 vertebral column coloured labels',
    imageClassName: 'max-h-[760px] w-auto',
    tip: 'Merkfolge von oben nach unten: Hals – Brust – Lende – Kreuzbein – Steißbein.',
  },
  {
    title: 'Brustkorb',
    subtitle: 'Hier stehen die deutschen Hauptbegriffe direkt neben der anatomischen Originaldarstellung.',
    image: IMG.thoracicGif,
    legend: [
      ['Brustbein', 'Sternum'],
      ['Rippen', 'Costae'],
      ['Brustwirbel', 'Vertebrae thoracicae'],
      ['Rippenknorpel', 'Cartilagines costales'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Thoracic_Cage_with_Spine_-_Anatomy.gif',
    sourceLabel: 'Wikimedia Commons – Thoracic Cage with Spine – Anatomy.gif',
  },
  {
    title: 'Schulter, Oberarm und Unterarm',
    subtitle: 'Die englischen Begriffe im Bild musst du nicht auswendig lernen. Nutze die deutsche Liste rechts als Hauptlernweg.',
    image: IMG.arm,
    legend: [
      ['Schulterblatt', 'Scapula', 'Scapula'],
      ['Oberarmknochen', 'Humerus', 'Humerus'],
      ['Speiche', 'Radius', 'Radius'],
      ['Elle', 'Ulna', 'Ulna'],
      ['Handwurzel', 'Carpus', 'Carpus'],
      ['Mittelhand', 'Metacarpus', 'Metacarpus'],
      ['Fingerknochen', 'Phalanges manus', 'Phalanges'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Human_arm_bones_diagram.svg',
    sourceLabel: 'Wikimedia Commons – Human arm bones diagram.svg',
    tip: 'Merke dir: Radius = Speiche auf der Daumenseite. Ulna = Elle auf der Kleinfingerseite.',
  },
  {
    title: 'Obere Extremität im Überblick',
    subtitle: 'Lerne diese Region in der Reihenfolge Schultergürtel → Oberarm → Unterarm → Hand.',
    image: IMG.upperLimb,
    legend: [
      ['Schlüsselbein', 'Clavicula', 'Clavicle'],
      ['Schulterblatt', 'Scapula', 'Scapula'],
      ['Oberarmknochen', 'Humerus', 'Humerus'],
      ['Speiche', 'Radius', 'Radius'],
      ['Elle', 'Ulna', 'Ulna'],
      ['Handwurzelknochen', 'Ossa carpi', 'Carpals'],
      ['Mittelhandknochen', 'Ossa metacarpi', 'Metacarpals'],
      ['Fingerknochen', 'Phalanges manus', 'Phalanges'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Upper_Limb_Bones.svg',
    sourceLabel: 'Wikimedia Commons – Upper Limb Bones.svg',
  },
  {
    title: 'Hand – deutsche Beschriftung',
    subtitle: 'Diese Grafik ist bereits deutsch beschriftet. Rechts findest du zusätzlich die lateinischen Fachbegriffe.',
    image: IMG.handGerman,
    legend: [
      ['Endphalangen', 'Phalanges distales', '1'],
      ['Mittelphalangen', 'Phalanges mediae', '2'],
      ['Grundphalangen', 'Phalanges proximales', '3'],
      ['Mittelhandknochen', 'Ossa metacarpi', '4'],
      ['Handwurzelknochen', 'Ossa carpi', '5'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Menschliche_Handknochen_deutsch.svg',
    sourceLabel: 'Wikimedia Commons – Menschliche Handknochen deutsch.svg',
  },
  {
    title: 'Handwurzel – alle acht Knochen',
    subtitle: 'Die acht Handwurzelknochen werden häufig einzeln abgefragt. Deutsch steht jeweils zuerst.',
    image: IMG.carpal,
    legend: [
      ['Kahnbein', 'Os scaphoideum', 'A'],
      ['Mondbein', 'Os lunatum', 'B'],
      ['Dreiecksbein', 'Os triquetrum', 'C'],
      ['Erbsenbein', 'Os pisiforme', 'D'],
      ['Großes Vieleckbein', 'Os trapezium', 'E'],
      ['Kleines Vieleckbein', 'Os trapezoideum', 'F'],
      ['Kopfbein', 'Os capitatum', 'G'],
      ['Hakenbein', 'Os hamatum', 'H'],
      ['Speiche', 'Radius', '1'],
      ['Elle', 'Ulna', '2'],
      ['Mittelhand', 'Ossa metacarpi', '3'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Carpal_bones.svg',
    sourceLabel: 'Wikimedia Commons – Carpal bones.svg',
  },
  {
    title: 'Becken',
    subtitle: 'Nutze die Nummern im Bild und lerne die deutschen Begriffe rechts zuerst.',
    image: IMG.pelvis,
    legend: [
      ['Kreuzbein', 'Os sacrum', '1'],
      ['Darmbein', 'Os ilium', '2'],
      ['Sitzbein', 'Os ischii', '3'],
      ['Schambein', 'Os pubis', '4'],
      ['Schambeinfuge', 'Symphysis pubica', '5'],
      ['Hüftpfanne', 'Acetabulum', '6'],
      ['Foramen obturatum', 'Foramen obturatum', '7'],
      ['Steißbein', 'Os coccygis', '8'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Skeletal_pelvis-pubis.svg',
    sourceLabel: 'Wikimedia Commons – Skeletal pelvis-pubis.svg',
  },
  {
    title: 'Bein',
    subtitle: 'Konzentriere dich zuerst auf die vier großen Knochen: Oberschenkelknochen, Kniescheibe, Schienbein und Wadenbein.',
    image: IMG.leg,
    legend: [
      ['Oberschenkelknochen', 'Femur', 'Femur'],
      ['Kniescheibe', 'Patella', 'Patella'],
      ['Schienbein', 'Tibia', 'Tibia'],
      ['Wadenbein', 'Fibula', 'Fibula'],
      ['Fußwurzel', 'Ossa tarsi', 'Tarsals'],
      ['Mittelfuß', 'Ossa metatarsi', 'Metatarsals'],
      ['Zehenknochen', 'Phalanges pedis', 'Phalanges'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Human_leg_bones_labeled.svg',
    sourceLabel: 'Wikimedia Commons – Human leg bones labeled.svg',
  },
  {
    title: 'Fuß – einzelne Knochen',
    subtitle: 'Die Grafik zeigt lateinische Begriffe. Rechts steht jeder davon zuerst auf Deutsch.',
    image: IMG.footLatin,
    legend: [
      ['Sprungbein', 'Talus'],
      ['Fersenbein', 'Calcaneus'],
      ['Kahnbein', 'Os naviculare'],
      ['Würfelbein', 'Os cuboideum'],
      ['Mediales Keilbein', 'Os cuneiforme mediale'],
      ['Mittleres Keilbein', 'Os cuneiforme intermedium'],
      ['Laterales Keilbein', 'Os cuneiforme laterale'],
      ['Mittelfußknochen', 'Ossa metatarsi'],
      ['Zehenknochen', 'Phalanges pedis'],
    ],
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ospied-la.svg',
    sourceLabel: 'Wikimedia Commons – Ospied-la.svg',
  },
  {
    title: 'Fuß – Überblick von oben',
    subtitle: 'Diese Ansicht hilft dir, die drei großen Bereiche des Fußes räumlich zu verstehen.',
    image: IMG.footDorsal,
    legend: [
      ['Fußwurzel', 'Ossa tarsi'],
      ['Mittelfuß', 'Ossa metatarsi'],
      ['Zehen', 'Phalanges pedis'],
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
    <div>
      <div className="mb-3 rounded-2xl bg-teal-50 px-4 py-3 text-sm font-bold text-teal-900">
        Deutsch zuerst lesen → dann den lateinischen Fachbegriff mitsprechen.
      </div>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
        {rows.map(([de, latin, original]) => (
          <div key={`${de}-${latin}-${original ?? ''}`} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <div className="text-base font-black text-slate-950">{de}</div>
                <div className="mt-0.5 text-sm italic text-slate-500">{latin}</div>
                {original ? (
                  <div className="mt-1 text-xs text-slate-400">Im Bild: {original}</div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PanelCard({ panel }: { panel: Panel }) {
  return (
    <article className="overflow-hidden rounded-[30px] border border-slate-100 bg-white shadow-xl">
      <div className="p-6 sm:p-8">
        <h3 className="text-2xl font-black text-slate-900">{panel.title}</h3>
        <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">{panel.subtitle}</p>
        {panel.tip ? (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-900">
            Lerntipp: {panel.tip}
          </div>
        ) : null}
      </div>

      <div className="grid gap-5 px-5 pb-6 sm:px-8 sm:pb-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,.65fr)]">
        <div className="grid min-h-[440px] place-items-center overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 sm:p-6">
          <img
            src={panel.image}
            alt={panel.title}
            loading="lazy"
            className={`max-h-[780px] max-w-full object-contain ${panel.imageClassName ?? ''}`}
          />
        </div>
        <Legend rows={panel.legend} />
      </div>

      <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-400 sm:px-8">
        Bildquelle: <a href={panel.sourceUrl} target="_blank" rel="noreferrer" className="underline">{panel.sourceLabel}</a>
      </div>
    </article>
  );
}

export function SkeletonPageV6({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_8%_0%,_#fef3c7_0,_#f8fafc_30%,_#dbeafe_100%)] text-slate-900">
      <main className="mx-auto max-w-[1320px] px-4 pt-10 pb-24 sm:px-6">
        <button onClick={onBack} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm">
          <ArrowLeft className="h-4 w-4" /> Zurück zu den Lernfeldern
        </button>

        <section className="mt-7 rounded-[34px] bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-8 text-white shadow-2xl sm:p-11">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-300/15 px-4 py-2 text-xs font-black uppercase tracking-[.16em]">
              <Languages className="h-4 w-4" /> Deutsch zuerst
            </div>
            <h1 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">
              Jeden Knochen zuerst auf Deutsch lernen
              <span className="block text-amber-300">und danach den lateinischen Fachbegriff.</span>
            </h1>
            <p className="mt-5 max-w-4xl text-slate-300 leading-7 sm:text-lg">
              Auch wenn eine Originalgrafik englische oder lateinische Beschriftungen enthält, steht direkt daneben immer mindestens einmal der deutsche Begriff. So kannst du zuerst sicher verstehen, welcher Knochen gemeint ist, und danach den medizinischen Fachbegriff lernen.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-4"><strong>1.</strong> Deutschen Namen lesen</div>
              <div className="rounded-2xl bg-white/10 p-4"><strong>2.</strong> Knochen im Bild suchen</div>
              <div className="rounded-2xl bg-white/10 p-4"><strong>3.</strong> Lateinischen Namen mitsprechen</div>
            </div>
          </div>
        </section>

        <section className="mt-9 grid gap-6 lg:grid-cols-2">
          <article className="overflow-hidden rounded-[30px] bg-white shadow-xl">
            <div className="p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-teal-700">
                <BookOpen className="h-4 w-4" /> Vorderseite
              </div>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">Skelett – deutsch beschriftet</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Hier kannst du dich zuerst mit den deutschen Grundbegriffen orientieren.</p>
            </div>
            <div className="p-5 pt-0 sm:p-8 sm:pt-0">
              <img src={IMG.fullFrontDe} alt="Menschliches Skelett Vorderseite deutsch beschriftet" className="h-auto w-full rounded-2xl border border-slate-200 bg-white" />
            </div>
          </article>

          <article className="overflow-hidden rounded-[30px] bg-white shadow-xl">
            <div className="p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-teal-700">
                <BookOpen className="h-4 w-4" /> Rückseite
              </div>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">Rückseite – Deutsch direkt daneben</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">Die Originalgrafik ist englisch. Die Übersetzung daneben zeigt dir jeden wichtigen Begriff zuerst auf Deutsch.</p>
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
          <h2 className="mt-2 text-3xl font-black">Region für Region lernen</h2>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">
            Die Bilder bleiben anatomische Originalgrafiken. Die Lernlisten daneben sind jetzt konsequent deutsch zuerst aufgebaut. Englische Begriffe werden nur noch klein als Hilfe angezeigt, wenn sie im Originalbild stehen.
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

        <section className="mt-11 rounded-[30px] border border-teal-200 bg-teal-50 p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.16em] text-teal-800">
            <Bone className="h-4 w-4" /> Merksatz für die Seite
          </div>
          <p className="mt-3 text-base font-bold leading-7 text-teal-950">
            Deutsch verstehen → Knochen im Bild finden → Latein lernen. Die englischen Wörter in einzelnen Originalbildern sind nur Orientierung und kein Lernziel.
          </p>
        </section>
      </main>
    </div>
  );
}
