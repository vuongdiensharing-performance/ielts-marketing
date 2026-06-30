import React from 'react';
import { X, Volume2, Bookmark, BookOpen, ExternalLink, Info } from 'lucide-react';
import { VocabularyItem } from '../types';

interface VocabularyDetailDrawerProps {
  vocab: VocabularyItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBookmark: (id: string) => void;
  isStarred: boolean;
  onPlay: (text: string, context: 'english' | 'vietnamese', rateAdjustment: number) => void;
}

export default function VocabularyDetailDrawer({ vocab, isOpen, onClose, onBookmark, isStarred, onPlay }: VocabularyDetailDrawerProps) {
  if (!isOpen || !vocab) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white shadow-2xl p-6 overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="h-6 w-6" />
        </button>

        <div className="space-y-6">
          <div>
            <div className="flex gap-2 mb-2">
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{vocab.category}</span>
              {vocab.track && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${vocab.track === 'marketing' ? 'text-blue-700 bg-blue-50' : 'text-purple-700 bg-purple-50'}`}>
                  {vocab.track === 'marketing' ? 'Marketing' : 'Family Life'}
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold text-slate-950">{vocab.word}</h2>
            <p className="text-slate-500 font-mono text-sm mt-1">/{vocab.ipa || 'chưa có IPA'}/</p>
          </div>

          <div className="flex gap-2">
            <button onClick={() => onPlay(vocab.word, 'english', 0)} className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-200">
              <Volume2 className="h-4 w-4" /> Phát âm
            </button>
            <button onClick={() => onBookmark(vocab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold ${isStarred ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'} hover:opacity-80`}>
              <Bookmark className={`h-4 w-4 ${isStarred ? 'fill-current' : ''}`} /> {isStarred ? 'Đã lưu' : 'Lưu'}
            </button>
          </div>

          <div className="space-y-4 text-sm text-slate-700 border-t border-slate-100 pt-4">
            <p><strong>Loại từ:</strong> {vocab.partOfSpeech}</p>
            <p><strong>Nghĩa:</strong> {vocab.vietnameseTranslation}</p>
            <p><strong>Định nghĩa:</strong> {vocab.definition}</p>
            {vocab.vowels && <p><strong>Nguyên âm:</strong> {vocab.vowels.join(', ')}</p>}
            {vocab.consonants && <p><strong>Phụ âm:</strong> {vocab.consonants.join(', ')}</p>}
            
            <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                <p className="font-bold text-slate-900 text-xs uppercase tracking-wider">Ví dụ</p>
                <p className="italic">"{vocab.exampleSentence}"</p>
                <p className="text-xs text-slate-500">→ {vocab.exampleTranslation}</p>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                <p className="font-bold text-slate-900 text-xs uppercase tracking-wider">Ngữ cảnh Marketing</p>
                <p className="text-sm">{vocab.marketingContext}</p>
            </div>
          </div>

          <button className="flex items-center gap-2 text-emerald-700 text-sm font-bold w-full justify-center p-3 border border-emerald-200 rounded-xl hover:bg-emerald-50">
             <ExternalLink className="h-4 w-4" /> Xem âm IPA trong Cấu trúc
          </button>
        </div>
      </div>
    </div>
  );
}
