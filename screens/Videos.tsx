import React, { useEffect, useState } from 'react';
import { PlayCircle, X, Clock, User, Share2, Sparkles, Star } from 'lucide-react';
import { api } from '../services/api';
import { Video } from '../types';

export const Videos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const getEmbedUrl = (url?: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      return url.replace('youtu.be/', 'youtube.com/embed/');
    }
    return url;
  };

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
    <div className="px-5 pb-24 pt-6">
      {/* Dynamic Header Section */}
      <div className="mb-10 text-right">
        <h2 className="text-3xl font-black text-slate-800 mb-2 flex items-center justify-end gap-3">
          <Sparkles className="text-sky-500" /> الفيديوهات المميزة
        </h2>
        <p className="text-slate-500 font-bold">شاهد وتعلم مهارات جديدة في العالم الرقمي!</p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-video bg-slate-100 rounded-3xl animate-pulse"></div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {videos.map((video) => (
          <div 
            key={video.id} 
            onClick={() => setSelectedVideo(video)}
            className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100 cursor-pointer"
          >
            {/* Thumbnail Container */}
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-5 rounded-full scale-90 group-hover:scale-100 transition-all duration-500 border border-white/30">
                  <PlayCircle size={48} className="text-white fill-white/20" />
                </div>
              </div>

              {/* Duration Badge */}
              <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-xl font-black flex items-center gap-1.5 border border-white/10">
                <Clock size={12} /> {video.duration}
              </span>

              {/* Category Badge */}
              <span className={`absolute top-4 right-4 text-[10px] px-4 py-2 rounded-xl font-black shadow-lg ${getCategoryInfo(video.category).color}`}>
                {getCategoryInfo(video.category).label}
              </span>
            </div>

            {/* Video Info */}
            <div className="p-6">
              <h3 className="text-lg font-black text-slate-800 mb-3 group-hover:text-sky-600 transition-colors line-clamp-2 leading-tight">
                {video.title}
              </h3>
              <div className="flex items-center justify-between">
                {video.contentPreparation ? (
                  <div className="flex items-center gap-2 text-slate-400">
                    <User size={14} />
                    <span className="text-[10px] font-bold">إعداد: {video.contentPreparation}</span>
                  </div>
                ) : (
                  <div className="w-px h-1"></div>
                )}
                <div className="text-sky-500 group-hover:translate-x-[-4px] transition-transform">
                  <Star size={16} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Coming Soon Card */}
        <div className="aspect-video rounded-[2.5rem] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-300 gap-4 group hover:border-sky-100 transition-colors">
           <div className="bg-slate-50 p-6 rounded-full group-hover:bg-sky-50 transition-colors">
              <PlayCircle size={40} className="opacity-20 group-hover:text-sky-200" />
           </div>
           <span className="text-sm font-black uppercase tracking-widest">فيديوهات قادمة قريباً</span>
        </div>
      </div>

      {!loading && videos.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
           <p className="text-slate-400 font-bold">لا توجد فيديوهات متاحة حالياً.</p>
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl" onClick={() => setSelectedVideo(null)}></div>
          
          <div className="relative w-full max-w-5xl h-full sm:h-auto bg-white sm:rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
            {/* Video Player Container */}
            <div className="relative aspect-video bg-black">
              {selectedVideo.videoUrl?.includes('youtube.com') || selectedVideo.videoUrl?.includes('youtu.be') ? (
                <iframe 
                  src={getEmbedUrl(selectedVideo.videoUrl)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video 
                  src={selectedVideo.videoUrl} 
                  controls 
                  className="w-full h-full"
                  poster={selectedVideo.thumbnail}
                ></video>
              )}
              
              {/* Close Button Mobile */}
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 sm:hidden bg-black/40 text-white p-3 rounded-2xl backdrop-blur-md"
              >
                <X size={24} />
              </button>
            </div>

            {/* Video Details Content */}
            <div className="p-8 sm:p-12 text-right overflow-y-auto max-h-[40vh] sm:max-h-none">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex gap-3">
                  <span className={`px-4 py-2 rounded-2xl text-[10px] font-black shadow-sm ${getCategoryInfo(selectedVideo.category).color}`}>
                    {getCategoryInfo(selectedVideo.category).label}
                  </span>
                  <span className="bg-slate-100 text-slate-500 px-4 py-2 rounded-2xl text-[10px] font-black flex items-center gap-2">
                    <Clock size={14} /> {selectedVideo.duration}
                  </span>
                </div>
                <button className="bg-sky-50 text-sky-600 p-3 rounded-2xl hover:bg-sky-100 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-6 leading-tight">
                {selectedVideo.title}
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed font-medium mb-10">
                {selectedVideo.description || "شاهد هذا الفيديو الممتع لتعلم المزيد عن الأمان الرقمي وكيفية استخدام الإنترنت بذكاء!"}
              </p>

              {/* Contributors Section */}
              {(selectedVideo.contentPreparation || selectedVideo.execution) && (
                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {selectedVideo.contentPreparation && (
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-3 rounded-xl shadow-sm text-sky-500"><User size={20} /></div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">إعداد المحتوى</p>
                        <p className="text-lg font-bold text-slate-800">{selectedVideo.contentPreparation}</p>
                      </div>
                    </div>
                  )}
                  {selectedVideo.execution && (
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-3 rounded-xl shadow-sm text-emerald-500"><Sparkles size={20} /></div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase">تنفيذ وإخراج</p>
                        <p className="text-lg font-bold text-slate-800">{selectedVideo.execution}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Close Button Desktop */}
              <div className="mt-10 text-center hidden sm:block">
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-sky-600 transition-all shadow-xl active:scale-95"
                >
                  إغلاق المشغل
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};