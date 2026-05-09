
import { Story, Video, Game, UserProfile, Caricature, TriviaQuestion } from './types';
import { BookOpen, Video as VideoIcon, Newspaper, User, Home, ShieldAlert, BarChart3 } from 'lucide-react';

export const APP_NAME = "عالم ألوان";

export const MOCK_STORIES: Story[] = [
  {
    id: '1',
    title: 'الحديقة الحقيقية',
    excerpt: 'لماذا ترك عمر جهازه اللوحي وخرج ليلعب في الحديقة؟',
    image: 'https://picsum.photos/400/300?random=101',
    color: 'bg-green-100 text-green-700'
  },
  {
    id: '2',
    title: 'الذئب المتنكر',
    excerpt: 'قصة عن عدم التحدث مع الغرباء على الإنترنت.',
    image: 'https://picsum.photos/400/300?random=102',
    color: 'bg-red-100 text-red-700'
  },
  {
    id: '3',
    title: 'كلمة السر القوية',
    excerpt: 'ساعدت سارة صديقتها في حماية أسرارها.',
    image: 'https://picsum.photos/400/300?random=103',
    color: 'bg-indigo-100 text-indigo-700'
  }
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'كيف أحمي نفسي؟',
    duration: '03:00',
    thumbnail: 'https://picsum.photos/400/250?random=104'
  },
  {
    id: '2',
    title: 'عالم بلا شاشات',
    duration: '04:30',
    thumbnail: 'https://picsum.photos/400/250?random=105'
  },
  {
    id: '3',
    title: 'لا تضغط على الرابط!',
    duration: '02:15',
    thumbnail: 'https://picsum.photos/400/250?random=106'
  },
  {
    id: '4',
    title: 'وقت العائلة',
    duration: '05:00',
    thumbnail: 'https://picsum.photos/400/250?random=107'
  }
];

export const MOCK_GAMES: Game[] = [
  {
    id: '1',
    title: 'فرز المحتوى',
    type: 'أمان',
    icon: '🛡️',
    color: 'bg-blue-100 border-blue-300'
  },
  {
    id: '2',
    title: 'مراقبة الوقت',
    type: 'تحدي',
    icon: '⏳',
    color: 'bg-orange-100 border-orange-300'
  },
  {
    id: '3',
    title: 'حقيقة أم خيال',
    type: 'ذكاء',
    icon: '🤔',
    color: 'bg-purple-100 border-purple-300'
  },
  {
    id: '4',
    title: 'صديق أم غريب؟',
    type: 'حماية',
    icon: '👤',
    color: 'bg-red-100 border-red-300'
  }
];

export const MOCK_CARICATURES: Caricature[] = [
  {
    id: '1',
    title: 'الزومبي الرقمي',
    description: 'ماذا يحدث عندما نحدق في الهاتف طوال اليوم؟',
    image: 'https://picsum.photos/400/400?random=301'
  },
  {
    id: '2',
    title: 'فخ المعلومات',
    description: 'لا تصدق كل ما تراه على الشاشة!',
    image: 'https://picsum.photos/400/400?random=302'
  },
  {
    id: '3',
    title: 'لص الوقت',
    description: 'الألعاب تسرق وقتك الثمين، انتبه!',
    image: 'https://picsum.photos/400/400?random=303'
  },
  {
    id: '4',
    title: 'الوجه الحقيقي',
    description: 'الأصدقاء الحقيقيون هم من نلعب معهم في الواقع.',
    image: 'https://picsum.photos/400/400?random=304'
  }
];

export const INFOGRAPHIC_CATEGORIES = [
  { id: 'online_safety', label: 'الأمان الإلكتروني', icon: '🛡️' },
  { id: 'digital_health', label: 'الصحة الرقمية', icon: '🧘' },
  { id: 'digital_awareness', label: 'التوعية الرقمية', icon: '💡' },
  { id: 'cyberbullying', label: 'التنمر الإلكتروني', icon: '🚫' },
  { id: 'privacy', label: 'الخصوصية', icon: '🔐' },
  { id: 'safe_internet', label: 'الاستخدام الآمن للإنترنت', icon: '🌐' },
];

export const PARENT_TIP_CATEGORIES = [
  { id: 'screen_time', label: 'تنظيم وقت الشاشة', icon: '⏰' },
  { id: 'sleep', label: 'النوم والشاشات', icon: '🌙' },
  { id: 'games', label: 'الألعاب الإلكترونية', icon: '🎮' },
  { id: 'protection', label: 'حماية الأطفال', icon: '🛡️' },
  { id: 'mental_health', label: 'الصحة النفسية', icon: '🧠' },
  { id: 'family_comms', label: 'التواصل الأسري', icon: '👨‍👩‍👧‍👦' },
];

export const MOCK_PROFILE: UserProfile = {
  name: 'أحمد',
  level: 3,
  badges: ['🛡️', '⭐', '🌳'],
  progress: 60,
  avatar: 'https://picsum.photos/200/200?random=8'
};

export const NAV_ITEMS = [
  { id: 'home', label: 'الرئيسية', icon: Home },
  { id: 'stories', label: 'قصص', icon: BookOpen },
  { id: 'videos', label: 'الفيديوهات', icon: VideoIcon },
  { id: 'infographics', label: 'إنفوجرافيك', icon: BarChart3 },
  { id: 'articles', label: 'مقالات', icon: Newspaper },
  { id: 'admin', label: 'إدارة', icon: ShieldAlert },
  { id: 'profile', label: 'بطلي', icon: User },
];

// Multiplayer Mock Data
export const BOT_NAMES = ['ياسر', 'نور', 'سارة', 'عمر', 'ليلى'];
export const MULTIPLAYER_QUESTIONS: TriviaQuestion[] = [
  {
    id: 1,
    question: "إذا طلب منك شخص غريب صورتك، ماذا تفعل؟",
    options: ["أرسلها له", "أرفض وأخبر والدي", "أسأله عن اسمه"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "ما هي كلمة السر القوية؟",
    options: ["123456", "اسمي", "حروف وأرقام ورموز"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "كم ساعة يجب أن نلعب في اليوم كحد أقصى؟",
    options: ["10 ساعات", "ساعة واحدة", "طوال الليل"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "أيهما أفضل للصحة؟",
    options: ["اللعب في الحديقة", "مشاهدة التلفاز", "ألعاب الفيديو"],
    correctAnswer: 0
  },
  {
    id: 5,
    question: "إذا وجدت فيديو مخيف، ماذا تفعل؟",
    options: ["أشاهده للنهاية", "أغلقه فوراً", "أرسله لصديقي"],
    correctAnswer: 1
  }
];
