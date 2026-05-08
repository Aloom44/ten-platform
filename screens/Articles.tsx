import React, { useEffect, useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  User, 
  ChevronRight, 
  Calendar, 
  BookOpen, 
  Star, 
  X, 
  Share2, 
  Bookmark,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import { Article, ArticleBlock } from '../types';

const CATEGORIES = [
  { id: 'all', label: 'الكل' },
  { id: 'awareness', label: 'مقال توعوي' },
  { id: 'visual', label: 'مقال مصور' },
  { id: 'tips', label: 'نصائح رقمية' },
  { id: 'health', label: 'صحة رقمية' },
  { id: 'safety', label: 'أمان رقمي' },
];

export const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await api.getArticles();
        setArticles(data);
      } catch (error) {
        console.error('Failed to load articles', error);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           article.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  const featuredArticle = useMemo(() => articles[0], [articles]);

  const handleModalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const newOpacity = Math.max(0, 1 - scrollTop / 300);
    setScrollOpacity(newOpacity);
  };

  const getCategoryLabel = (cat?: string) => {
    return CATEGORIES.find(c => c.id === cat)?.label || 'مقال';
  };

  const renderBlock = (block: ArticleBlock, index: number) => {
    switch (block.type) {
      case 'heading':
        return <h3 key={index} className="text-2xl font-black text-slate-800 mt-10 mb-6">{block.content}</h3>;
      case 'paragraph':
        return <p key={index} className="text-lg text-slate-600 leading-relaxed mb-6 font-medium">{block.content}</p>;
      case 'quote':
        return (
          <div key={index} className="relative my-10 p-8 bg-sky-50 rounded-[2rem] border-r-8 border-sky-400">
            <span className="absolute -top-4 -right-4 text-6xl text-sky-200 font-serif">"</span>
            <p className="text-xl font-bold text-sky-800 italic leading-relaxed">{block.content}</p>
          </div>
        );
      case 'image':
        return (
          <div key={index} className="my-8">
            <div className="rounded-[2.5rem] overflow-hidden shadow-lg">
              <img src={block.content} alt={block.caption} className="w-full h-auto object-cover" />
            </div>
            {block.caption && <p className="text-center text-sm text-slate-400 mt-4 font-bold">📸 {block.caption}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* Search & Filter Bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-5 py-4">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="relative group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="ابحث عن مقال..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100/50 border-none rounded-2xl py-4 pr-12 pl-4 text-sm font-bold focus:ring-2 focus:ring-sky-100 transition-all"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-xs font-black transition-all ${
                  selectedCategory === cat.id 
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-200 scale-105' 
                  : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 pt-8">
        {/* Featured Section */}
        {!searchQuery && selectedCategory === 'all' && featuredArticle && (
          <div 
            onClick={() => setSelectedArticle(featuredArticle)}
            className="relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl shadow-sky-100 mb-12 cursor-pointer group"
          >
            <img src={featuredArticle.coverImageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Featured" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
            
            <div className="absolute bottom-0 right-0 left-0 p-8 md:p-12 text-right">
              <span className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black mb-4 animate-bounce">
                <Star size={14} fill="currentColor" /> مقال مختار
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">{featuredArticle.title}</h2>
              <p className="text-white/80 text-sm md:text-lg font-medium line-clamp-2 max-w-2xl ml-auto mb-6">{featuredArticle.summary}</p>
              <div className="flex items-center justify-end gap-6 text-white/60 text-xs font-bold">
                <span className="flex items-center gap-2"><Clock size={16} /> {featuredArticle.readingTime} دقائق قراءة</span>
                <span className="flex items-center gap-2"><User size={16} /> {featuredArticle.authorName}</span>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredArticles.map(article => (
            <div 
              key={article.id} 
              onClick={() => setSelectedArticle(article)}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 cursor-pointer group"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={article.coverImageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={article.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-slate-800 shadow-xl">
                  {getCategoryLabel(article.category)}
                </span>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black mb-4 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {article.readingTime} دقائق</span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                  <span>{article.ageGroup}</span>
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-4 group-hover:text-sky-600 transition-colors">{article.title}</h3>
                <p className="text-slate-500 text-sm font-medium line-clamp-2 leading-relaxed mb-6">{article.summary}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                   <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-black text-xs">
                        {article.authorName?.charAt(0)}
                      </div>
                      <span className="text-xs font-black text-slate-600">{article.authorName}</span>
                   </div>
                   <ArrowRight size={20} className="text-sky-500 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty States */}
        {!loading && filteredArticles.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[4rem] border-4 border-dashed border-slate-100">
             <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={40} className="text-slate-200" />
             </div>
             <h3 className="text-2xl font-black text-slate-800 mb-2">لا توجد نتائج</h3>
             <p className="text-slate-400 font-bold">جرّب البحث بكلمات أخرى أو تغيير التصنيف.</p>
          </div>
        )}
      </div>

      {/* Modern Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl" onClick={() => setSelectedArticle(null)}></div>
          
          <div 
            onScroll={handleModalScroll}
            className="relative w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar bg-white"
          >
            {/* Sticky Hero Background */}
            <div 
              className="fixed top-0 left-0 w-full h-[50vh] z-0 pointer-events-none"
              style={{ opacity: scrollOpacity }}
            >
              <img src={selectedArticle.coverImageUrl} className="w-full h-full object-cover" alt="Hero" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white"></div>
            </div>

            {/* Modal Controls */}
            <div className="fixed top-6 right-6 z-[110] flex gap-3">
               <button className="bg-white/20 backdrop-blur-md text-white p-3 rounded-2xl hover:bg-white hover:text-slate-900 transition-all border border-white/20">
                  <Share2 size={24} />
               </button>
               <button className="bg-white/20 backdrop-blur-md text-white p-3 rounded-2xl hover:bg-white hover:text-slate-900 transition-all border border-white/20">
                  <Bookmark size={24} />
               </button>
               <button 
                onClick={() => setSelectedArticle(null)}
                className="bg-white text-slate-900 p-3 rounded-2xl shadow-2xl hover:bg-sky-500 hover:text-white transition-all active:scale-90"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Card Wrapper */}
            <div className="relative z-10 pt-[40vh] pb-24">
               <div className="bg-white rounded-t-[4rem] px-8 md:px-20 pt-16 pb-20 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.3)] min-h-[60vh] max-w-4xl mx-auto">
                  
                  {/* Article Metadata */}
                  <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-slate-400 font-bold text-xs uppercase tracking-widest">
                    <span className="flex items-center gap-2 text-sky-500 bg-sky-50 px-4 py-2 rounded-full">
                      <Star size={14} fill="currentColor" /> {getCategoryLabel(selectedArticle.category)}
                    </span>
                    <span className="flex items-center gap-2"><Clock size={16} /> {selectedArticle.readingTime} دقائق</span>
                    <span className="flex items-center gap-2"><Calendar size={16} /> {new Date(selectedArticle.publishedAt).toLocaleDateString('ar-EG')}</span>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 text-center mb-12 leading-[1.1]">
                    {selectedArticle.title}
                  </h1>

                  {/* Author Badge */}
                  <div className="flex items-center justify-center gap-4 mb-16 py-8 border-y border-slate-50">
                    <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-3xl flex items-center justify-center text-white text-2xl font-black shadow-lg">
                      {selectedArticle.authorName?.charAt(0)}
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-1">كاتب المقال</p>
                       <p className="text-xl font-black text-slate-800">✍️ {selectedArticle.authorName}</p>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-50 p-10 rounded-[3rem] mb-16 border border-slate-100">
                    <p className="text-xl text-slate-700 font-bold leading-relaxed text-center italic">
                      "{selectedArticle.summary}"
                    </p>
                  </div>

                  {/* Structured Blocks Rendering */}
                  <div className="article-content text-right" dir="rtl">
                    {selectedArticle.contentBlocks?.map((block, idx) => renderBlock(block, idx))}
                  </div>

                  {/* Footer Stats */}
                  <div className="mt-20 pt-12 border-t border-slate-100 grid grid-cols-2 gap-8">
                     <div className="bg-emerald-50 p-8 rounded-[2.5rem] text-center">
                        <p className="text-[10px] font-black text-emerald-600 uppercase mb-2">إعداد المحتوى</p>
                        <p className="text-lg font-black text-slate-800">{selectedArticle.contentPreparation || 'فريق TEN'}</p>
                     </div>
                     <div className="bg-purple-50 p-8 rounded-[2.5rem] text-center">
                        <p className="text-[10px] font-black text-purple-600 uppercase mb-2">التنفيذ</p>
                        <p className="text-lg font-black text-slate-800">{selectedArticle.execution || 'ألوان ميديا'}</p>
                     </div>
                  </div>

                  {/* Final CTA */}
                  <div className="mt-20 text-center">
                    <button 
                      onClick={() => setSelectedArticle(null)}
                      className="bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-black text-lg hover:bg-sky-600 transition-all shadow-xl hover:shadow-sky-200 active:scale-95"
                    >
                      لقد أتممت القراءة! 🚀
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
