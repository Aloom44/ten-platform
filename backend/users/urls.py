from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, UserProfileViewSet, ParentChildViewSet,
    FavoriteViewSet, AchievementViewSet, UserAchievementViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'profiles', UserProfileViewSet)
router.register(r'parent-child', ParentChildViewSet)
router.register(r'favorites', FavoriteViewSet, basename='favorite')
router.register(r'achievements', AchievementViewSet)
router.register(r'user-achievements', UserAchievementViewSet, basename='user-achievement')

urlpatterns = [
    path('', include(router.urls)),
]
