
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
      case Tab.PROFILE: return 'البطل الصغير';
      case Tab.PARENTS: return 'ركن الأهل';
      case Tab.PODCASTS: return 'صوتيات';
      case Tab.CARICATURES: return 'معرض الرسم';
      default: return 'TEN';
    }
  };

  const isHome = currentTab === Tab.HOME;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-slate-100 px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center shadow-sm">
      {isHome ? (
        <div className="flex items-center">
          <img 
            src="https://i.ibb.co/MDKH1JpT/1000-x-1000-4-3000-x-2000.png" 
            alt="TEN Logo" 
            className="h-14 md:h-16 w-auto object-contain"
          />
        </div>
      ) : (
        <h1 className="text-2xl md:text-3xl font-black text-sky-500 tracking-tight">{getTitle()}</h1>
      )}
      <div className="flex gap-3 md:gap-4">
        <button 
          onClick={onOpenParents}
          className="p-2 md:p-3 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors"
          title="ركن الأهل"
        >
          <Shield size={20} className="md:w-6 md:h-6" />
        </button>
        <button className="p-2 md:p-3 rounded-full bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors relative">
          <Bell size={20} className="md:w-6 md:h-6" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
};
