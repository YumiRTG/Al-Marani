import { useState } from 'react';
import { ArrowLeft, Bone, Clock3, Eye, EyeOff, Film, GalleryVerticalEnd, GraduationCap, RotateCcw, Sparkles } from 'lucide-react';

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

const plan = [
  ['00–15 Min','Gesamtüberblick','Vorder- und Rückansicht beschriftet ansehen. Zuerst die großen Regionen sicher erkennen.'],
  ['15–30 Min','Schädel','Hirnschädel und Gesichtsschädel mit deutschen und lateinischen Namen lernen.'],
  ['30–45 Min','Wirbelsäule & Thorax','C1–C7, T1–T12, L1–L5, Kreuzbein, Steißbein, Sternum und Rippen.'],
  ['45–60 Min','Schultergürtel & Arm','Clavicula, Scapula, Humerus, Radius und Ulna.'],
  ['60–75 Min','Hand','Alle acht Handwurzelknochen, Mittelhand und Finger.'],
  ['75–90 Min','Becken & Bein','Os coxae, Femur, Patella, Tibia und Fibula.'],
  ['90–105 Min','Fuß','Alle sieben Fußwurzelknochen, Mittelfuß und Zehen.'],
  ['105–120 Min','Gesamtwiederholung','Unbeschriftete und nummerierte Ansicht nutzen und alles von oben nach unten aufsagen.'],
] as const;

const regions = [
  ['Schädel vorne',img.frontClean,3.15,'50% 5%'],['Schädel hinten',img.backClean,3.0,'50% 4%'],
  ['Halswirbelsäule',img.frontClean,3.2,'50% 17%'],['Schultergürtel vorne',img.frontClean,2.15,'50% 26%'],
  ['Schulterblätter hinten',img.backClean,2.15,'50% 24%'],['Brustkorb vorne',img.frontClean,2.05,'50% 34%'],
  ['Wirbelsäule hinten',img.backClean,1.95,'50% 40%'],['Oberarm',img.frontClean,2.55,'15% 37%'],
  ['Unterarm vorne',img.frontClean,2.6,'13% 50%'],['Unterarm hinten',img.backClean,2.5,'13% 51%'],
  ['Hand vorne',img.frontClean,3.0,'10% 61%'],['Hand hinten',img.backClean,3.0,'10% 62%'],
  ['Becken vorne',img.frontClean,2.25,'50% 56%'],['Becken hinten',img.backClean,2.2,'50% 57%'],
  ['Oberschenkel',img.frontClean,2.1,'50% 68%'],['Knie',img.frontClean,3.0,'50% 77%'],
  ['Unterschenkel',img.frontClean,2.2,'50% 86%'],['Fuß vorne',img.frontClean,3.05,'50% 97%'],
  ['Fuß hinten',img.backClean,3.0,'50% 97%'],['Gesamtskelett nummeriert',img.frontNumbered,1.0,'50% 50%'],
] as const;

const videos = [
  ['Anatomy of the Skeleton','Zero To Finals','https://www.youtube.com/embed/NHECopO6L3g'],
  ['The Skeletal System','Professor Dave Explains','https://www.youtube.com/embed/f-FF7Qigd3U'],
  ['The Skeletal System: It’s ALIVE!','CrashCourse Biology','https://www.youtube.com/embed/RW46rQKWa-g'],
] as const;

const groups = [
  { title:'Hirnschädel – 8 Knochen', count:8, note:'Neurocranium – schützt das Gehirn.', items:[
    ['Stirnbein','Os frontale','1'],['Scheitelbein','Os parietale','2'],['Schläfenbein','Os temporale','2'],['Hinterhauptbein','Os occipitale','1'],['Keilbein','Os sphenoidale','1'],['Siebbein','Os ethmoidale','1'] ] },
  { title:'Gesichtsschädel – 14 Knochen', count:14, note:'Viscerocranium – formt Gesicht, Nase, Augenhöhlen und Kiefer.', items:[
    ['Oberkiefer','Maxilla','2'],['Unterkiefer','Mandibula','1'],['Jochbein','Os zygomaticum','2'],['Nasenbein','Os nasale','2'],['Tränenbein','Os lacrimale','2'],['Gaumenbein','Os palatinum','2'],['Untere Nasenmuschel','Concha nasalis inferior','2'],['Pflugscharbein','Vomer','1'] ] },
  { title:'Gehörknöchelchen – 6 Knochen', count:6, note:'Drei Knochen pro Mittelohr.', items:[
    ['Hammer','Malleus','2'],['Amboss','Incus','2'],['Steigbügel','Stapes','2'] ] },
  { title:'Zungenbein – 1 Knochen', count:1, note:'Frei aufgehängter Knochen im Halsbereich.', items:[['Zungenbein','Os hyoideum','1']] },
  { title:'Wirbelsäule – 26 Knochen beim Erwachsenen', count:26, note:'Kreuzbein und Steißbein werden jeweils als verschmolzener Knochen gezählt.', items:[
    ['Halswirbel C1–C7','Vertebrae cervicales','7'],['Atlas','C1','1 von 7'],['Axis','C2','1 von 7'],['Brustwirbel T1–T12','Vertebrae thoracicae','12'],['Lendenwirbel L1–L5','Vertebrae lumbales','5'],['Kreuzbein','Os sacrum','1'],['Steißbein','Os coccygis','1'] ] },
  { title:'Brustkorb – 25 Knochen', count:25, note:'Sternum plus zwölf Rippenpaare.', items:[
    ['Brustbein','Sternum','1'],['Rippen rechts 1–12','Costae dextrae','12'],['Rippen links 1–12','Costae sinistrae','12'] ] },
  { title:'Schultergürtel – 4 Knochen', count:4, note:'Verbindet die oberen Extremitäten mit dem Rumpf.', items:[
    ['Schlüsselbein','Clavicula','2'],['Schulterblatt','Scapula','2'] ] },
  { title:'Arme & Hände – 60 Knochen', count:60, note:'30 pro Seite.', items:[
    ['Oberarmknochen','Humerus','2'],['Speiche','Radius','2'],['Elle','Ulna','2'],['Handwurzelknochen','Ossa carpi','16'],['Mittelhandknochen I–V','Ossa metacarpi','10'],['Fingerknochen','Phalanges manus','28'] ] },
  { title:'Handwurzel – 8 pro Hand', count:0, note:'Diese 16 Knochen sind bereits in den 60 Knochen von Armen und Händen enthalten.', items:[
    ['Kahnbein','Os scaphoideum','2'],['Mondbein','Os lunatum','2'],['Dreiecksbein','Os triquetrum','2'],['Erbsenbein','Os pisiforme','2'],['Großes Vieleckbein','Os trapezium','2'],['Kleines Vieleckbein','Os trapezoideum','2'],['Kopfbein','Os capitatum','2'],['Hakenbein','Os hamatum','2'] ] },
  { title:'Beckengürtel – 2 Knochen', count:2, note:'Jedes Os coxae entsteht aus Darmbein, Sitzbein und Schambein.', items:[
    ['Hüftbein rechts/links','Os coxae','2'],['Darmbein','Os ilium','Anteil'],['Sitzbein','Os ischii','Anteil'],['Schambein','Os pubis','Anteil'] ] },
  { title:'Beine & Füße – 60 Knochen', count:60, note:'30 pro Seite.', items:[
    ['Oberschenkelknochen','Femur','2'],['Kniescheibe','Patella','2'],['Schienbein','Tibia','2'],['Wadenbein','Fibula','2'],['Fußwurzelknochen','Ossa tarsi','14'],['Mittelfußknochen I–V','Ossa metatarsi','10'],['Zehenknochen','Phalanges pedis','28'] ] },
  { title:'Fußwurzel – 7 pro Fuß', count:0, note:'Diese 14 Knochen sind bereits in den 60 Knochen von Beinen und Füßen enthalten.', items:[
    ['Sprungbein','Talus','2'],['Fersenbein','Calcaneus','2'],['Kahnbein des Fußes','Os naviculare','2'],['Würfelbein','Os cuboideum','2'],['Mediales Keilbein','Os cuneiforme mediale','2'],['Mittleres Keilbein','Os cuneiforme intermedium','2'],['Laterales Keilbein','Os cuneiforme laterale','2'] ] },
] as const;

function source(side: Side, mode: Mode) {
  if (side === 'front') return mode === 'labeled' ? img.frontLabeled : mode === 'numbered' ? img.frontNumbered : img.frontClean;
  return mode === 'labeled' ? img.backLabeled : img.backClean;
}

export function SkeletonPage({ onBack }: Props) {
  const [side,setSide] = useState<Side>('front');
  const [mode,setMode] = useState<Mode>('labeled');
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_8%_0%,_#fef3c7_0,_#f8fafc_30%,_#f8fafc_70%,_#dbeafe_100%)] text-slate-900">
      <main className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-10 pb-24">
        <button onClick={onBack} className="inline-flex items-center gap-2 rounded-2xl bg-white border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm"><ArrowLeft className="w-4 h-4"/> Zurück zu den Lernfeldern</button>

        <section className="mt-7 rounded-[34px] bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white p-8 sm:p-11 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-amber-300/10 blur-3xl"/>
          <div className="relative max-w-5xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-300/15 border border-amber-200/20 text-amber-100 px-4 py-2 text-xs font-black uppercase tracking-[.16em]"><Bone className="w-4 h-4"/> Extra-Tab Skelett</div>
            <h1 className="mt-5 text-4xl sm:text-6xl font-black tracking-tight leading-[1.02]">Das menschliche Skelett <span className="block text-amber-300">2 Stunden intensiv lernen.</span></h1>
            <p className="mt-5 text-slate-300 leading-7 sm:text-lg max-w-4xl">Keine Quizfragen: beschriftete, unbeschriftete und nummerierte Ansichten, viele Vergrößerungen, drei Lernvideos und die vollständige 206-Knochen-Zählung des erwachsenen Skeletts.</p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm font-bold"><span className="rounded-xl bg-white/10 px-4 py-2">206 Knochen</span><span className="rounded-xl bg-white/10 px-4 py-2">Deutsch + Latein</span><span className="rounded-xl bg-white/10 px-4 py-2">20 Bildansichten</span><span className="rounded-xl bg-white/10 px-4 py-2">3 Videos</span></div>
          </div>
        </section>

        <section className="mt-9 grid lg:grid-cols-2 gap-6">
          <article className="rounded-[32px] bg-white shadow-xl p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] font-black text-teal-700"><Clock3 className="w-4 h-4"/> 2-Stunden-Plan</div>
            <h2 className="text-2xl sm:text-3xl font-black mt-2">Lernroute</h2>
            <div className="mt-5 grid gap-3">{plan.map(([time,title,text]) => <div key={time} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="text-xs font-black text-amber-700">{time}</div><div className="font-black mt-1">{title}</div><div className="text-sm text-slate-600 mt-1 leading-6">{text}</div></div>)}</div>
          </article>
          <article className="rounded-[32px] bg-white shadow-xl p-6 sm:p-8">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] font-black text-sky-700"><Sparkles className="w-4 h-4"/> Lerntechnik</div>
            <h2 className="text-2xl sm:text-3xl font-black mt-2">Beschriftet → ohne Namen → nummeriert</h2>
            <div className="mt-5 space-y-4 text-sm text-slate-600 leading-6"><div className="rounded-2xl bg-amber-50 p-4">Jeden Knochen laut nennen: zuerst deutsch, dann lateinisch, dann nochmals deutsch.</div><div className="rounded-2xl bg-teal-50 p-4">Hand- und Fußwurzel separat lernen, weil dort besonders viele kleine Knochen dicht beieinander liegen.</div><div className="rounded-2xl bg-sky-50 p-4">Immer von oben nach unten lernen: Schädel → Rumpf → Arm/Hand → Becken → Bein/Fuß.</div></div>
          </article>
        </section>

        <section className="mt-9 rounded-[32px] bg-white shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-100"><h2 className="text-2xl sm:text-3xl font-black">Hauptansicht direkt am Skelett</h2></div>
          <div className="p-4 sm:p-7 grid lg:grid-cols-[250px_1fr] gap-5">
            <aside className="space-y-4">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3"><div className="text-[10px] uppercase font-black text-slate-400 px-2 pb-2">Ansicht</div><div className="grid gap-2"><button onClick={() => setSide('front')} className={`rounded-xl px-3 py-2.5 text-sm font-bold ${side==='front'?'bg-teal-600 text-white':'bg-white text-slate-600'}`}>Vorne</button><button onClick={() => {setSide('back'); if(mode==='numbered') setMode('clean')}} className={`rounded-xl px-3 py-2.5 text-sm font-bold ${side==='back'?'bg-teal-600 text-white':'bg-white text-slate-600'}`}>Hinten</button></div></div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3 space-y-2"><button onClick={() => setMode('labeled')} className={`w-full inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold ${mode==='labeled'?'bg-amber-500 text-white':'bg-white text-slate-600'}`}><Eye className="w-4 h-4"/> Beschriftet</button><button onClick={() => setMode('clean')} className={`w-full inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold ${mode==='clean'?'bg-sky-600 text-white':'bg-white text-slate-600'}`}><EyeOff className="w-4 h-4"/> Ohne Namen</button><button onClick={() => {setSide('front');setMode('numbered')}} className={`w-full inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold ${mode==='numbered'?'bg-violet-600 text-white':'bg-white text-slate-600'}`}><GraduationCap className="w-4 h-4"/> Nummeriert</button><button onClick={() => {setSide('front');setMode('labeled')}} className="w-full inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold bg-white text-slate-600 border border-slate-200"><RotateCcw className="w-4 h-4"/> Zurücksetzen</button></div>
            </aside>
            <div className="rounded-[28px] border border-slate-200 bg-white overflow-hidden min-h-[500px] grid place-items-center"><img src={source(side,mode)} alt="Menschliches Skelett" className="w-full h-auto object-contain"/></div>
          </div>
        </section>

        <section className="mt-11"><div className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] font-black text-sky-700"><GalleryVerticalEnd className="w-4 h-4"/> Detailbilder</div><h2 className="text-2xl sm:text-3xl font-black mt-2">20 Ansichten und Vergrößerungen</h2><div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">{regions.map(([title,src,scale,origin]) => <article key={title} className="rounded-3xl bg-white overflow-hidden shadow-lg"><div className="h-[310px] overflow-hidden bg-slate-50 grid place-items-center"><img src={src} alt={title} loading="lazy" className="w-full h-full object-contain" style={{transform:`scale(${scale})`,transformOrigin:origin}}/></div><div className="p-4 font-black text-sm">{title}</div></article>)}</div></section>

        <section className="mt-11"><div className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] font-black text-rose-700"><Film className="w-4 h-4"/> Videos</div><h2 className="text-2xl sm:text-3xl font-black mt-2">Zusätzliche Lernvideos</h2><div className="mt-6 grid lg:grid-cols-3 gap-5">{videos.map(([title,provider,src]) => <article key={title} className="rounded-3xl bg-white overflow-hidden shadow-lg"><div className="aspect-video"><iframe src={src} title={title} className="w-full h-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/></div><div className="p-5"><div className="font-black">{title}</div><div className="text-sm text-slate-500 mt-1">{provider}</div></div></article>)}</div></section>

        <section className="mt-11"><div className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] font-black text-amber-700"><Bone className="w-4 h-4"/> 206-Knochen-Zählung</div><h2 className="text-2xl sm:text-3xl font-black mt-2">So entstehen die 206 Knochen</h2><div className="mt-5 rounded-3xl overflow-hidden bg-white shadow-lg"><div className="grid sm:grid-cols-[220px_90px_1fr] gap-3 p-5 border-b border-slate-100"><b>Axialskelett</b><b className="text-2xl text-teal-700">80</b><span className="text-sm text-slate-500">Schädel 22 + Gehörknöchelchen 6 + Zungenbein 1 + Wirbelsäule 26 + Brustkorb 25</span></div><div className="grid sm:grid-cols-[220px_90px_1fr] gap-3 p-5 border-b border-slate-100"><b>Appendikuläres Skelett</b><b className="text-2xl text-teal-700">126</b><span className="text-sm text-slate-500">Schultergürtel 4 + Arme/Hände 60 + Beckengürtel 2 + Beine/Füße 60</span></div><div className="grid sm:grid-cols-[220px_90px_1fr] gap-3 p-5"><b>Gesamt</b><b className="text-3xl text-amber-600">206</b><span className="text-sm text-slate-500">Typische Zählung des erwachsenen menschlichen Skeletts</span></div></div></section>

        <section className="mt-11"><div className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] font-black text-violet-700"><Bone className="w-4 h-4"/> Knochenatlas</div><h2 className="text-2xl sm:text-3xl font-black mt-2">Alle Knochen nach Regionen</h2><p className="text-sm text-slate-500 mt-2">Hand- und Fußwurzel sind zusätzlich einzeln ausgeschrieben, werden aber nicht doppelt zur 206er-Summe addiert.</p><div className="mt-6 grid gap-6">{groups.map(group => <article key={group.title} className="rounded-[28px] bg-white shadow-lg p-6 sm:p-7"><div className="flex flex-wrap justify-between gap-3"><div><div className="text-xl sm:text-2xl font-black">{group.title}</div><div className="text-sm text-slate-500 mt-2">{group.note}</div></div>{group.count>0&&<div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-2 text-sm font-black text-amber-800">{group.count} Knochen</div>}</div><div className="mt-5 grid md:grid-cols-2 gap-3">{group.items.map(([de,la,count]) => <div key={`${de}-${la}`} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"><div className="flex justify-between gap-3"><div><div className="font-black">{de}</div><div className="text-sm text-slate-500 italic mt-1">{la}</div></div><span className="shrink-0 rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-xs font-black text-slate-500 h-fit">{count}</span></div></div>)}</div></article>)}</div></section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 text-xs leading-5 text-slate-500">Bildquellen: Wikimedia Commons. Human-skeleton-Grafiken von Mariana Ruiz Villarreal (LadyofHats); deutsche Übersetzung der beschrifteten Vorderansicht auf Commons. Die gemeinfreien bzw. frei lizenzierten Originale werden direkt eingebunden.</section>
      </main>
    </div>
  );
}
