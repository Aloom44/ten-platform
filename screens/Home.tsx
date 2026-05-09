import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  ChevronLeft, 
  BookOpen, 
  Video as VideoIcon, 
  Newspaper, 
  BarChart3, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MousePointer2
} from 'lucide-react';
import { Tab, Story, Video, Article } from '../types';
import { api } from '../services/api';

interface HomeProps {
  onChangeTab: (tab: Tab) => void;
}

export const Home: React.FC<HomeProps> = ({ onChangeTab }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        const [storiesData, videosData, articlesData] = await Promise.all([
          api.getStories(),
          api.getVideos(),
          api.getArticles(),
        ]);
        setStories(storiesData.slice(0, 3));
        setVideos(videosData.slice(0, 4));
        setArticles(articlesData.slice(0, 2));
      } catch (error) {
        console.error('Failed to load home data', error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const categories = [
    { id: Tab.STORIES, label: 'قصص ممتعة', icon: BookOpen, color: 'bg-orange-50 text-orange-600 border-orange-100', shadow: 'shadow-orange-100' },
    { id: Tab.VIDEOS, label: 'فيديوهات ألوان', icon: VideoIcon, color: 'bg-red-50 text-red-600 border-red-100', shadow: 'shadow-red-100' },
    { id: Tab.INFOGRAPHICS, label: 'إنفوجرافيك', icon: BarChart3, color: 'bg-indigo-50 text-indigo-600 border-indigo-100', shadow: 'shadow-indigo-100' },
    { id: Tab.ARTICLES, label: 'مقالات مفيدة', icon: Newspaper, color: 'bg-blue-50 text-blue-600 border-blue-100', shadow: 'shadow-blue-100' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-12 pb-32 pt-4">
      {/* --- HERO SECTION --- */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 text-white p-8 md:p-16 shadow-2xl shadow-blue-200 mx-4"
      >
        {/* Floating Decorative Elements */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full backdrop-blur-md border border-white/20 hidden md:block"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl"
        />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl text-center md:text-right">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-sm font-black mb-6"
            >
              <ShieldCheck size={18} className="text-yellow-300" /> بطل TEN الذكي
            </motion.div>
            
            <h1 className="text-4xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
              نتعلم ونستمتع <br/> <span className="text-yellow-300 italic">بأمان 💙</span>
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed font-bold max-w-lg">
              قصص وفيديوهات ومقالات ممتعة تساعد الأطفال على استخدام التكنولوجيا بشكل صحي وآمن.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => onChangeTab(Tab.STORIES)}
                className="group bg-white text-blue-600 px-10 py-5 rounded-[1.5rem] font-black shadow-xl shadow-blue-900/20 hover:bg-yellow-300 hover:text-blue-900 active:scale-95 transition-all flex items-center justify-center gap-3 text-lg"
              >
                استكشف المحتوى
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative w-64 h-64 md:w-[450px] md:h-[450px]"
          >
             {/* Main Illustration Placeholder */}
             <div className="w-full h-full rounded-[4rem] bg-white/10 backdrop-blur-md border-2 border-white/20 flex items-center justify-center p-8 overflow-hidden relative group">
                <img 
                  src="https://picsum.photos/800/800?random=115" 
                  alt="Child using tablet safely" 
                  className="w-full h-full object-cover rounded-[3rem] transition-transform group-hover:scale-105 duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
                <div className="absolute bottom-6 right-6 left-6 bg-white/90 backdrop-blur-lg p-4 rounded-3xl border border-white flex items-center gap-3 shadow-2xl">
                   <div className="bg-emerald-500 p-2 rounded-full text-white">
                      <ShieldCheck size={20} />
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">تصفح آمن</p>
                      <p className="text-xs font-black text-slate-800">بيئة محمية بالكامل 🛡️</p>
                   </div>
                </div>
             </div>
             {/* Floating Icon */}
             <motion.div 
               animate={{ y: [-10, 10, -10] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="absolute -top-4 -left-4 bg-yellow-400 p-4 rounded-3xl shadow-xl rotate-12"
             >
                <Sparkles size={24} className="text-white" />
             </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* --- CATEGORY CARDS --- */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {categories.map((cat) => (
          <motion.button 
            key={cat.id}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => onChangeTab(cat.id)}
            className={`relative overflow-hidden group p-6 rounded-[2.5rem] border-2 flex flex-col items-center gap-4 transition-all shadow-lg ${cat.color} ${cat.shadow}`}
          >
            <div className="bg-white p-5 rounded-[1.8rem] shadow-sm group-hover:scale-110 transition-transform">
              <cat.icon size={32} />
            </div>
            <span className="font-black text-lg">{cat.label}</span>
            {/* Glass decoration */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:scale-150 transition-transform"></div>
          </motion.button>
        ))}
      </motion.div>

      {/* --- STORIES SECTION --- */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-8 pr-2">
          <h3 className="text-3xl font-black text-slate-900 flex items-center gap-3">
             <BookOpen className="text-orange-500" size={32} />
             أحدث القصص
          </h3>
          <button 
            onClick={() => onChangeTab(Tab.STORIES)} 
            className="group bg-slate-100 hover:bg-slate-200 p-3 rounded-2xl text-slate-500 hover:text-slate-900 transition-all flex items-center gap-2 font-black text-sm"
          >
             المزيد <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="bg-slate-50 h-64 rounded-[3rem] animate-pulse"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story, idx) => (
              <motion.div 
                key={story.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white p-5 rounded-[3rem] shadow-sm border border-slate-50 hover:shadow-2xl transition-all cursor-pointer"
                onClick={() => onChangeTab(Tab.STORIES)}
              >
                <div className="relative h-48 overflow-hidden rounded-[2rem] mb-6">
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black text-slate-800 shadow-sm">
                     قراءة 5 دق
                  </div>
                </div>
                <h4 className="font-black text-slate-800 mb-2 text-xl pr-2">{story.title}</h4>
                <p className="text-slate-500 font-bold text-sm leading-relaxed pr-2 line-clamp-2 italic">{story.excerpt}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* --- ARTICLES PREVIEW --- */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-8 pr-2">
          <h3 className="text-3xl font-black text-slate-900 flex items-center gap-3">
             <Newspaper className="text-blue-500" size={32} />
             مقالات مختارة
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.length > 0 ? articles.map(article => (
            <motion.div 
              key={article.id} 
              whileHover={{ x: -10 }}
              onClick={() => onChangeTab(Tab.ARTICLES)}
              className="bg-white rounded-[3rem] overflow-hidden shadow-sm border border-slate-50 flex gap-6 p-5 hover:shadow-2xl transition-all cursor-pointer"
            >
              <img src={article.coverImageUrl} className="w-28 h-28 object-cover rounded-[2rem] flex-shrink-0 shadow-lg" alt={article.title} />
              <div className="flex flex-col justify-center text-right flex-1">
                <span className="text-[10px] font-black text-blue-500 uppercase mb-2 tracking-widest">{article.category}</span>
                <h4 className="font-black text-slate-800 text-lg line-clamp-1 mb-2">{article.title}</h4>
                <p className="text-xs text-slate-500 font-bold leading-relaxed line-clamp-2">{article.summary}</p>
              </div>
            </motion.div>
          )) : (
            <div 
              onClick={() => onChangeTab(Tab.ARTICLES)}
              className="col-span-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center justify-between cursor-pointer hover:shadow-2xl active:scale-[0.98] transition-all overflow-hidden relative"
            >
              <div className="relative z-10 text-center md:text-right">
                <h3 className="text-4xl font-black mb-4 flex items-center justify-center md:justify-start gap-3">
                   اكتشف عالم المعرفة! <MousePointer2 size={32} />
                </h3>
                <p className="text-blue-100 text-lg font-bold">اقرأ مقالاتنا الجديدة حول الأمان الرقمي والاستخدام الصحي للجوال.</p>
              </div>
              <div className="relative z-10 bg-white/20 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 rotate-6 shadow-2xl mt-8 md:mt-0">
                 <span className="text-7xl">📚</span>
              </div>
              {/* Decoration */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-20 -translate-y-20 blur-3xl"></div>
            </div>
          )}
        </div>
      </div>

      {/* --- VIDEOS PREVIEW --- */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-8 pr-2">
          <h3 className="text-3xl font-black text-slate-900 flex items-center gap-3">
             <VideoIcon className="text-red-500" size={32} />
             فيديوهات TEN
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {videos.map(video => (
              <motion.div 
                key={video.id} 
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-[2.5rem] p-3 shadow-sm border border-slate-50 hover:shadow-2xl transition-all cursor-pointer group"
                onClick={() => onChangeTab(Tab.VIDEOS)}
              >
                <div className="relative h-32 md:h-40 overflow-hidden rounded-[2rem]">
                  <img src={video.thumbnail} className="w-full h-full object-cover" alt={video.title} />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="bg-white/95 p-3 rounded-full shadow-2xl scale-90 group-hover:scale-110 transition-transform">
                       <Play size={24} className="text-slate-900 fill-slate-900 ml-1" />
                    </div>
                  </div>
                </div>
                <h4 className="text-base font-black text-slate-700 mt-4 px-2 line-clamp-1 text-right">{video.title}</h4>
                {video.contentPreparation && (
                  <div className="flex items-center justify-end gap-2 px-2 mt-2">
                     <span className="text-[10px] text-slate-400 font-bold italic">بإشراف: {video.contentPreparation}</span>
                  </div>
                )}
              </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
};
