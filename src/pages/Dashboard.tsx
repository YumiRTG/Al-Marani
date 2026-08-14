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
  megaphone: 'bg-[#E0F2FE] text-[#38BDF8]',
  droplets: 'bg-[#E0F2FE] text-[#0D9488]',
  stethoscope: 'bg-[#EDE9FE] text-[#7C3AED]',
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

export function Dashboard({ modules, moduleProgress, onOpenModule }: DashboardProps) {
  const totalProgress = modules.length
    ? modules.reduce((sum, m) => sum + (moduleProgress[m.id] || 0), 0) / modules.length
    : 0;

  return (
    <div className="min-h-screen bg-[#F4F7F9]">
      <header className="sticky top-0 z-50 bg-[#F4F7F9]/90 backdrop-blur-lg border-b border-[#E2E8F0]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <HeartPulse className="w-7 h-7 text-[#0D9488] shrink-0" />
            <span className="text-base sm:text-xl font-bold text-[#0D9488] truncate">MFA Lerncampus by Andre Miethke</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-xs font-medium text-[#5A6270] uppercase tracking-wider">Gesamtfortschritt</span>
            <div className="w-24 h-2 bg-[#E0F2FE] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #0D9488, #38BDF8)' }}
                initial={{ width: 0 }}
                animate={{ width: `${totalProgress}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <span className="text-xs font-semibold text-[#1A1D2B]">{Math.round(totalProgress)}%</span>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E0F2FE] via-[#F4F7F9] to-[#F4F7F9]" />
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-[#0D9488]/5" />
        <div className="absolute bottom-5 left-5 w-24 h-24 rounded-full bg-[#38BDF8]/5" />
        <div className="absolute top-20 left-20 w-16 h-16 rounded-full bg-[#D97706]/5" />
        <div className="relative max-w-[960px] mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#CCFBF1] text-[#0F766E] text-sm font-semibold mb-5 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PlayCircle className="w-4 h-4" />
            Lernen mit Erklärungen, Bildern und vielen Videos
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #0D9488, #D97706)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Willkommen im MFA Lerncampus!
          </motion.h1>

          <motion.p
            className="text-[#5A6270] max-w-[650px] mx-auto mb-8 text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Die gemeinsame Lernplattform für alle MFA-Auszubildenden in meinen Kursen. Wähle dein Lernfeld, starte mit den einfachen Erklärungen und nutze besonders die Videos, Schaubilder und Prüfungsfragen zum Wiederholen.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[760px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 bg-white px-5 py-4 rounded-xl shadow-sm text-left">
              <BookOpen className="w-6 h-6 text-[#0D9488] shrink-0" />
              <div>
                <div className="text-sm font-semibold text-[#1A1D2B]">{modules.length} Lernfelder</div>
                <div className="text-xs text-[#5A6270]">Lernfeld 4 bis 9</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white px-5 py-4 rounded-xl shadow-sm text-left">
              <PlayCircle className="w-6 h-6 text-[#DC2626] shrink-0" />
              <div>
                <div className="text-sm font-semibold text-[#1A1D2B]">Viele Lernvideos</div>
                <div className="text-xs text-[#5A6270]">Mit Beobachtungsaufgaben</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white px-5 py-4 rounded-xl shadow-sm text-left">
              <Brain className="w-6 h-6 text-[#D97706] shrink-0" />
              <div>
                <div className="text-sm font-semibold text-[#1A1D2B]">Prüfungstraining</div>
                <div className="text-xs text-[#5A6270]">Mit direktem Feedback</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-[960px] mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <motion.h2 className="text-xl font-bold text-[#1A1D2B]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Lernfelder
            </motion.h2>
            <p className="text-sm text-[#64748B] mt-1">Am besten: erst Erklärung und Bild, dann Video, danach die Aufgaben.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((mod, index) => {
            const progress = moduleProgress[mod.id] || 0;
            const diff = difficultyMap[mod.difficulty];
            const isCompleted = progress >= 100;

            return (
              <motion.button
                key={mod.id}
                className="group text-left bg-white rounded-2xl overflow-hidden shadow-sm border border-transparent hover:border-[#99F6E4] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 * index }}
                onClick={() => onOpenModule(mod.id)}
              >
                <div className="h-28 w-full overflow-hidden relative">
                  <img src={mod.heroImage} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className={`absolute left-4 bottom-3 w-11 h-11 rounded-xl flex items-center justify-center shadow-sm ${iconBgMap[mod.icon]}`}>
                    {iconMap[mod.icon]}
                  </div>
                  {isCompleted && <CheckCircle2 className="absolute top-3 right-3 w-6 h-6 text-white drop-shadow" />}
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-[#1A1D2B] text-base">Lernfeld {mod.number}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${diff.bg} ${diff.color}`}>{diff.label}</span>
                  </div>
                  <p className="text-sm text-[#5A6270] line-clamp-2 mb-4">{mod.subtitle}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-[#E0F2FE] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #0D9488, #38BDF8)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.6, delay: 0.15 + 0.08 * index }}
                      />
                    </div>
                    <span className="text-xs font-medium text-[#5A6270] w-8 text-right">{Math.round(progress)}%</span>
                    <ChevronRight className="w-5 h-5 text-[#94A3B8] group-hover:translate-x-1 group-hover:text-[#0D9488] transition-all" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      <footer className="bg-[#F0F5F3] border-t border-[#E2E8F0] py-7 text-center px-4">
        <p className="text-sm font-medium text-[#475569]">MFA Lerncampus – Interaktive Lernplattform</p>
        <p className="text-xs text-[#64748B] mt-1">Für alle MFA-Auszubildenden • Andre Miethke • 2026</p>
      </footer>
    </div>
  );
}
