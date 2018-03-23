from django.contrib import admin

# Register your models here.
from django.contrib.contenttypes.admin import GenericStackedInline

from like.models import Like


class LikeInLine(GenericStackedInline):
    model = Like
    ck_field = 'content_type'
    ck_fk_field = 'object_id'


class LikeAbleAdmin(admin.ModelAdmin):
    inlines = LikeInLine,
