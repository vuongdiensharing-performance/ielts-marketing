import React, { useState } from 'react';
import { Volume2, BookOpen, MessageSquare, BookText } from 'lucide-react';

export default function StructurePage() {
  const [activeTab, setActiveTab] = useState<'ipa' | 'rules' | 'formulas' | 'conversations'>('ipa');

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-1 lg:p-4 animate-fade-in">
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-2xl font-sans font-bold text-slate-950 tracking-tight">Cấu trúc & Ngữ âm</h2>
        <p className="text-sm text-slate-500 mt-1">Cơ sở ngữ pháp, ngữ âm và cách xây dựng câu.</p>
      </div>

      <div className="flex border-b border-slate-100 gap-6">
        {([
          { id: 'ipa', label: 'Âm IPA', icon: Volume2 },
          { id: 'rules', label: 'Biến đổi từ', icon: BookOpen },
          { id: 'formulas', label: 'Công thức câu', icon: BookText },
          { id: 'conversations', label: 'Conversation Builder', icon: MessageSquare },
        ] as const).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-sans font-bold tracking-tight relative flex items-center gap-2 ${
              activeTab === tab.id ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs">
        {activeTab === 'ipa' && <div className="text-sm text-slate-600">Nội dung Bảng IPA... (Đang phát triển)</div>}
        {activeTab === 'rules' && <div className="text-sm text-slate-600">Nội dung Quy tắc biến đổi từ... (Đang phát triển)</div>}
        {activeTab === 'formulas' && <div className="text-sm text-slate-600">Nội dung Công thức câu... (Đang phát triển)</div>}
        {activeTab === 'conversations' && <div className="text-sm text-slate-600">Nội dung Conversation Builder... (Đang phát triển)</div>}
      </div>
    </div>
  );
}
