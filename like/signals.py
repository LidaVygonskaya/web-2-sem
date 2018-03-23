from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_save

from like.models import Like


def likes_count_post_save(instance, created=False, *args, **kwargs):
      if created:
          object = ContentType.objects.get(id = instance.content_type_id).model_class().objects.get(id = instance.object_id)
          object.likes_count +=1
          object.save()

post_save.connect(likes_count_post_save, Like)