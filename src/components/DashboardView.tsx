import React from 'react';
import { 
  Play, 
  Map, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  ArrowRight,
  TrendingUp,
  Volume2,
  Mic,
  FileText,
  PenTool
} from 'lucide-react';
import { Module, Lesson, UserProgress, Skill } from '../types';

interface DashboardViewProps {
  userProgress: UserProgress;
  modules: Module[];
  lessons: Lesson[];
  onTabChange: (tab: string) => void;
  onSelectModule: (moduleId: string) => void;
  onSelectLesson: (lessonId: string) => void;
}

export default function DashboardView({
  userProgress,
  modules,
  lessons,
  onTabChange,
  onSelectModule,
  onSelectLesson,
}: DashboardViewProps) {
  
  // Calculate stats
  const totalLessons = lessons.length;
  const completedCount = userProgress.completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  
  const activeModule = modules.find(m => m.id === 'a1-m03'); // Real-Time Work Updates
  const m03Lessons = lessons.filter(l => l.moduleId === 'a1-m03');
  const m03CompletedCount = m03Lessons.filter(l => userProgress.completedLessons.includes(l.id)).length;
  const m03Percent = m03Lessons.length > 0 ? Math.round((m03CompletedCount / m03Lessons.length) * 100) : 0;

  // Skill breakdown cards
  const skillIcons: Record<Skill, any> = {
    Listening: Volume2,
    Speaking: Mic,
    Reading: FileText,
    Writing: PenTool,
    Vocabulary: BookOpen,
  };

  const skillColors: Record<Skill, string> = {
    Listening: 'bg-blue-50 border-blue-100 text-blue-700 hover:bg-blue-100/50',
    Speaking: 'bg-purple-50 border-purple-100 text-purple-700 hover:bg-purple-100/50',
    Reading: 'bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100/50',
    Writing: 'bg-orange-50 border-orange-100 text-orange-700 hover:bg-orange-100/50',
    Vocabulary: 'bg-teal-50 border-teal-100 text-teal-700 hover:bg-teal-100/50',
  };

  const skillXp = userProgress.skillXP;

  // Tip of the day content (realistic marketing English coaching)
  const tipOfTheDay = {
    expression: "We are seeing a downward trend in our CTR...",
    translation: "Chúng ta đang thấy xu hướng giảm ở tỷ lệ nhấp chuột (CTR)...",
    context: "Sử dụng khi báo cáo số liệu chiến dịch bị sụt giảm trong cuộc họp hiệu quả (Performance meeting). Tránh nói 'The CTR is very bad, it is down'. Thay vào đó, hãy nói cụ thể nguyên nhân và giải pháp đi kèm.",
    example: "We are seeing a downward trend in our CTR for Facebook Ads, so we are launching three new creative variations today to combat ad fatigue.",
    exampleVi: "Chúng ta đang thấy xu hướng giảm ở CTR quảng cáo Facebook, vì vậy hôm nay chúng ta sẽ chạy 3 biến thể nội dung mới để chống hiện tượng nhàm chán quảng cáo."
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-1 lg:p-4">
      {/* Welcome Banner */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 bg-emerald-500/5 h-36 w-36 rounded-full -mr-8 -mt-8"></div>
        <div className="relative z-10 space-y-2">
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
            MARKETING WORKSPACE
          </span>
          <h2 className="text-2xl lg:text-3xl font-sans font-bold text-slate-950 tracking-tight">
            Chào mừng bạn quay lại học tập! 👋
          </h2>
          <p className="text-sm text-slate-500 max-w-xl leading-relaxed">
            Hôm nay bạn muốn mài giũa kỹ năng tiếng Anh nào để tối ưu công việc? Lộ trình của bạn đã được thiết kế riêng cho các tình huống làm việc thực tế tại Agency & Client.
          </p>
        </div>

        {/* Quick Stats Summary */}
        <div className="flex gap-4 sm:gap-6 shrink-0 z-10 border-t md:border-t-0 border-slate-50 pt-4 md:pt-0">
          <div className="text-center p-3 bg-slate-50 rounded-2xl min-w-[80px]">
            <span className="block text-xl font-bold text-slate-900">{userProgress.streakDays}</span>
            <span className="text-[10px] text-slate-400 font-medium">🔥 Streak Days</span>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-2xl min-w-[80px]">
            <span className="block text-xl font-bold text-emerald-600">{completedCount}</span>
            <span className="text-[10px] text-slate-400 font-medium">✅ Completed</span>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-2xl min-w-[80px]">
            <span className="block text-xl font-bold text-blue-600">{userProgress.vocabBookmarks.length}</span>
            <span className="text-[10px] text-slate-400 font-medium">🔖 Bookmarks</span>
          </div>
        </div>
      </div>

      {/* Grid: Resume Learning + Marketing Tip of the Day */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Card: Active Module Resume */}
        <div className="md:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold uppercase">
                Đang học • {activeModule?.code}
              </span>
              <span className="text-xs text-slate-400 font-medium font-sans">
                Tiến độ: {m03CompletedCount}/{m03Lessons.length} bài ({m03Percent}%)
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 font-sans tracking-tight">
                {activeModule?.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Mục tiêu: {activeModule?.outcome}
              </p>
              <p className="text-xs text-emerald-600/90 leading-relaxed font-sans italic bg-emerald-50/30 p-2.5 rounded-lg border border-emerald-50">
                💡 {activeModule?.outcomeVi}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${m03Percent}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => activeModule && onSelectModule(activeModule.id)}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>{m03Percent > 0 ? 'Học tiếp Module' : 'Bắt đầu Module'}</span>
            </button>
            <button
              onClick={() => onTabChange('roadmap')}
              className="px-4 py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 font-sans text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Map className="h-4 w-4" />
              <span>Xem lộ trình toàn bộ</span>
            </button>
          </div>
        </div>

        {/* Right Card: Tip of the Day */}
        <div className="md:col-span-5 bg-slate-900 text-white border border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-400">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">MARKETING ENGLISH TIP</span>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-sm font-mono font-semibold text-emerald-300">
                {tipOfTheDay.expression}
              </h4>
              <p className="text-xs text-slate-400 font-sans">
                {tipOfTheDay.translation}
              </p>
            </div>

            <div className="text-[11px] text-slate-300 leading-relaxed space-y-1 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
              <span className="font-semibold text-white block">💡 Coaching Tiếng Việt:</span>
              <p>{tipOfTheDay.context}</p>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400">VÍ DỤ GIAO TIẾP:</span>
            <p className="text-xs font-mono text-slate-200 bg-slate-950 p-2 rounded border border-slate-800 leading-relaxed italic">
              "{tipOfTheDay.example}"
            </p>
          </div>
        </div>
      </div>

      {/* Skills Hub Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-sans font-bold text-slate-900 tracking-tight">
            Skill Labs — Luyện tập 4 kỹ năng
          </h3>
          <button 
            onClick={() => onTabChange('skills')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Vào Skill Labs</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {(['Listening', 'Speaking', 'Reading', 'Writing', 'Vocabulary'] as Skill[]).map((skill) => {
            const Icon = skillIcons[skill];
            const colorClass = skillColors[skill];
            const score = skillXp[skill] || 0;
            return (
              <button
                key={skill}
                onClick={() => onTabChange(skill === 'Vocabulary' ? 'vocabulary' : 'skills')}
                className={`border rounded-2xl p-4 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between h-28 ${colorClass}`}
              >
                <div className="flex items-center justify-between w-full">
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="text-[10px] font-mono font-bold bg-white/60 px-1.5 py-0.2 rounded">
                    XP: {score}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-sans font-bold tracking-tight text-slate-900">{skill}</h4>
                  <span className="text-[10px] text-slate-500 font-sans block mt-0.5">
                    {skill === 'Listening' && 'Luyện Nghe Brief'}
                    {skill === 'Speaking' && 'Luyện Stand-up & Call'}
                    {skill === 'Reading' && 'Đọc Dashboard/Tài liệu'}
                    {skill === 'Writing' && 'Viết Slack & Email'}
                    {skill === 'Vocabulary' && 'Kho từ vựng & cấu trúc'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lesson List Quick Access for A1-M03 */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-50 pb-3">
          <div>
            <h3 className="text-lg font-sans font-bold text-slate-900 tracking-tight">
              Danh sách bài học trong Module M03
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Tập trung hoàn toàn vào các tình huống thực tế để báo cáo tiến độ công việc.
            </p>
          </div>
          <button 
            onClick={() => onSelectModule('a1-m03')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Chi tiết Module</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {m03Lessons.map((lesson) => {
            const isCompleted = userProgress.completedLessons.includes(lesson.id);
            const MainIcon = skillIcons[lesson.mainSkill] || BookOpen;
            
            return (
              <div 
                key={lesson.id} 
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 border border-slate-100 rounded-2xl hover:border-slate-200 transition-colors gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${
                    isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-50 text-slate-500'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <MainIcon className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-sans font-bold text-slate-800">{lesson.title}</h4>
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        isCompleted ? 'bg-emerald-100/60 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isCompleted ? 'COMPLETED' : `${lesson.duration} mins`}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed max-w-xl">
                      {lesson.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-[10px] text-slate-400 font-sans hidden md:inline">
                    Kỹ năng: <strong className="text-slate-600">{lesson.mainSkill}</strong> + {lesson.secondarySkill}
                  </span>
                  <button
                    onClick={() => onSelectLesson(lesson.id)}
                    className={`text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                      isCompleted 
                        ? 'border border-slate-200 text-slate-500 hover:bg-slate-50' 
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    {isCompleted ? 'Luyện tập lại' : 'Vào học ngay'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
