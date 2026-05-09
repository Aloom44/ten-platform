import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { Home } from './screens/Home';
import { Stories } from './screens/Stories';
import { Videos } from './screens/Videos';
import { Articles } from './screens/Articles';
import { Games } from './screens/Games';
import { Profile } from './screens/Profile';
import { Parents } from './screens/Parents';
import { Caricatures } from './screens/Caricatures';
import { AdminPanel } from './screens/AdminPanel';
import { Infographics } from './screens/Infographics';
import { Tab, AppSettings } from './types';

function App() {
  const [currentTab, setCurrentTab] = useState<Tab>(Tab.HOME);
  const [showParentsCorner, setShowParentsCorner] = useState(false);
  
  // Global App Settings (Parental Control State)
  const [appSettings, setAppSettings] = useState<AppSettings>({
    safeFilter: true, // Default to Safe Mode ON
    blockAds: true,
    timeLimit: 45,
    bedtimeMode: false,
    blockExternalLinks: true
  });

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentTab, showParentsCorner]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setAppSettings(prev => ({ ...prev, ...newSettings }));
  };

  const renderScreen = () => {
    if (showParentsCorner) {
      return (
        <Parents 
          onBack={() => setShowParentsCorner(false)} 
          currentSettings={appSettings}
          onUpdateSettings={updateSettings}
        />
      );
    }

    switch (currentTab) {
      case Tab.HOME: return <Home onChangeTab={setCurrentTab} />;
      // Pass safeMode to Stories to control AI generation
      case Tab.STORIES: return <Stories safeMode={appSettings.safeFilter} />;
      case Tab.VIDEOS: return <Videos />;
      case Tab.ARTICLES: return <Articles />;
      case Tab.ADMIN: return <AdminPanel />;
      case Tab.PROFILE: return <Profile />;
      case Tab.CARICATURES: return <Caricatures />;
      case Tab.INFOGRAPHICS: return <Infographics />;
      case Tab.PARENTS: return (
        <Parents 
          onBack={() => setCurrentTab(Tab.HOME)} 
          currentSettings={appSettings}
          onUpdateSettings={updateSettings}
        />
      );
      default: return <Home onChangeTab={setCurrentTab} />;
    }
  };

  return (
    <div className="app-shell min-h-screen font-tajawal">
      <div className="mx-auto min-h-screen w-full max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="app-frame min-h-screen overflow-hidden rounded-none border-0 sm:my-4 sm:rounded-[28px] sm:border sm:border-white/60">
          <div className="min-h-screen overflow-y-auto pb-24">
          {!showParentsCorner && (
            <Header 
              currentTab={currentTab} 
              onOpenParents={() => setShowParentsCorner(true)} 
            />
          )}
          
          <main 
            key={showParentsCorner ? 'parents' : currentTab}
            className="animate-fade-in px-3 sm:px-5 md:px-7 lg:px-8"
          >
            {renderScreen()}
          </main>
        </div>

        {!showParentsCorner && (
          <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />
        )}
      </div>
    </div>
    </div>
  );
}

export default App;