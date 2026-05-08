
export interface Story {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  imageUrl?: string;
  color: string;
  content?: string;
  summary?: string;
  author?: string;
  goal?: string;
  dailyTip?: string;
  contentPreparation?: string;
  execution?: string;
  isGenerated?: boolean;
}

export interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
  description?: string;
  category?: 'awareness' | 'activities' | 'quick_info';
  contentPreparation?: string;
  execution?: string;
}

export interface Game {
  id: string;
  title: string;
  type: string;
  icon: string;
  color: string;
  contentPreparation?: string;
  execution?: string;
}

export interface Podcast {
  id: string;
  title: string;
  duration: string;
  host: string;
  image: string;
  color: string;
  contentPreparation?: string;
  execution?: string;
}

export interface Caricature {
  id: string;
  title: string;
  image: string;
  description: string;
  contentPreparation?: string;
  execution?: string;
}

export interface ParentTip {
  id: string;
  title: string;
  content: string;
  image: string;
  category: 'protection' | 'screen_time' | 'digital_edu' | 'online_safety';
  contentPreparation?: string;
  execution?: string;
  createdAt?: string;
}

export interface Infographic {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'digital_awareness' | 'positive_behavior' | 'online_safety' | 'health_habits' | 'quick_info';
  age_group: string;
  contentPreparation?: string;
  execution?: string;
  createdAt?: string;
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
  CARICATURES = 'caricatures',
  INFOGRAPHICS = 'infographics'
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
