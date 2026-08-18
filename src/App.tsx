import { useState, useCallback, useEffect } from 'react';
import { Dashboard } from '@/pages/Dashboard';
import { ModuleDetail } from '@/pages/ModuleDetailV4';
import { modules } from '@/data';
import type { LearningResult } from '@/types';

type Page = 'dashboard' | 'module';

interface AppState {
  page: Page;
  activeModuleId: string | null;
}

function App() {
  const [state, setState] = useState<AppState>({
    page: 'dashboard',
    activeModuleId: null,
  });

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

  const handleOpenModule = useCallback((moduleId: string) => {
    setState({ page: 'module', activeModuleId: moduleId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setState({ page: 'dashboard', activeModuleId: null });
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

  return (
    <div className="min-h-screen bg-[#F4F7F9]">
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
    </div>
  );
}

export default App;
