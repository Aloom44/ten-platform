import React from 'react';
import { Tab } from '../types';
import { NAV_ITEMS } from '../constants';

interface NavigationProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 md:p-4 z-50 pointer-events-none">
      <nav className="bg-white/95 backdrop-blur-md rounded-full shadow-xl border border-slate-100 px-4 sm:px-8 md:px-10 py-3 flex justify-between items-center max-w-3xl mx-auto pointer-events-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id as Tab)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 px-2 md:px-3 ${
                isActive ? 'text-sky-500 transform -translate-y-1' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className={`p-2 rounded-full transition-all ${isActive ? 'bg-sky-100' : 'bg-transparent'}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] md:text-xs font-bold ${isActive ? 'opacity-100' : 'opacity-70 md:opacity-100'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};