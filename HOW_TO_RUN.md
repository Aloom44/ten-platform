# 🚀 تشغيل المشروع بأمر واحد!

تم ربط Backend و Frontend معاً!

## التشغيل السريع ⚡

### الطريقة 1: ملف Batch (الأسهل) ⭐

**افتح File Explorer واضغط دبل كليك على:**

```
START_ALL.bat
```

هذا سيشغل:
- ✅ Django Backend على http://localhost:8000
- ✅ React Frontend على http://localhost:5173

---

### الطريقة 2: Python Script

```powershell
python start_all.py
```

---

### الطريقة 3: npm script

```powershell
npm run start:all
```

---

## بعد التشغيل 🎯

افتح المتصفح على:

- **التطبيق الرئيسي:** http://localhost:3000 (أو http://localhost:5173)
- **API Backend:** http://localhost:8000
- **لوحة التحكم:** http://localhost:8000/admin

---

## إنشاء مستخدم Admin 👤

**من File Explorer، شغل:**
```
backend\create_admin.bat
```

أو من PowerShell:
```powershell
cd backend
& .\venv\Scripts\Activate.ps1
python manage.py createsuperuser
```

---

## إيقاف المشروع 🛑

اضغط `Ctrl+C` في نوافذ Terminal التي فتحت.

---

## ملاحظات 📝

- **Frontend** يستخدم mock data حالياً (للتجربة السريعة)
- لتفعيل الربط الحقيقي: عدل `services/api.ts`:
  ```typescript
  const USE_REAL_API = true;
  ```
- **Backend** يستخدم SQLite (سهل للتطوير)
- يمكن التبديل لـ MySQL لاحقاً

---

**المشروع جاهز تماماً! فقط شغل `START_ALL.bat` 🎉**
