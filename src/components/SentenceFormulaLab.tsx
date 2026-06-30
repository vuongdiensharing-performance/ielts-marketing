import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SENTENCE_FORMULAS, 
  SentenceFormula, 
  FormulaSlot 
} from '../data/sentenceFormulaData';
import { 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  RefreshCw, 
  Eye, 
  Info, 
  Lightbulb, 
  AlertTriangle, 
  PenTool, 
  Check, 
  Briefcase, 
  Home, 
  GraduationCap,
  ArrowRight,
  Sparkles,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

export default function SentenceFormulaLab() {
  // Tabs: 'library' | 'builder'
  const [activeSubTab, setActiveSubTab] = useState<'library' | 'builder'>('library');
  
  // Library Level Filter: 'ALL' | 'A1' | 'A2' | 'B1' | 'B2'
  const [selectedLevel, setSelectedLevel] = useState<'ALL' | 'A1' | 'A2' | 'B1' | 'B2'>('ALL');
  
  // Selected formula ID for Detail view (defaults to 'f1' or first available)
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>('f1');

  // Context Switcher inside Detail view: 'marketing' | 'family' | 'ielts'
  const [detailContext, setDetailContext] = useState<'marketing' | 'family' | 'ielts'>('marketing');

  // --- Sentence Builder States ---
  const [builderLevel, setBuilderLevel] = useState<'A1' | 'A2' | 'B1' | 'B2'>('A1');
  const [builderFormulaId, setBuilderFormulaId] = useState<string>('f1');
  const [builderContext, setBuilderContext] = useState<'marketing' | 'family' | 'ielts'>('marketing');
  
  // Stores user input for each slot of the builder's active formula
  // Key format: slotIndex -> string
  const [slotInputs, setSlotInputs] = useState<Record<number, string>>({});
  const [showReference, setShowReference] = useState<boolean>(false);

  // Filter formulas for Library list
  const filteredFormulas = useMemo(() => {
    if (selectedLevel === 'ALL') return SENTENCE_FORMULAS;
    return SENTENCE_FORMULAS.filter(f => f.level === selectedLevel);
  }, [selectedLevel]);

  // Find currently selected formula in Library
  const activeFormula = useMemo(() => {
    return SENTENCE_FORMULAS.find(f => f.id === selectedFormulaId) || SENTENCE_FORMULAS[0];
  }, [selectedFormulaId]);

  // Find formulas available for the selected Level in Builder
  const builderFormulasList = useMemo(() => {
    return SENTENCE_FORMULAS.filter(f => f.level === builderLevel);
  }, [builderLevel]);

  // Update builder formula ID if the level changes and the current formula is not in that level
  const activeBuilderFormula = useMemo(() => {
    const found = SENTENCE_FORMULAS.find(f => f.id === builderFormulaId);
    if (found && found.level === builderLevel) return found;
    // Otherwise, default to first formula of this level
    const firstOfLevel = SENTENCE_FORMULAS.find(f => f.level === builderLevel);
    return firstOfLevel || SENTENCE_FORMULAS[0];
  }, [builderFormulaId, builderLevel]);

  // Reset inputs when formula or context changes in Builder
  const handleBuilderConfigChange = (newLevel: 'A1' | 'A2' | 'B1' | 'B2', newFormulaId: string, newContext: 'marketing' | 'family' | 'ielts') => {
    setBuilderLevel(newLevel);
    setBuilderFormulaId(newFormulaId);
    setBuilderContext(newContext);
    setSlotInputs({});
    setShowReference(false);
  };

  // Populate slot via phrase bank click
  const handleSelectPhrase = (slotIndex: number, phrase: string) => {
    setSlotInputs(prev => ({
      ...prev,
      [slotIndex]: phrase
    }));
  };

  // Change text manually in slot input
  const handleManualSlotChange = (slotIndex: number, val: string) => {
    setSlotInputs(prev => ({
      ...prev,
      [slotIndex]: val
    }));
  };

  // Reset current builder attempt
  const handleResetBuilder = () => {
    setSlotInputs({});
    setShowReference(false);
  };

  // Render Live Preview
  const livePreviewSentence = useMemo(() => {
    if (!activeBuilderFormula) return '';
    const parts: string[] = [];
    activeBuilderFormula.slots.forEach((_, idx) => {
      const val = slotInputs[idx] || `[${activeBuilderFormula.slots[idx].name}]`;
      parts.push(val);
    });
    // Join parts cleanly (ensuring proper spacing)
    return parts.join(' ').replace(/\s+/g, ' ').replace(/\s,\s/g, ', ').trim();
  }, [activeBuilderFormula, slotInputs]);

  // Deterministic checks
  const builderStatus = useMemo(() => {
    if (!activeBuilderFormula) return { completed: false, missingSlots: [], hasConnector: false, checkMessage: '' };
    
    // 1. Check completed slots
    const missing: string[] = [];
    activeBuilderFormula.slots.forEach((slot, idx) => {
      if (!slotInputs[idx] || slotInputs[idx].trim() === '' || slotInputs[idx].startsWith('[')) {
        missing.push(slot.name);
      }
    });

    const isAllCompleted = missing.length === 0;

    // 2. Connector / Key-word search (case insensitive check)
    let hasConnectorCheck = true;
    let connectorTarget = '';
    const sentenceLower = livePreviewSentence.toLowerCase();

    const patternLower = activeBuilderFormula.pattern.toLowerCase();
    if (patternLower.includes('because') && !sentenceLower.includes('because')) {
      hasConnectorCheck = false;
      connectorTarget = 'because';
    } else if (patternLower.includes('so ') && !sentenceLower.includes('so')) {
      hasConnectorCheck = false;
      connectorTarget = 'so';
    } else if (patternLower.includes('can') && !sentenceLower.includes('can')) {
      hasConnectorCheck = false;
      connectorTarget = 'can';
    } else if (patternLower.includes('will') && !sentenceLower.includes('will')) {
      hasConnectorCheck = false;
      connectorTarget = 'will';
    } else if (patternLower.includes('going to') && !sentenceLower.includes('going to')) {
      hasConnectorCheck = false;
      connectorTarget = 'going to';
    } else if (patternLower.includes('if') && !sentenceLower.includes('if')) {
      hasConnectorCheck = false;
      connectorTarget = 'if';
    } else if (patternLower.includes('although') && !sentenceLower.includes('although')) {
      hasConnectorCheck = false;
      connectorTarget = 'although';
    } else if (patternLower.includes('however') && !sentenceLower.includes('however')) {
      hasConnectorCheck = false;
      connectorTarget = 'however';
    } else if (patternLower.includes('whereas') && !sentenceLower.includes('whereas')) {
      hasConnectorCheck = false;
      connectorTarget = 'whereas';
    } else if (patternLower.includes('despite') && !sentenceLower.includes('despite')) {
      hasConnectorCheck = false;
      connectorTarget = 'despite';
    } else if (patternLower.includes('would') && !sentenceLower.includes('would')) {
      hasConnectorCheck = false;
      connectorTarget = 'would';
    } else if (patternLower.includes('recommend') && !sentenceLower.includes('recommend') && !sentenceLower.includes('suggest')) {
      hasConnectorCheck = false;
      connectorTarget = 'recommend hoặc suggest';
    } else if (patternLower.includes('that') && !sentenceLower.includes('that')) {
      hasConnectorCheck = false;
      connectorTarget = 'that';
    } else if (patternLower.includes('tend to') && !sentenceLower.includes('tend to') && !sentenceLower.includes('appear to') && !sentenceLower.includes('tends to') && !sentenceLower.includes('appears to')) {
      hasConnectorCheck = false;
      connectorTarget = 'tend to hoặc appear to';
    }

    return {
      completed: isAllCompleted,
      missingSlots: missing,
      hasConnector: hasConnectorCheck,
      connectorTarget
    };
  }, [activeBuilderFormula, slotInputs, livePreviewSentence]);

  // Level-based Descriptions
  const levelOverviews = {
    A1: { title: 'A1: Khởi đầu sinh tồn', desc: 'Xây dựng câu độc lập cơ bản rõ ràng, tập trung miêu tả sự vật, hành động trực tiếp và nhu cầu.' },
    A2: { title: 'A2: Giao tiếp thường nhật', desc: 'Diễn đạt các thói quen, mốc thời gian quá khứ, dự định tương lai và so sánh thuộc tính.' },
    B1: { title: 'B1: Liên kết mạch lạc', desc: 'Báo cáo hiệu suất công việc, chỉ ra mục đích, giả định điều kiện và phối hợp ý tưởng tương phản.' },
    B2: { title: 'B2: Biện luận học thuật', desc: 'Diễn đạt giảm tránh khách quan (hedging), phân tích nhân quả phức hợp, kiến nghị giải pháp và đạt tiêu chuẩn IELTS.' }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 font-sans text-slate-800 space-y-6" id="sentence-formula-lab">
      
      {/* Upper Navigation/Toggle (Shared) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm" id="lab-header-nav">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <BookOpen className="h-5 w-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Công thức câu &amp; Trình dựng câu</h2>
          </div>
          <p className="text-xs text-slate-500 font-sans">
            Làm chủ 32 cấu trúc câu từ A1 đến B2 tối ưu cho Marketing, Đời sống và IELTS.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto" id="subtab-switcher">
          <button
            onClick={() => setActiveSubTab('library')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeSubTab === 'library'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            id="tab-btn-library"
          >
            <Layers className="h-4 w-4" />
            Thư viện Công thức
          </button>
          <button
            onClick={() => setActiveSubTab('builder')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeSubTab === 'builder'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
            id="tab-btn-builder"
          >
            <PenTool className="h-4 w-4" />
            Trình dựng câu (Builder)
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeSubTab === 'library' ? (
          <motion.div
            key="library"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="space-y-6"
            id="library-view-container"
          >
            {/* Start Here / Hướng dẫn sử dụng */}
            <div className="bg-blue-50/75 border border-blue-100 rounded-2xl p-5 space-y-3" id="start-here-guide">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <Lightbulb className="h-5 w-5 text-amber-500 shrink-0" />
                <span>Bắt đầu từ đây (Start Here) — Tư duy học Công thức câu hiệu quả</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700 leading-relaxed font-sans">
                <div className="bg-white p-3.5 rounded-xl border border-blue-100 space-y-1">
                  <span className="font-bold text-slate-900 block">1. Bản mẫu tái sử dụng</span>
                  <p>Mỗi công thức là một khuôn mẫu cấu trúc linh hoạt, không phải là một câu văn tĩnh để bạn ghi nhớ vẹt. Hãy học cách thay đổi các ô trống (slots) để phù hợp với thông điệp của bạn.</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-blue-100 space-y-1">
                  <span className="font-bold text-slate-900 block">2. Chọn theo liên kết</span>
                  <p>Lựa chọn cấu trúc dựa trên ngữ nghĩa thời gian (tenses), mối quan hệ logic (nhân quả, tương phản, bổ trợ) và tính chất học thuật/giao tiếp cần truyền đạt.</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-blue-100 space-y-1">
                  <span className="font-bold text-slate-900 block">3. Tiêu chuẩn IELTS</span>
                  <p>Trong IELTS, giám khảo chấm điểm dựa trên khả năng kiểm soát độ chính xác (Accuracy) và dải cấu trúc đa dạng (Range). Việc sử dụng đúng hoàn cảnh quan trọng hơn việc lạm dụng độ dài.</p>
                </div>
              </div>
            </div>

            {/* Level Navigator & Compact Progress Overview */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4 animate-fade-in" id="level-navigator">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-sans">Điều hướng Cấp độ (Level Navigator)</h3>
                  <p className="text-xs text-slate-500">Lọc nhanh danh mục 32 công thức nòng cốt theo khung chuẩn châu Âu.</p>
                </div>
                <div className="flex flex-wrap gap-1.5" id="level-filter-buttons">
                  {(['ALL', 'A1', 'A2', 'B1', 'B2'] as const).map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedLevel(lvl)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedLevel === lvl
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {lvl === 'ALL' ? 'Tất cả (32)' : lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-100" id="progress-overviews">
                {Object.entries(levelOverviews).map(([key, info]) => (
                  <div 
                    key={key} 
                    onClick={() => setSelectedLevel(key as any)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedLevel === key 
                        ? 'bg-slate-50 border-slate-300 shadow-xs' 
                        : 'bg-slate-50/50 border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-900">{info.title}</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-md font-mono font-bold">8 công thức</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-normal font-sans mt-1">{info.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Library Splitted Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="library-layout-grid">
              
              {/* Formula Card Grid (Left/Middle 7 cols) */}
              <div className="lg:col-span-7 space-y-3" id="formula-list-pane">
                <div className="flex justify-between items-center px-1">
                  <span className="text-xs font-bold font-mono text-slate-500">
                    Hiển thị: {filteredFormulas.length} công thức {selectedLevel !== 'ALL' ? `cấp độ ${selectedLevel}` : ''}
                  </span>
                  <span className="text-[11px] text-slate-400">Click một dòng để xem chi tiết bên phải</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5 max-h-[700px] overflow-y-auto pr-1" id="formula-cards-scroller">
                  {filteredFormulas.map(formula => {
                    const isSelected = formula.id === selectedFormulaId;
                    return (
                      <div
                        key={formula.id}
                        onClick={() => setSelectedFormulaId(formula.id)}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-1 ring-slate-900'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-xs'
                        }`}
                        id={`formula-card-${formula.id}`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                            isSelected ? 'bg-slate-800 text-blue-300' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {formula.level}
                          </span>
                          <span className={`text-[10px] font-mono ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
                            {formula.complexityLabel}
                          </span>
                        </div>

                        <h4 className={`text-sm font-bold tracking-tight font-sans mt-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {formula.title}
                        </h4>
                        
                        <div className={`text-xs font-mono py-1 px-1.5 rounded mt-1.5 overflow-x-auto ${
                          isSelected ? 'bg-slate-800 text-amber-300 font-bold' : 'bg-slate-50 text-slate-600 font-semibold'
                        }`}>
                          {formula.pattern}
                        </div>

                        <p className={`text-[11px] font-sans mt-2 line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          <strong className="font-semibold text-slate-400">Cách dùng: </strong> {formula.whenToUseVi}
                        </p>

                        <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-dashed border-slate-100/10">
                          <div className="flex gap-1">
                            {formula.contextTags.slice(0, 2).map((tag, tIdx) => (
                              <span key={tIdx} className={`text-[9px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className={`flex items-center text-[11px] font-semibold gap-0.5 ${isSelected ? 'text-blue-300' : 'text-blue-600'}`}>
                            <span>Chi tiết</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Formula Detail Panel (Right 5 cols) */}
              <div className="lg:col-span-5" id="formula-detail-pane">
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 sticky top-4" id="detail-panel-sticky">
                  
                  {/* Panel Header */}
                  <div className="space-y-1 pb-3 border-b border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 bg-slate-200 text-slate-800 rounded-md">
                        CẤP ĐỘ {activeFormula.level}
                      </span>
                      <span className="text-xs text-slate-500 font-mono font-bold">
                        {activeFormula.complexityLabel}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 font-sans tracking-tight">
                      {activeFormula.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {activeFormula.explanationVi}
                    </p>
                  </div>

                  {/* Pattern Display */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Công thức chuẩn (Pattern)</span>
                    <div className="p-3 bg-slate-900 text-amber-300 rounded-xl font-mono text-xs font-extrabold select-all leading-normal">
                      {activeFormula.pattern}
                    </div>
                  </div>

                  {/* When to use */}
                  <div className="space-y-1 bg-white p-3.5 rounded-xl border border-slate-200/60">
                    <div className="flex gap-1 items-center text-slate-900 font-bold text-xs">
                      <Info className="h-4 w-4 text-blue-500" />
                      <span>Khi nào nên dùng cấu trúc này?</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-sans pl-5">
                      {activeFormula.whenToUseVi}
                    </p>
                  </div>

                  {/* Slot breakdown */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Phân tích các thành phần (Slots)</span>
                    <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-200 max-h-[140px] overflow-y-auto">
                      {activeFormula.slots.map((slot, sIdx) => (
                        <div key={sIdx} className="flex justify-between text-[11px] py-1 border-b border-slate-100 last:border-0 font-sans">
                          <span className="font-bold text-slate-900 font-mono">{slot.name}</span>
                          <span className="text-slate-500 italic">({slot.description})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grammar & Common Mistakes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 space-y-1">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                        <Check className="h-3.5 w-3.5" />
                        <span>Lưu ý ngữ pháp</span>
                      </div>
                      <p className="text-[10px] text-emerald-700 leading-relaxed font-sans">
                        {activeFormula.grammarNotesVi}
                      </p>
                    </div>

                    <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-100 space-y-1">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-rose-800">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <span>Lỗi sai thường gặp</span>
                      </div>
                      <p className="text-[10px] text-rose-700 leading-relaxed font-sans">
                        {activeFormula.commonMistakes}
                      </p>
                    </div>
                  </div>

                  {/* Context Examples with Switcher */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Xem ví dụ ngữ cảnh thực tế</span>
                      
                      <div className="flex bg-slate-200 p-0.5 rounded-lg" id="detail-context-switcher">
                        <button
                          onClick={() => setDetailContext('marketing')}
                          className={`px-2 py-1 text-[9px] font-bold rounded-md transition-all ${
                            detailContext === 'marketing' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          MarCom
                        </button>
                        <button
                          onClick={() => setDetailContext('family')}
                          className={`px-2 py-1 text-[9px] font-bold rounded-md transition-all ${
                            detailContext === 'family' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          Gia đình
                        </button>
                        <button
                          onClick={() => setDetailContext('ielts')}
                          className={`px-2 py-1 text-[9px] font-bold rounded-md transition-all ${
                            detailContext === 'ielts' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          IELTS
                        </button>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
                      <div className="flex items-center gap-1.5">
                        {detailContext === 'marketing' && <Briefcase className="h-4 w-4 text-blue-600" />}
                        {detailContext === 'family' && <Home className="h-4 w-4 text-emerald-600" />}
                        {detailContext === 'ielts' && <GraduationCap className="h-4 w-4 text-amber-600" />}
                        <span className="text-[10px] font-extrabold text-slate-900 font-mono uppercase tracking-wide">
                          {detailContext === 'marketing' ? 'Marketing & Work' : detailContext === 'family' ? 'Family Life' : 'IELTS Academic'}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-900 font-sans leading-normal bg-slate-50/50 p-2.5 rounded-lg border border-slate-100 select-all">
                          {activeFormula.examples[detailContext].text}
                        </p>
                        <p className="text-[11px] text-slate-500 italic pl-1 leading-relaxed font-sans">
                          {activeFormula.examples[detailContext].translationVi}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Direct Action to Sentence Builder */}
                  <button
                    onClick={() => {
                      handleBuilderConfigChange(
                        activeFormula.level,
                        activeFormula.id,
                        detailContext
                      );
                      setActiveSubTab('builder');
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-sm"
                    id="open-in-builder-btn"
                  >
                    <PenTool className="h-4 w-4 text-blue-300" />
                    Thử tự viết câu bằng cấu trúc này
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          <motion.div
            key="builder"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            id="builder-view-container"
          >
            
            {/* Control Panel (Left 4 columns) */}
            <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4" id="builder-controls">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm border-b border-slate-100 pb-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Thiết lập Trình dựng câu</span>
              </div>

              {/* 1. Level Selection */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Bước 1: Chọn cấp độ học tập</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['A1', 'A2', 'B1', 'B2'] as const).map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => {
                        // Find first formula of new level
                        const first = SENTENCE_FORMULAS.find(f => f.level === lvl);
                        handleBuilderConfigChange(lvl, first?.id || 'f1', builderContext);
                      }}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        builderLevel === lvl
                          ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Formula Selection dropdown */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Bước 2: Chọn mẫu công thức</label>
                <select
                  value={builderFormulaId}
                  onChange={(e) => handleBuilderConfigChange(builderLevel, e.target.value, builderContext)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  id="builder-formula-selector"
                >
                  {builderFormulasList.map(f => (
                    <option key={f.id} value={f.id}>
                      [{f.id.toUpperCase()}] {f.title}
                    </option>
                  ))}
                </select>
                
                {/* Active formula summary preview in control panel */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-normal font-sans">
                  <div className="font-mono font-bold text-slate-800 text-[10px] mb-1">{activeBuilderFormula.pattern}</div>
                  <p>{activeBuilderFormula.explanationVi}</p>
                </div>
              </div>

              {/* 3. Context Selection */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Bước 3: Chọn Ngữ cảnh viết câu</label>
                <div className="grid grid-cols-3 gap-1.5" id="builder-context-buttons">
                  <button
                    onClick={() => handleBuilderConfigChange(builderLevel, builderFormulaId, 'marketing')}
                    className={`flex flex-col items-center justify-center py-2.5 rounded-xl border text-xs font-bold gap-1 transition-all ${
                      builderContext === 'marketing'
                        ? 'bg-blue-50 border-blue-200 text-blue-900 ring-1 ring-blue-200'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <Briefcase className="h-4 w-4" />
                    <span>MarCom</span>
                  </button>
                  <button
                    onClick={() => handleBuilderConfigChange(builderLevel, builderFormulaId, 'family')}
                    className={`flex flex-col items-center justify-center py-2.5 rounded-xl border text-xs font-bold gap-1 transition-all ${
                      builderContext === 'family'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900 ring-1 ring-emerald-200'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <Home className="h-4 w-4" />
                    <span>Gia đình</span>
                  </button>
                  <button
                    onClick={() => handleBuilderConfigChange(builderLevel, builderFormulaId, 'ielts')}
                    className={`flex flex-col items-center justify-center py-2.5 rounded-xl border text-xs font-bold gap-1 transition-all ${
                      builderContext === 'ielts'
                        ? 'bg-amber-50 border-amber-200 text-amber-900 ring-1 ring-amber-200'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span>IELTS</span>
                  </button>
                </div>
              </div>

              {/* Notice Constraints */}
              <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-100 space-y-1.5">
                <div className="flex gap-1 items-center text-[10px] font-bold text-amber-800 uppercase tracking-wider font-mono">
                  <Info className="h-3.5 w-3.5" />
                  <span>Cam kết và Giới hạn</span>
                </div>
                <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                  Trình xây dựng này chỉ kiểm tra tính hoàn thiện của các vị trí từ vựng theo đúng cấu trúc. Công cụ không đánh giá tự nhiên của văn phong hay ước tính điểm xếp hạng IELTS.
                </p>
              </div>

            </div>

            {/* Editing Board & Phrase Banks (Right 8 columns) */}
            <div className="lg:col-span-8 space-y-4" id="builder-workspace">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 font-sans uppercase tracking-wide">
                      Bàn làm việc (Sentence Worksheet)
                    </h3>
                    <p className="text-[11px] text-slate-500">Click chọn gợi ý ở dưới hoặc nhập tự do để hoàn thiện cấu trúc.</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleResetBuilder}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-all"
                      title="Xóa trắng để viết lại từ đầu"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Viết lại
                    </button>
                    <button
                      onClick={() => setShowReference(!showReference)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                        showReference ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      title="Hiện câu chuẩn tham khảo"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      {showReference ? 'Ẩn câu mẫu' : 'Xem câu mẫu'}
                    </button>
                  </div>
                </div>

                {/* Show Reference Section if toggled */}
                {showReference && (
                  <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 space-y-1 leading-normal font-sans text-xs">
                    <div className="font-extrabold text-amber-900">Câu tham khảo chuẩn cho ngữ cảnh này:</div>
                    <p className="font-bold text-slate-900 italic font-mono">
                      {activeBuilderFormula.examples[builderContext].text}
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      {activeBuilderFormula.examples[builderContext].translationVi}
                    </p>
                  </div>
                )}

                {/* Live Editable Slots Board */}
                <div className="space-y-4" id="live-slots-inputs-board">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {activeBuilderFormula.slots.map((slot, idx) => {
                      const isCompleted = slotInputs[idx] && slotInputs[idx].trim().length > 0;
                      return (
                        <div key={idx} className="space-y-1 text-left">
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide">
                              Slot {idx + 1}: {slot.name}
                            </span>
                            {isCompleted ? (
                              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                                <Check className="h-3.5 w-3.5" /> Đã điền
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-rose-500">Trống</span>
                            )}
                          </div>
                          
                          <input
                            type="text"
                            value={slotInputs[idx] || ''}
                            placeholder={`Điền ${slot.description}...`}
                            onChange={(e) => handleManualSlotChange(idx, e.target.value)}
                            className={`w-full px-3 py-2 text-xs font-semibold rounded-lg border focus:outline-none transition-all ${
                              isCompleted 
                                ? 'bg-white border-emerald-300 text-slate-800 focus:ring-1 focus:ring-emerald-400' 
                                : 'bg-slate-50 border-slate-200 text-slate-600 focus:ring-1 focus:ring-slate-900'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Live Sentence Preview Container */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Bản xem trước câu viết hằng ngày (Live Sentence Preview)</span>
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-amber-300 text-xs sm:text-sm font-bold font-mono tracking-wide break-words select-all min-h-[44px] flex items-center">
                    {livePreviewSentence || 'Hãy điền vào các ô trống ở trên để bắt đầu lắp ghép câu...'}
                  </div>
                </div>

                {/* Interactive Phrase Bank */}
                <div className="space-y-3 pt-3 border-t border-slate-100" id="phrase-bank-section">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold text-slate-900 font-mono uppercase tracking-wide">
                      Ngân hàng Cụm từ gợi ý (Phrase Bank)
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans italic">Click để chèn nhanh vào ô tương ứng</span>
                  </div>

                  <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1" id="phrase-bank-scroller">
                    {activeBuilderFormula.slots.map((slot, sIdx) => {
                      const phrases = slot.phraseBank[builderContext] || [];
                      return (
                        <div key={sIdx} className="space-y-1.5 bg-slate-50/50 p-3 rounded-xl border border-slate-100 text-left">
                          <span className="text-[10px] font-mono font-bold text-slate-500">
                            Gợi ý cho Ô {sIdx + 1} [{slot.name} - {slot.description}]:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {phrases.map((phrase, pIdx) => {
                              const isSelected = slotInputs[sIdx] === phrase;
                              return (
                                <button
                                  key={pIdx}
                                  onClick={() => handleSelectPhrase(sIdx, phrase)}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left border transition-all ${
                                    isSelected
                                      ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                  }`}
                                >
                                  {phrase}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Deterministic Self-Check Checklist Panel */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-left" id="self-check-checklist">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs border-b border-slate-200 pb-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Bảng kiểm tự động chuẩn hóa cấu trúc (Self-Check Checklist)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-sans text-slate-700 leading-relaxed">
                  
                  {/* Condition 1 */}
                  <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-slate-100">
                    <div className="mt-0.5">
                      {builderStatus.completed ? (
                        <span className="bg-emerald-100 text-emerald-700 p-0.5 rounded font-bold font-mono">✅ Đạt</span>
                      ) : (
                        <span className="bg-amber-100 text-amber-700 p-0.5 rounded font-bold font-mono">⚠️ Cần điền</span>
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <span className="font-extrabold text-slate-900">1. Đã điền đầy đủ các vị trí trống?</span>
                      <p className="text-[10px] text-slate-500">
                        {builderStatus.completed 
                          ? 'Mọi ô trống của công thức đã có nội dung hợp lệ.' 
                          : `Còn thiếu: ${builderStatus.missingSlots.join(', ')}`}
                      </p>
                    </div>
                  </div>

                  {/* Condition 2 */}
                  <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-slate-100">
                    <div className="mt-0.5">
                      {builderStatus.hasConnector ? (
                        <span className="bg-emerald-100 text-emerald-700 p-0.5 rounded font-bold font-mono">✅ Khớp</span>
                      ) : (
                        <span className="bg-rose-100 text-rose-700 p-0.5 rounded font-bold font-mono">❌ Sai lệch</span>
                      )}
                    </div>
                    <div className="space-y-0.5">
                      <span className="font-extrabold text-slate-900">2. Đã chứa liên từ/động từ chính yêu cầu?</span>
                      <p className="text-[10px] text-slate-500">
                        {builderStatus.hasConnector 
                          ? 'Mẫu câu đã đảm bảo chứa liên từ hoặc dấu mốc chuẩn.' 
                          : `Câu cần chứa từ: "${builderStatus.connectorTarget}" để chính xác.`}
                      </p>
                    </div>
                  </div>

                  {/* Condition 3 */}
                  <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-slate-100">
                    <div className="mt-0.5">
                      <span className="bg-emerald-100 text-emerald-700 p-0.5 rounded font-bold font-mono">✅ Đúng</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="font-extrabold text-slate-900">3. Sử dụng đúng ngữ cảnh đã chọn?</span>
                      <p className="text-[10px] text-slate-500">
                        Đang chọn ngữ cảnh: <strong className="capitalize">{builderContext}</strong>. Các từ vựng khớp với yêu cầu.
                      </p>
                    </div>
                  </div>

                  {/* Condition 4 */}
                  <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-slate-100">
                    <div className="mt-0.5">
                      <span className="bg-blue-100 text-blue-700 p-0.5 rounded font-bold font-mono">ℹ️ Nhắc nhở</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="font-extrabold text-slate-900">4. Động từ và cấu trúc song hành</span>
                      <p className="text-[10px] text-slate-500">
                        Hãy đảm bảo bạn đã chia đúng động từ chính (Verb) phù hợp với chủ thể số ít hoặc số nhiều.
                      </p>
                    </div>
                  </div>

                </div>

                <div className="text-[10px] text-slate-400 font-sans text-center mt-2 pt-2 border-t border-slate-200">
                  ⚠️ Lưu ý: Bảng kiểm tự động không thể kiểm tra ngữ pháp nâng cao hay mức độ tự nhiên hoàn chỉnh của từ vựng tự nhập. Hãy đối chiếu kỹ với câu mẫu tham khảo.
                </div>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
