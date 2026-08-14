import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Bone,
  Brain,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Droplets,
  GraduationCap,
  Heart,
  HeartPulse,
  Images,
  ListChecks,
  Megaphone,
  PlayCircle,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import type { LearningModule } from '@/types';

const iconMap: Record<string, React.ReactNode> = {
  bone: <Bone className="w-6 h-6" />,
  heart: <Heart className="w-6 h-6" />,
  briefcase: <Briefcase className="w-6 h-6" />,
  megaphone: <Megaphone className="w-6 h-6" />,
  droplets: <Droplets className="w-6 h-6" />,
  stethoscope: <Stethoscope className="w-6 h-6" />,
};

const iconTone: Record<string, string> = {
  bone: 'bg-amber-100 text-amber-700',
  heart: 'bg-rose-100 text-rose-700',
  briefcase: 'bg-teal-100 text-teal-700',
  megaphone: 'bg-sky-100 text-sky-700',
  droplets: 'bg-cyan-100 text-cyan-700',
  stethoscope: 'bg-violet-100 text-violet-700',
};

const difficultyMap: Record<string, { label: string; className: string }> = {
  easy: { label: 'Grundlagen', className: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  medium: { label: 'Aufbau', className: 'bg-amber-50 text-amber-700 border-amber-100' },
  advanced: { label: 'Vertiefung', className: 'bg-rose-50 text-rose-700 border-rose-100' },
};

interface DashboardProps {
  modules: LearningModule[];
  moduleProgress: Record<string, number>;
  onOpenModule: (moduleId: string) => void;
}

export function Dashboard({ modules, moduleProgress, onOpenModule }: DashboardProps) {
  const totalProgress = modules.length
    ? modules.reduce((sum, module) => sum + (moduleProgress[module.id] || 0), 0) / modules.length
    : 0;
  const completed = modules.filter(module => (moduleProgress[module.id] || 0) >= 100).length;
  const totalVideos = modules.reduce((sum, module) => sum + module.topics.reduce((s, topic) => s + topic.content.filter(block => block.type === 'video').length, 0), 0);
  const totalImages = modules.reduce((sum, module) => sum + module.topics.reduce((s, topic) => s + topic.content.filter(block => block.type === 'image').length, 0), 0);
  const totalQuestions = modules.reduce((sum, module) => sum + module.questions.length, 0);
  const continueModule = modules.find(module => (moduleProgress[module.id] || 0) > 0 && (moduleProgress[module.id] || 0) < 100)
    || modules.find(module => (moduleProgress[module.id] || 0) < 100)
    || modules[0];
  const heroModules = modules.slice(-3).reverse();
  const firstNumber = modules[0]?.number ?? 1;
  const lastNumber = modules.at(-1)?.number ?? modules.length;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_12%_0%,_#ccfbf1_0,_#f8fafc_28%,_#f8fafc_70%,_#e0f2fe_100%)] text-slate-900 overflow-hidden">
      <header className="sticky top-0 z-50 border-b border-white/80 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
        <div className="max-w-[1220px] mx-auto h-16 px-4 sm:px-6 flex items-center gap-4">
          <motion.div whileHover={{ rotate: -7, scale: 1.05 }} className="w-10 h-10 rounded-2xl bg-gradient-to-br from-teal-600 to-sky-600 text-white grid place-items-center shadow-lg shadow-teal-600/15">
            <HeartPulse className="w-6 h-6" />
          </motion.div>
          <div className="min-w-0">
            <div className="font-black text-teal-700 leading-5">MFA Lerncampus</div>
            <div className="text-[10px] uppercase tracking-[.18em] text-slate-400">by Andre Miethke</div>
          </div>
          <div className="ml-auto hidden sm:flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-200 px-4 py-2">
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[.14em] font-bold text-slate-400">Fortschritt</div>
              <div className="text-sm font-black">{Math.round(totalProgress)}%</div>
            </div>
            <div className="w-28 h-2.5 rounded-full bg-slate-200 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${totalProgress}%` }} transition={{ duration: .8 }} className="h-full rounded-full bg-gradient-to-r from-teal-500 to-sky-500" />
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative">
          <motion.div aria-hidden className="absolute -top-20 right-[4%] w-80 h-80 rounded-full bg-teal-200/30 blur-3xl" animate={{ x: [0, 24, 0], y: [0, -14, 0] }} transition={{ duration: 11, repeat: Infinity }} />
          <motion.div aria-hidden className="absolute top-28 left-[1%] w-72 h-72 rounded-full bg-sky-200/25 blur-3xl" animate={{ x: [0, -20, 0], y: [0, 18, 0] }} transition={{ duration: 13, repeat: Infinity }} />

          <div className="relative max-w-[1220px] mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-10 grid lg:grid-cols-[1.05fr_.95fr] gap-10 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 border border-teal-200 text-teal-700 text-sm font-bold shadow-sm mb-5">
                <Sparkles className="w-4 h-4" /> Lernfeld {firstNumber} bis {lastNumber}
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .06 }} className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.03]">
                MFA-Wissen
                <span className="block bg-gradient-to-r from-teal-600 via-sky-600 to-violet-600 bg-clip-text text-transparent">Schritt für Schritt.</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 }} className="mt-5 max-w-2xl text-slate-600 text-base sm:text-lg leading-8">
                Erklärungen, Schaubilder und Lernvideos führen durch jedes Thema. Nach jedem Abschnitt folgen kurze Übungen. Danach wird der nächste Lernteil freigeschaltet.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 }} className="mt-7 flex flex-col sm:flex-row gap-3">
                {continueModule && (
                  <button onClick={() => onOpenModule(continueModule.id)} className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-sky-600 text-white font-bold text-sm shadow-xl shadow-teal-700/15 hover:-translate-y-0.5 transition-all">
                    {(moduleProgress[continueModule.id] || 0) > 0 ? `Lernfeld ${continueModule.number} fortsetzen` : `Mit Lernfeld ${continueModule.number} beginnen`}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
                <a href="#lernfelder" className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold text-sm shadow-sm hover:bg-teal-50 hover:border-teal-200 transition-colors">
                  Alle Lernfelder <BookOpen className="w-4 h-4" />
                </a>
              </motion.div>
            </div>

            <div className="relative hidden md:block h-[430px]">
              <motion.div className="absolute inset-x-14 bottom-3 h-20 rounded-[50%] bg-slate-900/10 blur-2xl" animate={{ scaleX: [1, .85, 1] }} transition={{ duration: 7, repeat: Infinity }} />
              {heroModules.map((module, index) => {
                const positions = [
                  'left-[5%] top-[6%] w-[62%] h-[52%] -rotate-6 z-10',
                  'right-[1%] top-[27%] w-[62%] h-[52%] rotate-6 z-20',
                  'left-[19%] bottom-[0%] w-[62%] h-[52%] -rotate-1 z-30',
                ];
                return (
                  <motion.button
                    key={module.id}
                    onClick={() => onOpenModule(module.id)}
                    className={`absolute ${positions[index]} overflow-hidden rounded-[30px] border-[5px] border-white shadow-[0_26px_60px_rgba(15,23,42,.2)] text-left group bg-slate-800`}
                    animate={{ y: [0, -(7 + index * 2), 0] }}
                    transition={{ duration: 5.5 + index, repeat: Infinity, delay: index * .3 }}
                    whileHover={{ scale: 1.04, rotate: 0, zIndex: 40 }}
                  >
                    <img src={module.heroImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-950/15 to-transparent" />
                    <div className="absolute left-5 right-5 bottom-5 text-white">
                      <div className="text-[10px] uppercase tracking-[.18em] font-bold text-white/70">Lernfeld {module.number}</div>
                      <div className="text-sm sm:text-base font-extrabold line-clamp-2 mt-1">{module.title}</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="max-w-[1220px] mx-auto px-4 sm:px-6 pb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: BookOpen, value: modules.length, title: 'Lernfelder', text: `LF ${firstNumber} bis ${lastNumber}`, className: 'bg-teal-100 text-teal-700' },
              { icon: PlayCircle, value: totalVideos, title: 'Lernvideos', text: 'direkt im Lernstoff', className: 'bg-rose-100 text-rose-700' },
              { icon: Images, value: totalImages, title: 'Schaubilder', text: 'übersichtlich erklärt', className: 'bg-sky-100 text-sky-700' },
              { icon: ListChecks, value: totalQuestions, title: 'Quizfragen', text: `${completed} Lernfelder abgeschlossen`, className: 'bg-amber-100 text-amber-700' },
            ].map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} whileHover={{ y: -4 }} className="rounded-3xl bg-white/85 backdrop-blur border border-white p-5 shadow-[0_12px_35px_rgba(15,23,42,.05)]">
                <div className={`w-11 h-11 rounded-2xl grid place-items-center ${item.className}`}><item.icon className="w-5 h-5" /></div>
                <div className="mt-4 text-2xl font-black">{item.value}</div>
                <div className="font-bold text-sm text-slate-700">{item.title}</div>
                <div className="text-xs text-slate-400 mt-1">{item.text}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="lernfelder" className="max-w-[1220px] mx-auto px-4 sm:px-6 pb-16 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] font-bold text-teal-700"><GraduationCap className="w-4 h-4" /> Lernfelder</div>
              <h2 className="text-2xl sm:text-3xl font-black mt-2">Alle Themen der MFA-Ausbildung</h2>
              <p className="text-sm text-slate-500 mt-2 max-w-2xl">Wähle ein Lernfeld aus. Dein Fortschritt und deine Antworten werden auf diesem Gerät gespeichert.</p>
            </div>
            <div className="rounded-2xl px-4 py-2.5 bg-white border border-slate-200 text-xs font-bold text-slate-500">{completed} / {modules.length} abgeschlossen</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {modules.map((module, index) => {
              const progress = moduleProgress[module.id] || 0;
              const done = progress >= 100;
              const difficulty = difficultyMap[module.difficulty];
              const videoCount = module.topics.reduce((sum, topic) => sum + topic.content.filter(block => block.type === 'video').length, 0);
              const imageCount = module.topics.reduce((sum, topic) => sum + topic.content.filter(block => block.type === 'image').length, 0);
              return (
                <motion.button
                  key={module.id}
                  onClick={() => onOpenModule(module.id)}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: Math.min(index * .035, .25), duration: .4 }}
                  whileHover={{ y: -7 }}
                  className="group text-left rounded-[28px] overflow-hidden bg-white border border-white shadow-[0_14px_40px_rgba(15,23,42,.07)] hover:shadow-[0_24px_58px_rgba(13,148,136,.14)] transition-shadow"
                >
                  <div className="relative h-44 bg-gradient-to-br from-slate-800 to-slate-700 overflow-hidden">
                    <img src={module.heroImage} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/88 via-slate-900/10 to-transparent" />
                    <div className={`absolute left-4 top-4 w-11 h-11 rounded-2xl grid place-items-center shadow-lg ${iconTone[module.icon] || 'bg-white text-slate-700'}`}>{iconMap[module.icon] || <BookOpen className="w-6 h-6" />}</div>
                    {done && <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-black text-emerald-600 shadow"><CheckCircle2 className="w-4 h-4" /> Fertig</div>}
                    <div className="absolute left-5 right-5 bottom-4 text-white">
                      <div className="text-[10px] uppercase tracking-[.18em] text-white/70 font-bold">Lernfeld {module.number}</div>
                      <h3 className="text-lg leading-6 font-extrabold line-clamp-2 mt-1">{module.title}</h3>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${difficulty.className}`}>{difficulty.label}</span>
                      <span className="text-xs text-slate-400">{module.topics.length} Themen</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-6 line-clamp-3 min-h-[72px]">{module.subtitle}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-rose-50 text-rose-700 px-2.5 py-1.5 text-[11px] font-bold"><PlayCircle className="w-3.5 h-3.5" /> {videoCount} Videos</span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-sky-50 text-sky-700 px-2.5 py-1.5 text-[11px] font-bold"><Images className="w-3.5 h-3.5" /> {imageCount} Bilder</span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 text-amber-700 px-2.5 py-1.5 text-[11px] font-bold"><Brain className="w-3.5 h-3.5" /> {module.questions.length} Quizfragen</span>
                    </div>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1.5"><span>Fortschritt</span><span>{Math.round(progress)}%</span></div>
                        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: `${progress}%` }} viewport={{ once: true }} className="h-full rounded-full bg-gradient-to-r from-teal-500 to-sky-500" /></div>
                      </div>
                      <div className="w-10 h-10 rounded-xl grid place-items-center bg-teal-600 text-white shadow-md group-hover:translate-x-1 transition-transform"><ChevronRight className="w-5 h-5" /></div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        <section className="max-w-[1220px] mx-auto px-4 sm:px-6 pb-16">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-teal-700 via-teal-600 to-sky-700 p-6 sm:p-9 text-white shadow-[0_24px_60px_rgba(15,118,110,.2)]">
            <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative flex flex-col md:flex-row md:items-center gap-6 justify-between">
              <div>
                <div className="text-xs uppercase tracking-[.16em] font-bold text-teal-100">Lernweg</div>
                <h2 className="text-2xl font-black mt-2">Ein Thema nach dem anderen.</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/80">Bearbeite zuerst den Lernabschnitt und anschließend die zugehörigen Übungen. Danach geht es mit dem nächsten Abschnitt weiter. Am Ende wartet der Abschlusstest.</p>
              </div>
              {continueModule && <button onClick={() => onOpenModule(continueModule.id)} className="shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-teal-700 px-5 py-3.5 text-sm font-black shadow-xl hover:-translate-y-0.5 transition-transform">Weiterlernen <ArrowRight className="w-4 h-4" /></button>}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white/75 backdrop-blur py-8 px-4 text-center">
        <div className="inline-flex items-center gap-2 font-black text-sm text-teal-700"><HeartPulse className="w-4 h-4" /> MFA Lerncampus</div>
        <p className="text-xs text-slate-400 mt-2">Lernmaterial für die MFA-Ausbildung</p>
      </footer>
    </div>
  );
}
