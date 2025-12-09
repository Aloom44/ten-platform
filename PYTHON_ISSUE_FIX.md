# ⚠️ حل مشكلة Python غير المثبت

## المشكلة
Python غير مثبت بشكل صحيح على النظام.

## الحل

### الخيار 1: تثبيت Python (الموصى به)

1. **تحميل Python:**
   - اذهب إلى: https://www.python.org/downloads/
   - حمل Python 3.11 أو أحدث
   - **مهم جداً:** أثناء التثبيت، اختر "Add Python to PATH"

2. **بعد التثبيت:**
   ```powershell
   # تأكد من التثبيت
   python --version
   
   # انتقل لمجلد backend
   cd backend
   
   # أنشئ البيئة الافتراضية
   python -m venv venv
   
   # فعّل البيئة
   .\venv\Scripts\Activate.ps1
   
   # ثبت المكتبات
   pip install -r requirements.txt
   ```

### الخيار 2: استخدام Docker (بديل سهل)

إذا كنت لا تريد تثبيت Python، يمكنك استخدام Docker:

```powershell
# في مجلد backend
docker-compose up -d
```

سأنشئ لك ملف docker-compose.yml جاهز.

### الخيار 3: تعطيل Windows Store Python Alias

إذا كان Python مثبت لكن Windows يعيد توجيهك لـ Store:

1. اذهب إلى: **Settings** → **Apps** → **App execution aliases**
2. عطّل "python.exe" و "python3.exe"
3. أعد فتح PowerShell وجرب مرة أخرى

### الخيار 4: استخدام Frontend فقط (مؤقت)

يمكنك تشغيل Frontend مع البيانات الوهمية:

```powershell
# في المجلد الرئيسي
npm install
npm run dev
```

Frontend سيعمل مع mock data حتى تجهز Backend.

---

## الخطوات التالية

بعد تثبيت Python:

1. ✅ ثبت Python من python.org
2. ✅ تأكد من إضافته لـ PATH
3. ✅ أعد فتح PowerShell
4. ✅ اتبع تعليمات التثبيت في SETUP.md

أو إذا تريد الاستمرار بدون Backend مؤقتاً، شغل Frontend فقط.
