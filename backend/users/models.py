from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    """ملف تعريف المستخدم"""
    GENDER_CHOICES = [
        ('male', 'ذكر'),
        ('female', 'أنثى'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile', verbose_name="المستخدم")
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True, verbose_name="الصورة الشخصية")
    birth_date = models.DateField(blank=True, null=True, verbose_name="تاريخ الميلاد")
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, verbose_name="الجنس")
    age_group = models.CharField(max_length=20, blank=True, verbose_name="الفئة العمرية")
    points = models.IntegerField(default=0, verbose_name="النقاط")
    level = models.IntegerField(default=1, verbose_name="المستوى")
    bio = models.TextField(blank=True, verbose_name="نبذة")
    parent_email = models.EmailField(blank=True, verbose_name="بريد ولي الأمر")
    is_parent = models.BooleanField(default=False, verbose_name="هل هو ولي أمر")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "ملف تعريف"
        verbose_name_plural = "ملفات التعريف"
    
    def __str__(self):
        return self.user.username


class ParentChild(models.Model):
    """علاقة ولي الأمر بالأطفال"""
    parent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='children', verbose_name="ولي الأمر")
    child = models.ForeignKey(User, on_delete=models.CASCADE, related_name='parents', verbose_name="الطفل")
    approved = models.BooleanField(default=False, verbose_name="موافق عليه")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "علاقة ولي أمر"
        verbose_name_plural = "علاقات أولياء الأمور"
        unique_together = ['parent', 'child']
    
    def __str__(self):
        return f"{self.parent.username} - {self.child.username}"


class Favorite(models.Model):
    """المفضلة"""
    CONTENT_TYPE_CHOICES = [
        ('story', 'قصة'),
        ('game', 'لعبة'),
        ('video', 'فيديو'),
        ('podcast', 'بودكاست'),
        ('caricature', 'كاريكاتير'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favorites', verbose_name="المستخدم")
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPE_CHOICES, verbose_name="نوع المحتوى")
    content_id = models.IntegerField(verbose_name="معرف المحتوى")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "مفضلة"
        verbose_name_plural = "المفضلات"
        unique_together = ['user', 'content_type', 'content_id']
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.content_type}"


class Achievement(models.Model):
    """الإنجازات"""
    name = models.CharField(max_length=100, verbose_name="الاسم")
    description = models.TextField(verbose_name="الوصف")
    icon = models.CharField(max_length=50, blank=True, verbose_name="الأيقونة")
    badge_image = models.ImageField(upload_to='badges/', blank=True, null=True, verbose_name="صورة الشارة")
    points_required = models.IntegerField(default=0, verbose_name="النقاط المطلوبة")
    is_active = models.BooleanField(default=True, verbose_name="نشط")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "إنجاز"
        verbose_name_plural = "الإنجازات"
        ordering = ['points_required']
    
    def __str__(self):
        return self.name


class UserAchievement(models.Model):
    """إنجازات المستخدم"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='achievements', verbose_name="المستخدم")
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE, verbose_name="الإنجاز")
    earned_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ الحصول")
    
    class Meta:
        verbose_name = "إنجاز المستخدم"
        verbose_name_plural = "إنجازات المستخدمين"
        unique_together = ['user', 'achievement']
        ordering = ['-earned_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.achievement.name}"
