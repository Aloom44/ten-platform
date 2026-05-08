from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Story, Game, Video, Caricature, Podcast, Comment, UserProgress, Category, ParentTip, Infographic
from .serializers import (
    StorySerializer, GameSerializer, VideoSerializer, CaricatureSerializer,
    PodcastSerializer, CommentSerializer, UserProgressSerializer, CategorySerializer,
    ParentTipSerializer, InfographicSerializer
)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.filter(is_active=True)
    serializer_class = StorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['age_group', 'difficulty']
    search_fields = ['title', 'content', 'author']
    ordering_fields = ['created_at', 'views', 'likes']
    
    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        story = self.get_object()
        story.views += 1
        story.save()
        return Response({'views': story.views})
    
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        story = self.get_object()
        story.likes += 1
        story.save()
        return Response({'likes': story.likes})

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.filter(is_active=True)
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['age_group', 'difficulty', 'game_type']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'plays_count', 'rating']
    
    @action(detail=True, methods=['post'])
    def increment_plays(self, request, pk=None):
        game = self.get_object()
        game.plays_count += 1
        game.save()
        return Response({'plays_count': game.plays_count})
    
    @action(detail=True, methods=['post'])
    def rate(self, request, pk=None):
        game = self.get_object()
        rating = request.data.get('rating', 0)
        if 0 <= rating <= 5:
            # Simple average - in production, you'd want to track individual ratings
            current_total = game.rating * game.plays_count
            game.rating = (current_total + rating) / (game.plays_count + 1)
            game.save()
            return Response({'rating': game.rating})
        return Response({'error': 'Invalid rating'}, status=status.HTTP_400_BAD_REQUEST)

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.filter(is_active=True)
    serializer_class = VideoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['age_group', 'category']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'views', 'likes']
    
    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        video = self.get_object()
        video.views += 1
        video.save()
        return Response({'views': video.views})
    
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        video = self.get_object()
        video.likes += 1
        video.save()
        return Response({'likes': video.likes})

class CaricatureViewSet(viewsets.ModelViewSet):
    queryset = Caricature.objects.filter(is_active=True)
    serializer_class = CaricatureSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['age_group']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'views', 'likes']
    
    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        caricature = self.get_object()
        caricature.views += 1
        caricature.save()
        return Response({'views': caricature.views})
    
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        caricature = self.get_object()
        caricature.likes += 1
        caricature.save()
        return Response({'likes': caricature.likes})

class PodcastViewSet(viewsets.ModelViewSet):
    queryset = Podcast.objects.filter(is_active=True)
    serializer_class = PodcastSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['age_group', 'category']
    search_fields = ['title', 'description', 'host']
    ordering_fields = ['created_at', 'plays_count', 'likes']
    
    @action(detail=True, methods=['post'])
    def increment_plays(self, request, pk=None):
        podcast = self.get_object()
        podcast.plays_count += 1
        podcast.save()
        return Response({'plays_count': podcast.plays_count})
    
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        podcast = self.get_object()
        podcast.likes += 1
        podcast.save()
        return Response({'likes': podcast.likes})

class ParentTipViewSet(viewsets.ModelViewSet):
    queryset = ParentTip.objects.filter(is_active=True)
    serializer_class = ParentTipSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category']
    search_fields = ['title', 'content']
    ordering_fields = ['created_at']

class InfographicViewSet(viewsets.ModelViewSet):
    queryset = Infographic.objects.filter(is_active=True)
    serializer_class = InfographicSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['age_group', 'category']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'views', 'likes']
    
    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        infographic = self.get_object()
        infographic.views += 1
        infographic.save()
        return Response({'views': infographic.views})
    
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        infographic = self.get_object()
        infographic.likes += 1
        infographic.save()
        return Response({'likes': infographic.likes})

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.filter(is_approved=True)
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['content_type', 'content_id']
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserProgressViewSet(viewsets.ModelViewSet):
    serializer_class = UserProgressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserProgress.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
