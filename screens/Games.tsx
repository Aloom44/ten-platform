import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, 
  Play, 
  Info, 
  ChevronRight, 
  Search, 
  LayoutGrid,
  ShieldCheck,
  Brain,
  Zap,
  Target,
  Smile,
  X
} from 'lucide-react';
import { Game } from '../types';
import { api } from '../services/api';

export const Games: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const data = await api.getGames();
        setGames(data);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const categories = [
    { id: 'all', label: 'الكل', icon: LayoutGrid, color: 'bg-slate-100 text-slate-600' },
    { id: 'educational', label: 'تعليمية', icon: Smile, color: 'bg-emerald-100 text-emerald-600' },
    { id: 'intelligence', label: 'ذكاء', icon: Brain, color: 'bg-purple-100 text-purple-600' },
    { id: 'digital_safety', label: 'أمان رقمي', icon: ShieldCheck, color: 'bg-blue-100 text-blue-600' },
    { id: 'focus', label: 'تركيز', icon: Target, iconColor: 'text-rose-600', color: 'bg-rose-100 text-rose-600' },
    { id: 'purposeful_fun', label: 'ترفيه هادف', icon: Zap, color: 'bg-amber-100 text-amber-600' },
  ];

  const filteredGames = games.filter(game => {
    const matchesFilter = filter === 'all' || game.game_type === filter;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCategoryLabel = (type: string) => {
    return categories.find(c => c.id === type)?.label || 'لعبة';
  };

  const getCategoryColor = (type: string) => {
    return categories.find(c => c.id === type)?.color || 'bg-slate-100 text-slate-600';
  };

  return (
    <div className="min-h-screen pb-32 pt-4 bg-slate-50/50">
      {/* Header Section */}
      <div className="px-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2 flex items-center gap-3">
              <div className="bg-indigo-600 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-200">
                <Gamepad2 size={32} />
              </div>
              الألعاب التعليمية
            </h1>
            <p className="text-slate-500 font-bold pr-1">العب، تعلم، واستمتع في بيئة آمنة تماماً 💙</p>
          </div>

          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="ابحث عن لعبة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 pr-12 pl-4 py-4 bg-white border border-slate-200 rounded-3xl shadow-sm focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all font-bold text-slate-700"
            />
          </div>
        </motion.div>
      </div>

      {/* Categories Bar */}
      <div className="px-6 mb-10 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 min-w-max pb-2">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat.id)}
              className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-black transition-all shadow-sm ${
                filter === cat.id 
                ? 'bg-indigo-600 text-white shadow-indigo-200 shadow-xl scale-105' 
                : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
              }`}
            >
              <cat.icon size={20} />
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="px-6">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="bg-white h-80 rounded-[2.5rem] animate-pulse border border-slate-100 shadow-sm"></div>
            ))}
          </div>
        ) : filteredGames.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {filteredGames.map((game) => (
                <motion.div
                  key={game.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={game.thumbnail || 'https://picsum.photos/400/300?random=' + game.id} 
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                       <motion.button 
                         whileHover={{ scale: 1.1 }}
                         whileTap={{ scale: 0.9 }}
                         onClick={() => setSelectedGame(game)}
                         className="bg-white/20 backdrop-blur-md text-white p-4 rounded-full border border-white/30 shadow-2xl"
                       >
                          <Play size={32} fill="currentColor" />
                       </motion.button>
                    </div>
                    <div className="absolute top-4 left-4">
                       <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black shadow-sm backdrop-blur-md border border-white/20 ${getCategoryColor(game.game_type)}`}>
                          {getCategoryLabel(game.game_type)}
                       </span>
                    </div>
                  </div>

                  <div className="p-6 text-right">
                    <h3 className="text-xl font-black text-slate-800 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">{game.title}</h3>
                    <p className="text-slate-500 text-xs font-bold leading-relaxed line-clamp-2 mb-6">
                      {game.short_description || game.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-black text-slate-400 italic">إعداد: {game.creators || 'TEN Team'}</span>
                       <button 
                         onClick={() => setSelectedGame(game)}
                         className="flex items-center gap-2 text-indigo-600 font-black text-sm group/btn"
                       >
                         ابدأ اللعب <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                       </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-slate-100 p-8 rounded-full mb-6">
              <Gamepad2 size={64} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">لا توجد ألعاب حالياً</h3>
            <p className="text-slate-500 font-bold max-w-xs">جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً.</p>
          </div>
        )}
      </div>

      {/* Game Details Modal */}
      <AnimatePresence>
        {selectedGame && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGame(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
               {/* Left/Top side: Image & Play */}
               <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto h-64 md:h-auto overflow-hidden">
                  <img 
                    src={selectedGame.thumbnail || 'https://picsum.photos/800/600?random=' + selectedGame.id} 
                    className="w-full h-full object-cover"
                    alt={selectedGame.title}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                     <motion.a 
                       href={selectedGame.game_url}
                       target="_blank"
                       rel="noopener noreferrer"
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.9 }}
                       className="bg-white text-indigo-600 px-10 py-5 rounded-3xl font-black shadow-2xl flex items-center gap-3 text-xl"
                     >
                        <Play size={28} fill="currentColor" /> ابدأ اللعب
                     </motion.a>
                  </div>
               </div>

               {/* Right/Bottom side: Content */}
               <div className="flex-1 p-8 md:p-12 text-right flex flex-col justify-center overflow-y-auto">
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="absolute top-6 left-6 p-2 rounded-2xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all"
                  >
                    <X size={24} />
                  </button>

                  <div className="mb-8">
                    <span className={`px-4 py-1.5 rounded-xl text-xs font-black mb-4 inline-block ${getCategoryColor(selectedGame.game_type)}`}>
                      {getCategoryLabel(selectedGame.game_type)}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">{selectedGame.title}</h2>
                    <div className="flex items-center justify-end gap-3 text-slate-400 font-bold mb-8">
                       <span>{selectedGame.age_group}</span>
                       <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                       <span>إعداد: {selectedGame.creators || 'TEN Team'}</span>
                    </div>
                    <p className="text-slate-600 text-lg leading-relaxed font-medium">
                      {selectedGame.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-8 border-t border-slate-100">
                     <div className="bg-indigo-50 p-6 rounded-3xl flex items-start gap-4">
                        <div className="bg-white p-3 rounded-2xl text-indigo-600 shadow-sm">
                           <Info size={24} />
                        </div>
                        <div>
                           <p className="text-indigo-900 font-black mb-1">معلومة سريعة</p>
                           <p className="text-indigo-600/80 text-sm font-bold leading-relaxed">
                              يتم فتح اللعبة في نافذة جديدة. تأكد من العودة إلينا دائماً لتجربة المزيد!
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
