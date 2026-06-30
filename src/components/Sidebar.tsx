import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Map, 
  BookOpen, 
  Book, 
  Sparkles, 
  TrendingUp, 
  Menu, 
  X,
  GraduationCap,
  Briefcase,
  Home
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  streakDays: number;
  currentContext: 'marketing' | 'family-life';
  onContextChange: (context: 'marketing' | 'family-life') => void;
}

export default function Sidebar({ 
  currentTab, 
  onTabChange, 
  streakDays,
  currentContext,
  onContextChange
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, desc: 'Trang chủ học tập' },
    { id: 'roadmap', label: 'Roadmap', icon: Map, desc: 'Lộ trình bài học' },
    { id: 'skills', label: 'Skill Labs', icon: BookOpen, desc: 'Phòng luyện 4 kỹ năng' },
    { id: 'vocabulary', label: 'Từ vựng', icon: Book, desc: 'Từ vựng & Mẫu câu' },
    { id: 'structure', label: 'Cấu trúc', icon: BookOpen, desc: 'Ngữ âm & Ngữ pháp' },
    { id: 'review', label: 'Review', icon: Sparkles, desc: 'Ôn tập thông minh' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, desc: 'Tiến độ & Phân tích' },
  ];

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header id="mobile-header" className="lg:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 text-white p-2 rounded-lg">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-sans font-bold text-slate-900 tracking-tight text-sm">Marketing English</h1>
            <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-semibold">LAB PROTOTYPE</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {streakDays > 0 && (
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-medium">
              🔥 <span>{streakDays}d streak</span>
            </div>
          )}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div 
          id="mobile-drawer-backdrop"
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container (Desktop & Mobile Drawer) */}
      <aside
        id="app-sidebar"
        className={`fixed lg:sticky top-0 left-0 h-full lg:h-screen w-72 bg-white border-r border-slate-100 flex flex-col justify-between z-50 transform lg:transform-none transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Upper Part */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo Section */}
          <div className="hidden lg:flex items-center gap-3 px-6 py-7 border-b border-slate-50">
            <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-xs">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-sans font-bold text-slate-900 tracking-tight text-base">Marketing English</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold">LAB V0</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
            </div>
          </div>

          {/* User Quick Stats (Desktop) */}
          <div className="hidden lg:block px-6 py-5 border-b border-slate-50 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 font-medium font-sans">ACTIVE ACCOUNT</p>
                <p className="text-sm font-semibold text-slate-800 font-sans mt-0.5">Vietnamese Marketer</p>
              </div>
              {streakDays > 0 ? (
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                  🔥 {streakDays}d
                </div>
              ) : (
                <div className="flex items-center gap-1 bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-[10px] font-medium font-mono">
                  💤 NO STREAK
                </div>
              )}
            </div>
          </div>

          {/* Practice Track Switcher */}
          <div className="px-5 py-4 border-b border-slate-50 bg-slate-50/20">
            <p className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider mb-2.5">
              Practice Tracks (Chương trình học)
            </p>
            <div className="space-y-1.5">
              <button
                id="track-selector-marketing"
                onClick={() => onContextChange('marketing')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-bold transition-all duration-200 cursor-pointer ${
                  currentContext === 'marketing'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 shrink-0" />
                  <span>Marketing English</span>
                </div>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-sm ${
                  currentContext === 'marketing' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-500'
                }`}>A1-B2</span>
              </button>
              <button
                id="track-selector-family"
                onClick={() => onContextChange('family-life')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-bold transition-all duration-200 cursor-pointer ${
                  currentContext === 'family-life'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 shrink-0" />
                  <span>Family Life Practice</span>
                </div>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-sm ${
                  currentContext === 'family-life' ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-500'
                }`}>A1</span>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-emerald-50/85 text-emerald-800 font-semibold'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {/* Left Active border bar */}
                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-md bg-emerald-600" />
                  )}
                  
                  <Icon className={`h-5 w-5 shrink-0 transition-colors ${
                    isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'
                  }`} />
                  
                  <div className="flex flex-col">
                    <span className="text-sm font-sans tracking-tight">{item.label}</span>
                    <span className={`text-[10px] font-sans font-normal mt-0.2 ${
                      isActive ? 'text-emerald-600/75' : 'text-slate-400'
                    }`}>
                      {item.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Part: Footer Info */}
        <div className="p-5 border-t border-slate-50 bg-slate-50/30">
          <div className="p-3 bg-white border border-slate-100 rounded-xl">
            <h4 className="text-xs font-bold text-slate-800 font-sans">English for Marketers</h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              Dành riêng cho Marketers Việt Nam làm việc tại Agency & Client. Học thông qua giải quyết tình huống thực tế.
            </p>
          </div>
          <p className="text-[10px] font-mono text-center text-slate-300 mt-4">
            MARKETING ENGLISH LAB &copy; 2026
          </p>
        </div>
      </aside>
    </>
  );
}
