import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import RoadmapView from './components/RoadmapView';
import SkillsView from './components/SkillsView';
import VocabularyView from './components/VocabularyView';
import StructurePage from './components/StructurePage';
import ReviewView from './components/ReviewView';
import AnalyticsView from './components/AnalyticsView';
import ModuleDetailView from './components/ModuleDetailView';
import LessonWorkspaceView from './components/LessonWorkspaceView';

import { MODULES, LESSONS } from './data/seedData';
import { UserProgress, MigrationMeta } from './types';

const MEL_V1_PROGRESS_KEY = 'mel_v1_progress';
const MEL_V1_MIGRATION_META = 'mel_v1_migration_meta';

// ... (keep defaultProgress as is, but maybe enhance types in future)
const defaultProgress: UserProgress = {
  learningContext: 'marketing',
  completedLessons: [],
  vocabBookmarks: [],
  formulaBookmarks: [],
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  skillXP: {
    Listening: 15,
    Speaking: 20,
    Reading: 10,
    Writing: 10,
    Vocabulary: 25,
  },
  lessonResponses: {},
  speechSettings: {
    selectedEnglishVoiceName: 'Google US English',
    selectedVietnameseVoiceName: 'Linh',
    speechRatePreset: 1
  }
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>(defaultProgress);

  useEffect(() => {
    // Migration Logic
    const legacyKeys = [
      'marketing_english_lab_progress_v0',
      'family_life_progress',
      'family_life_responses',
      'family_life_xp',
      'family_life_vocab'
    ];

    const existingMeta = localStorage.getItem(MEL_V1_MIGRATION_META);
    if (!existingMeta) {
      const mergedProgress: UserProgress = { ...defaultProgress, lessonResponses: {} };
      
      legacyKeys.forEach(key => {
        const legacyData = localStorage.getItem(key);
        if (legacyData) {
          try {
            const parsed = JSON.parse(legacyData);
            const trackId = key.includes('family') ? 'family-life' : 'marketing';

            if (parsed.lessonResponses) {
              Object.entries(parsed.lessonResponses as Record<string, any>).forEach(([lessonId, response]: [string, any]) => {
                mergedProgress.lessonResponses[lessonId] = {
                  ...response,
                  trackId,
                  topicTags: trackId === 'family-life' ? ['family-life'] : ['marketing'],
                  updatedAt: new Date().toISOString(),
                  createdAt: response.createdAt || new Date().toISOString(),
                };
              });
            }
          } catch(e) { console.error('Migration error', e); }
        }
      });
      
      const meta: MigrationMeta = {
        schemaVersion: '1',
        migratedAt: new Date().toISOString(),
        migratedFromKeys: legacyKeys,
        validationPassed: true
      };
      localStorage.setItem(MEL_V1_MIGRATION_META, JSON.stringify(meta));
      localStorage.setItem(MEL_V1_PROGRESS_KEY, JSON.stringify(mergedProgress));
      setUserProgress(mergedProgress);
    } else {
       const stored = localStorage.getItem(MEL_V1_PROGRESS_KEY);
       if (stored) setUserProgress(JSON.parse(stored));
    }
  }, []);

  // Sync state changes with localStorage
  const handleUpdateProgress = (updater: (prev: UserProgress) => UserProgress) => {
    setUserProgress((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(MEL_V1_PROGRESS_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save progress to localStorage:', e);
      }
      return next;
    });
  };

  // Switch primary nav tabs
  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    setCurrentModuleId(null);
    setCurrentLessonId(null);
  };

  // Direct drill down selectors
  const handleSelectModule = (moduleId: string) => {
    setCurrentModuleId(moduleId);
    setCurrentLessonId(null);
    setCurrentTab('roadmap');
  };

  const handleSelectLesson = (lessonId: string) => {
    setCurrentLessonId(lessonId);
    // Find associated module to track correct drill-down hierarchy
    const lesson = LESSONS.find(l => l.id === lessonId);
    if (lesson) {
      setCurrentModuleId(lesson.moduleId);
    }
  };

  const handleBackToModule = () => {
    setCurrentLessonId(null);
  };

  const handleBackToRoadmap = () => {
    setCurrentModuleId(null);
    setCurrentLessonId(null);
  };

  // State Machine Renderer
  const renderMainContent = () => {
    // 1. Drill-down State: Active Lesson Workspace
    if (currentLessonId) {
      return (
        <LessonWorkspaceView
          lessonId={currentLessonId}
          lessons={LESSONS}
          userProgress={userProgress}
          onUpdateProgress={handleUpdateProgress}
          onBackToModule={handleBackToModule}
          onTabChange={handleTabChange}
          onSelectLesson={handleSelectLesson}
        />
      );
    }

    // 2. Drill-down State: Active Module Detail Page
    if (currentModuleId) {
      return (
        <ModuleDetailView
          moduleId={currentModuleId}
          modules={MODULES}
          lessons={LESSONS}
          userProgress={userProgress}
          onSelectLesson={handleSelectLesson}
          onBackToRoadmap={handleBackToRoadmap}
        />
      );
    }

    // 3. Main Nav Tabs State
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardView
            userProgress={userProgress}
            modules={MODULES}
            lessons={LESSONS}
            onUpdateProgress={handleUpdateProgress}
            onTabChange={handleTabChange}
            onSelectModule={handleSelectModule}
            onSelectLesson={handleSelectLesson}
          />
        );
      case 'roadmap':
        return (
          <RoadmapView
            userProgress={userProgress}
            modules={MODULES}
            lessons={LESSONS}
            onUpdateProgress={handleUpdateProgress}
            onSelectModule={handleSelectModule}
            onSelectLesson={handleSelectLesson}
          />
        );
      case 'skills':
        return <SkillsView 
          userProgress={userProgress}
          onUpdateProgress={handleUpdateProgress}
          onSelectLesson={handleSelectLesson} 
          lessons={LESSONS}
        />;
      case 'vocabulary':
        return (
          <VocabularyView
            userProgress={userProgress}
            onUpdateProgress={handleUpdateProgress}
          />
        );
      case 'structure':
        return <StructurePage />;
      case 'review':
        return <ReviewView userProgress={userProgress} />;
      case 'analytics':
        return <AnalyticsView userProgress={userProgress} onTabChange={handleTabChange} />;
      default:
        return (
          <div className="p-8 text-center bg-white border border-slate-100 rounded-3xl mt-8">
            <h3 className="text-sm font-semibold text-slate-400">Trang đang phát triển...</h3>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50/50">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentTab={currentTab} 
        onTabChange={handleTabChange} 
        streakDays={userProgress.streakDays} 
        currentContext={userProgress.learningContext || 'marketing'}
        onContextChange={(context) => {
          handleUpdateProgress(prev => ({
            ...prev,
            learningContext: context
          }));
          setCurrentModuleId(null);
          setCurrentLessonId(null);
          setCurrentTab('dashboard');
        }}
      />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Spacer or Header (Optional visual rail for spacing) */}
        <div className="hidden lg:block h-3 border-b border-slate-100/30 bg-transparent"></div>

        {/* Dynamic page container */}
        <div className="flex-1 p-6 lg:p-10 overflow-y-auto max-w-7xl w-full mx-auto">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
}

