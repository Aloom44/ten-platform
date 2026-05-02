
export interface Story {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  color: string;
  isGenerated?: boolean; // Added to distinguish AI stories
}

export interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
}

export interface Game {
  id: string;
  title: string;
  type: string;
  icon: string;
  color: string;
}

export interface Podcast {
  id: string;
  title: string;
  duration: string;
  host: string;
  image: string;
  color: string;
}

export interface Caricature {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface UserProfile {
  name: string;
  level: number;
  badges: string[];
  progress: number;
  avatar: string;
}

export interface AppSettings {
  safeFilter: boolean;
  blockAds: boolean;
  timeLimit: number;
  bedtimeMode: boolean;
  blockExternalLinks: boolean;
}

export enum Tab {
  HOME = 'home',
  STORIES = 'stories',
  VIDEOS = 'videos',
  GAMES = 'games',
  ADMIN = 'admin',
  PARENTS = 'parents',
  PROFILE = 'profile',
  PODCASTS = 'podcasts',
  CARICATURES = 'caricatures'
}

// Multiplayer Specific Types
export interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  isBot: boolean;
  isReady: boolean;
}

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // index
}

export enum MultiplayerState {
  LOBBY = 'lobby',
  COUNTDOWN = 'countdown',
  PLAYING = 'playing',
  RESULTS = 'results'
}
