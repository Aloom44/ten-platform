
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
  thumbnailUrl?: string;
  videoUrl?: string;
  description?: string;
  category?: 'awareness' | 'activities' | 'quick_info';
  contentPreparation?: string;
  execution?: string;
}

export interface ArticleBlock {
  type: 'paragraph' | 'heading' | 'quote' | 'image';
  content: string;
  caption?: string; // for images
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  coverImageUrl?: string;
  authorName?: string;
  contentBlocks: ArticleBlock[];
  category: 'awareness' | 'visual' | 'tips' | 'health' | 'safety';
  ageGroup: string;
  readingTime: number;
  publishedAt: string;
  contentPreparation?: string;
  execution?: string;
}


export interface ParentTip {
  id: string;
  title: string;
  summary?: string;
  content: string;
  authorName?: string;
  image: string;
  coverImageUrl?: string;
  category: 'screen_time' | 'sleep' | 'games' | 'protection' | 'mental_health' | 'family_comms';
  contentPreparation?: string;
  execution?: string;
  createdAt?: string;
}

export interface Infographic {
  id: string;
  title: string;
  authorName?: string;
  description: string;
  content?: string;
  image: string;
  imageUrl?: string;
  category: 'online_safety' | 'digital_health' | 'digital_awareness' | 'cyberbullying' | 'privacy' | 'safe_internet';
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
  ARTICLES = 'articles',
  ADMIN = 'admin',
  PARENTS = 'parents',
  INFOGRAPHICS = 'infographics',
  GAMES = 'games'
}

export interface Game {
  id: string;
  title: string;
  description: string;
  short_description?: string;
  game_url: string;
  thumbnail?: string;
  thumbnail_url?: string;
  creators?: string;
  age_group: string;
  game_type: 'educational' | 'intelligence' | 'digital_safety' | 'focus' | 'purposeful_fun';
  contentPreparation?: string;
  execution?: string;
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
