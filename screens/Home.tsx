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
   return (
    <div className="space-y-10 pb-32 pt-2">
      {/* --- HERO SECTION (Simplified & Editorial) --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden rounded-[2rem] bg-white border border-slate-100 p-6 md:p-10 shadow-sm mx-4"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black mb-4 uppercase tracking-wider">
              <ShieldCheck size={14} /> منصة TEN الرقمية
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight text-slate-900">
              نتعلم ونستمتع <span className="text-blue-600">بأمان</span>
            </h1>
            
            <p className="text-sm md:text-base text-slate-500 mb-8 leading-relaxed font-medium max-w-md">
              بوابتكم لعالم من القصص والفيديوهات والمقالات التعليمية التي تضمن رحلة رقمية صحية وآمنة لأطفالكم.
            </p>
            
            <button 
              onClick={() => onChangeTab(Tab.STORIES)}
              className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-blue-600 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
            >
              استكشف المحتوى
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="relative w-48 h-48 md:w-80 md:h-80 flex-shrink-0">
             <div className="w-full h-full rounded-[2.5rem] bg-slate-50 border border-slate-100 overflow-hidden shadow-inner flex items-center justify-center">
                <img 
                  src="https://picsum.photos/600/600?random=115" 
                  alt="Child using tablet safely" 
                  className="w-full h-full object-cover mix-blend-multiply opacity-90"
                />
             </div>
             <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-2xl shadow-xl border border-slate-50">
                <Sparkles size={20} className="text-yellow-500" />
             </div>
          </div>
        </div>
      </motion.div>

      {/* --- CATEGORY CARDS (Smaller & Cleaner) --- */}
      <div className="px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => onChangeTab(cat.id)}
            className="group flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all text-right"
          >
            <div className={`p-2.5 rounded-xl shadow-sm ${cat.color.replace('bg-', 'bg-opacity-10 bg-')}`}>
              <cat.icon size={20} />
            </div>
            <span className="font-bold text-slate-700 text-xs md:text-sm">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* --- STORIES SECTION (Editorial List) --- */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
             <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
             أحدث القصص
          </h3>
          <button 
            onClick={() => onChangeTab(Tab.STORIES)} 
            className="text-slate-400 hover:text-blue-600 transition-all flex items-center gap-1 font-bold text-xs"
          >
             شاهد الكل <ChevronLeft size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, idx) => (
            <motion.div 
              key={story.id} 
              className="group cursor-pointer"
              onClick={() => onChangeTab(Tab.STORIES)}
            >
              <div className="relative h-40 overflow-hidden rounded-2xl mb-4 border border-slate-100">
                <img src={story.image} alt={story.title} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <h4 className="font-black text-slate-800 mb-1 text-base text-right">{story.title}</h4>
              <p className="text-slate-500 font-medium text-[11px] leading-relaxed text-right line-clamp-2">{story.excerpt}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- ARTICLES (Magazine Style) --- */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
             <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
             مقالات مختارة
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map(article => (
            <div 
              key={article.id} 
              onClick={() => onChangeTab(Tab.ARTICLES)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 flex gap-4 p-4 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <img src={article.coverImageUrl} className="w-20 h-20 object-cover rounded-xl flex-shrink-0" alt={article.title} />
              <div className="flex flex-col justify-center text-right flex-1">
                <span className="text-[9px] font-black text-blue-500 uppercase mb-1 tracking-wider">{article.category}</span>
                <h4 className="font-black text-slate-800 text-sm line-clamp-1 mb-1">{article.title}</h4>
                <p className="text-[10px] text-slate-400 font-medium line-clamp-1 italic">{article.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- VIDEOS (Compact Grid) --- */}
      <div className="px-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
             <div className="w-1.5 h-6 bg-red-500 rounded-full"></div>
             فيديوهات TEN
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {videos.map(video => (
              <div 
                key={video.id} 
                className="group cursor-pointer"
                onClick={() => onChangeTab(Tab.VIDEOS)}
              >
                <div className="relative h-28 overflow-hidden rounded-xl border border-slate-100">
                  <img src={video.thumbnail} className="w-full h-full object-cover" alt={video.title} />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                    <div className="bg-white/90 p-2 rounded-full shadow-lg scale-90">
                       <Play size={16} className="text-slate-900 fill-slate-900 ml-0.5" />
                    </div>
                  </div>
                </div>
                <h4 className="text-xs font-black text-slate-700 mt-2 text-right line-clamp-1">{video.title}</h4>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};
