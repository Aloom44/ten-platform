#!/usr/bin/env python
"""
نص بايثون لتشغيل المشروع بالكامل
"""
import os
import sys
import subprocess
import time
import platform

def check_command(cmd):
    """التحقق من وجود أمر"""
    try:
        subprocess.run([cmd, '--version'], 
                      stdout=subprocess.PIPE, 
                      stderr=subprocess.PIPE,
                      check=True)
        return True
    except:
        return False

def main():
    print("=" * 50)
    print("  منصة عالم الألوان للسلامة الرقمية")
    print("=" * 50)
    print()
    
    # التحقق من المتطلبات
    if not check_command('python'):
        print("❌ Python غير مثبت!")
        sys.exit(1)
    
    if not check_command('node'):
        print("❌ Node.js غير مثبت!")
        sys.exit(1)
    
    print("✅ Python و Node.js مثبتان")
    print()
    
    # الحصول على المجلد الحالي
    base_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(base_dir, 'backend')
    
    # التحقق من البيئة الافتراضية
    venv_dir = os.path.join(backend_dir, 'venv')
    if not os.path.exists(venv_dir):
        print("→ إنشاء البيئة الافتراضية...")
        subprocess.run([sys.executable, '-m', 'venv', venv_dir])
        print("✅ تم إنشاء البيئة الافتراضية")
    
    # تحديد Python في البيئة الافتراضية
    if platform.system() == 'Windows':
        venv_python = os.path.join(venv_dir, 'Scripts', 'python.exe')
    else:
        venv_python = os.path.join(venv_dir, 'bin', 'python')
    
    # تشغيل Backend
    print()
    print("→ تشغيل Backend Django...")
    backend_process = subprocess.Popen(
        [venv_python, 'manage.py', 'runserver'],
        cwd=backend_dir
    )
    
    # الانتظار قليلاً
    time.sleep(3)
    
    # التحقق من npm install
    if not os.path.exists(os.path.join(base_dir, 'node_modules')):
        print()
        print("→ تثبيت مكتبات React...")
        subprocess.run(['npm', 'install'], cwd=base_dir)
    
    # تشغيل Frontend
    print()
    print("→ تشغيل Frontend React...")
    frontend_process = subprocess.Popen(
        ['npm', 'run', 'dev'],
        cwd=base_dir
    )
    
    print()
    print("=" * 50)
    print("✅ تم تشغيل المشروع بنجاح!")
    print()
    print("Backend:  http://localhost:8000")
    print("Frontend: http://localhost:5173")
    print("Admin:    http://localhost:8000/admin")
    print()
    print("اضغط Ctrl+C للإيقاف")
    print("=" * 50)
    
    try:
        # الانتظار
        backend_process.wait()
        frontend_process.wait()
    except KeyboardInterrupt:
        print("\n→ إيقاف السيرفرات...")
        backend_process.terminate()
        frontend_process.terminate()
        print("✅ تم الإيقاف")

if __name__ == '__main__':
    main()
