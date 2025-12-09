from django.http import JsonResponse
from django.views.generic import TemplateView
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def api_home(request):
    """صفحة API الرئيسية"""
    return Response({
        'message': 'مرحباً بك في منصة عالم الألوان للسلامة الرقمية',
        'version': '1.0',
        'endpoints': {
            'admin': '/admin/',
            'content': {
                'stories': '/api/content/stories/',
                'games': '/api/content/games/',
                'videos': '/api/content/videos/',
                'podcasts': '/api/content/podcasts/',
                'caricatures': '/api/content/caricatures/',
                'comments': '/api/content/comments/',
            },
            'users': {
                'register': '/api/users/users/register/',
                'profile': '/api/users/profiles/my_profile/',
                'favorites': '/api/users/favorites/',
                'achievements': '/api/users/achievements/',
            },
            'auth': {
                'login': '/api/token/',
                'refresh': '/api/token/refresh/',
            }
        },
        'frontend': 'http://localhost:5173',
        'documentation': '/admin/doc/',
    })

class HomeView(TemplateView):
    """صفحة HTML الرئيسية"""
    template_name = 'home.html'
