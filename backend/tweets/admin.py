from django.contrib import admin

# Register your models here.
from .models import Tweet, TweetLike


class TweetLikeAdmin(admin.TabularInline):
    model = TweetLike

