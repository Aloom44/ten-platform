from rest_framework import serializers
from .models import Story, Game, Video, Caricature, Podcast, Comment, UserProgress, Category, ParentTip, Infographic

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

class CaricatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caricature
        fields = '__all__'

class PodcastSerializer(serializers.ModelSerializer):
    class Meta:
        model = Podcast
        fields = '__all__'

class ParentTipSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParentTip
        fields = '__all__'

class InfographicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Infographic
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'user', 'username', 'content_type', 'content_id', 'text', 'parent', 'is_approved', 'created_at']
        read_only_fields = ['user']

class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProgress
        fields = '__all__'
        read_only_fields = ['user']
