import React, { useEffect, useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { api } from '../services/api';
import { Video } from '../types';

export const Videos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const data = await api.getVideos();
        setVideos(data);
      } catch (error) {
        console.error('Failed to load videos', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const getCategoryInfo = (category?: string) => {
    switch (category) {
      case 'awareness':
        return { label: 'فيديو توعوي', color: 'bg-blue-100 text-blue-700' };
      case 'activities':
        return { label: 'أنشطة وتحديات', color: 'bg-emerald-100 text-emerald-700' };
      case 'quick_info':
        return { label: 'معلومات سريعة', color: 'bg-amber-100 text-amber-700' };
      case 'reports':
        return { label: 'تقارير ميدانية', color: 'bg-purple-100 text-purple-700' };
      default:
        return { label: 'فيديو', color: 'bg-slate-100 text-slate-700' };
    }
  };

  return (
    <div className="px-4 pb-24 pt-4">
      {loading && <p className="text-sm text-slate-500 mb-4">جاري تحميل الفيديوهات...</p>}

      <div className="grid grid-cols-2 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group">
            <div className="relative aspect-[4/3]">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <PlayCircle size={48} className="text-white opacity-90 drop-shadow-lg scale-90 group-hover:scale-100 transition-transform" />
              </div>
              <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md font-medium">
                {video.duration}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-800 text-sm mb-2">{video.title}</h3>
              <div className="flex flex-wrap gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${getCategoryInfo(video.category).color}`}>
                  {getCategoryInfo(video.category).label}
                </span>
                {video.contentPreparation && (
                  <span className="text-[10px] text-slate-400">إعداد: {video.contentPreparation}</span>
                )}
              </div>
            </div>
          </div>
        ))}
        {/* Placeholder for more */}
        <div className="aspect-[4/3] rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-2">
           <span className="text-2xl">🔜</span>
           <span className="text-xs font-bold">قريباً</span>
        </div>
      </div>

      {!loading && videos.length === 0 && (
        <p className="text-sm text-slate-500 mt-4">لا توجد فيديوهات متاحة حالياً.</p>
      )}
    </div>
  );
};