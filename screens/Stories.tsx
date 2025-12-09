
import React from 'react';
import { MOCK_STORIES } from '../constants';
import { Clock, Heart } from 'lucide-react';
import { GeminiStoryGenerator } from '../components/GeminiStoryGenerator';

interface StoriesProps {
  safeMode: boolean;
}

export const Stories: React.FC<StoriesProps> = ({ safeMode }) => {
  return (
    <div className="px-6 pb-24 pt-4">
      {/* AI Generator Integration with Safe Mode */}
      <GeminiStoryGenerator safeMode={safeMode} />

      <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <span className="text-3xl">📚</span>
        مكتبتي
      </h2>

      <div className="grid gap-6">
        {MOCK_STORIES.map((story) => (
          <div key={story.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 group active:scale-[0.99] transition-all duration-300">
            <div className="flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0">
                <img src={story.image} alt={story.title} className="w-full h-full object-cover rounded-2xl shadow-inner" />
                <button className="absolute -top-2 -right-2 bg-white p-1.5 rounded-full shadow-md text-red-400 hover:text-red-500 hover:scale-110 transition-all">
                  <Heart size={16} fill="currentColor" />
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className={`self-start px-2 py-1 rounded-lg text-[10px] font-bold mb-2 ${story.color.replace('text-', 'bg-').replace('100', '100').split(' ')[0]} bg-opacity-50`}>
                  قصة مصورة
                </div>
                <h3 className="text-lg font-bold text-slate-800 leading-tight mb-2">{story.title}</h3>
                <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
                  <span className="flex items-center gap-1"><Clock size={12} /> 5 دقائق</span>
                  <span>•</span>
                  <span>عربي</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
