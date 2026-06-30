import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  HelpCircle, 
  MessageSquare,
  BookmarkCheck,
  AlertCircle,
  TrendingUp,
  BrainCircuit,
  Eye
} from 'lucide-react';
import { VocabularyItem, UserProgress } from '../types';
import { SEED_VOCABULARY } from '../data/seedData';

interface ReviewViewProps {
  userProgress: UserProgress;
}

export default function ReviewView({ userProgress }: ReviewViewProps) {
  
  const [reviewMode, setReviewMode] = useState<'flashcards' | 'scenarios'>('flashcards');
  const [filterCategory, setFilterCategory] = useState<'all' | 'marketing' | 'family-life'>('all');

  // Flashcards state
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCards, setReviewedCards] = useState<Record<string, 'mastered' | 'failed'>>({});

  // Scenario state
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [scenarioInput, setScenarioInput] = useState('');
  const [scenarioFeedback, setScenarioFeedback] = useState<any>(null);
  const [scenarioSubmitted, setScenarioSubmitted] = useState(false);

  // Filter vocabulary by category
  const filteredVocabulary = SEED_VOCABULARY.filter(v => {
    if (filterCategory === 'marketing') {
      return !v.tags?.includes('family-life');
    }
    if (filterCategory === 'family-life') {
      return v.tags?.includes('family-life');
    }
    return true;
  });

  // List of words to review (prioritize starred, fall back to all if none are starred)
  const bookmarkedWords = filteredVocabulary.filter(v => userProgress.vocabBookmarks.includes(v.id));
  const flashcardWords = bookmarkedWords.length > 0 ? bookmarkedWords : filteredVocabulary;

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % flashcardWords.length);
    }, 150);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev - 1 + flashcardWords.length) % flashcardWords.length);
    }, 150);
  };

  const markCardStatus = (wordId: string, status: 'mastered' | 'failed') => {
    setReviewedCards(prev => ({ ...prev, [wordId]: status }));
    handleNextCard();
  };

  // Scenario data
  const scenarios = [
    {
      id: 'sc_1',
      category: 'marketing',
      sender: 'Client (Khách hàng)',
      message: '"We need to increase engagement with cool visuals immediately for our summer sales campaign."',
      messageVi: '"Chúng ta cần tăng tương tác bằng hình ảnh chất ngay lập tức cho chiến dịch bán hàng hè."',
      coachingTip: "Yêu cầu 'cool visuals' rất mơ hồ. Hãy lịch sự hỏi lại xem khách hàng thích phong cách thiết kế rực rỡ (vibrant style) hay tối giản (minimalist design) và xin 2-3 ảnh thương hiệu mẫu.",
      sampleKeywords: ['clarify', 'visuals', 'reference', 'minimalist', 'style', 'style guide', 'vibrant'],
      sampleOutput: "To align with your brand, could you please clarify what style of visuals you prefer? Sharing 2-3 reference brands or design styles would be extremely helpful."
    },
    {
      id: 'sc_2',
      category: 'marketing',
      sender: 'Marketing Manager (Sếp)',
      message: '"I need a quick Slack update on the TikTok summer campaign ad copy right now!"',
      messageVi: '"Anh cần một cập nhật nhanh trên Slack về văn bản quảng cáo chiến dịch hè trên TikTok ngay!"',
      coachingTip: "Sếp đang vội. Hãy dùng thì Hiện tại tiếp diễn (Present Continuous) kèm cấu trúc 'currently drafting' hoặc 'in the middle of' để sếp yên tâm bạn đang trực tiếp viết nội dung.",
      sampleKeywords: ['drafting', 'working on', 'copy', 'middle of', 'ad copy', 'in 15 minutes', 'minutes'],
      sampleOutput: "Hi! I'm currently drafting the TikTok ad copy variations and checking them against our creative brief. I should be able to send them over in about 15 minutes."
    },
    {
      id: 'sc_3',
      category: 'family-life',
      sender: 'Partner (Vợ/Chồng)',
      message: '"Tomorrow is going to be very busy. Can we coordinate our schedule for the morning?"',
      messageVi: '"Ngày mai sẽ rất bận rộn. Chúng ta có thể phối hợp lịch trình cho buổi sáng được không?"',
      coachingTip: "Khi phối hợp lịch trình buổi sáng bận rộn với bạn đời, hãy dùng các mẫu câu đề xuất nhẹ nhàng hoặc câu hỏi lịch sự như 'I will take the children...' và 'Could you help me with...' để tạo không khí gia đình ấm áp.",
      sampleKeywords: ['laundry', 'take', 'cook', 'grocery', 'help me', 'will', 'could you', 'breakfast'],
      sampleOutput: "Don't worry honey. Tomorrow morning, I will take the kids to school. Could you please help me buy some groceries on your way home?"
    }
  ];

  const filteredScenarios = scenarios.filter(s => {
    if (filterCategory === 'marketing') return s.category === 'marketing';
    if (filterCategory === 'family-life') return s.category === 'family-life';
    return true;
  });

  const currentScenario = filteredScenarios[currentScenarioIndex] || filteredScenarios[0];

  const handleScenarioSubmit = () => {
    if (!scenarioInput.trim() || !currentScenario) return;

    // Evaluate input text
    const lowerInput = scenarioInput.toLowerCase();
    const matches = currentScenario.sampleKeywords.filter(k => lowerInput.includes(k));
    const score = 55 + (matches.length * 12) + (scenarioInput.length > 25 ? 10 : 0);
    const finalScore = Math.min(score, 98);

    setScenarioFeedback({
      score: finalScore,
      matches,
      praise: finalScore >= 80 ? "Xuất sắc! Lời hồi đáp chuẩn chuyên nghiệp, lịch sự và đúng trọng tâm công việc." : "Khá tốt! Bạn đã diễn đạt được ý, tuy nhiên hãy chú ý thêm các từ khóa chuyên ngành để tạo độ tin cậy cao hơn.",
      coachNotes: finalScore >= 80 
        ? "Bạn đã biết cách cụ thể hóa các thuật ngữ trừu tượng và sử dụng ngữ điệu vô cùng khéo léo." 
        : `Để nâng cấp câu này, bạn nên thử sử dụng các từ khóa như: "${currentScenario.sampleKeywords.slice(0, 3).join(', ')}" để sếp hoặc khách hàng dễ trả lời.`
    });
    setScenarioSubmitted(true);
  };

  const handleNextScenario = () => {
    setScenarioInput('');
    setScenarioFeedback(null);
    setScenarioSubmitted(false);
    setCurrentScenarioIndex((prev) => (prev + 1) % filteredScenarios.length);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-1 lg:p-4 animate-fade-in">
      {/* Page Header */}
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-2xl font-sans font-bold text-slate-950 tracking-tight">
          Review Center (Phòng Ôn tập thông minh)
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Tối ưu hóa khả năng ghi nhớ dài hạn thông qua phương pháp lặp lại ngắt quãng (Spaced Repetition) và phản xạ hội thoại thực tế.
        </p>
      </div>

      {/* Mode selectors */}
      <div className="flex gap-4 p-1.5 bg-slate-50 rounded-2xl border border-slate-100 max-w-sm">
        <button
          onClick={() => setReviewMode('flashcards')}
          className={`flex-1 py-2 text-xs font-sans font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            reviewMode === 'flashcards'
              ? 'bg-white text-emerald-800 shadow-xs border border-slate-100'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <BrainCircuit className="h-4 w-4" />
          <span>Thẻ từ vựng (Flashcards)</span>
        </button>

        <button
          onClick={() => setReviewMode('scenarios')}
          className={`flex-1 py-2 text-xs font-sans font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            reviewMode === 'scenarios'
              ? 'bg-white text-emerald-800 shadow-xs border border-slate-100'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Luyện phản xạ tình huống</span>
        </button>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-3 border-b border-slate-100">
        <span className="text-xs text-slate-400 font-sans font-medium mr-2">Bộ lọc chủ đề:</span>
        <button
          onClick={() => {
            setFilterCategory('all');
            setCurrentCardIndex(0);
            setCurrentScenarioIndex(0);
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold cursor-pointer transition-all ${
            filterCategory === 'all'
              ? 'bg-slate-950 text-white'
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
        >
          Tất cả từ & Tình huống
        </button>
        <button
          onClick={() => {
            setFilterCategory('marketing');
            setCurrentCardIndex(0);
            setCurrentScenarioIndex(0);
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold cursor-pointer transition-all ${
            filterCategory === 'marketing'
              ? 'bg-emerald-600 text-white font-semibold'
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
        >
          Marketing English
        </button>
        <button
          onClick={() => {
            setFilterCategory('family-life');
            setCurrentCardIndex(0);
            setCurrentScenarioIndex(0);
          }}
          className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold cursor-pointer transition-all ${
            filterCategory === 'family-life'
              ? 'bg-sky-600 text-white font-semibold'
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
          }`}
        >
          Family Life Practice
        </button>
      </div>

      {/* 1. FLASHCARDS EXPERIENCE */}
      {reviewMode === 'flashcards' && (
        <div className="space-y-6 max-w-xl mx-auto">
          {bookmarkedWords.length === 0 && (
            <div className="bg-amber-50 border border-amber-100 text-amber-800 px-4 py-3 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>
                Bạn chưa lưu (star) thuật ngữ nào. Hệ thống đang hiển thị <strong>tất cả từ vựng</strong> hiện có để bạn ôn tập.
              </p>
            </div>
          )}

          {/* Flashcard container */}
          <div 
            className="perspective-1000 h-80 w-full cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className={`relative w-full h-full duration-500 transform-style-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}>
              
              {/* Card FRONT */}
              <div className="absolute inset-0 backface-hidden bg-white border border-slate-100 rounded-3xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between items-center text-center">
                <div className="text-[10px] font-mono text-slate-400 font-bold tracking-wider">
                  FLASHCARD {currentCardIndex + 1} / {flashcardWords.length}
                </div>

                <div className="space-y-3">
                  <h3 className="text-3xl font-sans font-extrabold text-slate-950 tracking-tight">
                    {flashcardWords[currentCardIndex].word}
                  </h3>
                  <span className="text-xs font-mono text-slate-400 lowercase italic">
                    ({flashcardWords[currentCardIndex].partOfSpeech})
                  </span>
                  <div className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full inline-block">
                    Chủ đề: {flashcardWords[currentCardIndex].category}
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-sans flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                  <RotateCw className="h-3.5 w-3.5 animate-spin-slow" />
                  <span>Bấm vào thẻ để xem nghĩa & ví dụ</span>
                </div>
              </div>

              {/* Card BACK */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between">
                <div className="flex justify-between items-center text-[9px] font-mono text-emerald-400 font-bold">
                  <span>NGHĨA TIẾNG VIỆT & NGỮ CẢNH</span>
                  <span>CARD BACK</span>
                </div>

                <div className="space-y-3 text-center md:text-left">
                  <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-900/50">
                    <span className="text-[9px] font-bold text-emerald-400 block text-left">ĐỊNH NGHĨA VIỆT:</span>
                    <p className="text-sm font-sans font-bold text-emerald-100 text-left mt-0.5">
                      {flashcardWords[currentCardIndex].vietnameseTranslation}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed text-left line-clamp-3">
                    {flashcardWords[currentCardIndex].definition}
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-3 space-y-1.5 text-left">
                  <span className="text-[9px] font-mono text-slate-500">MẪU VÍ DỤ:</span>
                  <p className="text-xs text-slate-200 italic font-sans leading-relaxed">
                    "{flashcardWords[currentCardIndex].exampleSentence}"
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Flashcard navigation and action buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevCard}
              className="p-3 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-full transition-all cursor-pointer"
              title="Thẻ trước"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Quick rating for this card */}
            <div className="flex gap-2.5">
              <button
                onClick={() => markCardStatus(flashcardWords[currentCardIndex].id, 'failed')}
                className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-100 text-xs font-bold font-sans rounded-xl transition-all cursor-pointer"
              >
                😅 Chưa nhớ lắm
              </button>
              <button
                onClick={() => markCardStatus(flashcardWords[currentCardIndex].id, 'mastered')}
                className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100 text-xs font-bold font-sans rounded-xl transition-all cursor-pointer"
              >
                🔥 Đã thuộc lòng
              </button>
            </div>

            <button
              onClick={handleNextCard}
              className="p-3 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-full transition-all cursor-pointer"
              title="Thẻ tiếp"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Stats bar */}
          <div className="text-center text-xs text-slate-400 font-sans">
            Mẹo: Ôn tập ít nhất 3 thẻ mỗi ngày để duy trì streak học tập!
          </div>
        </div>
      )}

      {/* 2. SCENARIO CHALLENGES */}
      {reviewMode === 'scenarios' && (
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Scenario instruction header */}
          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-slate-400">
                SCENARIO DRILL {currentScenarioIndex + 1} / {filteredScenarios.length}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                <BrainCircuit className="h-3 w-3 animate-pulse" /> Sẵn sàng phản xạ
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                <span>TIN NHẮN TỪ {currentScenario.sender.toUpperCase()}:</span>
              </div>
              
              <blockquote className="text-base font-sans font-bold text-slate-900 border-l-4 border-emerald-600 pl-4 py-1 italic leading-relaxed">
                {currentScenario.message}
              </blockquote>

              <p className="text-xs text-slate-400 italic pl-5">
                → Nghĩa: {currentScenario.messageVi}
              </p>
            </div>

            <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-100 text-amber-900 text-xs leading-relaxed space-y-1">
              <span className="font-bold">💡 Gợi ý phản xạ (Coaching Tip):</span>
              <p>{currentScenario.coachingTip}</p>
            </div>
          </div>

          {/* Interactive typing input */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700" htmlFor="scenario-reply">
                Nhập câu trả lời bằng tiếng Anh của bạn:
              </label>
              <button
                onClick={() => setScenarioInput(currentScenario.sampleOutput)}
                className="text-[10px] text-slate-400 hover:text-emerald-600 cursor-pointer"
              >
                💡 Điền thử câu mẫu
              </button>
            </div>

            <textarea
              id="scenario-reply"
              className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-mono h-32 focus:outline-none"
              placeholder="Nhập email hoặc tin nhắn phản hồi..."
              value={scenarioInput}
              disabled={scenarioSubmitted}
              onChange={(e) => setScenarioInput(e.target.value)}
            />

            {!scenarioSubmitted ? (
              <button
                onClick={handleScenarioSubmit}
                disabled={!scenarioInput.trim()}
                className={`w-full py-3 rounded-xl font-bold font-sans text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  scenarioInput.trim()
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              >
                <Check className="h-4 w-4" />
                <span>Nộp bài để Coach nhận xét</span>
              </button>
            ) : (
              <div className="space-y-4">
                {/* Score & Feedback Card */}
                {scenarioFeedback && (
                  <div className="bg-slate-950 text-white p-5 rounded-2xl space-y-4 shadow-sm border border-slate-800">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold">DRILL REPORT</span>
                        <p className="text-xs font-bold text-slate-200 mt-0.5">{scenarioFeedback.praise}</p>
                      </div>
                      <div className="text-center bg-slate-900 border border-slate-800 p-2.5 rounded-xl min-w-[70px]">
                        <span className="block text-2xl font-black text-emerald-400">{scenarioFeedback.score}</span>
                        <span className="text-[9px] text-slate-500 font-mono font-bold">/100 XP</span>
                      </div>
                    </div>

                    <div className="text-xs space-y-2 leading-relaxed">
                      <p className="text-slate-300">💡 <strong>Coach nhận xét:</strong> {scenarioFeedback.coachNotes}</p>
                      
                      {scenarioFeedback.matches.length > 0 && (
                        <p className="text-emerald-400 text-[11px] font-mono">
                          ✓ Từ khóa đã áp dụng: {scenarioFeedback.matches.join(', ')}
                        </p>
                      )}
                    </div>

                    <div className="border-t border-slate-800 pt-3 space-y-1.5">
                      <span className="text-[10px] font-mono text-slate-500">MẪU PHẢN HỒI GỢI Ý (SAMPLE EXCELLENT REPLY):</span>
                      <p className="text-xs font-mono text-emerald-300 bg-slate-900 p-2.5 rounded border border-slate-800 select-all">
                        "{currentScenario.sampleOutput}"
                      </p>
                    </div>
                  </div>
                )}

                {/* Next button */}
                <button
                  onClick={handleNextScenario}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <span>Chuyển sang Tình huống tiếp theo</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
