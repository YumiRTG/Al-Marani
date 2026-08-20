import { useState } from 'react';
import { ArrowLeft, Bone, Eye, EyeOff, Film, GraduationCap, MapPinned, RotateCcw } from 'lucide-react';

type Mode='labeled'|'clean'|'numbered'; type Side='front'|'back';
interface Props{onBack:()=>void}

const I={
  frontLabeled:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Human_skeleton_front_de.svg',
  front:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Human_skeleton_front_no-text_no_color.svg',
  back:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Human_skeleton_back_no-text_no_color.svg',
  numbered:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Human_skeleton_front_numbered.svg',
};

const regions=[
 ['Hirnschädel',I.front,3.25,'50% 5%',['Stirnbein · Os frontale','Scheitelbein · Os parietale','Schläfenbein · Os temporale','Hinterhauptbein · Os occipitale','Keilbein · Os sphenoidale','Siebbein · Os ethmoidale']],
 ['Gesichtsschädel',I.front,3.55,'50% 10%',['Oberkiefer · Maxilla','Unterkiefer · Mandibula','Jochbein · Os zygomaticum','Nasenbein · Os nasale','Tränenbein · Os lacrimale','Gaumenbein · Os palatinum','Untere Nasenmuschel · Concha nasalis inferior','Pflugscharbein · Vomer']],
 ['Halswirbelsäule',I.front,3.35,'50% 18%',['Atlas · C1','Axis · C2','Halswirbel C1–C7 · Vertebrae cervicales']],
 ['Brustkorb',I.front,2.05,'50% 33%',['Brustbein · Sternum','Rippen · Costae','Brustwirbel · Vertebrae thoracicae']],
 ['Wirbelsäule von hinten',I.back,1.92,'50% 42%',['Halswirbel · Vertebrae cervicales','Brustwirbel · Vertebrae thoracicae','Lendenwirbel · Vertebrae lumbales','Kreuzbein · Os sacrum','Steißbein · Os coccygis']],
 ['Schultergürtel',I.front,2.3,'50% 27%',['Schlüsselbein · Clavicula','Schulterblatt · Scapula']],
 ['Oberarm',I.front,2.75,'15% 37%',['Oberarmknochen · Humerus']],
 ['Unterarm',I.front,2.8,'13% 50%',['Speiche · Radius','Elle · Ulna']],
 ['Handwurzel',I.front,3.45,'10% 61%',['Kahnbein · Os scaphoideum','Mondbein · Os lunatum','Dreiecksbein · Os triquetrum','Erbsenbein · Os pisiforme','Großes Vieleckbein · Os trapezium','Kleines Vieleckbein · Os trapezoideum','Kopfbein · Os capitatum','Hakenbein · Os hamatum']],
 ['Mittelhand und Finger',I.front,3.1,'10% 64%',['Mittelhandknochen I–V · Ossa metacarpi','Grundphalangen · Phalanges proximales','Mittelphalangen · Phalanges mediae','Endphalangen · Phalanges distales']],
 ['Becken',I.front,2.35,'50% 56%',['Hüftbein · Os coxae','Darmbein · Os ilium','Sitzbein · Os ischii','Schambein · Os pubis','Kreuzbein · Os sacrum']],
 ['Oberschenkel',I.front,2.15,'50% 68%',['Oberschenkelknochen · Femur']],
 ['Knie',I.front,3.15,'50% 77%',['Kniescheibe · Patella','Femur','Tibia']],
 ['Unterschenkel',I.front,2.35,'50% 87%',['Schienbein · Tibia','Wadenbein · Fibula']],
 ['Fußwurzel',I.front,3.4,'50% 96%',['Sprungbein · Talus','Fersenbein · Calcaneus','Kahnbein · Os naviculare','Würfelbein · Os cuboideum','Mediales Keilbein · Os cuneiforme mediale','Mittleres Keilbein · Os cuneiforme intermedium','Laterales Keilbein · Os cuneiforme laterale']],
 ['Mittelfuß',I.front,3.2,'50% 98%',['Mittelfußknochen I–V · Ossa metatarsi']],
 ['Zehen',I.front,3.65,'50% 99%',['Grundphalangen · Phalanges proximales','Mittelphalangen · Phalanges mediae','Endphalangen · Phalanges distales']],
 ['Ferse und hinterer Fuß',I.back,3.3,'50% 98%',['Fersenbein · Calcaneus','Fußwurzelknochen · Ossa tarsi']],
] as const;

const groups=[
 ['Hirnschädel – 8',[['Stirnbein','Os frontale','1'],['Scheitelbein','Os parietale','2'],['Schläfenbein','Os temporale','2'],['Hinterhauptbein','Os occipitale','1'],['Keilbein','Os sphenoidale','1'],['Siebbein','Os ethmoidale','1']]],
 ['Gesichtsschädel – 14',[['Oberkiefer','Maxilla','2'],['Unterkiefer','Mandibula','1'],['Jochbein','Os zygomaticum','2'],['Nasenbein','Os nasale','2'],['Tränenbein','Os lacrimale','2'],['Gaumenbein','Os palatinum','2'],['Untere Nasenmuschel','Concha nasalis inferior','2'],['Pflugscharbein','Vomer','1']]],
 ['Gehörknöchelchen + Zungenbein – 7',[['Hammer','Malleus','2'],['Amboss','Incus','2'],['Steigbügel','Stapes','2'],['Zungenbein','Os hyoideum','1']]],
 ['Wirbelsäule – 26',[['Halswirbel C1–C7','Vertebrae cervicales','7'],['Atlas','C1','1 von 7'],['Axis','C2','1 von 7'],['Brustwirbel T1–T12','Vertebrae thoracicae','12'],['Lendenwirbel L1–L5','Vertebrae lumbales','5'],['Kreuzbein','Os sacrum','1'],['Steißbein','Os coccygis','1']]],
 ['Brustkorb – 25',[['Brustbein','Sternum','1'],['Rippen rechts 1–12','Costae dextrae','12'],['Rippen links 1–12','Costae sinistrae','12']]],
 ['Schultergürtel – 4',[['Schlüsselbein','Clavicula','2'],['Schulterblatt','Scapula','2']]],
 ['Arme und Hände – 60',[['Oberarmknochen','Humerus','2'],['Speiche','Radius','2'],['Elle','Ulna','2'],['Handwurzelknochen','Ossa carpi','16'],['Mittelhandknochen I–V','Ossa metacarpi','10'],['Grundphalangen','Phalanges proximales manus','10'],['Mittelphalangen','Phalanges mediae manus','8'],['Endphalangen','Phalanges distales manus','10']]],
 ['Handwurzel – 8 pro Hand',[['Kahnbein','Os scaphoideum','2 gesamt'],['Mondbein','Os lunatum','2'],['Dreiecksbein','Os triquetrum','2'],['Erbsenbein','Os pisiforme','2'],['Großes Vieleckbein','Os trapezium','2'],['Kleines Vieleckbein','Os trapezoideum','2'],['Kopfbein','Os capitatum','2'],['Hakenbein','Os hamatum','2']]],
 ['Beckengürtel – 2 Hüftbeine',[['Hüftbein','Os coxae','2'],['Darmbein','Os ilium','Anteil'],['Sitzbein','Os ischii','Anteil'],['Schambein','Os pubis','Anteil']]],
 ['Beine und Füße – 60',[['Oberschenkelknochen','Femur','2'],['Kniescheibe','Patella','2'],['Schienbein','Tibia','2'],['Wadenbein','Fibula','2'],['Fußwurzelknochen','Ossa tarsi','14'],['Mittelfußknochen I–V','Ossa metatarsi','10'],['Grundphalangen','Phalanges proximales pedis','10'],['Mittelphalangen','Phalanges mediae pedis','8'],['Endphalangen','Phalanges distales pedis','10']]],
 ['Fußwurzel – 7 pro Fuß',[['Sprungbein','Talus','2 gesamt'],['Fersenbein','Calcaneus','2'],['Kahnbein des Fußes','Os naviculare','2'],['Würfelbein','Os cuboideum','2'],['Mediales Keilbein','Os cuneiforme mediale','2'],['Mittleres Keilbein','Os cuneiforme intermedium','2'],['Laterales Keilbein','Os cuneiforme laterale','2']]],
] as const;

const resources=[
 ['Studyflix – Skelett (Mensch)','Deutschsprachiges Erklärvideo zum menschlichen Skelett.','https://studyflix.de/biologie/skelett-mensch-3262/video'],
 ['Studyflix – Knochen','Deutschsprachiges Video zu Aufbau, Arten und Funktion von Knochen.','https://studyflix.de/biologie/knochen-3279/video'],
 ['Aufbau des Muskel-Skelettsystems','Weiterer deutschsprachiger Überblick.','https://www.arbeitsschutzfilm.de/mediathek/aufbau-des-muskel-skelettsystems-video_689346a4d.html'],
] as const;

export function SkeletonPage({onBack}:Props){
 const[side,setSide]=useState<Side>('front'); const[mode,setMode]=useState<Mode>('labeled');
 const main=side==='back'?I.back:mode==='labeled'?I.frontLabeled:mode==='numbered'?I.numbered:I.front;
 return <div className="min-h-screen bg-[radial-gradient(circle_at_8%_0%,_#fef3c7_0,_#f8fafc_30%,_#dbeafe_100%)] text-slate-900"><main className="max-w-[1320px] mx-auto px-4 sm:px-6 pt-10 pb-24">
  <button onClick={onBack} className="inline-flex items-center gap-2 rounded-2xl bg-white border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm"><ArrowLeft className="w-4 h-4"/> Zurück zu den Lernfeldern</button>
  <section className="mt-7 rounded-[34px] bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white p-8 sm:p-11 shadow-2xl"><div className="max-w-5xl"><div className="inline-flex items-center gap-2 rounded-full bg-amber-300/15 px-4 py-2 text-xs font-black uppercase tracking-[.16em]"><Bone className="w-4 h-4"/> Skelett lernen</div><h1 className="mt-5 text-4xl sm:text-6xl font-black tracking-tight leading-[1.02]">Schau dir die Knochen direkt am Skelett an <span className="block text-amber-300">und lerne sie Schritt für Schritt.</span></h1><p className="mt-5 text-slate-300 leading-7 sm:text-lg">Fang oben beim Schädel an und arbeite dich über Wirbelsäule und Brustkorb zu Arm, Hand, Becken, Bein und Fuß. Zu jeder wichtigen Region findest du ein eigenes Bild und die deutschen und lateinischen Namen.</p><div className="mt-6 flex flex-wrap gap-2"><span className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold">206 Knochen</span><span className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold">18 Regionsbilder</span><span className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold">Deutsch + Latein</span><span className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold">ohne Quiz</span></div></div></section>

  <section className="mt-9 rounded-[30px] bg-white shadow-xl p-6 sm:p-8"><h2 className="text-2xl sm:text-3xl font-black">So kannst du lernen</h2><div className="mt-4 grid md:grid-cols-3 gap-3 text-sm leading-6"><div className="rounded-2xl bg-amber-50 p-4">Erst <strong>mit Namen</strong> ansehen und die Begriffe laut mitsprechen.</div><div className="rounded-2xl bg-teal-50 p-4">Dann <strong>ohne Namen</strong> ansehen und selbst benennen.</div><div className="rounded-2xl bg-sky-50 p-4">Zum Schluss <strong>mit Nummern</strong> kontrollieren.</div></div></section>

  <section className="mt-9 rounded-[32px] bg-white shadow-xl overflow-hidden"><div className="p-6 sm:p-8 border-b border-slate-100"><h2 className="text-2xl sm:text-3xl font-black">Das ganze Skelett</h2></div><div className="p-5 grid lg:grid-cols-[230px_1fr] gap-5"><aside className="space-y-3"><div className="grid grid-cols-2 lg:grid-cols-1 gap-2"><button onClick={()=>setSide('front')} className={`rounded-xl p-3 font-bold ${side==='front'?'bg-teal-600 text-white':'bg-slate-50'}`}>Vorne</button><button onClick={()=>setSide('back')} className={`rounded-xl p-3 font-bold ${side==='back'?'bg-teal-600 text-white':'bg-slate-50'}`}>Hinten</button></div><button onClick={()=>setMode('labeled')} className={`w-full flex gap-2 rounded-xl p-3 font-bold ${mode==='labeled'?'bg-amber-500 text-white':'bg-slate-50'}`}><Eye className="w-4 h-4"/> Mit Namen</button><button onClick={()=>setMode('clean')} className={`w-full flex gap-2 rounded-xl p-3 font-bold ${mode==='clean'?'bg-sky-600 text-white':'bg-slate-50'}`}><EyeOff className="w-4 h-4"/> Ohne Namen</button><button onClick={()=>{setSide('front');setMode('numbered')}} className={`w-full flex gap-2 rounded-xl p-3 font-bold ${mode==='numbered'?'bg-violet-600 text-white':'bg-slate-50'}`}><GraduationCap className="w-4 h-4"/> Mit Nummern</button><button onClick={()=>{setSide('front');setMode('labeled')}} className="w-full flex gap-2 rounded-xl p-3 font-bold bg-slate-50"><RotateCcw className="w-4 h-4"/> Zurücksetzen</button></aside><div className="rounded-2xl border border-slate-200 overflow-hidden"><img src={main} alt="Skelett" className="w-full h-auto"/></div></div></section>

  <section className="mt-11"><div className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] font-black text-sky-700"><MapPinned className="w-4 h-4"/> Regionen</div><h2 className="text-3xl font-black mt-2">Jede Region noch einmal als eigenes Bild</h2><p className="text-sm text-slate-500 mt-2">So kannst du dich auf einen kleinen Bereich konzentrieren, statt immer das ganze Skelett gleichzeitig anzusehen.</p><div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-5">{regions.map(([title,src,scale,origin,items])=><article key={title} className="rounded-3xl bg-white shadow-lg overflow-hidden"><div className="h-[340px] overflow-hidden bg-slate-50"><img src={src} alt={title} loading="lazy" className="w-full h-full object-contain" style={{transform:`scale(${scale})`,transformOrigin:origin}}/></div><div className="p-5"><h3 className="font-black text-lg">{title}</h3><div className="mt-3 flex flex-wrap gap-2">{items.map(x=><span key={x} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold">{x}</span>)}</div></div></article>)}</div></section>

  <section className="mt-11"><div className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] font-black text-amber-700"><Bone className="w-4 h-4"/> Alle Knochen</div><h2 className="text-3xl font-black mt-2">Alle Knochen nach Regionen</h2><p className="text-sm text-slate-500 mt-2">Bei paarigen Knochen steht die Gesamtzahl für rechts und links zusammen.</p><div className="mt-6 grid gap-5">{groups.map(([title,items])=><article key={title} className="rounded-3xl bg-white shadow-lg p-6"><h3 className="text-xl font-black">{title}</h3><div className="mt-4 grid md:grid-cols-2 gap-3">{items.map(([de,la,n])=><div key={de+la} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex justify-between gap-4"><div><div className="font-black">{de}</div><div className="text-sm italic text-slate-500">{la}</div></div><span className="text-xs font-black bg-white border border-slate-200 rounded-lg px-2 py-1 h-fit">{n}</span></div>)}</div></article>)}</div><div className="mt-6 rounded-3xl bg-gradient-to-r from-teal-700 to-sky-700 text-white p-6 grid sm:grid-cols-4 gap-3 text-sm font-bold"><div>Axialskelett: 80</div><div>Schultergürtel + Arme: 64</div><div>Beckengürtel + Beine: 62</div><div>Gesamt: 206</div></div></section>

  <section className="mt-11"><div className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] font-black text-rose-700"><Film className="w-4 h-4"/> Zusatzmaterial</div><h2 className="text-3xl font-black mt-2">Deutschsprachige Videos und Erklärungen</h2><div className="mt-6 grid lg:grid-cols-3 gap-5">{resources.map(([t,d,u])=><article key={t} className="rounded-3xl bg-white shadow-lg p-6"><h3 className="font-black text-lg">{t}</h3><p className="text-sm text-slate-600 mt-2">{d}</p><a href={u} target="_blank" rel="noreferrer" className="mt-4 inline-block rounded-xl bg-teal-600 text-white px-4 py-2.5 text-sm font-bold">Öffnen</a></article>)}</div></section>
 </main></div>
}
