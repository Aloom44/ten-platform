# 🔧 دليل التثبيت الكامل للمنصة

## المشكلة الحالية
- ❌ Python غير مثبت
- ❌ Node.js غير مثبت

تحتاج لتثبيتهما لتشغيل المنصة.

---

## الحل 1: التثبيت اليدوي (موصى به) ⭐

### الخطوة 1: تثبيت Python

1. **تحميل Python:**
   - اذهب إلى: https://www.python.org/downloads/
   - حمل **Python 3.11** أو أحدث
   - شغل الملف المحمل

2. **أثناء التثبيت:**
   - ✅ **مهم جداً:** اختر **"Add Python to PATH"**
   - اضغط "Install Now"
   - انتظر حتى ينتهي التثبيت

3. **التحقق من التثبيت:**
   ```powershell
   # أعد فتح PowerShell بعد التثبيت
   python --version
   pip --version
   ```

### الخطوة 2: تثبيت Node.js

1. **تحميل Node.js:**
   - اذهب إلى: https://nodejs.org/
   - حمل **LTS** (النسخة الموصى بها)
   - شغل الملف المحمل

2. **أثناء التثبيت:**
   - اقبل الإعدادات الافتراضية
   - انتظر حتى ينتهي

3. **التحقق من التثبيت:**
   ```powershell
   # أعد فتح PowerShell
   node --version
   npm --version
   ```

### الخطوة 3: تشغيل Backend (Django)

```powershell
# انتقل لمجلد backend
cd backend

# أنشئ البيئة الافتراضية
python -m venv venv

# فعّل البيئة (PowerShell)
.\venv\Scripts\Activate.ps1

# إذا واجهت مشكلة execution policy:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# ثبت المكتبات
pip install -r requirements.txt

# انسخ ملف البيئة
copy .env.example .env

# **مهم:** عدل ملف .env وضع معلومات MySQL الخاصة بك
# افتح .env بمحرر نصوص وعدل:
# DB_PASSWORD=كلمة_مرور_MySQL_الخاصة_بك
```

### الخطوة 4: إعداد MySQL

**الطريقة 1: إذا كان MySQL مثبت:**
```powershell
mysql -u root -p
```
```sql
CREATE DATABASE alam_alwan_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

**الطريقة 2: تثبيت MySQL:**
- حمل من: https://dev.mysql.com/downloads/installer/
- اختر MySQL Server فقط أو Full
- اتبع خطوات التثبيت

### الخطوة 5: تشغيل Django

```powershell
# في مجلد backend مع البيئة الافتراضية مفعلة

# عمل migrations
python manage.py makemigrations
python manage.py migrate

# إنشاء مستخدم admin
python manage.py createsuperuser
# أدخل: username, email, password

# تشغيل السيرفر
python manage.py runserver
```

✅ Django الآن يعمل على: **http://localhost:8000**

### الخطوة 6: تشغيل Frontend (React)

```powershell
# في المجلد الرئيسي (افتح نافذة PowerShell جديدة)
cd C:\Users\MrAlO\Downloads\alam-alwan-(digital-safety)

# تثبيت المكتبات
npm install

# تشغيل التطبيق
npm run dev
```

✅ React الآن يعمل على: **http://localhost:5173**

---

## الحل 2: استخدام Docker (للخبراء) 🐳

إذا كنت تعرف Docker وتفضله:

1. **ثبت Docker Desktop:**
   - https://www.docker.com/products/docker-desktop/

2. **شغل المنصة:**
   ```powershell
   docker-compose up -d
   ```

---

## الحل 3: تشغيل Frontend فقط (مؤقت) 📱

إذا كنت تريد رؤية التطبيق فقط بدون Backend:

1. ثبت Node.js فقط
2. شغل:
   ```powershell
   npm install
   npm run dev
   ```
3. التطبيق سيعمل مع بيانات وهمية (mock data)

---

## حل مشاكل شائعة 🔍

### مشكلة: "execution policy"
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### مشكلة: "Python not found" رغم التثبيت
1. أعد تشغيل الكمبيوتر
2. أو أعد فتح PowerShell كـ Administrator
3. تأكد من اختيار "Add to PATH" أثناء التثبيت

### مشكلة: "mysqlclient" لا يثبت
```powershell
pip install wheel
pip install mysqlclient
```

---

## الترتيب الموصى به 📋

1. ✅ ثبت Python (مع Add to PATH)
2. ✅ ثبت Node.js
3. ✅ ثبت MySQL
4. ✅ أعد فتح PowerShell
5. ✅ اتبع خطوات Backend
6. ✅ اتبع خطوات Frontend

---

## روابط التحميل السريعة 🔗

- **Python:** https://www.python.org/downloads/
- **Node.js:** https://nodejs.org/
- **MySQL:** https://dev.mysql.com/downloads/installer/
- **Docker:** https://www.docker.com/products/docker-desktop/
- **VS Code:** https://code.visualstudio.com/ (محرر نصوص موصى به)

---

بعد تثبيت Python و Node.js، ارجع لملف **SETUP.md** للتعليمات الكاملة.
