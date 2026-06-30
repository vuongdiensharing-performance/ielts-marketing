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
  ChevronRight,
  Volume2,
  Settings
} from 'lucide-react';
import { VocabularyItem, FormulaItem, UserProgress } from '../types';
import { SEED_VOCABULARY, SEED_FORMULAS } from '../data/seedData';
import VocabularyDetailDrawer from './VocabularyDetailDrawer';
import { useSpeech } from '../hooks/useSpeech';

interface VocabularyViewProps {
  userProgress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
}

export default function VocabularyView({
  userProgress,
  onUpdateProgress,
}: VocabularyViewProps) {
  
  const { speak, englishVoices, vietnameseVoices, germanVoices, settings, updateSettings, voicesLoaded, activeEnglishVoice } = useSpeech(userProgress.speechSettings, (updater) => onUpdateProgress(prev => ({...prev, speechSettings: updater(prev.speechSettings)})));
  const [activeSubTab, setActiveSubTab] = useState<'words' | 'formulas'>('words');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTrack, setSelectedTrack] = useState<'All' | 'Marketing' | 'Family Life'>('All');
  const [showOnlyStarred, setShowOnlyStarred] = useState(false);
  const [selectedVocab, setSelectedVocab] = useState<VocabularyItem | null>(null);

  const handleSpeak = (text: string, context: 'english' | 'vietnamese') => {
    speak(text, context);
  };

  // ... (Keep existing bookmark helpers) ...
  const toggleVocabBookmark = (id: string) => {
    onUpdateProgress(prev => {
      const exists = prev.vocabBookmarks.includes(id);
      const newBookmarks = exists 
        ? prev.vocabBookmarks.filter(vId => vId !== id)
        : [...prev.vocabBookmarks, id];
      return { ...prev, vocabBookmarks: newBookmarks };
    });
  };

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
    const matchesTrack = selectedTrack === 'All' || 
                         (selectedTrack === 'Marketing' && v.track === 'marketing') ||
                         (selectedTrack === 'Family Life' && v.track === 'family-life');
    const matchesCategory = selectedCategory === 'All' || v.category === selectedCategory;
    const matchesStarred = !showOnlyStarred || userProgress.vocabBookmarks.includes(v.id);
    return matchesSearch && matchesTrack && matchesCategory && matchesStarred;
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

  const totalCount = SEED_VOCABULARY.length;
  const marketingCount = SEED_VOCABULARY.filter(v => v.track === 'marketing').length;
  const familyCount = SEED_VOCABULARY.filter(v => v.track === 'family-life').length;
  
  const audit = {
      missingIPA: SEED_VOCABULARY.filter(v => !v.ipa).length,
      missingTopic: SEED_VOCABULARY.filter(v => !v.category).length,
      missingLevel: SEED_VOCABULARY.filter(v => !v.level).length,
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-1 lg:p-4 animate-fade-in">
        {/* Voice Settings */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 mb-4 text-xs font-sans text-slate-600 space-y-4">
            <span className="font-bold flex items-center gap-2"><Settings className="h-4 w-4" /> Voice Settings</span>
            
            <div className="flex flex-wrap gap-4 items-center">
                <label>Voice đọc tiếng Anh
                    <select value={settings.selectedEnglishVoiceName} onChange={(e) => updateSettings({...settings, selectedEnglishVoiceName: e.target.value})} className="border border-slate-200 rounded-lg p-1 ml-2">
                        {englishVoices.map(v => <option key={v.name} value={v.name}>{v.name}</option>)}
                        {!englishVoices.find(v => v.name === settings.selectedEnglishVoiceName) && settings.selectedEnglishVoiceName !== 'Google US English' && <option value={settings.selectedEnglishVoiceName}>{settings.selectedEnglishVoiceName}</option>}
                    </select>
                </label>
                
                <label>Giọng đọc tiếng Việt
                    <select value={settings.selectedVietnameseVoiceName} onChange={(e) => updateSettings({...settings, selectedVietnameseVoiceName: e.target.value})} className="border border-slate-200 rounded-lg p-1 ml-2">
                        {vietnameseVoices.map(v => <option key={v.name} value={v.name}>{v.name}</option>)}
                    </select>
                </label>
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
                <span>Tốc độ</span>
                {[0.9, 1.1, 1.3, 1.5, 1.7].map(rate => (
                    <button key={rate} onClick={() => updateSettings({...settings, speechRatePreset: rate})} className={`px-2 py-1 rounded ${settings.speechRatePreset === rate ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100'}`}>
                        {rate === 0.9 ? 'Rõ từng từ' : rate === 1.1 ? 'Học chuẩn' : rate === 1.3 ? 'Tự nhiên' : rate === 1.5 ? 'Nhanh' : 'Rất nhanh'} · {rate}x
                    </button>
                ))}
            </div>

            <div className="flex gap-2">
                <button onClick={() => previewEnglishVoice("Hi team, I am testing two new creatives for the TikTok campaign.")} className="text-emerald-700 underline">Nghe thử giọng</button>
                <button onClick={() => updateSettings({selectedEnglishVoiceName: 'Google US English', selectedVietnameseVoiceName: 'Linh', speechRatePreset: 1.1})} className="text-emerald-700 underline">Khôi phục đề xuất</button>
            </div>
            
            {activeEnglishVoice && activeEnglishVoice.name !== settings.selectedEnglishVoiceName && !['Google US English', 'Google UK English Female', 'Google UK English Male'].includes(settings.selectedEnglishVoiceName) && (
                <p className="text-amber-700">Giọng thay thế: {activeEnglishVoice.name}</p>
            )}
        </div>
        
        {process.env.NODE_ENV !== 'production' && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-4 text-xs font-mono text-slate-300">
                <p className="font-bold mb-1 text-slate-100">Voice Diagnostics:</p>
                <p>Voices Loaded: {voicesLoaded ? 'Yes' : 'No'}</p>
                <p>Active English: {activeEnglishVoice?.name || 'None'}</p>
                <p>Rate: {settings.speechRatePreset}</p>
                <p className="mt-2 text-slate-500">Available English: {englishVoices.length}</p>
            </div>
        )}

        {/* Header section */}
        <div className="border-b border-slate-100 pb-5">
          <h2 className="text-2xl font-sans font-bold text-slate-950 tracking-tight">
            Từ vựng (Vocabulary)
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Tra cứu, phát âm và lưu trữ thuật ngữ Marketing & Family Life.
          </p>
        </div>

        {/* Search & Filtering Bar */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-xs focus:outline-none font-sans"
                placeholder="Tìm từ vựng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select className="p-2 border border-slate-200 rounded-xl text-xs" value={selectedTrack} onChange={(e) => setSelectedTrack(e.target.value as any)}>
                <option value="All">Tất cả Tracks</option>
                <option value="Marketing">Marketing</option>
                <option value="Family Life">Family Life</option>
            </select>

            <select className="p-2 border border-slate-200 rounded-xl text-xs" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {vocabCategories.map(cat => <option key={cat} value={cat}>{cat === 'All' ? 'Tất cả' : cat}</option>)}
            </select>
            
            <label className="flex items-center gap-2 text-xs font-sans text-slate-500 select-none cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-200 cursor-pointer"
                checked={showOnlyStarred}
                onChange={(e) => setShowOnlyStarred(e.target.checked)}
              />
              <span>Chỉ xem đã lưu</span>
            </label>
        </div>

        {/* Vocabulary Table */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4">
            <div className="md:hidden space-y-3">
              {filteredVocab.map(v => (
                <div key={v.id} className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm space-y-2 cursor-pointer" onClick={() => setSelectedVocab(v)}>
                    <div className="flex justify-between items-center">
                        <span className="font-bold">{v.word}</span>
                        <span className="font-mono text-emerald-700 text-xs">/{v.ipa}/</span>
                    </div>
                    <div className="text-xs text-slate-500 truncate">{v.exampleSentence}</div>
                    <div className="flex justify-between items-center pt-2">
                        <span className="text-[10px] bg-slate-100 px-2 py-1 rounded">{v.category}</span>
                        <div className="flex gap-2">
                          <button onClick={(e) => { e.stopPropagation(); speak(v.word); }} className="text-slate-400"><Volume2 className="h-4 w-4" /></button>
                          <button onClick={(e) => { e.stopPropagation(); toggleVocabBookmark(v.id); }} className="text-slate-400"><Star className={`h-4 w-4 ${userProgress.vocabBookmarks.includes(v.id) ? 'fill-current' : ''}`} /></button>
                        </div>
                    </div>
                </div>
              ))}
            </div>

            <table className="w-full text-left text-xs hidden md:table">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
                  <th className="p-3">Keyword</th>
                  <th className="p-3">Phiên âm</th>
                  <th className="p-3">Chủ đề</th>
                  <th className="p-3">Câu ví dụ</th>
                </tr>
              </thead>
              <tbody>
                {filteredVocab.map(v => (
                    <tr key={v.id} className="group border-b border-slate-50 hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedVocab(v)}>
                    <td className="p-3 font-semibold">
                      <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                              {v.word}
                              {v.track && <span className={`text-[9px] px-1.5 py-0.5 rounded ${v.track === 'marketing' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>{v.track === 'marketing' ? 'M' : 'F'}</span>}
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={(e) => { e.stopPropagation(); handleSpeak(v.word, 'english'); }} className="text-slate-400 hover:text-emerald-600"><Volume2 className="h-4 w-4" /></button>
                              <button onClick={(e) => { e.stopPropagation(); toggleVocabBookmark(v.id); }} className="text-slate-400 hover:text-amber-500"><Star className={`h-4 w-4 ${userProgress.vocabBookmarks.includes(v.id) ? 'fill-current' : ''}`} /></button>
                          </div>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-emerald-700">{v.ipa || '-'}</td>
                    <td className="p-3">{v.category}</td>
                    <td className="p-3 text-slate-600 max-w-[200px] truncate">{v.exampleSentence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
        
        <VocabularyDetailDrawer 
            vocab={selectedVocab} 
            isOpen={!!selectedVocab} 
            onClose={() => setSelectedVocab(null)} 
            onBookmark={toggleVocabBookmark}
            isStarred={selectedVocab ? userProgress.vocabBookmarks.includes(selectedVocab.id) : false}
            onPlay={(text) => handleSpeak(text, 'english')}
        />
    </div>
  );
}
