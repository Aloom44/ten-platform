
import React, { useState } from 'react';
import { Sparkles, BookOpen, Loader2, ShieldCheck } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface GeminiStoryGeneratorProps {
  safeMode: boolean;
}

export const GeminiStoryGenerator: React.FC<GeminiStoryGeneratorProps> = ({ safeMode }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    // Check for API Key - Safe fallback if not present
    if (!process.env.API_KEY) {
      setError('عذراً، مفتاح API غير متوفر حالياً.');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedStory('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Strict Safety Instructions
      const safetyInstruction = safeMode 
        ? "STRICT SAFETY FILTER ENABLED: The story must be very gentle. Absolutely NO scary characters, NO violence, NO weapons, NO dark themes. If the user asks for something scary, politely refuse and write about something happy instead. Focus on safety, friendship, and offline play."
        : "";

      const systemContext = `
        ${safetyInstruction}
        Write a short, educational story (max 100 words) in Arabic for a 7-year-old child.
        The story MUST focus on one of these themes:
        1. The importance of playing offline in the real world instead of staring at screens.
        2. Internet safety (not sharing secrets, stranger danger).
        3. Avoiding harmful or scary content online.
        
        The user's input topic is: ${prompt}.
        Make it playful but educational.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: systemContext,
      });
      
      const storyText = response.text || "عذراً، لم أتمكن من كتابة القصة الآن.";
      setGeneratedStory(storyText);
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء كتابة القصة. حاول مرة أخرى!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl p-6 shadow-sm border border-emerald-200 my-6 relative overflow-hidden">
      
      {/* Safe Mode Badge */}
      {safeMode && (
        <div className="absolute top-4 left-4 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-bold text-emerald-700 border border-emerald-200">
           <ShieldCheck size={12} /> درع الحماية مفعل
        </div>
      )}

      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-emerald-600" />
        <h3 className="text-xl font-bold text-emerald-800">مؤلف قصص الحماية</h3>
      </div>
      
      {!generatedStory ? (
        <div className="space-y-4">
          <p className="text-emerald-700 text-sm font-medium">أكتب موضوعاً لقصة تعلمك كيف تكون آمناً وذكياً:</p>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="مثال: اللعب بالكرة، كلمة السر..."
              className="flex-1 rounded-xl border-2 border-emerald-200 px-4 py-3 focus:border-emerald-400 focus:outline-none bg-white text-slate-700 placeholder:text-slate-400"
            />
            <button 
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className="bg-emerald-600 text-white rounded-xl px-4 py-2 font-bold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[80px]"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'تأليف'}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded-lg">{error}</p>}
        </div>
      ) : (
        <div className="bg-white/60 rounded-2xl p-6 animate-fade-in">
          <div className="prose prose-lg text-slate-800 leading-relaxed whitespace-pre-line font-medium">
            {generatedStory}
          </div>
          <button 
            onClick={() => { setGeneratedStory(''); setPrompt(''); }}
            className="mt-4 text-emerald-600 font-bold text-sm hover:underline flex items-center gap-1"
          >
            <BookOpen size={16} />
            قصة جديدة
          </button>
        </div>
      )}
    </div>
  );
};
