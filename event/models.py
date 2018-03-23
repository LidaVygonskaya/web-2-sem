from __future__ import unicode_literals

from django.db import models

# Create your models here.
from core.models import ModelWithAuthor, ModelWithDates


class Event(ModelWithAuthor, ModelWithDates):
    text = models.TextField()
    event_type = models.CharField(max_length=300)



