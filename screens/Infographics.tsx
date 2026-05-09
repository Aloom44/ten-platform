
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Infographic } from '../types';
import { Maximize2, X, Download, User, Info, Calendar, CheckCircle2 } from 'lucide-react';

export const Infographics: React.FC = () => {
  const [infographics, setInfographics] = useState<Infographic[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInfo, setSelectedInfo] = useState<Infographic | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await api.getInfographics();
        setInfographics(data);
      } catch (err) {
        console.error('Failed to load infographics', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'online_safety': return 'الأمان الإلكتروني';
      case 'digital_health': return 'الصحة الرقمية';
      case 'digital_awareness': return 'التوعية الرقمية';
      case 'cyberbullying': return 'التنمر الإلكتروني';
      case 'privacy': return 'الخصوصية';
      case 'safe_internet': return 'الاستخدام الآمن للإنترنت';
      default: return cat;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'online_safety': return 'bg-red-100 text-red-600';
      case 'digital_health': return 'bg-emerald-100 text-emerald-600';
      case 'digital_awareness': return 'bg-blue-100 text-blue-600';
      case 'cyberbullying': return 'bg-orange-100 text-orange-600';
      case 'privacy': return 'bg-indigo-100 text-indigo-600';
      case 'safe_internet': return 'bg-sky-100 text-sky-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="px-6 pb-32 pt-4">
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-[2.5rem] p-8 mb-10 border border-emerald-100 shadow-sm relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <h2 className="text-3xl font-black text-emerald-900 mb-2 flex items-center gap-3">
           <span className="p-3 bg-white rounded-2xl shadow-sm text-2xl">📊</span>
           معرض الإنفوجرافيك
        </h2>
        <p className="text-emerald-700/70 font-bold text-sm mr-16">اكتشف المعلومات بأسلوب بصري مبسط وجذاب!</p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {[1, 2, 3, 4].map(i => (
             <div key={i} className="aspect-[4/3] bg-slate-100 rounded-[2.5rem] animate-pulse"></div>
           ))}
        </div>
      )}

      {!loading && infographics.length === 0 && (
        <div className="text-center py-20 bg-white rounded-[3rem] border-4 border-dashed border-slate-50">
           <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
             <Info size={32} className="text-slate-300" />
           </div>
           <p className="text-slate-400 font-black">لا يوجد محتوى متاح حالياً.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {infographics.map((info) => (
          <div 
            key={info.id} 
            onClick={() => setSelectedInfo(info)}
            className="group cursor-pointer bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            {/* Image Preview Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
              <img 
                src={info.image} 
                alt={info.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-emerald-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                 <div className="bg-white/20 backdrop-blur-md p-5 rounded-full scale-50 group-hover:scale-100 transition-all duration-700 border border-white/30">
                    <Maximize2 size={32} className="text-white" />
                 </div>
              </div>

              {/* Badges */}
              <div className="absolute top-6 right-6 flex flex-col gap-2">
                <span className={`px-4 py-2 rounded-2xl text-[10px] font-black shadow-lg backdrop-blur-md ${getCategoryColor(info.category)} bg-opacity-90`}>
                  {getCategoryLabel(info.category)}
                </span>
                <span className="bg-white/90 backdrop-blur-md text-slate-800 px-4 py-2 rounded-2xl text-[10px] font-black shadow-lg self-end">
                  {info.age_group} سنة
                </span>
              </div>
            </div>

            {/* Simple Info Footer */}
            <div className="p-6 text-right">
              <h3 className="text-xl font-black text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors leading-tight">
                {info.title}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400">
                  <User size={14} className="text-emerald-400" />
                  <span className="text-xs font-bold">{info.authorName || 'فريق TEN'}</span>
                </div>
                <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Maximize2 size={16} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- PROFESSIONAL VIEWER MODAL --- */}
      {selectedInfo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-8 animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={() => setSelectedInfo(null)}></div>
          
          <div className="relative w-full max-w-6xl h-full sm:h-auto max-h-[95vh] bg-white sm:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row-reverse animate-in zoom-in-95 duration-500">
            
            {/* Close Button Mobile */}
            <button 
              onClick={() => setSelectedInfo(null)}
              className="absolute top-6 left-6 z-50 md:hidden bg-white/10 text-white p-3 rounded-2xl backdrop-blur-md border border-white/20"
            >
              <X size={24} />
            </button>

            {/* Left: Content Details (Scrollable) */}
            <div className="w-full md:w-1/3 p-8 sm:p-12 overflow-y-auto bg-slate-50/50 border-r border-slate-100 text-right flex flex-col">
              <div className="mb-8 hidden md:block">
                <button 
                  onClick={() => setSelectedInfo(null)}
                  className="bg-white text-slate-400 hover:text-slate-800 p-3 rounded-2xl shadow-sm transition-all active:scale-95 border border-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <span className={`inline-block px-4 py-2 rounded-2xl text-[10px] font-black shadow-sm ${getCategoryColor(selectedInfo.category)}`}>
                  {getCategoryLabel(selectedInfo.category)}
                </span>
                
                <h2 className="text-3xl font-black text-slate-900 leading-tight">
                  {selectedInfo.title}
                </h2>

                <p className="text-slate-600 font-bold leading-relaxed text-sm">
                  {selectedInfo.description}
                </p>

                {selectedInfo.content && (
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-slate-500 text-sm leading-loose whitespace-pre-wrap">
                      {selectedInfo.content}
                    </p>
                  </div>
                )}

                <div className="pt-6 border-t border-slate-200 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-xl shadow-sm text-emerald-500 border border-slate-100"><User size={20} /></div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">الكاتب</p>
                      <p className="text-base font-black text-slate-800">{selectedInfo.authorName || 'فريق TEN'}</p>
                    </div>
                  </div>

                  {(selectedInfo.contentPreparation || selectedInfo.execution) && (
                    <div className="grid grid-cols-1 gap-4 pt-4">
                      {selectedInfo.contentPreparation && (
                        <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                          <CheckCircle2 size={16} className="text-blue-500" />
                          <span>إعداد: {selectedInfo.contentPreparation}</span>
                        </div>
                      )}
                      {selectedInfo.execution && (
                        <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                          <CheckCircle2 size={16} className="text-purple-500" />
                          <span>تنفيذ: {selectedInfo.execution}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-8">
                  <button 
                    onClick={() => window.open(selectedInfo.image, '_blank')}
                    className="w-full bg-emerald-600 text-white py-5 rounded-[1.5rem] font-black text-lg shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                  >
                    <Download size={24} />
                    تحميل الإنفوجرافيك
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Immersive Image Viewer */}
            <div className="flex-1 bg-slate-900 relative overflow-hidden flex items-center justify-center p-4 sm:p-12">
               {/* Background Blur Decor */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]"></div>

               <div className="relative w-full h-full flex items-center justify-center">
                  <img 
                    src={selectedInfo.image} 
                    alt={selectedInfo.title} 
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-fade-in"
                    style={{ animationDuration: '0.8s' }}
                  />
               </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
