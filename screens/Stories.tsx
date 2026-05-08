
import React, { useEffect, useState } from 'react';
import { Clock, Heart, X, BookOpen, User, ArrowRight, Share2, Type, Minus, Plus, Star, Sparkles, Calendar, Target, ChevronLeft } from 'lucide-react';
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
  const [fontSize, setFontSize] = useState(20);
  const [readingProgress, setReadingProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setReadingProgress(progress);
  };

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

      {/* Story Reading Modal - Complete Overhaul */}
      {selectedStory && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-0 animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl" onClick={() => setSelectedStory(null)}></div>
          
          <div 
            onScroll={handleScroll}
            className="relative w-full max-w-5xl h-full sm:h-[95vh] overflow-y-auto bg-[#FDFCF8] sm:rounded-[3rem] shadow-2xl animate-in slide-in-from-bottom duration-700 scroll-smooth scrollbar-hide"
          >
            {/* Reading Progress Bar */}
            <div className="sticky top-0 z-[60] w-full h-1.5 bg-slate-100">
               <div 
                className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-100"
                style={{ width: `${readingProgress}%` }}
               ></div>
            </div>

            {/* Floating Controls Header */}
            <div className="sticky top-1.5 z-50 flex justify-between items-center p-6 pointer-events-none">
               <div className="pointer-events-auto flex gap-3">
                  <button 
                    onClick={() => setSelectedStory(null)}
                    className="bg-white/90 hover:bg-white text-slate-800 p-3.5 rounded-[1.5rem] shadow-xl border border-slate-100/50 backdrop-blur-md transition-all active:scale-90"
                  >
                    <X size={24} strokeWidth={3} />
                  </button>
               </div>
               
               <div className="pointer-events-auto flex items-center gap-2 bg-white/90 p-2 rounded-[1.5rem] shadow-xl border border-slate-100/50 backdrop-blur-md">
                  <button 
                    onClick={() => setFontSize(prev => Math.max(16, prev - 2))}
                    className="p-2 text-slate-500 hover:text-sky-600 transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <div className="w-10 text-center font-black text-slate-700 text-sm flex items-center justify-center gap-1">
                    <Type size={14} /> {fontSize}
                  </div>
                  <button 
                    onClick={() => setFontSize(prev => Math.min(32, prev + 2))}
                    className="p-2 text-slate-500 hover:text-sky-600 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
               </div>
            </div>

            {/* Premium Hero Section - Optimized Clarity */}
            <div className="relative w-full h-[55vh] sm:h-[600px] -mt-24 overflow-hidden shadow-2xl">
               <img 
                src={selectedStory.image} 
                alt={selectedStory.title} 
                className="w-full h-full object-cover animate-image-zoom" 
               />
               
               {/* Soft, Professional Gradient - Reduced Darkness */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCF8] via-transparent to-black/5"></div>
               <div className="absolute inset-0 bg-sky-900/5 mix-blend-overlay"></div>

               {/* Hero Content - Moved for better visibility */}
               <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-20 text-right">
                  <div className="flex flex-wrap items-center justify-end gap-3 mb-6 animate-in slide-in-from-right duration-700">
                    <span className="bg-sky-500 text-white px-5 py-2.5 rounded-[1.2rem] text-xs font-black shadow-lg shadow-sky-500/30 flex items-center gap-2">
                      <BookOpen size={16} /> قصة ذكية
                    </span>
                    <span className="bg-white/20 text-white px-5 py-2.5 rounded-[1.2rem] text-xs font-black backdrop-blur-md border border-white/30 flex items-center gap-2">
                      <Clock size={16} /> 5 دقائق ممتعة
                    </span>
                  </div>
                  
                  <h1 className="text-4xl sm:text-7xl font-black text-white leading-[1.1] mb-6 drop-shadow-2xl animate-in slide-in-from-bottom duration-1000">
                    {selectedStory.title}
                  </h1>
               </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-[800px] right-0 w-64 h-64 bg-sky-100/40 rounded-full blur-3xl -z-10"></div>
            <div className="absolute top-[1200px] left-0 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl -z-10"></div>

            {/* Story Content Card */}
            <div className="px-5 sm:px-16 pb-24 relative z-10">
               <div className="bg-white rounded-[3rem] p-8 sm:p-20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-slate-100/50 relative overflow-hidden">
                  
                  {/* Internal Decorative Icon */}
                  <div className="absolute -top-10 -left-10 text-sky-50/50">
                    <Star size={180} fill="currentColor" strokeWidth={0} />
                  </div>

                  {/* Excerpt Block */}
                  {selectedStory.excerpt && (
                    <div className="mb-16 relative">
                       <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-sky-400 to-emerald-400 rounded-full"></div>
                       <p className="pr-10 text-2xl sm:text-3xl font-black text-slate-800 leading-relaxed italic">
                         {selectedStory.excerpt}
                       </p>
                    </div>
                  )}

                  {/* Main Body Text */}
                  <div className="prose prose-slate max-w-none mb-20">
                    <div 
                      className="text-slate-700 leading-[2] text-right font-medium transition-all duration-300"
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {(selectedStory.content || "جاري تحميل أحداث القصة الممتعة...").split('\n\n').map((para, i) => (
                        <p key={i} className="mb-10 whitespace-pre-wrap">{para}</p>
                      ))}
                    </div>
                  </div>

                  {/* Story Learning / Impact */}
                  <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-sky-50 rounded-[2.5rem] p-8 border border-sky-100/50 group hover:bg-sky-100 transition-colors duration-500">
                        <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-sky-500 shadow-sm mb-6 group-hover:scale-110 transition-transform">
                          <Target size={28} />
                        </div>
                        <h4 className="text-xl font-black text-slate-800 mb-4">هدف القصة</h4>
                        <p className="text-slate-600 font-bold leading-relaxed">تعزيز مهارات التفكير النقدي لدى الأطفال وتشجيعهم على اتخاذ قرارات آمنة في العالم الرقمي.</p>
                     </div>
                     <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100/50 group hover:bg-emerald-100 transition-colors duration-500">
                        <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm mb-6 group-hover:scale-110 transition-transform">
                          <Sparkles size={28} />
                        </div>
                        <h4 className="text-xl font-black text-slate-800 mb-4">نصيحة اليوم</h4>
                        <p className="text-slate-600 font-bold leading-relaxed">تذكر دائماً أن الأبطال الحقيقيين هم من يشاركون أسرارهم وتجاربهم مع والديهم!</p>
                     </div>
                  </div>

                  {/* Contributors & Info Footer */}
                  <div className="bg-slate-50 rounded-[3rem] p-8 sm:p-12 border border-slate-100">
                    <div className="flex items-center gap-3 mb-10">
                      <div className="bg-white p-3 rounded-xl shadow-sm text-sky-500">
                        <User size={20} />
                      </div>
                      <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">فريق العمل المبدع</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                          <User size={12} className="text-sky-400" /> الكاتب
                        </p>
                        <p className="text-xl font-black text-slate-800">{selectedStory.author || 'بطل من أبطال TEN'}</p>
                      </div>
                      
                      {selectedStory.contentPreparation && (
                        <div>
                          <p className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                             <Sparkles size={12} className="text-emerald-400" /> إعداد المحتوى
                          </p>
                          <p className="text-xl font-black text-slate-800">{selectedStory.contentPreparation}</p>
                        </div>
                      )}
                      
                      {selectedStory.execution && (
                        <div>
                          <p className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                             <Star size={12} className="text-orange-400" /> تنفيذ وإخراج
                          </p>
                          <p className="text-xl font-black text-slate-800">{selectedStory.execution}</p>
                        </div>
                      )}

                      <div className="pt-6 border-t border-slate-200/50 col-span-full flex flex-wrap gap-6 items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="bg-white px-4 py-2 rounded-xl text-[10px] font-black text-slate-500 border border-slate-200 flex items-center gap-2">
                               <Calendar size={12} /> {selectedStory.createdAt ? new Date(selectedStory.createdAt).toLocaleDateString('ar-EG') : 'حديثاً'}
                            </div>
                            <div className="bg-white px-4 py-2 rounded-xl text-[10px] font-black text-slate-500 border border-slate-200 flex items-center gap-2">
                               <Star size={12} className="text-amber-400" /> {selectedStory.isGenerated ? 'قصة ذكية' : 'قصة أصلية'}
                            </div>
                         </div>
                         <button className="flex items-center gap-2 text-sky-600 font-black text-xs hover:gap-4 transition-all">
                            مشاركة القصة <Share2 size={16} />
                         </button>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Footer */}
                  <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-8 py-10 border-t border-slate-100">
                     <div className="text-right">
                        <h5 className="text-2xl font-black text-slate-800 mb-2 italic">هل أعجبتك القصة؟</h5>
                        <p className="text-slate-500 font-bold">يمكنك دائماً العودة وقراءتها مرة أخرى!</p>
                     </div>
                     <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setSelectedStory(null)}
                          className="bg-slate-100 text-slate-700 px-8 py-4 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all"
                        >
                          العودة للقصص
                        </button>
                        <button className="bg-sky-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-sky-600/20 hover:bg-sky-700 hover:-translate-y-1 transition-all flex items-center gap-2 group">
                          قصة أخرى ممتعة <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};
