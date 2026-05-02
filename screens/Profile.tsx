import React, { useEffect, useState } from 'react';
import { Edit2, Award, Trophy } from 'lucide-react';
import { api } from '../services/api';
import { UserProfile } from '../types';

export const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await api.getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to load profile', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return <div className="pb-24 pt-8 px-6 text-sm text-slate-500">جاري تحميل الملف الشخصي...</div>;
  }

  if (!profile) {
    return <div className="pb-24 pt-8 px-6 text-sm text-slate-500">تعذر تحميل الملف الشخصي.</div>;
  }

  return (
    <div className="pb-24 pt-8">
      <div className="flex flex-col items-center px-6 mb-8">
        <div className="relative mb-4 group cursor-pointer">
          <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-sky-400 to-blue-500 shadow-xl">
             <img src={profile.avatar} alt="Avatar" className="w-full h-full rounded-full border-4 border-white object-cover" />
          </div>
          <button className="absolute bottom-0 left-0 bg-white p-2 rounded-full shadow-lg border border-slate-100 text-slate-600 hover:text-blue-500">
            <Edit2 size={16} />
          </button>
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-1">{profile.name}</h2>
        <span className="bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-xs font-bold">المستوى {profile.level}</span>
      </div>

      <div className="px-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-700 flex items-center gap-2">
              <Trophy size={18} className="text-yellow-500" />
              التقدم
            </h3>
            <span className="text-sm font-bold text-slate-400">{profile.progress}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000" 
              style={{ width: `${profile.progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="px-6">
        <h3 className="font-bold text-slate-800 mb-4 px-2">أوسمتي ({profile.badges.length})</h3>
        <div className="grid grid-cols-4 gap-4">
          {profile.badges.map((badge, idx) => (
            <div key={idx} className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-slate-100">
              {badge}
            </div>
          ))}
          <div className="aspect-square rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200 text-slate-300">
            <Award size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};