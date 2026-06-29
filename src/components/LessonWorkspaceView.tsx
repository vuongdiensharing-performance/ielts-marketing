import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  BookOpen, 
  Star, 
  Sparkles, 
  MessageSquare, 
  Check, 
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Loader2,
  FileText
} from 'lucide-react';
import { Lesson, LessonStepContent, VocabularyItem, FormulaItem, UserProgress, LessonResponse } from '../types';
import { LESSON_STEP_CONTENTS } from '../data/seedData';

interface LessonWorkspaceViewProps {
  lessonId: string;
  lessons: Lesson[];
  userProgress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onBackToModule: () => void;
}

export default function LessonWorkspaceView({
  lessonId,
  lessons,
  userProgress,
  onUpdateProgress,
  onBackToModule,
}: LessonWorkspaceViewProps) {
  
  const currentLesson = lessons.find(l => l.id === lessonId);
  const stepContent: LessonStepContent | undefined = LESSON_STEP_CONTENTS[lessonId];

  // Steps definition
  const steps = [
    { num: 1, name: 'Context', label: 'Bối cảnh' },
    { num: 2, name: 'Vocabulary', label: 'Từ vựng' },
    { num: 3, name: 'Formula', label: 'Cấu trúc' },
    { num: 4, name: 'Input', label: 'Chuẩn bị' },
    { num: 5, name: 'Practice', label: 'Trắc nghiệm' },
    { num: 6, name: 'Output', label: 'Thực hành' },
    { num: 7, name: 'Feedback', label: 'Coach nhận xét' },
    { num: 8, name: 'Recap', label: 'Tổng kết' },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [inputText, setInputText] = useState(''); // Preliminary thought in step 4
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [practiceSubmitted, setPracticeSubmitted] = useState<Record<string, boolean>>({});
  const [outputText, setOutputText] = useState(''); // The main response in step 6
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [coachFeedback, setCoachFeedback] = useState<any>(null);
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);

  // Load existing progress or draft if available
  useEffect(() => {
    if (userProgress.lessonResponses[lessonId]) {
      const saved = userProgress.lessonResponses[lessonId];
      setPracticeAnswers(saved.practiceAnswers || {});
      setOutputText(saved.outputText || '');
      if (saved.coachFeedback) {
        setCoachFeedback(saved.coachFeedback);
      }
    }
  }, [lessonId, userProgress]);

  if (!currentLesson || !stepContent) {
    return (
      <div className="p-8 text-center max-w-lg mx-auto bg-white border rounded-3xl mt-8">
        <p className="text-slate-500 font-sans">Không tìm thấy nội dung bài học này.</p>
        <button 
          onClick={onBackToModule}
          className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-semibold"
        >
          Quay lại Module
        </button>
      </div>
    );
  }

  const handleStepClick = (stepNum: number) => {
    // Basic guard: let them navigate freely but warn if skipping output
    setCurrentStep(stepNum);
  };

  const toggleVocabBookmark = (vocabId: string) => {
    onUpdateProgress(prev => {
      const isBookmarked = prev.vocabBookmarks.includes(vocabId);
      const newBookmarks = isBookmarked 
        ? prev.vocabBookmarks.filter(id => id !== vocabId)
        : [...prev.vocabBookmarks, vocabId];
      return { ...prev, vocabBookmarks: newBookmarks };
    });
  };

  const toggleFormulaBookmark = (formulaId: string) => {
    onUpdateProgress(prev => {
      const isBookmarked = prev.formulaBookmarks.includes(formulaId);
      const newBookmarks = isBookmarked 
        ? prev.formulaBookmarks.filter(id => id !== formulaId)
        : [...prev.formulaBookmarks, formulaId];
      return { ...prev, formulaBookmarks: newBookmarks };
    });
  };

  const handleOptionSelect = (questionId: string, option: string) => {
    if (practiceSubmitted[questionId]) return; // locked after submission
    setPracticeAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const submitQuestion = (questionId: string) => {
    setPracticeSubmitted(prev => ({ ...prev, [questionId]: true }));
  };

  // The highlight: Intelligent, realistic deterministic "Demo Coach" feedback
  const handleAnalyzeOutput = () => {
    if (!outputText.trim()) {
      alert("Vui lòng nhập câu trả lời thực hành của bạn trước khi gửi phân tích.");
      return;
    }

    setIsSubmittingFeedback(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      // Analyze outputText for key vocabulary words
      const lowerText = outputText.toLowerCase();
      const detectedVocab: string[] = [];
      const missingVocab: string[] = [];

      stepContent.vocabulary.words.forEach(w => {
        const rootWord = w.word.toLowerCase().split(' ')[0]; // creative, ad, a/b
        if (lowerText.includes(rootWord) || lowerText.includes(w.word.toLowerCase())) {
          detectedVocab.push(w.word);
        } else {
          missingVocab.push(w.word);
        }
      });

      // Simple structural analysis
      const wordCount = outputText.split(/\s+/).filter(Boolean).length;
      let score = 75; // baseline score
      
      // Points allocation
      if (detectedVocab.length > 0) score += detectedVocab.length * 6;
      if (wordCount > 15) score += 5;
      if (wordCount > 35) score += 3;
      if (lowerText.includes('currently') || lowerText.includes('middle of') || lowerText.includes('confirm') || lowerText.includes('clarify') || lowerText.includes('yesterday')) {
        score += 8; // used target formula terms
      }

      // Cap at 98
      score = Math.min(score, 98);

      // Strengths & improvements based on exact lesson
      let strengths: string[] = [];
      let improvements: string[] = [];
      let vietnameseCoaching = "";
      let revisedVersion = "";

      if (lessonId === 'a1-m03-l01') {
        strengths = [
          "Sử dụng đúng thì Hiện tại tiếp diễn (Present Continuous) để báo cáo công việc.",
          detectedVocab.length > 0 ? `Đã đưa thuật ngữ chuyên ngành vào bài viết: ${detectedVocab.join(', ')}.` : "Bố cục câu rõ ràng, ngắn gọn.",
          "Văn phong phù hợp với môi trường Slack chuyên nghiệp."
        ];
        improvements = [
          missingVocab.length > 0 ? `Nên lồng ghép thêm thuật ngữ marketing chính như: ${missingVocab.join(', ')}.` : "Có thể tăng độ trôi chảy bằng cách bổ sung thêm mốc thời gian hoàn thành cụ thể (ví dụ: in 30 minutes).",
          "Hãy nhớ viết hoa chữ cái đầu câu và kiểm tra kỹ lỗi chính tả của các danh từ ghép như 'creative brief'."
        ];
        vietnameseCoaching = `Chào bạn! Bài viết của bạn rất tốt, diễn tả được chính xác những gì bạn đang bận rộn thực hiện cho sếp. Bạn đã biết sử dụng thì Hiện tại tiếp diễn để báo cáo. Điểm cộng lớn là văn phong tự nhiên. ${
          missingVocab.length > 0 
            ? `Để tăng tính thuyết phục chuẩn "Marketer làm việc tại Agency", bạn nên đưa thêm các từ khóa như *${missingVocab.join(' / ')}* vào câu.` 
            : "Bài viết này đã cực kỳ chuẩn hóa và chuyên nghiệp rồi!"
        }`;
        revisedVersion = outputText.length > 10 
          ? `Hi, yes! I'm currently drafting the Facebook ad copy variations and matching them with the creative brief. I will send you the drafts for testing in about 30 minutes.`
          : stepContent.output.sampleAnswer;
      } else if (lessonId === 'a1-m03-l02') {
        strengths = [
          "Phân loại các trạng thái công việc (đã xong, đang làm, đang kẹt) khá rành mạch.",
          "Dùng đúng thì Quá khứ đơn (Simple Past) cho công việc đã hoàn thành hôm qua."
        ];
        improvements = [
          "Đảm bảo sử dụng chính xác từ 'pending due to' hoặc 'on hold' khi báo cáo sự kẹt tiến độ (Blocker).",
          "Tránh viết câu quá dài, hãy dùng dấu chấm câu ngăn cách giữa các trạng thái nhiệm vụ."
        ];
        vietnameseCoaching = "Cập nhật tiến độ tuần của bạn rất rõ ràng và chuẩn mô hình Kanban. Việc chia rõ các đầu mục Completed, Ongoing, và Pending giúp các thành viên trong team và Client nắm bắt được ngay lập tức.";
        revisedVersion = "Hi team, here is my weekly update. Yesterday, I completed the monthly ad budget report. I'm currently testing three new Facebook ad sets, and the landing page launch is currently on hold pending client sign-off.";
      } else if (lessonId === 'a1-m03-l03') {
        strengths = [
          "Hỏi lại lịch sự bằng cấu trúc chuẩn, tránh gây cảm giác khó chịu cho đồng nghiệp.",
          "Đưa ra các phương án lựa chọn thông minh để làm rõ (color palette vs CTA button size)."
        ];
        improvements = [
          "Nên nhấn mạnh mục đích hỏi lại là để giúp sửa đổi thiết kế nhanh và chính xác hơn (to ensure we deliver accurate revisions).",
          "Hãy giữ lời chào mở đầu tự nhiên, thân thiện."
        ];
        vietnameseCoaching = "Cách bạn đặt câu hỏi làm rõ (clarification) là kỹ năng vô cùng quan trọng khi làm việc tại agency. Việc đưa ra hai phương án cụ thể (A hoặc B) sẽ giúp Account Manager hoặc Client dễ dàng trả lời thay vì chỉ nói chung chung.";
        revisedVersion = "Hi Giang, regarding the client's request to make the summer banner 'pop more', could you please clarify if they want to change the color palette to be brighter, or if they would like us to increase the size of the CTA button? This will help me revise it accurately today.";
      } else {
        // Stand-up
        strengths = [
          "Bài stand-up chia đủ 3 phần PPP (Progress, Plans, Problems) chuẩn Agile.",
          "Thông tin ngắn gọn, đi thẳng vào số liệu hiệu năng."
        ];
        improvements = [
          "Nên giải thích cụ thể hơn hậu quả của blocker (đang làm chậm việc gì).",
          "Nói to và rõ ràng từng từ chuyên ngành như 'TikTok Ads Manager'."
        ];
        vietnameseCoaching = "Một bài cập nhật Stand-up tuyệt vời! Rất súc tích, chuyên nghiệp, sếp và các kỹ thuật viên trong team nghe xong sẽ hiểu ngay bạn đã làm gì, định làm gì và đang kẹt ở đâu để nhảy vào cứu trợ.";
        revisedVersion = "Hi team, yesterday I completed the monthly ad report. Today, I am focusing on optimizing the Instagram campaign budgets. My main blocker is lacking access to the client's TikTok Ads Manager, which is delaying the launch.";
      }

      const generatedFeedback = {
        score,
        strengths,
        improvements,
        vietnameseCoaching,
        revisedVersion
      };

      setCoachFeedback(generatedFeedback);

      // Save to localStorage progress
      onUpdateProgress(prev => {
        const newResponses = { ...prev.lessonResponses };
        newResponses[lessonId] = {
          id: `${lessonId}_res`,
          lessonId,
          practiceAnswers,
          outputText,
          coachFeedback: generatedFeedback,
          completedAt: new Date().toISOString()
        };

        // Add to completed lessons if not already
        const newCompleted = prev.completedLessons.includes(lessonId)
          ? prev.completedLessons
          : [...prev.completedLessons, lessonId];

        // Give XP point awards for completing the lesson
        const updatedXP = { ...prev.skillXP };
        const skill = currentLesson.mainSkill;
        updatedXP[skill] = (updatedXP[skill] || 0) + 20;
        updatedXP['Vocabulary'] = (updatedXP['Vocabulary'] || 0) + 10;

        return {
          ...prev,
          lessonResponses: newResponses,
          completedLessons: newCompleted,
          skillXP: updatedXP
        };
      });

      setIsSubmittingFeedback(false);
      setCurrentStep(7); // Jump to feedback step automatically
    }, 1800);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-1 lg:p-4">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToModule}
          className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại Module</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-sans">
          <span>Module:</span>
          <strong className="text-slate-700">Real-Time Work Updates</strong>
        </div>
      </div>

      {/* Stepper Header (Clickable progress steps) */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs">
        {/* Steps for desktop */}
        <div className="hidden md:flex justify-between items-center relative">
          {/* Connector line */}
          <div className="absolute left-6 right-6 top-5 h-0.5 bg-slate-100 -z-10" />

          {steps.map((step) => {
            const isActive = currentStep === step.num;
            const isCompleted = currentStep > step.num || (step.num === 7 && coachFeedback);
            return (
              <button
                key={step.num}
                onClick={() => handleStepClick(step.num)}
                className="flex flex-col items-center gap-1.5 focus:outline-none group cursor-pointer z-10"
              >
                <div className={`h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all ${
                  isActive 
                    ? 'bg-emerald-600 border-emerald-600 text-white font-bold scale-110 shadow-xs'
                    : isCompleted
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-700 font-semibold'
                      : 'bg-white border-slate-200 text-slate-400 group-hover:border-slate-300'
                }`}>
                  {isCompleted ? <Check className="h-5 w-5" /> : step.num}
                </div>
                <div className="text-center">
                  <p className={`text-[10px] font-sans font-bold uppercase tracking-wider ${
                    isActive ? 'text-emerald-700' : 'text-slate-400'
                  }`}>
                    {step.name}
                  </p>
                  <p className="text-[9px] font-sans text-slate-400">
                    {step.label}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Steps for mobile (Simplified layout) */}
        <div className="md:hidden flex justify-between items-center">
          <p className="text-xs font-mono font-bold text-slate-400">
            BƯỚC {currentStep}/8: <span className="text-emerald-600">{steps[currentStep-1].name} ({steps[currentStep-1].label})</span>
          </p>
          <div className="flex gap-1">
            {steps.map((step) => (
              <div 
                key={step.num} 
                className={`h-1.5 w-4 rounded-full ${
                  currentStep === step.num 
                    ? 'bg-emerald-600' 
                    : currentStep > step.num 
                      ? 'bg-emerald-200' 
                      : 'bg-slate-100'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* STEP CONTAINER CONTENT */}
      <main id="lesson-step-content" className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-xs min-h-[400px]">
        {/* STEP 1: Context */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-50 pb-4">
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                STEP 1: WORKPLACE CONTEXT
              </span>
              <h3 className="text-xl font-sans font-bold text-slate-900 tracking-tight mt-2">
                Tình huống thực tế (Context & Role)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Tìm hiểu bối cảnh và vai trò của bạn trước khi bắt đầu bài nói/viết.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 space-y-5">
                {/* Scenario box */}
                <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 font-mono">BỐI CẢNH (SCENARIO)</h4>
                  <p className="text-base font-sans font-semibold text-slate-800 leading-relaxed">
                    "{stepContent.context.scenario}"
                  </p>
                  <p className="text-xs font-sans text-emerald-700 italic border-t border-slate-200/50 pt-2 mt-2 leading-relaxed">
                    💡 <strong>Dịch nghĩa:</strong> {stepContent.context.scenarioVi}
                  </p>
                </div>

                {/* Goals */}
                <div className="p-5 border border-slate-100 rounded-2xl space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-400 font-mono">NHIỆM VỤ CỦA BẠN (YOUR GOAL)</h4>
                  <p className="text-sm font-sans text-slate-700 leading-relaxed font-medium">
                    {stepContent.context.goal}
                  </p>
                  <p className="text-xs font-sans text-slate-500 italic leading-relaxed">
                    🎯 <strong>Chi tiết nhiệm vụ:</strong> {stepContent.context.goalVi}
                  </p>
                </div>
              </div>

              <div className="md:col-span-4 space-y-4">
                {/* Role card */}
                <div className="p-4 bg-emerald-50/40 border border-emerald-50 rounded-2xl space-y-2">
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded">
                    VAI TRÒ (YOUR ROLE)
                  </span>
                  <h4 className="text-sm font-bold text-slate-800 font-sans mt-1">
                    {stepContent.context.role}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {stepContent.context.roleVi}
                  </p>
                </div>

                {/* Marketing Focus */}
                <div className="p-4 bg-blue-50/35 border border-blue-100 rounded-2xl space-y-2">
                  <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-100/50 px-2 py-0.5 rounded">
                    MARKETING FOCUS
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                    {stepContent.context.marketingFocus}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Vocabulary */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-50 pb-4">
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                STEP 2: CORE VOCABULARY
              </span>
              <h3 className="text-xl font-sans font-bold text-slate-900 tracking-tight mt-2">
                Thuật ngữ chuyên ngành cốt lõi
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {stepContent.vocabulary.instruction} ({stepContent.vocabulary.instructionVi})
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stepContent.vocabulary.words.map((item) => {
                const isBookmarked = userProgress.vocabBookmarks.includes(item.id);
                return (
                  <div key={item.id} className="border border-slate-100 rounded-2xl p-5 hover:border-slate-200 hover:shadow-xs transition-all bg-white relative flex flex-col justify-between space-y-4">
                    <button
                      onClick={() => toggleVocabBookmark(item.id)}
                      className="absolute right-4 top-4 text-slate-300 hover:text-amber-500 transition-colors focus:outline-none cursor-pointer"
                      title={isBookmarked ? 'Bỏ lưu' : 'Lưu từ vựng'}
                    >
                      <Star className={`h-5 w-5 ${isBookmarked ? 'fill-amber-400 text-amber-500' : ''}`} />
                    </button>

                    <div className="space-y-2">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 font-sans tracking-tight">{item.word}</h4>
                        <span className="text-[10px] font-mono text-slate-400 uppercase italic font-bold">({item.partOfSpeech})</span>
                      </div>
                      
                      <div className="bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-50/50">
                        <span className="text-[9px] font-bold text-emerald-700 block">DỊCH NGHĨA VIỆT:</span>
                        <p className="text-xs text-emerald-900 font-semibold font-sans mt-0.5">{item.vietnameseTranslation}</p>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed font-sans">{item.definition}</p>
                    </div>

                    <div className="border-t border-slate-50 pt-3 space-y-2">
                      <div className="text-[11px] leading-relaxed">
                        <strong className="text-slate-600 block">Ví dụ (Example):</strong>
                        <p className="text-slate-500 italic mt-0.5">"{item.exampleSentence}"</p>
                        <p className="text-slate-400 mt-0.5">→ {item.exampleTranslation}</p>
                      </div>

                      <div className="text-[10px] bg-slate-50 p-2 rounded-lg border border-slate-100 text-slate-500 leading-relaxed">
                        <strong>Marketing Context:</strong> {item.marketingContext}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Formulas */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="border-b border-slate-50 pb-4">
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                STEP 3: SPEAKING & WRITING FORMULAS
              </span>
              <h3 className="text-xl font-sans font-bold text-slate-900 tracking-tight mt-2">
                Cấu trúc câu & Công thức giao tiếp
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {stepContent.formulas.instruction} ({stepContent.formulas.instructionVi})
              </p>
            </div>

            <div className="space-y-5">
              {stepContent.formulas.items.map((item) => {
                const isBookmarked = userProgress.formulaBookmarks.includes(item.id);
                return (
                  <div key={item.id} className="border border-slate-100 rounded-2xl p-5 hover:border-slate-200 transition-all bg-white relative flex flex-col md:flex-row gap-6">
                    <button
                      onClick={() => toggleFormulaBookmark(item.id)}
                      className="absolute right-4 top-4 text-slate-300 hover:text-amber-500 transition-colors focus:outline-none cursor-pointer"
                      title={isBookmarked ? 'Bỏ lưu' : 'Lưu cấu trúc'}
                    >
                      <Star className={`h-5 w-5 ${isBookmarked ? 'fill-amber-400 text-amber-500' : ''}`} />
                    </button>

                    <div className="md:w-1/2 space-y-3">
                      <div>
                        <span className="text-[9px] font-mono text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded uppercase">
                          CẤU TRÚC MẪU
                        </span>
                        <h4 className="text-base font-mono font-bold text-emerald-700 tracking-tight mt-1">
                          {item.structure}
                        </h4>
                      </div>

                      <div className="space-y-1 text-xs">
                        <p className="text-slate-600"><strong>Mục đích sử dụng:</strong> {item.purpose}</p>
                        <p className="text-slate-400">→ {item.purposeVi}</p>
                      </div>
                    </div>

                    <div className="md:w-1/2 md:border-l border-slate-50 md:pl-6 space-y-3 pt-4 md:pt-0">
                      <div className="text-xs space-y-1.5 bg-emerald-50/20 p-3 rounded-xl border border-emerald-50/50">
                        <strong className="text-slate-700 block">Ví dụ thực tế (Workspace Example):</strong>
                        <p className="text-slate-800 font-mono font-medium">"{item.example}"</p>
                        <p className="text-slate-500">→ {item.exampleVi}</p>
                      </div>

                      <div className="text-[11px] text-slate-500 leading-relaxed">
                        💡 <strong>Mẹo dùng:</strong> {item.usageTip}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Input / Thought framing */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
            <div className="border-b border-slate-50 pb-4 text-center">
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                STEP 4: THOUGHT FRAMING
              </span>
              <h3 className="text-xl font-sans font-bold text-slate-900 tracking-tight mt-2">
                Đề cương & Chuẩn bị Ý tưởng
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Hãy dành 1 phút để phác thảo sơ bộ các công việc thực tế của riêng bạn trước khi chính thức viết tiếng Anh.
              </p>
            </div>

            <div className="space-y-5">
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold text-slate-700">CHỈ DẪN CHUẨN BỊ (BRAINSTORMING PROMPT):</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Để viết tốt tiếng Anh công sở, hãy tư duy trước bằng tiếng Việt hoặc từ khóa ngắn về công việc marketing bạn thực hiện gần đây. Ví dụ:
                  <br />- <strong>Completed:</strong> Làm xong ad report / gửi thiết kế sếp duyệt.
                  <br />- <strong>Active/Ongoing:</strong> Đang viết bài cho fanpage / đang test bid thầu.
                  <br />- <strong>Blockers:</strong> Thiếu ảnh / chưa được cấp quyền truy cập tài khoản ad.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 font-sans" htmlFor="thought-notes">
                  Ghi chú nhanh của bạn (Ghi tiếng Việt hoặc từ khóa nháp):
                </label>
                <textarea
                  id="thought-notes"
                  className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-xs text-slate-700 font-sans h-32 focus:outline-none"
                  placeholder="Ví dụ: Đang bận design banner Facebook cho chiến dịch hè. Chờ sếp duyệt brief thiết kế..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>

              <div className="bg-emerald-50/50 border border-emerald-50 text-emerald-800 p-4 rounded-xl text-[11px] flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <p>
                  Ghi chú nháp này giúp bạn sắp xếp mạch suy nghĩ logic. Bước tiếp theo, chúng ta sẽ làm bài kiểm tra trắc nghiệm nhỏ để củng cố ngữ pháp trước khi viết bài chính thức.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Guided Practice */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
            <div className="border-b border-slate-50 pb-4">
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                STEP 5: GUIDED PRACTICE
              </span>
              <h3 className="text-xl font-sans font-bold text-slate-900 tracking-tight mt-2">
                Luyện tập trắc nghiệm củng cố (Quiz)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {stepContent.practice.instruction} ({stepContent.practice.instructionVi})
              </p>
            </div>

            <div className="space-y-8">
              {stepContent.practice.questions.map((q, qidx) => {
                const selectedOption = practiceAnswers[q.id];
                const isSubmitted = practiceSubmitted[q.id];
                const isCorrect = selectedOption === q.correctAnswer;

                return (
                  <div key={q.id} className="border border-slate-100 rounded-2xl p-5 space-y-4 bg-slate-50/40">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                        CÂU HỎI {qidx + 1}
                      </span>
                      <h4 className="text-sm font-sans font-bold text-slate-900 leading-relaxed">
                        {q.prompt}
                      </h4>
                      <p className="text-xs text-slate-400 italic font-sans">
                        {q.promptVi}
                      </p>
                    </div>

                    {/* Options list */}
                    <div className="space-y-2">
                      {q.options?.map((opt) => {
                        const isOptionSelected = selectedOption === opt;
                        let optionStyle = "border-slate-200 hover:bg-slate-50 text-slate-700";
                        
                        if (isOptionSelected) {
                          optionStyle = "border-emerald-500 bg-emerald-50/50 text-emerald-900 font-semibold";
                        }
                        
                        if (isSubmitted) {
                          if (opt === q.correctAnswer) {
                            optionStyle = "border-emerald-500 bg-emerald-100 text-emerald-900 font-bold";
                          } else if (isOptionSelected && !isCorrect) {
                            optionStyle = "border-red-500 bg-red-100 text-red-900";
                          } else {
                            optionStyle = "border-slate-100 opacity-60 text-slate-500";
                          }
                        }

                        return (
                          <button
                            key={opt}
                            disabled={isSubmitted}
                            onClick={() => handleOptionSelect(q.id, opt)}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs font-sans transition-all flex justify-between items-center ${
                              isSubmitted ? 'cursor-default' : 'cursor-pointer'
                            } ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && opt === q.correctAnswer && (
                              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Submit and Answer Feedback block */}
                    {!isSubmitted ? (
                      <button
                        onClick={() => submitQuestion(q.id)}
                        disabled={!selectedOption}
                        className={`text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                          selectedOption 
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs' 
                            : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                        }`}
                      >
                        Nộp câu trả lời
                      </button>
                    ) : (
                      <div className={`p-4 rounded-xl border leading-relaxed text-xs space-y-2 ${
                        isCorrect 
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                          : 'bg-red-50 border-red-100 text-red-800'
                      }`}>
                        <div className="flex items-center gap-1.5 font-bold">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                              <span>Đáp án chính xác! Excellent.</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-4 w-4 text-red-600" />
                              <span>Chưa chính xác. Thử nghiên cứu lý do dưới đây nhé.</span>
                            </>
                          )}
                        </div>
                        <p><strong>Lý do giải thích (English):</strong> {q.explanation}</p>
                        <p className="border-t border-slate-200/50 pt-1.5 mt-1.5 text-slate-600">
                          💡 <strong>Góc giải thích tiếng Việt:</strong> {q.explanationVi}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: Output / Writing Exercise */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
            <div className="border-b border-slate-50 pb-4">
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                STEP 6: MAIN OUTPUT CHALLENGE
              </span>
              <h3 className="text-xl font-sans font-bold text-slate-900 tracking-tight mt-2">
                Thực hành viết tin nhắn công sở (Your Draft)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {stepContent.output.instruction} ({stepContent.output.instructionVi})
              </p>
            </div>

            <div className="space-y-5">
              {/* The prompt block */}
              <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold text-slate-400 font-mono">WORKSPACE CHỈ THỊ (PROMPT)</h4>
                <p className="text-sm font-sans font-semibold text-slate-800 leading-relaxed">
                  "{stepContent.output.prompt}"
                </p>
                <p className="text-xs font-sans text-emerald-700 italic border-t border-slate-200/40 pt-2 leading-relaxed">
                  💡 <strong>Bản dịch tiếng Việt:</strong> {stepContent.output.promptVi}
                </p>
              </div>

              {/* Checklist points to include */}
              <div className="p-4 border border-slate-100 rounded-2xl space-y-2 bg-white">
                <h4 className="text-xs font-bold text-slate-600 font-sans">📌 CÁC ĐIỂM CẦN BAO GỒM TRONG CÂU TRẢ LỜI:</h4>
                <ul className="text-xs text-slate-500 space-y-1.5 pl-2">
                  {stepContent.output.pointsToInclude.map((pt, pidx) => (
                    <li key={pidx} className="flex items-start gap-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* The Input Textarea */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 font-sans" htmlFor="output-textarea">
                    Nhập câu trả lời bằng tiếng Anh của bạn:
                  </label>
                  <button
                    onClick={() => setOutputText(stepContent.output.sampleAnswer)}
                    className="text-[10px] font-semibold text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    💡 Điền mẫu thử nghiệm
                  </button>
                </div>
                <textarea
                  id="output-textarea"
                  className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-slate-800 font-mono h-44 focus:outline-none"
                  placeholder={stepContent.output.placeholder}
                  value={outputText}
                  onChange={(e) => setOutputText(e.target.value)}
                />
                <span className="text-[10px] text-slate-400 font-mono">
                  Độ dài: {outputText.split(/\s+/).filter(Boolean).length} từ.
                </span>
              </div>

              {/* Actions: Submit to AI Coach */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={handleAnalyzeOutput}
                  disabled={isSubmittingFeedback || !outputText.trim()}
                  className={`flex-1 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer text-sm transition-all ${
                    outputText.trim() 
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  }`}
                >
                  {isSubmittingFeedback ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Coach đang chấm điểm...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 fill-current" />
                      <span>Gửi tin nhắn cho Coach phân tích</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShowSampleAnswer(!showSampleAnswer)}
                  className="px-5 py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 font-sans text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>{showSampleAnswer ? 'Ẩn câu trả lời mẫu' : 'Xem mẫu gợi ý'}</span>
                </button>
              </div>

              {/* Sample answer panel */}
              {showSampleAnswer && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 animate-fade-in">
                  <h4 className="text-xs font-bold text-slate-700">CÂU TRẢ LỜI MẪU CHUẨN GIAO TIẾP:</h4>
                  <p className="text-xs font-mono text-slate-800 bg-white p-3 rounded-lg border border-slate-100 select-all leading-relaxed">
                    "{stepContent.output.sampleAnswer}"
                  </p>
                  <p className="text-[10px] text-slate-400 italic leading-relaxed">
                    *Mẹo: Bạn có thể copy câu trả lời mẫu này dán lên khung soạn thảo bên trên để thử nghiệm hệ thống chấm điểm "Demo Coach" thông minh của chúng tôi!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 7: Feedback */}
        {currentStep === 7 && (
          <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
            <div className="border-b border-slate-50 pb-4 text-center">
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                STEP 7: COACH FEEDBACK
              </span>
              <h3 className="text-xl font-sans font-bold text-slate-900 tracking-tight mt-2">
                Đánh giá chi tiết từ AI Coach
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Nhận xét thông minh phân tích cách dùng từ vựng và tối ưu cấu trúc marketing.
              </p>
            </div>

            {coachFeedback ? (
              <div className="space-y-6">
                {/* Score gauge and Overview */}
                <div className="bg-slate-950 text-white p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                  <div className="space-y-2 relative z-10 text-center md:text-left">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-wider uppercase bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/40">
                      FEEDBACK OVERVIEW
                    </span>
                    <h4 className="text-lg font-sans font-bold text-slate-100">
                      Chúc mừng bạn đã hoàn thành bài viết! 🎉
                    </h4>
                    <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                      Coach chấm điểm dựa trên 3 tiêu chí: Ngữ pháp thì động từ, Sử dụng đúng Thuật ngữ chuyên môn, và Văn phong giao tiếp công sở.
                    </p>
                  </div>

                  <div className="flex flex-col items-center shrink-0 z-10 bg-slate-900/80 p-4 rounded-2xl border border-slate-800/60 min-w-[130px]">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">SCORES</span>
                    <span className="text-4xl font-extrabold text-emerald-400 mt-1">
                      {coachFeedback.score}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold font-mono">/ 100 points</span>
                  </div>
                </div>

                {/* Vietnamese Coach explanation */}
                <div className="p-5 bg-emerald-50/45 border border-emerald-50 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <MessageSquare className="h-4.5 w-4.5 text-emerald-600" />
                    <span>HƯỚNG DẪN COACH TIẾNG VIỆT</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    {coachFeedback.vietnameseCoaching}
                  </p>
                </div>

                {/* Strengths & Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div className="p-5 border border-emerald-100 rounded-2xl space-y-3 bg-emerald-50/10">
                    <h5 className="text-xs font-bold text-emerald-800 font-sans tracking-wide uppercase">
                      👍 ĐIỂM TỐT (STRENGTHS)
                    </h5>
                    <ul className="text-xs text-slate-600 space-y-2">
                      {coachFeedback.strengths.map((st: string, sidx: number) => (
                        <li key={sidx} className="flex items-start gap-1.5">
                          <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div className="p-5 border border-amber-100 rounded-2xl space-y-3 bg-amber-50/10">
                    <h5 className="text-xs font-bold text-amber-800 font-sans tracking-wide uppercase">
                      🔧 ĐIỂM CẦN CẢI THIỆN (IMPROVEMENTS)
                    </h5>
                    <ul className="text-xs text-slate-600 space-y-2">
                      {coachFeedback.improvements.map((imp: string, iidx: number) => (
                        <li key={iidx} className="flex items-start gap-1.5">
                          <HelpCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Revised Version */}
                <div className="p-5 border border-slate-200 rounded-2xl space-y-3 bg-slate-50/40">
                  <h5 className="text-xs font-bold text-slate-800 font-sans tracking-wide uppercase">
                    📝 BẢN SỬA ĐỔI TỐI ƯU (RECOMMENDED REVISION)
                  </h5>
                  <p className="text-xs font-mono text-emerald-950 bg-white p-3.5 rounded-xl border border-slate-100 select-all leading-relaxed">
                    "{coachFeedback.revisedVersion}"
                  </p>
                  <p className="text-[10px] text-slate-400 italic">
                    *Mẹo: Hãy đọc to câu sửa đổi trên nhiều lần để rèn luyện trí nhớ cơ bắp và ngữ điệu nói tự nhiên.
                  </p>
                </div>

                {/* Bottom navigation helper */}
                <div className="text-center bg-slate-50 p-4 rounded-xl text-xs text-slate-500">
                  Phản hồi đã được tự động lưu vào mục <strong>Analytics</strong> của bạn. Bấm <strong>Tiếp tục</strong> để chuyển sang bước Tổng kết bài học.
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl space-y-4">
                <AlertCircle className="h-10 w-10 text-slate-300 mx-auto" />
                <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
                  Bạn chưa gửi bài viết thực hành chính thức nào. Hãy quay lại <strong>bước 6 (Thực hành)</strong> để nhập nội dung và bấm gửi nhận xét.
                </p>
                <button
                  onClick={() => setCurrentStep(6)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
                >
                  Quay lại Thực hành (Step 6)
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 8: Recap */}
        {currentStep === 8 && (
          <div className="space-y-6 animate-fade-in max-w-2xl mx-auto text-center py-6">
            <div className="bg-emerald-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto text-emerald-600 mb-2">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                COMPLETED • LESSON ACCOMPLISHED
              </span>
              <h3 className="text-2xl font-sans font-extrabold text-slate-900 tracking-tight">
                Xuất sắc hoàn thành bài học!
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Bạn vừa nạp thêm các thuật ngữ thực tế và công thức giao tiếp để giải quyết tình huống báo cáo công việc real-time.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 max-w-md mx-auto space-y-4 text-left">
              <h4 className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono">
                PHẦN THƯỞNG ĐÃ NHẬN:
              </h4>

              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-100">
                  <span>🚀 Kinh nghiệm {currentLesson.mainSkill} XP:</span>
                  <strong className="text-emerald-600">+20 XP</strong>
                </div>
                <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-100">
                  <span>📚 Từ vựng & Cấu trúc tích lũy:</span>
                  <strong className="text-emerald-600">+10 XP</strong>
                </div>
                <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-slate-100">
                  <span>🔥 Điểm duy trì Streak:</span>
                  <strong className="text-amber-600">Duy trì {userProgress.streakDays} ngày!</strong>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={onBackToModule}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold px-6 py-3 rounded-xl cursor-pointer"
              >
                Trở lại Module chính
              </button>
              <button
                onClick={() => {
                  // Reset for practicing again
                  setCurrentStep(1);
                  setPracticeAnswers({});
                  setPracticeSubmitted({});
                  setInputText('');
                  setOutputText('');
                  setCoachFeedback(null);
                }}
                className="border border-slate-200 text-slate-500 hover:bg-slate-50 font-sans text-xs font-bold px-4 py-3 rounded-xl cursor-pointer"
              >
                Luyện tập lại bài này
              </button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER STEP CONTROLS */}
      <footer id="lesson-step-navigation" className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
          className={`flex items-center gap-1.5 px-4 py-2.5 border rounded-xl font-sans text-xs font-semibold transition-all cursor-pointer ${
            currentStep === 1 
              ? 'border-slate-100 text-slate-300 cursor-not-allowed' 
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Quay lại</span>
        </button>

        <span className="text-xs font-mono font-bold text-slate-400">
          CÂU HỎI & THỰC HÀNH SỐ {currentStep}/8
        </span>

        {currentStep < 8 ? (
          <button
            onClick={() => {
              // Quick validation before advancing from Output to Feedback
              if (currentStep === 6 && !coachFeedback) {
                // Warn or prompt them to submit
                handleAnalyzeOutput();
              } else {
                setCurrentStep(prev => Math.min(8, prev + 1));
              }
            }}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-sans text-xs font-semibold shadow-xs cursor-pointer transition-colors"
          >
            <span>Tiếp theo</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={onBackToModule}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-sans text-xs font-semibold shadow-xs cursor-pointer transition-colors"
          >
            <span>Hoàn thành bài học</span>
            <Check className="h-4 w-4" />
          </button>
        )}
      </footer>
    </div>
  );
}
