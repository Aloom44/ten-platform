import React, { useState } from 'react';
import { MOCK_CARICATURES } from '../constants';
import { ZoomIn, Share2, PenTool, Image as ImageIcon, Send, CheckCircle, X } from 'lucide-react';

export const Caricatures: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ title: '', description: '' });
      
      // Close form after delay
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowForm(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="px-6 pb-24 pt-4">
       <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-3xl p-6 mb-8 text-center border border-pink-200 shadow-sm">
        <h2 className="text-xl font-black text-pink-700 mb-2">كاريكاتير وتوعية</h2>
        <p className="text-pink-600 text-sm font-medium">رسومات مضحكة لكنها مفيدة!</p>
      </div>

      <div className="grid gap-6 mb-12">
        {MOCK_CARICATURES.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="relative group cursor-pointer">
                <img src={item.image} alt={item.title} className="w-full h-auto object-cover bg-slate-100" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white/90 p-2 rounded-full text-slate-800 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
                        <ZoomIn size={24} />
                    </button>
                </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-lg text-slate-800">{item.title}</h3>
                 <button className="text-slate-400 hover:text-pink-500">
                    <Share2 size={18} />
                 </button>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-3 mt-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Contribution Section */}
      <div className="relative">
        {!showForm ? (
          <button 
            onClick={() => setShowForm(true)}
            className="w-full bg-slate-800 text-white rounded-3xl p-6 flex items-center justify-between shadow-lg active:scale-95 transition-all group"
          >
            <div className="flex flex-col items-start gap-1">
              <h3 className="font-bold text-lg">هل لديك فكرة؟</h3>
              <p className="text-slate-400 text-xs">أرسل لنا رسمتك أو اقتراحك!</p>
            </div>
            <div className="bg-pink-500 p-3 rounded-2xl group-hover:rotate-12 transition-transform">
              <PenTool size={24} className="text-white" />
            </div>
          </button>
        ) : (
          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 animate-slide-up relative">
             <button 
              onClick={() => setShowForm(false)}
              className="absolute top-4 left-4 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-pink-100 p-2 rounded-xl text-pink-600">
                <PenTool size={20} />
              </div>
              <h3 className="font-bold text-slate-800">مشاركة إبداعك</h3>
            </div>

            {submitSuccess ? (
              <div className="py-8 text-center flex flex-col items-center animate-fade-in">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} />
                </div>
                <h4 className="font-bold text-emerald-700 text-lg mb-1">تم الإرسال بنجاح!</h4>
                <p className="text-slate-500 text-sm">شكراً لمشاركتك يا بطل، سنراجعها قريباً.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">عنوان الفكرة</label>
                  <input 
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="مثال: خطر الإدمان"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400 transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">الوصف</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="اشرح فكرتك أو ماذا رسمت..."
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400 transition-colors resize-none"
                  />
                </div>

                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center text-slate-400 gap-2 cursor-pointer hover:bg-slate-50 transition-colors">
                  <ImageIcon size={24} />
                  <span className="text-xs font-bold">إرفاق صورة (اختياري)</span>
                </div>

                <button 
                  type="submit"
                  disabled={!formData.title || !formData.description || isSubmitting}
                  className="w-full bg-pink-500 text-white rounded-xl py-3 font-bold shadow-md hover:bg-pink-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'جاري الإرسال...'
                  ) : (
                    <>
                      <span>إرسال للمراجعة</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};