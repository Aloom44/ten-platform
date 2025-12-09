
import { Story, UserProfile, AppSettings } from '../types';
import { MOCK_STORIES, MOCK_PROFILE, PARENT_TIPS } from '../constants';

// Configuration
const API_BASE_URL = 'http://localhost:8000/api'; // Django Local Server
const USE_REAL_API = false; // Set to TRUE when Django server is running (مؤقتاً false للتجربة)

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
  if (!response.ok) throw new Error('API Error');
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
      return data.results || data;
    }
    // Mock Delay
    await new Promise(r => setTimeout(r, 500));
    const saved = localStorage.getItem('custom_stories');
    const customStories = saved ? JSON.parse(saved) : [];
    return [...customStories, ...MOCK_STORIES];
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

  // --- PROFILE ---
  getProfile: async (): Promise<UserProfile> => {
    if (USE_REAL_API) {
      return fetchJson('/users/profiles/my_profile/');
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
