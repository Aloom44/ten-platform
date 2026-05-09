
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Infographic } from '../types';
import { Maximize2, X, Download, User, Info, Calendar, Sparkles } from 'lucide-react';

export const Infographics: React.FC = () => {
  const [infographics, setInfographics] = useState<Infographic[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInfographic, setSelectedInfographic] = useState<Infographic | null>(null);

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
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl p-6 mb-8 border border-emerald-100 shadow-sm">
        <h2 className="text-2xl font-black text-emerald-900 mb-2 flex items-center gap-2">
           <span className="text-3xl">📊</span>
           الإنفوجرافيك
        </h2>
        <p className="text-emerald-700 font-medium text-sm">معلومات مفيدة برسومات رائعة ومبسطة!</p>
      </div>

      {loading && <p className="text-center text-slate-400 py-10">جاري تحميل الإنفوجرافيك...</p>}

      {!loading && infographics.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
           <p className="text-slate-400">لا يوجد إنفوجرافيك متاح حالياً.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {infographics.map((info) => (
          <div 
            key={info.id} 
            onClick={() => setSelectedInfographic(info)}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-500 cursor-pointer"
          >
            {/* Image Preview - Using White Background for clarity */}
            <div className="relative aspect-[4/3] overflow-hidden bg-white">
              <img 
                src={info.image} 
                alt={info.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                 <div className="bg-emerald-600/90 text-white p-5 rounded-full scale-90 group-hover:scale-100 transition-all duration-500 shadow-2xl">
                   <Maximize2 size={32} />
                 </div>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-4 py-2 rounded-2xl text-xs font-black shadow-sm backdrop-blur-md ${getCategoryColor(info.category)} bg-opacity-90`}>
                  {getCategoryLabel(info.category)}
                </span>
              </div>
            </div>

            {/* Content Preview */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-black text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors">{info.title}</h3>
                <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-xl text-[10px] font-bold flex-shrink-0">
                  {info.age_group} سنة
                </span>
              </div>
              
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                {info.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Professional Reader Modal */}
      {selectedInfographic && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl" onClick={() => setSelectedInfographic(null)}></div>
          
          <div className="relative w-full max-w-4xl h-full sm:h-auto sm:max-h-[90vh] bg-white sm:rounded-[3rem] shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 overflow-hidden flex flex-col">
             {/* Header with Close */}
             <div className="absolute top-6 left-6 z-20">
                <button 
                  onClick={() => setSelectedInfographic(null)}
                  className="bg-black/20 hover:bg-black/40 text-white p-3 rounded-2xl backdrop-blur-md transition-all active:scale-90 border border-white/10"
                >
                  <X size={24} />
                </button>
             </div>

             <div className="overflow-y-auto no-scrollbar flex-1">
                {/* 1. Large Top Image - Full View without Cropping */}
                <div className="relative w-full bg-white overflow-hidden">
                  <img 
                    src={selectedInfographic.image} 
                    alt={selectedInfographic.title} 
                    className="w-full h-auto block"
                  />
                  
                  {/* Download Button Over Image */}
                  <div className="absolute top-6 right-6">
                    <button 
                      onClick={() => window.open(selectedInfographic.image, '_blank')}
                      className="flex items-center gap-2 bg-black/40 hover:bg-black/60 text-white px-6 py-3 rounded-2xl font-black text-xs shadow-xl backdrop-blur-md transition-all active:scale-95 border border-white/20"
                    >
                      <Download size={18} /> تحميل الإنفوجرافيك
                    </button>
                  </div>
                </div>

                {/* 2. Content Section */}
                <div className="p-8 sm:p-16">
                  {/* Category & Age */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`px-4 py-2 rounded-2xl text-[10px] font-black shadow-sm ${getCategoryColor(selectedInfographic.category)}`}>
                      {getCategoryLabel(selectedInfographic.category)}
                    </span>
                    <span className="bg-slate-100 text-slate-500 px-4 py-2 rounded-2xl text-[10px] font-black">
                      مناسب لعمر {selectedInfographic.age_group} سنة
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-8 leading-tight text-right">
                    {selectedInfographic.title}
                  </h2>

                  {/* Description Box */}
                  <div className="bg-emerald-50/50 border-r-4 border-emerald-400 p-6 rounded-2xl mb-12">
                    <p className="text-xl font-bold text-slate-700 leading-relaxed text-right">
                      {selectedInfographic.description}
                    </p>
                  </div>

                  {/* Full Text Content */}
                  {selectedInfographic.content && (
                    <div className="prose prose-slate max-w-none mb-16">
                      <div className="text-slate-600 text-lg leading-[1.8] text-right font-medium whitespace-pre-wrap">
                        {selectedInfographic.content}
                      </div>
                    </div>
                  )}

                  {/* 3. Footer Section: Contributors */}
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 sm:p-10 shadow-sm mt-12">
                     <div className="flex items-center gap-3 mb-8">
                        <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-500">
                           <User size={20} />
                        </div>
                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">المبدعون خلف هذا العمل</h4>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {selectedInfographic.authorName && (
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                               <Info size={24} />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">الكاتب</p>
                               <p className="text-xl font-black text-slate-800">{selectedInfographic.authorName}</p>
                            </div>
                          </div>
                        )}
                        
                        {(selectedInfographic.contentPreparation || selectedInfographic.execution) && (
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                               <Sparkles size={24} />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">إعداد وتنفيذ</p>
                               <p className="text-xl font-black text-slate-800">
                                  {selectedInfographic.contentPreparation || selectedInfographic.execution}
                               </p>
                            </div>
                          </div>
                        )}
                     </div>

                     <div className="mt-10 pt-10 border-t border-slate-50 flex justify-center">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                           تم النشر في منصة TEN الرقمية • {selectedInfographic.createdAt ? new Date(selectedInfographic.createdAt).toLocaleDateString('ar-EG') : '2024'}
                        </p>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
