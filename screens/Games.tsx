
import React, { useEffect, useState } from 'react';
import { MultiplayerGame } from '../components/MultiplayerGame';
import { Globe, User } from 'lucide-react';
import { api } from '../services/api';
import { Game } from '../types';

export const Games: React.FC = () => {
  const [mode, setMode] = useState<'menu' | 'multiplayer'>('menu');
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const data = await api.getGames();
        setGames(data);
      } catch (error) {
        console.error('Failed to load games', error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  if (mode === 'multiplayer') {
    return <MultiplayerGame onExit={() => setMode('menu')} />;
  }

  return (
    <div className="px-6 pb-24 pt-4">
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl p-6 text-center mb-8 border border-blue-200">
        <h2 className="text-2xl font-black text-blue-700 mb-2">تحديات البطل الذكي</h2>
        <p className="text-blue-600 font-medium text-sm">تعلم كيف تحمي نفسك وأنت تلعب!</p>
      </div>

      {/* Mode Selection */}
      <div className="mb-8">
        <button 
          onClick={() => setMode('multiplayer')}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-1 shadow-lg transform transition-transform active:scale-95 group"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-[1.3rem] p-6 flex items-center justify-between">
            <div className="text-right text-white">
              <h3 className="text-xl font-black mb-1 flex items-center gap-2">
                <Globe className="text-yellow-300" />
                 تحدي الأونلاين
              </h3>
              <p className="text-indigo-100 text-xs">سابق أصدقاءك في معلومات الأمان!</p>
            </div>
            <div className="bg-white text-indigo-600 p-3 rounded-2xl shadow-md font-bold text-sm group-hover:bg-yellow-300 group-hover:text-indigo-800 transition-colors">
              العب الآن
            </div>
          </div>
        </button>
      </div>

      <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
        <User size={20} className="text-slate-400" />
        ألعاب فردية
      </h3>

      {loading && <p className="text-sm text-slate-500 mb-4">جاري تحميل الألعاب...</p>}

      <div className="grid grid-cols-2 gap-4">
        {games.map((game) => (
          <button 
            key={game.id} 
            className={`aspect-square rounded-[2rem] p-4 flex flex-col items-center justify-center gap-3 text-center transition-all active:scale-95 border-b-4 hover:-translate-y-1 ${game.color} bg-white`}
          >
            <div className="text-5xl drop-shadow-sm filter">{game.icon}</div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-0.5">{game.title}</h3>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold opacity-60 uppercase tracking-wider">{game.type}</span>
                {(game.contentPreparation || game.execution) && (
                  <span className="text-[8px] opacity-40">بواسطة الطلاب</span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {!loading && games.length === 0 && (
        <p className="text-sm text-slate-500 mt-4">لا توجد ألعاب متاحة حالياً.</p>
      )}
    </div>
  );
};
