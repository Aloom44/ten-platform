import React, { useMemo, useState } from 'react';
import { api } from '../services/api';

type ContentType = 'story' | 'video' | 'article' | 'podcast' | 'parent_tip' | 'infographic';

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
  game_type: 'educational',
  game_url: '',
  audio_url: '',
  host: '',
  content_preparation: '',
  execution: '',
  goal: '',
  daily_tip: '',
  cover_image_url: '',
  author_name: '',
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
      case 'story':
        return 'رفع قصة جديدة';
      case 'video':
        return 'رفع فيديو جديد';
      case 'article':
        return 'رفع مقال جديد';
      case 'podcast':
        return 'رفع بودكاست جديد';
      case 'parent_tip':
        return 'إضافة نصيحة لأولياء الأمور';
      case 'infographic':
        return 'إضافة إنفوجرافيك جديد';
      default:
        return 'رفع محتوى';
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

  const updateValue = (name: string, value: string) => {
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

      if (contentType === 'podcast') {
        await api.createPodcast({
          title: values.title,
          description: values.description,
          audio_url: values.audio_url,
          duration: Number(values.duration || 0),
          age_group: values.age_group,
          category: values.category,
          host: values.host,
          content_preparation: values.content_preparation,
          execution: values.execution,
          is_active: true,
        });
      }

      if (contentType === 'parent_tip') {
        await api.createParentTip({
          title: values.title,
          content: values.content,
          category: values.category,
          content_preparation: values.content_preparation,
          execution: values.execution,
          is_active: true,
        });
      }

      if (contentType === 'infographic') {
        await api.createInfographic({
          title: values.title,
          description: values.description,
          category: values.category,
          age_group: values.age_group,
          content_preparation: values.content_preparation,
          execution: values.execution,
          is_active: true,
        });
      }

      setMessage('تم رفع المحتوى بنجاح.');
      setValues((prev) => ({
        ...prev,
        title: '',
        summary: '',
        content: '',
        description: '',
        video_url: '',
        game_url: '',
        audio_url: '',
        author: '',
        author_name: '',
        host: '',
        content_preparation: '',
        execution: '',
        content_blocks: [],
        cover_image_url: '',
      }));
    } catch (err: any) {
      const details = err?.message ? ` (${err.message})` : '';
      setError(`فشل رفع المحتوى${details}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 pb-28 pt-4 sm:px-6">
      <div className="mb-6 rounded-3xl border border-sky-200 bg-gradient-to-r from-sky-100 to-cyan-100 p-6">
        <h2 className="mb-2 text-2xl font-black text-sky-900">لوحة إدارة المحتوى</h2>
        <p className="text-sm font-medium text-sky-700">
          من هنا تقدر ترفع المحتوى مباشرة على الباك إند بدون الدخول للوحة Django.
        </p>
      </div>

      {!isLoggedIn ? (
        <form onSubmit={onLogin} className="mx-auto max-w-lg space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-black text-slate-800">تسجيل دخول الأدمن</h3>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="اسم المستخدم"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-sky-700 disabled:opacity-60"
          >
            {isSubmitting ? 'جاري تسجيل الدخول...' : 'دخول'}
          </button>
          {error && <p className="text-sm font-bold text-red-600">{error}</p>}
          {message && <p className="text-sm font-bold text-emerald-600">{message}</p>}
        </form>
      ) : (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-sm font-bold text-emerald-700">مسجل دخول كأدمن</p>
            <button onClick={onLogout} className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm">
              تسجيل الخروج
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <button onClick={() => setContentType('story')} className={`rounded-xl px-3 py-2 text-sm font-bold ${contentType === 'story' ? 'bg-sky-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>قصة</button>
            <button onClick={() => setContentType('video')} className={`rounded-xl px-3 py-2 text-sm font-bold ${contentType === 'video' ? 'bg-sky-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>فيديو</button>
            <button onClick={() => setContentType('article')} className={`rounded-xl px-3 py-2 text-sm font-bold ${contentType === 'article' ? 'bg-sky-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>مقال</button>
            <button onClick={() => setContentType('podcast')} className={`rounded-xl px-3 py-2 text-sm font-bold ${contentType === 'podcast' ? 'bg-sky-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>بودكاست</button>
            <button onClick={() => setContentType('parent_tip')} className={`rounded-xl px-3 py-2 text-sm font-bold ${contentType === 'parent_tip' ? 'bg-sky-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>نصائح الأهل</button>
            <button onClick={() => setContentType('infographic')} className={`rounded-xl px-3 py-2 text-sm font-bold ${contentType === 'infographic' ? 'bg-sky-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>إنفوجرافيك</button>
          </div>

          <form onSubmit={onSubmitContent} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-black text-slate-800">{title}</h3>

            <input
              value={values.title}
              onChange={(e) => updateValue('title', e.target.value)}
              placeholder="العنوان"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
              required
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                value={values.content_preparation}
                onChange={(e) => updateValue('content_preparation', e.target.value)}
                placeholder="إعداد المحتوى (أسماء الطلاب)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
              />
              <input
                value={values.execution}
                onChange={(e) => updateValue('execution', e.target.value)}
                placeholder="تنفيذ (أسماء الطلاب)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <input
                value={values.age_group}
                onChange={(e) => updateValue('age_group', e.target.value)}
                placeholder="الفئة العمرية (مثال 8-12)"
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                required
              />

              {contentType === 'story' && (
                <select
                  value={values.difficulty}
                  onChange={(e) => updateValue('difficulty', e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                >
                  <option value="easy">سهل</option>
                  <option value="medium">متوسط</option>
                  <option value="hard">صعب</option>
                </select>
              )}

              {contentType === 'article' && (
                <select
                  value={values.category}
                  onChange={(e) => updateValue('category', e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                  required
                >
                  <option value="awareness">مقال توعوي</option>
                  <option value="visual">مقال مصور</option>
                  <option value="tips">نصائح رقمية</option>
                  <option value="health">صحة رقمية</option>
                  <option value="safety">أمان رقمي</option>
                </select>
              )}

              {contentType === 'game' && (
                <select
                  value={values.game_type}
                  onChange={(e) => updateValue('game_type', e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                >
                  <option value="educational">تعليمي</option>
                  <option value="puzzle">ألغاز</option>
                  <option value="memory">ذاكرة</option>
                  <option value="multiplayer">متعدد</option>
                  <option value="quiz">اختبار</option>
                </select>
              )}

              {contentType === 'video' && (
                <input
                  value={values.thumbnail_url}
                  onChange={(e) => updateValue('thumbnail_url', e.target.value)}
                  placeholder="رابط الصورة المصغرة (اختياري)"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                />
              )}

              {contentType === 'video' && (
                <select
                  value={values.category}
                  onChange={(e) => updateValue('category', e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                  required
                >
                  <option value="awareness">فيديوهات توعوية</option>
                  <option value="activities">أنشطة وتحديات</option>
                  <option value="quick_info">معلومات سريعة</option>
                  <option value="reports">تقارير ميدانية</option>
                </select>
              )}

              {contentType === 'podcast' && (
                <input
                  value={values.category}
                  onChange={(e) => updateValue('category', e.target.value)}
                  placeholder="التصنيف"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                  required
                />
              )}

              {contentType === 'parent_tip' && (
                <select
                  value={values.category}
                  onChange={(e) => updateValue('category', e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                  required
                >
                  <option value="protection">حماية الأطفال من المحتوى غير المناسب</option>
                  <option value="screen_time">تنظيم وقت الشاشة</option>
                  <option value="digital_edu">التربية الرقمية</option>
                  <option value="online_safety">الأمان على الإنترنت</option>
                </select>
              )}

              {contentType === 'infographic' && (
                <select
                  value={values.category}
                  onChange={(e) => updateValue('category', e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                  required
                >
                  <option value="digital_awareness">توعية رقمية</option>
                  <option value="positive_behavior">سلوكيات إيجابية</option>
                  <option value="online_safety">الأمان على الإنترنت</option>
                  <option value="health_habits">الصحة والعادات</option>
                  <option value="quick_info">معلومات سريعة</option>
                </select>
              )}
            </div>

            {contentType === 'story' && (
              <>
                <textarea
                  value={values.summary}
                  onChange={(e) => updateValue('summary', e.target.value)}
                  placeholder="الملخص"
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                  required
                />
                <textarea
                  value={values.content}
                  onChange={(e) => updateValue('content', e.target.value)}
                  placeholder="المحتوى"
                  rows={6}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                  required
                />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    value={values.author}
                    onChange={(e) => updateValue('author', e.target.value)}
                    placeholder="اسم الكاتب"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                  />
                  <input
                    type="number"
                    min={1}
                    value={values.reading_time}
                    onChange={(e) => updateValue('reading_time', e.target.value)}
                    placeholder="وقت القراءة بالدقائق"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                    required
                  />
                </div>
                <input
                  value={values.image_url}
                  onChange={(e) => updateValue('image_url', e.target.value)}
                  placeholder="رابط الصورة (اختياري)"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                />
                <textarea
                  value={values.goal}
                  onChange={(e) => updateValue('goal', e.target.value)}
                  placeholder="هدف القصة"
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                />
                <textarea
                  value={values.daily_tip}
                  onChange={(e) => updateValue('daily_tip', e.target.value)}
                  placeholder="نصيحة اليوم"
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                />
              </>
            )}

            {(contentType === 'video' || contentType === 'podcast' || contentType === 'infographic') && (
              <textarea
                value={values.description}
                onChange={(e) => updateValue('description', e.target.value)}
                placeholder={contentType === 'infographic' ? "وصف قصير" : "الوصف"}
                rows={contentType === 'infographic' ? 3 : 5}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                required={contentType !== 'parent_tip'}
              />
            )}

            {contentType === 'article' && (
              <div className="space-y-4">
                <textarea
                  value={values.summary}
                  onChange={(e) => updateValue('summary', e.target.value)}
                  placeholder="ملخص المقال"
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                  required
                />
                <input
                  value={values.cover_image_url}
                  onChange={(e) => updateValue('cover_image_url', e.target.value)}
                  placeholder="رابط صورة الغلاف"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    value={values.author_name}
                    onChange={(e) => updateValue('author_name', e.target.value)}
                    placeholder="اسم الكاتب"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                  />
                  <input
                    type="number"
                    value={values.reading_time}
                    onChange={(e) => updateValue('reading_time', e.target.value)}
                    placeholder="مدة القراءة"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                  />
                </div>

                {/* Article Blocks Editor */}
                <div className="rounded-2xl border border-slate-200 p-4 space-y-3">
                  <h4 className="font-bold text-slate-700 text-sm">محتوى المقال (Blocks)</h4>
                  {values.content_blocks.map((block: any, idx: number) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-xl relative">
                      <button 
                        type="button"
                        onClick={() => {
                          const newBlocks = [...values.content_blocks];
                          newBlocks.splice(idx, 1);
                          setValues(prev => ({ ...prev, content_blocks: newBlocks }));
                        }}
                        className="absolute -top-2 -left-2 bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                      >
                        ×
                      </button>
                      <select 
                        value={block.type}
                        onChange={(e) => {
                          const newBlocks = [...values.content_blocks];
                          newBlocks[idx].type = e.target.value;
                          setValues(prev => ({ ...prev, content_blocks: newBlocks }));
                        }}
                        className="mb-2 w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold"
                      >
                        <option value="paragraph">فقرة</option>
                        <option value="heading">عنوان فرعي</option>
                        <option value="quote">اقتباس</option>
                        <option value="image">صورة داخلية</option>
                      </select>
                      <textarea
                        value={block.content}
                        onChange={(e) => {
                          const newBlocks = [...values.content_blocks];
                          newBlocks[idx].content = e.target.value;
                          setValues(prev => ({ ...prev, content_blocks: newBlocks }));
                        }}
                        placeholder={block.type === 'image' ? "رابط الصورة" : "المحتوى"}
                        rows={block.type === 'paragraph' ? 3 : 1}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs outline-none"
                      />
                      {block.type === 'image' && (
                        <input 
                          value={block.caption || ''}
                          onChange={(e) => {
                            const newBlocks = [...values.content_blocks];
                            newBlocks[idx].caption = e.target.value;
                            setValues(prev => ({ ...prev, content_blocks: newBlocks }));
                          }}
                          placeholder="وصف الصورة (Caption)"
                          className="w-full mt-2 bg-white border border-slate-200 rounded-lg p-2 text-[10px] font-bold"
                        />
                      )}
                    </div>
                  ))}
                  <button 
                    type="button"
                    onClick={() => {
                      setValues(prev => ({ 
                        ...prev, 
                        content_blocks: [...prev.content_blocks, { type: 'paragraph', content: '' }] 
                      }));
                    }}
                    className="w-full bg-slate-100 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                  >
                    + إضافة block جديد
                  </button>
                </div>
              </div>
            )}

            {contentType === 'video' && (
              <>
                <input
                  value={values.video_url}
                  onChange={(e) => updateValue('video_url', e.target.value)}
                  placeholder="رابط الفيديو"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                  required
                />
                <input
                  type="number"
                  min={1}
                  value={values.duration}
                  onChange={(e) => updateValue('duration', e.target.value)}
                  placeholder="المدة بالثواني"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                  required
                />
              </>
            )}

            {contentType === 'game' && (
              <input
                value={values.game_url}
                onChange={(e) => updateValue('game_url', e.target.value)}
                placeholder="رابط اللعبة (اختياري)"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
              />
            )}

            {contentType === 'podcast' && (
              <>
                <input
                  value={values.audio_url}
                  onChange={(e) => updateValue('audio_url', e.target.value)}
                  placeholder="رابط الصوت"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                  required
                />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    type="number"
                    min={1}
                    value={values.duration}
                    onChange={(e) => updateValue('duration', e.target.value)}
                    placeholder="المدة بالثواني"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                    required
                  />
                  <input
                    value={values.host}
                    onChange={(e) => updateValue('host', e.target.value)}
                    placeholder="مقدم الحلقة"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-sky-400"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:opacity-60"
            >
              {isSubmitting ? 'جاري الرفع...' : 'رفع المحتوى'}
            </button>

            {error && <p className="text-sm font-bold text-red-600">{error}</p>}
            {message && <p className="text-sm font-bold text-emerald-600">{message}</p>}
          </form>
        </div>
      )}
    </div>
  );
};
