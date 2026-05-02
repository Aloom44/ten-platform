import React from 'react';
import { Tab } from '../types';
import { NAV_ITEMS } from '../constants';

interface NavigationProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onTabChange }) => {
  return (
    <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-3 md:p-4">
      <nav className="pointer-events-auto mx-auto flex max-w-3xl items-center justify-between rounded-[2rem] border border-white/80 bg-white/90 px-3 py-2.5 shadow-[0_20px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl sm:px-6 sm:py-3 md:px-8">
        {NAV_ITEMS.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id as Tab)}
              className={`flex min-w-[58px] flex-col items-center gap-1 px-2 transition-all duration-300 md:px-3 ${
                isActive ? 'text-sky-600 -translate-y-1' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <div className={`rounded-2xl p-2 transition-all ${isActive ? 'bg-sky-100 shadow-sm' : 'bg-transparent'}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-bold md:text-xs ${isActive ? 'opacity-100' : 'opacity-75 md:opacity-100'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};