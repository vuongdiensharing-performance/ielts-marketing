import React from 'react';
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Volume2, 
  Mic, 
  FileText, 
  PenTool, 
  Sparkles,
  PlayCircle
} from 'lucide-react';
import { Module, Lesson, UserProgress, Skill } from '../types';

interface ModuleDetailViewProps {
  moduleId: string;
  modules: Module[];
  lessons: Lesson[];
  userProgress: UserProgress;
  onSelectLesson: (lessonId: string) => void;
  onBackToRoadmap: () => void;
}

export default function ModuleDetailView({
  moduleId,
  modules,
  lessons,
  userProgress,
  onSelectLesson,
  onBackToRoadmap,
}: ModuleDetailViewProps) {
  
  const currentModule = modules.find(m => m.id === moduleId);
  
  if (!currentModule) {
    return (
      <div className="p-8 text-center max-w-lg mx-auto bg-white border rounded-3xl mt-8">
        <p className="text-slate-500 font-sans">Không tìm thấy thông tin module học tập này.</p>
        <button 
          onClick={onBackToRoadmap}
          className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-semibold"
        >
          Quay lại Lộ trình
        </button>
      </div>
    );
  }

  const moduleLessons = lessons.filter(l => l.moduleId === moduleId);
  const completedCount = moduleLessons.filter(l => userProgress.completedLessons.includes(l.id)).length;
  const progressPercent = moduleLessons.length > 0 ? Math.round((completedCount / moduleLessons.length) * 100) : 0;

  // Icon mapping for skill cards
  const skillIcons: Record<Skill, any> = {
    Listening: Volume2,
    Speaking: Mic,
    Reading: FileText,
    Writing: PenTool,
    Vocabulary: BookOpen,
  };

  const skillBadgeColors: Record<Skill, string> = {
    Listening: 'bg-blue-50 text-blue-700 border-blue-100',
    Speaking: 'bg-purple-50 text-purple-700 border-purple-100',
    Reading: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    Writing: 'bg-orange-50 text-orange-700 border-orange-100',
    Vocabulary: 'bg-teal-50 text-teal-700 border-teal-100',
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-1 lg:p-4">
      {/* Back to Roadmap button */}
      <button
        onClick={onBackToRoadmap}
        className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Quay lại Lộ trình</span>
      </button>

      {/* Module Banner Section */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bg-emerald-500/5 h-48 w-48 rounded-full -mr-12 -mt-12"></div>
        
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {currentModule.code} • LEVEL A1
            </span>
            <span className="text-xs font-mono text-slate-400">
              Chủ đề thực hành
            </span>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-sans font-bold text-slate-950 tracking-tight">
              {currentModule.title}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-sans">
              {currentModule.description}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-50">
          <div className="p-3 bg-slate-50 rounded-2xl">
            <span className="block text-[10px] text-slate-400 font-mono font-bold uppercase">DURATION</span>
            <span className="flex items-center gap-1.5 text-sm font-bold text-slate-800 mt-1">
              <Clock className="h-4 w-4 text-slate-400" /> {currentModule.duration} Phút
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl">
            <span className="block text-[10px] text-slate-400 font-mono font-bold uppercase">VOCABULARY</span>
            <span className="flex items-center gap-1.5 text-sm font-bold text-slate-800 mt-1">
              <BookOpen className="h-4 w-4 text-slate-400" /> {currentModule.vocabCount} Thuật ngữ
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl">
            <span className="block text-[10px] text-slate-400 font-mono font-bold uppercase">SKILLS</span>
            <div className="flex gap-1.5 mt-1.5">
              {currentModule.skills.map((skill) => {
                const Icon = skillIcons[skill];
                return (
                  <span key={skill} className="p-1 bg-white border border-slate-100 rounded text-slate-600 hover:text-slate-900" title={skill}>
                    {Icon ? <Icon className="h-3.5 w-3.5" /> : skill[0]}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl">
            <span className="block text-[10px] text-slate-400 font-mono font-bold uppercase">PROGRESS</span>
            <span className="block text-sm font-bold text-slate-800 mt-1">
              {completedCount} / {moduleLessons.length} Bài ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Detailed Outcomes */}
        <div className="bg-emerald-50/45 p-4 rounded-2xl border border-emerald-50 text-emerald-800 space-y-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <h4 className="text-xs font-bold font-sans uppercase tracking-wider">MỤC TIÊU ĐẦU RA (OUTCOMES)</h4>
          </div>
          <p className="text-xs font-sans font-semibold leading-relaxed">
            {currentModule.outcome}
          </p>
          <p className="text-xs font-sans text-emerald-700/95 leading-relaxed italic border-t border-emerald-100/60 pt-2 mt-2">
            💡 {currentModule.outcomeVi}
          </p>
        </div>
      </div>

      {/* Workspace Explanation & Lesson List */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left column: Study Guide */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
              HƯỚNG DẪN HỌC MODULE
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Tại sao việc báo cáo công việc real-time lại quan trọng? Trong các agency đa quốc gia hoặc team marketing làm việc từ xa, daily sync và cập nhật Slack là những điểm chạm trực tiếp thể hiện tính chuyên nghiệp.
            </p>
            <div className="text-xs text-slate-500 space-y-3 leading-relaxed border-t border-slate-50 pt-3">
              <p className="font-semibold text-slate-700">💡 Lời khuyên khi luyện tập:</p>
              <ul className="list-disc list-inside space-y-1 pl-1">
                <li>Luôn đọc kỹ ngữ cảnh (Context) trước khi làm.</li>
                <li>Ghi nhớ và tập nói to các cấu trúc câu (Formulas).</li>
                <li>Viết câu trả lời đầy đủ, tránh viết tắt hoặc dùng tiếng Việt.</li>
                <li>Xem kĩ nhận xét của Demo Coach để tối ưu ngữ pháp.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Lesson Cards */}
        <div className="md:col-span-8 space-y-4">
          <h3 className="text-lg font-sans font-bold text-slate-950 tracking-tight">
            Danh sách bài thực hành cốt lõi
          </h3>

          <div className="space-y-4">
            {moduleLessons.map((lesson, idx) => {
              const isCompleted = userProgress.completedLessons.includes(lesson.id);
              const MainIcon = skillIcons[lesson.mainSkill] || BookOpen;
              const SecIcon = skillIcons[lesson.secondarySkill] || BookOpen;

              return (
                <div
                  key={lesson.id}
                  className={`bg-white border rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer border-slate-100 hover:border-emerald-200`}
                  onClick={() => onSelectLesson(lesson.id)}
                >
                  <div className="flex items-start gap-4 flex-1">
                    {/* Circle sequence number or Check */}
                    <div className={`p-3 rounded-xl shrink-0 ${
                      isCompleted ? 'bg-emerald-100 text-emerald-700 animate-fade-in' : 'bg-slate-50 text-slate-500'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <PlayCircle className="h-6 w-6 text-emerald-600" />
                      )}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                          BÀI {idx + 1} • {lesson.duration} PHÚT
                        </span>
                        {isCompleted && (
                          <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded">
                            COMPLETED
                          </span>
                        )}
                      </div>
                      
                      <h4 className="text-base font-sans font-bold text-slate-900 tracking-tight">
                        {lesson.title}
                      </h4>
                      
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {lesson.description}
                      </p>

                      {/* Skill badges */}
                      <div className="flex gap-2 pt-1">
                        <span className={`text-[10px] font-mono px-2 py-0.5 border rounded-full flex items-center gap-1 ${
                          skillBadgeColors[lesson.mainSkill]
                        }`}>
                          <MainIcon className="h-3 w-3" />
                          <span>{lesson.mainSkill} (Chính)</span>
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 border rounded-full flex items-center gap-1 ${
                          skillBadgeColors[lesson.secondarySkill]
                        }`}>
                          <SecIcon className="h-3 w-3" />
                          <span>{lesson.secondarySkill} (Phụ)</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-50 flex md:flex-col justify-between items-center md:items-end gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectLesson(lesson.id);
                      }}
                      className={`text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer w-full text-center ${
                        isCompleted 
                          ? 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      {isCompleted ? 'Luyện tập lại' : 'Bắt đầu học'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
