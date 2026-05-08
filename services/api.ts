
import { Story, UserProfile, AppSettings, Video, Game, Podcast, Caricature, ParentTip, Infographic } from '../types';
import {
  MOCK_STORIES,
  MOCK_PROFILE,
  MOCK_VIDEOS,
  MOCK_GAMES,
  MOCK_PODCASTS,
  MOCK_CARICATURES,
} from '../constants';

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
const USE_REAL_API = import.meta.env.VITE_USE_REAL_API === 'true';
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

const STORY_COLORS = [
  'bg-green-100 text-green-700',
  'bg-red-100 text-red-700',
  'bg-indigo-100 text-indigo-700',
  'bg-orange-100 text-orange-700',
];

const GAME_COLORS = [
  'bg-blue-100 border-blue-300',
  'bg-orange-100 border-orange-300',
  'bg-purple-100 border-purple-300',
  'bg-red-100 border-red-300',
];

const GAME_TYPE_ICONS: Record<string, string> = {
  puzzle: '🧩',
  memory: '🧠',
  educational: '📘',
  multiplayer: '🌐',
  quiz: '❓',
};

const gameTypeLabel = (value?: string): string => {
  switch (value) {
    case 'puzzle':
      return 'ألغاز';
    case 'memory':
      return 'ذاكرة';
    case 'educational':
      return 'تعليمي';
    case 'multiplayer':
      return 'أونلاين';
    case 'quiz':
      return 'اختبار';
    default:
      return 'لعبة';
  }
};

const pad = (n: number) => String(n).padStart(2, '0');

const toDurationString = (seconds?: number): string => {
  if (!seconds || seconds <= 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${pad(mins)}:${pad(secs)}`;
};

const toArray = <T,>(payload: T[] | { results?: T[] } | null | undefined): T[] => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  return payload.results || [];
};

const resolveMediaUrl = (value?: string | null, fallback = 'https://picsum.photos/400/300?random=999'): string => {
  if (!value) return fallback;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  if (value.startsWith('/')) return `${API_ORIGIN}${value}`;
  return `${API_ORIGIN}/${value}`;
};

const mapStory = (item: any, idx: number): Story => ({
  id: String(item.id),
  title: item.title || 'قصة',
  excerpt: item.summary || (item.content ? String(item.content).slice(0, 120) : ''),
  image: resolveMediaUrl(item.image_url || item.image, `https://picsum.photos/400/300?random=${100 + idx}`),
  imageUrl: item.image_url,
  color: STORY_COLORS[idx % STORY_COLORS.length],
  content: item.content,
  summary: item.summary,
  author: item.author,
  contentPreparation: item.content_preparation,
  execution: item.execution,
});

const mapVideo = (item: any, idx: number): Video => ({
  id: String(item.id),
  title: item.title || 'فيديو',
  duration: toDurationString(item.duration),
  thumbnail: resolveMediaUrl(item.thumbnail, `https://picsum.photos/400/250?random=${200 + idx}`),
  category: item.category,
  contentPreparation: item.content_preparation,
  execution: item.execution,
});

const mapGame = (item: any, idx: number): Game => ({
  id: String(item.id),
  title: item.title || 'لعبة',
  type: gameTypeLabel(item.game_type),
  icon: GAME_TYPE_ICONS[item.game_type] || '🎮',
  color: GAME_COLORS[idx % GAME_COLORS.length],
  contentPreparation: item.content_preparation,
  execution: item.execution,
});

const mapPodcast = (item: any, idx: number): Podcast => ({
  id: String(item.id),
  title: item.title || 'بودكاست',
  duration: toDurationString(item.duration),
  host: item.host || 'ضيف البرنامج',
  image: resolveMediaUrl(item.thumbnail, `https://picsum.photos/200/200?random=${300 + idx}`),
  color: idx % 2 === 0 ? 'bg-emerald-100' : 'bg-orange-100',
  contentPreparation: item.content_preparation,
  execution: item.execution,
});

const mapCaricature = (item: any, idx: number): Caricature => ({
  id: String(item.id),
  title: item.title || 'كاريكاتير',
  image: resolveMediaUrl(item.image, `https://picsum.photos/400/400?random=${400 + idx}`),
  description: item.description || 'بدون وصف',
  contentPreparation: item.content_preparation,
  execution: item.execution,
});

const mapParentTip = (item: any): ParentTip => ({
  id: String(item.id),
  title: item.title,
  content: item.content,
  image: resolveMediaUrl(item.image),
  category: item.category,
  contentPreparation: item.content_preparation,
  execution: item.execution,
  createdAt: item.created_at,
});

const mapInfographic = (item: any, idx: number): Infographic => ({
  id: String(item.id),
  title: item.title || 'إنفوجرافيك',
  description: item.description || '',
  image: resolveMediaUrl(item.image, `https://picsum.photos/600/800?random=${500 + idx}`),
  category: item.category,
  age_group: item.age_group || '8-12',
  contentPreparation: item.content_preparation,
  execution: item.execution,
  createdAt: item.created_at,
});

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

// Get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Helper for real fetch
const fetchJson = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    },
  });
  if (!response.ok) throw new Error(`API Error: ${response.status}`);
  return response.json();
};

export const api = {
  // --- AUTH ---
  login: async (username: string, password: string): Promise<{access: string, refresh: string}> => {
    const response = await fetch(`${API_BASE_URL}/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    localStorage.setItem('auth_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return data;
  },

  register: async (userData: any): Promise<any> => {
    return fetchJson('/users/users/register/', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  },

  // --- STORIES ---
  getStories: async (): Promise<Story[]> => {
    if (USE_REAL_API) {
      const data = await fetchJson('/content/stories/');
      return toArray<any>(data).map(mapStory);
    }
    // Mock Delay
    await new Promise(r => setTimeout(r, 500));
    const saved = localStorage.getItem('custom_stories');
    const customStories = saved ? JSON.parse(saved) : [];
    return [...customStories, ...MOCK_STORIES];
  },

  getVideos: async (): Promise<Video[]> => {
    if (USE_REAL_API) {
      const data = await fetchJson('/content/videos/');
      return toArray<any>(data).map(mapVideo);
    }
    await new Promise((r) => setTimeout(r, 300));
    return MOCK_VIDEOS;
  },

  getGames: async (): Promise<Game[]> => {
    if (USE_REAL_API) {
      const data = await fetchJson('/content/games/');
      return toArray<any>(data).map(mapGame);
    }
    await new Promise((r) => setTimeout(r, 300));
    return MOCK_GAMES;
  },

  getPodcasts: async (): Promise<Podcast[]> => {
    if (USE_REAL_API) {
      const data = await fetchJson('/content/podcasts/');
      return toArray<any>(data).map(mapPodcast);
    }
    await new Promise((r) => setTimeout(r, 300));
    return MOCK_PODCASTS;
  },

  getCaricatures: async (): Promise<Caricature[]> => {
    if (USE_REAL_API) {
      const data = await fetchJson('/content/caricatures/');
      return toArray<any>(data).map(mapCaricature);
    }
    await new Promise((r) => setTimeout(r, 300));
    return MOCK_CARICATURES;
  },

  getParentTips: async (category?: string): Promise<ParentTip[]> => {
    if (USE_REAL_API) {
      const endpoint = category ? `/content/parent-tips/?category=${category}` : '/content/parent-tips/';
      const data = await fetchJson(endpoint);
      return toArray<any>(data).map(mapParentTip);
    }
    // Return empty array for mock if not implemented
    return [];
  },

  getInfographics: async (): Promise<Infographic[]> => {
    if (USE_REAL_API) {
      const data = await fetchJson('/content/infographics/');
      return toArray<any>(data).map(mapInfographic);
    }
    await new Promise((r) => setTimeout(r, 300));
    return [];
  },

  saveStory: async (story: Partial<Story>): Promise<Story> => {
    if (USE_REAL_API) {
      return fetchJson('/content/stories/', {
        method: 'POST',
        body: JSON.stringify(story)
      });
    }
    // Mock Save
    await new Promise(r => setTimeout(r, 800));
    const newStory: Story = {
      id: Date.now().toString(),
      title: story.title || 'قصة جديدة',
      excerpt: story.excerpt || '...',
      image: 'https://picsum.photos/400/300?random=' + Date.now(),
      color: 'bg-emerald-100 text-emerald-700',
      isGenerated: true,
      ...story
    } as Story;
    
    // Save to local storage for persistence in demo
    const saved = localStorage.getItem('custom_stories');
    const current = saved ? JSON.parse(saved) : [];
    localStorage.setItem('custom_stories', JSON.stringify([newStory, ...current]));
    
    return newStory;
  },

  createStory: async (payload: {
    title: string;
    content: string;
    summary: string;
    age_group: string;
    difficulty: 'easy' | 'medium' | 'hard';
    reading_time: number;
    author?: string;
    image_url?: string;
    content_preparation?: string;
    execution?: string;
    is_active?: boolean;
  }): Promise<any> => {
    return fetchJson('/content/stories/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  createVideo: async (payload: {
    title: string;
    description: string;
    video_url: string;
    duration: number;
    age_group: string;
    category: string;
    content_preparation?: string;
    execution?: string;
    is_active?: boolean;
  }): Promise<any> => {
    return fetchJson('/content/videos/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  createGame: async (payload: {
    title: string;
    description: string;
    game_type: 'puzzle' | 'memory' | 'educational' | 'multiplayer' | 'quiz';
    age_group: string;
    difficulty: 'easy' | 'medium' | 'hard';
    game_url?: string;
    content_preparation?: string;
    execution?: string;
    is_active?: boolean;
  }): Promise<any> => {
    return fetchJson('/content/games/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  createPodcast: async (payload: {
    title: string;
    description: string;
    audio_url: string;
    duration: number;
    age_group: string;
    category: string;
    host?: string;
    content_preparation?: string;
    execution?: string;
    is_active?: boolean;
  }): Promise<any> => {
    return fetchJson('/content/podcasts/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  createParentTip: async (payload: {
    title: string;
    content: string;
    category: string;
    content_preparation?: string;
    execution?: string;
    is_active?: boolean;
  }): Promise<any> => {
    return fetchJson('/content/parent-tips/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  createInfographic: async (payload: {
    title: string;
    description: string;
    category: string;
    age_group: string;
    content_preparation?: string;
    execution?: string;
    is_active?: boolean;
  }): Promise<any> => {
    return fetchJson('/content/infographics/', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // --- PROFILE ---
  getProfile: async (): Promise<UserProfile> => {
    if (USE_REAL_API) {
      const data = await fetchJson('/users/profiles/my_profile/');
      return {
        name: data.username || 'مستخدم',
        level: data.level || 1,
        badges: [],
        progress: Math.min((data.points || 0) % 100, 100),
        avatar: resolveMediaUrl(data.avatar, 'https://picsum.photos/200/200?random=8'),
      };
    }
    await new Promise(r => setTimeout(r, 300));
    const saved = localStorage.getItem('user_profile');
    return saved ? JSON.parse(saved) : MOCK_PROFILE;
  },

  updateProfile: async (data: Partial<UserProfile>): Promise<UserProfile> => {
    if (USE_REAL_API) {
      return fetchJson('/users/profiles/update_my_profile/', {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    }
    const current = await api.getProfile();
    const updated = { ...current, ...data };
    localStorage.setItem('user_profile', JSON.stringify(updated));
    return updated;
  },

  // --- SETTINGS ---
  getSettings: async (): Promise<AppSettings> => {
    if (USE_REAL_API) {
      return fetchJson('/settings/');
    }
    const saved = localStorage.getItem('app_settings');
    return saved ? JSON.parse(saved) : {
        safeFilter: true,
        blockAds: true,
        timeLimit: 45,
        bedtimeMode: false,
        blockExternalLinks: true
    };
  },

  updateSettings: async (settings: Partial<AppSettings>): Promise<AppSettings> => {
    if (USE_REAL_API) {
      return fetchJson('/settings/', {
        method: 'PATCH',
        body: JSON.stringify(settings)
      });
    }
    const current = await api.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem('app_settings', JSON.stringify(updated));
    return updated;
  }
};
