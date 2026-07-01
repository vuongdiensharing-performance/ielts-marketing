import React, { useState, useMemo } from 'react';
import { 
  Volume2, BookOpen, MessageSquare, BookText, Play, Check, 
  HelpCircle, Info, Sparkles, ChevronRight, AlertCircle, 
  ArrowRight, Award, RefreshCw, Star 
} from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import { 
  SOUND_GROUPS, MINIMAL_PAIRS, NOUN_VERB_CONTRASTS, 
  STRESS_WORDS, PRACTICE_SENTENCES, IPASound, MinimalPair, 
  StressWord 
} from '../data/structureData';
import WordFamilyLab from './WordFamilyLab';
import SentenceFormulaLab from './SentenceFormulaLab';
import ConversationBuilderLab from './ConversationBuilderLab';

export default function StructurePage() {
  const [activeTab, setActiveTab] = useState<'ipa' | 'rules' | 'formulas' | 'conversations'>('ipa');
  const { speak } = useSpeech();

  // --- IPA Sound Selection state ---
  const initialSound = SOUND_GROUPS[0].sounds[0];
  const [selectedSound, setSelectedSound] = useState<IPASound>(initialSound);

  // --- Minimal Pair Quiz state ---
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState(false);
  const [minimalPairScore, setMinimalPairScore] = useState(0);
  const [minimalPairsPlayed, setMinimalPairsPlayed] = useState(0);

  // --- Stress Training Game state ---
  const [currentStressIndex, setCurrentStressIndex] = useState(0);
  const [stressAnswer, setStressAnswer] = useState<number | null>(null);
  const [hasCheckedStress, setHasCheckedStress] = useState(false);
  const [stressScore, setStressScore] = useState(0);

  // --- Practice Loop state ---
  const [activeSentenceId, setActiveSentenceId] = useState<string>(PRACTICE_SENTENCES[0].id);
  const [checklist, setChecklist] = useState({
    stressed: false,
    sounds: false,
    linking: false,
  });
  const [practiceSuccess, setPracticeSuccess] = useState(false);

  const activeSentence = useMemo(() => {
    return PRACTICE_SENTENCES.find(s => s.id === activeSentenceId) || PRACTICE_SENTENCES[0];
  }, [activeSentenceId]);

  const currentPair = useMemo(() => {
    return MINIMAL_PAIRS[currentPairIndex];
  }, [currentPairIndex]);

  const currentStressWord = useMemo(() => {
    return STRESS_WORDS[currentStressIndex];
  }, [currentStressIndex]);

  // Audio Playback Handlers
  const playWord = (word: string) => {
    speak(word, 'english');
  };

  const playIPASound = (sound: IPASound) => {
    // Isolated IPA characters can't be spoken directly by speechSynthesis, so we play the keyword
    // to give the perfect native context of that phoneme.
    speak(sound.keyword, 'english');
  };

  const playMinimalPairWord = (pair: MinimalPair) => {
    const wordToPlay = pair.correctWordIndex === 0 ? pair.word1 : pair.word2;
    speak(wordToPlay, 'english');
  };

  // Quiz Actions
  const handleAnswerMinimalPair = (index: number) => {
    if (hasCheckedAnswer) return;
    setSelectedAnswer(index);
    setHasCheckedAnswer(true);
    setMinimalPairsPlayed(prev => prev + 1);
    if (index === currentPair.correctWordIndex) {
      setMinimalPairScore(prev => prev + 1);
    }
  };

  const nextMinimalPair = () => {
    setSelectedAnswer(null);
    setHasCheckedAnswer(false);
    setCurrentPairIndex((prev) => (prev + 1) % MINIMAL_PAIRS.length);
  };

  const handleAnswerStress = (index: number) => {
    if (hasCheckedStress) return;
    setStressAnswer(index);
    setHasCheckedStress(true);
    if (index === currentStressWord.stressedIndex) {
      setStressScore(prev => prev + 1);
    }
  };

  const nextStressWord = () => {
    setStressAnswer(null);
    setHasCheckedStress(false);
    setCurrentStressIndex((prev) => (prev + 1) % STRESS_WORDS.length);
  };

  const handleChecklistChange = (key: 'stressed' | 'sounds' | 'linking') => {
    const updated = { ...checklist, [key]: !checklist[key] };
    setChecklist(updated);
    if (updated.stressed && updated.sounds && updated.linking) {
      setPracticeSuccess(true);
    } else {
      setPracticeSuccess(false);
    }
  };

  const resetPractice = () => {
    setChecklist({ stressed: false, sounds: false, linking: false });
    setPracticeSuccess(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-1 lg:p-4 animate-fade-in">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-2xl font-sans font-bold text-slate-950 tracking-tight flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-emerald-600" />
          <span>Cấu trúc & Ngữ âm</span>
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Nền tảng phát âm chuẩn IPA Mỹ, quy tắc trọng âm và liên kết từ ứng dụng trong Marketing, Đời sống & IELTS.
        </p>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-slate-100 gap-6 overflow-x-auto pb-1 scrollbar-none">
        {([
          { id: 'ipa', label: 'Âm IPA', icon: Volume2 },
          { id: 'rules', label: 'Biến đổi từ', icon: BookOpen },
          { id: 'formulas', label: 'Công thức câu', icon: BookText },
          { id: 'conversations', label: 'Conversation Builder', icon: MessageSquare },
        ] as const).map(tab => (
          <button
            id={`tab-btn-${tab.id}`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-sans font-bold tracking-tight relative flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id 
                ? 'text-emerald-700 font-extrabold scale-102' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <tab.icon className={`h-4 w-4 ${activeTab === tab.id ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: ÂM IPA */}
      {activeTab === 'ipa' && (
        <div className="space-y-8">
          
          {/* 1. START HERE SECTION */}
          <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/30 border border-emerald-100 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Star className="h-24 w-24 text-emerald-600" />
            </div>
            <div className="flex gap-4 items-start relative z-10">
              <div className="p-3 bg-emerald-600 rounded-xl text-white shadow-xs">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-sans font-bold text-slate-900 tracking-tight">Start Here: Cẩm nang học phát âm chuẩn</h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                  Để tự tin thuyết trình Marketing hay đạt điểm cao phần <strong>IELTS Speaking</strong>, việc nắm vững bảng âm IPA là điều kiện tiên quyết:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-xs text-slate-700">
                  <div className="flex gap-2 items-start">
                    <span className="p-1 bg-emerald-100 text-emerald-700 rounded-md font-bold">1</span>
                    <span><strong>Phát âm # Chính tả:</strong> Cách viết từ tiếng Anh thường không khớp hoàn toàn với cách phát âm. Học IPA giúp bạn nhìn từ điển là đọc đúng ngay tắp lự.</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="p-1 bg-emerald-100 text-emerald-700 rounded-md font-bold">2</span>
                    <span><strong>Rõ từ & Trọng âm:</strong> Đọc chuẩn từng phụ âm cuối (ending sounds) và nhấn đúng trọng âm (word stress) quan trọng hơn nhiều so với việc cố nói "giọng Tây".</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="p-1 bg-emerald-100 text-emerald-700 rounded-md font-bold">3</span>
                    <span><strong>Sự rõ ràng (Intelligibility):</strong> Đối với IELTS, tiêu chí <em>Pronunciation</em> chiếm 25% tổng số điểm, tập trung vào tính dễ hiểu, nhấn nhá và nối âm tự nhiên.</span>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="p-1 bg-emerald-100 text-emerald-700 rounded-md font-bold">4</span>
                    <span><strong>Khẩu hình Mỹ:</strong> Khóa học sử dụng hệ thống phiên âm Mỹ (General American) - phổ biến nhất trong môi trường quảng cáo và giao tiếp quốc tế.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 & 3. SOUND MAP & DETAIL PANEL (Two Columns) */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Volume2 className="h-5 w-5 text-emerald-600" />
              <h3 className="text-lg font-sans font-bold text-slate-900 tracking-tight">Bản đồ âm IPA & Hướng dẫn khẩu hình</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              
              {/* Left Column: Sound Map Grid (3/5) */}
              <div className="lg:col-span-3 space-y-6">
                {SOUND_GROUPS.map((group) => (
                  <div key={group.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                      <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">{group.name}</span>
                      <span className="text-xs font-sans font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{group.nameVi}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {group.sounds.map((sound) => {
                        const isSelected = selectedSound.symbol === sound.symbol;
                        return (
                          <div
                            id={`ipa-tile-${sound.symbol.replace(/\//g, '')}`}
                            key={sound.symbol}
                            onClick={() => setSelectedSound(sound)}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all relative flex flex-col justify-between h-22 ${
                              isSelected 
                                ? 'border-emerald-500 bg-emerald-50/40 shadow-xs' 
                                : 'border-slate-100 hover:border-slate-200 bg-slate-50/30'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="text-base font-mono font-extrabold text-emerald-700 tracking-wide">{sound.symbol}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playIPASound(sound);
                                }}
                                className="p-1 rounded-full bg-white hover:bg-slate-100 border border-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                              >
                                <Play className="h-3 w-3 fill-current" />
                              </button>
                            </div>
                            <div className="mt-2">
                              <div className="text-xs font-sans font-bold text-slate-800">{sound.keyword}</div>
                              <div className="text-[10px] font-sans text-slate-400 truncate mt-0.5">{sound.vietnameseCue}</div>
                            </div>
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Sound Detail Panel (2/5) */}
              <div className="lg:col-span-2">
                <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-sm sticky top-4 border border-slate-800 flex flex-col justify-between min-h-[480px]">
                  
                  {/* Selected State Header */}
                  <div className="space-y-5">
                    <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-3xl font-mono font-extrabold text-emerald-400 tracking-wider">
                          {selectedSound.symbol}
                        </span>
                        <div className="text-xs text-slate-400 font-sans mt-1">
                          Example word: <span className="text-emerald-300 font-bold underline">{selectedSound.keyword}</span>
                        </div>
                      </div>

                      <button
                        id="play-sound-detail-btn"
                        onClick={() => playIPASound(selectedSound)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-sans font-semibold transition-colors"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>Nghe mẫu</span>
                      </button>
                    </div>

                    {/* Instruction Description */}
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500">Mô tả khoa học</span>
                        <p className="text-xs text-slate-300 mt-0.5 font-sans italic">{selectedSound.description}</p>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500">Hướng dẫn phát âm</span>
                        <p className="text-xs text-slate-200 mt-0.5 font-sans leading-relaxed">{selectedSound.instruction}</p>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500">Mẹo khẩu hình môi / lưỡi</span>
                        <div className="bg-slate-800/60 rounded-lg p-2.5 mt-1 border border-slate-800">
                          <p className="text-xs text-emerald-300 font-sans font-medium">{selectedSound.mouthCue}</p>
                        </div>
                      </div>
                    </div>

                    {/* Example Words with Play buttons */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500">Từ ví dụ trong Marketing / Đời sống</span>
                      <div className="space-y-1.5">
                        {selectedSound.examples.map((ex, idx) => (
                          <div 
                            key={idx}
                            onClick={() => playWord(ex.word)}
                            className="flex justify-between items-center p-2 bg-slate-800/40 hover:bg-slate-800 rounded-lg border border-slate-800/60 cursor-pointer transition-colors group"
                          >
                            <div className="flex items-baseline gap-2">
                              <span className="text-xs font-sans font-bold text-white group-hover:text-emerald-400 transition-colors">
                                {ex.word}
                              </span>
                              <span className="text-[11px] font-mono text-slate-400">
                                {ex.phonetic}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-slate-400 font-sans">{ex.translation}</span>
                              <Play className="h-3 w-3 text-slate-500 group-hover:text-emerald-400 fill-current opacity-60 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Contrast & Common Mistake warning at the bottom */}
                  <div className="mt-6 border-t border-slate-800 pt-4 space-y-2">
                    {selectedSound.contrastSymbol && (
                      <div className="flex gap-2 items-center text-[11px] text-teal-400">
                        <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                        <span>Âm đối lập cần chú ý: <strong>{selectedSound.contrastSymbol}</strong></span>
                      </div>
                    )}
                    <div className="p-2.5 bg-amber-950/20 border border-amber-900/40 rounded-lg flex gap-2">
                      <Info className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-sans font-bold text-amber-400">Lỗi người Việt hay mắc:</span>
                        <p className="text-[11px] text-slate-300 font-sans mt-0.5">{selectedSound.mistake}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* 4. MINIMAL PAIRS QUIZ SECTION */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-50 pb-4">
              <div>
                <h4 className="text-base font-sans font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <span className="p-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-mono">LAB 1</span>
                  <span>Luyện tai nghe: Phân biệt cặp âm tối thiểu (Minimal Pairs)</span>
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Nghe từ được phát ngẫu nhiên và chọn đáp án chính xác nhất để kiểm tra khả năng phân biệt âm.
                </p>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                <div className="text-xs font-sans text-slate-600">
                  Cặp số: <span className="font-bold text-slate-900">{currentPairIndex + 1}/{MINIMAL_PAIRS.length}</span>
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <div className="text-xs font-sans text-slate-600">
                  Điểm số: <span className="font-extrabold text-emerald-700">{minimalPairScore} / {minimalPairsPlayed}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-4">
              
              {/* Quiz left: Player button */}
              <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                <button
                  id="play-minimal-pair-btn"
                  onClick={() => playMinimalPairWord(currentPair)}
                  className="p-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-md transition-all hover:scale-105"
                >
                  <Volume2 className="h-10 w-10 animate-pulse" />
                </button>
                <div className="text-xs text-slate-500 font-sans text-center">
                  Click để nghe mẫu phát âm của 1 trong 2 từ bên phải
                </div>
              </div>

              {/* Quiz right: Choices & Reveal */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    id="minimal-pair-choice-0"
                    disabled={hasCheckedAnswer}
                    onClick={() => handleAnswerMinimalPair(0)}
                    className={`p-5 rounded-xl border text-center transition-all ${
                      hasCheckedAnswer 
                        ? currentPair.correctWordIndex === 0
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold'
                          : selectedAnswer === 0
                            ? 'border-red-300 bg-red-50 text-red-800'
                            : 'border-slate-100 bg-slate-50 opacity-60'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-bold text-slate-800'
                    }`}
                  >
                    <div className="text-xl font-sans">{currentPair.word1}</div>
                    <div className="text-xs text-slate-400 mt-1 font-mono">{currentPair.phonetic1}</div>
                  </button>

                  <button
                    id="minimal-pair-choice-1"
                    disabled={hasCheckedAnswer}
                    onClick={() => handleAnswerMinimalPair(1)}
                    className={`p-5 rounded-xl border text-center transition-all ${
                      hasCheckedAnswer 
                        ? currentPair.correctWordIndex === 1
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold'
                          : selectedAnswer === 1
                            ? 'border-red-300 bg-red-50 text-red-800'
                            : 'border-slate-100 bg-slate-50 opacity-60'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-bold text-slate-800'
                    }`}
                  >
                    <div className="text-xl font-sans">{currentPair.word2}</div>
                    <div className="text-xs text-slate-400 mt-1 font-mono">{currentPair.phonetic2}</div>
                  </button>
                </div>

                {/* Feedback Panel */}
                {hasCheckedAnswer && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2 animate-fade-in">
                    <div className="flex items-center gap-2">
                      {selectedAnswer === currentPair.correctWordIndex ? (
                        <span className="text-xs font-sans font-bold text-emerald-700 flex items-center gap-1">
                          <Check className="h-4 w-4 text-emerald-600" /> Đúng rồi!
                        </span>
                      ) : (
                        <span className="text-xs font-sans font-bold text-red-700 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4 text-red-500" /> Chưa đúng rồi!
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      <strong>Mẹo phân biệt:</strong> {currentPair.vietnameseExplanation}
                    </p>
                    <div className="pt-2 flex justify-end">
                      <button
                        id="next-minimal-pair-btn"
                        onClick={nextMinimalPair}
                        className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        <span>Cặp tiếp theo</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* 5. WORD STRESS LAB */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs space-y-6">
            <div>
              <h4 className="text-base font-sans font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span className="p-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-mono">LAB 2</span>
                <span>Quy luật trọng âm từ (Word Stress Lab)</span>
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Luyện phát âm chuẩn nhấn nhá của từ. Trong tiếng Anh, âm được nhấn sẽ đọc to, rõ, ngân dài và nâng tông giọng lên cao hơn.
              </p>
            </div>

            {/* A. Noun vs Verb Shift */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-sans font-bold text-slate-700">Quy tắc hoán đổi Trọng âm (Noun vs Verb Shift)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-sans max-w-3xl">
                Nhiều từ có 2 âm tiết có cách viết giống hệt nhau nhưng trọng âm thay đổi tuỳ thuộc từ loại: <strong>Danh từ nhấn âm 1</strong>, <strong>Động từ nhấn âm 2</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {NOUN_VERB_CONTRASTS.map((item, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-100/80 pb-1.5">
                      <span className="text-xs font-sans font-bold text-emerald-800">{item.noun.word.toUpperCase()}</span>
                      <span className="text-[10px] text-slate-400 font-sans italic">Nhấn âm thay đổi nghĩa</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Noun card */}
                      <div 
                        onClick={() => playWord(item.noun.word)}
                        className="bg-white p-2.5 rounded-lg border border-slate-100 cursor-pointer hover:border-emerald-200 transition-colors flex flex-col justify-between h-20"
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-sans font-bold text-slate-900">Noun: <span className="text-emerald-700 font-extrabold underline">{item.noun.word.substring(0, 3)}</span>{item.noun.word.substring(3)}</span>
                          <Play className="h-3 w-3 text-slate-400 fill-current" />
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 mt-1">{item.noun.phonetic}</div>
                        <div className="text-[10px] text-slate-400 truncate font-sans">{item.noun.meaning}</div>
                      </div>

                      {/* Verb card */}
                      <div 
                        onClick={() => playWord(item.verb.word)}
                        className="bg-white p-2.5 rounded-lg border border-slate-100 cursor-pointer hover:border-emerald-200 transition-colors flex flex-col justify-between h-20"
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-xs font-sans font-bold text-slate-900">Verb: {item.verb.word.substring(0, 3)}<span className="text-emerald-700 font-extrabold underline">{item.verb.word.substring(3)}</span></span>
                          <Play className="h-3 w-3 text-slate-400 fill-current" />
                        </div>
                        <div className="text-[11px] font-mono text-slate-500 mt-1">{item.verb.phonetic}</div>
                        <div className="text-[10px] text-slate-400 truncate font-sans">{item.verb.meaning}</div>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-sans italic">{item.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* B. Mini Game: Syllable Stress Selector */}
            <div className="border border-emerald-100 rounded-xl p-5 bg-emerald-50/20 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <h5 className="text-xs font-sans font-bold text-emerald-800 tracking-wide uppercase">Thử thách mini: Xác định âm tiết nhấn</h5>
                  <p className="text-xs text-slate-600 font-sans mt-0.5">
                    Click nghe từ bên dưới và click vào âm tiết nhận trọng âm chính của từ đó!
                  </p>
                </div>
                <div className="text-xs font-sans text-emerald-800 bg-emerald-100/60 px-2.5 py-1 rounded-full font-bold self-start">
                  Điểm: {stressScore}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 py-3">
                <button
                  id="play-stress-word-btn"
                  onClick={() => playWord(currentStressWord.word)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                >
                  <Play className="h-4 w-4 fill-current" />
                  <span>Nghe từ: "{currentStressWord.word}"</span>
                </button>

                <div className="flex flex-wrap gap-2">
                  {currentStressWord.syllables.map((syllable, index) => {
                    const isStressed = index === currentStressWord.stressedIndex;
                    const isSelected = stressAnswer === index;
                    return (
                      <button
                        id={`stress-syllable-${index}`}
                        key={index}
                        disabled={hasCheckedStress}
                        onClick={() => handleAnswerStress(index)}
                        className={`px-4 py-2.5 rounded-lg text-xs font-bold border transition-all ${
                          hasCheckedStress
                            ? isStressed
                              ? 'bg-emerald-500 border-emerald-500 text-white scale-102 shadow-xs'
                              : isSelected
                                ? 'bg-red-500 border-red-500 text-white'
                                : 'bg-slate-50 border-slate-100 text-slate-400 opacity-50'
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-400'
                        }`}
                      >
                        {syllable.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              </div>

              {hasCheckedStress && (
                <div className="text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-t border-emerald-100/50 pt-3 animate-fade-in">
                  <div className="font-sans">
                    {stressAnswer === currentStressWord.stressedIndex ? (
                      <span className="text-emerald-700 font-bold">Chính xác!</span>
                    ) : (
                      <span className="text-red-700 font-bold">Chưa đúng!</span>
                    )}{' '}
                    <span className="text-slate-600">
                      Từ <strong>"{currentStressWord.word}"</strong> ({currentStressWord.meaning}) có phiên âm là{' '}
                      <span className="font-mono text-emerald-700 font-semibold">{currentStressWord.phonetic}</span>, nhấn trọng âm vào âm tiết thứ{' '}
                      <strong>{currentStressWord.stressedIndex + 1}</strong> (mô hình <em>{currentStressWord.stressPattern}</em>).
                    </span>
                  </div>

                  <button
                    id="next-stress-word-btn"
                    onClick={nextStressWord}
                    className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>Từ tiếp theo</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* 6. SENTENCE STRESS & CONNECTED SPEECH */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookText className="h-5 w-5 text-emerald-600" />
              <h3 className="text-lg font-sans font-bold text-slate-900 tracking-tight">Trọng âm câu & Nói nối âm (Sentence Stress & Connected Speech)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Card 1 */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Star className="h-4 w-4 fill-current text-emerald-500" />
                    <span className="text-xs font-sans font-bold uppercase tracking-wider">Từ Nội Dung vs Từ Chức Năng</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    <strong>Content Words</strong> (Danh, Động, Tính, Trạng) mang thông tin chính, luôn được NHẤN. <strong>Function Words</strong> (Mạo từ, giới từ, trợ động từ) lướt rất nhanh.
                  </p>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/60 font-mono text-xs text-slate-700">
                    <span className="text-slate-400">I</span> <span className="font-bold text-emerald-700">NEED</span> <span className="text-slate-400">to</span> <span className="font-bold text-emerald-700">BUY</span> <span className="font-bold text-emerald-700">GROCERIES</span> <span className="text-slate-400">after</span> <span className="font-bold text-emerald-700">DINNER</span>.
                  </div>
                </div>
                <button
                  onClick={() => playWord("I need to buy groceries after dinner.")}
                  className="flex items-center justify-center gap-1.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 rounded-xl text-xs font-sans font-medium transition-colors"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>Nghe câu mẫu</span>
                </button>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Star className="h-4 w-4 fill-current text-emerald-500" />
                    <span className="text-xs font-sans font-bold uppercase tracking-wider">Nối âm Consonant-to-Vowel</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Khi một từ kết thúc bằng một <strong>Phụ âm</strong> và từ tiếp theo bắt đầu bằng một <strong>Nguyên âm</strong>, chúng ta nối chúng lại giống như một từ dài duy nhất.
                  </p>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/60 font-mono text-xs text-slate-700">
                    pi<span className="font-bold text-emerald-700">k</span> <span> </span> <span className="font-bold text-emerald-700">u</span>p &rarr; pi-kup <br />
                    lau<span className="font-bold text-emerald-700">nch</span> <span> </span> <span className="font-bold text-emerald-700">a</span>ll &rarr; laun-chall
                  </div>
                </div>
                <button
                  onClick={() => playWord("pick up")}
                  className="flex items-center justify-center gap-1.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 rounded-xl text-xs font-sans font-medium transition-colors"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>Nghe nối âm "pick up"</span>
                </button>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Star className="h-4 w-4 fill-current text-emerald-500" />
                    <span className="text-xs font-sans font-bold uppercase tracking-wider">Dạng yếu (Weak Forms)</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    Các giới từ hoặc trợ động từ như "to", "for", "can", "and" thường giảm âm thành Schwa /ə/ rất nhẹ thay vì đọc đầy đủ.
                  </p>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100/60 font-mono text-xs text-slate-700">
                    to &rarr; /tə/ (không đọc /tu/) <br />
                    can &rarr; /kən/ (không đọc /kæn/)
                  </div>
                </div>
                <button
                  onClick={() => playWord("We can launch it tomorrow.")}
                  className="flex items-center justify-center gap-1.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 rounded-xl text-xs font-sans font-medium transition-colors"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>Nghe câu mẫu với "can"</span>
                </button>
              </div>

            </div>
          </div>

          {/* 7. PRACTICE LOOP (At bottom of IPA Lab) */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-6">
            <div>
              <span className="text-[10px] font-mono tracking-wider text-emerald-400 bg-emerald-950 border border-emerald-900/60 px-2 py-1 rounded-full uppercase">LAB 3</span>
              <h3 className="text-lg font-sans font-bold text-slate-100 tracking-tight mt-2 flex items-center gap-2">
                <span>Vòng lặp thực hành câu hoàn chỉnh (Practice Loop)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Lựa chọn một câu mẫu theo mục tiêu học, nghe kỹ âm bản mẫu, đọc theo và hoàn tất danh sách tự đánh giá để tích lũy tiến trình.
              </p>
            </div>

            {/* A. Selector buttons */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
              {PRACTICE_SENTENCES.map((sentence) => (
                <button
                  id={`sentence-select-btn-${sentence.id}`}
                  key={sentence.id}
                  onClick={() => {
                    setActiveSentenceId(sentence.id);
                    resetPractice();
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-sans font-bold border transition-all ${
                    activeSentenceId === sentence.id
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-xs'
                      : 'bg-slate-800/50 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {sentence.category.toUpperCase()} - {sentence.text.substring(0, 15)}...
                </button>
              ))}
            </div>

            {/* B. Active sentence display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
              
              <div className="space-y-4">
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="text-lg font-sans font-extrabold text-white leading-relaxed tracking-tight">
                    {activeSentence.text.split(' ').map((word, i) => {
                      const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
                      const isHighlighted = activeSentence.stressHighlights.some(hl => cleanWord.includes(hl.toLowerCase()) || hl.toLowerCase().includes(cleanWord));
                      return (
                        <span 
                          key={i} 
                          className={`mr-1.5 inline-block ${isHighlighted ? 'text-emerald-400 font-extrabold scale-102 underline decoration-emerald-500/50 underline-offset-4' : 'text-slate-300 font-medium'}`}
                        >
                          {word}
                        </span>
                      );
                    })}
                  </div>

                  <div className="text-xs font-mono text-emerald-300 tracking-wider">
                    {activeSentence.phonetics}
                  </div>

                  <div className="text-xs text-slate-400 font-sans border-t border-slate-800 pt-2 leading-relaxed">
                    Nghĩa: {activeSentence.translation}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    id="play-practice-sentence-btn"
                    onClick={() => playWord(activeSentence.text)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-sans font-bold transition-colors shadow-xs"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>Nghe giọng bản mẫu</span>
                  </button>

                  <button
                    id="replay-practice-sentence-btn"
                    onClick={() => playWord(activeSentence.text)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-sans font-bold transition-colors"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Nghe lại</span>
                  </button>
                </div>
              </div>

              {/* C. Self-check list */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
                <div>
                  <h5 className="text-xs font-sans font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span>Bản tự đánh giá (Self-Evaluation Checklist)</span>
                  </h5>
                  <p className="text-[11px] text-slate-400 font-sans mt-1">
                    Hãy đọc to câu trên bằng cả cơ thể và tự tin đánh dấu các điểm bên dưới:
                  </p>

                  <div className="mt-4 space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        id="self-check-stressed"
                        type="checkbox"
                        checked={checklist.stressed}
                        onChange={() => handleChecklistChange('stressed')}
                        className="mt-0.5 rounded border-slate-800 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-slate-950 h-4 w-4 bg-slate-900"
                      />
                      <div className="text-xs text-slate-300 font-sans leading-normal group-hover:text-slate-200">
                        <strong>Trọng âm câu:</strong> Tôi đã nhấn rõ và ngân dài các từ khóa bôi đậm ({activeSentence.stressHighlights.join(', ')}).
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        id="self-check-sounds"
                        type="checkbox"
                        checked={checklist.sounds}
                        onChange={() => handleChecklistChange('sounds')}
                        className="mt-0.5 rounded border-slate-800 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-slate-950 h-4 w-4 bg-slate-900"
                      />
                      <div className="text-xs text-slate-300 font-sans leading-normal group-hover:text-slate-200">
                        <strong>Âm mục tiêu chính xác:</strong> Tôi phát âm chuẩn xác các âm {activeSentence.targetSounds.join(', ')} trong câu.
                      </div>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        id="self-check-linking"
                        type="checkbox"
                        checked={checklist.linking}
                        onChange={() => handleChecklistChange('linking')}
                        className="mt-0.5 rounded border-slate-800 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-slate-950 h-4 w-4 bg-slate-900"
                      />
                      <div className="text-xs text-slate-300 font-sans leading-normal group-hover:text-slate-200">
                        <strong>Nối âm & Trôi chảy:</strong> Tôi đã liên kết phụ âm sang nguyên âm một cách tự nhiên, không bị ngắc ngứ.
                      </div>
                    </label>
                  </div>
                </div>

                {/* Completion Feedback */}
                {practiceSuccess ? (
                  <div className="bg-emerald-950/40 border border-emerald-900/60 p-3 rounded-xl flex items-center justify-between animate-fade-in">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-emerald-400" />
                      <div className="text-[11px] font-sans font-semibold text-emerald-300">
                        Tuyệt vời! Bạn vừa hoàn thành bài luyện nói xuất sắc.
                      </div>
                    </div>
                    <button
                      id="reset-practice-btn"
                      onClick={resetPractice}
                      className="text-[10px] font-sans text-emerald-400 underline hover:text-emerald-200"
                    >
                      Luyện lại
                    </button>
                  </div>
                ) : (
                  <div className="text-[10px] text-slate-500 font-sans italic text-center pt-2">
                    Hoàn tất cả 3 tiêu chí để đánh dấu câu này đã hoàn thành.
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      )}

      {/* TAB 2: BIẾN ĐỔI TỪ (WORD FAMILY LAB) */}
      {activeTab === 'rules' && (
        <WordFamilyLab />
      )}

      {/* TAB 3: CÔNG THỨC CÂU (SENTENCE FORMULAS) */}
      {activeTab === 'formulas' && (
        <SentenceFormulaLab />
      )}

      {/* TAB 4: CONVERSATION BUILDER (ROADMAP PREVIEW) */}
      {activeTab === 'conversations' && (
        <ConversationBuilderLab />
      )}

    </div>
  );
}
