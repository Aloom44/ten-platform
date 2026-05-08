
import React, { useEffect, useState } from 'react';
import { PlayCircle, PauseCircle, Headphones, Music } from 'lucide-react';
import { api } from '../services/api';
import { Podcast } from '../types';

export const Podcasts: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPodcasts = async () => {
      try {
        setLoading(true);
        const data = await api.getPodcasts();
        setPodcasts(data);
      } catch (error) {
        console.error('Failed to load podcasts', error);
      } finally {
        setLoading(false);
      }
    };

    loadPodcasts();
  }, []);

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  return (
    <div className="px-6 pb-24 pt-4">
      <div className="bg-gradient-to-r from-purple-100 to-fuchsia-100 rounded-3xl p-6 mb-8 text-center border border-purple-200">
        <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md text-purple-500">
          <Headphones size={32} />
        </div>
        <h2 className="text-xl font-black text-purple-800 mb-2">استمع وتعلم</h2>
        <p className="text-purple-600 text-sm font-medium">أغمض عينيك واستمتع بالقصص الصوتية</p>
      </div>

      {loading && <p className="text-sm text-slate-500 mb-4">جاري تحميل البودكاست...</p>}

      <div className="space-y-4">
        {podcasts.map((podcast) => {
          const isPlaying = playingId === podcast.id;
          return (
            <div key={podcast.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 transition-all hover:shadow-md">
              <div className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 ${podcast.color} flex items-center justify-center`}>
                <img src={podcast.image} alt={podcast.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <Music size={20} className="text-white drop-shadow-md" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-lg">{podcast.title}</h3>
                <p className="text-slate-400 text-xs font-medium mb-2">تقديم: {podcast.host}</p>
                <div className="flex items-center gap-2 mb-2">
                   <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md text-[10px] font-bold">{podcast.duration}</span>
                </div>
                {(podcast.contentPreparation || podcast.execution) && (
                  <div className="flex gap-3 text-[10px] text-slate-400 border-t border-slate-50 pt-2">
                    {podcast.contentPreparation && <span>إعداد: {podcast.contentPreparation}</span>}
                    {podcast.execution && <span>تنفيذ: {podcast.execution}</span>}
                  </div>
                )}
              </div>

              <button 
                onClick={() => togglePlay(podcast.id)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 ${
                  isPlaying ? 'bg-purple-500 text-white' : 'bg-purple-50 text-purple-500'
                }`}
              >
                {isPlaying ? <PauseCircle size={28} /> : <PlayCircle size={28} />}
              </button>
            </div>
          );
        })}
      </div>

      {!loading && podcasts.length === 0 && (
        <p className="text-sm text-slate-500 mt-4">لا توجد حلقات متاحة حالياً.</p>
      )}
      
      {/* Fake Player Bar if playing */}
      {playingId && (
        <div className="fixed bottom-24 left-4 right-4 max-w-sm mx-auto bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-slide-up z-50">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <div className="flex gap-0.5 items-end h-4">
                    <div className="w-1 bg-white animate-bounce h-2"></div>
                    <div className="w-1 bg-white animate-bounce h-4 delay-75"></div>
                    <div className="w-1 bg-white animate-bounce h-3 delay-150"></div>
                </div>
            </div>
            <div className="flex-1">
                <p className="text-xs font-bold text-purple-200">جاري التشغيل</p>
              <p className="text-sm font-bold truncate">{podcasts.find(p => p.id === playingId)?.title}</p>
            </div>
            <button onClick={() => setPlayingId(null)} className="text-slate-400 hover:text-white">
                <PauseCircle size={24} />
            </button>
        </div>
      )}
    </div>
  );
};
