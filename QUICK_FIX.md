# 🔧 حل المشكلة: Python و Node.js غير مثبتين بشكل صحيح

## المشكلة المكتشفة

عند الفحص، اتضح أن:
- ❌ Python: موجود فقط كـ alias في Windows Store (غير مثبت فعلياً)
- ❌ Node.js: غير موجود في PATH

## الحل السريع ⚡

### الطريقة 1: تثبيت Python الصحيح (5 دقائق)

1. **افتح Settings:**
   - اضغط `Win + I`
   - اذهب إلى: **Apps** → **App execution aliases**
   - **عطّل** كلاً من:
     - ✅ `python.exe`
     - ✅ `python3.exe`

2. **حمل Python:**
   ```
   https://www.python.org/ftp/python/3.11.7/python-3.11.7-amd64.exe
   ```

3. **ثبت Python:**
   - شغل الملف المحمل
   - ✅ **مهم جداً:** اختر "Add Python to PATH"
   - اضغط "Install Now"

4. **تأكد من التثبيت:**
   ```powershell
   # أغلق وافتح PowerShell من جديد
   python --version
   pip --version
   ```

### الطريقة 2: تثبيت Node.js (3 دقائق)

1. **حمل Node.js:**
   ```
   https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi
   ```

2. **ثبته:**
   - شغل الملف
   - اقبل الإعدادات الافتراضية
   - انتظر التثبيت

3. **تأكد:**
   ```powershell
   # أغلق وافتح PowerShell
   node --version
   npm --version
   ```

---

## بعد التثبيت: تشغيل المشروع 🚀

### 1. Backend (Django)

```powershell
cd backend

# إنشاء بيئة افتراضية
python -m venv venv

# تفعيل البيئة
.\venv\Scripts\Activate.ps1

# إذا واجهت خطأ execution policy:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# ثم جرب مرة أخرى
.\venv\Scripts\Activate.ps1

# تثبيت المكتبات
pip install -r requirements.txt

# إعداد ملف البيئة
copy .env.example .env
notepad .env
# عدل معلومات MySQL (اسم المستخدم وكلمة المرور)

# إنشاء قاعدة بيانات MySQL
# افتح MySQL وشغل:
# CREATE DATABASE alam_alwan_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# تشغيل migrations
python manage.py makemigrations
python manage.py migrate

# إنشاء admin user
python manage.py createsuperuser

# تشغيل السيرفر
python manage.py runserver
```

✅ Django يعمل على: http://localhost:8000

### 2. Frontend (React)

```powershell
# في نافذة PowerShell جديدة
cd C:\Users\MrAlO\Downloads\alam-alwan-(digital-safety)

# تثبيت المكتبات
npm install

# تشغيل التطبيق
npm run dev
```

✅ React يعمل على: http://localhost:5173

---

## إذا لم تكن تريد تثبيت MySQL 🐬

يمكنك استخدام SQLite مؤقتاً:

**عدل في:** `backend/config/settings.py`

```python
# استبدل DATABASES بـ:
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

ثم:
```powershell
python manage.py migrate
python manage.py runserver
```

---

## حل سريع: تشغيل Frontend فقط بدون Backend 📱

إذا تريد رؤية التطبيق الآن فوراً:

1. **عدل ملف:** `services/api.ts`
   ```typescript
   const USE_REAL_API = false; // غير إلى false
   ```

2. **شغل:**
   ```powershell
   npm install
   npm run dev
   ```

سيعمل التطبيق مع بيانات وهمية مؤقتاً.

---

## روابط التحميل المباشرة 🔗

- **Python 3.11:** https://www.python.org/downloads/
- **Node.js LTS:** https://nodejs.org/en/download/
- **MySQL:** https://dev.mysql.com/downloads/installer/
- **XAMPP** (يحتوي على MySQL): https://www.apachefriends.org/

---

بعد التثبيت، ارجع لهذا الملف واتبع خطوات "تشغيل المشروع".
