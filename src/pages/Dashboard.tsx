import { motion } from 'framer-motion';
import {
  HeartPulse,
  BookOpen,
  Brain,
  PlayCircle,
  Bone,
  Heart,
  Briefcase,
  Megaphone,
  Droplets,
  Stethoscope,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  ArrowRight,
  Images,
  ListChecks,
  Clock3,
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

const iconBgMap: Record<string, string> = {
  bone: 'bg-[#FEF3C7] text-[#D97706]',
  heart: 'bg-[#FEE2E2] text-[#DC2626]',
  briefcase: 'bg-[#CCFBF1] text-[#0D9488]',
  megaphone: 'bg-[#E0F2FE] text-[#0284C7]',
  droplets: 'bg-[#E0F2FE] text-[#0D9488]',
  stethoscope: 'bg-[#EDE9FE] text-[#7C3AED]',
};

const cardAccentMap: Record<string, string> = {
  bone: 'from-[#F59E0B]/20 via-white to-white',
  heart: 'from-[#EF4444]/16 via-white to-white',
  briefcase: 'from-[#14B8A6]/16 via-white to-white',
  megaphone: 'from-[#38BDF8]/18 via-white to-white',
  droplets: 'from-[#0EA5E9]/18 via-white to-white',
  stethoscope: 'from-[#8B5CF6]/18 via-white to-white',
};

const difficultyMap: Record<string, { label: string; color: string; bg: string }> = {
  easy: { label: 'Einfach', color: 'text-[#16A34A]', bg: 'bg-[#DCFCE7]' },
  medium: { label: 'Mittel', color: 'text-[#D97706]', bg: 'bg-[#FEF3C7]' },
  advanced: { label: 'Fortgeschritten', color: 'text-[#DC2626]', bg: 'bg-[#FEE2E2]' },
};

interface DashboardProps {
  modules: LearningModule[];
  moduleProgress: Record<string, number>;
  onOpenModule: (moduleId: string) => void;
}

const floatingVariants = {
  animate: (delay: number) => ({
    y: [0, -10, 0],
    rotate: [0, delay % 2 === 0 ? 1.2 : -1.2, 0],
    transition: { duration: 5.5 + delay, repeat: Infinity, ease: 'easeInOut' as const, delay: delay * .25 },
  }),
};

export function Dashboard({ modules, moduleProgress, onOpenModule }: DashboardProps) {
  const totalProgress = modules.length
    ? modules.reduce((sum, m) => sum + (moduleProgress[m.id] || 0), 0) / modules.length
    : 0;

  const completedModules = modules.filter(m => (moduleProgress[m.id] || 0) >= 100).length;
  const totalVideos = modules.reduce((sum, module) => sum + module.topics.reduce((topicSum, topic) => topicSum + topic.content.filter(block => block.type === 'video').length, 0), 0);
  const totalVisuals = modules.reduce((sum, module) => sum + module.topics.reduce((topicSum, topic) => topicSum + topic.content.filter(block => block.type === 'image').length, 0), 0);
  const totalQuestions = modules.reduce((sum, module) => sum + module.questions.length, 0);
  const continueModule = modules.find(module => (moduleProgress[module.id] || 0) > 0 && (moduleProgress[module.id] || 0) < 100)
    || modules.find(module => (moduleProgress[module.id] || 0) < 100)
    || modules[0];
  const heroModules = modules.slice(-3).reverse();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#ecfeff_0,_#f8fafc_42%,_#f4f7f9_100%)] text-[#0F172A] overflow-hidden">
      <header className="sticky top-0 z-50 bg-white/78 backdrop-blur-xl border-b border-white/80 shadow-[0_1px_25px_rgba(15,118,110,0.06)]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <motion.div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0D9488] to-[#0284C7] text-white flex items-center justify-center shadow-md" whileHover={{ rotate: -8, scale: 1.06 }}>
              <HeartPulse className="w-6 h-6" />
            </motion.div>
            <div className="min-w-0">
              <div className="text-sm sm:text-lg font-extrabold text-[#0F766E] truncate">MFA Lerncampus</div>
              <div className="hidden sm:block text-[10px] uppercase tracking-[.18em] text-[#94A3B8]">by Andre Miethke</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-4 py-2">
              <div>
                <div className="text-[10px] uppercase tracking-[.14em] font-bold text-[#94A3B8]">Gesamtfortschritt</div>
                <div className="text-sm font-extrabold text-[#0F172A]">{Math.round(totalProgress)}%</div>
              </div>
              <div className="w-28 h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden p-[2px]">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-[#14B8A6] to-[#38BDF8]" initial={{ width: 0 }} animate={{ width: `${totalProgress}%` }} transition={{ duration: .9 }} />
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#CCFBF1] to-[#E0F2FE] border border-white shadow-sm flex items-center justify-center font-extrabold text-[#0F766E]">A</div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative">
          <div className="absolute inset-0 pointer-events-none">
            <motion.div className="absolute -top-16 right-[8%] w-72 h-72 rounded-full bg-[#99F6E4]/28 blur-3xl" animate={{ x: [0, 24, 0], y: [0, -15, 0] }} transition={{ duration: 10, repeat: Infinity }} />
            <motion.div className="absolute top-32 left-[3%] w-64 h-64 rounded-full bg-[#BAE6FD]/28 blur-3xl" animate={{ x: [0, -18, 0], y: [0, 20, 0] }} transition={{ duration: 12, repeat: Infinity }} />
            <motion.div className="absolute top-10 left-[45%] w-44 h-44 rounded-full bg-[#FDE68A]/20 blur-3xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity }} />
          </div>

          <div className="relative max-w-[1180px] mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 sm:pb-12 grid lg:grid-cols-[1.05fr_.95fr] gap-10 items-center">
            <div>
              <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#99F6E4] text-[#0F766E] text-sm font-bold mb-5 shadow-sm" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <Sparkles className="w-4 h-4" /> Interaktiv lernen statt nur durchlesen
              </motion.div>

              <motion.h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.04] mb-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .06 }}>
                Dein digitaler
                <span className="block bg-gradient-to-r from-[#0D9488] via-[#0284C7] to-[#7C3AED] bg-clip-text text-transparent">MFA Lerncampus.</span>
              </motion.h1>

              <motion.p className="text-[#64748B] max-w-[650px] text-base sm:text-lg leading-8 mb-7" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 }}>
                Für alle MFA-Auszubildenden in meinen Kursen. Jeder Lernteil wird erst erklärt und visualisiert. Danach bearbeitest du direkt die passenden Übungen. Erst dann geht es weiter zum nächsten Teil.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row gap-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 }}>
                {continueModule && (
                  <button onClick={() => onOpenModule(continueModule.id)} className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#0D9488] to-[#0284C7] text-white text-sm font-bold shadow-lg shadow-[#0D9488]/20 hover:-translate-y-0.5 transition-all">
                    {moduleProgress[continueModule.id] ? `Lernfeld ${continueModule.number} fortsetzen` : `Mit Lernfeld ${continueModule.number} starten`}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
                <a href="#lernfelder" className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white border border-[#E2E8F0] text-[#475569] text-sm font-bold shadow-sm hover:border-[#99F6E4] hover:bg-[#F0FDFA] transition-all">
                  Alle Lernfelder ansehen <BookOpen className="w-4 h-4" />
                </a>
              </motion.div>
            </div>

            <div className="relative h-[390px] sm:h-[455px] hidden md:block">
              <motion.div className="absolute inset-x-12 bottom-0 h-20 rounded-[50%] bg-[#0F766E]/10 blur-2xl" animate={{ scaleX: [1, .86, 1] }} transition={{ duration: 6, repeat: Infinity }} />
              {heroModules.map((module, index) => {
                const positions = [
                  'left-[10%] top-[8%] w-[58%] h-[50%] rotate-[-6deg] z-10',
                  'right-[2%] top-[28%] w-[58%] h-[50%] rotate-[5deg] z-20',
                  'left-[22%] bottom-[0%] w-[58%] h-[50%] rotate-[-1deg] z-30',
                ];
                return (
                  <motion.button
                    key={module.id}
                    custom={index + 1}
                    variants={floatingVariants}
                    animate="animate"
                    onClick={() => onOpenModule(module.id)}
                    className={`absolute ${positions[index]} rounded-[28px] overflow-hidden border-[5px] border-white shadow-[0_25px_55px_rgba(15,23,42,0.18)] text-left group`}
                    whileHover={{ scale: 1.04, rotate: 0, zIndex: 40 }}
                  >
                    <img src={module.heroImage} alt={module.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />
                    <div className="absolute left-4 right-4 bottom-4 text-white">
                      <div className="text-[10px] uppercase tracking-[.15em] font-bold text-white/70">Lernfeld {module.number}</div>
                      <div className="font-bold text-sm line-clamp-2">{module.title}</div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="max-w-[1180px] mx-auto px-4 sm:px-6 pb-10">
          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: .06 } } }}>
            {[
              { icon: BookOpen, value: modules.length, label: 'Lernfelder', sub: 'LF 4 bis 9', tone: 'bg-[#CCFBF1] text-[#0D9488]' },
              { icon: PlayCircle, value: totalVideos, label: 'Lernvideos', sub: 'direkt im Stoff', tone: 'bg-[#FEE2E2] text-[#DC2626]' },
              { icon: Images, value: totalVisuals, label: 'Schaubilder', sub: 'visuell erklärt', tone: 'bg-[#E0F2FE] text-[#0284C7]' },
              { icon: ListChecks, value: totalQuestions, label: 'Quizfragen', sub: `${completedModules} Lernfelder fertig`, tone: 'bg-[#FEF3C7] text-[#D97706]' },
            ].map((stat, index) => (
              <motion.div key={stat.label} className="bg-white/85 backdrop-blur rounded-2xl p-4 sm:p-5 border border-white shadow-sm" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} whileHover={{ y: -4 }}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.tone}`}><stat.icon className="w-5 h-5" /></div>
                <div className="text-2xl font-black text-[#0F172A]">{stat.value}</div>
                <div className="text-sm font-bold text-[#334155]">{stat.label}</div>
                <div className="text-xs text-[#94A3B8] mt-1">{stat.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section id="lernfelder" className="max-w-[1180px] mx-auto px-4 sm:px-6 pb-14 sm:pb-20 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#0D9488] mb-2"><GraduationCap className="w-4 h-4" /> Dein Lernpfad</div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A]">Lernfelder</h2>
              <p className="text-sm text-[#64748B] mt-2 max-w-xl">Öffne ein Lernfeld und arbeite dich Teil für Teil durch. Erklärung, Bild oder Video kommen zuerst, danach die passenden Aufgaben.</p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-3 py-2 rounded-xl"><Clock3 className="w-4 h-4" /> Fortschritt wird automatisch gespeichert</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {modules.map((mod, index) => {
              const progress = moduleProgress[mod.id] || 0;
              const diff = difficultyMap[mod.difficulty];
              const isCompleted = progress >= 100;
              const videoCount = mod.topics.reduce((sum, topic) => sum + topic.content.filter(block => block.type === 'video').length, 0);
              const imageCount = mod.topics.reduce((sum, topic) => sum + topic.content.filter(block => block.type === 'image').length, 0);

              return (
                <motion.button
                  key={mod.id}
                  className={`group text-left rounded-[26px] overflow-hidden bg-gradient-to-br ${cardAccentMap[mod.icon] || 'from-[#E2E8F0]/60 via-white to-white'} border border-white shadow-[0_12px_35px_rgba(15,23,42,0.07)] hover:shadow-[0_24px_55px_rgba(15,118,110,0.13)] transition-shadow cursor-pointer relative`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: .45, delay: Math.min(index * .05, .25) }}
                  whileHover={{ y: -7 }}
                  onClick={() => onOpenModule(mod.id)}
                >
                  <div className="h-44 w-full overflow-hidden relative">
                    <img src={mod.heroImage} alt={mod.title} className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/78 via-[#0F172A]/10 to-transparent" />
                    <div className={`absolute left-4 top-4 w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur ${iconBgMap[mod.icon]}`}>
                      {iconMap[mod.icon]}
                    </div>
                    {isCompleted && <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#16A34A] text-xs font-bold shadow"><CheckCircle2 className="w-4 h-4" /> Fertig</div>}
                    <div className="absolute left-4 right-4 bottom-4 text-white">
                      <div className="text-xs uppercase tracking-[.16em] font-bold text-white/70">Lernfeld {mod.number}</div>
                      <h3 className="font-extrabold text-lg leading-6 line-clamp-2 mt-1">{mod.title}</h3>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${diff.bg} ${diff.color}`}>{diff.label}</span>
                      <span className="text-xs text-[#94A3B8]">{mod.topics.length} Themen</span>
                    </div>
                    <p className="text-sm text-[#64748B] leading-6 line-clamp-3 min-h-[72px]">{mod.subtitle}</p>

                    <div className="flex gap-2 mt-4 mb-5">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#64748B] bg-white/75 border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg"><PlayCircle className="w-3.5 h-3.5 text-[#DC2626]" /> {videoCount} Videos</span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#64748B] bg-white/75 border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg"><Images className="w-3.5 h-3.5 text-[#0284C7]" /> {imageCount} Bilder</span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#64748B] bg-white/75 border border-[#E2E8F0] px-2.5 py-1.5 rounded-lg"><Brain className="w-3.5 h-3.5 text-[#D97706]" /> {mod.questions.length}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between text-[11px] font-semibold text-[#94A3B8] mb-1.5"><span>Fortschritt</span><span>{Math.round(progress)}%</span></div>
                        <div className="h-2.5 bg-white rounded-full overflow-hidden p-[2px] border border-[#E2E8F0]">
                          <motion.div className="h-full rounded-full bg-gradient-to-r from-[#14B8A6] to-[#38BDF8]" initial={{ width: 0 }} whileInView={{ width: `${progress}%` }} viewport={{ once: true }} transition={{ duration: .7, delay: .15 }} />
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-[#0D9488] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-md"><ChevronRight className="w-5 h-5" /></div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>

        <section className="max-w-[1180px] mx-auto px-4 sm:px-6 pb-16">
          <div className="rounded-[30px] bg-gradient-to-br from-[#0F766E] via-[#0D9488] to-[#0369A1] text-white p-6 sm:p-9 overflow-hidden relative shadow-[0_24px_60px_rgba(15,118,110,0.18)]">
            <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
            <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#A7F3D0] mb-2"><Sparkles className="w-4 h-4" /> Lernmethode</div>
                <h2 className="text-2xl font-black mb-2">Nicht mehr 30 Minuten Aufgaben nach 10 Minuten Lesen.</h2>
                <p className="text-white/75 text-sm leading-6 max-w-2xl">Jeder Teil wird jetzt einzeln gelernt. Direkt danach kommen nur die Übungen, die genau zu diesem Teil gehören. Erst wenn sie bearbeitet sind, wird der nächste Abschnitt freigeschaltet.</p>
              </div>
              {continueModule && <button onClick={() => onOpenModule(continueModule.id)} className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white text-[#0F766E] text-sm font-extrabold shadow-xl hover:-translate-y-0.5 transition-all">Weiterlernen <ArrowRight className="w-4 h-4" /></button>}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E2E8F0] bg-white/70 backdrop-blur py-8 text-center px-4">
        <div className="flex items-center justify-center gap-2 text-[#0F766E] font-bold text-sm"><HeartPulse className="w-4 h-4" /> MFA Lerncampus</div>
        <p className="text-xs text-[#94A3B8] mt-2">Für alle MFA-Auszubildenden • Andre Miethke • 2026</p>
      </footer>
    </div>
  );
}
