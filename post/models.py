from __future__ import unicode_literals

from django.db import models

# Create your models here.
from core.models import ModelWithAuthor, WatchableModel
from core.models import ModelWithDates

from like.models import LikeAble


class Post(ModelWithDates, ModelWithAuthor, LikeAble, WatchableModel):

    def get_title_for_event(self):
        return u'User {} created post {}'.format(self.author, self.text)

    def get_title_for_updated_event(self):
        return u'User {} updated post {}'.format(self.author, self.text)

    text = models.TextField()
    comments_count = models.IntegerField(default=0)
