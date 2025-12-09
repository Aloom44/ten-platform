
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Story, UserProfile, AppSettings } from '../types';
import { api } from '../services/api';

interface AppContextType {
  stories: Story[];
  userProfile: UserProfile | null;
  settings: AppSettings;
  loading: boolean;
  addStory: (story: Partial<Story>) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  updateSettings: (data: Partial<AppSettings>) => Promise<void>;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [settings, setSettings] = useState<AppSettings>({
    safeFilter: true,
    blockAds: true,
    timeLimit: 45,
    bedtimeMode: false,
    blockExternalLinks: true
  });
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [fetchedStories, fetchedProfile, fetchedSettings] = await Promise.all([
        api.getStories(),
        api.getProfile(),
        api.getSettings()
      ]);
      
      setStories(fetchedStories);
      setUserProfile(fetchedProfile);
      setSettings(fetchedSettings);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    refreshData();
  }, []);

  const addStory = async (story: Partial<Story>) => {
    try {
      const newStory = await api.saveStory(story);
      setStories(prev => [newStory, ...prev]);
      
      // Add XP for creating a story
      if (userProfile) {
        await updateProfile({ 
            progress: Math.min(userProfile.progress + 20, 100),
            level: userProfile.progress + 20 >= 100 ? userProfile.level + 1 : userProfile.level
        });
      }
    } catch (e) {
      console.error("Failed to save story", e);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    try {
      const updated = await api.updateProfile(data);
      setUserProfile(updated);
    } catch (e) {
      console.error("Failed to update profile", e);
    }
  };

  const updateSettings = async (data: Partial<AppSettings>) => {
    try {
      const updated = await api.updateSettings(data);
      setSettings(updated);
    } catch (e) {
        console.error("Failed to update settings", e);
    }
  };

  return (
    <AppContext.Provider value={{ 
      stories, 
      userProfile, 
      settings,
      loading,
      addStory, 
      updateProfile,
      updateSettings,
      refreshData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
