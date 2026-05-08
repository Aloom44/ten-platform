from django.contrib import admin
from .models import Category, Story, Game, Video, Caricature, Podcast, Comment, UserProgress, ParentTip, Infographic

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'name_en', 'created_at']
    search_fields = ['name', 'name_en']

@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'age_group', 'difficulty', 'views', 'likes', 'is_active', 'created_at']
    list_filter = ['is_active', 'difficulty', 'age_group']
    search_fields = ['title', 'content', 'author']
    readonly_fields = ['views', 'likes', 'created_at', 'updated_at']
    fieldsets = (
        (None, {'fields': ('title', 'content', 'summary', 'image')}),
        ('التفاصيل', {'fields': ('age_group', 'difficulty', 'reading_time', 'author', 'is_active')}),
        ('فريق العمل', {'fields': ('content_preparation', 'execution')}),
        ('الإحصائيات', {'fields': ('views', 'likes', 'created_at', 'updated_at')}),
    )

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ['title', 'game_type', 'age_group', 'difficulty', 'plays_count', 'rating', 'is_active', 'created_at']
    list_filter = ['is_active', 'game_type', 'difficulty', 'age_group']
    search_fields = ['title', 'description']
    readonly_fields = ['plays_count', 'rating', 'created_at', 'updated_at']
    fieldsets = (
        (None, {'fields': ('title', 'description', 'game_type', 'thumbnail', 'game_url', 'game_data')}),
        ('التفاصيل', {'fields': ('age_group', 'difficulty', 'is_active')}),
        ('فريق العمل', {'fields': ('content_preparation', 'execution')}),
        ('الإحصائيات', {'fields': ('plays_count', 'rating', 'created_at', 'updated_at')}),
    )

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'age_group', 'duration', 'views', 'likes', 'is_active', 'created_at']
    list_filter = ['is_active', 'category', 'age_group']
    search_fields = ['title', 'description']
    readonly_fields = ['views', 'likes', 'created_at', 'updated_at']
    fieldsets = (
        (None, {'fields': ('title', 'description', 'category', 'thumbnail', 'video_url', 'duration')}),
        ('التفاصيل', {'fields': ('age_group', 'is_active')}),
        ('فريق العمل', {'fields': ('content_preparation', 'execution')}),
        ('الإحصائيات', {'fields': ('views', 'likes', 'created_at', 'updated_at')}),
    )

@admin.register(Caricature)
class CaricatureAdmin(admin.ModelAdmin):
    list_display = ['title', 'age_group', 'views', 'likes', 'is_active', 'created_at']
    list_filter = ['is_active', 'age_group']
    search_fields = ['title', 'description']
    readonly_fields = ['views', 'likes', 'created_at', 'updated_at']
    fieldsets = (
        (None, {'fields': ('title', 'description', 'image')}),
        ('التفاصيل', {'fields': ('age_group', 'is_active')}),
        ('فريق العمل', {'fields': ('content_preparation', 'execution')}),
        ('الإحصائيات', {'fields': ('views', 'likes', 'created_at', 'updated_at')}),
    )

@admin.register(Podcast)
class PodcastAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'age_group', 'duration', 'plays_count', 'likes', 'is_active', 'created_at']
    list_filter = ['is_active', 'category', 'age_group']
    search_fields = ['title', 'description', 'host']
    readonly_fields = ['plays_count', 'likes', 'created_at', 'updated_at']
    fieldsets = (
        (None, {'fields': ('title', 'description', 'category', 'thumbnail', 'audio_url', 'duration', 'host')}),
        ('التفاصيل', {'fields': ('age_group', 'is_active')}),
        ('فريق العمل', {'fields': ('content_preparation', 'execution')}),
        ('الإحصائيات', {'fields': ('plays_count', 'likes', 'created_at', 'updated_at')}),
    )

@admin.register(ParentTip)
class ParentTipAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_active', 'created_at']
    list_filter = ['is_active', 'category']
    search_fields = ['title', 'content']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        (None, {'fields': ('title', 'content', 'image', 'category')}),
        ('التفاصيل', {'fields': ('is_active',)}),
        ('فريق العمل', {'fields': ('content_preparation', 'execution')}),
        ('التواريخ', {'fields': ('created_at', 'updated_at')}),
    )

@admin.register(Infographic)
class InfographicAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'age_group', 'views', 'likes', 'is_active', 'created_at']
    list_filter = ['is_active', 'category', 'age_group']
    search_fields = ['title', 'description']
    readonly_fields = ['views', 'likes', 'created_at', 'updated_at']
    fieldsets = (
        (None, {'fields': ('title', 'description', 'image', 'category')}),
        ('التفاصيل', {'fields': ('age_group', 'is_active')}),
        ('فريق العمل', {'fields': ('content_preparation', 'execution')}),
        ('الإحصائيات', {'fields': ('views', 'likes', 'created_at', 'updated_at')}),
    )

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['user', 'content_type', 'content_id', 'is_approved', 'created_at']
    list_filter = ['is_approved', 'content_type']
    search_fields = ['text', 'user__username']

@admin.register(UserProgress)
class UserProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'content_type', 'content_id', 'progress', 'completed', 'score', 'last_accessed']
    list_filter = ['completed', 'content_type']
    search_fields = ['user__username']
    readonly_fields = ['created_at', 'last_accessed']
