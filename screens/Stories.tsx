
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
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setSelectedStory(null)}></div>
          
          <div className="relative w-full max-w-4xl max-h-[95vh] overflow-y-auto bg-slate-50 rounded-t-[3rem] sm:rounded-[3rem] shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-500 scrollbar-hide">
            
            {/* Sticky Header for Mobile */}
            <div className="sticky top-0 z-20 flex justify-between items-center p-6 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
               <div className="pointer-events-auto">
                  <button 
                    onClick={() => setSelectedStory(null)}
                    className="bg-white/20 hover:bg-white/40 text-white p-3 rounded-2xl backdrop-blur-xl transition-all shadow-lg active:scale-90"
                  >
                    <X size={24} />
                  </button>
               </div>
               <div className="pointer-events-auto flex gap-2">
                  <button className="bg-white/20 hover:bg-white/40 text-white p-3 rounded-2xl backdrop-blur-xl transition-all shadow-lg">
                    <Heart size={24} />
                  </button>
               </div>
            </div>

            {/* Hero Image Section */}
            <div className="relative h-[45vh] sm:h-[500px] w-full -mt-24">
              <img src={selectedStory.image} alt={selectedStory.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/20 to-transparent"></div>
            </div>

            {/* Content Area */}
            <div className="px-6 sm:px-12 pb-16 -mt-32 relative z-10">
               <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl shadow-slate-200/50 border border-white">
                  
                  {/* Category & Stats */}
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    <div className="bg-sky-50 text-sky-600 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <BookOpen size={14} /> قصة مصورة
                    </div>
                    <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                      <Clock size={14} /> 5 دقائق
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <h2 className="text-3xl sm:text-5xl font-black text-slate-800 mb-6 leading-[1.1] text-right">
                    {selectedStory.title}
                  </h2>
                  
                  {selectedStory.excerpt && (
                    <p className="text-lg font-bold text-sky-600 mb-10 leading-relaxed border-r-4 border-sky-400 pr-6">
                      {selectedStory.excerpt}
                    </p>
                  )}

                  {/* Main Story Text */}
                  <div className="prose prose-slate max-w-none mb-16">
                    <div className="text-xl sm:text-2xl text-slate-700 leading-[1.8] whitespace-pre-wrap text-right font-medium">
                      {selectedStory.content || "جاري تجهيز محتوى القصة..."}
                    </div>
                  </div>

                  {/* Enhanced Contributors Section */}
                  <div className="bg-slate-50 rounded-[2rem] p-8 sm:p-10 border border-slate-100">
                    <h4 className="text-sm font-black text-slate-400 mb-8 flex items-center gap-2 uppercase tracking-widest">
                      <User size={16} className="text-sky-400" />
                      {selectedStory.author ? `بواسطة: ${selectedStory.author}` : 'فريق العمل المبدع'}
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {selectedStory.contentPreparation && (
                        <div className="flex items-start gap-4">
                          <div className="bg-white p-4 rounded-[1.5rem] shadow-sm text-sky-500 border border-slate-100">
                            <BookOpen size={24} />
                          </div>
                          <div>
                            <p className="text-xs font-black text-slate-400 mb-1">إعداد المحتوى</p>
                            <p className="text-xl font-bold text-slate-800">{selectedStory.contentPreparation}</p>
                          </div>
                        </div>
                      )}
                      
                      {selectedStory.execution && (
                        <div className="flex items-start gap-4">
                          <div className="bg-white p-4 rounded-[1.5rem] shadow-sm text-emerald-500 border border-slate-100">
                            <X size={24} className="rotate-45" /> {/* Execution icon placeholder */}
                          </div>
                          <div>
                            <p className="text-xs font-black text-slate-400 mb-1">تنفيذ وإخراج</p>
                            <p className="text-xl font-bold text-slate-800">{selectedStory.execution}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Share/Action Button */}
                  <div className="mt-12 text-center">
                    <button 
                      onClick={() => setSelectedStory(null)}
                      className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-sky-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
                    >
                      لقد انتهيت من القراءة! 🎉
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
