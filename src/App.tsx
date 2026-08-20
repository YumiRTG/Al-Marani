import { useState, useCallback, useEffect } from 'react';
import { BookOpen, Bone } from 'lucide-react';
import { Dashboard } from '@/pages/Dashboard';
import { ModuleDetail } from '@/pages/ModuleDetailV4';
import { SkeletonPageV5 } from '@/pages/SkeletonPageV5';
import { modules } from '@/data';
import type { LearningResult } from '@/types';

type Page = 'dashboard' | 'module' | 'skeleton';

interface AppState {
  page: Page;
  activeModuleId: string | null;
}

function App() {
  const [state, setState] = useState<AppState>(() => ({
    page: window.location.hash === '#skelett' ? 'skeleton' : 'dashboard',
    activeModuleId: null,
  }));

  const [moduleProgress, setModuleProgress] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('medlearn-progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  const [moduleResults, setModuleResults] = useState<Record<string, LearningResult>>(() => {
    const saved = localStorage.getItem('medlearn-results');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem('medlearn-progress', JSON.stringify(moduleProgress));
  }, [moduleProgress]);

  useEffect(() => {
    localStorage.setItem('medlearn-results', JSON.stringify(moduleResults));
  }, [moduleResults]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#skelett') {
        setState({ page: 'skeleton', activeModuleId: null });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenModule = useCallback((moduleId: string) => {
    window.history.replaceState(null, '', window.location.pathname);
    setState({ page: 'module', activeModuleId: moduleId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToDashboard = useCallback(() => {
    window.history.replaceState(null, '', window.location.pathname);
    setState({ page: 'dashboard', activeModuleId: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenSkeleton = useCallback(() => {
    window.location.hash = 'skelett';
    setState({ page: 'skeleton', activeModuleId: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleUpdateProgress = useCallback((moduleId: string, progress: number) => {
    setModuleProgress(prev => ({
      ...prev,
      [moduleId]: Math.max(prev[moduleId] || 0, progress),
    }));
  }, []);

  const handleUpdateResult = useCallback((moduleId: string, result: LearningResult) => {
    setModuleResults(prev => ({
      ...prev,
      [moduleId]: result,
    }));
  }, []);

  const activeModule = state.activeModuleId
    ? modules.find(m => m.id === state.activeModuleId) || null
    : null;

  const skeletonActive = state.page === 'skeleton';

  return (
    <div className="min-h-screen bg-[#F4F7F9]">
      <div className="fixed top-2 left-1/2 -translate-x-1/2 z-[80] hidden sm:flex items-center gap-1 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-xl p-1 shadow-lg shadow-slate-900/10">
        <button
          onClick={handleBackToDashboard}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-colors ${!skeletonActive ? 'bg-teal-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          <BookOpen className="w-4 h-4" /> Lernfelder
        </button>
        <button
          onClick={handleOpenSkeleton}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-colors ${skeletonActive ? 'bg-amber-500 text-white' : 'text-slate-500 hover:bg-amber-50 hover:text-amber-700'}`}
        >
          <Bone className="w-4 h-4" /> Skelett
        </button>
      </div>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[80] sm:hidden flex items-center gap-1 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-xl p-1.5 shadow-xl shadow-slate-900/15">
        <button
          onClick={handleBackToDashboard}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition-colors ${!skeletonActive ? 'bg-teal-600 text-white' : 'text-slate-500'}`}
        >
          <BookOpen className="w-4 h-4" /> Lernfelder
        </button>
        <button
          onClick={handleOpenSkeleton}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-black transition-colors ${skeletonActive ? 'bg-amber-500 text-white' : 'text-slate-500'}`}
        >
          <Bone className="w-4 h-4" /> Skelett
        </button>
      </div>

      {state.page === 'dashboard' && (
        <Dashboard
          modules={modules}
          moduleProgress={moduleProgress}
          moduleResults={moduleResults}
          onOpenModule={handleOpenModule}
        />
      )}
      {state.page === 'module' && activeModule && (
        <ModuleDetail
          module={activeModule}
          onBack={handleBackToDashboard}
          onUpdateProgress={handleUpdateProgress}
          onUpdateResult={handleUpdateResult}
          currentProgress={moduleProgress[activeModule.id] || 0}
          allModules={modules}
          onOpenModule={handleOpenModule}
        />
      )}
      {state.page === 'skeleton' && (
        <SkeletonPageV5 onBack={handleBackToDashboard} />
      )}
    </div>
  );
}

export default App;