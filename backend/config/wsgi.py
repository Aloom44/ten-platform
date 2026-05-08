"""
WSGI config for alam_alwan project.
"""
import os
import sys
from pathlib import Path
from django.core.wsgi import get_wsgi_application

# إضافة مسار مجلد backend للـ sys.path لكي يرى مجلد config
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
application = get_wsgi_application()
