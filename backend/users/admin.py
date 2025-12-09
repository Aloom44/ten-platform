from django.contrib import admin
from .models import UserProfile, ParentChild, Favorite, Achievement, UserAchievement

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'age_group', 'gender', 'points', 'level', 'is_parent', 'created_at']
    list_filter = ['is_parent', 'gender', 'age_group']
    search_fields = ['user__username', 'user__email', 'parent_email']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(ParentChild)
class ParentChildAdmin(admin.ModelAdmin):
    list_display = ['parent', 'child', 'approved', 'created_at']
    list_filter = ['approved']
    search_fields = ['parent__username', 'child__username']

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ['user', 'content_type', 'content_id', 'created_at']
    list_filter = ['content_type']
    search_fields = ['user__username']

@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ['name', 'points_required', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['name', 'description']

@admin.register(UserAchievement)
class UserAchievementAdmin(admin.ModelAdmin):
    list_display = ['user', 'achievement', 'earned_at']
    list_filter = ['achievement']
    search_fields = ['user__username', 'achievement__name']
    readonly_fields = ['earned_at']
