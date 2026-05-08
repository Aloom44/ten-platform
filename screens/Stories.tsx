
import React, { useEffect, useState } from 'react';
import { Clock, Heart, X, BookOpen, User } from 'lucide-react';
import { GeminiStoryGenerator } from '../components/GeminiStoryGenerator';
import { api } from '../services/api';
import { Story } from '../types';

interface StoriesProps {
  safeMode: boolean;
}

export const Stories: React.FC<StoriesProps> = ({ safeMode }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    const loadStories = async () => {
      try {
        setLoading(true);
        const data = await api.getStories();
        setStories(data);
      } catch (error) {
        console.error('Failed to load stories', error);
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, []);

  return (
    <div className="px-6 pb-24 pt-4">
      {/* AI Generator Integration with Safe Mode */}
      <GeminiStoryGenerator safeMode={safeMode} />

      <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
        <span className="text-3xl">📚</span>
        مكتبتي
      </h2>

      {loading && <p className="text-sm text-slate-500 mb-4">جاري تحميل القصص...</p>}

      <div className="grid gap-6">
        {stories.map((story) => (
          <div 
            key={story.id} 
            onClick={() => setSelectedStory(story)}
            className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 group active:scale-[0.99] transition-all duration-300 cursor-pointer hover:shadow-md"
          >
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
                <div className="flex items-center gap-3 text-slate-400 text-xs font-medium mb-2">
                  <span className="flex items-center gap-1"><Clock size={12} /> 5 دقائق</span>
                  <span>•</span>
                  <span>عربي</span>
                </div>
                {(story.contentPreparation || story.execution) && (
                  <div className="flex gap-3 text-[10px] text-slate-400 border-t border-slate-50 pt-2">
                    {story.contentPreparation && <span>إعداد: {story.contentPreparation}</span>}
                    {story.execution && <span>تنفيذ: {story.execution}</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && stories.length === 0 && (
        <p className="text-sm text-slate-500">لا توجد قصص متاحة حالياً.</p>
      )}

      {/* Story Reading Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setSelectedStory(null)}></div>
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-[2.5rem] shadow-2xl animate-in zoom-in-95 duration-300 scrollbar-hide">
            {/* Header / Cover */}
            <div className="relative h-64 sm:h-80 w-full">
              <img src={selectedStory.image} alt={selectedStory.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              <button 
                onClick={() => setSelectedStory(null)}
                className="absolute top-6 right-6 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full backdrop-blur-md transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Body */}
            <div className="px-8 pb-12 -mt-12 relative">
               <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-50">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="bg-sky-100 text-sky-600 px-4 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-2">
                      <BookOpen size={14} /> قصة مصورة
                    </span>
                    <span className="bg-slate-100 text-slate-500 px-4 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-2">
                      <Clock size={14} /> 5 دقائق قراءة
                    </span>
                  </div>

                  <h2 className="text-3xl font-black text-slate-800 mb-6 leading-tight">{selectedStory.title}</h2>
                  
                  <div className="prose prose-slate max-w-none">
                    <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">
                      {selectedStory.content || selectedStory.excerpt}
                    </p>
                  </div>

                  {/* Contributors Footer */}
                  {(selectedStory.contentPreparation || selectedStory.execution) && (
                    <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {selectedStory.contentPreparation && (
                        <div className="flex items-center gap-3">
                          <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-500"><User size={20} /></div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">إعداد المحتوى</p>
                            <p className="font-bold text-slate-700">{selectedStory.contentPreparation}</p>
                          </div>
                        </div>
                      )}
                      {selectedStory.execution && (
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500"><User size={20} /></div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">تنفيذ وإخراج</p>
                            <p className="font-bold text-slate-700">{selectedStory.execution}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
