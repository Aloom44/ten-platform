# بدء العمل مع المنصة

## الخطوات السريعة للبدء

### 1. إعداد Backend (Django)

```bash
cd backend

# إنشاء بيئة افتراضية
python -m venv venv

# تفعيل البيئة الافتراضية
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# تثبيت المكتبات
pip install -r requirements.txt

# إنشاء ملف .env
copy .env.example .env

# تعديل ملف .env بمعلومات MySQL الخاصة بك
```

### 2. إعداد MySQL

```bash
# افتح MySQL
mysql -u root -p

# أنشئ قاعدة البيانات
CREATE DATABASE alam_alwan_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### 3. تشغيل Django

```bash
# في مجلد backend

# عمل migrations
python manage.py makemigrations
python manage.py migrate

# إنشاء مستخدم admin
python manage.py createsuperuser

# تشغيل السيرفر
python manage.py runserver
```

الآن Django يعمل على: **http://localhost:8000**

لوحة التحكم: **http://localhost:8000/admin**

### 4. إعداد Frontend (React)

```bash
# في المجلد الرئيسي

# تثبيت المكتبات
npm install

# تشغيل التطبيق
npm run dev
```

الآن React يعمل على: **http://localhost:5173**

## API Endpoints المتوفرة

### المحتوى
- `GET /api/content/stories/` - جلب القصص
- `POST /api/content/stories/` - إضافة قصة جديدة
- `GET /api/content/games/` - جلب الألعاب
- `GET /api/content/videos/` - جلب الفيديوهات
- `GET /api/content/podcasts/` - جلب البودكاست
- `GET /api/content/caricatures/` - جلب الكاريكاتير

### المستخدمين
- `POST /api/token/` - تسجيل الدخول
- `POST /api/users/users/register/` - التسجيل
- `GET /api/users/profiles/my_profile/` - جلب الملف الشخصي
- `PUT /api/users/profiles/update_my_profile/` - تحديث الملف الشخصي
- `GET /api/users/favorites/` - جلب المفضلات

## المميزات

✅ Backend Django كامل مع REST API  
✅ قاعدة بيانات MySQL  
✅ JWT Authentication  
✅ تصميم Responsive للهاتف والكمبيوتر  
✅ لوحة تحكم Django Admin  
✅ نظام نقاط وإنجازات  
✅ نظام تعليقات  
✅ تتبع تقدم المستخدم  
✅ دعم كامل للغة العربية  

## الملاحظات

- تأكد من تشغيل MySQL قبل Django
- Django يجب أن يعمل على بورت 8000
- React يعمل على بورت 5173
- في `services/api.ts` تأكد من تفعيل `USE_REAL_API = true`
