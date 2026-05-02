
import React, { useEffect, useState } from 'react';
import { Play, Star, ChevronLeft, ShieldCheck, Headphones, Image as ImageIcon } from 'lucide-react';
import { Tab, Story, Video, Game } from '../types';
import { api } from '../services/api';

interface HomeProps {
  onChangeTab: (tab: Tab) => void;
}

export const Home: React.FC<HomeProps> = ({ onChangeTab }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        const [storiesData, videosData, gamesData] = await Promise.all([
          api.getStories(),
          api.getVideos(),
          api.getGames(),
        ]);
        setStories(storiesData.slice(0, 3));
        setVideos(videosData.slice(0, 4));
        setGames(gamesData.slice(0, 3));
      } catch (error) {
        console.error('Failed to load home data', error);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <div className="space-y-8 pb-24">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-400 to-teal-500 text-white p-6 md:p-8 shadow-lg shadow-emerald-200 mx-4 mt-4">
        <div className="relative z-10 max-w-xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs md:text-sm font-bold mb-3 border border-white/30 flex w-fit items-center gap-1">
             <ShieldCheck size={14} /> بطل الأمان
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight">عالمك الحقيقي<br/>أجمل وأحلى!</h2>
          <p className="opacity-90 mb-6 text-sm md:text-base max-w-md">تعلم كيف تحمي نفسك من الإنترنت وتستمتع بوقتك بعيداً عن الشاشات.</p>
          <button 
            onClick={() => onChangeTab(Tab.GAMES)}
            className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-xl active:scale-95 transition-all flex items-center gap-2 text-base"
          >
            <Play size={20} fill="currentColor" />
            ابدأ التحدي
          </button>
        </div>
        {/* Abstract Shapes Decoration */}
        <div className="absolute top-0 left-0 w-32 md:w-40 h-32 md:h-40 bg-white/10 rounded-full blur-2xl -translate-x-10 -translate-y-10"></div>
        <div className="absolute bottom-0 right-0 w-40 md:w-48 h-40 md:h-48 bg-yellow-300/20 rounded-full blur-2xl translate-x-10 translate-y-10"></div>
        <img src="https://picsum.photos/200/200?random=110" alt="Playing Outside" className="absolute -bottom-4 -right-4 md:-right-8 w-32 md:w-40 h-32 md:h-40 object-cover rounded-full border-4 border-white/30 shadow-xl grayscale-[20%]" />
      </div>

      {/* New Sections: Podcasts & Caricatures */}
      <div className="px-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <button 
          onClick={() => onChangeTab(Tab.PODCASTS)}
          className="bg-purple-100 p-4 md:p-6 rounded-2xl flex flex-col items-center gap-2 md:gap-3 shadow-sm border border-purple-200 hover:shadow-md active:scale-95 transition-all"
        >
          <div className="bg-white p-3 md:p-4 rounded-full shadow-sm text-purple-600">
            <Headphones size={28} className="md:w-8 md:h-8" />
          </div>
          <span className="font-bold text-purple-800 text-sm md:text-base">بودكاست</span>
        </button>
        <button 
          onClick={() => onChangeTab(Tab.CARICATURES)}
          className="bg-pink-100 p-4 md:p-6 rounded-2xl flex flex-col items-center gap-2 md:gap-3 shadow-sm border border-pink-200 hover:shadow-md active:scale-95 transition-all"
        >
          <div className="bg-white p-3 md:p-4 rounded-full shadow-sm text-pink-600">
            <ImageIcon size={28} className="md:w-8 md:h-8" />
          </div>
          <span className="font-bold text-pink-800 text-sm md:text-base">كاريكاتير</span>
        </button>
      </div>

      {/* Stories Section */}
      <div className="px-4">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-6 bg-orange-400 rounded-full"></span>
            قصص التوعية
          </h3>
          <button onClick={() => onChangeTab(Tab.STORIES)} className="text-slate-400 text-sm font-bold flex items-center hover:text-slate-600">
            المزيد <ChevronLeft size={18} />
          </button>
        </div>
        {loading && <p className="text-sm text-slate-500 mb-3">جاري تحميل القصص...</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stories.map(story => (
            <div key={story.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <img src={story.image} alt={story.title} className="w-full h-40 object-cover rounded-xl mb-3" />
              <h4 className="font-bold text-slate-800 mb-2 text-base">{story.title}</h4>
              <p className="text-sm text-slate-500 line-clamp-2">{story.excerpt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Games Banner */}
      <div className="px-4">
        <div 
          onClick={() => onChangeTab(Tab.GAMES)}
          className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-6 border-2 border-blue-200 border-dashed flex items-center justify-between cursor-pointer hover:shadow-lg active:scale-[0.98] transition-all"
        >
          <div>
            <h3 className="text-xl md:text-2xl font-black text-blue-800 mb-2">اختبر ذكائك!</h3>
            <p className="text-blue-600 text-sm md:text-base font-medium">
              {games.length > 0 ? `يوجد ${games.length} ألعاب جاهزة الآن` : 'هل يمكنك التمييز بين الآمن والخطر؟'}
            </p>
          </div>
          <div className="bg-white p-3 md:p-4 rounded-2xl shadow-md rotate-3">
             <span className="text-4xl md:text-5xl">🛡️</span>
          </div>
        </div>
      </div>

      {/* Videos Grid Preview */}
      <div className="px-4">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-6 bg-red-400 rounded-full"></span>
            نصائح هامة
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map(video => (
             <div key={video.id} className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="relative">
                  <img src={video.thumbnail} className="w-full h-24 object-cover rounded-xl" alt={video.title} />
                  <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                    <div className="bg-white/90 p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                       <Play size={18} className="text-slate-900 fill-slate-900 ml-0.5" />
                    </div>
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-700 mt-2 px-1">{video.title}</h4>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
