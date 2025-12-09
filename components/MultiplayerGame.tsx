
import React, { useState, useEffect } from 'react';
import { Player, TriviaQuestion, MultiplayerState } from '../types';
import { MULTIPLAYER_QUESTIONS, BOT_NAMES, MOCK_PROFILE } from '../constants';
import { Users, Clock, Trophy, Crown, ArrowRight, ShieldCheck } from 'lucide-react';

interface MultiplayerGameProps {
  onExit: () => void;
}

export const MultiplayerGame: React.FC<MultiplayerGameProps> = ({ onExit }) => {
  const [gameState, setGameState] = useState<MultiplayerState>(MultiplayerState.LOBBY);
  const [players, setPlayers] = useState<Player[]>([
    { 
      id: 'me', 
      name: MOCK_PROFILE.name, 
      avatar: MOCK_PROFILE.avatar, 
      score: 0, 
      isBot: false, 
      isReady: true 
    }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // --- LOBBY LOGIC: Simulate players joining ---
  useEffect(() => {
    if (gameState === MultiplayerState.LOBBY) {
      const joinInterval = setInterval(() => {
        if (players.length < 4) {
          const newBotName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
          // Avoid duplicate names
          if (!players.find(p => p.name === newBotName)) {
            const newBot: Player = {
              id: `bot-${Date.now()}`,
              name: newBotName,
              avatar: `https://picsum.photos/200/200?random=${players.length + 50}`,
              score: 0,
              isBot: true,
              isReady: true
            };
            setPlayers(prev => [...prev, newBot]);
          }
        } else {
          clearInterval(joinInterval);
        }
      }, 1500);

      return () => clearInterval(joinInterval);
    }
  }, [gameState, players]);

  // --- GAME LOGIC: Timer & Bots ---
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (gameState === MultiplayerState.PLAYING) {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      } else {
        // Time is up, move to next question or results
        handleNextRound();
      }

      // Simulate Bot Answers randomly during the round
      const randomBotAnswer = Math.random();
      if (timeLeft < 8 && timeLeft > 2 && randomBotAnswer > 0.7) {
        setPlayers(prev => prev.map(p => {
          if (p.isBot) {
            // Simple AI: 70% chance to be right
            const isCorrect = Math.random() > 0.3; 
            const points = isCorrect ? 10 : 0;
            // Only add points if they haven't "answered" this round yet (simplified logic: just add score)
             return { ...p, score: p.score + (Math.random() > 0.9 ? 10 : 0) }; // Slowly increment bot scores randomly
          }
          return p;
        }));
      }
    }

    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  const handleNextRound = () => {
    if (currentQuestionIndex < MULTIPLAYER_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeLeft(10);
      setSelectedOption(null);
    } else {
      setGameState(MultiplayerState.RESULTS);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    if (selectedOption !== null) return; // Prevent double answering
    setSelectedOption(optionIndex);

    const currentQ = MULTIPLAYER_QUESTIONS[currentQuestionIndex];
    if (optionIndex === currentQ.correctAnswer) {
      // Calculate score based on speed
      const points = 10 + timeLeft;
      setPlayers(prev => prev.map(p => p.id === 'me' ? { ...p, score: p.score + points } : p));
    }
  };

  const startGame = () => {
    setGameState(MultiplayerState.COUNTDOWN);
    setTimeout(() => {
      setGameState(MultiplayerState.PLAYING);
      setTimeLeft(10);
    }, 3000);
  };

  // --- RENDER: LOBBY ---
  if (gameState === MultiplayerState.LOBBY) {
    return (
      <div className="bg-indigo-600 min-h-full p-6 text-white flex flex-col items-center justify-center animate-fade-in pb-24">
        <h2 className="text-3xl font-black mb-2 flex items-center gap-2">
          <Users size={32} />
          غرفة الأصدقاء
        </h2>
        <p className="opacity-80 mb-8">نبحث عن لاعبين...</p>

        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          {players.map((player) => (
            <div key={player.id} className="bg-white/10 border border-white/20 p-4 rounded-2xl flex flex-col items-center animate-pop-in">
              <img src={player.avatar} className="w-16 h-16 rounded-full border-2 border-white mb-2" alt={player.name} />
              <span className="font-bold">{player.name}</span>
              <span className="text-xs bg-green-500 px-2 py-0.5 rounded-full mt-1">جاهز</span>
            </div>
          ))}
          {players.length < 4 && (
            <div className="border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center p-4">
              <div className="w-16 h-16 rounded-full bg-white/5 animate-pulse"></div>
            </div>
          )}
        </div>

        {players.length === 4 && (
          <button 
            onClick={startGame}
            className="w-full bg-green-500 hover:bg-green-400 text-white font-black py-4 rounded-xl shadow-lg transition-transform active:scale-95 text-xl"
          >
            ابدأ التحدي!
          </button>
        )}
        <button onClick={onExit} className="mt-4 text-white/60 text-sm hover:text-white">خروج</button>
      </div>
    );
  }

  // --- RENDER: COUNTDOWN ---
  if (gameState === MultiplayerState.COUNTDOWN) {
    return (
      <div className="bg-indigo-600 min-h-full flex items-center justify-center pb-24">
        <div className="text-8xl font-black text-white animate-ping">استعد!</div>
      </div>
    );
  }

  // --- RENDER: PLAYING ---
  if (gameState === MultiplayerState.PLAYING) {
    const currentQ = MULTIPLAYER_QUESTIONS[currentQuestionIndex];
    return (
      <div className="bg-slate-100 min-h-full pb-24 p-6 flex flex-col">
        {/* Header: Timer & Round */}
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white px-4 py-2 rounded-full font-bold text-slate-700 shadow-sm border border-slate-200">
            السؤال {currentQuestionIndex + 1}/{MULTIPLAYER_QUESTIONS.length}
          </div>
          <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xl shadow-md border-4 ${timeLeft < 4 ? 'bg-red-100 border-red-400 text-red-600' : 'bg-white border-indigo-400 text-indigo-600'}`}>
            {timeLeft}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-6 shadow-md border-b-4 border-indigo-100 mb-6 flex-1 flex flex-col justify-center text-center">
          <h3 className="text-xl font-bold text-slate-800 leading-snug">{currentQ.question}</h3>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, idx) => {
            let btnClass = "bg-white border-2 border-slate-200 text-slate-700";
            if (selectedOption !== null) {
              if (idx === currentQ.correctAnswer) btnClass = "bg-green-500 border-green-600 text-white";
              else if (idx === selectedOption) btnClass = "bg-red-400 border-red-500 text-white";
              else btnClass = "bg-slate-100 text-slate-400 border-transparent opacity-50";
            }
            
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selectedOption !== null}
                className={`w-full p-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-sm ${btnClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Mini Scoreboard */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {players.sort((a,b) => b.score - a.score).map(p => (
             <div key={p.id} className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${p.id === 'me' ? 'bg-indigo-100 border-indigo-300' : 'bg-white border-slate-200'}`}>
                <span>{p.score}</span>
                <span className="truncate max-w-[50px]">{p.name}</span>
             </div>
          ))}
        </div>
      </div>
    );
  }

  // --- RENDER: RESULTS ---
  if (gameState === MultiplayerState.RESULTS) {
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const winner = sortedPlayers[0];
    const amIWinner = winner.id === 'me';

    return (
      <div className="bg-gradient-to-b from-indigo-500 to-purple-600 min-h-full pb-24 p-6 text-white text-center">
        <div className="mt-8 mb-6">
          <Crown size={64} className="mx-auto text-yellow-300 animate-bounce" />
          <h2 className="text-3xl font-black mb-1">{amIWinner ? 'مبروك! أنت الفائز' : 'حاول مرة أخرى!'}</h2>
          <p className="opacity-80">انتهت المسابقة</p>
        </div>

        <div className="bg-white rounded-3xl p-6 text-slate-800 shadow-xl mb-6">
          {sortedPlayers.map((p, idx) => (
            <div key={p.id} className={`flex items-center justify-between p-3 rounded-xl mb-2 ${idx === 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-slate-50'}`}>
              <div className="flex items-center gap-3">
                <span className="font-black text-slate-400 w-6">#{idx + 1}</span>
                <img src={p.avatar} className="w-10 h-10 rounded-full" alt={p.name} />
                <span className="font-bold">{p.name} {p.id === 'me' && '(أنت)'}</span>
              </div>
              <div className="font-black text-indigo-600">{p.score}</div>
            </div>
          ))}
        </div>

        <button 
          onClick={onExit}
          className="w-full bg-white text-indigo-600 font-bold py-4 rounded-xl shadow-lg hover:bg-slate-100 transition-colors"
        >
          العودة للقائمة
        </button>
      </div>
    );
  }

  return null;
};
