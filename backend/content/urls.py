from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    StoryViewSet, GameViewSet, VideoViewSet, CaricatureViewSet,
    CommentViewSet, UserProgressViewSet, CategoryViewSet, ParentTipViewSet, InfographicViewSet, ArticleViewSet
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'stories', StoryViewSet)
router.register(r'games', GameViewSet)
router.register(r'videos', VideoViewSet)
router.register(r'caricatures', CaricatureViewSet)
router.register(r'parent-tips', ParentTipViewSet)
router.register(r'infographics', InfographicViewSet)
router.register(r'articles', ArticleViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'progress', UserProgressViewSet, basename='progress')

urlpatterns = [
    path('', include(router.urls)),
]
