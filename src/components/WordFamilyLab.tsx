import React, { useState, useMemo } from 'react';
import { 
  Volume2, Play, Check, HelpCircle, AlertCircle, Info, 
  Sparkles, Award, RefreshCw, Layers, Map, AlertTriangle, 
  ArrowRight, BookOpen, CheckCircle, Search, ToggleLeft, 
  Sparkle, Flame, ArrowLeftRight, FileText, HeartPulse, PenTool, 
  ClipboardCopy, X
} from 'lucide-react';
import { useSpeech } from '../hooks/useSpeech';
import { 
  WORD_FAMILIES, AFFIXES, SPELLING_RULES, 
  WordFamily, WordForm, Affix, SpellingRule,
  CONTEXT_QUESTIONS, CLINIC_CASES,
  ContextQuestion, ClinicCase
} from '../data/wordFamilyData';

export default function WordFamilyLab() {
  const [activeSubTab, setActiveSubTab] = useState<'explorer' | 'affixes' | 'spelling' | 'context' | 'ielts' | 'apply'>('explorer');
  const { speak } = useSpeech();

  // ==========================================
  // STATE & LOGIC: WORD FAMILY EXPLORER
  // ==========================================
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>(WORD_FAMILIES[0].id);
  const activeFamily = useMemo(() => {
    return WORD_FAMILIES.find(f => f.id === selectedFamilyId) || WORD_FAMILIES[0];
  }, [selectedFamilyId]);

  const [selectedFormType, setSelectedFormType] = useState<'Verb' | 'Noun' | 'Adjective' | 'Adverb'>('Verb');
  const activeForm = useMemo(() => {
    // Return form matching type, or first available form if type not present
    return activeFamily.forms.find(f => f.type === selectedFormType) || activeFamily.forms[0];
  }, [activeFamily, selectedFormType]);

  // Family Quiz state
  const [familyQuizAnswers, setFamilyQuizAnswers] = useState<Record<string, number>>({});
  const [familyQuizChecked, setFamilyQuizChecked] = useState<Record<string, boolean>>({});

  // Pre-defined sentences for family quizzes corresponding to each root
  const familyQuizzes = useMemo(() => {
    const quizMap: Record<string, { sentence: string; options: string[]; correctIndex: number; explanationVi: string }> = {
      optimize: {
        sentence: "To achieve the best possible ROAS, we must search for the ________ budget allocation across channels.",
        options: ["optimize", "optimization", "optimal", "optimally"],
        correctIndex: 2, // optimal
        explanationVi: "Trong câu này, đứng trước danh từ ghép 'budget allocation' cần một Tính từ bổ nghĩa. 'optimal' (tối ưu/lý tưởng nhất) là tính từ phù hợp nhất. 'optimize' là động từ, 'optimization' là danh từ và 'optimally' là trạng từ."
      },
      analyze: {
        sentence: "The growth hacker completed a deep click-stream ________ to locate where users drop off in the funnel.",
        options: ["analyze", "analysis", "analyst", "analytical"],
        correctIndex: 1, // analysis
        explanationVi: "Sau mạo từ 'a' và tính từ/danh từ bổ nghĩa 'click-stream' cần một Danh từ chỉ hoạt động phân tích, đó là 'analysis' (/əˈnæləsɪs/). 'analyst' là danh từ chỉ người phân tích, không phù hợp ở đây."
      },
      advertise: {
        sentence: "The brand manager decided to allocate more resources to native ________ rather than intrusive banners.",
        options: ["advertise", "advertising", "advertisement", "advertiser"],
        correctIndex: 1, // advertising
        explanationVi: "Đứng sau tính từ 'native' cần một danh từ. Ở đây ta nói về ngành/hoạt động quảng cáo nói chung (không đếm được), do đó dùng 'advertising'. 'advertisement' là một mẫu quảng cáo cụ thể (đếm được), thường dùng dạng số nhiều 'advertisements' hoặc 'ads'."
      },
      produce: {
        sentence: "The creative team had a highly ________ week, producing over 15 high-converting ad hooks.",
        options: ["produce", "production", "productive", "productively"],
        correctIndex: 2, // productive
        explanationVi: "Đứng sau trạng từ chỉ mức độ 'highly' và bổ nghĩa cho danh từ 'week' (hoặc đứng sau động từ liên kết 'had a... week') cần một Tính từ. 'productive' (năng suất/hiệu quả cao) là đáp án đúng."
      },
      communicate: {
        sentence: "Clear brand ________ is critical when launching a disruptive product to avoid market confusion.",
        options: ["communicate", "communication", "communicator", "communicative"],
        correctIndex: 1, // communication
        explanationVi: "Vị trí này làm chủ ngữ chính của câu, đứng trước động từ 'is' nên cần một Danh từ chỉ sự truyền thông/truyền đạt thông điệp, đó là 'communication'. 'communicator' là người truyền đạt."
      },
      connect: {
        sentence: "Marketers must ensure continuous ________ between their CRM platform and email autoresponders.",
        options: ["connect", "connection", "connectivity", "connected"],
        correctIndex: 2, // connectivity
        explanationVi: "Ở đây chúng ta cần một Danh từ mô tả 'khả năng/tính chất liên kết kỹ thuật số' giữa hai hệ thống công nghệ, từ chuyên dùng là 'connectivity'. 'connection' là mối liên kết chung chung."
      }
    };
    return quizMap;
  }, []);

  const activeFamilyQuiz = familyQuizzes[activeFamily.id];

  const handleAnswerFamilyQuiz = (optionIndex: number) => {
    if (familyQuizChecked[activeFamily.id]) return;
    setFamilyQuizAnswers(prev => ({ ...prev, [activeFamily.id]: optionIndex }));
    setFamilyQuizChecked(prev => ({ ...prev, [activeFamily.id]: true }));
  };

  const handleResetFamilyQuiz = () => {
    setFamilyQuizAnswers(prev => {
      const copy = { ...prev };
      delete copy[activeFamily.id];
      return copy;
    });
    setFamilyQuizChecked(prev => {
      const copy = { ...prev };
      delete copy[activeFamily.id];
      return copy;
    });
  };

  // ==========================================
  // STATE & LOGIC: AFFIX MAP & BUILDER GAME
  // ==========================================
  const [affixFilter, setAffixFilter] = useState<'all' | 'prefix' | 'suffix'>('all');
  const [selectedAffix, setSelectedAffix] = useState<string>(AFFIXES[0].affix);

  const activeAffix = useMemo(() => {
    return AFFIXES.find(a => a.affix === selectedAffix) || AFFIXES[0];
  }, [selectedAffix]);

  const filteredAffixes = useMemo(() => {
    if (affixFilter === 'all') return AFFIXES;
    return AFFIXES.filter(a => a.type === affixFilter);
  }, [affixFilter]);

  // Affix Builder Game State
  const gameTargetWords = useMemo(() => [
    { affix: 're-', base: 'brand', result: 'rebrand', definition: 'Tái định vị / đổi bộ nhận diện thương hiệu', sentence: 'After 10 years, the company decided to rebrand to appeal to Gen Z.' },
    { affix: 're-', base: 'target', result: 'retarget', definition: 'Nhắm mục tiêu lại (quảng cáo bám đuổi)', sentence: 'We need to retarget visitors who abandoned their shopping carts.' },
    { affix: 'hyper-', base: 'personalize', result: 'hyperpersonalize', definition: 'Cá nhân hóa cực độ (dựa trên hành vi chi tiết)', sentence: 'Netflix uses AI to hyperpersonalize recommend banners for each user.' },
    { affix: 'micro-', base: 'influencer', result: 'micro-influencer', definition: 'Người ảnh hưởng có tệp khán giả nhỏ nhưng tương tác cao', sentence: 'Running campaigns with micro-influencer profiles often yields higher engagement rates.' },
    { affix: 'multi-', base: 'channel', result: 'multichannel', definition: 'Tiếp thị đa kênh tách biệt', sentence: 'A multichannel strategy uses social media, email, and print separately.' },
    { affix: '-ize / -ise', base: 'personalize', result: 'personalize', definition: 'Cá nhân hóa', sentence: 'Marketers personalize email subject lines to improve open rates.' },
    { affix: '-ation / -tion', base: 'segment', result: 'segmentation', definition: 'Sự phân khúc khách hàng', sentence: 'Audience segmentation helps craft tailored messages for distinct groups.' },
    { affix: '-ive', base: 'persuade', result: 'persuasive', definition: 'Mang tính thuyết phục cao', sentence: 'A persuasive copywriter knows how to trigger emotional buying decisions.' }
  ], []);

  const [selectedGameAffix, setSelectedGameAffix] = useState<string | null>(null);
  const [selectedGameBase, setSelectedGameBase] = useState<string | null>(null);
  const [discoveredWords, setDiscoveredWords] = useState<string[]>([]);
  const [gameMessage, setGameMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' | null }>({ text: '', type: null });

  const gameAffixList = ['re-', 'de-', 'multi-', 'hyper-', 'micro-', '-ize / -ise', '-ation / -tion', '-ive'];
  const gameBaseList = ['brand', 'target', 'channel', 'personalize', 'influencer', 'segment', 'persuade', 'measure'];

  const handleAssembleWord = () => {
    if (!selectedGameAffix || !selectedGameBase) {
      setGameMessage({ text: 'Hãy chọn một Tiếp đầu/vị ngữ và một Từ gốc trước!', type: 'info' });
      return;
    }

    // Check if combination exists in target list
    const match = gameTargetWords.find(t => t.affix === selectedGameAffix && t.base === selectedGameBase);

    if (match) {
      if (discoveredWords.includes(match.result)) {
        setGameMessage({ 
          text: `Bạn đã ghép được từ "${match.result.toUpperCase()}" trước đó rồi! Hãy tìm các tổ hợp từ mới khác.`, 
          type: 'info' 
        });
      } else {
        const nextDiscovered = [...discoveredWords, match.result];
        setDiscoveredWords(nextDiscovered);
        setGameMessage({ 
          text: `🎉 Xuất sắc! Ghép thành công: "${match.result.toUpperCase()}" (${match.definition}).`, 
          type: 'success' 
        });
        speak(match.result, 'english');
      }
    } else {
      setGameMessage({ 
        text: `❌ Chưa khớp rồi! Sự kết hợp giữa "${selectedGameAffix}" và "${selectedGameBase}" không tạo ra từ vựng Marketing chuẩn xác. Hãy thử lại!`, 
        type: 'error' 
      });
    }

    // Reset selections
    setSelectedGameAffix(null);
    setSelectedGameBase(null);
  };

  const handleResetGame = () => {
    setDiscoveredWords([]);
    setSelectedGameAffix(null);
    setSelectedGameBase(null);
    setGameMessage({ text: 'Thử thách đã được thiết lập lại. Hãy ghép từ mới!', type: 'info' });
  };

  // ==========================================
  // STATE & LOGIC: SPELLING RULES & QUIZ
  // ==========================================
  const [selectedRuleId, setSelectedRuleId] = useState<string>(SPELLING_RULES[0].id);
  const activeRule = useMemo(() => {
    return SPELLING_RULES.find(r => r.id === selectedRuleId) || SPELLING_RULES[0];
  }, [selectedRuleId]);

  // Quiz progress states for each spelling rule
  const [ruleQuizAnswers, setRuleQuizAnswers] = useState<Record<string, Record<number, number>>>({});
  const [ruleQuizChecked, setRuleQuizChecked] = useState<Record<string, Record<number, boolean>>>({});

  const handleAnswerRuleQuiz = (questionIdx: number, optionIdx: number) => {
    const currentRuleAnswers = ruleQuizAnswers[activeRule.id] || {};
    const currentRuleChecked = ruleQuizChecked[activeRule.id] || {};

    if (currentRuleChecked[questionIdx]) return; // already answered

    setRuleQuizAnswers(prev => ({
      ...prev,
      [activeRule.id]: { ...currentRuleAnswers, [questionIdx]: optionIdx }
    }));

    setRuleQuizChecked(prev => ({
      ...prev,
      [activeRule.id]: { ...currentRuleChecked, [questionIdx]: true }
    }));
  };

  const handleResetRuleQuiz = () => {
    setRuleQuizAnswers(prev => {
      const copy = { ...prev };
      delete copy[activeRule.id];
      return copy;
    });
    setRuleQuizChecked(prev => {
      const copy = { ...prev };
      delete copy[activeRule.id];
      return copy;
    });
  };

  // Get score for active spelling rule quiz
  const activeRuleQuizScore = useMemo(() => {
    const answers = ruleQuizAnswers[activeRule.id] || {};
    let score = 0;
    activeRule.quiz.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  }, [activeRule, ruleQuizAnswers]);

  const activeRuleQuizCompletedCount = useMemo(() => {
    const checked = ruleQuizChecked[activeRule.id] || {};
    return Object.keys(checked).length;
  }, [activeRule, ruleQuizChecked]);

  // ==========================================
  // STATE & LOGIC: CONTEXT PRACTICE (PHASE 2B)
  // ==========================================
  const [contextCategory, setContextCategory] = useState<'marketing' | 'family' | 'ielts'>('marketing');
  const [contextSelectedAnswers, setContextSelectedAnswers] = useState<Record<string, number>>({});
  const [contextCheckedQuestions, setContextCheckedQuestions] = useState<Record<string, boolean>>({});

  const filteredQuestions = useMemo(() => {
    return CONTEXT_QUESTIONS.filter(q => q.category === contextCategory);
  }, [contextCategory]);

  const handleSelectContextOption = (questionId: string, optionIndex: number) => {
    if (contextCheckedQuestions[questionId]) return;
    setContextSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleCheckContextQuestion = (questionId: string) => {
    setContextCheckedQuestions(prev => ({ ...prev, [questionId]: true }));
  };

  const handleResetContextQuestion = (questionId: string) => {
    setContextSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
    setContextCheckedQuestions(prev => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };


  // ==========================================
  // STATE & LOGIC: IELTS ERROR CLINIC (PHASE 2B)
  // ==========================================
  const [selectedClinicId, setSelectedClinicId] = useState<string>(CLINIC_CASES[0].id);
  const activeClinic = useMemo(() => {
    return CLINIC_CASES.find(c => c.id === selectedClinicId) || CLINIC_CASES[0];
  }, [selectedClinicId]);

  const [clinicAnswers, setClinicAnswers] = useState<Record<string, number>>({});
  const [clinicChecked, setClinicChecked] = useState<Record<string, boolean>>({});

  const handleAnswerClinicQuiz = (optIdx: number) => {
    if (clinicChecked[activeClinic.id]) return;
    setClinicAnswers(prev => ({ ...prev, [activeClinic.id]: optIdx }));
    setClinicChecked(prev => ({ ...prev, [activeClinic.id]: true }));
  };

  const handleResetClinicQuiz = () => {
    setClinicAnswers(prev => {
      const copy = { ...prev };
      delete copy[activeClinic.id];
      return copy;
    });
    setClinicChecked(prev => {
      const copy = { ...prev };
      delete copy[activeClinic.id];
      return copy;
    });
  };


  // ==========================================
  // STATE & LOGIC: APPLY IT WORKSPACE (PHASE 2B)
  // ==========================================
  const [applyCategory, setApplyCategory] = useState<'marketing' | 'family' | 'ielts'>('marketing');
  const [applyTexts, setApplyTexts] = useState<Record<'marketing' | 'family' | 'ielts', string>>({
    marketing: '',
    family: '',
    ielts: ''
  });

  const APPLY_CONTEXTS = useMemo(() => {
    return [
      {
        id: 'marketing' as const,
        title: 'Marketing update',
        titleVi: 'Cập nhật kế hoạch Marketing',
        prompt: "Write a short internal Slack update to your manager (2-4 sentences) summarizing yesterday's campaign performance analysis and how you plan to improve metrics.",
        promptVi: "Viết một tin nhắn ngắn (2-4 câu) trên Slack cập nhật cho sếp về việc phân tích hiệu suất chiến dịch và kế hoạch cải thiện các chỉ số ngày hôm qua.",
        requiredRoots: ['analyze', 'improve', 'perform'],
        templates: [
          {
            label: "Reference example 1 — adapt it to your own context.",
            text: "Yesterday, we analyzed our search ad campaign performance and saw a significant improvement in click-through rates. We will perform additional optimizations today to improve our conversion rate further."
          },
          {
            label: "Reference example 2 — adapt it to your own context.",
            text: "Our team conducted a deep performance analysis of the new video ads. To improve overall results, we must perform key adjustments next week."
          }
        ]
      },
      {
        id: 'family' as const,
        title: 'Family coordination',
        titleVi: 'Phối hợp gia đình',
        prompt: "Write a short note (2-4 sentences) coordinating weekend chores and managing tasks with your family members to organize a productive and tidy home.",
        promptVi: "Viết một lời nhắn ngắn (2-4 câu) thảo luận công việc nhà và quản lý các tác vụ cuối tuần với người thân để sắp xếp nhà cửa ngăn nắp.",
        requiredRoots: ['organize', 'communicate', 'manage'],
        templates: [
          {
            label: "Reference example 1 — adapt it to your own context.",
            text: "To organize a productive Sunday, let's communicate early about how we will manage our chores. I will manage the kitchen and organize the living room, so we should communicate our progress."
          },
          {
            label: "Reference example 2 — adapt it to your own context.",
            text: "Let's improve our communication when managing weekend tasks. If we organize our schedules collaboratively, we can manage the household chores easily."
          }
        ]
      },
      {
        id: 'ielts' as const,
        title: 'IELTS opinion',
        titleVi: 'Ý kiến nghị luận IELTS',
        prompt: "Write an opinion paragraph (2-4 sentences) for an IELTS Writing Task 2 essay discussing whether digital advertising can effectively persuade modern consumers.",
        promptVi: "Viết đoạn văn nghị luận ngắn (2-4 câu) cho đề thi IELTS Writing Task 2 thảo luận về việc liệu quảng cáo kỹ thuật số có thể thuyết phục người tiêu dùng hiện đại một cách hiệu quả hay không.",
        requiredRoots: ['advertise', 'persuade', 'communicate'],
        templates: [
          {
            label: "Reference example 1 — adapt it to your own context.",
            text: "Many believe that digital advertising has the power to persuade modern consumers easily. However, companies must communicate their brand values honestly rather than just trying to advertise products aggressively."
          },
          {
            label: "Reference example 2 — adapt it to your own context.",
            text: "Advertisers employ various persuasive techniques to communicate with their target audience. If a company can persuade people effectively, its advertising campaigns will succeed."
          }
        ]
      }
    ];
  }, []);

  const activeApplyContext = useMemo(() => {
    return APPLY_CONTEXTS.find(c => c.id === applyCategory) || APPLY_CONTEXTS[0];
  }, [applyCategory, APPLY_CONTEXTS]);

  const handleApplyTemplate = (text: string) => {
    setApplyTexts(prev => ({ ...prev, [applyCategory]: text }));
  };

  const handleResetApplyText = () => {
    setApplyTexts(prev => ({ ...prev, [applyCategory]: '' }));
  };

  const getFamilyForms = (rootId: string): string[] => {
    const family = WORD_FAMILIES.find(f => f.id === rootId);
    if (!family) return [rootId];
    const forms = family.forms.map(f => f.word.toLowerCase());
    if (!forms.includes(rootId)) {
      forms.push(rootId);
    }
    const extra: string[] = [];
    forms.forEach(w => {
      if (w.endsWith('e')) {
        extra.push(w + 's', w + 'd', w.slice(0, -1) + 'ing');
      } else if (w.endsWith('y')) {
        extra.push(w.slice(0, -1) + 'ies', w.slice(0, -1) + 'ied');
      } else {
        extra.push(w + 's', w + 'ed', w + 'ing');
      }
    });
    return Array.from(new Set([...forms, ...extra]));
  };

  const checkRootsInText = (text: string, roots: string[]) => {
    const normalized = text.toLowerCase().trim();
    return roots.map(root => {
      const forms = getFamilyForms(root);
      const matchedWords: string[] = [];
      forms.forEach(form => {
        const escaped = form.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`\\b${escaped}\\b`, 'i');
        if (regex.test(normalized)) {
          matchedWords.push(form);
        }
      });
      return {
        root,
        isUsed: matchedWords.length > 0,
        matchedWords: Array.from(new Set(matchedWords))
      };
    });
  };

  const checkVarietyInText = (text: string, roots: string[]) => {
    const normalized = text.toLowerCase().trim();
    const results: { root: string; count: number; matched: string[] }[] = [];

    roots.forEach(root => {
      const family = WORD_FAMILIES.find(f => f.id === root);
      if (!family) return;
      const primaryForms = family.forms.map(f => f.word.toLowerCase());
      const matched: string[] = [];

      primaryForms.forEach(form => {
        const escaped = form.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`\\b${escaped}\\b`, 'i');
        if (regex.test(normalized)) {
          matched.push(form);
        }
      });

      results.push({
        root,
        count: matched.length,
        matched
      });
    });

    const metVariety = results.some(r => r.count >= 2);
    const metDetails = results.filter(r => r.count >= 2);

    return {
      metVariety,
      metDetails,
      allDetails: results
    };
  };

  const checkSpellingPatterns = (text: string) => {
    const normalized = text.toLowerCase();
    const flags: { word: string; correction: string; rule: string }[] = [];

    const spellingRules = [
      {
        pattern: /\bmarketting\b/i,
        word: 'marketting',
        correction: 'marketing',
        rule: "Từ 'market' có trọng âm rơi vào âm tiết đầu tiên ('mar-ket), do đó không nhân đôi phụ âm 't' khi thêm hậu tố -ing."
      },
      {
        pattern: /\badvertisment\b/i,
        word: 'advertisment',
        correction: 'advertisement',
        rule: "Viết thiếu chữ 'e' ở giữa. Spelling chuẩn là 'advertisement'."
      },
      {
        pattern: /\badvertisments\b/i,
        word: 'advertisments',
        correction: 'advertisements',
        rule: "Viết thiếu chữ 'e' ở giữa. Spelling chuẩn là 'advertisements'."
      },
      {
        pattern: /\banalisys\b/i,
        word: 'analisys',
        correction: 'analysis',
        rule: "Sai chữ 'i' và 's'. Gốc từ 'analysis' có hậu tố -sis ở cuối."
      },
      {
        pattern: /\bconection\b/i,
        word: 'conection',
        correction: 'connection',
        rule: "Thiếu chữ 'n'. Danh từ chuẩn là 'connection' với hai chữ n ở giữa."
      },
      {
        pattern: /\bconections\b/i,
        word: 'conections',
        correction: 'connections',
        rule: "Thiếu chữ 'n'. Danh từ chuẩn là 'connections' với hai chữ n ở giữa."
      },
      {
        pattern: /\boptimizeation\b/i,
        word: 'optimizeation',
        correction: 'optimization',
        rule: "Khi thêm hậu tố -ation vào động từ 'optimize', ta bỏ đuôi 'e' để tạo thành 'optimization'."
      }
    ];

    spellingRules.forEach(({ pattern, word, correction, rule }) => {
      if (pattern.test(normalized)) {
        flags.push({ word, correction, rule });
      }
    });

    return flags;
  };

  return (
    <div className="space-y-6">
      
      {/* Visual Navigation Subtabs */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-1 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-800 font-sans">Word Family Learning Roadmap</h3>
            <p className="text-[11px] text-slate-500 font-sans">Nâng tầm chính xác ngôn từ trong công việc Marketing hằng ngày</p>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-100/80 px-2.5 py-1 rounded-full text-[10px] font-sans font-extrabold shrink-0">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />
            <span>Phần 2: Thực hành & Chẩn lỗi đã kích hoạt!</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 bg-slate-100/80 p-1 rounded-2xl gap-1.5 w-full">
          <button
            id="subtab-explorer"
            onClick={() => setActiveSubTab('explorer')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'explorer'
                ? 'bg-white text-emerald-800 shadow-xs border border-slate-100/60'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">1. Explorer</span>
          </button>
          
          <button
            id="subtab-affixes"
            onClick={() => setActiveSubTab('affixes')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'affixes'
                ? 'bg-white text-emerald-800 shadow-xs border border-slate-100/60'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
            }`}
          >
            <Map className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">2. Affix Map</span>
          </button>

          <button
            id="subtab-spelling"
            onClick={() => setActiveSubTab('spelling')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'spelling'
                ? 'bg-white text-emerald-800 shadow-xs border border-slate-100/60'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">3. Spelling</span>
          </button>

          <button
            id="subtab-context"
            onClick={() => setActiveSubTab('context')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'context'
                ? 'bg-white text-emerald-800 shadow-xs border border-slate-100/60'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
            }`}
          >
            <FileText className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span className="truncate text-center">4. Context</span>
          </button>

          <button
            id="subtab-ielts"
            onClick={() => setActiveSubTab('ielts')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'ielts'
                ? 'bg-white text-emerald-800 shadow-xs border border-slate-100/60'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
            }`}
          >
            <HeartPulse className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">5. Error Clinic</span>
          </button>

          <button
            id="subtab-apply"
            onClick={() => setActiveSubTab('apply')}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'apply'
                ? 'bg-white text-emerald-800 shadow-xs border border-slate-100/60'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
            }`}
          >
            <PenTool className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">6. Apply It</span>
          </button>
        </div>
      </div>

      {/* =======================================================
          SUB-TAB 1: WORD FAMILY EXPLORER
          ======================================================= */}
      {activeSubTab === 'explorer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          
          {/* Left Column: Word Family selector list (4/12) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs">
              <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider mb-3">
                Marketing Root Words (Từ gốc)
              </h4>
              <div className="space-y-1.5">
                {WORD_FAMILIES.map(family => {
                  const isSelected = selectedFamilyId === family.id;
                  return (
                    <button
                      key={family.id}
                      id={`root-btn-${family.id}`}
                      onClick={() => {
                        setSelectedFamilyId(family.id);
                        // Reset forms state to first available form
                        const formsAvailable = family.forms.map(f => f.type);
                        if (formsAvailable.includes('Verb')) {
                          setSelectedFormType('Verb');
                        } else if (formsAvailable.length > 0) {
                          setSelectedFormType(family.forms[0].type);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-emerald-50/80 border border-emerald-200/60 text-emerald-950 font-semibold'
                          : 'bg-white border border-slate-50 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-sans font-bold">{family.root}</span>
                        <span className="text-[11px] text-slate-400 font-sans font-normal mt-0.5">{family.meaningVi}</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-600 bg-emerald-100/40 px-2 py-0.5 rounded font-bold">
                        {family.forms.length} forms
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Helper Box */}
            <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex gap-1.5 items-center text-amber-400">
                <Info className="h-4 w-4" />
                <span className="text-xs font-bold font-sans">Lưu ý đặc biệt:</span>
              </div>
              <p className="text-[11px] leading-relaxed font-sans text-slate-300">
                Khi đổi từ loại trong báo cáo tiếp thị, hãy chú ý cấu trúc song hành (parallel structure). Ví dụ: 
                <span className="text-white"> "We focus on **optimizing** and **producing** quality content"</span> (đều dùng đuôi -ing).
              </p>
            </div>
          </div>

          {/* Right Column: Family Tree details (8/12) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
              
              {/* Header with Title and Coach notes */}
              <div className="border-b border-slate-100 pb-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        Word Family
                      </span>
                      <button
                        onClick={() => speak(activeFamily.root, 'english')}
                        className="p-1 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                        title="Nghe từ gốc"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-950 font-sans tracking-tight mt-1 capitalize">
                      {activeFamily.root}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-sans">Nghĩa cốt lõi:</span>
                    <p className="text-sm font-bold text-slate-800 font-sans mt-0.5">{activeFamily.meaningVi}</p>
                  </div>
                </div>

                {/* Coach Box */}
                <div className="p-3.5 bg-amber-50/50 border border-amber-100 rounded-2xl flex gap-3">
                  <Flame className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-amber-800 font-sans">Cảnh báo lỗi phổ biến của Marketer:</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans mt-0.5">{activeFamily.coachNoteVi}</p>
                  </div>
                </div>
              </div>

              {/* Visual Grid of Forms */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                  Cây từ vựng (Family Members)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Verb', 'Noun', 'Adjective', 'Adverb'].map((type) => {
                    // Check if family has this type
                    const form = activeFamily.forms.find(f => f.type === type);
                    if (!form) return null;

                    const isSelected = selectedFormType === type;

                    return (
                      <button
                        key={type}
                        id={`form-btn-${type}`}
                        onClick={() => setSelectedFormType(type as any)}
                        className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-28 transition-all ${
                          isSelected
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs scale-102'
                            : 'bg-slate-50/50 border-slate-100 text-slate-700 hover:border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex justify-between items-start w-full">
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${
                            isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-200/60 text-slate-500'
                          }`}>
                            {type}
                          </span>
                          <Play className={`h-3 w-3 shrink-0 ${isSelected ? 'text-white/80' : 'text-slate-400'}`} />
                        </div>
                        <div className="mt-3">
                          <p className="text-sm font-extrabold font-sans leading-tight truncate">{form.word}</p>
                          <p className={`text-[11px] font-mono mt-0.5 truncate ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                            {form.phonetic}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Form Inspector */}
              {activeForm && (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-3 animate-fade-in">
                  <div className="flex justify-between items-center border-b border-slate-200/50 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase">Chi tiết từ:</span>
                      <strong className="text-sm font-sans text-emerald-800 capitalize">{activeForm.word}</strong>
                      <span className="text-xs font-mono text-slate-500">({activeForm.type})</span>
                    </div>
                    <button
                      id="speak-active-form-btn"
                      onClick={() => speak(activeForm.word, 'english')}
                      className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] font-sans font-bold text-slate-700 transition-colors shadow-2xs"
                    >
                      <Volume2 className="h-3.5 w-3.5 text-slate-600" />
                      <span>Nghe từ</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Nghĩa tiếng Việt</span>
                      <p className="text-xs font-bold text-slate-800 font-sans mt-0.5">{activeForm.meaningVi}</p>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Phiên âm chuẩn Mỹ</span>
                      <p className="text-xs font-mono font-bold text-emerald-700 mt-0.5">{activeForm.phonetic}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/50">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <span>Bối cảnh Marketing thực tế</span>
                    </span>
                    <div className="mt-1.5 bg-white border border-slate-100 rounded-xl p-3 space-y-1.5 relative group">
                      <p className="text-xs font-sans font-semibold text-slate-900 leading-relaxed pr-8">
                        "{activeForm.example}"
                      </p>
                      <p className="text-xs font-sans text-slate-500 italic">
                        Ý nghĩa: {activeForm.exampleVi}
                      </p>
                      <button
                        id="speak-form-example-btn"
                        onClick={() => speak(activeForm.example, 'english')}
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-700 border border-slate-100 transition-all opacity-0 group-hover:opacity-100 md:opacity-100"
                        title="Nghe câu mẫu"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Root Specific Fill-in-the-blank Quiz */}
              {activeFamilyQuiz && (
                <div className="border border-emerald-100 rounded-2xl p-5 bg-emerald-50/20 space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="text-xs font-sans font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                      <HelpCircle className="h-4 w-4 text-emerald-600" />
                      <span>Thử thách lắp từ vào câu Marketing</span>
                    </h5>
                    {familyQuizChecked[activeFamily.id] && (
                      <button
                        onClick={handleResetFamilyQuiz}
                        className="text-[10px] font-sans font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                      >
                        <RefreshCw className="h-3 w-3" /> Làm lại câu này
                      </button>
                    )}
                  </div>

                  <div className="bg-white border border-emerald-100/60 rounded-xl p-4 shadow-2xs font-sans text-slate-800 text-sm leading-relaxed">
                    {activeFamilyQuiz.sentence.split('________')[0]}
                    <span className="mx-1 border-b-2 border-dashed border-emerald-500 px-3 py-0.5 text-emerald-700 font-extrabold bg-emerald-50/40 rounded">
                      {familyQuizChecked[activeFamily.id] 
                        ? activeFamilyQuiz.options[familyQuizAnswers[activeFamily.id]] 
                        : ' . . . '}
                    </span>
                    {activeFamilyQuiz.sentence.split('________')[1]}
                  </div>

                  {/* Choice Buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                    {activeFamilyQuiz.options.map((opt, idx) => {
                      const isSelected = familyQuizAnswers[activeFamily.id] === idx;
                      const isChecked = familyQuizChecked[activeFamily.id];
                      const isCorrect = idx === activeFamilyQuiz.correctIndex;

                      let btnStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-300';
                      if (isChecked) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-500 border-emerald-500 text-white font-bold scale-102';
                        } else if (isSelected) {
                          btnStyle = 'bg-red-500 border-red-500 text-white';
                        } else {
                          btnStyle = 'bg-slate-100 border-slate-100 text-slate-400 opacity-60 cursor-not-allowed';
                        }
                      }

                      return (
                        <button
                          key={opt}
                          id={`fam-quiz-${activeFamily.id}-choice-${idx}`}
                          disabled={isChecked}
                          onClick={() => handleAnswerFamilyQuiz(idx)}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all truncate text-center ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quiz Feedback */}
                  {familyQuizChecked[activeFamily.id] && (
                    <div className="p-4 bg-white border border-emerald-100 rounded-xl space-y-2 animate-fade-in">
                      <div className="flex items-center gap-2">
                        {familyQuizAnswers[activeFamily.id] === activeFamilyQuiz.correctIndex ? (
                          <span className="text-xs font-sans font-bold text-emerald-700 flex items-center gap-1.5">
                            <CheckCircle className="h-4 w-4 text-emerald-600" /> Cực kỳ chính xác!
                          </span>
                        ) : (
                          <span className="text-xs font-sans font-bold text-red-700 flex items-center gap-1.5">
                            <AlertCircle className="h-4 w-4 text-red-500" /> Chưa đúng rồi!
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        <strong>Giải thích chi tiết:</strong> {activeFamilyQuiz.explanationVi}
                      </p>
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>

        </div>
      )}

      {/* =======================================================
          SUB-TAB 2: AFFIX MAP & BUILDER GAME
          ======================================================= */}
      {activeSubTab === 'affixes' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Section 1: Interactive Affix Map */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-sans font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <Sparkle className="h-5 w-5 text-emerald-600" />
                  <span>Bản đồ Phụ tố trong Marketing (Affix Map)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Khám phá các tiền tố (prefixes) và hậu tố (suffixes) phổ biến nhất giúp nhân bản vốn từ vựng Marketing của bạn gấp nhiều lần.
                </p>
              </div>

              {/* Filter Buttons */}
              <div className="flex bg-slate-100 p-1 rounded-xl gap-1 shrink-0">
                {(['all', 'prefix', 'suffix'] as const).map(f => (
                  <button
                    key={f}
                    id={`affix-filter-${f}`}
                    onClick={() => setAffixFilter(f)}
                    className={`px-3 py-1.5 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${
                      affixFilter === f
                        ? 'bg-white text-emerald-800 shadow-2xs'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {f === 'all' ? 'Tất cả' : f === 'prefix' ? 'Tiền tố (Prefix)' : 'Hậu tố (Suffix)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Affixes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
              {filteredAffixes.map(affix => {
                const isSelected = selectedAffix === affix.affix;
                return (
                  <button
                    key={affix.affix}
                    id={`affix-btn-${affix.affix.replace('/', '')}`}
                    onClick={() => setSelectedAffix(affix.affix)}
                    className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/40 shadow-xs scale-102'
                        : 'border-slate-100 hover:border-slate-200 bg-slate-50/30'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className="text-sm font-mono font-extrabold text-emerald-700 tracking-wide">{affix.affix}</span>
                      <span className={`text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-sm ${
                        affix.type === 'prefix' ? 'bg-indigo-50 text-indigo-600' : 'bg-pink-50 text-pink-600'
                      }`}>
                        {affix.type === 'prefix' ? 'Pre' : 'Suf'}
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs font-sans font-bold text-slate-800 line-clamp-1">{affix.meaning}</p>
                      <p className="text-[10px] text-slate-400 font-sans font-normal truncate mt-0.5">{affix.meaningVi}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Affix Detail & Example Table */}
            {activeAffix && (
              <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 space-y-4 animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200/50 pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400">CHI TIẾT PHỤ TỐ:</span>
                    <h4 className="text-base font-extrabold text-slate-900 font-sans tracking-tight mt-0.5 flex items-center gap-1.5">
                      <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{activeAffix.affix}</span>
                      <span className="text-xs text-slate-500 font-normal">({activeAffix.type === 'prefix' ? 'Tiền tố / Thêm ở đầu' : 'Hậu tố / Thêm ở cuối'})</span>
                    </h4>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400">Ý NGHĨA BIẾN ĐỔI:</span>
                    <p className="text-xs font-bold text-slate-800 font-sans mt-0.5">{activeAffix.meaningVi} ({activeAffix.meaning})</p>
                  </div>
                </div>

                {/* Example Cards */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Ví dụ ứng dụng trong tiếp thị thực tế:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeAffix.examples.map((ex, idx) => (
                      <div key={idx} className="bg-white border border-slate-100 rounded-xl p-4 space-y-3 shadow-2xs relative group">
                        <div className="flex justify-between items-center border-b border-slate-50 pb-1.5">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs font-mono text-slate-400">{ex.root}</span>
                            <span className="text-slate-300 text-xs">&rarr;</span>
                            <span className="text-sm font-sans font-bold text-emerald-800">{ex.word}</span>
                          </div>
                          <button
                            onClick={() => speak(ex.word, 'english')}
                            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-500 transition-colors"
                          >
                            <Volume2 className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-xs text-slate-700 font-sans font-semibold">
                          Nghĩa: <span className="text-slate-900">{ex.meaningVi}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100/50 space-y-1 relative">
                          <p className="text-xs text-slate-800 font-sans pr-8">
                            "{ex.sentence}"
                          </p>
                          <p className="text-[10px] text-slate-400 font-sans font-medium">
                            {ex.sentenceVi}
                          </p>
                          <button
                            onClick={() => speak(ex.sentence, 'english')}
                            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-700"
                            title="Nghe câu"
                          >
                            <Volume2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Section 2: Affix Builder Challenge Mini-Game */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-sans font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Layers className="h-5 w-5 text-emerald-600" />
                <span>🧩 Thử thách ráp từ thông minh (Affix Builder)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Luyện kỹ năng tư duy từ vựng bằng cách nhấp chọn một Tiếp đầu/vị ngữ ở bên trái, kết hợp với từ gốc phù hợp ở bên phải để tạo thành từ vựng Marketing hoàn chỉnh!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-2">
              
              {/* Game Left column: Selector Boards (8/12) */}
              <div className="lg:col-span-8 space-y-5">
                
                {/* Selector Board */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  
                  {/* Prefixes/Suffixes panel */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      Bước 1: Chọn Phụ tố (Affix)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {gameAffixList.map(affix => {
                        const isSelected = selectedGameAffix === affix;
                        return (
                          <button
                            key={affix}
                            id={`game-affix-${affix.replace('/', '').trim()}`}
                            onClick={() => setSelectedGameAffix(affix)}
                            className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                              isSelected
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            {affix}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Base words panel */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      Bước 2: Chọn Từ gốc (Base Word)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {gameBaseList.map(base => {
                        const isSelected = selectedGameBase === base;
                        return (
                          <button
                            key={base}
                            id={`game-base-${base}`}
                            onClick={() => setSelectedGameBase(base)}
                            className={`px-3 py-2 rounded-xl text-xs font-sans font-bold border transition-all ${
                              isSelected
                                ? 'bg-pink-600 border-pink-600 text-white shadow-xs'
                                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            {base}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Combine Workspace and Message */}
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-dashed border-emerald-200 bg-emerald-50/10 rounded-2xl">
                  
                  {/* Selection Display */}
                  <div className="flex items-center gap-2 shrink-0 bg-white border border-slate-100 px-4 py-2.5 rounded-xl font-mono text-sm font-extrabold text-slate-800">
                    <span className="text-indigo-600">{selectedGameAffix || '?'}</span>
                    <span className="text-slate-300 font-normal">+</span>
                    <span className="text-pink-600">{selectedGameBase || '?'}</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    id="game-assemble-btn"
                    onClick={handleAssembleWord}
                    className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <span>Lắp ráp từ</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  {/* Feedback status message */}
                  {gameMessage.text && (
                    <div className={`text-xs font-sans p-2 rounded-lg flex-1 ${
                      gameMessage.type === 'success' 
                        ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-100' 
                        : gameMessage.type === 'error'
                          ? 'bg-red-50 text-red-800 border border-red-100'
                          : 'bg-blue-50 text-blue-800'
                    }`}>
                      {gameMessage.text}
                    </div>
                  )}
                </div>

              </div>

              {/* Game Right column: Targets / Scoreboard (4/12) */}
              <div className="lg:col-span-4 bg-slate-50 p-4 border border-slate-100 rounded-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 font-sans">
                      Bộ từ mục tiêu cần tìm
                    </h4>
                    <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                      Hãy tìm các tổ hợp để ráp đủ bộ!
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-emerald-800 font-mono bg-emerald-100/60 px-2.5 py-1 rounded-full">
                      {discoveredWords.length} / {gameTargetWords.length}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${(discoveredWords.length / gameTargetWords.length) * 100}%` }}
                  />
                </div>

                {/* Target words checklist */}
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {gameTargetWords.map(target => {
                    const isFound = discoveredWords.includes(target.result);
                    return (
                      <div 
                        key={target.result}
                        className={`flex items-start gap-2.5 p-2 rounded-lg text-xs font-sans border transition-colors ${
                          isFound
                            ? 'bg-white border-emerald-100 text-slate-800'
                            : 'bg-transparent border-transparent text-slate-400'
                        }`}
                      >
                        <div className="mt-0.5">
                          {isFound ? (
                            <Check className="h-4 w-4 text-emerald-600 bg-emerald-50 rounded-full p-0.5" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border border-slate-300 bg-slate-100" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold capitalize truncate ${isFound ? 'text-slate-900' : 'text-slate-400'}`}>
                            {target.result}
                          </p>
                          {isFound && (
                            <p className="text-[10px] text-slate-500 italic mt-0.5 font-sans leading-relaxed">
                              {target.definition}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Reset button or completed celebration */}
                {discoveredWords.length === gameTargetWords.length ? (
                  <div className="p-3 bg-emerald-600 text-white rounded-xl text-center space-y-1 animate-fade-in">
                    <p className="text-xs font-bold font-sans">🎉 CHÚC MỪNG HOÀN THÀNH!</p>
                    <p className="text-[10px] opacity-90 leading-relaxed font-sans">
                      Bạn đã chinh phục thành công toàn bộ trò chơi ghép từ vựng Marketing này!
                    </p>
                    <button 
                      onClick={handleResetGame}
                      className="text-[10px] font-sans font-bold bg-white text-emerald-800 px-3 py-1 rounded-lg mt-2 inline-block hover:bg-slate-100"
                    >
                      Chơi lại từ đầu
                    </button>
                  </div>
                ) : (
                  discoveredWords.length > 0 && (
                    <button
                      id="game-reset-btn"
                      onClick={handleResetGame}
                      className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold rounded-xl transition-colors"
                    >
                      Thiết lập lại tiến độ
                    </button>
                  )
                )
              }
              </div>

            </div>
          </div>

        </div>
      )}

      {/* =======================================================
          SUB-TAB 3: SPELLING RULES
          ======================================================= */}
      {activeSubTab === 'spelling' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          
          {/* Left column: Rules Sidebar selector (4/12) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs">
              <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider mb-3">
                Spelling & Word-Form Rules
              </h4>
              <div className="space-y-1.5">
                {SPELLING_RULES.map(rule => {
                  const isSelected = selectedRuleId === rule.id;
                  const quizCompleted = activeRuleQuizCompletedCount > 0 && selectedRuleId === rule.id;
                  const score = ruleQuizAnswers[rule.id] ? Object.keys(ruleQuizAnswers[rule.id]).length : 0;
                  
                  return (
                    <button
                      key={rule.id}
                      id={`rule-btn-${rule.id}`}
                      onClick={() => setSelectedRuleId(rule.id)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-emerald-50/80 border border-emerald-200/60 text-emerald-950 font-semibold'
                          : 'bg-white border border-slate-50 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-sans font-bold">{rule.titleVi}</span>
                        <span className="text-[10px] text-slate-400 font-sans font-normal mt-0.5">{rule.title}</span>
                      </div>
                      {ruleQuizChecked[rule.id] && Object.keys(ruleQuizChecked[rule.id]).length === rule.quiz.length && (
                        <span className="text-[9px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                          Done
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Warning Box */}
            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl space-y-2">
              <div className="flex gap-1.5 items-center text-red-700">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs font-bold font-sans">Cạm bẫy viết Email:</span>
              </div>
              <p className="text-[11px] leading-relaxed font-sans text-slate-600">
                Lỗi chính tả cơ bản như <span className="text-red-700 font-bold">"We are marketting our new product"</span> hay <span className="text-red-700 font-bold">"Can you advice me"</span> lập tức bộc lộ sự thiếu chuyên nghiệp trước sếp nước ngoài hoặc client quốc tế.
              </p>
            </div>
          </div>

          {/* Right column: Active rule Details & Quiz (8/12) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
              
              {/* Header */}
              <div className="border-b border-slate-100 pb-4 space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Quy tắc cốt lõi
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 font-sans tracking-tight mt-1">
                  {activeRule.titleVi} ({activeRule.title})
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {activeRule.conceptVi}
                </p>
              </div>

              {/* Side-by-Side Example Cards */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                  Ví dụ minh họa & Phân tích
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {activeRule.examples.map((ex, idx) => (
                    <div key={idx} className="bg-slate-50/60 border border-slate-100 rounded-xl p-4 space-y-2">
                      <div className="flex justify-between items-center border-b border-slate-100/80 pb-1.5">
                        <div className="flex items-center gap-1.5 font-sans">
                          <span className="text-xs text-slate-400 line-through font-normal">{ex.base}</span>
                          <span className="text-slate-300 text-xs">&rarr;</span>
                          <strong className="text-sm text-emerald-800 font-extrabold">{ex.modified}</strong>
                        </div>
                        <button
                          onClick={() => speak(ex.modified.includes('/') ? ex.modified.split('/')[0].trim() : ex.modified, 'english')}
                          className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-100 text-slate-400"
                        >
                          <Volume2 className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans italic">
                        {ex.explanationVi}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Micro-Quiz for this specific rule */}
              <div className="border border-emerald-100 rounded-2xl p-5 bg-emerald-50/20 space-y-5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-emerald-100/40 pb-3">
                  <h4 className="text-xs font-sans font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Lớp thực hành: Mini-Quiz tự đánh giá</span>
                  </h4>
                  <div className="flex items-center gap-4 bg-white/80 border border-emerald-100/60 px-3 py-1 rounded-lg">
                    <span className="text-[11px] font-sans text-slate-600">
                      Tiến độ: <strong>{activeRuleQuizCompletedCount}/{activeRule.quiz.length}</strong> câu
                    </span>
                    {activeRuleQuizCompletedCount === activeRule.quiz.length && (
                      <span className="text-[11px] font-sans text-emerald-800 font-extrabold">
                        Điểm: {activeRuleQuizScore}/{activeRule.quiz.length}
                      </span>
                    )}
                  </div>
                </div>

                {/* Question List */}
                <div className="space-y-6">
                  {activeRule.quiz.map((q, qIdx) => {
                    const selectedIdx = ruleQuizAnswers[activeRule.id]?.[qIdx];
                    const isChecked = ruleQuizChecked[activeRule.id]?.[qIdx];

                    return (
                      <div key={qIdx} className="space-y-3">
                        <div className="flex items-start gap-2">
                          <span className="bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold p-1 rounded-md shrink-0">
                            Q{qIdx + 1}
                          </span>
                          <p className="text-xs font-sans font-semibold text-slate-800 leading-relaxed">
                            {q.sentence}
                          </p>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pl-6">
                          {q.options.map((opt, optIdx) => {
                            const isChosen = selectedIdx === optIdx;
                            const isCorrect = optIdx === q.correctIndex;

                            let optStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700';
                            if (isChecked) {
                              if (isCorrect) {
                                optStyle = 'bg-emerald-500 border-emerald-500 text-white font-bold';
                              } else if (isChosen) {
                                optStyle = 'bg-red-500 border-red-500 text-white';
                              } else {
                                optStyle = 'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
                              }
                            }

                            return (
                              <button
                                key={opt}
                                id={`rule-quiz-${activeRule.id}-q-${qIdx}-opt-${optIdx}`}
                                disabled={isChecked}
                                onClick={() => handleAnswerRuleQuiz(qIdx, optIdx)}
                                className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all text-center truncate ${optStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation block */}
                        {isChecked && (
                          <div className="ml-6 p-3 bg-white border border-emerald-100/60 rounded-xl space-y-1 animate-fade-in">
                            <span className={`text-[10px] font-sans font-bold flex items-center gap-1 ${
                              selectedIdx === q.correctIndex ? 'text-emerald-700' : 'text-red-700'
                            }`}>
                              {selectedIdx === q.correctIndex ? (
                                <>✓ Trả lời đúng!</>
                              ) : (
                                <>✗ Trả lời chưa đúng!</>
                              )}
                            </span>
                            <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                              {q.explanationVi}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Reset Quiz button */}
                {activeRuleQuizCompletedCount === activeRule.quiz.length && (
                  <div className="flex justify-between items-center border-t border-emerald-100/30 pt-4">
                    <span className="text-[11px] text-slate-500 font-sans italic">
                      Hoàn thành xong cả {activeRule.quiz.length} câu hỏi.
                    </span>
                    <button
                      id="reset-rule-quiz-btn"
                      onClick={handleResetRuleQuiz}
                      className="flex items-center gap-1 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Làm lại Quiz này</span>
                    </button>
                  </div>
                )}

              </div>

            </div>
          </div>

        </div>
      )}

      {/* =======================================================
          SUB-TAB 4: CONTEXT PRACTICE (PHASE 2B)
          ======================================================= */}
      {activeSubTab === 'context' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          
          {/* Left Column: Category Selectors (4/12) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs">
              <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider mb-3">
                Lĩnh vực Thực hành (8 bài/nhóm)
              </h4>
              <div className="space-y-1.5">
                {[
                  { id: 'marketing' as const, label: 'Marketing & Work', labelVi: 'Công việc & Tiếp thị', icon: '📈' },
                  { id: 'family' as const, label: 'Family Life', labelVi: 'Đời sống Gia đình', icon: '🏡' },
                  { id: 'ielts' as const, label: 'IELTS Context', labelVi: 'Ngữ cảnh Học thuật', icon: '📝' }
                ].map(cat => {
                  const isSelected = contextCategory === cat.id;
                  const completedInCat = CONTEXT_QUESTIONS.filter(q => q.category === cat.id && contextCheckedQuestions[q.id]).length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setContextCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-950 font-semibold'
                          : 'bg-white border border-slate-50 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{cat.icon}</span>
                        <div className="flex flex-col">
                          <span className="text-xs font-sans font-bold">{cat.label}</span>
                          <span className="text-[10px] text-slate-400 font-sans mt-0.5">{cat.labelVi}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {completedInCat}/8 Đã xong
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hint Card */}
            <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex gap-1.5 items-center text-amber-450">
                <Info className="h-4 w-4" />
                <span className="text-xs font-bold font-sans text-amber-450">Thông tin thực hành:</span>
              </div>
              <p className="text-[11px] leading-relaxed font-sans text-slate-300">
                Phần này gồm tổng cộng <strong>24 câu hỏi thực hành</strong> được thiết kế theo 3 bối cảnh thực tế (Mỗi bối cảnh gồm 8 câu hỏi với đủ 4 dạng bài tập). Nhấn "Kiểm tra" để đối chiếu đáp án chi tiết và đọc giải thích ngữ nghĩa chuyên sâu.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Questions (8/12) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-5 lg:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase">
                    {contextCategory === 'marketing' ? 'Marketing Context' : contextCategory === 'family' ? 'Family Life Context' : 'IELTS Essay Context'}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 font-sans tracking-tight mt-1">
                    {contextCategory === 'marketing' ? 'Ngữ cảnh Tiếp thị & Công việc' : contextCategory === 'family' ? 'Ngữ cảnh Đời sống & Phối hợp gia đình' : 'Ngữ cảnh Nghị luận Học thuật IELTS'}
                  </h3>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  8 Câu hỏi luyện tập
                </div>
              </div>

              {/* Loop through the 8 filtered questions */}
              <div className="space-y-4">
                {filteredQuestions.map((q, idx) => {
                  const selectedAns = contextSelectedAnswers[q.id];
                  const isChecked = contextCheckedQuestions[q.id];
                  const isCorrect = selectedAns === q.correctIndex;

                  return (
                    <div key={q.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-2xs space-y-3.5">
                      <div className="flex justify-between items-start gap-2 border-b border-slate-50 pb-2">
                        <div>
                          <span className="font-mono text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-extrabold">
                            Câu hỏi {idx + 1} &bull; {q.type.toUpperCase()}
                          </span>
                          <p className="text-xs text-slate-500 font-sans mt-1">
                            {q.instructionVi}
                          </p>
                        </div>
                        {isChecked && (
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            isCorrect ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                          }`}>
                            {isCorrect ? '✓ Đúng' : '✗ Chưa đúng'}
                          </span>
                        )}
                      </div>

                      {/* Question Sentence */}
                      <p className="text-sm font-sans font-medium text-slate-800 leading-relaxed py-1">
                        {q.questionText}
                      </p>

                      {/* Options */}
                      <div className="space-y-1.5">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selectedAns === optIdx;
                          const isCorrectOption = optIdx === q.correctIndex;

                          return (
                            <button
                              key={optIdx}
                              disabled={isChecked}
                              onClick={() => handleSelectContextOption(q.id, optIdx)}
                              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left border transition-all text-xs sm:text-sm font-sans ${
                                isChecked
                                  ? isCorrectOption
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                                    : isOptionSelected
                                      ? 'bg-red-50 border-red-300 text-red-950'
                                      : 'bg-white border-slate-50 text-slate-400'
                                  : isOptionSelected
                                    ? 'bg-amber-50 border-amber-300 text-amber-950 font-medium'
                                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer'
                              }`}
                            >
                              <span>{opt}</span>
                              {isChecked && isCorrectOption && (
                                <span className="text-xs text-emerald-700 font-extrabold">Đáp án đúng</span>
                              )}
                              {isChecked && isOptionSelected && !isCorrectOption && (
                                <span className="text-xs text-red-700 font-extrabold">Lựa chọn của bạn</span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanations and Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => speak(q.questionText.replace('_____', q.options[q.correctIndex]), 'english')}
                            className="flex items-center gap-1 px-2 py-1 border border-slate-200 hover:bg-slate-50 text-slate-700 text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                          >
                            <Volume2 className="h-3 w-3 text-slate-450" />
                            <span>Nghe mẫu</span>
                          </button>
                        </div>

                        <div className="flex gap-2 self-end">
                          {isChecked ? (
                            <button
                              onClick={() => handleResetContextQuestion(q.id)}
                              className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                            >
                              <RefreshCw className="h-3 w-3" />
                              <span>Làm lại</span>
                            </button>
                          ) : (
                            <button
                              disabled={selectedAns === undefined}
                              onClick={() => handleCheckContextQuestion(q.id)}
                              className={`flex items-center gap-1 px-4 py-1.5 text-white text-xs font-bold rounded-lg transition-all ${
                                selectedAns !== undefined
                                  ? 'bg-slate-900 hover:bg-slate-800'
                                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              }`}
                            >
                              <span>Kiểm tra</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Detailed Explanation */}
                      {isChecked && (
                        <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 text-xs font-sans text-slate-700 leading-relaxed mt-2 space-y-1">
                          <strong className="text-slate-900">Giải thích chi tiết:</strong>
                          <p>{q.explanationVi}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =======================================================
          SUB-TAB 5: IELTS ERROR CLINIC (PHASE 2B)
          ======================================================= */}
      {activeSubTab === 'ielts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          
          {/* Left Column: Clinic Case Selectors (4/12) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs">
              <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider mb-3">
                Danh sách Ca bệnh Word Form
              </h4>
              <div className="space-y-1.5">
                {CLINIC_CASES.map(cs => {
                  const isSelected = selectedClinicId === cs.id;
                  const isChecked = clinicChecked[cs.id];
                  const userAns = clinicAnswers[cs.id];
                  const isCorrect = userAns === cs.testCorrectIndex;

                  return (
                    <button
                      key={cs.id}
                      id={`clinic-btn-${cs.id}`}
                      onClick={() => setSelectedClinicId(cs.id)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50/80 border border-emerald-200/60 text-emerald-950 font-semibold'
                          : 'bg-white border border-slate-50 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-sans font-bold">{cs.titleVi}</span>
                        <span className="text-[10px] text-slate-400 font-sans font-normal mt-0.5">{cs.title}</span>
                      </div>
                      {isChecked ? (
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold shrink-0 ml-1 ${
                          isCorrect ? 'text-emerald-700 bg-emerald-100' : 'text-red-700 bg-red-100'
                        }`}>
                          {isCorrect ? 'Cured' : 'Critical'}
                        </span>
                      ) : (
                        <span className="text-[9px] font-mono text-red-600 bg-red-50 px-2 py-0.5 rounded shrink-0 ml-1 font-bold">
                          Treat
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clinic Caution Box */}
            <div className="bg-red-50 border border-red-100/60 p-4 rounded-2xl space-y-2">
              <div className="flex gap-1.5 items-center text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span className="text-xs font-bold font-sans">Hậu quả sai Word Form:</span>
              </div>
              <p className="text-[11px] leading-relaxed font-sans text-slate-600">
                Trong IELTS Writing Task 2, lỗi biến đổi sai từ loại (Ví dụ: "We need advertisement" thay vì "advertising") trực tiếp kéo điểm tiêu chí **Grammatical Range & Accuracy (GRA)** và **Lexical Resource (LR)** xuống Band 5.0.
              </p>
            </div>
          </div>

          {/* Right Column: Case Analysis & "Surgery" Exercise (8/12) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-8 shadow-xs space-y-6">
              
              {/* Header */}
              <div className="border-b border-slate-100 pb-4 space-y-1.5">
                <span className="text-xs font-mono font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Symptom Diagnostic (Phân tích triệu chứng lỗi)
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 font-sans tracking-tight mt-1">
                  {activeClinic.titleVi} ({activeClinic.title})
                </h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  <strong>Triệu chứng lâm sàng:</strong> {activeClinic.symptomVi}
                </p>
              </div>

              {/* Symptom comparison board (Wrong vs Correct) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Wrong */}
                <div className="border border-red-100 rounded-2xl p-4 bg-red-50/10 space-y-2 relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-[10px] font-mono text-red-700 font-extrabold bg-red-100 px-1.5 py-0.5 rounded uppercase">
                    ❌ Lỗi Sai Gặp Nhiều
                  </div>
                  <div className="pt-3">
                    <p className="text-xs font-serif font-semibold text-slate-700 italic line-through decoration-red-400 decoration-2 leading-relaxed">
                      "{activeClinic.brokenSentence}"
                    </p>
                  </div>
                </div>

                {/* Cure */}
                <div className="border border-emerald-100 rounded-2xl p-4 bg-emerald-50/10 space-y-2 relative overflow-hidden">
                  <div className="absolute top-2 right-2 text-[10px] font-mono text-emerald-700 font-extrabold bg-emerald-100 px-1.5 py-0.5 rounded uppercase">
                    ✅ Toa Thuốc Chuẩn
                  </div>
                  <div className="pt-3">
                    <p className="text-xs font-serif font-bold text-slate-900 leading-relaxed">
                      "{activeClinic.cureSentence}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Diagnostic Explanation */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 space-y-2.5">
                <h4 className="text-xs font-sans font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                  <Search className="h-4 w-4 text-slate-500" />
                  <span>Phân tích chi tiết (Diagnostic Analysis):</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {activeClinic.diagnosticVi}
                </p>
              </div>

              {/* Live Surgery Mini-Game */}
              <div className="border border-emerald-100 rounded-2xl p-5 bg-emerald-50/20 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-emerald-100/40 pb-3">
                  <h4 className="text-xs font-sans font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-emerald-600 animate-pulse" />
                    <span>Lớp Phẫu Thuật Ngôn Từ (Surgery Case Study)</span>
                  </h4>
                  {clinicChecked[activeClinic.id] && (
                    <span className={`text-[11px] font-sans font-extrabold px-3 py-1 rounded-lg ${
                      clinicAnswers[activeClinic.id] === activeClinic.testCorrectIndex
                        ? 'bg-emerald-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}>
                      {clinicAnswers[activeClinic.id] === activeClinic.testCorrectIndex ? '✓ PHẪU THUẬT THÀNH CÔNG!' : '✗ PHẪU THUẬT THẤT BẠI!'}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <span className="bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold p-1 rounded-md shrink-0">
                      CASE STUDY
                    </span>
                    <p className="text-xs font-sans font-semibold text-slate-800 leading-relaxed">
                      {activeClinic.testSentence}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pl-6">
                    {activeClinic.testOptions.map((opt, optIdx) => {
                      const isChosen = clinicAnswers[activeClinic.id] === optIdx;
                      const isCorrect = optIdx === activeClinic.testCorrectIndex;
                      const isChecked = clinicChecked[activeClinic.id];

                      let optStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700';
                      if (isChecked) {
                        if (isCorrect) {
                          optStyle = 'bg-emerald-500 border-emerald-500 text-white font-bold scale-[1.01]';
                        } else if (isChosen) {
                          optStyle = 'bg-red-500 border-red-500 text-white';
                        } else {
                          optStyle = 'bg-slate-50 border-slate-100 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={opt}
                          id={`clinic-quiz-opt-${optIdx}`}
                          disabled={isChecked}
                          onClick={() => handleAnswerClinicQuiz(optIdx)}
                          className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all text-center truncate cursor-pointer ${optStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Diagnostic Explanation details */}
                  {clinicChecked[activeClinic.id] && (
                    <div className="ml-6 p-4 bg-white border border-emerald-100/60 rounded-xl space-y-1.5 animate-fade-in">
                      <span className={`text-xs font-sans font-bold flex items-center gap-1 ${
                        clinicAnswers[activeClinic.id] === activeClinic.testCorrectIndex ? 'text-emerald-700' : 'text-red-700'
                      }`}>
                        {clinicAnswers[activeClinic.id] === activeClinic.testCorrectIndex ? (
                          <>✓ Ca bệnh đã được giải phẫu chuẩn xác!</>
                        ) : (
                          <>✗ Thuốc đã bơm chưa đúng từ loại yêu cầu!</>
                        )}
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        {activeClinic.testExplanationVi}
                      </p>
                      <button
                        onClick={handleResetClinicQuiz}
                        className="text-[10px] text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded font-bold transition-all mt-2 cursor-pointer"
                      >
                        Chữa trị lại ca này
                      </button>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* =======================================================
          SUB-TAB 6: APPLY IT WORKSPACE (PHASE 2B)
          ======================================================= */}
      {activeSubTab === 'apply' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          
          {/* Left Column: Configuration Controls (4/12) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Scenario Selector */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs space-y-3">
              <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                1. Chọn Bối cảnh Thực hành
              </h4>
              <div className="space-y-1.5">
                {APPLY_CONTEXTS.map(sc => (
                  <button
                    key={sc.id}
                    onClick={() => setApplyCategory(sc.id)}
                    className={`w-full flex flex-col p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                      applyCategory === sc.id
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-950 font-semibold'
                        : 'bg-white border-slate-50 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs font-sans font-bold">{sc.title}</span>
                    <span className="text-[10px] text-slate-400 font-sans font-normal mt-0.5">{sc.titleVi}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Roots Indicator */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-2xs space-y-3">
              <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                2. Gốc từ bắt buộc
              </h4>
              <div className="space-y-1.5">
                {activeApplyContext.requiredRoots.map(root => {
                  const family = WORD_FAMILIES.find(f => f.id === root);
                  return (
                    <div key={root} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs font-sans">
                      <div className="flex flex-col">
                        <strong className="text-slate-800 font-bold uppercase">{root}</strong>
                        <span className="text-[10px] text-slate-400">{family?.meaningVi}</span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {family?.forms.length || 0} dạng từ
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* General Disclaimer */}
            <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex gap-1.5 items-center text-amber-450">
                <Info className="h-4 w-4" />
                <span className="text-xs font-bold font-sans text-amber-450">Lưu ý quan trọng:</span>
              </div>
              <p className="text-[11px] leading-relaxed font-sans text-slate-450">
                Đây là công cụ tự kiểm tra (Self-check tool). Công cụ này không chấm điểm, đánh giá chất lượng viết hoặc quy đổi điểm số IELTS của bạn. Hãy tự mình so sánh cấu trúc với các ví dụ chuẩn.
              </p>
            </div>
          </div>

          {/* Right Column: Text Workspace (8/12) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 lg:p-7 shadow-xs space-y-5">
              
              {/* Challenge Scenario Prompt */}
              <div className="bg-slate-50/70 border border-slate-100 p-4 rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase">
                    Bối cảnh: {activeApplyContext.title}
                  </span>
                </div>
                <p className="text-xs font-sans font-bold text-slate-800">
                  {activeApplyContext.prompt}
                </p>
                <p className="text-[11px] text-slate-500 font-sans italic leading-relaxed">
                  Ý tưởng: {activeApplyContext.promptVi}
                </p>
              </div>

              {/* Text Area Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 font-sans">Văn bản nháp của bạn (2-4 câu):</label>
                  <button
                    onClick={handleResetApplyText}
                    className="text-[10px] font-sans font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    Xóa nháp (Reset)
                  </button>
                </div>
                <textarea
                  value={applyTexts[applyCategory]}
                  onChange={(e) => setApplyTexts(prev => ({ ...prev, [applyCategory]: e.target.value }))}
                  placeholder="Type your sentences here in English... (Minimum 2 sentences using the required word families)"
                  className="w-full h-36 p-4 text-xs sm:text-sm font-sans border border-slate-250 rounded-2xl bg-slate-50/20 focus:bg-white focus:ring-2 focus:ring-emerald-400 focus:outline-hidden transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Transparent Rule-Based Self-Check Panel */}
              <div className="border border-slate-100 rounded-2xl p-5 bg-slate-50/50 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                  <h4 className="text-xs font-sans font-extrabold uppercase text-slate-700 tracking-wide flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-slate-500" />
                    <span>Bảng tự kiểm tra chính tả & gốc từ (Self-Check)</span>
                  </h4>
                  <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                    Quy tắc cố định
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 italic font-sans">
                  * This is a self-check tool. It does not evaluate writing quality or IELTS level.
                  (Đây là công cụ tự kiểm tra lỗi từ loại và chính tả cố định. Công cụ không đánh giá chất lượng hành văn hay tính điểm IELTS).
                </p>

                {/* 1. Target Roots Checklist */}
                <div className="space-y-2 pt-1.5">
                  <h5 className="text-[10px] font-mono font-extrabold text-slate-400 uppercase">
                    1. Trạng thái xuất hiện gốc từ khóa:
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {(() => {
                      const rootChecks = checkRootsInText(applyTexts[applyCategory], activeApplyContext.requiredRoots);
                      return rootChecks.map(chk => (
                        <div
                          key={chk.root}
                          className={`p-2.5 rounded-xl border text-xs font-sans flex items-center gap-2 ${
                            chk.isUsed
                              ? 'bg-emerald-50/40 border-emerald-100 text-emerald-900'
                              : 'bg-white border-slate-100 text-slate-500'
                          }`}
                        >
                          <span className="text-sm shrink-0">
                            {chk.isUsed ? '✓' : '•'}
                          </span>
                          <div className="truncate">
                            <strong className="uppercase font-bold block text-[10px]">{chk.root}</strong>
                            <span className="text-[9px] text-slate-400 truncate block">
                              {chk.isUsed ? `Dùng: ${chk.matchedWords.join(', ')}` : 'Chưa xuất hiện'}
                            </span>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* 2. Variety Word Form Checker */}
                <div className="space-y-1.5 pt-1">
                  <h5 className="text-[10px] font-mono font-extrabold text-slate-400 uppercase">
                    2. Đa dạng hóa từ loại (Variety Rule):
                  </h5>
                  {(() => {
                    const varCheck = checkVarietyInText(applyTexts[applyCategory], activeApplyContext.requiredRoots);
                    return (
                      <div className={`p-3 rounded-xl border text-xs font-sans space-y-1 ${
                        varCheck.metVariety
                          ? 'bg-emerald-50/40 border-emerald-150 text-emerald-950'
                          : 'bg-white border-slate-100 text-slate-600'
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className="text-base">
                            {varCheck.metVariety ? '🏆' : '💡'}
                          </span>
                          <span>
                            Dùng ít nhất 2 biến thể khác nhau từ một gốc từ:{' '}
                            <strong>{varCheck.metVariety ? 'Đạt yêu cầu' : 'Chưa đạt'}</strong>
                          </span>
                        </div>
                        {varCheck.metVariety ? (
                          <p className="text-[11px] text-emerald-800 pl-6 leading-relaxed">
                            Xuất sắc! Bạn đã sử dụng thành công {varCheck.metDetails.map(d => `"${d.root}" (biến thể: ${d.matched.join(', ')})`).join(', ')}. Việc sử dụng nhiều dạng từ trong cùng một gia đình giúp ngôn từ của bạn phong phú hơn.
                          </p>
                        ) : (
                          <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                            Mẹo: Thử lồng ghép cả dạng Động từ và Danh từ của cùng một gốc từ khóa (ví dụ: dùng cả <em>optimize</em> và <em>optimization</em>) để tăng mức độ đa dạng từ loại.
                          </p>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* 3. Spelling Warning Checker */}
                {(() => {
                  const spellingFlags = checkSpellingPatterns(applyTexts[applyCategory]);
                  if (spellingFlags.length === 0) return null;
                  return (
                    <div className="space-y-1.5 pt-1">
                      <h5 className="text-[10px] font-mono font-extrabold text-red-500 uppercase">
                        3. Cảnh báo lỗi chính tả cố định:
                      </h5>
                      <div className="space-y-2">
                        {spellingFlags.map((flag, fIdx) => (
                          <div key={fIdx} className="bg-red-50/40 border border-red-100 p-3 rounded-xl text-xs font-sans text-red-950 space-y-1">
                            <div className="flex items-center gap-1.5 font-bold">
                              <span>⚠️</span>
                              <span>Possible spelling check: review this word.</span>
                            </div>
                            <p className="text-[11px] text-red-900 leading-relaxed pl-5">
                              Phát hiện từ <strong>"{flag.word}"</strong>. Từ đúng nên viết là <strong>"{flag.correction}"</strong>.
                              <br />
                              <span className="text-slate-600 font-normal">Giải thích quy tắc: {flag.rule}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

              </div>

              {/* Reference Templates Section */}
              <div className="border-t border-slate-100 pt-5 space-y-3.5">
                <h4 className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <ClipboardCopy className="h-4 w-4 text-slate-400" />
                  <span>Ví dụ tham khảo chuẩn (Reference Examples)</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {activeApplyContext.templates.map((tmpl, tIdx) => (
                    <div key={tIdx} className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 space-y-3 hover:border-slate-200 transition-all flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                          <span className="font-mono text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-extrabold uppercase">
                            Mẫu tham khảo {tIdx + 1}
                          </span>
                          <span className="text-[9px] text-slate-400">
                            Reference only
                          </span>
                        </div>
                        <p className="text-xs font-serif italic text-slate-700 leading-relaxed">
                          "{tmpl.text}"
                        </p>
                        <p className="text-[10px] text-slate-450 leading-relaxed">
                          * {tmpl.label}
                        </p>
                      </div>
                      
                      <div className="flex justify-end gap-2 pt-2 border-t border-slate-50">
                        <button
                          onClick={() => speak(tmpl.text, 'english')}
                          className="p-1 rounded-md bg-white hover:bg-slate-100 border border-slate-100 text-slate-400 cursor-pointer"
                          title="Phát âm"
                        >
                          <Volume2 className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleApplyTemplate(tmpl.text)}
                          className="px-2.5 py-1 text-[9px] font-sans font-bold bg-slate-900 text-white rounded-md hover:bg-slate-800 cursor-pointer"
                        >
                          Sử dụng mẫu
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
