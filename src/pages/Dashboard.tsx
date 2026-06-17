import { motion } from 'framer-motion';
import {
  HeartPulse,
  BookOpen,
  Brain,
  Target,
  Bone,
  Heart,
  Briefcase,
  Megaphone,
  Droplets,
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
};

const iconBgMap: Record<string, string> = {
  bone: 'bg-[#FEF3C7] text-[#D97706]',
  heart: 'bg-[#FEE2E2] text-[#DC2626]',
  briefcase: 'bg-[#CCFBF1] text-[#0D9488]',
  megaphone: 'bg-[#E0F2FE] text-[#38BDF8]',
  droplets: 'bg-[#E0F2FE] text-[#0D9488]',
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
  const totalProgress = modules.reduce((sum, m) => {
    return sum + (moduleProgress[m.id] || 0);
  }, 0) / modules.length;

  return (
    <div className="min-h-screen bg-[#F4F7F9]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F4F7F9]/90 backdrop-blur-lg border-b border-[#E2E8F0]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-7 h-7 text-[#0D9488]" />
            <span className="text-xl font-bold text-[#0D9488]">MedLearn by Andre Miethke</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-[#5A6270] uppercase tracking-wider">Gesamtfortschritt</span>
            <div className="w-24 h-2 bg-[#E0F2FE] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #0D9488, #38BDF8)',
                }}
                initial={{ width: 0 }}
                animate={{ width: `${totalProgress}%` }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
            <span className="text-xs font-semibold text-[#1A1D2B]">{Math.round(totalProgress)}%</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E0F2FE] via-[#F4F7F9] to-[#F4F7F9]" />
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-[#0D9488]/5" />
        <div className="absolute bottom-5 left-5 w-24 h-24 rounded-full bg-[#38BDF8]/5" />
        <div className="absolute top-20 left-20 w-16 h-16 rounded-full bg-[#D97706]/5" />
        <div className="relative max-w-[960px] mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
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
            Hallo Al-Marani!
          </motion.h1>
          <motion.p
            className="text-[#5A6270] max-w-[560px] mx-auto mb-8 text-base sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Deine interaktive Lernplattform für die MFA-Prüfung. Wähle ein Lernfeld und starte dein Lernen. Andre Miethke dein Dozent wird dich unterstützen!
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm">
              <BookOpen className="w-5 h-5 text-[#0D9488]" />
              <div className="text-left">
                <div className="text-sm font-semibold text-[#1A1D2B]">5 Lernfelder</div>
                <div className="text-xs text-[#5A6270]">Lernfeld 4-8</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm">
              <Brain className="w-5 h-5 text-[#D97706]" />
              <div className="text-left">
                <div className="text-sm font-semibold text-[#1A1D2B]">Übungsaufgaben</div>
                <div className="text-xs text-[#5A6270]">Mit Sofort-Feedback</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm">
              <Target className="w-5 h-5 text-[#38BDF8]" />
              <div className="text-left">
                <div className="text-sm font-semibold text-[#1A1D2B]">Mit Lösungen</div>
                <div className="text-xs text-[#5A6270]">Lernen & Verstehen</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Module Grid */}
      <section className="max-w-[960px] mx-auto px-4 sm:px-6 pb-16">
        <motion.h2
          className="text-xl font-bold text-[#1A1D2B] mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Deine Lernfelder
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((mod, index) => {
            const progress = moduleProgress[mod.id] || 0;
            const diff = difficultyMap[mod.difficulty];
            const isCompleted = progress >= 100;

            return (
              <motion.button
                key={mod.id}
                className="group text-left bg-white rounded-2xl p-5 shadow-sm border border-transparent hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                onClick={() => onOpenModule(mod.id)}
              >
                {isCompleted && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBgMap[mod.icon]}`}>
                    {iconMap[mod.icon]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#1A1D2B] text-base">Lernfeld {mod.number}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${diff.bg} ${diff.color}`}>
                        {diff.label}
                      </span>
                    </div>
                    <p className="text-sm text-[#5A6270] line-clamp-2 mb-3">{mod.subtitle}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-[#E0F2FE] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, #0D9488, #38BDF8)' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.6, delay: 0.2 + 0.1 * index }}
                        />
                      </div>
                      <span className="text-xs font-medium text-[#5A6270] w-8 text-right">{Math.round(progress)}%</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#5A6270] group-hover:translate-x-1 group-hover:text-[#0D9488] transition-all shrink-0 mt-1" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F0F5F3] border-t border-[#E2E8F0] py-6 text-center">
        <p className="text-sm text-[#5A6270]">MedLearn – Interaktive MFA-Lernplattform</p>
        <p className="text-xs text-[#5A6270]/60 mt-1 uppercase tracking-wider">© 2025 – Für Al-Marani</p>
      </footer>
    </div>
  );
}
