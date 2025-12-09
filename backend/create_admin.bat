@echo off
echo Creating superuser for Django Admin...
cd /d "%~dp0"
call venv\Scripts\activate.bat
python manage.py createsuperuser
pause
