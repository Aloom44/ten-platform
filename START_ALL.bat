@echo off
title منصة عالم الألوان - تشغيل كامل
color 0A

echo ====================================
echo    منصة عالم الألوان للسلامة الرقمية
echo ====================================
echo.

REM التحقق من Python
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [خطأ] Python غير مثبت!
    echo يرجى تثبيت Python من: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM التحقق من Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [خطأ] Node.js غير مثبت!
    echo يرجى تثبيت Node.js من: https://nodejs.org/
    pause
    exit /b 1
)

echo [✓] Python و Node.js مثبتان
echo.

REM الانتقال لمجلد المشروع
cd /d "%~dp0"

REM التحقق من وجود البيئة الافتراضية
if not exist "backend\venv" (
    echo [→] إنشاء البيئة الافتراضية...
    cd backend
    python -m venv venv
    cd ..
    echo [✓] تم إنشاء البيئة الافتراضية
)

REM تشغيل Backend
echo.
echo [→] تشغيل Backend Django...
start "Django Backend" cmd /k "cd /d %~dp0backend && venv\Scripts\activate && python manage.py runserver"

REM الانتظار قليلاً
timeout /t 3 /nobreak >nul

REM التحقق من npm install
if not exist "node_modules" (
    echo.
    echo [→] تثبيت مكتبات React...
    call npm install
)

REM تشغيل Frontend
echo.
echo [→] تشغيل Frontend React...
start "React Frontend" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo ====================================
echo [✓] تم تشغيل المشروع بنجاح!
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000 او http://localhost:5173
echo Admin:    http://localhost:8000/admin
echo.
echo اضغط Ctrl+C في كل نافذة لإيقاف السيرفر
echo ====================================
echo.
pause
