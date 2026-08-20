import { useState } from 'react';
import { ArrowLeft, Bone, BookOpen, Eye, EyeOff, GraduationCap, Images, RotateCcw, Sparkles } from 'lucide-react';

type Mode = 'labeled' | 'clean' | 'numbered';
type Side = 'front' | 'back';
interface Props { onBack: () => void; }

const img = {
  frontLabeled: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Human_skeleton_front_de.svg',
  backLabeled: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Human_skeleton_back_en.svg',
  frontClean: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Human_skeleton_front_no-text_no-color.svg',
  backClean: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Human_skeleton_back_no-text_no-color.svg',
  frontNumbered: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Human_skeleton_front_numbered.svg',
};

const regions = [
  ['Schädel & Hals', img.frontClean, 2.6, '50% 7%'],
  ['Schulter & Brustkorb', img.frontClean, 2.2, '50% 30%'],
  ['Wirbelsäule', img.backClean, 2.2, '50% 39%'],
  ['Becken', img.frontClean, 2.4, '50% 56%'],
  ['Arm & Hand', img.frontClean, 2.1, '18% 46%'],
  ['Knie & Unterschenkel', img.frontClean, 2.2, '50% 80%'],
  ['Fuß', img.frontClean, 2.9, '50% 97%'],
  ['Schulterblatt von hinten', img.backClean, 2.3, '50% 26%'],
] as const;

const groups = [
  {
    title: 'Schädel',
    items: [['Stirnbein','Os frontale'],['Scheitelbein','Os parietale'],['Schläfenbein','Os temporale'],['Hinterhauptbein','Os occipitale'],['Jochbein','Os zygomaticum'],['Nasenbein','Os nasale'],['Oberkiefer','Maxilla'],['Unterkiefer','Mandibula']],
    note: 'Schützt das Gehirn; der Unterkiefer ist der bewegliche Knochen des Gesichtsschädels.'
  },
  {
    title: 'Wirbelsäule & Thorax',
    items: [['7 Halswirbel','Vertebrae cervicales'],['12 Brustwirbel','Vertebrae thoracicae'],['5 Lendenwirbel','Vertebrae lumbales'],['Kreuzbein','Os sacrum'],['Steißbein','Os coccygis'],['Brustbein','Sternum'],['Rippen','Costae'],['Schlüsselbein','Clavicula'],['Schulterblatt','Scapula']],
    note: 'Merkzahl der freien Wirbelsäule: 7 – 12 – 5.'
  },
  {
    title: 'Arm & Hand',
    items: [['Oberarmknochen','Humerus'],['Speiche – Daumenseite','Radius'],['Elle – Kleinfingerseite','Ulna'],['Kahnbein','Os scaphoideum'],['Mondbein','Os lunatum'],['Dreiecksbein','Os triquetrum'],['Erbsenbein','Os pisiforme'],['Großes Vieleckbein','Os trapezium'],['Kleines Vieleckbein','Os trapezoideum'],['Kopfbein','Os capitatum'],['Hakenbein','Os hamatum'],['Mittelhand','Ossa metacarpi'],['Finger','Phalanges manus']],
    note: 'Radius = Daumenseite, Ulna = Kleinfingerseite.'
  },
  {
    title: 'Becken, Bein & Fuß',
    items: [['Darmbein','Os ilium'],['Sitzbein','Os ischii'],['Schambein','Os pubis'],['Oberschenkelknochen','Femur'],['Kniescheibe','Patella'],['Schienbein','Tibia'],['Wadenbein','Fibula'],['Sprungbein','Talus'],['Fersenbein','Calcaneus'],['Kahnbein des Fußes','Os naviculare'],['Würfelbein','Os cuboideum'],['3 Keilbeine','Ossa cuneiformia'],['Mittelfuß','Ossa metatarsi'],['Zehen','Phalanges pedis']],
    note: 'Tibia trägt den Großteil der Last; Fibula liegt seitlich und ist schlanker.'
  },
];

const questions = [
  ['Größter Knochen des Körpers?', 'Femur.'],
  ['Unterarmknochen auf der Daumenseite?', 'Radius.'],
  ['Unterarmknochen auf der Kleinfingerseite?', 'Ulna.'],
  ['Wie viele Halswirbel?', '7.'],
  ['Wie viele Brustwirbel?', '12.'],
  ['Wie viele Lendenwirbel?', '5.'],
  ['Kniescheibe lateinisch?', 'Patella.'],
  ['Schienbein lateinisch?', 'Tibia.'],
  ['Wadenbein lateinisch?', 'Fibula.'],
  ['Welche drei Knochen bilden das Hüftbein?', 'Os ilium, Os ischii und Os pubis.'],
];

function source(side: Side, mode: Mode) {
  if (side === 'front') return mode === 'labeled' ? img.frontLabeled : mode === 'numbered' ? img.frontNumbered : img.frontClean;
  return mode === 'labeled' ? img.backLabeled : img.backClean;
}

export function SkeletonPage({ onBack }: Props) {
  const [side, setSide] = useState<Side>('front');
  const [mode, setMode] = useState<Mode>('labeled');
  const [open, setOpen] = useState<Record<number, boolean>>({});

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_8%_0%,_#fef3c7_0,_#f8fafc_30%,_#f8fafc_70%,_#dbeafe_100%)] text-slate-900">
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-10 pb-24">
        <button onClick={onBack} className="inline-flex items-center gap-2 rounded-2xl bg-white border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm hover:bg-teal-50"><ArrowLeft className="w-4 h-4" /> Zurück</button>

        <section className="mt-7 rounded-[34px] bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white p-8 sm:p-11 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-amber-300/10 blur-3xl" />
          <div className="relative max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-300/15 border border-amber-200/20 text-amber-100 px-4 py-2 text-xs font-black uppercase tracking-[.16em]"><Bone className="w-4 h-4" /> Extra-Tab Skelett</div>
            <h1 className="mt-5 text-4xl sm:text-6xl font-black tracking-tight leading-[1.02]">Das menschliche Skelett <span className="block text-amber-300">direkt am Körper lernen.</span></h1>
            <p className="mt-5 text-slate-300 leading-7 sm:text-lg">Beschriftete Vorder- und Rückansicht, unbeschriftete Lernansicht, Nummernmodus, viele vergrößerte Körperregionen, deutsche und lateinische Knochennamen sowie aktive Wiederholungsfragen.</p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold"><span className="rounded-xl bg-white/10 px-4 py-2">ca. 206 Knochen</span><span className="rounded-xl bg-white/10 px-4 py-2">Deutsch + Latein</span><span className="rounded-xl bg-white/10 px-4 py-2">MFA-Prüfungsfokus</span></div>
          </div>
        </section>

        <section className="mt-9 rounded-[32px] bg-white border border-white shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-100">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] font-black text-teal-700"><Sparkles className="w-4 h-4" /> Hauptlernansicht</div>
            <h2 className="text-2xl sm:text-3xl font-black mt-2">Erst ansehen – dann Namen ausblenden</h2>
            <p className="text-sm text-slate-500 mt-2">Vorne ist die beschriftete Ansicht auf Deutsch. Die Rückansicht nutzt die anatomisch beschriftete Originalgrafik; darunter lernst du die deutschen und lateinischen Begriffe systematisch.</p>
          </div>
          <div className="p-4 sm:p-7 grid lg:grid-cols-[230px_1fr] gap-5">
            <aside className="space-y-4">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3">
                <div className="text-[10px] uppercase tracking-[.15em] font-black text-slate-400 px-2 pb-2">Ansicht</div>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2"><button onClick={() => setSide('front')} className={`rounded-xl px-3 py-2.5 text-sm font-bold ${side === 'front' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600'}`}>Vorne</button><button onClick={() => { setSide('back'); if (mode === 'numbered') setMode('clean'); }} className={`rounded-xl px-3 py-2.5 text-sm font-bold ${side === 'back' ? 'bg-teal-600 text-white' : 'bg-white text-slate-600'}`}>Hinten</button></div>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 space-y-2">
                <div className="text-[10px] uppercase tracking-[.15em] font-black text-slate-400 px-2 pb-1">Lernmodus</div>
                <button onClick={() => setMode('labeled')} className={`w-full inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold ${mode === 'labeled' ? 'bg-amber-500 text-white' : 'bg-white text-slate-600'}`}><Eye className="w-4 h-4" /> Beschriftet</button>
                <button onClick={() => setMode('clean')} className={`w-full inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold ${mode === 'clean' ? 'bg-sky-600 text-white' : 'bg-white text-slate-600'}`}><EyeOff className="w-4 h-4" /> Ohne Namen</button>
                <button onClick={() => { setSide('front'); setMode('numbered'); }} className={`w-full inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold ${mode === 'numbered' ? 'bg-violet-600 text-white' : 'bg-white text-slate-600'}`}><GraduationCap className="w-4 h-4" /> Nummeriert (vorne)</button>
              </div>
              <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4 text-sm leading-6 text-teal-900"><strong>Lernmethode:</strong> 60 Sekunden beschriftet ansehen → Namen ausblenden → Knochen laut nennen → nummerierte Ansicht kontrollieren.</div>
            </aside>
            <div className="rounded-[28px] border border-slate-200 bg-white overflow-hidden min-h-[500px] grid place-items-center"><img src={source(side, mode)} alt="Menschliches Skelett" className="w-full h-auto object-contain" /></div>
          </div>
        </section>

        <section className="mt-11">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] font-black text-sky-700"><Images className="w-4 h-4" /> Detailgalerie</div>
          <h2 className="text-2xl sm:text-3xl font-black mt-2">Körperregionen stark vergrößert</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {regions.map(([title, src, scale, origin]) => <article key={title} className="rounded-3xl bg-white border border-white overflow-hidden shadow-lg"><div className="h-[270px] overflow-hidden bg-slate-50 grid place-items-center"><img src={src} alt={title} loading="lazy" className="w-full h-full object-contain" style={{ transform: `scale(${scale})`, transformOrigin: origin }} /></div><div className="p-4 font-black text-sm">{title}</div></article>)}
          </div>
        </section>

        <section className="mt-11">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] font-black text-amber-700"><BookOpen className="w-4 h-4" /> Knochenlexikon</div>
          <h2 className="text-2xl sm:text-3xl font-black mt-2">Die Knochen Schritt für Schritt</h2>
          <p className="text-sm text-slate-500 mt-2">Auch die acht Handwurzelknochen und die wichtigsten Fußwurzelknochen sind enthalten.</p>
          <div className="mt-6 grid lg:grid-cols-2 gap-5">
            {groups.map(group => <article key={group.title} className="rounded-[28px] bg-white border border-white overflow-hidden shadow-lg"><div className="bg-slate-900 text-white p-5"><h3 className="text-xl font-black">{group.title}</h3></div><div className="p-5"><div className="divide-y divide-slate-100">{group.items.map(([de,la]) => <div key={de} className="py-2.5 grid grid-cols-[1fr_auto] gap-4 text-sm"><span className="font-bold text-slate-700">{de}</span><span className="text-slate-400 text-right">{la}</span></div>)}</div><div className="mt-4 rounded-2xl bg-amber-50 border border-amber-100 p-4 text-sm text-amber-900"><strong>Merke:</strong> {group.note}</div></div></article>)}
          </div>
        </section>

        <section className="mt-11 rounded-[32px] bg-gradient-to-br from-violet-700 to-sky-700 p-6 sm:p-9 text-white shadow-xl">
          <div className="flex items-end justify-between gap-4"><div><div className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] font-black text-violet-100"><GraduationCap className="w-4 h-4" /> Aktives Abrufen</div><h2 className="text-2xl sm:text-3xl font-black mt-2">Ohne Bild antworten</h2></div><button onClick={() => setOpen({})} className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 text-xs font-black"><RotateCcw className="w-4 h-4" /> Schließen</button></div>
          <div className="mt-6 grid md:grid-cols-2 gap-3">{questions.map(([q,a],i) => <button key={q} onClick={() => setOpen(p => ({...p,[i]:!p[i]}))} className="text-left rounded-2xl bg-white/10 border border-white/15 p-4"><div className="font-extrabold text-sm">{i+1}. {q}</div><div className={`mt-2 text-sm text-violet-100 ${open[i] ? 'opacity-100' : 'opacity-0 blur-sm select-none'}`}>{a}</div></button>)}</div>
        </section>

        <section className="mt-9 rounded-[28px] bg-teal-50 border border-teal-200 p-6"><h2 className="font-black text-xl text-teal-950">MFA-Prüfungsfokus</h2><div className="mt-4 grid md:grid-cols-2 gap-3 text-sm leading-6 text-teal-950"><div className="rounded-2xl bg-white/70 p-4"><strong>Deutsch + Latein:</strong> Begriffe immer zusammen lernen.</div><div className="rounded-2xl bg-white/70 p-4"><strong>Lage:</strong> Radius/Ulna und Tibia/Fibula am Körper zeigen können.</div><div className="rounded-2xl bg-white/70 p-4"><strong>Wirbelsäule:</strong> 7 Hals-, 12 Brust-, 5 Lendenwirbel.</div><div className="rounded-2xl bg-white/70 p-4"><strong>Schutz:</strong> Schädel, Brustkorb und Wirbelsäule mit ihren Schutzfunktionen verbinden.</div></div></section>

        <p className="mt-8 text-[11px] leading-5 text-slate-400 text-center">Bildquellen: Wikimedia Commons, Skelettgrundlagen von Mariana Ruiz Villarreal (LadyofHats). Deutsche Frontansicht „Human skeleton front de.svg“: CC BY-SA 3.0; weitere verwendete Vorlagen entsprechend der jeweiligen Wikimedia-Lizenz.</p>
      </main>
    </div>
  );
}
