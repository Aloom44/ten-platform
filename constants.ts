
import { Story, Video, Game, UserProfile, Podcast, Caricature, TriviaQuestion } from './types';
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

export const MOCK_PODCASTS: Podcast[] = [
  {
    id: '1',
    title: 'أصوات الطبيعة',
    duration: '10:00',
    host: 'العمة منى',
    image: 'https://picsum.photos/200/200?random=201',
    color: 'bg-emerald-100'
  },
  {
    id: '2',
    title: 'مغامرة بدون شاشة',
    duration: '15:30',
    host: 'العم حكيم',
    image: 'https://picsum.photos/200/200?random=202',
    color: 'bg-orange-100'
  },
  {
    id: '3',
    title: 'سر الصندوق',
    duration: '08:45',
    host: 'الراوي الصغير',
    image: 'https://picsum.photos/200/200?random=203',
    color: 'bg-purple-100'
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

export const MOCK_PROFILE: UserProfile = {
  name: 'أحمد',
  level: 3,
  badges: ['🛡️', '⭐', '🌳'],
  progress: 60,
  avatar: 'https://picsum.photos/200/200?random=8'
};

export const PARENT_TIPS = [
  {
    title: 'خطر المحتوى الضار',
    content: 'الإنترنت مليء بمحتوى غير مناسب. استخدام فلاتر الحماية ضروري جداً.',
    icon: '🚫'
  },
  {
    title: 'الإدمان الرقمي',
    content: 'قضاء وقت طويل أمام الشاشة يؤثر على نمو طفلك العقلي والاجتماعي.',
    icon: '🧠'
  },
  {
    title: 'التنمر الإلكتروني',
    content: 'راقب سلوك طفلك وتحدث معه دائماً عن أي مضايقات قد يواجهها.',
    icon: '💬'
  }
];

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
