import React from 'react';
import { 
  TrendingUp, 
  Flame, 
  CheckCircle2, 
  Star, 
  BookOpen, 
  Volume2, 
  Mic, 
  FileText, 
  PenTool,
  Calendar,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { UserProgress, Skill } from '../types';
import { SEED_VOCABULARY, LESSONS } from '../data/seedData';

interface AnalyticsViewProps {
  userProgress: UserProgress;
  onTabChange: (tab: string) => void;
}

export default function AnalyticsView({
  userProgress,
  onTabChange,
}: AnalyticsViewProps) {
  
  // Calculate analytics metrics
  const completedLessonsCount = userProgress.completedLessons.length;
  const totalLessonsCount = LESSONS.length;
  const overallProgress = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;
  
  const starredVocabCount = userProgress.vocabBookmarks.length;
  const starredFormulaCount = userProgress.formulaBookmarks.length;

  const skillXP = userProgress.skillXP;
  const skills: Skill[] = ['Listening', 'Speaking', 'Reading', 'Writing', 'Vocabulary'];

  // Skill colors & icons
  const skillDetails: Record<Skill, { color: string; icon: any; barColor: string }> = {
    Listening: { color: 'text-blue-600 bg-blue-50', icon: Volume2, barColor: 'bg-blue-500' },
    Speaking: { color: 'text-purple-600 bg-purple-50', icon: Mic, barColor: 'bg-purple-500' },
    Reading: { color: 'text-emerald-600 bg-emerald-50', icon: FileText, barColor: 'bg-emerald-500' },
    Writing: { color: 'text-orange-600 bg-orange-50', icon: PenTool, barColor: 'bg-orange-500' },
    Vocabulary: { color: 'text-teal-600 bg-teal-50', icon: BookOpen, barColor: 'bg-teal-500' },
  };

  // Find max XP to scale the SVG chart bars proportionally
  const maxXP = Math.max(...skills.map(s => skillXP[s] || 0), 20);

  // Get completed lessons lists with details
  const completedList = LESSONS.filter(l => userProgress.completedLessons.includes(l.id)).map(l => {
    const response = userProgress.lessonResponses[l.id];
    return {
      ...l,
      score: response?.coachFeedback?.score || 90,
      completedAt: response?.completedAt ? new Date(response.completedAt).toLocaleDateString('vi-VN') : 'Gần đây'
    };
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-1 lg:p-4 animate-fade-in">
      {/* Page Header */}
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-2xl font-sans font-bold text-slate-950 tracking-tight">
          Progress & Analytics (Tiến độ & Phân tích)
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Đo lường chi tiết phân rã 4 kỹ năng chính và tích lũy từ vựng của bạn để đảm bảo hiệu suất giao tiếp thực tế.
        </p>
      </div>

      {/* Grid: Big Progress Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Progress Ring Card */}
        <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">ROADMAP PROGRESS</span>
            <h4 className="text-xl font-bold font-sans text-slate-900">{overallProgress}% Hoàn thành</h4>
            <p className="text-xs text-slate-400 font-sans">
              Đã xong {completedLessonsCount} trên tổng số {totalLessonsCount} bài học.
            </p>
          </div>

          {/* Simple Circular Progress with SVG */}
          <div className="relative h-16 w-16 shrink-0 flex items-center justify-center">
            <svg className="absolute transform -rotate-90 w-full h-full">
              <circle cx="32" cy="32" r="28" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
              <circle cx="32" cy="32" r="28" stroke="#059669" strokeWidth="6" fill="transparent" 
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - overallProgress / 100)}`}
              />
            </svg>
            <span className="text-xs font-bold font-sans text-emerald-700">{overallProgress}%</span>
          </div>
        </div>

        {/* Streak card */}
        <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs flex items-center gap-4">
          <div className="p-4 bg-amber-50 rounded-2xl text-amber-700 shrink-0">
            <Flame className="h-7 w-7 fill-current" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">STREAK DAY TRACKER</span>
            <h4 className="text-xl font-bold font-sans text-slate-900">{userProgress.streakDays} ngày liên tục</h4>
            <p className="text-xs text-slate-400 font-sans">
              Duy trì nhịp học hàng ngày để tạo phản xạ cơ bắp tiếng Anh tốt nhất.
            </p>
          </div>
        </div>

        {/* Vocabulary bookmarks card */}
        <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xs flex items-center gap-4">
          <div className="p-4 bg-teal-50 rounded-2xl text-teal-700 shrink-0">
            <Star className="h-7 w-7 fill-current" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">BOOKMARKED ITEMS</span>
            <h4 className="text-xl font-bold font-sans text-slate-900">
              {starredVocabCount} Từ • {starredFormulaCount} Cấu trúc
            </h4>
            <p className="text-xs text-slate-400 font-sans">
              Các mục lưu trữ được đồng bộ trực tiếp với flashcard và ngân hàng ôn tập.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Skills Breakdown Chart & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: SVG Bar Chart for Skills */}
        <div className="md:col-span-7 bg-white border border-slate-100 p-6 rounded-3xl shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-sans tracking-tight">
              Biểu đồ tích lũy kinh nghiệm (Skill XP Chart)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Phân tích kỹ năng tiếng Anh marketing dựa trên kinh nghiệm thực hành của bạn.
            </p>
          </div>

          {/* SVG-based beautiful responsive bar chart */}
          <div className="space-y-4 pt-2">
            {skills.map((skill) => {
              const score = skillXP[skill] || 0;
              const detail = skillDetails[skill];
              const percent = maxXP > 0 ? (score / maxXP) * 100 : 0;
              const SkillIcon = detail.icon;

              return (
                <div key={skill} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded-md ${detail.color}`}>
                        <SkillIcon className="h-3.5 w-3.5" />
                      </div>
                      <span className="font-sans font-bold text-slate-700">{skill}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-500">{score} XP</span>
                  </div>

                  {/* Bar */}
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden relative">
                    <div 
                      className={`${detail.barColor} h-full rounded-full transition-all duration-700`}
                      style={{ width: `${Math.max(percent, 4)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-500 leading-relaxed flex items-start gap-2">
            <Sparkles className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong>Nhận xét từ Coach:</strong> Bạn đang rèn luyện đồng đều 4 kỹ năng. Đặc biệt, việc hoàn thành bài tập tin nhắn đã giúp tăng nhanh XP kỹ năng <strong>Writing</strong>. Tiếp tục duy trì nhé!
            </p>
          </div>
        </div>

        {/* Right: Completed Lessons Activity */}
        <div className="md:col-span-5 bg-white border border-slate-100 p-6 rounded-3xl shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-sans tracking-tight">
              Lịch sử bài học đã hoàn thành
            </h3>

            {completedList.length > 0 ? (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {completedList.map((lesson) => {
                  const detail = skillDetails[lesson.mainSkill] || { color: 'text-slate-600 bg-slate-50' };
                  return (
                    <div key={lesson.id} className="flex items-center justify-between p-3 border border-slate-50 rounded-xl hover:border-slate-100 bg-slate-50/30">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-lg ${detail.color}`}>
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{lesson.title}</h4>
                          <span className="text-[10px] text-slate-400 font-sans block mt-0.5">
                            Hoàn thành: {lesson.completedAt}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {lesson.score}đ
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center p-8 border border-dashed border-slate-200 rounded-2xl space-y-2">
                <Calendar className="h-8 w-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-400 leading-relaxed">
                  Bạn chưa hoàn thành bài học chính thức nào trong Module M03.
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => onTabChange('roadmap')}
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <span>Đến Roadmap học tập</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
