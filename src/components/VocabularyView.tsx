import React, { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, Settings, Star, Volume2 } from 'lucide-react';
import { UserProgress, VocabularyItem } from '../types';
import { SEED_VOCABULARY } from '../data/seedData';
import { VOCABULARY_PACK_1C } from '../data/vocabularyPack1C';
import VocabularyDetailDrawer from './VocabularyDetailDrawer';
import { useSpeech } from '../hooks/useSpeech';

interface VocabularyViewProps { userProgress: UserProgress; onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void; }
type TrackFilter = 'All' | 'Marketing' | 'Family Life';
type PageToken = number | 'ellipsis';

const normalized = (item: VocabularyItem): VocabularyItem => ({
  ...item,
  keyword: item.keyword || item.word,
  vietnameseMeaning: item.vietnameseMeaning || item.vietnameseTranslation,
  topic: item.topic || item.category,
  marketingExample: item.marketingExample || item.exampleSentence,
  familyLifeExample: item.familyLifeExample || 'This term is mainly used in marketing and work contexts.',
  track: item.track || 'marketing',
  level: item.level || 'A1',
  ipa: item.ipa || '',
  vowels: item.vowels || [],
  consonants: item.consonants || [],
  collocations: item.collocations || [],
  topicTags: item.topicTags || item.tags || [],
  sourceLessonIds: item.sourceLessonIds || [],
});

const ipa = (value?: string) => !value ? '—' : value.startsWith('/') && value.endsWith('/') ? value : `/${value}/`;
const pages = (current: number, total: number): PageToken[] => {
  if (!total) return [];
  const list = Array.from(new Set([1, total, current - 1, current, current + 1]))
    .filter((page) => page > 0 && page <= total).sort((a, b) => a - b);
  return list.flatMap((page, index) => index && page - list[index - 1] > 1 ? ['ellipsis', page] : [page]);
};

export default function VocabularyView({ userProgress, onUpdateProgress }: VocabularyViewProps) {
  const { speak, previewEnglishVoice, englishVoices, vietnameseVoices, settings, updateSettings, voicesLoaded, activeEnglishVoice } =
    useSpeech(userProgress.speechSettings, (updater) => onUpdateProgress((prev) => ({ ...prev, speechSettings: updater(prev.speechSettings) })));

  const [query, setQuery] = useState('');
  const [track, setTrack] = useState<TrackFilter>('All');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState<'All' | 'A1' | 'A2' | 'B1' | 'B2'>('All');
  const [savedOnly, setSavedOnly] = useState(false);
  const [ipaOnly, setIpaOnly] = useState(false);
  const [selectedVocab, setSelectedVocab] = useState<VocabularyItem | null>(null);
  const [size, setSize] = useState<20 | 50>(20);
  const [page, setPage] = useState(1);

  const vocabulary = useMemo(() => [...SEED_VOCABULARY, ...VOCABULARY_PACK_1C].map(normalized), []);
  const categories = useMemo(() => ['All', ...Array.from(new Set(vocabulary.map((item) => item.category))).sort()], [vocabulary]);
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return vocabulary.filter((item) => {
      const text = [item.word, item.keyword, item.vietnameseTranslation, item.vietnameseMeaning, item.definition, item.ipa, item.category, item.topic, item.collocations.join(' '), item.topicTags.join(' ')].join(' ').toLowerCase();
      return (!term || text.includes(term)) &&
        (track === 'All' || (track === 'Marketing' ? item.track === 'marketing' : item.track === 'family-life')) &&
        (category === 'All' || item.category === category) &&
        (level === 'All' || item.level === level) &&
        (!savedOnly || userProgress.vocabBookmarks.includes(item.id)) &&
        (!ipaOnly || Boolean(item.ipa));
    });
  }, [vocabulary, query, track, category, level, savedOnly, ipaOnly, userProgress.vocabBookmarks]);

  const totalPages = Math.ceil(filtered.length / size);
  const current = totalPages ? Math.min(page, totalPages) : 0;
  const start = filtered.length ? (current - 1) * size + 1 : 0;
  const end = filtered.length ? Math.min(start + size - 1, filtered.length) : 0;
  const rows = current ? filtered.slice((current - 1) * size, current * size) : [];
  useEffect(() => { if (totalPages && page > totalPages) setPage(totalPages); else if (!totalPages && page !== 1) setPage(1); }, [page, totalPages]);

  const counts = {
    total: vocabulary.length,
    marketing: vocabulary.filter((item) => item.track === 'marketing').length,
    family: vocabulary.filter((item) => item.track === 'family-life').length,
  };
  const audit = useMemo(() => {
    const ids = new Set<string>(); const keywords = new Set<string>(); let duplicateIds = 0; let duplicateKeywords = 0;
    vocabulary.forEach((item) => {
      if (ids.has(item.id)) duplicateIds++; ids.add(item.id);
      const key = `${item.track}:${item.word.trim().toLowerCase()}`; if (keywords.has(key)) duplicateKeywords++; keywords.add(key);
    });
    return {
      duplicateIds, duplicateKeywords,
      missingIpa: vocabulary.filter((item) => !item.ipa).length,
      missingVietnamese: vocabulary.filter((item) => !item.vietnameseMeaning && !item.vietnameseTranslation).length,
      missingTopic: vocabulary.filter((item) => !item.topic && !item.category).length,
      missingLevel: vocabulary.filter((item) => !item.level).length,
    };
  }, [vocabulary]);

  const reset = () => setPage(1);
  const bookmark = (id: string) => onUpdateProgress((prev) => ({
    ...prev,
    vocabBookmarks: prev.vocabBookmarks.includes(id) ? prev.vocabBookmarks.filter((item) => item !== id) : [...prev.vocabBookmarks, id],
  }));
  const go = (next: number) => next >= 1 && next <= totalPages && setPage(next);
  const pageTokens = pages(current, totalPages);
  const disabledFirst = current <= 1;
  const disabledLast = !current || current >= totalPages;
  const englishVoiceOptions = englishVoices.length ? englishVoices : activeEnglishVoice ? [activeEnglishVoice] : [];
  const activeEnglishOptionValue = englishVoiceOptions.some((voice) => voice.name === settings.selectedEnglishVoiceName)
    ? settings.selectedEnglishVoiceName
    : activeEnglishVoice?.name || settings.selectedEnglishVoiceName;
  const isEnglishFallback = Boolean(activeEnglishVoice && activeEnglishVoice.name !== settings.selectedEnglishVoiceName);

  const filters = (
    <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-100 bg-white p-4 md:grid-cols-3 xl:grid-cols-6">
      <div className="relative xl:col-span-2"><Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input value={query} onChange={(event) => { setQuery(event.target.value); reset(); }} className="w-full rounded-xl border border-slate-200 py-2 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Tìm từ, nghĩa, IPA, collocation..." />
      </div>
      <select value={track} onChange={(event) => { setTrack(event.target.value as TrackFilter); reset(); }} aria-label="Lọc theo track" className="rounded-xl border border-slate-200 p-2 text-xs"><option value="All">Tất cả Tracks</option><option value="Marketing">Marketing</option><option value="Family Life">Family Life</option></select>
      <select value={category} onChange={(event) => { setCategory(event.target.value); reset(); }} aria-label="Lọc theo chủ đề" className="rounded-xl border border-slate-200 p-2 text-xs">{categories.map((item) => <option key={item} value={item}>{item === 'All' ? 'Tất cả chủ đề' : item}</option>)}</select>
      <select value={level} onChange={(event) => { setLevel(event.target.value as typeof level); reset(); }} aria-label="Lọc theo trình độ" className="rounded-xl border border-slate-200 p-2 text-xs"><option value="All">Tất cả level</option><option value="A1">A1</option><option value="A2">A2</option><option value="B1">B1</option><option value="B2">B2</option></select>
      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
        <label className="flex cursor-pointer items-center gap-2"><input checked={savedOnly} onChange={(event) => { setSavedOnly(event.target.checked); reset(); }} type="checkbox" className="h-4 w-4" />Đã lưu</label>
        <label className="flex cursor-pointer items-center gap-2"><input checked={ipaOnly} onChange={(event) => { setIpaOnly(event.target.checked); reset(); }} type="checkbox" className="h-4 w-4" />Có IPA</label>
      </div>
    </div>
  );

  const pagination = (
    <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 text-xs sm:flex-row sm:items-center sm:justify-between">
      <span>Trang {current} / {totalPages}</span>
      <div className="flex flex-wrap items-center gap-1">
        <button onClick={() => go(1)} disabled={disabledFirst} aria-label="Trang đầu" className="rounded p-2 disabled:cursor-not-allowed disabled:opacity-40"><ChevronsLeft className="h-4 w-4" /></button>
        <button onClick={() => go(current - 1)} disabled={disabledFirst} aria-label="Trang trước" className="rounded p-2 disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
        {pageTokens.map((item, index) => item === 'ellipsis' ? <span key={`ellipsis-${index}`} aria-hidden="true" className="px-2 text-slate-400">…</span> : <button key={item} onClick={() => go(item)} aria-current={item === current ? 'page' : undefined} aria-label={`Trang ${item}`} className={`min-w-8 rounded px-2 py-1.5 ${item === current ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{item}</button>)}
        <button onClick={() => go(current + 1)} disabled={disabledLast} aria-label="Trang sau" className="rounded p-2 disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
        <button onClick={() => go(totalPages)} disabled={disabledLast} aria-label="Trang cuối" className="rounded p-2 disabled:cursor-not-allowed disabled:opacity-40"><ChevronsRight className="h-4 w-4" /></button>
      </div>
    </div>
  );

  return <div className="mx-auto max-w-5xl space-y-6 p-1 lg:p-4 animate-fade-in">
    <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-600">
      <span className="flex items-center gap-2 font-bold"><Settings className="h-4 w-4" /> Voice Settings</span>
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2">Voice đọc tiếng Anh
          <select value={activeEnglishOptionValue} onChange={(event) => updateSettings({ ...settings, selectedEnglishVoiceName: event.target.value })} className="rounded-lg border border-slate-200 p-1">
            {englishVoiceOptions.map((voice) => <option key={voice.name} value={voice.name}>{voice.name}</option>)}
            {!englishVoiceOptions.length && <option value={settings.selectedEnglishVoiceName}>Chưa phát hiện giọng tiếng Anh</option>}
          </select>
        </label>
        <label className="flex items-center gap-2">Giọng đọc tiếng Việt
          <select value={settings.selectedVietnameseVoiceName} onChange={(event) => updateSettings({ ...settings, selectedVietnameseVoiceName: event.target.value })} className="rounded-lg border border-slate-200 p-1">
            {vietnameseVoices.map((voice) => <option key={voice.name} value={voice.name}>{voice.name}</option>)}
            {!vietnameseVoices.length && <option value={settings.selectedVietnameseVoiceName}>Chưa phát hiện giọng tiếng Việt</option>}
          </select>
        </label>
      </div>
      <p className="text-slate-500">Current voice: {activeEnglishVoice?.name || 'Đang chờ trình duyệt tải voice'}</p>
      <div className="flex flex-wrap items-center gap-2"><span>Tốc độ</span>{[0.9, 1.1, 1.3, 1.5, 1.7].map((rate) => <button key={rate} onClick={() => updateSettings({ ...settings, speechRatePreset: rate })} className={`rounded px-2 py-1 ${settings.speechRatePreset === rate ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100'}`}>{rate === 0.9 ? 'Rõ từng từ' : rate === 1.1 ? 'Học chuẩn' : rate === 1.3 ? 'Tự nhiên' : rate === 1.5 ? 'Nhanh' : 'Rất nhanh'} · {rate}x</button>)}</div>
      <div className="flex flex-wrap gap-3">
        <button onClick={() => previewEnglishVoice('Hi team, I am testing two new creatives for the TikTok campaign.')} className="text-emerald-700 underline">Nghe thử giọng</button>
        <button onClick={() => updateSettings({ selectedEnglishVoiceName: 'Google US English', selectedVietnameseVoiceName: 'Linh', speechRatePreset: 1.1 })} className="text-emerald-700 underline">Khôi phục đề xuất</button>
      </div>
      {isEnglishFallback && <p className="text-amber-700">Google US English chưa có trên thiết bị này. Ứng dụng đang dùng giọng tiếng Anh gần nhất: {activeEnglishVoice?.name}</p>}
    </div>

    {import.meta.env.DEV && <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-xs font-mono text-slate-300">
      <p className="font-bold text-slate-100">Vocabulary Diagnostics</p>
      <p>Total: {counts.total} · Marketing: {counts.marketing} · Family Life: {counts.family}</p>
      <p>Filtered: {filtered.length} · Page size: {size} · Current page: {current} · Total pages: {totalPages} · Displayed: {start}–{end}</p>
      <p>Duplicate IDs: {audit.duplicateIds} · Duplicate keyword + track: {audit.duplicateKeywords} · Missing IPA: {audit.missingIpa} · Missing Vietnamese: {audit.missingVietnamese} · Missing topic: {audit.missingTopic} · Missing level: {audit.missingLevel}</p>
      <p className="mt-2 text-slate-500">Voices loaded: {voicesLoaded ? 'Yes' : 'No'} · Active English: {activeEnglishVoice?.name || 'None'} · Selected English: {settings.selectedEnglishVoiceName} · Rate: {settings.speechRatePreset}x</p>
    </div>}

    <div className="border-b border-slate-100 pb-5"><h2 className="text-2xl font-bold tracking-tight text-slate-950">Từ vựng (Vocabulary)</h2><p className="mt-1 text-sm text-slate-500">Tra cứu, phát âm và lưu trữ thuật ngữ Marketing & Family Life.</p><div className="mt-3 flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-slate-100 px-3 py-1">Tổng: <strong>{counts.total}</strong></span><span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">Marketing & Work: <strong>{counts.marketing}</strong></span><span className="rounded-full bg-purple-50 px-3 py-1 text-purple-700">Family Life: <strong>{counts.family}</strong></span></div></div>
    {filters}
    <div className="rounded-2xl border border-slate-100 bg-white p-4">
      <div className="mb-4 flex flex-col gap-3 border-b border-slate-100 pb-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>Hiển thị {start}–{end} / {filtered.length} từ</span><label className="flex items-center gap-2">Số từ mỗi trang <select value={size} onChange={(event) => { setSize(Number(event.target.value) as 20 | 50); reset(); }} aria-label="Số từ mỗi trang" className="rounded-lg border border-slate-200 p-1.5"><option value={20}>20 từ / trang</option><option value={50}>50 từ / trang</option></select></label></div>
      <div className="space-y-3 md:hidden">{rows.map((item) => <div key={item.id} onClick={() => setSelectedVocab(item)} className="cursor-pointer space-y-2 rounded-xl border border-slate-100 p-4 shadow-sm"><div className="flex items-center justify-between gap-3"><span className="font-bold">{item.word}</span><span className="font-mono text-xs text-emerald-700">{ipa(item.ipa)}</span></div><div className="truncate text-xs text-slate-500">{item.exampleSentence}</div><div className="flex items-center justify-between"><span className="rounded bg-slate-100 px-2 py-1 text-[10px]">{item.category}</span><div className="flex gap-2"><button onClick={(event) => { event.stopPropagation(); speak(item.word, 'english'); }} aria-label={`Phát âm ${item.word}`}><Volume2 className="h-4 w-4" /></button><button onClick={(event) => { event.stopPropagation(); bookmark(item.id); }} aria-label={`Lưu ${item.word}`}><Star className={`h-4 w-4 ${userProgress.vocabBookmarks.includes(item.id) ? 'fill-current' : ''}`} /></button></div></div></div>)}{!filtered.length && <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-xs text-slate-500">Không tìm thấy từ vựng phù hợp với bộ lọc hiện tại.</div>}</div>
      <table className="hidden w-full text-left text-xs md:table"><thead><tr className="border-b border-slate-100 text-slate-500"><th className="p-3">Keyword</th><th className="p-3">Phiên âm</th><th className="p-3">Chủ đề</th><th className="p-3">Câu ví dụ</th></tr></thead><tbody>{rows.map((item) => <tr key={item.id} onClick={() => setSelectedVocab(item)} className="group cursor-pointer border-b border-slate-50 hover:bg-slate-50"><td className="p-3 font-semibold"><div className="flex items-center justify-between gap-2"><span>{item.word} <small className={`rounded px-1.5 py-0.5 ${item.track === 'marketing' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>{item.track === 'marketing' ? 'M' : 'F'}</small></span><span className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100"><button onClick={(event) => { event.stopPropagation(); speak(item.word, 'english'); }} aria-label={`Phát âm ${item.word}`}><Volume2 className="h-4 w-4" /></button><button onClick={(event) => { event.stopPropagation(); bookmark(item.id); }} aria-label={`Lưu ${item.word}`}><Star className={`h-4 w-4 ${userProgress.vocabBookmarks.includes(item.id) ? 'fill-current' : ''}`} /></button></span></div></td><td className="p-3 font-mono text-emerald-700">{ipa(item.ipa)}</td><td className="p-3">{item.category}</td><td className="max-w-[200px] truncate p-3 text-slate-600">{item.exampleSentence}</td></tr>)}{!filtered.length && <tr><td colSpan={4} className="p-10 text-center text-slate-500">Không tìm thấy từ vựng phù hợp với bộ lọc hiện tại.</td></tr>}</tbody></table>
      {pagination}
    </div>
    <VocabularyDetailDrawer vocab={selectedVocab} isOpen={Boolean(selectedVocab)} onClose={() => setSelectedVocab(null)} onBookmark={bookmark} isStarred={selectedVocab ? userProgress.vocabBookmarks.includes(selectedVocab.id) : false} onPlay={(text) => speak(text, 'english')} />
  </div>;
}
