import React, { useState, useEffect, useRef } from 'react';
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
  FileText,
  Volume2,
  Mail,
  Play,
  Pause,
  Award,
  Activity,
  Eye,
  EyeOff
} from 'lucide-react';
import { Lesson, LessonStepContent, VocabularyItem, FormulaItem, UserProgress, LessonResponse } from '../types';
import { LESSON_STEP_CONTENTS } from '../data/seedData';
import SpeakingRecorder from './SpeakingRecorder';

interface LessonWorkspaceViewProps {
  lessonId: string;
  lessons: Lesson[];
  userProgress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onBackToModule: () => void;
  onTabChange?: (tabId: string) => void;
  onSelectLesson?: (lessonId: string) => void;
}

export default function LessonWorkspaceView({
  lessonId,
  lessons,
  userProgress,
  onUpdateProgress,
  onBackToModule,
  onTabChange,
  onSelectLesson,
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
  const [audioId, setAudioId] = useState<string>(''); // For speaking output
  const [audioTranscript, setAudioTranscript] = useState<string>(''); // For speaking output transcript
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [coachFeedback, setCoachFeedback] = useState<any>(null);
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);

  // Sprint 2 Interactive Learning States
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentSpeechIndex, setCurrentSpeechIndex] = useState<number | null>(null);
  const [reorderedWordsSelected, setReorderedWordsSelected] = useState<Record<string, string[]>>({});
  const [comprehensionAnswers, setComprehensionAnswers] = useState<Record<string, string>>({});
  const [comprehensionSubmitted, setComprehensionSubmitted] = useState<Record<string, boolean>>({});
  
  // Left and right matching state
  const [matchingSelectedLeft, setMatchingSelectedLeft] = useState<Record<string, string>>({});
  const [matchingSelectedRight, setMatchingSelectedRight] = useState<Record<string, string>>({});
  const [matchingCompletedPairs, setMatchingCompletedPairs] = useState<Record<string, Array<{ english: string; vietnamese: string }>>>({});

  // Reorder index states
  const [reorderWordIndices, setReorderWordIndices] = useState<Record<string, number[]>>({});

  const handleSelectReorderIndex = (qId: string, index: number, wordsArray: string[]) => {
    setReorderWordIndices(prev => {
      const current = prev[qId] || [];
      const updated = current.includes(index)
        ? current.filter(i => i !== index)
        : [...current, index];
      
      const assembled = updated.map(i => wordsArray[i]).join(' ');
      setPracticeAnswers(oldAnswers => ({ ...oldAnswers, [qId]: assembled }));
      
      return { ...prev, [qId]: updated };
    });
  };

  const handleClearReorder = (qId: string) => {
    setReorderWordIndices(prev => ({ ...prev, [qId]: [] }));
    setPracticeAnswers(oldAnswers => ({ ...oldAnswers, [qId]: '' }));
  };

  const handleSelectLeft = (qId: string, engTerm: string) => {
    // If already matching completed for this question, ignore
    if (practiceSubmitted[qId]) return;
    
    setMatchingSelectedLeft(prev => {
      const isSelected = prev[qId] === engTerm;
      const nextVal = isSelected ? '' : engTerm;
      
      // Auto pair if right is selected
      const rightTerm = matchingSelectedRight[qId];
      if (nextVal && rightTerm) {
        setMatchingCompletedPairs(oldPairs => {
          const current = oldPairs[qId] || [];
          const cleaned = current.filter(p => p.english !== nextVal && p.vietnamese !== rightTerm);
          const updated = [...cleaned, { english: nextVal, vietnamese: rightTerm }];
          
          const questionObj = stepContent?.practice?.questions?.find(q => q.id === qId);
          const totalPairs = questionObj?.matchingPairs?.length || 0;
          if (updated.length === totalPairs) {
            setPracticeAnswers(oldAns => ({ ...oldAns, [qId]: 'MATCH_ALL' }));
          } else {
            setPracticeAnswers(oldAns => ({ ...oldAns, [qId]: '' }));
          }
          return { ...oldPairs, [qId]: updated };
        });
        // Clear active highlights
        setTimeout(() => {
          setMatchingSelectedLeft(old => ({ ...old, [qId]: '' }));
          setMatchingSelectedRight(old => ({ ...old, [qId]: '' }));
        }, 100);
      }
      
      return { ...prev, [qId]: nextVal };
    });
  };

  const handleSelectRight = (qId: string, vieTerm: string) => {
    if (practiceSubmitted[qId]) return;
    
    setMatchingSelectedRight(prev => {
      const isSelected = prev[qId] === vieTerm;
      const nextVal = isSelected ? '' : vieTerm;
      
      const leftTerm = matchingSelectedLeft[qId];
      if (nextVal && leftTerm) {
        setMatchingCompletedPairs(oldPairs => {
          const current = oldPairs[qId] || [];
          const cleaned = current.filter(p => p.english !== leftTerm && p.vietnamese !== nextVal);
          const updated = [...cleaned, { english: leftTerm, vietnamese: nextVal }];
          
          const questionObj = stepContent?.practice?.questions?.find(q => q.id === qId);
          const totalPairs = questionObj?.matchingPairs?.length || 0;
          if (updated.length === totalPairs) {
            setPracticeAnswers(oldAns => ({ ...oldAns, [qId]: 'MATCH_ALL' }));
          } else {
            setPracticeAnswers(oldAns => ({ ...oldAns, [qId]: '' }));
          }
          return { ...oldPairs, [qId]: updated };
        });
        setTimeout(() => {
          setMatchingSelectedLeft(old => ({ ...old, [qId]: '' }));
          setMatchingSelectedRight(old => ({ ...old, [qId]: '' }));
        }, 100);
      }
      
      return { ...prev, [qId]: nextVal };
    });
  };

  const handleRemoveMatchedPair = (qId: string, pairIndex: number) => {
    if (practiceSubmitted[qId]) return;
    setMatchingCompletedPairs(prev => {
      const current = prev[qId] || [];
      const updated = current.filter((_, idx) => idx !== pairIndex);
      if (updated.length === 0) {
        setPracticeAnswers(oldAns => ({ ...oldAns, [qId]: '' }));
      }
      return { ...prev, [qId]: updated };
    });
  };

  // Audio speech synthesis functions
  const stopAudio = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setCurrentSpeechIndex(null);
  };

  const playAudio = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      alert("Trình duyệt không hỗ trợ tự động phát âm thanh Speech Synthesis.");
      return;
    }

    if (isPlayingAudio) {
      stopAudio();
      return;
    }

    window.speechSynthesis.cancel();
    setIsPlayingAudio(true);

    const conversationsToSpeak = stepContent?.input?.conversations || [];
    if (conversationsToSpeak.length === 0) {
      setIsPlayingAudio(false);
      return;
    }

    let index = 0;

    const speakNext = () => {
      if (index >= conversationsToSpeak.length) {
        setIsPlayingAudio(false);
        setCurrentSpeechIndex(null);
        return;
      }

      setCurrentSpeechIndex(index);
      const item = conversationsToSpeak[index];
      const pureEnglish = item.message.replace(/^[^:]+:\s*/, '');
      const utterance = new SpeechSynthesisUtterance(pureEnglish);
      
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith('en-'));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      utterance.rate = 0.85; // Natural, slower clear pacing for Vietnamese learners

      utterance.onend = () => {
        index++;
        // Short pause between speakers
        setTimeout(() => {
          speakNext();
        }, 600);
      };

      utterance.onerror = () => {
        setIsPlayingAudio(false);
        setCurrentSpeechIndex(null);
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNext();
  };

  // Auto-stop speech synthesis when switching steps, lessons, or tabs
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [lessonId, currentStep]);

  const isFirstLoad = useRef(true);

  // Load existing progress or draft if available on mount or when lessonId changes
  useEffect(() => {
    isFirstLoad.current = true;
    const saved = userProgress.lessonResponses[lessonId];
    if (saved) {
      setCurrentStep(saved.currentStep || 1);
      setInputText(saved.inputText || '');
      setPracticeAnswers(saved.practiceAnswers || {});
      setPracticeSubmitted(saved.practiceSubmitted || {});
      setOutputText(saved.outputText || '');
      setAudioId(saved.audioId || '');
      setAudioTranscript(saved.audioTranscript || '');
      setCoachFeedback(saved.coachFeedback || null);
      setComprehensionAnswers(saved.comprehensionAnswers || {});
      setComprehensionSubmitted(saved.comprehensionSubmitted || {});
      setMatchingCompletedPairs(saved.matchingCompletedPairs || {});
      setReorderWordIndices(saved.reorderWordIndices || {});
    } else {
      setCurrentStep(1);
      setInputText('');
      setPracticeAnswers({});
      setPracticeSubmitted({});
      setOutputText('');
      setAudioId('');
      setAudioTranscript('');
      setCoachFeedback(null);
      setComprehensionAnswers({});
      setComprehensionSubmitted({});
      setMatchingCompletedPairs({});
      setReorderWordIndices({});
    }
  }, [lessonId]);

  // Sync state back to userProgress whenever any of these local states change
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    onUpdateProgress(prev => {
      const currentSaved: Partial<LessonResponse> = prev.lessonResponses[lessonId] || {};
      
      const isDifferent = 
        currentSaved.currentStep !== currentStep ||
        currentSaved.inputText !== inputText ||
        JSON.stringify(currentSaved.practiceAnswers) !== JSON.stringify(practiceAnswers) ||
        JSON.stringify(currentSaved.practiceSubmitted) !== JSON.stringify(practiceSubmitted) ||
        currentSaved.outputText !== outputText ||
        currentSaved.audioId !== audioId ||
        currentSaved.audioTranscript !== audioTranscript ||
        JSON.stringify(currentSaved.coachFeedback) !== JSON.stringify(coachFeedback) ||
        JSON.stringify(currentSaved.comprehensionAnswers) !== JSON.stringify(comprehensionAnswers) ||
        JSON.stringify(currentSaved.comprehensionSubmitted) !== JSON.stringify(comprehensionSubmitted) ||
        JSON.stringify(currentSaved.matchingCompletedPairs) !== JSON.stringify(matchingCompletedPairs) ||
        JSON.stringify(currentSaved.reorderWordIndices) !== JSON.stringify(reorderWordIndices);

      if (!isDifferent) return prev;

      const updatedResponse: LessonResponse = {
        id: currentSaved.id || `${lessonId}_res`,
        lessonId,
        practiceAnswers,
        outputText,
        audioId,
        audioTranscript,
        coachFeedback,
        completedAt: currentSaved.completedAt,
        currentStep,
        inputText,
        practiceSubmitted,
        comprehensionAnswers,
        comprehensionSubmitted,
        matchingCompletedPairs,
        reorderWordIndices
      };

      return {
        ...prev,
        lessonResponses: {
          ...prev.lessonResponses,
          [lessonId]: updatedResponse
        }
      };
    });
  }, [
    lessonId,
    currentStep,
    inputText,
    practiceAnswers,
    practiceSubmitted,
    outputText,
    audioId,
    audioTranscript,
    coachFeedback,
    comprehensionAnswers,
    comprehensionSubmitted,
    matchingCompletedPairs,
    reorderWordIndices
  ]);

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
    const isSpeaking = stepContent?.output.format === 'speaking';
    const textToAnalyze = lessonId === 'a1-m03-challenge' ? outputText : (isSpeaking ? audioTranscript : outputText);

    if (!textToAnalyze.trim() && !audioId) {
      alert(isSpeaking ? "Vui lòng thu âm hoặc nhập transcript của bạn trước khi gửi." : "Vui lòng nhập câu trả lời thực hành của bạn trước khi gửi phân tích.");
      return;
    }

    if (lessonId === 'a1-m03-challenge' && !textToAnalyze.trim()) {
      alert("Thử thách Module yêu cầu bạn phải nhập báo cáo Slack bằng văn bản (transcript) để hoàn thành.");
      return;
    }

    setIsSubmittingFeedback(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      // If user only recorded audio but provided no transcript, provide a special "Audio Only" generic feedback
      if (isSpeaking && !textToAnalyze.trim() && audioId) {
        const generatedFeedback: any = {
          score: 100,
          grammarScore: 0,
          vocabularyScore: 0,
          clarityScore: 0,
          toneScore: 0,
          fluencyEstimate: 0,
          intelligibilityEstimate: 0,
          strengths: ["Đã lưu file ghi âm thành công."],
          improvements: ["Bạn có thể nhập transcript (nội dung bạn đã nói) nếu muốn nhận đánh giá chi tiết về từ vựng, ngữ pháp, và cấu trúc từ Demo Coach."],
          recommendations: ["Xem lại bài học và thử luyện tập lại với transcript."],
          isAudioOnly: true
        };

        setCoachFeedback(generatedFeedback);

        onUpdateProgress(prev => {
          const newResponses = { ...prev.lessonResponses };
          newResponses[lessonId] = {
            ...newResponses[lessonId],
            id: `${lessonId}_res`,
            lessonId,
            practiceAnswers,
            outputText,
            audioId,
            audioTranscript,
            coachFeedback: generatedFeedback,
            completedAt: new Date().toISOString()
          };

          const isAlreadyCompleted = prev.completedLessons.includes(lessonId);
          const newCompleted = isAlreadyCompleted 
            ? prev.completedLessons 
            : [...prev.completedLessons, lessonId];
            
          const updatedXP = { ...prev.skillXP };
          if (!isAlreadyCompleted) {
            const skill = currentLesson.mainSkill;
            updatedXP[skill] = (updatedXP[skill] || 0) + 20;
            updatedXP['Vocabulary'] = (updatedXP['Vocabulary'] || 0) + 10;
  
            const m03LessonsTotal = lessons.filter(l => l.moduleId === currentLesson.moduleId).length;
            const m03CompletedNow = newCompleted.filter(id => lessons.find(l => l.id === id)?.moduleId === currentLesson.moduleId).length;
  
            if (m03CompletedNow === m03LessonsTotal) {
               updatedXP[skill] += 100;
            }
          }

          return {
            ...prev,
            lessonResponses: newResponses,
            completedLessons: newCompleted,
            skillXP: updatedXP
          };
        });

        setIsSubmittingFeedback(false);
        setCurrentStep(7);
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
        return;
      }

      const lowerText = textToAnalyze.toLowerCase().trim();
      const wordCount = textToAnalyze.split(/\s+/).filter(Boolean).length;
      
      // Sentences count by matching punctuation .!?
      const sentences = textToAnalyze.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const sentenceCount = sentences.length;

      // 1. Grammatical Evaluation (Present Continuous, helper verbs, etc.)
      let grammarScore = 80;
      const grammarIssues: string[] = [];
      const grammarPluses: string[] = [];

      // Check for common Present Continuous errors
      const hasSubject = lowerText.startsWith("i") || lowerText.includes("we") || lowerText.includes("the");
      const hasBe = lowerText.includes(" am ") || lowerText.includes("i'm") || lowerText.includes(" are ") || lowerText.includes(" we're") || lowerText.includes(" is ");
      const hasIng = lowerText.includes("ing ") || lowerText.endsWith("ing") || lowerText.includes("ing.");

      if (lessonId === 'a1-m03-l01') {
        if (!hasBe && hasIng) {
          grammarScore -= 25;
          grammarIssues.push("Thiếu động từ 'to be' đứng trước động từ đuôi -ing (Ví dụ: ghi 'I checking' thay vì 'I am checking').");
        } else if (hasBe && !hasIng && (lowerText.includes(" check ") || lowerText.includes(" write ") || lowerText.includes(" test "))) {
          grammarScore -= 20;
          grammarIssues.push("Sử dụng sai dạng động từ: sau 'am/is/are' phải là động từ đuôi -ing để diễn tả hành động đang diễn ra.");
        } else if (hasBe && hasIng) {
          grammarScore += 15;
          grammarPluses.push("Sử dụng chính xác cấu trúc Present Continuous (be + V-ing) để diễn tả công việc đang xử lý.");
        }
      } else if (lessonId === 'a1-m03-l02') {
        // Weekly report (Past, Present, Pending)
        const hasPast = lowerText.includes("completed") || lowerText.includes("finished") || lowerText.includes("launched") || lowerText.includes("yesterday");
        const hasPresent = lowerText.includes("am testing") || lowerText.includes("am optimizing") || lowerText.includes("currently") || lowerText.includes("middle of");
        const hasPending = lowerText.includes("pending") || lowerText.includes("on hold") || lowerText.includes("blocked");

        if (hasPast) { grammarScore += 10; grammarPluses.push("Dùng tốt thì Quá khứ đơn cho các việc đã hoàn thành hôm qua."); }
        else { grammarScore -= 10; grammarIssues.push("Chưa sử dụng rõ ràng thì Quá khứ đơn (ví dụ: completed, finished) để nói về công việc đã hoàn thành."); }

        if (hasPresent) { grammarScore += 10; }
        else { grammarScore -= 10; grammarIssues.push("Chưa sử dụng Present Continuous hoặc 'currently' để cập nhật nhiệm vụ đang diễn ra hôm nay."); }
      } else if (lessonId === 'a1-m03-l04') {
        const hasPast = lowerText.includes("yesterday") || lowerText.includes("completed") || lowerText.includes("finished");
        const hasPresent = lowerText.includes("today") || lowerText.includes("am focusing") || lowerText.includes("am working");
        const hasBlocker = lowerText.includes("blocker") || lowerText.includes("delaying") || lowerText.includes("issue");

        if (hasPast && hasPresent && hasBlocker) {
          grammarScore += 20;
          grammarPluses.push("Báo cáo stand-up đúng chuẩn mô hình PPP (Progress, Plans, Problems).");
        } else {
          grammarScore -= 10;
          grammarIssues.push("Cần đảm bảo đủ 3 phần: Hôm qua (Quá khứ), Hôm nay (Hiện tại tiếp diễn), và Trở ngại (Blocker).");
        }
      } else if (lessonId === 'a1-m03-challenge') {
        const hasPast = lowerText.includes("completed") || lowerText.includes("finished") || lowerText.includes("done") || lowerText.includes("launched") || lowerText.includes("created") || lowerText.includes("optimized");
        const hasPresent = lowerText.includes("testing") || lowerText.includes("working") || lowerText.includes("currently") || lowerText.includes("focusing") || lowerText.includes("optimizing") || lowerText.includes("drafting");
        const hasBlocker = lowerText.includes("blocker") || lowerText.includes("waiting") || lowerText.includes("help") || lowerText.includes("stuck") || lowerText.includes("pending") || lowerText.includes("issue") || lowerText.includes("delay");
        const hasNext = lowerText.includes("next") || lowerText.includes("tomorrow") || lowerText.includes("plan");
        const hasResult = lowerText.includes("ctr") || lowerText.includes("cpc") || lowerText.includes("cpm") || lowerText.includes("conversions") || lowerText.includes("result") || lowerText.includes("traffic") || lowerText.includes("clicks") || lowerText.includes("leads") || lowerText.includes("spend");

        if (hasPast && hasPresent && hasBlocker && hasNext && hasResult) {
          grammarScore += 20;
          grammarPluses.push("Cấu trúc báo cáo xuất sắc, đầy đủ cả 5 phần cốt lõi: việc đã hoàn thành, việc đang làm, kết quả chiến dịch, trở ngại và bước tiếp theo.");
        } else {
          if (!hasPast) grammarIssues.push("Thiếu phần báo cáo công việc đã hoàn thành sử dụng thì quá khứ đơn (ví dụ: completed, finished, launched).");
          if (!hasPresent) grammarIssues.push("Thiếu phần báo cáo công việc đang thực hiện sử dụng thì hiện tại tiếp diễn (ví dụ: am currently working, am testing).");
          if (!hasResult) grammarIssues.push("Thiếu báo cáo kết quả/chỉ số chiến dịch (ví dụ: CTR, CPC, conversions, results).");
          if (!hasBlocker) grammarIssues.push("Thiếu thông tin về trở ngại hoặc yêu cầu hỗ trợ (ví dụ: blocker, stuck, waiting for).");
          if (!hasNext) grammarIssues.push("Thiếu kế hoạch tiếp theo hoặc hành động chuẩn bị cho ngày mai (ví dụ: next steps, tomorrow's plan).");
          grammarScore -= (grammarIssues.length * 8);
        }
      } else {
        grammarScore += 10;
        grammarPluses.push("Cấu trúc ngữ pháp câu rõ ràng, chia động từ tương đối chính xác.");
      }
      grammarScore = Math.max(40, Math.min(100, grammarScore));

      // 2. Vocabulary Evaluation (Presence of target key phrases)
      let vocabularyScore = 70;
      const detectedVocab: string[] = [];
      const missingVocab: string[] = [];

      if (lessonId === 'a1-m03-challenge') {
        const mktVocab = ["campaign", "ad", "creative", "budget", "ctr", "cpc", "cpm", "conversions", "facebook", "tiktok", "brief", "lead", "traffic"];
        const detectedMktVocab = mktVocab.filter(v => lowerText.includes(v));
        if (detectedMktVocab.length >= 2) {
          vocabularyScore = Math.min(100, 85 + detectedMktVocab.length * 4);
          grammarPluses.push(`Vận dụng tốt các thuật ngữ Marketing chuyên ngành: "${detectedMktVocab.slice(0, 3).join(', ')}".`);
        } else {
          vocabularyScore -= 20;
          grammarIssues.push("Bản báo cáo thử thách nên lồng ghép ít nhất 2 thuật ngữ chuyên ngành Marketing (ví dụ: campaign, budget, CTR, creative, conversions).");
        }
      } else {
        stepContent.vocabulary.words.forEach(w => {
          const rootWord = w.word.toLowerCase().replace(/ing$/, '').trim();
          if (lowerText.includes(rootWord) || lowerText.includes(w.word.toLowerCase())) {
            detectedVocab.push(w.word);
          } else {
            missingVocab.push(w.word);
          }
        });

        if (detectedVocab.length > 0) {
          vocabularyScore += detectedVocab.length * 8;
          grammarPluses.push(`Đã vận dụng linh hoạt thuật ngữ chuyên ngành: "${detectedVocab.join(', ')}".`);
        } else {
          vocabularyScore -= 15;
          grammarIssues.push("Chưa lồng ghép các từ vựng chuyên ngành cốt lõi của bài học vào câu trả lời.");
        }
      }
      vocabularyScore = Math.max(40, Math.min(100, vocabularyScore));

      // 3. Clarity Evaluation (Length, sentence count, punctuation)
      let clarityScore = 80;
      if (wordCount < 15) {
        clarityScore -= 25;
        grammarIssues.push("Bài viết quá ngắn (dưới 15 từ), chưa cung cấp đầy đủ thông tin cập nhật.");
      } else if (wordCount > 45) {
        clarityScore += 10;
        grammarPluses.push("Bài viết có độ dài lý tưởng, cung cấp ngữ cảnh phong phú.");
      } else {
        clarityScore += 5;
      }

      if (lessonId === 'a1-m03-challenge') {
        if (sentenceCount >= 4 && sentenceCount <= 6) {
          clarityScore += 15;
          grammarPluses.push(`Độ dài báo cáo rất chuẩn gồm ${sentenceCount} câu, đáp ứng xuất sắc tiêu chuẩn 4-6 câu của một Slack update chuyên nghiệp.`);
        } else if (sentenceCount < 4) {
          clarityScore -= 20;
          grammarIssues.push(`Bài báo cáo hơi ngắn (chỉ có ${sentenceCount} câu). Thử thách yêu cầu viết từ 4–6 câu để đảm bảo truyền tải đầy đủ 5 nội dung chính.`);
        } else {
          clarityScore -= 15;
          grammarIssues.push(`Bài báo cáo hơi dài dòng (có ${sentenceCount} câu). Trên Slack nên giữ cập nhật súc tích từ 4–6 câu để đồng nghiệp dễ nắm bắt thông tin.`);
        }
      } else {
        if (sentenceCount < 3) {
          clarityScore -= 15;
          grammarIssues.push("Nên tách nội dung thành 3-4 câu rõ ràng thay vì gộp chung vào một câu dài dễ gây bối rối.");
        } else {
          grammarPluses.push("Tách câu rành mạch, sử dụng dấu chấm câu hợp lý.");
        }
      }
      clarityScore = Math.max(40, Math.min(100, clarityScore));

      // 4. Tone Evaluation (Greetings, transitions, professional markers)
      let toneScore = 75;
      const hasGreeting = lowerText.startsWith("hi") || lowerText.startsWith("hey") || lowerText.startsWith("hello") || lowerText.startsWith("dear") || lowerText.includes("good morning");
      const hasPolitePhrase = lowerText.includes("please") || lowerText.includes("could you") || lowerText.includes("thank") || lowerText.includes("appreciate");

      if (hasGreeting) {
        toneScore += 15;
        if (lessonId === 'a1-m03-challenge') {
          grammarPluses.push("Có lời chào mở đầu (Hi Team / Hi everyone) rất đúng chuẩn văn phong Slack công sở.");
        } else {
          grammarPluses.push("Có lời chào công sở lịch sự mở đầu (Hi/Hey/Hello).");
        }
      } else {
        toneScore -= 15;
        if (lessonId === 'a1-m03-challenge') {
          grammarIssues.push("Nên mở đầu tin nhắn Slack bằng một lời chào súc tích đến cả nhóm (ví dụ: Hi Team / Hi everyone) trước khi báo cáo.");
        } else {
          grammarIssues.push("Nên thêm lời chào đối tác hoặc đồng nghiệp ở đầu để giữ văn phong thân thiện, lịch sự.");
        }
      }

      if (lessonId === 'a1-m03-l03') {
        if (hasPolitePhrase) {
          toneScore += 10;
          grammarPluses.push("Sử dụng các cụm từ giảm nhẹ/hỏi ý kiến khéo léo (Could you please...).");
        } else {
          toneScore -= 10;
          grammarIssues.push("Thiếu các trạng từ/trợ động từ giảm nhẹ lịch sự khi nhờ vả làm rõ.");
        }
      }
      toneScore = Math.max(40, Math.min(100, toneScore));

      // Calculate total final weighted score
      const finalScore = Math.round((grammarScore * 0.3) + (vocabularyScore * 0.3) + (clarityScore * 0.2) + (toneScore * 0.2));

      // Compose final detailed feedback object
      const strengths = grammarPluses.length > 0 ? grammarPluses.slice(0, 3) : ["Bố cục bài viết rõ ràng, dễ hiểu.", "Đã cố gắng truyền tải thông điệp công việc."];
      const improvements = grammarIssues.length > 0 ? grammarIssues.slice(0, 3) : ["Có thể mở rộng thêm ý tưởng về thời gian bàn giao dự án.", "Hãy chú ý kiểm tra lỗi chính tả của các danh từ ghép."];

      // Formulate coaching message in Vietnamese
      let vietnameseCoaching = "";
      if (finalScore >= 85) {
        vietnameseCoaching = `Xuất sắc! Bài viết của bạn cực kỳ chuyên nghiệp và chuẩn văn phong Marketing Agency. Bạn đã làm chủ rất tốt cấu trúc bài học và lồng ghép từ vựng tự nhiên. Điểm số tuyệt đối phản ánh đúng nỗ lực của bạn.`;
      } else if (finalScore >= 70) {
        vietnameseCoaching = `Làm tốt lắm! Bạn đã nắm vững ý tưởng cốt lõi và truyền tải đúng thông tin. Tuy nhiên, hãy chú ý thêm một vài lỗi nhỏ về ${grammarIssues.length > 0 ? 'ngữ pháp hoặc từ vựng' : 'cách trình bày và lời chào mở đầu'} để bài viết đạt điểm tối đa nhé.`;
      } else {
        vietnameseCoaching = `Đã ghi nhận nỗ lực của bạn! Bạn đã hiểu đúng tình huống thực tế, nhưng cấu trúc câu tiếng Anh còn một số chỗ chưa tự nhiên hoặc thiếu trợ động từ. Hãy tham khảo phần sửa đổi gợi ý ở dưới và thử viết lại nhé!`;
      }

      // Actionable recommendations (2 specific steps in Vietnamese)
      let recommendations: string[] = [];
      if (lessonId === 'a1-m03-l01') {
        recommendations = [
          "Luyện nói to cấu trúc 'I am currently + verb-ing' kết hợp với 5 từ vựng vừa học 5 lần để phản xạ nhanh trên Slack.",
          "Thực hành viết một câu cập nhật tiến độ tương tự cho một chiến dịch Facebook Ads khác của bạn tối nay."
        ];
      } else if (lessonId === 'a1-m03-l02') {
        recommendations = [
          "Ghi nhớ cụm từ 'pending client sign-off' vào sổ tay để áp dụng ngay vào bảng công việc Asana/Trello tuần tới.",
          "Tập viết báo cáo PPP ngắn hạn cho nhóm của bạn trong buổi họp stand-up sáng mai sử dụng đúng 3 thì tương ứng."
        ];
      } else if (lessonId === 'a1-m03-l03') {
        recommendations = [
          "Áp dụng ngay câu hỏi 'Could you please clarify if... or...' mỗi khi nhận được feedback mơ hồ 'make it pop' từ khách hàng.",
          "Học thuộc lòng từ vựng 'creative brief' để làm điểm tựa đối chiếu khi trao đổi lại các yêu cầu chỉnh sửa thiết kế."
        ];
      } else {
        recommendations = [
          "Luyện tập giới hạn bài nói stand-up của bạn dưới 45 giây để đảm bảo tính ngắn gọn, cô đọng chuẩn Agile.",
          "Thực hành nói to phần Blocker (trở ngại) với trạng thái giải thích rõ nguyên nhân làm chậm tiến trình công việc."
        ];
      }

      let revisedVersion = stepContent.output.sampleAnswer;
      if (lessonId === 'a1-m03-l01') {
        revisedVersion = "Hi! Yes, I'm currently drafting the TikTok ad copy variations and checking them against the creative brief. The copy drafts are ready. I am just waiting for the design file from the creative team to check the layouts.";
      }

      const generatedFeedback: any = {
        score: finalScore,
        grammarScore,
        vocabularyScore,
        clarityScore,
        toneScore,
        strengths,
        improvements,
        vietnameseCoaching,
        revisedVersion,
        recommendations
      };

      if (isSpeaking) {
        generatedFeedback.fluencyEstimate = Math.max(50, Math.min(95, clarityScore + (finalScore > 75 ? 10 : -10)));
        generatedFeedback.intelligibilityEstimate = Math.max(50, Math.min(95, toneScore + 5));
      }

      setCoachFeedback(generatedFeedback);

      // Save to localStorage progress
      onUpdateProgress(prev => {
        const newResponses = { ...prev.lessonResponses };
        newResponses[lessonId] = {
          ...newResponses[lessonId],
          id: `${lessonId}_res`,
          lessonId,
          practiceAnswers,
          outputText,
          audioId,
          audioTranscript,
          coachFeedback: generatedFeedback,
          completedAt: new Date().toISOString()
        };

        const isAlreadyCompleted = prev.completedLessons.includes(lessonId);
        
        const newCompleted = isAlreadyCompleted
          ? prev.completedLessons
          : [...prev.completedLessons, lessonId];

        const updatedXP = { ...prev.skillXP };
        
        if (!isAlreadyCompleted) {
          const skill = currentLesson.mainSkill;
          updatedXP[skill] = (updatedXP[skill] || 0) + 20;
          updatedXP['Vocabulary'] = (updatedXP['Vocabulary'] || 0) + 10;

          // Bonus XP for completing the entire module
          const m03LessonsTotal = lessons.filter(l => l.moduleId === currentLesson.moduleId).length;
          const m03CompletedNow = newCompleted.filter(id => lessons.find(l => l.id === id)?.moduleId === currentLesson.moduleId).length;

          if (m03CompletedNow === m03LessonsTotal) {
             updatedXP[skill] += 100; // Module completion bonus
          }
        }

        const currentVocabIds = stepContent.vocabulary.words.map(w => w.id);
        const currentFormulaIds = stepContent.formulas.items.map(f => f.id);
        const newVocabBookmarks = Array.from(new Set([...prev.vocabBookmarks, ...currentVocabIds]));
        const newFormulaBookmarks = Array.from(new Set([...prev.formulaBookmarks, ...currentFormulaIds]));

        return {
          ...prev,
          lessonResponses: newResponses,
          completedLessons: newCompleted,
          skillXP: updatedXP,
          vocabBookmarks: newVocabBookmarks,
          formulaBookmarks: newFormulaBookmarks
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

        {/* STEP 4: Realistic Workplace Input (Reading & Listening) */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
            <div className="border-b border-slate-100 pb-4 text-center">
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                STEP 4: WORKPLACE INPUT ({stepContent.input?.type === 'Listening' ? 'LISTENING & TRANSCRIPT' : 'READING TASK'})
              </span>
              <h3 className="text-xl font-sans font-bold text-slate-900 tracking-tight mt-2">
                {stepContent.input?.title || 'Tài liệu Gốc'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {stepContent.input?.instruction}
              </p>
              <p className="text-[11px] text-emerald-600 font-medium italic mt-0.5">
                💡 {stepContent.input?.instructionVi}
              </p>
            </div>

            <div className="space-y-6">
              {/* If Listening: render an elegant interactive audio player */}
              {stepContent.input?.type === 'Listening' && (
                <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={playAudio}
                        className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white p-3.5 rounded-full transition-all focus:outline-none cursor-pointer flex items-center justify-center shadow-md"
                        title={isPlayingAudio ? 'Tạm dừng phát âm' : 'Phát âm thanh hội thoại'}
                      >
                        {isPlayingAudio ? (
                          <Pause className="h-5 w-5 fill-current" />
                        ) : (
                          <Play className="h-5 w-5 fill-current ml-0.5" />
                        )}
                      </button>
                      <div className="space-y-1">
                        <p className="text-[9px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
                          {isPlayingAudio ? '● ACTIVE PLAYBACK IN PROGRESS' : 'CLICK TO PLAY NATIVE BRIEFING'}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-slate-300">
                            Voice memo: {stepContent.input.conversations.length} speaker turns
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Audio wave graphics */}
                    <div className="flex items-end gap-1 h-7">
                      {[3, 5, 2, 8, 4, 6, 3, 7, 5, 4, 8, 6, 3, 5, 2, 7, 4, 6, 8, 3, 5].map((h, i) => (
                        <div
                          key={i}
                          className={`w-1 bg-emerald-500 rounded-t transition-all duration-300`}
                          style={{
                            height: `${isPlayingAudio ? (Math.sin(i + Date.now() / 200) * 4 + 5) * 10 : 15}%`,
                            opacity: isPlayingAudio ? 1 : 0.4
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-[10px] text-slate-400 font-sans border-t border-slate-800 pt-2 flex justify-between">
                    <span>*Hệ thống sử dụng giọng máy chuẩn Mỹ (SpeechSynthesis) làm chuẩn phát âm.</span>
                    <span className="text-emerald-400 font-semibold">Tốc độ: 0.85x</span>
                  </div>
                </div>
              )}

              {/* Conversations: Slack/Chat bubbles */}
              {stepContent.input?.conversations && (
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4" />
                    MÔ PHỎNG ĐOẠN HỘI THOẠI (CHAT WORKSPACE FEED):
                  </h4>
                  
                  {stepContent.input.type === 'Listening' && (!stepContent.input.comprehensions || !stepContent.input.comprehensions.every(c => comprehensionSubmitted[c.id])) ? (
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3">
                      <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center">
                        <EyeOff className="h-5 w-5 text-slate-400" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-700">Transcript Đang Bị Ẩn</h5>
                        <p className="text-[11px] text-slate-500 mt-1 max-w-xs">Hãy nghe đoạn hội thoại ở trên và trả lời câu hỏi nghe hiểu bên dưới trước khi xem bản text.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-4">
                      {stepContent.input.conversations.map((msg, midx) => {
                        const isYou = msg.sender.toLowerCase().includes('you');
                        const isCurrentlySpoken = currentSpeechIndex === midx;
                        
                        return (
                          <div key={midx} className={`flex flex-col ${isYou ? 'items-end' : 'items-start'} transition-all duration-300`}>
                            <div className="flex items-center gap-1.5 mb-1 px-1">
                              <span className="text-xs font-bold text-slate-700">{msg.sender}</span>
                              {msg.time && <span className="text-[9px] text-slate-400 font-mono">{msg.time}</span>}
                              {isCurrentlySpoken && (
                                <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded flex items-center gap-1 animate-pulse">
                                  <Volume2 className="h-3 w-3" /> Playing
                                </span>
                              )}
                            </div>
                            <div className={`p-3.5 rounded-2xl max-w-lg text-xs leading-relaxed transition-all duration-300 ${
                              isCurrentlySpoken 
                                ? 'ring-4 ring-emerald-500/30 border-emerald-500 scale-[1.01]' 
                                : ''
                            } ${
                              isYou 
                                ? 'bg-emerald-600 text-white rounded-tr-none font-sans shadow-xs' 
                                : 'bg-white border border-slate-150 text-slate-800 rounded-tl-none shadow-2xs'
                            }`}>
                              <p className="font-semibold">"{msg.message}"</p>
                              {msg.messageVi && (
                                <p className={`mt-1 text-[10px] italic border-t pt-1 ${
                                  isYou ? 'text-emerald-100 border-emerald-500/50' : 'text-slate-400 border-slate-100'
                                }`}>
                                  {msg.messageVi}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Material box */}
              {stepContent.input?.material && (
                <div className="p-5 bg-slate-50 border border-slate-150 rounded-2xl space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="h-4 w-4" />
                    TÀI LIỆU HOẶC EMAIL THAM KHẢO (SUPPORTING RAW WORKCONTEXT):
                  </h4>
                  <p className="text-sm font-sans font-semibold text-slate-800 leading-relaxed whitespace-pre-line border-l-3 border-emerald-500 pl-3">
                    "{stepContent.input?.material}"
                  </p>
                  <p className="text-xs font-sans text-slate-500 italic border-t border-slate-200/60 pt-2.5 leading-relaxed">
                    <strong>Bản dịch Việt ngữ:</strong> {stepContent.input?.materialVi}
                  </p>
                </div>
              )}

              {/* Board Columns (Asana mockup) */}
              {stepContent.input?.boardColumns && (
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">
                    GIAO DIỆN BẢNG TIẾN ĐỘ DỰ ÁN (ASANA INTERFACE MOCKUP):
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stepContent.input.boardColumns.map((col, cidx) => (
                      <div key={cidx} className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-3 flex flex-col justify-between">
                        <div className="flex items-center justify-between border-b border-slate-250 pb-2">
                          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">{col.name}</span>
                          <span className="text-[9px] font-mono text-slate-400 bg-white border border-slate-100 px-1.5 py-0.5 rounded font-bold">{col.tasks.length} tasks</span>
                        </div>
                        <div className="space-y-2 flex-1">
                          {col.tasks.map((task, tidx) => (
                            <div key={tidx} className="bg-white border border-slate-100 p-3 rounded-lg shadow-2xs space-y-1.5">
                              <h5 className="text-xs font-bold text-slate-900 font-sans">{task.title}</h5>
                              <div className="flex items-center justify-between pt-1 border-t border-slate-50">
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                  task.status === 'Completed'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                    : task.status === 'In Progress'
                                      ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                      : 'bg-amber-50 text-amber-700 border border-amber-100'
                                }`}>
                                  {task.status}
                                </span>
                                {task.statusVi && (
                                  <span className="text-[9px] text-slate-400 italic font-medium">{task.statusVi}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comprehension Questions Section (LISTENING COMPREHENSION ACTIVITIES) */}
              {stepContent.input?.comprehensions && stepContent.input.comprehensions.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-150">
                  <h4 className="text-[10px] font-bold text-emerald-600 font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" />
                    BÀI TẬP NGHE HIỂU (LISTENING COMPREHENSION QUESTIONS):
                  </h4>
                  
                  <div className="space-y-4">
                    {stepContent.input.comprehensions.map((comp, cidx) => {
                      const selectedCompAns = comprehensionAnswers[comp.id];
                      const compSub = comprehensionSubmitted[comp.id];
                      const isCompCorrect = selectedCompAns === comp.correctAnswer;
                      
                      return (
                        <div key={comp.id} className="border border-slate-150 rounded-xl p-4 space-y-3 bg-white shadow-3xs">
                          <div>
                            <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                              CÂU HỎI {cidx + 1}
                            </span>
                            <h5 className="text-xs font-bold text-slate-800 font-sans mt-1">
                              {comp.prompt}
                            </h5>
                            <p className="text-[11px] text-slate-400 italic font-sans">
                              {comp.promptVi}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {comp.options.map((opt) => {
                              const isSel = selectedCompAns === opt;
                              let btnStyle = "border-slate-100 hover:bg-slate-50 text-slate-700";
                              if (isSel) btnStyle = "border-emerald-500 bg-emerald-50/50 text-emerald-900 font-medium";
                              if (compSub) {
                                if (opt === comp.correctAnswer) {
                                  btnStyle = "border-emerald-500 bg-emerald-100 text-emerald-900 font-bold";
                                } else if (isSel) {
                                  btnStyle = "border-red-400 bg-red-50 text-red-900";
                                } else {
                                  btnStyle = "border-slate-100 opacity-50 text-slate-400";
                                }
                              }

                              return (
                                <button
                                  key={opt}
                                  disabled={compSub}
                                  onClick={() => setComprehensionAnswers(prev => ({ ...prev, [comp.id]: opt }))}
                                  className={`p-2.5 text-left text-[11px] border rounded-lg transition-all ${btnStyle} cursor-pointer`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {!compSub ? (
                            <button
                              disabled={!selectedCompAns}
                              onClick={() => setComprehensionSubmitted(prev => ({ ...prev, [comp.id]: true }))}
                              className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all ${
                                selectedCompAns 
                                  ? 'bg-slate-800 text-white hover:bg-slate-900' 
                                  : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                              }`}
                            >
                              Nộp câu trả lời nghe hiểu
                            </button>
                          ) : (
                            <div className={`p-3 rounded-lg border text-[11px] leading-relaxed ${
                              isCompCorrect ? 'bg-emerald-50/50 border-emerald-100 text-emerald-900' : 'bg-red-50/50 border-red-100 text-red-900'
                            }`}>
                              <p className="font-semibold">{isCompCorrect ? '✓ Đúng rồi!' : '✗ Chưa chính xác.'}</p>
                              <p className="mt-0.5"><strong>Giải thích (Explain):</strong> {comp.explanation}</p>
                              <p className="text-slate-500 mt-0.5">→ {comp.explanationVi}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Note Taking section is still kept as a quiet side note tool */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 font-sans flex items-center gap-1.5" htmlFor="thought-notes">
                  <FileText className="h-4 w-4 text-slate-400" />
                  Ghi chú hoặc phân tích nháp của bạn (Không bắt buộc):
                </label>
                <textarea
                  id="thought-notes"
                  className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-xs text-slate-700 font-sans h-24 focus:outline-none bg-white/50"
                  placeholder="Viết nháp ý tưởng, từ vựng hoặc cấu trúc bạn rút ra được từ tài liệu trên..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>

              {/* Workspace coaching comment */}
              <div className="bg-emerald-50/50 border border-emerald-50 text-emerald-800 p-4 rounded-xl text-[11px] flex items-start gap-2.5 leading-relaxed">
                <Sparkles className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <strong>💡 Lời khuyên chuẩn hóa tiếng Anh:</strong> Hãy chú ý kĩ cách dùng các danh từ Marketing ghép 
                  và cách diễn đạt thời gian trong tài liệu này để sẵn sàng cho phần làm bài trắc nghiệm (Step 5) và viết bài chính thức (Step 6).
                </div>
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
                const isCorrect = q.type === 'matching'
                  ? (matchingCompletedPairs[q.id]?.length === q.matchingPairs?.length &&
                     (matchingCompletedPairs[q.id] || []).every(up =>
                       (q.matchingPairs || []).some((cp: any) =>
                         cp.english.toLowerCase().trim() === up.english.toLowerCase().trim() &&
                         cp.vietnamese.toLowerCase().trim() === up.vietnamese.toLowerCase().trim()
                       )
                     ))
                  : (selectedOption ? selectedOption.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim() : false);

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

                    {/* Interactive Question Types */}
                    {(!q.type || q.type === 'multiple_choice' || q.type === 'fill_blank') && (
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
                    )}

                    {/* Word Reorder / Sentence Builder type */}
                    {q.type === 'reorder' && q.reorderWords && (
                      <div className="space-y-4">
                        {/* Selected Sequence Tray */}
                        <div className="p-4 bg-white border border-dashed border-slate-250 rounded-xl min-h-16 flex flex-wrap gap-2 items-center">
                          {(!reorderWordIndices[q.id] || reorderWordIndices[q.id].length === 0) ? (
                            <span className="text-xs text-slate-400 italic">Nhấp vào các từ phía dưới để bắt đầu sắp xếp câu...</span>
                          ) : (
                            reorderWordIndices[q.id].map((wordIdx) => (
                              <button
                                key={wordIdx}
                                disabled={isSubmitted}
                                onClick={() => handleSelectReorderIndex(q.id, wordIdx, q.reorderWords || [])}
                                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1.5 rounded-lg border border-emerald-200 font-sans flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <span>{q.reorderWords?.[wordIdx]}</span>
                                {!isSubmitted && <span className="text-[10px] text-emerald-400">×</span>}
                              </button>
                            ))
                          )}
                        </div>

                        {/* Word Pool */}
                        {!isSubmitted && (
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">TỪ VỰNG GỢI Ý (CLICK ĐỂ CHỌN):</span>
                            <div className="flex flex-wrap gap-2">
                              {q.reorderWords.map((word, wordIdx) => {
                                const isUsed = reorderWordIndices[q.id]?.includes(wordIdx);
                                return (
                                  <button
                                    key={wordIdx}
                                    disabled={isUsed}
                                    onClick={() => handleSelectReorderIndex(q.id, wordIdx, q.reorderWords || [])}
                                    className={`text-xs px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                                      isUsed
                                        ? 'bg-slate-100 border-slate-100 text-slate-300 opacity-40 cursor-not-allowed'
                                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 shadow-3xs hover:shadow-2xs active:scale-95'
                                    }`}
                                  >
                                    {word}
                                  </button>
                                );
                              })}
                            </div>
                            
                            {reorderWordIndices[q.id]?.length > 0 && (
                              <button
                                onClick={() => handleClearReorder(q.id)}
                                className="text-[10px] font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 cursor-pointer"
                              >
                                <RotateCcw className="h-3 w-3" /> Xóa tất cả và làm lại
                              </button>
                            )}
                          </div>
                        )}

                        {/* Assembled sentence preview */}
                        {selectedOption && (
                          <div className="text-xs bg-slate-100/50 p-2.5 rounded-lg text-slate-600 font-mono">
                            <strong>Kết quả hiện tại:</strong> "{selectedOption}"
                          </div>
                        )}
                      </div>
                    )}

                    {/* Left & Right click matching type */}
                    {q.type === 'matching' && q.matchingPairs && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* English Column */}
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-slate-400 font-mono">CỤM TỪ TIẾNG ANH (LEFT):</span>
                            <div className="space-y-1.5">
                              {q.matchingPairs.map((pair) => {
                                const isMatched = matchingCompletedPairs[q.id]?.some(p => p.english === pair.english);
                                const isSelected = matchingSelectedLeft[q.id] === pair.english;
                                
                                return (
                                  <button
                                    key={pair.english}
                                    disabled={isSubmitted || isMatched}
                                    onClick={() => handleSelectLeft(q.id, pair.english)}
                                    className={`w-full text-left p-3 text-xs border rounded-xl font-medium transition-all ${
                                      isMatched
                                        ? 'bg-slate-50 border-slate-100 text-slate-300 line-through opacity-50 cursor-default'
                                        : isSelected
                                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 cursor-pointer'
                                    }`}
                                  >
                                    {pair.english}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Vietnamese Column */}
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold text-slate-400 font-mono">NGHĨA VIỆT NGỮ (RIGHT):</span>
                            <div className="space-y-1.5">
                              {q.matchingPairs.map((pair) => {
                                const isMatched = matchingCompletedPairs[q.id]?.some(p => p.vietnamese === pair.vietnamese);
                                const isSelected = matchingSelectedRight[q.id] === pair.vietnamese;

                                return (
                                  <button
                                    key={pair.vietnamese}
                                    disabled={isSubmitted || isMatched}
                                    onClick={() => handleSelectRight(q.id, pair.vietnamese)}
                                    className={`w-full text-left p-3 text-xs border rounded-xl font-medium transition-all ${
                                      isMatched
                                        ? 'bg-slate-50 border-slate-100 text-slate-300 line-through opacity-50 cursor-default'
                                        : isSelected
                                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 cursor-pointer'
                                    }`}
                                  >
                                    {pair.vietnamese}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Matches Created Tray */}
                        {matchingCompletedPairs[q.id]?.length > 0 && (
                          <div className="space-y-2 bg-white border border-slate-150 p-4 rounded-xl">
                            <span className="text-[10px] font-bold text-slate-400 font-mono block">CÁC CẶP ĐÃ GHÉP NỐI:</span>
                            <div className="grid grid-cols-1 gap-1.5">
                              {matchingCompletedPairs[q.id].map((pair, pIdx) => (
                                <div key={pIdx} className="flex items-center justify-between p-2 bg-emerald-50/40 border border-emerald-100 rounded-lg text-xs font-medium">
                                  <span className="text-slate-800">{pair.english}</span>
                                  <span className="text-emerald-400 font-mono">⇌</span>
                                  <span className="text-slate-700">{pair.vietnamese}</span>
                                  {!isSubmitted && (
                                    <button
                                      onClick={() => handleRemoveMatchedPair(q.id, pIdx)}
                                      className="text-[10px] text-slate-400 hover:text-red-500 font-bold ml-2 cursor-pointer"
                                    >
                                      Gỡ
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

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
                        isCorrect || q.type === 'matching'
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                          : 'bg-red-50 border-red-100 text-red-800'
                      }`}>
                        <div className="flex items-center gap-1.5 font-bold">
                          {isCorrect || q.type === 'matching' ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                              <span>Hoàn thành chính xác! Excellent.</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-4 w-4 text-red-600" />
                              <span>Đáp án đúng của câu này là:</span>
                            </>
                          )}
                        </div>
                        
                        {q.type === 'reorder' && !isCorrect && (
                          <p className="bg-white border border-red-200/50 p-2.5 rounded-lg text-slate-800 font-bold font-mono">
                            "{q.correctAnswer}"
                          </p>
                        )}
                        
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

              {/* The Input Textarea or Speaking Recorder */}
              {lessonId === 'a1-m03-challenge' ? (
                <div className="space-y-6 border-t border-slate-100 pt-4">
                  {/* Part A: Written Slack Update */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-750 uppercase tracking-wide flex items-center gap-1.5" htmlFor="output-textarea">
                        <span className="bg-emerald-600 text-white h-5 w-5 rounded-full flex items-center justify-center font-bold text-[10px] font-mono">A</span>
                        Part A: Written Slack Update (Bản báo cáo viết trên Slack - Bắt buộc)
                      </label>
                      <button
                        onClick={() => setOutputText(stepContent.output.sampleAnswer)}
                        className="text-[10px] font-semibold text-emerald-600 hover:text-emerald-750 transition-colors cursor-pointer"
                      >
                        💡 Điền mẫu báo cáo súc tích
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-1">
                      Nhập bản báo cáo cuối ngày từ 4–6 câu vào đây. Phải gồm đủ: việc đã xong (quá khứ), việc đang làm (hiện tại tiếp diễn), kết quả chiến dịch, trở ngại và bước tiếp theo.
                    </p>
                    <textarea
                      id="output-textarea"
                      className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm text-slate-800 font-sans h-40 focus:outline-none"
                      placeholder="Hi Team, here is my EOD update..."
                      value={outputText}
                      onChange={(e) => setOutputText(e.target.value)}
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Độ dài: {outputText.split(/\s+/).filter(Boolean).length} từ</span>
                      <span>Số câu: {outputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length} câu (Mục tiêu: 4-6 câu)</span>
                    </div>
                  </div>

                  {/* Part B: Speaking Evidence */}
                  <div className="space-y-2 border-t border-slate-100 pt-4">
                    <label className="text-xs font-bold text-slate-755 uppercase tracking-wide flex items-center gap-1.5">
                      <span className="bg-purple-600 text-white h-5 w-5 rounded-full flex items-center justify-center font-bold text-[10px] font-mono">B</span>
                      Part B: Speaking Evidence (Ghi âm câu trả lời nói của bạn - Bắt buộc)
                    </label>
                    <p className="text-[11px] text-slate-500 leading-relaxed mb-2">
                      Thực hành nói to báo cáo của bạn. Ghi âm giọng nói (hoặc nhập bản transcript nói thay thế nếu không có micro) làm bằng chứng.
                    </p>
                    <SpeakingRecorder 
                      lessonId={lessonId}
                      savedAudioId={audioId}
                      savedTranscript={audioTranscript}
                      onSave={(newAudioId, newTranscript) => {
                        setAudioId(newAudioId);
                        setAudioTranscript(newTranscript);
                      }}
                    />
                  </div>
                </div>
              ) : stepContent.output.format === 'speaking' ? (
                <div className="space-y-4 border-t border-slate-100 pt-4">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700 font-sans">
                      🎙️ Thu âm câu trả lời của bạn:
                    </label>
                  </div>
                  <SpeakingRecorder 
                    lessonId={lessonId}
                    savedAudioId={audioId}
                    savedTranscript={audioTranscript}
                    onSave={(newAudioId, newTranscript) => {
                      setAudioId(newAudioId);
                      setAudioTranscript(newTranscript);
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-700 font-sans" htmlFor="output-textarea">
                      ✍️ Nhập câu trả lời bằng tiếng Anh của bạn:
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
              )}

              {/* Actions: Submit to AI Coach */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={handleAnalyzeOutput}
                  disabled={
                    isSubmittingFeedback || (
                      lessonId === 'a1-m03-challenge'
                        ? (!outputText.trim() || (!audioTranscript.trim() && !audioId))
                        : (stepContent.output.format === 'speaking' ? (!audioTranscript.trim() && !audioId) : !outputText.trim())
                    )
                  }
                  className={`flex-1 font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer text-sm transition-all ${
                    !(
                      isSubmittingFeedback || (
                        lessonId === 'a1-m03-challenge'
                          ? (!outputText.trim() || (!audioTranscript.trim() && !audioId))
                          : (stepContent.output.format === 'speaking' ? (!audioTranscript.trim() && !audioId) : !outputText.trim())
                      )
                    )
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

                {/* Detailed Metrics Breakdown Grid */}
                {!coachFeedback.isAudioOnly && (
                  <div className={`grid gap-4 ${stepContent.output.format === 'speaking' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
                    {[
                      { label: "Grammar (Ngữ pháp)", score: coachFeedback.grammarScore || 80, desc: "Cấu trúc & chia thì động từ", icon: Award, color: "text-blue-600 bg-blue-50 border-blue-100" },
                      { label: "Vocabulary (Từ vựng)", score: coachFeedback.vocabularyScore || 85, desc: "Sử dụng thuật ngữ chuyên ngành", icon: BookOpen, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
                      ...(stepContent.output.format !== 'speaking' ? [
                        { label: "Clarity (Độ rõ ràng)", score: coachFeedback.clarityScore || 90, desc: "Tách câu & độ cô đọng", icon: Eye, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
                        { label: "Tone (Văn phong)", score: coachFeedback.toneScore || 75, desc: "Lời chào & lịch sự công sở", icon: Activity, color: "text-amber-600 bg-amber-50 border-amber-100" }
                      ] : [
                        { label: "Fluency (Độ trôi chảy)*", score: coachFeedback.fluencyEstimate || 80, desc: "Ước tính dựa trên transcript", icon: Activity, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
                        { label: "Intelligibility (Độ dễ hiểu)*", score: coachFeedback.intelligibilityEstimate || 75, desc: "Ước tính dựa trên cấu trúc", icon: Eye, color: "text-amber-600 bg-amber-50 border-amber-100" },
                        { label: "Tone (Văn phong)", score: coachFeedback.toneScore || 75, desc: "Lời chào & lịch sự công sở", icon: Sparkles, color: "text-purple-600 bg-purple-50 border-purple-100" }
                      ])
                    ].map((metric, idx) => {
                      const ScoreIcon = metric.icon;
                      return (
                        <div key={idx} className="bg-white border border-slate-150 p-4 rounded-2xl shadow-3xs flex flex-col justify-between hover:shadow-2xs transition-all hover:border-slate-250">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className={`p-1.5 rounded-lg border ${metric.color}`}>
                                <ScoreIcon className="h-4 w-4" />
                              </span>
                              <span className="text-sm font-extrabold text-slate-800">{metric.score}<span className="text-[10px] text-slate-400 font-normal">/100</span></span>
                            </div>
                            <div>
                              <h5 className="text-[11px] font-bold text-slate-900 font-sans">{metric.label}</h5>
                              <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{metric.desc}</p>
                            </div>
                          </div>
                          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-3">
                            <div 
                              className={`h-full rounded-full ${
                                metric.score >= 85 ? 'bg-emerald-500' : metric.score >= 70 ? 'bg-amber-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${metric.score}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Vietnamese Coach explanation */}
                {!coachFeedback.isAudioOnly && coachFeedback.vietnameseCoaching && (
                  <div className="p-5 bg-emerald-50/45 border border-emerald-50 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                      <MessageSquare className="h-4.5 w-4.5 text-emerald-600" />
                      <span>HƯỚNG DẪN COACH TIẾNG VIỆT</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans">
                      {coachFeedback.vietnameseCoaching}
                    </p>
                  </div>
                )}

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

                {/* Actionable Recommendations */}
                {coachFeedback.recommendations && coachFeedback.recommendations.length > 0 && (
                  <div className="p-5 border border-slate-200 rounded-2xl space-y-3 bg-white">
                    <h5 className="text-xs font-bold text-slate-800 font-sans tracking-wide uppercase flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-emerald-600 fill-current" />
                      🎯 KHUYẾN NGHỊ HÀNH ĐỘNG TIẾP THEO (ACTIONABLE ADVICE)
                    </h5>
                    <div className="space-y-2">
                      {coachFeedback.recommendations.map((rec: string, ridx: number) => (
                        <div key={ridx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700 font-sans leading-relaxed">
                          <span className="bg-emerald-100 text-emerald-800 h-5 w-5 rounded-full flex items-center justify-center font-bold shrink-0 font-mono text-[10px]">
                            {ridx + 1}
                          </span>
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Revise & Resubmit Button */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                  <button
                    onClick={() => setCurrentStep(6)}
                    className="flex items-center justify-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-sans text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer transition-colors shadow-3xs"
                  >
                    <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
                    <span>Chỉnh sửa & Nộp lại bài (Revise & Resubmit)</span>
                  </button>
                </div>

                {/* Bottom navigation helper */}
                <div className="text-center bg-slate-50 p-4 rounded-xl text-xs text-slate-500 mt-4">
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

            {/* Learned content summary blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left mt-4">
              {/* Score and Rewards */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-700 tracking-wide uppercase font-mono">
                    KẾT QUẢ & PHẦN THƯỞNG:
                  </h4>
                  {coachFeedback?.score && (
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                      Score: {coachFeedback.score}/100
                    </span>
                  )}
                </div>
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

              {/* Vocabulary Summary */}
              <div className="bg-indigo-50/30 p-5 rounded-2xl border border-indigo-100/65 space-y-3">
                <h4 className="text-xs font-bold text-indigo-900 tracking-wide uppercase font-mono flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>TỪ VỰNG ĐÃ LƯU VÀO REVIEW CENTER:</span>
                </h4>
                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                  {stepContent.vocabulary.words.map((w, idx) => (
                    <div key={idx} className="bg-white p-2 rounded-lg border border-slate-100 flex justify-between items-center gap-2">
                      <div>
                        <strong className="text-xs text-indigo-950 font-mono">{w.word}</strong>
                        <span className="text-[10px] text-slate-400 block">{w.partOfSpeech}</span>
                      </div>
                      <span className="text-[11px] text-slate-600 font-sans">{w.vietnameseTranslation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Formulas Summary */}
            <div className="bg-emerald-50/20 p-5 rounded-2xl border border-emerald-100/60 text-left max-w-2xl mx-auto space-y-3">
              <h4 className="text-xs font-bold text-emerald-900 tracking-wide uppercase font-mono flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                <span>CẤU TRÚC GIAO TIẾP ĐÃ HỌC:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stepContent.formulas.items.map((f, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-slate-150 space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      FORMULA {idx + 1}
                    </span>
                    <div className="text-xs font-bold text-slate-900 font-mono">
                      {f.structure}
                    </div>
                    <div className="text-[11px] text-slate-500 leading-normal">
                      {f.purpose} ({f.purposeVi})
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              {onSelectLesson && lessonId === 'a1-m03-l01' && (
                <button
                  onClick={() => onSelectLesson('a1-m03-l02')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold px-6 py-3 rounded-xl cursor-pointer shadow-sm transition-all"
                >
                  Học tiếp Bài 2 (Lesson 2)
                </button>
              )}
              {onSelectLesson && lessonId === 'a1-m03-l02' && (
                <button
                  onClick={() => onSelectLesson('a1-m03-l03')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold px-6 py-3 rounded-xl cursor-pointer shadow-sm transition-all"
                >
                  Học tiếp Bài 3 (Lesson 3)
                </button>
              )}
              {onTabChange && (
                <button
                  onClick={() => onTabChange('review')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-sans text-xs font-bold px-6 py-3 rounded-xl cursor-pointer shadow-sm transition-all"
                >
                  Đi tới Review Center
                </button>
              )}
              <button
                onClick={onBackToModule}
                className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-sans text-xs font-bold px-4 py-3 rounded-xl cursor-pointer transition-all"
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
                  setComprehensionAnswers({});
                  setComprehensionSubmitted({});
                  setMatchingCompletedPairs({});
                  setReorderWordIndices({});
                }}
                className="bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 font-sans text-xs font-bold px-4 py-3 rounded-xl cursor-pointer transition-all"
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
              if (currentStep === 5) {
                const totalQuestions = stepContent?.practice?.questions || [];
                const allSubmitted = totalQuestions.every(q => practiceSubmitted[q.id]);
                if (!allSubmitted) {
                  alert("Vui lòng hoàn thành và bấm 'Nộp câu trả lời' cho tất cả các câu hỏi trắc nghiệm trước khi tiếp tục.");
                  return;
                }
              }
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
