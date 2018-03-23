from __future__ import unicode_literals

from django.contrib.contenttypes.fields import GenericRelation
from django.db import models

# Create your models here.
from core.models import ModelWithAuthor, WatchableModel
from core.models import ModelWithDates

from like.models import Like, LikeAble
from post.models import Post


class Comment(ModelWithAuthor, ModelWithDates, LikeAble, WatchableModel
):

    def get_title_for_event(self):
        return u'User {} created comment {}'.format(self.author, self.text)

    def get_title_for_updated_event(self):
        return u'User {} updated comment {}'.format(self.author, self.text)

    text = models.TextField()
    post = models.ForeignKey(Post)
    text_was = None
    edited_count = models.IntegerField(default=0)
