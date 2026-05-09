import React, { useState, useEffect, useRef } from 'react';
import { AppSettings, ParentTip } from '../types';
import { api } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ShieldAlert, 
  Settings, 
  Lock, 
  Clock, 
  Moon, 
  Globe, 
  CheckCircle,
  AlertTriangle,
  X,
  User,
  Calendar,
  Share2,
  Type,
  Minus,
  Plus,
  Sparkles,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';

interface ParentsProps {
  onBack: () => void;
  currentSettings: AppSettings;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
}

type ViewState = 'tips' | 'pin' | 'settings';

export const Parents: React.FC<ParentsProps> = ({ onBack, currentSettings, onUpdateSettings }) => {
  const [view, setView] = useState<ViewState>('tips');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [tips, setTips] = useState<ParentTip[]>([]);
  const [loadingTips, setLoadingTips] = useState(true);
  const [selectedTip, setSelectedTip] = useState<ParentTip | null>(null);
  const [fontSize, setFontSize] = useState(20);
  const [readingProgress, setReadingProgress] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset saved toast after 3 seconds
  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [saved]);

  useEffect(() => {
    const loadTips = async () => {
      try {
        setLoadingTips(true);
        const data = await api.getParentTips();
        setTips(data);
      } catch (err) {
        console.error('Failed to load parent tips', err);
      } finally {
        setLoadingTips(false);
      }
    };
    loadTips();
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const progress = (target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100;
    setReadingProgress(progress);
  };

  const getTipIcon = (category: string) => {
    switch (category) {
      case 'screen_time': return <Clock size={20} />;
      case 'sleep': return <Moon size={20} />;
      case 'games': return <Settings size={20} />;
      case 'protection': return <ShieldAlert size={20} />;
      case 'mental_health': return <AlertTriangle size={20} />;
      case 'family_comms': return <Globe size={20} />;
      default: return <ShieldAlert size={20} />;
    }
  };

  const getTipColor = (category: string) => {
    switch (category) {
      case 'screen_time': return 'bg-blue-100 text-blue-600';
      case 'sleep': return 'bg-indigo-100 text-indigo-600';
      case 'games': return 'bg-orange-100 text-orange-600';
      case 'protection': return 'bg-red-100 text-red-600';
      case 'mental_health': return 'bg-purple-100 text-purple-600';
      case 'family_comms': return 'bg-emerald-100 text-emerald-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'screen_time': return 'وقت الشاشة';
      case 'sleep': return 'عادات النوم';
      case 'games': return 'الألعاب الرقمية';
      case 'protection': return 'الحماية الرقمية';
      case 'mental_health': return 'الصحة النفسية';
      case 'family_comms': return 'التواصل العائلي';
      default: return 'نصيحة تربوية';
    }
  };

  const handlePinSubmit = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      setError('');
      
      if (newPin.length === 4) {
        if (newPin === '1234') {
          setTimeout(() => setView('settings'), 300);
          setPin('');
        } else {
          setError('رمز غير صحيح');
          setTimeout(() => setPin(''), 500);
        }
      }
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setView('tips'), 1500);
  };

  // --- RENDER: PIN Screen ---
  if (view === 'pin') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-slate-900 min-h-screen text-white flex flex-col items-center justify-center p-6 fixed inset-0 z-[110]"
      >
        <button 
          onClick={() => setView('tips')}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <Lock size={48} className="mb-6 text-emerald-400" />
        <h2 className="text-xl font-bold mb-2">أمان العائلة</h2>
        <p className="text-slate-400 text-sm mb-8">أدخل رمز المرور (1234)</p>

        <div className="flex gap-4 mb-8">
          {[0, 1, 2, 3].map(i => (
            <div 
              key={i} 
              className={`w-4 h-4 rounded-full transition-all ${
                i < pin.length ? 'bg-emerald-400 scale-110' : 'bg-slate-700'
              }`} 
            />
          ))}
        </div>

        {error && <p className="text-red-400 text-sm mb-6 font-bold animate-pulse">{error}</p>}

        <div className="grid grid-cols-3 gap-6 w-full max-w-[280px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              onClick={() => handlePinSubmit(num.toString())}
              className="w-16 h-16 rounded-full bg-slate-800 hover:bg-slate-700 font-bold text-2xl transition-colors"
            >
              {num}
            </button>
          ))}
          <div className="col-start-2">
            <button
              onClick={() => handlePinSubmit('0')}
              className="w-16 h-16 rounded-full bg-slate-800 hover:bg-slate-700 font-bold text-2xl transition-colors"
            >
              0
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // --- RENDER: Settings Dashboard ---
  if (view === 'settings') {
    return (
      <motion.div 
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-slate-50 min-h-screen pb-24 fixed inset-0 z-[100] overflow-y-auto"
      >
        <div className="bg-white sticky top-0 z-10 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <button onClick={() => setView('tips')} className="text-slate-500 p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h2 className="font-black text-slate-800 text-lg">إعدادات الرقابة</h2>
          <div className="w-10"></div>
        </div>

        <div className="max-w-xl mx-auto p-6 space-y-6">
          {saved && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-emerald-100 text-emerald-700 p-4 rounded-2xl flex items-center gap-2 border border-emerald-200"
            >
              <CheckCircle size={20} />
              <span className="font-bold text-sm">تم حفظ الإعدادات بنجاح!</span>
            </motion.div>
          )}

          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">فلترة المحتوى</h3>
            
            <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <p className="font-black text-slate-800 text-sm">البحث الآمن</p>
                  <p className="text-[10px] text-slate-400 font-bold">حجب الكلمات والصور غير المناسبة</p>
                </div>
              </div>
              <button 
                onClick={() => onUpdateSettings({ safeFilter: !currentSettings.safeFilter })}
                className={`w-14 h-7 rounded-full transition-colors relative ${currentSettings.safeFilter ? 'bg-emerald-500' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${currentSettings.safeFilter ? 'left-1' : 'left-8'}`} />
              </button>
            </div>

            <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-red-200 transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-red-50 p-3 rounded-2xl text-red-600">
                  <Globe size={24} />
                </div>
                <div>
                  <p className="font-black text-slate-800 text-sm">حظر الروابط الخارجية</p>
                  <p className="text-[10px] text-slate-400 font-bold">منع فتح متصفح خارجي للأطفال</p>
                </div>
              </div>
              <button 
                onClick={() => onUpdateSettings({ blockExternalLinks: !currentSettings.blockExternalLinks })}
                className={`w-14 h-7 rounded-full transition-colors relative ${currentSettings.blockExternalLinks ? 'bg-emerald-500' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${currentSettings.blockExternalLinks ? 'left-1' : 'left-8'}`} />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">إدارة الوقت</h3>
            
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-orange-50 p-3 rounded-2xl text-orange-600">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="font-black text-slate-800 text-sm">وقت الشاشة اليومي</p>
                  <p className="text-[10px] text-slate-400 font-bold">الحد الأقصى للاستخدام اليومي</p>
                </div>
              </div>
              
              <input 
                type="range" 
                min="15" 
                max="120" 
                step="15" 
                value={currentSettings.timeLimit}
                onChange={(e) => onUpdateSettings({ timeLimit: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500 mb-4"
              />
              <div className="flex justify-between text-xs font-black text-slate-500">
                <span>15 دقيقة</span>
                <span className="text-orange-600 bg-orange-50 px-3 py-1 rounded-full">{currentSettings.timeLimit} دقيقة</span>
                <span>ساعتين</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600">
                  <Moon size={24} />
                </div>
                <div>
                  <p className="font-black text-slate-800 text-sm">وضع النوم</p>
                  <p className="text-[10px] text-slate-400 font-bold">إغلاق التطبيق تلقائياً في وقت النوم</p>
                </div>
              </div>
              <button 
                onClick={() => onUpdateSettings({ bedtimeMode: !currentSettings.bedtimeMode })}
                className={`w-14 h-7 rounded-full transition-colors relative ${currentSettings.bedtimeMode ? 'bg-emerald-500' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${currentSettings.bedtimeMode ? 'left-1' : 'left-8'}`} />
              </button>
            </div>
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black shadow-xl hover:bg-slate-800 active:scale-95 transition-all mt-6"
          >
            حفظ الإعدادات
          </button>
        </div>
      </motion.div>
    );
  }

  // --- RENDER: Default Tips View ---
  return (
    <div className="bg-[#FDFCF8] min-h-screen pb-32">
      {/* Header Section */}
      <div className="bg-white px-6 pt-6 pb-10 rounded-b-[3.5rem] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] border-b border-slate-50">
        <div className="flex items-center justify-between mb-8">
            <button 
              onClick={onBack}
              className="bg-slate-50 p-3 rounded-2xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all"
            >
              <ArrowRight size={24} />
            </button>
            <div className="bg-red-50 text-red-500 p-3 rounded-2xl">
              <ShieldAlert size={24} />
            </div>
        </div>
        
        <h2 className="text-4xl font-black text-slate-900 mb-4 text-right">نصائح الأهل</h2>
        <p className="text-slate-500 font-bold text-lg leading-relaxed text-right max-w-sm ml-auto">
          دليلك الشامل لتربية جيل واعٍ ومبدع في العصر الرقمي.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 -mt-8 space-y-8 relative z-10">
        {/* Settings Entry Point - Modern Style */}
        <motion.div 
          whileHover={{ y: -5 }}
          onClick={() => setView('pin')}
          className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50 group cursor-pointer"
        >
          <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform">
                  <Settings size={28} />
              </div>
              <div className="bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest">
                إدارة الأمان
              </div>
          </div>
          <h3 className="font-black text-slate-900 text-2xl mb-3 text-right">أدوات الرقابة الأبوية</h3>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed text-right font-bold">
              تحكم في وقت الشاشة، حجب المواقع، وتفعيل وضع النوم بضغطة زر.
          </p>
          <div className="flex items-center justify-end gap-3 text-blue-600 font-black text-sm">
            <span>اكتشف الإعدادات</span>
            <ChevronLeft size={18} />
          </div>
        </motion.div>

        <div className="pt-4">
          <h3 className="font-black text-slate-800 text-2xl mb-8 pr-2 flex items-center justify-end gap-3">
             نصائح مختارة <Sparkles className="text-amber-400" size={24} />
          </h3>
          
          {loadingTips && (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white h-48 rounded-[2.5rem] animate-pulse"></div>
              ))}
            </div>
          )}
          
          {!loadingTips && tips.length === 0 && (
            <div className="bg-white p-12 rounded-[2.5rem] border-4 border-dashed border-slate-100 text-center">
               <p className="text-slate-400 font-black">لا توجد نصائح متاحة حالياً.</p>
            </div>
          )}

          <div className="grid gap-8">
            {tips.map((tip, idx) => (
              <motion.div 
                key={tip.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedTip(tip)}
                className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-8 items-start group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] flex-shrink-0 overflow-hidden shadow-lg border-4 border-white group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src={tip.image || tip.coverImageUrl || 'https://picsum.photos/200/200?random=' + idx} 
                    className="w-full h-full object-cover" 
                    alt={tip.title}
                  />
                </div>
                <div className="flex-1 text-right w-full">
                  <div className="flex flex-wrap items-center justify-end gap-3 mb-4">
                    <span className="bg-slate-50 text-slate-400 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">
                      {getCategoryLabel(tip.category)}
                    </span>
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">
                      8-12 سنة
                    </span>
                  </div>
                  <h3 className="font-black text-slate-800 text-2xl mb-4 leading-tight group-hover:text-emerald-600 transition-colors">{tip.title}</h3>
                  <p className="text-slate-500 font-bold leading-relaxed mb-6 line-clamp-3 italic">
                    {tip.summary || tip.content.slice(0, 150) + "..."}
                  </p>
                  
                  <div className="pt-6 border-t border-slate-50 flex flex-wrap gap-x-8 gap-y-3 items-center justify-end">
                    {tip.authorName && (
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <User size={14} className="text-emerald-400" />
                        الكاتب: {tip.authorName}
                      </span>
                    )}
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Clock size={14} className="text-blue-400" />
                      5 دقائق
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- PROFESSIONAL TIP READER MODAL --- */}
      <AnimatePresence>
        {selectedTip && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-0"
          >
            <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl" onClick={() => setSelectedTip(null)}></div>
            
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-5xl h-full sm:h-[95vh] bg-[#FDFCF8] sm:rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 right-0 z-50 h-1.5 bg-slate-100">
                <motion.div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-400"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>

              {/* Sticky Controls Header */}
              <div className="absolute top-0 left-0 right-0 z-40 flex justify-between items-center p-6 sm:p-10 pointer-events-none">
                 <div className="pointer-events-auto">
                    <button 
                      onClick={() => setSelectedTip(null)}
                      className="bg-black/20 hover:bg-black/40 text-white p-3.5 rounded-2xl backdrop-blur-md transition-all active:scale-90 border border-white/10"
                    >
                      <X size={24} />
                    </button>
                 </div>
                 
                 <div className="pointer-events-auto flex items-center gap-3 bg-white/90 p-2 rounded-[1.5rem] shadow-2xl border border-white backdrop-blur-xl">
                    <button 
                      onClick={() => setFontSize(prev => Math.max(16, prev - 2))}
                      className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"
                    >
                      <Minus size={20} />
                    </button>
                    <div className="px-3 text-center font-black text-slate-700 text-xs flex items-center gap-2 border-x border-slate-100">
                      <Type size={16} className="text-emerald-500" /> {fontSize}
                    </div>
                    <button 
                      onClick={() => setFontSize(prev => Math.min(32, prev + 2))}
                      className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                 </div>
              </div>

              <div 
                onScroll={handleScroll}
                className="overflow-y-auto no-scrollbar flex-1 scroll-smooth"
              >
                {/* 1. Hero Section */}
                <div className="relative w-full h-[50vh] sm:h-[600px] overflow-hidden">
                  <img 
                    src={selectedTip.image || 'https://picsum.photos/1200/800?random=tip'} 
                    className="w-full h-full object-cover"
                    alt={selectedTip.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCF8] via-transparent to-black/30"></div>
                  
                  {/* Hero Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-20 text-right">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex flex-wrap items-center justify-end gap-3 mb-6">
                        <span className={`px-5 py-2.5 rounded-2xl text-xs font-black shadow-lg shadow-black/10 flex items-center gap-2 ${getTipColor(selectedTip.category)} bg-opacity-95`}>
                          {getTipIcon(selectedTip.category)} {getCategoryLabel(selectedTip.category)}
                        </span>
                        <span className="bg-white/90 backdrop-blur-md text-slate-800 px-5 py-2.5 rounded-2xl text-xs font-black shadow-lg flex items-center gap-2">
                          <Clock size={16} className="text-emerald-500" /> 5 دقائق قراءة
                        </span>
                      </div>
                      <h1 className="text-4xl sm:text-7xl font-black text-slate-900 leading-[1.1] mb-4">
                        {selectedTip.title}
                      </h1>
                    </motion.div>
                  </div>
                </div>

                {/* 2. Article Body */}
                <div className="px-6 sm:px-20 pb-32">
                  <div className="max-w-3xl mx-auto">
                    {/* Summary Card */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="bg-emerald-50/50 border-r-8 border-emerald-400 p-8 sm:p-12 rounded-[2.5rem] -mt-12 relative z-10 mb-20 shadow-sm"
                    >
                      <p className="text-2xl sm:text-3xl font-black text-slate-800 leading-[1.6] text-right italic">
                        {selectedTip.summary || "نصيحة اليوم للأهل لضمان رحلة رقمية آمنة وممتعة لأبنائنا."}
                      </p>
                    </motion.div>

                    {/* Content Body */}
                    <div 
                      className="text-slate-700 leading-[1.8] text-right font-medium transition-all duration-300"
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      {selectedTip.content.split('\n\n').map((para, i) => (
                        <motion.p 
                          key={i} 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          className="mb-12 whitespace-pre-wrap"
                        >
                          {para}
                        </motion.p>
                      ))}
                    </div>

                    {/* Author & Credits Footer */}
                    <div className="bg-white border border-slate-100 rounded-[3rem] p-8 sm:p-12 shadow-sm mt-24">
                      <div className="flex items-center gap-4 mb-10">
                        <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-500">
                          <User size={24} />
                        </div>
                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">فريق المحتوى والتربية</h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                        <div className="text-right">
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 flex items-center justify-end gap-2">
                             الكاتب <User size={12} className="text-emerald-400" />
                          </p>
                          <p className="text-2xl font-black text-slate-800">{selectedTip.authorName || 'خبير تربوي'}</p>
                        </div>
                        
                        {selectedTip.contentPreparation && (
                          <div className="text-right">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2 flex items-center justify-end gap-2">
                               إعداد المحتوى <Sparkles size={12} className="text-amber-400" />
                            </p>
                            <p className="text-2xl font-black text-slate-800">{selectedTip.contentPreparation}</p>
                          </div>
                        )}

                        <div className="pt-8 border-t border-slate-50 col-span-full flex flex-wrap items-center justify-between gap-6">
                           <div className="flex items-center gap-4">
                              <div className="bg-slate-50 px-5 py-2.5 rounded-2xl text-[10px] font-black text-slate-400 border border-slate-100 flex items-center gap-2">
                                 <Calendar size={14} /> 9 مايو 2026
                              </div>
                              <div className="bg-slate-50 px-5 py-2.5 rounded-2xl text-[10px] font-black text-slate-400 border border-slate-100 flex items-center gap-2">
                                 <ShieldAlert size={14} className="text-red-400" /> محتوى موثوق
                              </div>
                           </div>
                           <button className="flex items-center gap-2 text-emerald-600 font-black text-sm hover:gap-4 transition-all">
                              مشاركة الفائدة <Share2 size={18} />
                           </button>
                        </div>
                      </div>
                    </div>

                    {/* Similar Tips Section */}
                    <div className="mt-32">
                       <h3 className="text-2xl font-black text-slate-800 mb-10 text-right flex items-center justify-end gap-3">
                          نصائح قد تهمك <ArrowLeft className="text-emerald-400" size={24} />
                       </h3>
                       <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x">
                          {tips.filter(t => t.id !== selectedTip.id).slice(0, 4).map(tip => (
                            <div 
                              key={tip.id}
                              onClick={() => {
                                setSelectedTip(tip);
                                setReadingProgress(0);
                                scrollRef.current?.scrollTo(0, 0);
                              }}
                              className="flex-shrink-0 w-[280px] bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm snap-start cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                            >
                               <div className="w-full h-32 rounded-[1.8rem] overflow-hidden mb-4 shadow-sm">
                                  <img 
                                    src={tip.image || tip.coverImageUrl || 'https://picsum.photos/400/300?random=' + tip.id} 
                                    className="w-full h-full object-cover"
                                    alt={tip.title}
                                  />
                               </div>
                               <h4 className="font-black text-slate-800 text-lg mb-2 text-right line-clamp-1 leading-tight px-2">{tip.title}</h4>
                               <p className="text-[10px] font-black text-emerald-500 text-right uppercase tracking-wider px-2">
                                  {getCategoryLabel(tip.category)}
                               </p>
                            </div>
                          ))}
                       </div>
                    </div>

                    {/* Reader Footer */}
                    <div className="mt-32 py-16 border-t border-slate-100 flex flex-col items-center gap-8">
                       <h5 className="text-2xl font-black text-slate-800 text-center italic">هل استفدت من هذه النصيحة؟</h5>
                       <div className="flex gap-4">
                          <button 
                            onClick={() => setSelectedTip(null)}
                            className="bg-slate-100 text-slate-700 px-10 py-5 rounded-[1.5rem] font-black hover:bg-slate-200 transition-all"
                          >
                            العودة للنصائح
                          </button>
                          <button className="bg-emerald-600 text-white px-10 py-5 rounded-[1.5rem] font-black shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 hover:-translate-y-1 transition-all">
                            مشاركة مع صديق
                          </button>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
