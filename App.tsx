import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';
import { Home } from './screens/Home';
import { Stories } from './screens/Stories';
import { Videos } from './screens/Videos';
import { Games } from './screens/Games';
import { Profile } from './screens/Profile';
import { Parents } from './screens/Parents';
import { Podcasts } from './screens/Podcasts';
import { Caricatures } from './screens/Caricatures';
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
      case Tab.GAMES: return <Games />;
      case Tab.PROFILE: return <Profile />;
      case Tab.PODCASTS: return <Podcasts />;
      case Tab.CARICATURES: return <Caricatures />;
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
    // Full screen layout for both mobile and desktop
    <div className="min-h-screen bg-slate-50 font-tajawal">
      {/* Main Container - Full width on all screens */}
      <div className="w-full min-h-screen bg-white">
        
        {/* Scrollable Content Area */}
        <div className="min-h-screen overflow-y-auto bg-slate-50 pb-20">
          {!showParentsCorner && (
            <Header 
              currentTab={currentTab} 
              onOpenParents={() => setShowParentsCorner(true)} 
            />
          )}
          
          {/* Main content with max width for desktop */}
          <main 
            key={showParentsCorner ? 'parents' : currentTab}
            className="animate-fade-in px-4 md:px-6 lg:px-8 max-w-7xl mx-auto"
          >
            {renderScreen()}
          </main>
        </div>

        {/* Bottom Navigation - Fixed at bottom */}
        {!showParentsCorner && (
          <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />
        )}
      </div>
    </div>
  );
}

export default App;