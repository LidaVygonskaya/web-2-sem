from __future__ import unicode_literals


from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from core.models import ModelWithAuthor, WatchableModel
from core.models import ModelWithDates
from django.contrib.contenttypes.models import ContentType

from django.db import models

# Create your models here.



class Like(ModelWithAuthor, ModelWithDates, WatchableModel):
    def get_title_for_event(self):
        return u'User {} created like {}'.format(
            self.author,
            ContentType.objects.get(id = self.content_type_id).model_class().objects.get(id = self.object_id).text
        )
#add field status like dislike and nothing
    #easier to update than delete
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    object = GenericForeignKey('content_type', 'object_id')


class LikeAble(models.Model):
    likes = GenericRelation(Like, object_id_field='object_id', content_type_field='content_type')
    likes_count = models.IntegerField(default=0)

    class Meta:
        abstract = True



