
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Infographic } from '../types';
import { Maximize2, X, Download, User, Info, Calendar } from 'lucide-react';

export const Infographics: React.FC = () => {
  const [infographics, setInfographics] = useState<Infographic[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
      case 'digital_awareness': return 'توعية رقمية';
      case 'positive_behavior': return 'سلوكيات إيجابية';
      case 'online_safety': return 'الأمان على الإنترنت';
      case 'health_habits': return 'الصحة والعادات';
      case 'quick_info': return 'معلومات سريعة';
      default: return cat;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'digital_awareness': return 'bg-blue-100 text-blue-600';
      case 'positive_behavior': return 'bg-emerald-100 text-emerald-600';
      case 'online_safety': return 'bg-red-100 text-red-600';
      case 'health_habits': return 'bg-purple-100 text-purple-600';
      case 'quick_info': return 'bg-amber-100 text-amber-600';
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
          <div key={info.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-500">
            {/* Image Preview */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img 
                src={info.image} 
                alt={info.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                 <button 
                  onClick={() => setSelectedImage(info.image)}
                  className="bg-white p-4 rounded-2xl text-emerald-600 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
                 >
                   <Maximize2 size={24} />
                 </button>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-4 py-2 rounded-2xl text-xs font-black shadow-sm backdrop-blur-md ${getCategoryColor(info.category)} bg-opacity-90`}>
                  {getCategoryLabel(info.category)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-black text-slate-800 leading-tight group-hover:text-emerald-600 transition-colors">{info.title}</h3>
                <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-xl text-[10px] font-bold flex-shrink-0">
                  {info.age_group} سنة
                </span>
              </div>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                {info.description || 'تعلم مهارات جديدة ومعلومات قيمة من خلال هذا الإنفوجرافيك المتميز.'}
              </p>

              {/* Contributors */}
              {(info.contentPreparation || info.execution) && (
                <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-50">
                  {info.contentPreparation && (
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <User size={12} className="text-emerald-400" />
                      <span className="font-medium">إعداد: {info.contentPreparation}</span>
                    </div>
                  )}
                  {info.execution && (
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <Calendar size={12} className="text-blue-400" />
                      <span className="font-medium">تنفيذ: {info.execution}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Full Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm" onClick={() => setSelectedImage(null)}></div>
          <div className="relative max-w-5xl w-full max-h-full overflow-auto bg-white rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300">
             <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-colors"
             >
               <X size={24} />
             </button>
             <img src={selectedImage} alt="Infographic Full View" className="w-full h-auto block" />
             <div className="p-4 bg-white flex justify-center">
                <button 
                  onClick={() => window.open(selectedImage, '_blank')}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-emerald-700 transition-all active:scale-95"
                >
                  <Download size={20} />
                  تحميل الصورة
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
