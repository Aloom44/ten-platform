import React, { useMemo, useState } from 'react';
import { api } from '../services/api';
import { Play, Image as ImageIcon, Plus, Trash2, LogOut, Layout, BookOpen, Video as VideoIcon, FileText, Lightbulb, BarChart3, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { INFOGRAPHIC_CATEGORIES, PARENT_TIP_CATEGORIES } from '../constants';

type ContentType = 'story' | 'video' | 'article' | 'parent_tip' | 'infographic';

const emptyValues = {
  title: '',
  summary: '',
  content: '',
  age_group: '8-12',
  difficulty: 'easy',
  reading_time: '5',
  author: '',
  description: '',
  video_url: '',
  thumbnail_url: '',
  duration: '180',
  category: 'awareness',
  content_preparation: '',
  execution: '',
  goal: '',
  daily_tip: '',
  cover_image_url: '',
  author_name: '',
  image_url: '',
  content_blocks: [] as any[],
};

export const AdminPanel: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('auth_token')));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contentType, setContentType] = useState<ContentType>('story');
  const [values, setValues] = useState(emptyValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const title = useMemo(() => {
    switch (contentType) {
      case 'story': return 'رفع قصة جديدة';
      case 'video': return 'رفع فيديو جديد';
      case 'article': return 'رفع مقال جديد';
      case 'parent_tip': return 'إضافة نصيحة لأولياء الأمور';
      case 'infographic': return 'إضافة إنفوجرافيك جديد';
      default: return 'رفع محتوى';
    }
  }, [contentType]);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      setIsSubmitting(true);
      await api.login(username, password);
      setIsLoggedIn(true);
      setMessage('تم تسجيل الدخول بنجاح. يمكنك الآن رفع المحتوى.');
    } catch {
      setError('فشل تسجيل الدخول. تأكد من اسم المستخدم وكلمة المرور.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onLogout = () => {
    api.logout();
    setIsLoggedIn(false);
    setMessage('تم تسجيل الخروج.');
  };

  const updateValue = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      setIsSubmitting(true);
      if (contentType === 'story') {
        await api.createStory({
          title: values.title,
          content: values.content,
          summary: values.summary,
          age_group: values.age_group,
          difficulty: values.difficulty as 'easy' | 'medium' | 'hard',
          reading_time: Number(values.reading_time || 5),
          author: values.author,
          image_url: values.image_url,
          content_preparation: values.content_preparation,
          execution: values.execution,
          is_active: true,
        });
      }

      if (contentType === 'video') {
        await api.createVideo({
          title: values.title,
          description: values.description,
          video_url: values.video_url,
          duration: Number(values.duration || 0),
          age_group: values.age_group,
          category: values.category,
          thumbnail_url: values.thumbnail_url,
          content_preparation: values.content_preparation,
          execution: values.execution,
          is_active: true,
        });
      }

      if (contentType === 'article') {
        await api.createArticle({
          title: values.title,
          summary: values.summary,
          cover_image_url: values.cover_image_url,
          author_name: values.author_name,
          content_blocks: values.content_blocks,
          category: values.category,
          age_group: values.age_group,
          reading_time: Number(values.reading_time || 5),
          content_preparation: values.content_preparation,
          execution: values.execution,
        });
      }

      if (contentType === 'parent_tip') {
        await api.createParentTip({
          title: values.title,
          summary: values.summary,
          content: values.content,
          author_name: values.author_name,
          cover_image_url: values.cover_image_url,
          category: values.category,
          content_preparation: values.content_preparation,
          execution: values.execution,
          is_active: true,
        });
      }

      if (contentType === 'infographic') {
        await api.createInfographic({
          title: values.title,
          author_name: values.author_name,
          description: values.description,
          content: values.content,
          image_url: values.image_url,
          category: values.category,
          age_group: values.age_group,
          content_preparation: values.content_preparation,
          execution: values.execution,
          is_active: true,
        });
      }

      setMessage('تم رفع المحتوى بنجاح!');
      setValues(emptyValues);
    } catch (err: any) {
      console.error('Submission error:', err);
      let details = '';
      if (err?.message) details = ` (${err.message})`;
      setError(`فشل رفع المحتوى${details}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: 'story', label: 'قصة', icon: BookOpen, color: 'bg-green-100 text-green-700' },
    { id: 'video', label: 'فيديو', icon: VideoIcon, color: 'bg-blue-100 text-blue-700' },
    { id: 'article', label: 'مقال', icon: FileText, color: 'bg-purple-100 text-purple-700' },
    { id: 'parent_tip', label: 'نصائح الأهل', icon: Lightbulb, color: 'bg-amber-100 text-amber-700' },
    { id: 'infographic', label: 'إنفوجرافيك', icon: BarChart3, color: 'bg-indigo-100 text-indigo-700' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pb-32 pt-8 sm:px-6">
      {/* Header Card */}
      <div className="relative overflow-hidden mb-10 p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 blur-3xl"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-800 mb-2">لوحة الإدارة</h1>
            <p className="text-slate-500 font-medium">بوابة إدارة محتوى منصة TEN الذكية</p>
          </div>
          {isLoggedIn && (
            <button onClick={onLogout} className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors">
              <LogOut size={18} /> خروج
            </button>
          )}
        </div>
      </div>

      {!isLoggedIn ? (
        <form onSubmit={onLogin} className="max-w-md mx-auto space-y-6 p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-sky-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <User size={40} className="text-sky-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">تسجيل الدخول</h2>
            <p className="text-slate-400 font-bold">يرجى إدخال بيانات الأدمن للمتابعة</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 mr-2">اسم المستخدم</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="أدخل اسم المستخدم"
                className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none focus:border-sky-400 focus:bg-white transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 mr-2">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none focus:border-sky-400 focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-sky-600 px-6 py-4 text-base font-black text-white shadow-lg shadow-sky-200 hover:bg-sky-700 hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-60"
          >
            {isSubmitting ? 'جاري التحقق...' : 'دخول للوحة التحكم'}
          </button>
          
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 text-red-600 border border-red-100 animate-shake">
              <AlertCircle size={20} />
              <p className="text-sm font-bold">{error}</p>
            </div>
          )}
        </form>
      ) : (
        <div className="space-y-8">
          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setContentType(tab.id as ContentType)} 
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black whitespace-nowrap transition-all ${
                  contentType === tab.id 
                  ? 'bg-slate-800 text-white shadow-xl -translate-y-1' 
                  : 'bg-white border border-slate-100 text-slate-500 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Form */}
          <form onSubmit={onSubmitContent} className="space-y-8 animate-fade-in">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm space-y-8">
              <div className="flex items-center gap-4 mb-2">
                <div className={`p-3 rounded-2xl ${tabs.find(t => t.id === contentType)?.color}`}>
                  {React.createElement(tabs.find(t => t.id === contentType)?.icon || Layout, { size: 24 })}
                </div>
                <h3 className="text-2xl font-black text-slate-800">{title}</h3>
              </div>

              {/* Basic Fields Section */}
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 mb-2 mr-2 uppercase tracking-widest">العنوان</label>
                  <input
                    value={values.title}
                    onChange={(e) => updateValue('title', e.target.value)}
                    placeholder="مثال: كيف تحمي نفسك من التنمر؟"
                    className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none focus:border-sky-400 focus:bg-white transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-2 mr-2 uppercase tracking-widest">التصنيف</label>
                    {contentType === 'parent_tip' ? (
                      <select
                        value={values.category}
                        onChange={(e) => updateValue('category', e.target.value)}
                        className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none focus:border-sky-400 focus:bg-white transition-all"
                        required
                      >
                        {PARENT_TIP_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                      </select>
                    ) : contentType === 'infographic' ? (
                      <select
                        value={values.category}
                        onChange={(e) => updateValue('category', e.target.value)}
                        className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none focus:border-sky-400 focus:bg-white transition-all"
                        required
                      >
                        {INFOGRAPHIC_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                      </select>
                    ) : contentType === 'video' ? (
                      <select
                        value={values.category}
                        onChange={(e) => updateValue('category', e.target.value)}
                        className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none focus:border-sky-400 focus:bg-white transition-all"
                        required
                      >
                        <option value="awareness">فيديوهات توعوية</option>
                        <option value="activities">أنشطة وتحديات</option>
                        <option value="quick_info">معلومات سريعة</option>
                        <option value="reports">تقارير ميدانية</option>
                      </select>
                    ) : contentType === 'article' ? (
                      <select
                        value={values.category}
                        onChange={(e) => updateValue('category', e.target.value)}
                        className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none focus:border-sky-400 focus:bg-white transition-all"
                        required
                      >
                        <option value="awareness">مقال توعوي</option>
                        <option value="visual">مقال مصور</option>
                        <option value="tips">نصائح رقمية</option>
                        <option value="health">صحة رقمية</option>
                        <option value="safety">أمان رقمي</option>
                      </select>
                    ) : (
                      <input 
                        value={values.category} 
                        onChange={(e) => updateValue('category', e.target.value)}
                        className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none focus:border-sky-400 focus:bg-white transition-all"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-2 mr-2 uppercase tracking-widest">
                      {contentType === 'parent_tip' || contentType === 'infographic' || contentType === 'article' ? 'الكاتب' : 'المؤلف'}
                    </label>
                    <input
                      value={contentType === 'article' || contentType === 'parent_tip' || contentType === 'infographic' ? values.author_name : values.author}
                      onChange={(e) => updateValue(contentType === 'article' || contentType === 'parent_tip' || contentType === 'infographic' ? 'author_name' : 'author', e.target.value)}
                      placeholder="اسم الكاتب أو صاحب المحتوى"
                      className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none focus:border-sky-400 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 mb-2 mr-2 uppercase tracking-widest">وصف قصير / ملخص</label>
                  <textarea
                    value={contentType === 'story' || contentType === 'article' || contentType === 'parent_tip' ? values.summary : values.description}
                    onChange={(e) => updateValue(contentType === 'story' || contentType === 'article' || contentType === 'parent_tip' ? 'summary' : 'description', e.target.value)}
                    placeholder="اكتب وصفاً موجزاً لجذب المتابعين..."
                    rows={2}
                    className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none focus:border-sky-400 focus:bg-white transition-all"
                    required
                  />
                </div>

                {/* Main Content Area */}
                {contentType !== 'video' && contentType !== 'article' && (
                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-2 mr-2 uppercase tracking-widest">المحتوى</label>
                    <textarea
                      value={values.content}
                      onChange={(e) => updateValue('content', e.target.value)}
                      placeholder="اكتب المحتوى الكامل هنا..."
                      rows={8}
                      className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none focus:border-sky-400 focus:bg-white transition-all"
                      required={contentType !== 'video'}
                    />
                  </div>
                )}

                {/* Article Specific: Blocks Editor */}
                {contentType === 'article' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">مكونات المقال</label>
                      <button 
                        type="button"
                        onClick={() => updateValue('content_blocks', [...values.content_blocks, { type: 'paragraph', content: '' }])}
                        className="flex items-center gap-2 text-xs font-black text-sky-600 hover:text-sky-700 transition-colors"
                      >
                        <Plus size={16} /> إضافة فقرة جديدة
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {values.content_blocks.map((block: any, idx: number) => (
                        <div key={idx} className="group relative bg-slate-50/50 rounded-2xl p-6 border-2 border-transparent hover:border-slate-100 hover:bg-white transition-all">
                          <button 
                            type="button"
                            onClick={() => {
                              const newBlocks = [...values.content_blocks];
                              newBlocks.splice(idx, 1);
                              updateValue('content_blocks', newBlocks);
                            }}
                            className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                          
                          <div className="flex items-center gap-4 mb-4">
                            <select 
                              value={block.type}
                              onChange={(e) => {
                                const newBlocks = [...values.content_blocks];
                                newBlocks[idx].type = e.target.value;
                                updateValue('content_blocks', newBlocks);
                              }}
                              className="bg-white border-2 border-slate-100 rounded-xl px-4 py-2 text-xs font-black text-slate-600"
                            >
                              <option value="paragraph">فقرة</option>
                              <option value="heading">عنوان فرعي</option>
                              <option value="quote">اقتباس</option>
                              <option value="image">صورة</option>
                            </select>
                          </div>

                          <textarea
                            value={block.content}
                            onChange={(e) => {
                              const newBlocks = [...values.content_blocks];
                              newBlocks[idx].content = e.target.value;
                              updateValue('content_blocks', newBlocks);
                            }}
                            placeholder={block.type === 'image' ? "رابط الصورة" : "اكتب هنا..."}
                            rows={block.type === 'paragraph' ? 4 : 1}
                            className="w-full bg-white border-2 border-slate-100 rounded-xl px-5 py-3 text-sm font-bold outline-none focus:border-sky-400 transition-all"
                          />
                          
                          {block.type === 'image' && (
                            <input 
                              value={block.caption || ''}
                              onChange={(e) => {
                                const newBlocks = [...values.content_blocks];
                                newBlocks[idx].caption = e.target.value;
                                updateValue('content_blocks', newBlocks);
                              }}
                              placeholder="وصف الصورة (اختياري)"
                              className="w-full mt-3 bg-white border-2 border-slate-100 rounded-xl px-5 py-3 text-xs font-bold"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Media Links Section */}
                <div className="pt-4 border-t border-slate-50">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                      <div className="space-y-6">
                        {/* Dynamic Media Input */}
                        {(contentType === 'video') && (
                          <div>
                            <label className="block text-xs font-black text-slate-400 mb-2 mr-2 uppercase tracking-widest">رابط الفيديو</label>
                            <div className="relative">
                              <Play size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" />
                              <input
                                value={values.video_url}
                                onChange={(e) => updateValue('video_url', e.target.value)}
                                placeholder="https://..."
                                className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 pr-12 pl-6 py-4 text-sm font-bold outline-none focus:border-sky-400 focus:bg-white transition-all"
                                required
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-black text-slate-400 mb-2 mr-2 uppercase tracking-widest">رابط الصورة الرئيسية</label>
                          <div className="relative">
                            <ImageIcon size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                              value={contentType === 'article' || contentType === 'parent_tip' ? values.cover_image_url : contentType === 'video' ? values.thumbnail_url : values.image_url}
                              onChange={(e) => updateValue(contentType === 'article' || contentType === 'parent_tip' ? 'cover_image_url' : contentType === 'video' ? 'thumbnail_url' : 'image_url', e.target.value)}
                              placeholder="https://..."
                              className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 pr-12 pl-6 py-4 text-sm font-bold outline-none focus:border-sky-400 focus:bg-white transition-all"
                              required={contentType === 'video' || contentType === 'infographic'}
                            />
                          </div>
                        </div>

                        {/* Extra Details Row */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-black text-slate-400 mb-2 mr-2 uppercase tracking-widest">الفئة العمرية</label>
                            <input
                              value={values.age_group}
                              onChange={(e) => updateValue('age_group', e.target.value)}
                              placeholder="8-12"
                              className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none focus:border-sky-400 focus:bg-white transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-black text-slate-400 mb-2 mr-2 uppercase tracking-widest">
                              {contentType === 'story' || contentType === 'article' ? 'وقت القراءة (دق)' : contentType === 'video' ? 'المدة (ث)' : 'الترتيب'}
                            </label>
                            <input
                              type="number"
                              value={contentType === 'video' ? values.duration : values.reading_time}
                              onChange={(e) => updateValue(contentType === 'video' ? 'duration' : 'reading_time', e.target.value)}
                              placeholder="0"
                              className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none focus:border-sky-400 focus:bg-white transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Image Preview Area */}
                      <div className="h-full">
                        <label className="block text-xs font-black text-slate-400 mb-2 mr-2 uppercase tracking-widest">معاينة الغلاف</label>
                        <div className="aspect-video sm:aspect-square w-full rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center group">
                          {(contentType === 'article' || contentType === 'parent_tip' ? values.cover_image_url : contentType === 'video' ? values.thumbnail_url : values.image_url) ? (
                            <img 
                              src={contentType === 'article' || contentType === 'parent_tip' ? values.cover_image_url : contentType === 'video' ? values.thumbnail_url : values.image_url} 
                              alt="Preview" 
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                          ) : (
                            <div className="text-center p-6">
                              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-3 text-slate-300">
                                <ImageIcon size={32} />
                              </div>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">بانتظار الرابط...</p>
                            </div>
                          )}
                        </div>
                      </div>
                   </div>
                </div>

                {/* Footer Section: Metadata */}
                <div className="pt-8 border-t border-slate-50 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-2 mr-2 uppercase tracking-widest">إعداد المحتوى</label>
                    <input
                      value={values.content_preparation}
                      onChange={(e) => updateValue('content_preparation', e.target.value)}
                      placeholder="أسماء الطلاب أو الفريق"
                      className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none focus:border-sky-400 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-2 mr-2 uppercase tracking-widest">التنفيذ والإخراج</label>
                    <input
                      value={values.execution}
                      onChange={(e) => updateValue('execution', e.target.value)}
                      placeholder="أسماء الطلاب أو الفريق"
                      className="w-full rounded-2xl border-2 border-slate-50 bg-slate-50 px-6 py-4 text-sm font-bold outline-none focus:border-sky-400 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full overflow-hidden rounded-[2rem] bg-emerald-600 px-8 py-6 text-xl font-black text-white shadow-xl shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-60 disabled:pointer-events-none"
              >
                <div className="flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>جاري الرفع...</span>
                    </>
                  ) : (
                    <>
                      <span>{title}</span>
                      <CheckCircle2 size={24} className="group-hover:translate-x-[-4px] transition-transform" />
                    </>
                  )}
                </div>
              </button>

              {message && (
                <div className="flex items-center gap-3 p-5 rounded-[2rem] bg-emerald-50 text-emerald-700 border border-emerald-100 animate-bounce-in">
                  <CheckCircle2 size={24} />
                  <p className="text-base font-black">{message}</p>
                </div>
              )}
              
              {error && (
                <div className="flex items-center gap-3 p-5 rounded-[2rem] bg-red-50 text-red-600 border border-red-100 animate-shake">
                  <AlertCircle size={24} />
                  <p className="text-base font-black">{error}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
