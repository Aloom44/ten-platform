from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    """فئة المحتوى (قصة، لعبة، فيديو، إلخ)"""
    name = models.CharField(max_length=100, verbose_name="الاسم")
    name_en = models.CharField(max_length=100, verbose_name="الاسم بالإنجليزية")
    icon = models.CharField(max_length=50, blank=True, verbose_name="الأيقونة")
    description = models.TextField(blank=True, verbose_name="الوصف")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "فئة"
        verbose_name_plural = "الفئات"
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Story(models.Model):
    """القصص"""
    DIFFICULTY_CHOICES = [
        ('easy', 'سهل'),
        ('medium', 'متوسط'),
        ('hard', 'صعب'),
    ]
    
    title = models.CharField(max_length=200, verbose_name="العنوان")
    content = models.TextField(verbose_name="المحتوى")
    summary = models.TextField(max_length=500, verbose_name="الملخص")
    image = models.ImageField(upload_to='stories/', blank=True, null=True, verbose_name="الصورة")
    image_url = models.URLField(blank=True, verbose_name="رابط الصورة (اختياري)")
    age_group = models.CharField(max_length=20, verbose_name="الفئة العمرية")
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default='easy', verbose_name="المستوى")
    reading_time = models.IntegerField(default=5, verbose_name="وقت القراءة (دقائق)")
    author = models.CharField(max_length=100, blank=True, verbose_name="المؤلف")
    views = models.IntegerField(default=0, verbose_name="المشاهدات")
    likes = models.IntegerField(default=0, verbose_name="الإعجابات")
    content_preparation = models.CharField(max_length=200, blank=True, verbose_name="إعداد المحتوى")
    execution = models.CharField(max_length=200, blank=True, verbose_name="تنفيذ")
    is_active = models.BooleanField(default=True, verbose_name="نشط")
    goal = models.TextField(blank=True, default='', verbose_name="هدف القصة")
    daily_tip = models.TextField(blank=True, default='', verbose_name="نصيحة اليوم")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "قصة"
        verbose_name_plural = "القصص"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title


class Game(models.Model):
    """الألعاب"""
    GAME_TYPE_CHOICES = [
        ('educational', 'ألعاب تعليمية'),
        ('intelligence', 'ألعاب ذكاء'),
        ('digital_safety', 'ألعاب أمان رقمي'),
        ('focus', 'ألعاب تركيز'),
        ('purposeful_fun', 'ألعاب ترفيهية هادفة'),
    ]
    
    title = models.CharField(max_length=200, verbose_name="العنوان")
    description = models.TextField(verbose_name="الوصف")
    short_description = models.CharField(max_length=500, blank=True, verbose_name="وصف قصير")
    game_type = models.CharField(max_length=20, choices=GAME_TYPE_CHOICES, verbose_name="نوع اللعبة")
    thumbnail = models.ImageField(upload_to='games/', blank=True, null=True, verbose_name="الصورة المصغرة")
    thumbnail_url = models.URLField(blank=True, verbose_name="رابط الصورة المصغرة الخارجية")
    age_group = models.CharField(max_length=20, verbose_name="الفئة العمرية")
    difficulty = models.CharField(max_length=10, choices=Story.DIFFICULTY_CHOICES, default='easy', verbose_name="المستوى")
    game_url = models.URLField(blank=True, verbose_name="رابط اللعبة")
    game_data = models.JSONField(blank=True, null=True, verbose_name="بيانات اللعبة")
    plays_count = models.IntegerField(default=0, verbose_name="عدد مرات اللعب")
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0, verbose_name="التقييم")
    creators = models.CharField(max_length=255, blank=True, verbose_name="منفذو اللعبة / الإعداد")
    content_preparation = models.CharField(max_length=200, blank=True, verbose_name="إعداد المحتوى")
    execution = models.CharField(max_length=200, blank=True, verbose_name="تنفيذ")
    is_active = models.BooleanField(default=True, verbose_name="نشط")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "لعبة"
        verbose_name_plural = "الألعاب"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title


class Video(models.Model):
    """الفيديوهات"""
    VIDEO_CATEGORY_CHOICES = [
        ('awareness', 'فيديوهات توعوية'),
        ('activities', 'أنشطة وتحديات'),
        ('quick_info', 'معلومات سريعة'),
        ('reports', 'تقارير ميدانية'),
    ]
    
    title = models.CharField(max_length=200, verbose_name="العنوان")
    description = models.TextField(verbose_name="الوصف")
    thumbnail = models.ImageField(upload_to='videos/thumbnails/', blank=True, null=True, verbose_name="الصورة المصغرة")
    thumbnail_url = models.URLField(blank=True, verbose_name="رابط الصورة المصغرة (اختياري)")
    video_url = models.URLField(verbose_name="رابط الفيديو")
    duration = models.IntegerField(default=0, verbose_name="المدة (ثواني)")
    age_group = models.CharField(max_length=20, verbose_name="الفئة العمرية")
    category = models.CharField(max_length=50, choices=VIDEO_CATEGORY_CHOICES, verbose_name="الفئة")
    views = models.IntegerField(default=0, verbose_name="المشاهدات")
    likes = models.IntegerField(default=0, verbose_name="الإعجابات")
    content_preparation = models.CharField(max_length=200, blank=True, verbose_name="إعداد المحتوى")
    execution = models.CharField(max_length=200, blank=True, verbose_name="تنفيذ")
    is_active = models.BooleanField(default=True, verbose_name="نشط")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "فيديو"
        verbose_name_plural = "الفيديوهات"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title


class Caricature(models.Model):
    """الرسوم الكاريكاتورية"""
    title = models.CharField(max_length=200, verbose_name="العنوان")
    description = models.TextField(blank=True, verbose_name="الوصف")
    image = models.ImageField(upload_to='caricatures/', verbose_name="الصورة")
    age_group = models.CharField(max_length=20, verbose_name="الفئة العمرية")
    views = models.IntegerField(default=0, verbose_name="المشاهدات")
    likes = models.IntegerField(default=0, verbose_name="الإعجابات")
    content_preparation = models.CharField(max_length=200, blank=True, verbose_name="إعداد المحتوى")
    execution = models.CharField(max_length=200, blank=True, verbose_name="تنفيذ")
    is_active = models.BooleanField(default=True, verbose_name="نشط")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "كاريكاتير"
        verbose_name_plural = "الكاريكاتير"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title


class ParentTip(models.Model):
    """نصائح أولياء الأمور"""
    CATEGORY_CHOICES = [
        ('screen_time', 'تنظيم وقت الشاشة'),
        ('sleep', 'النوم والشاشات'),
        ('games', 'الألعاب الإلكترونية'),
        ('protection', 'حماية الأطفال'),
        ('mental_health', 'الصحة النفسية'),
        ('family_comms', 'التواصل الأسري'),
    ]
    
    title = models.CharField(max_length=200, verbose_name="العنوان")
    summary = models.TextField(blank=True, verbose_name="وصف قصير")
    content = models.TextField(verbose_name="المحتوى")
    author_name = models.CharField(max_length=100, blank=True, verbose_name="الكاتب")
    image = models.ImageField(upload_to='parent_tips/', blank=True, null=True, verbose_name="الصورة")
    cover_image_url = models.URLField(blank=True, verbose_name="رابط صورة الغلاف")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, verbose_name="الفئة")
    content_preparation = models.CharField(max_length=200, blank=True, verbose_name="إعداد المحتوى")
    execution = models.CharField(max_length=200, blank=True, verbose_name="تنفيذ")
    is_active = models.BooleanField(default=True, verbose_name="نشط")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "نصيحة لولي الأمر"
        verbose_name_plural = "نصائح أولياء الأمور"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title


class Infographic(models.Model):
    """الإنفوجرافيك"""
    CATEGORY_CHOICES = [
        ('online_safety', 'الأمان الإلكتروني'),
        ('digital_health', 'الصحة الرقمية'),
        ('digital_awareness', 'التوعية الرقمية'),
        ('cyberbullying', 'التنمر الإلكتروني'),
        ('privacy', 'الخصوصية'),
        ('safe_internet', 'الاستخدام الآمن للإنترنت'),
    ]
    
    title = models.CharField(max_length=200, verbose_name="العنوان")
    author_name = models.CharField(max_length=100, blank=True, verbose_name="الكاتب")
    description = models.TextField(blank=True, verbose_name="وصف قصير")
    content = models.TextField(blank=True, verbose_name="المحتوى")
    image = models.ImageField(upload_to='infographics/', blank=True, null=True, verbose_name="الصورة")
    image_url = models.URLField(blank=True, verbose_name="رابط الصورة الرئيسية")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, verbose_name="التصنيف")
    age_group = models.CharField(max_length=20, default='8-12', verbose_name="الفئة العمرية")
    content_preparation = models.CharField(max_length=200, blank=True, verbose_name="إعداد المحتوى")
    execution = models.CharField(max_length=200, blank=True, verbose_name="تنفيذ")
    views = models.IntegerField(default=0, verbose_name="المشاهدات")
    likes = models.IntegerField(default=0, verbose_name="الإعجابات")
    is_active = models.BooleanField(default=True, verbose_name="نشط")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "إنفوجرافيك"
        verbose_name_plural = "الإنفوجرافيك"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title


class Comment(models.Model):
    """التعليقات"""
    CONTENT_TYPE_CHOICES = [
        ('story', 'قصة'),
        ('game', 'لعبة'),
        ('video', 'فيديو'),
        ('podcast', 'بودكاست'),
        ('caricature', 'كاريكاتير'),
        ('parent_tip', 'نصيحة لولي الأمر'),
        ('infographic', 'إنفوجرافيك'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="المستخدم")
    content_type = models.CharField(max_length=20, choices=CONTENT_TYPE_CHOICES, verbose_name="نوع المحتوى")
    content_id = models.IntegerField(verbose_name="معرف المحتوى")
    text = models.TextField(verbose_name="النص")
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='replies', verbose_name="الرد على")
    is_approved = models.BooleanField(default=True, verbose_name="موافق عليه")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "تعليق"
        verbose_name_plural = "التعليقات"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.content_type}"


class UserProgress(models.Model):
    """تتبع تقدم المستخدم"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="المستخدم")
    content_type = models.CharField(max_length=20, verbose_name="نوع المحتوى")
    content_id = models.IntegerField(verbose_name="معرف المحتوى")
    progress = models.IntegerField(default=0, verbose_name="التقدم %")
    completed = models.BooleanField(default=False, verbose_name="مكتمل")
    score = models.IntegerField(default=0, blank=True, null=True, verbose_name="النقاط")
    last_accessed = models.DateTimeField(auto_now=True, verbose_name="آخر وصول")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "تقدم المستخدم"
        verbose_name_plural = "تقدم المستخدمين"
        unique_together = ['user', 'content_type', 'content_id']
    
    def __str__(self):
        return f"{self.user.username} - {self.content_type}"


class Article(models.Model):
    """المقالات"""
    ARTICLE_CATEGORY_CHOICES = [
        ('awareness', 'مقال توعوي'),
        ('visual', 'مقال مصور'),
        ('tips', 'نصائح رقمية'),
        ('health', 'صحة رقمية'),
        ('safety', 'أمان رقمي'),
    ]
    
    title = models.CharField(max_length=200, verbose_name="العنوان")
    summary = models.TextField(max_length=500, verbose_name="الملخص")
    cover_image_url = models.URLField(blank=True, verbose_name="رابط صورة الغلاف")
    author_name = models.CharField(max_length=100, blank=True, verbose_name="اسم الكاتب")
    content_blocks = models.JSONField(default=list, verbose_name="محتوى المقال (Blocks)")
    category = models.CharField(max_length=50, choices=ARTICLE_CATEGORY_CHOICES, verbose_name="الفئة")
    age_group = models.CharField(max_length=20, verbose_name="الفئة العمرية")
    reading_time = models.IntegerField(default=5, verbose_name="مدة القراءة (دقائق)")
    content_preparation = models.CharField(max_length=200, blank=True, verbose_name="إعداد المحتوى")
    execution = models.CharField(max_length=200, blank=True, verbose_name="تنفيذ")
    is_active = models.BooleanField(default=True, verbose_name="نشط")
    published_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ النشر")
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "مقال"
        verbose_name_plural = "المقالات"
        ordering = ['-published_at']
    
    def __str__(self):
        return self.title
