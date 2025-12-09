import React from 'react';
import { MOCK_VIDEOS } from '../constants';
import { PlayCircle } from 'lucide-react';

export const Videos: React.FC = () => {
  return (
    <div className="px-4 pb-24 pt-4">
      <div className="grid grid-cols-2 gap-4">
        {MOCK_VIDEOS.map((video) => (
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
              <h3 className="font-bold text-slate-800 text-sm mb-1">{video.title}</h3>
              <p className="text-xs text-slate-400">تعليمي • ممتع</p>
            </div>
          </div>
        ))}
        {/* Placeholder for more */}
        <div className="aspect-[4/3] rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-2">
           <span className="text-2xl">🔜</span>
           <span className="text-xs font-bold">قريباً</span>
        </div>
      </div>
    </div>
  );
};