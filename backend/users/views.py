from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from .models import UserProfile, ParentChild, Favorite, Achievement, UserAchievement
from .serializers import (
    UserSerializer, UserProfileSerializer, UserRegistrationSerializer,
    ParentChildSerializer, FavoriteSerializer, AchievementSerializer, UserAchievementSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def register(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'user': UserSerializer(user).data,
                'message': 'تم إنشاء الحساب بنجاح'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.action == 'list':
            return UserProfile.objects.filter(user=self.request.user)
        return UserProfile.objects.all()
    
    @action(detail=False, methods=['get'])
    def my_profile(self, request):
        profile = UserProfile.objects.get_or_create(user=request.user)[0]
        serializer = self.get_serializer(profile)
        return Response(serializer.data)
    
    @action(detail=False, methods=['put', 'patch'])
    def update_my_profile(self, request):
        profile = UserProfile.objects.get_or_create(user=request.user)[0]
        serializer = self.get_serializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ParentChildViewSet(viewsets.ModelViewSet):
    queryset = ParentChild.objects.all()
    serializer_class = ParentChildSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return ParentChild.objects.filter(parent=user) | ParentChild.objects.filter(child=user)
    
    @action(detail=False, methods=['get'])
    def my_children(self, request):
        children = ParentChild.objects.filter(parent=request.user, approved=True)
        serializer = self.get_serializer(children, many=True)
        return Response(serializer.data)

class FavoriteViewSet(viewsets.ModelViewSet):
    serializer_class = FavoriteSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['content_type']
    
    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['post'])
    def toggle(self, request):
        content_type = request.data.get('content_type')
        content_id = request.data.get('content_id')
        
        favorite, created = Favorite.objects.get_or_create(
            user=request.user,
            content_type=content_type,
            content_id=content_id
        )
        
        if not created:
            favorite.delete()
            return Response({'status': 'removed'}, status=status.HTTP_200_OK)
        
        return Response({'status': 'added'}, status=status.HTTP_201_CREATED)

class AchievementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Achievement.objects.filter(is_active=True)
    serializer_class = AchievementSerializer
    permission_classes = [IsAuthenticated]

class UserAchievementViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UserAchievementSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserAchievement.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def my_achievements(self, request):
        achievements = UserAchievement.objects.filter(user=request.user)
        serializer = self.get_serializer(achievements, many=True)
        return Response(serializer.data)
