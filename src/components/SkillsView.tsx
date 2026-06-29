import React from 'react';
import { Volume2, Mic, FileText, PenTool, ArrowRight, Play, Sparkles } from 'lucide-react';
import { Skill } from '../types';

interface SkillsViewProps {
  onSelectLesson: (lessonId: string) => void;
}

export default function SkillsView({ onSelectLesson }: SkillsViewProps) {
  
  const skillLabs = [
    {
      id: 'listening-lab',
      skill: 'Listening' as Skill,
      title: 'Listening Lab (Phòng Luyện Nghe)',
      badge: 'Luyện Nghe Brief',
      desc: 'Luyện nghe hiểu các yêu cầu công việc nhanh, tóm tắt ý kiến khách hàng, và nhận biết các thuật ngữ mấu chốt trong cuộc họp team.',
      colorClass: 'border-blue-100 bg-blue-50 text-blue-700 hover:border-blue-300',
      pillClass: 'bg-blue-100 text-blue-800',
      targetLessonId: 'a1-m03-l03', // Links to Lesson 3 (Ask for Clarification - Main: Listening)
      targetLessonTitle: 'Bài 3: Ask for Clarification and Support',
      duration: '25 mins'
    },
    {
      id: 'speaking-lab',
      skill: 'Speaking' as Skill,
      title: 'Speaking Lab (Phòng Luyện Nói)',
      badge: 'Luyện Stand-up & Call',
      desc: 'Luyện phát âm chuẩn xác các số liệu marketing, báo cáo tiến độ trôi chảy trong buổi họp Scrum, và phản xạ nói tiếng Anh công sở tự nhiên.',
      colorClass: 'border-purple-100 bg-purple-50 text-purple-700 hover:border-purple-300',
      pillClass: 'bg-purple-100 text-purple-800',
      targetLessonId: 'a1-m03-l01', // Links to Lesson 1 (What are you working on now - Main: Speaking)
      targetLessonTitle: 'Bài 1: What Are You Working On Now?',
      duration: '20 mins'
    },
    {
      id: 'reading-lab',
      skill: 'Reading' as Skill,
      title: 'Reading Lab (Phòng Luyện Đọc)',
      badge: 'Đọc Dashboard & Brief',
      desc: 'Luyện đọc hiểu bảng dự án Asana/Trello, phân tích các chỉ số báo cáo CTR/CPC, và giải mã tài liệu yêu cầu sáng tạo (creative brief) từ khách hàng.',
      colorClass: 'border-emerald-100 bg-emerald-50 text-emerald-700 hover:border-emerald-300',
      pillClass: 'bg-emerald-100 text-emerald-800',
      targetLessonId: 'a1-m03-l02', // Links to Lesson 2 (Completed/Ongoing/Pending - Main: Reading)
      targetLessonTitle: 'Bài 2: Completed, Ongoing, and Pending Tasks',
      duration: '25 mins'
    },
    {
      id: 'writing-lab',
      skill: 'Writing' as Skill,
      title: 'Writing Lab (Phòng Luyện Viết)',
      badge: 'Viết Slack & Email',
      desc: 'Luyện soạn thảo tin nhắn công sở súc tích, viết email báo cáo tiến độ rành mạch, và ghi chép biên bản cuộc họp marketing bằng tiếng Anh chuyên nghiệp.',
      colorClass: 'border-orange-100 bg-orange-50 text-orange-700 hover:border-orange-300',
      pillClass: 'bg-orange-100 text-orange-800',
      targetLessonId: 'a1-m03-l04', // Links to Lesson 4 (Daily standup - Main: Writing)
      targetLessonTitle: 'Bài 4: Daily Stand-up Update',
      duration: '30 mins'
    }
  ];

  const skillIcons: Record<Skill, any> = {
    Listening: Volume2,
    Speaking: Mic,
    Reading: FileText,
    Writing: PenTool,
    Vocabulary: Volume2
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-1 lg:p-4 animate-fade-in">
      {/* Header section */}
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-2xl font-sans font-bold text-slate-950 tracking-tight">
          Skill Labs (Phòng thực hành 4 kỹ năng)
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Phát triển toàn diện 4 kỹ năng giao tiếp tiếng Anh công sở. Các phòng thực hành được liên kết trực tiếp với các tình huống làm việc thực tế trong lộ trình học.
        </p>
      </div>

      {/* Intro visual banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 bg-emerald-500/10 h-40 w-40 rounded-full -mr-8 -mb-8"></div>
        
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase">PRACTICAL SCENARIO LEARNING</span>
          </div>
          <h3 className="text-xl lg:text-2xl font-sans font-extrabold tracking-tight">
            Học thông qua giải quyết vấn đề (Task-Based Learning)
          </h3>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Chúng tôi không dạy các mẫu ngữ pháp khô khan. Mỗi Skill Lab dẫn dắt bạn trực tiếp nhập vai giải quyết các nhiệm vụ marketing thực tiễn: từ việc trả lời tin nhắn Slack của sếp đến viết email làm rõ brief cho client.
          </p>
        </div>

        <span className="text-[10px] font-mono font-bold border border-slate-700 bg-slate-800/60 px-3 py-1.5 rounded-full uppercase shrink-0">
          🔥 ACTIVE SYSTEM
        </span>
      </div>

      {/* Cards list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillLabs.map((lab) => {
          const IconComponent = skillIcons[lab.skill];
          return (
            <div
              key={lab.id}
              className={`border rounded-3xl p-6 flex flex-col justify-between h-[280px] transition-all duration-350 cursor-pointer shadow-xs ${lab.colorClass}`}
              onClick={() => onSelectLesson(lab.targetLessonId)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between w-full">
                  <div className={`p-3 rounded-2xl bg-white shadow-xs`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${lab.pillClass}`}>
                    {lab.badge}
                  </span>
                </div>

                <div className="space-y-1.5 text-left">
                  <h3 className="text-lg font-sans font-extrabold tracking-tight text-slate-900">
                    {lab.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-3">
                    {lab.desc}
                  </p>
                </div>
              </div>

              {/* Connected Lesson Link card */}
              <div className="bg-white/75 p-3 rounded-2xl border border-white/50 flex items-center justify-between hover:bg-white transition-colors">
                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono text-slate-400 font-bold block">BÀI THỰC HÀNH KẾT NỐI:</span>
                  <span className="text-xs font-sans font-bold text-slate-800 line-clamp-1">
                    {lab.targetLessonTitle}
                  </span>
                </div>
                
                <span className="bg-slate-900 hover:bg-emerald-700 text-white p-2 rounded-xl transition-all flex items-center gap-1 text-[10px] font-bold">
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Học {lab.duration}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
