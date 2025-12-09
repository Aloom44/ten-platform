from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, ParentChild, Favorite, Achievement, UserAchievement

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'avatar', 'birth_date', 'gender', 
                 'age_group', 'points', 'level', 'bio', 'parent_email', 'is_parent', 
                 'created_at', 'updated_at']
        read_only_fields = ['points', 'level', 'created_at', 'updated_at']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'first_name', 'last_name']
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("كلمات المرور غير متطابقة")
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user)
        return user

class ParentChildSerializer(serializers.ModelSerializer):
    parent_username = serializers.CharField(source='parent.username', read_only=True)
    child_username = serializers.CharField(source='child.username', read_only=True)
    
    class Meta:
        model = ParentChild
        fields = ['id', 'parent', 'parent_username', 'child', 'child_username', 'approved', 'created_at']

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ['id', 'content_type', 'content_id', 'created_at']
        read_only_fields = ['user']

class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'

class UserAchievementSerializer(serializers.ModelSerializer):
    achievement_detail = AchievementSerializer(source='achievement', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = UserAchievement
        fields = ['id', 'user', 'username', 'achievement', 'achievement_detail', 'earned_at']
