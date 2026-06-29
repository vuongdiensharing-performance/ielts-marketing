import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  Filter, 
  BookOpen, 
  Bookmark, 
  MessageCircle, 
  Sparkles,
  Info,
  ChevronRight
} from 'lucide-react';
import { VocabularyItem, FormulaItem, UserProgress } from '../types';
import { SEED_VOCABULARY, SEED_FORMULAS } from '../data/seedData';

interface VocabularyViewProps {
  userProgress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export default function VocabularyView({
  userProgress,
  onUpdateProgress,
}: VocabularyViewProps) {
  
  const [activeSubTab, setActiveSubTab] = useState<'words' | 'formulas'>('words');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showOnlyStarred, setShowOnlyStarred] = useState(false);

  // Vocabulary bookmark helper
  const toggleVocabBookmark = (id: string) => {
    onUpdateProgress(prev => {
      const exists = prev.vocabBookmarks.includes(id);
      const newBookmarks = exists 
        ? prev.vocabBookmarks.filter(vId => vId !== id)
        : [...prev.vocabBookmarks, id];
      return { ...prev, vocabBookmarks: newBookmarks };
    });
  };

  // Formula bookmark helper
  const toggleFormulaBookmark = (id: string) => {
    onUpdateProgress(prev => {
      const exists = prev.formulaBookmarks.includes(id);
      const newBookmarks = exists 
        ? prev.formulaBookmarks.filter(fId => fId !== id)
        : [...prev.formulaBookmarks, id];
      return { ...prev, formulaBookmarks: newBookmarks };
    });
  };

  // Get unique categories for filtering
  const vocabCategories = ['All', ...Array.from(new Set(SEED_VOCABULARY.map(v => v.category)))];
  const formulaCategories = ['All', ...Array.from(new Set(SEED_FORMULAS.map(f => f.category)))];
  const activeCategories = activeSubTab === 'words' ? vocabCategories : formulaCategories;

  // Filter lists
  const filteredVocab = SEED_VOCABULARY.filter(v => {
    const matchesSearch = v.word.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.vietnameseTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || v.category === selectedCategory;
    const matchesStarred = !showOnlyStarred || userProgress.vocabBookmarks.includes(v.id);
    return matchesSearch && matchesCategory && matchesStarred;
  });

  const filteredFormulas = SEED_FORMULAS.filter(f => {
    const matchesSearch = f.structure.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.example.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.purposeVi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesStarred = !showOnlyStarred || userProgress.formulaBookmarks.includes(f.id);
    return matchesSearch && matchesCategory && matchesStarred;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-1 lg:p-4 animate-fade-in">
      {/* Header section */}
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-2xl font-sans font-bold text-slate-950 tracking-tight">
          Vocabulary & Formula Bank (Từ vựng & Mẫu câu)
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          Thư viện chứa 40 thuật ngữ marketing cốt lõi cùng các cấu trúc câu giao tiếp phổ biến giúp bạn diễn tả rành mạch mọi thông điệp.
        </p>
      </div>

      {/* Main Tabs Selection (Words vs. Formulas) */}
      <div className="flex border-b border-slate-100 gap-6">
        <button
          onClick={() => {
            setActiveSubTab('words');
            setSearchQuery('');
            setSelectedCategory('All');
          }}
          className={`pb-4 text-sm font-sans font-bold tracking-tight relative cursor-pointer ${
            activeSubTab === 'words' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <span>Thuật ngữ chuyên ngành ({filteredVocab.length})</span>
          {activeSubTab === 'words' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
          )}
        </button>

        <button
          onClick={() => {
            setActiveSubTab('formulas');
            setSearchQuery('');
            setSelectedCategory('All');
          }}
          className={`pb-4 text-sm font-sans font-bold tracking-tight relative cursor-pointer ${
            activeSubTab === 'formulas' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <span>Công thức giao tiếp ({filteredFormulas.length})</span>
          {activeSubTab === 'formulas' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
          )}
        </button>
      </div>

      {/* Search & Filtering Bar */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search input */}
        <div className="md:col-span-5 relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-xs focus:outline-none font-sans"
            placeholder={activeSubTab === 'words' ? "Tìm thuật ngữ, nghĩa Tiếng Việt..." : "Tìm công thức, ví dụ..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category selector */}
        <div className="md:col-span-4 flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            className="w-full p-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-xs focus:outline-none font-sans bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {activeCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'Tất cả chủ đề' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Toggle Star filter */}
        <div className="md:col-span-3 flex items-center justify-end">
          <label className="flex items-center gap-2 text-xs font-sans text-slate-500 select-none cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-200 cursor-pointer"
              checked={showOnlyStarred}
              onChange={(e) => setShowOnlyStarred(e.target.checked)}
            />
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-400" />
              Chỉ xem mục đã lưu
            </span>
          </label>
        </div>
      </div>

      {/* DISPLAY LIST */}
      {activeSubTab === 'words' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVocab.map((vocab) => {
            const isStarred = userProgress.vocabBookmarks.includes(vocab.id);
            return (
              <div 
                key={vocab.id} 
                className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-slate-200 transition-all shadow-xs relative flex flex-col justify-between space-y-4"
              >
                {/* Star bookmark Button */}
                <button
                  onClick={() => toggleVocabBookmark(vocab.id)}
                  className="absolute right-4 top-4 text-slate-300 hover:text-amber-500 cursor-pointer focus:outline-none"
                >
                  <Star className={`h-5 w-5 ${isStarred ? 'fill-amber-400 text-amber-500' : ''}`} />
                </button>

                <div className="space-y-3">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      {vocab.category}
                    </span>
                    <h3 className="text-lg font-sans font-bold text-slate-900 tracking-tight mt-1.5 flex items-center gap-2">
                      {vocab.word}
                      <span className="text-[10px] font-mono font-normal text-slate-400 lowercase">({vocab.partOfSpeech})</span>
                    </h3>
                  </div>

                  {/* Vietnamese meaning */}
                  <div className="bg-emerald-50/30 p-2.5 rounded-xl border border-emerald-50/50">
                    <span className="text-[9px] font-bold text-emerald-700 block">DỊCH NGHĨA:</span>
                    <p className="text-xs text-slate-800 font-bold font-sans mt-0.5">{vocab.vietnameseTranslation}</p>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    {vocab.definition}
                  </p>
                </div>

                {/* Example sentence & context details */}
                <div className="border-t border-slate-50 pt-4 space-y-3">
                  <div className="text-xs">
                    <strong className="text-slate-600 block">Câu ví dụ (Example):</strong>
                    <p className="text-slate-700 font-sans italic mt-0.5">"{vocab.exampleSentence}"</p>
                    <p className="text-slate-400 mt-0.5">→ {vocab.exampleTranslation}</p>
                  </div>

                  <div className="text-[10px] bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-slate-500 leading-relaxed flex items-start gap-1.5">
                    <Info className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <p>
                      <strong>Ngữ cảnh Marketing:</strong> {vocab.marketingContext}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredVocab.length === 0 && (
            <div className="md:col-span-2 text-center bg-slate-50 border border-slate-100 p-8 rounded-2xl space-y-2">
              <BookOpen className="h-10 w-10 text-slate-300 mx-auto" />
              <p className="text-xs font-sans text-slate-400">Không tìm thấy từ vựng nào khớp với điều kiện tìm kiếm.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFormulas.map((formula) => {
            const isStarred = userProgress.formulaBookmarks.includes(formula.id);
            return (
              <div 
                key={formula.id} 
                className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-slate-200 transition-all shadow-xs relative flex flex-col md:flex-row gap-6"
              >
                {/* Star bookmark Button */}
                <button
                  onClick={() => toggleFormulaBookmark(formula.id)}
                  className="absolute right-4 top-4 text-slate-300 hover:text-amber-500 cursor-pointer focus:outline-none"
                >
                  <Star className={`h-5 w-5 ${isStarred ? 'fill-amber-400 text-amber-500' : ''}`} />
                </button>

                {/* Left col */}
                <div className="md:w-1/2 space-y-3">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {formula.category}
                    </span>
                    <h3 className="text-base font-mono font-bold text-emerald-800 tracking-tight mt-2 leading-relaxed">
                      {formula.structure}
                    </h3>
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="text-slate-700 leading-relaxed">
                      <strong>Mục đích:</strong> {formula.purpose}
                    </p>
                    <p className="text-slate-400 italic">
                      → {formula.purposeVi}
                    </p>
                  </div>
                </div>

                {/* Right col */}
                <div className="md:w-1/2 md:border-l border-slate-100 md:pl-6 space-y-3 pt-4 md:pt-0">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider font-mono">
                      Ví dụ giao tiếp (Workplace Example)
                    </span>
                    <p className="text-xs text-slate-900 font-mono font-medium">
                      "{formula.example}"
                    </p>
                    <p className="text-[11px] text-slate-500">
                      → {formula.exampleVi}
                    </p>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    💡 <strong>Mẹo dùng thực tế:</strong> {formula.usageTip}
                  </p>
                </div>
              </div>
            );
          })}

          {filteredFormulas.length === 0 && (
            <div className="text-center bg-slate-50 border border-slate-100 p-8 rounded-2xl space-y-2">
              <Bookmark className="h-10 w-10 text-slate-300 mx-auto" />
              <p className="text-xs font-sans text-slate-400">Không tìm thấy cấu trúc câu nào khớp với điều kiện tìm kiếm.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
