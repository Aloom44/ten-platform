
import React from 'react';
import { Bell, Shield } from 'lucide-react';
import { Tab } from '../types';

interface HeaderProps {
  currentTab: Tab;
  onOpenParents: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onOpenParents }) => {
  const getTitle = () => {
    switch (currentTab) {
      case Tab.HOME: return 'TEN';
      case Tab.STORIES: return 'مكتبة القصص';
      case Tab.VIDEOS: return 'فيديوهات مرحة';
      case Tab.GAMES: return 'منطقة الألعاب';
      case Tab.ADMIN: return 'لوحة الإدارة';
      case Tab.PROFILE: return 'البطل الصغير';
      case Tab.PARENTS: return 'ركن الأهل';
      case Tab.PODCASTS: return 'صوتيات';
      case Tab.CARICATURES: return 'معرض الرسم';
      default: return 'TEN';
    }
  };

  const isHome = currentTab === Tab.HOME;

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4 md:px-7">
      <div className="app-glass-panel flex items-center justify-between rounded-3xl px-4 py-3 sm:px-5 sm:py-4">
      {isHome ? (
        <div className="flex items-center gap-3">
          <img 
            src="https://i.ibb.co/MDKH1JpT/1000-x-1000-4-3000-x-2000.png" 
            alt="TEN Logo" 
            className="h-12 w-auto object-contain sm:h-14 md:h-16"
          />
          <div className="hidden sm:block">
            <p className="text-xs font-bold tracking-wider text-slate-500">DIGITAL SAFETY</p>
            <p className="text-base font-black text-slate-800">منصة التوعية للأطفال</p>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">TEN PLATFORM</p>
          <h1 className="text-xl font-black tracking-tight text-slate-800 sm:text-2xl md:text-3xl">{getTitle()}</h1>
        </div>
      )}
      <div className="flex gap-2 sm:gap-3 md:gap-4">
        <button 
          onClick={onOpenParents}
          className="app-icon-btn bg-emerald-100/90 text-emerald-700 hover:bg-emerald-200"
          title="ركن الأهل"
        >
          <Shield size={20} className="sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </button>
        <button className="app-icon-btn relative bg-amber-100/90 text-amber-700 hover:bg-amber-200">
          <Bell size={20} className="sm:h-5 sm:w-5 md:h-6 md:w-6" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
      </div>
    </header>
  );
};
