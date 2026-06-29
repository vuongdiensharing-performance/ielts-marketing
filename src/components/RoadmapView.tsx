import React from 'react';
import { Lock, CheckCircle2, ChevronRight, Clock, BookOpen, MapPin, GraduationCap } from 'lucide-react';
import { Module, Lesson, Level, UserProgress } from '../types';
import { LEVELS } from '../data/seedData';

interface RoadmapViewProps {
  userProgress: UserProgress;
  modules: Module[];
  lessons: Lesson[];
  onSelectModule: (moduleId: string) => void;
  onSelectLesson: (lessonId: string) => void;
}

export default function RoadmapView({
  userProgress,
  modules,
  lessons,
  onSelectModule,
  onSelectLesson,
}: RoadmapViewProps) {
  
  // Calculate total roadmap progress
  const totalLessonsCount = lessons.length;
  const completedCount = userProgress.completedLessons.length;
  const roadmapProgress = totalLessonsCount > 0 ? Math.round((completedCount / totalLessonsCount) * 100) : 0;

  const handleModuleClick = (module: Module) => {
    if (module.id === 'a1-m03') {
      onSelectModule(module.id);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-1 lg:p-4">
      {/* Page Header */}
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-2xl font-sans font-bold text-slate-950 tracking-tight">
          Lộ Trình Học Tập (Learning Roadmap)
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Được thiết kế chuẩn hóa theo sự phát triển kỹ năng thực tế của một Marketer từ khi gia nhập môi trường quốc tế đến khi dẫn dắt chiến dịch lớn.
        </p>
      </div>

      {/* Global Progress Indicator */}
      <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold uppercase">
            Tiến độ tổng thể (MVP Progress)
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-1">
            Chương Trình Survival Marketer (A1)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Hoàn thành các bài học thực hành để thăng cấp kỹ năng giao tiếp.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right">
            <span className="text-sm font-bold text-slate-800">{completedCount} / {totalLessonsCount} bài học</span>
            <div className="w-40 bg-slate-200 h-2 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${roadmapProgress}%` }}
              />
            </div>
          </div>
          <span className="text-2xl font-bold text-emerald-600 bg-white border border-slate-100 p-3 rounded-xl">
            {roadmapProgress}%
          </span>
        </div>
      </div>

      {/* LEVELS ROADMAP CONTAINER */}
      <div className="space-y-10 relative before:absolute before:left-6 before:top-8 before:bottom-8 before:w-0.5 before:bg-slate-100">
        {LEVELS.map((level) => {
          const isLevelUnlocked = level.code === 'A1';
          const levelModules = modules.filter(m => m.level === level.code);

          return (
            <div key={level.code} className="relative pl-14">
              {/* Node Indicator */}
              <div className={`absolute left-2.5 top-1.5 h-7 w-7 rounded-full border-2 flex items-center justify-center z-10 ${
                isLevelUnlocked 
                  ? 'bg-emerald-600 border-emerald-600 text-white animate-pulse' 
                  : 'bg-slate-100 border-slate-200 text-slate-400'
              }`}>
                {isLevelUnlocked ? (
                  <GraduationCap className="h-4 w-4" />
                ) : (
                  <Lock className="h-3.5 w-3.5" />
                )}
              </div>

              {/* Level Heading */}
              <div className="space-y-1 mb-4">
                <div className="flex items-center gap-3">
                  <h3 className={`text-xl font-sans font-bold tracking-tight ${
                    isLevelUnlocked ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    Level {level.code} — {level.name}
                  </h3>
                  {!isLevelUnlocked && (
                    <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">
                      LOCKED
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                  {level.description}
                </p>
              </div>

              {/* Modules List */}
              {isLevelUnlocked ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {levelModules.map((module) => {
                    const isModulePlayable = module.id === 'a1-m03';
                    const mLessons = lessons.filter(l => l.moduleId === module.id);
                    const mCompleted = mLessons.filter(l => userProgress.completedLessons.includes(l.id)).length;
                    const mPercent = mLessons.length > 0 ? Math.round((mCompleted / mLessons.length) * 100) : 0;

                    return (
                      <div
                        key={module.id}
                        className={`bg-white border rounded-2xl p-5 shadow-xs transition-all flex flex-col justify-between ${
                          isModulePlayable 
                            ? 'border-slate-100 hover:border-emerald-200 hover:shadow-md cursor-pointer' 
                            : 'border-slate-100 opacity-75'
                        }`}
                        onClick={() => handleModuleClick(module)}
                      >
                        <div className="space-y-3.5">
                          {/* Module Badge / Code */}
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider">
                              {module.code}
                            </span>
                            {isModulePlayable ? (
                              mPercent === 100 ? (
                                <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                                  <CheckCircle2 className="h-3 w-3" /> Hoàn thành
                                </span>
                              ) : (
                                <span className="text-[10px] text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full">
                                  {mPercent > 0 ? `Đang học ${mPercent}%` : 'Sẵn sàng'}
                                </span>
                              )
                            ) : (
                              <span className="text-[10px] text-slate-400 font-medium bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">
                                Dự kiến ra mắt
                              </span>
                            )}
                          </div>

                          {/* Title and descriptions */}
                          <div className="space-y-1.5">
                            <h4 className={`text-base font-bold font-sans tracking-tight ${
                              isModulePlayable ? 'text-slate-900' : 'text-slate-500'
                            }`}>
                              {module.title}
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-2">
                              {module.description}
                            </p>
                          </div>

                          {/* Info chips */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            <span className="flex items-center gap-1 text-[9px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                              <Clock className="h-2.5 w-2.5" /> {module.duration}m
                            </span>
                            <span className="flex items-center gap-1 text-[9px] font-mono text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                              <BookOpen className="h-2.5 w-2.5" /> {module.vocabCount} words
                            </span>
                          </div>

                          {/* Outcome summary box */}
                          <div className="bg-slate-50/50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                            <p className="text-[10px] font-bold text-slate-700">MỤC TIÊU BÀI HỌC:</p>
                            <p className="text-[10px] text-slate-500 leading-relaxed italic">
                              "{module.outcomeVi}"
                            </p>
                          </div>
                        </div>

                        {/* Action CTA */}
                        <div className="pt-4 mt-4 border-t border-slate-50 flex items-center justify-between">
                          {isModulePlayable ? (
                            <>
                              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                                Vào học ngay
                                <ChevronRight className="h-4 w-4" />
                              </span>
                              {mPercent > 0 && (
                                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                                  {mCompleted}/{mLessons.length} bài
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-[10px] font-sans font-medium text-slate-400 italic">
                              Đang biên soạn nội dung...
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 text-center max-w-3xl">
                  <Lock className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-sans text-slate-400 font-medium leading-relaxed">
                    Hoàn thành toàn bộ lộ trình Level A1 — The Survival Marketer để mở khóa {level.name}.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
