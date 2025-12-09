
import React, { useState, useEffect } from 'react';
import { PARENT_TIPS } from '../constants';
import { AppSettings } from '../types';
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
  X
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

  // Reset saved toast after 3 seconds
  useEffect(() => {
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [saved]);

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
    // In a real app, this is where you might persist to local storage
    setTimeout(() => setView('tips'), 1500);
  };

  // --- RENDER: PIN Screen ---
  if (view === 'pin') {
    return (
      <div className="bg-slate-900 min-h-screen text-white flex flex-col items-center justify-center p-6 animate-fade-in relative z-50">
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
      </div>
    );
  }

  // --- RENDER: Settings Dashboard ---
  if (view === 'settings') {
    return (
      <div className="bg-slate-50 min-h-full pb-24">
        <div className="bg-white sticky top-0 z-10 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <button onClick={() => setView('tips')} className="text-slate-500">
            <ArrowLeft size={24} />
          </button>
          <h2 className="font-bold text-slate-800">إعدادات الرقابة</h2>
          <div className="w-6"></div> {/* Spacer */}
        </div>

        <div className="p-6 space-y-6">
          {saved && (
            <div className="bg-emerald-100 text-emerald-700 p-4 rounded-xl flex items-center gap-2 mb-4 animate-slide-up">
              <CheckCircle size={20} />
              <span className="font-bold text-sm">تم حفظ الإعدادات بنجاح!</span>
            </div>
          )}

          {/* Section 1: Content Safety */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">فلترة المحتوى</h3>
            
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">البحث الآمن</p>
                  <p className="text-[10px] text-slate-400">حجب الكلمات والصور غير المناسبة (Gemini Filter)</p>
                </div>
              </div>
              <button 
                onClick={() => onUpdateSettings({ safeFilter: !currentSettings.safeFilter })}
                className={`w-12 h-6 rounded-full transition-colors relative ${currentSettings.safeFilter ? 'bg-emerald-500' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${currentSettings.safeFilter ? 'left-1' : 'left-7'}`} />
              </button>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-lg text-red-600">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">حظر الروابط الخارجية</p>
                  <p className="text-[10px] text-slate-400">منع فتح متصفح خارجي</p>
                </div>
              </div>
              <button 
                onClick={() => onUpdateSettings({ blockExternalLinks: !currentSettings.blockExternalLinks })}
                className={`w-12 h-6 rounded-full transition-colors relative ${currentSettings.blockExternalLinks ? 'bg-emerald-500' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${currentSettings.blockExternalLinks ? 'left-1' : 'left-7'}`} />
              </button>
            </div>
          </div>

          {/* Section 2: Time Management */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">إدارة الوقت</h3>
            
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">وقت الشاشة اليومي</p>
                  <p className="text-[10px] text-slate-400">الحد الأقصى للاستخدام اليومي</p>
                </div>
              </div>
              
              <input 
                type="range" 
                min="15" 
                max="120" 
                step="15" 
                value={currentSettings.timeLimit}
                onChange={(e) => onUpdateSettings({ timeLimit: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between mt-2 text-xs font-bold text-slate-500">
                <span>15 دقيقة</span>
                <span className="text-orange-600">{currentSettings.timeLimit} دقيقة</span>
                <span>ساعتين</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                  <Moon size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">وضع النوم</p>
                  <p className="text-[10px] text-slate-400">إغلاق التطبيق تلقائياً بعد 8 مساءً</p>
                </div>
              </div>
              <button 
                onClick={() => onUpdateSettings({ bedtimeMode: !currentSettings.bedtimeMode })}
                className={`w-12 h-6 rounded-full transition-colors relative ${currentSettings.bedtimeMode ? 'bg-emerald-500' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${currentSettings.bedtimeMode ? 'left-1' : 'left-7'}`} />
              </button>
            </div>
          </div>

          <button 
            onClick={handleSave}
            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-slate-700 active:scale-95 transition-all mt-4"
          >
            حفظ التغييرات
          </button>
        </div>
      </div>
    );
  }

  // --- RENDER: Default Tips View ---
  return (
    <div className="bg-slate-50 min-h-full pb-24">
      <div className="bg-slate-800 text-white p-6 pb-8 rounded-b-[2.5rem] shadow-lg mb-6">
        <button 
          onClick={onBack}
          className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors mb-4"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <ShieldAlert size={24} className="text-red-400" />
          حماية الطفل
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
          هدفنا توعية الأطفال بمخاطر الإنترنت، والابتعاد عن المحتوى غير المناسب، وتشجيعهم على اللعب في العالم الحقيقي.
        </p>
      </div>

      <div className="px-6 space-y-4">
        {/* Settings Entry Point */}
        <div className="bg-white border border-blue-100 p-5 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-blue-900 text-lg">أدوات الرقابة الأبوية</h3>
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                        <Settings size={20} />
                    </div>
                </div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    تحكم في وقت الشاشة، قم بحجب المواقع، وقم بتفعيل وضع النوم للحفاظ على صحة طفلك.
                </p>
                <button 
                    onClick={() => setView('pin')}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                    <Lock size={16} />
                    الدخول للإعدادات
                </button>
            </div>
        </div>

        <h3 className="font-bold text-slate-800 mt-6 px-1">نصائح هامة</h3>
        {PARENT_TIPS.map((tip, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex gap-4 items-start">
            <div className="bg-red-50 text-red-500 text-2xl w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0">
              {tip.icon}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 mb-1">{tip.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{tip.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
