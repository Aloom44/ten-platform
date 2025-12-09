# منصة عالم الألوان للسلامة الرقمية

منصة تعليمية تفاعلية للأطفال باللغة العربية تحتوي على قصص، ألعاب، فيديوهات، بودكاست، ورسوم كاريكاتورية.

## التقنيات المستخدمة

### Backend
- Django 5.0.1
- Django REST Framework
- MySQL
- JWT Authentication

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS (responsive design)

## إعداد المشروع

### Backend Setup

1. إنشاء بيئة افتراضية:
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # على Windows
```

2. تثبيت المكتبات:
```bash
pip install -r requirements.txt
```

3. إعداد قاعدة البيانات MySQL:
```bash
# قم بإنشاء قاعدة بيانات MySQL
mysql -u root -p
CREATE DATABASE alam_alwan_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

4. إنشاء ملف .env:
```bash
# انسخ .env.example إلى .env وعدل البيانات
cp .env.example .env
```

5. تشغيل الـ migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. إنشاء superuser:
```bash
python manage.py createsuperuser
```

7. تشغيل السيرفر:
```bash
python manage.py runserver
```

السيرفر سيعمل على: http://localhost:8000
لوحة التحكم: http://localhost:8000/admin

### Frontend Setup

1. تثبيت المكتبات:
```bash
npm install
```

2. تشغيل الـ frontend:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/token/` - الحصول على JWT token
- POST `/api/token/refresh/` - تحديث JWT token

### Content
- GET/POST `/api/content/stories/` - القصص
- GET/POST `/api/content/games/` - الألعاب
- GET/POST `/api/content/videos/` - الفيديوهات
- GET/POST `/api/content/podcasts/` - البودكاست
- GET/POST `/api/content/caricatures/` - الكاريكاتير
- GET/POST `/api/content/comments/` - التعليقات
- GET/POST `/api/content/progress/` - تقدم المستخدم

### Users
- POST `/api/users/users/register/` - تسجيل مستخدم جديد
- GET `/api/users/users/me/` - بيانات المستخدم الحالي
- GET/PUT `/api/users/profiles/my_profile/` - الملف الشخصي
- GET/POST `/api/users/favorites/` - المفضلات
- GET `/api/users/achievements/` - الإنجازات

## المميزات

✅ نظام مستخدمين كامل مع JWT authentication
✅ إدارة محتوى متكاملة (قصص، ألعاب، فيديوهات، بودكاست، كاريكاتير)
✅ نظام تعليقات
✅ تتبع تقدم المستخدم
✅ نظام نقاط وإنجازات
✅ نظام مفضلات
✅ علاقة ولي الأمر بالأطفال
✅ لوحة تحكم Django Admin كاملة
✅ تصميم responsive للهاتف
✅ دعم كامل للغة العربية

## هيكل المشروع

```
backend/
├── config/              # إعدادات Django
├── content/             # تطبيق المحتوى
│   ├── models.py       # نماذج القصص والألعاب وغيرها
│   ├── serializers.py  # Serializers للـ API
│   ├── views.py        # ViewSets للـ API
│   └── admin.py        # لوحة التحكم
├── users/               # تطبيق المستخدمين
│   ├── models.py       # نماذج المستخدمين والملفات الشخصية
│   ├── serializers.py
│   ├── views.py
│   └── admin.py
└── manage.py

frontend/
├── components/          # مكونات React
├── screens/            # شاشات التطبيق
├── services/           # خدمات API
└── context/            # Context API
```

## ملاحظات مهمة

- تأكد من تشغيل MySQL قبل بدء Django
- Django يعمل على بورت 8000 و React على بورت 5173
- CORS مفعل للتطوير على localhost
- لإنتاج، قم بتعديل ALLOWED_HOSTS و CORS_ALLOWED_ORIGINS
