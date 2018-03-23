from django.contrib import admin

# Register your models here.
from django.contrib.contenttypes.admin import GenericStackedInline

from event.models import Event


class EventInLine(GenericStackedInline):
    model = Event



class WatchableAdmin(admin.ModelAdmin):
    inlines = EventInLine,