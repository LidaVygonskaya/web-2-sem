from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_save, post_init, pre_save, m2m_changed
from comment.models import Comment
from core.models import ModelWithAuthor, WatchableModel
from core.models import User
from event.models import  Event
from like.models import LikeAble, Like
from post.models import Post
from django.conf import settings
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from tasks import send_welcome_to_user
from django.db import transaction

# For authorization by tokens


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
        transaction.on_commit(lambda: send_welcome_to_user.apply_async(args=(instance.id, )))


post_save.connect(create_auth_token, User)




#Watchable Models block

#UPDATING
def creating_init_event_updates(instance, *args, **kwargs):
    instance.text_was = instance.text

#UPDATING


#CREATING (LIKE COMMENT POST)
def creating_post_save_event(instance, created=False, *args, **kwargs):
    if not created and instance.text != instance.text_was:
        instance.text_was = instance.text
        event = Event(author=instance.author, text=instance.get_title_for_updated_event())
        event.save()

    if created:
        event = Event(author=instance.author, text=instance.get_title_for_event())
        event.save()
#CREATING

#USER FOLLOWING FIELD
def user_follow_m2m_change(sender, instance,**kwargs):
    event = Event(author=instance, text=instance.get_title_for_event())
    event.save()
#USER FOLLOWING FIELD


#write in function and hust from apps py import thus function and call it

for model in WatchableModel.__subclasses__():
    if (model.__name__ == "Post") or (model.__name__ == "Comment"):
        post_init.connect(creating_init_event_updates,model)


    if(model.__name__ != "User"):
        post_save.connect(creating_post_save_event, model)
    else:
        m2m_changed.connect(user_follow_m2m_change, User.following.through)

#Watchable models block

#Counting user objects start block
def model_with_author_post_save(instance, created=False, *args, **kwargs):
    if created:
        instance.author.objects_count += 1
        instance.author.save()

for model in ModelWithAuthor.__subclasses__():
    post_save.connect(model_with_author_post_save, model)
#Counting user objects end block


